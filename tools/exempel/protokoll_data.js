
protokoll_data_version = "2025-10-04";

protokoll = {
    "buk": {
        name: "Buk",
        info: "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras, dock i vanliga fall ej under 400 mg jos/kg.<br/>Ändring av mg jod/kg måste godkännas av radiolog.",
        dos: 500,
        konc: 350,
        tid: 25,
        maxvikt: 80
    },
/*
 * Nedanstående kan behöva ändras
 */
    "buk_80kv": {
        name: "Buk 80 kV",
        info: "Beroende på klinisk frågeställning och njurfunktion kan mg jod/kg eventuellt reduceras, dock i vanliga fall ej under 250 mg jos/kg. Ändring av mg jod/kg måste godkännas av radiolog.",
        "dos": 300,
        "konc": 350,      // kanske högre koncentration???
        "tid"": 25,
        maxvikt: 80
    },
    "buk_70kv": { name: "Buk 70 kV", dos: 250, konc: 350, tid: 25, maxvikt: 80, info: "" }
};

