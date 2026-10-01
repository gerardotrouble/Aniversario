(() => {
  'use strict';

  /* =========================================================
     CONFIGURACIÓN — edita aquí o usa parámetros en la URL:
     ?para=Nombre&de=Nombre&fecha=AAAA-MM-DD
     ========================================================= */
  function parseDate(v) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
    if (!m) return null;
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    return isNaN(d) ? null : d;
  }
  const qs = new URLSearchParams(location.search);
  const CONFIG = {
    to: (qs.get('para') || 'Mi Esposa').trim().slice(0, 40),
    from: (qs.get('de') || 'Tu Esposo').trim().slice(0, 40),
    start: parseDate(qs.get('fecha')) || new Date(2023, 9, 1),   // Fecha en que empezó su historia
    story: [
      { t: 'Nuestras almas', p: 'Dos almas que quizá llevan muchas vidas buscándose sin saberlo.' },
      { t: 'El reencuentro', p: 'Y cuando nos encontramos, algo dentro de nosotros supo que ya se conocía.' },
      { t: 'Volver a elegirnos', p: 'Porque somos almas gemelas: destinadas a encontrarse, reconocerse y elegirse una y otra vez.' },
      { t: 'Esta vida', p: 'De todas las vidas posibles, qué bonito que en esta nos haya tocado encontrarnos. ❤️' }
    ],
    reasons: [
      'La forma en que me miras.',
      'Tus ojos, que tienen la magia de hacerme sentir todo, incluso sin decir una palabra.',
      'Tu sonrisa, que es mi lugar favorito en el mundo.',
      'Tu forma de ser, tan auténtica, fuerte y hermosa, incluso en tus días difíciles.',
      'Porque contigo todo se siente más bonito, más fácil y más real.',
      'Y nunca olvides las 100 razones que nos dijimos, porque cada una de ellas siguen siendo verdad.'
    ],
    // Fotos: usa rutas relativas (si alojas el sitio) o imágenes en base64 (data:image/...).
    photos: [
      { src: './img/1.jpeg', cap: 'Nuestro comienzo' },
      { src: './img/3.jpeg', cap: 'Ese viaje' },
      { src: './img/2.jpeg', cap: 'Un día cualquiera' }
    ]
  };

  /* =========================================================
     UTILIDADES
     ========================================================= */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const pad = n => String(n).padStart(2, '0');
  const fmt = d => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const T = esc(CONFIG.to);
  const TC = esc(cap(CONFIG.to));
  const F = esc(CONFIG.from);
  const ANN = fmt(new Date(CONFIG.start.getFullYear() + 3, CONFIG.start.getMonth(), CONFIG.start.getDate()));

  const HEART_PATH = 'M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2 0 3.6 1.1 5.4 3 1.8-1.9 3.4-3 5.4-3 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21z';
  const heartSvg = (cls = 'heart') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${HEART_PATH}"/></svg>`;

  /* =========================================================
     ARTE BOTÁNICO (SVG generado)
     ========================================================= */
  const R = (seed = 1) => () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  const n1 = v => Math.round(v * 10) / 10;

  function bloom(o) {
    const { x = 0, y = 0, s = 1, rot = 0, n = 10, len = 24, wid = 10, c1 = '#fff', c2 = '#fff', ctr = '#d90',
      cr = 6, stroke = null, sw = 1, fo = 1, dots = 0, seed = 3, pt = false, out = null } = o;
    const r = R(seed);
    let p = '';
    for (let i = 0; i < n; i++) {
      const a = n1(i * 360 / n);
      if (pt) {
        const w = wid * .65;
        const d = `M0 ${-cr * .6}C${w} ${-len * .3} ${w * .9} ${-len * .85} 0 ${-len}C${-w * .9} ${-len * .85} ${-w} ${-len * .3} 0 ${-cr * .6}Z`;
        p += stroke
          ? `<path d="${d}" transform="rotate(${a})" fill="${c1}" fill-opacity="${fo}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`
          : `<path d="${d}" transform="rotate(${a})" fill="${c1}"${out ? ` stroke="${out}" stroke-width=".6"` : ''}/>`;
      } else {
        const cy = -(cr + len / 2 - 3);
        p += stroke
          ? `<ellipse cx="0" cy="${cy}" rx="${wid / 2}" ry="${len / 2}" transform="rotate(${a})" fill="${c1}" fill-opacity="${fo}" stroke="${stroke}" stroke-width="${sw}"/>`
          : `<ellipse cx="0" cy="${cy}" rx="${wid / 2}" ry="${len / 2}" transform="rotate(${a})" fill="${c1}"${out ? ` stroke="${out}" stroke-width=".6"` : ''}/>` +
          `<ellipse cx="0" cy="${n1(cy - len * .08)}" rx="${n1(wid * .2)}" ry="${n1(len * .34)}" transform="rotate(${a})" fill="${c2}" opacity=".55"/>`;
      }
    }
    let c = stroke
      ? `<circle r="${cr}" fill="none" stroke="${stroke}" stroke-width="${sw}"/>`
      : `<circle r="${cr}" fill="${ctr}"/>`;
    for (let i = 0; i < dots; i++) {
      const a = r() * 6.283, d = r() * cr * .72;
      c += `<circle cx="${n1(Math.cos(a) * d)}" cy="${n1(Math.sin(a) * d)}" r="${n1(cr * .1 + .3)}" fill="${stroke || 'rgba(0,0,0,.28)'}" opacity=".65"/>`;
    }
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${p}${c}</g>`;
  }

  function leaf(o) {
    const { x = 0, y = 0, s = 1, rot = 0, c = '#7fa06c', v = 'rgba(255,255,255,.38)', stroke = null } = o;
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">` +
      `<path d="M0 0C10 -9 12 -28 0 -44C-12 -28 -10 -9 0 0Z" fill="${stroke ? 'none' : c}"${stroke ? ` stroke="${stroke}" stroke-width="1"` : ''}/>` +
      `<path d="M0 -2V-36" fill="none" stroke="${stroke || v}" stroke-width=".8"/></g>`;
  }

  function sprig(o) {
    const { x = 0, y = 0, rot = 0, s = 1, len = 90, n = 6, c = '#7fa06c', stroke = null, bend = 14 } = o;
    let g = `<path d="M0 0Q${bend} ${-len / 2} 0 ${-len}" fill="none" stroke="${stroke || c}" stroke-width="1.6" stroke-linecap="round"/>`;
    for (let i = 0; i < n; i++) {
      const t = (i + 1) / (n + 1);
      const px = n1(2 * (1 - t) * t * bend), py = n1(-len * t);
      const side = i % 2 ? 1 : -1;
      g += leaf({ x: px, y: py, s: n1((1 - t * .45) * .78), rot: side * (48 + (i % 3) * 6), c, stroke });
    }
    g += leaf({ x: 0, y: -len, s: .5, rot: 0, c, stroke });
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${g}</g>`;
  }

  const svg = (vb, cls, inner, style = '') =>
    `<svg class="art ${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="${style}">${inner}</svg>`;

  /* Flores crema (página 1) */
  const creamFlower = (o) => bloom(Object.assign({ n: 6, len: 26, wid: 20, c1: '#f4efd3', c2: '#fff', ctr: '#9b9a55', cr: 5, dots: 7, out: '#dfd7aa' }, o));
  function artCreamLeft() {
    return svg('0 0 100 170', 'sway',
      sprig({ x: 20, y: 160, rot: 10, len: 110, n: 6, c: '#d3dbb9', bend: 16 }) +
      creamFlower({ x: 30, y: 38, s: 1.05, rot: 10, seed: 2 }) +
      creamFlower({ x: 22, y: 112, s: .9, rot: -15, seed: 5 }) +
      creamFlower({ x: 52, y: 150, s: .55, rot: 30, seed: 8 }),
      'left:calc(var(--u)*-7);top:calc(var(--u)*50);width:calc(var(--u)*34)');
  }
  function artCreamTop() {
    return svg('0 0 110 90', 'sway-r',
      sprig({ x: 96, y: 4, rot: 160, len: 80, n: 5, c: '#d3dbb9', bend: -14 }) +
      creamFlower({ x: 74, y: 28, s: 1.05, rot: 25, seed: 11 }) +
      creamFlower({ x: 100, y: 62, s: .7, rot: -10, seed: 4 }),
      'right:calc(var(--u)*-8);top:calc(var(--u)*-7);width:calc(var(--u)*40)');
  }
  function artCreamRight() {
    return svg('0 0 100 120', 'sway-r',
      sprig({ x: 92, y: 118, rot: -12, len: 80, n: 5, c: '#d3dbb9', bend: -12 }) +
      creamFlower({ x: 62, y: 70, s: .95, rot: 5, seed: 13 }) +
      creamFlower({ x: 90, y: 28, s: .6, rot: -20, seed: 21 }),
      'right:calc(var(--u)*-9);top:calc(var(--u)*86);width:calc(var(--u)*28)');
  }

  /* Margarita morada */
  function artPurple() {
    return svg('0 0 220 230', 'sway',
      sprig({ x: 34, y: 222, rot: -28, len: 125, n: 7, c: '#86a874', bend: 20 }) +
      sprig({ x: 66, y: 224, rot: 12, len: 98, n: 6, c: '#6d9361', bend: -18 }) +
      sprig({ x: 14, y: 196, rot: -58, len: 82, n: 5, c: '#9cbf8a', bend: 10 }) +
      bloom({ x: 82, y: 132, s: 1.55, n: 20, len: 26, wid: 7, c1: '#c7a6e2', c2: '#eadcf6', ctr: '#8c5aa8', cr: 9, dots: 12, seed: 4 }) +
      bloom({ x: 40, y: 182, s: .62, n: 14, len: 22, wid: 7, c1: '#dcc7ee', c2: '#fff', ctr: '#b184c9', cr: 7, dots: 6, seed: 5 }),
      'left:calc(var(--u)*-4);bottom:calc(var(--u)*-4);width:calc(var(--u)*52)');
  }

  /* Ramo amarillo con moño */
  function artYellow() {
    const stem = (d) => `<path d="${d}" fill="none" stroke="#7d9b55" stroke-width="2.4" stroke-linecap="round"/>`;
    const fl = (x, y, s, seed) =>
      bloom({ x, y, s, n: 12, len: 20, wid: 10, c1: '#f5c518', c2: '#ffe98a', ctr: '#e9588f', cr: 7, seed }) +
      `<circle cx="${x}" cy="${y}" r="${n1(3.6 * s)}" fill="none" stroke="#c2336f" stroke-width="1"/>`;
    return svg('0 0 160 210', 'sway',
      stem('M80 196C70 150 44 110 40 66') + stem('M80 196C80 150 82 90 82 40') + stem('M80 196C92 150 116 112 122 68') + stem('M80 196C76 160 66 130 58 106') +
      leaf({ x: 66, y: 140, s: .8, rot: -50, c: '#8aab62' }) + leaf({ x: 96, y: 136, s: .8, rot: 50, c: '#8aab62' }) +
      fl(40, 62, 1.25, 3) + fl(82, 34, 1.3, 5) + fl(122, 64, 1.2, 7) + fl(58, 100, .85, 9) +
      `<path d="M80 154C60 140 46 148 52 160C58 170 76 162 80 154ZM80 154C100 140 114 148 108 160C102 170 84 162 80 154Z" fill="#f3a1b7"/>` +
      `<path d="M78 158L64 190L73 185L77 196ZM82 158L96 190L87 185L83 196Z" fill="#ee86a2"/><circle cx="80" cy="156" r="4.4" fill="#e8789a"/>`,
      'left:calc(var(--u)*5);bottom:calc(var(--u)*3);width:calc(var(--u)*34)');
  }

  /* Flores secas terracota */
  function artTerra() {
    const dry = (d) => `<path d="${d}" fill="none" stroke="#b9956b" stroke-width="1.4" stroke-linecap="round"/>`;
    let spikes = '';
    [[150, 40, 8], [162, 70, 14], [138, 70, -6], [172, 104, 22], [128, 98, -14]].forEach(([x, y, r], i) => {
      for (let k = 0; k < 6; k++) spikes += `<ellipse cx="${x + (k % 2 ? 2 : -2)}" cy="${y + k * 7}" rx="2.6" ry="5" transform="rotate(${r} ${x} ${y})" fill="#c9a574" opacity=".9"/>`;
    });
    return svg('0 0 200 250', 'sway',
      dry('M60 246C58 190 80 140 150 40') + dry('M70 246C80 200 120 160 162 70') + dry('M50 246C50 200 40 160 138 70') + dry('M80 246C100 210 150 170 172 104') + spikes +
      sprig({ x: 40, y: 246, rot: -24, len: 120, n: 6, c: '#8b8452', bend: 18 }) +
      sprig({ x: 96, y: 248, rot: 18, len: 96, n: 5, c: '#a39a62', bend: -14 }) +
      bloom({ x: 70, y: 100, s: 1.25, n: 14, len: 26, wid: 9, c1: '#c2613f', c2: '#e59a74', ctr: '#6f3520', cr: 9, dots: 10, seed: 6 }) +
      bloom({ x: 124, y: 146, s: .82, n: 14, len: 24, wid: 8, c1: '#ecdcc4', c2: '#fff', ctr: '#b98a52', cr: 8, dots: 8, seed: 9 }) +
      bloom({ x: 38, y: 176, s: .7, n: 12, len: 22, wid: 9, c1: '#d98a62', c2: '#f2c2a2', ctr: '#8a4a2c', cr: 7, dots: 6, seed: 10 }),
      'left:calc(var(--u)*-3);bottom:calc(var(--u)*-3);width:calc(var(--u)*28)');
  }

  /* Línea botánica azul */
  const NAVY = '#2e4d8f';
  function artBlueLilies() {
    const lil = (o) => bloom(Object.assign({ n: 6, len: 46, wid: 22, c1: '#dbe6f7', fo: .35, stroke: NAVY, sw: 1.1, cr: 7, pt: true }, o));
    const st = (d) => `<path d="${d}" fill="none" stroke="${NAVY}" stroke-width="1.2" stroke-linecap="round"/>`;
    return svg('0 0 240 300', 'sway-r',
      st('M200 300C196 240 170 190 150 100') + st('M170 300C150 250 110 210 92 158') + st('M214 300C220 250 214 200 206 150') +
      leaf({ x: 196, y: 250, s: 1.2, rot: -40, stroke: NAVY }) + leaf({ x: 172, y: 262, s: 1.1, rot: 50, stroke: NAVY }) + leaf({ x: 150, y: 216, s: .9, rot: -55, stroke: NAVY }) +
      lil({ x: 150, y: 92, s: 1.05, rot: 18, seed: 2 }) + lil({ x: 92, y: 150, s: .85, rot: -28, seed: 4 }) +
      lil({ x: 206, y: 142, s: .6, rot: 10, seed: 6, n: 5 }),
      'right:calc(var(--u)*-2);bottom:calc(var(--u)*-1);width:calc(var(--u)*34)');
  }
  function artBlueCorner() {
    const lil = (o) => bloom(Object.assign({ n: 6, len: 34, wid: 18, c1: '#dbe6f7', fo: .35, stroke: NAVY, sw: 1, cr: 5, pt: true }, o));
    return svg('0 0 170 150', 'sway',
      `<path d="M0 30C40 40 70 80 80 140" fill="none" stroke="${NAVY}" stroke-width="1.1"/>` +
      sprig({ x: 0, y: 64, rot: 75, len: 100, n: 5, stroke: NAVY, bend: 12 }) +
      lil({ x: 58, y: 40, s: .95, rot: 30, seed: 3 }) + lil({ x: 104, y: 84, s: .6, rot: -20, seed: 8, n: 5 }) +
      leaf({ x: 82, y: 120, s: .9, rot: 40, stroke: NAVY }),
      'left:calc(var(--u)*-4);top:calc(var(--u)*-4);width:calc(var(--u)*30)');
  }
  function artSprigs(style) {
    return svg('0 0 130 130', 'sway-r',
      sprig({ x: 100, y: 128, rot: -8, len: 100, n: 6, c: '#9bbd8b', bend: -14 }) +
      sprig({ x: 70, y: 130, rot: -34, len: 70, n: 5, c: '#7fa37a', bend: 10 }) +
      bloom({ x: 100, y: 34, s: .55, n: 12, len: 22, wid: 8, c1: '#e8a0a8', c2: '#f7d3d8', ctr: '#f3c969', cr: 6, seed: 12 }), style);
  }

  /* Guirnalda floral (página enmarcada y contraportada) */
  function garland(seed, pos) {
    const r = R(seed);
    const cols = [['#e89aa6', '#f7d3d8'], ['#ec8b7d', '#f8c9bd'], ['#f5c4a4', '#fde6d6'], ['#b9a2d6', '#e6dcf3']];
    const greens = ['#7fa37a', '#9dbb8b', '#5f8a6b'];
    let g = '';
    for (let i = 0; i < 30; i++) g += leaf({ x: n1(r() * 300), y: n1(20 + r() * 26), s: n1(.4 + r() * .35), rot: Math.round(r() * 360), c: greens[i % 3] });
    for (let i = 0; i < 16; i++) g += `<circle cx="${n1(r() * 300)}" cy="${n1(18 + r() * 28)}" r="${n1(2 + r() * 1.4)}" fill="#35598a"/>`;
    for (let x = 8, i = 0; x <= 296; x += 23, i++) {
      const c = cols[Math.floor(r() * cols.length)];
      g += bloom({ x, y: n1(26 + r() * 14), s: n1(.6 + r() * .35), rot: Math.round(r() * 60), n: 8, len: 17, wid: 10, c1: c[0], c2: c[1], ctr: '#f3c969', cr: 4, seed: seed + i });
    }
    return `<svg class="garl ${pos}" viewBox="0 0 300 62" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${g}</svg>`;
  }

  /* Corona dorada de portada */
  function wreath() {
    const GOLD = '#e7c979';
    let g = '';
    for (let i = 0; i < 28; i++) {
      const a = i * (360 / 28), rad = a * Math.PI / 180;
      g += leaf({ x: n1(150 + 118 * Math.cos(rad)), y: n1(150 + 118 * Math.sin(rad)), s: .5, rot: Math.round(a + 180 + (i % 2 ? 28 : -28)), stroke: GOLD });
    }
    g += `<circle cx="150" cy="150" r="118" fill="none" stroke="${GOLD}" stroke-width=".8" opacity=".7"/>`;
    for (let i = 0; i < 8; i++) {
      const a = i * 45 + 22.5, rad = a * Math.PI / 180;
      g += bloom({ x: n1(150 + 118 * Math.cos(rad)), y: n1(150 + 118 * Math.sin(rad)), s: .62, rot: Math.round(a), n: 6, len: 20, wid: 14, c1: 'none', stroke: GOLD, cr: 4, sw: 1.1 });
    }
    return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${g}</svg>`;
  }

  const divider = () =>
    `<svg class="divider" viewBox="0 0 120 14" aria-hidden="true"><path d="M0 7H48M72 7H120" stroke="currentColor" stroke-width="1" fill="none" opacity=".6"/><g transform="translate(54 1) scale(.5)" fill="currentColor"><path d="${HEART_PATH}"/></g></svg>`;

  const rv = (d) => `class="rv" style="--d:${d}"`;
  const sparkles = () => {
    const r = R(17); let s = '';
    for (let i = 0; i < 18; i++) s += `<i class="sp" style="left:${n1(8 + r() * 84)}%;top:${n1(6 + r() * 88)}%;--dl:${n1(r() * 3.4)}s"></i>`;
    return s;
  };

  /* =========================================================
     CONTENIDO DE LAS PÁGINAS (lados del libro)
     Debe ser un número PAR de lados.
     ========================================================= */
  const sides = [
    /* 0 · Portada */
    {
      cls: 'cover-page', cover: true, label: 'Portada · toca para abrir', html: `
      ${sparkles()}
      <div class="kicker rv" style="--d:0">Feliz Aniversario</div>
      <div class="cover-mid">
        <div class="wreath rv" style="--d:150">${wreath()}<div class="num foil"><b>3</b><small>años</small></div></div>
        <div class="script foil rv" style="--d:400">mi amor</div>
      </div>
      <div class="hint rv" style="--d:700">Para ${T} · ${ANN}</div>`
    },

    /* 1 · Dedicatoria */
    {
      cls: 'p-gray', label: 'Dedicatoria', html: `
      <div class="dedic">
        <div class="script t-script rv" style="--d:0">Mi esposa:</div>
        <p class="t-serif rv" style="--d:200">Entre tantas historias que existen en el mundo, la que más quiero seguir escribiendo es la nuestra.</p>
        <p class="t-serif rv" style="--d:200">Gracias por cada momento, por cada sonrisa, por cada abrazo y por hacer que incluso los días más sencillos se conviertan en recuerdos que quiero guardar para siempre.</p>
        <p class="t-serif rv" style="--d:200">Este libro es para ti, pero mi historia favorita siempre serás tú.</p>
        <p class="t-serif rv" style="--d:200">Te amo. ❤️</p>
        ${divider()}
        <div class="who rv" style="--d:500"><span>Para <b>${T}</b></span><span>De <b>${F}</b></span></div>
      </div>` },

    /* 2 · Carta crema */
    {
      cls: 'p-cream', label: 'Para ti', html: `
      ${artCreamLeft()}${artCreamTop()}${artCreamRight()}
      <div class="head"></div>
      <div class="content letter center">
        <h2 class="t-serif rv" style="--d:100;margin:0">Para mi amor…</h2>
        <p ${rv(350)}>Hace tres años tuve la suerte de que me dieras la oportunidad de caminar a tu lado, y desde entonces no ha habido un solo día en el que no agradezca tenerte en mi vida.
                      Gracias por elegirme, por tenerme paciencia, por hacerme reír y por quererme incluso en mis días no tan buenos. Gracias por cada abrazo, cada conversación, cada momento pequeño que, contigo, termina significando tanto.
                      Estar contigo es, sin duda, lo mejor que me ha pasado en la vida. Me encanta la vida que construimos juntos y, sobre todo, me encanta saber que todavía nos quedan tantas historias por vivir.
                      Contigo entendí que el hogar puede ser una persona.
                      Y para mí, esa persona eres tú.
        </p>
        <p ${rv(350)}>Te elegiría una y mil veces más. ❤️</p>
        <p class="small-ac rv" style="--d:850">Feliz aniversario, eres mi lugar favorito.</p>
      </div>
      <div class="foot center rv" style="--d:1000;color:var(--ac)">${heartSvg('heart beat').replace('<svg', '<svg width="34" height="34" style="width:calc(var(--u)*10);height:calc(var(--u)*10)"')}</div>`
    },

    /* 3 · Historia */
    {
      cls: 'p-white', label: 'Nuestra historia', html: `
      <div class="head"><div class="date rv" style="--d:0">${ANN}</div></div>
      <div class="content">
        <h2 class="script t-script rv" style="--d:100;margin:0">Nuestra historia</h2>
        <div class="tl">
          ${CONFIG.story.slice(0, 4).map((s, i) => `
            <div class="tl-item rv" style="--d:${350 + i * 260}">
              <div class="tl-dot">${i + 1}</div>
              <div><h3>${esc(s.t)}</h3><p>${esc(s.p)}</p></div>
            </div>`).join('')}
        </div>
      </div>
      <div class="foot"></div>` },

    /* 4 · Carta con margarita morada */
    {
      cls: 'p-gray', label: 'Gracias', html: `
      ${artPurple()}
      <div class="head"><div class="date rv" style="--d:0">${ANN}</div></div>
      <div class="content">
        <h2 class="script t-script rv" style="--d:100;margin:0">${TC}:</h2>
        <p ${rv(350)}>Gracias por cada mañana compartida y por cada tormenta que cruzamos de la mano.</p>
        <p ${rv(600)}>Eres calma cuando todo corre y aventura cuando todo se detiene. Qué suerte la mía compartir cada minuto de mi vida contigo.</p>
        <p ${rv(850)}>Gracias por tanto amor. Te amo con todo mi corazón.</p>
      </div>
      <div class="foot sign script rv" style="--d:1100">Con amor,<br>te amo.</div>` },

    /* 5 · Contador */
    {
      cls: 'p-cream', label: 'Tres años en números', html: `
      <div class="head"><div class="date rv" style="--d:0">${ANN}</div></div>
      <div class="content">
        <h2 class="script t-script center rv" style="--d:100;margin:0;font-size:calc(var(--u)*9.8)">Tres años en números</h2>
        <div class="count-head rv" style="--d:350">
          <div class="big" data-k="tot">0</div>
          <div class="lbl">días eligiéndonos</div>
        </div>
        <div class="stats rv" style="--d:600">
          <div class="stat"><b data-k="y">0</b><span>años</span></div>
          <div class="stat"><b data-k="mo">0</b><span>meses</span></div>
          <div class="stat"><b data-k="d">0</b><span>días</span></div>
          <div class="stat"><b data-k="h">00</b><span>horas</span></div>
          <div class="stat"><b data-k="mi">00</b><span>minutos</span></div>
          <div class="stat"><b data-k="s">00</b><span>segundos</span></div>
        </div>
        <p class="beats rv" style="--d:850">${heartSvg()}Mi corazón ha latido unos <b data-k="beats">0</b> millones de veces desde que te conozco, y cada latido tiene tu nombre.</p>
      </div>
      <div class="foot"></div>` },

    /* 6 · Página enmarcada */
    {
      cls: 'p-frame', label: 'Cariño mío', html: `
      <div class="band"></div>
      <div class="ttl script rv" style="--d:0">Cariño mío…</div>
      ${garland(31, 'top')}
      <div class="fr">
        <p ${rv(250)}>Qué suerte la mía compartir mis días con una persona tan maravillosa como tú…</p>
        <p ${rv(500)}>Espero que el universo nos regale muchos años más, y que cada uno sea mejor que el anterior…</p>
        <p ${rv(750)}>Te deseo un feliz aniversario; que podamos celebrar muchas fechas más tomados de la mano y llenándonos de mucho amor.</p>
      </div>
      ${garland(57, 'bot')}
      <div class="tagline rv" style="--d:1000">Te amo, con todo mi corazón.</div>` },

    /* 7 · Galería */
    {
      cls: 'p-gray', label: 'Nuestros momentos', html: `
      <div class="head"><div class="date rv" style="--d:0">${ANN}</div></div>
      <div class="content">
        <h2 class="script t-script center rv" style="--d:100;margin:0">Nuestros momentos</h2>
        <div class="polas">
          ${CONFIG.photos.slice(0, 3).map((p, i) => `
            <figure class="pola rv" style="--d:${350 + i * 250};--r:${['-2.2deg', '2deg', '-1deg'][i]};margin:0">
              <div class="ph">${p.src ? `<img src="${esc(p.src)}" alt="${esc(p.cap)}" loading="lazy" decoding="async">` : heartSvg()}</div>
              <small>${esc(p.cap)}</small>
            </figure>`).join('')}
        </div>
      </div>
      <div class="foot"></div>` },

    /* 8 · Razones */
    {
      cls: 'p-cream', label: 'Razones para amarte', html: `
      ${artSprigs('right:calc(var(--u)*-2);bottom:calc(var(--u)*-2);width:calc(var(--u)*30)')}
      <div class="head"><div class="date rv" style="--d:0">${ANN}</div></div>
      <div class="content">
        <h2 class="script t-script rv" style="--d:100;margin:0">Razones para amarte</h2>
        <div class="reasons">
          ${CONFIG.reasons.slice(0, 6).map((t, i) => `<div class="reason rv" style="--d:${330 + i * 170}">${heartSvg()}<span>${esc(t)}</span></div>`).join('')}
        </div>
      </div>
      <div class="foot"></div>` },

    /* 9 · Carta con ramo amarillo */
    {
      cls: 'p-white', label: 'Mis promesas', html: `
      ${artYellow()}
      <div class="head"><div class="date rv" style="--d:0">${ANN}</div></div>
      <div class="content">
        <h2 class="script t-script rv" style="--d:100;margin:0">Te Prometo:</h2>
        <p ${rv(250)}>Elegirte, incluso en los días difíciles.</p>
        <p ${rv(350)}>Recordarte cada día lo importante que eres para mí.</p>
        <p ${rv(450)}>Nunca dejar de conquistarte.</p>
        <p ${rv(550)}>Celebrar tus sueños como si fueran míos.</p>
        <p ${rv(700)}>Seguir encontrándote, sin importar cuántas vidas nos queden.</p>
        <p ${rv(950)}>Seguir eligiéndote, una vida tras otra. ❤️</p>
      </div>
      <div class="foot sign script rv" style="--d:1100">Con amor,<br>te amo infinitamente.</div>` },

    /* 10 · Carta terracota */
    {
      cls: 'p-sand p-princesa', label: 'Mi princesa', html: `
      ${artTerra()}
      <div class="head"><div class="date rv" style="--d:0">${ANN}</div></div>
<div class="content">
        <h2 class="script t-script rv" style="--d:100;margin:0">Para mi princesa hermosa</h2>
        <p class="justify rv" style="--d:350">Nunca olvides lo maravillosa que eres. Para mí eres mi princesa, mi confi, mi persona favorita y mi todo.
                                             <br> Quiero verte cumplir cada uno de tus sueños, viajar, crecer y ser muy feliz. Y quiero que sepas que siempre voy a estar ahí para apoyarte, en los días buenos y en los no tan buenos, durante cada día de mi vida.
                                              Estos tres años espero que te hayan dejado algo muy claro: yo quiero estar contigo toda la vida. <br> Quiero vivir contigo todo lo que nos falta: nuestros viajes, nuestro hogar, casarnos, formar nuestra familia y seguir creando recuerdos juntos.
                                              Te amo muchísimo, más de lo que a veces puedo explicar. Nunca dudes de lo mucho que te amo ni de las ganas que tengo de seguir eligiéndote todos los días.
        </p>
        <div class="tail">
          <p class="justify rv" style="--d:600">También quiero agradecerte por haber traído a mi vida a Mimis, nuestra niña. No sabes cuánto la amo y lo feliz que me hace tenerla. Gracias por darme la oportunidad de conocer ese amor tan bonito que ahora compartimos los tres.
                                                Tú y Mimis son mi familia, y no cambiaría por nada la vida que estamos construyendo juntos. 🐾
          </p>
          <p class="justify rv" style="--d:750">Te amo Infinitamente. ❤️</p>
          <br>
          <br>
          <div class="sig script rv" style="--d:900">Eres mi todo</div>
        </div>
      </div>` },

    /* 11 · Carta azul final */
    {
      cls: 'p-blue', label: 'Carta final', html: `
      ${artBlueCorner()}${artBlueLilies()}
      <div class="head"><div class="date rv" style="--d:0">${ANN}</div></div>
      <div class="content">
        <h2 class="t-serif rv" style="--d:100;margin:0;text-align:left">Gracias amor:</h2>
        <p ${rv(350)}>Hace tres años llegaste a mi vida y, desde entonces, cada año a tu lado ha sido un regalo que agradezco con todo mi corazón.
                      Gracias por darme la oportunidad de estar contigo, por quererme, por tenerme paciencia y por hacerme tan feliz. Me enamoré de tu sonrisa y de tus ojos, pero con el tiempo terminé enamorándome de cada parte de ti.
                      Espero que nunca se te quiten las ganas de compartir tu vida conmigo, porque yo no imagino la mía con nadie más.
        </p>
        <p ${rv(650)}>Todavía nos quedan tantos sueños por cumplir: viajar, tener nuestro hogar, casarnos, formar una familia y vivir todas esas cosas que tantas veces hemos imaginado juntos.
                      Y quiero que seas tú en cada una de ellas.
        </p>
       <div class="tail">
          <p ${rv(850)}>Gracias por estos tres años, mi amor. Gracias por elegirme y por dejarme elegirte cada día. Te amo muchísimo, y espero poder seguir celebrando cada año de mi vida a tu lado.</p>
          <div class="sig rv" style="--d:1100"><div class="script">Me encantas, Confi.</div></div>
        </div>
      </div>`
    }
  ];

  /* Lado final (tapa trasera, solo vista de doble página) */
  const endSide = {
    cls: 'p-end', label: 'Fin', html: `
    ${garland(91, 'top')}
    <div class="end-mid">
      <div class="script rv" style="--d:0">Feliz aniversario</div>
      <div class="n3 rv" style="--d:250">3${heartSvg('heart beat')}</div>
      <div class="years rv" style="--d:450">años juntos</div>
      <button class="again rv" style="--d:700" type="button" data-noflip data-act="restart">Volver a leer</button>
    </div>
    ${garland(123, 'bot')}`
  };

  /* =========================================================
     MOTOR DEL LIBRO
     ========================================================= */
  const root = document.documentElement;
  const shift = document.getElementById('shift');
  const book = document.getElementById('book');
  const endboard = document.getElementById('endboard');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const labelEl = document.getElementById('label');
  const dotsEl = document.getElementById('dots');
  const mq = matchMedia('(max-width: 820px), (max-aspect-ratio: 1/1), (max-height: 520px)');

  const FLIP = reduce ? 200 : 1150;
  root.style.setProperty('--flip', FLIP + 'ms');

  const N = sides.length;              // lados
  let single = mq.matches;             // modo una página (móvil)
  let leaves = [], faces = [];
  let f = 0;                           // hojas pasadas (vista doble) / páginas pasadas (vista simple)
  let built = false;
  const seen = new Set();

  const maxF = () => single ? N - 1 : N / 2;

  function mkFace(i, kind) {
    const s = sides[i];
    const d = document.createElement('div');
    d.className = `face ${kind}${s.cover ? ' is-cover' : ''}`;
    d.innerHTML = `<div class="page ${s.cls}">${s.html}</div>`;
    faces[i] = d;
    return d;
  }

  function build() {
    book.querySelectorAll('.leaf').forEach(n => n.remove());
    leaves = []; faces = [];
    root.classList.toggle('single', single);
    book.classList.toggle('is-single', single);
    book.classList.add('no-anim');

    if (single) {
      for (let p = 0; p < N; p++) {
        const lf = document.createElement('div');
        lf.className = 'leaf';
        lf.append(mkFace(p, 'front'));
        book.append(lf); leaves.push(lf);
      }
    } else {
      for (let k = 0; k < N / 2; k++) {
        const lf = document.createElement('div');
        lf.className = 'leaf';
        lf.append(mkFace(2 * k, 'front'), mkFace(2 * k + 1, 'back'));
        book.append(lf); leaves.push(lf);
      }
      endboard.innerHTML = `<div class="page ${endSide.cls}">${endSide.html}</div>`;
      faces[N] = endboard;
    }

    // Puntos de navegación
    const count = maxF() + 1;
    dotsEl.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'dot';
      b.setAttribute('aria-label', `Ir a la vista ${i + 1} de ${count}`);
      b.addEventListener('click', e => { e.stopPropagation(); goTo(i); });
      dotsEl.append(b);
    }

    cacheCounter();
    apply(true);
    requestAnimationFrame(() => requestAnimationFrame(() => book.classList.remove('no-anim')));
    built = true;
  }

  function visible() {
    if (single) return [f];
    const v = [];
    if (f > 0) v.push(2 * f - 1);
    v.push(2 * f);                      // si f === N/2, es el índice N (tapa trasera)
    return v;
  }

  function apply(initial) {
    const total = leaves.length;
    const prev = leaves.map(l => l.classList.contains('flipped'));
    const changed = [];
    leaves.forEach((el, i) => { if ((i < f) !== prev[i]) changed.push(i); });
    const forward = changed.length && changed[0] < f;
    if (!forward) changed.reverse();

    leaves.forEach((el, i) => {
      const shouldFlip = i < f;
      const zFinal = shouldFlip ? i + 1 : total - i;
      if (initial) {
        el.classList.toggle('flipped', shouldFlip);
        el.style.zIndex = zFinal;
        return;
      }
      const k = changed.indexOf(i);
      clearTimeout(el._t);
      if (k === -1) { el.style.zIndex = zFinal; return; }
      const delay = reduce ? 0 : Math.min(k, 6) * 85;
      el.style.zIndex = 100 + zFinal;
      el.style.transitionDelay = delay + 'ms';
      el.classList.toggle('flipped', shouldFlip);
      el._t = setTimeout(() => { el.style.zIndex = zFinal; el.style.transitionDelay = ''; }, FLIP + delay + 90);
    });

    // Posición del libro (centrado al cerrar)
    shift.dataset.pos = single ? 'mid' : (f === 0 ? 'start' : (f === N / 2 ? 'end' : 'mid'));

    // Estado visible / accesibilidad
    const vis = visible();
    faces.forEach((el, i) => {
      if (!el) return;
      const on = vis.includes(i);
      el.setAttribute('aria-hidden', on ? 'false' : 'true');
      if (on) el.removeAttribute('inert'); else el.setAttribute('inert', '');
    });
    vis.forEach(i => seen.add(i));
    const reveal = () => faces.forEach((el, i) => { if (el) el.classList.toggle('is-seen', seen.has(i)); });
    if (initial) reveal(); else setTimeout(reveal, reduce ? 0 : Math.round(FLIP * .38));

    // UI
    labelEl.textContent = vis.map(i => i === N ? 'Fin' : sides[i].label).join('  ·  ');
    prevBtn.disabled = f <= 0;
    nextBtn.disabled = f >= maxF();
    [...dotsEl.children].forEach((d, i) => d.setAttribute('aria-current', i === f ? 'true' : 'false'));
  }

  function goTo(n) {
    const t = Math.max(0, Math.min(maxF(), n));
    if (t === f) return;
    f = t; apply(false);
  }
  const next = () => goTo(f + 1);
  const prev = () => goTo(f - 1);

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  document.getElementById('restartBtn').addEventListener('click', () => goTo(0));

  /* Interacción: toque / clic, deslizar, teclado */
  let sx = 0, sy = 0, suppress = false, tracking = false;
  book.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; tracking = true; });
  book.addEventListener('pointerup', e => {
    if (!tracking) return; tracking = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      suppress = true; dx < 0 ? next() : prev();
    }
  });
  book.addEventListener('pointercancel', () => { tracking = false; });
  book.addEventListener('click', e => {
    if (suppress) { suppress = false; return; }
    const act = e.target.closest('[data-act]');
    if (act && act.dataset.act === 'restart') { goTo(0); return; }
    if (e.target.closest('[data-noflip]')) return;
    const r = book.getBoundingClientRect();
    const x = e.clientX - r.left;
    if (single) (x < r.width * .3 ? prev : next)();
    else (x > r.width / 2 ? next : prev)();
  });
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': next(); break;
      case 'ArrowLeft': case 'PageUp': prev(); break;
      case ' ': if (document.activeElement && document.activeElement.tagName === 'BUTTON') return; e.preventDefault(); next(); break;
      case 'Home': goTo(0); break;
      case 'End': goTo(maxF()); break;
      default: return;
    }
  });

  /* Cambio de modo (doble página ↔ una página) conservando la posición */
  function onModeChange() {
    const s = mq.matches;
    if (s === single && built) return;
    if (built) {
      f = s ? Math.min(2 * f, N - 1) : Math.ceil(f / 2);
    }
    single = s;
    build();
  }
  mq.addEventListener ? mq.addEventListener('change', onModeChange) : mq.addListener(onModeChange);

  /* =========================================================
     CONTADOR EN VIVO
     ========================================================= */
  let cn = {};
  function cacheCounter() {
    cn = {};
    book.querySelectorAll('[data-k]').forEach(el => { cn[el.dataset.k] = el; });
    tick();
  }
  function diff(a, b) {
    let y = b.getFullYear() - a.getFullYear(), mo = b.getMonth() - a.getMonth(), d = b.getDate() - a.getDate();
    let h = b.getHours() - a.getHours(), mi = b.getMinutes() - a.getMinutes(), s = b.getSeconds() - a.getSeconds();
    if (s < 0) { s += 60; mi--; }
    if (mi < 0) { mi += 60; h--; }
    if (h < 0) { h += 24; d--; }
    if (d < 0) { d += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); mo--; }
    if (mo < 0) { mo += 12; y--; }
    return { y, mo, d, h, mi, s };
  }
  function tick() {
    if (!cn.tot) return;
    const now = new Date(), st = CONFIG.start;
    const v = now < st ? { y: 0, mo: 0, d: 0, h: 0, mi: 0, s: 0 } : diff(st, now);
    const days = Math.max(0, Math.floor((now - st) / 864e5));
    const set = (k, t) => { if (cn[k] && cn[k].textContent !== String(t)) cn[k].textContent = t; };
    set('y', v.y); set('mo', v.mo); set('d', v.d);
    set('h', pad(v.h)); set('mi', pad(v.mi)); set('s', pad(v.s));
    set('tot', days.toLocaleString('es'));
    set('beats', Math.round(days * 0.1).toLocaleString('es'));
  }
  setInterval(() => { if (!document.hidden) tick(); }, 1000);

  /* =========================================================
     TEMA CLARO / OSCURO
     ========================================================= */
  (function theme() {
    let saved = null;
    try { saved = localStorage.getItem('libro-tema'); } catch (e) { }
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
    document.getElementById('themeBtn').addEventListener('click', () => {
      const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      const nx = dark ? 'light' : 'dark';
      root.dataset.theme = nx;
      try { localStorage.setItem('libro-tema', nx); } catch (e) { }
    });
  })();

  /* =========================================================
     EFECTOS: pétalos y corazones flotantes
     ========================================================= */
  (function fx() {
    if (reduce) return;
    const cv = document.getElementById('fx'), ctx = cv.getContext('2d');
    let W = 0, H = 0, parts = [];
    const cols = ['#f3a6b6', '#f7c6cf', '#e7788f', '#ffd9de', '#f0b5c2'];
    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const want = W < 700 ? 16 : 30;
      while (parts.length < want) parts.push(make(true));
      parts.length = want;
    }
    function make(init) {
      const heart = Math.random() < .3;
      return {
        x: Math.random() * W, y: init ? Math.random() * H : -24,
        s: (heart ? 6 : 6) + Math.random() * 9, vy: .3 + Math.random() * .75, vx: (Math.random() - .5) * .35,
        sw: Math.random() * 6.28, sp: .008 + Math.random() * .016, r: Math.random() * 6.28, vr: (Math.random() - .5) * .025,
        h: heart, a: .22 + Math.random() * .4, c: cols[Math.floor(Math.random() * cols.length)]
      };
    }
    function draw(p) {
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = p.a; ctx.fillStyle = p.c;
      ctx.beginPath();
      const s = p.s;
      if (p.h) {
        ctx.moveTo(0, s * .35);
        ctx.bezierCurveTo(-s * 1.1, -s * .5, -s * .5, -s * 1.1, 0, -s * .4);
        ctx.bezierCurveTo(s * .5, -s * 1.1, s * 1.1, -s * .5, 0, s * .35);
      } else {
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * .9, -s * .5, s * .6, s * .7, 0, s);
        ctx.bezierCurveTo(-s * .6, s * .7, -s * .9, -s * .5, 0, -s);
      }
      ctx.fill();
      ctx.restore();
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.sw += p.sp; p.x += p.vx + Math.sin(p.sw) * .55; p.y += p.vy; p.r += p.vr;
        if (p.y > H + 30 || p.x < -40 || p.x > W + 40) { parts[i] = make(false); continue; }
        draw(p);
      }
      requestAnimationFrame(frame);
    }
    size();
    addEventListener('resize', size);
    requestAnimationFrame(frame);
  })();

  /* Corazones que suben al tocar */
  document.addEventListener('pointerdown', e => {
    if (e.target.closest('button')) return;
    const n = reduce ? 0 : 4;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span');
      el.className = 'bh';
      el.style.setProperty('--sz', (12 + Math.random() * 16) + 'px');
      el.style.setProperty('--x', (e.clientX - 10 + (Math.random() - .5) * 30) + 'px');
      el.style.setProperty('--y', (e.clientY - 10) + 'px');
      el.style.setProperty('--dx', ((Math.random() - .5) * 90) + 'px');
      el.style.setProperty('--rot', ((Math.random() - .5) * 50) + 'deg');
      el.style.animationDelay = (i * 70) + 'ms';
      el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${HEART_PATH}"/></svg>`;
      el.addEventListener('animationend', () => el.remove());
      document.body.append(el);
    }
  });

  /* Arranque */
  onModeChange();
  const go = () => requestAnimationFrame(() => document.body.classList.add('ready'));
  if (document.fonts && document.fonts.ready) { Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]).then(go); } else { go(); }

  /* Imágenes que fallen: mostrar marcador */
  book.addEventListener('error', e => {
    const t = e.target;
    if (t && t.tagName === 'IMG') { const ph = t.parentElement; t.remove(); if (ph) ph.innerHTML = heartSvg(); }
  }, true);
})();
