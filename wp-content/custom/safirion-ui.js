/* Safirion — comportamentos de interface
   Sem dependencias. Complementa safirion-ui.css.

   Principio: o conteudo NUNCA pode depender deste arquivo para ficar
   visivel. A classe que esconde o bloco so e aplicada pelo proprio JS,
   e existe uma rede de seguranca que revela tudo caso o observer falhe. */
(function () {
  'use strict';

  var reduced = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Header ganha fundo translucido apos a rolagem ---- */
  function initHeader() {
    var header = document.querySelector('header.elementor-location-header');
    if (!header) return;

    var ticking = false;
    function update() {
      header.classList.toggle('sfr-scrolled', window.scrollY > 40);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---- 2. Entrada dos blocos conforme entram na tela ---- */
  function initReveal() {
    if (reduced || !('IntersectionObserver' in window)) return;

    // Blocos das secoes internas. O hero fica de fora para nao atrasar o LCP.
    var targets = [].slice.call(document.querySelectorAll(
      '.elementor-element-7c347501 > .e-con-inner > .elementor-element,' +
      '.elementor-element-1a68508c > .e-con-inner > .elementor-element,' +
      '.elementor-element-bef57d .e-con-full,' +
      '.elementor-element-1a690a48 > .e-con-inner > .elementor-element'
    ));
    if (!targets.length) return;

    var vh = window.innerHeight || document.documentElement.clientHeight;

    // So anima o que ainda esta abaixo da dobra; o que ja aparece na tela
    // permanece intocado, sem risco de piscar.
    var pending = targets.filter(function (el) {
      return el.getBoundingClientRect().top > vh * 0.9;
    });
    if (!pending.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('sfr-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

    pending.forEach(function (el, i) {
      el.classList.add('sfr-reveal');
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });

    // Rede de seguranca: se por qualquer motivo o observer nao disparar,
    // tudo volta a ficar visivel.
    window.setTimeout(function () {
      pending.forEach(function (el) { el.classList.add('sfr-in'); });
      io.disconnect();
    }, 2500);
  }

  /* ---- 3. Compensa o header fixo nas ancoras internas ---- */
  function initAnchorOffset() {
    var header = document.querySelector('header.elementor-location-header');
    if (!header) return;
    document.documentElement.style.scrollPaddingTop =
      (header.offsetHeight + 12) + 'px';
  }

  function boot() {
    initHeader();
    initReveal();
    initAnchorOffset();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
