// Tira do index.html (português) a fonte que os tradutores recebem.
//   node .i18n/extrair.js
// Gera .i18n/fonte/inicio.html (texto + marcação) e .i18n/fonte/_svg.json (os desenhos,
// que saem do caminho do tradutor e voltam no montar.js). Rode de novo sempre que a
// home em português mudar; depois confira os idiomas com verificar.js.
const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..');
const FONTE = path.join(__dirname, 'fonte');
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');

const um = (re, nome) => { const m = html.match(re); if (!m) throw new Error('não achei: ' + nome); return m[1]; };
const title = um(/<title>([^<]*)<\/title>/, 'title');
const description = um(/<meta name="description" content="([^"]*)">/, 'description');
const keywords = um(/<meta name="keywords" content="([^"]*)">/, 'keywords');

let corpo = um(/<body>([\s\S]*?)<script src="\/?assets\/js\/main\.js/, 'body');
corpo = corpo.replace(/\s*<!--idiomas-->[\s\S]*?<!--\/idiomas-->/g, '');   // seletor posto pelo montar.js
// blocos só da home em português (cupom WELCOME100, login e cadastro, perguntas de marca: 14/11/2026, pedido
// do Márcio): ficam fora da fonte dos tradutores, senão o verificar.js reprova os 16 idiomas por contagem de tags
corpo = corpo.replace(/\s*<!--so-pt-->[\s\S]*?<!--\/so-pt-->/g, '');
corpo = corpo.replace(/<!--[\s\S]*?-->\n?/g, '');                           // comentários de seção
// o ?v=<md5> das mídias é posto pelo montar.js (comVersaoDeMidia) em toda home; na fonte dos
// tradutores ele só atrapalharia, e o verificar.js compararia endereços que mudam a cada imagem
corpo = corpo.replace(/(\.(?:woff2?|ttf|otf|png|jpe?g|webp|svg|ico|gif|avif|mp4|webm))\?v=[0-9a-f]+/gi, '$1');

// frases da barra do topo: moram no _chrome.json
if (!/data-msgs='[^']*'>[^<]*<\/span>/.test(corpo)) throw new Error('barra do topo mudou de formato');
corpo = corpo.replace(/data-msgs='[^']*'>[^<]*<\/span>/, 'data-msgs=""></span>');

// a esteira repete a mesma fileira duas vezes: traduz-se uma só
let fileira = 0;
corpo = corpo.replace(/<div class="marquee__row">[\s\S]*?<\/div>/g, m => (++fileira === 1 ? m : '<div class="marquee__row"></div>'));
if (fileira !== 2) throw new Error('esperava 2 fileiras na esteira, achei ' + fileira);

const svgs = [];
corpo = corpo.replace(/<svg[\s\S]*?<\/svg>/g, m => { svgs.push(m); return `<i data-svg="${svgs.length}"></i>`; });

corpo = corpo.replace(/\n{3,}/g, '\n\n').trim();
fs.mkdirSync(FONTE, { recursive: true });
fs.writeFileSync(path.join(FONTE, 'inicio.html'),
  `<!--title-->${title}<!--/title-->\n<!--description-->${description}<!--/description-->\n<!--keywords-->${keywords}<!--/keywords-->\n<!--corpo-->\n${corpo}\n<!--/corpo-->\n`);
fs.writeFileSync(path.join(FONTE, '_svg.json'), JSON.stringify(svgs, null, 1) + '\n');
console.log(`fonte/inicio.html: ${corpo.length} caracteres, ${svgs.length} desenhos guardados`);
