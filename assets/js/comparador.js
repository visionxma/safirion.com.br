/* comparador.js — blocos das páginas "corretora × corretora" da rede Safirion.
   Ligado SÓ nas páginas que usam o bloco `custo-total` ou o marcador de fonte
   (`usaComparador` no gerar.mjs). Sem dependência.

   Uma só conta para o servidor e para o navegador: o `gerar.mjs` carrega este
   arquivo em Node para escrever o exemplo estático do HTML, e o navegador usa as
   MESMAS funções para refazer a conta quando o visitante digita. Assim o número
   que o Google indexa e o número que o visitante vê nunca divergem.

   Texto que aparece na tela vem do dicionário `rot`, gravado na página pelo
   gerador (doutrina: texto que o JS escreve é chave do dicionário). A taxa vem
   só do JSON da página; taxa não publicada nunca entra como zero. */

(function () {
  'use strict';

  /* ---- moeda por idioma/país ------------------------------------------- */

  var MOEDAS = {
    'pt-BR': { sim: 'R$\u00a0', mil: '.', dec: ',', casas: 2, cod: 'BRL' },
    'es-MX': { sim: '$', mil: ',', dec: '.', casas: 2, cod: 'MXN' },
    'es-CO': { sim: '$', mil: '.', dec: ',', casas: 0, cod: 'COP' },
    'es-PE': { sim: 'S/\u00a0', mil: ',', dec: '.', casas: 2, cod: 'PEN' },
    'es-CL': { sim: '$', mil: '.', dec: ',', casas: 0, cod: 'CLP' },
    'es-AR': { sim: '$', mil: '.', dec: ',', casas: 2, cod: 'ARS' }
  };

  function moedaDe(idioma) {
    return MOEDAS[idioma] || MOEDAS['pt-BR'];
  }

  function numero(v, m, casas) {
    var c = casas === undefined ? m.casas : casas;
    var fixo = (Math.round(v * Math.pow(10, c)) / Math.pow(10, c)).toFixed(c);
    var partes = fixo.split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, m.mil);
    return partes.length > 1 ? partes[0] + m.dec + partes[1] : partes[0];
  }

  function moeda(v, idioma) {
    var m = moedaDe(idioma);
    return m.sim + numero(v, m);
  }

  // Percentual no idioma da página: "2,5%" no Brasil, "2.5%" no México.
  function pct(v, idioma) {
    var m = moedaDe(idioma);
    var casas = Math.round(v) === v ? 0 : 2;
    return numero(v, m, casas).replace(/([.,]\d*?)0+$/, '$1').replace(/[.,]$/, '') + '%';
  }

  function troca(s, mapa) {
    return String(s).replace(/\{(\w+)\}/g, function (t, k) {
      return Object.prototype.hasOwnProperty.call(mapa, k) ? mapa[k] : t;
    });
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---- a conta de UMA corretora ----------------------------------------
     `modo` de cada taxa:
       pct-saque ......... % sobre cada saque (o depósito é sacado em partes
                           iguais); `isentos` = saques grátis no mês
       fixo-saque ........ valor fixo por saque, na moeda local
       pct-deposito ...... % sobre o valor depositado
       fixo-deposito ..... valor fixo no depósito, na moeda local
       fixo-mes .......... valor fixo no mês, na moeda local
       info .............. só texto; nunca entra na soma
       nao-publica ....... a corretora não publica: nunca vira zero
       nao-confirmado .... não conseguimos confirmar: idem                    */

  function contar(corretora, deposito, saques, idioma, r) {
    var porSaque = saques > 0 ? deposito / saques : 0;
    var itens = [];
    var total = 0;
    var parcial = false;
    var numericas = 0;
    var taxas = corretora.taxas || [];

    for (var i = 0; i < taxas.length; i++) {
      var t = taxas[i];
      var v = typeof t.valor === 'number' ? t.valor : 0;
      var custo = null;
      var conta = '';
      var cobrados, isentos;
      switch (t.modo) {
        case 'pct-saque':
          isentos = Math.min(t.isentos || 0, saques);
          cobrados = saques - isentos;
          // piso e teto por saque, quando a empresa publica (ex.: Safirion em BRL, mín. 5 e máx. 125)
          var porUm = (v / 100) * porSaque, limite = '';
          if (typeof t.min === 'number' && porUm < t.min) { porUm = t.min; limite = ' (mín. ' + moeda(t.min, idioma) + ')'; }
          if (typeof t.max === 'number' && porUm > t.max) { porUm = t.max; limite = ' (máx. ' + moeda(t.max, idioma) + ')'; }
          custo = cobrados * porUm;
          if (saques === 0) conta = r.semSaque;
          else if (cobrados === 0) conta = troca(r.todosIsentos, { n: saques });
          else {
            conta = (isentos ? troca(r.isentos, { k: isentos }) + ' · ' : '') +
              cobrados + ' × ' + pct(v, idioma) + ' ' + r.de + ' ' + moeda(porSaque, idioma) + limite +
              ' = ' + moeda(custo, idioma);
          }
          break;
        case 'fixo-saque':
          isentos = Math.min(t.isentos || 0, saques);
          cobrados = saques - isentos;
          custo = cobrados * v;
          if (saques === 0) conta = r.semSaque;
          else if (cobrados === 0) conta = troca(r.todosIsentos, { n: saques });
          else {
            conta = (isentos ? troca(r.isentos, { k: isentos }) + ' · ' : '') +
              cobrados + ' × ' + moeda(v, idioma) + ' = ' + moeda(custo, idioma);
          }
          break;
        case 'pct-deposito':
          custo = deposito * (v / 100);
          conta = pct(v, idioma) + ' ' + r.de + ' ' + moeda(deposito, idioma) + ' = ' + moeda(custo, idioma);
          break;
        case 'fixo-deposito':
          custo = v;
          conta = moeda(v, idioma);
          break;
        case 'fixo-mes':
          custo = v;
          conta = troca(r.porMes, { v: moeda(v, idioma) });
          break;
        case 'nao-publica':
        case 'nao-confirmado':
          parcial = true;
          break;
        default: // info
          conta = t.texto || '';
      }
      if (custo !== null) {
        total += custo;
        numericas++;
      }
      itens.push({ rotulo: t.rotulo, modo: t.modo, custo: custo, conta: conta, fonte: t.fonte });
    }
    return { itens: itens, total: total, parcial: parcial, numericas: numericas };
  }

  /* ---- HTML do resultado: o mesmo no servidor e no navegador ------------ */

  function chip(tipo, r) {
    return '<span class="cmp-est cmp-est--' + (tipo === 'nao-publica' ? 'np' : 'nc') + '">' +
      esc(tipo === 'nao-publica' ? r.naoPublica : r.naoConfirmado) + '</span>';
  }

  function totalHtml(res, idioma, r) {
    if (res.parcial) {
      if (!res.total) {
        return '<span class="cmp-custo__valor cmp-custo__valor--vazio">' + chip('nao-publica', r) + '</span>';
      }
      return '<span class="cmp-custo__valor">' + esc(moeda(res.total, idioma)) + '</span>' +
        '<span class="cmp-custo__mais">' + esc(r.maisNaoPublica) + '</span>';
    }
    return '<span class="cmp-custo__valor">' + esc(moeda(res.total, idioma)) + '</span>';
  }

  function cartaoHtml(corretora, deposito, saques, idioma, r) {
    var res = contar(corretora, deposito, saques, idioma, r);
    var somas = [];
    var fontes = [];
    var linhas = res.itens.map(function (it) {
      if (it.fonte && fontes.indexOf(it.fonte) < 0) fontes.push(it.fonte);
      if (it.modo === 'nao-publica' || it.modo === 'nao-confirmado') {
        return '<li><span class="cmp-custo__rot">' + esc(it.rotulo) + '</span> ' + chip(it.modo, r) + '</li>';
      }
      if (it.custo === null) {
        return '<li><span class="cmp-custo__rot">' + esc(it.rotulo) + '</span> ' +
          '<span class="cmp-custo__conta">' + esc(it.conta) + '</span> ' +
          '<span class="cmp-custo__fora">' + esc(r.naoEntra) + '</span></li>';
      }
      if (it.custo > 0) somas.push(moeda(it.custo, idioma));
      return '<li><span class="cmp-custo__rot">' + esc(it.rotulo) + '</span> ' +
        '<span class="cmp-custo__conta">' + esc(it.conta) + '</span></li>';
    });
    var conta = '';
    if (res.numericas) {
      var soma = somas.length > 1 ? somas.join(' + ') + ' = ' + moeda(res.total, idioma) : moeda(res.total, idioma);
      conta = '<li class="cmp-custo__soma"><span class="cmp-custo__rot">' + esc(res.parcial ? r.publicado : r.total) +
        '</span> <span class="cmp-custo__conta">' + esc(soma) +
        (res.parcial ? ' ' + esc(r.maisNaoPublica) : '') + '</span></li>';
    }
    var fontesHtml = fontes.length
      ? '<p class="cmp-custo__fontes"><span>' + esc(r.fontes) + '</span>' + fontes.map(function (f) {
        return '<a class="cmp-ref cmp-ref--so" href="#fonte-' + f + '" aria-label="' + esc(r.fonte + ' ' + f) + '">' +
          '<span class="cmp-ref__n">' + f + '</span></a>';
      }).join('') + '</p>'
      : '';
    return '<li class="cmp-custo__cartao">' +
      '<h3 class="cmp-custo__nome">' + esc(corretora.nome) + '</h3>' +
      '<p class="cmp-custo__total">' + totalHtml(res, idioma, r) + '</p>' +
      '<ul class="cmp-custo__linhas">' + linhas.join('') + conta + '</ul>' +
      fontesHtml +
      '</li>';
  }

  function resultadoHtml(d, deposito, saques) {
    return d.corretoras.map(function (c) {
      return cartaoHtml(c, deposito, saques, d.idioma, d.rot);
    }).join('');
  }

  function exemploTexto(d, deposito, saques) {
    return troca(d.rot.exemplo, {
      dep: moeda(deposito, d.idioma),
      saq: troca(saques === 1 ? d.rot.saqUm : d.rot.saqV, { n: saques })
    });
  }

  var api = {
    moeda: moeda,
    moedaDe: moedaDe,
    pct: pct,
    contar: contar,
    resultadoHtml: resultadoHtml,
    exemploTexto: exemploTexto
  };

  // No gerador (Node) o arquivo só entrega as funções: não há DOM para ligar.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
    return;
  }

  /* ---- navegador -------------------------------------------------------- */

  function ligarCalculadora(raiz) {
    var bruto = raiz.querySelector('script[data-cmp-dados]');
    if (!bruto) return;
    var d;
    try { d = JSON.parse(bruto.textContent); } catch (e) { return; }
    var dep = raiz.querySelector('[data-cmp-deposito]');
    var saq = raiz.querySelector('[data-cmp-saques]');
    var res = raiz.querySelector('[data-cmp-resultado]');
    var ex = raiz.querySelector('[data-cmp-exemplo]');
    if (!dep || !saq || !res) return;

    function valor(el, padrao) {
      var v = parseFloat(String(el.value).replace(',', '.'));
      return isNaN(v) || v < 0 ? padrao : v;
    }

    function recalcular() {
      var deposito = Math.min(valor(dep, 0), 1e12);
      var saques = Math.min(Math.floor(valor(saq, 0)), 99);
      res.innerHTML = resultadoHtml(d, deposito, saques);
      if (ex) ex.textContent = exemploTexto(d, deposito, saques);
    }

    dep.addEventListener('input', recalcular);
    saq.addEventListener('input', recalcular);
    raiz.addEventListener('submit', function (e) { e.preventDefault(); });

    // botões − e + do número de saques (alvo de 44 px; o campo continua digitável)
    Array.prototype.forEach.call(raiz.querySelectorAll('[data-cmp-passo]'), function (b) {
      b.hidden = false;
      b.addEventListener('click', function () {
        var passo = parseInt(b.getAttribute('data-cmp-passo'), 10);
        var novo = Math.max(0, Math.min(valor(saq, 0) + passo, 99));
        saq.value = String(novo);
        recalcular();
      });
    });

    raiz.classList.add('cmp-custo--viva');
    recalcular();
  }

  // Quem clicou num marcador ganha, na fonte, um atalho de volta para a célula de
  // onde veio: a seção de fontes fica no fim da página e o botão "voltar" do
  // celular é longe demais para comparar dois números.
  function ligarMarcadores(escopo) {
    var comRotulo = document.querySelector('[data-cmp-voltar]');
    if (!comRotulo) return;
    var rotulo = comRotulo.getAttribute('data-cmp-voltar') || '';
    escopo.addEventListener('click', function (e) {
      var alvo = e.target && e.target.closest ? e.target.closest('.cmp-ref') : null;
      if (!alvo) return;
      var dest = document.getElementById(alvo.getAttribute('href').slice(1));
      if (!dest) return;
      var origem = alvo.closest('td') || alvo.closest('.cmp-custo__cartao') || alvo;
      if (!origem.id) origem.id = 'cmp-orig-' + (++serial);
      var volta = dest.querySelector('.cmp-voltar');
      if (!volta) {
        volta = document.createElement('a');
        volta.className = 'cmp-voltar';
        dest.appendChild(volta);
      }
      volta.setAttribute('href', '#' + origem.id);
      volta.textContent = rotulo;
    });
  }

  var serial = 0;

  function iniciar() {
    var calculadoras = document.querySelectorAll('.cmp-custo');
    for (var i = 0; i < calculadoras.length; i++) ligarCalculadora(calculadoras[i]);
    ligarMarcadores(document.querySelector('main') || document.body);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
