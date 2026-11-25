/* ==========================================================================
   CET-4 Deep Tailored Question Explanations (explanations_data.js)
   Maps 100% of every question ID in window.QUESTION_BANK (80/80) to:
     { why, steps: [s1, s2, s3], pitfall, vocabHighlights: [{ word, meaning }] }
   Zero emojis. Zero mock-exam content. Clean UTF-8 Chinese/English.
   ========================================================================== */
(function (root) {
  'use strict';

  const EXPLAIN_DETAILS = {
  "q_lis_01": {
    "why": "新闻听力首句即导语（Lead），高度浓缩全文核心事件。第一句明确交代“新罕布什尔州男子五十多年前投入大海的漂流瓶信息在 1500 英里外被发现，并已归还给他的女儿”，直接对应 A 项。",
    "steps": [
      "未听先知：预览四个名词短语，锁定 return、bottled message、joke、motel，预判考查主旨题，全力抓第一句。",
      "听音定位：首句出现 A message in a bottle ... has been returned to his daughter，核心动宾与人物完全落位。",
      "排雷核验：B 项的 joke 并非“跟朋友开妻子的玩笑”，而是父亲当年随手写的；C 项漏掉了“跨世纪漂流与归还”；D 项的 motel 仅为细节背景。"
    ],
    "pitfall": "切忌把新闻中后段解释背景的次要名词（如 joke、motel）误当成全文主旨，主旨题优先以首句为准。",
    "vocabHighlights": [
      {
        "word": "decade",
        "meaning": "n. 十年（more than five decades = 五十多年）"
      },
      {
        "word": "hold up to a promise",
        "meaning": "信守承诺（同义替换 honor a promise）"
      },
      {
        "word": "deliver",
        "meaning": "v. 递送，交付"
      }
    ]
  },
  "q_lis_02": {
    "why": "新闻第一、二句构成完整因果链：空中灭虫喷洒是为抗击寨卡病毒（to combat the Zika virus），因为多彻斯特县已确诊四例旅行相关寨卡病例（four ... cases ... confirmed），同义对应 B 项。",
    "steps": [
      "预读定位：四项均围绕 bees 与 Zika 展开，关注“为什么开展喷洒”的直接原因。",
      "同义匹配：原文 four travel-related cases of Zika disease have been confirmed 精准改写为 Several cases of Zika disease had been identified。",
      "逐项排错：A 项无中生有；C 项将“喷洒致死 200 万只蜜蜂”张冠李戴为“200 万只蜜蜂感染病毒”；D 项把毁掉蜂场的元凶错归于病毒本身而非喷洒行动。"
    ],
    "pitfall": "C 项是典型“原词拼接陷阱”，把听到的 2 million bees 和 disease 硬拼成错误因果，听音时务必理清施动者与受动者。",
    "vocabHighlights": [
      {
        "word": "combat",
        "meaning": "v. 抗击，防治"
      },
      {
        "word": "confirm",
        "meaning": "v. 确诊，证实（对应选项 identify）"
      },
      {
        "word": "accidental",
        "meaning": "adj. 意外的，非故意的"
      }
    ]
  },
  "q_lis_03": {
    "why": "新闻中段出现强转折词 but：“最初作为远程侦察机为美国政府研发，但在预算削减后被放弃（abandoned following budget cutbacks）”，budget cutbacks 同义替换为 C 项 Inadequate funding。",
    "steps": [
      "预读四项原因，提前在脑中把 Inadequate funding 映射到 money / budget / cost 等常见替换词。",
      "听音紧盯转折词 but 以及动词 abandoned，紧跟其后的 following budget cutbacks 即为答案所在。",
      "排除干扰：原文后文明确说它排放更少污染（less pollution），B 项与原文相反；A 项工程问题与 D 项军方反对均未提及。"
    ],
    "pitfall": "很多同学只认 funding 却没反应过来 budget cutbacks（预算削减）就是“资金不足”，平时要成组背诵高频同义替换。",
    "vocabHighlights": [
      {
        "word": "abandon",
        "meaning": "v. 放弃，中止"
      },
      {
        "word": "budget cutbacks",
        "meaning": "预算削减（同义替换 inadequate funding）"
      },
      {
        "word": "long-range",
        "meaning": "adj. 远程的"
      }
    ]
  },
  "q_lis_04": {
    "why": "新闻在介绍完造价后直接拿 Airlander 10 与 huge jet planes 作对比：载重更大，同时“噪音更小、污染排放更少（producing less noise and emitting less pollution）”，整体概括即 D 项“更环保”。",
    "steps": [
      "预读四个比较级选项（latest / faster / safer / more environmentally friendly），听音专抓 than huge jet planes 所在句。",
      "定位关键信息：while also producing less noise and emitting less pollution，两个 less 并列指向环境友好。",
      "排除未提及项：原文未将其速度（faster）或安全性（safer）与商业喷气机作对比，A 项最新技术亦属过度推断。"
    ],
    "pitfall": "注意四级听力最爱的“具体细节 -> 抽象概括”替换：less noise + less pollution 往往不原词出现，而是概括为 environmentally friendly。",
    "vocabHighlights": [
      {
        "word": "emit",
        "meaning": "v. 排放，散发"
      },
      {
        "word": "load",
        "meaning": "n. 载荷，载重量"
      },
      {
        "word": "aviation",
        "meaning": "n. 航空"
      }
    ]
  },
  "q_lis_05": {
    "why": "新闻中段用显性因果信号词 Among the reasons for the slower service 直接引出原因：如今菜单选择更多（more choices on the menu）、产品本身更复杂、制作耗时更长，精准对应 C 项。",
    "steps": [
      "预读四个原因短语，在听音时对 reasons / because 保持高度敏感。",
      "听到 Among the reasons 后迅速抓住核心名词短语 more choices on the menu 和 more complex。",
      "排除干扰：原文结尾反而夸赞出餐准确率高（accuracy is still really high），否定 B 项员工低效；A、D 项原文未提。"
    ],
    "pitfall": "别把后文“顾客希望订单准确（prepared correctly）”误读成 A 项“顾客要求变高导致变慢”，注意段落间的因果边界。",
    "vocabHighlights": [
      {
        "word": "drive-through",
        "meaning": "n. 免下车点餐通道"
      },
      {
        "word": "account for",
        "meaning": "占据（比例）"
      },
      {
        "word": "accuracy",
        "meaning": "n. 准确度"
      }
    ]
  },
  "q_lis_06": {
    "why": "新闻导语首句直接用 with the goal of 阐明修建 Wattway 的目的：为 500 万人提供廉价的可再生能源（providing cheap, renewable energy to five million people），其中 renewable energy 同义替换为 B 项 clean energy。",
    "steps": [
      "预读选项，发现四个动名词短语均表目的，立即锁定首句中的 with the goal of。",
      "听音核对关键数字 five million people 与核心宾语 renewable energy，迅速匹配 B 项。",
      "排除原词拼凑项：D 项把 cheap 挪用来修饰“修路方式”；A 项测试效率、C 项给过往车辆发电均未在文中作为法国项目目标提出。"
    ],
    "pitfall": "听到 cheap 千万不要草率选 D！原文 cheap 修饰的是 renewable energy 以及后文安装电池板的成本，并非公路修建新工法。",
    "vocabHighlights": [
      {
        "word": "pave",
        "meaning": "v. 铺设（路面）"
      },
      {
        "word": "renewable energy",
        "meaning": "可再生能源（同义替换 clean energy）"
      },
      {
        "word": "stand up to",
        "meaning": "经受得住，承受"
      }
    ]
  },
  "q_lis_07": {
    "why": "新闻第二句直接点明调查受阻的根源：“该地区持续不断的战乱令调查变得困难（Continuous fighting in the region has made surveys difficult）”，Continuous 替换为 C 项 Endless。",
    "steps": [
      "预读四项阻碍原因，听音紧跟首句提到的 Sudan and Ethiopia 之后对调研难度的说明。",
      "捕获关键句 Continuous fighting in the region has made surveys difficult，将 Continuous 与 Endless 建立对应。",
      "排除干扰：后文说明有慈善机构资助（排除 B 缺经费），且当地人曾报告目击过狮子（排除 A 缺线索），D 项沙漠危险纯属脑补。"
    ],
    "pitfall": "切忌根据非洲地名主观脑补“沙漠危险”或“经费短缺”，听力细节题必须忠实于原文原句。",
    "vocabHighlights": [
      {
        "word": "continuous",
        "meaning": "adj. 持续不断的（对应选项 endless）"
      },
      {
        "word": "survey",
        "meaning": "n./v. 调查，勘测"
      },
      {
        "word": "hard evidence",
        "meaning": "确凿证据"
      }
    ]
  },
  "q_lis_08": {
    "why": "新闻后半段先说游客很兴奋，紧接着用 However 转折引出家长担忧：“担心这会促使孩子故意乱扔垃圾，好看鸟去捡（encourages their children to drop litter）”，encourages 替换为 B 项 tempted。",
    "steps": [
      "预读发现四项主语都是 Children may ...，提前做好记录“孩子可能出现何种不良行为”的准备。",
      "听到转折词 However 以及 some parents are concerned 后全神贯注，锁定 drop litter 核心动作。",
      "排除干扰：A 项伤害、C 项传染病、D 项过度喂食均为利用鸟类与食物箱细节编造的无关干扰项。"
    ],
    "pitfall": "前文提到鸟放垃圾后盒子会吐出 bird food，不要把机械装置自动出食误解为 D 项“孩子过度喂食”。",
    "vocabHighlights": [
      {
        "word": "rubbish",
        "meaning": "n. 垃圾（与 trash、litter 同义替换）"
      },
      {
        "word": "tempt",
        "meaning": "v. 诱使，吸引（对应原文 encourage）"
      },
      {
        "word": "deposit",
        "meaning": "v. 投入，放置"
      }
    ]
  },
  "q_lis_09": {
    "why": "女士先礼貌让步承认气候变化是个重要话题（It's an important subject, I agree），随后用转折词 but 亮出真实看法：“但我现在没心情看任何令人沮丧的东西（anything depressing）”，对应 A 项。",
    "steps": [
      "关注题干限定人物：问的是 the woman 对 climate change 的看法。",
      "捕捉对话核心转折：I agree, but I'm not in the mood for anything depressing，情绪形容词 depressing 决定答案。",
      "排雷：C 项曲解了男士说的 affects everyday life；B 项 alarming 与 D 项 getting more serious 对话中并未表达。"
    ],
    "pitfall": "长对话常在“先赞同后转折”结构处设题，I agree 只是客套铺垫，but 后面才是真正得分点。",
    "vocabHighlights": [
      {
        "word": "appeal to",
        "meaning": "吸引，使感兴趣"
      },
      {
        "word": "in the mood for",
        "meaning": "有心情做……"
      },
      {
        "word": "depressing",
        "meaning": "adj. 令人沮丧的，沉闷的"
      }
    ]
  },
  "q_lis_10": {
    "why": "女士本来很喜欢西班牙舞蹈节（Oh, I love dance），但问完时间得知 7:30 开演后立刻表示“那不行，我们没有足够时间赶过去（We haven't got enough time to get there）”，同义对应 D 项。",
    "steps": [
      "听到女士说 I love dance，第一时间划掉明显相反的 B 项。",
      "追踪话题推进：What time is it on? -> At 7:30 -> that's no good. We haven't got enough time to get there。",
      "完成地道短语对接：haven't got enough time to get there = can't make it to the theatre in time。"
    ],
    "pitfall": "熟悉高频口语习语 make it（及时赶到、办成），若不认识该短语很容易漏选正确答案 D。",
    "vocabHighlights": [
      {
        "word": "make it in time",
        "meaning": "及时赶到"
      },
      {
        "word": "production",
        "meaning": "n. 戏剧/演出作品"
      },
      {
        "word": "apparently",
        "meaning": "adv. 据说，显然"
      }
    ]
  },
  "q_lis_11": {
    "why": "女士一开口就直奔主题向李老师倾诉：“我对转到咱们学院感到很焦虑，我怕自己融不进去（I'm afraid I won't fit in）”，精准对应 D 项。",
    "steps": [
      "抓开头核心求助句：May I have a minute? 之后女士第一句陈述的就是焦虑主因。",
      "识破 A 项逻辑颠倒陷阱：女士说的是 I'm younger than most students（自己年纪更小），而 A 项说成“同学比她更小”。",
      "核对 B、C：女士已经转过来了（并非不知转去哪校，排除 B），也没说活动太多忙不过来（排除 C）。"
    ],
    "pitfall": "比较级“主客颠倒”是四级听力头号暗坑！听到 younger than 时务必在心里标清谁大谁小，绝不能见原词就选 A。",
    "vocabHighlights": [
      {
        "word": "fit in",
        "meaning": "融入，适应（新环境）"
      },
      {
        "word": "transfer",
        "meaning": "v./n. 转学，转移"
      },
      {
        "word": "anxious",
        "meaning": "adj. 焦虑的，担心的"
      }
    ]
  },
  "q_lis_12": {
    "why": "针对女士因年纪小担心交不到朋友的顾虑，李老师用转折词 but 提出明确建议：“学校有很多你可以参加的课外活动（after-school activities you can join in）”，对应 C 项 Participate in after-school activities。",
    "steps": [
      "明确题干主语：问的是 Mr. Lee 鼓励 Catherine 做什么。",
      "锁定男士的建议句：we have a lot of after-school activities you can join in，识别 join in -> participate in 替换。",
      "排雷：B 项“新培养爱好”错在 hobby groups 是女士原本就喜欢的；D 项“调查学校提供什么”偷换了男士说的 make the most of（充分利用）。"
    ],
    "pitfall": "注意区分“充分利用现有资源（make the most of）”与“去调查了解（look into）”，动词含义不同不可混淆。",
    "vocabHighlights": [
      {
        "word": "participate in",
        "meaning": "参加（同义替换 join in）"
      },
      {
        "word": "after-school activities",
        "meaning": "课外活动"
      },
      {
        "word": "make the most of",
        "meaning": "充分利用"
      }
    ]
  },
  "q_lis_13": {
    "why": "女士念出邀请函上的两项开业福利：开业第一天免费带一位朋友（free on the first day），以及周五前双人报名可享半年期会员折扣（a discount on a six-month membership），精确对应 C 项。",
    "steps": [
      "预读四个优惠选项，重点盯紧数字与时间长度（first week / half-year）。",
      "识破 B 项偷换时间陷阱：原文说免费仅限 on the first day（第一天），而非 B 项的 first week（第一周）。",
      "紧抓递进词 Also 后的核心优惠：six-month membership 直接等值换算为 half-year membership。"
    ],
    "pitfall": "听到 free 和 first 切勿秒选 B！四级听力酷爱把 day 改成 week、把 six-month 换算成 half-year 考查细心度。",
    "vocabHighlights": [
      {
        "word": "sign up",
        "meaning": "报名，注册"
      },
      {
        "word": "membership",
        "meaning": "n. 会员资格"
      },
      {
        "word": "tone up",
        "meaning": "强身健体，塑形"
      }
    ]
  },
  "q_lis_14": {
    "why": "男士在列举优秀谈判者的诸多品质后，用醒目的最高级信号词 And perhaps most importantly 引出压轴结论：they know when to stop（懂得适可而止），直指 A 项。",
    "steps": [
      "审题抓限定词 most important，在听前段排比描述时保持克制，不提前落笔。",
      "当耳边响起 And perhaps most importantly，立即锁定其后紧跟的 they know when to stop。",
      "排雷：flexible（对应 B）、compromises（对应 C）、emotional（对应 D）虽在对话别处出现过，但都不是男士强调的“最重要一点”。"
    ],
    "pitfall": "面对选项全部出现原文概念的“细节大杂烩”题，唯一破局钥匙就是紧盯题干限定词（most important / first / mainly）与录音信号词的精准对应。",
    "vocabHighlights": [
      {
        "word": "negotiator",
        "meaning": "n. 谈判者"
      },
      {
        "word": "rational",
        "meaning": "adj. 理性的"
      },
      {
        "word": "compromise",
        "meaning": "n./v. 妥协，折中"
      }
    ]
  },
  "q_lis_15": {
    "why": "男士询问节目形式是否类似纪录片，女士先肯定非虚构和基于事实的共性，随即用 However 转折点出差异：“我们的理念是让它既有趣又有娱乐性（fun and entertaining），这是传统纪录片不太具备的”，对应 C 项。",
    "steps": [
      "预读四个比较级选项，预判问题考查新节目与传统形式的区别。",
      "听到男士抛出 documentary 后立刻警觉，耐心跳过女士的前半句共性描述，直抓 However 后的关键形容词 entertaining。",
      "男士下一轮总结 both educational and entertaining 再次印证 C 项无误，其余三项均未提及。"
    ],
    "pitfall": "不要在听到 non-fiction and fact-based 时分心脑补 B 项 systematic，务必等转折词 However 落下再选。",
    "vocabHighlights": [
      {
        "word": "documentary",
        "meaning": "n. 纪录片"
      },
      {
        "word": "entertaining",
        "meaning": "adj. 有娱乐性的，有趣的"
      },
      {
        "word": "episode",
        "meaning": "n. （电视节目）一集"
      }
    ]
  },
  "q_lis_16": {
    "why": "面对男士因总和别人比较而陷入痛苦的倾诉，女士以 Listen 领起最终建议：“你唯一应该拿来比较的人就是你自己，拿现状和起点对比就会发现自己进步了”，完整同义改写为 B 项。",
    "steps": [
      "捕捉对话高潮：男士抱怨 always trying to be as good as others，女士随即用 Listen 给出核心药方。",
      "拆解同义替换：only person -> only；current status -> his present；starting point -> his past。",
      "排雷：C 项“总向他人成就学习”与女士反对盲目攀比的立场背道而驰；A、D 项属泛泛鸡汤，原文未提。"
    ],
    "pitfall": "本题难度较高在于三处词组同时同义改写（current status -> present, starting point -> past, only person -> only），需要听懂整句语义而非单靠原词。",
    "vocabHighlights": [
      {
        "word": "strive for",
        "meaning": "力求，奋斗争取"
      },
      {
        "word": "miserable",
        "meaning": "adj. 痛苦的，悲惨的"
      },
      {
        "word": "starting point",
        "meaning": "起点"
      }
    ]
  },
  "q_lis_17": {
    "why": "短文开头先给出研究结论“饥饿压倒了恐惧、口渴和社交需求等其他生理驱动力”，紧接着用目的不定式解释实验目的：“为了确定哪种感觉胜出（To determine which feeling won out）”，精准对应 B 项。",
    "steps": [
      "预读四个 To do 选项，迅速预测考查实验目的，重点盯紧文章前 3 句。",
      "将第二句的 other physical drives 与第三句的 To determine which feeling won out 关联起来，锁定 B 项。",
      "排雷：D 项把“比较哪种驱动力最强”偷换为“确定老鼠有哪些情绪”，属于典型的范围/概念偷换；A、C 项原文未提。"
    ],
    "pitfall": "小心 D 项照搬了原文原词 determine 和 feelings，却悄悄删掉了最核心的比较逻辑 which ... won out（哪一个胜出）。",
    "vocabHighlights": [
      {
        "word": "outweigh",
        "meaning": "v. 胜过，重于"
      },
      {
        "word": "physical drive",
        "meaning": "生理驱动力，本能需求"
      },
      {
        "word": "win out",
        "meaning": "最终胜出，占上风"
      }
    ]
  },
  "q_lis_18": {
    "why": "短文用设问句引出历史溯源，明确指出 1920 年代初一战刚结束时，军方希望出于国防目的修建公路网，以便在必要时快速调动部队（move troops quickly from one area to another），精准对应 B 项。",
    "steps": [
      "识别听力高频考点句型：设问句 Did you ever wonder why...? 紧接的 For an answer 必含答案。",
      "听清 original purpose（20 世纪 20 年代军方国防 -> move troops quickly），不被后文 1950 年代民用便利分散注意力。",
      "确认短语替换：from one area to another -> from place to place；排除 A（乡村小路是旧况而非目标）、C、D。"
    ],
    "pitfall": "时间线跨越多个年代的短文，务必分清“最初目的（original）”与“后期演变（later）”，切忌张冠李戴。",
    "vocabHighlights": [
      {
        "word": "national defense",
        "meaning": "国防"
      },
      {
        "word": "troop",
        "meaning": "n. 部队，军队（常用复数）"
      },
      {
        "word": "appropriate",
        "meaning": "v. 拨出（专款）"
      }
    ]
  },
  "q_lis_19": {
    "why": "短文在引入年轻发明家后直接给产品下定义：“它叫作 Smart Wheel，套在多数标准车辆方向盘上，用来监测驾驶者是否始终双手握方向盘（two hands on the wheel at all times）”，对应 D 项。",
    "steps": [
      "听到专有名词 It's called Smart Wheel 时迅速进入细节抓取状态，重点听 designed to ... to track 后面的功能描述。",
      "将原文 whether or not the driver has two hands on the wheel 匹配到 D 项 ensure people drive with both hands。",
      "排雷：A 项拼凑了 phone 与 steering wheel，完全扭曲了产品用途；B 项充电、C 项控速均无中生有。"
    ],
    "pitfall": "科技发明类短文常在 A/B 项里用上下文高频词（如 phone、steering wheel）组装看似合理的伪功能，一定要听清主干动词（track two hands）。",
    "vocabHighlights": [
      {
        "word": "steering wheel",
        "meaning": "方向盘"
      },
      {
        "word": "track",
        "meaning": "v. 追踪，监测"
      },
      {
        "word": "put ... on notice",
        "meaning": "警告，提醒注意"
      }
    ]
  },
  "q_lis_20": {
    "why": "短文前半段介绍用 Excel、Google 管理大量求职申请的方法，但结尾用强转折词 Nevertheless 亮出核心忠告：“你始终应重质不重量……为每一份求职信量身定制（personalizing each cover letter）”，对应 B 项。",
    "steps": [
      "短文最后一题优先盯紧结尾转折信号词（Nevertheless / However）与建议情态动词（should always）。",
      "捕捉核心动作：make each application count, personalizing each cover letter，直接对接 B 项 Personalize each application。",
      "排雷：D 项把原文 qualified for（自己能胜任的）偷偷改成了 more promising（更有前景的）；C 项错把 Google 办公工具说成“更好的搜索引擎”。"
    ],
    "pitfall": "前文大篇幅讲 Excel 和 Google 只是铺垫，真正的大考点压在结尾转折词 Nevertheless 之后，听短文切记坚持到最后一句。",
    "vocabHighlights": [
      {
        "word": "personalize",
        "meaning": "v. 使个性化，量身定制"
      },
      {
        "word": "qualified for",
        "meaning": "胜任，具备……资格"
      },
      {
        "word": "pay off",
        "meaning": "取得回报，见效"
      }
    ]
  },
  "q_lis_21": {
    "why": "短文先给出明确禁令 don't follow a stream unless you know it，随后用让步转折解释风险：“尽管湿地有更多可食用植物，但也可能有野兽、毒蛇和其他危险（wild animals, poisonous snakes, and other hazards）”，对应 C 项。",
    "steps": [
      "抓情感极性：既然前句劝告“不要跟着陌生溪流走”，结果必为负面风险，瞬间排除积极选项 A、D。",
      "对比两个负面项 B 和 C：原文列举野兽、毒蛇及其他 hazards，并未提到山洪暴发（sudden flood），排除 B。",
      "确认词汇同义替换：hazards（隐患/危险）-> unexpected dangers。"
    ],
    "pitfall": "在听到 stream（溪流）和 river（河流）时容易脑补 B 项“遭遇洪水溺水”，务必严防脱离原文的常识联想。",
    "vocabHighlights": [
      {
        "word": "hazard",
        "meaning": "n. 危险，隐患（同义替换 danger）"
      },
      {
        "word": "edible",
        "meaning": "adj. 可食用的"
      },
      {
        "word": "expose ... to",
        "meaning": "使暴露于，使面临"
      }
    ]
  },
  "q_lis_22": {
    "why": "短文首句开门见山打破刻板印象：“今天我发现与多数美国城市相比，西雅图的降雨量其实没那么多（doesn't really get that much rain）”，且年均降雨仅排第 44 位，完整对应 C 项。",
    "steps": [
      "捕捉首句反常识发现：Today I found out that Seattle doesn't really get that much rain，并用 In fact, ranks 44th 强化事实。",
      "听懂后文对误区（misconception）的解释：西雅图只是下雨天数多、多为毛毛细雨，总降水量反而低于纽约、波士顿等城市。",
      "排除反调干扰项：A 项（倾盆大雨）和 D 项（最多雨城市之一）正是原文要纠正的错误印象；B 项夏季少雨未作为核心发现提出。"
    ],
    "pitfall": "遇到熟悉城市（如“雨城西雅图”）千万别靠固有常识秒选 D！四级科普短文尤其偏爱“反常识纠偏”题材，听清否定词 doesn't really 是关键。",
    "vocabHighlights": [
      {
        "word": "misconception",
        "meaning": "n. 误解，错误观念"
      },
      {
        "word": "annual rainfall",
        "meaning": "年降雨量"
      },
      {
        "word": "spread out",
        "meaning": "分散，铺开"
      }
    ]
  },
  "q_clz_01": {
    "why": "本篇围绕工业革命对工人生活水平的影响展开，10 个空覆盖四级选词填空全部四大核心词性（4 个动词过去式/分词、1 个动词原形、2 个形容词、2 个副词、1 个名词），严格遵循“词性分流 -> 固定搭配 -> 语义逻辑”三步法即可稳拿高分。",
    "steps": [
      "先完成词性标注：副词池仅有 exactly/probably/typically，迅速拿下第 5 空（define exactly）与第 6 空（typically use）。",
      "利用硬搭配锁定：第 2 空 with goods available to sb.、第 7 空 money earned and adjusted、第 10 空 positive effect。",
      "最后处理历史叙事动词与形容词：第 1 空榨取剩余价值（squeezed from）、第 3 空生活水平上升（increased）、第 4 空改善发生（occurred）、第 8 空漫长争论（exhausting debate）、第 9 空解读影响（interpret how）。"
    ],
    "pitfall": "第 8 空容易误选 B(deteriorating)，但“辩论与分析”不会被说成“正在恶化”，而是耗时费力的 exhausting debate；第 9 空易混淆 E(enhance) 和 J(interpret)，注意其后接的是 how 引导的疑问从句，只能选 interpret。",
    "vocabHighlights": [
      {
        "word": "squeeze ... from",
        "meaning": "从……中榨取"
      },
      {
        "word": "neutralize",
        "meaning": "v. 抵消，使无效"
      },
      {
        "word": "exhausting",
        "meaning": "adj. 耗尽精力的，冗长疲惫的"
      }
    ]
  },
  "q_clz_02": {
    "why": "这篇 2026 年真题以反常识科普为主线，逻辑衔接极其严密：每一空几乎都能从前句或后句的反义对照（less vs opposite、same vs separately、prefer tea vs avoid coffee）以及经典固定短语中精准锁定。",
    "steps": [
      "优先秒杀四个固定结构：第 1 空 not simply ... but rather、第 5 空 convince sb. to do、第 9 空 In addition、第 10 空 tend to avoid。",
      "抓正反逻辑照应：第 2 空呼应前句本以为会少喝（opposite results），第 4 空呼应首段 supersensitive（heightened ability），第 8 空转折 While ... seem the same（perceive ... separately）。",
      "核对专业名词与谓语动词：第 3 空心理学高频词 positive reinforcement（正向强化），第 6 空饮品摄入（consumption），第 7 空感知苦味（perceive）。"
    ],
    "pitfall": "第 1 空极易忽略 not simply ... but rather 的固定搭配而误填其他副词；第 3 空若不认识 reinforcement（强化），可借由 learned positive 与 brought out by caffeine 的因果反馈线索排除 omission 和 prospect。",
    "vocabHighlights": [
      {
        "word": "reinforcement",
        "meaning": "n. 强化，加固（positive reinforcement 正向强化）"
      },
      {
        "word": "heightened",
        "meaning": "adj. 增强的，更敏锐的"
      },
      {
        "word": "perceive",
        "meaning": "v. 感知，察觉"
      }
    ]
  },
  "q_clz_03": {
    "why": "本篇聚焦戒断垃圾食品的生理与心理症状，是四级选词填空中典型的“固定搭配 + 词性一一对应”高分范本。只要先标出词库中唯二的两个三单动词（offers/parallels）和唯二的副词（permanently/significantly），大半空格即可迎刃而解。",
    "steps": [
      "锁定四大黄金搭配：第 1 空 physical and psychological、第 2 空 quitting smoking、第 8 空 Raising awareness、第 10 空 shed light on。",
      "三单动词二选一：第 3 空研究“提供”首个证据（offers），第 5 空时间跨度“相平行/相似”（parallels）。",
      "精准匹配剩余形容词、副词与原形动词：第 4 空修饰比较级用 significantly，第 6 空修饰有争议话题用 controversial，第 7 空引发症状用 trigger，第 9 空提前准备策略用 prepare。"
    ],
    "pitfall": "第 5 空很多同学只知道 parallel 作形容词“平行的”，不熟悉其作动词表示“与……相似/相当”，考前务必牢记一词多性。",
    "vocabHighlights": [
      {
        "word": "shed light on",
        "meaning": "阐明，使……清楚"
      },
      {
        "word": "parallel",
        "meaning": "v. 与……相似，比得上"
      },
      {
        "word": "trigger",
        "meaning": "v. 引发，触发"
      }
    ]
  },
  "q_clz_04": {
    "why": "本篇探讨有氧与无氧运动强度对情绪的影响，核心考查词性精准判别与上下文逻辑推理。特别是第 7、8、10 三个形容词空，答案线索都直接藏在紧邻的举例或转折说明里。",
    "steps": [
      "利用极小候选池速杀：副词只有 L/N，第 3 空 partly due to 锁定 L；动名词只有 F/H，第 4 空 Before dipping into 锁定 F；固定短语第 9 空 made no difference 锁定 E。",
      "区分动名与三单：第 5 空 make a distinction between A and B 锁定 G；第 6 空主语“有氧运动”包含散步慢跑，选 involves 而非 constitutes。",
      "借上下文例证锁定形容词与分词：第 1 空 detailed guidelines，第 2 空 required for，第 7 空举重对应 vigorous intensity，第 8 空三种相反结论对应 contradictory，第 10 空排除了 low 和 high 对应 moderate。"
    ],
    "pitfall": "第 6 空极易混淆 A(constitutes) 和 I(involves)：“部分 constitute 整体”，而“整体 involve 部分”，此处主语是总概念“有氧运动”，宾语是具体项目，必须选 involves。",
    "vocabHighlights": [
      {
        "word": "distinction",
        "meaning": "n. 区分，差别（make a distinction between）"
      },
      {
        "word": "vigorous",
        "meaning": "adj. 剧烈的，精力充沛的"
      },
      {
        "word": "contradictory",
        "meaning": "adj. 相互矛盾的"
      }
    ]
  },
  "q_clz_05": {
    "why": "本组聚焦语言心理学研究的前 5 个高频考点空，重点演练“对比语义线索”与“高频动宾/修饰搭配”，在 15 词全词库中通过词性迅速把候选范围缩小到 1–2 个。",
    "steps": [
      "第 1 空由 rather than 与 details 对照，broader picture 并列“最终目的（ultimate purpose）”。",
      "第 2 空介词 of 后填及物动名词，在 B(attaining) 与 K(refraining) 中，refrain 不及物且常搭 from，故锁定 attaining。",
      "第 3–5 空三连击：arrive at a conclusion（得出结论）、approximately 40,000（约四万）、与 easily visualized 反义对应的 more difficult to visualize。"
    ],
    "pitfall": "第 2 空看到两个 -ing 选项（attaining / refraining）时，记住 refrain 必须接 from（refrain from doing），不可能直接跟宾语 action。",
    "vocabHighlights": [
      {
        "word": "ultimate",
        "meaning": "adj. 最终的，终极的"
      },
      {
        "word": "attain",
        "meaning": "v. 达到，获得"
      },
      {
        "word": "visualize",
        "meaning": "v. 使形象化，在脑海中浮现"
      }
    ]
  },
  "q_clz_06": {
    "why": "本组精选人工智能取代人类工作心理研究的前 5 空，重点训练“上下文语义反转”与“动词及物性辨析”，是冲刺选词填空语篇理解的绝佳样板。",
    "steps": [
      "先靠介词锁定第 1、2 空：academic debate on（关于……的学术讨论）与 react to（对……作出反应）。",
      "第 3、4 空联动推理：下句用 This preference（这一偏好）回指，说明第 3 空为积极副词 favorably；随后遇 however 发生态度翻转，且空白后直接是逗号无宾语，选不及物动词 reverses。",
      "第 5 空修饰 paradoxical（自相矛盾的），结合后段揭示的心理原因，说明只是“表面上看似（seemingly）”矛盾。"
    ],
    "pitfall": "第 4 空最大干扰项是 B(contradicts)，虽然它也是三单动词，但 contradict 是及物动词（必须接宾语），而空白后紧跟逗号，只能选可作不及物动词的 reverses。",
    "vocabHighlights": [
      {
        "word": "paradoxical",
        "meaning": "adj. 看似矛盾的，自相矛盾的"
      },
      {
        "word": "favorably",
        "meaning": "adv. 赞许地，有利地"
      },
      {
        "word": "reverse",
        "meaning": "v. 逆转，彻底反转"
      }
    ]
  },
  "q_clz_07": {
    "why": "本组围绕曼彻斯特太阳能办公楼的兴建与翻新历史，前 3 空集中考查被动语态与一般过去时动词辨析，后 2 空考查高频名词搭配，非常适合夯实选词填空基本功。",
    "steps": [
      "分析前 3 空动词形态：第 1、2 空为 was + 过去分词（1962 年建楼 -> constructed；开展大修 -> undertaken），第 3 空为主动过去式接公司作宾语（咨询商议 -> consulted）。",
      "第 5 空直接用固定介词短语 on such a large scale（大规模地）秒杀。",
      "第 4 空结合句意“整栋大楼覆满垂直太阳能板”，选表集合体的名词 collection。"
    ],
    "pitfall": "第 3 空不要误选 D(competed)——compete 为不及物动词（需加 with），不能直接跟 the solar panel company 作宾语。",
    "vocabHighlights": [
      {
        "word": "undertake",
        "meaning": "v. 承担，着手进行（过去分词 undertaken）"
      },
      {
        "word": "consult",
        "meaning": "v. 咨询，商量"
      },
      {
        "word": "on a large scale",
        "meaning": "大规模地"
      }
    ]
  },
  "q_clz_08": {
    "why": "本组精选 2018 年真题后半段 5 个核心空，每一空都紧扣上下文逻辑线索（尤其是室外的 outdoor 与后句室内的 inside buildings 呼应）与四级必备介词搭配。",
    "steps": [
      "借介词秒杀两处动词：第 1 空 be intended to do（旨在……），第 3 空 collaborate with（与……合作）。",
      "第 2 空用跨句照应：下一句明确写 also ... inside buildings，说明前句监测的是室外（outdoor）空气污染。",
      "第 4 空注意词义范围：公交罢工迫使全城“居民（inhabitants）”开车，比“消费者（consumers）”准确；第 5 空 by 后接及物动名词 creating（带来污染低值）。"
    ],
    "pitfall": "第 4 空 consumers 与 inhabitants 同为指人复数名词，极易误选；注意上下文主体是 San Francisco's transit workers 与 the city's，语境是城市通勤居民而非购物消费场景。",
    "vocabHighlights": [
      {
        "word": "collaborate with",
        "meaning": "与……合作"
      },
      {
        "word": "be intended to",
        "meaning": "旨在，打算用来"
      },
      {
        "word": "inhabitant",
        "meaning": "n. 居民，栖居者"
      }
    ]
  },
  "q_clz_09": {
    "why": "本组训练选词填空中最实用的两大提速技巧——“感情色彩正负判断”与“固定搭配定位”。5 个空涵盖 2 形容词、2 名词、1 动词过去分词，辨析梯度清晰。",
    "steps": [
      "先用感情色彩破第 1、2 空：第 1 空在转折词 but 之后且用于帮助治病，填褒义形容词 superior；第 2 空与 dirty birds 并列，填贬义名词 nuisance。",
      "第 3 空与第 5 空靠硬搭配直接拿分：the tip of your index finger（食指尖）与 be associated with（与……相关）。",
      "第 4 空往后多看一句：detecting breast cancer in images（从图像中检测乳腺癌），瞬间锁定 visual（视觉的）。"
    ],
    "pitfall": "第 3 空遇到两个表“顶部/尖端”的名词 E(peak) 和 M(tip) 时，注意 peak 指山峰或数值峰值，手指尖、舌尖固定用 tip。",
    "vocabHighlights": [
      {
        "word": "nuisance",
        "meaning": "n. 讨厌的人或物，公害"
      },
      {
        "word": "superior",
        "meaning": "adj. 卓越的，更胜一筹的"
      },
      {
        "word": "be associated with",
        "meaning": "与……联系在一起"
      }
    ]
  },
  "q_clz_10": {
    "why": "本组围绕 20 世纪 90 年代互联网商业化普及展开，语言平实流畅，重点考查结合具体行业场景（电商、酒店预订、在线提交工作）选择地道英语搭配。",
    "steps": [
      "第 1 空紧盯下句 Corporations ... sell products（企业卖产品），立即锁定 commercial purposes（商业目的）。",
      "第 2 空看三项网购并列清单：机票、酒店预订（hotel reservations）、甚至汽车房屋。",
      "第 3–5 空连贯处理信息流：大学在网上“发布（posted）”数据 -> 学生找到“有价值的（valuable）”信息 -> 员工在家工作并在线“提交（submitted）”。"
    ],
    "pitfall": "第 5 空容易忽略被动语态并列结构 could be done at home and ___ online，误选动词原形或把 maintained（维护）当作提交任务。",
    "vocabHighlights": [
      {
        "word": "commercial",
        "meaning": "adj. 商业的，盈利的"
      },
      {
        "word": "reservation",
        "meaning": "n. 预订，预约"
      },
      {
        "word": "submit",
        "meaning": "v. 提交，呈递"
      }
    ]
  },
  "q_mat_01": {
    "why": "E 段倒数第二句明确指出 Lots of people come here for the fantastic fishing spots around the island，与题干 Many people are attracted ... because of the incredible fishing sites around it 构成逐词同义改写。",
    "steps": [
      "先抓低频具体定位词 fishing sites，跳过全篇高频主题词 Great Barrier Island。",
      "快速纵览各段主旨，E 段集中介绍自然风光与户外活动（观鸟、潜水、冲浪、垂钓）。",
      "核对同义替换：Lots of people come here -> Many people are attracted；fantastic fishing spots -> incredible fishing sites。"
    ],
    "pitfall": "不要在长篇阅读中逐字精读 A–D 段浪费时间，直接用 fishing 视觉扫读 10 秒即可命中 E 段。",
    "vocabHighlights": [
      {
        "word": "unspoilt",
        "meaning": "adj. 未受破坏的，原生态的"
      },
      {
        "word": "spot",
        "meaning": "n. 地点，场所（对应题干 site）"
      },
      {
        "word": "boast",
        "meaning": "v. 拥有（引以为豪的事物）"
      }
    ]
  },
  "q_mat_02": {
    "why": "G 段后半段引用向导 Hilde 的话：It's odd ... they found there was more light pollution on the northern side coming from Fiji, which is about 3,000 km away，精准对应题干的 strange、light pollution 与 faraway island to the north。",
    "steps": [
      "锁定三个定位锚点：strange、light pollution、to the north。",
      "排除强干扰段 D 段：D 段仅说岛上没有路灯（no streetlights）与缺乏光线（lack of light），未涉及北方光污染来源。",
      "定位 G 段并验证三大替换：It's odd -> It is strange；northern side -> to the north；Fiji, 3,000 km away -> faraway island。"
    ],
    "pitfall": "看到 light 切忌停在 D 段草率作答，必须完整核对题干全部核心要素（奇怪 + 光污染 + 来自北方遥远岛屿）。",
    "vocabHighlights": [
      {
        "word": "odd",
        "meaning": "adj. 奇怪的，反常的（同义替换 strange）"
      },
      {
        "word": "light pollution",
        "meaning": "光污染"
      },
      {
        "word": "ambassador",
        "meaning": "n. 大使，推广代表"
      }
    ]
  },
  "q_mat_03": {
    "why": "E 段首句给出了失智症的词典定义：a broad term that describes a loss of thinking ability, memory, attention, logical reasoning, and other mental abilities，与题干几乎原词对应。",
    "steps": [
      "由题干动词 refers to 判断该句属于概念界定，直接寻找下定义的段落。",
      "借助专有搭配 logical reasoning 和 mental abilities 扫读，迅速定格 E 段首句。",
      "核验其余段落：F 段讲症状随时间恶化，G 段讲听力等感官衰退，均非综合定义。"
    ],
    "pitfall": "定义题在长篇匹配中属于必拿分题，看到 refers to / is defined as 立即扫读对应定义段，避免在实验数据段逗留。",
    "vocabHighlights": [
      {
        "word": "logical reasoning",
        "meaning": "逻辑推理"
      },
      {
        "word": "interfere with",
        "meaning": "妨碍，干扰"
      },
      {
        "word": "symptom",
        "meaning": "n. 症状"
      }
    ]
  },
  "q_mat_04": {
    "why": "H 段虽指出上述研究样本不大，但转折强调 it does give us hope that dementia can be prevented or delayed through exercise in one's middle age，精准对应题干 Hopefully、postpone or prevent 与 mid-life。",
    "steps": [
      "圈出三重语义核验点：Hopefully（有希望）、postpone or prevent（推迟或预防）、exercising in their mid-life（中年锻炼）。",
      "排除强干扰段 A 段和 I 段：A 段只报告风险降低 90%，未提“希望”与“推迟”；I 段说单靠运动不太可能预防阿尔茨海默症。",
      "在 H 段找到完整对应：give us hope -> Hopefully；prevented or delayed -> postpone or prevent；middle age -> mid-life。"
    ],
    "pitfall": "本题最大陷阱是只靠 mid-life 就选了 A 段或 I 段！长篇匹配中出现副词 Hopefully 往往对应原文的 give us hope。",
    "vocabHighlights": [
      {
        "word": "postpone",
        "meaning": "v. 推迟，延缓（同义替换 delay）"
      },
      {
        "word": "statistical significance",
        "meaning": "统计显著性"
      },
      {
        "word": "mid-life",
        "meaning": "n. 中年（同义替换 middle age）"
      }
    ]
  },
  "q_mat_05": {
    "why": "D 段首句开门见山指出 The question regarding pay is also best avoided，且下文解释首轮电话沟通不宜由求职者主动提出薪资期望（salary expectations），直接匹配题干。",
    "steps": [
      "本文每段首句即为一条清晰的面试忌讳，采用“首句扫描法”效率最高。",
      "用低频实词 pay（及同义词 salary）扫读 A–J 段首句，瞬间定位 D 段。",
      "核对语义：best avoided 对应 advised not to ask，question regarding pay 对应 questions about pay。"
    ],
    "pitfall": "职场建议类长篇阅读通常结构规整，优先扫读每段首句与尾句，不必陷入长引语细节。",
    "vocabHighlights": [
      {
        "word": "salary expectations",
        "meaning": "薪资期望"
      },
      {
        "word": "to be frank",
        "meaning": "坦白说"
      },
      {
        "word": "transparent",
        "meaning": "adj. 透明的，公开明确的"
      }
    ]
  },
  "q_mat_06": {
    "why": "J 段后半句明确指出：Seasoned interviewers will know whether an interviewee is researching while on the phone，甚至能听到敲键盘的声音，完整对应题干。",
    "steps": [
      "抓两处关键改写：Experienced interviewers -> Seasoned interviewers；searching for information online -> laptop ... quick searches / researching。",
      "排查干扰段 C 段：C 段批评的是面试时洗碗、逛超市等分心做家务（multitask），而非上网现查资料。",
      "核对 J 段完整语义，确认与题干 100% 契合。"
    ],
    "pitfall": "记住熟词僻义 seasoned = 经验丰富的（experienced），不认识该词很容易错过 J 段核心定位句。",
    "vocabHighlights": [
      {
        "word": "seasoned",
        "meaning": "adj. 经验丰富的，老练的（同义替换 experienced）"
      },
      {
        "word": "consultant",
        "meaning": "n. 顾问"
      },
      {
        "word": "multitask",
        "meaning": "v. 同时处理多项任务"
      }
    ]
  },
  "q_mat_07": {
    "why": "B 段明确指出：Instead of continuing to decline, the duration of the working week remained stable. It has stayed at just below 40 hours for nearly five decades，精准对应题干“近半个世纪未变”。",
    "steps": [
      "将题干时间词 nearly half a century 敏锐换算为 nearly five decades（约 50 年）。",
      "排除 A 段干扰：A 段描述的是 1930 至 1970 年间周工时从 47 小时“下降”到 39 小时，与题干 not changed 相反。",
      "在 B 段核对双重替换：duration of the working week -> average weekly working time；remained stable -> has not changed；nearly five decades -> nearly half a century。"
    ],
    "pitfall": "四级长篇匹配极爱考时间与数字换算（如 half a century <-> five decades、over one-fifth <-> 21%），扫读时务必主动做等价转换。",
    "vocabHighlights": [
      {
        "word": "duration",
        "meaning": "n. 持续时间，时长"
      },
      {
        "word": "decade",
        "meaning": "n. 十年（five decades = half a century）"
      },
      {
        "word": "stable",
        "meaning": "adj. 稳定的，无变化的"
      }
    ]
  },
  "q_mat_08": {
    "why": "F 段首两句点明这是 Friedman 认为最有说服力的第三种解释：“美国的不平等意味着生产率提高带来的红利没有被大众广泛共享，多数美国人太穷而无法减少工作时间”，完美匹配题干。",
    "steps": [
      "用唯一高辨识度抽象名词 inequality（不平等）快速定位至 F 段。",
      "核对作者态度动词：原文 proves more convincing for Friedman 对应题干 Friedman believes ... largely explains。",
      "确认因果闭环：gains of increasing productivity are not widely shared -> too poor to work less，对应题干后半句。"
    ],
    "pitfall": "D、E、F 三段均以 Friedman 的视角探讨原因，但 D、E 两段都被明确否定（far from sufficient / far from conclusive），切勿只见 Friedman 和 productivity 就误选 D 段。",
    "vocabHighlights": [
      {
        "word": "inequality",
        "meaning": "n. 不平等，差距"
      },
      {
        "word": "chronologically",
        "meaning": "adv. 按时间顺序地"
      },
      {
        "word": "convincing",
        "meaning": "adj. 令人信服的"
      }
    ]
  },
  "q_mat_09": {
    "why": "G 段描述了后续虚拟现实实验：受试者在镜中看到自己年老后的样貌（saw their aged selves），结果表示愿将多出 30% 的薪水存入养老金，远高于对照组（the control group），全面对应题干。",
    "steps": [
      "锁定具体视觉名词 images 与 aged selves，直接快速扫读找到实验细节段 G 段。",
      "逐项核对同义替换：visually age their faces / see their aged selves -> saw the images of their aged selves；save 30% more ... for retirement -> save more for their later years；than the control group -> than those who didn't。",
      "排除只介绍初始脑扫描实验的 B 段和仅提出设想的 F 段。"
    ],
    "pitfall": "注意“退休（retirement）”在四级题干中常被替换为 post-work years 或 later years。",
    "vocabHighlights": [
      {
        "word": "control group",
        "meaning": "对照组"
      },
      {
        "word": "bridge the disconnect",
        "meaning": "弥合脱节/隔阂"
      },
      {
        "word": "follow-up study",
        "meaning": "后续研究"
      }
    ]
  },
  "q_mat_10": {
    "why": "I 段指出人类仍需对抗本性，并用一句精炼论断点明原因：Our brains are hardwired for instant gratification（我们的大脑天生就是为即时满足而设定的），精准对应题干。",
    "steps": [
      "警惕 B、C 段也出现了 brain，需紧抓题干核心语义“天生决定 + 即时欲望”。",
      "在 I 段识别两组四级高阶同义替换：hardwired -> genetically determined；instant gratification -> satisfy immediate desires。",
      "验证前后文语境：后句 immediate rewards 进一步印证 I 段无误。"
    ],
    "pitfall": "hardwired（天生的、根深蒂固的）和 instant gratification（即时满足）是心理科普文章高频王牌词，务必牢记其常见改写。",
    "vocabHighlights": [
      {
        "word": "hardwired",
        "meaning": "adj. 天生的，由基因决定的"
      },
      {
        "word": "instant gratification",
        "meaning": "即时满足"
      },
      {
        "word": "reframe",
        "meaning": "v. 重新界定，换个角度看待"
      }
    ]
  },
  "q_mat_11": {
    "why": "G 段第二句写明 McGraw Hill, which controls 21% of the higher education market，21% 正好略高于五分之一（20%），精准对应题干 over one-fifth of the market share。",
    "steps": [
      "先用专有名词 McGraw Hill 筛出 B、E、G 三个候选段。",
      "把题干分数 over one-fifth（>20%）转换成百分比去扫描数字。",
      "在 G 段立刻锁定 controls 21% of the higher education market（controls -> accounts for，21% -> over one-fifth）。"
    ],
    "pitfall": "数字换算题（如 21% <-> over one-fifth、save up to 60% <-> less than half the price）几乎每年必考，一定要养成把英文分数立刻转百分比的习惯。",
    "vocabHighlights": [
      {
        "word": "account for",
        "meaning": "占据（比例），解释（同义替换 control）"
      },
      {
        "word": "exceed",
        "meaning": "v. 超过，超出"
      },
      {
        "word": "revenue",
        "meaning": "n. 营收，财政收入"
      }
    ]
  },
  "q_mat_12": {
    "why": "J 段引用奥古斯塔大学副教授 David Hunt 的观点：“在线系统或许让我轻松不少，但我觉得自己放弃了掌控权；课堂讨论才是我的专业知识最能造福学生的地方”，精准对应题干。",
    "steps": [
      "利用低频关键词 teachers 与 expertise 快速锁定全篇唯一以教授口吻发声的 J 段。",
      "核对同义改写：I feel like I'm giving up control -> deprive teachers of opportunities；where my expertise can benefit the students most -> make the best use of their expertise for their students。",
      "快速排除站在出版商立场夸赞数字功能的 H、I 段。"
    ],
    "pitfall": "本题并非直接出现 deprive 一词，而是通过“觉得放弃掌控权 + 专业知识在讨论中最能惠及学生”进行合理归纳转述，需要读懂引语背后的隐含逻辑。",
    "vocabHighlights": [
      {
        "word": "deprive ... of",
        "meaning": "剥夺……的（权利/机会）"
      },
      {
        "word": "expertise",
        "meaning": "n. 专业知识，专长"
      },
      {
        "word": "curriculum",
        "meaning": "n. 课程体系"
      }
    ]
  },
  "q_rd_01": {
    "why": "首段明确拆解了“经典超市两难困境（classic grocery store dilemma）”：一方面家人餐桌只配最好的食物（deserves only the best），另一方面钱包预算有限（your wallet can only stretch so far），精准概括为 D 项。",
    "steps": [
      "按题文同序锁定第一段第二至四句，找出 On the one hand ... On the other hand 两难结构的对立双方。",
      "准确理解习语 your wallet can only stretch so far = 预算有限（budget is limited）。",
      "排雷：A、B 项均只截取单边表述，未能体现“两难（dilemma）”；C 项“肯定更美味（certainly tastes better）”原文完全未提。"
    ],
    "pitfall": "看到 dilemma（两难）时，正确选项通常包含 but / yet 体现双向拉扯；单边选项（如 A、B）多为片面干扰项。",
    "vocabHighlights": [
      {
        "word": "dilemma",
        "meaning": "n. 进退两难的困境"
      },
      {
        "word": "stretch so far",
        "meaning": "延伸到有限程度（喻指预算有限）"
      },
      {
        "word": "trade-off",
        "meaning": "n. 权衡，取舍"
      }
    ]
  },
  "q_rd_02": {
    "why": "第三段第二句直截了当指出：从食品安全视角看，有机产品与非有机产品之间并没有重大差别（no big difference ... from a food-safety perspective），同义对应 D 项。",
    "steps": [
      "以题干关键词 food safety 精准定位至第三段第二句。",
      "识别同义改写：no big difference -> no substantial difference；organic and non-organic products -> the two。",
      "排雷：第三段后文说有机农夫也用天然杀虫剂甚至用量更大（直接证伪 C），且常规食品几乎检测不到残留（证伪 B），A 项“检测惯例不同”属无中生有。"
    ],
    "pitfall": "切忌带着“有机食品一定更安全、不打农药”的生活刻板印象答题，仔细阅读必须 100% 忠于原文证据。",
    "vocabHighlights": [
      {
        "word": "substantial",
        "meaning": "adj. 实质性的，重大的（对应原文 big）"
      },
      {
        "word": "pesticide",
        "meaning": "n. 杀虫剂，农药"
      },
      {
        "word": "perspective",
        "meaning": "n. 视角，角度"
      }
    ]
  },
  "q_rd_03": {
    "why": "第二段明确交代：近期一项研究发现自私比合作更具优势，但紧随其后用转折词 however 补充“这种好处可能是短暂的（The benefit may be short-lived）”，合并提炼即为 A 项。",
    "steps": [
      "由 one recent study 定位第二段第二至四句，切勿只读一句就停笔。",
      "整合两句核心意思：more advantageous（带来好处）+ short-lived（短暂的）= bring certain benefits in the short term。",
      "排雷：B 项与原文事实相反；C 项将研究目的（测试人们愿否舍弃私利）误作研究发现；D 项将“另一项研究中合作者长期表现更好”偷换为“自私让位于合作”。"
    ],
    "pitfall": "注意第二段包含了“两项研究（One recent study ... Another study）”，千万不要把第二项研究的结论张冠李戴给第一项研究。",
    "vocabHighlights": [
      {
        "word": "short-lived",
        "meaning": "adj. 短暂的，昙花一现的"
      },
      {
        "word": "advantageous",
        "meaning": "adj. 有利的，有优势的"
      },
      {
        "word": "in the long run",
        "meaning": "从长远来看"
      }
    ]
  },
  "q_rd_04": {
    "why": "末段先否定“纯基因决定论”（almost no behavior is entirely genetic），随即强调文化、学校教育和家庭养育是合作的重要决定因素（Culture, schooling and parenting are important determinants of cooperation），由此合理推断合作行为可以后天培养（may be cultivated），选 D。",
    "steps": [
      "紧盯题干范围限定：the last paragraph。",
      "先排绝对化干扰项：末段明确否定行为完全由基因决定，因此 B（天生非此即彼）与 C（基因决定合作倾向）均被推翻。",
      "由后天环境三要素（文化、学校、家庭教养）合理推导出 D 项“合作行为是可以培养的”；A 项曲解了 even among identical twins 的让步含义。"
    ],
    "pitfall": "推断题切记“贴近原文迈半步”：原文说教育和养育起重要作用，用情态动词 may 缓和表达的 D 项（may be cultivated）最具四级正确选项气质。",
    "vocabHighlights": [
      {
        "word": "determinant",
        "meaning": "n. 决定因素"
      },
      {
        "word": "cultivate",
        "meaning": "v. 培养，养成"
      },
      {
        "word": "altruistic",
        "meaning": "adj. 利他的，无私的"
      }
    ]
  },
  "q_rd_05": {
    "why": "首段指出冒充者现象患者认为“任何成功都归因于外部环境或单纯的运气与巧合（due to external circumstances or just luck and chance）”，对应 B 项“倾向于将成就归功于好运”。",
    "steps": [
      "定位首段全段三句，逐一比对四个均含原文词的高仿真选项。",
      "拆穿三处偷换概念：A 项把“低估自己和自身表现”偷换为“低估成功机会”；C 项把“害怕自己的‘伪装’暴露”偷换为“害怕被人欺骗（being deceived）”；D 项把“主观认为成功靠运气”歪曲为“客观上依赖运气成功”。",
      "核对 B 项：tend to attribute ... to good fortune 准确传达了原文 They think that any success is due to ... luck and chance。"
    ],
    "pitfall": "本题是“偷换概念”陷阱的教科书级考题！选项 A、C、D 全部借用了原文高辨识度原词（underestimate / constant fear / luck and chance），越像原词越要逐词核对主语和语态。",
    "vocabHighlights": [
      {
        "word": "attribute ... to",
        "meaning": "把……归因于"
      },
      {
        "word": "underestimate",
        "meaning": "v. 低估"
      },
      {
        "word": "deception",
        "meaning": "n. 欺骗，伪装"
      }
    ]
  },
  "q_rd_06": {
    "why": "末段最后两句明确指出：“冒充者现象不被界定为精神疾病，但受其困扰者表现出更高的抑郁易感性（show a higher vulnerability to depression）”，同义对应 A 项。",
    "steps": [
      "依据两位心理学家姓氏迅速定位至文章最后一段。",
      "紧抓末尾转折句：not defined as a mental illness（直接排掉绝对化且反向的 C 项）+ However, show a higher vulnerability to depression。",
      "完成高频词汇对接：higher vulnerability to -> more liable to（更易于遭受……）；排除无中生有的 B 和夸张化的 D。"
    ],
    "pitfall": "背熟四级阅读高频同义簇：be vulnerable to = be liable to = be prone to（容易受到……影响/患病）。",
    "vocabHighlights": [
      {
        "word": "vulnerability",
        "meaning": "n. 易损性，易感性（对应选项 liable）"
      },
      {
        "word": "depression",
        "meaning": "n. 抑郁症，沮丧"
      },
      {
        "word": "expose",
        "meaning": "v. 揭露，暴露"
      }
    ]
  },
  "q_rd_07": {
    "why": "首段第三句点明音乐的重要性：“它在全球都至关重要，并有潜力让人们在和平与和谐中凝聚在一起（bring people together in peace and harmony）”，且末段结尾再次呼应 it has the power to unite us，选 B。",
    "steps": [
      "由题干 important 定位首段第三句 vitally important across the globe。",
      "对比选项排除三大干扰：D 项含极端词 the only（绝对化）；A 项把“创造全新声音”偷换成“创造非凡情绪”；C 项将“和谐共处”狭隘曲解为“一起唱歌”。",
      "确认 B 项精准对应原文首尾呼应的核心主旨。"
    ],
    "pitfall": "遇到 only / always / never 等极端绝对词（如 D 项 the only language），在四级阅读中九成以上是绝对化干扰项。",
    "vocabHighlights": [
      {
        "word": "vitally",
        "meaning": "adv. 极其，至关重要地"
      },
      {
        "word": "in harmony",
        "meaning": "和谐地，融洽地"
      },
      {
        "word": "unite",
        "meaning": "v. 团结，使联合"
      }
    ]
  },
  "q_rd_08": {
    "why": "第四段在说明各国音乐目的相近后，直接用 essentially（本质上、根本上）点出音乐的根本作用：Music essentially serves to express or change emotions，精准对应 C 项。",
    "steps": [
      "将题干关键词 fundamental role 对应到原文副词 essentially serves to。",
      "精准锁定第四段第三句，直接确认 C 项 To express their emotions。",
      "排雷：D 项 entertaining 只是后文提到的娱乐性（can simply be recreational），以局部功能冒充根本作用；B 项原文未提；A 项并非第四段所界定的“本质功能”。"
    ],
    "pitfall": "区分本质功能（essentially serves to）与衍生/并列功能（often ceremonial / can simply be recreational），切勿以偏概全。",
    "vocabHighlights": [
      {
        "word": "essentially",
        "meaning": "adv. 本质上，根本上（对应题干 fundamental）"
      },
      {
        "word": "ceremonial",
        "meaning": "adj. 仪式的，礼仪性的"
      },
      {
        "word": "recreational",
        "meaning": "adj. 娱乐的，消遣的"
      }
    ]
  },
  "q_rd_09": {
    "why": "第四段首句直接回应为何道德厌恶在发育中出现较晚：“这说明其中实际上包含社会成分（a social component）”，紧接着说明儿童通过亲子情感对话等社交互动学习情绪，对应 A 项。",
    "steps": [
      "利用题干短语 appear quite late in children's development 锁定第四段首句。",
      "结合后两句理解 social component：亲子关于情绪的对话（parents-children conversations）就是典型的社交互动学习途径。",
      "排雷：B 项“缺乏控制”、C 项“过于复杂”属无中生有；D 项“父母很少谈论情绪”是对原句对比条件的过度推断。"
    ],
    "pitfall": "原文说“常谈情绪的父母比不常谈的父母带出的孩子理解力更好”，千万别由此过度推断出 D 项“父母很少谈论情绪”。",
    "vocabHighlights": [
      {
        "word": "component",
        "meaning": "n. 组成部分，要素"
      },
      {
        "word": "relevance",
        "meaning": "n. 相关性，关联"
      },
      {
        "word": "metaphor",
        "meaning": "n. 隐喻，比喻"
      }
    ]
  },
  "q_rd_10": {
    "why": "末段给出作者团队的研究结论：“道德厌恶要么到更大年龄才被理解（understood at a later age），要么在多达八岁的儿童中也仅仅被当作隐喻使用（甚至根本不用）”，由此可推断对儿童而言这一概念极难理解，选 A。",
    "steps": [
      "定位至末段最后一句 Our findings suggest that ...，完整分析两种并列可能。",
      "核对 A 项：不管是“更大年龄才理解”还是“仅作隐喻使用”，都说明对儿童而言道德厌恶是难以理解的概念（hardly comprehensible to children）。",
      "排雷：C 项与第五段结论相反（亲子主要聊生理厌恶而非道德厌恶）；D 项“具备强烈正义感的成年人”属无中生有；B 项把结论中含“或仅作隐喻”的谨慎表述片面窄化。"
    ],
    "pitfall": "末段推论题要同时照应前文第五段实验对象（4、6、8 岁儿童将偷零食归为愤怒而非厌恶）和末句 cautious conclusion，不可凭空添加原文未提的条件（如 D 项 sense of justice）。",
    "vocabHighlights": [
      {
        "word": "preliminary",
        "meaning": "adj. 初步的"
      },
      {
        "word": "metaphorically",
        "meaning": "adv. 比喻地，隐喻地"
      },
      {
        "word": "comprehensible",
        "meaning": "adj. 可理解的"
      }
    ]
  },
  "q_rd_11": {
    "why": "首段首句即亮出《自然》杂志新研究的核心发现：“在得知一个陌生人的细节后，我们会错误地以为对方也了解我们（mistakenly think that they also know about us）”，完整对应 C 项。",
    "steps": [
      "定位首段出现 Nature 的开头两句，抓住研究因果链的起点（发现细节 -> 误以为对方也了解自己 -> 行为更诚实）。",
      "确认同义转换：finding out details about -> get to know about；mistakenly think -> wrongly assume。",
      "排雷：A、D 项把“陌生人”偷换成了“彼此熟悉或对方了解我们的人”；B 项把“我们以为对方了解自己”偷换成了“对方渴望了解我们”。"
    ],
    "pitfall": "首段科普新闻题最常在第一句设主旨/发现题，注意准确抓住副词 mistakenly（错误地），不要漏掉这层“认知错觉”含义。",
    "vocabHighlights": [
      {
        "word": "reciprocal",
        "meaning": "adj. 相互的，互惠的"
      },
      {
        "word": "erroneously",
        "meaning": "adv. 错误地（同义替换 mistakenly）"
      },
      {
        "word": "assume",
        "meaning": "v. 假定，以为"
      }
    ]
  },
  "q_rd_12": {
    "why": "末段尾句清晰呈现田野实验结果：在发放社区警员个人简介传单后，实验住宅区周边比对照组出现了更少的刑事投诉和逮捕案件（fewer criminal complaints and arrests），对应 A 项。",
    "steps": [
      "按题文同序定位末段最后一句（Even more strikingly...）。",
      "抓住客观实证数据：fewer criminal complaints and arrests ... than around the control developments -> saw fewer crimes than the control developments。",
      "排雷：B 项“更快彻底消除（elimination）违法活动”严重夸大程度；C 项“警方出警变快”和 D 项“警民关系更融洽”均为过度脑补。"
    ],
    "pitfall": "四级阅读中“减少（fewer / reduce）”绝不能等同于“消除（eliminate）”，看到程度词突变必须果断排除。",
    "vocabHighlights": [
      {
        "word": "strikingly",
        "meaning": "adv. 显著地，令人惊讶地"
      },
      {
        "word": "distribution",
        "meaning": "n. 分发，派发"
      },
      {
        "word": "elimination",
        "meaning": "n. 消除，根除"
      }
    ]
  },
  "q_rd_13": {
    "why": "首段引用老子名言：“在意别人的看法，你就会永远成为他们的囚徒（Care about what other people think and you will always be their prisoner）”，正话反说即“如果把他人评价放在心上，就永远无法真正自由”，对应 C 项。",
    "steps": [
      "精读首句引语，把比喻义 be their prisoner 转化为直白语义“失去自由（never be truly free）”。",
      "匹配短语同义替换：Care about what other people think -> taking to heart others' opinion of us。",
      "排雷：A 项凭空捏造“别人企图囚禁我们”；B 项对应的是首段最后一句而非老子原话；D 项把警戒句反向曲解为倡导句。"
    ],
    "pitfall": "引用题（quotation）只考查引语本身的含义与隐喻转化，切忌把同一段后面别的句子的意思（如 B 项）混进来。",
    "vocabHighlights": [
      {
        "word": "take ... to heart",
        "meaning": "把……放在心上，耿耿于怀"
      },
      {
        "word": "approval",
        "meaning": "n. 认可，赞许"
      },
      {
        "word": "unproductive",
        "meaning": "adj. 徒劳的，低效的"
      }
    ]
  },
  "q_rd_14": {
    "why": "第三段追溯人们渴望被喜爱和认可的根源，段尾总结指出：当我们拼命渴望别人认可时，背后驱使我们的是内心深处那个“依然害怕被抛弃的小孩（that little kid part of us that is still terrified of abandonment）”，精准对应 D 项。",
    "steps": [
      "用题干 need to be liked 定位第三段首句（追溯到童年），再直读该段总结句。",
      "锁定三组同义改写：little kid part -> early childhood；terrified of -> fear of；abandonment -> being deserted。",
      "排雷：A 项“渴望互动”、B 项“理解世界运作”都是儿童成长过程中的伴随背景（张冠李戴），并非驱使讨好行为的深层原因；C 项将“恐惧”偷换为“认知（knowledge）”。"
    ],
    "pitfall": "第三段同时出现 interactions、how the world works、abandonment 等多个原词，C 项更是精准抄了 abandonment 却把 terrified 改成了 knowledge，一定要核对情绪动词是否一致。",
    "vocabHighlights": [
      {
        "word": "desert",
        "meaning": "v. 抛弃，遗弃（同义替换 abandon）"
      },
      {
        "word": "account for",
        "meaning": "解释，说明……的原因"
      },
      {
        "word": "validation",
        "meaning": "n. 认可，确认"
      }
    ]
  },
  "q_rd_15": {
    "why": "第四段提出积累新奇体验能强健大脑即便它正在萎缩，紧接着第五段举出接地气的实例：“哪怕简单到换条路线去杂货店、去新地方度假，也能保持大脑健康”，概括即 D 项“用新奇方式对待日常事务”。",
    "steps": [
      "先在第四段末尾找到 even as the brain shrinks，顺读第五段寻找具体办法。",
      "将具体例证抽象概括：taking a different route to the grocery store / going somewhere new -> Approaching everyday tasks in novel ways。",
      "排雷：A 项借用段首 conventional 却把意思说反了（换新路线绝非墨守成规）；B 项“不担心”原文未提；C 项误读末段谚语。"
    ],
    "pitfall": "A 项利用第五段首词 Conventional 制造极强视觉干扰，但原文说的是“常规健脑工具（填字游戏等）”，而不是“按常规方式做日常琐事”。",
    "vocabHighlights": [
      {
        "word": "novel",
        "meaning": "adj. 新奇的，新颖的"
      },
      {
        "word": "durability",
        "meaning": "n. 持久性，耐用度"
      },
      {
        "word": "shrink",
        "meaning": "v. 萎缩，缩小"
      }
    ]
  },
  "q_rd_16": {
    "why": "末段倒数第三句清晰给出了 2012 年《心理学与老龄化》研究发现的因果链：完成解谜和数字游戏等推理任务 -> 增强对新体验的渴望（enhance that desire for novel experiences）-> 进而令大脑焕然一新（which can, in turn, refresh the brain），精准对应 C 项。",
    "steps": [
      "靠专有名词 2012 study 和 Psychology and Aging 秒速定位长难句。",
      "用箭头画出句内因果：completing reasoning tasks -> enhance desire for novel experiences -> refresh the brain，对应 C 项 Desiring new experiences can help to renovate the brain。",
      "拆穿张冠李戴：A 项把“完成推理任务”与“渴望”因果颠倒；B 项把前文“参与新事业提升记忆”错配到 2012 研究上；D 项曲解末句老狗学新把戏的谚语。"
    ],
    "pitfall": "长难句中套着定语从句（which can, in turn, refresh the brain）时，必须先弄清 which 指代先行词“对新体验的渴望”，才能避开 A、B 两项张冠李戴的圈套。",
    "vocabHighlights": [
      {
        "word": "renovate",
        "meaning": "v. 翻新，使焕发活力（同义替换 refresh）"
      },
      {
        "word": "in turn",
        "meaning": "转而，进而"
      },
      {
        "word": "openness",
        "meaning": "n. 开放性，乐于接受新事物"
      }
    ]
  },
  "q_rd_17": {
    "why": "第三段阐述大脑随年龄衰老的变化：“某些部位萎缩……脑细胞的变化会影响大脑不同区域之间的沟通（affect communication between different regions of the brain）”，同义对应 C 项。",
    "steps": [
      "由 as we become aged 定位第三段（The brain ages just like the rest of the body）。",
      "精准匹配第三句：communication between different regions of the brain -> Communication within our brain。",
      "识破三大典型干扰项：D 项把 Certain parts shrink 偷换成 whole brain（局部以偏概全）；B 项把 shrink 夸大为 stop functioning；A 项把脑内区域交流偷换成对外人际交往技巧（interaction skills）。"
    ],
    "pitfall": "某些（certain parts）vs 全部（whole）、影响（affect）vs 彻底停止（stop）是四级阅读最经典的两类程度/范围篡改，审选项时务必圈出限定词。",
    "vocabHighlights": [
      {
        "word": "deteriorate",
        "meaning": "v. 恶化，退化"
      },
      {
        "word": "region",
        "meaning": "n. 区域，部位"
      },
      {
        "word": "narrow",
        "meaning": "v. 变窄"
      }
    ]
  },
  "q_rd_18": {
    "why": "最后一段总结了达夫纳医生对抗记忆衰退的建议：“换言之，让你的大脑保持忙碌和运转（keep your brain busy and working）；同时让身体积极动起来（get physically active）”，完整对应 D 项“身心都保持活跃”。",
    "steps": [
      "按题文同序定位文章最后一段，抓住总结信号词 In other words 和并列信号词 And also。",
      "合并两个要点：brain busy and working（mentally active）+ get physically active（physically active）-> Staying active both physically and mentally。",
      "排雷：A 项把“看医生排查药物/健康问题”曲解为定期身心体检；B 项吃健脑药、C 项记忆修复活动均属无中生有。"
    ],
    "pitfall": "看到段末 exercise is a known brain booster 时，千万别被 B 项的 boost one's brain 吸引眼球，B 项主语被悄悄偷换成了 Taking medicine（吃药）。",
    "vocabHighlights": [
      {
        "word": "cognitive reserve",
        "meaning": "认知储备"
      },
      {
        "word": "booster",
        "meaning": "n. 助推器，增强剂"
      },
      {
        "word": "combat",
        "meaning": "v. 对抗，防止"
      }
    ]
  },
  "q_tr_01": {
    "why": "2026年6月“尊师与教师节”属于典型中国传统文化与教育主题翻译，得分关键在于三点：把中文谚语意译自然、精准切换三种时态（过去/现在完成/现在）、用分词和定语从句整合中文短句。",
    "steps": [
      "拆解谚语与双句并列：用 compares a teacher, even for a single day, to a father for life 传神表达“一日为师，终身为父”。",
      "抓时态标志词：In ancient times 触发一般过去时（held），since 1985 触发现在完成时（has observed / has designated）。",
      "句式升档：用 reflecting ... 现在分词处理“足见……”，用 continues to be promoted and practiced 被动语态收尾“得到了发扬光大”。"
    ],
    "pitfall": "切忌把“做人的道理”中式直译成 the principle of being a human，地道写法是 how to conduct themselves 或 how to be a person of integrity；同时注意 Teachers' Day 撇号在 s 后。",
    "vocabHighlights": [
      {
        "word": "pass on / impart knowledge",
        "meaning": "传授知识"
      },
      {
        "word": "conduct oneself",
        "meaning": "为人处世，立身做人"
      },
      {
        "word": "traditional virtue",
        "meaning": "传统美德"
      }
    ]
  },
  "q_tr_02": {
    "why": "“餐桌礼仪”高频考查无主句转化与介词/分词空间定位（正对大门、在主人身边就座）。只要主谓结构清晰、动词准确（refill / serve / foster），非常容易冲刺 12+ 高分档。",
    "steps": [
      "利用题干提供的 dining etiquette 搭起首句并列谓语（is ... and reflects ...）。",
      "将中文无主句“就餐座位的安排非常讲究”转为被动句 Seating is arranged with particular care，并用冒号引出主客座次。",
      "精准落地细节动词：facing the door（正对大门）、guest of honor（主宾）、refills ... wine glasses（添酒）、fostering harmonious relationships（促进和谐交往）。"
    ],
    "pitfall": "“添酒加菜”不要生硬直译成 add wine and add vegetables（dishes 才指菜肴），地道动词是 refill wine glasses and serve more food。",
    "vocabHighlights": [
      {
        "word": "dining etiquette",
        "meaning": "餐桌礼仪"
      },
      {
        "word": "guest of honor",
        "meaning": "贵宾，主宾"
      },
      {
        "word": "foster harmonious relationships",
        "meaning": "促进和谐人际关系"
      }
    ]
  },
  "q_tr_03": {
    "why": "“礼尚往来”核心考查长定语拆分与中文流水句重组。把握“短定语前置 + 长定语后置”和分词作背景状语（Following the tradition of ...）即可让整段英文行云流水。",
    "steps": [
      "首句用动名词短语 Exchanging gifts among relatives and friends 作主语，避免出现两个动词原形并列的语法硬伤。",
      "第三句拆解双定语：把“精心挑选的”前置（thoughtfully chosen），把“符合接受者喜好的”后置为定语从句（that suits the recipient）。",
      "尾句利用题干给出的 mutually exchanging courtesies，结合 offer one in return at an appropriate time 完整收束。"
    ],
    "pitfall": "“回赠礼物”切勿译作 return a gift / give back a gift（容易被理解为退货或拒收退还），应表达为 offer/give a gift in return。",
    "vocabHighlights": [
      {
        "word": "convey affection",
        "meaning": "表达情感"
      },
      {
        "word": "strengthen the bond",
        "meaning": "加深纽带/感情"
      },
      {
        "word": "in return",
        "meaning": "作为回报，回赠"
      }
    ]
  },
  "q_tr_04": {
    "why": "“北京四合院”是建筑文化类经典真题，集中检验 be characterized by、of which 定语从句、be of great significance to 三大四级提分黄金句型。",
    "steps": [
      "第一句用 which is characterized by ... + enclosing ... 把三个中文分句凝练成一个层次清晰的复合句。",
      "第三句用 There are many types of Siheyuan ..., of which the most typical one is in Beijing 优雅呈现总分关系。",
      "尾句注意主语逻辑：用 the number of traditional Siheyuan has gradually decreased，并以 is of great significance to 提升学术质感。"
    ],
    "pitfall": "很多同学把“传统四合院逐渐减少”直译为 Traditional Siheyuan has decreased，英文中可数建筑物数量下降应补出 the number of；另外注意 winter/summer 前不加 the。",
    "vocabHighlights": [
      {
        "word": "residential building",
        "meaning": "住宅建筑"
      },
      {
        "word": "be characterized by",
        "meaning": "以……为特点"
      },
      {
        "word": "of great significance to",
        "meaning": "对……具有重要意义"
      }
    ]
  },
  "q_tr_05": {
    "why": "“中国农历”跨越数千年历史与当代生活，最核心的阅卷采分点在于精准驾驭过去时、现在完成时、一般现在时三重时态，以及农耕主题高频词汇。",
    "steps": [
      "首句将“起源于……”处理成非限制性定语从句，主句落地 was formulated based on the movements of the sun and the moon。",
      "第二句见“长期以来”用现在完成时 has played an important role；第三句写古人农事回切一般过去时（recorded / arranged），用 in order to 连接双重目的。",
      "末两句回到一般现在时：传统节日均基于农历，且当今依然广为使用（is still widely used today）。"
    ],
    "pitfall": "专有名词 Spring Festival 和 Mid-Autumn Festival 首字母务必大写；“农作物产量”优先用 crop yields / the yield of crops，避免拼错 output 或误用 production。",
    "vocabHighlights": [
      {
        "word": "originate in",
        "meaning": "起源于（某地）"
      },
      {
        "word": "formulate",
        "meaning": "v. 制定，规划"
      },
      {
        "word": "yield and quality of crops",
        "meaning": "农作物的产量和质量"
      }
    ]
  },
  "q_tr_06": {
    "why": "“福”字民俗题词汇友好、句式直观，是翻译模块最易拿高分的代表题。重点在于善用题干提示词、打磨排比短语以及用 upside down 精准传达民俗梗。",
    "steps": [
      "善用题干给出的 the character fu 与 auspicious，首句用 signifying ... 作定语凝练结构。",
      "第二句“家庭幸福、社会安定、国家昌盛”处理成三组对称“形容词+名词”短语：family happiness, social stability and national prosperity。",
      "后半段把“贴福字”灵活变化为 Posting / put ... on doors or walls，尾句用 upside down, indicating that ... have arrived 完美收官。"
    ],
    "pitfall": "“倒过来贴”不要硬译为 paste inversely 或 upside to down，固定副词短语是 upside down；“幸福已到”用现在完成时 have arrived 才能呼应“已到”的谐音寓意。",
    "vocabHighlights": [
      {
        "word": "long-standing folk custom",
        "meaning": "由来已久的民间习俗"
      },
      {
        "word": "yearning for",
        "meaning": "对……的向往/渴望"
      },
      {
        "word": "upside down",
        "meaning": "颠倒地，倒过来"
      }
    ]
  },
  "q_tr_07": {
    "why": "2025年12月“城市漫步 (City Walk)”紧贴当代青年生活方式，考查对比句式（Unlike ...）、动宾平行结构以及地道旅游表达，非常适合考前背诵套用。",
    "steps": [
      "首句紧抓“近年来”，用 In recent years 搭配现在完成时 has quietly emerged ... and has become。",
      "第二句用 Unlike traditional tourism 引出对比，并用 does not aim to ...; instead, ... 清晰衔接正反两面。",
      "中后段使用三连动词平行（taste / admire / learn about）与使役动词 enables ... to gain a deeper understanding 提升表达高级感。"
    ],
    "pitfall": "“尽可能多的景点”务必写对同级比较结构 as many attractions as possible，避免漏掉第二个 as 或把可数名词 attractions 错用成 much。",
    "vocabHighlights": [
      {
        "word": "emerge",
        "meaning": "v. 兴起，浮现"
      },
      {
        "word": "authentic local snacks",
        "meaning": "地道当地小吃"
      },
      {
        "word": "distinctive architecture",
        "meaning": "特色建筑"
      }
    ]
  },
  "q_tr_08": {
    "why": "“袁隆平与超级杂交水稻”属于科技成就与人物贡献类高频真题，难点在于开篇超长前置定语后置转化，以及农业科技参数（抗旱抗病、增产 20-30%）的精准表达。",
    "steps": [
      "破解首句长定语：将主语锁定为 Yuan Longping and his research team，把“被誉为杂交水稻之父”转为插入语 hailed as the 'Father of Hybrid Rice'。",
      "第三句用三项并列谓语（becomes more resistant to ..., can adapt to ..., and can increase yields by 20 to 30 percent）保持主语一致、避免断句零碎。",
      "末句用现在完成时被动 has been widely applied 衔接现在分词结果状语 making a major contribution to global food security。"
    ],
    "pitfall": "“提高 20-30%”务必使用介词 by（表示增幅），写成 increase to 20-30% 会变成“增长到 20-30%”，造成严重语义错误！",
    "vocabHighlights": [
      {
        "word": "be hailed as",
        "meaning": "被誉为，被称为"
      },
      {
        "word": "be resistant to",
        "meaning": "抗……的，耐……的"
      },
      {
        "word": "global food security",
        "meaning": "全球粮食安全"
      }
    ]
  },
  "q_tr_09": {
    "why": "“中国环境保护”集合了四级社会发展类翻译几乎全部王牌词块（高度重视、显著成效、一系列有效措施、积极参与国际合作），练熟此题可迁移应对大量生态与民生类真题。",
    "steps": [
      "首两句高频模板精准起手：attaches great importance to environmental protection + In recent years, China has achieved remarkable results in reducing ...。",
      "第三句用 including 串联四个平行 -ing 措施短语（developing clean energy / improving public transportation / promoting bike-sharing / implementing waste sorting）。",
      "最后两句切换时态与句式：用现在进行时比较级 are becoming greener and more beautiful 呈现动态变化，用分词 making important contributions 收束国际合作。"
    ],
    "pitfall": "四项举措跟在介词 including 之后必须全部统一为动名词（-ing），切忌混用动词原形或不定式破坏平行结构。",
    "vocabHighlights": [
      {
        "word": "attach great importance to",
        "meaning": "高度重视"
      },
      {
        "word": "waste sorting",
        "meaning": "垃圾分类（也可译作 garbage classification）"
      },
      {
        "word": "take a series of effective measures",
        "meaning": "采取一系列有效措施"
      }
    ]
  },
  "q_wr_01": {
    "why": "2026年6月“校园机器人的未来应用”属于科技+校园场景的校报投稿题。高分关键不在于泛泛赞美科技，而在于给出具体的校园落地场景（图书馆、实验楼物资配送），并进一步思考试点、隐私与人工服务兜底。",
    "steps": [
      "第 1 段（场景具体化）：紧扣 routine tasks，用图书馆导引与跨楼配送两个鲜活校园案例回答“机器人能做什么”。",
      "第 2 段（落地可行性）：用 start with a small trial 提出试点推进，同时照顾路线反馈、隐私透明和人工服务台三大细节。",
      "第 3 段（理性收束）：以 A would be most useful if it solved specific problems 点明“以需求为导向”的核心判断。"
    ],
    "pitfall": "低分作文往往把全文写成空洞的“AI 很强大、机器人会改变世界”，完全脱离 on campus 场景限制；务必句句贴合大学校园真实痛点。",
    "vocabHighlights": [
      {
        "word": "routine tasks",
        "meaning": "日常重复性事务"
      },
      {
        "word": "small trial",
        "meaning": "小范围试点"
      },
      {
        "word": "accessibility",
        "meaning": "n. 无障碍通行，便利程度"
      }
    ]
  },
  "q_wr_02": {
    "why": "“让校园生活更便利”是典型的校园提案类作文，最讨阅卷老师喜欢的写法是“痛点精准 + 方案低成本可落地 + 有验证机制”，三段式层层推进，全篇 150 词左右节奏极佳。",
    "steps": [
      "第 1 段（正式开篇 + 举措一）：用 I propose that ... 亮出提案主题，先提出“一页汇总图书馆/校医院/食堂开放时间”解决信息分散痛点。",
      "第 2 段（举措二 + 调研意识）：建议考试周延长自习室时长，并补上 Before making the change permanent, it should ask students ... 体现严谨可行性。",
      "第 3 段（举措三 + 成本收束）：补充透明报修表单，以 without requiring new buildings 点出“花小钱办大事”的提案优势。"
    ],
    "pitfall": "切忌使用 propose the university to do 这种错误搭配！propose 接人或机构做某事必须用 propose that + 主语 + (should) + 动词原形。",
    "vocabHighlights": [
      {
        "word": "put forward a proposal",
        "meaning": "提出提案"
      },
      {
        "word": "make ... permanent",
        "meaning": "使……永久化/常态化"
      },
      {
        "word": "follow up",
        "meaning": "跟进，追踪进度"
      }
    ]
  },
  "q_wr_03": {
    "why": "这道 2026 年真题明确要求从 necessity（必要性）和 practicality（可行性）两个维度回应提案。采用“有条件支持（provided that...）+ 双维分段落位 + 特殊情况替代方案”的结构，思辨性与结构完整度双双拉满。",
    "steps": [
      "第 1 段（回应 necessity）：用 I support ..., provided that ... 亮明成熟立场，列举科研训练赋予所有学生的三项通用核心技能。",
      "第 2 段（回应 practicality）：通过“嵌入常规课程的小型小组项目 + 统一节点指导”拆解可行性，化解师资与时间顾虑。",
      "第 3 段（补充弹性方案）：照顾课表紧凑或无法进实验室的学生，提出 offer alternatives，以 reasonable workloads and clear guidance 收尾。"
    ],
    "pitfall": "最容易丢分的硬伤是只谈科研有多重要（necessity）而漏掉可行性（practicality），审题时务必圈出题干全部限定要求并逐一设段回应。",
    "vocabHighlights": [
      {
        "word": "provided that",
        "meaning": "前提是，只要"
      },
      {
        "word": "milestone",
        "meaning": "n. 阶段性里程碑，关键节点"
      },
      {
        "word": "reasonable workload",
        "meaning": "合理工作量"
      }
    ]
  },
  "q_wr_04": {
    "why": "“学生会如何丰富校园生活”属于建议性回应，高分秘诀在于跳出“多办晚会和比赛”的陈词滥调，先提出“多元、以学生为中心”的总原则，再用精细社群与校友技能工坊两类措施精准赋能。",
    "steps": [
      "第 1 段（原则引领）：用 I propose that it should adopt a more diverse and student-centered approach 确立高站位。",
      "第 2 段（双措施推进）：用 By shifting some focus from ... to ... 引入细分兴趣社群，再用 Furthermore 引入校友导师技能工作坊（targeted guidance）。",
      "第 3 段（调研闭环 + 倒装升华）：建议每学期前开展线上问卷，并用 Only in this way can ... 倒装句收尾提气。"
    ],
    "pitfall": "写建议类文章切忌光报活动菜单（basketball matches, singing contests），每项建议后面必须紧跟“它如何帮到学生（help students find like-minded peers / offer targeted guidance）”。",
    "vocabHighlights": [
      {
        "word": "tailored",
        "meaning": "adj. 定制化的，针对性的"
      },
      {
        "word": "like-minded peers",
        "meaning": "志同道合的同龄人/伙伴"
      },
      {
        "word": "targeted guidance",
        "meaning": "针对性指导"
      }
    ]
  },
  "q_wr_05": {
    "why": "“是否应必修学术写作”是典型的高校政策辩论题，高分范式为“开门见山站队 + 两条跨学科硬核论据 + 末段让步化解反方顾虑”，逻辑严密、无懈可击。",
    "steps": [
      "第 1 段（立场鲜明）：用 There is no denying that ... 引入，紧接着用 From my perspective 明确支持必修学术写作。",
      "第 2 段（核心论据）：第一层强调逻辑组织与证据支撑（跨学科通用），第二层落脚规范引用与学术诚信（academic integrity）。",
      "第 3 段（让步回击）：用 While some may argue that mandatory courses reduce flexibility 先正视反方担忧，再以“按专业定制模块”化解矛盾。"
    ],
    "pitfall": "注意学术写作不等于“写英语作文”或“文科生专属”，论证时务必强调它对理工与人文各学科（whether a lab report or a literature review）都同样重要。",
    "vocabHighlights": [
      {
        "word": "academic integrity",
        "meaning": "学术诚信"
      },
      {
        "word": "mandatory / compulsory",
        "meaning": "adj. 必修的，强制性的"
      },
      {
        "word": "indispensable",
        "meaning": "adj. 不可或缺的"
      }
    ]
  },
  "q_wr_06": {
    "why": "“合理使用 AI 辅助学习”紧扣当下热点，切题灵魂在于把握“辩证平衡”：既认可个性化辅导效率，又警惕过度依赖，并以“补充而非替代”给出清晰原则。",
    "steps": [
      "第 1 段（亮出核心原则）：以 With the rapid development of AI 顺畅切入，抛出王牌观点句 AI should be used as a supplement, not a substitute。",
      "第 2 段（On the one hand / However, on the other hand 双面剖析）：正面写个性化讲解与即时反馈，反面写 over-reliance 削弱批判性思维与独立思考。",
      "第 3 段（双主体行动建议）：学生把它当成检验思路的导师而非抄答案捷径，学校则配套出台清晰使用规范。"
    ],
    "pitfall": "避免写成一边倒夸赞或全盘否定 AI！同时注意“对……过度依赖”的固定介词是 over-reliance on（不是 to 或 in）。",
    "vocabHighlights": [
      {
        "word": "supplement vs. substitute",
        "meaning": "补充品 vs. 替代品"
      },
      {
        "word": "over-reliance on",
        "meaning": "对……过度依赖"
      },
      {
        "word": "critical thinking",
        "meaning": "批判性思维"
      }
    ]
  },
  "q_wr_07": {
    "why": "“培养跨文化交际能力”考查“价值论证 + 培养路径”的综合驾驭能力。通过个人视野与职业竞争力双轨论证，再辅以高校具体落地举措，文章丰满且毫不跑题。",
    "steps": [
      "第 1 段（时代背景与主旨）：用 It is widely acknowledged that ... 指出全球互联时代跨文化交际已从选修变刚需。",
      "第 2 段（双轨价值）：用 Exposure to different perspectives broadens ... and cultivates ... 写个人格局与合作力，用 competitive edge 写求职优势。",
      "第 3 段（三项培养抓手）：列举交换项目、多元文化校园节与融入文化语境的语言课程，结尾升华至走向国际舞台。"
    ],
    "pitfall": "切忌把整篇写成“不同国家文化习俗差异举例”，题目焦点是 development of students' cross-cultural communication abilities（为何要培养、怎么培养）。",
    "vocabHighlights": [
      {
        "word": "broaden one's horizons",
        "meaning": "拓宽视野"
      },
      {
        "word": "competitive edge",
        "meaning": "竞争优势"
      },
      {
        "word": "bridge cultural gaps",
        "meaning": "弥合文化鸿沟"
      }
    ]
  },
  "q_wr_08": {
    "why": "“如何丰富学生中国传统文化知识”是四级高频“文化+方法”题型。高分范文避开空喊热爱传统的套路，紧扣 how to enrich，构建“课程+工作坊”与“校园活动+实地参访”双轮驱动框架。",
    "steps": [
      "第 1 段（点题破局）：提出不能局限于枯燥课本，需要采用更有参与感的方式丰富传统文化知识。",
      "第 2 段（双路径具象展开）：先用 One effective method is to ... 串联选修课与实践工作坊（not only academic insights but also hands-on experience），再用 In addition 展开社团文化节与博物馆研学。",
      "第 3 段（总结升华）：强调系统学习与亲身参与结合，自然培养出更深厚的文化自信（cultural confidence）。"
    ],
    "pitfall": "很多考生前两段都在背诵“中国传统文化有五千年历史、博大精深”，直到最后一句才匆匆提方法，导致严重偏题；记住首段末尾就应切入“方法论”。",
    "vocabHighlights": [
      {
        "word": "hands-on experience",
        "meaning": "亲身实践体验"
      },
      {
        "word": "academic insights",
        "meaning": "学术洞见"
      },
      {
        "word": "cultural confidence",
        "meaning": "文化自信"
      }
    ]
  },
  "q_wr_09": {
    "why": "“学生如何建设绿色校园”聚焦学生主体行动，语言平实而富有感染力。采用“个人日常微习惯 + 集体环保倡议”两层递进结构，既精准切题又极易积累迁移词汇。",
    "steps": [
      "第 1 段（责任定位）：指出绿色校园不只是校方责任，每位学生通过 simple yet impactful habits 都能贡献力量。",
      "第 2 段（由己及人两层行动）：先列举携带环保杯、宿舍垃圾分类、随手关灯与步行骑行（reduce carbon footprint），再拓展至加入环保社团开展植树、旧书交换和线上倡导。",
      "第 3 段（凝练收束）：点明微行动汇聚大改变，用 make joint efforts 号召共同建设绿色健康校园。"
    ],
    "pitfall": "务必牢记行为主体是 students！如果通篇写“学校应该多装垃圾桶、政府应该立法”，就会因为偏离 how the students can contribute 而被降档。",
    "vocabHighlights": [
      {
        "word": "simple yet impactful",
        "meaning": "简单却有影响力的"
      },
      {
        "word": "carbon footprint",
        "meaning": "碳足迹"
      },
      {
        "word": "make joint efforts",
        "meaning": "共同努力"
      }
    ]
  }
};

  if (typeof window !== 'undefined') {
    window.EXPLAIN_DETAILS = EXPLAIN_DETAILS;
  } else if (root && typeof root === 'object') {
    root.EXPLAIN_DETAILS = EXPLAIN_DETAILS;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      EXPLAIN_DETAILS: EXPLAIN_DETAILS
    };
  }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
