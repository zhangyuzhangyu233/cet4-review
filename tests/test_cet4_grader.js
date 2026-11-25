'use strict';

const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');

const Cet4Grader = require(path.join(SRC, 'cet4_grader.js'));
const { QUESTION_BANK } = require(path.join(SRC, 'questions_data.js'));

let passed = 0;
const failures = [];

function check(cond, msg) {
  if (cond) {
    passed += 1;
  } else {
    failures.push(msg);
  }
}

function isFiniteNum(v) {
  return typeof v === 'number' && Number.isFinite(v) && !Number.isNaN(v);
}

function nonEmptyStr(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

const VALID_BANDS = new Set([
  '14分档（卓越高分）',
  '11分档（高分达标）',
  '8分档（及格稳妥）',
  '5分档（基础待强化）',
  '2分档（建议重写打磨）'
]);

console.log('=== [2/4] CET-4 Grader Verification (All 80 Questions) ===');

// Sanity check exports
check(typeof Cet4Grader.gradeObjective === 'function', 'Cet4Grader.gradeObjective must be function');
check(typeof Cet4Grader.gradeCloze === 'function', 'Cet4Grader.gradeCloze must be function');
check(typeof Cet4Grader.gradeTranslation === 'function', 'Cet4Grader.gradeTranslation must be function');
check(typeof Cet4Grader.gradeWriting === 'function', 'Cet4Grader.gradeWriting must be function');
check(typeof Cet4Grader.countWords === 'function', 'Cet4Grader.countWords must be function');
check(typeof Cet4Grader.normalizeAnswer === 'function', 'Cet4Grader.normalizeAnswer must be function');
check(typeof Cet4Grader.scoreBandLabel === 'function', 'Cet4Grader.scoreBandLabel must be function');

let objectiveTested = 0;
let clozeTested = 0;
let translationTested = 0;
let writingTested = 0;
const transScores = [];
const writeScores = [];

QUESTION_BANK.forEach(q => {
  const id = q.id;

  // -------------------------------------------------------------------------
  // A. Objective questions: listening (22), matching (12), reading (18) = 52
  // -------------------------------------------------------------------------
  if (q.skill === 'listening' || q.skill === 'matching' || q.skill === 'reading') {
    objectiveTested += 1;

    // 1. Exact correct answer
    const rOk = Cet4Grader.gradeObjective(q, q.answer);
    check(rOk.correct === true, `${id}: expected correct=true for '${q.answer}'`);
    check(isFiniteNum(rOk.score) && rOk.score === rOk.maxScore && rOk.score > 0,
      `${id}: expected full score, got ${rOk.score}/${rOk.maxScore}`);
    check(rOk.answer === String(q.answer).trim().toUpperCase(), `${id}: answer normalization mismatch`);
    check(nonEmptyStr(rOk.feedback), `${id}: empty feedback on correct`);

    // 2. Lowercase + punctuation format (e.g. "b.")
    const rFmt = Cet4Grader.gradeObjective(q, `${String(q.answer).toLowerCase()}.`);
    check(rFmt.correct === true, `${id}: expected lowercase+dot answer to normalize & pass`);

    // 3. Guaranteed wrong answer
    const wrongChoice = String(q.answer).trim().toUpperCase() === 'A' ? 'B' : 'A';
    const rBad = Cet4Grader.gradeObjective(q, wrongChoice);
    check(rBad.correct === false && rBad.score === 0,
      `${id}: expected wrong answer '${wrongChoice}' to score 0`);
    check(nonEmptyStr(rBad.feedback) && rBad.feedback.includes(rOk.answer),
      `${id}: wrong-answer feedback should mention expected answer '${rOk.answer}'`);

    // 4. Empty / null input
    const rEmpty = Cet4Grader.gradeObjective(q, '');
    check(rEmpty.correct === false && rEmpty.score === 0 && nonEmptyStr(rEmpty.feedback),
      `${id}: empty objective submission should safely return score=0`);
    return;
  }

  // -------------------------------------------------------------------------
  // B. Banked Cloze (10 questions: 4x10-blank + 6x5-blank)
  // -------------------------------------------------------------------------
  if (q.skill === 'cloze') {
    clozeTested += 1;
    const total = q.blanks.length;
    const wbByCode = new Map(q.wordBank.map(w => [String(w.code).toUpperCase(), w]));

    const fullMap = {};
    const partialMap = {};
    const wrongMap = {};
    const wordTextArr = [];
    const half = Math.floor(total / 2);

    q.blanks.forEach((b, idx) => {
      const code = String(b.answer).toUpperCase();
      fullMap[b.num] = code;
      const altWrong = code === 'A' ? 'B' : 'A';
      partialMap[b.num] = idx < half ? code : altWrong;
      wrongMap[b.num] = altWrong;
      wordTextArr.push(wbByCode.get(code)?.word || code);
    });

    // 1. Full correct
    const rFull = Cet4Grader.gradeCloze(q, fullMap);
    check(rFull.correctCount === total && rFull.totalCount === total,
      `${id}: cloze full correct expected ${total}/${total}, got ${rFull.correctCount}/${rFull.totalCount}`);
    check(rFull.pct === 100 && rFull.passed === true && isFiniteNum(rFull.score) && rFull.score === rFull.maxScore,
      `${id}: cloze full score/pct/passed invalid: ${JSON.stringify(rFull)}`);
    check(Array.isArray(rFull.perBlank) && rFull.perBlank.length === total && rFull.perBlank.every(x => x.correct),
      `${id}: cloze full perBlank check failed`);

    // 2. Word-text array input (verifies word lookup + array support)
    const rWords = Cet4Grader.gradeCloze(q, wordTextArr);
    check(rWords.correctCount === total && rWords.pct === 100,
      `${id}: cloze word-text array lookup expected ${total}/${total}, got ${rWords.correctCount}/${total}`);

    // 3. Partial correct
    const rPart = Cet4Grader.gradeCloze(q, partialMap);
    check(rPart.correctCount === half && rPart.pct === Math.round((half / total) * 100),
      `${id}: cloze partial expected ${half}/${total}, got ${rPart.correctCount}/${total}`);
    check(isFiniteNum(rPart.score) && rPart.score >= 0 && rPart.score < rPart.maxScore,
      `${id}: cloze partial score out of range: ${rPart.score}`);
    check(nonEmptyStr(rPart.feedback), `${id}: cloze partial feedback empty`);

    // 4. All wrong
    const rWrong = Cet4Grader.gradeCloze(q, wrongMap);
    check(rWrong.correctCount === 0 && rWrong.pct === 0 && rWrong.passed === false && rWrong.score === 0,
      `${id}: cloze all-wrong expected 0 score/pct`);

    // 5. Empty map
    const rEmpty = Cet4Grader.gradeCloze(q, {});
    check(rEmpty.correctCount === 0 && rEmpty.score === 0 && rEmpty.passed === false && nonEmptyStr(rEmpty.feedback),
      `${id}: cloze empty map should safely grade 0`);
    return;
  }

  // -------------------------------------------------------------------------
  // C. Translation (9 questions, 0..15 scale)
  // -------------------------------------------------------------------------
  if (q.skill === 'translation') {
    translationTested += 1;

    // 1. Reference translation
    const rRef = Cet4Grader.gradeTranslation(q, q.referenceTranslation);
    transScores.push(`${id}:${rRef.score}`);
    check(isFiniteNum(rRef.score) && rRef.score >= 0 && rRef.score <= 15,
      `${id}: translation reference score out of 0..15: ${rRef.score}`);
    check(rRef.score >= 12,
      `${id}: translation reference expected >= 12/15, got ${rRef.score}/15 (missed: ${rRef.missedExprs.join('; ')})`);
    check(rRef.maxScore === 15 && rRef.passed === true, `${id}: translation reference should pass with maxScore=15`);
    check(VALID_BANDS.has(rRef.bandLabel), `${id}: invalid bandLabel '${rRef.bandLabel}'`);
    check(Array.isArray(rRef.matchedExprs) && Array.isArray(rRef.missedExprs),
      `${id}: matchedExprs/missedExprs must be arrays`);
    check(rRef.matchedExprs.length >= Math.ceil(q.keyExpressions.length * 0.75),
      `${id}: reference matched too few keyExpressions (${rRef.matchedExprs.length}/${q.keyExpressions.length})`);
    check(rRef.matchedExprs.length + rRef.missedExprs.length === q.keyExpressions.length,
      `${id}: matchedExprs + missedExprs (${rRef.matchedExprs.length + rRef.missedExprs.length}) != keyExpressions (${q.keyExpressions.length})`);
    check(nonEmptyStr(rRef.feedback), `${id}: translation reference feedback empty`);

    // 2. Empty input
    const rEmpty = Cet4Grader.gradeTranslation(q, '');
    check(rEmpty.score === 0 && rEmpty.passed === false && VALID_BANDS.has(rEmpty.bandLabel),
      `${id}: empty translation expected score=0, passed=false`);
    check(rEmpty.matchedExprs.length === 0 && rEmpty.missedExprs.length === q.keyExpressions.length,
      `${id}: empty translation should list all keyExpressions as missed`);

    // 3. Chinese-only input
    const rZh = Cet4Grader.gradeTranslation(q, q.chineseText);
    check(rZh.score === 0 && rZh.passed === false,
      `${id}: Chinese-only translation expected score=0, got ${rZh.score}`);

    // 4. Partial input (first ~45% of words from reference)
    const refWords = q.referenceTranslation.split(/\s+/);
    const partialText = refWords.slice(0, Math.max(8, Math.floor(refWords.length * 0.45))).join(' ') + '.';
    const rPart = Cet4Grader.gradeTranslation(q, partialText);
    check(isFiniteNum(rPart.score) && rPart.score > 0 && rPart.score <= 15,
      `${id}: partial translation score out of (0,15]: ${rPart.score}`);
    check(rPart.score < rRef.score,
      `${id}: partial translation (${rPart.score}) should score below full reference (${rRef.score})`);
    check(VALID_BANDS.has(rPart.bandLabel) && nonEmptyStr(rPart.feedback),
      `${id}: partial translation invalid bandLabel/feedback`);

    // 5. Chinglish stress input (verifies penalty + grammarNotes without NaN)
    const chinglish = 'Although China develop fast, but there have many people very like it because it is good so i think so';
    const rCh = Cet4Grader.gradeTranslation(q, chinglish);
    check(isFiniteNum(rCh.score) && rCh.score >= 0 && rCh.score <= 15,
      `${id}: Chinglish translation score out of 0..15: ${rCh.score}`);
    check(Array.isArray(rCh.grammarNotes) && rCh.grammarNotes.length >= 3,
      `${id}: Chinglish translation should trigger >= 3 grammarNotes, got ${rCh.grammarNotes.length}`);
    return;
  }

  // -------------------------------------------------------------------------
  // D. Writing (9 questions, 0..15 scale)
  // -------------------------------------------------------------------------
  if (q.skill === 'writing') {
    writingTested += 1;

    // 1. Model essay
    const rModel = Cet4Grader.gradeWriting(q, q.modelEssay);
    writeScores.push(`${id}:${rModel.score}`);
    check(isFiniteNum(rModel.score) && rModel.score >= 0 && rModel.score <= 15,
      `${id}: writing model score out of 0..15: ${rModel.score}`);
    check(rModel.score >= 12.5,
      `${id}: writing modelEssay expected >= 12.5/15, got ${rModel.score}/15 (wc=${rModel.wordCount}, para=${rModel.paraCount})`);
    check(rModel.maxScore === 15 && rModel.passed === true && VALID_BANDS.has(rModel.bandLabel),
      `${id}: writing model should pass with valid bandLabel`);
    check(rModel.dimensions && isFiniteNum(rModel.dimensions.content) && isFiniteNum(rModel.dimensions.structure)
      && isFiniteNum(rModel.dimensions.language) && isFiniteNum(rModel.dimensions.length),
      `${id}: writing dimensions must all be finite numbers`);
    check(rModel.dimensions.content >= 0 && rModel.dimensions.content <= 4
      && rModel.dimensions.structure >= 0 && rModel.dimensions.structure <= 4
      && rModel.dimensions.language >= 0 && rModel.dimensions.language <= 4
      && rModel.dimensions.length >= 0 && rModel.dimensions.length <= 3,
      `${id}: writing dimension out of bounds: ${JSON.stringify(rModel.dimensions)}`);
    check(rModel.wordCount >= 120 && rModel.paraCount >= 3,
      `${id}: writing modelEssay expected >=120 words & >=3 paragraphs, got wc=${rModel.wordCount}, para=${rModel.paraCount}`);
    check(Array.isArray(rModel.matchedPatterns) && rModel.matchedPatterns.length > 0,
      `${id}: writing modelEssay should match >= 1 high-score pattern`);

    // 2. Empty input
    const rEmpty = Cet4Grader.gradeWriting(q, '');
    check(rEmpty.score === 0 && rEmpty.passed === false && VALID_BANDS.has(rEmpty.bandLabel),
      `${id}: empty essay expected score=0, passed=false`);

    // 3. Very short input (< 15 words)
    const rShort = Cet4Grader.gradeWriting(q, 'I think this topic is very good for students.');
    check(isFiniteNum(rShort.score) && rShort.score >= 0 && rShort.score <= 1.5 && rShort.passed === false,
      `${id}: very short essay expected score <= 1.5, got ${rShort.score}`);
    check(Array.isArray(rShort.missedTips) && rShort.missedTips.length > 0,
      `${id}: short essay should emit missedTips`);

    // 4. Off-topic 1-paragraph short essay with Chinglish
    const offTopic = 'Yesterday I went to a quiet bakery near the station to buy some bread and fresh milk. '
      + 'Although the weather was cold, but there have many cats sleeping by the warm window. '
      + 'I very like bread because it tastes sweet so i bought three loaves for breakfast tomorrow';
    const rOff = Cet4Grader.gradeWriting(q, offTopic);
    check(isFiniteNum(rOff.score) && rOff.score >= 0 && rOff.score <= 15,
      `${id}: off-topic essay score out of 0..15: ${rOff.score}`);
    check(rOff.score < rModel.score,
      `${id}: off-topic essay (${rOff.score}) should score significantly lower than modelEssay (${rModel.score})`);
    check(VALID_BANDS.has(rOff.bandLabel) && rOff.missedTips.length > 0 && rOff.grammarNotes.length >= 2,
      `${id}: off-topic essay should report missedTips & grammarNotes`);
  }
});

check(objectiveTested === 52, `Expected 52 objective questions tested, got ${objectiveTested}`);
check(clozeTested === 10, `Expected 10 cloze questions tested, got ${clozeTested}`);
check(translationTested === 9, `Expected 9 translation questions tested, got ${translationTested}`);
check(writingTested === 9, `Expected 9 writing questions tested, got ${writingTested}`);
check(objectiveTested + clozeTested + translationTested + writingTested === 80,
  `Expected all 80 questions exercised by Cet4Grader`);

if (failures.length > 0) {
  console.error(`[FAIL] test_cet4_grader.js: ${failures.length} failure(s), ${passed} passed.`);
  failures.slice(0, 30).forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
  if (failures.length > 30) console.error(`  ... and ${failures.length - 30} more`);
  process.exit(1);
}

console.log(`[PASS] test_cet4_grader.js: ${passed} checks passed, 0 failures.`);
console.log(`       Exercised 80/80 questions: 52 objective, 10 cloze, 9 translation [${transScores.join(', ')}], 9 writing [${writeScores.join(', ')}].`);
