# safirion.com.br

Site estático hospedado no **Cloudflare Pages**. O conteúdo veio do site
`safirion.net` (WordPress + Elementor), convertido para arquivos estáticos.

## Como publicar

O repositório é a fonte: cada push na branch `main` dispara um deploy automático
no Cloudflare Pages. Não há etapa de build — o diretório raiz já é o site pronto.

**Configuração no painel do Pages:**
- Build command: *(vazio)*
- Build output directory: `/`

## Caminhos: raiz-relativos, de propósito

Os assets usam caminhos raiz-relativos (`/wp-content/...`), não URLs absolutas.
É o que faz o site funcionar igual em `*.pages.dev`, no domínio final e em qualquer
preview de branch. **Não troque para URLs absolutas** — o site quebra no preview.

As tags de SEO são a exceção e continuam absolutas, porque exigem URL completa:
`canonical`, `og:url`, `og:image`, `twitter:image` e o JSON-LD.

## Como mexer no design

O visual vem de duas camadas:

1. `wp-content/litespeed/css/*.css` — o CSS combinado que o LiteSpeed gerou no
   WordPress. **Não edite**: é um arquivo minificado de ~250 KB gerado por
   ferramenta, e qualquer regeneração descarta o que você escrever ali.
2. `wp-content/custom/safirion-ui.css` + `safirion-ui.js` — a camada própria,
   carregada depois. **É aqui que se mexe.**

A camada própria usa a mesma especificidade das regras do Elementor e vence
por ordem de carregamento, sem precisar de `!important`.

### Duas armadilhas do Elementor

**Lazy-load de fundo.** O Elementor traz esta regra:

```css
.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload) *
  { background-image: none !important }
```

Ou seja: todo `background-image` dentro do 4º container em diante fica apagado
até o JS do Elementor marcar o elemento como `.e-lazyloaded`. Era isso que
apagava o gradiente dos CTAs das seções de baixo. Todo `.e-con.e-parent` no HTML
recebeu a classe `e-no-lazyload` para desligar esse comportamento — o site é
estático e tem três imagens, o lazy-load só trazia risco.

**IDs dos elementos.** Os seletores dependem de IDs como
`.elementor-element-354d8575`, que o Elementor gera. Se a página for reeditada
no WordPress e reexportada, esses IDs podem mudar e as regras param de casar.

### Animação de entrada

`safirion-ui.js` aplica um fade-up nos blocos conforme entram na tela. O
conteúdo **nunca** depende do JS para ficar visível:

- a classe que esconde o bloco é aplicada pelo próprio JS, não vem no CSS;
- blocos já visíveis no carregamento não são tocados;
- um timeout de 2,5 s revela tudo caso o observer falhe;
- `prefers-reduced-motion` desliga a animação.

Mantenha essas quatro garantias em qualquer alteração.

## Configuração que mora em arquivos

| Arquivo | Função |
|---|---|
| `_redirects` | Feeds RSS: o Pages só serve `index.html` em URL de diretório, então `/feed/` precisa apontar para `/feed/index.xml`. Também redireciona `/embed/`. |
| `_headers` | Cache de 1 ano para `/wp-content/*` e `/wp-includes/*`, mais `X-Content-Type-Options` e `Referrer-Policy`. |
| `robots.txt` | Aponta para `sitemap_index.xml`. |
| `sitemap_index.xml` + 3 sitemaps | Regerados para este domínio. |

## Configuração que precisa do painel da Cloudflare

O `_redirects` **não** consegue casar query string nem hostname. Estes dois casos
exigem **Redirect Rules** (Rules → Redirect Rules), não dão para resolver em arquivo:

1. **`www.safirion.com.br` → `safirion.com.br`** (redirect de hostname)
2. **`/?p=156` → `/corretoras-digitais-plataformas-online-diferencas/`** (query string)

## Links de afiliado

Os CTAs de cadastro apontam para
`https://trade.safirion.com/register?aff=818084&aff_model=revenue&afftrack=`.

O parâmetro `afftrack` está **vazio** em todos os botões. Se quiser saber qual botão
converteu, preencha com um identificador diferente por botão (ex.: `afftrack=hero`,
`afftrack=rodape`).

⚠️ O botão **LOGIN** ainda usa o afiliado antigo: `aff=815344`, em
`trade.safirion.com/pt/login`.

## Limitações

- **Formulário de comentários não funciona**: envia para `wp-comments-post.php`, que
  exige WordPress. Em site estático o envio falha em silêncio.
- **Sem banner de cookies**: o WPConsent foi removido. O site carrega Google Tag
  (`GT-TB7PKRR4`), AnyTrack e Firebase, que gravam cookies de rastreamento — não há
  registro de consentimento (relevante para LGPD).
- **Sem política de privacidade**: o site não tem essa página.
- **Sem favicon**: o site de origem também não tinha.
- Editar conteúdo significa editar HTML — não há painel administrativo.
