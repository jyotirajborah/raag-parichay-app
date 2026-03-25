import json

# Detailed raag information for Khamaj thaat
khamaj_raag_details = {
    "खमाज": {
        "aroha": "S G M P D N S",
        "avaroha": "S n D P M G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Romantic, light",
        "key_notes": "Komal Ni in descent"
    },
    "देश": {
        "aroha": "S R M P N S",
        "avaroha": "S n D P M G R S",
        "vadi_samvadi": "R / P",
        "time": "Night",
        "mood": "Patriotic, romantic",
        "key_notes": "Widely used"
    },
    "तिलंग": {
        "aroha": "S G M P N S",
        "avaroha": "S n P M G S",
        "vadi_samvadi": "G / N",
        "time": "Evening",
        "mood": "Devotional",
        "key_notes": "Both Ni used"
    },
    "तिलक कामोद": {
        "aroha": "S G M P N S",
        "avaroha": "S n D P M G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "Vakra"
    },
    "Jaijaiwanti": {
        "aroha": "S R G M P D N S",
        "avaroha": "S n D P M G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Emotional",
        "key_notes": "Both Ga & Ni"
    },
    "Gur Malhar": {
        "aroha": "S R M P N S",
        "avaroha": "S n D P M R S",
        "vadi_samvadi": "M / S",
        "time": "Monsoon",
        "mood": "Devotional",
        "key_notes": "Malhar ang"
    },
    "रागेश्री/Rageswari": {
        "aroha": "S G M D N S",
        "avaroha": "S n D M G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "No Pa"
    },
    "चंपकली": {
        "aroha": "S R G M P D N S",
        "avaroha": "S n D P M G R S",
        "vadi_samvadi": "P / R",
        "time": "Night",
        "mood": "Soft",
        "key_notes": "Rare"
    },
    "जोग": {
        "aroha": "S G M P n S",
        "avaroha": "S n P M G S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Meditative",
        "key_notes": "Komal Ga + Ni feel"
    },
    "Narayani": {
        "aroha": "S R M P D S",
        "avaroha": "S D P M R S",
        "vadi_samvadi": "R / P",
        "time": "Morning",
        "mood": "Devotional",
        "key_notes": "No Ni"
    },
    "Madhumad Sarang": {
        "aroha": "S R M P N S",
        "avaroha": "S N D P M R S",
        "vadi_samvadi": "R / P",
        "time": "Afternoon",
        "mood": "Peaceful",
        "key_notes": "Shuddha Ni"
    },
    "Gara": {
        "aroha": "S G M P N S",
        "avaroha": "S n D P M G R S",
        "vadi_samvadi": "G / N",
        "time": "Light",
        "mood": "Romantic",
        "key_notes": "Thumri style"
    },
    "गोरख कल्याण": {
        "aroha": "S R M P D N S",
        "avaroha": "S n D P M R S",
        "vadi_samvadi": "M / S",
        "time": "Evening",
        "mood": "Devotional",
        "key_notes": "Kalyan touch"
    },
    "Jinjhoti": {
        "aroha": "S R G M P D N S",
        "avaroha": "S n D P M G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Playful",
        "key_notes": "Light classical"
    },
    "Khambawati": {
        "aroha": "S R G M P D N S",
        "avaroha": "S n D P M G R S",
        "vadi_samvadi": "P / R",
        "time": "Night",
        "mood": "Serious",
        "key_notes": "Rare"
    },
    "सरस्वती": {
        "aroha": "S R M P D S",
        "avaroha": "S D P M R S",
        "vadi_samvadi": "R / P",
        "time": "Morning",
        "mood": "Devotional",
        "key_notes": "Pentatonic"
    }
}

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add Khamaj thaat details
data['raag_details']['Khamaj'] = khamaj_raag_details

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added detailed information for {len(khamaj_raag_details)} raags in Khamaj thaat")
