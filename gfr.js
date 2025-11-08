
/*
 * Kod för gfr-beräkning
 */

/*
 * NOTE! 
 * A function "pointer" (set elsewhere) is used to calc gfr from kreat and data
 * For all functions to calculate gfr there are function wrappers with the same interface 
 * and returning the same kind of values (agfr, rgfr, and body surface area).
 * (The same function signature...)
 */


/*
 * There is a small risk that the values in the gfr form does not correspond to the values used to
 * calculate rgfr and agfr (ie the calculated gfr values seem to be ok and correspond to the values
 * in the form, when actually they don't).
 * We need to save the actual values used to calculate gfr as well as the calculated bmi and gfr values
 * Note: calculted is set when the data is consistent and filled (ALL data). Should be checked before using res
 */
const res = {
    age: NaN,
    rev_age: NaN,
    langd: NaN,
    vikt: NaN,
    kreatinin: NaN,      // actual kreatinin
    rev_kreatinin: NaN,  // revised kreatinin
    sex: 0,              // female == 0, male == 1
    // Calculated values below
    rev: false,          // if revised age and kreat is used (children)
    rgfr: NaN,           // rounded value - note javascript does not round in a nice way
    rgfr_e: NaN,         // "exact" value
    agfr: NaN,
    agfr_e: NaN,
    bmi: NaN,
    bmi_e: NaN,
    ky: NaN,
    ky_e: NaN,
    calculated: false,
    // calculated_bmi: false,
}

// If we have data in the res1 div or not
res1_filled = false;


// populate gl global with values from gfr form input elements
// Note: input form elements are populatad in script in html file. For example: fgfr.gfr_age corresponds to document.getElementById("gfr_age") etc
// Note: basic check for numbers
function gfr_get_vals() {
res.age = parseInt(fgfr.gfr_age.value);       // NaN if not parsable to int
// res.rev_age = res.age;                         // initial value
res.langd = parseInt(fgfr.gfr_height.value);
res.vikt = parseInt(fgfr.gfr_weight.value);
res.kreatinin = parseInt(fgfr.gfr_kreat.value);
// res.rev_kreatinin = res.kreatinin;             // initial value
res.sex = parseInt(document.querySelector('input[name="gfr_sexbtn"]:checked').value);
}

/*
 * prog. submit gfr form - needs prog validation
 */
function gfr_submit_gfrform_val() {
    if ( fgfr.gfr_form.checkValidity() ) gfr_submit_gfr_form();
}


/*
 * Function called when the gfr form i submitted and when clicking "beräkna och överför".
 * Note that we can expect the values in the form to exist and be valid because of auto form validation,
 * and, in case of called from "beräkna och överför" because of explicit form validation below
 * 1. if not called when "submit" (ie when clicking "beräkna och överför") - check for valid form and, if not valid stop
 * 2. populate gl global with values from gfr form
 * 3. Calculates rgfr, agfr, body area, and bmi from form data (calling other funcs)
 * 4. Calls the function resultat1 to show results
 */
function gfr_submit_gfr_form() {
    // clear old result - should not be necessary...
    // gfr_resetgfrdata();

    // populate part of the global res object with values from gfr form
    gfr_get_vals();


    // only weight is required!
    // The following are allowed: (weight), (height, weight), (age, height, weight, kreat, sex).
    // No other combinations are allowed, except sex is always submitted. Weight is guaranteed from form validation

    // All values submitted? sex is always submitted. Weight guaranteed by form validation
    // if ( (fgfr.gfr_age.value != "") && (fgfr.gfr_height.value != "") && (fgfr.gfr_kreat.value != "") ) { // all data for gfr calc submitted
    if ( ! isNaN(res.age) && ! isNaN(res.langd) && ! isNaN(res.vikt)  && ! isNaN(res.kreatinin) ) {   // we have all data! Sex should always be selected


        if (res.age < 18) { // form validation should ensure age >= 2
            let alertstring = "Aktuell metod bör användas med försiktighet för barn >= 2 år och yngre än 18 år, och för barn endast tillsammans med den reviderade LM-metoden.\n" +
                   "Metoden beräknar ett till 18 år justerat kreatininvärde som sedan används tillsammans med REV-LM-metoden och 18 år.\n" +
                   "aGFR från rGFR bör tolkas ytterligt försiktigt, och metoden är ej validerad för detta.\n" +
                   "Se Läkartidningen. 2021;118:20134";
            alert(alertstring);
            res.rev_kreatinin = rev_kreat_child(res.age, res.kreatinin, res.sex);
            res.rev_age = 18;
            res.rev = true;
        }
        else {
            res.rev_kreatinin = res.kreatinin;
            res.rev_age = res.age;
            res.rev = false;
        }

        // get rGFR according to current method according to function pointer
        // let [temp_agfr, temp_rgfr, ky] = kreat_gfr_func(res.rev_age, res.vikt, res.langd, res.rev_kreatinin, res.sex, 0);
        let [temp_agfr, temp_rgfr, ky] = [0, 0, 0];

        // always rev-lm as lm-method when children - se LT
        if ( res.age < 18 ) {
            [temp_agfr, temp_rgfr, ky] = wr_rgfr_revlm(res.rev_age, res.vikt, res.langd, res.rev_kreatinin, res.sex, 0);
        }
        else {
            [temp_agfr, temp_rgfr, ky] = kreat_gfr_func(res.rev_age, res.vikt, res.langd, res.rev_kreatinin, res.sex, 0);
        }

        let rgfr = Math.round(temp_rgfr);
        let agfr = Math.round(temp_agfr);

        // bmi
        let bmi = calc_bmi(res.vikt, res.langd);

        // populate res global with calculated values
        res.rgfr_e = temp_rgfr;
        res.rgfr = rgfr;
        res.ky_e = ky;
        // res.ky = Math.round(ky*100)/100;
        res.ky = ky.toFixed(2);
        res.agfr_e = temp_agfr;
        res.agfr = agfr;
        res.bmi_e = bmi;
        // res.bmi = Math.round(bmi*10)/10;
        res.bmi = bmi.toFixed(1);

        res.calculated = true;

        gfr_resultat1();

        // since data here is changed, the data in the pf form may not be current - clear inj parameters and decision
        prot_reset_pf_forms();
        prot_recalc();
        // clear gfr etc in vol form
        vol_recgfrdata(res.agfr);

        return;
    }
    else if ( ! isNaN(res.langd) && ! isNaN(res.vikt) ) {  // enough data for bmi calculations submitted.
                                                // weight guaranteed by form validation
        res.bmi_e = calc_bmi(res.vikt, res.langd);
        res.bmi = res.bmi_e.toFixed(1);

        gfr_resultat2();

        // since data here is changed, then data in the pf form may not be current - clear inj parameters and decision
        prot_reset_pf_forms();
        prot_recalc();
    }
    else if ( ! isNaN(res.vikt) ) {   // we have at least weight.
        // since data here is changed, then data in the pf form may not be current - clear inj parameters and decision
        prot_reset_pf_forms();
        prot_recalc();
    }
}



/*
 * Displays the data in the res global containing gfr, body area and bmi.
 * Generally called from gfr_submit_gfr_form()
 */
function gfr_resultat1() {
    res1_filled = true;
    const ut = document.getElementById("res1");

    // snygg text
    let stext = res.sex == 1 ? "Man " : "Kvinna ";
    stext += res.age + " år. " + res.langd + " cm. " + res.vikt + " kg. Kreatinin: " + res.kreatinin + " μmol/L.";
    if ( res.rev ) 
        stext += " Reviderat kreatinin: " + Math.round(res.rev_kreatinin) + " μmol/L.\n";
    else
        stext += "\n";
    stext += "BMI: " + res.bmi + " kg/m^2\n";
    stext += "aGFR: " + res.agfr + " ml/min.  rGFR: " + res.rgfr + " ml/(min*1.73m^2) (estimerade värden)";
    document.getElementById("copy-hidden").textContent = stext;

    // snabblänk att skicka... location.href är inkl ev get-parametrar
    let ltext = (res.sex == 1 ? "Man" : "Kvinna") + " " + res.age + " år.  " + res.langd + " cm.  " + res.vikt + " kg.";
    ltext += " Kreatinin: " + Math.round(res.kreatinin) + ".";
    if ( res.rev )
        ltext += " revKreatinin: " + Math.round(res.rev_kreatinin) + ".";
    ltext += "\nBMI: " + res.bmi + "\n";
    ltext += "\aGFR: " + res.a1gfr + "    rGFR: " + res.rgfr + "\n";
    ltext += location.origin + location.pathname + "?age=" + res.age + "&langd=" + res.langd + "&vikt=" + res.vikt +
             "&kreat=" + res.kreatinin + "&sex=" + res.sex + "&calc=1";
    document.getElementById("copy1").textContent = ltext;

    // display text
    let utstr = "";
    // utstr = "Resultat:<br/>";
    utstr += res.sex == 1 ? "Man " : "Kvinna ";
    utstr += res.age + " år, längd: " + res.langd + " cm, vikt: " + res.vikt + " kg, kreatinin " + res.kreatinin + " μmol/L<br/>";
    if ( res.rev ) {
        utstr += "<span class='hl'>OBS! Den reviderade-LM-metoden har använts för beräkning av rGFR då personen är under 18 år.<br/>";
        utstr += "aGFR har erhållits från rGFR efter beräkning av kroppsyta enligt du Bois och du Bois.</span><br/>";
        utstr += "Reviderat kreatinin: " + Math.round(res.rev_kreatinin) + " μmol/L <br/>";
    }
    if (res.bmi > 40) {
        utstr += "<span class='hl'>Formlerna är inte tillräckligt validerade för patienter med BMI > 40. Skattade värden bör tolkas med försiktighet.</span><br/>";
    }
    utstr += "Relativt GFR (rGFR): <span class='hl'>&nbsp;" + res.rgfr + " </span> ml/(min * 1.73 m<sup>2</sup>) (estimerat)<br/>";
    utstr += "Absolut GFR (aGFR): <span class='hl'>&nbsp;" + res.agfr + " </span> ml/min (estimerat)<br/>";
    utstr += "BMI: <span class='hl'>&nbsp;" + res.bmi + " </span>kg/m<sup>2</sup><br/>";
    utstr += "Kroppsyta: " + res.ky + " m<sup>2</sup> (estimerat)<br/><br/>";
    // utstr += "<button onclick='fcopy(\"copy-hidden\");'>Kopiera</button><br/>";
    utstr += "<button onclick='fcopy(\"copy-hidden\");'>Kopiera</button> &nbsp&nbsp";
    utstr += "<button onclick='fcopy(\"copy1\");'>Kopiera koncis + länk</button>";
    ut.innerHTML=utstr;
}

/*
 * Display bmi
 */
function gfr_resultat2() {
    res1_filled = true;
    const ut = document.getElementById("res1");

    // snygg text
    let stext = res.langd + " cm. " + res.vikt + " kg.";
    stext += "BMI: " + res.bmi + " kg/m^2\n";
    document.getElementById("copy-hidden").textContent = stext;

    let utstr = "";
    // utstr = "Resultat:<br/>";
    utstr += "<span style='font-size: 90%;'>Beräkningen nedan baseras på en ";
    utstr += "längd: " + res.langd + " cm, vikt: " + res.vikt + " kg</span><br/>";
    utstr += "BMI: <span class='hl'>&nbsp;" + res.bmi + " </span>kg/m<sup>2</sup><br/>";
    utstr += "<button onclick='fcopy(\"copy-hidden\");'>Kopiera</button>";
    ut.innerHTML=utstr;
}

/*
 * Called on change of the gfr form data
 * Set on the form (and changes in input elements bubble up to this
 */
function gfr_change(e) {
    let el = e.target;

    gfr_resetgfrdata();

    /*
    // Not really needed
    // But can be used by setting data-name to the corresponding name of the "struct memeber"/"object memeber" in gl
    // if (  ! ( el.checkValidity() &&  ( /^[0-9]*$/.test(el.value)) ) ) {
    if (  el.checkValidity() ) {
        let t = el.getAttribute('data-name');
        if ( t != null) gl[t] = el.value;
    }
    else {
        alert( "Heltalsvärde med: " + el.min + " ≤ värde ≤ " + el.max);
        el.value = "";
        el.focus();
    }
    */

    if ( ! el.checkValidity() ) {
        alert( "Heltalsvärde med: " + el.min + " ≤ värde ≤ " + el.max);
        el.value = "";
        el.focus();
    }


}


/* reset gfr "calculations" (sets calculated to false in gl and res global vars and clear display of result when changing values in gfr form
 * Called on "onchange" on all gfr form input elements
 * Arg1: rensa (boolean) - if true, clears the gfr form
 */
function gfr_resetgfrdata(rensa) {
    if (res1_filled) {
        document.getElementById("res1").innerText = "";
        document.getElementById("copy-hidden").innerText = "";
        document.getElementById("copy1").innerText = "";
    }
    res.calculated = false;
    res1_filled = false;
    // recheck form validation - not very nice...
    // fgfr.gfr_form.reportValidity();

    // we also need to clear the protokoll
    // We could recalculate the protokoll form but that would probably be annoying...
    prot_reset_pf_forms();

    if (rensa) {
        fgfr.gfr_form.reset();
    }
}

/*
 * This is the same as above with the addition that the form i validated! This is for changing just the weight
 */
/*
function gfr_resetgfrdata2() {
    if( fgfr.gfr_form.reportValidity() ) {
        gfr_resetgfrdata(false);
    }
    else { 
        setTimeout(gfr_resetweight, 2000);
        // fgfr.gfr_weight.value = ""; // aaargh. For some reason, this is exceuted BEFORE the browser validation report... Need som wait before setting it
        return;
    }
}

function gfr_resetweight() {
    fgfr.gfr_weight.value = "";
}

*/


