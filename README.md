# safirion.com.br

Site estático hospedado no **Cloudflare Pages**. A home foi reconstruída do zero em
HTML, CSS e JavaScript puros; o blog e os feeds continuam sendo os arquivos estáticos
gerados a partir do WordPress + Elementor.

## Como publicar

O repositório é a fonte: cada push na branch `main` dispara um deploy automático
no Cloudflare Pages. Não há etapa de build — o diretório raiz já é o site pronto.

**Configuração no painel do Pages:**
- Build command: *(vazio)*
- Build output directory: `/`

## Estrutura

```
index.html            home reconstruída (todo o SEO e os dados estruturados aqui)
site.webmanifest      PWA (nome, cores, ícones)
assets/               camada da home nova — só ela usa estes arquivos
  css/styles.css      design system: tokens, componentes, responsivo
  js/main.js          header ao rolar, revelação das seções, FAQ, voltar ao topo
  fonts/              Mazzard Regular + SemiBold (woff2)
  icons/              logo, ícone, favicons, mapa-múndi
  img/                planeta, imagens de conteúdo e og-image
wp-content/           legado do WordPress — ainda usado pelo post do blog
wp-includes/          idem
corretoras-.../       post do blog (mantido, indexado)
feed/ comments/ ...   feeds RSS (ver _redirects)
*-sitemap.xml         sitemaps (o robots.txt aponta para sitemap_index.xml)
_headers _redirects   cache, segurança e redirects do Cloudflare Pages
```

## Home: copy e identidade

- **Copy:** a mesma do site anterior, preservada texto a texto — títulos, negritos,
  rótulos de botão, o passo a passo do cadastro, o FAQ e os avisos de risco e da CVM.
- **Identidade visual:** a de `safirion.com` — azul de marca `#2389e6` sobre base
  noturna `#060b18`, tipografia Mazzard, logo e ícone oficiais.
- O ritmo visual alterna faixas de luz (`.section--alt`) com o fundo base, para a
  página não ficar chapada de escuro.

## SEO da home

- `title`, `description`, `keywords`, `robots`, `googlebot`, `canonical` e `hreflang`.
- Open Graph completo (`og:image` 1200×630) e Twitter Card `summary_large_image`.
- JSON-LD com `Organization`/`FinancialService`, `WebSite`, `WebPage`,
  `BreadcrumbList`, `HowTo` (passo a passo do cadastro) e `FAQPage`.
- Um único `h1`, seções em `h2`/`h3`, `alt` em todas as imagens de conteúdo,
  decorativas com `aria-hidden`, link "pular para o conteúdo", `width`/`height`
  declarados, `preload` de fontes e da imagem principal, `lazy` abaixo da dobra.
- Links externos com `rel="nofollow noopener"`.

## Como mexer no design

**Da home:** tudo em `assets/css/styles.css`. Os tokens ficam no `:root` no topo do
arquivo — mudar `--brand`, `--bg` ou `--bg-band` repercute na página inteira.

**Do blog:** o visual vem de duas camadas do WordPress:

1. `wp-content/litespeed/css/*.css` — CSS combinado gerado pelo LiteSpeed.
   **Não edite:** é minificado, gerado por ferramenta, e qualquer regeneração
   descarta o que você escrever ali.
2. `wp-content/custom/safirion-ui.css` + `safirion-ui.js` — a camada própria,
   carregada depois. **É aqui que se mexe.**

## Rodar localmente

```sh
python3 -m http.server 4321
# http://localhost:4321/
```
