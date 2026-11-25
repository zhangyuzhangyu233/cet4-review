'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const MANIFEST_PATH = path.join(ROOT, 'assets', 'xiaoke', 'manifest.json');

const { VOCAB_DAYS, VOCAB_WORDS, CONFUSABLE_PAIRS } = require(path.join(SRC, 'vocab_data.js'));
const {
  SPRINT_PLAN,
  MASTERY_TOPICS,
  KNOWLEDGE_MODULES,
  KNOWLEDGE_SECTIONS,
  TOPIC_SUMMARIES,
  XIAOKE_MANTRAS
} = require(path.join(SRC, 'knowledge_data.js'));
const { QUESTION_BANK } = require(path.join(SRC, 'questions_data.js'));
const { EXPLAIN_DETAILS } = require(path.join(SRC, 'explanations_data.js'));

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

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

function normWs(s) {
  return String(s || '').replace(/\s+/g, ' ').trim();
}

console.log('=== [1/4] CET-4 Data Integrity Verification ===');

// ---------------------------------------------------------------------------
// 1. Vocabulary: 12 VOCAB_DAYS, 312 unique VOCAB_WORDS (26/day), 28 CONFUSABLE_PAIRS
// ---------------------------------------------------------------------------
check(Array.isArray(VOCAB_DAYS) && VOCAB_DAYS.length === 12,
  `VOCAB_DAYS length expected 12, got ${Array.isArray(VOCAB_DAYS) ? VOCAB_DAYS.length : typeof VOCAB_DAYS}`);

const dayTargetMap = new Map();
VOCAB_DAYS.forEach((d, idx) => {
  const expectedDay = idx + 1;
  check(d && d.day === expectedDay, `VOCAB_DAYS[${idx}].day expected ${expectedDay}, got ${d && d.day}`);
  check(nonEmptyStr(d && d.title), `VOCAB_DAYS[${idx}].title must be non-empty`);
  check(nonEmptyStr(d && d.theme), `VOCAB_DAYS[${idx}].theme must be non-empty`);
  check(nonEmptyStr(d && d.focusTip), `VOCAB_DAYS[${idx}].focusTip must be non-empty`);
  check(d && d.targetCount === 26, `VOCAB_DAYS[${idx}].targetCount expected 26, got ${d && d.targetCount}`);
  if (d) dayTargetMap.set(d.day, d.targetCount);
});

check(Array.isArray(VOCAB_WORDS) && VOCAB_WORDS.length === 312,
  `VOCAB_WORDS length expected 312, got ${Array.isArray(VOCAB_WORDS) ? VOCAB_WORDS.length : typeof VOCAB_WORDS}`);

const vocabIds = new Set();
const vocabWordsLower = new Set();
const dayActualCounts = new Map();

VOCAB_WORDS.forEach((w, idx) => {
  const ctx = `VOCAB_WORDS[${idx}] (${w && w.id}/${w && w.word})`;
  check(nonEmptyStr(w && w.id), `${ctx}: missing id`);
  check(!vocabIds.has(w.id), `${ctx}: duplicate id '${w.id}'`);
  vocabIds.add(w.id);

  check(nonEmptyStr(w && w.word), `${ctx}: missing word`);
  const lw = String(w.word || '').trim().toLowerCase();
  check(!vocabWordsLower.has(lw), `${ctx}: duplicate word '${w.word}'`);
  vocabWordsLower.add(lw);

  check(dayTargetMap.has(w.day), `${ctx}: invalid day ${w.day}`);
  dayActualCounts.set(w.day, (dayActualCounts.get(w.day) || 0) + 1);

  check(typeof w.examFreq === 'number' && Number.isFinite(w.examFreq) && w.examFreq > 0,
    `${ctx}: examFreq must be > 0, got ${w.examFreq}`);
  check(nonEmptyStr(w.phonetic), `${ctx}: empty phonetic`);
  check(nonEmptyStr(w.pos), `${ctx}: empty pos`);
  check(nonEmptyStr(w.meaning), `${ctx}: empty meaning`);
  check(nonEmptyStr(w.roots), `${ctx}: empty roots`);
  check(nonEmptyStr(w.mnemonic), `${ctx}: empty mnemonic`);
  check(Array.isArray(w.collocations) && w.collocations.length > 0, `${ctx}: collocations must be non-empty array`);
  if (Array.isArray(w.collocations)) {
    w.collocations.forEach((c, ci) => {
      const ok = typeof c === 'string'
        ? nonEmptyStr(c)
        : (c && nonEmptyStr(c.en) && nonEmptyStr(c.zh));
      check(ok, `${ctx}: invalid collocations[${ci}]`);
    });
  }
  check(w.realSentence && nonEmptyStr(w.realSentence.en) && nonEmptyStr(w.realSentence.zh) && nonEmptyStr(w.realSentence.source),
    `${ctx}: realSentence must have non-empty en, zh, source`);
  if (w.confusable != null) {
    check(typeof w.confusable === 'object' && nonEmptyStr(w.confusable.word) && nonEmptyStr(w.confusable.diff),
      `${ctx}: confusable object must have non-empty word & diff`);
  }
});

check(vocabWordsLower.size === 312, `Expected 312 unique words, got ${vocabWordsLower.size}`);
for (let day = 1; day <= 12; day += 1) {
  const actual = dayActualCounts.get(day) || 0;
  const target = dayTargetMap.get(day);
  check(actual === 26 && actual === target,
    `Day ${day} vocab count mismatch: actual=${actual}, targetCount=${target}, expected=26`);
}

check(Array.isArray(CONFUSABLE_PAIRS) && CONFUSABLE_PAIRS.length === 28,
  `CONFUSABLE_PAIRS length expected 28, got ${Array.isArray(CONFUSABLE_PAIRS) ? CONFUSABLE_PAIRS.length : typeof CONFUSABLE_PAIRS}`);

const confIds = new Set();
CONFUSABLE_PAIRS.forEach((cp, idx) => {
  const ctx = `CONFUSABLE_PAIRS[${idx}] (${cp && cp.id})`;
  check(nonEmptyStr(cp && cp.id) && !confIds.has(cp.id), `${ctx}: missing or duplicate id`);
  if (cp && cp.id) confIds.add(cp.id);
  check(Array.isArray(cp.group) && cp.group.length >= 2, `${ctx}: group must have >= 2 words`);
  check(Array.isArray(cp.items) && cp.items.length >= 2, `${ctx}: items must have >= 2 entries`);
  if (Array.isArray(cp.items)) {
    cp.items.forEach((it, ii) => {
      check(it && nonEmptyStr(it.word) && nonEmptyStr(it.phonetic) && nonEmptyStr(it.pos)
        && nonEmptyStr(it.meaning) && nonEmptyStr(it.tip) && nonEmptyStr(it.example),
        `${ctx}.items[${ii}] missing required fields`);
    });
  }
  const qz = cp && cp.quiz;
  check(qz && nonEmptyStr(qz.stem), `${ctx}.quiz.stem must be non-empty`);
  check(qz && Array.isArray(qz.options) && qz.options.length === 4,
    `${ctx}.quiz.options must have exact length 4`);
  if (qz && Array.isArray(qz.options)) {
    const uniqOpts = new Set(qz.options.map(o => String(o || '').trim().toLowerCase()).filter(Boolean));
    check(uniqOpts.size === 4, `${ctx}.quiz.options must be 4 distinct non-empty choices`);
  }
  check(qz && Number.isInteger(qz.answerIdx) && qz.answerIdx >= 0 && qz.answerIdx <= 3,
    `${ctx}.quiz.answerIdx must be integer in 0..3, got ${qz && qz.answerIdx}`);
  check(qz && nonEmptyStr(qz.explain), `${ctx}.quiz.explain must be non-empty`);
});

// ---------------------------------------------------------------------------
// 2. Knowledge: 12 SPRINT_PLAN, 6 MASTERY_TOPICS, 6 KNOWLEDGE_MODULES,
//    14 KNOWLEDGE_SECTIONS, 6 TOPIC_SUMMARIES, 10 XIAOKE_MANTRAS
// ---------------------------------------------------------------------------
const sectionIds = Object.keys(KNOWLEDGE_SECTIONS || {});
check(sectionIds.length === 14,
  `KNOWLEDGE_SECTIONS count expected 14, got ${sectionIds.length}`);

check(Array.isArray(KNOWLEDGE_MODULES) && KNOWLEDGE_MODULES.length === 6,
  `KNOWLEDGE_MODULES length expected 6, got ${Array.isArray(KNOWLEDGE_MODULES) ? KNOWLEDGE_MODULES.length : typeof KNOWLEDGE_MODULES}`);

const modSectionIds = new Set();
KNOWLEDGE_MODULES.forEach((mod, idx) => {
  const ctx = `KNOWLEDGE_MODULES[${idx}] (${mod && mod.id})`;
  check(nonEmptyStr(mod.id) && nonEmptyStr(mod.title) && Array.isArray(mod.sections) && mod.sections.length > 0,
    `${ctx}: invalid module schema`);
  (mod.sections || []).forEach(secRef => {
    const sid = typeof secRef === 'string' ? secRef : secRef.id;
    check(Boolean(KNOWLEDGE_SECTIONS[sid]), `${ctx}: section '${sid}' missing from KNOWLEDGE_SECTIONS`);
    check(!modSectionIds.has(sid), `${ctx}: duplicate section '${sid}' across modules`);
    modSectionIds.add(sid);
  });
});
check(modSectionIds.size === 14, `Total sections listed in KNOWLEDGE_MODULES expected 14, got ${modSectionIds.size}`);

sectionIds.forEach(sid => {
  const sec = KNOWLEDGE_SECTIONS[sid];
  const ctx = `KNOWLEDGE_SECTIONS.${sid}`;
  check(sec && sec.id === sid, `${ctx}: id mismatch (${sec && sec.id})`);
  check(modSectionIds.has(sid), `${ctx}: orphan section not referenced in KNOWLEDGE_MODULES`);
  check(nonEmptyStr(sec.title), `${ctx}: empty title`);
  check(nonEmptyStr(sec.mantra), `${ctx}: empty mantra`);
  check(nonEmptyStr(sec.coreHtml), `${ctx}: empty coreHtml`);
  check(Array.isArray(sec.strategySteps) && sec.strategySteps.length > 0, `${ctx}: empty strategySteps`);
  check(nonEmptyStr(sec.animId), `${ctx}: empty animId`);
  check(sec.drill && nonEmptyStr(sec.drill.prompt) && Array.isArray(sec.drill.options)
    && sec.drill.options.length === 4 && Number.isInteger(sec.drill.answerIdx)
    && sec.drill.answerIdx >= 0 && sec.drill.answerIdx <= 3 && nonEmptyStr(sec.drill.explain),
    `${ctx}: invalid drill schema`);
});

check(Array.isArray(SPRINT_PLAN) && SPRINT_PLAN.length === 12,
  `SPRINT_PLAN length expected 12, got ${Array.isArray(SPRINT_PLAN) ? SPRINT_PLAN.length : typeof SPRINT_PLAN}`);

const validSkills = new Set(['listening', 'cloze', 'matching', 'reading', 'translation', 'writing']);
SPRINT_PLAN.forEach((sp, idx) => {
  const ctx = `SPRINT_PLAN[${idx}]`;
  check(sp && sp.day === idx + 1, `${ctx}: day expected ${idx + 1}, got ${sp && sp.day}`);
  check(dayTargetMap.has(sp.vocabDay), `${ctx}: vocabDay ${sp.vocabDay} not in VOCAB_DAYS`);
  check(Array.isArray(sp.sectionIds) && sp.sectionIds.length > 0, `${ctx}: sectionIds must be non-empty`);
  (sp.sectionIds || []).forEach(sid => {
    check(Boolean(KNOWLEDGE_SECTIONS[sid]), `${ctx}: sectionId '${sid}' missing from KNOWLEDGE_SECTIONS`);
  });
  check(validSkills.has(sp.practiceSkill), `${ctx}: invalid practiceSkill '${sp.practiceSkill}'`);
  check(nonEmptyStr(sp.title) && nonEmptyStr(sp.goal), `${ctx}: empty title or goal`);
});

check(Array.isArray(MASTERY_TOPICS) && MASTERY_TOPICS.length === 6,
  `MASTERY_TOPICS length expected 6, got ${Array.isArray(MASTERY_TOPICS) ? MASTERY_TOPICS.length : typeof MASTERY_TOPICS}`);

let weightSum = 0;
MASTERY_TOPICS.forEach((mt, idx) => {
  const ctx = `MASTERY_TOPICS[${idx}] (${mt && mt.id})`;
  check(nonEmptyStr(mt.id) && nonEmptyStr(mt.name) && validSkills.has(mt.questionSkill),
    `${ctx}: invalid id/name/questionSkill`);
  check(typeof mt.weightPct === 'number' && mt.weightPct > 0, `${ctx}: weightPct must be > 0`);
  weightSum += Number(mt.weightPct) || 0;
  check(Array.isArray(mt.sectionIds) && mt.sectionIds.length > 0, `${ctx}: empty sectionIds`);
  (mt.sectionIds || []).forEach(sid => {
    check(Boolean(KNOWLEDGE_SECTIONS[sid]), `${ctx}: sectionId '${sid}' missing from KNOWLEDGE_SECTIONS`);
  });
});
check(weightSum === 100, `MASTERY_TOPICS weightPct sum expected 100, got ${weightSum}`);

const expectedSummaryKeys = ['listen', 'cloze', 'matching', 'reading', 'translation', 'writing'];
const actualSummaryKeys = Object.keys(TOPIC_SUMMARIES || {});
check(actualSummaryKeys.length === 6,
  `TOPIC_SUMMARIES enumerable key count expected 6, got ${actualSummaryKeys.length} (${actualSummaryKeys.join(',')})`);
expectedSummaryKeys.forEach(k => {
  const sum = TOPIC_SUMMARIES[k];
  check(sum && nonEmptyStr(sum.title) && nonEmptyStr(sum.formula)
    && Array.isArray(sum.checklist) && sum.checklist.length > 0 && nonEmptyStr(sum.trapWarning),
    `TOPIC_SUMMARIES.${k}: missing required fields`);
});
check(Boolean(TOPIC_SUMMARIES.listening && TOPIC_SUMMARIES.listening === TOPIC_SUMMARIES.listen),
  'TOPIC_SUMMARIES.listening alias should resolve to TOPIC_SUMMARIES.listen');

// 10 XIAOKE_MANTRAS matching assets/xiaoke/manifest.json
const manifestSpriteIds = (manifest.sprites || []).map(s => s.id);
check(manifestSpriteIds.length === 10, `manifest.json sprite count expected 10, got ${manifestSpriteIds.length}`);
check(Array.isArray(XIAOKE_MANTRAS) && XIAOKE_MANTRAS.length === 10,
  `XIAOKE_MANTRAS length expected 10, got ${Array.isArray(XIAOKE_MANTRAS) ? XIAOKE_MANTRAS.length : typeof XIAOKE_MANTRAS}`);
const mantraSpriteIds = new Set();
XIAOKE_MANTRAS.forEach((m, idx) => {
  const ctx = `XIAOKE_MANTRAS[${idx}]`;
  check(manifestSpriteIds.includes(m.spriteId), `${ctx}: spriteId '${m.spriteId}' not in manifest.json`);
  check(!mantraSpriteIds.has(m.spriteId), `${ctx}: duplicate spriteId '${m.spriteId}'`);
  mantraSpriteIds.add(m.spriteId);
  check(nonEmptyStr(m.label) && nonEmptyStr(m.tag) && nonEmptyStr(m.mantra), `${ctx}: empty label/tag/mantra`);
});
manifestSpriteIds.forEach(sid => {
  check(mantraSpriteIds.has(sid), `manifest.json sprite '${sid}' missing from XIAOKE_MANTRAS`);
});

// ---------------------------------------------------------------------------
// 3. Questions (80 items) & 100% 1:1 EXPLAIN_DETAILS coverage
// ---------------------------------------------------------------------------
check(Array.isArray(QUESTION_BANK) && QUESTION_BANK.length === 80,
  `QUESTION_BANK length expected 80, got ${Array.isArray(QUESTION_BANK) ? QUESTION_BANK.length : typeof QUESTION_BANK}`);

const skillCounts = { listening: 0, cloze: 0, matching: 0, reading: 0, translation: 0, writing: 0 };
const qIds = new Set();

QUESTION_BANK.forEach((q, idx) => {
  const ctx = `QUESTION_BANK[${idx}] (${q && q.id})`;
  check(nonEmptyStr(q && q.id), `${ctx}: missing id`);
  check(!qIds.has(q.id), `${ctx}: duplicate id '${q.id}'`);
  qIds.add(q.id);

  check(validSkills.has(q.skill), `${ctx}: invalid skill '${q.skill}'`);
  if (validSkills.has(q.skill)) skillCounts[q.skill] += 1;

  check(Boolean(KNOWLEDGE_SECTIONS[q.sectionId]),
    `${ctx}: sectionId '${q.sectionId}' not found in KNOWLEDGE_SECTIONS`);
  check(nonEmptyStr(q.source) && nonEmptyStr(q.title), `${ctx}: missing source or title`);
  check(Array.isArray(q.hintSteps) && q.hintSteps.length === 3 && q.hintSteps.every(nonEmptyStr),
    `${ctx}: hintSteps must be 3 non-empty strings`);

  if (q.skill === 'listening') {
    check(Array.isArray(q.scriptTurns) && q.scriptTurns.length >= 2,
      `${ctx}: listening scriptTurns must be non-empty (>=2 turns)`);
    const hasEvidenceTurn = Array.isArray(q.scriptTurns) && q.scriptTurns.some(t => t && t.isEvidence === true);
    check(hasEvidenceTurn, `${ctx}: listening scriptTurns missing an isEvidence:true turn`);
    (q.scriptTurns || []).forEach((t, ti) => {
      check(t && nonEmptyStr(t.speaker) && nonEmptyStr(t.text), `${ctx}.scriptTurns[${ti}] missing speaker/text`);
    });
    check(nonEmptyStr(q.questionText), `${ctx}: missing questionText`);
    check(nonEmptyStr(q.preReadCue), `${ctx}: missing preReadCue`);
    check(Array.isArray(q.options) && q.options.length === 4 && q.options.every(nonEmptyStr),
      `${ctx}: listening options must have 4 non-empty strings`);
    check(/^[A-D]$/.test(String(q.answer || '').trim()), `${ctx}: listening answer '${q.answer}' must be A-D`);
  } else if (q.skill === 'cloze') {
    check(nonEmptyStr(q.passageHtml), `${ctx}: cloze passageHtml empty`);
    check(Array.isArray(q.wordBank) && q.wordBank.length === 15,
      `${ctx}: cloze wordBank expected 15 items (A-O), got ${Array.isArray(q.wordBank) ? q.wordBank.length : 0}`);
    const bankCodes = new Set();
    (q.wordBank || []).forEach((wb, wi) => {
      check(wb && /^[A-O]$/.test(wb.code) && nonEmptyStr(wb.word) && nonEmptyStr(wb.pos) && nonEmptyStr(wb.meaning),
        `${ctx}.wordBank[${wi}] invalid entry`);
      if (wb && wb.code) bankCodes.add(wb.code);
    });
    check(bankCodes.size === 15, `${ctx}: cloze wordBank must have 15 unique A-O codes`);

    check(Array.isArray(q.blanks) && (q.blanks.length === 5 || q.blanks.length === 10),
      `${ctx}: cloze blanks expected 5 or 10, got ${Array.isArray(q.blanks) ? q.blanks.length : 0}`);
    const placeholders = [...String(q.passageHtml || '').matchAll(/\{\{(\d+)\}\}/g)].map(m => Number(m[1]));
    const blankNums = (q.blanks || []).map(b => Number(b.num));
    check(placeholders.length === blankNums.length,
      `${ctx}: passageHtml {{N}} placeholder count (${placeholders.length}) != blanks length (${blankNums.length})`);
    blankNums.forEach((n, bi) => {
      check(n === bi + 1, `${ctx}: blank num expected ${bi + 1}, got ${n}`);
      check(placeholders[bi] === n, `${ctx}: placeholder[${bi}] expected {{${n}}}, got {{${placeholders[bi]}}}`);
    });
    (q.blanks || []).forEach((b, bi) => {
      check(bankCodes.has(b.answer), `${ctx}.blanks[${bi}] answer '${b.answer}' not in wordBank`);
      check(nonEmptyStr(b.posHint) && nonEmptyStr(b.explain), `${ctx}.blanks[${bi}] missing posHint or explain`);
    });
  } else if (q.skill === 'matching') {
    check(Array.isArray(q.paragraphs) && q.paragraphs.length >= 5,
      `${ctx}: matching paragraphs must have >= 5 items`);
    const labels = new Set();
    (q.paragraphs || []).forEach((p, pi) => {
      check(p && /^[A-Z]$/.test(p.label) && nonEmptyStr(p.text), `${ctx}.paragraphs[${pi}] invalid`);
      if (p && p.label) labels.add(p.label);
    });
    check(labels.has(String(q.answer || '').trim()),
      `${ctx}: matching answer '${q.answer}' not in paragraph labels [${[...labels].join(',')}]`);
    check(nonEmptyStr(q.statement), `${ctx}: matching statement empty`);
    check(Array.isArray(q.anchorKeywords) && q.anchorKeywords.length > 0, `${ctx}: matching anchorKeywords empty`);
  } else if (q.skill === 'reading') {
    check(Array.isArray(q.passageParagraphs) && q.passageParagraphs.length >= 2,
      `${ctx}: reading passageParagraphs must have >= 2 paragraphs`);
    check(nonEmptyStr(q.questionText), `${ctx}: reading questionText empty`);
    check(Array.isArray(q.options) && q.options.length === 4 && q.options.every(nonEmptyStr),
      `${ctx}: reading options must have 4 non-empty strings`);
    check(/^[A-D]$/.test(String(q.answer || '').trim()), `${ctx}: reading answer '${q.answer}' must be A-D`);
    check(nonEmptyStr(q.evidenceSentence), `${ctx}: reading evidenceSentence empty`);
    const fullPassage = normWs((q.passageParagraphs || []).join(' '));
    const ev = normWs(q.evidenceSentence);
    check(fullPassage.includes(ev),
      `${ctx}: reading evidenceSentence not found verbatim in passageParagraphs ("${ev.slice(0, 60)}...")`);
    check(nonEmptyStr(q.trapType), `${ctx}: reading trapType empty`);
  } else if (q.skill === 'translation') {
    check(nonEmptyStr(q.chineseText), `${ctx}: translation chineseText empty`);
    check(nonEmptyStr(q.referenceTranslation), `${ctx}: translation referenceTranslation empty`);
    check(Array.isArray(q.keyExpressions) && q.keyExpressions.length >= 4,
      `${ctx}: translation keyExpressions must have >= 4 entries`);
    check(Array.isArray(q.sentenceBreakdown) && q.sentenceBreakdown.length >= 2,
      `${ctx}: translation sentenceBreakdown must have >= 2 entries`);
  } else if (q.skill === 'writing') {
    check(nonEmptyStr(q.directions), `${ctx}: writing directions empty`);
    check(nonEmptyStr(q.modelEssay), `${ctx}: writing modelEssay empty`);
    check(Array.isArray(q.transferablePatterns) && q.transferablePatterns.length >= 2,
      `${ctx}: writing transferablePatterns empty`);
    check(Array.isArray(q.topicKeywords) && q.topicKeywords.length >= 4,
      `${ctx}: writing topicKeywords must have >= 4 entries`);
  }

  // 1:1 EXPLAIN_DETAILS check
  const det = EXPLAIN_DETAILS[q.id];
  check(Boolean(det), `${ctx}: missing EXPLAIN_DETAILS['${q.id}']`);
  if (det) {
    check(nonEmptyStr(det.why), `${ctx}: EXPLAIN_DETAILS.why empty`);
    check(Array.isArray(det.steps) && det.steps.length >= 2 && det.steps.every(nonEmptyStr),
      `${ctx}: EXPLAIN_DETAILS.steps must have >= 2 non-empty items`);
    check(nonEmptyStr(det.pitfall), `${ctx}: EXPLAIN_DETAILS.pitfall empty`);
  }
});

check(skillCounts.listening === 22, `Expected 22 listening questions, got ${skillCounts.listening}`);
check(skillCounts.cloze === 10, `Expected 10 cloze questions, got ${skillCounts.cloze}`);
check(skillCounts.matching === 12, `Expected 12 matching questions, got ${skillCounts.matching}`);
check(skillCounts.reading === 18, `Expected 18 reading questions, got ${skillCounts.reading}`);
check(skillCounts.translation === 9, `Expected 9 translation questions, got ${skillCounts.translation}`);
check(skillCounts.writing === 9, `Expected 9 writing questions, got ${skillCounts.writing}`);

const explainIds = Object.keys(EXPLAIN_DETAILS || {});
check(explainIds.length === 80, `EXPLAIN_DETAILS key count expected 80, got ${explainIds.length}`);
explainIds.forEach(eid => {
  check(qIds.has(eid), `Orphan EXPLAIN_DETAILS key '${eid}' not found in QUESTION_BANK`);
});

// ---------------------------------------------------------------------------
// 4. Hygiene across the 4 data files (0 emojis, 0 mock-exam relics, 0 </script>)
// ---------------------------------------------------------------------------
const RE_EMOJI = /[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/u;
const RE_MOCK = /模拟考|模拟卷|mockExam|data-psub=["']mock["']/i;
for (const fname of ['vocab_data.js', 'knowledge_data.js', 'questions_data.js', 'explanations_data.js']) {
  const txt = fs.readFileSync(path.join(SRC, fname), 'utf8');
  check(!RE_EMOJI.test(txt), `src/${fname}: contains forbidden emoji characters`);
  check(!RE_MOCK.test(txt), `src/${fname}: contains forbidden mock-exam string`);
  check(!/<\/script>/i.test(txt), `src/${fname}: contains unescaped </script>`);
}

if (failures.length > 0) {
  console.error(`[FAIL] test_data_integrity.js: ${failures.length} failure(s), ${passed} passed.`);
  failures.slice(0, 30).forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
  if (failures.length > 30) console.error(`  ... and ${failures.length - 30} more`);
  process.exit(1);
}

console.log(`[PASS] test_data_integrity.js: ${passed} checks passed, 0 failures.`);
console.log(`       Vocab: 12 days / 312 unique words / 28 confusables | Knowledge: 6 modules / 14 sections / 10 mantras | Questions: 80 (${JSON.stringify(skillCounts)}) / 80 explanations.`);
