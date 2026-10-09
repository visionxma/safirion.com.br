# Instruções para traduzir a home de safirion.com.br

`safirion.com.br` é a página de apresentação da corretora **Safirion** (plataforma de
trading online), escrita em português do Brasil. Ela está sendo publicada em 17 idiomas,
cada um numa pasta (`/en/`, `/es/`…). Você traduz **um** idioma.

## O que você recebe e o que entrega

- Fonte (não altere): `/Users/alexandrehenrique/safirion.com.br-idiomas/.i18n/fonte/`
  - `inicio.html`: a página (título, descrição, palavras-chave e corpo);
  - `_chrome.json`: textos fora do corpo (metadados, barra do topo, pop-up).
- Entrega: `/Users/alexandrehenrique/safirion.com.br-idiomas/.i18n/<pasta>/`
  - `inicio.html`, com o **mesmo nome**;
  - `_chrome.json` com as **mesmas chaves**, valores traduzidos.
- Não escreva nada fora da sua pasta. Não rode git. Não mexa nas páginas do site.

`inicio.html` tem quatro blocos. Mantenha os marcadores exatamente:

```
<!--title-->…<!--/title-->
<!--description-->…<!--/description-->
<!--keywords-->…<!--/keywords-->
<!--corpo-->
…HTML…
<!--/corpo-->
```

## Regras de HTML (o verificador cobra todas)

1. **Traduza só o texto**: o conteúdo entre as tags e os valores de `alt` e `aria-label`.
   Um `alt=""` vazio continua vazio. `alt="safirion"` e `alt="Safirion"` ficam como estão.
2. **Não mude nenhuma tag nem nenhum outro atributo**: `href`, `src`, `class`, `id`,
   `style`, `data-*`, `name`, `rel`, `target`, `width`… ficam idênticos, na mesma ordem.
   Não acrescente nem remova elementos, nem mesmo `<strong>`, `<em>`, `<span>` ou `<a>`.
   Dentro de uma frase, as tags de destaque (`<strong>`, `<em>`, `<span class="az">`)
   envolvem o trecho equivalente na sua língua; a **ordem** das tags não muda.
3. `<i data-svg="N"></i>` é o lugar de um desenho: deixe exatamente onde e como está.
   `data-msgs=""` e a segunda `<div class="marquee__row"></div>` ficam vazios.
4. Links, e-mail e endereços (`https://safirion.com/…`, `contato@safirion.com`,
   `https://safirion.com.br`) ficam intocados. As âncoras (`#o-que-e`…) também.
5. HTML válido: `&` dentro de texto como `&amp;`; `>` solto como `&gt;` (a fonte já traz
   `&gt;` no fim de alguns botões: mantenha). Nunca `<` solto.
6. `title`, `description` e `keywords` sem aspas duplas (`"`) e sem `<` `>`.

## Como traduzir o texto

- **Qualidade de nativo.** Texto natural e fluente, no registro de uma corretora séria,
  não tradução literal. Adapte expressões idiomáticas. Trate o leitor do jeito usual em
  sites de finanças no seu idioma.
- **O `<h1>` é a marca: fica exatamente `SAFIRION`.**
- **Nomes próprios e siglas ficam:** Safirion, Safirion Broker, iOS, Android, App, KYC,
  2FA, AML, FAQ, Margin Trading, Instagram, Telegram, Blog, RISKFREE10, US$ 10.
- **Botões em caixa alta** (`CRIAR CONTA`, `LOGIN`, `CADASTRE-SE NA CORRETORA`…):
  mantenha em caixa alta nos idiomas que têm maiúsculas; `LOGIN` pode ficar `LOGIN` ou
  virar o termo usual do idioma, curto. Botões e itens de menu precisam ser **curtos**
  (o menu do topo tem 5 itens numa linha só; cada um com 1 ou 2 palavras).
- **SEO.** `title` (ideal ≤ 60 caracteres, com "Safirion") e `description` (ideal ≤ 155)
  devem usar os termos que as pessoas buscam no seu idioma para corretora/plataforma de
  trading e opções binárias. `keywords`: lista separada por vírgula, com os equivalentes
  buscados no seu idioma, sempre incluindo `safirion` e `safirion broker`.
- **Não invente nada.** Não acrescente promessas, números, prazos, garantias, bônus,
  licenças ou qualidades que a fonte não diz. Não mencione reguladores. Não retire nada.
- **Depósito mínimo (FAQ):** a fonte diz "geralmente começa em R$50". Mantenha o valor
  escrito `R$50` e diga que é em reais brasileiros (ex.: en "usually starts at R$50
  (Brazilian reais)"). Não converta para outra moeda.
- "Diretos autorais © 2026." é "Direitos autorais © 2026." (copyright): traduza o sentido.
- "Acesse o site oficial da Safirion: https://safirion.com.br": traduza a frase, o
  endereço fica igual.
- Números: mesmos valores (`+30`, `+de 30 ativos` → o equivalente natural, ex. en
  "30+ assets"). `01`–`04` do FAQ ficam.
- Árabe: escreva em árabe padrão moderno, sem acrescentar `dir` nem outros atributos (o
  montador cuida disso); algarismos ocidentais (0-9). Chinês: simplificado. Filipino:
  filipino padrão (base tagalo), com empréstimos do inglês onde soa natural. Hindi e
  bengali: escrita nativa, com termos técnicos correntes (trading, app, login) como os
  sites de finanças locais usam. Espanhol: neutro, compreensível na Espanha e na América
  Latina. Inglês: americano.
- `_chrome.json`:
  - `ticker`: 4 frases curtas da barra do topo; mantenha os `<b>…</b>`.
  - `passos`: nomes curtos dos 6 passos do cadastro (os mesmos passos da lista do corpo).
  - `slogan`: igual à frase do hero ("Aproveite cada movimento do mercado").
  - `popup`: mantenha `<strong>RISKFREE10</strong>` e `US$ 10`. **Para en, es e fr o
    pop-up já existe em produção:** copie os textos de `TXT.en` / `TXT.es` / `TXT.fr` em
    `/Users/alexandrehenrique/safirion.com.br-idiomas/assets/js/popup-promo.js`, sem mudar.
  - A chave `_nota` pode ficar como está.

## Como trabalhar

1. Leia `_chrome.json` e `inicio.html` inteiros antes de começar, para pegar o tom e
   manter a terminologia **consistente** (o mesmo termo para "plataforma", "conta",
   "saque", "depósito", "operações", "ativos" na página toda).
2. Grave os dois arquivos com a ferramenta Write.
3. Rode `node /Users/alexandrehenrique/safirion.com.br-idiomas/.i18n/verificar.js <pasta>`
   e corrija **todos os ERROs**. Rode de novo até dar `0 erro(s)`.
4. Leia os AVISOs: "palavras que parecem português" pode ser coincidência do seu idioma
   (ok) ou trecho esquecido (corrija).
5. Termine com um resumo curto: resultado final do verificador e qualquer decisão de
   tradução que mereça atenção do dono (em português).
