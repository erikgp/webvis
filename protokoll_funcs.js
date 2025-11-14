/*
 * Denna fil innehåller protokollspecifika funktioner.
 * Alla funktioner ska ha samma signatur, och ska sålunda ta samma argument nämligen:
 * Arg1: ett html element (där tanken är att detta ska användas för output)
 * Arg2: ett resultatobject såsom def i gfr.js
 * Arg3: ett protokolobject såsom definierat i protokoll_data.js
 * Arg4: ett pd_objekt, vilket innehåller motsvarande innehållet i pd formen i prot.js/kontrast.html, dvs med följande members:
 *          weight (int), height (int), bmi (float), agfr (float), rgfr (float), varav vissa kan vara NaN
 * Arg5: ett pf objekt, vilket innehåller motsvarande innehållet i pf form, frånsett framräknade värden, dvs med följande members (alla som int):
 *          dos, konc, tid, maxvikt, varav vissa kan vara NaN
 *
 * Funktionerns ska inte returnera något
 */

function pfunc_hals_torax_buk(e, resultat, pr, pd_obj, pf_obj) {
    const inj1_tid = 25;
    const inj2_tid = 15;
    const inj1_prop = 0.7;
    const inj2_prop = 0.3;

    const vikt = Math.min(pd_obj.weight, pf_obj.maxvikt);
    const vol = Math.round(vikt * pf_obj.dos / pf_obj.konc);

    const inj1_vol = Math.floor(vol * inj1_prop);
    const inj1_injh = (inj1_vol / inj1_tid).toFixed(1);

    const inj2_vol = Math.ceil(vol * inj2_prop);
    const inj2_injh = (inj2_vol / inj2_tid).toFixed(1);

    let utstr = "Den totala mängden kontrastmedel, " + vol + " ml kontrast med koncentrationen " + pf_obj.konc + " mg I/ml, ";
    utstr += "ska delas upp på 2 injektioner enligt ovan.<br/>";
    utstr += "Det ger:<br/>"
    utstr += "<b>Inj 1:</b><br/>Volym: " + inj1_vol + " ml<br/>Injektionshastighet: " + inj1_injh + " ml/s<br/>";
    utstr += "<b>Inj 2:</b><br/>Volym: " + inj2_vol + " ml<br/>Injektionshastighet: " + inj2_injh + " ml/s<br/>";
    e.innerHTML = utstr;
}

