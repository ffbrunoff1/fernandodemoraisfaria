import fitz, json, unicodedata, collections
PDF="/Users/brunonunes/Downloads/06 - NTC Brasil/Geossinteticos-Site/PDFs/O mercado de geotêxtil e outros geossintéticos no Brasil (3).pdf"
maps={int(k):{int(g):v for g,v in m.items()} for k,m in json.load(open('glyphmaps.json')).items()}
NAMED={'zero':'0','one':'1','two':'2','three':'3','four':'4','five':'5','six':'6','seven':'7','eight':'8','nine':'9'}
SUP={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'}
LIG={'ﬁ':'fi','ﬂ':'fl','ﬀ':'ff','ﬃ':'ffi','ﬄ':'ffl','ﬅ':'st','ﬆ':'st'}
def named(n):
    if n=='.notdef': return ''
    base,_,suf=n.partition('.')
    if base in NAMED:
        d=NAMED[base]; return SUP[d] if suf in ('numr','ordn','sups') else d
    return {'uni0302':'̂','gravecomb':'̀','acutecomb':'́','tildecomb':'̃','uni0308':'̈'}.get(base,'?')
doc=fitz.open(PDF); pages=[]
for p in doc:
    fx={f[3].split('+')[-1]:f[0] for f in p.get_fonts(full=True)}
    chars=[]
    for sp in p.get_texttrace():
        base=sp['font'].split('+')[-1]; m=maps.get(fx.get(base),{})
        for (u,g,org,bb) in sp['chars']:
            v=m.get(g)
            c=chr(u) if v is None else (named(v[1]) if isinstance(v,list) else v)
            c=LIG.get(c,c)
            if c in ('\r','\n','\t','\xa0'): c=' '
            chars.append({'y':round(org[1],1),'x':org[0],'c':c,'font':base,'size':round(sp['size'],1),'x1':bb[2]})
    chars.sort(key=lambda c:(c['y'],c['x']))
    lines=[]; cur=[]; cy=None
    for c in chars:
        if cy is None or abs(c['y']-cy)<=2.5: cur.append(c); cy=c['y'] if cy is None else cy
        else: lines.append(cur); cur=[c]; cy=c['y']
    if cur: lines.append(cur)
    out=[]; dropcap=None
    for ln in lines:
        ln.sort(key=lambda c:c['x'])
        # drop cap: big Garamond char inside a body line -> prepend to previous line
        big=[c for c in ln if c['font'].startswith('EBGaramond') and c['size']>=18 and len(ln)>3]
        if big and out:
            out[-1]['text']=''.join(c['c'] for c in big)+out[-1]['text']; ln=[c for c in ln if c not in big]
        txt=''; prev=None
        for c in ln:
            if prev is not None and c['c'] not in ('̀','́','̂','̃','̈'):
                gap=c['x']-prev['x1']
                if gap>0.12*c['size']: txt+=' '
            txt+=c['c']; prev=c
        txt=unicodedata.normalize('NFC',txt).strip()
        if not txt: continue
        font=collections.Counter(c['font'] for c in ln).most_common(1)[0][0]
        size=collections.Counter(c['size'] for c in ln).most_common(1)[0][0]
        out.append({'y':ln[0]['y'],'x0':round(ln[0]['x'],1),'x1':round(ln[-1]['x1'],1),'font':font,'size':size,'text':txt})
    pages.append(out)
json.dump(pages,open('pages.json','w'),ensure_ascii=False)
print('pages',len(pages))
