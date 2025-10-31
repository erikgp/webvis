# Verktyg för att estimera rGFR och aGFR från kreatinin samt beräkna injektionsparametrar för kontrastmedelsundersökning vid CT

Ovanstående program grundar sig på Omnivis och Omniject och har i stort sett all funktionalitet som finns i dessa vad
avser estimering av rGFR och aGFR från kreatinin, samt vad avser beräknings av injektionsparametrar baserat på dos, kontrastmedelskoncentration,
injektionshastighet och maximal vikt.

Programmet använder som standard LM-LBM-metoden för skattning av aGFR och rGFR från kreatinin, förutom för barn där rev-LM används.
Övriga metoder för skattning av GFR från kreatinin är implementerade, men ej nåbara från gränssnittet då metoderna inte är tillräckligt validerade.

Metoder för estimering av GFR från cystatin-c finns i koden men är ej exponerade.

Programmet beräknar rGFR och aGFR för vuxna från 18 år och för barn 2 år och äldre. 
Då kroppsytan beräknas enligt Dubois och Dubois är det dock tveksamt i vilken grad rGFR kan översättas till aGFR för barn enligt Dubois och Dubois.

Webbsidan är helt fristående och använder inte javascript-bibliotek som tex jquery, vilket gör att sidan inte kräver betydande nedladdning och fungerar även om nätkoppling saknas.

Gränssnittet består av 3 fristående delar:

- En del för estimering av rGFR och aGFR från kreatinin.

- En del för beräkning av volym kontrastmedel som motsvarar viss aGFR vid viss kvot, samt vilken kvot en given volym kontrastmedel av viss koncentration motsvarar.

- En del för beräkning av parametrar (inj.hastighet, volym etc) från protkollparametrar.

Data från GFR-beräkningen förs automatiskt över till de båda andra delarna.

Rimligt modern webbläsare krävs då valideringen av indata i huvudsak sköts via webbläsarnas automatiska validering av form-data.

I de flesta fall beräknar programmet utdata så snart all behövlig indata finns (formen skickas också automatiskt då man trycker "enter" i ett indata-fält).

Programmet ser till att inkonsistent data inte visas. Med inkonsistent data avses data som inom en av de tre delarna ovan inte stämmer.
Om tex vikten ändras i GFR-beräkningsmodulen så tas ev. tidigare resultat bort.

Avseende protokolldelen så hämtas protokolldata från filen "protokoll_data.js".

Då programmet till stor del bygger på Omnivis och Omniject finns verktyg för att överföra InjHast.txt till json-formatet (python: tojson3.py),
samt omvänt att överföra json-formatet för protokoll till InjHast.txt (convertprottocsv.html).
Notera dock att InjHast.csv har teckenkodningen iso-8859-1 (latin1) respektive använder DOS-radslut, medan protokoll_data.js använder utf-8 och unix-radslut.

Innan konvertering från InjHast.txt till json behöver InjHast.txt således konverteras till utf-8 och unix-radslut.
Detta kan göras tex med Notepad++.

Pss krävs konvertering av data från convertprottocsv.html till iso-8859-1 och dos-radslut.
Även detta kan göras tex med en editor som Notepad++.


Bland annat följande finns kvar att göra:

- arkaisk javascript - senast utvecklaren av koden använde javascript i ett riktigt projekt var för drygt 25 år sedan.

- Gränssnittet är ej snyggt.

- Grav svengelska i namngivning och kommentarer




