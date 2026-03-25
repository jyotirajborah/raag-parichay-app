import json

# Bilingual raag names mapping (English / Hindi)
raag_bilingual_names = {
    # Bilawal
    "बिलावल": "Bilawal / बिलावल",
    "अल्हैया बिलावल": "Alhaiya Bilawal / अल्हैया बिलावल",
    "बिहाग": "Bihag / बिहाग",
    "दुर्गा": "Durga / दुर्गा",
    "शंकरा": "Shankara / शंकरा",
    "Deshkar": "Deshkar / देशकार",
    "Maluha Kedar": "Maluha Kedar / मालूहा केदार",
    "हंसध्वनि": "Hamsadhwani / हंसध्वनि",
    "Jaldhar Kedar": "Jaldhar Kedar / जलधर केदार",
    "Sarparada": "Sarparada / सर्परदा",
    "Gopika Basant": "Gopika Basant / गोपिका बसंत",
    "Devgiri Bilawal": "Devgiri Bilawal / देवगिरी बिलावल",
    "Bhatiyar": "Bhatiyar / भटियार",
    "Nat Bihag": "Nat Bihag / नट बिहाग",
    "Sukla Bilawal": "Shukla Bilawal / शुक्ल बिलावल",
    "Bihagara": "Bihagara / बिहागड़ा",
    
    # Kalyan
    "कल्याण": "Kalyan / कल्याण",
    "यमन": "Yaman / यमन",
    "भूपाली": "Bhupali / भूपाली",
    "हमीर": "Hameer / हमीर",
    "केदार": "Kedar / केदार",
    "Kamod": "Kamod / कामोद",
    "Hindol": "Hindol / हिंडोल",
    "Gaur Sarang": "Gaur Sarang / गौर सारंग",
    "Chayanaut": "Chayanaut / छायानट",
    "Sudh Kalyan": "Shuddh Kalyan / शुद्ध कल्याण",
    "मारु बिहाग": "Maru Bihag / मारु बिहाग",
    "Nand": "Nand / नंद",
    "शुद्ध सारंग": "Shuddh Sarang / शुद्ध सारंग",
    "Yamani Bilawal": "Yamani Bilawal / यमनी बिलावल",
    "Shyam Kalyan": "Shyam Kalyan / श्याम कल्याण",
    "Hemant": "Hemant / हेमंत",
    "Jogkaunsh": "Jogkauns / जोगकौंस",
    "Jaut Kalyan": "Jait Kalyan / जैत कल्याण",
    
    # Khamaj
    "खमाज": "Khamaj / खमाज",
    "देश": "Desh / देश",
    "तिलंग": "Tilang / तिलंग",
    "तिलक कामोद": "Tilak Kamod / तिलक कामोद",
    "Jaijaiwanti": "Jaijaiwanti / जयजयवंती",
    "Gur Malhar": "Gaud Malhar / गौड़ मल्हार",
    "रागेश्री/Rageswari": "Rageshwari / रागेश्री",
    "चंपकली": "Champakali / चंपकली",
    "जोग": "Jog / जोग",
    "Narayani": "Narayani / नारायणी",
    "Madhumad Sarang": "Madhmad Sarang / मधमाद सारंग",
    "Gara": "Gara / गारा",
    "गोरख कल्याण": "Gorakh Kalyan / गोरख कल्याण",
    "Jinjhoti": "Jhinjhoti / झिंझोटी",
    "Khambawati": "Khambavati / खंभावती",
    "सरस्वती": "Saraswati / सरस्वती",
    
    # Kafi
    "काफी": "Kafi / काफी",
    "वृंदावनी सारंग": "Vrindavani Sarang / वृंदावनी सारंग",
    "भीमपलासी": "Bhimpalasi / भीमपलासी",
    "बागेश्री": "Bageshri / बागेश्री",
    "Pilu": "Pilu / पीलू",
    "पटदीप": "Patdeep / पटदीप",
    "बहार": "Bahar / बहार",
    "Miya Malhar": "Miyan Malhar / मियां मल्हार",
    "Malgunji": "Malgunji / मालगुंजी",
    "चंद्रकौंस": "Chandrakauns / चंद्रकौंस",
    "Abhogi Kahra": "Abhogi Kanhra / अभोगी कान्हड़ा",
    "Sur Malhar": "Sur Malhar / सूर मल्हार",
    "Hanskinkani": "Hanskinkini / हंसकिंकिणी",
    "Dhanashree": "Dhanashri / धनाश्री",
    "Bhim": "Bhim / भीम",
    "Dhani": "Dhani / धानी",
    "Sahana": "Sahana / सहाना",
    "Jayant Malhar": "Jayant Malhar / जयंत मल्हार",
    "Megh Malhar": "Megh Malhar / मेघ मल्हार",
    "Miya Ki Sarang": "Miyan Ki Sarang / मियां की सारंग",
    "Suha": "Suha / सुहा",
    "Nayaki Kanhara": "Nayaki Kanhra / नायकी कान्हड़ा",
    "Ramdasi Malhar": "Ramdasi Malhar / रामदासी मल्हार",
    "Sugharai": "Sugharai / सुघराई",
    "Gauri": "Gauri / गौरी",
    "Barwa": "Barwa / बरवा",
    "Kafi Kanhra": "Kafi Kanhra / काफी कान्हड़ा",
    "शिवरंजनी": "Shivranjani / शिवरंजनी",
    
    # Asavari
    "आसावरी": "Asavari / आसावरी",
    "जौनपुरी": "Jaunpuri / जौनपुरी",
    "अड़ाना": "Adana / अड़ाना",
    "Darbari Kanhra": "Darbari Kanhra / दरबारी कान्हड़ा",
    "Deshi": "Deshi / देशी",
    "Kaushi Kanhra": "Kaushi Kanhra / कौशी कान्हड़ा",
    "दरबारी": "Darbari / दरबारी",
    
    # Bhairav
    "भैरव": "Bhairav / भैरव",
    "Kalingara": "Kalingada / कालिंगड़ा",
    "Vibhas": "Vibhas / विभास",
    "Ramkali": "Ramkali / रामकली",
    "Ahir Bhairav": "Ahir Bhairav / अहीर भैरव",
    "Bangal Bhairav": "Bangal Bhairav / बंगाल भैरव",
    "Anand Bhairav": "Anand Bhairav / आनंद भैरव",
    "Gunkali": "Gunkali / गुणकली",
    "Shivmat Bhairav": "Shivmat Bhairav / शिवमत भैरव",
    
    # Bhairavi
    "भैरवी": "Bhairavi / भैरवी",
    "मालकौश": "Malkauns / मालकौंस",
    "Chandrakaush": "Chandrakaush / चंद्रकौश",
    "Bhupal Todi": "Bhupal Todi / भूपाल तोड़ी",
    "कोमल ऋषभ आसावरी": "Komal Rishabh Asavari / कोमल ऋषभ आसावरी",
    "Bilaskhani Todi": "Bilaskhani Todi / बिलासखानी तोड़ी",
    
    # Poorvi
    "पूर्वी": "Poorvi / पूर्वी",
    "श्री": "Shri / श्री",
    "पूरिया धनाश्री": "Puriya Dhanashri / पूरिया धनाश्री",
    "Basant": "Basant / बसंत",
    "Paraj": "Paraj / पराज",
    "ललित": "Lalit / ललित",
    "Rewa": "Rewa / रेवा",
    "Jotashree": "Jaitashri / जैतश्री",
    
    # Marva
    "मारवा": "Marwa / मारवा",
    "सोहनी": "Sohni / सोहनी",
    "पूरिया": "Puriya / पूरिया",
    "पूरिया कल्याण": "Puriya Kalyan / पूरिया कल्याण",
    "Jaut": "Jait / जैत",
    "Bhankhar": "Bhankhar / भंखार",
    "Lalita Gauri": "Lalita Gauri / ललिता गौरी",
    "भाटिया": "Bhatiyar / भाटिया",
    
    # Todi
    "तोड़ी": "Todi / तोड़ी",
    "मुल्तानी": "Multani / मुल्तानी",
    "गुजरी तोड़ी": "Gujari Todi / गुजरी तोड़ी",
    "मधुवंती": "Madhuvanti / मधुवंती"
}

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add bilingual names mapping
data['raag_bilingual_names'] = raag_bilingual_names

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added bilingual names for {len(raag_bilingual_names)} raags")
