// Monta as versões da home em cada idioma a partir das traduções em .i18n/<pasta>/.
//   node .i18n/montar.js
//   1. Para cada idioma traduzido e aprovado pelo verificar.js: grava /<pasta>/index.html.
//   2. Na home em português: hreflang, seletor de idioma e folha idiomas.css (idempotente).
//   3. sitemap.xml: uma entrada por idioma, com os alternados.
// Idioma sem tradução ou com ERRO no verificador é pulado inteiro (não entra em hreflang
// nem em sitemap). Nada aqui mexe em link de cadastro: os destinos vêm iguais da fonte.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { createHash } = require('crypto');
const RAIZ = path.join(__dirname, '..');
const SITE = 'https://safirion.com.br';
const V_MAIN = 7, V_POPUP = 5, V_IDIOMAS = 1;   // suba quando mexer no arquivo (cache de 7 dias)

const ler = (...p) => fs.readFileSync(path.join(...p), 'utf8');
const idiomas = JSON.parse(ler(__dirname, 'idiomas.json'));
const PT = idiomas[0];
const svgs = JSON.parse(ler(__dirname, 'fonte', '_svg.json'));

const prontos = idiomas.filter(i => {
  if (i === PT) return true;
  if (!fs.existsSync(path.join(__dirname, i.pasta, 'inicio.html'))) { console.log(`pulado ${i.pasta}: sem tradução`); return false; }
  const r = spawnSync(process.execPath, [path.join(__dirname, 'verificar.js'), i.pasta], { encoding: 'utf8' });
  if (r.status !== 0) { console.log(`pulado ${i.pasta}: verificador acusou erro\n${r.stdout.split('\n').filter(l => l.startsWith('ERRO')).join('\n')}`); return false; }
  return true;
});

const caminho = i => '/' + (i.pasta ? i.pasta + '/' : '');
const chrome = i => JSON.parse(ler(__dirname, i === PT ? 'fonte' : i.pasta, '_chrome.json'));
const desfaz = s => s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const escAttr = s => desfaz(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const texto = h => desfaz(h.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
function partes(html) {
  const p = {};
  for (const k of ['title', 'description', 'keywords', 'corpo']) p[k] = html.match(new RegExp(`<!--${k}-->([\\s\\S]*?)<!--/${k}-->`))[1].trim();
  return p;
}
// troca literal: sem regex e sem os "$" especiais do replace (o texto tem "US$ 10" e "R$50")
const troca = (s, de, para) => s.split(de).join(para);

// ---------------------------------------------------------------- blocos comuns
const bandeira = (i, l, a) => `<img src="/assets/img/bandeiras/${i.pasta || 'pt'}.svg" alt="" width="${l}" height="${a}" loading="lazy" decoding="async">`;

function seletor(atual) {
  const itens = prontos.map(i =>
    `<li><a href="${caminho(i)}" hreflang="${i.codigo}" lang="${i.codigo}"${i === atual ? ' aria-current="true"' : ''}>${bandeira(i, 20, 15)}${i.nome}</a></li>`).join('');
  return `<!--idiomas--><details class="lng"><summary aria-label="${escAttr(chrome(atual).idioma_aria)}">${bandeira(atual, 20, 15)}<span>${atual.pasta || 'pt'}</span></summary><ul class="lng__lista">${itens}</ul></details><!--/idiomas-->`;
}
function rodapeIdiomas(atual) {
  const itens = prontos.map(i =>
    `<a href="${caminho(i)}" hreflang="${i.codigo}" lang="${i.codigo}"${i === atual ? ' aria-current="true"' : ''}>${bandeira(i, 20, 15)}${i.nome}</a>`).join('');
  return `<!--idiomas--><nav class="wrap ft__lng" aria-label="${escAttr(chrome(atual).idioma_aria)}">${itens}</nav><!--/idiomas-->`;
}
function comSeletor(html, atual) {
  html = html.replace(/\s*<!--idiomas-->[\s\S]*?<!--\/idiomas-->/g, '');
  if (prontos.length < 2) return html;
  // o rodapé de idiomas entra ACIMA da declaração de independência (bloco .ft__legal),
  // que é onde ela está nos HTML publicados; se um dia não houver declaração, dá erro
  // de propósito: nenhuma página do site pode ir ao ar sem ela.
  const a = '<div class="hdr__side">', b = '<div class="wrap ft__legal">';
  if (!html.includes(a) || !html.includes(b)) throw new Error('não achei onde pôr o seletor de idioma');
  html = troca(html, a, a + '\n      ' + seletor(atual));
  return html.replace(/([ \t]*)<div class="wrap ft__legal">/, (m, e) => `${e}${rodapeIdiomas(atual)}\n\n${m}`);
}
function hreflang() {
  const padrao = prontos.find(i => i.pasta === 'en') || PT;
  const l = prontos.map(i => `<link rel="alternate" hreflang="${i.codigo}" href="${SITE}${caminho(i)}">`);
  l.push(`<link rel="alternate" hreflang="x-default" href="${SITE}${caminho(padrao)}">`);
  return `<!--hreflang-->\n${l.join('\n')}\n<!--/hreflang-->`;
}
function comHreflang(html) {
  html = html.replace(/\s*<!--hreflang-->[\s\S]*?<!--\/hreflang-->/, '').replace(/\n<link rel="alternate" hreflang="[^"]*" href="[^"]*">/g, '');
  return html.replace(/(<link rel="canonical" href="[^"]*">)/, (m, a) => a + '\n' + hreflang());
}
// Versão de imagem, ícone e fonte: md5[:8] do CONTEÚDO do arquivo, calculado aqui.
// Arquivo que muda de conteúdo tem de mudar de endereço, senão quem já visitou
// continua vendo o antigo (cache de 1 ano nos assets). A conta mora no gerador de
// propósito: se morasse num script de fora, toda montagem publicaria mídia sem
// `?v=` e a correção se perderia na montagem seguinte.
const MIDIA = /\.(?:woff2?|ttf|otf|png|jpe?g|webp|svg|ico|gif|avif|mp4|webm)$/i;
const _cacheV = new Map();
function versaoDoArquivo(url) {
  let caminho = url.split(/[?#]/)[0];
  if (caminho.startsWith(SITE)) caminho = caminho.slice(SITE.length);   // og:image vem absoluto
  if (!caminho.startsWith('/') || caminho.startsWith('//')) return null;  // externo ou relativo: não é nosso
  if (!MIDIA.test(caminho)) return null;
  if (_cacheV.has(caminho)) return _cacheV.get(caminho);
  let v = null;
  try { v = createHash('md5').update(fs.readFileSync(path.join(RAIZ, caminho.slice(1)))).digest('hex').slice(0, 8); } catch {}
  _cacheV.set(caminho, v);
  return v;
}
function comVersaoDeMidia(html) {
  const trocar = (url) => {
    const v = versaoDoArquivo(url);
    return v ? url.split(/[?#]/)[0] + '?v=' + v : url;
  };
  return html
    .replace(/(\s(?:src|href|content|poster|data-src)=")([^"]+)(")/g, (m, a, u, z) => a + trocar(u) + z)
    .replace(/(\ssrcset=")([^"]+)(")/g, (m, a, lista, z) => a + lista.split(',').map(it => {
      const p = it.trim().split(/\s+/);
      if (p[0]) p[0] = trocar(p[0]);
      return p.join(' ');
    }).join(', ') + z)
    .replace(/url\(\s*(["']?)([^"')\s]+)\1\s*\)/g, (m, q, u) => `url(${q}${trocar(u)}${q})`);
}
function comVersoes(html) {
  if (!html.includes('idiomas.css')) html = html.replace(/(<link rel="stylesheet" href="\/?assets\/css\/popup-promo\.css\?v=\d+">)/, (m, a) => `${a}\n<link rel="stylesheet" href="/assets/css/idiomas.css?v=${V_IDIOMAS}">`);
  return comVersaoDeMidia(html
    .replace(/idiomas\.css\?v=\d+/, `idiomas.css?v=${V_IDIOMAS}`)
    .replace(/main\.js\?v=\d+/, `main.js?v=${V_MAIN}`)
    .replace(/popup-promo\.js\?v=\d+/, `popup-promo.js?v=${V_POPUP}`));
}

// ---------------------------------------------------------------- home em português
let pt = ler(RAIZ, 'index.html');
pt = comVersoes(comSeletor(comHreflang(pt), PT));
fs.writeFileSync(path.join(RAIZ, 'index.html'), pt);

// ---------------------------------------------------------------- cada idioma
const molde = pt.replace(/\s*<!--idiomas-->[\s\S]*?<!--\/idiomas-->/g, '');
const cabeca = molde.slice(0, molde.indexOf('</head>'));
const ptT = cabeca.match(/<title>([^<]*)<\/title>/)[1];
const ptD = cabeca.match(/<meta name="description" content="([^"]*)">/)[1];
const ptK = cabeca.match(/<meta name="keywords" content="([^"]*)">/)[1];
const ptC = chrome(PT);
const ldRe = /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/;

function dados(ld, i, t, C, corpo) {
  const U = SITE + caminho(i);
  const d = desfaz(t.description), tit = desfaz(t.title);
  const tipo = n => ld['@graph'].find(x => [].concat(x['@type']).includes(n));
  const org = tipo('Organization'); org.description = d; org.slogan = C.slogan; delete org.areaServed;
  const site = tipo('WebSite'); site.description = d;
  const pag = tipo('WebPage'); Object.assign(pag, { '@id': U + '#webpage', url: U, name: tit, description: d, inLanguage: i.codigo });
  const mig = tipo('BreadcrumbList'); mig['@id'] = U + '#breadcrumb'; Object.assign(mig.itemListElement[0], { name: C.inicio, item: U });
  const lis = [...corpo.match(/<ol class="steps">([\s\S]*?)<\/ol>/)[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => texto(m[1]));
  const como = tipo('HowTo');
  Object.assign(como, {
    '@id': U + '#howto', inLanguage: i.codigo,
    name: texto(corpo.match(/<h3 class="h3" style="margin-top:30px">([\s\S]*?)<\/h3>/)[1]).replace(/\s*[:：]$/, ''),
    description: texto(corpo.match(/id="cc-titulo">[\s\S]*?<\/h2>\s*<p>([\s\S]*?)<\/p>/)[1]),
    step: lis.map((x, k) => ({ '@type': 'HowToStep', position: k + 1, name: C.passos[k], text: x })),
  });
  if (lis.length !== C.passos.length) throw new Error(`${i.pasta}: ${lis.length} passos no corpo, ${C.passos.length} no _chrome.json`);
  const perg = [...corpo.matchAll(/<span class="faq__n">\d+<\/span>([\s\S]*?)<span class="faq__ic"/g)].map(m => texto(m[1]));
  const resp = [...corpo.matchAll(/<div class="faq__a">([\s\S]*?)<\/div>/g)].map(m => texto(m[1]));
  const faq = tipo('FAQPage');
  Object.assign(faq, { '@id': U + '#faq', inLanguage: i.codigo,
    mainEntity: perg.map((q, k) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: resp[k] } })) });
  return ld;
}

for (const i of prontos) {
  if (i === PT) continue;
  const t = partes(ler(__dirname, i.pasta, 'inicio.html'));
  const C = chrome(i);
  const U = SITE + caminho(i);

  let corpo = t.corpo.replace(/<i data-svg="(\d+)"><\/i>/g, (m, n) => svgs[n - 1]);
  const msgs = JSON.stringify(C.ticker).replace(/&/g, '&amp;').replace(/'/g, '&#39;');
  corpo = troca(corpo, 'data-msgs=""></span>', `data-msgs='${msgs}'>${C.ticker[0]}</span>`);
  const fileira = corpo.match(/<div class="marquee__row">([\s\S]*?)<\/div>/)[1];
  corpo = troca(corpo, '<div class="marquee__row"></div>', `<div class="marquee__row">${fileira}</div>`);
  corpo = corpo.replace(/(src|href)="assets\//g, '$1="/assets/').replace(/href="\/"/g, () => `href="${caminho(i)}"`);

  let h = cabeca.replace(/<html lang="[^"]*"[^>]*>/, `<html lang="${i.codigo}" dir="${i.dir}">`);
  h = h.replace(ldRe, (m, a, json, z) => `${a}\n${JSON.stringify(dados(JSON.parse(json), i, t, C, corpo), null, 2).replace(/</g, '\\u003c')}\n${z}`);
  const fora = h.split(ldRe);   // [antes, <script>, json, </script>, depois]: só troca texto fora do JSON
  for (const k of [0, 4]) {
    let s = fora[k];
    s = troca(s, `<title>${ptT}</title>`, `<title>${escAttr(t.title)}</title>`);
    s = troca(s, `content="${ptT}"`, `content="${escAttr(t.title)}"`);
    s = troca(s, `content="${ptD}"`, `content="${escAttr(t.description)}"`);
    s = troca(s, `content="${ptK}"`, `content="${escAttr(t.keywords)}"`);
    s = troca(s, `content="${ptC.og_alt}"`, `content="${escAttr(C.og_alt)}"`);
    s = troca(s, 'property="og:locale" content="pt_BR"', `property="og:locale" content="${i.og}"`);
    s = troca(s, `<link rel="canonical" href="${SITE}/">`, `<link rel="canonical" href="${U}">`);
    s = troca(s, `property="og:url" content="${SITE}/"`, `property="og:url" content="${U}"`);
    s = s.replace(/href="(assets\/|site\.webmanifest)/g, 'href="/$1');
    fora[k] = s;
  }
  h = fora.join('');
  for (const [nome, re] of [['title', /<title>([^<]*)/], ['canonical', /rel="canonical" href="([^"]*)/], ['og:locale', /og:locale" content="([^"]*)/]])
    if (h.match(re)[1] === cabeca.match(re)[1]) throw new Error(`${i.pasta}: ${nome} ficou igual ao português`);

  const popup = JSON.stringify(C.popup).replace(/</g, '\\u003c');
  let html = `${h}</head>\n<body>\n\n${corpo}\n\n<script>window.safirionPromoTxt=${popup};</script>\n<script src="/assets/js/main.js?v=${V_MAIN}" defer></script>\n<script src="/assets/js/popup-promo.js?v=${V_POPUP}" defer></script>\n</body>\n</html>\n`;
  // o corpo traduzido vem da fonte sem versão nas mídias: cada idioma passa pelo
  // mesmo comVersoes do português, senão só a home em pt sai com `?v=`
  html = comVersoes(comSeletor(html, i));
  fs.mkdirSync(path.join(RAIZ, i.pasta), { recursive: true });
  fs.writeFileSync(path.join(RAIZ, i.pasta, 'index.html'), html);
}

// ---------------------------------------------------------------- sitemap
const hoje = new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);   // dia em São Paulo, não em UTC
const padrao = prontos.find(i => i.pasta === 'en') || PT;
const alt = [...prontos.map(i => [i.codigo, i]), ['x-default', padrao]]
  .map(([c, i]) => `    <xhtml:link rel="alternate" hreflang="${c}" href="${SITE}${caminho(i)}"/>`).join('\n');
const entradas = prontos.map(i => `  <url>
    <loc>${SITE}${caminho(i)}</loc>
    <lastmod>${hoje}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${i === PT ? '1.0' : '0.9'}</priority>
${alt}
  </url>`).join('\n\n');
let mapa = ler(RAIZ, 'sitemap.xml');
mapa = mapa.replace(/<urlset[^>]*>/, '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">');
if (mapa.includes('<!--idiomas-->')) mapa = mapa.replace(/<!--idiomas-->[\s\S]*?<!--\/idiomas-->/, () => `<!--idiomas-->\n${entradas}\n  <!--/idiomas-->`);
else mapa = mapa.replace(new RegExp(`<url>\\s*<loc>${SITE}/</loc>[\\s\\S]*?</url>`), () => `<!--idiomas-->\n${entradas}\n  <!--/idiomas-->`);
fs.writeFileSync(path.join(RAIZ, 'sitemap.xml'), mapa);

console.log(`montado: ${prontos.length} idioma(s) — ${prontos.map(i => i.pasta || 'pt').join(' ')}`);
