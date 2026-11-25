'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');

const REAL_PAPERS_PATH = path.join(SRC, 'real_papers_data.js');
const STUDIO_PATH = path.join(SRC, 'real_paper_studio.js');
const GRADER_PATH = path.join(SRC, 'cet4_grader.js');
const KNOWLEDGE_PATH = path.join(SRC, 'knowledge_data.js');

const REAL_CET4_PAPERS = require(REAL_PAPERS_PATH);
const Cet4Grader = require(GRADER_PATH);
const { KNOWLEDGE_SECTIONS } = require(KNOWLEDGE_PATH);

// Mirror browser global environment for RealPaperStudio
globalThis.REAL_CET4_PAPERS = REAL_CET4_PAPERS;
globalThis.Cet4Grader = Cet4Grader;

const RealPaperStudio = require(STUDIO_PATH);

const EXPECTED_IDS = [
  'cet4_2026_06_set1',
  'cet4_2026_06_set2',
  'cet4_2025_12_set1',
  'cet4_2024_06_set1',
  'cet4_2023_06_set1',
  'cet4_2023_06_set2'
];

const EXPECTED_YEARS = [
  '2026.06',
  '2026.06',
  '2025.12',
  '2024.06',
  '2023.06',
  '2023.06'
];

const SCRIPTED_IDS = new Set(['cet4_2023_06_set1', 'cet4_2023_06_set2']);
const UNSCRIPTED_IDS = new Set([
  'cet4_2026_06_set1',
  'cet4_2026_06_set2',
  'cet4_2025_12_set1',
  'cet4_2024_06_set1'
]);

const EXPECTED_WORDBANK_CODES = 'ABCDEFGHIJKLMNO'.split('');
const VALID_ABCD = new Set(['A', 'B', 'C', 'D']);

const RE_EMOJI = /[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/u;
const RE_BARE_MONO = /(?<!-)\bmonospace\b/;
const RE_SIMSUN = /SimSun|宋体/i;
const RE_MOCK_EXAM = /模拟考|模拟卷|mockExam/i;
const RE_LEGACY_YEAR = /2017|2018/;

let passed = 0;
const failures = [];

function check(cond, msg) {
  if (cond) {
    passed += 1;
  } else {
    failures.push(msg);
  }
}

function nonEmptyStr(val) {
  return typeof val === 'string' && val.trim().length > 0;
}

function isFiniteNum(v) {
  return typeof v === 'number' && Number.isFinite(v) && !Number.isNaN(v);
}

function yearToMonthIndex(ym) {
  const m = /^(\d{4})\.(\d{2})$/.exec(String(ym || ''));
  if (!m) return -1;
  return Number(m[1]) * 12 + Number(m[2]);
}

function makeMemoryStorage() {
  const store = new Map();
  return {
    getItem(k) { return store.has(k) ? store.get(k) : null; },
    setItem(k, v) { store.set(k, String(v)); },
    removeItem(k) { store.delete(k); },
    clear() { store.clear(); }
  };
}

console.log('=== [4/5] Authentic 2023.06-2026.06 Real CET-4 Papers & Studio Verification ===');

// ---------------------------------------------------------------------------
// 1. Corpus Top-Level Ordering, Year Window & Count (6 Papers / 342 Items)
// ---------------------------------------------------------------------------
check(Array.isArray(REAL_CET4_PAPERS), 'REAL_CET4_PAPERS must be an array');
check(REAL_CET4_PAPERS.length === 6, `Expected exactly 6 authentic papers, got ${REAL_CET4_PAPERS.length}`);
check(globalThis.REAL_CET4_PAPERS === REAL_CET4_PAPERS, 'globalThis.REAL_CET4_PAPERS should reference exported corpus');

const actualIds = REAL_CET4_PAPERS.map(p => p.id);
check(
  JSON.stringify(actualIds) === JSON.stringify(EXPECTED_IDS),
  `Paper IDs/order mismatch: expected ${JSON.stringify(EXPECTED_IDS)}, got ${JSON.stringify(actualIds)}`
);

const actualYears = REAL_CET4_PAPERS.map(p => p.year);
check(
  JSON.stringify(actualYears) === JSON.stringify(EXPECTED_YEARS),
  `Paper years mismatch: expected ${JSON.stringify(EXPECTED_YEARS)}, got ${JSON.stringify(actualYears)}`
);

const minWindow = yearToMonthIndex('2023.06');
const maxWindow = yearToMonthIndex('2026.06');
let prevMonthIdx = Infinity;
let grandTotalItems = 0;

REAL_CET4_PAPERS.forEach((paper, idx) => {
  const pid = paper.id;

  // Metadata & strict 2023.06-2026.06 window (zero 2017/2018 sets)
  const ymIdx = yearToMonthIndex(paper.year);
  check(
    ymIdx >= minWindow && ymIdx <= maxWindow,
    `${pid}: year '${paper.year}' outside strict 2023.06-2026.06 window`
  );
  check(
    ymIdx <= prevMonthIdx,
    `${pid}: papers must be ordered newest -> oldest (${paper.year} appeared after previous paper)`
  );
  prevMonthIdx = ymIdx;

  [paper.id, paper.year, paper.stamp, paper.title, paper.sourceTag, paper.badge].forEach(metaVal => {
    check(nonEmptyStr(metaVal), `${pid}: missing required metadata string`);
    check(!RE_LEGACY_YEAR.test(String(metaVal || '')), `${pid}: forbidden 2017/2018 paper metadata in '${metaVal}'`);
  });

  check(paper.fullPaper === true, `${pid}: fullPaper must be true`);
  check(paper.hasListening === true, `${pid}: hasListening must be true`);
  check(paper.totalItems === 57, `${pid}: totalItems expected 57, got ${paper.totalItems}`);
  check(Array.isArray(paper.topics) && paper.topics.length >= 3, `${pid}: topics must have >= 3 tags`);

  let paperItemCount = 0;

  // -------------------------------------------------------------------------
  // 2A. Part I Writing (1 item)
  // -------------------------------------------------------------------------
  const w = paper.writing;
  check(Boolean(w && typeof w === 'object'), `${pid}: missing writing object`);
  if (w) {
    paperItemCount += 1;
    check(nonEmptyStr(w.title) && nonEmptyStr(w.source), `${pid}: writing missing title/source`);
    check(nonEmptyStr(w.directions) && w.directions.length >= 50, `${pid}: writing directions too short`);
    check(
      Array.isArray(w.wordRange) && w.wordRange.length === 2 && w.wordRange[0] === 120 && w.wordRange[1] === 180,
      `${pid}: writing wordRange expected [120, 180]`
    );
    check(Array.isArray(w.logicBlueprint) && w.logicBlueprint.length >= 3, `${pid}: writing logicBlueprint >= 3`);
    check(Array.isArray(w.transferablePatterns) && w.transferablePatterns.length >= 3, `${pid}: writing transferablePatterns >= 3`);
    check(Array.isArray(w.topicKeywords) && w.topicKeywords.length >= 5, `${pid}: writing topicKeywords >= 5`);
    check(nonEmptyStr(w.modelTitle) && nonEmptyStr(w.modelEssay), `${pid}: writing missing modelTitle/modelEssay`);
    const modelWc = Cet4Grader.countWords(w.modelEssay);
    check(modelWc >= 110 && modelWc <= 220, `${pid}: modelEssay wordCount=${modelWc} outside [110, 220]`);
  }

  // -------------------------------------------------------------------------
  // 2B. Part II Listening (25 Qs, strict real-script vs no-fabricated-script)
  // -------------------------------------------------------------------------
  const lis = paper.listening;
  check(Boolean(lis && typeof lis === 'object'), `${pid}: missing listening object`);
  if (lis) {
    const expectScript = SCRIPTED_IDS.has(pid);
    check(
      paper.hasListeningScript === expectScript,
      `${pid}: hasListeningScript expected ${expectScript}, got ${paper.hasListeningScript}`
    );
    check(
      lis.hasScript === expectScript,
      `${pid}: listening.hasScript expected ${expectScript}, got ${lis.hasScript}`
    );
    if (UNSCRIPTED_IDS.has(pid)) {
      check(paper.hasListeningScript === false && lis.hasScript === false, `${pid}: 2024.06-2026.06 set must have hasListeningScript=false`);
    }
    check(lis.totalQuestions === 25, `${pid}: listening.totalQuestions expected 25, got ${lis.totalQuestions}`);
    check(Array.isArray(lis.sections) && lis.sections.length === 3, `${pid}: listening expected 3 sections (A/B/C)`);

    const lNums = [];
    const evidenceCovered = new Set();
    let totalTurns = 0;

    (lis.sections || []).forEach(sec => {
      check(nonEmptyStr(sec.section) && nonEmptyStr(sec.label), `${pid}: listening section missing label`);
      check(Array.isArray(sec.groups) && sec.groups.length > 0, `${pid}: listening section ${sec.section} missing groups`);
      (sec.groups || []).forEach(g => {
        check(nonEmptyStr(g.groupId) && nonEmptyStr(g.label) && nonEmptyStr(g.title), `${pid}: listening group metadata missing`);
        check(nonEmptyStr(g.preReadCue), `${pid} ${g.groupId}: missing preReadCue`);
        check(Array.isArray(g.qNums) && Array.isArray(g.questions) && g.qNums.length === g.questions.length,
          `${pid} ${g.groupId}: qNums/questions length mismatch`);
        check(Array.isArray(g.scriptTurns), `${pid} ${g.groupId}: scriptTurns must be array`);

        if (expectScript) {
          check(g.scriptTurns.length >= 4, `${pid} ${g.groupId}: 2023.06 scripted group must have real scriptTurns (>=4), got ${g.scriptTurns.length}`);
          totalTurns += g.scriptTurns.length;
          g.scriptTurns.forEach((t, ti) => {
            check(nonEmptyStr(t.speaker) && nonEmptyStr(t.text), `${pid} ${g.groupId} turn#${ti}: missing speaker/text`);
            if (Array.isArray(t.evidenceFor)) {
              t.evidenceFor.forEach(qn => evidenceCovered.add(qn));
            }
          });
        } else {
          check(
            g.scriptTurns.length === 0,
            `${pid} ${g.groupId}: unscripted 2024.06-2026.06 paper MUST NOT contain fabricated scriptTurns (found ${g.scriptTurns.length})`
          );
        }

        g.questions.forEach((q, qi) => {
          paperItemCount += 1;
          lNums.push(q.num);
          check(q.num === g.qNums[qi], `${pid} ${g.groupId}: question num ${q.num} != qNums[${qi}]=${g.qNums[qi]}`);
          check(nonEmptyStr(q.questionText), `${pid} Q${q.num}: missing questionText`);
          check(Array.isArray(q.options) && q.options.length === 4, `${pid} Q${q.num}: expected 4 options`);
          if (Array.isArray(q.options)) {
            q.options.forEach((opt, oi) => {
              const letter = String.fromCharCode(65 + oi);
              check(nonEmptyStr(opt) && opt.trim().startsWith(`${letter}.`), `${pid} Q${q.num}: option ${oi} should start with '${letter}.'`);
            });
          }
          check(VALID_ABCD.has(q.answer), `${pid} Q${q.num}: invalid answer '${q.answer}'`);
          check(nonEmptyStr(q.explain), `${pid} Q${q.num}: missing explain`);
        });
      });
    });

    const expectedLNums = Array.from({ length: 25 }, (_, i) => i + 1);
    check(
      JSON.stringify(lNums) === JSON.stringify(expectedLNums),
      `${pid}: listening question numbers must be contiguous 1..25, got ${JSON.stringify(lNums)}`
    );

    if (expectScript) {
      check(totalTurns >= 60, `${pid}: expected rich verbatim scriptTurns (>=60), got ${totalTurns}`);
      check(
        evidenceCovered.size === 25,
        `${pid}: 2023.06 scripted paper must have 25/25 evidenceFor coverage, got ${evidenceCovered.size}/25`
      );
      expectedLNums.forEach(n => {
        check(evidenceCovered.has(n), `${pid}: listening Q${n} missing evidenceFor anchor in scriptTurns`);
      });
    } else {
      check(totalTurns === 0 && evidenceCovered.size === 0, `${pid}: unscripted paper must have 0 script turns`);
    }
  }

  // -------------------------------------------------------------------------
  // 2C. Part III Section A: Banked Cloze (10 blanks Q26-35 + 15 A-O wordBank)
  // -------------------------------------------------------------------------
  const cl = paper.reading && paper.reading.cloze;
  check(Boolean(cl && typeof cl === 'object'), `${pid}: missing reading.cloze`);
  if (cl) {
    check(nonEmptyStr(cl.title) && nonEmptyStr(cl.passageHtml), `${pid}: cloze missing title/passageHtml`);
    const expectedClNums = Array.from({ length: 10 }, (_, i) => i + 26);
    check(JSON.stringify(cl.qNums) === JSON.stringify(expectedClNums), `${pid}: cloze qNums must be 26..35`);
    check(Array.isArray(cl.wordBank) && cl.wordBank.length === 15, `${pid}: cloze wordBank must have 15 entries`);
    const wbCodes = (cl.wordBank || []).map(w => w.code);
    check(
      JSON.stringify(wbCodes) === JSON.stringify(EXPECTED_WORDBANK_CODES),
      `${pid}: cloze wordBank codes must be A..O in order`
    );
    const wbSet = new Set(wbCodes);
    (cl.wordBank || []).forEach(w => {
      check(nonEmptyStr(w.word) && nonEmptyStr(w.pos) && nonEmptyStr(w.meaning), `${pid}: cloze wordBank ${w.code} missing fields`);
    });

    check(Array.isArray(cl.blanks) && cl.blanks.length === 10, `${pid}: cloze blanks must have 10 items`);
    const usedClozeCodes = new Set();
    (cl.blanks || []).forEach((b, bi) => {
      paperItemCount += 1;
      const expectedNum = 26 + bi;
      check(b.num === expectedNum, `${pid}: cloze blank #${bi} expected num ${expectedNum}, got ${b.num}`);
      check(wbSet.has(b.answer), `${pid} Q${b.num}: cloze answer '${b.answer}' not in A..O`);
      check(!usedClozeCodes.has(b.answer), `${pid} Q${b.num}: duplicate cloze answer '${b.answer}'`);
      usedClozeCodes.add(b.answer);
      check(cl.passageHtml.includes(`{{${b.num}}}`), `${pid} Q${b.num}: cloze passageHtml missing '{{${b.num}}}'`);
      check(nonEmptyStr(b.posHint) && nonEmptyStr(b.explain), `${pid} Q${b.num}: cloze blank missing posHint/explain`);
    });
  }

  // -------------------------------------------------------------------------
  // 2D. Part III Section B: Long Reading Matching (10 statements Q36-45)
  // -------------------------------------------------------------------------
  const mt = paper.reading && paper.reading.matching;
  check(Boolean(mt && typeof mt === 'object'), `${pid}: missing reading.matching`);
  if (mt) {
    check(nonEmptyStr(mt.passageTitle), `${pid}: matching missing passageTitle`);
    const expectedMNums = Array.from({ length: 10 }, (_, i) => i + 36);
    check(JSON.stringify(mt.qNums) === JSON.stringify(expectedMNums), `${pid}: matching qNums must be 36..45`);
    check(Array.isArray(mt.paragraphs) && mt.paragraphs.length >= 10, `${pid}: matching paragraphs must have >= 10 entries`);
    const paraLabelSet = new Set();
    (mt.paragraphs || []).forEach((pa, pi) => {
      const expectedLabel = String.fromCharCode(65 + pi);
      check(pa.label === expectedLabel, `${pid}: matching paragraph #${pi} expected label '${expectedLabel}', got '${pa.label}'`);
      check(nonEmptyStr(pa.text) && pa.text.length >= 40, `${pid}: matching paragraph ${pa.label} text too short`);
      paraLabelSet.add(pa.label);
    });

    check(Array.isArray(mt.statements) && mt.statements.length === 10, `${pid}: matching statements must have 10 items`);
    (mt.statements || []).forEach((st, si) => {
      paperItemCount += 1;
      const expectedNum = 36 + si;
      check(st.num === expectedNum, `${pid}: matching statement #${si} expected num ${expectedNum}, got ${st.num}`);
      check(nonEmptyStr(st.text) && nonEmptyStr(st.explain), `${pid} Q${st.num}: matching missing text/explain`);
      check(paraLabelSet.has(st.answer), `${pid} Q${st.num}: matching answer '${st.answer}' not a valid paragraph label`);
      check(Array.isArray(st.anchorKeywords) && st.anchorKeywords.length >= 1, `${pid} Q${st.num}: missing anchorKeywords`);
    });
  }

  // -------------------------------------------------------------------------
  // 2E. Part III Section C: Careful Reading (2 passages x 5 Qs = 10, Q46-55)
  // -------------------------------------------------------------------------
  const cf = paper.reading && paper.reading.careful;
  check(Array.isArray(cf) && cf.length === 2, `${pid}: careful reading must have 2 passages`);
  if (Array.isArray(cf)) {
    const cfNums = [];
    cf.forEach((pas, pi) => {
      check(nonEmptyStr(pas.passageId) && nonEmptyStr(pas.label) && nonEmptyStr(pas.title), `${pid} P${pi + 1}: missing passage metadata`);
      check(Array.isArray(pas.paragraphs) && pas.paragraphs.length >= 3, `${pid} P${pi + 1}: expected >= 3 paragraphs`);
      (pas.paragraphs || []).forEach((pt, pti) => {
        check(nonEmptyStr(pt), `${pid} P${pi + 1} para#${pti}: empty paragraph`);
      });
      check(Array.isArray(pas.questions) && pas.questions.length === 5, `${pid} P${pi + 1}: expected 5 questions`);
      (pas.questions || []).forEach(q => {
        paperItemCount += 1;
        cfNums.push(q.num);
        check(nonEmptyStr(q.stem), `${pid} Q${q.num}: missing stem`);
        check(Array.isArray(q.options) && q.options.length === 4, `${pid} Q${q.num}: expected 4 options`);
        if (Array.isArray(q.options)) {
          q.options.forEach((opt, oi) => {
            const letter = String.fromCharCode(65 + oi);
            check(nonEmptyStr(opt) && opt.trim().startsWith(`${letter}.`), `${pid} Q${q.num}: option ${oi} should start with '${letter}.'`);
          });
        }
        check(VALID_ABCD.has(q.answer), `${pid} Q${q.num}: invalid answer '${q.answer}'`);
        check(nonEmptyStr(q.evidenceQuote) && nonEmptyStr(q.trapType) && nonEmptyStr(q.explain),
          `${pid} Q${q.num}: missing evidenceQuote/trapType/explain`);
      });
    });
    const expectedCfNums = Array.from({ length: 10 }, (_, i) => i + 46);
    check(JSON.stringify(cfNums) === JSON.stringify(expectedCfNums), `${pid}: careful reading nums must be 46..55`);
  }

  // -------------------------------------------------------------------------
  // 2F. Part IV Translation (1 item)
  // -------------------------------------------------------------------------
  const tr = paper.translation;
  check(Boolean(tr && typeof tr === 'object'), `${pid}: missing translation object`);
  if (tr) {
    paperItemCount += 1;
    check(nonEmptyStr(tr.title) && nonEmptyStr(tr.source), `${pid}: translation missing title/source`);
    check(nonEmptyStr(tr.chineseText) && tr.chineseText.length >= 60, `${pid}: translation chineseText too short`);
    check(nonEmptyStr(tr.referenceTranslation) && tr.referenceTranslation.length >= 150, `${pid}: referenceTranslation too short`);
    check(Array.isArray(tr.keyExpressions) && tr.keyExpressions.length >= 5, `${pid}: translation keyExpressions must have >= 5 items`);
    (tr.keyExpressions || []).forEach((ke, ki) => {
      check(nonEmptyStr(ke.zh) && Array.isArray(ke.en) && ke.en.length >= 1, `${pid}: translation keyExpression#${ki} invalid`);
    });
    check(Array.isArray(tr.sentenceBreakdown) && tr.sentenceBreakdown.length >= 2, `${pid}: translation sentenceBreakdown must have >= 2 sentences`);
    (tr.sentenceBreakdown || []).forEach((sb, sbi) => {
      check(nonEmptyStr(sb.zh) && nonEmptyStr(sb.core) && nonEmptyStr(sb.modifier) && nonEmptyStr(sb.en),
        `${pid}: translation sentenceBreakdown#${sbi} missing fields`);
    });
  }

  check(paperItemCount === 57, `${pid}: counted ${paperItemCount} items, expected exactly 57`);
  grandTotalItems += paperItemCount;
});

check(grandTotalItems === 342, `Grand total real items across 6 papers expected 342, got ${grandTotalItems}`);

// ---------------------------------------------------------------------------
// 3. Exercise Cet4Grader.gradeWriting & gradeTranslation on ALL 6 Papers
// ---------------------------------------------------------------------------
const writeSummaries = [];
const transSummaries = [];

REAL_CET4_PAPERS.forEach(paper => {
  const pid = paper.id;

  // Writing: model essay, weak short essay, empty
  const wgModel = Cet4Grader.gradeWriting(paper.writing, paper.writing.modelEssay);
  check(isFiniteNum(wgModel.score) && wgModel.score >= 11 && wgModel.score <= 15,
    `${pid}: gradeWriting(modelEssay) expected [11, 15], got ${wgModel.score}`);
  check(wgModel.passed === true && nonEmptyStr(wgModel.bandLabel) && nonEmptyStr(wgModel.feedback),
    `${pid}: gradeWriting(modelEssay) should pass with bandLabel & feedback`);
  check(wgModel.dimensions && isFiniteNum(wgModel.dimensions.content) && isFiniteNum(wgModel.dimensions.structure),
    `${pid}: gradeWriting(modelEssay) missing rubric dimensions`);
  writeSummaries.push(`${pid}:${wgModel.score}`);

  const wgWeak = Cet4Grader.gradeWriting(paper.writing, 'This topic is very good. I very like it because it help students.');
  check(isFiniteNum(wgWeak.score) && wgWeak.score < wgModel.score && wgWeak.passed === false,
    `${pid}: weak essay (${wgWeak.score}) must score strictly lower than model (${wgModel.score}) and not pass`);

  const wgEmpty = Cet4Grader.gradeWriting(paper.writing, '');
  check(wgEmpty.score === 0 && wgEmpty.passed === false && wgEmpty.wordCount === 0,
    `${pid}: empty essay should return score=0`);

  // Translation: reference translation, weak snippet, empty
  const tgRef = Cet4Grader.gradeTranslation(paper.translation, paper.translation.referenceTranslation);
  check(isFiniteNum(tgRef.score) && tgRef.score >= 12 && tgRef.score <= 15,
    `${pid}: gradeTranslation(reference) expected [12, 15], got ${tgRef.score}`);
  check(tgRef.passed === true && nonEmptyStr(tgRef.bandLabel) && nonEmptyStr(tgRef.feedback),
    `${pid}: gradeTranslation(reference) should pass with bandLabel & feedback`);
  check(
    Array.isArray(tgRef.matchedExprs) && tgRef.matchedExprs.length >= Math.ceil(paper.translation.keyExpressions.length * 0.7),
    `${pid}: gradeTranslation(reference) matched too few keyExpressions (${tgRef.matchedExprs && tgRef.matchedExprs.length}/${paper.translation.keyExpressions.length})`
  );
  transSummaries.push(`${pid}:${tgRef.score}`);

  const tgWeak = Cet4Grader.gradeTranslation(paper.translation, 'China is very good and people are very happy.');
  check(isFiniteNum(tgWeak.score) && tgWeak.score < tgRef.score && tgWeak.passed === false,
    `${pid}: weak translation (${tgWeak.score}) must score strictly lower than reference (${tgRef.score})`);

  const tgEmpty = Cet4Grader.gradeTranslation(paper.translation, '');
  check(tgEmpty.score === 0 && tgEmpty.passed === false && tgEmpty.wordCount === 0,
    `${pid}: empty translation should return score=0`);
});

// ---------------------------------------------------------------------------
// 4. Exercise RealPaperStudio.computePaperReport (Full 57-item & R+W+T Projection)
// ---------------------------------------------------------------------------
check(typeof RealPaperStudio.mount === 'function', 'RealPaperStudio.mount must be function');
check(typeof RealPaperStudio.unmount === 'function', 'RealPaperStudio.unmount must be function');
check(typeof RealPaperStudio.computePaperReport === 'function', 'RealPaperStudio.computePaperReport must be function');
check(typeof RealPaperStudio.getSummaryStats === 'function', 'RealPaperStudio.getSummaryStats must be function');

function buildFullCorrectProg(paper) {
  const prog = {
    mode: 'full',
    submitted: true,
    writingText: paper.writing.modelEssay,
    listeningAnswers: {},
    clozeAnswers: {},
    clozeChecked: true,
    matchingAnswers: {},
    carefulAnswers: {},
    translationText: paper.translation.referenceTranslation
  };
  paper.listening.sections.forEach(s => s.groups.forEach(g => g.questions.forEach(q => {
    prog.listeningAnswers[q.num] = q.answer;
  })));
  paper.reading.cloze.blanks.forEach(b => { prog.clozeAnswers[b.num] = b.answer; });
  paper.reading.matching.statements.forEach(st => { prog.matchingAnswers[st.num] = st.answer; });
  paper.reading.careful.forEach(pas => pas.questions.forEach(q => { prog.carefulAnswers[q.num] = q.answer; }));
  return prog;
}

const fullReportScores = [];
const rwtReportScores = [];

REAL_CET4_PAPERS.forEach(paper => {
  const pid = paper.id;

  // A. Full 57-item 710-scale report
  const fullProg = buildFullCorrectProg(paper);
  const repFull = RealPaperStudio.computePaperReport(paper, fullProg);

  check(repFull.listeningSkipped === false, `${pid}: full 57-item report listeningSkipped must be false`);
  check(repFull.objAnswered === 55 && repFull.objCorrect === 55 && repFull.objAccPct === 100,
    `${pid}: full report objective stats expected 55/55 (100%), got ${repFull.objCorrect}/${repFull.objAnswered}`);
  check(repFull.lPts === 248.5, `${pid}: full listening points expected 248.5, got ${repFull.lPts}`);
  check(repFull.clPts === 35.5, `${pid}: full cloze points expected 35.5, got ${repFull.clPts}`);
  check(repFull.mPts === 71, `${pid}: full matching points expected 71, got ${repFull.mPts}`);
  check(repFull.cfPts === 142, `${pid}: full careful points expected 142, got ${repFull.cfPts}`);
  check(repFull.readPts === 248.5, `${pid}: full reading points expected 248.5, got ${repFull.readPts}`);
  check(repFull.wPts >= 78 && repFull.wPts <= 106.5, `${pid}: full writing points out of range: ${repFull.wPts}`);
  check(repFull.tPts >= 85 && repFull.tPts <= 106.5, `${pid}: full translation points out of range: ${repFull.tPts}`);
  const expectedSum = Math.round((repFull.wPts + repFull.lPts + repFull.readPts + repFull.tPts) * 10) / 10;
  check(Math.abs(repFull.rawTotal - expectedSum) < 0.2,
    `${pid}: rawTotal (${repFull.rawTotal}) != sum of parts (${expectedSum})`);
  check(repFull.estTotal710 === Math.min(710, Math.round(repFull.rawTotal)),
    `${pid}: estTotal710 (${repFull.estTotal710}) != round(rawTotal) (${Math.round(repFull.rawTotal)})`);
  check(repFull.estTotal710 >= 660 && repFull.estTotal710 <= 710,
    `${pid}: full perfect report estTotal710 expected [660, 710], got ${repFull.estTotal710}`);
  check(repFull.passed425 === true, `${pid}: full report must pass 425`);
  check(Array.isArray(repFull.wrongItems) && repFull.wrongItems.length === 0,
    `${pid}: full perfect report should have 0 wrongItems`);
  check(Array.isArray(repFull.skills) && repFull.skills.length === 6, `${pid}: report must have 6 skill breakdowns`);
  check(Array.isArray(repFull.weakest) && repFull.weakest.length === 2, `${pid}: report must identify 2 weakest skills`);
  repFull.skills.forEach(sk => {
    check(Boolean(KNOWLEDGE_SECTIONS[sk.sectionId]),
      `${pid}: skill '${sk.key}' sectionId '${sk.sectionId}' not found in KNOWLEDGE_SECTIONS`);
  });
  fullReportScores.push(`${pid}:${repFull.estTotal710}`);

  // B. R+W+T 461.5 -> 710 projection (listening skipped)
  const rwtProg = Object.assign({}, fullProg, { listeningAnswers: {} });
  const repRwt = RealPaperStudio.computePaperReport(paper, rwtProg);

  check(repRwt.listeningSkipped === true, `${pid}: RWT report listeningSkipped must be true`);
  check(repRwt.lPts === 0 && repRwt.objAnswered === 30 && repRwt.objCorrect === 30,
    `${pid}: RWT report objective stats expected 30/30 with lPts=0`);
  const expectedRwt = Math.round((repRwt.readPts + repRwt.wPts + repRwt.tPts) * 10) / 10;
  check(Math.abs(repRwt.rwtPts - expectedRwt) < 0.2,
    `${pid}: RWT rwtPts (${repRwt.rwtPts}) != read+write+trans (${expectedRwt})`);
  const expectedProj = Math.min(710, Math.round((repRwt.rwtPts / 461.5) * 710));
  check(repRwt.estTotal710 === expectedProj,
    `${pid}: RWT 461.5->710 projection expected ${expectedProj}, got ${repRwt.estTotal710}`);
  check(repRwt.passed425 === true, `${pid}: RWT full projection must pass 425`);
  if (!paper.hasListeningScript) {
    check(
      repRwt.weakest.every(w => w.key !== 'listening'),
      `${pid}: unscripted paper RWT projection should exclude skipped listening from weakest skills`
    );
  }
  rwtReportScores.push(`${pid}:${repRwt.rwtPts}->${repRwt.estTotal710}`);

  // C. Wrong-item collection & weakest-skill ordering across mixed wrong answers
  const mixedProg = buildFullCorrectProg(paper);
  const firstL = paper.listening.sections[0].groups[0].questions[0];
  const firstCl = paper.reading.cloze.blanks[0];
  const firstMt = paper.reading.matching.statements[0];
  const firstCf = paper.reading.careful[0].questions[0];
  mixedProg.listeningAnswers[firstL.num] = firstL.answer === 'A' ? 'B' : 'A';
  mixedProg.clozeAnswers[firstCl.num] = firstCl.answer === 'A' ? 'B' : 'A';
  mixedProg.matchingAnswers[firstMt.num] = firstMt.answer === 'A' ? 'B' : 'A';
  mixedProg.carefulAnswers[firstCf.num] = firstCf.answer === 'A' ? 'B' : 'A';
  const repMixed = RealPaperStudio.computePaperReport(paper, mixedProg);
  check(repMixed.wrongItems.length === 4, `${pid}: mixed report expected 4 wrongItems, got ${repMixed.wrongItems.length}`);
  const wrongSkills = new Set(repMixed.wrongItems.map(w => w.skill));
  ['listening', 'cloze', 'matching', 'careful'].forEach(sk => {
    check(wrongSkills.has(sk), `${pid}: wrongItems missing expected skill '${sk}'`);
  });
  check(repMixed.weakest[0].pct <= repMixed.weakest[1].pct, `${pid}: weakest skills must be sorted ascending by pct`);

  // D. Empty progress safety
  const repEmpty = RealPaperStudio.computePaperReport(paper, {});
  check(repEmpty.estTotal710 === 0 && repEmpty.passed425 === false && repEmpty.wrongItems.length === 0,
    `${pid}: empty report must safely return estTotal710=0`);
});

// ---------------------------------------------------------------------------
// 5. Exercise RealPaperStudio.getSummaryStats & Lightweight Mount/Unmount
// ---------------------------------------------------------------------------
const prevStorageDesc = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
const mockStorage = makeMemoryStorage();
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  writable: true,
  value: mockStorage
});

try {
  const KEY = 'cet4_xiaoke_sprint_v1';
  const emptyStats = RealPaperStudio.getSummaryStats(KEY);
  check(emptyStats.totalPapers === 6, `empty getSummaryStats.totalPapers expected 6, got ${emptyStats.totalPapers}`);
  check(emptyStats.startedPapers === 0 && emptyStats.completedPapers === 0,
    `empty getSummaryStats started/completed expected 0/0, got ${emptyStats.startedPapers}/${emptyStats.completedPapers}`);
  check(emptyStats.totalAnswered === 0 && emptyStats.totalCorrect === 0 && emptyStats.bestEstScore === 0,
    `empty getSummaryStats answered/correct/best expected 0/0/0`);

  // Populate 1 completed full paper (2023.06 set 1) + 1 partial R+W+T paper (2026.06 set 1)
  const pFull = REAL_CET4_PAPERS[4]; // cet4_2023_06_set1
  const pLatest = REAL_CET4_PAPERS[0]; // cet4_2026_06_set1
  const fullProg = buildFullCorrectProg(pFull);
  const fullRep = RealPaperStudio.computePaperReport(pFull, fullProg);
  fullProg.bestEstScore = fullRep.estTotal710;

  const partialProg = {
    mode: 'instant',
    submitted: false,
    writingText: '',
    listeningAnswers: {},
    clozeAnswers: { 26: pLatest.reading.cloze.blanks[0].answer, 27: pLatest.reading.cloze.blanks[1].answer },
    matchingAnswers: { 36: pLatest.reading.matching.statements[0].answer },
    carefulAnswers: { 46: pLatest.reading.careful[0].questions[0].answer },
    translationText: ''
  };

  mockStorage.setItem(KEY, JSON.stringify({
    realPaperProgress: {
      [pFull.id]: fullProg,
      [pLatest.id]: partialProg
    }
  }));

  const stats = RealPaperStudio.getSummaryStats(KEY);
  check(stats.totalPapers === 6, `populated getSummaryStats.totalPapers expected 6, got ${stats.totalPapers}`);
  check(stats.startedPapers === 2, `populated getSummaryStats.startedPapers expected 2, got ${stats.startedPapers}`);
  check(stats.completedPapers === 1, `populated getSummaryStats.completedPapers expected 1, got ${stats.completedPapers}`);
  check(stats.totalAnswered === 57 + 4, `populated getSummaryStats.totalAnswered expected 61, got ${stats.totalAnswered}`);
  check(stats.totalCorrect === 55 + 4, `populated getSummaryStats.totalCorrect expected 59, got ${stats.totalCorrect}`);
  check(stats.bestEstScore === fullRep.estTotal710 && stats.bestEstScore >= 660,
    `populated getSummaryStats.bestEstScore expected ${fullRep.estTotal710}, got ${stats.bestEstScore}`);

  // Smoke-test mount & unmount with a minimal host element
  const listeners = {};
  const mockHost = {
    innerHTML: '',
    addEventListener(ev, fn) { listeners[ev] = fn; },
    removeEventListener(ev) { delete listeners[ev]; },
    querySelector() { return null; },
    contains() { return false; }
  };
  RealPaperStudio.mount(mockHost, { isMobile: false, storageKey: KEY });
  check(mockHost.innerHTML.includes('rps-root') && mockHost.innerHTML.includes('rps-lobby-grid'),
    'RealPaperStudio.mount should render Neo-Brutalist Zine lobby HTML');
  EXPECTED_IDS.forEach(pid => {
    check(mockHost.innerHTML.includes(pid), `RealPaperStudio lobby HTML missing paper card '${pid}'`);
  });
  RealPaperStudio.unmount();
  check(mockHost.innerHTML === '' && !listeners.click, 'RealPaperStudio.unmount should clear host HTML & listeners');
} finally {
  if (prevStorageDesc) Object.defineProperty(globalThis, 'localStorage', prevStorageDesc);
  else delete globalThis.localStorage;
}

// ---------------------------------------------------------------------------
// 6. Hygiene Gates on src/real_papers_data.js & src/real_paper_studio.js
// ---------------------------------------------------------------------------
for (const [label, fp] of [
  ['src/real_papers_data.js', REAL_PAPERS_PATH],
  ['src/real_paper_studio.js', STUDIO_PATH]
]) {
  const txt = fs.readFileSync(fp, 'utf8');
  check(!RE_EMOJI.test(txt), `${label}: contains forbidden emoji character`);
  check(!RE_BARE_MONO.test(txt), `${label}: contains forbidden bare monospace`);
  check(!RE_SIMSUN.test(txt), `${label}: contains forbidden SimSun/宋体`);
  check(!RE_MOCK_EXAM.test(txt), `${label}: contains forbidden mock-exam string (模拟考/模拟卷/mockExam)`);
}

// Neo-Brutalist Zine CSS check on real_paper_studio.js
const studioSource = fs.readFileSync(STUDIO_PATH, 'utf8');
check(!/backdrop-filter\s*:/i.test(studioSource), 'src/real_paper_studio.js: contains forbidden backdrop-filter');
check(!/filter\s*:[^;}\n]*blur\s*\(/i.test(studioSource), 'src/real_paper_studio.js: contains forbidden filter: blur');

// ---------------------------------------------------------------------------
// Final Report
// ---------------------------------------------------------------------------
if (failures.length > 0) {
  console.error(`[FAIL] test_real_papers.js: ${failures.length} failure(s), ${passed} passed.`);
  failures.slice(0, 30).forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
  if (failures.length > 30) console.error(`  ... and ${failures.length - 30} more`);
  process.exit(1);
}

console.log(`[PASS] test_real_papers.js: ${passed} checks passed, 0 failures.`);
console.log(`       6 authentic 2023.06-2026.06 papers (${grandTotalItems} items) | Writing [${writeSummaries.join(', ')}] | Translation [${transSummaries.join(', ')}]`);
console.log(`       710 Full [${fullReportScores.join(', ')}] | R+W+T 461.5->710 [${rwtReportScores.join(', ')}]`);
