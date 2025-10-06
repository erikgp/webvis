/*
 * Protokolldata genererad från InjHast.txt med Versionsdatum 2025-09-26
 * Genererat med tojson3.py med ej kompakt format ( le = "\n" )
 *
 * 1. Ändra teckenkodning och radslut i InjHast.txt och spara som i.csv
 *    iconv -f iso-8859-1 -t utf-8 tmp/InjHast.txt | dos2unix > tmp/i.csv
 * 2. Kört tojson3.py:
 *    python3 tojson3.py > i2.json
 * 3. Tagit bort protkoll som egentligen bara var kommentarer i InjHast.txt
 * 4. Lagt till versions-informationen nedan och denna samt ytterligare några kommentarer.
 * 5. Bytt namn till protokoll_data.js  (då testades)
 *
 */
protokoll_data_version = "2025-09-26";


protokoll = { 
/*
 * ------------------------------------------
 *              SIEMENS
 * ------------------------------------------
 */
"angio_arm": {
"name": "Angio arm",
"dos": 400,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "<br/>"
},
"angio_arm_80kv": {
"name": "Angio arm 80kV",
"dos": 250,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": ""
},
"angio_ben": {
"name": "Angio ben",
"dos": 400,
"konc": 350,
"tid": 17,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg evt reduceras ytterligare dock i vanliga fall ej under 320 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"angio_ben_80kv": {
"name": "Angio ben 80kV",
"dos": 250,
"konc": 350,
"tid": 17,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 200 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog.<br/>"
},
"ansikte_orbita": {
"name": "Ansikte orbita",
"dos": 400,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": ""
},
"aorta": {
"name": "Aorta",
"dos": 350,
"konc": 350,
"tid": 15,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 280 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"aorta_80kv": {
"name": "Aorta 80kV",
"dos": 200,
"konc": 350,
"tid": 15,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall  ej under 150 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"aorta_70kv": {
"name": "Aorta 70kV",
"dos": 150,
"konc": 350,
"tid": 15,
"maxvikt": 80,
"info": "OBS! Enbart bukaorta<br/><br/>70kV ska alltid godkännas av radiolog<br/><br/>Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 120 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"aorta_lungartarer": {
"name": "Aorta lungartärer",
"dos": 500,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "Takykard, gravid eller &lt;40 år. Justera till 600 mg jod/kg"
},
"aorta_lungartarer_80kv": {
"name": "Aorta lungartärer 80kV",
"dos": 275,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "Takykard, gravid eller &lt;40 år. Justera till 300 mg jod/kg"
},
"buk": {
"name": "Buk",
"dos": 500,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 400 mg jod/kg. Ändring av mg jod/kg ska godkännas av radiolog."
},
"buk_40_ar": {
"name": "Buk &lt;40 år",
"dos": 550,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 450 mg jod/kg. Ändring av mg jod/kg ska godkännas av radiolog."
},
"buk_80kv": {
"name": "Buk 80kV",
"dos": 300,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 250 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"buk_70kv": {
"name": "Buk 70kV",
"dos": 250,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "70kV ska alltid godkännas av radiolog<br/><br/>Beroende på njurfunktion och klinisk frågeställning kan mg jod/kg eventuellt reduceras, dock i vanliga fall ej under 200 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"bukkarl": {
"name": "Bukkärl",
"dos": 400,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 320 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"bukkarl_80kv": {
"name": "Bukkärl 80kV",
"dos": 250,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall  ej under 200 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"bukkarl_70kv": {
"name": "Bukkärl 70kV",
"dos": 200,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "70kV ska alltid godkännas av radiolog<br/><br/>Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 160 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"backenartarer_prostata": {
"name": "Bäckenartärer prostata",
"dos": 400,
"konc": 350,
"tid": 15,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 320 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"backenartarer_prostata_80kv": {
"name": "Bäckenartärer prostata 80kV",
"dos": 250,
"konc": 350,
"tid": 15,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 200 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"epigastrica_inferior": {
"name": "Epigastrica inferior",
"dos": 500,
"konc": 350,
"tid": 15,
"maxvikt": 80,
"info": "Beroende på  njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 400 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"epigastrica_inferior_80kv": {
"name": "Epigastrica inferior 80kV",
"dos": 300,
"konc": 350,
"tid": 15,
"maxvikt": 80,
"info": "Beroende på  njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 240 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"flebografi": {
"name": "Flebografi",
"dos": 600,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": ""
},
"flebografi_80kv": {
"name": "Flebografi 80kV",
"dos": 350,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": ""
},
"flebografi_70kv": {
"name": "Flebografi 70kV",
"dos": 300,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "Enbart buk / nedre extremiteter<br/><br/>70kV ska alltid godkännas av radiolog"
},
"hals": {
"name": "Hals",
"dos": 450,
"konc": 350,
"tid": 1,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 360 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog.<br/><br/>Totala kontrastmängden beräknas i Omniject inklusive gram jod/GFR ratio. Manuell beräkning av inj 1 och 2:<br/>Inj 1: 60% av kontrasten. 25 sek inj tid.<br/>Inj 2: 40% av kontrasten. 15 sek inj tid. "
},
"hals_80kv": {
"name": "Hals 80kV",
"dos": 250,
"konc": 350,
"tid": 1,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 200 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog.<br/><br/>Totala kontrastmängden beräknas i Omniject inklusive gram jod/GFR ratio. Manuell beräkning av inj 1 och 2:<br/>Inj 1: 60% av kontrasten. 25 sek inj tid.<br/>Inj 2: 40% av kontrasten. 15 sek inj tid. "
},
"hals_torax": {
"name": "Hals torax",
"dos": 600,
"konc": 350,
"tid": 1,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 480 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog.<br/><br/>Totala kontrastmängden beräknas i Omniject inklusive gram jod/GFR ratio. Manuell beräkning av inj 1 och 2:<br/>Inj 1: 70% av kontrasten. 25 sek inj tid.<br/>Inj 2: 30% av kontrasten. 15 sek inj tid. "
},
"hals_torax_80kv": {
"name": "Hals torax 80kV",
"dos": 350,
"konc": 350,
"tid": 1,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 280 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog.<br/><br/>Totala kontrastmängden beräknas i Omniject inklusive gram jod/GFR ratio. Manuell beräkning av inj 1 och 2:<br/>Inj 1: 70% av kontrasten. 25 sek inj tid.<br/>Inj 2: 30% av kontrasten. 15 sek inj tid. "
},
"hals_torax_buk": {
"name": "Hals torax buk",
"dos": 700,
"konc": 350,
"tid": 1,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 560 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog.<br/><br/>Totala kontrastmängden beräknas i Omniject inklusive gram jod/GFR ratio. Manuell beräkning av inj 1 och 2:<br/>Inj 1: 70% av kontrasten. 25 sek inj tid.<br/>Inj 2: 30% av kontrasten. 15 sek inj tid. "
},
"hals_torax_buk_80kv": {
"name": "Hals torax buk 80kV",
"dos": 450,
"konc": 350,
"tid": 1,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 380 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog.<br/><br/>Totala kontrastmängden beräknas i Omniject inklusive gram jod/GFR ratio. Manuell beräkning av inj 1 och 2:<br/>Inj 1: 70% av kontrasten. 25 sek inj tid.<br/>Inj 2: 30% av kontrasten. 15 sek inj tid. "
},
"hals_torax_buk_70kv": {
"name": "Hals torax buk 70kV",
"dos": 350,
"konc": 350,
"tid": 1,
"maxvikt": 80,
"info": "70kV ska alltid godkännas av radiolog<br/><br/>Totala kontrastmängden beräknas i Omniject inklusive gram jod/GFR ratio. Manuell beräkning av inj 1 och 2:<br/>Inj 1: 70% av kontrasten. 25 sek inj tid.<br/>Inj 2: 30% av kontrasten. 15 sek inj tid. "
},
"hjarna": {
"name": "Hjärna",
"dos": 420,
"konc": 350,
"tid": 60,
"maxvikt": 67,
"info": "Beroende på klinisk frågeställning och njurfunktion kan kontrastmängden eventuellt  reduceras till minimum 50 ml Omnipaque 350 mgI/ml eller 55 ml Visipaque 320 mgI/ml - ska godkännas av radiolog."
},
"lever_pankreas": {
"name": "Lever pankreas",
"dos": 600,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan jod/kg eventuellt reduceras dock i vanliga fall ej under 480 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"lever_pankreas_80kv": {
"name": "Lever pankreas 80kV",
"dos": 350,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "Beroende på indikation och njurfunktion kan jod/kg eventuellt reduceras dock i vanliga fall  ej under 300 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"lungartarer": {
"name": "Lungartärer",
"dos": 300,
"konc": 350,
"tid": 12,
"maxvikt": 80,
"info": "OBS!Takykard öka dos/kg till 360"
},
"lungartarer_80kv": {
"name": "Lungartärer 80kV",
"dos": 175,
"konc": 350,
"tid": 14,
"maxvikt": 80,
"info": "OBS! Takykard öka dos/kg till 210"
},
"lungartarer_40_ar_gravid": {
"name": "Lungartärer &lt;40 år/gravid",
"dos": 350,
"konc": 350,
"tid": 13,
"maxvikt": 80,
"info": "OBS! Takykard öka dos/kg till 420"
},
"lungven": {
"name": "Lungven",
"dos": 300,
"konc": 350,
"tid": 20,
"maxvikt": 90,
"info": ""
},
"njurar": {
"name": "Njurar",
"dos": 400,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan jod/kg eventuellt reduceras dock i vanliga fall ej under 320 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"njurar_80kv": {
"name": "Njurar 80kV",
"dos": 250,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "Beroende på njurfunktion  och frågeställning  kan jod/kg eventuellt reduceras dock i vanliga fall ej under 200 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"njurar_70kv": {
"name": "Njurar 70kV",
"dos": 200,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "70kV ska alltid godkännas av radiolog<br/><br/>Beroende på njurfunktion och klinisk frågeställning kan mg jod/kg eventuellt reduceras, dock i vanliga fall ej under 175 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
"thorax": {
"name": "Thorax",
"dos": 400,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan jod/kg eventuellt reduceras dock i vanliga fall ej under 320 mg jod/kg. . Ändring av mg jod/kg måste godkännas av radiolog."
},
"thorax_80kv": {
"name": "Thorax 80kV",
"dos": 250,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "Beroende på kliniska frågeställningen och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 200 mg jod/kg. Ändring av mg jod/kg måste godkännas av radiolog."
},
/*
 * -----------------------------------------------
 *                     GE
 * -----------------------------------------------
 */
"ge_angio_arm": {
"name": "GE Angio arm",
"dos": 450,
"konc": 350,
"tid": 25,
"maxvikt": 70,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 300 mg jod/kg. Dock är minsta tillåtna dosen 50 ml 2,0 ml/sek Omnipaque (55 ml 2,2 ml/s Visipaque) OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL:<br/>100ml 4,0ml/sek Omnipaque <br/>(109ml 4,4ml/sek Visipaque)"
},
"ge_angio_ben": {
"name": "GE Angio ben",
"dos": 520,
"konc": 350,
"tid": 30,
"maxvikt": 70,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 300 mg jod/kg. Dock är minsta tillåtna dosen 60 ml 2,0 ml/sek Omnipaque (66 ml 2,2 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL:<br/>120ml 4,0ml/sek Omnipaque <br/>(131ml 4,4ml/sek Visipaque)"
},
"ge_ansikte_orbita": {
"name": "GE Ansikte orbita",
"dos": 400,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": ""
},
"ge_aorta": {
"name": "GE Aorta",
"dos": 300,
"konc": 350,
"tid": 15,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 150 mg jod/kg. Dock är minsta tillåtna dosen 30 ml 2,0 ml/sek Omnipaque (33 ml 2,2 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL:<br/>80ml 5,3ml/sek Omnipaque <br/>(88ml 5,9ml/sek Visipaque)"
},
"ge_aorta_lungartarer": {
"name": "GE Aorta lungartärer",
"dos": 400,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 200 mg jod/kg. Dock är minsta tillåtna dosen 40 ml 2,0 ml/sek Omnipaque (44 ml 2,2 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL &lt;40 år: <br/>140ml 7,0ml/sek Omnipaque <br/>(153ml 7,7ml/sek Visipaque)<br/><br/>XXL &gt;40år:<br/>130ml 6,5ml/sek Omnipaque <br/>(142ml 7,1ml/sek Visipaque)"
},
"ge_aorta_le_buk": {
"name": "GE Aorta/LE + buk",
"dos": 525,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "DE: <br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 250 mg jod/kg. Dock är minsta tillåtna dosen 50 ml 2,0 ml/sek Omnipaque (54 ml 2,2 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL Lungartärer + buk &lt;40 år:<br/>120ml 7,3ml/sek Omnipaque <br/>(131ml 7,9ml/sek Visipaque)<br/><br/>XXL Lungartärer + buk &gt;40 år: <br/>120ml 6,7ml/sek Omnipaque <br/>(131ml 7,3ml/sek Visipaque)<br/><br/>XXL Aorta + buk:<br/>120ml 5,3ml/sek Omnipaque <br/>(130ml 5,8ml/sek Visipaque)"
},
"ge_buk": {
"name": "GE Buk",
"dos": 525,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "DE: <br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 250 mg jod/kg. Dock är minsta tillåtna dosen 46 ml 1,8 ml/sek Omnipaque (50 ml 2,0 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL: <br/>120ml 4,8ml/sek Omnipaque <br/>(131ml 5,2ml/sek Visipaque)"
},
"ge_buk_utan_de": {
"name": "GE Buk utan DE",
"dos": 500,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 400 mg jod/kg. Ändring av mg jod/kg ska godkännas av radiolog."
},
"ge_buk_40_ar": {
"name": "GE Buk &lt;40 år",
"dos": 550,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 275 mg jod/kg. Dock är minsta tillåtna dosen 50 ml 2,0 ml/sek Omnipaque (54 ml 2,2 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL: <br/>130ml 5,2ml/sek Omnipaque <br/>(142ml 5,7ml/sek Visipaque)"
},
"ge_buk_gravid": {
"name": "GE Buk gravid",
"dos": 550,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 450 mg jod/kg. Ändring av mg jod/kg ska godkännas av radiolog."
},
"ge_bukkarl": {
"name": "GE Bukkärl",
"dos": 400,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 220 mg jod/kg. Dock är minsta tillåtna dosen 40 ml 2,0 ml/sek Omnipaque (44 ml 2,2 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL: <br/>110ml 5,5ml/sek Omnipaque <br/>(120ml 6,0ml/sek Visipaque)"
},
"ge_bukartarer": {
"name": "GE Bukartärer",
"dos": 400,
"konc": 350,
"tid": 15,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 200 mg jod/kg. Dock är minsta tillåtna dosen 30 ml 2,0 ml/sek Omnipaque (33 ml 2,2 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL: <br/>90ml 6,0ml/sek Omnipaque <br/>(98ml 6,5ml/sek Visipaque)"
},
"ge_flebografi": {
"name": "GE Flebografi",
"dos": 550,
"konc": 350,
"tid": 30,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 300 mg jod/kg. Dock är minsta tillåtna dosen 60 ml 2,0 ml/sek Omnipaque (66 ml 2,2 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL Flebografi: <br/>140ml 4,7ml/sek Omnipaque <br/>(153ml 5,1ml/sek Visipaque)<br/><br/>XXL Lungartärer+flebografi &lt;40år:<br/>140ml 7,3ml/sek Omnipaque <br/>(153ml 7,9ml/sek Visipaque)<br/><br/>XXL Lungartärer+flebografi &gt;40år: <br/>140ml 6,7ml/sek Omnipaque <br/>(153ml 7,3ml/sek Visipaque)"
},
"ge_hals": {
"name": "GE Hals",
"dos": 450,
"konc": 350,
"tid": 1,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 250 mg jod/kg. Dock är minsta tillåtna totala kontrastmängden 57 ml Omnipaque (62 ml Visipaque). <br/><br/>Totala kontrastmängden beräknas i Omniject inklusive gram jod/GFR ratio. Manuell beräkning av inj 1 och 2:<br/>Inj 1: 60% av kontrasten. 25 sek inj tid.<br/>Inj 2: 40% av kontrasten. 15 sek inj tid. "
},
"ge_hals_thorax": {
"name": "GE Hals thorax",
"dos": 625,
"konc": 350,
"tid": 1,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 300 mg jod/kg. Dock är minsta tillåtna totala kontrastmängden 65 ml Omnipaque (71 ml Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>Totala kontrastmängden beräknas i Omniject inklusive gram jod/GFR ratio. Split-bolus. Manuell beräkning av inj 1 och 2:<br/>Inj 1: 70% av kontrasten. 25 sek inj tid.<br/>Inj 2: 30% av kontrasten. 15 sek inj tid.<br/><br/>XXL: <br/>96ml 3,8ml/s + 41ml 2,7ml/s Omnipaque (105ml 4,2ml/s + 45ml 3,0ml/s Visipaque)"
},
"ge_hals_thorax_buk": {
"name": "GE Hals thorax buk",
"dos": 700,
"konc": 350,
"tid": 1,
"maxvikt": 80,
"info": "Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 350 mg jod/kg. Dock är minsta tillåtna totala kontrastmängden 66 ml Omnipaque (72 ml Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>Totala kontrastmängden beräknas i Omniject inklusive gram jod/GFR ratio. Split-bolus. Manuell beräkning av inj 1 och 2:<br/>Inj 1: 70% av kontrasten. 25 sek inj tid.<br/>Inj 2: 30% av kontrasten. 15 sek inj tid.<br/><br/>XXL: <br/>112ml 4,5ml/s + 48ml 3,2ml/s Omnipaque (122ml 4,9ml/s + 45ml 3,0ml/s Visipaque)"
},
"ge_hjarna": {
"name": "GE Hjärna",
"dos": 420,
"konc": 350,
"tid": 60,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan kontrastmängden eventuellt  reduceras till minimum 50 ml Omnipaque 350 mgI/ml eller 55 ml Visipaque 320 mgI/ml - ska godkännas av radiolog."
},
"ge_lever_pankreas": {
"name": "GE Lever pankreas",
"dos": 600,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 300 mg jod/kg.  Dock är minsta tillåtna dosen 50 ml 2,0 ml/sek Omnipaque (54 ml 2,2 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL:<br/>140ml 5,6ml/sek Omnipaque <br/>(153ml 6,1ml/sek Visipaque)"
},
"ge_litet_trauma": {
"name": "GE Litet trauma",
"dos": 570,
"konc": 350,
"tid": 1,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 300 mg jod/kg. Dock är minsta tillåtna totaldos 63 ml Omnipaque (69 ml Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>Split med manuell beräkning av inj 1 och 2:<br/>Inj 1: 70% av kontrasten. 25 sek inj tid.<br/>Inj 2: 30% av kontrasten. 15 sek inj tid.<br/><br/>XXL:<br/>100+44ml 3,3ml/sek Omnipaque <br/>(109+48ml 3,6ml/sek Visipaque)"
},
"ge_lungartarer": {
"name": "GE Lungartärer",
"dos": 240,
"konc": 350,
"tid": 12,
"maxvikt": 70,
"info": "Ingen justering vid takykard på GE<br/><br/>DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 120 mg jod/kg.  Dock är minsta tillåtna dosen 24 ml 2,0 ml/sek Omnipaque (26 ml 2,2 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL: <br/>80ml 6,7ml/sek Omnipaque <br/>(88ml 7,3ml/sek Visipaque)"
},
"ge_lungartarer_40ar_gravid": {
"name": "GE Lungartärer &lt;40år/gravid",
"dos": 290,
"konc": 350,
"tid": 13,
"maxvikt": 70,
"info": "Ingen justering vid takykard på GE<br/><br/>DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 150 mg jod/kg. Dock ska injektionshastigheten minimum vara 2,0 ml/sek Omnipaque (2,2 ml/sek Visipaque). Minsta tillåtna dosen 26 ml 2,0 ml/sek Omnipaque (28 ml 2,2 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL: <br/>95ml 7,3ml/sek Omnipaque <br/>(103ml 7,9ml/sek Visipaque)"
},
"ge_njurar": {
"name": "GE Njurar",
"dos": 425,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 225 mg jod/kg.  Dock är minsta tillåtna dosen 36 ml 1,8 ml/sek Omnipaque (39 ml 2,0 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL: <br/>100ml 5,0ml/s Omnipaque <br/>(110ml 5,5ml/s Visipaque)"
},
"ge_thorax": {
"name": "GE Thorax",
"dos": 425,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": "DE:<br/>Vid njurinsufficiens får ssk utan kontakt till radiolog reducera kontrasten till minimum 200 mg jod/kg. Dock är minsta tillåtna dosen 46 ml 1,8 ml/sek Omnipaque (50 ml 2,0 ml/s Visipaque). OBS! Vid reduktion av kontrast måste NI anpassas enligt tabell i metodboken.<br/><br/>XXL: <br/>100ml 4,0ml/sek Omnipaque <br/>(109ml 4,4ml/sek Visipaque)"
},
"ge_urografi_split": {
"name": "GE Urografi split",
"dos": 440,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 320 mg jod/kg. Ändring av mg jod/kg ska godkännas av radiolog."
},
"ge_urografi_split_80kv": {
"name": "GE Urografi split 80kV",
"dos": 250,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras dock i vanliga fall ej under 200 mg jod/kg. Ändring av mg jod/kg ska godkännas av radiolog."
},
/*
 * --------------------------------------------------
 *                     PET
 * --------------------------------------------------
 */
"pet_thorax": {
"name": "PET Thorax",
"dos": 300,
"konc": 350,
"tid": 15,
"maxvikt": 80,
"info": ""
},
"pet_thorax_lagt_gfr": {
"name": "PET Thorax lågt GFR",
"dos": 150,
"konc": 350,
"tid": 15,
"maxvikt": 80,
"info": ""
},
"pet_thorax_buk": {
"name": "PET Thorax buk",
"dos": 500,
"konc": 350,
"tid": 25,
"maxvikt": 80,
"info": ""
},
"pet_thorax_buk_lagt_gfr": {
"name": "PET Thorax buk lågt GFR",
"dos": 250,
"konc": 350,
"tid": 20,
"maxvikt": 80,
"info": ""
}
}

