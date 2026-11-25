/* ==========================================================================
   CET-4 Offline Web Speech Audio & Guided Recitation Engine (window.Cet4Speech)
   - Smart en-US / en-GB / zh-CN voice selection with W/M/Narrator differentiation
   - Graceful fallback timers when SpeechSynthesis is unavailable or silent
   - Multi-speaker listening script player (pause/resume/stop/rate/jumpToTurn)
   - Hands-free 4-beat vocab recitation loop (word -> roots -> meaning -> sentence)
   ========================================================================== */
(function (global) {
  'use strict';

  const FALLBACK_MIN_MS = 650;
  const FALLBACK_MAX_MS = 6500;

  let cachedVoices = [];
  let voicesInitialized = false;
  let activeToken = 0;
  let activeTimers = new Set();
  let activeController = null;
  let speakingFlag = false;

  const FEMALE_HINTS = [
    'zira', 'aria', 'jenny', 'samantha', 'victoria', 'karen', 'serena',
    'moira', 'tessa', 'susan', 'hazel', 'libby', 'sonia', 'michelle',
    'emma', 'ava', 'allison', 'female', 'woman', 'xiaoxiao', 'huihui', 'yaoyao', 'tingting'
  ];
  const MALE_HINTS = [
    'david', 'guy', 'mark', 'daniel', 'alex', 'george', 'ryan', 'christopher',
    'eric', 'roger', 'steffan', 'andrew', 'brian', 'male', 'man', 'yunxi', 'kangkang'
  ];

  function hasWindow() {
    return typeof global !== 'undefined' && global !== null;
  }

  function getSynth() {
    if (!hasWindow()) return null;
    try {
      if ('speechSynthesis' in global && global.speechSynthesis && typeof global.SpeechSynthesisUtterance !== 'undefined') {
        return global.speechSynthesis;
      }
    } catch (_err) {
      return null;
    }
    return null;
  }

  function isSupported() {
    return Boolean(getSynth());
  }

  function clamp(val, min, max) {
    const n = Number(val);
    if (!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, n));
  }

  function cleanText(raw) {
    return String(raw || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function estimateMs(text, rate, lang) {
    const s = cleanText(text);
    if (!s) return 350;
    const r = clamp(rate || 1.0, 0.5, 2.0);
    const isZh = String(lang || '').toLowerCase().startsWith('zh') || /[\u4e00-\u9fff]/.test(s);
    const baseMs = isZh
      ? (s.length * 195) + 420
      : (s.split(/\s+/).length * 360) + 420;
    return Math.round(clamp(baseMs / r, FALLBACK_MIN_MS, FALLBACK_MAX_MS));
  }

  function setSafeTimer(fn, ms) {
    const id = setTimeout(() => {
      activeTimers.delete(id);
      fn();
    }, Math.max(0, Math.round(ms || 0)));
    activeTimers.add(id);
    return id;
  }

  function clearAllTimers() {
    activeTimers.forEach(id => clearTimeout(id));
    activeTimers.clear();
  }

  function refreshVoices() {
    const synth = getSynth();
    if (!synth) return [];
    try {
      const list = synth.getVoices();
      if (Array.isArray(list) && list.length) {
        cachedVoices = list.slice();
      }
      if (!voicesInitialized && typeof synth.addEventListener === 'function') {
        voicesInitialized = true;
        synth.addEventListener('voiceschanged', () => {
          try {
            const updated = synth.getVoices();
            if (Array.isArray(updated) && updated.length) {
              cachedVoices = updated.slice();
            }
          } catch (_err) { /* ignore */ }
        });
      }
    } catch (_err) {
      return cachedVoices;
    }
    return cachedVoices;
  }

  function normalizeLang(lang) {
    const raw = String(lang || 'en-US').trim();
    const low = raw.toLowerCase();
    if (low === 'us' || low === 'en' || low === 'en-us' || low === 'en_us') return 'en-US';
    if (low === 'uk' || low === 'gb' || low === 'en-gb' || low === 'en_gb') return 'en-GB';
    if (low === 'zh' || low === 'cn' || low === 'zh-cn' || low === 'zh_cn') return 'zh-CN';
    return raw;
  }

  function speakerGender(speaker) {
    const s = String(speaker || '').trim().toLowerCase();
    if (!s) return 'neutral';
    if (s === 'w' || s.startsWith('w:') || s === 'woman' || s === 'female' || s === 'f') return 'female';
    if (s === 'm' || s.startsWith('m:') || s === 'man' || s === 'male') return 'male';
    return 'neutral';
  }

  function pickVoice(lang, speaker) {
    const voices = refreshVoices();
    if (!voices.length) return null;
    const target = normalizeLang(lang).toLowerCase();
    const prefix = target.split('-')[0];
    const gender = speakerGender(speaker);

    const exact = voices.filter(v => String(v.lang || '').toLowerCase().replace('_', '-') === target);
    const sameLang = exact.length
      ? exact
      : voices.filter(v => String(v.lang || '').toLowerCase().startsWith(prefix));
    if (!sameLang.length) return null;

    const scoreVoice = v => {
      const name = String(v.name || '').toLowerCase();
      let sc = 0;
      if (String(v.lang || '').toLowerCase().replace('_', '-') === target) sc += 20;
      if (name.includes('natural') || name.includes('neural') || name.includes('online')) sc += 14;
      if (name.includes('google') || name.includes('microsoft') || name.includes('apple')) sc += 6;
      if (v.localService) sc += 4;
      if (gender === 'female') {
        if (FEMALE_HINTS.some(k => name.includes(k))) sc += 32;
        if (MALE_HINTS.some(k => name.includes(k))) sc -= 18;
      } else if (gender === 'male') {
        if (MALE_HINTS.some(k => name.includes(k))) sc += 32;
        if (FEMALE_HINTS.some(k => name.includes(k))) sc -= 18;
      }
      return sc;
    };

    const sorted = sameLang.slice().sort((a, b) => scoreVoice(b) - scoreVoice(a));
    return sorted[0] || null;
  }

  function cancelSynthQuietly() {
    const synth = getSynth();
    if (synth) {
      try { synth.cancel(); } catch (_err) { /* ignore */ }
    }
  }

  function stop() {
    activeToken += 1;
    speakingFlag = false;
    clearAllTimers();
    cancelSynthQuietly();
    if (activeController && typeof activeController._markExternalStop === 'function') {
      const prev = activeController;
      activeController = null;
      prev._markExternalStop();
    } else {
      activeController = null;
    }
  }

  function isSpeaking() {
    const synth = getSynth();
    if (synth) {
      try {
        if (synth.speaking) return true;
      } catch (_err) { /* ignore */ }
    }
    return speakingFlag;
  }

  /* -------------------- Core Utterance Helper -------------------- */
  function speakInternal(text, opts, token) {
    const clean = cleanText(text);
    const lang = normalizeLang(opts.lang || 'en-US');
    const rate = clamp(opts.rate != null ? opts.rate : 1.0, 0.5, 2.0);
    const pitch = clamp(opts.pitch != null ? opts.pitch : 1.0, 0.5, 2.0);
    const volume = clamp(opts.volume != null ? opts.volume : 1.0, 0.0, 1.0);
    const onStart = typeof opts.onStart === 'function' ? opts.onStart : null;
    const onEnd = typeof opts.onEnd === 'function' ? opts.onEnd : null;
    const onError = typeof opts.onError === 'function' ? opts.onError : null;

    let settled = false;
    let watchdogId = null;

    const finish = (errored) => {
      if (settled) return;
      settled = true;
      if (watchdogId !== null) {
        clearTimeout(watchdogId);
        activeTimers.delete(watchdogId);
        watchdogId = null;
      }
      if (token !== activeToken) return;
      speakingFlag = false;
      if (errored && onError) {
        try { onError(errored); } catch (_e) { /* ignore */ }
      }
      if (onEnd) {
        try { onEnd(); } catch (_e) { /* ignore */ }
      }
    };

    if (!clean) {
      setSafeTimer(() => finish(null), 60);
      return;
    }

    const synth = getSynth();
    const fallbackMs = opts.fallbackMs != null ? Number(opts.fallbackMs) : estimateMs(clean, rate, lang);

    if (!synth || opts.forceFallback) {
      speakingFlag = true;
      if (onStart) {
        try { onStart(); } catch (_e) { /* ignore */ }
      }
      watchdogId = setSafeTimer(() => finish(null), fallbackMs);
      return;
    }

    try {
      cancelSynthQuietly();
      const Utter = global.SpeechSynthesisUtterance;
      const utt = new Utter(clean);
      utt.lang = lang;
      utt.rate = rate;
      utt.pitch = pitch;
      utt.volume = volume;
      const chosenVoice = pickVoice(lang, opts.speaker);
      if (chosenVoice) utt.voice = chosenVoice;

      let started = false;
      utt.onstart = () => {
        if (token !== activeToken || settled) return;
        started = true;
        speakingFlag = true;
        if (onStart) {
          try { onStart(); } catch (_e) { /* ignore */ }
        }
      };
      utt.onend = () => finish(null);
      utt.onerror = ev => {
        const errCode = ev && ev.error ? String(ev.error) : 'speech_error';
        if (errCode === 'canceled' || errCode === 'interrupted') {
          if (token !== activeToken) return;
        }
        finish(errCode);
      };

      // Watchdog prevents hangs if a browser fails to emit onstart/onend
      const maxWaitMs = Math.max(fallbackMs + 4200, Math.round(fallbackMs * 2.1));
      watchdogId = setSafeTimer(() => {
        if (token !== activeToken || settled) return;
        if (!started && onStart) {
          try { onStart(); } catch (_e) { /* ignore */ }
        }
        finish(null);
      }, maxWaitMs);

      speakingFlag = true;
      synth.speak(utt);

      // Fire onStart gracefully if engine silently queues without onstart
      setSafeTimer(() => {
        if (token !== activeToken || settled || started) return;
        started = true;
        if (onStart) {
          try { onStart(); } catch (_e) { /* ignore */ }
        }
      }, 280);
    } catch (err) {
      speakingFlag = true;
      if (onStart) {
        try { onStart(); } catch (_e) { /* ignore */ }
      }
      watchdogId = setSafeTimer(() => finish(err), fallbackMs);
    }
  }

  function speak(text, opts = {}) {
    stop();
    const token = activeToken;
    speakInternal(text, opts || {}, token);
    return {
      stop() {
        if (token === activeToken) stop();
      }
    };
  }

  function speakWord(word, opts = {}) {
    stop();
    const token = activeToken;
    const w = cleanText(typeof word === 'object' && word ? word.word : word);
    const rate = clamp(opts.rate != null ? opts.rate : 0.94, 0.5, 1.8);
    const accent = normalizeLang(opts.accent || 'en-US');
    const repeat = Math.max(1, Math.min(4, Math.round(opts.repeat || 1)));
    const gapMs = Math.max(120, Math.round(opts.gapMs != null ? opts.gapMs : 420));
    const onStart = typeof opts.onStart === 'function' ? opts.onStart : null;
    const onEnd = typeof opts.onEnd === 'function' ? opts.onEnd : null;

    let count = 0;
    const nextSay = () => {
      if (token !== activeToken) return;
      count += 1;
      speakInternal(
        w,
        {
          lang: accent,
          rate,
          pitch: 1.0,
          fallbackMs: opts.fallbackMs,
          forceFallback: opts.forceFallback,
          onStart: count === 1 ? onStart : null,
          onEnd: () => {
            if (token !== activeToken) return;
            if (count < repeat) {
              setSafeTimer(nextSay, gapMs);
            } else if (onEnd) {
              try { onEnd(); } catch (_e) { /* ignore */ }
            }
          }
        },
        token
      );
    };
    nextSay();
    return {
      stop() {
        if (token === activeToken) stop();
      }
    };
  }

  /* -------------------- Multi-Speaker Listening Script Player -------------------- */
  function normalizeTurns(turns) {
    if (!Array.isArray(turns)) return [];
    return turns
      .map(t => {
        if (typeof t === 'string') {
          const m = t.match(/^(W|M|Woman|Man|Narrator)\s*[:：]\s*([\s\S]+)$/i);
          if (m) return { speaker: m[1], text: cleanText(m[2]) };
          return { speaker: 'Narrator', text: cleanText(t) };
        }
        if (t && typeof t === 'object') {
          return Object.assign({}, t, {
            speaker: t.speaker || 'Narrator',
            text: cleanText(t.text || t.line || '')
          });
        }
        return null;
      })
      .filter(t => t && t.text);
  }

  function playListeningScript(rawTurns, opts = {}) {
    stop();
    const turns = normalizeTurns(rawTurns);
    let sessionToken = activeToken;
    let rate = clamp(opts.rate != null ? opts.rate : 1.0, 0.6, 1.6);
    const turnGapMs = Math.max(120, Math.round(opts.turnGapMs != null ? opts.turnGapMs : 380));
    const accent = normalizeLang(opts.accent || 'en-US');

    let state = 'idle'; // idle | playing | paused | stopped | finished
    let currentIndex = Math.max(0, Math.min(Math.max(0, turns.length - 1), Number(opts.startIndex) || 0));

    const emitState = nextState => {
      state = nextState;
      if (typeof opts.onStateChange === 'function') {
        try {
          opts.onStateChange({
            state,
            currentIndex,
            total: turns.length,
            rate
          });
        } catch (_e) { /* ignore */ }
      }
    };

    const runTurn = idx => {
      if (sessionToken !== activeToken || state !== 'playing') return;
      if (idx >= turns.length) {
        speakingFlag = false;
        emitState('finished');
        if (activeController === ctrl) activeController = null;
        if (typeof opts.onFinish === 'function') {
          try { opts.onFinish(); } catch (_e) { /* ignore */ }
        }
        return;
      }
      currentIndex = idx;
      const turn = turns[idx];
      const gender = speakerGender(turn.speaker);
      const pitch = gender === 'female' ? 1.12 : (gender === 'male' ? 0.86 : 1.0);

      if (typeof opts.onTurnStart === 'function') {
        try { opts.onTurnStart(idx, turn); } catch (_e) { /* ignore */ }
      }

      speakInternal(
        turn.text,
        {
          lang: accent,
          rate,
          pitch,
          speaker: turn.speaker,
          fallbackMs: opts.fallbackMs,
          forceFallback: opts.forceFallback,
          onEnd: () => {
            if (sessionToken !== activeToken || state !== 'playing') return;
            if (typeof opts.onTurnEnd === 'function') {
              try { opts.onTurnEnd(idx, turn); } catch (_e) { /* ignore */ }
            }
            if (idx + 1 >= turns.length) {
              runTurn(idx + 1);
            } else {
              setSafeTimer(() => runTurn(idx + 1), turnGapMs);
            }
          }
        },
        sessionToken
      );
    };

    const ctrl = {
      pause() {
        if (state !== 'playing') return ctrl.getState();
        activeToken += 1;
        sessionToken = activeToken;
        speakingFlag = false;
        clearAllTimers();
        cancelSynthQuietly();
        emitState('paused');
        return ctrl.getState();
      },
      resume() {
        if (!turns.length) return ctrl.getState();
        if (state === 'playing') return ctrl.getState();
        if (state === 'finished' || state === 'stopped') {
          currentIndex = 0;
        }
        activeToken += 1;
        sessionToken = activeToken;
        activeController = ctrl;
        emitState('playing');
        runTurn(currentIndex);
        return ctrl.getState();
      },
      stop() {
        if (state === 'stopped') return ctrl.getState();
        activeToken += 1;
        sessionToken = activeToken;
        speakingFlag = false;
        clearAllTimers();
        cancelSynthQuietly();
        if (activeController === ctrl) activeController = null;
        emitState('stopped');
        return ctrl.getState();
      },
      setRate(nextRate) {
        rate = clamp(nextRate, 0.6, 1.6);
        if (state === 'playing') {
          activeToken += 1;
          sessionToken = activeToken;
          clearAllTimers();
          cancelSynthQuietly();
          emitState('playing');
          runTurn(currentIndex);
        } else {
          emitState(state);
        }
        return ctrl.getState();
      },
      jumpToTurn(idx) {
        if (!turns.length) return ctrl.getState();
        currentIndex = Math.max(0, Math.min(turns.length - 1, Math.round(Number(idx) || 0)));
        activeToken += 1;
        sessionToken = activeToken;
        clearAllTimers();
        cancelSynthQuietly();
        activeController = ctrl;
        emitState('playing');
        runTurn(currentIndex);
        return ctrl.getState();
      },
      getState() {
        return { state, currentIndex, total: turns.length, rate };
      },
      _markExternalStop() {
        if (state !== 'stopped' && state !== 'finished') {
          emitState('stopped');
        }
      }
    };

    activeController = ctrl;
    if (!turns.length) {
      emitState('finished');
      if (typeof opts.onFinish === 'function') {
        try { opts.onFinish(); } catch (_e) { /* ignore */ }
      }
      return ctrl;
    }

    emitState('playing');
    runTurn(currentIndex);
    return ctrl;
  }

  /* -------------------- Hands-Free Guided Vocab Recitation -------------------- */
  function startVocabRecite(rawWords, opts = {}) {
    stop();
    const words = Array.isArray(rawWords) ? rawWords.filter(Boolean) : [];
    let sessionToken = activeToken;

    let rate = clamp(opts.rate != null ? opts.rate : 1.0, 0.6, 1.6);
    let repeatWord = Math.max(1, Math.min(3, Math.round(opts.repeatWord != null ? opts.repeatWord : 2)));
    let includeRoots = opts.includeRoots !== false;
    let includeChinese = opts.includeChinese !== false;
    let includeSentence = opts.includeSentence !== false;
    const accent = normalizeLang(opts.accent || 'en-US');
    const beatGapMs = Math.max(120, Math.round(opts.beatGapMs != null ? opts.beatGapMs : 420));
    const wordGapMs = Math.max(200, Math.round(opts.wordGapMs != null ? opts.wordGapMs : 650));

    let state = 'idle'; // idle | playing | paused | stopped | finished
    let currentIndex = Math.max(0, Math.min(Math.max(0, words.length - 1), Number(opts.startIndex) || 0));
    let currentBeat = 'word';

    const emitState = nextState => {
      state = nextState;
      if (typeof opts.onStateChange === 'function') {
        try {
          opts.onStateChange({
            state,
            currentIndex,
            currentBeat,
            total: words.length,
            rate
          });
        } catch (_e) { /* ignore */ }
      }
    };

    const buildBeats = w => {
      const beats = [];
      const wordStr = cleanText(w.word || '');
      beats.push({
        kind: 'word',
        repeat: repeatWord,
        lang: accent,
        text: wordStr,
        speakable: Boolean(wordStr)
      });

      const rootRaw = cleanText(w.roots || w.mnemonic || '');
      if (includeRoots && rootRaw) {
        beats.push({
          kind: 'roots',
          repeat: 1,
          lang: 'zh-CN',
          text: rootRaw.slice(0, 72),
          speakable: includeChinese
        });
      }

      const posLabel = w.pos ? cleanText(w.pos) + ' ' : '';
      const meanRaw = cleanText(w.meaning || '');
      const firstCol = Array.isArray(w.collocations) && w.collocations[0]
        ? (typeof w.collocations[0] === 'string' ? w.collocations[0] : (w.collocations[0].zh || ''))
        : '';
      const meaningSpoken = cleanText([posLabel + meanRaw, firstCol ? ('常搭：' + firstCol) : ''].filter(Boolean).join('，'));
      beats.push({
        kind: 'meaning',
        repeat: 1,
        lang: 'zh-CN',
        text: meaningSpoken.slice(0, 78),
        speakable: includeChinese && Boolean(meaningSpoken)
      });

      const sentEn = w.realSentence && typeof w.realSentence === 'object'
        ? cleanText(w.realSentence.en || '')
        : cleanText(w.sentence || '');
      if (includeSentence && sentEn) {
        beats.push({
          kind: 'sentence',
          repeat: 1,
          lang: accent,
          text: sentEn,
          speakable: true
        });
      }
      return beats;
    };

    const runWord = idx => {
      if (sessionToken !== activeToken || state !== 'playing') return;
      if (idx >= words.length) {
        speakingFlag = false;
        emitState('finished');
        if (activeController === ctrl) activeController = null;
        if (typeof opts.onFinish === 'function') {
          try { opts.onFinish(); } catch (_e) { /* ignore */ }
        }
        return;
      }

      currentIndex = idx;
      const word = words[idx];
      const beats = buildBeats(word);

      if (typeof opts.onWordChange === 'function') {
        try { opts.onWordChange(idx, word); } catch (_e) { /* ignore */ }
      }

      const runBeat = bIdx => {
        if (sessionToken !== activeToken || state !== 'playing') return;
        if (bIdx >= beats.length) {
          setSafeTimer(() => runWord(idx + 1), wordGapMs);
          return;
        }
        const beat = beats[bIdx];
        currentBeat = beat.kind;
        if (typeof opts.onBeat === 'function') {
          try { opts.onBeat(idx, beat.kind, word); } catch (_e) { /* ignore */ }
        }

        const afterBeat = () => {
          if (sessionToken !== activeToken || state !== 'playing') return;
          setSafeTimer(() => runBeat(bIdx + 1), beatGapMs);
        };

        if (!beat.speakable || !beat.text) {
          const silentMs = opts.fallbackMs != null ? Number(opts.fallbackMs) : Math.round(1250 / rate);
          setSafeTimer(afterBeat, silentMs);
          return;
        }

        let said = 0;
        const sayOnce = () => {
          if (sessionToken !== activeToken || state !== 'playing') return;
          said += 1;
          speakInternal(
            beat.text,
            {
              lang: beat.lang,
              rate: beat.kind === 'word' ? clamp(rate * 0.94, 0.55, 1.6) : rate,
              pitch: 1.0,
              fallbackMs: opts.fallbackMs,
              forceFallback: opts.forceFallback,
              onEnd: () => {
                if (sessionToken !== activeToken || state !== 'playing') return;
                if (said < beat.repeat) {
                  setSafeTimer(sayOnce, 360);
                } else {
                  afterBeat();
                }
              }
            },
            sessionToken
          );
        };
        sayOnce();
      };

      runBeat(0);
    };

    const ctrl = {
      pause() {
        if (state !== 'playing') return ctrl.getState();
        activeToken += 1;
        sessionToken = activeToken;
        speakingFlag = false;
        clearAllTimers();
        cancelSynthQuietly();
        emitState('paused');
        return ctrl.getState();
      },
      resume() {
        if (!words.length) return ctrl.getState();
        if (state === 'playing') return ctrl.getState();
        if (state === 'finished' || state === 'stopped') {
          currentIndex = 0;
        }
        activeToken += 1;
        sessionToken = activeToken;
        activeController = ctrl;
        emitState('playing');
        runWord(currentIndex);
        return ctrl.getState();
      },
      next() {
        if (!words.length) return ctrl.getState();
        const nextIdx = (currentIndex + 1) % words.length;
        return ctrl.jumpTo(nextIdx);
      },
      prev() {
        if (!words.length) return ctrl.getState();
        const prevIdx = (currentIndex - 1 + words.length) % words.length;
        return ctrl.jumpTo(prevIdx);
      },
      jumpTo(idx) {
        if (!words.length) return ctrl.getState();
        currentIndex = Math.max(0, Math.min(words.length - 1, Math.round(Number(idx) || 0)));
        currentBeat = 'word';
        activeToken += 1;
        sessionToken = activeToken;
        clearAllTimers();
        cancelSynthQuietly();
        activeController = ctrl;
        emitState('playing');
        runWord(currentIndex);
        return ctrl.getState();
      },
      stop() {
        if (state === 'stopped') return ctrl.getState();
        activeToken += 1;
        sessionToken = activeToken;
        speakingFlag = false;
        clearAllTimers();
        cancelSynthQuietly();
        if (activeController === ctrl) activeController = null;
        emitState('stopped');
        return ctrl.getState();
      },
      setRate(nextRate) {
        rate = clamp(nextRate, 0.6, 1.6);
        if (state === 'playing') {
          activeToken += 1;
          sessionToken = activeToken;
          clearAllTimers();
          cancelSynthQuietly();
          emitState('playing');
          runWord(currentIndex);
        } else {
          emitState(state);
        }
        return ctrl.getState();
      },
      setOptions(partial = {}) {
        if (partial.repeatWord != null) repeatWord = Math.max(1, Math.min(3, Math.round(partial.repeatWord)));
        if (partial.includeRoots != null) includeRoots = Boolean(partial.includeRoots);
        if (partial.includeChinese != null) includeChinese = Boolean(partial.includeChinese);
        if (partial.includeSentence != null) includeSentence = Boolean(partial.includeSentence);
        if (partial.rate != null) rate = clamp(partial.rate, 0.6, 1.6);
        return ctrl.getState();
      },
      getState() {
        return { state, currentIndex, currentBeat, total: words.length, rate };
      },
      _markExternalStop() {
        if (state !== 'stopped' && state !== 'finished') {
          emitState('stopped');
        }
      }
    };

    activeController = ctrl;
    if (!words.length) {
      emitState('finished');
      if (typeof opts.onFinish === 'function') {
        try { opts.onFinish(); } catch (_e) { /* ignore */ }
      }
      return ctrl;
    }

    emitState('playing');
    runWord(currentIndex);
    return ctrl;
  }

  // Warm voice list on browser load
  refreshVoices();

  const Cet4Speech = {
    isSupported,
    isSpeaking,
    getVoices: refreshVoices,
    stop,
    speak,
    speakWord,
    playListeningScript,
    startVocabRecite
  };

  if (hasWindow()) {
    global.Cet4Speech = Cet4Speech;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cet4Speech;
  }
})(typeof window !== 'undefined' ? window : globalThis);
