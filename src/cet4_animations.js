/* ==========================================================================
   CET-4 Interactive 60fps Canvas Visual Simulation Engine
   (window.Cet4AnimEngine)
   Aesthetic: Cozy Study Desk / Hobonichi & Midori Notebook
              (Warm Cocoa Study Board + Terracotta / Honey Ochre / Sage / Dusty Rose)
   7 Bespoke Simulators:
     1. ebbinghaus        - 14-day forgetting curve vs spaced-repetition spikes
     2. listening_radar   - 2-mode pre-read clustering & transition signal radar
     3. cloze_pipeline    - 15-word POS lane sorter & syntax slot eliminator
     4. long_read_scan    - Split-screen anchor searchlight & paraphrase lock
     5. careful_trap      - Evidence microscope & 5 CET-4 distractor stamps
     6. trans_restructure - Chinese-to-English syntactic block restructuring
     7. essay_builder     - 3-paragraph structural builder & 120-180 word gauge
   ========================================================================== */
(function (global) {
  'use strict';

  const PALETTE = {
    bg: '#26201a',
    bgDeep: '#1e1914',
    surface: '#312922',
    surfaceSoft: '#2b241d',
    border: '#d9cbb6',
    borderMuted: 'rgba(217, 203, 182, 0.28)',
    grid: 'rgba(245, 237, 224, 0.085)',
    ink: '#241c15',
    orange: '#e0703c',
    orangeDeep: '#cf5c28',
    emerald: '#65b38c',
    emeraldDeep: '#3f7a5c',
    gold: '#e8b34e',
    goldDeep: '#d6982e',
    rose: '#e2969c',
    crimson: '#df6b6b',
    ivory: '#f5ede0',
    cream: '#ddd0bd',
    muted: '#a49483'
  };

  const FONT_SANS = '"PingFang SC", "Microsoft YaHei UI", "HarmonyOS Sans SC", system-ui, sans-serif';
  const FONT_SERIF = 'Georgia, Cambria, "Times New Roman", serif';
  const FONT_NUM = '"Cascadia Code", "Consolas", "Microsoft YaHei UI", sans-serif';

  const ANIM_META = {
    ebbinghaus: {
      id: 'ebbinghaus',
      title: '14天艾宾浩斯遗忘与间隔带背雷达',
      subtitle: '对比不复习断崖遗忘 vs. Day 1/2/4/7/11 精准复现跃升',
      caption: '点击画布中 Day 1 / 2 / 4 / 7 / 11 节点，实时开关复习计划并观察第 14 天词库留存率变化。',
      interactHint: '点击节点可开关当日复现',
      accent: PALETTE.orange,
      modes: [
        { id: 'spaced', label: '14天间隔带背' },
        { id: 'cram', label: '考前突击对比' }
      ]
    },
    listening_radar: {
      id: 'listening_radar',
      title: '听力“未听先知”预读与转折同义雷达',
      subtitle: '选项聚类预判 + 声波捕捉 but/however 信号词与同义锁',
      caption: '切换双模式演示：先看如何 15 秒扫描选项聚类，再看放音时如何避开原词陷阱锁定同义改写。',
      interactHint: '点击选项卡片查看干扰/同义诊断',
      accent: PALETTE.emerald,
      modes: [
        { id: 'preread', label: '未听先知预读' },
        { id: 'signal', label: '转折信号与同义雷达' }
      ]
    },
    cloze_pipeline: {
      id: 'cloze_pipeline',
      title: '选词填空 15选10 词性分流与槽位秒杀',
      subtitle: '15词自动归入 n./v./adj./adv. 四道，15 -> 4 -> 1 逐层锁定',
      caption: '点击四条词性泳道或单步推进，看语法槽位如何先筛词性、再靠固定搭配 8 秒定答案。',
      interactHint: '点击词性泳道高亮候选词',
      accent: PALETTE.gold,
      modes: [
        { id: 'auto', label: '全流程演示' },
        { id: 'verb_slot', label: '动词槽位特写' }
      ]
    },
    long_read_scan: {
      id: 'long_read_scan',
      title: '长篇阅读信息匹配：锚点扫读激光器',
      subtitle: '提取年份/专名/生僻词锚点 -> 扫读 A-G 段 -> 锁定同义改写',
      caption: '点击右侧 A–G 任意段落，可立即切换探照灯检视该段是干扰词还是同义锁定位段。',
      interactHint: '点击 A–G 段落快速检视',
      accent: PALETTE.orange,
      modes: [
        { id: 'scan', label: '自动扫读定位' },
        { id: 'paraphrase', label: '同义改写对照' }
      ]
    },
    careful_trap: {
      id: 'careful_trap',
      title: '仔细阅读证据显微镜与五大干扰项排雷',
      subtitle: '锁定回文证据句，逐一盖章识破四级经典五大错项陷阱',
      caption: '点击底部任意标签，立即把证据显微镜切换到该干扰项或同义正解。',
      interactHint: '点击下方标签切换 5 大陷阱',
      accent: PALETTE.crimson,
      modes: [
        { id: 'cycle', label: '逐项排雷巡检' },
        { id: 'compare', label: '定位句对比' }
      ]
    },
    trans_restructure: {
      id: 'trans_restructure',
      title: '汉译英拆句重组语法树',
      subtitle: '拆解 [主干] + [长定语] + [状语]，平滑重排为地道英文 SVO',
      caption: '观察中文前置长定语如何后移为介词短语/从句，一键切换两组四级真题高频句型。',
      interactHint: '点击语法色块查看句法职责',
      accent: PALETTE.emerald,
      modes: [
        { id: 'heritage', label: '四合院·长定语后置' },
        { id: 'campus', label: '校园环保·时间状语与主干' }
      ]
    },
    essay_builder: {
      id: 'essay_builder',
      title: '作文三段式积木与 120–180 词仪表盘',
      subtitle: '三段骨架逐块搭建 + 高分衔接词芯片飞入 + 黄金词数表盘',
      caption: '点击任意段落卡片查看句型配额，观察衔接词与论据如何稳稳推高到 120–180 词高分带。',
      interactHint: '点击段落块查看字数配额',
      accent: PALETTE.gold,
      modes: [
        { id: 'opinion', label: '议论观点三段式' },
        { id: 'proposal', label: '校园建议/投稿式' }
      ]
    }
  };

  const ANIM_IDS = Object.keys(ANIM_META);
  const activeInstances = new Map();
  let rafId = null;
  let lastTs = 0;
  let stylesInjected = false;
  let lightboxInst = null;

  /* -------------------- Easing & Math Helpers -------------------- */
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const clamp01 = t => (t < 0 ? 0 : (t > 1 ? 1 : t));
  const lerp = (a, b, t) => a + (b - a) * t;

  const Ease = {
    outExpo: t => { t = clamp01(t); return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); },
    outQuint: t => { t = clamp01(t); return 1 - Math.pow(1 - t, 5); },
    inOutCubic: t => { t = clamp01(t); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    outBack: t => { t = clamp01(t); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    expDamp: (cur, target, lambda, dt) => cur + (target - cur) * (1 - Math.exp(-lambda * dt))
  };

  /* -------------------- HiDPI & Vector Primitives -------------------- */
  function setupHiDPI(canvas, fallbackW, fallbackH) {
    const dpr = Math.min((typeof window !== 'undefined' && window.devicePixelRatio) || 1, 2);
    const rect = canvas.getBoundingClientRect ? canvas.getBoundingClientRect() : { width: fallbackW || 720, height: fallbackH || 380 };
    const w = Math.max(280, Math.round(rect.width || fallbackW || 720));
    const h = Math.max(230, Math.round(rect.height || fallbackH || 380));
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  function roundRectPath(ctx, x, y, w, h, r) {
    const rad = Math.min(r || 0, Math.abs(w) / 2, Math.abs(h) / 2);
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, rad);
    } else {
      ctx.moveTo(x + rad, y);
      ctx.lineTo(x + w - rad, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
      ctx.lineTo(x + w, y + h - rad);
      ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
      ctx.lineTo(x + rad, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
      ctx.lineTo(x, y + rad);
      ctx.quadraticCurveTo(x, y, x + rad, y);
      ctx.closePath();
    }
  }

  function drawSalonBg(ctx, w, h) {
    // Warm Cocoa Study Board (#26201a) with fine craft-grid dots (ZERO shadowBlur)
    ctx.fillStyle = PALETTE.bg;
    ctx.fillRect(0, 0, w, h);

    // Subtle fine craft-grid dot matrix
    ctx.fillStyle = PALETTE.grid;
    const step = 20;
    for (let x = 16; x < w - 10; x += step) {
      for (let y = 16; y < h - 10; y += step) {
        ctx.fillRect(x, y, 1.3, 1.3);
      }
    }

    // Soft rounded study-board hairline frame
    ctx.strokeStyle = 'rgba(217, 203, 182, 0.22)';
    ctx.lineWidth = 1.2;
    roundRectPath(ctx, 7, 7, w - 14, h - 14, 8);
    ctx.stroke();

    // Delicate honey-ochre stationery corner ticks
    const mk = 8;
    ctx.strokeStyle = 'rgba(232, 179, 78, 0.58)';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(12, 12 + mk); ctx.lineTo(12, 12); ctx.lineTo(12 + mk, 12);
    ctx.moveTo(w - 12 - mk, 12); ctx.lineTo(w - 12, 12); ctx.lineTo(w - 12, 12 + mk);
    ctx.moveTo(12, h - 12 - mk); ctx.lineTo(12, h - 12); ctx.lineTo(12 + mk, h - 12);
    ctx.moveTo(w - 12 - mk, h - 12); ctx.lineTo(w - 12, h - 12); ctx.lineTo(w - 12, h - 12 - mk);
    ctx.stroke();
  }

  function drawHardBox(ctx, x, y, w, h, opts = {}) {
    const r = opts.r != null ? Math.max(opts.r, 6) : 6;
    const hasShadow = (opts.shadowX == null || opts.shadowX !== 0) || (opts.shadowY == null || opts.shadowY !== 0);
    const fill = opts.fill || PALETTE.surface;
    const stroke = opts.stroke || PALETTE.borderMuted;
    const lw = opts.lineWidth != null ? Math.min(opts.lineWidth, 1.8) : 1.3;
    if (hasShadow) {
      roundRectPath(ctx, x, y + 2, w, h, r);
      ctx.fillStyle = 'rgba(14, 10, 7, 0.34)';
      ctx.fill();
    }
    roundRectPath(ctx, x, y, w, h, r);
    ctx.fillStyle = fill;
    ctx.fill();
    if (lw > 0) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lw;
      ctx.stroke();
    }
  }

  function drawPill(ctx, x, y, text, opts = {}) {
    const bg = opts.bg || PALETTE.surface;
    const fg = opts.fg || PALETTE.ivory;
    const border = opts.border || PALETTE.borderMuted;
    const shadow = opts.shadow !== false;
    const font = opts.font || `700 11.5px ${FONT_SANS}`;
    const padX = opts.padX != null ? opts.padX : 10;
    const h = opts.h || 23;
    const r = opts.r != null ? Math.max(opts.r, 6) : 6;
    ctx.save();
    ctx.font = font;
    const tw = ctx.measureText(text).width;
    const pw = tw + padX * 2;
    if (shadow) {
      roundRectPath(ctx, x, y + 1.5, pw, h, r);
      ctx.fillStyle = 'rgba(14, 10, 7, 0.28)';
      ctx.fill();
    }
    roundRectPath(ctx, x, y, pw, h, r);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.strokeStyle = border;
    ctx.lineWidth = opts.lineWidth != null ? Math.min(opts.lineWidth, 1.5) : 1.2;
    ctx.stroke();
    ctx.fillStyle = fg;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + padX, y + h / 2 + 0.5);
    ctx.restore();
    return { w: pw, h };
  }

  function drawArrow(ctx, x1, y1, x2, y2, color, width = 2.2, headLen = 8.5) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (Math.hypot(dx, dy) < 2) return;
    const ang = Math.atan2(dy, dx);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(ang - 0.44), y2 - headLen * Math.sin(ang - 0.44));
    ctx.lineTo(x2 - headLen * Math.cos(ang + 0.44), y2 - headLen * Math.sin(ang + 0.44));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawCurvedArc(ctx, x1, y1, cx, cy, x2, y2, progress, color, width = 2.4) {
    const steps = 28;
    const lim = Math.max(1, Math.floor(steps * clamp01(progress)));
    ctx.save();
    // Crisp subtle warm-cocoa backing (ZERO shadowBlur)
    ctx.lineCap = 'round';
    let px = x1, py = y1;
    let prevX = x1, prevY = y1;
    const drawCurve = (ox, oy, col, lw) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = lw;
      ctx.beginPath();
      for (let i = 0; i <= lim; i++) {
        const u = i / steps;
        const omt = 1 - u;
        const qx = omt * omt * x1 + 2 * omt * u * cx + u * u * x2;
        const qy = omt * omt * y1 + 2 * omt * u * cy + u * u * y2;
        if (i === 0) ctx.moveTo(qx + ox, qy + oy);
        else ctx.lineTo(qx + ox, qy + oy);
        if (ox === 0 && oy === 0) {
          if (i === lim - 1) { prevX = qx; prevY = qy; }
          px = qx; py = qy;
        }
      }
      ctx.stroke();
    };
    drawCurve(0, 1.5, 'rgba(14, 10, 7, 0.38)', width + 1);
    drawCurve(0, 0, color, width);
    if (progress > 0.15) {
      const ang = Math.atan2(py - prevY, px - prevX);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - 8.5 * Math.cos(ang - 0.42), py - 8.5 * Math.sin(ang - 0.42));
      ctx.lineTo(px - 8.5 * Math.cos(ang + 0.42), py - 8.5 * Math.sin(ang + 0.42));
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawCheckIcon(ctx, cx, cy, r, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.45, cy + r * 0.02);
    ctx.lineTo(cx - r * 0.1, cy + r * 0.38);
    ctx.lineTo(cx + r * 0.52, cy - r * 0.36);
    ctx.stroke();
    ctx.restore();
  }

  function drawCrossIcon(ctx, cx, cy, r, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.4, cy - r * 0.4);
    ctx.lineTo(cx + r * 0.4, cy + r * 0.4);
    ctx.moveTo(cx + r * 0.4, cy - r * 0.4);
    ctx.lineTo(cx - r * 0.4, cy + r * 0.4);
    ctx.stroke();
    ctx.restore();
  }

  function drawStamp(ctx, cx, cy, label, color, progress, tiltDeg = -6) {
    const p = Ease.outBack(clamp01(progress));
    const scale = lerp(1.55, 1.0, clamp01(progress * 1.4));
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((tiltDeg * Math.PI) / 180);
    ctx.scale(scale * (0.4 + 0.6 * p), scale * (0.4 + 0.6 * p));
    ctx.globalAlpha = clamp01(progress * 2.2);
    ctx.font = `700 11px ${FONT_SANS}`;
    const tw = ctx.measureText(label).width;
    const bw = tw + 18;
    const bh = 24;
    // Soft cocoa contact shadow
    roundRectPath(ctx, -bw / 2, -bh / 2 + 2, bw, bh, 6);
    ctx.fillStyle = 'rgba(14, 10, 7, 0.36)';
    ctx.fill();
    // Rounded stationery rubber-stamp body
    roundRectPath(ctx, -bw / 2, -bh / 2, bw, bh, 6);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = PALETTE.ivory;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    // Delicate inner hanko border
    roundRectPath(ctx, -bw / 2 + 2.5, -bh / 2 + 2.5, bw - 5, bh - 5, 4);
    ctx.strokeStyle = 'rgba(36, 28, 21, 0.35)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = PALETTE.ink;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 0, 0.5);
    ctx.restore();
  }

  function wrapCanvasText(ctx, text, maxW, maxLines = 3) {
    const words = String(text || '').split(' ');
    const lines = [];
    let cur = '';
    for (let i = 0; i < words.length; i++) {
      const next = cur ? cur + ' ' + words[i] : words[i];
      if (ctx.measureText(next).width > maxW && cur) {
        lines.push(cur);
        cur = words[i];
        if (lines.length >= maxLines - 1) break;
      } else {
        cur = next;
      }
    }
    if (cur && lines.length < maxLines) lines.push(cur);
    return lines;
  }

  function wrapMixedText(ctx, text, maxW, maxLines = 2) {
    const s = String(text || '');
    const lines = [];
    let cur = '';
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      const test = cur + ch;
      if (ctx.measureText(test).width > maxW && cur) {
        lines.push(cur);
        cur = ch;
        if (lines.length >= maxLines - 1) {
          const rest = s.slice(i);
          if (ctx.measureText(rest).width <= maxW) {
            lines.push(rest);
          } else {
            let trimmed = rest;
            while (trimmed.length > 2 && ctx.measureText(trimmed + '...').width > maxW) {
              trimmed = trimmed.slice(0, -1);
            }
            lines.push(trimmed + '...');
          }
          return lines;
        }
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  /* ========================================================================
     1. EBBINGHAUS (14-Day Forgetting Curve vs Spaced-Repetition Spikes)
     ======================================================================== */
  function createEbbinghausSim(canvas, narratorEl, opts = {}) {
    let mode = opts.mode || 'spaced';
    let playing = true;
    let speed = 1;
    let t = 0;
    const reviewDays = [
      { day: 1, active: true, load: 28, pulse: 0 },
      { day: 2, active: true, load: 42, pulse: 0 },
      { day: 4, active: true, load: 56, pulse: 0 },
      { day: 7, active: true, load: 64, pulse: 0 },
      { day: 11, active: true, load: 48, pulse: 0 }
    ];
    let hitNodes = [];
    let hoveredIdx = -1;
    let particles = [];
    let lastCrossDay = -1;
    let smoothedFinal = 91;

    function calcSpacedRetention(dayFloat) {
      if (mode === 'cram') {
        if (dayFloat < 11.5) return 18 + 82 * Math.exp(-0.44 * dayFloat);
        const u = clamp01((dayFloat - 11.5) / 1.5);
        return lerp(22, 68, Ease.outExpo(u)) - Math.max(0, (dayFloat - 13) * 14);
      }
      let segStart = 0;
      let decay = 0.42;
      let base = 100;
      for (let i = 0; i < reviewDays.length; i++) {
        const rd = reviewDays[i];
        if (!rd.active) continue;
        if (dayFloat >= rd.day) {
          segStart = rd.day;
          decay = Math.max(0.032, decay * 0.56);
          base = 99;
        }
      }
      const dtSeg = Math.max(0, dayFloat - segStart);
      return 16 + (base - 16) * Math.exp(-decay * dtSeg);
    }

    function calcUnreviewed(dayFloat) {
      return 16 + 84 * Math.exp(-0.42 * dayFloat);
    }

    function spawnSparks(x, y, color) {
      for (let i = 0; i < 12; i++) {
        const ang = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
        const spd = 28 + Math.random() * 52;
        particles.push({ x, y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd - 12, life: 1, color });
      }
    }

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let i = 0; i < hitNodes.length; i++) {
        const hn = hitNodes[i];
        if (Math.hypot(mx - hn.x, my - hn.y) <= 22) {
          if (mode === 'cram') mode = 'spaced';
          reviewDays[i].active = !reviewDays[i].active;
          reviewDays[i].pulse = 1;
          spawnSparks(hn.x, hn.y, reviewDays[i].active ? PALETTE.emerald : PALETTE.crimson);
          return;
        }
      }
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      hoveredIdx = -1;
      for (let i = 0; i < hitNodes.length; i++) {
        if (Math.hypot(mx - hitNodes[i].x, my - hitNodes[i].y) <= 22) {
          hoveredIdx = i;
          break;
        }
      }
      canvas.style.cursor = hoveredIdx >= 0 ? 'pointer' : 'default';
    }

    canvas.addEventListener('click', onClick);
    canvas.addEventListener('mousemove', onMove);

    function render(dt) {
      const { ctx, w, h } = setupHiDPI(canvas);
      drawSalonBg(ctx, w, h);
      if (playing) t += dt * speed;

      const compact = w < 480;
      const padL = compact ? 42 : 56;
      const padR = compact ? 18 : 28;
      const padT = 56;
      const padB = 46;
      const gw = w - padL - padR;
      const gh = h - padT - padB;
      const xOf = d => padL + (d / 14) * gw;
      const yOf = pct => padT + (1 - clamp(pct, 0, 100) / 100) * gh;

      // Grid horizontal lines
      ctx.font = `bold 10.5px ${FONT_NUM}`;
      ctx.textBaseline = 'middle';
      [20, 40, 60, 80, 100].forEach(val => {
        const yy = yOf(val);
        ctx.strokeStyle = val === 80 ? PALETTE.gold : 'rgba(217, 203, 182, 0.14)';
        ctx.lineWidth = val === 80 ? 1.5 : 1;
        if (val === 80) ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(padL, yy);
        ctx.lineTo(padL + gw, yy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = val === 80 ? PALETTE.gold : PALETTE.muted;
        ctx.textAlign = 'right';
        ctx.fillText(val + '%', padL - 7, yy);
      });
      drawPill(ctx, padL + 6, yOf(80) - 22, '80% 考场稳记警戒线', {
        bg: PALETTE.gold,
        fg: PALETTE.ink,
        border: PALETTE.ivory,
        h: 19,
        padX: 7,
        font: `700 10px ${FONT_SANS}`
      });

      // Axes
      ctx.strokeStyle = 'rgba(217, 203, 182, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, padT + gh);
      ctx.lineTo(padL + gw, padT + gh);
      ctx.stroke();

      // Day ticks
      const tickStep = compact ? 2 : 1;
      ctx.font = `bold 10.5px ${FONT_NUM}`;
      ctx.textAlign = 'center';
      for (let d = 0; d <= 14; d += tickStep) {
        const xx = xOf(d);
        ctx.fillStyle = PALETTE.cream;
        ctx.fillText('D' + d, xx, padT + gh + 16);
      }

      // Unreviewed forgetting curve (dashed dusty rose)
      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = PALETTE.crimson;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      for (let k = 0; k <= 70; k++) {
        const d = (k / 70) * 14;
        const px = xOf(d);
        const py = yOf(calcUnreviewed(d));
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = PALETTE.crimson;
      ctx.font = `700 10.5px ${FONT_SANS}`;
      ctx.textAlign = 'right';
      ctx.fillText('不复习自然遗忘 (D14 仅 16%)', padL + gw - 4, yOf(18) - 10);
      ctx.restore();

      // Active playhead day
      const cycle = (t * 2.15) % 16.2;
      const curDay = Math.min(14, cycle);

      // Soft botanical tint under spaced curve up to curDay
      ctx.save();
      ctx.beginPath();
      const samples = 140;
      for (let k = 0; k <= samples; k++) {
        const d = (k / samples) * curDay;
        const px = xOf(d);
        const py = yOf(calcSpacedRetention(d));
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.lineTo(xOf(curDay), padT + gh);
      ctx.lineTo(xOf(0), padT + gh);
      ctx.closePath();
      ctx.fillStyle = mode === 'cram' ? 'rgba(224, 112, 60, 0.18)' : 'rgba(101, 179, 140, 0.16)';
      ctx.fill();

      // Warm cocoa backing + smooth chalk stroke (ZERO shadowBlur)
      const strokeCol = mode === 'cram' ? PALETTE.orange : PALETTE.emerald;
      const drawCurvePath = (ox, oy) => {
        ctx.beginPath();
        for (let k = 0; k <= samples; k++) {
          const d = (k / samples) * curDay;
          const px = xOf(d) + ox;
          const py = yOf(calcSpacedRetention(d)) + oy;
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      };
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(14, 10, 7, 0.36)';
      ctx.lineWidth = 4.2;
      drawCurvePath(0, 1.5);
      ctx.strokeStyle = strokeCol;
      ctx.lineWidth = 3;
      drawCurvePath(0, 0);
      ctx.restore();

      // Trigger particle burst when playhead crosses an active review day
      if (curDay < 0.3) lastCrossDay = -1;
      reviewDays.forEach(rd => {
        if (mode === 'spaced' && rd.active && curDay >= rd.day && lastCrossDay < rd.day) {
          lastCrossDay = rd.day;
          rd.pulse = 1;
          spawnSparks(xOf(rd.day), yOf(99), PALETTE.gold);
        }
        rd.pulse = Math.max(0, rd.pulse - dt * 1.8);
      });

      // Interactive review nodes (Day 1, 2, 4, 7, 11)
      hitNodes = [];
      reviewDays.forEach((rd, idx) => {
        const nx = xOf(rd.day);
        const ny = mode === 'spaced' && rd.active ? yOf(99) : yOf(calcSpacedRetention(rd.day - 0.01));
        hitNodes.push({ x: nx, y: ny, idx });

        // Vertical guide stem
        ctx.save();
        ctx.strokeStyle = rd.active && mode === 'spaced'
          ? 'rgba(232, 179, 78, 0.44)'
          : 'rgba(164, 148, 131, 0.22)';
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(nx, padT + gh);
        ctx.stroke();
        ctx.setLineDash([]);

        if (rd.pulse > 0) {
          const rp = Ease.outExpo(1 - rd.pulse);
          const radPulse = 7 + rp * 18;
          ctx.strokeStyle = `rgba(232, 179, 78, ${(rd.pulse * 0.85).toFixed(2)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(nx, ny, radPulse, 0, Math.PI * 2);
          ctx.stroke();
        }

        const isHov = hoveredIdx === idx;
        const nr = isHov ? 8.5 : 7;
        // Cozy circular stationery pin node
        ctx.fillStyle = 'rgba(14, 10, 7, 0.36)';
        ctx.beginPath();
        ctx.arc(nx, ny + 1.5, nr, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = (rd.active && mode === 'spaced') ? PALETTE.gold : PALETTE.surface;
        ctx.beginPath();
        ctx.arc(nx, ny, nr, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = (rd.active && mode === 'spaced') ? PALETTE.ivory : PALETTE.muted;
        ctx.lineWidth = isHov ? 2.2 : 1.6;
        ctx.stroke();

        // Compact node tag
        ctx.fillStyle = (rd.active && mode === 'spaced') ? PALETTE.gold : PALETTE.muted;
        ctx.font = `bold 10px ${FONT_NUM}`;
        ctx.textAlign = 'center';
        ctx.fillText('D' + rd.day, nx, ny - 14);
        ctx.restore();
      });

      // Hover detail tooltip
      if (hoveredIdx >= 0 && hitNodes[hoveredIdx]) {
        const rd = reviewDays[hoveredIdx];
        const hn = hitNodes[hoveredIdx];
        const tip = `Day ${rd.day} 节点：${rd.active ? '已开启' : '已关闭'} | 预计复现 ${rd.load} 词（点击切换）`;
        const tx = clamp(hn.x - 110, 14, w - 260);
        drawPill(ctx, tx, clamp(hn.y + 16, padT + 4, h - 42), tip, {
          bg: PALETTE.bgDeep,
          fg: PALETTE.ivory,
          border: PALETTE.gold
        });
      }

      // Smooth warm terracotta playhead dot (ZERO shadowBlur)
      const curRet = calcSpacedRetention(curDay);
      const px = xOf(curDay);
      const py = yOf(curRet);
      ctx.save();
      ctx.fillStyle = 'rgba(14, 10, 7, 0.38)';
      ctx.beginPath();
      ctx.arc(px, py + 1.5, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = PALETTE.orange;
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = PALETTE.ivory;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Update & draw cozy confetti dots
      particles = particles.filter(p => p.life > 0.02);
      particles.forEach(p => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 60 * dt;
        p.life -= dt * 1.5;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = clamp01(p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Top HUD sticker badges
      const finalRet = Math.round(calcSpacedRetention(14));
      smoothedFinal = Ease.expDamp(smoothedFinal, finalRet, 9, dt);
      const activeCount = reviewDays.filter(r => r.active).length;
      const badgeText = mode === 'cram'
        ? `考前突击模拟 | Day 14 留存仅 ${Math.round(smoothedFinal)}%`
        : `间隔复现节点 ${activeCount}/5 | Day 14 稳记率 ${Math.round(smoothedFinal)}%`;
      drawPill(ctx, 14, 14, badgeText, {
        bg: smoothedFinal >= 80 ? PALETTE.emerald : PALETTE.orange,
        fg: PALETTE.ink,
        border: PALETTE.ivory,
        font: `800 11.5px ${FONT_SANS}`
      });

      if (!compact) {
        drawPill(ctx, w - 220, 14, `Day ${curDay.toFixed(1)} 实时留存：${Math.round(curRet)}%`, {
          bg: PALETTE.surface,
          fg: PALETTE.gold,
          border: PALETTE.gold
        });
      }

      if (narratorEl) {
        narratorEl.textContent = mode === 'cram'
          ? '考前临时突击虽能短暂拉高记忆，但无间隔巩固很快回落；切回“14天间隔带背”并点击节点亲自测试！'
          : `当前已激活 ${activeCount} 个复习节点（Day 1/2/4/7/11 可自由点击开关），第 14 天四级高频词稳记率达 ${Math.round(smoothedFinal)}%。`;
      }
    }

    return {
      render,
      setMode(m) { mode = m; t = 0; lastCrossDay = -1; },
      play() { playing = true; },
      pause() { playing = false; },
      toggle() { playing = !playing; return playing; },
      step() { playing = false; t += 1.0; },
      reset() {
        t = 0;
        lastCrossDay = -1;
        reviewDays.forEach(r => { r.active = true; r.pulse = 0; });
      },
      setSpeed(s) { speed = clamp(s, 0.4, 2.5); },
      getState() { return { playing, speed, mode }; },
      destroy() {
        canvas.removeEventListener('click', onClick);
        canvas.removeEventListener('mousemove', onMove);
      }
    };
  }

  /* ========================================================================
     2. LISTENING RADAR (Pre-Read Clustering + Transition Signal & Paraphrase)
     ======================================================================== */
  function createListeningRadarSim(canvas, narratorEl, opts = {}) {
    let mode = opts.mode || 'signal';
    let playing = true;
    let speed = 1;
    let t = 0;
    let selectedOpt = -1;
    let optionRects = [];

    const options = [
      { code: 'A', text: 'Cancel the outdoor sports event completely.', keywords: ['outdoor', 'Cancel'], status: 'trap', tag: '原词干扰', why: '原句只提计划 outdoor，但并未取消活动。' },
      { code: 'B', text: 'Postpone the concert due to heavy rain.', keywords: ['rain', 'concert'], status: 'trap', tag: '偷换事件', why: '音频核心是 ceremony 而非 concert，且并非延期。' },
      { code: 'C', text: 'Move the campus ceremony indoors.', keywords: ['ceremony', 'indoors'], status: 'correct', tag: '同义改写锁', why: 'relocate it to the main hall 同义改写为 move ... indoors。' },
      { code: 'D', text: 'Refund all tickets to students right away.', keywords: ['Refund', 'tickets'], status: 'trap', tag: '无中生有', why: '录音完全未提及退票信息。' }
    ];

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let i = 0; i < optionRects.length; i++) {
        const r = optionRects[i];
        if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
          selectedOpt = (selectedOpt === i) ? -1 : i;
          return;
        }
      }
      selectedOpt = -1;
    }

    canvas.addEventListener('click', onClick);

    function render(dt) {
      const { ctx, w, h } = setupHiDPI(canvas);
      drawSalonBg(ctx, w, h);
      if (playing) t += dt * speed;

      const compact = w < 500;
      const cycle = (t * 0.55) % 4.6;

      if (mode === 'preread') {
        // Mode A: 15s Pre-reading scanner clustering repeated clues
        drawPill(ctx, 14, 14, '模式一：未听先知 15 秒预读 — 扫选项、圈实词、判考点', {
          bg: PALETTE.gold,
          fg: PALETTE.ink,
          border: PALETTE.ivory,
          font: `800 11.5px ${FONT_SANS}`
        });

        const clusterProg = clamp01((cycle - 2.6) / 1.2);
        const startY = 54;
        const cardH = Math.min(54, (h - 134) / 4);
        const gap = 8;
        optionRects = [];

        options.forEach((op, idx) => {
          const x = 18;
          const y = startY + idx * (cardH + gap);
          const cw = w - 36;
          optionRects.push({ x, y, w: cw, h: cardH });
          const scanned = cycle >= idx * 0.65;
          const isCurrent = Math.floor(cycle / 0.65) === idx && cycle < 2.6;

          drawHardBox(ctx, x, y, cw, cardH, {
            r: 6,
            fill: isCurrent ? '#382e24' : PALETTE.surface,
            stroke: isCurrent ? PALETTE.gold : (scanned ? PALETTE.border : PALETTE.borderMuted),
            lineWidth: isCurrent ? 1.8 : 1.2
          });

          // Warm highlighter scan beam inside active card
          if (isCurrent) {
            const beamU = (cycle % 0.65) / 0.65;
            const bx = x + 6 + beamU * (cw - 14);
            ctx.fillStyle = 'rgba(232, 179, 78, 0.22)';
            ctx.fillRect(Math.max(x + 2, bx - 16), y + 2, 16, cardH - 4);
            ctx.fillStyle = PALETTE.gold;
            ctx.fillRect(bx, y + 2, 2.5, cardH - 4);
          }

          // Code badge
          drawHardBox(ctx, x + 10, y + (cardH - 26) / 2, 26, 26, {
            r: 6,
            fill: scanned ? PALETTE.gold : PALETTE.bgDeep,
            stroke: scanned ? PALETTE.ivory : PALETTE.borderMuted,
            lineWidth: 1.3
          });
          ctx.fillStyle = scanned ? PALETTE.ink : PALETTE.cream;
          ctx.font = `bold 12px ${FONT_NUM}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(op.code, x + 23, y + cardH / 2);

          // Option text
          ctx.textAlign = 'left';
          ctx.font = `${compact ? 11.5 : 13}px ${FONT_SERIF}`;
          ctx.fillStyle = PALETTE.ivory;
          ctx.fillText(op.text, x + 46, y + cardH / 2 - (compact ? 0 : 1));

          if (scanned && !compact) {
            const kwStr = op.keywords.join(' / ');
            drawPill(ctx, x + cw - 152, y + (cardH - 22) / 2, '关键词: ' + kwStr, {
              bg: PALETTE.bgDeep,
              fg: PALETTE.gold,
              border: PALETTE.gold,
              h: 22
            });
          }
        });

        // Bottom prediction synthesis bar
        const predY = h - 54;
        ctx.save();
        ctx.globalAlpha = 0.25 + 0.75 * Ease.outExpo(clusterProg);
        drawHardBox(ctx, 18, predY, w - 36, 38, {
          r: 6,
          fill: '#22332a',
          stroke: PALETTE.emerald,
          lineWidth: 1.5
        });
        ctx.fillStyle = PALETTE.emerald;
        ctx.font = `800 ${compact ? 11 : 12}px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          '预读结论：高频词聚焦“户外活动 + 天气变化 + 场地处理”，放音时紧盯最终决定与转折词！',
          30,
          predY + 19
        );
        ctx.restore();

        if (narratorEl) {
          narratorEl.textContent = selectedOpt >= 0
            ? `选项 ${options[selectedOpt].code} 提示：${options[selectedOpt].why}`
            : '未听先知口诀：放音前 15 秒纵向扫 A/B/C/D 划出动词和核心名词，提前预判问题方向！';
        }
        return;
      }

      // Mode B: Transition Signal Beacon & Paraphrase Radar
      drawPill(ctx, 14, 12, '模式二：声波监听 -> 捕获 BUT 转折信号 -> 发射同义改写锁', {
        bg: PALETTE.emerald,
        fg: PALETTE.ink,
        border: PALETTE.ivory,
        font: `800 11.5px ${FONT_SANS}`
      });

      const audioU = clamp01(cycle / 3.8);
      const waveX = 18;
      const waveY = 46;
      const waveW = w - 36;
      const waveH = 74;

      drawHardBox(ctx, waveX, waveY, waveW, waveH, {
        r: 6,
        fill: PALETTE.bgDeep,
        stroke: PALETTE.border,
        lineWidth: 1.5
      });

      // Acoustic waveform bars
      const barCount = compact ? 36 : 64;
      const butFrac = 0.44;
      const paraFrac = 0.74;
      const playX = waveX + 12 + audioU * (waveW - 24);

      for (let i = 0; i < barCount; i++) {
        const frac = i / (barCount - 1);
        const bx = waveX + 12 + frac * (waveW - 24);
        const isPast = frac <= audioU;
        const nearBut = Math.abs(frac - butFrac) < 0.055;
        const nearPara = frac > 0.62 && frac < 0.88;
        const amp = (nearBut ? 24 : (nearPara ? 19 : 11)) * (0.45 + 0.55 * Math.abs(Math.sin(i * 1.3 + t * 5)));
        ctx.fillStyle = !isPast
          ? 'rgba(168, 153, 134, 0.25)'
          : (nearBut ? PALETTE.gold : (nearPara ? PALETTE.emerald : PALETTE.orange));
        ctx.fillRect(bx - 1.7, waveY + 26 - amp * 0.5, 3.4, amp);
      }

      // Playhead vertical line
      ctx.strokeStyle = PALETTE.ivory;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playX, waveY + 6);
      ctx.lineTo(playX, waveY + waveH - 22);
      ctx.stroke();

      // Transcript subtitle bar inside wave deck
      ctx.font = `${compact ? 10.5 : 12}px ${FONT_SERIF}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const subY = waveY + waveH - 13;
      ctx.fillStyle = PALETTE.cream;
      ctx.fillText('W: Planned outdoor ceremony,', waveX + 12, subY);

      const butX = waveX + 12 + butFrac * (waveW - 24);
      const butHit = audioU >= butFrac;
      ctx.fillStyle = butHit ? PALETTE.gold : PALETTE.muted;
      ctx.font = `bold ${compact ? 11 : 12.5}px ${FONT_SERIF}`;
      ctx.fillText('BUT', butX - 14, subY);

      const paraX = waveX + 12 + paraFrac * (waveW - 24);
      const paraHit = audioU >= paraFrac;
      ctx.fillStyle = paraHit ? PALETTE.emerald : PALETTE.muted;
      ctx.font = `bold ${compact ? 10.5 : 12}px ${FONT_SERIF}`;
      ctx.fillText(compact ? 'relocate to main hall.' : 'relocate it to the main hall.', butX + 22, subY);

      // Shockwave beacon on BUT
      if (butHit) {
        const bp = clamp01((audioU - butFrac) / 0.24);
        ctx.save();
        const half = 8 + Ease.outExpo(bp) * 24;
        ctx.strokeStyle = `rgba(232, 179, 78, ${(1 - bp) * 0.88})`;
        ctx.lineWidth = 2;
        roundRectPath(ctx, butX - half, waveY + 26 - half * 0.65, half * 2, half * 1.3, 6);
        ctx.stroke();
        drawPill(ctx, butX - 42, waveY - 12, '转折信号 BUT', {
          bg: PALETTE.gold,
          fg: PALETTE.ink,
          border: PALETTE.ivory,
          h: 20,
          font: `700 10.5px ${FONT_SANS}`
        });
        ctx.restore();
      }

      // 2x2 Option Grid below waveform
      const gridTop = waveY + waveH + 18;
      const cols = compact ? 1 : 2;
      const rows = compact ? 4 : 2;
      const gapX = 12;
      const gapY = 10;
      const cw = (w - 36 - (cols - 1) * gapX) / cols;
      const ch = (h - gridTop - 16 - (rows - 1) * gapY) / rows;
      optionRects = [];

      let cAnchorX = 0, cAnchorY = 0;
      options.forEach((op, idx) => {
        const col = compact ? 0 : (idx % 2);
        const row = compact ? idx : Math.floor(idx / 2);
        const ox = 18 + col * (cw + gapX);
        const oy = gridTop + row * (ch + gapY);
        optionRects.push({ x: ox, y: oy, w: cw, h: ch });

        const isCorrect = op.status === 'correct';
        const showCorrect = isCorrect && paraHit;
        const showTrap = !isCorrect && audioU > 0.56 && (idx === 0 || idx === 1 || audioU > 0.8);
        const isSel = selectedOpt === idx;

        if (isCorrect) {
          cAnchorX = ox + cw * 0.5;
          cAnchorY = oy;
        }

        drawHardBox(ctx, ox, oy, cw, ch, {
          r: 6,
          fill: showCorrect
            ? '#22332a'
            : (showTrap ? '#362424' : PALETTE.surface),
          stroke: isSel
            ? PALETTE.gold
            : (showCorrect ? PALETTE.emerald : (showTrap ? PALETTE.crimson : PALETTE.borderMuted)),
          lineWidth: (showCorrect || isSel) ? 1.8 : 1.3
        });

        // Option letter & text
        ctx.fillStyle = showCorrect ? PALETTE.emerald : (showTrap ? PALETTE.crimson : PALETTE.gold);
        ctx.font = `bold 13px ${FONT_NUM}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(op.code + '.', ox + 12, oy + 10);

        ctx.fillStyle = showTrap ? PALETTE.muted : PALETTE.ivory;
        ctx.font = `${compact ? 11.5 : 12.5}px ${FONT_SERIF}`;
        const lines = wrapCanvasText(ctx, op.text, cw - 42, 2);
        lines.forEach((ln, li) => {
          ctx.fillText(ln, ox + 32, oy + 10 + li * 16);
        });

        // Stamp trap or emerald paraphrase lock
        if (showTrap) {
          const sp = clamp01((audioU - 0.56) / 0.18);
          drawStamp(ctx, ox + cw - 54, oy + ch - 18, op.tag, PALETTE.crimson, sp, -7);
        }
        if (showCorrect) {
          const sp = clamp01((audioU - paraFrac) / 0.18);
          drawStamp(ctx, ox + cw - 58, oy + ch - 18, '同义改写锁', PALETTE.emerald, sp, 0);
        }
      });

      // Emerald Paraphrase Arc from waveform "relocate to main hall" -> Option C
      if (paraHit) {
        const arcP = Ease.outExpo(clamp01((audioU - paraFrac) / 0.22));
        drawCurvedArc(
          ctx,
          paraX,
          waveY + waveH - 2,
          (paraX + cAnchorX) * 0.5,
          waveY + waveH + 20,
          cAnchorX,
          cAnchorY + 2,
          arcP,
          PALETTE.emerald,
          2.8
        );
      }

      if (narratorEl) {
        if (selectedOpt >= 0) {
          const op = options[selectedOpt];
          narratorEl.textContent = `[选项 ${op.code} · ${op.tag}] ${op.why}`;
        } else {
          narratorEl.textContent = paraHit
            ? '听到 BUT 后立刻全神贯注：relocate to main hall 同义替换 move indoors，直接秒选 C，无视 A/B 原词干扰！'
            : '正在监听声波流：前半句出现的 outdoor 往往是原词诱饵，真正的考点紧跟在转折词 but / however 后面。';
        }
      }
    }

    return {
      render,
      setMode(m) { mode = m; t = 0; selectedOpt = -1; },
      play() { playing = true; },
      pause() { playing = false; },
      toggle() { playing = !playing; return playing; },
      step() { playing = false; t += 0.7; },
      reset() { t = 0; selectedOpt = -1; },
      setSpeed(s) { speed = clamp(s, 0.4, 2.5); },
      getState() { return { playing, speed, mode }; },
      destroy() {
        canvas.removeEventListener('click', onClick);
      }
    };
  }

  /* ========================================================================
     3. CLOZE PIPELINE (15-Word POS Sorter -> Syntax Slot 15 -> 4 -> 1)
     ======================================================================== */
  function createClozePipelineSim(canvas, narratorEl, opts = {}) {
    let mode = opts.mode || 'auto';
    let playing = true;
    let speed = 1;
    let t = 0;
    let focusLane = -1;
    let laneRects = [];

    const LANES = [
      { key: 'n', label: 'n. 名词', color: PALETTE.gold, words: ['trend', 'impact', 'solution', 'factor'] },
      { key: 'v', label: 'v. 动词', color: PALETTE.orange, words: ['enhance', 'adapt', 'promote', 'maintain'] },
      { key: 'adj', label: 'adj. 形容词', color: PALETTE.rose, words: ['efficient', 'crucial', 'diverse', 'creative'] },
      { key: 'adv', label: 'adv. 副词', color: PALETTE.emerald, words: ['significantly', 'gradually', 'rapidly'] }
    ];

    const BANK = [
      { w: 'significantly', lane: 3 }, { w: 'enhance', lane: 1 }, { w: 'efficient', lane: 2 },
      { w: 'adapt', lane: 1 }, { w: 'trend', lane: 0 }, { w: 'crucial', lane: 2 },
      { w: 'gradually', lane: 3 }, { w: 'promote', lane: 1 }, { w: 'diverse', lane: 2 },
      { w: 'impact', lane: 0 }, { w: 'maintain', lane: 1 }, { w: 'rapidly', lane: 3 },
      { w: 'solution', lane: 0 }, { w: 'creative', lane: 2 }, { w: 'factor', lane: 0 }
    ];

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let i = 0; i < laneRects.length; i++) {
        const r = laneRects[i];
        if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
          focusLane = focusLane === i ? -1 : i;
          return;
        }
      }
      focusLane = -1;
    }
    canvas.addEventListener('click', onClick);

    function render(dt) {
      const { ctx, w, h } = setupHiDPI(canvas);
      drawSalonBg(ctx, w, h);
      if (playing) t += dt * speed;

      const compact = w < 520;
      const cycle = mode === 'verb_slot' ? (1.8 + ((t * 0.52) % 3.4)) : ((t * 0.55) % 5.6);
      // Phases: 0..1.6 sort into lanes; 1.6..3.0 lock v. lane (15->4); 3.0..4.2 test collocation; 4.2..5.6 snap "enhance" into slot
      const sortP = Ease.inOutCubic(clamp01(cycle / 1.45));
      const slotScanP = clamp01((cycle - 1.6) / 0.9);
      const collocP = clamp01((cycle - 2.9) / 1.1);
      const lockP = Ease.outBack(clamp01((cycle - 4.1) / 0.75));

      const stageBadge = cycle < 1.6
        ? '步骤 1/4：15词按后缀秒分 4 大词性泳道 (n./v./adj./adv.)'
        : (cycle < 2.9
          ? '步骤 2/4：句法槽位识别 can + [v.原形] + efficiency -> 15 缩至 4 词！'
          : (cycle < 4.1
            ? '步骤 3/4：搭配筛选 adapt(to) / maintain(维持) -> 锁定 enhance！'
            : '步骤 4/4：enhance 精准落位！15 -> 4 -> 1 耗时 8 秒'));

      drawPill(ctx, 14, 12, stageBadge, {
        bg: cycle >= 4.1 ? PALETTE.emerald : PALETTE.gold,
        fg: PALETTE.ink,
        border: PALETTE.ivory,
        font: `800 11.5px ${FONT_SANS}`
      });

      // 4 POS Blueprint Swimlanes
      const laneTop = 52;
      const laneGap = compact ? 6 : 10;
      const laneW = (w - 32 - laneGap * 3) / 4;
      const laneH = h - 166;
      laneRects = [];

      const activeLaneIdx = focusLane >= 0 ? focusLane : (slotScanP > 0.15 ? 1 : -1);

      LANES.forEach((ln, li) => {
        const lx = 16 + li * (laneW + laneGap);
        const ly = laneTop;
        laneRects.push({ x: lx, y: ly, w: laneW, h: laneH });
        const dimmed = activeLaneIdx >= 0 && activeLaneIdx !== li;
        const isAct = activeLaneIdx === li;

        ctx.save();
        ctx.globalAlpha = dimmed ? 0.3 : 1;
        drawHardBox(ctx, lx, ly, laneW, laneH, {
          r: 6,
          fill: isAct ? '#382e24' : PALETTE.surface,
          stroke: isAct ? ln.color : PALETTE.borderMuted,
          lineWidth: isAct ? 1.8 : 1.3
        });

        // Warm rounded stationery lane header strip
        roundRectPath(ctx, lx + 1, ly + 1, laneW - 2, 24, 5);
        ctx.fillStyle = ln.color;
        ctx.fill();
        ctx.fillStyle = PALETTE.ink;
        ctx.font = `700 ${compact ? 10 : 11.5}px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ln.label, lx + laneW / 2, ly + 13);
        ctx.restore();
      });

      // Sentence slot desk at bottom
      const sentY = h - 96;
      const sentH = 78;
      drawHardBox(ctx, 16, sentY, w - 32, sentH, {
        r: 6,
        fill: PALETTE.bgDeep,
        stroke: lockP > 0.5 ? PALETTE.emerald : PALETTE.border,
        lineWidth: 1.5
      });

      // Draw sentence + slot box
      const slotW = compact ? 74 : 92;
      const slotH = 28;
      const slotX = compact ? w * 0.36 : w * 0.31;
      const slotY = sentY + 14;

      ctx.save();
      ctx.font = `${compact ? 11.5 : 14}px ${FONT_SERIF}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'right';
      ctx.fillStyle = PALETTE.ivory;
      ctx.fillText('AI tools can', slotX - 10, slotY + slotH / 2);

      roundRectPath(ctx, slotX, slotY, slotW, slotH, 6);
      ctx.fillStyle = lockP > 0.4 ? '#22332a' : '#382b20';
      ctx.fill();
      ctx.strokeStyle = lockP > 0.4 ? PALETTE.emerald : PALETTE.gold;
      ctx.lineWidth = 1.6;
      ctx.setLineDash(lockP > 0.4 ? [] : [5, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.textAlign = 'left';
      ctx.fillStyle = PALETTE.ivory;
      ctx.fillText(
        compact ? "students' efficiency." : "students' learning efficiency.",
        slotX + slotW + 10,
        slotY + slotH / 2
      );

      // Syntax cues under sentence
      ctx.font = `bold 10.5px ${FONT_SANS}`;
      ctx.fillStyle = PALETTE.gold;
      ctx.textAlign = 'center';
      ctx.fillText(
        slotScanP > 0.2
          ? '语法线索：情态动词 can 后必接 [v. 动词原形]，宾语为 efficiency（效率）-> 搭配“提升效率”'
          : '等待词性分流完成后扫描句法槽位...',
        w / 2,
        sentY + sentH - 16
      );
      ctx.restore();

      // Render all 15 word chips interpolating from mixed top row -> sorted lane positions -> winning chip into slot
      const laneCounts = [0, 0, 0, 0];
      BANK.forEach((item, idx) => {
        const orderInLane = laneCounts[item.lane]++;
        const laneInfo = LANES[item.lane];
        const laneR = laneRects[item.lane];

        // Starting grid (3 rows x 5 cols at top of lanes)
        const sCol = idx % 5;
        const sRow = Math.floor(idx / 5);
        const startX = 28 + sCol * ((w - 56) / 5) + ((w - 56) / 10);
        const startY = laneTop + 36 + sRow * 32;

        // Target in its POS lane
        const chipW = Math.min(laneW - 12, 92);
        const chipH = Math.min(24, (laneH - 42) / 4 - 4);
        const targetX = laneR.x + laneR.w / 2;
        const targetY = laneR.y + 34 + orderInLane * (chipH + 6) + chipH / 2;

        const stagger = clamp01((sortP * 1.25) - idx * 0.015);
        const eased = Ease.inOutCubic(stagger);
        let cx = lerp(startX, targetX, eased);
        let cy = lerp(startY, targetY, eased) - Math.sin(eased * Math.PI) * 14;

        const isWinner = item.w === 'enhance';
        const isVerb = item.lane === 1;
        const isElimVerb = isVerb && !isWinner && collocP > 0.35;

        if (isWinner && cycle > 4.1) {
          cx = lerp(targetX, slotX + slotW / 2, clamp01(lockP));
          cy = lerp(targetY, slotY + slotH / 2, clamp01(lockP));
        }

        const dimmed = (activeLaneIdx >= 0 && activeLaneIdx !== item.lane) || isElimVerb;

        ctx.save();
        ctx.globalAlpha = dimmed ? 0.28 : 1;
        const winLit = isWinner && cycle > 3.6;
        drawHardBox(ctx, cx - chipW / 2, cy - chipH / 2, chipW, chipH, {
          r: 6,
          fill: winLit ? PALETTE.emerald : PALETTE.bgDeep,
          stroke: winLit ? PALETTE.ivory : laneInfo.color,
          lineWidth: winLit ? 1.8 : 1.3
        });

        ctx.fillStyle = winLit ? PALETTE.ink : PALETTE.ivory;
        ctx.font = `${isWinner ? '800 ' : 'bold '}${compact ? 10 : 11.5}px ${FONT_SERIF}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.w, cx, cy);

        if (isElimVerb) {
          ctx.strokeStyle = PALETTE.crimson;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx - chipW * 0.4, cy);
          ctx.lineTo(cx + chipW * 0.4, cy);
          ctx.stroke();
        }
        ctx.restore();
      });

      if (narratorEl) {
        if (focusLane >= 0) {
          const ln = LANES[focusLane];
          narratorEl.textContent = `已高亮 ${ln.label} 泳道（${ln.words.join(' / ')}），再次点击可恢复自动演示。`;
        } else {
          narratorEl.textContent = '选词填空秒杀铁律：先用词尾（-tion/-ly/-ive/-ate）把 15 词分进 4 栏，再看空前空后锁词性，候选直接砍掉 75%！';
        }
      }
    }

    return {
      render,
      setMode(m) { mode = m; t = 0; focusLane = -1; },
      play() { playing = true; },
      pause() { playing = false; },
      toggle() { playing = !playing; return playing; },
      step() { playing = false; t += 0.85; },
      reset() { t = 0; focusLane = -1; },
      setSpeed(s) { speed = clamp(s, 0.4, 2.5); },
      getState() { return { playing, speed, mode }; },
      destroy() {
        canvas.removeEventListener('click', onClick);
      }
    };
  }

  /* ========================================================================
     4. LONG READ SCAN (Statement Anchors -> Searchlight Rays A-G -> Lock)
     ======================================================================== */
  function createLongReadScanSim(canvas, narratorEl, opts = {}) {
    let mode = opts.mode || 'scan';
    let playing = true;
    let speed = 1;
    let t = 0;
    let pinnedPara = -1;
    let paraRects = [];

    const PARAS = [
      { code: 'A', snippet: 'Background of digital fatigue across universities...', status: 'miss', note: '背景引入段：无 2024 年份与 Cambridge 专名，快速跳过。' },
      { code: 'B', snippet: 'Many college students report sleep shortages...', status: 'fake', note: '高频词诱饵：仅出现主题词 students，缺乏研究年份与步行锚点，跳过！' },
      { code: 'C', snippet: 'Library renovation budgets grew over five years...', status: 'miss', note: '无关细节段：扫读首尾句无匹配数字/专名。' },
      { code: 'D', snippet: 'Online lectures allow flexible review schedules...', status: 'miss', note: '话题偏移：讲网课时间灵活，与步行记忆无关。' },
      { code: 'E', snippet: 'In 2024, Cambridge scholars found short strolls improve recall.', status: 'hit', note: '精准命中 E 段！2024 + Cambridge 双锚点锁定，short strolls = brief walking breaks，improve recall = boost memory retention！' },
      { code: 'F', snippet: 'Campus dining halls introduced healthier menus...', status: 'miss', note: '后续段落：饮食主题，无需细读。' },
      { code: 'G', snippet: 'Experts recommend balanced routines before exams.', status: 'miss', note: '结尾总结段：无具体剑桥实验数据。' }
    ];

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let i = 0; i < paraRects.length; i++) {
        const r = paraRects[i];
        if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
          pinnedPara = (pinnedPara === i) ? -1 : i;
          return;
        }
      }
      pinnedPara = -1;
    }
    canvas.addEventListener('click', onClick);

    function render(dt) {
      const { ctx, w, h } = setupHiDPI(canvas);
      drawSalonBg(ctx, w, h);
      if (playing) t += dt * speed;

      const compact = w < 520;
      const cycle = mode === 'paraphrase' ? 4.4 : ((t * 0.95) % 6.8);
      const scanIdx = pinnedPara >= 0
        ? pinnedPara
        : (cycle < 4.2 ? Math.min(4, Math.floor(cycle / 0.82)) : 4);
      const locked = (pinnedPara === 4) || (pinnedPara < 0 && cycle >= 3.5);

      drawPill(ctx, 14, 12, locked
        ? '长篇匹配锁定 Para E：锚点 [2024 + Cambridge] + 同义改写验证通过'
        : `扫读激光定位中：正在扫描 Para ${PARAS[scanIdx].code}...`, {
        bg: locked ? PALETTE.emerald : PALETTE.orange,
        fg: PALETTE.ink,
        border: PALETTE.ivory,
        font: `800 11.5px ${FONT_SANS}`
      });

      const leftX = 16;
      const topY = 48;
      const leftW = compact ? w * 0.42 : w * 0.39;
      const rightX = leftX + leftW + (compact ? 14 : 26);
      const rightW = w - rightX - 16;
      const bodyH = h - topY - 18;

      // Left pane: Statement + Extracted Anchor Stickers
      drawHardBox(ctx, leftX, topY, leftW, bodyH, {
        r: 6,
        fill: PALETTE.surface,
        stroke: PALETTE.border,
        lineWidth: 1.5
      });

      ctx.fillStyle = PALETTE.gold;
      ctx.font = `800 11.5px ${FONT_SANS}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('题干句子 (Statement 38)', leftX + 12, topY + 12);

      ctx.fillStyle = PALETTE.ivory;
      ctx.font = `${compact ? 11 : 12.5}px ${FONT_SERIF}`;
      const stmtLines = wrapCanvasText(
        ctx,
        'A 2024 Cambridge study revealed that brief walking breaks boost college students\' memory retention.',
        leftW - 24,
        5
      );
      stmtLines.forEach((ln, idx) => {
        ctx.fillText(ln, leftX + 12, topY + 34 + idx * 17);
      });

      // 3 Priority Anchor Chips
      const chipStartY = topY + Math.min(130, bodyH * 0.47);
      const anchors = [
        { lbl: '1. 数字年份: 2024', col: PALETTE.gold },
        { lbl: '2. 专有名词: Cambridge', col: PALETTE.orange },
        { lbl: '3. 同义核: walking / memory', col: PALETTE.emerald }
      ];
      anchors.forEach((a, ai) => {
        const ay = chipStartY + ai * 32;
        if (ay + 24 < topY + bodyH - 8) {
          drawPill(ctx, leftX + 12, ay, a.lbl, {
            bg: PALETTE.bgDeep,
            fg: a.col,
            border: a.col,
            h: 24,
            font: `bold ${compact ? 10 : 11}px ${FONT_SANS}`
          });
        }
      });

      // Right pane: Paragraphs A-G stack
      const rowGap = 6;
      const rowH = (bodyH - rowGap * (PARAS.length - 1)) / PARAS.length;
      paraRects = [];

      PARAS.forEach((p, idx) => {
        const py = topY + idx * (rowH + rowGap);
        paraRects.push({ x: rightX, y: py, w: rightW, h: rowH });
        const isCurrent = idx === scanIdx;
        const isHit = p.status === 'hit' && isCurrent;
        const isFake = p.status === 'fake' && isCurrent;

        drawHardBox(ctx, rightX, py, rightW, rowH, {
          r: 6,
          fill: isHit
            ? '#22332a'
            : (isFake ? '#382f1f' : (isCurrent ? '#382d23' : PALETTE.surfaceSoft)),
          stroke: isHit
            ? PALETTE.emerald
            : (isFake ? PALETTE.gold : (isCurrent ? PALETTE.orange : PALETTE.borderMuted)),
          lineWidth: (isHit || isCurrent) ? 1.8 : 1.2
        });

        // Paragraph letter badge
        roundRectPath(ctx, rightX + 7, py + (rowH - 22) / 2, 22, 22, 5);
        ctx.fillStyle = isHit ? PALETTE.emerald : (isCurrent ? PALETTE.orange : PALETTE.bgDeep);
        ctx.fill();
        ctx.strokeStyle = (isHit || isCurrent) ? PALETTE.ink : PALETTE.borderMuted;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = (isHit || isCurrent) ? PALETTE.ink : PALETTE.cream;
        ctx.font = `bold 11.5px ${FONT_NUM}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.code, rightX + 18, py + rowH / 2);

        // Snippet text
        ctx.textAlign = 'left';
        ctx.font = `${isHit ? 'bold ' : ''}${compact ? 10 : 11.5}px ${FONT_SERIF}`;
        ctx.fillStyle = isHit ? PALETTE.ivory : (isCurrent ? PALETTE.cream : PALETTE.muted);
        const snip = wrapMixedText(ctx, p.snippet, rightW - 44, 1)[0];
        ctx.fillText(snip, rightX + 36, py + rowH / 2);
      });

      // Searchlight ray from Left Anchor Box -> Active Paragraph
      const targetRect = paraRects[scanIdx];
      if (targetRect) {
        const srcX = leftX + leftW - 2;
        const srcY = chipStartY + 26;
        const dstX = targetRect.x;
        const dstY = targetRect.y + targetRect.h / 2;
        const rayColor = locked ? PALETTE.emerald : (PARAS[scanIdx].status === 'fake' ? PALETTE.gold : PALETTE.orange);

        // Warm translucent highlighter wedge beam
        ctx.save();
        ctx.fillStyle = locked ? 'rgba(101, 179, 140, 0.15)' : 'rgba(224, 112, 60, 0.14)';
        ctx.beginPath();
        ctx.moveTo(srcX, srcY - 7);
        ctx.lineTo(dstX, targetRect.y);
        ctx.lineTo(dstX, targetRect.y + targetRect.h);
        ctx.lineTo(srcX, srcY + 7);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        drawCurvedArc(ctx, srcX, srcY, (srcX + dstX) / 2, (srcY + dstY) / 2 - 14, dstX, dstY, 1, rayColor, 2.5);
      }

      if (locked && targetRect) {
        drawStamp(ctx, rightX + rightW - 56, targetRect.y + targetRect.h / 2, '同义双锁', PALETTE.emerald, 1, 0);
      } else if (PARAS[scanIdx].status === 'fake' && targetRect) {
        drawStamp(ctx, rightX + rightW - 56, targetRect.y + targetRect.h / 2, '主题词干扰', PALETTE.gold, 1, -4);
      }

      if (narratorEl) {
        narratorEl.textContent = `[Para ${PARAS[scanIdx].code}] ${PARAS[scanIdx].note}`;
      }
    }

    return {
      render,
      setMode(m) { mode = m; t = 0; pinnedPara = m === 'paraphrase' ? 4 : -1; },
      play() { playing = true; },
      pause() { playing = false; },
      toggle() { playing = !playing; return playing; },
      step() { playing = false; pinnedPara = (pinnedPara + 1) % PARAS.length; },
      reset() { t = 0; pinnedPara = -1; },
      setSpeed(s) { speed = clamp(s, 0.4, 2.5); },
      getState() { return { playing, speed, mode }; },
      destroy() {
        canvas.removeEventListener('click', onClick);
      }
    };
  }

  /* ========================================================================
     5. CAREFUL READING TRAP MICROSCOPE (5 Classic Distractors + Correct)
     ======================================================================== */
  function createCarefulTrapSim(canvas, narratorEl, opts = {}) {
    let mode = opts.mode || 'cycle';
    let playing = true;
    let speed = 1;
    let t = 0;
    let pinnedIdx = -1;
    let tabRects = [];

    const CASES = [
      {
        id: 'swap',
        label: '1. 偷换概念',
        isTrap: true,
        option: 'Online courses mainly expand access for primary school pupils.',
        badSpan: 'primary school pupils',
        evidenceSpan: 'working adults',
        diag: '把原文定位句的“working adults（在职成人）”悄悄偷换成“primary school pupils（小学生）”，直接排除！'
      },
      {
        id: 'over',
        label: '2. 过度推断',
        isTrap: true,
        option: 'Traditional universities will soon shut down physical campuses.',
        badSpan: 'shut down physical campuses',
        evidenceSpan: 'complement rather than replace',
        diag: '原文仅说明网课起补充作用，并未推出大学将关闭实体校园，属于无依据的过度外推！'
      },
      {
        id: 'abs',
        label: '3. 绝对词',
        isTrap: true,
        option: 'Online learning completely replaces face-to-face mentoring.',
        badSpan: 'completely replaces',
        evidenceSpan: 'complement rather than replace',
        diag: '四级高危绝对词 completely / always / only + 反义篡改，原文明确是 rather than replace！'
      },
      {
        id: 'mix',
        label: '4. 张冠李戴',
        isTrap: true,
        option: 'Working adults claim that face-to-face mentoring is unnecessary.',
        badSpan: 'Working adults claim',
        evidenceSpan: 'most researchers note',
        diag: '把“researchers（研究者）”的观点错安在“working adults”头上，主语归属错配！'
      },
      {
        id: 'none',
        label: '5. 无中生有',
        isTrap: true,
        option: 'Online platforms charge much lower tuition fees than colleges.',
        badSpan: 'lower tuition fees',
        evidenceSpan: '原文未提及费用',
        diag: '看似符合生活常识，但定位句及上下文根本没提学费（tuition fees），切忌脑补！'
      },
      {
        id: 'right',
        label: '同义正解',
        isTrap: false,
        option: 'Digital classes work alongside in-person guidance rather than substituting for it.',
        badSpan: 'work alongside ... rather than substituting',
        evidenceSpan: 'complement rather than replace',
        diag: '完美同义替换：Digital classes = online courses，work alongside = complement，substituting = replace！'
      }
    ];

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let i = 0; i < tabRects.length; i++) {
        const r = tabRects[i];
        if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
          pinnedIdx = (pinnedIdx === i) ? -1 : i;
          return;
        }
      }
    }
    canvas.addEventListener('click', onClick);

    function render(dt) {
      const { ctx, w, h } = setupHiDPI(canvas);
      drawSalonBg(ctx, w, h);
      if (playing) t += dt * speed;

      const compact = w < 520;
      const dur = 2.4;
      const idx = pinnedIdx >= 0 ? pinnedIdx : (Math.floor((t * 0.72) / dur) % CASES.length);
      const localP = pinnedIdx >= 0 ? 1 : clamp01(((t * 0.72) % dur) / 0.75);
      const cur = CASES[idx];

      drawPill(ctx, 14, 12, cur.isTrap
        ? `证据显微镜：识破干扰陷阱 [${cur.label}]`
        : '证据显微镜：同义改写验证通过 -> 锁定正确答案', {
        bg: cur.isTrap ? PALETTE.crimson : PALETTE.emerald,
        fg: PALETTE.ink,
        border: PALETTE.ivory,
        font: `800 11.5px ${FONT_SANS}`
      });

      // Top box: Evidence locating sentence from passage
      const evX = 16;
      const evY = 48;
      const evW = w - 32;
      const evH = compact ? 92 : 84;

      drawHardBox(ctx, evX, evY, evW, evH, {
        r: 6,
        fill: '#22332a',
        stroke: PALETTE.emerald,
        lineWidth: 1.6
      });

      drawPill(ctx, evX + 10, evY + 8, '原文定位证据句', {
        bg: PALETTE.emerald,
        fg: PALETTE.ink,
        border: PALETTE.ivory,
        h: 20,
        font: `700 10.5px ${FONT_SANS}`
      });

      ctx.fillStyle = PALETTE.ivory;
      ctx.font = `${compact ? 11.5 : 13.5}px ${FONT_SERIF}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      const evLines = wrapCanvasText(
        ctx,
        'While online courses expand access for working adults, most researchers note they complement rather than replace face-to-face mentoring.',
        evW - 24,
        3
      );
      evLines.forEach((ln, li) => {
        ctx.fillText(ln, evX + 12, evY + 34 + li * 17);
      });

      // Microscope comparison beam between Evidence -> Option
      const optY = evY + evH + 28;
      const optH = compact ? 92 : 90;
      const midX = w * 0.5;

      drawArrow(ctx, midX, evY + evH + 3, midX, optY - 4, cur.isTrap ? PALETTE.crimson : PALETTE.emerald, 2.4, 8.5);
      drawPill(ctx, midX + 12, evY + evH + 4, `核对锚点：${cur.evidenceSpan}`, {
        bg: PALETTE.gold,
        fg: PALETTE.ink,
        border: PALETTE.ivory,
        h: 20,
        font: `700 10.5px ${FONT_SANS}`
      });

      // Middle box: Inspected Option Card
      drawHardBox(ctx, evX, optY, evW, optH, {
        r: 6,
        fill: cur.isTrap ? '#362424' : '#22332a',
        stroke: cur.isTrap ? PALETTE.crimson : PALETTE.emerald,
        lineWidth: 1.8
      });

      ctx.fillStyle = cur.isTrap ? PALETTE.crimson : PALETTE.emerald;
      ctx.font = `800 11.5px ${FONT_SANS}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(cur.isTrap ? '待排雷选项 (Distractor)' : '正确选项 (Paraphrase Match)', evX + 12, optY + 10);

      ctx.fillStyle = PALETTE.ivory;
      ctx.font = `${compact ? 11.5 : 13.5}px ${FONT_SERIF}`;
      const optLines = wrapCanvasText(ctx, cur.option, evW - 120, 2);
      optLines.forEach((ln, li) => {
        ctx.fillText(ln, evX + 12, optY + 32 + li * 18);
      });

      // Highlighted target phrase chip
      drawPill(ctx, evX + 12, optY + optH - 28, (cur.isTrap ? '病灶词: ' : '对应词: ') + cur.badSpan, {
        bg: PALETTE.bgDeep,
        fg: cur.isTrap ? PALETTE.crimson : PALETTE.emerald,
        border: cur.isTrap ? PALETTE.crimson : PALETTE.emerald,
        h: 21,
        font: `bold 10.5px ${FONT_SANS}`
      });

      // Stamp animation
      drawStamp(
        ctx,
        evX + evW - 60,
        optY + optH * 0.48,
        cur.isTrap ? cur.label.replace(/^\d+\.\s*/, '') : '同义正解',
        cur.isTrap ? PALETTE.crimson : PALETTE.emerald,
        localP,
        cur.isTrap ? -8 : 0
      );

      // Bottom interactive mechanical selector tabs for all 6 items
      const barY = h - 46;
      const gap = 6;
      const tabW = (w - 32 - gap * (CASES.length - 1)) / CASES.length;
      tabRects = [];
      CASES.forEach((c, ci) => {
        const tx = 16 + ci * (tabW + gap);
        tabRects.push({ x: tx, y: barY, w: tabW, h: 30 });
        const active = ci === idx;
        drawHardBox(ctx, tx, barY, tabW, 30, {
          r: 6,
          fill: active
            ? (c.isTrap ? PALETTE.crimson : PALETTE.emerald)
            : PALETTE.surface,
          stroke: active ? PALETTE.ivory : PALETTE.borderMuted,
          lineWidth: active ? 1.8 : 1.2
        });

        ctx.fillStyle = active ? PALETTE.ink : PALETTE.cream;
        ctx.font = `800 ${compact ? 9.5 : 11}px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(compact ? c.label.replace(/^\d+\.\s*/, '') : c.label, tx + tabW / 2, barY + 15);
      });

      if (narratorEl) {
        narratorEl.textContent = `[${cur.label}] ${cur.diag}`;
      }
    }

    return {
      render,
      setMode(m) { mode = m; t = 0; pinnedIdx = m === 'compare' ? 5 : -1; },
      play() { playing = true; },
      pause() { playing = false; },
      toggle() { playing = !playing; return playing; },
      step() { playing = false; pinnedIdx = (pinnedIdx + 1) % CASES.length; },
      reset() { t = 0; pinnedIdx = -1; },
      setSpeed(s) { speed = clamp(s, 0.4, 2.5); },
      getState() { return { playing, speed, mode }; },
      destroy() {
        canvas.removeEventListener('click', onClick);
      }
    };
  }

  /* ========================================================================
     6. TRANSLATION RESTRUCTURING TREE (Chinese Blocks -> English SVO Order)
     ======================================================================== */
  function createTransRestructureSim(canvas, narratorEl, opts = {}) {
    let mode = opts.mode || 'heritage';
    let playing = true;
    let speed = 1;
    let t = 0;
    let selectedBlock = -1;
    let blockRects = [];

    const SCENARIOS = {
      heritage: {
        title: '四合院真题拆句：中文长定语前置 -> 英文介词短语后置',
        zhFull: '拥有数百年历史的四合院体现了中国传统的家庭观念。',
        enFull: 'Siheyuan, with a history of hundreds of years, reflects traditional Chinese family values.',
        blocks: [
          {
            role: '长定语 (Modifier)',
            zh: '拥有数百年历史的',
            en: 'with a history of hundreds of years',
            color: PALETTE.rose,
            zhOrder: 0,
            enOrder: 1,
            tip: '中文习惯把长定语放在名词前，英译时滑到名词 Siheyuan 之后作后置定语！'
          },
          {
            role: '主干主语 (S)',
            zh: '四合院',
            en: 'Siheyuan,',
            color: PALETTE.orange,
            zhOrder: 1,
            enOrder: 0,
            tip: '先抓主干核心名词 Siheyuan 置于句首，句子骨架立刻稳住。'
          },
          {
            role: '主干谓语 (V)',
            zh: '体现了',
            en: 'reflects',
            color: PALETTE.emerald,
            zhOrder: 2,
            enOrder: 2,
            tip: '用高分动词 reflects / embodies 替代平淡的 shows，单三时态注意加 -s。'
          },
          {
            role: '主干宾语 (O)',
            zh: '中国传统的家庭观念',
            en: 'traditional Chinese family values.',
            color: PALETTE.gold,
            zhOrder: 3,
            enOrder: 3,
            tip: '“家庭观念”译作 family values，简洁地道。'
          }
        ]
      },
      campus: {
        title: '现代校园真题拆句：时间状语 + 固定短语主干',
        zhFull: '近年来，越来越多的中国大学生积极参与环保志愿活动。',
        enFull: 'In recent years, an increasing number of Chinese college students have actively participated in green volunteer activities.',
        blocks: [
          {
            role: '时间状语 (Adv)',
            zh: '近年来，',
            en: 'In recent years,',
            color: PALETTE.gold,
            zhOrder: 0,
            enOrder: 0,
            tip: 'In recent years 触发现在完成时（have participated），四级翻译高频时态考点！'
          },
          {
            role: '主干主语 (S)',
            zh: '越来越多的中国大学生',
            en: 'an increasing number of college students',
            color: PALETTE.orange,
            zhOrder: 1,
            enOrder: 1,
            tip: '用 an increasing number of 升级 more and more，档次立升。'
          },
          {
            role: '主干谓语 (V)',
            zh: '积极参与',
            en: 'have actively participated in',
            color: PALETTE.emerald,
            zhOrder: 2,
            enOrder: 2,
            tip: 'participate in / take an active part in 是四级最稳妥高频谓语短语。'
          },
          {
            role: '主干宾语 (O)',
            zh: '环保志愿活动',
            en: 'environmental volunteer activities.',
            color: PALETTE.rose,
            zhOrder: 3,
            enOrder: 3,
            tip: '“环保”可译作 environmental / eco-friendly，直接作前置形容词。'
          }
        ]
      }
    };

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let i = 0; i < blockRects.length; i++) {
        const r = blockRects[i];
        if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
          selectedBlock = (selectedBlock === i) ? -1 : i;
          return;
        }
      }
      selectedBlock = -1;
    }
    canvas.addEventListener('click', onClick);

    function render(dt) {
      const { ctx, w, h } = setupHiDPI(canvas);
      drawSalonBg(ctx, w, h);
      if (playing) t += dt * speed;

      const sc = SCENARIOS[mode] || SCENARIOS.heritage;
      const compact = w < 520;
      const cycle = (t * 0.55) % 5.4;
      // 0..1.3 Chinese split | 1.3..2.5 Highlight SVO | 2.5..4.1 Glide to English SVO | 4.1..5.4 Shimmer polished sentence
      const glideP = Ease.inOutCubic(clamp01((cycle - 2.2) / 1.6));
      const doneP = clamp01((cycle - 4.0) / 0.8);

      const phaseLabel = cycle < 1.3
        ? '步骤 1/4：拆分中文语义色块 [主干 / 定语 / 状语]'
        : (cycle < 2.2
          ? '步骤 2/4：优先锁定主谓宾核心骨架 (SVO)'
          : (cycle < 4.0
            ? '步骤 3/4：语序重构 — 长定语平滑后移至中心词后！'
            : '步骤 4/4：地道英文成型与高分词组润色'));

      drawPill(ctx, 14, 12, phaseLabel, {
        bg: doneP > 0.3 ? PALETTE.emerald : PALETTE.gold,
        fg: PALETTE.ink,
        border: PALETTE.ivory,
        font: `800 11.5px ${FONT_SANS}`
      });

      // Top reference strip: Original Chinese
      const zhY = 48;
      drawHardBox(ctx, 16, zhY, w - 32, 34, {
        r: 6,
        fill: PALETTE.surface,
        stroke: PALETTE.border,
        lineWidth: 1.4
      });
      ctx.fillStyle = PALETTE.ivory;
      ctx.font = `bold ${compact ? 11 : 12.5}px ${FONT_SANS}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('中文原句：' + sc.zhFull, w / 2, zhY + 17);

      // Animated syntactic blocks gliding from top track (ZH order) to lower track (EN order)
      const blocks = sc.blocks;
      const n = blocks.length;
      const gap = compact ? 6 : 10;
      const bw = (w - 32 - gap * (n - 1)) / n;
      const bh = compact ? 74 : 78;
      const rowTopY = zhY + 52;
      const rowBotY = h - 144;
      blockRects = [];

      // Guide tracks
      ctx.save();
      ctx.font = `bold 10.5px ${FONT_SANS}`;
      ctx.textAlign = 'left';
      ctx.fillStyle = PALETTE.cream;
      ctx.fillText('中文原语序', 18, rowTopY - 12);
      ctx.fillStyle = PALETTE.emerald;
      ctx.fillText('英文 SVO 重构语序', 18, rowBotY - 12);
      ctx.restore();

      blocks.forEach((b, idx) => {
        const sx = 16 + b.zhOrder * (bw + gap);
        const sy = rowTopY;
        const ex = 16 + b.enOrder * (bw + gap);
        const ey = rowBotY;

        // Curved crossover arc when order changes (e.g., Modifier sliding behind Subject!)
        const arcLift = b.zhOrder !== b.enOrder
          ? Math.sin(glideP * Math.PI) * (b.zhOrder < b.enOrder ? -26 : 26)
          : 0;
        const cx = lerp(sx, ex, glideP);
        const cy = lerp(sy, ey, glideP) + arcLift;

        blockRects.push({ x: cx, y: cy, w: bw, h: bh });

        // Draw ghost trail arrow when gliding
        if (glideP > 0.05 && glideP < 0.98 && b.zhOrder !== b.enOrder) {
          drawCurvedArc(ctx, sx + bw / 2, sy + bh, (sx + ex) / 2 + bw / 2, (sy + ey) / 2, ex + bw / 2, ey, glideP, b.color, 2);
        }

        const isSel = selectedBlock === idx;
        const svoGlow = cycle >= 1.3 && cycle < 2.2 && (b.role.includes('主干'));

        ctx.save();
        drawHardBox(ctx, cx, cy, bw, bh, {
          r: 6,
          fill: isSel ? '#382d23' : PALETTE.bgDeep,
          stroke: (isSel || svoGlow) ? PALETTE.ivory : b.color,
          lineWidth: (isSel || svoGlow) ? 1.8 : 1.4
        });

        // Rounded stationery role header strip
        roundRectPath(ctx, cx + 1, cy + 1, bw - 2, 20, 5);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.fillStyle = PALETTE.ink;
        ctx.font = `700 ${compact ? 9 : 10}px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.role, cx + bw / 2, cy + 11);

        // Morph label from ZH -> EN as block glides down
        const showEn = glideP > 0.48;
        ctx.fillStyle = PALETTE.ivory;
        ctx.font = `${showEn ? '' : 'bold '}${compact ? 10 : 11.5}px ${showEn ? FONT_SERIF : FONT_SANS}`;
        ctx.textBaseline = 'top';
        const lines = showEn
          ? wrapCanvasText(ctx, b.en, bw - 12, 3)
          : wrapMixedText(ctx, b.zh, bw - 12, 2);
        lines.forEach((ln, li) => {
          ctx.fillText(ln, cx + bw / 2, cy + 27 + li * 15);
        });
        ctx.restore();
      });

      // Bottom Polished English Result Banner
      const outY = h - 52;
      ctx.save();
      ctx.globalAlpha = 0.25 + 0.75 * Ease.outExpo(doneP);
      drawHardBox(ctx, 16, outY, w - 32, 38, {
        r: 6,
        fill: '#22332a',
        stroke: PALETTE.emerald,
        lineWidth: 1.6
      });
      ctx.fillStyle = PALETTE.ivory;
      ctx.font = `bold ${compact ? 10.5 : 12.5}px ${FONT_SERIF}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const outLine = wrapMixedText(ctx, sc.enFull, w - 56, 1)[0];
      ctx.fillText(outLine, w / 2, outY + 19);
      ctx.restore();

      if (narratorEl) {
        narratorEl.textContent = selectedBlock >= 0
          ? `[${blocks[selectedBlock].role}] ${blocks[selectedBlock].tip}`
          : sc.title + ' — 点击任意语法色块查看翻译技巧！';
      }
    }

    return {
      render,
      setMode(m) { mode = m; t = 0; selectedBlock = -1; },
      play() { playing = true; },
      pause() { playing = false; },
      toggle() { playing = !playing; return playing; },
      step() { playing = false; t += 0.9; },
      reset() { t = 0; selectedBlock = -1; },
      setSpeed(s) { speed = clamp(s, 0.4, 2.5); },
      getState() { return { playing, speed, mode }; },
      destroy() {
        canvas.removeEventListener('click', onClick);
      }
    };
  }

  /* ========================================================================
     7. ESSAY BUILDER (3-Paragraph Block Builder + Live 120-180 Word Gauge)
     ======================================================================== */
  function createEssayBuilderSim(canvas, narratorEl, opts = {}) {
    let mode = opts.mode || 'opinion';
    let playing = true;
    let speed = 1;
    let t = 0;
    let focusedPara = -1;
    let paraRects = [];

    const BLUEPRINTS = {
      opinion: {
        totalWords: 158,
        paras: [
          {
            title: 'Para 1 · 亮明观点 (36 词)',
            words: 36,
            chip: 'There is no denying that',
            color: PALETTE.orange,
            preview: 'There is no denying that campus AI tools play a vital role in modern study...',
            tip: '首段两句搞定：现象引入 + 明确表态，控制在 30–40 词最利落！'
          },
          {
            title: 'Para 2 · 双论据 + 例证 (86 词)',
            words: 86,
            chip: 'First and foremost / Furthermore',
            color: PALETTE.emerald,
            preview: 'First and foremost, they boost learning efficiency. Furthermore, for instance...',
            tip: '主体段采用“论点一 + 解释 + 论点二 + 校园具体例证”，稳拿内容与结构双高分！'
          },
          {
            title: 'Para 3 · 建议与升华 (36 词)',
            words: 36,
            chip: 'In conclusion / Only in this way',
            color: PALETTE.gold,
            preview: 'In conclusion, students should use technology wisely. Only in this way can we...',
            tip: '尾段重申观点 + 可行建议 + 倒装升华句（Only in this way can...），阅卷一眼加分！'
          }
        ]
      },
      proposal: {
        totalWords: 152,
        paras: [
          {
            title: 'Para 1 · 写信目的与背景 (34 词)',
            words: 34,
            chip: 'I am writing to propose',
            color: PALETTE.orange,
            preview: 'I am writing to share practical suggestions on improving campus facilities...',
            tip: '投稿/建议信首段开门见山亮出写信目的，切忌铺垫过长！'
          },
          {
            title: 'Para 2 · 两条具体落地举措 (84 词)',
            words: 84,
            chip: 'To begin with / In addition',
            color: PALETTE.emerald,
            preview: 'To begin with, extending library hours benefits students. In addition, adding...',
            tip: '主体段给 2 条具体可落地的方案，每条紧跟一句积极效果（contribute to / enable...）。'
          },
          {
            title: 'Para 3 · 期待采纳与展望 (34 词)',
            words: 34,
            chip: 'I sincerely hope that',
            color: PALETTE.gold,
            preview: 'I sincerely hope that these proposals will be taken into consideration...',
            tip: '尾段礼貌致谢 + 期待校园变得更好，篇幅刚好落入 145–165 词黄金中心！'
          }
        ]
      }
    };

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let i = 0; i < paraRects.length; i++) {
        const r = paraRects[i];
        if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
          focusedPara = (focusedPara === i) ? -1 : i;
          return;
        }
      }
      focusedPara = -1;
    }
    canvas.addEventListener('click', onClick);

    function render(dt) {
      const { ctx, w, h } = setupHiDPI(canvas);
      drawSalonBg(ctx, w, h);
      if (playing) t += dt * speed;

      const bp = BLUEPRINTS[mode] || BLUEPRINTS.opinion;
      const compact = w < 520;
      const cycle = (t * 0.65) % 5.4;

      const p0 = clamp01(cycle / 1.2);
      const p1 = clamp01((cycle - 1.3) / 1.4);
      const p2 = clamp01((cycle - 2.8) / 1.2);
      const progs = [p0, p1, p2];

      const curWords = Math.round(
        bp.paras[0].words * Ease.outQuint(p0) +
        bp.paras[1].words * Ease.outQuint(p1) +
        bp.paras[2].words * Ease.outQuint(p2)
      );
      const inSweetSpot = curWords >= 120 && curWords <= 180;
      const bandTxt = curWords >= 140 ? '14分档预估' : (curWords >= 115 ? '11分档预估' : (curWords >= 60 ? '8分档搭建中' : '起笔构思中'));

      drawPill(ctx, 14, 12, `三段式积木引擎 | 实时字数 ${curWords} 词 | ${bandTxt}`, {
        bg: inSweetSpot ? PALETTE.emerald : PALETTE.gold,
        fg: PALETTE.ink,
        border: PALETTE.ivory,
        font: `800 11.5px ${FONT_SANS}`
      });

      const gaugeW = compact ? 116 : 178;
      const leftX = 16;
      const leftW = w - gaugeW - 42;
      const topY = 50;
      const blockGap = 10;
      const blockH = (h - topY - 62 - blockGap * 2) / 3;
      paraRects = [];

      // Draw 3 Structural Paragraph Blueprint Blocks
      bp.paras.forEach((para, idx) => {
        const py = topY + idx * (blockH + blockGap);
        const pr = progs[idx];
        const eased = Ease.outBack(pr);
        paraRects.push({ x: leftX, y: py, w: leftW, h: blockH });
        const isFoc = focusedPara === idx;

        ctx.save();
        ctx.globalAlpha = 0.25 + 0.75 * clamp01(pr * 1.8);
        drawHardBox(ctx, leftX, py, leftW, blockH, {
          r: 6,
          fill: isFoc ? '#382d23' : PALETTE.surface,
          stroke: pr > 0.1 ? para.color : PALETTE.borderMuted,
          lineWidth: (isFoc || pr > 0.85) ? 1.8 : 1.3
        });

        // Left warm stationery color bookmark stripe
        roundRectPath(ctx, leftX + 2, py + 4, 4, blockH - 8, 2);
        ctx.fillStyle = para.color;
        ctx.fill();

        // Title + live fill bar
        ctx.fillStyle = para.color;
        ctx.font = `700 ${compact ? 10.5 : 12}px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(para.title, leftX + 14, py + 9);

        // Flying connector chip snapping into right side of header
        if (pr > 0.05) {
          const chipP = Ease.outQuint(clamp01(pr * 1.4));
          const sx = leftX + leftW * 0.5;
          const sy = h - 26;
          const tx = leftX + leftW - (compact ? 118 : 188);
          const ty = py + 6;
          const chipX = lerp(sx, tx, chipP);
          const chipY = lerp(sy, ty, chipP);
          if (!compact || pr > 0.85) {
            drawPill(ctx, chipX, chipY, para.chip, {
              bg: PALETTE.bgDeep,
              fg: para.color,
              border: para.color,
              h: 20,
              font: `bold ${compact ? 9 : 10}px ${FONT_SERIF}`
            });
          }
        }

        // Preview text revealed progressively
        const visChars = Math.floor(para.preview.length * clamp01(eased));
        ctx.fillStyle = PALETTE.ivory;
        ctx.font = `${compact ? 10 : 11.5}px ${FONT_SERIF}`;
        const lines = wrapMixedText(ctx, para.preview.slice(0, visChars), leftW - 26, 2);
        lines.forEach((ln, li) => {
          ctx.fillText(ln, leftX + 14, py + 31 + li * 15);
        });
        ctx.restore();
      });

      // Right Panel: 120-180 Word Target Gauge Plate
      const gx = leftX + leftW + 14;
      const gy = topY;
      const gh = h - topY - 62;
      drawHardBox(ctx, gx, gy, gaugeW, gh, {
        r: 6,
        fill: PALETTE.bgDeep,
        stroke: inSweetSpot ? PALETTE.emerald : PALETTE.border,
        lineWidth: 1.5
      });

      const cx = gx + gaugeW / 2;
      const cy = gy + gh * 0.47;
      const rad = Math.min(gaugeW * 0.38, gh * 0.34);
      const startA = Math.PI * 0.78;
      const sweepA = Math.PI * 1.44;

      // Background arc (smooth rounded stationery gauge)
      ctx.lineWidth = compact ? 10 : 12;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(217, 203, 182, 0.16)';
      ctx.beginPath();
      ctx.arc(cx, cy, rad, startA, startA + sweepA);
      ctx.stroke();

      // Golden 120-180 sweet-spot zone highlight on track (out of 210 max)
      const zoneStart = startA + (120 / 210) * sweepA;
      const zoneEnd = startA + (180 / 210) * sweepA;
      ctx.strokeStyle = 'rgba(101, 179, 140, 0.34)';
      ctx.beginPath();
      ctx.arc(cx, cy, rad, zoneStart, zoneEnd);
      ctx.stroke();

      // Active value arc (crisp, ZERO blur)
      const ratio = clamp01(curWords / 210);
      ctx.strokeStyle = inSweetSpot ? PALETTE.emerald : PALETTE.orange;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, startA, startA + sweepA * ratio);
      ctx.stroke();

      // Center big word count
      ctx.fillStyle = PALETTE.ivory;
      ctx.font = `bold ${compact ? 22 : 28}px ${FONT_NUM}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(curWords), cx, cy - 4);
      ctx.fillStyle = PALETTE.gold;
      ctx.font = `800 10.5px ${FONT_NUM}`;
      ctx.fillText('WORDS', cx, cy + 18);

      // Gauge footer target text
      ctx.fillStyle = inSweetSpot ? PALETTE.emerald : PALETTE.gold;
      ctx.font = `800 ${compact ? 10 : 11.5}px ${FONT_SANS}`;
      ctx.fillText(inSweetSpot ? '已进入 120-180 黄金区' : '目标带：120-180 词', cx, gy + gh - 24);

      // Bottom Chip Tray
      const trayY = h - 42;
      ctx.fillStyle = PALETTE.cream;
      ctx.font = `800 10.5px ${FONT_SANS}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('可迁移高分芯片库：', 18, trayY + 11);
      const chips = ['There is no denying', 'First and foremost', 'Furthermore', 'In conclusion'];
      let cxTray = compact ? 116 : 132;
      chips.forEach((ch, ci) => {
        if (cxTray + 96 < w - 16) {
          const sz = drawPill(ctx, cxTray, trayY, ch, {
            bg: PALETTE.surface,
            fg: ci === 0 ? PALETTE.orange : (ci === 3 ? PALETTE.gold : PALETTE.emerald),
            border: ci === 0 ? PALETTE.orange : (ci === 3 ? PALETTE.gold : PALETTE.emerald),
            h: 22,
            font: `bold 10.5px ${FONT_SERIF}`
          });
          cxTray += sz.w + 8;
        }
      });

      if (narratorEl) {
        narratorEl.textContent = focusedPara >= 0
          ? `[${bp.paras[focusedPara].title}] ${bp.paras[focusedPara].tip}`
          : '四级作文高分公式：3 段清晰结构 + 3–4 枚逻辑连接芯片 + 120–180 词黄金篇幅，30 分钟稳稳写完！';
      }
    }

    return {
      render,
      setMode(m) { mode = m; t = 0; focusedPara = -1; },
      play() { playing = true; },
      pause() { playing = false; },
      toggle() { playing = !playing; return playing; },
      step() { playing = false; t += 1.0; },
      reset() { t = 0; focusedPara = -1; },
      setSpeed(s) { speed = clamp(s, 0.4, 2.5); },
      getState() { return { playing, speed, mode }; },
      destroy() {
        canvas.removeEventListener('click', onClick);
      }
    };
  }

  const FACTORIES = {
    ebbinghaus: createEbbinghausSim,
    listening_radar: createListeningRadarSim,
    cloze_pipeline: createClozePipelineSim,
    long_read_scan: createLongReadScanSim,
    careful_trap: createCarefulTrapSim,
    trans_restructure: createTransRestructureSim,
    essay_builder: createEssayBuilderSim
  };

  /* -------------------- Scoped Hobonichi Cozy Study Desk CSS Injection -------------------- */
  function injectStyles() {
    if (stylesInjected || typeof document === 'undefined') return;
    if (document.getElementById('cet4-anim-engine-styles')) {
      stylesInjected = true;
      return;
    }
    stylesInjected = true;
    const style = document.createElement('style');
    style.id = 'cet4-anim-engine-styles';
    style.textContent = `
      .cet4-anim-shell,
      .c4a-shell {
        background: #fcf9f1;
        border: 1px solid #d9cbb6;
        border-radius: 10px;
        overflow: hidden;
        color: #30261e;
        box-shadow: 0 3px 12px rgba(72, 52, 32, 0.08), 0 1px 3px rgba(72, 52, 32, 0.05);
        font-family: ${FONT_SANS};
      }
      [data-theme="dark"] .cet4-anim-shell,
      [data-theme="dark"] .c4a-shell,
      body.dark .cet4-anim-shell,
      body.dark .c4a-shell {
        background: #221d18;
        border-color: #40362c;
        color: #f2eadf;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.32);
      }

      /* Delicate Stitched Kraft-Paper Header Strip */
      .cet4-anim-head {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 11px 15px;
        background: #f4ecdc;
        color: #30261e;
        border-bottom: 1px dashed #c8b69d;
      }
      [data-theme="dark"] .cet4-anim-head,
      body.dark .cet4-anim-head {
        background: #2a241e;
        color: #f2eadf;
        border-bottom-color: #4a3f34;
      }
      .cet4-anim-title-wrap { min-width: 0; }
      .cet4-anim-title-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .cet4-anim-kicker {
        display: inline-block;
        padding: 2px 7px;
        background: rgba(207, 92, 40, 0.11);
        color: #cf5c28;
        border: 1px solid rgba(207, 92, 40, 0.3);
        border-radius: 6px;
        font-size: 10px;
        font-weight: 700;
        font-family: ${FONT_NUM};
        letter-spacing: 0.04em;
        white-space: nowrap;
        flex-shrink: 0;
      }
      [data-theme="dark"] .cet4-anim-kicker,
      body.dark .cet4-anim-kicker {
        background: rgba(235, 123, 68, 0.18);
        color: #eb7b44;
        border-color: rgba(235, 123, 68, 0.38);
      }
      .cet4-anim-title {
        font-size: 14px;
        font-weight: 800;
        color: #30261e;
        line-height: 1.35;
      }
      [data-theme="dark"] .cet4-anim-title,
      body.dark .cet4-anim-title {
        color: #f2eadf;
      }
      .cet4-anim-sub {
        font-size: 11.5px;
        color: #665647;
        margin-top: 3px;
      }
      [data-theme="dark"] .cet4-anim-sub,
      body.dark .cet4-anim-sub {
        color: #c7b8a5;
      }
      .cet4-anim-modes {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
      }

      /* Mode Tabs: Warm Parchment + Terracotta Active State */
      .cet4-anim-pill {
        appearance: none;
        border: 1px solid #d9cbb6;
        background: #fffefb;
        color: #665647;
        font-size: 11.5px;
        font-weight: 600;
        padding: 5px 11px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(72, 52, 32, 0.05);
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        font-family: inherit;
        transition: transform 0.14s ease, box-shadow 0.14s ease, background 0.14s ease, border-color 0.14s ease, color 0.14s ease;
      }
      .cet4-anim-pill:hover {
        border-color: #cf5c28;
        color: #cf5c28;
        background: #fdf6d8;
        transform: translateY(-1.5px);
        box-shadow: 0 4px 12px rgba(72, 52, 32, 0.09);
      }
      .cet4-anim-pill:active {
        transform: translateY(0);
      }
      .cet4-anim-pill.active {
        background: #cf5c28;
        border-color: #cf5c28;
        color: #fffefb;
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(207, 92, 40, 0.24);
      }
      .cet4-anim-pill.active:hover {
        background: #b84d1e;
        border-color: #b84d1e;
        color: #fffefb;
      }
      [data-theme="dark"] .cet4-anim-pill,
      body.dark .cet4-anim-pill {
        background: #221d18;
        border-color: #40362c;
        color: #c7b8a5;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.24);
      }
      [data-theme="dark"] .cet4-anim-pill:hover,
      body.dark .cet4-anim-pill:hover {
        background: #352d20;
        border-color: #eb7b44;
        color: #eb7b44;
      }
      [data-theme="dark"] .cet4-anim-pill.active,
      body.dark .cet4-anim-pill.active {
        background: #eb7b44;
        border-color: #eb7b44;
        color: #1d1712;
      }
      [data-theme="dark"] .cet4-anim-pill.active:hover,
      body.dark .cet4-anim-pill.active:hover {
        background: #f28e5c;
        border-color: #f28e5c;
        color: #1d1712;
      }

      .cet4-anim-stage {
        position: relative;
        width: 100%;
        background: #26201a;
      }
      .cet4-anim-canvas {
        display: block;
        width: 100%;
        height: 360px;
      }

      /* Warm Parchment Desk Toolbar */
      .cet4-anim-toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 10px 15px;
        background: #f4ecdc;
        color: #30261e;
        border-top: 1px solid #d9cbb6;
      }
      [data-theme="dark"] .cet4-anim-toolbar,
      body.dark .cet4-anim-toolbar {
        background: #2a241e;
        color: #f2eadf;
        border-top-color: #40362c;
      }
      .cet4-anim-btns {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 7px;
      }
      .cet4-anim-btn {
        appearance: none;
        border: 1px solid #d9cbb6;
        background: #fffefb;
        color: #30261e;
        font-size: 12px;
        font-weight: 600;
        padding: 5px 12px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(72, 52, 32, 0.05);
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        font-family: inherit;
        transition: transform 0.14s ease, box-shadow 0.14s ease, background 0.14s ease, border-color 0.14s ease, color 0.14s ease;
      }
      .cet4-anim-btn:hover {
        background: #fdf6d8;
        border-color: #c8b69d;
        color: #30261e;
        transform: translateY(-1.5px);
        box-shadow: 0 4px 12px rgba(72, 52, 32, 0.1);
      }
      .cet4-anim-btn:active {
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(72, 52, 32, 0.05);
      }
      .cet4-anim-btn.primary {
        background: #cf5c28;
        border-color: #cf5c28;
        color: #fffefb;
        font-weight: 700;
      }
      .cet4-anim-btn.primary:hover {
        background: #b84d1e;
        border-color: #b84d1e;
        color: #fffefb;
      }
      [data-theme="dark"] .cet4-anim-btn,
      body.dark .cet4-anim-btn {
        background: #221d18;
        border-color: #40362c;
        color: #f2eadf;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.24);
      }
      [data-theme="dark"] .cet4-anim-btn:hover,
      body.dark .cet4-anim-btn:hover {
        background: #352d20;
        color: #f2eadf;
        border-color: #665647;
        box-shadow: 0 5px 14px rgba(0, 0, 0, 0.36);
      }
      [data-theme="dark"] .cet4-anim-btn.primary,
      body.dark .cet4-anim-btn.primary {
        background: #eb7b44;
        border-color: #eb7b44;
        color: #1d1712;
      }
      [data-theme="dark"] .cet4-anim-btn.primary:hover,
      body.dark .cet4-anim-btn.primary:hover {
        background: #f28e5c;
        border-color: #f28e5c;
        color: #1d1712;
      }

      /* Calm Speed Slider & Readout */
      .cet4-anim-speed-wrap {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-size: 11.5px;
        font-weight: 700;
        color: #665647;
        white-space: nowrap;
        flex-shrink: 0;
      }
      [data-theme="dark"] .cet4-anim-speed-wrap,
      body.dark .cet4-anim-speed-wrap {
        color: #c7b8a5;
      }
      .cet4-anim-speed-wrap input[type="range"] {
        width: 82px;
        height: 6px;
        accent-color: #cf5c28;
        cursor: pointer;
      }
      [data-theme="dark"] .cet4-anim-speed-wrap input[type="range"],
      body.dark .cet4-anim-speed-wrap input[type="range"] {
        accent-color: #eb7b44;
      }
      .cet4-anim-speed-val {
        display: inline-block;
        min-width: 38px;
        text-align: center;
        padding: 2px 6px;
        background: #fffefb;
        color: #30261e;
        border: 1px solid #d9cbb6;
        border-radius: 6px;
        font-family: ${FONT_NUM};
        font-size: 11px;
        font-weight: 700;
        white-space: nowrap;
        flex-shrink: 0;
      }
      [data-theme="dark"] .cet4-anim-speed-val,
      body.dark .cet4-anim-speed-val {
        background: #221d18;
        color: #e8b34e;
        border-color: #40362c;
      }

      /* Warm Sticky-Note Narrator Strip */
      .cet4-anim-narrator {
        padding: 10px 15px 11px;
        font-size: 12.2px;
        font-weight: 500;
        line-height: 1.62;
        color: #30261e;
        background: #fdf6d8;
        border-top: 1px dashed #c8b69d;
        border-left: 3px solid #cf5c28;
      }
      [data-theme="dark"] .cet4-anim-narrator,
      body.dark .cet4-anim-narrator {
        color: #f2eadf;
        background: #2b241c;
        border-top-color: #4a3f34;
        border-left-color: #eb7b44;
      }

      /* Fullscreen Lightbox (#anim-lightbox): Cozy Study Desk Mat, ZERO Blur */
      .cet4-anim-lightbox-auto {
        position: fixed;
        inset: 0;
        z-index: 9990;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 18px;
        background-color: rgba(34, 26, 19, 0.68);
        font-family: ${FONT_SANS};
      }
      .cet4-anim-lightbox-auto.open { display: flex; }
      .cet4-anim-lightbox-card {
        width: min(980px, 96vw);
        max-height: 92vh;
        overflow: auto;
        background: #fcf9f1;
        color: #30261e;
        border: 1px solid #d9cbb6;
        border-radius: 14px;
        box-shadow: 0 18px 44px rgba(48, 34, 20, 0.26), 0 4px 12px rgba(48, 34, 20, 0.1);
      }
      [data-theme="dark"] .cet4-anim-lightbox-card,
      body.dark .cet4-anim-lightbox-card {
        background: #221d18;
        color: #f2eadf;
        border-color: #40362c;
        box-shadow: 0 20px 48px rgba(0, 0, 0, 0.52);
      }
      .cet4-anim-lightbox-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 13px 18px;
        background: #f4ecdc;
        color: #30261e;
        border-bottom: 1px dashed #c8b69d;
      }
      [data-theme="dark"] .cet4-anim-lightbox-top,
      body.dark .cet4-anim-lightbox-top {
        background: #2a241e;
        color: #f2eadf;
        border-bottom-color: #4a3f34;
      }
      .cet4-anim-lightbox-cap {
        font-size: 12px;
        color: #665647;
        margin-top: 3px;
      }
      [data-theme="dark"] .cet4-anim-lightbox-cap,
      body.dark .cet4-anim-lightbox-cap {
        color: #c7b8a5;
      }
      .cet4-anim-lightbox-close {
        appearance: none;
        border: 1px solid #d9cbb6;
        background: #fffefb;
        color: #30261e;
        border-radius: 8px;
        padding: 6px 13px;
        font-size: 12px;
        font-weight: 700;
        box-shadow: 0 1px 3px rgba(72, 52, 32, 0.06);
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        font-family: inherit;
        transition: transform 0.14s ease, box-shadow 0.14s ease, background 0.14s ease, border-color 0.14s ease, color 0.14s ease;
      }
      .cet4-anim-lightbox-close:hover {
        background: #cf5c28;
        border-color: #cf5c28;
        color: #fffefb;
        transform: translateY(-1.5px);
        box-shadow: 0 4px 12px rgba(72, 52, 32, 0.12);
      }
      .cet4-anim-lightbox-close:active {
        transform: translateY(0);
      }
      [data-theme="dark"] .cet4-anim-lightbox-close,
      body.dark .cet4-anim-lightbox-close {
        background: #221d18;
        border-color: #40362c;
        color: #f2eadf;
      }
      [data-theme="dark"] .cet4-anim-lightbox-close:hover,
      body.dark .cet4-anim-lightbox-close:hover {
        background: #eb7b44;
        border-color: #eb7b44;
        color: #1d1712;
      }
      .cet4-anim-lightbox-card .cet4-anim-canvas { height: min(62vh, 500px); }
      @media (max-width: 640px) {
        .cet4-anim-canvas { height: 315px; }
        .cet4-anim-head, .cet4-anim-toolbar { padding: 9px 11px; }
      }
    `;
    document.head.appendChild(style);
  }

  function escHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildShellHtml(meta, opts = {}) {
    const modesHtml = Array.isArray(meta.modes) && meta.modes.length
      ? `<div class="cet4-anim-modes">${meta.modes.map((m, idx) =>
        `<button type="button" class="cet4-anim-pill anim-pill${idx === 0 ? ' active' : ''}" data-mode="${escHtml(m.id)}">${escHtml(m.label)}</button>`
      ).join('')}</div>`
      : '';
    const heightStyle = opts.height ? ` style="height:${Number(opts.height)}px"` : '';
    const hideFs = opts.inLightbox ? ' style="display:none"' : '';
    return `
      <div class="cet4-anim-shell c4a-shell">
        <div class="cet4-anim-head">
          <div class="cet4-anim-title-wrap">
            <div class="cet4-anim-title-row">
              <span class="cet4-anim-kicker">60FPS LAB</span>
              <div class="cet4-anim-title">${escHtml(opts.title || meta.title)}</div>
            </div>
            <div class="cet4-anim-sub">${escHtml(opts.subtitle || meta.subtitle)}</div>
          </div>
          ${modesHtml}
        </div>
        <div class="cet4-anim-stage">
          <canvas class="cet4-anim-canvas"${heightStyle}></canvas>
        </div>
        <div class="cet4-anim-toolbar">
          <div class="cet4-anim-btns">
            <button type="button" class="cet4-anim-btn primary" data-act="play">暂停</button>
            <button type="button" class="cet4-anim-btn" data-act="step">单步</button>
            <button type="button" class="cet4-anim-btn" data-act="reset">重播</button>
            <button type="button" class="cet4-anim-btn" data-act="fullscreen"${hideFs}>全屏放大</button>
          </div>
          <label class="cet4-anim-speed-wrap">
            <span>倍速</span>
            <input type="range" min="0.4" max="2.5" step="0.1" value="1" data-act="speed">
            <span class="cet4-anim-speed-val" data-act="speed-label">1.0x</span>
          </label>
        </div>
        <div class="cet4-anim-narrator anim-narrator">${escHtml(opts.caption || meta.caption)}</div>
      </div>
    `;
  }

  /* -------------------- Unified RAF Loop -------------------- */
  function tickLoop(ts) {
    const dt = lastTs ? Math.min(0.06, (ts - lastTs) / 1000) : 0.016;
    lastTs = ts;
    activeInstances.forEach((entry, el) => {
      if (typeof document !== 'undefined' && !document.body.contains(el)) {
        try { entry.sim.destroy(); } catch (_e) { /* ignore */ }
        activeInstances.delete(el);
        return;
      }
      const rect = el.getBoundingClientRect ? el.getBoundingClientRect() : { width: 640, height: 360, top: 0, bottom: 360 };
      const vh = (typeof window !== 'undefined' && window.innerHeight) || 900;
      if (rect.width > 0 && rect.height > 0 && rect.bottom > -80 && rect.top < vh + 80) {
        try {
          entry.sim.render(dt);
        } catch (err) {
          if (typeof console !== 'undefined' && console.error) {
            console.error('Cet4AnimEngine render error:', err);
          }
        }
      }
    });
    if (activeInstances.size > 0 && typeof requestAnimationFrame === 'function') {
      rafId = requestAnimationFrame(tickLoop);
    } else {
      rafId = null;
      lastTs = 0;
    }
  }

  function ensureLoop() {
    if (!rafId && activeInstances.size > 0 && typeof requestAnimationFrame === 'function') {
      lastTs = 0;
      rafId = requestAnimationFrame(tickLoop);
    }
  }

  /* -------------------- Public Lifecycle API -------------------- */
  function destroy(containerEl) {
    if (!containerEl || !activeInstances.has(containerEl)) return false;
    const entry = activeInstances.get(containerEl);
    activeInstances.delete(containerEl);
    try { entry.sim.destroy(); } catch (_e) { /* ignore */ }
    if (activeInstances.size === 0 && rafId && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(rafId);
      rafId = null;
      lastTs = 0;
    }
    return true;
  }

  function destroyAll() {
    Array.from(activeInstances.keys()).forEach(el => destroy(el));
  }

  function mount(containerEl, animId, opts = {}) {
    if (!containerEl || !FACTORIES[animId]) return null;
    injectStyles();
    destroy(containerEl);

    const meta = ANIM_META[animId];
    let canvas = containerEl.querySelector('canvas');
    if (!canvas) {
      containerEl.innerHTML = buildShellHtml(meta, opts);
      canvas = containerEl.querySelector('canvas');
    }
    if (!canvas) return null;

    const narratorEl = containerEl.querySelector('.anim-narrator, .cet4-anim-narrator');
    const sim = FACTORIES[animId](canvas, narratorEl, opts);

    const playBtn = containerEl.querySelector('[data-act="play"]');
    const stepBtn = containerEl.querySelector('[data-act="step"]');
    const resetBtn = containerEl.querySelector('[data-act="reset"]');
    const speedInput = containerEl.querySelector('[data-act="speed"]');
    const speedLabel = containerEl.querySelector('[data-act="speed-label"]');
    const fsBtn = containerEl.querySelector('[data-act="fullscreen"]');

    const syncPlayText = () => {
      if (playBtn) {
        const st = sim.getState();
        playBtn.textContent = st.playing ? '暂停' : '播放';
      }
    };

    if (playBtn) {
      playBtn.onclick = () => {
        sim.toggle();
        syncPlayText();
      };
    }
    if (stepBtn) {
      stepBtn.onclick = () => {
        sim.step();
        syncPlayText();
        sim.render(0.016);
      };
    }
    if (resetBtn) {
      resetBtn.onclick = () => {
        sim.reset();
        sim.play();
        syncPlayText();
      };
    }
    if (speedInput) {
      speedInput.oninput = e => {
        const val = clamp(Number(e.target.value), 0.4, 2.5);
        sim.setSpeed(val);
        if (speedLabel) speedLabel.textContent = val.toFixed(1) + 'x';
      };
    }
    if (fsBtn && !opts.inLightbox) {
      fsBtn.onclick = () => {
        openLightbox(animId, opts.title || meta.title, opts.caption || meta.caption);
      };
    }

    containerEl.querySelectorAll('.anim-pill[data-mode], .cet4-anim-pill[data-mode]').forEach(btn => {
      btn.onclick = () => {
        containerEl.querySelectorAll('.anim-pill[data-mode], .cet4-anim-pill[data-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sim.setMode(btn.dataset.mode);
      };
    });

    if (opts.mode) {
      sim.setMode(opts.mode);
      containerEl.querySelectorAll('.anim-pill[data-mode], .cet4-anim-pill[data-mode]').forEach(b => {
        b.classList.toggle('active', b.dataset.mode === opts.mode);
      });
    }
    if (opts.speed != null) {
      sim.setSpeed(opts.speed);
      if (speedInput) speedInput.value = String(opts.speed);
      if (speedLabel) speedLabel.textContent = Number(opts.speed).toFixed(1) + 'x';
    }

    const api = {
      animId,
      play() { sim.play(); syncPlayText(); },
      pause() { sim.pause(); syncPlayText(); },
      toggle() { const p = sim.toggle(); syncPlayText(); return p; },
      step() { sim.step(); syncPlayText(); sim.render(0.016); },
      reset() { sim.reset(); },
      setSpeed(s) {
        const val = clamp(s, 0.4, 2.5);
        sim.setSpeed(val);
        if (speedInput) speedInput.value = String(val);
        if (speedLabel) speedLabel.textContent = val.toFixed(1) + 'x';
      },
      setMode(m) {
        sim.setMode(m);
        containerEl.querySelectorAll('.anim-pill[data-mode], .cet4-anim-pill[data-mode]').forEach(b => {
          b.classList.toggle('active', b.dataset.mode === m);
        });
      },
      getState() { return sim.getState(); },
      destroy() { destroy(containerEl); }
    };

    activeInstances.set(containerEl, { sim, api });
    ensureLoop();
    try { sim.render(0.016); } catch (_e) { /* ignore */ }
    return api;
  }

  function mountAll(rootEl) {
    const scope = rootEl || (typeof document !== 'undefined' ? document : null);
    if (!scope || typeof scope.querySelectorAll !== 'function') return [];
    const nodes = scope.querySelectorAll('[data-anim-id], [data-cet4-anim]');
    const mounted = [];
    nodes.forEach(el => {
      const id = el.dataset.animId || el.dataset.cet4Anim;
      if (id && FACTORIES[id]) {
        const inst = mount(el, id, {
          mode: el.dataset.animMode || undefined,
          title: el.dataset.animTitle || undefined,
          caption: el.dataset.animCaption || undefined
        });
        if (inst) mounted.push(inst);
      }
    });
    return mounted;
  }

  /* -------------------- Fullscreen Lightbox (#anim-lightbox) -------------------- */
  function closeLightbox() {
    if (typeof document === 'undefined') return;
    const overlay = document.getElementById('anim-lightbox');
    if (lightboxInst) {
      lightboxInst.destroy();
      lightboxInst = null;
    }
    if (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  function openLightbox(animId, title, caption) {
    if (typeof document === 'undefined' || !FACTORIES[animId]) return null;
    injectStyles();
    const meta = ANIM_META[animId];

    let overlay = document.getElementById('anim-lightbox');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'anim-lightbox';
      overlay.className = 'cet4-anim-lightbox-auto';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.innerHTML = `
        <div class="cet4-anim-lightbox-card">
          <div class="cet4-anim-lightbox-top">
            <div>
              <strong id="lightbox-title" style="font-size:15px"></strong>
              <div id="lightbox-caption" class="cet4-anim-lightbox-cap"></div>
            </div>
            <button type="button" class="cet4-anim-lightbox-close" id="lightbox-close">关闭 (ESC)</button>
          </div>
          <div id="lightbox-body" style="padding:12px"></div>
        </div>
      `;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeLightbox();
      });
      const closeBtn = overlay.querySelector('#lightbox-close');
      if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
      if (!openLightbox._escBound) {
        openLightbox._escBound = true;
        document.addEventListener('keydown', e => {
          if (e.key === 'Escape') closeLightbox();
        });
      }
    }

    const titleEl = overlay.querySelector('#lightbox-title');
    const capEl = overlay.querySelector('#lightbox-caption');
    const bodyEl = overlay.querySelector('#lightbox-body') || overlay;
    if (titleEl) titleEl.textContent = title || meta.title;
    if (capEl) capEl.textContent = caption || meta.caption;

    if (lightboxInst) {
      lightboxInst.destroy();
      lightboxInst = null;
    }

    let stageHost = bodyEl.querySelector('.cet4-lightbox-stage');
    if (!stageHost) {
      bodyEl.innerHTML = '<div class="cet4-lightbox-stage"></div>';
      stageHost = bodyEl.querySelector('.cet4-lightbox-stage');
    } else {
      stageHost.innerHTML = '';
    }

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        lightboxInst = mount(stageHost, animId, {
          title: title || meta.title,
          caption: caption || meta.caption,
          inLightbox: true
        });
      });
    } else {
      lightboxInst = mount(stageHost, animId, {
        title: title || meta.title,
        caption: caption || meta.caption,
        inLightbox: true
      });
    }
    return overlay;
  }

  function getMeta(animId) {
    if (!animId) return Object.assign({}, ANIM_META);
    return ANIM_META[animId] ? Object.assign({}, ANIM_META[animId]) : null;
  }

  const Cet4AnimEngine = {
    ANIM_IDS,
    PALETTE,
    mount,
    mountAll,
    destroy,
    destroyAll,
    openLightbox,
    closeLightbox,
    getMeta,
    activeInstances
  };

  if (typeof global !== 'undefined' && global) {
    global.Cet4AnimEngine = Cet4AnimEngine;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cet4AnimEngine;
  }
})(typeof window !== 'undefined' ? window : globalThis);
