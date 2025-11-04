
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


// globla var - data populated from the gfr form
// Note: calculed is set when the data is consistent and filled (ALL data). Should be checked before using gl
const gl = {
content: ['age', 'rev_age', 'langd', 'vikt', 'kreatinin', 'rev_kreatinin', 'sex', 'calculated', 'rev'],
age : -1,
rev_age: -1,
langd : -1,
vikt : -1,
kreatinin : -1,
rev_kreatinin: -1,
sex : -1,   // female = 0, male = 1
calculated: false,
rev: false,   // if revised age and kreat is used
}


// global var with the results from calculating gfr - neg values indicate no calculated current values
// Note: calculted is set when the data is consistent and filled (ALL data). Should be checked before using res
const res = {
    rgfr: -1,           // rounded value - not javascript does not round in a nice way
    rgfr_e: -1.0,       // "exact" value
    agfr: -1,
    agfr_e: -1.0,
    bmi: -1,
    bmi_e: -1.0,
    ky: -1,
    ky_e: -1.0,
    calculated: false,
    // calculated_bmi: false,
}



// populate gl global with values from gfr form input elements
// Note: input form elements are populatad in script in html file. For example: fgfr.gfr_age corresponds to document.getElementById("gfr_age") etc
// Note: basic check for numbers
function gfr_getVals() {
gl.age = parseInt(fgfr.gfr_age.value);
gl.rev_age = gl.age;                         // initial value
gl.langd = parseInt(fgfr.gfr_height.value);
gl.vikt = parseInt(fgfr.gfr_weight.value);
gl.kreatinin = parseInt(fgfr.gfr_kreat.value);
gl.rev_kreatinin = gl.kreatinin;             // initial value
// sex = 1;   // female
gl.sex = parseInt(document.querySelector('input[name="gfr_sexbtn"]:checked').value);
let t = true;
// for (i in gl) {    // This may break! No guarantee of sort order!!!
for ( i of gl.content ) {
    if (i == "sex") break;      // string comp based on contents, not ref??? Seems to work
    // t = t && isNumber(gl[i]);
    t = t && isNumber(gl[i]) && gl[i] > 0;      // add check that the number is > 0 as well, even though it is not strictly needed
}
gl.calculated = t;
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
    // populate global gl object with values from gfr from
    gfr_getVals();


    /*
    if (! gl.calculated) {  // should never be the case...
        return;
    }
    */

    // only weight is required!
    // The following are allowed: (weight), (height, weight), (age, height, weight, kreat, sex).
    // No other combinations are allowed, except sex is always submitted. Weight is guaranteed from form validation

    // All values submitted? sex is always submitted. Weight guaranteed by form validation
    if ( (fgfr.gfr_age.value != "") && (fgfr.gfr_height.value != "") && (fgfr.gfr_kreat.value != "") ) { // all data for gfr calc submitted


        if (gl.age < 18) { // form validation should ensure it is age >= 2
            let alertstring = "Aktuell metod bör användas med försiktighet för barn >= 2 år och yngre än 18 år, och för barn endast tillsammans med den reviderade LM-metoden.\n" +
                   "Metoden beräknar ett till 18 år justerat kreatininvärde som sedan används tillsammans med REV-LM-metoden och 18 år.\n" +
                   "aGFR från rGFR bör tolkas ytterligt försiktigt, och metoden är ej validerad för detta.\n" +
                   "Se Läkartidningen. 2021;118:20134";
            alert(alertstring);
            gl.rev_kreatinin = rev_kreat_child(gl.age, gl.kreatinin, gl.sex);
            gl.rev_age = 18;
            gl.rev = true;
        }
        else {
            gl.rev_kreatinin = gl.kreatinin;
            gl.rev_age = gl.age;
            gl.rev = false;
        }

        // get rGFR according to current method according to function pointer
        // let [temp_agfr, temp_rgfr, ky] = kreat_gfr_func(gl.rev_age, gl.vikt, gl.langd, gl.rev_kreatinin, gl.sex, 0);
        let [temp_agfr, temp_rgfr, ky] = [0, 0, 0];

        // always rev-lm as lm-method when children - se LT
        if ( gl.age < 18 ) {
            [temp_agfr, temp_rgfr, ky] = wr_rgfr_revlm(gl.rev_age, gl.vikt, gl.langd, gl.rev_kreatinin, gl.sex, 0);
        }
        else {
            [temp_agfr, temp_rgfr, ky] = kreat_gfr_func(gl.rev_age, gl.vikt, gl.langd, gl.rev_kreatinin, gl.sex, 0);

        }

        let rgfr = Math.round(temp_rgfr);
        let agfr = Math.round(temp_agfr);

        // bmi
        let bmi = calc_bmi(gl.vikt, gl.langd);

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

        // since data here is changed, then data in the pf form may not be current - clear inj parameters and decision
        prot_reset_pf_forms();
        prot_recalc();
        // clear gfr etc in vol form
        vol_recgfrdata(res.agfr);

        return;
    }
    else if ( fgfr.gfr_height.value != ""  ) {  // enough data for bmi calculations submitted.
                                                // weight guaranteed by form validation
        res.bmi_e = calc_bmi(gl.vikt, gl.langd);
        res.bmi = res.bmi_e.toFixed(1);

        gfr_resultat2();

        // since data here is changed, then data in the pf form may not be current - clear inj parameters and decision
        prot_reset_pf_forms();
        prot_recalc();
    }
    else {   // we have at least weight.
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
    const ut = document.getElementById("res1");
    let utstr = "";
    // utstr = "Resultat:<br/>";
    utstr += "<span style='font-size: 90%;'>Beräkningen nedan baseras på en ";
    utstr += gl.sex == 1 ? "man " : "kvinna ";
    utstr += "med ålder: " + gl.age + " år, längd: " + gl.langd + " cm, vikt: " + gl.vikt + " kg, och kreatinin " + gl.kreatinin + " μmol/L</span><br/>";
    if ( gl.rev ) {
        utstr += "<span class='hl'>OBS! Den reviderade-LM-metoden har använts för beräkning av rGFR då personen är under 18 år.<br/>";
        utstr += "aGFR har erhållits från rGFR efter beräkning av kroppsyta enligt du Bois och du Bois.</span><br/>";
        utstr += "Reviderat kreatinin: " + Math.round(gl.rev_kreatinin) + " μmol/L <br/>";
    }
    if (res.bmi > 40) {
        utstr += "<span class='hl'>Formlerna är inte tillräckligt validerade för patienter med BMI > 40. Skattade värden bör tolkas med försiktighet.</span><br/>";
    }
    utstr += "Relativt GFR (rGFR): <span class='hl'>&nbsp;" + res.rgfr + " </span> ml/(min * 1.73 m<sup>2</sup>)<br/>";
    utstr += "Absolut GFR (aGFR): <span class='hl'>&nbsp;" + res.agfr + " </span> ml/min<br/>";
    utstr += "BMI: <span class='hl'>&nbsp;" + res.bmi + " </span>kg/m<sup>2</sup><br/>";
    utstr += "Kroppsyta: " + res.ky + " m<sup>2</sup><br/>";
    // snabblänk att skicka... location.href är inkl ev get-parametrar
    utstr += "<pre id='copy1'>\n" + (gl.sex == 1 ? "Man" : "Kvinna") + " " + gl.age + " år. Längd: " + gl.langd + " cm. Vikt: " + gl.vikt +
             " kg. Kreatinin: " + Math.round(gl.kreatinin) + "\n" + location.origin + location.pathname + "?age=" + gl.age + "&langd=" + gl.langd + "&vikt=" + gl.vikt + 
             "&kreat=" + gl.kreatinin + "&sex=" + gl.sex + "</pre>";
    utstr += "<button onclick='fcopy(\"copy1\");'>Kopiera</button>";
    ut.innerHTML=utstr;
}

/*
 * Display bmi
 */
function gfr_resultat2() {
    const ut = document.getElementById("res1");
    let utstr = "";
    // utstr = "Resultat:<br/>";
    utstr += "<span style='font-size: 90%;'>Beräkningen nedan baseras på en ";
    utstr += "längd: " + gl.langd + " cm, vikt: " + gl.vikt + " kg</span><br/>";
    utstr += "BMI: <span class='hl'>&nbsp;" + res.bmi + " </span>kg/m<sup>2</sup><br/>";
    ut.innerHTML=utstr;
}


/* reset gfr "calculations" (sets calculated to false in gl and res global vars and clear display of result when changing values in gfr form
 * Called on "onchange" on all gfr form input elements
 * Arg1: rensa (boolean) - if true, clears the gfr form
 */
function gfr_resetgfrdata(rensa) {
    if ( gl.calculated || res.calculated ) {
        document.getElementById("res1").innerText = "";
        gl.calculated = false;
        res.calculated = false;
    }
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


