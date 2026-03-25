import json

# Detailed raag information for Kafi thaat
kafi_raag_details = {
    "काफी": {
        "aroha": "S R g M P D n S",
        "avaroha": "S n D P M g R S",
        "vadi_samvadi": "P / S",
        "time": "Evening",
        "mood": "Romantic, folk",
        "key_notes": "Core Kafi"
    },
    "वृंदावनी सारंग": {
        "aroha": "S R M P N S",
        "avaroha": "S N P M R S",
        "vadi_samvadi": "R / P",
        "time": "Afternoon",
        "mood": "Devotional",
        "key_notes": "No Ga, Dha"
    },
    "भीमपलासी": {
        "aroha": "S g M P n S",
        "avaroha": "S n D P M g R S",
        "vadi_samvadi": "M / S",
        "time": "Afternoon",
        "mood": "Deep, romantic",
        "key_notes": "Komal Ga, Ni"
    },
    "बागेश्री": {
        "aroha": "S g M D n S",
        "avaroha": "S n D P M g R S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "No Pa in aroha"
    },
    "Pilu": {
        "aroha": "S R g M P D n S",
        "avaroha": "S n D P M g R S",
        "vadi_samvadi": "G / N",
        "time": "Any",
        "mood": "Light, playful",
        "key_notes": "Mixed swaras"
    },
    "पटदीप": {
        "aroha": "N S g M P N S",
        "avaroha": "S N D P M g R S",
        "vadi_samvadi": "P / S",
        "time": "Evening",
        "mood": "Romantic",
        "key_notes": "Starts from Ni"
    },
    "बहार": {
        "aroha": "S R g M P D N S",
        "avaroha": "S N D P M g R S",
        "vadi_samvadi": "M / S",
        "time": "Spring",
        "mood": "Joyful",
        "key_notes": "Seasonal raag"
    },
    "Miya Malhar": {
        "aroha": "S R M P n S",
        "avaroha": "S n D P M R S",
        "vadi_samvadi": "M / S",
        "time": "Monsoon",
        "mood": "Powerful",
        "key_notes": "Malhar ang"
    },
    "Malgunji": {
        "aroha": "S R g M P D N S",
        "avaroha": "S N D P M g R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "Blend"
    },
    "चंद्रकौंस": {
        "aroha": "S g M D n S",
        "avaroha": "S n D M g S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Meditative",
        "key_notes": "Pentatonic"
    },
    "Abhogi Kahra": {
        "aroha": "S R g M D n S",
        "avaroha": "S n D M g R S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Serious",
        "key_notes": "No Pa"
    },
    "Sur Malhar": {
        "aroha": "S R M P N S",
        "avaroha": "S N D P M R S",
        "vadi_samvadi": "R / P",
        "time": "Monsoon",
        "mood": "Devotional",
        "key_notes": "Malhar variant"
    },
    "Hanskinkani": {
        "aroha": "S R g M P D N S",
        "avaroha": "S N D P M g R S",
        "vadi_samvadi": "P / R",
        "time": "Night",
        "mood": "Light",
        "key_notes": "Rare"
    },
    "Dhanashree": {
        "aroha": "S R g M P D n S",
        "avaroha": "S n D P M g R S",
        "vadi_samvadi": "P / S",
        "time": "Evening",
        "mood": "Devotional",
        "key_notes": "Close to Bhimpalasi"
    },
    "Bhim": {
        "aroha": "S g M P D n S",
        "avaroha": "S n D P M g S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Deep",
        "key_notes": "Rare"
    },
    "Dhani": {
        "aroha": "S g M P n S",
        "avaroha": "S n P M g S",
        "vadi_samvadi": "M / S",
        "time": "Evening",
        "mood": "Sweet",
        "key_notes": "Pentatonic"
    },
    "Sahana": {
        "aroha": "S R g M P D n S",
        "avaroha": "S n D P M g R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "Carnatic influence"
    },
    "Jayant Malhar": {
        "aroha": "S R M P N S",
        "avaroha": "S N D P M R S",
        "vadi_samvadi": "R / P",
        "time": "Monsoon",
        "mood": "Joyful",
        "key_notes": "Malhar ang"
    },
    "Megh Malhar": {
        "aroha": "S R M P n S",
        "avaroha": "S n P M R S",
        "vadi_samvadi": "M / S",
        "time": "Monsoon",
        "mood": "Calm",
        "key_notes": "Rain feel"
    },
    "Miya Ki Sarang": {
        "aroha": "S R M P N S",
        "avaroha": "S N D P M R S",
        "vadi_samvadi": "R / P",
        "time": "Afternoon",
        "mood": "Bright",
        "key_notes": "Sarang style"
    },
    "Suha": {
        "aroha": "S R g M P D N S",
        "avaroha": "S N D P M g R S",
        "vadi_samvadi": "P / R",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "Soft"
    },
    "Nayaki Kanhara": {
        "aroha": "S R g M P D n S",
        "avaroha": "S n D P M g R S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Serious",
        "key_notes": "Kanhra ang"
    },
    "Ramdasi Malhar": {
        "aroha": "S R M P N S",
        "avaroha": "S N D P M R S",
        "vadi_samvadi": "R / P",
        "time": "Monsoon",
        "mood": "Devotional",
        "key_notes": "Malhar variant"
    },
    "Sugharai": {
        "aroha": "S R g M P D N S",
        "avaroha": "S N D P M g R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "Rare"
    },
    "Gauri": {
        "aroha": "S R g M P D N S",
        "avaroha": "S N D P M g R S",
        "vadi_samvadi": "R / P",
        "time": "Morning",
        "mood": "Serious",
        "key_notes": "Variant"
    },
    "Barwa": {
        "aroha": "S R g M P D N S",
        "avaroha": "S N D P M g R S",
        "vadi_samvadi": "G / N",
        "time": "Evening",
        "mood": "Romantic",
        "key_notes": "Light"
    },
    "Kafi Kanhra": {
        "aroha": "S R g M P D n S",
        "avaroha": "S n D P M g R S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Deep",
        "key_notes": "Blend"
    },
    "शिवरंजनी": {
        "aroha": "S R g P D S",
        "avaroha": "S D P g R S",
        "vadi_samvadi": "D / G",
        "time": "Evening",
        "mood": "Sad, emotional",
        "key_notes": "No Ma, Ni"
    }
}

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add Kafi thaat details
data['raag_details']['Kafi'] = kafi_raag_details

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added detailed information for {len(kafi_raag_details)} raags in Kafi thaat")
