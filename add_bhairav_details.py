import json

# Detailed raag information for Bhairav thaat
bhairav_raag_details = {
    "भैरव": {
        "aroha": "S r G M P d N S",
        "avaroha": "S N d P M G r S",
        "vadi_samvadi": "d / r",
        "time": "Early Morning",
        "mood": "Serious, devotional",
        "key_notes": "Core Bhairav"
    },
    "Kalingara": {
        "aroha": "S r G M P d N S",
        "avaroha": "S N d P M G r S",
        "vadi_samvadi": "P / S",
        "time": "Morning",
        "mood": "Energetic",
        "key_notes": "Faster chalan"
    },
    "Vibhas": {
        "aroha": "S r G P d S",
        "avaroha": "S d P G r S",
        "vadi_samvadi": "G / d",
        "time": "Morning",
        "mood": "Veer (heroic)",
        "key_notes": "No Ma, Ni"
    },
    "Ramkali": {
        "aroha": "S r G M P d N S",
        "avaroha": "S N d P M G r S",
        "vadi_samvadi": "P / S",
        "time": "Early Morning",
        "mood": "Serious, philosophical",
        "key_notes": "Vakra phrases"
    },
    "Ahir Bhairav": {
        "aroha": "S r G M P D n S",
        "avaroha": "S n D P M G r S",
        "vadi_samvadi": "M / S",
        "time": "Morning",
        "mood": "Peaceful, sweet",
        "key_notes": "Komal Re + Komal Ni (n)"
    },
    "Bangal Bhairav": {
        "aroha": "S r G M P d N S",
        "avaroha": "S N d P M G r S",
        "vadi_samvadi": "d / r",
        "time": "Morning",
        "mood": "Serious",
        "key_notes": "Rare"
    },
    "Anand Bhairav": {
        "aroha": "S r G M P d N S",
        "avaroha": "S N d P M G r S",
        "vadi_samvadi": "M / S",
        "time": "Morning",
        "mood": "Joyful-serious",
        "key_notes": "Blend feel"
    },
    "Gunkali": {
        "aroha": "S r G P d S",
        "avaroha": "S d P G r S",
        "vadi_samvadi": "G / d",
        "time": "Morning",
        "mood": "Light",
        "key_notes": "Similar to Vibhas"
    },
    "Shivmat Bhairav": {
        "aroha": "S r G M P d N S",
        "avaroha": "S N d P M G r S",
        "vadi_samvadi": "d / r",
        "time": "Morning",
        "mood": "Deep, meditative",
        "key_notes": "Rare"
    }
}

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add Bhairav thaat details
data['raag_details']['Bhairav'] = bhairav_raag_details

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added detailed information for {len(bhairav_raag_details)} raags in Bhairav thaat")
