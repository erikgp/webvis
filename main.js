
// Main version of program:
prog_version = "v0.5.2 (2025-10-06)";


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


