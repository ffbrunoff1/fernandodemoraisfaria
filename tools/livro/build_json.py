#!/usr/bin/env python3
"""pages.json (lines with layout) -> book.json (sections with semantic blocks)."""
import json, re, unicodedata, collections

pages = json.load(open('pages.json'))
INDENT = 10.8
RIGHT = {44.5: 307.3, 63.2: 326.0}  # margin -> right edge (justified text)

def slugify(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-').lower()

# ---------- section boundaries (1-based pdf pages) ----------
SECTIONS = [
    dict(slug='introducao-a-revolucao-silenciosa-na-engenharia-brasileira', number=None, part='Introdução',
         title='Introdução: A Revolução Silenciosa na Engenharia Brasileira', pages=(5, 20)),
    dict(slug='capitulo-1-o-que-sao-geossinteticos', number=1, part='Parte 1 – Os Fundamentos dos Geossintéticos',
         title='O que são Geossintéticos? Desvendando os Materiais', pages=(22, 27)),
    dict(slug='capitulo-2-o-geotextil-o-protagonista-versatil', number=2, part='Parte 1 – Os Fundamentos dos Geossintéticos',
         title='O Geotêxtil – O Protagonista Versátil', pages=(28, 46)),
    dict(slug='capitulo-3-a-familia-completa-alem-do-geotextil', number=3, part='Parte 1 – Os Fundamentos dos Geossintéticos',
         title='A Família Completa – Além do Geotêxtil', pages=(47, 77)),
    dict(slug='capitulo-4-historia-dos-geossinteticos-no-brasil-e-no-mundo', number=4, part='Parte 1 – Os Fundamentos dos Geossintéticos',
         title='Uma Breve História dos Geossintéticos no Brasil e no Mundo', pages=(78, 101)),
    dict(slug='capitulo-5-aplicacoes-que-moldam-o-brasil-estudos-de-caso', number=5, part='Parte 1 – Os Fundamentos dos Geossintéticos',
         title='Aplicações que Moldam o Brasil – Estudos de Caso', pages=(102, 137)),
    dict(slug='capitulo-6-geossinteticos-e-sustentabilidade', number=6, part='Parte 1 – Os Fundamentos dos Geossintéticos',
         title='Geossintéticos e Sustentabilidade – Construindo um Futuro Verde', pages=(138, 168)),
    dict(slug='capitulo-7-o-cenario-atual-do-mercado-no-brasil', number=7, part='Parte 2 – O Mercado Brasileiro de Geossintéticos',
         title='O Cenário Atual do Mercado no Brasil', pages=(170, 180)),
    dict(slug='capitulo-8-os-principais-players-fabricantes-e-distribuidores', number=8, part='Parte 2 – O Mercado Brasileiro de Geossintéticos',
         title='Os Principais Players – Fabricantes e Distribuidores', pages=(181, 219)),
    dict(slug='capitulo-9-normas-tecnicas-e-o-futuro-da-regulamentacao', number=9, part='Parte 2 – O Mercado Brasileiro de Geossintéticos',
         title='Normas Técnicas e o Futuro da Regulamentação', pages=(220, 241)),
    dict(slug='capitulo-10-conclusao-o-futuro-e-geossintetico', number=10, part='Parte 2 – O Mercado Brasileiro de Geossintéticos',
         title='Conclusão: O Futuro é Geossintético', pages=(242, 252)),
    dict(slug='apendices', number=None, part='Apêndices', title='Apêndices', pages=(253, 284)),
]

def body_lines(a, b):
    out = []
    for n in range(a, b + 1):
        for l in pages[n - 1]:
            if l['y'] < 60 or l['font'] == 'Marcellus-Regular':
                continue
            out.append(dict(l, page=n))
    return out

def margin_of(lines):
    return None

def M(l):
    return 63.2 if l['page'] % 2 == 1 else 44.5

def is_short(l, margin=None):
    return l['x1'] < RIGHT[M(l)] - 30

# ---------- text fixes ----------
def fix_text(t):
    t = re.sub(r'\s+', ' ', t).strip()
    t = re.sub(r'^(\d+)\.(?=[A-ZÁÉÍÓÚÂÊÔ])', r'\1. ', t)          # "1.Infraestrutura" -> "1. Infraestrutura"
    t = re.sub(r'\b([Bb]em) vind', r'\1-vind', t)
    t = re.sub(r'cana-de a(ç|c)úcar', 'cana-de-açúcar', t)
    t = re.sub(r'\b(\w+[áéíóúâêô]) (lo|la|los|las)\b', r'\1-\2', t)  # conhecê la -> conhecê-la
    t = re.sub(r'\b(pré|pós|recém) (?=[a-záéíóúâêôãõç])', r'\1-', t, flags=re.I)
    t = t.replace(' ?', '?').replace(' !', '!').replace(' ,', ',').replace(' .', '.').replace('( ', '(').replace(' )', ')')
    t = re.sub(r'"\s+', '"', t) if t.count('"') % 2 == 0 else t
    return t

def join_lines(parts):
    out = ''
    for p in parts:
        p = p.strip()
        if not out:
            out = p; continue
        if out.endswith('-'):
            if p[:1].islower() or p[:1] in 'áéíóúâêôãõç':
                out = out[:-1] + p          # hyphenation break
            else:
                out = out + p               # real hyphen ("não-" + "Tecido")
        else:
            out = out + ' ' + p
    return fix_text(out)

# ---------- block builder ----------
BULLET = re.compile(r'^[•▪·]\s*')
NUM = re.compile(r'^(\d{1,2})\.\s+\S')
CHECK = re.compile(r'^\[\s*\]\s*')
APX = re.compile(r'^Apêndice [A-F]: ')
END_PUNCT = ('.', '!', '?', '"', '”', ')', ';', ',')
SE_VERBS = {'desenrola', 'esconde', 'refere', 'tornou', 'transformou', 'trata', 'tratam', 'referem', 'destaca', 'destacam', 'tornam', 'torna', 'consolidou', 'consolida', 'baseia', 'baseiam', 'concentra', 'concentram', 'aplica', 'aplicam', 'espera', 'estima', 'observa', 'verifica', 'recomenda', 'utiliza', 'utilizam', 'encontra', 'encontram', 'mantém', 'segue', 'seguem'}

# tables flattened by the PDF generator: (first cell text, last cell text (inclusive), ncols, header row or None, group-row regex)
TABLES = [
    ('Volume de Material', 'Simples e objetivo. Verificação dos certificados e ensaios dos produtos.', 3, ['Critério', 'Solução tradicional', 'Solução com geossintéticos'], re.compile(r'^Pilar .*\([ESG]\)$')),
    ('Empresa', 'Engenharia Ambiental, Remediação, Infraestrutura', 4, None, None),
    ('Aterro sobre Solo Mole', 'Geotêxtil de proteção', 4, ['Aplicação', 'Função principal', 'Produto principal', 'Produtos complementares'], None),
]

def se_fix(t):
    return re.sub(r'\b([A-Za-zÀ-ÿ]+) se\b', lambda m: m.group(1) + ('-se' if m.group(1).lower() in SE_VERBS else ' se'), t)

def build_blocks(lines):
    blocks = []
    i, n = 0, len(lines)

    def indented(l):
        return abs(l['x0'] - (M(l) + INDENT)) < 1.5

    def starts_new(k):
        if k >= n: return True
        if k == 1: return False                       # 2nd line of a section (drop cap offsets it)
        l = lines[k]; t = l['text']
        if l['font'] == 'EBGaramond-Bold': return True
        if BULLET.match(t) or CHECK.match(t) or APX.match(t): return True
        if indented(l) or l['x0'] > M(l) + 14: return True
        p = lines[k - 1]
        if is_short(p) and p['page'] == l['page']: return True
        if p['page'] != l['page'] and is_short(p) and p['text'].rstrip().endswith(END_PUNCT): return True
        return False

    def read_cell(k):
        """cell = indented line + continuation lines at margin; returns (text, next k)"""
        parts = [lines[k]['text']]; k += 1
        while k < n and not starts_new(k):
            parts.append(lines[k]['text']); k += 1
        return join_lines(parts), k

    while i < n:
        l = lines[i]; t = l['text']
        # --- flattened table
        tb = next((tb for tb in TABLES if t == tb[0]), None)
        if tb:
            first, last, ncols, header, grp = tb
            cells = []; rows = []
            while i < n:
                c, i = read_cell(i)
                if grp and grp.match(c):
                    if cells: rows.append(cells); cells = []
                    rows.append({'group': c}); continue
                cells.append(c)
                if len(cells) == ncols: rows.append(cells); cells = []
                if c == last: break
            if cells: rows.append(cells)
            if header is None: header = rows.pop(0)
            blocks.append({'t': 'table', 'x': {'header': header, 'rows': rows}}); continue
        # --- bold heading (may wrap)
        if l['font'] == 'EBGaramond-Bold':
            parts = [t]; i += 1
            while i < n and lines[i]['font'] == 'EBGaramond-Bold' and (not is_short(lines[i-1]) or len(lines[i]['text'].split()) <= 2):
                parts.append(lines[i]['text']); i += 1
            blocks.append({'t': 'h2', 'x': join_lines(parts)}); continue
        # --- appendix heading (may wrap once)
        if APX.match(t) or t == 'Apêndices':
            parts = [t]; i += 1
            if not is_short(l) and i < n and is_short(lines[i]) and not lines[i]['text'].endswith(END_PUNCT) and not indented(lines[i]):
                parts.append(lines[i]['text']); i += 1
            blocks.append({'t': 'h2', 'x': join_lines(parts)}); continue
        # --- checklist item "[ ] 2. Título:"
        if CHECK.match(t):
            blocks.append({'t': 'h3', 'x': fix_text(CHECK.sub('', t))}); i += 1; continue
        # --- bullet item
        if BULLET.match(t):
            parts = [BULLET.sub('', t)]; i += 1
            while i < n and not starts_new(i):
                parts.append(lines[i]['text']); i += 1
            item = join_lines(parts)
            if blocks and blocks[-1]['t'] == 'ul': blocks[-1]['x'].append(item)
            else: blocks.append({'t': 'ul', 'x': [item]})
            continue
        # --- numbered list item with hanging indent (x0 well past the paragraph indent)
        if NUM.match(t) and l['x0'] > M(l) + 14:
            parts = [t]; i += 1
            while i < n and lines[i]['x0'] > M(lines[i]) + 14 and not BULLET.match(lines[i]['text']) and not NUM.match(lines[i]['text']) and lines[i]['font'] != 'EBGaramond-Bold':
                parts.append(lines[i]['text']); i += 1
            item = re.sub(r'^\d{1,2}\.\s+', '', join_lines(parts))
            if blocks and blocks[-1]['t'] == 'ol': blocks[-1]['x'].append(item)
            else: blocks.append({'t': 'ol', 'x': [item]})
            continue
        # --- paragraph (possibly a pseudo-heading)
        parts = [t]; i += 1
        while i < n and not starts_new(i):
            parts.append(lines[i]['text']); i += 1
        text = join_lines(parts)
        last = lines[i - 1]
        nlines = len(parts)
        is_heading = (nlines <= 2 and is_short(last) and not text.endswith(END_PUNCT)
                      and (indented(l) or re.match(r'^[A-F]\.\d', text) or re.match(r'^\d{1,2}\. [A-ZÁÉÍÓÚ]', text) or re.match(r'^Tabela [A-Z]\.\d', text))
                      and len(text) < 120 and not re.match(r'^\d{1,2}\. .*\(', text))
        if text.endswith(':'):
            is_heading = nlines == 1 and is_short(last) and len(text) <= 45 and indented(l)
        if is_heading:
            blocks.append({'t': 'h3', 'x': text})
        else:
            blocks.append({'t': 'p', 'x': se_fix(text)})
    return blocks

book = {
    'title': 'O Mercado de Geotêxtil e Outros Geossintéticos no Brasil',
    'subtitle': 'Fundamentos, aplicações, sustentabilidade e o mercado brasileiro de geotêxteis, geomembranas, geogrelhas e outros geossintéticos',
    'author': 'Fernando de Morais Faria',
    'year': 2025,
    'amazon': 'https://www.amazon.com.br/Mercado-Geot%C3%AAxtil-outros-Geossint%C3%A9ticos-Brasil-ebook/dp/B0FTD1KQZF',
    'blurb': [],
    'chapters': [],
}

for s in SECTIONS:
    lines = body_lines(*s['pages'])
    blocks = build_blocks(lines)
    book['chapters'].append({'slug': s['slug'], 'number': s['number'], 'part': s['part'], 'title': s['title'], 'blocks': blocks})

# split appendices into their own sections
ap = book['chapters'].pop()
cur = None; new = []
for b in ap['blocks']:
    m = re.match(r'^(Apêndice ([A-F]): (.+)|Agradecimentos)$', b['x']) if b['t'] == 'h2' else None
    if m:
        letter = m.group(2) or ''
        title = b['x']
        cur = {'slug': f'apendice-{letter.lower()}-{slugify(m.group(3))}' if letter else 'agradecimentos', 'number': None, 'part': 'Apêndices', 'title': title, 'blocks': []}
        new.append(cur); continue
    if b['t'] == 'h2' and b['x'] == 'Apêndices':
        continue
    if cur is None:
        cur = {'slug': 'apendices', 'number': None, 'part': 'Apêndices', 'title': 'Apêndices', 'blocks': []}; new.append(cur)
    cur['blocks'].append(b)
book['chapters'].extend(new)

# blurb for index page: first two paragraphs of the introduction
intro = book['chapters'][0]['blocks']
book['blurb'] = [b['x'] for b in intro if b['t'] == 'p'][:2]

json.dump(book, open('book.json', 'w'), ensure_ascii=False, indent=1)
for c in book['chapters']:
    kinds = collections.Counter(b['t'] for b in c['blocks'])
    words = sum(len(b['x'].split()) if isinstance(b['x'], str) else (sum(len(i.split()) for i in b['x']) if isinstance(b['x'], list) else 0) for b in c['blocks'])
    print(f"{c['slug'][:55]:55} words={words:6} {dict(kinds)}")
