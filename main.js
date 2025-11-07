
// Main version of program:
prog_version = "v0.5.7 (2025-11-02)";


/*
 * Function that checks if x is a number.
 * Returns true if x is a number, otherwise false
 * Note: isNaN("") == false, isNaN(null) == false, isNaN("10") == false so can not be used...
 * Note: isNaN(parseFloat("")) == true, isNaN(parseFloat(null)) == true, but isNaN(parseFloat("10")) = false
 * isFinite() SUCKS as well
 * typeof(NaN) == 'nunber' .....
 * JS really really really SUCKS
 * Will use typeof instead
 */
function isNumber(x) {
    return (typeof(x) === 'number' && ! isNaN(x)) ? true : false;
}



/*
 * kopierar innheållet i element med angiven id (parameter) till clipboard
 */ 
function fcopy(x) {
    const t = document.getElementById(x);
    navigator.clipboard.writeText(t.innerText);
}


/*
 * Kopierar texten s till clipboard
 * Not much use of this unless s is global...
 */
function tcopy(s) {
    navigator.clipboard.writeText(s);
}


// this is not necessary, but here I set up a collection with name vs input element
// for easier access to the data in the input elements.
// Will be populated with document.getElementById() for the input elements as well as the forms
// dont want to use jquery, at least not loaded from CDN
fgfr = {};
fvol = {};
pfsel = {};
pf = {};
pf2 = {};

/* 
 * Called on initialization of the page.
 * Populates vars above for easier access to form and input elements on the page
 */
function get_form_elements() {
    fgfr.gfr_form = document.getElementById("gfr_form");
    fgfr.gfr_age = document.getElementById("gfr_age");
    fgfr.gfr_height = document.getElementById("gfr_height");
    fgfr.gfr_weight = document.getElementById("gfr_weight");
    fgfr.gfr_kreat = document.getElementById("gfr_kreat");
    // SEX

    fvol.vol_gfr = document.getElementById("vol_gfr");
    fvol.vol_kvot = document.getElementById("vol_kvot");
    fvol.vol_vol = document.getElementById("vol_vol");
    fvol.vol_konc = document.getElementById("vol_konc");

    pfsel.pf_proto = document.getElementById("pf_proto");

    pf.pf_form = document.getElementById("pf_form");
    pf.pf_dos = document.getElementById("pf_dos");
    pf.pf_konc = document.getElementById("pf_konc");
    pf.pf_tid = document.getElementById("pf_tid");
    pf.pf_dosh = document.getElementById("pf_dosh");
    pf.pf_maxvikt = document.getElementById("pf_maxvikt");
    pf.pf_maxvol = document.getElementById("pf_maxvol");

    pf2.pf_form2 = document.getElementById("pf_form2");
    pf2.pf_pvol = document.getElementById("pf_pvol");
    pf2.pf_pinjh = document.getElementById("pf_pinjh");
    pf2.pf_pdos = document.getElementById("pf_pdos");
    pf2.pf_pkvot = document.getElementById("pf_pkvot");

}





// call with await sleep(<ms>)
// only ok from within async funcs
/*
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
*/

/*
 *
 * Usage:
const yourFunction = async () => {
  await delay(5000);
  console.log("Waited 5s");

  await delay(5000);
  console.log("Waited an additional 5s");
};

 */
// const delay = ms => new Promise(res => setTimeout(res, ms));


