
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
selected_prot_index = -1; 


// current filtered protocols! Reference!
curr = protokoll;


/*
 * The options of the protocol select form are populated from the json data contained in the curr array,
 * in turn with data (possibly filtered) from data in protokoll_data.js
 * This function is run on initalization of the webpage, and adds options to the selectbox.
 * It is also called whenever data is filtered
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

    selected_prot_index = x.selectedIndex;

    // get protokoll and populate pf_form
    let p = curr[selected_prot_index];
    pf.pf_dos.value = p.dos;
    pf.pf_konc.value = p.konc;
    pf.pf_tid.value = p.tid;
    pf.pf_maxvikt.value = p.maxvikt;
    pf.pf_maxvol.value = Math.round(p.maxvikt*p.dos/p.konc);
    pf.pf_dosh.value = (p.dos/p.tid).toFixed(1);

    // display protocol info
    inf = document.getElementById("p_info");
    utstr = "";
    utstr += "<span class='hl'>Protokoll: " + p.name + "</span><br/>"
    utstr += p.info;
    inf.innerHTML = utstr;

    // resets the form with patient specific data (inj parameters and decision)
    prot_reset_pf_forms();

    // if pf_agfr och pf_vikt båda är satta så vill vi beräkna värdet efter att vi har ändrat här...
    // js suger dock - isNaN("") är false... däremot så är isNaN(parseInt("")) == true
    // jag får använda det senare

    // if body mass/vikt is present in gfr from, recalculate patient specific data according to new protocol - sadly a bit of violation of sep of concerns
    let vikt = parseInt(fgfr.gfr_weight.value);
    // if ( ! isNaN(agfr) && ! isNaN(vikt) ) {
    if ( isNumber(vikt) ) {
        // pf.pf_form.reportValidity();  // since it is filled from the protosel, it should always be valid!
        pf.pf_form.submit();
    }
}



/*
 * Method to calculate patient specific parameters from protocol parameters and patient data (body mass/vikt and agfr) in the protocol form.
 * This is called when submitting the protocol form.
 * If called from elsewhere, the called must ensure that all data in the form is ok!
 * The values in the form should be acceptable and exist because of browser form validation.
 */
function prot_protokollber() {
    let pvikt = parseInt(fgfr.gfr_weight.value);
    let agfr = -1;

    // Either we have all data or we at least have weight. If we dont have any weight return
    if ( res.calculated && gl.calculated ) {
        pvikt = gl.vikt;
        agfr = res.agfr;
    }
    else if ( ! isNumber(pvikt) ) {
        alert("Åtminstone vikt måste anges.");
        fgfr.gfr_weight.focus();
        return;
    }


    /*
    // Fixed by form validation - not needed
    if (pvikt < 0 || isNaN(pvikt)) {
        alert("Vikt saknas!");
        return;
    }
    */

    // reset data (inj parameters and decision
    prot_reset_pf_forms();

    const dos = parseFloat(pf.pf_dos.value);
    const konc = parseFloat(pf.pf_konc.value);
    const tid = parseFloat(pf.pf_tid.value);
    const maxvikt = parseFloat(pf.pf_maxvikt.value);
    pf.pf_maxvol.value = Math.round(maxvikt*dos/konc);
    pf.pf_dosh.value = (dos/tid).toFixed(1);

    // kommer att få värden som inte stämmer om vi inte använder avrundade värden
    const bvikt = pvikt > maxvikt ? maxvikt : pvikt;
    const pvol = Math.round(bvikt * dos / konc);     // avrundat till närmaste ml
    const pdos = pvol * konc;                        // för att ska bli konsitent så beräknas detta från pvol

    // fill pf_form2
    pf2.pf_pvol.value = pvol;
    pf2.pf_pinjh.value = (pvol/tid).toFixed(2);
    pf2.pf_pdos.value = (pdos / 1000).toFixed(2);
    pf2.pf_pkvot.value = res.calculated ? ((pdos / (1000*agfr)).toFixed(2)) : ""; 

    // data in protocol forms are consistent
    proto_ok = true;
}


/*
 * This method is called when submitting the protocol patient form.
 * It is used to recalculate the protocol "dos" based on a changed kvot.
 *
 * The only value that can be changed in that form is the ratio (kvot)
 * The values of the form are validated using web browser form validation.
 * The values in the protocol form are explicitly validated - however this may not be wanted since we may WANT to have a strange dos value etc.
 * Then the method for calculating patient parameters based on protocol data is called (thus after being validated!)
 */
function prot_kvottodos() {
    // TODO: Här behöver kontrolleras om protokolldata är ifyllda!

    // First we need the new pkvot value
    const kvot = parseFloat(pf2.pf_pkvot.value);

    // Reset values - otherwise the form may not be consisten
    prot_reset_pf_forms();

    if ( ! res.calculated ) {
        alert("Du behöver beräkna GFR för att använda den här funktionen.");
        fgfr.gfr_age.focus();
        return;
    }

    // data in protocol forms are NOT consistent
    proto_ok = false;

    // calculate new dose
    const agfr = res.agfr;
    const pdos = kvot * agfr * 1000;   // mg I  to the patient

    const maxvikt = parseFloat(pf.pf_maxvikt.value);
    const pvikt = gl.vikt;
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
 * This function clears the calculated data the protocol form (pf_form2 and besluts data).
 * The method is called whenever:
 *    1. "onchange()" of any data in protocolparameters input element and patient parameters input elements.
 *    2. a new undersökning is selected in the select box.
 *    3. NOT!!!!! when the ratio of the calculated patient parameters is changed - since the we cant recalc values
 * 
 * The function only resets the patient parameters in the procotol ONLY when pf_form2_filled == true
 */
function prot_reset_pf_forms() {
    if (proto_ok) {
        pf2.pf_form2.reset();
    }
    document.getElementById("beslut").innerText = "";
    // data in protocol forms is NOT consistent
    proto_ok = false;
    return;
}

/*
 * Function to update inj parameters if form data in pf_form is ok and (at least) we have weight
 * This is called when changing gfr form data.
 * Note! This could be called (together with clearing the data) onchange on protkolldata items as well,
 * but it may be a bit annoying
 */
 function prot_recalc() {
    // update calculated data! Dont report the validity - it would be annoying if that happened every time we changed the gfr form
    if ( pf.pf_form.checkValidity() && fgfr.gfr_weight != "" ) {   // protokolldata should be ok and weight != "" (must be an ok number) 
        pf.pf_form.submit();
    }
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
    selected_prot_index = -1;
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
    if ( ! proto_ok || ! res.calculated )  {
        alert("Data är inte konsistent eller saknas. Rapport genereras ej!");
        return;
    }

    let ut = document.getElementById("beslut");
    let utstr = "";
    utstr += "<pre id='copy2'>Estimerat ";
    utstr += "rGFR = " + res.rgfr + " ml/(min * 1,73 m2) och estimerat "
    utstr += "aGFR = " + res.agfr + " ml/min. \n";
    utstr += "BMI = " + res.bmi + " kg/m2. \n";
    utstr += "Kör:";
    if ( selected_prot_index < 0 || ! prot_pvals_unchanged(curr[selected_prot_index]) ) {
        utstr += "  OBSERVERA! ÄNDRADE VÄRDEN FRÅN STANDARDVÄRDEN ELLER INGET PROTOKOLL! \n";
    }
    else
        utstr += " (standardvärden för angivet protokoll)\n";
    if ( selected_prot_index >= 0 ) {   // ett protokoll är angivet!
        utstr += "Protokoll: " + curr[selected_prot_index].name + "\n";
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





