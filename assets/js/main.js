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
    var texto = titulo.textContent.trim();
    titulo.textContent = '';
    for (var l = 0; l < texto.length; l++) {
      var span = document.createElement('span');
      span.className = 'ltr';
      span.textContent = texto[l];
      if (!reduced) {
        span.style.opacity = '0';
        span.style.transform = 'translateY(0.34em)';
        span.style.transition = 'opacity .55s cubic-bezier(.22,.61,.36,1) ' + (l * 55) + 'ms,' +
                                'transform .55s cubic-bezier(.22,.61,.36,1) ' + (l * 55) + 'ms';
      }
      titulo.appendChild(span);
    }
    if (!reduced) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          [].forEach.call(titulo.children, function (el) {
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
    var palavras = aceso.textContent.trim().split(/\s+/);
    aceso.textContent = '';
    palavras.forEach(function (p, idx) {
      var w = document.createElement('span');
      w.className = 'wd';
      w.textContent = p;
      aceso.appendChild(w);
      if (idx < palavras.length - 1) aceso.appendChild(document.createTextNode(' '));
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
