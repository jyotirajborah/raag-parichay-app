import json

# Detailed raag information for Kalyan thaat
kalyan_raag_details = {
    "कल्याण": {
        "aroha": "S R G M# P D N S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "G / N",
        "time": "Evening",
        "mood": "Devotional",
        "key_notes": "Tivra Ma dominant"
    },
    "यमन": {
        "aroha": "N R G M# D N S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "G / N",
        "time": "Evening",
        "mood": "Peaceful, romantic",
        "key_notes": "Most prominent Kalyan raag"
    },
    "भूपाली": {
        "aroha": "S R G P D S",
        "avaroha": "S D P G R S",
        "vadi_samvadi": "G / D",
        "time": "Evening",
        "mood": "Calm, devotional",
        "key_notes": "No M, N (pentatonic)"
    },
    "हमीर": {
        "aroha": "S R G M# P D N S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "D / G",
        "time": "Night",
        "mood": "Majestic",
        "key_notes": "Vakra phrases"
    },
    "केदार": {
        "aroha": "S M M P N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Devotional",
        "key_notes": "Both Ma used"
    },
    "Kamod": {
        "aroha": "S R P M# P D S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "P / R",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "Vakra structure"
    },
    "Hindol": {
        "aroha": "S G M# D N S",
        "avaroha": "S N D M# G S",
        "vadi_samvadi": "D / G",
        "time": "Morning",
        "mood": "Meditative",
        "key_notes": "No R, P"
    },
    "Gaur Sarang": {
        "aroha": "S R M# P N S",
        "avaroha": "S N D P M# R S",
        "vadi_samvadi": "R / P",
        "time": "Afternoon",
        "mood": "Peaceful",
        "key_notes": "Sarang ang"
    },
    "Chayanaut": {
        "aroha": "S R G M# P D N S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "P / R",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "Mix of Kalyan + Nat"
    },
    "Sudh Kalyan": {
        "aroha": "S R G M# P D N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "G / N",
        "time": "Evening",
        "mood": "Devotional",
        "key_notes": "Both Ma (shuddha + tivra)"
    },
    "मारु बिहाग": {
        "aroha": "S G M# P N S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Romantic",
        "key_notes": "Bihag + Kalyan blend"
    },
    "Nand": {
        "aroha": "S G M# P N S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Sweet, romantic",
        "key_notes": "Close to Yaman"
    },
    "शुद्ध सारंग": {
        "aroha": "S R M P N S",
        "avaroha": "S N D P M R S",
        "vadi_samvadi": "R / P",
        "time": "Afternoon",
        "mood": "Peaceful",
        "key_notes": "No G, D"
    },
    "Yamani Bilawal": {
        "aroha": "S R G M# P D N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "G / D",
        "time": "Evening",
        "mood": "Mixed mood",
        "key_notes": "Blend of Yaman + Bilawal"
    },
    "Shyam Kalyan": {
        "aroha": "S R G M# P D N S",
        "avaroha": "S N D P M G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Devotional",
        "key_notes": "Yaman variant"
    },
    "Hemant": {
        "aroha": "S R G M# P D N S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "D / G",
        "time": "Night",
        "mood": "Serious",
        "key_notes": "Rare raag"
    },
    "Jogkaunsh": {
        "aroha": "S G M# D n S",
        "avaroha": "S n D M# G S",
        "vadi_samvadi": "M / S",
        "time": "Night",
        "mood": "Deep, mystical",
        "key_notes": "Komal Ni used"
    },
    "Jaut Kalyan": {
        "aroha": "S R G M# P D N S",
        "avaroha": "S N D P M# G R S",
        "vadi_samvadi": "G / N",
        "time": "Night",
        "mood": "Bright",
        "key_notes": "Jait influence"
    }
}

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add Kalyan thaat details
data['raag_details']['Kalyan'] = kalyan_raag_details

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added detailed information for {len(kalyan_raag_details)} raags in Kalyan thaat")
