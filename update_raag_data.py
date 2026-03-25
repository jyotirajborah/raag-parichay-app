import json
import re

# Parse the raw data you provided
# Format appears to be: S.No + Raag Name + S.No + Thaat (repeating)

raw_text = """1 बिलावल बिलावल
2 बिलावल अल्हैया बिलावल
3 बिलावल बिहाग
4 बिलावल दुर्गा
5 बिलावल शंकरा
6 बिलावल Deshkar
7 बिलावल Maluha Kedar
8 बिलावल हंसध्वनि
9 बिलावल Jaldhar Kedar
10 बिलावल Sarparada
11 बिलावल Gopika Basant
12 बिलावल Devgiri Bilawal
13 बिलावल Bhatiyar
14 बिलावल Nat Bihag
15 बिलावल Sukla Bilawal
16 बिलावल Bihagara
1 कल्याण कल्याण
2 कल्याण यमन
3 कल्याण भूपाली
4 कल्याण हमीर
5 कल्याण केदार
6 कल्याण Kamod
7 कल्याण Hindol
8 कल्याण Gaur sarang
9 कल्याण Chayanaut
10 कल्याण Sudh Kalyan
11 कल्याण मारु बिहाग
12 कल्याण Nand
13 कल्याण शुद्ध सारंग
14 कल्याण Yamani Bilawal
15 कल्याण Shyam Kalyan
16 कल्याण Hemant
17 कल्याण Jogkaunsh
18 कल्याण Jaut Kalyan
1 खमाज खमाज
2 खमाज देश
3 खमाज तिलंग
4 खमाज तिलक कामोद
5 खमाज Jaijaiwanti
6 खमाज Gur Malhar
7 खमाज रागेश्री/Rageswari
8 खमाज चंपकली
9 खमाज जोग
10 खमाज Narayani
11 खमाज Madhumad Sarang
12 खमाज Gara
13 खमाज गोरख कल्याण
14 खमाज Jinjhoti
15 खमाज Khambawati
16 खमाज सरस्वती
1 काफी काफी
2 काफी वृंदावनी सारंग
3 काफी भीमपलासी
4 काफी बागेश्री
5 काफी Pilu
6 काफी पटदीप
7 काफी बहार
8 काफी Miya Malhar
9 काफी Malgunji
10 काफी चंद्रकौंस
11 काफी Abhogi Kahra
12 काफी Sur Malhar
13 काफी Hanskinkani
14 काफी Dhanashree
15 काफी Bhim
16 काफी Dhani
17 काफी Sahana
18 काफी Jayant Malhar
19 काफी Megh Malhar
20 काफी Miya Ki Sarang
21 काफी Suha
22 काफी Nayaki Kanhara
23 काफी Ramdasi Malhar
24 काफी Sugharai
25 काफी Gauri
26 काफी Barwa
27 काफी Kafi Kanhra
28 काफी शिवरंजनी
1 आसावरी आसावरी
2 आसावरी जौनपुरी
3 आसावरी अड़ाना
4 आसावरी Darbari Kanhra
5 आसावरी Deshi
6 आसावरी Kaushi Kanhra
7 आसावरी दरबारी
1 भैरव भैरव
2 भैरव Kalingara
3 भैरव Vibhas
4 भैरव Ramkali
5 भैरव Ahir bhairav
6 भैरव Bangal Bhairav
7 भैरव Anand Bhairav
8 भैरव Gunkali
9 भैरव Shivmat Bhairav
1 भैरवी भैरवी
2 भैरवी मालकौश
3 भैरवी Chandrakaush
4 भैरवी Bhupal Todi
5 भैरवी कोमल ऋषभ आसावरी
6 भैरवी Bilaskhani Todi
1 पूर्वी पूर्वी
2 पूर्वी श्री
3 पूर्वी पूरिया धनाश्री
4 पूर्वी Basant
5 पूर्वी Paraj
6 पूर्वी ललित
7 पूर्वी Rewa
8 पूर्वी Jotashree
1 मारवा मारवा
2 मारवा सोहनी
3 मारवा पूरिया
4 मारवा पूरिया कल्याण
5 मारवा Jaut
6 मारवा Bhankhar
7 मारवा Lalita Gauri
8 मारवा भाटिया
1 तोड़ी तोड़ी
2 तोड़ी मुल्तानी
3 तोड़ी गुजरी तोड़ी
4 तोड़ी मधुवंती"""

# Parse into structured format
raags_by_thaat = {}
current_thaat = None

for line in raw_text.strip().split('\n'):
    parts = line.split(maxsplit=2)
    if len(parts) >= 3:
        sno = parts[0]
        thaat = parts[1]
        raag = parts[2]
        
        if thaat not in raags_by_thaat:
            raags_by_thaat[thaat] = []
        
        raags_by_thaat[thaat].append({
            "S.No": int(sno),
            "Raag": raag,
            "Thaat": thaat
        })

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update the Raag section with new data
# Create new raag entries
new_raag_data = []
global_sno = 1

for thaat in ['बिलावल', 'कल्याण', 'खमाज', 'काफी', 'आसावरी', 'भैरव', 'भैरवी', 'पूर्वी', 'मारवा', 'तोड़ी']:
    if thaat in raags_by_thaat:
        for idx, raag_info in enumerate(raags_by_thaat[thaat]):
            entry = {
                "S.No. - T": str(global_sno) if idx == 0 else None,
                "Thaat (T)": thaat if idx == 0 else None,
                "Column1": None,
                "S.No. - R": str(raag_info["S.No"]),
                "Raag (R) (13)": raag_info["Raag"],
                "Time (Gayan/Badan Samay)": None,
                "Year": None,
                " [A|Ab: Varjit] - [Jati] - [B: Badi -Sb: Sambadi] [Similarity with raag]": None,
                "Season": None,
                "Sa Ṟe Re Ga Ma Ḿa Pa Dẖa Dha Ṉi Ni Ṡa": None
            }
            new_raag_data.append(entry)
        global_sno += 1

# Update data
data['Raag']['data'] = new_raag_data

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Updated data.json with {len(new_raag_data)} raag entries")
print(f"Thaats updated: {list(raags_by_thaat.keys())}")
