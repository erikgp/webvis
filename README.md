# Verktyg för att estimera rGFR och aGFR från kreatinin samt beräkna injektionsparametrar för kontrastmedelsundersökning vid CT

Ovanstående program grundar sig på Omnivis och Omniject och har i stort sett all funktionalitet som finns i dessa vad
avser estimering av rGFR och aGFR från kreatinin, samt beräknings av injektionsparametrar baserat på dos, kontrastmedelskoncentration,
injektionshastighet och maximal vikt.

Programmet använder som standard den rev-LM-metoden för skattning av aGFR och rGFR från kreatinin.
Övriga metoder för skattning av GFR från kreatinin är tillgängliga via get-parameter, men inte annars via gränssnittet.

Metoder för beräkning av GFR från cystatin-c finns i koden men är ej exponerade.

Programmet beräknar rGFR och aGFR för vuxna över 18 år. 
Dock finns även möjlighet att beräkna rGFR enl. rev-LM-metoden för barn 2-18 år.
Då kroppsytan beräknas enligt Dubois och Dubois är det dock tveksamt i vilken grad rGFR kan översättas till aGFR för barn enligt Dubois och Dubois (originalartikeln går ej att nå).

Webbsidan är helt fristående och använder inte javascript-bibliotek som tex jquery, vilket gör att sidan inte kräver betydande nedladdning.

Gränssnittet består av 3 fristående delar:

- En för beräkning av rGFR och aGFR

- En för beräkning av volym kontrastmedel som motsvarar viss aGFR vid viss kvot, samt vilken kvot en given volym kontrastmedel av viss koncentration motsvarar.

- En för beräkning av parametrar (inj.hastighet, volym etc) från protkollparametrar.

Data från GFR-beräkningen kan dock automatiskt föras över till de båda andra delarna ("Beräkna överför") eller i protkolldelen hämtas GFR-delen ("Hämta och beräkna").

Rimligt modern webbläsare krävs då valideringen av indata till huvudsak sköts via webbläsarnas automatiska validering av form-data.

I de flesta fall beräknar programmet utdata så snart all behövlig indata finns (formen skickas också automatiskt då man trycker "enter" i ett indata-fält).

Programmet ser till att inte inkonsistent data visas. Med inkonsistent data avses data som inom en av de tre delarna ovan inte stämmer.
Om tex vikten ändras i GFR-beräkningsmodulen så tas resultatet bort.


Bland annat kvar att göra:

- arkaisk javascript - senast programmeraren till koden i ett riktigt projekt använde javascript var för drygt 25 år sedan.

- Sökfunktion för undersökningar, utöver att ange 1:a bokstaven, i select-boxen saknas. Planeras att försöka få fuzzy search för detta.

- Gränssnittet ej snyggt.



