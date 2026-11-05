(function() {
  "use strict";
  var raiz = document.documentElement;
  var corpo = document.body;
  var decSep = corpo && corpo.getAttribute("data-dec") || ",";
  var milSep = decSep === "," ? "." : ",";
  var menos = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  raiz.classList.add("mx-js");
  var itens = document.querySelectorAll(".mx-raiz .mx-rev");
  if (!("IntersectionObserver" in window)) {
    for (var i = 0; i < itens.length; i++) itens[i].classList.add("mx-vis");
  } else {
    for (var j = 0; j < itens.length; j++) {
      var el = itens[j];
      var irmaos = el.parentElement ? el.parentElement.children : [el];
      el.style.setProperty("--mx-atraso", Math.min(Array.prototype.indexOf.call(irmaos, el), 7) * 60 + "ms");
    }
    var olho = new IntersectionObserver(function(es) {
      for (var k = 0; k < es.length; k++) {
        if (!es[k].isIntersecting) continue;
        es[k].target.classList.add("mx-vis");
        olho.unobserve(es[k].target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    for (var m = 0; m < itens.length; m++) olho.observe(itens[m]);
  }
  function formatar(v, dec) {
    var s = dec ? v.toFixed(dec) : String(Math.round(v));
    var p = s.split(".");
    if (p[0].length > 4) p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, milSep);
    return p.length > 1 ? p[0] + decSep + p[1] : p[0];
  }
  var contadores = document.querySelectorAll(".mx-raiz [data-conta]");
  function contar(el2) {
    var alvo = parseFloat(el2.getAttribute("data-conta"));
    var dec = parseInt(el2.getAttribute("data-dec-casas") || "0", 10);
    var pre = el2.getAttribute("data-pre") || "";
    var pos = el2.getAttribute("data-pos") || "";
    var final = el2.textContent;
    if (menos || !isFinite(alvo)) return;
    var t0 = null, dur = 1100;
    function passo(t2) {
      if (t0 === null) t0 = t2;
      var f = Math.min(1, (t2 - t0) / dur);
      var e = 1 - Math.pow(1 - f, 3);
      el2.textContent = pre + formatar(alvo * e, dec) + pos;
      if (f < 1) requestAnimationFrame(passo);
      else el2.textContent = final;
    }
    requestAnimationFrame(passo);
  }
  if ("IntersectionObserver" in window && contadores.length) {
    var olhoN = new IntersectionObserver(function(es) {
      for (var k = 0; k < es.length; k++) {
        if (!es[k].isIntersecting) continue;
        contar(es[k].target);
        olhoN.unobserve(es[k].target);
      }
    }, { threshold: 0.4 });
    for (var n = 0; n < contadores.length; n++) olhoN.observe(contadores[n]);
  }
  function colunasDa(lista2) {
    var cs = getComputedStyle(lista2);
    if (cs.display.indexOf("grid") < 0) return 1;
    var t2 = (cs.gridTemplateColumns || "").trim();
    return !t2 || t2 === "none" ? 1 : t2.split(/\s+/).length;
  }
  var listas = document.querySelectorAll(".mx-raiz [data-mx-faq-lista]");
  for (var a = 0; a < listas.length; a++) (function(lista2) {
    var caixa = lista2.parentElement;
    var botao = caixa ? caixa.querySelector("[data-mx-faq-mais]") : null;
    var perguntas = lista2.querySelectorAll("[data-mx-faq-item]");
    if (botao) {
      var aberto = false;
      var base = parseInt(lista2.getAttribute("data-mx-faq-visiveis") || "5", 10);
      var moldura = botao.parentElement && botao.parentElement !== caixa ? botao.parentElement : botao;
      var aplicar = function() {
        var visiveis = colunasDa(lista2) > 1 ? 6 : base;
        var sobra = perguntas.length - visiveis;
        moldura.hidden = sobra <= 0;
        for (var q2 = 0; q2 < perguntas.length; q2++) perguntas[q2].hidden = !aberto && q2 >= visiveis;
        var nEl = botao.querySelector("[data-mx-faq-n]");
        if (nEl) nEl.textContent = String(Math.max(sobra, 0));
        var rotEl = botao.querySelector("[data-mx-faq-t]") || botao;
        if (rotEl.firstChild && rotEl.firstChild.nodeType === 3) {
          rotEl.firstChild.nodeValue = aberto ? botao.getAttribute("data-rotulo-menos") : botao.getAttribute("data-rotulo");
        }
        botao.setAttribute("aria-expanded", aberto ? "true" : "false");
      };
      botao.addEventListener("click", function() {
        aberto = !aberto;
        aplicar();
      });
      var pedido = 0;
      window.addEventListener("resize", function() {
        if (pedido) return;
        pedido = requestAnimationFrame(function() {
          pedido = 0;
          aplicar();
        });
      });
      aplicar();
    }
    if (!("name" in document.createElement("details"))) {
      lista2.addEventListener("toggle", function(ev) {
        var d = ev.target;
        if (!d.open) return;
        for (var q2 = 0; q2 < perguntas.length; q2++) if (perguntas[q2] !== d) perguntas[q2].open = false;
      }, true);
    }
  })(listas[a]);
  document.addEventListener("click", function(ev) {
    var link = ev.target.closest && ev.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href").slice(1);
    if (id && !document.getElementById(id)) link.setAttribute("href", "/#" + id);
  }, true);
  var curtos = document.querySelectorAll(".mx-raiz :is(h1, h2, h3, h4):not(.mx-b-cartao__titulo), .mx-raiz :is(.mx-b-cartao__titulo > span, .lp-num-v, .lp-num-t)");
  if (curtos.length && "ResizeObserver" in window) {
    var assinatura = function(el2) {
      return el2.tagName + "." + (String(el2.className).split(" ")[0] || "");
    };
    var listaDe = function(el2) {
      var ramo = el2;
      for (var i2 = 0; i2 < 5 && ramo.parentElement; i2++) {
        var pai = ramo.parentElement, a2 = assinatura(ramo), iguais = 0;
        for (var c = 0; c < pai.children.length; c++) if (assinatura(pai.children[c]) === a2) iguais++;
        if (iguais > 1) return pai;
        ramo = pai;
      }
      return el2;
    };
    var grupos = [];
    for (var t = 0; t < curtos.length; t++) {
      var lista = listaDe(curtos[t]), sig = assinatura(curtos[t]), g = null;
      for (var q = 0; q < grupos.length; q++) if (grupos[q].lista === lista && grupos[q].sig === sig) g = grupos[q];
      if (!g) {
        g = { lista, sig, itens: [] };
        grupos.push(g);
      }
      g.itens.push(curtos[t]);
    }
    var caber = function(g2) {
      var escala = 1, s, bases = [];
      for (s = 0; s < g2.itens.length; s++) g2.itens[s].style.fontSize = "";
      for (s = 0; s < g2.itens.length; s++) {
        var el2 = g2.itens[s], cs = getComputedStyle(el2);
        bases.push(parseFloat(cs.fontSize) || 16);
        var livre = el2.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
        if (livre <= 0) continue;
        var palavras = (el2.textContent || "").split(/\s+/);
        var regua = document.createElement("span");
        regua.style.cssText = "position:absolute;left:0;top:0;white-space:nowrap;visibility:hidden;pointer-events:none";
        el2.appendChild(regua);
        for (var p = 0; p < palavras.length; p++) {
          if (!palavras[p]) continue;
          regua.textContent = palavras[p];
          var larg = regua.getBoundingClientRect().width;
          if (larg > livre) escala = Math.min(escala, livre / larg);
        }
        regua.remove();
      }
      if (escala >= 1) return;
      for (s = 0; s < g2.itens.length; s++) {
        g2.itens[s].style.fontSize = Math.max(13, Math.floor(bases[s] * escala * 0.98 * 10) / 10) + "px";
      }
    };
    var ligarCurtos = function() {
      grupos.forEach(function(g2) {
        var ultima = 0;
        new ResizeObserver(function(es) {
          var w = Math.round(es[0].contentRect.width);
          if (w === ultima) return;
          ultima = w;
          caber(g2);
        }).observe(g2.lista);
      });
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(ligarCurtos);
    else ligarCurtos();
  }
})();
