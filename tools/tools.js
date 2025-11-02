
/*
 * Given an a content, a filename and a content type
 * let the user save the content.
 * Args:
 *    content - a javascript object to save
 *    filename - the filname used (generally the user can change this in the save dialog)
 *    contentType - the content type
 * Ex:
 *   downloadBlob(a, 'filnamet.txt', 'text/plain;charset=utf-8;')
 */
function downloadBlob(content, filename, contentType) {
    // Create a blob
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);
    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
}


/*
 * Generate a csv string from content of protarr, in turn in protokol format.
 * Args:
 *   protarr - see above
 * Returns:
 *   A string with a csv representation of the content of protarr
 */
function genCSVstr(protarr) {
    let utstr = "";
    for (const i of protarr) {
        utstr += "\"" + i.name + "\",";
        utstr += i.dos + ",";
        utstr += i.konc + ",";
        utstr += i.tid + ",";
        utstr += i.maxvikt + ",";
        utstr += "\"" + i.info + "\",";
        utstr += "\"" + i.comment + "\"\n";
    }

    return utstr;
}


/*
 * Generate a csv string in raw format (no html entities) from content of protarr, in turn in protokol format.
 * Args:
 *   protarr - see above
 * Returns:
 *   A string with a raw csv format, of the content of protarr
 */
function genCSVrawstr(protarr) {
    let utstr = "";
    for (const i of protarr) {
        utstr += "\"" + rawText(i.name) + "\",";
        utstr += i.dos + ",";
        utstr += i.konc + ",";
        utstr += i.tid + ",";
        utstr += i.maxvikt + ",";
        utstr += "\"" + rawText(i.info) + "\",";
        utstr += "\"" + rawText(i.comment) + "\"\n";
    }

    return utstr;
}


/*
 * Generate a csv string in InjHast.txt format from content of protarr, in turn in protokol format.
 * Args:
 *   protarr - see above
 * Returns:
 *   A string with a csv representation, in InhHast.txt format, of the content of protarr
 */
function genIHCSVstr(protarr) {
    let utstr = "";
    for (const i of protarr) {
        // utstr += "\"" + i.name.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&") + "\",";
        utstr += "\"" + rawText(i.name) + "\",";
        utstr += i.dos + ",";
        utstr += i.konc + ",";
        utstr += i.tid + ",";
        utstr += Math.round(parseInt(i.dos) / parseInt(i.tid)) + ",";
        utstr += i.maxvikt + ",";
        // utstr += "\"" + i.info.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replaceAll("<br/>","\n") + "\"\n";
        utstr += "\"" + rawText(i.info) + "\"\n";
    }

    return utstr;
}



/*
 * Display prot in protokoll format in a table inside div divel
 */
function dispProtTable(prot, divel) {
    let text = [ "Namn", "Dos", "Konc", "Inj.tid", "Maxvikt", "Info", "Kommentar" ];

    let tbl = document.createElement("table");
    let head = document.createElement("thead");
    let tr = document.createElement("tr");

    for (const i of text ) {
        let the = document.createElement("th");
        the.innerHTML = i;
        tr.appendChild(the);
    }
    head.appendChild(tr);
    tbl.appendChild(head);


    let tb = document.createElement("tbody");

    // a = document.getElementById("aa");
    for (const i of prot) {
        let tre = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = i.name;
        let td2 = document.createElement("td");
        td2.innerHTML = i.dos;
        let td3 = document.createElement("td");
        td3.innerHTML = i.konc;
        let td4 = document.createElement("td");
        td4.innerHTML = i.tid;
        let td5 = document.createElement("td");
        td5.innerHTML = i.maxvikt;
        let td6 = document.createElement("td");
        td6.innerHTML = i.info;
        let td7 = document.createElement("td");
        td7.innerHTML = i.comment;

        tre.appendChild(td1);
        tre.appendChild(td2);
        tre.appendChild(td3);
        tre.appendChild(td4);
        tre.appendChild(td5);
        tre.appendChild(td6);
        tre.appendChild(td7);

        tb.appendChild(tre);
        // a.appendChild(tre);
        // console.log(i);
    }
    tbl.appendChild(tb);
    divel.appendChild(tbl);
}



/*
 * Converts an array in protocol format to a json string etc
 * Note: JSON.stringify does not produce an editable result and is not used
 */
function prot2str(prot) {
    let first = true;
    let utstr = "protokoll = [\n";
    for (a of prot) {
        if ( ! first ) {
            utstr += ",\n";
        }
        first = false;
        utstr += "{\n";
        utstr += "name: \"" + a.name + "\",\n"; 
        utstr += "dos: " + a.dos + ",\n"; 
        utstr += "konc: " + a.konc + ",\n"; 
        utstr += "tid: " + a.tid + ",\n"; 
        utstr += "maxvikt: " + a.maxvikt + ",\n"; 
        utstr += "info: \"" + a.info + "\",\n"; 
        utstr += "comment: \"" + a.comment + "\"\n";
        utstr += "}" 
    }
    utstr += "\n];\n\n";

    return utstr;
}


/*
 * Converts the contents of the string s to html entities
 * NOT foolproof
 */
function htmlEscape(s) {
    // This can work, however linebreaks are a problem:
    // escape(">").replace(/%(..)/g,"&#x$1;")

    /*
    let str = s.replace(/&/g, '&amp').replace(/'/g, '&apos').replace(/"/g, '&quot').replace(/>/g, '&gt').replace(/</g, '&lt').replace(/(?:\r\n|\n\r|\r|\n)/g, '<br/>');
    return str;
    */

    // Textarea variant. Probably better. however also probably slower
    let ta = document.createElement("textarea");
    ta.textContent = s;
    return ta.innerHTML.replace(/(?:\r\n|\n\r|\r|\n)/g, '<br/>');
}


/*
 * Converts a string s with html entities to a raw string.
 */
function rawText(s) {
    // This is probabl faster but a not as foolproof:
    //   replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replaceAll("<br/>","\n")
    s = s.replace(/(?:<br>|<br\/>)/g, "\n" );
    let ta = document.createElement("textarea");
    ta.innerHTML = s;
    return ta.textContent;    
}


