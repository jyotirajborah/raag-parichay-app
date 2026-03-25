import json

# Detailed raag information for Marva thaat
marva_raag_details = {
    "मारवा": {
        "aroha": "S r G M# D N S",
        "avaroha": "S N D M# G r S",
        "vadi_samvadi": "r / D",
        "time": "Evening",
        "mood": "Tense, serious",
        "key_notes": "No Pa, very intense"
    },
    "सोहनी": {
        "aroha": "S G M# D N S",
        "avaroha": "S N D M# G S",
        "vadi_samvadi": "D / G",
        "time": "Late Night",
        "mood": "Sharp, brilliant",
        "key_notes": "No Re, Pa"
    },
    "पूरिया": {
        "aroha": "N r G M# D N S",
        "avaroha": "S N D M# G r S",
        "vadi_samvadi": "G / N",
        "time": "Evening",
        "mood": "Serious, calm",
        "key_notes": "Starts from Ni"
    },
    "पूरिया कल्याण": {
        "aroha": "N R G M# D N S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "G / N",
        "time": "Evening",
        "mood": "Mixed (Kalyan touch)",
        "key_notes": "Shuddha Re used"
    },
    "Jaut": {
        "aroha": "S R G M# P D N S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Bright",
        "key_notes": "Close to Kalyan"
    },
    "Bhankhar": {
        "aroha": "S r G M# P D N S",
        "avaroha": "S N D P M# G r S",
        "vadi_samvadi": "P / R",
        "time": "Evening",
        "mood": "Serious",
        "key_notes": "Rare"
    },
    "Lalita Gauri": {
        "aroha": "S r G M M# D N S",
        "avaroha": "S N D M# M G r S",
        "vadi_samvadi": "M / S",
        "time": "Morning",
        "mood": "Deep, devotional",
        "key_notes": "Both Ma used"
    },
    "भाटिया": {
        "aroha": "S r G M# D N S",
        "avaroha": "S N D M# G r S",
        "vadi_samvadi": "D / G",
        "time": "Evening",
        "mood": "Serious",
        "key_notes": "Close to Marwa"
    }
}

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add Marva thaat details
data['raag_details']['Marva'] = marva_raag_details

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added detailed information for {len(marva_raag_details)} raags in Marva thaat")
