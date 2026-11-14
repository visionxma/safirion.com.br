/* ===== /cupom/: perguntas à vista (14/11/2026) =====
   O copiar do cupom e o contador do bônus vêm de home-marca.js. Aqui só as perguntas:
   5 à vista numa coluna, 6 quando a lista está em 2 colunas, e UM botão centralizado
   "Ver mais perguntas (+N)", com N contado (e recontado no resize, porque a 6ª pergunta
   entra ou sai conforme o número de colunas). Sem este script, todas ficam à vista. */
(function () {
  'use strict';
  var lista = document.querySelector('#perguntas .faq__list');
  if (!lista) return;
  var itens = [].slice.call(lista.querySelectorAll('.faq__item'));
  var aberta = false;
  var caixa = document.createElement('div');
  caixa.className = 'sb-faq-mais';
  var botao = document.createElement('button');
  botao.type = 'button';
  caixa.appendChild(botao);

  function colunas() {
    var g = getComputedStyle(lista).gridTemplateColumns;
    return g && g !== 'none' ? g.split(' ').length : 1;
  }
  function aplicar() {
    if (aberta) return;
    var aVista = colunas() > 1 ? 6 : 5;
    var resto = itens.slice(aVista);
    itens.forEach(function (it, i) { it.hidden = i >= aVista; });
    if (resto.length) {
      botao.textContent = 'Ver mais perguntas (+' + resto.length + ')';
      if (!caixa.parentNode) lista.parentNode.insertBefore(caixa, lista.nextSibling);
    } else if (caixa.parentNode) {
      caixa.parentNode.removeChild(caixa);
    }
  }
  botao.addEventListener('click', function () {
    var primeiraOculta = itens.filter(function (it) { return it.hidden; })[0];
    aberta = true;
    itens.forEach(function (it) { it.hidden = false; });
    if (caixa.parentNode) caixa.parentNode.removeChild(caixa);
    var s = primeiraOculta && primeiraOculta.querySelector('summary');
    if (s) s.focus();
  });
  aplicar();
  var t = 0;
  window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(aplicar, 120); });
  // link direto para uma pergunta escondida (#id): mostra todas antes de rolar
  var alvo = location.hash && document.getElementById(location.hash.slice(1));
  if (alvo && alvo.hidden) botao.click();
})();
