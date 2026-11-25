/* O touro de luz da hero entra correndo da esquerda e fica galopando no lugar (24/11/2026).
   Pedido do Victor: "através de frames faça com que este touro venha da esquerda pra direita correndo e
   fique correndo parado onde ele está, com efeitos bonitos e elegantes quando o casco bater no chão".
   - Só roda com html.touro-anima: o script da cabeça liga a classe quando há movimento permitido e não há
     economia de dados. Sem ela (ou se este arquivo não chegar em 6 s), o CSS mostra o touro parado.
   - O vídeo (galope em laço, 50 quadros a 32 por segundo) vem por fetch e toca de um blob: o servidor de
     arquivos responde 200 inteiro a pedido parcial (Range), e o Safari não toca vídeo servido assim.
   - A entrada é só transform (Web Animations), desacelerando até o lugar. O canvas anda dentro da caixa
     do touro e desenha, no compasso do vídeo, cada batida do casco: clarão no chão, anéis que se abrem,
     faíscas chutadas para trás e um rastro de luz que corre pelo chão. O chão do vídeo anda para trás
     (a câmera acompanha o touro), e tudo o que nasce no chão anda junto com ele.
   - Fora da tela ou com a aba escondida, vídeo e desenho param. Se o vídeo não vier, fica o parado. */
(() => {
  'use strict';
  const raiz = document.documentElement;
  if (!raiz.classList.contains('touro-anima')) return;
  window.touroVivo = 1;

  const hero = document.querySelector('.hero');
  const caixas = Array.from(document.querySelectorAll('.touro'));
  const parado = el => el.classList.add('touro--parado');
  if (!hero || !caixas.length || !window.fetch || !URL.createObjectURL || !Element.prototype.animate) {
    caixas.forEach(parado);
    return;
  }

  // ---------------------------------------------------------------- medidas do vídeo
  const FPS = 32, QUADROS = 50;
  const CHAO = 376 / 456;     // linha do chão (fração da altura do vídeo)
  const ESTEIRA = 0.46;       // o chão anda 0,46 largura do vídeo por segundo para trás
  const GRAVIDADE = 0.9;      // larguras por segundo²
  // quadro do laço em que o casco toca o chão, x (fração da largura) e força
  const BATIDAS = [
    { q: 5, x: 345 / 800, f: 0.7 },
    { q: 32, x: 722 / 800, f: 1 },
    { q: 38, x: 509 / 800, f: 0.9 },
    { q: 46, x: 400 / 800, f: 0.6 },
  ];

  const estados = new Map();
  const visivel = el => el.getClientRects().length > 0;
  let ativa = null, emTela = true, raf = 0;

  // ---------------------------------------------------------------- vídeo
  function fonte(st) {
    const v = st.video;
    const largura = st.el.getBoundingClientRect().width * Math.min(window.devicePixelRatio || 1, 2) > 860 ? '1600' : '800';
    const tipo = v.canPlayType('video/mp4; codecs="avc1.640028"') ? 'mp4'
      : v.canPlayType('video/webm; codecs="vp9"') ? 'webm' : '';
    const s = tipo && v.querySelector(`source[data-largura="${largura}"][type="video/${tipo}"]`);
    return s ? s.getAttribute('data-src') : '';
  }

  function ficarParado(st) {
    if (st.rodando) return;
    st.parado = true;
    parado(st.el);
  }

  // rede lenta ou vídeo que não toca: em 4,5 s DE TELA À VISTA fica o touro parado. Aba aberta em
  // segundo plano não conta (o Safari não toca vídeo em aba escondida): quem chega depois vê a corrida
  function armar(st) {
    clearTimeout(st.relogio);
    st.relogio = setTimeout(() => { if (!st.rodando && emTela && !document.hidden) ficarParado(st); }, 4500);
  }

  function tocar(st) {
    if (!st.pronto || !emTela || document.hidden) return;
    const p = st.video.play();
    if (p && p.catch) p.catch(e => { if (e && e.name === 'NotAllowedError') ficarParado(st); });
  }

  function preparar(el, semEntrada) {
    if (estados.has(el)) return estados.get(el);
    const st = {
      el, video: el.querySelector('video'), tela: el.querySelector('canvas'),
      batidas: [], faiscas: [], cometas: [], motas: [],
      forca: 0, fAnt: null, tAnt: null, reforco: 1,
    };
    st.ctx = st.tela && st.tela.getContext('2d');
    estados.set(el, st);
    const v = st.video;
    if (!v || !st.ctx) { ficarParado(st); return st; }
    v.muted = true; v.defaultMuted = true; v.playsInline = true; v.loop = true;

    // quem chega depois de uma troca de composição (girar o celular) já está no lugar: o parado
    // aparece na hora e o vídeo entra por cima dele, sem a corrida
    if (semEntrada) ficarParado(st);
    const url = fonte(st);
    if (!url) { ficarParado(st); return st; }
    armar(st);

    v.addEventListener('playing', () => {
      if (st.rodando) return;
      st.rodando = true;
      clearTimeout(st.relogio);
      el.classList.add('touro--rodando');
      if (st.parado) {
        el.classList.add('touro--chegou');
        setTimeout(() => el.classList.remove('touro--parado'), 700);
      } else {
        entrar(st);
      }
      ligar();
    });
    v.addEventListener('error', () => ficarParado(st));

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.blob(); })
      .then(b => {
        v.src = URL.createObjectURL(b);
        st.pronto = true;
        if (ativa === st) tocar(st);
      })
      .catch(() => ficarParado(st));
    return st;
  }

  // ---------------------------------------------------------------- a corrida de entrada
  function entrar(st) {
    const el = st.el;
    const r = el.getBoundingClientRect();
    const pai = el.parentElement.getBoundingClientRect();   // o quadro ou o palco: a máscara recorta nele
    const vw = raiz.clientWidth;
    const rtl = getComputedStyle(el).direction === 'rtl';   // no árabe a cena é espelhada: entra pela direita
    let d = rtl ? Math.min(vw, pai.right) - r.left : r.right - Math.max(0, pai.left);
    d = d / (r.width / el.offsetWidth || 1) + el.offsetWidth * 0.08;   // em px da própria caixa
    d = Math.max(d, el.offsetWidth * 0.6);
    const ms = Math.max(1500, Math.min(2700, 1100 + d * 1.05));
    const a = el.animate(
      [{ transform: `translateX(${-d}px)` }, { transform: 'translateX(0)' }],
      { duration: ms, easing: 'cubic-bezier(.3,.62,.4,1)' });
    a.onfinish = () => { el.classList.add('touro--chegou'); st.reforco = 1.3; };
  }

  // ---------------------------------------------------------------- canvas dos efeitos
  function medir(st) {
    const w = st.el.offsetWidth, h = st.el.offsetHeight;
    if (!w || !h) return false;
    const dpr = Math.min(window.devicePixelRatio || 1, w > 700 ? 1.25 : 2);
    const cw = Math.round(w * 1.7 * dpr), ch = Math.round(h * 1.35 * dpr);
    if (st.tela.width !== cw || st.tela.height !== ch) { st.tela.width = cw; st.tela.height = ch; }
    if (st.W !== w) st.motas = [];
    st.W = w; st.H = h; st.dpr = dpr;
    st.esc = Math.max(0.7, Math.min(1.25, w / 900));
    if (!st.motas.length) semear(st);
    return true;
  }

  // a poeira de luz rente ao chão: mais densa perto da linha e mais rápida quanto mais à frente
  function semear(st) {
    const W = st.W, chao = CHAO * st.H;
    for (let i = 0; i < 34; i++) {
      const prof = Math.random();
      st.motas.push({
        x: -0.45 * W + Math.random() * 1.65 * W,
        y: chao - 0.006 * W + prof * prof * 0.05 * W,
        vel: 0.85 + prof * 0.35,
        tam: 0.6 + Math.random() * 0.9,
        fase: Math.random() * 6.283,
      });
    }
  }

  function bater(st, b, agora) {
    const W = st.W, s = b.f * st.reforco;
    st.reforco = 1;
    const x = b.x * W, y = CHAO * st.H;
    st.batidas.push({ x, y, s, t: agora });
    const n = Math.round(6 + 8 * b.f);
    for (let i = 0; i < n; i++) {
      st.faiscas.push({
        x: x + (Math.random() - 0.5) * 0.02 * W, y: y - 0.004 * W,
        vx: (-0.04 - Math.random() * 0.3) * W * s,      // chutadas para trás
        vy: (-0.15 - Math.random() * 0.36) * W * s,
        vida: 0.45 + Math.random() * 0.5, t: agora, tam: 0.7 + Math.random() * 0.9,
      });
    }
    if (b.f >= 0.85) st.cometas.push({ x, y, s, t: agora });
  }

  function desenhar(st, agora) {
    const v = st.video, ctx = st.ctx;
    if (!st.W && !medir(st)) return;
    const W = st.W, H = st.H, dpr = st.dpr, esc = st.esc;
    const dt = st.tAnt == null ? 0 : Math.min(0.05, (agora - st.tAnt) / 1000);
    st.tAnt = agora;
    st.forca = Math.min(1, st.forca + dt / 0.6);

    // a batida do casco sai do compasso do VÍDEO (quadro do laço), nunca de um relógio à parte
    const dur = isFinite(v.duration) && v.duration > 0 ? v.duration : QUADROS / FPS;
    const f = ((v.currentTime % dur) / dur) * QUADROS;
    if (st.fAnt != null && !v.paused) {
      const a = st.fAnt;
      let b = f;
      if (b < a) b += QUADROS;
      if (b - a < 12) {
        for (const bt of BATIDAS) {
          if ((bt.q > a && bt.q <= b) || (bt.q + QUADROS > a && bt.q + QUADROS <= b)) bater(st, bt, agora);
        }
      }
    }
    st.fAnt = f;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, st.tela.width, st.tela.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0.5 * W * dpr, 0.15 * H * dpr);
    ctx.globalCompositeOperation = 'lighter';
    const F = st.forca;
    const chao = ESTEIRA * W;   // px por segundo, para trás

    // 1. poeira de luz rente ao chão, acesa perto do touro
    for (const m of st.motas) {
      m.x -= chao * m.vel * dt;
      if (m.x < -0.48 * W) m.x += 1.66 * W;
      const j = (m.x - 0.55 * W) / (0.42 * W);
      const al = 0.5 * F * Math.exp(-j * j) * (0.55 + 0.45 * Math.sin(agora / 1000 * 2.2 + m.fase));
      if (al < 0.02) continue;
      const t = m.tam * esc;
      ctx.fillStyle = `rgba(170,220,255,${al.toFixed(3)})`;
      ctx.fillRect(m.x - t / 2, m.y - t / 2, t, t);
    }

    // 2. cada batida: clarão no chão e anéis que se abrem (o eco só nas batidas fortes)
    st.batidas = st.batidas.filter(b => (agora - b.t) / 1000 < 1.05);
    for (const b of st.batidas) {
      const a = (agora - b.t) / 1000;
      const x = b.x - chao * a;
      if (a < 0.5) {
        const k = 1 - a / 0.5, al = 0.5 * b.s * k * k * F;
        const R = W * (0.05 + 0.05 * b.s) * (1 + 0.5 * (1 - k));
        ctx.save();
        ctx.translate(x, b.y);
        ctx.scale(1, 0.24);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
        g.addColorStop(0, `rgba(230,244,255,${al.toFixed(3)})`);
        g.addColorStop(0.3, `rgba(120,196,255,${(al * 0.55).toFixed(3)})`);
        g.addColorStop(1, 'rgba(64,160,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(-R, -R, 2 * R, 2 * R);
        ctx.restore();
      }
      for (let i = 0; i < (b.s >= 0.85 ? 2 : 1); i++) {
        const ai = a - i * 0.12;
        if (ai <= 0 || ai >= 0.85) continue;
        const p = ai / 0.85, e = 1 - Math.pow(1 - p, 3);
        const rx = W * (0.015 + 0.12 * b.s * e), ry = rx * 0.2;
        const al = (i ? 0.35 : 0.7) * b.s * Math.pow(1 - p, 1.6) * F;
        ctx.beginPath();
        ctx.ellipse(x, b.y, rx, ry, 0, 0, 6.2832);
        ctx.lineWidth = 4 * esc * (1 - 0.5 * p);
        ctx.strokeStyle = `rgba(64,160,255,${(al * 0.25).toFixed(3)})`;
        ctx.stroke();
        ctx.lineWidth = 1.2 * esc * (1 - 0.5 * p);
        ctx.strokeStyle = `rgba(190,228,255,${al.toFixed(3)})`;
        ctx.stroke();
      }
    }

    // 3. o rastro de luz que corre pelo chão, para trás, nas batidas fortes
    st.cometas = st.cometas.filter(c => (agora - c.t) / 1000 < 0.6);
    for (const c of st.cometas) {
      const a = (agora - c.t) / 1000, p = a / 0.6;
      const cab = c.x - (ESTEIRA + 0.85) * W * a, L = W * 0.16 * (1 - 0.5 * p);
      const al = 0.65 * c.s * Math.pow(1 - p, 1.3) * F;
      const g = ctx.createLinearGradient(cab, 0, cab + L, 0);
      g.addColorStop(0, `rgba(225,242,255,${al.toFixed(3)})`);
      g.addColorStop(1, 'rgba(120,196,255,0)');
      ctx.strokeStyle = g;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cab, c.y + 0.003 * W);
      ctx.lineTo(cab + L, c.y + 0.003 * W);
      ctx.lineWidth = 4 * esc;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.lineWidth = 1.4 * esc;
      ctx.globalAlpha = 1;
      ctx.stroke();
    }

    // 4. faíscas chutadas para trás: no ar elas ficam no mundo, então andam com o chão
    const piso = CHAO * H + 0.01 * W;
    st.faiscas = st.faiscas.filter(s => (agora - s.t) / 1000 < s.vida && s.y < piso);
    ctx.lineCap = 'round';
    for (const s of st.faiscas) {
      const vx = s.vx - chao;
      s.vy += GRAVIDADE * W * dt;
      s.x += vx * dt;
      s.y += s.vy * dt;
      const al = Math.pow(1 - (agora - s.t) / 1000 / s.vida, 1.2) * F;
      ctx.lineWidth = s.tam * esc;
      ctx.strokeStyle = `rgba(150,210,255,${(al * 0.75).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - vx * 0.035, s.y - s.vy * 0.035);
      ctx.stroke();
      const t = s.tam * esc * 1.3;
      ctx.fillStyle = `rgba(235,247,255,${al.toFixed(3)})`;
      ctx.fillRect(s.x - t / 2, s.y - t / 2, t, t);
    }
  }

  // ---------------------------------------------------------------- laço, tela e troca de composição
  function quadro(agora) {
    raf = 0;
    if (!ativa || !ativa.rodando || !emTela || document.hidden) return;
    desenhar(ativa, agora);
    raf = requestAnimationFrame(quadro);
  }

  function ligar() {
    if (!ativa) return;
    if (emTela && !document.hidden) {
      if (!ativa.rodando && !ativa.parado && ativa.video) armar(ativa);
      if (ativa.video && ativa.video.paused) tocar(ativa);
      ativa.tAnt = null;
      if (!raf && ativa.rodando) raf = requestAnimationFrame(quadro);
    } else if (ativa.video && !ativa.video.paused) {
      ativa.video.pause();
    }
  }

  function escolher(semEntrada) {
    const nova = caixas.find(visivel) || null;
    if (nova && estados.has(nova) && ativa && ativa.el === nova) { medir(ativa); return; }
    if (ativa && ativa.video && !ativa.video.paused) ativa.video.pause();
    ativa = nova ? preparar(nova, semEntrada) : null;
    if (ativa) { ativa.W = 0; ligar(); }
  }

  new IntersectionObserver(es => { emTela = es[es.length - 1].isIntersecting; ligar(); }).observe(hero);
  document.addEventListener('visibilitychange', ligar);
  let espera = 0;
  window.addEventListener('resize', () => {
    clearTimeout(espera);
    espera = setTimeout(() => escolher(true), 180);
  });
  escolher(false);
})();
