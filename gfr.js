
/*
 * Kod för gfr-beräkning
 */


gfr_metod_info = "Estimerat relativt och absolut GFR baserat på kreatinin och estimerat rGFR enl. den reviderade Lund-Malmö-metoden.";

/*
 * Function "pointer" for calc gfr from kreat and data
 * All functions to calculate gfr from kreat have the same interface and returns the same values
 */
 kreat_gfr_func = wr_rgfr_revlm;


// globla var - data populated from the gfr form
// Note: calculed is set when the data is consistent and filled. Should be checked before using gl
const gl = {
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
// Note: calculted is set when the data is consistent and filled. Should be checked before using res
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
}


// reset gl global (ie set the value to not calculated)
function resetgl() {
    gl.calculated = false;
}


// reset the res global (ie set the value to not calculated)
function resetres() {
    res.calculated = false;
}




// populate gl global with values from gfr form input elements
// Note: input form elements are populatad in script in html file. For example: fgfr.gfr_age corresponds to document.getElementById("gfr_age") etc
// Note: basic check for numbers
function getVals() {
gl.age = parseInt(fgfr.gfr_age.value);
gl.langd = parseInt(fgfr.gfr_height.value);
gl.vikt = parseInt(fgfr.gfr_weight.value);
gl.kreatinin = parseInt(fgfr.gfr_kreat.value);
// sex = 1;   // female
gl.sex = parseInt(document.querySelector('input[name="gfr_sexbtn"]:checked').value);
let t = true;
for (i in gl) {
    if (i == "calculated") break;
    t = t && isNumber(gl[i]);
}
if (t) {
    gl.calculated = true;
}
else {
    gl.calculated = false;
}
}


/*
 * Function called when the gfr form i submitted and when clicking "beräkna och överför".
 * Note that we can expect the values in the form to exist and be valid because of auto form validation,
 * and, in case of called from "beräkna och överför" because of explicit form validation below
 * Arg 1: overfor - if true, will transfer gfr data to protokoll form and volume form, otherwise will not (this is handled by called function resultat1()).
 *          In case of transfer, clear calculated values in those forms (this is handled by called function resultat1())
 * 1. if not called when "submit" (ie when clicking "beräkna och överför") - check for valid form and, if not valid stop
 * 2. populate gl global with values from gfr form
 * 3. Calculates rgfr, agfr, body area, and bmi from form data (calling other funcs)
 * 4. Calls the function resultat1 to show results
 */
function submit_gfr_form(overfor) {
    if (overfor) {   // berakna för overfor = true kallas från kod. Det medför att validiteten inte kontrolleras - får göra det explicit
        let ret = fgfr.gfr_form.reportValidity();
        if (! ret ) {
            overfor = false;
            return;
        }
    }

    // populate global gl object with values from gfr from
    getVals();

    if (! gl.calculated) {  // should never be the case...
        return;
    }

    if (gl.age < 18) { // form validation should ensure it is age >= 2
        let alertstring = "Aktuell metod bör användas med försiktighet för barn >= 2 år och yngre än 18 år, och för barn endast tillsammans med den reviderad LM-metoden.\n" +
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

    // get rGFR according to rev-LM
    let [temp_agfr, temp_rgfr, ky] = kreat_gfr_func(gl.rev_age, gl.vikt, gl.langd, gl.rev_kreatinin, gl.sex, 0);
    let rgfr = Math.floor(temp_rgfr);   // avrunda nedåt till närmaste heltal
    let agfr = Math.floor(temp_agfr);

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

    resultat1(overfor);
}


/*
 * Displays the data in the res global containing gfr, body area and bmi.
 * Generally called from submit_gfr_form()
 * If overfor == true, then thansfer the data to the volume and protokoll forms, and clear the results in those forms
 */
function resultat1(overfor) {
    const ut = document.getElementById("res1");
    let utstr = "";
    // utstr = "Resultat:<br/>";
    utstr += "<span style='font-size: 90%;'>Beräkningen nedan baseras på en ";
    utstr += gl.sex == 1 ? "man " : "kvinna ";
    utstr += "med ålder: " + gl.age + " år, längd: " + gl.langd + " cm, vikt: " + gl.vikt + " kg, och kreat " + gl.kreatinin + " μmol/L</span><br/>";
    utstr += gl.rev ? "Reviderat kreatinin: " + Math.round(gl.rev_kreatinin) + " μmol/L <br/>" : "";
    utstr += "Relativt GFR (rGFR): <span class='hl'>&nbsp;" + res.rgfr + " </span> ml/(min * 1.73 m2)<br/>";
    utstr += "Absolut GFR (aGFR): <span class='hl'>&nbsp;" + res.agfr + " </span> ml/min<br/>";
    utstr += "BMI: <span class='hl'>&nbsp;" + res.bmi + " </span>kg/m<sup>2</sup><br/>";
    utstr += "Kroppsyta: " + res.ky + " m<sup>2</sup><br/>";
    // snabblänk att skicka... location.href är inkl ev get-parametrar
    utstr += "<pre id='copy1'>Patient med lågt GFR\n" + (gl.sex == 1 ? "Man" : "Kvinna") + " " + gl.age + " år. Längd: " + gl.langd + " cm. Vikt: " + gl.vikt +
             " kg. Kreat: " + Math.round(gl.kreatinin) + "\n" + location.origin + location.pathname + "?age=" + gl.age + "&langd=" + gl.langd + "&vikt=" + gl.vikt + 
             "&kreat=" + gl.kreatinin + "&sex=" + gl.sex + "</pre>";
    utstr += "<button onclick='fcopy(\"copy1\");'>Kopiera</button>";
    ut.innerHTML=utstr;

    // if overfor == true, the agfr and body mass values should be transferred to volym and protkoll forms.
    // The results of those forms should be cleared
    if ( overfor ) {
        vol_recgfrdata(res.agfr);
        prot_recgfrdata(res.agfr, res.rgfr, gl.vikt);
    }
}


/* reset gfr "calculations" (sets calculated to false in gl and res global vars and clear display of result when changing values in gfr form
 * Called on "onchange" on all gfr form input elements
 */
function resetgfrdata() {
    if ( gl.calculated || res.calculated ) {
        document.getElementById("res1").innerText = "";
        resetgl();
        resetres();
    }
}


