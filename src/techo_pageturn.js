(function (root) {
  'use strict';

  function clamp(v, min, max) {
    return v < min ? min : (v > max ? max : v);
  }

  function smoothstep(edge0, edge1, x) {
    var t = edge1 === edge0 ? (x >= edge1 ? 1 : 0) : clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  /**
   * Smooth silk-like paper-turn easing: gentle thumb lift, fluid sweep, cushioned settle.
   */
  function paperTurnEase(p) {
    var t = clamp(Number(p) || 0, 0, 1);
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2 * t, 1.85);
    return 1 - 0.5 * Math.pow(2 * (1 - t), 2.35);
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
  function computeFoldGeometry(W, H, u, archDamp) {
    var width = Math.max(1, Number(W) || 1);
    var height = Math.max(1, Number(H) || 1);
    var t = clamp(Number(u) || 0, 0, 1);
    var d = typeof archDamp === 'number' ? clamp(archDamp, 0.25, 1) : 1;
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
    var lift = Math.sin(Math.pow(t, 0.82) * Math.PI) * Math.min(height * 0.34, width * 0.44, 172) * (0.72 + 0.28 * d);
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
    var archAmp = Math.sin(t * Math.PI) * Math.min(24 * d, height * 0.062 * d);
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

  function traceRoundedRect(ctx, x, y, w, h, r) {
    var rad = Math.min(r || 0, w * 0.45, h * 0.45);
    if (rad <= 0.5) {
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.lineTo(x + w - rad, y);
    ctx.arcTo(x + w, y, x + w, y + rad, rad);
    ctx.lineTo(x + w, y + h - rad);
    ctx.arcTo(x + w, y + h, x + w - rad, y + h, rad);
    ctx.lineTo(x + rad, y + h);
    ctx.arcTo(x, y + h, x, y + h - rad, rad);
    ctx.lineTo(x, y + rad);
    ctx.arcTo(x, y, x + rad, y, rad);
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
        var bow = bendFactor * Math.min(12, segLen * 0.06);
        var cpx = mx + (rx / rLen) * bow + ox;
        var cpy = my + (ry / rLen) * bow - bow * 0.2 + oy;
        ctx.quadraticCurveTo(cpx, cpy, b.x + ox, b.y + oy);
      }
    }
    ctx.closePath();
  }

  /**
   * Draw reflected back-face paper texture using the exact 2D Householder reflection
   * matrix across the fold crease so grid & ruled lines meet seamlessly at every angle.
   */
  function drawBackFaceStationery(ctx, geom, ox, oy, paperStyle, dark) {
    var M = geom.M;
    var N = geom.N;
    var W = geom.W;
    var H = geom.H;

    var baseColor = dark
      ? (paperStyle === 'kraft' ? '#2c241b' : (paperStyle === 'ruled' ? '#2f2720' : '#2b241c'))
      : (paperStyle === 'kraft' ? '#f6ecd8' : (paperStyle === 'ruled' ? '#fcf8ee' : '#faf3e3'));
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, W + ox * 2, H + oy * 2);

    ctx.save();
    // Exact Householder reflection P' = M + o + (I - 2 N N^T)(P - M)
    ctx.translate(M.x + ox, M.y + oy);
    ctx.transform(1 - 2 * N.x * N.x, -2 * N.x * N.y, -2 * N.x * N.y, 1 - 2 * N.y * N.y, 0, 0);
    ctx.translate(-M.x, -M.y);

    var pad = Math.max(W, H) * 0.35;
    if (paperStyle === 'ruled') {
      var marginX = W < 460 ? 22.5 : 44.5;
      ctx.strokeStyle = dark ? 'rgba(218, 114, 108, 0.24)' : 'rgba(198, 108, 96, 0.22)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(marginX, -pad);
      ctx.lineTo(marginX, H + pad);
      ctx.stroke();

      ctx.strokeStyle = dark ? 'rgba(220, 198, 168, 0.085)' : 'rgba(116, 94, 72, 0.095)';
      ctx.lineWidth = 1;
      for (var ry = 52; ry <= H + pad; ry += 29) {
        ctx.beginPath();
        ctx.moveTo(-pad, ry);
        ctx.lineTo(W + pad, ry);
        ctx.stroke();
      }

      // Faint 52gsm paper bleed-through ghost bars in card body region
      ctx.fillStyle = dark ? 'rgba(240, 224, 196, 0.03)' : 'rgba(84, 62, 42, 0.042)';
      for (var r = 74; r < H - 40; r += 34) {
        var bw = Math.min(W - marginX - 48, 86 + ((r * 29) % 120));
        if (bw > 24) ctx.fillRect(marginX + 18, r, bw, 4);
      }
    } else if (paperStyle === 'kraft') {
      ctx.strokeStyle = dark ? 'rgba(220, 196, 158, 0.075)' : 'rgba(130, 98, 62, 0.095)';
      ctx.lineWidth = 1;
      for (var ky = 24; ky <= H + pad; ky += 24) {
        ctx.beginPath();
        ctx.moveTo(-pad, ky);
        ctx.lineTo(W + pad, ky);
        ctx.stroke();
      }
    } else {
      var gridStep = 16;
      ctx.strokeStyle = dark ? 'rgba(225, 202, 168, 0.055)' : 'rgba(128, 102, 74, 0.07)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var gx = -pad; gx <= W + pad; gx += gridStep) {
        ctx.moveTo(gx, -pad);
        ctx.lineTo(gx, H + pad);
      }
      for (var gy = -pad; gy <= H + pad; gy += gridStep) {
        ctx.moveTo(-pad, gy);
        ctx.lineTo(W + pad, gy);
      }
      ctx.stroke();

      ctx.fillStyle = dark ? 'rgba(240, 224, 196, 0.025)' : 'rgba(84, 62, 42, 0.036)';
      for (var vr = 42; vr < H - 36; vr += 36) {
        var vbw = Math.min(W * 0.45, 92 + ((vr * 43) % 150));
        ctx.fillRect(28, vr, vbw, 4);
      }
    }
    ctx.restore();
  }

  /**
   * 5-layer HiDPI canvas renderer with card radius clipping, spine containment,
   * dual-layer cast shadow, Householder texture, and silky cylindrical paper highlights.
   */
  function renderCurlFrame(ctx, geom, padX, padY, paperStyle, renderOpts) {
    var opts = renderOpts || {};
    var allowMultiSheet = Boolean(opts.allowMultiSheet);
    var isView = Boolean(opts.isView);
    var isPeek = Boolean(opts.isPeek);
    var cardRadius = Number(opts.cardRadius) || 0;

    var totalW = geom.W + padX * 2;
    var totalH = geom.H + padY * 2;
    ctx.clearRect(0, 0, totalW, totalH);
    if (!geom || geom.t <= 0.0005 || geom.t >= 0.9995 || geom.flapPoly.length < 3) return;

    var entryAlpha = smoothstep(0, 0.065, geom.t);
    var exitAlpha = isPeek ? 1 : (1 - smoothstep(0.84, 1.0, geom.t));
    var envAlpha = clamp(entryAlpha * exitAlpha, 0, 1);
    if (envAlpha <= 0.005) return;

    var dark = isDarkTheme();
    var sinT = Math.sin(geom.t * Math.PI);
    var M = geom.M;
    var N = geom.N;

    ctx.save();
    // Constrain view curls so they roll into the left binder spine and never obscure top folder tabs
    if (isView) {
      ctx.beginPath();
      ctx.rect(padX - 6, padY - 12, geom.W + padX + 6, geom.H + padY + 12);
      ctx.clip();
    }

    // Layer 1: Dual-layer contact + penumbra cast shadow onto newly revealed page
    if (geom.peeledPoly.length >= 3) {
      ctx.save();
      ctx.globalAlpha = envAlpha;
      if (cardRadius > 0) {
        traceRoundedRect(ctx, padX, padY, geom.W, geom.H, cardRadius);
        ctx.clip();
      }
      tracePolygon(ctx, geom.peeledPoly, padX, padY);
      ctx.clip();

      var contactSpan = clamp(12 + 16 * sinT, 8, 28);
      var penSpan = clamp((28 + 78 * sinT) * Math.min(1, geom.maxS / 42 + 0.3), 18, 128);

      var cg = ctx.createLinearGradient(M.x + padX, M.y + padY, M.x + padX + N.x * contactSpan, M.y + padY + N.y * contactSpan);
      cg.addColorStop(0, dark ? 'rgba(2, 1, 0, 0.56)' : 'rgba(36, 22, 10, 0.30)');
      cg.addColorStop(1, dark ? 'rgba(2, 1, 0, 0)' : 'rgba(36, 22, 10, 0)');
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, totalW, totalH);

      var sg = ctx.createLinearGradient(M.x + padX, M.y + padY, M.x + padX + N.x * penSpan, M.y + padY + N.y * penSpan);
      if (dark) {
        sg.addColorStop(0, 'rgba(4, 2, 1, 0.48)');
        sg.addColorStop(0.32, 'rgba(8, 5, 2, 0.24)');
        sg.addColorStop(0.68, 'rgba(10, 6, 3, 0.08)');
        sg.addColorStop(1, 'rgba(10, 6, 3, 0)');
      } else {
        sg.addColorStop(0, 'rgba(48, 30, 14, 0.24)');
        sg.addColorStop(0.32, 'rgba(58, 36, 18, 0.13)');
        sg.addColorStop(0.68, 'rgba(68, 44, 22, 0.045)');
        sg.addColorStop(1, 'rgba(68, 44, 22, 0)');
      }
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, totalW, totalH);
      ctx.restore();
    }

    // Layer 2 & 3: Curled flap drop shadow + pre-fold concave shading onto unpeeled page
    if (geom.unpeeledPoly.length >= 3) {
      ctx.save();
      ctx.globalAlpha = envAlpha;
      if (cardRadius > 0) {
        traceRoundedRect(ctx, padX, padY, geom.W, geom.H, cardRadius);
        ctx.clip();
      }
      tracePolygon(ctx, geom.unpeeledPoly, padX, padY);
      ctx.clip();

      ctx.shadowColor = dark ? 'rgba(3, 2, 1, 0.56)' : 'rgba(42, 26, 12, 0.26)';
      ctx.shadowBlur = 4 + 18 * sinT;
      ctx.shadowOffsetX = -6 * sinT;
      ctx.shadowOffsetY = 7 * sinT;
      ctx.fillStyle = dark ? '#2a221a' : '#f4ecdc';
      traceCurvedFlapPath(ctx, geom.flapPoly, geom.t, padX, padY);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = envAlpha;
      if (cardRadius > 0) {
        traceRoundedRect(ctx, padX, padY, geom.W, geom.H, cardRadius);
        ctx.clip();
      }
      tracePolygon(ctx, geom.unpeeledPoly, padX, padY);
      ctx.clip();

      var bendW = 14 + 18 * sinT;
      var bgGrad = ctx.createLinearGradient(M.x + padX, M.y + padY, M.x + padX - N.x * bendW, M.y + padY - N.y * bendW);
      if (dark) {
        bgGrad.addColorStop(0, 'rgba(255, 224, 176, 0.08)');
        bgGrad.addColorStop(0.14, 'rgba(6, 4, 2, 0.30)');
        bgGrad.addColorStop(1, 'rgba(6, 4, 2, 0)');
      } else {
        bgGrad.addColorStop(0, 'rgba(255, 253, 246, 0.26)');
        bgGrad.addColorStop(0.14, 'rgba(58, 38, 18, 0.14)');
        bgGrad.addColorStop(1, 'rgba(58, 38, 18, 0)');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, totalW, totalH);
      ctx.restore();
    }

    // Layer 5: Subtle trailing 2nd-sheet paper stack rim during full-spread turns
    if (allowMultiSheet && paperStyle === 'grid' && geom.W >= 420 && geom.t > 0.12 && geom.t < 0.84) {
      var trail = computeFoldGeometry(geom.W, geom.H, Math.max(0.02, geom.t - 0.022), isView ? 0.52 : 1);
      if (trail.flapPoly.length >= 3) {
        ctx.save();
        ctx.globalAlpha = 0.56 * envAlpha;
        traceCurvedFlapPath(ctx, trail.flapPoly, trail.t, padX, padY);
        ctx.fillStyle = dark ? '#261f18' : '#efe6d4';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = dark ? 'rgba(218, 186, 138, 0.22)' : 'rgba(130, 98, 66, 0.26)';
        ctx.stroke();
        ctx.restore();
      }
    }

    // Layer 4: Primary curled back-face + Householder stationery + cylindrical specular highlight
    ctx.save();
    ctx.globalAlpha = clamp(entryAlpha * (isPeek ? 1 : 1 - smoothstep(0.86, 1.0, geom.t)), 0, 1);
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
      cyl.addColorStop(0, 'rgba(6, 4, 2, 0.62)');
      cyl.addColorStop(0.11, 'rgba(12, 8, 4, 0.24)');
      cyl.addColorStop(0.28, 'rgba(255, 224, 172, 0.25)');
      cyl.addColorStop(0.55, 'rgba(255, 214, 158, 0.05)');
      cyl.addColorStop(0.84, 'rgba(8, 5, 2, 0.20)');
      cyl.addColorStop(1, 'rgba(6, 4, 2, 0.36)');
    } else {
      cyl.addColorStop(0, 'rgba(52, 32, 14, 0.33)');
      cyl.addColorStop(0.10, 'rgba(86, 58, 30, 0.10)');
      cyl.addColorStop(0.27, 'rgba(255, 253, 246, 0.84)');
      cyl.addColorStop(0.54, 'rgba(255, 250, 238, 0.18)');
      cyl.addColorStop(0.84, 'rgba(70, 46, 22, 0.10)');
      cyl.addColorStop(1, 'rgba(52, 32, 14, 0.19)');
    }
    ctx.fillStyle = cyl;
    ctx.fillRect(0, 0, totalW, totalH);
    ctx.restore();

    // Sunlit outer rim highlight & fold crease hairline
    ctx.save();
    ctx.globalAlpha = envAlpha;
    traceCurvedFlapPath(ctx, geom.flapPoly, geom.t, padX, padY);
    ctx.lineWidth = 1.25;
    ctx.strokeStyle = dark ? 'rgba(232, 198, 148, 0.38)' : 'rgba(255, 253, 246, 0.90)';
    ctx.stroke();

    if (geom.foldEdge.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(geom.foldEdge[0].x + padX, geom.foldEdge[0].y + padY);
      ctx.lineTo(geom.foldEdge[1].x + padX, geom.foldEdge[1].y + padY);
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = dark ? 'rgba(4, 2, 1, 0.54)' : 'rgba(62, 40, 20, 0.25)';
      ctx.stroke();
    }
    ctx.restore();

    ctx.restore();
  }

  var activeTurns = new Map();
  var peekMap = new WeakMap();
  var PAD_X = 48;
  var PAD_Y = 44;

  function computeViewportWindow(el, overrideW) {
    var rect = el.getBoundingClientRect();
    var fullW = Math.max(1, overrideW || rect.width || el.offsetWidth || 1);
    var fullH = Math.max(1, rect.height || el.offsetHeight || 1);
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
      p.topFace.style.willChange = '';
    }
    if (p.bottomFace) {
      p.bottomFace.style.opacity = '';
      p.bottomFace.style.visibility = '';
    }
    p.u = 0;
    p.targetU = 0;
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
    'minHeight', 'maxHeight', 'height', 'overflow', 'margin', 'boxSizing',
    'zIndex', 'display', 'opacity', 'visibility', 'pointerEvents',
    'backgroundColor', 'willChange'
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
    // Clear any peek inline styles BEFORE capturing baseline inline props
    cancelPeek(stageEl);

    var dir = options.dir === 'prev' ? 'prev' : 'next';
    var mode = options.mode === 'card' ? 'card' : 'view';
    var paperStyle = options.paperStyle || 'grid';
    var duration = Number(options.duration) || (mode === 'card' ? 480 : 560);

    var savedStage = snapshotInlineProps(stageEl, ['position', 'overflow', 'minHeight']);
    var savedOut = snapshotInlineProps(outgoingEl, STYLE_KEYS);
    var savedIn = snapshotInlineProps(incomingEl, STYLE_KEYS);

    var compStage = (typeof getComputedStyle === 'function') ? getComputedStyle(stageEl) : null;
    if (!compStage || compStage.position === 'static') {
      stageEl.style.position = 'relative';
    }
    stageEl.setAttribute('data-techo-turning', dir);

    var paperBg = getThemePaperBg(paperStyle);
    var padTop = 0;
    var padLeft = 0;
    var padRight = 0;
    var padBottom = 0;
    var cardRadius = 0;
    var win;

    if (mode === 'view') {
      if (compStage) {
        padTop = parseFloat(compStage.paddingTop) || 0;
        padLeft = parseFloat(compStage.paddingLeft) || 0;
        padRight = parseFloat(compStage.paddingRight) || 0;
        padBottom = parseFloat(compStage.paddingBottom) || 0;
      }
      var contentW = Math.max(1, (stageEl.clientWidth || stageEl.offsetWidth || 1) - padLeft - padRight);

      // Position outgoingEl over the exact padded content box BEFORE measuring incomingEl
      outgoingEl.style.display = 'block';
      outgoingEl.style.position = 'absolute';
      outgoingEl.style.top = padTop + 'px';
      outgoingEl.style.left = padLeft + 'px';
      outgoingEl.style.width = contentW + 'px';
      outgoingEl.style.margin = '0';
      outgoingEl.style.boxSizing = 'border-box';
      outgoingEl.style.overflow = 'hidden';
      outgoingEl.style.pointerEvents = 'none';
      outgoingEl.style.opacity = '1';
      outgoingEl.style.visibility = 'visible';
      outgoingEl.style.backgroundColor = paperBg;

      incomingEl.style.display = 'block';
      incomingEl.style.opacity = '1';
      incomingEl.style.visibility = 'visible';
      incomingEl.style.pointerEvents = 'auto';

      var inH = Math.max(incomingEl.offsetHeight || 0, 1);
      stageEl.style.minHeight = Math.max(stageEl.offsetHeight || 0, inH + padTop + padBottom) + 'px';

      win = computeViewportWindow(incomingEl, contentW);
      win.fullH = Math.max(incomingEl.offsetHeight || 0, win.visH);
      if (win.fullW < 36 || win.visH < 36) {
        restoreInlineProps(outgoingEl, savedOut);
        restoreInlineProps(incomingEl, savedIn);
        restoreInlineProps(stageEl, savedStage);
        stageEl.removeAttribute('data-techo-turning');
        if (onComplete) onComplete();
        return { cancel: function () {} };
      }

      outgoingEl.style.maxHeight = win.fullH + 'px';
      outgoingEl.style.minHeight = Math.min(win.visH, win.fullH) + 'px';

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
      var compOut = (typeof getComputedStyle === 'function') ? getComputedStyle(outgoingEl) : null;
      cardRadius = (compOut && parseFloat(compOut.borderTopLeftRadius)) || 10;

      outgoingEl.style.opacity = '1';
      outgoingEl.style.visibility = 'visible';
      outgoingEl.style.pointerEvents = 'none';
      incomingEl.style.opacity = '1';
      incomingEl.style.visibility = 'visible';
      incomingEl.style.pointerEvents = 'none';

      win = computeViewportWindow(stageEl);
      if (win.fullW < 36 || win.visH < 36) {
        restoreInlineProps(outgoingEl, savedOut);
        restoreInlineProps(incomingEl, savedIn);
        restoreInlineProps(stageEl, savedStage);
        stageEl.removeAttribute('data-techo-turning');
        if (onComplete) onComplete();
        return { cancel: function () {} };
      }

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
    if (mode === 'view') {
      cvsBundle.canvas.style.left = (padLeft - PAD_X) + 'px';
      cvsBundle.canvas.style.top = (padTop + win.visTop - PAD_Y) + 'px';
    }

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

    var frameRenderOpts = {
      allowMultiSheet: mode === 'view',
      isView: mode === 'view',
      isPeek: false,
      cardRadius: cardRadius
    };

    function step(ts) {
      if (done) return;
      if (!startTs) startTs = ts;
      var raw = clamp((ts - startTs) / duration, 0, 1);
      var eased = paperTurnEase(raw);
      var curU = fromU + (toU - fromU) * eased;
      var geom = computeFoldGeometry(win.fullW, win.visH, curU, mode === 'view' ? 0.52 : 1);

      applyFullHeightClip(clipEl, win, geom);
      if (cvsBundle.ctx) {
        renderCurlFrame(cvsBundle.ctx, geom, PAD_X, PAD_Y, paperStyle, frameRenderOpts);
      }

      if (raw >= 1) {
        finish(false);
      } else {
        rafId = requestAnimationFrame(step);
      }
    }

    var initGeom = computeFoldGeometry(win.fullW, win.visH, fromU, mode === 'view' ? 0.52 : 1);
    applyFullHeightClip(clipEl, win, initGeom);
    if (cvsBundle.ctx) renderCurlFrame(cvsBundle.ctx, initGeom, PAD_X, PAD_Y, paperStyle, frameRenderOpts);

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
    var oldRadius = (compTarget && parseFloat(compTarget.borderTopLeftRadius)) || 0;

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

    cancelStageTurn(parent);

    var savedParent = snapshotInlineProps(parent, ['position', 'minHeight']);
    var savedNew = snapshotInlineProps(newEl, STYLE_KEYS);
    var compParent = (typeof getComputedStyle === 'function') ? getComputedStyle(parent) : null;
    if (!compParent || compParent.position === 'static') {
      parent.style.position = 'relative';
    }

    var newRect = newEl.getBoundingClientRect();
    var vh = (typeof window !== 'undefined' && window.innerHeight) ? window.innerHeight : 900;
    var maxBeforeLock = Math.max(oldRect.height, newRect.height);
    var lockH = 0;

    if (maxBeforeLock <= vh * 1.15) {
      lockH = Math.round(maxBeforeLock);
      newEl.style.minHeight = lockH + 'px';
      newRect = newEl.getBoundingClientRect();
    }

    var win = computeViewportWindow(newEl);
    if (win.fullW < 36 || win.visH < 36) {
      restoreInlineProps(newEl, savedNew);
      restoreInlineProps(parent, savedParent);
      if (onComplete) onComplete();
      return { cancel: function () {} };
    }

    parent.setAttribute('data-techo-turning', options.dir === 'prev' ? 'prev' : 'next');

    var parentRect = parent.getBoundingClientRect();
    var pBordL = (compParent && parseFloat(compParent.borderLeftWidth)) || 0;
    var pBordT = (compParent && parseFloat(compParent.borderTopWidth)) || 0;
    var offLeft = newRect.left - parentRect.left - pBordL;
    var offTop = newRect.top - parentRect.top - pBordT;

    var dir = options.dir === 'prev' ? 'prev' : 'next';
    var paperStyle = options.paperStyle || 'grid';
    var duration = Number(options.duration) || 480;

    clone.style.position = 'absolute';
    clone.style.left = offLeft + 'px';
    clone.style.top = offTop + 'px';
    clone.style.width = win.fullW + 'px';
    clone.style.margin = '0';
    clone.style.boxSizing = 'border-box';
    clone.style.overflow = 'hidden';
    clone.style.backgroundColor = oldBg;
    clone.style.pointerEvents = 'none';

    if (lockH > 0) {
      clone.style.minHeight = lockH + 'px';
      clone.style.height = lockH + 'px';
    } else {
      clone.style.maxHeight = Math.max(win.fullH, win.visH) + 'px';
      clone.style.minHeight = Math.min(win.fullH, win.visH) + 'px';
    }

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

    var compNewR = (typeof getComputedStyle === 'function') ? getComputedStyle(newEl) : null;
    var cardRadius = Math.max(oldRadius, (compNewR && parseFloat(compNewR.borderTopLeftRadius)) || 0);

    var clipTarget = dir === 'next' ? clone : newEl;
    clipTarget.style.willChange = 'clip-path';

    var cvsBundle = createCurlCanvas(parent, win, 58);
    cvsBundle.canvas.style.left = (offLeft - PAD_X) + 'px';
    cvsBundle.canvas.style.top = (offTop + win.visTop - PAD_Y) + 'px';

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

    var frameRenderOpts = {
      allowMultiSheet: win.fullW >= 460 && cardRadius <= 2,
      isView: false,
      isPeek: false,
      cardRadius: cardRadius
    };

    function step(ts) {
      if (done) return;
      if (!startTs) startTs = ts;
      var raw = clamp((ts - startTs) / duration, 0, 1);
      var eased = paperTurnEase(raw);
      var curU = fromU + (toU - fromU) * eased;
      var geom = computeFoldGeometry(win.fullW, win.visH, curU);

      applyFullHeightClip(clipTarget, win, geom);
      if (cvsBundle.ctx) {
        renderCurlFrame(cvsBundle.ctx, geom, PAD_X, PAD_Y, paperStyle, frameRenderOpts);
      }

      if (raw >= 1) {
        finish(false);
      } else {
        rafId = requestAnimationFrame(step);
      }
    }

    var initGeom = computeFoldGeometry(win.fullW, win.visH, fromU);
    applyFullHeightClip(clipTarget, win, initGeom);
    if (cvsBundle.ctx) renderCurlFrame(cvsBundle.ctx, initGeom, PAD_X, PAD_Y, paperStyle, frameRenderOpts);

    rafId = requestAnimationFrame(step);
    fallbackTimer = setTimeout(function () { finish(false); }, duration + 260);
    return ctrl;
  }

  /**
   * Subtle hover corner-curl preview (dog-ear lift) on bottom-right corner of unflipped flashcards & study cards.
   */
  function attachCornerPeek(cardEl, opts) {
    if (!cardEl || typeof document === 'undefined' || typeof requestAnimationFrame !== 'function' || prefersReducedMotion()) return;
    if (cardEl.dataset && cardEl.dataset.techoPeekAttached === '1') return;
    if (cardEl.dataset) cardEl.dataset.techoPeekAttached = '1';

    var options = opts || {};
    var paperStyle = options.paperStyle || 'ruled';
    var state = { u: 0, targetU: 0, rafId: 0, canvas: null, ctx: null, topFace: null, bottomFace: null };
    peekMap.set(cardEl, state);

    function checkFlipped() {
      if (typeof options.isFlipped === 'function') return Boolean(options.isFlipped());
      return cardEl.classList.contains('flipped');
    }

    function animateTo(nextTarget) {
      if (activeTurns.has(cardEl)) return;
      if (nextTarget > 0 && checkFlipped()) {
        cancelPeek(cardEl);
        return;
      }

      state.targetU = nextTarget;
      if (state.rafId) return;

      var topFace = typeof options.getTopFace === 'function' ? options.getTopFace() : null;
      var bottomFace = typeof options.getBottomFace === 'function' ? options.getBottomFace() : null;
      if (!topFace) return;
      state.topFace = topFace;
      state.bottomFace = bottomFace;
      if (bottomFace && nextTarget > 0) {
        bottomFace.style.opacity = '1';
        bottomFace.style.visibility = 'visible';
      }

      var rect = cardEl.getBoundingClientRect();
      var W = Math.max(1, rect.width || cardEl.offsetWidth || 1);
      var H = Math.max(1, rect.height || cardEl.offsetHeight || 1);
      if (W < 60 || H < 60) return;

      var compTop = (typeof getComputedStyle === 'function') ? getComputedStyle(topFace) : null;
      var cardRadius = (compTop && parseFloat(compTop.borderTopLeftRadius)) || 10;

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
        state.u += diff * Math.min(1, dt * 0.018);
        if (Math.abs(diff) < 0.003) state.u = state.targetU;

        var geom = computeFoldGeometry(W, H, state.u);
        if (state.u <= 0.002 && state.targetU === 0) {
          cancelPeek(cardEl);
          return;
        }

        var cp = polyToClipPath(geom.unpeeledPoly, W, H);
        topFace.style.clipPath = cp;
        topFace.style.webkitClipPath = cp;
        if (state.ctx) {
          renderCurlFrame(state.ctx, geom, PAD_X, PAD_Y, paperStyle, {
            allowMultiSheet: false,
            isView: false,
            isPeek: true,
            cardRadius: cardRadius
          });
        }

        state.rafId = requestAnimationFrame(tick);
      }
      state.rafId = requestAnimationFrame(tick);
    }

    cardEl.addEventListener('mouseenter', function () {
      if (prefersReducedMotion() || activeTurns.has(cardEl) || checkFlipped()) return;
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
