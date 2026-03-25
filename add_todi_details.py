import json

# Detailed raag information for Todi thaat
todi_raag_details = {
    "तोड़ी": {
        "aroha": "S r g M# P d N S",
        "avaroha": "S N d P M# g r S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Deep, serious",
        "key_notes": "Core Todi"
    },
    "मुल्तानी": {
        "aroha": "N S g M# P N S",
        "avaroha": "S N d P M# g r S",
        "vadi_samvadi": "P / R",
        "time": "Afternoon",
        "mood": "Intense, calm",
        "key_notes": "Starts from Ni"
    },
    "गुजरी तोड़ी": {
        "aroha": "S r g M# d N S",
        "avaroha": "S N d M# g r S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Very serious",
        "key_notes": "No Pa"
    },
    "मधुवंती": {
        "aroha": "N R G M# P N S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "P / R",
        "time": "Evening",
        "mood": "Romantic, sweet",
        "key_notes": "No komal swaras (exception)"
    }
}

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add Todi thaat details
data['raag_details']['Todi'] = todi_raag_details

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added detailed information for {len(todi_raag_details)} raags in Todi thaat")
print("\n🎉 All 10 thaats now have complete raag details!")
