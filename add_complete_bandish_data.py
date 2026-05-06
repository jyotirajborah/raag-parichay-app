import json

# Load existing data
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Complete bandish data from user's table
complete_bandish_data = [
    # Bilawal Thaat
    {"sno": 1, "thaat": "बिलावल", "raag": "बिलावल", "vilambit": "दरस बिन", "drut": "रब सो नेह लगा"},
    {"sno": 2, "thaat": "बिलावल", "raag": "अल्हैया बिलावल", "vilambit": "कहाँ गयो", "drut": "जा रे जा रे जा"},
    {"sno": 3, "thaat": "बिलावल", "raag": "बिहाग", "vilambit": "रैन अंधेरी डर पावे", "drut": "अब तो रट लगी"},
    {"sno": 4, "thaat": "बिलावल", "raag": "दुर्गा", "vilambit": "बिता सारी रैन", "drut": "सौदा-मनी कड़ा-कड़ा के दमके"},
    {"sno": 5, "thaat": "बिलावल", "raag": "शंकरा", "vilambit": "आयो री शुभ दिन आज", "drut": "कंगनवा तोरे"},
    {"sno": 6, "thaat": "बिलावल", "raag": "Deshkar", "vilambit": "", "drut": ""},
    {"sno": 7, "thaat": "बिलावल", "raag": "Maluha Kedar", "vilambit": "", "drut": ""},
    {"sno": 8, "thaat": "बिलावल", "raag": "हंसध्वनि", "vilambit": "जाने दे रसिया", "drut": "लागी लगन प्रभु के दरस"},
    {"sno": 9, "thaat": "बिलावल", "raag": "Jaldhar Kedar", "vilambit": "", "drut": ""},
    {"sno": 10, "thaat": "बिलावल", "raag": "Sarparada", "vilambit": "", "drut": ""},
    {"sno": 11, "thaat": "बिलावल", "raag": "Gopika Basant", "vilambit": "", "drut": ""},
    {"sno": 12, "thaat": "बिलावल", "raag": "Devgiri Bilawal", "vilambit": "", "drut": ""},
    {"sno": 13, "thaat": "बिलावल", "raag": "Bhatiyar", "vilambit": "बैरन भई निंदिया", "drut": "जागो मोहन प्यारे"},
    {"sno": 14, "thaat": "बिलावल", "raag": "Nat Bihag", "vilambit": "नंदलाल घिर आए", "drut": "छेड़त श्याम"},
    {"sno": 15, "thaat": "बिलावल", "raag": "Sukla Bilawal", "vilambit": "", "drut": ""},
    {"sno": 16, "thaat": "बिलावल", "raag": "Bihagara", "vilambit": "", "drut": ""},
    
    # Kalyan Thaat
    {"sno": 1, "thaat": "कल्याण", "raag": "कल्याण", "vilambit": "मुरली मनोहर", "drut": ""},
    {"sno": 2, "thaat": "कल्याण", "raag": "यमन", "vilambit": "ए री आली पिया बिन", "drut": "बरनी ना जा"},
    {"sno": 3, "thaat": "कल्याण", "raag": "भूपाली", "vilambit": "एरी मोरे सैयाँ", "drut": "सकल भुवन"},
    {"sno": 4, "thaat": "कल्याण", "raag": "हमीर", "vilambit": "कौन गली गयो श्याम", "drut": "नंदलाल मोरे घर आये"},
    {"sno": 5, "thaat": "कल्याण", "raag": "केदार", "vilambit": "कैसे कैसो मन लियो", "drut": "श्याम सो सुंदर"},
    {"sno": 6, "thaat": "कल्याण", "raag": "Kamod", "vilambit": "", "drut": ""},
    {"sno": 7, "thaat": "कल्याण", "raag": "Hindol", "vilambit": "", "drut": ""},
    {"sno": 8, "thaat": "कल्याण", "raag": "Gaur Sarang", "vilambit": "", "drut": ""},
    {"sno": 9, "thaat": "कल्याण", "raag": "Chhayanat", "vilambit": "", "drut": ""},
    {"sno": 10, "thaat": "कल्याण", "raag": "Sudh Kalyan", "vilambit": "", "drut": ""},
    {"sno": 11, "thaat": "कल्याण", "raag": "मारु बिहाग", "vilambit": "सखी री सोवत है पिया", "drut": "ए मोरे मन"},
    {"sno": 12, "thaat": "कल्याण", "raag": "Nand", "vilambit": "", "drut": ""},
    {"sno": 13, "thaat": "कल्याण", "raag": "शुद्ध सारंग", "vilambit": "दरस बिन लागे", "drut": "जा जा रे कागा"},
    {"sno": 14, "thaat": "कल्याण", "raag": "Yamani Bilawal", "vilambit": "", "drut": ""},
    {"sno": 15, "thaat": "कल्याण", "raag": "Shyam Kalyan", "vilambit": "", "drut": ""},
    {"sno": 16, "thaat": "कल्याण", "raag": "Hemant", "vilambit": "", "drut": ""},
    {"sno": 17, "thaat": "कल्याण", "raag": "Jogkauns", "vilambit": "", "drut": ""},
    {"sno": 18, "thaat": "कल्याण", "raag": "Jaijai Kalyan", "vilambit": "", "drut": ""},
    
    # Khamaj Thaat
    {"sno": 1, "thaat": "खमाज", "raag": "खमाज", "vilambit": "कोयलिया कूक सुनाए", "drut": "कैसे भरूं पानी"},
    {"sno": 2, "thaat": "खमाज", "raag": "देश", "vilambit": "बीनी री रैना", "drut": "लंगर तोहे लाज"},
    {"sno": 3, "thaat": "खमाज", "raag": "तिलंग", "vilambit": "न जा जा रे", "drut": "साजन घर आवे"},
    {"sno": 4, "thaat": "खमाज", "raag": "तिलक कामोद", "vilambit": "नीर भरन कैसे जाऊँ", "drut": "रसिया ने बुलाया"},
    {"sno": 5, "thaat": "खमाज", "raag": "Jaijaiwanti", "vilambit": "", "drut": ""},
    {"sno": 6, "thaat": "खमाज", "raag": "Gaud Malhar", "vilambit": "", "drut": ""},
    {"sno": 7, "thaat": "खमाज", "raag": "रागेश्री", "vilambit": "पिया नहीं आए", "drut": "छेड़ी री मैं"},
    {"sno": 8, "thaat": "खमाज", "raag": "चंपकली", "vilambit": "साजनवा बिन कैसे", "drut": "बिनती सुनो मेरी"},
    {"sno": 9, "thaat": "खमाज", "raag": "जोग", "vilambit": "साजन मोरे घर आए", "drut": "पिया बिन लागे ना"},
    {"sno": 10, "thaat": "खमाज", "raag": "Narayani", "vilambit": "", "drut": ""},
    {"sno": 11, "thaat": "खमाज", "raag": "Madhmad Sarang", "vilambit": "", "drut": ""},
    {"sno": 12, "thaat": "खमाज", "raag": "Gara", "vilambit": "", "drut": ""},
    {"sno": 13, "thaat": "खमाज", "raag": "गोरख कल्याण", "vilambit": "हेरी मोरी आज तो", "drut": "तोरे दरस बिन"},
    {"sno": 14, "thaat": "खमाज", "raag": "Jhinjhoti", "vilambit": "", "drut": ""},
    {"sno": 15, "thaat": "खमाज", "raag": "Khambavati", "vilambit": "", "drut": ""},
    {"sno": 16, "thaat": "खमाज", "raag": "सरस्वती", "vilambit": "अब तो आए", "drut": "पिया नहीं आए"},
    
    # Kafi Thaat
    {"sno": 1, "thaat": "काफी", "raag": "काफी", "vilambit": "गोरी तोरी बाँकी", "drut": "धीरे धीरे आओ"},
    {"sno": 2, "thaat": "काफी", "raag": "वृंदावनी सारंग", "vilambit": "रवि के ताप", "drut": "बन बन ढूँढ़न गई"},
    {"sno": 3, "thaat": "काफी", "raag": "भीमपलासी", "vilambit": "अब के साजन घर आयो", "drut": "बागुलवा कहे करत"},
    {"sno": 4, "thaat": "काफी", "raag": "बागेश्री", "vilambit": "कौन करत तोरी बिनती", "drut": "नई नई डोरिया"},
    {"sno": 5, "thaat": "काफी", "raag": "Pilu", "vilambit": "", "drut": ""},
    {"sno": 6, "thaat": "काफी", "raag": "पटदीप", "vilambit": "रंगीली सँवरिया", "drut": "सखियन के संग"},
    {"sno": 7, "thaat": "काफी", "raag": "बहार", "vilambit": "बरसत आज", "drut": "केसो हरि आयो रे"},
    {"sno": 8, "thaat": "काफी", "raag": "Miya Malhar", "vilambit": "", "drut": ""},
    {"sno": 9, "thaat": "काफी", "raag": "Malgunji", "vilambit": "", "drut": ""},
    {"sno": 10, "thaat": "काफी", "raag": "चंद्रकौंस", "vilambit": "बालम दरस दिखाओ", "drut": "आज गावत मन मेरो"},
    {"sno": 11, "thaat": "काफी", "raag": "Abhogi", "vilambit": "", "drut": ""},
    {"sno": 12, "thaat": "काफी", "raag": "Sur Malhar", "vilambit": "", "drut": ""},
    {"sno": 13, "thaat": "काफी", "raag": "Hanskinkani", "vilambit": "", "drut": ""},
    {"sno": 14, "thaat": "काफी", "raag": "Dhanashree", "vilambit": "", "drut": ""},
    {"sno": 15, "thaat": "काफी", "raag": "Bhim", "vilambit": "", "drut": ""},
    {"sno": 16, "thaat": "काफी", "raag": "Dhani", "vilambit": "", "drut": ""},
    {"sno": 17, "thaat": "काफी", "raag": "Sahana", "vilambit": "", "drut": ""},
    {"sno": 18, "thaat": "काफी", "raag": "Jayant Malhar", "vilambit": "", "drut": ""},
    {"sno": 19, "thaat": "काफी", "raag": "Megh Malhar", "vilambit": "", "drut": ""},
    {"sno": 20, "thaat": "काफी", "raag": "Miya Ki Sarang", "vilambit": "", "drut": ""},
    {"sno": 21, "thaat": "काफी", "raag": "Suha", "vilambit": "", "drut": ""},
    {"sno": 22, "thaat": "काफी", "raag": "Nayaki Kanhra", "vilambit": "", "drut": ""},
    {"sno": 23, "thaat": "काफी", "raag": "Ramdasi Malhar", "vilambit": "", "drut": ""},
    {"sno": 24, "thaat": "काफी", "raag": "Sugharai", "vilambit": "", "drut": ""},
    {"sno": 25, "thaat": "काफी", "raag": "Gauri", "vilambit": "", "drut": ""},
    {"sno": 26, "thaat": "काफी", "raag": "Barwa", "vilambit": "", "drut": ""},
    {"sno": 27, "thaat": "काफी", "raag": "Kafi Kanhra", "vilambit": "", "drut": ""},
    {"sno": 28, "thaat": "काफी", "raag": "शिवरंजनी", "vilambit": "पायलिया बाजें", "drut": "धीरे धीरे आओ"},
    
    # Asavari Thaat
    {"sno": 1, "thaat": "आसावरी", "raag": "आसावरी", "vilambit": "मेरो अल्ला बख्शो", "drut": "जा जा रे अपनी"},
    {"sno": 2, "thaat": "आसावरी", "raag": "जौनपुरी", "vilambit": "पायल की झनकार", "drut": "छत्र छाया अति सोहे"},
    {"sno": 3, "thaat": "आसावरी", "raag": "अड़ाना", "vilambit": "तरपत हूँ जैसे", "drut": "साजन घरवा आए"},
    {"sno": 4, "thaat": "आसावरी", "raag": "Darbari Kanhra", "vilambit": "", "drut": ""},
    {"sno": 5, "thaat": "आसावरी", "raag": "Deshi", "vilambit": "", "drut": ""},
    {"sno": 6, "thaat": "आसावरी", "raag": "Kaushi Kanhra", "vilambit": "", "drut": ""},
    {"sno": 7, "thaat": "आसावरी", "raag": "दरबारी", "vilambit": "नज़र ना लागी", "drut": "कवारी सोहे"},
    
    # Bhairav Thaat
    {"sno": 1, "thaat": "भैरव", "raag": "भैरव", "vilambit": "पिया बिन", "drut": "लागा चुनरिया में दाग"},
    {"sno": 2, "thaat": "भैरव", "raag": "Kalingda", "vilambit": "", "drut": ""},
    {"sno": 3, "thaat": "भैरव", "raag": "Vibhas", "vilambit": "", "drut": ""},
    {"sno": 4, "thaat": "भैरव", "raag": "Ramkali", "vilambit": "", "drut": ""},
    {"sno": 5, "thaat": "भैरव", "raag": "Ahir Bhairav", "vilambit": "", "drut": ""},
    {"sno": 6, "thaat": "भैरव", "raag": "Bangal Bhairav", "vilambit": "", "drut": ""},
    {"sno": 7, "thaat": "भैरव", "raag": "Anand Bhairav", "vilambit": "", "drut": ""},
    {"sno": 8, "thaat": "भैरव", "raag": "Gunkali", "vilambit": "", "drut": ""},
    {"sno": 9, "thaat": "भैरव", "raag": "Shivmat Bhairav", "vilambit": "", "drut": ""},
    
    # Bhairavi Thaat
    {"sno": 1, "thaat": "भैरवी", "raag": "भैरवी", "vilambit": "अब तो आप", "drut": "छताओगे"},
    {"sno": 2, "thaat": "भैरवी", "raag": "मालकौंस", "vilambit": "बालमा अब घर आओ", "drut": "पिरत ना जानिए"},
    {"sno": 3, "thaat": "भैरवी", "raag": "Chandrakauns", "vilambit": "", "drut": ""},
    {"sno": 4, "thaat": "भैरवी", "raag": "Bhupal Todi", "vilambit": "", "drut": ""},
    {"sno": 5, "thaat": "भैरवी", "raag": "कोमल ऋषभ आसावरी", "vilambit": "पिया बिन", "drut": "लागा चुनरिया में दाग"},
    {"sno": 6, "thaat": "भैरवी", "raag": "Bilaskhani Todi", "vilambit": "", "drut": ""},
    
    # Poorvi Thaat
    {"sno": 1, "thaat": "पूर्वी", "raag": "पूर्वी", "vilambit": "रेत में", "drut": "पिया संग खेलूं"},
    {"sno": 2, "thaat": "पूर्वी", "raag": "श्री", "vilambit": "हरी मेरे जीवन", "drut": "पिया घर आयो"},
    {"sno": 3, "thaat": "पूर्वी", "raag": "पूरिया धनाश्री", "vilambit": "पग घुंघरू बाँध", "drut": "आज सो बना"},
    {"sno": 4, "thaat": "पूर्वी", "raag": "Basant", "vilambit": "", "drut": ""},
    {"sno": 5, "thaat": "पूर्वी", "raag": "Paraj", "vilambit": "", "drut": ""},
    {"sno": 6, "thaat": "पूर्वी", "raag": "ललित", "vilambit": "सखी मोरी", "drut": "तू है अनंत"},
    {"sno": 7, "thaat": "पूर्वी", "raag": "Rewa", "vilambit": "", "drut": ""},
    {"sno": 8, "thaat": "पूर्वी", "raag": "Jotashree", "vilambit": "", "drut": ""},
    
    # Marva Thaat
    {"sno": 1, "thaat": "मारवा", "raag": "मारवा", "vilambit": "", "drut": ""},
    {"sno": 2, "thaat": "मारवा", "raag": "सोहनी", "vilambit": "ऐसो सुघर", "drut": "झनन झन"},
    {"sno": 3, "thaat": "मारवा", "raag": "पूरिया", "vilambit": "", "drut": ""},
    {"sno": 4, "thaat": "मारवा", "raag": "पूरिया कल्याण", "vilambit": "प्यारे रे गल लागो", "drut": "अब मोरी सुध"},
    {"sno": 5, "thaat": "मारवा", "raag": "Jait", "vilambit": "", "drut": ""},
    {"sno": 6, "thaat": "मारवा", "raag": "Bhankhar", "vilambit": "", "drut": ""},
    {"sno": 7, "thaat": "मारवा", "raag": "Lalita Gauri", "vilambit": "", "drut": ""},
    {"sno": 8, "thaat": "मारवा", "raag": "भटियार", "vilambit": "ललिता", "drut": "पायलिया"},
    
    # Todi Thaat
    {"sno": 1, "thaat": "तोड़ी", "raag": "तोड़ी", "vilambit": "", "drut": ""},
    {"sno": 2, "thaat": "तोड़ी", "raag": "मुल्तानी", "vilambit": "आज मोरे घर", "drut": "नैनन में"},
    {"sno": 3, "thaat": "तोड़ी", "raag": "गुजरी तोड़ी", "vilambit": "भरन चली पनिया", "drut": "आज मोरे घर"},
    {"sno": 4, "thaat": "तोड़ी", "raag": "मधुवंती", "vilambit": "मुरली बजाई", "drut": "अरी री मैं तो"}
]

# Update bandish data
data['bandish']['data'] = []
for item in complete_bandish_data:
    data['bandish']['data'].append({
        'S No': item['sno'],
        'थाट': item['thaat'],
        'राग': item['raag'],
        'विलंबित लय (धीमा टेम्पो) - आम बंदिश': item['vilambit'],
        'द्रुत लय (तेज टेम्पो) - आम बंदिश': item['drut']
    })

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✓ Updated complete bandish data for {len(complete_bandish_data)} raags")
print("✓ Data organized by thaat with S.No.")
