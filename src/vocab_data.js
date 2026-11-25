/* ==========================================================================
   CET-4 Corpus-Verified High-Frequency Vocabulary & Confusable Pairs Module
   - Mined & frequency-verified from 39 genuine CET-4 papers (2014.06-2026.06)
   - 12 themed sprint packs (VOCAB_DAYS) x 26 words = 312 unique core words
   - 28 high-frequency CET-4 confusable word groups with contrastive quizzes
   - Dual-exported for browser globals (window.*) and Node CommonJS tests
   ========================================================================== */
(function (root) {
  'use strict';

  const VOCAB_DAYS = [
  {
    "day": 1,
    "title": "Day 1 · 听力高频动作与场景",
    "theme": "校园、出行、职场与新闻高频动作词",
    "focusTip": "开启“语音带背”与“盲听选义”，优先抓动词重音与机场/办公/预约高频固定搭配。",
    "targetCount": 26
  },
  {
    "day": 2,
    "title": "Day 2 · 阅读核心逻辑与观点",
    "theme": "学者立场、论证推理与态度信号词",
    "focusTip": "区分 claim/argue/suggest 的客观转述语气，看到 infer/bias/objective 立刻联想到阅读题干。",
    "targetCount": 26
  },
  {
    "day": 3,
    "title": "Day 3 · 科技数码与校园创新",
    "theme": "人工智能、数字工具与工程应用词",
    "focusTip": "紧扣 2024–2026 真题高频科技议题，重点拿下 access/efficient/transform/innovation 的写译搭配。",
    "targetCount": 26
  },
  {
    "day": 4,
    "title": "Day 4 · 教育学习与科研成长",
    "theme": "大学课程、学术实验与自我成长词",
    "focusTip": "熟记 discipline(学科/自律)、acquire/cultivate/strive 等作文提分动词，一词串通阅读与写作。",
    "targetCount": 26
  },
  {
    "day": 5,
    "title": "Day 5 · 社会民生与职场经济",
    "theme": "就业薪酬、消费产业与城市治理词",
    "focusTip": "死磕 economic vs economical、wage vs salary、resident vs president 等高发易混考点。",
    "targetCount": 26
  },
  {
    "day": 6,
    "title": "Day 6 · 生态环保与绿色校园",
    "theme": "气候变化、碳排放与生物多样性词",
    "focusTip": "背诵 sustainable/renewable/preserve/emission 绿色搭配链，翻译与环保作文直接成句输出。",
    "targetCount": 26
  },
  {
    "day": 7,
    "title": "Day 7 · 选词填空高频动词",
    "theme": "15选10 真题复现王牌核心动词",
    "focusTip": "按“动词+介词/宾语”块状记忆（adapt to / rely on / contribute to），考场秒杀语法槽位。",
    "targetCount": 26
  },
  {
    "day": 8,
    "title": "Day 8 · 选词填空高频形容词与副词",
    "theme": "15选10 程度修饰、情感色彩与频率词",
    "focusTip": "盯紧后缀 -al/-ive/-ous/-ly 与褒贬色彩（crucial/vulnerable/reluctant/ultimately），排除法快准稳。",
    "targetCount": 26
  },
  {
    "day": 9,
    "title": "Day 9 · 文化传统与礼仪习俗",
    "theme": "中国传统文化、非遗传承与礼仪翻译词",
    "focusTip": "直击 2024–2026 汉译英高频文化段落（尊师/餐桌礼仪/古建遗产），辨清 historic 与 historical。",
    "targetCount": 26
  },
  {
    "day": 10,
    "title": "Day 10 · 心理健康与人际沟通",
    "theme": "情绪压力、饮食健康与亲密互动词",
    "focusTip": "掌握 mental/anxiety/obesity/intake/interact 等科普高频词，顺带攻克 stress(压力/强调)熟词僻义。",
    "targetCount": 26
  },
  {
    "day": 11,
    "title": "Day 11 · 逻辑连接与同义替换王牌",
    "theme": "转折因果衔接词与阅读高频同义改写",
    "focusTip": "长篇匹配与仔细阅读的提分引擎：把 despite/whereas/attribute/derive/compensate 刻进条件反射。",
    "targetCount": 26
  },
  {
    "day": 12,
    "title": "Day 12 · 译写提分高级核心词",
    "theme": "三段式作文与汉译英通用高分压轴词",
    "focusTip": "考前冲刺总装！用 facilitate/implement/priority/foundation/beneficial 全面替换低阶模板词。",
    "targetCount": 26
  }
];

  const VOCAB_WORDS = [
  {
    "id": "v001",
    "day": 1,
    "word": "attend",
    "phonetic": "/əˈtend/",
    "pos": "v.",
    "meaning": "出席，参加；[熟词僻义] 照料，专心于（attend to）",
    "examFreq": 17,
    "roots": "at-(朝向) + tend(伸展) -> 把注意力伸向某事 -> 出席/照料",
    "mnemonic": "去(at)伸(tend)耳朵听会 -> 出席会议；加to表专心照料",
    "collocations": [
      {
        "en": "attend a lecture",
        "zh": "听讲座"
      },
      {
        "en": "attend to urgent matters",
        "zh": "处理紧急事务"
      },
      {
        "en": "attend a conference",
        "zh": "出席会议"
      }
    ],
    "realSentence": {
      "en": "I'm expected to attend too many meetings and I seem to be spending a lot of my time doing unnecessary paper work.",
      "zh": "我被要求参加太多会议，似乎把大量时间都花在了不必要的文书工作上。",
      "source": "2016.06 第1套听力"
    },
    "confusable": {
      "word": "intend / pretend",
      "diff": "attend 出席/照料；intend 打算；pretend 假装"
    },
    "tag": "听力高频"
  },
  {
    "id": "v002",
    "day": 1,
    "word": "arrange",
    "phonetic": "/əˈreɪndʒ/",
    "pos": "v.",
    "meaning": "安排，筹备；整理，布置",
    "examFreq": 4,
    "roots": "ar-(加强) + range(排列，行列) -> 排成整齐行列 -> 安排/整理",
    "mnemonic": "把日程按顺序排进 range(范围/队列) 里 -> 安排妥当",
    "collocations": [
      {
        "en": "arrange an appointment",
        "zh": "安排预约"
      },
      {
        "en": "arrange for sb. to do",
        "zh": "安排某人做某事"
      },
      {
        "en": "make arrangements",
        "zh": "作出安排"
      }
    ],
    "realSentence": {
      "en": "She primarily speaks to students in health classes but sometimes the school will arrange for her to speak to several different groups of girls.",
      "zh": "她主要面向健康课的学生发言，但有时学校也会安排她给几组不同的女生做讲座。",
      "source": "2016.06 第2套听力"
    },
    "confusable": null,
    "tag": "听力高频"
  },
  {
    "id": "v003",
    "day": 1,
    "word": "schedule",
    "phonetic": "/ˈskedʒuːl/",
    "pos": "n./v.",
    "meaning": "日程表，时刻表；安排，预定",
    "examFreq": 9,
    "roots": "源自拉丁语 scheda(小纸条/清单) -> 写满时间安排的清单 -> 日程表",
    "mnemonic": "谐音“时刻就来” -> 照着时刻表/日程表按时来",
    "collocations": [
      {
        "en": "ahead of schedule",
        "zh": "提前于预定时间"
      },
      {
        "en": "behind schedule",
        "zh": "落后于进度"
      },
      {
        "en": "be scheduled to do",
        "zh": "预定做某事"
      }
    ],
    "realSentence": {
      "en": "On average, English may not be the most popular subject, but it's consistently on the schedule throughout high school, with all students graduating fluent in English.",
      "zh": "总体而言，英语或许不是最受欢迎的学科，但它一直贯穿高中课表，所有学生毕业时英语都很流利。",
      "source": "2024.12 第2套"
    },
    "confusable": null,
    "tag": "听力高频"
  },
  {
    "id": "v004",
    "day": 1,
    "word": "delay",
    "phonetic": "/dɪˈleɪ/",
    "pos": "v./n.",
    "meaning": "推迟，耽搁；延误（航班/进度等）",
    "examFreq": 19,
    "roots": "de-(离开/向后) + lay(放置) -> 往后放一放 -> 推迟，延误",
    "mnemonic": "把事情往后 lay(放) -> 推迟；听力机场场景必听 delayed flight",
    "collocations": [
      {
        "en": "without delay",
        "zh": "毫不迟延地，立即"
      },
      {
        "en": "delay doing sth.",
        "zh": "推迟做某事"
      },
      {
        "en": "flight delay",
        "zh": "航班延误"
      }
    ],
    "realSentence": {
      "en": "Severe weather that causes cancellation or delay is more likely in regions that are less able to handle the situation.",
      "zh": "导致取消或延误的恶劣天气，更有可能发生在应对能力较弱的地区。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "relay",
      "diff": "delay 推迟延误；relay 接力赛/转播"
    },
    "tag": "听力高频"
  },
  {
    "id": "v005",
    "day": 1,
    "word": "cancel",
    "phonetic": "/ˈkænsl/",
    "pos": "v.",
    "meaning": "取消，撤销；删去",
    "examFreq": 5,
    "roots": "拉丁词根 cancelli(格子/划叉线) -> 在计划上画叉 -> 取消",
    "mnemonic": "在日程本上画个大叉“砍(can)掉” -> 取消预约/航班",
    "collocations": [
      {
        "en": "cancel an order",
        "zh": "取消订单"
      },
      {
        "en": "cancel the flight",
        "zh": "取消航班"
      },
      {
        "en": "cancel out",
        "zh": "抵消"
      }
    ],
    "realSentence": {
      "en": "Often, the school remains officially open even though buses do not run and classes are canceled.",
      "zh": "通常情况下，即使校车停运、课程取消，学校在名义上仍保持开放。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "counsel / council",
      "diff": "cancel 取消；counsel 忠告/心理咨询；council 委员会"
    },
    "tag": "听力高频"
  },
  {
    "id": "v006",
    "day": 1,
    "word": "deliver",
    "phonetic": "/dɪˈlɪvər/",
    "pos": "v.",
    "meaning": "递送，交付；[熟词僻义] 发表（演讲）；兑现（承诺）",
    "examFreq": 17,
    "roots": "de-(彻底) + liver(源自 liber 自由) -> 放手交出 -> 递送/发表",
    "mnemonic": "快递小哥把包裹交到你手里叫 deliver，演讲者把观点交出去也用 deliver",
    "collocations": [
      {
        "en": "deliver a speech",
        "zh": "发表演讲"
      },
      {
        "en": "deliver goods",
        "zh": "运送货物"
      },
      {
        "en": "deliver a good performance",
        "zh": "交出出色表现"
      }
    ],
    "realSentence": {
      "en": "The company employs its trucks and planes to deliver food, medicine, and water.",
      "zh": "该公司动用卡车和飞机来运送食物、药品和饮用水。",
      "source": "2019.12 第1套"
    },
    "confusable": null,
    "tag": "听力高频"
  },
  {
    "id": "v007",
    "day": 1,
    "word": "launch",
    "phonetic": "/lɔːntʃ/",
    "pos": "v./n.",
    "meaning": "发起（活动）；推出（新品）；发射（火箭/卫星）",
    "examFreq": 15,
    "roots": "源自古法语 lancier(投掷长矛) -> 猛力推出 -> 发射/发起/上市",
    "mnemonic": "别和 lunch(午餐)混！多了个 a 像火箭尖头 -> 发射/推出新品",
    "collocations": [
      {
        "en": "launch a campaign",
        "zh": "发起一场运动"
      },
      {
        "en": "launch a new product",
        "zh": "推出新产品"
      },
      {
        "en": "product launch",
        "zh": "产品发布会"
      }
    ],
    "realSentence": {
      "en": "It also launched a range of fancy bottles that work with tap water and flavour packets.",
      "zh": "它还推出了一系列精美的瓶子，可搭配自来水和调味包使用。",
      "source": "2024.12 第2套"
    },
    "confusable": {
      "word": "lunch / lounge",
      "diff": "launch 发起/发射；lunch 午餐；lounge 休息室"
    },
    "tag": "听力高频"
  },
  {
    "id": "v008",
    "day": 1,
    "word": "confirm",
    "phonetic": "/kənˈfɜːrm/",
    "pos": "v.",
    "meaning": "确认，证实；批准（预约/职位）",
    "examFreq": 9,
    "roots": "con-(加强) + firm(坚固的，确定的) -> 让消息更确凿 -> 证实/确认",
    "mnemonic": "一起(con)把消息敲定得坚固(firm) -> 确认无疑",
    "collocations": [
      {
        "en": "confirm a reservation",
        "zh": "确认预订"
      },
      {
        "en": "confirm the report",
        "zh": "证实该报道"
      },
      {
        "en": "be confirmed by",
        "zh": "得到……的证实"
      }
    ],
    "realSentence": {
      "en": "Many scientists have studied the green sea slugs to confirm that they are actually able to create energy from sunlight.",
      "zh": "许多科学家研究了绿叶海蛞蝓，以证实它们确实能利用阳光制造能量。",
      "source": "2019.12 第2套"
    },
    "confusable": {
      "word": "conform",
      "diff": "confirm(i=info信息) 确认证实；conform(form形状) 遵守/符合"
    },
    "tag": "听力高频"
  },
  {
    "id": "v009",
    "day": 1,
    "word": "reserve",
    "phonetic": "/rɪˈzɜːrv/",
    "pos": "v./n.",
    "meaning": "预订；保留，储备；[n.] 储备量，自然保护区",
    "examFreq": 11,
    "roots": "re-(向后/留住) + serve(保持，守卫) -> 留下来不轻易动用 -> 预订/保留",
    "mnemonic": "把座位或资源提前留(re)存(serve)下来 -> 预订/储备",
    "collocations": [
      {
        "en": "reserve a seat",
        "zh": "预订座位"
      },
      {
        "en": "in reserve",
        "zh": "备用，储备着"
      },
      {
        "en": "nature reserve",
        "zh": "自然保护区"
      }
    ],
    "realSentence": {
      "en": "Surely, the American ideal of second chances should not be reserved only for the rich and powerful.",
      "zh": "诚然，美国人关于“第二次机会”的理念不应只留给有钱有势的人。",
      "source": "2015.12 第1套"
    },
    "confusable": {
      "word": "preserve / conserve",
      "diff": "reserve 预订/留出；preserve 保护使完好；conserve 节约能源水资源"
    },
    "tag": "听力高频"
  },
  {
    "id": "v010",
    "day": 1,
    "word": "announce",
    "phonetic": "/əˈnaʊns/",
    "pos": "v.",
    "meaning": "宣布，通告；播报",
    "examFreq": 5,
    "roots": "an-(朝向) + nounce(报告，宣称) -> 向公众报告 -> 宣布",
    "mnemonic": "词根 nounce 表“说/报”：向(an)大家说出 -> 宣布；新闻听力高频动词",
    "collocations": [
      {
        "en": "officially announce",
        "zh": "正式宣布"
      },
      {
        "en": "make an announcement",
        "zh": "发布公告"
      },
      {
        "en": "announce a decision",
        "zh": "宣布决定"
      }
    ],
    "realSentence": {
      "en": "Organisers of a famous music festival announced that water bottles will not be sold this summer.",
      "zh": "一个著名音乐节的主办方宣布，今年夏天将不再出售瓶装水。",
      "source": "2024.12 第2套"
    },
    "confusable": {
      "word": "pronounce / denounce",
      "diff": "announce 宣布；pronounce 发音/宣判；denounce 公开谴责"
    },
    "tag": "听力高频"
  },
  {
    "id": "v011",
    "day": 1,
    "word": "appeal",
    "phonetic": "/əˈpiːl/",
    "pos": "v./n.",
    "meaning": "吸引，有感染力（appeal to）；呼吁；上诉",
    "examFreq": 24,
    "roots": "ap-(朝向) + peal(呼喊，召唤) -> 朝大家呼唤 -> 呼吁/吸引人",
    "mnemonic": "朝(ap)你发出钟声般的呼唤(peal) -> 对你有吸引力(appeal to)",
    "collocations": [
      {
        "en": "appeal to consumers",
        "zh": "吸引消费者"
      },
      {
        "en": "appeal for help",
        "zh": "呼吁援助"
      },
      {
        "en": "broad appeal",
        "zh": "广泛的吸引力"
      }
    ],
    "realSentence": {
      "en": "This is a theory that appeals to many economists.",
      "zh": "这是一个吸引众多经济学家的理论。",
      "source": "2024.06 第1套"
    },
    "confusable": {
      "word": "appear / repeal",
      "diff": "appeal 吸引/呼吁；appear 出现/似乎；repeal 废除法律"
    },
    "tag": "听力高频"
  },
  {
    "id": "v012",
    "day": 1,
    "word": "apply",
    "phonetic": "/əˈplaɪ/",
    "pos": "v.",
    "meaning": "申请（apply for）；应用，运用（apply to）；适用",
    "examFreq": 26,
    "roots": "ap-(朝向) + ply(折叠，贴合) -> 把方法贴合到场景上 -> 应用/申请",
    "mnemonic": "for 后接想要的东西(申请职位)，to 后接落地对象(应用于某领域)",
    "collocations": [
      {
        "en": "apply for a position",
        "zh": "申请职位"
      },
      {
        "en": "apply theory to practice",
        "zh": "将理论应用于实践"
      },
      {
        "en": "apply to all students",
        "zh": "适用于所有学生"
      }
    ],
    "realSentence": {
      "en": "The concept has been applied to a wide range of disciplines, from developmental psychology to economics and engineering.",
      "zh": "这一概念已被应用于从发展心理学到经济学和工程学的广泛学科中。",
      "source": "2025.06 第1套"
    },
    "confusable": {
      "word": "supply / comply / imply",
      "diff": "apply 申请/应用；supply 供应；comply 遵守；imply 暗示"
    },
    "tag": "听力高频"
  },
  {
    "id": "v013",
    "day": 1,
    "word": "afford",
    "phonetic": "/əˈfɔːrd/",
    "pos": "v.",
    "meaning": "买得起，承担得起（时间/金钱）；[熟词僻义] 提供",
    "examFreq": 11,
    "roots": "af-(向前) + ford(推进，筹办) -> 推进完成并承担下来 -> 负担得起",
    "mnemonic": "常与 can/could/be able to 连用：can't afford to do 承担不起做某事的代价",
    "collocations": [
      {
        "en": "can't afford to lose",
        "zh": "输不起"
      },
      {
        "en": "affordable housing",
        "zh": "经济适用房"
      },
      {
        "en": "afford the tuition",
        "zh": "负担得起学费"
      }
    ],
    "realSentence": {
      "en": "Most of us can't afford to do nuclear research as a private hobby, but bird watchers, rock collectors, and others can do real research on a limited budget.",
      "zh": "我们大多数人负担不起把核研究当作私人爱好，但观鸟者、岩石收藏家和其他人可以在有限预算下开展真正的研究。",
      "source": "2024.06 第2套"
    },
    "confusable": {
      "word": "effort",
      "diff": "afford(v.) 负担得起；effort(n.) 努力"
    },
    "tag": "听力高频"
  },
  {
    "id": "v014",
    "day": 1,
    "word": "facility",
    "phonetic": "/fəˈsɪləti/",
    "pos": "n.",
    "meaning": "设施，设备，场所（常用复数 facilities）；[熟词僻义] 才能，便利",
    "examFreq": 11,
    "roots": "facil(容易的) + -ity(名词后缀) -> 让生活更便利的硬件 -> 设施",
    "mnemonic": "facil(容易)+ity -> 校园体育馆、图书馆等让学习生活变容易的“设施”",
    "collocations": [
      {
        "en": "campus facilities",
        "zh": "校园设施"
      },
      {
        "en": "medical facilities",
        "zh": "医疗设施"
      },
      {
        "en": "sports facilities",
        "zh": "体育设施"
      }
    ],
    "realSentence": {
      "en": "It also has a special innovation facility for its employees.",
      "zh": "它还为员工配备了一处专门的创新设施场所。",
      "source": "2016.06 第1套听力"
    },
    "confusable": {
      "word": "faculty",
      "diff": "facility 设施设备；faculty 大学全体教员/院系"
    },
    "tag": "听力高频"
  },
  {
    "id": "v015",
    "day": 1,
    "word": "interview",
    "phonetic": "/ˈɪntərvjuː/",
    "pos": "n./v.",
    "meaning": "面试；采访，面谈",
    "examFreq": 43,
    "roots": "inter-(相互) + view(看，观察) -> 面对面互相审视 -> 面试/采访",
    "mnemonic": "inter(互相)+view(看) -> 求职面试或记者采访；注意 interviewer 面试官 vs interviewee 应聘者",
    "collocations": [
      {
        "en": "job interview",
        "zh": "求职面试"
      },
      {
        "en": "phone interview",
        "zh": "电话面试"
      },
      {
        "en": "conduct an interview",
        "zh": "进行采访/面试"
      }
    ],
    "realSentence": {
      "en": "Many interviewers are annoyed to see people who decide to multitask while on the phone interview.",
      "zh": "许多面试官看到有人在电话面试时一心多用会感到十分恼火。",
      "source": "2026.06 第3套"
    },
    "confusable": {
      "word": "review / preview",
      "diff": "interview 面试采访；review 复习评论；preview 预习预告"
    },
    "tag": "听力高频"
  },
  {
    "id": "v016",
    "day": 1,
    "word": "colleague",
    "phonetic": "/ˈkɑːliːɡ/",
    "pos": "n.",
    "meaning": "同事，同僚",
    "examFreq": 21,
    "roots": "col-(共同) + league(结盟/选派) -> 共同被委派共事的人 -> 同事",
    "mnemonic": "别和 college(大学)看混！col-league 里有“联盟”，并肩作战的才是同事",
    "collocations": [
      {
        "en": "work closely with colleagues",
        "zh": "与同事紧密合作"
      },
      {
        "en": "a former colleague",
        "zh": "前同事"
      },
      {
        "en": "academic colleagues",
        "zh": "学术同仁"
      }
    ],
    "realSentence": {
      "en": "I am a historian who, along with my colleagues, surveyed 251 women engineers who graduated from college in the 1970s.",
      "zh": "我是一名历史学家，曾与同事一起调查了251位20世纪70年代大学毕业的女工程师。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "college",
      "diff": "colleague 同事；college 大学/学院"
    },
    "tag": "听力高频"
  },
  {
    "id": "v017",
    "day": 1,
    "word": "staff",
    "phonetic": "/stæf/",
    "pos": "n.",
    "meaning": "全体职员，员工（集合名词）；[v.] 为……配备人员",
    "examFreq": 12,
    "roots": "古英语 stæf(拐杖/支柱) -> 支撑公司运转的骨干 -> 全体员工",
    "mnemonic": "a 像人站着，staff 是公司里的“员工”；u 像袋子装杂物，stuff 才是“东西”",
    "collocations": [
      {
        "en": "staff members",
        "zh": "工作人员"
      },
      {
        "en": "teaching staff",
        "zh": "全体教职工"
      },
      {
        "en": "staff training",
        "zh": "员工培训"
      }
    ],
    "realSentence": {
      "en": "What caused more disruption was when schools tried to stay open in bad weather even though many staff and pupils were absent.",
      "zh": "造成更大混乱的是，尽管许多教职工和学生缺勤，学校在恶劣天气下仍试图照常开放。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "stuff / stiff",
      "diff": "staff 全体员工；stuff 东西/塞满；stiff 僵硬的"
    },
    "tag": "听力高频"
  },
  {
    "id": "v018",
    "day": 1,
    "word": "department",
    "phonetic": "/dɪˈpɑːrtmənt/",
    "pos": "n.",
    "meaning": "部门，司局；大学里的系，院系",
    "examFreq": 22,
    "roots": "de-(分开) + part(部分) + -ment(名词后缀) -> 划分出的职能部分 -> 部门/系",
    "mnemonic": "把大机构分(de)成各部分(part) -> 部门/大学某系（注意不要误译成“公寓”apartment）",
    "collocations": [
      {
        "en": "Department of Education",
        "zh": "教育部"
      },
      {
        "en": "department store",
        "zh": "百货商场"
      },
      {
        "en": "academic department",
        "zh": "学术院系"
      }
    ],
    "realSentence": {
      "en": "The Department for Education (DFE) published research in 2016 arguing that missing any days at school could have a negative impact on results.",
      "zh": "英国教育部于2016年发布研究称，缺课哪怕几天都可能对学业成绩产生负面影响。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "apartment / departure",
      "diff": "department 部门/系；apartment 公寓；departure 离开/出发"
    },
    "tag": "听力高频"
  },
  {
    "id": "v019",
    "day": 1,
    "word": "customer",
    "phonetic": "/ˈkʌstəmər/",
    "pos": "n.",
    "meaning": "顾客，客户",
    "examFreq": 38,
    "roots": "custom(习惯/光顾) + -er(人) -> 经常光顾的人 -> 顾客",
    "mnemonic": "常来光顾养成习惯(custom)的人(er) -> 顾客；听力服务投诉场景高频词",
    "collocations": [
      {
        "en": "customer service",
        "zh": "客户服务"
      },
      {
        "en": "regular customer",
        "zh": "老顾客"
      },
      {
        "en": "customer satisfaction",
        "zh": "顾客满意度"
      }
    ],
    "realSentence": {
      "en": "This would mean tax on bottled water would be refunded to customers who returned the plastic for recycling.",
      "zh": "这意味着瓶装水税将退还给那些把塑料瓶送回回收的顾客。",
      "source": "2024.12 第2套"
    },
    "confusable": {
      "word": "custom / costume",
      "diff": "customer 顾客；custom 习俗/海关(pl.)；costume 戏服/装束"
    },
    "tag": "听力高频"
  },
  {
    "id": "v020",
    "day": 1,
    "word": "complaint",
    "phonetic": "/kəmˈpleɪnt/",
    "pos": "n.",
    "meaning": "抱怨，投诉；[熟词僻义] 轻微病痛",
    "examFreq": 6,
    "roots": "com-(加强) + plaint(悲叹，控诉) -> 大声表达不满 -> 投诉/抱怨",
    "mnemonic": "动词 complain 末尾加 t 变名词 complaint，听力售后场景必考 make a complaint",
    "collocations": [
      {
        "en": "make a complaint",
        "zh": "提出投诉"
      },
      {
        "en": "receive complaints",
        "zh": "收到投诉"
      },
      {
        "en": "grounds for complaint",
        "zh": "抱怨的理由"
      }
    ],
    "realSentence": {
      "en": "Meanwhile, there are complaints that poor service at London's major airports is discouraging foreigners from doing business in Britain.",
      "zh": "与此同时，有人投诉称伦敦各大机场的糟糕服务正让外国人对在英国经商望而却步。",
      "source": "2016.06 第2套听力"
    },
    "confusable": {
      "word": "complain / compliant",
      "diff": "complaint(n.) 投诉；complain(v.) 抱怨；compliant(adj.) 顺从的"
    },
    "tag": "听力高频"
  },
  {
    "id": "v021",
    "day": 1,
    "word": "accident",
    "phonetic": "/ˈæksɪdənt/",
    "pos": "n.",
    "meaning": "意外事故；偶然的事（by accident）",
    "examFreq": 17,
    "roots": "ac-(朝向) + cid(落下，发生) + -ent -> 突然降临的事 -> 意外事故",
    "mnemonic": "突然掉(cid)到头上的事 -> 意外事故；词组 by accident = 偶然地",
    "collocations": [
      {
        "en": "by accident",
        "zh": "偶然地，意外地"
      },
      {
        "en": "traffic accident",
        "zh": "交通事故"
      },
      {
        "en": "prevent accidents",
        "zh": "预防事故"
      }
    ],
    "realSentence": {
      "en": "The potential for safer cars means accident statistics would drop: some 94% of road accidents in the U.S. involve human error.",
      "zh": "汽车更加安全意味着事故统计数据将会下降：美国约94%的道路事故都涉及人为失误。",
      "source": "2018.12 第3套"
    },
    "confusable": {
      "word": "incident",
      "diff": "accident 强调意外伤害事故；incident 泛指日常或政治/暴力事件"
    },
    "tag": "听力高频"
  },
  {
    "id": "v022",
    "day": 1,
    "word": "investigate",
    "phonetic": "/ɪnˈvestɪɡeɪt/",
    "pos": "v.",
    "meaning": "调查，侦查；深入研究",
    "examFreq": 8,
    "roots": "in-(进入) + vestig(脚印，踪迹) + -ate(动词后缀) -> 顺着脚印追踪 -> 调查",
    "mnemonic": "进(in)去追查足迹(vestig) -> 警方调查事故或学者研究现象",
    "collocations": [
      {
        "en": "investigate the cause",
        "zh": "调查原因"
      },
      {
        "en": "under investigation",
        "zh": "正在调查中"
      },
      {
        "en": "thoroughly investigate",
        "zh": "彻底调查"
      }
    ],
    "realSentence": {
      "en": "Yuka Sasaki and her colleagues at Brown University set out to investigate the origins of this effect.",
      "zh": "布朗大学的佐佐木由香和她的同事们着手调查这一效应的起源。",
      "source": "2017.12 第1套"
    },
    "confusable": {
      "word": "invest",
      "diff": "investigate 调查研究；invest 投资/投入"
    },
    "tag": "听力高频"
  },
  {
    "id": "v023",
    "day": 1,
    "word": "flight",
    "phonetic": "/flaɪt/",
    "pos": "n.",
    "meaning": "航班，班机；飞行；[熟词僻义] 一段楼梯（a flight of stairs）",
    "examFreq": 10,
    "roots": "源自 fly(飞) 的名词形式，-ght 表状态/行为 -> 飞行/航班",
    "mnemonic": "fly 飞上天变成 flight -> 航班；听力高频搭配 delayed flight / book a flight",
    "collocations": [
      {
        "en": "book a flight",
        "zh": "预订机票"
      },
      {
        "en": "delayed flight",
        "zh": "延误的航班"
      },
      {
        "en": "flight attendant",
        "zh": "空乘人员"
      }
    ],
    "realSentence": {
      "en": "Long queues, delayed flights and over-crowding at airports have become almost as much a topic for conversation in Britain as the traditional complaining about the weather.",
      "zh": "机场排长队、航班延误和过度拥挤在英国几乎已成为和传统抱怨天气一样常见的话题。",
      "source": "2016.06 第2套听力"
    },
    "confusable": {
      "word": "fright / plight",
      "diff": "flight 航班飞行；fright 惊吓；plight 困境"
    },
    "tag": "听力高频"
  },
  {
    "id": "v024",
    "day": 1,
    "word": "discount",
    "phonetic": "/ˈdɪskaʊnt/",
    "pos": "n./v.",
    "meaning": "折扣，打折；[熟词僻义 v.] 低估，不全信",
    "examFreq": 5,
    "roots": "dis-(去掉，减少) + count(计算) -> 算账时减去一部分 -> 折扣",
    "mnemonic": "结账 count 时减掉(dis)一部分钱 -> 打折；听力数字题必考 get a discount",
    "collocations": [
      {
        "en": "at a discount",
        "zh": "打折出售"
      },
      {
        "en": "get a student discount",
        "zh": "享受学生折扣"
      },
      {
        "en": "offer a 20% discount",
        "zh": "提供八折优惠"
      }
    ],
    "realSentence": {
      "en": "Also, if we both sign up before Friday, we can get a discount on a six-month membership.",
      "zh": "此外，如果我们俩在周五前报名，半年会员卡还能享受折扣。",
      "source": "2018.06 第2套听力"
    },
    "confusable": {
      "word": "account",
      "diff": "discount 折扣/低估；account 账户/解释/占比"
    },
    "tag": "听力高频"
  },
  {
    "id": "v025",
    "day": 1,
    "word": "budget",
    "phonetic": "/ˈbʌdʒɪt/",
    "pos": "n./v.",
    "meaning": "预算，经费；编制预算；[adj.] 经济实惠的",
    "examFreq": 16,
    "roots": "源自古法语 bougette(小皮袋) -> 装钱的荷包 -> 预算",
    "mnemonic": "管好荷包别“爆(bu)炸(dget)” -> 严格控制预算 on a tight budget",
    "collocations": [
      {
        "en": "on a tight budget",
        "zh": "预算紧张"
      },
      {
        "en": "balance the budget",
        "zh": "平衡预算"
      },
      {
        "en": "budget cuts",
        "zh": "削减预算"
      }
    ],
    "realSentence": {
      "en": "They are under growing pressure to balance their national budgets.",
      "zh": "他们正面临越来越大的压力来平衡国家预算。",
      "source": "2016.12 第2套"
    },
    "confusable": null,
    "tag": "听力高频"
  },
  {
    "id": "v026",
    "day": 1,
    "word": "register",
    "phonetic": "/ˈredʒɪstər/",
    "pos": "v./n.",
    "meaning": "登记，注册；[n.] 登记簿，收银机（cash register）",
    "examFreq": 9,
    "roots": "re-(向回) + gest(带来/记录) + -er -> 把信息带回簿册记录 -> 登记注册",
    "mnemonic": "校园选课、参会报名都用 register for；超市收银台叫 cash register",
    "collocations": [
      {
        "en": "register for a course",
        "zh": "注册选课"
      },
      {
        "en": "cash register",
        "zh": "收银机"
      },
      {
        "en": "online registration",
        "zh": "网上报名"
      }
    ],
    "realSentence": {
      "en": "Participating schools then register by November and eventually submit their design idea.",
      "zh": "参赛学校随后在11月前完成注册，并最终提交他们的设计创意。",
      "source": "2025.06 第1套"
    },
    "confusable": null,
    "tag": "听力高频"
  },
  {
    "id": "v027",
    "day": 2,
    "word": "claim",
    "phonetic": "/kleɪm/",
    "pos": "v./n.",
    "meaning": "声称，宣称；主张，索赔；[熟词僻义] 夺去（生命）",
    "examFreq": 24,
    "roots": "词根 claim/clam(呼喊，宣称) -> 大声宣称自己的主张 -> 声称/索赔",
    "mnemonic": "阅读中出现 claim 常暗含“作者未必认同”的客观转述信号！",
    "collocations": [
      {
        "en": "claim to do sth.",
        "zh": "声称做某事"
      },
      {
        "en": "make a claim",
        "zh": "提出主张/索赔"
      },
      {
        "en": "claim lives",
        "zh": "夺去生命"
      }
    ],
    "realSentence": {
      "en": "Ancestry tests claim to reveal our genetic identities.",
      "zh": "祖源基因检测声称能够揭示我们的遗传身份。",
      "source": "2025.12 第3套"
    },
    "confusable": {
      "word": "acclaim / exclaim / reclaim",
      "diff": "claim 声称；acclaim 称赞；exclaim 惊呼；reclaim 回收/开垦"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v028",
    "day": 2,
    "word": "argue",
    "phonetic": "/ˈɑːrɡjuː/",
    "pos": "v.",
    "meaning": "论证，主张（argue that）；争论，争辩",
    "examFreq": 27,
    "roots": "拉丁词根 argu-(使清晰，证明) -> 摆出论据讲清楚 -> 主张/论证",
    "mnemonic": "四级阅读里 argue 80%不是“吵架”，而是学者“提出论点/主张”！",
    "collocations": [
      {
        "en": "argue for / against",
        "zh": "赞成/反对……"
      },
      {
        "en": "argue that...",
        "zh": "主张/论证……"
      },
      {
        "en": "convincing argument",
        "zh": "有说服力的论据"
      }
    ],
    "realSentence": {
      "en": "But Friedman argues that the evidence for this theory is far from conclusive.",
      "zh": "但弗里德曼主张，支持这一理论的证据远非定论。",
      "source": "2024.06 第1套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v029",
    "day": 2,
    "word": "assume",
    "phonetic": "/əˈsuːm/",
    "pos": "v.",
    "meaning": "假定，设想；[熟词僻义] 承担（责任/角色），呈现",
    "examFreq": 16,
    "roots": "as-(朝向) + sume(拿，取) -> 先拿来当作前提 -> 假定；拿到肩上 -> 承担",
    "mnemonic": "as(去)+sume(拿) -> 还没证实就先拿来当结论叫“假定”；拿下职责叫“承担”",
    "collocations": [
      {
        "en": "it is safe to assume",
        "zh": "有理由假定"
      },
      {
        "en": "assume responsibility",
        "zh": "承担责任"
      },
      {
        "en": "make an assumption",
        "zh": "作出假设"
      }
    ],
    "realSentence": {
      "en": "We assume that if we knew about a better strategy, then we would get better results.",
      "zh": "我们总是想当然地认为，只要知道了更好的策略，就能获得更好的结果。",
      "source": "2024.12 第3套"
    },
    "confusable": {
      "word": "consume / resume / presume",
      "diff": "assume 假定/承担；consume 消费；resume 恢复/简历；presume 推定"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v030",
    "day": 2,
    "word": "conclude",
    "phonetic": "/kənˈkluːd/",
    "pos": "v.",
    "meaning": "得出结论，断定；结束，缔结（条约）",
    "examFreq": 21,
    "roots": "con-(全部) + clude(关闭) -> 把论证全部收口合上 -> 得出结论/结束",
    "mnemonic": "词根 clude 表“关”：一起关上(con+clude) -> 总结收尾、下结论",
    "collocations": [
      {
        "en": "conclude from",
        "zh": "从……中得出结论"
      },
      {
        "en": "draw a conclusion",
        "zh": "得出结论"
      },
      {
        "en": "in conclusion",
        "zh": "总而言之"
      }
    ],
    "realSentence": {
      "en": "Even a few days lost in a year could be enough to miss out on getting a good exam grade, the DFE's research concluded.",
      "zh": "教育部的研究得出结论：一年哪怕缺课几天，都可能足以让人与好成绩失之交臂。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "include / exclude",
      "diff": "conclude 得出结论/结束；include 包含；exclude 排除"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v031",
    "day": 2,
    "word": "infer",
    "phonetic": "/ɪnˈfɜːr/",
    "pos": "v.",
    "meaning": "推断，推论（阅读推断题题干标志词）",
    "examFreq": 9,
    "roots": "in-(向内) + fer(带，拿) -> 从字里行间带出隐含意思 -> 推断",
    "mnemonic": "看到阅读题干 What can we infer...? 切忌选表面原词，要选原文同义推导！",
    "collocations": [
      {
        "en": "infer from the passage",
        "zh": "从文章中推断"
      },
      {
        "en": "draw an inference",
        "zh": "作出推论"
      },
      {
        "en": "logical inference",
        "zh": "逻辑推理"
      }
    ],
    "realSentence": {
      "en": "What can we infer about moral disgust from the author and his colleagues' findings?",
      "zh": "从作者及其同事的研究发现中，我们可以对道德厌恶推断出什么？",
      "source": "2026.06 第3套"
    },
    "confusable": {
      "word": "imply / refer / defer",
      "diff": "infer 读者推断；imply 作者暗示；refer 提及/参考；defer 推迟"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v032",
    "day": 2,
    "word": "indicate",
    "phonetic": "/ˈɪndɪkeɪt/",
    "pos": "v.",
    "meaning": "表明，显示；指示，暗示",
    "examFreq": 14,
    "roots": "in-(向内/指向) + dic(说，指) + -ate -> 指出来说明 -> 表明/指示",
    "mnemonic": "词根 dic=说(如 dictionary)，用数据“指出来说” -> 表明/显示",
    "collocations": [
      {
        "en": "research indicates that",
        "zh": "研究表明……"
      },
      {
        "en": "a clear indication",
        "zh": "明确的迹象"
      },
      {
        "en": "key indicator",
        "zh": "关键指标"
      }
    ],
    "realSentence": {
      "en": "The saying indicates the importance of lifelong learning, which we have been lectured over and over again.",
      "zh": "这句谚语表明了终身学习的重要性，这一点我们已被反复教导过很多次。",
      "source": "2015.12 第2套"
    },
    "confusable": {
      "word": "dedicate / dictate",
      "diff": "indicate 表明；dedicate 致力于/奉献；dictate 听写/支配"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v033",
    "day": 2,
    "word": "reveal",
    "phonetic": "/rɪˈviːl/",
    "pos": "v.",
    "meaning": "揭示，揭露；展现，显示",
    "examFreq": 21,
    "roots": "re-(相反/揭开) + veal(源自 veil 面纱) -> 揭开面纱 -> 揭示",
    "mnemonic": "揭开(re)面纱(veil/veal) -> 露出真相！实验结果句高频动词",
    "collocations": [
      {
        "en": "reveal the truth",
        "zh": "揭示真相"
      },
      {
        "en": "studies reveal that",
        "zh": "研究揭示……"
      },
      {
        "en": "reveal a trend",
        "zh": "显示出一种趋势"
      }
    ],
    "realSentence": {
      "en": "Many studies reveal that eating breakfast helps people memorise and concentrate.",
      "zh": "许多研究揭示，吃早餐有助于人们记忆和集中注意力。",
      "source": "2019.12 第2套"
    },
    "confusable": {
      "word": "appeal / conceal",
      "diff": "reveal 揭示揭露；conceal 隐瞒藏匿（反义）；appeal 吸引呼吁"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v034",
    "day": 2,
    "word": "demonstrate",
    "phonetic": "/ˈdemənstreɪt/",
    "pos": "v.",
    "meaning": "证明，论证；演示，展示；游行示威",
    "examFreq": 7,
    "roots": "de-(加强) + monstr(展示，如 monster) + -ate -> 彻底展示出来 -> 证明/演示",
    "mnemonic": "de(彻底)+monstr(展示)+ate -> 用实例展示并证明（阅读高频替代 show）",
    "collocations": [
      {
        "en": "demonstrate the effectiveness",
        "zh": "证明其有效性"
      },
      {
        "en": "clearly demonstrate",
        "zh": "清楚地表明"
      },
      {
        "en": "live demonstration",
        "zh": "现场演示"
      }
    ],
    "realSentence": {
      "en": "But in a new study, researchers demonstrated for the first time how this effect occurs in the brain.",
      "zh": "但在一项新研究中，研究人员首次证明了这种效应是如何在大脑中产生的。",
      "source": "2017.06 第3套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v035",
    "day": 2,
    "word": "prove",
    "phonetic": "/pruːv/",
    "pos": "v.",
    "meaning": "证明，证实；[熟词僻义 系动词] 结果是，证明是",
    "examFreq": 33,
    "roots": "拉丁词根 prob-(测试，检验) -> 经受住检验 -> 证明",
    "mnemonic": "真题高频系动词用法：prove (to be) + adj./n. 表示“最终证明是……”",
    "collocations": [
      {
        "en": "prove to be effective",
        "zh": "事实证明有效"
      },
      {
        "en": "prove a great success",
        "zh": "结果大获成功"
      },
      {
        "en": "scientific proof",
        "zh": "科学证据"
      }
    ],
    "realSentence": {
      "en": "The practice of taxing alcohol and tobacco has proved both popular and profitable.",
      "zh": "对烟酒征税的做法结果证明既受民众欢迎又利润丰厚。",
      "source": "2016.12 第2套"
    },
    "confusable": {
      "word": "approve / improve",
      "diff": "prove 证明；approve 批准/赞成；improve 改善提高"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v036",
    "day": 2,
    "word": "suggest",
    "phonetic": "/səˈdʒest/",
    "pos": "v.",
    "meaning": "表明，暗示（后接陈述语气）；建议（后接虚拟语气 should do）",
    "examFreq": 55,
    "roots": "sug-(在下面) + gest(带来) -> 从下面悄悄端上来 -> 暗示/建议",
    "mnemonic": "四级阅读核心考点：Research suggests that... 译为“研究表明”，千万别译成“研究建议”！",
    "collocations": [
      {
        "en": "evidence suggests that",
        "zh": "证据表明……"
      },
      {
        "en": "make a suggestion",
        "zh": "提出建议"
      },
      {
        "en": "strongly suggest",
        "zh": "强烈表明/建议"
      }
    ],
    "realSentence": {
      "en": "Science now suggests the right dress may give ourselves the extra edge in our professional and personal lives.",
      "zh": "如今科学研究表明，得体的着装或许能为我们的职场与个人生活增添额外优势。",
      "source": "2025.06 第2套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v037",
    "day": 2,
    "word": "deny",
    "phonetic": "/dɪˈnaɪ/",
    "pos": "v.",
    "meaning": "否认，否定；拒绝给予（deny sb. sth.）",
    "examFreq": 5,
    "roots": "de-(彻底) + ny(源自 neg 否定) -> 彻底说不 -> 否认/拒绝",
    "mnemonic": "作文万能开头句型：There is no denying that...（不可否认的是……）",
    "collocations": [
      {
        "en": "there is no denying that",
        "zh": "不可否认……"
      },
      {
        "en": "deny the accusation",
        "zh": "否认指控"
      },
      {
        "en": "deny access to",
        "zh": "拒绝给予……的权限"
      }
    ],
    "realSentence": {
      "en": "He denies the decision is depriving children of the chance to enjoy the snow.",
      "zh": "他否认这一决定剥夺了孩子们享受雪景的机会。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "defy / delay",
      "diff": "deny 否认；defy 违抗/挑战；delay 推迟"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v038",
    "day": 2,
    "word": "dispute",
    "phonetic": "/dɪˈspjuːt/",
    "pos": "n./v.",
    "meaning": "争端，纠纷，争议；对……提出质疑",
    "examFreq": 5,
    "roots": "dis-(分开) + pute(思考，计算) -> 双方想法分道扬镳 -> 争议/争端",
    "mnemonic": "想法(pute)各执一词分开(dis) -> 产生争端；beyond dispute 毋庸置疑",
    "collocations": [
      {
        "en": "resolve a dispute",
        "zh": "解决争端"
      },
      {
        "en": "beyond dispute",
        "zh": "无可争议"
      },
      {
        "en": "in dispute",
        "zh": "处于争议中"
      }
    ],
    "realSentence": {
      "en": "Men are more likely to face that dispute from the perspective of what benefits them most, whereas women may approach the same dispute from the perspective of what's the easiest and quickest way to resolve the problem.",
      "zh": "男性更倾向于从自身最大利益的角度面对争端，而女性则可能从最简便快捷的解决之道来处理同一争端。",
      "source": "2017.12 第1套"
    },
    "confusable": {
      "word": "repute / compute",
      "diff": "dispute 争端质疑；repute 名声；compute 计算"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v039",
    "day": 2,
    "word": "challenge",
    "phonetic": "/ˈtʃælɪndʒ/",
    "pos": "n./v.",
    "meaning": "挑战，难题；[熟词僻义 v.] 质疑，向……提出异议",
    "examFreq": 44,
    "roots": "源自拉丁语 calumnia(质疑，指控) -> 公开质疑对手 -> 挑战/质疑",
    "mnemonic": "四级阅读里 challenge a theory 不是“挑战游戏”，而是“质疑某项理论”！",
    "collocations": [
      {
        "en": "pose a challenge to",
        "zh": "对……构成挑战"
      },
      {
        "en": "challenge traditional views",
        "zh": "质疑传统观念"
      },
      {
        "en": "meet the challenge",
        "zh": "迎接挑战"
      }
    ],
    "realSentence": {
      "en": "Sadly, the people who most need the help are least likely to take it — which raises a challenge for society as a whole.",
      "zh": "遗憾的是，最需要帮助的人往往最不愿接受帮助——这给整个社会带来了挑战。",
      "source": "2025.12 第3套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v040",
    "day": 2,
    "word": "debate",
    "phonetic": "/dɪˈbeɪt/",
    "pos": "n./v.",
    "meaning": "辩论，讨论，争论；仔细考虑",
    "examFreq": 19,
    "roots": "de-(彻底) + bate(击打，如 battle) -> 唇枪舌剑互相交锋 -> 辩论",
    "mnemonic": "de(向下猛烈)+bate(打) -> 观点交锋的辩论；hotly debated 备受争议的",
    "collocations": [
      {
        "en": "heated debate",
        "zh": "激烈的辩论"
      },
      {
        "en": "under debate",
        "zh": "正在讨论中"
      },
      {
        "en": "spark a debate",
        "zh": "引发一场辩论"
      }
    ],
    "realSentence": {
      "en": "The oldest debates were over whether the standards of living rose or fell.",
      "zh": "最古老的争论聚焦于生活水平究竟是上升了还是下降了。",
      "source": "2026.06 第1套"
    },
    "confusable": {
      "word": "rebate",
      "diff": "debate 辩论；rebate 回扣/退款"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v041",
    "day": 2,
    "word": "perspective",
    "phonetic": "/pərˈspektɪv/",
    "pos": "n.",
    "meaning": "视角，观点；客观判断力（put sth. into perspective）；透视法",
    "examFreq": 8,
    "roots": "per-(穿透) + spect(看) + -ive -> 穿透表象看问题的角度 -> 视角/观点",
    "mnemonic": "per(穿透)+spect(看) -> 看清全局的角度；作文高频词组 from this perspective",
    "collocations": [
      {
        "en": "from a new perspective",
        "zh": "从新的视角来看"
      },
      {
        "en": "put sth. into perspective",
        "zh": "客观全面地看待某事"
      },
      {
        "en": "global perspective",
        "zh": "全球视野"
      }
    ],
    "realSentence": {
      "en": "And if it seems like finding that perfect balance remains difficult to achieve, the experts say that keeping some perspective can help.",
      "zh": "如果找到那种完美平衡似乎仍难以实现，专家表示保持客观长远的视角会有所帮助。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "prospective / respective",
      "diff": "perspective 视角观点；prospective 潜在的/预期的；respective 各自的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v042",
    "day": 2,
    "word": "attitude",
    "phonetic": "/ˈætɪtuːd/",
    "pos": "n.",
    "meaning": "态度，看法；姿态",
    "examFreq": 14,
    "roots": "apt(适合的，倾向的) + -itude(状态) -> 内心表现出的倾向状态 -> 态度",
    "mnemonic": "阅读态度题必认：positive(积极)/negative(消极)/objective(客观)/critical(批判)",
    "collocations": [
      {
        "en": "positive attitude",
        "zh": "积极态度"
      },
      {
        "en": "attitude towards",
        "zh": "对……的态度"
      },
      {
        "en": "adopt an attitude",
        "zh": "采取某种态度"
      }
    ],
    "realSentence": {
      "en": "Now a large-scale study has tried an innovative approach to change teenagers' attitudes towards healthy eating, and the results are promising.",
      "zh": "如今一项大规模研究尝试用创新方法改变青少年对健康饮食的态度，结果令人鼓舞。",
      "source": "2025.12 第2套"
    },
    "confusable": {
      "word": "altitude / aptitude",
      "diff": "attitude 态度；altitude 海拔高度；aptitude 天资/倾向"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v043",
    "day": 2,
    "word": "evidence",
    "phonetic": "/ˈevɪdəns/",
    "pos": "n.",
    "meaning": "证据，证明；迹象（不可数名词！）",
    "examFreq": 23,
    "roots": "e-(出来) + vid(看见，如 video) + -ence -> 摆出来看得见的事实 -> 证据",
    "mnemonic": "e(出)+vid(看)+ence -> 眼见为实的证据；注意不可数，不能加 s！",
    "collocations": [
      {
        "en": "solid evidence",
        "zh": "确凿的证据"
      },
      {
        "en": "a growing body of evidence",
        "zh": "越来越多的证据"
      },
      {
        "en": "evidence shows that",
        "zh": "证据表明……"
      }
    ],
    "realSentence": {
      "en": "Recent evidence shows even relying on the information provided by the seller is not going to answer many questions.",
      "zh": "最新证据表明，即便依赖卖家提供的信息也无法解答诸多疑问。",
      "source": "2024.12 第3套"
    },
    "confusable": {
      "word": "evident",
      "diff": "evidence(n.) 证据；evident(adj.) 明显的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v044",
    "day": 2,
    "word": "finding",
    "phonetic": "/ˈfaɪndɪŋ/",
    "pos": "n.",
    "meaning": "研究发现，调查结果（常用复数 findings）",
    "examFreq": 65,
    "roots": "find(发现) + -ing(名词化) -> 研究团队找出来的成果 -> 调查发现",
    "mnemonic": "四级科普阅读里，the findings 后面紧跟的句子往往就是中心主旨或考点句！",
    "collocations": [
      {
        "en": "research findings",
        "zh": "研究发现"
      },
      {
        "en": "consistent with earlier findings",
        "zh": "与早期发现一致"
      },
      {
        "en": "key findings",
        "zh": "核心发现"
      }
    ],
    "realSentence": {
      "en": "But the really interesting finding came when the researchers stepped out of the lab, to conduct a field experiment.",
      "zh": "但真正有趣的发现出现在研究人员走出实验室、开展实地实验之时。",
      "source": "2026.06 第3套"
    },
    "confusable": {
      "word": "funding / founding",
      "diff": "finding 研究发现；funding 资金资助；founding 建立创立"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v045",
    "day": 2,
    "word": "factor",
    "phonetic": "/ˈfæktər/",
    "pos": "n.",
    "meaning": "因素，要素；系数",
    "examFreq": 36,
    "roots": "fact(做，制造) + -or(促成者) -> 促成某结果起作用的力量 -> 因素",
    "mnemonic": "造成事实(fact)的背后推手(or) -> 关键因素 key/deciding factor",
    "collocations": [
      {
        "en": "contributing factor",
        "zh": "促成因素"
      },
      {
        "en": "deciding factor",
        "zh": "决定性因素"
      },
      {
        "en": "take factors into account",
        "zh": "将各种因素考虑在内"
      }
    ],
    "realSentence": {
      "en": "This difference in handling conflict could be the deciding factor on who gets promoted to a leadership position and who does not.",
      "zh": "处理冲突方式上的这种差异，可能成为决定谁能晋升管理层而谁不能的关键因素。",
      "source": "2017.12 第1套"
    },
    "confusable": {
      "word": "factory / sector",
      "diff": "factor 因素；factory 工厂；sector 行业部门"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v046",
    "day": 2,
    "word": "concept",
    "phonetic": "/ˈkɑːnsept/",
    "pos": "n.",
    "meaning": "概念，观念，想法",
    "examFreq": 18,
    "roots": "con-(全部) + cept(抓，拿) -> 大脑把同类特征抓在一起 -> 概念",
    "mnemonic": "con(共同)+cept(抓) -> 大脑抓住事物的本质提炼出的“概念”",
    "collocations": [
      {
        "en": "basic concept",
        "zh": "基本概念"
      },
      {
        "en": "grasp a concept",
        "zh": "理解一个概念"
      },
      {
        "en": "introduce a new concept",
        "zh": "引入新概念"
      }
    ],
    "realSentence": {
      "en": "The concept is often presented as something to achieve, or a goal to reach.",
      "zh": "这一概念常被表述为某种需要实现的事物，或一个需要达成的目标。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "conceive / perception",
      "diff": "concept 概念；conceive(v.) 构想；perception 感知/看法"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v047",
    "day": 2,
    "word": "theory",
    "phonetic": "/ˈθɪri/",
    "pos": "n.",
    "meaning": "理论，学说；推测，看法",
    "examFreq": 14,
    "roots": "希腊词根 theoria(观察，沉思) -> 反复观察总结出的体系 -> 理论",
    "mnemonic": "搭配高频对照：in theory(在理论上) vs in practice(在实践中)",
    "collocations": [
      {
        "en": "in theory",
        "zh": "理论上"
      },
      {
        "en": "put forward a theory",
        "zh": "提出一个理论"
      },
      {
        "en": "test a theory",
        "zh": "检验理论"
      }
    ],
    "realSentence": {
      "en": "Scientists have different theories as to why there's a relationship between the two.",
      "zh": "关于两者之间为何存在关联，科学家们有不同的理论解释。",
      "source": "2019.12 第2套"
    },
    "confusable": {
      "word": "therapy",
      "diff": "theory 理论学说；therapy 疗法/心理治疗"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v048",
    "day": 2,
    "word": "bias",
    "phonetic": "/ˈbaɪəs/",
    "pos": "n./v.",
    "meaning": "偏见，偏向，偏心；使有偏见",
    "examFreq": 15,
    "roots": "源自古法语 biais(斜线，倾斜) -> 天平斜向一边 -> 偏见/偏向",
    "mnemonic": "心里长了斜线“拜(bi)倒一侧(as)” -> 偏见！常考 gender bias(性别偏见)",
    "collocations": [
      {
        "en": "gender bias",
        "zh": "性别偏见"
      },
      {
        "en": "be biased against",
        "zh": "对……抱有偏见"
      },
      {
        "en": "free from bias",
        "zh": "不带偏见的"
      }
    ],
    "realSentence": {
      "en": "Furthermore, science has many safeguards in place to catch instances of bias that affect research outcomes.",
      "zh": "此外，科学界设有多重保障机制，以捕捉影响研究结果的偏见案例。",
      "source": "2024.06 第2套"
    },
    "confusable": {
      "word": "basis",
      "diff": "bias 偏见偏向；basis 基础根据"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v049",
    "day": 2,
    "word": "objective",
    "phonetic": "/əbˈdʒektɪv/",
    "pos": "adj./n.",
    "meaning": "客观的，不带偏见的；[熟词僻义 n.] 目标，目的",
    "examFreq": 5,
    "roots": "ob-(对着) + ject(投掷) + -ive -> 摆在眼前的客体 -> 客观的/靶子目标",
    "mnemonic": "阅读态度题选 objective(客观的) 概率极高；作名词=goal(目标)",
    "collocations": [
      {
        "en": "remain objective",
        "zh": "保持客观"
      },
      {
        "en": "achieve an objective",
        "zh": "实现目标"
      },
      {
        "en": "objective evaluation",
        "zh": "客观评估"
      }
    ],
    "realSentence": {
      "en": "In a perfect world, money wouldn't matter — all scientific studies would be completely objective.",
      "zh": "在完美的世界里，金钱无关紧要——所有科学研究都将完全客观。",
      "source": "2024.06 第2套"
    },
    "confusable": {
      "word": "subjective / objection",
      "diff": "objective 客观的/目标；subjective 主观的；objection 反对"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v050",
    "day": 2,
    "word": "survey",
    "phonetic": "/ˈsɜːrveɪ/",
    "pos": "n./v.",
    "meaning": "民意调查，问卷调查；审视，勘测",
    "examFreq": 42,
    "roots": "sur-(在上面，全面) + vey(看，如 view) -> 居高临下全面查看 -> 调查/勘测",
    "mnemonic": "从上方(sur)全面查看(vey)样本数据 -> 调查；动词重音在后 /sərˈveɪ/",
    "collocations": [
      {
        "en": "conduct a survey",
        "zh": "开展一项调查"
      },
      {
        "en": "a recent survey",
        "zh": "最近的一项调查"
      },
      {
        "en": "survey participants",
        "zh": "调查受访者"
      }
    ],
    "realSentence": {
      "en": "Afterwards, the participants read a fictional survey of teens who wanted to \"fight back against the companies by buying and eating less processed food\".",
      "zh": "随后，受试者阅读了一份虚构的青少年调查报告，称他们希望“通过少买少吃加工食品来反击这些公司”。",
      "source": "2025.12 第2套"
    },
    "confusable": {
      "word": "survive / convey",
      "diff": "survey 调查；survive 幸存；convey 传达运送"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v051",
    "day": 2,
    "word": "interpret",
    "phonetic": "/ɪnˈtɜːrprɪt/",
    "pos": "v.",
    "meaning": "解释，说明；把……理解为；口译",
    "examFreq": 8,
    "roots": "inter-(在两者之间) + pret(价格/传达) -> 在两方间充当中介传话 -> 解释/口译",
    "mnemonic": "在两者之间(inter)把晦涩数据或外语翻成明白话 -> 解读/口译",
    "collocations": [
      {
        "en": "interpret the data",
        "zh": "解读数据"
      },
      {
        "en": "interpret sth. as",
        "zh": "把某事理解为……"
      },
      {
        "en": "simultaneous interpreter",
        "zh": "同声传译员"
      }
    ],
    "realSentence": {
      "en": "Genetic tests for multi-factorial traits are often very tricky to interpret.",
      "zh": "针对多因素特征的基因检测往往非常难以解读。",
      "source": "2025.12 第3套"
    },
    "confusable": {
      "word": "interrupt / interfere",
      "diff": "interpret 解释/口译；interrupt 打断；interfere 干涉干扰"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v052",
    "day": 2,
    "word": "evaluate",
    "phonetic": "/ɪˈvæljueɪt/",
    "pos": "v.",
    "meaning": "评估，评价，估价",
    "examFreq": 8,
    "roots": "e-(出来) + valu(价值 value) + -ate(动词后缀) -> 把价值测算出来 -> 评估",
    "mnemonic": "中间藏着大大的 valu(价值) -> 评定某事的价值高低",
    "collocations": [
      {
        "en": "evaluate performance",
        "zh": "评估表现"
      },
      {
        "en": "evaluate the risks",
        "zh": "评估风险"
      },
      {
        "en": "comprehensive evaluation",
        "zh": "综合评估"
      }
    ],
    "realSentence": {
      "en": "We even evaluate people whom we have just met based on their clothes.",
      "zh": "我们甚至会根据刚认识的人的穿着来评价他们。",
      "source": "2025.06 第2套"
    },
    "confusable": {
      "word": "value / assess",
      "diff": "evaluate 侧重全面评估价值与成效；assess 侧重测算评估数量、质量或税费"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v053",
    "day": 3,
    "word": "digital",
    "phonetic": "/ˈdɪdʒɪtl/",
    "pos": "adj.",
    "meaning": "数字的，数码的，电子的",
    "examFreq": 39,
    "roots": "digit(手指，阿拉伯数字) + -al(形容词后缀) -> 用数字编码的 -> 数字的",
    "mnemonic": "digit 既指“手指”又指“0-9数字”，一切0和1驱动的技术都是 digital",
    "collocations": [
      {
        "en": "digital devices",
        "zh": "数码设备"
      },
      {
        "en": "digital era",
        "zh": "数字时代"
      },
      {
        "en": "digital literacy",
        "zh": "数字素养"
      }
    ],
    "realSentence": {
      "en": "He said most Indiana schools already use digital devices during lessons, so it was an \"easy decision\" to extend this to days when schools are closed.",
      "zh": "他表示印第安纳州大多数学校上课已在使用数码设备，因此将其扩展到停课日是一个“轻松的决定”。",
      "source": "2024.06 第3套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v054",
    "day": 3,
    "word": "device",
    "phonetic": "/dɪˈvaɪs/",
    "pos": "n.",
    "meaning": "设备，装置，仪器；[熟词僻义] 策略，手段",
    "examFreq": 17,
    "roots": "源自拉丁语 dividere(划分/设计) -> 专门设计出的器具 -> 装置/设备",
    "mnemonic": "c 是名词(device 设备)，s 是动词(devise 设计发明)，同 advice/advise！",
    "collocations": [
      {
        "en": "electronic device",
        "zh": "电子设备"
      },
      {
        "en": "smart device",
        "zh": "智能设备"
      },
      {
        "en": "safety device",
        "zh": "安全装置"
      }
    ],
    "realSentence": {
      "en": "The elephant in your living room is your Internet-connected security camera, a device people are increasingly using for peace of mind in their homes.",
      "zh": "客厅里被忽视的隐患就是联网安防摄像头——一种人们越来越常用来求得居家安心的设备。",
      "source": "2018.12 第2套"
    },
    "confusable": {
      "word": "devise / advice",
      "diff": "device(n.) 设备装置；devise(v.) 设计发明；advice(n.) 建议"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v055",
    "day": 3,
    "word": "innovation",
    "phonetic": "/ˌɪnəˈveɪʃn/",
    "pos": "n.",
    "meaning": "创新，革新；新方法，新事物",
    "examFreq": 8,
    "roots": "in-(向内/使) + nov(新，如 novel) + -ation(名词后缀) -> 引入新事物 -> 创新",
    "mnemonic": "核心词根 nov=新，把“新”注入(in)进去 -> 创新；作文科技类必背高分词",
    "collocations": [
      {
        "en": "technological innovation",
        "zh": "技术创新"
      },
      {
        "en": "spirit of innovation",
        "zh": "创新精神"
      },
      {
        "en": "drive innovation",
        "zh": "推动创新"
      }
    ],
    "realSentence": {
      "en": "Almost all companies recognize the importance of innovation today, but not many are able to integrate innovation into their business.",
      "zh": "如今几乎所有公司都认识到创新的重要性，但能把创新真正融入业务的企业并不多。",
      "source": "2016.06 第1套听力"
    },
    "confusable": {
      "word": "renovation",
      "diff": "innovation 创新革新；renovation 翻新修缮（房屋等）"
    },
    "tag": "译写必备"
  },
  {
    "id": "v056",
    "day": 3,
    "word": "technological",
    "phonetic": "/ˌteknəˈlɑːdʒɪkl/",
    "pos": "adj.",
    "meaning": "科技的，技术上的，工艺的",
    "examFreq": 11,
    "roots": "techno-(技艺/科技) + log(学科) + -ical(形容词后缀) -> 科技方面的",
    "mnemonic": "注意区分：technological 强调“科学技术整体发展”，technical 侧重“专业操作技巧”",
    "collocations": [
      {
        "en": "technological advancement",
        "zh": "科技进步"
      },
      {
        "en": "technological breakthrough",
        "zh": "技术突破"
      },
      {
        "en": "technological change",
        "zh": "技术变革"
      }
    ],
    "realSentence": {
      "en": "Technological changes brought dramatic new options to Americans living in the 1990s.",
      "zh": "科技变革给20世纪90年代的美国人带来了翻天覆地的新选择。",
      "source": "2017.12 第2套"
    },
    "confusable": {
      "word": "technical",
      "diff": "technological 科技层面的；technical 专业技术/操作细节的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v057",
    "day": 3,
    "word": "artificial",
    "phonetic": "/ˌɑːrtɪˈfɪʃl/",
    "pos": "adj.",
    "meaning": "人工的，人造的；矫揉造作的",
    "examFreq": 12,
    "roots": "arti-(技艺 art) + fic(做，制造) + -ial -> 用技艺做出来的（非天然） -> 人工的",
    "mnemonic": "art(技艺)+fic(做) -> 人工造的！2024–2026真题 AI(artificial intelligence) 高频词",
    "collocations": [
      {
        "en": "artificial intelligence",
        "zh": "人工智能"
      },
      {
        "en": "artificial light",
        "zh": "人造光"
      },
      {
        "en": "artificial sweeteners",
        "zh": "人工甜味剂"
      }
    ],
    "realSentence": {
      "en": "Over the coming decades, millions of jobs will be threatened by robotics and artificial intelligence.",
      "zh": "未来几十年里，数百万个工作岗位将受到机器人技术和人工智能的威胁。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "artistic",
      "diff": "artificial 人工的/人造的；artistic 艺术的/有艺术性的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v058",
    "day": 3,
    "word": "intelligence",
    "phonetic": "/ɪnˈtelɪdʒəns/",
    "pos": "n.",
    "meaning": "智力，智能，才智；[熟词僻义] 情报",
    "examFreq": 25,
    "roots": "inter-(在……之间) + leg(挑选，理解) + -ence -> 能在纷繁中辨识挑选 -> 智力",
    "mnemonic": "除了 AI(人工智能)，记熟词僻义：intelligence agency 情报机构",
    "collocations": [
      {
        "en": "artificial intelligence",
        "zh": "人工智能"
      },
      {
        "en": "emotional intelligence",
        "zh": "情商"
      },
      {
        "en": "intelligence test",
        "zh": "智力测试"
      }
    ],
    "realSentence": {
      "en": "Seventy-six participants completed a range of intelligence tests and received positive feedback on them, regardless of their actual performance.",
      "zh": "76名受试者完成了一系列智力测试，无论实际表现如何都收到了积极反馈。",
      "source": "2026.06 第2套"
    },
    "confusable": {
      "word": "diligence",
      "diff": "intelligence 智力智能；diligence 勤奋刻苦"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v059",
    "day": 3,
    "word": "robot",
    "phonetic": "/ˈroʊbɑːt/",
    "pos": "n.",
    "meaning": "机器人；机械呆板的人",
    "examFreq": 12,
    "roots": "源自捷克语 robota(苦役，劳作) -> 替人干苦活的机器 -> 机器人",
    "mnemonic": "2026年6月四级写作热点“校园机器人”，衍生词 robotics(机器人学)",
    "collocations": [
      {
        "en": "delivery robot",
        "zh": "配送机器人"
      },
      {
        "en": "industrial robot",
        "zh": "工业机器人"
      },
      {
        "en": "robotics and AI",
        "zh": "机器人技术与人工智能"
      }
    ],
    "realSentence": {
      "en": "When that is the case, the majority of workers find it less upsetting to see their own jobs go to robots than to other employees.",
      "zh": "在这种情况下，相比看到岗位被其他员工取代，大多数工人觉得被机器人替代更不那么令人难过。",
      "source": "2024.06 第3套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v060",
    "day": 3,
    "word": "network",
    "phonetic": "/ˈnetwɜːrk/",
    "pos": "n./v.",
    "meaning": "网络，网状系统；人脉关系网；[v.] 建立人脉",
    "examFreq": 18,
    "roots": "net(网) + work(交织物) -> 纵横交织的网 -> 网络/人脉网",
    "mnemonic": "别只记得“互联网”，职场阅读中 network 常考“人际关系网/社交圈”",
    "collocations": [
      {
        "en": "social network",
        "zh": "社交网络"
      },
      {
        "en": "neural network",
        "zh": "神经网络"
      },
      {
        "en": "expand one's network",
        "zh": "拓展人脉"
      }
    ],
    "realSentence": {
      "en": "The human brain has the ability to constantly form new networks and connections between brain cells.",
      "zh": "人类大脑有能力在脑细胞之间不断形成新的网络和连接。",
      "source": "2025.06 第3套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v061",
    "day": 3,
    "word": "platform",
    "phonetic": "/ˈplætfɔːrm/",
    "pos": "n.",
    "meaning": "平台（软件/网络）；火车站台；政治纲领",
    "examFreq": 7,
    "roots": "plat(平的，如 plate) + form(形状) -> 平整的高台 -> 站台/数字平台",
    "mnemonic": "一块平整(plat)的台面(form) -> 线下是火车站台，线上是网购/学习平台",
    "collocations": [
      {
        "en": "online platform",
        "zh": "在线平台"
      },
      {
        "en": "crowdfunding platform",
        "zh": "众筹平台"
      },
      {
        "en": "provide a platform for",
        "zh": "为……提供平台"
      }
    ],
    "realSentence": {
      "en": "For one, they use a crowdfunding platform that specializes in raising money for science, and not just any kind of project.",
      "zh": "首先，他们使用专门为科研项目而非普通项目筹款的众筹平台。",
      "source": "2019.12 第1套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v062",
    "day": 3,
    "word": "virtual",
    "phonetic": "/ˈvɜːrtʃuəl/",
    "pos": "adj.",
    "meaning": "虚拟的，模拟的；[熟词僻义] 实质上的，几乎的",
    "examFreq": 9,
    "roots": "virtu(力量/效力) + -al -> 具有实际效力但无实体 -> 虚拟的/实质上的",
    "mnemonic": "VR = Virtual Reality(虚拟现实)；副词 virtually = almost(几乎/实质上)",
    "collocations": [
      {
        "en": "virtual reality",
        "zh": "虚拟现实"
      },
      {
        "en": "virtual assistant",
        "zh": "虚拟助手"
      },
      {
        "en": "virtual classroom",
        "zh": "虚拟课堂"
      }
    ],
    "realSentence": {
      "en": "Participants were then placed in a virtual reality setting where they could look into a mirror and see their aged selves looking back at them.",
      "zh": "随后受试者被置于虚拟现实环境中，照镜子时能看到年老后的自己正回望着他们。",
      "source": "2024.06 第2套"
    },
    "confusable": {
      "word": "visual / virtue",
      "diff": "virtual 虚拟的/实质上的；visual 视觉的；virtue 美德"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v063",
    "day": 3,
    "word": "software",
    "phonetic": "/ˈsɔːftwer/",
    "pos": "n.",
    "meaning": "软件（不可数名词）",
    "examFreq": 7,
    "roots": "soft(软的) + ware(器皿，商品) -> 摸不着的程序商品 -> 软件",
    "mnemonic": "对照记忆：software(软件) vs hardware(硬件)，两者皆不可数，不可加 s",
    "collocations": [
      {
        "en": "software and hardware",
        "zh": "软件与硬件"
      },
      {
        "en": "software engineer",
        "zh": "软件工程师"
      },
      {
        "en": "update software",
        "zh": "更新软件"
      }
    ],
    "realSentence": {
      "en": "The issue is that, unlike using a smartphone app, operating a car has serious safety risks, whether the driver is human or software.",
      "zh": "问题在于，与使用手机应用不同，无论是人类还是软件驾驶汽车，都存在严重的安全风险。",
      "source": "2024.12 第3套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v064",
    "day": 3,
    "word": "data",
    "phonetic": "/ˈdeɪtə/",
    "pos": "n.",
    "meaning": "数据，资料（datum 的复数，现代英语单复数动词皆常见）",
    "examFreq": 34,
    "roots": "拉丁语 datum(被给予的已知量) -> 实验收集到的已知事实 -> 数据",
    "mnemonic": "hard data(确凿数据)、big data(大数据)，阅读论证段的高频证据标志词",
    "collocations": [
      {
        "en": "hard data",
        "zh": "确凿的数据"
      },
      {
        "en": "analyze data",
        "zh": "分析数据"
      },
      {
        "en": "data privacy",
        "zh": "数据隐私"
      }
    ],
    "realSentence": {
      "en": "And Game Academy reckons its belief is backed up by hard data.",
      "zh": "而“游戏学院”认为自己的观点有确凿的数据作为支撑。",
      "source": "2025.12 第2套"
    },
    "confusable": {
      "word": "date",
      "diff": "data 数据资料；date 日期/约会"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v065",
    "day": 3,
    "word": "mechanism",
    "phonetic": "/ˈmekənɪzəm/",
    "pos": "n.",
    "meaning": "机制，机理；机械装置",
    "examFreq": 11,
    "roots": "mechan(机械，如 machine) + -ism(系统/原理) -> 内部运作的原理 -> 机制",
    "mnemonic": "machine(机器)的同源词：机器内部齿轮怎么咬合，就是运作“机制”",
    "collocations": [
      {
        "en": "safety mechanism",
        "zh": "安全机制"
      },
      {
        "en": "warning mechanism",
        "zh": "预警机制"
      },
      {
        "en": "coping mechanism",
        "zh": "应对机制"
      }
    ],
    "realSentence": {
      "en": "Normal forgetting may even be a safety mechanism to ensure our brain doesn't become too full.",
      "zh": "正常的遗忘甚至可能是一种安全机制，用以保证我们的大脑不会负荷过重。",
      "source": "2017.06 第3套"
    },
    "confusable": {
      "word": "mechanic / mechanical",
      "diff": "mechanism 机制/装置；mechanic 机修工；mechanical 机械的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v066",
    "day": 3,
    "word": "engineering",
    "phonetic": "/ˌendʒɪˈnɪrɪŋ/",
    "pos": "n.",
    "meaning": "工程学，工程技术",
    "examFreq": 20,
    "roots": "engine(引擎，巧思) + -eer(从业者) + -ing(学科) -> 工程学",
    "mnemonic": "STEM 四大支柱之一：Science, Technology, Engineering, Mathematics",
    "collocations": [
      {
        "en": "major in engineering",
        "zh": "主修工程学"
      },
      {
        "en": "genetic engineering",
        "zh": "基因工程"
      },
      {
        "en": "civil engineering",
        "zh": "土木工程"
      }
    ],
    "realSentence": {
      "en": "Today, only 21% of engineering majors are women, a number largely unchanged since 2000.",
      "zh": "如今工程专业学生中女性仅占21%，这一比例自2000年以来基本未变。",
      "source": "2024.12 第1套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v067",
    "day": 3,
    "word": "application",
    "phonetic": "/ˌæplɪˈkeɪʃn/",
    "pos": "n.",
    "meaning": "应用，运用；应用程序（app 全称）；申请书",
    "examFreq": 16,
    "roots": "apply(应用/申请) 的名词形式：applic + -ation",
    "mnemonic": "手机上的 App 就是 application 的缩写；兼顾“申请表”与“技术应用”两义",
    "collocations": [
      {
        "en": "commercial application",
        "zh": "商业应用"
      },
      {
        "en": "submit an application",
        "zh": "提交申请"
      },
      {
        "en": "practical application",
        "zh": "实际应用"
      }
    ],
    "realSentence": {
      "en": "Lawmakers in Michigan clearly want to make the state ready for the commercial application of self-driving technology.",
      "zh": "密歇根州的立法者显然希望让该州为自动驾驶技术的商业化应用做好准备。",
      "source": "2019.06 第1套"
    },
    "confusable": {
      "word": "applicant / appliance",
      "diff": "application 应用/申请；applicant 申请人；appliance 家用电器"
    },
    "tag": "译写必备"
  },
  {
    "id": "v068",
    "day": 3,
    "word": "function",
    "phonetic": "/ˈfʌŋkʃn/",
    "pos": "n./v.",
    "meaning": "功能，作用，机能；[v.] 正常运转，起作用",
    "examFreq": 24,
    "roots": "funct(执行，运作) + -ion -> 执行职责的能力 -> 功能/运转",
    "mnemonic": "脑机能(brain function)、实用功能(practical function)；作动词=work 运转",
    "collocations": [
      {
        "en": "practical function",
        "zh": "实用功能"
      },
      {
        "en": "function properly",
        "zh": "正常运转"
      },
      {
        "en": "social functioning",
        "zh": "社会功能/社交能力"
      }
    ],
    "realSentence": {
      "en": "Research about aging adults who take on new enterprises shows improved function and memory as well as a reduced risk of mental disease.",
      "zh": "关于尝试新事物的老年人的研究表明，他们的大脑机能和记忆力均有所改善，患精神疾病的风险也降低了。",
      "source": "2024.06 第1套"
    },
    "confusable": {
      "word": "malfunction / friction",
      "diff": "function 功能/运转；malfunction 故障失灵；friction 摩擦矛盾"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v069",
    "day": 3,
    "word": "generate",
    "phonetic": "/ˈdʒenəreɪt/",
    "pos": "v.",
    "meaning": "产生，生成，引起；发电",
    "examFreq": 10,
    "roots": "gener(出生，产生，如 gene) + -ate(动词后缀) -> 生出来 -> 产生/发电",
    "mnemonic": "同源词家族：gene(基因)->generation(一代)->generate(产生/发电)，写作替换 produce！",
    "collocations": [
      {
        "en": "generate electricity",
        "zh": "发电"
      },
      {
        "en": "generate revenue",
        "zh": "创造收益"
      },
      {
        "en": "generate interest",
        "zh": "引起兴趣"
      }
    ],
    "realSentence": {
      "en": "They believe that constant motion somehow generates leadership as a byproduct.",
      "zh": "他们认为持续不停的忙碌不知怎的就会顺带催生出领导力。",
      "source": "2014.06 第1套"
    },
    "confusable": {
      "word": "generous",
      "diff": "generate(v.) 产生/发电；generous(adj.) 慷慨大方的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v070",
    "day": 3,
    "word": "monitor",
    "phonetic": "/ˈmɑːnɪtər/",
    "pos": "v./n.",
    "meaning": "监测，监控，跟踪检查；[n.] 显示器，班长",
    "examFreq": 9,
    "roots": "mon(警告，提醒) + -itor(人/器) -> 时刻盯着并发出提醒 -> 监测/班长",
    "mnemonic": "在教室盯着纪律的是“班长”，在实验室盯着脑电波和数据的是“监测”",
    "collocations": [
      {
        "en": "closely monitor",
        "zh": "密切监测"
      },
      {
        "en": "monitor pollution",
        "zh": "监测污染"
      },
      {
        "en": "health monitor",
        "zh": "健康监测仪"
      }
    ],
    "realSentence": {
      "en": "The participants each slept in the department for two nights and were carefully monitored with techniques that looked at the activity of their brains.",
      "zh": "每位受试者都在该系睡了两晚，并通过观察大脑活动的技术接受严密监测。",
      "source": "2017.12 第1套"
    },
    "confusable": {
      "word": "mentor / minor",
      "diff": "monitor 监测/班长；mentor 导师；minor 较小的/未成年人"
    },
    "tag": "选词常考"
  },
  {
    "id": "v071",
    "day": 3,
    "word": "transform",
    "phonetic": "/trænsˈfɔːrm/",
    "pos": "v.",
    "meaning": "彻底改变，使改观；转化（transform A into B）",
    "examFreq": 10,
    "roots": "trans-(跨越，转变) + form(形态) -> 跨成另一种形态 -> 彻底改变/转化",
    "mnemonic": "《变形金刚》Transformers 就是由它来的！记住固定搭配 transform...into...",
    "collocations": [
      {
        "en": "transform... into...",
        "zh": "把……转化为……"
      },
      {
        "en": "digital transformation",
        "zh": "数字化转型"
      },
      {
        "en": "transform daily life",
        "zh": "彻底改变日常生活"
      }
    ],
    "realSentence": {
      "en": "Even if you haven't mastered a skill, grit tells you that you can still succeed if you can transform your passion into action.",
      "zh": "即使你尚未精通某项技能，坚毅品格会告诉你，只要把热情转化为行动，依然能走向成功。",
      "source": "2025.06 第1套"
    },
    "confusable": {
      "word": "transfer / transmit",
      "diff": "transform 彻底改变形态；transfer 转移/转学/转账；transmit 传输信号/传播疾病"
    },
    "tag": "同义替换"
  },
  {
    "id": "v072",
    "day": 3,
    "word": "efficient",
    "phonetic": "/ɪˈfɪʃnt/",
    "pos": "adj.",
    "meaning": "效率高的，高效的，节能的（强调省时省力低耗）",
    "examFreq": 12,
    "roots": "ef-(出) + fic(做) + -ient -> 做事产出快且不浪费 -> 高效的",
    "mnemonic": "和 effective 是四级头号易混词：efficient 盯“效率省力”，effective 盯“效果达标”",
    "collocations": [
      {
        "en": "energy-efficient",
        "zh": "节能高效的"
      },
      {
        "en": "time-efficient",
        "zh": "省时高效的"
      },
      {
        "en": "in an efficient way",
        "zh": "以高效的方式"
      }
    ],
    "realSentence": {
      "en": "For example, consumers could use appliances in a more efficient way by adjusting the time of cooking to the type of food.",
      "zh": "例如，消费者可以通过根据食物种类调整烹饪时间，以更高效的方式使用电器。",
      "source": "2019.12 第3套"
    },
    "confusable": {
      "word": "effective / sufficient",
      "diff": "efficient 效率高的/节能的；effective 有效果的；sufficient 充足的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v073",
    "day": 3,
    "word": "advanced",
    "phonetic": "/ədˈvænst/",
    "pos": "adj.",
    "meaning": "先进的，高级的，前沿的；[熟词僻义] 晚期的，年迈的",
    "examFreq": 10,
    "roots": "advance(前进) + -ed -> 走在最前面 -> 先进的/高级的",
    "mnemonic": "走在时代前沿的就是 advanced，注意短语 in advance(提前)",
    "collocations": [
      {
        "en": "advanced technology",
        "zh": "先进技术"
      },
      {
        "en": "advanced level",
        "zh": "高级水平"
      },
      {
        "en": "in advance",
        "zh": "提前，预先"
      }
    ],
    "realSentence": {
      "en": "The virtual assistant became so advanced and realistic that the students didn't know she was a computer.",
      "zh": "这名虚拟助手变得如此先进和逼真，以至于学生们根本不知道她是一台计算机。",
      "source": "2019.12 第1套"
    },
    "confusable": {
      "word": "advantage",
      "diff": "advanced(adj.) 先进的；advantage(n.) 优势"
    },
    "tag": "译写必备"
  },
  {
    "id": "v074",
    "day": 3,
    "word": "access",
    "phonetic": "/ˈækses/",
    "pos": "n./v.",
    "meaning": "使用权，获取途径，通道（access to）；[v.] 访问，存取",
    "examFreq": 45,
    "roots": "ac-(朝向) + cess(走) -> 走进去的路 -> 通道/获取机会",
    "mnemonic": "超级高频搭配 have access to（记住 to 是介词！）；切勿和 assess(评估)混！",
    "collocations": [
      {
        "en": "have access to",
        "zh": "有机会使用/接触到"
      },
      {
        "en": "internet access",
        "zh": "互联网接入"
      },
      {
        "en": "easy access to",
        "zh": "便捷地获取/到达"
      }
    ],
    "realSentence": {
      "en": "They fear that students without internet access at home will be disadvantaged by the policy, and superintendent Tom Roth is concerned that e-learning days will offer a lower quality of education.",
      "zh": "他们担心家中无法上网的学生会因该政策处于不利地位，学区总监汤姆·罗斯也担忧线上学习日会降低教学质量。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "assess / excess",
      "diff": "access(cc像两条通道) 获取/通道；assess 评估；excess 过度超额"
    },
    "tag": "译写必备"
  },
  {
    "id": "v075",
    "day": 3,
    "word": "security",
    "phonetic": "/sɪˈkjʊrəti/",
    "pos": "n.",
    "meaning": "安全，保障，安保；[熟词僻义 pl.] 证券，抵押品",
    "examFreq": 27,
    "roots": "se-(脱离) + cur(担心，care) + -ity -> 脱离担忧的状态 -> 安全感/保障",
    "mnemonic": "没有(se)忧虑(cur) -> 安全保障！高频搭配 cyber security / social security",
    "collocations": [
      {
        "en": "cyber security",
        "zh": "网络安全"
      },
      {
        "en": "job security",
        "zh": "工作稳定性"
      },
      {
        "en": "security camera",
        "zh": "监控摄像头"
      }
    ],
    "realSentence": {
      "en": "They want jobs that provide security and flexibility, and they place relatively little importance on high pay.",
      "zh": "他们想要兼具保障性与灵活性的工作，而对高薪的重视程度相对较低。",
      "source": "2018.06 第3套"
    },
    "confusable": {
      "word": "safety",
      "diff": "security 侧重免受威胁/失窃/失业的保障安全；safety 侧重免受人身事故伤害"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v076",
    "day": 3,
    "word": "upgrade",
    "phonetic": "/ˌʌpˈɡreɪd/",
    "pos": "v./n.",
    "meaning": "升级，更新换代；提升（等级/服务）",
    "examFreq": 6,
    "roots": "up-(向上) + grade(等级，台阶) -> 迈上更高一个等级 -> 升级",
    "mnemonic": "向上(up)升一档(grade) -> 软硬件升级、消费升级、机票升舱都用它！",
    "collocations": [
      {
        "en": "system upgrade",
        "zh": "系统升级"
      },
      {
        "en": "upgrade infrastructure",
        "zh": "升级基础设施"
      },
      {
        "en": "upgrade skills",
        "zh": "提升技能"
      }
    ],
    "realSentence": {
      "en": "Without upgrades and new capacity, bridges, roads and power systems are unable to cope with expanding populations.",
      "zh": "如果不进行升级和扩容，桥梁、道路和电力系统将无法应对不断增长的人口。",
      "source": "2017.12 第2套"
    },
    "confusable": {
      "word": "update / degrade",
      "diff": "upgrade 升级提档；update 更新信息版本；degrade 降级/恶化"
    },
    "tag": "选词常考"
  },
  {
    "id": "v077",
    "day": 3,
    "word": "automatic",
    "phonetic": "/ˌɔːtəˈmætɪk/",
    "pos": "adj.",
    "meaning": "自动的，机械的；[熟词僻义] 不假思索的，必然的",
    "examFreq": 6,
    "roots": "auto-(自己，自动) + mat(动) + -ic -> 自己会动的 -> 自动的",
    "mnemonic": "auto=自动（如 autopilot），引申为“顺理成章、必然伴随的”",
    "collocations": [
      {
        "en": "automatic system",
        "zh": "自动化系统"
      },
      {
        "en": "automatic response",
        "zh": "下意识的反应"
      },
      {
        "en": "automatically adjust",
        "zh": "自动调节"
      }
    ],
    "realSentence": {
      "en": "Good teaching and research are not exclusive, but they are also not automatic companions.",
      "zh": "优秀的教学与科研并不排斥，但也并非必然相伴而生。",
      "source": "2016.12 第3套"
    },
    "confusable": {
      "word": "autonomous",
      "diff": "automatic 自动机械的；autonomous 自主自治的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v078",
    "day": 3,
    "word": "manufacture",
    "phonetic": "/ˌmænjuˈfæktʃər/",
    "pos": "v./n.",
    "meaning": "（大规模）制造，生产；制造业；[熟词僻义] 编造",
    "examFreq": 10,
    "roots": "manu-(手，如 manual) + fact(做) + -ure -> 原指手工制作，现指工厂批量制造",
    "mnemonic": "manu(手)+fact(做) -> 工业化大规模生产；manufacturer 制造商",
    "collocations": [
      {
        "en": "manufacturing industry",
        "zh": "制造业"
      },
      {
        "en": "car manufacturer",
        "zh": "汽车制造商"
      },
      {
        "en": "mass manufacture",
        "zh": "批量制造"
      }
    ],
    "realSentence": {
      "en": "A program manager in manufacturing stated that engineering is the best degree.",
      "zh": "一位制造业项目经理表示，工程学是最有价值的学位。",
      "source": "2024.12 第1套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v079",
    "day": 4,
    "word": "academic",
    "phonetic": "/ˌækəˈdemɪk/",
    "pos": "adj./n.",
    "meaning": "学术的，学业的，院校的；[n.] 大学学者，教授",
    "examFreq": 27,
    "roots": "academy(学院，柏拉图学园) + -ic -> 学院里的 -> 学术的/学业的",
    "mnemonic": "记两个高频搭配：academic performance(学业成绩)、academic year(学年)",
    "collocations": [
      {
        "en": "academic performance",
        "zh": "学业表现"
      },
      {
        "en": "academic year",
        "zh": "学年"
      },
      {
        "en": "academic research",
        "zh": "学术研究"
      }
    ],
    "realSentence": {
      "en": "This academic year, many school boards have introduced policies which require students to work from home if the school is shut by snow or extreme weather.",
      "zh": "本学年，许多学区委员会出台了新政策，要求在学校因降雪或极端天气停课时学生居家学习。",
      "source": "2024.06 第3套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v080",
    "day": 4,
    "word": "campus",
    "phonetic": "/ˈkæmpəs/",
    "pos": "n.",
    "meaning": "大学校园，校区",
    "examFreq": 13,
    "roots": "拉丁语 campus(平地，旷野) -> 大学所在的开阔园区 -> 校园",
    "mnemonic": "2024–2026四级作文最高频场景词：on campus(在校园内)、campus life(校园生活)",
    "collocations": [
      {
        "en": "on campus",
        "zh": "在校园内"
      },
      {
        "en": "campus life",
        "zh": "校园生活"
      },
      {
        "en": "campus facilities",
        "zh": "校园设施"
      }
    ],
    "realSentence": {
      "en": "I guess living on campus, I'll have a chance to have a close circle of friends, since we'll be living together.",
      "zh": "我想住在校内的话，因为大家住在一起，我就有机会结交一个亲密的朋友圈。",
      "source": "2018.06 第1套听力"
    },
    "confusable": {
      "word": "campaign",
      "diff": "campus 大学校园；campaign 竞选/社会宣传运动"
    },
    "tag": "译写必备"
  },
  {
    "id": "v081",
    "day": 4,
    "word": "curriculum",
    "phonetic": "/kəˈrɪkjələm/",
    "pos": "n.",
    "meaning": "（学校设置的）全部课程，课程体系",
    "examFreq": 12,
    "roots": "curr(跑，进程) + -iculum -> 学生按学年跑完的路线 -> 全部课程",
    "mnemonic": "词根 curr=跑(current)，按学期一路跑下来的全套课表 -> 课程体系（复数 curricula）",
    "collocations": [
      {
        "en": "school curriculum",
        "zh": "学校课程体系"
      },
      {
        "en": "extracurricular activities",
        "zh": "课外活动"
      },
      {
        "en": "design a curriculum",
        "zh": "设计课程"
      }
    ],
    "realSentence": {
      "en": "The teachers must be free to teach in their own way—the curriculum should be flexible enough so that they can use their individual talents to achieve the goals of the course.",
      "zh": "教师必须有权按自己的方式授课——课程设置应足够灵活，以便他们发挥各自才华实现课程目标。",
      "source": "2016.12 第3套"
    },
    "confusable": {
      "word": "course",
      "diff": "curriculum 指整套课程体系；course 指单门课程"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v082",
    "day": 4,
    "word": "discipline",
    "phonetic": "/ˈdɪsəplɪn/",
    "pos": "n./v.",
    "meaning": "自律，纪律；[熟词僻义] 学科，专业领域；[v.] 管教，处罚",
    "examFreq": 11,
    "roots": "discip-(学习，门徒 disciple) + -line -> 门徒修习的学问与规矩 -> 学科/自律",
    "mnemonic": "一词两面必考：在大学语境下多指“学科”(interdisciplinary 跨学科)，个人成长指“自律”",
    "collocations": [
      {
        "en": "self-discipline",
        "zh": "自律"
      },
      {
        "en": "academic discipline",
        "zh": "学术学科"
      },
      {
        "en": "maintain discipline",
        "zh": "维持纪律"
      }
    ],
    "realSentence": {
      "en": "People with a great amount of willpower have the discipline to develop positive, successful habits.",
      "zh": "意志力强大的人拥有自律能力，能够养成积极、成功的习惯。",
      "source": "2024.06 第2套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v083",
    "day": 4,
    "word": "assignment",
    "phonetic": "/əˈsaɪnmənt/",
    "pos": "n.",
    "meaning": "（课外）作业；指派的任务，分配",
    "examFreq": 20,
    "roots": "as-(向) + sign(标记，签派) + -ment -> 签派到你名下的活儿 -> 作业/任务",
    "mnemonic": "大学里“交作业”不用 homework，地道表达是 hand in / submit an assignment！",
    "collocations": [
      {
        "en": "complete an assignment",
        "zh": "完成作业/任务"
      },
      {
        "en": "reading assignment",
        "zh": "阅读作业"
      },
      {
        "en": "assign tasks",
        "zh": "分配任务"
      }
    ],
    "realSentence": {
      "en": "A pilot programme in a school district in Anderson County, South Carolina, has supplied students with electronic tablets loaded with assignments to complete in the event of a school closure.",
      "zh": "南卡罗来纳州安德森县一学区的试点项目为学生配备了装有作业的电子平板，以便停课时完成学习任务。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "assessment",
      "diff": "assignment 作业/分配任务；assessment 评估评定"
    },
    "tag": "听力高频"
  },
  {
    "id": "v084",
    "day": 4,
    "word": "graduation",
    "phonetic": "/ˌɡrædʒuˈeɪʃn/",
    "pos": "n.",
    "meaning": "毕业，毕业典礼",
    "examFreq": 5,
    "roots": "grad(台阶/等级) + -u + -ation -> 修满学分跨过最后一级台阶 -> 毕业",
    "mnemonic": "动词 graduate(毕业) + from + 学校；名词 undergraduate(本科生) vs graduate(研究生)",
    "collocations": [
      {
        "en": "graduation requirements",
        "zh": "毕业要求"
      },
      {
        "en": "after graduation",
        "zh": "毕业之后"
      },
      {
        "en": "graduation ceremony",
        "zh": "毕业典礼"
      }
    ],
    "realSentence": {
      "en": "Since graduation requirements vary among divisions of the university, you should consult the Bulletin of Information.",
      "zh": "由于大学各院系的毕业要求各不相同，你应当查阅《信息手册》。",
      "source": "2016.06 第2套听力"
    },
    "confusable": null,
    "tag": "听力高频"
  },
  {
    "id": "v085",
    "day": 4,
    "word": "qualification",
    "phonetic": "/ˌkwɑːlɪfɪˈkeɪʃn/",
    "pos": "n.",
    "meaning": "资格，学历，资质证书；[熟词僻义] 限定条件",
    "examFreq": 4,
    "roots": "qual(性质/质量 quality) + -ific(使成为) + -ation -> 证明质量达标的凭证 -> 资格",
    "mnemonic": "quality(品质)达标了才算 qualified(合格的)，拿到手的证书就是 qualification",
    "collocations": [
      {
        "en": "academic qualifications",
        "zh": "学历资格"
      },
      {
        "en": "industry qualification",
        "zh": "行业资质"
      },
      {
        "en": "be qualified for",
        "zh": "胜任，具备……资格"
      }
    ],
    "realSentence": {
      "en": "And, yes, managers are most likely to be impressed by industry qualifications you get in school.",
      "zh": "而且没错，招聘经理最看重的很可能是你在校期间取得的行业资质证书。",
      "source": "2025.12 第3套"
    },
    "confusable": {
      "word": "quality / quantity",
      "diff": "qualification 资格证书；quality 质量；quantity 数量"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v086",
    "day": 4,
    "word": "faculty",
    "phonetic": "/ˈfæklti/",
    "pos": "n.",
    "meaning": "全体教员，大学系科；[熟词僻义] 官能，天赋能力",
    "examFreq": 6,
    "roots": "fac(做，能力) + -ulty -> 有能力授业解惑的人 -> 全体教员/天赋官能",
    "mnemonic": "死磕易混：facility(i像仪器)是“设施”，faculty(u像university大学)是“大学教员/院系”！",
    "collocations": [
      {
        "en": "faculty members",
        "zh": "全体教职人员"
      },
      {
        "en": "faculty adviser",
        "zh": "学业导师"
      },
      {
        "en": "mental faculties",
        "zh": "心智官能"
      }
    ],
    "realSentence": {
      "en": "Recently I attended several meetings where we talked about ways to retain students and keep younger faculty members from going elsewhere.",
      "zh": "最近我参加了几场会议，讨论如何留住学生以及防止年轻教员流失到别处。",
      "source": "2016.12 第3套"
    },
    "confusable": {
      "word": "facility",
      "diff": "faculty 教员/院系/官能；facility 设施设备"
    },
    "tag": "听力高频"
  },
  {
    "id": "v087",
    "day": 4,
    "word": "participant",
    "phonetic": "/pɑːrˈtɪsɪpənt/",
    "pos": "n.",
    "meaning": "参与者，实验受试者",
    "examFreq": 46,
    "roots": "parti-(部分 part) + cip(拿取) + -ant(人) -> 取一份参与其中的人 -> 参与者",
    "mnemonic": "科普阅读最高频人物词之一：实验里的志愿者/受试者几乎都叫 participants",
    "collocations": [
      {
        "en": "study participants",
        "zh": "研究受试者"
      },
      {
        "en": "active participant",
        "zh": "积极参与者"
      },
      {
        "en": "participate in",
        "zh": "参加，参与"
      }
    ],
    "realSentence": {
      "en": "Surprisingly, participants made the wrong call in one-in-five cases.",
      "zh": "令人惊讶的是，受试者在五分之一的情况下作出了错误判断。",
      "source": "2024.12 第3套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v088",
    "day": 4,
    "word": "experiment",
    "phonetic": "/ɪkˈsperɪmənt/",
    "pos": "n./v.",
    "meaning": "实验，试验；尝试（experiment with）",
    "examFreq": 30,
    "roots": "ex-(出) + peri(尝试，如 experience) + -ment -> 亲手试出结果 -> 实验",
    "mnemonic": "和 experience(经验)同词根 peri(尝试)！固定搭配 conduct/carry out an experiment",
    "collocations": [
      {
        "en": "conduct an experiment",
        "zh": "开展实验"
      },
      {
        "en": "field experiment",
        "zh": "实地实验"
      },
      {
        "en": "experiment with",
        "zh": "用……做试验/尝试"
      }
    ],
    "realSentence": {
      "en": "Now educators are experimenting with ways to apply this model to academic subjects.",
      "zh": "如今教育工作者正尝试将这一模式应用于学术学科的方法。",
      "source": "2018.06 第3套"
    },
    "confusable": {
      "word": "experience / expert",
      "diff": "experiment 实验；experience 经验经历；expert 专家"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v089",
    "day": 4,
    "word": "cognitive",
    "phonetic": "/ˈkɑːɡnətɪv/",
    "pos": "adj.",
    "meaning": "认知的，认识能力的",
    "examFreq": 12,
    "roots": "co-(共同) + gn(知道，如 recognize) + -itive -> 与大脑认识理解相关的 -> 认知的",
    "mnemonic": "抓核心词根 gn=知道(know)：cognitive health(认知健康)、cognitive ability(认知能力)",
    "collocations": [
      {
        "en": "cognitive health",
        "zh": "认知健康"
      },
      {
        "en": "cognitive ability",
        "zh": "认知能力"
      },
      {
        "en": "cognitive decline",
        "zh": "认知衰退"
      }
    ],
    "realSentence": {
      "en": "The researchers speculate that craft activities promote the development of nerve pathways in the brain that help to maintain cognitive health.",
      "zh": "研究人员推测，手工艺活动能促进大脑神经通路的发育，从而有助于维持认知健康。",
      "source": "2017.12 第2套"
    },
    "confusable": {
      "word": "recognize",
      "diff": "同源词根 gn(知)：cognitive 认知的；recognize 认出/承认"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v090",
    "day": 4,
    "word": "acquire",
    "phonetic": "/əˈkwaɪər/",
    "pos": "v.",
    "meaning": "（经努力）获得，习得；收购（企业）",
    "examFreq": 14,
    "roots": "ac-(朝向) + quire(寻求，如 require) -> 去求索并拿到手 -> 获得/习得",
    "mnemonic": "词根 quire=寻求：a(去)求得=acquire(获得)；in(向内)问=inquire(询问)；re(反复)要=require(要求)",
    "collocations": [
      {
        "en": "acquire knowledge",
        "zh": "获取知识"
      },
      {
        "en": "acquire new skills",
        "zh": "习得新技能"
      },
      {
        "en": "language acquisition",
        "zh": "语言习得"
      }
    ],
    "realSentence": {
      "en": "Decades of research have shown that in order to acquire skills and real knowledge in school, kids need to want to learn.",
      "zh": "数十年的研究表明，为了在学校习得技能和真正的知识，孩子们需要有学习的意愿。",
      "source": "2015.12 第1套"
    },
    "confusable": {
      "word": "inquire / require",
      "diff": "acquire 习得/获得；inquire 询问调查；require 需要要求"
    },
    "tag": "译写必备"
  },
  {
    "id": "v091",
    "day": 4,
    "word": "master",
    "phonetic": "/ˈmæstər/",
    "pos": "v./n.",
    "meaning": "掌握，精通；[n.] 大师，硕士学位（Master's degree）",
    "examFreq": 11,
    "roots": "源自拉丁语 magister(首领，导师) -> 像大师一样驾驭 -> 精通/掌握",
    "mnemonic": "四级高频动词义=精通掌握（master a skill/language），写作替换 learn well",
    "collocations": [
      {
        "en": "master a skill",
        "zh": "掌握一项技能"
      },
      {
        "en": "master's degree",
        "zh": "硕士学位"
      },
      {
        "en": "master the art of",
        "zh": "精通……的艺术"
      }
    ],
    "realSentence": {
      "en": "The art of self-control is one that most successful individuals have mastered.",
      "zh": "自我控制的艺术是大多数成功人士都已精通的本领。",
      "source": "2024.06 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v092",
    "day": 4,
    "word": "pursue",
    "phonetic": "/pərˈsuː/",
    "pos": "v.",
    "meaning": "追求，致力于；从事（学业/职业）；追赶",
    "examFreq": 14,
    "roots": "pur-(向前) + sue(跟随) -> 一直紧跟向前追 -> 追求/从事",
    "mnemonic": "一路紧跟(sue)不放 -> 追求理想；名词 pursuit（in pursuit of 追求）",
    "collocations": [
      {
        "en": "pursue one's goal",
        "zh": "追求目标"
      },
      {
        "en": "pursue higher education",
        "zh": "攻读高等教育"
      },
      {
        "en": "pursue a career in",
        "zh": "从事……领域的职业"
      }
    ],
    "realSentence": {
      "en": "We asked these individuals how enjoyable it was to pursue their goal, as well as how important their goal was.",
      "zh": "我们询问了这些人追求目标的过程有多愉快，以及该目标对他们有多重要。",
      "source": "2024.06 第2套"
    },
    "confusable": {
      "word": "persuade",
      "diff": "pursue 追求/从事；persuade 劝说/说服"
    },
    "tag": "译写必备"
  },
  {
    "id": "v093",
    "day": 4,
    "word": "strive",
    "phonetic": "/straɪv/",
    "pos": "v.",
    "meaning": "努力，奋斗，力争（strive for / strive to do）",
    "examFreq": 9,
    "roots": "古法语 estriver(抗争，拼搏) -> 咬牙拼搏 -> 努力奋斗",
    "mnemonic": "四级作文替换 try hard 的王牌动词：strive for excellence(追求卓越)",
    "collocations": [
      {
        "en": "strive for excellence",
        "zh": "力求卓越"
      },
      {
        "en": "strive to achieve",
        "zh": "努力实现"
      },
      {
        "en": "strive for promotion",
        "zh": "争取晋升"
      }
    ],
    "realSentence": {
      "en": "Why do some students give up when they encounter difficulty, whereas others who are no more skilled continue to strive and learn?",
      "zh": "为什么有些学生遇到困难就放弃，而另一些能力并不更强的学生却能继续拼搏学习？",
      "source": "2016.12 第2套"
    },
    "confusable": {
      "word": "thrive / strike",
      "diff": "strive 努力奋斗；thrive 繁荣茁壮成长；strike 打击/罢工"
    },
    "tag": "译写必备"
  },
  {
    "id": "v094",
    "day": 4,
    "word": "cultivate",
    "phonetic": "/ˈkʌltɪveɪt/",
    "pos": "v.",
    "meaning": "培养（习惯/兴趣/人才）；陶冶；耕作，栽培",
    "examFreq": 16,
    "roots": "cult(耕种，培育，如 culture) + -ivate -> 像种庄稼一样细心浇灌 -> 培养/耕作",
    "mnemonic": "作文最高频提分动词之一！培养好习惯/创新能力都用 cultivate，甩开 develop 几条街",
    "collocations": [
      {
        "en": "cultivate good habits",
        "zh": "培养好习惯"
      },
      {
        "en": "cultivate curiosity",
        "zh": "培养好奇心"
      },
      {
        "en": "cultivate talent",
        "zh": "培养人才"
      }
    ],
    "realSentence": {
      "en": "In April 1649, locals responded to high prices and food shortages by cultivating vegetables on common land in Southern England.",
      "zh": "1649年4月，当地人通过在英格兰南部的公共土地上种植蔬菜来应对高物价和食物短缺。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "culture / agriculture",
      "diff": "同源词根 cult(耕耘)：cultivate 培养/耕作；culture 文化；agriculture 农业"
    },
    "tag": "译写必备"
  },
  {
    "id": "v095",
    "day": 4,
    "word": "motivate",
    "phonetic": "/ˈmoʊtɪveɪt/",
    "pos": "v.",
    "meaning": "激励，激发，促使；成为……的动机",
    "examFreq": 21,
    "roots": "mot(移动，推动) + -ivate -> 从内心推人向前动 -> 激励",
    "mnemonic": "词根 mot=动(motion)：激发内驱力让人动起来 -> motivate sb. to do",
    "collocations": [
      {
        "en": "motivate students to learn",
        "zh": "激励学生学习"
      },
      {
        "en": "highly motivated",
        "zh": "积极性极高的"
      },
      {
        "en": "strong motivation",
        "zh": "强烈的动机"
      }
    ],
    "realSentence": {
      "en": "Effective use of persuasion skills will not only help get your coworkers excited about your ideas, it'll also help you motivate them to achieve a common goal.",
      "zh": "有效运用说服技巧不仅能让同事对你的想法充满热情，还能激励他们共同实现目标。",
      "source": "2024.06 第3套"
    },
    "confusable": null,
    "tag": "选词常考"
  },
  {
    "id": "v096",
    "day": 4,
    "word": "potential",
    "phonetic": "/pəˈtenʃl/",
    "pos": "n./adj.",
    "meaning": "潜力，潜能；潜在的，可能的",
    "examFreq": 32,
    "roots": "pot(力量，能力) + -ential -> 藏在里面尚未释放的力量 -> 潜力/潜在的",
    "mnemonic": "pot(大锅/力量)里憋着还没爆发的能量 -> 潜力！搭配 achieve/unlock one's potential",
    "collocations": [
      {
        "en": "realize one's potential",
        "zh": "发挥潜能"
      },
      {
        "en": "potential risks",
        "zh": "潜在风险"
      },
      {
        "en": "have the potential to do",
        "zh": "有潜力做某事"
      }
    ],
    "realSentence": {
      "en": "Only through learning ceaselessly can we achieve our potential and live a better life in this rapidly developing society.",
      "zh": "唯有通过不断学习，我们才能发挥自身潜能，在这个飞速发展的社会中过上更好的生活。",
      "source": "2015.12 第2套"
    },
    "confusable": {
      "word": "potent",
      "diff": "potential 潜在的/潜力；potent 强有力的/有效的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v097",
    "day": 4,
    "word": "achievement",
    "phonetic": "/əˈtʃiːvmənt/",
    "pos": "n.",
    "meaning": "成就，成绩，功绩；完成，达到",
    "examFreq": 21,
    "roots": "achieve(完成，达到) + -ment(名词后缀) -> 达成后的成果 -> 成就",
    "mnemonic": "a sense of achievement(成就感)、academic achievement(学业成就)，写译高频词",
    "collocations": [
      {
        "en": "a sense of achievement",
        "zh": "成就感"
      },
      {
        "en": "academic achievement",
        "zh": "学业成绩"
      },
      {
        "en": "remarkable achievement",
        "zh": "非凡成就"
      }
    ],
    "realSentence": {
      "en": "One way is by telling stories about achievements that result from hard work.",
      "zh": "其中一种方法就是讲述源于刻苦努力而取得成就的故事。",
      "source": "2016.12 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v098",
    "day": 4,
    "word": "curiosity",
    "phonetic": "/ˌkjʊriˈɑːsəti/",
    "pos": "n.",
    "meaning": "好奇心，求知欲；珍品",
    "examFreq": 23,
    "roots": "cur(关心，留心) + -ious + -ity -> 对世界处处留心 -> 好奇心",
    "mnemonic": "形容词 curious(be curious about)，名词 curiosity(out of curiosity 出于好奇)",
    "collocations": [
      {
        "en": "out of curiosity",
        "zh": "出于好奇"
      },
      {
        "en": "arouse curiosity",
        "zh": "激发好奇心"
      },
      {
        "en": "intellectual curiosity",
        "zh": "求知欲"
      }
    ],
    "realSentence": {
      "en": "Openness — a characteristic defined by curiosity and a desire for knowledge — may also help folks pass brain tests.",
      "zh": "开放性——一种以好奇心和求知欲为特征的性格——或许还能帮助人们通过脑力测试。",
      "source": "2024.06 第1套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v099",
    "day": 4,
    "word": "talent",
    "phonetic": "/ˈtælənt/",
    "pos": "n.",
    "meaning": "天赋，才华；人才（常作集合/不可数名词）",
    "examFreq": 30,
    "roots": "希腊语 talanton(古天平/一笔贵重金银) -> 上天赐予的贵重资产 -> 天赋/人才",
    "mnemonic": "记两个用法：have a talent for(在……有天赋)；引申指高素质“人才”",
    "collocations": [
      {
        "en": "natural talent",
        "zh": "天生才能"
      },
      {
        "en": "have a talent for",
        "zh": "在……方面有天赋"
      },
      {
        "en": "attract top talent",
        "zh": "吸引顶尖人才"
      }
    ],
    "realSentence": {
      "en": "Even if you have natural talent it's nothing without grit.",
      "zh": "即使你拥有天生才华，没有坚毅品格也一事无成。",
      "source": "2025.06 第1套"
    },
    "confusable": {
      "word": "patent / latent",
      "diff": "talent 天赋人才；patent 专利；latent 潜在的/潜伏的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v100",
    "day": 4,
    "word": "excel",
    "phonetic": "/ɪkˈsel/",
    "pos": "v.",
    "meaning": "擅长（excel in/at）；胜过，超越，表现突出",
    "examFreq": 6,
    "roots": "ex-(超出) + cel(高出，突出) -> 高出众人一头 -> 擅长/表现卓越",
    "mnemonic": "excellent(优秀的) 的动词原形！记住双写 l 变化：excelled / excelling",
    "collocations": [
      {
        "en": "excel in academics",
        "zh": "在学业上出类拔萃"
      },
      {
        "en": "excel at communication",
        "zh": "擅长沟通"
      },
      {
        "en": "strive to excel",
        "zh": "力争上游"
      }
    ],
    "realSentence": {
      "en": "With those born with natural talents, it feels as if they excel without really trying.",
      "zh": "对于那些天生有才华的人来说，似乎不费吹灰之力就能脱颖而出。",
      "source": "2025.06 第1套"
    },
    "confusable": {
      "word": "exceed / expel",
      "diff": "excel 擅长/表现突出；exceed 超过(数量限度)；expel 开除/驱逐"
    },
    "tag": "选词常考"
  },
  {
    "id": "v101",
    "day": 4,
    "word": "concentrate",
    "phonetic": "/ˈkɑːnsntreɪt/",
    "pos": "v.",
    "meaning": "集中注意力，专心（concentrate on）；聚集，浓缩",
    "examFreq": 6,
    "roots": "con-(共同) + centr(中心 center) + -ate -> 把心思全聚到一个中心 -> 专心/浓缩",
    "mnemonic": "把所有念头收进同一个 center(中心) -> 集中注意力，同义替换 focus on",
    "collocations": [
      {
        "en": "concentrate on study",
        "zh": "专心学习"
      },
      {
        "en": "lose concentration",
        "zh": "注意力不集中"
      },
      {
        "en": "highly concentrated",
        "zh": "高度集中的"
      }
    ],
    "realSentence": {
      "en": "Concentrate on one specific task at a time.",
      "zh": "一次只专注于一项具体任务。",
      "source": "2014.06 第1套"
    },
    "confusable": {
      "word": "concrete",
      "diff": "concentrate(v.) 集中专心；concrete(adj./n.) 具体的/混凝土"
    },
    "tag": "同义替换"
  },
  {
    "id": "v102",
    "day": 4,
    "word": "scholar",
    "phonetic": "/ˈskɑːlər/",
    "pos": "n.",
    "meaning": "学者，学术权威；奖学金获得者",
    "examFreq": 4,
    "roots": "schol(学校 school/学术) + -ar(人) -> 在学术殿堂深耕的人 -> 学者",
    "mnemonic": "衍生词 scholarship(奖学金)，阅读中 scholars 常同义替换 researchers/academics",
    "collocations": [
      {
        "en": "visiting scholar",
        "zh": "访问学者"
      },
      {
        "en": "scholars are divided over",
        "zh": "学者们在……问题上存在分歧"
      },
      {
        "en": "win a scholarship",
        "zh": "获得奖学金"
      }
    ],
    "realSentence": {
      "en": "Scholars of the information society are divided over whether social inequality decreases or increases in an information-based society.",
      "zh": "研究信息社会的学者们对于信息化社会中的社会不平等究竟是减少还是加剧存在分歧。",
      "source": "2015.12 第1套"
    },
    "confusable": {
      "word": "schooling",
      "diff": "scholar 学者；schooling 学校教育"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v103",
    "day": 4,
    "word": "lecture",
    "phonetic": "/ˈlektʃər/",
    "pos": "n./v.",
    "meaning": "讲座，演讲，大学大课；[熟词僻义 v.] 训斥，说教",
    "examFreq": 5,
    "roots": "lect(读，讲) + -ure -> 教授在讲台上宣读讲解 -> 讲座/授课",
    "mnemonic": "大学课分 lecture(大课讲座) 和 seminar(小组研讨)；作动词常含“长篇说教”意味",
    "collocations": [
      {
        "en": "attend a lecture",
        "zh": "听讲座"
      },
      {
        "en": "deliver a lecture",
        "zh": "发表演讲/授课"
      },
      {
        "en": "lecture hall",
        "zh": "大阶梯教室"
      }
    ],
    "realSentence": {
      "en": "That was my last economics lecture of the week.",
      "zh": "那是我本周最后一节经济学大课。",
      "source": "2017.12 第2套听力"
    },
    "confusable": {
      "word": "literature / leisure",
      "diff": "lecture 讲座；literature 文学；leisure 休闲"
    },
    "tag": "听力高频"
  },
  {
    "id": "v104",
    "day": 4,
    "word": "critical",
    "phonetic": "/ˈkrɪtɪkl/",
    "pos": "adj.",
    "meaning": "至关重要的，关键的；批判性的；危急的，挑剔的",
    "examFreq": 11,
    "roots": "crit(判断，裁决，如 critic) + -ical -> 需要作出关键裁断的 -> 关键的/批判性的",
    "mnemonic": "四级阅读三大高频义全记：critical thinking(批判思维)、be critical to(至关重要)、be critical of(批评挑剔)",
    "collocations": [
      {
        "en": "critical thinking",
        "zh": "批判性思维"
      },
      {
        "en": "be critical to success",
        "zh": "对成功至关重要"
      },
      {
        "en": "be critical of",
        "zh": "对……持批评态度"
      }
    ],
    "realSentence": {
      "en": "It is critical to create good habits and take the actions necessary to stick to those habits day in and day out for greater success.",
      "zh": "为了取得更大成功，养成好习惯并采取必要行动日复一日坚持下去至关重要。",
      "source": "2024.06 第2套"
    },
    "confusable": {
      "word": "crucial / crisis",
      "diff": "critical 关键的/批判的/危急的；crucial 仅表至关重要的；crisis(n.) 危机"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v105",
    "day": 5,
    "word": "economy",
    "phonetic": "/ɪˈkɑːnəmi/",
    "pos": "n.",
    "meaning": "经济，经济体；[熟词僻义] 节约，节俭（economy class 经济舱）",
    "examFreq": 18,
    "roots": "eco-(家，生态) + nomy(管理法则) -> 治理家计与国计的法则 -> 经济/节约",
    "mnemonic": "eco(家)+nomy(管理) -> 管好一个国家的账本叫“经济”，管好自己花销叫“节约”",
    "collocations": [
      {
        "en": "digital economy",
        "zh": "数字经济"
      },
      {
        "en": "boost the economy",
        "zh": "提振经济"
      },
      {
        "en": "economy class",
        "zh": "经济舱"
      }
    ],
    "realSentence": {
      "en": "Over the next century, he predicted, the economy would become so productive that people would barely need to work at all.",
      "zh": "他曾预测，在接下来的一个世纪里，经济将变得如此高产，以至于人们几乎根本无需工作。",
      "source": "2024.06 第1套"
    },
    "confusable": {
      "word": "economic / economical",
      "diff": "economy(n.) 经济；economic(adj.) 经济上的；economical(adj.) 省钱的/节俭的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v106",
    "day": 5,
    "word": "economic",
    "phonetic": "/ˌiːkəˈnɑːmɪk/",
    "pos": "adj.",
    "meaning": "经济的，经济上的，经济学的（切勿与 economical 混淆！）",
    "examFreq": 25,
    "roots": "econom(经济) + -ic(形容词后缀) -> 与宏观经济运行相关的",
    "mnemonic": "短的 economic 谈国家宏观“经济的”；长的 economical 多了 al(all省下来) 才是“省钱节俭的”！",
    "collocations": [
      {
        "en": "economic growth",
        "zh": "经济增长"
      },
      {
        "en": "economic development",
        "zh": "经济发展"
      },
      {
        "en": "economic recovery",
        "zh": "经济复苏"
      }
    ],
    "realSentence": {
      "en": "The weakening of the human connection to nature might be good for economic growth but is bad for people.",
      "zh": "人与自然联系的弱化或许有利于经济增长，但对人类自身是有害的。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "economical",
      "diff": "economic 经济上的/经济学的；economical 实惠的/节约的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v107",
    "day": 5,
    "word": "financial",
    "phonetic": "/faɪˈnænʃl/",
    "pos": "adj.",
    "meaning": "金融的，财政的，财务的",
    "examFreq": 44,
    "roots": "fin(结束/结清款项) + -ance + -ial -> 与资金往来结算相关的 -> 金融的/财务的",
    "mnemonic": "金融业 finance -> 形容词 financial；高频词组 financial crisis / financial aid(助学金)",
    "collocations": [
      {
        "en": "financial education",
        "zh": "财商教育"
      },
      {
        "en": "financial burden",
        "zh": "经济负担"
      },
      {
        "en": "financial aid",
        "zh": "助学金/经济资助"
      }
    ],
    "realSentence": {
      "en": "I've come to the brutal realisation that Australia's youth are being done a great disservice by not receiving any consistent financial education.",
      "zh": "我残酷地意识到，澳大利亚年轻人由于缺乏持续的财商教育而蒙受了极大损失。",
      "source": "2024.12 第2套"
    },
    "confusable": {
      "word": "finance / fiscal",
      "diff": "financial 金融/个人财务的；finance(n./v.) 财政/资助；fiscal 政府财政税收的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v108",
    "day": 5,
    "word": "income",
    "phonetic": "/ˈɪnkʌm/",
    "pos": "n.",
    "meaning": "收入，所得，收益",
    "examFreq": 24,
    "roots": "in-(进入) + come(来) -> 流进钱包里的钱 -> 收入",
    "mnemonic": "钱进(in)来(come)就是收入；对应 outcome(流出来的结果)",
    "collocations": [
      {
        "en": "high-income nations",
        "zh": "高收入国家"
      },
      {
        "en": "source of income",
        "zh": "收入来源"
      },
      {
        "en": "disposable income",
        "zh": "可支配收入"
      }
    ],
    "realSentence": {
      "en": "Now most people living in high-income nations are consuming enough protein.",
      "zh": "如今，生活在高收入国家的大多数人都摄入了足够的蛋白质。",
      "source": "2024.12 第3套"
    },
    "confusable": {
      "word": "outcome / revenue",
      "diff": "income 个人/家庭收入；outcome 结果结局；revenue 政府税收/企业总营收"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v109",
    "day": 5,
    "word": "expense",
    "phonetic": "/ɪkˈspens/",
    "pos": "n.",
    "meaning": "费用，开销，支出；[短语] 代价（at the expense of 以……为代价）",
    "examFreq": 11,
    "roots": "ex-(向外) + pens(称重/支付，如 spend) -> 向外掏钱支付 -> 开销/费用",
    "mnemonic": "作文万能短语：at the expense of the environment(以牺牲环境为代价)",
    "collocations": [
      {
        "en": "at the expense of",
        "zh": "以……为代价"
      },
      {
        "en": "living expenses",
        "zh": "生活费"
      },
      {
        "en": "cut down expenses",
        "zh": "削减开支"
      }
    ],
    "realSentence": {
      "en": "Traffic jam leads to expense and unpredictability, things that keep investors away.",
      "zh": "交通拥堵会带来额外开销和不可预测性，这些因素会让投资者望而却步。",
      "source": "2017.12 第2套"
    },
    "confusable": {
      "word": "expanse / expensive",
      "diff": "expense(n.) 费用代价；expanse(n.) 广阔区域；expensive(adj.) 昂贵的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v110",
    "day": 5,
    "word": "profit",
    "phonetic": "/ˈprɑːfɪt/",
    "pos": "n./v.",
    "meaning": "利润，盈利，收益；[v.] 获益（profit from）",
    "examFreq": 15,
    "roots": "pro-(向前) + fit(做，做成) -> 做成生意向前赚到的钱 -> 利润/获益",
    "mnemonic": "记高频反义复合词 non-profit(非营利性的)，以及形容词 profitable(有利可图的)",
    "collocations": [
      {
        "en": "make a profit",
        "zh": "盈利"
      },
      {
        "en": "non-profit organization",
        "zh": "非营利组织"
      },
      {
        "en": "profit from",
        "zh": "从……中获益"
      }
    ],
    "realSentence": {
      "en": "She sold her restaurant with a substantial profit.",
      "zh": "她把自己的餐馆卖了出去，赚了一笔可观的利润。",
      "source": "2014.06 第1套"
    },
    "confusable": {
      "word": "benefit / prophet",
      "diff": "profit 商业利润/获益；benefit 广义益处/福利；prophet 先知预言家"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v111",
    "day": 5,
    "word": "investment",
    "phonetic": "/ɪnˈvestmənt/",
    "pos": "n.",
    "meaning": "投资，投资额；（时间/精力的）投入",
    "examFreq": 13,
    "roots": "in-(进入) + vest(穿衣/赋予资本) + -ment -> 把资金穿戴注入项目 -> 投资",
    "mnemonic": "动词 invest in(投资于……)，不仅投钱，也能投时间和精力(invest time in)",
    "collocations": [
      {
        "en": "wise investment",
        "zh": "明智的投资"
      },
      {
        "en": "attract investment",
        "zh": "吸引投资"
      },
      {
        "en": "return on investment",
        "zh": "投资回报"
      }
    ],
    "realSentence": {
      "en": "That means there's little money around for investment that would make cities liveable and more productive.",
      "zh": "这意味着几乎没有多余资金用于让城市更宜居、更具生产力的投资。",
      "source": "2017.12 第2套"
    },
    "confusable": {
      "word": "investigation",
      "diff": "investment 投资投入；investigation 调查研究"
    },
    "tag": "译写必备"
  },
  {
    "id": "v112",
    "day": 5,
    "word": "consumer",
    "phonetic": "/kənˈsuːmər/",
    "pos": "n.",
    "meaning": "消费者，顾客，用户",
    "examFreq": 48,
    "roots": "con-(全部) + sume(拿，消耗) + -er(人) -> 买走并消耗商品的人 -> 消费者",
    "mnemonic": "四级经济/商业阅读最高频主体词：consumer-friendly(对消费者友好的)",
    "collocations": [
      {
        "en": "consumer behavior",
        "zh": "消费行为"
      },
      {
        "en": "consumer rights",
        "zh": "消费者权益"
      },
      {
        "en": "consumer-friendly",
        "zh": "对消费者友好的"
      }
    ],
    "realSentence": {
      "en": "So far, it's a winning strategy: More than nine out of ten consumers who buy Beyond Burger and Impossible Foods products also eat meat.",
      "zh": "迄今为止这是一项制胜策略：购买这两家植物肉产品的消费者中，超过九成人平时也吃真肉。",
      "source": "2025.06 第3套"
    },
    "confusable": {
      "word": "customer",
      "diff": "consumer 宏观经济意义上的消费者；customer 某商店/企业的具体顾客"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v113",
    "day": 5,
    "word": "consumption",
    "phonetic": "/kənˈsʌmpʃn/",
    "pos": "n.",
    "meaning": "消费，消耗量；[熟词僻义] （食物/饮品的）摄入量，食用",
    "examFreq": 29,
    "roots": "consume(消耗/吃喝) + -ption(名词后缀) -> 消耗量/摄入量",
    "mnemonic": "四级健康阅读常考熟词僻义：fruit juice consumption = 果汁“饮用量/摄入量”",
    "collocations": [
      {
        "en": "energy consumption",
        "zh": "能源消耗"
      },
      {
        "en": "over-consumption",
        "zh": "过度消费/过量摄入"
      },
      {
        "en": "domestic consumption",
        "zh": "国内消费"
      }
    ],
    "realSentence": {
      "en": "Shifting eating habits, including a sharp drop in consumption of sparkling drinks, have forced radical change on the industry.",
      "zh": "饮食习惯的转变，包括碳酸饮料消费量骤降，迫使该行业作出彻底变革。",
      "source": "2018.12 第2套"
    },
    "confusable": {
      "word": "assumption",
      "diff": "consumption 消费/摄入量；assumption 假设/假定"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v114",
    "day": 5,
    "word": "commercial",
    "phonetic": "/kəˈmɜːrʃl/",
    "pos": "adj./n.",
    "meaning": "商业的，贸易的，营利的；[熟词僻义 n.] 电视/广播商业广告",
    "examFreq": 10,
    "roots": "com-(共同) + merc(贸易，如 merchant) + -ial -> 商业贸易的",
    "mnemonic": "词根 merc=贸易(merchant 商人)；作可数名词表示“插播的电视商业广告”",
    "collocations": [
      {
        "en": "commercial value",
        "zh": "商业价值"
      },
      {
        "en": "commercial application",
        "zh": "商业应用"
      },
      {
        "en": "TV commercial",
        "zh": "电视广告"
      }
    ],
    "realSentence": {
      "en": "This makes commercial space travel a complex legal issue not just domestically, but abroad.",
      "zh": "这使得商业太空旅行不仅在国内，而且在国际上都成了一个复杂的法律问题。",
      "source": "2018.06 第2套听力"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v115",
    "day": 5,
    "word": "industry",
    "phonetic": "/ˈɪndəstri/",
    "pos": "n.",
    "meaning": "行业，产业，工业；[熟词僻义] 勤奋，勤劳",
    "examFreq": 61,
    "roots": "indu-(向内) + stri(建造) -> 埋头兴建的实业 -> 产业/勤劳",
    "mnemonic": "警惕两个派生形容词：industrial(工业的) vs industrious(勤奋的)！",
    "collocations": [
      {
        "en": "service industry",
        "zh": "服务业"
      },
      {
        "en": "food industry",
        "zh": "食品行业"
      },
      {
        "en": "industry standards",
        "zh": "行业标准"
      }
    ],
    "realSentence": {
      "en": "Meanwhile, it pays to examine studies funded by industry or special interest groups with extra care.",
      "zh": "与此同时，对由行业或特殊利益集团资助的研究格外审慎地加以审视是值得的。",
      "source": "2024.06 第2套"
    },
    "confusable": {
      "word": "industrial / industrious",
      "diff": "industrial 工业的/产业的；industrious 勤奋的/刻苦的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v116",
    "day": 5,
    "word": "workforce",
    "phonetic": "/ˈwɜːrkfɔːrs/",
    "pos": "n.",
    "meaning": "劳动力，劳动人口；全体员工",
    "examFreq": 10,
    "roots": "work(工作) + force(力量，队伍) -> 投入劳动的全体力量 -> 劳动力",
    "mnemonic": "合成词一看就懂：enter the workforce(步入职场)、aging workforce(老龄化劳动力)",
    "collocations": [
      {
        "en": "enter the workforce",
        "zh": "进入职场"
      },
      {
        "en": "global workforce",
        "zh": "全球劳动力"
      },
      {
        "en": "workforce training",
        "zh": "劳动力培训"
      }
    ],
    "realSentence": {
      "en": "In the long term, however, the same people see machines as more threatening to their future role in the workforce.",
      "zh": "然而从长远来看，同样这批人认为机器对他们未来在职场中的角色构成了更大威胁。",
      "source": "2024.06 第3套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v117",
    "day": 5,
    "word": "executive",
    "phonetic": "/ɪɡˈzekjətɪv/",
    "pos": "n./adj.",
    "meaning": "企业高管，主管人员；行政的，决策执行的",
    "examFreq": 14,
    "roots": "ex-(彻底) + secut(跟随，执行 execute) + -ive -> 贯彻执行决策的人 -> 高管",
    "mnemonic": "CEO 的中间字母 E 就是 Executive(Chief Executive Officer 首席执行官)！",
    "collocations": [
      {
        "en": "business executive",
        "zh": "企业高管"
      },
      {
        "en": "chief executive officer",
        "zh": "首席执行官"
      },
      {
        "en": "executive power",
        "zh": "行政权"
      }
    ],
    "realSentence": {
      "en": "Many business executives confuse leadership with action.",
      "zh": "许多企业高管把领导力与盲目行动混为一谈。",
      "source": "2014.06 第1套"
    },
    "confusable": {
      "word": "execute",
      "diff": "executive(n./adj.) 高管/行政的；execute(v.) 执行实施/处决"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v118",
    "day": 5,
    "word": "promote",
    "phonetic": "/prəˈmoʊt/",
    "pos": "v.",
    "meaning": "促进，推动；晋升，提拔；促销，宣传推广",
    "examFreq": 18,
    "roots": "pro-(向前) + mote(移动) -> 推着向前走 -> 促进/晋升/推广",
    "mnemonic": "一词三景：对国家是“促进发展”，对员工是“晋升职位”，对商品是“促销推广”",
    "collocations": [
      {
        "en": "promote economic growth",
        "zh": "促进经济增长"
      },
      {
        "en": "get promoted",
        "zh": "获得晋升"
      },
      {
        "en": "promote a sense of community",
        "zh": "增进社区归属感"
      }
    ],
    "realSentence": {
      "en": "They can make unlovely spaces lovely, and marry use and beauty as well as help promote a sense of community.",
      "zh": "它们能让单调的空间变得宜人，兼顾实用与美观，并有助于增进社区归属感。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "prompt / remote",
      "diff": "promote 促进/晋升；prompt 促使/敏捷的；remote 遥远的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v119",
    "day": 5,
    "word": "career",
    "phonetic": "/kəˈrɪr/",
    "pos": "n.",
    "meaning": "职业生涯，事业，经历",
    "examFreq": 56,
    "roots": "源自拉丁语 carrus(战车/赛道) -> 人生奔跑的职业赛道 -> 职业生涯",
    "mnemonic": "别拼成 carrier(搬运工/承运商)！ee 两条平行赛道代表一辈子的 career(职业生涯)",
    "collocations": [
      {
        "en": "career development",
        "zh": "职业发展"
      },
      {
        "en": "career path",
        "zh": "职业道路"
      },
      {
        "en": "pursue a career",
        "zh": "从事一份事业"
      }
    ],
    "realSentence": {
      "en": "Many women engineers hailed the benefits of their chosen career.",
      "zh": "许多女工程师盛赞自己所选职业带来的益处。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "carrier",
      "diff": "career 职业生涯；carrier 承运人/航空母舰/病毒携带者"
    },
    "tag": "译写必备"
  },
  {
    "id": "v120",
    "day": 5,
    "word": "resident",
    "phonetic": "/ˈrezɪdənt/",
    "pos": "n./adj.",
    "meaning": "居民，住户；常驻的，居住的",
    "examFreq": 23,
    "roots": "re-(安稳坐下) + sid(坐，如 sit) + -ent(人) -> 长期坐落定居的人 -> 居民",
    "mnemonic": "词根 sid=坐：稳坐(re+sid)在一处定居的人 -> 居民(local residents)；反义 president(坐在最前面的人=总统/校长)",
    "collocations": [
      {
        "en": "local residents",
        "zh": "当地居民"
      },
      {
        "en": "urban residents",
        "zh": "城市居民"
      },
      {
        "en": "residential area",
        "zh": "居民区"
      }
    ],
    "realSentence": {
      "en": "The officers themselves also dropped off cards to local residents containing similar information.",
      "zh": "警员们还亲自向当地居民发放了载有类似信息的联系卡。",
      "source": "2026.06 第3套"
    },
    "confusable": {
      "word": "president",
      "diff": "resident 居民住户；president 总统/大学校长/总裁"
    },
    "tag": "译写必备"
  },
  {
    "id": "v121",
    "day": 5,
    "word": "urban",
    "phonetic": "/ˈɜːrbən/",
    "pos": "adj.",
    "meaning": "城市的，都市的，城镇的（反义：rural 乡村的）",
    "examFreq": 18,
    "roots": "拉丁词根 urb-(城市) + -an(形容词后缀) -> 城市的",
    "mnemonic": "黄金反义对：urban(城市) vs rural(乡村)，衍生词 suburb(郊区)、urbanization(城镇化)",
    "collocations": [
      {
        "en": "urban areas",
        "zh": "城市地区"
      },
      {
        "en": "urban green spaces",
        "zh": "城市绿地"
      },
      {
        "en": "urban planning",
        "zh": "城市规划"
      }
    ],
    "realSentence": {
      "en": "According to an urban design professor, it is difficult for city designers to foresee what will happen in the future.",
      "zh": "据一位城市设计教授所言，城市设计师很难预见未来会发生什么。",
      "source": "2019.12 第3套"
    },
    "confusable": {
      "word": "rural / suburban",
      "diff": "urban 城市的；rural 乡村的；suburban 郊区的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v122",
    "day": 5,
    "word": "community",
    "phonetic": "/kəˈmjuːnəti/",
    "pos": "n.",
    "meaning": "社区，社会群体；共同体，界（scientific community 科学界）",
    "examFreq": 32,
    "roots": "commun(共同的 common) + -ity -> 共享共同生活或利益的群体 -> 社区/共同体",
    "mnemonic": "翻译必备：除了“社区”，academic/scientific community 译作“学术界/科学界”",
    "collocations": [
      {
        "en": "local community",
        "zh": "当地社区"
      },
      {
        "en": "a sense of community",
        "zh": "社区归属感"
      },
      {
        "en": "international community",
        "zh": "国际社会"
      }
    ],
    "realSentence": {
      "en": "Natural disasters can have a long-lasting impact on community life.",
      "zh": "自然灾害会对社区生活产生深远的影响。",
      "source": "2019.12 第1套"
    },
    "confusable": {
      "word": "committee",
      "diff": "community 社区/群体；committee 委员会"
    },
    "tag": "译写必备"
  },
  {
    "id": "v123",
    "day": 5,
    "word": "regulation",
    "phonetic": "/ˌreɡjuˈleɪʃn/",
    "pos": "n.",
    "meaning": "规章，法规，条例；监管，调控",
    "examFreq": 6,
    "roots": "regul(规则，尺子，如 regular) + -ation -> 用来规范行业的尺子 -> 法规/监管",
    "mnemonic": "词根 regul=规则：政府管行业立规矩叫 government regulation，动词 regulate(监管/调节)",
    "collocations": [
      {
        "en": "government regulation",
        "zh": "政府监管"
      },
      {
        "en": "strict regulations",
        "zh": "严格的法规"
      },
      {
        "en": "comply with regulations",
        "zh": "遵守规定"
      }
    ],
    "realSentence": {
      "en": "In an editorial released Monday in the American Journal of Public Health, Katherine Record and Bryn Austin made their case for government regulation of the fashion industry.",
      "zh": "在周一发表于《美国公共卫生杂志》的一篇社论中，凯瑟琳·雷科德和布林·奥斯汀陈述了政府监管时尚行业的理由。",
      "source": "2016.12 第2套"
    },
    "confusable": {
      "word": "regular / legislation",
      "diff": "regulation 行政法规/监管；regular 定期的常规的；legislation 立法/法律"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v124",
    "day": 5,
    "word": "policy",
    "phonetic": "/ˈpɑːləsi/",
    "pos": "n.",
    "meaning": "政策，方针，策略；[熟词僻义] 保险单（insurance policy）",
    "examFreq": 19,
    "roots": "希腊语 polis(城邦，政务) + -cy -> 治理公共事务的方略 -> 政策",
    "mnemonic": "熟词僻义防踩坑：在保险语境里 policy 不是政策，是“保单”！",
    "collocations": [
      {
        "en": "public policy",
        "zh": "公共政策"
      },
      {
        "en": "implement a policy",
        "zh": "实施政策"
      },
      {
        "en": "policy makers",
        "zh": "政策制定者"
      }
    ],
    "realSentence": {
      "en": "But supporters of the policy say it means children will miss fewer days of school.",
      "zh": "但该政策的支持者表示，这意味着孩子们缺课的天数将会减少。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "politics / police",
      "diff": "policy 政策/保单；politics 政治；police 警方"
    },
    "tag": "译写必备"
  },
  {
    "id": "v125",
    "day": 5,
    "word": "property",
    "phonetic": "/ˈprɑːpərti/",
    "pos": "n.",
    "meaning": "财产，资产，房产；[熟词僻义] 特性，性质（化学/物理属性）",
    "examFreq": 11,
    "roots": "proper(自己专有的) + -ty -> 专属于你的东西或特质 -> 财产/属性",
    "mnemonic": "既指有形“房产/财产”(intellectual property 知识产权)，科普文里也指物质的“特性”",
    "collocations": [
      {
        "en": "intellectual property",
        "zh": "知识产权"
      },
      {
        "en": "public property",
        "zh": "公共财产"
      },
      {
        "en": "real property",
        "zh": "不动产"
      }
    ],
    "realSentence": {
      "en": "San Francisco has banned them from city property and events.",
      "zh": "旧金山已禁止它们出现在市政场所和公共活动中。",
      "source": "2024.12 第2套"
    },
    "confusable": {
      "word": "prosperity / poverty",
      "diff": "property 财产/性质；prosperity 繁荣昌盛；poverty 贫困"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v126",
    "day": 5,
    "word": "wage",
    "phonetic": "/weɪdʒ/",
    "pos": "n./v.",
    "meaning": "（按小时/周计发的）工资，薪水；[熟词僻义 v.] 发动，开展（战争/运动）",
    "examFreq": 7,
    "roots": "古法语 wage(担保/报酬) -> 付出劳动换取的计时报酬 -> 工资",
    "mnemonic": "区分 salary(白领月薪/年薪) 与 wage(蓝领时薪/周薪，如 minimum wage 最低工资)",
    "collocations": [
      {
        "en": "hourly wage",
        "zh": "时薪"
      },
      {
        "en": "minimum wage",
        "zh": "最低工资"
      },
      {
        "en": "wage gap",
        "zh": "工资差距"
      }
    ],
    "realSentence": {
      "en": "But by 2013 the average hourly wage for ordinary workers had fallen 5 percent from the 1973 level in terms of actual purchasing power.",
      "zh": "但到2013年，按实际购买力计算，普通工人的平均时薪已较1973年水平下降了5%。",
      "source": "2024.06 第1套"
    },
    "confusable": {
      "word": "salary / income",
      "diff": "wage 计时/计周工资；salary 月薪/年薪；income 广义总收入"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v127",
    "day": 5,
    "word": "employment",
    "phonetic": "/ɪmˈplɔɪmənt/",
    "pos": "n.",
    "meaning": "就业，雇用，受雇；职业，工作",
    "examFreq": 6,
    "roots": "employ(雇用/使用) + -ment(名词后缀) -> 就业状态",
    "mnemonic": "全家桶一次记：employ(雇用)->employer(雇主)->employee(雇员)->unemployment(失业率)",
    "collocations": [
      {
        "en": "employment opportunities",
        "zh": "就业机会"
      },
      {
        "en": "employment status",
        "zh": "就业状况"
      },
      {
        "en": "full employment",
        "zh": "充分就业"
      }
    ],
    "realSentence": {
      "en": "Employed young men are much less likely to live at home than young men without a job, and employment among young men has fallen significantly in recent decades.",
      "zh": "有工作的年轻男性与父母同住的可能性远低于失业青年，而近几十年来年轻男性的就业率显著下降。",
      "source": "2019.06 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v128",
    "day": 5,
    "word": "crisis",
    "phonetic": "/ˈkraɪsɪs/",
    "pos": "n.",
    "meaning": "危机，危急关头，转折点（复数 crises /ˈkraɪsiːz/）",
    "examFreq": 17,
    "roots": "希腊语 krisis(决断时刻，同源 critical) -> 生死攸关的转折点 -> 危机",
    "mnemonic": "注意不规则复数把 i 变 e：crisis -> crises！搭配 economic/climate crisis",
    "collocations": [
      {
        "en": "economic crisis",
        "zh": "经济危机"
      },
      {
        "en": "crisis management",
        "zh": "危机管理"
      },
      {
        "en": "overcome a crisis",
        "zh": "渡过危机"
      }
    ],
    "realSentence": {
      "en": "Unfortunately, the crisis of global warming has already had a serious negative impact on cacao farms' yields, leading to the prices of chocolates skyrocketing.",
      "zh": "不幸的是，全球变暖危机已对可可农场的产量造成严重负面影响，导致巧克力价格飙升。",
      "source": "2024.12 第2套"
    },
    "confusable": {
      "word": "critic / critical",
      "diff": "crisis(n.) 危机；critic(n.) 批评家；critical(adj.) 关键的/批判的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v129",
    "day": 5,
    "word": "competitive",
    "phonetic": "/kəmˈpetətɪv/",
    "pos": "adj.",
    "meaning": "有竞争力的，竞争激烈的；好胜的",
    "examFreq": 14,
    "roots": "com-(共同) + pet(追求，奔向) + -itive -> 共同争抢同一目标 -> 竞争的",
    "mnemonic": "写作高频词组：in a fiercely competitive society(在竞争激烈的社会中)",
    "collocations": [
      {
        "en": "competitive society",
        "zh": "竞争激烈的社会"
      },
      {
        "en": "competitive edge",
        "zh": "竞争优势"
      },
      {
        "en": "competitive spirit",
        "zh": "竞争精神"
      }
    ],
    "realSentence": {
      "en": "In such a competitive society, willingness to listen can make you gain trust and friendship, which is the basic rule of socialization.",
      "zh": "在如此竞争激烈的社会中，愿意倾听能帮你赢得信任与友谊，这是社交的基本准则。",
      "source": "2015.12 第1套"
    },
    "confusable": {
      "word": "competent",
      "diff": "competitive 有竞争力的/竞争的；competent 能胜任的/称职的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v130",
    "day": 5,
    "word": "productive",
    "phonetic": "/prəˈdʌktɪv/",
    "pos": "adj.",
    "meaning": "多产的，高产的，富有成效的（效率高、产出丰）",
    "examFreq": 14,
    "roots": "pro-(向前) + duct(引导，产出) + -ive -> 能源源不断产出成果的 -> 高产/有成效的",
    "mnemonic": "学习/工作“高效有收获”别只写 good，地道四级表达是 stay productive！",
    "collocations": [
      {
        "en": "highly productive",
        "zh": "高产的/极富成效的"
      },
      {
        "en": "productive discussion",
        "zh": "富有成效的讨论"
      },
      {
        "en": "boost productivity",
        "zh": "提高生产力"
      }
    ],
    "realSentence": {
      "en": "Task timers are happier and more creative, but less productive.",
      "zh": "以任务为导向安排时间的人更快乐、更有创造力，但产出效率相对较低。",
      "source": "2015.12 第1套"
    },
    "confusable": {
      "word": "protective",
      "diff": "productive 多产的/有成效的；protective 保护的/防护的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v131",
    "day": 6,
    "word": "environment",
    "phonetic": "/ɪnˈvaɪrənmənt/",
    "pos": "n.",
    "meaning": "自然环境，生态环境；周围环境，氛围",
    "examFreq": 50,
    "roots": "en-(进入) + viron(圆圈，环绕) + -ment -> 环绕在人四周的一切 -> 环境",
    "mnemonic": "拼写防错：中间有个不发音的 n —— en-vi-ron-ment，别漏写 n！",
    "collocations": [
      {
        "en": "protect the environment",
        "zh": "保护环境"
      },
      {
        "en": "environmental protection",
        "zh": "环境保护"
      },
      {
        "en": "environmentally friendly",
        "zh": "环保的，环境友好的"
      }
    ],
    "realSentence": {
      "en": "Traditional agriculture has been making \"dramatic improvements\" to reduce its impact on the environment.",
      "zh": "传统农业一直在作出“显著改进”，以减少其对环境的影响。",
      "source": "2026.06 第1套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v132",
    "day": 6,
    "word": "climate",
    "phonetic": "/ˈklaɪmət/",
    "pos": "n.",
    "meaning": "气候；[熟词僻义] （社会/经济）风气，大环境，氛围",
    "examFreq": 12,
    "roots": "希腊语 klima(倾斜角度/纬度带) -> 不同纬度带的天气总貌 -> 气候",
    "mnemonic": "除了 climate change(气候变化)，阅读中 economic climate 指“经济大环境”",
    "collocations": [
      {
        "en": "climate change",
        "zh": "气候变化"
      },
      {
        "en": "mild climate",
        "zh": "温和的气候"
      },
      {
        "en": "economic climate",
        "zh": "经济气候/大环境"
      }
    ],
    "realSentence": {
      "en": "Plants are also, of course, our first defense against species loss and climate change.",
      "zh": "当然，植物也是我们抵御物种丧失和气候变化的第一道防线。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "weather / climax",
      "diff": "climate 长期气候/社会风气；weather 短期天气；climax 高潮顶点"
    },
    "tag": "译写必备"
  },
  {
    "id": "v133",
    "day": 6,
    "word": "pollution",
    "phonetic": "/pəˈluːʃn/",
    "pos": "n.",
    "meaning": "污染，污染物（不可数名词）",
    "examFreq": 21,
    "roots": "pol-(彻底) + lut(冲刷，弄脏) + -ion -> 把清澈水源彻底弄脏 -> 污染",
    "mnemonic": "注意动词是 pollute，污染物是 pollutant，全套环保写译高频词",
    "collocations": [
      {
        "en": "light pollution",
        "zh": "光污染"
      },
      {
        "en": "curb air pollution",
        "zh": "遏制空气污染"
      },
      {
        "en": "pollution control",
        "zh": "污染治理"
      }
    ],
    "realSentence": {
      "en": "It is strange that light pollution on Great Barrier Island mainly comes from a faraway island to the north.",
      "zh": "奇怪的是，大堡岛上的光污染主要来自北方一座遥远的岛屿。",
      "source": "2026.06 第1套"
    },
    "confusable": {
      "word": "population",
      "diff": "pollution 污染；population 人口"
    },
    "tag": "译写必备"
  },
  {
    "id": "v134",
    "day": 6,
    "word": "emission",
    "phonetic": "/ɪˈmɪʃn/",
    "pos": "n.",
    "meaning": "（气体/光/热的）排放，散发；排放物（常用复数 emissions）",
    "examFreq": 8,
    "roots": "e-(向外) + miss(送出，发射) + -ion -> 向大气送出的废气 -> 排放",
    "mnemonic": "动词 emit(排放) -> 名词 emission；环保必背搭配 carbon/greenhouse gas emissions",
    "collocations": [
      {
        "en": "carbon emissions",
        "zh": "碳排放"
      },
      {
        "en": "reduce greenhouse emissions",
        "zh": "减少温室气体排放"
      },
      {
        "en": "zero-emission vehicles",
        "zh": "零排放汽车"
      }
    ],
    "realSentence": {
      "en": "The authors also calculate that the emissions from using 19 microwaves over a year are the same as those from using a car.",
      "zh": "作者还测算出，一年使用19台微波炉产生的排放量相当于使用一辆汽车的排放量。",
      "source": "2019.12 第3套"
    },
    "confusable": {
      "word": "omission / permission",
      "diff": "emission 排放物；omission 遗漏省略；permission 允许许可"
    },
    "tag": "译写必备"
  },
  {
    "id": "v135",
    "day": 6,
    "word": "carbon",
    "phonetic": "/ˈkɑːrbən/",
    "pos": "n.",
    "meaning": "碳；碳排放（缩写代指二氧化碳）",
    "examFreq": 2,
    "roots": "拉丁语 carbo(木炭，煤炭) -> 碳元素",
    "mnemonic": "绿色中国翻译/写作王牌词组：low-carbon lifestyle(低碳生活)、carbon footprint(碳足迹)",
    "collocations": [
      {
        "en": "low-carbon lifestyle",
        "zh": "低碳生活方式"
      },
      {
        "en": "carbon footprint",
        "zh": "碳足迹"
      },
      {
        "en": "carbon neutrality",
        "zh": "碳中和"
      }
    ],
    "realSentence": {
      "en": "Popping food into the microwave for a couple of minutes may seem utterly harmless, but Europe's stock of these quick-cooking ovens emit as much carbon as nearly 7 million cars, a new study has found.",
      "zh": "把食物放进微波炉加热几分钟看似完全无害，但一项新研究发现，欧洲现有的这类速热炉排放的碳相当于近700万辆汽车。",
      "source": "2019.12 第3套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v136",
    "day": 6,
    "word": "species",
    "phonetic": "/ˈspiːʃiːz/",
    "pos": "n.",
    "meaning": "物种，种类（单复数同形！）",
    "examFreq": 20,
    "roots": "spec(外观，种类) + -ies -> 按外观特征划分出的生物类群 -> 物种",
    "mnemonic": "语法易错警报：a species(一个物种) / many species(许多物种)，单复数完全同形！",
    "collocations": [
      {
        "en": "endangered species",
        "zh": "濒危物种"
      },
      {
        "en": "species loss",
        "zh": "物种丧失"
      },
      {
        "en": "wildlife species",
        "zh": "野生物种"
      }
    ],
    "realSentence": {
      "en": "It is not a moment too soon that teenagers will be able to take a natural history test given that for decades children have been able to name more video game characters than wildlife species.",
      "zh": "数十年来孩子能叫出的电子游戏角色比野生物种还多，因此让青少年参加自然史测试实在刻不容缓。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "special / specific",
      "diff": "species(n.) 物种；special 特别的；specific 具体的/特定的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v137",
    "day": 6,
    "word": "habitat",
    "phonetic": "/ˈhæbɪtæt/",
    "pos": "n.",
    "meaning": "（动植物的）自然栖息地，生长环境",
    "examFreq": 14,
    "roots": "habit(居住，如 inhabit) + -at -> 动物长期居住的家园 -> 栖息地",
    "mnemonic": "habit 除了“习惯”，作词根表“居住”(inhabitant 居民)，动植物住的地方就是 habitat",
    "collocations": [
      {
        "en": "natural habitat",
        "zh": "自然栖息地"
      },
      {
        "en": "destroy habitats",
        "zh": "破坏栖息地"
      },
      {
        "en": "habitat conservation",
        "zh": "栖息地保护"
      }
    ],
    "realSentence": {
      "en": "It concluded that pandas fail to wander off in search of new mates if they find their habitat too comfortable, resulting in a lack of vital genetic diversity.",
      "zh": "研究得出结论：如果大熊猫觉得栖息地过于安逸，就不会外出寻找新配偶，从而导致关键的遗传多样性匮乏。",
      "source": "2025.06 第1套"
    },
    "confusable": {
      "word": "habit / inhabitant",
      "diff": "habitat 动植物栖息地；habit 习惯；inhabitant 居民"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v138",
    "day": 6,
    "word": "resource",
    "phonetic": "/ˈriːsɔːrs/",
    "pos": "n.",
    "meaning": "资源，物力（常用复数 resources）；财力，谋略",
    "examFreq": 23,
    "roots": "re-(再次) + source(源泉) -> 能反复涌出的源泉 -> 资源",
    "mnemonic": "反复(re)提供补给的源头(source) -> 资源！自然资源、人力资源、学习资源都能用",
    "collocations": [
      {
        "en": "natural resources",
        "zh": "自然资源"
      },
      {
        "en": "human resources",
        "zh": "人力资源"
      },
      {
        "en": "resource scarcity",
        "zh": "资源匮乏"
      }
    ],
    "realSentence": {
      "en": "As my colleague Vann Newkirk reported, Puerto Rico is still confronting economic and structural destruction and resource scarcity from 2017's Hurricane Maria.",
      "zh": "正如我同事所报道的，波多黎各至今仍在面对2017年飓风玛丽亚造成的经济、设施损毁与资源匮乏。",
      "source": "2019.12 第1套"
    },
    "confusable": {
      "word": "source",
      "diff": "resource 可利用的资源/财力；source 来源/源头"
    },
    "tag": "译写必备"
  },
  {
    "id": "v139",
    "day": 6,
    "word": "renewable",
    "phonetic": "/rɪˈnuːəbl/",
    "pos": "adj.",
    "meaning": "（能源等）可再生的；可续期的",
    "examFreq": 2,
    "roots": "re-(重新) + new(新) + -able(能……的) -> 能重新焕新再生的 -> 可再生的",
    "mnemonic": "一拆就明：re+new+able！加前缀 non- 变成 non-renewable(不可再生的化石燃料)",
    "collocations": [
      {
        "en": "renewable energy",
        "zh": "可再生能源"
      },
      {
        "en": "non-renewable fuels",
        "zh": "不可再生燃料"
      },
      {
        "en": "renewable resources",
        "zh": "可再生资源"
      }
    ],
    "realSentence": {
      "en": "Maintaining safe speeds and being electric, self-driving cars would drastically reduce pollution levels and dependency on non-renewable fuels.",
      "zh": "由于保持安全车速且采用电力驱动，自动驾驶汽车将大幅降低污染水平以及对不可再生燃料的依赖。",
      "source": "2018.12 第3套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v140",
    "day": 6,
    "word": "sustainable",
    "phonetic": "/səˈsteɪnəbl/",
    "pos": "adj.",
    "meaning": "可持续的，环保可持续发展的；能长期维持的",
    "examFreq": 9,
    "roots": "sustain(维持，支撑) + -able(能够的) -> 能够长久撑下去的 -> 可持续的",
    "mnemonic": "四级环保与社会发展作文王牌热词：sustainable development(可持续发展)！",
    "collocations": [
      {
        "en": "sustainable development",
        "zh": "可持续发展"
      },
      {
        "en": "sustainable lifestyle",
        "zh": "可持续生活方式"
      },
      {
        "en": "sustainable passion",
        "zh": "持久的热情"
      }
    ],
    "realSentence": {
      "en": "The real workings of grit are to have sustainable passion and continue to try.",
      "zh": "坚毅的真正运作方式，就是保持持久的热情并不断尝试。",
      "source": "2025.06 第1套"
    },
    "confusable": {
      "word": "substantial",
      "diff": "sustainable 可持续的；substantial 大量的/实质性的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v141",
    "day": 6,
    "word": "preserve",
    "phonetic": "/prɪˈzɜːrv/",
    "pos": "v./n.",
    "meaning": "保护，维护，保存（使其免遭毁坏）；[n.] 保护区，果酱",
    "examFreq": 10,
    "roots": "pre-(提前) + serve(看守，保持) -> 提前看守好不让变质毁坏 -> 保护/保存",
    "mnemonic": "辨析三兄弟：pre(提前护好)=preserve 保护遗产/生态；re(留住)=reserve 预订；con(聚拢省着用)=conserve 节约能源",
    "collocations": [
      {
        "en": "preserve cultural heritage",
        "zh": "保护文化遗产"
      },
      {
        "en": "preserve biodiversity",
        "zh": "保护生物多样性"
      },
      {
        "en": "well-preserved",
        "zh": "保存完好的"
      }
    ],
    "realSentence": {
      "en": "But the new research suggests that a \"modest degree of discomfort and fragmentation\" may actually help preserve panda populations.",
      "zh": "但这项新研究表明，适度的“不适感与栖息地碎片化”实际上可能有助于保护大熊猫种群。",
      "source": "2025.06 第1套"
    },
    "confusable": {
      "word": "reserve / conserve / deserve",
      "diff": "preserve 保护保存；reserve 预订保留；conserve 节约水电；deserve 值得"
    },
    "tag": "译写必备"
  },
  {
    "id": "v142",
    "day": 6,
    "word": "recycle",
    "phonetic": "/ˌriːˈsaɪkl/",
    "pos": "v.",
    "meaning": "回收利用，循环再利用",
    "examFreq": 14,
    "roots": "re-(再次) + cycle(圆圈，循环) -> 重新送回循环圈里 -> 回收利用",
    "mnemonic": "绿色校园常考三连：reduce(减量)、reuse(复用)、recycle(回收)！",
    "collocations": [
      {
        "en": "recycled plastic",
        "zh": "再生塑料"
      },
      {
        "en": "recycling bin",
        "zh": "可回收垃圾桶"
      },
      {
        "en": "waste recycling",
        "zh": "废品回收利用"
      }
    ],
    "realSentence": {
      "en": "And while bottles may be recyclable, very few are made of recycled plastic.",
      "zh": "尽管塑料瓶本身或许可回收，但真正用再生塑料制成的瓶子却寥寥无几。",
      "source": "2024.12 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v143",
    "day": 6,
    "word": "reduce",
    "phonetic": "/rɪˈduːs/",
    "pos": "v.",
    "meaning": "减少，降低，缩减；[熟词僻义] 使沦为（reduce sb. to...）",
    "examFreq": 68,
    "roots": "re-(向回) + duce(引导) -> 往回拉低数量 -> 减少/降低",
    "mnemonic": "注意介词陷阱：reduce BY 20%(减少了20%) vs reduce TO 20%(减少到了20%)！",
    "collocations": [
      {
        "en": "reduce carbon emissions",
        "zh": "减少碳排放"
      },
      {
        "en": "reduce the risk of",
        "zh": "降低……的风险"
      },
      {
        "en": "reduce waste",
        "zh": "减少浪费"
      }
    ],
    "realSentence": {
      "en": "Research about aging adults who take on new enterprises shows improved function and memory as well as a reduced risk of mental disease.",
      "zh": "针对投身新事业的老年人的研究表明，他们的机能和记忆力有所提升，患精神疾病的风险也有所降低。",
      "source": "2024.06 第1套"
    },
    "confusable": {
      "word": "deduce / induce",
      "diff": "reduce 减少降低；deduce 演绎推理；induce 诱发引起"
    },
    "tag": "同义替换"
  },
  {
    "id": "v144",
    "day": 6,
    "word": "eliminate",
    "phonetic": "/ɪˈlɪmɪneɪt/",
    "pos": "v.",
    "meaning": "消除，根除，排除；淘汰（比赛选手）",
    "examFreq": 7,
    "roots": "e-(向外) + limin(门槛，界限) + -ate -> 扫出门槛外面 -> 消除/淘汰",
    "mnemonic": "词根 limin=门槛(limit 限制)：扫地出门 -> 彻底根除(比 remove 语气更彻底)",
    "collocations": [
      {
        "en": "eliminate poverty",
        "zh": "消除贫困"
      },
      {
        "en": "eliminate harmful substances",
        "zh": "清除有害物质"
      },
      {
        "en": "eliminate discrimination",
        "zh": "消除歧视"
      }
    ],
    "realSentence": {
      "en": "Even if those causes of death were eliminated, life expectancy would still not go much beyond 92 years.",
      "zh": "即使那些致死原因被彻底消除，人类的预期寿命仍不会比92岁高出太多。",
      "source": "2017.12 第3套"
    },
    "confusable": {
      "word": "illuminate",
      "diff": "eliminate 消除/淘汰；illuminate 照亮/阐明"
    },
    "tag": "选词常考"
  },
  {
    "id": "v145",
    "day": 6,
    "word": "shortage",
    "phonetic": "/ˈʃɔːrtɪdʒ/",
    "pos": "n.",
    "meaning": "短缺，不足，匮乏",
    "examFreq": 6,
    "roots": "short(短的，缺的) + -age(名词后缀，表状态/总量) -> 不足的状态 -> 短缺",
    "mnemonic": "同义替换常考：shortage = lack / scarcity；常搭 water/food/labor shortage",
    "collocations": [
      {
        "en": "water shortage",
        "zh": "水资源短缺"
      },
      {
        "en": "food shortage",
        "zh": "粮食短缺"
      },
      {
        "en": "a shortage of funds",
        "zh": "资金短缺"
      }
    ],
    "realSentence": {
      "en": "Wells are much more reliable sources of freshwater, and California is hoping that these deep wells may be the answer to their severe water shortage.",
      "zh": "水井是更可靠的淡水来源，加利福尼亚州正希望这些深井能成为解决严重水资源短缺的答案。",
      "source": "2018.12 第1套"
    },
    "confusable": {
      "word": "shortcoming",
      "diff": "shortage 物资/人力短缺；shortcoming 个人缺点/缺陷"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v146",
    "day": 6,
    "word": "disaster",
    "phonetic": "/dɪˈzæstər/",
    "pos": "n.",
    "meaning": "灾难，灾害；彻底的失败，惨败",
    "examFreq": 16,
    "roots": "dis-(坏的) + aster(星星，如 astronomy) -> 古人迷信“凶星降临” -> 灾难",
    "mnemonic": "aster=星星：凶星(dis+aster)当头就是灾难！形容词 disastrous(灾难性的)",
    "collocations": [
      {
        "en": "natural disaster",
        "zh": "自然灾害"
      },
      {
        "en": "disaster relief",
        "zh": "救灾"
      },
      {
        "en": "disaster-struck areas",
        "zh": "受灾地区"
      }
    ],
    "realSentence": {
      "en": "Private postal companies also support disaster relief efforts by distributing urgent supplies.",
      "zh": "私营邮政公司也通过分发紧急物资来支持救灾工作。",
      "source": "2019.12 第1套"
    },
    "confusable": null,
    "tag": "听力高频"
  },
  {
    "id": "v147",
    "day": 6,
    "word": "wildlife",
    "phonetic": "/ˈwaɪldlaɪf/",
    "pos": "n.",
    "meaning": "野生动植物，野生生物（不可数名词！）",
    "examFreq": 7,
    "roots": "wild(野生的) + life(生命) -> 野外自然生长的生物 -> 野生动植物",
    "mnemonic": "写作易错：wildlife 是不可数集合名词，千万不要写成 wildlifes！",
    "collocations": [
      {
        "en": "protect wildlife",
        "zh": "保护野生动植物"
      },
      {
        "en": "wildlife conservation",
        "zh": "野生生物保护"
      },
      {
        "en": "wildlife sanctuary",
        "zh": "野生动物保护区"
      }
    ],
    "realSentence": {
      "en": "Numerous documentaries have shown how plastic is ultimately killing wildlife.",
      "zh": "无数纪录片已经揭示了塑料最终是如何杀害野生生物的。",
      "source": "2024.12 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v148",
    "day": 6,
    "word": "organic",
    "phonetic": "/ɔːrˈɡænɪk/",
    "pos": "adj.",
    "meaning": "有机的，不使用化肥农药的；器官的，有生命的",
    "examFreq": 26,
    "roots": "organ(器官，有机体) + -ic -> 源于自然生命体的 -> 有机的",
    "mnemonic": "2026年6月四级阅读高频主题词：organic farming(有机农业) vs conventional food(常规食品)",
    "collocations": [
      {
        "en": "organic food",
        "zh": "有机食品"
      },
      {
        "en": "organic farming",
        "zh": "有机农业"
      },
      {
        "en": "organic waste",
        "zh": "有机垃圾"
      }
    ],
    "realSentence": {
      "en": "One thing is definitive: Organic and conventionally grown food are equally nutritious.",
      "zh": "有一点是确凿无疑的：有机食品与常规种植食品的营养价值是同等的。",
      "source": "2026.06 第1套"
    },
    "confusable": {
      "word": "organ / organism",
      "diff": "organic(adj.) 有机的；organ(n.) 器官；organism(n.) 生物体/有机体"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v149",
    "day": 6,
    "word": "plastic",
    "phonetic": "/ˈplæstɪk/",
    "pos": "n./adj.",
    "meaning": "塑料，塑料制品；[熟词僻义 adj.] 可塑的，柔韧的",
    "examFreq": 30,
    "roots": "希腊语 plastikos(可塑形的) -> 加热能随意塑形的材料 -> 塑料/可塑的",
    "mnemonic": "除了环保热点 plastic waste(塑料垃圾)，记住 plastic surgery(整形手术，因可塑形得名)",
    "collocations": [
      {
        "en": "plastic waste",
        "zh": "塑料垃圾"
      },
      {
        "en": "single-use plastic",
        "zh": "一次性塑料"
      },
      {
        "en": "ocean plastic",
        "zh": "海洋塑料污染"
      }
    ],
    "realSentence": {
      "en": "Before plastic and the marketing that made people think they needed bottled water in the first place, fountains were an urban fixture.",
      "zh": "在塑料和那些让人们误以为必须喝瓶装水的营销出现之前，直饮水喷泉曾是城市标配。",
      "source": "2024.12 第2套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v150",
    "day": 6,
    "word": "threaten",
    "phonetic": "/ˈθretn/",
    "pos": "v.",
    "meaning": "威胁，危及，恐吓；[熟词僻义] 预示（不好的事）即将发生",
    "examFreq": 9,
    "roots": "threat(威胁) + -en(动词后缀，使……) -> 构成威胁 -> 威胁/危及",
    "mnemonic": "名词 threat(pose a threat to 对……构成威胁) + en 变动词；环保/AI阅读必见词",
    "collocations": [
      {
        "en": "threaten survival",
        "zh": "威胁生存"
      },
      {
        "en": "pose a threat to",
        "zh": "对……构成威胁"
      },
      {
        "en": "be threatened by",
        "zh": "受到……的威胁"
      }
    ],
    "realSentence": {
      "en": "Environmentalists have long believed that building roads or homes near the bears may threaten their survival by \"reducing or fragmenting their natural habitats\", The Times reported.",
      "zh": "据《泰晤士报》报道，环保人士长期以来认为在熊猫附近修路建房会因“缩减或割裂其自然栖息地”而威胁其生存。",
      "source": "2025.06 第1套"
    },
    "confusable": {
      "word": "treat",
      "diff": "threaten 威胁危及；treat 对待/治疗/款待"
    },
    "tag": "选词常考"
  },
  {
    "id": "v151",
    "day": 6,
    "word": "damage",
    "phonetic": "/ˈdæmɪdʒ/",
    "pos": "n./v.",
    "meaning": "损害，破坏，损失（不可数）；[pl. 熟词僻义] 损害赔偿金",
    "examFreq": 21,
    "roots": "拉丁词根 damn-(损失，伤害) + -age -> 造成破损与损失 -> 损害",
    "mnemonic": "不可数名词 do/cause damage to(对……造成损害)；加 s 变法律术语“赔偿金”",
    "collocations": [
      {
        "en": "cause severe damage to",
        "zh": "对……造成严重损害"
      },
      {
        "en": "environmental damage",
        "zh": "环境破坏"
      },
      {
        "en": "repair the damage",
        "zh": "修复损害"
      }
    ],
    "realSentence": {
      "en": "This differed from the findings of a study from Harvard University in the US, which concluded that missing a few occasional days because of the weather did not damage learning.",
      "zh": "这与美国哈佛大学的一项研究结果不同，该研究认为因天气偶尔缺课几天并不会损害学习效果。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "destroy / ruin",
      "diff": "damage 可修复的局部损坏；destroy 彻底毁灭；ruin 毁坏(前途/气氛/建筑成废墟)"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v152",
    "day": 6,
    "word": "survive",
    "phonetic": "/sərˈvaɪv/",
    "pos": "v.",
    "meaning": "幸存，存活，挺过（灾难/危机）；比……活得长",
    "examFreq": 11,
    "roots": "sur-(超越) + vive(活，如 vivid) -> 熬过劫难继续活着 -> 幸存",
    "mnemonic": "词根 viv=活！用法注意及物：survive the disaster(从灾难中幸存)，不用加 from！",
    "collocations": [
      {
        "en": "survive the crisis",
        "zh": "渡过危机"
      },
      {
        "en": "struggle to survive",
        "zh": "挣扎求生"
      },
      {
        "en": "survival rate",
        "zh": "存活率"
      }
    ],
    "realSentence": {
      "en": "They are trying to modify the species with a gene-editing technology, which will transform the seedlings into a species that survives even in a drier and warmer climate.",
      "zh": "他们正试图利用基因编辑技术改良该物种，把幼苗改造成即便在更干燥炎热的气候下也能存活的品种。",
      "source": "2024.12 第2套"
    },
    "confusable": {
      "word": "revive / survey",
      "diff": "survive 幸存；revive 复苏/苏醒；survey 调查"
    },
    "tag": "选词常考"
  },
  {
    "id": "v153",
    "day": 6,
    "word": "solar",
    "phonetic": "/ˈsoʊlər/",
    "pos": "adj.",
    "meaning": "太阳的，太阳能的，按太阳计算的",
    "examFreq": 14,
    "roots": "拉丁词根 sol-(太阳) + -ar(形容词后缀) -> 太阳的",
    "mnemonic": "sol=太阳 -> solar panels(太阳能电池板)、solar energy(太阳能)、solar system(太阳系)",
    "collocations": [
      {
        "en": "solar panels",
        "zh": "太阳能电池板"
      },
      {
        "en": "solar energy",
        "zh": "太阳能"
      },
      {
        "en": "solar system",
        "zh": "太阳系"
      }
    ],
    "realSentence": {
      "en": "An office tower on Miller Street in Manchester is completely covered in solar panels.",
      "zh": "曼彻斯特米勒街的一座办公大楼通体覆盖着太阳能电池板。",
      "source": "2018.06 第1套"
    },
    "confusable": {
      "word": "lunar / polar",
      "diff": "solar 太阳的；lunar 月亮的/农历的；polar 极地的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v154",
    "day": 6,
    "word": "endangered",
    "phonetic": "/ɪnˈdeɪndʒərd/",
    "pos": "adj.",
    "meaning": "濒危的，濒临灭绝的，处于危险中的",
    "examFreq": 8,
    "roots": "en-(使进入) + danger(危险) + -ed -> 被置于危险境地的 -> 濒危的",
    "mnemonic": "en+danger+ed 一眼拆解：被推入危险之中 -> endangered species(濒危物种)",
    "collocations": [
      {
        "en": "endangered species",
        "zh": "濒危物种"
      },
      {
        "en": "endangered wildlife",
        "zh": "濒危野生动物"
      },
      {
        "en": "endangered heritage",
        "zh": "濒危遗产"
      }
    ],
    "realSentence": {
      "en": "It feels like we're some form of endangered species.",
      "zh": "感觉我们就像是某种濒危物种一样。",
      "source": "2018.06 第2套"
    },
    "confusable": {
      "word": "dangerous",
      "diff": "endangered(自身处于危险中) 濒危的；dangerous(对别人造成危险) 危险的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v155",
    "day": 6,
    "word": "greenhouse",
    "phonetic": "/ˈɡriːnhaʊs/",
    "pos": "n.",
    "meaning": "温室，花房；[定语] 温室效应的",
    "examFreq": 4,
    "roots": "green(绿色的植物) + house(玻璃房) -> 留住热量种绿植的玻璃房 -> 温室",
    "mnemonic": "环保阅读/写译固定组合：greenhouse gas(温室气体)、greenhouse effect(温室效应)",
    "collocations": [
      {
        "en": "greenhouse gas",
        "zh": "温室气体"
      },
      {
        "en": "greenhouse effect",
        "zh": "温室效应"
      },
      {
        "en": "reduce greenhouse emissions",
        "zh": "减少温室气体排放"
      }
    ],
    "realSentence": {
      "en": "A study by the University of Manchester calculated the emissions of CO2—the main greenhouse gas responsible for climate change—at every stage of microwaves, from manufacture to waste disposal.",
      "zh": "曼彻斯特大学的一项研究测算了微波炉从制造到报废处理各阶段中二氧化碳——导致气候变化的主要温室气体——的排放量。",
      "source": "2019.12 第3套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v156",
    "day": 6,
    "word": "extinct",
    "phonetic": "/ɪkˈstɪŋkt/",
    "pos": "adj.",
    "meaning": "灭绝的，绝种的；（火山）死的，熄灭的",
    "examFreq": 1,
    "roots": "ex-(彻底) + stinct(刺/熄灭，同源 extinguish) -> 火种彻底熄灭 -> 灭绝的",
    "mnemonic": "记固定搭配 go/become extinct(灭绝)，名词 extinction(on the brink of extinction 濒临灭绝)",
    "collocations": [
      {
        "en": "become extinct",
        "zh": "灭绝"
      },
      {
        "en": "face extinction",
        "zh": "面临灭绝"
      },
      {
        "en": "mass extinction",
        "zh": "大规模灭绝"
      }
    ],
    "realSentence": {
      "en": "Recently, chocolate lovers were heartbroken as scientists claimed that they can become extinct by 2050!",
      "zh": "最近，科学家声称可可树可能在2050年前灭绝，这让巧克力爱好者心碎不已！",
      "source": "2024.12 第2套"
    },
    "confusable": {
      "word": "distinct / instinct",
      "diff": "extinct 灭绝的；distinct 截然不同的；instinct 本能直觉"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v157",
    "day": 7,
    "word": "adapt",
    "phonetic": "/əˈdæpt/",
    "pos": "v.",
    "meaning": "适应（adapt to）；改编，改写（小说/剧本）",
    "examFreq": 15,
    "roots": "ad-(朝向) + apt(适合的) -> 调整自己去适合新环境 -> 适应/改编",
    "mnemonic": "四级头号易混词：a像调整(adjust) -> adapt(适应)；o像选择(option) -> adopt(采纳/收养)！",
    "collocations": [
      {
        "en": "adapt to changes",
        "zh": "适应变化"
      },
      {
        "en": "adapt to consumers' needs",
        "zh": "适应消费者需求"
      },
      {
        "en": "be adapted from",
        "zh": "由……改编而成"
      }
    ],
    "realSentence": {
      "en": "Investing in research to find ways to adapt to consumers' needs.",
      "zh": "投入研发资金，寻找适应消费者需求的方法。",
      "source": "2016.12 第2套"
    },
    "confusable": {
      "word": "adopt / adept",
      "diff": "adapt 适应/改编；adopt 采纳/收养；adept 熟练擅长的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v158",
    "day": 7,
    "word": "adopt",
    "phonetic": "/əˈdɑːpt/",
    "pos": "v.",
    "meaning": "采用，采纳（方法/政策）；正式通过；收养（孩子/宠物）",
    "examFreq": 18,
    "roots": "ad-(朝向) + opt(选择，如 option) -> 挑选过来为己所用 -> 采纳/收养",
    "mnemonic": "抓词根 opt=选择：选(opt)定一个方案叫“采纳”，选定一个孩子回家叫“收养”！",
    "collocations": [
      {
        "en": "adopt a new approach",
        "zh": "采用新方法"
      },
      {
        "en": "adopt a policy",
        "zh": "采纳/通过一项政策"
      },
      {
        "en": "adopt healthy habits",
        "zh": "养成健康习惯"
      }
    ],
    "realSentence": {
      "en": "Self-control enables you to avoid behaviors that don't contribute to your success and adopt those that do.",
      "zh": "自控力能让你避开无助于成功的行为，并采纳那些能促成成功的做法。",
      "source": "2024.06 第2套"
    },
    "confusable": {
      "word": "adapt / adept",
      "diff": "adopt(opt选) 采纳/收养；adapt(apt适合) 适应/改编；adept 精通的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v159",
    "day": 7,
    "word": "affect",
    "phonetic": "/əˈfekt/",
    "pos": "v.",
    "meaning": "影响，作用于；使感动；（疾病）侵袭",
    "examFreq": 49,
    "roots": "af-(朝向) + fect(做，作用) -> 对某对象施加作用 -> 影响",
    "mnemonic": "铁律口诀：A(affect)作 Action 动词“影响”；E(effect)常作名词“效果影响”！",
    "collocations": [
      {
        "en": "adversely affect",
        "zh": "产生不利影响"
      },
      {
        "en": "affect research outcomes",
        "zh": "影响研究结果"
      },
      {
        "en": "be deeply affected by",
        "zh": "深受……影响"
      }
    ],
    "realSentence": {
      "en": "This means that the experience of wearing something affects our attitudes and our choice of behavior.",
      "zh": "这意味着穿着某种衣物的体验会影响我们的态度和行为选择。",
      "source": "2025.06 第2套"
    },
    "confusable": {
      "word": "effect / effort",
      "diff": "affect(v.) 影响；effect(n.) 效果/影响；effort(n.) 努力"
    },
    "tag": "选词常考"
  },
  {
    "id": "v160",
    "day": 7,
    "word": "boost",
    "phonetic": "/buːst/",
    "pos": "v./n.",
    "meaning": "促进，提升，使增长，增强（信心/经济/脑力）",
    "examFreq": 20,
    "roots": "美式英语口语源，意为“从下面托举推高” -> 大幅提振/推动",
    "mnemonic": "像火箭助推器(booster)一样往上猛推 -> boost confidence/economy/efficiency，写作绝佳提分词！",
    "collocations": [
      {
        "en": "boost confidence",
        "zh": "增强信心"
      },
      {
        "en": "boost brainpower",
        "zh": "提升脑力"
      },
      {
        "en": "boost economic growth",
        "zh": "推动经济增长"
      }
    ],
    "realSentence": {
      "en": "A desire for new life challenges can further boost brainpower.",
      "zh": "对新生活挑战的渴望能够进一步提升脑力。",
      "source": "2024.06 第1套"
    },
    "confusable": {
      "word": "boast",
      "diff": "boost 促进提升；boast 自夸/引以为傲地拥有"
    },
    "tag": "选词常考"
  },
  {
    "id": "v161",
    "day": 7,
    "word": "conduct",
    "phonetic": "/kənˈdʌkt/",
    "pos": "v./n.",
    "meaning": "实施，开展（研究/调查）；指挥，传导；[n. /ˈkɑːndʌkt/] 行为举止",
    "examFreq": 22,
    "roots": "con-(共同) + duct(引导) -> 统筹引导一项活动展开 -> 实施/开展",
    "mnemonic": "选词填空黄金动宾搭配：conduct research / an experiment / a survey / business",
    "collocations": [
      {
        "en": "conduct a survey",
        "zh": "开展调查"
      },
      {
        "en": "conduct an experiment",
        "zh": "进行实验"
      },
      {
        "en": "code of conduct",
        "zh": "行为准则"
      }
    ],
    "realSentence": {
      "en": "It seems that wearing formal office wear puts us in the right frame of mind to conduct business.",
      "zh": "穿正式职场装似乎能让我们进入开展商务工作的恰当心态。",
      "source": "2025.06 第2套"
    },
    "confusable": {
      "word": "construct / instruct",
      "diff": "conduct 开展/行为；construct 建造构建；instruct 指导/命令"
    },
    "tag": "选词常考"
  },
  {
    "id": "v162",
    "day": 7,
    "word": "contribute",
    "phonetic": "/kənˈtrɪbjuːt/",
    "pos": "v.",
    "meaning": "促成，导致（contribute to）；贡献，捐献；投稿",
    "examFreq": 34,
    "roots": "con-(共同) + tribute(给予，进贡) -> 各自拿出一份给整体 -> 贡献/促成",
    "mnemonic": "阅读避坑：contribute to 不一定表好事！也常译“导致/造成”（如 contribute to stress）",
    "collocations": [
      {
        "en": "contribute to success",
        "zh": "有助于成功"
      },
      {
        "en": "contribute to climate change",
        "zh": "导致气候变化"
      },
      {
        "en": "make a contribution to",
        "zh": "对……作出贡献"
      }
    ],
    "realSentence": {
      "en": "Conventional fixes like word puzzles and brain-training apps can contribute to mental durability.",
      "zh": "填字游戏和健脑应用等常规方法有助于提升思维耐力。",
      "source": "2024.06 第1套"
    },
    "confusable": {
      "word": "attribute / distribute",
      "diff": "contribute 贡献/促成；attribute 归因于；distribute 分发/分布"
    },
    "tag": "选词常考"
  },
  {
    "id": "v163",
    "day": 7,
    "word": "decline",
    "phonetic": "/dɪˈklaɪn/",
    "pos": "v./n.",
    "meaning": "下降，衰退，减少；[熟词僻义 v.] 婉言谢绝（邀请/提议）",
    "examFreq": 18,
    "roots": "de-(向下) + cline(倾斜) -> 曲线向下滑落 -> 下降；低头推辞 -> 婉拒",
    "mnemonic": "下滑(de+cline)表“下降/衰退”；听力高频熟词僻义：decline an invitation = 婉拒邀请",
    "collocations": [
      {
        "en": "on the decline",
        "zh": "在走下坡路"
      },
      {
        "en": "a sharp decline",
        "zh": "急剧下降"
      },
      {
        "en": "politely decline",
        "zh": "礼貌婉拒"
      }
    ],
    "realSentence": {
      "en": "Just as height usually declines over the years, so does brain volume: Humans lose about 4 percent every decade starting in their 40s.",
      "zh": "正如身高通常会随年龄增长而降低一样，脑容量也会如此：人类从40多岁起每十年约减少4%。",
      "source": "2024.06 第1套"
    },
    "confusable": {
      "word": "incline / recline",
      "diff": "decline 下降/婉拒；incline 倾向于(be inclined to)；recline 斜倚躺靠"
    },
    "tag": "选词常考"
  },
  {
    "id": "v164",
    "day": 7,
    "word": "enable",
    "phonetic": "/ɪˈneɪbl/",
    "pos": "v.",
    "meaning": "使能够，使成为可能，赋能（enable sb. to do）",
    "examFreq": 31,
    "roots": "en-(使成为) + able(有能力的) -> 赋予某人能力 -> 使能够",
    "mnemonic": "作文高频万能句型：Technology enables us to access resources effortlessly（秒杀 let/make）",
    "collocations": [
      {
        "en": "enable sb. to do sth.",
        "zh": "使某人能够做某事"
      },
      {
        "en": "enable faster communication",
        "zh": "实现更快捷的沟通"
      },
      {
        "en": "enabled by AI",
        "zh": "由人工智能赋能"
      }
    ],
    "realSentence": {
      "en": "Groups like these will help you refine your analytical skills and enable you to express yourself better.",
      "zh": "这类社团将帮助你打磨分析能力，并使你能更好地表达自己。",
      "source": "2019.12 第2套听力"
    },
    "confusable": {
      "word": "unable / disable",
      "diff": "enable(v.) 使能够；unable(adj.) 不能的；disable(v.) 使伤残/禁用"
    },
    "tag": "选词常考"
  },
  {
    "id": "v165",
    "day": 7,
    "word": "enhance",
    "phonetic": "/ɪnˈhæns/",
    "pos": "v.",
    "meaning": "增强，提高，增进（价值/质量/吸引力/能力）",
    "examFreq": 22,
    "roots": "en-(使) + hance(源自拉丁语 altus 高) -> 把品质抬高 -> 增强/提升",
    "mnemonic": "选词与作文双料王牌：enhance efficiency/reputation/social skills，高级替换 improve！",
    "collocations": [
      {
        "en": "enhance social skills",
        "zh": "提升社交技能"
      },
      {
        "en": "enhance efficiency",
        "zh": "提高效率"
      },
      {
        "en": "enhance competitiveness",
        "zh": "增强竞争力"
      }
    ],
    "realSentence": {
      "en": "Schools and prisons with craft programs report that they have a calming effect and enhance social skills.",
      "zh": "开设手工艺课程的学校和监狱报告称，这些活动能起到安抚情绪的作用并提升社交技能。",
      "source": "2017.12 第2套"
    },
    "confusable": {
      "word": "advance / enlarge",
      "diff": "enhance 提高品质/声誉/能力；advance 推进；enlarge 放大尺寸规模"
    },
    "tag": "选词常考"
  },
  {
    "id": "v166",
    "day": 7,
    "word": "ensure",
    "phonetic": "/ɪnˈʃʊr/",
    "pos": "v.",
    "meaning": "确保，保证（事情发生或落实）",
    "examFreq": 25,
    "roots": "en-(使) + sure(确定的) -> 使结果确定无疑 -> 确保",
    "mnemonic": "三剑客速分：ensure 确保(某事发生)；insure 给……投保(insurance)；assure 向某人保证(assure sb. that)",
    "collocations": [
      {
        "en": "ensure safety",
        "zh": "确保安全"
      },
      {
        "en": "ensure that...",
        "zh": "确保……"
      },
      {
        "en": "ensure compliance",
        "zh": "确保遵从/依从性"
      }
    ],
    "realSentence": {
      "en": "Driver training for self-driving vehicles can help ensure that drivers fully understand system capabilities and limitations.",
      "zh": "针对自动驾驶汽车的驾驶培训有助于确保驾驶者充分了解系统的能力与局限。",
      "source": "2024.12 第3套"
    },
    "confusable": {
      "word": "insure / assure",
      "diff": "ensure 确保某事；insure 买保险；assure 向某人打包票(assure sb. of/that)"
    },
    "tag": "选词常考"
  },
  {
    "id": "v167",
    "day": 7,
    "word": "expand",
    "phonetic": "/ɪkˈspænd/",
    "pos": "v.",
    "meaning": "扩大，扩张，拓展（规模/视野/业务）；详述",
    "examFreq": 17,
    "roots": "ex-(向外) + pand(展开，铺开) -> 向四周铺展开来 -> 扩张/拓展",
    "mnemonic": "记区分：expand 向四周“膨胀扩大”(业务/视野)；extend 沿直线“拉长延伸”(期限/道路)",
    "collocations": [
      {
        "en": "expand one's horizons",
        "zh": "拓宽视野"
      },
      {
        "en": "expand the market",
        "zh": "拓展市场"
      },
      {
        "en": "rapidly expanding",
        "zh": "迅速扩张的"
      }
    ],
    "realSentence": {
      "en": "Unfortunately, that comfort can hinder the very learning that can expand your company and your career.",
      "zh": "不幸的是，那种安逸感恰恰会阻碍能助你壮大公司和拓展事业的学习。",
      "source": "2015.12 第3套"
    },
    "confusable": {
      "word": "extend / expend",
      "diff": "expand 面积/规模扩大；extend 时间/长度延伸；expend 花费耗费"
    },
    "tag": "选词常考"
  },
  {
    "id": "v168",
    "day": 7,
    "word": "handle",
    "phonetic": "/ˈhændl/",
    "pos": "v./n.",
    "meaning": "处理，应对，解决；搬运，操纵；[n.] 把手，柄",
    "examFreq": 12,
    "roots": "hand(手) + -le(反复动作后缀) -> 亲手拿捏料理 -> 处理/应对",
    "mnemonic": "手(hand)里握着把柄(handle) -> 游刃有余地“处理/应对”，同义替换 deal with / cope with",
    "collocations": [
      {
        "en": "handle conflicts",
        "zh": "处理冲突"
      },
      {
        "en": "handle pressure",
        "zh": "应对压力"
      },
      {
        "en": "handle the situation",
        "zh": "应对局面"
      }
    ],
    "realSentence": {
      "en": "In order to learn the art of persuasion at the workplace, you need to understand how to handle conflicts and reach agreements.",
      "zh": "为了掌握职场中的说服艺术，你需要懂得如何处理冲突并达成共识。",
      "source": "2024.06 第3套"
    },
    "confusable": null,
    "tag": "选词常考"
  },
  {
    "id": "v169",
    "day": 7,
    "word": "maintain",
    "phonetic": "/meɪnˈteɪn/",
    "pos": "v.",
    "meaning": "维持，保持；维修保养；[熟词僻义] 坚持认为，主张（maintain that）",
    "examFreq": 25,
    "roots": "main(手，源自 manu) + tain(拿住) -> 用手牢牢稳住 -> 维持/坚持主张",
    "mnemonic": "四级阅读超级高频熟词僻义：Researchers maintain that... = 研究人员“主张/坚持认为”！",
    "collocations": [
      {
        "en": "maintain relationships",
        "zh": "维系关系"
      },
      {
        "en": "maintain a balance",
        "zh": "保持平衡"
      },
      {
        "en": "maintain that...",
        "zh": "坚持主张……"
      }
    ],
    "realSentence": {
      "en": "Successful persuasion skills are based on your ability to have positive interactions and maintain meaningful relationships with people.",
      "zh": "成功的说服技巧建立在你与他人进行积极互动并维系有意义关系的能力之上。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "retain / sustain / attain",
      "diff": "maintain 维持/保养/主张；retain 保留留住；sustain 长期支撑维持；attain 获得达到"
    },
    "tag": "选词常考"
  },
  {
    "id": "v170",
    "day": 7,
    "word": "occur",
    "phonetic": "/əˈkɜːr/",
    "pos": "v.",
    "meaning": "发生，出现；[熟词僻义] 突然被想到（It occurs to sb. that...）",
    "examFreq": 24,
    "roots": "oc-(朝向) + cur(跑，如 current) -> 迎面跑过来 -> 发生/涌上心头",
    "mnemonic": "不及物动词，绝对不能用被动语态！过去式双写 r：occurred；句型 It occurred to me that...(我突然想到)",
    "collocations": [
      {
        "en": "occur frequently",
        "zh": "频繁发生"
      },
      {
        "en": "it occurs to sb. that",
        "zh": "某人突然想到……"
      },
      {
        "en": "naturally occurring",
        "zh": "自然发生的"
      }
    ],
    "realSentence": {
      "en": "She then talks about health issues and the physical damage that can occur as the result of dieting.",
      "zh": "接着她谈到了健康问题以及节食可能引发的身体损害。",
      "source": "2016.06 第2套听力"
    },
    "confusable": {
      "word": "recur / incur",
      "diff": "occur 发生/想到；recur 再次发生/复发；incur 招致(损失/债务)"
    },
    "tag": "选词常考"
  },
  {
    "id": "v171",
    "day": 7,
    "word": "prevent",
    "phonetic": "/prɪˈvent/",
    "pos": "v.",
    "meaning": "预防，防止，阻止（prevent... from doing）",
    "examFreq": 43,
    "roots": "pre-(在前面) + vent(来) -> 提前赶到前面挡住 -> 预防/阻止",
    "mnemonic": "固定结构 prevent sb./sth. (from) doing sth.；名言 Prevention is better than cure(预防胜于治疗)",
    "collocations": [
      {
        "en": "prevent disease",
        "zh": "预防疾病"
      },
      {
        "en": "prevent... from doing",
        "zh": "阻止……做某事"
      },
      {
        "en": "disease prevention",
        "zh": "疾病预防"
      }
    ],
    "realSentence": {
      "en": "Activities helpful in the prevention of Alzheimer's also prevent heart disease.",
      "zh": "有助于预防阿尔茨海默病的活动同样能预防心脏病。",
      "source": "2026.06 第2套"
    },
    "confusable": {
      "word": "protect",
      "diff": "prevent 阻止坏事发生；protect 保护对象免受伤害(protect...from)"
    },
    "tag": "选词常考"
  },
  {
    "id": "v172",
    "day": 7,
    "word": "reflect",
    "phonetic": "/rɪˈflekt/",
    "pos": "v.",
    "meaning": "反映，体现；反思，深思（reflect on）；反射（光/影）",
    "examFreq": 22,
    "roots": "re-(向回) + flect(弯曲，折射) -> 光线或思绪折回来 -> 反射/反映/反思",
    "mnemonic": "一词三用：reflect a trend(反映趋势)、reflect on one's mistakes(反思错误)、reflect light(反射光)",
    "collocations": [
      {
        "en": "reflect on",
        "zh": "反思，仔细思考"
      },
      {
        "en": "reflect reality",
        "zh": "反映现实"
      },
      {
        "en": "self-reflection",
        "zh": "自我反思"
      }
    ],
    "realSentence": {
      "en": "But saying you are 30 percent East Asian or American hardly reflects your real ancestry.",
      "zh": "但说你有30%的东亚或美洲血统，几乎无法反映你真正的祖源。",
      "source": "2025.12 第3套"
    },
    "confusable": {
      "word": "inflict / deflect",
      "diff": "reflect 反映/反思/反射；inflict 施加痛苦打击；deflect 使偏斜/转移"
    },
    "tag": "选词常考"
  },
  {
    "id": "v173",
    "day": 7,
    "word": "rely",
    "phonetic": "/rɪˈlaɪ/",
    "pos": "v.",
    "meaning": "依赖，依靠，信赖（rely on / upon）",
    "examFreq": 22,
    "roots": "re-(加强) + ly(源自拉丁语 ligare 绑定) -> 紧紧绑定在某人/物上 -> 依赖",
    "mnemonic": "选词填空见空后有 on/upon 秒想 rely/depend/count！形容词 reliable(可靠的)",
    "collocations": [
      {
        "en": "rely heavily on",
        "zh": "严重依赖"
      },
      {
        "en": "rely on technology",
        "zh": "依赖科技"
      },
      {
        "en": "reliable source",
        "zh": "可靠来源"
      }
    ],
    "realSentence": {
      "en": "Besides, teamwork and leadership rely heavily on the power of persuasion to get things done.",
      "zh": "此外，团队合作与领导力都高度依赖说服力来促成事情完成。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "relay / reply",
      "diff": "rely(on) 依赖信赖；relay 转播/接力；reply 回复答复"
    },
    "tag": "选词常考"
  },
  {
    "id": "v174",
    "day": 7,
    "word": "remove",
    "phonetic": "/rɪˈmuːv/",
    "pos": "v.",
    "meaning": "去除，清除，移走；脱掉；免除（职务）",
    "examFreq": 20,
    "roots": "re-(离开) + move(移动) -> 移开拿走 -> 去除/移除",
    "mnemonic": "把障碍或杂质移(move)走(re) -> 清除障碍 remove obstacles/barriers",
    "collocations": [
      {
        "en": "remove harmful substances",
        "zh": "清除有害物质"
      },
      {
        "en": "remove obstacles",
        "zh": "消除障碍"
      },
      {
        "en": "remove from office",
        "zh": "免职"
      }
    ],
    "realSentence": {
      "en": "However, \"the whole concept of a juice diet helping to remove poisonous or harmful substances from the body is completely false,\" says Clemens.",
      "zh": "然而克莱门斯指出，“靠果汁饮食帮助清除体内有毒有害物质的整个说法完全是错误的。”",
      "source": "2025.06 第2套"
    },
    "confusable": {
      "word": "remote",
      "diff": "remove(v.) 移除清除；remote(adj.) 遥远的/远程的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v175",
    "day": 7,
    "word": "replace",
    "phonetic": "/rɪˈpleɪs/",
    "pos": "v.",
    "meaning": "取代，替换（replace A with B）；把……放回原处",
    "examFreq": 20,
    "roots": "re-(再次/放回) + place(放置) -> 拿新物放进旧位置 -> 取代/放回",
    "mnemonic": "注意方向：replace A with B = 用 B 取代 A！（同义替换 substitute B for A）",
    "collocations": [
      {
        "en": "replace A with B",
        "zh": "用B取代A"
      },
      {
        "en": "be replaced by AI",
        "zh": "被人工智能取代"
      },
      {
        "en": "irreplaceable role",
        "zh": "不可替代的作用"
      }
    ],
    "realSentence": {
      "en": "For workers, especially low-paid workers, who desperately need their jobs yet know they can be easily replaced, gamification may feel more like the Hunger Games.",
      "zh": "对于那些迫切需要工作却深知自己随时会被轻易取代的员工——尤其是低薪员工——而言，工作游戏化听起来更像《饥饿游戏》。",
      "source": "2016.12 第3套"
    },
    "confusable": {
      "word": "displace / substitute",
      "diff": "replace 常规替换；displace 迫使离开/取代岗位；substitute(B for A) 用B暂代A"
    },
    "tag": "选词常考"
  },
  {
    "id": "v176",
    "day": 7,
    "word": "require",
    "phonetic": "/rɪˈkwaɪər/",
    "pos": "v.",
    "meaning": "需要，依赖；要求，规定（require sb. to do）",
    "examFreq": 49,
    "roots": "re-(反复) + quire(寻求) -> 一再索求 -> 需要/要求",
    "mnemonic": "选词和写作高频：require(需要/客观要求) 后接 doing 表被动（= need to be done）",
    "collocations": [
      {
        "en": "require effort",
        "zh": "需要付出努力"
      },
      {
        "en": "meet the requirements",
        "zh": "满足要求"
      },
      {
        "en": "be required to do",
        "zh": "被要求做某事"
      }
    ],
    "realSentence": {
      "en": "Plastic water bottles require oceans of fossil fuels to make and ship.",
      "zh": "塑料水瓶的生产与运输需要消耗海量化石燃料。",
      "source": "2024.12 第2套"
    },
    "confusable": {
      "word": "acquire / inquire",
      "diff": "require 需要要求；acquire 习得获得；inquire 询问调查"
    },
    "tag": "选词常考"
  },
  {
    "id": "v177",
    "day": 7,
    "word": "respond",
    "phonetic": "/rɪˈspɑːnd/",
    "pos": "v.",
    "meaning": "回应，回答，作出反应（respond to）",
    "examFreq": 19,
    "roots": "re-(回) + spond(承诺，回答) -> 作出回话和应对 -> 回应/反应",
    "mnemonic": "不及物动词必须配 to：respond to challenges(应对挑战)；名词 response(in response to)",
    "collocations": [
      {
        "en": "respond to challenges",
        "zh": "应对挑战"
      },
      {
        "en": "respond promptly",
        "zh": "迅速回应"
      },
      {
        "en": "in response to",
        "zh": "作为对……的回应"
      }
    ],
    "realSentence": {
      "en": "In April 1649, locals responded to high prices and food shortages by cultivating vegetables on common land in Southern England.",
      "zh": "1649年4月，英格兰南部的当地人通过在公地上种植蔬菜来应对高物价和粮食短缺。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "correspond / sponsor",
      "diff": "respond(to) 回应；correspond(to/with) 符合/通信；sponsor 赞助商"
    },
    "tag": "选词常考"
  },
  {
    "id": "v178",
    "day": 7,
    "word": "seek",
    "phonetic": "/siːk/",
    "pos": "v.",
    "meaning": "寻求，寻找，谋求；企图（seek to do）",
    "examFreq": 31,
    "roots": "古英语 secan(追寻，探索) -> 主动追寻目标 -> 寻求",
    "mnemonic": "牢记不规则变化：seek - sought - sought！高分写作替代 look for / try to",
    "collocations": [
      {
        "en": "seek approval",
        "zh": "寻求认可"
      },
      {
        "en": "seek solutions",
        "zh": "寻求解决方案"
      },
      {
        "en": "seek to do sth.",
        "zh": "试图/力求做某事"
      }
    ],
    "realSentence": {
      "en": "As you become more capable of providing yourself with the approval you seek, your need for external validation will start to vanish, leaving you stronger, more confident, and yes, happier in your life.",
      "zh": "当你越有能力给自己提供所寻求的认可时，你对外界肯定的需求便会逐渐消退，从而变得更坚强、更自信、也更快乐。",
      "source": "2024.06 第1套"
    },
    "confusable": null,
    "tag": "选词常考"
  },
  {
    "id": "v179",
    "day": 7,
    "word": "shift",
    "phonetic": "/ʃɪft/",
    "pos": "v./n.",
    "meaning": "转变，转移，移动；[n.] 转变；轮班，班次（night shift）",
    "examFreq": 26,
    "roots": "古英语 sciftan(划分，调换) -> 切换方向或换班 -> 转变/轮班",
    "mnemonic": "键盘上的 Shift(切换键)！阅读表“观念/重心转移”，听力职场表“倒班/轮班”",
    "collocations": [
      {
        "en": "mindset shift",
        "zh": "思维转变"
      },
      {
        "en": "shift from A to B",
        "zh": "从A转向B"
      },
      {
        "en": "work a night shift",
        "zh": "上夜班"
      }
    ],
    "realSentence": {
      "en": "Only a very few have shifted to cycling, and even those almost certainly won't cycle in Boston's snowy winters.",
      "zh": "只有极少数人转向了骑行，而且即便是这些人，在波士顿大雪纷飞的冬季也几乎肯定不会骑车。",
      "source": "2025.12 第1套"
    },
    "confusable": {
      "word": "swift / shaft",
      "diff": "shift 转移/轮班；swift 迅速敏捷的；shaft 轴/竖井"
    },
    "tag": "选词常考"
  },
  {
    "id": "v180",
    "day": 7,
    "word": "suffer",
    "phonetic": "/ˈsʌfər/",
    "pos": "v.",
    "meaning": "遭受，经历（痛苦/损失）；患病（suffer from）；变糟",
    "examFreq": 26,
    "roots": "suf-(在下面) + fer(承受，扛) -> 在重压之下苦苦承受 -> 遭受/受苦",
    "mnemonic": "直接接损失(suffer heavy losses)，配 from 接病痛或困境(suffer from depression/stress)",
    "collocations": [
      {
        "en": "suffer from stress",
        "zh": "饱受压力困扰"
      },
      {
        "en": "suffer heavy losses",
        "zh": "遭受惨重损失"
      },
      {
        "en": "suffer from sleep loss",
        "zh": "遭受睡眠不足之苦"
      }
    ],
    "realSentence": {
      "en": "People who systematically underestimate themselves and their own performance suffer from the so-called Impostor Phenomenon.",
      "zh": "那些习惯性低估自己和自身表现的人，正受到所谓“冒充者现象”的困扰。",
      "source": "2026.06 第2套"
    },
    "confusable": {
      "word": "offer / differ",
      "diff": "suffer 遭受受苦；offer 提供；differ 不同于"
    },
    "tag": "选词常考"
  },
  {
    "id": "v181",
    "day": 7,
    "word": "tend",
    "phonetic": "/tend/",
    "pos": "v.",
    "meaning": "往往会，趋向（tend to do）；[熟词僻义] 照料，护理（病人/花园）",
    "examFreq": 52,
    "roots": "拉丁词根 tend-(伸展，趋向) -> 朝某方向倾斜 -> 往往会/照料",
    "mnemonic": "四级阅读超级高频缓冲动词：people tend to...(人们往往倾向于……)，名词 tendency(趋势)",
    "collocations": [
      {
        "en": "tend to do sth.",
        "zh": "往往会/倾向于做某事"
      },
      {
        "en": "have a tendency to",
        "zh": "有……的倾向"
      },
      {
        "en": "tend the garden",
        "zh": "照料花园"
      }
    ],
    "realSentence": {
      "en": "Studies have found that people tend to be less open and less able to relax when they wear formal clothes.",
      "zh": "研究发现，人们穿正装时往往会显得不那么敞开心扉，也更难放松下来。",
      "source": "2025.06 第2套"
    },
    "confusable": {
      "word": "attend / intend / extend",
      "diff": "tend 倾向于/照料；attend 出席；intend 打算；extend 延伸"
    },
    "tag": "选词常考"
  },
  {
    "id": "v182",
    "day": 7,
    "word": "recognize",
    "phonetic": "/ˈrekəɡnaɪz/",
    "pos": "v.",
    "meaning": "认出，辨认；承认，意识到（importance）；表彰，认可",
    "examFreq": 12,
    "roots": "re-(再次) + cogn(知道，如 cognitive) + -ize -> 再次知晓确认 -> 认出/承认",
    "mnemonic": "阅读中 recognize that... 常考“认识到/承认”，同义替换 realize / acknowledge",
    "collocations": [
      {
        "en": "recognize the importance of",
        "zh": "认识到……的重要性"
      },
      {
        "en": "widely recognized",
        "zh": "被广泛认可的"
      },
      {
        "en": "facial recognition",
        "zh": "人脸识别"
      }
    ],
    "realSentence": {
      "en": "Great leaders recognize the weak signals or slight signs that point to big changes to come.",
      "zh": "卓越的领导者能够识别出预示重大变革即将到来的微弱信号或细微迹象。",
      "source": "2017.06 第3套"
    },
    "confusable": {
      "word": "realize / reorganize",
      "diff": "recognize 认出/承认/表彰；realize 意识到/实现；reorganize 重组"
    },
    "tag": "选词常考"
  },
  {
    "id": "v183",
    "day": 8,
    "word": "crucial",
    "phonetic": "/ˈkruːʃl/",
    "pos": "adj.",
    "meaning": "至关重要的，决定性的，关键的",
    "examFreq": 12,
    "roots": "cruc(十字路口 cross) + -ial -> 站在命运十字路口的一步 -> 至关重要的",
    "mnemonic": "十字路口(cruc)的抉择决定成败！作文告别 important，直接上 play a crucial role in",
    "collocations": [
      {
        "en": "play a crucial role in",
        "zh": "在……中起至关重要的作用"
      },
      {
        "en": "be crucial to",
        "zh": "对……至关重要"
      },
      {
        "en": "a crucial factor",
        "zh": "关键因素"
      }
    ],
    "realSentence": {
      "en": "Lifelong learning is crucial to our life and career in modern society.",
      "zh": "在现代社会，终身学习对我们的生活和事业至关重要。",
      "source": "2015.12 第2套"
    },
    "confusable": {
      "word": "cruel / critical",
      "diff": "crucial 至关重要的；cruel 残忍的；critical 关键的/批判性的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v184",
    "day": 8,
    "word": "significant",
    "phonetic": "/sɪɡˈnɪfɪkənt/",
    "pos": "adj.",
    "meaning": "显著的，大幅度的；有重大意义的，重要的",
    "examFreq": 16,
    "roots": "sign(记号，标志) + ific(做) + -ant -> 醒目得做出大标记的 -> 显著的/重大的",
    "mnemonic": "数据图表和作文万能替换词：significant improvement/impact/difference",
    "collocations": [
      {
        "en": "significant improvement",
        "zh": "显著改善"
      },
      {
        "en": "significant impact",
        "zh": "重大影响"
      },
      {
        "en": "of great significance",
        "zh": "具有重要意义"
      }
    ],
    "realSentence": {
      "en": "A 2009 University of British Columbia study of 38 women with an eating disorder who were taught to knit found that learning the craft led to significant improvements.",
      "zh": "不列颠哥伦比亚大学2009年对38名学习编织的进食障碍女性的研究发现，学习这项手艺带来了显著改善。",
      "source": "2017.12 第2套"
    },
    "confusable": {
      "word": "magnificent",
      "diff": "significant 显著的/重大的；magnificent 壮丽的/宏伟的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v185",
    "day": 8,
    "word": "essential",
    "phonetic": "/ɪˈsenʃl/",
    "pos": "adj./n.",
    "meaning": "必不可少的，极其重要的；本质的；[n.] 必需品",
    "examFreq": 8,
    "roots": "ess(存在，本质 essence) + -ential -> 关乎存亡本质的 -> 必不可少的",
    "mnemonic": "词根 essence(本质/精华) -> 缺它不行的！搭配 be essential for/to",
    "collocations": [
      {
        "en": "be essential to",
        "zh": "对……必不可少"
      },
      {
        "en": "daily essentials",
        "zh": "日常必需品"
      },
      {
        "en": "essentially",
        "zh": "本质上，基本上"
      }
    ],
    "realSentence": {
      "en": "Speed, of course, is essential to the drive-through experience.",
      "zh": "当然，速度对于免下车购餐体验而言至关重要。",
      "source": "2018.06 第2套听力"
    },
    "confusable": {
      "word": "potential",
      "diff": "essential 必不可少的/本质的；potential 潜在的/潜力"
    },
    "tag": "选词常考"
  },
  {
    "id": "v186",
    "day": 8,
    "word": "massive",
    "phonetic": "/ˈmæsɪv/",
    "pos": "adj.",
    "meaning": "大规模的，巨大的，厚重的，严重的",
    "examFreq": 7,
    "roots": "mass(大量，团块) + -ive(形容词后缀) -> 聚成一大团的 -> 巨大的/大规模的",
    "mnemonic": "mass(大块/大众)+ive -> 比 big 高级十倍的选词与作文词：a massive amount of",
    "collocations": [
      {
        "en": "a massive amount of",
        "zh": "大量的"
      },
      {
        "en": "massive decline",
        "zh": "大幅下降"
      },
      {
        "en": "massive infrastructure",
        "zh": "庞大的基础设施"
      }
    ],
    "realSentence": {
      "en": "The massive decline in sleep happened so slowly and quietly that few seemed to notice the trend.",
      "zh": "睡眠时间的大幅缩减发生得如此缓慢而悄无声息，以至于几乎没人察觉这一趋势。",
      "source": "2016.06 第1套听力"
    },
    "confusable": {
      "word": "passive",
      "diff": "massive 巨大的/大规模的；passive 被动的/消极的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v187",
    "day": 8,
    "word": "enormous",
    "phonetic": "/ɪˈnɔːrməs/",
    "pos": "adj.",
    "meaning": "庞大的，极大的，巨额的",
    "examFreq": 7,
    "roots": "e-(超出) + norm(常规标准) + -ous -> 超出正常尺度很多 -> 极大的/庞大的",
    "mnemonic": "超出(e)正常标准(norm) -> 大到惊人！搭配 enormous benefits/pressure/potential",
    "collocations": [
      {
        "en": "enormous benefits",
        "zh": "巨大的益处"
      },
      {
        "en": "enormous pressure",
        "zh": "巨大的压力"
      },
      {
        "en": "enormous capacity",
        "zh": "惊人的容量/能力"
      }
    ],
    "realSentence": {
      "en": "Single-sex education can have enormous benefits for female students.",
      "zh": "单一性别教育对女学生而言可能带来巨大益处。",
      "source": "2019.12 第1套听力"
    },
    "confusable": {
      "word": "numerous",
      "diff": "enormous 体积/程度庞大的；numerous(number) 数量众多的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v188",
    "day": 8,
    "word": "extraordinary",
    "phonetic": "/ɪkˈstrɔːrdəneri/",
    "pos": "adj.",
    "meaning": "非凡的，卓越的，意想不到的，格外的",
    "examFreq": 12,
    "roots": "extra-(超出……之外) + ordinary(普通的) -> 超脱平庸之外 -> 非凡的",
    "mnemonic": "一刀切两半：extra(超出)+ordinary(平凡) = 超凡脱俗、非同寻常！",
    "collocations": [
      {
        "en": "extraordinary results",
        "zh": "非凡的成果"
      },
      {
        "en": "extraordinary talent",
        "zh": "卓越的才华"
      },
      {
        "en": "extraordinary achievement",
        "zh": "非凡成就"
      }
    ],
    "realSentence": {
      "en": "A couple of recent papers have finally opened a window on these people's extraordinary minds.",
      "zh": "最近发表的几篇论文终于为我们打开了一扇窥探这些非凡头脑的窗口。",
      "source": "2017.06 第1套"
    },
    "confusable": {
      "word": "ordinary",
      "diff": "extraordinary 非凡卓越的；ordinary 普通的平凡的（反义）"
    },
    "tag": "选词常考"
  },
  {
    "id": "v189",
    "day": 8,
    "word": "conventional",
    "phonetic": "/kənˈvenʃənl/",
    "pos": "adj.",
    "meaning": "传统的，常规的，循规蹈矩的",
    "examFreq": 17,
    "roots": "con-(共同) + vent(来) + -ion + -al -> 大家聚在一起约定俗成的 -> 常规的/传统的",
    "mnemonic": "阅读高频同义替换：conventional = traditional(传统的)，常与 innovative/organic 构成对比！",
    "collocations": [
      {
        "en": "conventional wisdom",
        "zh": "传统观念/普遍看法"
      },
      {
        "en": "conventional methods",
        "zh": "常规方法"
      },
      {
        "en": "conventional products",
        "zh": "常规产品"
      }
    ],
    "realSentence": {
      "en": "Over the past 10 years, Canada has seen more food-safety recalls for organic products, proportionally, than for conventional products.",
      "zh": "过去10年间，按比例计算，加拿大有机食品的食品安全召回次数多于常规产品。",
      "source": "2026.06 第1套"
    },
    "confusable": {
      "word": "convenient / controversial",
      "diff": "conventional 传统的常规的；convenient 方便的；controversial 有争议的"
    },
    "tag": "同义替换"
  },
  {
    "id": "v190",
    "day": 8,
    "word": "vulnerable",
    "phonetic": "/ˈvʌlnərəbl/",
    "pos": "adj.",
    "meaning": "脆弱的，易受伤害的，易受影响的（be vulnerable to）",
    "examFreq": 10,
    "roots": "拉丁词根 vulner-(伤口，创伤) + -able(易于……的) -> 容易受伤的 -> 脆弱的",
    "mnemonic": "选词填空超高频词！常配介词 to：vulnerable groups(弱势群体)、vulnerable to interference",
    "collocations": [
      {
        "en": "vulnerable groups",
        "zh": "弱势群体"
      },
      {
        "en": "be vulnerable to",
        "zh": "易受……伤害/影响"
      },
      {
        "en": "economically vulnerable",
        "zh": "经济上脆弱的"
      }
    ],
    "realSentence": {
      "en": "The article also explained how advertising campaigns specifically target very young and poor people, causing harm for these vulnerable groups.",
      "zh": "文章还解释了广告营销如何专门瞄准年幼和贫困人群，给这些弱势群体造成伤害。",
      "source": "2025.12 第2套"
    },
    "confusable": {
      "word": "valuable",
      "diff": "vulnerable 脆弱易受伤的；valuable 宝贵有价值的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v191",
    "day": 8,
    "word": "sensitive",
    "phonetic": "/ˈsensətɪv/",
    "pos": "adj.",
    "meaning": "敏感的，灵敏的（sensitive to）；体贴的；机密的",
    "examFreq": 10,
    "roots": "sens(感觉) + -itive -> 感觉神经极敏锐的 -> 敏感的",
    "mnemonic": "死盯易混词：sensitive(感觉敏感的，如对咖啡因/批评敏感) vs sensible(明智合情理的，如 a sensible decision)！",
    "collocations": [
      {
        "en": "be sensitive to",
        "zh": "对……敏感"
      },
      {
        "en": "sensitive information",
        "zh": "敏感信息"
      },
      {
        "en": "culturally sensitive",
        "zh": "有文化敏感度的"
      }
    ],
    "realSentence": {
      "en": "\"You'd expect that people who are particularly sensitive to the bitter taste of caffeine would drink less coffee,\" said study senior researcher Marilyn Cornelis.",
      "zh": "该研究资深研究员玛丽莲·科内利斯说：“人们通常会以为，对咖啡因苦味格外敏感的人会少喝咖啡。”",
      "source": "2026.06 第2套"
    },
    "confusable": {
      "word": "sensible / sensory",
      "diff": "sensitive 敏感的/体贴的；sensible 明智合理的；sensory 感官的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v192",
    "day": 8,
    "word": "persistent",
    "phonetic": "/pərˈsɪstənt/",
    "pos": "adj.",
    "meaning": "坚持不懈的，执着的；持续存在的，顽固的（问题/病痛）",
    "examFreq": 7,
    "roots": "per-(贯穿始终) + sist(站立) + -ent -> 从头到尾一直站着不倒 -> 坚持的/持续的",
    "mnemonic": "动词 persist in(坚持)，名词 persistence(毅力)；形容问题时译作“长期存在的/顽固的”",
    "collocations": [
      {
        "en": "persistent effort",
        "zh": "坚持不懈的努力"
      },
      {
        "en": "persistent problem",
        "zh": "长期存在的问题"
      },
      {
        "en": "persistent pain",
        "zh": "持续性疼痛"
      }
    ],
    "realSentence": {
      "en": "But there are other reasons why the pay gap remains so persistent.",
      "zh": "但薪酬差距之所以如此持久难消，还有其他原因。",
      "source": "2014.06 第1套"
    },
    "confusable": {
      "word": "consistent / resistant",
      "diff": "persistent 持续的/执着的；consistent 一致的；resistant 抵抗的/有耐受力的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v193",
    "day": 8,
    "word": "reluctant",
    "phonetic": "/rɪˈlʌktənt/",
    "pos": "adj.",
    "meaning": "不情愿的，勉强的（be reluctant to do）",
    "examFreq": 8,
    "roots": "re-(向回) + luct(挣扎) + -ant -> 往回拽着挣扎不肯走 -> 不情愿的",
    "mnemonic": "阅读高频态度与细节词：be reluctant to do = be unwilling to do(不情愿做某事)",
    "collocations": [
      {
        "en": "be reluctant to do",
        "zh": "不情愿做某事"
      },
      {
        "en": "reluctant acceptance",
        "zh": "勉强接受"
      },
      {
        "en": "with reluctance",
        "zh": "勉强地"
      }
    ],
    "realSentence": {
      "en": "More female professionals reported being reluctant to work overtime than their male counterparts.",
      "zh": "表示不情愿加班的女性职场人士比例高于男性同行。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "redundant",
      "diff": "reluctant 不情愿的；redundant 多余的/被裁员的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v194",
    "day": 8,
    "word": "sufficient",
    "phonetic": "/səˈfɪʃnt/",
    "pos": "adj.",
    "meaning": "充足的，足够的（同义替换 enough，写作高分词）",
    "examFreq": 7,
    "roots": "suf-(在下面，补足) + fic(做) + -ient -> 底下补做得满满当当 -> 充足的",
    "mnemonic": "写作升级：把 enough 全换成 sufficient！反义 insufficient(不足的)，搭配 far from sufficient(远远不够)",
    "collocations": [
      {
        "en": "far from sufficient",
        "zh": "远远不够"
      },
      {
        "en": "sufficient evidence",
        "zh": "充分的证据"
      },
      {
        "en": "self-sufficient",
        "zh": "自给自足的"
      }
    ],
    "realSentence": {
      "en": "\"This argument is, at best, far from sufficient,\" he writes.",
      "zh": "他写道：“这一论点充其量也远远不够充分。”",
      "source": "2024.06 第1套"
    },
    "confusable": {
      "word": "efficient / deficient",
      "diff": "sufficient 充足的；efficient 高效的；deficient 缺乏不足的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v195",
    "day": 8,
    "word": "relevant",
    "phonetic": "/ˈreləvənt/",
    "pos": "adj.",
    "meaning": "相关的，切题的，有实际意义的（be relevant to）",
    "examFreq": 16,
    "roots": "re-(再) + lev(举起，联系) + -ant -> 能提起来挂上钩的 -> 相关的",
    "mnemonic": "固定介词配 to：be relevant to；加前缀 ir- 变反义词 irrelevant(无关的/跑题的)",
    "collocations": [
      {
        "en": "be relevant to",
        "zh": "与……相关"
      },
      {
        "en": "relevant information",
        "zh": "相关信息"
      },
      {
        "en": "relevant experience",
        "zh": "相关经验"
      }
    ],
    "realSentence": {
      "en": "Some people are beginning to wonder whether opera and classical music are still relevant to the modern world of music.",
      "zh": "一些人开始怀疑，歌剧和古典音乐是否仍与现代音乐世界息息相关。",
      "source": "2025.06 第2套"
    },
    "confusable": {
      "word": "relative",
      "diff": "relevant 切题相关的；relative 相对的/亲戚"
    },
    "tag": "选词常考"
  },
  {
    "id": "v196",
    "day": 8,
    "word": "effective",
    "phonetic": "/ɪˈfektɪv/",
    "pos": "adj.",
    "meaning": "有效的，起作用的；[熟词僻义] 生效的，实际上的",
    "examFreq": 38,
    "roots": "effect(效果) + -ive(有……效果的) -> 能达成预期效果的 -> 有效的",
    "mnemonic": "盯牢辨析：effective 重在“达成效果”(effective medicine 有效药)，efficient 重在“省时高效”",
    "collocations": [
      {
        "en": "effective communication",
        "zh": "有效沟通"
      },
      {
        "en": "cost-effective",
        "zh": "性价比高的"
      },
      {
        "en": "take effective measures",
        "zh": "采取有效措施"
      }
    ],
    "realSentence": {
      "en": "Good communication is the first step in effective persuasion, but logic and reasoning are just as important.",
      "zh": "良好的沟通是有效说服的第一步，但逻辑与推理同样重要。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "efficient / affective",
      "diff": "effective 有效果的；efficient 效率高的；affective 情感的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v197",
    "day": 8,
    "word": "dramatic",
    "phonetic": "/drəˈmætɪk/",
    "pos": "adj.",
    "meaning": "剧烈的，急剧的，巨大的，引人注目的；戏剧性的",
    "examFreq": 7,
    "roots": "drama(戏剧) + -tic -> 像舞台剧情转折那样猛烈抢眼 -> 急剧的/引人注目的",
    "mnemonic": "四级阅读 90% 不是“演戏剧”，而是修饰数字或变化：dramatic improvement/drop/change(大幅……)",
    "collocations": [
      {
        "en": "dramatic improvement",
        "zh": "显著/大幅改进"
      },
      {
        "en": "dramatic change",
        "zh": "剧烈变化"
      },
      {
        "en": "dramatic increase",
        "zh": "急剧增长"
      }
    ],
    "realSentence": {
      "en": "Technological changes brought dramatic new options to Americans living in the 1990s.",
      "zh": "技术变革为20世纪90年代的美国人带来了翻天覆地的新选择。",
      "source": "2017.12 第2套"
    },
    "confusable": {
      "word": "drastic",
      "diff": "dramatic 剧烈引人注目的；drastic 猛烈的/极端的(措施)"
    },
    "tag": "选词常考"
  },
  {
    "id": "v198",
    "day": 8,
    "word": "severe",
    "phonetic": "/sɪˈvɪr/",
    "pos": "adj.",
    "meaning": "严重的，严峻的；恶劣的（天气）；严厉的",
    "examFreq": 8,
    "roots": "拉丁语 severus(严肃的，严酷的) -> 毫不留情、程度极重 -> 严峻的/恶劣的",
    "mnemonic": "严重问题用 serious，但极端恶劣天气/严厉惩罚/严重疾病更地道用 severe！",
    "collocations": [
      {
        "en": "severe weather",
        "zh": "恶劣天气"
      },
      {
        "en": "severe consequences",
        "zh": "严重后果"
      },
      {
        "en": "severe penalties",
        "zh": "严厉惩罚"
      }
    ],
    "realSentence": {
      "en": "These changes are severe enough to interfere with social or occupational functioning.",
      "zh": "这些变化已经严重到足以干扰社交或职业功能的程度。",
      "source": "2026.06 第2套"
    },
    "confusable": {
      "word": "several / serve",
      "diff": "severe 严重的/严厉的；several 几个；serve 服务"
    },
    "tag": "选词常考"
  },
  {
    "id": "v199",
    "day": 8,
    "word": "urgent",
    "phonetic": "/ˈɜːrdʒənt/",
    "pos": "adj.",
    "meaning": "紧急的，迫切的，急需处理的",
    "examFreq": 10,
    "roots": "urge(催促，迫切推动) + -ent -> 催着马上得办的 -> 紧急的/迫切的",
    "mnemonic": "动词 urge(力劝/催促)，名词 urgency(紧迫性)；作文问题呼吁段必用 an urgent task",
    "collocations": [
      {
        "en": "urgent task",
        "zh": "紧迫任务"
      },
      {
        "en": "urgent supplies",
        "zh": "应急物资"
      },
      {
        "en": "urgent need",
        "zh": "迫切需求"
      }
    ],
    "realSentence": {
      "en": "Private postal companies also support disaster relief efforts by distributing urgent supplies.",
      "zh": "私营邮政公司还通过分发应急物资来支持救灾行动。",
      "source": "2019.12 第1套"
    },
    "confusable": null,
    "tag": "选词常考"
  },
  {
    "id": "v200",
    "day": 8,
    "word": "unique",
    "phonetic": "/juˈniːk/",
    "pos": "adj.",
    "meaning": "独特的，独一无二的，特有的（be unique to）",
    "examFreq": 17,
    "roots": "uni-(单一，唯一，如 unit) + -que -> 世间仅此一份 -> 独特的",
    "mnemonic": "词根 uni=1(唯一)！中国文化翻译最高频词：a unique cultural tradition(独特的文化传统)",
    "collocations": [
      {
        "en": "unique charm",
        "zh": "独特魅力"
      },
      {
        "en": "be unique to",
        "zh": "为……所独有"
      },
      {
        "en": "unique qualities",
        "zh": "独特品质"
      }
    ],
    "realSentence": {
      "en": "When each culture brings its own unique qualities to the group, an entirely new sound is achieved.",
      "zh": "当每种文化都将自身独特品质融入群体时，便会产生一种截然不同的崭新乐音。",
      "source": "2026.06 第2套"
    },
    "confusable": {
      "word": "antique",
      "diff": "unique 独一无二的；antique 古董/古老的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v201",
    "day": 8,
    "word": "constant",
    "phonetic": "/ˈkɑːnstənt/",
    "pos": "adj./n.",
    "meaning": "持续不断的，经常的；恒定的，忠贞的；[n.] 常数",
    "examFreq": 10,
    "roots": "con-(一直) + st(站立) + -ant -> 始终稳稳立在那里 -> 持续不断的/恒定的",
    "mnemonic": "副词 constantly(不断地) 是选词填空常客；辨析 instant(瞬间的/速溶的)",
    "collocations": [
      {
        "en": "constant exercise",
        "zh": "持之以恒的锻炼"
      },
      {
        "en": "live in constant fear",
        "zh": "生活在持续的恐惧中"
      },
      {
        "en": "constant change",
        "zh": "不断变化"
      }
    ],
    "realSentence": {
      "en": "Those people live in constant fear that their \"deception\" will be exposed.",
      "zh": "那些人一直生活在自己的“伪装”会被戳穿的持续恐惧之中。",
      "source": "2026.06 第2套"
    },
    "confusable": {
      "word": "consistent / instant",
      "diff": "constant 持续不断的/恒定的；consistent 一致的；instant 立刻的/速溶的"
    },
    "tag": "选词常考"
  },
  {
    "id": "v202",
    "day": 8,
    "word": "widespread",
    "phonetic": "/ˌwaɪdˈspred/",
    "pos": "adj.",
    "meaning": "广泛的，普遍的，分布广的",
    "examFreq": 7,
    "roots": "wide(宽广的) + spread(传播，铺开) -> 广泛铺开的 -> 普遍的",
    "mnemonic": "合成词秒记：wide+spread -> 现象普及、引起广泛关注都用 widespread concern/use",
    "collocations": [
      {
        "en": "widespread concern",
        "zh": "广泛担忧"
      },
      {
        "en": "widespread use",
        "zh": "广泛应用"
      },
      {
        "en": "widespread support",
        "zh": "广泛支持"
      }
    ],
    "realSentence": {
      "en": "As in many other fields, gender bias is widespread in the sciences.",
      "zh": "正如在许多其他领域一样，性别偏见在科学界也普遍存在。",
      "source": "2017.12 第3套"
    },
    "confusable": null,
    "tag": "选词常考"
  },
  {
    "id": "v203",
    "day": 8,
    "word": "gradually",
    "phonetic": "/ˈɡrædʒuəli/",
    "pos": "adv.",
    "meaning": "逐渐地，逐步地，循序渐进地",
    "examFreq": 12,
    "roots": "grad(台阶，步级) + -ual + -ly -> 一级台阶一级台阶地走 -> 逐渐地",
    "mnemonic": "选词填空副词常客！记住词根 grad=台阶(grade/graduate)，一步步缓慢变化",
    "collocations": [
      {
        "en": "gradually accumulate",
        "zh": "逐步积累"
      },
      {
        "en": "gradually evolve into",
        "zh": "逐渐演变成"
      },
      {
        "en": "gradually improve",
        "zh": "逐步改善"
      }
    ],
    "realSentence": {
      "en": "In the same way that learning a language or new skills takes time, building financial skills requires practice and years to gradually accumulate bits and pieces of knowledge.",
      "zh": "就像学一门语言或新技能需要时间一样，培养财商也需要多年实践来逐步积累点滴知识。",
      "source": "2024.12 第2套"
    },
    "confusable": {
      "word": "rapidly / drastically",
      "diff": "gradually 缓慢逐步地；rapidly 迅速地；drastically 剧烈猛烈地"
    },
    "tag": "选词常考"
  },
  {
    "id": "v204",
    "day": 8,
    "word": "relatively",
    "phonetic": "/ˈrelətɪvli/",
    "pos": "adv.",
    "meaning": "相对地，比较地，相当程度上",
    "examFreq": 11,
    "roots": "relative(相对的) + -ly -> 相比之下 -> 相对地",
    "mnemonic": "阅读细节题的“严谨缓和词”！选项含 relatively/likely 通常比绝对词 always/never 更靠谱",
    "collocations": [
      {
        "en": "relatively easy",
        "zh": "相对容易"
      },
      {
        "en": "relatively harmless",
        "zh": "相对无害"
      },
      {
        "en": "relatively few",
        "zh": "相对较少"
      }
    ],
    "realSentence": {
      "en": "It's relatively easy to tell whether two DNA samples belong to close relatives.",
      "zh": "判断两份DNA样本是否属于近亲是相对容易的。",
      "source": "2025.12 第3套"
    },
    "confusable": {
      "word": "relevantly",
      "diff": "relatively 相对比较地；relevantly 切题相关地"
    },
    "tag": "选词常考"
  },
  {
    "id": "v205",
    "day": 8,
    "word": "extremely",
    "phonetic": "/ɪkˈstriːmli/",
    "pos": "adv.",
    "meaning": "极其，非常，极端地",
    "examFreq": 15,
    "roots": "extreme(极端的) + -ly -> 达到极点地 -> 极其/非常",
    "mnemonic": "写作升级替换 very：extremely challenging(极具挑战性)、extremely valuable(极为宝贵)",
    "collocations": [
      {
        "en": "extremely challenging",
        "zh": "极具挑战性的"
      },
      {
        "en": "extremely sensitive",
        "zh": "极其敏感的"
      },
      {
        "en": "extremely important",
        "zh": "极其重要的"
      }
    ],
    "realSentence": {
      "en": "Even so, trying to set achievable goals that you'll work for over the course of many years can be extremely challenging.",
      "zh": "即便如此，试图设定需要多年努力才能实现的可行目标依然极具挑战性。",
      "source": "2024.12 第3套"
    },
    "confusable": null,
    "tag": "选词常考"
  },
  {
    "id": "v206",
    "day": 8,
    "word": "ultimately",
    "phonetic": "/ˈʌltɪmətli/",
    "pos": "adv.",
    "meaning": "最终，最后，归根结底",
    "examFreq": 9,
    "roots": "ultim(最远的，终极的) + -ate + -ly -> 走到最尽头时 -> 最终/归根结底",
    "mnemonic": "终极版 ultimate 加 ly -> 写作结尾段和选词填空的高级替换词，同义 eventually/finally",
    "collocations": [
      {
        "en": "ultimately lead to",
        "zh": "最终导致"
      },
      {
        "en": "ultimately depend on",
        "zh": "归根结底取决于"
      },
      {
        "en": "ultimate goal",
        "zh": "终极目标"
      }
    ],
    "realSentence": {
      "en": "Ultimately, misleading results will be corrected as science proceeds, however, this process takes time.",
      "zh": "最终，随着科学的进步，误导性的结果会被纠正，但这一过程需要时间。",
      "source": "2024.06 第2套"
    },
    "confusable": {
      "word": "intimately",
      "diff": "ultimately 最终/归根结底；intimately 亲密地/深切地"
    },
    "tag": "选词常考"
  },
  {
    "id": "v207",
    "day": 8,
    "word": "increasingly",
    "phonetic": "/ɪnˈkriːsɪŋli/",
    "pos": "adv.",
    "meaning": "日益，越来越多地，愈发",
    "examFreq": 25,
    "roots": "increase(增长) + -ing + -ly -> 呈不断上升态势地 -> 日益/愈发",
    "mnemonic": "四级作文开头第一句神词：...has become increasingly popular/important(日益流行/重要)！",
    "collocations": [
      {
        "en": "increasingly popular",
        "zh": "日益流行"
      },
      {
        "en": "increasingly important",
        "zh": "愈发重要"
      },
      {
        "en": "increasingly fragmented",
        "zh": "日益碎片化的"
      }
    ],
    "realSentence": {
      "en": "With genetic testing becoming increasingly popular, many people are left wondering exactly how accurate it is.",
      "zh": "随着基因检测日益普及，许多人不禁想知道它究竟有多准确。",
      "source": "2025.12 第3套"
    },
    "confusable": null,
    "tag": "选词常考"
  },
  {
    "id": "v208",
    "day": 8,
    "word": "primarily",
    "phonetic": "/praɪˈmerəli/",
    "pos": "adv.",
    "meaning": "主要地，首要地，根本上",
    "examFreq": 10,
    "roots": "prim(第一，首要，如 prime) + -ary + -ly -> 排在第一位地 -> 主要地",
    "mnemonic": "词根 prim=第一！阅读高频同义替换 mainly/chiefly，常引出核心原因",
    "collocations": [
      {
        "en": "primarily due to",
        "zh": "主要归因于"
      },
      {
        "en": "primarily responsible for",
        "zh": "主要负责……"
      },
      {
        "en": "primarily focused on",
        "zh": "主要聚焦于"
      }
    ],
    "realSentence": {
      "en": "Therefore, patients are directed to take most drugs during the morning or evening primarily to ensure compliance.",
      "zh": "因此，医生指导患者在早晚服用大多数药物，主要是为了确保服药依从性。",
      "source": "2025.12 第1套"
    },
    "confusable": {
      "word": "preliminary",
      "diff": "primarily(adv.) 主要地；preliminary(adj.) 初步的/预备的"
    },
    "tag": "同义替换"
  },
  {
    "id": "v209",
    "day": 9,
    "word": "tradition",
    "phonetic": "/trəˈdɪʃn/",
    "pos": "n.",
    "meaning": "传统，惯例，风俗",
    "examFreq": 13,
    "roots": "tra-(跨越/传递 trans-) + dit(给，交付) + -ion -> 代代相传下来的规矩 -> 传统",
    "mnemonic": "把先辈智慧跨代传递(tra+dit)下来 -> 传统；四级中国文化翻译必用 by tradition / carry on the tradition",
    "collocations": [
      {
        "en": "cultural tradition",
        "zh": "文化传统"
      },
      {
        "en": "carry on a tradition",
        "zh": "传承传统"
      },
      {
        "en": "break with tradition",
        "zh": "打破传统"
      }
    ],
    "realSentence": {
      "en": "Vegetable planting has a respectable tradition.",
      "zh": "种植蔬菜有着悠久而值得尊敬的传统。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "transition",
      "diff": "tradition 传统；transition 过渡/转型期"
    },
    "tag": "译写必备"
  },
  {
    "id": "v210",
    "day": 9,
    "word": "cultural",
    "phonetic": "/ˈkʌltʃərəl/",
    "pos": "adj.",
    "meaning": "文化的，与文化相关的，教养上的",
    "examFreq": 16,
    "roots": "cult(耕耘，培育) + -ure + -al -> 人类精神耕耘积淀的 -> 文化的",
    "mnemonic": "翻译超高频定语：cultural heritage(文化遗产)、cultural exchange(文化交流)、cultural confidence(文化自信)",
    "collocations": [
      {
        "en": "cultural heritage",
        "zh": "文化遗产"
      },
      {
        "en": "cultural exchange",
        "zh": "文化交流"
      },
      {
        "en": "cultural diversity",
        "zh": "文化多样性"
      }
    ],
    "realSentence": {
      "en": "Mount Tai is a majestic mountain with historical and cultural significance.",
      "zh": "泰山是一座兼具历史与文化重要意义的雄伟名山。",
      "source": "2017.12 第1套听力"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v211",
    "day": 9,
    "word": "heritage",
    "phonetic": "/ˈherɪtɪdʒ/",
    "pos": "n.",
    "meaning": "（国家或民族的）遗产，文化传承，传统",
    "examFreq": 11,
    "roots": "herit(继承，如 inherit) + -age(集合名词) -> 世世代代继承下来的瑰宝 -> 遗产",
    "mnemonic": "动词 inherit(继承) -> 名词 heritage！四级翻译必考 World Heritage Site(世界遗产地)",
    "collocations": [
      {
        "en": "World Heritage Site",
        "zh": "世界遗产地"
      },
      {
        "en": "intangible cultural heritage",
        "zh": "非物质文化遗产"
      },
      {
        "en": "preserve heritage",
        "zh": "保护遗产"
      }
    ],
    "realSentence": {
      "en": "UNESCO considers the entire city a World Heritage Site, a great honor that means Venice, at the cultural level, belongs to all of the world's people.",
      "zh": "联合国教科文组织将整座城市列为世界遗产地，这项崇高荣誉意味着威尼斯在文化层面上属于全人类。",
      "source": "2018.06 第2套"
    },
    "confusable": {
      "word": "inherit",
      "diff": "heritage(n.) 文化遗产/传统；inherit(v.) 继承(财产/基因)"
    },
    "tag": "译写必备"
  },
  {
    "id": "v212",
    "day": 9,
    "word": "ceremony",
    "phonetic": "/ˈserəmoʊni/",
    "pos": "n.",
    "meaning": "典礼，仪式；礼节，礼仪",
    "examFreq": 5,
    "roots": "拉丁语 caerimonia(神圣庄严的礼仪) -> 隆重正式的典礼仪式",
    "mnemonic": "翻译常见典礼：opening/closing ceremony(开/闭幕式)、wedding ceremony(婚礼)、graduation ceremony(毕业典礼)",
    "collocations": [
      {
        "en": "opening ceremony",
        "zh": "开幕式"
      },
      {
        "en": "graduation ceremony",
        "zh": "毕业典礼"
      },
      {
        "en": "award ceremony",
        "zh": "颁奖典礼"
      }
    ],
    "realSentence": {
      "en": "Music is often ceremonial: used in religion, ceremony, and celebration.",
      "zh": "音乐往往具有仪式感，被广泛用于宗教、典礼与庆典之中。",
      "source": "2026.06 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v213",
    "day": 9,
    "word": "festival",
    "phonetic": "/ˈfestɪvl/",
    "pos": "n.",
    "meaning": "节日，传统佳节；音乐节/艺术节",
    "examFreq": 4,
    "roots": "fest(欢庆，宴会，如 feast) + -ival -> 欢聚庆祝的日子 -> 节日",
    "mnemonic": "中国传统节日翻译核心词：Spring Festival(春节)、Mid-Autumn Festival(中秋节)、Dragon Boat Festival(端午节)",
    "collocations": [
      {
        "en": "traditional festival",
        "zh": "传统节日"
      },
      {
        "en": "celebrate a festival",
        "zh": "庆祝节日"
      },
      {
        "en": "music festival",
        "zh": "音乐节"
      }
    ],
    "realSentence": {
      "en": "Organisers of a famous music festival announced that water bottles will not be sold this summer.",
      "zh": "一个著名音乐节的主办方宣布，今年夏天将不再出售瓶装水。",
      "source": "2024.12 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v214",
    "day": 9,
    "word": "ancient",
    "phonetic": "/ˈeɪnʃənt/",
    "pos": "adj.",
    "meaning": "古代的，古老的，远古的",
    "examFreq": 16,
    "roots": "拉丁词根 ante-(在……之前) -> 很久很久以前的 -> 古代的",
    "mnemonic": "中国文化翻译高频开头词：In ancient China(在中国古代)、ancient wisdom(古老智慧)",
    "collocations": [
      {
        "en": "ancient civilization",
        "zh": "古代文明"
      },
      {
        "en": "ancient wisdom",
        "zh": "古老智慧"
      },
      {
        "en": "in ancient times",
        "zh": "在古代"
      }
    ],
    "realSentence": {
      "en": "Now scientists are bringing this ancient wisdom up-to-date.",
      "zh": "如今科学家们正将这种古老智慧赋予现代新意。",
      "source": "2018.06 第3套"
    },
    "confusable": {
      "word": "accent / ancestor",
      "diff": "ancient 古代的；accent 口音/重音；ancestor 祖先"
    },
    "tag": "译写必备"
  },
  {
    "id": "v215",
    "day": 9,
    "word": "historic",
    "phonetic": "/hɪˈstɔːrɪk/",
    "pos": "adj.",
    "meaning": "具有重大历史意义的，历史上著名的（强调“载入史册”）",
    "examFreq": 2,
    "roots": "history(历史) + -ic -> 足以在历史上留下浓墨重彩一笔的 -> 历史性的",
    "mnemonic": "必考易混对：短的 historic = “有重大历史意义的”(historic moment/landmark)；长的 historical = “历史上的/历史题材的”",
    "collocations": [
      {
        "en": "historic site",
        "zh": "历史遗迹"
      },
      {
        "en": "historic landmark",
        "zh": "历史地标"
      },
      {
        "en": "historic moment",
        "zh": "历史性时刻"
      }
    ],
    "realSentence": {
      "en": "Governor's Island is a national historic landmark district long used for military purposes.",
      "zh": "总督岛是一个长期用于军事用途的国家级历史地标区。",
      "source": "2019.06 第3套"
    },
    "confusable": {
      "word": "historical",
      "diff": "historic 有重大历史意义的/著名的；historical 历史上的/研究历史的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v216",
    "day": 9,
    "word": "historical",
    "phonetic": "/hɪˈstɔːrɪkl/",
    "pos": "adj.",
    "meaning": "（有关）历史的，历史上的，历史题材的",
    "examFreq": 2,
    "roots": "history(历史) + -ical -> 属于历史范畴或基于史实的",
    "mnemonic": "判断诀窍：只要说“历史上真实存在过/与历史学相关”就选 historical（如 historical novel/figure/records）",
    "collocations": [
      {
        "en": "historical records",
        "zh": "历史记载"
      },
      {
        "en": "historical figure",
        "zh": "历史人物"
      },
      {
        "en": "historical significance",
        "zh": "历史意义"
      }
    ],
    "realSentence": {
      "en": "Six birds have just been trained to pick up rubbish at a French historical theme park.",
      "zh": "在法国一座历史主题公园里，六只鸟儿刚刚接受了捡拾垃圾的训练。",
      "source": "2019.12 第1套听力"
    },
    "confusable": {
      "word": "historic",
      "diff": "historical 历史上的/历史学的；historic 具有重大历史意义的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v217",
    "day": 9,
    "word": "craft",
    "phonetic": "/kræft/",
    "pos": "n./v.",
    "meaning": "手工艺，技艺；船只/飞行器（spacecraft）；[v.] 精心制作",
    "examFreq": 15,
    "roots": "古英语 cræft(力量，巧艺) -> 匠人巧手练就的本领 -> 手工艺/精制",
    "mnemonic": "传统手工艺叫 traditional craft / handicraft，工匠叫 craftsman，航天器叫 spacecraft",
    "collocations": [
      {
        "en": "traditional craft",
        "zh": "传统手工艺"
      },
      {
        "en": "arts and crafts",
        "zh": "工艺美术"
      },
      {
        "en": "craftsman spirit",
        "zh": "工匠精神"
      }
    ],
    "realSentence": {
      "en": "Teaching is an art and a craft, talent and practice; it is not something that just anyone can be good at.",
      "zh": "教学既是一门艺术也是一门技艺，既靠天赋也靠实践，并非随便什么人都能胜任。",
      "source": "2016.12 第3套"
    },
    "confusable": {
      "word": "draft",
      "diff": "craft 手工艺/飞行器；draft 草稿/汇票/征兵"
    },
    "tag": "译写必备"
  },
  {
    "id": "v218",
    "day": 9,
    "word": "literature",
    "phonetic": "/ˈlɪtrətʃər/",
    "pos": "n.",
    "meaning": "文学，文学作品；[熟词僻义] 专业文献，资料",
    "examFreq": 11,
    "roots": "liter(文字，字母 letter) + -ature -> 用文字写就的著作 -> 文学/文献",
    "mnemonic": "阅读熟词僻义：academic/leadership literature 不是“小说文学”，而是该领域的“专业文献资料”！",
    "collocations": [
      {
        "en": "classical literature",
        "zh": "古典文学"
      },
      {
        "en": "academic literature",
        "zh": "学术文献"
      },
      {
        "en": "literary works",
        "zh": "文学作品"
      }
    ],
    "realSentence": {
      "en": "Reading leadership literature, you'd sometimes think that everyone has the potential to be an effective leader.",
      "zh": "阅读领导力方面的文献时，你有时会觉得每个人都有成为高效领导者的潜质。",
      "source": "2014.06 第1套"
    },
    "confusable": {
      "word": "literacy / literal",
      "diff": "literature 文学/文献；literacy 读写能力/素养；literal 字面上的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v219",
    "day": 9,
    "word": "philosophy",
    "phonetic": "/fəˈlɑːsəfi/",
    "pos": "n.",
    "meaning": "哲学；[熟词僻义] 人生观，生活准则，经营理念",
    "examFreq": 3,
    "roots": "philo-(热爱) + sophy(智慧) -> 热爱智慧的学问 -> 哲学/理念",
    "mnemonic": "philo(爱)+sophy(智慧) -> 哲学！阅读里常指企业或教育的“核心理念”(educational philosophy)",
    "collocations": [
      {
        "en": "Chinese philosophy",
        "zh": "中国哲学"
      },
      {
        "en": "life philosophy",
        "zh": "人生哲学/生活理念"
      },
      {
        "en": "ancient philosophers",
        "zh": "古代哲学家"
      }
    ],
    "realSentence": {
      "en": "Some styles imitate the movements of animals, while others are inspired by Chinese philosophy, myth and legend.",
      "zh": "有些武术流派模仿动物的动作，而另一些则汲取了中国哲学、神话与传说的灵感。",
      "source": "2016.06 第1套听力"
    },
    "confusable": {
      "word": "psychology / physiology",
      "diff": "philosophy 哲学；psychology 心理学；physiology 生理学"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v220",
    "day": 9,
    "word": "moral",
    "phonetic": "/ˈmɔːrəl/",
    "pos": "adj./n.",
    "meaning": "道德的，道义上的；[n.] 寓意，教训；[pl.] 道德规范",
    "examFreq": 24,
    "roots": "拉丁词根 mor-(风俗，习惯) + -al -> 社会公认的行为操守 -> 道德的",
    "mnemonic": "2026年6月四级阅读真题高频词 moral disgust(道德厌恶)；注意不要和 morale(士气)混淆！",
    "collocations": [
      {
        "en": "moral values",
        "zh": "道德价值观"
      },
      {
        "en": "moral responsibility",
        "zh": "道义责任"
      },
      {
        "en": "moral standards",
        "zh": "道德标准"
      }
    ],
    "realSentence": {
      "en": "Examples of moral disgust are stealing, lying or cheating.",
      "zh": "引起道德厌恶的例子包括偷窃、撒谎或作弊。",
      "source": "2026.06 第3套"
    },
    "confusable": {
      "word": "morale / mortal",
      "diff": "moral 道德的/寓意；morale 士气/斗志；mortal 终有一死的/致命的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v221",
    "day": 9,
    "word": "harmony",
    "phonetic": "/ˈhɑːrməni/",
    "pos": "n.",
    "meaning": "和谐，融洽，协调；和声",
    "examFreq": 6,
    "roots": "希腊语 harmonia(接合，调和) -> 彼此契合无冲突 -> 和谐",
    "mnemonic": "翻译超级高频词：live in harmony with nature(与自然和谐共处)；形容词 harmonious(和谐的)",
    "collocations": [
      {
        "en": "in harmony with",
        "zh": "与……和谐相处"
      },
      {
        "en": "peace and harmony",
        "zh": "和平与和谐"
      },
      {
        "en": "harmonious society",
        "zh": "和谐社会"
      }
    ],
    "realSentence": {
      "en": "It is vitally important across the globe and has the potential to bring people together in peace and harmony.",
      "zh": "它在全球都至关重要，并有潜力让人们在和平与和谐中凝聚在一起。",
      "source": "2026.06 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v222",
    "day": 9,
    "word": "honor",
    "phonetic": "/ˈɑːnər/",
    "pos": "n./v.",
    "meaning": "荣誉，光荣，敬意；[v.] 尊敬，授予荣誉，[熟词僻义] 信守（承诺/协议）",
    "examFreq": 12,
    "roots": "拉丁语 honor(尊严，敬重) -> 崇高的声望与敬意",
    "mnemonic": "2026.06四级翻译“尊师重教/礼尚往来”必背！短语 in honor of(为纪念/向……致敬)，honor a promise(信守诺言)",
    "collocations": [
      {
        "en": "in honor of",
        "zh": "为了纪念/向……致敬"
      },
      {
        "en": "feel honored to do",
        "zh": "很荣幸做某事"
      },
      {
        "en": "honor a commitment",
        "zh": "履行承诺"
      }
    ],
    "realSentence": {
      "en": "Last night, we were honored to be awarded three Michelin stars for the 11th year in a row.",
      "zh": "昨晚，我们非常荣幸连续第11年荣获米其林三星评价。",
      "source": "2025.12 第3套"
    },
    "confusable": {
      "word": "horror / humor",
      "diff": "honor 荣誉/尊敬；horror 恐惧惊骇；humor 幽默"
    },
    "tag": "译写必备"
  },
  {
    "id": "v223",
    "day": 9,
    "word": "celebrate",
    "phonetic": "/ˈselɪbreɪt/",
    "pos": "v.",
    "meaning": "庆祝，庆贺；[熟词僻义] 赞美，颂扬",
    "examFreq": 8,
    "roots": "celebr(众多人聚集，著名) + -ate -> 众人齐聚欢庆 -> 庆祝/赞颂",
    "mnemonic": "同源词 celebrity(名人，众人聚集围观的人)；搭配 celebrate cultural heritage(弘扬文化遗产)",
    "collocations": [
      {
        "en": "celebrate the festival",
        "zh": "欢庆节日"
      },
      {
        "en": "celebrate cultural heritage",
        "zh": "礼赞文化遗产"
      },
      {
        "en": "celebrate achievements",
        "zh": "庆祝成就"
      }
    ],
    "realSentence": {
      "en": "So it's no surprise that cultures around the world celebrate spring by honoring the egg.",
      "zh": "因此世界各地的文化都通过敬重彩蛋来庆祝春天，这也就不足为奇了。",
      "source": "2017.06 第1套"
    },
    "confusable": {
      "word": "celebrity / calibrate",
      "diff": "celebrate 庆祝赞颂；celebrity 名人；calibrate 校准"
    },
    "tag": "译写必备"
  },
  {
    "id": "v224",
    "day": 9,
    "word": "origin",
    "phonetic": "/ˈɔːrɪdʒɪn/",
    "pos": "n.",
    "meaning": "起源，源头，由来；出身，血统",
    "examFreq": 4,
    "roots": "拉丁词根 ori-(升起，诞生，如 orient 东方) + -gin -> 最初升起之处 -> 起源",
    "mnemonic": "词根 ori=升起诞生 -> 形容词 original(最初的/原创的/新颖的)，动词 originate from(起源于)",
    "collocations": [
      {
        "en": "the origin of",
        "zh": "……的起源"
      },
      {
        "en": "trace the origin",
        "zh": "追溯起源"
      },
      {
        "en": "country of origin",
        "zh": "原产国"
      }
    ],
    "realSentence": {
      "en": "Yuka Sasaki and her colleagues at Brown University set out to investigate the origins of this effect.",
      "zh": "布朗大学的佐佐木由香和同事们着手探寻这种效应的起源。",
      "source": "2017.12 第1套"
    },
    "confusable": {
      "word": "organ / original",
      "diff": "origin(n.) 起源出身；organ(n.) 器官/机构；original(adj.) 原创的/最初的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v225",
    "day": 9,
    "word": "symbol",
    "phonetic": "/ˈsɪmbl/",
    "pos": "n.",
    "meaning": "象征，标志，符号",
    "examFreq": 4,
    "roots": "sym-(一起) + bol(投掷，合符) -> 古希腊两半信物合在一起辨认身份 -> 象征",
    "mnemonic": "翻译传统文化高频表达：be regarded as a symbol of...(被视为……的象征)；动词 symbolize",
    "collocations": [
      {
        "en": "a symbol of peace",
        "zh": "和平的象征"
      },
      {
        "en": "cultural symbol",
        "zh": "文化符号"
      },
      {
        "en": "symbolic meaning",
        "zh": "象征意义"
      }
    ],
    "realSentence": {
      "en": "In Weifang, Shandong Province, kites are not only for entertainment, but are also taken as the symbol for the culture of the city.",
      "zh": "在山东潍坊，风筝不仅用于娱乐，还被视为这座城市的文化象征。",
      "source": "2016.06 第2套听力"
    },
    "confusable": {
      "word": "symptom",
      "diff": "symbol 象征符号；symptom 疾病症状/征兆"
    },
    "tag": "译写必备"
  },
  {
    "id": "v226",
    "day": 9,
    "word": "universal",
    "phonetic": "/ˌjuːnɪˈvɜːrsl/",
    "pos": "adj.",
    "meaning": "普遍的，全世界的，通用的，宇宙的",
    "examFreq": 9,
    "roots": "uni-(统一为一) + vers(旋转) + -al -> 涵盖整个宇宙万物的 -> 普遍的/通用的",
    "mnemonic": "universe(宇宙)+al -> 放之四海而皆准的！常搭 universal language / universal value",
    "collocations": [
      {
        "en": "universal topic",
        "zh": "永恒普遍的话题"
      },
      {
        "en": "universal values",
        "zh": "普世价值"
      },
      {
        "en": "universally acknowledged",
        "zh": "公认的"
      }
    ],
    "realSentence": {
      "en": "When she saw me watching, she gave me the universal tense look of mothers who feel they are being judged.",
      "zh": "当她看到我在注视时，便向我投来全世界觉得自己正受评判的母亲们共有的那种紧张神色。",
      "source": "2014.06 第1套"
    },
    "confusable": {
      "word": "university / diverse",
      "diff": "universal 普遍的/全球通用的；university 大学；diverse 多样化的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v227",
    "day": 9,
    "word": "generation",
    "phonetic": "/ˌdʒenəˈreɪʃn/",
    "pos": "n.",
    "meaning": "一代，一代人；[熟词僻义] （电力的）产生，发电",
    "examFreq": 27,
    "roots": "gener(出生，产生) + -ation -> 同一时代出生的人 -> 一代人；生出电力 -> 发电",
    "mnemonic": "两义并记：社会文化类指“代际”(generation gap 代沟、from generation to generation 代代相传)，能源类指“发电”",
    "collocations": [
      {
        "en": "generation gap",
        "zh": "代沟"
      },
      {
        "en": "from generation to generation",
        "zh": "世世代代"
      },
      {
        "en": "younger generation",
        "zh": "年轻一代"
      }
    ],
    "realSentence": {
      "en": "However hard efforts they make, they could not catch up with our steps, leading to the so-called invisible generation gap.",
      "zh": "无论他们多么努力，也难以跟上我们的步伐，从而形成了所谓无形的代沟。",
      "source": "2017.12 第1套听力"
    },
    "confusable": {
      "word": "generosity",
      "diff": "generation 一代人/产生；generosity 慷慨大方"
    },
    "tag": "译写必备"
  },
  {
    "id": "v228",
    "day": 9,
    "word": "ancestor",
    "phonetic": "/ˈænsestər/",
    "pos": "n.",
    "meaning": "祖先，祖宗，先辈；原型，先驱",
    "examFreq": 3,
    "roots": "an-(在前面 ante-) + cest(走) + -or(人) -> 走在家族最前面的人 -> 祖先",
    "mnemonic": "翻译清明/春节/历史传承主题高频词：honor one's ancestors(祭祖/缅怀先辈)；衍生词 ancestry(血统祖源)",
    "collocations": [
      {
        "en": "ancient ancestors",
        "zh": "远古祖先"
      },
      {
        "en": "pay tribute to ancestors",
        "zh": "缅怀先人"
      },
      {
        "en": "common ancestor",
        "zh": "共同祖先"
      }
    ],
    "realSentence": {
      "en": "My ancestor was a preacher traveling around the countryside.",
      "zh": "我的先辈是一位走遍乡间的传道人。",
      "source": "2017.12 第1套听力"
    },
    "confusable": {
      "word": "descendant",
      "diff": "ancestor 祖先先辈；descendant 后代子孙（反义）"
    },
    "tag": "译写必备"
  },
  {
    "id": "v229",
    "day": 9,
    "word": "civilization",
    "phonetic": "/ˌsɪvələˈzeɪʃn/",
    "pos": "n.",
    "meaning": "文明，文明社会，教化",
    "examFreq": 2,
    "roots": "civil(公民的，文明的) + -ize + -ation -> 公民社会发展出的高度文化 -> 文明",
    "mnemonic": "中国文化翻译王牌句：Chinese civilization has a history of over 5,000 years(中华文明有五千多年历史)",
    "collocations": [
      {
        "en": "ancient civilization",
        "zh": "古代文明"
      },
      {
        "en": "Chinese civilization",
        "zh": "中华文明"
      },
      {
        "en": "modern civilization",
        "zh": "现代文明"
      }
    ],
    "realSentence": {
      "en": "In the past 1,000 years, the water system and the lifestyle there changed little, and the town is thus a museum of ancient civilization.",
      "zh": "在过去一千年里，当地的水系和生活方式几乎没有改变，因此这座古镇堪称古代文明的博物馆。",
      "source": "2016.06 第3套听力"
    },
    "confusable": {
      "word": "citizen",
      "diff": "civilization 文明；citizen 公民市民"
    },
    "tag": "译写必备"
  },
  {
    "id": "v230",
    "day": 9,
    "word": "classic",
    "phonetic": "/ˈklæsɪk/",
    "pos": "adj./n.",
    "meaning": "经典的，典型的，一流的；[n.] 经典名著，典范",
    "examFreq": 6,
    "roots": "拉丁语 classicus(第一等级的，最优秀的) -> 经久不衰的典范 -> 经典的",
    "mnemonic": "辨析：classic 强调“公认经典/典型代表”(classic dilemma/literature)；classical 强调“古典主义/传统流派”(classical music)",
    "collocations": [
      {
        "en": "classic dilemma",
        "zh": "经典的两难困境"
      },
      {
        "en": "literary classics",
        "zh": "文学名著"
      },
      {
        "en": "classic example",
        "zh": "典型例子"
      }
    ],
    "realSentence": {
      "en": "It's the classic grocery store dilemma.",
      "zh": "这就是经典的杂货店选购两难困境。",
      "source": "2026.06 第1套"
    },
    "confusable": {
      "word": "classical",
      "diff": "classic 经典的/典型的/名著；classical 古典的(音乐/建筑/文学)"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v231",
    "day": 9,
    "word": "identity",
    "phonetic": "/aɪˈdentəti/",
    "pos": "n.",
    "meaning": "身份，特性，认同感；一致，同一性",
    "examFreq": 7,
    "roots": "ident(相同的) + -ity -> 用来证明“就是你本人”的特征 -> 身份/认同",
    "mnemonic": "身份证 ID = Identity Card！写作高频搭配 cultural identity(文化认同)、national identity(民族认同)",
    "collocations": [
      {
        "en": "cultural identity",
        "zh": "文化认同"
      },
      {
        "en": "genetic identity",
        "zh": "基因身份"
      },
      {
        "en": "sense of identity",
        "zh": "归属感/认同感"
      }
    ],
    "realSentence": {
      "en": "Psychologists have long been interested in how we construct our identities and the sorts of strategies that we use to present ourselves in society.",
      "zh": "心理学家长期以来一直关注我们如何构建自我认同，以及在社会中展现自我的各种策略。",
      "source": "2025.06 第1套"
    },
    "confusable": {
      "word": "identify / identical",
      "diff": "identity(n.) 身份认同；identify(v.) 识别确认；identical(adj.) 完全相同的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v232",
    "day": 9,
    "word": "contemporary",
    "phonetic": "/kənˈtempəreri/",
    "pos": "adj./n.",
    "meaning": "当代的，现代的；同时代的；[n.] 同代人，同龄人",
    "examFreq": 3,
    "roots": "con-(共同) + tempor(时间，如 temporary) + -ary -> 处于同一时代的 -> 当代的/同时代的",
    "mnemonic": "抓词根 tempor=时间：同一时间(con+tempor) -> 当代的！写作高级替换 modern",
    "collocations": [
      {
        "en": "contemporary society",
        "zh": "当代社会"
      },
      {
        "en": "contemporary artists",
        "zh": "当代艺术家"
      },
      {
        "en": "contemporary issues",
        "zh": "当代议题"
      }
    ],
    "realSentence": {
      "en": "Contemporary artists have followed this tradition to create eggs that speak to the anxieties of our age: Life is precious, and delicate.",
      "zh": "当代艺术家沿袭了这一传统，创作出呼应我们这个时代焦虑的彩蛋作品：生命既珍贵又脆弱。",
      "source": "2017.06 第1套"
    },
    "confusable": {
      "word": "temporary",
      "diff": "contemporary 当代的/同时代的；temporary 暂时的/临时的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v233",
    "day": 9,
    "word": "distinct",
    "phonetic": "/dɪˈstɪŋkt/",
    "pos": "adj.",
    "meaning": "截然不同的，有区别的（be distinct from）；清晰的，明显的",
    "examFreq": 3,
    "roots": "dis-(分开) + stinct(刺，标记) -> 扎出清晰分界线的 -> 截然不同的/明显的",
    "mnemonic": "对比记忆：distinct(明显不同的) vs distinctive(独具特色的)；动词 distinguish(区分辨别)",
    "collocations": [
      {
        "en": "two distinct groups",
        "zh": "截然不同的两类"
      },
      {
        "en": "be distinct from",
        "zh": "与……截然不同"
      },
      {
        "en": "distinct advantage",
        "zh": "明显优势"
      }
    ],
    "realSentence": {
      "en": "When we think of animals and plants, we have a pretty good way of dividing them into two distinct groups: one converts sunlight into energy and the other has to eat food to make its energy.",
      "zh": "当我们思考动植物时，有一个很好的方法将它们划分为截然不同的两类：一类将阳光转化为能量，另一类则必须进食获取能量。",
      "source": "2019.12 第2套"
    },
    "confusable": {
      "word": "extinct / instinct / distinctive",
      "diff": "distinct 不同的/明显的；distinctive 有特色的；extinct 灭绝的；instinct 本能"
    },
    "tag": "选词常考"
  },
  {
    "id": "v234",
    "day": 9,
    "word": "manner",
    "phonetic": "/ˈmænər/",
    "pos": "n.",
    "meaning": "方式，方法（in a ... manner）；举止；[pl. manners] 礼貌，礼仪，餐桌礼仪",
    "examFreq": 8,
    "roots": "拉丁词根 manu-(手) -> 做事的手势与做派 -> 方式/礼仪",
    "mnemonic": "2026年6月四级翻译“餐桌礼仪”核心词：table manners(餐桌礼仪，必用复数！)；单数 in an orderly manner(有条不紊地)",
    "collocations": [
      {
        "en": "table manners",
        "zh": "餐桌礼仪"
      },
      {
        "en": "in an orderly manner",
        "zh": "井然有序地"
      },
      {
        "en": "good manners",
        "zh": "有礼貌"
      }
    ],
    "realSentence": {
      "en": "They never know where they are going, and do not walk in an orderly manner.",
      "zh": "他们从不知道自己要去哪儿，走路也不井然有序。",
      "source": "2018.06 第2套"
    },
    "confusable": {
      "word": "matter",
      "diff": "manner 方式/礼仪(pl.)；matter 事情/物质/要紧"
    },
    "tag": "译写必备"
  },
  {
    "id": "v235",
    "day": 10,
    "word": "mental",
    "phonetic": "/ˈmentl/",
    "pos": "adj.",
    "meaning": "心理的，精神的，脑力的，智力的",
    "examFreq": 24,
    "roots": "拉丁词根 ment-(心智，思维) + -al -> 心智与精神层面的",
    "mnemonic": "健康类作文黄金配对：physical and mental health(身心健康)！别拼成 metal(金属)！",
    "collocations": [
      {
        "en": "mental health",
        "zh": "心理健康"
      },
      {
        "en": "mental illness",
        "zh": "精神疾病"
      },
      {
        "en": "mental pressure",
        "zh": "精神压力"
      }
    ],
    "realSentence": {
      "en": "The Impostor Phenomenon is not defined as a mental illness.",
      "zh": "“冒充者现象”并未被界定为一种精神疾病。",
      "source": "2026.06 第2套"
    },
    "confusable": {
      "word": "metal / medal",
      "diff": "mental 心理的精神的；metal 金属；medal 奖牌勋章"
    },
    "tag": "译写必备"
  },
  {
    "id": "v236",
    "day": 10,
    "word": "psychological",
    "phonetic": "/ˌsaɪkəˈlɑːdʒɪkl/",
    "pos": "adj.",
    "meaning": "心理的，心理学的，精神上的",
    "examFreq": 7,
    "roots": "psycho-(心灵，灵魂) + log(学科) + -ical -> 心理学层面的",
    "mnemonic": "开头 p 不发音！记全家桶：psychology(心理学)、psychologist(心理学家)、psychological(心理的)",
    "collocations": [
      {
        "en": "psychological stress",
        "zh": "心理压力"
      },
      {
        "en": "psychological well-being",
        "zh": "心理健康"
      },
      {
        "en": "psychological support",
        "zh": "心理支持"
      }
    ],
    "realSentence": {
      "en": "People suffering from sleep loss are at an increased risk from obesity, psychological problems and car crashes.",
      "zh": "睡眠不足的人面临更高的肥胖、心理问题和车祸风险。",
      "source": "2016.06 第2套听力"
    },
    "confusable": {
      "word": "physiological / physical",
      "diff": "psychological 心理的；physiological 生理机能的；physical 身体的/物理的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v237",
    "day": 10,
    "word": "emotion",
    "phonetic": "/ɪˈmoʊʃn/",
    "pos": "n.",
    "meaning": "情感，情绪，激动",
    "examFreq": 22,
    "roots": "e-(向外) + mot(移动，波动) + -ion -> 内心向外涌动的波动 -> 情绪",
    "mnemonic": "内心涌出(e)的波澜(mot) -> 情绪！衍生词 emotional(情感的/情绪化的)",
    "collocations": [
      {
        "en": "express emotions",
        "zh": "表达情感"
      },
      {
        "en": "emotional intelligence",
        "zh": "情商"
      },
      {
        "en": "emotional support",
        "zh": "情感支持"
      }
    ],
    "realSentence": {
      "en": "Music essentially serves to express or change emotions.",
      "zh": "音乐本质上是用来表达或改变情绪的。",
      "source": "2026.06 第2套"
    },
    "confusable": {
      "word": "motion",
      "diff": "emotion 情感情绪；motion 运动/动作/提议"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v238",
    "day": 10,
    "word": "depression",
    "phonetic": "/dɪˈpreʃn/",
    "pos": "n.",
    "meaning": "抑郁症，沮丧消沉；[熟词僻义] 经济大萧条，低气压",
    "examFreq": 16,
    "roots": "de-(向下) + press(按压) + -ion -> 心情或经济被死死往下压 -> 抑郁/萧条",
    "mnemonic": "情绪被往下压(de+press)叫“抑郁症”；经济被往下压叫“大萧条”(the Great Depression)",
    "collocations": [
      {
        "en": "fight depression",
        "zh": "对抗抑郁"
      },
      {
        "en": "suffer from depression",
        "zh": "患抑郁症"
      },
      {
        "en": "economic depression",
        "zh": "经济萧条"
      }
    ],
    "realSentence": {
      "en": "Online programs to fight depression are already commercially available.",
      "zh": "用于对抗抑郁症的在线项目现已投入商业应用。",
      "source": "2019.06 第3套"
    },
    "confusable": {
      "word": "impression / expression",
      "diff": "depression 抑郁/萧条；impression 印象；expression 表达/神情"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v239",
    "day": 10,
    "word": "anxiety",
    "phonetic": "/æŋˈzaɪəti/",
    "pos": "n.",
    "meaning": "焦虑，忧虑，不安；渴望",
    "examFreq": 6,
    "roots": "anx-(勒紧，窒息，同源 anxious) + -iety -> 胸口发紧喘不过气 -> 焦虑",
    "mnemonic": "形容词 anxious(be anxious about 焦虑 / be anxious to do 渴望)，心理健康作文核心词",
    "collocations": [
      {
        "en": "relieve anxiety",
        "zh": "缓解焦虑"
      },
      {
        "en": "signs of anxiety",
        "zh": "焦虑迹象"
      },
      {
        "en": "academic anxiety",
        "zh": "学业焦虑"
      }
    ],
    "realSentence": {
      "en": "Co-author Mathew White, from the University of Exeter, UK, explained that the study showed people living in greener urban areas were displaying fewer signs of depression or anxiety.",
      "zh": "英国埃克塞特大学的论文合著者马修·怀特解释说，研究表明居住在绿化更好城区的人们表现出更少的抑郁或焦虑迹象。",
      "source": "2018.06 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v240",
    "day": 10,
    "word": "stress",
    "phonetic": "/stres/",
    "pos": "n./v.",
    "meaning": "精神压力，紧张；[熟词僻义 v.] 强调，着重指出；重读",
    "examFreq": 34,
    "roots": "源自拉丁语 stringere(拉紧) -> 神经绷得紧紧的 -> 压力；用力拉紧语气 -> 强调",
    "mnemonic": "一词两面必考：under stress(处于压力下)；作动词=emphasize(强调)，如 I can't stress this enough(我再怎么强调都不为过)",
    "collocations": [
      {
        "en": "relieve stress",
        "zh": "缓解压力"
      },
      {
        "en": "under great stress",
        "zh": "承受巨大压力"
      },
      {
        "en": "stress the importance of",
        "zh": "强调……的重要性"
      }
    ],
    "realSentence": {
      "en": "Unsurprisingly, Kelly and Moen found that employees in the redesign group reported less stress and less burnout.",
      "zh": "不出所料，凯利和莫恩发现，工作模式重组小组成员报告的压力和职业倦怠更少。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "distress / stretch",
      "diff": "stress 压力/强调；distress 极度痛苦/遇险；stretch 伸展拉长"
    },
    "tag": "译写必备"
  },
  {
    "id": "v241",
    "day": 10,
    "word": "exhausted",
    "phonetic": "/ɪɡˈzɔːstɪd/",
    "pos": "adj.",
    "meaning": "精疲力竭的，筋疲力尽的；耗尽的，枯竭的",
    "examFreq": 8,
    "roots": "ex-(彻底出来) + haust(抽取，汲干) + -ed -> 精力被抽干了 -> 精疲力竭的",
    "mnemonic": "区别 -ed 与 -ing：人累垮了用 exhausted，活太累人用 exhausting；词组 exhaust resources(耗尽资源)",
    "collocations": [
      {
        "en": "feel exhausted",
        "zh": "感到精疲力竭"
      },
      {
        "en": "emotionally exhausted",
        "zh": "心力交瘁"
      },
      {
        "en": "exhaust resources",
        "zh": "耗尽资源"
      }
    ],
    "realSentence": {
      "en": "Did you know women are more likely than men to feel exhausted?",
      "zh": "你知道女性比男性更容易感到精疲力竭吗？",
      "source": "2017.12 第1套"
    },
    "confusable": {
      "word": "exhaustive",
      "diff": "exhausted 精疲力竭的/耗尽的；exhaustive 详尽彻底的(如 exhaustive study)"
    },
    "tag": "听力高频"
  },
  {
    "id": "v242",
    "day": 10,
    "word": "symptom",
    "phonetic": "/ˈsɪmptəm/",
    "pos": "n.",
    "meaning": "症状，病征；[熟词僻义] （不良现象的）征兆，表征",
    "examFreq": 15,
    "roots": "sym-(共同) + ptom(落在一起) -> 随疾病一同落下的表现 -> 症状/征兆",
    "mnemonic": "医学科普阅读常考词！千万别和 symbol(象征)混为一谈",
    "collocations": [
      {
        "en": "a group of symptoms",
        "zh": "一系列症状"
      },
      {
        "en": "withdrawal symptoms",
        "zh": "戒断症状"
      },
      {
        "en": "relieve symptoms",
        "zh": "缓解症状"
      }
    ],
    "realSentence": {
      "en": "Junk-food lovers who try to cut back on fries or chocolate may experience symptoms similar to drug withdrawal, a new study suggests.",
      "zh": "一项新研究表明，试图减少摄入薯条或巧克力的垃圾食品爱好者，可能会出现类似药物戒断的症状。",
      "source": "2026.06 第3套"
    },
    "confusable": {
      "word": "symbol",
      "diff": "symptom 症状/征兆；symbol 象征/符号"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v243",
    "day": 10,
    "word": "therapy",
    "phonetic": "/ˈθerəpi/",
    "pos": "n.",
    "meaning": "治疗，疗法，心理治疗（尤指非手术/非药物疗法）",
    "examFreq": 5,
    "roots": "希腊语 therapeia(照护，疗愈) -> 系统化的心理或康复治疗",
    "mnemonic": "和 theory(理论)长相极近！记法：therapy 中间有“a”像拥抱疗愈，therapist=心理治疗师",
    "collocations": [
      {
        "en": "talk therapy",
        "zh": "谈话疗法"
      },
      {
        "en": "physical therapy",
        "zh": "物理康复治疗"
      },
      {
        "en": "gene therapy",
        "zh": "基因疗法"
      }
    ],
    "realSentence": {
      "en": "Traditional CBT is considered an effective form of talk therapy for depression, helping people challenge negative thoughts and change the way they think in order to change their mood and behaviors.",
      "zh": "传统认知行为疗法被视为治疗抑郁症的有效谈话疗法，帮助人们挑战消极念头并改变思维方式，从而改善情绪与行为。",
      "source": "2019.06 第3套"
    },
    "confusable": {
      "word": "theory",
      "diff": "therapy 治疗/心理疗法；theory 理论学说"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v244",
    "day": 10,
    "word": "obesity",
    "phonetic": "/oʊˈbiːsəti/",
    "pos": "n.",
    "meaning": "肥胖，肥胖症",
    "examFreq": 24,
    "roots": "ob-(过度) + es(吃，源自拉丁语 edere) + -ity -> 吃得过度引发的病态 -> 肥胖症",
    "mnemonic": "四级饮食健康类阅读头号高频主题词！形容词 obese(极度肥胖的)，高频词组 rising obesity rates",
    "collocations": [
      {
        "en": "rising obesity rates",
        "zh": "不断上升的肥胖率"
      },
      {
        "en": "childhood obesity",
        "zh": "儿童肥胖"
      },
      {
        "en": "combat obesity",
        "zh": "对抗肥胖问题"
      }
    ],
    "realSentence": {
      "en": "But recent studies show a lack of exercise is not to blame for rising obesity rates.",
      "zh": "但近期研究表明，缺乏锻炼并不是肥胖率上升的罪魁祸首。",
      "source": "2025.12 第2套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v245",
    "day": 10,
    "word": "nutrition",
    "phonetic": "/nuˈtrɪʃn/",
    "pos": "n.",
    "meaning": "营养，滋养，营养学",
    "examFreq": 8,
    "roots": "nutr(滋养，哺育，如 nurse) + -ition -> 供给生命的养分 -> 营养",
    "mnemonic": "营养家族一网打尽：nutrition(营养)、nutrient(营养素)、nutritious(有营养的)",
    "collocations": [
      {
        "en": "balanced nutrition",
        "zh": "均衡营养"
      },
      {
        "en": "nutrition research",
        "zh": "营养学研究"
      },
      {
        "en": "nutritional value",
        "zh": "营养价值"
      }
    ],
    "realSentence": {
      "en": "James Bentham, a co-author of the research from Imperial College, London, says the global trend is likely to be due primarily to improvements in nutrition and healthcare.",
      "zh": "伦敦帝国理工学院的论文合著者詹姆斯·本瑟姆说，这一全球趋势很可能主要归功于营养与医疗保健水平的改善。",
      "source": "2019.06 第2套"
    },
    "confusable": {
      "word": "nutrient / nutritious",
      "diff": "nutrition(n.) 营养/营养学；nutrient(n.) 营养物质；nutritious(adj.) 营养丰富的"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v246",
    "day": 10,
    "word": "diet",
    "phonetic": "/ˈdaɪət/",
    "pos": "n./v.",
    "meaning": "日常饮食，饮食结构；[熟词僻义] 节食（go on a diet）",
    "examFreq": 46,
    "roots": "希腊语 diaita(生活方式，饮食起居) -> 日常膳食/规定食谱",
    "mnemonic": "阅读避坑：a balanced/plant-based diet 是“均衡/植物性饮食”，不是“节食”！go on a diet 才是节食",
    "collocations": [
      {
        "en": "a balanced diet",
        "zh": "均衡饮食"
      },
      {
        "en": "plant-based diet",
        "zh": "植物性饮食"
      },
      {
        "en": "go on a diet",
        "zh": "开始节食"
      }
    ],
    "realSentence": {
      "en": "If meatless meat can help you stick to a plant-based diet, that in itself can lead to better health.",
      "zh": "如果植物肉能帮助你坚持植物性饮食，这本身就能带来更佳的健康状况。",
      "source": "2025.06 第3套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v247",
    "day": 10,
    "word": "intake",
    "phonetic": "/ˈɪnteɪk/",
    "pos": "n.",
    "meaning": "（食物/热量/糖分的）摄入量，吸入量；招收人数",
    "examFreq": 17,
    "roots": "in-(向内) + take(拿取) -> 吃进体内的量 -> 摄入量",
    "mnemonic": "倒装合成词：take in(吸收/摄入) 翻过来变名词 intake -> calorie/sugar/food intake",
    "collocations": [
      {
        "en": "calorie intake",
        "zh": "热量摄入"
      },
      {
        "en": "daily food intake",
        "zh": "每日食物摄入量"
      },
      {
        "en": "limit sugar intake",
        "zh": "控制糖分摄入"
      }
    ],
    "realSentence": {
      "en": "For example, eating at night can lead to weight gain over time because food intake at night leads to increased fat storage.",
      "zh": "例如，夜间进食久而久之会导致体重增加，因为夜间摄入食物会促使脂肪储存增多。",
      "source": "2025.12 第1套"
    },
    "confusable": {
      "word": "uptake / outcome",
      "diff": "intake 摄入量；uptake 吸收/采纳率；outcome 结果"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v248",
    "day": 10,
    "word": "recall",
    "phonetic": "/rɪˈkɔːl/",
    "pos": "v./n.",
    "meaning": "回忆起，记起；[熟词僻义] 召回（缺陷商品），收回",
    "examFreq": 15,
    "roots": "re-(向回) + call(呼叫) -> 把往事或问题商品叫回来 -> 回忆/召回",
    "mnemonic": "一词两考：心理记忆类考“回忆起”(recall doing)，2026.06消费阅读考“食品召回”(food-safety recall)！",
    "collocations": [
      {
        "en": "recall a memory",
        "zh": "回忆往事"
      },
      {
        "en": "product recall",
        "zh": "产品召回"
      },
      {
        "en": "beyond recall",
        "zh": "无法挽回/记不清"
      }
    ],
    "realSentence": {
      "en": "In his lab, he lets kids fall asleep and then wakes them 3 times a night and asks them to describe what they recall.",
      "zh": "在实验室里，他让孩子们入睡，然后每晚叫醒他们3次，请他们描述自己回忆起的内容。",
      "source": "2025.12 第2套"
    },
    "confusable": {
      "word": "remind / remember",
      "diff": "recall 主动搜寻记忆回忆起/召回产品；remind(sb. of) 提醒；remember 记得"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v249",
    "day": 10,
    "word": "personality",
    "phonetic": "/ˌpɜːrsəˈnæləti/",
    "pos": "n.",
    "meaning": "性格，个性，人格；[熟词僻义] 名人，风云人物",
    "examFreq": 11,
    "roots": "person(人，古拉丁语面具) + -al + -ity -> 每个人独具的性格特质 -> 个性",
    "mnemonic": "别和 personal(私人的)搞混：personality 指“性格人格”，常见搭配 personality traits(性格特征)",
    "collocations": [
      {
        "en": "personality traits",
        "zh": "性格特征"
      },
      {
        "en": "strong personality",
        "zh": "鲜明/强势的个性"
      },
      {
        "en": "shape one's personality",
        "zh": "塑造性格"
      }
    ],
    "realSentence": {
      "en": "Tests that offer to find your perfect romantic match and those claiming to predict personality or talents based on your DNA are pure nonsense.",
      "zh": "那些号称能帮你找到完美恋爱对象、或声称能根据DNA预测性格和天赋的测试纯属无稽之谈。",
      "source": "2025.12 第3套"
    },
    "confusable": {
      "word": "personnel",
      "diff": "personality 性格/人格；personnel 全体职员/人事部门"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v250",
    "day": 10,
    "word": "confidence",
    "phonetic": "/ˈkɑːnfɪdəns/",
    "pos": "n.",
    "meaning": "信心，自信，信任；[熟词僻义] 机密（in confidence）",
    "examFreq": 12,
    "roots": "con-(完全) + fid(信任，如 fidelity) + -ence -> 完全信任自己或他人 -> 信心",
    "mnemonic": "词根 fid=信任！高频表达：boost self-confidence(增强自信)、have confidence in(对……有信心)",
    "collocations": [
      {
        "en": "boost confidence",
        "zh": "增强信心"
      },
      {
        "en": "have confidence in",
        "zh": "对……充满信心"
      },
      {
        "en": "self-confidence",
        "zh": "自信心"
      }
    ],
    "realSentence": {
      "en": "Agreeable people boost your confidence and allow you to relax and feel comfortable.",
      "zh": "随和友善的人能增强你的信心，让你感到放松自在。",
      "source": "2015.12 第3套"
    },
    "confusable": {
      "word": "confidential",
      "diff": "confident(adj.) 自信的；confidential(adj.) 机密的/保密的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v251",
    "day": 10,
    "word": "satisfaction",
    "phonetic": "/ˌsætɪsˈfækʃn/",
    "pos": "n.",
    "meaning": "满足，满意，称心；令人满意的事",
    "examFreq": 11,
    "roots": "satis-(足够) + fact(做) + -ion -> 做得足够充分让人称心 -> 满意",
    "mnemonic": "心理学高频词组：delayed satisfaction(延迟满足)、job satisfaction(工作满意度)",
    "collocations": [
      {
        "en": "job satisfaction",
        "zh": "工作满意度"
      },
      {
        "en": "delayed satisfaction",
        "zh": "延迟满足"
      },
      {
        "en": "a sense of satisfaction",
        "zh": "满足感"
      }
    ],
    "realSentence": {
      "en": "Because there is a delayed satisfaction associated with self-control, it can be easy to get off track.",
      "zh": "由于自我控制往往伴随延迟满足，人们很容易半途偏离轨道。",
      "source": "2024.06 第2套"
    },
    "confusable": {
      "word": "satisfactory / satisfied",
      "diff": "satisfaction(n.) 满足；satisfactory(adj.) 令人满意的(物)；satisfied 感到满意的(人)"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v252",
    "day": 10,
    "word": "interact",
    "phonetic": "/ˌɪntərˈækt/",
    "pos": "v.",
    "meaning": "互动，交流，沟通（interact with）；相互作用",
    "examFreq": 10,
    "roots": "inter-(相互) + act(行动，作用) -> 彼此之间来回行动 -> 互动/相互作用",
    "mnemonic": "拆开即懂：inter+act！社交和教育作文必用 interact with peers / face-to-face interaction",
    "collocations": [
      {
        "en": "interact with others",
        "zh": "与他人互动"
      },
      {
        "en": "social interaction",
        "zh": "社交互动"
      },
      {
        "en": "face-to-face interaction",
        "zh": "面对面交流"
      }
    ],
    "realSentence": {
      "en": "Science says that the clothes we wear affect our behavior, our mood and even the way we interact with others because of the symbolic meaning that we assign to different types of clothing.",
      "zh": "科学表明，由于我们赋予不同服饰的象征意义，穿着会影响我们的行为、情绪乃至与他人互动的方式。",
      "source": "2025.06 第2套"
    },
    "confusable": {
      "word": "react / interfere",
      "diff": "interact(with) 互动；react(to) 作出反应；interfere(in/with) 干涉妨碍"
    },
    "tag": "译写必备"
  },
  {
    "id": "v253",
    "day": 10,
    "word": "communicate",
    "phonetic": "/kəˈmjuːnɪkeɪt/",
    "pos": "v.",
    "meaning": "沟通，交流（communicate with）；传达（想法/情绪）",
    "examFreq": 14,
    "roots": "commun(共同 common) + -icate -> 让信息为双方共同拥有 -> 沟通/传达",
    "mnemonic": "既可不及物 communicate with sb.(与人交流)，也可及物 communicate ideas(传达想法)",
    "collocations": [
      {
        "en": "communicate effectively",
        "zh": "有效沟通"
      },
      {
        "en": "communicate with each other",
        "zh": "彼此交流"
      },
      {
        "en": "communication skills",
        "zh": "沟通技巧"
      }
    ],
    "realSentence": {
      "en": "People can communicate with each other using music as the common language.",
      "zh": "人们可以把音乐当作共同语言来彼此沟通。",
      "source": "2026.06 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v254",
    "day": 10,
    "word": "conflict",
    "phonetic": "/ˈkɑːnflɪkt/",
    "pos": "n./v.",
    "meaning": "冲突，矛盾，争执；[v. /kənˈflɪkt/] 抵触，冲突（conflict with）",
    "examFreq": 16,
    "roots": "con-(共同，迎面) + flict(打击) -> 迎面撞击在一起 -> 冲突/矛盾",
    "mnemonic": "名词重音在前，动词重音在后！职场/心理高频搭配 conflict resolution(解决冲突)、in conflict with",
    "collocations": [
      {
        "en": "conflict resolution",
        "zh": "冲突解决"
      },
      {
        "en": "in conflict with",
        "zh": "与……冲突"
      },
      {
        "en": "conflicting feelings",
        "zh": "矛盾的心情"
      }
    ],
    "realSentence": {
      "en": "But most of us have conflicting feelings about dressing up and feel guilty about taking the time to focus on clothes.",
      "zh": "但我们大多数人对盛装打扮怀有矛盾心情，并且会因花时间关注穿着而感到内疚。",
      "source": "2025.06 第2套"
    },
    "confusable": {
      "word": "inflict / afflict",
      "diff": "conflict 冲突矛盾；inflict(on) 施加伤害；afflict 折磨困扰"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v255",
    "day": 10,
    "word": "trust",
    "phonetic": "/trʌst/",
    "pos": "n./v.",
    "meaning": "信任，信赖；[熟词僻义 n.] 信托基金，托拉斯组织；托付",
    "examFreq": 9,
    "roots": "古诺尔斯语 traust(坚定，依靠) -> 可以放心托付 -> 信任/信托",
    "mnemonic": "写作人际主题高频：build/earn mutual trust(建立/赢得互信)；阅读专名 Woodland Trust 表“信托保护基金会”",
    "collocations": [
      {
        "en": "build mutual trust",
        "zh": "建立互信"
      },
      {
        "en": "earn someone's trust",
        "zh": "赢得某人的信任"
      },
      {
        "en": "trust one's judgement",
        "zh": "信赖某人的判断"
      }
    ],
    "realSentence": {
      "en": "The more they achieve and the greater progress they make, the more they trust your judgement and strength.",
      "zh": "他们取得的成就越多、进步越大，就越信任你的判断力与实力。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "thrust",
      "diff": "trust 信任/信托；thrust 猛推/刺入"
    },
    "tag": "译写必备"
  },
  {
    "id": "v256",
    "day": 10,
    "word": "bond",
    "phonetic": "/bɑːnd/",
    "pos": "n./v.",
    "meaning": "纽带，紧密关系，联结；[v.] 建立深厚感情；[熟词僻义 n.] 债券",
    "examFreq": 3,
    "roots": "与 bind(捆绑)同源 -> 把人与人紧紧系在一起的线 -> 情感纽带/债券",
    "mnemonic": "情感人际作文绝佳词：strengthen family bonds(加强家庭纽带)；经济新闻里指“债券”(government bonds)",
    "collocations": [
      {
        "en": "strong bonds",
        "zh": "深厚的情感纽带"
      },
      {
        "en": "family bond",
        "zh": "亲情纽带"
      },
      {
        "en": "bond with",
        "zh": "与……建立亲密联系"
      }
    ],
    "realSentence": {
      "en": "There's an endless amount of scientific data proving that dogs can develop strong bonds with their owners.",
      "zh": "无数科学数据证明，狗能够与主人建立起深厚的情感纽带。",
      "source": "2019.12 第2套听力"
    },
    "confusable": {
      "word": "bound / band",
      "diff": "bond 纽带/债券；bound 必然的(be bound to)/边界；band 乐队/带子"
    },
    "tag": "译写必备"
  },
  {
    "id": "v257",
    "day": 10,
    "word": "mood",
    "phonetic": "/muːd/",
    "pos": "n.",
    "meaning": "心情，心境，情绪；氛围，气氛",
    "examFreq": 8,
    "roots": "古英语 mod(心智，心境) -> 当下的情绪状态 -> 心情",
    "mnemonic": "听力高频口语表达：in a good/bad mood(心情好/差)、be in the mood for(有心情做某事)",
    "collocations": [
      {
        "en": "in the mood for",
        "zh": "有心情做某事"
      },
      {
        "en": "lift one's mood",
        "zh": "改善心情"
      },
      {
        "en": "mood swings",
        "zh": "情绪波动"
      }
    ],
    "realSentence": {
      "en": "It's an important subject, I agree, but I'm not in the mood for anything depressing.",
      "zh": "我同意这是个重要话题，但我现在没心情看任何令人沮丧的内容。",
      "source": "2018.06 第1套听力"
    },
    "confusable": {
      "word": "mode / model",
      "diff": "mood 心情情绪；mode 模式方式；model 模型/典范"
    },
    "tag": "听力高频"
  },
  {
    "id": "v258",
    "day": 10,
    "word": "comfort",
    "phonetic": "/ˈkʌmfərt/",
    "pos": "n./v.",
    "meaning": "安慰，慰藉；舒适，安逸；[v.] 安慰，抚慰",
    "examFreq": 7,
    "roots": "com-(加强) + fort(力量，强壮) -> 给人注入心灵力量 -> 安慰/舒适",
    "mnemonic": "高分短语：step out of one's comfort zone(走出舒适区)——成长励志作文必杀句！",
    "collocations": [
      {
        "en": "comfort zone",
        "zh": "舒适区"
      },
      {
        "en": "in times of trouble",
        "zh": "在困难时期"
      },
      {
        "en": "bring comfort to",
        "zh": "给……带来慰藉"
      }
    ],
    "realSentence": {
      "en": "They comfort us in times of trouble, calming down a racing heart by channeling happy calories inside us.",
      "zh": "它们在困境中抚慰我们，通过向体内输送带来愉悦的热量让狂跳的心平静下来。",
      "source": "2024.12 第2套"
    },
    "confusable": {
      "word": "confront / conform",
      "diff": "comfort 安慰/舒适；confront 直面/对抗；conform 遵守顺从"
    },
    "tag": "阅读核心"
  },
  {
    "id": "v259",
    "day": 10,
    "word": "passion",
    "phonetic": "/ˈpæʃn/",
    "pos": "n.",
    "meaning": "激情，热情，酷爱（have a passion for）",
    "examFreq": 9,
    "roots": "拉丁词根 pass-(强烈感受，承受) + -ion -> 内心炽热的情感 -> 激情/酷爱",
    "mnemonic": "2025.06阅读“坚毅(grit)=热情(passion)+坚持(persistence)”；形容词 passionate(充满激情的)",
    "collocations": [
      {
        "en": "have a passion for",
        "zh": "酷爱，对……充满热情"
      },
      {
        "en": "sustainable passion",
        "zh": "持久的热情"
      },
      {
        "en": "be passionate about",
        "zh": "热衷于……"
      }
    ],
    "realSentence": {
      "en": "She introduces a new concept that talent may be overrated, and if you want real success, what you need is grit, the perfect combination of passion and persistence.",
      "zh": "她提出了一个新观点：天赋或许被高估了，要想获得真正的成功，你需要的是坚毅——即热情与坚持的完美结合。",
      "source": "2025.06 第1套"
    },
    "confusable": {
      "word": "compassion / passive",
      "diff": "passion 激情酷爱；compassion 同情怜悯；passive 被动的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v260",
    "day": 10,
    "word": "behavior",
    "phonetic": "/bɪˈheɪvjər/",
    "pos": "n.",
    "meaning": "行为，举止，表现；运转方式（英式拼写 behaviour）",
    "examFreq": 38,
    "roots": "be-(彻底) + have(把握自己) + -ior -> 管好自身言行的方式 -> 行为举止",
    "mnemonic": "心理与社会阅读最高频词之一！注意动词 behave(表现得体)，形容词 behavioral(行为学的)",
    "collocations": [
      {
        "en": "cooperative behavior",
        "zh": "合作行为"
      },
      {
        "en": "choice of behavior",
        "zh": "行为选择"
      },
      {
        "en": "behavioral patterns",
        "zh": "行为模式"
      }
    ],
    "realSentence": {
      "en": "Yet almost no behavior is entirely genetic, even among identical twins.",
      "zh": "然而，几乎没有任何行为是完全由基因决定的，即便在同卵双胞胎之间也是如此。",
      "source": "2026.06 第1套"
    },
    "confusable": null,
    "tag": "阅读核心"
  },
  {
    "id": "v261",
    "day": 11,
    "word": "despite",
    "phonetic": "/dɪˈspaɪt/",
    "pos": "prep.",
    "meaning": "尽管，不管，虽然（介词！直接接名词/动名词，绝不加 of！）",
    "examFreq": 15,
    "roots": "de-(向下) + spite(看) -> 无视阻力依然发生 -> 尽管",
    "mnemonic": "语法铁律防扣分：despite = in spite of！绝对不能写 despite of，也不能直接接完整从句（除非 despite the fact that）！",
    "collocations": [
      {
        "en": "despite the fact that",
        "zh": "尽管事实上……"
      },
      {
        "en": "despite difficulties",
        "zh": "尽管困难重重"
      },
      {
        "en": "despite its potential",
        "zh": "尽管它很有潜力"
      }
    ],
    "realSentence": {
      "en": "Some scholars think teamwork may not always be reliable, despite its potential to work wonders.",
      "zh": "一些学者认为，尽管团队合作有创造奇迹的潜力，但它未必总是可靠的。",
      "source": "2017.06 第2套"
    },
    "confusable": {
      "word": "despise",
      "diff": "despite(prep.) 尽管；despise(v.) 鄙视/轻视"
    },
    "tag": "同义替换"
  },
  {
    "id": "v262",
    "day": 11,
    "word": "whereas",
    "phonetic": "/ˌwerˈæz/",
    "pos": "conj.",
    "meaning": "然而，但是，而（表前后鲜明对比）；鉴于",
    "examFreq": 8,
    "roots": "where(在……之处) + as(正如) -> 放在对比两边对照 -> 然而/而",
    "mnemonic": "四级作文对比论证神级连词！把平淡的 but 升级成 whereas，立刻拉高句式档次！",
    "collocations": [
      {
        "en": "A..., whereas B...",
        "zh": "A……，而B……"
      },
      {
        "en": "whereas others argue",
        "zh": "而另一些人主张"
      },
      {
        "en": "contrast with whereas",
        "zh": "用whereas引出对比"
      }
    ],
    "realSentence": {
      "en": "Forty-eight of the students received instruction in study skills only, whereas the others attended a combination of study skills sessions and classes in which they learned about the growth mind-set and how to apply it to schoolwork.",
      "zh": "48名学生仅接受了学习技巧指导，而其余学生则既参加了学习技巧课，又学习了成长型思维及其在学业中的应用。",
      "source": "2016.12 第2套"
    },
    "confusable": {
      "word": "whereby",
      "diff": "whereas 然而/对比；whereby 借以/通过该方式(引导定语从句)"
    },
    "tag": "同义替换"
  },
  {
    "id": "v263",
    "day": 11,
    "word": "otherwise",
    "phonetic": "/ˈʌðərwaɪz/",
    "pos": "adv./conj.",
    "meaning": "否则，不然；[熟词僻义 adv.] 除此之外，在其他方面，以其他方式",
    "examFreq": 9,
    "roots": "other(其他的) + wise(方式，如 likewise) -> 按别的方式 -> 否则/在其他方面",
    "mnemonic": "阅读熟词僻义：otherwise stable careers = “在其他方面原本很稳定的职业”，并非只译“否则”！",
    "collocations": [
      {
        "en": "or otherwise",
        "zh": "或者相反/以其他方式"
      },
      {
        "en": "otherwise have overlooked",
        "zh": "否则本会忽略"
      },
      {
        "en": "otherwise stable",
        "zh": "在其他方面稳定的"
      }
    ],
    "realSentence": {
      "en": "When Leah made the commitment to change, she primed herself to new opportunities she may otherwise have overlooked.",
      "zh": "当莉亚下定决心改变时，她便让自己准备好迎接那些原本可能会错过的新机遇。",
      "source": "2017.06 第3套"
    },
    "confusable": {
      "word": "likewise",
      "diff": "otherwise 否则/在其他方面；likewise 同样地/照样地"
    },
    "tag": "同义替换"
  },
  {
    "id": "v264",
    "day": 11,
    "word": "nevertheless",
    "phonetic": "/ˌnevərðəˈles/",
    "pos": "adv.",
    "meaning": "然而，不过，尽管如此（副词！接逗号，不能直接连接两个无连词分句）",
    "examFreq": 1,
    "roots": "never + the + less -> 丝毫不因此减少 -> 尽管如此/然而",
    "mnemonic": "阅读转折信号雷达词！与 nonetheless / however 完全同级，听到或读到它后面必出重点观点！",
    "collocations": [
      {
        "en": "nevertheless, ...",
        "zh": "然而，尽管如此……"
      },
      {
        "en": "but nevertheless",
        "zh": "但尽管如此"
      },
      {
        "en": "nonetheless",
        "zh": "尽管如此（同义替换）"
      }
    ],
    "realSentence": {
      "en": "Nevertheless, you should always focus on quality, not quantity.",
      "zh": "尽管如此，你应当始终注重质量，而不是数量。",
      "source": "2018.06 第2套听力"
    },
    "confusable": null,
    "tag": "同义替换"
  },
  {
    "id": "v265",
    "day": 11,
    "word": "meanwhile",
    "phonetic": "/ˈmiːnwaɪl/",
    "pos": "adv.",
    "meaning": "与此同时，在此期间；另一方面",
    "examFreq": 7,
    "roots": "mean(中间的) + while(一段时间) -> 在同一段时间内 -> 与此同时",
    "mnemonic": "写作段落过渡王牌衔接副词！等同于 in the meantime，比 at the same time 更简洁利落",
    "collocations": [
      {
        "en": "meanwhile, ...",
        "zh": "与此同时……"
      },
      {
        "en": "in the meanwhile",
        "zh": "在此期间"
      },
      {
        "en": "meanwhile, it pays to",
        "zh": "与此同时，……是值得的"
      }
    ],
    "realSentence": {
      "en": "Meanwhile, it pays to examine studies funded by industry or special interest groups with extra care.",
      "zh": "与此同时，对由行业或特殊利益集团资助的研究格外审慎地加以审视是值得的。",
      "source": "2024.06 第2套"
    },
    "confusable": null,
    "tag": "同义替换"
  },
  {
    "id": "v266",
    "day": 11,
    "word": "therefore",
    "phonetic": "/ˈðerfɔːr/",
    "pos": "adv.",
    "meaning": "因此，所以，因而（因果逻辑副词，同义 thus / hence）",
    "examFreq": 7,
    "roots": "there(那个原因) + fore(向前引出) -> 由前因引出结果 -> 因此",
    "mnemonic": "阅读因果题锚点！注意它是副词不是连词，两句话间要用句号/分号隔开，或写 and therefore",
    "collocations": [
      {
        "en": "therefore, ...",
        "zh": "因此……"
      },
      {
        "en": "and therefore",
        "zh": "并因此"
      },
      {
        "en": "it therefore follows that",
        "zh": "由此可见……"
      }
    ],
    "realSentence": {
      "en": "Therefore, they are willing to sacrifice their own time, hobbies and interests to provide better conditions for their children.",
      "zh": "因此，他们愿意牺牲自己的时间、爱好和兴趣，为孩子提供更好的条件。",
      "source": "2015.12 第1套"
    },
    "confusable": {
      "word": "thereby / thereafter",
      "diff": "therefore 因此所以；thereby 从而/借此；thereafter 从那以后"
    },
    "tag": "同义替换"
  },
  {
    "id": "v267",
    "day": 11,
    "word": "furthermore",
    "phonetic": "/ˌfɜːrðərˈmɔːr/",
    "pos": "adv.",
    "meaning": "此外，而且，更有甚者（递进逻辑副词）",
    "examFreq": 5,
    "roots": "further(进一步) + more(更多) -> 更进一步说 -> 此外/而且",
    "mnemonic": "作文第二论点开头神器！彻底淘汰小学生连词 besides / and also，换上 Furthermore / Moreover！",
    "collocations": [
      {
        "en": "furthermore, ...",
        "zh": "此外，而且……"
      },
      {
        "en": "moreover",
        "zh": "此外（同义替换）"
      },
      {
        "en": "in addition",
        "zh": "除此之外（同义替换）"
      }
    ],
    "realSentence": {
      "en": "Furthermore, listening can really benefit yourself.",
      "zh": "此外，倾听确实能让你自身受益匪浅。",
      "source": "2015.12 第1套"
    },
    "confusable": null,
    "tag": "同义替换"
  },
  {
    "id": "v268",
    "day": 11,
    "word": "consequently",
    "phonetic": "/ˈkɑːnsɪkwentli/",
    "pos": "adv.",
    "meaning": "因此，结果，所以（正式书面因果衔接词）",
    "examFreq": 3,
    "roots": "con-(随同) + sequ(跟随，如 sequence) + -ent + -ly -> 紧随其后产生结果地 -> 因此",
    "mnemonic": "由 consequence(后果) 变来！作文总结因果时替换 so，立刻显出四级高分书面感",
    "collocations": [
      {
        "en": "consequently, ...",
        "zh": "因此，结果……"
      },
      {
        "en": "as a consequence",
        "zh": "结果，因此"
      },
      {
        "en": "consequently lead to",
        "zh": "进而导致"
      }
    ],
    "realSentence": {
      "en": "Consequently, all human body functions also follow this daily rhythm, and the timing of behaviors like exercise or food intake can significantly influence your health.",
      "zh": "因此，人体各项机能也都遵循这一昼夜节律，运动或进食等行为的时间安排会显著影响健康。",
      "source": "2025.12 第1套"
    },
    "confusable": {
      "word": "subsequently / consistently",
      "diff": "consequently 因此(因果)；subsequently 随后后来(时间)；consistently 一贯地"
    },
    "tag": "同义替换"
  },
  {
    "id": "v269",
    "day": 11,
    "word": "instead",
    "phonetic": "/ɪnˈsted/",
    "pos": "adv.",
    "meaning": "反而，却，作为替代（单用放句首/句尾；加 of 接被替代的对象）",
    "examFreq": 36,
    "roots": "in + stead(位置，地方) -> 站到原来的位置上顶替 -> 反而/代替",
    "mnemonic": "阅读与听力强转折信号词！听到 Instead, ... 后面紧跟的才是真实做法或正确答案！",
    "collocations": [
      {
        "en": "instead of doing",
        "zh": "而不是做某事"
      },
      {
        "en": "instead, ...",
        "zh": "相反，反而……"
      },
      {
        "en": "do A instead of B",
        "zh": "做A而不做B"
      }
    ],
    "realSentence": {
      "en": "Instead of fighting your present self's need for immediate rewards, why not use it to your advantage?",
      "zh": "与其对抗当下的自己对即时回报的渴望，何不顺势将其转化为优势？",
      "source": "2024.06 第2套"
    },
    "confusable": null,
    "tag": "同义替换"
  },
  {
    "id": "v270",
    "day": 11,
    "word": "unlike",
    "phonetic": "/ˌʌnˈlaɪk/",
    "pos": "prep./adj.",
    "meaning": "与……不同，不像（介词，引导鲜明对比）；不同的",
    "examFreq": 8,
    "roots": "un-(不) + like(像) -> 不像……那样 -> 与……不同",
    "mnemonic": "别和 dislike(v. 不喜欢)混淆！unlike 是介词“不像”，写作开头对比句极好用：Unlike traditional methods, ...",
    "collocations": [
      {
        "en": "unlike traditional methods",
        "zh": "与传统方法不同"
      },
      {
        "en": "not unlike",
        "zh": "很像，颇似"
      },
      {
        "en": "be unlike sb. to do",
        "zh": "做某事不像某人平时的作风"
      }
    ],
    "realSentence": {
      "en": "The issue is that, unlike using a smartphone app, operating a car has serious safety risks, whether the driver is human or software.",
      "zh": "问题在于，与使用手机应用不同，无论是人类还是软件操控汽车，都存在严重的安全风险。",
      "source": "2024.12 第3套"
    },
    "confusable": {
      "word": "dislike / unlikely",
      "diff": "unlike(prep.) 与……不同；dislike(v.) 不喜欢；unlikely(adj.) 不太可能的"
    },
    "tag": "同义替换"
  },
  {
    "id": "v271",
    "day": 11,
    "word": "regardless",
    "phonetic": "/rɪˈɡɑːrdləs/",
    "pos": "adv.",
    "meaning": "不管，不顾，无论如何（固定搭配 regardless of）",
    "examFreq": 7,
    "roots": "regard(关心，顾及) + -less(无) -> 毫不在意阻力地 -> 不顾",
    "mnemonic": "高频介词短语 regardless of = irrespective of(不管……)，后接名词/whether 从句",
    "collocations": [
      {
        "en": "regardless of",
        "zh": "不管，不顾"
      },
      {
        "en": "regardless of the cost",
        "zh": "不计代价"
      },
      {
        "en": "regardless of background",
        "zh": "不论背景如何"
      }
    ],
    "realSentence": {
      "en": "Many of these penalties are imposed regardless of the seriousness of the offense or the person's individual circumstances.",
      "zh": "无论违法行为严重与否，也不管当事人的个人情况如何，许多此类处罚都会被强加执行。",
      "source": "2015.12 第1套"
    },
    "confusable": {
      "word": "regarding",
      "diff": "regardless(of) 不管/不顾；regarding(prep.) 关于/至于"
    },
    "tag": "同义替换"
  },
  {
    "id": "v272",
    "day": 11,
    "word": "contrary",
    "phonetic": "/ˈkɑːntreri/",
    "pos": "adj./n.",
    "meaning": "相反的，相对立的（contrary to）；[n.] 相反的情况（on the contrary）",
    "examFreq": 4,
    "roots": "contra-(对抗，相反) + -ary -> 针锋相对的 -> 相反的",
    "mnemonic": "双短语铁背：contrary to popular belief(与普遍看法相反)；on the contrary(恰恰相反)！",
    "collocations": [
      {
        "en": "contrary to",
        "zh": "与……相反"
      },
      {
        "en": "on the contrary",
        "zh": "恰恰相反"
      },
      {
        "en": "contrary to expectations",
        "zh": "出乎意料/与预期相反"
      }
    ],
    "realSentence": {
      "en": "But contrary to all the publicity that everyone needs more protein, most Americans get twice as much as they need.",
      "zh": "但与宣称人人都需要更多蛋白质的铺天宣传相反，大多数美国人摄入的蛋白质是实际需求量的两倍。",
      "source": "2024.12 第3套"
    },
    "confusable": {
      "word": "contrast",
      "diff": "contrary 相反对立的(contrary to)；contrast 对比反差(in contrast to)"
    },
    "tag": "同义替换"
  },
  {
    "id": "v273",
    "day": 11,
    "word": "contrast",
    "phonetic": "/ˈkɑːntræst/",
    "pos": "n./v.",
    "meaning": "对比，对照，明显差异；[v. /kənˈtræst/] 形成对比",
    "examFreq": 6,
    "roots": "contra-(相对) + st(站立) -> 面对面站在一起比高下 -> 对比/反差",
    "mnemonic": "高频衔接短语：in contrast / by contrast(相比之下)，in sharp contrast to(与……形成鲜明对比)",
    "collocations": [
      {
        "en": "in contrast",
        "zh": "相比之下"
      },
      {
        "en": "by contrast",
        "zh": "与之相反/相比之下"
      },
      {
        "en": "in sharp contrast to",
        "zh": "与……形成鲜明对比"
      }
    ],
    "realSentence": {
      "en": "In contrast, the new intervention cleverly exploits teenagers' instinct for rebelliousness and autonomy, and the value they place on social justice.",
      "zh": "相比之下，新的干预措施巧妙利用了青少年的叛逆本能、自主意识以及他们对社会公平的重视。",
      "source": "2025.12 第2套"
    },
    "confusable": {
      "word": "contract / contact",
      "diff": "contrast 对比反差；contract 合同/收缩；contact 联系接触"
    },
    "tag": "同义替换"
  },
  {
    "id": "v274",
    "day": 11,
    "word": "correspond",
    "phonetic": "/ˌkɔːrəˈspɑːnd/",
    "pos": "v.",
    "meaning": "符合，相一致，相对应（correspond to/with）；通信",
    "examFreq": 1,
    "roots": "cor-(共同) + respond(回应) -> 彼此一一呼应 -> 相对应/通信",
    "mnemonic": "注意：四级卷面指令 corresponding letter(相应的字母) 正是由此而来！搭配 correspond to(相当于/对应)",
    "collocations": [
      {
        "en": "correspond to",
        "zh": "与……相对应/相当于"
      },
      {
        "en": "correspond with",
        "zh": "与……一致/与……通信"
      },
      {
        "en": "corresponding change",
        "zh": "相应的变化"
      }
    ],
    "realSentence": {
      "en": "Russia's other late nights and early mornings generally correspond to public holidays.",
      "zh": "俄罗斯人其他晚睡早起的时段通常与公共节假日相对应。",
      "source": "2015.12 第2套"
    },
    "confusable": {
      "word": "respond",
      "diff": "correspond(to/with) 对应/符合/通信；respond(to) 回应答复"
    },
    "tag": "同义替换"
  },
  {
    "id": "v275",
    "day": 11,
    "word": "associate",
    "phonetic": "/əˈsoʊsieɪt/",
    "pos": "v./n./adj.",
    "meaning": "将……联系起来，联想（be associated with）；[n.] 伙伴，同事；[adj.] 副的",
    "examFreq": 31,
    "roots": "as-(朝向) + soci(伙伴，社会 social) + -ate -> 拉在一起结伴 -> 联系/联合",
    "mnemonic": "阅读最高频因果/相关替代表达：be associated with = be linked/related to(与……有关)；associate professor(副教授)",
    "collocations": [
      {
        "en": "be associated with",
        "zh": "与……有关联"
      },
      {
        "en": "associate A with B",
        "zh": "把A和B联系起来"
      },
      {
        "en": "associate director",
        "zh": "副主任/副总监"
      }
    ],
    "realSentence": {
      "en": "After the intervention, participants associated healthy eating with autonomy and social justice.",
      "zh": "经过干预后，受试者将健康饮食与自主权和社会公平联系在了一起。",
      "source": "2025.12 第2套"
    },
    "confusable": null,
    "tag": "同义替换"
  },
  {
    "id": "v276",
    "day": 11,
    "word": "differ",
    "phonetic": "/ˈdɪfər/",
    "pos": "v.",
    "meaning": "不同于，有区别（differ from）；意见分歧",
    "examFreq": 18,
    "roots": "dif-(分开) + fer(带，拿) -> 各朝一边带走 -> 不同/有分歧",
    "mnemonic": "记固定搭配：differ from(与……不同)、differ in(在某方面不同)；观点题高频句 Opinions differ as to...(关于……众说纷纭)",
    "collocations": [
      {
        "en": "differ from",
        "zh": "与……不同"
      },
      {
        "en": "opinions differ",
        "zh": "意见不一"
      },
      {
        "en": "differ sharply",
        "zh": "截然不同"
      }
    ],
    "realSentence": {
      "en": "Opinions differ as to whether breakfast is the most important meal of the day.",
      "zh": "关于早餐是否是一天中最重要的一餐，人们观点不一。",
      "source": "2019.12 第2套"
    },
    "confusable": {
      "word": "defer / infer / refer",
      "diff": "differ 不同于；defer 推迟/顺从；infer 推断；refer 提及参考"
    },
    "tag": "同义替换"
  },
  {
    "id": "v277",
    "day": 11,
    "word": "vary",
    "phonetic": "/ˈveri/",
    "pos": "v.",
    "meaning": "变化，改变；各不相同，呈多样性（vary from...to...）",
    "examFreq": 11,
    "roots": "拉丁词根 vari-(多种多样的) -> 呈现多样变化 -> 变化/各异",
    "mnemonic": "同根一家亲：vary(v.变化) -> various(adj.各种各样) -> variety(n.多样性，a variety of)！",
    "collocations": [
      {
        "en": "vary from... to...",
        "zh": "从……到……各不相同"
      },
      {
        "en": "vary widely",
        "zh": "差异很大"
      },
      {
        "en": "vary by category",
        "zh": "因类别而异"
      }
    ],
    "realSentence": {
      "en": "Academic departments vary in their procedures for assigning academic advisers to graduate students.",
      "zh": "各学术院系为研究生分配学业导师的流程各不相同。",
      "source": "2016.06 第2套听力"
    },
    "confusable": {
      "word": "very / weary",
      "diff": "vary(v.) 变化/各异；very(adv.) 非常；weary(adj.) 疲倦厌烦的"
    },
    "tag": "同义替换"
  },
  {
    "id": "v278",
    "day": 11,
    "word": "derive",
    "phonetic": "/dɪˈraɪv/",
    "pos": "v.",
    "meaning": "获得，取得（derive sth. from）；源自，起源于（be derived from）",
    "examFreq": 8,
    "roots": "de-(向下) + rive(河流 river) -> 从上游河道引水下来 -> 源自/获得",
    "mnemonic": "像从大河(river)引水(de+rive)灌溉！高频搭配 derive pleasure/meaning from(从……中获得乐趣/意义)",
    "collocations": [
      {
        "en": "derive from",
        "zh": "源自，来源于"
      },
      {
        "en": "derive meaning from",
        "zh": "从……中获得意义"
      },
      {
        "en": "derive pleasure from",
        "zh": "从……中获得乐趣"
      }
    ],
    "realSentence": {
      "en": "These top earners derive meaning from their jobs and work is an important part of how they think of themselves.",
      "zh": "这些高收入者从工作中获得人生意义，工作也是他们自我认知的重要组成部分。",
      "source": "2024.06 第1套"
    },
    "confusable": {
      "word": "deprive / drive",
      "diff": "derive(from) 源自/获得；deprive(of) 剥夺；drive 驾驶/驱使"
    },
    "tag": "同义替换"
  },
  {
    "id": "v279",
    "day": 11,
    "word": "attribute",
    "phonetic": "/əˈtrɪbjuːt/",
    "pos": "v./n.",
    "meaning": "把……归因于（attribute A to B）；[n. /ˈætrɪbjuːt/] 属性，特质",
    "examFreq": 16,
    "roots": "at-(朝向) + tribute(给予) -> 把功劳或原因归到某处 -> 归因于/属性",
    "mnemonic": "因果同义替换天花板：attribute A to B(把结果A归因于原因B) = owe A to B！",
    "collocations": [
      {
        "en": "attribute A to B",
        "zh": "把A归因于B"
      },
      {
        "en": "be attributed to",
        "zh": "归因于……"
      },
      {
        "en": "personal attributes",
        "zh": "个人特质"
      }
    ],
    "realSentence": {
      "en": "All of their success can be attributed to their constant learning in addition to the progress of technology.",
      "zh": "他们所有的成功，除了技术进步外，都可归功于持续不断的学习。",
      "source": "2015.12 第2套"
    },
    "confusable": {
      "word": "contribute / distribute",
      "diff": "attribute(to) 归因于；contribute(to) 贡献/促成；distribute 分发分布"
    },
    "tag": "同义替换"
  },
  {
    "id": "v280",
    "day": 11,
    "word": "alter",
    "phonetic": "/ˈɔːltər/",
    "pos": "v.",
    "meaning": "改变，改动，修改（通常指局部或外在变化，不改本质）",
    "examFreq": 6,
    "roots": "拉丁词根 alter-(另一个，如 alternative) -> 变成另一种样子 -> 改变",
    "mnemonic": "阅读中高频替换 change！衍生词 alternative(可替代的/替代方案) 也是四级必考词",
    "collocations": [
      {
        "en": "alter one's image",
        "zh": "改变自身形象"
      },
      {
        "en": "alter lifestyles",
        "zh": "改变生活方式"
      },
      {
        "en": "alternative options",
        "zh": "替代方案"
      }
    ],
    "realSentence": {
      "en": "Five-year-olds aren't just aware of their reputations, they also behave strategically to alter their outward image.",
      "zh": "五岁的孩子不仅在意自己的名声，还会策略性地表现以改变自己的外在形象。",
      "source": "2025.06 第1套"
    },
    "confusable": {
      "word": "alert / altar",
      "diff": "alter(v.) 改变修改；alert(adj./v.) 警觉的/警报；altar(n.) 祭坛"
    },
    "tag": "同义替换"
  },
  {
    "id": "v281",
    "day": 11,
    "word": "sustain",
    "phonetic": "/səˈsteɪn/",
    "pos": "v.",
    "meaning": "维持，长期保持；支撑，供养；[熟词僻义] 遭受（伤病/损失）",
    "examFreq": 9,
    "roots": "sus-(在下面 sub-) + tain(托住，拿住) -> 在底下一直托住 -> 维持/支撑",
    "mnemonic": "底下(sus)牢牢托住(tain) -> 长久维系！衍生词 sustainable(可持续的)、sustained(持续的)",
    "collocations": [
      {
        "en": "sustain relationships",
        "zh": "维系长久关系"
      },
      {
        "en": "sustained positive effect",
        "zh": "持久的积极效应"
      },
      {
        "en": "sustain injuries",
        "zh": "遭受创伤"
      }
    ],
    "realSentence": {
      "en": "In order to sustain those relationships, you must be able to work in their best interests as well.",
      "zh": "为了长久维系这些关系，你也必须能够为他们的最大利益着想。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "maintain / retain / obtain",
      "diff": "sustain 长期支撑维持；maintain 维护保养/主张；retain 保留；obtain 获得"
    },
    "tag": "同义替换"
  },
  {
    "id": "v282",
    "day": 11,
    "word": "emerge",
    "phonetic": "/ɪˈmɜːrdʒ/",
    "pos": "v.",
    "meaning": "出现，浮现，兴起；显露，摆脱（困境）",
    "examFreq": 9,
    "roots": "e-(出来) + merge(沉入，水下) -> 从水下浮出水面 -> 浮现/兴起",
    "mnemonic": "同义替换 appear/arise 的高级词！emerging technologies(新兴技术)、emergency(紧急情况)",
    "collocations": [
      {
        "en": "emerge from",
        "zh": "从……中浮现/显露"
      },
      {
        "en": "emerging technologies",
        "zh": "新兴技术"
      },
      {
        "en": "emerge as",
        "zh": "作为……崭露头角"
      }
    ],
    "realSentence": {
      "en": "Those are a few of the traits of successful science crowdfunding efforts that emerge from a recent study that examined nearly 400 campaigns.",
      "zh": "这些都是近期一项考察近400个项目的研究所总结出的成功科研众筹特征。",
      "source": "2019.12 第1套"
    },
    "confusable": {
      "word": "merge / submerge",
      "diff": "emerge 浮现出现；merge 合并融合；submerge 淹没潜入水下"
    },
    "tag": "同义替换"
  },
  {
    "id": "v283",
    "day": 11,
    "word": "yield",
    "phonetic": "/jiːld/",
    "pos": "v./n.",
    "meaning": "产出，产生（结果/收益）；[熟词僻义 v.] 屈服，让步（yield to）；[n.] 产量，收益",
    "examFreq": 11,
    "roots": "古英语 gieldan(支付，回报) -> 土地回报的收成 -> 产量/产出；认输交出 -> 屈服",
    "mnemonic": "一词双绝：农业/科研文里是“产量/产出”(crop yields / yield results)；态度文里 yield to = give in to(屈服于)",
    "collocations": [
      {
        "en": "crop yields",
        "zh": "农作物产量"
      },
      {
        "en": "yield positive results",
        "zh": "产生积极结果"
      },
      {
        "en": "yield to pressure",
        "zh": "屈服于压力"
      }
    ],
    "realSentence": {
      "en": "What do advocates of organic farming argue about its yields and efficiency?",
      "zh": "有机农业的倡导者对其产量与效率提出了怎样的主张？",
      "source": "2026.06 第1套"
    },
    "confusable": {
      "word": "shield / field",
      "diff": "yield 产量/产出/屈服；shield 盾牌/保护；field 田野/领域"
    },
    "tag": "同义替换"
  },
  {
    "id": "v284",
    "day": 11,
    "word": "abandon",
    "phonetic": "/əˈbændən/",
    "pos": "v.",
    "meaning": "放弃（计划/观念）；抛弃，遗弃；沉溺于（abandon oneself to）",
    "examFreq": 12,
    "roots": "a-(去) + bandon(控制权) -> 交出控制权不管了 -> 放弃/抛弃",
    "mnemonic": "四级词书第一词！阅读高频同义替换 give up / desert，如 abandon a policy/plan",
    "collocations": [
      {
        "en": "abandon a plan",
        "zh": "放弃一项计划"
      },
      {
        "en": "be abandoned due to",
        "zh": "因……而被废弃"
      },
      {
        "en": "abandon oneself to",
        "zh": "沉溺于……"
      }
    ],
    "realSentence": {
      "en": "It was first developed for the US government as a long-range spy aircraft, but was abandoned following budget cutbacks.",
      "zh": "它最初是为美国政府研发的远程侦察机，但随着预算削减而被放弃。",
      "source": "2018.06 第1套听力"
    },
    "confusable": {
      "word": "abundant",
      "diff": "abandon(v.) 放弃抛弃；abundant(adj.) 丰富的充裕的"
    },
    "tag": "同义替换"
  },
  {
    "id": "v285",
    "day": 11,
    "word": "restrict",
    "phonetic": "/rɪˈstrɪkt/",
    "pos": "v.",
    "meaning": "限制，限定，约束（restrict...to...）",
    "examFreq": 3,
    "roots": "re-(向回) + strict(拉紧，严格的) -> 向回拉紧缰绳 -> 限制/约束",
    "mnemonic": "词根 strict(严格)！高级替换 limit，常考搭配 restrict access to / impose restrictions on",
    "collocations": [
      {
        "en": "restrict access to",
        "zh": "限制对……的获取/进入"
      },
      {
        "en": "impose restrictions on",
        "zh": "对……施加限制"
      },
      {
        "en": "speed restriction",
        "zh": "限速"
      }
    ],
    "realSentence": {
      "en": "Laws can restrict or ban voting, access to public housing, and professional and business licensing.",
      "zh": "法律可能会限制或禁止投票权、公共住房申请权以及职业与商业执业许可。",
      "source": "2015.12 第1套"
    },
    "confusable": {
      "word": "strict / district",
      "diff": "restrict(v.) 限制约束；strict(adj.) 严格的；district(n.) 行政区/学区"
    },
    "tag": "同义替换"
  },
  {
    "id": "v286",
    "day": 11,
    "word": "compensate",
    "phonetic": "/ˈkɑːmpenseɪt/",
    "pos": "v.",
    "meaning": "弥补，补偿（compensate for）；赔偿（compensate sb. for sth.）",
    "examFreq": 4,
    "roots": "com-(共同) + pens(称重，支付) + -ate -> 把天平两边称平补齐 -> 弥补/赔偿",
    "mnemonic": "选词与阅读高频同义替换 make up for！记住不及物表“弥补”必加 for：compensate for the loss",
    "collocations": [
      {
        "en": "compensate for",
        "zh": "弥补，补偿"
      },
      {
        "en": "be compensated for",
        "zh": "获得……的赔偿"
      },
      {
        "en": "financial compensation",
        "zh": "经济补偿"
      }
    ],
    "realSentence": {
      "en": "That lack of curiosity produces a relative lack of knowledge, and the lack of knowledge is difficult if not impossible to compensate for later on.",
      "zh": "缺乏好奇心会造成知识相对匮乏，而这种知识匮乏日后即便不是完全无法弥补，也极难补救。",
      "source": "2017.12 第3套"
    },
    "confusable": {
      "word": "compromise",
      "diff": "compensate(for) 弥补/赔偿；compromise 妥协/折中/损害"
    },
    "tag": "同义替换"
  },
  {
    "id": "v287",
    "day": 12,
    "word": "guarantee",
    "phonetic": "/ˌɡærənˈtiː/",
    "pos": "v./n.",
    "meaning": "保证，担保，确保；[n.] 保证，保修单",
    "examFreq": 9,
    "roots": "源自古法语 guarant(担保人，同源 warrant) -> 拍胸脯担保 -> 保证",
    "mnemonic": "作文让步转折神句：...alone does not guarantee success(仅靠……并不能保证成功)",
    "collocations": [
      {
        "en": "guarantee success",
        "zh": "保证成功"
      },
      {
        "en": "under guarantee",
        "zh": "在保修期内"
      },
      {
        "en": "a guarantee of quality",
        "zh": "质量保证"
      }
    ],
    "realSentence": {
      "en": "Acquisition of new knowledge may not guarantee the progress that you aim to make.",
      "zh": "获取新知识未必能保证你取得预期中的进步。",
      "source": "2024.12 第3套"
    },
    "confusable": {
      "word": "warrant / guard",
      "diff": "guarantee 保证/保修；warrant 授权令/使有理由；guard 守卫保卫"
    },
    "tag": "译写必备"
  },
  {
    "id": "v288",
    "day": 12,
    "word": "facilitate",
    "phonetic": "/fəˈsɪlɪteɪt/",
    "pos": "v.",
    "meaning": "促进，促使，使便利，助推（四级作文王牌高分动词！）",
    "examFreq": 8,
    "roots": "facil(容易的) + -itate(使) -> 使事情变得容易顺畅 -> 促进/使便利",
    "mnemonic": "作文告别 help / make it easy，写 facilitate learning / communication / economic growth 瞬间提档！",
    "collocations": [
      {
        "en": "facilitate learning",
        "zh": "促进学习"
      },
      {
        "en": "facilitate communication",
        "zh": "促进沟通交流"
      },
      {
        "en": "facilitate development",
        "zh": "助推发展"
      }
    ],
    "realSentence": {
      "en": "Above all, it's the emotions one experiences in teaching that facilitate learning.",
      "zh": "最重要的是，教学过程中所体验到的情感真正促进了学习。",
      "source": "2018.06 第3套"
    },
    "confusable": {
      "word": "facility",
      "diff": "facilitate(v.) 促进/使便利；facility(n.) 设施设备"
    },
    "tag": "译写必备"
  },
  {
    "id": "v289",
    "day": 12,
    "word": "implement",
    "phonetic": "/ˈɪmplɪment/",
    "pos": "v./n.",
    "meaning": "实施，贯彻，执行（政策/措施）；[n.] 工具，器具",
    "examFreq": 3,
    "roots": "im-(进入) + ple(装满，完成，如 complete) + -ment -> 把方案落到实处填满 -> 实施",
    "mnemonic": "作文第三段建议句金词：carry out a policy 太普通，写 implement effective measures/policies 满分高级感！",
    "collocations": [
      {
        "en": "implement a policy",
        "zh": "实施一项政策"
      },
      {
        "en": "implement changes",
        "zh": "落实变革"
      },
      {
        "en": "effective implementation",
        "zh": "有效落实"
      }
    ],
    "realSentence": {
      "en": "Until now, the only city to successfully pass and implement a soda tax was Berkeley, California, in 2014.",
      "zh": "迄今为止，唯一成功通过并实施汽水税的城市是2014年的加州伯克利市。",
      "source": "2019.12 第3套"
    },
    "confusable": {
      "word": "complement / supplement",
      "diff": "implement 实施贯彻；complement 互补完善；supplement 补充/营养补剂"
    },
    "tag": "译写必备"
  },
  {
    "id": "v290",
    "day": 12,
    "word": "emphasize",
    "phonetic": "/ˈemfəsaɪz/",
    "pos": "v.",
    "meaning": "强调，着重，突出（及物动词，直接接宾语，不加 on！）",
    "examFreq": 7,
    "roots": "em-(进入) + phas(显现，表达) + -ize -> 让重点凸显出来 -> 强调",
    "mnemonic": "语法易错提醒：动词 emphasize 直接接名词（emphasize hard work），名词 emphasis 才配 on（place emphasis on）！",
    "collocations": [
      {
        "en": "emphasize the importance of",
        "zh": "强调……的重要性"
      },
      {
        "en": "place emphasis on",
        "zh": "重视，把重点放在……"
      },
      {
        "en": "cannot be overemphasized",
        "zh": "再怎么强调也不为过"
      }
    ],
    "realSentence": {
      "en": "We can cultivate a growth mind-set in children by telling success stories that emphasize hard work and love of learning.",
      "zh": "我们可以通过讲述强调刻苦努力与热爱学习的成功故事，在孩子心中培养成长型思维。",
      "source": "2016.12 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v291",
    "day": 12,
    "word": "highlight",
    "phonetic": "/ˈhaɪlaɪt/",
    "pos": "v./n.",
    "meaning": "突出，强调，凸显；[n.] 最精彩的部分，亮点",
    "examFreq": 11,
    "roots": "high(高高地) + light(打光照明) -> 打上聚光灯凸显出来 -> 强调/亮点",
    "mnemonic": "荧光笔就叫 highlighter！写作中替代 show/emphasize 极自然：This trend highlights the urgent need to...",
    "collocations": [
      {
        "en": "highlight the need for",
        "zh": "凸显对……的迫切需求"
      },
      {
        "en": "highlight the issue",
        "zh": "突出这一问题"
      },
      {
        "en": "the highlight of the trip",
        "zh": "旅程的亮点"
      }
    ],
    "realSentence": {
      "en": "Apart from the specific trends highlighted above, which cause some investors to worry, the report portrays an overall optimism borne by the recent healthy real-estate \"upcycle\" and improving economy.",
      "zh": "除了上文着重指出的令部分投资者担忧的具体趋势外，该报告描绘了近期房地产健康上行与经济向好带来的整体乐观态势。",
      "source": "2017.06 第3套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v292",
    "day": 12,
    "word": "advocate",
    "phonetic": "/ˈædvəkeɪt/",
    "pos": "v./n.",
    "meaning": "提倡，倡导，拥护（后接名词/doing）；[n. /ˈædvəkət/] 倡导者，拥护者",
    "examFreq": 12,
    "roots": "ad-(朝向) + voc(声音，呼喊 voice) + -ate -> 为某种理念大声疾呼 -> 倡导/拥护者",
    "mnemonic": "词根 voc=声音：替好理念发声就是 advocate！注意后接动名词：advocate doing sth.",
    "collocations": [
      {
        "en": "advocate a healthy lifestyle",
        "zh": "倡导健康生活方式"
      },
      {
        "en": "advocates of organic farming",
        "zh": "有机农业倡导者"
      },
      {
        "en": "strongly advocate",
        "zh": "大力提倡"
      }
    ],
    "realSentence": {
      "en": "At follow-up meetings, he urged parents to join him in advocating a \"whole child\" approach to schooling that respects \"social-emotional development\" and \"deep and meaningful learning\" over academics alone.",
      "zh": "在后续会议上，他呼吁家长与他一道倡导“全人儿童”教育观，在纯学术之外同样重视社交情感发展与有深度的学习。",
      "source": "2018.06 第3套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v293",
    "day": 12,
    "word": "establish",
    "phonetic": "/ɪˈstæblɪʃ/",
    "pos": "v.",
    "meaning": "建立，设立，创立；确立（关系/制度）；[熟词僻义] 查明，证实",
    "examFreq": 9,
    "roots": "e-(加强) + stabl(稳固的 stable) + -ish -> 稳稳当当立起来 -> 建立/确立",
    "mnemonic": "写作升级替换 build/set up：establish a harmonious relationship / establish a solid foundation",
    "collocations": [
      {
        "en": "establish a relationship",
        "zh": "建立关系"
      },
      {
        "en": "establish a link between",
        "zh": "确立……之间的联系"
      },
      {
        "en": "well-established",
        "zh": "根基稳固的/久负盛名的"
      }
    ],
    "realSentence": {
      "en": "Only through frequent communication with them, can we establish such a harmonious relationship.",
      "zh": "只有通过与他们频繁沟通，我们才能建立起这样和谐的关系。",
      "source": "2017.12 第1套听力"
    },
    "confusable": {
      "word": "abolish / polish",
      "diff": "establish 建立确立；abolish 废除(制度法律)；polish 抛光/润色文章"
    },
    "tag": "译写必备"
  },
  {
    "id": "v294",
    "day": 12,
    "word": "account",
    "phonetic": "/əˈkaʊnt/",
    "pos": "n./v.",
    "meaning": "账户；叙述报告；[核心短语] 解释/占比例（account for）；考虑（take...into account）",
    "examFreq": 18,
    "roots": "ac-(朝向) + count(计算，陈述) -> 算清账目与来龙去脉 -> 账户/解释/占比",
    "mnemonic": "四级必杀三短语：account for(解释原因 / 占……比例)、take...into account(把……考虑在内)、on account of(由于)！",
    "collocations": [
      {
        "en": "take... into account",
        "zh": "把……考虑在内"
      },
      {
        "en": "account for",
        "zh": "解释……的原因；占……比例"
      },
      {
        "en": "on account of",
        "zh": "由于，因为"
      }
    ],
    "realSentence": {
      "en": "However, it does not take into account unemployment, pollution, health, life expectancy, or free time.",
      "zh": "然而，它并未将失业、污染、健康、预期寿命或闲暇时间纳入考量。",
      "source": "2026.06 第1套"
    },
    "confusable": {
      "word": "amount / discount",
      "diff": "account 账户/解释/占比；amount 数量/总计(amount to)；discount 折扣"
    },
    "tag": "译写必备"
  },
  {
    "id": "v295",
    "day": 12,
    "word": "advantage",
    "phonetic": "/ədˈvæntɪdʒ/",
    "pos": "n.",
    "meaning": "优势，有利条件，益处（take advantage of 利用）",
    "examFreq": 16,
    "roots": "advant-(向前，领先 advance) + -age -> 走在别人前面占得的先机 -> 优势",
    "mnemonic": "作文利弊分析核心词：take full advantage of(充分利用)、weigh the advantages and disadvantages(权衡利弊)",
    "collocations": [
      {
        "en": "take full advantage of",
        "zh": "充分利用"
      },
      {
        "en": "use sth. to one's advantage",
        "zh": "化某物为己所用"
      },
      {
        "en": "gain an advantage",
        "zh": "赢得优势"
      }
    ],
    "realSentence": {
      "en": "Another possibility is that humans cooperate to gain some advantage, such as boosting reputation.",
      "zh": "另一种可能是，人类合作是为了获得某种优势，例如提升声望。",
      "source": "2026.06 第1套"
    },
    "confusable": {
      "word": "advance / adventure",
      "diff": "advantage 优势有利条件；advance 前进/提前；adventure 冒险"
    },
    "tag": "译写必备"
  },
  {
    "id": "v296",
    "day": 12,
    "word": "approach",
    "phonetic": "/əˈproʊtʃ/",
    "pos": "n./v.",
    "meaning": "方法，途径（approach to）；[v.] 接近，临近；着手处理",
    "examFreq": 20,
    "roots": "ap-(朝向) + proach(近，如 near) -> 走近目标的路 -> 方法/接近",
    "mnemonic": "语法必考介词：an approach TO solving the problem（approach 后永远跟介词 to + doing，不跟 of！）",
    "collocations": [
      {
        "en": "an innovative approach to",
        "zh": "解决……的创新方法"
      },
      {
        "en": "practical approach",
        "zh": "务实的途径"
      },
      {
        "en": "approach a problem",
        "zh": "着手处理问题"
      }
    ],
    "realSentence": {
      "en": "Although each culture has their own specific style and approach to music, you will find that the purposes behind music are very similar across the board.",
      "zh": "尽管每种文化都有其独特的音乐风格和创作方法，但你会发现音乐背后的初衷放之四海皆十分相似。",
      "source": "2026.06 第2套"
    },
    "confusable": {
      "word": "reproach",
      "diff": "approach 方法/接近；reproach 责备批评"
    },
    "tag": "译写必备"
  },
  {
    "id": "v297",
    "day": 12,
    "word": "authority",
    "phonetic": "/əˈθɔːrəti/",
    "pos": "n.",
    "meaning": "权威，权威专家；职权，权力；[pl. authorities] 官方，政府当局",
    "examFreq": 10,
    "roots": "author(创始者，作者) + -ity -> 制定规则的话语权 -> 权威/当局",
    "mnemonic": "作文第三段提建议必背主语：local authorities / relevant authorities(当地/有关部门)",
    "collocations": [
      {
        "en": "local authorities",
        "zh": "地方当局"
      },
      {
        "en": "in authority",
        "zh": "当权，握有职权"
      },
      {
        "en": "an authority on",
        "zh": "……领域的权威专家"
      }
    ],
    "realSentence": {
      "en": "Decentralisation of authority was also found to be more effective in military operations.",
      "zh": "权力下放在军事行动中同样被证明更加有效。",
      "source": "2017.06 第2套"
    },
    "confusable": {
      "word": "author",
      "diff": "authority 权威/职权/官方当局(pl.)；author 作者作家"
    },
    "tag": "译写必备"
  },
  {
    "id": "v298",
    "day": 12,
    "word": "awareness",
    "phonetic": "/əˈwernəs/",
    "pos": "n.",
    "meaning": "意识，认识，觉悟（raise public awareness of）",
    "examFreq": 19,
    "roots": "aware(意识到的) + -ness(名词后缀) -> 清醒的认知 -> 意识",
    "mnemonic": "四级环保/文化/安全作文万能金句：We must raise public awareness of...(必须提高公众对……的意识)！",
    "collocations": [
      {
        "en": "raise public awareness of",
        "zh": "提高公众对……的意识"
      },
      {
        "en": "environmental awareness",
        "zh": "环保意识"
      },
      {
        "en": "self-awareness",
        "zh": "自我意识"
      }
    ],
    "realSentence": {
      "en": "The introduction of the \"sugar tax\" on juices and soda drinks has pushed more people to bottled water, while health awareness has boosted its desirability.",
      "zh": "对果汁和汽水开征“糖税”促使更多人转向瓶装水，而健康意识的提升则进一步助推了人们对它的需求。",
      "source": "2024.12 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v299",
    "day": 12,
    "word": "balance",
    "phonetic": "/ˈbæləns/",
    "pos": "n./v.",
    "meaning": "平衡，均衡；[v.] 权衡，使平衡；[熟词僻义 n.] 账户余额，结余",
    "examFreq": 40,
    "roots": "bi-(两个) + lanc(秤盘) -> 左右两个秤盘一样平 -> 平衡/账目余额",
    "mnemonic": "写作高分搭配：strike a balance between A and B(在A与B之间取得平衡)；银行听力里 check my balance = 查余额",
    "collocations": [
      {
        "en": "strike a balance between",
        "zh": "在……之间取得平衡"
      },
      {
        "en": "work-life balance",
        "zh": "工作与生活的平衡"
      },
      {
        "en": "bank balance",
        "zh": "银行账户余额"
      }
    ],
    "realSentence": {
      "en": "Talking about work-life balance \"is a very privileged conversation\", says Lechner.",
      "zh": "莱希纳说，谈论工作与生活的平衡“本身就是一场颇具特权的对话”。",
      "source": "2024.12 第1套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v300",
    "day": 12,
    "word": "benefit",
    "phonetic": "/ˈbenɪfɪt/",
    "pos": "n./v.",
    "meaning": "益处，好处，优势；福利津贴；[v.] 受益于（benefit from），有益于",
    "examFreq": 73,
    "roots": "bene-(好，善) + fit(做) -> 做好事带来的好处 -> 益处/福利",
    "mnemonic": "词根 bene=好！防错用法：人/物受益用 benefit FROM sth.；某事造福某人直接及物 benefit sb.",
    "collocations": [
      {
        "en": "benefit greatly from",
        "zh": "从……中获益匪浅"
      },
      {
        "en": "mutual benefit",
        "zh": "互惠互利"
      },
      {
        "en": "health benefits",
        "zh": "健康益处"
      }
    ],
    "realSentence": {
      "en": "Simply being in the nearest wood has such health benefits that the Woodland Trust successfully lobbied for it to be prescribed by doctors.",
      "zh": "仅仅置身于最近的树林中就对健康大有裨益，以至于林地信托组织成功游说将其纳入医生处方。",
      "source": "2024.12 第1套"
    },
    "confusable": {
      "word": "beneficial / profit",
      "diff": "benefit(n./v.) 益处/受益；beneficial(adj.) 有益的；profit 商业利润"
    },
    "tag": "译写必备"
  },
  {
    "id": "v301",
    "day": 12,
    "word": "capacity",
    "phonetic": "/kəˈpæsəti/",
    "pos": "n.",
    "meaning": "能力，才能（capacity for/to do）；容量，容纳能力；[熟词僻义] 身份，职位",
    "examFreq": 10,
    "roots": "cap(抓，容纳，如 capture) + -acity -> 能装下多少东西的肚量 -> 容量/能力",
    "mnemonic": "区别 ability 与 capacity：ability 指后天习得技能，capacity 指内在“承载容量/潜能”(capacity for learning)",
    "collocations": [
      {
        "en": "capacity for innovation",
        "zh": "创新能力"
      },
      {
        "en": "reach full capacity",
        "zh": "达到满负荷/满容量"
      },
      {
        "en": "in one's capacity as",
        "zh": "以某人的……身份"
      }
    ],
    "realSentence": {
      "en": "It's their enormous capacity for joy.",
      "zh": "正是他们感受快乐的惊人能力。",
      "source": "2015.12 第1套"
    },
    "confusable": {
      "word": "capability / faculty",
      "diff": "capacity 容量/潜在能力；capability 实际办事能力；faculty 教员/感官机能"
    },
    "tag": "译写必备"
  },
  {
    "id": "v302",
    "day": 12,
    "word": "commitment",
    "phonetic": "/kəˈmɪtmənt/",
    "pos": "n.",
    "meaning": "承诺，保证；投入，奉献，敬业（commitment to）",
    "examFreq": 7,
    "roots": "com-(共同) + mit(送，托付) + -ment -> 把身心托付给某项事业 -> 承诺/投入",
    "mnemonic": "高分写作搭配：make a commitment to doing sth.(致力于/承诺做某事，注意 to 是介词！)",
    "collocations": [
      {
        "en": "make a commitment to",
        "zh": "对……作出承诺/投入"
      },
      {
        "en": "employees' commitment",
        "zh": "员工的敬业度"
      },
      {
        "en": "long-term commitment",
        "zh": "长期投入"
      }
    ],
    "realSentence": {
      "en": "To ensure employees' commitment, it is advisable to give them more flexibility as to where and how they work.",
      "zh": "为了确保员工的投入度，建议在工作地点和工作方式上给予他们更大灵活性。",
      "source": "2017.06 第2套"
    },
    "confusable": {
      "word": "committee / commission",
      "diff": "commitment 承诺/投入；committee 委员会；commission 委员会/佣金"
    },
    "tag": "译写必备"
  },
  {
    "id": "v303",
    "day": 12,
    "word": "consequence",
    "phonetic": "/ˈkɑːnsɪkwəns/",
    "pos": "n.",
    "meaning": "后果，结果（常含负面或重大影响）；重要性（of great consequence）",
    "examFreq": 20,
    "roots": "con-(一起) + sequ(跟随) + -ence -> 行为之后紧跟而来的结局 -> 后果",
    "mnemonic": "告别 bad result！作文分析危害必写 severe/far-reaching consequences(严重/深远后果)",
    "collocations": [
      {
        "en": "severe consequences",
        "zh": "严重后果"
      },
      {
        "en": "as a consequence",
        "zh": "结果，因此"
      },
      {
        "en": "face the consequences",
        "zh": "承担后果"
      }
    ],
    "realSentence": {
      "en": "The second is that our higher education system is not designed to focus on the economic consequences of our students' years on campus.",
      "zh": "其次，我们的高等教育体系并非旨在聚焦学生在校园岁月中所面临的经济后果。",
      "source": "2014.06 第1套"
    },
    "confusable": {
      "word": "sequence",
      "diff": "consequence 后果结果；sequence 顺序序列"
    },
    "tag": "译写必备"
  },
  {
    "id": "v304",
    "day": 12,
    "word": "creativity",
    "phonetic": "/ˌkriːeɪˈtɪvəti/",
    "pos": "n.",
    "meaning": "创造力，创新精神，独创性",
    "examFreq": 8,
    "roots": "create(创造) + -ive + -ity -> 产生新奇点子的能力 -> 创造力",
    "mnemonic": "教育与AI对比类作文必背词：foster/stimulate students' creativity(激发学生创造力)",
    "collocations": [
      {
        "en": "spark creativity",
        "zh": "激发创造力"
      },
      {
        "en": "creativity and critical thinking",
        "zh": "创造力与批判性思维"
      },
      {
        "en": "require more creativity",
        "zh": "需要更多创造力"
      }
    ],
    "realSentence": {
      "en": "EVE teaches skills like creativity, leadership, organisation, and conflict resolution, he maintains.",
      "zh": "他主张，这款游戏能教会玩家创造力、领导力、组织力以及冲突解决等技能。",
      "source": "2025.12 第2套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v305",
    "day": 12,
    "word": "foundation",
    "phonetic": "/faʊnˈdeɪʃn/",
    "pos": "n.",
    "meaning": "基础，根基，地基（lay a solid foundation for）；基金会",
    "examFreq": 13,
    "roots": "found(打地基，创立) + -ation -> 支撑大厦的底层根基 -> 基础/基金会",
    "mnemonic": "作文收尾必背金词组：lay a solid foundation for future success(为未来成功打下坚实基础)！",
    "collocations": [
      {
        "en": "lay a solid foundation for",
        "zh": "为……奠定坚实基础"
      },
      {
        "en": "nonprofit foundation",
        "zh": "非营利基金会"
      },
      {
        "en": "the very foundation of",
        "zh": "……的根本基础"
      }
    ],
    "realSentence": {
      "en": "Classical music and opera are the very foundation of what our modern music is based upon.",
      "zh": "古典音乐与歌剧正是我们现代音乐赖以建立的根基。",
      "source": "2025.06 第2套"
    },
    "confusable": {
      "word": "funding / finding",
      "diff": "foundation 基础/基金会；funding 资金资助；finding 研究发现"
    },
    "tag": "译写必备"
  },
  {
    "id": "v306",
    "day": 12,
    "word": "opportunity",
    "phonetic": "/ˌɑːpərˈtuːnəti/",
    "pos": "n.",
    "meaning": "机会，时机，契机",
    "examFreq": 21,
    "roots": "op-(朝向) + port(港口) + -unity -> 顺风吹向港口的良机 -> 机会",
    "mnemonic": "写作升级替换 chance：seize the opportunity(抓住机遇)、offer students the opportunity to do",
    "collocations": [
      {
        "en": "seize the opportunity",
        "zh": "抓住机会"
      },
      {
        "en": "provide an opportunity to",
        "zh": "提供做……的机会"
      },
      {
        "en": "equal opportunities",
        "zh": "平等机会"
      }
    ],
    "realSentence": {
      "en": "This provides people with the opportunity to come together and discuss ideas, literature and problems.",
      "zh": "这为人们提供了聚在一起探讨思想、文学和现实问题的机会。",
      "source": "2019.12 第2套听力"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v307",
    "day": 12,
    "word": "priority",
    "phonetic": "/praɪˈɔːrəti/",
    "pos": "n.",
    "meaning": "优先事项，当务之急，优先权（give priority to）",
    "examFreq": 9,
    "roots": "prior(在前的，更早的) + -ity -> 排在最前面处理的事 -> 优先事项",
    "mnemonic": "四级提议类作文神级表达：top priority(头等大事)、give top priority to(优先考虑……)！",
    "collocations": [
      {
        "en": "top priority",
        "zh": "首要任务/头等大事"
      },
      {
        "en": "give priority to",
        "zh": "优先考虑……"
      },
      {
        "en": "set priorities",
        "zh": "确定轻重缓急"
      }
    ],
    "realSentence": {
      "en": "After mail service stops due to weather, the agency's top priority is ensuring that employees are safe.",
      "zh": "在邮政服务因天气暂停后，该机构的首要任务是确保员工安全。",
      "source": "2019.12 第1套"
    },
    "confusable": {
      "word": "prior / privacy",
      "diff": "priority 优先权/优先事项；prior(to) 在……之前；privacy 隐私"
    },
    "tag": "译写必备"
  },
  {
    "id": "v308",
    "day": 12,
    "word": "responsibility",
    "phonetic": "/rɪˌspɑːnsəˈbɪləti/",
    "pos": "n.",
    "meaning": "责任，职责，义务（take/shoulder responsibility for）",
    "examFreq": 25,
    "roots": "re-(回) + spons(承诺) + -ibility -> 必须作出交代和担当的义务 -> 责任",
    "mnemonic": "结尾呼吁句必用：shoulder/take social responsibility(承担社会责任)、a strong sense of responsibility(强烈责任感)",
    "collocations": [
      {
        "en": "take responsibility for",
        "zh": "对……承担责任"
      },
      {
        "en": "a sense of responsibility",
        "zh": "责任感"
      },
      {
        "en": "social responsibility",
        "zh": "社会责任"
      }
    ],
    "realSentence": {
      "en": "And human drivers need to consent to take responsibility for the outcomes of the software and hardware.",
      "zh": "而且人类驾驶者需要同意对软硬件运行所产生的结果承担责任。",
      "source": "2024.12 第3套"
    },
    "confusable": null,
    "tag": "译写必备"
  },
  {
    "id": "v309",
    "day": 12,
    "word": "impact",
    "phonetic": "/ˈɪmpækt/",
    "pos": "n./v.",
    "meaning": "重大影响，冲击，作用（have a profound impact on）；[v.] 影响，冲击",
    "examFreq": 46,
    "roots": "im-(进入) + pact(压紧，敲击) -> 猛力撞击留下的烙印 -> 影响/冲击",
    "mnemonic": "写作必备高分句：exert/have a profound impact on...(对……产生深远影响)，比 influence 更有力度！",
    "collocations": [
      {
        "en": "have a profound impact on",
        "zh": "对……产生深远影响"
      },
      {
        "en": "negative impact",
        "zh": "负面影响"
      },
      {
        "en": "environmental impact",
        "zh": "环境影响"
      }
    ],
    "realSentence": {
      "en": "Employers place a great value on employees with persuasion skills because they can impact several aspects of job performance.",
      "zh": "雇主非常看重具备说服技巧的员工，因为这些技巧能够影响工作表现的多个方面。",
      "source": "2024.06 第3套"
    },
    "confusable": {
      "word": "compact",
      "diff": "impact 影响/冲击；compact 紧凑小巧的"
    },
    "tag": "译写必备"
  },
  {
    "id": "v310",
    "day": 12,
    "word": "strategy",
    "phonetic": "/ˈstrætədʒi/",
    "pos": "n.",
    "meaning": "策略，战略，计谋，规划",
    "examFreq": 27,
    "roots": "希腊语 strategia(统帅兵法，将领之术) -> 统筹全局的谋略 -> 策略/战略",
    "mnemonic": "形容词 strategic(战略性的)，副词 strategically(有策略地)；搭配 adopt an effective strategy(采取有效策略)",
    "collocations": [
      {
        "en": "winning strategy",
        "zh": "制胜策略"
      },
      {
        "en": "adopt a strategy",
        "zh": "采取策略"
      },
      {
        "en": "learning strategy",
        "zh": "学习策略"
      }
    ],
    "realSentence": {
      "en": "It revealed a secret about the manipulative and deceptive strategies used to make junk food more addictive and characterize the products as healthy.",
      "zh": "它揭露了一个秘密：商家如何运用操纵与欺骗性策略让垃圾食品更易上瘾，并将其包装成健康产品。",
      "source": "2025.12 第2套"
    },
    "confusable": {
      "word": "tragedy",
      "diff": "strategy 策略战略；tragedy 悲剧/惨案"
    },
    "tag": "译写必备"
  },
  {
    "id": "v311",
    "day": 12,
    "word": "cooperation",
    "phonetic": "/koʊˌɑːpəˈreɪʃn/",
    "pos": "n.",
    "meaning": "合作，协作，配合（in cooperation with）",
    "examFreq": 4,
    "roots": "co-(共同) + oper(工作，运作 operate) + -ation -> 一起共事运作 -> 合作",
    "mnemonic": "社团/团队/国际主题写作金词：foster teamwork and cooperation(培养团队协作)，形容词 cooperative(合作的)",
    "collocations": [
      {
        "en": "in cooperation with",
        "zh": "与……合作"
      },
      {
        "en": "international cooperation",
        "zh": "国际合作"
      },
      {
        "en": "public cooperation",
        "zh": "公众配合"
      }
    ],
    "realSentence": {
      "en": "Culture, schooling and parenting are important determinants of cooperation.",
      "zh": "文化、学校教育和家庭养育是决定合作意愿的重要因素。",
      "source": "2026.06 第1套"
    },
    "confusable": {
      "word": "corporation",
      "diff": "cooperation(co+oper共同工作) 合作协作；corporation(corp团体) 大公司企业"
    },
    "tag": "译写必备"
  },
  {
    "id": "v312",
    "day": 12,
    "word": "beneficial",
    "phonetic": "/ˌbenɪˈfɪʃl/",
    "pos": "adj.",
    "meaning": "有益的，有利的，有帮助的（be beneficial to）",
    "examFreq": 6,
    "roots": "bene-(好) + fic(做) + -ial -> 带来好处的 -> 有益的",
    "mnemonic": "作文告别 good for！用 be highly beneficial to both physical and mental health(对身心健康大有裨益) 轻松拿高分！",
    "collocations": [
      {
        "en": "be beneficial to",
        "zh": "对……有益"
      },
      {
        "en": "mutually beneficial",
        "zh": "互利的"
      },
      {
        "en": "beneficial effect",
        "zh": "有益效果"
      }
    ],
    "realSentence": {
      "en": "It's well known that physical exercise is beneficial not just to physical health but also to mental health.",
      "zh": "众所周知，体育锻炼不仅有益于身体健康，也有益于心理健康。",
      "source": "2024.06 第1套"
    },
    "confusable": {
      "word": "benefit / artificial",
      "diff": "beneficial(adj.) 有益的；benefit(n./v.) 益处/受益；artificial 人造的"
    },
    "tag": "译写必备"
  }
];

  const CONFUSABLE_PAIRS = [
  {
    "id": "cf01",
    "group": [
      "adopt",
      "adapt"
    ],
    "items": [
      {
        "word": "adopt",
        "phonetic": "/əˈdɑːpt/",
        "pos": "v.",
        "meaning": "采用，采纳（方法/政策）；收养（孩子/宠物）",
        "tip": "中间字母 o = option(选择) -> 挑选采纳方案或收养孩子",
        "example": "Schools are encouraged to adopt more flexible teaching approaches."
      },
      {
        "word": "adapt",
        "phonetic": "/əˈdæpt/",
        "pos": "v.",
        "meaning": "适应（adapt to）；改编，改写（小说/剧本）",
        "tip": "中间字母 a = adjust(调整) -> 调整自己去适应环境(adapt to)",
        "example": "Freshmen usually need a few weeks to adapt to university life."
      }
    ],
    "quiz": {
      "stem": "To survive in a fast-changing market, companies must quickly ____ to consumers' shifting needs.",
      "options": [
        "adopt",
        "adapt",
        "adept",
        "admit"
      ],
      "answerIdx": 1,
      "explain": "句意为“适应消费者不断变化的需求”，固定搭配 adapt to(适应)；adopt 为及物动词，表“采纳/收养”。"
    }
  },
  {
    "id": "cf02",
    "group": [
      "affect",
      "effect"
    ],
    "items": [
      {
        "word": "affect",
        "phonetic": "/əˈfekt/",
        "pos": "v.",
        "meaning": "影响，作用于；感动；侵袭",
        "tip": "A 开头 = Action(动词)，后直接接被影响的对象",
        "example": "Lack of sleep can seriously affect students' academic performance."
      },
      {
        "word": "effect",
        "phonetic": "/ɪˈfekt/",
        "pos": "n./v.",
        "meaning": "效果，影响，结果（常用名词）；[正式 v.] 使实现",
        "tip": "E 开头常作名词：have an effect on / side effect / take effect",
        "example": "The new policy had a positive effect on reducing plastic waste."
      }
    ],
    "quiz": {
      "stem": "Long hours of screen time before bed can negatively ____ the quality of your sleep.",
      "options": [
        "effect",
        "effort",
        "affect",
        "effective"
      ],
      "answerIdx": 2,
      "explain": "情态动词 can 后需填动词原形，意为“负面影响睡眠质量”，故填动词 affect；effect 作名词居多。"
    }
  },
  {
    "id": "cf03",
    "group": [
      "ensure",
      "insure",
      "assure"
    ],
    "items": [
      {
        "word": "ensure",
        "phonetic": "/ɪnˈʃʊr/",
        "pos": "v.",
        "meaning": "确保，保证（某事一定发生或达标）",
        "tip": "en(使)+sure(确定) -> 直接接事物或 that 从句：ensure safety",
        "example": "Driver training helps ensure that users understand system limits."
      },
      {
        "word": "insure",
        "phonetic": "/ɪnˈʃʊr/",
        "pos": "v.",
        "meaning": "给……投保，买保险（名词 insurance）",
        "tip": "记住 insurance(保险) -> insure 专指商业保险投保",
        "example": "You should insure your luggage before flying overseas."
      },
      {
        "word": "assure",
        "phonetic": "/əˈʃʊr/",
        "pos": "v.",
        "meaning": "向某人郑重保证，使某人消除疑虑（assure sb. of/that）",
        "tip": "a 像向“一个人”拍胸脯保证 -> 必须先接“人”(sb.)",
        "example": "The manager assured the customers that the problem would be fixed."
      }
    ],
    "quiz": {
      "stem": "The doctor ____ the anxious parents that their daughter would make a full recovery.",
      "options": [
        "ensured",
        "insured",
        "assured",
        "secured"
      ],
      "answerIdx": 2,
      "explain": "空后紧接宾语“人”(the anxious parents) + that 从句，表示“向某人保证以打消顾虑”，只能用 assure sb. that。"
    }
  },
  {
    "id": "cf04",
    "group": [
      "preserve",
      "reserve",
      "conserve"
    ],
    "items": [
      {
        "word": "preserve",
        "phonetic": "/prɪˈzɜːrv/",
        "pos": "v.",
        "meaning": "保护，保存，维护（使遗产/生态/食物完好不变质）",
        "tip": "pre(提前)护好 -> preserve cultural heritage / preserve panda habitats",
        "example": "Efforts are underway to preserve ancient traditions and historic buildings."
      },
      {
        "word": "reserve",
        "phonetic": "/rɪˈzɜːrv/",
        "pos": "v./n.",
        "meaning": "预订（座位/房间）；保留留作后用；自然保护区",
        "tip": "re(留回来) -> reserve a table / nature reserve",
        "example": "We need to reserve a conference room for Friday's seminar."
      },
      {
        "word": "conserve",
        "phonetic": "/kənˈsɜːrv/",
        "pos": "v.",
        "meaning": "节约，节省，保护性使用（能源/水电/自然资源）",
        "tip": "con(聚拢省着用) -> conserve energy / conserve water",
        "example": "Turning off unused lights is a simple way to conserve electricity."
      }
    ],
    "quiz": {
      "stem": "During the severe drought, local residents were urged to ____ water as much as possible.",
      "options": [
        "reserve",
        "conserve",
        "deserve",
        "observe"
      ],
      "answerIdx": 1,
      "explain": "干旱期间呼吁居民“节约用水”，侧重精打细算、避免浪费能源或水资源，用 conserve。"
    }
  },
  {
    "id": "cf05",
    "group": [
      "economic",
      "economical"
    ],
    "items": [
      {
        "word": "economic",
        "phonetic": "/ˌiːkəˈnɑːmɪk/",
        "pos": "adj.",
        "meaning": "经济的，经济上的，经济学的（宏观经济相关）",
        "tip": "短词谈国家/宏观：economic growth(经济增长)、economic crisis(经济危机)",
        "example": "Installing bike lanes can boost the economic fortunes of a district."
      },
      {
        "word": "economical",
        "phonetic": "/ˌiːkəˈnɑːmɪkl/",
        "pos": "adj.",
        "meaning": "实惠的，节俭的，省钱省油的",
        "tip": "长词多了 al(省下 all) -> an economical car(省油实惠的车)",
        "example": "Taking public transit is far more economical than driving alone."
      }
    ],
    "quiz": {
      "stem": "Compared with buying single bottles, using a refillable flask is much more ____ for students.",
      "options": [
        "economic",
        "economical",
        "economy",
        "economist"
      ],
      "answerIdx": 1,
      "explain": "句意为“对学生来说使用可重复灌装水壶要省钱实惠得多”，表示“节约/划算”用 economical。"
    }
  },
  {
    "id": "cf06",
    "group": [
      "efficient",
      "effective"
    ],
    "items": [
      {
        "word": "efficient",
        "phonetic": "/ɪˈfɪʃnt/",
        "pos": "adj.",
        "meaning": "效率高的，省时省力的，节能的（强调投入产出比）",
        "tip": "侧重“快且不浪费”：energy-efficient appliances(节能电器)",
        "example": "Microwaves are more energy-efficient than standard ovens for small meals."
      },
      {
        "word": "effective",
        "phonetic": "/ɪˈfektɪv/",
        "pos": "adj.",
        "meaning": "有效的，奏效的，管用的（强调达到预期结果）",
        "tip": "侧重“有效果”：an effective medicine / effective communication",
        "example": "Good communication is the first step in effective persuasion."
      }
    ],
    "quiz": {
      "stem": "The new vaccine proved highly ____ in preventing the spread of the seasonal flu.",
      "options": [
        "efficient",
        "effective",
        "sufficient",
        "affectionate"
      ],
      "answerIdx": 1,
      "explain": "疫苗在预防流感传播方面“非常有效/奏效”，强调达成预期结果而非省时省力，故用 effective。"
    }
  },
  {
    "id": "cf07",
    "group": [
      "rise",
      "raise",
      "arise"
    ],
    "items": [
      {
        "word": "rise",
        "phonetic": "/raɪz/",
        "pos": "v./n.",
        "meaning": "上升，上涨，升起（不及物！rose - risen）",
        "tip": "自己往上升，后面不加宾语：Prices rose sharply.",
        "example": "Living standards have risen dramatically over the past decades."
      },
      {
        "word": "raise",
        "phonetic": "/reɪz/",
        "pos": "v.",
        "meaning": "举起；提高；筹集；提出（问题）；抚养（及物！raised - raised）",
        "tip": "及物动词必须接宾语：raise awareness / raise funds / raise a question",
        "example": "This phenomenon raises a serious challenge for society as a whole."
      },
      {
        "word": "arise",
        "phonetic": "/əˈraɪz/",
        "pos": "v.",
        "meaning": "（问题/冲突/机会）出现，产生，源于（不及物！arose - arisen）",
        "tip": "常与抽象名词 problems/conflicts/opportunities 连用，arise from = 源于",
        "example": "Unexpected conflicts may arise when team members lack clear roles."
      }
    ],
    "quiz": {
      "stem": "Many misunderstandings ____ simply because people fail to listen carefully to each other.",
      "options": [
        "raise",
        "arise",
        "rise",
        "arouse"
      ],
      "answerIdx": 1,
      "explain": "主语是抽象名词 misunderstandings(误解)，空后无宾语，意为“产生/出现”，用不及物动词 arise。"
    }
  },
  {
    "id": "cf08",
    "group": [
      "sensitive",
      "sensible"
    ],
    "items": [
      {
        "word": "sensitive",
        "phonetic": "/ˈsensətɪv/",
        "pos": "adj.",
        "meaning": "敏感的，易受影响的（sensitive to）；体贴的；机密的",
        "tip": "末尾 -tive 强调情绪/感官反应灵敏：sensitive to criticism/caffeine",
        "example": "People who are sensitive to caffeine often avoid coffee in the evening."
      },
      {
        "word": "sensible",
        "phonetic": "/ˈsensəbl/",
        "pos": "adj.",
        "meaning": "明智的，理智的，合情合理的",
        "tip": "记搭配 common sense(常识) + able -> 懂常识、明智的：a sensible choice",
        "example": "Saving part of your monthly allowance is a sensible financial habit."
      }
    ],
    "quiz": {
      "stem": "Given the forecast of a severe snowstorm, it would be ____ to postpone the campus trip.",
      "options": [
        "sensitive",
        "sensible",
        "sensory",
        "sentimental"
      ],
      "answerIdx": 1,
      "explain": "句意为“鉴于暴雪预报，推迟校园出游会是明智之举”，表示“明智合理的”用 sensible。"
    }
  },
  {
    "id": "cf09",
    "group": [
      "historic",
      "historical"
    ],
    "items": [
      {
        "word": "historic",
        "phonetic": "/hɪˈstɔːrɪk/",
        "pos": "adj.",
        "meaning": "具有重大历史意义的，历史上著名的",
        "tip": "强调“彪炳史册、重大意义”：historic moment / historic landmark",
        "example": "Governor's Island is a national historic landmark district."
      },
      {
        "word": "historical",
        "phonetic": "/hɪˈstɔːrɪkl/",
        "pos": "adj.",
        "meaning": "历史上的，有关历史学的，历史题材的",
        "tip": "强调“属于过去历史/史学研究”：historical records / historical novel",
        "example": "The museum preserves valuable historical documents from the Ming Dynasty."
      }
    ],
    "quiz": {
      "stem": "The signing of the global climate agreement was hailed as a ____ breakthrough for mankind.",
      "options": [
        "historical",
        "historic",
        "history",
        "historian"
      ],
      "answerIdx": 1,
      "explain": "全球气候协议的签署是“具有重大历史意义的”突破，强调名垂青史的里程碑意义，用 historic。"
    }
  },
  {
    "id": "cf10",
    "group": [
      "principal",
      "principle"
    ],
    "items": [
      {
        "word": "principal",
        "phonetic": "/ˈprɪnsəpl/",
        "pos": "adj./n.",
        "meaning": "主要的，首要的；[n.] 中小学校长，负责人，本金",
        "tip": "词尾 pal(好朋友) -> 校长是学生的好朋友(pal)，也指“主要的/本金”",
        "example": "The principal reason for the delay was severe winter weather."
      },
      {
        "word": "principle",
        "phonetic": "/ˈprɪnsəpl/",
        "pos": "n.",
        "meaning": "原则，准则，基本原理（仅作名词）",
        "tip": "词尾 le 同 rule(规则) -> moral principle(道德准则)、in principle(原则上)",
        "example": "She refused to compromise her moral principles for quick profit."
      }
    ],
    "quiz": {
      "stem": "Honesty and fairness are the fundamental ____ that guide scientific research.",
      "options": [
        "principals",
        "principles",
        "priorities",
        "privileges"
      ],
      "answerIdx": 1,
      "explain": "句意为“诚实与公正是指导科学研究的基本准则”，表“原则/原理”只能用名词 principles。"
    }
  },
  {
    "id": "cf11",
    "group": [
      "compliment",
      "complement"
    ],
    "items": [
      {
        "word": "compliment",
        "phonetic": "/ˈkɑːmplɪmənt/",
        "pos": "n./v.",
        "meaning": "赞美，称赞，恭维（pay sb. a compliment）",
        "tip": "中间字母 i = I like you -> 夸奖赞美别人",
        "example": "She paid him a sincere compliment on his clear presentation."
      },
      {
        "word": "complement",
        "phonetic": "/ˈkɑːmplɪment/",
        "pos": "v./n.",
        "meaning": "补充，补足，使相得益彰；互补物",
        "tip": "中间字母 e = complete(完整) -> 互补让彼此更完整",
        "example": "Online courses can effectively complement traditional classroom teaching."
      }
    ],
    "quiz": {
      "stem": "AI study tools are meant to ____ human teachers rather than replace them completely.",
      "options": [
        "compliment",
        "complement",
        "implement",
        "compliant"
      ],
      "answerIdx": 1,
      "explain": "句意为“AI学习工具旨在补充辅助人类教师，而非彻底取代他们”，表“互补完善”用 complement。"
    }
  },
  {
    "id": "cf12",
    "group": [
      "stationary",
      "stationery"
    ],
    "items": [
      {
        "word": "stationary",
        "phonetic": "/ˈsteɪʃəneri/",
        "pos": "adj.",
        "meaning": "静止不动的，固定的，停滞不前的",
        "tip": "带 a = stand(站立不动) -> stationary bike(动感单车/固定脚踏车)",
        "example": "The car crashed into a stationary truck parked by the roadside."
      },
      {
        "word": "stationery",
        "phonetic": "/ˈsteɪʃəneri/",
        "pos": "n.",
        "meaning": "文具，信纸信封（不可数名词）",
        "tip": "带 e = envelope / pen(信封和笔) -> 文具用品",
        "example": "Students bought notebooks, pens, and other stationery before the semester began."
      }
    ],
    "quiz": {
      "stem": "Before the exam week, the campus shop sold out of pencils, erasers, and other ____.",
      "options": [
        "stationary",
        "stationery",
        "sanctuary",
        "summary"
      ],
      "answerIdx": 1,
      "explain": "铅笔、橡皮等属于“文具”，记住带 e(pen/envelope) 的是名词 stationery。"
    }
  },
  {
    "id": "cf13",
    "group": [
      "desert",
      "dessert"
    ],
    "items": [
      {
        "word": "desert",
        "phonetic": "/ˈdezərt/",
        "pos": "n./v.",
        "meaning": "[n. /ˈdezərt/] 沙漠，荒漠；[v. /dɪˈzɜːrt/] 遗弃，抛弃，开小差",
        "tip": "只有一个 s = sand(沙子)，沙漠里又干又荒只有一粒沙",
        "example": "Many small villages were deserted as young workers moved to big cities."
      },
      {
        "word": "dessert",
        "phonetic": "/dɪˈzɜːrt/",
        "pos": "n.",
        "meaning": "（饭后）甜点，甜食",
        "tip": "两个 s = sweet strawberry(甜甜的草莓)，甜点好吃想再来一份所以双写 s！",
        "example": "He chose fresh fruit instead of chocolate cake for dessert."
      }
    ],
    "quiz": {
      "stem": "After the factory closed down, the once-lively mining town became almost completely ____.",
      "options": [
        "desserted",
        "deserted",
        "deserved",
        "detected"
      ],
      "answerIdx": 1,
      "explain": "句意为“工厂关闭后，曾经热闹的矿镇几乎彻底荒废无人”，desert 作动词意为“遗弃/荒废”，过去分词 deserted。"
    }
  },
  {
    "id": "cf14",
    "group": [
      "continual",
      "continuous"
    ],
    "items": [
      {
        "word": "continual",
        "phonetic": "/kənˈtɪnjuəl/",
        "pos": "adj.",
        "meaning": "频繁的，屡次重复的（中间有停顿但反复发生，常含厌烦意味）",
        "tip": "记断断续续“反复出现”：continual interruptions(接二连三的打扰)",
        "example": "It is hard to concentrate with continual phone notifications."
      },
      {
        "word": "continuous",
        "phonetic": "/kənˈtɪnjuəs/",
        "pos": "adj.",
        "meaning": "连续不断的，持续不间断的（时空上无间断）",
        "tip": "记“绵延不断”：continuous rain(连绵阴雨)、continuous effort(不懈努力)",
        "example": "Work-life balance is a continuous, never-ending exercise."
      }
    ],
    "quiz": {
      "stem": "Mastering a foreign language requires ____ daily practice without long breaks.",
      "options": [
        "continual",
        "continuous",
        "temporary",
        "occasional"
      ],
      "answerIdx": 1,
      "explain": "后文提示 without long breaks(没有长时间中断)，强调“持续不间断的”，故填 continuous。"
    }
  },
  {
    "id": "cf15",
    "group": [
      "respectable",
      "respectful",
      "respective"
    ],
    "items": [
      {
        "word": "respectable",
        "phonetic": "/rɪˈspektəbl/",
        "pos": "adj.",
        "meaning": "体面的，值得尊敬的，相当可观的",
        "tip": "able(值得被尊重的) -> a respectable tradition/salary(体面的传统/薪水)",
        "example": "Vegetable planting in urban gardens has a respectable tradition."
      },
      {
        "word": "respectful",
        "phonetic": "/rɪˈspektfl/",
        "pos": "adj.",
        "meaning": "恭敬的，有礼貌的，尊重他人的（be respectful of/to）",
        "tip": "ful(满怀敬意的) -> be respectful to teachers and elders",
        "example": "Students should maintain a respectful attitude during class debates."
      },
      {
        "word": "respective",
        "phonetic": "/rɪˈspektɪv/",
        "pos": "adj.",
        "meaning": "各自的，分别的（只作前置定语，常接复数名词）",
        "tip": "tive 对应“各自归位” -> return to their respective homes(回到各自家中)",
        "example": "After the meeting, the team members returned to their respective offices."
      }
    ],
    "quiz": {
      "stem": "After the graduation ceremony, the students went back to their ____ hometowns to start new careers.",
      "options": [
        "respectable",
        "respectful",
        "respective",
        "perspective"
      ],
      "answerIdx": 2,
      "explain": "句意为“毕业典礼后，学生们回到各自的家乡”，表示“各自的/分别的”用 respective。"
    }
  },
  {
    "id": "cf16",
    "group": [
      "access",
      "assess"
    ],
    "items": [
      {
        "word": "access",
        "phonetic": "/ˈækses/",
        "pos": "n./v.",
        "meaning": "通道，使用权，获取机会（have access to）；访问",
        "tip": "中间 cc 像打开的两扇门 -> 通向资源的入口/权限",
        "example": "Students without internet access at home may fall behind on e-learning days."
      },
      {
        "word": "assess",
        "phonetic": "/əˈses/",
        "pos": "v.",
        "meaning": "评估，评定，估算（质量/价值/影响）",
        "tip": "中间 ss 像两把标尺 -> 给成果打分评估（名词 assessment）",
        "example": "Exams are not the only way to assess a student's real ability."
      }
    ],
    "quiz": {
      "stem": "Public libraries provide free ____ to thousands of digital books and academic journals.",
      "options": [
        "assess",
        "access",
        "excess",
        "process"
      ],
      "answerIdx": 1,
      "explain": "空前为形容词 free，空后为介词 to，构成固定搭配 free access to(免费获取/使用权)。"
    }
  },
  {
    "id": "cf17",
    "group": [
      "acquire",
      "inquire",
      "require"
    ],
    "items": [
      {
        "word": "acquire",
        "phonetic": "/əˈkwaɪər/",
        "pos": "v.",
        "meaning": "获得，习得（知识/技能）；收购",
        "tip": "ac(去得到)+quire -> acquire skills and real knowledge",
        "example": "Kids need motivation in order to acquire real knowledge at school."
      },
      {
        "word": "inquire",
        "phonetic": "/ɪnˈkwaɪər/",
        "pos": "v.",
        "meaning": "询问，打听，调查（inquire about / into）",
        "tip": "in(往里问)+quire -> 听力前台咨询高频词 inquire about",
        "example": "I called the admissions office to inquire about scholarship deadlines."
      },
      {
        "word": "require",
        "phonetic": "/rɪˈkwaɪər/",
        "pos": "v.",
        "meaning": "需要，要求，规定（require sb. to do）",
        "tip": "re(反复索要)+quire -> Building financial skills requires practice.",
        "example": "Plastic bottles require huge amounts of fossil fuels to manufacture."
      }
    ],
    "quiz": {
      "stem": "She called the hotel front desk to ____ about whether early check-in was available.",
      "options": [
        "acquire",
        "require",
        "inquire",
        "retire"
      ],
      "answerIdx": 2,
      "explain": "打电话给酒店前台“询问”能否提前入住，固定搭配 inquire about(打听/询问)。"
    }
  },
  {
    "id": "cf18",
    "group": [
      "confirm",
      "conform"
    ],
    "items": [
      {
        "word": "confirm",
        "phonetic": "/kənˈfɜːrm/",
        "pos": "v.",
        "meaning": "确认，证实（消息/预约/结论）",
        "tip": "firm(坚固确定) -> 让消息确凿无疑：confirm a booking / confirm a finding",
        "example": "A recent poll confirmed that hourly workers worry about getting enough hours."
      },
      {
        "word": "conform",
        "phonetic": "/kənˈfɔːrm/",
        "pos": "v.",
        "meaning": "遵守，符合，顺从（conform to 规则/标准）",
        "tip": "form(形状/规范) -> 保持和规矩一样的形态：conform to standards",
        "example": "All food products on sale must conform to strict safety regulations."
      }
    ],
    "quiz": {
      "stem": "All imported electronic devices must ____ to national safety standards before entering the market.",
      "options": [
        "confirm",
        "conform",
        "inform",
        "perform"
      ],
      "answerIdx": 1,
      "explain": "空后接介词 to 和“安全标准”，意为“符合/遵守标准”，固定搭配 conform to。"
    }
  },
  {
    "id": "cf19",
    "group": [
      "expand",
      "extend"
    ],
    "items": [
      {
        "word": "expand",
        "phonetic": "/ɪkˈspænd/",
        "pos": "v.",
        "meaning": "扩大，扩张，膨胀（面积/体积/业务/视野向四周扩展）",
        "tip": "pand(铺开) -> 向四面八方扩大：expand one's horizons / expand business",
        "example": "Traveling is a great way to expand your world view."
      },
      {
        "word": "extend",
        "phonetic": "/ɪkˈstend/",
        "pos": "v.",
        "meaning": "延长（时间/期限），延伸（长度/范围）；表达（致谢/欢迎）",
        "tip": "tend(拉长) -> 沿一条线往外拉长：extend the deadline / extend a warm welcome",
        "example": "The professor agreed to extend the essay deadline by two days."
      }
    ],
    "quiz": {
      "stem": "Due to the system outage, the university decided to ____ the course registration deadline by 48 hours.",
      "options": [
        "expand",
        "extend",
        "expend",
        "expect"
      ],
      "answerIdx": 1,
      "explain": "把选课截止日期“延长”48小时，涉及时间期限的拉长，用 extend。"
    }
  },
  {
    "id": "cf20",
    "group": [
      "glimpse",
      "glare",
      "glance"
    ],
    "items": [
      {
        "word": "glimpse",
        "phonetic": "/ɡlɪmps/",
        "pos": "n./v.",
        "meaning": "一瞥，短暂看到（catch a glimpse of，强调无意中瞥见的结果）",
        "tip": "catch a glimpse of = 匆匆瞥见一眼",
        "example": "Through the train window, we caught a brief glimpse of the snow-capped peak."
      },
      {
        "word": "glare",
        "phonetic": "/ɡler/",
        "pos": "v./n.",
        "meaning": "怒目而视（glare at）；发出刺眼强光",
        "tip": "带 are(火气大) -> 气呼呼地瞪眼怒视，或太阳刺眼强光",
        "example": "He glared angrily at the passenger who kept talking loudly in the quiet car."
      },
      {
        "word": "glance",
        "phonetic": "/ɡlæns/",
        "pos": "v./n.",
        "meaning": "匆匆看一眼，扫视（glance at / at first glance，强调主动一扫的动作）",
        "tip": "at first glance = 乍一看，第一眼",
        "example": "She glanced at her watch and realized the lecture was about to begin."
      }
    ],
    "quiz": {
      "stem": "At first ____, the two words look nearly identical, yet their meanings are totally different.",
      "options": [
        "glare",
        "glance",
        "glimpse",
        "gaze"
      ],
      "answerIdx": 1,
      "explain": "固定习语 at first glance 意为“乍一看/第一眼看去”；catch a glimpse of 表“瞥见”。"
    }
  },
  {
    "id": "cf21",
    "group": [
      "attribute",
      "contribute",
      "distribute"
    ],
    "items": [
      {
        "word": "attribute",
        "phonetic": "/əˈtrɪbjuːt/",
        "pos": "v./n.",
        "meaning": "把……归因于（attribute A to B）；[n.] 属性，特征",
        "tip": "at(归到某处)+tribute -> 找原因：attribute success to hard work",
        "example": "All of their success can be attributed to constant learning."
      },
      {
        "word": "contribute",
        "phonetic": "/kənˈtrɪbjuːt/",
        "pos": "v.",
        "meaning": "贡献，捐献；促成，导致（contribute to）",
        "tip": "con(共同献出一份)+tribute -> contribute to(有助于/导致)",
        "example": "Poor sleep habits can contribute to rising stress levels."
      },
      {
        "word": "distribute",
        "phonetic": "/dɪˈstrɪbjuːt/",
        "pos": "v.",
        "meaning": "分发，分配，分布（物资/传单/资源）",
        "tip": "dis(分散开)+tribute -> 发放到四面八方：distribute urgent supplies",
        "example": "Volunteers distributed food and bottled water to disaster-struck areas."
      }
    ],
    "quiz": {
      "stem": "The coach ____ the team's unexpected victory to months of disciplined teamwork.",
      "options": [
        "contributed",
        "distributed",
        "attributed",
        "substituted"
      ],
      "answerIdx": 2,
      "explain": "句型结构为“把结果(胜利)归因于原因(团队训练)”，用 attribute A to B。"
    }
  },
  {
    "id": "cf22",
    "group": [
      "altitude",
      "attitude",
      "aptitude"
    ],
    "items": [
      {
        "word": "altitude",
        "phonetic": "/ˈæltɪtuːd/",
        "pos": "n.",
        "meaning": "海拔，高度（at high altitude）",
        "tip": "alt(高，如 alto 高音) -> 海拔高度",
        "example": "The plane climbed steadily to a cruising altitude of 10,000 meters."
      },
      {
        "word": "attitude",
        "phonetic": "/ˈætɪtuːd/",
        "pos": "n.",
        "meaning": "态度，看法（attitude towards/to）",
        "tip": "tt 像两个人面对面摆出的“态度”",
        "example": "A positive attitude helps students overcome setbacks more quickly."
      },
      {
        "word": "aptitude",
        "phonetic": "/ˈæptɪtuːd/",
        "pos": "n.",
        "meaning": "天资，天赋，自然倾向（aptitude for）",
        "tip": "apt(天生适合的) -> 天赋才能：an aptitude for languages",
        "example": "She showed a remarkable aptitude for mathematics from an early age."
      }
    ],
    "quiz": {
      "stem": "Climbers need time to adjust to the thin air at such a high ____.",
      "options": [
        "attitude",
        "altitude",
        "aptitude",
        "gratitude"
      ],
      "answerIdx": 1,
      "explain": "后文提示“登山者适应稀薄空气”，指的是“高海拔”，故填 altitude。"
    }
  },
  {
    "id": "cf23",
    "group": [
      "industrial",
      "industrious"
    ],
    "items": [
      {
        "word": "industrial",
        "phonetic": "/ɪnˈdʌstriəl/",
        "pos": "adj.",
        "meaning": "工业的，产业的，工业发达的",
        "tip": "对应 industry(工业) -> Industrial Revolution(工业革命)",
        "example": "Strict rules were introduced to reduce industrial wastewater."
      },
      {
        "word": "industrious",
        "phonetic": "/ɪnˈdʌstriəs/",
        "pos": "adj.",
        "meaning": "勤奋的，勤劳的，刻苦的（= hardworking）",
        "tip": "词尾 -ious 形容人的品质（同 ambitious/curious）-> 勤奋的",
        "example": "An industrious student reviews notes regularly instead of cramming overnight."
      }
    ],
    "quiz": {
      "stem": "Thanks to her ____ study habits, she passed the CET-4 exam with an impressive score.",
      "options": [
        "industrial",
        "industrious",
        "independent",
        "initial"
      ],
      "answerIdx": 1,
      "explain": "修饰“学习习惯”，意为“勤奋刻苦的”，选 industrious；industrial 指“工业的”。"
    }
  },
  {
    "id": "cf24",
    "group": [
      "facility",
      "faculty"
    ],
    "items": [
      {
        "word": "facility",
        "phonetic": "/fəˈsɪləti/",
        "pos": "n.",
        "meaning": "设施，设备，场所（常用复数 facilities）",
        "tip": "带 i 像硬件仪器 -> sports/library/campus facilities(校园设施)",
        "example": "The newly built library offers modern study facilities for all undergraduates."
      },
      {
        "word": "faculty",
        "phonetic": "/ˈfæklti/",
        "pos": "n.",
        "meaning": "大学全体教员，院系；人的天赋官能",
        "tip": "带 u 像 university(大学) -> faculty members(教职工)、faculty adviser(导师)",
        "example": "Younger faculty members were invited to join the curriculum committee."
      }
    ],
    "quiz": {
      "stem": "Over 80 ____ members from the Science Department attended the annual teaching seminar.",
      "options": [
        "facility",
        "faculty",
        "factory",
        "capacity"
      ],
      "answerIdx": 1,
      "explain": "句意为“理学院80多位教员参加了年度教学研讨会”，faculty members 为“教职人员”固定搭配。"
    }
  },
  {
    "id": "cf25",
    "group": [
      "accident",
      "incident"
    ],
    "items": [
      {
        "word": "accident",
        "phonetic": "/ˈæksɪdənt/",
        "pos": "n.",
        "meaning": "意外事故（车祸/工伤）；偶然（by accident）",
        "tip": "强调非故意、常伴随伤亡损失的意外：traffic accident / by accident",
        "example": "Some 94% of road accidents in the U.S. involve human error."
      },
      {
        "word": "incident",
        "phonetic": "/ˈɪnsɪdənt/",
        "pos": "n.",
        "meaning": "（不寻常的）事件，插曲，冲突事变",
        "tip": "多指新闻报道中的外交、治安、校园插曲等事件：a diplomatic incident",
        "example": "The security camera recorded the entire incident outside the store."
      }
    ],
    "quiz": {
      "stem": "I found my lost student card quite by ____ while cleaning out an old backpack.",
      "options": [
        "incident",
        "accident",
        "evidence",
        "occasion"
      ],
      "answerIdx": 1,
      "explain": "固定短语 by accident 意为“偶然地/碰巧”，不能说 by incident。"
    }
  },
  {
    "id": "cf26",
    "group": [
      "derive",
      "deprive"
    ],
    "items": [
      {
        "word": "derive",
        "phonetic": "/dɪˈraɪv/",
        "pos": "v.",
        "meaning": "获得，取得；源自（derive ... from）",
        "tip": "de+rive(河流) -> 引水得利：derive pleasure/meaning from",
        "example": "Many people derive deep satisfaction from volunteering in their community."
      },
      {
        "word": "deprive",
        "phonetic": "/dɪˈpraɪv/",
        "pos": "v.",
        "meaning": "剥夺，使丧失（deprive sb. of sth.）",
        "tip": "多了个 p = poor(变穷) -> 剥夺某人某物：deprive children of the chance",
        "example": "He denied that e-learning days were depriving children of snow fun."
      }
    ],
    "quiz": {
      "stem": "Excessive noise at night can ____ nearby residents of a good night's sleep.",
      "options": [
        "derive",
        "deprive",
        "deserve",
        "decline"
      ],
      "answerIdx": 1,
      "explain": "结构为 ___ sb. of sth.，意为“剥夺附近居民安稳的睡眠”，固定搭配 deprive sb. of sth.。"
    }
  },
  {
    "id": "cf27",
    "group": [
      "cooperation",
      "corporation"
    ],
    "items": [
      {
        "word": "cooperation",
        "phonetic": "/koʊˌɑːpəˈreɪʃn/",
        "pos": "n.",
        "meaning": "合作，协作，配合（动词 cooperate）",
        "tip": "co(共同)+oper(工作) -> 大家一起干活就是“合作”",
        "example": "Solving global climate issues requires close international cooperation."
      },
      {
        "word": "corporation",
        "phonetic": "/ˌkɔːrpəˈreɪʃn/",
        "pos": "n.",
        "meaning": "大公司，股份企业，法人团体（形容词 corporate）",
        "tip": "corp(团体/法人，如 Corp.) -> 商业大公司(multinational corporation 跨国公司)",
        "example": "She was hired as a data analyst by a leading technology corporation."
      }
    ],
    "quiz": {
      "stem": "There is little hope of reducing urban traffic jams without close public ____.",
      "options": [
        "corporation",
        "cooperation",
        "competition",
        "occupation"
      ],
      "answerIdx": 1,
      "explain": "句意为“没有公众的密切配合，几乎无望缓解城市交通拥堵”，表“配合/合作”用 cooperation。"
    }
  },
  {
    "id": "cf28",
    "group": [
      "moral",
      "morale"
    ],
    "items": [
      {
        "word": "moral",
        "phonetic": "/ˈmɔːrəl/",
        "pos": "adj./n.",
        "meaning": "道德的，道义上的；[n.] 寓意，品行准则",
        "tip": "短词无 e -> 道德标准(moral values)、故事寓意(the moral of the story)",
        "example": "Some researchers argue that moral disgust helps protect social fairness."
      },
      {
        "word": "morale",
        "phonetic": "/məˈræl/",
        "pos": "n.",
        "meaning": "士气，斗志，精神面貌（不可数名词，重音在后）",
        "tip": "末尾多了 e = energy(干劲能量) -> boost team morale(鼓舞团队士气)",
        "example": "Flexible work hours significantly boosted employee morale."
      }
    ],
    "quiz": {
      "stem": "Recognizing employees' daily efforts is a simple way to lift team ____.",
      "options": [
        "moral",
        "morale",
        "mortal",
        "model"
      ],
      "answerIdx": 1,
      "explain": "句意为“认可员工的日常付出是提振团队士气的简单方法”，lift/boost morale 为固定搭配。"
    }
  }
];

  if (typeof window !== 'undefined') {
    window.VOCAB_DAYS = VOCAB_DAYS;
    window.VOCAB_WORDS = VOCAB_WORDS;
    window.CONFUSABLE_PAIRS = CONFUSABLE_PAIRS;
  } else if (root && typeof root === 'object') {
    root.VOCAB_DAYS = VOCAB_DAYS;
    root.VOCAB_WORDS = VOCAB_WORDS;
    root.CONFUSABLE_PAIRS = CONFUSABLE_PAIRS;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      VOCAB_DAYS: VOCAB_DAYS,
      VOCAB_WORDS: VOCAB_WORDS,
      CONFUSABLE_PAIRS: CONFUSABLE_PAIRS,
    };
  }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
