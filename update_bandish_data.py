import json

# Bandish data from the provided information
bandish_data = [
    {"thaat": "बिलावल", "raag": "बिलावल", "vilambit": "दरस बिन", "drut": "रब सो नेह लगा"},
    {"thaat": "बिलावल", "raag": "अल्हैया बिलावल", "vilambit": "कहाँ गयो", "drut": "जा रे जा रे जा"},
    {"thaat": "बिलावल", "raag": "बिहाग", "vilambit": "रैन अंधेरी डर पावे", "drut": "अब तो रट लगी"},
    {"thaat": "बिलावल", "raag": "दुर्गा", "vilambit": "बिता सारी रैन", "drut": "सौदा-मनी कड़ा-कड़ा के दमके"},
    {"thaat": "बिलावल", "raag": "शंकरा", "vilambit": "आयो री शुभ दिन आज", "drut": "कंगनवा तोरे"},
    {"thaat": "बिलावल", "raag": "हंसध्वनि", "vilambit": "जाने दे रसिया", "drut": "लागी लगन प्रभु के दरस"},
    {"thaat": "बिलावल", "raag": "Bhatiyar", "vilambit": "बैरन भई निंदिया", "drut": "जागो मोहन प्यारे"},
    {"thaat": "बिलावल", "raag": "Nat Bihag", "vilambit": "नंदलाल घिर आए", "drut": "छेड़त श्याम"},
    
    {"thaat": "कल्याण", "raag": "कल्याण", "vilambit": "मुरली मनोहर", "drut": ""},
    {"thaat": "कल्याण", "raag": "यमन", "vilambit": "ए री आली पिया बिन", "drut": "बरनी ना जा"},
    {"thaat": "कल्याण", "raag": "भूपाली", "vilambit": "एरी मोरे सैयाँ", "drut": "सकल भुवन"},
    {"thaat": "कल्याण", "raag": "हमीर", "vilambit": "कौन गली गयो श्याम", "drut": "नंदलाल मोरे घर आये"},
    {"thaat": "कल्याण", "raag": "केदार", "vilambit": "कैसे कैसो मन लियो", "drut": "श्याम सो सुंदर"},
    {"thaat": "कल्याण", "raag": "मारु बिहाग", "vilambit": "सखी री सोवत है पिया", "drut": "ए मोरे मन"},
    {"thaat": "कल्याण", "raag": "शुद्ध सारंग", "vilambit": "दरस बिन लागे", "drut": "जा जा रे कागा"},
    
    {"thaat": "खमाज", "raag": "खमाज", "vilambit": "कोयलिया कूक सुनाए", "drut": "कैसे भरूं पानी"},
    {"thaat": "खमाज", "raag": "देश", "vilambit": "बीनी री रैना", "drut": "लंगर तोहे लाज"},
    {"thaat": "खमाज", "raag": "तिलंग", "vilambit": "न जा जा रे", "drut": "साजन घर आवे"},
    {"thaat": "खमाज", "raag": "तिलक कामोद", "vilambit": "नीर भरन कैसे जाऊँ", "drut": "रसिया ने बुलाया"},
    {"thaat": "खमाज", "raag": "रागेश्री/Rageswari", "vilambit": "पिया नहीं आए", "drut": "छेड़ी री मैं"},
    {"thaat": "खमाज", "raag": "चंपकली", "vilambit": "साजनवा बिन कैसे", "drut": "बिनती सुनो मेरी"},
    {"thaat": "खमाज", "raag": "जोग", "vilambit": "साजन मोरे घर आए", "drut": "पिया बिन लागे ना"},
    {"thaat": "खमाज", "raag": "गोरख कल्याण", "vilambit": "हेरी मोरी आज तो", "drut": "तोरे दरस बिन"},
    {"thaat": "खमाज", "raag": "सरस्वती", "vilambit": "अब तो आए", "drut": "पिया नहीं आए"},
    
    {"thaat": "काफी", "raag": "काफी", "vilambit": "गोरी तोरी बाँकी", "drut": "धीरे धीरे आओ"},
    {"thaat": "काफी", "raag": "वृंदावनी सारंग", "vilambit": "रवि के ताप", "drut": "बन बन ढूँढ़न गई"},
    {"thaat": "काफी", "raag": "भीमपलासी", "vilambit": "अब के साजन घर आयो", "drut": "बागुलवा कहे करत"},
    {"thaat": "काफी", "raag": "बागेश्री", "vilambit": "कौन करत तोरी बिनती", "drut": "नई नई डोरिया"},
    {"thaat": "काफी", "raag": "पटदीप", "vilambit": "रंगीली सँवरिया", "drut": "सखियन के संग"},
    {"thaat": "काफी", "raag": "बहार", "vilambit": "बरसत आज", "drut": "केसो हरि आयो रे"},
    {"thaat": "काफी", "raag": "चंद्रकौंस", "vilambit": "बालम दरस दिखाओ", "drut": "आज गावत मन मेरो"},
    {"thaat": "काफी", "raag": "शिवरंजनी", "vilambit": "पायलिया बाजें", "drut": "धीरे धीरे आओ"},
    
    {"thaat": "आसावरी", "raag": "आसावरी", "vilambit": "मेरो अल्ला बख्शो", "drut": "जा जा रे अपनी"},
    {"thaat": "आसावरी", "raag": "जौनपुरी", "vilambit": "पायल की झनकार", "drut": "छत्र छाया अति सोहे"},
    {"thaat": "आसावरी", "raag": "अड़ाना", "vilambit": "तरपत हूँ जैसे", "drut": "साजन घरवा आए"},
    {"thaat": "आसावरी", "raag": "दरबारी", "vilambit": "नज़र ना लागी", "drut": "कवारी सोहे"},
    
    {"thaat": "भैरव", "raag": "भैरव", "vilambit": "पिया बिन", "drut": "लागा चुनरिया में दाग"},
    
    {"thaat": "भैरवी", "raag": "भैरवी", "vilambit": "अब तो आप", "drut": "छताओगे"},
    {"thaat": "भैरवी", "raag": "मालकौंस", "vilambit": "बालमा अब घर आओ", "drut": "पिरत ना जानिए"},
    {"thaat": "भैरवी", "raag": "कोमल ऋषभ आसावरी", "vilambit": "पिया बिन", "drut": "लागा चुनरिया में दाग"},
    
    {"thaat": "पूर्वी", "raag": "पूर्वी", "vilambit": "रेत में", "drut": "पिया संग खेलूं"},
    {"thaat": "पूर्वी", "raag": "श्री", "vilambit": "हरी मेरे जीवन", "drut": "पिया घर आयो"},
    {"thaat": "पूर्वी", "raag": "पूरिया धनाश्री", "vilambit": "पग घुंघरू बाँध", "drut": "आज सो बना"},
    {"thaat": "पूर्वी", "raag": "ललित", "vilambit": "सखी मोरी", "drut": "तू है अनंत"},
    
    {"thaat": "मारवा", "raag": "सोहनी", "vilambit": "ऐसो सुघर", "drut": "झनन झन"},
    {"thaat": "मारवा", "raag": "पूरिया कल्याण", "vilambit": "प्यारे रे गल लागो", "drut": "अब मोरी सुध"},
    {"thaat": "मारवा", "raag": "भटियार", "vilambit": "ललिता", "drut": "पायलिया"},
    
    {"thaat": "तोड़ी", "raag": "मुल्तानी", "vilambit": "आज मोरे घर", "drut": "नैनन में"},
    {"thaat": "तोड़ी", "raag": "गुजरी तोड़ी", "vilambit": "भरन चली पनिया", "drut": "आज मोरे घर"},
    {"thaat": "तोड़ी", "raag": "मधुवंती", "vilambit": "मुरली बजाई", "drut": "अरी री मैं तो"},
]

# Read existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update bandish section
if 'bandish' not in data:
    data['bandish'] = {}

data['bandish']['columns'] = ['राग', 'विलंबित लय (धीमा टेम्पो) - आम बंदिश', 'द्रुत लय (तेज टेम्पो) - आम बंदिश']
data['bandish']['data'] = []

for item in bandish_data:
    data['bandish']['data'].append({
        'राग': item['raag'],
        'विलंबित लय (धीमा टेम्पो) - आम बंदिश': item['vilambit'],
        'द्रुत लय (तेज टेम्पो) - आम बंदिश': item['drut']
    })

# Write back to data.json
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Updated bandish data for {len(bandish_data)} raags")
