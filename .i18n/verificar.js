// Confere a tradução de um idioma contra a fonte em português.
//   node .i18n/verificar.js <pasta>        ex.: node .i18n/verificar.js en
// ERRO = precisa corrigir. AVISO = conferir; pode estar certo (nome próprio, por ex.).
const fs = require('fs');
const path = require('path');
const FONTE = path.join(__dirname, 'fonte');
const pasta = process.argv[2];
if (!pasta) { console.log('uso: node .i18n/verificar.js <pasta|--site>'); process.exit(2); }
// --site: o portão de conformidade dos HTML PUBLICADOS (a função está no fim do arquivo)
// --site <pasta>: a mesma conferência sobre outra raiz (é por aí que o verificar.casos.mjs prova as regras)
if (pasta === '--site') process.exit(portaoDoSite(process.argv[3] ? path.resolve(process.argv[3]) : path.join(__dirname, '..')));
const DEST = path.join(__dirname, pasta);
const erros = [], avisos = [];
const erro = (arq, msg) => erros.push(`${arq}: ${msg}`);
const aviso = (arq, msg) => avisos.push(`${arq}: ${msg}`);

// Atributos cujo valor é texto para o leitor e, portanto, deve ser traduzido.
const TRADUZIVEIS = ['alt', 'aria-label', 'title', 'placeholder', 'data-mais', 'data-menos'];
// O link de cadastro e o de login carregam o idioma do corretor e o afftrack/aff_track da pasta: isso é POR
// IDIOMA, não coisa que o tradutor mexeu. Normaliza os dois antes de comparar, para a
// checagem de destinos continuar pegando qualquer OUTRA alteração de endereço.
const normLink = s => s
  .replace(/(trade\.safirion\.com)\/[a-z-]{2,3}\/register/g, '$1/<lng>/register')
  .replace(/(aff_?track=safirion\.com\.br)\/(?:[a-z-]{2,3}\/)?/g, '$1/<lng>/');
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
//   2. (APOSENTADA em 23/11/2026) exigia a declaração de independência no rodapé
//      (classe aviso-indep). O cliente pediu para TIRAR esse aviso do site todo
//      ("e tira isso", 23/11/2026, 22:06), então ele não é mais exigido. As regras
//      1, 3 e 4 continuam: o site segue sem se declarar oficial e sem afirmar regulação.
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
// 25/11/2026, regra 4 com precisão (4 falsos positivos no blog, nenhum afirmava regulação):
//   · "regulad" casava "regulador declarado" (o ÓRGÃO, não a empresa regulada): a palavra
//     inteira que começa por "regulador" não conta;
//   · frase em que quem age é o REGULADOR ("Quem cadastra e autoriza intermediários no Brasil
//     é a CVM", "A CVM cadastra ou concede autorização aos participantes") descreve o papel do
//     órgão: não conta quando nomeia um órgão, NÃO nomeia a corretora (Safirion, corretora,
//     broker, plataforma, safirion.com.br) e o termo NÃO é particípio. "A Safirion é regulada
//     pela CVM", "a corretora é autorizada", "Safirion is regulated by", "A CVM autoriza a
//     Safirion" e "a Safirion possui autorização da CVM" continuam reprovando;
//   · título de documento citado como FONTE (o texto do link dentro de .pg-fonte/.pg-fontes,
//     ex. "Nevis FSRC — Regulated Entities") é o nome do papel de outro, não frase da página;
//     o que a página escreve em volta do link ("Fonte: …, lido em …") continua conferido.
//   · a frase acaba também onde acaba o bloco (<p>, <li>, <tr>, tabela, lista, <details>):
//     antes a linha de uma tabela, a nota de fonte e o parágrafo seguinte viravam UMA frase,
//     e o "oficial" de "este endereço não é o canal oficial" casava com o safirion.com.br da
//     célula de cima. Célula com célula (<td>) e título com texto continuam juntos: "Site
//     oficial | safirion.com.br" numa linha de tabela segue reprovando (verificar.casos.mjs).

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
  // `pular(chave, pai, valor)` deixa a regra 4 fora de um campo (ver `naoAfirmaNoLd`)
  function valoresLd(h, pular = () => false) {
    const v = [];
    for (const bruto of blocosLd(h)) {
      let j; try { j = JSON.parse(bruto); } catch { v.push(bruto); continue; }
      (function anda(x, chave, pai) {
        if (typeof x === 'string') { if (!pular(chave, pai, x)) v.push(x); }
        else if (Array.isArray(x)) x.forEach(y => anda(y, chave, pai));
        else if (x && typeof x === 'object') Object.entries(x).forEach(([k, y]) => anda(y, k, x));
      })(j);
    }
    return v;
  }
  // Regra 4, 25/11/2026: no JSON-LD não afirmam (1) `keywords`, que é a lista do que as pessoas
  // BUSCAM ("safirion é regulada" é a busca de quem desconfia, como o <meta name="keywords">,
  // que a regra já não lia) e (2) o `name` de uma Question que termina em "?": a pergunta do FAQ
  // é UMA pergunta mesmo com ponto no meio ("Vi um site dizendo que a Safirion é regulada. Quem
  // está certo?"), e cortada no ponto a primeira metade virava afirmação.
  const PERGUNTA_NO_FIM = /[?？؟]\s*$/;
  const naoAfirmaNoLd = (chave, pai, valor) => chave === 'keywords' ||
    (chave === 'name' && pai && pai['@type'] === 'Question' && PERGUNTA_NO_FIM.test(valor));
  // o mesmo no texto visível: <summary> que termina em "?" é a pergunta do FAQ, inteira
  const semPerguntaDeFaq = h => h.replace(/<summary\b[^>]*>([\s\S]*?)<\/summary>/gi,
    (m, c) => PERGUNTA_NO_FIM.test(c.replace(/<[^>]+>/g, '').trim()) ? '\n' : m);
  // o texto que a pessoa lê, sem script, sem estilo e sem a declaração de independência
  // Abrir ou fechar bloco vira quebra de linha, que o `pedacos` trata como fim de frase (25/11/2026).
  // `\b` depois do nome: <p\b não casa <path, <li\b não casa <link.
  const FIM_DE_BLOCO = /<\/?(?:p|li|tr|table|ul|ol|blockquote|details)\b[^>]*>/gi;
  const textoVisivel = h => ent(h
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(RegExp(`<p[^>]*${CLASSE_AVISO}[^>]*>[\\s\\S]*?</p>`, 'g'), ' ')
    .replace(FIM_DE_BLOCO, '\n')
    .replace(/<[^>]+>/g, ' '));
  // Só para a regra 4: a nota de fonte (.pg-fonte) e a lista de fontes (.pg-fontes) CITAM o documento
  // de outro. Saem do texto corrido e são conferidas à parte, já sem o texto do link (o título do
  // documento citado); o que a página escreve em volta ("Fonte: …, lida em …") continua conferido.
  const NOTA_DE_FONTE = /<(span|ul|ol|li|p|div)\b[^>]*class="(?:[^"]*\s)?pg-fontes?(?:\s[^"]*)?"[^>]*>[\s\S]*?<\/\1>/gi;
  const semNotasDeFonte = h => h.replace(NOTA_DE_FONTE, '\n');
  const notasDeFonte = h => (h.match(NOTA_DE_FONTE) || []).map(m => m.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, ' ')).join('\n');
  // órgãos reguladores: a sigla casa com a caixa exata (SEC, não "sec"); o nome por extenso, sem caixa
  const ORGAO_SIGLA = /(?<!\p{L})(?:CVM|CNV|CMF|SMV|SFC|CNBV|SEC|FCA|CySEC|ASIC|FSRC|IFSC|FSC|FSA|VFSC|FINRA|CFTC|NFA|BaFin|CONSOB|AMF|CNMV|Bacen|SUSEP)(?!\p{L})/u;
  const ORGAO_NOME = /banco central|comiss[ãa]o de valores|superintendencia financiera|comisi[oó]n (?:nacional|para el mercado)|regulatory (?:commission|authority)|financial services (?:commission|authority)/i;
  const nomeiaOrgao = f => ORGAO_SIGLA.test(f) || ORGAO_NOME.test(f);
  const MARCA = /safirion|corretora|corredora|broker|thunder flash|plataforma|platform/i;
  const palavraEm = (f, i) => (f.slice(i).match(/^[\p{L}]+/u) || [''])[0];
  const ehParticipio = p => /(?:ad[oa]s?|ed)$/i.test(p);   // regulada, autorizado, regulated, licensed
  // a frase descreve o papel do ÓRGÃO: nomeia um regulador e não nomeia a corretora nem este domínio
  const orgaoAge = f => nomeiaOrgao(f) && !MARCA.test(f) && !f.includes(DOMINIO);
  // negação logo DEPOIS do substantivo, na oração que o completa: "autorização que não tem",
  // "licencia que no tiene" (o sinal de golpe na tabela da página safirion-e-golpe-ou-nao)
  // termo DENTRO de aspas é menção, não afirmação: a página cita a frase que circula para
  // desmentir ("Regulada internacionalmente." Não é categoria…). A mesma frase sem aspas reprova.
  const entreAspas = (f, i) => {
    const a = f.slice(0, i);
    return (a.match(/"/g) || []).length % 2 === 1 || a.lastIndexOf('“') > a.lastIndexOf('”') ||
      a.lastIndexOf('«') > a.lastIndexOf('»');
  };
  const negadoDepois = (f, i) => /^\p{L}+\s+que\s+(?:n[ãa]o|no)\s+(?:tem|têm|possui|possuem|tiene|tienen|existe)(?!\p{L})/iu.test(f.slice(i));
  const ocorrencias = (frase, termo) => SEM_ESPACO.test(termo)
    ? [...frase.matchAll(new RegExp(esc(termo), 'g'))].map(m => m.index)
    : [...frase.matchAll(new RegExp(`(?<!\\p{L})${esc(termo)}`, 'giu'))].map(m => m.index);
  // corta em fim de frase, NUNCA em dois-pontos: era justo com dois-pontos que a
  // frase retirada hoje se apresentava ("o site oficial da Safirion: safirion.com.br")
  // 24/11/2026: cada pedaço guarda se terminava em ponto de interrogação. PERGUNTA não afirma: o FAQ pergunta
  // "A Safirion é regulada pela CVM?" e responde "Não há registro…"; antes a pergunta virava a frase
  // "A Safirion é regulada pela CVM" e reprovava como afirmação de regulação (em pt, en, es e fil).
  const pedacos = t => (t.split('safirion.com.br').join(DOMINIO).match(/[^.!?\n。！？۔؟।]+[.!?\n。！？۔؟।]*/g) || [])
    .map(s => { const fim = (s.match(/[.!?\n。！？۔؟।]*$/) || [''])[0];
      return { f: s.slice(0, s.length - fim.length).replace(/\s+/g, ' ').trim(), pergunta: /[?？؟]/.test(fim) }; })
    .filter(x => x.f);
  const frases = t => pedacos(t).map(x => x.f);

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

    // 2. aposentada em 23/11/2026 (pedido do cliente: o aviso de independência saiu do rodapé)

    // 3 e 4 valem no texto visível E nos valores do JSON-LD
    const unidades = [...frases(textoVisivel(html)), ...valoresLd(html).flatMap(v => frases(ent(v)))];
    for (const f of unidades) {
      if (f.includes(DOMINIO)) {
        const o = OFICIAL.find(t => temRaiz(f, t));
        if (o) { falha(`frase diz "${o}" junto com safirion.com.br: "${f.split(DOMINIO).join('safirion.com.br').slice(0, 110)}"`); break; }
      }
    }
    const soAfirma = xs => xs.filter(x => !x.pergunta && !/^https?:\/\/\S+$/.test(x.f)).map(x => x.f); // endereço também não afirma
    const afirmacoes = [
      ...soAfirma([...pedacos(textoVisivel(semPerguntaDeFaq(semNotasDeFonte(html)))),
        ...valoresLd(html, naoAfirmaNoLd).flatMap(v => pedacos(ent(v)))]).map(f => ({ f })),
      ...soAfirma(pedacos(textoVisivel(notasDeFonte(html)))).map(f => ({ f, fonte: true })),
    ];
    for (const { f, fonte } of afirmacoes) {
      // a negação conta só ANTES do termo: "não possui autorização" nega mesmo;
      // já em "regulada e autorizada no Brasil" o "no" é preposição do português,
      // não a negativa do inglês — vale a ordem das palavras, não a presença.
      // Cada ocorrência do termo é julgada (não só a primeira): "o regulador … ela é regulada" reprova.
      let r = null;
      for (const t of REGULACAO) {
        for (const i of ocorrencias(f, t)) {
          if (NEGACAO.some(n => temPalavra(f.slice(0, i), n))) continue;
          const p = palavraEm(f, i);
          if (/^regulador/i.test(p)) continue;              // o órgão, não a empresa regulada
          if (negadoDepois(f, i)) continue;                 // "autorização que não tem"
          if (entreAspas(f, i)) continue;                   // citada para ser desmentida: "Regulada internacionalmente"
          // o órgão autoriza/cadastra: papel dele. Na nota de fonte vale até o particípio, porque ali
          // ele é o nome do documento do órgão ("consulta de regulados", "página Regulated Entities")
          if (orgaoAge(f) && (fonte || !ehParticipio(p))) continue;
          r = t; break;
        }
        if (r) break;
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
