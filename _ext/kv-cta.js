/* kv-cta.js: quem pulsa e quando (rede Safirion; nasceu no safirion.com.co em 25/11/2026, virou kit no mesmo dia).
   Um botão por vez: o do popup quando ele está à vista, o do menu do celular quando está aberto, senão o da página
   mais perto do meio da tela (≥50% à vista e opacidade efetiva ≥0,9), e a barra do topo só quando nenhum outro
   aparece. A hero pulsa na batida do casco do touro (evento touro:batida), no máx. 1 a cada 4,2 s. Teto: 3 pulsos por
   botão no ritmo cheio, depois 1 a cada 14 s. Aba escondida, mouse em cima e "menos movimento" = sem pulso. Sem JS o
   botão fica parado e inteiro (o HTML já sai pronto do aplicar-kv-cta.py).
   Configuração no próprio <script>: data-dinamico="<seletor>=><variante>;..." para botões que outro script cria depois
   (padrão: o do popup v5, ".pp4__btn=>popup"). API para medir: window.kvCta = {pulsa, botoes, escolhe, parar, seguir}. */
(function(){
  if(window.kvCta)return;
  var d=document,eu=d.currentScript,calmo=matchMedia('(prefers-reduced-motion: reduce)'),fino=matchMedia('(hover: hover) and (pointer: fine)');
  var SETA='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var dinamico=((eu&&eu.dataset.dinamico)||'.pp4__btn=>popup').split(';').map(function(p){var x=p.split('=>');return{sel:x[0].trim(),v:(x[1]||'').trim()};}).filter(function(x){return x.sel;});
  var parado=false,botoes=[],vis=new WeakMap(),ultimo=-1e9,ultimoEl=null,t0=performance.now();
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){vis.set(e.target,e.isIntersecting?e.intersectionRatio:0);});},{threshold:[0,.5,1]}):null;
  function tem(a,v){return a.classList.contains('kv-cta--'+v);}
  /* o anel abre 11px por lado; na barra o vão até o vizinho é curto: lá ele abre 6px (4px abaixo de 360) */
  function medir(a){var r=a.getBoundingClientRect();if(r.width&&r.height){var k=tem(a,'barra')?(innerWidth<360?8:12):22;
    a.style.setProperty('--kv-cta-sx',(1+k/r.width).toFixed(4));a.style.setProperty('--kv-cta-sy',(1+k/r.height).toFixed(4));}}
  /* texto em CAIXA ALTA vira frase ("CREAR CUENTA" → "Crear cuenta"), com o nome da marca preservado */
  function frase(t){t=(t||'').replace(/\s+/g,' ').trim();if(t&&t===t.toUpperCase()&&/[A-ZÁÉÍÓÚÃÕÇÑ]/.test(t)){t=t.toLowerCase();t=t.charAt(0).toUpperCase()+t.slice(1);t=t.replace(/safirion/gi,'Safirion');}return t;}
  function prepara(a){
    if(a.__kvCta)return;a.__kvCta=1;
    if(!a.querySelector('.kv-cta__txt')){var t=d.createElement('span');t.className='kv-cta__txt';t.textContent=frase(a.textContent);a.textContent='';a.appendChild(t);}
    if(!a.querySelector('.kv-cta__luz'))a.insertAdjacentHTML('afterbegin','<span class="kv-cta__luz" aria-hidden="true"></span>');
    if(!a.querySelector('.kv-cta__seta'))a.insertAdjacentHTML('beforeend','<span class="kv-cta__seta" aria-hidden="true">'+SETA+'</span>');
    botoes.push(a);medir(a);if(io)io.observe(a);
    a.addEventListener('pointermove',function(e){if(!fino.matches||calmo.matches)return;var r=a.getBoundingClientRect();
      a.style.setProperty('--kv-cta-mx',(((e.clientX-r.left)/r.width-.5)*6).toFixed(2)+'px');a.style.setProperty('--kv-cta-my',(((e.clientY-r.top)/r.height-.5)*4).toFixed(2)+'px');});
    a.addEventListener('pointerleave',function(){a.style.removeProperty('--kv-cta-mx');a.style.removeProperty('--kv-cta-my');});
  }
  /* opacidade que a pessoa VÊ: o bloco da seção ainda revelando (opacity 0 → 1) não pulsa, o pulso se perderia */
  function opaco(a){var o=1;for(var e=a;e&&e!==d.body;e=e.parentElement){var c=getComputedStyle(e);if(c.visibility==='hidden'||c.display==='none')return false;o*=+c.opacity;if(o<.9)return false;}return true;}
  function naTela(a){var r=a.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;}
  function primeiro(v){for(var i=0;i<botoes.length;i++){var a=botoes[i];if(a.isConnected&&tem(a,v)&&naTela(a)&&opaco(a))return a;}return null;}
  function escolhe(){
    var b=primeiro('popup');if(b)return{el:b,ciclo:4200};
    b=primeiro('menu');if(b)return{el:b,ciclo:4200};
    var meio=innerHeight/2,melhor=null,dist=1e9;
    botoes.forEach(function(a){if(!a.isConnected||tem(a,'barra')||tem(a,'menu')||tem(a,'popup'))return;if(io&&(vis.get(a)||0)<.5)return;
      if(!naTela(a)||!opaco(a))return;var r=a.getBoundingClientRect(),q=Math.abs(r.top+r.height/2-meio);if(q<dist){dist=q;melhor=a;}});
    if(melhor)return{el:melhor,ciclo:tem(melhor,'hero')?6500:5200};
    b=primeiro('barra');return b?{el:b,ciclo:9000}:null;
  }
  /* o que não depende do botão vem antes de escolher: com a aba escondida, "menos movimento" ou logo depois de um
     pulso, o agendador nem mede a página */
  function livre(){return !parado&&!d.hidden&&!calmo.matches&&performance.now()-t0>1200;}
  /* mouse em cima cala o pulso; no toque o :hover gruda depois do toque e calaria o botão para sempre */
  function pode(a){return livre()&&!(fino.matches&&a.matches(':hover'));}
  /* os 3 primeiros pulsos de cada botão no ritmo cheio, depois um a cada 14 s (o que pisca sempre o olho aprende a
     ignorar; WCAG 2.2.2). Botão novo na tela volta ao ritmo cheio */
  function espera(a,base){return (a.__kvN||0)>=3?Math.max(base,14000):base;}
  function pulsa(a){a.classList.remove('kv-cta--pulso');void a.offsetWidth;a.classList.add('kv-cta--pulso');ultimo=performance.now();ultimoEl=a;
    a.__kvN=(a.__kvN||0)+1;clearTimeout(a.__kvT);a.__kvT=setTimeout(function(){a.classList.remove('kv-cta--pulso');},1400);}
  function tick(){if(!livre())return;var p=performance.now()-ultimo;if(p<1800)return;var c=escolhe();if(!c||!pode(c.el))return;
    if((c.el!==ultimoEl&&(c.el.__kvN||0)<3)||p>=espera(c.el,c.ciclo))pulsa(c.el);}
  addEventListener('touro:batida',function(){if(!livre())return;var p=performance.now()-ultimo;if(p<4200)return;var c=escolhe();
    if(c&&tem(c.el,'hero')&&pode(c.el)&&p>=espera(c.el,4200))pulsa(c.el);});
  /* botão que sai do documento (popup fechado) sai também da lista e do observador */
  function limpa(){for(var i=botoes.length-1;i>=0;i--)if(!botoes[i].isConnected){if(io)io.unobserve(botoes[i]);botoes.splice(i,1);}}
  var agendado=false;
  function novos(){agendado=false;limpa();
    dinamico.forEach(function(x){[].forEach.call(d.querySelectorAll(x.sel),function(b){if(b.__kvCta)return;b.classList.add('kv-cta');if(x.v)b.classList.add('kv-cta--'+x.v);prepara(b);});});
    [].forEach.call(d.querySelectorAll('.kv-cta'),prepara);}
  function inicia(){
    [].forEach.call(d.querySelectorAll('.kv-cta'),prepara);novos();
    if('MutationObserver' in window)new MutationObserver(function(){if(!agendado){agendado=true;requestAnimationFrame(novos);}}).observe(d.body,{childList:true,subtree:true});
    setInterval(tick,300);
    addEventListener('resize',function(){botoes.forEach(medir);},{passive:true});
    if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){botoes.forEach(medir);});
    window.kvCta={pulsa:pulsa,botoes:botoes,escolhe:escolhe,parar:function(){parado=true;},seguir:function(){parado=false;}};
  }
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',inicia);else inicia();
})();
