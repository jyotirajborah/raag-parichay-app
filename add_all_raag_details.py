import json
import re

# Load existing data
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Parse raag details from the format provided
def parse_raag_info(text):
    """Parse raag information from the structured format"""
    raag_name = text.split('[')[0].strip()
    
    # Extract fields using regex
    aroha_match = re.search(r'\[A:\s*([^\]]+)\]', text)
    avaroha_match = re.search(r'\[Ab:\s*([^\]]+)\]', text)
    jati_match = re.search(r'\[Jati:\s*([^\]]+)\]', text)
    vadi_match = re.search(r'\[V:\s*([^\]]+)\]', text)
    samvadi_match = re.search(r'\[Sv:\s*([^\]]+)\]', text)
    thaat_match = re.search(r'\[Thaat:\s*([^\]]+)\]', text)
    pakad_match = re.search(r'\[Pakad:\s*([^\]]+)\]', text)
    time_match = re.search(r'\[Time:\s*([^\]]+)\]', text)
    prakriti_match = re.search(r'\[Prakriti:\s*([^\]]+)\]', text)
    similar_match = re.search(r'\[Similar:\s*([^\]]+)\]', text)
    chalan_match = re.search(r'\[Chalan:\s*([^\]]+)\]', text)
    
    return {
        'name': raag_name,
        'aroha': aroha_match.group(1) if aroha_match else '',
        'avaroha': avaroha_match.group(1) if avaroha_match else '',
        'jati': jati_match.group(1) if jati_match else '',
        'vadi': vadi_match.group(1) if vadi_match else '',
        'samvadi': samvadi_match.group(1) if samvadi_match else '',
        'thaat': thaat_match.group(1) if thaat_match else '',
        'pakad': pakad_match.group(1) if pakad_match else '',
        'time': time_match.group(1) if time_match else '',
        'prakriti': prakriti_match.group(1) if prakriti_match else '',
        'similar': similar_match.group(1) if similar_match else '',
        'chalan': chalan_match.group(1) if chalan_match else ''
    }

# All raag details from user (Bilawal thaat as example - you provided this)
raag_details_text = """
बिलावल[A: S R G M P D N S | Ab: S N D P M G R S (Varjit: None)] – [Jati: Sampurna–Sampurna] – [V: Dha | Sv: Ga] – [Thaat: Bilawal] – [Pakad: G R G, D N D P, G M R S] – [Time: Morning] – [Prakriti: Shant] – [Similar: Alhaiya Bilawal] – [Chalan: S R G, G M P, D N S, N D P, M G R S]
अल्हैया बिलावल[A: S R G M P D N S | Ab: S n D P M G R S (Varjit: Komal Ni in Ab)] – [Jati: Sampurna–Sampurna] – [V: Dha | Sv: Ga] – [Thaat: Bilawal] – [Pakad: D N D P, M G R G] – [Time: Morning] – [Prakriti: Gambhir] – [Similar: Bilawal] – [Chalan: S R G M, D N S, N D P, M G R G, R S]
बिहाग[A: S G M P N S (Varjit: R, D) | Ab: S N D P M G M G R S] – [Jati: Audav–Sampurna] – [V: Ga | Sv: Ni] – [Thaat: Bilawal] – [Pakad: G M P, N P, G M G] – [Time: Night] – [Prakriti: Shringar] – [Similar: Nat Bihag] – [Chalan: G M P N S, N D P, M G M G, R S]
दुर्गा[A: S R M P D S (Varjit: G, N) | Ab: S D P M R S (Varjit: G, N)] – [Jati: Audav–Audav] – [V: Ma | Sv: Sa] – [Thaat: Bilawal] – [Pakad: M R P, D P M R] – [Time: Evening] – [Prakriti: Shant] – [Similar: Deshkar] – [Chalan: S R M P, D S, D P M R, S]
शंकरा[A: S R G P D S (Varjit: M, N) | Ab: S N D P G R S] – [Jati: Shadav–Sampurna] – [V: Pa | Sv: Re] – [Thaat: Bilawal] – [Pakad: G P D, P G R] – [Time: Night] – [Prakriti: Veer] – [Similar: —] – [Chalan: S R G P, D S, N D P, G R S]
Deshkar[A: S R G P D S (Varjit: M, N) | Ab: S D P G R S (Varjit: M, N)] – [Jati: Audav–Audav] – [V: Pa | Sv: Re] – [Thaat: Bilawal] – [Pakad: G P D, G R S] – [Time: Morning] – [Prakriti: Veer] – [Similar: Durga] – [Chalan: S R G P, D S, D P G R, S]
"""

# Parse all raag details
raag_lines = [line.strip() for line in raag_details_text.strip().split('\n') if line.strip()]
parsed_raags = []

for line in raag_lines:
    if line:
        parsed_raags.append(parse_raag_info(line))

# Initialize raag_details structure if it doesn't exist
if 'raag_details' not in data:
    data['raag_details'] = {}

# Organize by thaat
for raag in parsed_raags:
    thaat = raag['thaat']
    if thaat not in data['raag_details']:
        data['raag_details'][thaat] = {}
    
    raag_name = raag['name']
    data['raag_details'][thaat][raag_name] = {
        'aroha': raag['aroha'],
        'avaroha': raag['avaroha'],
        'jati': raag['jati'],
        'vadi_samvadi': f"{raag['vadi']} / {raag['samvadi']}",
        'pakad': raag['pakad'],
        'time': raag['time'],
        'prakriti': raag['prakriti'],
        'similar': raag['similar'],
        'chalan': raag['chalan']
    }

# Save updated data
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✓ Added detailed information for {len(parsed_raags)} raags")
print("✓ Information includes: Aroha, Avaroha, Jati, Vadi/Samvadi, Pakad, Time, Prakriti, Similar raags, Chalan")
