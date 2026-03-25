import json

# Detailed raag information for Bilawal thaat
bilawal_raag_details = {
    "बिलावल": {
        "aroha": "S R G M P D N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Peaceful, devotional",
        "key_notes": "All shuddha swaras"
    },
    "अल्हैया बिलावल": {
        "aroha": "S R G P D N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Graceful, romantic",
        "key_notes": "M omitted in aroha"
    },
    "बिहाग": {
        "aroha": "S G M P N S",
        "avaroha": "S N D P M G M G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Romantic, joyful",
        "key_notes": "Tivra Ma used"
    },
    "दुर्गा": {
        "aroha": "S R M P D S",
        "avaroha": "S D P M R S",
        "vadi_samvadi": "M / S",
        "time": "Evening",
        "mood": "Devotional, calm",
        "key_notes": "Pentatonic (no G, N)"
    },
    "शंकरा": {
        "aroha": "S R G P N S",
        "avaroha": "S N P G R S",
        "vadi_samvadi": "P / R",
        "time": "Late Night",
        "mood": "Heroic, majestic",
        "key_notes": "No M, D"
    },
    "Deshkar": {
        "aroha": "S R G P D S",
        "avaroha": "S D P G R S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Bright, energetic",
        "key_notes": "Similar to Bhoopali"
    },
    "Maluha Kedar": {
        "aroha": "S M G M P D N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Devotional",
        "key_notes": "Kedar ang"
    },
    "हंसध्वनि": {
        "aroha": "S R G P N S",
        "avaroha": "S N P G R S",
        "vadi_samvadi": "G / N",
        "time": "Evening",
        "mood": "Auspicious",
        "key_notes": "Pentatonic, no M, D"
    },
    "Jaldhar Kedar": {
        "aroha": "S M P N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Calm",
        "key_notes": "Kedar variant"
    },
    "Sarparada": {
        "aroha": "S R G M P D N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "P / R",
        "time": "Morning",
        "mood": "Serious",
        "key_notes": "Rarely performed"
    },
    "Gopika Basant": {
        "aroha": "S R G M P D N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "M / S",
        "time": "Spring",
        "mood": "Romantic",
        "key_notes": "Basant influence"
    },
    "Devgiri Bilawal": {
        "aroha": "S R G M P D N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Devotional",
        "key_notes": "Variant of Bilawal"
    },
    "Bhatiyar": {
        "aroha": "S R G M D N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "D / R",
        "time": "Early Morning",
        "mood": "Serious",
        "key_notes": "Sharp mood"
    },
    "Nat Bihag": {
        "aroha": "S G M P N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "Blend of Nat & Bihag"
    },
    "Sukla Bilawal": {
        "aroha": "S R G M P D N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Peaceful",
        "key_notes": "Pure Bilawal form"
    },
    "Bihagara": {
        "aroha": "S G M P N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "Bihag variant"
    }
}

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add raag details section if it doesn't exist
if 'raag_details' not in data:
    data['raag_details'] = {}

# Add Bilawal thaat details
data['raag_details']['Bilaval'] = bilawal_raag_details

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added detailed information for {len(bilawal_raag_details)} raags in Bilawal thaat")
