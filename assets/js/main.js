/* ==========================================================================
   Safirion — interações da página
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header ganha fundo ao rolar ---------- */
  var hdr = document.getElementById('hdr');
  var top = document.getElementById('top');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (hdr) hdr.classList.toggle('is-stuck', y > 12);
    if (top) top.classList.toggle('is-on', y > 620);
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
  if (top) {
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
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
