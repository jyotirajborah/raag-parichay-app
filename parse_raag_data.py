import json
import re

# Your raw data
raw_data = """S No RaagS No Thaatथाटराग11बिलावलबिलावल22बिलावलअल्हैया बिलावल33बिलावलबिहाग44बिलावलदुर्गा55बिलावलशंकरा66बिलावलDeshkar77बिलावलMaluha Kedar88बिलावलहंसध्वनि99बिलावलJaldhar Kedar1010बिलावलSarparada1111बिलावलGopika Basant1212बिलावलDevgiri Bilawal1313बिलावलBhatiyar1414बिलावलNat Bihag1515बिलावलSukla Bilawal1616बिलावलBihagara171कल्याणकल्याण182कल्याणयमन193कल्याणभूपाली204कल्याणहमीर215कल्याणकेदार226कल्याणKamod237कल्याणHindol248कल्याणGaur sarang259कल्याणChayanaut2610कल्याणSudh Kalyan2711कल्याणमारु बिहाग2812कल्याणNand2913कल्याणशुद्ध सारंग3014कल्याणYamani Bilawal3115कल्याणShyam Kalyan3216कल्याणHemant3317कल्याणJogkaunsh3418कल्याणJaut Kalyan351खमाजखमाज362खमाजदेश373खमाजतिलंग384खमाजतिलक कामोद395खमाजJaijaiwanti406खमाजGur Malhar417खमाजरागेश्री/Rageswari428खमाजचंपकली439खमाजजोग4410खमाजNarayani4511खमाजMadhumad Sarang4612खमाजGara4713खमाजगोरख कल्याण4814खमाजJinjhoti4915खमाजKhambawati5016खमाजसरस्वती511काफीकाफी522काफीवृंदावनी सारंग533काफीभीमपलासी544काफीबागेश्री555काफीPilu566काफीपटदीप577काफीबहार588काफीMiya Malhar599काफीMalgunji6010काफीचंद्रकौंस6111काफीAbhogi Kahra6212काफीSur Malhar6313काफीHanskinkani6414काफीDhanashree6515काफीBhim6616काफीDhani6717काफीSahana6818काफीJayant Malhar6919काफीMegh Malhar7020काफीMiya Ki Sarang7121काफीSuha7222काफीNayaki Kanhara7323काफीRamdasi Malhar7424काफीSugharai7525काफीGauri7626काफीBarwa7727काफीKafi Kanhra7828काफीशिवरंजनी791आसावरीआसावरी802आसावरीजौनपुरी813आसावरीअड़ाना824आसावरीDarbari Kanhra835आसावरीDeshi846आसावरीKaushi Kanhra857आसावरीदरबारी861भैरवभैरव872भैरवKalingara883भैरवVibhas894भैरवRamkali905भैरवAhir bhairav916भैरवBangal Bhairav927भैरवAnand Bhairav938भैरवGunkali949भैरवShivmat Bhairav951भैरवीभैरवी962भैरवीमालकौश973भैरवीChandrakaush984भैरवीBhupal Todi995भैरवीकोमल ऋषभ आसावरी1006भैरवीBilaskhani Todi1011पूर्वीपूर्वी1022पूर्वीश्री1033पूर्वीपूरिया धनाश्री1044पूर्वीBasant1055पूर्वीParaj1066पूर्वीललित1077पूर्वीRewa1088पूर्वीJotashree1091मारवामारवा1102मारवासोहनी1113मारवापूरिया 1124मारवापूरिया कल्याण1135मारवाJaut1146मारवाBhankhar1157मारवाLalita Gauri1168मारवाभाटिया1171तोड़ी तोड़ी1182तोड़ीमुल्तानी1193तोड़ीगुजरी तोड़ी1204तोड़ीमधुवंती"""

# Parse the data - it appears to be concatenated without clear delimiters
# Let's extract patterns: number + raag name + number + thaat
raags_by_thaat = {}

# Split by thaat names (in Hindi and English)
thaats = ['बिलावल', 'कल्याण', 'खमाज', 'काफी', 'आसावरी', 'भैरव', 'भैरवी', 'पूर्वी', 'मारवा', 'तोड़ी']

print("Parsed raag data:")
print(json.dumps(raags_by_thaat, ensure_ascii=False, indent=2))
