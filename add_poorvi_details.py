import json

# Detailed raag information for Poorvi thaat
poorvi_raag_details = {
    "पूर्वी": {
        "aroha": "S r G M# P d N S",
        "avaroha": "S N d P M# G r S",
        "vadi_samvadi": "G / N",
        "time": "Evening",
        "mood": "Serious, intense",
        "key_notes": "Core Poorvi"
    },
    "श्री": {
        "aroha": "S r M# P N S",
        "avaroha": "S N d P M# G r S",
        "vadi_samvadi": "R / P",
        "time": "Evening",
        "mood": "Majestic, devotional",
        "key_notes": "No Ga in aroha"
    },
    "पूरिया धनाश्री": {
        "aroha": "N r G M# D N S",
        "avaroha": "S N D P M# G r S",
        "vadi_samvadi": "P / R",
        "time": "Evening",
        "mood": "Serious, romantic",
        "key_notes": "Starts from Ni"
    },
    "Basant": {
        "aroha": "S G M# D N S",
        "avaroha": "S N d P M# G r S",
        "vadi_samvadi": "M# / S",
        "time": "Spring",
        "mood": "Joyful, vibrant",
        "key_notes": "Both Dha used"
    },
    "Paraj": {
        "aroha": "S r G M# P D N S",
        "avaroha": "S N D P M# G r S",
        "vadi_samvadi": "P / R",
        "time": "Late Night",
        "mood": "Romantic",
        "key_notes": "Blend character"
    },
    "ललित": {
        "aroha": "S r G M M# D N S",
        "avaroha": "S N D M# M G r S",
        "vadi_samvadi": "M / S",
        "time": "Early Morning",
        "mood": "Deep, mystical",
        "key_notes": "Both Ma used"
    },
    "Rewa": {
        "aroha": "S r G M# P d N S",
        "avaroha": "S N d P M# G r S",
        "vadi_samvadi": "P / R",
        "time": "Evening",
        "mood": "Serious",
        "key_notes": "Rare"
    },
    "Jotashree": {
        "aroha": "S r G M# P D N S",
        "avaroha": "S N D P M# G r S",
        "vadi_samvadi": "R / P",
        "time": "Night",
        "mood": "Sweet-serious",
        "key_notes": "Jait influence"
    }
}

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add Poorvi thaat details
data['raag_details']['Poorvi'] = poorvi_raag_details

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added detailed information for {len(poorvi_raag_details)} raags in Poorvi thaat")
