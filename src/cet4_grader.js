/* ==========================================================================
   CET-4 Offline Intelligent Scoring & Diagnostic Engine (window.Cet4Grader)
   - Zero external dependencies, fully Node-testable
   - Objective (Listening / Long Reading / Careful Reading)
   - Banked Cloze (15-choose-10 / 5-blank with POS & word-bank lookup)
   - Translation (0-15 CET-4 scale: key expressions, lemma/synonym variants,
     completeness ratio, sentence structure & Chinglish diagnostics)
   - Writing (0-15 CET-4 scale: 120-180 word band, 3-paragraph architecture,
     topic coverage, transferable patterns, cohesion & lexical variety)
   ========================================================================== */
(function (global) {
  'use strict';

  const STOP_WORDS = new Set([
    'a', 'an', 'the', 'of', 'in', 'on', 'at', 'to', 'for', 'by', 'with', 'from',
    'as', 'into', 'about', 'after', 'before', 'between', 'through', 'during',
    'and', 'or', 'but', 'nor', 'so', 'yet', 'that', 'this', 'these', 'those',
    'it', 'its', 'they', 'them', 'their', 'we', 'us', 'our', 'you', 'your',
    'he', 'him', 'his', 'she', 'her', 'i', 'me', 'my', 'be', 'is', 'am', 'are',
    'was', 'were', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must',
    'not', 'no', 'very', 'more', 'most', 'some', 'any', 'each', 'every', 'all',
    'both', 'few', 'many', 'much', 'such', 'own', 'same', 'than', 'too', 'also',
    'just', 'only', 'then', 'there', 'here', 'when', 'where', 'why', 'how',
    'who', 'whom', 'whose', 'which', 'what', 'while', 'if', 'whether', 'because',
    'since', 'although', 'though', 'unless', 'until', 'up', 'down', 'out', 'off',
    'over', 'under', 'again', 'further', 'once', 'one', 'two', 'three'
  ]);

  const IRREGULAR_LEMMAS = {
    am: 'be', is: 'be', are: 'be', was: 'be', were: 'be', been: 'be', being: 'be',
    has: 'have', had: 'have', having: 'have',
    does: 'do', did: 'do', done: 'do', doing: 'do',
    went: 'go', gone: 'go', goes: 'go',
    made: 'make', making: 'make',
    took: 'take', taken: 'take', taking: 'take',
    gave: 'give', given: 'give', giving: 'give',
    brought: 'bring', became: 'become', built: 'build',
    began: 'begin', begun: 'begin',
    broke: 'break', broken: 'break',
    bought: 'buy', caught: 'catch',
    chose: 'choose', chosen: 'choose',
    came: 'come', drove: 'drive', driven: 'drive',
    drew: 'draw', drawn: 'draw',
    ate: 'eat', eaten: 'eat',
    fell: 'fall', fallen: 'fall', felt: 'feel',
    fought: 'fight',
    found: 'find', flew: 'fly', flown: 'fly',
    forgot: 'forget', forgotten: 'forget',
    got: 'get', gotten: 'get',
    grew: 'grow', grown: 'grow',
    heard: 'hear', held: 'hold', kept: 'keep',
    knew: 'know', known: 'know',
    led: 'lead', left: 'leave', lost: 'lose',
    meant: 'mean', met: 'meet', paid: 'pay',
    rose: 'rise', risen: 'rise',
    ran: 'run', said: 'say', saw: 'see', seen: 'see',
    sold: 'sell', sent: 'send', showed: 'show', shown: 'show',
    spent: 'spend', spoke: 'speak', spoken: 'speak',
    stood: 'stand', taught: 'teach', told: 'tell',
    thought: 'think', threw: 'throw', thrown: 'throw',
    understood: 'understand', wore: 'wear', worn: 'wear',
    won: 'win', wrote: 'write', written: 'write',
    children: 'child', people: 'person', men: 'man', women: 'woman',
    lives: 'life', better: 'good', best: 'good', worse: 'bad', worst: 'bad',
    countries: 'country', cities: 'city', families: 'family',
    activities: 'activity', opportunities: 'opportunity', universities: 'university',
    technologies: 'technology', policies: 'policy', communities: 'community',
    societies: 'society', traditions: 'tradition', studies: 'study',
    centuries: 'century', values: 'value', visitors: 'visitor', tourists: 'tourist'
  };

  // CET-4 semantic equivalence groups (bidirectional lemma families)
  const SYNONYM_GROUPS = [
    ['important', 'significant', 'crucial', 'vital', 'essential', 'key', 'major'],
    ['promote', 'boost', 'advance', 'enhance', 'foster', 'facilitate', 'encourage', 'stimulate'],
    ['improve', 'enhance', 'upgrade', 'raise', 'elevate', 'strengthen', 'better'],
    ['develop', 'advance', 'evolve', 'expand', 'grow', 'progress'],
    ['rapidly', 'quickly', 'fast', 'swiftly', 'dramatically', 'sharply', 'speedily'],
    ['rapid', 'fast', 'quick', 'swift', 'dramatic', 'remarkable'],
    ['traditional', 'classic', 'conventional', 'ancient', 'historic', 'heritage'],
    ['protect', 'preserve', 'safeguard', 'conserve', 'defend', 'maintain'],
    ['respect', 'honor', 'honour', 'revere', 'esteem', 'value', 'cherish'],
    ['convenient', 'handy', 'accessible', 'easy', 'efficient'],
    ['popular', 'widespread', 'prevalent', 'favored', 'favoured', 'common', 'well-received'],
    ['provide', 'offer', 'supply', 'deliver', 'give', 'afford'],
    ['enable', 'allow', 'permit', 'empower', 'help', 'assist'],
    ['increasingly', 'more', 'ever', 'steadily', 'gradually', 'growing'],
    ['participate', 'engage', 'join', 'attend', 'involve'],
    ['role', 'part', 'function', 'effect', 'impact', 'influence'],
    ['emphasize', 'stress', 'highlight', 'underline', 'value', 'prioritize'],
    ['famous', 'known', 'renowned', 'noted', 'celebrated', 'well-known'],
    ['symbolize', 'represent', 'signify', 'embody', 'reflect', 'stand'],
    ['communicate', 'interact', 'exchange', 'connect', 'share'],
    ['various', 'diverse', 'varied', 'multiple', 'numerous', 'different'],
    ['reduce', 'decrease', 'lower', 'diminish', 'lessen', 'cut', 'alleviate'],
    ['increase', 'rise', 'grow', 'surge', 'expand', 'climb', 'mount'],
    ['culture', 'heritage', 'civilization', 'custom', 'tradition'],
    ['society', 'community', 'public', 'social'],
    ['economy', 'economic', 'financial', 'commerce', 'commercial'],
    ['technology', 'tech', 'digital', 'technical', 'innovation', 'innovative'],
    ['education', 'educational', 'academic', 'campus', 'school', 'university', 'college'],
    ['environment', 'environmental', 'ecological', 'green', 'eco-friendly', 'sustainable'],
    ['student', 'undergraduate', 'learner', 'pupil', 'youth'],
    ['teacher', 'educator', 'instructor', 'professor', 'mentor'],
    ['courtesy', 'etiquette', 'manner', 'politeness', 'protocol', 'custom'],
    ['research', 'study', 'investigation', 'exploration', 'inquiry', 'scientific'],
    ['harmony', 'harmonious', 'peaceful', 'balanced'],
    ['benefit', 'beneficial', 'advantage', 'helpful', 'positive', 'useful'],
    ['challenge', 'difficulty', 'problem', 'obstacle', 'issue'],
    ['solve', 'resolve', 'address', 'tackle', 'handle', 'overcome'],
    ['create', 'generate', 'produce', 'build', 'establish', 'form'],
    ['show', 'demonstrate', 'display', 'reveal', 'indicate', 'illustrate', 'reflect'],
    ['attract', 'draw', 'appeal', 'captivate', 'fascinate'],
    ['tourist', 'visitor', 'traveler', 'traveller', 'sightseer', 'guest'],
    ['concept', 'value', 'idea', 'notion', 'belief', 'view'],
    ['history', 'historical', 'century', 'centuries', 'past', 'ancient'],
    ['modern', 'contemporary', 'current', 'present', 'today', 'nowadays'],
    ['support', 'back', 'sustain', 'aid', 'assist', 'uphold'],
    ['focus', 'concentrate', 'center', 'centre', 'attention'],
    ['achieve', 'accomplish', 'attain', 'realize', 'realise', 'fulfill', 'reach'],
    ['quality', 'standard', 'level', 'excellence'],
    ['service', 'facility', 'convenience', 'amenity']
  ];

  const SYNONYM_MAP = new Map();
  SYNONYM_GROUPS.forEach((group, idx) => {
    group.forEach(word => {
      const lem = simpleLemma(word);
      if (!SYNONYM_MAP.has(lem)) SYNONYM_MAP.set(lem, new Set());
      SYNONYM_MAP.get(lem).add(idx);
      if (!SYNONYM_MAP.has(word)) SYNONYM_MAP.set(word, new Set());
      SYNONYM_MAP.get(word).add(idx);
    });
  });

  const WRITING_PATTERNS = [
    { label: 'There is no denying / doubt that', re: /\bthere\s+is\s+no\s+(?:denying|doubt)\s+that\b/i },
    { label: 'It is universally/widely acknowledged/believed that', re: /\bit\s+is\s+(?:universally|widely|generally|commonly)\s+(?:acknowledged|believed|recognized|accepted)\s+that\b/i },
    { label: 'With the rapid development of', re: /\bwith\s+the\s+(?:rapid\s+|fast\s+|steady\s+)?(?:development|advancement|growth|rise|popularity)\s+of\b/i },
    { label: 'In recent years / Nowadays', re: /\b(?:in\s+recent\s+years|over\s+the\s+past\s+few\s+years|nowadays|currently)\b/i },
    { label: 'From my perspective / As far as I am concerned', re: /\b(?:from\s+my\s+(?:perspective|point\s+of\s+view)|as\s+far\s+as\s+i\s+am\s+concerned|in\s+my\s+(?:opinion|view))\b/i },
    { label: 'First and foremost / To begin with', re: /\b(?:first\s+and\s+foremost|to\s+begin\s+with|above\s+all|primarily)\b/i },
    { label: 'Furthermore / Moreover / In addition', re: /\b(?:furthermore|moreover|in\s+addition|besides|additionally|what\s+is\s+more)\b/i },
    { label: 'Not only ... but also', re: /\bnot\s+only\b[\s\S]{1,90}\bbut\s+(?:also\b)?/i },
    { label: 'On the one hand ... on the other hand', re: /\bon\s+the\s+one\s+hand\b[\s\S]{1,220}\bon\s+the\s+other\s+hand\b/i },
    { label: 'Play a vital/crucial/important role in', re: /\bplay(?:s|ed|ing)?\s+an?\s+(?:vital|crucial|important|significant|indispensable|key|positive)\s+(?:role|part)\s+in\b/i },
    { label: 'For instance / For example / Take ... as an example', re: /\b(?:for\s+instance|for\s+example|such\s+as|take\s+[\w\s]{2,30}\s+as\s+an\s+example)\b/i },
    { label: 'However / Nevertheless / By contrast', re: /\b(?:however|nevertheless|nonetheless|by\s+contrast|in\s+contrast|conversely|on\s+the\s+contrary)\b/i },
    { label: 'Therefore / Consequently / As a result', re: /\b(?:therefore|consequently|as\s+a\s+result|thus|hence|accordingly)\b/i },
    { label: 'In conclusion / To sum up / All in all', re: /\b(?:in\s+conclusion|to\s+sum\s+up|all\s+in\s+all|in\s+short|in\s+summary|taking\s+everything\s+into\s+(?:account|consideration))\b/i },
    { label: 'Only in this way can / It is high time', re: /\b(?:only\s+(?:in\s+this\s+way|by\s+doing\s+so)\s+(?:can|will)|it\s+is\s+high\s+time\s+that|make\s+joint\s+efforts|pave\s+the\s+way\s+for|strike\s+a\s+balance)\b/i },
    { label: 'Contribute to / Be beneficial to / Enable ... to', re: /\b(?:contribute(?:s|d|ing)?\s+to|be\s+beneficial\s+to|enable(?:s|d|ing)?\s+[\w\s]{1,24}\s+to|attach\s+(?:great\s+)?importance\s+to|take\s+(?:effective\s+)?measures\s+to)\b/i }
  ];

  const TRANSITION_GROUPS = {
    opening: /\b(?:first\s+and\s+foremost|firstly|to\s+begin\s+with|in\s+recent\s+years|nowadays|first)\b/i,
    progression: /\b(?:secondly|furthermore|moreover|in\s+addition|additionally|besides|what\s+is\s+more|also)\b/i,
    contrastOrExample: /\b(?:however|nevertheless|while|although|though|whereas|for\s+example|for\s+instance|such\s+as|on\s+the\s+other\s+hand)\b/i,
    conclusion: /\b(?:in\s+conclusion|to\s+sum\s+up|all\s+in\s+all|therefore|thus|consequently|in\s+summary|overall|as\s+a\s+result)\b/i
  };

  const CHINGLISH_RULES = [
    { re: /\balthough\b[^.!?]{3,100}\bbut\b/i, note: '英文中 although/though 与 but 不能同时连用，请保留其一。' },
    { re: /\bbecause\b[^.!?]{3,100}\bso\b/i, note: '英文中 because 与 so 不能同时连用，请删去其中一个连接词。' },
    { re: /\bthere\s+(?:have|has)\b/i, note: '存在句应使用 there is / there are，避免直译成 there have。' },
    { re: /\bvery\s+(?:like|love|enjoy|hope|want)\b/i, note: 'very 不能直接修饰实义动词，建议改为 really like 或 like ... very much。' },
    { re: /\bcan\s+able\s+to\b/i, note: 'can 与 be able to 语义重复，保留 can 或 be able to 即可。' },
    { re: /\b(?:is|are|was|were)\s+belong(?:s|ed|ing)?\s+to\b/i, note: 'belong to 无被动语态，直接使用 belong(s) to。' },
    { re: /\bmore\s+and\s+more\s+people\s+(?:is|thinks|likes|uses|wants|has)\b/i, note: 'more and more people 为复数主语，谓语动词需用复数形式。' },
    { re: /\bin\s+the\s+recently\b/i, note: '表达“近年来”应使用 in recent years 或 recently。' },
    { re: /\b([A-Za-z]{2,})\s+\1\b/i, note: '检测到相邻重复单词，提交前请快速通读检查拼写。' }
  ];

  function simpleLemma(rawWord) {
    let w = String(rawWord || '').toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g, '');
    if (!w) return '';
    if (IRREGULAR_LEMMAS[w]) return IRREGULAR_LEMMAS[w];
    if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
    if (w.length > 4 && w.endsWith('ied')) return w.slice(0, -3) + 'y';
    if (w.length > 5 && /(ches|shes|xes|zes|ses)$/.test(w)) return w.slice(0, -2);
    if (w.length > 4 && w.endsWith('ing')) {
      const stem = w.slice(0, -3);
      if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
        return stem.slice(0, -1);
      }
      return stem;
    }
    if (w.length > 4 && w.endsWith('ed')) {
      const stem = w.slice(0, -2);
      if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
        return stem.slice(0, -1);
      }
      return stem;
    }
    if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') && !w.endsWith('us') && !w.endsWith('is')) {
      return w.slice(0, -1);
    }
    return w;
  }

  function extractEnglishWords(text) {
    const matches = String(text || '').match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g);
    return matches ? matches : [];
  }

  function countWords(text) {
    return extractEnglishWords(text).length;
  }

  function normalizeEnglish(text) {
    return String(text || '')
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[，、]/g, ', ')
      .replace(/[。]/g, '. ')
      .replace(/[！]/g, '! ')
      .replace(/[？]/g, '? ')
      .replace(/[；]/g, '; ')
      .replace(/[：]/g, ': ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizeAnswer(ans) {
    if (ans === null || ans === undefined) return '';
    if (typeof ans === 'number' && ans >= 0 && ans <= 25) {
      return String.fromCharCode(65 + ans);
    }
    const s = String(ans).trim().toUpperCase();
    const m = s.match(/^([A-Z])(?:\s*[.)、:：]|$)/);
    return m ? m[1] : s;
  }

  function tokensSimilar(a, b) {
    if (!a || !b) return false;
    if (a === b) return true;
    const la = simpleLemma(a);
    const lb = simpleLemma(b);
    if (la === lb) return true;
    if (la.length >= 5 && lb.length >= 5 && (la.startsWith(lb.slice(0, 5)) || lb.startsWith(la.slice(0, 5)))) {
      return true;
    }
    const ga = SYNONYM_MAP.get(la) || SYNONYM_MAP.get(a);
    const gb = SYNONYM_MAP.get(lb) || SYNONYM_MAP.get(b);
    if (ga && gb) {
      for (const id of ga) {
        if (gb.has(id)) return true;
      }
    }
    return false;
  }

  function matchKeyExpression(userNormLower, userTokens, rawExpr) {
    const variants = [];
    let display = '';

    if (typeof rawExpr === 'string') {
      display = rawExpr.trim();
      display.split(/\s*(?:\/|\||或)\s*/).forEach(v => {
        const cleaned = v.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
        if (cleaned) variants.push(cleaned);
      });
    } else if (rawExpr && typeof rawExpr === 'object') {
      const enField = rawExpr.en !== undefined ? rawExpr.en : (rawExpr.expr || rawExpr.phrase || rawExpr.text || '');
      const enList = Array.isArray(enField) ? enField : [enField];
      const cleanedEn = enList.map(v => String(v || '').trim()).filter(Boolean);
      const primaryEn = cleanedEn[0] || '';
      display = rawExpr.zh && primaryEn ? `${primaryEn}（${rawExpr.zh}）` : (primaryEn || String(rawExpr.zh || '').trim());

      cleanedEn.forEach(itemStr => {
        itemStr.split(/\s*(?:\/|\||或)\s*/).forEach(v => {
          const cleaned = v.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
          if (cleaned) variants.push(cleaned);
        });
      });
      const extras = [].concat(rawExpr.alts || [], rawExpr.variants || [], rawExpr.synonyms || []);
      extras.forEach(v => {
        const cleaned = String(v || '').replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
        if (cleaned) variants.push(cleaned);
      });
    }

    if (!variants.length) return { matched: false, display };

    for (const v of variants) {
      const lowV = v.toLowerCase();
      if (lowV.length >= 3 && userNormLower.includes(lowV)) {
        return { matched: true, display: display || v };
      }
      const vWords = extractEnglishWords(lowV).map(w => w.toLowerCase());
      const content = vWords.filter(w => !STOP_WORDS.has(w) && w.length >= 2);
      const targetWords = content.length ? content : vWords;
      if (!targetWords.length) continue;

      let hits = 0;
      targetWords.forEach(tw => {
        if (userTokens.some(ut => tokensSimilar(ut, tw))) {
          hits += 1;
        }
      });
      const ratio = hits / targetWords.length;
      if (targetWords.length === 1 && hits === 1) {
        return { matched: true, display: display || v };
      }
      if (targetWords.length === 2 && hits === 2) {
        return { matched: true, display: display || v };
      }
      if (targetWords.length >= 3 && ratio >= 0.66) {
        return { matched: true, display: display || v };
      }
    }
    return { matched: false, display };
  }

  function scoreBandLabel(score) {
    const s = Number(score) || 0;
    if (s >= 13) return '14分档（卓越高分）';
    if (s >= 10) return '11分档（高分达标）';
    if (s >= 8) return '8分档（及格稳妥）';
    if (s >= 5) return '5分档（基础待强化）';
    return '2分档（建议重写打磨）';
  }

  function roundHalf(n) {
    return Math.round(n * 2) / 2;
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  /* ========================================================================
     1. OBJECTIVE GRADER (Listening / Matching / Reading / Quick Quiz)
     ======================================================================== */
  function gradeObjective(q, selectedAnswer) {
    const item = q || {};
    const expected = normalizeAnswer(
      item.answer !== undefined && item.answer !== null ? item.answer : item.answerIdx
    );
    const selected = normalizeAnswer(selectedAnswer);
    const maxScore = Number(item.maxScore) > 0 ? Number(item.maxScore) : 1;
    const correct = Boolean(expected && selected && expected === selected);
    const score = correct ? maxScore : 0;

    let feedback = '';
    if (!selected) {
      feedback = '请先选择一个选项后再提交。';
    } else if (correct) {
      feedback = item.paraphraseBridge
        ? `回答正确！锁定正确答案 ${expected}，同义替换路径：${item.paraphraseBridge}`
        : `回答正确！精准命中 ${expected}，保持节奏继续推进。`;
    } else {
      const quote = item.evidenceQuote || item.evidenceSentence || '';
      const trap = item.trapType ? `注意避开【${item.trapType}】干扰项。` : '';
      const cue = item.paraphraseBridge
        ? `核心同义定位：${item.paraphraseBridge}`
        : (quote ? `${trap}回看定位证据句：“${String(quote).slice(0, 96)}”` : `${trap}建议对照解析核对原句定位与干扰项类型。`);
      feedback = `本题应选 ${expected}（你选择了 ${selected}）。${cue}`;
    }

    return {
      correct,
      score,
      maxScore,
      selected,
      answer: expected,
      feedback
    };
  }

  /* ========================================================================
     2. BANKED CLOZE GRADER (15-choose-10 / Focused 5-blank)
     ======================================================================== */
  function gradeCloze(q, userMap) {
    const item = q || {};
    const blanks = Array.isArray(item.blanks) ? item.blanks : [];
    const wordBank = Array.isArray(item.wordBank) ? item.wordBank : [];
    const byCode = new Map();
    const byWord = new Map();

    wordBank.forEach(entry => {
      if (!entry) return;
      const code = normalizeAnswer(entry.code);
      if (code) byCode.set(code, entry);
      if (entry.word) byWord.set(String(entry.word).trim().toLowerCase(), entry);
    });

    let correctCount = 0;
    const perBlank = blanks.map((b, idx) => {
      const num = b.num != null ? b.num : (idx + 1);
      let rawUser = '';
      if (Array.isArray(userMap)) {
        rawUser = userMap[idx] != null ? userMap[idx] : '';
      } else if (userMap && typeof userMap === 'object') {
        rawUser = userMap[num] != null
          ? userMap[num]
          : (userMap[String(num)] != null ? userMap[String(num)] : (userMap[idx] != null ? userMap[idx] : ''));
      }

      const rawTrim = String(rawUser || '').trim();
      let userCode = normalizeAnswer(rawTrim);
      if (rawTrim && !byCode.has(userCode) && byWord.has(rawTrim.toLowerCase())) {
        userCode = normalizeAnswer(byWord.get(rawTrim.toLowerCase()).code);
      }

      const ansCode = normalizeAnswer(b.answer);
      const ansEntry = byCode.get(ansCode) || null;
      const userEntry = byCode.get(userCode) || null;
      const isCorrect = Boolean(ansCode && userCode && userCode === ansCode);
      if (isCorrect) correctCount += 1;

      return {
        num,
        user: userCode,
        userWord: userEntry ? userEntry.word : rawTrim,
        answer: ansCode,
        correct: isCorrect,
        word: ansEntry ? ansEntry.word : (b.word || ''),
        pos: ansEntry ? ansEntry.pos : (b.posHint || ''),
        posHint: b.posHint || (ansEntry ? ansEntry.pos : ''),
        meaning: ansEntry ? ansEntry.meaning : '',
        explain: b.explain || ''
      };
    });

    const totalCount = blanks.length;
    const maxScore = Number(item.maxScore) > 0 ? Number(item.maxScore) : (totalCount || 10);
    const ratio = totalCount > 0 ? (correctCount / totalCount) : 0;
    const score = totalCount === maxScore
      ? correctCount
      : Math.round(ratio * maxScore * 10) / 10;
    const pct = Math.round(ratio * 100);
    const passed = pct >= 60;

    const missed = perBlank.filter(x => !x.correct);
    let feedback = '';
    if (!totalCount) {
      feedback = '当前选词填空题尚未配置空格数据。';
    } else if (correctCount === totalCount) {
      feedback = `全部答对（${correctCount}/${totalCount}，100%）！词性判断与上下文搭配无懈可击。`;
    } else if (passed) {
      const missNums = missed.slice(0, 4).map(m => `#${m.num}(${m.posHint || m.pos || '核对词性'})`).join('、');
      feedback = `答对 ${correctCount}/${totalCount} 空（${pct}%，已达标）。重点复盘 ${missNums} 的语法槽位与固定搭配。`;
    } else {
      const missNums = missed.slice(0, 4).map(m => `#${m.num}`).join('、');
      feedback = `本次答对 ${correctCount}/${totalCount} 空（${pct}%）。建议先用“名词/动词/形容词/副词”四栏分流，再重点重看第 ${missNums} 空解析。`;
    }

    return {
      score,
      maxScore,
      correctCount,
      totalCount,
      pct,
      passed,
      perBlank,
      feedback
    };
  }

  /* ========================================================================
     3. TRANSLATION GRADER (0-15 CET-4 Scale)
     ======================================================================== */
  function gradeTranslation(q, userText) {
    const item = q || {};
    const raw = String(userText || '').trim();
    const norm = normalizeEnglish(raw);
    const words = extractEnglishWords(norm);
    const wordCount = words.length;
    const lowNorm = norm.toLowerCase();
    const lowerTokens = words.map(w => w.toLowerCase());

    const keyExprs = Array.isArray(item.keyExpressions) ? item.keyExpressions : [];
    const modelStr = String(item.referenceTranslation || item.modelAnswer || item.reference || item.sampleAnswer || '').trim();
    const modelWordCount = countWords(modelStr);
    const zhSourceLen = String(item.chineseText || item.sourceZh || item.chinese || item.prompt || '').replace(/[^\u4e00-\u9fff]/g, '').length;
    const expectedWords = modelWordCount >= 8
      ? modelWordCount
      : (zhSourceLen >= 20 ? Math.round(zhSourceLen * 0.72) : 28);

    // Check empty or non-English submission
    const zhCharsInUser = (raw.match(/[\u4e00-\u9fff]/g) || []).length;
    if (!raw || wordCount < 3 || (zhCharsInUser > wordCount * 2 && wordCount < 8)) {
      const missedAll = keyExprs.map(e => {
        if (typeof e === 'string') return e;
        if (!e || typeof e !== 'object') return '';
        const enPrimary = Array.isArray(e.en) ? (e.en[0] || '') : (e.en || e.expr || e.phrase || '');
        return e.zh && enPrimary ? `${enPrimary}（${e.zh}）` : (enPrimary || e.zh || '');
      }).filter(Boolean);
      return {
        score: 0,
        maxScore: 15,
        pct: 0,
        passed: false,
        bandLabel: scoreBandLabel(0),
        wordCount,
        matchedExprs: [],
        missedExprs: missedAll,
        grammarNotes: ['请用完整英文句子作答（当前未检测到足够的英文译文）。'],
        suggestions: [
          '先提取中文主谓宾主干，再用后置定语或分词短语补充修饰信息。',
          missedAll.length ? `可优先尝试嵌入核心表达：${missedAll.slice(0, 3).join(' / ')}。` : '写出完整主谓宾句式即可开始获得结构采分。'
        ],
        feedback: '当前译文有效英文词数过少，先搭出主干句子再提交评测吧。'
      };
    }

    // 1) Key Expressions Matching (supports optional per-expression weights, up to 7.5 pts)
    const matchedExprs = [];
    const missedExprs = [];
    let matchedWeight = 0;
    let totalWeight = 0;
    if (keyExprs.length > 0) {
      keyExprs.forEach(expr => {
        const res = matchKeyExpression(lowNorm, lowerTokens, expr);
        if (!res.display) return;
        const w = (expr && typeof expr === 'object' && Number(expr.weight) > 0) ? Number(expr.weight) : 1;
        totalWeight += w;
        if (res.matched) {
          matchedExprs.push(res.display);
          matchedWeight += w;
        } else {
          missedExprs.push(res.display);
        }
      });
    } else if (modelStr) {
      // Fallback: extract key content tokens from reference translation
      const modelContent = Array.from(new Set(
        extractEnglishWords(modelStr.toLowerCase()).filter(w => !STOP_WORDS.has(w) && w.length >= 4)
      )).slice(0, 8);
      modelContent.forEach(kw => {
        totalWeight += 1;
        if (lowerTokens.some(ut => tokensSimilar(ut, kw))) {
          matchedExprs.push(kw);
          matchedWeight += 1;
        } else {
          missedExprs.push(kw);
        }
      });
    }

    const exprTotal = matchedExprs.length + missedExprs.length;
    const exprRatio = totalWeight > 0 ? (matchedWeight / totalWeight) : 0.6;
    const exprScore = exprRatio * 7.5;

    // 2) Word Count & Completeness Ratio (up to 3.0 pts)
    const lenRatio = expectedWords > 0 ? (wordCount / expectedWords) : 1;
    let lengthScore = 0;
    const suggestions = [];
    if (lenRatio >= 0.72 && lenRatio <= 1.45) {
      lengthScore = 3.0;
    } else if (lenRatio >= 0.52 && lenRatio <= 1.75) {
      lengthScore = 2.1;
      suggestions.push(lenRatio < 0.72
        ? `当前译文 ${wordCount} 词偏精简（参考约 ${expectedWords} 词），注意检查是否遗漏中文修饰成分。`
        : `当前译文 ${wordCount} 词略偏长（参考约 ${expectedWords} 词），可尝试用分词或介词短语精炼句式。`);
    } else {
      lengthScore = 1.0;
      suggestions.push(`译文长度（${wordCount} 词）与参考篇幅（约 ${expectedWords} 词）偏差较大，请核对是否漏译整句。`);
    }

    // 3) Grammar, Punctuation, Capitalization & Sentence Craft (up to 4.5 pts)
    let grammarScore = 2.0;
    const grammarNotes = [];

    const startsCapital = /^[A-Z"'(]/.test(norm);
    const endsPunct = /[.!?]["']?$/.test(norm);
    if (startsCapital) grammarScore += 0.45;
    else grammarNotes.push('英文句首字母需大写。');

    if (endsPunct) grammarScore += 0.45;
    else grammarNotes.push('译文末尾建议补全英文标点（句号/问号/感叹号）。');

    // Check clause/connector richness (relative clauses, participles, transitions)
    const advancedHits = [
      /\b(?:which|that|who|where|when|whose)\b/i,
      /\b(?:while|although|though|because|since|as|if|unless|whereas)\b/i,
      /\b(?:in\s+recent\s+years|not\s+only|with\s+the\s+|in\s+order\s+to|so\s+that|as\s+well\s+as|rather\s+than)\b/i,
      /\b(?:is|are|was|were|be|been)\s+[a-z]{3,}(?:ed|en|wn|ht|lt)\b/i,
      /,\s*[a-z]{3,}ing\b/i
    ].filter(rx => rx.test(norm)).length;
    grammarScore += Math.min(1.6, advancedHits * 0.55);

    // Check Chinglish / structural errors
    let penalty = 0;
    CHINGLISH_RULES.forEach(rule => {
      if (rule.re.test(norm)) {
        grammarNotes.push(rule.note);
        penalty += 0.65;
      }
    });
    if (/\bi\b/.test(norm)) {
      grammarNotes.push('第一人称代词 I 在英文中始终需要大写。');
      penalty += 0.3;
    }
    if (zhCharsInUser > 0) {
      grammarNotes.push('译文中混入了中文字符，请统一替换为英文表达。');
      penalty += 0.8;
    }

    // Low lexical diversity check (spamming same word)
    const uniqueRatio = wordCount > 0 ? (new Set(lowerTokens).size / wordCount) : 0;
    if (wordCount >= 10 && uniqueRatio < 0.42) {
      grammarNotes.push('用词重复度偏高，建议避免重复堆砌同一词组。');
      penalty += 1.5;
    }

    grammarScore = clamp(grammarScore - penalty, 0, 4.5);

    const rawScore = clamp(exprScore + lengthScore + grammarScore, 0, 15);
    const score = roundHalf(rawScore);
    const pct = Math.round((score / 15) * 100);
    const passed = score >= 9;
    const bandLabel = scoreBandLabel(score);

    if (missedExprs.length > 0) {
      suggestions.push(`可优先补充这些核心踩分表达：${missedExprs.slice(0, 4).join('、')}。`);
    }
    if (advancedHits === 0 && wordCount >= 12) {
      suggestions.push('尝试把偏长的中文定语转化为 which/that 定语从句或介词后置短语（如 with a history of...），档次更稳。');
    }
    if (!grammarNotes.length) {
      grammarNotes.push('大小写、句末标点与基础句法结构规范，未检测到典型中式英语错误。');
    }

    const feedback = score >= 12
      ? `翻译质量出色（${score}/15，${bandLabel}）！命中 ${matchedExprs.length}/${exprTotal || 0} 处核心表达，句法自然流畅。`
      : (passed
        ? `翻译达到四级稳妥档（${score}/15，${bandLabel}），已命中 ${matchedExprs.length}/${exprTotal || 0} 处核心词组，补齐遗漏表达可冲 12+。`
        : `当前得分 ${score}/15（${bandLabel}），核心表达命中 ${matchedExprs.length}/${exprTotal || 0} 处。建议先对照参考译文拆解主干再复写一遍。`);

    return {
      score,
      maxScore: 15,
      pct,
      passed,
      bandLabel,
      wordCount,
      matchedExprs,
      missedExprs,
      grammarNotes,
      suggestions,
      feedback
    };
  }

  /* ========================================================================
     4. WRITING GRADER (0-15 CET-4 Scale, 4 Dimensions)
     ======================================================================== */
  function extractTopicKeywords(q) {
    const out = new Set();
    const explicit = [].concat(q.topicKeywords || [], q.keywords || []);
    explicit.forEach(k => {
      extractEnglishWords(String(k || '').toLowerCase()).forEach(w => {
        if (w.length >= 3 && !STOP_WORDS.has(w)) out.add(w);
      });
    });
    if (out.size < 4) {
      const src = [q.directions, q.promptEn, q.prompt, q.title, q.modelEssay].filter(Boolean).join(' ');
      extractEnglishWords(src.toLowerCase()).forEach(w => {
        if (w.length >= 4 && !STOP_WORDS.has(w)) out.add(w);
      });
    }
    return Array.from(out).slice(0, 22);
  }

  function gradeWriting(q, userText) {
    const item = q || {};
    const raw = String(userText || '').trim();
    const norm = normalizeEnglish(raw);
    const words = extractEnglishWords(norm);
    const wordCount = words.length;
    const lowerTokens = words.map(w => w.toLowerCase());
    const paragraphs = raw
      .split(/\r?\n\s*\r?\n|\r?\n/)
      .map(p => p.trim())
      .filter(p => extractEnglishWords(p).length >= 3);
    const paraCount = paragraphs.length || (wordCount > 0 ? 1 : 0);

    if (!raw || wordCount < 15) {
      return {
        score: wordCount >= 6 ? 1.5 : 0,
        maxScore: 15,
        pct: wordCount >= 6 ? 10 : 0,
        passed: false,
        bandLabel: scoreBandLabel(0),
        wordCount,
        paraCount,
        dimensions: { content: 0, structure: 0, language: 0, length: 0 },
        matchedPatterns: [],
        missedTips: [
          '四级作文标准字数为 120–180 词，当前字数明显不足。',
          '建议按三段式动笔：第一段亮明观点（约35词）+ 第二段双论据/例证（约85词）+ 第三段建议升华（约35词）。'
        ],
        suggestions: ['先套用上方可迁移句型卡片搭起三段骨架，再补充校园或生活具体例子。'],
        grammarNotes: ['正文内容过短，暂无法进行完整句式评测。'],
        feedback: `当前仅检测到 ${wordCount} 个英文词，距离四级 120–180 词标准线差距较大，先搭好三段框架吧！`
      };
    }

    // Dimension 1: Length (0..3)
    let lengthDim = 0;
    const missedTips = [];
    const suggestions = [];
    if (wordCount >= 120 && wordCount <= 185) {
      lengthDim = 3.0;
    } else if ((wordCount >= 105 && wordCount < 120) || (wordCount > 185 && wordCount <= 215)) {
      lengthDim = 2.4;
      missedTips.push(wordCount < 120
        ? `字数 ${wordCount} 词接近达标，再补 1–2 句细节论证即可进入 120–180 词黄金区间。`
        : `字数 ${wordCount} 词略超 180 词上限，考场建议精炼冗余表述以留出检查时间。`);
    } else if (wordCount >= 80 && wordCount < 105) {
      lengthDim = 1.6;
      missedTips.push(`当前 ${wordCount} 词偏短（四级要求不少于 120 词），容易在字数档位扣分。`);
    } else if (wordCount > 215) {
      lengthDim = 1.9;
      missedTips.push(`当前 ${wordCount} 词偏长，建议控制在 120–180 词以减少语法失误风险。`);
    } else {
      lengthDim = 0.8;
      missedTips.push(`当前仅 ${wordCount} 词，明显低于四级 120 词最低要求。`);
    }

    // Dimension 2: Structure & Cohesion (0..4)
    let structureDim = 0;
    if (paraCount === 3 || paraCount === 4) {
      structureDim += 2.2;
    } else if (paraCount === 2) {
      structureDim += 1.3;
      missedTips.push('当前仅分了 2 段，四级阅卷最青睐清晰的“三段式”（点题 -> 双论据 -> 总结建议）。');
    } else {
      structureDim += 0.6;
      missedTips.push(paraCount <= 1
        ? '全文挤在 1 个段落里（缺乏分段），务必按“引入-论证-结论”拆分为 3 段！'
        : `当前分段较多（${paraCount} 段），建议合并为紧凑的 3–4 段。`);
    }

    let transHits = 0;
    Object.keys(TRANSITION_GROUPS).forEach(k => {
      if (TRANSITION_GROUPS[k].test(norm)) transHits += 1;
    });
    structureDim += Math.min(1.8, transHits * 0.5);
    if (transHits < 2) {
      missedTips.push('段落间逻辑衔接词偏少，建议加入 First and foremost / Furthermore / However / In conclusion。');
    }
    structureDim = clamp(roundHalf(structureDim), 0, 4);

    // Dimension 3: Content & Topic Relevance (0..4)
    const topicKws = extractTopicKeywords(item);
    let kwHits = 0;
    topicKws.forEach(kw => {
      if (lowerTokens.some(ut => tokensSimilar(ut, kw))) kwHits += 1;
    });
    const sentences = norm.split(/[.!?]+/).map(s => s.trim()).filter(s => countWords(s) >= 4);
    const sentCount = sentences.length;
    const uniqueTokens = new Set(lowerTokens);
    const ttr = wordCount > 0 ? (uniqueTokens.size / wordCount) : 0;

    let contentDim = 1.2;
    if (topicKws.length > 0) {
      const hitTarget = Math.min(5, Math.max(2, Math.ceil(topicKws.length * 0.25)));
      contentDim += Math.min(1.6, (kwHits / hitTarget) * 1.6);
      if (kwHits < 2) {
        missedTips.push('切题关键词出现较少，注意首尾段紧扣题干核心主题词展开。');
      }
    } else {
      contentDim += 1.2;
    }
    if (sentCount >= 6 && sentCount <= 15) contentDim += 0.8;
    else if (sentCount >= 4) contentDim += 0.45;
    else missedTips.push('完整句数量偏少，主体段建议用“主题句 + 解释 + 实例”展开。');

    if (ttr >= 0.48) contentDim += 0.4;
    else if (ttr < 0.38) {
      contentDim -= 0.7;
      missedTips.push('词汇重复度较高，注意避免机械重复同一句话凑字数。');
    }
    contentDim = clamp(roundHalf(contentDim), 0, 4);

    // Dimension 4: Language, Transferable Patterns & Grammar (0..4)
    const matchedPatterns = [];
    WRITING_PATTERNS.forEach(p => {
      if (p.re.test(norm)) matchedPatterns.push(p.label);
    });
    const customPatterns = [].concat(item.transferablePatterns || [], item.patterns || [], item.highScorePhrases || []);
    customPatterns.forEach(cp => {
      const res = matchKeyExpression(norm.toLowerCase(), lowerTokens, cp);
      if (res.matched && res.display && !matchedPatterns.includes(res.display)) {
        matchedPatterns.push(res.display);
      }
    });

    const longWords = lowerTokens.filter(w => w.length >= 7 && !STOP_WORDS.has(w));
    const uniqueLongWords = new Set(longWords).size;
    const clauseHits = (norm.match(/\b(?:which|that|who|where|when|while|although|though|because|since|whereas|whether|if)\b/gi) || []).length;

    let languageDim = 1.0;
    languageDim += Math.min(1.3, matchedPatterns.length * 0.35);
    languageDim += Math.min(0.85, (uniqueLongWords / 12) * 0.85);
    languageDim += Math.min(0.85, (clauseHits / 4) * 0.85);

    const grammarNotes = [];
    let langPenalty = 0;
    CHINGLISH_RULES.forEach(rule => {
      if (rule.re.test(norm)) {
        grammarNotes.push(rule.note);
        langPenalty += 0.45;
      }
    });
    if (/\bi\b/.test(norm)) {
      grammarNotes.push('检测到小写独立代词 i，请改为大写 I。');
      langPenalty += 0.25;
    }
    const zhInEssay = (raw.match(/[\u4e00-\u9fff]/g) || []).length;
    if (zhInEssay > 0) {
      grammarNotes.push('作文中混有中文字符，请全部替换为英文表达。');
      langPenalty += 0.8;
    }
    if (!/[.!?]["']?$/.test(norm)) {
      grammarNotes.push('结尾句缺少英文句号。');
      langPenalty += 0.2;
    }

    languageDim = clamp(roundHalf(languageDim - langPenalty), 0, 4);

    if (matchedPatterns.length < 2) {
      suggestions.push('可在开头与结论处嵌入 1–2 个高分迁移句型（如 There is no denying that... / Only in this way can...）。');
    }
    if (uniqueLongWords < 6) {
      suggestions.push('可替换部分基础词为四级高频亮点词（如 important -> crucial / beneficial / indispensable）。');
    }
    if (clauseHits < 2) {
      suggestions.push('主体段可加入定语从句（which...）或让步状语从句（while/although...）提升句式多样性。');
    }
    if (!grammarNotes.length) {
      grammarNotes.push('行文流畅，未发现典型中式英语语法硬伤。');
    }

    const score = clamp(roundHalf(contentDim + structureDim + languageDim + lengthDim), 0, 15);
    const pct = Math.round((score / 15) * 100);
    const passed = score >= 9;
    const bandLabel = scoreBandLabel(score);

    const feedback = score >= 12.5
      ? `作文表现非常优秀（${score}/15，${bandLabel}）！篇幅 ${wordCount} 词、${paraCount} 段结构清晰，命中 ${matchedPatterns.length} 处高分句型。`
      : (passed
        ? `作文达到四级稳过水准（${score}/15，${bandLabel}），当前 ${wordCount} 词 / ${paraCount} 段。优化衔接词与高级搭配即可冲击 12+ 高分档。`
        : `当前作文预估 ${score}/15（${bandLabel}），${wordCount} 词 / ${paraCount} 段。建议先对照下方失分提醒补齐字数、三段结构与高频连接词。`);

    return {
      score,
      maxScore: 15,
      pct,
      passed,
      bandLabel,
      wordCount,
      paraCount,
      dimensions: {
        content: contentDim,
        structure: structureDim,
        language: languageDim,
        length: lengthDim
      },
      matchedPatterns,
      missedTips,
      suggestions,
      grammarNotes,
      feedback
    };
  }

  const Cet4Grader = {
    gradeObjective,
    gradeCloze,
    gradeTranslation,
    gradeWriting,
    countWords,
    normalizeAnswer,
    scoreBandLabel
  };

  if (typeof global !== 'undefined' && global) {
    global.Cet4Grader = Cet4Grader;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cet4Grader;
  }
})(typeof window !== 'undefined' ? window : globalThis);
