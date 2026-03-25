import json

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Function to generate YouTube search URLs
def get_youtube_urls(raag_english):
    base_url = "https://www.youtube.com/results?search_query=Raag%20"
    raag_encoded = raag_english.replace(" ", "%20")
    return {
        "instrumental": f"{base_url}{raag_encoded}%20instrumental%20sitar%20flute%20classical",
        "vocal": f"{base_url}{raag_encoded}%20vocal%20khyal%20bandish%20classical"
    }

# Mapping of raag names to their English search terms
raag_english_names = {
    # Bilawal
    "बिलावल": "Bilawal",
    "अल्हैया बिलावल": "Alhaiya Bilawal",
    "बिहाग": "Bihag",
    "दुर्गा": "Durga",
    "शंकरा": "Shankara",
    "Deshkar": "Deshkar",
    "Maluha Kedar": "Maluha Kedar",
    "हंसध्वनि": "Hamsadhwani",
    "Jaldhar Kedar": "Jaldhar Kedar",
    "Sarparada": "Sarparada",
    "Gopika Basant": "Gopika Basant",
    "Devgiri Bilawal": "Devgiri Bilawal",
    "Bhatiyar": "Bhatiyar",
    "Nat Bihag": "Nat Bihag",
    "Sukla Bilawal": "Shukla Bilawal",
    "Bihagara": "Bihagara",
    
    # Kalyan
    "कल्याण": "Kalyan",
    "यमन": "Yaman",
    "भूपाली": "Bhupali",
    "हमीर": "Hameer",
    "केदार": "Kedar",
    "Kamod": "Kamod",
    "Hindol": "Hindol",
    "Gaur Sarang": "Gaur Sarang",
    "Chayanaut": "Chayanaut",
    "Sudh Kalyan": "Shuddh Kalyan",
    "मारु बिहाग": "Maru Bihag",
    "Nand": "Nand",
    "शुद्ध सारंग": "Shuddh Sarang",
    "Yamani Bilawal": "Yamani Bilawal",
    "Shyam Kalyan": "Shyam Kalyan",
    "Hemant": "Hemant",
    "Jogkaunsh": "Jogkauns",
    "Jaut Kalyan": "Jait Kalyan",
    
    # Khamaj
    "खमाज": "Khamaj",
    "देश": "Desh",
    "तिलंग": "Tilang",
    "तिलक कामोद": "Tilak Kamod",
    "Jaijaiwanti": "Jaijaiwanti",
    "Gur Malhar": "Gaud Malhar",
    "रागेश्री/Rageswari": "Rageshwari",
    "चंपकली": "Champakali",
    "जोग": "Jog",
    "Narayani": "Narayani",
    "Madhumad Sarang": "Madhmad Sarang",
    "Gara": "Gara",
    "गोरख कल्याण": "Gorakh Kalyan",
    "Jinjhoti": "Jhinjhoti",
    "Khambawati": "Khambavati",
    "सरस्वती": "Saraswati",
    
    # Kafi
    "काफी": "Kafi",
    "वृंदावनी सारंग": "Vrindavani Sarang",
    "भीमपलासी": "Bhimpalasi",
    "बागेश्री": "Bageshri",
    "Pilu": "Pilu",
    "पटदीप": "Patdeep",
    "बहार": "Bahar",
    "Miya Malhar": "Miyan Malhar",
    "Malgunji": "Malgunji",
    "चंद्रकौंस": "Chandrakauns",
    "Abhogi Kahra": "Abhogi Kanhra",
    "Sur Malhar": "Sur Malhar",
    "Hanskinkani": "Hanskinkini",
    "Dhanashree": "Dhanashri",
    "Bhim": "Bhim",
    "Dhani": "Dhani",
    "Sahana": "Sahana",
    "Jayant Malhar": "Jayant Malhar",
    "Megh Malhar": "Megh Malhar",
    "Miya Ki Sarang": "Miyan Ki Sarang",
    "Suha": "Suha",
    "Nayaki Kanhara": "Nayaki Kanhra",
    "Ramdasi Malhar": "Ramdasi Malhar",
    "Sugharai": "Sugharai",
    "Gauri": "Gauri",
    "Barwa": "Barwa",
    "Kafi Kanhra": "Kafi Kanhra",
    "शिवरंजनी": "Shivranjani",
    
    # Asavari
    "आसावरी": "Asavari",
    "जौनपुरी": "Jaunpuri",
    "अड़ाना": "Adana",
    "Darbari Kanhra": "Darbari Kanhra",
    "Deshi": "Deshi",
    "Kaushi Kanhra": "Kaushi Kanhra",
    "दरबारी": "Darbari",
    
    # Bhairav
    "भैरव": "Bhairav",
    "Kalingara": "Kalingada",
    "Vibhas": "Vibhas",
    "Ramkali": "Ramkali",
    "Ahir Bhairav": "Ahir Bhairav",
    "Bangal Bhairav": "Bangal Bhairav",
    "Anand Bhairav": "Anand Bhairav",
    "Gunkali": "Gunkali",
    "Shivmat Bhairav": "Shivmat Bhairav",
    
    # Bhairavi
    "भैरवी": "Bhairavi",
    "मालकौश": "Malkauns",
    "Chandrakaush": "Chandrakaush",
    "Bhupal Todi": "Bhupal Todi",
    "कोमल ऋषभ आसावरी": "Komal Rishabh Asavari",
    "Bilaskhani Todi": "Bilaskhani Todi",
    
    # Poorvi
    "पूर्वी": "Poorvi",
    "श्री": "Shri",
    "पूरिया धनाश्री": "Puriya Dhanashri",
    "Basant": "Basant",
    "Paraj": "Paraj",
    "ललित": "Lalit",
    "Rewa": "Rewa",
    "Jotashree": "Jaitashri",
    
    # Marva
    "मारवा": "Marwa",
    "सोहनी": "Sohni",
    "पूरिया": "Puriya",
    "पूरिया कल्याण": "Puriya Kalyan",
    "Jaut": "Jait",
    "Bhankhar": "Bhankhar",
    "Lalita Gauri": "Lalita Gauri",
    "भाटिया": "Bhatiyar",
    
    # Todi
    "तोड़ी": "Todi",
    "मुल्तानी": "Multani",
    "गुजरी तोड़ी": "Gujari Todi",
    "मधुवंती": "Madhuvanti"
}

# Add YouTube links to each raag in raag_details
for thaat in data['raag_details']:
    for raag_name in data['raag_details'][thaat]:
        if raag_name in raag_english_names:
            english_name = raag_english_names[raag_name]
            urls = get_youtube_urls(english_name)
            data['raag_details'][thaat][raag_name]['youtube_instrumental'] = urls['instrumental']
            data['raag_details'][thaat][raag_name]['youtube_vocal'] = urls['vocal']

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added YouTube links to all raags in raag_details")
print("Links added for Instrumental and Vocal performances")
