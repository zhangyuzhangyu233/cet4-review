(function (root) {
  'use strict';

  function clamp(v, min, max) {
    return v < min ? min : (v > max ? max : v);
  }

  /**
   * 3-phase weighted paper-turn easing:
   * gentle initial corner lift, decisive fluid sweep, cushioned air-pillow settle.
   */
  function paperTurnEase(p) {
    var t = clamp(Number(p) || 0, 0, 1);
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return 0.5 - 0.5 * Math.cos(Math.PI * Math.pow(t, 0.86));
  }

  function clipPolyHalfPlane(poly, M, N, keepPositive) {
    if (!poly || !poly.length) return [];
    var out = [];
    var n = poly.length;
    var sign = keepPositive ? 1 : -1;

    function sd(pt) {
      return ((pt.x - M.x) * N.x + (pt.y - M.y) * N.y) * sign;
    }

    for (var i = 0; i < n; i++) {
      var a = poly[i];
      var b = poly[(i + 1) % n];
      var da = sd(a);
      var db = sd(b);
      var inA = da >= -1e-5;
      var inB = db >= -1e-5;

      if (inA && inB) {
        out.push({ x: b.x, y: b.y });
      } else if (inA && !inB) {
        var denom1 = da - db;
        var ratio1 = Math.abs(denom1) < 1e-8 ? 0 : da / denom1;
        out.push({ x: a.x + ratio1 * (b.x - a.x), y: a.y + ratio1 * (b.y - a.y) });
      } else if (!inA && inB) {
        var denom2 = da - db;
        var ratio2 = Math.abs(denom2) < 1e-8 ? 0 : da / denom2;
        out.push({ x: a.x + ratio2 * (b.x - a.x), y: a.y + ratio2 * (b.y - a.y) });
        out.push({ x: b.x, y: b.y });
      }
    }

    var dedup = [];
    for (var k = 0; k < out.length; k++) {
      var cur = out[k];
      var prev = dedup.length ? dedup[dedup.length - 1] : null;
      if (!prev || Math.hypot(cur.x - prev.x, cur.y - prev.y) > 0.05) {
        dedup.push(cur);
      }
    }
    if (dedup.length > 1 && Math.hypot(dedup[0].x - dedup[dedup.length - 1].x, dedup[0].y - dedup[dedup.length - 1].y) <= 0.05) {
      dedup.pop();
    }
    return dedup;
  }

  /**
   * Compute exact diagonal fold geometry for a page slice W x H at curl progress u in [0, 1].
   */
  function computeFoldGeometry(W, H, u) {
    var width = Math.max(1, Number(W) || 1);
    var height = Math.max(1, Number(H) || 1);
    var t = clamp(Number(u) || 0, 0, 1);
    var rect = [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height }
    ];
    var C = { x: width, y: height };

    if (t <= 0.0005) {
      return {
        W: width,
        H: height,
        t: 0,
        C: C,
        P: { x: width, y: height },
        M: { x: width, y: height },
        N: { x: 1, y: 0 },
        lift: 0,
        maxS: 0,
        unpeeledPoly: rect,
        peeledPoly: [],
        foldEdge: [],
        flapPoly: []
      };
    }
    if (t >= 0.9995) {
      return {
        W: width,
        H: height,
        t: 1,
        C: C,
        P: { x: -1.08 * width, y: height },
        M: { x: -0.04 * width, y: height },
        N: { x: 1, y: 0 },
        lift: 0,
        maxS: 0,
        unpeeledPoly: [],
        peeledPoly: rect,
        foldEdge: [],
        flapPoly: []
      };
    }

    var px = Math.min(width - 0.6, width * (1 - 2.08 * t));
    var lift = Math.sin(Math.pow(t, 0.82) * Math.PI) * Math.min(height * 0.34, width * 0.44, 178);
    var py = height - lift;
    var P = { x: px, y: py };
    var M = { x: (width + px) * 0.5, y: (height + py) * 0.5 };
    var dx = width - px;
    var dy = height - py;
    var dist = Math.hypot(dx, dy) || 1;
    var N = { x: dx / dist, y: dy / dist };

    var unpeeledPoly = clipPolyHalfPlane(rect, M, N, false);
    var peeledPoly = clipPolyHalfPlane(rect, M, N, true);

    var foldEdge = [];
    var maxS = 0;
    for (var i = 0; i < peeledPoly.length; i++) {
      var v = peeledPoly[i];
      var s = (v.x - M.x) * N.x + (v.y - M.y) * N.y;
      if (s > maxS) maxS = s;
      if (Math.abs(s) < 0.08) foldEdge.push({ x: v.x, y: v.y });
    }

    var foreshorten = 1 - 0.13 * Math.sin(t * Math.PI);
    var archAmp = Math.sin(t * Math.PI) * Math.min(26, height * 0.065);
    var flapPoly = [];
    for (var j = 0; j < peeledPoly.length; j++) {
      var pv = peeledPoly[j];
      var distFold = Math.max(0, (pv.x - M.x) * N.x + (pv.y - M.y) * N.y);
      var isOnFold = distFold < 0.08;
      var archLift = maxS > 1 ? (distFold / maxS) * archAmp : 0;
      flapPoly.push({
        x: pv.x - 2 * distFold * foreshorten * N.x,
        y: pv.y - 2 * distFold * foreshorten * N.y - archLift,
        isOnFold: isOnFold,
        s: distFold
      });
    }

    return {
      W: width,
      H: height,
      t: t,
      C: C,
      P: P,
      M: M,
      N: N,
      lift: lift,
      maxS: maxS,
      unpeeledPoly: unpeeledPoly,
      peeledPoly: peeledPoly,
      foldEdge: foldEdge,
      flapPoly: flapPoly
    };
  }

  function polyToClipPath(poly, W, H) {
    if (!poly || poly.length < 3) return 'polygon(0% 0%, 0% 0%, 0% 0%)';
    var parts = [];
    for (var i = 0; i < poly.length; i++) {
      var xp = ((poly[i].x / W) * 100).toFixed(2);
      var yp = ((poly[i].y / H) * 100).toFixed(2);
      parts.push(xp + '% ' + yp + '%');
    }
    return 'polygon(' + parts.join(', ') + ')';
  }

  function prefersReducedMotion() {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return Boolean(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function isDarkTheme() {
    if (typeof document === 'undefined') return false;
    var rootAttr = document.documentElement && document.documentElement.getAttribute('data-theme');
    return rootAttr === 'dark' || Boolean(document.body && document.body.classList && document.body.classList.contains('dark'));
  }

  function getThemePaperBg(paperStyle) {
    var dark = isDarkTheme();
    if (paperStyle === 'ruled') return dark ? '#2a231c' : '#fcf8ee';
    if (paperStyle === 'kraft') return dark ? '#241e18' : '#f7f1e4';
    return dark ? '#211c17' : '#faf6ec';
  }

  function tracePolygon(ctx, pts, ox, oy) {
    if (!pts || pts.length < 3) return;
    ctx.beginPath();
    ctx.moveTo(pts[0].x + ox, pts[0].y + oy);
    for (var i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x + ox, pts[i].y + oy);
    }
    ctx.closePath();
  }

  function traceCurvedFlapPath(ctx, flapPoly, t, ox, oy) {
    if (!flapPoly || flapPoly.length < 3) return;
    var cx = 0;
    var cy = 0;
    for (var k = 0; k < flapPoly.length; k++) {
      cx += flapPoly[k].x;
      cy += flapPoly[k].y;
    }
    cx /= flapPoly.length;
    cy /= flapPoly.length;

    var bendFactor = Math.sin(t * Math.PI);
    ctx.beginPath();
    ctx.moveTo(flapPoly[0].x + ox, flapPoly[0].y + oy);
    for (var i = 0; i < flapPoly.length; i++) {
      var a = flapPoly[i];
      var b = flapPoly[(i + 1) % flapPoly.length];
      if (a.isOnFold && b.isOnFold) {
        ctx.lineTo(b.x + ox, b.y + oy);
      } else {
        var mx = (a.x + b.x) * 0.5;
        var my = (a.y + b.y) * 0.5;
        var segLen = Math.hypot(b.x - a.x, b.y - a.y);
        var rx = mx - cx;
        var ry = my - cy;
        var rLen = Math.hypot(rx, ry) || 1;
        var bow = bendFactor * Math.min(14, segLen * 0.068);
        var cpx = mx + (rx / rLen) * bow + ox;
        var cpy = my + (ry / rLen) * bow - bow * 0.25 + oy;
        ctx.quadraticCurveTo(cpx, cpy, b.x + ox, b.y + oy);
      }
    }
    ctx.closePath();
  }

  function drawBackFaceStationery(ctx, geom, ox, oy, paperStyle, dark) {
    var M = geom.M;
    var N = geom.N;
    var pad = Math.max(geom.W, geom.H) * 1.4;
    var angle = Math.atan2(N.y, N.x);

    // Base Japanese Tomoe River / cotton paper back-face tone
    var baseColor = dark
      ? (paperStyle === 'kraft' ? '#2c241b' : (paperStyle === 'ruled' ? '#2f2720' : '#2b241c'))
      : (paperStyle === 'kraft' ? '#f6ecd8' : (paperStyle === 'ruled' ? '#fcf8ee' : '#faf3e3'));
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, geom.W + ox * 2, geom.H + oy * 2);

    ctx.save();
    ctx.translate(M.x + ox, M.y + oy);
    ctx.rotate(angle);

    if (paperStyle === 'ruled') {
      // Soft rose vertical margin + 30px ruled notebook lines tilted with curled flap
      ctx.strokeStyle = dark ? 'rgba(208, 128, 114, 0.22)' : 'rgba(196, 110, 98, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-pad, -pad * 0.28);
      ctx.lineTo(pad, -pad * 0.28);
      ctx.stroke();

      ctx.strokeStyle = dark ? 'rgba(220, 198, 168, 0.08)' : 'rgba(116, 94, 72, 0.09)';
      for (var ry = -pad; ry <= pad; ry += 28) {
        ctx.beginPath();
        ctx.moveTo(-pad, ry);
        ctx.lineTo(pad, ry);
        ctx.stroke();
      }
    } else if (paperStyle === 'kraft') {
      ctx.strokeStyle = dark ? 'rgba(220, 196, 158, 0.07)' : 'rgba(130, 98, 62, 0.09)';
      ctx.lineWidth = 1;
      for (var ky = -pad; ky <= pad; ky += 24) {
        ctx.beginPath();
        ctx.moveTo(-pad, ky);
        ctx.lineTo(pad, ky);
        ctx.stroke();
      }
    } else {
      // 4mm Hobonichi subtle graph grid rotated into reflected flap coordinate space
      ctx.strokeStyle = dark ? 'rgba(225, 202, 168, 0.055)' : 'rgba(128, 102, 74, 0.07)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var gx = -pad; gx <= pad; gx += 16) {
        ctx.moveTo(gx, -pad);
        ctx.lineTo(gx, pad);
      }
      for (var gy = -pad; gy <= pad; gy += 16) {
        ctx.moveTo(-pad, gy);
        ctx.lineTo(pad, gy);
      }
      ctx.stroke();
    }

    // Subtle 52gsm paper bleed-through ghost lines for physical thinness
    ctx.fillStyle = dark ? 'rgba(240, 224, 196, 0.032)' : 'rgba(84, 62, 42, 0.045)';
    for (var row = -pad * 0.55; row <= pad * 0.55; row += 34) {
      var barW = 90 + ((Math.abs(Math.round(row)) * 37) % 140);
      ctx.fillRect(-pad * 0.65, row, barW, 4);
      ctx.fillRect(-pad * 0.65 + barW + 14, row, 52, 4);
    }
    ctx.restore();
  }

  /**
   * 5-layer HiDPI canvas renderer for the diagonal curved paper flap, specular bend highlight, and cast shadow.
   */
  function renderCurlFrame(ctx, geom, padX, padY, paperStyle, allowMultiSheet) {
    var totalW = geom.W + padX * 2;
    var totalH = geom.H + padY * 2;
    ctx.clearRect(0, 0, totalW, totalH);
    if (!geom || geom.t <= 0.0005 || geom.t >= 0.9995 || geom.flapPoly.length < 3) return;

    var dark = isDarkTheme();
    var sinT = Math.sin(geom.t * Math.PI);
    var M = geom.M;
    var N = geom.N;

    // Layer 1: Soft cast shadow falling onto the newly revealed page underneath (clipped to peeledPoly)
    if (geom.peeledPoly.length >= 3) {
      ctx.save();
      tracePolygon(ctx, geom.peeledPoly, padX, padY);
      ctx.clip();
      var shadowSpan = clamp((28 + 78 * sinT) * Math.min(1, geom.maxS / 42 + 0.3), 18, 124);
      var sg = ctx.createLinearGradient(
        M.x + padX,
        M.y + padY,
        M.x + padX + N.x * shadowSpan,
        M.y + padY + N.y * shadowSpan
      );
      if (dark) {
        sg.addColorStop(0, 'rgba(4, 2, 1, 0.68)');
        sg.addColorStop(0.28, 'rgba(7, 4, 2, 0.36)');
        sg.addColorStop(0.64, 'rgba(10, 6, 3, 0.12)');
        sg.addColorStop(1, 'rgba(10, 6, 3, 0)');
      } else {
        sg.addColorStop(0, 'rgba(42, 26, 12, 0.38)');
        sg.addColorStop(0.26, 'rgba(54, 34, 16, 0.20)');
        sg.addColorStop(0.64, 'rgba(68, 44, 22, 0.065)');
        sg.addColorStop(1, 'rgba(68, 44, 22, 0)');
      }
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, totalW, totalH);
      ctx.restore();
    }

    // Layer 2: Floating curled flap drop shadow onto the unpeeled page (clipped to unpeeledPoly)
    if (geom.unpeeledPoly.length >= 3) {
      ctx.save();
      tracePolygon(ctx, geom.unpeeledPoly, padX, padY);
      ctx.clip();

      ctx.shadowColor = dark ? 'rgba(3, 2, 1, 0.54)' : 'rgba(42, 26, 12, 0.28)';
      ctx.shadowBlur = 4 + 18 * sinT;
      ctx.shadowOffsetX = -6 * sinT;
      ctx.shadowOffsetY = 7 * sinT;
      ctx.fillStyle = dark ? '#2a221a' : '#f4ecdc';
      traceCurvedFlapPath(ctx, geom.flapPoly, geom.t, padX, padY);
      ctx.fill();
      ctx.restore();

      // Layer 3: Subtle pre-fold concave bend shading right beside the fold crease
      ctx.save();
      tracePolygon(ctx, geom.unpeeledPoly, padX, padY);
      ctx.clip();
      var bendW = 14 + 18 * sinT;
      var bgGrad = ctx.createLinearGradient(
        M.x + padX,
        M.y + padY,
        M.x + padX - N.x * bendW,
        M.y + padY - N.y * bendW
      );
      if (dark) {
        bgGrad.addColorStop(0, 'rgba(6, 4, 2, 0.34)');
        bgGrad.addColorStop(1, 'rgba(6, 4, 2, 0)');
      } else {
        bgGrad.addColorStop(0, 'rgba(58, 38, 18, 0.16)');
        bgGrad.addColorStop(1, 'rgba(58, 38, 18, 0)');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, totalW, totalH);
      ctx.restore();
    }

    // Layer 5 (drawn just behind primary flap): subtle 2nd-sheet stack thickness flutter on full spreads
    if (allowMultiSheet && paperStyle === 'grid' && geom.W >= 420 && geom.t > 0.12 && geom.t < 0.86) {
      var trail = computeFoldGeometry(geom.W, geom.H, Math.max(0.02, geom.t - 0.024));
      if (trail.flapPoly.length >= 3) {
        ctx.save();
        ctx.globalAlpha = 0.62;
        traceCurvedFlapPath(ctx, trail.flapPoly, trail.t, padX, padY);
        ctx.fillStyle = dark ? '#261f18' : '#efe6d4';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = dark ? 'rgba(218, 186, 138, 0.22)' : 'rgba(130, 98, 66, 0.28)';
        ctx.stroke();
        ctx.restore();
      }
    }

    // Layer 4: Primary curled back-face + cotton/grid texture + cylindrical specular highlight ridge
    ctx.save();
    traceCurvedFlapPath(ctx, geom.flapPoly, geom.t, padX, padY);
    ctx.clip();

    drawBackFaceStationery(ctx, geom, padX, padY, paperStyle, dark);

    var flapDepth = Math.max(24, geom.maxS * 1.06);
    var cyl = ctx.createLinearGradient(
      M.x + padX,
      M.y + padY,
      M.x + padX - N.x * flapDepth,
      M.y + padY - N.y * flapDepth
    );
    if (dark) {
      cyl.addColorStop(0, 'rgba(6, 4, 2, 0.60)');
      cyl.addColorStop(0.11, 'rgba(12, 8, 4, 0.24)');
      cyl.addColorStop(0.28, 'rgba(255, 222, 168, 0.24)');
      cyl.addColorStop(0.55, 'rgba(255, 214, 158, 0.05)');
      cyl.addColorStop(0.84, 'rgba(8, 5, 2, 0.20)');
      cyl.addColorStop(1, 'rgba(6, 4, 2, 0.36)');
    } else {
      cyl.addColorStop(0, 'rgba(52, 32, 14, 0.34)');
      cyl.addColorStop(0.10, 'rgba(86, 58, 30, 0.11)');
      cyl.addColorStop(0.27, 'rgba(255, 253, 245, 0.80)');
      cyl.addColorStop(0.54, 'rgba(255, 250, 238, 0.18)');
      cyl.addColorStop(0.84, 'rgba(70, 46, 22, 0.10)');
      cyl.addColorStop(1, 'rgba(52, 32, 14, 0.20)');
    }
    ctx.fillStyle = cyl;
    ctx.fillRect(0, 0, totalW, totalH);
    ctx.restore();

    // Sunlit outer rim highlight stroke on the curled paper flap
    ctx.save();
    traceCurvedFlapPath(ctx, geom.flapPoly, geom.t, padX, padY);
    ctx.lineWidth = 1.25;
    ctx.strokeStyle = dark ? 'rgba(232, 198, 148, 0.36)' : 'rgba(255, 253, 246, 0.88)';
    ctx.stroke();

    // Crisp micro crease shadow hairline right along the fold line
    if (geom.foldEdge.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(geom.foldEdge[0].x + padX, geom.foldEdge[0].y + padY);
      ctx.lineTo(geom.foldEdge[1].x + padX, geom.foldEdge[1].y + padY);
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = dark ? 'rgba(4, 2, 1, 0.56)' : 'rgba(62, 40, 20, 0.28)';
      ctx.stroke();
    }
    ctx.restore();
  }

  var activeTurns = new Map();
  var peekMap = new WeakMap();
  var PAD_X = 48;
  var PAD_Y = 44;

  function computeViewportWindow(stageEl) {
    var rect = stageEl.getBoundingClientRect();
    var fullW = Math.max(1, rect.width || stageEl.offsetWidth || 1);
    var fullH = Math.max(1, rect.height || stageEl.offsetHeight || 1);
    var vh = (typeof window !== 'undefined' && window.innerHeight) ? window.innerHeight : 900;
    if (fullH <= vh * 1.15) {
      return { fullW: fullW, fullH: fullH, visTop: 0, visH: fullH };
    }
    var visTop = Math.max(0, -rect.top);
    var visBottom = Math.min(fullH, vh - Math.max(0, rect.top));
    var visH = Math.max(260, Math.min(fullH - visTop, visBottom - visTop));
    if (visTop + visH > fullH) visTop = Math.max(0, fullH - visH);
    return { fullW: fullW, fullH: fullH, visTop: visTop, visH: visH };
  }

  function applyFullHeightClip(el, win, geom) {
    if (!el || !geom) return;
    if (geom.t <= 0.0005) {
      el.style.clipPath = '';
      el.style.webkitClipPath = '';
      return;
    }
    if (geom.t >= 0.9995) {
      el.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 0%)';
      el.style.webkitClipPath = 'polygon(0% 0%, 0% 0%, 0% 0%)';
      return;
    }
    var poly;
    if (win.visTop === 0 && Math.abs(win.fullH - win.visH) < 2) {
      poly = geom.unpeeledPoly;
    } else {
      var rectFull = [
        { x: 0, y: 0 },
        { x: win.fullW, y: 0 },
        { x: win.fullW, y: win.fullH },
        { x: 0, y: win.fullH }
      ];
      var mFull = { x: geom.M.x, y: geom.M.y + win.visTop };
      poly = clipPolyHalfPlane(rectFull, mFull, geom.N, false);
    }
    var cp = polyToClipPath(poly, win.fullW, win.fullH);
    el.style.clipPath = cp;
    el.style.webkitClipPath = cp;
  }

  function createCurlCanvas(parentEl, win, zIdx) {
    var cvs = document.createElement('canvas');
    cvs.className = 'techo-curl-canvas';
    cvs.setAttribute('aria-hidden', 'true');
    var dpr = Math.min((typeof window !== 'undefined' && window.devicePixelRatio) || 1, 2);
    var cssW = win.fullW + PAD_X * 2;
    var cssH = win.visH + PAD_Y * 2;
    cvs.width = Math.max(1, Math.round(cssW * dpr));
    cvs.height = Math.max(1, Math.round(cssH * dpr));
    cvs.style.position = 'absolute';
    cvs.style.left = -PAD_X + 'px';
    cvs.style.top = (win.visTop - PAD_Y) + 'px';
    cvs.style.width = cssW + 'px';
    cvs.style.height = cssH + 'px';
    cvs.style.pointerEvents = 'none';
    cvs.style.zIndex = String(zIdx || 55);
    parentEl.appendChild(cvs);
    var ctx = cvs.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { canvas: cvs, ctx: ctx };
  }

  function snapshotInlineProps(el, props) {
    var saved = {};
    if (!el) return saved;
    for (var i = 0; i < props.length; i++) {
      var k = props[i];
      saved[k] = el.style[k] || '';
    }
    return saved;
  }

  function restoreInlineProps(el, saved) {
    if (!el || !saved) return;
    for (var k in saved) {
      if (Object.prototype.hasOwnProperty.call(saved, k)) {
        el.style[k] = saved[k];
      }
    }
  }

  function cancelPeek(cardEl) {
    var p = peekMap.get(cardEl);
    if (!p) return;
    if (p.rafId && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(p.rafId);
    p.rafId = 0;
    if (p.canvas && p.canvas.parentNode) p.canvas.remove();
    p.canvas = null;
    p.ctx = null;
    if (p.topFace) {
      p.topFace.style.clipPath = '';
      p.topFace.style.webkitClipPath = '';
    }
    p.u = 0;
  }

  function cancelStageTurn(stageEl) {
    var ctrl = activeTurns.get(stageEl);
    if (ctrl) ctrl.finish(true);
  }

  function cancelAll() {
    var entries = [];
    activeTurns.forEach(function (ctrl) { entries.push(ctrl); });
    for (var i = 0; i < entries.length; i++) entries[i].finish(true);
  }

  function getActiveCount() {
    return activeTurns.size;
  }

  var STYLE_KEYS = [
    'clipPath', 'webkitClipPath', 'position', 'top', 'left', 'width',
    'maxHeight', 'overflow', 'zIndex', 'display', 'opacity',
    'pointerEvents', 'backgroundColor', 'willChange'
  ];

  /**
   * Smooth 60fps curved-paper turn between two live DOM elements (view switches or double-sided cards).
   */
  function turnLayers(stageEl, outgoingEl, incomingEl, opts) {
    var options = opts || {};
    var onComplete = typeof options.onComplete === 'function' ? options.onComplete : null;
    if (!stageEl || !outgoingEl || !incomingEl || prefersReducedMotion() || typeof document === 'undefined' || typeof requestAnimationFrame !== 'function') {
      if (onComplete) onComplete();
      return { cancel: function () {} };
    }

    cancelStageTurn(stageEl);
    var peekInfo = peekMap.get(stageEl);
    var peekU = peekInfo ? peekInfo.u : 0;
    cancelPeek(stageEl);

    var dir = options.dir === 'prev' ? 'prev' : 'next';
    var mode = options.mode === 'card' ? 'card' : 'view';
    var paperStyle = options.paperStyle || 'grid';
    var duration = Number(options.duration) || (mode === 'card' ? 520 : 620);

    var savedStage = snapshotInlineProps(stageEl, ['position', 'overflow']);
    var savedOut = snapshotInlineProps(outgoingEl, STYLE_KEYS);
    var savedIn = snapshotInlineProps(incomingEl, STYLE_KEYS);

    var compStage = (typeof getComputedStyle === 'function') ? getComputedStyle(stageEl) : null;
    if (!compStage || compStage.position === 'static') {
      stageEl.style.position = 'relative';
    }
    stageEl.setAttribute('data-techo-turning', dir);

    var paperBg = getThemePaperBg(paperStyle);

    if (mode === 'view') {
      // Take outgoingEl out of flow BEFORE measuring stageEl so win height matches incomingEl alone
      outgoingEl.style.display = 'block';
      outgoingEl.style.position = 'absolute';
      outgoingEl.style.top = '0px';
      outgoingEl.style.left = '0px';
      outgoingEl.style.width = '100%';
      outgoingEl.style.overflow = 'hidden';
      outgoingEl.style.pointerEvents = 'none';
      outgoingEl.style.backgroundColor = paperBg;

      incomingEl.style.display = 'block';
      incomingEl.style.opacity = '1';
      incomingEl.style.pointerEvents = 'auto';
    }

    var win = computeViewportWindow(stageEl);
    if (win.fullW < 36 || win.visH < 36) {
      restoreInlineProps(outgoingEl, savedOut);
      restoreInlineProps(incomingEl, savedIn);
      restoreInlineProps(stageEl, savedStage);
      stageEl.removeAttribute('data-techo-turning');
      if (onComplete) onComplete();
      return { cancel: function () {} };
    }

    if (mode === 'view') {
      var capH = Math.max(incomingEl.offsetHeight || 0, win.visH);
      outgoingEl.style.maxHeight = capH + 'px';
      if (dir === 'next') {
        outgoingEl.style.zIndex = '45';
        incomingEl.style.zIndex = '1';
      } else {
        outgoingEl.style.zIndex = '1';
        incomingEl.style.position = 'relative';
        incomingEl.style.zIndex = '45';
        incomingEl.style.backgroundColor = paperBg;
      }
    } else {
      outgoingEl.style.opacity = '1';
      incomingEl.style.opacity = '1';
      if (dir === 'next') {
        outgoingEl.style.zIndex = '6';
        incomingEl.style.zIndex = '2';
      } else {
        outgoingEl.style.zIndex = '2';
        incomingEl.style.zIndex = '6';
      }
    }

    var clipEl = dir === 'next' ? outgoingEl : incomingEl;
    clipEl.style.willChange = 'clip-path';

    var cvsBundle = createCurlCanvas(stageEl, win, mode === 'card' ? 16 : 55);
    var startU = clamp(typeof options.startU === 'number' ? options.startU : peekU, 0, 0.35);
    var fromU = dir === 'next' ? startU : 1;
    var toU = dir === 'next' ? 1 : 0;

    var done = false;
    var rafId = 0;
    var fallbackTimer = 0;
    var startTs = 0;

    function finish(cancelled) {
      if (done) return;
      done = true;
      if (rafId && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(rafId);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      activeTurns.delete(stageEl);

      if (cvsBundle.canvas && cvsBundle.canvas.parentNode) cvsBundle.canvas.remove();
      restoreInlineProps(outgoingEl, savedOut);
      restoreInlineProps(incomingEl, savedIn);
      restoreInlineProps(stageEl, savedStage);
      stageEl.removeAttribute('data-techo-turning');
      if (onComplete) onComplete(Boolean(cancelled));
    }

    var ctrl = { finish: finish, cancel: function () { finish(true); } };
    activeTurns.set(stageEl, ctrl);

    function step(ts) {
      if (done) return;
      if (!startTs) startTs = ts;
      var raw = clamp((ts - startTs) / duration, 0, 1);
      var eased = paperTurnEase(raw);
      var curU = fromU + (toU - fromU) * eased;
      var geom = computeFoldGeometry(win.fullW, win.visH, curU);

      applyFullHeightClip(clipEl, win, geom);
      if (cvsBundle.ctx) {
        renderCurlFrame(cvsBundle.ctx, geom, PAD_X, PAD_Y, paperStyle, mode === 'view');
      }

      if (raw >= 1) {
        finish(false);
      } else {
        rafId = requestAnimationFrame(step);
      }
    }

    // Draw initial frame immediately before first rAF tick to prevent flicker
    var initGeom = computeFoldGeometry(win.fullW, win.visH, fromU);
    applyFullHeightClip(clipEl, win, initGeom);
    if (cvsBundle.ctx) renderCurlFrame(cvsBundle.ctx, initGeom, PAD_X, PAD_Y, paperStyle, mode === 'view');

    rafId = requestAnimationFrame(step);
    fallbackTimer = setTimeout(function () { finish(false); }, duration + 260);
    return ctrl;
  }

  function sanitizeSnapshotClone(targetEl) {
    var clone = targetEl.cloneNode(true);
    clone.classList.add('techo-curl-snapshot');
    clone.setAttribute('aria-hidden', 'true');
    if (clone.hasAttribute('id')) clone.removeAttribute('id');
    if (clone.hasAttribute('name')) clone.removeAttribute('name');

    var srcCanvases = targetEl.querySelectorAll('canvas');
    var dstCanvases = clone.querySelectorAll('canvas');
    for (var i = 0; i < dstCanvases.length; i++) {
      var srcC = srcCanvases[i];
      var dstC = dstCanvases[i];
      if (!dstC || !dstC.parentNode) continue;
      try {
        var img = document.createElement('img');
        img.src = srcC.toDataURL('image/png');
        img.alt = '';
        img.style.width = (srcC.style.width || srcC.offsetWidth + 'px');
        img.style.height = (srcC.style.height || srcC.offsetHeight + 'px');
        img.style.display = 'block';
        dstC.parentNode.replaceChild(img, dstC);
      } catch (_e) {}
    }

    var srcFields = targetEl.querySelectorAll('textarea, input, select');
    var dstFields = clone.querySelectorAll('textarea, input, select');
    for (var f = 0; f < dstFields.length; f++) {
      var sf = srcFields[f];
      var df = dstFields[f];
      if (sf && df) {
        try { df.value = sf.value; } catch (_e) {}
      }
    }

    var all = clone.querySelectorAll('[id], [name]');
    for (var k = 0; k < all.length; k++) {
      all[k].removeAttribute('id');
      all[k].removeAttribute('name');
    }
    return clone;
  }

  /**
   * Turn an element updated synchronously via updateFn() by cloning its outgoing visual snapshot.
   */
  function turnSnapshot(targetEl, updateFn, opts) {
    var options = opts || {};
    var onComplete = typeof options.onComplete === 'function' ? options.onComplete : null;
    if (typeof updateFn !== 'function') return { cancel: function () {} };

    if (!targetEl || !targetEl.isConnected || prefersReducedMotion() || typeof document === 'undefined' || typeof requestAnimationFrame !== 'function') {
      updateFn();
      if (onComplete) onComplete();
      return { cancel: function () {} };
    }

    if (targetEl.parentElement) cancelStageTurn(targetEl.parentElement);

    var oldRect = targetEl.getBoundingClientRect();
    if (oldRect.width < 36 || oldRect.height < 36) {
      updateFn();
      if (onComplete) onComplete();
      return { cancel: function () {} };
    }

    var compTarget = (typeof getComputedStyle === 'function') ? getComputedStyle(targetEl) : null;
    var oldBg = (compTarget && compTarget.backgroundColor && compTarget.backgroundColor !== 'rgba(0, 0, 0, 0)' && compTarget.backgroundColor !== 'transparent')
      ? compTarget.backgroundColor
      : getThemePaperBg(options.paperStyle || 'grid');

    var clone = sanitizeSnapshotClone(targetEl);
    updateFn();

    var newEl = typeof options.getTargetAfter === 'function' ? options.getTargetAfter() : targetEl;
    if (!newEl || !newEl.isConnected) {
      if (onComplete) onComplete();
      return { cancel: function () {} };
    }

    var parent = newEl.parentElement;
    if (!parent) {
      if (onComplete) onComplete();
      return { cancel: function () {} };
    }

    var win = computeViewportWindow(newEl);
    if (win.fullW < 36 || win.visH < 36) {
      if (onComplete) onComplete();
      return { cancel: function () {} };
    }

    cancelStageTurn(parent);

    var dir = options.dir === 'prev' ? 'prev' : 'next';
    var paperStyle = options.paperStyle || 'grid';
    var duration = Number(options.duration) || 520;

    var savedParent = snapshotInlineProps(parent, ['position']);
    var savedNew = snapshotInlineProps(newEl, STYLE_KEYS);
    var compParent = (typeof getComputedStyle === 'function') ? getComputedStyle(parent) : null;
    if (!compParent || compParent.position === 'static') {
      parent.style.position = 'relative';
    }
    parent.setAttribute('data-techo-turning', dir);

    var newOffLeft = newEl.offsetLeft || 0;
    var newOffTop = newEl.offsetTop || 0;
    var maxSnapH = Math.max(win.fullH, Math.min(oldRect.height, (window.innerHeight || 900)));

    clone.style.position = 'absolute';
    clone.style.left = newOffLeft + 'px';
    clone.style.top = newOffTop + 'px';
    clone.style.width = win.fullW + 'px';
    clone.style.maxHeight = maxSnapH + 'px';
    clone.style.overflow = 'hidden';
    clone.style.margin = '0';
    clone.style.boxSizing = 'border-box';
    clone.style.backgroundColor = oldBg;
    clone.style.pointerEvents = 'none';

    if (dir === 'next') {
      clone.style.zIndex = '50';
      newEl.style.zIndex = '1';
    } else {
      clone.style.zIndex = '45';
      newEl.style.position = 'relative';
      newEl.style.zIndex = '50';
      var compNew = (typeof getComputedStyle === 'function') ? getComputedStyle(newEl) : null;
      if (!compNew || compNew.backgroundColor === 'rgba(0, 0, 0, 0)' || compNew.backgroundColor === 'transparent') {
        newEl.style.backgroundColor = getThemePaperBg(paperStyle);
      }
    }

    parent.appendChild(clone);

    var clipTarget = dir === 'next' ? clone : newEl;
    clipTarget.style.willChange = 'clip-path';

    var cvsBundle = createCurlCanvas(parent, win, 58);
    cvsBundle.canvas.style.left = (newOffLeft - PAD_X) + 'px';
    cvsBundle.canvas.style.top = (newOffTop + win.visTop - PAD_Y) + 'px';

    var fromU = dir === 'next' ? 0 : 1;
    var toU = dir === 'next' ? 1 : 0;
    var done = false;
    var rafId = 0;
    var fallbackTimer = 0;
    var startTs = 0;

    function finish(cancelled) {
      if (done) return;
      done = true;
      if (rafId && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(rafId);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      activeTurns.delete(parent);

      if (clone && clone.parentNode) clone.remove();
      if (cvsBundle.canvas && cvsBundle.canvas.parentNode) cvsBundle.canvas.remove();
      restoreInlineProps(newEl, savedNew);
      restoreInlineProps(parent, savedParent);
      parent.removeAttribute('data-techo-turning');
      if (onComplete) onComplete(Boolean(cancelled));
    }

    var ctrl = { finish: finish, cancel: function () { finish(true); } };
    activeTurns.set(parent, ctrl);

    function step(ts) {
      if (done) return;
      if (!startTs) startTs = ts;
      var raw = clamp((ts - startTs) / duration, 0, 1);
      var eased = paperTurnEase(raw);
      var curU = fromU + (toU - fromU) * eased;
      var geom = computeFoldGeometry(win.fullW, win.visH, curU);

      applyFullHeightClip(clipTarget, win, geom);
      if (cvsBundle.ctx) {
        renderCurlFrame(cvsBundle.ctx, geom, PAD_X, PAD_Y, paperStyle, win.fullW >= 460);
      }

      if (raw >= 1) {
        finish(false);
      } else {
        rafId = requestAnimationFrame(step);
      }
    }

    var initGeom = computeFoldGeometry(win.fullW, win.visH, fromU);
    applyFullHeightClip(clipTarget, win, initGeom);
    if (cvsBundle.ctx) renderCurlFrame(cvsBundle.ctx, initGeom, PAD_X, PAD_Y, paperStyle, win.fullW >= 460);

    rafId = requestAnimationFrame(step);
    fallbackTimer = setTimeout(function () { finish(false); }, duration + 260);
    return ctrl;
  }

  /**
   * Subtle hover corner-curl preview (dog-ear lift) on bottom-right corner of flashcards & study cards.
   */
  function attachCornerPeek(cardEl, opts) {
    if (!cardEl || typeof document === 'undefined' || typeof requestAnimationFrame !== 'function' || prefersReducedMotion()) return;
    if (cardEl.dataset && cardEl.dataset.techoPeekAttached === '1') return;
    if (cardEl.dataset) cardEl.dataset.techoPeekAttached = '1';

    var options = opts || {};
    var paperStyle = options.paperStyle || 'ruled';
    var state = { u: 0, targetU: 0, rafId: 0, canvas: null, ctx: null, topFace: null };
    peekMap.set(cardEl, state);

    function animateTo(nextTarget) {
      if (activeTurns.has(cardEl)) return;
      state.targetU = nextTarget;
      if (state.rafId) return;

      var topFace = typeof options.getTopFace === 'function' ? options.getTopFace() : null;
      var bottomFace = typeof options.getBottomFace === 'function' ? options.getBottomFace() : null;
      if (!topFace) return;
      state.topFace = topFace;
      if (bottomFace) {
        bottomFace.style.opacity = '1';
      }

      var rect = cardEl.getBoundingClientRect();
      var W = Math.max(1, rect.width || cardEl.offsetWidth || 1);
      var H = Math.max(1, rect.height || cardEl.offsetHeight || 1);
      if (W < 60 || H < 60) return;

      if (!state.canvas) {
        var cBundle = createCurlCanvas(cardEl, { fullW: W, fullH: H, visTop: 0, visH: H }, 14);
        state.canvas = cBundle.canvas;
        state.ctx = cBundle.ctx;
      }

      var lastTs = 0;
      function tick(ts) {
        if (activeTurns.has(cardEl)) {
          cancelPeek(cardEl);
          return;
        }
        if (!lastTs) lastTs = ts;
        var dt = Math.min(48, Math.max(8, ts - lastTs));
        lastTs = ts;

        var diff = state.targetU - state.u;
        state.u += diff * Math.min(1, dt * 0.016);
        if (Math.abs(diff) < 0.003) state.u = state.targetU;

        var geom = computeFoldGeometry(W, H, state.u);
        if (state.u <= 0.002 && state.targetU === 0) {
          cancelPeek(cardEl);
          if (bottomFace && !cardEl.classList.contains('flipped')) {
            bottomFace.style.opacity = '';
          }
          return;
        }

        var cp = polyToClipPath(geom.unpeeledPoly, W, H);
        topFace.style.clipPath = cp;
        topFace.style.webkitClipPath = cp;
        if (state.ctx) renderCurlFrame(state.ctx, geom, PAD_X, PAD_Y, paperStyle, false);

        state.rafId = requestAnimationFrame(tick);
      }
      state.rafId = requestAnimationFrame(tick);
    }

    cardEl.addEventListener('mouseenter', function () {
      if (prefersReducedMotion() || activeTurns.has(cardEl)) return;
      animateTo(0.085);
    });
    cardEl.addEventListener('mouseleave', function () {
      if (activeTurns.has(cardEl)) return;
      animateTo(0);
    });
  }

  var api = {
    paperTurnEase: paperTurnEase,
    computeFoldGeometry: computeFoldGeometry,
    turnLayers: turnLayers,
    turnSnapshot: turnSnapshot,
    attachCornerPeek: attachCornerPeek,
    cancelStageTurn: cancelStageTurn,
    cancelAll: cancelAll,
    getActiveCount: getActiveCount
  };

  if (root) root.TechoPageTurn = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
