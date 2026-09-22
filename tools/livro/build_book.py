#!/usr/bin/env python3
"""Generate static, crawlable HTML pages for the book from book.json.

book.json: {"title","subtitle","author","year","isbn"?, "amazon", "chapters":[{"slug","number","title","part","blocks":[{"t":"h2"|"h3"|"p"|"ul"|"blockquote","x":str|[str]}]}]}
"""
import json, html, re, sys, os, datetime

SITE = "https://fernandodemoraisfaria.vercel.app"
ROOT = sys.argv[1] if len(sys.argv) > 1 else "site"
book = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "book.json")))
TODAY = datetime.date.today().isoformat()
AUTHOR = book["author"]
TITLE = book["title"]
AMAZON = book["amazon"]
LIVRO = f"{SITE}/livro/"

CSS = """
:root{--navy:#0c4a6e;--navy2:#075985;--blue:#0284c7;--ink:#111827;--muted:#4b5563;--line:#e5e7eb;--bg:#ffffff;--soft:#f0f9ff}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.7;font-size:17px}
a{color:var(--blue)}a:hover{color:var(--navy)}
.top{background:linear-gradient(135deg,var(--navy) 0%,var(--navy2) 60%,#0f172a 100%);color:#fff;padding:14px 0}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.top a{color:#fff;text-decoration:none;font-weight:600}.top .brand small{display:block;font-weight:400;font-size:12px;color:#bae6fd}
.top nav a{margin-left:18px;font-weight:500;font-size:15px;color:#e0f2fe}.top nav a:hover{color:#fff}
.wrap{max-width:820px;margin:0 auto;padding:0 20px}
.hero{background:var(--soft);border-bottom:1px solid var(--line);padding:40px 0 32px}
.crumbs{font-size:14px;color:var(--muted);margin:0 0 14px}.crumbs a{color:var(--muted)}.crumbs a:hover{color:var(--navy)}
.part{color:var(--blue);font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin:0 0 8px}
h1{font-family:Merriweather,Georgia,serif;font-weight:700;font-size:clamp(28px,4vw,40px);line-height:1.2;margin:0 0 12px;color:var(--navy)}
.lead{color:var(--muted);font-size:16px;margin:0}
article{padding:36px 0 24px}
article h2{font-family:Merriweather,Georgia,serif;font-size:26px;line-height:1.3;color:var(--navy);margin:44px 0 14px}
article h3{font-family:Merriweather,Georgia,serif;font-size:20px;color:var(--navy2);margin:32px 0 10px}
article p{margin:0 0 18px;text-align:justify;hyphens:auto}
article ul,article ol{margin:0 0 18px;padding-left:24px}article li{margin-bottom:8px}
.tw{overflow-x:auto;margin:0 0 22px}table{border-collapse:collapse;width:100%;font-size:15px;min-width:520px}th,td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}thead th{background:var(--soft);color:var(--navy)}th.grp{background:#e0f2fe;color:var(--navy);font-weight:700}
article blockquote{margin:0 0 18px;padding:12px 20px;border-left:4px solid var(--blue);background:var(--soft);color:var(--muted);font-style:italic}
.toc{list-style:none;padding:0;margin:0}.toc li{border-bottom:1px solid var(--line)}.toc a{display:flex;gap:14px;align-items:baseline;padding:14px 4px;text-decoration:none;color:var(--ink)}
.toc a:hover{background:var(--soft)}.toc .n{color:var(--blue);font-weight:700;min-width:2.2em;font-family:Merriweather,Georgia,serif}.toc .parthead{padding:22px 4px 8px;color:var(--blue);font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border:0}
.pager{display:flex;justify-content:space-between;gap:16px;border-top:1px solid var(--line);padding:24px 0;margin-top:20px;flex-wrap:wrap}
.pager a{text-decoration:none;font-weight:600;max-width:48%}.pager a span{display:block;font-size:12px;color:var(--muted);font-weight:400}
.cta{background:var(--soft);border:1px solid #bae6fd;border-radius:12px;padding:22px;margin:28px 0}
.cta h2{margin:0 0 8px;font-size:20px}.cta p{margin:0 0 14px;color:var(--muted)}
.btn{display:inline-block;background:linear-gradient(90deg,#0ea5e9,#0284c7);color:#fff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:8px}.btn:hover{color:#fff;filter:brightness(1.08)}
footer{background:#0f172a;color:#94a3b8;padding:28px 0;font-size:14px;margin-top:40px}footer a{color:#bae6fd}
.meta{font-size:14px;color:var(--muted);margin:10px 0 0}
@media(max-width:600px){body{font-size:16px}article p{text-align:left}.pager a{max-width:100%}}
"""

HEAD = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="author" content="{author}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<link rel="canonical" href="{url}">
{prevnext}<meta property="og:type" content="{ogtype}">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Fernando de Morais Faria">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
<style>{css}</style>
<script type="application/ld+json">{ld}</script>
</head>
<body>
<header class="top"><div class="wrap">
<a class="brand" href="/">Fernando de Morais Faria<small>Especialista em Geossintéticos e Infraestrutura</small></a>
<nav aria-label="Principal"><a href="/">Início</a><a href="/livro/">Livro online</a><a href="{amazon}" rel="noopener" target="_blank">Comprar na Amazon</a></nav>
</div></header>
"""

FOOT = """
<footer><div class="wrap">
<p>© {year} {author}. Todos os direitos reservados. Texto integral do livro <a href="/livro/"><em>{title}</em></a>, publicado pelo autor para leitura gratuita online. Edição impressa e e-book disponíveis na <a href="{amazon}" rel="noopener" target="_blank">Amazon</a>.</p>
<p><a href="/">Página inicial</a> · <a href="/livro/">Sumário do livro</a> · <a href="/livro/livro-completo/">Livro completo em uma página</a> · <a href="/sitemap.xml">Sitemap</a></p>
</div></footer>
</body>
</html>
"""


def esc(s):
    return html.escape(s, quote=True)


def desc_from(blocks, limit=158):
    text = " ".join(b["x"] for b in blocks if b["t"] == "p")
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= limit:
        return text
    cut = text[:limit]
    cut = cut[: cut.rfind(" ")]
    return cut.rstrip(",;:") + "…"


LEAD = re.compile(r"^([^:.;!?]{2,70}):\s+(?=\S)")

def lead(s):
    """'Label: rest' -> '<strong>Label:</strong> rest' (HTML-escaped)."""
    m = LEAD.match(s)
    if m and len(m.group(1).split()) <= 9:
        return f"<strong>{esc(m.group(1))}:</strong> {esc(s[m.end():])}"
    return esc(s)


def render_blocks(blocks, glossary=False):
    out = []
    for b in blocks:
        t, x = b["t"], b["x"]
        if t == "p":
            out.append(f"<p>{lead(x) if glossary else esc(x)}</p>")
        elif t == "ol":
            out.append("<ol>" + "".join(f"<li>{lead(i)}</li>" for i in x) + "</ol>")
        elif t == "table":
            h = "".join(f"<th>{esc(c)}</th>" for c in x["header"])
            rows = []
            for r in x["rows"]:
                if isinstance(r, dict):
                    rows.append(f'<tr><th colspan="{len(x["header"])}" class="grp">{esc(r["group"])}</th></tr>')
                else:
                    rows.append("<tr>" + "".join(f"<td>{esc(c)}</td>" for c in r) + "</tr>")
            out.append(f'<div class="tw"><table><thead><tr>{h}</tr></thead><tbody>{"".join(rows)}</tbody></table></div>')
        elif t == "h2":
            out.append(f'<h2 id="{slugify(x)}">{esc(x)}</h2>')
        elif t == "h3":
            out.append(f'<h3 id="{slugify(x)}">{esc(x)}</h3>')
        elif t == "ul":
            out.append("<ul>" + "".join(f"<li>{lead(i)}</li>" for i in x) + "</ul>")
        elif t == "blockquote":
            out.append(f"<blockquote>{esc(x)}</blockquote>")
    return "\n".join(out)


def slugify(s):
    import unicodedata
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s[:80]


def person_ld():
    return {"@type": "Person", "name": AUTHOR, "url": SITE + "/", "jobTitle": "Especialista em Geossintéticos e Infraestrutura"}


def book_ld():
    d = {
        "@context": "https://schema.org",
        "@type": "Book",
        "name": TITLE,
        "alternativeName": book.get("subtitle", ""),
        "author": person_ld(),
        "inLanguage": "pt-BR",
        "datePublished": str(book["year"]),
        "url": LIVRO,
        "isAccessibleForFree": True,
        "bookFormat": "https://schema.org/EBook",
        "genre": ["Engenharia civil", "Geotecnia", "Geossintéticos", "Mercado brasileiro"],
        "about": ["geossintéticos", "geotêxtil", "geomembrana", "geogrelha", "infraestrutura", "engenharia geotécnica", "mercado brasileiro"],
        "offers": {"@type": "Offer", "url": AMAZON, "availability": "https://schema.org/InStock"},
        "hasPart": [
            {"@type": "Chapter", "name": c["title"], "position": i + 1, "url": f"{LIVRO}{c['slug']}/"}
            for i, c in enumerate(book["chapters"])
        ],
    }
    if book.get("isbn"):
        d["isbn"] = book["isbn"]
    return d


def chapter_ld(c, i, url):
    return [
        {
            "@context": "https://schema.org",
            "@type": "Chapter",
            "name": c["title"],
            "position": i + 1,
            "url": url,
            "inLanguage": "pt-BR",
            "author": person_ld(),
            "isAccessibleForFree": True,
            "isPartOf": {"@type": "Book", "name": TITLE, "url": LIVRO, "author": person_ld()},
            "headline": c["title"],
            "datePublished": str(book["year"]),
            "dateModified": TODAY,
            "wordCount": sum(len(b["x"].split()) if isinstance(b["x"], str) else (sum(len(i.split()) for i in b["x"]) if isinstance(b["x"], list) else 0) for b in c["blocks"]),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Início", "item": SITE + "/"},
                {"@type": "ListItem", "position": 2, "name": "Livro", "item": LIVRO},
                {"@type": "ListItem", "position": 3, "name": c["title"], "item": url},
            ],
        },
    ]


def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, "w", encoding="utf-8").write(content)


pub = os.path.join(ROOT, "public")
chapters = book["chapters"]
urls = []

# ---- chapter pages
for i, c in enumerate(chapters):
    url = f"{LIVRO}{c['slug']}/"
    urls.append(url)
    prev = chapters[i - 1] if i > 0 else None
    nxt = chapters[i + 1] if i + 1 < len(chapters) else None
    prevnext = ""
    if prev:
        prevnext += f'<link rel="prev" href="{LIVRO}{prev["slug"]}/">\n'
    if nxt:
        prevnext += f'<link rel="next" href="{LIVRO}{nxt["slug"]}/">\n'
    desc = desc_from(c["blocks"])
    page_title = f"{c['title']} | {TITLE}"
    head = HEAD.format(title=esc(page_title), desc=esc(desc), author=esc(AUTHOR), url=url, prevnext=prevnext,
                       ogtype="article", css=CSS, ld=json.dumps(chapter_ld(c, i, url), ensure_ascii=False), amazon=AMAZON)
    label = f"Capítulo {c['number']}" if c.get("number") else ""
    body = f"""
<main>
<div class="hero"><div class="wrap">
<p class="crumbs"><a href="/">Início</a> › <a href="/livro/">Livro</a> › {esc(c['title'])}</p>
<p class="part">{esc(c['part'])}{(' · ' + label) if label else ''}</p>
<h1>{esc(c['title'])}</h1>
<p class="lead">Por {esc(AUTHOR)} · Do livro <em>{esc(TITLE)}</em> ({book['year']})</p>
</div></div>
<div class="wrap">
<article>
{render_blocks(c['blocks'], glossary=c['slug'].startswith('apendice-a'))}
</article>
<nav class="pager" aria-label="Capítulos">
{f'<a href="/livro/{prev["slug"]}/" rel="prev"><span>← Anterior</span>{esc(prev["title"])}</a>' if prev else '<a href="/livro/"><span>←</span>Sumário</a>'}
{f'<a href="/livro/{nxt["slug"]}/" rel="next" style="text-align:right"><span>Próximo →</span>{esc(nxt["title"])}</a>' if nxt else '<a href="/livro/" style="text-align:right"><span>→</span>Voltar ao sumário</a>'}
</nav>
<div class="cta"><h2>Gostou deste capítulo?</h2><p>O livro completo está disponível em versão impressa e e-book. Adquirir a obra apoia a produção de conteúdo técnico independente sobre geossintéticos no Brasil.</p><a class="btn" href="{AMAZON}" rel="noopener" target="_blank">Comprar na Amazon</a></div>
</div>
</main>
"""
    write(os.path.join(pub, "livro", c["slug"], "index.html"), head + body + FOOT.format(year=book["year"], author=esc(AUTHOR), title=esc(TITLE), amazon=AMAZON))

# ---- book index (TOC)
toc = []
last_part = None
for c in chapters:
    if c["part"] != last_part:
        toc.append(f'<li class="parthead">{esc(c["part"])}</li>')
        last_part = c["part"]
    n = f'<span class="n">{c["number"]}.</span>' if c.get("number") else '<span class="n">·</span>'
    toc.append(f'<li><a href="/livro/{c["slug"]}/">{n}<span>{esc(c["title"])}</span></a></li>')
idx_desc = f"Leia online, gratuitamente, o livro {TITLE}, de {AUTHOR}: fundamentos dos geossintéticos, geotêxtil, geomembranas, geogrelhas, estudos de caso, sustentabilidade, mercado brasileiro, fabricantes e normas técnicas."
head = HEAD.format(title=esc(f"{TITLE} | Livro completo online"), desc=esc(idx_desc[:300]), author=esc(AUTHOR), url=LIVRO, prevnext="",
                   ogtype="book", css=CSS, ld=json.dumps(book_ld(), ensure_ascii=False), amazon=AMAZON)
intro = book.get("blurb", [])
body = f"""
<main>
<div class="hero"><div class="wrap">
<p class="crumbs"><a href="/">Início</a> › Livro</p>
<p class="part">Livro · leitura gratuita online</p>
<h1>{esc(TITLE)}</h1>
<p class="lead">{esc(book.get('subtitle',''))}</p>
<p class="meta">Por <a href="/">{esc(AUTHOR)}</a> · {book['year']} · {len(chapters)} seções · <a href="{AMAZON}" rel="noopener" target="_blank">edição impressa e e-book na Amazon</a></p>
</div></div>
<div class="wrap">
<article>
{''.join(f'<p>{esc(p)}</p>' for p in intro)}
<h2 id="sumario">Sumário</h2>
<ul class="toc">
{''.join(toc)}
<li><a href="/livro/livro-completo/"><span class="n">≡</span><span>Livro completo em uma única página</span></a></li>
</ul>
</article>
<div class="cta"><h2>Prefere ler no Kindle ou em papel?</h2><p>A obra completa está disponível na Amazon em formato e-book e impresso.</p><a class="btn" href="{AMAZON}" rel="noopener" target="_blank">Comprar na Amazon</a></div>
</div>
</main>
"""
write(os.path.join(pub, "livro", "index.html"), head + body + FOOT.format(year=book["year"], author=esc(AUTHOR), title=esc(TITLE), amazon=AMAZON))

# ---- full book single page (for AI crawlers / ingestion)
full_url = f"{LIVRO}livro-completo/"
full_ld = book_ld()
full_ld["url"] = full_url
head = HEAD.format(title=esc(f"{TITLE} — texto integral em uma página"), desc=esc(f"Texto integral do livro {TITLE}, de {AUTHOR}, em uma única página: todos os capítulos sobre geossintéticos, geotêxtil e o mercado brasileiro."),
                   author=esc(AUTHOR), url=full_url, prevnext="", ogtype="book", css=CSS, ld=json.dumps(full_ld, ensure_ascii=False), amazon=AMAZON)
parts = []
for c in chapters:
    parts.append(f'<section id="{c["slug"]}"><h2 style="font-size:30px;margin-top:60px">{esc(c["title"])}</h2><p class="part">{esc(c["part"])}</p>' + render_blocks(c["blocks"]).replace("<h2 ", "<h3 ").replace("</h2>", "</h3>") + "</section>")
body = f"""
<main>
<div class="hero"><div class="wrap">
<p class="crumbs"><a href="/">Início</a> › <a href="/livro/">Livro</a> › Texto integral</p>
<h1>{esc(TITLE)}</h1>
<p class="lead">Texto integral em uma única página · Por {esc(AUTHOR)} · {book['year']}</p>
<p class="meta"><a href="/livro/">Ver sumário com um capítulo por página</a></p>
</div></div>
<div class="wrap"><article>
{''.join(parts)}
</article>
<div class="cta"><h2>Apoie o autor</h2><p>Adquira a edição impressa ou e-book na Amazon.</p><a class="btn" href="{AMAZON}" rel="noopener" target="_blank">Comprar na Amazon</a></div>
</div></main>
"""
write(os.path.join(pub, "livro", "livro-completo", "index.html"), head + body + FOOT.format(year=book["year"], author=esc(AUTHOR), title=esc(TITLE), amazon=AMAZON))

# ---- sitemap.xml
sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
def u(loc, pri, freq="monthly"):
    sm.append(f"<url><loc>{loc}</loc><lastmod>{TODAY}</lastmod><changefreq>{freq}</changefreq><priority>{pri}</priority></url>")
u(SITE + "/", "1.0", "weekly")
u(LIVRO, "0.9")
for url in urls:
    u(url, "0.8")
u(full_url, "0.6")
sm.append("</urlset>")
write(os.path.join(pub, "sitemap.xml"), "\n".join(sm) + "\n")

# ---- robots.txt
robots = f"""# Site oficial de {AUTHOR}
# O conteúdo do livro em /livro/ é público e pode ser indexado e utilizado
# por mecanismos de busca e assistentes de IA, com atribuição ao autor.

User-agent: *
Allow: /

# Rastreadores de IA / LLM — acesso explícito
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: OAI-SearchBot
User-agent: ClaudeBot
User-agent: Claude-Web
User-agent: anthropic-ai
User-agent: Google-Extended
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Bytespider
User-agent: CCBot
User-agent: Applebot-Extended
User-agent: Amazonbot
User-agent: meta-externalagent
User-agent: cohere-ai
User-agent: YouBot
User-agent: DuckAssistBot
Allow: /

Sitemap: {SITE}/sitemap.xml
"""
write(os.path.join(pub, "robots.txt"), robots)

# ---- llms.txt / llms-full.txt
llms = [f"# {TITLE}", "", f"> Livro de {AUTHOR} ({book['year']}) sobre geossintéticos (geotêxtil, geomembranas, geogrelhas, geocélulas, geocompostos), suas aplicações em engenharia civil e ambiental e o mercado brasileiro: fabricantes, distribuidores, normas técnicas (ABNT/ISO) e tendências. Texto integral publicado gratuitamente no site oficial do autor.", "",
        f"- Autor: {AUTHOR} — {SITE}/", f"- Sumário do livro: {LIVRO}", f"- Texto integral em uma página: {full_url}", f"- Texto integral em Markdown: {SITE}/llms-full.txt", f"- Comprar (Amazon): {AMAZON}", "", "## Capítulos", ""]
for c in chapters:
    llms.append(f"- [{c['title']}]({LIVRO}{c['slug']}/): {desc_from(c['blocks'], 200)}")
write(os.path.join(pub, "llms.txt"), "\n".join(llms) + "\n")

full = [f"# {TITLE}", "", f"Autor: {AUTHOR}. Ano: {book['year']}. Fonte: {LIVRO}", ""]
for c in chapters:
    full.append(f"\n## {c['title']}\n")
    full.append(f"_{c['part']}_ — {LIVRO}{c['slug']}/\n")
    for b in c["blocks"]:
        if b["t"] == "p":
            full.append(b["x"] + "\n")
        elif b["t"] == "h2":
            full.append(f"### {b['x']}\n")
        elif b["t"] == "h3":
            full.append(f"#### {b['x']}\n")
        elif b["t"] == "ul":
            full.append("\n".join(f"- {i}" for i in b["x"]) + "\n")
        elif b["t"] == "blockquote":
            full.append(f"> {b['x']}\n")
        elif b["t"] == "ol":
            full.append("\n".join(f"{k+1}. {i}" for k, i in enumerate(b["x"])) + "\n")
        elif b["t"] == "table":
            hd = b["x"]["header"]
            full.append("| " + " | ".join(hd) + " |")
            full.append("|" + "---|" * len(hd))
            for r in b["x"]["rows"]:
                if isinstance(r, dict): full.append("| **" + r["group"] + "** |" + " |" * (len(hd) - 1))
                else: full.append("| " + " | ".join(r) + " |")
            full.append("")
write(os.path.join(pub, "llms-full.txt"), "\n".join(full) + "\n")

print(f"ok: {len(chapters)} chapter pages + index + full + sitemap + robots + llms")
