/* ==========================================================================
   Xiao Ke (小克) Frameless Draggable 10-Sprite Study Companion
   (window.XiaoKeAssistant)
   - Wired to ALL 10 sprites in window.XIAOKE_SPRITES + window.XIAOKE_MANIFEST
   - Contextual view/skill/audio/theme/streak auto-switching across all 5 views
   - Progressive 3-stage non-spoiler hint system (hintSteps[0..2])
   - Proactive wrong-answer coaching, celebrations, vocab events & idle hints
   - Interactive quick-action popover & 10-sprite gallery showcase modal
   - Smooth pointer drag with viewport clamp & mobile-safe bottom-nav clearance
   ========================================================================== */
(function (global) {
  'use strict';

  const DEFAULT_IDLE_FIRST_MS = 22000;
  const DEFAULT_IDLE_SECOND_MS = 28000;

  const DEFAULT_SPRITES_META = [
    {
      id: '01_idle_smile',
      zh_label: '微笑待机',
      en_label: 'Idle Smile',
      mood: 'idle',
      speech_lines: [
        '你好呀，我是小克！14天内速通四级计划已经就绪，我们一起稳稳拿高分。',
        '高频词带背、听力抓转折信号、阅读排五大陷阱，一步一步来我陪着你。'
      ]
    },
    {
      id: '02_study_reading',
      zh_label: '专注阅读',
      en_label: 'Study Reading',
      mood: 'study',
      speech_lines: [
        '沉浸精读模式开启！先划定位词再回文核对同义改写，效率翻倍。',
        '选词填空先标词性再看搭配，长篇阅读盯紧年份、专名和稀缺词。'
      ]
    },
    {
      id: '03_thinking_hint',
      zh_label: '思考提示',
      en_label: 'Thinking Hint',
      mood: 'hint',
      speech_lines: [
        '唔，遇到卡壳的地方了吗？点我给你一条不剧透的破题线索。',
        '先排除词性或时态明显不符的选项，剩下的答案往往一眼就能锁住。'
      ]
    },
    {
      id: '04_cheer_correct',
      zh_label: '答对欢呼',
      en_label: 'Cheer Correct',
      mood: 'cheer',
      speech_lines: [
        '太漂亮啦！这一题稳稳拿下，按这个节奏四级高分板上钉钉！',
        '答得干净利落，核心考点已经被你牢牢装进记忆库啦。'
      ]
    },
    {
      id: '05_encourage_wrong',
      zh_label: '温柔鼓励',
      en_label: 'Encourage',
      mood: 'encourage',
      speech_lines: [
        '没关系，现在踩过的坑考场上就绝不会再掉进去！我们一起把解析拆透。',
        '别气馁，艾宾浩斯曲线最欢迎这种及时纠错，已经帮你记入攻坚列表啦。'
      ]
    },
    {
      id: '06_writing_quill',
      zh_label: '提笔写作',
      en_label: 'Writing Quill',
      mood: 'writing',
      speech_lines: [
        '作文三段式黄金配额：点题 35 词 + 双论据例证 85 词 + 建议升华 35 词。',
        '汉译英记住先找主谓宾主干，再把长定语后置成介词短语或定语从句。'
      ]
    },
    {
      id: '07_listening_audio',
      zh_label: '听力练耳',
      en_label: 'Listening Audio',
      mood: 'listening',
      speech_lines: [
        '听力练耳开启！放音前先扫选项划实词，听到 but / however 立刻拉满注意力。',
        '跟读语音带背，让耳朵提前熟悉高频词发音，考场秒抓同义替换。'
      ]
    },
    {
      id: '08_sleepy_rest',
      zh_label: '小憩护眼',
      en_label: 'Sleepy Rest',
      mood: 'rest',
      speech_lines: [
        '烛光护眼模式已开启，晚间冲刺也要记得每隔半小时远眺放松眼睛。',
        '劳逸结合记忆更牢，喝口温水歇两分钟，小克再陪你冲下一关。'
      ]
    },
    {
      id: '09_proud_streak',
      zh_label: '连击得意',
      en_label: 'Proud Streak',
      mood: 'proud',
      speech_lines: [
        '哼哼，连击达成！我就知道你绝对是四级学霸潜力股！',
        '今天的冲刺节奏闪闪发光，照这样下去轻松过线完全没压力！'
      ]
    },
    {
      id: '10_eureka_tip',
      zh_label: '灵光考点',
      en_label: 'Eureka Tip',
      mood: 'eureka',
      speech_lines: [
        '灵光一闪！四级干扰项最爱玩“原词重现”和“绝对词偷换”，千万别上当！',
        '抓住同义替换和高频易混词辨析，阅读与听力直接省一半时间。'
      ]
    }
  ];

  const SPRITE_IDS = DEFAULT_SPRITES_META.map(s => s.id);

  const MOOD_ALIAS = {
    idle: '01_idle_smile',
    welcome: '01_idle_smile',
    smile: '01_idle_smile',
    study: '02_study_reading',
    reading: '02_study_reading',
    book: '02_study_reading',
    think: '03_thinking_hint',
    hint: '03_thinking_hint',
    cheer: '04_cheer_correct',
    correct: '04_cheer_correct',
    happy: '04_cheer_correct',
    encourage: '05_encourage_wrong',
    wrong: '05_encourage_wrong',
    oops: '05_encourage_wrong',
    writing: '06_writing_quill',
    translation: '06_writing_quill',
    quill: '06_writing_quill',
    listening: '07_listening_audio',
    audio: '07_listening_audio',
    speech: '07_listening_audio',
    rest: '08_sleepy_rest',
    sleep: '08_sleepy_rest',
    sleepy: '08_sleepy_rest',
    dark: '08_sleepy_rest',
    proud: '09_proud_streak',
    streak: '09_proud_streak',
    celebrate: '09_proud_streak',
    eureka: '10_eureka_tip',
    tip: '10_eureka_tip',
    trap: '10_eureka_tip'
  };

  const FALLBACK_MANTRAS = [
    { spriteId: '07_listening_audio', tag: '听力口诀', mantra: '未听先知扫选项，转折后面出真相；原词照搬多是坑，同义改写才是王。' },
    { spriteId: '02_study_reading', tag: '选词口诀', mantra: '15词先分四词性，空前空后定槽位；搭配色彩排干扰，八秒稳锁唯一解。' },
    { spriteId: '10_eureka_tip', tag: '长篇口诀', mantra: '先看题干划锚点，年份专名最抢眼；扫读段落找替身，双词锁定不用全。' },
    { spriteId: '03_thinking_hint', tag: '阅读口诀', mantra: '题文同序找证据，五大陷阱逐一排：偷换绝对过度推，张冠李戴无中来。' },
    { spriteId: '06_writing_quill', tag: '翻译口诀', mantra: '中文长句先抽干，主谓宾稳再扩边；长定后置介词挂，分词从句提档次。' },
    { spriteId: '09_proud_streak', tag: '作文口诀', mantra: '三段骨架配好词，一百五十字最值；连接芯片串逻辑，首尾呼应稳十四。' }
  ];

  const FONT_SANS = '"PingFang SC", "Microsoft YaHei UI", "HarmonyOS Sans SC", system-ui, sans-serif';

  /* -------------------- Text & Non-Spoiler Helpers -------------------- */
  function escHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function ensureEndPunct(s) {
    const t = String(s || '').replace(/\s+/g, ' ').trim();
    if (!t) return '';
    const last = t.charAt(t.length - 1);
    if ('。！？!'.indexOf(last) !== -1) return t;
    if ('；;，,：:'.indexOf(last) !== -1) return t.slice(0, -1) + '。';
    return t + '。';
  }

  function splitSentences(raw) {
    const src = String(raw || '').replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!src) return [];
    const out = [];
    let start = 0;
    const closers = '）)」』”"\'】]';
    for (let i = 0; i < src.length; i++) {
      const ch = src[i];
      if (ch === '。' || ch === '！' || ch === '？' || ch === '!') {
        let end = i + 1;
        while (end < src.length && closers.indexOf(src[end]) !== -1) end += 1;
        const piece = src.slice(start, end).trim();
        if (piece) out.push(piece);
        start = end;
        i = end - 1;
      }
    }
    const tail = src.slice(start).trim();
    if (tail) out.push(ensureEndPunct(tail));
    return out;
  }

  function completeSentences(raw, maxSentences = 2, softMaxChars = 150) {
    const list = splitSentences(raw);
    if (!list.length) return '';
    const picked = [];
    let len = 0;
    for (let i = 0; i < list.length; i++) {
      if (picked.length >= maxSentences) break;
      if (picked.length > 0 && len + list[i].length > softMaxChars) break;
      picked.push(ensureEndPunct(list[i]));
      len += list[i].length;
    }
    return picked.join('');
  }

  // Sanitizes hints so pre-answer coaching never leaks the final option letter
  function cleanNonSpoiler(raw, q) {
    let s = String(raw || '').replace(/\s+/g, ' ').trim();
    if (!s) return '';
    s = s.replace(/[，,；;。]?\s*(?:因此|所以|故|从而|于是|最终)?\s*(?:本题|该题|这里|此空)?\s*(?:应选|选择|选定|锁定|答案为?|对应|匹配)\s*(?:选项|段落)?\s*[A-O](?:\s*[（(][^）)]*[）)])?\s*[。！!]*$/gi, '。');
    s = s.replace(/(?:正确答案|答案)\s*(?:为|是|选)\s*[A-O]\b/gi, '正确方向需回文核对');
    if (q && q.answer && typeof q.answer === 'string' && q.answer.length === 1) {
      const letter = q.answer.toUpperCase();
      s = s.replace(new RegExp(`(?:直接)?选\\s*${letter}(?![a-zA-Z])`, 'g'), '锁定同义项');
    }
    s = s.replace(/。\s*。+/g, '。').replace(/^[，,；;。\s]+/, '').trim();
    return ensureEndPunct(s);
  }

  function resolveSpriteId(input) {
    if (!input) return '01_idle_smile';
    const raw = String(input).trim();
    if (SPRITE_IDS.includes(raw)) return raw;
    const low = raw.toLowerCase();
    if (MOOD_ALIAS[low]) return MOOD_ALIAS[low];
    const partial = SPRITE_IDS.find(id => id.toLowerCase().includes(low));
    return partial || '01_idle_smile';
  }

  function getSpriteCatalog() {
    const manifest = global.XIAOKE_MANIFEST;
    if (manifest && Array.isArray(manifest.sprites) && manifest.sprites.length) {
      return manifest.sprites;
    }
    return DEFAULT_SPRITES_META;
  }

  function getSpriteMeta(spriteId) {
    const id = resolveSpriteId(spriteId);
    const cat = getSpriteCatalog();
    return cat.find(s => s.id === id) || DEFAULT_SPRITES_META[0];
  }

  function resolveSpriteSrc(spriteId) {
    const id = resolveSpriteId(spriteId);
    const b64Map = global.XIAOKE_SPRITES;
    if (b64Map && typeof b64Map[id] === 'string' && b64Map[id].length > 20) {
      return b64Map[id];
    }
    const meta = getSpriteMeta(id);
    if (meta && meta.file) return './' + meta.file.replace(/^\.?\//, '');
    return `./assets/xiaoke/sprites/${id}.png`;
  }

  /* -------------------- Contextual Sprite & Hint Intelligence -------------------- */
  function getActiveQuestion(ctx) {
    if (!ctx) return null;
    if (ctx.activeQuestion) return ctx.activeQuestion;
    if (ctx.question) return ctx.question;
    if (ctx.practiceItem && ctx.practiceItem.question) return ctx.practiceItem.question;
    return null;
  }

  function isQuestionAnswered(ctx) {
    if (!ctx) return false;
    if (ctx.answered === true) return true;
    if (ctx.practiceItem && ctx.practiceItem.answered === true) return true;
    return false;
  }

  function getBaselineSprite(ctx, isDarkFn) {
    const dark = (ctx && ctx.theme === 'dark') || (typeof isDarkFn === 'function' && isDarkFn());
    if (ctx) {
      if (ctx.audioPlaying || (global.Cet4Speech && typeof global.Cet4Speech.isSpeaking === 'function' && global.Cet4Speech.isSpeaking())) {
        return '07_listening_audio';
      }
      if (ctx.streak >= 3 && ctx.justAnsweredCorrect) return '09_proud_streak';

      const view = ctx.view || 'knowledge';
      const q = getActiveQuestion(ctx);
      const skill = ctx.skill || (q && (q.skill || q.type)) || '';
      const secId = ctx.sectionId || ctx.activeSection || '';

      if (view === 'practice') {
        if (skill === 'listening') return '07_listening_audio';
        if (skill === 'writing' || skill === 'translation') return '06_writing_quill';
        if (skill === 'reading' || skill === 'matching' || skill === 'cloze') return '02_study_reading';
      }
      if (view === 'vocab') {
        if (ctx.vocabMode === 'recite' || ctx.vocabMode === 'audio_quiz' || ctx.vocabMode === 'audio') {
          return '07_listening_audio';
        }
        if (ctx.vocabMode === 'confusable') return '10_eureka_tip';
        return '02_study_reading';
      }
      if (view === 'knowledge') {
        if (secId.includes('listen')) return '07_listening_audio';
        if (secId.includes('write') || secId.includes('trans')) return '06_writing_quill';
        if (secId.includes('trap')) return '10_eureka_tip';
        if (secId) return '02_study_reading';
      }
      if (view === 'notebook') {
        const wrongCnt = ctx.notebookSummary ? ctx.notebookSummary.wrongCount : (ctx.wrongCount || 0);
        return wrongCnt > 0 ? '05_encourage_wrong' : '09_proud_streak';
      }
      if (view === 'mastery') {
        const overall = ctx.masterySummary ? ctx.masterySummary.overall : (ctx.overallPct || 0);
        return overall >= 75 ? '09_proud_streak' : '10_eureka_tip';
      }
    }
    return dark ? '08_sleepy_rest' : '01_idle_smile';
  }

  function buildContextKey(ctx) {
    if (!ctx) return 'none';
    const view = ctx.view || 'knowledge';
    if (view === 'practice') {
      const q = getActiveQuestion(ctx);
      const ans = isQuestionAnswered(ctx) ? '1' : '0';
      return `p:${q ? q.id : 'idle'}:${ans}`;
    }
    if (view === 'vocab') {
      const wId = ctx.vocabWord && ctx.vocabWord.id ? ctx.vocabWord.id : '';
      return `v:${ctx.vocabMode || 'recite'}:${ctx.vocabDay || 1}:${wId}`;
    }
    if (view === 'knowledge') {
      return `k:${ctx.sectionId || ctx.activeSection || ''}`;
    }
    return `view:${view}`;
  }

  function getHintForContext(ctx, stageIdx = 0) {
    const view = (ctx && ctx.view) || 'knowledge';
    const details = global.EXPLAIN_DETAILS || {};
    const summaries = global.TOPIC_SUMMARIES || {};
    const q = getActiveQuestion(ctx);

    // 1) Active question in Practice View -> Progressive 3-stage non-spoiler hints!
    if (view === 'practice' && q) {
      const det = details[q.id] || null;
      const sumKey = q.skill === 'listening' ? 'listen' : (q.skill || q.type || '');
      const sum = summaries[sumKey] || summaries[q.skill] || null;
      const answered = isQuestionAnswered(ctx);

      if (answered) {
        const pit = det && det.pitfall
          ? completeSentences(det.pitfall, 1, 130)
          : (sum && sum.trapWarning ? ensureEndPunct(sum.trapWarning) : '趁热回顾本题的同义替换和定位句，再切下一题！');
        return {
          spriteId: '10_eureka_tip',
          tag: '复盘划重点',
          lines: [pit, '点开右侧深度分步解析可以把高频词一起收进手账。']
        };
      }

      const rawSteps = Array.isArray(q.hintSteps) && q.hintSteps.length ? q.hintSteps : null;
      const stage = stageIdx % 3;
      if (rawSteps) {
        const chosen = rawSteps[Math.min(stage, rawSteps.length - 1)];
        const safeLine = cleanNonSpoiler(chosen, q);
        const sprite = stage === 2 ? '10_eureka_tip' : '03_thinking_hint';
        const footerCue = stage === 0
          ? '先按这条切入点自己推 5 秒，还拿不准再点我看第 2 级提示。'
          : (stage === 1
            ? '再结合句法结构或上下文转折词排除两个干扰项！'
            : '这是第 3 级关键避坑线索，试着果断作答验证思路吧！');
        return {
          spriteId: sprite,
          tag: `思路提示 ${stage + 1}/3`,
          lines: [safeLine, footerCue]
        };
      }

      // Synthesize 3 non-spoiler stages from EXPLAIN_DETAILS & TOPIC_SUMMARIES
      const stage0 = det && det.why
        ? cleanNonSpoiler(completeSentences(det.why, 1, 130), q)
        : (sum && sum.formula ? ensureEndPunct(`核心口诀：${sum.formula}`) : '先审清题干关键词，定位到对应原文句子再做比对。');
      const stage1 = det && Array.isArray(det.steps) && det.steps[0]
        ? cleanNonSpoiler(completeSentences(det.steps[0], 1, 130), q)
        : (sum && Array.isArray(sum.quickTips) && sum.quickTips[0] ? ensureEndPunct(sum.quickTips[0]) : '优先排除绝对化表述和原文未提及的干扰项。');
      const stage2 = det && det.pitfall
        ? cleanNonSpoiler(completeSentences(det.pitfall, 1, 130), q)
        : (sum && sum.trapWarning ? ensureEndPunct(`避坑提醒：${sum.trapWarning}`) : '留意同义替换而不是表面原词照搬！');
      const pool = [
        { spriteId: '03_thinking_hint', tag: '思路提示 1/3', lines: [stage0] },
        { spriteId: '03_thinking_hint', tag: '破题步骤 2/3', lines: [stage1] },
        { spriteId: '10_eureka_tip', tag: '避坑线索 3/3', lines: [stage2] }
      ];
      return pool[stage];
    }

    // 2) Vocab Sprint View
    if (view === 'vocab') {
      const w = ctx && ctx.vocabWord ? ctx.vocabWord : null;
      const tips = [
        {
          spriteId: '07_listening_audio',
          tag: '带背节奏 1/3',
          lines: [
            w && w.word
              ? `正在背「${w.word}」${w.roots ? `，词根助记：${completeSentences(w.roots, 1, 90)}` : '，先跟着读音大声跟读两遍！'}`
              : '开启「语音带背」双手解放跟读，每天 25–30 个真题高频词，12 天滚雪球牢牢记住！'
          ]
        },
        {
          spriteId: '02_study_reading',
          tag: '三态记忆 2/3',
          lines: [
            '刷词卡片遇到“不认识”放心点红键，系统会 +3 词后立刻重现，趁热打铁最管用。',
            w && w.mnemonic ? ensureEndPunct(`小克巧记：${w.mnemonic}`) : '优先背熟词根、搭配和真题例句里的核心语境。'
          ]
        },
        {
          spriteId: '10_eureka_tip',
          tag: '练耳辨析 3/3',
          lines: [
            '背完一组词后，切换「听音选义」开盲听练耳朵，再刷一遍「易混词对决」，阅读选词双提分！'
          ]
        }
      ];
      return tips[stageIdx % tips.length];
    }

    // 3) Knowledge View
    if (view === 'knowledge') {
      const sec = ctx && (ctx.sectionObj || ctx.activeSectionObj) ? (ctx.sectionObj || ctx.activeSectionObj) : null;
      const title = sec ? (sec.title || '本节') : '当前精讲';
      const tips = [
        {
          spriteId: '02_study_reading',
          tag: '本节精要 1/3',
          lines: [
            sec && sec.mantra
              ? ensureEndPunct(`${title}口诀：${sec.mantra}`)
              : `学习「${title}」时按“破题精讲 -> 互动微实操 -> 60fps 动画”三步走，吸收最快。`
          ]
        },
        {
          spriteId: '10_eureka_tip',
          tag: '动画实验室 2/3',
          lines: [
            '每节下方的 60fps 交互动画都支持单步追踪、点击画布元素与全屏放大，边点边记不易忘！'
          ]
        },
        {
          spriteId: '04_cheer_correct',
          tag: '打卡冲刺 3/3',
          lines: [
            '看完精讲别忘了做完微实操并打卡本节，直接跳转对应题型专项刷题效果最好。'
          ]
        }
      ];
      return tips[stageIdx % tips.length];
    }

    // 4) Mastery Radar View
    if (view === 'mastery') {
      const ms = (ctx && ctx.masterySummary) || {};
      const overall = typeof ms.overall === 'number' ? ms.overall : 0;
      const weak = ms.weakestName || (Array.isArray(ms.weakest) && ms.weakest[0] ? ms.weakest[0].name : '');
      return {
        spriteId: overall >= 75 ? '09_proud_streak' : '10_eureka_tip',
        tag: '冲刺雷达诊断',
        lines: [
          weak
            ? `当前综合冲刺就绪度 ${overall}%，最值得优先拉分的是「${weak}」，点卡片即可直达专项精练！`
            : `当前综合冲刺就绪度 ${overall}%。保持每日高频词带背 + 弱项专项练习，14 天内稳步跃升。`
        ]
      };
    }

    // 5) Notebook View
    if (view === 'notebook') {
      const nb = (ctx && ctx.notebookSummary) || {};
      const wrongCnt = nb.wrongCount || 0;
      const vocabCnt = nb.fuzzyVocabCount || 0;
      if (wrongCnt > 0 || vocabCnt > 0) {
        return {
          spriteId: '05_encourage_wrong',
          tag: '手账清零计划',
          lines: [
            `手账中待攻克错题 ${wrongCnt} 道、生词/模糊词 ${vocabCnt} 个。`,
            '错题重做答对后会自动移出，生词可直接一键拉起语音带背清零！'
          ]
        };
      }
      return {
        spriteId: '09_proud_streak',
        tag: '手账已清零',
        lines: ['太棒啦！错题与生词都已清零，去刷几道高频真题保持手感吧！']
      };
    }

    return {
      spriteId: '01_idle_smile',
      tag: '小克伴学助手',
      lines: ['点我可以获取当前页面的专属冲刺提示，也可以按住我拖动到顺手的位置。']
    };
  }

  function buildWrongCoach(q, extra = {}) {
    const details = global.EXPLAIN_DETAILS || {};
    const det = q && q.id ? details[q.id] : null;
    const evalReport = extra && extra.evalReport ? extra.evalReport : null;
    const skill = q ? (q.skill || q.type || '') : '';
    const lines = [];

    if (skill === 'listening') {
      lines.push('听力这题没选对没关系！再重播一遍音频，重点盯住转折词（but / however / actually）后面的句子。');
      if (q.paraphraseBridge) lines.push(ensureEndPunct(`关键同义替换：${q.paraphraseBridge}`));
    } else if (skill === 'cloze') {
      lines.push('选词填空别急着凭语感硬猜，先对照词性标签把每个空的 n./v./adj./adv. 槽位核对一遍！');
      if (evalReport && Array.isArray(evalReport.perBlank)) {
        const missed = evalReport.perBlank.filter(b => !b.correct).slice(0, 3);
        if (missed.length) {
          lines.push(`优先复盘第 ${missed.map(m => '#' + m.num + '(' + (m.posHint || m.pos || '词性') + ')').join('、')} 空。`);
        }
      }
    } else if (skill === 'matching') {
      lines.push('长篇匹配出错通常是被段落里的“高频主题词”带偏啦，回到题干抓年份、专名或生僻词再核对同义改写。');
    } else if (skill === 'reading') {
      const trapStr = q.trapType ? `这题藏着经典的【${q.trapType}】陷阱！` : '这题踩进了四级经典干扰项陷阱！';
      lines.push(`${trapStr}对照定位证据句逐词比对主语和修饰范围，下次一眼识破。`);
    } else if (skill === 'translation') {
      if (evalReport && Array.isArray(evalReport.missedExprs) && evalReport.missedExprs.length) {
        lines.push(`本次翻译暂得 ${evalReport.score}/15 分，先补上这些核心踩分表达：${evalReport.missedExprs.slice(0, 3).join('、')}。`);
      } else {
        lines.push('汉译英先稳住主谓宾骨架，再把长定语后置，对照参考译文的拆句步骤改写一遍吧！');
      }
    } else if (skill === 'writing') {
      if (evalReport && Array.isArray(evalReport.missedTips) && evalReport.missedTips.length) {
        lines.push(`作文预估 ${evalReport.score}/15 分，优先改进：${completeSentences(evalReport.missedTips[0], 1, 110)}`);
      } else {
        lines.push('作文记住三段结构 + 120–180 词黄金区间 + 3 枚高分连接词，按评分建议润色一下立马提档！');
      }
    } else {
      lines.push('这题暂时答错没关系，已经自动收进错题手账，看懂解析再重练一遍就会移出。');
    }

    if (lines.length < 2 && det && det.pitfall) {
      lines.push(ensureEndPunct(`考场避坑：${completeSentences(det.pitfall, 1, 120)}`));
    }
    return {
      spriteId: '05_encourage_wrong',
      tag: '小克温柔复盘',
      lines
    };
  }

  const FONT_NUM = '"Cascadia Code", "Consolas", "Microsoft YaHei UI", sans-serif';

  /* -------------------- Scoped Hobonichi Cozy Study Desk Styles -------------------- */
  let styleInjected = false;
  function injectStyles() {
    if (styleInjected || typeof document === 'undefined') return;
    if (document.getElementById('xiaoke-assistant-styles')) {
      styleInjected = true;
      return;
    }
    styleInjected = true;
    const st = document.createElement('style');
    st.id = 'xiaoke-assistant-styles';
    st.textContent = `
      .xk-dock {
        position: fixed;
        right: 18px;
        bottom: 20px;
        z-index: 9500;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        pointer-events: none;
        font-family: ${FONT_SANS};
        user-select: none;
        -webkit-user-select: none;
      }
      .xk-dock.is-mobile {
        right: 10px;
        bottom: calc(74px + env(safe-area-inset-bottom, 0px));
      }
      .xk-dock.is-collapsed .xk-stage,
      .xk-dock.is-collapsed .xk-bubble { display: none !important; }
      .xk-dock:not(.is-collapsed) .xk-restore-pill { display: none !important; }

      /* Washi-Taped Sticky Note Speech Bubble */
      .xk-bubble {
        pointer-events: auto;
        width: min(338px, calc(100vw - 24px));
        margin-bottom: 14px;
        padding: 15px 15px 12px;
        border-radius: 10px;
        background: #fffdf7;
        color: #30261e;
        border: 1px solid #d9cbb6;
        box-shadow: 0 8px 24px rgba(64, 45, 28, 0.14), 0 2px 6px rgba(64, 45, 28, 0.06);
        transform: translateX(var(--xk-bub-shift, 0px));
        transition: opacity 0.16s ease;
        position: relative;
      }
      .xk-washi-tape {
        position: absolute;
        top: -5px;
        left: 50%;
        width: 84px;
        height: 11px;
        transform: translateX(-50%) rotate(-1.2deg);
        background: rgba(227, 134, 84, 0.32);
        border-left: 1px dashed rgba(207, 92, 40, 0.28);
        border-right: 1px dashed rgba(207, 92, 40, 0.28);
        border-radius: 2px;
        pointer-events: none;
      }
      [data-theme="dark"] .xk-washi-tape,
      body.dark .xk-washi-tape {
        background: rgba(235, 123, 68, 0.34);
        border-left-color: rgba(235, 123, 68, 0.42);
        border-right-color: rgba(235, 123, 68, 0.42);
      }
      .xk-bubble::before {
        content: "";
        position: absolute;
        right: 32px;
        bottom: -10px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 9px 0 9px;
        border-color: #d9cbb6 transparent transparent transparent;
        pointer-events: none;
      }
      .xk-bubble::after {
        content: "";
        position: absolute;
        right: 33px;
        bottom: -8.5px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 9px 8px 0 8px;
        border-color: #fffdf7 transparent transparent transparent;
        pointer-events: none;
      }
      .xk-dock.is-mobile .xk-bubble::before { right: 20px; }
      .xk-dock.is-mobile .xk-bubble::after { right: 21px; }
      .xk-bubble.hidden { display: none; }

      [data-theme="dark"] .xk-bubble,
      body.dark .xk-bubble {
        background: #2a241e;
        color: #f2eadf;
        border-color: #44392e;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.42), 0 2px 8px rgba(0, 0, 0, 0.24);
      }
      [data-theme="dark"] .xk-bubble::before,
      body.dark .xk-bubble::before {
        border-top-color: #44392e;
      }
      [data-theme="dark"] .xk-bubble::after,
      body.dark .xk-bubble::after {
        border-top-color: #2a241e;
      }

      .xk-bub-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding-bottom: 8px;
        margin-bottom: 8px;
        border-bottom: 1px dashed #c8b69d;
      }
      [data-theme="dark"] .xk-bub-top,
      body.dark .xk-bub-top {
        border-bottom-color: #4a3f34;
      }
      .xk-bub-tag {
        display: inline-flex;
        align-items: center;
        padding: 3px 9px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.02em;
        background: #fdf6d8;
        color: #8c5614;
        border: 1px solid #e6d19c;
        white-space: nowrap;
        flex-shrink: 0;
      }
      [data-theme="dark"] .xk-bub-tag,
      body.dark .xk-bub-tag {
        background: #352d20;
        color: #e8b34e;
        border-color: #54452f;
      }
      .xk-bub-close {
        appearance: none;
        width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #d9cbb6;
        background: #fcf9f1;
        color: #665647;
        font-size: 12px;
        font-weight: 700;
        line-height: 1;
        cursor: pointer;
        padding: 0;
        border-radius: 6px;
        white-space: nowrap;
        flex-shrink: 0;
        font-family: ${FONT_NUM};
        transition: transform 0.12s ease, background 0.14s ease, border-color 0.14s ease, color 0.14s ease;
      }
      .xk-bub-close:hover {
        background: rgba(194, 77, 77, 0.11);
        border-color: #c24d4d;
        color: #c24d4d;
        transform: translateY(-1px);
      }
      .xk-bub-close:active {
        transform: translateY(0);
      }
      [data-theme="dark"] .xk-bub-close,
      body.dark .xk-bub-close {
        background: #221d18;
        color: #c7b8a5;
        border-color: #40362c;
      }
      [data-theme="dark"] .xk-bub-close:hover,
      body.dark .xk-bub-close:hover {
        background: rgba(224, 107, 107, 0.18);
        border-color: #e06b6b;
        color: #e06b6b;
      }

      .xk-bub-body {
        font-size: 13px;
        line-height: 1.65;
        font-weight: 500;
        color: inherit;
      }
      .xk-bub-p { margin: 0 0 6px; }
      .xk-bub-p:last-child { margin-bottom: 0; }

      .xk-bub-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 10px;
        padding-top: 9px;
        border-top: 1px dashed #c8b69d;
      }
      [data-theme="dark"] .xk-bub-actions,
      body.dark .xk-bub-actions {
        border-top-color: #4a3f34;
      }

      /* Calm Stationery Quick Action Chips */
      .xk-act-btn {
        appearance: none;
        border: 1px solid #d9cbb6;
        background: #fcf9f1;
        color: #30261e;
        font-size: 11.5px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(72, 52, 32, 0.05);
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        font-family: inherit;
        transition: transform 0.14s ease, box-shadow 0.14s ease, background 0.14s ease, border-color 0.14s ease, color 0.14s ease;
      }
      .xk-act-btn[data-xk-act="hint"] {
        background: #cf5c28;
        border-color: #cf5c28;
        color: #fffefb;
        font-weight: 700;
      }
      .xk-act-btn:hover {
        background: #fdf6d8;
        border-color: #c8b69d;
        color: #30261e;
        transform: translateY(-1.5px);
        box-shadow: 0 4px 12px rgba(72, 52, 32, 0.1);
      }
      .xk-act-btn[data-xk-act="hint"]:hover {
        background: #b84d1e;
        border-color: #b84d1e;
        color: #fffefb;
      }
      .xk-act-btn:active {
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(72, 52, 32, 0.06);
      }
      [data-theme="dark"] .xk-act-btn,
      body.dark .xk-act-btn {
        background: #221d18;
        border-color: #40362c;
        color: #f2eadf;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.24);
      }
      [data-theme="dark"] .xk-act-btn[data-xk-act="hint"],
      body.dark .xk-act-btn[data-xk-act="hint"] {
        background: #eb7b44;
        color: #1d1712;
        border-color: #eb7b44;
      }
      [data-theme="dark"] .xk-act-btn:hover,
      body.dark .xk-act-btn:hover {
        background: #352d20;
        color: #f2eadf;
        border-color: #665647;
        box-shadow: 0 5px 14px rgba(0, 0, 0, 0.34);
      }
      [data-theme="dark"] .xk-act-btn[data-xk-act="hint"]:hover,
      body.dark .xk-act-btn[data-xk-act="hint"]:hover {
        background: #f28e5c;
        border-color: #f28e5c;
        color: #1d1712;
      }

      .xk-bub-foot {
        margin-top: 7px;
        font-size: 10.5px;
        font-weight: 500;
        color: #968574;
      }
      [data-theme="dark"] .xk-bub-foot,
      body.dark .xk-bub-foot {
        color: #8f7f6e;
      }

      /* Desk Acrylic / Paper Standee Stage */
      .xk-stage {
        pointer-events: auto;
        position: relative;
        width: 116px;
        height: 116px;
        cursor: grab;
        touch-action: none;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 6px 12px rgba(64, 45, 28, 0.16));
        transition: filter 0.16s ease, transform 0.16s ease;
      }
      .xk-dock.is-mobile .xk-stage {
        width: 78px;
        height: 78px;
      }
      .xk-stage:hover {
        filter: drop-shadow(0 9px 18px rgba(64, 45, 28, 0.22));
        transform: translateY(-2px);
      }
      [data-theme="dark"] .xk-stage,
      body.dark .xk-stage {
        filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45));
      }
      [data-theme="dark"] .xk-stage:hover,
      body.dark .xk-stage:hover {
        filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.56));
      }
      .xk-stage.is-dragging { cursor: grabbing; }
      .xk-sprite {
        width: 100%;
        height: 100%;
        object-fit: contain;
        pointer-events: none;
        will-change: transform;
      }
      .xk-min-btn {
        position: absolute;
        top: -2px;
        right: -2px;
        opacity: 0;
        appearance: none;
        border: 1px solid #d9cbb6;
        background: #fdf6d8;
        color: #665647;
        font-size: 10px;
        font-weight: 700;
        padding: 2px 7px;
        border-radius: 6px;
        box-shadow: 0 2px 6px rgba(72, 52, 32, 0.12);
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        transition: opacity 0.14s ease, transform 0.12s ease, background 0.14s ease, color 0.14s ease, border-color 0.14s ease;
        font-family: inherit;
      }
      .xk-min-btn:hover {
        background: #cf5c28;
        border-color: #cf5c28;
        color: #fffefb;
        transform: translateY(-1px);
      }
      .xk-min-btn:active {
        transform: translateY(0);
      }
      [data-theme="dark"] .xk-min-btn,
      body.dark .xk-min-btn {
        background: #2a241e;
        color: #c7b8a5;
        border-color: #4a3f34;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.36);
      }
      [data-theme="dark"] .xk-min-btn:hover,
      body.dark .xk-min-btn:hover {
        background: #eb7b44;
        border-color: #eb7b44;
        color: #1d1712;
      }
      .xk-stage:hover .xk-min-btn,
      .xk-dock.is-mobile .xk-min-btn { opacity: 1; }

      /* Minimized Restore Tab: Neat Stitched Paper Bookmark Tag */
      .xk-restore-pill {
        pointer-events: auto;
        appearance: none;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        border: 1px solid #d4c3aa;
        background: #fcf9f1;
        color: #30261e;
        font-size: 12px;
        font-weight: 700;
        padding: 6px 13px 6px 8px;
        border-radius: 10px;
        box-shadow: 0 4px 14px rgba(72, 52, 32, 0.11), 0 1px 3px rgba(72, 52, 32, 0.06);
        outline: 1px dashed rgba(200, 182, 157, 0.65);
        outline-offset: -3px;
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        font-family: inherit;
        transition: transform 0.14s ease, box-shadow 0.14s ease, background 0.14s ease, border-color 0.14s ease;
      }
      .xk-restore-pill:hover {
        background: #fffefb;
        border-color: #cf5c28;
        color: #30261e;
        transform: translateY(-1.5px);
        box-shadow: 0 6px 18px rgba(72, 52, 32, 0.15);
      }
      .xk-restore-pill:active {
        transform: translateY(0);
        box-shadow: 0 2px 6px rgba(72, 52, 32, 0.09);
      }
      [data-theme="dark"] .xk-restore-pill,
      body.dark .xk-restore-pill {
        background: #2a241e;
        color: #f2eadf;
        border-color: #4a3f34;
        outline-color: rgba(143, 127, 110, 0.42);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.36);
      }
      [data-theme="dark"] .xk-restore-pill:hover,
      body.dark .xk-restore-pill:hover {
        background: #352d20;
        border-color: #eb7b44;
        color: #f2eadf;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.46);
      }
      .xk-restore-avatar {
        width: 24px;
        height: 24px;
        object-fit: contain;
        background: #fffefb;
        border: 1px solid #d9cbb6;
        border-radius: 6px;
        padding: 1px;
      }
      [data-theme="dark"] .xk-restore-avatar,
      body.dark .xk-restore-avatar {
        background: #221d18;
        border-color: #40362c;
      }
      .xk-restore-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #cf5c28;
        flex-shrink: 0;
      }
      [data-theme="dark"] .xk-restore-dot,
      body.dark .xk-restore-dot {
        background: #eb7b44;
      }
      .xk-restore-badge {
        display: inline-block;
        padding: 1px 6px;
        font-size: 9.5px;
        font-weight: 700;
        font-family: ${FONT_NUM};
        background: rgba(207, 92, 40, 0.11);
        color: #cf5c28;
        border: 1px solid rgba(207, 92, 40, 0.25);
        border-radius: 5px;
      }
      [data-theme="dark"] .xk-restore-badge,
      body.dark .xk-restore-badge {
        background: rgba(235, 123, 68, 0.18);
        color: #eb7b44;
        border-color: rgba(235, 123, 68, 0.35);
      }

      /* 10-Sprite Gallery Modal: Hobonichi Open Sticker Album Sheet (ZERO Blur) */
      .xk-gallery-overlay {
        position: fixed;
        inset: 0;
        z-index: 9992;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background-color: rgba(36, 28, 21, 0.62);
        font-family: ${FONT_SANS};
      }
      .xk-gallery-overlay.open { display: flex; }
      .xk-gallery-card {
        width: min(800px, 96vw);
        max-height: 88vh;
        overflow: auto;
        background-color: #fcf9f1;
        background-image:
          linear-gradient(to right, rgba(168, 146, 118, 0.13) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(168, 146, 118, 0.13) 1px, transparent 1px);
        background-size: 16px 16px;
        color: #30261e;
        border: 1px solid #d9cbb6;
        border-radius: 14px;
        outline: 1px dashed rgba(200, 182, 157, 0.72);
        outline-offset: -7px;
        padding: 20px 22px 24px;
        box-shadow: 0 18px 44px rgba(56, 40, 24, 0.22), 0 4px 12px rgba(56, 40, 24, 0.08);
      }
      [data-theme="dark"] .xk-gallery-card,
      body.dark .xk-gallery-card {
        background-color: #221d18;
        background-image:
          linear-gradient(to right, rgba(242, 234, 223, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(242, 234, 223, 0.05) 1px, transparent 1px);
        color: #f2eadf;
        border-color: #40362c;
        outline-color: rgba(143, 127, 110, 0.38);
        box-shadow: 0 20px 48px rgba(0, 0, 0, 0.52);
      }
      .xk-gallery-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding-bottom: 13px;
        margin-bottom: 16px;
        border-bottom: 1px dashed #c8b69d;
      }
      [data-theme="dark"] .xk-gallery-head,
      body.dark .xk-gallery-head {
        border-bottom-color: #4a3f34;
      }
      .xk-gallery-title-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .xk-gallery-kicker {
        display: inline-block;
        padding: 2px 8px;
        background: rgba(207, 92, 40, 0.11);
        color: #cf5c28;
        border: 1px solid rgba(207, 92, 40, 0.28);
        border-radius: 6px;
        font-size: 10.5px;
        font-weight: 700;
        font-family: ${FONT_NUM};
        white-space: nowrap;
        flex-shrink: 0;
      }
      [data-theme="dark"] .xk-gallery-kicker,
      body.dark .xk-gallery-kicker {
        background: rgba(235, 123, 68, 0.18);
        color: #eb7b44;
        border-color: rgba(235, 123, 68, 0.36);
      }
      .xk-gallery-title {
        font-size: 17px;
        font-weight: 800;
        letter-spacing: -0.01em;
      }
      .xk-gallery-sub {
        font-size: 12px;
        font-weight: 500;
        margin-top: 4px;
        color: #665647;
      }
      [data-theme="dark"] .xk-gallery-sub,
      body.dark .xk-gallery-sub {
        color: #c7b8a5;
      }
      .xk-gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(134px, 1fr));
        gap: 12px;
      }
      .xk-gal-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 24px 10px 11px;
        border-radius: 10px;
        border: 1px solid #d9cbb6;
        background: #fffefb;
        box-shadow: 0 2px 8px rgba(72, 52, 32, 0.06), 0 1px 2px rgba(72, 52, 32, 0.04);
        cursor: pointer;
        transition: transform 0.14s ease, box-shadow 0.14s ease, background 0.14s ease, border-color 0.14s ease;
        font-family: inherit;
        color: #30261e;
      }
      [data-theme="dark"] .xk-gal-item,
      body.dark .xk-gal-item {
        background: #2a241e;
        border-color: #40362c;
        color: #f2eadf;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);
      }
      .xk-gal-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(72, 52, 32, 0.11);
        border-color: #cf5c28;
        background: #fdf6d8;
      }
      .xk-gal-item:active {
        transform: translateY(0);
      }
      [data-theme="dark"] .xk-gal-item:hover,
      body.dark .xk-gal-item:hover {
        background: #352d20;
        border-color: #eb7b44;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
      }
      .xk-gal-item.active {
        background: #fdf6d8;
        color: #30261e;
        border: 1.5px solid #cf5c28;
        box-shadow: 0 5px 16px rgba(207, 92, 40, 0.16);
      }
      [data-theme="dark"] .xk-gal-item.active,
      body.dark .xk-gal-item.active {
        background: #352d20;
        color: #f2eadf;
        border: 1.5px solid #eb7b44;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.44);
      }
      .xk-gal-no {
        position: absolute;
        top: 6px;
        left: 6px;
        padding: 1px 6px;
        border-radius: 5px;
        background: rgba(207, 92, 40, 0.11);
        color: #cf5c28;
        border: 1px solid rgba(207, 92, 40, 0.22);
        font-family: ${FONT_NUM};
        font-size: 9.5px;
        font-weight: 700;
        letter-spacing: 0.03em;
      }
      .xk-gal-item:nth-child(5n+2) .xk-gal-no {
        background: rgba(63, 122, 92, 0.12);
        color: #3f7a5c;
        border-color: rgba(63, 122, 92, 0.25);
      }
      .xk-gal-item:nth-child(5n+3) .xk-gal-no {
        background: rgba(244, 194, 96, 0.34);
        color: #8c5614;
        border-color: rgba(214, 152, 46, 0.35);
      }
      .xk-gal-item:nth-child(5n+4) .xk-gal-no {
        background: rgba(79, 107, 125, 0.12);
        color: #4f6b7d;
        border-color: rgba(79, 107, 125, 0.25);
      }
      .xk-gal-item:nth-child(5n+5) .xk-gal-no {
        background: rgba(194, 77, 77, 0.11);
        color: #c24d4d;
        border-color: rgba(194, 77, 77, 0.25);
      }
      [data-theme="dark"] .xk-gal-no,
      body.dark .xk-gal-no {
        background: rgba(235, 123, 68, 0.18);
        color: #eb7b44;
        border-color: rgba(235, 123, 68, 0.34);
      }
      [data-theme="dark"] .xk-gal-item:nth-child(5n+2) .xk-gal-no,
      body.dark .xk-gal-item:nth-child(5n+2) .xk-gal-no {
        background: rgba(104, 184, 145, 0.18);
        color: #68b891;
        border-color: rgba(104, 184, 145, 0.34);
      }
      [data-theme="dark"] .xk-gal-item:nth-child(5n+3) .xk-gal-no,
      body.dark .xk-gal-item:nth-child(5n+3) .xk-gal-no {
        background: rgba(232, 179, 78, 0.22);
        color: #e8b34e;
        border-color: rgba(232, 179, 78, 0.36);
      }
      [data-theme="dark"] .xk-gal-item:nth-child(5n+4) .xk-gal-no,
      body.dark .xk-gal-item:nth-child(5n+4) .xk-gal-no {
        background: rgba(130, 163, 184, 0.18);
        color: #82a3b8;
        border-color: rgba(130, 163, 184, 0.34);
      }
      [data-theme="dark"] .xk-gal-item:nth-child(5n+5) .xk-gal-no,
      body.dark .xk-gal-item:nth-child(5n+5) .xk-gal-no {
        background: rgba(224, 107, 107, 0.18);
        color: #e06b6b;
        border-color: rgba(224, 107, 107, 0.34);
      }
      .xk-gal-item.active .xk-gal-no {
        background: #cf5c28;
        color: #fffefb;
        border-color: #cf5c28;
      }
      [data-theme="dark"] .xk-gal-item.active .xk-gal-no,
      body.dark .xk-gal-item.active .xk-gal-no {
        background: #eb7b44;
        color: #1d1712;
        border-color: #eb7b44;
      }
      .xk-gal-img {
        width: 78px;
        height: 78px;
        object-fit: contain;
        margin-bottom: 6px;
        filter: drop-shadow(0 3px 6px rgba(72, 52, 32, 0.14));
      }
      .xk-gal-zh { font-size: 12.5px; font-weight: 700; }
      .xk-gal-en {
        font-size: 10px;
        font-weight: 600;
        font-family: ${FONT_NUM};
        color: #968574;
        margin-top: 2px;
      }
      [data-theme="dark"] .xk-gal-en,
      body.dark .xk-gal-en {
        color: #8f7f6e;
      }
    `;
    document.head.appendChild(st);
  }

  /* -------------------- Runtime Companion Controller -------------------- */
  let opts = {};
  let latestCtx = null;
  let hostEl = null;
  let stageEl = null;
  let imgEl = null;
  let restoreImgEl = null;
  let bubbleEl = null;
  let tagEl = null;
  let bodyEl = null;
  let footEl = null;
  let galleryEl = null;

  let currentSpriteId = '01_idle_smile';
  let lockedSpriteId = null;
  let collapsed = false;
  let isHoveringBubble = false;
  let revertTimer = null;
  let hideBubbleTimer = null;
  let idleWatchTimer = null;
  let squashFrame = null;
  let squashToken = 0;

  let stepIndex = 0;
  let idleStage = 0;
  let mantraIdx = 0;
  let lastCtxKey = '';
  let lastReactAt = 0;
  let lastActivityAt = Date.now();
  let offsetX = 0;
  let offsetY = 0;

  function resolveCurrentContext() {
    if (typeof opts.getContext === 'function') {
      try {
        const fetched = opts.getContext();
        if (fetched) latestCtx = fetched;
      } catch (_e) { /* ignore */ }
    }
    return latestCtx;
  }

  function applySprite(spriteId) {
    const id = resolveSpriteId(spriteId);
    currentSpriteId = id;
    const src = resolveSpriteSrc(id);
    if (imgEl) {
      if (imgEl.dataset.spriteId !== id || !imgEl.getAttribute('src')) {
        imgEl.dataset.spriteId = id;
        imgEl.src = src;
        const meta = getSpriteMeta(id);
        imgEl.alt = `小克 · ${meta.zh_label}`;
      }
    }
    if (restoreImgEl && !restoreImgEl.getAttribute('src')) {
      restoreImgEl.src = resolveSpriteSrc('01_idle_smile');
    }
    return id;
  }

  function triggerSquash(depth = 0.14) {
    if (!imgEl || typeof global.requestAnimationFrame !== 'function') return;
    if (typeof global.matchMedia === 'function' && global.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    squashToken += 1;
    const tok = squashToken;
    if (squashFrame !== null && typeof global.cancelAnimationFrame === 'function') {
      global.cancelAnimationFrame(squashFrame);
    }
    imgEl.style.transformOrigin = '50% 94%';
    const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const DUR = 360;
    const step = () => {
      if (tok !== squashToken) return;
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const u = Math.min((now - t0) / DUR, 1);
      const wave = Math.sin(u * Math.PI * 2.2) * (1 - u);
      const sy = u < 1 ? 1 - depth * wave : 1;
      const sx = u < 1 ? 1 + (depth * 0.55) * wave : 1;
      imgEl.style.transform = u < 1 ? `scaleX(${sx.toFixed(4)}) scaleY(${sy.toFixed(4)})` : '';
      if (u < 1) squashFrame = requestAnimationFrame(step);
      else squashFrame = null;
    };
    squashFrame = requestAnimationFrame(step);
  }

  function clampDockAndBubble() {
    if (!hostEl || typeof window === 'undefined') return;
    const vw = window.innerWidth || 1024;
    const vh = window.innerHeight || 768;
    const rect = stageEl ? stageEl.getBoundingClientRect() : { width: 100, height: 100 };
    const bottomReserve = opts.isMobile || vw <= 768 ? 110 : 76;
    const maxLeftShift = Math.max(0, vw - rect.width - 20);
    const maxUpShift = Math.max(0, vh - rect.height - bottomReserve);
    offsetX = Math.max(-maxLeftShift, Math.min(0, offsetX));
    offsetY = Math.max(-maxUpShift, Math.min(0, offsetY));
    hostEl.style.transform = `translate3d(${Math.round(offsetX)}px, ${Math.round(offsetY)}px, 0)`;

    if (bubbleEl && !bubbleEl.classList.contains('hidden')) {
      bubbleEl.style.setProperty('--xk-bub-shift', '0px');
      const br = bubbleEl.getBoundingClientRect();
      let shift = 0;
      if (br.right > vw - 10) shift = (vw - 10) - br.right;
      if (br.left + shift < 10) shift = 10 - br.left;
      bubbleEl.style.setProperty('--xk-bub-shift', `${Math.round(shift)}px`);
    }
  }

  function scheduleBubbleHide(ms) {
    clearTimeout(hideBubbleTimer);
    if (ms > 0 && !isHoveringBubble) {
      hideBubbleTimer = setTimeout(() => {
        if (!isHoveringBubble && bubbleEl) bubbleEl.classList.add('hidden');
      }, ms);
    }
  }

  function showBubble({ spriteId, tag, lines, text, foot, keepSprite = false }, autoHideMs = 11000) {
    const id = applySprite(spriteId || currentSpriteId);
    if (!hostEl) return;
    if (collapsed) {
      collapsed = false;
      hostEl.classList.remove('is-collapsed');
    }
    triggerSquash(0.14);

    clearTimeout(revertTimer);
    if (!keepSprite && !lockedSpriteId) {
      const base = getBaselineSprite(resolveCurrentContext(), opts.isDark);
      if (id !== base) {
        revertTimer = setTimeout(() => {
          if (!lockedSpriteId) applySprite(getBaselineSprite(resolveCurrentContext(), opts.isDark));
        }, 5600);
      }
    }

    const lineArr = (Array.isArray(lines) && lines.length)
      ? lines.filter(Boolean)
      : (text ? String(text).split(/\n+/).map(s => s.trim()).filter(Boolean) : []);

    if (lineArr.length && bubbleEl && bodyEl) {
      if (tagEl) tagEl.textContent = tag || `小克 · ${getSpriteMeta(id).zh_label}`;
      bodyEl.innerHTML = lineArr.map(ln => `<p class="xk-bub-p">${escHtml(ln)}</p>`).join('');
      if (footEl) {
        footEl.textContent = foot || '';
        footEl.style.display = foot ? 'block' : 'none';
      }
      bubbleEl.classList.remove('hidden');
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(clampDockAndBubble);
      scheduleBubbleHide(autoHideMs);
    }
  }

  function speakSprintMantra() {
    const pool = (Array.isArray(global.XIAOKE_MANTRAS) && global.XIAOKE_MANTRAS.length)
      ? global.XIAOKE_MANTRAS
      : FALLBACK_MANTRAS;
    const item = pool[mantraIdx % pool.length];
    mantraIdx += 1;
    const spriteId = resolveSpriteId(item.spriteId || '10_eureka_tip');
    const lines = [ensureEndPunct(item.mantra || item.tip || '')];
    if (item.tip && item.mantra && item.tip !== item.mantra) {
      lines.push(ensureEndPunct(item.tip));
    }
    showBubble(
      {
        spriteId,
        tag: item.tag || item.label || '冲刺口诀',
        lines,
        foot: '点击“听小克讲冲刺口诀”可切下一条高分秘诀'
      },
      12500
    );
    if (global.Cet4Speech && typeof global.Cet4Speech.speak === 'function' && item.mantra) {
      try {
        global.Cet4Speech.speak(item.mantra, { lang: 'zh-CN', rate: 1.05 });
      } catch (_e) { /* ignore */ }
    }
  }

  function showHint() {
    lastActivityAt = Date.now();
    const ctx = resolveCurrentContext();
    const key = buildContextKey(ctx);
    if (key !== lastCtxKey) {
      lastCtxKey = key;
      stepIndex = 0;
      idleStage = 0;
    }
    const hint = getHintForContext(ctx, stepIndex);
    stepIndex += 1;
    showBubble(
      {
        spriteId: hint.spriteId,
        tag: hint.tag,
        lines: hint.lines,
        foot: opts.isMobile ? '再点小克看下一条提示' : '再点小克切换下一级提示 · 悬停气泡可暂停自动收起'
      },
      13500
    );
    return hint;
  }

  function react(spriteId, text, durationMs = 5600) {
    lastReactAt = Date.now();
    lastActivityAt = Date.now();
    const id = resolveSpriteId(spriteId);
    const meta = getSpriteMeta(id);
    const msg = text || (meta.speech_lines && meta.speech_lines[0]) || '小克正在为你加油！';
    if (!hostEl) {
      currentSpriteId = id;
      return { spriteId: id, text: msg };
    }
    if (collapsed) {
      applySprite(id);
      return { spriteId: id, text: msg };
    }
    showBubble(
      {
        spriteId: id,
        tag: `小克 · ${meta.zh_label}`,
        text: msg,
        foot: ''
      },
      durationMs
    );
    return { spriteId: id, text: msg };
  }

  function onCorrectAnswer(q, streak = 1) {
    lastReactAt = Date.now();
    lastActivityAt = Date.now();
    const nStreak = Number(streak) || 1;
    const isStreak = nStreak >= 3;
    const spriteId = isStreak ? '09_proud_streak' : '04_cheer_correct';
    const lines = [];
    if (isStreak) {
      lines.push(`连对 ${nStreak} 题啦！哼哼，这个命中率简直在发光，四级高分稳稳的！`);
    } else {
      lines.push('漂亮！这一题稳稳拿捏，保持这个做题节奏！');
    }
    if (q && q.paraphraseBridge) {
      lines.push(ensureEndPunct(`顺手再记牢同义替换：${q.paraphraseBridge}`));
    } else if (q && q.id && global.EXPLAIN_DETAILS && global.EXPLAIN_DETAILS[q.id] && global.EXPLAIN_DETAILS[q.id].pitfall) {
      lines.push(ensureEndPunct(`避坑强化：${completeSentences(global.EXPLAIN_DETAILS[q.id].pitfall, 1, 95)}`));
    }
    showBubble(
      {
        spriteId,
        tag: isStreak ? `${nStreak} 连击达成` : '答对欢呼',
        lines,
        foot: ''
      },
      6800
    );
    return { spriteId, lines };
  }

  function onWrongAnswer(q, extra = {}) {
    lastReactAt = Date.now();
    lastActivityAt = Date.now();
    const coach = buildWrongCoach(q, extra);
    showBubble(
      {
        spriteId: coach.spriteId,
        tag: coach.tag,
        lines: coach.lines,
        foot: '悬停气泡可停留阅读 · 看完解析再练一道巩固'
      },
      14500
    );
    return coach;
  }

  function onVocabEvent(type, word, streak = 0) {
    lastReactAt = Date.now();
    lastActivityAt = Date.now();
    const w = word && typeof word === 'object' ? word : { word: String(word || '') };
    const wLabel = w.word ? `「${w.word}」` : '这组高频词';
    const nStreak = Number(streak) || 0;

    if (type === 'recite_start' || type === 'audio') {
      return react('07_listening_audio', `语音带背进行中：跟着读音朗读 ${wLabel}，耳熟比硬背牢三倍！`, 5200);
    }
    if (type === 'known') {
      if (nStreak >= 5) {
        return react('09_proud_streak', `连斩 ${nStreak} 个核心高频词！${wLabel} 已标记稳稳掌握！`, 5000);
      }
      return react('04_cheer_correct', `${wLabel} 已记牢！继续下一词保持热手感。`, 4200);
    }
    if (type === 'fuzzy') {
      const cue = w.roots || w.mnemonic
        ? `${wLabel} 有点模糊？用词根巧记串联一下：${completeSentences(w.roots || w.mnemonic, 1, 88)}（+7 词后再复习一遍）`
        : `${wLabel} 已安排在 +7 词后复现，多见两面就能秒反应！`;
      return react('03_thinking_hint', cue, 7800);
    }
    if (type === 'unknown') {
      return react('05_encourage_wrong', `不认识 ${wLabel} 很正常！小克已经把它排进 +3 词马上重背队列啦。`, 6500);
    }
    if (type === 'confusable') {
      return react('10_eureka_tip', `易混词高能预警！把拼写和固定搭配对比看清，选词填空不丢冤枉分。`, 6200);
    }
    if (type === 'day_complete') {
      return react('09_proud_streak', '今日高频词卡包全部刷完啦！小克宣布给你颁发满分秋日小红花！', 7200);
    }
    return react('02_study_reading', `一起攻克 ${wLabel}！`, 4200);
  }

  function setSprite(spriteId, lock = false) {
    const id = resolveSpriteId(spriteId);
    lockedSpriteId = lock ? id : null;
    applySprite(id);
    triggerSquash(0.12);
    return id;
  }

  function updateContext(ctx) {
    if (ctx && typeof ctx === 'object') {
      latestCtx = Object.assign({}, latestCtx || {}, ctx);
    }
    const cur = resolveCurrentContext();
    const key = buildContextKey(cur);
    const justReacted = (Date.now() - lastReactAt) < 750;
    if (key !== lastCtxKey) {
      lastCtxKey = key;
      stepIndex = 0;
      idleStage = 0;
      lastActivityAt = Date.now();
      if (!justReacted && bubbleEl && !(ctx && ctx.keepBubble)) {
        isHoveringBubble = false;
        bubbleEl.classList.add('hidden');
      }
    }
    if (!justReacted && !lockedSpriteId) {
      clearTimeout(revertTimer);
      applySprite(getBaselineSprite(cur, opts.isDark));
    }
    return currentSpriteId;
  }

  /* -------------------- 10-Sprite Gallery Showcase Modal -------------------- */
  function closeGallery() {
    if (galleryEl) galleryEl.classList.remove('open');
  }

  function openGallery() {
    if (typeof document === 'undefined') return;
    injectStyles();
    if (!galleryEl) {
      galleryEl = document.createElement('div');
      galleryEl.id = 'xiaoke-gallery-modal';
      galleryEl.className = 'xk-gallery-overlay';
      galleryEl.setAttribute('role', 'dialog');
      galleryEl.setAttribute('aria-modal', 'true');
      galleryEl.addEventListener('click', e => {
        if (e.target === galleryEl) closeGallery();
      });
      if (!openGallery._escBound) {
        openGallery._escBound = true;
        document.addEventListener('keydown', e => {
          if (e.key === 'Escape' && galleryEl && galleryEl.classList.contains('open')) {
            closeGallery();
          }
        });
      }
      document.body.appendChild(galleryEl);
    }
    const sprites = getSpriteCatalog();
    galleryEl.innerHTML = `
      <div class="xk-gallery-card">
        <div class="xk-gallery-head">
          <div>
            <div class="xk-gallery-title-row">
              <span class="xk-gallery-kicker">TECHO STICKER ALBUM · 10/10</span>
              <strong class="xk-gallery-title">小克 10 款手账贴纸簿</strong>
            </div>
            <div class="xk-gallery-sub">点选任意编号贴纸即可切换小克当前造型并听她讲一句专属冲刺台词</div>
          </div>
          <button type="button" class="xk-act-btn" id="xk-gal-close">关闭 (ESC)</button>
        </div>
        <div class="xk-gallery-grid">
          ${sprites.map((sp, idx) => `
            <button type="button" class="xk-gal-item${sp.id === currentSpriteId ? ' active' : ''}" data-sprite-id="${escHtml(sp.id)}">
              <span class="xk-gal-no">No.${String(idx + 1).padStart(2, '0')}</span>
              <img class="xk-gal-img" src="${resolveSpriteSrc(sp.id)}" alt="${escHtml(sp.zh_label)}">
              <span class="xk-gal-zh">${escHtml(sp.zh_label)}</span>
              <span class="xk-gal-en">${escHtml(sp.en_label || sp.id)}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
    const closeBtn = galleryEl.querySelector('#xk-gal-close');
    if (closeBtn) closeBtn.onclick = closeGallery;
    galleryEl.querySelectorAll('.xk-gal-item[data-sprite-id]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.spriteId;
        const meta = getSpriteMeta(id);
        const lines = Array.isArray(meta.speech_lines) && meta.speech_lines.length ? meta.speech_lines : [];
        const line = lines[Math.floor(Math.random() * lines.length)] || `已切换到「${meta.zh_label}」造型！`;
        lockedSpriteId = null;
        closeGallery();
        showBubble(
          {
            spriteId: id,
            tag: `小克 · ${meta.zh_label}`,
            text: line,
            foot: '小克会在切换模块与答题时继续为你自动变换表情',
            keepSprite: true
          },
          7200
        );
      };
    });
    galleryEl.classList.add('open');
  }

  function toggleMinimize(forceState) {
    const next = typeof forceState === 'boolean' ? forceState : !collapsed;
    collapsed = next;
    if (!hostEl) return collapsed;
    if (collapsed) {
      isHoveringBubble = false;
      clearTimeout(hideBubbleTimer);
      if (bubbleEl) bubbleEl.classList.add('hidden');
      hostEl.classList.add('is-collapsed');
    } else {
      hostEl.classList.remove('is-collapsed');
      lastActivityAt = Date.now();
      applySprite('01_idle_smile');
      triggerSquash(0.15);
      clearTimeout(revertTimer);
      revertTimer = setTimeout(() => {
        if (!lockedSpriteId) applySprite(getBaselineSprite(resolveCurrentContext(), opts.isDark));
      }, 3200);
    }
    return collapsed;
  }

  /* -------------------- Inactivity Auto-Hint Watcher -------------------- */
  function startIdleWatcher() {
    if (idleWatchTimer) clearInterval(idleWatchTimer);
    const markActive = () => { lastActivityAt = Date.now(); };

    if (typeof document !== 'undefined' && !startIdleWatcher._bound) {
      startIdleWatcher._bound = true;
      document.addEventListener('keydown', markActive, { passive: true });
      document.addEventListener('input', markActive, { passive: true });
      document.addEventListener('pointerdown', e => {
        if (!e.target || !e.target.closest || !e.target.closest('#xiaoke-dock')) {
          markActive();
        }
      }, { passive: true });
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) lastActivityAt = Date.now();
      });
    }

    const firstMs = Number(opts.idleFirstMs) || DEFAULT_IDLE_FIRST_MS;
    const secondMs = Number(opts.idleSecondMs) || DEFAULT_IDLE_SECOND_MS;

    idleWatchTimer = setInterval(() => {
      if (collapsed || !hostEl || !bubbleEl) return;
      if (typeof document !== 'undefined' && document.hidden) return;
      if (!bubbleEl.classList.contains('hidden')) return;
      if (idleStage >= 2) return;
      if (global.Cet4Speech && typeof global.Cet4Speech.isSpeaking === 'function' && global.Cet4Speech.isSpeaking()) {
        lastActivityAt = Date.now();
        return;
      }

      const ctx = resolveCurrentContext();
      if (!ctx || ctx.audioPlaying) {
        lastActivityAt = Date.now();
        return;
      }
      if (ctx.view !== 'practice') return;
      const q = getActiveQuestion(ctx);
      if (!q || isQuestionAnswered(ctx)) return;

      const elapsed = Date.now() - lastActivityAt;
      const threshold = idleStage === 0 ? firstMs : secondMs;
      if (elapsed < threshold) return;

      const hint = getHintForContext(ctx, idleStage);
      idleStage += 1;
      stepIndex = Math.max(stepIndex, idleStage);
      lastActivityAt = Date.now();

      const intro = idleStage === 1
        ? '看你停在这道题一会儿啦，小克递上一条不剧透的思路线索：'
        : '再帮你把下一步排查方向梳理清楚一点：';
      showBubble(
        {
          spriteId: hint.spriteId,
          tag: `主动提示 ${idleStage}/2`,
          lines: [intro].concat(hint.lines || []),
          foot: '点击“给条思路提示”可继续查看更深一层线索'
        },
        13000
      );
    }, 3000);
  }

  function wireInteractions() {
    if (!stageEl || !hostEl) return;
    let dragging = false;
    let moved = false;
    let pId = null;
    let startX = 0, startY = 0;
    let baseOX = 0, baseOY = 0;

    stageEl.addEventListener('pointerdown', e => {
      if (e.button !== 0 || (e.target && e.target.closest && e.target.closest('.xk-min-btn'))) return;
      dragging = true;
      moved = false;
      pId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      baseOX = offsetX;
      baseOY = offsetY;
      if (stageEl.setPointerCapture) {
        try { stageEl.setPointerCapture(pId); } catch (_e) { /* ignore */ }
      }
    });

    stageEl.addEventListener('pointermove', e => {
      if (!dragging || e.pointerId !== pId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!moved && Math.hypot(dx, dy) >= 8) {
        moved = true;
        stageEl.classList.add('is-dragging');
      }
      if (moved) {
        offsetX = baseOX + dx;
        offsetY = baseOY + dy;
        clampDockAndBubble();
      }
    });

    const endDrag = e => {
      if (!dragging || e.pointerId !== pId) return;
      dragging = false;
      stageEl.classList.remove('is-dragging');
      if (stageEl.releasePointerCapture) {
        try { stageEl.releasePointerCapture(pId); } catch (_e) { /* ignore */ }
      }
      if (!moved) showHint();
    };
    stageEl.addEventListener('pointerup', endDrag);
    stageEl.addEventListener('pointercancel', endDrag);
    stageEl.addEventListener('dblclick', e => {
      e.preventDefault();
      openGallery();
    });

    if (bubbleEl) {
      bubbleEl.addEventListener('mouseenter', () => {
        isHoveringBubble = true;
        clearTimeout(hideBubbleTimer);
      });
      bubbleEl.addEventListener('mouseleave', () => {
        isHoveringBubble = false;
        if (!bubbleEl.classList.contains('hidden')) scheduleBubbleHide(4600);
      });
    }

    const closeBtn = hostEl.querySelector('.xk-bub-close');
    if (closeBtn) {
      closeBtn.onclick = e => {
        e.stopPropagation();
        isHoveringBubble = false;
        clearTimeout(hideBubbleTimer);
        if (bubbleEl) bubbleEl.classList.add('hidden');
      };
    }

    const minBtn = hostEl.querySelector('.xk-min-btn');
    if (minBtn) {
      minBtn.onclick = e => {
        e.stopPropagation();
        toggleMinimize(true);
      };
    }

    const restoreBtn = hostEl.querySelector('.xk-restore-pill');
    if (restoreBtn) {
      restoreBtn.onclick = () => toggleMinimize(false);
    }

    hostEl.querySelectorAll('.xk-act-btn[data-xk-act]').forEach(btn => {
      btn.onclick = e => {
        e.stopPropagation();
        const act = btn.dataset.xkAct;
        if (act === 'hint') showHint();
        else if (act === 'gallery') openGallery();
        else if (act === 'mantra') speakSprintMantra();
        else if (act === 'minimize') toggleMinimize(true);
        if (typeof opts.onAction === 'function') {
          try { opts.onAction(act); } catch (_err) { /* ignore */ }
        }
      };
    });
  }

  function init(config = {}) {
    opts = config || {};
    if (typeof document === 'undefined') return XiaoKeAssistant;
    injectStyles();

    const targetId = opts.hostId || 'xiaoke-dock';
    hostEl = document.getElementById(targetId);
    if (!hostEl) {
      hostEl = document.createElement('div');
      hostEl.id = targetId;
      document.body.appendChild(hostEl);
    }
    hostEl.classList.add('xk-dock');
    const isMob = Boolean(opts.isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768));
    hostEl.classList.toggle('is-mobile', isMob);
    if (opts.bottomOffset != null) {
      hostEl.style.bottom = typeof opts.bottomOffset === 'number' ? `${opts.bottomOffset}px` : String(opts.bottomOffset);
    }

    const initSprite = getBaselineSprite(resolveCurrentContext(), opts.isDark);
    const initSrc = resolveSpriteSrc(initSprite);

    hostEl.innerHTML = `
      <div class="xk-bubble hidden" id="xk-bubble" role="status" aria-live="polite">
        <span class="xk-washi-tape" aria-hidden="true"></span>
        <div class="xk-bub-top">
          <span class="xk-bub-tag" id="xk-bub-tag">小克伴学助手</span>
          <button type="button" class="xk-bub-close" aria-label="关闭气泡" title="关闭">X</button>
        </div>
        <div class="xk-bub-body" id="xk-bub-body"></div>
        <div class="xk-bub-actions">
          <button type="button" class="xk-act-btn" data-xk-act="hint">给条思路提示</button>
          <button type="button" class="xk-act-btn" data-xk-act="gallery">贴纸图鉴</button>
          <button type="button" class="xk-act-btn" data-xk-act="mantra">冲刺口诀</button>
          <button type="button" class="xk-act-btn" data-xk-act="minimize">收起小克</button>
        </div>
        <div class="xk-bub-foot" id="xk-bub-foot"></div>
      </div>
      <div class="xk-stage" id="xk-stage" role="button" tabindex="0" aria-label="小克伴学助手：点击查看思路提示，双击打开10款贴纸图鉴，按住可拖动">
        <img class="xk-sprite" id="xk-sprite" src="${initSrc}" alt="小克伴学助手" draggable="false">
        <button type="button" class="xk-min-btn" title="收起小克">收起</button>
      </div>
      <button type="button" class="xk-restore-pill" id="xk-restore-pill" title="唤出小克伴学助手">
        <span class="xk-restore-dot" aria-hidden="true"></span>
        <img class="xk-restore-avatar" id="xk-restore-avatar" src="${initSrc}" alt="小克">
        <span class="xk-restore-badge">XK</span>
        <span>唤出小克</span>
      </button>
    `;

    bubbleEl = hostEl.querySelector('#xk-bubble');
    tagEl = hostEl.querySelector('#xk-bub-tag');
    bodyEl = hostEl.querySelector('#xk-bub-body');
    footEl = hostEl.querySelector('#xk-bub-foot');
    stageEl = hostEl.querySelector('#xk-stage');
    imgEl = hostEl.querySelector('#xk-sprite');
    restoreImgEl = hostEl.querySelector('#xk-restore-avatar');

    if (stageEl) {
      stageEl.onkeydown = e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showHint();
        }
      };
    }

    lastActivityAt = Date.now();
    wireInteractions();
    startIdleWatcher();
    if (typeof window !== 'undefined' && !init._resizeBound) {
      init._resizeBound = true;
      window.addEventListener('resize', clampDockAndBubble);
    }
    applySprite(initSprite);
    return XiaoKeAssistant;
  }

  const XiaoKeAssistant = {
    SPRITE_IDS,
    DEFAULT_IDLE_FIRST_MS,
    DEFAULT_IDLE_SECOND_MS,
    init,
    mount: init,
    updateContext,
    onContextChanged: updateContext,
    react,
    onCorrectAnswer,
    onWrongAnswer,
    onVocabEvent,
    showHint,
    setSprite,
    openGallery,
    closeGallery,
    toggleMinimize,
    resolveSpriteId,
    resolveSpriteSrc,
    getBaselineSprite,
    getHintForContext,
    buildWrongCoach,
    cleanNonSpoiler,
    completeSentences
  };

  if (typeof global !== 'undefined' && global) {
    global.XiaoKeAssistant = XiaoKeAssistant;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = XiaoKeAssistant;
  }
})(typeof window !== 'undefined' ? window : globalThis);
