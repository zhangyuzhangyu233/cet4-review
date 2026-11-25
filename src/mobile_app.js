/* ==========================================================================
   CET-4 Sprint Mobile-First Edition Controller — Pocket Hobonichi Techo
   Shared Store: cet4_xiaoke_sprint_v1 (synced with PC edition)
   5 Views: knowledge | vocab | practice | mastery | notebook
   Zero Emoji · Zero Bare Font Fallbacks · Adaptive Practice & Real Papers
   ========================================================================== */
(function () {
  'use strict';

  const STORE_KEY = 'cet4_xiaoke_sprint_v1';

  const SPRITES = window.XIAOKE_SPRITES || {};
  const MANIFEST = window.XIAOKE_MANIFEST || { sprites: [] };
  const SPRINT_PLAN = Array.isArray(window.SPRINT_PLAN) ? window.SPRINT_PLAN : [];
  const MASTERY_TOPICS = Array.isArray(window.MASTERY_TOPICS) ? window.MASTERY_TOPICS : [];
  const MODULES = Array.isArray(window.KNOWLEDGE_MODULES) ? window.KNOWLEDGE_MODULES : [];
  const RAW_SECTIONS = window.KNOWLEDGE_SECTIONS || {};
  const TOPIC_SUMMARIES = window.TOPIC_SUMMARIES || {};
  const XIAOKE_MANTRAS = Array.isArray(window.XIAOKE_MANTRAS) ? window.XIAOKE_MANTRAS : [];
  const VOCAB_DAYS = Array.isArray(window.VOCAB_DAYS) ? window.VOCAB_DAYS : [];
  const VOCAB_WORDS = Array.isArray(window.VOCAB_WORDS) ? window.VOCAB_WORDS : [];
  const CONFUSABLE_PAIRS = Array.isArray(window.CONFUSABLE_PAIRS) ? window.CONFUSABLE_PAIRS : [];
  const QUESTION_BANK = Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK : [];
  const EXPLAIN_DETAILS = window.EXPLAIN_DETAILS || {};

  /* ==================== INLINE SVG ICONS (EXPLICIT 15x15, FOUNTAIN-PEN LINE, ZERO EMOJI) ==================== */
  const ICONS = {
    play: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>',
    pause: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
    volume: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>',
    check: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    star: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"/></svg>',
    starFill: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"/></svg>',
    list: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1.2" fill="currentColor"/><circle cx="3.5" cy="12" r="1.2" fill="currentColor"/><circle cx="3.5" cy="18" r="1.2" fill="currentColor"/></svg>',
    expand: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
    refresh: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
    headphones: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><rect x="17" y="14" width="4" height="7" rx="1.5"/><rect x="3" y="14" width="4" height="7" rx="1.5"/></svg>',
    book: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    spark: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 14.8 9.2 22 12 14.8 14.8 12 22 9.2 14.8 2 12 9.2 9.2 12 2"/></svg>',
    chevronDown: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    chevronUp: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>',
    prev: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    next: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    sun: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.2" y1="4.2" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.2" y1="19.8" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.8" y2="4.2"/></svg>',
    moon: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    monitor: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    clock: '<svg class="svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>'
  };

  function ic(name) {
    return ICONS[name] || '';
  }

  function escapeHTML(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normSkill(s) {
    const v = String(s || '').toLowerCase();
    if (v === 'listen' || v === 'listening') return 'listening';
    if (v === 'cloze' || v === 'banked_cloze') return 'cloze';
    if (v === 'matching' || v === 'long_reading') return 'matching';
    if (v === 'reading' || v === 'careful_reading') return 'reading';
    if (v === 'translation' || v === 'trans') return 'translation';
    if (v === 'writing' || v === 'essay') return 'writing';
    return v || 'listening';
  }

  function skillTopicKey(skill) {
    const ns = normSkill(skill);
    if (TOPIC_SUMMARIES[ns]) return ns;
    if (ns === 'listening' && TOPIC_SUMMARIES.listen) return 'listen';
    return Object.keys(TOPIC_SUMMARIES)[0] || ns;
  }

  const SKILL_META = {
    all: { label: '智能混刷', short: '混刷', badge: '自适应' },
    listening: { label: '听力微精听', short: '听力', badge: '35% · 248.5分' },
    cloze: { label: '选词填空', short: '选词', badge: '5% · 35.5分' },
    matching: { label: '长篇匹配', short: '长篇匹配', badge: '10% · 71分' },
    reading: { label: '仔细阅读', short: '仔细阅读', badge: '20% · 142分' },
    translation: { label: '汉译英', short: '翻译', badge: '15% · 106.5分' },
    writing: { label: '写作迁移', short: '写作', badge: '15% · 106.5分' }
  };

  const SKILL_ORDER = ['listening', 'cloze', 'matching', 'reading', 'translation', 'writing'];

  /* Build flat ordered section catalog defensively */
  const SECTION_MAP = {};
  const ORDERED_SECTIONS = [];
  if (Array.isArray(RAW_SECTIONS)) {
    RAW_SECTIONS.forEach(sec => {
      if (sec && sec.id) {
        SECTION_MAP[sec.id] = sec;
        ORDERED_SECTIONS.push(sec);
      }
    });
  } else {
    Object.keys(RAW_SECTIONS).forEach(k => {
      const sec = RAW_SECTIONS[k];
      if (sec) SECTION_MAP[sec.id || k] = Object.assign({ id: k }, sec);
    });
    MODULES.forEach(m => {
      (m.sections || []).forEach(s => {
        const sid = typeof s === 'string' ? s : s.id;
        if (SECTION_MAP[sid]) ORDERED_SECTIONS.push(SECTION_MAP[sid]);
      });
    });
    Object.keys(SECTION_MAP).forEach(k => {
      if (!ORDERED_SECTIONS.some(s => s.id === k)) ORDERED_SECTIONS.push(SECTION_MAP[k]);
    });
  }

  const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  function getSpriteSrc(id) {
    if (SPRITES[id]) return SPRITES[id];
    const keys = Object.keys(SPRITES);
    return keys.length ? SPRITES[keys[0]] : TRANSPARENT_PIXEL;
  }

  function getSpriteNo(id) {
    const m = String(id || '').match(/^(\d{2})/);
    return m ? `NO.${m[1]}` : 'NO.01';
  }

  /* ==================== PERSISTENT STATE (SHARED WITH PC) ==================== */
  function normalizeSprintDaysMap(val) {
    const out = {};
    if (Array.isArray(val)) {
      val.forEach(d => { out[String(d)] = true; });
    } else if (val && typeof val === 'object') {
      Object.keys(val).forEach(k => { if (val[k]) out[String(k)] = true; });
    }
    return out;
  }

  function loadState() {
    const firstSec = ORDERED_SECTIONS[0]?.id || 't_sprint_plan';
    let raw = {};
    try {
      raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
    } catch (_e) {
      raw = {};
    }
    const dayNum = Math.min(12, Math.max(1, Number(raw.vocabDay) || 1));
    return {
      answers: raw.answers && typeof raw.answers === 'object' ? raw.answers : {},
      favorites: raw.favorites && typeof raw.favorites === 'object' ? raw.favorites : {},
      studiedSections: raw.studiedSections && typeof raw.studiedSections === 'object' ? raw.studiedSections : {},
      sprintDaysDone: normalizeSprintDaysMap(raw.sprintDaysDone),
      vocabProgress: raw.vocabProgress && typeof raw.vocabProgress === 'object' ? raw.vocabProgress : {},
      vocabDay: dayNum,
      streak: Number(raw.streak) || 0,
      theme: raw.theme === 'dark' ? 'dark' : 'light',

      /* Session UI state */
      activeView: 'knowledge',
      selectedSprintDay: dayNum,
      activeSpriteId: '01_idle_smile',
      activeSection: firstSec,
      sectionDrillPicked: {},

      vocabSubMode: 'recite',
      vocabReciteIdx: 0,
      vocabRate: 1.0,
      vocabRepeat: 2,
      vocabIncludeZh: true,
      vocabRecitePlaying: false,
      vocabCurrentBeat: 'word',
      vocabQueue: [],
      vocabQueueDay: null,
      vocabCardFlipped: false,
      vocabBlindHideWord: true,
      vocabBlindItem: null,
      vocabConfIdx: 0,
      vocabConfPicked: null,

      practiceMode: 'adaptive',
      practiceSkill: 'all',
      practiceHistory: [],
      practiceIdx: 0,
      practiceSeq: 0,
      curveLevel: 1.5,

      nbFilter: 'wrong',
      nbSearch: ''
    };
  }

  const M_VIEW_ORDER = ['knowledge', 'vocab', 'practice', 'mastery', 'notebook'];
  const M_VMODE_ORDER = ['recite', 'flashcard', 'blind', 'confusable'];
  const M_NB_ORDER = ['wrong', 'vocab', 'fav'];

  function runMobileSnapTurn(getTarget, updateFn, dir = 'next', paperStyle = 'grid', duration = 480, getTargetAfter = null) {
    const el = typeof getTarget === 'function' ? getTarget() : getTarget;
    if (el && window.TechoPageTurn && typeof window.TechoPageTurn.turnSnapshot === 'function') {
      window.TechoPageTurn.turnSnapshot(el, updateFn, {
        dir,
        paperStyle,
        duration,
        getTargetAfter: getTargetAfter || (typeof getTarget === 'function' ? getTarget : null)
      });
    } else {
      updateFn();
    }
  }

  const state = loadState();
  let activeReciteCtrl = null;
  let activeListenCtrl = null;
  let activePreReadTimer = null;
  let activeAnimInst = null;
  let activeLightboxAnim = null;
  let realPaperMounted = false;

  function unmountRealPaperStudio() {
    if (realPaperMounted && window.RealPaperStudio && typeof window.RealPaperStudio.unmount === 'function') {
      try { window.RealPaperStudio.unmount(); } catch (_e) {}
    }
    realPaperMounted = false;
  }

  function saveState() {
    try {
      let existing = {};
      try {
        existing = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
      } catch (_e) {
        existing = {};
      }
      localStorage.setItem(STORE_KEY, JSON.stringify(Object.assign({}, existing, {
        answers: state.answers,
        favorites: state.favorites,
        studiedSections: state.studiedSections,
        sprintDaysDone: state.sprintDaysDone,
        vocabProgress: state.vocabProgress,
        vocabDay: state.vocabDay,
        streak: state.streak,
        theme: state.theme
      })));
    } catch (_e) { /* storage unavailable */ }
  }

  function stopAllAudioAndTimers() {
    if (activePreReadTimer) {
      clearInterval(activePreReadTimer);
      activePreReadTimer = null;
    }
    if (activeReciteCtrl && typeof activeReciteCtrl.stop === 'function') {
      try { activeReciteCtrl.stop(); } catch (_e) {}
    }
    activeReciteCtrl = null;
    state.vocabRecitePlaying = false;
    if (activeListenCtrl && typeof activeListenCtrl.stop === 'function') {
      try { activeListenCtrl.stop(); } catch (_e) {}
    }
    activeListenCtrl = null;
    if (window.Cet4Speech && typeof window.Cet4Speech.stop === 'function') {
      try { window.Cet4Speech.stop(); } catch (_e) {}
    }
  }

  /* ==================== WARM PAPER & AUTUMN-PETAL CONFETTI FX ==================== */
  const FireworksFX = (function () {
    let cvs = null, ctx = null, rafId = null;
    const particles = [];
    const rings = [];
    const PALETTE = ['#cf5c28', '#d6982e', '#3f7a5c', '#c24d4d', '#f2cf88'];

    function ensureCanvas() {
      if (!cvs) {
        cvs = document.getElementById('fx-fireworks-canvas');
        if (!cvs) return null;
        ctx = cvs.getContext('2d');
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (cvs.width !== Math.round(w * dpr) || cvs.height !== Math.round(h * dpr)) {
        cvs.width = Math.round(w * dpr);
        cvs.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      return { w, h };
    }

    function launch(mult, origin) {
      const m = mult || 1;
      const sz = ensureCanvas();
      if (!sz || !ctx) return;
      const ox = (origin && origin.x) ? origin.x : sz.w * 0.5;
      const oy = (origin && origin.y) ? origin.y : sz.h * 0.42;
      const count = Math.round(24 * m);
      rings.push({ x: ox, y: oy, r: 8, maxR: 46 * m, life: 1, color: '#d6982e' });
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const spd = (1.8 + Math.random() * 4.2) * m;
        particles.push({
          x: ox,
          y: oy,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 1.2,
          rot: Math.random() * Math.PI,
          vrot: (Math.random() - 0.5) * 0.16,
          shape: i % 3,
          life: 1,
          decay: 0.018 + Math.random() * 0.012,
          size: 5 + Math.random() * 4.2,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)]
        });
      }
      if (!rafId) rafId = requestAnimationFrame(step);
    }

    function step() {
      const sz = ensureCanvas();
      if (!sz || !ctx) { rafId = null; return; }
      ctx.clearRect(0, 0, sz.w, sz.h);

      for (let i = rings.length - 1; i >= 0; i--) {
        const rg = rings[i];
        rg.life -= 0.045;
        if (rg.life <= 0) { rings.splice(i, 1); continue; }
        const cur = rg.r + (rg.maxR - rg.r) * (1 - rg.life);
        ctx.save();
        ctx.globalAlpha = rg.life * 0.6;
        ctx.strokeStyle = rg.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rg.x, rg.y, cur, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.11;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;

        const s = p.size * (0.5 + 0.5 * p.life);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life * 0.9);
        ctx.fillStyle = p.color;
        if (p.shape === 0) {
          /* Small warm paper slip */
          ctx.fillRect(-s * 0.65, -s * 0.36, s * 1.3, s * 0.72);
        } else if (p.shape === 1) {
          /* Autumn petal ellipse */
          ctx.beginPath();
          ctx.ellipse(0, 0, s * 0.68, s * 0.38, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          /* Stationery sparkle dot */
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.42, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (particles.length || rings.length) rafId = requestAnimationFrame(step);
      else rafId = null;
    }

    return { launch };
  })();

  /* ==================== METRICS & READINESS COMPUTATION ==================== */
  function getVocabStats(dayFilter) {
    const list = dayFilter ? VOCAB_WORDS.filter(w => Number(w.day) === Number(dayFilter)) : VOCAB_WORDS;
    let known = 0, fuzzy = 0, unknown = 0;
    list.forEach(w => {
      const p = state.vocabProgress[w.id];
      if (!p || p.status === 'new') unknown++;
      else if (p.status === 'known') known++;
      else fuzzy++;
    });
    const total = list.length;
    const pct = total ? Math.round(((known + fuzzy * 0.45) / total) * 100) : 0;
    return { total, known, fuzzy, unknown, pct };
  }

  function computeSkillMastery(skill) {
    const ns = normSkill(skill);
    const qs = QUESTION_BANK.filter(q => normSkill(q.skill || q.type) === ns);
    const done = qs.filter(q => state.answers[q.id] && state.answers[q.id].checked);
    const right = done.filter(q => state.answers[q.id] && state.answers[q.id].correct);
    const secs = ORDERED_SECTIONS.filter(s => normSkill(s.skillId) === ns);
    const secDone = secs.filter(s => state.studiedSections[s.id]).length;
    const studyPts = secs.length ? Math.round((secDone / secs.length) * 25) : 0;
    const pracPts = qs.length ? Math.round((right.length / qs.length) * 75) : 0;
    return {
      pct: Math.min(100, studyPts + pracPts),
      total: qs.length,
      done: done.length,
      right: right.length,
      wrong: done.length - right.length,
      secDone,
      secTotal: secs.length
    };
  }

  function computeOverallReadiness() {
    const skillAvg = Math.round(
      SKILL_ORDER.reduce((acc, sk) => acc + computeSkillMastery(sk).pct, 0) / SKILL_ORDER.length
    );
    const vocabStat = getVocabStats(null);
    const sprintDoneCnt = Object.keys(state.sprintDaysDone).filter(k => state.sprintDaysDone[k]).length;
    const sprintPct = Math.round((sprintDoneCnt / 12) * 100);
    const readiness = Math.round(skillAvg * 0.55 + vocabStat.pct * 0.30 + sprintPct * 0.15);
    let band = '起步蓄力 · 425+ 冲刺中';
    if (readiness >= 82) band = '稳操胜券 · 冲击 550+ 高分';
    else if (readiness >= 62) band = '节奏极佳 · 稳过 480+ 线';
    else if (readiness >= 38) band = '稳步提分 · 冲刺 450+ 区间';
    else if (readiness >= 15) band = '已入状态 · 坚持带背与刷题';
    return { readiness, skillAvg, vocabStat, sprintDoneCnt, sprintPct, band };
  }

  function getWeakWordsList() {
    return VOCAB_WORDS.filter(w => {
      const p = state.vocabProgress[w.id];
      return p && (p.status === 'fuzzy' || (p.wrongCnt && p.wrongCnt > 0 && p.status !== 'known'));
    });
  }

  function getRealPaperOverview() {
    const papers = Array.isArray(window.REAL_CET4_PAPERS) ? window.REAL_CET4_PAPERS : [];
    let items = 0;
    papers.forEach(p => {
      if (!p) return;
      if (typeof p.totalItems === 'number') {
        items += p.totalItems;
        return;
      }
      if (p.writing) items += 1;
      if (p.translation) items += 1;
      if (p.listening) {
        if (Array.isArray(p.listening.groups)) {
          p.listening.groups.forEach(g => { items += Array.isArray(g.questions) ? g.questions.length : 0; });
        } else if (Array.isArray(p.listening.questions)) {
          items += p.listening.questions.length;
        } else if (Array.isArray(p.listening)) {
          items += p.listening.length;
        }
      }
      if (p.reading) {
        items += Array.isArray(p.reading.cloze?.blanks) ? p.reading.cloze.blanks.length : 0;
        items += Array.isArray(p.reading.matching?.statements) ? p.reading.matching.statements.length : 0;
        if (Array.isArray(p.reading.careful)) {
          p.reading.careful.forEach(ps => { items += Array.isArray(ps.questions) ? ps.questions.length : 0; });
        }
      }
    });
    return { count: papers.length, items };
  }

  function getRealPaperWrongList() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
      return Array.isArray(raw.realPaperWrong) ? raw.realPaperWrong : [];
    } catch (_e) {
      return [];
    }
  }

  function removeRealPaperWrong(key) {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
      const list = Array.isArray(raw.realPaperWrong) ? raw.realPaperWrong : [];
      raw.realPaperWrong = list.filter(it => (it.key || `${it.paperId}_${it.num}`) !== key);
      localStorage.setItem(STORE_KEY, JSON.stringify(raw));
    } catch (_e) {}
  }

  function updateGlobalBadges() {
    const wrongCnt = QUESTION_BANK.filter(q => state.answers[q.id]?.checked && !state.answers[q.id]?.correct).length;
    const rpWrongCnt = getRealPaperWrongList().length;
    const weakWordCnt = getWeakWordsList().length;
    const ov = computeOverallReadiness();
    const elVocab = document.getElementById('m-tab-vocab');
    const elPct = document.getElementById('m-tab-pct');
    const elNb = document.getElementById('m-tab-nb');
    if (elVocab) elVocab.textContent = `D${state.vocabDay}`;
    if (elPct) elPct.textContent = `${ov.readiness}%`;
    if (elNb) elNb.textContent = String(wrongCnt + rpWrongCnt + weakWordCnt);
  }

  /* ==================== THEME & XIAO KE COMPANION BRIDGE ==================== */
  function applyTheme(t) {
    state.theme = t === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    document.body.classList.toggle('dark', state.theme === 'dark');
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', state.theme === 'dark' ? '#181410' : '#ebe2d2');
    const btn = document.getElementById('m-theme-toggle');
    if (btn) {
      btn.innerHTML = state.theme === 'dark'
        ? `${ic('sun')}<span>日光</span>`
        : `${ic('moon')}<span>夜读</span>`;
    }
    saveState();
    syncXiaoKeContext({ theme: state.theme });
    if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.react === 'function') {
      if (state.theme === 'dark') {
        window.XiaoKeAssistant.react('08_sleepy_rest', '台灯夜读模式已点亮，柔和暖光陪你静心刷词刷题。', 3200);
      } else {
        window.XiaoKeAssistant.react('01_idle_smile', '午后书桌日光模式已开启，翻开口袋手账继续冲刺吧！', 3000);
      }
    }
  }

  function buildXiaoKeContext(extra) {
    const curInst = state.practiceHistory[state.practiceIdx] || null;
    const curQ = curInst ? QUESTION_BANK.find(q => q.id === curInst.qId) : null;
    const dayWords = VOCAB_WORDS.filter(w => Number(w.day) === Number(state.vocabDay));
    const curWord = dayWords[state.vocabReciteIdx] || state.vocabQueue[0] || dayWords[0] || null;
    const sec = SECTION_MAP[state.activeSection] || ORDERED_SECTIONS[0] || null;
    const ov = computeOverallReadiness();
    const wrongCount = QUESTION_BANK.filter(q => state.answers[q.id]?.checked && !state.answers[q.id]?.correct).length;
    return Object.assign({
      view: state.activeView,
      theme: state.theme,
      isMobile: true,
      streak: state.streak,
      vocabDay: state.vocabDay,
      vocabMode: state.vocabSubMode === 'blind' ? 'audio_quiz' : state.vocabSubMode,
      vocabWord: curWord,
      activeWord: curWord,
      audioPlaying: !!(state.vocabRecitePlaying || (curInst && curInst.listenPlaying)),
      sectionId: sec ? sec.id : state.activeSection,
      activeSection: sec ? sec.id : state.activeSection,
      activeSectionObj: sec,
      question: (state.activeView === 'practice' && state.practiceMode !== 'real_paper') ? curQ : null,
      activeQuestion: (state.activeView === 'practice' && state.practiceMode !== 'real_paper') ? curQ : null,
      answered: (state.activeView === 'practice' && state.practiceMode !== 'real_paper') ? !!(curInst && curInst.ans && curInst.ans.checked) : true,
      skill: state.practiceSkill,
      wrongCount,
      overallPct: ov.readiness,
      readiness: ov.readiness,
      masterySummary: { overall: ov.readiness }
    }, extra || {});
  }

  function syncXiaoKeContext(extra) {
    const xk = window.XiaoKeAssistant;
    if (!xk) return;
    const ctx = buildXiaoKeContext(extra);
    if (typeof xk.updateContext === 'function') xk.updateContext(ctx);
    else if (typeof xk.onContextChanged === 'function') xk.onContextChanged(ctx);
  }

  function notifyXiaoKeVocab(eventType, wordObj) {
    const xk = window.XiaoKeAssistant;
    if (!xk) return;
    if (typeof xk.onVocabEvent === 'function') {
      xk.onVocabEvent(eventType, wordObj, state.streak);
    } else if (typeof xk.react === 'function') {
      const map = {
        known: ['04_cheer_correct', `拿下「${wordObj?.word || ''}」！词根和真题句都记稳啦。`],
        fuzzy: ['03_thinking_hint', `「${wordObj?.word || ''}」已排入 +7 词复现队列，稍后再见一次就彻底记住！`],
        unknown: ['05_encourage_wrong', `没关系！「${wordObj?.word || ''}」已排进 +3 词马上重背。`],
        recite_start: ['07_listening_audio', '随身带背已启动！跟读读音与真题例句，通勤也能高效背词。']
      };
      const entry = map[eventType];
      if (entry) xk.react(entry[0], entry[1], 3200);
    }
  }

  /* ==================== BOTTOM SHEET & FULLSCREEN LIGHTBOX ==================== */
  function openBottomSheet(titleText, bodyHTML, onBind) {
    const mask = document.getElementById('m-sheet-mask');
    const titleEl = document.getElementById('m-sheet-title');
    const bodyEl = document.getElementById('m-sheet-body');
    if (!mask || !titleEl || !bodyEl) return;
    titleEl.textContent = titleText;
    bodyEl.innerHTML = bodyHTML;
    mask.classList.add('open');
    if (typeof onBind === 'function') onBind(bodyEl);
  }

  function closeBottomSheet() {
    document.getElementById('m-sheet-mask')?.classList.remove('open');
  }

  function openAnimLightbox(animId, titleText) {
    if (window.Cet4AnimEngine && typeof window.Cet4AnimEngine.openLightbox === 'function') {
      window.Cet4AnimEngine.openLightbox(animId, titleText || '60FPS 交互动画全屏实验室', '');
      return;
    }
    const overlay = document.getElementById('anim-lightbox');
    const body = document.getElementById('lightbox-body');
    const titleEl = document.getElementById('lightbox-title');
    if (!overlay || !body) return;
    if (activeLightboxAnim && typeof activeLightboxAnim.destroy === 'function') {
      try { activeLightboxAnim.destroy(); } catch (_e) {}
      activeLightboxAnim = null;
    }
    if (titleEl) titleEl.textContent = titleText || '60FPS 交互动画全屏实验室';
    body.innerHTML = '<div id="m-lightbox-anim-host" style="min-height:66dvh"></div>';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      const host = document.getElementById('m-lightbox-anim-host');
      if (host && window.Cet4AnimEngine && typeof window.Cet4AnimEngine.mount === 'function') {
        activeLightboxAnim = window.Cet4AnimEngine.mount(host, animId, { inLightbox: true });
      }
    });
  }

  function closeAnimLightbox() {
    if (window.Cet4AnimEngine && typeof window.Cet4AnimEngine.closeLightbox === 'function') {
      try { window.Cet4AnimEngine.closeLightbox(); } catch (_e) {}
    }
    const overlay = document.getElementById('anim-lightbox');
    const body = document.getElementById('lightbox-body');
    if (activeLightboxAnim && typeof activeLightboxAnim.destroy === 'function') {
      try { activeLightboxAnim.destroy(); } catch (_e) {}
      activeLightboxAnim = null;
    }
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (body) body.innerHTML = '';
  }

  function openTocSheet() {
    const html = MODULES.map(m => {
      const sk = computeSkillMastery(m.skillId);
      const secList = (m.sections || []).map(s => {
        const sid = typeof s === 'string' ? s : s.id;
        const secObj = SECTION_MAP[sid] || s;
        const isDone = !!state.studiedSections[sid];
        const isCur = state.activeSection === sid;
        return `
          <button type="button" class="toc-sub-item ${isCur ? 'active' : ''}" data-toc-sec="${escapeHTML(sid)}">
            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHTML(secObj.title || sid)}</span>
            <span class="exam-tag ${isDone ? 'ok' : ''}">${isDone ? '已学' : `${secObj.minutes || secObj.timeEst || '8m'}`}</span>
          </button>`;
      }).join('');
      return `
        <div style="margin-bottom:12px">
          <div class="toc-chapter-head">
            <span>${escapeHTML(m.num ? `CH.0${m.num} · ` : '')}${escapeHTML(m.title)}</span>
            <span class="exam-tag orange">${sk.pct}%</span>
          </div>
          <div class="toc-sub-wrap">${secList}</div>
        </div>`;
    }).join('');

    openBottomSheet(`6 章 · ${ORDERED_SECTIONS.length} 节破题精讲目录`, html, (bodyEl) => {
      bodyEl.querySelectorAll('[data-toc-sec]').forEach(btn => {
        btn.onclick = () => {
          const prevIdx = ORDERED_SECTIONS.findIndex(s => s.id === state.activeSection);
          const nextIdx = ORDERED_SECTIONS.findIndex(s => s.id === btn.dataset.tocSec);
          const dir = (btn.dataset.tocSec !== state.activeSection && prevIdx >= 0 && nextIdx >= 0)
            ? (nextIdx < prevIdx ? 'prev' : 'next')
            : null;
          state.activeSection = btn.dataset.tocSec;
          closeBottomSheet();
          window.scrollTo({ top: 0, behavior: 'auto' });
          const getTarget = () => document.querySelector('#m-view-knowledge .m-sec-bar')?.nextElementSibling || document.getElementById('m-view-knowledge');
          if (dir) runMobileSnapTurn(getTarget, () => renderKnowledgeView(), dir, 'grid', 480);
          else renderKnowledgeView();
        };
      });
    });
  }

  function openTopicSummarySheet(skillId) {
    const key = skillTopicKey(skillId);
    const sum = TOPIC_SUMMARIES[key];
    if (!sum) return;
    const html = `
      <div class="formula-box" style="margin-top:0">${escapeHTML(sum.formula || '')}</div>
      ${(sum.checklist || sum.quickTips || []).length ? `
        <div style="margin:10px 0">
          <div style="font-size:12px;font-weight:900;color:var(--text);margin-bottom:6px">考场速查清单</div>
          <ul class="kp-rich" style="margin:0;padding-left:18px">
            ${(sum.checklist || sum.quickTips || []).map(x => `<li>${escapeHTML(x)}</li>`).join('')}
          </ul>
        </div>` : ''}
      ${sum.trapWarning ? `<div class="trap-callout"><strong>高频避坑：</strong>${escapeHTML(sum.trapWarning)}</div>` : ''}
      <button type="button" class="submit-btn" id="m-sheet-goto-sec" style="width:100%;margin-top:12px">前往对应破题精讲与动画</button>`;

    openBottomSheet(`题型速记卡 · ${sum.title || SKILL_META[normSkill(skillId)]?.label || ''}`, html, () => {
      document.getElementById('m-sheet-goto-sec')?.addEventListener('click', () => {
        closeBottomSheet();
        const targetSec = ORDERED_SECTIONS.find(s => normSkill(s.skillId) === normSkill(skillId));
        if (targetSec) state.activeSection = targetSec.id;
        switchView('knowledge');
      });
    });
  }

  /* ==================== VIEW 1: KNOWLEDGE (ZINE COVER + TEAR-OFF TICKETS + 3-STEP READER) ==================== */
  function destroySectionAnim() {
    if (activeAnimInst && typeof activeAnimInst.destroy === 'function') {
      try { activeAnimInst.destroy(); } catch (_e) {}
    }
    activeAnimInst = null;
  }

  function renderKnowledgeView() {
    const host = document.getElementById('m-view-knowledge');
    if (!host) return;
    destroySectionAnim();

    const secIdx = Math.max(0, ORDERED_SECTIONS.findIndex(s => s.id === state.activeSection));
    const sec = ORDERED_SECTIONS[secIdx] || ORDERED_SECTIONS[0];
    if (sec) state.activeSection = sec.id;
    const prevSec = secIdx > 0 ? ORDERED_SECTIONS[secIdx - 1] : null;
    const nextSec = secIdx < ORDERED_SECTIONS.length - 1 ? ORDERED_SECTIONS[secIdx + 1] : null;
    const mod = MODULES.find(m => m.id === sec?.moduleId) || MODULES[0];

    const sprintDayObj = SPRINT_PLAN.find(d => Number(d.day) === Number(state.selectedSprintDay)) || SPRINT_PLAN[0] || {
      day: state.selectedSprintDay, title: '今日冲刺任务', vocabDay: state.vocabDay,
      sectionIds: [state.activeSection], practiceSkill: 'listening', minutes: 35, goal: '完成今日带背与破题精讲'
    };
    const isDayDone = !!state.sprintDaysDone[String(sprintDayObj.day)];
    const doneDaysCount = Object.keys(state.sprintDaysDone).filter(k => state.sprintDaysDone[k]).length;
    const vocabAll = getVocabStats(null);

    const mantraObj = XIAOKE_MANTRAS.find(m => m.spriteId === state.activeSpriteId)
      || XIAOKE_MANTRAS[0]
      || { spriteId: state.activeSpriteId, label: '微笑待机', tag: '冲刺陪伴', mantra: '每天高频带背 + 精练真题，12天稳步攻克四级核心分！' };

    const manifestSprites = Array.isArray(MANIFEST.sprites) && MANIFEST.sprites.length
      ? MANIFEST.sprites
      : Object.keys(SPRITES).map(id => ({ id, zh_label: id.slice(3) }));

    const isStudied = !!(sec && state.studiedSections[sec.id]);
    const drill = sec?.drill || null;
    const drillPick = sec ? state.sectionDrillPicked[sec.id] : undefined;
    const rpInfo = getRealPaperOverview();

    host.innerHTML = `
      <!-- Pocket Techo Folio Ribbon -->
      <div class="m-ticker-strip">
        <span>TECHO NO.04 · 312高频词 · 80专项${rpInfo.count ? ` · ${rpInfo.count}套历年真题全卷` : ''}</span>
        <span class="m-ticker-tag">710 刻度</span>
      </div>

      <!-- Washi-Taped Pocket Journal Cover Card -->
      <div class="m-zine-cover">
        <div class="m-cover-grid">
          <div style="min-width:0">
            <div class="m-cover-kicker">POCKET TECHO · CET-4</div>
            <div class="m-cover-title">14天速通<br><span class="m-hl-marigold">大学英语四级</span></div>
            <div class="m-cover-desc">小克伴学口袋手账：高频词带背、听力未听先知与 6 大题型逐题破题。</div>
            <div class="m-cover-stats">
              <span class="m-cover-stamp">打卡 ${doneDaysCount}/12天</span>
              <span class="m-cover-stamp">词汇 ${vocabAll.known}/${vocabAll.total}</span>
            </div>
          </div>
          <div class="m-cover-comic">
            <div class="m-cover-polaroid-well">
              <img class="m-cover-sprite" src="${getSpriteSrc(state.activeSpriteId)}" alt="小克伴学">
            </div>
            <span class="m-cover-comic-no">${escapeHTML(getSpriteNo(state.activeSpriteId))}</span>
          </div>
        </div>

        <!-- Stitched 710 Score Scale Ruler -->
        <div class="m-score-tape-wrap">
          <div class="m-score-tape-head">
            <span>CET-4 710 分值刻度尺</span>
            <span>425 过线 · 500+ 冲优</span>
          </div>
          <div class="m-score-tape" aria-label="四级710分值配比">
            <div class="m-tape-seg seg-listen">听力35%</div>
            <div class="m-tape-seg seg-read">阅读35%</div>
            <div class="m-tape-seg seg-trans">翻15%</div>
            <div class="m-tape-seg seg-write">写15%</div>
          </div>
        </div>

        <div class="m-hero-cta-row">
          <button type="button" class="m-hero-btn marigold" id="m-hero-go-vocab">${ic('headphones')}<span>Day ${state.vocabDay} 语音带背</span></button>
          <button type="button" class="m-hero-btn orange" id="m-hero-go-prac">${ic('spark')}<span>六大题型精练</span></button>
        </div>
        <button type="button" class="m-cover-realpaper-btn" id="m-hero-go-realpaper">
          <span style="display:inline-flex;align-items:center;gap:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${ic('book')}<span>完整历年真题（${rpInfo.count ? `${rpInfo.count}套${rpInfo.items ? `·${rpInfo.items}题` : ''}` : '最新实卷'}）</span></span>
          <span class="exam-tag orange">直达</span>
        </button>
      </div>

      <!-- Xiao Ke 10-Sticker Stamp Carousel -->
      <div class="m-sprite-strip-card">
        <div class="m-sprint-head" style="margin-bottom:6px">
          <span style="font-family:var(--font-serif);font-size:13px;font-weight:800;color:var(--text)">小克 10 款手账贴纸 · 点击切换考前口诀</span>
          <span class="exam-tag gold">${escapeHTML(mantraObj.tag || mantraObj.label || '考前锦囊')}</span>
        </div>
        <div class="m-hscroll">
          ${manifestSprites.map((sp, idx) => `
            <button type="button" class="m-sprite-item ${sp.id === state.activeSpriteId ? 'active' : ''}" data-xk-sprite="${escapeHTML(sp.id)}">
              <span class="m-sprite-no">${String(idx + 1).padStart(2, '0')}</span>
              <img src="${getSpriteSrc(sp.id)}" alt="${escapeHTML(sp.zh_label || sp.id)}">
              <span>${escapeHTML(sp.zh_label || sp.id)}</span>
            </button>`).join('')}
        </div>
        <div class="m-mantra-quote">${escapeHTML(mantraObj.mantra || mantraObj.tip || '')}</div>
      </div>

      <!-- Horizontal Hobonichi Day 1-12 Daily Planner Cards -->
      <div class="m-sprint-panel">
        <div class="m-sprint-head">
          <div class="m-sprint-title">${ic('clock')}<span>12 天活页冲刺手账</span></div>
          <span class="exam-tag emerald">已盖章 ${doneDaysCount}/12</span>
        </div>
        <div class="m-hscroll" id="m-sprint-pills">
          ${(SPRINT_PLAN.length ? SPRINT_PLAN : Array.from({ length: 12 }, (_, i) => ({ day: i + 1, title: `Day ${i + 1}` }))).map(d => {
            const done = !!state.sprintDaysDone[String(d.day)];
            const sel = Number(d.day) === Number(sprintDayObj.day);
            const phaseIdx = d.day <= 4 ? 1 : (d.day <= 8 ? 2 : 3);
            return `
              <button type="button" class="m-day-ticket phase-${phaseIdx} ${done ? 'done' : ''} ${sel ? 'selected' : ''}" data-sday="${d.day}">
                <span class="m-ticket-top">
                  <span class="m-ticket-hole"></span>
                  <span class="m-ticket-hole"></span>
                </span>
                <span class="m-ticket-body">
                  <span class="m-ticket-num">D${String(d.day).padStart(2, '0')}</span>
                  <span class="m-ticket-phase">${d.phase ? escapeHTML(String(d.phase).slice(0, 3)) : '冲刺日'}</span>
                </span>
                ${done ? '<span class="m-done-stamp">済</span>' : ''}
              </button>`;
          }).join('')}
        </div>
        <div class="m-day-detail">
          <div class="m-day-detail-top">
            <strong style="font-family:var(--font-serif);font-size:13.2px;color:var(--text)">DAY ${String(sprintDayObj.day).padStart(2, '0')} · ${escapeHTML(sprintDayObj.title || '')}</strong>
            <button type="button" class="m-pill-btn ${isDayDone ? 'accent' : 'primary'}" id="m-toggle-sday">
              ${isDayDone ? `${ic('check')}<span>済 已打卡</span>` : '打卡盖章'}
            </button>
          </div>
          <div style="font-size:12px;color:var(--text-sec);line-height:1.56">
            ${escapeHTML(sprintDayObj.goal || sprintDayObj.listeningTask || '')}
            ${sprintDayObj.minutes ? `<span class="exam-tag" style="margin-left:5px">${sprintDayObj.minutes}m</span>` : ''}
          </div>
          <div class="m-day-actions">
            <button type="button" class="m-day-act-btn marigold" id="m-sday-vocab">背 D${sprintDayObj.vocabDay || sprintDayObj.day} 词</button>
            <button type="button" class="m-day-act-btn emerald" id="m-sday-sec">读今日精讲</button>
            <button type="button" class="m-day-act-btn primary" id="m-sday-prac">刷${SKILL_META[normSkill(sprintDayObj.practiceSkill)]?.short || '专项'}</button>
          </div>
        </div>
      </div>

      <!-- Section Bar + Warm Cotton Bottom-Sheet TOC Trigger -->
      <div class="m-sec-bar">
        <div class="m-sec-info">
          <div class="m-sec-kicker">${escapeHTML(mod ? `CH.0${mod.num || 1} · ${mod.title}` : '破题精讲')} · ${secIdx + 1}/${ORDERED_SECTIONS.length || 1}</div>
          <div class="m-sec-title">${escapeHTML(sec ? sec.title : '四级核心精讲')}</div>
        </div>
        <button type="button" class="m-drawer-trigger" id="m-open-toc">${ic('list')}<span>目录(${ORDERED_SECTIONS.length})</span></button>
      </div>

      ${sec ? `
        <!-- 壹 · 破题精讲 -->
        <div class="salon-card double-frame">
          <div class="m-step-heading">
            <span class="m-step-stamp is-orange">壹 · 破题</span>
            <h3>真题方法与核心拆解</h3>
          </div>
          ${sec.mantra ? `<div class="formula-box">${escapeHTML(sec.mantra)}</div>` : ''}
          <div class="kp-rich">${sec.coreHtml || ''}</div>
          ${Array.isArray(sec.strategySteps) && sec.strategySteps.length ? `
            <div class="m-strategy-list">
              ${sec.strategySteps.map((st, idx) => `
                <div class="m-strategy-item">
                  <div class="m-strategy-top">
                    <span class="m-strategy-badge">STEP 0${st.step || idx + 1}</span>
                    <strong style="font-size:13px;color:var(--text)">${escapeHTML(st.title || '')}</strong>
                  </div>
                  <div style="font-size:12.6px;color:var(--text-sec);line-height:1.58">${escapeHTML(st.detail || '')}</div>
                  ${st.example ? `<div class="m-strategy-example">${escapeHTML(st.example)}</div>` : ''}
                </div>`).join('')}
            </div>` : ''}
        </div>

        <!-- 贰 · 即学微测 -->
        ${drill ? `
          <div class="salon-card">
            <div class="m-step-heading">
              <span class="m-step-stamp is-marigold">贰 · 微测</span>
              <h3>即学即练互动微实操</h3>
            </div>
            <div style="font-size:13.5px;font-weight:700;color:var(--text);margin-bottom:10px;line-height:1.58">${escapeHTML(drill.prompt || '')}</div>
            <div class="options-grid">
              ${(drill.options || []).map((opt, idx) => {
                const letters = ['A', 'B', 'C', 'D'];
                let cls = '';
                if (drillPick !== undefined) {
                  if (idx === Number(drill.answerIdx)) cls = 'correct';
                  else if (idx === drillPick) cls = 'wrong';
                }
                return `
                  <button type="button" class="opt-btn ${cls}" data-sec-drill="${idx}">
                    <span class="opt-key">${letters[idx] || idx + 1}</span>
                    <span class="en-serif">${escapeHTML(opt)}</span>
                  </button>`;
              }).join('')}
            </div>
            ${drillPick !== undefined ? `
              <div class="trap-callout" style="margin-top:4px">
                <strong>${drillPick === Number(drill.answerIdx) ? '命中核心破题点！' : '再对照一下思路：'}</strong>
                ${escapeHTML(drill.explain || drill.hint || '')}
              </div>` : (drill.hint ? `<div style="font-size:12px;font-weight:600;color:var(--text-muted)">提示：${escapeHTML(drill.hint)}</div>` : '')}
          </div>` : ''}

        <!-- 叁 · 60FPS 交互动画 -->
        ${sec.animId ? `
          <div class="anim-lab-card">
            <div class="anim-lab-bar">
              <div class="anim-lab-title">
                <span class="live-dot"></span>
                <span>叁 · 60FPS 动画 · ${escapeHTML(sec.animCaption || '交互图解实验室')}</span>
              </div>
              <button type="button" class="canvas-zoom-btn" id="m-sec-anim-zoom">${ic('expand')}<span>全屏</span></button>
            </div>
            <div class="anim-host-box" id="m-sec-anim-host"></div>
          </div>` : ''}

        <!-- Section Check-in & Pager -->
        <button type="button" class="${isStudied ? 'emerald-btn' : 'submit-btn'}" id="m-btn-checkin" style="width:100%">
          ${isStudied ? `${ic('check')}<span>本节已盖章打卡（点击可取消）</span>` : '打卡完成本节精讲（提升该题型熟练度）'}
        </button>

        <div class="m-sec-pager">
          <button type="button" class="secondary-btn" id="m-sec-prev" ${!prevSec ? 'disabled' : ''}>${ic('prev')}<span>上一节</span></button>
          <button type="button" class="marigold-btn" id="m-sec-prac">专项刷题</button>
          <button type="button" class="secondary-btn" id="m-sec-next" ${!nextSec ? 'disabled' : ''}><span>下一节</span>${ic('next')}</button>
        </div>
      ` : '<div class="salon-card">精讲数据正在加载中...</div>'}
    `;

    /* Bind Cover CTAs */
    document.getElementById('m-hero-go-vocab')?.addEventListener('click', () => switchView('vocab'));
    document.getElementById('m-hero-go-prac')?.addEventListener('click', () => {
      state.practiceMode = 'adaptive';
      switchView('practice');
    });
    document.getElementById('m-hero-go-realpaper')?.addEventListener('click', () => {
      state.practiceMode = 'real_paper';
      switchView('practice');
    });

    /* Bind Sprint Tickets */
    host.querySelectorAll('[data-sday]').forEach(btn => {
      btn.onclick = () => {
        state.selectedSprintDay = Number(btn.dataset.sday);
        renderKnowledgeView();
      };
    });
    document.getElementById('m-toggle-sday')?.addEventListener('click', (e) => {
      const k = String(sprintDayObj.day);
      const nextVal = !state.sprintDaysDone[k];
      state.sprintDaysDone[k] = nextVal;
      saveState();
      updateGlobalBadges();
      if (nextVal) {
        FireworksFX.launch(1.15, { x: e.clientX, y: e.clientY });
        if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.react === 'function') {
          window.XiaoKeAssistant.react('09_proud_streak', `DAY ${sprintDayObj.day}「済」字印章已盖下！离四级高分又近了一大步。`, 3400);
        }
      }
      renderKnowledgeView();
    });
    document.getElementById('m-sday-vocab')?.addEventListener('click', () => {
      state.vocabDay = Number(sprintDayObj.vocabDay || sprintDayObj.day) || 1;
      state.vocabReciteIdx = 0;
      state.vocabQueueDay = null;
      saveState();
      updateGlobalBadges();
      switchView('vocab');
    });
    document.getElementById('m-sday-sec')?.addEventListener('click', () => {
      const targetId = Array.isArray(sprintDayObj.sectionIds) && sprintDayObj.sectionIds[0];
      if (targetId && SECTION_MAP[targetId]) {
        state.activeSection = targetId;
        renderKnowledgeView();
      }
      document.getElementById('m-open-toc')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    document.getElementById('m-sday-prac')?.addEventListener('click', () => {
      startPracticeScope(normSkill(sprintDayObj.practiceSkill || 'all'));
      switchView('practice');
    });

    /* Bind Xiao Ke 10-sticker strip */
    host.querySelectorAll('[data-xk-sprite]').forEach(btn => {
      btn.onclick = () => {
        state.activeSpriteId = btn.dataset.xkSprite;
        if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.setSprite === 'function') {
          window.XiaoKeAssistant.setSprite(state.activeSpriteId);
        }
        renderKnowledgeView();
      };
    });

    /* Bind TOC Sheet */
    document.getElementById('m-open-toc')?.addEventListener('click', openTocSheet);

    /* Bind Section Micro-Drill */
    if (sec && drill) {
      host.querySelectorAll('[data-sec-drill]').forEach(btn => {
        btn.onclick = (e) => {
          const idx = Number(btn.dataset.secDrill);
          state.sectionDrillPicked[sec.id] = idx;
          if (idx === Number(drill.answerIdx)) {
            FireworksFX.launch(1.0, { x: e.clientX, y: e.clientY });
          }
          renderKnowledgeView();
        };
      });
    }

    /* Mount 60fps Animation */
    if (sec && sec.animId) {
      const animHost = document.getElementById('m-sec-anim-host');
      if (animHost && window.Cet4AnimEngine && typeof window.Cet4AnimEngine.mount === 'function') {
        activeAnimInst = window.Cet4AnimEngine.mount(animHost, sec.animId, { mobile: true });
      }
      document.getElementById('m-sec-anim-zoom')?.addEventListener('click', () => {
        openAnimLightbox(sec.animId, sec.animCaption || sec.title);
      });
    }

    /* Bind Section Check-in & Pager */
    document.getElementById('m-btn-checkin')?.addEventListener('click', (e) => {
      if (!sec) return;
      state.studiedSections[sec.id] = !state.studiedSections[sec.id];
      saveState();
      updateGlobalBadges();
      if (state.studiedSections[sec.id]) FireworksFX.launch(1.1, { x: e.clientX, y: e.clientY });
      renderKnowledgeView();
    });
    const getKnowledgeSecTarget = () => host.querySelector('.m-sec-bar')?.nextElementSibling || host.querySelector('.m-sec-bar');
    document.getElementById('m-sec-prev')?.addEventListener('click', () => {
      if (!prevSec) return;
      window.scrollTo({ top: 0, behavior: 'auto' });
      runMobileSnapTurn(getKnowledgeSecTarget, () => {
        state.activeSection = prevSec.id;
        renderKnowledgeView();
      }, 'prev', 'grid', 480);
    });
    document.getElementById('m-sec-next')?.addEventListener('click', () => {
      if (!nextSec) return;
      window.scrollTo({ top: 0, behavior: 'auto' });
      runMobileSnapTurn(getKnowledgeSecTarget, () => {
        state.activeSection = nextSec.id;
        renderKnowledgeView();
      }, 'next', 'grid', 480);
    });
    document.getElementById('m-sec-prac')?.addEventListener('click', () => {
      startPracticeScope(normSkill(sec?.skillId || 'all'));
      switchView('practice');
    });

    syncXiaoKeContext();
  }

  /* ==================== VIEW 2: POCKET WALKMAN & STACKED CARD DECK ==================== */
  function getDayWords(dayNum) {
    const list = VOCAB_WORDS.filter(w => Number(w.day) === Number(dayNum));
    return list.length ? list : VOCAB_WORDS.slice(0, 25);
  }

  function ensureFlashcardQueue(dayNum, forceWeak) {
    if (!forceWeak && state.vocabQueueDay === dayNum && state.vocabQueue.length) return;
    const base = forceWeak ? getWeakWordsList() : getDayWords(dayNum);
    const pool = base.length ? base : getDayWords(dayNum);
    const unmastered = pool.filter(w => state.vocabProgress[w.id]?.status !== 'known');
    const ordered = unmastered.length ? unmastered : pool;
    state.vocabQueue = ordered.slice();
    state.vocabQueueDay = forceWeak ? 'weak' : dayNum;
    state.vocabCardFlipped = false;
  }

  function rateVocabWord(wordObj, rating, clickEvent) {
    if (!wordObj) return;
    const prev = state.vocabProgress[wordObj.id] || { status: 'new', reps: 0, nextDay: state.vocabDay, wrongCnt: 0 };
    const next = Object.assign({}, prev);
    next.reps = (next.reps || 0) + 1;
    if (rating === 'known') {
      next.status = 'known';
      next.nextDay = Math.min(12, state.vocabDay + 3);
      state.streak++;
      if (clickEvent) FireworksFX.launch(state.streak >= 5 ? 1.4 : 0.9, { x: clickEvent.clientX, y: clickEvent.clientY });
      notifyXiaoKeVocab('known', wordObj);
    } else if (rating === 'fuzzy') {
      next.status = 'fuzzy';
      next.nextDay = Math.min(12, state.vocabDay + 1);
      notifyXiaoKeVocab('fuzzy', wordObj);
    } else {
      next.status = 'fuzzy';
      next.wrongCnt = (next.wrongCnt || 0) + 1;
      next.nextDay = state.vocabDay;
      state.streak = 0;
      notifyXiaoKeVocab('unknown', wordObj);
    }
    state.vocabProgress[wordObj.id] = next;
    saveState();
    updateGlobalBadges();

    /* In-session spaced re-queueing for flashcard mode */
    if (state.vocabSubMode === 'flashcard' && state.vocabQueue.length) {
      const cur = state.vocabQueue.shift();
      if (rating === 'unknown') {
        const insertAt = Math.min(3, state.vocabQueue.length);
        state.vocabQueue.splice(insertAt, 0, cur);
      } else if (rating === 'fuzzy') {
        const insertAt = Math.min(7, state.vocabQueue.length);
        state.vocabQueue.splice(insertAt, 0, cur);
      }
      state.vocabCardFlipped = false;
    }
  }

  function buildBlindQuizItem(dayWords) {
    const pool = dayWords.length >= 4 ? dayWords : VOCAB_WORDS;
    if (!pool.length) return null;
    const target = pool[Math.floor(Math.random() * pool.length)];
    const distractors = [];
    const shuffled = VOCAB_WORDS.slice().sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffled.length && distractors.length < 3; i++) {
      if (shuffled[i].id !== target.id && shuffled[i].meaning !== target.meaning) {
        distractors.push(shuffled[i]);
      }
    }
    const opts = [target, ...distractors].sort(() => Math.random() - 0.5);
    return {
      word: target,
      options: opts.map(o => `${o.pos ? `${o.pos} ` : ''}${o.meaning}`),
      answerIdx: opts.findIndex(o => o.id === target.id),
      pickedIdx: null
    };
  }

  function formatSentenceHighlight(sentence, targetWord) {
    const safe = escapeHTML(sentence || '');
    if (!targetWord) return safe;
    const escapedWord = String(targetWord).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try {
      return safe.replace(new RegExp(`\\b(${escapedWord}\\w*)\\b`, 'gi'), '<mark class="m-evidence-mark">$1</mark>');
    } catch (_e) {
      return safe;
    }
  }

  function renderVocabView() {
    const host = document.getElementById('m-view-vocab');
    if (!host) return;

    const dayInfo = VOCAB_DAYS.find(d => Number(d.day) === Number(state.vocabDay)) || {
      day: state.vocabDay, title: `Day ${state.vocabDay} 核心高频词`, theme: '真题实测高频词组', focusTip: '听音跟读 + 词根助记'
    };
    const dayWords = getDayWords(state.vocabDay);
    const dayStats = getVocabStats(state.vocabDay);
    if (state.vocabReciteIdx >= dayWords.length) state.vocabReciteIdx = 0;

    let subBodyHTML = '';

    if (state.vocabSubMode === 'recite') {
      const w = dayWords[state.vocabReciteIdx] || dayWords[0];
      const beats = [
        { k: 'word', lbl: '01 读词' },
        { k: 'roots', lbl: '02 词根' },
        { k: 'meaning', lbl: '03 释义' },
        { k: 'sentence', lbl: '04 原句' }
      ];
      const sentEn = w?.realSentence?.en || (typeof w?.realSentence === 'string' ? w.realSentence : '');
      const sentZh = w?.realSentence?.zh || '';
      const sentSrc = w?.realSentence?.source || '';
      const collocs = Array.isArray(w?.collocations) ? w.collocations : [];

      subBodyHTML = w ? `
        <div class="m-walkman-stage">
          <div class="m-walkman-head">
            <span class="exam-tag ink">口袋带背 · ${String(state.vocabReciteIdx + 1).padStart(2, '0')}/${dayWords.length}</span>
            ${w.examFreq ? `<span class="exam-tag gold">复现 ${w.examFreq} 次</span>` : ''}
            <span class="exam-tag emerald">${escapeHTML(w.tag || '高频核心')}</span>
          </div>

          <div class="m-beat-stepper">
            ${beats.map(b => `<div class="m-beat-step ${state.vocabCurrentBeat === b.k ? 'active' : ''}" data-beat="${b.k}">${b.lbl}</div>`).join('')}
          </div>

          <div class="m-word-big">${escapeHTML(w.word)}</div>
          <div class="m-word-phonetic">
            ${escapeHTML(w.phonetic || '')}
            ${w.pos ? `<span style="margin-left:6px;color:var(--mint)">${escapeHTML(w.pos)}</span>` : ''}
          </div>
          <button type="button" class="m-pill-btn marigold" id="m-v-speak-one" style="margin-top:8px">
            ${ic('volume')}<span>单读发音</span>
          </button>

          <div class="m-word-meaning ${state.vocabCurrentBeat === 'meaning' ? 'beat-glow' : ''}">${escapeHTML(w.meaning || '')}</div>

          ${(w.roots || w.mnemonic) ? `
            <div class="m-word-box ${state.vocabCurrentBeat === 'roots' ? 'beat-glow' : ''}">
              <strong style="color:var(--primary)">词根巧记：</strong>
              ${escapeHTML([w.roots, w.mnemonic].filter(Boolean).join(' · '))}
            </div>` : ''}

          ${collocs.length ? `
            <div class="m-word-box">
              <strong style="color:var(--mint)">真题常考搭配：</strong>
              <div class="m-colloc-list">
                ${collocs.map(c => typeof c === 'string'
                  ? `<span class="m-colloc-chip">${escapeHTML(c)}</span>`
                  : `<span class="m-colloc-chip"><b>${escapeHTML(c.en)}</b> ${escapeHTML(c.zh || '')}</span>`).join('')}
              </div>
            </div>` : ''}

          ${sentEn ? `
            <div class="m-word-box ${state.vocabCurrentBeat === 'sentence' ? 'beat-glow' : ''}">
              <div style="display:flex;justify-content:space-between;gap:6px;margin-bottom:4px">
                <strong style="color:var(--text)">真题例句语境</strong>
                ${sentSrc ? `<span style="font-family:var(--font-code);font-size:10px;color:var(--text-muted)">${escapeHTML(sentSrc)}</span>` : ''}
              </div>
              <div class="en-serif" style="font-size:13.6px;color:var(--text);line-height:1.58">${formatSentenceHighlight(sentEn, w.word)}</div>
              ${sentZh ? `<div style="font-size:12px;color:var(--text-muted);margin-top:4px">${escapeHTML(sentZh)}</div>` : ''}
            </div>` : ''}

          <div class="m-audio-ctrl-bar">
            <button type="button" class="secondary-btn" id="m-v-prev" style="padding:10px 12px" aria-label="上一词">${ic('prev')}</button>
            <button type="button" class="m-play-fab ${state.vocabRecitePlaying ? 'playing' : ''}" id="m-v-recite-toggle">
              ${state.vocabRecitePlaying ? `${ic('pause')}<span>暂停带背</span>` : `${ic('play')}<span>开启免提带背</span>`}
            </button>
            <button type="button" class="secondary-btn" id="m-v-next" style="padding:10px 12px" aria-label="下一词">${ic('next')}</button>
          </div>

          <div class="m-speed-row">
            <div style="display:flex;gap:5px;align-items:center">
              <span style="font-family:var(--font-code);font-size:11px;font-weight:700;color:var(--text-muted)">语速</span>
              ${[0.8, 1.0, 1.15].map(sp => `<button type="button" class="m-pill-btn ${state.vocabRate === sp ? 'primary' : ''}" data-vrate="${sp}">${sp}x</button>`).join('')}
            </div>
            <div style="display:flex;gap:5px">
              <button type="button" class="m-pill-btn ${state.vocabRepeat === 2 ? 'marigold' : ''}" id="m-v-repeat">读${state.vocabRepeat}遍</button>
              <button type="button" class="m-pill-btn ${state.vocabIncludeZh ? 'accent' : ''}" id="m-v-zh">${state.vocabIncludeZh ? '含中文' : '纯英文'}</button>
            </div>
          </div>

          <div class="m-rate-grid">
            <button type="button" class="m-rate-btn unknown" data-quick-rate="unknown"><span>不认识 +3</span><small>马上重背</small></button>
            <button type="button" class="m-rate-btn fuzzy" data-quick-rate="fuzzy"><span>模糊 +7</span><small>稍后复现</small></button>
            <button type="button" class="m-rate-btn known" data-quick-rate="known"><span>已掌握</span><small>标记掌握</small></button>
          </div>
        </div>` : '<div class="salon-card">暂无词汇数据</div>';
    } else if (state.vocabSubMode === 'flashcard') {
      ensureFlashcardQueue(state.vocabDay, false);
      const cur = state.vocabQueue[0];
      if (!cur) {
        subBodyHTML = `
          <div class="m-walkman-stage">
            <img src="${getSpriteSrc('09_proud_streak')}" alt="通关" style="width:76px;height:76px;object-fit:contain;margin-bottom:6px">
            <div style="font-family:var(--font-serif);font-size:19px;font-weight:900;margin-bottom:6px">DAY ${state.vocabDay} 本轮刷词通关！</div>
            <div style="font-size:12.5px;color:var(--text-sec);margin-bottom:14px">全部高频词已完成主动回忆，可以再来一轮巩固或直接切入下一天词包。</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <button type="button" class="secondary-btn" id="m-fc-restart">重新刷本日词</button>
              <button type="button" class="submit-btn" id="m-fc-nextday">前往 DAY ${Math.min(12, state.vocabDay + 1)}</button>
            </div>
          </div>`;
      } else {
        const sentEn = cur.realSentence?.en || (typeof cur.realSentence === 'string' ? cur.realSentence : '');
        const sentZh = cur.realSentence?.zh || '';
        const collocs = Array.isArray(cur.collocations) ? cur.collocations : [];
        subBodyHTML = `
          <div class="m-deck-stack">
            <div class="m-flashcard ${state.vocabCardFlipped ? 'flipped' : ''}" id="m-fc-card">
              <div class="m-fc-face m-fc-front">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:12px">
                    <span class="exam-tag orange">剩余 ${state.vocabQueue.length} 词</span>
                    ${cur.examFreq ? `<span class="exam-tag gold">考频 ${cur.examFreq}</span>` : ''}
                    <button type="button" class="m-pill-btn marigold" id="m-fc-speak">${ic('volume')}<span>发音</span></button>
                  </div>
                  <div style="text-align:center;padding:24px 0 18px">
                    <div class="m-word-big">${escapeHTML(cur.word)}</div>
                    <div class="m-word-phonetic">${escapeHTML(cur.phonetic || '')} ${escapeHTML(cur.pos || '')}</div>
                  </div>
                  <div class="m-flip-hint">
                    先在脑中回想中文释义与搭配，轻点卡片向右翻页核对
                  </div>
                </div>
                <div style="font-family:var(--font-code);font-size:10.5px;font-weight:700;text-align:center;color:var(--text-muted);margin-top:10px">
                  轻点卡片任意处向右翻页核对
                </div>
              </div>

              <div class="m-fc-face m-fc-back">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:10px">
                    <span class="exam-tag orange">剩余 ${state.vocabQueue.length} 词</span>
                    ${cur.examFreq ? `<span class="exam-tag gold">考频 ${cur.examFreq}</span>` : ''}
                    <button type="button" class="m-pill-btn marigold" data-m-fc-speak="1">${ic('volume')}<span>发音</span></button>
                  </div>
                  <div style="text-align:center;padding:4px 0 8px">
                    <div class="m-word-big">${escapeHTML(cur.word)}</div>
                    <div class="m-word-phonetic">${escapeHTML(cur.phonetic || '')} ${escapeHTML(cur.pos || '')}</div>
                  </div>
                  <div class="m-word-meaning" style="text-align:center">${escapeHTML(cur.meaning || '')}</div>
                  ${(cur.roots || cur.mnemonic) ? `<div class="m-word-box"><strong>词根巧记：</strong>${escapeHTML([cur.roots, cur.mnemonic].filter(Boolean).join(' · '))}</div>` : ''}
                  ${collocs.length ? `<div class="m-word-box"><strong>常考搭配：</strong><div class="m-colloc-list">${collocs.map(c => typeof c === 'string' ? `<span class="m-colloc-chip">${escapeHTML(c)}</span>` : `<span class="m-colloc-chip"><b>${escapeHTML(c.en)}</b> ${escapeHTML(c.zh || '')}</span>`).join('')}</div></div>` : ''}
                  ${sentEn ? `<div class="m-word-box"><div class="en-serif" style="color:var(--text)">${formatSentenceHighlight(sentEn, cur.word)}</div>${sentZh ? `<div style="font-size:11.8px;color:var(--text-muted);margin-top:3px">${escapeHTML(sentZh)}</div>` : ''}</div>` : ''}
                  ${cur.confusable ? `<div class="trap-callout"><strong>易混辨析：</strong>${escapeHTML(cur.confusable.word || cur.confusable.pair || '')} — ${escapeHTML(cur.confusable.diff || '')}</div>` : ''}
                </div>
                <div style="font-family:var(--font-code);font-size:10.5px;font-weight:700;text-align:center;color:var(--text-muted);margin-top:10px">
                  选择下方按键 · 触发艾宾浩斯队列调度
                </div>
              </div>
            </div>
          </div>

          <div class="m-rate-grid">
            <button type="button" class="m-rate-btn unknown" data-fc-rate="unknown"><span>不认识 +3</span><small>马上重背</small></button>
            <button type="button" class="m-rate-btn fuzzy" data-fc-rate="fuzzy"><span>模糊 +7</span><small>稍后复现</small></button>
            <button type="button" class="m-rate-btn known" data-fc-rate="known"><span>已掌握</span><small>移出队列</small></button>
          </div>`;
      }
    } else if (state.vocabSubMode === 'blind') {
      if (!state.vocabBlindItem) state.vocabBlindItem = buildBlindQuizItem(dayWords);
      const bz = state.vocabBlindItem;
      const answered = bz && bz.pickedIdx !== null;
      subBodyHTML = bz ? `
        <div class="m-blind-stage">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px">
            <span class="exam-tag emerald">听音辨义 · 专治听力反应慢</span>
            <button type="button" class="m-pill-btn ${state.vocabBlindHideWord ? 'marigold' : ''}" id="m-blind-toggle">
              ${state.vocabBlindHideWord ? '纯盲听' : '显拼写'}
            </button>
          </div>

          <button type="button" class="m-ear-btn" id="m-blind-play" aria-label="播放单词读音">
            ${ic('volume')}
          </button>
          <div style="font-size:12px;font-weight:800;color:var(--text-muted);margin-bottom:10px">点击重听发音，选出对应中文释义</div>

          ${(!state.vocabBlindHideWord || answered) ? `
            <div style="margin-bottom:10px">
              <div class="m-word-big" style="font-size:24px">${escapeHTML(bz.word.word)}</div>
              <div class="m-word-phonetic">${escapeHTML(bz.word.phonetic || '')}</div>
            </div>` : ''}

          <div class="options-grid" style="text-align:left">
            ${bz.options.map((opt, idx) => {
              let cls = '';
              if (answered) {
                if (idx === bz.answerIdx) cls = 'correct';
                else if (idx === bz.pickedIdx) cls = 'wrong';
              }
              return `
                <button type="button" class="opt-btn ${cls}" data-blind-opt="${idx}" ${answered ? 'disabled' : ''}>
                  <span class="opt-key">${['A', 'B', 'C', 'D'][idx]}</span>
                  <span>${escapeHTML(opt)}</span>
                </button>`;
            }).join('')}
          </div>

          ${answered ? `
            <div class="m-word-box" style="margin-bottom:10px">
              <strong>${bz.pickedIdx === bz.answerIdx ? '听辨精准！' : '已记入模糊词复现：'}</strong>
              ${escapeHTML(bz.word.word)} ${escapeHTML(bz.word.phonetic || '')} — ${escapeHTML(bz.word.meaning || '')}
              ${bz.word.roots ? `<div style="margin-top:4px;color:var(--primary)">${escapeHTML(bz.word.roots)}</div>` : ''}
            </div>
            <button type="button" class="submit-btn" id="m-blind-next" style="width:100%">下一题听音速测</button>` : ''}
        </div>` : '<div class="salon-card">暂无听音词库</div>';
    } else {
      const list = CONFUSABLE_PAIRS;
      const curIdx = list.length ? ((state.vocabConfIdx % list.length) + list.length) % list.length : 0;
      const grp = list[curIdx];
      subBodyHTML = grp ? `
        <div class="salon-card double-frame">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
            <span class="exam-tag gold">PAIR ${String(curIdx + 1).padStart(2, '0')}/${list.length}</span>
            <span class="exam-tag orange">${escapeHTML((grp.group || []).join(' VS '))}</span>
          </div>
          <div class="m-conf-grid">
            ${(grp.items || []).map(it => `
              <div class="m-conf-item">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
                  <div>
                    <strong class="en-serif" style="font-size:17px;color:var(--text)">${escapeHTML(it.word)}</strong>
                    <span style="font-family:var(--font-code);font-size:11.5px;color:var(--primary);margin-left:5px">${escapeHTML(it.phonetic || '')} ${escapeHTML(it.pos || '')}</span>
                  </div>
                  <button type="button" class="m-pill-btn marigold" data-conf-speak="${escapeHTML(it.word)}" aria-label="发音">${ic('volume')}</button>
                </div>
                <div style="font-size:13px;font-weight:900;color:var(--text);margin-top:4px">${escapeHTML(it.meaning || '')}</div>
                ${it.tip ? `<div style="font-size:12px;font-weight:800;color:var(--mint);margin-top:3px">辨析：${escapeHTML(it.tip)}</div>` : ''}
                ${it.example ? `<div class="en-serif" style="font-size:12.2px;color:var(--text-sec);margin-top:4px">${escapeHTML(it.example)}</div>` : ''}
              </div>`).join('')}
          </div>

          ${grp.quiz ? `
            <div style="margin-top:12px;padding-top:11px;border-top:1px dashed var(--stitch)">
              <div style="font-size:12px;font-weight:800;color:var(--primary);margin-bottom:6px">真题易混微测</div>
              <div class="en-serif" style="font-size:13.8px;font-weight:700;margin-bottom:9px;color:var(--text)">${escapeHTML(grp.quiz.stem || '')}</div>
              <div class="options-grid">
                ${(grp.quiz.options || []).map((opt, idx) => {
                  let cls = '';
                  if (state.vocabConfPicked !== null) {
                    if (idx === Number(grp.quiz.answerIdx)) cls = 'correct';
                    else if (idx === state.vocabConfPicked) cls = 'wrong';
                  }
                  return `
                    <button type="button" class="opt-btn ${cls}" data-conf-opt="${idx}" ${state.vocabConfPicked !== null ? 'disabled' : ''}>
                      <span class="opt-key">${['A', 'B', 'C', 'D'][idx]}</span>
                      <span class="en-serif">${escapeHTML(opt)}</span>
                    </button>`;
                }).join('')}
              </div>
              ${state.vocabConfPicked !== null ? `<div class="trap-callout">${escapeHTML(grp.quiz.explain || '')}</div>` : ''}
            </div>` : ''}

          <div class="m-prac-pager" style="margin-top:12px">
            <button type="button" class="secondary-btn" id="m-conf-prev">${ic('prev')}<span>上一组</span></button>
            <button type="button" class="submit-btn" id="m-conf-next"><span>下一组易混词</span>${ic('next')}</button>
          </div>
        </div>` : '<div class="salon-card">暂无易混词数据</div>';
    }

    host.innerHTML = `
      <!-- Horizontal Day 1-12 Print Tickets -->
      <div class="m-hscroll" style="margin-bottom:6px">
        ${Array.from({ length: 12 }, (_, i) => i + 1).map(d => {
          const ds = getVocabStats(d);
          const allKnown = ds.total > 0 && ds.known >= ds.total;
          return `<button type="button" class="m-chip ${d === state.vocabDay ? 'active' : ''} ${allKnown ? 'done' : ''}" data-vday="${d}">D${String(d).padStart(2, '0')}${allKnown ? ' · 完' : ''}</button>`;
        }).join('')}
      </div>

      <!-- Compact Cotton-Paper Day Header -->
      <div class="m-vocab-day-banner">
        <div style="min-width:0;flex:1">
          <div style="font-family:var(--font-code);font-size:10.5px;color:var(--primary);font-weight:700">DAY ${String(state.vocabDay).padStart(2, '0')} · ${escapeHTML(dayInfo.theme || '')}</div>
          <div style="font-family:var(--font-serif);font-size:15.5px;font-weight:800;color:var(--text);margin-top:2px">${escapeHTML(dayInfo.title || '')}</div>
          <div style="font-size:11.5px;font-weight:600;color:var(--text-sec);margin-top:2px">${escapeHTML(dayInfo.focusTip || '')}</div>
        </div>
        <div class="m-vocab-day-pct">
          <div style="font-family:var(--font-code);font-size:18.5px;font-weight:800;line-height:1">${dayStats.pct}%</div>
          <div style="font-size:9.5px;font-weight:700;margin-top:3px">本日掌握</div>
        </div>
      </div>

      <!-- 3 Crisp Status Counters -->
      <div class="m-vocab-stats-row">
        <div class="m-vstat-pill"><div class="m-vstat-num" style="color:var(--mint)">${dayStats.known}</div><div class="m-vstat-lbl">已斩掌握</div></div>
        <div class="m-vstat-pill"><div class="m-vstat-num" style="color:var(--primary)">${dayStats.fuzzy}</div><div class="m-vstat-lbl">模糊复现</div></div>
        <div class="m-vstat-pill"><div class="m-vstat-num" style="color:var(--text)">${dayStats.unknown}</div><div class="m-vstat-lbl">未背新词</div></div>
      </div>

      <!-- Sharp 4-Mode Bar -->
      <div class="m-seg">
        <button type="button" class="m-seg-btn ${state.vocabSubMode === 'recite' ? 'active' : ''}" data-vmode="recite">语音带背</button>
        <button type="button" class="m-seg-btn ${state.vocabSubMode === 'flashcard' ? 'active' : ''}" data-vmode="flashcard">三态刷词</button>
        <button type="button" class="m-seg-btn ${state.vocabSubMode === 'blind' ? 'active' : ''}" data-vmode="blind">盲听选义</button>
        <button type="button" class="m-seg-btn ${state.vocabSubMode === 'confusable' ? 'active' : ''}" data-vmode="confusable">易混词</button>
      </div>

      ${subBodyHTML}
    `;

    const getVocabStageTarget = () => host.querySelector('#m-fc-card') || host.querySelector('.m-recite-card') || host.querySelector('.m-blind-stage') || host.querySelector('.m-seg + .salon-card');
    const curVocabPaper = state.vocabSubMode === 'flashcard' ? 'ruled' : 'grid';

    /* Bind Day Scroller & Sub-Mode Tabs */
    host.querySelectorAll('[data-vday]').forEach(btn => {
      btn.onclick = () => {
        stopAllAudioAndTimers();
        const nextDay = Number(btn.dataset.vday);
        if (nextDay === state.vocabDay) return;
        const dir = nextDay < state.vocabDay ? 'prev' : 'next';
        runMobileSnapTurn(getVocabStageTarget, () => {
          state.vocabDay = nextDay;
          state.vocabReciteIdx = 0;
          state.vocabQueueDay = null;
          state.vocabBlindItem = null;
          saveState();
          updateGlobalBadges();
          renderVocabView();
        }, dir, curVocabPaper, 480);
      };
    });

    host.querySelectorAll('[data-vmode]').forEach(btn => {
      btn.onclick = () => {
        stopAllAudioAndTimers();
        const nextMode = btn.dataset.vmode;
        if (nextMode === state.vocabSubMode) return;
        const pIdx = M_VMODE_ORDER.indexOf(state.vocabSubMode);
        const nIdx = M_VMODE_ORDER.indexOf(nextMode);
        const dir = (nIdx >= 0 && pIdx >= 0 && nIdx < pIdx) ? 'prev' : 'next';
        runMobileSnapTurn(getVocabStageTarget, () => {
          state.vocabSubMode = nextMode;
          if (state.vocabSubMode === 'blind') {
            state.vocabBlindItem = buildBlindQuizItem(dayWords);
          }
          renderVocabView();
        }, dir, nextMode === 'flashcard' ? 'ruled' : 'grid', 480);
        if (state.vocabSubMode === 'blind' && state.vocabBlindItem && window.Cet4Speech) {
          window.Cet4Speech.speakWord(state.vocabBlindItem.word.word, { rate: state.vocabRate });
        }
      };
    });

    /* Bind Recite Mode Events */
    if (state.vocabSubMode === 'recite') {
      const w = dayWords[state.vocabReciteIdx];
      document.getElementById('m-v-speak-one')?.addEventListener('click', () => {
        if (w && window.Cet4Speech) window.Cet4Speech.speakWord(w.word, { rate: state.vocabRate });
      });
      document.getElementById('m-v-prev')?.addEventListener('click', () => {
        stopAllAudioAndTimers();
        runMobileSnapTurn(() => host.querySelector('.m-recite-card') || getVocabStageTarget(), () => {
          state.vocabReciteIdx = (state.vocabReciteIdx - 1 + dayWords.length) % dayWords.length;
          state.vocabCurrentBeat = 'word';
          renderVocabView();
        }, 'prev', 'grid', 460);
      });
      document.getElementById('m-v-next')?.addEventListener('click', () => {
        stopAllAudioAndTimers();
        runMobileSnapTurn(() => host.querySelector('.m-recite-card') || getVocabStageTarget(), () => {
          state.vocabReciteIdx = (state.vocabReciteIdx + 1) % dayWords.length;
          state.vocabCurrentBeat = 'word';
          renderVocabView();
        }, 'next', 'grid', 460);
      });
      document.getElementById('m-v-recite-toggle')?.addEventListener('click', () => {
        if (state.vocabRecitePlaying) {
          stopAllAudioAndTimers();
          renderVocabView();
          return;
        }
        if (!window.Cet4Speech || typeof window.Cet4Speech.startVocabRecite !== 'function') return;
        state.vocabRecitePlaying = true;
        notifyXiaoKeVocab('recite_start', dayWords[state.vocabReciteIdx]);
        activeReciteCtrl = window.Cet4Speech.startVocabRecite(dayWords, {
          startIndex: state.vocabReciteIdx,
          rate: state.vocabRate,
          repeatWord: state.vocabRepeat,
          includeChinese: state.vocabIncludeZh,
          includeSentence: true,
          onWordChange: (idx) => {
            state.vocabReciteIdx = idx;
            state.vocabCurrentBeat = 'word';
            if (state.activeView === 'vocab' && state.vocabSubMode === 'recite') renderVocabView();
          },
          onBeat: (idx, beat) => {
            state.vocabReciteIdx = idx;
            state.vocabCurrentBeat = beat;
            if (state.activeView === 'vocab' && state.vocabSubMode === 'recite') {
              document.querySelectorAll('.m-beat-step').forEach(el => {
                el.classList.toggle('active', el.dataset.beat === beat);
              });
            }
          },
          onFinish: () => {
            state.vocabRecitePlaying = false;
            activeReciteCtrl = null;
            if (state.activeView === 'vocab') renderVocabView();
          },
          onStateChange: (st) => {
            state.vocabRecitePlaying = (st === 'playing');
          }
        });
        renderVocabView();
      });
      host.querySelectorAll('[data-vrate]').forEach(btn => {
        btn.onclick = () => {
          state.vocabRate = Number(btn.dataset.vrate);
          if (activeReciteCtrl && typeof activeReciteCtrl.setRate === 'function') activeReciteCtrl.setRate(state.vocabRate);
          renderVocabView();
        };
      });
      document.getElementById('m-v-repeat')?.addEventListener('click', () => {
        state.vocabRepeat = state.vocabRepeat === 2 ? 1 : 2;
        renderVocabView();
      });
      document.getElementById('m-v-zh')?.addEventListener('click', () => {
        state.vocabIncludeZh = !state.vocabIncludeZh;
        renderVocabView();
      });
      host.querySelectorAll('[data-quick-rate]').forEach(btn => {
        btn.onclick = (e) => {
          rateVocabWord(w, btn.dataset.quickRate, e);
          stopAllAudioAndTimers();
          state.vocabReciteIdx = (state.vocabReciteIdx + 1) % dayWords.length;
          state.vocabCurrentBeat = 'word';
          renderVocabView();
        };
      });
    } else if (state.vocabSubMode === 'flashcard') {
      const cur = state.vocabQueue[0];
      const mFcCard = document.getElementById('m-fc-card');
      if (mFcCard) {
        mFcCard.addEventListener('click', (e) => {
          if (e.target.closest('#m-fc-speak, [data-m-fc-speak]')) return;
          if (window.TechoPageTurn && typeof window.TechoPageTurn.cancelStageTurn === 'function') {
            window.TechoPageTurn.cancelStageTurn(mFcCard);
          }
          mFcCard.classList.toggle('flipped', Boolean(state.vocabCardFlipped));
          const frontEl = mFcCard.querySelector('.m-fc-front');
          const backEl = mFcCard.querySelector('.m-fc-back');
          const nextFlipped = !state.vocabCardFlipped;
          state.vocabCardFlipped = nextFlipped;
          if (window.TechoPageTurn && typeof window.TechoPageTurn.turnLayers === 'function' && frontEl && backEl) {
            window.TechoPageTurn.turnLayers(
              mFcCard,
              nextFlipped ? frontEl : backEl,
              nextFlipped ? backEl : frontEl,
              {
                dir: nextFlipped ? 'next' : 'prev',
                mode: 'card',
                paperStyle: 'ruled',
                duration: 460,
                onComplete: () => {
                  mFcCard.classList.toggle('flipped', state.vocabCardFlipped);
                }
              }
            );
          } else {
            mFcCard.classList.toggle('flipped', nextFlipped);
          }
        });
      }
      document.getElementById('m-fc-speak')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (cur && window.Cet4Speech) window.Cet4Speech.speakWord(cur.word, { rate: state.vocabRate });
      });
      host.querySelectorAll('[data-m-fc-speak]').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          if (cur && window.Cet4Speech) window.Cet4Speech.speakWord(cur.word, { rate: state.vocabRate });
        };
      });
      host.querySelectorAll('[data-fc-rate]').forEach(btn => {
        btn.onclick = (e) => {
          runMobileSnapTurn(
            () => document.querySelector('#m-view-vocab .m-deck-stack') || document.getElementById('m-fc-card'),
            () => {
              rateVocabWord(cur, btn.dataset.fcRate, e);
              renderVocabView();
            },
            'next',
            'ruled',
            440
          );
        };
      });
      document.getElementById('m-fc-restart')?.addEventListener('click', () => {
        state.vocabQueue = dayWords.slice();
        state.vocabCardFlipped = false;
        renderVocabView();
      });
      document.getElementById('m-fc-nextday')?.addEventListener('click', () => {
        state.vocabDay = Math.min(12, state.vocabDay + 1);
        state.vocabQueueDay = null;
        saveState();
        updateGlobalBadges();
        renderVocabView();
      });
    } else if (state.vocabSubMode === 'blind') {
      const bz = state.vocabBlindItem;
      document.getElementById('m-blind-toggle')?.addEventListener('click', () => {
        state.vocabBlindHideWord = !state.vocabBlindHideWord;
        renderVocabView();
      });
      document.getElementById('m-blind-play')?.addEventListener('click', () => {
        if (bz && window.Cet4Speech) window.Cet4Speech.speakWord(bz.word.word, { rate: state.vocabRate });
      });
      host.querySelectorAll('[data-blind-opt]').forEach(btn => {
        btn.onclick = (e) => {
          if (!bz || bz.pickedIdx !== null) return;
          bz.pickedIdx = Number(btn.dataset.blindOpt);
          const ok = bz.pickedIdx === bz.answerIdx;
          rateVocabWord(bz.word, ok ? 'known' : 'unknown', e);
          renderVocabView();
        };
      });
      document.getElementById('m-blind-next')?.addEventListener('click', () => {
        runMobileSnapTurn(getVocabStageTarget, () => {
          state.vocabBlindItem = buildBlindQuizItem(dayWords);
          renderVocabView();
        }, 'next', 'grid', 460);
        if (state.vocabBlindItem && window.Cet4Speech) {
          window.Cet4Speech.speakWord(state.vocabBlindItem.word.word, { rate: state.vocabRate });
        }
      });
    } else {
      host.querySelectorAll('[data-conf-speak]').forEach(btn => {
        btn.onclick = () => {
          if (window.Cet4Speech) window.Cet4Speech.speakWord(btn.dataset.confSpeak, { rate: state.vocabRate });
        };
      });
      host.querySelectorAll('[data-conf-opt]').forEach(btn => {
        btn.onclick = (e) => {
          const grp = CONFUSABLE_PAIRS[state.vocabConfIdx % Math.max(1, CONFUSABLE_PAIRS.length)];
          state.vocabConfPicked = Number(btn.dataset.confOpt);
          if (grp?.quiz && state.vocabConfPicked === Number(grp.quiz.answerIdx)) {
            FireworksFX.launch(1.1, { x: e.clientX, y: e.clientY });
          }
          renderVocabView();
        };
      });
      document.getElementById('m-conf-prev')?.addEventListener('click', () => {
        runMobileSnapTurn(getVocabStageTarget, () => {
          state.vocabConfIdx = (state.vocabConfIdx - 1 + CONFUSABLE_PAIRS.length) % Math.max(1, CONFUSABLE_PAIRS.length);
          state.vocabConfPicked = null;
          renderVocabView();
        }, 'prev', 'grid', 460);
      });
      document.getElementById('m-conf-next')?.addEventListener('click', () => {
        runMobileSnapTurn(getVocabStageTarget, () => {
          state.vocabConfIdx = (state.vocabConfIdx + 1) % Math.max(1, CONFUSABLE_PAIRS.length);
          state.vocabConfPicked = null;
          renderVocabView();
        }, 'next', 'grid', 460);
      });
    }

    syncXiaoKeContext();
  }

  /* ==================== VIEW 3: 6-SKILL ADAPTIVE PRACTICE ==================== */
  function startPracticeScope(skillKey) {
    stopAllAudioAndTimers();
    state.practiceMode = 'adaptive';
    state.practiceSkill = skillKey || 'all';
    state.practiceHistory = [];
    state.practiceIdx = 0;
    state.curveLevel = 1.5;
    drawNextPracticeItem();
  }

  function drawNextPracticeItem() {
    const pool = state.practiceSkill === 'all'
      ? QUESTION_BANK
      : QUESTION_BANK.filter(q => normSkill(q.skill || q.type) === state.practiceSkill);
    const activePool = pool.length ? pool : QUESTION_BANK;
    if (!activePool.length) return null;

    const recentIds = new Set(state.practiceHistory.slice(-10).map(h => h.qId));
    let candidates = activePool.filter(q => !recentIds.has(q.id));
    if (!candidates.length) candidates = activePool;

    const targetDiff = Math.max(1, Math.min(3, Math.round(state.curveLevel)));
    const weighted = candidates.map(q => {
      const qDiff = Number(q.difficulty) || 2;
      const dist = Math.abs(qDiff - targetDiff);
      let w = dist === 0 ? 5 : (dist === 1 ? 2.5 : 1);
      const ans = state.answers[q.id];
      if (!ans || !ans.correct) w *= 1.5;
      return { q, w };
    });
    let r = Math.random() * weighted.reduce((s, x) => s + x.w, 0);
    let chosen = weighted[weighted.length - 1].q;
    for (let i = 0; i < weighted.length; i++) {
      r -= weighted[i].w;
      if (r <= 0) { chosen = weighted[i].q; break; }
    }

    state.practiceSeq++;
    const sk = normSkill(chosen.skill || chosen.type);
    const inst = {
      uid: `cp_${state.practiceSeq}`,
      qId: chosen.id,
      skill: sk,
      diffLv: Number(chosen.difficulty) || 2,
      ans: null,
      draftVal: sk === 'cloze' ? {} : '',
      peekExplain: false,
      reviewTab: 'explain',
      kpOpen: false,
      preReadDone: false,
      preReadLeft: 15,
      listenRate: 1.0,
      listenPlaying: false,
      activeTurnIdx: -1,
      activeClozeBlank: null,
      matchOpenParas: {}
    };
    state.practiceHistory.push(inst);
    return inst;
  }

  function normalizeOptionLetter(ans) {
    if (typeof ans === 'number') return ['A', 'B', 'C', 'D'][ans] || 'A';
    return String(ans || 'A').trim().toUpperCase().slice(0, 1);
  }

  function evaluateCet4Question(q, userVal) {
    const sk = normSkill(q.skill || q.type);
    const G = window.Cet4Grader;

    if (sk === 'listening' || sk === 'reading' || sk === 'matching') {
      const chosen = String(userVal || '').trim().toUpperCase();
      const target = String(q.answer || '').trim().toUpperCase();
      if (G && typeof G.gradeObjective === 'function') {
        const rep = G.gradeObjective(q, chosen);
        return { correct: !!rep.correct, evalReport: rep, score: rep.score };
      }
      const ok = chosen === target;
      return { correct: ok, evalReport: null, score: ok ? 1 : 0 };
    }

    if (sk === 'cloze') {
      const map = userVal && typeof userVal === 'object' ? userVal : {};
      if (G && typeof G.gradeCloze === 'function') {
        const rep = G.gradeCloze(q, map);
        return { correct: !!rep.passed, evalReport: rep, score: rep.score };
      }
      const blanks = q.blanks || [];
      let hit = 0;
      const perBlank = blanks.map(b => {
        const u = String(map[b.num] || '').toUpperCase();
        const ok = u === String(b.answer || '').toUpperCase();
        if (ok) hit++;
        return { num: b.num, user: u, answer: b.answer, correct: ok };
      });
      const passed = blanks.length ? (hit / blanks.length) >= 0.6 : false;
      return { correct: passed, evalReport: { score: hit, maxScore: blanks.length, correctCount: hit, totalCount: blanks.length, passed, perBlank }, score: hit };
    }

    if (sk === 'translation') {
      if (G && typeof G.gradeTranslation === 'function') {
        const rep = G.gradeTranslation(q, String(userVal || ''));
        return { correct: !!rep.passed, evalReport: rep, score: rep.score };
      }
      const len = String(userVal || '').trim().split(/\s+/).filter(Boolean).length;
      const ok = len >= 12;
      return { correct: ok, evalReport: { score: ok ? 10 : 5, pct: ok ? 67 : 33, passed: ok, feedback: '已提交参考评分。' }, score: ok ? 10 : 5 };
    }

    if (sk === 'writing') {
      if (G && typeof G.gradeWriting === 'function') {
        const rep = G.gradeWriting(q, String(userVal || ''));
        return { correct: !!rep.passed, evalReport: rep, score: rep.score };
      }
      const wc = String(userVal || '').trim().split(/\s+/).filter(Boolean).length;
      const ok = wc >= 90;
      return { correct: ok, evalReport: { score: ok ? 10 : 5, pct: ok ? 67 : 33, passed: ok, wordCount: wc, feedback: '已提交参考评分。' }, score: ok ? 10 : 5 };
    }

    return { correct: false, evalReport: null, score: 0 };
  }

  function highlightTermsHTML(text, terms) {
    let out = escapeHTML(text || '');
    (terms || []).filter(Boolean).forEach(t => {
      const esc = String(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      try {
        out = out.replace(new RegExp(`(${esc})`, 'gi'), '<span class="m-sig-hl">$1</span>');
      } catch (_e) {}
    });
    return out;
  }

  function buildExplainCardHTML(q, saved) {
    const det = EXPLAIN_DETAILS[q.id] || null;
    const sk = normSkill(q.skill || q.type);
    const sum = TOPIC_SUMMARIES[skillTopicKey(sk)] || null;
    const ev = saved && saved.evalReport ? saved.evalReport : null;

    let gradeHTML = '';
    if (ev && (sk === 'translation' || sk === 'writing')) {
      const dims = ev.dimensions || null;
      gradeHTML = `
        <div class="ai-grade-card">
          <div class="ai-grade-head">
            <strong style="font-family:var(--font-serif);font-size:13.2px">${sk === 'writing' ? '写作四维批改批注' : '汉译英智能评分批注'}</strong>
            <span class="ai-score-pill ${ev.passed ? 'pass' : 'fail'}">${ev.score}/15 分 ${ev.bandLabel ? `· ${escapeHTML(ev.bandLabel)}` : ''}</span>
          </div>
          ${ev.feedback ? `<div style="font-size:12.5px;color:var(--text-sec);margin-bottom:6px">${escapeHTML(ev.feedback)}</div>` : ''}
          ${dims ? `
            <div class="ai-dim-grid">
              ${Object.entries(dims).map(([k, v]) => {
                const lblMap = { content: '切题内容', structure: '三段结构', language: '语言表达', length: '词数达标' };
                const scoreTxt = typeof v === 'object' ? `${v.score}/${v.max || 4}` : String(v);
                return `<div class="ai-dim-item"><span>${lblMap[k] || k}</span><span style="font-family:var(--font-code);color:var(--primary)">${escapeHTML(scoreTxt)}</span></div>`;
              }).join('')}
            </div>` : ''}
          ${Array.isArray(ev.matchedExprs) && ev.matchedExprs.length ? `
            <div style="margin-top:6px;font-size:12px">
              <strong style="color:var(--mint)">命中采分表达：</strong>
              ${ev.matchedExprs.map(x => `<span class="exam-tag ok" style="margin:2px">${escapeHTML(typeof x === 'string' ? x : (x.zh || x.en || ''))}</span>`).join('')}
            </div>` : ''}
          ${Array.isArray(ev.missedExprs) && ev.missedExprs.length ? `
            <div style="margin-top:6px;font-size:12px">
              <strong style="color:var(--coral)">建议补全表达：</strong>
              ${ev.missedExprs.map(x => `<span class="exam-tag bad" style="margin:2px">${escapeHTML(typeof x === 'string' ? x : `${x.zh || ''}${x.en ? ` (${Array.isArray(x.en) ? x.en[0] : x.en})` : ''}`)}</span>`).join('')}
            </div>` : ''}
          ${Array.isArray(ev.suggestions) && ev.suggestions.length ? `
            <ul class="kp-rich" style="margin-top:6px;font-size:12px">
              ${ev.suggestions.map(s => `<li>${escapeHTML(s)}</li>`).join('')}
            </ul>` : ''}
        </div>`;
    } else if (ev && sk === 'cloze' && Array.isArray(ev.perBlank)) {
      gradeHTML = `
        <div class="ai-grade-card">
          <div class="ai-grade-head">
            <strong style="font-size:13px">选词填空逐空精析（含词性与排雷）</strong>
            <span class="ai-score-pill ${ev.passed ? 'pass' : 'fail'}">${ev.correctCount}/${ev.totalCount} 正确</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:7px">
            ${ev.perBlank.map(b => {
              const wb = (q.wordBank || []).find(w => w.code === b.answer);
              const bd = det?.blankDetails?.[String(b.num)] || null;
              return `
                <div class="m-word-box" style="margin-top:0;border-color:${b.correct ? 'var(--mint-border)' : 'var(--coral-border)'}">
                  <div>
                    <span class="exam-tag ${b.correct ? 'ok' : 'bad'}">空${b.num}: ${escapeHTML(b.answer)}${wb ? ` ${escapeHTML(wb.word)} (${escapeHTML(wb.pos || '')})` : ''}${!b.correct ? ` [你选:${escapeHTML(b.user || '空')}]` : ''}</span>
                  </div>
                  ${b.explain ? `<div style="margin-top:4px;color:var(--text)">${escapeHTML(b.explain)}</div>` : ''}
                  ${bd?.sentenceZh ? `<div style="margin-top:3px"><strong>句意：</strong>${escapeHTML(bd.sentenceZh)}</div>` : ''}
                  ${bd?.posRule ? `<div style="margin-top:2px"><strong>词性锁定：</strong>${escapeHTML(bd.posRule)}</div>` : ''}
                  ${bd?.distractorExclude ? `<div style="margin-top:2px"><strong>干扰排除：</strong>${escapeHTML(bd.distractorExclude)}</div>` : ''}
                  ${bd?.wordUsage ? `<div style="margin-top:2px;color:var(--mint)"><strong>搭配考点：</strong>${escapeHTML(bd.wordUsage)}</div>` : ''}
                </div>`;
            }).join('')}
          </div>
        </div>`;
    }

    const extraSkillRefHTML = (() => {
      if (sk === 'listening' && (q.evidenceQuote || q.paraphraseBridge)) {
        return `
          <div class="m-word-box">
            ${q.evidenceQuote ? `<div><strong style="color:var(--primary)">定位原文：</strong><span class="en-serif">${escapeHTML(q.evidenceQuote)}</span></div>` : ''}
            ${q.paraphraseBridge ? `<div style="margin-top:4px"><strong style="color:var(--mint)">同义替换桥：</strong>${escapeHTML(q.paraphraseBridge)}</div>` : ''}
          </div>`;
      }
      if (sk === 'reading' && (q.evidenceSentence || q.trapType)) {
        return `
          <div class="m-word-box">
            ${q.trapType ? `<div style="margin-bottom:4px"><span class="exam-tag bad">干扰项类型：${escapeHTML(q.trapType)}</span></div>` : ''}
            ${q.evidenceSentence ? `<div><strong style="color:var(--primary)">原文铁证：</strong><span class="en-serif">${escapeHTML(q.evidenceSentence)}</span></div>` : ''}
          </div>`;
      }
      if (sk === 'translation') {
        return `
          ${q.referenceTranslation ? `<div class="m-word-box"><strong style="color:var(--mint)">高分参考译文：</strong><div class="en-serif" style="margin-top:4px;color:var(--text)">${escapeHTML(q.referenceTranslation)}</div></div>` : ''}
          ${Array.isArray(q.sentenceBreakdown) && q.sentenceBreakdown.length ? `
            <div class="m-word-box">
              <strong style="color:var(--primary)">逐句拆解重组：</strong>
              ${q.sentenceBreakdown.map((sb, i) => `
                <div style="margin-top:6px;padding-top:6px;${i > 0 ? 'border-top:1px dashed var(--stitch)' : ''}">
                  <div style="font-weight:800;color:var(--text)">${escapeHTML(sb.zh || '')}</div>
                  <div style="font-size:11.5px;font-weight:700;color:var(--mint)">主干：${escapeHTML(sb.core || '')} | 修饰：${escapeHTML(sb.modifier || '')}</div>
                  <div class="en-serif" style="color:var(--text);margin-top:2px">${escapeHTML(sb.en || '')}</div>
                </div>`).join('')}
            </div>` : ''}`;
      }
      if (sk === 'writing') {
        return `
          ${q.modelEssay ? `<div class="m-word-box"><strong style="color:var(--mint)">高分范文参考：</strong><div class="en-serif" style="margin-top:5px;white-space:pre-line;color:var(--text)">${escapeHTML(q.modelEssay)}</div></div>` : ''}
          ${Array.isArray(q.sentenceDissection) && q.sentenceDissection.length ? `
            <div class="m-word-box">
              <strong style="color:var(--primary)">高分短句拆解：</strong>
              ${q.sentenceDissection.map(sd => `
                <div style="margin-top:6px">
                  <div class="en-serif" style="color:var(--text);font-weight:700">${escapeHTML(sd.en || '')}</div>
                  <div style="font-size:11.5px;color:var(--text-muted)">${escapeHTML(sd.zh || '')}${sd.highlight ? ` · 亮点：${escapeHTML(sd.highlight)}` : ''}</div>
                </div>`).join('')}
            </div>` : ''}`;
      }
      return '';
    })();

    return `
      <div class="explain-detail-card">
        <div class="ex-detail-head">
          <span class="exam-tag orange">深度分步解析</span>
          <span style="font-size:11.5px;font-weight:900;color:${saved?.checked ? (saved.correct ? 'var(--mint)' : 'var(--coral)') : 'var(--text-muted)'}">
            ${saved?.checked ? (saved.correct ? '已答对 · 熟练度上升' : '答错已入错题手账') : '思路参考'}
          </span>
        </div>

        ${gradeHTML}
        ${extraSkillRefHTML}

        ${det ? `
          ${(det.stemZh || det.evidenceZh) ? `
            <div class="m-ex-zh-card">
              ${det.stemZh ? `<div><strong>题干/任务译文：</strong>${escapeHTML(det.stemZh)}</div>` : ''}
              ${det.evidenceQuote && !q.evidenceQuote && !q.evidenceSentence ? `<div class="en-serif" style="margin-top:4px"><strong>原文依据：</strong>${escapeHTML(det.evidenceQuote)}</div>` : ''}
              ${det.evidenceZh ? `<div style="margin-top:4px;color:var(--text-sec)"><strong>依据精译：</strong>${escapeHTML(det.evidenceZh)}</div>` : ''}
            </div>` : ''}
          <div style="margin-top:8px">
            <span class="ex-sec-tag why">核心破题点</span>
            <p style="font-size:13px;color:var(--text-sec);line-height:1.6;margin-bottom:9px">${escapeHTML(det.why || '')}</p>
            ${Array.isArray(det.optionBreakdown) && det.optionBreakdown.length ? `
              <span class="ex-sec-tag steps">A / B / C / D 逐项精析与排雷</span>
              <div class="m-ex-opt-list">
                ${det.optionBreakdown.map(ob => {
                  const ok = ob.verdict === 'correct';
                  return `
                    <div class="m-ex-opt-row ${ok ? 'ok' : ''}">
                      <div><span class="m-ex-opt-badge">${escapeHTML(ob.key)} · ${ok ? '正解' : '干扰'}</span><strong>${escapeHTML(ob.zh || '')}</strong></div>
                      <div style="color:var(--text-sec);margin-top:2px">${escapeHTML(ob.reason || '')}</div>
                    </div>`;
                }).join('')}
              </div>` : ''}
            ${Array.isArray(det.paraphraseMap) && det.paraphraseMap.length ? `
              <span class="ex-sec-tag why">同义改写对照桥</span>
              <div style="margin-bottom:8px">
                ${det.paraphraseMap.map(pm => `
                  <div class="m-ex-bridge-item">
                    <span class="en-serif" style="color:var(--mint);font-weight:700">${escapeHTML(pm.from || '')}</span> → <span class="en-serif" style="color:var(--mint);font-weight:700">${escapeHTML(pm.to || '')}</span>
                    ${pm.note ? `<div style="color:var(--text-sec);margin-top:2px">${escapeHTML(pm.note)}</div>` : ''}
                  </div>`).join('')}
              </div>` : ''}
            ${det.posNote ? `<div class="m-ex-pos-box"><strong>词性与语法提示：</strong>${escapeHTML(det.posNote)}</div>` : ''}
            <span class="ex-sec-tag steps">逐步破题</span>
            <ol class="ex-step-list">
              ${(det.steps || []).map((st, idx) => `<li class="ex-step-item"><span class="ex-step-num">${idx + 1}</span><span>${escapeHTML(st)}</span></li>`).join('')}
            </ol>
            <div class="ex-pitfall-box">
              <span class="ex-sec-tag pitfall">考场避坑</span>
              <span>${escapeHTML(det.pitfall || '')}</span>
            </div>
            ${Array.isArray(det.vocabHighlights) && det.vocabHighlights.length ? `
              <div class="m-colloc-list" style="margin-top:8px">
                ${det.vocabHighlights.map(v => `<span class="m-colloc-chip"><b>${escapeHTML(v.word)}</b> ${escapeHTML(v.meaning || '')}</span>`).join('')}
              </div>` : ''}
          </div>` : ''}

        ${sum ? `
          <div style="margin-top:10px;padding-top:9px;border-top:1px dashed var(--stitch)">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px">
              <strong style="font-size:12px;color:var(--text)">${escapeHTML(sum.title || '题型速记')}</strong>
              <button type="button" class="m-pill-btn marigold" data-open-sum="${escapeHTML(sk)}">完整速记卡</button>
            </div>
            <div class="formula-box" style="margin:0;font-size:12px">${escapeHTML(sum.formula || '')}</div>
          </div>` : ''}
      </div>`;
  }

  function renderClozePassageHTML(q, userMap, isLocked, activeBlankNum) {
    let raw = String(q.passageHtml || '');
    const wbByCode = Object.fromEntries((q.wordBank || []).map(w => [String(w.code).toUpperCase(), w]));
    const blankByNum = Object.fromEntries((q.blanks || []).map(b => [String(b.num), b]));

    const replaceToken = (_match, numStr) => {
      const num = String(numStr).trim();
      const picked = String(userMap[num] || '').toUpperCase();
      const wb = picked ? wbByCode[picked] : null;
      const spec = blankByNum[num];
      let cls = '';
      if (isLocked && spec) {
        cls = picked === String(spec.answer || '').toUpperCase() ? 'ok' : 'bad';
      } else if (Number(activeBlankNum) === Number(num)) {
        cls = 'active-slot';
      } else if (picked) {
        cls = 'filled';
      }
      const label = picked ? `${num}.${picked}${wb ? ` ${wb.word}` : ''}` : `空${num}`;
      return `<button type="button" class="cloze-slot ${cls}" data-cloze-slot="${escapeHTML(num)}" ${isLocked ? 'disabled' : ''}>${escapeHTML(label)}</button>`;
    };

    raw = raw.replace(/\{\{\s*(\d+)\s*\}\}/g, replaceToken);
    raw = raw.replace(/\[\s*(\d+)\s*\]/g, replaceToken);
    raw = raw.replace(/_{2,}\s*(\d+)\s*_{2,}/g, replaceToken);
    return raw;
  }

  function openClozeBankSheet(q, inst, onUpdate) {
    const userMap = (inst.draftVal && typeof inst.draftVal === 'object') ? inst.draftVal : {};
    const curBlank = inst.activeClozeBlank || (q.blanks && q.blanks[0]?.num) || 1;
    const blankSpec = (q.blanks || []).find(b => Number(b.num) === Number(curBlank));
    const usedCodes = new Set(Object.values(userMap).map(v => String(v || '').toUpperCase()).filter(Boolean));
    const curVal = String(userMap[curBlank] || '').toUpperCase();

    const html = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px">
        <span class="exam-tag orange">第 ${curBlank} 空${blankSpec?.posHint ? `（词性：${escapeHTML(blankSpec.posHint)}）` : ''}</span>
        <button type="button" class="m-pill-btn" id="m-cloze-clear">清空此空</button>
      </div>
      <div class="m-wordbank-grid">
        ${(q.wordBank || []).map(w => {
          const code = String(w.code || '').toUpperCase();
          const isSel = code === curVal;
          const isUsed = usedCodes.has(code) && !isSel;
          return `
            <button type="button" class="m-wb-tile ${isSel ? 'selected' : ''} ${isUsed ? 'used' : ''}" data-wb-pick="${escapeHTML(code)}">
              <span class="m-wb-code">${escapeHTML(code)}</span>
              <span class="m-wb-word">${escapeHTML(w.word)}</span>
            </button>`;
        }).join('')}
      </div>`;

    openBottomSheet(`A–O 选词托盘 · 填入第 ${curBlank} 空`, html, (bodyEl) => {
      bodyEl.querySelectorAll('[data-wb-pick]').forEach(btn => {
        btn.onclick = () => {
          const code = btn.dataset.wbPick;
          if (!inst.draftVal || typeof inst.draftVal !== 'object') inst.draftVal = {};
          inst.draftVal[curBlank] = code;
          const nextEmpty = (q.blanks || []).find(b => !inst.draftVal[b.num]);
          inst.activeClozeBlank = nextEmpty ? nextEmpty.num : null;
          closeBottomSheet();
          if (onUpdate) onUpdate();
        };
      });
      document.getElementById('m-cloze-clear')?.addEventListener('click', () => {
        if (inst.draftVal && typeof inst.draftVal === 'object') delete inst.draftVal[curBlank];
        closeBottomSheet();
        if (onUpdate) onUpdate();
      });
    });
  }

  function renderQuestionCardHTML(q, displayIdx, opts) {
    const inst = opts.instance || null;
    const saved = inst ? inst.ans : (state.answers[q.id] || null);
    const isLocked = !!(opts.lockAfterAnswer && saved && saved.checked);
    const sk = normSkill(q.skill || q.type);
    const isFav = !!state.favorites[q.id];
    const cardCls = saved && saved.checked ? (saved.correct ? 'is-correct' : 'is-wrong') : '';
    const showExplain = !!(saved?.checked || inst?.peekExplain);

    let bodyHTML = '';

    if (sk === 'listening') {
      const showTranscript = !!(saved?.checked || inst?.peekExplain);
      const turns = Array.isArray(q.scriptTurns) ? q.scriptTurns : [];
      const curTurn = inst ? inst.activeTurnIdx : -1;
      const preReadLeft = inst ? inst.preReadLeft : 0;
      const preReadDone = inst ? inst.preReadDone : true;
      bodyHTML += `
        <div class="m-listen-box">
          <div class="m-cassette-head">
            <span>随身听力手账台 · CET-4</span>
            <span>${turns.length} 句对话</span>
          </div>
          ${q.preReadCue ? `<div style="font-size:12px;font-weight:700;color:var(--mint);margin-bottom:7px">未听先知提示：${escapeHTML(q.preReadCue)}</div>` : ''}
          ${(!preReadDone && !isLocked && inst) ? `
            <div class="m-preread-bar" id="m-preread-bar">
              <span>${ic('clock')} 选项预读倒计时：<b id="m-preread-sec">${preReadLeft}s</b></span>
              <button type="button" class="m-pill-btn ink" data-skip-preread>跳过播音</button>
            </div>` : ''}
          <div class="m-audio-row">
            <button type="button" class="ctrl-btn primary" data-listen-play>
              ${inst?.listenPlaying ? `${ic('pause')}<span>暂停</span>` : `${ic('play')}<span>${curTurn >= 0 ? '重播听力' : '播放听力'}</span>`}
            </button>
            <div class="m-audio-status" data-listen-status>
              ${inst?.listenPlaying ? `第 ${curTurn + 1}/${turns.length} 句` : `离线语音 · ${turns.length} 句`}
            </div>
            <div style="display:flex;gap:4px">
              ${[0.85, 1.0, 1.15].map(r => `<button type="button" class="m-pill-btn ${(inst?.listenRate || 1.0) === r ? 'marigold' : ''}" data-lrate="${r}">${r}x</button>`).join('')}
            </div>
          </div>
          ${showTranscript && turns.length ? `
            <div class="m-transcript-box">
              <div style="font-family:var(--font-code);font-size:11px;font-weight:700;color:var(--primary)">听力原文 · 信号词荧光笔标注</div>
              ${turns.map((t, idx) => `
                <div class="m-turn-line ${t.isEvidence ? 'evidence' : ''} ${idx === curTurn ? 'speaking' : ''}" data-turn-idx="${idx}">
                  <span class="m-speaker-stamp">${escapeHTML(t.speaker || 'NAR')}</span>
                  ${highlightTermsHTML(t.text, t.signalWords)}
                </div>`).join('')}
            </div>` : ''}
        </div>
        ${q.questionText ? `<div class="q-stem en-serif">${escapeHTML(q.questionText)}</div>` : ''}
        <div class="options-grid">
          ${(q.options || []).map((opt, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx] || String(idx + 1);
            const cleanOpt = String(opt).replace(/^[A-D]\s*[\.\)、]\s*/i, '');
            const target = normalizeOptionLetter(q.answer);
            const userLetter = saved?.userVal ? normalizeOptionLetter(saved.userVal) : '';
            let cls = '';
            if (saved && saved.checked) {
              if (letter === target) cls = 'correct';
              else if (letter === userLetter) cls = 'wrong';
            }
            return `
              <button type="button" class="opt-btn ${cls}" data-opt-letter="${letter}" ${isLocked ? 'disabled' : ''}>
                <span class="opt-key">${letter}</span>
                <span class="en-serif">${escapeHTML(cleanOpt)}</span>
              </button>`;
          }).join('')}
        </div>`;
    } else if (sk === 'cloze') {
      const userMap = (saved && saved.checked && saved.userVal) ? saved.userVal : ((inst && inst.draftVal && typeof inst.draftVal === 'object') ? inst.draftVal : {});
      const filledCount = (q.blanks || []).filter(b => userMap[b.num]).length;
      bodyHTML += `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap">
          <span class="exam-tag emerald">轻点空位呼出 A–O 选词托盘</span>
          <span class="exam-tag orange">已填 ${filledCount}/${(q.blanks || []).length} 空</span>
        </div>
        <div class="m-passage-box" style="max-height:340px">
          ${renderClozePassageHTML(q, userMap, isLocked, inst?.activeClozeBlank)}
        </div>
        ${!isLocked ? `
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">
            ${(q.blanks || []).map(b => `
              <button type="button" class="m-pill-btn ${userMap[b.num] ? 'accent' : 'marigold'}" data-cloze-slot="${b.num}">
                空${b.num}: ${escapeHTML(userMap[b.num] || '选词')}
              </button>`).join('')}
          </div>` : ''}`;
    } else if (sk === 'matching') {
      const paras = Array.isArray(q.paragraphs) ? q.paragraphs : [];
      const openMap = (inst && inst.matchOpenParas) ? inst.matchOpenParas : {};
      const targetAns = String(q.answer || '').trim().toUpperCase();
      const userAns = saved?.userVal ? String(saved.userVal).trim().toUpperCase() : '';
      const anyOpen = paras.some((p, idx) => {
        const lbl = String(p.label || String.fromCharCode(65 + idx)).toUpperCase();
        return (saved?.checked && lbl === targetAns) || (openMap[lbl] !== undefined ? openMap[lbl] : true);
      });
      bodyHTML += `
        <div class="m-word-box" style="background:var(--bg-sticky);border-color:var(--marigold-border);margin-top:0;margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:3px">
            <span style="font-size:11px;font-weight:800;color:var(--primary)">待匹配陈述句（先抓专有名词 / 数字定位锚点）</span>
            ${saved?.checked ? `<button type="button" class="m-pill-btn marigold" data-m-jump-para="${escapeHTML(targetAns)}">定位 ${escapeHTML(targetAns)}段</button>` : ''}
          </div>
          <div class="en-serif" style="font-size:14px;font-weight:700;color:var(--text)">${escapeHTML(q.statement || '')}</div>
          ${saved?.checked && Array.isArray(q.anchorKeywords) && q.anchorKeywords.length ? `
            <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:5px">
              ${q.anchorKeywords.map(k => `<span class="exam-tag orange">${escapeHTML(k)}</span>`).join('')}
            </div>` : ''}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <strong style="font-size:12.5px">${escapeHTML(q.passageTitle || '长篇阅读段落')}（共 ${paras.length} 段）</strong>
          <button type="button" class="m-pill-btn" data-toggle-all-paras>${anyOpen ? '全部折叠' : '全部展开'}</button>
        </div>
        <div class="m-match-jump-row" aria-label="快速跳段">
          ${paras.map((p, idx) => {
            const lbl = String(p.label || String.fromCharCode(65 + idx)).toUpperCase();
            return `<button type="button" class="m-pill-btn ${saved?.checked && lbl === targetAns ? 'marigold' : ''}" data-m-jump-para="${escapeHTML(lbl)}">${escapeHTML(lbl)}</button>`;
          }).join('')}
        </div>
        <div class="m-match-para-scroll">
          ${paras.map((p, idx) => {
            const lbl = String(p.label || String.fromCharCode(65 + idx)).toUpperCase();
            const isEvidence = saved?.checked && lbl === targetAns;
            const isOpen = isEvidence || (openMap[lbl] !== undefined ? openMap[lbl] : true);
            const hlTerms = isEvidence ? (p.highlightTerms || q.anchorKeywords || []) : [];
            return `
              <div class="m-match-para ${isEvidence ? 'evidence' : ''}" data-m-para-item="${escapeHTML(lbl)}">
                <button type="button" class="m-match-para-head" data-toggle-para="${escapeHTML(lbl)}">
                  <span>段落 ${escapeHTML(lbl)}${isEvidence ? ' · 原文定位段' : ''}</span>
                  <span>${isOpen ? ic('chevronUp') : ic('chevronDown')}</span>
                </button>
                <div class="m-match-para-body ${isOpen ? '' : 'collapsed'}">
                  ${hlTerms.length ? highlightTermsHTML(p.text, hlTerms) : escapeHTML(p.text || '')}
                </div>
              </div>`;
          }).join('')}
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--text-sec);margin-bottom:5px">轻点选择对应段落字母：</div>
        <div class="m-letter-grid">
          ${paras.map((p, idx) => {
            const lbl = String(p.label || String.fromCharCode(65 + idx)).toUpperCase();
            let cls = '';
            if (saved && saved.checked) {
              if (lbl === targetAns) cls = 'correct';
              else if (lbl === userAns) cls = 'wrong';
            }
            return `<button type="button" class="m-letter-btn ${cls}" data-opt-letter="${escapeHTML(lbl)}" ${isLocked ? 'disabled' : ''}>${escapeHTML(lbl)}</button>`;
          }).join('')}
        </div>`;
    } else if (sk === 'reading') {
      const paras = Array.isArray(q.passageParagraphs) ? q.passageParagraphs : [];
      const evSent = saved?.checked ? q.evidenceSentence : '';
      bodyHTML += `
        ${q.passageTitle ? `<div class="en-serif" style="font-size:14.5px;font-weight:900;margin-bottom:6px;color:var(--text)">${escapeHTML(q.passageTitle)}</div>` : ''}
        <div class="m-passage-box">
          ${paras.map(p => {
            let html = escapeHTML(p);
            if (evSent && p.includes(evSent)) {
              html = html.replace(escapeHTML(evSent), `<mark class="m-evidence-mark">${escapeHTML(evSent)}</mark>`);
            }
            return `<p>${html}</p>`;
          }).join('')}
        </div>
        <div class="q-stem en-serif">${escapeHTML(q.questionText || '')}</div>
        <div class="options-grid">
          ${(q.options || []).map((opt, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx] || String(idx + 1);
            const cleanOpt = String(opt).replace(/^[A-D]\s*[\.\)、]\s*/i, '');
            const target = normalizeOptionLetter(q.answer);
            const userLetter = saved?.userVal ? normalizeOptionLetter(saved.userVal) : '';
            let cls = '';
            if (saved && saved.checked) {
              if (letter === target) cls = 'correct';
              else if (letter === userLetter) cls = 'wrong';
            }
            return `
              <button type="button" class="opt-btn ${cls}" data-opt-letter="${letter}" ${isLocked ? 'disabled' : ''}>
                <span class="opt-key">${letter}</span>
                <span class="en-serif">${escapeHTML(cleanOpt)}</span>
              </button>`;
          }).join('')}
        </div>`;
    } else if (sk === 'translation') {
      const txtVal = (saved && typeof saved.userVal === 'string') ? saved.userVal : (typeof inst?.draftVal === 'string' ? inst.draftVal : '');
      const wc = txtVal.trim() ? txtVal.trim().split(/\s+/).length : 0;
      bodyHTML += `
        <div class="m-word-box" style="margin-top:0;margin-bottom:10px">
          <div style="font-size:11px;font-weight:800;color:var(--primary);margin-bottom:4px">真题中文原文（先提主干，再后置长定语）</div>
          <div style="font-size:14px;line-height:1.72;color:var(--text)">${escapeHTML(q.chineseText || '')}</div>
        </div>
        ${Array.isArray(q.structureChecklist) && q.structureChecklist.length ? `
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px">
            ${q.structureChecklist.map(c => `<span class="exam-tag emerald">${escapeHTML(c)}</span>`).join('')}
          </div>` : ''}
        <div class="m-wc-bar"><span>WORD COUNT: <b data-wc-val>${wc}</b></span><span>0–15 分离线批改</span></div>
        <textarea class="essay-textarea" data-subj-input placeholder="在此输入英文译文，提交后自动核对采分表达并逐句拆解..." ${isLocked ? 'disabled' : ''}>${escapeHTML(txtVal)}</textarea>`;
    } else if (sk === 'writing') {
      const txtVal = (saved && typeof saved.userVal === 'string') ? saved.userVal : (typeof inst?.draftVal === 'string' ? inst.draftVal : '');
      const wc = txtVal.trim() ? txtVal.trim().split(/\s+/).length : 0;
      const targetMin = (Array.isArray(q.wordTarget) && q.wordTarget[0]) || 120;
      const targetMax = (Array.isArray(q.wordTarget) && q.wordTarget[1]) || 180;
      const inBand = wc >= targetMin && wc <= targetMax;
      bodyHTML += `
        <div class="m-word-box" style="margin-top:0;margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;gap:6px;margin-bottom:5px">
            <span class="exam-tag orange">${escapeHTML(q.essayType || '四级写作')}</span>
            <span class="exam-tag gold">目标 ${targetMin}–${targetMax} 词</span>
          </div>
          <div class="en-serif" style="font-size:13.4px;line-height:1.65;color:var(--text)">${escapeHTML(q.directions || '')}</div>
        </div>
        ${Array.isArray(q.logicBlueprint) && q.logicBlueprint.length ? `
          <div class="m-word-box" style="margin-bottom:8px">
            <strong style="color:var(--mint)">三段式写作蓝图：</strong>
            ${q.logicBlueprint.map((p, i) => `<div style="margin-top:3px"><b>Para ${i + 1}:</b> ${escapeHTML(p)}</div>`).join('')}
          </div>` : ''}
        ${Array.isArray(q.transferablePatterns) && q.transferablePatterns.length && !isLocked ? `
          <div style="font-size:11.5px;font-weight:900;color:var(--text-muted);margin-bottom:5px">轻点插入高分可迁移句型贴纸：</div>
          <div class="m-pattern-chips">
            ${q.transferablePatterns.map((pt, idx) => `<button type="button" class="m-pattern-chip" data-ins-pattern="${idx}" title="${escapeHTML(pt.zh || '')}">${escapeHTML(pt.en || '')}</button>`).join('')}
          </div>` : ''}
        <div class="m-wc-bar ${inBand ? 'in-band' : ''}" data-wc-bar>
          <span>WORDS: <b data-wc-val>${wc}</b> / ${targetMin}–${targetMax}</span>
          <span>${inBand ? '字数达标区间' : (wc < targetMin ? `还差约 ${targetMin - wc} 词` : '略超建议上限')}</span>
        </div>
        <textarea class="essay-textarea" data-subj-input style="min-height:170px" placeholder="分三段撰写四级作文（支持点击上方句型贴纸快速插入灵感）..." ${isLocked ? 'disabled' : ''}>${escapeHTML(txtVal)}</textarea>`;
    }

    const needsSubmitBtn = (sk === 'cloze' || sk === 'translation' || sk === 'writing');
    const footerHTML = isLocked
      ? (opts.hasNext ? `<div class="q-footer-bar"><button type="button" class="submit-btn inline-next-btn">进入下一题</button></div>` : '')
      : `<div class="q-footer-bar">
           ${needsSubmitBtn ? `<button type="button" class="submit-btn" data-submit-q>提交作答并批改</button>` : ''}
           <button type="button" class="secondary-btn" data-peek-explain>${inst?.peekExplain ? '收起深度解析' : '查看深度解析与避坑'}</button>
         </div>`;

    return `
      <div class="q-card ${cardCls}" data-qid="${escapeHTML(q.id)}">
        <div class="q-header">
          <div class="q-meta">
            <span class="q-num">Q${String(displayIdx).padStart(2, '0')}</span>
            <span class="exam-tag orange">${SKILL_META[sk]?.short || sk}</span>
            ${q.source ? `<span class="exam-tag">${escapeHTML(q.source)}</span>` : ''}
            ${q.title ? `<span class="exam-tag gold">${escapeHTML(q.title)}</span>` : ''}
          </div>
          <button type="button" class="fav-btn ${isFav ? 'active' : ''}" data-fav-q="${escapeHTML(q.id)}">
            ${isFav ? ic('starFill') : ic('star')}<span>${isFav ? '已藏' : '收藏'}</span>
          </button>
        </div>
        ${bodyHTML}
        ${footerHTML}
        ${showExplain ? buildExplainCardHTML(q, saved) : ''}
      </div>`;
  }

  function bindQuestionCard(cardEl, q, opts) {
    const inst = opts.instance || null;
    const sk = normSkill(q.skill || q.type);
    const saved = inst ? inst.ans : (state.answers[q.id] || null);
    const isLocked = !!(opts.lockAfterAnswer && saved && saved.checked);

    const finalizeAnswer = (userVal, evt) => {
      stopAllAudioAndTimers();
      const res = evaluateCet4Question(q, userVal);
      const rec = {
        userVal,
        correct: res.correct,
        checked: true,
        evalReport: res.evalReport,
        score: res.score,
        updatedAt: Date.now()
      };
      if (inst) {
        inst.ans = rec;
        inst.peekExplain = false;
      }
      state.answers[q.id] = rec;
      if (res.correct) {
        state.streak++;
        state.curveLevel = Math.min(4.0, state.curveLevel + 0.35);
        FireworksFX.launch(state.streak >= 3 ? 1.5 : 1.05, evt ? { x: evt.clientX, y: evt.clientY } : null);
        if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.onCorrectAnswer === 'function') {
          window.XiaoKeAssistant.onCorrectAnswer(q, state.streak);
        }
      } else {
        state.streak = 0;
        state.curveLevel = Math.max(1.0, state.curveLevel - 0.45);
        if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.onWrongAnswer === 'function') {
          window.XiaoKeAssistant.onWrongAnswer(q);
        }
      }
      saveState();
      updateGlobalBadges();
      if (typeof opts.onAfterUpdate === 'function') opts.onAfterUpdate();
    };

    cardEl.querySelector('[data-fav-q]')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      state.favorites[q.id] = !state.favorites[q.id];
      saveState();
      btn.classList.toggle('active', !!state.favorites[q.id]);
      btn.innerHTML = `${state.favorites[q.id] ? ic('starFill') : ic('star')}<span>${state.favorites[q.id] ? '已藏' : '收藏'}</span>`;
    });

    cardEl.querySelectorAll('[data-opt-letter]').forEach(btn => {
      btn.onclick = (e) => {
        if (isLocked) return;
        finalizeAnswer(btn.dataset.optLetter, e);
      };
    });

    if (sk === 'listening') {
      const startListeningPlayback = () => {
        if (activePreReadTimer) { clearInterval(activePreReadTimer); activePreReadTimer = null; }
        if (inst) inst.preReadDone = true;
        if (!window.Cet4Speech || typeof window.Cet4Speech.playListeningScript !== 'function') return;
        const rate = inst ? inst.listenRate : 1.0;
        if (inst) inst.listenPlaying = true;
        if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.setSprite === 'function') {
          window.XiaoKeAssistant.setSprite('07_listening_audio');
        }
        activeListenCtrl = window.Cet4Speech.playListeningScript(q.scriptTurns || [], {
          rate,
          onTurnStart: (idx) => {
            if (inst) inst.activeTurnIdx = idx;
            const stEl = cardEl.querySelector('[data-listen-status]');
            if (stEl) stEl.textContent = `第 ${idx + 1}/${(q.scriptTurns || []).length} 句`;
            cardEl.querySelectorAll('.m-turn-line').forEach(ln => {
              ln.classList.toggle('speaking', Number(ln.dataset.turnIdx) === idx);
            });
          },
          onFinish: () => {
            if (inst) { inst.listenPlaying = false; inst.activeTurnIdx = -1; }
            const playBtn = cardEl.querySelector('[data-listen-play]');
            if (playBtn) playBtn.innerHTML = `${ic('play')}<span>重播听力</span>`;
            const stEl = cardEl.querySelector('[data-listen-status]');
            if (stEl) stEl.textContent = '播报完成 · 可重播';
          },
          onStateChange: (s) => {
            if (inst) inst.listenPlaying = (s === 'playing');
          }
        });
        const playBtn = cardEl.querySelector('[data-listen-play]');
        if (playBtn) playBtn.innerHTML = `${ic('pause')}<span>暂停</span>`;
      };

      if (inst && !inst.preReadDone && !isLocked && !activePreReadTimer) {
        activePreReadTimer = setInterval(() => {
          inst.preReadLeft = Math.max(0, (inst.preReadLeft || 0) - 1);
          const secEl = document.getElementById('m-preread-sec');
          if (secEl) secEl.textContent = `${inst.preReadLeft}s`;
          if (inst.preReadLeft <= 0) {
            clearInterval(activePreReadTimer);
            activePreReadTimer = null;
            inst.preReadDone = true;
            document.getElementById('m-preread-bar')?.remove();
            startListeningPlayback();
          }
        }, 1000);
      }

      cardEl.querySelector('[data-skip-preread]')?.addEventListener('click', () => {
        document.getElementById('m-preread-bar')?.remove();
        startListeningPlayback();
      });

      cardEl.querySelector('[data-listen-play]')?.addEventListener('click', () => {
        if (inst && inst.listenPlaying) {
          stopAllAudioAndTimers();
          inst.listenPlaying = false;
          const playBtn = cardEl.querySelector('[data-listen-play]');
          if (playBtn) playBtn.innerHTML = `${ic('play')}<span>继续/重播</span>`;
        } else {
          startListeningPlayback();
        }
      });

      cardEl.querySelectorAll('[data-lrate]').forEach(btn => {
        btn.onclick = () => {
          const r = Number(btn.dataset.lrate);
          if (inst) inst.listenRate = r;
          if (activeListenCtrl && typeof activeListenCtrl.setRate === 'function') activeListenCtrl.setRate(r);
          cardEl.querySelectorAll('[data-lrate]').forEach(b => b.classList.toggle('marigold', b === btn));
        };
      });
    }

    if (sk === 'cloze' && !isLocked) {
      cardEl.querySelectorAll('[data-cloze-slot]').forEach(btn => {
        btn.onclick = () => {
          if (inst) inst.activeClozeBlank = Number(btn.dataset.clozeSlot);
          const holder = inst || { draftVal: {}, activeClozeBlank: Number(btn.dataset.clozeSlot) };
          openClozeBankSheet(q, holder, () => {
            if (typeof opts.onAfterUpdate === 'function') opts.onAfterUpdate();
          });
        };
      });
    }

    if (sk === 'matching') {
      const scrollBox = cardEl.querySelector('.m-match-para-scroll');
      const jumpToPara = (lbl) => {
        const item = cardEl.querySelector(`[data-m-para-item="${lbl}"]`);
        if (!item || !scrollBox) return;
        const body = item.querySelector('.m-match-para-body');
        if (body && body.classList.contains('collapsed')) {
          body.classList.remove('collapsed');
          if (inst) inst.matchOpenParas[lbl] = true;
          const icSpan = item.querySelector('.m-match-para-head span:last-child');
          if (icSpan) icSpan.innerHTML = ic('chevronUp');
        }
        cardEl.querySelectorAll('.m-match-para').forEach(n => n.classList.remove('is-jump-hl'));
        item.classList.add('is-jump-hl');
        scrollBox.scrollTo({ top: Math.max(0, item.offsetTop - scrollBox.offsetTop - 6), behavior: 'smooth' });
      };
      cardEl.querySelectorAll('[data-m-jump-para]').forEach(btn => {
        btn.onclick = () => jumpToPara(btn.dataset.mJumpPara);
      });
      cardEl.querySelectorAll('[data-toggle-para]').forEach(btn => {
        btn.onclick = () => {
          const lbl = btn.dataset.togglePara;
          const body = btn.parentElement?.querySelector('.m-match-para-body');
          if (!body) return;
          const willOpen = body.classList.contains('collapsed');
          body.classList.toggle('collapsed', !willOpen);
          if (inst) inst.matchOpenParas[lbl] = willOpen;
          const icSpan = btn.querySelector('span:last-child');
          if (icSpan) icSpan.innerHTML = willOpen ? ic('chevronUp') : ic('chevronDown');
        };
      });
      cardEl.querySelector('[data-toggle-all-paras]')?.addEventListener('click', (e) => {
        const bodies = Array.from(cardEl.querySelectorAll('.m-match-para-body'));
        const anyClosed = bodies.some(b => b.classList.contains('collapsed'));
        bodies.forEach(b => b.classList.toggle('collapsed', !anyClosed));
        cardEl.querySelectorAll('.m-match-para-head span:last-child').forEach(sp => {
          sp.innerHTML = anyClosed ? ic('chevronUp') : ic('chevronDown');
        });
        e.currentTarget.textContent = anyClosed ? '全部折叠' : '全部展开';
        if (inst) {
          (q.paragraphs || []).forEach((p, i) => {
            const lbl = String(p.label || String.fromCharCode(65 + i)).toUpperCase();
            inst.matchOpenParas[lbl] = anyClosed;
          });
        }
      });
    }

    const ta = cardEl.querySelector('[data-subj-input]');
    if (ta) {
      const updateWC = () => {
        if (inst && !isLocked) inst.draftVal = ta.value;
        const wc = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
        const wcEl = cardEl.querySelector('[data-wc-val]');
        if (wcEl) wcEl.textContent = String(wc);
        const bar = cardEl.querySelector('[data-wc-bar]');
        if (bar && sk === 'writing') {
          const minW = (Array.isArray(q.wordTarget) && q.wordTarget[0]) || 120;
          const maxW = (Array.isArray(q.wordTarget) && q.wordTarget[1]) || 180;
          const ok = wc >= minW && wc <= maxW;
          bar.classList.toggle('in-band', ok);
          const rightSpan = bar.querySelector('span:last-child');
          if (rightSpan) rightSpan.textContent = ok ? '字数达标区间' : (wc < minW ? `还差约 ${minW - wc} 词` : '略超建议上限');
        }
      };
      ta.addEventListener('input', updateWC);

      cardEl.querySelectorAll('[data-ins-pattern]').forEach(btn => {
        btn.onclick = () => {
          const pt = (q.transferablePatterns || [])[Number(btn.dataset.insPattern)];
          if (!pt || isLocked) return;
          const sep = ta.value && !/\s$/.test(ta.value) ? ' ' : '';
          ta.value = `${ta.value}${sep}${pt.en} `;
          ta.focus();
          updateWC();
        };
      });
    }

    cardEl.querySelector('[data-submit-q]')?.addEventListener('click', (e) => {
      if (isLocked) return;
      if (sk === 'cloze') {
        finalizeAnswer((inst && inst.draftVal) || {}, e);
      } else {
        finalizeAnswer(ta ? ta.value : '', e);
      }
    });

    cardEl.querySelector('[data-peek-explain]')?.addEventListener('click', () => {
      if (inst) {
        inst.peekExplain = !inst.peekExplain;
        if (typeof opts.onAfterUpdate === 'function') opts.onAfterUpdate();
      } else {
        openTopicSummarySheet(sk);
      }
    });

    cardEl.querySelectorAll('[data-open-sum]').forEach(btn => {
      btn.onclick = () => openTopicSummarySheet(btn.dataset.openSum);
    });

    cardEl.querySelector('.inline-next-btn')?.addEventListener('click', () => {
      if (typeof opts.onNext === 'function') opts.onNext();
    });
  }

  function handleRealPaperXiaoKe(eventType, payload) {
    const xk = window.XiaoKeAssistant;
    if (!xk) return;
    if (eventType === 'correct') {
      state.streak++;
      saveState();
      if (typeof xk.onCorrectAnswer === 'function') xk.onCorrectAnswer(payload || {}, state.streak);
      else if (typeof xk.react === 'function') xk.react('04_cheer_correct', payload?.message || '历年真题这一题稳稳拿分！', 2800);
    } else if (eventType === 'wrong') {
      state.streak = 0;
      saveState();
      if (typeof xk.onWrongAnswer === 'function') xk.onWrongAnswer(payload || {});
      else if (typeof xk.react === 'function') xk.react('05_encourage_wrong', payload?.message || '没关系，把真题陷阱拆透，考场稳避坑！', 3000);
    } else if (eventType === 'listening' && typeof xk.setSprite === 'function') {
      xk.setSprite('07_listening_audio');
    } else if (typeof xk.react === 'function') {
      const spriteMap = {
        report: '09_proud_streak',
        writing: '06_writing_quill',
        translation: '06_writing_quill',
        start: '02_study_reading',
        hint: '03_thinking_hint'
      };
      const sp = payload?.spriteId || spriteMap[eventType] || '10_eureka_tip';
      const msg = payload?.message || '整套历年真题精刷中，保持节奏稳步提分！';
      xk.react(sp, msg, 3200);
    }
  }

  function renderPracticeView() {
    const host = document.getElementById('m-view-practice');
    if (!host) return;
    unmountRealPaperStudio();

    const rpInfo = getRealPaperOverview();
    const modeSwitchHTML = `
      <div class="m-prac-mode-seg" role="tablist" aria-label="刷题模式切换">
        <button type="button" class="m-seg-btn ${state.practiceMode === 'adaptive' ? 'active' : ''}" data-pmode="adaptive">分题型精练 (${QUESTION_BANK.length})</button>
        <button type="button" class="m-seg-btn ${state.practiceMode === 'real_paper' ? 'active' : ''}" data-pmode="real_paper">完整真题全卷${rpInfo.count ? ` (${rpInfo.count}套)` : ''}</button>
      </div>`;

    if (state.practiceMode === 'real_paper') {
      host.innerHTML = `
        ${modeSwitchHTML}
        <div id="m-real-paper-studio-host" class="m-rps-host"></div>
      `;
      host.querySelectorAll('[data-pmode]').forEach(btn => {
        btn.onclick = () => {
          const nextMode = btn.dataset.pmode;
          if (state.practiceMode === nextMode) return;
          stopAllAudioAndTimers();
          runMobileSnapTurn(
            () => document.getElementById('m-real-paper-studio-host') || document.getElementById('m-view-practice'),
            () => {
              unmountRealPaperStudio();
              state.practiceMode = nextMode;
              renderPracticeView();
            },
            nextMode === 'real_paper' ? 'next' : 'prev',
            nextMode === 'real_paper' ? 'kraft' : 'grid',
            480,
            () => document.querySelector('#m-prac-stage .q-card') || document.getElementById('m-real-paper-studio-host') || document.getElementById('m-view-practice')
          );
        };
      });
      const studioHost = document.getElementById('m-real-paper-studio-host');
      if (studioHost && window.RealPaperStudio && typeof window.RealPaperStudio.mount === 'function') {
        realPaperMounted = true;
        window.RealPaperStudio.mount(studioHost, {
          isMobile: true,
          storageKey: STORE_KEY,
          onXiaoKeEvent: handleRealPaperXiaoKe,
          onAddWrongItems: (wrongItems) => {
            const count = Array.isArray(wrongItems) ? wrongItems.length : 0;
            try {
              const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
              const prevList = Array.isArray(raw.realPaperWrong) ? raw.realPaperWrong : [];
              const byKey = new Map(prevList.map(it => [it.key || `${it.paperId}_${it.num}`, it]));
              (wrongItems || []).forEach(it => {
                const k = it.key || `${it.paperId || 'rp'}_${it.num || Math.random()}`;
                byKey.set(k, Object.assign({ key: k, savedAt: Date.now() }, it));
              });
              raw.realPaperWrong = Array.from(byKey.values());
              localStorage.setItem(STORE_KEY, JSON.stringify(raw));
            } catch (_e) {}
            updateGlobalBadges();
            if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.react === 'function') {
              window.XiaoKeAssistant.react('10_eureka_tip', `已将 ${count} 道历年真题错题归档，考前集中复盘提分最快！`, 3400);
            }
          },
          onJumpSection: (secId) => {
            unmountRealPaperStudio();
            if (secId && SECTION_MAP[secId]) {
              state.activeSection = secId;
            } else if (secId) {
              const target = ORDERED_SECTIONS.find(s => normSkill(s.skillId) === normSkill(secId));
              if (target) state.activeSection = target.id;
            }
            switchView('knowledge');
          },
          onFireworks: (x, y) => {
            FireworksFX.launch(1.15, (typeof x === 'number' && typeof y === 'number') ? { x, y } : null);
          }
        });
      } else if (studioHost) {
        studioHost.innerHTML = '<div class="salon-card">历年真题全卷模块正在加载中...</div>';
      }
      syncXiaoKeContext({ practiceMode: 'real_paper' });
      return;
    }

    if (!state.practiceHistory.length) drawNextPracticeItem();
    const idx = Math.min(Math.max(0, state.practiceIdx), Math.max(0, state.practiceHistory.length - 1));
    state.practiceIdx = idx;
    const inst = state.practiceHistory[idx];
    const q = inst ? QUESTION_BANK.find(x => x.id === inst.qId) : QUESTION_BANK[0];
    if (!q || !inst) {
      host.innerHTML = `${modeSwitchHTML}<div class="salon-card">题库正在加载中...</div>`;
      return;
    }

    const sk = normSkill(q.skill || q.type);
    const sum = TOPIC_SUMMARIES[skillTopicKey(sk)] || null;
    const diffNames = { 1: 'LV.1 基础', 2: 'LV.2 真题', 3: 'LV.3 攻坚' };

    const skillChips = ['all', ...SKILL_ORDER].map(key => `
      <button type="button" class="m-chip ${state.practiceSkill === key ? 'active' : ''}" data-pskill="${key}">
        ${SKILL_META[key]?.short || key}
      </button>`).join('');

    host.innerHTML = `
      ${modeSwitchHTML}

      <!-- Sharp Print Skill Filter Chips -->
      <div class="m-hscroll" style="margin-bottom:8px">${skillChips}</div>

      <!-- Practice HUD -->
      <div class="m-prac-hud">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          <strong style="font-family:var(--font-code);font-size:13px">第 ${String(idx + 1).padStart(2, '0')} 题</strong>
          <span class="diff-tier-badge diff-lv${inst.diffLv}">${diffNames[inst.diffLv] || 'LV.2 真题'}</span>
          ${state.streak > 0 ? `<span class="exam-tag gold">连对 x${state.streak}</span>` : ''}
        </div>
        <div style="display:flex;gap:6px">
          <button type="button" class="m-pill-btn marigold" id="m-prac-sum-btn">速记卡</button>
          <button type="button" class="m-pill-btn" id="m-prac-reshuffle">${ic('refresh')}<span>换题</span></button>
        </div>
      </div>

      <!-- Collapsible Topic Quick Summary Strip -->
      ${sum ? `
        <div class="m-kp-collapse">
          <button type="button" class="m-kp-toggle" id="m-kp-toggle-btn">
            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
              <span class="exam-tag emerald" style="margin-right:5px">口诀</span>${escapeHTML(sum.title || '')}
            </span>
            <span>${inst.kpOpen ? ic('chevronUp') : ic('chevronDown')}</span>
          </button>
          <div class="m-kp-body ${inst.kpOpen ? '' : 'hidden'}" id="m-kp-body">
            <div class="formula-box" style="margin-top:0">${escapeHTML(sum.formula || '')}</div>
            ${sum.trapWarning ? `<div class="trap-callout" style="margin-top:6px"><strong>考场避坑：</strong>${escapeHTML(sum.trapWarning)}</div>` : ''}
          </div>
        </div>` : ''}

      <!-- Active Question Card -->
      <div id="m-prac-stage">
        ${renderQuestionCardHTML(q, idx + 1, { instance: inst, lockAfterAnswer: true, hasNext: true })}
      </div>

      <!-- Prev / Next Adaptive Pager -->
      <div class="m-prac-pager">
        <button type="button" class="secondary-btn" id="m-q-prev" ${idx === 0 ? 'disabled' : ''}>${ic('prev')}<span>上一题</span></button>
        <button type="button" class="submit-btn" id="m-q-next"><span>下一题（自适应）</span>${ic('next')}</button>
      </div>
    `;

    const getPracTarget = () => host.querySelector('#m-prac-stage .q-card') || document.getElementById('m-prac-stage');
    const goNext = () => {
      stopAllAudioAndTimers();
      window.scrollTo({ top: 0, behavior: 'auto' });
      runMobileSnapTurn(getPracTarget, () => {
        if (state.practiceIdx < state.practiceHistory.length - 1) state.practiceIdx++;
        else {
          drawNextPracticeItem();
          state.practiceIdx = state.practiceHistory.length - 1;
        }
        renderPracticeView();
      }, 'next', 'grid', 480);
    };

    host.querySelectorAll('[data-pmode]').forEach(btn => {
      btn.onclick = () => {
        const nextMode = btn.dataset.pmode;
        if (state.practiceMode === nextMode) return;
        stopAllAudioAndTimers();
        runMobileSnapTurn(
          getPracTarget,
          () => {
            state.practiceMode = nextMode;
            renderPracticeView();
          },
          nextMode === 'real_paper' ? 'next' : 'prev',
          nextMode === 'real_paper' ? 'kraft' : 'grid',
          480,
          () => document.getElementById('m-real-paper-studio-host') || getPracTarget()
        );
      };
    });

    host.querySelectorAll('[data-pskill]').forEach(btn => {
      btn.onclick = () => {
        runMobileSnapTurn(getPracTarget, () => {
          startPracticeScope(btn.dataset.pskill);
          renderPracticeView();
        }, 'next', 'grid', 480);
      };
    });

    document.getElementById('m-prac-sum-btn')?.addEventListener('click', () => openTopicSummarySheet(sk));
    document.getElementById('m-prac-reshuffle')?.addEventListener('click', () => {
      runMobileSnapTurn(getPracTarget, () => {
        startPracticeScope(state.practiceSkill);
        renderPracticeView();
      }, 'next', 'grid', 480);
    });

    document.getElementById('m-kp-toggle-btn')?.addEventListener('click', () => {
      inst.kpOpen = !inst.kpOpen;
      document.getElementById('m-kp-body')?.classList.toggle('hidden', !inst.kpOpen);
    });

    const cardEl = host.querySelector('#m-prac-stage .q-card');
    if (cardEl) {
      bindQuestionCard(cardEl, q, {
        instance: inst,
        lockAfterAnswer: true,
        hasNext: true,
        onNext: goNext,
        onAfterUpdate: () => renderPracticeView()
      });
    }

    document.getElementById('m-q-prev')?.addEventListener('click', () => {
      if (state.practiceIdx > 0) {
        stopAllAudioAndTimers();
        window.scrollTo({ top: 0, behavior: 'auto' });
        runMobileSnapTurn(getPracTarget, () => {
          state.practiceIdx--;
          renderPracticeView();
        }, 'prev', 'grid', 480);
      }
    });
    document.getElementById('m-q-next')?.addEventListener('click', goNext);

    syncXiaoKeContext();
  }

  /* ==================== VIEW 4: ZINE BATTLE CARD & MASTERY ==================== */
  function renderMasteryView() {
    const host = document.getElementById('m-view-mastery');
    if (!host) return;
    const ov = computeOverallReadiness();
    const r = 34;
    const circ = 2 * Math.PI * r;
    const dashOffset = circ * (1 - ov.readiness / 100);

    const skillCards = SKILL_ORDER.map(sk => {
      const m = computeSkillMastery(sk);
      const topicInfo = MASTERY_TOPICS.find(t => normSkill(t.id) === sk) || {};
      return { sk, m, topicInfo };
    });
    const weakest = skillCards.slice().sort((a, b) => a.m.pct - b.m.pct)[0];

    host.innerHTML = `
      <!-- Hobonichi Readiness Tracker Card -->
      <div class="m-battle-card">
        <div class="m-battle-head">
          <span>冲刺进度月历 · CET-4 RADAR</span>
          <span>连胜 x${state.streak}</span>
        </div>
        <div class="m-battle-body">
          <div class="m-ring-wrap">
            <svg width="86" height="86" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="${r}" fill="none" stroke="var(--bg-paper-inset)" stroke-width="8"/>
              <circle cx="44" cy="44" r="${r}" fill="none" stroke="var(--primary)" stroke-width="8" stroke-linecap="round"
                stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${dashOffset.toFixed(1)}"/>
            </svg>
            <div class="m-ring-center">
              <span class="m-ring-pct">${ov.readiness}%</span>
              <span class="m-ring-lbl">READY</span>
            </div>
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-family:var(--font-serif);font-size:16px;font-weight:800;color:var(--text);margin-bottom:8px;line-height:1.35">
              <span class="m-hl-marigold">${escapeHTML(ov.band)}</span>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button type="button" class="m-pill-btn primary" id="m-go-weakest">
                攻克最弱：${SKILL_META[weakest?.sk || 'listening']?.short}
              </button>
              <button type="button" class="m-pill-btn marigold" id="m-go-today-vocab">
                背 D${String(state.vocabDay).padStart(2, '0')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Vocab & 12-Day Techo Progress Bars -->
      <div class="salon-card">
        <div class="m-bar-wrap" style="margin-top:0">
          <div class="m-bar-head">
            <span>高频词带背进度（${ov.vocabStat.known}/${ov.vocabStat.total} 词）</span>
            <span style="font-family:var(--font-code);color:var(--primary)">${ov.vocabStat.pct}%</span>
          </div>
          <div class="m-bar-track"><div class="m-bar-fill" style="width:${ov.vocabStat.pct}%"></div></div>
        </div>
        <div class="m-bar-wrap" style="margin-bottom:0">
          <div class="m-bar-head">
            <span>12 天活页手账打卡（${ov.sprintDoneCnt}/12 天）</span>
            <span style="font-family:var(--font-code);color:var(--mint)">${ov.sprintPct}%</span>
          </div>
          <div class="m-bar-track"><div class="m-bar-fill emerald" style="width:${ov.sprintPct}%"></div></div>
        </div>
      </div>

      <!-- 6 Linen Skill Cards -->
      <div style="font-family:var(--font-serif);font-size:13px;font-weight:800;margin:12px 0 8px;color:var(--text)">
        六大核心题型熟练度 · 06 CORE SKILLS
      </div>
      ${skillCards.map(({ sk, m, topicInfo }) => `
        <div class="m-skill-card">
          <div class="m-skill-head">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;min-width:0">
              <strong style="font-family:var(--font-serif);font-size:14.2px;color:var(--text)">${escapeHTML(topicInfo.name || SKILL_META[sk]?.label || sk)}</strong>
              <span class="exam-tag gold">${escapeHTML(SKILL_META[sk]?.badge || '')}</span>
            </div>
            <strong style="font-family:var(--font-code);font-size:15.5px;color:var(--primary)">${m.pct}%</strong>
          </div>
          <div class="m-bar-track" style="margin-bottom:8px"><div class="m-bar-fill ${m.pct >= 65 ? 'emerald' : ''}" style="width:${m.pct}%"></div></div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
            <span style="font-family:var(--font-code);font-size:11px;font-weight:700;color:var(--text-muted)">刷题 ${m.right}/${m.total} 对 · 精讲 ${m.secDone}/${m.secTotal} 节</span>
            <div style="display:flex;gap:6px">
              <button type="button" class="m-pill-btn" data-m-sec-sk="${sk}">看精讲</button>
              <button type="button" class="m-pill-btn primary" data-m-prac-sk="${sk}">专项练</button>
            </div>
          </div>
        </div>`).join('')}
    `;

    document.getElementById('m-go-weakest')?.addEventListener('click', () => {
      startPracticeScope(weakest ? weakest.sk : 'listening');
      switchView('practice');
    });
    document.getElementById('m-go-today-vocab')?.addEventListener('click', () => switchView('vocab'));

    host.querySelectorAll('[data-m-sec-sk]').forEach(btn => {
      btn.onclick = () => {
        const target = ORDERED_SECTIONS.find(s => normSkill(s.skillId) === btn.dataset.mSecSk);
        if (target) state.activeSection = target.id;
        switchView('knowledge');
      };
    });
    host.querySelectorAll('[data-m-prac-sk]').forEach(btn => {
      btn.onclick = () => {
        startPracticeScope(btn.dataset.mPracSk);
        switchView('practice');
      };
    });

    syncXiaoKeContext();
  }

  /* ==================== VIEW 5: PHYSICAL FOLDER-TAB SCRAPBOOK ==================== */
  function renderNotebookView() {
    const host = document.getElementById('m-view-notebook');
    if (!host) return;

    const wrongList = QUESTION_BANK.filter(q => state.answers[q.id]?.checked && !state.answers[q.id]?.correct);
    const rpWrongList = getRealPaperWrongList();
    const weakWords = getWeakWordsList();
    const favList = QUESTION_BANK.filter(q => state.favorites[q.id]);

    host.innerHTML = `
      <div class="m-folder-tabs" role="tablist">
        <button type="button" class="m-folder-tab ${state.nbFilter === 'wrong' ? 'active' : ''}" data-nbf="wrong">错题夹 (${wrongList.length + rpWrongList.length})</button>
        <button type="button" class="m-folder-tab ${state.nbFilter === 'vocab' ? 'active' : ''}" data-nbf="vocab">生词卡 (${weakWords.length})</button>
        <button type="button" class="m-folder-tab ${state.nbFilter === 'fav' ? 'active' : ''}" data-nbf="fav">收藏签 (${favList.length})</button>
      </div>
      <div class="m-folder-sheet">
        <input type="search" class="search-input" id="m-nb-search" value="${escapeHTML(state.nbSearch)}" placeholder="实时检索题干、生词、考点关键词..." style="margin-bottom:10px">
        <div id="m-nb-list"></div>
      </div>
    `;

    const paintList = () => {
      const listEl = document.getElementById('m-nb-list');
      if (!listEl) return;
      const kw = String(state.nbSearch || '').trim().toLowerCase();

      if (state.nbFilter === 'vocab') {
        const filtered = weakWords.filter(w => {
          if (!kw) return true;
          return `${w.word} ${w.meaning} ${w.roots || ''} ${w.tag || ''}`.toLowerCase().includes(kw);
        });
        if (!filtered.length) {
          listEl.innerHTML = '<div class="m-nb-word-card" style="text-align:center;color:var(--text-muted);padding:24px 12px;font-weight:700">生词卡夹已清空！去「带背」继续积累高频词吧。</div>';
          return;
        }
        listEl.innerHTML = `
          <button type="button" class="submit-btn" id="m-nb-launch-weak" style="width:100%;margin-bottom:10px">
            ${ic('headphones')}<span>一键启动 ${filtered.length} 个生词强化刷词</span>
          </button>
          ${filtered.map(w => `
            <div class="m-nb-word-card">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
                <div style="min-width:0">
                  <strong class="en-serif" style="font-size:18px;color:var(--text)">${escapeHTML(w.word)}</strong>
                  <span style="font-family:var(--font-code);font-size:11.5px;color:var(--primary);margin-left:5px">${escapeHTML(w.phonetic || '')}</span>
                  <span class="exam-tag gold" style="margin-left:4px">D${w.day}</span>
                </div>
                <div style="display:flex;gap:5px">
                  <button type="button" class="m-pill-btn marigold" data-nb-speak="${escapeHTML(w.word)}" aria-label="发音">${ic('volume')}</button>
                  <button type="button" class="m-pill-btn accent" data-nb-master="${escapeHTML(w.id)}">已斩</button>
                </div>
              </div>
              <div style="font-size:13.2px;font-weight:900;color:var(--text-sec);margin-top:5px">${escapeHTML(w.pos || '')} ${escapeHTML(w.meaning || '')}</div>
              ${w.roots ? `<div style="font-size:12px;color:var(--text-muted);margin-top:3px">${escapeHTML(w.roots)}</div>` : ''}
            </div>`).join('')}`;

        document.getElementById('m-nb-launch-weak')?.addEventListener('click', () => {
          state.vocabSubMode = 'flashcard';
          ensureFlashcardQueue(state.vocabDay, true);
          switchView('vocab');
        });
        listEl.querySelectorAll('[data-nb-speak]').forEach(b => {
          b.onclick = () => { if (window.Cet4Speech) window.Cet4Speech.speakWord(b.dataset.nbSpeak, { rate: state.vocabRate }); };
        });
        listEl.querySelectorAll('[data-nb-master]').forEach(b => {
          b.onclick = (e) => {
            const wObj = VOCAB_WORDS.find(x => x.id === b.dataset.nbMaster);
            if (wObj) rateVocabWord(wObj, 'known', e);
            renderNotebookView();
          };
        });
        return;
      }

      const source = state.nbFilter === 'wrong' ? wrongList : favList;
      const filtered = source.filter(q => {
        if (!kw) return true;
        const blob = `${q.title || ''} ${q.source || ''} ${q.questionText || ''} ${q.statement || ''} ${q.chineseText || ''} ${q.directions || ''} ${q.passageTitle || ''}`.toLowerCase();
        return blob.includes(kw);
      });
      const filteredRpWrong = state.nbFilter === 'wrong'
        ? rpWrongList.filter(it => {
          if (!kw) return true;
          const blob = `${it.paperTitle || ''} ${it.section || ''} ${it.stem || ''} ${it.prompt || ''} ${it.explain || ''} ${it.answer || ''}`.toLowerCase();
          return blob.includes(kw);
        })
        : [];

      if (!filtered.length && !filteredRpWrong.length) {
        listEl.innerHTML = `<div class="m-nb-word-card" style="text-align:center;color:var(--text-muted);padding:24px 12px;font-weight:700">${state.nbFilter === 'wrong' ? '错题夹已清零！保持这份稳步提分的节奏。' : '暂无收藏签，刷题时轻点右上角「收藏」即可夹入归档。'}</div>`;
        return;
      }

      const adaptiveHTML = filtered.map((q, i) => `
        <div class="m-nb-word-card">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px">
            <div style="display:flex;gap:5px;flex-wrap:wrap">
              <span class="q-num">${String(i + 1).padStart(2, '0')}</span>
              <span class="exam-tag orange">${SKILL_META[normSkill(q.skill || q.type)]?.short || ''}</span>
              ${q.source ? `<span class="exam-tag">${escapeHTML(q.source)}</span>` : ''}
            </div>
            <button type="button" class="m-pill-btn primary" data-nb-redo="${escapeHTML(q.id)}">立即重练</button>
          </div>
          <div class="en-serif" style="font-size:13.5px;font-weight:700;color:var(--text);line-height:1.5;margin-bottom:6px">
            ${escapeHTML(q.questionText || q.statement || q.title || q.chineseText || q.directions || '')}
          </div>
          ${EXPLAIN_DETAILS[q.id]?.pitfall ? `<div style="font-size:12px;font-weight:700;color:var(--text-muted)">避坑要点：${escapeHTML(EXPLAIN_DETAILS[q.id].pitfall)}</div>` : ''}
        </div>`).join('');

      const rpHTML = filteredRpWrong.map(it => {
        const k = it.key || `${it.paperId || 'rp'}_${it.num || ''}`;
        return `
          <div class="m-nb-word-card">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;flex-wrap:wrap">
              <div style="display:flex;gap:5px;flex-wrap:wrap">
                <span class="exam-tag gold">历年真题</span>
                ${it.paperTitle ? `<span class="exam-tag">${escapeHTML(it.paperTitle)}</span>` : ''}
                ${it.num != null ? `<span class="exam-tag orange">Q${escapeHTML(it.num)}</span>` : ''}
              </div>
              <div style="display:flex;gap:5px">
                <button type="button" class="m-pill-btn primary" data-nb-open-rp>去刷全卷</button>
                <button type="button" class="m-pill-btn accent" data-nb-rm-rp="${escapeHTML(k)}">已掌握</button>
              </div>
            </div>
            <div class="en-serif" style="font-size:13.2px;font-weight:700;color:var(--text);line-height:1.5;margin-bottom:5px">
              ${escapeHTML(it.stem || it.prompt || it.statement || it.section || '历年真题错题')}
            </div>
            ${it.answer ? `<div style="font-size:12px;font-weight:900;color:var(--mint);margin-bottom:3px">正确答案：${escapeHTML(it.answer)}${it.userAnswer ? ` · 你选：${escapeHTML(it.userAnswer)}` : ''}</div>` : ''}
            ${it.explain ? `<div style="font-size:12px;color:var(--text-muted);line-height:1.5">${escapeHTML(it.explain)}</div>` : ''}
          </div>`;
      }).join('');

      listEl.innerHTML = adaptiveHTML + rpHTML;

      listEl.querySelectorAll('[data-nb-open-rp]').forEach(btn => {
        btn.onclick = () => {
          state.practiceMode = 'real_paper';
          switchView('practice');
        };
      });
      listEl.querySelectorAll('[data-nb-rm-rp]').forEach(btn => {
        btn.onclick = () => {
          removeRealPaperWrong(btn.dataset.nbRmRp);
          updateGlobalBadges();
          renderNotebookView();
        };
      });

      listEl.querySelectorAll('[data-nb-redo]').forEach(btn => {
        btn.onclick = () => {
          const qObj = QUESTION_BANK.find(x => x.id === btn.dataset.nbRedo);
          if (!qObj) return;
          const sk = normSkill(qObj.skill || qObj.type);
          state.practiceSkill = sk;
          state.practiceSeq++;
          const inst = {
            uid: `nb_${state.practiceSeq}`,
            qId: qObj.id,
            skill: sk,
            diffLv: Number(qObj.difficulty) || 2,
            ans: null,
            draftVal: sk === 'cloze' ? {} : '',
            peekExplain: false,
            reviewTab: 'explain',
            kpOpen: false,
            preReadDone: false,
            preReadLeft: 15,
            listenRate: 1.0,
            listenPlaying: false,
            activeTurnIdx: -1,
            activeClozeBlank: null,
            matchOpenParas: {}
          };
          state.practiceHistory.push(inst);
          state.practiceIdx = state.practiceHistory.length - 1;
          switchView('practice');
        };
      });
    };

    paintList();

    host.querySelectorAll('[data-nbf]').forEach(btn => {
      btn.onclick = () => {
        const nextNb = btn.dataset.nbf;
        if (nextNb === state.nbFilter) return;
        const pIdx = M_NB_ORDER.indexOf(state.nbFilter);
        const nIdx = M_NB_ORDER.indexOf(nextNb);
        const dir = (nIdx >= 0 && pIdx >= 0 && nIdx < pIdx) ? 'prev' : 'next';
        runMobileSnapTurn(() => host.querySelector('.m-folder-sheet'), () => {
          state.nbFilter = nextNb;
          renderNotebookView();
        }, dir, 'grid', 460);
      };
    });
    document.getElementById('m-nb-search')?.addEventListener('input', (e) => {
      state.nbSearch = e.target.value;
      paintList();
    });

    syncXiaoKeContext();
  }

  /* ==================== VIEW SWITCHER & BOOTSTRAP ==================== */
  function switchView(viewId) {
    stopAllAudioAndTimers();
    const shellEl = document.querySelector('.m-shell');
    if (shellEl && window.TechoPageTurn && typeof window.TechoPageTurn.cancelStageTurn === 'function') {
      window.TechoPageTurn.cancelStageTurn(shellEl);
    }
    const prevView = state.activeView;
    const prevIdx = M_VIEW_ORDER.indexOf(prevView);
    const nextIdx = M_VIEW_ORDER.indexOf(viewId);
    const turnDir = (prevView && prevView !== viewId)
      ? ((prevIdx >= 0 && nextIdx >= 0 && nextIdx < prevIdx) ? 'prev' : 'next')
      : null;
    const prevEl = prevView ? document.getElementById(`m-view-${prevView}`) : null;
    const nextEl = document.getElementById(`m-view-${viewId}`);
    const canCurl = Boolean(turnDir && prevEl && nextEl && shellEl && window.TechoPageTurn && typeof window.TechoPageTurn.turnLayers === 'function');

    if (state.activeView === 'knowledge' && viewId !== 'knowledge') destroySectionAnim();
    if (state.activeView === 'practice' && viewId !== 'practice') unmountRealPaperStudio();
    if (canCurl) window.scrollTo({ top: 0, behavior: 'auto' });

    state.activeView = viewId;
    document.querySelectorAll('.m-view').forEach(v => {
      if (canCurl && v === prevEl) v.classList.add('active');
      else v.classList.toggle('active', v === nextEl);
    });
    document.querySelectorAll('.m-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewId));

    if (viewId === 'knowledge') renderKnowledgeView();
    else if (viewId === 'vocab') renderVocabView();
    else if (viewId === 'practice') renderPracticeView();
    else if (viewId === 'mastery') renderMasteryView();
    else if (viewId === 'notebook') renderNotebookView();

    if (canCurl) {
      window.TechoPageTurn.turnLayers(shellEl, prevEl, nextEl, {
        dir: turnDir,
        mode: 'view',
        paperStyle: 'grid',
        duration: 480,
        onComplete: () => {
          if (state.activeView !== prevView) prevEl.classList.remove('active');
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateGlobalBadges();
  }

  function init() {
    applyTheme(state.theme);

    const brandImg = document.getElementById('m-brand-img');
    if (brandImg) brandImg.src = getSpriteSrc('01_idle_smile');

    /* Initialize Xiao Ke Companion safely above bottom dock */
    if (window.XiaoKeAssistant) {
      const initFn = typeof window.XiaoKeAssistant.init === 'function'
        ? window.XiaoKeAssistant.init
        : window.XiaoKeAssistant.mount;
      if (typeof initFn === 'function') {
        initFn.call(window.XiaoKeAssistant, {
          hostId: 'xiaoke-dock',
          isMobile: true,
          mobile: true,
          compact: true,
          bottomOffset: 74,
          getContext: buildXiaoKeContext,
          onSwitchView: switchView,
          isDark: () => state.theme === 'dark'
        });
      }
    }

    document.getElementById('m-theme-toggle')?.addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });

    document.getElementById('m-switch-pc')?.addEventListener('click', () => {
      try { sessionStorage.setItem('prefer_pc', '1'); } catch (_e) {}
      if (location.protocol === 'file:') {
        location.href = './四级冲刺_小克伴学复习与高频带背.html?view=pc';
      } else {
        location.href = 'index.html?view=pc';
      }
    });

    document.querySelectorAll('.m-tab-btn').forEach(btn => {
      btn.onclick = () => switchView(btn.dataset.view);
    });

    document.getElementById('m-sheet-mask')?.addEventListener('click', e => {
      if (e.target.id === 'm-sheet-mask') closeBottomSheet();
    });
    document.getElementById('m-sheet-close')?.addEventListener('click', closeBottomSheet);

    document.getElementById('lightbox-close')?.addEventListener('click', closeAnimLightbox);
    document.getElementById('anim-lightbox')?.addEventListener('click', e => {
      if (e.target.id === 'anim-lightbox') closeAnimLightbox();
    });

    updateGlobalBadges();
    switchView('knowledge');
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
