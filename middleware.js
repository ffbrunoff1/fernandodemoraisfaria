// Vercel Routing Middleware: o domínio livrogeotextil.com.br serve apenas o conteúdo de /livro,
// com URLs limpas (www.livrogeotextil.com.br/capitulo-1-... -> /livro/capitulo-1-...).
// Os demais domínios (ex.: *.vercel.app) seguem sem alteração.

const BOOK_HOST = 'www.livrogeotextil.com.br';
const BOOK_HOSTS = new Set([BOOK_HOST, 'livrogeotextil.com.br']);
const BOOK_PREFIX = '/livro';

// Equivalentes a next() e rewrite() de @vercel/functions, sem adicionar dependência.
const next = () => new Response(null, { headers: { 'x-middleware-next': '1' } });
const rewrite = (url) => new Response(null, { headers: { 'x-middleware-rewrite': url.toString() } });

export default function middleware(request) {
  const url = new URL(request.url);
  if (!BOOK_HOSTS.has(url.hostname)) return next();

  // livrogeotextil.com.br -> www.livrogeotextil.com.br
  if (url.hostname !== BOOK_HOST) {
    url.hostname = BOOK_HOST;
    return Response.redirect(url, 308);
  }

  // Links antigos com /livro/... redirecionam para a URL limpa.
  if (url.pathname === BOOK_PREFIX || url.pathname.startsWith(`${BOOK_PREFIX}/`)) {
    url.pathname = url.pathname.slice(BOOK_PREFIX.length) || '/';
    return Response.redirect(url, 308);
  }

  // Todo o resto é servido de dentro de /livro; fora dele nada é acessível por este domínio.
  url.pathname = BOOK_PREFIX + url.pathname;
  return rewrite(url);
}
