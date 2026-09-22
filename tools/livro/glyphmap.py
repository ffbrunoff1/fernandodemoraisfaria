import fitz, io, sys, json, collections
from fontTools.ttLib import TTFont
PDF="/Users/brunonunes/Downloads/06 - NTC Brasil/Geossinteticos-Site/PDFs/O mercado de geotêxtil e outros geossintéticos no Brasil (3).pdf"

def sig(tt, gname):
    g=tt['glyf'][gname]; upm=tt['head'].unitsPerEm; aw=tt['hmtx'][gname][0]
    if g.numberOfContours==0 and not hasattr(g,'components'): return ('empty',round(aw/upm,3))
    try:
        coords,ends,flags=g.getCoordinates(tt['glyf'])
        xs=[c[0] for c in coords]; ys=[c[1] for c in coords]; mx=min(xs); my=min(ys)
        return (round(aw/upm,3), tuple(ends), tuple((round((x-mx)/upm,3),round((y-my)/upm,3)) for x,y in coords))
    except Exception:
        return ('err',round(aw/upm,3))

# reference tables: signature -> set of unicodes
refs={}
for name,path in [('EBGaramond-Regular','fonts/EBGaramond-var400.ttf'),('EBGaramond-Bold','fonts/EBGaramond-var700.ttf'),('Marcellus-Regular','fonts/Marcellus-Regular.ttf')]:
    tt=TTFont(path); cm=tt.getBestCmap(); rev=collections.defaultdict(set)
    for u,gn in cm.items(): rev[gn].add(u)
    # also GSUB ligatures etc: glyphs with no unicode get name-based guess
    table={}
    for gn in tt.getGlyphOrder():
        s=sig(tt,gn); table.setdefault(s,set()).update(rev.get(gn,set()) or {('name',gn)})
    refs[name]=(tt,table)
    print(name,'ref glyphs',len(tt.getGlyphOrder()))

doc=fitz.open(PDF)
fontmaps={}   # xref -> {gid: unicode-or-str}
stats=collections.Counter()
for xref in sorted({f[0] for p in doc for f in p.get_fonts(full=True)}):
    name,ext,typ,buf=doc.extract_font(xref)
    base=name.split('+')[-1]
    if base not in refs: print('no ref for',name); continue
    rtt,table=refs[base]
    tt=TTFont(io.BytesIO(buf)); m={}
    for gid,gn in enumerate(tt.getGlyphOrder()):
        s=sig(tt,gn)
        cands=table.get(s)
        if not cands:
            # tolerant search: same advance, same point count, sorted point clouds within tolerance
            cands=set()
            if len(s)==3:
                sp=sorted(s[2])
                for k,v in table.items():
                    if len(k)==3 and abs(k[0]-s[0])<0.003 and len(k[2])==len(s[2]):
                        kp=sorted(k[2])
                        if max(max(abs(a[0]-b[0]),abs(a[1]-b[1])) for a,b in zip(kp,sp))<0.006: cands|=v
        if not cands: stats['unmatched']+=1; m[gid]=None
        else:
            stats['matched']+=1
            us=[c for c in cands if isinstance(c,int)]
            if 32 in us: us=[32]
            us=[c for c in us if c>=32 and c not in (0xa0,0xad)] or us
            m[gid]=chr(min(us)) if us else ('name',[c[1] for c in cands if isinstance(c,tuple)][0])
    fontmaps[xref]=(name,m)
print(stats)
json.dump({str(k):v for k,(n,v) in fontmaps.items()},open('glyphmaps.json','w'),ensure_ascii=False)
# show ambiguous/unmatched samples
for xref,(name,m) in list(fontmaps.items())[:3]:
    print(name,{g:v for g,v in m.items() if v is None or isinstance(v,tuple)})
