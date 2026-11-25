/* ==========================================================================
   CET-4 Sprint Knowledge Data Module (knowledge_data.js)
   Exports:
     - window.SPRINT_PLAN        (12-day <14-day rapid CET-4 sprint schedule)
     - window.MASTERY_TOPICS     (6 CET-4 skill pillars & official weights)
     - window.KNOWLEDGE_MODULES  (6 chapters / 14 sections)
     - window.KNOWLEDGE_SECTIONS (14 full strategy lessons + interactive drills)
     - window.TOPIC_SUMMARIES    (6 skill quick-reference formula cards)
     - window.XIAOKE_MANTRAS     (10 Xiao Ke mascot poses & exam golden mantras)
   Zero emojis. Zero mock-exam content. Clean UTF-8 Chinese/English.
   ========================================================================== */
(function (root) {
  'use strict';

  const SPRINT_PLAN = [
    {
      day: 1,
      phase: '阶段一：词汇筑基与听力破冰',
      title: '吃透分值地图 + 听力“未听先知”预读法',
      vocabDay: 1,
      sectionIds: ['t_sprint_plan', 't_listen_preread'],
      practiceSkill: 'listening',
      listeningTask: '新闻报道微精听 3 题：严格执行 15 秒预读圈主语与动作，首尾两句抓主旨',
      minutes: 65,
      goal: '明确 710 分制高性价比提分区，背完 Day 1 高频词，告别“录音一响大脑空白”'
    },
    {
      day: 2,
      phase: '阶段一：词汇筑基与听力破冰',
      title: '新闻首尾句与数字/时间雷达专项',
      vocabDay: 2,
      sectionIds: ['t_listen_preread'],
      practiceSkill: 'listening',
      listeningTask: '复盘 Day 1 词汇听音速测 + 精听 4 题新闻报道，标注每个答案句的同义改写',
      minutes: 65,
      goal: '完成首次艾宾浩斯 24 小时词汇巩固，新闻听力抓细节准确率稳过 65%'
    },
    {
      day: 3,
      phase: '阶段一：词汇筑基与听力破冰',
      title: '长对话问答回合与转折信号词雷达',
      vocabDay: 3,
      sectionIds: ['t_listen_signal'],
      practiceSkill: 'listening',
      listeningTask: '精听 4 题长对话真题：盯紧 but / however / actually / in fact 后的真实态度',
      minutes: 70,
      goal: '养成“女问男答、转折出答案、视听一致先留心”的听觉条件反射，累计掌握 78 词'
    },
    {
      day: 4,
      phase: '阶段二：听力进阶与选词秒杀',
      title: '听力短文篇章结构与同义替换桥',
      vocabDay: 4,
      sectionIds: ['t_listen_signal'],
      practiceSkill: 'listening',
      listeningTask: '精听 4 题短文篇章真题：用“首尾句+因果/举例词”三步定位证据句，1.0x 复听',
      minutes: 70,
      goal: '攻克短文听力信息量大难题，完成听力全题型方法闭环，累计掌握 104 词'
    },
    {
      day: 5,
      phase: '阶段二：听力进阶与选词秒杀',
      title: '选词填空 15 选 10 词性四车道速判',
      vocabDay: 5,
      sectionIds: ['t_cloze_pos'],
      practiceSkill: 'cloze',
      listeningTask: 'Day 1-4 高频词“盲听选义”10 分钟磨耳训练',
      minutes: 65,
      goal: '练熟词缀速标 n./v./adj./adv.，每空 3 秒把 15 个选项压缩至 2-3 个候选词'
    },
    {
      day: 6,
      phase: '阶段二：听力进阶与选词秒杀',
      title: '选词填空语境搭配、时态与感情色彩',
      vocabDay: 6,
      sectionIds: ['t_cloze_context'],
      practiceSkill: 'cloze',
      listeningTask: '听力错题复听 15 分钟 + 影子跟读证据句 2 遍',
      minutes: 65,
      goal: '7 分钟内稳拿选词填空 6-8 空，做到不耗时间、不拖累后续大阅读，累计突破 156 词'
    },
    {
      day: 7,
      phase: '阶段三：阅读高分攻坚（占总分 30%）',
      title: '长篇阅读定位词三级优先与极速扫读',
      vocabDay: 7,
      sectionIds: ['t_long_scan', 't_long_para'],
      practiceSkill: 'matching',
      listeningTask: 'Day 5-7 高频词语音带背 + 易混词对决 5 组',
      minutes: 75,
      goal: '掌握“先题后文、先特后普、同义替换验真”，12 分钟稳拿长篇匹配 8/10 以上'
    },
    {
      day: 8,
      phase: '阶段三：阅读高分攻坚（占总分 30%）',
      title: '仔细阅读题文同序定位与主旨态度破题',
      vocabDay: 8,
      sectionIds: ['t_read_detail', 't_read_main'],
      practiceSkill: 'reading',
      listeningTask: '精听 2 题新闻 + 2 题短文，保持考场耳朵灵敏度',
      minutes: 75,
      goal: '每道仔细阅读高达 14.2 分，做到每题先找唯一证据句再比对选项，杜绝凭印象蒙题'
    },
    {
      day: 9,
      phase: '阶段三：阅读高分攻坚（占总分 30%）',
      title: '仔细阅读五大干扰项显微镜排雷',
      vocabDay: 9,
      sectionIds: ['t_read_traps'],
      practiceSkill: 'reading',
      listeningTask: 'Day 1-9 模糊词专项听音复测 15 分钟',
      minutes: 75,
      goal: '一眼识破偷换概念、过度推断、绝对化、张冠李戴、无中生有五大陷阱，累计突破 234 词'
    },
    {
      day: 10,
      phase: '阶段四：译写提分冲刺与错词清零',
      title: '段落汉译英拆句重组与高频文化词库',
      vocabDay: 10,
      sectionIds: ['t_trans_struct', 't_trans_themes'],
      practiceSkill: 'translation',
      listeningTask: '易混词高频对决 10 组 + 听力长对话 2 题保手感',
      minutes: 70,
      goal: '练熟“提主干 -> 长定语后置 -> 无主句转被动/分词”，吃透尊师/礼仪/四合院等真题热词'
    },
    {
      day: 11,
      phase: '阶段四：译写提分冲刺与错词清零',
      title: '四级作文三段积木法与 2024-2026 真题句型迁移',
      vocabDay: 11,
      sectionIds: ['t_write_struct', 't_write_patterns'],
      practiceSkill: 'writing',
      listeningTask: '听力新闻与篇章各 2 题 1.1x 语速抗压训练',
      minutes: 75,
      goal: '25 分钟写出结构饱满、140-170 词零硬伤的三段高分作文，内化 12 组可迁移句型'
    },
    {
      day: 12,
      phase: '阶段四：译写提分冲刺与错词清零',
      title: '全题型错题清零 + 312 高频词终极带背过筛',
      vocabDay: 12,
      sectionIds: ['t_sprint_plan', 't_write_patterns'],
      practiceSkill: 'listening',
      listeningTask: '错词手账生词 1.15x 终极听音过筛 + 28 组易混词满分通关',
      minutes: 80,
      goal: '312 高频词全面收口、错题攻坚营清零、译写模板烂熟于心，从容稳过 425+ 冲击 500+'
    }
  ];

  const MASTERY_TOPICS = [
    {
      id: 'listen',
      questionSkill: 'listening',
      name: '听力理解',
      shortName: '听力',
      weightPct: 35,
      targetScore: 165,
      color: '#d95d1e',
      desc: '总分 248.5 分的绝对大头。掌握 15 秒预读、新闻首尾句、对话转折词与同义替换，短期提分最快。',
      iconKey: 'listen',
      sectionIds: ['t_sprint_plan', 't_listen_preread', 't_listen_signal']
    },
    {
      id: 'cloze',
      questionSkill: 'cloze',
      name: '选词填空',
      shortName: '选词',
      weightPct: 5,
      targetScore: 25,
      color: '#c88a24',
      desc: '15 选 10 共 35.5 分。靠词性后缀四车道分类 + 语法槽位速杀，严格控时 7 分钟以内。',
      iconKey: 'cloze',
      sectionIds: ['t_cloze_pos', 't_cloze_context']
    },
    {
      id: 'matching',
      questionSkill: 'matching',
      name: '长篇阅读匹配',
      shortName: '长篇',
      weightPct: 10,
      targetScore: 56,
      color: '#2b5b4e',
      desc: '10 题 71 分的“送分稳分池”。先看题干划数字/专有名词，逐段扫读对照同义改写。',
      iconKey: 'matching',
      sectionIds: ['t_long_scan', 't_long_para']
    },
    {
      id: 'reading',
      questionSkill: 'reading',
      name: '仔细阅读',
      shortName: '精读',
      weightPct: 20,
      targetScore: 114,
      color: '#b84711',
      desc: '每题高达 14.2 分（共 142 分）！死守“题文同序 + 原文证据句 + 五大干扰排雷”。',
      iconKey: 'reading',
      sectionIds: ['t_read_detail', 't_read_main', 't_read_traps']
    },
    {
      id: 'translation',
      questionSkill: 'translation',
      name: '段落汉译英',
      shortName: '翻译',
      weightPct: 15,
      targetScore: 78,
      color: '#6b4c35',
      desc: '106.5 分，主打中国文化与社会发展。不逐字硬翻，先提英文主干再挂修饰成分。',
      iconKey: 'translation',
      sectionIds: ['t_trans_struct', 't_trans_themes']
    },
    {
      id: 'writing',
      questionSkill: 'writing',
      name: '短文写作',
      shortName: '写作',
      weightPct: 15,
      targetScore: 80,
      color: '#24483e',
      desc: '106.5 分，120-180 词。紧扣审题要求，用三段积木与真题可迁移句型稳拿高档分。',
      iconKey: 'writing',
      sectionIds: ['t_write_struct', 't_write_patterns']
    }
  ];

  const KNOWLEDGE_MODULES = [
    {
      id: 'ch1_listen',
      num: '01',
      title: '四级冲刺蓝图与听力速通',
      subtitle: '12 天提分节奏、选项预读法与转折信号词雷达',
      skillId: 'listen',
      scoreShare: '35% · 248.5分',
      summary: '先算清四级 710 分制提分账，再用“预读预测 -> 听信号词 -> 同义替换核验”三步彻底解决听力听不懂、选不对的问题。',
      sections: [
        { id: 't_sprint_plan', title: '12天速通蓝图与710分值权重', badge: '冲刺总纲', animId: 'ebbinghaus', minutes: 6 },
        { id: 't_listen_preread', title: '听力“未听先知”预读法与新闻首尾句', badge: '听力核心', animId: 'listening_radar', minutes: 10 },
        { id: 't_listen_signal', title: '长对话与篇章：信号词与同义替换', badge: '听力提分', animId: 'listening_radar', minutes: 12 }
      ]
    },
    {
      id: 'ch2_cloze',
      num: '02',
      title: '选词填空词性秒杀',
      subtitle: '15 选 10 四大词性速判与搭配色彩锁定',
      skillId: 'cloze',
      scoreShare: '5% · 35.5分',
      summary: '选词填空绝不能通篇硬读！先给 15 个备选词标好词性，再看空格前后语法结构，最后用搭配和情感褒贬一锤定音。',
      sections: [
        { id: 't_cloze_pos', title: '15选10四大词性后缀速判与槽位排除', badge: '提速核心', animId: 'cloze_pipeline', minutes: 8 },
        { id: 't_cloze_context', title: '固定搭配、时态呼应与上下文复现', badge: '精准锁定', animId: 'cloze_pipeline', minutes: 8 }
      ]
    },
    {
      id: 'ch3_matching',
      num: '03',
      title: '长篇阅读极速定位',
      subtitle: '定位词三级优先级与跨段同义改写识破',
      skillId: 'matching',
      scoreShare: '10% · 71分',
      summary: '1000+ 词长文不需要逐句精读。按“特殊词 -> 核心名词 -> 逻辑动作”划好定位词，一段一段扫读匹配即可高分通关。',
      sections: [
        { id: 't_long_scan', title: '定位词三级优先与段落扫读节奏', badge: '稳分利器', animId: 'long_read_scan', minutes: 9 },
        { id: 't_long_para', title: '同义改写识别与多段重词干扰排除', badge: '防踩坑', animId: 'long_read_scan', minutes: 9 }
      ]
    },
    {
      id: 'ch4_reading',
      num: '04',
      title: '仔细阅读高分排雷',
      subtitle: '每题 14.2 分的回文定位术与五大干扰项解剖',
      skillId: 'reading',
      scoreShare: '20% · 142分',
      summary: '仔细阅读单题分值全场最高。吃透题文同序定位、主旨态度判别与五大高频干扰套路，就能把阅读变成最稳的提分引擎。',
      sections: [
        { id: 't_read_detail', title: '题文同序、精准回文定位与细节替换', badge: '14.2分/题', animId: 'careful_trap', minutes: 10 },
        { id: 't_read_main', title: '主旨大意、作者态度与词义推断', badge: '高阶题型', animId: 'careful_trap', minutes: 9 },
        { id: 't_read_traps', title: '五大干扰项显微镜排雷实战', badge: '考场避坑', animId: 'careful_trap', minutes: 10 }
      ]
    },
    {
      id: 'ch5_translation',
      num: '05',
      title: '汉译英拆句重组',
      subtitle: '主干提取、定语后置与近年高频主题译词',
      skillId: 'translation',
      scoreShare: '15% · 106.5分',
      summary: '四级翻译不考偏难怪词，考的是把“中文流水句”改写成“英文主干 + 修饰语”的能力。学会拆句与转换，普通词汇也能拿高分。',
      sections: [
        { id: 't_trans_struct', title: '主干提取、长定语后置与被动/分词转换', badge: '句法引擎', animId: 'trans_restructure', minutes: 10 },
        { id: 't_trans_themes', title: '2024-2026 真题高频文化社会核心译词', badge: '真题热词', animId: 'trans_restructure', minutes: 9 }
      ]
    },
    {
      id: 'ch6_writing',
      num: '06',
      title: '作文三段式结构与迁移',
      subtitle: '120-180 词积木框架与 2024-2026 真题可迁移句型',
      skillId: 'writing',
      scoreShare: '15% · 106.5分',
      summary: '针对近年高频的校报投稿、提案建议、观点回应与调查回复，用清晰的三段式逻辑和可复用高分句型，25 分钟稳稳完稿。',
      sections: [
        { id: 't_write_struct', title: '四大常考文体与 120-180 词三段积木法', badge: '审题结构', animId: 'essay_builder', minutes: 10 },
        { id: 't_write_patterns', title: '源自 2024-2026 真题的可迁移高分句型库', badge: '即背即用', animId: 'essay_builder', minutes: 10 }
      ]
    }
  ];

  const KNOWLEDGE_SECTIONS = {
    t_sprint_plan: {
      id: 't_sprint_plan',
      moduleId: 'ch1_listen',
      skillId: 'listen',
      title: '12天速通蓝图与710分值权重',
      subtitle: '算清每一分钟的提分回报率，拒绝盲目刷偏题',
      timeEst: '6 分钟',
      mantra: '听力和仔细阅读占 55% 江山，高频词按艾宾浩斯滚雪球，12 天足够稳过 425+！',
      coreHtml: `
        <p>大学英语四级（CET-4）满分 <strong>710 分</strong>，及格线 <strong>425 分</strong>（约占卷面总分的 60%）。在不到 14 天的极限冲刺期里，最致命的错误是“平均用力”或从头背 A-Z 字典。你必须把 80% 精力砸在<strong>单位时间回报率最高</strong>的四大板块：</p>
        <div class="info-table-wrap">
          <table>
            <thead>
              <tr><th>题型模块</th><th>题量与分值</th><th>占比</th><th>12天冲刺目标</th><th>考场控时</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>短文写作</strong></td><td>1 篇 · 106.5 分</td><td>15%</td><td>稳拿 78+（结构清+少语法错）</td><td>25-30 分钟</td></tr>
              <tr><td><strong>听力理解</strong></td><td>25 题 · 248.5 分</td><td>35%</td><td>对 16-18 题（约 165+ 分）</td><td>25 分钟（随录音）</td></tr>
              <tr><td><strong>选词填空</strong></td><td>10 空 · 35.5 分</td><td>5%</td><td>对 6-7 空（每空仅 3.55 分）</td><td>严格 <= 7 分钟</td></tr>
              <tr><td><strong>长篇匹配</strong></td><td>10 题 · 71.0 分</td><td>10%</td><td>对 8-9 题（稳拿 56+ 分）</td><td>12-13 分钟</td></tr>
              <tr><td><strong>仔细阅读</strong></td><td>10 题 · 142.0 分</td><td>20%</td><td>对 8 题（每题 14.2 分！）</td><td>18-20 分钟</td></tr>
              <tr><td><strong>段落汉译英</strong></td><td>1 段 · 106.5 分</td><td>15%</td><td>稳拿 75+（主干对+词准确）</td><td>25 分钟</td></tr>
            </tbody>
          </table>
        </div>
        <div class="tip-box">
          <strong>黄金记忆铁律：</strong>本平台已从 39 套 2014–2026 四级真题语料中筛出 <strong>312 个超高频核心词</strong>（每天仅 26 词）。采用<strong>“听音带背 + 3态卡片重排 + 第1/2/4/7天艾宾浩斯复刷”</strong>，比死抄单词效率高 3 倍，还能顺带打通听力辨音！
        </div>
      `,
      strategySteps: [
        {
          step: '01',
          title: '先抓“双核大盘”：听力 248.5 + 仔细阅读 142',
          detail: '仅这两项就占 390.5 分（55%）。仔细阅读 1 题 = 4 道选词填空！考场阅读做题顺序建议：仔细阅读 -> 长篇匹配 -> 选词填空。',
          example: '策略收益：就算选词填空只对 5 空，只要仔细阅读对 8 题、长篇对 8 题，阅读总分仍高达 188+。'
        },
        {
          step: '02',
          title: '每天固定 20 分钟“高频带背”，用耳朵记词',
          detail: '背四级词一定要“音-形-义”绑定，否则阅读认识、听力还是听不出来。利用本平台“高频带背”的语音循环与盲听选义，通勤/睡前直接磨耳。',
          example: '例：available /əˈveɪləbl/ 在近 10 年真题复现数十次，听力常考“有空的 / 可买到的”。'
        },
        {
          step: '03',
          title: '用 1/2/4/7 间隔复刷消灭“背了就忘”',
          detail: '每天新背 26 词的同时，只需花 8 分钟清掉昨天标为“模糊/不认识”的词。点击卡片“不认识”会在 3 词后立刻重现，强行焊进长期记忆。',
          example: '第 1-3 天主攻听力 + 词汇，第 4-6 天选词 + 听力，第 7-9 天大阅读，第 10-12 天译写 + 错词清零。'
        }
      ],
      drill: {
        prompt: '在距离四级只剩 12 天时，考场阅读部分（40分钟）最科学的做题顺序与时间分配是？',
        options: [
          'A. 按试卷顺序死磕选词填空 15 分钟，剩下时间再匆忙做仔细阅读',
          'B. 仔细阅读（20分钟，14.2分/题）-> 长篇匹配（13分钟，7.1分/题）-> 选词填空（7分钟，3.55分/题）',
          'C. 把全部 40 分钟都用来逐句精读长篇匹配，选词和仔细阅读最后蒙答案',
          'D. 先花 15 分钟把长篇阅读 12 个自然段从头到尾翻译一遍再看题'
        ],
        answerIdx: 1,
        hint: '比较三种阅读题型的单题分值：仔细阅读每题 14.2 分，长篇匹配 7.1 分，选词填空仅 3.55 分。',
        explain: '仔细阅读单题分值最高（14.2分，是选词填空的 4 倍），头脑最清醒时先拿下仔细阅读和稳分的长篇匹配，最后用词性法 7 分钟速杀选词填空，是四级高分公认的最优考场节奏。'
      },
      animId: 'ebbinghaus',
      animCaption: '点击动画中的 Day 1 / 2 / 4 / 7 / 11 复习节点，观察间隔复习如何把 14 天记忆留存率拉升至 85% 以上',
      relatedVocabDay: 1
    },

    t_listen_preread: {
      id: 't_listen_preread',
      moduleId: 'ch1_listen',
      skillId: 'listen',
      title: '听力“未听先知”预读法与新闻首尾句',
      subtitle: '录音还没响，你已经通过选项猜出 70% 的考点和提问方向',
      timeEst: '10 分钟',
      mantra: '放音前先看选项找“主语+差异词”，新闻前两句定大意，数字地点耳朵竖起！',
      coreHtml: `
        <p>很多同学听力失分不是因为词汇量不够，而是<strong>“盲听”</strong>——录音都放到第三句了，还在慌忙扫 A/B/C/D 选项，结果顾此失彼。四级听力不印题干，但印着全部选项，这其实是一张<strong>考点藏宝图</strong>！</p>
        <h4>一、考场“未听先知”15 秒黄金预读三步法</h4>
        <ul>
          <li><strong>Step 1 竖看选项找共性（预测主题）：</strong>3 秒竖扫 A/B/C/D。如果四个选项都出现 <em>flight / plane / pilot</em>，就知道这是一篇航空事故新闻；如果都是 <code>To + 动词原形</code>，问题大概率是 <em>What is the purpose of...?</em></li>
          <li><strong>Step 2 横划每项“独有差异词”（锁定听音目标）：</strong>忽略四个选项相同的开头（如 <em>It was...</em> / <em>They are...</em>），只圈出决定对错的<strong>核心动词 + 宾语 + 特殊形容词/数字</strong>。</li>
          <li><strong>Step 3 边听边把眼睛停在选项上（所听即所得筛选）：</strong>录音开始后，千万别闭眼盲听！视线停留在已划线的差异词上，听到对应意群瞬间打勾或画叉。</li>
        </ul>
        <h4>二、四级新闻听力（Section A · 7 题）三大必杀规律</h4>
        <ul>
          <li><strong>黄金首句律（导语即主旨）：</strong>英语新闻采用“倒金字塔结构”，<strong>前 1-2 句</strong>必然交代 <em>Who / What / Where / When</em>，80% 的新闻第一题答案就在前两句！</li>
          <li><strong>细节追踪律（数字/时间/因果）：</strong>第二、三题常考具体损失、采取的措施或原因，重点盯紧数字（年份、金额、人数）、<code>because / due to / as a result</code> 和官方发言人（<code>officials said / police reported</code>）。</li>
          <li><strong>原词复现陷阱警惕：</strong>新闻题常出现<strong>“视听一致”（直接命中）</strong>，但也可能把原文的 A 事安到 B 人头上（张冠李戴），务必听清主语和动作是否配对。</li>
        </ul>
        <div class="tip-box">
          <strong>2018.06 真题实证：</strong>选项分别为 <em>A) A deadly train crash / B) A violent snowstorm / C) A giant fire / D) A serious flood</em>。预读 2 秒就能断定：本题必问“发生了什么灾害”！录音首句一响 <em>"A massive blaze broke out..."</em>，立刻将 <code>blaze</code> 同义映射为 <strong>C) A giant fire</strong>，3 秒锁定答案！
        </div>
      `,
      strategySteps: [
        {
          step: '01',
          title: '利用试音与 Directions 的 90 秒抢读前 7 题',
          detail: '考场开头的试音和读 Directions 时千万不要发呆！立刻抢读新闻 1-7 题选项，划出每项的动词+名词差异点。',
          example: '选项 A) Cut down its budget / B) Expand its campus -> 只盯 Cut budget 与 Expand campus。'
        },
        {
          step: '02',
          title: '新闻开头 10 秒全神贯注抓导语（5W）',
          detail: '新闻第一句话往往很长，不要纠结生僻地名或人名，专注听清“谁（主语）+ 干了什么大事（谓语宾语）”。',
          example: '听到 "A rare bird has been rescued by..." -> 抓核心：rare bird + rescued。'
        },
        {
          step: '03',
          title: '读问题时的 13 秒间隔：果断涂卡 + 抢看下一题',
          detail: '不要在已经放完的题目上反复纠结超过 3 秒！选定最有把握的选项后，立即把剩余 10 秒留给下一组题目的选项预读。',
          example: '节奏铁律：宁丢半题纠结，不丢整篇预读！'
        }
      ],
      drill: {
        prompt: '预读某四级新闻题的四个选项：A) To attract more tourists.  B) To cut maintenance costs.  C) To protect local wildlife.  D) To expand parking space. 仅凭预读，你能准确预测什么？',
        options: [
          'A. 题目一定在问事件发生的具体时间',
          'B. 题目在问某项举措的“目的/原因”，听录音时应重点捕捉 to / in order to / aimed at 后的动作',
          'C. 题目在问发言人的职业身份',
          'D. 无法做任何预测，必须等录音放完听提问'
        ],
        answerIdx: 1,
        hint: '注意四个选项全部以不定式 "To + 动词" 开头！',
        explain: '四个选项全为 "To do..." 结构，这是四级听力最典型的“目的题”预读信号！放音前即可锁定问题为 "What is the purpose of...?"，听音时重点捕捉 attract tourists / cut costs / protect wildlife / expand parking 的对应表达或同义替换。'
      },
      animId: 'listening_radar',
      animCaption: '切换模式体验“未听先知选项聚类预读”与“声波信号雷达锁定答案”，点击可放大全屏演练',
      relatedVocabDay: 1
    },

    t_listen_signal: {
      id: 't_listen_signal',
      moduleId: 'ch1_listen',
      skillId: 'listen',
      title: '长对话与篇章：信号词与同义替换',
      subtitle: '耳朵装上“信号词触发器”，再也不怕长对话绕晕与短文走神',
      timeEst: '12 分钟',
      mantra: '转折之后出真意，问答回合盯答句，原词拼凑要提防，同义改写最保真！',
      coreHtml: `
        <p>四级听力 <strong>Section B（长对话 8 题）</strong>和 <strong>Section C（短文篇章 10 题，每题高达 14.2 分！）</strong>是拉开分数差距的决胜场。长对话与篇章的出题位置高度规律，只要听出<strong>五大高频信号词</strong>，你就知道“考点到了，马上竖起耳朵”：</p>
        <div class="info-table-wrap">
          <table>
            <thead>
              <tr><th>信号词类型</th><th>高频触发词（听到立刻警觉）</th><th>对应高频考点</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>转折强调类（最高频！）</strong></td><td><code>but, however, actually, in fact, yet, instead, rather than</code></td><td>说话人的真实观点、拒绝理由、反转事实</td></tr>
              <tr><td><strong>因果解释类</strong></td><td><code>because, since, due to, as a result, lead to, that's why</code></td><td>问题成因、决策依据、事件后果</td></tr>
              <tr><td><strong>建议祈使类</strong></td><td><code>why not, how about, suggest, recommend, had better, should</code></td><td>说话人的建议或下一步行动</td></tr>
              <tr><td><strong>最高级/比较级</strong></td><td><code>the most, the biggest, especially, mainly, primarily, only</code></td><td>短文核心特征、首要原因、唯一例外</td></tr>
              <tr><td><strong>序数/举例/总结</strong></td><td><code>first, another, for instance, in conclusion, the key is</code></td><td>分点细节题、篇章主旨总结题</td></tr>
            </tbody>
          </table>
        </div>
        <h4>必懂技巧：长对话“问答对应”与短文“题文同序”</h4>
        <ul>
          <li><strong>长对话问句即路标：</strong>当一方抛出疑问句（如 <em>"Why did you change your plan?"</em> 或 <em>"What impressed you most?"</em>），<strong>紧接着另一方的回答</strong>几乎 100% 是该题答案区！</li>
          <li><strong>短文篇章“顺序出题”：</strong>3 道题基本严格按照文章从头到尾的顺序分布（第 1 题在前 1/3，第 2 题在中段，第 3 题在尾段）。盯紧当前题选项，一旦听完当前题的信号区，视线马上移向下一题。</li>
          <li><strong>真答案的两种长相：</strong>低难度题考<strong>核心意群视听一致</strong>；中高难度题（尤其是 Section C 14.2分大题）常考<strong>同义替换</strong>，例如录音说 <em>"costs have risen sharply"</em> -> 选项写 <strong>"became much more expensive"</strong>。</li>
        </ul>
      `,
      strategySteps: [
        {
          step: '01',
          title: '长对话首回合定场景 + 记清男女声立场',
          detail: '前两轮对话交代人物关系（同事/师生/顾客与客服）和核心矛盾。若选项主语为 "The woman" / "The man"，只记对应性别的话，防止张冠李戴。',
          example: '男方说 "I thought it was boring, but actually the ending moved me." -> 答案在 but actually 后的 moved me。'
        },
        {
          step: '02',
          title: '短文篇章死守“首尾句 + 信号词”双锚点',
          detail: '短文每篇 220–260 词，没必要每个词都听懂！紧盯选项关键词，听到转折/因果/最高级信号词时集中全部注意力听清完整句意。',
          example: '录音："Unlike traditional gyms, the new studio focuses mainly on..." -> mainly on 后面即核心考点！'
        },
        {
          step: '03',
          title: '用“原词拼凑排除法”避开高频干扰',
          detail: '如果某选项把录音里听到的两个毫不相干的词硬凑在一起，或者把否定说成肯定，坚决排除；优先选语义与录音整句一致的同义改写项。',
          example: '录音："hardly anyone noticed the change" -> 排除 "Many people noticed..."，选 "Few people were aware..."。'
        }
      ],
      drill: {
        prompt: '长对话中，女方问："Are you going to accept the job offer in Chicago?" 男方回答："The salary is impressive, but I really cannot bear the freezing winters there, so I turned it down." 请问男方拒绝该工作的主要原因是？',
        options: [
          'A. The salary offered was too low.',
          'B. He disliked the cold climate in Chicago.',
          'C. The company withdrew the offer.',
          'D. He wanted to stay closer to his parents.'
        ],
        answerIdx: 1,
        hint: '锁定转折信号词 "but" 后面的核心信息，并注意 freezing winters 的同义替换。',
        explain: '男方先让步肯定薪水（salary is impressive，构成 A 项干扰），紧接着转折词 "but" 引出真正原因 "cannot bear the freezing winters"（忍受不了严寒冬天），同义替换为 B 项 "disliked the cold climate"。'
      },
      animId: 'listening_radar',
      animCaption: '观察“转折信号与同义雷达”模式：声波经过 but / actually 时如何点亮高光并连线正确选项',
      relatedVocabDay: 3
    },

    t_cloze_pos: {
      id: 't_cloze_pos',
      moduleId: 'ch2_cloze',
      skillId: 'cloze',
      title: '15选10四大词性后缀速判与槽位排除',
      subtitle: '不读全篇翻译，靠词性四车道 3 秒把 15 个词砍剩 2-3 个',
      timeEst: '8 分钟',
      mantra: '先标 15 词四词性，再判空格语法槽，候选从 15 缩到 3，省时又准！',
      coreHtml: `
        <p>选词填空（Banked Cloze）只占总分 <strong>5%（每空 3.55 分）</strong>，但却是全卷最容易“超时踩坑”的题。高分考生的秘诀是<strong>绝不拿着 15 个词挨个往空里套翻译</strong>，而是先花 60 秒做<strong>词性四车道分拣</strong>：</p>
        <div class="info-table-wrap">
          <table>
            <thead>
              <tr><th>词性车道</th><th>高频特征后缀（扫一眼即识破）</th><th>常见空格语法槽位信号</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>名词 (n.)</strong></td><td><code>-tion/-sion, -ment, -ness, -ity, -ance/-ence, -er/-or, -ship</code></td><td>冠词 (a/an/the) 后、形容词后、介词后、作主语或及物动词宾语</td></tr>
              <tr><td><strong>动词 (v.)</strong></td><td><code>-ize/-ise, -ate, -ify, -en</code>，以及 <code>-ed / -ing / -s</code> 形态</td><td>主语之后缺谓语、情态动词/to 后用原形、have/be 后接分词</td></tr>
              <tr><td><strong>形容词 (adj.)</strong></td><td><code>-al, -ive, -ous, -ful, -less, -able/-ible, -ent/-ant, -ic</code></td><td>修饰名词前、系动词 (be/seem/remain/become) 之后、副词之后</td></tr>
              <tr><td><strong>副词 (adv.)</strong></td><td><code>-ly</code>（注意 friendly/likely/costly 是形容词！）</td><td>句首逗号前、修饰动词（动前或动后）、修饰形容词/过去分词前</td></tr>
            </tbody>
          </table>
        </div>
        <div class="tip-box">
          <strong>特别注意“双性词”与“分词形容词”：</strong>四级 15 选 10 极爱考 <code>-ed / -ing</code> 结尾的词（既可能是动词过去式/进行时，也可能是形容词作定语或表语，如 <em>increasing / limited / advanced</em>），标词性时务必同时标注 <code>v./adj.</code>！
        </div>
      `,
      strategySteps: [
        {
          step: '01',
          title: '60 秒给 A–O 十五个词贴词性标签',
          detail: '直接在词旁写简写 n / v / adj / adv，并顺手细分名词单复数（-s）、动词形态（原形 / -s / -ed / -ing）。通常 15 词中副词仅 1-3 个，往往最先秒杀！',
          example: '若全表只有 B) dramatically 和 K) merely 两个副词，遇到副词空只需 2 选 1！'
        },
        {
          step: '02',
          title: '跳过首句（无空）抓主题，逐空切语法槽',
          detail: '第一句一般不设空，快速读完知道文章主题和基础时态（一般现在时还是过去时）。然后只看空格前后 3-5 个词判定所需词性与形态。',
          example: '"to ____ their digital skills" -> to 后缺及物动词原形 -> 直接去 v.(原形) 车道挑词！'
        },
        {
          step: '03',
          title: '用完即划掉，先易后难滚雪球',
          detail: '四级选词填空每个选项最多用一次！先秒杀最确定的副词空、固定搭配空和单复数唯一空，剩下难空的候选范围会自动坍缩。',
          example: '记住：不确定的空先标 2 个候选字母跳过，做完其他空回来往往只剩唯一解！'
        }
      ],
      drill: {
        prompt: '在句子 "The new policy has ____ reduced the waiting time for patients across rural clinics." 中，空格处应优先从哪一条词性车道选词？',
        options: [
          'A. 名词车道（如 reduction / policy）',
          'B. 副词车道（如 significantly / dramatically），修饰谓语动词 reduced',
          'C. 动词原形车道（如 reduce / expand）',
          'D. 形容词车道（如 significant / dramatic）'
        ],
        answerIdx: 1,
        hint: '观察空格两侧：左边是助动词 has，右边是已经完整的过去分词 reduced，句子主干已齐全。',
        explain: '"has + ____ + reduced" 是经典的“助动词 + 副词 + 实义动词分词”槽位！主干 "The new policy has reduced the waiting time" 完整无缺，中间只能填副词修饰 reduced 的程度。'
      },
      animId: 'cloze_pipeline',
      animCaption: '观看 15 词库自动分流进 n./v./adj./adv. 四车道，并通过语法槽位将候选从 15 收缩到 1',
      relatedVocabDay: 7
    },

    t_cloze_context: {
      id: 't_cloze_context',
      moduleId: 'ch2_cloze',
      skillId: 'cloze',
      title: '固定搭配、时态呼应与上下文复现',
      subtitle: '当同词性剩下 2-3 个候选词时，如何 100% 挑中唯一正解',
      timeEst: '8 分钟',
      mantra: '词性缩小范围，搭配锁定动词，并列看感情色彩，上下句找线索词！',
      coreHtml: `
        <p>用词性把候选缩小到 2-3 个后，决定胜负的不是“猜手感”，而是四级真题反复验证的<strong>四大语义锁定器</strong>：</p>
        <ul>
          <li><strong>锁定器 1 · 介词与动宾固定搭配：</strong>看到空格后面的介词（<code>to / in / with / on / from / of</code>），立刻用搭配筛选。如 <code>contribute to</code>、<code>cope with</code>、<code>adapt to</code>、<code>rely on</code>、<code>prevent ... from</code>。</li>
          <li><strong>锁定器 2 · 并列与转折感情色彩：</strong>由 <code>and / or / as well as</code> 连接的两个词词性与褒贬一致；由 <code>but / while / whereas / instead</code> 连接的词感情色彩相反。</li>
          <li><strong>锁定器 3 · 主语语义与及物性检查：</strong>看动词是否能直接跟宾语（及物 vt. 还是不及物 vi.），以及主语是人还是物（例如 <em>enable / allow</em> 常接人作宾语，<em>occur / happen</em> 无被动）。</li>
          <li><strong>锁定器 4 · 时态与单复数硬指标：</strong>主语是复数名词或前文出现 <code>many / several / these</code>，名词空必选复数；全文讲历史事件，谓语空必选 <code>-ed</code> 过去式。</li>
        </ul>
      `,
      strategySteps: [
        {
          step: '01',
          title: '紧盯空格后的“小介词”',
          detail: '许多动词空和形容词空只需看后面跟着什么介词就能秒杀，不必纠结整句长难结构。',
          example: '"be ____ to climate change" -> 后面跟 to，在 vulnerable / effective / essential 中结合语境锁定 vulnerable to（易受……影响）。'
        },
        {
          step: '02',
          title: '利用 and / but 判断褒贬极性',
          detail: '遇到不熟的形容词或名词，先标出句子感情是“正向 (+)”还是“负向 (-)”，立刻踢掉极性相反的候选词。',
          example: '"not only convenient but also ____" -> 必选正向形容词（如 affordable / reliable），直接排除 costly / risky。'
        },
        {
          step: '03',
          title: '回看上下两句寻找“同义复现词”',
          detail: '四级选词文章逻辑紧密，空格要填的词往往在前一句或后一句有同义词或解释性线索。',
          example: '前句出现 "save money"，下句空处选形容词 -> 优先匹配 economical / affordable。'
        }
      ],
      drill: {
        prompt: '句中出现 "Small businesses often struggle to ____ with sudden shifts in consumer demand." 候选动词原形有：A) cope  B) adapt  C) focus  D) maintain。应选哪一个？',
        options: [
          'A. cope（固定搭配 cope with 应对/处理）',
          'B. adapt（常搭配 adapt to，而非 with）',
          'C. focus（常搭配 focus on，而非 with）',
          'D. maintain（及物动词，直接接宾语，不加 with）'
        ],
        answerIdx: 0,
        hint: '紧盯空格后面的介词 with，检查四个动词各自的固定介词搭配！',
        explain: '四个候选词全是动词原形，但只有 cope 与介词 with 构成固定高频短语 cope with（应对/处理）。adapt 接 to，focus 接 on，maintain 为及物动词直接接名词。'
      },
      animId: 'cloze_pipeline',
      animCaption: '在语法槽位筛选后，观察搭配介词与语义极性如何完成最后一步精准落锁',
      relatedVocabDay: 8
    },

    t_long_scan: {
      id: 't_long_scan',
      moduleId: 'ch3_matching',
      skillId: 'matching',
      title: '定位词三级优先与段落扫读节奏',
      subtitle: '不读懂全文也能 12 分钟稳拿长篇匹配 8-10 题的实战法',
      timeEst: '9 分钟',
      mantra: '先看 10 题划定位，特词优先普词后，逐段扫读一次清，切忌一题翻全篇！',
      coreHtml: `
        <p>长篇阅读（信息匹配，10 题 × 7.1 分 = 71 分）文章长达 1000 词左右，但它是四级阅读里<strong>最容易拿高分甚至满分</strong>的题型！核心禁忌是“拿第 36 题去全文找一遍，再拿第 37 题从头找一遍”——那样会反复读文章 10 遍直接超时。</p>
        <h4>一、定位词“三级优先级”法则（每题划 2-3 个词）</h4>
        <ul>
          <li><strong>一级黄金定位词（一眼发光，绝不改写）：</strong>年份/数字/百分比（<code>2018, 40%, two-thirds</code>）、大写专有名词（人名、地名、机构名、书名）、连字符复合词（<code>self-driving, long-term</code>）、引号词。</li>
          <li><strong>二级核心定位词（实义核心名词/罕见词）：</strong>段落中不容易被泛泛提及的具体事物名词，如 <code>commuters, tuition, glacier, drone, sleep deprivation</code>。</li>
          <li><strong>三级避坑（不要划主题高频词！）：</strong>文章标题本身就叫 <em>Artificial Intelligence in Education</em>，千万别划 <em>AI</em> 或 <em>students</em> 当定位词，因为几乎每段都有！</li>
        </ul>
        <h4>二、最省时的“逐段扫读法”（只扫文章一遍！）</h4>
        <p>划完 10 道题的定位词后，回到文章<strong>从 A 段读到末段</strong>。每读完一段（重点扫该段首尾句、数字、大写词和核心观点句），快速扫一眼刚才的 10 道题，把所有与本段高度吻合的题号填上。整篇文章只看 1 遍，12 分钟稳稳结束！</p>
      `,
      strategySteps: [
        {
          step: '01',
          title: '2 分钟速划 10 道题干的 2-3 个定位词',
          detail: '每题必须划出“对象 + 核心事件/观点”，避免只划一个词导致撞车。把带数字、大写字母的题标上星号，最容易一眼命中。',
          example: '题干："According to Professor Smith, remote workers save nearly an hour a day." -> 划 Smith + remote workers + save / hour。'
        },
        {
          step: '02',
          title: '从 A 段开始逐段扫读，先抓段首尾与亮眼词',
          detail: '每段先看第一句和最后一句，中间快速垂直扫视数字、人名、转折词。记住：四级长篇允许某段对应 2 题，也可能某段 0 题。',
          example: '扫读 D 段看到 "Smith notes that skipping daily commutes frees up almost 60 minutes..." -> 立刻匹配！'
        },
        {
          step: '03',
          title: '先做“一眼锁死题”，剩余 2-3 题精准回查',
          detail: '第一遍扫完一般能稳拿 7-8 题。最后只剩 2-3 道抽象改写题时，回看尚未用过的段落（但也要注意已用段落也可能复选）集中比对。',
          example: '遇到二选一时，比对哪一段同时满足题干的“全部 2-3 个语义要素”，而非只蹭了一个词。'
        }
      ],
      drill: {
        prompt: '一篇题为 "The Future of Urban Cycling" 的长篇匹配中，某题干为："A 2022 survey in Copenhagen revealed that dedicated bike lanes reduced traffic injuries by over 30%." 最有效的定位词组合是？',
        options: [
          'A. urban / cycling / bike',
          'B. future / survey / traffic',
          'C. 2022 / Copenhagen / 30% / injuries',
          'D. revealed / that / over'
        ],
        answerIdx: 2,
        hint: '避开文章标题高频主题词（urban/cycling/bike），优先抓年份、大写地名和具体百分比！',
        explain: '2022（年份）、Copenhagen（大写专有名词）、30%（具体数字）属于一级黄金定位词，在千字长文中具有极高辨识度，配合核心名词 injuries 可在 5 秒内精准锁定目标段。'
      },
      animId: 'long_read_scan',
      animCaption: '观看长篇扫读扫描仪如何高亮题干一级定位词，向 A-G 段落发射匹配光束并锁死同义替换',
      relatedVocabDay: 4
    },

    t_long_para: {
      id: 't_long_para',
      moduleId: 'ch3_matching',
      skillId: 'matching',
      title: '同义改写识别与多段重词干扰排除',
      subtitle: '为什么“看到一个原词就选”会掉坑？教你用双要素验真法',
      timeEst: '9 分钟',
      mantra: '只重一个词多是干扰，核心意思全改写才是真命天子！',
      coreHtml: `
        <p>近几年（2024–2026）四级长篇阅读越来越少“原词照抄”，而是重点考查<strong>同义改写（Paraphrasing）</strong>。掌握以下 4 类高频改写套路，你就能一眼认出隐藏的正确段落：</p>
        <ul>
          <li><strong>词性转换改写：</strong>原文 <em>"critics argue strongly"</em> -> 题干 <em>"strong criticism"</em>；原文 <em>"fails to protect"</em> -> 题干 <em>"lack of protection"</em>。</li>
          <li><strong>同义词/上下义替换：</strong>原文 <em>"elderly residents"</em> -> 题干 <em>"senior citizens / older people"</em>；原文 <em>"cut expenses"</em> -> 题干 <em>"lower costs / save money"</em>。</li>
          <li><strong>正话反说（双重否定/反义转化）：</strong>原文 <em>"rarely leads to immediate profits"</em> -> 题干 <em>"hardly brings quick financial returns"</em>；原文 <em>"no longer affordable"</em> -> 题干 <em>"too expensive to buy"</em>。</li>
          <li><strong>具体事例概括为抽象概念：</strong>原文列举 <em>"smartphones, tablets, and laptops"</em> -> 题干概括为 <em>"digital devices / electronic gadgets"</em>。</li>
        </ul>
        <div class="tip-box">
          <strong>双要素防伪原则：</strong>不要因为某段出现了题干里的 1 个熟词就草率落笔！必须验证<strong>“主语对象 + 动作/结论”至少两个独立信息点</strong>在该段同时成立，才能彻底免疫多段重词干扰。
        </div>
      `,
      strategySteps: [
        {
          step: '01',
          title: '拆解题干为“A（谁）+ B（做了什么/什么特征）”',
          detail: '任何一道长篇匹配题干都可以拆成两个核心语义块，正确段落一定同时覆盖 A 和 B。',
          example: '题干："Younger buyers prefer renting clothes rather than owning them." -> A: 年轻买家；B: 偏爱租衣而非购买。'
        },
        {
          step: '02',
          title: '重点检查“逻辑关系词”是否被掉包',
          detail: '干扰段常出现相同的名词，但把“原因”说成“结果”，或把“支持”说成“反对”。核对态度词与因果方向即可秒排干扰。',
          example: '题干说 "encourages creativity"，若某段说 "hinders creativity"，即便原词全重也必须淘汰！'
        },
        {
          step: '03',
          title: '遇到卡壳题，转而寻找“具体举例的抽象概括”',
          detail: '当题干很抽象（如 "financial burden" / "environmental impact"）时，段落中往往用具体数据或例子来体现它。',
          example: '原文写 "carbon emissions dropped sharply" -> 对应题干 "beneficial to the environment"。'
        }
      ],
      drill: {
        prompt: '某长篇题干为："High housing prices have forced many young professionals to move away from city centers." 下列哪一句段落原话构成最准确的同义改写匹配？',
        options: [
          'A. City centers attract young professionals because of abundant job opportunities.',
          'B. Soaring rents and property costs leave early-career workers with little choice but to settle in outer suburbs.',
          'C. Housing prices in outer suburbs have recently risen faster than expected.',
          'D. Many young professionals prefer modern apartments in the heart of the city.'
        ],
        answerIdx: 1,
        hint: '对照三个同义链：high housing prices -> soaring rents and property costs；young professionals -> early-career workers；move away from city centers -> settle in outer suburbs。',
        explain: 'B 项实现了完美的四重同义改写（高房价 = soaring rents and property costs，被迫 = leave...with little choice，年轻职场人 = early-career workers，搬离市中心 = settle in outer suburbs）。A/C/D 虽然重复了原词，但语义完全背离。'
      },
      animId: 'long_read_scan',
      animCaption: '观察右侧段落被扫读时，抽象题干如何通过同义词桥梁与具体段落证据精准咬合',
      relatedVocabDay: 11
    },

    t_read_detail: {
      id: 't_read_detail',
      moduleId: 'ch4_reading',
      skillId: 'reading',
      title: '题文同序、精准回文定位与细节替换',
      subtitle: '拿下每题 14.2 分的黄金法则：先定位唯一证据句，再看选项',
      timeEst: '10 分钟',
      mantra: '先看五题题干不看选项，题文同序锁段落，找到证据句再对四个选项！',
      coreHtml: `
        <p>仔细阅读（2 篇共 10 题，<strong>每题 14.2 分</strong>）是四级全卷单题含金量最高的题型。很多同学做错的原因是“通读全文凭模糊记忆选”，或者“还没定位就先看 4 个选项被干扰项洗脑”。</p>
        <h4>四步高分闭环（严格执行，每篇 9 分钟）</h4>
        <ol>
          <li><strong>Step 1 仅读 5 道题干（不读选项）：</strong>30 秒串联 5 道题干关键词，提前掌握文章主线，同时划出每题的定位词（人名/实验/专有名词/特殊动词）。</li>
          <li><strong>Step 2 遵循“题文同序”回文划区：</strong>四级仔细阅读 95% 严格按段落顺序出题（如 46 题在 1-2 段，47 题在 2-3 段，48 题在 4 段……）。若第 47 题一时定位不到，先找到 46 和 48 题，答案一定夹在中间！</li>
          <li><strong>Step 3 精读定位句 + 上下各 1 句（黄金三句区）：</strong>找到关键词后，务必把该句及紧邻的转折/解释句读透，特别注意 <code>but / however / yet / in fact / rather</code> 后面的核心观点。</li>
          <li><strong>Step 4 拿着原文意思去“挑”选项：</strong>正确答案通常是定位句的<strong>精准同义改写</strong>，绝不强行脑补原文没说过的内容。</li>
        </ol>
      `,
      strategySteps: [
        {
          step: '01',
          title: '先看题干不看选项，避免被 3 个错误选项干扰',
          detail: '每题 4 个选项里有 3 个是命题人精心设计的假信息，提前读完 20 个选项只会混淆记忆。只读 5 个题干最省脑力！',
          example: '题干 46："What do we learn about the new study on sleep?" -> 带着“新睡眠研究发现什么”去第 1-2 段找。'
        },
        {
          step: '02',
          title: '紧盯定位句中的“转折与指代”',
          detail: '如果定位句以 "However, ..." 或 "This approach..." 开头，必须连读上一句确认指代对象，防止选错主语。',
          example: '原文："Earlier tools were costly. However, the updated sensor cuts expenses in half." -> 考点在 cuts expenses in half。'
        },
        {
          step: '03',
          title: '核对“程度词与范围词”一致性',
          detail: '原文写 "may contribute to"（可能有助于），选项写 "is the sole cause of"（唯一原因），立刻毙掉！',
          example: '柔和措辞（may / tend to / partly / some）往往是四级正确选项的常客。'
        }
      ],
      drill: {
        prompt: '原文定位句："While automated checkouts speed up transactions during peak hours, many shoppers still prefer human cashiers when purchasing complex items." 题目问：What does the passage say about automated checkouts? 哪项最准确？',
        options: [
          'A. They have completely replaced human cashiers in major stores.',
          'B. They help make checkout faster when stores are busy.',
          'C. They are preferred by shoppers buying complex items.',
          'D. They slow down service during peak shopping hours.'
        ],
        answerIdx: 1,
        hint: '紧盯 While 让步从句中对 automated checkouts 的真实描述，排除绝对词 completely 和张冠李戴！',
        explain: '原文 "speed up transactions during peak hours"（在高峰时段加快结账交易）精准同义改写为 B 项 "make checkout faster when stores are busy"。A 犯了绝对化错误，C 犯了张冠李戴（买复杂物品时顾客更爱人工收银），D 与原文相反。'
      },
      animId: 'careful_trap',
      animCaption: '观看仔细阅读证据显微镜如何锁定唯一原文句，并逐一检验排除干扰选项',
      relatedVocabDay: 2
    },

    t_read_main: {
      id: 't_read_main',
      moduleId: 'ch4_reading',
      skillId: 'reading',
      title: '主旨大意、作者态度与词义推断',
      subtitle: '不靠玄学语感：三类高阶阅读题的硬核破题公式',
      timeEst: '9 分钟',
      mantra: '主旨看首尾与串线，态度查情感形容词，猜词看定义与转折！',
      coreHtml: `
        <p>除了细节题，仔细阅读每篇常配 1-2 道<strong>主旨题、作者态度题或词义推断题</strong>。这类题看似抽象，实则套路极其固定：</p>
        <h4>1. 主旨大意/最佳标题题（Main Idea / Best Title）</h4>
        <ul>
          <li><strong>三处必看：</strong>第一段末尾（常引出核心主题或转折提出真论点）、各段首句串联、最后一段总结句。</li>
          <li><strong>两类必排：</strong>只覆盖某一段细节的<strong>“以偏概全”</strong>项；范围大到脱离本文对象的<strong>“过于宽泛”</strong>项。正确主旨必须包含贯穿全文的<strong>高频核心主题词</strong>。</li>
        </ul>
        <h4>2. 作者态度题（Author's Attitude）</h4>
        <ul>
          <li><strong>常考高频正面/中性/负面词：</strong><code>supportive / appreciative / optimistic / objective / cautious / skeptical / critical / concerned</code>。</li>
          <li><strong>四级几乎不选的极端陪跑词：</strong><code>indifferent（冷漠的）、biased（偏见的）、puzzled（困惑的）、gloomy（阴郁的）</code>——学术科普类文章作者极少“漠不关心”或“充满偏见”！</li>
        </ul>
        <h4>3. 词义/句意推断题（Vocabulary in Context）</h4>
        <ul>
          <li><strong>不要孤立背字面意思！</strong>一定要回原文看该词所在句的<strong>三大语境桥</strong>：同位语/破折号解释、<code>and / similarly</code> 同向并列、<code>but / unlike / rather than</code> 反向对比。</li>
        </ul>
      `,
      strategySteps: [
        {
          step: '01',
          title: '主旨题留在最后做，用前 4 题反向校验主线',
          detail: '做完前面 4 道细节题，你已经完整走过文章各段，此时用“高频核心词 + 串线法”秒选主旨题几乎零失误。',
          example: '若 4 道题都在讨论 "microplastics in drinking water"，主旨必然同时包含 microplastics 与 health/water。'
        },
        {
          step: '02',
          title: '态度题紧盯原文“情感动词、形容词与情态动词”',
          detail: '找作者自己（而非被引用专家！）使用的评价词，如 promising / alarming / misguided / worthwhile / deserves attention。',
          example: '作者写 "The scheme looks appealing on paper, yet ignores basic costs." -> 态度为 skeptical / critical / cautious。'
        },
        {
          step: '03',
          title: '词义题用“代入替换验真”',
          detail: '把 4 个选项分别代回原句生词位置，看哪一个最符合前后句的因果、对比或举例逻辑。',
          example: '"Unlike rigid schedules, flexible hours allow..." -> unlike 提示 rigid 与 flexible 相反 -> 锁定 inflexible / strict。'
        }
      ],
      drill: {
        prompt: '某文尾段作者写道："While the new wearable device offers exciting health metrics, its accuracy remains unproven and privacy safeguards lag behind. Consumers would be wise to wait before investing." 作者对该产品的态度最可能是？',
        options: [
          'A. Enthusiastic（热情推崇）',
          'B. Indifferent（漠不关心）',
          'C. Cautious（审慎观望）',
          'D. Biased（存有偏见）'
        ],
        answerIdx: 2,
        hint: '看尾句的核心建议 "would be wise to wait before investing" 以及前面指出的 unproven / lag behind。',
        explain: '作者先承认亮点（While... exciting），随即指出准确性未验证、隐私滞后，并建议消费者“明智的做法是观望再入手”，典型体现 C 项 Cautious（审慎的）。B/D 属于典型四级陪跑干扰词。'
      },
      animId: 'careful_trap',
      animCaption: '结合显微镜动画辨别以偏概全与过度推断，精准锁定作者真实立场',
      relatedVocabDay: 5
    },

    t_read_traps: {
      id: 't_read_traps',
      moduleId: 'ch4_reading',
      skillId: 'reading',
      title: '五大干扰项显微镜排雷实战',
      subtitle: '摸透四级命题人造错误选项的 5 把刻刀，二选一不再纠结',
      timeEst: '10 分钟',
      mantra: '避绝对、防偷换、查主语、忌脑补、不以偏概全——五大陷阱一照现形！',
      coreHtml: `
        <p>做仔细阅读最痛苦的莫过于“排掉两个，剩下两个二选一，每次都选错”。其实四级阅读的错误选项几乎全部来自<strong>固定五大造坑模板</strong>，用这张“排雷清单”一照就穿帮：</p>
        <div class="info-table-wrap">
          <table>
            <thead>
              <tr><th>陷阱类型</th><th>命题人惯用手法</th><th>一眼识破信号</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>1. 偷换概念</strong></td><td>保留原文大部分熟词，悄悄替换掉核心动词、宾语或修饰限定</td><td>看似最眼熟，但仔细核对“动作结果”已变味</td></tr>
              <tr><td><strong>2. 过度推断</strong></td><td>原文说“存在一定关联 / 有助于”，选项升级成“决定性原因 / 必然导致”</td><td>无中生有的因果链、把可能性写成必然性</td></tr>
              <tr><td><strong>3. 绝对化词</strong></td><td>把原文的 some / many / often 改成 all / only / never / completely / entirely</td><td>出现 <code>only, never, completely, must, sole, every</code> 时高度警惕</td></tr>
              <tr><td><strong>4. 张冠李戴</strong></td><td>把 A 群体的观点安到 B 群体头上，或把过去的情况说成现在</td><td>核对选项主语、时间状语与原文是否一一对应</td></tr>
              <tr><td><strong>5. 无中生有</strong></td><td>符合日常常识、听起来“很正确”，但原文根本没提过！</td><td>用“原文第几句说了这个？”一问就露馅</td></tr>
            </tbody>
          </table>
        </div>
        <div class="tip-box">
          <strong>考场二选一终极法则：</strong>剩下的两个选项里，<strong>(1) 原文照抄词最多但拼凑扭曲的</strong>往往是陷阱；<strong>(2) 措辞更克制（may / tend to / help）、语义精准同义改写定位句的</strong>，命中率高达 85%！
        </div>
      `,
      strategySteps: [
        {
          step: '01',
          title: '看到绝对词先亮黄牌，回原文验证',
          detail: '并非含 only/never 就 100% 错，但四级 90% 含绝对词的选项都是陷阱——除非原文定位句也明确出现唯一的绝对限定。',
          example: '原文 "a major factor" vs 选项 "the only factor" -> 秒标“绝对化陷阱”淘汰！'
        },
        {
          step: '02',
          title: '严防“常识正确但原文未提”',
          detail: '阅读理解考的是“文章说了什么”，不是生活常识测试。即使选项说“多锻炼有益健康”很正确，文章没写就不能选。',
          example: '每次犹豫时自问：我能用手指点出原文哪句话支撑这个选项吗？点不出就是无中生有。'
        },
        {
          step: '03',
          title: '逐词核对“主语 + 动作 + 宾语”三元组',
          detail: '把二选一的两个选项分别拆成“谁 -> 干了什么 -> 对谁”，与定位句逐一对齐，张冠李戴和偷换概念瞬间现形。',
          example: '原文 "Parents worry about screen time" vs 选项 "Children worry about screen time" -> 张冠李戴！'
        }
      ],
      drill: {
        prompt: '原文："Moderate coffee consumption has been linked to a lower risk of certain heart conditions, though researchers caution that adding heavy sugar and cream may cancel out these gains." 选项 "Drinking coffee guarantees protection against all heart diseases." 属于哪类典型干扰陷阱？',
        options: [
          'A. 绝对化与过度推断（把 moderate/certain/linked to 夸大成 guarantees 与 all）',
          'B. 张冠李戴（把咖啡和茶混淆）',
          'C. 褒贬倒置（把正面说成负面）',
          'D. 该选项完全正确，不是干扰项'
        ],
        answerIdx: 0,
        hint: '对比原文的 moderate / linked to / certain 与选项中的 guarantees / all！',
        explain: '原文措辞非常严谨：“适量（moderate）喝咖啡与某些（certain）心脏病风险降低有关（linked to）”。选项直接偷换成 guarantees（保证）和 all（所有），是教科书级别的“绝对化 + 过度推断”双重陷阱！'
      },
      animId: 'careful_trap',
      animCaption: '在动画中逐一给五大经典干扰选项盖上红章，建立考场排雷肌肉记忆',
      relatedVocabDay: 9
    },

    t_trans_struct: {
      id: 't_trans_struct',
      moduleId: 'ch5_translation',
      skillId: 'translation',
      title: '主干提取、长定语后置与被动/分词转换',
      subtitle: '告别中式逐字硬译：四步把汉语流水句重组为地道英语高分句',
      timeEst: '10 分钟',
      mantra: '先抓主谓宾骨架，长定语往后放，无主句变被动或 there be，小句合并用分词！',
      coreHtml: `
        <p>四级段落汉译英（140–160 汉字，<strong>106.5 分</strong>）阅卷最看重两点：<strong>(1) 英文句子结构合乎语法（不出现动词堆砌、缺主语）</strong>；<strong>(2) 核心语义表达准确</strong>。千万不要对着中文从左到右逐字翻译！请严格执行<strong>四步拆句重组引擎</strong>：</p>
        <ol>
          <li><strong>Step 1 抓出“谁做了什么”（英语主干 SVO）：</strong>先把中文长句里所有“……的”修饰语和“在……时期”时间地点状语括起来，抽出最核心的<strong>主语 + 谓语动词 + 宾语</strong>。</li>
          <li><strong>Step 2 中文“长前置定语”一律后置：</strong>汉语习惯把一长串定语堆在名词前（如“拥有数百年历史、深受游客喜爱的传统四合院”），英语必须先说核心名词 <code>traditional courtyards</code>，再用 <strong><code>which/that</code> 定语从句、介词短语（with/of）或过去分词</strong>挂到后面！</li>
          <li><strong>Step 3 攻克“汉语无主句”三大转换招：</strong>遇到“据统计 / 近年来修建了许多…… / 人们重视……”，优先转为：<strong>(a) 被动语态</strong>（<code>Many parks have been built...</code>）；<strong>(b) 补出泛指主语</strong>（<code>people / visitors / China</code>）；<strong>(c) <code>It is + adj./done + that</code> 或 <code>There be</code> 句型</strong>。</li>
          <li><strong>Step 4 汉语“连动流水句”改写为“主句 + 分词/从句”：</strong>中文一句可以连着写 3 个动词，但英文一个单句<strong>只能有 1 个谓语动词</strong>！其余次要动作改写成 <code>doing / done / to do</code> 或用 <code>and / which</code> 连接。</li>
        </ol>
        <div class="tip-box">
          <strong>2026.06 真题实战拆解（尊师与教师节）：</strong><br>
          中文：“在古代，学生初次拜见老师时要举行隆重的仪式，体现出对老师的高度敬重。”<br>
          <strong>主干：</strong>students held a formal ceremony（学生举行隆重仪式）<br>
          <strong>状语：</strong>In ancient times / when they first met their teacher<br>
          <strong>次要动作转现在分词：</strong><code>, reflecting the high regard in which teachers were held.</code>（彻底避免动词堆砌，立刻冲上 12+ 高档分！）
        </div>
      `,
      strategySteps: [
        {
          step: '01',
          title: '每句动笔前先划出唯一的谓语动词与时态',
          detail: '古代/过去发生用一般过去时（in ancient times -> held）；至今仍在发生/从某年起至今用现在完成时（since 1985 -> has observed）；客观事实与风俗用一般现在时。',
          example: '“自 1985 年以来，中国每年都在 9 月 10 日庆祝教师节。” -> since 1985 锁死现在完成时：China has observed Teachers\' Day... since 1985.'
        },
        {
          step: '02',
          title: '遇到不会拼的中文词，用“大白话同义降维”',
          detail: '考场绝不能留空或写拼音！不会写 etiquette 就写 table manners；不会写 courteous 就写 polite and warm；意思对、语法通照拿高分！',
          example: '“礼尚往来”不会翻 reciprocity？写成 "returning courtesies" 或 "exchanging gifts in return" 同样地道精准！'
        },
        {
          step: '03',
          title: '用 with / which / doing 消除“中式碎句”',
          detail: '全篇如果全是 5 个词的简单句很难拿高分。每段挑 2 句用非限定定语从句（, which...）或伴随分词（, reflecting / fostering...）合并，档次立升。',
          example: '“……已经延续了数千年，并在增进和谐关系方面发挥了重要作用。” -> have survived for thousands of years and played an important role in fostering harmonious relationships.'
        }
      ],
      drill: {
        prompt: '翻译句子：“四合院是一种历史悠久的传统中国民居，通常由四面环绕庭院的房屋组成。”下列哪句英语最符合四级高分句法规范？',
        options: [
          'A. Siheyuan is a has long history traditional Chinese house, usually have four sides houses around a yard.',
          'B. Siheyuan is a traditional Chinese residence with a long history, usually consisting of houses surrounding a central courtyard on all four sides.',
          'C. Siheyuan has long history traditional residence, it usually consists of four houses around yard.',
          'D. Traditional Chinese house Siheyuan have a long history and is surround a yard.'
        ],
        answerIdx: 1,
        hint: '检查唯一谓语动词原则、长定语后置（with a long history）以及现在分词作补充说明（consisting of ... surrounding ...）！',
        explain: 'B 项语法无懈可击：主干 "Siheyuan is a traditional Chinese residence" 清晰，长定语“历史悠久的”转为介词短语后置（with a long history），后半句“通常由……组成”转为分词短语 consisting of houses surrounding...，彻底避免 A/C/D 的动词堆砌和逗号拼接错误。'
      },
      animId: 'trans_restructure',
      animCaption: '观看中文长句如何被拆解为主干、长定语与状语色块，并平滑重组为地道英文 SVO 语序',
      relatedVocabDay: 10
    },

    t_trans_themes: {
      id: 't_trans_themes',
      moduleId: 'ch5_translation',
      skillId: 'translation',
      title: '2024-2026 真题高频文化社会核心译词',
      subtitle: '把近三年四级翻译反复出现的五大主题高频词块装进考场弹药库',
      timeEst: '9 分钟',
      mantra: '文化传统、礼仪习俗、科技民生、建筑园林、教育传承——背熟 30 个词块以不变应万变！',
      coreHtml: `
        <p>梳理 2016–2026 十年四级真题翻译可见，命题高度聚焦<strong>“讲好中国故事”五大母题</strong>（如 2026.06 尊师与教师节 / 餐桌礼仪 / 礼尚往来，2024.06 四合院 / 园林 / 农历文化等）。以下高频核心词块几乎年年复现：</p>
        <div class="info-table-wrap">
          <table>
            <thead>
              <tr><th>高频母题</th><th>必背中文概念 -> 高分英文译块</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>文化与美德</strong></td><td>传统美德 <code>traditional virtue</code>；文化遗产 <code>cultural heritage</code>；传承与弘扬 <code>preserve and promote / pass down</code>；和谐关系 <code>harmonious relationships</code></td></tr>
              <tr><td><strong>礼仪与习俗</strong></td><td>餐桌礼仪 <code>dining etiquette / table manners</code>；尊师重教 <code>honor/respect teachers</code>；礼尚往来 <code>returning courtesies / exchanging gifts</code>；表达敬意 <code>show one's respect</code>；主宾 <code>guest of honor</code></td></tr>
              <tr><td><strong>历史与建筑</strong></td><td>历史悠久 <code>with a long history / dates back to...</code>；延续数千年 <code>have survived for thousands of years</code>；四合院 <code>courtyard residence (Siheyuan)</code>；精心设计 <code>carefully crafted / thoughtfully designed</code></td></tr>
              <tr><td><strong>社会与民生</strong></td><td>显著改善 <code>significantly improve</code>；发挥重要作用 <code>play a vital role in doing...</code>；日益普及 <code>become increasingly popular</code>；便利日常生活 <code>bring great convenience to daily life</code></td></tr>
              <tr><td><strong>科技与生态</strong></td><td>绿色发展 <code>green/sustainable development</code>；低碳环保 <code>low-carbon and eco-friendly</code>；移动支付/快递 <code>mobile payment / express delivery</code>；人工智能 <code>artificial intelligence</code></td></tr>
            </tbody>
          </table>
        </div>
      `,
      strategySteps: [
        {
          step: '01',
          title: '先背“万金油高频动词词块”',
          detail: '无论考茶文化、教师节还是高铁，几乎都会用到：play an important role in / reflect / date back to / pass down / contribute to / enjoy great popularity。',
          example: '2026.06 三套翻译全用上了 reflect（体现）、traditional Chinese culture（中国传统文化）、important part/role！'
        },
        {
          step: '02',
          title: '专有文化词用“音译 + 简短解释”法',
          detail: '遇到四合院、端午节、功夫等中国特色词，首字母大写音译后配同位语或定语解释，既地道又绝不丢分。',
          example: 'Siheyuan, a traditional Chinese courtyard residence / Jiaozi, a traditional Chinese dumpling.'
        },
        {
          step: '03',
          title: '写完留 3 分钟专查“三大低级扣分项”',
          detail: '检查：(1) 第三人称单数与主谓一致；(2) 名词单复数与冠词 a/the；(3) 动词过去式/完成时态拼写。消灭低级错误即可稳增 15 分！',
          example: '常错提醒：play an important role（别漏 an）；thousands of years（别漏 s）；Chinese culture（不可数不加 a）。'
        }
      ],
      drill: {
        prompt: '在 2026.06 四级真题《餐桌礼仪》中，“这些习俗延续了数千年，并在增进和谐人际关系方面发挥了重要作用”最自然地道的高分表达是？',
        options: [
          'A. These customs continue thousand years and make big function to good relations.',
          'B. These customs have survived for thousands of years and have played an important role in fostering harmonious relationships.',
          'C. These custom survived thousands of year and play important role to foster harmony.',
          'D. The customs are surviving since thousand years and playing role in harmonious.'
        ],
        answerIdx: 1,
        hint: '核对“延续数千年”的现在完成时 + 复数 thousands of years，以及固定搭配 play an important role in doing。',
        explain: 'B 项精准使用现在完成时 have survived for thousands of years（延续了数千年），并衔接经典高分块 played an important role in fostering harmonious relationships（在增进和谐关系方面发挥重要作用），冠词、复数和介词全部满分。'
      },
      animId: 'trans_restructure',
      animCaption: '借助句法重组视图，对照高频中国文化核心译块练习主干与修饰的无缝衔接',
      relatedVocabDay: 9
    },

    t_write_struct: {
      id: 't_write_struct',
      moduleId: 'ch6_writing',
      skillId: 'writing',
      title: '四大常考文体与 120-180 词三段积木法',
      subtitle: '不背僵硬套话：用“审题抓任务 + 三段积木框架”25 分钟稳拿高分',
      timeEst: '10 分钟',
      mantra: '3 分钟审清文体与限定词，150 词分三段（观点 -> 双论证 -> 落地总结），绝不跑题！',
      coreHtml: `
        <p>分析 <strong>2024.12 – 2026.06 共 12 套最新四级真题作文</strong>（源自《四级写作积累》），命题已全面转向<strong>真实校园与社会交际任务</strong>，主要包括四大高频文体：</p>
        <ul>
          <li><strong>1. 校报投稿类</strong>（如：校园机器人未来应用、丰富传统文化知识、建设绿色校园）</li>
          <li><strong>2. 提案建议类</strong>（如：让校园生活更便利、学生会如何丰富校园生活）</li>
          <li><strong>3. 观点/提案回应类</strong>（如：大学生是否应参与科研项目、是否必修学术写作/大学语文）</li>
          <li><strong>4. 调查/论坛发言类</strong>（如：合理使用 AI 辅助学习、培养跨文化交际能力、快递行业发展与影响）</li>
        </ul>
        <h4>120–180 词“黄金三段积木架构”（最佳目标 145–165 词）</h4>
        <div class="info-table-wrap">
          <table>
            <thead>
              <tr><th>段落积木</th><th>推荐字数</th><th>核心功能（缺一不可）</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>第一段：亮明立场 / 回应任务</strong></td><td>30–40 词（2 句）</td><td>直切主题，亮明核心主张或提案目标，<strong>必须回应题干所有限定词</strong>（如 necessity 与 practicality）</td></tr>
              <tr><td><strong>第二段：双维展开 + 具体例证</strong></td><td>75–90 词（4–5 句）</td><td>提出 2 个具体措施/论点（用 <code>To begin with / Moreover / However</code> 衔接），每点紧跟<strong>具体校园场景或验证方式</strong></td></tr>
              <tr><td><strong>第三段：条件落地 / 价值升华</strong></td><td>30–40 词（2 句）</td><td>给出实施前提（如小范围试点、收集反馈）或重申长期价值，干净利落收尾</td></tr>
            </tbody>
          </table>
        </div>
        <div class="tip-box">
          <strong>审题避雷针：</strong>2026.06 第 3 套要求从 <em>necessity</em>（必要性）和 <em>practicality</em>（可行性）两方面回应；2024.12 第 1 套要求同时写“发展”与“影响”。<strong>漏答任何一个限定维度，分数直接掉一档！</strong>
        </div>
      `,
      strategySteps: [
        {
          step: '01',
          title: '前 3 分钟列英文关键词提纲，锁死所有任务限定词',
          detail: '动笔前先圈出题干中的 3 个关键要素：写给谁（校报/学生会/校方）、干什么（提建议/表立场/谈影响）、有几个必答角度。',
          example: '写《让校园生活更便利》提案 -> 提纲：统一服务信息页 + 考试周延长自习室 + 可追踪报修表。'
        },
        {
          step: '02',
          title: '正文第二段用“主张 + 具体例子 + 预期收益”撑起血肉',
          detail: '不要空喊口号（如 "It is very good and helpful"），改写具体场景（library shelves / online reservation / feedback survey），阅卷老师立刻给高分！',
          example: '具体化示例：A robot in the library could guide visitors to the right shelves or help staff return books.'
        },
        {
          step: '03',
          title: '严格控词在 145–165 词，留 3 分钟查拼写和时态',
          detail: '少于 120 词扣分极重；超过 200 词易出错且写不完。写完重点查：主谓一致、动词原形跟在 should/would 后、中式逗号连接两句话。',
          example: '每行约写 11–12 词，全篇保持 13–15 行就是视觉最舒服的黄金卷面！'
        }
      ],
      drill: {
        prompt: '2026.06 第 3 套要求回应“要求所有大学生参与一项科研项目”的提案，并强调从 necessity（必要性）和 practicality（可行性）两方面展开。哪一种三段规划最切题、得分最高？',
        options: [
          'A. 三段全部赞美科学家精神，完全不提普通大学生如何实施',
          'B. 第一段亮明有条件支持 -> 第二段先讲研究训练的通用价值（必要性），再讲嵌入课程的小项目与替代方案（可行性） -> 第三段强调合理工作量与指导',
          'C. 全文只写反对理由，只字不提科研的必要性',
          'D. 第一段抄写 Directions 原文 60 词凑字数，后面简单写两句总结'
        ],
        answerIdx: 1,
        hint: '对照审题铁律：必须同时回应 necessity 与 practicality，且避免空泛口号或照抄题干。',
        explain: 'B 项完整覆盖了 necessity（通用思维与证据评估价值）和 practicality（嵌入普通课程的小项目、阶段节点与替代选项）两大必答维度，并采用“有条件支持”的理性思辨立场，是最典型的四级高档分结构。'
      },
      animId: 'essay_builder',
      animCaption: '交互体验三段积木搭建过程，观察连接词与高分表达如何让 150 词短文层次分明',
      relatedVocabDay: 12
    },

    t_write_patterns: {
      id: 't_write_patterns',
      moduleId: 'ch6_writing',
      skillId: 'writing',
      title: '源自 2024-2026 真题的可迁移高分句型库',
      subtitle: '精选《四级写作积累》12 篇真题提炼的 8 大万能高分句型，换主题就能套用',
      timeEst: '10 分钟',
      mantra: '不背僵硬陈旧模板，背 8 个灵活可迁移的逻辑句架，考场任何话题都能即插即用！',
      coreHtml: `
        <p>阅卷老师对陈词滥调（如 <em>"With the rapid development of society, every coin has two sides"</em>）早已审美疲劳。以下是直接从 <strong>2024.12–2026.06 真题学习范例（C4-001 至 C4-012）</strong>提炼出的<strong>自然、地道、可跨主题迁移</strong>的 8 大黄金句型：</p>
        <div class="info-table-wrap">
          <table>
            <thead>
              <tr><th>适用场景</th><th>真题提炼高分句架</th><th>实战功能说明</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>提出正式建议</strong></td><td><code>I propose that [主体] should adopt / make ...</code></td><td>提案、学生会建议类首句一针见血（should 后用原形）</td></tr>
              <tr><td><strong>有条件支持</strong></td><td><code>I support [方案], provided that [前提条件].</code></td><td>观点回应类神器，瞬间展现批判性思辨深度</td></tr>
              <tr><td><strong>让步反驳顾虑</strong></td><td><code>While some may argue that [顾虑], [更高层次价值].</code></td><td>平衡论证王牌，化解反方意见极具说服力</td></tr>
              <tr><td><strong>界定工具边界</strong></td><td><code>[工具] should be used as a supplement, not a substitute, for [核心活动].</code></td><td>AI、科技、软件、网络类话题的满分金句！</td></tr>
              <tr><td><strong>对比被动/主动</strong></td><td><code>Rather than merely doing A, students should do B.</code></td><td>校园资源、学习方法、习惯养成类万能提分句</td></tr>
              <tr><td><strong>概括核心特征</strong></td><td><code>[主题] is characterized by A, B, and C.</code></td><td>社会现象、行业发展类首段高度凝练（三项平行）</td></tr>
              <tr><td><strong>具体落地行动</strong></td><td><code>Students can contribute to [目标] by doing A and B.</code></td><td>绿色校园、志愿服务、文化传承类主体段主干</td></tr>
              <tr><td><strong>条件限定收尾</strong></td><td><code>[措施] would be most useful if it solved [具体痛点] without requiring [额外负担].</code></td><td>提案类结尾神来之笔，兼顾实效与可行性</td></tr>
            </tbody>
          </table>
        </div>
      `,
      strategySteps: [
        {
          step: '01',
          title: '为你的作文准备“每段 1 个招牌句架”',
          detail: '全篇不需要每句都写长难句！第一段用 1 个立场句（I propose / I support... provided that），第二段用 1 个对比/让步句（While some may argue / Rather than），第三段用 1 个条件升华句，句式就足够丰富。',
          example: '搭配小词亮点：small trial（小范围试点）、hands-on experience（实践体验）、over-reliance on（过度依赖）、carbon footprint（碳足迹）。'
        },
        {
          step: '02',
          title: '用“平行三连结构”提升节奏感',
          detail: '四级高分范文极爱用 "verb A, B, and C" 或 "noun A, B, and C" 的平行结构，语法简单却显得非常地道。',
          example: 'By doing research, students learn to investigate a question, evaluate evidence, and draw reasonable conclusions.'
        },
        {
          step: '03',
          title: '每次练写后自查“可迁移替换”',
          detail: '背完一个句架后，立刻换一个完全不同的主题造 1 句（如把 AI 换成手机、把图书馆换成体育馆），确保考场能脱口而出。',
          example: '原句写 AI -> 迁移写手机："Smartphones should be used as a supplement, not a substitute, for face-to-face communication."'
        }
      ],
      drill: {
        prompt: '在写“大学生如何合理使用人工智能辅助学习”或“翻译软件与语言学习”主题作文时，下列哪一句的表达精准度与四级得分档次最高？',
        options: [
          'A. AI is very useful, every coin has two sides, so we must use it good.',
          'B. AI tools should be used as a supplement, not a substitute, for independent thinking and deep learning.',
          'C. Because AI is smart, so students do not need to learn anything by themselves anymore.',
          'D. With the development of AI, it is very important and good for our study very much.'
        ],
        answerIdx: 1,
        hint: '找出精准界定工具边界、避开中式套话与 because...so 语法硬伤的句子！',
        explain: 'B 项直接运用 2025.06 真题核心迁移句型 "as a supplement, not a substitute, for..."，用对照名词干净利落地界定了技术工具与独立思考的边界，简洁有力。A/D 充斥空洞套话且有语法错，C 犯了 because 与 so 连用的严重硬伤。'
      },
      animId: 'essay_builder',
      animCaption: '点击动画中的可迁移高分句型芯片，实时查看 120-180 词字数仪表盘与结构饱满度变化',
      relatedVocabDay: 12
    }
  };

  const TOPIC_SUMMARIES = {
    listen: {
      title: '听力理解速通口诀（35% · 248.5分）',
      formula: '未听先知划差异 -> 首尾转折抓信号 -> 同义替换锁真解',
      checklist: [
        '放音前 15 秒竖扫选项猜主题，横划每项独有动词/名词/数字',
        '新闻盯紧前 1-2 句导语（Who/What/Where）与数字、原因细节',
        '长对话紧盯问句后的回答，以及 but / however / actually 后的反转',
        '短文篇章按题文同序边听边移视线，警惕原词拼凑、拥抱同义改写'
      ],
      quickTips: [
        'Directions 与试音时间千万别发呆，全部用来抢读选项！',
        '听到数字/时间/地点/最高级立刻提高专注度，90% 出考点。',
        '错过一题果断放手，保住下一题的预读时间永远更划算。'
      ],
      trapWarning: '考场避坑：选项里把录音不同句子的原词硬拼在一起，或把男/女方立场张冠李戴，是最常见的听力失分陷阱！'
    },
    cloze: {
      title: '选词填空秒杀口诀（5% · 35.5分）',
      formula: '先标 15 词四词性 -> 切槽缩至 2-3 词 -> 搭配褒贬定唯一',
      checklist: [
        '先花 60 秒给 A-O 标上 n./v./adj./adv. 及单复数/时态形态',
        '副词和特殊单复数/固定搭配空最容易秒杀，优先拿下并划掉已用词',
        '遇到 -ed/-ing 结尾词，务必同时考虑动词形态与分词形容词双重身份',
        '严格控时 7 分钟以内，绝不因每空 3.55 分耽误仔细阅读'
      ],
      quickTips: [
        '紧盯空格后面的介词（to/with/on/in/from），搭配往往直接锁死答案。',
        '利用 and（同向）与 but（反向）快速判断空格感情色彩。'
      ],
      trapWarning: '考场避坑：friendly / likely / costly / lively 虽然以 -ly 结尾，但它们都是形容词而不是副词！'
    },
    matching: {
      title: '长篇阅读极速定位口诀（10% · 71分）',
      formula: '先题后文划特词 -> 逐段扫读一次清 -> 双要素改写验真',
      checklist: [
        '先读 10 道题干，每题划 2-3 个定位词（优先年份/数字/专有名词）',
        '避开文章标题高频主题词，专抓独有实词与核心动作',
        '从 A 段到末段逐段扫读，整篇文章只扫一遍，先拿稳 7-8 题',
        '核对“主语对象 + 核心结论”两个独立要素均吻合再落笔'
      ],
      quickTips: [
        '某段落可能对应 2 道题，也可能 0 题，不要默认一一对应！',
        '抽象题干往往对应段落里的具体例子或反义同义转化。'
      ],
      trapWarning: '考场避坑：只因为某段蹦出一个熟词就盲选！务必检查该段态度方向与逻辑主语是否被掉包。'
    },
    reading: {
      title: '仔细阅读排雷口诀（20% · 142分）',
      formula: '先看五题不看项 -> 题文同序锁证据 -> 排净五坑选改写',
      checklist: [
        '先读 5 个题干串主线，绝不提前读 20 个选项自乱阵脚',
        '按题文同序定位到唯一证据句，连读上下句看清转折与指代',
        '二选一时严查五大干扰：偷换概念/过度推断/绝对词/张冠李戴/无中生有',
        '主旨题放在最后做，态度题排除 indifferent / biased 等极端陪跑词'
      ],
      quickTips: [
        '每题 14.2 分，值得为每道题指认出原文确切证据句！',
        '语气柔和克制（may / tend to / partly）的改写项命中率极高。'
      ],
      trapWarning: '考场避坑：千万不要凭“生活常识听起来很对”就选，原文没写一律按“无中生有”淘汰！'
    },
    translation: {
      title: '汉译英拆句重组口诀（15% · 106.5分）',
      formula: '先抓英文主谓宾 -> 长定语一律后置 -> 流水句改分词从句',
      checklist: [
        '动笔前先确定全句时态（历史用过去时，至今用完成时，习俗用现在时）',
        '一个英文单句只能有 1 个谓语动词，次要动词转为 doing/done/to do',
        '中文“……的”长定语放到核心名词后，用 which/that/with 引导',
        '无主句优先转为被动语态、There be 或补出 people/China 主语'
      ],
      quickTips: [
        '生词卡壳立刻“大白话同义降维”，绝不留空或生造中式拼写。',
        '写完花 2 分钟专查单复数、冠词 a/the 与主谓一致。'
      ],
      trapWarning: '考场避坑：最致命扣分点是“中文流水句直接逗号拼接多个主谓”以及单句同时塞进两个谓语动词！'
    },
    writing: {
      title: '四级写作三段积木口诀（15% · 106.5分）',
      formula: '审题锁死限定词 -> 三段 150 词积木 -> 迁移句架+具体场景',
      checklist: [
        '3 分钟审清文体（投稿/提案/回应/调查）与所有必答角度，绝不漏点',
        '结构清晰三段式：首段亮立场 -> 中段双论点+具体例子 -> 尾段落地升华',
        '词数稳控在 140–170 词黄金带，穿插 2-3 个真题可迁移高分句架',
        '留 3 分钟通读纠错：消灭拼写错、三单漏 s、because...so 连用'
      ],
      quickTips: [
        '用具体的校园/生活细节（library, reservation, feedback）替代空洞口号！',
        '每段首句用清楚的过渡信号（To begin with / Moreover / Finally）让阅卷一目了然。'
      ],
      trapWarning: '考场避坑：漏答题目双重要求（如只谈必要性不谈可行性）或字数不足 120 词，会直接跌落低分档！'
    }
  };

  // Non-enumerable alias so TOPIC_SUMMARIES['listening'] resolves seamlessly
  // alongside TOPIC_SUMMARIES['listen'] while Object.keys(TOPIC_SUMMARIES) stays length 6.
  Object.defineProperty(TOPIC_SUMMARIES, 'listening', {
    value: TOPIC_SUMMARIES.listen,
    enumerable: false,
    configurable: true
  });

  const XIAOKE_MANTRAS = [
    {
      spriteId: '01_idle_smile',
      label: '暖阳迎考',
      tag: '每日起步',
      mantra: '12 天不用背整本词典，每天稳稳吃透 26 个真题高频词 + 1 个题型套路，425+ 稳稳拿下！',
      tip: '点击上方 12 天冲刺条，跟着今天的打卡任务开启高效 60 分钟吧。'
    },
    {
      spriteId: '02_study_reading',
      label: '专注研读',
      tag: '阅读定位',
      mantra: '仔细阅读每题 14.2 分！先读 5 道题干不看选项，顺着题文同序锁定唯一证据句。',
      tip: '遇到长难句别慌，先抓主谓宾主干，再看转折词 but / however 后的真观点。'
    },
    {
      spriteId: '03_thinking_hint',
      label: '思路点拨',
      tag: '卡题不慌',
      mantra: '做题卡壳时先别直接偷看答案！点我给你一条无剧透思路提示，自己推出来记忆深 3 倍。',
      tip: '选词先分四词性，匹配先找数字大写词，二选一先排绝对词！'
    },
    {
      spriteId: '04_cheer_correct',
      label: '斩题欢呼',
      tag: '正向反馈',
      mantra: '漂亮！这一题稳稳拿下！趁热把刚才命中的高频词和同义替换记在脑海里！',
      tip: '答对也别急着划走，花 10 秒看一眼右侧解析里的“同义替换桥”，下次遇到秒杀。'
    },
    {
      spriteId: '05_encourage_wrong',
      label: '暖心复盘',
      tag: '错题是宝',
      mantra: '现在做错一题，考场就少踩一个坑！已经帮你收入错词手账，重做对了立刻清零！',
      tip: '看看这题掉进了哪种陷阱：原词干扰、张冠李戴，还是漏看了转折词？'
    },
    {
      spriteId: '06_writing_quill',
      label: '妙笔生花',
      tag: '译写高分',
      mantra: '翻译先提英文主干再后置长定语；作文稳写三段 150 词，用真题可迁移句型惊艳阅卷！',
      tip: '写完务必自查三件事：时态统一、冠词单复数、绝不用逗号硬拼两个句子。'
    },
    {
      spriteId: '07_listening_audio',
      label: '磨耳精听',
      tag: '听力与带背',
      mantra: '背词开语音带背、听力先做 15 秒“未听先知”预读，让耳朵对高频词和信号词形成本能反应！',
      tip: '试试“高频带背 -> 盲听选义”，把“眼熟词”真正变成“耳熟词”！'
    },
    {
      spriteId: '08_sleepy_rest',
      label: '烛光护眼',
      tag: '劳逸结合',
      mantra: '夜深刷题记得切到“烛光书房”暖暗模式，学满 45 分钟起身喝口水，睡前听 5 分钟带背记忆更牢！',
      tip: '睡眠阶段正是大脑巩固艾宾浩斯词汇记忆的黄金窗口，千万别熬垮状态哦。'
    },
    {
      spriteId: '09_proud_streak',
      label: '连击高光',
      tag: '状态火热',
      mantra: '连续答对火力全开！你已经摸清四级命题人的出题节拍了，照这个手感冲上 500+！',
      tip: '趁手感好，去“冲刺雷达”看看哪一项熟练度还偏低，定向补齐最后一块短板！'
    },
    {
      spriteId: '10_eureka_tip',
      label: '灵感排雷',
      tag: '考场避坑',
      mantra: '警报拉响！看到 only / never / completely 先画问号，看到易混词 adopt/adapt 先查语境搭配！',
      tip: '高频易混词对决里藏着 28 组四级最爱考的“双胞胎词”，10 分钟就能全盘排雷！'
    }
  ];

  if (typeof window !== 'undefined') {
    window.SPRINT_PLAN = SPRINT_PLAN;
    window.MASTERY_TOPICS = MASTERY_TOPICS;
    window.KNOWLEDGE_MODULES = KNOWLEDGE_MODULES;
    window.KNOWLEDGE_SECTIONS = KNOWLEDGE_SECTIONS;
    window.TOPIC_SUMMARIES = TOPIC_SUMMARIES;
    window.XIAOKE_MANTRAS = XIAOKE_MANTRAS;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      SPRINT_PLAN,
      MASTERY_TOPICS,
      KNOWLEDGE_MODULES,
      KNOWLEDGE_SECTIONS,
      TOPIC_SUMMARIES,
      XIAOKE_MANTRAS
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
