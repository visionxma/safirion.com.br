/* ===== Home em português: cupom, perguntas e contador (14/11/2026) =====
   Só a home em pt carrega este arquivo. Sem ele nada some: o cupom continua na tela (e se
   seleciona inteiro num toque, user-select: all), todas as perguntas ficam abertas para ler e
   o bônus mostra "100%" parado.
   1. "Copiar cupom": área de transferência; se o navegador recusar, cai no execCommand e, por
      último, seleciona o código para a pessoa copiar à mão. O aviso sai num role="status".
   2. Perguntas: 5 à vista e UM botão "Ver mais perguntas (+N)", com N contado no HTML.
   3. "100%" conta de 0 a 100 quando entra na tela (desligado em "menos movimento"). */
(function () {
  'use strict';

  // ---------------------------------------------------------------- 1. copiar o cupom
  function copiarPorSelecao(texto) {
    var t = document.createElement('textarea');
    t.value = texto;
    t.setAttribute('readonly', '');
    t.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(t);
    t.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(t);
    return ok;
  }
  function copiar(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto).then(function () { return true; }, function () { return copiarPorSelecao(texto); });
    }
    return Promise.resolve(copiarPorSelecao(texto));
  }
  [].forEach.call(document.querySelectorAll('[data-copiar]'), function (botao) {
    var rotulo = botao.querySelector('[data-rotulo]') || botao;
    var original = rotulo.textContent;
    var aviso = document.getElementById(botao.getAttribute('data-aviso') || '');
    var volta = 0;
    botao.addEventListener('click', function () {
      var codigo = botao.getAttribute('data-copiar');
      copiar(codigo).then(function (ok) {
        if (ok) {
          botao.classList.add('is-ok');
          rotulo.textContent = 'Cupom copiado';
          if (aviso) aviso.textContent = 'Cupom ' + codigo + ' copiado. Cole no campo de cupom na hora do depósito.';
          clearTimeout(volta);
          volta = setTimeout(function () { botao.classList.remove('is-ok'); rotulo.textContent = original; }, 2600);
        } else {
          var alvo = document.getElementById(botao.getAttribute('data-codigo') || '');
          if (alvo && window.getSelection) {
            var r = document.createRange();
            r.selectNodeContents(alvo);
            var s = window.getSelection();
            s.removeAllRanges();
            s.addRange(r);
          }
          if (aviso) aviso.textContent = 'Não deu para copiar sozinho: o código ' + codigo + ' está selecionado, é só copiar.';
        }
      });
    });
  });

  // ---------------------------------------------------------------- 2. perguntas: 5 à vista
  var lista = document.querySelector('#duvidas-frequentes .faq__list');
  var A_VISTA = 5;
  if (lista) {
    var itens = [].slice.call(lista.querySelectorAll('.faq__item'));
    var resto = itens.slice(A_VISTA);
    if (resto.length) {
      resto.forEach(function (it) { it.hidden = true; });
      var caixa = document.createElement('div');
      caixa.className = 'sb-faq-mais';
      var botao = document.createElement('button');
      botao.type = 'button';
      botao.textContent = 'Ver mais perguntas (+' + resto.length + ')';
      caixa.appendChild(botao);
      lista.parentNode.insertBefore(caixa, lista.nextSibling);
      botao.addEventListener('click', function () {
        resto.forEach(function (it) { it.hidden = false; });
        caixa.parentNode.removeChild(caixa);
        var primeira = resto[0].querySelector('summary');
        if (primeira) primeira.focus();
      });
      // link direto para uma pergunta escondida (#id): abre a lista antes de rolar
      var alvo = location.hash && document.getElementById(location.hash.slice(1));
      if (alvo && resto.indexOf(alvo.closest ? alvo.closest('.faq__item') : null) >= 0) botao.click();
    }
  }

  // ---------------------------------------------------------------- 3. contador do bônus
  var calmo = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (calmo || !('IntersectionObserver' in window) || !window.requestAnimationFrame) return;
  var numeros = [].slice.call(document.querySelectorAll('[data-contar]'));
  function anima(el) {
    var fim = +el.getAttribute('data-contar'), suf = el.getAttribute('data-sufixo') || '', t0 = 0, dur = 1100;
    function passo(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(fim * e) + suf;
      if (p < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      anima(e.target);
    });
  }, { threshold: 0.6 });
  numeros.forEach(function (n) {
    n.textContent = '0' + (n.getAttribute('data-sufixo') || '');
    io.observe(n);
  });
})();
