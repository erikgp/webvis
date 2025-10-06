# Verktyg för att estimera rGFR och aGFR från kreatinin samt beräkna injektionsparametrar för kontrastmedelsundersökning vid CT

Ovanstående program grundar sig på Omnivis och Omniject och har i stort sett all funktionalitet som finns i dessa vad
avser estimering av rGFR och aGFR från kreatinin, samt vad avser beräknings av injektionsparametrar baserat på dos, kontrastmedelskoncentration,
injektionshastighet och maximal vikt.

Programmet använder som standard rev-LM-metoden för skattning av aGFR och rGFR från kreatinin.
Övriga metoder för skattning av GFR från kreatinin är tillgängliga via get-parameter, men inte annars via gränssnittet.

Metoder för estimering av GFR från cystatin-c finns i koden men är ej exponerade.

Programmet beräknar rGFR och aGFR för vuxna över 18 år. 
Dock finns även möjlighet att beräkna rGFR enl. rev-LM-metoden för barn 2-18 år.
Då kroppsytan beräknas enligt Dubois och Dubois är det dock tveksamt i vilken grad rGFR kan översättas till aGFR för barn enligt Dubois och Dubois (originalartikeln går ej att nå).

Webbsidan är helt fristående och använder inte javascript-bibliotek som tex jquery, vilket gör att sidan inte kräver betydande nedladdning.

Gränssnittet består av 3 fristående delar:

- En del för estimering av rGFR och aGFR från kreatinin.

- En del för beräkning av volym kontrastmedel som motsvarar viss aGFR vid viss kvot, samt vilken kvot en given volym kontrastmedel av viss koncentration motsvarar.

- En del för beräkning av parametrar (inj.hastighet, volym etc) från protkollparametrar.

Data från GFR-beräkningen kan dock automatiskt föras över till de båda andra delarna ("Beräkna överför") eller i protkolldelen hämtas GFR-delen ("Hämta och beräkna").

Rimligt modern webbläsare krävs då valideringen av indata i huvudsak sköts via webbläsarnas automatiska validering av form-data.

I de flesta fall beräknar programmet utdata så snart all behövlig indata finns (formen skickas också automatiskt då man trycker "enter" i ett indata-fält).

Programmet ser till att inkonsistent data inte visas. Med inkonsistent data avses data som inom en av de tre delarna ovan inte stämmer.
Om tex vikten ändras i GFR-beräkningsmodulen så tas ev. tidigare resultat bort.

Avseende protokolldelen så hämtas protokolldata från filen "protokoll_data.js" samt undersökningsdata från filen "us_data.js".
Dessa båda innehåller i stort sett enbart json-data.

Till varje undersökning finns ett kopplat protokoll.
Ett protokoll kan sålunda användas till flera undersökningar genom att dessa undersökningar anger samma protokoll.

Då programmet till stor del bygger på Omnivis och Omniject finns verktyg för att överföra InjHast.txt till json-formatet (python: tojson3.py),
samt omvänt att överföra json-formatet för protokoll till InjHast.txt (convertprottocsv.html).
Notera dock att InjHast.csv har teckenkodningen iso-8859-1 (latin1) respektive använder DOS-radslut, medan protokoll_data.js använder utf-8 och unix-radslut.

Innan konvertering från InjHast.txt till json behöver InjHast.txt således konverteras till utf-8 och unix-radslut.
Detta kan göras tex med Notepad++.

Pss krävs konvertering av data från convertprottocsv.html till iso-8859-1 och dos-radslut.
Även detta kan göras tex med en editor som Notepad++.


Bland annat följande finns kvar att göra:

- validering av metoder för beräkning av aGFR och rGFR mot andra program för att kontrollera korrektheten i algoritmerna.

- arkaisk javascript - senast utvecklaren av koden använde javascript i ett riktigt projekt var för drygt 25 år sedan.

- Sökfunktion för undersökningar, utöver att ange 1:a bokstaven, i select-boxen saknas. Planeras att försöka få fuzzy search för detta.

- Gränssnittet är ej snyggt.

- Grav svengelska i namngivning och kommentarer




