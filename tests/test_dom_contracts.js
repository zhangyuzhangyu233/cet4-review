'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const PARENT_DIR = path.dirname(ROOT);
const SRC = path.join(ROOT, 'src');

const PC_HTML_PATH = path.join(ROOT, 'index.html');
const MOBILE_HTML_PATH = path.join(ROOT, 'mobile.html');
const PC_SYNC_PATH = path.join(PARENT_DIR, '四级冲刺_小克伴学复习与高频带背.html');
const MOBILE_SYNC_PATH = path.join(PARENT_DIR, '四级冲刺_手机专属版.html');

const SHARED_STORE_KEY = 'cet4_xiaoke_sprint_v1';
const SHARED_PERSIST_KEYS = [
  'answers',
  'favorites',
  'studiedSections',
  'sprintDaysDone',
  'vocabProgress',
  'vocabDay',
  'streak',
  'theme'
];
const EXPECTED_SPRITES = [
  '01_idle_smile',
  '02_study_reading',
  '03_thinking_hint',
  '04_cheer_correct',
  '05_encourage_wrong',
  '06_writing_quill',
  '07_listening_audio',
  '08_sleepy_rest',
  '09_proud_streak',
  '10_eureka_tip'
];
const EXPECTED_REAL_PAPER_IDS = [
  'cet4_2026_06_set1',
  'cet4_2026_06_set2',
  'cet4_2025_12_set1',
  'cet4_2024_06_set1',
  'cet4_2023_06_set1',
  'cet4_2023_06_set2'
];

const EXPECTED_PC_ZINE_IDS = [
  'brand-home',
  'brand-xiaoke-img',
  'nav-knowledge-badge',
  'nav-vocab-badge',
  'nav-practice-badge',
  'nav-mastery-badge',
  'nav-notebook-badge',
  'top-sprint-badge',
  'rail-day-val',
  'rail-vocab-meter',
  'rail-vocab-val',
  'theme-toggle',
  'go-mobile-ver',
  'cta-start-vocab',
  'cta-start-realpaper',
  'cta-start-listen',
  'cta-start-practice',
  'hero-sprint-pct',
  'hero-sprint-fill',
  'hero-speech',
  'hero-mascot-img',
  'xiaoke-ribbon-strip',
  'sprint-roadmap-grid',
  'zine-directory-grid',
  'zine-lesson-switcher',
  'section-reader-host',
  'vocab-host',
  'practice-host',
  'mastery-host',
  'notebook-host',
  'anim-lightbox',
  'lightbox-title',
  'lightbox-caption',
  'lightbox-close',
  'lightbox-body',
  'fx-fireworks-canvas',
  'xiaoke-dock'
];

const EXPECTED_MOBILE_ZINE_IDS = [
  'm-brand-img',
  'm-switch-pc',
  'm-theme-toggle',
  'm-view-knowledge',
  'm-view-vocab',
  'm-view-practice',
  'm-view-mastery',
  'm-view-notebook',
  'm-tab-vocab',
  'm-tab-pct',
  'm-tab-nb',
  'm-sheet-mask',
  'm-sheet-title',
  'm-sheet-close',
  'm-sheet-body',
  'anim-lightbox',
  'lightbox-title',
  'lightbox-caption',
  'lightbox-close',
  'lightbox-body',
  'xiaoke-dock',
  'fx-fireworks-canvas'
];

const RE_EMOJI = /[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/u;
const RE_BARE_MONO = /(?<!-)\bmonospace\b/;
const RE_SIMSUN = /SimSun|宋体/i;
const RE_MOCK_EXAM = /模拟考|模拟卷|mockExam|practiceSub[^\n]{0,40}mock|data-psub=["']mock["']|data-view=["']mock["']/i;
const RE_BACKDROP_FILTER = /backdrop-filter\s*:/i;
const RE_FILTER_BLUR = /filter\s*:[^;}\n]*blur\s*\(/i;
const RE_EMPTY_IMG_SRC = /<img\b[^>]*\bsrc\s*=\s*["']\s*["']/i;

let passed = 0;
const failures = [];

function check(cond, msg) {
  if (cond) {
    passed += 1;
  } else {
    failures.push(msg);
  }
}

function stripScriptAndStyle(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
}

function extractInlineScripts(html) {
  const scripts = [];
  const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (m[1].trim()) scripts.push(m[1]);
  }
  return scripts;
}

function findNeoBrutalistArtifacts(text) {
  const hits = [];
  const thickInkRe = /\b(?:2\.5|3)px\s+solid\s+#1a1410\b/gi;
  let m;
  while ((m = thickInkRe.exec(text)) !== null) {
    hits.push(`thick ink border: ${m[0]}`);
  }
  const hardOffsetRe = /box-shadow\s*:\s*(?:[3-9]px\s+){2}0\b/gi;
  while ((m = hardOffsetRe.exec(text)) !== null) {
    hits.push(`hard offset shadow: ${m[0]}`);
  }
  return hits;
}

function checkHobonichiStyle(label, text) {
  check(!RE_BACKDROP_FILTER.test(text), `${label}: contains forbidden backdrop-filter (violates Hobonichi zero-glassmorphism rule)`);
  check(!RE_FILTER_BLUR.test(text), `${label}: contains forbidden filter: blur(...)`);
  const legacy = findNeoBrutalistArtifacts(text);
  check(
    legacy.length === 0,
    `${label}: contains ${legacy.length} leftover Neo-Brutalist border/shadow rule(s): ${legacy.slice(0, 5).join(' | ')}`
  );
}

function extractEmbeddedXiaoKePayload(html, label) {
  const scripts = extractInlineScripts(html);
  const assetBlock = scripts.find(s => s.includes('window.XIAOKE_SPRITES') && s.includes('window.XIAOKE_MANIFEST'));
  check(Boolean(assetBlock), `${label}: could not locate inline script defining window.XIAOKE_SPRITES & window.XIAOKE_MANIFEST`);
  if (!assetBlock) return { sprites: null, manifest: null };

  const sandbox = { window: {} };
  sandbox.globalThis = sandbox.window;
  try {
    vm.runInNewContext(assetBlock, sandbox, { filename: `${label}_xiaoke_assets.js` });
  } catch (err) {
    failures.push(`${label}: failed to execute embedded XiaoKe assets block: ${err.message}`);
    return { sprites: null, manifest: null };
  }
  return {
    sprites: sandbox.window.XIAOKE_SPRITES || null,
    manifest: sandbox.window.XIAOKE_MANIFEST || null
  };
}

function verifyDomContract(label, htmlPath, appJsPath, engineJsPaths, expectedViews, expectedStaticIds, expectedScriptCount) {
  check(fs.existsSync(htmlPath), `${label}: built bundle missing at ${htmlPath}`);
  if (!fs.existsSync(htmlPath)) return null;

  const html = fs.readFileSync(htmlPath, 'utf8');
  const appJs = fs.readFileSync(appJsPath, 'utf8');
  const engineJs = engineJsPaths.map(p => fs.readFileSync(p, 'utf8')).join('\n');
  const combinedJs = appJs + '\n' + engineJs;

  const sizeKb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);

  // 1. Static HTML IDs & dynamic IDs created by JS
  const staticHtml = stripScriptAndStyle(html);
  const staticIds = new Set([...staticHtml.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(m => m[1]));
  const dynIds = new Set([
    ...[...combinedJs.matchAll(/\bid\s*=\s*["']([a-zA-Z0-9_-]+)["']/g)].map(m => m[1]),
    ...[...combinedJs.matchAll(/\.id\s*=\s*["']([a-zA-Z0-9_-]+)["']/g)].map(m => m[1])
  ]);
  const dynTemplatePrefixes = new Set(
    [...combinedJs.matchAll(/\bid\s*=\s*["']([a-zA-Z0-9_-]+)\$\{/g)].map(m => m[1])
  );

  // Verify explicit Neo-Brutalist Zine required static DOM IDs
  expectedStaticIds.forEach(reqId => {
    check(staticIds.has(reqId), `${label}: missing required Neo-Brutalist Zine static DOM ID '#${reqId}'`);
  });

  // Verify RealPaperStudio integration wiring in app JS
  check(appJs.includes('real-paper-studio-host'), `${label}: ${path.basename(appJsPath)} missing '#real-paper-studio-host' mount point`);
  check(appJs.includes('RealPaperStudio'), `${label}: ${path.basename(appJsPath)} missing RealPaperStudio integration`);
  check(appJs.includes('REAL_CET4_PAPERS'), `${label}: ${path.basename(appJsPath)} missing REAL_CET4_PAPERS reference`);

  // Every static string getElementById('...') in appJs
  const byIdRefs = [...new Set([...appJs.matchAll(/getElementById\(\s*["']([^"']+)["']\s*\)/g)].map(m => m[1]))];
  check(byIdRefs.length > 0, `${label}: expected non-zero getElementById references in ${path.basename(appJsPath)}`);
  byIdRefs.forEach(id => {
    check(staticIds.has(id) || dynIds.has(id),
      `${label}: getElementById('${id}') referenced in ${path.basename(appJsPath)} not found in static HTML or dynamically created IDs`);
  });

  // Every template-literal getElementById(`prefix-${...}`) in appJs
  const tmplByIdRefs = [...new Set([...appJs.matchAll(/getElementById\(\s*`([a-zA-Z0-9_-]+)\$\{[^`]+`\s*\)/g)].map(m => m[1]))];
  tmplByIdRefs.forEach(prefix => {
    const hasStaticMatch = [...staticIds].some(sid => sid.startsWith(prefix));
    const hasDynMatch = dynTemplatePrefixes.has(prefix) || [...dynIds].some(did => did.startsWith(prefix));
    check(hasStaticMatch || hasDynMatch,
      `${label}: template getElementById(\`${prefix}\${...}\`) has no matching static or dynamic ID prefix`);
  });

  // Every querySelector / querySelectorAll ID selector (#foo) in appJs
  const qsIdRefs = [...new Set([...appJs.matchAll(/querySelector(?:All)?\(\s*["'][^"']*#([a-zA-Z0-9_-]+)/g)].map(m => m[1]))];
  qsIdRefs.forEach(id => {
    check(staticIds.has(id) || dynIds.has(id),
      `${label}: querySelector '#${id}' referenced in ${path.basename(appJsPath)} not found in static HTML or dynamically created IDs`);
  });

  // 2. Verify all 5 views + nav tab buttons exist in static HTML
  expectedViews.forEach(({ viewKey, sectionId }) => {
    check(staticIds.has(sectionId), `${label}: missing static view section #${sectionId}`);
    const navRe = new RegExp(`data-view=["']${viewKey}["']`);
    check(navRe.test(staticHtml), `${label}: missing nav button with data-view="${viewKey}"`);
  });

  // 3. Verify embedded XIAOKE_SPRITES (all 10) & XIAOKE_MANIFEST (is_dev_stub === false)
  const { sprites, manifest } = extractEmbeddedXiaoKePayload(html, label);
  if (sprites && manifest) {
    check(manifest.is_dev_stub === false,
      `${label}: embedded XIAOKE_MANIFEST.is_dev_stub expected false, got ${JSON.stringify(manifest.is_dev_stub)}`);
    check(Array.isArray(manifest.sprites) && manifest.sprites.length === 10,
      `${label}: embedded XIAOKE_MANIFEST.sprites expected 10 items`);
    EXPECTED_SPRITES.forEach(sid => {
      const uri = sprites[sid];
      check(typeof uri === 'string' && uri.startsWith('data:image/') && uri.length > 5000,
        `${label}: embedded XIAOKE_SPRITES['${sid}'] missing or invalid data URI`);
    });
  }

  // 4. Verify shared localStorage key & persisted schema keys
  check(appJs.includes(SHARED_STORE_KEY), `${label}: ${path.basename(appJsPath)} missing '${SHARED_STORE_KEY}'`);
  check(html.includes(SHARED_STORE_KEY), `${label}: bundle missing '${SHARED_STORE_KEY}'`);
  SHARED_PERSIST_KEYS.forEach(pk => {
    check(appJs.includes(pk), `${label}: ${path.basename(appJsPath)} missing shared store key '${pk}'`);
  });

  // 5. Verify ZERO mock-exam UI/strings, hygiene gates, zero empty src="", & Neo-Brutalist Zine zero-blur rules
  check(!RE_MOCK_EXAM.test(html), `${label}: bundle contains forbidden mock-exam UI/strings`);
  check(!RE_MOCK_EXAM.test(appJs), `${label}: ${path.basename(appJsPath)} contains forbidden mock-exam strings`);
  check(!RE_EMOJI.test(html), `${label}: bundle contains forbidden emoji character`);
  check(!RE_BARE_MONO.test(html), `${label}: bundle contains bare monospace font declaration`);
  check(!RE_SIMSUN.test(html), `${label}: bundle contains forbidden SimSun/宋体 font declaration`);
  check(!RE_EMPTY_IMG_SRC.test(staticHtml), `${label}: static HTML contains empty <img src="">`);
  check(!RE_EMPTY_IMG_SRC.test(appJs), `${label}: ${path.basename(appJsPath)} contains empty <img src="">`);
  checkHobonichiStyle(label, html);

  // 6. Syntax-compile every inline <script> block via vm.Script AND verify live bundled data/engine counts
  const inlineScripts = extractInlineScripts(html);
  check(
    inlineScripts.length === expectedScriptCount,
    `${label}: expected exact ${expectedScriptCount} inline <script> blocks, got ${inlineScripts.length}`
  );

  const bundleSandbox = { window: {}, console, setTimeout, clearTimeout, setInterval, clearInterval };
  bundleSandbox.globalThis = bundleSandbox.window;
  inlineScripts.forEach((code, idx) => {
    try {
      new vm.Script(code, { filename: `${label}_script_${idx + 1}.js` });
      passed += 1;
      const isRedirectScript = code.includes('location.protocol') && code.includes('location.replace');
      const isFinalAppBoot = idx === inlineScripts.length - 1;
      if (!isRedirectScript && !isFinalAppBoot) {
        vm.runInNewContext(code, bundleSandbox, { filename: `${label}_exec_${idx + 1}.js` });
      }
    } catch (err) {
      failures.push(`${label} <script #${idx + 1}> error: ${err.message}`);
    }
  });

  const bw = bundleSandbox.window;
  check(Array.isArray(bw.VOCAB_DAYS) && bw.VOCAB_DAYS.length === 12, `${label}: bundled VOCAB_DAYS expected 12`);
  check(Array.isArray(bw.VOCAB_WORDS) && bw.VOCAB_WORDS.length === 312, `${label}: bundled VOCAB_WORDS expected 312`);
  check(Array.isArray(bw.CONFUSABLE_PAIRS) && bw.CONFUSABLE_PAIRS.length === 28, `${label}: bundled CONFUSABLE_PAIRS expected 28`);
  check(Array.isArray(bw.SPRINT_PLAN) && bw.SPRINT_PLAN.length === 12, `${label}: bundled SPRINT_PLAN expected 12`);
  check(Array.isArray(bw.MASTERY_TOPICS) && bw.MASTERY_TOPICS.length === 6, `${label}: bundled MASTERY_TOPICS expected 6`);
  check(Array.isArray(bw.KNOWLEDGE_MODULES) && bw.KNOWLEDGE_MODULES.length === 6, `${label}: bundled KNOWLEDGE_MODULES expected 6`);
  check(bw.KNOWLEDGE_SECTIONS && Object.keys(bw.KNOWLEDGE_SECTIONS).length === 14, `${label}: bundled KNOWLEDGE_SECTIONS expected 14`);
  check(Array.isArray(bw.XIAOKE_MANTRAS) && bw.XIAOKE_MANTRAS.length === 10, `${label}: bundled XIAOKE_MANTRAS expected 10`);
  check(Array.isArray(bw.QUESTION_BANK) && bw.QUESTION_BANK.length === 80, `${label}: bundled QUESTION_BANK expected 80`);
  check(bw.EXPLAIN_DETAILS && Object.keys(bw.EXPLAIN_DETAILS).length === 80, `${label}: bundled EXPLAIN_DETAILS expected 80`);
  check(Boolean(bw.Cet4AnimEngine && bw.Cet4AnimEngine.ANIM_IDS.length === 7), `${label}: bundled Cet4AnimEngine missing 7 ANIM_IDS`);
  check(Boolean(bw.Cet4Speech && typeof bw.Cet4Speech.startVocabRecite === 'function'), `${label}: bundled Cet4Speech missing`);
  check(Boolean(bw.Cet4Grader && typeof bw.Cet4Grader.gradeWriting === 'function'), `${label}: bundled Cet4Grader missing`);
  check(Boolean(bw.XiaoKeAssistant && bw.XiaoKeAssistant.SPRITE_IDS.length === 10), `${label}: bundled XiaoKeAssistant missing 10 sprites`);
  check(
    Boolean(
      bw.TechoPageTurn &&
      typeof bw.TechoPageTurn.turnLayers === 'function' &&
      typeof bw.TechoPageTurn.turnSnapshot === 'function' &&
      typeof bw.TechoPageTurn.attachCornerPeek === 'function' &&
      typeof bw.TechoPageTurn.computeFoldGeometry === 'function' &&
      typeof bw.TechoPageTurn.getActiveCount === 'function' &&
      typeof bw.TechoPageTurn.cancelAll === 'function'
    ),
    `${label}: bundled TechoPageTurn missing expected live API methods`
  );
  if (bw.TechoPageTurn && typeof bw.TechoPageTurn.computeFoldGeometry === 'function') {
    const geom = bw.TechoPageTurn.computeFoldGeometry(960, 640, 0.45);
    check(geom && Array.isArray(geom.unpeeledPoly) && geom.unpeeledPoly.length >= 3, `${label}: TechoPageTurn.computeFoldGeometry invalid unpeeledPoly`);
    check(geom && Array.isArray(geom.peeledPoly) && geom.peeledPoly.length >= 3, `${label}: TechoPageTurn.computeFoldGeometry invalid peeledPoly`);
    check(geom && Array.isArray(geom.flapPoly) && geom.flapPoly.length >= 3, `${label}: TechoPageTurn.computeFoldGeometry invalid flapPoly`);
    check(geom && Array.isArray(geom.foldEdge) && geom.foldEdge.length === 2, `${label}: TechoPageTurn.computeFoldGeometry invalid foldEdge`);
    check(geom && geom.lift > 20, `${label}: TechoPageTurn.computeFoldGeometry expected lift > 20, got ${geom && geom.lift}`);
    if (typeof bw.TechoPageTurn.paperTurnEase === 'function') {
      const e0 = bw.TechoPageTurn.paperTurnEase(0);
      const e5 = bw.TechoPageTurn.paperTurnEase(0.5);
      const e1 = bw.TechoPageTurn.paperTurnEase(1);
      check(e0 === 0 && e1 === 1 && e5 >= 0.45 && e5 <= 0.55, `${label}: TechoPageTurn.paperTurnEase invalid curve (${e0}, ${e5}, ${e1})`);
    }
  }

  // Verify REAL_CET4_PAPERS (6 authentic papers / 342 items) & RealPaperStudio LIVE in VM execution
  check(Array.isArray(bw.REAL_CET4_PAPERS) && bw.REAL_CET4_PAPERS.length === 6,
    `${label}: bundled REAL_CET4_PAPERS expected 6 papers, got ${bw.REAL_CET4_PAPERS && bw.REAL_CET4_PAPERS.length}`);
  if (Array.isArray(bw.REAL_CET4_PAPERS)) {
    const ids = bw.REAL_CET4_PAPERS.map(p => p.id);
    check(JSON.stringify(ids) === JSON.stringify(EXPECTED_REAL_PAPER_IDS),
      `${label}: bundled REAL_CET4_PAPERS order mismatch: ${JSON.stringify(ids)}`);
    const totalRealItems = bw.REAL_CET4_PAPERS.reduce((acc, p) => acc + (Number(p.totalItems) || 0), 0);
    check(totalRealItems === 342, `${label}: bundled REAL_CET4_PAPERS expected 342 total items, got ${totalRealItems}`);
  }

  check(
    Boolean(
      bw.RealPaperStudio &&
      typeof bw.RealPaperStudio.mount === 'function' &&
      typeof bw.RealPaperStudio.unmount === 'function' &&
      typeof bw.RealPaperStudio.computePaperReport === 'function' &&
      typeof bw.RealPaperStudio.getSummaryStats === 'function'
    ),
    `${label}: bundled RealPaperStudio missing expected live API methods`
  );
  if (bw.RealPaperStudio && Array.isArray(bw.REAL_CET4_PAPERS) && bw.REAL_CET4_PAPERS.length === 6) {
    const liveStats = bw.RealPaperStudio.getSummaryStats(SHARED_STORE_KEY);
    check(liveStats && liveStats.totalPapers === 6, `${label}: live VM RealPaperStudio.getSummaryStats().totalPapers expected 6`);
    const samplePaper = bw.REAL_CET4_PAPERS[0];
    const sampleRep = bw.RealPaperStudio.computePaperReport(samplePaper, {
      writingText: samplePaper.writing.modelEssay,
      translationText: samplePaper.translation.referenceTranslation,
      clozeAnswers: Object.fromEntries(samplePaper.reading.cloze.blanks.map(b => [b.num, b.answer])),
      matchingAnswers: Object.fromEntries(samplePaper.reading.matching.statements.map(s => [s.num, s.answer])),
      carefulAnswers: Object.fromEntries(samplePaper.reading.careful.flatMap(p => p.questions.map(q => [q.num, q.answer])))
    });
    check(sampleRep && sampleRep.listeningSkipped === true && sampleRep.estTotal710 >= 660,
      `${label}: live VM RealPaperStudio.computePaperReport failed on ${samplePaper.id} (got ${sampleRep && sampleRep.estTotal710})`);
  }

  return { sizeKb, staticCount: staticIds.size, byIdCount: byIdRefs.length, scriptCount: inlineScripts.length };
}

console.log('=== [5/5] Hobonichi Cozy Desk DOM, Bundle, Real Papers & Hygiene Contract Verification ===');

const engineFiles = [
  path.join(SRC, 'xiaoke_assistant.js'),
  path.join(SRC, 'cet4_animations.js'),
  path.join(SRC, 'real_paper_studio.js'),
  path.join(SRC, 'techo_pageturn.js')
];

const pcInfo = verifyDomContract(
  'PC (index.html)',
  PC_HTML_PATH,
  path.join(SRC, 'app.js'),
  engineFiles,
  [
    { viewKey: 'knowledge', sectionId: 'view-knowledge' },
    { viewKey: 'vocab', sectionId: 'view-vocab' },
    { viewKey: 'practice', sectionId: 'view-practice' },
    { viewKey: 'mastery', sectionId: 'view-mastery' },
    { viewKey: 'notebook', sectionId: 'view-notebook' }
  ],
  EXPECTED_PC_ZINE_IDS,
  14
);

const mobInfo = verifyDomContract(
  'Mobile (mobile.html)',
  MOBILE_HTML_PATH,
  path.join(SRC, 'mobile_app.js'),
  engineFiles,
  [
    { viewKey: 'knowledge', sectionId: 'm-view-knowledge' },
    { viewKey: 'vocab', sectionId: 'm-view-vocab' },
    { viewKey: 'practice', sectionId: 'm-view-practice' },
    { viewKey: 'mastery', sectionId: 'm-view-mastery' },
    { viewKey: 'notebook', sectionId: 'm-view-notebook' }
  ],
  EXPECTED_MOBILE_ZINE_IDS,
  13
);

// Verify Hobonichi CSS + engine injected styles hygiene (zero blur, zero emojis, zero mock-exam)
for (const srcFile of ['style.css', 'mobile.css', 'cet4_animations.js', 'xiaoke_assistant.js', 'real_paper_studio.js', 'techo_pageturn.js']) {
  const txt = fs.readFileSync(path.join(SRC, srcFile), 'utf8');
  check(!RE_MOCK_EXAM.test(txt), `src/${srcFile}: contains forbidden mock-exam selector/string`);
  check(!RE_EMOJI.test(txt), `src/${srcFile}: contains forbidden emoji`);
  check(!RE_BARE_MONO.test(txt), `src/${srcFile}: contains bare monospace`);
  check(!RE_SIMSUN.test(txt), `src/${srcFile}: contains SimSun/宋体`);
  check(!RE_EMPTY_IMG_SRC.test(txt), `src/${srcFile}: contains empty <img src="">`);
  checkHobonichiStyle(`src/${srcFile}`, txt);
}

// Verify synced parent HTML copies exist and match byte-for-byte
for (const [label, srcPath, syncPath] of [
  ['PC Synced HTML', PC_HTML_PATH, PC_SYNC_PATH],
  ['Mobile Synced HTML', MOBILE_HTML_PATH, MOBILE_SYNC_PATH]
]) {
  check(fs.existsSync(syncPath), `${label}: missing synced copy at ${syncPath}`);
  if (fs.existsSync(srcPath) && fs.existsSync(syncPath)) {
    const a = fs.readFileSync(srcPath);
    const b = fs.readFileSync(syncPath);
    check(a.equals(b), `${label}: synced file does not match ${path.basename(srcPath)} byte-for-byte`);
  }
}

if (failures.length > 0) {
  console.error(`[FAIL] test_dom_contracts.js: ${failures.length} failure(s), ${passed} passed.`);
  failures.slice(0, 30).forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
  if (failures.length > 30) console.error(`  ... and ${failures.length - 30} more`);
  process.exit(1);
}

console.log(`[PASS] test_dom_contracts.js: ${passed} checks passed, 0 failures.`);
if (pcInfo && mobInfo) {
  console.log(`       PC index.html: ${pcInfo.sizeKb} KB (${pcInfo.staticCount} static IDs, ${pcInfo.byIdCount} app refs, ${pcInfo.scriptCount} scripts) | Mobile mobile.html: ${mobInfo.sizeKb} KB (${mobInfo.staticCount} static IDs, ${mobInfo.byIdCount} app refs, ${mobInfo.scriptCount} scripts).`);
}
