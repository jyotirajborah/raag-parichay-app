with open('data.json', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(': NaN', ': null')

with open('data.json', 'w', encoding='utf-8') as f:
    f.write(text)
