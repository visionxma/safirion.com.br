# safirion.com.br — arquivos prontos para publicação

Build estático gerado em 2026-08-20 a partir da cópia de `safirion.net`.
Envie **o conteúdo desta pasta** para a raiz do domínio (`public_html/` na Hostinger).

## O que foi trocado

- Todas as URLs `safirion.net` → `safirion.com.br`: canonical, `og:url`, `og:image`,
  Twitter Cards, JSON-LD (`WebSite` e `FAQPage`), links internos, sitemaps e feeds.
- **`go.safirion.net` foi mantido de propósito** — é o redirecionador de afiliado dos
  botões de CTA (leva a `trade.safirion.com/register?aff=815344`). Trocar o domínio dele
  quebraria o rastreamento da afiliação. Se o `.net` for desligado, esse subdomínio
  precisa continuar no ar ou os CTAs param de funcionar.
- JS do LiteSpeed convertido de lazy-load (`data-src`) para carregamento normal, para não
  depender do plugin.
- Nomes de arquivo normalizados (removido o sufixo `@ver=` que o wget cria).
- Removidas as tags `<link>` de endpoints do WordPress (`wp-json`, `xmlrpc.php`,
  `shortlink`) que retornariam 404 em hospedagem estática.

## SEO

- `robots.txt` e os 4 sitemaps foram **regerados** para o novo domínio.
- O `post-sitemap.xml` agora aponta para o post real. O sitemap do site antigo listava
  `/hello-world/`, que era **404**.
- `.htaccess` incluído: HTTPS forçado, `www` → raiz, 301 de `?p=156` para o post e
  `DirectoryIndex index.html index.xml` (necessário para os feeds RSS responderem em `/feed/`).

## Depois de publicar

1. **Redirecione `safirion.net` → `safirion.com.br` com 301.** Os dois domínios com o mesmo
   conteúdo no ar = conteúdo duplicado; o 301 transfere a autoridade em vez de dividi-la.
2. Cadastre `safirion.com.br` no Google Search Console e envie `sitemap_index.xml`.
   Se o `.net` já estiver no Search Console, use a ferramenta **Mudança de endereço**.
3. Atualize o ID do Google Tag / Site Kit (`GT-TB7PKRR4`) para incluir o novo domínio.
4. Adicione um `favicon.ico` na raiz — o site antigo não tinha (404).

## Limitações conhecidas

- **Formulário de comentários do post não funciona**: ele envia para `wp-comments-post.php`,
  que exige WordPress. Em hospedagem estática o envio falha em silêncio. Remova o formulário
  ou publique em WordPress de verdade.
- Sem WordPress, não há painel administrativo nem como editar o conteúdo pelo navegador —
  as alterações são feitas direto nos arquivos HTML.
- Scripts de terceiros (Google Tag, AnyTrack, Firebase) continuam carregando da origem remota.
