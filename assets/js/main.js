/* ==========================================================================
   Safirion — interações da página
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header ganha fundo ao rolar ---------- */
  var hdr = document.getElementById('hdr');
  var topBtn = document.getElementById('top');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (hdr) hdr.classList.toggle('is-stuck', y > 12);
    if (topBtn) topBtn.classList.toggle('is-on', y > 620);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
  }, { passive: true });
  onScroll();

  /* ---------- Voltar ao topo ---------- */
  if (topBtn) {
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Rodapé: o ano da linha do produto e da assinatura é conta ----------
     O HTML já traz "2026" escrito (reserva para quem não roda JS); aqui só atualiza. */
  var ano = String(new Date().getFullYear());
  [].forEach.call(document.querySelectorAll('[data-ano]'), function (el) {
    if (el.textContent !== ano) el.textContent = ano;
  });

  /* ---------- Barra do topo: frases que se alternam ---------- */
  var msg = document.getElementById('ticker-msg');
  if (msg && !reduced) {
    var frases = [];
    try { frases = JSON.parse(msg.getAttribute('data-msgs') || '[]'); } catch (e) { frases = []; }
    if (frases.length > 1) {
      var i = 0;
      setInterval(function () {
        msg.classList.add('is-out');
        setTimeout(function () {
          i = (i + 1) % frases.length;
          msg.innerHTML = frases[i];
          msg.classList.remove('is-out');
        }, 400);
      }, 5000);
    }
  }

  /* ---------- Título do hero: letra a letra ---------- */
  var titulo = document.querySelector('[data-letras]');
  if (titulo) {
    // So o TEXTO direto do titulo vira letra a letra. Filho elemento fica intacto:
    // na home em pt o H1 e "Safirion Broker: conheca a plataforma de trading" e a
    // linha de apoio mora num <span class="hero__h1-sub"> (pedido de 23/11/2026).
    // Com textContent a linha de apoio virava letras gigantes junto com a marca.
    var noTexto = null;
    for (var ni = 0; ni < titulo.childNodes.length; ni++) {
      var nd = titulo.childNodes[ni];
      if (nd.nodeType === 3 && nd.nodeValue.trim()) { noTexto = nd; break; }
    }
    var texto = noTexto ? noTexto.nodeValue.trim() : '';
    var alvoLetras = document.createDocumentFragment();
    // Uma caixa por PALAVRA: as letras sao inline-block e, soltas, a linha pode
    // quebrar entre duas delas — SAFIRION BROKER virava "SAFIRION BRO / KER" em
    // 390px. O involucro .pal nao deixa quebrar dentro da palavra; entre palavras
    // vai um espaco de texto normal, que e onde a quebra deve cair (29/10/2026).
    var palavrasH = texto.split(' ');
    var l = 0;
    for (var pw = 0; pw < palavrasH.length; pw++) {
      var caixa = document.createElement('span');
      caixa.className = 'pal';
      for (var c = 0; c < palavrasH[pw].length; c++) {
        var span = document.createElement('span');
        span.className = 'ltr';
        span.textContent = palavrasH[pw][c];
        if (!reduced) {
          span.style.opacity = '0';
          span.style.transform = 'translateY(0.34em)';
          span.style.transition = 'opacity .55s cubic-bezier(.22,.61,.36,1) ' + (l * 55) + 'ms,' +
                                  'transform .55s cubic-bezier(.22,.61,.36,1) ' + (l * 55) + 'ms';
        }
        caixa.appendChild(span);
        l++;
      }
      alvoLetras.appendChild(caixa);
      if (pw < palavrasH.length - 1) alvoLetras.appendChild(document.createTextNode(' '));
    }
    if (noTexto) titulo.replaceChild(alvoLetras, noTexto);
    if (!reduced) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          [].forEach.call(titulo.querySelectorAll('.ltr'), function (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          });
        });
      });
    }
  }

  /* ---------- Texto que acende palavra a palavra ---------- */
  var aceso = document.querySelector('[data-acende]');
  if (aceso) {
    var frase = aceso.textContent.trim();
    var palavras = frase.split(/\s+/);
    var cola = ' ';
    /* tailandês e chinês não separam palavras com espaço: o navegador segmenta */
    if (palavras.length < 6 && window.Intl && Intl.Segmenter) {
      palavras = [];
      var seg = new Intl.Segmenter(document.documentElement.lang || 'pt', { granularity: 'word' }).segment(frase);
      for (var s of seg) palavras.push(s.segment);
      cola = '';
    }
    aceso.textContent = '';
    palavras.forEach(function (p, idx) {
      var w = document.createElement('span');
      w.className = 'wd';
      w.textContent = p;
      aceso.appendChild(w);
      if (cola && idx < palavras.length - 1) aceso.appendChild(document.createTextNode(cola));
    });

    var wds = [].slice.call(aceso.querySelectorAll('.wd'));
    if (reduced || !('IntersectionObserver' in window)) {
      wds.forEach(function (w) { w.classList.add('is-lit'); });
    } else {
      var acender = function () {
        var r = aceso.getBoundingClientRect();
        var alvo = window.innerHeight * 0.78;
        var progresso = (alvo - r.top) / Math.max(r.height, 1);
        var quantas = Math.round(Math.min(Math.max(progresso, 0), 1.15) * wds.length);
        wds.forEach(function (w, k) { w.classList.toggle('is-lit', k < quantas); });
      };
      var aceTick = false;
      window.addEventListener('scroll', function () {
        if (aceTick) return;
        aceTick = true;
        requestAnimationFrame(function () { acender(); aceTick = false; });
      }, { passive: true });
      window.addEventListener('resize', acender, { passive: true });
      acender();
    }
  }

  /* ---------- Revelação progressiva das seções ---------- */
  var items = [].slice.call(document.querySelectorAll('.rv'));

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = [].slice.call(el.parentNode.children).filter(function (n) {
          return n.classList && n.classList.contains('rv');
        });
        var delay = Math.min(siblings.indexOf(el), 5) * 90;
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ: só um item aberto por vez (fallback p/ browsers sem [name]) ---------- */
  var faq = [].slice.call(document.querySelectorAll('.faq__item'));
  var supportsExclusive = 'name' in document.createElement('details');

  if (!supportsExclusive) {
    faq.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        faq.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  /* ---------- FAQ da home: "Ver mais perguntas (+N)" ⇄ "Ver menos perguntas" (doutrina, seção 9) ----------
     Vale nas 17 línguas: o texto do botão vem do HTML de cada página (data-mais com {n}, data-menos).
     - À vista: 5 numa coluna e 6 em duas (sempre múltiplo das colunas); o N é conta e se refaz no resize.
     - A lista cresce e recolhe em 300 ms, cubic-bezier(.22,1,.36,1); o relógio é o performance.now() e
       cada quadro avança no máximo 50 ms (quadro travado não vira salto).
     - Ao recolher, a rolagem acompanha a lista e devolve o título e o botão à tela.
     - Com menos movimento, só um esmaecer curto. Sem JS, todas aparecem: o hidden só entra aqui.
     Antes isto morava num <script> dentro da home em português, e o home-marca.js punha um SEGUNDO
     botão "Ver mais perguntas (+17)" ao lado: dois controles, e o portão do FAQ reprovava. */
  (function () {
    var lista = document.getElementById('faq-lista');
    var botao = document.querySelector('[data-faq-mais]');
    if (!lista || !botao) return;
    var caixa = botao.parentElement;
    var rotulo = botao.querySelector('span') || botao;
    var itens = [].slice.call(lista.querySelectorAll('.faq__item'));
    var MAIS = botao.getAttribute('data-mais') || 'Ver mais perguntas (+{n})';
    var MENOS = botao.getAttribute('data-menos') || 'Ver menos perguntas';
    var DUR = 300;
    var aberto = false;
    var rodando = null;

    /* a curva da casa, cubic-bezier(.22,1,.36,1), resolvida por bissecção */
    var curva = (function (x1, y1, x2, y2) {
      var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
      var fx = function (t) { return ((ax * t + bx) * t + cx) * t; };
      var fy = function (t) { return ((ay * t + by) * t + cy) * t; };
      return function (v) {
        if (v <= 0) return 0;
        if (v >= 1) return 1;
        var lo = 0, hi = 1, t = v;
        for (var i = 0; i < 30; i++) { if (fx(t) < v) lo = t; else hi = t; t = (lo + hi) / 2; }
        return fy(t);
      };
    })(0.22, 1, 0.36, 1);

    function animar(cada, fim) {
      var t = 0, ant = performance.now(), id = 0, vivo = true;
      function passo(agora) {
        if (!vivo) return;
        t += Math.min(50, Math.max(0, agora - ant)); ant = agora;
        var p = Math.min(1, t / DUR);
        cada(curva(p));
        if (p < 1) id = requestAnimationFrame(passo); else { vivo = false; rodando = null; fim(); }
      }
      id = requestAnimationFrame(passo);
      return { parar: function () { if (!vivo) return; vivo = false; cancelAnimationFrame(id); cada(1); rodando = null; fim(); } };
    }

    function colunas() {
      var g = getComputedStyle(lista).gridTemplateColumns;
      return g && g !== 'none' ? g.split(' ').filter(Boolean).length : 1;
    }
    function aVista() { var c = colunas(); return c > 1 ? Math.ceil(6 / c) * c : 5; }

    function aplicar() {
      var n = aVista(), escondidas = 0;
      itens.forEach(function (x, i) { x.hidden = !aberto && i >= n; if (x.hidden) escondidas++; });
      caixa.hidden = !aberto && escondidas === 0;
      caixa.classList.toggle('is-aberto', aberto);
      botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      rotulo.textContent = aberto ? MENOS : MAIS.replace('{n}', escondidas);
    }

    /* onde o título deve parar: logo abaixo do cabeçalho fixo (faixa + pílula) */
    function folgaDoTopo() {
      var b = 0;
      [document.querySelector('.ticker'), document.getElementById('hdr')].forEach(function (e) {
        if (!e) return;
        var r = e.getBoundingClientRect();
        if (r.top < 60 && r.bottom > b) b = r.bottom;
      });
      return Math.round(b) + 16;
    }

    function esmaecer(novos) {
      novos.forEach(function (x) { if (x.animate) x.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease-out' }); });
    }

    botao.addEventListener('click', function () {
      if (rodando) rodando.parar();
      var abrir = !aberto;
      var h0 = lista.getBoundingClientRect().height;
      var y0 = window.pageYOffset;
      var estavam = itens.map(function (x) { return x.hidden; });
      aberto = abrir;
      aplicar();
      var h1 = lista.getBoundingClientRect().height;
      var titulo = document.getElementById('faq-titulo');
      /* destino da rolagem ao recolher: o título logo abaixo do cabeçalho, nunca rolando para baixo */
      var y1 = y0;
      if (!abrir && titulo) y1 = Math.min(y0, Math.max(0, Math.round(titulo.getBoundingClientRect().top + y0 - folgaDoTopo())));
      var rolar = function (y) { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); };

      if (reduced || Math.abs(h1 - h0) < 2) {
        if (abrir) esmaecer(itens.filter(function (x, i) { return estavam[i] && !x.hidden; }));
        else if (y1 !== y0) rolar(y1);
        return;
      }
      /* as que vão sumir ficam à vista até a lista acabar de recolher */
      if (!abrir) itens.forEach(function (x, i) { x.hidden = estavam[i]; });
      lista.style.height = h0 + 'px';
      lista.style.overflow = 'clip';
      rodando = animar(function (e) {
        lista.style.height = (h0 + (h1 - h0) * e) + 'px';
        if (!abrir && y1 !== y0) rolar(y0 + (y1 - y0) * e);
      }, function () {
        lista.style.height = '';
        lista.style.overflow = '';
        if (!abrir) aplicar();
      });
    });

    /* a sexta pergunta entra ou sai do grupo conforme as colunas: recontar no resize */
    var cols = colunas(), pendente = 0;
    window.addEventListener('resize', function () {
      if (pendente) return;
      pendente = requestAnimationFrame(function () {
        pendente = 0;
        var c = colunas();
        if (c !== cols && !rodando) { cols = c; aplicar(); }
      });
    }, { passive: true });

    /* link direto para uma pergunta escondida (#id): abre a lista antes de rolar */
    var alvo = location.hash && document.getElementById(location.hash.slice(1));
    var item = alvo && alvo.closest && alvo.closest('.faq__item');
    if (item && itens.indexOf(item) >= aVista()) aberto = true;
    aplicar();

    /* resposta: menos movimento = só esmaecer; navegador sem ::details-content = reserva que desliza */
    var temConteudo = window.CSS && CSS.supports && CSS.supports('selector(::details-content)');
    itens.forEach(function (it) {
      var resp = it.querySelector('.faq__a');
      var cab = it.querySelector('summary');
      if (!resp || !cab) return;
      if (reduced) {
        it.addEventListener('toggle', function () { if (it.open && resp.animate) resp.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: 'ease-out' }); });
        return;
      }
      if (temConteudo || !resp.animate) return;
      cab.addEventListener('click', function (ev) {
        ev.preventDefault();
        if (!it.open) {
          it.open = true;
          var h = resp.getBoundingClientRect().height;
          resp.animate([{ height: '0px', overflow: 'hidden' }, { height: h + 'px', overflow: 'hidden' }], { duration: DUR, easing: 'cubic-bezier(.22,1,.36,1)' });
        } else {
          var a = resp.animate([{ height: resp.getBoundingClientRect().height + 'px', overflow: 'hidden' }, { height: '0px', overflow: 'hidden' }], { duration: DUR, easing: 'cubic-bezier(.22,1,.36,1)' });
          a.onfinish = function () { it.open = false; };
        }
      });
    });
  })();

  /* ---------- Seletor de idioma: fecha ao clicar fora ou com Esc ---------- */
  var lng = document.querySelector('.lng');
  if (lng) {
    document.addEventListener('click', function (e) {
      if (lng.open && !lng.contains(e.target)) lng.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lng.open = false;
    });
  }

  /* ---------- Âncoras internas com rolagem suave ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id === '#') return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    if (history.replaceState) history.replaceState(null, '', id);
  });
})();
