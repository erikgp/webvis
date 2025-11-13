
/*
 * -----------------------------------------------------------------------
 * Code for Protokoll
 * -----------------------------------------------------------------------
 */


/*
 * globals - :-(
 */
// This variable is true when all data in protocol forms are calculated and ok. - This includes *calculated* values in pf_form2!
// Otherwise false
proto_ok = false;

// We need a global var to "remember" that we have a selected a protocol in the protocol list. We need to reset this when clearing everything
// It is -1 by default
// The currently selected protocol
prot_selected_prot = null;


// current filtered protocols! Reference!
curr = protokoll;


/* -------------------------------------------------------------------
 * Code for pd form - patient data form in protocol section 
 * -------------------------------------------------------------------
 */

/*
 * Called on change events when patient data (pd form) of the protocol portion of the data is changed
 */
function prot_pd_change(e) {
    let el = e.target;

    // reset calculated values
    pd.pd_agfr.value = "";
    pd.pd_rgfr.value = "";
    pd.pd_bmi.value = "";

    // we have changed values. Data in forms may not be correct!
    prot_reset_pf_forms();

    if ( el.checkValidity() ) {     // only digits, or in the case of height maybe ""
        let v = parseInt(el.value);
        let minv = parseInt(el.min);
        let maxv = parseInt(el.max);
        if ( v < minv || v > maxv ) {   // NaN < 1 => false  NAN > 1 => false
            el.value = "";
            alert("Heltalsvärde med " + el.min + " <= värde <= " + el.max);
            el.focus();
            return;
        }

        // there is really no way for the pd_form to be in an invalid status - just submit it
        pd.pd_form.submit();
    }
    else {
        el.value = "";
        alert("Heltalsvärde med " + el.min + " <= värde <= " + el.max);
        el.focus();
    }
}


function prot_pdform_submit() {
    // we assume we cant get bad values into the form
    if ( pd.pd_height.value != "" && pd.pd_weight.value != "" )
        pd.pd_bmi.value = calc_bmi(pd.pd_weight.value, pd.pd_height.value).toFixed(1);

    prot_recalc();
}

/*
 * populate the pd form based on data in the argument object
 * d must, at least, contain vikt, langd, bmi and calculated
 */
function prot_pdform_populate(d) {
    pd.pd_weight.value = d.vikt;
    pd.pd_height.value = d.langd;
    pd.pd_bmi.value = d.bmi;
    if ( d.calculated ) {
        pd.pd_agfr.value = d.agfr;
        pd.pd_rgfr.value = d.rgfr;
    }
    else {
        pd.pd_agfr.value = "";
        pd.pd_rgfr.value = "";
    }
    // TODO: maybe fix what is calc!!
}

/* -------------------------------------------------------------------
 * Code for protocol selection box 
 * -------------------------------------------------------------------
 */


/*
 * The options of the protocol select form are populated from the json data contained in the curr array,
 * in turn with data (possibly filtered) from data in protokoll_data.js
 * This function is run on initalization of the webpage, and adds options to the selectbox.
 * It is also called whenever the protocols in the selection box is filtered
 */
function prot_ini_select() {
    // selbox = document.getElementById('pf_proto');

    // Sortera protokoll based on name
    curr.sort(sortfunc);

    // clear the form
    pfsel.pf_proto.textContent = "";

    for (var i = 0; i < curr.length; i++) {
        let option_elem = document.createElement('option');
        option_elem.value = i;                              // probably not needed
        option_elem.setAttribute("data-index", i);          // probably not needed
        // option_elem.textContent = protokoll[i].name;
        // option_elem.text = protokoll[i].name;            // HTML entities will not work!
        option_elem.innerHTML = curr[i].name;
        // alert(undersokningar[i].name + " " + undersokningar[i].protokoll);
        pfsel.pf_proto.appendChild(option_elem);
    }
}



/*
 * Function for sort order for objects in protokoll
 */
function sortfunc(a, b) {
    if (a.name < b.name)
        return -1;
    else if (a.name > b.name)
        return 1;
    else
        return 0;
}


/*
 * Filters the curr array of protocols according to the string s and the comments
 * Used to filter procols displayed in protocol selection box
 */
function prot_filter(s) {
    /*
    // Assume tags start with # or explicitly use tag start with #?
    if ( s == "")
        curr = protokoll.filter((x) => x.comment.includes(""));
    else {
        s = "#"+s;
        curr = protokoll.filter((x) => x.comment.includes(s));
    }
    */

    /*
    // just one tag..
    curr = protokoll.filter((x) => x.comment.includes(s));
    */

    curr = protokoll.filter((x) => prot_tag_filter(x.comment, s));
}

/*
 * Returns true if the 1st string contains every word in the 2nd string
 * Used to filter filter protocols displayed in protocol selection box
 */
function prot_tag_filter(h, s) {
    let s2 = s.split(/  */);
    let t = true;
    // for (let i = 0; i < s2.length; ++i) {
    for (let i = 0; t && i < s2.length; ++i) {
        t = t && h.includes(s2[i]);
    }
    return t;
}


/*
 * This is called from input to filter what protocols are displayed in the select box
 * The function actually called when filtering the procols displayed in the protocol selection box
 */
function prot_filter_select(e) {
    let s = e.value;
    // filter curr
    prot_filter(s);
    // update the contencts of the select box!
    prot_ini_select();
    // clear all protocol data, inj param data, decision and protocol info
    prot_rensa_allt();
}




/*
 * Function that is executed from "onchange()" method of the prot sel select box.
 * Thus this method is run when selecting or changing protocol.
 * Since there is a change of value, the resulting volym, injektionshastighet, patientdos, and patientkvot are reset
 * If values for gfr and body mass are present, recalculates values above.
 * Arg1: the select object.
 *
 * The function displays:
 * 1. protokollnamn
 * 2. protokoll information
 * 3. populates protokollparametrar with:
 *    a. dos (mg/kg kroppsvikt)
 *    b. koncentration (koncentration av kontrast som används, mg/ml)
 *    c. injektions tid (s)
 *    d. doshastighet (jod/(kg*s)  - calculated from dos and injektionstid)
 *    e. maxvikt (kg)
 *    f. maxvolym (ml) - max contrast agent volume from maxvikt, dos and koncetration
 * 4. Resets the values for patient parameters (voym, injektionshastighet, patientdos, patientkvot)
 */
function prot_proto_sel(x) {
    // alert(x.selectedIndex);
    // alert(x.value);
    /* Or:
    x.options[x.selectedIndex].text;
    */

    // data is NOT consistent in the protocol forms
    proto_ok = false;

    // resets the form with patient specific data (inj parameters and decision)
    prot_reset_pf_forms();

    // get protokoll and populate pf_form
    prot_selected_prot = curr[x.selectedIndex];

    prot_populate_protparams();

    // if pf_agfr och pf_vikt båda är satta så vill vi beräkna värdet efter att vi har ändrat här...
    // js suger dock - isNaN("") är false... däremot så är isNaN(parseInt("")) == true
    // jag får använda det senare

    // pf.pf_form.submit();
    prot_recalc();
}


/*
 * ------------------------------------------------------------------------------------------------
 * Code for the protocol parameters and protocol information parts
 * ------------------------------------------------------------------------------------------------
 */

 /*
  * This function is called to populate the protocol params and the protocol info
  * Uses the prot_selected_prot global
  * The caller should ensure that prot_select_prot is not null
  */
 function prot_populate_protparams() {
    pf.pf_dos.value = prot_selected_prot.dos;
    pf.pf_konc.value = prot_selected_prot.konc;
    pf.pf_tid.value = prot_selected_prot.tid;
    pf.pf_maxvikt.value = prot_selected_prot.maxvikt;
    pf.pf_maxvol.value = Math.round(prot_selected_prot.maxvikt * prot_selected_prot.dos / prot_selected_prot.konc);
    pf.pf_dosh.value = (prot_selected_prot.dos / prot_selected_prot.tid).toFixed(1);

    // display protocol info
    inf = document.getElementById("p_info");
    utstr = "";
    utstr += "<span class='hl'>Protokoll: " + prot_selected_prot.name + "</span><br/>"
    utstr += prot_selected_prot.info;
    inf.innerHTML = utstr;
}


/*
 * Method to calculate patient specific parameters from protocol parameters and patient data (body mass/vikt and agfr) in the protocol form.
 * This is called when submitting the protocol form.
 * If called from elsewhere, the called must ensure that all data in the form is ok!
 * The values in the form should be acceptable and exist because of browser form validation.
 */
function prot_protocol_submit() {
    let pvikt = parseInt(pd.pd_weight.value);
    let agfr = parseInt(pd.pd_agfr.value);

   // reset data (inj parameters and decision
    prot_reset_pf_forms();

    // get actual protocol parameters, as entered in the form
    const dos = parseFloat(pf.pf_dos.value);
    const konc = parseFloat(pf.pf_konc.value);
    const tid = parseFloat(pf.pf_tid.value);
    const maxvikt = parseFloat(pf.pf_maxvikt.value);
    // ... and populate the calculated values in the form
    pf.pf_maxvol.value = Math.round(maxvikt*dos/konc);
    pf.pf_dosh.value = (dos/tid).toFixed(1);

    if ( pvikt ) {   // pvikt is not NaN, or 0
        // values for injection parameters
        // kommer att få värden som inte stämmer om vi inte använder avrundade värden
        const bvikt = pvikt > maxvikt ? maxvikt : pvikt;
        const pvol = Math.round(bvikt * dos / konc);     // avrundat till närmaste ml
        const pdos = pvol * konc;                        // för att ska bli konsitent så beräknas detta från pvol

        // fill pf_form2
        pf2.pf_pvol.value = pvol;
        pf2.pf_pinjh.value = (pvol/tid).toFixed(2);
        pf2.pf_pdos.value = (pdos / 1000).toFixed(2);

        if ( agfr )
            pf2.pf_pkvot.value = (pdos / (1000*agfr)).toFixed(2);

        // data in protocol forms are consistent and pf2 is filled
        proto_ok = true;
    }
}



/*
 * Function to update inj parameters if form data in pf_form is ok and (at least) we have weight
 * This is called when changing gfr form data.
 * Note! This could be called (together with clearing the data) onchange on protkolldata items as well,
 * but it may be a bit annoying
 */
 function prot_recalc() {
    // update calculated data! Dont report the validity - it would be annoying if that happened every time we changed the gfr form
    if ( pf.pf_form.checkValidity() ) {   // protokolldata should be ok and weight != "" (must be an ok number). No need to check the pd_form
        pf.pf_form.submit();
    }
 }


/*
 * called on changes in the pf form
 */
function prot_change(e) {
    let el = e.target;

    prot_reset_pf_forms();

    if ( ! el.checkValidity() ) {
        alert( "Heltalsvärde med: " + el.min + " ≤ värde ≤ " + el.max);
        el.value = "";
        el.focus();
    } 

    prot_recalc();
}


/*
 * ---------------------------------------------------------------------------------
 * code for actual injection parameters - data from both protocol parameters and gfr
 * ---------------------------------------------------------------------------------


/*
 * This method is called when when changing the ratio or click the button.
 * It is used to recalculate the protocol "dos" based on a changed kvot.
 *
 * The only value that can be changed in that form is the ratio (kvot)
 * The values of the form are validated using web browser form validation.
 * The values in the protocol form are explicitly validated - however this may not be wanted since we may WANT to have a strange dos value etc.
 * Then the method for calculating patient parameters based on protocol data is called (thus after being validated!)
 */
function prot_ratio2dos() {
    // TODO: Här behöver kontrolleras om protokolldata är ifyllda!

    // First we need the new pkvot value
    const kvot = parseFloat(pf2.pf_pkvot.value);

    // Reset values - otherwise the form may not be consisten
    prot_reset_pf_forms();

    const pvikt = parseFloat(pd.pd_weight.value);
    const agfr = parseInt(pd.pd_agfr.value);

    if ( ! agfr || ! pvikt ) {    // pvikt should always be set if agfr is set, so this should be ok
        alert("Du behöver beräkna GFR för att använda den här funktionen.");
        fgfr.gfr_age.focus();
        return;
    }

    // data in protocol forms are NOT consistent
    proto_ok = false;

    // calculate new dose
    const pdos = kvot * agfr * 1000;   // mg I  to the patient

    const maxvikt = parseFloat(pf.pf_maxvikt.value);
    const bvikt = pvikt > maxvikt ? maxvikt : pvikt;

    // the above dose in mg I to the patient corresponds to this dose in mg I/kg, when we take the max weight into account!
    const dos = Math.round(pdos / bvikt);

    pf.pf_dos.value = dos;

    // document.getElementById("pf_form").reportValidity();
    let fok = pf.pf_form.reportValidity();
    if ( ! fok ) {
        return;
    }
    // prot_protokollber();
    pf.pf_form.submit();
}



/*
 * ------------------------------------------
 * General code for the protocol forms
 * ------------------------------------------
 */



/*
 * This function clears the calculated data the protocol form (pf_form2 and besluts data).
 * That is it clears all data that is dependent on patient parameters
 * The method is called whenever:
 *    1. "onchange()" of any data in protocolparameters input element and patient parameters input elements.
 *    2. a new undersökning is selected in the select box.
 *    3. NOT!!!!! when the ratio of the calculated patient parameters is changed - since then we cant recalc values
 * 
 * The function only resets the patient parameters in the procotol ONLY when pf_form2_filled == true
 */
function prot_reset_pf_forms() {
    if (proto_ok) {
        pf2.pf_form2.reset();
    }
    document.getElementById("beslut").innerText = "";
    // need to clear the calculated values in the protocol form - should we???
    // pf.pf_dosh.value = "";
    // pf.pf_maxvol.value = "";

    // data in protocol forms is NOT consistent
    proto_ok = false;
    return;
}

/*
 * Thus function clears all data in the protocol section.
 * This is needed since if we have started to add information about protocols, we can not get rid of it!
 * This thus clears everything
 * Called onclick "rensa" button
 */
function prot_rensa_allt() {
    prot_reset_pf_forms();
    document.getElementById("p_info").innerText = "";
    pf.pf_form.reset();
    // clear all globals!
    prot_selected_prot = null;
    proto_ok = false;
}



/*
 * This function generates text that can be copied to for easier communication.
 * There is some checks to ensure all data is consistent.
 * The checks ARE ONLY for the data in the protocol form!!!!
 * Called onclick "beslut" button
 */
function prot_genbeslut() {
    // check if data is consistent!
    const agfr = parseInt(pd.pd_agfr.value);
    const rgfr = parseInt(pd.pd_rgfr.value);
    const bmi = parseInt(pd.pd_bmi.value);

    if ( ! ( proto_ok && agfr && fgfr && bmi ) )  {
        alert("Data är inte konsistent eller saknas. Rapport genereras ej!");
        return;
    }

    // faster access to the protocol
    let p = prot_selected_prot;

    let ut = document.getElementById("beslut");
    let utstr = "";
    utstr += "<pre id='copy2'>Estimerat ";
    utstr += "rGFR = " + rgfr + " ml/(min * 1,73 m2) och estimerat "
    utstr += "aGFR = " + agfr + " ml/min. \n";
    utstr += "BMI = " + bmi + " kg/m2. \n";
    utstr += "Kör:";
    if ( p == null || ! prot_pvals_unchanged(p) ) {
        utstr += "  OBSERVERA! ÄNDRADE VÄRDEN FRÅN STANDARDVÄRDEN ELLER INGET PROTOKOLL! \n";
    }
    else
        utstr += " (standardvärden för angivet protokoll)\n";
    if ( p ) {   // ett protokoll är angivet!
        utstr += "Protokoll: " + p.name + "\n";
    }
    utstr += "Dos: " + pf.pf_dos.value + " mg jod/kg";
    utstr += " (maxvikt: " + pf.pf_maxvikt.value + " kg)\n";
    utstr += "Koncentration: " + pf.pf_konc.value + " mg jod/ml\n";
    utstr += "Volym: " + pf2.pf_pvol.value + " ml\n";
    utstr += "Injektionstid: " + pf.pf_tid.value + " s\n";
    utstr += "Injektionshastighet (beräknad): " + pf2.pf_pinjh.value + " ml/s\n";
    utstr += "Det ger gram jod-agfr-kvot: " + pf2.pf_pkvot.value + "\n"; 
    utstr += "</pre>";
    utstr += "\n<button onclick='fcopy(\"copy2\");'>Kopiera</button>";
    ut.innerHTML = utstr;
}


/*
 * Checks if the protocol values are the unchanged
 */
function prot_pvals_unchanged(prot) {
    let t = true;
    t = t && pf.pf_dos.value == prot.dos;
    t = t && pf.pf_konc.value == prot.konc;
    t = t && pf.pf_tid.value == prot.tid;
    t = t && pf.pf_maxvikt.value == prot.maxvikt;
    return t;
}





