/* ===== popup de promocao Safirion — v2 =====
   Exibe uma vez por SESSAO: reaparece toda vez que o visitante entra de novo
   (aba nova ou navegador reaberto), mas nao repete enquanto ele navega pelo site.
   Dispara no que vier primeiro: 2s de permanencia ou 35% de rolagem.
   v2: copy da promocao RISKFREE10, CTA para o nosso /cadastro/ (preserva aff e
   rastreio do kv-track) e textos nos 4 idiomas do site. */
(function () {
  "use strict";
  /* afftrack = dominio + a pagina aberta, sem a barra final (home = "safirion.com.br/"), igual aos botoes
     de cadastro da pagina: com "safirion.com.br/" fixo, todo cadastro do popup aparecia no portal do
     parceiro como se viesse da home (14/11/2026). Cada trecho do caminho vai codificado. */
  var ORIGEM = (function (p) {
    try { p = decodeURIComponent(p); } catch (e) {}
    p = p.replace(/\/index\.html?$/, "/").replace(/\/+$/, "").replace(/^\/+/, "");
    return "safirion.com.br/" + p.split("/").map(encodeURIComponent).join("/");
  })(location.pathname || "/");
  /* "Criar conta" = o MESMO cadastro do topo da página (25/11/2026, pedido do Victor: "manda"): fixo em /pt/register,
     quem estava em inglês, espanhol ou árabe caía no cadastro em português, enquanto o botão do topo da mesma página
     levava a /en/ ou /es/register com o afftrack do idioma. Sem link de cadastro na página, monta-se em português. */
  var CADASTRO = (function (a) {
    return a ? a.href : "https://trade.safirion.com/pt/register?aff=836698&aff_model=revenue&afftrack=" + ORIGEM;
  })(document.querySelector('a[href^="https://trade.safirion.com/"][href*="/register"]'));
  var CHAVE = "safirion_promo_v3";
  var ATRASO = 2000, ROLAGEM = 0.35;

  /* idioma pelo <html lang>; cai no portugues se nao reconhecer */
  var TXT = {
    pt: {
      selo: "Promoção", fechar: "Fechar",
      tit: "Negociação sem risco de US$ 10",
      p1: 'Use o código promocional <strong>RISKFREE10</strong> ao depositar para obter uma negociação sem risco.',
      p2: "Se sua próxima negociação real de Opções resultar em perda, reembolsamos até US$ 10 do seu investimento.",
      nota: "A primeira negociação aberta após a ativação será considerada livre de risco.",
      btn: "Criar conta",
      conta: "Já tem conta?", entrar: "Entrar",
      mini: "Sujeito às condições da promoção. Operar produtos alavancados envolve risco de perda."
    },
    en: {
      selo: "Promotion", fechar: "Close",
      tit: "Risk-free trade of US$ 10",
      p1: 'Use promo code <strong>RISKFREE10</strong> when you deposit to get a risk-free trade.',
      p2: "If your next real Options trade results in a loss, we refund up to US$ 10 of your investment.",
      nota: "The first trade opened after activation is considered risk-free.",
      btn: "Create account",
      conta: "Already have an account?", entrar: "Log in",
      mini: "Subject to the promotion terms. Trading leveraged products involves risk of loss."
    },
    es: {
      selo: "Promoción", fechar: "Cerrar",
      tit: "Operación sin riesgo de US$ 10",
      p1: 'Usa el código promocional <strong>RISKFREE10</strong> al depositar para obtener una operación sin riesgo.',
      p2: "Si tu próxima operación real de Opciones resulta en pérdida, reembolsamos hasta US$ 10 de tu inversión.",
      nota: "La primera operación abierta tras la activación se considera libre de riesgo.",
      btn: "Crear cuenta",
      conta: "¿Ya tienes cuenta?", entrar: "Entrar",
      mini: "Sujeto a las condiciones de la promoción. Operar productos apalancados implica riesgo de pérdida."
    },
    fr: {
      selo: "Promotion", fechar: "Fermer",
      tit: "Transaction sans risque de 10 US$",
      p1: 'Utilisez le code promo <strong>RISKFREE10</strong> lors de votre dépôt pour obtenir une transaction sans risque.',
      p2: "Si votre prochaine transaction réelle d'Options se solde par une perte, nous remboursons jusqu'à 10 US$ de votre investissement.",
      nota: "La première transaction ouverte après l'activation est considérée sans risque.",
      btn: "Créer un compte",
      conta: "Déjà un compte ?", entrar: "Connexion",
      mini: "Soumis aux conditions de la promotion. Trader des produits à effet de levier comporte un risque de perte."
    }
  };
  var lang = (document.documentElement.lang || "pt").slice(0, 2).toLowerCase();
  /* as páginas montadas pelo .i18n/montar.js trazem o texto do próprio idioma */
  var T = window.safirionPromoTxt || TXT[lang] || TXT.pt;
  /* "Já tem conta? Entrar" (24/11/2026): o popup abre aos 2 s por cima do "Entrar" do topo; quem já tem conta
     entra por ele mesmo. O link é o MESMO do topo da página (afftrack do idioma); sem ele, monta-se pelo caminho. */
  var B = TXT[lang] || TXT.pt;
  var CONTA = T.conta || B.conta, ENTRAR = T.entrar || B.entrar;
  var LOGIN = (function (a) {
    if (a) return a.href;
    var o = ORIGEM.replace(/\/$/, "") + "/%23login";
    return "https://trade.safirion.com/pwa/oauth/login?aff=836698&aff_model=revenue&afftrack=" + o + "&aff_track=" + o +
      "&redirect_url=https%3A%2F%2Ftrade.safirion.com%2Ftraderoom";
  })(document.querySelector('a[href*="trade.safirion.com/pwa/oauth/login"]'));

  function guardado() {
    try { return sessionStorage.getItem(CHAVE) ? 1 : 0; } catch (e) { return 0; }
  }
  function guardar() {
    try { sessionStorage.setItem(CHAVE, "1"); } catch (e) {}
  }
  /* atalhos de teste: safirionPromo.abrir() / .limpar() / .estado() */
  window.safirionPromo = {
    abrir: function () { abrir(); },
    limpar: function () { try { sessionStorage.removeItem(CHAVE); } catch (e) {} return "liberado"; },
    estado: function () {
      return guardado() ? "ja apareceu nesta sessao" : "liberado";
    }
  };
  if (guardado()) return;

  var cx, alvoAnterior, aberto = false;

  /* botão de criar conta kv-cta (25/11/2026): com o kit na página (_ext/kv-cta.css), o popup nasce com o MESMO botão
     da barra e das seções (luz, texto e o círculo com a seta); sem o kit, o botão antigo com o "›". O texto mora no
     .kv-cta__txt: o kv-cta.js só promove o que ainda não tem esse miolo, e o rótulo traduzido nunca apaga a seta. */
  var SETA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  function BOTAO(href) {
    if (!document.getElementById("kv-cta-css"))
      return '<a class="pp__btn" href="' + href + '">' + T.btn + ' <span aria-hidden="true">&rsaquo;</span></a>';
    return '<a class="pp__btn kv-cta kv-cta--popup" href="' + href + '"><span class="kv-cta__luz" aria-hidden="true"></span>' +
      '<span class="kv-cta__txt">' + T.btn + '</span><span class="kv-cta__seta" aria-hidden="true">' + SETA + '</span></a>';
  }

  function montar() {
    var el = document.createElement("div");
    el.className = "pp";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-labelledby", "ppTit");
    el.innerHTML =
      '<div class="pp__cx">' +
        '<button class="pp__x" type="button" aria-label="' + T.fechar + '">&#10005;</button>' +
        '<div class="pp__fig">' +
          '<span class="pp__selo">' + T.selo + '</span>' +
          '<img src="/assets/img/popup-promo.webp" alt="" width="760" height="1000" loading="lazy" decoding="async">' +
        '</div>' +
        '<div class="pp__cont">' +
          '<h2 id="ppTit">' + T.tit + '</h2>' +
          '<p>' + T.p1 + '</p>' +
          '<p>' + T.p2 + '</p>' +
          '<p class="pp__nota">' + T.nota + '</p>' +
          BOTAO(CADASTRO.replace(/&/g, "&amp;").replace(/"/g, "&quot;")) +
          '<a class="pp__entrar" href="' + LOGIN.replace(/&/g, "&amp;").replace(/"/g, "&quot;") + '"><span>' + CONTA + '</span><span class="pp__entrar-acao">' + ENTRAR + '</span></a>' +
          '<p class="pp__mini">' + T.mini + '</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);
    return el;
  }

  function abrir() {
    if (aberto) return;
    aberto = true;
    alvoAnterior = document.activeElement;
    cx = montar();
    cx.setAttribute("data-aberto", "");
    document.body.classList.add("pp-travado");
    requestAnimationFrame(function () { cx.setAttribute("data-visivel", ""); });
    cx.querySelector(".pp__x").focus();

    cx.querySelector(".pp__x").addEventListener("click", function () { fechar(); });
    cx.querySelector(".pp__btn").addEventListener("click", function () { guardar(); });
    cx.querySelector(".pp__entrar").addEventListener("click", function () { guardar(); });
    cx.addEventListener("click", function (e) { if (e.target === cx) fechar(); });
    document.addEventListener("keydown", tecla);
  }

  function tecla(e) {
    if (!aberto) return;
    if (e.key === "Escape") { fechar(); return; }
    if (e.key !== "Tab") return;
    var f = cx.querySelectorAll("button, a[href]");
    var pri = f[0], ult = f[f.length - 1];
    if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
    else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
  }

  function fechar() {
    if (!aberto) return;
    aberto = false;
    guardar();
    document.removeEventListener("keydown", tecla);
    cx.removeAttribute("data-visivel");
    document.body.classList.remove("pp-travado");
    setTimeout(function () { if (cx && cx.parentNode) cx.parentNode.removeChild(cx); }, 320);
    if (alvoAnterior && alvoAnterior.focus) alvoAnterior.focus();
  }

  var t = setTimeout(disparar, ATRASO);
  function aoRolar() {
    var h = document.documentElement;
    var lido = (h.scrollTop || document.body.scrollTop) / ((h.scrollHeight - h.clientHeight) || 1);
    if (lido >= ROLAGEM) disparar();
  }
  function disparar() {
    clearTimeout(t);
    window.removeEventListener("scroll", aoRolar);
    abrir();
  }
  window.addEventListener("scroll", aoRolar, { passive: true });
})();
