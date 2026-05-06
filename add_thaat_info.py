import json

# Load existing data
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add thaat information with proper swara notation
thaat_info = {
    "thaat_swaras": {
        "Bilaval": {
            "swaras": "Sa Re Ga Ma Pa Dha Ni Ṡa",
            "raag_count": 16,
            "hindi_name": "बिलावल"
        },
        "Kalyan": {
            "swaras": "Sa Re Ga Ḿa Pa Dha Ni Ṡa",
            "raag_count": 18,
            "hindi_name": "कल्याण"
        },
        "Khamaj": {
            "swaras": "Sa Re Ga Ma Pa Dha Ṉi Ṡa",
            "raag_count": 16,
            "hindi_name": "खमाज"
        },
        "Kafi": {
            "swaras": "Sa Re G_ Ma Pa Dha Ṉi Ṡa",
            "raag_count": 28,
            "hindi_name": "काफी"
        },
        "Asavari": {
            "swaras": "Sa Re G_ Ma Pa Dẖa Ṉi Ṡa",
            "raag_count": 7,
            "hindi_name": "आसावरी"
        },
        "Bhairav": {
            "swaras": "Sa Ṟe Ga Ma Pa Dẖa Ni Ṡa",
            "raag_count": 9,
            "hindi_name": "भैरव"
        },
        "Bhairavi": {
            "swaras": "Sa Ṟe G_ Ma Pa Dẖa Ṉi Ṡa",
            "raag_count": 6,
            "hindi_name": "भैरवी"
        },
        "Poorvi": {
            "swaras": "Sa Ṟe Ga Ḿa Pa Dẖa Ni Ṡa",
            "raag_count": 8,
            "hindi_name": "पूर्वी"
        },
        "Marva": {
            "swaras": "Sa Ṟe Ga Ḿa Pa Dha Ni Ṡa",
            "raag_count": 8,
            "hindi_name": "मारवा"
        },
        "Todi": {
            "swaras": "Sa Ṟe G_ Ḿa Pa Dẖa Ni Ṡa",
            "raag_count": 4,
            "hindi_name": "तोड़ी"
        }
    },
    "special_notes": {
        "patmanjari": {
            "note": "Patmanjari को दो तरह से गाया जाता है",
            "variants": [
                {
                    "name": "Bilawal Patmanjari",
                    "thaat": "Bilaval"
                },
                {
                    "name": "Kafi Patmanjari",
                    "thaat": "Kafi"
                }
            ]
        },
        "gunkali": {
            "note": "Raag with only 4 notes",
            "raag": "Gunkali",
            "thaat": "Bhairav"
        }
    },
    "total_raags": 120,
    "total_thaats": 10
}

# Add thaat info to data
data['thaat_info'] = thaat_info

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✓ Added thaat swara information")
print("✓ Added special notes about Patmanjari and Gunkali")
print(f"✓ Total: {thaat_info['total_thaats']} thaats with {thaat_info['total_raags']} raags")
