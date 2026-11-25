/* ==========================================================================
   CET-4 Authentic Real Past-Paper Smart Practice Studio (window.RealPaperStudio)
   Aesthetic: Cozy Study Desk / Hobonichi & Midori Notebook
              (Light "午后书桌 · 牛皮纸档案夹" & Dark "台灯夜读 · 暖纸卷轴")
   - Supports ALL 6 authentic 2023.06-2026.06 CET-4 full past papers (342 real items)
   - Dual Practice Mode: `instant` (即时精刷) vs `full` (整套连刷 + 710分制智能阅卷)
   - Full Engine Reuse: window.Cet4Speech + window.Cet4Grader
   - Official CET-4 710-scale weighted diagnostic report & weakest-skill deep jump
   - Shared localStorage store (`cet4_xiaoke_sprint_v1` -> `store.realPaperProgress`)
   Clean UTF-8 typography & responsive PC + Mobile 390px Hobonichi layout.
   ========================================================================== */
(function (global) {
  'use strict';

  const DEFAULT_STORAGE_KEY = 'cet4_xiaoke_sprint_v1';
  const STYLE_ID = 'rps-zine-styles';

  const SKILL_SECTION_MAP = {
    listening: { sectionId: 't_listen_preread', label: '听力理解', short: '听力', maxPts: 248.5 },
    cloze: { sectionId: 't_cloze_pos', label: '选词填空', short: '选词', maxPts: 35.5 },
    matching: { sectionId: 't_long_scan', label: '长篇匹配', short: '匹配', maxPts: 71.0 },
    careful: { sectionId: 't_read_traps', label: '仔细阅读', short: '精读', maxPts: 142.0 },
    translation: { sectionId: 't_trans_struct', label: '段落汉译英', short: '翻译', maxPts: 106.5 },
    writing: { sectionId: 't_write_struct', label: '短文写作', short: '写作', maxPts: 106.5 }
  };

  /* -------------------- Crisp Inline SVG Icons (Zero Emojis) -------------------- */
  const SVG = {
    archive: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/><line x1="10" y1="13" x2="14" y2="13"/></svg>',
    back: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>',
    pause: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    replay: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    headphones: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    volume: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
    clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    cross: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chart: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    pen: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    book: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    grid: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    bookmark: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
    upload: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    arrowRight: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
  };

  /* -------------------- Scoped Hobonichi Kraft-Paper Folder Stylesheet -------------------- */
  const STUDIO_CSS = `
    .rps-root {
      --rps-page: #f4ecdc;
      --rps-paper: #fcf9f1;
      --rps-surface: #fffefb;
      --rps-subtle: #f4ecdc;
      --rps-sticky: #fdf6d8;
      --rps-deep: #ece1cc;
      --rps-border: #d9cbb6;
      --rps-stitch: #c8b69d;
      --rps-ink: #30261e;
      --rps-muted: #665647;
      --rps-faint: #968574;
      --rps-shadow-sm: 0 2px 6px rgba(72, 52, 32, 0.06), 0 1px 2px rgba(72, 52, 32, 0.04);
      --rps-shadow: 0 3px 12px rgba(72, 52, 32, 0.08), 0 1px 3px rgba(72, 52, 32, 0.05);
      --rps-shadow-hover: 0 6px 18px rgba(72, 52, 32, 0.11), 0 2px 5px rgba(72, 52, 32, 0.05);
      --rps-orange: #cf5c28;
      --rps-orange-hover: #b84d1e;
      --rps-orange-soft: rgba(207, 92, 40, 0.11);
      --rps-marigold: #d6982e;
      --rps-marigold-soft: rgba(244, 194, 96, 0.34);
      --rps-mint: #3f7a5c;
      --rps-mint-soft: rgba(63, 122, 92, 0.12);
      --rps-coral: #c24d4d;
      --rps-coral-soft: rgba(194, 77, 77, 0.11);
      --rps-slate: #4f6b7d;
      --rps-serif: Georgia, Cambria, "Times New Roman", "Source Han Serif SC", "Noto Serif SC", serif;
      --rps-sans: "PingFang SC", "Microsoft YaHei UI", "HarmonyOS Sans SC", "Segoe UI", system-ui, -apple-system, sans-serif;
      --rps-num: "Cascadia Code", "Consolas", "Segoe UI", "PingFang SC", sans-serif;
      font-family: var(--rps-sans);
      color: var(--rps-ink);
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
    }
    [data-theme="dark"] .rps-root,
    body.dark .rps-root {
      --rps-page: #181410;
      --rps-paper: #221d18;
      --rps-surface: #2a241e;
      --rps-subtle: #302922;
      --rps-sticky: #352d20;
      --rps-deep: #3a3128;
      --rps-border: #40362c;
      --rps-stitch: #54473a;
      --rps-ink: #f2eadf;
      --rps-muted: #c7b8a5;
      --rps-faint: #8f7f6e;
      --rps-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.24);
      --rps-shadow: 0 6px 20px rgba(0, 0, 0, 0.32);
      --rps-shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.42);
      --rps-orange: #eb7b44;
      --rps-orange-hover: #f28e5c;
      --rps-orange-soft: rgba(235, 123, 68, 0.18);
      --rps-marigold: #e8b34e;
      --rps-marigold-soft: rgba(232, 179, 78, 0.24);
      --rps-mint: #68b891;
      --rps-mint-soft: rgba(104, 184, 145, 0.18);
      --rps-coral: #e06b6b;
      --rps-coral-soft: rgba(224, 107, 107, 0.18);
      --rps-slate: #82a3b8;
    }
    .rps-root *, .rps-root *::before, .rps-root *::after {
      box-sizing: border-box;
    }
    .rps-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 14px;
      font-family: var(--rps-sans);
      font-size: 13px;
      font-weight: 700;
      line-height: 1.2;
      white-space: nowrap;
      flex-shrink: 0;
      color: var(--rps-ink);
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-radius: 8px;
      box-shadow: var(--rps-shadow-sm);
      cursor: pointer;
      transition: transform 0.14s ease, box-shadow 0.14s ease, background-color 0.14s ease, border-color 0.14s ease, color 0.14s ease;
    }
    .rps-btn:hover {
      transform: translateY(-1.5px);
      box-shadow: var(--rps-shadow-hover);
      border-color: var(--rps-stitch);
      background: var(--rps-sticky);
    }
    .rps-btn:active {
      transform: translateY(0);
      box-shadow: var(--rps-shadow-sm);
    }
    .rps-btn-orange {
      background: var(--rps-orange);
      border-color: var(--rps-orange);
      color: #fffefb;
    }
    .rps-btn-orange:hover {
      background: var(--rps-orange-hover);
      border-color: var(--rps-orange-hover);
      color: #fffefb;
    }
    [data-theme="dark"] .rps-root .rps-btn-orange,
    body.dark .rps-root .rps-btn-orange,
    [data-theme="dark"] .rps-root .rps-btn-orange:hover,
    body.dark .rps-root .rps-btn-orange:hover {
      color: #1d1712;
    }
    .rps-btn-marigold {
      background: var(--rps-sticky);
      border-color: rgba(214, 152, 46, 0.55);
      color: #7a4b0c;
    }
    .rps-btn-marigold:hover {
      background: #faeec0;
      border-color: var(--rps-marigold);
      color: #5c3706;
    }
    [data-theme="dark"] .rps-root .rps-btn-marigold,
    body.dark .rps-root .rps-btn-marigold {
      background: var(--rps-sticky);
      border-color: rgba(232, 179, 78, 0.48);
      color: #e8b34e;
    }
    [data-theme="dark"] .rps-root .rps-btn-marigold:hover,
    body.dark .rps-root .rps-btn-marigold:hover {
      background: #423726;
      border-color: #e8b34e;
      color: #f3ca70;
    }
    .rps-btn-mint {
      background: var(--rps-mint);
      border-color: var(--rps-mint);
      color: #fffefb;
    }
    .rps-btn-mint:hover {
      background: #35684e;
      border-color: #35684e;
      color: #fffefb;
    }
    [data-theme="dark"] .rps-root .rps-btn-mint,
    body.dark .rps-root .rps-btn-mint,
    [data-theme="dark"] .rps-root .rps-btn-mint:hover,
    body.dark .rps-root .rps-btn-mint:hover {
      background: var(--rps-mint);
      border-color: var(--rps-mint);
      color: #141c17;
    }
    .rps-btn-coral {
      background: var(--rps-coral);
      border-color: var(--rps-coral);
      color: #fffefb;
    }
    .rps-btn-coral:hover {
      background: #ab4040;
      border-color: #ab4040;
      color: #fffefb;
    }
    .rps-btn-ghost {
      background: var(--rps-paper);
      border-color: var(--rps-border);
      color: var(--rps-ink);
    }
    .rps-btn-sm {
      padding: 5px 10px;
      font-size: 12px;
      border-radius: 7px;
    }
    .rps-btn.is-active {
      background: var(--rps-orange-soft);
      border-color: var(--rps-orange);
      color: var(--rps-orange);
    }
    .rps-btn:disabled {
      opacity: 0.48;
      cursor: not-allowed;
      transform: none;
    }

    /* Kraft-Paper Archive Folder Masthead & KPI Strip */
    .rps-masthead {
      background: var(--rps-paper);
      border: 1px solid var(--rps-border);
      border-top: 3px solid var(--rps-orange);
      border-radius: 12px;
      box-shadow: var(--rps-shadow);
      padding: 18px 20px;
      margin-bottom: 18px;
    }
    .rps-mast-top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
    }
    .rps-kicker {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 10px;
      font-family: var(--rps-num);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: var(--rps-orange-soft);
      color: var(--rps-orange);
      border: 1px solid rgba(207, 92, 40, 0.28);
      border-radius: 6px;
      margin-bottom: 7px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .rps-title {
      margin: 0;
      font-size: 21px;
      font-weight: 800;
      line-height: 1.28;
      letter-spacing: -0.01em;
    }
    .rps-sub {
      margin: 5px 0 0;
      font-size: 13px;
      color: var(--rps-muted);
      line-height: 1.58;
    }
    .rps-kpi-row {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      margin-top: 14px;
    }
    .rps-kpi {
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-radius: 9px;
      padding: 11px 13px;
      box-shadow: var(--rps-shadow-sm);
    }
    .rps-kpi-val {
      font-family: var(--rps-num);
      font-size: 18.5px;
      font-weight: 800;
      line-height: 1.18;
      color: var(--rps-ink);
      white-space: nowrap;
    }
    .rps-kpi-lbl {
      font-size: 11px;
      font-weight: 600;
      color: var(--rps-muted);
      margin-top: 3px;
    }

    /* Filter Bar */
    .rps-filter-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    /* Lobby Dossier Folder Cards */
    .rps-lobby-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    .rps-dossier {
      display: flex;
      flex-direction: column;
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(72, 52, 32, 0.07), 0 1px 2px rgba(72, 52, 32, 0.04);
      padding: 0 16px 16px;
      position: relative;
      overflow: hidden;
      transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;
    }
    [data-theme="dark"] .rps-root .rps-dossier,
    body.dark .rps-root .rps-dossier {
      box-shadow: var(--rps-shadow);
    }
    .rps-dossier:hover {
      transform: translateY(-2px);
      box-shadow: var(--rps-shadow-hover);
      border-color: var(--rps-stitch);
    }
    .rps-dossier-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin: 0 -16px 12px;
      padding: 10px 16px;
      background: var(--rps-subtle);
      border-bottom: 1px dashed var(--rps-stitch);
    }
    .rps-stamp {
      display: inline-flex;
      align-items: center;
      padding: 3px 9px;
      font-family: var(--rps-num);
      font-size: 11.5px;
      font-weight: 700;
      background: var(--rps-orange-soft);
      color: var(--rps-orange);
      border: 1px solid rgba(207, 92, 40, 0.34);
      border-radius: 6px;
      letter-spacing: 0.04em;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .rps-sticker {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 9px;
      font-size: 11px;
      font-weight: 700;
      border: 1px solid rgba(214, 152, 46, 0.42);
      border-radius: 6px;
      background: var(--rps-sticky);
      color: #845210;
      white-space: nowrap;
      flex-shrink: 0;
    }
    [data-theme="dark"] .rps-root .rps-sticker,
    body.dark .rps-root .rps-sticker {
      color: #e8b34e;
      border-color: rgba(232, 179, 78, 0.38);
    }
    .rps-sticker-mint {
      background: var(--rps-mint-soft);
      border-color: rgba(63, 122, 92, 0.34);
      color: var(--rps-mint);
    }
    [data-theme="dark"] .rps-root .rps-sticker-mint,
    body.dark .rps-root .rps-sticker-mint {
      color: var(--rps-mint);
      border-color: rgba(104, 184, 145, 0.38);
    }
    .rps-sticker-orange {
      background: var(--rps-orange-soft);
      border-color: rgba(207, 92, 40, 0.34);
      color: var(--rps-orange);
    }
    [data-theme="dark"] .rps-root .rps-sticker-orange,
    body.dark .rps-root .rps-sticker-orange {
      color: var(--rps-orange);
      border-color: rgba(235, 123, 68, 0.38);
    }
    .rps-dossier-title {
      margin: 0 0 5px;
      font-size: 16.5px;
      font-weight: 800;
      line-height: 1.35;
    }
    .rps-dossier-sub {
      margin: 0 0 10px;
      font-size: 12.5px;
      color: var(--rps-muted);
      line-height: 1.5;
    }
    .rps-topic-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .rps-topic-tag {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      background: var(--rps-paper);
      color: var(--rps-muted);
      border: 1px solid var(--rps-border);
      border-radius: 6px;
    }
    .rps-prog-wrap {
      margin-top: auto;
      padding-top: 10px;
      border-top: 1px dashed var(--rps-stitch);
    }
    .rps-prog-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 700;
      color: var(--rps-muted);
      margin-bottom: 7px;
      gap: 8px;
    }
    .rps-prog-bar {
      height: 8px;
      background: var(--rps-subtle);
      border: 1px solid var(--rps-border);
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 12px;
    }
    .rps-prog-fill {
      height: 100%;
      background: var(--rps-orange);
      border-radius: 999px;
      transition: width 0.25s ease;
    }
    .rps-dossier-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* Paper Studio Header & Mode Switch */
    .rps-studio-bar {
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-radius: 11px;
      box-shadow: var(--rps-shadow);
      padding: 12px 15px;
      margin-bottom: 12px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .rps-studio-left {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .rps-studio-title {
      font-size: 15px;
      font-weight: 800;
      line-height: 1.3;
    }
    .rps-studio-right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }
    .rps-mode-seg {
      display: inline-flex;
      border: 1px solid var(--rps-border);
      border-radius: 8px;
      overflow: hidden;
      background: var(--rps-subtle);
    }
    .rps-mode-opt {
      padding: 6px 11px;
      font-size: 12px;
      font-weight: 700;
      border: none;
      background: transparent;
      color: var(--rps-muted);
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: background-color 0.14s ease, color 0.14s ease;
    }
    .rps-mode-opt + .rps-mode-opt {
      border-left: 1px solid var(--rps-border);
    }
    .rps-mode-opt.is-active {
      background: var(--rps-orange);
      color: #fffefb;
    }
    [data-theme="dark"] .rps-root .rps-mode-opt.is-active,
    body.dark .rps-root .rps-mode-opt.is-active {
      color: #1d1712;
    }

    /* Soft Tactile Stationery Part Tabs */
    .rps-part-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-bottom: 12px;
    }
    .rps-part-tab {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      font-size: 12.5px;
      font-weight: 700;
      white-space: nowrap;
      flex-shrink: 0;
      background: var(--rps-surface);
      color: var(--rps-ink);
      border: 1px solid var(--rps-border);
      border-radius: 8px;
      box-shadow: var(--rps-shadow-sm);
      cursor: pointer;
      transition: transform 0.14s ease, box-shadow 0.14s ease, border-color 0.14s ease, background-color 0.14s ease;
    }
    .rps-part-tab:hover {
      transform: translateY(-1px);
      border-color: var(--rps-stitch);
      background: var(--rps-sticky);
    }
    .rps-part-tab.is-active {
      background: var(--rps-orange);
      border-color: var(--rps-orange);
      color: #fffefb;
      box-shadow: 0 3px 10px rgba(207, 92, 40, 0.22);
    }
    [data-theme="dark"] .rps-root .rps-part-tab.is-active,
    body.dark .rps-root .rps-part-tab.is-active {
      color: #1d1712;
    }
    .rps-part-cnt {
      font-family: var(--rps-num);
      font-size: 11px;
      padding: 1px 6px;
      background: var(--rps-paper);
      color: var(--rps-muted);
      border: 1px solid var(--rps-border);
      border-radius: 5px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .rps-part-tab.is-active .rps-part-cnt {
      background: rgba(255, 254, 251, 0.9);
      color: #30261e;
      border-color: transparent;
    }

    /* 57Q Answer Sheet Grid (Cream / Honey / Sage / Dusty Rose) */
    .rps-sheet-box {
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-radius: 10px;
      box-shadow: var(--rps-shadow-sm);
      padding: 11px 14px;
      margin-bottom: 14px;
    }
    .rps-sheet-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      color: var(--rps-muted);
      margin-bottom: 9px;
    }
    .rps-sheet-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .rps-qdot {
      min-width: 31px;
      height: 27px;
      padding: 0 6px;
      font-family: var(--rps-num);
      font-size: 11px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--rps-paper);
      color: var(--rps-ink);
      border: 1px solid var(--rps-border);
      border-radius: 6px;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: transform 0.1s ease, border-color 0.12s ease;
    }
    .rps-qdot:hover {
      transform: translateY(-1px);
      border-color: var(--rps-orange);
    }
    .rps-qdot.is-answered {
      background: var(--rps-sticky);
      border-color: var(--rps-marigold);
      color: #82500e;
    }
    [data-theme="dark"] .rps-root .rps-qdot.is-answered,
    body.dark .rps-root .rps-qdot.is-answered {
      color: #e8b34e;
    }
    .rps-qdot.is-correct {
      background: var(--rps-mint-soft);
      border-color: var(--rps-mint);
      color: var(--rps-mint);
    }
    .rps-qdot.is-wrong {
      background: var(--rps-coral-soft);
      border-color: var(--rps-coral);
      color: var(--rps-coral);
    }

    /* Clean Cream Hobonichi Exam Sheet Cards (Left Binder Margin Accent) */
    .rps-card {
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-left: 3.5px solid var(--rps-stitch);
      border-radius: 11px;
      box-shadow: var(--rps-shadow);
      padding: 17px 19px;
      margin-bottom: 16px;
    }
    .rps-card-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding-bottom: 10px;
      margin-bottom: 13px;
      border-bottom: 1px dashed var(--rps-stitch);
    }
    .rps-card-title {
      margin: 0;
      font-size: 16px;
      font-weight: 800;
      line-height: 1.35;
      display: inline-flex;
      align-items: center;
      gap: 7px;
    }
    .rps-en-prose {
      font-family: var(--rps-serif);
      font-size: 15.5px;
      line-height: 1.8;
      color: var(--rps-ink);
    }
    .rps-en-prose p {
      margin: 0 0 11px;
    }
    .rps-en-prose p:last-child {
      margin-bottom: 0;
    }
    .rps-notice {
      background: var(--rps-sticky);
      border: 1px solid rgba(214, 152, 46, 0.42);
      border-left: 3px solid var(--rps-marigold);
      border-radius: 9px;
      padding: 11px 13px;
      font-size: 12.5px;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    .rps-audio-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--rps-subtle);
      border: 1px solid var(--rps-border);
      border-radius: 9px;
      margin-bottom: 12px;
    }
    .rps-audio-status {
      font-family: var(--rps-num);
      font-size: 12px;
      font-weight: 700;
      color: var(--rps-muted);
      margin-left: auto;
    }
    .rps-script-box {
      background: var(--rps-paper);
      border: 1px solid var(--rps-border);
      border-radius: 9px;
      padding: 12px;
      margin-bottom: 12px;
      max-height: 360px;
      overflow-y: auto;
    }
    .rps-turn {
      padding: 7px 10px;
      border: 1px solid transparent;
      border-radius: 7px;
      margin-bottom: 6px;
      font-family: var(--rps-serif);
      font-size: 14px;
      line-height: 1.64;
      cursor: pointer;
      transition: background-color 0.12s ease, border-color 0.12s ease;
    }
    .rps-turn:hover {
      border-color: var(--rps-border);
      background: var(--rps-surface);
    }
    .rps-turn.is-speaking {
      background: var(--rps-sticky);
      border-color: var(--rps-marigold);
    }
    .rps-turn.is-evidence {
      background: var(--rps-mint-soft);
      border-color: rgba(63, 122, 92, 0.42);
    }
    .rps-spk-tag {
      display: inline-block;
      font-family: var(--rps-num);
      font-size: 11px;
      font-weight: 700;
      padding: 1px 7px;
      margin-right: 6px;
      background: var(--rps-subtle);
      color: var(--rps-muted);
      border: 1px solid var(--rps-border);
      border-radius: 5px;
    }
    .rps-ev-tag {
      display: inline-block;
      font-family: var(--rps-sans);
      font-size: 11px;
      font-weight: 700;
      padding: 1px 7px;
      margin-left: 6px;
      background: var(--rps-mint-soft);
      color: var(--rps-mint);
      border: 1px solid rgba(63, 122, 92, 0.4);
      border-radius: 5px;
    }
    .rps-sig-mark {
      background: var(--rps-marigold-soft);
      color: inherit;
      padding: 1px 4px;
      font-weight: 700;
      border-radius: 4px;
    }
    .rps-ev-mark {
      background: var(--rps-mint-soft);
      border-bottom: 2px solid var(--rps-mint);
      padding: 0 3px;
      font-weight: 700;
      border-radius: 3px;
    }

    /* Question Items & Options */
    .rps-q-item {
      border: 1px solid var(--rps-border);
      border-radius: 9px;
      padding: 13px 15px;
      margin-bottom: 12px;
      background: var(--rps-paper);
    }
    .rps-q-item.is-wrong-card {
      border-color: rgba(194, 77, 77, 0.55);
      box-shadow: 0 2px 10px rgba(194, 77, 77, 0.08);
    }
    .rps-q-stem {
      font-size: 14.5px;
      font-weight: 700;
      line-height: 1.55;
      margin-bottom: 10px;
      font-family: var(--rps-serif);
    }
    .rps-q-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 28px;
      padding: 1px 7px;
      margin-right: 7px;
      font-family: var(--rps-num);
      font-size: 11.5px;
      font-weight: 700;
      background: var(--rps-orange-soft);
      color: var(--rps-orange);
      border: 1px solid rgba(207, 92, 40, 0.28);
      border-radius: 5px;
    }
    .rps-opt-list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .rps-opt-btn {
      text-align: left;
      padding: 9px 12px;
      font-family: var(--rps-serif);
      font-size: 13.5px;
      line-height: 1.48;
      color: var(--rps-ink);
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.12s ease, background-color 0.14s ease, border-color 0.14s ease, box-shadow 0.14s ease;
      word-break: break-word;
    }
    .rps-opt-btn:hover {
      background: var(--rps-sticky);
      border-color: var(--rps-stitch);
      transform: translateY(-1px);
      box-shadow: var(--rps-shadow-sm);
    }
    .rps-opt-btn.is-selected {
      background: var(--rps-sticky);
      border-color: var(--rps-marigold);
      color: var(--rps-ink);
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(214, 152, 46, 0.16);
    }
    .rps-opt-btn.is-correct {
      background: var(--rps-mint-soft);
      border-color: var(--rps-mint);
      font-weight: 700;
    }
    .rps-opt-btn.is-wrong {
      background: var(--rps-coral-soft);
      border-color: var(--rps-coral);
      font-weight: 700;
    }

    /* Explain Box */
    .rps-explain {
      margin-top: 10px;
      padding: 11px 13px;
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-left: 3.5px solid var(--rps-orange);
      border-radius: 8px;
      font-size: 13px;
      line-height: 1.65;
    }
    .rps-explain-top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
      font-weight: 700;
    }
    .rps-badge-ok {
      padding: 2px 8px;
      background: var(--rps-mint-soft);
      color: var(--rps-mint);
      border: 1px solid rgba(63, 122, 92, 0.35);
      border-radius: 5px;
      font-size: 11.5px;
      font-weight: 700;
      white-space: nowrap;
    }
    .rps-badge-err {
      padding: 2px 8px;
      background: var(--rps-coral-soft);
      color: var(--rps-coral);
      border: 1px solid rgba(194, 77, 77, 0.35);
      border-radius: 5px;
      font-size: 11.5px;
      font-weight: 700;
      white-space: nowrap;
    }
    .rps-trap-pill {
      padding: 2px 8px;
      background: var(--rps-orange-soft);
      color: var(--rps-orange);
      border: 1px solid rgba(207, 92, 40, 0.28);
      border-radius: 5px;
      font-size: 11px;
      font-weight: 700;
      white-space: nowrap;
    }
    .rps-quote {
      margin: 6px 0;
      padding: 7px 10px;
      background: var(--rps-paper);
      border-left: 3px solid var(--rps-mint);
      border-radius: 0 6px 6px 0;
      font-family: var(--rps-serif);
      font-size: 13px;
      line-height: 1.55;
    }

    /* Cloze Slots & Word Bank */
    .rps-blank-slot {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 1px 8px;
      margin: 0 3px;
      font-family: var(--rps-num);
      font-size: 13px;
      font-weight: 700;
      background: var(--rps-surface);
      color: var(--rps-ink);
      border: 1px solid var(--rps-stitch);
      border-radius: 6px;
      cursor: pointer;
      vertical-align: baseline;
      white-space: nowrap;
    }
    .rps-blank-slot.is-focus {
      background: var(--rps-sticky);
      border-color: var(--rps-orange);
      color: var(--rps-orange);
      box-shadow: 0 0 0 2px rgba(207, 92, 40, 0.14);
    }
    .rps-blank-slot.is-filled {
      background: var(--rps-sticky);
      border-color: var(--rps-marigold);
    }
    .rps-blank-slot.is-correct {
      background: var(--rps-mint-soft);
      border-color: var(--rps-mint);
      color: var(--rps-mint);
    }
    .rps-blank-slot.is-wrong {
      background: var(--rps-coral-soft);
      border-color: var(--rps-coral);
      color: var(--rps-coral);
    }
    .rps-wbank-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 7px;
      margin-top: 12px;
    }
    .rps-wb-tile {
      padding: 7px 9px;
      text-align: left;
      background: var(--rps-surface);
      color: var(--rps-ink);
      border: 1px solid var(--rps-border);
      border-radius: 8px;
      box-shadow: var(--rps-shadow-sm);
      cursor: pointer;
      font-size: 12.5px;
      font-weight: 700;
      transition: transform 0.12s ease, background-color 0.14s ease, border-color 0.14s ease;
    }
    .rps-wb-tile:hover {
      background: var(--rps-sticky);
      border-color: var(--rps-stitch);
      transform: translateY(-1px);
    }
    .rps-wb-tile.is-used {
      opacity: 0.45;
      background: var(--rps-subtle);
      box-shadow: none;
    }
    .rps-wb-sub {
      display: block;
      font-size: 11px;
      font-weight: 500;
      color: var(--rps-muted);
      margin-top: 2px;
    }

    /* Matching Layout */
    .rps-match-paras {
      max-height: 440px;
      overflow-y: auto;
      border: 1px solid var(--rps-border);
      border-radius: 9px;
      padding: 12px;
      background: var(--rps-paper);
      margin-bottom: 14px;
    }
    .rps-mpara {
      padding: 9px 12px;
      margin-bottom: 8px;
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-radius: 8px;
      font-family: var(--rps-serif);
      font-size: 14.5px;
      line-height: 1.7;
    }
    .rps-mpara.is-hl {
      background: var(--rps-mint-soft);
      border-color: var(--rps-mint);
    }
    .rps-mpara-lbl {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      margin-right: 7px;
      font-family: var(--rps-num);
      font-size: 12px;
      font-weight: 700;
      background: var(--rps-subtle);
      color: var(--rps-orange);
      border: 1px solid var(--rps-border);
      border-radius: 6px;
    }
    .rps-match-picks {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 8px;
    }
    .rps-mpick {
      min-width: 31px;
      height: 28px;
      font-family: var(--rps-num);
      font-size: 12px;
      font-weight: 700;
      background: var(--rps-surface);
      color: var(--rps-ink);
      border: 1px solid var(--rps-border);
      border-radius: 6px;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: background-color 0.12s ease, border-color 0.12s ease;
    }
    .rps-mpick:hover {
      background: var(--rps-sticky);
      border-color: var(--rps-stitch);
    }
    .rps-mpick.is-selected {
      background: var(--rps-sticky);
      border-color: var(--rps-marigold);
      color: #82500e;
    }
    [data-theme="dark"] .rps-root .rps-mpick.is-selected,
    body.dark .rps-root .rps-mpick.is-selected {
      color: #e8b34e;
    }
    .rps-mpick.is-correct {
      background: var(--rps-mint-soft);
      border-color: var(--rps-mint);
      color: var(--rps-mint);
    }
    .rps-mpick.is-wrong {
      background: var(--rps-coral-soft);
      border-color: var(--rps-coral);
      color: var(--rps-coral);
    }

    /* Writing & Translation Editors */
    .rps-textarea {
      width: 100%;
      min-height: 170px;
      padding: 13px 14px;
      font-family: var(--rps-serif);
      font-size: 15px;
      line-height: 1.7;
      color: var(--rps-ink);
      background: var(--rps-paper);
      border: 1px solid var(--rps-border);
      border-radius: 9px;
      resize: vertical;
      outline: none;
      transition: border-color 0.14s ease, box-shadow 0.14s ease;
    }
    .rps-textarea:focus {
      border-color: var(--rps-orange);
      box-shadow: 0 0 0 3px rgba(207, 92, 40, 0.12);
    }
    .rps-chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 8px 0 12px;
    }
    .rps-pat-chip {
      padding: 5px 10px;
      font-size: 12px;
      font-weight: 600;
      background: var(--rps-paper);
      color: var(--rps-ink);
      border: 1px solid var(--rps-border);
      border-radius: 7px;
      cursor: pointer;
      text-align: left;
      transition: background-color 0.12s ease, border-color 0.12s ease;
    }
    .rps-pat-chip:hover {
      background: var(--rps-sticky);
      border-color: var(--rps-stitch);
    }
    .rps-grade-panel {
      margin-top: 14px;
      padding: 15px;
      background: var(--rps-paper);
      border: 1px solid var(--rps-border);
      border-radius: 10px;
      box-shadow: var(--rps-shadow-sm);
    }
    .rps-score-big {
      font-family: var(--rps-num);
      font-size: 28px;
      font-weight: 800;
      color: var(--rps-orange);
    }
    .rps-dim-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
      margin: 10px 0;
    }
    .rps-dim-cell {
      padding: 9px 8px;
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-radius: 8px;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
    }
    .rps-breakdown-item {
      padding: 10px 12px;
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-radius: 8px;
      margin-bottom: 8px;
      font-size: 13px;
      line-height: 1.58;
    }

    /* 710 Report View */
    .rps-report-hero {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr);
      gap: 16px;
      background: var(--rps-surface);
      border: 1px solid var(--rps-border);
      border-radius: 12px;
      box-shadow: var(--rps-shadow);
      padding: 18px;
      margin-bottom: 16px;
    }
    .rps-total-box {
      padding: 16px;
      background: var(--rps-sticky);
      color: var(--rps-ink);
      border: 1px solid rgba(214, 152, 46, 0.44);
      border-radius: 10px;
      box-shadow: var(--rps-shadow-sm);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .rps-total-num {
      font-family: var(--rps-num);
      font-size: 46px;
      font-weight: 800;
      line-height: 1;
      color: var(--rps-orange);
      letter-spacing: -0.02em;
    }
    .rps-bar-row {
      margin-bottom: 10px;
    }
    .rps-bar-head {
      display: flex;
      justify-content: space-between;
      font-size: 12.5px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .rps-bar-track {
      height: 10px;
      background: var(--rps-subtle);
      border: 1px solid var(--rps-border);
      border-radius: 999px;
      overflow: hidden;
    }
    .rps-bar-fill {
      height: 100%;
      background: var(--rps-mint);
      border-radius: 999px;
    }
    .rps-bar-fill.is-warn {
      background: var(--rps-marigold);
    }
    .rps-bar-fill.is-weak {
      background: var(--rps-coral);
    }
    .rps-toast {
      position: fixed;
      left: 50%;
      bottom: 26px;
      transform: translateX(-50%);
      z-index: 950;
      max-width: min(92vw, 520px);
      padding: 10px 18px;
      font-size: 13px;
      font-weight: 700;
      line-height: 1.4;
      text-align: center;
      background: #30261e;
      color: #fdf6d8;
      border: 1px solid #d6982e;
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(48, 38, 30, 0.22);
      pointer-events: none;
    }
    [data-theme="dark"] .rps-toast,
    body.dark .rps-toast {
      background: #fdf6d8;
      color: #30261e;
      border-color: #d6982e;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.42);
    }
    .rps-local-audio {
      width: 100%;
      max-width: 100%;
      height: 36px;
      margin-top: 6px;
    }

    /* Mobile & Compact Responsive (<= 768px & 390px safe) */
    .rps-root.is-mobile .rps-kpi-row {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .rps-root.is-mobile .rps-kpi {
      padding: 8px 10px;
    }
    .rps-root.is-mobile .rps-kpi-val {
      font-size: 15px;
      white-space: nowrap;
    }
    .rps-root.is-mobile .rps-kicker {
      font-size: 9.5px;
      letter-spacing: 0.02em;
      padding: 3px 7px;
      gap: 4px;
      max-width: 100%;
      white-space: nowrap;
    }
    .rps-root.is-mobile .rps-kicker svg {
      width: 13px;
      height: 13px;
      flex-shrink: 0;
    }
    .rps-root.is-mobile .rps-lobby-grid,
    .rps-root.is-mobile .rps-opt-list,
    .rps-root.is-mobile .rps-report-hero {
      grid-template-columns: minmax(0, 1fr);
    }
    .rps-root.is-mobile .rps-wbank-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .rps-root.is-mobile .rps-dim-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .rps-root.is-mobile .rps-card,
    .rps-root.is-mobile .rps-masthead {
      padding: 13px 12px;
    }
    .rps-root.is-mobile .rps-title {
      font-size: 19px;
    }
    @media (max-width: 760px) {
      .rps-kpi-row { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
      .rps-lobby-grid, .rps-opt-list, .rps-report-hero { grid-template-columns: minmax(0, 1fr); }
      .rps-wbank-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .rps-dim-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .rps-card, .rps-masthead { padding: 13px 12px; }
      .rps-toast { bottom: 84px; padding: 9px 14px; font-size: 12.5px; }
    }
    @media (max-width: 520px) {
      .rps-kpi { padding: 8px 10px; }
      .rps-kpi-val { font-size: 15px; white-space: nowrap; }
      .rps-kicker { font-size: 9.5px; letter-spacing: 0.02em; padding: 3px 7px; gap: 4px; max-width: 100%; white-space: nowrap; }
      .rps-kicker svg { width: 13px; height: 13px; flex-shrink: 0; }
    }
  `;

  /* -------------------- Pure Utility Helpers -------------------- */
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getPapers() {
    if (typeof global !== 'undefined' && Array.isArray(global.REAL_CET4_PAPERS)) {
      return global.REAL_CET4_PAPERS;
    }
    return [];
  }

  function getGrader() {
    return (typeof global !== 'undefined' && global.Cet4Grader) ? global.Cet4Grader : null;
  }

  function getSpeech() {
    return (typeof global !== 'undefined' && global.Cet4Speech) ? global.Cet4Speech : null;
  }

  function countWordsSimple(text) {
    const g = getGrader();
    if (g && typeof g.countWords === 'function') return g.countWords(text);
    const m = String(text || '').match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g);
    return m ? m.length : 0;
  }

  function getStorageObj(storageKey) {
    const key = storageKey || DEFAULT_STORAGE_KEY;
    try {
      if (typeof global !== 'undefined' && global.localStorage) {
        const raw = global.localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') return parsed;
        }
      }
    } catch (_e) { /* ignore */ }
    return {};
  }

  function saveStorageObj(storageKey, obj) {
    const key = storageKey || DEFAULT_STORAGE_KEY;
    try {
      if (typeof global !== 'undefined' && global.localStorage) {
        global.localStorage.setItem(key, JSON.stringify(obj));
      }
    } catch (_e) { /* ignore */ }
  }

  function defaultProgress() {
    return {
      mode: 'instant',
      activePart: 'listening',
      submitted: false,
      writingText: '',
      writingGrade: null,
      listeningAnswers: {},
      clozeAnswers: {},
      clozeChecked: false,
      matchingAnswers: {},
      carefulAnswers: {},
      translationText: '',
      translationGrade: null,
      bestEstScore: 0,
      lastEstScore: 0,
      updatedAt: 0
    };
  }

  function loadPaperProgress(storageKey, paperId) {
    const store = getStorageObj(storageKey);
    const map = (store.realPaperProgress && typeof store.realPaperProgress === 'object') ? store.realPaperProgress : {};
    const saved = map[paperId];
    return Object.assign(defaultProgress(), saved || {});
  }

  function savePaperProgress(storageKey, paperId, prog) {
    const store = getStorageObj(storageKey);
    if (!store.realPaperProgress || typeof store.realPaperProgress !== 'object') {
      store.realPaperProgress = {};
    }
    prog.updatedAt = Date.now();
    store.realPaperProgress[paperId] = prog;
    saveStorageObj(storageKey, store);
  }

  function resetPaperProgress(storageKey, paperId) {
    const store = getStorageObj(storageKey);
    if (store.realPaperProgress && store.realPaperProgress[paperId]) {
      delete store.realPaperProgress[paperId];
      saveStorageObj(storageKey, store);
    }
  }

  function persistWrongItemsFallback(storageKey, wrongItems) {
    if (!Array.isArray(wrongItems) || !wrongItems.length) return;
    const store = getStorageObj(storageKey);
    const prev = Array.isArray(store.realPaperWrong) ? store.realPaperWrong : [];
    const byKey = new Map(prev.map(it => [it.key || `${it.paperId}_${it.num}`, it]));
    wrongItems.forEach(it => {
      const k = it.key || `${it.paperId || 'rp'}_${it.num || 0}`;
      byKey.set(k, Object.assign({ key: k, savedAt: Date.now() }, it));
    });
    store.realPaperWrong = Array.from(byKey.values());
    saveStorageObj(storageKey, store);
  }

  function getAllListeningQs(paper) {
    const out = [];
    if (!paper || !paper.listening || !Array.isArray(paper.listening.sections)) return out;
    paper.listening.sections.forEach(sec => {
      (sec.groups || []).forEach(g => {
        (g.questions || []).forEach(q => out.push({ sec, group: g, q }));
      });
    });
    return out;
  }

  function getAllCarefulQs(paper) {
    const out = [];
    if (!paper || !paper.reading || !Array.isArray(paper.reading.careful)) return out;
    paper.reading.careful.forEach(pas => {
      (pas.questions || []).forEach(q => out.push({ passage: pas, q }));
    });
    return out;
  }

  function countPaperAnswered(paper, prog) {
    const p = prog || defaultProgress();
    const wDone = (p.writingGrade || countWordsSimple(p.writingText) >= 20) ? 1 : 0;
    const lDone = Object.keys(p.listeningAnswers || {}).length;
    const clDone = Object.keys(p.clozeAnswers || {}).length;
    const mDone = Object.keys(p.matchingAnswers || {}).length;
    const cfDone = Object.keys(p.carefulAnswers || {}).length;
    const tDone = (p.translationGrade || countWordsSimple(p.translationText) >= 8) ? 1 : 0;
    const totalDone = wDone + lDone + clDone + mDone + cfDone + tDone;
    return { wDone, lDone, clDone, mDone, cfDone, tDone, totalDone, totalItems: paper.totalItems || 57 };
  }

  /* -------------------- Official 710-Scale Diagnostic Computation -------------------- */
  function computePaperReport(paper, prog) {
    const p = prog || defaultProgress();
    const grader = getGrader();

    // Writing (0-15 -> 106.5)
    let wGrade = p.writingGrade;
    if (!wGrade && p.writingText && p.writingText.trim() && grader) {
      wGrade = grader.gradeWriting(paper.writing, p.writingText);
    }
    const wRaw = wGrade ? Number(wGrade.score) || 0 : 0;
    const wPts = Math.round(((wRaw / 15) * 106.5) * 10) / 10;

    // Listening (Q1-15 * 7.1 + Q16-25 * 14.2 = 248.5)
    let lAnswered = 0;
    let lCorrect = 0;
    let lPts = 0;
    const wrongItems = [];
    getAllListeningQs(paper).forEach(({ group, q }) => {
      const pick = (p.listeningAnswers || {})[q.num];
      if (pick) lAnswered += 1;
      const weight = q.num <= 15 ? 7.1 : 14.2;
      if (pick && pick === q.answer) {
        lCorrect += 1;
        lPts += weight;
      } else if (pick && pick !== q.answer) {
        wrongItems.push({
          id: `${paper.id}_q${q.num}`,
          paperId: paper.id,
          paperTitle: paper.title,
          skill: 'listening',
          num: q.num,
          prompt: `${paper.sourceTag} 听力 Q${q.num} (${group.title})：${q.questionText}`,
          userAnswer: pick,
          answer: q.answer,
          explain: q.explain
        });
      }
    });
    lPts = Math.round(lPts * 10) / 10;

    // Cloze (10 * 3.55 = 35.5)
    let clAnswered = 0;
    let clCorrect = 0;
    const wbMap = {};
    (paper.reading.cloze.wordBank || []).forEach(w => { wbMap[w.code] = w; });
    (paper.reading.cloze.blanks || []).forEach(b => {
      const pick = (p.clozeAnswers || {})[b.num];
      if (pick) clAnswered += 1;
      if (pick && pick === b.answer) {
        clCorrect += 1;
      } else if (pick && pick !== b.answer) {
        const ansWord = wbMap[b.answer] ? `${b.answer}) ${wbMap[b.answer].word}` : b.answer;
        wrongItems.push({
          id: `${paper.id}_q${b.num}`,
          paperId: paper.id,
          paperTitle: paper.title,
          skill: 'cloze',
          num: b.num,
          prompt: `${paper.sourceTag} 选词填空 Q${b.num}（${paper.reading.cloze.title}）`,
          userAnswer: pick,
          answer: ansWord,
          explain: b.explain
        });
      }
    });
    const clPts = Math.round((clCorrect * 3.55) * 10) / 10;

    // Matching (10 * 7.1 = 71.0)
    let mAnswered = 0;
    let mCorrect = 0;
    (paper.reading.matching.statements || []).forEach(st => {
      const pick = (p.matchingAnswers || {})[st.num];
      if (pick) mAnswered += 1;
      if (pick && pick === st.answer) {
        mCorrect += 1;
      } else if (pick && pick !== st.answer) {
        wrongItems.push({
          id: `${paper.id}_q${st.num}`,
          paperId: paper.id,
          paperTitle: paper.title,
          skill: 'matching',
          num: st.num,
          prompt: `${paper.sourceTag} 长篇匹配 Q${st.num}：${st.text}`,
          userAnswer: pick,
          answer: st.answer,
          explain: st.explain
        });
      }
    });
    const mPts = Math.round((mCorrect * 7.1) * 10) / 10;

    // Careful Reading (10 * 14.2 = 142.0)
    let cfAnswered = 0;
    let cfCorrect = 0;
    getAllCarefulQs(paper).forEach(({ passage, q }) => {
      const pick = (p.carefulAnswers || {})[q.num];
      if (pick) cfAnswered += 1;
      if (pick && pick === q.answer) {
        cfCorrect += 1;
      } else if (pick && pick !== q.answer) {
        wrongItems.push({
          id: `${paper.id}_q${q.num}`,
          paperId: paper.id,
          paperTitle: paper.title,
          skill: 'careful',
          num: q.num,
          prompt: `${paper.sourceTag} 仔细阅读 Q${q.num} (${passage.title})：${q.stem}`,
          userAnswer: pick,
          answer: q.answer,
          explain: q.explain
        });
      }
    });
    const cfPts = Math.round((cfCorrect * 14.2) * 10) / 10;

    // Translation (0-15 -> 106.5)
    let tGrade = p.translationGrade;
    if (!tGrade && p.translationText && p.translationText.trim() && grader) {
      tGrade = grader.gradeTranslation(paper.translation, p.translationText);
    }
    const tRaw = tGrade ? Number(tGrade.score) || 0 : 0;
    const tPts = Math.round(((tRaw / 15) * 106.5) * 10) / 10;

    const readPts = Math.round((clPts + mPts + cfPts) * 10) / 10;
    const rwtPts = Math.round((readPts + wPts + tPts) * 10) / 10;
    const listeningSkipped = lAnswered === 0;
    const rawTotal = Math.round((wPts + lPts + readPts + tPts) * 10) / 10;
    const estTotal710 = listeningSkipped && rwtPts > 0
      ? Math.min(710, Math.round((rwtPts / 461.5) * 710))
      : Math.min(710, Math.round(rawTotal));

    const skills = [
      { key: 'listening', label: 'Part II 听力理解', pts: lPts, maxPts: 248.5, pct: Math.round((lPts / 248.5) * 100), detail: `${lCorrect}/25 题`, answered: lAnswered, skipped: listeningSkipped, sectionId: SKILL_SECTION_MAP.listening.sectionId },
      { key: 'cloze', label: 'Section A 选词填空', pts: clPts, maxPts: 35.5, pct: Math.round((clPts / 35.5) * 100), detail: `${clCorrect}/10 空`, answered: clAnswered, skipped: false, sectionId: SKILL_SECTION_MAP.cloze.sectionId },
      { key: 'matching', label: 'Section B 长篇匹配', pts: mPts, maxPts: 71.0, pct: Math.round((mPts / 71.0) * 100), detail: `${mCorrect}/10 题`, answered: mAnswered, skipped: false, sectionId: SKILL_SECTION_MAP.matching.sectionId },
      { key: 'careful', label: 'Section C 仔细阅读', pts: cfPts, maxPts: 142.0, pct: Math.round((cfPts / 142.0) * 100), detail: `${cfCorrect}/10 题`, answered: cfAnswered, skipped: false, sectionId: SKILL_SECTION_MAP.careful.sectionId },
      { key: 'translation', label: 'Part IV 段落汉译英', pts: tPts, maxPts: 106.5, pct: Math.round((tPts / 106.5) * 100), detail: `${tRaw}/15 分`, answered: tGrade ? 1 : 0, skipped: false, sectionId: SKILL_SECTION_MAP.translation.sectionId },
      { key: 'writing', label: 'Part I 短文写作', pts: wPts, maxPts: 106.5, pct: Math.round((wPts / 106.5) * 100), detail: `${wRaw}/15 分`, answered: wGrade ? 1 : 0, skipped: false, sectionId: SKILL_SECTION_MAP.writing.sectionId }
    ];

    // Identify 1-2 weakest skills (excluding skipped self-audio listening if RWT was attempted)
    const eligible = skills.filter(s => !(s.key === 'listening' && listeningSkipped && !paper.hasListeningScript));
    const sortedWeak = eligible.slice().sort((a, b) => a.pct - b.pct);
    const weakest = sortedWeak.slice(0, 2);

    const objAnswered = lAnswered + clAnswered + mAnswered + cfAnswered;
    const objCorrect = lCorrect + clCorrect + mCorrect + cfCorrect;

    return {
      estTotal710,
      rawTotal,
      rwtPts,
      listeningSkipped,
      passed425: estTotal710 >= 425,
      wPts, lPts, readPts, clPts, mPts, cfPts, tPts,
      wRaw, tRaw,
      objAnswered,
      objCorrect,
      objAccPct: objAnswered > 0 ? Math.round((objCorrect / objAnswered) * 100) : 0,
      skills,
      weakest,
      wrongItems
    };
  }

  function getSummaryStats(storageKey) {
    const papers = getPapers();
    let startedPapers = 0;
    let completedPapers = 0;
    let totalAnswered = 0;
    let totalCorrect = 0;
    let bestEstScore = 0;

    papers.forEach(paper => {
      const prog = loadPaperProgress(storageKey, paper.id);
      const cnt = countPaperAnswered(paper, prog);
      if (cnt.totalDone > 0) startedPapers += 1;
      if (prog.submitted || cnt.totalDone >= (paper.hasListeningScript ? 55 : 32)) {
        completedPapers += 1;
      }
      const rep = computePaperReport(paper, prog);
      totalAnswered += cnt.totalDone;
      totalCorrect += rep.objCorrect;
      const cand = Math.max(prog.bestEstScore || 0, rep.estTotal710 || 0);
      if (cand > bestEstScore) bestEstScore = cand;
    });

    return {
      totalPapers: papers.length,
      startedPapers,
      completedPapers,
      totalAnswered,
      totalCorrect,
      bestEstScore
    };
  }

  /* -------------------- Studio Instance State -------------------- */
  let hostEl = null;
  let opts = {};
  let view = 'lobby'; // lobby | paper | report
  let lobbyFilter = 'all'; // all | latest | script
  let activePaperId = null;
  let wrongOnlyFilter = false;
  let showSheet = false;
  let focusedBlank = 26;
  let activeSpeechCtrl = null;
  let speakingGroupId = null;
  let speakingTurnIdx = -1;
  let speechRate = 1.0;
  let prereadTimerId = null;
  let prereadGroupId = null;
  let prereadLeft = 0;
  let revealedTranscripts = {}; // { [groupId]: true }
  let showModelWriting = false;
  let showModelTrans = false;
  let expandedMatchPara = null;
  let localAudioUrl = null;
  let localAudioName = '';
  let toastTimerId = null;

  function injectStyles() {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = STUDIO_CSS;
    document.head.appendChild(style);
  }

  function showToast(msg) {
    if (typeof document === 'undefined') return;
    let el = document.getElementById('rps-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'rps-toast';
      el.className = 'rps-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.display = 'block';
    if (toastTimerId) clearTimeout(toastTimerId);
    toastTimerId = setTimeout(() => {
      if (el) el.style.display = 'none';
    }, 2400);
  }

  function stopAudioAndTimers() {
    const sp = getSpeech();
    if (activeSpeechCtrl && typeof activeSpeechCtrl.stop === 'function') {
      try { activeSpeechCtrl.stop(); } catch (_e) { /* ignore */ }
    } else if (sp && typeof sp.stop === 'function') {
      try { sp.stop(); } catch (_e) { /* ignore */ }
    }
    activeSpeechCtrl = null;
    speakingGroupId = null;
    speakingTurnIdx = -1;
    if (prereadTimerId) {
      clearInterval(prereadTimerId);
      prereadTimerId = null;
    }
    prereadGroupId = null;
    prereadLeft = 0;
  }

  function fireXiaoKe(eventType, payload) {
    if (opts && typeof opts.onXiaoKeEvent === 'function') {
      try { opts.onXiaoKeEvent(eventType, payload || {}); } catch (_e) { /* ignore */ }
    }
  }

  function fireFireworks(ev) {
    if (opts && typeof opts.onFireworks === 'function') {
      try {
        const x = ev && typeof ev.clientX === 'number' ? ev.clientX : (typeof window !== 'undefined' ? window.innerWidth * 0.5 : 400);
        const y = ev && typeof ev.clientY === 'number' ? ev.clientY : (typeof window !== 'undefined' ? window.innerHeight * 0.35 : 240);
        opts.onFireworks(x, y);
      } catch (_e) { /* ignore */ }
    }
  }

  function getActivePaper() {
    return getPapers().find(p => p.id === activePaperId) || null;
  }

  function storageKey() {
    return (opts && opts.storageKey) || DEFAULT_STORAGE_KEY;
  }

  function highlightSignals(text, signalWords) {
    let html = escHtml(text);
    const words = Array.isArray(signalWords) ? signalWords : [];
    words.forEach(w => {
      const clean = String(w || '').trim();
      if (clean.length < 2) return;
      const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      html = html.replace(new RegExp(`\\b(${escaped})\\b`, 'gi'), '<span class="rps-sig-mark">$1</span>');
    });
    return html;
  }

  function highlightEvidenceInPara(paraText, quotes) {
    let html = escHtml(paraText);
    (quotes || []).forEach(q => {
      const raw = String(q || '').trim();
      if (raw.length < 18) return;
      const snippet = escHtml(raw.slice(0, 72));
      const idx = html.indexOf(snippet);
      if (idx !== -1) {
        const fullEsc = escHtml(raw);
        if (html.indexOf(fullEsc) !== -1) {
          html = html.replace(fullEsc, `<span class="rps-ev-mark">${fullEsc}</span>`);
        } else {
          html = html.slice(0, idx) + `<span class="rps-ev-mark">${snippet}</span>` + html.slice(idx + snippet.length);
        }
      }
    });
    return html;
  }

  /* -------------------- View 1: Paper Archive Lobby -------------------- */
  function renderLobbyHtml() {
    const papers = getPapers();
    const stats = getSummaryStats(storageKey());
    const filtered = papers.filter(p => {
      if (lobbyFilter === 'latest') return Number(p.year.slice(0, 4)) >= 2024;
      if (lobbyFilter === 'script') return Boolean(p.hasListeningScript);
      return true;
    });

    const cardsHtml = filtered.map(paper => {
      const prog = loadPaperProgress(storageKey(), paper.id);
      const cnt = countPaperAnswered(paper, prog);
      const pct = Math.round((cnt.totalDone / cnt.totalItems) * 100);
      const best = prog.bestEstScore || 0;
      const stickerCls = paper.hasListeningScript ? 'rps-sticker rps-sticker-mint' : 'rps-sticker rps-sticker-orange';
      const topicTags = (paper.topics || []).slice(0, 4).map(t => `<span class="rps-topic-tag">${escHtml(t)}</span>`).join('');
      const hasAny = cnt.totalDone > 0;
      return `
        <article class="rps-dossier" data-paper-card="${escHtml(paper.id)}">
          <div class="rps-dossier-head">
            <span class="rps-stamp">${escHtml(paper.stamp)}</span>
            <span class="${stickerCls}">${escHtml(paper.badge)}</span>
          </div>
          <h3 class="rps-dossier-title">${escHtml(paper.title)}</h3>
          <p class="rps-dossier-sub">${escHtml(paper.subtitle)}</p>
          <div class="rps-topic-row">${topicTags}</div>
          <div class="rps-prog-wrap">
            <div class="rps-prog-meta">
              <span>进度：已答 ${cnt.totalDone} / ${cnt.totalItems} 题（${pct}%）</span>
              <span>${best > 0 ? `最高折算 ${best} / 710` : '未阅卷'}</span>
            </div>
            <div class="rps-prog-bar"><div class="rps-prog-fill" style="width:${pct}%"></div></div>
            <div class="rps-dossier-actions">
              <button type="button" class="rps-btn rps-btn-orange" data-rps-open="${escHtml(paper.id)}">
                ${SVG.play}<span>${hasAny ? '继续刷卷' : '开始刷卷'}</span>
              </button>
              ${hasAny ? `<button type="button" class="rps-btn rps-btn-marigold" data-rps-report="${escHtml(paper.id)}">${SVG.chart}<span>诊断报告</span></button>` : ''}
              ${hasAny ? `<button type="button" class="rps-btn rps-btn-ghost rps-btn-sm" data-rps-reset="${escHtml(paper.id)}">重置</button>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    return `
      <div class="rps-masthead">
        <div class="rps-mast-top">
          <div>
            <div class="rps-kicker">${SVG.archive}<span>AUTHENTIC CET-4 REAL PAPERS · 2023.06–2026.06</span></div>
            <h2 class="rps-title">历年四级真题全卷实战档案室</h2>
            <p class="rps-sub">严选 2023.06–2026.06 共 ${papers.length} 套真实考场原卷（342 道实考真题，零编造、零注水）。支持「即时精刷」与「整套连刷 + 710分制智能阅卷诊断」。</p>
          </div>
        </div>
        <div class="rps-kpi-row">
          <div class="rps-kpi">
            <div class="rps-kpi-val">${stats.totalPapers} 套 / 342 题</div>
            <div class="rps-kpi-lbl">2023–2026 真实考卷</div>
          </div>
          <div class="rps-kpi">
            <div class="rps-kpi-val">${stats.startedPapers} / ${stats.totalPapers}</div>
            <div class="rps-kpi-lbl">已开启档案卷</div>
          </div>
          <div class="rps-kpi">
            <div class="rps-kpi-val">${stats.totalAnswered} 题</div>
            <div class="rps-kpi-lbl">累计实卷作答</div>
          </div>
          <div class="rps-kpi">
            <div class="rps-kpi-val">${stats.bestEstScore > 0 ? stats.bestEstScore + ' / 710' : '--'}</div>
            <div class="rps-kpi-lbl">历史最高折算分</div>
          </div>
        </div>
      </div>

      <div class="rps-filter-bar">
        <button type="button" class="rps-btn rps-btn-sm ${lobbyFilter === 'all' ? 'is-active' : ''}" data-rps-filter="all">全部历年真题 (${papers.length}套)</button>
        <button type="button" class="rps-btn rps-btn-sm ${lobbyFilter === 'latest' ? 'is-active' : ''}" data-rps-filter="latest">2024–2026 最新考卷 (4套)</button>
        <button type="button" class="rps-btn rps-btn-sm ${lobbyFilter === 'script' ? 'is-active' : ''}" data-rps-filter="script">${SVG.headphones}<span>含完整听力逐字稿语音精听 (2套)</span></button>
      </div>

      <div class="rps-lobby-grid">${cardsHtml}</div>
    `;
  }

  /* -------------------- View 2: Full-Paper Practice Workbench -------------------- */
  function renderPaperShellHtml(paper, prog) {
    const cnt = countPaperAnswered(paper, prog);
    const isFull = prog.mode === 'full';
    const isGraded = prog.submitted;

    const parts = [
      { id: 'writing', label: 'Part I 写作', done: `${cnt.wDone}/1` },
      { id: 'listening', label: 'Part II 听力 1-25', done: `${cnt.lDone}/25` },
      { id: 'cloze', label: '选词 26-35', done: `${cnt.clDone}/10` },
      { id: 'matching', label: '匹配 36-45', done: `${cnt.mDone}/10` },
      { id: 'careful', label: '精读 46-55', done: `${cnt.cfDone}/10` },
      { id: 'translation', label: 'Part IV 翻译', done: `${cnt.tDone}/1` }
    ];

    const tabsHtml = parts.map(pt => `
      <button type="button" class="rps-part-tab ${prog.activePart === pt.id ? 'is-active' : ''}" data-rps-part="${pt.id}">
        <span>${pt.label}</span>
        <span class="rps-part-cnt">${pt.done}</span>
      </button>
    `).join('');

    // Build clickable answer sheet dots
    let sheetHtml = '';
    if (showSheet) {
      const dots = [];
      // Part I Writing
      const wCls = prog.writingGrade ? (prog.writingGrade.passed ? 'is-correct' : 'is-wrong') : (cnt.wDone ? 'is-answered' : '');
      dots.push(`<button type="button" class="rps-qdot ${wCls}" data-rps-jump="writing:0">写</button>`);
      // Listening 1-25
      getAllListeningQs(paper).forEach(({ q }) => {
        const pick = (prog.listeningAnswers || {})[q.num];
        const rev = (prog.mode === 'instant' && pick) || isGraded;
        let cls = '';
        if (rev && pick) cls = pick === q.answer ? 'is-correct' : 'is-wrong';
        else if (pick) cls = 'is-answered';
        dots.push(`<button type="button" class="rps-qdot ${cls}" data-rps-jump="listening:${q.num}">${q.num}</button>`);
      });
      // Cloze 26-35
      paper.reading.cloze.blanks.forEach(b => {
        const pick = (prog.clozeAnswers || {})[b.num];
        const rev = (prog.mode === 'instant' && prog.clozeChecked) || isGraded;
        let cls = '';
        if (rev && pick) cls = pick === b.answer ? 'is-correct' : 'is-wrong';
        else if (pick) cls = 'is-answered';
        dots.push(`<button type="button" class="rps-qdot ${cls}" data-rps-jump="cloze:${b.num}">${b.num}</button>`);
      });
      // Matching 36-45
      paper.reading.matching.statements.forEach(st => {
        const pick = (prog.matchingAnswers || {})[st.num];
        const rev = (prog.mode === 'instant' && pick) || isGraded;
        let cls = '';
        if (rev && pick) cls = pick === st.answer ? 'is-correct' : 'is-wrong';
        else if (pick) cls = 'is-answered';
        dots.push(`<button type="button" class="rps-qdot ${cls}" data-rps-jump="matching:${st.num}">${st.num}</button>`);
      });
      // Careful 46-55
      getAllCarefulQs(paper).forEach(({ q }) => {
        const pick = (prog.carefulAnswers || {})[q.num];
        const rev = (prog.mode === 'instant' && pick) || isGraded;
        let cls = '';
        if (rev && pick) cls = pick === q.answer ? 'is-correct' : 'is-wrong';
        else if (pick) cls = 'is-answered';
        dots.push(`<button type="button" class="rps-qdot ${cls}" data-rps-jump="careful:${q.num}">${q.num}</button>`);
      });
      // Part IV Translation
      const tCls = prog.translationGrade ? (prog.translationGrade.passed ? 'is-correct' : 'is-wrong') : (cnt.tDone ? 'is-answered' : '');
      dots.push(`<button type="button" class="rps-qdot ${tCls}" data-rps-jump="translation:0">译</button>`);

      sheetHtml = `
        <div class="rps-sheet-box">
          <div class="rps-sheet-head">
            <span>全卷 57 题导航答题卡（点击直达题号）</span>
            <span>棉纸=未答 · 暖蜜=已答 · 鼠尾草=正确 · 干玫瑰=错题</span>
          </div>
          <div class="rps-sheet-grid">${dots.join('')}</div>
        </div>
      `;
    }

    let bodyHtml = '';
    if (prog.activePart === 'writing') bodyHtml = renderWritingPart(paper, prog);
    else if (prog.activePart === 'listening') bodyHtml = renderListeningPart(paper, prog);
    else if (prog.activePart === 'cloze') bodyHtml = renderClozePart(paper, prog);
    else if (prog.activePart === 'matching') bodyHtml = renderMatchingPart(paper, prog);
    else if (prog.activePart === 'careful') bodyHtml = renderCarefulPart(paper, prog);
    else if (prog.activePart === 'translation') bodyHtml = renderTranslationPart(paper, prog);

    return `
      <div class="rps-studio-bar">
        <div class="rps-studio-left">
          <button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-back="lobby">${SVG.back}<span>返回真题库</span></button>
          <span class="rps-stamp">${escHtml(paper.stamp)}</span>
          <span class="rps-studio-title">${escHtml(paper.title)}</span>
        </div>
        <div class="rps-studio-right">
          <div class="rps-mode-seg" role="group" aria-label="刷题模式">
            <button type="button" class="rps-mode-opt ${!isFull ? 'is-active' : ''}" data-rps-mode="instant">即时精刷</button>
            <button type="button" class="rps-mode-opt ${isFull ? 'is-active' : ''}" data-rps-mode="full">整套连刷</button>
          </div>
          <button type="button" class="rps-btn rps-btn-sm ${showSheet ? 'is-active' : ''}" data-rps-toggle-sheet="1">${SVG.grid}<span>答题卡 (${cnt.totalDone}/${cnt.totalItems})</span></button>
          ${isGraded || wrongOnlyFilter ? `<button type="button" class="rps-btn rps-btn-sm ${wrongOnlyFilter ? 'rps-btn-coral' : 'rps-btn-ghost'}" data-rps-wrong-only="1">${wrongOnlyFilter ? '显示全部题' : '只看错题'}</button>` : ''}
          <button type="button" class="rps-btn rps-btn-sm rps-btn-marigold" data-rps-grade-paper="1">${SVG.chart}<span>整卷智能阅卷</span></button>
        </div>
      </div>

      <div class="rps-part-tabs">${tabsHtml}</div>
      ${sheetHtml}
      <div class="rps-part-body">${bodyHtml}</div>
    `;
  }

  /* ---- Part I: Writing ---- */
  function renderWritingPart(paper, prog) {
    const w = paper.writing;
    const wc = countWordsSimple(prog.writingText || '');
    const inBand = wc >= w.wordRange[0] && wc <= w.wordRange[1];
    const g = prog.writingGrade;

    const blueprintHtml = (w.logicBlueprint || []).map(b => `<li style="margin-bottom:4px;">${escHtml(b)}</li>`).join('');
    const patChips = (w.transferablePatterns || []).map((pat, idx) =>
      `<button type="button" class="rps-pat-chip" data-rps-insert-pat="${idx}">+ ${escHtml(pat)}</button>`
    ).join('');

    let gradeHtml = '';
    if (g) {
      const dims = g.dimensions || {};
      const matchedStr = (g.matchedPatterns || []).length
        ? g.matchedPatterns.map(m => `<span class="rps-topic-tag" style="background:var(--rps-mint-soft)">${escHtml(m)}</span>`).join('')
        : '<span style="color:var(--rps-muted);font-size:12px;">暂未命中高亮高分句型，可点选上方迁移句型贴片补强。</span>';
      const tips = [].concat(g.missedTips || [], g.suggestions || [], g.grammarNotes || []).slice(0, 6)
        .map(t => `<li style="margin-bottom:4px;">${escHtml(t)}</li>`).join('');
      gradeHtml = `
        <div class="rps-grade-panel">
          <div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px;">
            <div><span class="rps-score-big">${g.score} / 15</span> <strong style="margin-left:6px;">${escHtml(g.bandLabel || '')}</strong></div>
            <span class="rps-sticker">${g.wordCount} 词 · ${g.paraCount} 段 · 折合 ${Math.round((g.score / 15) * 106.5 * 10) / 10} / 106.5 分</span>
          </div>
          <p style="margin:8px 0;font-size:13.5px;font-weight:700;">${escHtml(g.feedback || '')}</p>
          <div class="rps-dim-grid">
            <div class="rps-dim-cell">内容切题<br><strong>${dims.content != null ? dims.content : '-'} / 4</strong></div>
            <div class="rps-dim-cell">段落衔接<br><strong>${dims.structure != null ? dims.structure : '-'} / 4</strong></div>
            <div class="rps-dim-cell">语言句型<br><strong>${dims.language != null ? dims.language : '-'} / 4</strong></div>
            <div class="rps-dim-cell">篇幅规范<br><strong>${dims.length != null ? dims.length : '-'} / 3</strong></div>
          </div>
          <div style="margin:8px 0 6px;font-size:12px;font-weight:800;">命中的高分表达：</div>
          <div class="rps-topic-row">${matchedStr}</div>
          ${tips ? `<ul style="margin:8px 0 0 18px;padding:0;font-size:12.5px;line-height:1.55;">${tips}</ul>` : ''}
        </div>
      `;
    }

    return `
      <div class="rps-card">
        <div class="rps-card-head">
          <h3 class="rps-card-title">${SVG.pen} Part I Writing — ${escHtml(w.title)}</h3>
          <span class="rps-sticker">30 分钟 · ${w.wordRange[0]}–${w.wordRange[1]} 词 · 106.5 分</span>
        </div>
        <div class="rps-en-prose" style="padding:13px 14px;background:var(--rps-paper);border:1px solid var(--rps-border);border-radius:9px;margin-bottom:12px;">
          <strong>Directions:</strong> ${escHtml(w.directions)}
        </div>
        <details style="margin-bottom:12px;border:1px solid var(--rps-border);border-radius:9px;padding:9px 13px;background:var(--rps-surface);">
          <summary style="cursor:pointer;font-weight:800;font-size:13px;">三段式审题逻辑蓝图 & 点击插入高分迁移句型</summary>
          <ol style="margin:8px 0 10px 18px;padding:0;font-size:13px;line-height:1.55;">${blueprintHtml}</ol>
          <div style="font-size:12px;font-weight:800;margin-bottom:4px;">点击下方句型贴片直接插入写作框：</div>
          <div class="rps-chip-row">${patChips}</div>
        </details>

        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:12.5px;font-weight:800;">
          <span>英文作答区（建议分 3 段，空行隔开）</span>
          <span id="rps-write-wc" class="rps-sticker ${inBand ? 'rps-sticker-mint' : ''}">当前 ${wc} 词（目标 ${w.wordRange[0]}–${w.wordRange[1]}）</span>
        </div>
        <textarea class="rps-textarea" id="rps-write-input" placeholder="在这里输入你的四级英语作文（自动断点存盘至本地）...">${escHtml(prog.writingText || '')}</textarea>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
          <button type="button" class="rps-btn rps-btn-orange" data-rps-grade-writing="1">${SVG.check}<span>智能写作评分</span></button>
          <button type="button" class="rps-btn rps-btn-ghost" data-rps-toggle-wmodel="1">${SVG.book}<span>${showModelWriting ? '隐藏高分范文' : '对照高分范文'}</span></button>
          <button type="button" class="rps-btn rps-btn-ghost" data-rps-part="listening">${SVG.arrowRight}<span>前往 Part II 听力</span></button>
        </div>
        ${gradeHtml}
        ${showModelWriting ? `
          <div class="rps-grade-panel" style="background:var(--rps-surface);">
            <div style="font-weight:900;font-size:14px;margin-bottom:8px;">高分范文参考：${escHtml(w.modelTitle || w.title)}（${countWordsSimple(w.modelEssay)} 词）</div>
            <div class="rps-en-prose">${w.modelEssay.split(/\n\n+/).map(p => `<p>${escHtml(p)}</p>`).join('')}</div>
          </div>
        ` : ''}
      </div>
    `;
  }

  /* ---- Part II: Listening ---- */
  function renderListeningPart(paper, prog) {
    const lis = paper.listening;
    const hasScript = Boolean(paper.hasListeningScript);
    const isInstant = prog.mode === 'instant';
    const isGraded = prog.submitted;

    let topNotice = '';
    if (!hasScript) {
      topNotice = `
        <div class="rps-notice">
          <strong>诚实说明（2024–2026 最新实考卷听力）：</strong>本套源库完整收录全部 25 题原卷选项与官方校对答案，但未收录完整录音逐字稿，平台严格拒绝 AI 编造假听力原文。你可以：① 点击各组 <strong>15秒未听先知预读</strong> + <strong>选项朗读磨耳</strong> 训练预读节奏；② 导入自己本地下载的官方 MP3 原声边听边刷；③ 或直接跳过听力先刷读写译 32 题，阅卷时自动给出读写译实得分与 710 等比预估分！
          <div style="margin-top:8px;display:flex;flex-wrap:wrap;align-items:center;gap:8px;">
            <label class="rps-btn rps-btn-sm rps-btn-marigold" style="cursor:pointer;">
              ${SVG.upload}<span>${localAudioName ? '更换本地原声 MP3' : '导入本地原声 MP3 播放'}</span>
              <input type="file" accept="audio/*" id="rps-local-mp3-input" style="display:none;">
            </label>
            ${localAudioName ? `<span style="font-size:12px;font-weight:800;">已载入：${escHtml(localAudioName)}</span>` : ''}
          </div>
          ${localAudioUrl ? `<audio class="rps-local-audio" controls src="${escHtml(localAudioUrl)}"></audio>` : ''}
        </div>
      `;
    }

    let html = topNotice;
    (lis.sections || []).forEach(sec => {
      html += `<div style="margin:14px 0 8px;display:flex;align-items:center;gap:8px;"><span class="rps-stamp">${escHtml(sec.section)}</span><strong style="font-size:14px;">${escHtml(sec.label)}</strong></div>`;
      (sec.groups || []).forEach(g => {
        const qsToShow = wrongOnlyFilter
          ? g.questions.filter(q => (prog.listeningAnswers || {})[q.num] && prog.listeningAnswers[q.num] !== q.answer)
          : g.questions;
        if (wrongOnlyFilter && !qsToShow.length) return;

        const allGroupAnswered = g.questions.every(q => Boolean((prog.listeningAnswers || {})[q.num]));
        const transcriptVisible = hasScript && (Boolean(revealedTranscripts[g.groupId]) || (isInstant && allGroupAnswered) || isGraded);
        const isPlayingThis = speakingGroupId === g.groupId && activeSpeechCtrl && activeSpeechCtrl.getState().state === 'playing';
        const isPausedThis = speakingGroupId === g.groupId && activeSpeechCtrl && activeSpeechCtrl.getState().state === 'paused';
        const isPrereadThis = prereadGroupId === g.groupId && prereadLeft > 0;

        let audioBar = '';
        if (hasScript) {
          audioBar = `
            <div class="rps-audio-bar">
              <button type="button" class="rps-btn rps-btn-sm ${isPlayingThis ? 'rps-btn-marigold' : 'rps-btn-orange'}" data-rps-play-group="${escHtml(g.groupId)}">
                ${isPlayingThis ? SVG.pause : SVG.play}<span>${isPlayingThis ? '暂停放音' : (isPausedThis ? '继续放音' : '播放原版语音')}</span>
              </button>
              <button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-replay-group="${escHtml(g.groupId)}">${SVG.replay}<span>重播</span></button>
              ${[0.85, 1.0, 1.15].map(r => `<button type="button" class="rps-btn rps-btn-sm ${Math.abs(speechRate - r) < 0.02 ? 'is-active' : ''}" data-rps-rate="${r}">${r}x</button>`).join('')}
              <button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-preread="${escHtml(g.groupId)}">${SVG.clock}<span>${isPrereadThis ? `预读 ${prereadLeft}s (跳过)` : '15s预读'}</span></button>
              <button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-toggle-script="${escHtml(g.groupId)}">${SVG.book}<span>${transcriptVisible ? '收起原文' : '查看逐字稿'}</span></button>
              <span class="rps-audio-status">${speakingGroupId === g.groupId && speakingTurnIdx >= 0 ? `正在朗读第 ${speakingTurnIdx + 1}/${g.scriptTurns.length} 句` : `${g.scriptTurns.length} 句原稿`}</span>
            </div>
          `;
        } else {
          audioBar = `
            <div class="rps-audio-bar">
              <button type="button" class="rps-btn rps-btn-sm rps-btn-marigold" data-rps-preread="${escHtml(g.groupId)}">${SVG.clock}<span>${isPrereadThis ? `未听先知倒计时 ${prereadLeft}s (跳过)` : '15s 未听先知预读'}</span></button>
              <button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-read-opts="${escHtml(g.groupId)}">${SVG.volume}<span>选项朗读磨耳</span></button>
              <span class="rps-audio-status">Q${g.qNums[0]}–Q${g.qNums[g.qNums.length - 1]}</span>
            </div>
          `;
        }

        let scriptHtml = '';
        if (transcriptVisible && g.scriptTurns && g.scriptTurns.length) {
          const turnsHtml = g.scriptTurns.map((t, ti) => {
            const evNums = t.evidenceFor || [];
            const showEv = (isInstant && allGroupAnswered) || isGraded;
            const cls = [
              'rps-turn',
              speakingGroupId === g.groupId && speakingTurnIdx === ti ? 'is-speaking' : '',
              showEv && evNums.length ? 'is-evidence' : ''
            ].filter(Boolean).join(' ');
            const evBadge = showEv && evNums.length
              ? `<span class="rps-ev-tag">Q${evNums.join('/Q')} 答案定位句</span>`
              : '';
            return `<div class="${cls}" data-rps-jump-turn="${escHtml(g.groupId)}:${ti}"><span class="rps-spk-tag">${escHtml(t.speaker)}</span>${highlightSignals(t.text, t.signalWords)}${evBadge}</div>`;
          }).join('');
          scriptHtml = `<div class="rps-script-box"><div style="font-size:11.5px;font-weight:700;color:var(--rps-muted);margin-bottom:6px;">原版听力逐字稿（点击任意一句可从该句精听复读，暖蜜荧光为信号词，鼠尾草绿为答案定位句）：</div>${turnsHtml}</div>`;
        }

        const qsHtml = qsToShow.map(q => {
          const pick = (prog.listeningAnswers || {})[q.num] || '';
          const revealed = (isInstant && Boolean(pick)) || isGraded;
          const isWrong = revealed && pick && pick !== q.answer;
          const optsHtml = q.options.map((opt, oi) => {
            const code = String.fromCharCode(65 + oi);
            let cls = 'rps-opt-btn';
            if (revealed) {
              if (code === q.answer) cls += ' is-correct';
              else if (code === pick) cls += ' is-wrong';
            } else if (code === pick) {
              cls += ' is-selected';
            }
            return `<button type="button" class="${cls}" data-rps-lis-opt="${q.num}:${code}">${escHtml(opt)}</button>`;
          }).join('');

          let expHtml = '';
          if (revealed) {
            const ok = pick === q.answer;
            expHtml = `
              <div class="rps-explain">
                <div class="rps-explain-top">
                  <span>${ok ? '<span class="rps-badge-ok">回答正确</span>' : `<span class="rps-badge-err">${pick ? `答错（你选 ${pick}）` : '未作答'}</span>`} 正确答案：<strong>${q.answer}</strong></span>
                  ${!ok ? `<button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-add-wrong="listening:${q.num}">${SVG.bookmark}<span>加入错题本</span></button>` : ''}
                </div>
                ${q.evidenceQuote ? `<div class="rps-quote">定位依据：${escHtml(q.evidenceQuote)}</div>` : ''}
                <div>${escHtml(q.explain)}</div>
              </div>
            `;
          }

          return `
            <div class="rps-q-item ${isWrong ? 'is-wrong-card' : ''}" id="rps-q-listening-${q.num}">
              <div class="rps-q-stem"><span class="rps-q-num">Q${q.num}</span>${escHtml(revealed || !hasScript ? q.questionText : `听录音作答第 ${q.num} 题（作答后揭晓设问与原文定位）`)}</div>
              <div class="rps-opt-list">${optsHtml}</div>
              ${expHtml}
            </div>
          `;
        }).join('');

        html += `
          <div class="rps-card">
            <div class="rps-card-head">
              <h3 class="rps-card-title">${SVG.headphones} ${escHtml(g.label)} · ${escHtml(g.title)}</h3>
              <span class="rps-sticker">Q${g.qNums[0]}–Q${g.qNums[g.qNums.length - 1]}</span>
            </div>
            <div style="font-size:12.5px;color:var(--rps-muted);margin-bottom:10px;line-height:1.5;">${escHtml(g.preReadCue)}</div>
            ${audioBar}
            ${scriptHtml}
            ${qsHtml}
          </div>
        `;
      });
    });

    html += `<div style="display:flex;justify-content:flex-end;margin-bottom:12px;"><button type="button" class="rps-btn rps-btn-orange" data-rps-part="cloze">${SVG.arrowRight}<span>继续刷 Part III 选词填空</span></button></div>`;
    return html;
  }

  /* ---- Part III Section A: Banked Cloze (Q26-35) ---- */
  function renderClozePart(paper, prog) {
    const cl = paper.reading.cloze;
    const isInstant = prog.mode === 'instant';
    const revealed = (isInstant && prog.clozeChecked) || prog.submitted;
    const ansMap = prog.clozeAnswers || {};
    const wbByCode = {};
    cl.wordBank.forEach(w => { wbByCode[w.code] = w; });
    const usedCodes = new Set(Object.values(ansMap).filter(Boolean));
    const blankByNum = {};
    cl.blanks.forEach(b => { blankByNum[b.num] = b; });

    // Replace {{26}}..{{35}} with interactive slot buttons
    const renderedPassage = escHtml(cl.passageHtml).replace(/\{\{(\d{2})\}\}/g, (_m, nStr) => {
      const num = Number(nStr);
      const pick = ansMap[num] || '';
      const entry = wbByCode[pick];
      const b = blankByNum[num];
      let cls = 'rps-blank-slot';
      if (revealed) {
        cls += (pick && b && pick === b.answer) ? ' is-correct' : ' is-wrong';
      } else if (focusedBlank === num) {
        cls += ' is-focus';
      } else if (pick) {
        cls += ' is-filled';
      }
      const lbl = entry ? `${num}. ${pick} ${entry.word}` : `[ ${num} ]`;
      return `<button type="button" class="${cls}" id="rps-q-cloze-${num}" data-rps-cloze-slot="${num}">${escHtml(lbl)}</button>`;
    });

    const tilesHtml = cl.wordBank.map(w => {
      const isUsed = usedCodes.has(w.code);
      return `
        <button type="button" class="rps-wb-tile ${isUsed ? 'is-used' : ''}" data-rps-wb-code="${w.code}">
          <span><strong>${w.code})</strong> ${escHtml(w.word)}</span>
          ${revealed ? `<span class="rps-wb-sub">${escHtml(w.pos)} ${escHtml(w.meaning)}</span>` : ''}
        </button>
      `;
    }).join('');

    let reviewHtml = '';
    if (revealed) {
      const blanksList = wrongOnlyFilter
        ? cl.blanks.filter(b => ansMap[b.num] !== b.answer)
        : cl.blanks;
      const correctCnt = cl.blanks.filter(b => ansMap[b.num] === b.answer).length;
      const rows = blanksList.map(b => {
        const pick = ansMap[b.num] || '';
        const ok = pick === b.answer;
        const ansObj = wbByCode[b.answer];
        return `
          <div class="rps-explain" style="margin-top:8px;border-left-color:${ok ? 'var(--rps-mint)' : 'var(--rps-coral)'}">
            <div class="rps-explain-top">
              <span><strong>Q${b.num}</strong> · ${ok ? '<span class="rps-badge-ok">正确</span>' : `<span class="rps-badge-err">${pick ? `你选 ${pick}` : '未填'}</span>`} 正解：<strong>${b.answer}) ${ansObj ? escHtml(ansObj.word) : ''}</strong>（${escHtml(b.posHint)}）</span>
              ${!ok ? `<button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-add-wrong="cloze:${b.num}">${SVG.bookmark}<span>加入错题本</span></button>` : ''}
            </div>
            <div>${escHtml(b.explain)}</div>
          </div>
        `;
      }).join('');
      reviewHtml = `
        <div style="margin-top:14px;">
          <div style="font-weight:900;font-size:14px;margin-bottom:6px;">选词填空核验结果：答对 ${correctCnt} / 10 空（得分 ${Math.round(correctCnt * 3.55 * 10) / 10} / 35.5 分）</div>
          ${rows || '<div class="rps-notice">本部分全部答对，无错题！</div>'}
        </div>
      `;
    }

    return `
      <div class="rps-card">
        <div class="rps-card-head">
          <h3 class="rps-card-title">${SVG.book} Part III Section A 选词填空 — ${escHtml(cl.title)}</h3>
          <span class="rps-sticker">Q26–Q35 · 15选10 · 35.5 分</span>
        </div>
        <div style="font-size:12.5px;color:var(--rps-muted);margin-bottom:10px;">
          操作提示：先点击文中编号空格（当前锁定 <strong>第 ${focusedBlank} 空</strong>），再点击下方 A–O 备选词填入；再次点击已填空格可清空或改选。
        </div>
        <div class="rps-en-prose" style="padding:14px;background:var(--rps-paper);border:1px solid var(--rps-border);border-radius:9px;">
          ${renderedPassage}
        </div>
        <div style="margin-top:12px;font-size:12.5px;font-weight:800;">15 词备选池（点击填入第 ${focusedBlank} 空）：</div>
        <div class="rps-wbank-grid">${tilesHtml}</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">
          ${isInstant ? `<button type="button" class="rps-btn rps-btn-orange" data-rps-check-cloze="1">${SVG.check}<span>${prog.clozeChecked ? '已核对（点击可重改）' : '一键核对选词 10 空'}</span></button>` : ''}
          <button type="button" class="rps-btn rps-btn-ghost" data-rps-clear-cloze="1">清空选词重填</button>
          <button type="button" class="rps-btn rps-btn-ghost" data-rps-part="matching">${SVG.arrowRight}<span>前往长篇匹配 36-45</span></button>
        </div>
        ${reviewHtml}
      </div>
    `;
  }

  /* ---- Part III Section B: Long Reading Matching (Q36-45) ---- */
  function renderMatchingPart(paper, prog) {
    const mt = paper.reading.matching;
    const isInstant = prog.mode === 'instant';
    const isGraded = prog.submitted;
    const ansMap = prog.matchingAnswers || {};
    const labels = mt.paragraphs.map(p => p.label);

    const jumpBtns = labels.map(lb =>
      `<button type="button" class="rps-btn rps-btn-sm ${expandedMatchPara === lb ? 'is-active' : 'rps-btn-ghost'}" data-rps-scroll-para="${lb}">${lb}段</button>`
    ).join('');

    const parasHtml = mt.paragraphs.map(pa => {
      const hl = expandedMatchPara === pa.label;
      return `
        <div class="rps-mpara ${hl ? 'is-hl' : ''}" id="rps-mpara-${pa.label}">
          <span class="rps-mpara-lbl">${pa.label}</span>${escHtml(pa.text)}
        </div>
      `;
    }).join('');

    const stmtsToShow = wrongOnlyFilter
      ? mt.statements.filter(st => ansMap[st.num] && ansMap[st.num] !== st.answer)
      : mt.statements;

    const stmtsHtml = stmtsToShow.map(st => {
      const pick = ansMap[st.num] || '';
      const revealed = (isInstant && Boolean(pick)) || isGraded;
      const isWrong = revealed && pick && pick !== st.answer;

      const picksHtml = labels.map(lb => {
        let cls = 'rps-mpick';
        if (revealed) {
          if (lb === st.answer) cls += ' is-correct';
          else if (lb === pick) cls += ' is-wrong';
        } else if (lb === pick) {
          cls += ' is-selected';
        }
        return `<button type="button" class="${cls}" data-rps-match-pick="${st.num}:${lb}">${lb}</button>`;
      }).join('');

      let expHtml = '';
      if (revealed) {
        const ok = pick === st.answer;
        const kwChips = (st.anchorKeywords || []).map(k => `<span class="rps-topic-tag">${escHtml(k)}</span>`).join('');
        expHtml = `
          <div class="rps-explain">
            <div class="rps-explain-top">
              <span>${ok ? '<span class="rps-badge-ok">匹配正确</span>' : `<span class="rps-badge-err">${pick ? `你选 ${pick} 段` : '未作答'}</span>`} 正确段落：<strong>${st.answer} 段</strong></span>
              <span style="display:inline-flex;gap:6px;">
                <button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-scroll-para="${st.answer}">定位到 ${st.answer} 段</button>
                ${!ok ? `<button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-add-wrong="matching:${st.num}">${SVG.bookmark}<span>加入错题本</span></button>` : ''}
              </span>
            </div>
            ${kwChips ? `<div class="rps-topic-row" style="margin:4px 0 6px;">${kwChips}</div>` : ''}
            <div>${escHtml(st.explain)}</div>
          </div>
        `;
      }

      return `
        <div class="rps-q-item ${isWrong ? 'is-wrong-card' : ''}" id="rps-q-matching-${st.num}">
          <div class="rps-q-stem"><span class="rps-q-num">Q${st.num}</span>${escHtml(st.text)}</div>
          <div class="rps-match-picks">${picksHtml}</div>
          ${expHtml}
        </div>
      `;
    }).join('');

    return `
      <div class="rps-card">
        <div class="rps-card-head">
          <h3 class="rps-card-title">${SVG.book} Part III Section B 长篇阅读匹配 — ${escHtml(mt.passageTitle)}</h3>
          <span class="rps-sticker">Q36–Q45 · 71 分</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px;">${jumpBtns}</div>
        <div class="rps-match-paras" id="rps-match-scroll">${parasHtml}</div>
        <div style="font-weight:900;font-size:14px;margin-bottom:10px;">10 道信息匹配题（先抓定位词，再点选对应段落字母）：</div>
        ${stmtsHtml || '<div class="rps-notice">长篇匹配无错题！</div>'}
        <div style="display:flex;justify-content:flex-end;margin-top:8px;">
          <button type="button" class="rps-btn rps-btn-orange" data-rps-part="careful">${SVG.arrowRight}<span>前往仔细阅读 46-55</span></button>
        </div>
      </div>
    `;
  }

  /* ---- Part III Section C: Careful Reading (Q46-55) ---- */
  function renderCarefulPart(paper, prog) {
    const isInstant = prog.mode === 'instant';
    const isGraded = prog.submitted;
    const ansMap = prog.carefulAnswers || {};

    let html = '';
    (paper.reading.careful || []).forEach(pas => {
      const qsToShow = wrongOnlyFilter
        ? pas.questions.filter(q => ansMap[q.num] && ansMap[q.num] !== q.answer)
        : pas.questions;
      if (wrongOnlyFilter && !qsToShow.length) return;

      const revealedQuotes = pas.questions
        .filter(q => (isInstant && Boolean(ansMap[q.num])) || isGraded)
        .map(q => q.evidenceQuote);

      const parasHtml = pas.paragraphs.map((pt, pi) =>
        `<p><strong style="font-family:var(--rps-num);font-size:12px;margin-right:6px;color:var(--rps-muted);">[P${pi + 1}]</strong>${highlightEvidenceInPara(pt, revealedQuotes)}</p>`
      ).join('');

      const qsHtml = qsToShow.map(q => {
        const pick = ansMap[q.num] || '';
        const revealed = (isInstant && Boolean(pick)) || isGraded;
        const isWrong = revealed && pick && pick !== q.answer;

        const optsHtml = q.options.map((opt, oi) => {
          const code = String.fromCharCode(65 + oi);
          let cls = 'rps-opt-btn';
          if (revealed) {
            if (code === q.answer) cls += ' is-correct';
            else if (code === pick) cls += ' is-wrong';
          } else if (code === pick) {
            cls += ' is-selected';
          }
          return `<button type="button" class="${cls}" data-rps-careful-opt="${q.num}:${code}">${escHtml(opt)}</button>`;
        }).join('');

        let expHtml = '';
        if (revealed) {
          const ok = pick === q.answer;
          expHtml = `
            <div class="rps-explain">
              <div class="rps-explain-top">
                <span>${ok ? '<span class="rps-badge-ok">精准命中</span>' : `<span class="rps-badge-err">${pick ? `答错（你选 ${pick}）` : '未作答'}</span>`} 正确答案：<strong>${q.answer}</strong> <span class="rps-trap-pill">防坑：${escHtml(q.trapType)}</span></span>
                ${!ok ? `<button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-add-wrong="careful:${q.num}">${SVG.bookmark}<span>加入错题本</span></button>` : ''}
              </div>
              <div class="rps-quote">原文证据句：${escHtml(q.evidenceQuote)}</div>
              <div>${escHtml(q.explain)}</div>
            </div>
          `;
        }

        return `
          <div class="rps-q-item ${isWrong ? 'is-wrong-card' : ''}" id="rps-q-careful-${q.num}">
            <div class="rps-q-stem"><span class="rps-q-num">Q${q.num}</span>${escHtml(q.stem)}</div>
            <div class="rps-opt-list">${optsHtml}</div>
            ${expHtml}
          </div>
        `;
      }).join('');

      html += `
        <div class="rps-card">
          <div class="rps-card-head">
            <h3 class="rps-card-title">${SVG.book} ${escHtml(pas.label)} — ${escHtml(pas.title)}</h3>
            <span class="rps-sticker rps-sticker-orange">每题 14.2 分 · 提分大头</span>
          </div>
          <div class="rps-en-prose" style="padding:14px;background:var(--rps-paper);border:1px solid var(--rps-border);border-radius:9px;margin-bottom:14px;">
            ${parasHtml}
          </div>
          ${qsHtml}
        </div>
      `;
    });

    html += `<div style="display:flex;justify-content:flex-end;margin-bottom:12px;"><button type="button" class="rps-btn rps-btn-orange" data-rps-part="translation">${SVG.arrowRight}<span>前往 Part IV 段落汉译英</span></button></div>`;
    return html;
  }

  /* ---- Part IV: Translation ---- */
  function renderTranslationPart(paper, prog) {
    const tr = paper.translation;
    const wc = countWordsSimple(prog.translationText || '');
    const g = prog.translationGrade;

    let gradeHtml = '';
    if (g) {
      const hitChips = (g.matchedExprs || []).map(e => `<span class="rps-topic-tag" style="background:var(--rps-mint-soft)">${escHtml(e)}</span>`).join('');
      const missChips = (g.missedExprs || []).map(e => `<span class="rps-topic-tag" style="background:var(--rps-coral-soft)">${escHtml(e)}</span>`).join('');
      const notes = [].concat(g.grammarNotes || [], g.suggestions || []).slice(0, 6).map(n => `<li style="margin-bottom:4px;">${escHtml(n)}</li>`).join('');
      gradeHtml = `
        <div class="rps-grade-panel">
          <div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px;">
            <div><span class="rps-score-big">${g.score} / 15</span> <strong style="margin-left:6px;">${escHtml(g.bandLabel || '')}</strong></div>
            <span class="rps-sticker">${g.wordCount} 词 · 折合 ${Math.round((g.score / 15) * 106.5 * 10) / 10} / 106.5 分</span>
          </div>
          <p style="margin:8px 0;font-size:13.5px;font-weight:700;">${escHtml(g.feedback || '')}</p>
          ${hitChips ? `<div style="font-size:12px;font-weight:800;margin-bottom:4px;">已命中核心采分词组：</div><div class="rps-topic-row">${hitChips}</div>` : ''}
          ${missChips ? `<div style="font-size:12px;font-weight:800;margin-bottom:4px;">建议补充采分词组：</div><div class="rps-topic-row">${missChips}</div>` : ''}
          ${notes ? `<ul style="margin:8px 0 0 18px;padding:0;font-size:12.5px;line-height:1.55;">${notes}</ul>` : ''}
        </div>
      `;
    }

    const bdHtml = (tr.sentenceBreakdown || []).map((b, i) => `
      <div class="rps-breakdown-item">
        <div><strong>第 ${i + 1} 句：</strong>${escHtml(b.zh)}</div>
        <div style="font-size:12px;color:var(--rps-muted);margin:3px 0;">主干：<code>${escHtml(b.core)}</code> ｜ 修饰重组：${escHtml(b.modifier)}</div>
        <div class="rps-en-prose" style="font-size:14px;">${escHtml(b.en)}</div>
      </div>
    `).join('');

    return `
      <div class="rps-card">
        <div class="rps-card-head">
          <h3 class="rps-card-title">${SVG.pen} Part IV Translation — ${escHtml(tr.title)}</h3>
          <span class="rps-sticker">30 分钟 · 106.5 分</span>
        </div>
        <div style="padding:14px;background:var(--rps-paper);border:1px solid var(--rps-border);border-radius:9px;font-size:15px;line-height:1.78;margin-bottom:12px;">
          ${escHtml(tr.chineseText)}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:12.5px;font-weight:800;">
          <span>英文译文作答区（先提主干，再后置定语/分词）</span>
          <span id="rps-trans-wc" class="rps-sticker">已写 ${wc} 词</span>
        </div>
        <textarea class="rps-textarea" id="rps-trans-input" placeholder="在这里输入你的英文译文（自动存盘）...">${escHtml(prog.translationText || '')}</textarea>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
          <button type="button" class="rps-btn rps-btn-orange" data-rps-grade-trans="1">${SVG.check}<span>智能翻译评分</span></button>
          <button type="button" class="rps-btn rps-btn-ghost" data-rps-toggle-tmodel="1">${SVG.book}<span>${showModelTrans ? '收起参考译文与拆句' : '参考译文与逐句拆解'}</span></button>
          <button type="button" class="rps-btn rps-btn-marigold" data-rps-grade-paper="1">${SVG.chart}<span>完成全卷并生成710分诊断报告</span></button>
        </div>
        ${gradeHtml}
        ${showModelTrans ? `
          <div class="rps-grade-panel" style="background:var(--rps-surface);">
            <div style="font-weight:900;font-size:14px;margin-bottom:8px;">高分参考译文：</div>
            <div class="rps-en-prose" style="margin-bottom:12px;">${escHtml(tr.referenceTranslation)}</div>
            <div style="font-weight:900;font-size:13.5px;margin-bottom:8px;">逐句拆句重组精讲：</div>
            ${bdHtml}
          </div>
        ` : ''}
      </div>
    `;
  }

  /* -------------------- View 3: 710-Scale Smart Diagnostic Report -------------------- */
  function renderReportHtml(paper, prog) {
    const rep = computePaperReport(paper, prog);
    const weak1 = rep.weakest[0];
    const weak2 = rep.weakest[1];

    const barsHtml = rep.skills.map(s => {
      const cls = s.pct >= 70 ? '' : (s.pct >= 50 ? 'is-warn' : 'is-weak');
      const rightTxt = s.skipped
        ? '未作答（读写译已等比折算）'
        : `${s.pts} / ${s.maxPts} 分（${s.detail} · ${s.pct}%）`;
      return `
        <div class="rps-bar-row">
          <div class="rps-bar-head">
            <span>${escHtml(s.label)}</span>
            <span style="font-family:var(--rps-num);">${rightTxt}</span>
          </div>
          <div class="rps-bar-track"><div class="rps-bar-fill ${cls}" style="width:${s.skipped ? 0 : Math.min(100, s.pct)}%"></div></div>
        </div>
      `;
    }).join('');

    const weakSummary = weak1
      ? `本卷暴露的首要提分突破口是 <strong>${escHtml(weak1.label)}</strong>（得分率 ${weak1.pct}%）${weak2 ? `，其次是 <strong>${escHtml(weak2.label)}</strong>（得分率 ${weak2.pct}%）` : ''}。先回精讲吃透套路，再二刷错题提分最快！`
      : '各板块表现非常均衡，继续保持真题手感即可稳过四级！';

    return `
      <div class="rps-studio-bar">
        <div class="rps-studio-left">
          <button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-back="paper">${SVG.back}<span>返回试卷</span></button>
          <button type="button" class="rps-btn rps-btn-sm rps-btn-ghost" data-rps-back="lobby">${SVG.archive}<span>档案室</span></button>
          <span class="rps-stamp">${escHtml(paper.stamp)}</span>
          <span class="rps-studio-title">710分制智能真题诊断报告</span>
        </div>
      </div>

      <div class="rps-report-hero">
        <div class="rps-total-box">
          <div style="font-size:12px;font-weight:900;letter-spacing:0.04em;margin-bottom:6px;">
            ${rep.listeningSkipped ? '读写译等比预估 710 总分' : '官方权重折算 710 总分'}
          </div>
          <div class="rps-total-num">${rep.estTotal710}<span style="font-size:18px;margin-left:4px;">/ 710</span></div>
          <div style="margin-top:10px;font-size:13px;font-weight:800;">
            ${rep.passed425 ? '已越过 425 分四级过线基准！继续冲刺 500+ 高分档！' : '距离 425 过线还差 ' + Math.max(1, 425 - rep.estTotal710) + ' 分，按下方最弱项定向提分最有效。'}
          </div>
          <div style="margin-top:8px;font-size:12px;font-weight:700;">
            ${rep.listeningSkipped
              ? `读写译实得 ${rep.rwtPts} / 461.5 分 · 客观题命中 ${rep.objCorrect}/${rep.objAnswered}（${rep.objAccPct}%）`
              : `全卷实得 ${rep.rawTotal} / 710 分 · 客观题命中 ${rep.objCorrect}/${rep.objAnswered}（${rep.objAccPct}%）`}
          </div>
        </div>
        <div>
          <div style="font-weight:900;font-size:14.5px;margin-bottom:10px;">官方六大板块分值拆解（听力 248.5 · 阅读 248.5 · 译写 213）</div>
          ${barsHtml}
        </div>
      </div>

      <div class="rps-card">
        <div class="rps-card-head">
          <h3 class="rps-card-title">小克智能薄弱项处方与错题攻坚</h3>
          <span class="rps-sticker ${rep.wrongItems.length ? 'rps-sticker-orange' : 'rps-sticker-mint'}">本卷错题 ${rep.wrongItems.length} 道</span>
        </div>
        <p style="margin:0 0 12px;font-size:13.5px;line-height:1.65;">${weakSummary}</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${weak1 ? `<button type="button" class="rps-btn rps-btn-orange" data-rps-jump-sec="${escHtml(weak1.sectionId)}">${SVG.book}<span>直达最弱项破题精讲（${escHtml(weak1.label)}）</span></button>` : ''}
          ${rep.wrongItems.length ? `<button type="button" class="rps-btn rps-btn-marigold" data-rps-review-wrong="1">${SVG.check}<span>复盘本卷全部错题 (${rep.wrongItems.length})</span></button>` : ''}
          ${rep.wrongItems.length ? `<button type="button" class="rps-btn rps-btn-mint" data-rps-sync-wrong="1">${SVG.bookmark}<span>一键同步错题本</span></button>` : ''}
        </div>
      </div>
    `;
  }

  /* -------------------- Render & Event Delegation -------------------- */
  function render() {
    if (!hostEl) return;
    const isMob = Boolean(opts.isMobile || (typeof window !== 'undefined' && window.innerWidth <= 760));
    let inner = '';
    if (view === 'lobby') {
      inner = renderLobbyHtml();
    } else {
      const paper = getActivePaper();
      if (!paper) {
        view = 'lobby';
        inner = renderLobbyHtml();
      } else {
        const prog = loadPaperProgress(storageKey(), paper.id);
        inner = view === 'report' ? renderReportHtml(paper, prog) : renderPaperShellHtml(paper, prog);
      }
    }
    hostEl.innerHTML = `<div class="rps-root ${isMob ? 'is-mobile' : ''}">${inner}</div>`;
    bindDynamicInputs();
  }

  function bindDynamicInputs() {
    if (!hostEl) return;
    const paper = getActivePaper();
    if (!paper) return;

    const wInput = hostEl.querySelector('#rps-write-input');
    if (wInput) {
      wInput.oninput = () => {
        const prog = loadPaperProgress(storageKey(), paper.id);
        prog.writingText = wInput.value;
        savePaperProgress(storageKey(), paper.id, prog);
        const wcEl = hostEl.querySelector('#rps-write-wc');
        if (wcEl) {
          const wc = countWordsSimple(wInput.value);
          wcEl.textContent = `当前 ${wc} 词（目标 ${paper.writing.wordRange[0]}–${paper.writing.wordRange[1]}）`;
          wcEl.className = 'rps-sticker ' + (wc >= paper.writing.wordRange[0] && wc <= paper.writing.wordRange[1] ? 'rps-sticker-mint' : '');
        }
      };
    }

    const tInput = hostEl.querySelector('#rps-trans-input');
    if (tInput) {
      tInput.oninput = () => {
        const prog = loadPaperProgress(storageKey(), paper.id);
        prog.translationText = tInput.value;
        savePaperProgress(storageKey(), paper.id, prog);
        const wcEl = hostEl.querySelector('#rps-trans-wc');
        if (wcEl) wcEl.textContent = `已写 ${countWordsSimple(tInput.value)} 词`;
      };
    }

    const mp3Input = hostEl.querySelector('#rps-local-mp3-input');
    if (mp3Input) {
      mp3Input.onchange = () => {
        const file = mp3Input.files && mp3Input.files[0];
        if (!file || typeof URL === 'undefined') return;
        if (localAudioUrl) {
          try { URL.revokeObjectURL(localAudioUrl); } catch (_e) { /* ignore */ }
        }
        localAudioUrl = URL.createObjectURL(file);
        localAudioName = file.name;
        render();
      };
    }
  }

  function findListeningGroup(paper, groupId) {
    if (!paper || !paper.listening) return null;
    for (const sec of paper.listening.sections || []) {
      for (const g of sec.groups || []) {
        if (g.groupId === groupId) return g;
      }
    }
    return null;
  }

  function startGroupAudio(paper, groupId, startIndex) {
    const sp = getSpeech();
    const g = findListeningGroup(paper, groupId);
    if (!g || !g.scriptTurns || !g.scriptTurns.length) return;
    if (!sp || typeof sp.playListeningScript !== 'function') {
      showToast('当前环境暂不支持 Web Speech 语音朗读');
      return;
    }
    stopAudioAndTimers();
    speakingGroupId = groupId;
    speakingTurnIdx = startIndex || 0;
    fireXiaoKe('listening', {
      paperId: paper.id,
      groupId,
      title: g.title,
      message: `正在播放 ${g.label}（${g.title}），紧盯转折信号词与同义替换！`
    });
    activeSpeechCtrl = sp.playListeningScript(g.scriptTurns, {
      rate: speechRate,
      startIndex: startIndex || 0,
      onTurnStart: idx => {
        speakingTurnIdx = idx;
        render();
      },
      onStateChange: st => {
        if (st.state === 'finished' || st.state === 'stopped') {
          speakingTurnIdx = -1;
        }
        render();
      }
    });
    render();
  }

  function handleClick(ev) {
    if (!hostEl) return;
    const btn = ev.target && ev.target.closest ? ev.target.closest('button, [data-rps-open], [data-rps-jump-turn]') : null;
    if (!btn || !hostEl.contains(btn)) return;

    // Lobby filter
    if (btn.dataset.rpsFilter) {
      lobbyFilter = btn.dataset.rpsFilter;
      render();
      return;
    }

    // Open paper
    if (btn.dataset.rpsOpen) {
      stopAudioAndTimers();
      activePaperId = btn.dataset.rpsOpen;
      const paper = getActivePaper();
      if (!paper) return;
      const prog = loadPaperProgress(storageKey(), paper.id);
      if (!prog.activePart) prog.activePart = paper.hasListeningScript ? 'listening' : 'cloze';
      savePaperProgress(storageKey(), paper.id, prog);
      wrongOnlyFilter = false;
      view = 'paper';
      fireXiaoKe('start', {
        paperId: paper.id,
        title: paper.title,
        message: `已进入 ${paper.title}，按节奏稳扎稳打拿高分！`
      });
      render();
      return;
    }

    // Open report from lobby
    if (btn.dataset.rpsReport) {
      stopAudioAndTimers();
      activePaperId = btn.dataset.rpsReport;
      view = 'report';
      render();
      return;
    }

    // Reset progress
    if (btn.dataset.rpsReset) {
      const pid = btn.dataset.rpsReset;
      if (btn.dataset.rpsConfirm !== '1') {
        btn.dataset.rpsConfirm = '1';
        btn.textContent = '再点确认重置';
        btn.classList.add('rps-btn-coral');
        return;
      }
      resetPaperProgress(storageKey(), pid);
      showToast('已重置该套真题作答进度');
      render();
      return;
    }

    // Back navigation
    if (btn.dataset.rpsBack) {
      stopAudioAndTimers();
      view = btn.dataset.rpsBack;
      render();
      return;
    }

    const paper = getActivePaper();
    if (!paper) return;
    const prog = loadPaperProgress(storageKey(), paper.id);

    // Switch mode (instant / full)
    if (btn.dataset.rpsMode) {
      prog.mode = btn.dataset.rpsMode;
      if (prog.mode === 'full') prog.submitted = false;
      savePaperProgress(storageKey(), paper.id, prog);
      showToast(prog.mode === 'instant' ? '已切换至【即时精刷模式】：做一题立刻看定位解析' : '已切换至【整套连刷模式】：顺畅作答后一键 710 分阅卷');
      render();
      return;
    }

    // Switch Part tab
    if (btn.dataset.rpsPart) {
      stopAudioAndTimers();
      prog.activePart = btn.dataset.rpsPart;
      savePaperProgress(storageKey(), paper.id, prog);
      render();
      return;
    }

    // Toggle Answer Sheet
    if (btn.dataset.rpsToggleSheet) {
      showSheet = !showSheet;
      render();
      return;
    }

    // Jump from Answer Sheet
    if (btn.dataset.rpsJump) {
      const [partId, qStr] = btn.dataset.rpsJump.split(':');
      stopAudioAndTimers();
      prog.activePart = partId;
      if (partId === 'cloze' && Number(qStr) >= 26) focusedBlank = Number(qStr);
      savePaperProgress(storageKey(), paper.id, prog);
      render();
      if (Number(qStr) > 0 && typeof document !== 'undefined') {
        const target = document.getElementById(`rps-q-${partId}-${qStr}`);
        if (target && typeof target.scrollIntoView === 'function') {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    // Wrong-only toggle
    if (btn.dataset.rpsWrongOnly) {
      wrongOnlyFilter = !wrongOnlyFilter;
      render();
      return;
    }

    // Grade full paper -> open 710 report
    if (btn.dataset.rpsGradePaper) {
      stopAudioAndTimers();
      const grader = getGrader();
      if (grader && prog.writingText && prog.writingText.trim()) {
        prog.writingGrade = grader.gradeWriting(paper.writing, prog.writingText);
      }
      if (grader && prog.translationText && prog.translationText.trim()) {
        prog.translationGrade = grader.gradeTranslation(paper.translation, prog.translationText);
      }
      prog.submitted = true;
      prog.clozeChecked = true;
      const rep = computePaperReport(paper, prog);
      prog.lastEstScore = rep.estTotal710;
      prog.bestEstScore = Math.max(prog.bestEstScore || 0, rep.estTotal710);
      savePaperProgress(storageKey(), paper.id, prog);
      view = 'report';
      fireXiaoKe('report', {
        paperId: paper.id,
        score: rep.estTotal710,
        passed: rep.passed425,
        weakest: rep.weakest,
        message: rep.passed425
          ? `整卷折算 ${rep.estTotal710}/710（已达 425 及格线），继续冲刺高分！`
          : `整卷折算 ${rep.estTotal710}/710，已为你定位最弱项，点击直达破题精讲！`
      });
      if (rep.passed425) fireFireworks(ev);
      render();
      return;
    }

    // Writing actions
    if (btn.dataset.rpsInsertPat != null) {
      const pat = (paper.writing.transferablePatterns || [])[Number(btn.dataset.rpsInsertPat)];
      if (pat) {
        prog.writingText = (prog.writingText ? prog.writingText.trimEnd() + '\n' : '') + pat;
        savePaperProgress(storageKey(), paper.id, prog);
        render();
      }
      return;
    }
    if (btn.dataset.rpsGradeWriting) {
      const grader = getGrader();
      if (!grader) return;
      prog.writingGrade = grader.gradeWriting(paper.writing, prog.writingText || '');
      savePaperProgress(storageKey(), paper.id, prog);
      if (prog.writingGrade.passed) fireFireworks(ev);
      fireXiaoKe(prog.writingGrade.passed ? 'correct' : 'wrong', { skill: 'writing', score: prog.writingGrade.score });
      render();
      return;
    }
    if (btn.dataset.rpsToggleWmodel) {
      showModelWriting = !showModelWriting;
      render();
      return;
    }

    // Listening audio & preread actions
    if (btn.dataset.rpsPlayGroup) {
      const gid = btn.dataset.rpsPlayGroup;
      if (speakingGroupId === gid && activeSpeechCtrl) {
        const st = activeSpeechCtrl.getState().state;
        if (st === 'playing') { activeSpeechCtrl.pause(); render(); return; }
        if (st === 'paused') { activeSpeechCtrl.resume(); render(); return; }
      }
      startGroupAudio(paper, gid, 0);
      return;
    }
    if (btn.dataset.rpsReplayGroup) {
      startGroupAudio(paper, btn.dataset.rpsReplayGroup, 0);
      return;
    }
    if (btn.dataset.rpsRate) {
      speechRate = Number(btn.dataset.rpsRate) || 1.0;
      if (activeSpeechCtrl && typeof activeSpeechCtrl.setRate === 'function') {
        activeSpeechCtrl.setRate(speechRate);
      }
      render();
      return;
    }
    if (btn.dataset.rpsToggleScript) {
      const gid = btn.dataset.rpsToggleScript;
      revealedTranscripts[gid] = !revealedTranscripts[gid];
      render();
      return;
    }
    if (btn.dataset.rpsJumpTurn) {
      const [gid, idxStr] = btn.dataset.rpsJumpTurn.split(':');
      startGroupAudio(paper, gid, Number(idxStr) || 0);
      return;
    }
    if (btn.dataset.rpsPreread) {
      const gid = btn.dataset.rpsPreread;
      if (prereadGroupId === gid && prereadTimerId) {
        clearInterval(prereadTimerId);
        prereadTimerId = null;
        prereadGroupId = null;
        prereadLeft = 0;
        render();
        return;
      }
      if (prereadTimerId) clearInterval(prereadTimerId);
      prereadGroupId = gid;
      prereadLeft = 15;
      prereadTimerId = setInterval(() => {
        prereadLeft -= 1;
        if (prereadLeft <= 0) {
          clearInterval(prereadTimerId);
          prereadTimerId = null;
          prereadGroupId = null;
          prereadLeft = 0;
          if (paper.hasListeningScript) {
            startGroupAudio(paper, gid, 0);
            return;
          }
          showToast('15 秒预读结束，开始专注作答！');
        }
        render();
      }, 1000);
      render();
      return;
    }
    if (btn.dataset.rpsReadOpts) {
      const sp = getSpeech();
      const g = findListeningGroup(paper, btn.dataset.rpsReadOpts);
      if (sp && g) {
        const lines = [];
        g.questions.forEach(q => {
          lines.push({ speaker: 'Narrator', text: `Question ${q.num}. ${q.options.join('. ')}` });
        });
        sp.playListeningScript(lines, { rate: speechRate });
        showToast(`正在朗读 Q${g.qNums[0]}–Q${g.qNums[g.qNums.length - 1]} 选项，边听边扫读关键词`);
      }
      return;
    }

    // Listening option click
    if (btn.dataset.rpsLisOpt) {
      const [qStr, code] = btn.dataset.rpsLisOpt.split(':');
      const qnum = Number(qStr);
      const found = getAllListeningQs(paper).find(x => x.q.num === qnum);
      if (!found) return;
      if (prog.mode === 'instant' && prog.listeningAnswers[qnum]) return;
      prog.listeningAnswers[qnum] = code;
      savePaperProgress(storageKey(), paper.id, prog);
      if (prog.mode === 'instant') {
        const ok = code === found.q.answer;
        if (ok) fireFireworks(ev);
        fireXiaoKe(ok ? 'correct' : 'wrong', { skill: 'listening', num: qnum, paperId: paper.id });
      }
      render();
      return;
    }

    // Cloze interactions
    if (btn.dataset.rpsClozeSlot) {
      const num = Number(btn.dataset.rpsClozeSlot);
      if (focusedBlank === num && prog.clozeAnswers[num] && !(prog.mode === 'instant' && prog.clozeChecked) && !prog.submitted) {
        delete prog.clozeAnswers[num];
        savePaperProgress(storageKey(), paper.id, prog);
      } else {
        focusedBlank = num;
      }
      render();
      return;
    }
    if (btn.dataset.rpsWbCode) {
      if ((prog.mode === 'instant' && prog.clozeChecked) || prog.submitted) return;
      const code = btn.dataset.rpsWbCode;
      // Remove code from any other blank first (15-choose-10 no reuse)
      Object.keys(prog.clozeAnswers).forEach(k => {
        if (prog.clozeAnswers[k] === code) delete prog.clozeAnswers[k];
      });
      prog.clozeAnswers[focusedBlank] = code;
      // Auto-advance to next empty blank
      const nextEmpty = paper.reading.cloze.qNums.find(n => n > focusedBlank && !prog.clozeAnswers[n])
        || paper.reading.cloze.qNums.find(n => !prog.clozeAnswers[n]);
      if (nextEmpty) focusedBlank = nextEmpty;
      savePaperProgress(storageKey(), paper.id, prog);
      render();
      return;
    }
    if (btn.dataset.rpsCheckCloze) {
      prog.clozeChecked = !prog.clozeChecked;
      savePaperProgress(storageKey(), paper.id, prog);
      if (prog.clozeChecked) {
        const okCnt = paper.reading.cloze.blanks.filter(b => prog.clozeAnswers[b.num] === b.answer).length;
        if (okCnt >= 7) fireFireworks(ev);
        fireXiaoKe(okCnt >= 6 ? 'correct' : 'wrong', { skill: 'cloze', correctCount: okCnt });
      }
      render();
      return;
    }
    if (btn.dataset.rpsClearCloze) {
      prog.clozeAnswers = {};
      prog.clozeChecked = false;
      focusedBlank = 26;
      savePaperProgress(storageKey(), paper.id, prog);
      render();
      return;
    }

    // Matching interactions
    if (btn.dataset.rpsScrollPara) {
      expandedMatchPara = btn.dataset.rpsScrollPara;
      render();
      if (typeof document !== 'undefined') {
        const el = document.getElementById(`rps-mpara-${expandedMatchPara}`);
        if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      return;
    }
    if (btn.dataset.rpsMatchPick) {
      const [qStr, lb] = btn.dataset.rpsMatchPick.split(':');
      const qnum = Number(qStr);
      const st = paper.reading.matching.statements.find(s => s.num === qnum);
      if (!st) return;
      if (prog.mode === 'instant' && prog.matchingAnswers[qnum]) return;
      prog.matchingAnswers[qnum] = lb;
      savePaperProgress(storageKey(), paper.id, prog);
      if (prog.mode === 'instant') {
        const ok = lb === st.answer;
        if (ok) fireFireworks(ev);
        fireXiaoKe(ok ? 'correct' : 'wrong', { skill: 'matching', num: qnum, paperId: paper.id });
      }
      render();
      return;
    }

    // Careful Reading interactions
    if (btn.dataset.rpsCarefulOpt) {
      const [qStr, code] = btn.dataset.rpsCarefulOpt.split(':');
      const qnum = Number(qStr);
      const found = getAllCarefulQs(paper).find(x => x.q.num === qnum);
      if (!found) return;
      if (prog.mode === 'instant' && prog.carefulAnswers[qnum]) return;
      prog.carefulAnswers[qnum] = code;
      savePaperProgress(storageKey(), paper.id, prog);
      if (prog.mode === 'instant') {
        const ok = code === found.q.answer;
        if (ok) fireFireworks(ev);
        fireXiaoKe(ok ? 'correct' : 'wrong', { skill: 'reading', num: qnum, paperId: paper.id });
      }
      render();
      return;
    }

    // Translation actions
    if (btn.dataset.rpsGradeTrans) {
      const grader = getGrader();
      if (!grader) return;
      prog.translationGrade = grader.gradeTranslation(paper.translation, prog.translationText || '');
      savePaperProgress(storageKey(), paper.id, prog);
      if (prog.translationGrade.passed) fireFireworks(ev);
      fireXiaoKe(prog.translationGrade.passed ? 'correct' : 'wrong', { skill: 'translation', score: prog.translationGrade.score });
      render();
      return;
    }
    if (btn.dataset.rpsToggleTmodel) {
      showModelTrans = !showModelTrans;
      render();
      return;
    }

    // Report actions & single wrong sync
    if (btn.dataset.rpsJumpSec) {
      if (opts && typeof opts.onJumpSection === 'function') {
        stopAudioAndTimers();
        opts.onJumpSection(btn.dataset.rpsJumpSec);
      } else {
        showToast('已定位最弱项精讲章节：' + btn.dataset.rpsJumpSec);
      }
      return;
    }
    if (btn.dataset.rpsReviewWrong) {
      wrongOnlyFilter = true;
      view = 'paper';
      render();
      return;
    }
    if (btn.dataset.rpsSyncWrong) {
      const rep = computePaperReport(paper, prog);
      if (opts && typeof opts.onAddWrongItems === 'function') {
        opts.onAddWrongItems(rep.wrongItems);
      } else {
        persistWrongItemsFallback(storageKey(), rep.wrongItems);
      }
      showToast(`已将本卷 ${rep.wrongItems.length} 道错题同步至错题本！`);
      return;
    }
    if (btn.dataset.rpsAddWrong) {
      const [sk, nStr] = btn.dataset.rpsAddWrong.split(':');
      const num = Number(nStr);
      const rep = computePaperReport(paper, prog);
      const item = rep.wrongItems.find(w => w.num === num && (w.skill === sk || (sk === 'careful' && w.skill === 'careful')));
      if (item) {
        if (opts && typeof opts.onAddWrongItems === 'function') {
          opts.onAddWrongItems([item]);
        } else {
          persistWrongItemsFallback(storageKey(), [item]);
        }
      }
      showToast(`第 ${num} 题已加入错题攻坚本！`);
      return;
    }
  }

  function mount(containerEl, userOpts) {
    unmount();
    hostEl = containerEl || null;
    opts = Object.assign({ isMobile: false, storageKey: DEFAULT_STORAGE_KEY }, userOpts || {});
    injectStyles();
    if (hostEl) {
      hostEl.addEventListener('click', handleClick);
      render();
    }
    return RealPaperStudio;
  }

  function unmount() {
    stopAudioAndTimers();
    if (localAudioUrl && typeof URL !== 'undefined') {
      try { URL.revokeObjectURL(localAudioUrl); } catch (_e) { /* ignore */ }
      localAudioUrl = null;
      localAudioName = '';
    }
    if (hostEl) {
      hostEl.removeEventListener('click', handleClick);
      hostEl.innerHTML = '';
      hostEl = null;
    }
    view = 'lobby';
    activePaperId = null;
    wrongOnlyFilter = false;
    showSheet = false;
    revealedTranscripts = {};
    showModelWriting = false;
    showModelTrans = false;
    expandedMatchPara = null;
  }

  const RealPaperStudio = {
    mount,
    unmount,
    getSummaryStats,
    computePaperReport
  };

  if (typeof global !== 'undefined' && global) {
    global.RealPaperStudio = RealPaperStudio;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealPaperStudio;
  }
})(typeof window !== 'undefined' ? window : globalThis);
