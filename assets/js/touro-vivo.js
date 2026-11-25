/* O touro de luz da hero entra correndo da esquerda e fica galopando no lugar (24/11/2026).
   Pedido do Victor: "através de frames faça com que este touro venha da esquerda pra direita correndo e
   fique correndo parado onde ele está, com efeitos bonitos e elegantes quando o casco bater no chão".
   - Só roda com html.touro-anima: o script da cabeça liga a classe quando há movimento permitido e não há
     economia de dados. Sem ela (ou se este arquivo não chegar em 6 s), o CSS mostra o touro parado.
   - Dois jeitos de mostrar o galope (50 quadros a 32 por segundo, em laço):
     1. VÍDEO, que vem por fetch e toca de um blob (o servidor de arquivos responde 200 inteiro a pedido
        parcial, e o Safari não toca vídeo servido assim). É o caminho leve: a placa de vídeo decodifica.
     2. IMAGEM ANIMADA (WebP), quando o vídeo não pode tocar. O Safari em modo de pouca energia (Mac na
        bateria, iPhone em economia) recusa play() de vídeo mudo, e imagem animada não passa por essa regra.
        Em 25/11/2026 o Victor viu, no Safari do Mac em pouca energia, o touro "aparecer feio por um
        instante e sumir sem voltar": o vídeo era dado como tocando sem mostrar quadro nenhum.
        WebP e não AVIF: o Safari decodifica imagem pelo ImageIO, e num M1 em pouca energia o quadro de
        1600 leva 11 ms em WebP contra 190 ms em AVIF (o AVIF tocaria a ~5 quadros por segundo).
        A recusa se descobre ANTES de baixar o vídeo: play() no próprio <video>, ainda sem fonte, é
        recusado na hora em pouca energia; fora dela fica pendente e cai quieto quando a fonte chega.
   - Regra que impede o touro de sumir: o parado só sai quando algo que ANDA está à vista. O vídeo só
     conta como tocando depois de o tempo dele avançar de verdade na tela; se parar sozinho (sistema,
     energia), o parado volta na hora e a imagem animada assume.
   - A entrada é só transform (Web Animations), desacelerando até o lugar. O canvas anda dentro da caixa
     do touro e desenha, no compasso do galope, cada batida do casco: clarão no chão, anéis que se abrem,
     faíscas chutadas para trás e um rastro de luz que corre pelo chão. O chão do galope anda para trás
     (a câmera acompanha o touro), e tudo o que nasce no chão anda junto com ele.
   - Fora da tela ou com a aba escondida, vídeo e desenho param. */
(() => {
  'use strict';
  const raiz = document.documentElement;
  if (!raiz.classList.contains('touro-anima')) return;
  window.touroVivo = 1;

  const hero = document.querySelector('.hero');
  const caixas = Array.from(document.querySelectorAll('.touro'));
  if (!hero || !caixas.length || !window.fetch || !URL.createObjectURL || !Element.prototype.animate) {
    caixas.forEach(el => el.classList.add('touro--parado'));
    return;
  }

  // ---------------------------------------------------------------- medidas do galope
  const FPS = 32, QUADROS = 50;
  const CHAO = 376 / 456;     // linha do chão (fração da altura do quadro)
  const ESTEIRA = 0.46;       // o chão anda 0,46 largura do quadro por segundo para trás
  const GRAVIDADE = 0.9;      // larguras por segundo²
  // quadro do laço em que o casco toca o chão, x (fração da largura) e força
  const BATIDAS = [
    { q: 5, x: 345 / 800, f: 0.7 },
    { q: 32, x: 722 / 800, f: 1 },
    { q: 38, x: 509 / 800, f: 0.9 },
    { q: 46, x: 400 / 800, f: 0.6 },
  ];
  // o mesmo galope em imagem animada (webp-animado.py na oficina gera a partir do vídeo)
  const IMAGEM = {
    800: '/assets/img/touro/touro-galope-800.webp?v=e0d0465e',
    1600: '/assets/img/touro/touro-galope-1600.webp?v=ad5dc9aa',
  };
  const PROVA_MS = 1500;      // o vídeo tem este tempo, depois de aceitar o play(), para andar na tela
  const PARADO_MS = 1200;     // vídeo à vista sem avançar por este tempo = parou sozinho

  const estados = new Map();
  const visivel = el => el.getClientRects().length > 0;
  const agora = () => performance.now();
  let ativa = null, emTela = true, raf = 0;
  const aVista = () => emTela && !document.hidden;

  function largura(st) {
    return st.el.getBoundingClientRect().width * Math.min(window.devicePixelRatio || 1, 2) > 860 ? '1600' : '800';
  }

  function fonte(st) {
    const v = st.video;
    const tipo = v.canPlayType('video/mp4; codecs="avc1.640028"') ? 'mp4'
      : v.canPlayType('video/webm; codecs="vp9"') ? 'webm' : '';
    const s = tipo && v.querySelector(`source[data-largura="${largura(st)}"][type="video/${tipo}"]`);
    return s ? s.getAttribute('data-src') : '';
  }

  // ---------------------------------------------------------------- fases: esperando → rodando | parado
  // esperando: nada à vista ainda (o touro vai entrar correndo). parado: o quadro parado à vista.
  // rodando: vídeo ou imagem animada à vista, andando.
  function mostrarParado(st) {
    if (st.fase === 'parado') return;
    st.fase = 'parado';
    st.rodando = false;
    clearTimeout(st.tiraParado);
    st.el.classList.add('touro--parado');
    st.el.classList.remove('touro--rodando');
  }

  function rodar(st) {
    if (st.fase === 'rodando') return;
    const vinhaParado = st.fase === 'parado';
    st.fase = 'rodando';
    st.rodando = true;
    st.provando = 0;
    clearTimeout(st.relogio);
    clearTimeout(st.relogioPlay);
    const el = st.el;
    el.classList.toggle('touro--imagem', st.modo === 'imagem');
    el.classList.add('touro--rodando');
    if (vinhaParado) {
      // o parado sai só depois de o galope acender por cima dele (troca suave, sem vão)
      el.classList.add('touro--chegou');
      clearTimeout(st.tiraParado);
      st.tiraParado = setTimeout(() => { if (st.fase === 'rodando') el.classList.remove('touro--parado'); }, 700);
    } else if (!st.entrou) {
      st.entrou = true;
      entrar(st);
    }
    ligar();
  }

  // rede lenta: em 4,5 s DE TELA À VISTA sem nada andando, fica o touro parado (e o galope entra por cima
  // quando chegar). Aba aberta em segundo plano não conta: quem chega depois vê a corrida
  function armar(st) {
    clearTimeout(st.relogio);
    st.relogio = setTimeout(() => { if (st.fase === 'esperando' && aVista()) mostrarParado(st); }, 4500);
  }

  // ---------------------------------------------------------------- vídeo
  function tocar(st) {
    const v = st.video;
    if (st.modo !== 'video' || !st.pronto || !aVista() || !v.paused) return;
    st.pausaNossa = false;
    const p = v.play();
    // play() que nem aceita nem recusa (já visto no Safari) não pode prender o touro: 3 s e vai a imagem
    clearTimeout(st.relogioPlay);
    st.relogioPlay = setTimeout(() => {
      if (st.modo === 'video' && !st.provando && st.fase !== 'rodando' && aVista()) usarImagem(st);
    }, 3000);
    if (p && p.then) {
      p.then(() => provar(st), e => {
        // pause() nosso no meio do play() (rolou para fora) não é recusa; o resto é: pouca energia,
        // política de reprodução automática, formato
        if (e && e.name === 'AbortError' && st.pausaNossa) return;
        usarImagem(st);
      });
    }
  }

  function pausar(st) {
    const v = st.video;
    if (v && !v.paused) { st.pausaNossa = true; v.pause(); }
  }

  // o vídeo só vale como tocando depois de o tempo dele andar na tela (o laço de quadros conta)
  function provar(st) {
    if (st.modo !== 'video' || st.fase === 'rodando' || st.provando) return;
    st.provando = agora();
    st.avancos = 0;
    st.ctAnt = st.video.currentTime;
    if (!raf) raf = requestAnimationFrame(quadro);
  }

  function vigiarVideo(st, t) {
    const v = st.video, ct = v.currentTime;
    if (ct !== st.ctAnt && !v.paused) { st.ctAnt = ct; st.avancos++; st.ultimoAvanco = t; }
    if (st.provando) {
      if (st.avancos >= 3) rodar(st);
      else if (t - st.provando > PROVA_MS) usarImagem(st);
    } else if (st.fase === 'rodando' && t - st.ultimoAvanco > PARADO_MS) {
      usarImagem(st);
    }
  }

  // ---------------------------------------------------------------- imagem animada (quando o vídeo não pode)
  function usarImagem(st) {
    if (st.modo === 'imagem') return;
    const tocava = st.fase === 'rodando';
    st.modo = 'imagem';
    st.provando = 0;
    clearTimeout(st.relogioPlay);
    pausar(st);
    // o vídeo parou à vista: o parado volta na hora, e a imagem entra por cima dele quando decodificar
    if (tocava) mostrarParado(st);
    // sem nada à vista, a imagem tem 2,5 s para chegar; depois disso fica o parado e ela entra por cima
    if (st.fase === 'esperando') {
      clearTimeout(st.relogio);
      st.relogio = setTimeout(() => { if (st.fase === 'esperando' && aVista()) mostrarParado(st); }, 2500);
    }
    fetch(IMAGEM[largura(st)])
      .then(r => { if (!r.ok) throw new Error(r.status); return r.blob(); })
      .then(b => { st.blobImagem = b; if (ativa === st && aVista()) acenderImagem(st); })
      .catch(() => mostrarParado(st));
  }

  // cada (re)início da imagem nasce de um endereço próprio do blob: a animação começa do quadro 0 na hora
  // em que aparece, e o relógio das batidas parte dali (o canvas não lê o quadro de imagem animada: o
  // navegador entrega sempre o 1º, regra da especificação)
  function acenderImagem(st) {
    if (!st.blobImagem || st.acendendo) return;
    st.acendendo = true;
    const img = new Image();
    img.className = 'touro__img';
    img.alt = '';
    img.decoding = 'async';
    img.draggable = false;
    const url = URL.createObjectURL(st.blobImagem);
    img.src = url;
    const pronto = img.decode ? img.decode() : new Promise((ok, erro) => { img.onload = ok; img.onerror = erro; });
    pronto.then(() => {
      st.acendendo = false;
      if (st.modo !== 'imagem') { URL.revokeObjectURL(url); return; }
      const velha = st.img;
      st.el.insertBefore(img, st.el.querySelector('.touro__brilho'));
      if (velha) { velha.remove(); URL.revokeObjectURL(velha.src); }
      st.img = img;
      st.fAnt = null;
      requestAnimationFrame(t => { st.t0 = t; });
      st.t0 = agora() + 16;
      rodar(st);
    }, () => {
      st.acendendo = false;
      URL.revokeObjectURL(url);
      mostrarParado(st);
    });
  }

  // ---------------------------------------------------------------- preparo de cada caixa
  function preparar(el, semEntrada) {
    if (estados.has(el)) return estados.get(el);
    const st = {
      el, video: el.querySelector('video'), tela: el.querySelector('canvas'),
      fase: 'esperando', modo: 'video', rodando: false,
      batidas: [], faiscas: [], cometas: [], motas: [],
      forca: 0, fAnt: null, tAnt: null, reforco: 1,
    };
    st.ctx = st.tela && st.tela.getContext('2d');
    estados.set(el, st);
    if (!st.ctx) { mostrarParado(st); return st; }

    // quem chega depois de uma troca de composição (girar o celular) já está no lugar: o parado
    // aparece na hora e o galope entra por cima dele, sem a corrida
    if (semEntrada) mostrarParado(st);
    armar(st);
    const v = st.video;
    const url = v ? fonte(st) : '';
    if (!url) { usarImagem(st); return st; }
    v.muted = true; v.defaultMuted = true; v.playsInline = true; v.loop = true;

    v.addEventListener('playing', () => provar(st));
    // pausa que não fomos nós que pedimos, com o touro à vista: o sistema parou o vídeo
    v.addEventListener('pause', () => {
      if (!st.pausaNossa && st.modo === 'video' && aVista() && (st.fase === 'rodando' || st.provando)) usarImagem(st);
    });
    v.addEventListener('error', () => usarImagem(st));

    // sondagem de pouca energia: play() sem fonte é recusado na hora quando o Safari não deixa tocar vídeo
    // sozinho; aí nem se baixa o vídeo. Com permissão, a promessa fica pendente e cai (AbortError) quando a
    // fonte entra: é ignorada, e quem toca é o tocar() de sempre
    const corte = window.AbortController ? new AbortController() : null;
    if (aVista()) {
      try {
        const sonda = v.play();
        if (sonda && sonda.catch) sonda.catch(e => {
          if (e && e.name === 'NotAllowedError' && st.modo === 'video' && !st.pronto) {
            if (corte) corte.abort();
            usarImagem(st);
          }
        });
      } catch (e) { /* navegador antigo sem promessa: segue pelo caminho normal */ }
    }

    fetch(url, corte ? { signal: corte.signal } : undefined)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.blob(); })
      .then(b => {
        if (st.modo !== 'video') return;
        v.src = URL.createObjectURL(b);
        st.pronto = true;
        if (ativa === st) tocar(st);
      })
      .catch(() => { if (st.modo === 'video') usarImagem(st); });
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

  function bater(st, b, t) {
    const W = st.W, s = b.f * st.reforco;
    st.reforco = 1;
    const x = b.x * W, y = CHAO * st.H;
    st.batidas.push({ x, y, s, t });
    const n = Math.round(6 + 8 * b.f);
    for (let i = 0; i < n; i++) {
      st.faiscas.push({
        x: x + (Math.random() - 0.5) * 0.02 * W, y: y - 0.004 * W,
        vx: (-0.04 - Math.random() * 0.3) * W * s,      // chutadas para trás
        vy: (-0.15 - Math.random() * 0.36) * W * s,
        vida: 0.45 + Math.random() * 0.5, t, tam: 0.7 + Math.random() * 0.9,
      });
    }
    if (b.f >= 0.85) st.cometas.push({ x, y, s, t });
  }

  // em que quadro do laço o galope está agora: no vídeo, pelo tempo do próprio vídeo; na imagem animada,
  // pelo relógio contado do quadro 0 de quando ela apareceu
  function quadroDoGalope(st, t) {
    if (st.modo === 'imagem') {
      if (t < st.t0) return null;
      return (((t - st.t0) / 1000) * FPS) % QUADROS;
    }
    const v = st.video;
    if (v.paused) return null;
    const dur = isFinite(v.duration) && v.duration > 0 ? v.duration : QUADROS / FPS;
    return ((v.currentTime % dur) / dur) * QUADROS;
  }

  function desenhar(st, t) {
    const ctx = st.ctx;
    if (!st.W && !medir(st)) return;
    const W = st.W, H = st.H, dpr = st.dpr, esc = st.esc;
    const dt = st.tAnt == null ? 0 : Math.min(0.05, (t - st.tAnt) / 1000);
    st.tAnt = t;
    st.forca = Math.min(1, st.forca + dt / 0.6);

    // a batida do casco sai do compasso do GALOPE (quadro do laço), nunca de um relógio solto
    const f = quadroDoGalope(st, t);
    if (st.fAnt != null && f != null) {
      const a = st.fAnt;
      let b = f;
      if (b < a) b += QUADROS;
      if (b - a < 12) {
        for (const bt of BATIDAS) {
          if ((bt.q > a && bt.q <= b) || (bt.q + QUADROS > a && bt.q + QUADROS <= b)) bater(st, bt, t);
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
      const al = 0.5 * F * Math.exp(-j * j) * (0.55 + 0.45 * Math.sin(t / 1000 * 2.2 + m.fase));
      if (al < 0.02) continue;
      const tm = m.tam * esc;
      ctx.fillStyle = `rgba(170,220,255,${al.toFixed(3)})`;
      ctx.fillRect(m.x - tm / 2, m.y - tm / 2, tm, tm);
    }

    // 2. cada batida: clarão no chão e anéis que se abrem (o eco só nas batidas fortes)
    st.batidas = st.batidas.filter(b => (t - b.t) / 1000 < 1.05);
    for (const b of st.batidas) {
      const a = (t - b.t) / 1000;
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
    st.cometas = st.cometas.filter(c => (t - c.t) / 1000 < 0.6);
    for (const c of st.cometas) {
      const a = (t - c.t) / 1000, p = a / 0.6;
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
    st.faiscas = st.faiscas.filter(s => (t - s.t) / 1000 < s.vida && s.y < piso);
    ctx.lineCap = 'round';
    for (const s of st.faiscas) {
      const vx = s.vx - chao;
      s.vy += GRAVIDADE * W * dt;
      s.x += vx * dt;
      s.y += s.vy * dt;
      const al = Math.pow(1 - (t - s.t) / 1000 / s.vida, 1.2) * F;
      ctx.lineWidth = s.tam * esc;
      ctx.strokeStyle = `rgba(150,210,255,${(al * 0.75).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - vx * 0.035, s.y - s.vy * 0.035);
      ctx.stroke();
      const tm = s.tam * esc * 1.3;
      ctx.fillStyle = `rgba(235,247,255,${al.toFixed(3)})`;
      ctx.fillRect(s.x - tm / 2, s.y - tm / 2, tm, tm);
    }
  }

  // ---------------------------------------------------------------- laço, tela e troca de composição
  function quadro(t) {
    raf = 0;
    const st = ativa;
    if (!st || !aVista()) return;
    if (st.modo === 'video' && st.pronto) vigiarVideo(st, t);
    if (st.fase === 'rodando') desenhar(st, t);
    if (st.fase === 'rodando' || st.provando) raf = requestAnimationFrame(quadro);
  }

  function ligar() {
    const st = ativa;
    if (!st) return;
    if (aVista()) {
      const t = agora();
      if (st.fase === 'esperando') armar(st);
      if (st.modo === 'video') {
        // o vídeo ficou pausado por nós enquanto escondido: o prazo de andar recomeça agora
        st.ultimoAvanco = t;
        if (st.provando) st.provando = t;
        tocar(st);
      } else if (st.blobImagem && (st.fase !== 'rodando' || st.escondida)) {
        // a imagem animada para fora da vista; na volta ela recomeça do quadro 0 e o relógio também
        acenderImagem(st);
      }
      st.escondida = false;
      st.tAnt = null;
      if (!raf && (st.fase === 'rodando' || st.provando)) raf = requestAnimationFrame(quadro);
    } else {
      st.escondida = true;
      pausar(st);
    }
  }

  function escolher(semEntrada) {
    const nova = caixas.find(visivel) || null;
    if (nova && estados.has(nova) && ativa && ativa.el === nova) { medir(ativa); return; }
    if (ativa) { pausar(ativa); ativa.escondida = true; }
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
