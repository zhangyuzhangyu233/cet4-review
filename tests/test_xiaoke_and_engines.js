'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const XIAOKE_DIR = path.join(ROOT, 'assets', 'xiaoke');

// Load assets & data modules onto globalThis to mirror browser runtime
const manifest = JSON.parse(fs.readFileSync(path.join(XIAOKE_DIR, 'manifest.json'), 'utf8'));
const spritesB64 = JSON.parse(fs.readFileSync(path.join(XIAOKE_DIR, 'xiaoke_b64.json'), 'utf8'));
globalThis.XIAOKE_MANIFEST = manifest;
globalThis.XIAOKE_SPRITES = spritesB64;

const { VOCAB_WORDS } = require(path.join(SRC, 'vocab_data.js'));
const { KNOWLEDGE_MODULES, KNOWLEDGE_SECTIONS, TOPIC_SUMMARIES, XIAOKE_MANTRAS } = require(path.join(SRC, 'knowledge_data.js'));
const { QUESTION_BANK } = require(path.join(SRC, 'questions_data.js'));
const { EXPLAIN_DETAILS } = require(path.join(SRC, 'explanations_data.js'));

globalThis.TOPIC_SUMMARIES = TOPIC_SUMMARIES;
globalThis.EXPLAIN_DETAILS = EXPLAIN_DETAILS;
globalThis.XIAOKE_MANTRAS = XIAOKE_MANTRAS;

const XiaoKeAssistant = require(path.join(SRC, 'xiaoke_assistant.js'));
const Cet4Speech = require(path.join(SRC, 'cet4_speech.js'));
const Cet4AnimEngine = require(path.join(SRC, 'cet4_animations.js'));

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

function makeMockCanvas() {
  const noop = () => {};
  const grad = { addColorStop: noop };
  const ctx = new Proxy({
    measureText(txt) { return { width: String(txt || '').length * 7 }; },
    createLinearGradient() { return grad; },
    createRadialGradient() { return grad; },
    getImageData() { return { data: new Uint8ClampedArray(16) }; }
  }, {
    get(target, prop) {
      if (prop in target) return target[prop];
      return noop;
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    }
  });
  return {
    width: 640,
    height: 360,
    style: {},
    dataset: {},
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    getContext() { return ctx; },
    getBoundingClientRect() { return { left: 0, top: 0, width: 640, height: 360, right: 640, bottom: 360 }; },
    addEventListener: noop,
    removeEventListener: noop
  };
}

function makeMockContainer() {
  const canvas = makeMockCanvas();
  const narrator = { textContent: '' };
  return {
    innerHTML: '',
    dataset: {},
    style: {},
    querySelector(sel) {
      if (sel === 'canvas') return canvas;
      if (sel.includes('narrator')) return narrator;
      return null;
    },
    querySelectorAll() { return []; },
    getBoundingClientRect() { return { left: 0, top: 0, width: 640, height: 360, right: 640, bottom: 360 }; }
  };
}

async function runTests() {
  console.log('=== [3/4] XiaoKeAssistant, Cet4Speech & Cet4AnimEngine Verification ===');

  // -------------------------------------------------------------------------
  // 1. XiaoKeAssistant (all 10 sprites, 3-stage non-spoiler hints, events, 0 mock-exam)
  // -------------------------------------------------------------------------
  const manifestIds = (manifest.sprites || []).map(s => s.id);
  check(Array.isArray(XiaoKeAssistant.SPRITE_IDS) && XiaoKeAssistant.SPRITE_IDS.length === 10,
    `XiaoKeAssistant.SPRITE_IDS expected 10 items, got ${XiaoKeAssistant.SPRITE_IDS && XiaoKeAssistant.SPRITE_IDS.length}`);
  manifestIds.forEach(sid => {
    check(XiaoKeAssistant.SPRITE_IDS.includes(sid), `XiaoKeAssistant.SPRITE_IDS missing '${sid}'`);
    check(XiaoKeAssistant.resolveSpriteId(sid) === sid, `resolveSpriteId('${sid}') did not return exact ID`);
    const src = XiaoKeAssistant.resolveSpriteSrc(sid);
    check(typeof src === 'string' && src.startsWith('data:image/') && src.length > 5000,
      `resolveSpriteSrc('${sid}') expected embedded data:image URI, got '${String(src).slice(0, 40)}'`);
  });

  // Mood aliases
  const aliasCases = [
    ['idle', '01_idle_smile'],
    ['reading', '02_study_reading'],
    ['hint', '03_thinking_hint'],
    ['cheer', '04_cheer_correct'],
    ['wrong', '05_encourage_wrong'],
    ['writing', '06_writing_quill'],
    ['listening', '07_listening_audio'],
    ['rest', '08_sleepy_rest'],
    ['streak', '09_proud_streak'],
    ['eureka', '10_eureka_tip']
  ];
  aliasCases.forEach(([alias, expectedId]) => {
    check(XiaoKeAssistant.resolveSpriteId(alias) === expectedId,
      `resolveSpriteId('${alias}') expected '${expectedId}', got '${XiaoKeAssistant.resolveSpriteId(alias)}'`);
  });

  // Fallback path resolution when XIAOKE_SPRITES is temporarily absent
  const savedSprites = globalThis.XIAOKE_SPRITES;
  globalThis.XIAOKE_SPRITES = {};
  const fallbackSrc = XiaoKeAssistant.resolveSpriteSrc('01_idle_smile');
  check(typeof fallbackSrc === 'string' && fallbackSrc.includes('01_idle_smile.png'),
    `Fallback resolveSpriteSrc expected relative sprite path, got '${fallbackSrc}'`);
  globalThis.XIAOKE_SPRITES = savedSprites;

  // Non-spoiler sanitizer unit checks
  const spoiled1 = XiaoKeAssistant.cleanNonSpoiler('注意转折词 but 后内容，因此本题应选 B。', { answer: 'B' });
  check(!/应选\s*B/.test(spoiled1), `cleanNonSpoiler leaked answer in: '${spoiled1}'`);
  const spoiled2 = XiaoKeAssistant.cleanNonSpoiler('正确答案是 C，直接选 C 即可。', { answer: 'C' });
  check(!/(?:正确答案是|直接选)\s*C/.test(spoiled2), `cleanNonSpoiler leaked answer in: '${spoiled2}'`);

  // Progressive 3-stage non-spoiler hints across ALL 80 questions
  const RE_EXPLICIT_SPOILER = /(?:正确答案|答案)\s*(?:为|是|选)\s*[A-O]\b|(?:本题|该题|这里)\s*(?:应选|直接选|选定)\s*[A-O]\b/i;
  QUESTION_BANK.forEach(q => {
    const seenTags = new Set();
    for (let stage = 0; stage < 3; stage += 1) {
      const h = XiaoKeAssistant.getHintForContext({ view: 'practice', activeQuestion: q, answered: false }, stage);
      check(h && XiaoKeAssistant.SPRITE_IDS.includes(h.spriteId),
        `${q.id} stage ${stage}: invalid spriteId '${h && h.spriteId}'`);
      check(nonEmptyStr(h && h.tag) && h.tag.includes(`${stage + 1}/3`),
        `${q.id} stage ${stage}: tag expected '${stage + 1}/3', got '${h && h.tag}'`);
      seenTags.add(h.tag);
      check(Array.isArray(h.lines) && h.lines.length > 0 && h.lines.every(nonEmptyStr),
        `${q.id} stage ${stage}: hint lines must be non-empty`);
      const joined = (h.lines || []).join(' ');
      check(!RE_EXPLICIT_SPOILER.test(joined),
        `${q.id} stage ${stage}: non-spoiler hint leaked explicit answer: "${joined.slice(0, 100)}"`);
    }
    check(seenTags.size === 3, `${q.id}: expected 3 distinct progressive hint stage tags`);
  });

  // Post-answer hint & other views
  const sampleQ = QUESTION_BANK[0];
  const hAnswered = XiaoKeAssistant.getHintForContext({ view: 'practice', activeQuestion: sampleQ, answered: true }, 0);
  check(hAnswered && hAnswered.spriteId === '10_eureka_tip' && hAnswered.lines.length > 0,
    'Post-answer hint should use 10_eureka_tip with non-empty lines');

  for (const ctx of [
    { view: 'vocab', vocabMode: 'recite', vocabWord: VOCAB_WORDS[0] },
    { view: 'knowledge', sectionId: 't_listen_preread', sectionObj: KNOWLEDGE_SECTIONS.t_listen_preread },
    { view: 'mastery', masterySummary: { overall: 62, weakestName: '听力理解' } },
    { view: 'notebook', notebookSummary: { wrongCount: 3, fuzzyVocabCount: 5 } }
  ]) {
    const h = XiaoKeAssistant.getHintForContext(ctx, 0);
    check(h && XiaoKeAssistant.SPRITE_IDS.includes(h.spriteId) && Array.isArray(h.lines) && h.lines.length > 0,
      `getHintForContext(${ctx.view}) returned invalid hint`);
  }

  // Baseline sprite routing checks
  check(XiaoKeAssistant.getBaselineSprite({ view: 'practice', skill: 'listening' }) === '07_listening_audio',
    'Baseline sprite for listening practice expected 07_listening_audio');
  check(XiaoKeAssistant.getBaselineSprite({ view: 'practice', skill: 'writing' }) === '06_writing_quill',
    'Baseline sprite for writing practice expected 06_writing_quill');
  check(XiaoKeAssistant.getBaselineSprite({ view: 'vocab', vocabMode: 'audio_quiz' }) === '07_listening_audio',
    'Baseline sprite for vocab audio_quiz expected 07_listening_audio');
  check(XiaoKeAssistant.getBaselineSprite({ view: 'vocab', vocabMode: 'confusable' }) === '10_eureka_tip',
    'Baseline sprite for vocab confusable expected 10_eureka_tip');
  check(XiaoKeAssistant.getBaselineSprite({ view: 'home', theme: 'dark' }) === '08_sleepy_rest',
    'Baseline sprite for dark idle expected 08_sleepy_rest');
  check(XiaoKeAssistant.getBaselineSprite({ view: 'practice', audioPlaying: true }) === '07_listening_audio',
    'Baseline sprite for audioPlaying expected 07_listening_audio');

  // Event handlers: onWrongAnswer, onCorrectAnswer, onVocabEvent
  const skillsTestedWrong = ['listening', 'cloze', 'matching', 'reading', 'translation', 'writing'];
  skillsTestedWrong.forEach(sk => {
    const q = QUESTION_BANK.find(x => x.skill === sk);
    const wRes = XiaoKeAssistant.onWrongAnswer(q);
    check(wRes && XiaoKeAssistant.SPRITE_IDS.includes(wRes.spriteId) && Array.isArray(wRes.lines) && wRes.lines.length > 0,
      `onWrongAnswer(${sk}) returned invalid coaching payload`);
  });

  const c1 = XiaoKeAssistant.onCorrectAnswer(sampleQ, 1);
  check(c1 && c1.spriteId === '04_cheer_correct' && c1.lines.length > 0,
    `onCorrectAnswer(streak=1) expected 04_cheer_correct, got ${c1 && c1.spriteId}`);
  const c3 = XiaoKeAssistant.onCorrectAnswer(sampleQ, 3);
  check(c3 && c3.spriteId === '09_proud_streak' && c3.lines.length > 0,
    `onCorrectAnswer(streak=3) expected 09_proud_streak, got ${c3 && c3.spriteId}`);

  const sampleWord = VOCAB_WORDS[0];
  const vocabEvents = [
    ['recite_start', 0, '07_listening_audio'],
    ['known', 1, '04_cheer_correct'],
    ['known', 5, '09_proud_streak'],
    ['fuzzy', 0, '03_thinking_hint'],
    ['unknown', 0, '05_encourage_wrong'],
    ['confusable', 0, '10_eureka_tip'],
    ['day_complete', 0, '09_proud_streak']
  ];
  vocabEvents.forEach(([evType, streak, expectedSprite]) => {
    const res = XiaoKeAssistant.onVocabEvent(evType, sampleWord, streak);
    check(res && res.spriteId === expectedSprite && nonEmptyStr(res.text),
      `onVocabEvent('${evType}', streak=${streak}) expected '${expectedSprite}', got '${res && res.spriteId}'`);
  });

  // Zero mock-exam logic in xiaoke_assistant.js
  const xkSource = fs.readFileSync(path.join(SRC, 'xiaoke_assistant.js'), 'utf8');
  const RE_MOCK = /模拟考|模拟卷|mockExam|practiceSub[^\n]{0,40}mock|data-psub=["']mock["']/i;
  check(!RE_MOCK.test(xkSource), 'src/xiaoke_assistant.js must contain ZERO mock-exam logic or strings');

  // -------------------------------------------------------------------------
  // 2. Cet4Speech (listening script turn progression & vocab recite beat cycle under offline fallback)
  // -------------------------------------------------------------------------
  try {
    check(Cet4Speech.isSupported() === false, 'Cet4Speech.isSupported() expected false in Node offline environment');

    // 2a. speakWord offline fallback
    await new Promise((resolve, reject) => {
      let started = false;
      const tmo = setTimeout(() => reject(new Error('speakWord fallback timed out')), 2000);
      Cet4Speech.speakWord(sampleWord, {
        forceFallback: true,
        fallbackMs: 15,
        repeat: 1,
        onStart: () => { started = true; },
        onEnd: () => {
          clearTimeout(tmo);
          check(started === true, 'speakWord fallback should fire onStart before onEnd');
          resolve();
        }
      });
    });

    // 2b. playListeningScript turn progression + pause/resume/setRate/jumpToTurn + onFinish
    const listenQ = QUESTION_BANK.find(q => q.skill === 'listening' && q.scriptTurns.length >= 4);
    const turnsSlice = listenQ.scriptTurns.slice(0, 3);
    const startedTurns = [];
    const endedTurns = [];
    const statesSeen = [];

    await new Promise((resolve, reject) => {
      const tmo = setTimeout(() => reject(new Error('playListeningScript fallback timed out')), 4000);
      let didPauseTest = false;
      const ctrl = Cet4Speech.playListeningScript(turnsSlice, {
        forceFallback: true,
        fallbackMs: 15,
        turnGapMs: 120,
        rate: 1.0,
        onStateChange: st => statesSeen.push(st.state),
        onTurnStart: idx => {
          startedTurns.push(idx);
          if (idx === 1 && !didPauseTest) {
            didPauseTest = true;
            const pSt = ctrl.pause();
            check(pSt.state === 'paused', `playListeningScript.pause() expected paused, got ${pSt.state}`);
            const rSt = ctrl.setRate(1.2);
            check(rSt.rate === 1.2, `playListeningScript.setRate(1.2) expected 1.2, got ${rSt.rate}`);
            setTimeout(() => {
              const resSt = ctrl.resume();
              check(resSt.state === 'playing', `playListeningScript.resume() expected playing, got ${resSt.state}`);
            }, 25);
          }
        },
        onTurnEnd: idx => endedTurns.push(idx),
        onFinish: () => {
          clearTimeout(tmo);
          check(ctrl.getState().state === 'finished',
            `playListeningScript final state expected 'finished', got '${ctrl.getState().state}'`);
          resolve();
        }
      });
    });

    check(startedTurns[0] === 0 && startedTurns.includes(1) && startedTurns[startedTurns.length - 1] === 2,
      `playListeningScript unexpected turn start sequence: [${startedTurns.join(',')}]`);
    check(endedTurns.join(',') === '0,1,2',
      `playListeningScript expected onTurnEnd [0,1,2], got [${endedTurns.join(',')}]`);
    check(statesSeen.includes('playing') && statesSeen.includes('paused') && statesSeen.includes('finished'),
      `playListeningScript states missing expected lifecycle: [${statesSeen.join(',')}]`);

    // 2c. playListeningScript jumpToTurn + stop
    const jumpCtrl = Cet4Speech.playListeningScript(turnsSlice, { forceFallback: true, fallbackMs: 80, turnGapMs: 120 });
    const jSt = jumpCtrl.jumpToTurn(2);
    check(jSt.currentIndex === 2 && jSt.state === 'playing',
      `playListeningScript.jumpToTurn(2) failed: ${JSON.stringify(jSt)}`);
    const stopSt = jumpCtrl.stop();
    check(stopSt.state === 'stopped', `playListeningScript.stop() expected 'stopped', got '${stopSt.state}'`);

    // 2d. startVocabRecite beat cycle (word -> roots -> meaning -> sentence) across 2 words
    const twoWords = VOCAB_WORDS.slice(0, 2);
    const wordsSeen = [];
    const beatsByWord = {};

    await new Promise((resolve, reject) => {
      const tmo = setTimeout(() => reject(new Error('startVocabRecite fallback timed out')), 5000);
      const rCtrl = Cet4Speech.startVocabRecite(twoWords, {
        forceFallback: true,
        fallbackMs: 12,
        beatGapMs: 120,
        wordGapMs: 200,
        repeatWord: 1,
        includeRoots: true,
        includeChinese: true,
        includeSentence: true,
        onWordChange: (idx, w) => {
          wordsSeen.push(w.word);
          beatsByWord[idx] = [];
        },
        onBeat: (idx, kind) => {
          if (!beatsByWord[idx]) beatsByWord[idx] = [];
          beatsByWord[idx].push(kind);
        },
        onFinish: () => {
          clearTimeout(tmo);
          check(rCtrl.getState().state === 'finished',
            `startVocabRecite final state expected 'finished', got '${rCtrl.getState().state}'`);
          resolve();
        }
      });
    });

    check(wordsSeen.length === 2 && wordsSeen[0] === twoWords[0].word && wordsSeen[1] === twoWords[1].word,
      `startVocabRecite expected words [${twoWords.map(w => w.word).join(',')}], got [${wordsSeen.join(',')}]`);
    check((beatsByWord[0] || []).join('->') === 'word->roots->meaning->sentence',
      `Word 0 beat cycle expected 'word->roots->meaning->sentence', got '${(beatsByWord[0] || []).join('->')}'`);
    check((beatsByWord[1] || []).join('->') === 'word->roots->meaning->sentence',
      `Word 1 beat cycle expected 'word->roots->meaning->sentence', got '${(beatsByWord[1] || []).join('->')}'`);

    // 2e. startVocabRecite pause/next/prev/setOptions/stop
    const rCtrl2 = Cet4Speech.startVocabRecite(twoWords, { forceFallback: true, fallbackMs: 80 });
    check(rCtrl2.pause().state === 'paused', 'startVocabRecite.pause() failed');
    check(rCtrl2.next().currentIndex === 1, 'startVocabRecite.next() expected index 1');
    check(rCtrl2.prev().currentIndex === 0, 'startVocabRecite.prev() expected index 0');
    check(rCtrl2.setOptions({ rate: 1.3, repeatWord: 2 }).rate === 1.3, 'startVocabRecite.setOptions() failed');
    check(rCtrl2.stop().state === 'stopped', 'startVocabRecite.stop() failed');
  } finally {
    Cet4Speech.stop();
  }

  // -------------------------------------------------------------------------
  // 3. Cet4AnimEngine (all 7 animation IDs, getMeta, 100% alignment with KNOWLEDGE_SECTIONS, mock mount/render)
  // -------------------------------------------------------------------------
  const expectedAnimIds = [
    'ebbinghaus',
    'listening_radar',
    'cloze_pipeline',
    'long_read_scan',
    'careful_trap',
    'trans_restructure',
    'essay_builder'
  ];
  check(Array.isArray(Cet4AnimEngine.ANIM_IDS) && Cet4AnimEngine.ANIM_IDS.length === 7,
    `Cet4AnimEngine.ANIM_IDS expected 7 IDs, got ${Cet4AnimEngine.ANIM_IDS && Cet4AnimEngine.ANIM_IDS.length}`);

  expectedAnimIds.forEach(aid => {
    check(Cet4AnimEngine.ANIM_IDS.includes(aid), `Cet4AnimEngine.ANIM_IDS missing '${aid}'`);
    const meta = Cet4AnimEngine.getMeta(aid);
    check(meta && meta.id === aid && nonEmptyStr(meta.title) && nonEmptyStr(meta.subtitle)
      && nonEmptyStr(meta.caption) && Array.isArray(meta.modes) && meta.modes.length >= 2,
      `Cet4AnimEngine.getMeta('${aid}') incomplete`);
  });
  check(Cet4AnimEngine.getMeta('nonexistent_anim_xyz') === null,
    'Cet4AnimEngine.getMeta(unknown) should return null');

  // Verify every animId referenced by KNOWLEDGE_SECTIONS & KNOWLEDGE_MODULES exists in Cet4AnimEngine
  const usedAnimIds = new Set();
  Object.values(KNOWLEDGE_SECTIONS).forEach(sec => {
    check(Cet4AnimEngine.ANIM_IDS.includes(sec.animId) && Boolean(Cet4AnimEngine.getMeta(sec.animId)),
      `KNOWLEDGE_SECTIONS.${sec.id}.animId '${sec.animId}' not registered in Cet4AnimEngine`);
    usedAnimIds.add(sec.animId);
  });
  KNOWLEDGE_MODULES.forEach(mod => {
    (mod.sections || []).forEach(s => {
      if (s && s.animId) {
        check(Cet4AnimEngine.ANIM_IDS.includes(s.animId),
          `KNOWLEDGE_MODULES.${mod.id} section '${s.id}' animId '${s.animId}' not in Cet4AnimEngine`);
      }
    });
  });
  expectedAnimIds.forEach(aid => {
    check(usedAnimIds.has(aid), `Cet4AnimEngine animation '${aid}' is unused by KNOWLEDGE_SECTIONS`);
  });

  // Exercise mount/step/mode/speed/reset/destroy on every simulator with mock Canvas 2D
  expectedAnimIds.forEach(aid => {
    const container = makeMockContainer();
    const inst = Cet4AnimEngine.mount(container, aid);
    check(Boolean(inst) && inst.animId === aid, `Cet4AnimEngine.mount('${aid}') failed to mount`);
    if (inst) {
      const meta = Cet4AnimEngine.getMeta(aid);
      inst.pause();
      check(inst.getState().playing === false, `${aid}: pause() did not set playing=false`);
      inst.play();
      check(inst.getState().playing === true, `${aid}: play() did not set playing=true`);
      inst.step();
      inst.setSpeed(1.5);
      check(inst.getState().speed === 1.5, `${aid}: setSpeed(1.5) failed`);
      if (meta && meta.modes && meta.modes[1]) {
        inst.setMode(meta.modes[1].id);
        check(inst.getState().mode === meta.modes[1].id, `${aid}: setMode('${meta.modes[1].id}') failed`);
        inst.step();
      }
      inst.reset();
      inst.destroy();
    }
  });
  Cet4AnimEngine.destroyAll();
  check(Cet4AnimEngine.activeInstances.size === 0, 'Cet4AnimEngine.destroyAll() left active instances');

  if (failures.length > 0) {
    console.error(`[FAIL] test_xiaoke_and_engines.js: ${failures.length} failure(s), ${passed} passed.`);
    failures.slice(0, 30).forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
    if (failures.length > 30) console.error(`  ... and ${failures.length - 30} more`);
    process.exit(1);
  }

  console.log(`[PASS] test_xiaoke_and_engines.js: ${passed} checks passed, 0 failures.`);
  console.log('       XiaoKeAssistant (10/10 sprites, 80x3 non-spoiler hints, events, 0 mock-exam) | Cet4Speech (listening + 4-beat vocab fallback) | Cet4AnimEngine (7/7 simulators mounted & verified).');
}

runTests().catch(err => {
  console.error('[FAIL] test_xiaoke_and_engines.js uncaught error:', err);
  process.exit(1);
});
