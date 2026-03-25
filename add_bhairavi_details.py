import json

# Detailed raag information for Bhairavi thaat
bhairavi_raag_details = {
    "भैरवी": {
        "aroha": "S r g M P d n S",
        "avaroha": "S n d P M g r S",
        "vadi_samvadi": "M / S",
        "time": "Morning (end)",
        "mood": "Devotional, emotional",
        "key_notes": "All 4 komal"
    },
    "मालकौश": {
        "aroha": "S g M d n S",
        "avaroha": "S n d M g S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Deep, meditative",
        "key_notes": "No R, P"
    },
    "Chandrakaush": {
        "aroha": "S g M D n S",
        "avaroha": "S n D M g S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Romantic, calm",
        "key_notes": "Shuddha Dha"
    },
    "Bhupal Todi": {
        "aroha": "S r g P d S",
        "avaroha": "S d P g r S",
        "vadi_samvadi": "d / g",
        "time": "Morning",
        "mood": "Serious",
        "key_notes": "No Ma, Ni"
    },
    "कोमल ऋषभ आसावरी": {
        "aroha": "S r M P d S",
        "avaroha": "S n d P M g r S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Soft",
        "key_notes": "Mix of Asavari + Bhairavi"
    },
    "Bilaskhani Todi": {
        "aroha": "S r g M P d n S",
        "avaroha": "S n d P M g r S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Deep, emotional",
        "key_notes": "Todi-ang + Bhairavi"
    }
}

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add Bhairavi thaat details
data['raag_details']['Bhairavi'] = bhairavi_raag_details

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added detailed information for {len(bhairavi_raag_details)} raags in Bhairavi thaat")
