/* ==========================================================================
   CET-4 Sprint Techo — Desktop (PC) Application Controller
   Style #2: Cozy Study Desk / Hobonichi & Midori Traveler's Notebook
   Light ("午后书桌") & Dark ("台灯夜读") · Zero Emojis · Soft Cotton Paper
   5 Views: knowledge | vocab | practice | mastery | notebook
   Shared localStorage store: cet4_xiaoke_sprint_v1
   ========================================================================== */
(function () {
  'use strict';

  const STORE_KEY = 'cet4_xiaoke_sprint_v1';

  const SPRITES = window.XIAOKE_SPRITES || {};
  const MANIFEST = window.XIAOKE_MANIFEST || { sprites: [] };
  const VOCAB_DAYS = Array.isArray(window.VOCAB_DAYS) ? window.VOCAB_DAYS : [];
  const VOCAB_WORDS = Array.isArray(window.VOCAB_WORDS) ? window.VOCAB_WORDS : [];
  const CONFUSABLE_PAIRS = Array.isArray(window.CONFUSABLE_PAIRS) ? window.CONFUSABLE_PAIRS : [];
  const SPRINT_PLAN = Array.isArray(window.SPRINT_PLAN) ? window.SPRINT_PLAN : [];
  const MASTERY_TOPICS = Array.isArray(window.MASTERY_TOPICS) ? window.MASTERY_TOPICS : [];
  const KNOWLEDGE_MODULES = Array.isArray(window.KNOWLEDGE_MODULES) ? window.KNOWLEDGE_MODULES : [];
  const RAW_SECTIONS = window.KNOWLEDGE_SECTIONS || {};
  const TOPIC_SUMMARIES = window.TOPIC_SUMMARIES || {};
  const XIAOKE_MANTRAS = Array.isArray(window.XIAOKE_MANTRAS) ? window.XIAOKE_MANTRAS : [];
  const QUESTION_BANK = Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK : [];
  const EXPLAIN_DETAILS = window.EXPLAIN_DETAILS || {};

  /* -------------------- Defensive Data Normalization -------------------- */
  const SECTIONS_MAP = {};
  const SECTIONS_LIST = [];
  if (Array.isArray(RAW_SECTIONS)) {
    RAW_SECTIONS.forEach(sec => {
      if (sec && sec.id) {
        SECTIONS_MAP[sec.id] = sec;
        SECTIONS_LIST.push(sec);
      }
    });
  } else if (RAW_SECTIONS && typeof RAW_SECTIONS === 'object') {
    const orderedIds = [];
    KNOWLEDGE_MODULES.forEach(mod => {
      (mod.sections || []).forEach(s => {
        if (s && s.id && RAW_SECTIONS[s.id]) orderedIds.push(s.id);
      });
    });
    Object.keys(RAW_SECTIONS).forEach(k => {
      if (!orderedIds.includes(k)) orderedIds.push(k);
    });
    orderedIds.forEach(id => {
      const sec = RAW_SECTIONS[id];
      if (sec) {
        const enriched = Object.assign({ id }, sec);
        SECTIONS_MAP[id] = enriched;
        SECTIONS_LIST.push(enriched);
      }
    });
  }

  function toTopicSkill(skill) {
    const s = String(skill || '').toLowerCase().trim();
    if (s === 'listening' || s === 'listen') return 'listen';
    return s || 'listen';
  }

  function toQuestionSkill(skill) {
    const s = String(skill || '').toLowerCase().trim();
    if (s === 'listen' || s === 'listening') return 'listening';
    return s || 'listening';
  }

  const SKILL_META = {
    listening: { topicKey: 'listen', label: '听力微精听', short: '听力', sprite: '07_listening_audio', tone: 'tone-autumn', badge: 'terracotta' },
    cloze: { topicKey: 'cloze', label: '选词填空', short: '选词', sprite: '03_thinking_hint', tone: 'tone-amber', badge: 'honey' },
    matching: { topicKey: 'matching', label: '长篇匹配', short: '匹配', sprite: '02_study_reading', tone: 'tone-emerald', badge: 'sage' },
    reading: { topicKey: 'reading', label: '仔细阅读', short: '阅读', sprite: '10_eureka_tip', tone: 'tone-sage', badge: 'sage' },
    translation: { topicKey: 'translation', label: '汉译英实战', short: '翻译', sprite: '06_writing_quill', tone: 'tone-copper', badge: 'slate' },
    writing: { topicKey: 'writing', label: '写作迁移', short: '写作', sprite: '06_writing_quill', tone: 'tone-burgundy', badge: 'rose' }
  };

  function getSkillMeta(skill) {
    return SKILL_META[toQuestionSkill(skill)] || SKILL_META.listening;
  }

  function getTopicSummary(skill) {
    const tk = toTopicSkill(skill);
    const qk = toQuestionSkill(skill);
    return TOPIC_SUMMARIES[tk] || TOPIC_SUMMARIES[qk] || {
      title: getSkillMeta(skill).label,
      formula: '抓主干、判词性、认替换、排陷阱',
      checklist: ['审清题干关键词', '定位原文依据句', '排除绝对化与偷换概念项'],
      quickTips: ['善用小克伴学思路提示', '错题会自动收入错词夹'],
      trapWarning: '警惕原词照搬却偷换主语或因果关系的经典四级干扰项。'
    };
  }

  const TRANSPARENT_1X1 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  function getSpriteSrc(spriteId) {
    return SPRITES[spriteId] || SPRITES['01_idle_smile'] || TRANSPARENT_1X1;
  }

  function getMantraList() {
    if (XIAOKE_MANTRAS.length) return XIAOKE_MANTRAS;
    if (Array.isArray(MANIFEST.sprites) && MANIFEST.sprites.length) {
      return MANIFEST.sprites.map(s => ({
        spriteId: s.id,
        label: s.zh_label || s.id,
        tag: s.en_label || '伴学口诀',
        mantra: (s.speech_lines && s.speech_lines[0]) || '稳步推进 12 天四级冲刺手账！',
        tip: (s.speech_lines && s.speech_lines[1]) || ''
      }));
    }
    return [{ spriteId: '01_idle_smile', label: '微笑待机', tag: '冲刺口诀', mantra: '每天 30 分钟高频带背 + 精准刷题，14 天内稳过四级！', tip: '' }];
  }

  /* -------------------- Crisp Inline SVG Icons (Zero Emojis) -------------------- */
  const ICON = {
    book: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    headphones: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    volume: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
    play: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>',
    pause: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    check: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    star: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    starFill: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    zoom: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    moon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    sun: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    refresh: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>'
  };

  /* -------------------- Warm Cocoa Study Board SVGs (6 Skills) -------------------- */
  const SKILL_SVGS = {
    listen: `<svg viewBox="0 0 260 120" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20,66 38,46 54,76 72,40 92,68 112,50 130,66" stroke="#e0703c" stroke-width="2.8"/>
      <polyline points="130,66 150,28 170,74 190,38 212,66 238,54" stroke="#65b38c" stroke-width="2.8"/>
      <circle cx="130" cy="66" r="7" fill="#e8b34e" stroke="#26201a" stroke-width="2"/>
      <line x1="130" y1="30" x2="130" y2="56" stroke="#e8b34e" stroke-width="1.8" stroke-dasharray="4 3"/>
      <rect x="86" y="8" width="88" height="21" rx="6" fill="#e8b34e"/>
      <text x="97" y="22" fill="#26201a" font-size="9.5" font-weight="800">BUT / SIGNAL</text>
      <text x="20" y="106" fill="#e6dac7" font-size="9.2" font-weight="700">PRE-READ RADAR</text>
      <text x="148" y="106" fill="#65b38c" font-size="9.2" font-weight="800">PARAPHRASE LOCK</text>
    </svg>`,
    cloze: `<svg viewBox="0 0 260 120" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="14" width="50" height="26" rx="6" fill="#e0703c"/>
      <rect x="74" y="14" width="50" height="26" rx="6" fill="#65b38c"/>
      <rect x="132" y="14" width="50" height="26" rx="6" fill="#e8b34e"/>
      <rect x="190" y="14" width="54" height="26" rx="6" fill="#df6b6b"/>
      <text x="34" y="31" fill="#fcf9f1" font-size="11" font-weight="800">n.</text>
      <text x="93" y="31" fill="#fcf9f1" font-size="11" font-weight="800">v.</text>
      <text x="146" y="31" fill="#26201a" font-size="11" font-weight="800">adj.</text>
      <text x="204" y="31" fill="#fcf9f1" font-size="11" font-weight="800">adv.</text>
      <path d="M99 42 Q99 66 130 76" stroke="#e8b34e" stroke-width="2.4" stroke-dasharray="4 3"/>
      <rect x="46" y="74" width="168" height="30" rx="7" fill="#352d24" stroke="#e8b34e" stroke-width="1.5"/>
      <text x="66" y="93" fill="#f5ede0" font-size="10.8" font-weight="800">15 WORDS -> 3 -> 1</text>
    </svg>`,
    matching: `<svg viewBox="0 0 260 120" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="94" height="88" rx="7" fill="#332b24" stroke="#e8b34e" stroke-width="1.5"/>
      <line x1="26" y1="34" x2="96" y2="34" stroke="#f5ede0" stroke-width="2" opacity="0.48"/>
      <rect x="26" y="46" width="68" height="18" rx="5" fill="#e0703c"/>
      <line x1="26" y1="78" x2="90" y2="78" stroke="#f5ede0" stroke-width="2" opacity="0.4"/>
      <rect x="156" y="14" width="88" height="22" rx="6" fill="#332b24" stroke="#8f7f6e" stroke-width="1.2"/>
      <rect x="156" y="45" width="88" height="28" rx="6" fill="#65b38c"/>
      <rect x="156" y="82" width="88" height="22" rx="6" fill="#332b24" stroke="#8f7f6e" stroke-width="1.2"/>
      <path d="M112 56 L149 59" stroke="#e8b34e" stroke-width="2.6"/>
      <polygon points="154,59 144,54 144,64" fill="#e8b34e"/>
      <text x="35" y="59" fill="#fcf9f1" font-size="9.5" font-weight="800">ANCHOR</text>
      <text x="172" y="63" fill="#26201a" font-size="10.5" font-weight="800">PARA [D]</text>
    </svg>`,
    reading: `<svg viewBox="0 0 260 120" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="18" y="14" width="130" height="92" rx="7" fill="#332b24" stroke="#8f7f6e" stroke-width="1.4"/>
      <line x1="30" y1="32" x2="134" y2="32" stroke="#f5ede0" stroke-width="2" opacity="0.42"/>
      <rect x="28" y="44" width="110" height="15" rx="4" fill="#e8b34e"/>
      <line x1="30" y1="72" x2="124" y2="72" stroke="#f5ede0" stroke-width="2" opacity="0.42"/>
      <line x1="30" y1="86" x2="128" y2="86" stroke="#f5ede0" stroke-width="2" opacity="0.34"/>
      <rect x="172" y="28" width="68" height="48" rx="8" fill="#e0703c"/>
      <line x1="140" y1="51" x2="170" y2="51" stroke="#65b38c" stroke-width="2.4" stroke-dasharray="4 3"/>
      <text x="184" y="56" fill="#fcf9f1" font-size="10.5" font-weight="800">VERIFY</text>
      <text x="35" y="55" fill="#26201a" font-size="8.8" font-weight="800">EVIDENCE LINE</text>
      <text x="174" y="96" fill="#65b38c" font-size="9" font-weight="800">5 TRAPS OUT</text>
    </svg>`,
    translation: `<svg viewBox="0 0 260 120" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="14" width="70" height="28" rx="6" fill="#e0703c"/>
      <rect x="94" y="14" width="70" height="28" rx="6" fill="#e8b34e"/>
      <rect x="172" y="14" width="72" height="28" rx="6" fill="#65b38c"/>
      <text x="27" y="32" fill="#fcf9f1" font-size="9.4" font-weight="800">MODIFIER</text>
      <text x="115" y="32" fill="#26201a" font-size="9.4" font-weight="800">CORE</text>
      <text x="189" y="32" fill="#26201a" font-size="9.4" font-weight="800">OBJECT</text>
      <path d="M129 44 L76 74" stroke="#e8b34e" stroke-width="2.4"/>
      <path d="M51 44 L178 74" stroke="#e0703c" stroke-width="2.2" stroke-dasharray="4 3"/>
      <rect x="28" y="76" width="90" height="28" rx="6" fill="#65b38c"/>
      <rect x="128" y="76" width="106" height="28" rx="6" fill="#352d24" stroke="#e8b34e" stroke-width="1.4"/>
      <text x="45" y="94" fill="#26201a" font-size="10" font-weight="800">SVO CORE</text>
      <text x="140" y="94" fill="#f5ede0" font-size="9.2" font-weight="800">+ POST-CLAUSE</text>
    </svg>`,
    writing: `<svg viewBox="0 0 260 120" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="14" width="68" height="72" rx="7" fill="#e0703c"/>
      <rect x="96" y="14" width="68" height="72" rx="7" fill="#e8b34e"/>
      <rect x="176" y="14" width="68" height="72" rx="7" fill="#65b38c"/>
      <text x="30" y="42" fill="#fcf9f1" font-size="10.2" font-weight="800">PARA 1</text>
      <text x="31" y="60" fill="#fcf9f1" font-size="9" font-weight="700">STANCE</text>
      <text x="110" y="42" fill="#26201a" font-size="10.2" font-weight="800">PARA 2</text>
      <text x="106" y="60" fill="#26201a" font-size="9" font-weight="700">2 PROOFS</text>
      <text x="190" y="42" fill="#26201a" font-size="10.2" font-weight="800">PARA 3</text>
      <text x="189" y="60" fill="#26201a" font-size="9" font-weight="700">ACTION</text>
      <rect x="16" y="95" width="228" height="14" rx="7" fill="#332b24" stroke="#8f7f6e" stroke-width="1.2"/>
      <rect x="16" y="95" width="166" height="14" rx="7" fill="#65b38c"/>
      <text x="188" y="105" fill="#e8b34e" font-size="8.6" font-weight="800">120-180W</text>
    </svg>`
  };

  /* -------------------- Shared Persisted State -------------------- */
  function loadState() {
    const firstSecId = (SECTIONS_LIST[0] && SECTIONS_LIST[0].id) || 't_sprint_plan';

    let raw = {};
    try {
      raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
    } catch (_e) {
      raw = {};
    }

    return {
      // Persisted keys (EXACT shared contract with Mobile Edition)
      answers: (raw.answers && typeof raw.answers === 'object') ? raw.answers : {},
      favorites: (raw.favorites && typeof raw.favorites === 'object') ? raw.favorites : {},
      studiedSections: (raw.studiedSections && typeof raw.studiedSections === 'object') ? raw.studiedSections : {},
      sprintDaysDone: (raw.sprintDaysDone && typeof raw.sprintDaysDone === 'object') ? raw.sprintDaysDone : {},
      vocabProgress: (raw.vocabProgress && typeof raw.vocabProgress === 'object') ? raw.vocabProgress : {},
      vocabDay: Math.max(1, Math.min(12, Number(raw.vocabDay) || 1)),
      streak: Number(raw.streak) || 0,
      theme: raw.theme === 'dark' ? 'dark' : 'light',

      // Runtime UI state
      activeView: 'knowledge',
      activeSection: firstSecId,
      directoryExpanded: true,
      sectionDrillState: {},

      // Vocab runtime
      vocabMode: 'recite', // 'recite' | 'flashcard' | 'quiz' | 'confusable'
      vocabCustomIds: null,
      reciteIdx: 0,
      reciteBeat: 'word',
      recitePlaying: false,
      reciteRate: 1.0,
      reciteRepeat: 2,
      reciteIncludeZh: true,
      flashQueue: [],
      flashCursor: 0,
      flashFlipped: false,
      quizBlind: false,
      quizWordId: null,
      quizChoices: [],
      quizAnswered: null,
      quizCombo: 0,
      confusableSolved: {},

      // Practice runtime (adaptive drill + authentic full real papers)
      practiceMode: 'adaptive', // 'adaptive' | 'real_paper'
      skillFilter: 'all',
      practiceHistory: [],
      practiceIdx: 0,
      practiceSeq: 0,
      curveLevel: 1.5,
      cardFlipped: false,

      // Notebook runtime
      notebookTab: 'wrong', // 'wrong' | 'vocab' | 'favorites'
      notebookQuery: ''
    };
  }

  const VIEW_ORDER = ['knowledge', 'vocab', 'practice', 'mastery', 'notebook'];
  const VOCAB_MODE_ORDER = ['recite', 'flashcard', 'quiz', 'confusable'];
  const NOTEBOOK_TAB_ORDER = ['wrong', 'vocab', 'favorites'];

  function runSnapshotTurn(getTarget, updateFn, dir = 'next', paperStyle = 'grid', duration = 540, getTargetAfter = null) {
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
  let reciteCtrl = null;
  let listenCtrl = null;
  let preReadTimer = null;
  let mantraIdx = 0;

  function saveState() {
    try {
      let existing = {};
      try {
        existing = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
      } catch (_inner) {
        existing = {};
      }
      localStorage.setItem(STORE_KEY, JSON.stringify(Object.assign(existing, {
        answers: state.answers,
        favorites: state.favorites,
        studiedSections: state.studiedSections,
        sprintDaysDone: state.sprintDaysDone,
        vocabProgress: state.vocabProgress,
        vocabDay: state.vocabDay,
        streak: state.streak,
        theme: state.theme
      })));
    } catch (_e) { /* ignore storage quota or private mode */ }
  }

  function escapeHTML(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function prefersReducedMotion() {
    return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function stopAllAudioAndTimers() {
    if (preReadTimer) { clearInterval(preReadTimer); preReadTimer = null; }
    if (reciteCtrl && typeof reciteCtrl.stop === 'function') {
      try { reciteCtrl.stop(); } catch (_e) {}
    }
    reciteCtrl = null;
    state.recitePlaying = false;
    if (listenCtrl && typeof listenCtrl.stop === 'function') {
      try { listenCtrl.stop(); } catch (_e) {}
    }
    listenCtrl = null;
    if (window.Cet4Speech && typeof window.Cet4Speech.stop === 'function') {
      try { window.Cet4Speech.stop(); } catch (_e) {}
    }
  }

  /* ========================================================================
     GENTLE AUTUMN-PETAL & WARM-PAPER CONFETTI ENGINE (Zero shadowBlur)
     ======================================================================== */
  function getEventOrigin(e, fallbackEl) {
    if (e && typeof e.clientX === 'number' && (e.clientX > 0 || e.clientY > 0)) {
      return { x: e.clientX, y: e.clientY };
    }
    if (fallbackEl && fallbackEl.getBoundingClientRect) {
      const r = fallbackEl.getBoundingClientRect();
      if (r.width > 0 || r.height > 0) return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    return { x: window.innerWidth * 0.54, y: window.innerHeight * 0.42 };
  }

  const FireworksFX = (() => {
    let cvs = null, ctx = null, rafId = null;
    let particles = [], rings = [];
    const PALETTE = ['#cf5c28', '#3f7a5c', '#e6aa3a', '#c96464', '#fcf7e8', '#d8be98'];

    function ensureCanvas() {
      if (!cvs) {
        cvs = document.getElementById('fx-fireworks-canvas');
        if (!cvs) {
          cvs = document.createElement('canvas');
          cvs.id = 'fx-fireworks-canvas';
          document.body.appendChild(cvs);
        }
        ctx = cvs.getContext('2d');
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth, h = window.innerHeight;
      if (cvs.width !== Math.round(w * dpr) || cvs.height !== Math.round(h * dpr)) {
        cvs.width = Math.round(w * dpr);
        cvs.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      return { w, h };
    }

    function drawPetal(c, sz) {
      c.beginPath();
      c.moveTo(0, -sz);
      c.bezierCurveTo(sz * 0.78, -sz * 0.42, sz * 0.62, sz * 0.52, 0, sz);
      c.bezierCurveTo(-sz * 0.62, sz * 0.52, -sz * 0.78, -sz * 0.42, 0, -sz);
      c.closePath();
      c.fill();
    }

    function drawSpark(c, r) {
      c.beginPath();
      for (let i = 0; i < 8; i++) {
        const rad = i % 2 === 0 ? r : r * 0.32;
        const a = (i * Math.PI) / 4;
        if (i === 0) c.moveTo(Math.cos(a) * rad, Math.sin(a) * rad);
        else c.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
      }
      c.closePath();
      c.fill();
    }

    function spawnBurst(cx, cy, scale) {
      rings.push({ x: cx, y: cy, r: 10, maxR: 96 * scale, color: '#cf5c28', lw: 2.2, life: 1 });
      rings.push({ x: cx, y: cy, r: 5, maxR: 62 * scale, color: '#e6aa3a', lw: 1.8, life: 1 });

      const count = Math.round(36 * scale);
      const shapes = ['petal', 'strip', 'spark'];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
        const spd = (2.8 + Math.random() * 5.8) * scale;
        particles.push({
          shape: shapes[i % shapes.length],
          x: cx,
          y: cy,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1.9,
          drag: 0.955,
          grav: 0.09,
          sway: Math.random() * Math.PI * 2,
          swaySpd: 0.08 + Math.random() * 0.08,
          size: (5 + Math.random() * 5.5) * scale,
          rot: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.14,
          color: PALETTE[i % PALETTE.length],
          life: 1,
          decay: 0.012 + Math.random() * 0.007
        });
      }
    }

    function tick() {
      const { w, h } = ensureCanvas();
      ctx.clearRect(0, 0, w, h);

      for (let i = rings.length - 1; i >= 0; i--) {
        const rg = rings[i];
        rg.life -= 0.042;
        if (rg.life <= 0) { rings.splice(i, 1); continue; }
        const rad = rg.r + (rg.maxR - rg.r) * (1 - Math.pow(rg.life, 3));
        ctx.save();
        ctx.globalAlpha = Math.max(0, rg.life * 0.55);
        ctx.strokeStyle = rg.color;
        ctx.lineWidth = Math.max(1, rg.lw * rg.life);
        ctx.beginPath();
        ctx.arc(rg.x, rg.y, rad, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.grav;
        p.sway += p.swaySpd;
        p.x += p.vx + Math.sin(p.sway) * 0.45;
        p.y += p.vy;
        p.rot += p.vRot;

        const sz = Math.max(2, p.size * (0.55 + 0.45 * p.life));
        ctx.save();
        ctx.globalAlpha = Math.min(1, p.life * 1.15);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'petal') {
          drawPetal(ctx, sz);
        } else if (p.shape === 'spark') {
          drawSpark(ctx, sz * 0.88);
        } else {
          ctx.fillRect(-sz * 0.72, -sz * 0.34, sz * 1.44, sz * 0.68);
        }
        ctx.restore();
      }

      if (particles.length || rings.length) {
        rafId = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, w, h);
        rafId = null;
      }
    }

    function launch(intensity = 1, origin = null) {
      if (prefersReducedMotion()) return;
      const { w, h } = ensureCanvas();
      const ox = origin && typeof origin.x === 'number' ? Math.max(60, Math.min(w - 60, origin.x)) : w * 0.54;
      const oy = origin && typeof origin.y === 'number' ? Math.max(60, Math.min(h - 60, origin.y)) : h * 0.42;
      spawnBurst(ox, oy, intensity >= 2 ? 1.14 : 0.92);
      if (intensity >= 2) {
        setTimeout(() => { spawnBurst(Math.max(80, ox - 110), Math.max(80, oy - 80), 0.74); if (!rafId) rafId = requestAnimationFrame(tick); }, 150);
        setTimeout(() => { spawnBurst(Math.min(w - 80, ox + 115), Math.max(80, oy - 70), 0.74); if (!rafId) rafId = requestAnimationFrame(tick); }, 260);
      }
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    return { launch };
  })();

  /* -------------------- Companion Bridge (XiaoKeAssistant) -------------------- */
  function buildCompanionContext() {
    const curInst = state.activeView === 'practice' && state.practiceMode !== 'real_paper' && state.practiceHistory.length
      ? state.practiceHistory[Math.min(Math.max(0, state.practiceIdx), state.practiceHistory.length - 1)]
      : null;
    const activeQuestion = curInst ? QUESTION_BANK.find(q => q.id === curInst.refId) : null;
    const dayWords = getActiveVocabWords();
    const activeWord = state.activeView === 'vocab' ? (dayWords[state.reciteIdx] || dayWords[0] || null) : null;
    const st = computeReadinessStats();
    const answered = Boolean(curInst && curInst.ans && curInst.ans.checked);
    const activeSecObj = SECTIONS_MAP[state.activeSection] || SECTIONS_LIST[0] || null;
    const weakest = st.skills.slice().sort((a, b) => a.pct - b.pct)[0];
    const weakestMeta = weakest ? getSkillMeta(weakest.skill) : null;

    return {
      view: state.activeView,
      theme: state.theme,
      sectionId: state.activeSection,
      activeSection: state.activeSection,
      sectionObj: activeSecObj,
      vocabDay: state.vocabDay,
      vocabMode: state.vocabMode === 'quiz' ? 'audio_quiz' : state.vocabMode,
      vocabWord: activeWord,
      audioPlaying: Boolean(state.recitePlaying),
      activeWord,
      skillFilter: state.skillFilter,
      skill: activeQuestion ? toQuestionSkill(activeQuestion.skill || activeQuestion.type) : state.skillFilter,
      activeQuestion,
      answered,
      questionAnswered: answered,
      streak: state.streak,
      readiness: st.overallPct,
      overallPct: st.overallPct,
      masterySummary: { overall: st.overallPct, weakestName: weakestMeta ? weakestMeta.label : '' },
      wrongCount: st.wrongCount,
      notebookSummary: { wrongCount: st.wrongCount, favCount: st.favCount, fuzzyVocabCount: st.weakWordCount }
    };
  }

  function syncCompanionContext() {
    if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.updateContext === 'function') {
      window.XiaoKeAssistant.updateContext(buildCompanionContext());
    }
  }

  function reactXiaoKe(spriteId, text, durationMs = 4500) {
    if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.react === 'function') {
      window.XiaoKeAssistant.react(spriteId, text, durationMs);
    }
  }

  /* -------------------- Theme Toggle ("午后书桌" <-> "台灯夜读") -------------------- */
  function applyTheme(theme) {
    state.theme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    document.body.classList.toggle('dark', state.theme === 'dark');
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', state.theme === 'dark' ? '#181410' : '#ebe2d2');
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = state.theme === 'dark'
        ? `${ICON.sun}<span>午后书桌</span>`
        : `${ICON.moon}<span>台灯夜读</span>`;
    }
    saveState();
    syncCompanionContext();
  }

  /* ========================================================================
     METRICS, EBBINGHAUS VOCAB STATS & READINESS CALCULATIONS
     ======================================================================== */
  function computeVocabStats(wordList = VOCAB_WORDS) {
    let known = 0, fuzzy = 0, fresh = 0, dueReview = 0;
    wordList.forEach(w => {
      const p = state.vocabProgress[w.id];
      if (!p || p.status === 'new') {
        fresh += 1;
        if (p && p.wrongCnt > 0) dueReview += 1;
      } else if (p.status === 'known') {
        known += 1;
        if (p.nextDay && p.nextDay <= state.vocabDay) dueReview += 1;
      } else {
        fuzzy += 1;
        dueReview += 1;
      }
    });
    const total = wordList.length || 1;
    const pct = Math.round(((known + fuzzy * 0.45) / total) * 100);
    return { total: wordList.length, known, fuzzy, fresh, dueReview, pct };
  }

  function computeSkillMastery(skillKey) {
    const qSkill = toQuestionSkill(skillKey);
    const tSkill = toTopicSkill(skillKey);
    const qs = QUESTION_BANK.filter(q => toQuestionSkill(q.skill || q.type) === qSkill);
    const done = qs.filter(q => state.answers[q.id] && state.answers[q.id].checked);
    const right = done.filter(q => state.answers[q.id].correct);

    const topicObj = MASTERY_TOPICS.find(t => toTopicSkill(t.id) === tSkill);
    const secIds = (topicObj && Array.isArray(topicObj.sectionIds) && topicObj.sectionIds.length)
      ? topicObj.sectionIds
      : SECTIONS_LIST.filter(s => toTopicSkill(s.skillId) === tSkill).map(s => s.id);
    const studiedCnt = secIds.filter(id => state.studiedSections[id]).length;
    const studyPts = secIds.length ? Math.round((studiedCnt / secIds.length) * 25) : 0;
    const pracPts = qs.length ? Math.round((right.length / qs.length) * 75) : 0;

    return {
      skill: qSkill,
      topicKey: tSkill,
      pct: Math.min(100, studyPts + pracPts),
      studiedCnt,
      secTotal: secIds.length,
      done: done.length,
      right: right.length,
      wrong: done.length - right.length,
      total: qs.length
    };
  }

  function getRealPaperWrongList() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
      return Array.isArray(raw.realPaperWrong) ? raw.realPaperWrong : [];
    } catch (_e) {
      return [];
    }
  }

  function saveRealPaperWrongList(list) {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
      raw.realPaperWrong = Array.isArray(list) ? list : [];
      localStorage.setItem(STORE_KEY, JSON.stringify(raw));
    } catch (_e) {}
  }

  function mergeRealPaperWrongItems(items) {
    if (!Array.isArray(items) || !items.length) return;
    const prev = getRealPaperWrongList();
    const byKey = new Map(prev.map(it => [it.key || `${it.paperId}_${it.num}`, it]));
    items.forEach(it => {
      if (!it) return;
      const k = it.key || `${it.paperId || 'rp'}_${it.num || 0}`;
      byKey.set(k, Object.assign({ key: k, savedAt: Date.now() }, it));
    });
    saveRealPaperWrongList(Array.from(byKey.values()));
    updateGlobalStats();
    reactXiaoKe('05_encourage_wrong', `已把 ${items.length} 道全卷真题错题夹进「错词夹」，翻开手账随时可以集中复盘！`, 4200);
  }

  function computeReadinessStats() {
    const vocab = computeVocabStats(VOCAB_WORDS);
    const sprintDoneCnt = Object.keys(state.sprintDaysDone).filter(k => state.sprintDaysDone[k]).length;
    const sprintTotal = SPRINT_PLAN.length || 12;
    const sprintPct = Math.round((sprintDoneCnt / sprintTotal) * 100);

    const skills = ['listening', 'cloze', 'matching', 'reading', 'translation', 'writing'].map(computeSkillMastery);
    const skillAvg = skills.length ? Math.round(skills.reduce((a, b) => a + b.pct, 0) / skills.length) : 0;
    const overallPct = Math.round(vocab.pct * 0.35 + skillAvg * 0.45 + sprintPct * 0.20);

    let rank = '手账冲刺见习生', sprite = '01_idle_smile', desc = '跟着 12 天手账日历每天语音带背 + 精练真题，14 天稳步把分值攥在手里！';
    if (overallPct >= 82) {
      rank = '四级 550+ 冲刺优等生'; sprite = '09_proud_streak';
      desc = '词汇留存、听力信号词与全题型正确率都已进入高分档，从容上考场即可稳拿高分！';
    } else if (overallPct >= 55) {
      rank = '高频题型破局手账家'; sprite = '04_cheer_correct';
      desc = '核心提分节奏已经走顺，重点补强下方最薄弱的 1–2 个题型就能稳锁高分！';
    } else if (overallPct >= 25) {
      rank = '书桌冲刺进阶生'; sprite = '02_study_reading';
      desc = '破题手法与高频词库已经开张，每天盖一枚「済」印章 + 跟读一组语音带背！';
    }

    const wrongQs = QUESTION_BANK.filter(q => state.answers[q.id]?.checked && !state.answers[q.id]?.correct);
    const rpWrongCnt = getRealPaperWrongList().length;
    const favQs = QUESTION_BANK.filter(q => state.favorites[q.id]);
    const weakWords = VOCAB_WORDS.filter(w => {
      const p = state.vocabProgress[w.id];
      return p && (p.status === 'fuzzy' || (p.wrongCnt || 0) > 0);
    });

    return {
      vocab, sprintDoneCnt, sprintTotal, sprintPct, skills, skillAvg, overallPct,
      rank, sprite, desc, wrongCount: wrongQs.length + rpWrongCnt, favCount: favQs.length, weakWordCount: weakWords.length
    };
  }

  function updateGlobalStats() {
    const st = computeReadinessStats();
    const answeredTotal = Object.values(state.answers).filter(a => a && a.checked).length;
    const studiedCount = Object.keys(state.studiedSections).filter(k => state.studiedSections[k]).length;
    const paperCount = Array.isArray(window.REAL_CET4_PAPERS) ? window.REAL_CET4_PAPERS.length : 6;

    const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setTxt('nav-knowledge-badge', `${studiedCount}/${SECTIONS_LIST.length || 14}`);
    setTxt('nav-vocab-badge', `${st.vocab.known}/${st.vocab.total}`);
    setTxt('nav-practice-badge', `${answeredTotal}/${QUESTION_BANK.length}`);
    setTxt('nav-mastery-badge', `${st.overallPct}%`);
    setTxt('nav-notebook-badge', String(st.wrongCount + st.weakWordCount));

    setTxt('rail-day-val', `Day ${st.sprintDoneCnt}/${st.sprintTotal}`);
    setTxt('rail-vocab-val', `词 ${st.vocab.known}/${st.vocab.total}`);

    setTxt('hero-sprint-pct', `打卡 ${st.sprintDoneCnt} / ${st.sprintTotal} 天 · 词汇留存 ${st.vocab.pct}%`);
    const fill = document.getElementById('hero-sprint-fill');
    if (fill) fill.style.width = `${Math.max(4, Math.round((st.sprintDoneCnt / Math.max(1, st.sprintTotal)) * 100))}%`;

    setTxt('stat-vocab-done', `${st.vocab.known} / ${st.vocab.total}`);
    setTxt('stat-sprint-days', `${st.sprintDoneCnt} / ${st.sprintTotal} 天`);
    setTxt('stat-prac-done', `${answeredTotal} / ${QUESTION_BANK.length}`);
    setTxt('stat-real-papers', `${paperCount} 套`);
    setTxt('stat-readiness', `${st.overallPct}%`);
  }

  /* ========================================================================
     LIGHTBOX ZOOM FOR 60FPS INTERACTIVE ANIMATIONS
     ======================================================================== */
  function openAnimLightbox(animId, title, caption) {
    if (window.Cet4AnimEngine && typeof window.Cet4AnimEngine.openLightbox === 'function') {
      try {
        window.Cet4AnimEngine.openLightbox(animId, title, caption);
        return;
      } catch (_e) { /* fallback to built-in overlay */ }
    }
    const overlay = document.getElementById('anim-lightbox');
    const body = document.getElementById('lightbox-body');
    const titleEl = document.getElementById('lightbox-title');
    const capEl = document.getElementById('lightbox-caption');
    if (!overlay || !body) return;
    if (titleEl) titleEl.textContent = title || '交互动画全屏实验台';
    if (capEl) capEl.textContent = caption || '';
    body.innerHTML = `<div id="lightbox-anim-mount" style="min-height:480px"></div>`;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      const mountEl = document.getElementById('lightbox-anim-mount');
      if (mountEl && window.Cet4AnimEngine && typeof window.Cet4AnimEngine.mount === 'function') {
        window.Cet4AnimEngine.mount(mountEl, animId, { isLightbox: true, height: 470 });
      }
    });
  }

  function closeAnimLightbox() {
    if (window.Cet4AnimEngine && typeof window.Cet4AnimEngine.closeLightbox === 'function') {
      try { window.Cet4AnimEngine.closeLightbox(); } catch (_e) {}
    }
    const overlay = document.getElementById('anim-lightbox');
    const body = document.getElementById('lightbox-body');
    if (!overlay) return;
    if (body && window.Cet4AnimEngine && typeof window.Cet4AnimEngine.destroy === 'function') {
      const m = body.querySelector('#lightbox-anim-mount');
      if (m) { try { window.Cet4AnimEngine.destroy(m); } catch (_e) {} }
    }
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { if (!overlay.classList.contains('open') && body) body.innerHTML = ''; }, 240);
  }

  /* ========================================================================
     VIEW NAVIGATION
     ======================================================================== */
  function unmountRealPaperStudio() {
    if (window.RealPaperStudio && typeof window.RealPaperStudio.unmount === 'function') {
      try { window.RealPaperStudio.unmount(); } catch (_e) {}
    }
  }

  function switchView(viewName, opts = {}) {
    stopAllAudioAndTimers();
    const shellEl = document.querySelector('.app-shell');
    if (shellEl && window.TechoPageTurn && typeof window.TechoPageTurn.cancelStageTurn === 'function') {
      window.TechoPageTurn.cancelStageTurn(shellEl);
    }
    const prevView = state.activeView;
    const prevIdx = VIEW_ORDER.indexOf(prevView);
    const nextIdx = VIEW_ORDER.indexOf(viewName);
    const turnDir = (prevView && prevView !== viewName && !opts.noAnim)
      ? ((prevIdx >= 0 && nextIdx >= 0 && nextIdx < prevIdx) ? 'prev' : 'next')
      : null;
    const prevEl = prevView ? document.getElementById(`view-${prevView}`) : null;
    const nextEl = document.getElementById(`view-${viewName}`);
    const canCurl = Boolean(turnDir && prevEl && nextEl && shellEl && window.TechoPageTurn && typeof window.TechoPageTurn.turnLayers === 'function');

    if (viewName !== 'practice') unmountRealPaperStudio();
    if (!opts.keepScroll && canCurl) window.scrollTo({ top: 0, behavior: 'auto' });

    state.activeView = viewName;
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.toggle('active', b.dataset.view === viewName));
    document.querySelectorAll('.view-section').forEach(sec => {
      if (canCurl && sec === prevEl) sec.classList.add('active');
      else sec.classList.toggle('active', sec === nextEl);
    });

    if (viewName === 'knowledge') {
      renderSprintRoadmap();
      renderZineDirectory();
      renderKnowledgeReader();
    } else if (viewName === 'vocab') {
      renderVocabView();
    } else if (viewName === 'practice') {
      renderPracticeView();
    } else if (viewName === 'mastery') {
      renderMasteryView();
    } else if (viewName === 'notebook') {
      renderNotebookView();
    }

    if (canCurl) {
      window.TechoPageTurn.turnLayers(shellEl, prevEl, nextEl, {
        dir: turnDir,
        mode: 'view',
        paperStyle: 'grid',
        duration: 560,
        onComplete: () => {
          if (state.activeView !== prevView) prevEl.classList.remove('active');
        }
      });
    } else if (!opts.keepScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateGlobalStats();
    syncCompanionContext();
  }

  /* ========================================================================
     VIEW 1: HOBONICHI DAILY PLANNER + 10-STICKER STRIP + BOOK TOC + LESSON
     ======================================================================== */
  function getPhaseBandClass(dayNum) {
    const d = Number(dayNum) || 1;
    if (d <= 4) return 'phase-1';
    if (d <= 6) return 'phase-2';
    if (d <= 9) return 'phase-3';
    return 'phase-4';
  }

  function renderSprintRoadmap() {
    const host = document.getElementById('sprint-roadmap-grid');
    if (!host) return;
    host.innerHTML = SPRINT_PLAN.map(item => {
      const done = Boolean(state.sprintDaysDone[item.day]);
      const isActive = item.vocabDay === state.vocabDay;
      const firstSec = Array.isArray(item.sectionIds) && item.sectionIds[0] ? item.sectionIds[0] : '';
      const dCode = `Day ${String(item.day).padStart(2, '0')}`;
      return `
        <article class="planner-day-box ${done ? 'is-done' : ''} ${isActive ? 'is-active' : ''}" data-sday="${item.day}">
          <div class="planner-date-head ${getPhaseBandClass(item.day)}">
            <span class="planner-day-label">
              <span class="planner-day-num">${dCode}</span>
              <span class="planner-mins">${item.minutes || 65}m</span>
            </span>
            <button type="button" class="planner-check-btn" data-toggle-sday="${item.day}" title="打卡盖章 ${dCode}">${done ? ICON.check : ''}</button>
          </div>
          <div class="planner-memo-body">
            ${done ? '<span class="hanko-done-seal" aria-hidden="true">済</span>' : ''}
            <div class="planner-title">${escapeHTML(item.title)}</div>
            <div class="planner-phase-note">${escapeHTML(item.phase || '')}</div>
            <div class="planner-links">
              <button type="button" class="planner-link-btn" data-jump-vday="${item.vocabDay || item.day}">词包</button>
              ${firstSec ? `<button type="button" class="planner-link-btn accent" data-jump-ssec="${firstSec}">精讲</button>` : '<span></span>'}
              <button type="button" class="planner-link-btn" data-jump-sskill="${toQuestionSkill(item.practiceSkill || 'listening')}">刷题</button>
            </div>
          </div>
        </article>`;
    }).join('');

    host.querySelectorAll('[data-toggle-sday]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const d = btn.dataset.toggleSday;
        state.sprintDaysDone[d] = !state.sprintDaysDone[d];
        saveState();
        updateGlobalStats();
        renderSprintRoadmap();
        if (state.sprintDaysDone[d]) {
          FireworksFX.launch(1, getEventOrigin(e, btn));
          reactXiaoKe('09_proud_streak', `Day ${String(d).padStart(2, '0')} 红泥「済」章已盖好！稳稳按节奏推进手账吧～`, 4200);
        }
      };
    });
    host.querySelectorAll('[data-jump-vday]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        state.vocabDay = Number(btn.dataset.jumpVday) || 1;
        state.vocabCustomIds = null;
        state.reciteIdx = 0;
        saveState();
        switchView('vocab');
      };
    });
    host.querySelectorAll('[data-jump-ssec]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        selectSection(btn.dataset.jumpSsec, true);
      };
    });
    host.querySelectorAll('[data-jump-sskill]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        launchSkillPractice(btn.dataset.jumpSskill);
      };
    });
  }

  function renderXiaoKeRibbon() {
    const strip = document.getElementById('xiaoke-ribbon-strip');
    if (!strip) return;
    const list = getMantraList();
    strip.innerHTML = list.map((m, i) => `
      <button type="button" class="xiaoke-pick-btn ${i === mantraIdx ? 'active' : ''}" data-midx="${i}" data-sprite="${m.spriteId}" title="${escapeHTML(m.label)}">
        <img src="${getSpriteSrc(m.spriteId)}" alt="${escapeHTML(m.label)}">
        <span>${String(i + 1).padStart(2, '0')}</span>
      </button>`).join('');

    strip.querySelectorAll('.xiaoke-pick-btn').forEach(btn => {
      btn.onclick = () => {
        mantraIdx = Number(btn.dataset.midx) || 0;
        const m = list[mantraIdx] || list[0];
        strip.querySelectorAll('.xiaoke-pick-btn').forEach(b => b.classList.toggle('active', b === btn));
        const heroImg = document.getElementById('hero-mascot-img');
        if (heroImg) {
          heroImg.src = getSpriteSrc(m.spriteId);
          heroImg.classList.remove('mascot-pop-anim');
          void heroImg.offsetWidth;
          heroImg.classList.add('mascot-pop-anim');
        }
        const hs = document.getElementById('hero-speech');
        if (hs) hs.textContent = `[${m.label}] ${m.mantra}${m.tip ? ' —— ' + m.tip : ''}`;
        reactXiaoKe(m.spriteId, m.mantra, 4800);
      };
    });
  }

  function renderZineDirectory() {
    const grid = document.getElementById('zine-directory-grid');
    const toggleBtn = document.getElementById('btn-toggle-directory');
    if (!grid) return;

    grid.style.display = state.directoryExpanded ? 'grid' : 'none';
    if (toggleBtn) toggleBtn.textContent = state.directoryExpanded ? '收起总目录' : '展开 6 章手账目录';

    const activeSec = SECTIONS_MAP[state.activeSection] || SECTIONS_LIST[0];
    grid.innerHTML = KNOWLEDGE_MODULES.map((mod, idx) => {
      const secs = Array.isArray(mod.sections) ? mod.sections : [];
      const hasActive = activeSec && secs.some(s => s.id === activeSec.id);
      const chCode = `CH.${String(idx + 1).padStart(2, '0')}`;
      return `
        <div class="toc-chapter-card ${hasActive ? 'has-active' : ''}">
          <div class="toc-ch-head">
            <span class="toc-ch-code">${chCode}</span>
            <span class="toc-ch-title">${escapeHTML(mod.title)}</span>
            <span class="toc-leader-dots" aria-hidden="true"></span>
            <span class="toc-ch-share">${escapeHTML(mod.scoreShare || `${secs.length} 节`)}</span>
          </div>
          <div class="toc-sec-list">
            ${secs.map(s => {
              const studied = Boolean(state.studiedSections[s.id]);
              const active = activeSec && activeSec.id === s.id;
              return `
                <button type="button" class="toc-sec-row ${active ? 'active' : ''} ${studied ? 'studied' : ''}" data-dir-sec="${s.id}">
                  <span class="toc-sec-name">${escapeHTML(s.title)}</span>
                  <span class="toc-leader-dots" aria-hidden="true"></span>
                  <span class="toc-sec-status">${studied ? '済' : `${s.minutes || 8}m`}</span>
                </button>`;
            }).join('')}
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('[data-dir-sec]').forEach(btn => {
      btn.onclick = () => selectSection(btn.dataset.dirSec, true);
    });
  }

  function renderLessonSwitcher(activeSec) {
    const switcher = document.getElementById('zine-lesson-switcher');
    if (!switcher) return;
    const activeMod = KNOWLEDGE_MODULES.find(m => (m.sections || []).some(s => s.id === activeSec.id)) || KNOWLEDGE_MODULES[0];
    const modSections = activeMod && Array.isArray(activeMod.sections) ? activeMod.sections : SECTIONS_LIST;

    switcher.innerHTML = `
      <div class="switcher-chapters-row">
        ${KNOWLEDGE_MODULES.map((m, idx) => {
          const isCurMod = activeMod && m.id === activeMod.id;
          const firstId = m.sections && m.sections[0] ? m.sections[0].id : '';
          return `
            <button type="button" class="switcher-ch-btn ${isCurMod ? 'active' : ''}" data-sw-ch="${firstId}">
              <span>CH.${String(idx + 1).padStart(2, '0')}</span>
              <span>${escapeHTML(m.title)}</span>
            </button>`;
        }).join('')}
      </div>
      <div class="switcher-sections-row">
        <span style="font-family:var(--font-num);font-size:11px;font-weight:700;color:var(--text-muted)">本章节选：</span>
        ${modSections.map(s => {
          const studied = Boolean(state.studiedSections[s.id]);
          const isCur = activeSec && s.id === activeSec.id;
          return `
            <button type="button" class="switcher-sec-btn ${isCur ? 'active' : ''} ${studied ? 'studied' : ''}" data-sw-sec="${s.id}">
              <span class="sec-dot"></span>
              <span>${escapeHTML(s.title)}</span>
            </button>`;
        }).join('')}
      </div>`;

    switcher.querySelectorAll('[data-sw-ch]').forEach(btn => {
      btn.onclick = () => { if (btn.dataset.swCh) selectSection(btn.dataset.swCh, false); };
    });
    switcher.querySelectorAll('[data-sw-sec]').forEach(btn => {
      btn.onclick = () => selectSection(btn.dataset.swSec, false);
    });
  }

  function selectSection(secId, scrollToReader = false) {
    if (!SECTIONS_MAP[secId]) return;
    const prevIdx = SECTIONS_LIST.findIndex(s => s.id === state.activeSection);
    const nextIdx = SECTIONS_LIST.findIndex(s => s.id === secId);
    const dir = (state.activeSection !== secId && prevIdx >= 0 && nextIdx >= 0)
      ? (nextIdx < prevIdx ? 'prev' : 'next')
      : null;
    state.activeSection = secId;
    if (scrollToReader) {
      document.getElementById('knowledge-anchor')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
    const update = () => {
      renderZineDirectory();
      renderKnowledgeReader();
    };
    if (dir) {
      runSnapshotTurn(() => document.getElementById('section-reader-host'), update, dir, 'grid', 540);
    } else {
      update();
    }
    syncCompanionContext();
  }

  function renderKnowledgeReader() {
    const host = document.getElementById('section-reader-host');
    if (!host) return;
    const sec = SECTIONS_MAP[state.activeSection] || SECTIONS_LIST[0];
    if (!sec) {
      host.innerHTML = '<div class="techo-card">知识点数据加载中，请先运行打包脚本。</div>';
      return;
    }

    renderLessonSwitcher(sec);

    const secIdx = SECTIONS_LIST.findIndex(s => s.id === sec.id);
    const prevSec = secIdx > 0 ? SECTIONS_LIST[secIdx - 1] : null;
    const nextSec = secIdx >= 0 && secIdx < SECTIONS_LIST.length - 1 ? SECTIONS_LIST[secIdx + 1] : null;
    const meta = getSkillMeta(sec.skillId || 'listening');
    const studied = Boolean(state.studiedSections[sec.id]);
    const drillSt = state.sectionDrillState[sec.id] || { picked: null, showHint: false };
    const drill = sec.drill || null;
    const letters = ['A', 'B', 'C', 'D'];

    const stepsHTML = Array.isArray(sec.strategySteps) && sec.strategySteps.length
      ? `<div class="strategy-steps-grid">
          ${sec.strategySteps.map((st, idx) => `
            <div class="strategy-step-card">
              <div class="strategy-step-head">
                <span class="strategy-step-idx">STEP ${String(st.step || (idx + 1)).padStart(2, '0')}</span>
                <span class="strategy-step-title">${escapeHTML(st.title)}</span>
              </div>
              <div class="strategy-step-detail">${escapeHTML(st.detail)}</div>
              ${st.example ? `<div class="strategy-step-example">${escapeHTML(st.example)}</div>` : ''}
            </div>`).join('')}
        </div>`
      : '';

    let drillHTML = '';
    if (drill && Array.isArray(drill.options) && drill.options.length) {
      const answered = drillSt.picked !== null && drillSt.picked !== undefined;
      const isOk = answered && drillSt.picked === drill.answerIdx;
      drillHTML = `
        <div class="micro-drill-card" id="sec-micro-drill">
          <div class="micro-drill-prompt">${escapeHTML(drill.prompt)}</div>
          <div class="micro-drill-options">
            ${drill.options.map((opt, idx) => {
              let cls = '';
              if (answered) {
                if (idx === drill.answerIdx) cls = 'correct';
                else if (idx === drillSt.picked) cls = 'wrong';
                cls += ' locked';
              }
              const cleaned = String(opt).replace(/^[A-D]\s*[.)、:：]\s*/, '');
              return `<button type="button" class="opt-btn ${cls}" data-drill-opt="${idx}" ${answered ? 'disabled' : ''}>
                <span class="opt-key">${letters[idx] || idx + 1}</span>
                <span>${escapeHTML(cleaned)}</span>
              </button>`;
            }).join('')}
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            ${!answered && drill.hint ? `<button type="button" class="secondary-btn" id="btn-drill-hint-toggle">${drillSt.showHint ? '收起小克思路提示' : '查看小克思路提示'}</button>` : ''}
            ${answered ? `<button type="button" class="secondary-btn" id="btn-drill-retry">再练一次</button>` : ''}
          </div>
          ${!answered && drillSt.showHint && drill.hint ? `<div class="micro-drill-feedback"><strong>小克便签提示：</strong>${escapeHTML(drill.hint)}</div>` : ''}
          ${answered ? `<div class="micro-drill-feedback ${isOk ? 'ok' : 'bad'}">
            <strong>${isOk ? '微测一次通过！' : `参考答案：${letters[drill.answerIdx] || ''}`}</strong>
            <div style="margin-top:4px">${escapeHTML(drill.explain || '')}</div>
          </div>` : ''}
        </div>`;
    }

    const animTitle = (window.Cet4AnimEngine && typeof window.Cet4AnimEngine.getMeta === 'function' && sec.animId)
      ? ((window.Cet4AnimEngine.getMeta(sec.animId) || {}).title || sec.title)
      : sec.title;

    host.innerHTML = `
      <div class="section-banner">
        <span class="washi-tape sage sm" aria-hidden="true"></span>
        <div class="section-banner-left">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px">
            <span class="techo-stamp ink">LESSON ${String(secIdx + 1).padStart(2, '0')} / ${SECTIONS_LIST.length}</span>
            <span class="techo-stamp ${meta.badge}">${escapeHTML(meta.label)} · ${escapeHTML(sec.timeEst || '10 分钟')}</span>
            ${sec.relatedVocabDay ? `<button type="button" class="techo-stamp terracotta" style="cursor:pointer" data-go-vday="${sec.relatedVocabDay}">关联词包 Day ${String(sec.relatedVocabDay).padStart(2, '0')}</button>` : ''}
          </div>
          <h2>${escapeHTML(sec.title)}</h2>
          <p style="font-size:13.6px;color:var(--text-sec)">${escapeHTML(sec.subtitle || '')}</p>
          ${sec.mantra ? `<div class="section-mantra-line"><strong>考场口诀：</strong>${escapeHTML(sec.mantra)}</div>` : ''}
          <div style="margin-top:14px;display:flex;gap:9px;flex-wrap:wrap">
            <button type="button" class="${studied ? 'btn-sage' : 'secondary-btn'}" id="btn-mark-sec-studied">
              ${ICON.check}<span>${studied ? '本节已盖「済」章（已计入雷达）' : '打卡本节已学完'}</span>
            </button>
            <button type="button" class="submit-btn" id="btn-sec-practice">立即进入${escapeHTML(meta.short)}专项精练</button>
          </div>
        </div>
        <div class="section-mascot-stamp">
          <img src="${getSpriteSrc(meta.sprite)}" alt="小克精讲伴学">
        </div>
      </div>

      <div class="step-divider">
        <h3><span class="step-seal-badge">壹 · 破题精讲</span> 考场步骤拆解与高分逻辑</h3>
        <span class="techo-stamp">方法吃透 · 真题例证</span>
      </div>
      <div class="core-prose-card">${sec.coreHtml || ''}</div>
      ${stepsHTML}

      <div class="step-divider">
        <h3><span class="step-seal-badge">贰 · 即学微测</span> 当场验证破题直觉</h3>
        <span class="techo-stamp">1 分钟随堂小测</span>
      </div>
      ${drillHTML || '<div class="techo-card" style="margin-bottom:16px">本节侧重方法框架，可直接操作下方 60fps 交互实验台或进入题型实战精练。</div>'}

      <div class="step-divider">
        <h3><span class="step-seal-badge">叁 · 60fps 交互实验台</span> 考场条件反射可视化</h3>
        <span class="techo-stamp">单步 · 倍速 · 全屏阅览</span>
      </div>
      <div class="anim-lab-card">
        <div class="anim-lab-header">
          <div class="anim-lab-title"><span class="live-dot"></span><span>${escapeHTML(animTitle)}</span></div>
          <button type="button" class="secondary-btn anim-lightbox-btn" id="btn-sec-anim-zoom" style="padding:5px 11px;font-size:12px">${ICON.zoom}<span>全屏放大演示</span></button>
        </div>
        <div class="anim-lab-host" id="sec-anim-mount"></div>
        <div class="anim-lab-caption">
          <span>${escapeHTML(sec.animCaption || '交互式可视化实验台，辅助建立四级考场条件反射。')}</span>
          <span style="color:var(--terracotta);font-weight:700">点右上角开启全屏桌灯演示</span>
        </div>
      </div>

      <div class="section-pager-bar">
        ${prevSec
          ? `<button type="button" class="secondary-btn" data-nav-sec="${prevSec.id}">← 上一节：${escapeHTML(prevSec.title)}</button>`
          : `<button type="button" class="secondary-btn" disabled>← 已是第 01 节</button>`}
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${sec.relatedVocabDay ? `<button type="button" class="btn-honey" style="padding:7px 13px;font-size:12.6px" data-go-vday="${sec.relatedVocabDay}">背 Day ${sec.relatedVocabDay} 高频词</button>` : ''}
          <button type="button" class="submit-btn" id="btn-sec-practice-foot">刷${escapeHTML(meta.short)}真题 →</button>
        </div>
        ${nextSec
          ? `<button type="button" class="secondary-btn" data-nav-sec="${nextSec.id}">下一节：${escapeHTML(nextSec.title)} →</button>`
          : `<button type="button" class="secondary-btn" id="btn-go-mastery-foot">查看冲刺雷达 →</button>`}
      </div>`;

    document.getElementById('btn-mark-sec-studied')?.addEventListener('click', (e) => {
      state.studiedSections[sec.id] = !state.studiedSections[sec.id];
      saveState();
      updateGlobalStats();
      renderZineDirectory();
      renderKnowledgeReader();
      if (state.studiedSections[sec.id]) {
        FireworksFX.launch(1, getEventOrigin(e, e.currentTarget));
        reactXiaoKe('04_cheer_correct', `《${sec.title}》打卡盖章完成！冲刺雷达熟练度已同步更新！`, 4200);
      }
    });

    const goPractice = () => launchSkillPractice(toQuestionSkill(sec.skillId || 'listening'));
    document.getElementById('btn-sec-practice')?.addEventListener('click', goPractice);
    document.getElementById('btn-sec-practice-foot')?.addEventListener('click', goPractice);
    document.getElementById('btn-go-mastery-foot')?.addEventListener('click', () => switchView('mastery'));

    host.querySelectorAll('[data-nav-sec]').forEach(btn => {
      btn.onclick = () => selectSection(btn.dataset.navSec, true);
    });
    host.querySelectorAll('[data-go-vday]').forEach(btn => {
      btn.onclick = () => {
        state.vocabDay = Number(btn.dataset.goVday) || 1;
        state.vocabCustomIds = null;
        state.reciteIdx = 0;
        saveState();
        switchView('vocab');
      };
    });

    host.querySelectorAll('[data-drill-opt]').forEach(btn => {
      btn.onclick = (e) => {
        const picked = Number(btn.dataset.drillOpt);
        state.sectionDrillState[sec.id] = { picked, showHint: false };
        const ok = drill && picked === drill.answerIdx;
        if (ok) {
          FireworksFX.launch(1, getEventOrigin(e, btn));
          reactXiaoKe('04_cheer_correct', '微测一次命中！这套破题手法已经稳稳记在手账里啦！', 3800);
        } else {
          reactXiaoKe('05_encourage_wrong', '差一点点，看看便签里的定位线索，马上就能举一反三！', 4000);
        }
        renderKnowledgeReader();
      };
    });
    document.getElementById('btn-drill-hint-toggle')?.addEventListener('click', () => {
      const cur = state.sectionDrillState[sec.id] || { picked: null, showHint: false };
      state.sectionDrillState[sec.id] = { picked: cur.picked, showHint: !cur.showHint };
      if (!cur.showHint) reactXiaoKe('03_thinking_hint', drill.hint, 4500);
      renderKnowledgeReader();
    });
    document.getElementById('btn-drill-retry')?.addEventListener('click', () => {
      state.sectionDrillState[sec.id] = { picked: null, showHint: false };
      renderKnowledgeReader();
    });

    const animMount = document.getElementById('sec-anim-mount');
    if (animMount && sec.animId && window.Cet4AnimEngine && typeof window.Cet4AnimEngine.mount === 'function') {
      try {
        window.Cet4AnimEngine.mount(animMount, sec.animId, {
          onOpenLightbox: () => openAnimLightbox(sec.animId, animTitle, sec.animCaption)
        });
      } catch (_e) {
        animMount.innerHTML = '<div style="padding:26px;color:#f5ede0;text-align:center">交互实验台加载中...</div>';
      }
    }
    document.getElementById('btn-sec-anim-zoom')?.addEventListener('click', () => {
      if (sec.animId) openAnimLightbox(sec.animId, animTitle, sec.animCaption);
    });
  }

  /* ========================================================================
     VIEW 2: RULED INDEX FLASHCARDS & COZY STUDY AUDIO DESK
     ======================================================================== */
  function getActiveVocabWords() {
    if (Array.isArray(state.vocabCustomIds) && state.vocabCustomIds.length) {
      const idSet = new Set(state.vocabCustomIds);
      const list = VOCAB_WORDS.filter(w => idSet.has(w.id));
      if (list.length) return list;
    }
    const dayWords = VOCAB_WORDS.filter(w => Number(w.day) === Number(state.vocabDay));
    return dayWords.length ? dayWords : VOCAB_WORDS.slice(0, 26);
  }

  function highlightWordInSentence(sentence, word) {
    const safe = escapeHTML(sentence || '');
    const w = String(word || '').trim();
    if (!w) return safe;
    const stem = w.length >= 5 ? w.slice(0, w.length - 1) : w;
    const rx = new RegExp(`\\b(${stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[a-z]*)\\b`, 'gi');
    return safe.replace(rx, '<mark>$1</mark>');
  }

  function rateVocabWord(wordId, rating, clickEvent) {
    const prev = state.vocabProgress[wordId] || { status: 'new', reps: 0, nextDay: state.vocabDay, wrongCnt: 0 };
    const intervals = [1, 2, 4, 7, 11];
    if (rating === 'known') {
      const nextReps = (prev.reps || 0) + 1;
      const gap = intervals[Math.min(nextReps - 1, intervals.length - 1)];
      state.vocabProgress[wordId] = {
        status: 'known',
        reps: nextReps,
        nextDay: Math.min(14, state.vocabDay + gap),
        wrongCnt: prev.wrongCnt || 0
      };
      state.streak += 1;
      if (state.streak % 5 === 0) {
        FireworksFX.launch(1, clickEvent ? getEventOrigin(clickEvent) : null);
      }
      if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.onVocabEvent === 'function') {
        window.XiaoKeAssistant.onVocabEvent('known', VOCAB_WORDS.find(w => w.id === wordId), state.streak);
      }
    } else if (rating === 'fuzzy') {
      state.vocabProgress[wordId] = {
        status: 'fuzzy',
        reps: Math.max(0, prev.reps || 0),
        nextDay: state.vocabDay,
        wrongCnt: (prev.wrongCnt || 0) + 1
      };
      state.streak = 0;
      if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.onVocabEvent === 'function') {
        window.XiaoKeAssistant.onVocabEvent('fuzzy', VOCAB_WORDS.find(w => w.id === wordId), 0);
      }
    } else {
      state.vocabProgress[wordId] = {
        status: 'new',
        reps: 0,
        nextDay: state.vocabDay,
        wrongCnt: (prev.wrongCnt || 0) + 1
      };
      state.streak = 0;
      if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.onVocabEvent === 'function') {
        window.XiaoKeAssistant.onVocabEvent('unknown', VOCAB_WORDS.find(w => w.id === wordId), 0);
      }
    }
    saveState();
    updateGlobalStats();
  }

  function ensureFlashQueue(words) {
    const validIds = new Set(words.map(w => w.id));
    if (!state.flashQueue.length || !state.flashQueue.some(id => validIds.has(id))) {
      state.flashQueue = words.map(w => w.id);
      state.flashCursor = 0;
      state.flashFlipped = false;
    }
    if (state.flashCursor >= state.flashQueue.length) {
      state.flashCursor = 0;
    }
  }

  function prepareVocabQuiz(words) {
    if (!words.length) return;
    const pool = words;
    const target = pool[Math.floor(Math.random() * pool.length)];
    const others = VOCAB_WORDS.filter(w => w.id !== target.id && w.meaning !== target.meaning);
    const distractors = [];
    const usedIdx = new Set();
    while (distractors.length < 3 && usedIdx.size < others.length) {
      const i = Math.floor(Math.random() * others.length);
      if (!usedIdx.has(i)) {
        usedIdx.add(i);
        distractors.push(others[i]);
      }
    }
    const choices = [target, ...distractors].sort(() => Math.random() - 0.5);
    state.quizWordId = target.id;
    state.quizChoices = choices.map(c => ({ id: c.id, pos: c.pos, meaning: c.meaning }));
    state.quizAnswered = null;
  }

  function renderVocabView() {
    const host = document.getElementById('vocab-host');
    if (!host) return;
    const allStats = computeVocabStats(VOCAB_WORDS);
    const activeWords = getActiveVocabWords();
    const curDayObj = VOCAB_DAYS.find(d => Number(d.day) === Number(state.vocabDay)) || {
      day: state.vocabDay,
      title: `Day ${state.vocabDay} 高频词包`,
      theme: '真题复现核心词',
      focusTip: '结合词根与真题例句记忆效果翻倍'
    };

    const cleanDayTitle = (d) => String(d.title || d.theme || '').replace(/^Day\s*\d+\s*[·:：\-—]?\s*/i, '').trim() || `第 ${d.day} 天核心词`;
    const dayPillsHTML = VOCAB_DAYS.map(d => {
      const dw = VOCAB_WORDS.filter(w => Number(w.day) === Number(d.day));
      const ds = computeVocabStats(dw);
      const isActive = !state.vocabCustomIds && Number(d.day) === Number(state.vocabDay);
      return `
        <button type="button" class="vocab-day-pill ${isActive ? 'active' : ''}" data-vday="${d.day}">
          <span class="vd-top"><span>Day ${String(d.day).padStart(2, '0')}</span><span>${ds.known}/${dw.length}</span></span>
          <span class="vd-title">${escapeHTML(cleanDayTitle(d))}</span>
          <span class="vd-bar"><span class="vd-fill" style="width:${ds.pct}%"></span></span>
        </button>`;
    }).join('');

    const customBanner = state.vocabCustomIds
      ? `<div style="margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 15px;border:1px solid rgba(206,178,114,0.55);border-left:3.5px solid var(--honey);border-radius:var(--radius-sm);background:var(--paper-sticky);color:var(--text)">
          <strong style="font-size:13px">当前专攻队列：生词卡复习队列（共 ${activeWords.length} 词）</strong>
          <button type="button" class="secondary-btn" id="btn-vocab-exit-custom" style="padding:5px 11px;font-size:12px">返回 Day ${state.vocabDay} 词包</button>
        </div>`
      : '';

    let modeBodyHTML = '';
    if (state.vocabMode === 'recite') {
      modeBodyHTML = buildReciteModeHTML(activeWords);
    } else if (state.vocabMode === 'flashcard') {
      ensureFlashQueue(activeWords);
      modeBodyHTML = buildFlashcardModeHTML(activeWords);
    } else if (state.vocabMode === 'quiz') {
      if (!state.quizWordId || !VOCAB_WORDS.some(w => w.id === state.quizWordId)) prepareVocabQuiz(activeWords);
      modeBodyHTML = buildVocabQuizModeHTML();
    } else {
      modeBodyHTML = buildConfusableModeHTML();
    }

    host.innerHTML = `
      <div class="vocab-header-card">
        <span class="washi-tape honey sm" aria-hidden="true"></span>
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:7px">
            <span class="techo-stamp ink">VOCAB DESK · 312 CORE</span>
            <span class="techo-stamp terracotta">2014–2026 真题复现频次驱动</span>
          </div>
          <h2 style="font-family:var(--font-serif);font-size:25px;font-weight:800;margin-bottom:5px;color:var(--text)">${state.vocabCustomIds ? '生词卡专练队列' : `Day ${String(curDayObj.day).padStart(2, '0')} · ${escapeHTML(cleanDayTitle(curDayObj))}`}</h2>
          <p style="font-size:13.4px;color:var(--text-sec)">${escapeHTML(curDayObj.focusTip || '四拍语音带背 -> 横线索引词卡 -> 听音选义 -> 高频易混词辨析，轻松建立四级听读直觉。')}</p>
          <div class="vocab-retention-grid">
            <span class="vocab-stat-pill">已掌握 <strong>${allStats.known}</strong></span>
            <span class="vocab-stat-pill">模糊待巩固 <strong>${allStats.fuzzy}</strong></span>
            <span class="vocab-stat-pill">待背新词 <strong>${allStats.fresh}</strong></span>
            <span class="vocab-stat-pill">今日应复习 <strong>${allStats.dueReview}</strong></span>
            <span class="vocab-stat-pill">艾宾浩斯留存率 <strong>${allStats.pct}%</strong></span>
          </div>
          <div class="cover-progress-line" style="max-width:560px;margin-top:11px">
            <span>全词库留存进度</span>
            <div class="techo-bar-track"><div class="techo-bar-fill" style="width:${Math.max(3, allStats.pct)}%"></div></div>
          </div>
        </div>
        <div class="section-mascot-stamp" style="width:116px;height:116px;margin:0 auto">
          <img src="${getSpriteSrc(state.recitePlaying ? '07_listening_audio' : '02_study_reading')}" alt="小克带背" style="width:100px;height:100px">
        </div>
      </div>

      <div class="vocab-day-ribbon">${dayPillsHTML}</div>
      ${customBanner}

      <div class="vocab-mode-bar">
        <div class="segmented-tabs">
          <button type="button" class="seg-tab ${state.vocabMode === 'recite' ? 'active' : ''}" data-vmode="recite">${ICON.headphones}<span>语音带背</span></button>
          <button type="button" class="seg-tab ${state.vocabMode === 'flashcard' ? 'active' : ''}" data-vmode="flashcard">${ICON.book}<span>三态刷词卡</span></button>
          <button type="button" class="seg-tab ${state.vocabMode === 'quiz' ? 'active' : ''}" data-vmode="quiz">${ICON.volume}<span>听音选义</span></button>
          <button type="button" class="seg-tab ${state.vocabMode === 'confusable' ? 'active' : ''}" data-vmode="confusable">${ICON.refresh}<span>高频易混词 (${CONFUSABLE_PAIRS.length})</span></button>
        </div>
        <span class="techo-stamp">本组 ${activeWords.length} 词 · 离线 Web Speech</span>
      </div>

      <div id="vocab-mode-stage">${modeBodyHTML}</div>`;

    bindVocabEvents(host, activeWords);
  }

  function buildReciteModeHTML(words) {
    if (!words.length) return '<div class="techo-card">暂无词汇数据。</div>';
    if (state.reciteIdx >= words.length) state.reciteIdx = 0;
    const w = words[state.reciteIdx];
    const beats = [
      { key: 'word', num: '01', label: '读词' },
      { key: 'roots', num: '02', label: '词根' },
      { key: 'meaning', num: '03', label: '释义' },
      { key: 'sentence', num: '04', label: '原句' }
    ];
    const beatOrder = beats.map(b => b.key);
    const curBeatPos = beatOrder.indexOf(state.reciteBeat);
    const prog = state.vocabProgress[w.id]?.status || 'new';
    const colls = Array.isArray(w.collocations) ? w.collocations : [];

    return `
      <div class="recite-stage">
        <div class="recite-card">
          <div class="desk-audio-strip">
            <span>STUDY DESK AUDIO · TRACK ${String(state.reciteIdx + 1).padStart(2, '0')} / ${String(words.length).padStart(2, '0')}</span>
            <span class="desk-audio-status">${state.recitePlaying ? '● 朗读中' : '○ 待机'} · ${state.reciteRate}x</span>
          </div>

          <div class="recite-beat-bar">
            ${beats.map((b, i) => {
              const cls = state.recitePlaying
                ? (i === curBeatPos ? 'active' : (i < curBeatPos ? 'done' : ''))
                : (i === 0 ? 'active' : '');
              return `<div class="recite-beat ${cls}" data-beat="${b.key}">
                <span class="beat-bead">${b.num}</span>
                <span>${b.label}</span>
              </div>`;
            }).join('')}
          </div>

          <div class="vocab-word-hero">
            <div class="vocab-word-text">${escapeHTML(w.word)}</div>
            <div class="vocab-phonetic-row">
              <span class="vocab-phonetic">${escapeHTML(w.phonetic || '')}</span>
              <span class="vocab-pos-chip">${escapeHTML(w.pos || '')}</span>
              <span class="vocab-freq-chip">真题复现 ${w.examFreq || 1}次</span>
              ${w.tag ? `<span class="techo-stamp terracotta">${escapeHTML(w.tag)}</span>` : ''}
              <button type="button" class="audio-speak-btn" id="btn-speak-cur-word">${ICON.volume}<span>朗读单词</span></button>
            </div>
          </div>

          <div class="vocab-detail-blocks">
            <div class="vocab-info-tile ${state.reciteBeat === 'roots' ? 'is-lit' : ''}">
              <div class="vocab-tile-lbl">02 · 词根词缀与速记钩子</div>
              <div style="font-size:13.8px;font-weight:800;color:var(--terracotta-deep);margin-bottom:4px">${escapeHTML(w.roots || '核心原生词')}</div>
              <div style="font-size:12.8px;color:var(--text-sec)">${escapeHTML(w.mnemonic || '')}</div>
            </div>
            <div class="vocab-info-tile ${state.reciteBeat === 'meaning' ? 'is-lit' : ''}">
              <div class="vocab-tile-lbl">03 · 核心释义与高频搭配</div>
              <div class="vocab-meaning-lg">${escapeHTML(w.meaning)}</div>
              <div class="vocab-colloc-list">
                ${colls.map(c => `<span class="vocab-colloc-chip"><em>${escapeHTML(c.en || c)}</em> ${escapeHTML(c.zh || '')}</span>`).join('')}
              </div>
            </div>
            <div class="vocab-info-tile full ${state.reciteBeat === 'sentence' ? 'is-lit' : ''}">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px">
                <span class="vocab-tile-lbl" style="margin:0">04 · 真题原句实战语境</span>
                <button type="button" class="audio-speak-btn" id="btn-speak-cur-sent" style="padding:3.5px 10px;font-size:11.6px">${ICON.volume}<span>朗读例句</span></button>
              </div>
              <div class="vocab-sentence-en">${highlightWordInSentence(w.realSentence?.en || '', w.word)}</div>
              <div class="vocab-sentence-zh">${escapeHTML(w.realSentence?.zh || '')}</div>
              ${w.realSentence?.source ? `<div class="vocab-sentence-src">来源：${escapeHTML(w.realSentence.source)}</div>` : ''}
            </div>
            ${w.confusable ? `
              <div class="vocab-info-tile full" style="background:var(--paper-sticky);border-color:rgba(206,178,114,0.55)">
                <div class="vocab-tile-lbl">易混词便签 · ${escapeHTML(w.confusable.word || '')}</div>
                <div style="font-size:13px;font-weight:700;color:var(--text)">${escapeHTML(w.confusable.diff || '')}</div>
              </div>` : ''}
          </div>

          <div class="recite-controls">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <button type="button" class="secondary-btn" id="btn-recite-prev">← 上一词</button>
              <button type="button" class="btn-primary" id="btn-recite-toggle">
                ${state.recitePlaying ? ICON.pause : ICON.play}
                <span>${state.recitePlaying ? '暂停语音带背' : '开始自动语音带背'}</span>
              </button>
              <button type="button" class="secondary-btn" id="btn-recite-next">下一词 →</button>
            </div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <div class="speed-pill-group" title="朗读倍速">
                ${[0.8, 1.0, 1.15].map(r => `<button type="button" class="speed-pill ${Math.abs(state.reciteRate - r) < 0.05 ? 'active' : ''}" data-rrate="${r}">${r}x</button>`).join('')}
              </div>
              <button type="button" class="secondary-btn" id="btn-recite-repeat" style="padding:5.5px 10px;font-size:12px">读词 ${state.reciteRepeat} 遍</button>
              <button type="button" class="secondary-btn" id="btn-recite-zh" style="padding:5.5px 10px;font-size:12px">${state.reciteIncludeZh ? '中英双语' : '纯英文跟读'}</button>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:14px;padding-top:12px;border-top:1px dashed var(--border-stitch)">
            <span style="font-size:12.4px;color:var(--text-sec);font-weight:700">掌握状态：${prog === 'known' ? '已掌握' : (prog === 'fuzzy' ? '模糊待巩固' : '待背新词')}</span>
            <div style="display:flex;gap:7px;flex-wrap:wrap">
              <button type="button" class="btn-sage" style="padding:5.5px 11px;font-size:12px" data-quick-rate="known">标为已掌握</button>
              <button type="button" class="btn-honey" style="padding:5.5px 11px;font-size:12px" data-quick-rate="fuzzy">标为模糊</button>
              <button type="button" class="secondary-btn" style="padding:5.5px 11px;font-size:12px;background:var(--rose-soft);border-color:rgba(194,77,77,0.32);color:var(--rose)" data-quick-rate="unknown">收入生词卡</button>
            </div>
          </div>
        </div>

        <aside class="recite-side-panel">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding-bottom:9px;border-bottom:1px dashed var(--border-stitch)">
            <strong style="font-family:var(--font-serif);font-size:15px">本组带背清单 (${state.reciteIdx + 1}/${words.length})</strong>
            <span class="techo-stamp ${state.recitePlaying ? 'terracotta' : 'sage'}">${state.recitePlaying ? '带背中' : '就绪'}</span>
          </div>
          <div class="recite-queue-list">
            ${words.map((item, idx) => {
              const st = state.vocabProgress[item.id]?.status || 'new';
              const stLabel = st === 'known' ? '已掌握' : (st === 'fuzzy' ? '模糊' : '待背');
              return `
                <button type="button" class="recite-queue-item ${idx === state.reciteIdx ? 'active' : ''}" data-qword-idx="${idx}">
                  <span class="rq-word">${String(idx + 1).padStart(2, '0')}. ${escapeHTML(item.word)}</span>
                  <span class="rq-st ${st}">${stLabel}</span>
                </button>`;
            }).join('')}
          </div>
        </aside>
      </div>`;
  }

  function buildFlashcardModeHTML(words) {
    const curId = state.flashQueue[state.flashCursor];
    const w = words.find(x => x.id === curId) || words[0];
    if (!w) return '<div class="techo-card">暂无词汇。</div>';
    const colls = Array.isArray(w.collocations) ? w.collocations : [];

    return `
      <div class="flashcard-wrap">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px;font-size:12.6px;font-weight:700;color:var(--text-sec)">
          <span class="techo-stamp">索引词卡 · 第 ${state.flashCursor + 1} / ${state.flashQueue.length} 张</span>
          <span>快捷键：Space 翻页 · 1 / 2 / 3 评级 · R 朗读</span>
        </div>

        <div class="fc-stack-shell">
          <div class="fc-scene">
            <div class="fc-card ${state.flashFlipped ? 'flipped' : ''}" id="vocab-fc-card">
              <div class="fc-face fc-front">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
                  <span class="techo-stamp terracotta">${escapeHTML(w.tag || '四级核心词')}</span>
                  <span class="vocab-freq-chip">真题复现 ${w.examFreq || 1}次</span>
                </div>
                <div style="text-align:center;margin:30px 0">
                  <div class="vocab-word-text">${escapeHTML(w.word)}</div>
                  <div class="vocab-phonetic-row">
                    <span class="vocab-phonetic">${escapeHTML(w.phonetic || '')}</span>
                    <span class="vocab-pos-chip">${escapeHTML(w.pos || '')}</span>
                    <button type="button" class="audio-speak-btn" id="btn-fc-speak">${ICON.volume}<span>朗读单词</span></button>
                  </div>
                </div>
                <div style="text-align:center;font-size:12.4px;color:var(--text-muted);border-top:1px dashed var(--border-stitch);padding-top:10px">
                  先在脑中回想中文释义与高频搭配，点击索引卡片任意处向右翻页核对
                </div>
              </div>

              <div class="fc-face fc-back">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:6px">
                    <strong style="font-family:var(--font-serif);font-size:22px;color:var(--terracotta)">${escapeHTML(w.word)} <span style="font-size:14px;color:var(--text-muted);font-weight:600">${escapeHTML(w.phonetic || '')}</span></strong>
                    <span class="vocab-pos-chip">${escapeHTML(w.pos || '')}</span>
                  </div>
                  <div class="vocab-meaning-lg" style="margin-bottom:10px">${escapeHTML(w.meaning)}</div>
                  <div style="padding:9px 12px;border:1px solid rgba(206,178,114,0.52);border-left:3px solid var(--honey);border-radius:var(--radius-xs);background:var(--paper-sticky);font-size:13px;margin-bottom:10px">
                    <strong>词根巧记：</strong>${escapeHTML(w.roots || '')}${w.mnemonic ? ` — ${escapeHTML(w.mnemonic)}` : ''}
                  </div>
                  ${colls.length ? `<div class="vocab-colloc-list" style="margin-bottom:10px">${colls.map(c => `<span class="vocab-colloc-chip"><em>${escapeHTML(c.en || c)}</em> ${escapeHTML(c.zh || '')}</span>`).join('')}</div>` : ''}
                  <div style="padding:10px 13px;border:1px dashed var(--border-stitch);border-radius:var(--radius-xs);background:var(--paper-bg)">
                    <div class="vocab-sentence-en" style="font-size:14px">${highlightWordInSentence(w.realSentence?.en || '', w.word)}</div>
                    <div class="vocab-sentence-zh">${escapeHTML(w.realSentence?.zh || '')}</div>
                  </div>
                  ${w.confusable ? `<div style="margin-top:8px;font-size:12.2px;color:var(--terracotta);font-weight:700">易混词提示：${escapeHTML(w.confusable.word)} — ${escapeHTML(w.confusable.diff)}</div>` : ''}
                </div>
                <div style="text-align:center;font-size:11.8px;color:var(--text-muted);margin-top:10px">在下方选择掌握程度，自动排入艾宾浩斯复习队列</div>
              </div>
            </div>
          </div>
        </div>

        <div class="fc-rate-row">
          <button type="button" class="fc-rate-btn unknown" data-fc-rate="unknown">
            <strong>不认识 +3</strong>
            <span>3 词后重现并收入生词卡</span>
          </button>
          <button type="button" class="fc-rate-btn fuzzy" data-fc-rate="fuzzy">
            <strong>模糊 +7</strong>
            <span>7 词后再次强化巩固</span>
          </button>
          <button type="button" class="fc-rate-btn known" data-fc-rate="known">
            <strong>已掌握</strong>
            <span>进入艾宾浩斯长时记忆</span>
          </button>
        </div>
      </div>`;
  }

  function buildVocabQuizModeHTML() {
    const target = VOCAB_WORDS.find(w => w.id === state.quizWordId);
    if (!target) return '<div class="techo-card">暂无测验词条。</div>';
    const letters = ['A', 'B', 'C', 'D'];
    const answered = state.quizAnswered !== null;
    const isOk = answered && state.quizAnswered === target.id;

    return `
      <div class="audio-quiz-card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px;padding-bottom:11px;border-bottom:1px dashed var(--border-stitch)">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <strong style="font-family:var(--font-serif);font-size:17px">听音选义（听力辨音特训）</strong>
            ${state.quizCombo > 0 ? `<span class="techo-stamp terracotta">连对 ${state.quizCombo} 词</span>` : ''}
          </div>
          <label style="display:inline-flex;align-items:center;gap:6px;font-size:12.6px;font-weight:700;color:var(--text-sec);cursor:pointer">
            <input type="checkbox" id="chk-quiz-blind" ${state.quizBlind ? 'checked' : ''} style="accent-color:var(--terracotta);width:15px;height:15px">
            <span>纯盲听模式（隐藏拼写）</span>
          </label>
        </div>

        <div class="blind-stage">
          ${(!state.quizBlind || answered)
            ? `<div class="vocab-word-text" style="font-size:36px">${escapeHTML(target.word)}</div>
               <div style="font-family:var(--font-serif);font-style:italic;color:var(--text-muted);margin:4px 0 13px">${escapeHTML(target.phonetic || '')}</div>`
            : `<div style="font-family:var(--font-serif);font-size:20px;font-weight:800;color:var(--text);margin-bottom:12px">盲听挑战中 · 请点击下方喇叭仔细听辨读音</div>`}
          <button type="button" class="btn-primary" id="btn-quiz-play">${ICON.volume}<span>播放单词读音</span></button>
        </div>

        <div class="options-grid single-col">
          ${state.quizChoices.map((ch, idx) => {
            let cls = '';
            if (answered) {
              if (ch.id === target.id) cls = 'correct';
              else if (ch.id === state.quizAnswered) cls = 'wrong';
              cls += ' locked';
            }
            return `<button type="button" class="opt-btn ${cls}" data-vq-pick="${ch.id}" ${answered ? 'disabled' : ''}>
              <span class="opt-key">${letters[idx]}</span>
              <span><strong>${escapeHTML(ch.pos || '')}</strong> ${escapeHTML(ch.meaning)}</span>
            </button>`;
          }).join('')}
        </div>

        ${answered ? `
          <div class="micro-drill-feedback ${isOk ? 'ok' : 'bad'}" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
            <div>
              <strong>${isOk ? '听辨精准命中！' : `正确词义：${escapeHTML(target.word)} (${escapeHTML(target.pos)}) ${escapeHTML(target.meaning)}`}</strong>
              <div style="font-size:12.4px;margin-top:3px">${escapeHTML(target.mnemonic || target.roots || '')}</div>
            </div>
            <button type="button" class="submit-btn" id="btn-vq-next">下一题 →</button>
          </div>` : ''}
      </div>`;
  }

  function buildConfusableModeHTML() {
    if (!CONFUSABLE_PAIRS.length) return '<div class="techo-card">暂无易混词数据。</div>';
    const letters = ['A', 'B', 'C', 'D'];
    return `
      <div class="confusable-grid">
        ${CONFUSABLE_PAIRS.map(pair => {
          const picked = state.confusableSolved[pair.id];
          const answered = picked !== undefined;
          const qz = pair.quiz || null;
          return `
            <div class="confusable-card">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding-bottom:9px;border-bottom:1px dashed var(--border-stitch)">
                <strong style="font-family:var(--font-serif);font-size:17px;color:var(--text)">${escapeHTML((pair.group || []).join(' / '))}</strong>
                <span class="techo-stamp terracotta">高频易混辨析</span>
              </div>
              <div class="confusable-items">
                ${(pair.items || []).map(it => `
                  <div class="confusable-item">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:4px">
                      <span class="confusable-word">${escapeHTML(it.word)}</span>
                      <button type="button" class="secondary-btn" data-speak-word="${escapeHTML(it.word)}" style="padding:2px 8px;font-size:11px">读</button>
                    </div>
                    <div style="font-size:11.5px;color:var(--text-muted);font-style:italic">${escapeHTML(it.phonetic || '')} ${escapeHTML(it.pos || '')}</div>
                    <div style="font-size:13.2px;font-weight:700;color:var(--text);margin:3px 0">${escapeHTML(it.meaning)}</div>
                    <div style="font-size:11.8px;color:var(--sage);font-weight:700">口诀：${escapeHTML(it.tip || '')}</div>
                    ${it.example ? `<div style="font-family:var(--font-serif);font-size:12px;color:var(--text-sec);margin-top:4px">${escapeHTML(it.example)}</div>` : ''}
                  </div>`).join('')}
              </div>
              ${qz ? `
                <div class="confusable-quiz-box">
                  <div style="font-family:var(--font-serif);font-size:13.8px;font-weight:700;margin-bottom:8px">随堂辨析：${escapeHTML(qz.stem)}</div>
                  <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px">
                    ${(qz.options || []).map((opt, idx) => {
                      let cls = '';
                      if (answered) {
                        if (idx === qz.answerIdx) cls = 'correct';
                        else if (idx === picked) cls = 'wrong';
                        cls += ' locked';
                      }
                      return `<button type="button" class="opt-btn ${cls}" style="padding:7px 10px;font-size:12.8px" data-cf-id="${pair.id}" data-cf-opt="${idx}" ${answered ? 'disabled' : ''}>
                        <span class="opt-key" style="width:22px;height:22px;font-size:11px">${letters[idx]}</span>
                        <span>${escapeHTML(opt)}</span>
                      </button>`;
                    }).join('')}
                  </div>
                  ${answered ? `<div class="micro-drill-feedback ${picked === qz.answerIdx ? 'ok' : 'bad'}" style="margin-top:8px;padding:8px 11px;font-size:12.4px">
                    <strong>${picked === qz.answerIdx ? '辨析准确！' : `应选 ${letters[qz.answerIdx]} · ${escapeHTML(qz.options[qz.answerIdx])}`}</strong> ${escapeHTML(qz.explain || '')}
                  </div>` : ''}
                </div>` : ''}
            </div>`;
        }).join('')}
      </div>`;
  }

  function toggleVocabFlashcard() {
    const fcCard = document.getElementById('vocab-fc-card');
    if (!fcCard) return;
    if (window.TechoPageTurn && typeof window.TechoPageTurn.cancelStageTurn === 'function') {
      window.TechoPageTurn.cancelStageTurn(fcCard);
    }
    fcCard.classList.toggle('flipped', Boolean(state.flashFlipped));
    const frontEl = fcCard.querySelector('.fc-front');
    const backEl = fcCard.querySelector('.fc-back');
    const nextFlipped = !state.flashFlipped;
    state.flashFlipped = nextFlipped;
    if (window.TechoPageTurn && typeof window.TechoPageTurn.turnLayers === 'function' && frontEl && backEl) {
      const outgoing = nextFlipped ? frontEl : backEl;
      const incoming = nextFlipped ? backEl : frontEl;
      window.TechoPageTurn.turnLayers(fcCard, outgoing, incoming, {
        dir: nextFlipped ? 'next' : 'prev',
        mode: 'card',
        paperStyle: 'ruled',
        duration: 480,
        onComplete: () => {
          fcCard.classList.toggle('flipped', state.flashFlipped);
        }
      });
    } else {
      fcCard.classList.toggle('flipped', nextFlipped);
    }
  }

  function bindVocabEvents(host, words) {
    const vocabPaper = state.vocabMode === 'flashcard' ? 'ruled' : 'grid';
    host.querySelectorAll('[data-vday]').forEach(btn => {
      btn.onclick = () => {
        stopAllAudioAndTimers();
        const nextDay = Number(btn.dataset.vday) || 1;
        const dir = nextDay < state.vocabDay ? 'prev' : 'next';
        runSnapshotTurn(() => document.getElementById('vocab-mode-stage'), () => {
          state.vocabDay = nextDay;
          state.vocabCustomIds = null;
          state.reciteIdx = 0;
          state.flashQueue = [];
          state.quizWordId = null;
          saveState();
          renderVocabView();
        }, dir, vocabPaper, 520);
      };
    });
    document.getElementById('btn-vocab-exit-custom')?.addEventListener('click', () => {
      stopAllAudioAndTimers();
      runSnapshotTurn(() => document.getElementById('vocab-mode-stage'), () => {
        state.vocabCustomIds = null;
        state.reciteIdx = 0;
        state.flashQueue = [];
        renderVocabView();
      }, 'prev', vocabPaper, 520);
    });
    host.querySelectorAll('[data-vmode]').forEach(btn => {
      btn.onclick = () => {
        stopAllAudioAndTimers();
        const nextMode = btn.dataset.vmode;
        if (nextMode === state.vocabMode) return;
        const pIdx = VOCAB_MODE_ORDER.indexOf(state.vocabMode);
        const nIdx = VOCAB_MODE_ORDER.indexOf(nextMode);
        const dir = (nIdx >= 0 && pIdx >= 0 && nIdx < pIdx) ? 'prev' : 'next';
        runSnapshotTurn(() => document.getElementById('vocab-mode-stage'), () => {
          state.vocabMode = nextMode;
          renderVocabView();
        }, dir, nextMode === 'flashcard' ? 'ruled' : 'grid', 520);
        syncCompanionContext();
      };
    });

    if (state.vocabMode === 'recite' && words.length) {
      const curW = words[state.reciteIdx] || words[0];
      document.getElementById('btn-speak-cur-word')?.addEventListener('click', () => {
        if (window.Cet4Speech) window.Cet4Speech.speakWord(curW.word, { rate: state.reciteRate });
      });
      document.getElementById('btn-speak-cur-sent')?.addEventListener('click', () => {
        if (window.Cet4Speech && curW.realSentence?.en) window.Cet4Speech.speak(curW.realSentence.en, { lang: 'en-US', rate: state.reciteRate });
      });
      document.getElementById('btn-recite-prev')?.addEventListener('click', () => {
        state.reciteIdx = (state.reciteIdx - 1 + words.length) % words.length;
        if (state.recitePlaying && reciteCtrl) reciteCtrl.jumpTo(state.reciteIdx);
        else runSnapshotTurn(() => document.querySelector('#vocab-mode-stage .recite-card') || document.getElementById('vocab-mode-stage'), () => renderVocabView(), 'prev', 'grid', 460);
      });
      document.getElementById('btn-recite-next')?.addEventListener('click', () => {
        state.reciteIdx = (state.reciteIdx + 1) % words.length;
        if (state.recitePlaying && reciteCtrl) reciteCtrl.jumpTo(state.reciteIdx);
        else runSnapshotTurn(() => document.querySelector('#vocab-mode-stage .recite-card') || document.getElementById('vocab-mode-stage'), () => renderVocabView(), 'next', 'grid', 460);
      });
      document.getElementById('btn-recite-toggle')?.addEventListener('click', () => {
        if (state.recitePlaying) {
          stopAllAudioAndTimers();
          renderVocabView();
          return;
        }
        if (!window.Cet4Speech || typeof window.Cet4Speech.startVocabRecite !== 'function') return;
        state.recitePlaying = true;
        reactXiaoKe('07_listening_audio', `Day ${state.vocabDay} 四拍语音带背已开启，跟着书桌节拍轻松听读记词～`, 4200);
        reciteCtrl = window.Cet4Speech.startVocabRecite(words, {
          startIndex: state.reciteIdx,
          rate: state.reciteRate,
          repeatWord: state.reciteRepeat,
          includeChinese: state.reciteIncludeZh,
          includeSentence: true,
          onWordChange: (idx) => {
            state.reciteIdx = idx;
            renderVocabView();
          },
          onBeat: (idx, beat) => {
            state.reciteIdx = idx;
            state.reciteBeat = beat;
            const stage = document.getElementById('vocab-mode-stage');
            if (stage) {
              const beats = ['word', 'roots', 'meaning', 'sentence'];
              const pos = beats.indexOf(beat);
              stage.querySelectorAll('.recite-beat').forEach((el, i) => {
                el.classList.toggle('active', i === pos);
                el.classList.toggle('done', i < pos);
              });
            }
          },
          onFinish: () => {
            state.recitePlaying = false;
            reciteCtrl = null;
            FireworksFX.launch(2);
            reactXiaoKe('09_proud_streak', '本组高频词语音带背通关！去横线索引词卡或听音选义验一下记忆吧～', 5000);
            renderVocabView();
          }
        });
        renderVocabView();
      });
      host.querySelectorAll('[data-rrate]').forEach(btn => {
        btn.onclick = () => {
          state.reciteRate = Number(btn.dataset.rrate) || 1.0;
          if (reciteCtrl && typeof reciteCtrl.setRate === 'function') reciteCtrl.setRate(state.reciteRate);
          renderVocabView();
        };
      });
      document.getElementById('btn-recite-repeat')?.addEventListener('click', () => {
        state.reciteRepeat = state.reciteRepeat === 2 ? 1 : 2;
        if (reciteCtrl && typeof reciteCtrl.setOptions === 'function') reciteCtrl.setOptions({ repeatWord: state.reciteRepeat });
        renderVocabView();
      });
      document.getElementById('btn-recite-zh')?.addEventListener('click', () => {
        state.reciteIncludeZh = !state.reciteIncludeZh;
        if (reciteCtrl && typeof reciteCtrl.setOptions === 'function') reciteCtrl.setOptions({ includeChinese: state.reciteIncludeZh });
        renderVocabView();
      });
      host.querySelectorAll('[data-qword-idx]').forEach(btn => {
        btn.onclick = () => {
          state.reciteIdx = Number(btn.dataset.qwordIdx) || 0;
          if (state.recitePlaying && reciteCtrl) reciteCtrl.jumpTo(state.reciteIdx);
          else renderVocabView();
        };
      });
      host.querySelectorAll('[data-quick-rate]').forEach(btn => {
        btn.onclick = (e) => {
          rateVocabWord(curW.id, btn.dataset.quickRate, e);
          renderVocabView();
        };
      });
    }

    if (state.vocabMode === 'flashcard' && words.length) {
      const fcCard = document.getElementById('vocab-fc-card');
      const curId = state.flashQueue[state.flashCursor];
      const curW = words.find(w => w.id === curId) || words[0];
      if (fcCard) {
        if (window.TechoPageTurn && typeof window.TechoPageTurn.attachCornerPeek === 'function') {
          window.TechoPageTurn.attachCornerPeek(fcCard, {
            paperStyle: 'ruled',
            isFlipped: () => Boolean(state.flashFlipped),
            getTopFace: () => fcCard.querySelector(state.flashFlipped ? '.fc-back' : '.fc-front'),
            getBottomFace: () => fcCard.querySelector(state.flashFlipped ? '.fc-front' : '.fc-back')
          });
        }
        fcCard.onclick = (e) => {
          if (e.target.closest('#btn-fc-speak')) return;
          toggleVocabFlashcard();
        };
      }
      document.getElementById('btn-fc-speak')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.Cet4Speech && curW) window.Cet4Speech.speakWord(curW.word, { rate: 0.95 });
      });
      host.querySelectorAll('[data-fc-rate]').forEach(btn => {
        btn.onclick = (e) => {
          const rating = btn.dataset.fcRate;
          rateVocabWord(curW.id, rating, e);
          if (rating === 'unknown') {
            const pos = Math.min(state.flashQueue.length, state.flashCursor + 4);
            state.flashQueue.splice(pos, 0, curW.id);
          } else if (rating === 'fuzzy') {
            const pos = Math.min(state.flashQueue.length, state.flashCursor + 8);
            state.flashQueue.splice(pos, 0, curW.id);
          }
          state.flashCursor += 1;
          state.flashFlipped = false;
          if (state.flashCursor >= state.flashQueue.length) {
            state.flashCursor = 0;
            FireworksFX.launch(2, getEventOrigin(e, btn));
            reactXiaoKe('09_proud_streak', '本轮横线索引词卡已全部过完！核心词留存率又上一个台阶！', 4800);
          }
          runSnapshotTurn(() => document.querySelector('#vocab-mode-stage .fc-stack-shell') || document.getElementById('vocab-mode-stage'), () => renderVocabView(), 'next', 'ruled', 460);
        };
      });
    }

    if (state.vocabMode === 'quiz' && words.length) {
      const target = VOCAB_WORDS.find(w => w.id === state.quizWordId);
      document.getElementById('chk-quiz-blind')?.addEventListener('change', (e) => {
        state.quizBlind = e.target.checked;
        renderVocabView();
      });
      document.getElementById('btn-quiz-play')?.addEventListener('click', () => {
        if (window.Cet4Speech && target) {
          window.Cet4Speech.speakWord(target.word, { rate: 0.95 });
          reactXiaoKe('07_listening_audio', '紧盯音节重音与词尾变化，选出对应释义！', 3000);
        }
      });
      host.querySelectorAll('[data-vq-pick]').forEach(btn => {
        btn.onclick = (e) => {
          if (state.quizAnswered !== null || !target) return;
          const picked = btn.dataset.vqPick;
          state.quizAnswered = picked;
          if (picked === target.id) {
            state.quizCombo += 1;
            rateVocabWord(target.id, 'known', e);
            FireworksFX.launch(state.quizCombo >= 3 ? 2 : 1, getEventOrigin(e, btn));
          } else {
            state.quizCombo = 0;
            rateVocabWord(target.id, 'fuzzy', e);
          }
          renderVocabView();
        };
      });
      document.getElementById('btn-vq-next')?.addEventListener('click', () => {
        prepareVocabQuiz(words);
        runSnapshotTurn(() => document.getElementById('vocab-mode-stage'), () => renderVocabView(), 'next', 'grid', 500);
        const nextW = VOCAB_WORDS.find(w => w.id === state.quizWordId);
        if (window.Cet4Speech && nextW) setTimeout(() => window.Cet4Speech.speakWord(nextW.word, { rate: 0.95 }), 160);
      });
    }

    if (state.vocabMode === 'confusable') {
      host.querySelectorAll('[data-speak-word]').forEach(btn => {
        btn.onclick = () => {
          if (window.Cet4Speech) window.Cet4Speech.speakWord(btn.dataset.speakWord, { rate: 0.95 });
        };
      });
      host.querySelectorAll('[data-cf-opt]').forEach(btn => {
        btn.onclick = (e) => {
          const cid = btn.dataset.cfId;
          const optIdx = Number(btn.dataset.cfOpt);
          const pair = CONFUSABLE_PAIRS.find(p => p.id === cid);
          state.confusableSolved[cid] = optIdx;
          if (pair && pair.quiz && optIdx === pair.quiz.answerIdx) {
            FireworksFX.launch(1, getEventOrigin(e, btn));
            reactXiaoKe('10_eureka_tip', `易混词组 ${pair.group.join('/')} 辨析精准命中！`, 3600);
          } else {
            reactXiaoKe('05_encourage_wrong', '易混词就靠错一次记牢！瞄一眼区分口诀立刻分清。', 3800);
          }
          renderVocabView();
        };
      });
    }
  }

  /* ========================================================================
     VIEW 3: KRAFT BINDER PRACTICE, REAL PAPERS & TAPED 3D-FLIP REVIEW CARD
     ======================================================================== */
  const DIFF_LABELS = {
    1: { name: 'LV.1 热身稳拿', cls: 'diff-lv1' },
    2: { name: 'LV.2 真题核心', cls: 'diff-lv2' },
    3: { name: 'LV.3 高分拔高', cls: 'diff-lv3' },
    4: { name: 'LV.4 冲刺压轴', cls: 'diff-lv4' }
  };

  function getFilteredQuestionPool(skillFilter) {
    if (!skillFilter || skillFilter === 'all') return QUESTION_BANK;
    const qk = toQuestionSkill(skillFilter);
    const filtered = QUESTION_BANK.filter(q => toQuestionSkill(q.skill || q.type) === qk);
    return filtered.length ? filtered : QUESTION_BANK;
  }

  function drawNextQuestionInstance(forcedQuestionId = null) {
    let chosen = null;
    if (forcedQuestionId) {
      chosen = QUESTION_BANK.find(q => q.id === forcedQuestionId) || null;
    }
    if (!chosen) {
      const pool = getFilteredQuestionPool(state.skillFilter);
      if (!pool.length) return null;
      const cooldown = Math.min(Math.max(1, pool.length - 1), 14);
      const recentIds = new Set(state.practiceHistory.slice(-cooldown).map(h => h.refId));
      let candidates = pool.filter(q => !recentIds.has(q.id));
      if (!candidates.length) candidates = pool;

      const targetLv = Math.round(state.curveLevel);
      const weighted = candidates.map(q => {
        const qDiff = Math.max(1, Math.min(4, Number(q.difficulty) || 2));
        const dist = Math.abs(qDiff - targetLv);
        let w = dist === 0 ? 4.8 : (dist === 1 ? 2.6 : 1.1);
        const rec = state.answers[q.id];
        if (!rec || !rec.checked) w *= 1.45;
        else if (!rec.correct) w *= 1.75;
        return { q, w };
      });
      const sum = weighted.reduce((s, x) => s + x.w, 0);
      let r = Math.random() * sum;
      chosen = weighted[weighted.length - 1].q;
      for (const x of weighted) {
        r -= x.w;
        if (r <= 0) { chosen = x.q; break; }
      }
    }

    state.practiceSeq += 1;
    const inst = {
      uid: `pq_${state.practiceSeq}`,
      refId: chosen.id,
      skill: toQuestionSkill(chosen.skill || chosen.type),
      diffLv: Math.max(1, Math.min(4, Number(chosen.difficulty) || 2)),
      ans: null,
      draft: {},
      activeClozeBlank: 1,
      peekExplain: false,
      reviewRightTab: 'explain',
      _reviewFlipShown: false,
      preReadLeft: 0,
      speakingTurn: -1
    };
    state.practiceHistory.push(inst);
    return inst;
  }

  function startAdaptiveSession(skillFilter = 'all', forcedQuestionId = null) {
    stopAllAudioAndTimers();
    state.skillFilter = skillFilter || 'all';
    state.practiceHistory = [];
    state.practiceIdx = 0;
    state.curveLevel = 1.5;
    state.cardFlipped = false;
    drawNextQuestionInstance(forcedQuestionId);
  }

  function launchSkillPractice(skillFilter, forcedQuestionId = null) {
    unmountRealPaperStudio();
    state.practiceMode = 'adaptive';
    startAdaptiveSession(skillFilter, forcedQuestionId);
    switchView('practice');
  }

  function launchRealPaperPractice() {
    stopAllAudioAndTimers();
    state.practiceMode = 'real_paper';
    switchView('practice');
  }

  function handleStudioXiaoKeEvent(eventType, payload) {
    if (payload && typeof payload === 'object' && payload.spriteId && payload.text) {
      reactXiaoKe(payload.spriteId, payload.text, 4500);
      return;
    }
    const msg = (payload && (payload.message || payload.text)) || (typeof payload === 'string' ? payload : '');
    const map = {
      correct: ['04_cheer_correct', msg || '历年真题这一题稳稳拿下！继续保持节奏！'],
      wrong: ['05_encourage_wrong', msg || '这题真题解析已经标出定位句，复盘一遍下次稳拿！'],
      listening: ['07_listening_audio', msg || '整卷听力已开播，紧盯转折信号词与同义替换！'],
      writing: ['06_writing_quill', msg || '真题写作已就绪，按三段式骨架稳步输出 120–180 词！'],
      translation: ['06_writing_quill', msg || '汉译英先抽主谓宾主干，再把长定语后置！'],
      finish: ['09_proud_streak', msg || '整套历年真题阅卷完成！快看看你的 710 分制智能诊断报告！'],
      report: ['09_proud_streak', msg || '真题诊断报告已生成，点最弱项即可直达破题手账！'],
      hint: ['03_thinking_hint', msg || '先找题干定位锚点词，再回原文核对同义改写！']
    };
    const picked = map[String(eventType || '').toLowerCase()] || ['10_eureka_tip', msg || '正在历年真题全卷实战中，稳扎稳打！'];
    reactXiaoKe(picked[0], picked[1], 4400);
  }

  function buildPracticeModeSwitchHTML() {
    const papers = Array.isArray(window.REAL_CET4_PAPERS) ? window.REAL_CET4_PAPERS : [];
    const paperLabel = papers.length ? `${papers.length}套实卷` : '6套实卷';
    const isReal = state.practiceMode === 'real_paper';
    return `
      <div class="practice-mode-switch">
        <div class="pmode-tabs" role="tablist" aria-label="真题实战模式切换">
          <button type="button" class="pmode-btn ${!isReal ? 'active' : ''}" data-pmode="adaptive">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span>分题型自适应精练</span>
            <span class="pmode-badge">${QUESTION_BANK.length}题</span>
          </button>
          <button type="button" class="pmode-btn is-real ${isReal ? 'active' : ''}" data-pmode="real_paper">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>完整历年真题全卷</span>
            <span class="pmode-badge">${paperLabel}</span>
          </button>
        </div>
        <span class="techo-stamp ${isReal ? 'sage' : 'terracotta'}">${isReal ? '2023.06–2026.06 历年实卷 · 710分制诊断' : '6大题型薄弱突破 · 贴纸翻卡详解'}</span>
      </div>`;
  }

  function adaptCurve(correct) {
    if (correct) state.curveLevel = Math.min(4.0, Number((state.curveLevel + 0.45).toFixed(2)));
    else state.curveLevel = Math.max(1.0, Number((state.curveLevel - 0.5).toFixed(2)));
  }

  function renderPracticeView() {
    const host = document.getElementById('practice-host');
    if (!host) return;
    const modeBarHTML = buildPracticeModeSwitchHTML();

    if (state.practiceMode === 'real_paper') {
      unmountRealPaperStudio();
      host.innerHTML = `${modeBarHTML}<div id="real-paper-studio-host"></div>`;
      host.querySelectorAll('[data-pmode]').forEach(btn => {
        btn.onclick = () => {
          const nextMode = btn.dataset.pmode;
          if (nextMode === state.practiceMode) return;
          stopAllAudioAndTimers();
          runSnapshotTurn(
            () => document.getElementById('real-paper-studio-host') || document.getElementById('practice-host'),
            () => {
              unmountRealPaperStudio();
              state.practiceMode = nextMode;
              renderPracticeView();
            },
            nextMode === 'real_paper' ? 'next' : 'prev',
            nextMode === 'real_paper' ? 'kraft' : 'grid',
            520,
            () => document.querySelector('#practice-host .practice-split-layout') || document.getElementById('real-paper-studio-host') || document.getElementById('practice-host')
          );
        };
      });
      const studioHost = document.getElementById('real-paper-studio-host');
      if (studioHost && window.RealPaperStudio && typeof window.RealPaperStudio.mount === 'function') {
        window.RealPaperStudio.mount(studioHost, {
          isMobile: false,
          storageKey: STORE_KEY,
          onXiaoKeEvent: handleStudioXiaoKeEvent,
          onAddWrongItems: mergeRealPaperWrongItems,
          onJumpSection: (secId) => {
            switchView('knowledge');
            if (secId && SECTIONS_MAP[secId]) selectSection(secId, true);
          },
          onFireworks: (x, y) => {
            FireworksFX.launch(2, (typeof x === 'number' && typeof y === 'number') ? { x, y } : null);
          }
        });
      } else if (studioHost) {
        studioHost.innerHTML = '<div class="techo-card">历年真题全卷引擎加载中，请先重新打包。</div>';
      }
      syncCompanionContext();
      return;
    }

    unmountRealPaperStudio();
    if (!state.practiceHistory.length) startAdaptiveSession(state.skillFilter);
    if (state.practiceIdx < 0) state.practiceIdx = 0;
    if (state.practiceIdx >= state.practiceHistory.length) state.practiceIdx = state.practiceHistory.length - 1;

    const inst = state.practiceHistory[state.practiceIdx];
    const q = QUESTION_BANK.find(x => x.id === inst.refId);
    if (!q) {
      host.innerHTML = '<div class="techo-card">题库尚未加载。</div>';
      return;
    }

    const skills = [
      ['all', '全题型混刷'],
      ['listening', '听力微精听'],
      ['cloze', '选词填空'],
      ['matching', '长篇匹配'],
      ['reading', '仔细阅读'],
      ['translation', '汉译英实战'],
      ['writing', '写作迁移']
    ];

    const sessDone = state.practiceHistory.filter(h => h.ans?.checked).length;
    const sessRight = state.practiceHistory.filter(h => h.ans?.checked && h.ans?.correct).length;
    const sessAcc = sessDone ? Math.round((sessRight / sessDone) * 100) : 0;
    const diffInfo = DIFF_LABELS[Math.round(state.curveLevel)] || DIFF_LABELS[2];
    const isAnswered = Boolean(inst.ans && inst.ans.checked);
    const isReviewMode = Boolean(isAnswered || inst.peekExplain);
    const animateFlipIn = isReviewMode && !inst._reviewFlipShown && !prefersReducedMotion();
    if (isReviewMode) inst._reviewFlipShown = true;

    const sidebarHTML = isReviewMode
      ? wrapReviewFlipScene(
          buildPostAnswerSidebarHTML(q, inst),
          animateFlipIn ? buildPreAnswerFlipCardHTML(q, diffInfo) : '',
          animateFlipIn
        )
      : buildPreAnswerFlipCardHTML(q, diffInfo);

    host.innerHTML = `
      ${modeBarHTML}
      <div class="skill-filter-bar">
        <div class="skill-pills-row">
          ${skills.map(([k, lbl]) => {
            const cnt = k === 'all' ? QUESTION_BANK.length : QUESTION_BANK.filter(x => toQuestionSkill(x.skill || x.type) === k).length;
            return `<button type="button" class="skill-pill ${state.skillFilter === k ? 'active' : ''}" data-pskill="${k}">${lbl} (${cnt})</button>`;
          }).join('')}
        </div>
        <span class="techo-stamp">自适应难度曲线 · 答完自动向右翻页详解</span>
      </div>

      <div class="practice-pager-bar">
        <div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap">
          <strong style="font-family:var(--font-serif);font-size:16px">真题精练 · 第 <span style="color:var(--terracotta);font-family:var(--font-num)">${state.practiceIdx + 1}</span> 题</strong>
          <span class="diff-tier-badge ${diffInfo.cls}">${diffInfo.name} · 曲线 ${state.curveLevel.toFixed(1)}/4.0</span>
          ${state.streak > 0 ? `<span class="techo-stamp terracotta">连对 ${state.streak} 题</span>` : ''}
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span style="font-size:12.2px;color:var(--text-sec);font-weight:700">本轮已答 ${sessDone} 题${sessDone ? ` · 正确率 ${sessAcc}%` : ''}</span>
          <button type="button" class="secondary-btn" id="btn-prac-reshuffle" style="padding:5.5px 12px;font-size:12px">换一批新题</button>
        </div>
      </div>

      <div class="practice-split-layout ${isReviewMode ? 'is-review-mode' : ''}">
        <div class="practice-main-col">
          ${renderSkillQuestionCardHTML(q, inst, state.practiceIdx + 1)}
          <div class="pager-footer">
            <button type="button" class="secondary-btn" id="btn-prac-prev" ${state.practiceIdx <= 0 ? 'disabled' : ''}>← 上一题</button>
            <span style="font-size:12.4px;color:var(--text-sec);font-weight:700">${escapeHTML(q.source || '四级真题精编')} · 无限自适应抽取</span>
            <button type="button" class="submit-btn" id="btn-prac-next">下一题 →</button>
          </div>
        </div>
        ${sidebarHTML}
      </div>`;

    bindPracticeViewEvents(host, q, inst, animateFlipIn);
  }

  function renderSkillQuestionCardHTML(q, inst, displayNum) {
    const skill = toQuestionSkill(q.skill || q.type);
    const meta = getSkillMeta(skill);
    const saved = inst.ans || null;
    const isLocked = Boolean(saved && saved.checked);
    const isFav = Boolean(state.favorites[q.id]);
    const cardCls = isLocked ? (saved.correct ? 'is-correct' : 'is-wrong') : '';

    let innerHTML = '';
    if (skill === 'listening') innerHTML = buildListeningBodyHTML(q, inst, isLocked);
    else if (skill === 'cloze') innerHTML = buildClozeBodyHTML(q, inst, isLocked);
    else if (skill === 'matching') innerHTML = buildMatchingBodyHTML(q, inst, isLocked);
    else if (skill === 'reading') innerHTML = buildReadingBodyHTML(q, inst, isLocked);
    else if (skill === 'translation') innerHTML = buildTranslationBodyHTML(q, inst, isLocked);
    else if (skill === 'writing') innerHTML = buildWritingBodyHTML(q, inst, isLocked);

    const footerHTML = isLocked
      ? `<div class="locked-notice-bar">
          <span>本题已完成评定并锁定，右侧手账卡已自动向右翻页展示分步解析与高频词复盘</span>
          <button type="button" class="submit-btn inline-next-btn" style="padding:7px 14px;font-size:12.4px">下一题 →</button>
        </div>`
      : `<div class="q-footer-bar">
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${(skill === 'cloze' || skill === 'translation' || skill === 'writing')
              ? `<button type="button" class="submit-btn" id="btn-submit-answer">提交并离线阅卷</button>`
              : `<span style="font-size:12.4px;color:var(--text-muted);align-self:center">点选上方选项即提交锁定，右侧同步翻页详解</span>`}
            <button type="button" class="secondary-btn" id="btn-toggle-peek">${inst.peekExplain ? '收起右侧解析' : '直接看解析'}</button>
          </div>
          <button type="button" class="btn-honey" style="padding:7px 13px;font-size:12.4px" id="btn-ask-xiaoke-hint">小克给条思路</button>
        </div>`;

    return `
      <div class="q-card ${cardCls}" data-qid="${q.id}">
        <div class="q-header">
          <div class="q-meta">
            <span class="q-num">${displayNum}</span>
            <span class="techo-stamp ${meta.badge}">${meta.label}</span>
            ${q.subtype ? `<span class="techo-stamp">${escapeHTML(q.subtype.toUpperCase())}</span>` : ''}
            ${q.source ? `<span class="techo-stamp">${escapeHTML(q.source)}</span>` : ''}
            ${isLocked ? `<span class="techo-stamp ${saved.correct ? 'sage' : 'rose'}">${saved.correct ? '已通过' : '已夹入错词夹'}</span>` : ''}
          </div>
          <button type="button" class="fav-btn ${isFav ? 'active' : ''}" id="btn-toggle-fav">
            ${isFav ? ICON.starFill : ICON.star}<span>${isFav ? '已收藏' : '收藏'}</span>
          </button>
        </div>
        ${q.title ? `<div class="q-title">${escapeHTML(q.title)}</div>` : ''}
        ${innerHTML}
        ${footerHTML}
      </div>`;
  }

  function highlightTermsHTML(text, terms) {
    let out = escapeHTML(text || '');
    (terms || []).filter(Boolean).forEach(t => {
      const safeT = String(t).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (safeT.length < 2) return;
      out = out.replace(new RegExp(`(${safeT})`, 'gi'), '<span class="signal-mark">$1</span>');
    });
    return out;
  }

  function buildListeningBodyHTML(q, inst, isLocked) {
    const turns = Array.isArray(q.scriptTurns) ? q.scriptTurns : [];
    const rate = inst.draft.rate || 1.0;
    const saved = inst.ans || null;
    const letters = ['A', 'B', 'C', 'D'];
    const showTranscript = isLocked || Boolean(inst.draft.showTranscript);

    return `
      <div class="listening-studio">
        <span class="washi-tape honey sm" aria-hidden="true"></span>
        <div class="preread-banner">
          <div>
            <strong>未听先知预读便签：</strong>
            <span>${escapeHTML(q.preReadCue || '放音前先用 15 秒横扫 A/B/C/D 选项，圈出重复名词与动作焦点。')}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="preread-countdown" id="listen-preread-label">${inst.preReadLeft > 0 ? `预读倒计时 ${inst.preReadLeft}s` : '预读就绪'}</span>
            ${!isLocked ? `<button type="button" class="secondary-btn" id="btn-preread-timer" style="padding:4px 10px;font-size:11.8px">${inst.preReadLeft > 0 ? '跳过预读' : '15s 预读倒计时'}</button>` : ''}
          </div>
        </div>

        <div class="audio-controls-row">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <button type="button" class="btn-primary" id="btn-listen-play" style="padding:8px 14px;font-size:12.6px">${ICON.headphones}<span>播放真题听力音频</span></button>
            <button type="button" class="secondary-btn" id="btn-listen-stop" style="padding:7px 12px;font-size:12.2px">停止</button>
            <button type="button" class="secondary-btn" id="btn-listen-transcript" style="padding:7px 12px;font-size:12.2px">${showTranscript ? '隐藏听力原文' : '偷看听力原文'}</button>
          </div>
          <div class="speed-pill-group">
            ${[0.85, 1.0, 1.15].map(r => `<button type="button" class="speed-pill ${Math.abs(rate - r) < 0.04 ? 'active' : ''}" data-lrate="${r}">${r}x</button>`).join('')}
          </div>
        </div>

        <div class="speaker-progress-strip">
          ${turns.map((t, i) => `<span class="turn-chip ${inst.speakingTurn === i ? 'speaking' : ''}" data-jump-turn="${i}">${escapeHTML(t.speaker || 'Audio')}#${i + 1}</span>`).join('')}
        </div>

        ${showTranscript ? `
          <div class="transcript-box">
            <div style="font-size:12px;font-weight:700;color:var(--terracotta);margin-bottom:8px">${isLocked ? '真题广播稿 · 鼠尾草绿为证据句 · 蜜糖黄为转折信号词' : '广播脚本预览（建议先盲听作答再对照）'}</div>
            ${turns.map((t, i) => `
              <div class="transcript-turn ${inst.speakingTurn === i ? 'is-speaking' : ''} ${(isLocked && t.isEvidence) ? 'is-evidence' : ''}">
                <strong>${escapeHTML(t.speaker || 'Speaker')}:</strong> ${highlightTermsHTML(t.text, isLocked ? t.signalWords : [])}
              </div>`).join('')}
            ${isLocked && q.paraphraseBridge ? `<div class="paraphrase-bridge"><strong>同义替换桥：</strong>${escapeHTML(q.paraphraseBridge)}</div>` : ''}
          </div>` : ''}
      </div>

      ${q.questionText ? `<div class="q-stem">${escapeHTML(q.questionText)}</div>` : ''}
      <div class="options-grid single-col">
        ${(q.options || []).map((opt, idx) => {
          const letter = letters[idx] || String(idx);
          let cls = '';
          if (saved && saved.checked) {
            if (letter === String(q.answer).trim().toUpperCase()) cls = 'correct';
            else if (letter === saved.userVal) cls = 'wrong';
            cls += ' locked';
          }
          const cleanOpt = String(opt).replace(/^[A-D]\s*[.)、:：]\s*/, '');
          return `<button type="button" class="opt-btn ${cls}" data-choice="${letter}" ${isLocked ? 'disabled' : ''}>
            <span class="opt-key">${letter}</span><span>${escapeHTML(cleanOpt)}</span>
          </button>`;
        }).join('')}
      </div>`;
  }

  function buildClozeBodyHTML(q, inst, isLocked) {
    const wordBank = Array.isArray(q.wordBank) ? q.wordBank : [];
    const userMap = (isLocked && inst.ans?.userVal) ? inst.ans.userVal : (inst.draft.clozeMap || {});
    const usedCodes = new Set(Object.values(userMap).filter(Boolean));
    const wordByCode = {};
    wordBank.forEach(wb => { if (wb && wb.code) wordByCode[String(wb.code).toUpperCase()] = wb; });

    const evalMap = {};
    if (isLocked && inst.ans?.evalReport?.perBlank) {
      inst.ans.evalReport.perBlank.forEach(pb => { evalMap[pb.num] = pb; });
    }

    const rawPassage = String(q.passageHtml || '');
    const renderedPassage = rawPassage.replace(/(?:\{\{(\d+)\}\}|\[(\d+)\]|___(\d+)___)/g, (_m, a, b, c) => {
      const num = Number(a || b || c);
      const code = userMap[num] || '';
      const entry = code ? wordByCode[code] : null;
      let cls = '';
      if (isLocked && evalMap[num]) {
        cls = evalMap[num].correct ? 'ok' : 'bad';
      } else if (inst.activeClozeBlank === num) {
        cls = 'active';
      } else if (code) {
        cls = 'filled';
      }
      const label = entry ? `${num}. ${code} ${entry.word}` : `[ ${num} ]`;
      return `<button type="button" class="cloze-slot ${cls}" data-cloze-slot="${num}" ${isLocked ? 'disabled' : ''}>${escapeHTML(label)}</button>`;
    });

    const bankHTML = `
      <div class="word-bank-grid">
        ${wordBank.map(wb => {
          const code = String(wb.code).toUpperCase();
          const isUsed = usedCodes.has(code);
          return `<button type="button" class="bank-tile ${isUsed ? 'used' : ''}" data-bank-code="${code}" ${isLocked ? 'disabled' : ''}>
            <span class="bt-top"><span class="bt-code">${code}</span><span>${escapeHTML(wb.word)}</span></span>
            ${isLocked ? `<span class="bt-meta">${escapeHTML(wb.pos || '')} ${escapeHTML(wb.meaning || '')}</span>` : ''}
          </button>`;
        }).join('')}
      </div>`;

    let reportHTML = '';
    if (isLocked && inst.ans?.evalReport) {
      const ev = inst.ans.evalReport;
      reportHTML = `
        <div class="grader-report-card">
          <div class="grader-head">
            <strong>选词填空逐空诊断（${ev.correctCount}/${ev.totalCount} 正确 · ${ev.pct}%）</strong>
            <span class="score-seal ${ev.passed ? 'pass' : 'fail'}">${ev.passed ? '已达标' : '待复盘'}</span>
          </div>
          <div style="font-size:13px;color:var(--text-sec);margin-bottom:10px">${escapeHTML(ev.feedback || '')}</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px">
            ${(ev.perBlank || []).map(pb => `
              <div style="padding:8px 11px;border:1px solid ${pb.correct ? 'rgba(63,122,92,0.34)' : 'rgba(194,77,77,0.34)'};border-radius:var(--radius-xs);background:${pb.correct ? 'var(--sage-soft)' : 'var(--rose-soft)'};color:var(--text);font-size:12.4px">
                <div><strong>第 ${pb.num} 空：</strong>正解 <b>${pb.answer}. ${escapeHTML(pb.word)}</b> (${escapeHTML(pb.pos || pb.posHint || '')})${!pb.correct ? ` · 你填 ${pb.user || '未填'}` : ''}</div>
                ${pb.explain ? `<div style="margin-top:3px;color:var(--text-sec)">${escapeHTML(pb.explain)}</div>` : ''}
              </div>`).join('')}
          </div>
        </div>`;
    }

    return `
      <div style="font-size:12.4px;color:var(--text-sec);margin-bottom:8px">
        先点击文中空格（当前选中第 <strong style="color:var(--terracotta)">${inst.activeClozeBlank}</strong> 空），再点击下方 A–O 词块填入；再次点击已填空位可清空。
      </div>
      <div class="passage-paper">${renderedPassage}</div>
      ${bankHTML}
      ${reportHTML}`;
  }

  function buildMatchingBodyHTML(q, inst, isLocked) {
    const paras = Array.isArray(q.paragraphs) ? q.paragraphs : [];
    const saved = inst.ans || null;
    const collapsedMap = inst.draft.collapsedParas || {};
    const ansLabel = String(q.answer || '').trim().toUpperCase();

    return `
      <div class="matching-statement-box">
        <div style="font-family:var(--font-sans);font-size:11.5px;color:var(--terracotta);font-weight:700;margin-bottom:4px">待匹配陈述句（请定位对应段落）</div>
        <div>${escapeHTML(q.statement || '')}</div>
        ${isLocked && Array.isArray(q.anchorKeywords) && q.anchorKeywords.length
          ? `<div style="margin-top:8px;font-family:var(--font-sans);font-size:12px">定位锚点词：${q.anchorKeywords.map(k => `<span class="signal-mark">${escapeHTML(k)}</span>`).join(' ')}</div>`
          : ''}
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;gap:8px;flex-wrap:wrap">
        <strong style="font-family:var(--font-serif);font-size:15px">${escapeHTML(q.passageTitle || '长篇阅读段落')}</strong>
        <button type="button" class="secondary-btn" id="btn-match-toggle-all" style="padding:4.5px 10px;font-size:11.8px">展开 / 折叠全部段落</button>
      </div>

      <div class="matching-para-list">
        ${paras.map(p => {
          const lbl = String(p.label || '').toUpperCase();
          const isAnsPara = isLocked && lbl === ansLabel;
          const isCollapsed = isAnsPara ? false : Boolean(collapsedMap[lbl]);
          const bodyText = isLocked ? highlightTermsHTML(p.text, [].concat(p.highlightTerms || [], q.anchorKeywords || [])) : escapeHTML(p.text);
          return `
            <div class="matching-para-item ${isAnsPara ? 'is-answer' : ''} ${isCollapsed ? 'collapsed' : ''}" data-para-item="${lbl}">
              <button type="button" class="matching-para-head" data-toggle-para="${lbl}">
                <span>Paragraph ${lbl}${isAnsPara ? ' · 定位依据段' : ''}</span>
                <span style="font-size:11.5px;color:var(--text-muted)">${isCollapsed ? '展开' : '收起'}</span>
              </button>
              <div class="matching-para-body">${bodyText}</div>
            </div>`;
        }).join('')}
      </div>

      <div style="font-size:12.4px;font-weight:700;color:var(--text-sec);margin-bottom:7px">选择该陈述对应的段落编号：</div>
      <div class="matching-letter-grid">
        ${paras.map(p => {
          const lbl = String(p.label || '').toUpperCase();
          let cls = '';
          if (saved && saved.checked) {
            if (lbl === ansLabel) cls = 'correct';
            else if (lbl === saved.userVal) cls = 'wrong';
          }
          return `<button type="button" class="match-letter-btn ${cls}" data-choice="${lbl}" ${isLocked ? 'disabled' : ''}>${lbl}</button>`;
        }).join('')}
      </div>`;
  }

  function buildReadingBodyHTML(q, inst, isLocked) {
    const paras = Array.isArray(q.passageParagraphs) ? q.passageParagraphs : [];
    const saved = inst.ans || null;
    const letters = ['A', 'B', 'C', 'D'];
    const evidence = String(q.evidenceSentence || '').trim();

    const passageHTML = paras.map(p => {
      let safeP = escapeHTML(p);
      if (isLocked && evidence) {
        const safeEv = escapeHTML(evidence);
        if (safeP.includes(safeEv)) {
          safeP = safeP.replace(safeEv, `<span class="evidence-hl">${safeEv}</span>`);
        }
      }
      return `<p>${safeP}</p>`;
    }).join('');

    return `
      <div class="passage-paper">
        ${q.passageTitle ? `<div style="font-weight:800;font-size:16.5px;margin-bottom:8px;color:var(--terracotta)">${escapeHTML(q.passageTitle)}</div>` : ''}
        ${passageHTML}
      </div>

      ${isLocked && q.trapType ? `<div style="margin-bottom:10px"><span class="techo-stamp rose">经典陷阱类型：${escapeHTML(q.trapType)}</span></div>` : ''}
      <div class="q-stem">${escapeHTML(q.questionText || '')}</div>
      <div class="options-grid single-col">
        ${(q.options || []).map((opt, idx) => {
          const letter = letters[idx] || String(idx);
          let cls = '';
          if (saved && saved.checked) {
            if (letter === String(q.answer).trim().toUpperCase()) cls = 'correct';
            else if (letter === saved.userVal) cls = 'wrong';
            cls += ' locked';
          }
          const cleanOpt = String(opt).replace(/^[A-D]\s*[.)、:：]\s*/, '');
          return `<button type="button" class="opt-btn ${cls}" data-choice="${letter}" ${isLocked ? 'disabled' : ''}>
            <span class="opt-key">${letter}</span><span>${escapeHTML(cleanOpt)}</span>
          </button>`;
        }).join('')}
      </div>`;
  }

  function buildTranslationBodyHTML(q, inst, isLocked) {
    const val = isLocked ? String(inst.ans?.userVal || '') : String(inst.draft.text || '');
    const showHint = Boolean(inst.draft.showBreakdown);
    const wc = window.Cet4Grader ? window.Cet4Grader.countWords(val) : (val.trim() ? val.trim().split(/\s+/).length : 0);
    const ev = isLocked ? inst.ans?.evalReport : null;
    const breakdown = Array.isArray(q.sentenceBreakdown) ? q.sentenceBreakdown : [];

    return `
      <div class="source-zh-card">${escapeHTML(q.chineseText || '')}</div>

      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:10px">
        <button type="button" class="secondary-btn" id="btn-trans-hint" style="padding:5px 12px;font-size:12px">${showHint ? '收起拆句主干提示' : '查看拆句主干提示'}</button>
        <span class="techo-stamp">当前已写 <strong id="live-wc" style="color:var(--terracotta)">${wc}</strong> 词</span>
      </div>

      ${showHint && breakdown.length ? `
        <div style="padding:12px 14px;border:1px solid rgba(206,178,114,0.52);border-left:3.5px solid var(--honey);border-radius:var(--radius-sm);background:var(--paper-sticky);margin-bottom:12px;font-size:12.6px">
          <strong style="color:var(--terracotta)">逐句主干提取思路：</strong>
          ${breakdown.map((b, i) => `<div style="margin-top:6px"><b>句${i + 1}：</b>主干 [${escapeHTML(b.core || '')}] + 修饰 [${escapeHTML(b.modifier || '')}]</div>`).join('')}
        </div>` : ''}

      <textarea class="composer-textarea" id="composer-ta" placeholder="请用完整英文句子翻译上方段落：先搭 SVO 主干，再用介词短语、非谓语或定语从句补充修饰成分..." ${isLocked ? 'disabled' : ''}>${escapeHTML(val)}</textarea>

      ${ev ? `
        <div class="grader-report-card">
          <div class="grader-head">
            <strong>汉译英离线阅卷报告（${escapeHTML(ev.bandLabel || '')}）</strong>
            <span class="score-seal ${ev.passed ? 'pass' : 'fail'}">${ev.score} / 15 分</span>
          </div>
          <div style="font-size:13px;color:var(--text-sec);margin-bottom:8px">${escapeHTML(ev.feedback || '')}</div>
          ${ev.matchedExprs?.length ? `<div class="expr-chip-row"><span style="font-size:12px;font-weight:700">命中核心表达：</span>${ev.matchedExprs.map(x => `<span class="expr-chip hit">${escapeHTML(x)}</span>`).join('')}</div>` : ''}
          ${ev.missedExprs?.length ? `<div class="expr-chip-row"><span style="font-size:12px;font-weight:700">待补核心表达：</span>${ev.missedExprs.map(x => `<span class="expr-chip miss">${escapeHTML(x)}</span>`).join('')}</div>` : ''}
          ${ev.grammarNotes?.length ? `<div style="font-size:12.4px;color:var(--text-sec);margin-top:6px"><strong>语法检查：</strong>${ev.grammarNotes.map(escapeHTML).join('；')}</div>` : ''}
          ${ev.suggestions?.length ? `<div style="font-size:12.4px;color:var(--sage);font-weight:700;margin-top:4px"><strong>提分建议：</strong>${ev.suggestions.map(escapeHTML).join(' ')}</div>` : ''}
          ${q.referenceTranslation ? `<div style="margin-top:10px"><strong style="font-size:12.8px">高分参考译文：</strong><div class="model-paper-box">${escapeHTML(q.referenceTranslation)}</div></div>` : ''}
        </div>` : ''}`;
  }

  function buildWritingBodyHTML(q, inst, isLocked) {
    const val = isLocked ? String(inst.ans?.userVal || '') : String(inst.draft.text || '');
    const wc = window.Cet4Grader ? window.Cet4Grader.countWords(val) : (val.trim() ? val.trim().split(/\s+/).length : 0);
    const targetMin = (q.wordTarget && q.wordTarget[0]) || 120;
    const targetMax = (q.wordTarget && q.wordTarget[1]) || 180;
    const gaugePct = Math.min(100, Math.round((wc / targetMax) * 100));
    const gaugeCls = wc >= targetMin && wc <= targetMax ? 'in-band' : (wc > targetMax ? 'over-band' : '');
    const ev = isLocked ? inst.ans?.evalReport : null;
    const bp = Array.isArray(q.logicBlueprint) ? q.logicBlueprint : [];
    const patterns = Array.isArray(q.transferablePatterns) ? q.transferablePatterns : [];

    return `
      <div class="source-zh-card" style="font-family:var(--font-serif);font-size:14.4px">
        <div style="font-family:var(--font-sans);font-size:11.8px;font-weight:700;color:var(--terracotta);margin-bottom:4px">CET-4 Writing Directions · ${escapeHTML(q.essayType || '三段式写作')}</div>
        <div>${escapeHTML(q.directions || '')}</div>
      </div>

      ${bp.length ? `
        <div class="writing-blueprint-strip">
          ${bp.slice(0, 3).map((p, i) => `<div class="wb-step"><strong>第 0${i + 1} 段逻辑骨架</strong>${escapeHTML(p)}</div>`).join('')}
        </div>` : ''}

      ${patterns.length && !isLocked ? `
        <div style="font-size:12px;font-weight:700;color:var(--text-sec);margin-bottom:6px">可迁移高分句型（点击一键插入写作框）：</div>
        <div class="pattern-chips-wrap">
          ${patterns.map((pt, i) => `<button type="button" class="pattern-chip" data-insert-pat="${i}" title="${escapeHTML(pt.zh || pt.usage || '')}">+ ${escapeHTML(pt.en)}</button>`).join('')}
        </div>` : ''}

      <div class="word-gauge-bar">
        <span>实时词数：<strong id="live-wc" style="font-family:var(--font-num);color:var(--terracotta)">${wc}</strong> 词（黄金区间 ${targetMin}–${targetMax} 词）</span>
        <div class="word-gauge-track"><div class="word-gauge-fill ${gaugeCls}" id="live-wc-fill" style="width:${gaugePct}%"></div></div>
        <span id="live-wc-tag" style="color:${wc >= targetMin && wc <= targetMax ? 'var(--sage)' : 'var(--text-muted)'}">${wc >= targetMin && wc <= targetMax ? '篇幅达标' : (wc < targetMin ? `还差 ${targetMin - wc} 词` : '篇幅充沛')}</span>
      </div>

      <textarea class="composer-textarea" id="composer-ta" style="min-height:190px" placeholder="Write your 3-paragraph CET-4 essay here (120–180 words)..." ${isLocked ? 'disabled' : ''}>${escapeHTML(val)}</textarea>

      ${ev ? `
        <div class="grader-report-card">
          <div class="grader-head">
            <strong>作文四维离线阅卷（${escapeHTML(ev.bandLabel || '')} · ${ev.wordCount} 词 / ${ev.paraCount} 段）</strong>
            <span class="score-seal ${ev.passed ? 'pass' : 'fail'}">${ev.score} / 15 分</span>
          </div>
          <div style="font-size:13px;color:var(--text-sec);margin-bottom:8px">${escapeHTML(ev.feedback || '')}</div>
          ${ev.dimensions ? `
            <div class="dim-bars-grid">
              <div class="dim-item"><strong>内容切题度：</strong>${ev.dimensions.content} / 4</div>
              <div class="dim-item"><strong>三段衔接结构：</strong>${ev.dimensions.structure} / 4</div>
              <div class="dim-item"><strong>语言亮点句型：</strong>${ev.dimensions.language} / 4</div>
              <div class="dim-item"><strong>篇幅词数控制：</strong>${ev.dimensions.length} / 3</div>
            </div>` : ''}
          ${ev.matchedPatterns?.length ? `<div class="expr-chip-row"><span style="font-size:12px;font-weight:700">命中加分句型：</span>${ev.matchedPatterns.map(x => `<span class="expr-chip hit">${escapeHTML(x)}</span>`).join('')}</div>` : ''}
          ${ev.suggestions?.length ? `<div style="font-size:12.4px;color:var(--sage);font-weight:700;margin-top:6px"><strong>润色建议：</strong>${ev.suggestions.map(escapeHTML).join(' ')}</div>` : ''}
          ${q.modelEssay ? `<div style="margin-top:10px"><strong style="font-size:12.8px">高分范文参照：</strong><div class="model-paper-box">${escapeHTML(q.modelEssay)}</div></div>` : ''}
          ${Array.isArray(q.sentenceDissection) && q.sentenceDissection.length ? `
            <div style="margin-top:10px">
              <strong style="font-size:12.8px">范文亮句拆解：</strong>
              ${q.sentenceDissection.map(sd => `<div style="margin-top:6px;padding:9px 12px;border:1px solid var(--border-paper);border-radius:var(--radius-xs);background:var(--paper-elevated);font-size:12.6px">
                <div style="font-family:var(--font-serif);font-weight:700;color:var(--text)">${escapeHTML(sd.en)}</div>
                <div style="color:var(--text-sec);margin-top:3px">${escapeHTML(sd.zh)} ${sd.highlight ? `<span class="techo-stamp sage">${escapeHTML(sd.highlight)}</span>` : ''}</div>
              </div>`).join('')}
            </div>` : ''}
        </div>` : ''}`;
  }

  /* -------------------- Taped Cream 3D-Flip Study Card Sidebar -------------------- */
  function buildPreAnswerFlipCardHTML(q, diffInfo) {
    const skill = toQuestionSkill(q.skill || q.type);
    const meta = getSkillMeta(skill);
    const sum = getTopicSummary(skill);
    const skStats = computeSkillMastery(skill);
    const svgArt = SKILL_SVGS[meta.topicKey] || SKILL_SVGS.listen;

    return `
      <aside class="flip-sidebar practice-side">
        <div class="flip-scene">
          <div class="flip-card ${state.cardFlipped ? 'flipped' : 'dealing'}" id="summary-flip-card" role="button" tabindex="0">
            <div class="flip-face flip-front">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:4px">
                <span class="m-tier-pill"><span class="salon-dot"></span>题型学习卡</span>
                <span class="m-tier-pill">${diffInfo.name}</span>
              </div>
              <div class="flip-svg-hero" aria-hidden="true">
                ${svgArt}
                <img class="flip-mascot-badge" src="${getSpriteSrc(meta.sprite)}" alt="小克">
              </div>
              <div>
                <div style="font-family:var(--font-serif);font-size:17.5px;font-weight:800;margin-bottom:6px">${escapeHTML(sum.title || meta.label)}</div>
                <div class="m-bar-wrap" style="margin-bottom:9px">
                  <div class="m-bar-head"><span>本技能当前熟练度</span><span>${skStats.pct}%</span></div>
                  <div class="m-bar-track"><div class="m-bar-fill" style="width:${skStats.pct}%;background:var(--terracotta)"></div></div>
                </div>
                <div class="flip-formula-pill" style="font-size:12px">${escapeHTML(sum.formula || '')}</div>
              </div>
              <button type="button" class="flip-cta-btn" id="btn-flip-front">向右翻页 · 查看口诀与避坑便签</button>
            </div>

            <div class="flip-face flip-back">
              <div class="flip-back-head">
                <div>
                  <div style="font-family:var(--font-num);font-size:10.5px;font-weight:700;color:var(--terracotta)">STUDY NOTE · BACK</div>
                  <div style="font-family:var(--font-serif);font-size:15.5px;font-weight:800">${escapeHTML(sum.title || meta.label)}</div>
                </div>
                <span class="techo-stamp ${meta.badge}">${meta.short}</span>
              </div>
              <div class="flip-back-body">
                <div class="flip-formula-pill">${escapeHTML(sum.formula || '')}</div>
                <ul class="flip-points">
                  ${(sum.checklist || []).map(pt => `<li>${escapeHTML(pt)}</li>`).join('')}
                  ${(sum.quickTips || []).map(pt => `<li>${escapeHTML(pt)}</li>`).join('')}
                </ul>
                ${sum.trapWarning ? `<div class="flip-trap-box"><strong>考场避坑：</strong>${escapeHTML(sum.trapWarning)}</div>` : ''}
              </div>
              <div class="flip-back-foot">
                <button type="button" class="secondary-btn" id="btn-flip-back">翻回正面</button>
                <button type="button" class="submit-btn" id="btn-flip-jump-sec" data-jump-sec="${escapeHTML(q.sectionId || '')}">回看精讲 →</button>
              </div>
            </div>
          </div>
        </div>
      </aside>`;
  }

  function buildPostAnswerSidebarHTML(q, inst) {
    const skill = toQuestionSkill(q.skill || q.type);
    const meta = getSkillMeta(skill);
    const sum = getTopicSummary(skill);
    const detail = EXPLAIN_DETAILS[q.id] || null;
    const saved = inst.ans || null;
    const activeTab = inst.reviewRightTab || 'explain';

    let spriteId = '10_eureka_tip', vCls = 'info', vTxt = '本题深度分步解析与高频词复盘';
    if (saved && saved.checked) {
      if (saved.correct) {
        spriteId = state.streak >= 3 ? '09_proud_streak' : '04_cheer_correct';
        vCls = 'ok';
        vTxt = saved.evalReport && saved.evalReport.maxScore === 15
          ? `离线阅卷达标（${saved.evalReport.score}/15 分）！`
          : '回答正确！冲刺雷达熟练度已同步上涨';
      } else {
        spriteId = '05_encourage_wrong';
        vCls = 'bad';
        vTxt = '已自动收入错词夹！对照分步解析立刻拿捏';
      }
    }

    const detailHTML = detail
      ? `<div class="explain-detail-card">
          <div style="margin-bottom:9px">
            <span class="ex-sec-tag why">核心破题点</span>
            <p style="font-size:13px;color:var(--text);font-weight:600;line-height:1.68">${escapeHTML(detail.why)}</p>
          </div>
          <div style="margin-bottom:9px">
            <span class="ex-sec-tag steps">逐步破题路径</span>
            <ol class="ex-step-list">
              ${(detail.steps || []).map((st, i) => `<li class="ex-step-item"><span class="ex-step-num">${i + 1}</span><span>${escapeHTML(st)}</span></li>`).join('')}
            </ol>
          </div>
          ${detail.pitfall ? `
            <div style="padding:9px 12px;border:1px solid rgba(206,178,114,0.52);border-left:3px solid var(--honey);border-radius:var(--radius-xs);background:var(--paper-sticky);font-size:12.5px">
              <span class="ex-sec-tag pitfall" style="margin-bottom:3px">考场避坑</span>
              <div>${escapeHTML(detail.pitfall)}</div>
            </div>` : ''}
          ${Array.isArray(detail.vocabHighlights) && detail.vocabHighlights.length ? `
            <div style="margin-top:10px">
              <div style="font-size:11.8px;font-weight:700;color:var(--text-muted);margin-bottom:5px">本题高频词点睛：</div>
              <div class="ex-vocab-list">
                ${detail.vocabHighlights.map(vh => `<span class="ex-vocab-pill"><strong>${escapeHTML(vh.word)}</strong>${escapeHTML(vh.meaning)}</span>`).join('')}
              </div>
            </div>` : ''}
        </div>`
      : '<div class="explain-detail-card">暂无分步详解，请结合左侧高亮依据句与参考范本复盘。</div>';

    return `
      <aside class="review-explain-sidebar practice-side" id="review-explain-sidebar">
        <div class="re-head">
          <div class="re-head-top">
            <img class="re-mascot" src="${getSpriteSrc(spriteId)}" alt="小克点评">
            <div style="min-width:0;flex:1">
              <div class="re-verdict ${vCls}">${vTxt}</div>
              <div style="font-size:11.6px;color:var(--text-muted);margin-top:2px">${meta.label} · ${escapeHTML(q.source || '')}</div>
            </div>
          </div>
          <div class="re-subtabs">
            <button type="button" class="re-subtab-btn ${activeTab === 'explain' ? 'active' : ''}" data-rpanel="explain">本题深度解析</button>
            <button type="button" class="re-subtab-btn ${activeTab === 'knowledge' ? 'active' : ''}" data-rpanel="knowledge">题型口诀速览</button>
          </div>
        </div>

        <div class="re-body">
          <div class="re-pane ${activeTab !== 'explain' ? 'hidden' : ''}" data-rpanel-body="explain">
            ${detailHTML}
          </div>
          <div class="re-pane ${activeTab !== 'knowledge' ? 'hidden' : ''}" data-rpanel-body="knowledge">
            <div class="flip-formula-pill" style="margin-bottom:10px">${escapeHTML(sum.formula || '')}</div>
            <ul class="flip-points" style="margin-bottom:10px">
              ${(sum.checklist || []).map(pt => `<li>${escapeHTML(pt)}</li>`).join('')}
              ${(sum.quickTips || []).map(pt => `<li>${escapeHTML(pt)}</li>`).join('')}
            </ul>
            ${sum.trapWarning ? `<div class="flip-trap-box"><strong>核心避坑：</strong>${escapeHTML(sum.trapWarning)}</div>` : ''}
          </div>
        </div>

        <div class="re-foot">
          <button type="button" class="secondary-btn" id="btn-re-flip-tab">${activeTab === 'explain' ? '翻页看题型口诀' : '翻回本题详解'}</button>
          <button type="button" class="submit-btn" id="btn-re-jump-sec" data-jump-sec="${escapeHTML(q.sectionId || '')}">回本节精讲 →</button>
        </div>
      </aside>`;
  }

  function wrapReviewFlipScene(backHTML, frontHTML, animate) {
    if (!animate || !frontHTML) return backHTML;
    return `
      <div class="review-flip-scene">
        <div class="review-flip-card">
          <div class="rf-face rf-front">${frontHTML}</div>
          <div class="rf-face rf-back">${backHTML}</div>
        </div>
      </div>`;
  }

  function runReviewFlipIn(rootEl) {
    const scene = rootEl.querySelector('.review-flip-scene');
    const card = scene && scene.querySelector('.review-flip-card');
    if (!scene || !card) return;
    const front = scene.querySelector('.rf-front');
    const back = scene.querySelector('.rf-back');
    let done = false;
    const settle = () => {
      if (done) return;
      done = true;
      if (front) front.remove();
      scene.classList.add('is-settled');
      card.classList.remove('flipped');
    };
    if (window.TechoPageTurn && typeof window.TechoPageTurn.turnLayers === 'function' && front && back) {
      window.TechoPageTurn.turnLayers(card, front, back, {
        dir: 'next',
        mode: 'card',
        paperStyle: 'grid',
        duration: 580,
        onComplete: settle
      });
    } else {
      settle();
    }
  }

  function normalizeTranslationForGrader(q) {
    const keyExpressions = Array.isArray(q.keyExpressions)
      ? q.keyExpressions.map(expr => {
          if (expr && typeof expr === 'object' && Array.isArray(expr.en)) {
            return Object.assign({}, expr, { en: expr.en[0] || '', alts: expr.en.slice(1) });
          }
          return expr;
        })
      : [];
    return Object.assign({}, q, {
      sourceZh: q.chineseText || q.sourceZh || '',
      modelAnswer: q.referenceTranslation || q.modelAnswer || '',
      keyExpressions
    });
  }

  function finalizePracticeAnswer(q, inst, resultObj, clickEvent) {
    const rec = {
      checked: true,
      correct: Boolean(resultObj.correct),
      userVal: resultObj.userVal,
      evalReport: resultObj.evalReport || null
    };
    inst.ans = rec;
    inst.peekExplain = false;
    inst.reviewRightTab = 'explain';
    state.answers[q.id] = rec;

    if (rec.correct) {
      state.streak += 1;
      FireworksFX.launch(state.streak >= 3 ? 2 : 1, clickEvent ? getEventOrigin(clickEvent) : null);
      if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.onCorrectAnswer === 'function') {
        window.XiaoKeAssistant.onCorrectAnswer(q, state.streak);
      }
    } else {
      state.streak = 0;
      if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.onWrongAnswer === 'function') {
        window.XiaoKeAssistant.onWrongAnswer(q);
      }
    }
    adaptCurve(rec.correct);
    saveState();
    updateGlobalStats();
    renderPracticeView();
  }

  function bindPracticeViewEvents(host, q, inst, animateFlipIn) {
    const skill = toQuestionSkill(q.skill || q.type);
    const isLocked = Boolean(inst.ans && inst.ans.checked);

    const goNext = () => {
      stopAllAudioAndTimers();
      state.cardFlipped = false;
      window.scrollTo({ top: 64, behavior: 'auto' });
      runSnapshotTurn(
        () => host.querySelector('.q-card') || host,
        () => {
          if (state.practiceIdx < state.practiceHistory.length - 1) {
            state.practiceIdx += 1;
          } else {
            drawNextQuestionInstance();
            state.practiceIdx = state.practiceHistory.length - 1;
          }
          renderPracticeView();
        },
        'next',
        'grid',
        540
      );
    };
    const goPrev = () => {
      if (state.practiceIdx <= 0) return;
      stopAllAudioAndTimers();
      state.cardFlipped = false;
      window.scrollTo({ top: 64, behavior: 'auto' });
      runSnapshotTurn(
        () => host.querySelector('.q-card') || host,
        () => {
          state.practiceIdx -= 1;
          renderPracticeView();
        },
        'prev',
        'grid',
        540
      );
    };

    host.querySelectorAll('[data-pmode]').forEach(btn => {
      btn.onclick = () => {
        const nextMode = btn.dataset.pmode;
        if (nextMode === state.practiceMode) return;
        stopAllAudioAndTimers();
        runSnapshotTurn(
          () => host.querySelector('.practice-split-layout') || host.querySelector('.q-card') || host,
          () => {
            state.practiceMode = nextMode;
            renderPracticeView();
          },
          nextMode === 'real_paper' ? 'next' : 'prev',
          nextMode === 'real_paper' ? 'kraft' : 'grid',
          520,
          () => document.getElementById('real-paper-studio-host') || host.querySelector('.practice-split-layout') || host.querySelector('.q-card') || host
        );
      };
    });

    host.querySelectorAll('[data-pskill]').forEach(btn => {
      btn.onclick = () => {
        runSnapshotTurn(
          () => host.querySelector('.q-card') || host,
          () => {
            startAdaptiveSession(btn.dataset.pskill);
            renderPracticeView();
          },
          'next',
          'grid',
          540
        );
      };
    });
    document.getElementById('btn-prac-next')?.addEventListener('click', goNext);
    document.getElementById('btn-prac-prev')?.addEventListener('click', goPrev);
    host.querySelectorAll('.inline-next-btn').forEach(b => { b.onclick = goNext; });
    document.getElementById('btn-prac-reshuffle')?.addEventListener('click', () => {
      runSnapshotTurn(
        () => host.querySelector('.q-card') || host,
        () => {
          startAdaptiveSession(state.skillFilter);
          renderPracticeView();
        },
        'next',
        'grid',
        540
      );
      reactXiaoKe('04_cheer_correct', '已重新抽题，开启新一轮自适应真题精练！', 3400);
    });

    document.getElementById('btn-toggle-fav')?.addEventListener('click', () => {
      state.favorites[q.id] = !state.favorites[q.id];
      saveState();
      updateGlobalStats();
      renderPracticeView();
    });

    document.getElementById('btn-toggle-peek')?.addEventListener('click', () => {
      inst.peekExplain = !inst.peekExplain;
      if (!inst.peekExplain) inst._reviewFlipShown = false;
      renderPracticeView();
    });

    document.getElementById('btn-ask-xiaoke-hint')?.addEventListener('click', () => {
      if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.showHint === 'function') {
        window.XiaoKeAssistant.showHint();
      } else if (Array.isArray(q.hintSteps) && q.hintSteps.length) {
        inst._hintIdx = ((inst._hintIdx || 0) % q.hintSteps.length);
        reactXiaoKe('03_thinking_hint', q.hintSteps[inst._hintIdx], 5000);
        inst._hintIdx += 1;
      }
    });

    host.querySelectorAll('[data-choice]').forEach(btn => {
      btn.onclick = (e) => {
        if (isLocked) return;
        stopAllAudioAndTimers();
        const picked = btn.dataset.choice;
        const res = window.Cet4Grader
          ? window.Cet4Grader.gradeObjective(q, picked)
          : { correct: String(picked).toUpperCase() === String(q.answer).trim().toUpperCase() };
        finalizePracticeAnswer(q, inst, { correct: res.correct, userVal: picked, evalReport: res }, e);
      };
    });

    if (skill === 'listening') {
      const turns = Array.isArray(q.scriptTurns) ? q.scriptTurns : [];
      const playScript = (startIdx = 0) => {
        stopAllAudioAndTimers();
        if (!window.Cet4Speech || typeof window.Cet4Speech.playListeningScript !== 'function') return;
        reactXiaoKe('07_listening_audio', '听力录音已开播！紧盯转折词 but / however 和同义改写。', 3600);
        listenCtrl = window.Cet4Speech.playListeningScript(turns, {
          startIndex: startIdx,
          rate: inst.draft.rate || 1.0,
          onTurnStart: (idx) => {
            inst.speakingTurn = idx;
            host.querySelectorAll('.turn-chip').forEach((el, i) => el.classList.toggle('speaking', i === idx));
            host.querySelectorAll('.transcript-turn').forEach((el, i) => el.classList.toggle('is-speaking', i === idx));
          },
          onFinish: () => {
            inst.speakingTurn = -1;
            host.querySelectorAll('.turn-chip').forEach(el => el.classList.remove('speaking'));
            host.querySelectorAll('.transcript-turn').forEach(el => el.classList.remove('is-speaking'));
          }
        });
      };

      document.getElementById('btn-listen-play')?.addEventListener('click', () => playScript(0));
      document.getElementById('btn-listen-stop')?.addEventListener('click', () => {
        stopAllAudioAndTimers();
        inst.speakingTurn = -1;
        host.querySelectorAll('.turn-chip').forEach(el => el.classList.remove('speaking'));
      });
      document.getElementById('btn-listen-transcript')?.addEventListener('click', () => {
        inst.draft.showTranscript = !inst.draft.showTranscript;
        renderPracticeView();
      });
      host.querySelectorAll('[data-lrate]').forEach(btn => {
        btn.onclick = () => {
          inst.draft.rate = Number(btn.dataset.lrate) || 1.0;
          if (listenCtrl && typeof listenCtrl.setRate === 'function') listenCtrl.setRate(inst.draft.rate);
          renderPracticeView();
        };
      });
      host.querySelectorAll('[data-jump-turn]').forEach(chip => {
        chip.onclick = () => playScript(Number(chip.dataset.jumpTurn) || 0);
      });
      document.getElementById('btn-preread-timer')?.addEventListener('click', () => {
        if (preReadTimer) {
          clearInterval(preReadTimer);
          preReadTimer = null;
          inst.preReadLeft = 0;
          renderPracticeView();
          playScript(0);
          return;
        }
        inst.preReadLeft = 15;
        const lbl = document.getElementById('listen-preread-label');
        const btn = document.getElementById('btn-preread-timer');
        if (lbl) lbl.textContent = `预读倒计时 ${inst.preReadLeft}s`;
        if (btn) btn.textContent = '跳过预读';
        preReadTimer = setInterval(() => {
          inst.preReadLeft -= 1;
          const lEl = document.getElementById('listen-preread-label');
          if (inst.preReadLeft <= 0) {
            clearInterval(preReadTimer);
            preReadTimer = null;
            if (lEl) lEl.textContent = '预读完成 · 自动开播';
            playScript(0);
          } else if (lEl) {
            lEl.textContent = `预读倒计时 ${inst.preReadLeft}s`;
          }
        }, 1000);
      });
    }

    if (skill === 'cloze' && !isLocked) {
      const blanks = Array.isArray(q.blanks) ? q.blanks : [];
      if (!inst.draft.clozeMap) inst.draft.clozeMap = {};
      host.querySelectorAll('[data-cloze-slot]').forEach(slotBtn => {
        slotBtn.onclick = () => {
          const num = Number(slotBtn.dataset.clozeSlot);
          if (inst.activeClozeBlank === num && inst.draft.clozeMap[num]) {
            delete inst.draft.clozeMap[num];
          } else {
            inst.activeClozeBlank = num;
          }
          renderPracticeView();
        };
      });
      host.querySelectorAll('[data-bank-code]').forEach(tileBtn => {
        tileBtn.onclick = () => {
          const code = tileBtn.dataset.bankCode;
          const targetNum = inst.activeClozeBlank || (blanks[0]?.num || 1);
          inst.draft.clozeMap[targetNum] = code;
          const nextEmpty = blanks.find(b => !inst.draft.clozeMap[b.num]);
          if (nextEmpty) inst.activeClozeBlank = nextEmpty.num;
          renderPracticeView();
        };
      });
      document.getElementById('btn-submit-answer')?.addEventListener('click', (e) => {
        const res = window.Cet4Grader
          ? window.Cet4Grader.gradeCloze(q, inst.draft.clozeMap)
          : { passed: false, correctCount: 0, totalCount: blanks.length, pct: 0, perBlank: [] };
        finalizePracticeAnswer(q, inst, { correct: res.passed, userVal: Object.assign({}, inst.draft.clozeMap), evalReport: res }, e);
      });
    }

    if (skill === 'matching') {
      if (!inst.draft.collapsedParas) inst.draft.collapsedParas = {};
      host.querySelectorAll('[data-toggle-para]').forEach(btn => {
        btn.onclick = () => {
          const lbl = btn.dataset.togglePara;
          inst.draft.collapsedParas[lbl] = !inst.draft.collapsedParas[lbl];
          renderPracticeView();
        };
      });
      document.getElementById('btn-match-toggle-all')?.addEventListener('click', () => {
        const paras = Array.isArray(q.paragraphs) ? q.paragraphs : [];
        const anyOpen = paras.some(p => !inst.draft.collapsedParas[String(p.label).toUpperCase()]);
        paras.forEach(p => { inst.draft.collapsedParas[String(p.label).toUpperCase()] = anyOpen; });
        renderPracticeView();
      });
    }

    if ((skill === 'translation' || skill === 'writing') && !isLocked) {
      const ta = document.getElementById('composer-ta');
      const updateWC = (txt) => {
        inst.draft.text = txt;
        const wc = window.Cet4Grader ? window.Cet4Grader.countWords(txt) : (txt.trim() ? txt.trim().split(/\s+/).length : 0);
        const wcEl = document.getElementById('live-wc');
        if (wcEl) wcEl.textContent = String(wc);
        if (skill === 'writing') {
          const min = (q.wordTarget && q.wordTarget[0]) || 120;
          const max = (q.wordTarget && q.wordTarget[1]) || 180;
          const fill = document.getElementById('live-wc-fill');
          const tag = document.getElementById('live-wc-tag');
          if (fill) {
            fill.style.width = `${Math.min(100, Math.round((wc / max) * 100))}%`;
            fill.className = `word-gauge-fill ${wc >= min && wc <= max ? 'in-band' : (wc > max ? 'over-band' : '')}`;
          }
          if (tag) {
            tag.textContent = wc >= min && wc <= max ? '篇幅达标' : (wc < min ? `还差 ${min - wc} 词` : '篇幅充沛');
            tag.style.color = wc >= min && wc <= max ? 'var(--sage)' : 'var(--text-muted)';
          }
        }
      };
      if (ta) ta.addEventListener('input', () => updateWC(ta.value));

      document.getElementById('btn-trans-hint')?.addEventListener('click', () => {
        inst.draft.showBreakdown = !inst.draft.showBreakdown;
        renderPracticeView();
      });

      host.querySelectorAll('[data-insert-pat]').forEach(chip => {
        chip.onclick = () => {
          const idx = Number(chip.dataset.insertPat);
          const pat = (q.transferablePatterns || [])[idx];
          if (!pat || !ta) return;
          const sep = ta.value && !/\s$/.test(ta.value) ? ' ' : '';
          ta.value = `${ta.value}${sep}${pat.en}`;
          updateWC(ta.value);
          ta.focus();
          reactXiaoKe('06_writing_quill', `已插入迁移句型：${pat.zh || pat.en}`, 3400);
        };
      });

      document.getElementById('btn-submit-answer')?.addEventListener('click', (e) => {
        const text = ta ? ta.value : (inst.draft.text || '');
        let rep = null;
        if (skill === 'translation' && window.Cet4Grader) {
          rep = window.Cet4Grader.gradeTranslation(normalizeTranslationForGrader(q), text);
        } else if (skill === 'writing' && window.Cet4Grader) {
          rep = window.Cet4Grader.gradeWriting(q, text);
        }
        finalizePracticeAnswer(q, inst, { correct: Boolean(rep && rep.passed), userVal: text, evalReport: rep }, e);
      });
    }

    const flipCard = document.getElementById('summary-flip-card');
    if (flipCard) {
      if (window.TechoPageTurn && typeof window.TechoPageTurn.attachCornerPeek === 'function') {
        window.TechoPageTurn.attachCornerPeek(flipCard, {
          paperStyle: 'grid',
          isFlipped: () => Boolean(state.cardFlipped),
          getTopFace: () => flipCard.querySelector(state.cardFlipped ? '.flip-back' : '.flip-front'),
          getBottomFace: () => flipCard.querySelector(state.cardFlipped ? '.flip-front' : '.flip-back')
        });
      }
      const toggleFlip = (e) => {
        if (e && e.target.closest('#btn-flip-jump-sec')) return;
        if (window.TechoPageTurn && typeof window.TechoPageTurn.cancelStageTurn === 'function') {
          window.TechoPageTurn.cancelStageTurn(flipCard);
        }
        flipCard.classList.toggle('flipped', Boolean(state.cardFlipped));
        const frontEl = flipCard.querySelector('.flip-front');
        const backEl = flipCard.querySelector('.flip-back');
        const nextFlipped = !state.cardFlipped;
        state.cardFlipped = nextFlipped;
        flipCard.classList.remove('dealing');
        if (window.TechoPageTurn && typeof window.TechoPageTurn.turnLayers === 'function' && frontEl && backEl) {
          window.TechoPageTurn.turnLayers(
            flipCard,
            nextFlipped ? frontEl : backEl,
            nextFlipped ? backEl : frontEl,
            {
              dir: nextFlipped ? 'next' : 'prev',
              mode: 'card',
              paperStyle: 'grid',
              duration: 480,
              onComplete: () => {
                flipCard.classList.toggle('flipped', state.cardFlipped);
              }
            }
          );
        } else {
          flipCard.classList.toggle('flipped', nextFlipped);
        }
      };
      flipCard.onclick = toggleFlip;
      flipCard.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(e); } };
    }

    const sidebar = document.getElementById('review-explain-sidebar');
    if (sidebar) {
      const switchRightTab = (nextKey) => {
        if (inst.reviewRightTab === nextKey) return;
        const dir = nextKey === 'knowledge' ? 'next' : 'prev';
        inst.reviewRightTab = nextKey;
        const apply = () => {
          sidebar.querySelectorAll('.re-subtab-btn').forEach(b => b.classList.toggle('active', b.dataset.rpanel === nextKey));
          sidebar.querySelectorAll('.re-pane').forEach(p => p.classList.toggle('hidden', p.dataset.rpanelBody !== nextKey));
          const footBtn = document.getElementById('btn-re-flip-tab');
          if (footBtn) footBtn.textContent = nextKey === 'explain' ? '翻页看题型口诀' : '翻回本题详解';
        };
        const bodyEl = sidebar.querySelector('.re-body') || sidebar;
        runSnapshotTurn(() => bodyEl, apply, dir, 'grid', 480);
      };
      sidebar.querySelectorAll('.re-subtab-btn').forEach(b => { b.onclick = () => switchRightTab(b.dataset.rpanel); });
      document.getElementById('btn-re-flip-tab')?.addEventListener('click', () => {
        switchRightTab(inst.reviewRightTab === 'explain' ? 'knowledge' : 'explain');
      });
      if (animateFlipIn) runReviewFlipIn(host);
    }

    host.querySelectorAll('[data-jump-sec]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const sid = btn.dataset.jumpSec;
        switchView('knowledge');
        if (sid && SECTIONS_MAP[sid]) selectSection(sid, true);
      };
    });

    syncCompanionContext();
  }

  /* ========================================================================
     VIEW 4: HOBONICHI MONTHLY TRACKER & 6 SOFT-ELEVATED LINEN SKILL CARDS
     ======================================================================== */
  function renderMasteryView() {
    const host = document.getElementById('mastery-host');
    if (!host) return;
    const st = computeReadinessStats();
    const circ = 2 * Math.PI * 52;
    const offset = circ * (1 - st.overallPct / 100);
    const weakest = st.skills.slice().sort((a, b) => a.pct - b.pct)[0];
    const weakestMeta = weakest ? getSkillMeta(weakest.skill) : SKILL_META.listening;

    const cardsHTML = st.skills.map((sk, idx) => {
      const meta = getSkillMeta(sk.skill);
      const topicObj = MASTERY_TOPICS.find(t => toTopicSkill(t.id) === sk.topicKey) || {};
      const dotCls = sk.pct >= 70 ? '' : (sk.pct >= 30 ? 'mid' : 'low');
      const tier = sk.pct >= 85 ? '高分精通' : (sk.pct >= 55 ? '稳步进阶' : (sk.pct >= 25 ? '巩固提速' : '待补强'));
      const firstSecId = (topicObj.sectionIds && topicObj.sectionIds[0]) || (SECTIONS_LIST.find(s => toTopicSkill(s.skillId) === sk.topicKey)?.id || '');

      return `
        <div class="linen-skill-card ${meta.tone}">
          <div class="m-card-top">
            <span class="m-card-icon">SKILL 0${idx + 1}</span>
            <span class="m-tier-pill"><span class="salon-dot ${dotCls}"></span>${tier} · ${sk.pct}%</span>
          </div>
          <div class="p-svg-window" aria-hidden="true">${SKILL_SVGS[sk.topicKey] || SKILL_SVGS.listen}</div>
          <div class="m-card-title">${escapeHTML(topicObj.name || meta.label)}</div>
          <div class="m-card-sub">${escapeHTML(topicObj.desc || `分值占比 ${topicObj.weightPct || 15}% · 目标 ${topicObj.targetScore || '稳拿高分'}`)}</div>
          <div class="m-bar-wrap">
            <div class="m-bar-head">
              <span>精讲 ${sk.studiedCnt}/${sk.secTotal} · 真题 ${sk.right}/${sk.total}</span>
              <span>${sk.pct}%</span>
            </div>
            <div class="m-bar-track"><div class="m-bar-fill" style="width:${sk.pct}%"></div></div>
          </div>
          <div class="m-card-actions">
            <button type="button" class="m-card-btn" data-m-sec="${escapeHTML(firstSecId)}">破题精讲</button>
            <button type="button" class="m-card-btn primary-salon" data-m-skill="${sk.skill}">专项提分</button>
          </div>
        </div>`;
    }).join('');

    host.innerHTML = `
      <div class="mastery-tracker-card">
        <span class="washi-tape sage sm" aria-hidden="true"></span>
        <div class="mastery-meter-box">
          <svg viewBox="0 0 132 132">
            <circle cx="66" cy="66" r="59" stroke="var(--border-stitch)" stroke-width="1.2" stroke-dasharray="3 4" fill="none"/>
            <circle cx="66" cy="66" r="52" stroke="var(--paper-warm)" stroke-width="9" fill="none"/>
            <circle cx="66" cy="66" r="52" stroke="var(--terracotta)" stroke-width="9" stroke-linecap="round" fill="none"
              stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"/>
          </svg>
          <div class="mastery-ring-center">
            <div class="mastery-ring-pct">${st.overallPct}%</div>
            <div class="mastery-ring-sub">综合就绪度</div>
          </div>
        </div>

        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px">
            <span class="techo-stamp ink">MONTHLY TRACKER · TECHO NO.04</span>
            <span class="techo-stamp sage">实时同步本地进度</span>
          </div>
          <h2 style="font-family:var(--font-serif);font-size:25px;font-weight:800;margin-bottom:6px;color:var(--text)">${st.rank}</h2>
          <p style="font-size:13.6px;color:var(--text-sec)">${st.desc}</p>
          <div class="mastery-gauges-row">
            <div class="tracker-mini-gauge">
              <div class="tracker-mini-gauge-top"><span>高频词汇留存率</span><span>${st.vocab.known}/${st.vocab.total} (${st.vocab.pct}%)</span></div>
              <div class="techo-bar-track"><div class="techo-bar-fill" style="width:${Math.max(4, st.vocab.pct)}%"></div></div>
            </div>
            <div class="tracker-mini-gauge">
              <div class="tracker-mini-gauge-top"><span>12 天手账打卡</span><span>${st.sprintDoneCnt}/${st.sprintTotal} 天 (${st.sprintPct}%)</span></div>
              <div class="techo-bar-track"><div class="techo-bar-fill" style="width:${Math.max(4, st.sprintPct)}%"></div></div>
            </div>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
            <button type="button" class="btn-primary" id="btn-radar-weakest">一键攻克最弱项：${weakestMeta.label}</button>
            <button type="button" class="btn-honey" id="btn-radar-vocab">去背今日高频词</button>
          </div>
        </div>

        <div class="section-mascot-stamp" style="width:138px;height:138px;margin:0 auto">
          <img src="${getSpriteSrc(st.sprite)}" alt="小克冲刺雷达" style="width:122px;height:122px">
        </div>
      </div>

      <div class="linen-skills-grid">${cardsHTML}</div>`;

    document.getElementById('btn-radar-weakest')?.addEventListener('click', () => launchSkillPractice(weakest ? weakest.skill : 'listening'));
    document.getElementById('btn-radar-vocab')?.addEventListener('click', () => switchView('vocab'));
    host.querySelectorAll('[data-m-sec]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        switchView('knowledge');
        if (btn.dataset.mSec && SECTIONS_MAP[btn.dataset.mSec]) selectSection(btn.dataset.mSec, true);
      };
    });
    host.querySelectorAll('[data-m-skill]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        launchSkillPractice(btn.dataset.mSkill);
      };
    });
  }

  /* ========================================================================
     VIEW 5: TABBED PAPER CLIPPINGS BINDER (错题夹 / 生词卡 / 收藏签)
     ======================================================================== */
  function renderNotebookView() {
    const host = document.getElementById('notebook-host');
    if (!host) return;
    const kw = String(state.notebookQuery || '').trim().toLowerCase();

    const wrongQs = QUESTION_BANK.filter(q => state.answers[q.id]?.checked && !state.answers[q.id]?.correct);
    const rpWrongs = getRealPaperWrongList();
    const favQs = QUESTION_BANK.filter(q => state.favorites[q.id]);
    const weakWords = VOCAB_WORDS.filter(w => {
      const p = state.vocabProgress[w.id];
      return p && (p.status === 'fuzzy' || (p.wrongCnt || 0) > 0);
    });

    const matchQ = q => !kw || [q.title, q.source, q.questionText, q.statement, q.chineseText, q.directions, q.skill].some(s => String(s || '').toLowerCase().includes(kw));
    const matchRp = it => !kw || [it.paperTitle, it.skillLabel, it.stem, it.explain, it.answer, it.userVal].some(s => String(s || '').toLowerCase().includes(kw));
    const matchW = w => !kw || [w.word, w.meaning, w.roots, w.tag].some(s => String(s || '').toLowerCase().includes(kw));

    let bodyHTML = '';
    if (state.notebookTab === 'wrong') {
      const list = wrongQs.filter(matchQ);
      const rpList = rpWrongs.filter(matchRp);
      const totalWrongShown = list.length + rpList.length;
      bodyHTML = totalWrongShown
        ? `<div class="notebook-list">
            ${list.map(q => buildNotebookQuestionRow(q, true)).join('')}
            ${rpList.map(it => buildRealPaperWrongRow(it)).join('')}
          </div>`
        : `<div style="text-align:center;padding:34px 16px">
            <img src="${getSpriteSrc('04_cheer_correct')}" alt="小克" style="width:94px;height:94px;object-fit:contain;margin-bottom:8px">
            <div style="font-family:var(--font-serif);font-size:18px;font-weight:800;margin-bottom:5px">${(wrongQs.length + rpWrongs.length) ? '没有匹配该关键词的错题' : '当前保持零错题记录'}</div>
            <div style="font-size:13.2px;color:var(--text-sec)">分型精练答错或从历年完整真题同步的错题都会夹入这里，复盘答对后可随时清零。</div>
          </div>`;
    } else if (state.notebookTab === 'vocab') {
      const list = weakWords.filter(matchW);
      bodyHTML = list.length
        ? `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">
            <button type="button" class="btn-primary" id="btn-nb-recite-weak">${ICON.headphones}<span>启动这 ${list.length} 个生词的语音带背</span></button>
            <button type="button" class="btn-sage" id="btn-nb-flash-weak">${ICON.book}<span>启动横线索引词卡重背</span></button>
          </div>
          <div class="nb-word-grid">
            ${list.map(w => {
              const p = state.vocabProgress[w.id] || {};
              return `
                <div class="nb-word-card">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
                    <div>
                      <strong style="font-family:var(--font-serif);font-size:19px;color:var(--terracotta)">${escapeHTML(w.word)}</strong>
                      <span style="font-family:var(--font-serif);font-style:italic;font-size:12.5px;color:var(--text-muted);margin-left:6px">${escapeHTML(w.phonetic || '')}</span>
                    </div>
                    <span class="techo-stamp ${p.status === 'fuzzy' ? 'honey' : 'rose'}">${p.status === 'fuzzy' ? '模糊' : `错记 ${p.wrongCnt || 1} 次`}</span>
                  </div>
                  <div style="font-size:14px;font-weight:700;color:var(--text)">${escapeHTML(w.pos || '')} ${escapeHTML(w.meaning)}</div>
                  <div style="font-size:12.4px;color:var(--text-sec)">${escapeHTML(w.roots || '')}${w.mnemonic ? ` · ${escapeHTML(w.mnemonic)}` : ''}</div>
                  <div style="display:flex;gap:7px;margin-top:6px">
                    <button type="button" class="secondary-btn" data-nb-speak="${escapeHTML(w.word)}" style="padding:4.5px 10px;font-size:12px">朗读</button>
                    <button type="button" class="btn-sage" data-nb-master="${w.id}" style="padding:4.5px 10px;font-size:12px">标为已掌握</button>
                  </div>
                </div>`;
            }).join('')}
          </div>`
        : `<div style="text-align:center;padding:34px 16px">
            <img src="${getSpriteSrc('02_study_reading')}" alt="小克" style="width:94px;height:94px;object-fit:contain;margin-bottom:8px">
            <div style="font-family:var(--font-serif);font-size:18px;font-weight:800;margin-bottom:5px">${weakWords.length ? '未搜索到匹配生词' : '生词卡夹干干净净'}</div>
            <div style="font-size:13.2px;color:var(--text-sec)">在高频带背或听音选义中标记为“模糊”或“不认识”的词会自动汇总在这里。</div>
          </div>`;
    } else {
      const list = favQs.filter(matchQ);
      bodyHTML = list.length
        ? `<div class="notebook-list">${list.map(q => buildNotebookQuestionRow(q, false)).join('')}</div>`
        : `<div style="text-align:center;padding:34px 16px">
            <img src="${getSpriteSrc('10_eureka_tip')}" alt="小克" style="width:94px;height:94px;object-fit:contain;margin-bottom:8px">
            <div style="font-family:var(--font-serif);font-size:18px;font-weight:800;margin-bottom:5px">收藏签夹暂时为空</div>
            <div style="font-size:13.2px;color:var(--text-sec)">刷题时点击右上角“收藏”按钮即可贴入典型好题与高分作文范本。</div>
          </div>`;
    }

    host.innerHTML = `
      <div class="clippings-binder-wrap">
        <div class="clippings-tabs" role="tablist">
          <button type="button" class="folder-tab ${state.notebookTab === 'wrong' ? 'active' : ''}" data-nbtab="wrong">
            <span>错题夹</span><span class="folder-tab-cnt">${wrongQs.length + rpWrongs.length}</span>
          </button>
          <button type="button" class="folder-tab ${state.notebookTab === 'vocab' ? 'active' : ''}" data-nbtab="vocab">
            <span>生词卡</span><span class="folder-tab-cnt">${weakWords.length}</span>
          </button>
          <button type="button" class="folder-tab ${state.notebookTab === 'favorites' ? 'active' : ''}" data-nbtab="favorites">
            <span>收藏签</span><span class="folder-tab-cnt">${favQs.length}</span>
          </button>
        </div>

        <div class="clippings-sheet">
          <div class="clippings-search-bar">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span class="techo-stamp ink">CLIPPINGS BINDER</span>
              <span style="font-size:12.6px;color:var(--text-sec)">按题干、真题来源、英文拼写或中文释义实时检索</span>
            </div>
            <input type="search" class="search-input" id="nb-search-input" placeholder="输入关键词实时检索..." value="${escapeHTML(state.notebookQuery)}">
          </div>
          ${bodyHTML}
        </div>
      </div>`;

    host.querySelectorAll('[data-nbtab]').forEach(btn => {
      btn.onclick = () => {
        const nextTab = btn.dataset.nbtab;
        if (nextTab === state.notebookTab) return;
        const pIdx = NOTEBOOK_TAB_ORDER.indexOf(state.notebookTab);
        const nIdx = NOTEBOOK_TAB_ORDER.indexOf(nextTab);
        const dir = (nIdx >= 0 && pIdx >= 0 && nIdx < pIdx) ? 'prev' : 'next';
        runSnapshotTurn(() => host.querySelector('.clippings-sheet'), () => {
          state.notebookTab = nextTab;
          renderNotebookView();
        }, dir, 'grid', 500);
      };
    });
    const searchEl = document.getElementById('nb-search-input');
    if (searchEl) {
      searchEl.oninput = () => {
        state.notebookQuery = searchEl.value;
        const caret = searchEl.selectionStart;
        renderNotebookView();
        const nextInp = document.getElementById('nb-search-input');
        if (nextInp) { nextInp.focus(); try { nextInp.setSelectionRange(caret, caret); } catch (_e) {} }
      };
    }

    host.querySelectorAll('[data-nb-retry]').forEach(btn => {
      btn.onclick = () => {
        const qid = btn.dataset.nbRetry;
        const q = QUESTION_BANK.find(x => x.id === qid);
        if (q) launchSkillPractice(toQuestionSkill(q.skill || q.type), q.id);
      };
    });
    host.querySelectorAll('[data-nb-rp-go]').forEach(btn => {
      btn.onclick = () => launchRealPaperPractice();
    });
    host.querySelectorAll('[data-nb-rp-del]').forEach(btn => {
      btn.onclick = () => {
        const key = btn.dataset.nbRpDel;
        saveRealPaperWrongList(getRealPaperWrongList().filter(it => (it.key || `${it.paperId}_${it.num}`) !== key));
        updateGlobalStats();
        renderNotebookView();
      };
    });
    host.querySelectorAll('[data-nb-unfav]').forEach(btn => {
      btn.onclick = () => {
        delete state.favorites[btn.dataset.nbUnfav];
        saveState();
        updateGlobalStats();
        renderNotebookView();
      };
    });
    host.querySelectorAll('[data-nb-exp]').forEach(btn => {
      btn.onclick = () => {
        const box = document.getElementById(`nb-exp-${btn.dataset.nbExp}`);
        if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
      };
    });
    host.querySelectorAll('[data-nb-speak]').forEach(btn => {
      btn.onclick = () => { if (window.Cet4Speech) window.Cet4Speech.speakWord(btn.dataset.nbSpeak, { rate: 0.95 }); };
    });
    host.querySelectorAll('[data-nb-master]').forEach(btn => {
      btn.onclick = (e) => {
        const wid = btn.dataset.nbMaster;
        state.vocabProgress[wid] = { status: 'known', reps: 2, nextDay: Math.min(14, state.vocabDay + 4), wrongCnt: 0 };
        saveState();
        updateGlobalStats();
        FireworksFX.launch(1, getEventOrigin(e, btn));
        renderNotebookView();
      };
    });
    document.getElementById('btn-nb-recite-weak')?.addEventListener('click', () => {
      state.vocabCustomIds = weakWords.map(w => w.id);
      state.vocabMode = 'recite';
      state.reciteIdx = 0;
      switchView('vocab');
    });
    document.getElementById('btn-nb-flash-weak')?.addEventListener('click', () => {
      state.vocabCustomIds = weakWords.map(w => w.id);
      state.vocabMode = 'flashcard';
      state.flashQueue = [];
      switchView('vocab');
    });
  }

  function buildRealPaperWrongRow(it) {
    const key = it.key || `${it.paperId || 'rp'}_${it.num || 0}`;
    const label = it.skillLabel || it.skill || '历年真题';
    return `
      <div class="nb-item-card">
        <div style="flex:1;min-width:260px">
          <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:6px">
            <span class="techo-stamp terracotta">完整真题全卷</span>
            <span class="techo-stamp">${escapeHTML(it.paperTitle || it.paperId || '历年真题')} · 第 ${escapeHTML(it.num || '')} 题</span>
            <span class="techo-stamp rose">${escapeHTML(label)}</span>
          </div>
          <div style="font-family:var(--font-serif);font-size:14.6px;font-weight:700;color:var(--text);margin-bottom:4px">${escapeHTML(String(it.stem || it.summary || '真题错题复盘').slice(0, 180))}</div>
          <div style="font-size:12.6px;color:var(--text-sec)">你的作答：${escapeHTML(it.userVal || '未答')} · 参考答案：<strong style="color:var(--sage)">${escapeHTML(it.answer || '')}</strong></div>
          ${it.explain ? `<div style="margin-top:7px;padding:8px 12px;border:1px solid rgba(206,178,114,0.52);border-left:3px solid var(--honey);border-radius:var(--radius-xs);background:var(--paper-sticky);font-size:12.4px">${escapeHTML(it.explain)}</div>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;gap:7px;flex-shrink:0">
          <button type="button" class="submit-btn" data-nb-rp-go="${escapeHTML(key)}" style="padding:7px 14px;font-size:12.4px">前往全卷复盘</button>
          <button type="button" class="secondary-btn" data-nb-rp-del="${escapeHTML(key)}" style="padding:6px 12px;font-size:12px">已掌握移除</button>
        </div>
      </div>`;
  }

  function buildNotebookQuestionRow(q, isWrongList) {
    const meta = getSkillMeta(q.skill || q.type);
    const detail = EXPLAIN_DETAILS[q.id];
    const snippet = q.questionText || q.statement || q.chineseText || q.directions || q.title || '';
    return `
      <div class="nb-item-card">
        <div style="flex:1;min-width:260px">
          <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:6px">
            <span class="techo-stamp ${meta.badge}">${meta.label}</span>
            ${q.source ? `<span class="techo-stamp">${escapeHTML(q.source)}</span>` : ''}
            ${isWrongList ? '<span class="techo-stamp rose">重练答对即自动移出</span>' : ''}
          </div>
          <div style="font-family:var(--font-serif);font-size:15.5px;font-weight:800;color:var(--text);margin-bottom:4px">${escapeHTML(q.title || '')}</div>
          <div style="font-size:13.2px;color:var(--text-sec);line-height:1.64">${escapeHTML(String(snippet).slice(0, 180))}${String(snippet).length > 180 ? '...' : ''}</div>
          <div id="nb-exp-${q.id}" style="display:none;margin-top:10px;padding:11px 14px;border:1px solid rgba(206,178,114,0.52);border-left:3.5px solid var(--honey);border-radius:var(--radius-xs);background:var(--paper-sticky);font-size:12.8px">
            ${detail ? `<div><strong>核心破题点：</strong>${escapeHTML(detail.why)}</div><div style="margin-top:5px"><strong>考场避坑：</strong>${escapeHTML(detail.pitfall || '')}</div>` : '点击立即重练即可在右侧查看完整 3D 分步解析。'}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:7px;flex-shrink:0">
          <button type="button" class="submit-btn" data-nb-retry="${q.id}" style="padding:7px 14px;font-size:12.4px">立即重练</button>
          <button type="button" class="secondary-btn" data-nb-exp="${q.id}" style="padding:6px 12px;font-size:12px">查看解析</button>
          ${!isWrongList ? `<button type="button" class="secondary-btn" data-nb-unfav="${q.id}" style="padding:6px 12px;font-size:12px">取消收藏</button>` : ''}
        </div>
      </div>`;
  }

  /* ========================================================================
     BOOTSTRAP & GLOBAL SHORTCUTS
     ======================================================================== */
  function init() {
    applyTheme(state.theme);

    const setImg = (id, spriteId) => {
      const el = document.getElementById(id);
      if (el) el.src = getSpriteSrc(spriteId);
    };
    setImg('brand-xiaoke-img', '01_idle_smile');
    setImg('hero-mascot-img', '01_idle_smile');

    renderSprintRoadmap();
    renderXiaoKeRibbon();
    renderZineDirectory();
    renderKnowledgeReader();
    updateGlobalStats();

    if (window.XiaoKeAssistant && typeof window.XiaoKeAssistant.init === 'function') {
      window.XiaoKeAssistant.init({
        hostId: 'xiaoke-dock',
        isMobile: false,
        getContext: buildCompanionContext,
        isDark: () => state.theme === 'dark'
      });
    }

    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.onclick = () => switchView(btn.dataset.view);
    });
    document.getElementById('brand-home')?.addEventListener('click', () => switchView('knowledge'));
    document.getElementById('top-sprint-badge')?.addEventListener('click', () => {
      switchView('knowledge');
      document.getElementById('sprint-roadmap-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    document.getElementById('rail-vocab-meter')?.addEventListener('click', () => switchView('vocab'));

    document.getElementById('cta-start-vocab')?.addEventListener('click', () => switchView('vocab'));
    document.getElementById('cta-start-realpaper')?.addEventListener('click', () => launchRealPaperPractice());
    document.getElementById('cta-start-listen')?.addEventListener('click', () => {
      switchView('knowledge');
      if (SECTIONS_MAP.t_listen_preread) selectSection('t_listen_preread', true);
    });
    document.getElementById('cta-start-practice')?.addEventListener('click', () => launchSkillPractice('all'));

    document.getElementById('btn-toggle-directory')?.addEventListener('click', () => {
      state.directoryExpanded = !state.directoryExpanded;
      renderZineDirectory();
    });

    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      reactXiaoKe(
        next === 'dark' ? '08_sleepy_rest' : '01_idle_smile',
        next === 'dark' ? '台灯已经点亮啦！切到「台灯夜读」暖色纸页，夜深复习也要护好眼睛哦～' : '回到「午后书桌」日光棉纸手账，泡杯茶元气满满继续冲刺！',
        4400
      );
    });

    const cycleHeroMantra = () => {
      const list = getMantraList();
      mantraIdx = (mantraIdx + 1) % list.length;
      const m = list[mantraIdx];
      const hi = document.getElementById('hero-mascot-img');
      if (hi) {
        hi.src = getSpriteSrc(m.spriteId);
        hi.classList.remove('mascot-pop-anim');
        void hi.offsetWidth;
        hi.classList.add('mascot-pop-anim');
      }
      const hs = document.getElementById('hero-speech');
      if (hs) hs.textContent = `[${m.label}] ${m.mantra}${m.tip ? ' —— ' + m.tip : ''}`;
      document.querySelectorAll('.xiaoke-pick-btn').forEach((b, i) => b.classList.toggle('active', i === mantraIdx));
      reactXiaoKe(m.spriteId, m.mantra, 4500);
    };
    document.getElementById('hero-mascot-img')?.addEventListener('click', cycleHeroMantra);
    document.getElementById('hero-speech')?.addEventListener('click', cycleHeroMantra);

    const lb = document.getElementById('anim-lightbox');
    if (lb) lb.addEventListener('click', e => { if (e.target === lb) closeAnimLightbox(); });
    document.getElementById('lightbox-close')?.addEventListener('click', closeAnimLightbox);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeAnimLightbox(); return; }
      if (state.activeView !== 'vocab' || state.vocabMode !== 'flashcard') return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        toggleVocabFlashcard();
      } else if (e.key === '1') {
        document.querySelector('[data-fc-rate="unknown"]')?.click();
      } else if (e.key === '2') {
        document.querySelector('[data-fc-rate="fuzzy"]')?.click();
      } else if (e.key === '3') {
        document.querySelector('[data-fc-rate="known"]')?.click();
      } else if (e.key.toLowerCase() === 'r') {
        document.getElementById('btn-fc-speak')?.click();
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
