import json

# Shruti data with corrected Hindustani/Carnatic columns
shruti_data = [
    {"No.": "1", "Swara": "Sa", "Hindustani Swara-sthana": "Shuddha Sa (S)", "Shruti Name (Carnatic)": "Shadja (Sa)", "Frequency Ratio": "1/1", "Shruti Frequency (Hz) : Natural": "277.18", "Western Note : Standardization": "C#4 (277.18 Hz)"},
    {"No.": "2", "Swara": "Re", "Hindustani Swara-sthana": "", "Shruti Name (Carnatic)": "Ekasruti Rishabha", "Frequency Ratio": "256/243", "Shruti Frequency (Hz) : Natural": "292.05", "Western Note : Standardization": "D4 (293.66 Hz)"},
    {"No.": "3", "Swara": "Re", "Hindustani Swara-sthana": "Komal Re (r)", "Shruti Name (Carnatic)": "Dvisruti Rishabha", "Frequency Ratio": "16/15", "Shruti Frequency (Hz) : Natural": "295.66", "Western Note : Standardization": "D4 (293.66 Hz)"},
    {"No.": "4", "Swara": "Re", "Hindustani Swara-sthana": "", "Shruti Name (Carnatic)": "Trisruti Rishabha", "Frequency Ratio": "10/9", "Shruti Frequency (Hz) : Natural": "307.98", "Western Note : Standardization": "D#4/Eb4 (311.13 Hz)"},
    {"No.": "5", "Swara": "Re", "Hindustani Swara-sthana": "Shuddha Re (R)", "Shruti Name (Carnatic)": "Chatusruti Rishabha", "Frequency Ratio": "9/8", "Shruti Frequency (Hz) : Natural": "311.83", "Western Note : Standardization": "D#4/Eb4 (311.13 Hz)"},
    {"No.": "6", "Swara": "Ga", "Hindustani Swara-sthana": "", "Shruti Name (Carnatic)": "Sudha Gandhara", "Frequency Ratio": "32/27", "Shruti Frequency (Hz) : Natural": "328.09", "Western Note : Standardization": "E4 (329.63 Hz)"},
    {"No.": "7", "Swara": "Ga", "Hindustani Swara-sthana": "Komal Ga (g)", "Shruti Name (Carnatic)": "Sadharana Gandhara", "Frequency Ratio": "6/5", "Shruti Frequency (Hz) : Natural": "332.62", "Western Note : Standardization": "E4 (329.63 Hz)"},
    {"No.": "8", "Swara": "Ga", "Hindustani Swara-sthana": "Shuddha Ga (G)", "Shruti Name (Carnatic)": "Antara Gandhara", "Frequency Ratio": "5/4", "Shruti Frequency (Hz) : Natural": "346.48", "Western Note : Standardization": "F4 (349.23 Hz)"},
    {"No.": "9", "Swara": "Ga", "Hindustani Swara-sthana": "", "Shruti Name (Carnatic)": "Chyuta Madhyama Gandhara", "Frequency Ratio": "81/64", "Shruti Frequency (Hz) : Natural": "350.33", "Western Note : Standardization": "F4 (349.23 Hz)"},
    {"No.": "10", "Swara": "Ma", "Hindustani Swara-sthana": "Shuddha Ma (M)", "Shruti Name (Carnatic)": "Sudha Madhyama", "Frequency Ratio": "4/3", "Shruti Frequency (Hz) : Natural": "369.57", "Western Note : Standardization": "F#4/Gb4 (369.99 Hz)"},
    {"No.": "11", "Swara": "Ma", "Hindustani Swara-sthana": "Tivra Ma (m)", "Shruti Name (Carnatic)": "Tivra Sudha Madhyama", "Frequency Ratio": "27/20", "Shruti Frequency (Hz) : Natural": "374.2", "Western Note : Standardization": "F#4/Gb4 (369.99 Hz)"},
    {"No.": "12", "Swara": "Ma", "Hindustani Swara-sthana": "", "Shruti Name (Carnatic)": "Prati Madhyama", "Frequency Ratio": "45/32", "Shruti Frequency (Hz) : Natural": "389.79", "Western Note : Standardization": "G4 (392.00 Hz)"},
    {"No.": "13", "Swara": "Ma", "Hindustani Swara-sthana": "", "Shruti Name (Carnatic)": "Chyuta Panchama Madhyama", "Frequency Ratio": "729/512", "Shruti Frequency (Hz) : Natural": "394.06", "Western Note : Standardization": "G4 (392.00 Hz)"},
    {"No.": "14", "Swara": "Pa", "Hindustani Swara-sthana": "Shuddha Pa (P)", "Shruti Name (Carnatic)": "Panchama (Pa)", "Frequency Ratio": "3/2", "Shruti Frequency (Hz) : Natural": "415.77", "Western Note : Standardization": "G#4/Ab4 (415.30 Hz)"},
    {"No.": "15", "Swara": "Dha", "Hindustani Swara-sthana": "", "Shruti Name (Carnatic)": "Ekasruti Dhaivata", "Frequency Ratio": "128/81", "Shruti Frequency (Hz) : Natural": "438.12", "Western Note : Standardization": "A4 (440.00 Hz)"},
    {"No.": "16", "Swara": "Dha", "Hindustani Swara-sthana": "Komal Dha (d)", "Shruti Name (Carnatic)": "Dvisruti Dhaivata", "Frequency Ratio": "8/5", "Shruti Frequency (Hz) : Natural": "443.49", "Western Note : Standardization": "A4 (440.00 Hz)"},
    {"No.": "17", "Swara": "Dha", "Hindustani Swara-sthana": "", "Shruti Name (Carnatic)": "Trisruti Dhaivata", "Frequency Ratio": "5/3", "Shruti Frequency (Hz) : Natural": "461.97", "Western Note : Standardization": "A#4/Bb4 (466.16 Hz)"},
    {"No.": "18", "Swara": "Dha", "Hindustani Swara-sthana": "Shuddha Dha (D)", "Shruti Name (Carnatic)": "Chatusruti Dhaivata", "Frequency Ratio": "27/16", "Shruti Frequency (Hz) : Natural": "466.82", "Western Note : Standardization": "A#4/Bb4 (466.16 Hz)"},
    {"No.": "19", "Swara": "Ni", "Hindustani Swara-sthana": "", "Shruti Name (Carnatic)": "Sudha Nishada", "Frequency Ratio": "16/9", "Shruti Frequency (Hz) : Natural": "492.77", "Western Note : Standardization": "B4 (493.88 Hz)"},
    {"No.": "20", "Swara": "Ni", "Hindustani Swara-sthana": "Komal Ni (n)", "Shruti Name (Carnatic)": "Kaishiki Nishada", "Frequency Ratio": "9/5", "Shruti Frequency (Hz) : Natural": "498.92", "Western Note : Standardization": "B4 (493.88 Hz)"},
    {"No.": "21", "Swara": "Ni", "Hindustani Swara-sthana": "Shuddha Ni (N)", "Shruti Name (Carnatic)": "Kakali Nishada", "Frequency Ratio": "15/8", "Shruti Frequency (Hz) : Natural": "519.71", "Western Note : Standardization": "C5 (523.25 Hz)"},
    {"No.": "22", "Swara": "Ni", "Hindustani Swara-sthana": "", "Shruti Name (Carnatic)": "Chyuta Shadja Nishada", "Frequency Ratio": "243/128", "Shruti Frequency (Hz) : Natural": "523.63", "Western Note : Standardization": "C5 (523.25 Hz)"},
    {"No.": "23", "Swara": "Sa'", "Hindustani Swara-sthana": "Tara Sa (S')", "Shruti Name (Carnatic)": "Tara Shadja", "Frequency Ratio": "2/1", "Shruti Frequency (Hz) : Natural": "554.37", "Western Note : Standardization": "C#5 (554.37 Hz)"}
]

# Load existing data.json
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update the shruti data
data['22 shrutis']['data'] = shruti_data

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Updated 22 shrutis data with corrected Hindustani/Carnatic columns")
print("Hindustani column now only contains: Shuddha, Komal, Tivra, and Tara variations")
