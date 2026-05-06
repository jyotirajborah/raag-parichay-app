import json

# Load existing data
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Comprehensive raag data from user
raag_data = {
    "बिलावल": {
        "thaat": "Bilaval",
        "vilambit": "दरस बिनरब सो नेह लगा",
        "drut": ""
    },
    "अल्हैया बिलावल": {
        "thaat": "Bilaval",
        "vilambit": "कहाँ गयो",
        "drut": "जा रे जा रे जा"
    },
    "बिहाग": {
        "thaat": "Bilaval",
        "vilambit": "रैन अंधेरी डर पावे",
        "drut": "अब तो रट लगी"
    },
    "दुर्गा": {
        "thaat": "Bilaval",
        "vilambit": "बिता सारी रैन",
        "drut": "सौदा-मनी कड़ा-कड़ा के दमके"
    },
    "शंकरा": {
        "thaat": "Bilaval",
        "vilambit": "आयो री शुभ दिन आज",
        "drut": "कंगनवा तोरे"
    },
    "Deshkar": {
        "thaat": "Bilaval",
        "vilambit": "",
        "drut": ""
    },
    "Maluha Kedar": {
        "thaat": "Bilaval",
        "vilambit": "",
        "drut": ""
    },
    "हंसध्वनि": {
        "thaat": "Bilaval",
        "vilambit": "जाने दे रसिया",
        "drut": "लागी लगन प्रभु के दरस"
    },
    "Jaldhar Kedar": {
        "thaat": "Bilaval",
        "vilambit": "",
        "drut": ""
    },
    "Sarparada": {
        "thaat": "Bilaval",
        "vilambit": "",
        "drut": ""
    },
    "Gopika Basant": {
        "thaat": "Bilaval",
        "vilambit": "",
        "drut": ""
    },
    "Devgiri Bilawal": {
        "thaat": "Bilaval",
        "vilambit": "",
        "drut": ""
    },
    "Bhatiyar": {
        "thaat": "Bilaval",
        "vilambit": "बैरन भई निंदिया",
        "drut": "जागो मोहन प्यारे"
    },
    "Nat Bihag": {
        "thaat": "Bilaval",
        "vilambit": "नंदलाल घिर आए",
        "drut": "छेड़त श्याम"
    },
    "Sukla Bilawal": {
        "thaat": "Bilaval",
        "vilambit": "",
        "drut": ""
    },
    "Bihagara": {
        "thaat": "Bilaval",
        "vilambit": "",
        "drut": ""
    },
    "कल्याण": {
        "thaat": "Kalyan",
        "vilambit": "मुरली मनोहर",
        "drut": ""
    },
    "यमन": {
        "thaat": "Kalyan",
        "vilambit": "ए री आली पिया बिन",
        "drut": "बरनी ना जा"
    },
    "भूपाली": {
        "thaat": "Kalyan",
        "vilambit": "एरी मोरे सैयाँ",
        "drut": "सकल भुवन"
    },
    "हमीर": {
        "thaat": "Kalyan",
        "vilambit": "कौन गली गयो श्याम",
        "drut": "नंदलाल मोरे घर आये"
    },
    "केदार": {
        "thaat": "Kalyan",
        "vilambit": "कैसे कैसो मन लियो",
        "drut": "श्याम सो सुंदर"
    },
    "Kamod": {
        "thaat": "Kalyan",
        "vilambit": "",
        "drut": ""
    },
    "Hindol": {
        "thaat": "Kalyan",
        "vilambit": "",
        "drut": ""
    },
    "Gaur Sarang": {
        "thaat": "Kalyan",
        "vilambit": "",
        "drut": ""
    },
    "Chhayanat": {
        "thaat": "Kalyan",
        "vilambit": "",
        "drut": ""
    },
    "Sudh Kalyan": {
        "thaat": "Kalyan",
        "vilambit": "",
        "drut": ""
    },
    "मारु बिहाग": {
        "thaat": "Kalyan",
        "vilambit": "सखी री सोवत है पिया",
        "drut": "ए मोरे मन"
    },
    "Nand": {
        "thaat": "Kalyan",
        "vilambit": "",
        "drut": ""
    },
    "शुद्ध सारंग": {
        "thaat": "Kalyan",
        "vilambit": "दरस बिन लागे",
        "drut": "जा जा रे कागा"
    },
    "Yamani Bilawal": {
        "thaat": "Kalyan",
        "vilambit": "",
        "drut": ""
    },
    "Shyam Kalyan": {
        "thaat": "Kalyan",
        "vilambit": "",
        "drut": ""
    },
    "Hemant": {
        "thaat": "Kalyan",
        "vilambit": "",
        "drut": ""
    },
    "Jogkauns": {
        "thaat": "Kalyan",
        "vilambit": "",
        "drut": ""
    },
    "Jaijai Kalyan": {
        "thaat": "Kalyan",
        "vilambit": "",
        "drut": ""
    },
    "खमाज": {
        "thaat": "Khamaj",
        "vilambit": "कोयलिया कूक सुनाए",
        "drut": "कैसे भरूं पानी"
    },
    "देश": {
        "thaat": "Khamaj",
        "vilambit": "बीनी री रैना",
        "drut": "लंगर तोहे लाज"
    },
    "तिलंग": {
        "thaat": "Khamaj",
        "vilambit": "न जा जा रे",
        "drut": "साजन घर आवे"
    },
    "तिलक कामोद": {
        "thaat": "Khamaj",
        "vilambit": "नीर भरन कैसे जाऊँ",
        "drut": "रसिया ने बुलाया"
    },
    "Jaijaiwanti": {
        "thaat": "Khamaj",
        "vilambit": "",
        "drut": ""
    },
    "Gaud Malhar": {
        "thaat": "Khamaj",
        "vilambit": "",
        "drut": ""
    },
    "रागेश्री": {
        "thaat": "Khamaj",
        "vilambit": "पिया नहीं आए",
        "drut": "छेड़ी री मैं"
    },
    "चंपकली": {
        "thaat": "Khamaj",
        "vilambit": "साजनवा बिन कैसे",
        "drut": "बिनती सुनो मेरी"
    },
    "जोग": {
        "thaat": "Khamaj",
        "vilambit": "साजन मोरे घर आए",
        "drut": "पिया बिन लागे ना"
    },
    "Narayani": {
        "thaat": "Khamaj",
        "vilambit": "",
        "drut": ""
    },
    "Madhmad Sarang": {
        "thaat": "Khamaj",
        "vilambit": "",
        "drut": ""
    },
    "Gara": {
        "thaat": "Khamaj",
        "vilambit": "",
        "drut": ""
    },
    "गोरख कल्याण": {
        "thaat": "Khamaj",
        "vilambit": "हेरी मोरी आज तो",
        "drut": "तोरे दरस बिन"
    },
    "Jhinjhoti": {
        "thaat": "Khamaj",
        "vilambit": "",
        "drut": ""
    },
    "Khambavati": {
        "thaat": "Khamaj",
        "vilambit": "",
        "drut": ""
    },
    "सरस्वती": {
        "thaat": "Khamaj",
        "vilambit": "अब तो आए",
        "drut": "पिया नहीं आए"
    },
    "काफी": {
        "thaat": "Kafi",
        "vilambit": "गोरी तोरी बाँकी",
        "drut": "धीरे धीरे आओ"
    },
    "वृंदावनी सारंग": {
        "thaat": "Kafi",
        "vilambit": "रवि के ताप",
        "drut": "बन बन ढूँढ़न गई"
    },
    "भीमपलासी": {
        "thaat": "Kafi",
        "vilambit": "अब के साजन घर आयो",
        "drut": "बागुलवा कहे करत"
    },
    "बागेश्री": {
        "thaat": "Kafi",
        "vilambit": "कौन करत तोरी बिनती",
        "drut": "नई नई डोरिया"
    },
    "Pilu": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "पटदीप": {
        "thaat": "Kafi",
        "vilambit": "रंगीली सँवरिया",
        "drut": "सखियन के संग"
    },
    "बहार": {
        "thaat": "Kafi",
        "vilambit": "बरसत आज",
        "drut": "केसो हरि आयो रे"
    },
    "Miya Malhar": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Malgunji": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "चंद्रकौंस": {
        "thaat": "Kafi",
        "vilambit": "बालम दरस दिखाओ",
        "drut": "आज गावत मन मेरो"
    },
    "Abhogi": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Sur Malhar": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Hanskinkani": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Dhanashree": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Bhim": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Dhani": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Sahana": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Jayant Malhar": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Megh Malhar": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Miya Ki Sarang": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Suha": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Nayaki Kanhra": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Ramdasi Malhar": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Sugharai": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Gauri": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Barwa": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "Kafi Kanhra": {
        "thaat": "Kafi",
        "vilambit": "",
        "drut": ""
    },
    "शिवरंजनी": {
        "thaat": "Kafi",
        "vilambit": "पायलिया बाजें",
        "drut": "धीरे धीरे आओ"
    },
    "आसावरी": {
        "thaat": "Asavari",
        "vilambit": "मेरो अल्ला बख्शो",
        "drut": "जा जा रे अपनी"
    },
    "जौनपुरी": {
        "thaat": "Asavari",
        "vilambit": "पायल की झनकार",
        "drut": "छत्र छाया अति सोहे"
    },
    "अड़ाना": {
        "thaat": "Asavari",
        "vilambit": "तरपत हूँ जैसे",
        "drut": "साजन घरवा आए"
    },
    "Darbari Kanhra": {
        "thaat": "Asavari",
        "vilambit": "",
        "drut": ""
    },
    "Deshi": {
        "thaat": "Asavari",
        "vilambit": "",
        "drut": ""
    },
    "Kaushi Kanhra": {
        "thaat": "Asavari",
        "vilambit": "",
        "drut": ""
    },
    "दरबारी": {
        "thaat": "Asavari",
        "vilambit": "नज़र ना लागी",
        "drut": "कवारी सोहे"
    },
    "भैरव": {
        "thaat": "Bhairav",
        "vilambit": "पिया बिन",
        "drut": "लागा चुनरिया में दाग"
    },
    "Kalingda": {
        "thaat": "Bhairav",
        "vilambit": "",
        "drut": ""
    },
    "Vibhas": {
        "thaat": "Bhairav",
        "vilambit": "",
        "drut": ""
    },
    "Ramkali": {
        "thaat": "Bhairav",
        "vilambit": "",
        "drut": ""
    },
    "Ahir Bhairav": {
        "thaat": "Bhairav",
        "vilambit": "",
        "drut": ""
    },
    "Bangal Bhairav": {
        "thaat": "Bhairav",
        "vilambit": "",
        "drut": ""
    },
    "Anand Bhairav": {
        "thaat": "Bhairav",
        "vilambit": "",
        "drut": ""
    },
    "Gunkali": {
        "thaat": "Bhairav",
        "vilambit": "",
        "drut": ""
    },
    "Shivmat Bhairav": {
        "thaat": "Bhairav",
        "vilambit": "",
        "drut": ""
    },
    "भैरवी": {
        "thaat": "Bhairavi",
        "vilambit": "अब तो आप",
        "drut": "छताओगे"
    },
    "मालकौंस": {
        "thaat": "Bhairavi",
        "vilambit": "बालमा अब घर आओ",
        "drut": "पिरत ना जानिए"
    },
    "Chandrakauns": {
        "thaat": "Bhairavi",
        "vilambit": "",
        "drut": ""
    },
    "Bhupal Todi": {
        "thaat": "Bhairavi",
        "vilambit": "",
        "drut": ""
    },
    "कोमल ऋषभ आसावरी": {
        "thaat": "Bhairavi",
        "vilambit": "पिया बिन",
        "drut": "लागा चुनरिया में दाग"
    },
    "Bilaskhani Todi": {
        "thaat": "Bhairavi",
        "vilambit": "",
        "drut": ""
    },
    "पूर्वी": {
        "thaat": "Poorvi",
        "vilambit": "रेत में",
        "drut": "पिया संग खेलूं"
    },
    "श्री": {
        "thaat": "Poorvi",
        "vilambit": "हरी मेरे जीवन",
        "drut": "पिया घर आयो"
    },
    "पूरिया धनाश्री": {
        "thaat": "Poorvi",
        "vilambit": "पग घुंघरू बाँध",
        "drut": "आज सो बना"
    },
    "Basant": {
        "thaat": "Poorvi",
        "vilambit": "",
        "drut": ""
    },
    "Paraj": {
        "thaat": "Poorvi",
        "vilambit": "",
        "drut": ""
    },
    "ललित": {
        "thaat": "Poorvi",
        "vilambit": "सखी मोरी",
        "drut": "तू है अनंत"
    },
    "Rewa": {
        "thaat": "Poorvi",
        "vilambit": "",
        "drut": ""
    },
    "Jotashree": {
        "thaat": "Poorvi",
        "vilambit": "",
        "drut": ""
    },
    "मारवा": {
        "thaat": "Marva",
        "vilambit": "",
        "drut": ""
    },
    "सोहनी": {
        "thaat": "Marva",
        "vilambit": "ऐसो सुघर",
        "drut": "झनन झन"
    },
    "पूरिया": {
        "thaat": "Marva",
        "vilambit": "",
        "drut": ""
    },
    "पूरिया कल्याण": {
        "thaat": "Marva",
        "vilambit": "प्यारे रे गल लागो",
        "drut": "अब मोरी सुध"
    },
    "Jait": {
        "thaat": "Marva",
        "vilambit": "",
        "drut": ""
    },
    "Bhankhar": {
        "thaat": "Marva",
        "vilambit": "",
        "drut": ""
    },
    "Lalita Gauri": {
        "thaat": "Marva",
        "vilambit": "",
        "drut": ""
    },
    "भटियार": {
        "thaat": "Marva",
        "vilambit": "ललिता",
        "drut": "पायलिया"
    },
    "तोड़ी": {
        "thaat": "Todi",
        "vilambit": "",
        "drut": ""
    },
    "मुल्तानी": {
        "thaat": "Todi",
        "vilambit": "आज मोरे घर",
        "drut": "नैनन में"
    },
    "गुजरी तोड़ी": {
        "thaat": "Todi",
        "vilambit": "भरन चली पनिया",
        "drut": "आज मोरे घर"
    },
    "मधुवंती": {
        "thaat": "Todi",
        "vilambit": "मुरली बजाई",
        "drut": "अरी री मैं तो"
    }
}

# Update bandish data in data.json
if 'bandish' not in data:
    data['bandish'] = {'columns': [], 'data': []}

# Clear existing bandish data and rebuild
data['bandish']['columns'] = ['राग', 'विलंबित लय (धीमा टेम्पो) - आम बंदिश', 'द्रुत लय (तेज टेम्पो) - आम बंदिश']
data['bandish']['data'] = []

for raag_name, info in raag_data.items():
    data['bandish']['data'].append({
        'राग': raag_name,
        'विलंबित लय (धीमा टेम्पो) - आम बंदिश': info['vilambit'],
        'द्रुत लय (तेज टेम्पो) - आम बंदिश': info['drut']
    })

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✓ Updated bandish data for {len(raag_data)} raags")
