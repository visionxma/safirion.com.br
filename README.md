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
