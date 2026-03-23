import pandas as pd
import json
import math

file_path = r"c:\Users\bgsmi\OneDrive\Documents\antigravity 2\Raag Parichay.xlsx"

res = {}
try:
    xl = pd.ExcelFile(file_path)
    res['sheets'] = xl.sheet_names
    for sheet in xl.sheet_names:
        df = xl.parse(sheet)
        # Convert all NaNs to empty strings
        df = df.fillna('')
        res[sheet] = {
            'columns': df.columns.tolist(),
            'data': df.to_dict(orient='records')  # Get all records
        }
except Exception as e:
    res['error'] = str(e)

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(res, f, ensure_ascii=False, indent=2)
