import json

# Detailed raag information for Asavari thaat
asavari_raag_details = {
    "आसावरी": {
        "aroha": "S R M P D S",
        "avaroha": "S n d P M g R S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Serious, devotional",
        "key_notes": "Core Asavari"
    },
    "जौनपुरी": {
        "aroha": "S R M P D n S",
        "avaroha": "S n d P M g R S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Pathos, soft",
        "key_notes": "Komal Ga, Dha"
    },
    "अड़ाना": {
        "aroha": "S R M P N S",
        "avaroha": "S N d P M G R S",
        "vadi_samvadi": "P / R",
        "time": "Late Night",
        "mood": "Veer (heroic)",
        "key_notes": "Mix of shuddha & komal"
    },
    "Darbari Kanhra": {
        "aroha": "S R g M P d n S",
        "avaroha": "S n d P M g R S",
        "vadi_samvadi": "R / P",
        "time": "Late Night",
        "mood": "Deep, serious",
        "key_notes": "Heavy gamak"
    },
    "Deshi": {
        "aroha": "S R M P D N S",
        "avaroha": "S N d P M g R S",
        "vadi_samvadi": "P / R",
        "time": "Evening",
        "mood": "Romantic",
        "key_notes": "Light classical"
    },
    "Kaushi Kanhra": {
        "aroha": "S g M d n S",
        "avaroha": "S n d M g R S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Deep, meditative",
        "key_notes": "No Pa"
    },
    "दरबारी": {
        "aroha": "S R g M P d n S",
        "avaroha": "S n d P M g R S",
        "vadi_samvadi": "R / P",
        "time": "Late Night",
        "mood": "Very serious",
        "key_notes": "Same as Darbari Kanhra"
    }
}

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add Asavari thaat details
data['raag_details']['Asavari'] = asavari_raag_details

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added detailed information for {len(asavari_raag_details)} raags in Asavari thaat")
