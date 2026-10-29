// Confere a tradução de um idioma contra a fonte em português.
//   node .i18n/verificar.js <pasta>        ex.: node .i18n/verificar.js en
// ERRO = precisa corrigir. AVISO = conferir; pode estar certo (nome próprio, por ex.).
const fs = require('fs');
const path = require('path');
const FONTE = path.join(__dirname, 'fonte');
const pasta = process.argv[2];
if (!pasta) { console.log('uso: node .i18n/verificar.js <pasta|--site>'); process.exit(2); }
// --site: o portão de conformidade dos HTML PUBLICADOS (a função está no fim do arquivo)
if (pasta === '--site') process.exit(portaoDoSite(path.join(__dirname, '..')));
const DEST = path.join(__dirname, pasta);
const erros = [], avisos = [];
const erro = (arq, msg) => erros.push(`${arq}: ${msg}`);
const aviso = (arq, msg) => avisos.push(`${arq}: ${msg}`);

// Atributos cujo valor é texto para o leitor e, portanto, deve ser traduzido.
const TRADUZIVEIS = ['alt', 'aria-label', 'title', 'placeholder'];
// O link de cadastro carrega o idioma do corretor e o afftrack da pasta: isso é POR
// IDIOMA, não coisa que o tradutor mexeu. Normaliza os dois antes de comparar, para a
// checagem de destinos continuar pegando qualquer OUTRA alteração de endereço.
const normLink = s => s
  .replace(/(trade\.safirion\.com)\/[a-z-]{2,3}\/register/g, '$1/<lng>/register')
  .replace(/(afftrack=safirion\.com\.br)\/(?:[a-z-]{2,3}\/)?/g, '$1/<lng>/');
function tags(html) {
  return (html.match(/<\/?[a-zA-Z][^>]*>/g) || []).map(t =>
    normLink(t.replace(new RegExp(`\\s(${TRADUZIVEIS.join('|')})="[^"]*"`, 'g'), ` $1=""`).replace(/\s+/g, ' ')));
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
    // nome de marca não se traduz. "Broker" entrou no h1 em 29/10/2026 para pegar quem
    // busca "safirion broker" (pedido do Márcio); o valor é o do português, sem tradução.
    if (!/data-letras>SAFIRION BROKER<\/h1>/.test(trad.corpo)) erro(arq, 'o <h1> deve continuar exatamente SAFIRION BROKER');
    const links = h => (h.match(/https?:\/\/[^"<\s]+/g) || []).map(normLink).join('|');
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

// ============================================================ portão do site
// Roda sobre os HTML PUBLICADOS (raiz e subpastas), não sobre a fonte:
//   node .i18n/verificar.js --site
// Este site é de DIVULGAÇÃO: não é a corretora e não pode se apresentar como ela.
// Sai 1 e diz qual arquivo falhou quando alguma página:
//   1. traz "publisher" no JSON-LD (quem publica não é a Safirion);
//   2. está sem a declaração de independência (classe aviso-indep);
//   3. se declara o site OFICIAL da Safirion ("oficial" na mesma frase que
//      safirion.com.br, em qualquer um dos 17 idiomas);
//   4. afirma regulação ("regulada", "autorizada", "licenciada", "legal no país").
// Duas coisas NÃO são defeito:
//   · a própria declaração de independência, que diz "não é o site oficial da
//     Safirion" nos 17 idiomas — ela sai do texto antes das regras 3 e 4, e é por
//     isso que ela TEM de vir em <p class="aviso-indep">: a mesma frase num <p>
//     comum reprova, de propósito (frase solta sobre "oficial" é defeito);
//   · a NEGAÇÃO das palavras de regulação, que existe de propósito ("a Safirion
//     não possui autorização da CVM") — a negativa conta só ANTES do termo.

// Tudo mora DENTRO da função: ela é chamada na linha 10, antes de qualquer `const`
// do fim do arquivo existir (hoisting vale para `function`, não para `const`).
function portaoDoSite(raiz) {
  // "oficial" no idioma de cada pasta publicada — medido no texto das 17 páginas,
  // nunca traduzido de cabeça. Raiz/es: oficial · en: official · fr: officiel ·
  // de: offizielle · it: ufficiale · fil: opisyal · id: resmi · tr: resmî ·
  // ru: официальный · sv: officiella · hi: आधिकारिक · bn: অফিসিয়াল/অফিশিয়াল ·
  // th: ทางการ · vi: chính thức · zh: 官方 · ar: الرسمي
  const OFICIAL = ['oficial', 'official', 'officiel', 'offiziell', 'ufficial', 'opisyal',
    'resmi', 'resmî', 'officiell', 'официальн', 'आधिकारिक', 'অফিসিয়াল', 'অফিশিয়াল',
    'ทางการ', 'chính thức', '官方', 'الرسمي'];
  const REGULACAO = ['regulad', 'regulated', 'autoriza', 'authoriz', 'authoris',
    'licenciad', 'licensed', 'licenc', 'legal no país', 'legal no pais'];
  const NEGACAO = ['não', 'nao', 'nem', 'sem', 'nenhum', 'not', 'no', 'never', 'without',
    'nicht', 'kein', 'keine', 'pas', 'non', 'ingen', 'inte', 'değil', 'не', 'tidak',
    'bukan', 'hindi', 'ไม่', '不', '并非', '没有', 'नहीं', 'নয়', 'না', 'ليس', 'لا', 'không'];

  // marca o domínio antes de cortar as frases: o ponto de "safirion.com.br" não é fim de frase
  const DOMINIO = '\u0001dominio\u0001';
  // A classe vem no MEIO da lista de classes, não sozinha: nas duas páginas herdadas
  // do blog o parágrafo é
  //   <p class="elementor-heading-title elementor-size-default aviso-indep">
  // e procurar `class="aviso-indep"` literal reprovava as duas, que estavam certas.
  // Seletor de classe casa a classe entre as outras — nunca o atributo inteiro.
  const CLASSE_AVISO = 'class="(?:[^"]*\\s)?aviso-indep(?:\\s[^"]*)?"';
  const SEM_ESPACO = /[฀-๿　-〿㐀-鿿]/;   // tailandês e CJK não separam palavra
  const esc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // raiz: casa o começo da palavra e deixa a flexão livre ("regulad" pega "regulada",
  // "regulado"; "официальн" pega "официальный"). É assim que OFICIAL e REGULACAO
  // estão escritos — raiz, não palavra inteira.
  const posRaiz = (frase, termo) => {
    if (SEM_ESPACO.test(termo)) return frase.indexOf(termo);
    const m = new RegExp(`(?<!\\p{L})${esc(termo)}`, 'iu').exec(frase);
    return m ? m.index : -1;
  };
  const temRaiz = (frase, termo) => posRaiz(frase, termo) >= 0;
  // negação é palavra INTEIRA: "no" como raiz casaria "nome", "nota", "nosso"
  const temPalavra = (frase, termo) => SEM_ESPACO.test(termo)
    ? frase.includes(termo)
    : new RegExp(`(?<!\\p{L})${esc(termo)}(?!\\p{L})`, 'iu').test(frase);

  const ent = s => s
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0*39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(+d))
    .replace(/&amp;/g, '&');

  // os blocos de JSON-LD, como texto e como valores de string
  const blocosLd = h => [...h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  function valoresLd(h) {
    const v = [];
    for (const bruto of blocosLd(h)) {
      let j; try { j = JSON.parse(bruto); } catch { v.push(bruto); continue; }
      (function anda(x) {
        if (typeof x === 'string') v.push(x);
        else if (Array.isArray(x)) x.forEach(anda);
        else if (x && typeof x === 'object') Object.values(x).forEach(anda);
      })(j);
    }
    return v;
  }
  // o texto que a pessoa lê, sem script, sem estilo e sem a declaração de independência
  const textoVisivel = h => ent(h
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(RegExp(`<p[^>]*${CLASSE_AVISO}[^>]*>[\\s\\S]*?</p>`, 'g'), ' ')
    .replace(/<[^>]+>/g, ' '));
  // corta em fim de frase, NUNCA em dois-pontos: era justo com dois-pontos que a
  // frase retirada hoje se apresentava ("o site oficial da Safirion: safirion.com.br")
  const frases = t => t.split('safirion.com.br').join(DOMINIO)
    .split(/[.!?\n]+|[。！？۔؟।]+/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);

  function arquivos(dir, achados = []) {
    const fora = new Set(['.git', '.i18n', 'node_modules', 'assets', 'cdn-cgi']);
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (fora.has(e.name)) continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) arquivos(p, achados);
      else if (e.name.endsWith('.html')) achados.push(p);
    }
    return achados;
  }

  const lista = arquivos(raiz).sort();
  const falhas = [];
  for (const abs of lista) {
    const arq = path.relative(raiz, abs);
    const html = fs.readFileSync(abs, 'utf8');
    const falha = m => falhas.push(`${arq}: ${m}`);

    // 1. publisher no JSON-LD
    for (const bruto of blocosLd(html))
      if (/"publisher"/.test(bruto)) { falha('JSON-LD traz "publisher" (este site não publica a Safirion)'); break; }

    // 2. declaração de independência — exigida em toda página com rodapé
    //    (o /embed/ é um desvio 301 de 5 linhas, sem <footer> e sem texto: fica fora)
    if (/<footer/i.test(html) && !RegExp(CLASSE_AVISO).test(html))
      falha('sem a declaração de independência (classe aviso-indep)');

    // 3 e 4 valem no texto visível E nos valores do JSON-LD
    const unidades = [...frases(textoVisivel(html)), ...valoresLd(html).flatMap(v => frases(ent(v)))];
    for (const f of unidades) {
      if (f.includes(DOMINIO)) {
        const o = OFICIAL.find(t => temRaiz(f, t));
        if (o) { falha(`frase diz "${o}" junto com safirion.com.br: "${f.split(DOMINIO).join('safirion.com.br').slice(0, 110)}"`); break; }
      }
    }
    for (const f of unidades) {
      // a negação conta só ANTES do termo: "não possui autorização" nega mesmo;
      // já em "regulada e autorizada no Brasil" o "no" é preposição do português,
      // não a negativa do inglês — vale a ordem das palavras, não a presença
      let r = null;
      for (const t of REGULACAO) {
        const i = posRaiz(f, t);
        if (i < 0 || NEGACAO.some(n => temPalavra(f.slice(0, i), n))) continue;
        r = t; break;
      }
      if (r) {
        falha(`afirma regulação ("${r}", sem negação antes): "${f.split(DOMINIO).join('safirion.com.br').slice(0, 110)}"`);
        break;
      }
    }
  }

  for (const f of falhas) console.log('ERRO  ' + f);
  console.log(`\nportão do site: ${lista.length} HTML conferido(s), ${falhas.length} falha(s)`);
  return falhas.length ? 1 : 0;
}
