// Confere a tradução de um idioma contra a fonte em português.
//   node .i18n/verificar.js <pasta>        ex.: node .i18n/verificar.js en
// ERRO = precisa corrigir. AVISO = conferir; pode estar certo (nome próprio, por ex.).
const fs = require('fs');
const path = require('path');
const FONTE = path.join(__dirname, 'fonte');
const pasta = process.argv[2];
if (!pasta) { console.log('uso: node .i18n/verificar.js <pasta>'); process.exit(2); }
const DEST = path.join(__dirname, pasta);
const erros = [], avisos = [];
const erro = (arq, msg) => erros.push(`${arq}: ${msg}`);
const aviso = (arq, msg) => avisos.push(`${arq}: ${msg}`);

// Atributos cujo valor é texto para o leitor e, portanto, deve ser traduzido.
const TRADUZIVEIS = ['alt', 'aria-label', 'title', 'placeholder'];
function tags(html) {
  return (html.match(/<\/?[a-zA-Z][^>]*>/g) || []).map(t =>
    t.replace(new RegExp(`\\s(${TRADUZIVEIS.join('|')})="[^"]*"`, 'g'), ` $1=""`).replace(/\s+/g, ' '));
}
function textos(html) {
  return html.split(/<[^>]+>/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
}
const CAMPOS = ['title', 'description', 'keywords', 'corpo'];
function partes(html) {
  const p = {};
  for (const k of CAMPOS) {
    const m = html.match(new RegExp(`<!--${k}-->([\\s\\S]*?)<!--/${k}-->`));
    p[k] = m ? m[1] : null;
  }
  return p;
}
// Palavras que só aparecem em português (checadas como palavra inteira, sem diferenciar caixa).
const PT = ['você', 'não', 'corretora', 'saque', 'também', 'são', 'até', 'depósito', 'conta', 'operações', 'segurança', 'pelo', 'pela', 'cadastro', 'dúvidas'];

const arq = 'inicio.html';
const pf = path.join(DEST, arq);
if (!fs.existsSync(pf)) erro(arq, 'arquivo não existe');
else {
  const orig = partes(fs.readFileSync(path.join(FONTE, arq), 'utf8'));
  const trad = partes(fs.readFileSync(pf, 'utf8'));
  for (const k of CAMPOS) if (trad[k] === null) erro(arq, `marcador <!--${k}--> ausente`);
  if (!Object.values(trad).includes(null)) {
    const t = trad.title.trim(), d = trad.description.trim(), kw = trad.keywords.trim();
    if (!t) erro(arq, 'title vazio');
    if (!d) erro(arq, 'description vazia');
    if (!kw) erro(arq, 'keywords vazio');
    if (!/safirion/i.test(t)) erro(arq, 'title sem "Safirion"');
    if ([...t].length > 70) aviso(arq, `title com ${[...t].length} caracteres (ideal ≤ 60)`);
    if ([...d].length > 170) aviso(arq, `description com ${[...d].length} caracteres (ideal ≤ 155)`);
    if (/["<>]/.test(d) || /["<>]/.test(t) || /["<>]/.test(kw)) erro(arq, 'title/description/keywords não podem ter aspas duplas nem < >');
    if (t === orig.title.trim()) erro(arq, 'title igual ao português (não traduzido)');
    if (d === orig.description.trim()) erro(arq, 'description igual ao português (não traduzida)');

    // estrutura do corpo: mesmas tags, mesmos atributos, na mesma ordem
    const a = tags(orig.corpo), b = tags(trad.corpo);
    if (a.length !== b.length) erro(arq, `corpo com ${b.length} tags; a fonte tem ${a.length}`);
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) {
      if (a[i] !== b[i]) { erro(arq, `tag #${i + 1} diferente:\n      fonte: ${a[i]}\n      aqui : ${b[i]}`); break; }
    }
    // atributos traduzíveis não podem ficar vazios se na fonte não eram
    const attrs = h => (h.match(new RegExp(`\\s(?:${TRADUZIVEIS.join('|')})="([^"]*)"`, 'g')) || []);
    const ao = attrs(orig.corpo), at = attrs(trad.corpo);
    ao.forEach((x, i) => { if (!/=""$/.test(x) && at[i] && /=""$/.test(at[i])) erro(arq, `atributo traduzível ficou vazio: ${at[i]}`); });

    // texto não traduzido
    const to = new Set(textos(orig.corpo).filter(x => x.length > 30));
    for (const x of textos(trad.corpo)) if (to.has(x)) erro(arq, `trecho ainda em português: "${x.slice(0, 80)}"`);
    const corpoTxt = ' ' + textos(trad.corpo).join(' ').toLowerCase() + ' ' + t.toLowerCase() + ' ' + d.toLowerCase() + ' ';
    const achadas = PT.filter(w => new RegExp(`(^|[\\s.,;:!?()«»"'—–-])${w}([\\s.,;:!?()«»"'—–-]|$)`, 'i').test(corpoTxt));
    if (achadas.length) aviso(arq, `palavras que parecem português: ${achadas.join(', ')}`);
    if (/&(?!amp;|lt;|gt;|quot;|#\d+;|#x[0-9a-f]+;|nbsp;)/i.test(trad.corpo)) erro(arq, '"&" solto no corpo: escreva &amp;');

    // marca, título do hero e destinos intocados
    if (!/data-letras>SAFIRION<\/h1>/.test(trad.corpo)) erro(arq, 'o <h1> deve continuar exatamente SAFIRION');
    const links = h => (h.match(/https?:\/\/[^"<\s]+/g) || []).join('|');
    if (links(orig.corpo) !== links(trad.corpo)) erro(arq, 'endereços (links, e-mail, site) alterados');
    const moeda = s => (s.match(/R\$\s?50/g) || []).length;
    if (moeda(trad.corpo) !== moeda(orig.corpo)) erro(arq, 'o valor "R$50" do depósito mínimo deve continuar escrito assim');
  }
}

// textos fixos
const pc = path.join(DEST, '_chrome.json');
if (!fs.existsSync(pc)) erro('_chrome.json', 'arquivo não existe');
else {
  let c;
  try { c = JSON.parse(fs.readFileSync(pc, 'utf8')); } catch (e) { erro('_chrome.json', 'JSON inválido: ' + e.message); }
  if (c) {
    const o = JSON.parse(fs.readFileSync(path.join(FONTE, '_chrome.json'), 'utf8'));
    const tg = s => (s.match(/<\/?[a-z]+>/g) || []).join('');
    (function comparar(x, y, p) {
      for (const k of Object.keys(x)) {
        if (k === '_nota') continue;
        if (y === null || typeof y !== 'object' || !(k in y)) { erro('_chrome.json', `chave ausente: ${p}${k}`); continue; }
        if (typeof x[k] === 'object') { comparar(x[k], y[k], `${p}${k}.`); continue; }
        if (typeof y[k] !== 'string' || !y[k].trim()) { erro('_chrome.json', `valor vazio: ${p}${k}`); continue; }
        if (tg(x[k]) !== tg(y[k])) erro('_chrome.json', `${p}${k}: as tags devem ser as mesmas da fonte (${tg(x[k]) || 'nenhuma'})`);
        if (/RISKFREE10/.test(x[k]) && !/RISKFREE10/.test(y[k])) erro('_chrome.json', `${p}${k} perdeu o código RISKFREE10`);
        if (y[k] === x[k] && x[k].length > 12) erro('_chrome.json', `${p}${k} não traduzido`);
      }
      if (Array.isArray(x) && (!Array.isArray(y) || y.length !== x.length)) erro('_chrome.json', `${p.slice(0, -1)}: precisa ter ${x.length} itens`);
    })(o, c, '');
  }
}

for (const a of avisos) console.log('AVISO ' + a);
for (const e of erros) console.log('ERRO  ' + e);
console.log(`\n${pasta}: ${erros.length} erro(s), ${avisos.length} aviso(s)`);
process.exit(erros.length ? 1 : 0);
