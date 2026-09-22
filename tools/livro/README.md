# Geração das páginas do livro (`public/livro/`)

Fonte de verdade editável: `book.json` (título, capítulos e blocos: `p`, `h2`, `h3`, `ul`, `ol`, `table`).

Para corrigir texto, edite `book.json` e regenere as páginas, o sitemap, o robots e os `llms*.txt`:

```bash
cd tools/livro && python3 build_book.py ../..
```

Os demais scripts reconstroem `book.json` a partir do PDF original (as fontes embutidas
no PDF têm o mapa de caracteres quebrado, por isso o texto é recuperado comparando os
contornos dos glifos com as fontes EB Garamond / Marcellus originais):

1. `glyphmap.py`  – PDF + fontes originais → `glyphmaps.json`
2. `extract.py`   – linhas com layout → `pages.json`
3. `build_json.py` – blocos semânticos → `book.json`
4. `build_book.py` – `book.json` → HTML/sitemap/robots/llms

Dependências: `pip install pymupdf fonttools`.
