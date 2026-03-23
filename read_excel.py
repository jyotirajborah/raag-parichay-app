import pandas as pd
import json
import math
import datetime

file_path = r"c:\Users\bgsmi\OneDrive\Documents\antigravity 2\Raag Parichay.xlsx"

def clean_value(val):
    """Convert non-serializable values to strings."""
    if val is None or (isinstance(val, float) and math.isnan(val)):
        return None
    if isinstance(val, (datetime.datetime, datetime.date)):
        return str(val)
    if isinstance(val, float) and val == int(val):
        return str(int(val))
    return str(val) if not isinstance(val, str) else val

res = {}
try:
    xl = pd.ExcelFile(file_path)
    res['sheets'] = xl.sheet_names
    for sheet in xl.sheet_names:
        df = xl.parse(sheet)
        # Clean each cell
        records = []
        for _, row in df.iterrows():
            record = {}
            for col in df.columns:
                record[col] = clean_value(row[col])
            records.append(record)
        res[sheet] = {
            'columns': df.columns.tolist(),
            'data': records
        }
except Exception as e:
    res['error'] = str(e)

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(res, f, ensure_ascii=False, indent=2)

print(f"Done! Extracted {len(res.get('sheets', []))} sheets.")
# Print raag count
if 'Raag' in res:
    raag_data = res['Raag']['data']
    raag_names = [r.get('Raag (R) (13)', '') for r in raag_data if r.get('Raag (R) (13)') and r.get('Raag (R) (13)') != 'nan']
    print(f"Total raag entries found: {len(raag_names)}")
    # Check thaats
    thaats = set()
    for r in raag_data:
        t = r.get('Thaat (T)')
        if t and t != 'nan':
            thaats.add(t)
    print(f"Thaats found: {sorted(thaats)}")
