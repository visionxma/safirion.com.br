// Casos do portão do site (`node .i18n/verificar.js --site`), regras 1, 3 e 4.
//   node .i18n/verificar.casos.mjs
// Cada caso vira uma página numa pasta temporária e passa pelo verificador DE VERDADE
// (`--site <pasta>`). "reprova" = o verificador tem de sair 1; "passa" = tem de sair 0.
// Sai 1 se algum caso der o contrário do esperado.
// Nasceu em 25/11/2026 com a regra 4 mais precisa: os "passa" são os falsos positivos do blog
// (regulador, papel da CVM, título de fonte, menção entre aspas, pergunta do FAQ); os
// "reprova" provam que a afirmação de verdade continua pega, em pt, es e en.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const VERIFICADOR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'verificar.js');
const ld = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;

const CASOS = [
  // ---- regra 4: afirmação de regulação continua reprovando
  ['reprova', 'pt: Safirion regulada pela CVM', '<p>A Safirion é regulada pela CVM.</p>'],
  ['reprova', 'pt: Safirion está regulada', '<p>Safirion está regulada.</p>'],
  ['reprova', 'pt: a corretora autorizada pela CVM', '<p>A corretora é autorizada pela CVM.</p>'],
  ['reprova', 'pt: possui autorização da CVM', '<p>A Safirion possui autorização da CVM.</p>'],
  ['reprova', 'pt: a CVM autoriza a Safirion (o órgão age, mas sobre a marca)', '<p>A CVM autoriza a Safirion a operar no Brasil.</p>'],
  ['reprova', 'pt: pronome com particípio ao lado do órgão', '<p>Ela é regulada pela CVM.</p>'],
  ['reprova', 'pt: o regulador e depois a afirmação na mesma frase', '<p>O regulador é a CVM e a Safirion é regulada por ela.</p>'],
  ['reprova', 'es: corredora autorizada por la CMF', '<p>La corredora está autorizada por la CMF.</p>'],
  ['reprova', 'es: Safirion está regulada', '<p>Safirion está regulada en Chile.</p>'],
  ['reprova', 'en: Safirion is regulated by', '<p>Safirion is regulated by the FSRC.</p>'],
  ['reprova', 'en: the broker is licensed', '<p>The broker is licensed by the FSC.</p>'],
  ['reprova', 'pt: afirmação na nota de fonte, fora do link', '<span class="pg-fonte">Fonte: Safirion, regulada pela CVM · <a href="https://example.com/">documento</a></span>'],
  ['reprova', 'pt: afirmação no JSON-LD', ld({ '@type': 'BlogPosting', description: 'A Safirion é regulada pela CVM.' })],
  ['reprova', 'pt: afirmação numa resposta do FAQ no JSON-LD', ld({ '@type': 'Question', name: 'A Safirion é confiável?', acceptedAnswer: { '@type': 'Answer', text: 'Sim, a Safirion é regulada pela CVM.' } })],
  ['reprova', 'pt: afirmação num item de lista', '<ul><li>Safirion: regulada pela CVM</li></ul>'],
  // ---- regra 4: o que não é a página afirmando regulação
  ['passa', 'pt: "regulador declarado" é o órgão', '<p>A Olymp Trade ganha três linhas: regulador declarado, órgão de disputas e taxa de saque.</p>'],
  ['passa', 'pt: quem autoriza é a CVM', '<p>Quem cadastra e autoriza intermediários no Brasil é a CVM, e a consulta pública é o Cadastro Geral, na Central de Sistemas dela.</p>'],
  ['passa', 'pt: a CVM concede autorização (título e texto do cartão)', '<li><h3><span>Dá registro a quem cumpre a lei</span></h3><p>A CVM cadastra ou concede autorização aos participantes que cumprem os requisitos legais.</p></li>'],
  ['passa', 'en: título de fonte da Nevis FSRC', '<ul class="pg-fontes"><li><a href="https://www.nevisfsrc.com/regulated-entities/">Nevis FSRC — Regulated Entities (a lista pública de entidades com licença)</a></li></ul>'],
  ['passa', 'en: nota de fonte com o link da FSRC', '<span class="pg-fonte">Fonte: <a href="https://www.nevisfsrc.com/regulated-entities/">Nevis FSRC — Regulated Entities</a></span>'],
  ['passa', 'pt: nota de fonte sem link que nomeia a página do órgão', '<span class="pg-fonte">CVM (perguntas frequentes e consulta de regulados) · lida em 29/10/2026</span>'],
  ['passa', 'pt: negação antes', '<p>A Safirion não possui autorização da CVM.</p>'],
  ['passa', 'pt: negação na oração que completa', '<table><tr><td>Diz ter autorização que não tem</td><td>Não se apresenta como corretora brasileira: não é regulada pela CVM.</td></tr></table>'],
  ['passa', 'pt: pergunta', '<p>A Safirion é regulada pela CVM?</p>'],
  ['passa', 'pt: frase citada entre aspas para desmentir', '<ul><li><strong>"Regulada internacionalmente."</strong> Não é categoria: regulação tem país e número.</li></ul>'],
  ['passa', 'pt: pergunta do FAQ com ponto no meio', '<details><summary>Vi um site dizendo que a Safirion é regulada. Quem está certo?</summary><p>A fonte.</p></details>' +
    ld({ '@type': 'Question', name: 'Vi um site dizendo que a Safirion é regulada. Quem está certo?', acceptedAnswer: { '@type': 'Answer', text: 'A fonte.' } })],
  ['passa', 'pt: keywords do JSON-LD (o que se busca)', ld({ '@type': 'BlogPosting', keywords: 'safirion cvm, safirion é regulada, safirion autorizada no brasil' })],
  ['passa', 'en: o órgão autoriza, sem a marca', '<p>The FSRC authorizes LLCs in Nevis.</p>'],
  ['passa', 'es: el órgano autoriza, sin la marca', '<p>La CMF autoriza a los intermediarios en Chile.</p>'],
  // ---- regra 3: "oficial" junto com safirion.com.br
  ['reprova', 'pt: site oficial é safirion.com.br', '<p>O site oficial da Safirion é safirion.com.br.</p>'],
  ['reprova', 'pt: linha de tabela "Site oficial | safirion.com.br"', '<table><tr><td>Site oficial</td><td>safirion.com.br</td></tr></table>'],
  ['reprova', 'pt: item de lista', '<ul><li>Site oficial: safirion.com.br</li></ul>'],
  ['reprova', 'en: official site', '<p>safirion.com.br is the official Safirion website.</p>'],
  ['passa', 'pt: tabela dos endereços + nota que nega em outro bloco',
    '<table><tr><td>instagram.com/safirionbroker</td><td>Perfil da corretora no Instagram</td></tr><tr><td>safirion.com.br</td><td>Este site, independente de divulgação — não é a corretora</td></tr></table>' +
    '<span class="pg-fonte">endereços publicados pela própria corretora · lidos em 29/10/2026</span><p>Esta página é de um site independente de divulgação, e este endereço não é o canal oficial da marca — o oficial é safirion.com.</p>'],
  ['passa', 'pt: fonte "Blog da corretora Safirion" e o domínio em outro bloco',
    '<span class="pg-fonte">Fonte: <a href="https://safirion.com/blog/">Blog da corretora Safirion: o que é a corretora</a></span><p>Quem escreve: equipe de safirion.com.br.</p>'],
  // ---- regra 1: publisher no JSON-LD
  ['reprova', 'publisher no artigo', ld({ '@type': 'BlogPosting', author: { '@type': 'Organization', name: 'Equipe' }, publisher: { '@id': 'https://safirion.com.br/#site' } })],
  ['passa', 'artigo só com author', ld({ '@type': 'BlogPosting', author: { '@type': 'Organization', name: 'Equipe' } })],
];

const base = mkdtempSync(path.join(tmpdir(), 'verificar-casos-'));
let falhas = 0;
try {
  CASOS.forEach(([espera, nome, corpo], n) => {
    const dir = path.join(base, String(n));
    mkdirSync(dir);
    writeFileSync(path.join(dir, 'index.html'), `<!doctype html><html lang="pt-BR"><head><title>caso</title></head><body>${corpo}</body></html>`);
    const r = spawnSync(process.execPath, [VERIFICADOR, '--site', dir], { encoding: 'utf8' });
    const deu = r.status === 1 ? 'reprova' : r.status === 0 ? 'passa' : `saída ${r.status}`;
    const ok = deu === espera;
    if (!ok) falhas++;
    console.log(`${ok ? 'ok   ' : 'FALHA'} [${espera}] ${nome}${ok ? '' : `: deu ${deu}\n${r.stdout}${r.stderr}`}`);
  });
} finally {
  rmSync(base, { recursive: true, force: true });
}
console.log(`\n${CASOS.length} caso(s), ${falhas} falha(s)`);
process.exit(falhas ? 1 : 0);
