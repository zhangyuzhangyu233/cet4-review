/* ==========================================================================
   CET-4 Deep Tailored Question Explanations (explanations_data.js)
   Maps 100% of every question ID in window.QUESTION_BANK (80/80) to:
     { why, stemZh, evidenceZh, optionBreakdown, paraphraseMap, posNote, blankDetails, steps, pitfall, vocabHighlights }
   Zero emojis. Zero mock-exam content. Clean UTF-8 Chinese/English.
   ========================================================================== */
(function (root) {
  'use strict';

  const EXPLAIN_DETAILS = {
  "q_lis_01": {
    "stemZh": "这则新闻报道主要讲了什么？",
    "evidenceZh": "五十多年前由一位新罕布什尔州男子投入大海的漂流瓶信息，在1500英里外被发现，并已归还给了他的女儿。",
    "why": "英语新闻听力遵循“导语即主旨”的黄金法则，第一句通常高度概括全文核心事件（谁做了什么以及结果如何）。本篇新闻首句明确交代：一位新罕布什尔州男子五十多年前扔进大海的漂流瓶信息在1500英里外被找到，并且已经归还给他的女儿（has been returned to his daughter）。后文围绕发现人克林特·布芬顿的度假经历、瓶中悬赏字条的来历以及最终将信息交还给保拉·皮尔斯展开，全都是首句主旨的细节补充，因此直接对应 A 项。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "一个漂流瓶信息被归还给了瓶子主人的女儿。",
        "verdict": "correct",
        "reason": "与新闻首句导语完全同义改写：a message in a bottle 对应 a bottled message，has been returned to his daughter 对应 The return of ... to its owner's daughter。"
      },
      {
        "key": "B",
        "zh": "一位新罕布什尔州男子与朋友联手对妻子开的一个玩笑。",
        "verdict": "wrong",
        "reason": "无中生有且曲解细节。原文只说女孩的父亲当年把纸条当成玩笑（as a joke）写下并扔进大西洋，完全没有提到“与朋友联手”或“捉弄妻子”。"
      },
      {
        "key": "C",
        "zh": "一位父亲留给女儿的信息。",
        "verdict": "wrong",
        "reason": "以偏概全且偏离事实。纸条并非父亲专门写给女儿的留言，而是五十多年前投海的悬赏玩笑，且该选项漏掉了“被发现并跨越半个世纪归还”这一新闻核心事件。"
      },
      {
        "key": "D",
        "zh": "一家百年老旅馆的历史。",
        "verdict": "wrong",
        "reason": "次要背景干扰且数字不符。原文仅提及保拉·皮尔斯的父母在1960年拥有一家海滨汽车旅馆（motel），这是解释字条来历的配角信息，既非全文主旨，也未说是“百年老店”。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "A message in a bottle",
        "to": "a bottled message",
        "note": "后置介词短语转为前置形容词修饰：名词+介词短语（message in a bottle）在选项中精简为“过去分词形容词+名词”（bottled message）。"
      },
      {
        "from": "has been returned to his daughter",
        "to": "The return of a bottled message to its owner's daughter",
        "note": "动词被动结构名词化：将现在完成被动句“已被归还给他的女儿”转化为抽象名词短语“the return of ... to ...”，这是新闻主旨题最高频的改写形式。"
      },
      {
        "from": "his daughter",
        "to": "its owner's daughter",
        "note": "人称代词指代具体化：原文用物主代词 his 回指投出漂流瓶的男子，选项改写为 its owner's（漂流瓶主人的）以独立成句。"
      }
    ],
    "steps": [
      "听前预读：扫读四个选项均为概括性名词短语（return / joke / message / history），立即预判本题考查新闻主旨，准备全神贯注听第一句导语。",
      "听中定位：在第一句迅速捕捉主语 A message in a bottle 和核心结果动作 has been returned to his daughter，完成主干信息锁定。",
      "听后排雷：中后段出现的 joke 和 motel 只是交代悬赏字条的背景故事，不要被局部原词带偏；核对 B、C、D 的细节硬伤后稳选 A。"
    ],
    "pitfall": "新闻主旨题最怕“只听后半段而忘掉首句”。很多同学听到中段的 as a joke 或 motel 就误以为 B 或 D 是答案，实际上新闻最重要的核心事实永远压在第一句。",
    "vocabHighlights": [
      {
        "word": "decade",
        "meaning": "n. 十年；more than five decades ago 意为“五十多年前”，听力中常把具体年数与 decade 互换考查。"
      },
      {
        "word": "return ... to",
        "meaning": "v.+prep. 把……归还给……；选项中常转化为名词搭配 the return of ... to ...。"
      },
      {
        "word": "hold up to a promise",
        "meaning": "动词短语，信守承诺，兑现诺言；与 keep / honor a promise 同义。"
      },
      {
        "word": "deliver",
        "meaning": "v. 递送，交付，传达；常用于快递、信件、演讲等场景。"
      }
    ]
  },
  "q_lis_02": {
    "stemZh": "多彻斯特县为什么要开展喷洒作业？",
    "evidenceZh": "周六周末的灭虫喷洒导致南卡罗来纳州多彻斯特县超过200万只蜜蜂当场死亡，而该地区此前已确诊了4例与旅行相关的寨卡病例。",
    "why": "新闻第一、二句构成完整的因果链条：首句点明“南卡罗来纳州开展空中灭虫喷洒作业是为了抗击寨卡病毒（to combat the Zika virus）”，第二句紧接着用地点定语从句说明为什么恰好在多彻斯特县（Dorchester County）执行这一行动——因为该地区已确诊了4例与旅行相关的寨卡病例（four travel-related cases of Zika disease have been confirmed in the area）。选项 B 将 four 泛化为 Several，将 confirmed 同义替换为 identified，精准契合原因所在。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "人们担心蜜蜂的数量问题。",
        "verdict": "wrong",
        "reason": "与事实因果倒置。蜜蜂大量死亡是喷洒行动造成的意外后果（accidental mass killing），并非开展喷洒作业之前的原因。"
      },
      {
        "key": "B",
        "zh": "当地已经发现并确诊了几例寨卡病例。",
        "verdict": "correct",
        "reason": "精准对应原文第二句：four travel-related cases of Zika disease have been confirmed 同义替换为 Several cases of Zika disease had been identified。"
      },
      {
        "key": "C",
        "zh": "有200万只蜜蜂感染了这种疾病。",
        "verdict": "wrong",
        "reason": "原词拼接与张冠李戴。原文说的是喷洒行动导致超过200万只蜜蜂死亡（left more than 2 million bees dead），而不是蜜蜂感染了寨卡病毒。"
      },
      {
        "key": "D",
        "zh": "寨卡病毒摧毁了一些养蜂场。",
        "verdict": "wrong",
        "reason": "偷换施动者。原文提到蜜蜂农场主表示农场看起来像是被毁了（looks like it has been destroyed），这是因为灭蚊喷雾误杀了蜜蜂，而非寨卡病毒本身毁掉了养蜂场。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "four travel-related cases of Zika disease",
        "to": "Several cases of Zika disease",
        "note": "具体数字模糊化替换：听力原文给出精确病例数 four（四例），正确选项将其概括为模糊数量词 Several（几例），同时省去限定词 travel-related。"
      },
      {
        "from": "have been confirmed",
        "to": "had been identified",
        "note": "近义动词与时态微调：原文“已被证实/确诊（confirm）”在选项中替换为“已被识别/确认（identify）”，并用过去完成时照应题干的过去时态。"
      }
    ],
    "steps": [
      "听前预读：四项均为完整句子且高频出现 bees 与 Zika，预判考查“行动原因”或“事故后果”，留意因果关系与施动者。",
      "听中抓句：听到第一句 to combat the Zika virus 明确喷洒总目标，紧盯第二句 Dorchester County 后的 where 从句，锁定 four ... cases ... confirmed。",
      "听后排雷：果断避开 C 项“200万只蜜蜂染病”的拼凑陷阱和 D 项“病毒毁掉蜂场”的因果错位，确认 several cases 对应 four cases 后选 B。"
    ],
    "pitfall": "C 项是四级听力最典型的“原词混搭陷阱”：故意将你耳朵听到的 2 million bees 和 Zika disease 拼在一起，诱导没理清句子主谓宾的同学误选。",
    "vocabHighlights": [
      {
        "word": "combat",
        "meaning": "v. 抗击，防治，与……斗争；新闻中常搭配 virus、crime、poverty。"
      },
      {
        "word": "confirm",
        "meaning": "v. 确认，证实，确诊；听力中常与 identify、verify 发生同义替换。"
      },
      {
        "word": "travel-related",
        "meaning": "adj. 与旅行相关的；复合形容词，指输入性病例。"
      },
      {
        "word": "accidental",
        "meaning": "adj. 意外的，偶然的，非故意的；名词形式为 accident。"
      }
    ]
  },
  "q_lis_03": {
    "stemZh": "是什么原因导致美国政府放弃将“天空登陆者10号”用作侦察机？",
    "evidenceZh": "它最初是作为远程侦察机为美国政府研制的，但在预算削减之后被放弃了。",
    "why": "新闻先介绍了“天空登陆者10号”首飞的时间、高度和巨大体型，随后在中段交代它的研发身世时出现了强转折信号词 but：“它最初是作为远程侦察机为美国政府研发的，但在预算削减后被放弃（but was abandoned following budget cutbacks）”。这里的 budget cutbacks（预算削减）直接说明美国政府是因为没钱、资金跟不上才叫停该项目，在选项中被抽象概括为 C 项 Inadequate funding（资金不足）。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "工程技术问题。",
        "verdict": "wrong",
        "reason": "原文未提及。新闻仅在结尾提到该飞行器还需累积200小时飞行时间才能获批，并未提及为美方研发期间出现任何工程故障。"
      },
      {
        "key": "B",
        "zh": "它所产生的空气污染。",
        "verdict": "wrong",
        "reason": "与原文完全相反。后文明确说明该飞行器比大型喷气机噪音更低、排放的污染更少（emitting less pollution），不可能因污染被放弃。"
      },
      {
        "key": "C",
        "zh": "资金不足。",
        "verdict": "correct",
        "reason": "精准同义替换原文转折句中的 following budget cutbacks（随着预算削减），预算被砍即意味着项目资金不足。"
      },
      {
        "key": "D",
        "zh": "来自军方的反对。",
        "verdict": "wrong",
        "reason": "属于主观臆测，原文未提。虽然侦察机与政府相关，但新闻自始至终没有提到军方人员对该项目表示反对。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "following budget cutbacks",
        "to": "Inadequate funding",
        "note": "具体财经词汇向抽象状态词转化：budget cutbacks（预算削减）是政府经费减少的具体措施，选项将其概括为状态短语 Inadequate funding（资金不足）。"
      },
      {
        "from": "was abandoned",
        "to": "abandon the Airlander 10",
        "note": "语态还原：原文以飞行器为主语使用被动语态 was abandoned，题干以美国政府（US government）为施动者恢复为主动结构。"
      }
    ],
    "steps": [
      "听前预读：四个选项都是简短的原因名词短语（工程问题 / 污染 / 资金不足 / 军方反对），提前在心里把 Inadequate funding 关联到 budget / money / cost。",
      "听中抓信号：前两句介绍飞行高度和尺寸时保持耐心，听到 US government 和 spy aircraft 时立刻集中注意力，紧盯转折词 but 和动词 abandoned。",
      "听后核对：确认 following budget cutbacks 表达“因预算削减而放弃”，排除与后文 less pollution 相悖的 B 项和无依据的 A、D 项，锁定 C。"
    ],
    "pitfall": "很多同学只认识 funding，却没在瞬间把听到的 budget cutbacks（预算削减）反应成“资金不足”，平时复习要养成按主题归类同义词的习惯。",
    "vocabHighlights": [
      {
        "word": "abandon",
        "meaning": "v. 放弃，中止，抛弃；四级听力及阅读高频核心动词。"
      },
      {
        "word": "budget cutbacks",
        "meaning": "名词短语，预算削减；常在听力中被替换为 inadequate funding 或 lack of money。"
      },
      {
        "word": "spy aircraft",
        "meaning": "名词短语，侦察机；其中 spy 可作名词“间谍”或动词“暗中监视”。"
      },
      {
        "word": "inadequate",
        "meaning": "adj. 不充分的，不足的；前缀 in- 表否定，反义词为 adequate。"
      }
    ]
  },
  "q_lis_04": {
    "stemZh": "与巨型喷气式飞机相比，“天空登陆者10号”有什么优势？",
    "evidenceZh": "这架飞行器造价2500万英镑，比巨型喷气式飞机能承载更重的货物，同时产生更少的噪音并排放更少的污染。",
    "why": "新闻在说明该飞行器被美方放弃的经过后，紧接着用比较结构介绍其性能优势：“它比巨型喷气式飞机（than huge jet planes）能搭载更重货物，同时（while also）产生的噪音更少、排放的污染更少（producing less noise and emitting less pollution）”。听力选项没有照搬载重或噪音的原词，而是将“低噪音、低污染”这两项环保特质高度概括为 D 项的“更环保（more environmentally friendly）”。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "它采用了最新的航空技术。",
        "verdict": "wrong",
        "reason": "过度推断，原文未提。新闻只说它是目前世界上最大的飞行器并完成了首飞，并未比较它与喷气机的航空技术新旧。"
      },
      {
        "key": "B",
        "zh": "它的飞行速度比商用喷气式飞机更快。",
        "verdict": "wrong",
        "reason": "原文未提速度对比。文中提到了续航可达五天（up to five days）及首飞时长，但完全没有与商用喷气机比较飞行速度。"
      },
      {
        "key": "C",
        "zh": "它是一种更安全的交通工具。",
        "verdict": "wrong",
        "reason": "偷换概念。原文第二句仅提到它在安全区域（safe area）进行了一系列平缓转弯，并没有说它比喷气式飞机更安全。"
      },
      {
        "key": "D",
        "zh": "它更加环保。",
        "verdict": "correct",
        "reason": "精准概括原文细节：producing less noise and emitting less pollution（噪音更小、污染排放更少）正是“对环境更友好（more environmentally friendly）”的具体体现。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "producing less noise and emitting less pollution",
        "to": "more environmentally friendly",
        "note": "具体细节向抽象属性概括：原文列出两项具体低能耗指标（更少噪音、更少污染），选项合并提炼为上位概念“更环保”。"
      },
      {
        "from": "than huge jet planes",
        "to": "over huge jet planes",
        "note": "比较介词替换：原文在比较级 heavier 后用 than 引出参照物，题干在名词 advantage 后搭配介词 over 表示“胜过……的优势”。"
      }
    ],
    "steps": [
      "听前预读：四项主语均为 It 且带有比较级意味（latest / faster / safer / more environmentally friendly），预判考查对比优势，重点关注比较连词 than。",
      "听中定位：听到 huge jet planes 时竖起耳朵，完整记下对比的三个方面：heavier loads（载重更大）、less noise（噪音更小）、less pollution（污染更少）。",
      "听后对应：发现选项中没有提及载重，于是把 less noise 与 less pollution 合并归纳为“环保”，排除速度、安全等未提及维度，选定 D。"
    ],
    "pitfall": "四级新闻非常喜欢考“具体表现 -> 抽象概括”的转换：听到 less noise 和 less pollution 时不要苦等原词，要主动向 environmentally friendly / green 靠拢。",
    "vocabHighlights": [
      {
        "word": "emit",
        "meaning": "v. 排放，散发（气体、光、热等）；名词形式为 emission（排放物）。"
      },
      {
        "word": "environmentally friendly",
        "meaning": "形容词短语，环保的，对环境友好的；常用于替换 less pollution、green。"
      },
      {
        "word": "load",
        "meaning": "n. 负荷，载重量；v. 装载；heavy load 意为重负载。"
      },
      {
        "word": "aviation",
        "meaning": "n. 航空，航空业；常见搭配 aviation administration（航空管理局）。"
      }
    ]
  },
  "q_lis_05": {
    "stemZh": "是什么拖慢了麦当劳免下车点餐通道的服务速度？",
    "evidenceZh": "在服务变慢的诸多原因中，如今菜单上的选择增多了，而且产品本身更加复杂，需要更长时间来准备。",
    "why": "新闻开头指出麦当劳的免下车点餐（drive-through）创下十五年来最慢纪录，随后中段使用极为清晰的因果信号短语 Among the reasons for the slower service（在服务变慢的原因之中）直接揭晓答案：如今菜单上的选择更多（more choices on the menu），并且产品本身更复杂、制作耗时更长。其中“菜单选择增多”在选项 C 中被同义改写为 Increased variety of products（产品种类的增加）。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "顾客的要求变得更高了。",
        "verdict": "wrong",
        "reason": "曲解结尾信息。原文结尾仅提到消费者希望订单制作准确（want their orders prepared correctly），且准确率依然很高，并未说顾客要求苛刻导致变慢。"
      },
      {
        "key": "B",
        "zh": "员工的工作效率低下。",
        "verdict": "wrong",
        "reason": "原文未提员工低效。结尾反而肯定了餐厅出餐准确度依然很高（accuracy is still really high），把速度变慢归因于员工属于无中生有。"
      },
      {
        "key": "C",
        "zh": "产品种类的增加。",
        "verdict": "correct",
        "reason": "精准对应因果句中的 more choices on the menu（菜单上选择更多），more 对应 Increased，choices 对应 variety of products。"
      },
      {
        "key": "D",
        "zh": "顾客数量的不断上升。",
        "verdict": "wrong",
        "reason": "原文未提及客流量变化。文中只提到免下车业务占快餐店总营业额的60%到70%，并没有说顾客人数上升导致排队变慢。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "more choices on the menu",
        "to": "Increased variety of products",
        "note": "具体场景表达向书面商业表达转换：“菜单上选择更多”改写为“产品多样性增加”（more -> Increased, choices -> variety of products）。"
      },
      {
        "from": "Among the reasons for the slower service",
        "to": "What has slowed down",
        "note": "因果信号对应：原文用名词短语“变慢的原因”引出答案句，直接呼应题干“是什么拖慢了……”的提问。"
      }
    ],
    "steps": [
      "听前预读：四项均为导致变慢的名词性原因（顾客要求高 / 员工低效 / 产品种类多 / 顾客数增加），提前准备捕捉原因信号词。",
      "听中抓句：前两句交待平均等待时长（3分09秒）后不要走神，一听到 Among the reasons for the slower service 立刻聚焦其后的 more choices on the menu。",
      "听后排雷：将 more choices on the menu 转化为 Increased variety of products，同时确认末尾提到的 accuracy 并非导致变慢的原因，选定 C。"
    ],
    "pitfall": "听到结尾消费者希望订单准确（prepared correctly）时，千万不要脑补成 A 项“顾客要求变高”。因果关系一定要锁定在 Among the reasons 这一句内部。",
    "vocabHighlights": [
      {
        "word": "drive-through",
        "meaning": "n./adj. 免下车服务通道（餐厅或银行）；四级新闻生活类高频词。"
      },
      {
        "word": "variety",
        "meaning": "n. 多样性，种类；a variety of 意为“各种各样的”，常替换 choices、types。"
      },
      {
        "word": "account for",
        "meaning": "动词短语，占（一定比例），或解释……的原因。"
      },
      {
        "word": "accuracy",
        "meaning": "n. 准确度，精确性；形容词为 accurate。"
      }
    ]
  },
  "q_lis_06": {
    "stemZh": "法国修建“瓦特之路”（太阳能公路）的目的是什么？",
    "evidenceZh": "上周法国宣布，未来五年将在621英里的道路上铺设太阳能电池板，目标是为500万人提供廉价的可再生能源。",
    "why": "新闻导语首句用极具标志性的目的介词短语 with the goal of（以……为目标）直接点明法国修建太阳能公路“瓦特之路”的初衷：为500万人提供廉价的可再生能源（providing cheap, renewable energy to five million people）。在选项 B 中，核心动宾结构 Providing ... to five million people 几乎完整保留，仅把“可再生能源（renewable energy）”同义替换为四级常见表达“清洁能源（clean energy）”。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "测试新型太阳能电池板的效率。",
        "verdict": "wrong",
        "reason": "原文未作为目的提及。文中只介绍研发人员过去五年研制出四分之一英寸厚且耐磨耐压的电池板，并未说修建公路是为了测试电池板效率。"
      },
      {
        "key": "B",
        "zh": "为500万人提供清洁能源。",
        "verdict": "correct",
        "reason": "与首句目的状语 with the goal of providing cheap, renewable energy to five million people 完全一致，renewable energy 同义替换为 clean energy。"
      },
      {
        "key": "C",
        "zh": "为过往车辆发电。",
        "verdict": "wrong",
        "reason": "属于脱离原文的常识脑补。文中提到电池板能承受重型高速公路交通（heavy highway traffic），但并没有说发出的电是专门供给过往车辆使用的。"
      },
      {
        "key": "D",
        "zh": "寻找更便宜的公路修建方式。",
        "verdict": "wrong",
        "reason": "原词错位偷换。原文中的 cheap 修饰的是提供的能源价格低廉以及电池板易于直接铺设在现有路面上，而不是为了研究更省钱的修路方式。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "renewable energy",
        "to": "clean energy",
        "note": "同领域高频概念替换：renewable energy（可再生能源，如太阳能）在听力选项中常改写为性质相近的 clean energy（清洁能源）。"
      },
      {
        "from": "with the goal of",
        "to": "purpose of",
        "note": "目的信号词对接：原文用介词短语 with the goal of 引出行动目标，精准对应题干询问的目的（purpose）。"
      },
      {
        "from": "providing cheap, renewable energy to five million people",
        "to": "Providing clean energy to five million people",
        "note": "核心结构保留与删繁就简：选项略去了形容词 cheap，完整保留了动作、受众数字 five million people 与核心宾语。"
      }
    ],
    "steps": [
      "听前预读：四项均为动名词短语，结构高度相似（Testing / Providing / Generating / Finding），预判考查工程目的，第一句即重中之重。",
      "听中定位：在新闻第一句听到 with the goal of 后立即抓取其后的核心信息：providing ... renewable energy to five million people。",
      "听后核验：确认数字 five million people 与 clean energy 一一对应，警惕 D 项对 cheap 的错误嫁接，稳选 B。"
    ],
    "pitfall": "听到原文出现 cheap 和 roadway 就草率选 D 是典型失误！一定要听清 cheap 修饰的是 renewable energy，而修路只是借助现有路面安装（install），并非为了寻找更便宜的修路方法。",
    "vocabHighlights": [
      {
        "word": "pave",
        "meaning": "v. 铺设（道路、地面）；pave ... with ... 意为“用……铺设……”。"
      },
      {
        "word": "renewable energy",
        "meaning": "名词短语，可再生能源；四级环保与科技新闻核心词汇，常与 clean energy 互换。"
      },
      {
        "word": "stand up to",
        "meaning": "动词短语，经受得住，抵御（磨损、压力等）。"
      },
      {
        "word": "joint effort",
        "meaning": "名词短语，共同努力，联合协作。"
      }
    ]
  },
  "q_lis_07": {
    "stemZh": "是什么使得在苏丹和埃塞俄比亚偏远地区调查狮子变得困难？",
    "evidenceZh": "该地区持续不断的战乱使调查工作变得困难。但科学家们周一发布了一份报告，用确凿证据记录了失踪狮群的发现。",
    "why": "新闻第一句引出科学家好奇狮子是否仍在苏丹和埃塞俄比亚偏远地区存活，紧接着第二句正面回答了调研的障碍所在：“该地区持续不断的战乱使得调查变得困难（Continuous fighting in the region has made surveys difficult）”。其中形容词 Continuous（持续不断的）在选项 C 中被同义替换为近义词 Endless（无休止的），其余核心词 fighting in the region 保持不变。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "缺乏关于这一物种的线索。",
        "verdict": "wrong",
        "reason": "原文未提缺少线索。后文提到研究人员架设红外相机拍到了狮子画面，还辨认出了狮子足迹（lion tracks），找到了确凿证据。"
      },
      {
        "key": "B",
        "zh": "研究经费不足。",
        "verdict": "wrong",
        "reason": "与原文支持情况相反或未提及。第三句提到牛津大学团队得到了一个慈善机构的资助（supported by a charity organization），文中从未说缺乏经费。"
      },
      {
        "key": "C",
        "zh": "该地区无休止的战乱。",
        "verdict": "correct",
        "reason": "与第二句主干完全一致：Continuous fighting in the region has made surveys difficult，Continuous 同义替换为 Endless。"
      },
      {
        "key": "D",
        "zh": "来自沙漠的危险。",
        "verdict": "wrong",
        "reason": "主观臆测，原文未提。文中提到研究地点位于埃塞俄比亚西北部的国家公园，全文只字未提沙漠（desert）及其危险。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "Continuous fighting in the region",
        "to": "Endless fighting in the region",
        "note": "同义形容词替换：原文表示“持续不断的”形容词 Continuous 替换为意义相近的 Endless（没完没了的、无休止的）。"
      },
      {
        "from": "has made surveys difficult",
        "to": "made it difficult to survey",
        "note": "句法结构转换：原文“make + 名词宾语 + 形容词宾补”在题干中转换为形式宾语结构“make it + 形容词 + 不定式”。"
      }
    ],
    "steps": [
      "听前预读：四项均为客观阻碍因素（缺线索 / 缺经费 / 战乱 / 沙漠危险），重点听开头提出地名 Sudan and Ethiopia 之后紧跟的困难描述。",
      "听中定位：第二句一开头出现 Continuous fighting in the region has made surveys difficult，迅速抓住主语 Continuous fighting。",
      "听后排雷：将 Continuous 匹配到 Endless，并核对 B 项有慈善机构资助、D 项沙漠未提及，直接确定 C。"
    ],
    "pitfall": "看到非洲国家苏丹、埃塞俄比亚，千万别凭借地理刻板印象脑补 D 项“沙漠危险”，野生动物调查新闻的正确答案必须紧扣录音里的实词。",
    "vocabHighlights": [
      {
        "word": "continuous",
        "meaning": "adj. 连续的，持续不断的；听力中常与 endless、constant 互换。"
      },
      {
        "word": "survey",
        "meaning": "n./v. 调查，勘测，测绘；注意区分名词和动词词性。"
      },
      {
        "word": "hard evidence",
        "meaning": "名词短语，确凿的证据，铁证。"
      },
      {
        "word": "track",
        "meaning": "n. 足迹，踪迹；v. 追踪，监测。"
      }
    ]
  },
  "q_lis_08": {
    "stemZh": "一些家长的担忧是什么？",
    "evidenceZh": "然而，一些家长担心这会鼓励他们的孩子乱扔垃圾，好看着鸟儿去捡。",
    "why": "新闻前半段一直在正面介绍法国一家历史主题公园训练白嘴鸦捡垃圾以普及环保理念，且游客反响兴奋。但到了倒数第二段，标志性转折词 However 出现，直接引出了题干询问的家长立场：“然而，一些家长担心这会促使孩子乱扔垃圾（encourages their children to drop litter），这样他们就能看鸟把垃圾捡起来”。选项 B 用被动形式“可能会被诱使乱扔垃圾（may be tempted to drop litter）”精准转述了这一担忧。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "孩子可能会被白嘴鸦弄伤。",
        "verdict": "wrong",
        "reason": "原文未提及。新闻中提到白嘴鸦很聪明且愿意与人类玩耍互动，从未提到鸟类会攻击或伤害儿童。"
      },
      {
        "key": "B",
        "zh": "孩子可能会受到诱惑而故意乱扔垃圾。",
        "verdict": "correct",
        "reason": "与 However 转折句高度一致：encourages their children to drop litter 同义改写为 Children may be tempted to drop litter。"
      },
      {
        "key": "C",
        "zh": "孩子可能会感染禽类传染病。",
        "verdict": "wrong",
        "reason": "属于脱离文本的常识臆测，原文只字未提任何疾病或健康隐患。"
      },
      {
        "key": "D",
        "zh": "孩子可能会过度喂食白嘴鸦。",
        "verdict": "wrong",
        "reason": "张冠李戴与曲解细节。原文说鸟每放进一点垃圾，小盒子（a small box）就会自动吐出少量鸟食（bird food），并非孩子直接手喂。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "encourages their children to drop litter",
        "to": "Children may be tempted to drop litter",
        "note": "主被动转换与情绪动词替换：原文主动态“促使/鼓励孩子乱扔垃圾”改写为以孩子为主语的被动推测“孩子可能会被诱使去乱扔垃圾”（encourage -> tempt）。"
      },
      {
        "from": "some parents are concerned",
        "to": "the concern of some parents",
        "note": "词性转换：形容词短语 are concerned（担心的）在题干中转换为名词短语 the concern（担忧）。"
      }
    ],
    "steps": [
      "听前预读：四项主语均为 Children may ... 且全是负面担忧（被弄伤 / 乱扔垃圾 / 染病 / 过度喂食），听音时注意捕捉从正面赞扬转向负面担忧的转折点。",
      "听中定位：在听完鸟类投食盒机制以及游客很兴奋（excited）之后，听到 However, some parents are concerned 立刻全神贯注，抓住 drop litter。",
      "听后排雷：警惕利用前文 bird food 编造的 D 项“过度喂食”，确认 tempt 对应原文 encourage，选定 B。"
    ],
    "pitfall": "D 项故意借用前文出现的 bird food 制造“喂鸟过多”的假象，做题时切忌脱离“家长担忧句”去向前文凑细节。",
    "vocabHighlights": [
      {
        "word": "tempt",
        "meaning": "v. 诱惑，诱使；be tempted to do 意为“动心想做某事、受到诱惑去做某事”。"
      },
      {
        "word": "drop litter",
        "meaning": "动词短语，乱扔垃圾；其中 litter 不可数，与 rubbish、trash 同义。"
      },
      {
        "word": "deposit",
        "meaning": "v. 放下，投入，存放；n. 押金，存款。"
      },
      {
        "word": "criticism",
        "meaning": "n. 批评，指责；动词为 criticize。"
      }
    ]
  },
  "q_lis_09": {
    "stemZh": "女士如何看待气候变化（这一话题）？",
    "evidenceZh": "嗯，那听起来真糟糕。我同意那是个重要的话题，但我实在没心情看任何令人沮丧的东西。",
    "why": "长对话围绕今晚出门看什么展开。男士提议去看一部关于气候变化的电影，女士先表示不感兴趣（not really / doesn't really appeal to me）。当男士解释电影讲述气候变化如何影响日常生活后，女士采用了四级听力极其经典“先让步后转折”的表达方式：“我同意那是个重要话题（It's an important subject, I agree），但我现在没心情看任何令人沮丧的内容（but I'm not in the mood for anything depressing）。”核心形容词 depressing 直接说明她觉得这是一个令人沮丧的话题，对应 A 项。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "它似乎是一个令人沮丧的话题。",
        "verdict": "correct",
        "reason": "精准对应女士原话：subject 替换为 topic，not in the mood for anything depressing 体现她把该话题视为 depressing topic。"
      },
      {
        "key": "B",
        "zh": "它听起来相当令人担忧（危言耸听）。",
        "verdict": "wrong",
        "reason": "情绪形容词偷换。女士明确用的词是 awful（糟糕）和 depressing（令人沮丧的），并没有表达 alarming（令人惊恐/警觉的）。"
      },
      {
        "key": "C",
        "zh": "它对我们的日常生活几乎没有影响。",
        "verdict": "wrong",
        "reason": "借用男士原词反向篡改。男士说电影讲的是气候变化如何影响日常生活（affects everyday life），而不是“几乎没有影响（little impact）”。"
      },
      {
        "key": "D",
        "zh": "如今它正变得越来越严重。",
        "verdict": "wrong",
        "reason": "脱离对话的常识推断，对话中两位说话人并未探讨气候变化当前是否正在加剧。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "an important subject",
        "to": "topic",
        "note": "同义名词替换：表示“主题、议题”的 subject 在选项中改写为更常用的 topic。"
      },
      {
        "from": "not in the mood for anything depressing",
        "to": "It seems a depressing topic",
        "note": "态度隐含向直接评价转换：说话人用“没心情看令人沮丧的东西”婉拒，选项将其直接概括为“它似乎是个令人沮丧的话题”。"
      }
    ],
    "steps": [
      "听前预读：四项主语均为 It 且均为评价陈述，锁定题干问的是 the woman 对 climate change 的看法，听音重点落到女士话语。",
      "听中定位：男士说完 affects everyday life 后，听女士回应中的转折结构 I agree, but ...，抓住关键情绪形容词 depressing。",
      "听后排雷：排除借用男士 everyday life 并加上否定词 little 的 C 项，核对 subject -> topic 的对应后选定 A。"
    ],
    "pitfall": "在长对话中遇到 I agree, but ... 或 It's important, but ... 时，前面的让步永远只是客套铺垫，转折词 but 后面的形容词才是真正考向。",
    "vocabHighlights": [
      {
        "word": "appeal to",
        "meaning": "动词短语，吸引，引起兴趣；常见于表达对某活动或电影是否感兴趣。"
      },
      {
        "word": "in the mood for",
        "meaning": "介词短语，有心情做某事；not in the mood for sth 意为“没心情做某事”。"
      },
      {
        "word": "depressing",
        "meaning": "adj. 令人沮丧的，令人消沉的；注意区分 depressed（感到沮丧的）。"
      },
      {
        "word": "alarming",
        "meaning": "adj. 令人担忧的，惊人的；四级态度题常见干扰词或替换词。"
      }
    ]
  },
  "q_lis_10": {
    "stemZh": "两位说话人为什么放弃今晚去参加西班牙舞蹈节？",
    "evidenceZh": "嗯，那不行。我们没有足够的时间赶到那里了。还有别的节目吗？",
    "why": "在否决了气候变化电影之后，男士接着推荐了西班牙舞蹈节。女士起初兴致勃勃，明确说自己非常喜欢舞蹈（Oh, I love dance. That sounds really interesting）。但当她追问演出时间（What time is it on?）并得知晚上七点半（At 7:30）开始时，她立刻否决道：“那不行，我们没有足够的时间赶到那里了（We haven't got enough time to get there）”，并紧接着询问还有没有其他节目。这说明两人放弃前往的原因是时间来不及，对应 D 项的地道习语表达 can't make it to the theatre in time。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "男士听不懂西班牙语。",
        "verdict": "wrong",
        "reason": "无中生有。虽然演出是西班牙《卡门》故事，但对话中从未提及男士不懂西班牙语或语言障碍。"
      },
      {
        "key": "B",
        "zh": "女士其实并不太喜欢跳舞。",
        "verdict": "wrong",
        "reason": "与对话事实完全相反。女士听到舞蹈节时非常开心，明确表示“我喜欢舞蹈，听起来很有趣（I love dance）”。"
      },
      {
        "key": "C",
        "zh": "他们不想看太吵闹的演出。",
        "verdict": "wrong",
        "reason": "原文未提及。对话没有提到西班牙舞蹈节吵闹或两人嫌吵的内容。"
      },
      {
        "key": "D",
        "zh": "他们无法及时赶到剧院。",
        "verdict": "correct",
        "reason": "精准同义替换：女士说的 We haven't got enough time to get there（没有足够时间赶过去）正是 can't make it to the theatre in time。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "haven't got enough time to get there",
        "to": "can't make it to the theatre in time",
        "note": "高频口语习语同义替换：直白表达“没有足够时间到达那里”改写为“无法及时赶到剧院”（make it 意为按时抵达、办成）。"
      },
      {
        "from": "that's no good",
        "to": "give up going to",
        "note": "语境动作概括：女士听到时间后说“那不行”并接着问其他节目，直接体现出“放弃前往该活动”。"
      }
    ],
    "steps": [
      "听前预读：四项为不同拒绝原因（不懂语言 / 不喜欢跳舞 / 太吵 / 赶不上时间），听音时注意问答推进与女士的态度转折。",
      "听中排除与定位：听到女士说 Oh, I love dance 立刻划掉相反项 B；接着紧盯时间问答 What time -> At 7:30 -> We haven't got enough time to get there。",
      "听后对应：把 haven't got enough time to get there 转化为地道短语 can't make it ... in time，稳选 D。"
    ],
    "pitfall": "若不熟悉地道口语习语 make it（按时到达、赶上），听到没时间赶过去时可能会犹豫是否选 D；此外听见 Spanish 就脑补 A 项语言问题也是常见错误。",
    "vocabHighlights": [
      {
        "word": "make it in time",
        "meaning": "动词短语，及时赶到，按时到达；make it 还可表示“获得成功、约定时间”。"
      },
      {
        "word": "be on",
        "meaning": "动词短语，上演，放映，播出；What's on? 常用于询问电影院或剧院有什么节目。"
      },
      {
        "word": "production",
        "meaning": "n. 戏剧或影视作品，制作；不仅指工业生产，文娱语境常考“演出剧目”。"
      },
      {
        "word": "apparently",
        "meaning": "adv. 据说，显然，看样子；常用于引述报纸或他人评价。"
      }
    ]
  },
  "q_lis_11": {
    "stemZh": "凯瑟琳为什么感到焦虑？",
    "evidenceZh": "我对转到咱们学院感到很焦虑。我怕自己融不进去。",
    "why": "长对话一开场，女学生凯瑟琳向李老师请求耽误一分钟时间，李老师问她有什么可以帮忙（What can I do for you?）。凯瑟琳随即直截了当地说明了自己焦虑的直接原因：“我对转到咱们学院感到十分焦虑，我担心自己无法融入（I'm quite anxious about transferring over to our college. I'm afraid I won't fit in）。”后文她还补充自己比同年级大多数学生年纪小。D 项完整准确地转述了她“作为转学生担心自己融不进去”的核心困扰。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "她的大多数同学都比她年纪小。",
        "verdict": "wrong",
        "reason": "主客比较级完全颠倒。女士在对话末尾说的是 I'm younger than most students（我比多数同学小），而 A 项说反成了“多数同学比她小”。"
      },
      {
        "key": "B",
        "zh": "她压根不知道该转去哪所学校。",
        "verdict": "wrong",
        "reason": "与事实状态不符。女士说的是对“转到咱们学院（transferring over to our college）”感到焦虑，可见学校已确定，并非不知道去哪所。"
      },
      {
        "key": "C",
        "zh": "活动太多了，她应付不过来。",
        "verdict": "wrong",
        "reason": "原文未提。文中提到她担心融入问题，但并未抱怨活动过多、应付不过来。"
      },
      {
        "key": "D",
        "zh": "她担心作为一名转学生会无法融入新集体。",
        "verdict": "correct",
        "reason": "精准同义转述女士核心句：I'm afraid I won't fit in 对应 She worries she won't fit in，transferring over 对应 as a transfer student。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "transferring over to our college",
        "to": "as a transfer student",
        "note": "动词行为向身份名词转换：把正在经历的转学动作（transferring over）在选项中直接凝练为“作为一名转学生（as a transfer student）”。"
      },
      {
        "from": "I'm afraid I won't fit in",
        "to": "She worries she won't fit in",
        "note": "人称与情绪动词替换：对话中的第一人称委婉担忧 I'm afraid（我怕）转换为客观第三人称陈述 She worries（她担心）。"
      }
    ],
    "steps": [
      "听前预读：四项出现 younger、transfer、activities、fit in 等关键信息，特别留心 A 项中的比较级关系，听音时务必分清谁比谁小。",
      "听中定位：长对话首题通常落在前两轮问答，听到 What can I do for you? 后紧盯女士第一句回答：anxious about transferring ... I'm afraid I won't fit in。",
      "听后排雷：当听到最后一句 I'm younger than most students 时立刻识破 A 项主客颠倒陷阱，果断选 D。"
    ],
    "pitfall": "比较级“主客颠倒”是四级听力最阴险的陷阱之一！A 项利用了原文中的 younger than most students，但把主语调了包，听到比较级一定要反应“谁更小”。",
    "vocabHighlights": [
      {
        "word": "fit in",
        "meaning": "动词短语，融入，适应（新团体或新环境）；校园对话高频短语。"
      },
      {
        "word": "transfer",
        "meaning": "v./n. 转学，转移，调动；transfer student 意为“转校生”。"
      },
      {
        "word": "anxious",
        "meaning": "adj. 焦虑的，担心的；be anxious about 对……感到焦虑。"
      },
      {
        "word": "cope with",
        "meaning": "动词短语，应付，处理（困难或复杂局面）；与 deal with 近义。"
      }
    ]
  },
  "q_lis_12": {
    "stemZh": "李老师鼓励凯瑟琳做什么？",
    "evidenceZh": "我们有很多你可以参加的课外活动。而且通过这种方式，你就能结识不同年龄段的新朋友。",
    "why": "紧接着上一段对话中凯瑟琳倾诉自己比同年级大多数学生小、担心难融入，李老师用“让步+转折（may be ... but ...）”的经典建议句型开导她：“也许你是同年级里唯一年纪小一点的，但你知道，我们有很多你可以参加的课外活动（after-school activities you can join in）。这样一来，你就能认识不同年龄段的新朋友。”其中“参加课外活动（after-school activities you can join in）”在选项 C 中被同义替换为 Participate in after-school activities。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "向高年级学长学姐寻求建议。",
        "verdict": "wrong",
        "reason": "原文未提及。李老师只说可以通过活动结识不同年龄段的朋友，且说凯瑟琳随时可以来找自己（come to me）求助，并未让她找高年级学生。"
      },
      {
        "key": "B",
        "zh": "培养一些有意义的爱好。",
        "verdict": "wrong",
        "reason": "说话人与动词张冠李戴。hobby groups（兴趣小组）是凯瑟琳自己接话时说“我喜欢游戏和兴趣小组”，并不是老师劝她“重新培养（pick up）”爱好。"
      },
      {
        "key": "C",
        "zh": "参加课外活动。",
        "verdict": "correct",
        "reason": "精准同义替换李老师的原话：after-school activities you can join in 对应 Participate in after-school activities。"
      },
      {
        "key": "D",
        "zh": "去调查了解学校提供哪些条件。",
        "verdict": "wrong",
        "reason": "动词含义偷换。李老师结尾说的是“尽量充分利用（make the most of）我们这里提供的资源”，而非“去调查了解（look into）”。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "after-school activities you can join in",
        "to": "Participate in after-school activities",
        "note": "短语动词同义升级：将定语从句中的口语短语 join in（加入、参加）提前并替换为较正式的及物搭配 Participate in（参与）。"
      },
      {
        "from": "you may be the only younger one in your year, but, you know, we have a lot of",
        "to": "encourage Catherine to do",
        "note": "功能句式提炼：老师先用 may be ... but 消解学生的顾虑，随后告知可供参加的校园资源，实质上就是在鼓励学生行动。"
      }
    ],
    "steps": [
      "听前预读：四项均为动词原形开头的建议（求建议 / 培养爱好 / 参加课外活动 / 调查了解），注意区分建议是由 Mr. Lee 提出还是学生自己说出。",
      "听中定位：在凯瑟琳说完“担心年纪小”后，紧盯李老师话语中的转折信号词 but，抓出核心短语 after-school activities you can join in。",
      "听后排雷：不要把后面女士说的 hobby groups 当成 B 项的培养爱好，也不要把 make the most of 误听成 D 项的 look into，稳选 C。"
    ],
    "pitfall": "D 项非常具有迷惑性，很多同学听到 what we have on offer 就容易滑向 D，却忽略了前面的动词是 make the most of（充分利用），而不是 look into（调查）。",
    "vocabHighlights": [
      {
        "word": "participate in",
        "meaning": "动词短语，参加，参与；听力高频同义替换 join in、take part in。"
      },
      {
        "word": "pick up",
        "meaning": "动词短语，培养（习惯/爱好）、学会、接某人或捡起；一词多义需结合语境。"
      },
      {
        "word": "make the most of",
        "meaning": "动词短语，充分利用；不可与 look into（调查）混淆。"
      },
      {
        "word": "look into",
        "meaning": "动词短语，调查，研究，审查。"
      }
    ]
  },
  "q_lis_13": {
    "stemZh": "这家健身房开业时提供什么优惠？",
    "evidenceZh": "此外，如果我们在周五前一起报名，还可以享受半年会员的折扣。",
    "why": "女士邀约大卫下午一起去新开业的健身房，随后详细念出了邀请函上写着的两项开业福利：第一项是开业第一天可以免费带一位朋友（free on the first day）；第二项用递进词 Also 引出：如果两人都在周五前报名，就能享受半年期会员折扣（get a discount on a six-month membership）。B 项偷偷把“第一天免费”篡改为“第一周免费”，只有 C 项把 six-month 等值换算为 half-year，完全符合原文事实。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "专业的私人教练指导。",
        "verdict": "wrong",
        "reason": "原文未提及。男士末尾只说自己不确定哪种健身器材（gym equipment）最有效，全文并未提到赠送或提供私人教练（personal training）。"
      },
      {
        "key": "B",
        "zh": "第一周免费锻炼。",
        "verdict": "wrong",
        "reason": "时间单位偷换陷阱。原文明确说邀请函允许“开业第一天免费带一位朋友（free on the first day）”，而不是 B 项所称的“第一周（the first week）”。"
      },
      {
        "key": "C",
        "zh": "半年会员的折扣优惠。",
        "verdict": "correct",
        "reason": "精准对应递进句中的 a discount on a six-month membership，six-month（六个月）等值换算为 half-year（半年）。"
      },
      {
        "key": "D",
        "zh": "为年轻情侣提供的额外福利。",
        "verdict": "wrong",
        "reason": "曲解原意。原文是“我们俩（we both）一起在周五前报名”，指两位朋友同行即可，并没有限定为“年轻情侣（young couples）”。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "a discount on a six-month membership",
        "to": "A discount for a half-year membership",
        "note": "时间单位等值换算：原文以月为单位表达 six-month（六个月的），在正确选项中换算为以年为单位的 half-year（半年的），同时介词 on 调整为 for。"
      },
      {
        "from": "They sent me an invitation with a note saying",
        "to": "does the gym offer",
        "note": "信息来源对应：对话中女士转述健身房寄来的开业邀请函福利，直接回答题干“健身房开业提供什么”。"
      }
    ],
    "steps": [
      "听前预读：四项均为不同形式的福利（私教 / 首周免费 / 半年折扣 / 情侣福利），提前对时间长度 day / week / month / year 保持高度敏感。",
      "听中核对：听到 free on the first day 时立刻对照 B 项发现 day 与 week 不一致，直接划掉 B；紧接着盯住 Also 后的 discount on a six-month membership。",
      "听后换算：完成 six-month 到 half-year 的心理换算，排掉未提及的私教与情侣条件，选定 C。"
    ],
    "pitfall": "听到 free 和 first 就秒选 B 是本题最大失分点！四级生活类长对话尤其爱在时间单位上做手脚，比如把 first day 偷换成 first week，一定要把时间名词听完整。",
    "vocabHighlights": [
      {
        "word": "sign up",
        "meaning": "动词短语，报名，签约参加；健身房、课程或社团招新场景高频短语。"
      },
      {
        "word": "membership",
        "meaning": "n. 会员资格，会籍；注意 suffix -ship 表身份或资格。"
      },
      {
        "word": "tone up",
        "meaning": "动词短语，强身健体，使肌肉结实；健身话题常见口语表达。"
      },
      {
        "word": "discount",
        "meaning": "n. 折扣，优惠；v. 打折；常见搭配 get a discount on。"
      }
    ]
  },
  "q_lis_14": {
    "stemZh": "男士认为对于一名成功的谈判者来说，最重要的事可能是什么？",
    "evidenceZh": "而或许最重要的是，他们懂得何时适可而止。",
    "why": "面对女士的提问“您认为是什么造就了一名成功的谈判者”，男士先采用排比结构一口气列举了成功谈判者的多项共性：有礼貌、理性、坚定而灵活（firm, but flexible）、懂得运用权力、敏锐洞察谈判动态并展现自信。但在所有列举的最后，他抛出了醒目的最高级压轴信号词 And perhaps most importantly，引出最核心的一条：“他们知道何时停止（they know when to stop）”。选项 A 原词精准复现了这一压轴结论。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "他们懂得何时适可而止。",
        "verdict": "correct",
        "reason": "直接匹配最高级信号词 And perhaps most importantly 后的核心短句 they know when to stop。"
      },
      {
        "key": "B",
        "zh": "他们懂得如何适应变化。",
        "verdict": "wrong",
        "reason": "非题干所问的“最重要一点”。男士在前文确实提到谈判者需要 firm, but flexible（坚定但灵活），但那只是一般特征之一，并非用 most importantly 强调的最重要特质。"
      },
      {
        "key": "C",
        "zh": "他们懂得何时作出妥协。",
        "verdict": "wrong",
        "reason": "细节拼凑且未在最核心句出现。男士在列举一般共性及后文论述中未将妥协列为最重要特质，不能用其他次要内容替代压轴答案。"
      },
      {
        "key": "D",
        "zh": "他们懂得如何控制自己的情绪。",
        "verdict": "wrong",
        "reason": "错位关联后文。男士在回答“不成功的谈判者”时提到新手容易过于情绪化（too emotional），但这并不是他在评价成功谈判者时指出的“最重要因素”。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "And perhaps most importantly",
        "to": "may be the most important thing",
        "note": "最高级与推测语气双重对应：原文副词 perhaps（或许）对应题干情态结构 may be，信号词 most importantly 精准呼应 the most important thing。"
      },
      {
        "from": "they know when to stop",
        "to": "They know when to stop",
        "note": "压轴结论原词复现：在前面多项排比铺垫干扰之后，正确答案往往以极简短句在最高级信号词后直接给出。"
      }
    ],
    "steps": [
      "听前预读：四项均为结构整齐的 They know when/how to ...，审题务必圈出限定词 most important，防止听到第一个特征就提前选。",
      "听中克制：男士用排比列举礼貌、理性、灵活等一系列优点时只听不落笔，耐心等待最高级信号词。",
      "听中锁定：当耳边出现 And perhaps most importantly 时立刻抓取紧跟的短句 they know when to stop，直接对应 A 项。"
    ],
    "pitfall": "排比列举题切忌“听到第一个合理选项就匆忙作答”。一旦题干带有 most important / biggest / main 等最高级或核心限定词，答案几乎总在排比列举的最后压轴出现。",
    "vocabHighlights": [
      {
        "word": "negotiator",
        "meaning": "n. 谈判者，磋商者；动词为 negotiate（谈判），名词为 negotiation。"
      },
      {
        "word": "rational",
        "meaning": "adj. 理性的，合理的；反义词为 irrational（不理性的）。"
      },
      {
        "word": "flexible",
        "meaning": "adj. 灵活的，柔韧的，可变通的；名词为 flexibility。"
      },
      {
        "word": "compromise",
        "meaning": "n./v. 妥协，折中；make compromises 意为“作出妥协”。"
      }
    ]
  },
  "q_lis_15": {
    "stemZh": "电视节目《科学国度》在哪些方面会与传统纪录片不同？",
    "evidenceZh": "然而，我们的构想是让它既有趣又有娱乐性，而这是传统纪录片不太具备的。",
    "why": "在节目提案访谈中，男士确认节目形式是否像纪录片（Will the show's format be like that of a documentary?）。女士先肯定了相同点——即它属于非虚构且基于事实（non-fiction and fact-based）的纪实类节目；紧接着用强转折词 However 点明了两者最核心的差异：“然而，我们的想法是让它也变得好玩且富有娱乐性（fun and entertaining），这是传统纪录片没那么具备的特点（something which traditional documentaries aren't so much）。”随后男士还再次复述了 entertaining 予以强化，因此 C 项完全正确。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "它会更有未来感。",
        "verdict": "wrong",
        "reason": "原文未提及。虽然节目探讨各类科学话题，但女士从未说节目风格或内容会比传统纪录片更“有未来感（futuristic）”。"
      },
      {
        "key": "B",
        "zh": "它会更加系统化。",
        "verdict": "wrong",
        "reason": "过度脑补。女士虽提及每集聚焦一个不同的科学领域，且形式基于事实（fact-based），但并未声称比传统纪录片“更系统化（systematic）”。"
      },
      {
        "key": "C",
        "zh": "它会更具娱乐性。",
        "verdict": "correct",
        "reason": "精准概括转折差异：fun and entertaining, something which traditional documentaries aren't so much 即意味着它比传统纪录片 more entertaining。"
      },
      {
        "key": "D",
        "zh": "它会更容易理解。",
        "verdict": "wrong",
        "reason": "原文未提及。对话中没有任何关于节目难度降低、更通俗易懂（easier to understand）的比较表述。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "our idea is for it to be also fun and entertaining, something which traditional documentaries aren't so much",
        "to": "It will be more entertaining",
        "note": "隐性对比向显性比较级转化：原文通过“某物具备某种特质，而传统事物不太具备”完成对比，选项直接提炼为“更+形容词”（more entertaining）。"
      },
      {
        "from": "traditional documentaries aren't so much",
        "to": "differ from traditional documentaries",
        "note": "差异逻辑呼应：转折词 However 后的否定对比（aren't so much）正是题干中“与传统纪录片不同（differ from）”的直接答案依据。"
      }
    ],
    "steps": [
      "听前预读：四项均为比较级预测（更未来感 / 更系统 / 更具娱乐性 / 更易懂），预判题干询问新节目与传统形式的差异之处。",
      "听中等待转折：听到男士发问 like that of a documentary? 时做好准备，先跳过女士阐述共同点的 non-fiction and fact-based，直抓 However 后的 fun and entertaining。",
      "听后印证：男士紧接着总结的 both educational and entertaining 再次巩固答案，排除其他三项臆测词，选定 C。"
    ],
    "pitfall": "当听到女士说每一集讲不同领域且基于事实（fact-based）时，千万不要自作聪明联想成 B 项“更系统化（systematic）”；遇到求异题，务必死等转折词 However 出现。",
    "vocabHighlights": [
      {
        "word": "documentary",
        "meaning": "n. 纪录片；adj. 纪实的，记录的；影视类话题高频词。"
      },
      {
        "word": "entertaining",
        "meaning": "adj. 有娱乐性的，有趣的，使人愉快的；动词为 entertain。"
      },
      {
        "word": "non-fiction",
        "meaning": "n./adj. 非虚构类的，纪实文学或节目。"
      },
      {
        "word": "episode",
        "meaning": "n. （连续剧或电视节目的）一集，插曲。"
      }
    ]
  },
  "q_lis_16": {
    "stemZh": "女士建议男士怎么做？",
    "evidenceZh": "你才是自己唯一应该拿来作比较的人。当你拿现在的自己和起点相比时，就会发现自己已经取得了进步，对吧？",
    "why": "男士在对话中情绪低落，抱怨自己总在追求完美，看到别人取得成就（see others accomplishing things）就难受，总是拼命想和别人一样优秀却达不到。在对话高潮的结尾部分，女士用极具警示性的信号词 Listen（听着）给出了核心建议：“如果你总是拿自己和别人比较，就永远不会觉得自己够好。你才是自己唯一应该拿来比较的人（the only person you should be comparing yourself with）。当你拿当前状态（current status）与起点（starting point）对比时，就会发现你已经进步了。”选项 B 精准完成了三重词组替换，将“只和自己比”概括为“只拿自己的现在与过去作比较”。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "无论发生什么都要努力保持乐观。",
        "verdict": "wrong",
        "reason": "泛泛之谈，原文未提。女士给出的是非常具体的“停止横向攀比、改为纵向自我对比”的方法，而非空喊“保持乐观”。"
      },
      {
        "key": "B",
        "zh": "只拿自己的现在和过去作比较。",
        "verdict": "correct",
        "reason": "精准完成三重同义改写：only person 对应 only；current status（当前状态）对应 his present；starting point（起点）对应 his past。"
      },
      {
        "key": "C",
        "zh": "始终向他人的成就学习。",
        "verdict": "wrong",
        "reason": "原词错位且立场相反。男士抱怨看到他人成就（others accomplishing）让自己痛苦，女士恰恰建议他不要总盯着别人比较，也未提向他人学习。"
      },
      {
        "key": "D",
        "zh": "用自己希望被对待的方式去对待他人。",
        "verdict": "wrong",
        "reason": "完全脱离语境，对话探讨的是自我完美主义与盲目攀比带来的焦虑，与人际待人接物之道毫无关系。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "You're the only person you should be comparing yourself with",
        "to": "only",
        "note": "限定关系转移：原文用定语“唯一的人（only person）”限制比较对象，选项将其浓缩为句末副词 only（只、仅仅）。"
      },
      {
        "from": "compare your current status with the starting point",
        "to": "Compare his present with his past",
        "note": "具体术语向基础时间词改写：current status（当前状况）对应 his present（他的现在），starting point（出发点、起点）对应 his past（他的过去）。"
      }
    ],
    "steps": [
      "听前预读：四项均为祈使建议结构，其中 B 项“对比现在与过去”和 C 项“向他人学习”形成对照，听音时重点抓对话收尾的劝导句。",
      "听中定位：男士说完总是想和别人一样好之后，女士用 Listen 引出核心句，紧盯 only person、compare、current status 与 starting point。",
      "听后转换：将 current status 理解为现在（present），将 starting point 理解为过去（past），排除空洞鸡汤 A、D 与反调项 C，锁定 B。"
    ],
    "pitfall": "本题属于难度较高的深层同义替换题，四个词中没有一个直接说出 present 或 past，而是借用 current status（现状）与 starting point（起点）表达，需要理解整句话的逻辑而非死盯单个原词。",
    "vocabHighlights": [
      {
        "word": "strive for",
        "meaning": "动词短语，努力争取，力求；strive for perfection 意为“追求完美”。"
      },
      {
        "word": "current status",
        "meaning": "名词短语，当前状态，现状；听力中可与 present 替换。"
      },
      {
        "word": "starting point",
        "meaning": "名词短语，起点，出发点；语境中常对应 past 或 beginning。"
      },
      {
        "word": "miserable",
        "meaning": "adj. 痛苦的，悲惨的，难受的；情感态度题高频负面词。"
      }
    ]
  },
  "q_lis_17": {
    "stemZh": "研究人员对小鼠开展这一系列实验的目的是什么？",
    "evidenceZh": "在这项研究中，研究人员发现饥饿压倒了其他生理驱动力，包括恐惧、口渴和社交需求。为了确定哪种感觉胜出，研究人员进行了一系列实验。",
    "why": "短文第一题通常落在开篇前三句。短文先引出主题“关于小鼠的新研究或许能解释为什么饥饿会成为如此强大的动力”，第二句立刻交代研究发现：“饥饿压倒了其他生理驱动力（physical drives），包括恐惧、口渴和社交需求。”紧接着第三句直接用目的不定式解释为什么要做这些实验：“为了确定哪种感觉最终胜出（To determine which feeling won out），研究人员开展了一系列实验。”把前一句的 physical drives 与后一句的 determine which feeling won out 结合起来，正是 B 项所说的“找出哪种生理驱动力最强大”。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "调查超重对健康有何影响。",
        "verdict": "wrong",
        "reason": "原文未提及。文章研究的是饥饿（hunger）在与其他本能需求冲突时的优先级，和超重（being overweight）或健康影响毫无关系。"
      },
      {
        "key": "B",
        "zh": "找出哪种生理驱动力最为强大。",
        "verdict": "correct",
        "reason": "将第二句的 physical drives（生理驱动力）与第三句的 To determine which feeling won out（确定哪种感觉胜出）完美合并改写。"
      },
      {
        "key": "C",
        "zh": "发现大多数小鼠喜欢吃什么食物。",
        "verdict": "wrong",
        "reason": "曲解实验细节。实验中设置了食物与水的选择，目的是测试饥饿和口渴哪个更占上风，并非研究小鼠的食物偏好。"
      },
      {
        "key": "D",
        "zh": "确定小鼠拥有哪些情感。",
        "verdict": "wrong",
        "reason": "偷换核心逻辑。该项虽然照搬了原文原词 determine 和 feelings，却删掉了最关键的比较成分 which ... won out（哪一个胜出）。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "To determine which feeling won out",
        "to": "To find out which physical drive is the most powerful",
        "note": "跨句信息合并与动词替换：determine（确定）替换为 find out；胜出（won out）转化为最高级描述 is the most powerful；并由上下文还原 feeling 为 physical drive。"
      },
      {
        "from": "other physical drives",
        "to": "which physical drive",
        "note": "词组复现与单复数呼应：前句先给出上位术语 physical drives，后句用 feeling 回指避免重复，选项则重新还原出准确术语。"
      }
    ],
    "steps": [
      "听前预读：四项均以目的不定式 To 开头（调查超重 / 找出最强驱动力 / 发现食物偏好 / 确定有哪些情绪），聚焦文章开头前3句里的目的句型。",
      "听中合并两句信息：第二句听清关键词 physical drives，紧接着第三句听到 To determine which feeling won out 时立即意识到 feeling 指代前文的生理驱动力。",
      "听后排雷：果断避开照搬了 determine 和 feelings 却丢失比较含义的 D 项，确定选 B。"
    ],
    "pitfall": "D 项是极为狡猾的“原词残缺陷阱”：它直接把 To determine which feeling won out 改写成了 To determine what feelings mice have，把“比出谁最强”偷换成了“查明有哪些感受”，听音时绝不能漏听 won out。",
    "vocabHighlights": [
      {
        "word": "outweigh",
        "meaning": "v. 重于，胜过，比……更重要；由 out- + weigh 构成。"
      },
      {
        "word": "physical drive",
        "meaning": "名词短语，生理驱动力，本能需求；如饥饿、口渴等。"
      },
      {
        "word": "win out",
        "meaning": "动词短语，最终胜出，占上风；听力中常与 most powerful 对应。"
      },
      {
        "word": "opt to",
        "meaning": "动词短语，选择（做某事）；与 choose to 同义，听力高频替换词。"
      }
    ]
  },
  "q_lis_18": {
    "stemZh": "修建公路网最初的目的是什么？",
    "evidenceZh": "在那些年里，一战刚结束不久，军方希望出于国防目的修建美国公路网。在必要时，这样的公路网能够把部队迅速从一个地区调往另一个地区。",
    "why": "短文开头先夸赞美国拥有世界上最好的公路网之一，随后抛出了一个极其典型的听力考点设问句：“你可曾想过为什么会存在如此完善的优质公路系统？（Did you ever wonder why...?）”紧接着，作者用 For an answer（要找答案）将时间线回溯到20世纪20年代初一战刚结束之时，明确指出军方出于国防目的修建公路网，以便在必要时“把部队快速从一个区域调动到另一个区域（move troops quickly from one area to another）”。虽然1950年代之后公路主要用于方便汽车出行，但“最初目的（original purpose）”正是 B 项所描述的快速调动部队。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "改善乡村地区的交通状况。",
        "verdict": "wrong",
        "reason": "原文未提及。短文只说州际公路如今几乎连接了所有大中型城市（large and mid-sized city），并未提到最初修建是为了改善乡村交通。"
      },
      {
        "key": "B",
        "zh": "快速地将部队从一地调往另一地。",
        "verdict": "correct",
        "reason": "精准对应回溯句中的 move troops quickly from one area to another，其中 from one area to another 同义替换为 from place to place。"
      },
      {
        "key": "C",
        "zh": "使人们能够以更高的速度出行。",
        "verdict": "wrong",
        "reason": "时间线错位且曲解。后文只说公路后来主要建成是为了让汽车出行更方便（make car travel easier），既不是“最初目的”，也没强调“更高速度”。"
      },
      {
        "key": "D",
        "zh": "加快货物的运输速度。",
        "verdict": "wrong",
        "reason": "原文未提及货物运输。后文仅提及天桥高度要允许运载军用导弹的拖车通过，这是国防预留标准，并非最初修建公路网为运送普通货物。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "move troops quickly from one area to another",
        "to": "move troops quickly from place to place",
        "note": "同义短语替换：原文“从一个区域到另一个区域（from one area to another）”在选项中精炼为常用习语“各地之间（from place to place）”。"
      },
      {
        "from": "For an answer, you would have to go back to the early 1920s. In those years, just after World War I",
        "to": "the original purpose",
        "note": "时间定位对应：题干询问“最初的目的（original）”，精准对应短文自问自答后回溯至20世纪20年代初一战后的最初背景。"
      }
    ],
    "steps": [
      "听前预读：四项均为 To 开头目的短语，同时注意到题干核心词 original purpose，提醒自己必须严格区分“最初目的”与“后期用途”。",
      "听中抓设问：听到设问句 Did you ever wonder why...? 后立刻高度戒备，紧盯 For an answer 后的 early 1920s、military 与 move troops quickly。",
      "听后排雷：不被中后段提到的 1950s 和 make car travel easier 干扰，确认 from one area to another 等于 from place to place，稳选 B。"
    ],
    "pitfall": "涉及时间轴跨度较大的历史类短文，考题最爱抓“最初（original）”和“后来（later）”的对比设坑。听到后期方便汽车出行就选 C 是典型的时间张冠李戴。",
    "vocabHighlights": [
      {
        "word": "national defense",
        "meaning": "名词短语，国防；defense 也可拼作 defence。"
      },
      {
        "word": "troop",
        "meaning": "n. 部队，军队（常以复数 troops 出现）；一群人。"
      },
      {
        "word": "appropriate",
        "meaning": "v. 拨出（专款、资金）；adj. 恰当的，合适的；注意在短文中作动词表示政府拨款。"
      },
      {
        "word": "from place to place",
        "meaning": "介词短语，从一地到另一地，各地之间；常替换 from one area to another。"
      }
    ]
  },
  "q_lis_19": {
    "stemZh": "“智能方向盘”（Smart Wheel）是什么？",
    "evidenceZh": "它叫作“智能方向盘”，设计用于套在大多数标准车辆的方向盘上，用来监测驾驶者是否始终双手握住方向盘。",
    "why": "短文开头先点出了问题背景：开车发短信是美国年轻人道路死亡的重要原因。随后引入一位20岁的年轻发明家及其创新方案，紧接着第三句用下定义句型直接揭示产品本质：“它叫作 Smart Wheel（It's called Smart Wheel），设计用于安装在多数标准车辆的方向盘上，用来追踪监测驾驶者是否始终将双手放在方向盘上（to track whether or not the driver has two hands on the wheel at all times）。”如果检测到单手握方向盘，装置就会亮灯发声警告。由此可知，它是一款确保人们双手驾车的装置，完美对应 D 项。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "一个把手机固定在方向盘上的小装置。",
        "verdict": "wrong",
        "reason": "原词拼接且功能完全相反。选项硬把上下文的 phone 和 steering wheel 拼成“手机支架”，但该发明恰恰是为了阻止开车玩手机。"
      },
      {
        "key": "B",
        "zh": "一个在车内给手机充电的小装置。",
        "verdict": "wrong",
        "reason": "原文未提及。短文只提到装置通过连接手机应用程序（connected app）向家长发送驾驶数据，完全没有提及充电功能。"
      },
      {
        "key": "C",
        "zh": "一个控制车辆行驶速度的设备。",
        "verdict": "wrong",
        "reason": "原文未提及。装置通过灯光和声音警示单手驾驶，并不介入控制车辆速度。"
      },
      {
        "key": "D",
        "zh": "一个确保人们双手驾驶的设备。",
        "verdict": "correct",
        "reason": "精准概括产品设计目的：track whether or not the driver has two hands on the wheel（监测是否始终双手握方向盘）等价于 ensure people drive with both hands。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "to track whether or not the driver has two hands on the wheel",
        "to": "to ensure people drive with both hands",
        "note": "同义表达与数量词替换：监测司机是否双手握方向盘，本质目的即确保双手驾驶；其中 two hands 替换为 both hands，track whether ... 概括为 ensure。"
      },
      {
        "from": "the driver",
        "to": "people drive",
        "note": "名词与动宾结构转化：原文施动名词 the driver（驾驶者）在选项中展开为主谓短语 people drive。"
      }
    ],
    "steps": [
      "听前预读：四项均为“某种功能的设备/小玩意”（架手机 / 充电 / 控速 / 双手驾驶），预判考查专有名词定义，听音锁定 It's called ...。",
      "听中定位：跳过开头开车发短信的背景数据，在听到 It's called Smart Wheel 后全神贯注，抓住核心功能短语 two hands on the wheel。",
      "听后排雷：识破 A 项利用 phone 与 steering wheel 拼凑的“手机支架”陷阱，确认 two hands 对应 both hands，锁定 D。"
    ],
    "pitfall": "A 项极其擅长迷惑只抓零散词汇的考生——因为它同时出现了原文里的 phone 和 steering wheel。做科技产品介绍题，一定要听清主干动词和产品设计初衷（防止单手开车，而非架手机）。",
    "vocabHighlights": [
      {
        "word": "steering wheel",
        "meaning": "名词短语，方向盘；由 steer（驾驶、掌舵）加 wheel 组成。"
      },
      {
        "word": "track",
        "meaning": "v. 追踪，监测；keep track of 意为“随时掌握、持续跟踪”。"
      },
      {
        "word": "gadget",
        "meaning": "n. 小巧的装置，小工具；常与 device 交替出现在科技类选项中。"
      },
      {
        "word": "put ... on notice",
        "meaning": "动词短语，正式警告，提醒注意。"
      }
    ]
  },
  "q_lis_20": {
    "stemZh": "说话人建议求职者怎么做？",
    "evidenceZh": "然而，你始终应该注重质量而不是数量。只申请你有资格胜任的职位，让每一次申请都发挥价值，为每一封求职信量身定制，并更新和修改你的简历。",
    "why": "短文前半段用较大篇幅介绍了如何利用 Excel 表格或 Google 等工具来条理化管理大量求职申请，但到了最后一段，说话人突然使用极强的转折信号词 Nevertheless（然而），叠加建议情态动词 you should always（你始终应该），抛出了全篇最核心的忠告：“始终重质不重量（focus on quality, not quantity）。只申请符合资质的岗位，让每次申请都有分量，为每封求职信量身定制（personalizing each cover letter）。”选项 B 将 make each application count 与 personalizing each cover letter 合并精炼为 Personalize each application，准确命中主旨建议。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "详细提供个人资料。",
        "verdict": "wrong",
        "reason": "原文未提及。结尾只说更新和修改简历（updating and editing your resume），并没有建议去详细填报或提供更多个人数据。"
      },
      {
        "key": "B",
        "zh": "为每一份求职申请进行个性化定制。",
        "verdict": "correct",
        "reason": "精准整合末尾转折建议句中的 make each application count 与 personalizing each cover letter，提炼为 Personalize each application。"
      },
      {
        "key": "C",
        "zh": "使用更好的搜索引擎。",
        "verdict": "wrong",
        "reason": "曲解工具用途。原文提到 Google 是作为一个帮助你把求职管理变得有条理的办公工具（help you get organized），而不是建议换用更好的“搜索引擎”去搜工作。"
      },
      {
        "key": "D",
        "zh": "申请更有发展前景的职位。",
        "verdict": "wrong",
        "reason": "关键修饰词偷换。原文建议只申请“你具备胜任资格的职位（positions you are qualified for）”，而被选项偷偷换成了“更有前途的职位（more promising positions）”。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "make each application count, personalizing each cover letter",
        "to": "Personalize each application",
        "note": "并列动作合并简化：原文先强调“重视每份申请（each application）”，紧接着补充“定制每封求职信（personalizing）”，选项合二为一为动词短语 Personalize each application。"
      },
      {
        "from": "you should always",
        "to": "suggest job seekers do",
        "note": "建议信号词对应：情态动词 should always 是短文末尾考建议题的黄金标志，直接呼应题干动词 suggest。"
      }
    ],
    "steps": [
      "听前预读：四项均为求职行动建议，预判考查说话人最终立场，提醒自己留意篇末转折。",
      "听中坚持：前段讲述 Excel 和 Google 管理方法时保持关注，但千万别当成最终结论；听到结尾转折词 Nevertheless 和 you should always 时迅速抓重点。",
      "听后核对：识破 D 项把 qualified for（能胜任的）篡改为 more promising（更有前景的）的陷阱，合并 personalizing 与 application 后选定 B。"
    ],
    "pitfall": "在听短文时千万不要半途松懈！前80%篇幅都在介绍高效管理申请数量的工具，真正考建议的压轴核心全藏在最后一句 Nevertheless 之后；同时也要谨防 D 项对 qualified for 的悄然偷换。",
    "vocabHighlights": [
      {
        "word": "personalize",
        "meaning": "v. 使个性化，量身定制；由形容词 personal 派生而来，求职与营销类高频词。"
      },
      {
        "word": "qualified for",
        "meaning": "形容词短语，有资格的，胜任……的；be qualified for a position 意为“胜任某职位”。"
      },
      {
        "word": "pay off",
        "meaning": "动词短语，取得回报，奏效，还清（债务）。"
      },
      {
        "word": "promising",
        "meaning": "adj. 有前途的，有希望的；常在选项中作为混淆视听的正面修饰词出现。"
      }
    ]
  },
  "q_lis_21": {
    "stemZh": "如果在树林里沿着一条未知的溪流走，会发生什么？",
    "evidenceZh": "尽管那里有更多可食用的植物，但也可能存在野生动物、毒蛇以及其他危险。",
    "why": "这篇户外求生短文针对“在树林迷路怎么办”给出建议。第二句明确发出禁令：“如果你必须移动，千万不要沿着溪流走，除非你熟悉它（don't follow a stream unless you know it）。”随后第三句用让步转折句解释了为什么不能沿陌生溪流走：溪流通常流经湿地，“尽管有更多可食用的植物，但也可能遇到野生动物、毒蛇和其他危险（there may also be wild animals, poisonous snakes, and other hazards）。”其中 hazards 与选项 C 中的 dangers 是四级听力最经典的同义词替换，整个描述精准对应“让自己暴露在意想不到的危险中”。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "你最终可能会走进一个仙境。",
        "verdict": "wrong",
        "reason": "情感色彩完全相反。前文明确警告“不要沿着不认识的溪流走”，接下来解释原因必然是指出负面风险，绝不可能是进入仙境（wonderland）。"
      },
      {
        "key": "B",
        "zh": "你可能会在突如其来的洪水中溺水。",
        "verdict": "wrong",
        "reason": "脱离原文的常识联想。文中只提到湿地（wetland）、野兽、毒蛇和隐患，自始至终没有提及发生洪水（sudden flood）或溺水风险。"
      },
      {
        "key": "C",
        "zh": "你可能会把自己暴露在意想不到的危险之中。",
        "verdict": "correct",
        "reason": "精准概括原文让步转折句：wild animals, poisonous snakes, and other hazards 高度概括为 unexpected dangers，hazard 与 danger 为核心同义词对。"
      },
      {
        "key": "D",
        "zh": "你可能会在不知不觉中找到出路。",
        "verdict": "wrong",
        "reason": "与原文建议相悖。短文指出沿着陌生溪流走有野兽毒蛇危险，真正能帮人走出森林、被空中搜救发现的做法是往高处走（walk uphill）。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "wild animals, poisonous snakes, and other hazards",
        "to": "unexpected dangers",
        "note": "具体危险列举向抽象概括转换：原文列举野兽、毒蛇并用 other hazards 收尾，选项将其概括为 unexpected dangers，考查同义词 pair：hazard = danger。"
      },
      {
        "from": "don't follow a stream unless you know it",
        "to": "follow an unknown stream",
        "note": "否定条件转换：原文“除非你熟悉它（unless you know it）”即等同于题干假设的“一条未知的溪流（an unknown stream）”。"
      }
    ],
    "steps": [
      "听前预读：四项均为 You may ... 的可能后果，先凭感情色彩发现 A（仙境）和 D（找到出路）偏积极，B（洪水）和 C（危险）偏消极，重点听文中态度。",
      "听中定极性：听到警告句 don't follow a stream unless you know it 后立刻排除积极向的 A、D；接着盯住转折结构 Though ..., there may also be ...。",
      "听后比对：听清列举的是 wild animals, poisonous snakes, and other hazards，没有提到洪水，将 hazards 对接 dangers 后稳选 C。"
    ],
    "pitfall": "听到 stream（溪流）、wetland（湿地）、river（河流）等水系词汇时，极易引发关于 B 项“突遇洪水淹死”的脑补联想，务必忠实于录音实际列举的隐患。",
    "vocabHighlights": [
      {
        "word": "hazard",
        "meaning": "n. 危险，隐患，冒险；四级听力阅读超高频词，常与 danger、risk 互换。"
      },
      {
        "word": "edible",
        "meaning": "adj. 可食用的，适合食用的；反义词为 inedible。"
      },
      {
        "word": "expose ... to",
        "meaning": "动词短语，使暴露于，使面临（危险或影响）；常用被动 be exposed to。"
      },
      {
        "word": "poisonous",
        "meaning": "adj. 有毒的，恶毒的；名词形式为 poison（毒药）。"
      }
    ]
  },
  "q_lis_22": {
    "stemZh": "关于西雅图，说话人发现了什么？",
    "evidenceZh": "今天我发现，与美国大多数城市相比，西雅图的降雨量其实并没有那么多。事实上，西雅图在美国主要城市的年均降雨量中仅排第44位。",
    "why": "这是一篇典型的“打破固有刻板印象”的科普短文，主旨发现直接放在第一、二句。说话人开篇即用 Today I found out that（今天我发现）点出反常识结论：“与多数美国城市相比，西雅图的降雨量其实没那么多（doesn't really get that much rain）”，并用事实数据“年均降雨排名第44位（ranks 44th）”加以佐证，还指出休斯顿、纽约、波士顿等东海岸城市降雨量都比西雅图多。随后解释了大众产生误解（misconception）的原因：西雅图只是下雨天数多、且多为毛毛细雨。因此 C 项“降雨量并不像人们想的那么多”精准整合了全篇核心发现。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "那里经常下倾盆大雨。",
        "verdict": "wrong",
        "reason": "与原文完全相反。短文末尾明确指出西雅图下雨时往往只是非常轻微的小雨（a very light rain），而且几乎从不降暴风雨（never really storms），并非“倾盆大雨（rains cats and dogs）”。"
      },
      {
        "key": "B",
        "zh": "那里夏天很少下雨。",
        "verdict": "wrong",
        "reason": "原文未提及季节分布。文中只讨论了全年的降雨总量排名、下雨天数以及雨势大小，完全没有提及夏季（summer time）的降水情况。"
      },
      {
        "key": "C",
        "zh": "那里的降雨量并不像人们以为的那么多。",
        "verdict": "correct",
        "reason": "精准整合首句核心发现 doesn't really get that much rain 与后文对误解（misconception / everyone think of Seattle as a rainy city）的揭示。"
      },
      {
        "key": "D",
        "zh": "它是美国降雨量最多的城市之一。",
        "verdict": "wrong",
        "reason": "与原文数据截然相反。这正是大众的错误印象（misconception），原文明确指出西雅图在全美主要城市年均降雨量中仅排第44位，远远称不上最多雨城市之一。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "Seattle doesn't really get that much rain",
        "to": "It does not rain as much as people think",
        "note": "否定程度句式转化：原文“其实并没有那么多雨（doesn't really get that much rain）”结合大众固有印象，转化为比较句型“不如人们想的那么多”。"
      },
      {
        "from": "everyone think of Seattle as a rainy city? The primary root of this misconception",
        "to": "as people think",
        "note": "跨句背景补全：后文点出“每个人都把西雅图当成雨城”是一个误区，精准补足了选项中 people think 的对比对象。"
      }
    ],
    "steps": [
      "听前预读：四项均围绕西雅图降雨特点展开，注意到其中 A、D 偏向“雨极多”，而 C 偏向“反常识”，预判听力很可能是纠偏类科普。",
      "听中抓否定词：第一句一开口出现 Today I found out that Seattle doesn't really get that much rain，迅速听清否定词 doesn't really 及后续排名第44位的数据。",
      "听后排雷：克制住平时听说“西雅图多雨”的固有常识冲动，果断划掉反向陷阱 A 和 D，确认选 C。"
    ],
    "pitfall": "熟悉的地名（如“雨城西雅图”）往往是四级科普听力用来“反常识打脸”的重灾区！如果凭生活常识直接选 D 或 A 就会正好掉进原文批判的 misconception 陷阱里，一定要听清首句的否定词 doesn't really。",
    "vocabHighlights": [
      {
        "word": "misconception",
        "meaning": "n. 误解，错误观念；由前缀 mis-（错误）+ conception（观念）构成。"
      },
      {
        "word": "annual rainfall",
        "meaning": "名词短语，年降雨量；annual 意为“每年的，年度的”。"
      },
      {
        "word": "spread out",
        "meaning": "动词短语，分散，拉长，铺开；文中指降雨量被分散到更多的天数里。"
      },
      {
        "word": "rain cats and dogs",
        "meaning": "习语，下倾盆大雨；注意不要因为认识习语而被 A 项诱导。"
      }
    ]
  },
  "q_clz_01": {
    "stemZh": "短文探讨历史学界关于“工业革命如何影响工人阶级生活水平”的争议：第一段梳理生活水平上升与下降两派旧争论及当代共识；第二段指出史学家用“实际收入”替代难以测量的幸福感及其局限；第三段总结史学家转向分析战争、高税率与人口增长等外部事件对工业革命的抵消效应。",
    "why": "本文是一篇典型的历史社科议论文，10个空格完整覆盖四级选词填空四大核心词性：动词过去式/过去分词4个（第1空squeezed、第3空increased、第4空occurred、第7空earned）、动词原形1个（第9空interpret）、形容词2个（第2空available、第8空exhausting）、副词2个（第5空exactly、第6空typically）和名词1个（第10空effect）。解题时先按“主谓一致与时态、with复合结构、副词修饰位置、冠词+形容词后接名词”划定每空词性，再结合“消费友好环境、实际收入定义、外部负面因素中和”的语篇脉络即可精准匹配。",
    "posNote": "词性识别要点：1. 过去式与过去分词（-ed结尾）：第1、3、4空位于从句主语后且全文为历史争论过去时，需填入谓语动词过去式（squeezed/increased/occurred）；第7空在money后与and then adjusted并列，属于过去分词作后置定语（earned）。2. 副词（-ly结尾）：第5空修饰动词define、第6空夹在主语historians与动词use之间，均填副词。3. 形容词：第2空在with+名词+宾补位置（available），第8空修饰名词debate（exhausting）。4. 动词原形：第9空在decided to后接不定式原形。5. 名词：第10空在an overall positive后作had的宾语。",
    "blankDetails": {
      "1": {
        "sentenceZh": "那些认为生活水平下降的人声称，资本家从工人阶级身上榨取了每一盎司能榨取的剩余价值。",
        "posRule": "that引导的宾语从句中，主语the capitalists后缺少及物动词谓语；主句动词believed、claimed均为过去时，故此处须填及物动词过去式，且后文与介词from搭配。",
        "distractorExclude": "同为过去式的increased（增加）和occurred（发生）在此处无法与“every ounce of surplus ... from the working class”构成动宾及介词搭配，且occurred为不及物动词；earned（赚取）不合“资本家向工人剥削榨取”的语义。",
        "wordUsage": "v. 榨取，挤压（过去式）；常考搭配：squeeze ... from ...（从……中榨取……）。"
      },
      "2": {
        "sentenceZh": "那些认为生活水平上升的人则声称，当时环境对消费者十分友好，每年有越来越多商品可供工人阶级购买获得。",
        "posRule": "“with + 名词（more and more goods）+ 宾语补足语”构成with复合结构；goods后缺少形容词短语作宾补，且与介词to连用表示“对某人可得”。",
        "distractorExclude": "同为形容词的peculiar（奇特的，特有的）虽可搭配to，但be peculiar to意为“某人/某地所独有的”，不合“商品供应给工人”的语境；exhausting（耗尽精力的）和deteriorating（恶化的）均不能与to搭配表达商品供应。",
        "wordUsage": "adj. 可获得的，可用的；常考搭配：available to sb.（可供某人获得的）。"
      },
      "3": {
        "sentenceZh": "如今的历史学家一致认为，总体而言，当时工人的生活水平确实提高了。",
        "posRule": "agree that引导宾语从句，主语the standards of living后缺少谓语动词；此处陈述工业革命时期的历史结果，填不及物动词过去式。",
        "distractorExclude": "同为过去式的occurred（发生）不能表达生活水平“上升”的方向；squeezed（榨取）为及物动词，此处空格后直接结束句子、没有宾语，语法上不能填及物动词。",
        "wordUsage": "v. 增加，提高（过去式）；既可作不及物动词表“上升”，也可作及物动词。"
      },
      "4": {
        "sentenceZh": "然而，他们并不一致认同这一改善究竟是在何时发生的。",
        "posRule": "when引导的宾语从句中，主语this improvement后缺少不及物动词过去式作谓语，表示“改善发生的时间”。",
        "distractorExclude": "同为过去式的increased（增加）与主语this improvement（改善/提高）语义重复，不能说“改善增加了”；squeezed（榨取）为及物动词，空后无宾语。",
        "wordUsage": "v. 发生，出现（过去式，不及物动词）；常与when从句连用，无被动语态。"
      },
      "5": {
        "sentenceZh": "为了解决这一争议，历史学家一直试图精确界定“生活水平”究竟意味着什么。",
        "posRule": "不定式to define后紧接宾语从句what ... means，动词define与宾语之间需要副词作状语来修饰界定的精准程度。",
        "distractorExclude": "同为副词的probably（大概）与“attempt to solve this controversy（试图解决争议）”追求严谨定义的目标矛盾；typically（通常）指习惯性做法，不能修饰define来表达“精确界定”。",
        "wordUsage": "adv. 确切地，精确地；常考搭配：define ... exactly（精确界定……）。"
      },
      "6": {
        "sentenceZh": "相反，历史学家通常采用“实际收入”作为衡量生活水平的标准。",
        "posRule": "主语historians与谓语动词use之间缺少频率或方式副词作状语，用来说明史学界的常规做法。",
        "distractorExclude": "同为副词的probably（大概）带有不确定猜测语气，而句中直接陈述史学界普遍采用“实际收入”这一既定度量方法；exactly（确切地）已在第5空使用，且不修饰use表“通常使用”。",
        "wordUsage": "adv. 通常，典型地；常置于主语与实义动词之间说明普遍惯例。"
      },
      "7": {
        "sentenceZh": "实际收入是指人们赚取并随后根据生活成本进行调整后的货币收入。",
        "posRule": "名词money后有and then adjusted，and连接两个并列的过去分词短语作后置定语修饰money，表示“被赚取并被调整的钱”。",
        "distractorExclude": "同为过去分词/过去式的occurred（发生）是不及物动词，没有被动含义，不能修饰money；squeezed（榨取）和increased（增加）均不符合“工资/实际收入来源”的定义。",
        "wordUsage": "v. 挣得，赚取（过去分词）；常考搭配：money earned（赚得的收入）。"
      },
      "8": {
        "sentenceZh": "在关于平均收入的漫长而令人疲惫的争论与分析之后，历史学家在工业革命期间经济增长是快还是慢的问题上同意保留各自意见。",
        "posRule": "介词After后接名词词组debate and analysis，空格位于名词前作前置定语，须填形容词。",
        "distractorExclude": "同为形容词的deteriorating（恶化的）常修饰局势、健康或关系，不说“正在恶化的辩论”；peculiar（奇特的）不符合学术界长期讨论的语境。",
        "wordUsage": "adj. 耗尽精力的，冗长乏味的；常考搭配：exhausting debate（漫长疲惫的争论）。"
      },
      "9": {
        "sentenceZh": "相反，他们决定转而解读工业革命是如何受到其他事件影响的。",
        "posRule": "decided to后接动词原形构成不定式宾语，且该动词需能引导how引导的宾语从句。",
        "distractorExclude": "同为动词原形的enhance（提高，增强）通常接名词如efficiency或quality，不能接how引导的从句表达“提高它是如何受影响的”；experience（经历）主体通常是亲历者，而非后代历史学家。",
        "wordUsage": "v. 解释，解读；常考搭配：interpret how ...（解读……是如何发生的）。"
      },
      "10": {
        "sentenceZh": "他们认定工业革命总体上产生了积极影响，但这种影响很可能被战争、高税收和人口迅速增长等负面事件所抵消。",
        "posRule": "动词had后接冠词an与形容词overall positive，空格处缺少可数名词单数作宾语，构成固定动宾搭配。",
        "distractorExclude": "同为名词的experience（经历）作宾语时，主语通常是人，不能说“工业革命拥有一次总体积极的经历”；其余词库词均为动词、形容词或副词，词性不符。",
        "wordUsage": "n. 影响，效果；高频固定搭配：have a positive effect（产生积极影响）。"
      }
    },
    "steps": [
      "第一步先把词库15词按语法形态分组：过去式/分词（C/I/K/N）、动词原形（E/H/J）、形容词（A/B/G/L）、副词（F/M/O）、名词（D/H）。",
      "第二步秒杀固定搭配与特殊结构：第2空with goods available to、第7空money earned and adjusted、第10空have an overall positive effect。",
      "第三步攻克副词与不定式：第5空修饰define选exactly，第6空修饰historians use选typically；第9空decided to后接how从句选interpret。",
      "第四步核对过去式及物/不及物与形容词修饰：第1空squeeze ... from、第3空standards increased、第4空improvement occurred、第8空exhausting debate。"
    ],
    "pitfall": "第8空容易看到负向词汇就误选deteriorating（恶化的），但修饰“辩论与分析”应表达耗时费力的exhausting；第3、4空要留意动词及物性，occurred是不及物动词，只能用于improvement occurred，绝不能代替第1空的及物动词squeezed。",
    "vocabHighlights": [
      {
        "word": "squeeze ... from",
        "meaning": "v.+prep. 从……中榨取"
      },
      {
        "word": "available to",
        "meaning": "adj.+prep. 可供……获得的"
      },
      {
        "word": "exhausting",
        "meaning": "adj. 耗尽精力的，冗长疲惫的"
      },
      {
        "word": "interpret",
        "meaning": "v. 解释，解读，阐释"
      },
      {
        "word": "neutralize",
        "meaning": "v. 抵消，中和，使无效"
      }
    ]
  },
  "q_clz_02": {
    "stemZh": "这篇科普短文解释了一个反常识的发现：对咖啡苦味更敏感的人反而喝更多咖啡。文章先点出基因影响味觉敏感度，随后用正反对照解释咖啡因的“习得性正向强化”机制，最后对比人们对芽甘蓝、奎宁与咖啡因苦味的分别感知及其饮品偏好。",
    "why": "本文10个空格均衡覆盖名词4个（第3空reinforcement、第6空consumption、第9空addition）、动词原形3个（第5空convince、第7空perceive、第10空avoid）、形容词2个（第2空opposite、第4空heightened）与副词2个（第1空simply、第8空separately）。语篇逻辑极其清晰，多处可以通过上下句的反义对比（less vs opposite、same vs separately、prefer tea vs avoid coffee）以及高频固定结构（not simply ... but rather、In addition、convince sb. to do）直接锁定答案。",
    "posNote": "词性识别要点：1. 副词（-ly结尾）：第1空位于isn't与a matter of之间构成“not ___ ... but rather ...”对照句式；第8空在句子末尾修饰动词perceive。2. 形容词：第2空修饰复数名词results；第4空在不定冠词a与名词ability之间（heightened为-ed结尾转化形容词）。3. 动词原形：第5空位于不定式符号to后（to ___ people to）；第7空在主语we后作谓语；第10空在tended to后接原形。4. 名词：第3空在learned positive后作宾语；第6空在所有格people's后；第9空在句首介词In后。",
    "blankDetails": {
      "1": {
        "sentenceZh": "研究人员在研究中表示，这种敏感度也并不仅仅是一个口味问题，而是受到个人基因构成的影响。",
        "posRule": "句型“isn't ___ a matter of taste, either, but rather ...”需要副词来限定否定范围，表示“并不仅仅是……而是……”。",
        "distractorExclude": "同为副词的approximately（大约）通常用于修饰数字或数量，无法与a matter of taste搭配；separately（分别地）不符合“不只是口味问题而是基因决定”的递进对照关系。",
        "wordUsage": "adv. 仅仅，只是；高频对比句型：not simply ... but rather ...（不仅只是……而是……）。"
      },
      "2": {
        "sentenceZh": "我们研究中相反的结果表明，由于咖啡因带来的习得性正向强化，咖啡消费者逐渐养成了对咖啡因苦味的喜好或检测能力。",
        "posRule": "定冠词The与复数名词results之间缺少前置定语形容词，用来总结与前句预期截然不同的实验结果。",
        "distractorExclude": "同为形容词的heightened（增强的）不能与results搭配来表达“与预期相反”；targeted（有针对性的）也不符合前句“本以为敏感者少喝”与本句实际结论之间的反转逻辑。",
        "wordUsage": "adj. 相反的，对立的；常考搭配：the opposite results（相反的结果）。"
      },
      "3": {
        "sentenceZh": "我们研究中相反的结果表明，由于咖啡因带来的习得性正向强化，咖啡消费者逐渐养成了对咖啡因苦味的喜好或检测能力。",
        "posRule": "介词due to后接名词性短语the learned positive ___，形容词positive后缺少核心名词作宾语。",
        "distractorExclude": "同为名词的omission（遗漏）与positive语义相悖；prospect（前景）无法由brought out by caffeine（由咖啡因引发）修饰；consumption（摄入量）虽也是名词，但正反馈心理机制固定称作positive reinforcement。",
        "wordUsage": "n. 强化，加固；心理学高频术语：positive reinforcement（正向强化/正反馈）。"
      },
      "4": {
        "sentenceZh": "科内利斯说，换言之，对咖啡苦味有着更敏锐品尝能力的人，学会了把“好事与苦味联系起来”。",
        "posRule": "不定冠词a与名词ability之间缺少形容词作定语，用来回指首段提到的supersensitive（超级敏感）。",
        "distractorExclude": "同为形容词的opposite（相反的）不符合“品苦能力更强”的语境；targeted（有针对性的）通常修饰群体、广告或治疗方案，不修饰人体味觉能力。",
        "wordUsage": "adj. 增强的，更敏锐的；由动词heighten（提高，增强）的过去分词转化而来。"
      },
      "5": {
        "sentenceZh": "科学家表示，考虑到苦味常常作为一种警告机制来促使人们吐出有害物质，这一发现令人惊讶。",
        "posRule": "不定式to后接及物动词原形，且该动词须能构成“动词 + people + to spit out”的宾补结构。",
        "distractorExclude": "同为动词原形的avoid（避免）后接动名词（avoid doing），不能用avoid sb. to do；perceive（感知）意为察觉，不用于“促使/说服某人吐出物质”。",
        "wordUsage": "v. 说服，促使；常考句型：convince sb. to do sth.（促使/说服某人做某事）。"
      },
      "6": {
        "sentenceZh": "首席研究员翁觉胜表示，研究人员开展这项研究是为了了解基因如何影响人们对往往带有苦味的茶、咖啡和酒精的摄入情况。",
        "posRule": "名词所有格people's后且在介词of前，需要填入名词作influences的宾语，指代饮用茶、咖啡和酒精的行为量。",
        "distractorExclude": "同为名词的prospect（前景）不能说“人们对茶和咖啡的前景”；omission（遗漏）和addition（增加）均不与of tea, coffee and alcohol构成饮用摄入的语境含义。",
        "wordUsage": "n. 消费，摄入量；饮食健康题材高频搭配：consumption of tea/coffee（茶/咖啡的摄入）。"
      },
      "7": {
        "sentenceZh": "翁告诉《生活科学》网站：“虽然所有苦味看起来都一样，但我们对芽甘蓝、奎宁和咖啡因苦味的感知是各自独立的。”",
        "posRule": "主语we后缺少复数形式的及物动词谓语，且该动词的宾语是the bitterness。",
        "distractorExclude": "同为动词原形的avoid（避开）会导致逻辑错误，人们不会单纯“避开”苦味来与上句seem the same形成对照；convince（说服）的宾语通常是人，不能接the bitterness。",
        "wordUsage": "v. 感知，察觉；常考搭配：perceive the bitterness / differences（感知苦味/差异）。"
      },
      "8": {
        "sentenceZh": "翁告诉《生活科学》网站：“虽然所有苦味看起来都一样，但我们对芽甘蓝、奎宁和咖啡因苦味的感知是各自独立的。”",
        "posRule": "主干we perceive the bitterness ... 已经完整，句末需要副词修饰动词perceive，与前句的the same形成对比。",
        "distractorExclude": "同为副词的approximately（大约）只修饰数量或程度估计，不修饰感知方式；simply（仅仅）不与While all bitter flavors may seem the same形成语义转折。",
        "wordUsage": "adv. 分别地，独立地；常置于句末表示“各自独立地进行”。"
      },
      "9": {
        "sentenceZh": "此外，对奎宁苦味以及绿色蔬菜中所含苦味更敏感的人往往会避开咖啡。",
        "posRule": "句首“In ___, ”构成介词短语作衔接副词性成分，空格处须填名词构成固定过渡短语。",
        "distractorExclude": "词库中其余名词omission（遗漏）、prospect（前景）、consumption（消费）和reinforcement（强化）均无法与介词In构成表示递进的句首衔接短语。",
        "wordUsage": "n. 增加；高频句首过渡短语：In addition（此外，而且）。"
      },
      "10": {
        "sentenceZh": "此外，对奎宁苦味以及绿色蔬菜中所含苦味更敏感的人往往会避开咖啡。",
        "posRule": "tended to后接及物动词原形，以coffee为宾语；结合前句“更偏爱茶而非咖啡”，此处应填表示远离的动作。",
        "distractorExclude": "同为动词原形的convince（说服）不能以饮品coffee作宾语；perceive（感知）在语义上不能表达对咖啡的排斥倾向。",
        "wordUsage": "v. 避开，避免；高频搭配：tend to avoid ...（倾向于避开……）。"
      }
    },
    "steps": [
      "第一步直接拿下四个高频固定结构：第1空not simply ... but rather、第5空convince sb. to do、第9空In addition、第10空tend to avoid。",
      "第二步利用上下句反义对照锁定修饰词：第2空与less对比选opposite results，第4空回指supersensitive选heightened ability，第8空与seem the same对比选separately。",
      "第三步借助词性与背景语境补全剩余三空：第3空positive reinforcement（正向强化），第6空people's consumption of（饮品摄入），第7空we perceive the bitterness（感知苦味）。"
    ],
    "pitfall": "第1空容易忽视not simply ... but rather固定对照结构而去词库硬找否定词或随便填副词；第3空若对reinforcement不熟，可通过前文learned positive与因果短语brought out by caffeine排除消极名词omission与前景词prospect。",
    "vocabHighlights": [
      {
        "word": "reinforcement",
        "meaning": "n. 强化，正反馈（positive reinforcement 正向强化）"
      },
      {
        "word": "heightened",
        "meaning": "adj. 增强的，更敏锐的"
      },
      {
        "word": "consumption",
        "meaning": "n. 消费，消耗，摄入量"
      },
      {
        "word": "perceive",
        "meaning": "v. 感知，察觉，理解"
      },
      {
        "word": "convince",
        "meaning": "v. 说服，促使（convince sb. to do sth.）"
      }
    ]
  },
  "q_clz_03": {
    "stemZh": "短文介绍了一项关于戒除垃圾食品的研究：前两段说明戒断高加工食品会出现与戒烟或戒毒类似的生理和心理症状；第三、四段指出症状在第二至五天最强烈且时间跨度相似；第五、六段讨论食物成瘾的争议，并指出提高认知有助提前制定应对策略及理解治疗退出障碍。",
    "why": "本文10个空格覆盖动词原形3个（第7空trigger、第9空prepare、第10空shed）、三单动词2个（第3空offers、第5空parallels）、形容词2个（第1空physical、第6空controversial）、现在分词1个（第2空quitting）、副词1个（第4空significantly）和名词1个（第8空awareness）。全篇固定搭配密集，且三单动词池与副词池各仅有2个词，只要做好词性分栏就能大幅提速。",
    "posNote": "词性识别要点：1. 动词第三人称单数（-s结尾动词）：词库仅有offers和parallels，分别对应第3空单数主语The new study和第5空非限制性定语从句主语which。2. 现在分词（-ing结尾）：第2空在those后作后置定语，对应quitting smoking。3. 副词（-ly结尾）：第4空修饰比较级more intense，在permanently与significantly中二选一。4. 动词原形：第7空在情态动词can后，第9空在help individuals后，第10空在may also后。5. 形容词与名词：第1空与psychological并列，第6空修饰subject，第8空在Raising后作宾语。",
    "blankDetails": {
      "1": {
        "sentenceZh": "研究表明，试图减少高加工食品摄入的人会经历一些与戒烟或吸毒者相同的生理和心理症状——如情绪波动、焦虑、头痛和睡眠不佳。",
        "posRule": "与and psychological并列修饰复数名词symptoms，须填形容词，且内容需对应破折号后的headaches and poor sleep（头痛和睡眠不佳）。",
        "distractorExclude": "同为形容词的controversial（有争议的）和monstrous（巨大的，畸形的）均不能与psychological构成医疗科学领域的常规并列定语（生理与心理症状）。",
        "wordUsage": "adj. 身体上的，生理的；高频并列搭配：physical and psychological symptoms（生理和心理症状）。"
      },
      "2": {
        "sentenceZh": "研究表明，试图减少高加工食品摄入的人会经历一些与戒烟或吸毒者相同的生理和心理症状——如情绪波动、焦虑、头痛和睡眠不佳。",
        "posRule": "代词those（指代人群）后缺少现在分词短语作后置定语，表示主动正在进行的动作，且须能与smoking cigarettes搭配。",
        "distractorExclude": "同为现在分词的canceling（取消）用于取消预约、订单或航班，绝不与smoking cigarettes搭配表达“戒烟”。",
        "wordUsage": "v. 戒掉，停止（现在分词）；高频生活搭配：quit smoking（戒烟）。"
      },
      "3": {
        "sentenceZh": "该研究首席作者埃里卡·舒尔特表示，这项新研究提供了首个证据，表明当人们减少高加工食品时可能会出现这些类似戒断的症状。",
        "posRule": "单数主语The new study后缺少第三人称单数现在时谓语动词，后接宾语the first evidence。",
        "distractorExclude": "词库中另一个三单动词parallels（与……相似）意为在特征或轨迹上平行对比，而“研究与首个证据相平行”语义不通。",
        "wordUsage": "v. 提供，给予（三单）；常考搭配：offer the first evidence（提供首个证据）。"
      },
      "4": {
        "sentenceZh": "根据参与者的自我报告症状，在试图减少垃圾食品消费后的第二天到第五天之间，戒断症状明显更加强烈，这与人们在戒毒期间经历的时间跨度相似。",
        "posRule": "位于系动词were与形容词比较级more intense之间，须填副词来修饰比较级的程度。",
        "distractorExclude": "词库中另一个副词permanently（永久地）与时间状语“between the second and fifth days（仅在第二至第五天）”在逻辑上直接矛盾。",
        "wordUsage": "adv. 显著地，明显地；常用于修饰比较级（significantly more intense）或上升下降类动词。"
      },
      "5": {
        "sentenceZh": "根据参与者的自我报告症状，在试图减少垃圾食品消费后的第二天到第五天之间，戒断症状明显更加强烈，这与人们在戒毒期间经历的时间跨度相似。",
        "posRule": "which引导非限制性定语从句指代前面整个现象（第2至第5天最强烈），作单数主语，后缺及物动词第三人称单数形式。",
        "distractorExclude": "词库中另一个三单动词offers（提供）不能表达两种戒断时间跨度之间的“相似/对应”关系。",
        "wordUsage": "v. 与……相似，与……平行（三单）；注意一词多性：除作形容词外，作及物动词可直接接the time span作宾语。"
      },
      "6": {
        "sentenceZh": "舒尔特说，食物在部分人“大量”食用后可能会令人上瘾这一观点是一个有争议的话题。",
        "posRule": "不定冠词a与名词subject之间缺少前置定语形容词，说明该学术观点的讨论性质。",
        "distractorExclude": "同为形容词的monstrous（怪异的，畸形的）带有强烈主观厌恶情绪，不符合科研人员的客观表述；physical（生理的）无法修饰subject（议题）。",
        "wordUsage": "adj. 有争议的；常考搭配：a controversial subject/issue（一个有争议的话题）。"
      },
      "7": {
        "sentenceZh": "她指出，尽管此前在动物和人类身上的研究显示出物质使用障碍与高加工食品成瘾性消费之间存在一些生理和行为相似之处，但尚未有研究探讨减少垃圾食品是否会在人体内引发戒断症状。",
        "posRule": "情态动词can后缺少及物动词原形，以withdrawal symptoms为宾语。",
        "distractorExclude": "同为动词原形的prepare（准备）搭配“准备戒断症状”语义荒谬；shed（散发/照亮）固定搭配为shed light on或shed weight，不与withdrawal symptoms搭配。",
        "wordUsage": "v. 引发，触发；常考搭配：trigger symptoms（诱发症状）。"
      },
      "8": {
        "sentenceZh": "舒尔特指出，提高人们关于减少垃圾食品时可能出现易怒或头痛的认知，可以帮助个人提前准备应对策略。",
        "posRule": "动名词Raising后缺少不可数名词作宾语，且该名词能后接that引导的同位语从句。",
        "distractorExclude": "同为名词的emptiness（空虚）语义不合；prospects（前景）为复数名词，既不能与Raising搭配，也不能接“人们可能出现易怒”的内容从句。",
        "wordUsage": "n. 意识，认知；四级超高频动宾搭配：raise awareness (that...)（提高……意识）。"
      },
      "9": {
        "sentenceZh": "舒尔特指出，提高人们关于减少垃圾食品时可能出现易怒或头痛的认知，可以帮助个人提前准备应对策略。",
        "posRule": "help individuals后缺少不带to的动词不定式（即动词原形）作宾补，搭配宾语coping strategies和状语in advance。",
        "distractorExclude": "同为动词原形的trigger（触发）与in advance（提前）组合为“提前触发应对策略”，不符合逻辑；shed（阐明）不与coping strategies构成动宾搭配。",
        "wordUsage": "v. 准备，筹备；常考搭配：prepare strategies in advance（提前准备策略）。"
      },
      "10": {
        "sentenceZh": "她说，这些发现还可能阐明人们在改变饮食习惯时面临的障碍——这些障碍可能会导致人们中途放弃治疗。",
        "posRule": "情态动词may also后缺少动词原形，与紧随其后的light on构成固定动词短语。",
        "distractorExclude": "同为动词原形的prepare（准备）和trigger（触发）均无法与名词light及介词on构成“阐明，使……更清楚”的固定习语。",
        "wordUsage": "v. 散发，投射；高频习语：shed light on ...（阐明……，为……提供新线索）。"
      }
    },
    "steps": [
      "第一步秒杀四大黄金搭配：第1空physical and psychological、第2空quitting smoking、第8空Raising awareness、第10空shed light on。",
      "第二步解决唯二的三单动词槽位：第3空研究提供首个证据（offers），第5空时间跨度相平行（parallels）。",
      "第三步解决唯二的副词槽位：第4空修饰比较级且时间跨度为第2至5天，排除permanently选significantly。",
      "第四步匹配剩余形容词与原形动词：第6空有争议话题（controversial），第7空诱发症状（trigger），第9空提前准备策略（prepare）。"
    ],
    "pitfall": "第5空是典型一词多性陷阱：很多同学只认识parallel作形容词或名词，忽略了它作及物动词时意为“与……相似/相当”，导致在which后不敢选择G。",
    "vocabHighlights": [
      {
        "word": "parallel",
        "meaning": "v. 与……相似，比得上；adj. 平行的"
      },
      {
        "word": "controversial",
        "meaning": "adj. 有争议的，引起争论的"
      },
      {
        "word": "trigger",
        "meaning": "v. 引发，触发（trigger symptoms）"
      },
      {
        "word": "awareness",
        "meaning": "n. 意识，认知（raise awareness）"
      },
      {
        "word": "shed light on",
        "meaning": "v.+n.+prep. 阐明，使……更清楚"
      }
    ]
  },
  "q_clz_04": {
    "stemZh": "短文围绕运动强度如何影响情绪收益展开：第一段对比身体健康指南完备而情绪指南缺失的现状；第二段区分有氧运动与无氧运动的供能机制与强度差异；第三段指出有氧运动在情绪收益上的研究结果相互矛盾；第四段得出无氧运动以中等强度改善情绪最佳。",
    "why": "本文10个空格包含形容词4个（第1空detailed、第7空vigorous、第8空contradictory、第10空moderate）、名词2个（第5空distinction、第9空difference）、三单动词1个（第6空involves）、过去分词1个（第2空required）、动名词1个（第4空dipping）和副词1个（第3空partly）。全篇最大特点是上下文直接给出强提示：例如第8空后文列举三种相反结论对应contradictory，第10空后文排除low与high对应moderate，第4空动名词池仅有dipping和falling二选一。",
    "posNote": "词性识别要点：1. 形容词：第1空修饰guidelines；第7空修饰intensity且对照lifting heavy weights；第8空修饰results；第10空修饰intensity。2. 副词（-ly结尾）：第3空位于is与due to之间修饰原因介词短语，在partly与traditionally中二选一。3. 动名词（-ing结尾）：第4空在介词Before后作宾语，词库仅有dipping和falling。4. 过去分词：第2空在exercise后作后置定语。5. 名词与三单动词：第5空在an important后、第9空在make no后；第6空在单数主语The former后。",
    "blankDetails": {
      "1": {
        "sentenceZh": "然而，尽管大多数国家都有详尽且有证据支持的指南来说明各种身体健康益处所需的运动类型和强度，但针对运动与情绪的此类指南尚不存在。",
        "posRule": "动词have的宾语是evidence-backed guidelines，空格位于have与形容词evidence-backed之间，须填形容词共同修饰guidelines。",
        "distractorExclude": "同为形容词的contradictory（矛盾的）与evidence-backed（有证据支持的）褒贬冲突；moderate（适度的）和vigorous（剧烈的）通常用来形容运动强度，不形容指南文档。",
        "wordUsage": "adj. 详细的，详尽的；常考搭配：detailed guidelines（详尽的指南）。"
      },
      "2": {
        "sentenceZh": "然而，尽管大多数国家都有详尽且有证据支持的指南来说明各种身体健康益处所需的运动类型和强度，但针对运动与情绪的此类指南尚不存在。",
        "posRule": "the type and intensity of exercise后紧接for various physical health benefits，此处缺少过去分词作后置定语，表示“（实现健康益处）所需要的”。",
        "distractorExclude": "词库中另一个过去分词notified（被通知的）主语通常是人，不能说“被通知的运动类型和强度”。",
        "wordUsage": "v. 需要，要求（过去分词）；常见后置定语结构：... required for ...（……所需的……）。"
      },
      "3": {
        "sentenceZh": "这在一定程度上是由于缺乏必要的证据。",
        "posRule": "is与表语due to ... 之间缺少副词作程度状语，说明原因的构成比例。",
        "distractorExclude": "词库中另一个副词traditionally（传统上）用于描述历来习惯，而“缺乏必要科学证据”并非传统习惯，而是客观原因之一。",
        "wordUsage": "adv. 部分地，在一定程度上；高频因果表达：be partly due to ...（部分归因于……）。"
      },
      "4": {
        "sentenceZh": "在深入探讨其中一些关键要点之前，该综述中作出的一个重要区分在于有氧运动与无氧运动之间。",
        "posRule": "介词Before后需要动名词作宾语，且与紧随其后的介词into构成动介搭配，表示“简要浏览/探讨要点”。",
        "distractorExclude": "词库中另一个-ing词falling（falling into意为“落入、分成”）不能以key take-aways（核心要点）为对象表达“在探讨要点前”。",
        "wordUsage": "v. 浏览，简要涉猎（现在分词/动名词）；常考搭配：dip into ...（浏览/涉猎……）。"
      },
      "5": {
        "sentenceZh": "在深入探讨其中一些关键要点之前，该综述中作出的一个重要区分在于有氧运动与无氧运动之间。",
        "posRule": "an important ___ made in the review为主句主语，且后文紧接between aerobic exercise and anaerobic，须填单数名词表示“区分”。",
        "distractorExclude": "同为名词的decision（决定）不能表达综述对两个学术概念的界定；difference（差异）虽常与between连用，但“make a ___ between A and B”中“区分”的规范动宾搭配是make a distinction（区别于make a difference“产生影响”）。",
        "wordUsage": "n. 区分，差别；高频固定搭配：make a distinction between A and B（区分A与B）。"
      },
      "6": {
        "sentenceZh": "前者包括散步、慢跑和骑行等活动，意味着以一种使身体能够利用氧气燃烧脂肪产生能量的方式进行锻炼。",
        "posRule": "单数主语The former（指代有氧运动）后缺少第三人称单数谓语动词，后接具体运动举例such things as walking, jogging and cycling。",
        "distractorExclude": "词库中另一个三单动词constitutes（构成，组成）逻辑方向相反：应是“散步、慢跑等具体项目构成有氧运动”，而不能说“有氧运动构成这些具体项目”；总概念包含下属具体项目必须用involves。",
        "wordUsage": "v. 包含，涉及（三单）；常用于总类概念引出具体内容：A involves such things as B and C。"
      },
      "7": {
        "sentenceZh": "相比之下，无氧运动——例如举重——具有如此高的强度，以至于你的身体没有时间利用氧气来产生能量，因此转而分解血液或肌肉中的葡萄糖。",
        "posRule": "“of such ___ intensity that ...”结构中，名词intensity前缺少形容词作定语；结合破折号内的举例lifting heavy weights（举重），应填高强度类形容词。",
        "distractorExclude": "同为形容词的moderate（适度的）与举重及“身体来不及用氧气供能”的高负荷状态不符；detailed和contradictory均不修饰运动强度。",
        "wordUsage": "adj. 剧烈的，高强度的；常考搭配：vigorous intensity / vigorous exercise（剧烈强度/剧烈运动）。"
      },
      "8": {
        "sentenceZh": "首先从运动强度对有氧运动情绪益处的影响入手，深圳大学John Chan领导的研究人员从19项相关研究中发现了相互矛盾的结果。",
        "posRule": "found ___ results中缺少前置定语形容词；后句立刻说明有的支持高强度、有的支持低强度、还有七项称无影响，故results具有“彼此冲突”特征。",
        "distractorExclude": "同为形容词的detailed（详尽的）不能概括后文三派分歧；vigorous和moderate均不修饰research results。",
        "wordUsage": "adj. 相互矛盾的，不一致的；常考搭配：contradictory results/findings（相互矛盾的研究结果）。"
      },
      "9": {
        "sentenceZh": "一些研究偏爱高强度，另一些偏爱低强度，而七项研究发现强度对情绪益处没有任何影响。",
        "posRule": "“made no ___ to mood benefits”为固定动宾搭配，空格处须填名词构成“对……没有影响/作用”。",
        "distractorExclude": "同为名词的decision（决定）和distinction（区分）均无法填入make no ___ to句型来表达“毫无影响”。",
        "wordUsage": "n. 影响，差别；四级必背习语：make no difference to ...（对……没有影响）。"
      },
      "10": {
        "sentenceZh": "然而，就无氧运动的强度而言，结果要清晰得多——改善情绪的最佳选择是中等强度，也许是因为低强度太枯燥而高强度又太令人不适。",
        "posRule": "系动词is后与名词intensity构成表语，须填形容词；由于后半句排除了low intensity和high intensity，此处需填居于两者之间的强度形容词。",
        "distractorExclude": "同为形容词的vigorous（剧烈的）与后半句“high intensity is too unpleasant（高强度太难受）”语义矛盾；detailed和contradictory均不描述强度等级。",
        "wordUsage": "adj. 适度的，中等的；常考搭配：moderate intensity（中等强度）。"
      }
    },
    "steps": [
      "第一步利用最小词性池速杀三空：副词仅有partly和traditionally，第3空partly due to锁定L；动名词仅有dipping和falling，第4空Before dipping into锁定F；过去分词仅有notified和required，第2空required for锁定M。",
      "第二步拿下固定名词搭配：第5空make a distinction between A and B选G，第9空make no difference to选E。",
      "第三步辨析三单动词逻辑方向：第6空主语为总概念“有氧运动”，宾语为下属举例“散步慢跑”，应选involves而非constitutes。",
      "第四步根据上下文举例与排除法定夺四个形容词：第1空detailed guidelines、第7空举重对应vigorous intensity、第8空三种分歧对应contradictory results、第10空排除低和高对应moderate intensity。"
    ],
    "pitfall": "第6空constitutes和involves方向最容易搞反：请记住“整体 involve 部分”（如Aerobic exercise involves walking），而“部分 constitute 整体”（Walking and jogging constitute aerobic exercise）；第5空也要区分make a distinction（区分）与make a difference（产生影响）。",
    "vocabHighlights": [
      {
        "word": "distinction",
        "meaning": "n. 区分，差别（make a distinction between）"
      },
      {
        "word": "vigorous",
        "meaning": "adj. 剧烈的，高强度的"
      },
      {
        "word": "contradictory",
        "meaning": "adj. 相互矛盾的，对立的"
      },
      {
        "word": "moderate",
        "meaning": "adj. 适度的，中等的"
      },
      {
        "word": "partly due to",
        "meaning": "adv.+adj.+prep. 部分归因于"
      }
    ]
  },
  "q_clz_05": {
    "stemZh": "短文介绍了一项关于语言“交际抽象度”的性别差异研究：第一段定义什么是抽象表达，并指出男性比女性更倾向于使用抽象语言；第二段说明研究团队通过对60多万篇博客中约4万个常用词的抽象度评分得出这一结论。",
    "why": "本精练组5个空格分别精准考查形容词2个（第1空ultimate、第5空difficult）、动名词1个（第2空attaining）、名词1个（第3空conclusion）和副词1个（第4空approximately）。做题时可先依据介词短语、数字修饰和不定式表语槽位将每空候选词压缩到1至2个，再借助“抽象 vs 具体”、“容易具象化 vs 难以具象化”的反义对照及动词及物性验证即可零失误作答。",
    "posNote": "词性识别要点：1. 形容词：第1空在and后与broader并列修饰名词purpose；第5空在were more与to visualize之间作表语形容词。2. 动名词（-ing结尾）：第2空在介词of后且后接名词宾语action，必须在attaining与refraining中选及物动词。3. 名词：第3空在arrive at this后作宾语。4. 副词（-ly结尾）：第4空紧贴数字40,000之前作约数修饰。",
    "blankDetails": {
      "1": {
        "sentenceZh": "研究人员表示，交际抽象反映了人们倾向于使用“关注宏观图景和行动终极目的的抽象语言，而非关注细节和实现行动方式的具体语言”。",
        "posRule": "and连接并列成分the broader picture and ___ purpose，名词purpose前缺少修饰性形容词，且需与rather than后的details（细节）构成宏观与终极意义的对照。",
        "distractorExclude": "同为形容词的fixed（固定的）无法与broader picture构成抽象宏观语义的呼应；difficult（困难的）与“关注宏观目的”无关。",
        "wordUsage": "adj. 最终的，终极的；高频搭配：ultimate purpose/goal（终极目的/目标）。"
      },
      "2": {
        "sentenceZh": "研究人员表示，交际抽象反映了人们倾向于使用“关注宏观图景和行动终极目的的抽象语言，而非关注细节和实现行动方式的具体语言”。",
        "posRule": "介词of后须接动名词作宾语，且空格后直接带名词action作该动作的宾语，因此必须填入及物动词的-ing形式。",
        "distractorExclude": "词库中另一个-ing动词refraining（克制，戒除）是不及物动词，必须搭配介词from（refrain from doing），不能直接跟名词action。",
        "wordUsage": "v. 实现，达到，获得（动名词）；常考搭配：attain a goal/purpose/action（实现目标/行动）。"
      },
      "3": {
        "sentenceZh": "为了得出这一结论，研究人员考察了网上发表的60多万篇博客文章中男性和女性的语言模式。",
        "posRule": "arrive at this ___ 构成动宾搭配，this后须填单数名词来回指上段末尾“男性更倾向使用抽象语言”的研究发现。",
        "distractorExclude": "同为名词的source（来源）不与arrive at搭配；signals（信号）为复数名词，既不能跟在单数指示代词this后，也不与arrive at连用。",
        "wordUsage": "n. 结论，推论；四级高频动宾搭配：arrive at / draw / reach a conclusion（得出结论）。"
      },
      "4": {
        "sentenceZh": "为此，研究人员计算了英语中大约4万个常用词的抽象度评分。",
        "posRule": "位于介词for与基数词40,000之间，缺少表示概数估算的副词来修饰数量。",
        "distractorExclude": "同为副词的legally（合法地）和significantly（显著地）均不能直接置于整数40,000前表示“大约”。",
        "wordUsage": "adv. 大约，将近；常紧接数字、年份或比例之前。"
      },
      "5": {
        "sentenceZh": "更难在脑海中浮现的词——例如“正义”或“道德”——被认为更加抽象。",
        "posRule": "were more ___ to visualize中缺少表语形容词构成“be + adj. + to do”结构；前句给出具体词easily visualized，此处应填反义难度形容词。",
        "distractorExclude": "同为形容词的fixed（固定的）和ultimate（终极的）均不用于表达“难以在脑海具象化”，只有difficult与前句easily形成直接反义呼应。",
        "wordUsage": "adj. 困难的；常用句型：be difficult to visualize/understand（难以具象化/理解）。"
      }
    },
    "steps": [
      "第一步优先处理词性唯一且线索极强的两空：第3空固定搭配arrive at this conclusion（C），第4空数字前约数副词approximately 40,000（A）。",
      "第二步解决第2空动名词二选一：利用refrain必须接from的不及物属性，果断排除refraining，锁定及物动名词attaining（B）。",
      "第三步利用语篇对比锁定两个形容词：第1空与details相对、与broader picture并列，选ultimate（O）；第5空与前句easily visualized反义对照，选difficult（D）。"
    ],
    "pitfall": "第2空是典型动词及物性陷阱：词库故意同时放入attaining和refraining两个-ing词，很多只看后缀不看及物性的同学会误选，务必记住refrain后必须跟介词from。",
    "vocabHighlights": [
      {
        "word": "ultimate",
        "meaning": "adj. 最终的，终极的（ultimate purpose）"
      },
      {
        "word": "attain",
        "meaning": "v. 达到，实现，获得"
      },
      {
        "word": "approximately",
        "meaning": "adv. 大约，将近"
      },
      {
        "word": "conclusion",
        "meaning": "n. 结论（arrive at a conclusion）"
      },
      {
        "word": "visualize",
        "meaning": "v. 使形象化，在脑海中浮现"
      }
    ]
  },
  "q_clz_06": {
    "stemZh": "短文探讨员工被机器人取代与被同事取代时的心理冲击差异：第一、二段指出学界对技术替代下工人反应的调查匮乏并介绍跨国调查；第三段揭示“谈他人时偏好由人替代、轮到自己时反而觉得被机器替代没那么难受”的反转现象；第四段解释人更少拿自己与机器攀比从而自尊受创更小。",
    "why": "本精练组5个空格重点考查副词2个（第3空favorably、第5空seemingly）、动词原形1个（第2空react）、三单动词1个（第4空reverses）以及名词1个（第1空debate）。解题关键在于抓住“原则上赞成 vs 涉及自身时偏好逆转”的语篇态度翻转，同时严格辨别第4空动词的及物与不及物属性，避开高频干扰词contradicts。",
    "posNote": "词性识别要点：1. 名词：第1空位于intensive academic后、介词on前，需要抽象单数/不可数名词。2. 动词原形：第2空在复数主语workers后作从句谓语，且与介词to搭配。3. 副词（-ly结尾）：第3空修饰动词view it；第5空位于these与形容词paradoxical之间修饰形容词。4. 三单动词（-s结尾）：第4空主语为单数This preference，后紧跟逗号无宾语，须填不及物三单动词。",
    "blankDetails": {
      "1": {
        "sentenceZh": "尽管学术界对这些发展进行了激烈的讨论，但关于工人如何应对被技术取代的研究却寥寥无几。",
        "posRule": "介词Despite后接名词短语intensive academic ___，形容词academic后缺少核心名词，且须能搭配介词on。",
        "distractorExclude": "同为名词的introduction（引入）不能说“密集的学术引入”；disruptions（中断，混乱）和modifications（修改）均为复数名词且不与academic ___ on搭配表达学术讨论。",
        "wordUsage": "n. 争论，讨论；常见学术搭配：academic debate on ...（关于……的学术讨论）。"
      },
      "2": {
        "sentenceZh": "尽管学术界对这些发展进行了激烈的讨论，但关于工人如何应对被技术取代的研究却寥寥无几。",
        "posRule": "how引导的从句中，复数主语workers后缺少动词原形谓语，且后面紧接介词to + being replaced构成固定搭配。",
        "distractorExclude": "同为动词原形的compare（比较）虽可接to，但compare A to B表示“把A比作B”，空格前无宾语且语义不合；guarantee（保证）不与to being replaced搭配。",
        "wordUsage": "v. 作出反应，应对；高频搭配：react to (doing) sth.（对……作出反应）。"
      },
      "3": {
        "sentenceZh": "研究结果显示：原则上，当工人被其他人而非机器人或智能软件取代时，大多数人对此抱有更赞许的态度。",
        "posRule": "view it more ___ 中，动词view后有宾语it，空格处需要副词修饰动词view，表达赞同或否定的态度，且与下句This preference相呼应。",
        "distractorExclude": "同为副词的drastically（急剧地）虽可修饰变化，但不修饰view表达“更认可、更偏爱”；seemingly（看似）用于形容表面特征，不表示积极赞同。",
        "wordUsage": "adv. 赞许地，有利地，积极地；常考搭配：view ... favorably（对……持赞许态度）。"
      },
      "4": {
        "sentenceZh": "然而，当涉及人们自己的工作时，这种偏好就会发生逆转。",
        "posRule": "单数主语This preference后缺少第三人称单数谓语动词；由于空格后紧接逗号（, however,），此处必须填入不及物动词。",
        "distractorExclude": "同为三单动词的contradicts（反驳，与……矛盾）和poses（造成，构成）均是及物动词，后面必须直接跟宾语，语法上不能直接加逗号结束分句。",
        "wordUsage": "v. 逆转，彻底反转（三单）；既可作及物动词也可作不及物动词（如This preference reverses）。"
      },
      "5": {
        "sentenceZh": "研究人员也找出了这些看似自相矛盾的结果背后的原因：人们往往更少拿自己与机器相比，而不是与其他人相比。",
        "posRule": "位于指示代词these与形容词paradoxical之间，缺少副词来修饰形容词paradoxical，表示“表面上看起来”。",
        "distractorExclude": "同为副词的drastically（急剧地）和favorably（赞许地）均无法自然修饰paradoxical（自相矛盾的），且后文立刻给出了合理解释，说明矛盾只是“表面上的”。",
        "wordUsage": "adv. 表面上，看似；常考搭配：seemingly paradoxical / contradictory（看似自相矛盾的）。"
      }
    },
    "steps": [
      "第一步利用介词搭配秒杀前两空：第1空academic debate on（D），第2空workers react to（M）。",
      "第二步借“This preference”与转折词however联动破第3、4空：既然下句称前句态度为“偏好”，第3空必为积极态度副词favorably（G）；第4空遇however发生反转且空后无宾语，选不及物动词reverses（N）。",
      "第三步处理第5空形容词前副词修饰：后文紧跟因果解释，说明结果只是“表面上看似”矛盾，锁定seemingly（O）。"
    ],
    "pitfall": "第4空极易误选同为三单动词的contradicts（B）：只看意思觉得“矛盾”好像通顺，却忘了contradict是及物动词（必须说A contradicts B），而空格后紧接逗号没有宾语，只有不及物用法的reverses成立。",
    "vocabHighlights": [
      {
        "word": "debate on",
        "meaning": "n.+prep. 关于……的讨论/争论"
      },
      {
        "word": "react to",
        "meaning": "v.+prep. 对……作出反应"
      },
      {
        "word": "favorably",
        "meaning": "adv. 赞许地，有利地（view ... favorably）"
      },
      {
        "word": "reverse",
        "meaning": "v. 逆转，颠倒（可作不及物动词）"
      },
      {
        "word": "seemingly",
        "meaning": "adv. 表面上，看似（seemingly paradoxical）"
      }
    ]
  },
  "q_clz_07": {
    "stemZh": "短文讲述了曼彻斯特一座办公大楼的绿色翻新史：1962年大楼初建时外墙贴有薄方石块，但此后40年不断脱落；在大规模翻新中，业主CIS与Solarcentury公司合作将整栋楼覆满垂直太阳能板，使其在2004年成为欧洲最大的垂直太阳能板集合工程并获评十大绿色能源项目。",
    "why": "本精练组5个空格结构非常规整，前3空集中考查动词过去分词与过去式（第1空constructed、第2空undertaken、第3空consulted），后2空集中考查高频名词搭配（第4空collection、第5空scale）。只要看清第1、2空是“be + 过去分词”被动语态、第3空是主动过去式接公司作宾语，并结合第5空固定介词短语on such a large scale，即可高效全对。",
    "posNote": "词性识别要点：1. 过去分词（-ed/-en结尾）：第1空位于was first与in 1962之间构成被动语态；第2空位于a major renovation was之后同样构成被动语态。2. 一般过去式及物动词：第3空在主语CIS与宾语the solar panel company之间，须填及物动词过去式。3. 名词：第4空在Europe's largest与介词of之间作表语名词；第5空在介词短语on such a large后作宾语。",
    "blankDetails": {
      "1": {
        "sentenceZh": "1962年这座塔楼首次建成时，表面覆盖着薄薄的方形石块。",
        "posRule": "was first ___ in 1962构成一般过去时被动语态，主语the tower（大楼）后须填表示“建造”的过去分词。",
        "distractorExclude": "同为过去分词的discovered（被发现）用于自然事物或科学规律，不用于人工兴建的摩天大楼；undertaken（被着手进行）通常搭配项目、工程或调查，不直接搭配具体建筑物tower。",
        "wordUsage": "v. 建造，修建（过去分词）；常见被动搭配：be constructed in + 年份（于某年建成）。"
      },
      "2": {
        "sentenceZh": "这些小方石成了大楼的隐患，在接下来的40年里不断从外立面脱落，直到开展了一次大规模翻新。",
        "posRule": "a major renovation was ___ 构成一般过去时被动语态，须填能够与renovation（翻新工程）搭配的及物动词过去分词。",
        "distractorExclude": "同为过去分词的constructed（建造）不与“翻新（renovation）”构成动宾搭配；discovered（发现）语义不合“主动实施翻新工程”的事实。",
        "wordUsage": "v. 着手进行，承担，开展（过去分词）；工程题材高频搭配：undertake a renovation/project（开展翻新/项目）。"
      },
      "3": {
        "sentenceZh": "在这次翻新期间，大楼业主CIS公司咨询了太阳能电池板公司Solarcentury。",
        "posRule": "主语the building's owners, CIS后缺少一般过去时及物动词谓语，直接以the solar panel company作宾语。",
        "distractorExclude": "同为过去式的competed（竞争）是不及物动词，与对手搭配必须加with（compete with），不能直接接宾语；discovered（发现）不能自然衔接下句“双方达成一致（They agreed）”。",
        "wordUsage": "v. 咨询，请教，商议（过去式）；常考搭配：consult a company/an expert（咨询某公司/专家）。"
      },
      "4": {
        "sentenceZh": "2004年，完工后的CIS大厦成为欧洲最大的垂直太阳能板集合群。",
        "posRule": "Europe's largest ___ of vertical solar panels中，形容词最高级largest后需要可数名词单数作表语中心词。",
        "distractorExclude": "同为名词的production（生产，产量）不符事实——办公楼外墙只是安装了太阳能板而非工厂生产电池板；height（高度）与dimension（维度）均不与of vertical solar panels搭配表达整栋楼覆满电池板。",
        "wordUsage": "n. 集合，汇集物，藏品；常考搭配：a collection of ...（一批/一组……）。"
      },
      "5": {
        "sentenceZh": "此后，如此大规模的垂直太阳能项目从未被复制过。",
        "posRule": "“on such a large ___”构成固定介词短语作后置定语修饰project，须填表示“规模”的单数名词。",
        "distractorExclude": "同为名词的dimension（维度）、height（高度）和range（范围）均不能填入“on such a large ___”构成表示“大规模地”的固定短语。",
        "wordUsage": "n. 规模，尺度；四级必背固定短语：on a large scale（大规模地）。"
      }
    },
    "steps": [
      "第一步区分前3空动词的被动与主动：第1、2空均为was + 过去分词（建楼选constructed，开展翻新选undertaken），第3空为主动过去式接公司作宾语（咨询商议选consulted）。",
      "第二步秒杀第5空固定短语：看到on such a large立即锁定scale（N）。",
      "第三步辨析第4空名词语义：大楼外立面布满太阳能板属于汇集起来的整组设施，排除“生产”与“高度”，锁定collection（C）。"
    ],
    "pitfall": "第3空容易错选competed（竞争）：一是因为不懂compete是不及物动词，后面必须有with或against才能接公司；二是因为没有往后多读一句They agreed to cover...（双方同意合作），误以为两家公司是竞争关系。",
    "vocabHighlights": [
      {
        "word": "construct",
        "meaning": "v. 建造，构建（过去分词 constructed）"
      },
      {
        "word": "undertake",
        "meaning": "v. 着手进行，承担（过去分词 undertaken）"
      },
      {
        "word": "consult",
        "meaning": "v. 咨询，商议（及物动词）"
      },
      {
        "word": "collection",
        "meaning": "n. 集合，组群，收集物"
      },
      {
        "word": "on a large scale",
        "meaning": "prep.+n. 大规模地"
      }
    ]
  },
  "q_clz_08": {
    "stemZh": "短文介绍旧金山初创公司Aclima的空气污染监测方案：第一段交代南加州长期受雾霾困扰而兼具技术创新优势；第二段说明Aclima正测试旨在生成室外逐分钟污染地图的监测站；第三段指出其与谷歌街景合作，记录公交罢工期间的污染高峰与骑行上班日的污染低谷。",
    "why": "本精练组5个空格涵盖过去分词1个（第1空intended）、形容词1个（第2空outdoor）、现在分词/动名词2个（第3空collaborating、第5空creating）以及复数名词1个（第4空inhabitants）。题干线索极具逻辑性：第2空紧靠下句also ... inside buildings形成“室外 vs 室内”直接对比，第1、3空依靠介词to和with瞬间确定，第4空则需辨析城市居民与消费者概念边界。",
    "posNote": "词性识别要点：1. 过去分词：第1空在are与不定式to yield之间构成“be + 过去分词 + to do”结构。2. 形容词：第2空修饰名词短语air pollution，位置在名词前作定语。3. 现在分词（-ing结尾）：第3空在has been之后构成现在完成进行时，且后接介词with；第5空在介词by之后作动名词，且后接名词宾语pollution lows。4. 复数名词（-s结尾）：第4空位于所有格the city's后、复数动词were forced之前。",
    "blankDetails": {
      "1": {
        "sentenceZh": "该公司一直在试用监测站，这些监测站旨在生成室外空气污染的逐分钟地图。",
        "posRule": "that引导的定语从句中，are ___ to yield构成“be + 过去分词 + to do”固定搭配，说明监测站的设计目的。",
        "distractorExclude": "同为过去分词的assisted（被协助）不能用于“be assisted to do”表达装置用途；restricted（受限制的）表示“被限制去生成”，与研发监测系统的积极意图完全相反。",
        "wordUsage": "v. 打算，旨在（过去分词）；高频被动搭配：be intended to do sth.（旨在做某事，用来做某事）。"
      },
      "2": {
        "sentenceZh": "该公司一直在试用监测站，这些监测站旨在生成室外空气污染的逐分钟地图。",
        "posRule": "介词of后接名词短语air pollution，空格处缺少前置定语形容词；下一句出现also ... inside buildings（室内），反推此处指“室外的”。",
        "distractorExclude": "同为形容词的domestic（国内的，家庭的）与下句“建筑物内部（inside buildings）”无法构成空间对称的“室外—室内”对照关系。",
        "wordUsage": "adj. 室外的，户外的；常考对比搭配：outdoor air pollution vs. indoor / inside buildings。"
      },
      "3": {
        "sentenceZh": "为此，Aclima一直与谷歌的街景系统合作。",
        "posRule": "has been ___ with ... 构成现在完成进行时，此处缺少不及物动词的现在分词，且固定与介词with搭配表示“与……合作”。",
        "distractorExclude": "同为-ing形式的creating（创造）是及物动词，不与介词with搭配表示两家机构的合作关系。",
        "wordUsage": "v. 合作，协作（现在分词）；高频固定搭配：collaborate with sb.（与某方合作）。"
      },
      "4": {
        "sentenceZh": "Aclima老板达维达·赫茨尔说，当旧金山公交工人罢工、该市居民被迫开车出行时，他们监测到了污染峰值。",
        "posRule": "所有格the city's后且在复数助动词were之前，须填复数指人名词作从句主语，表示“被迫开车的人”。",
        "distractorExclude": "同为复数名词的consumers（消费者）侧重购买商品的人，而公交罢工影响的是整座城市的通勤市民；pollutants（污染物）本身无法“被迫开车”。",
        "wordUsage": "n. 居民，栖居者（常用复数）；与residents近义，常搭配city's inhabitants。"
      },
      "5": {
        "sentenceZh": "相反，“骑车上班日”则通过带来污染低谷发挥了作用。",
        "posRule": "介词by后须接动名词作方式状语，且后面紧跟名词短语pollution lows作宾语，因此须填及物动词的-ing形式。",
        "distractorExclude": "同为-ing形式的collaborating（合作）是不及物动词，不能直接以pollution lows作宾语，且已在第3空使用。",
        "wordUsage": "v. 创造，带来，产生（动名词）；常考搭配：by creating ...（通过带来/创造……）。"
      }
    },
    "steps": [
      "第一步利用介词搭配拿下两处动词：第1空be intended to yield（旨在生成 -> K），第3空collaborating with（与……合作 -> B）。",
      "第二步借跨句线索破解第2空：紧跟下句的also ... inside buildings说明前面先讲室外，直接锁定outdoor（L）。",
      "第三步按词义精度与及物性完成收尾：第4空公交罢工波及城市居民（inhabitants -> I），第5空介词by后接及物动名词creating（E）。"
    ],
    "pitfall": "第4空极易在consumers（消费者）和inhabitants（居民）之间选错：看到复数名词就容易混淆，务必结合前文San Francisco's transit workers went on strike的市政通勤语境，确定主体是“城市居民”而非购物消费人群。",
    "vocabHighlights": [
      {
        "word": "be intended to",
        "meaning": "v.+prep. 旨在，打算用来"
      },
      {
        "word": "collaborate with",
        "meaning": "v.+prep. 与……合作"
      },
      {
        "word": "inhabitant",
        "meaning": "n. 居民，居住者"
      },
      {
        "word": "outdoor",
        "meaning": "adj. 室外的，户外的"
      },
      {
        "word": "create",
        "meaning": "v. 创造，带来，产生"
      }
    ]
  },
  "q_clz_09": {
    "stemZh": "短文介绍了鸽子和老鼠在人类疾病筛查中的惊人天赋：第一段点出它们虽非传统医疗帮手却身怀绝技；第二段讲述大脑只有食指尖大小的鸽子凭借出色视觉记忆可识别乳腺癌影像；第三段说明常被联系到传播疾病的老鼠凭借灵敏嗅觉能快速筛查结核病样本。",
    "why": "本精练组5个空格包含形容词2个（第1空superior、第4空visual）、名词2个（第2空nuisance、第3空tip）和过去分词1个（第5空associated）。解题时可以综合运用“转折与并列的感情色彩正负判断（第1空褒义、第2空贬义）”、“人体部位与介词固定搭配（the tip of、be associated with）”以及“下句解释线索（images对应visual）”。",
    "posNote": "词性识别要点：1. 形容词：第1空修饰skills且位于转折词but之后（褒义）；第4空修饰memory。2. 名词：第2空在an urban之后与dirty birds并列（贬义单数名词）；第3空在the与of your index finger之间。3. 过去分词：第5空位于are often与with之间构成被动短语。",
    "blankDetails": {
      "1": {
        "sentenceZh": "老鼠或鸽子或许不是照料病人的明显选择，但这些生物拥有一些卓越的技能，可以帮助治疗人类疾病。",
        "posRule": "but引导语义转折，some ___ skills中缺少前置定语形容词修饰skills，且感情色彩必须与前句“非明显选择”相反，呈积极褒义。",
        "distractorExclude": "同为形容词的suspicious（可疑的，怀疑的）呈贬义，与帮助治病的转折语义矛盾；slight（轻微的）语义过弱；sensitive（敏感的）通常形容人、动物感官或仪器，不形容skills。",
        "wordUsage": "adj. 卓越的，出众的，更胜一筹的；常考搭配：superior skills/abilities（出众的技能/能力）。"
      },
      "2": {
        "sentenceZh": "鸽子常被视为肮脏的鸟类和城市公害，但它们只是最新被发现有能力帮助人类的一长串动物中的一员。",
        "posRule": "dirty birds and an urban ___ 中，and连接两个并列名词性表语，冠词an和形容词urban后须填可数单数名词，且感情色彩须与dirty birds一致呈贬义。",
        "distractorExclude": "同为单数名词的peak（顶峰）和tip（尖端）均为表示空间位置的客观中性词，没有任何“讨厌之物、公害”的贬义。",
        "wordUsage": "n. 讨厌的人或物，公害，麻烦事；常见搭配：an urban nuisance（城市公害）。"
      },
      "3": {
        "sentenceZh": "尽管鸽子的大脑不比你的食指尖大多少，但它们拥有非常惊人的视觉记忆。",
        "posRule": "the ___ of your index finger为“the + 名词 + of + 名词”所属结构，须填表示手指末端的单数名词。",
        "distractorExclude": "词库中另一个表尖端/顶部的单数名词peak（山峰，峰值）通常指mountain peak或数值高峰，而人体手指、舌头或鼻子的末端固定使用tip。",
        "wordUsage": "n. 尖端，末梢；高频生活搭配：the tip of one's finger/tongue（指尖/舌尖）。"
      },
      "4": {
        "sentenceZh": "尽管鸽子的大脑不比你的食指尖大多少，但它们拥有非常惊人的视觉记忆。",
        "posRule": "very impressive ___ memory中，形容词impressive后紧接名词memory，缺少修饰memory类别的形容词，具体类别需看下句解释。",
        "distractorExclude": "同为形容词的sensitive（敏感的）、slight（轻微的）和suspicious（可疑的）均无法解释下句“detecting breast cancer in images（从医学图像中识别乳腺癌）”，只有visual直接对应images。",
        "wordUsage": "adj. 视觉的，视力的；常考搭配：visual memory（视觉记忆）。"
      },
      "5": {
        "sentenceZh": "老鼠常与传播疾病而非预防疾病联系在一起，但这种长尾动物非常敏感。",
        "posRule": "are often ___ with spreading disease构成“be + 过去分词 + with”固定被动搭配，表示“常被人们与……联系起来”。",
        "distractorExclude": "词库中另一个过去分词treated（被对待，被治疗）在句中不能构成“are treated with spreading disease”的合法语义搭配。",
        "wordUsage": "v. 联系，关联（过去分词）；四级超高频固定搭配：be associated with ...（与……联系在一起）。"
      }
    },
    "steps": [
      "第一步利用固定搭配秒杀两空：第3空the tip of your index finger（M），第5空are often associated with（A）。",
      "第二步运用“正负感情色彩法”破解第1、2空：第1空在but后赞美治病能力选褒义形容词superior（K）；第2空与dirty birds并列选贬义名词nuisance（D）。",
      "第三步往后多读一句锁定第4空：下句出现in images（在图像中），直接呼应“视觉记忆”visual memory（O）。"
    ],
    "pitfall": "第3空peak和tip词义接近，是高频近义辨析陷阱：peak指山顶、顶峰或数据最高点（如peak hour高峰时段），指尖、笔尖、小费才用tip。",
    "vocabHighlights": [
      {
        "word": "superior",
        "meaning": "adj. 卓越的，更胜一筹的"
      },
      {
        "word": "nuisance",
        "meaning": "n. 讨厌的人或物，公害"
      },
      {
        "word": "tip",
        "meaning": "n. 尖端，末梢（the tip of）"
      },
      {
        "word": "visual",
        "meaning": "adj. 视觉的（visual memory）"
      },
      {
        "word": "be associated with",
        "meaning": "v.+prep. 与……联系在一起"
      }
    ]
  },
  "q_clz_10": {
    "stemZh": "短文回顾20世纪90年代互联网在美国家庭与商业领域的普及：第一段简述互联网从国防部研发走向微处理器加速；第二段展开万维网因商业目的而兴起，带动机票酒店网购、高校网上发布研究资料供学生检索以及员工在家办公并在线提交工作。",
    "why": "本精练组5个空格包含形容词2个（第1空commercial、第4空valuable）、过去式/过去分词2个（第3空posted、第5空submitted）和复数名词1个（第2空reservations）。短文聚焦电商购票、酒店预订、网上发布资料与远程提交工作等熟悉场景，只要注意第5空与done并列构成被动语态，就能流畅拿下全部分数。",
    "posNote": "词性识别要点：1. 形容词：第1空位于介词for与复数名词purposes之间作定语；第4空修饰不可数名词information。2. 复数名词：第2空在名词hotel之后，与airline tickets、cars and homes并列构成“名词+名词”复合短语。3. 一般过去式及物动词：第3空在主语Universities与宾语research data之间。4. 过去分词：第5空位于could be done at home and之后，与done并列构成被动语态。",
    "blankDetails": {
      "1": {
        "sentenceZh": "20世纪90年代初，万维网的开发在很大程度上是出于商业目的。",
        "posRule": "介词for后接复数名词purposes，空格处须填前置定语形容词；紧接下句提到企业建主页卖商品（Corporations ... sell products），直接提示属性。",
        "distractorExclude": "同为形容词的limited（有限的）与后句在线购买汽车、房屋等广泛用途矛盾；local（当地的）不合万维网的全球属性；incoming（传入的）一般修饰信号或邮件，不修饰purposes。",
        "wordUsage": "adj. 商业的，盈利的；高频搭配：for commercial purposes（出于商业目的）。"
      },
      "2": {
        "sentenceZh": "很快，机票、酒店预订，甚至汽车和房屋都可以在网上购买。",
        "posRule": "airline tickets, hotel ___, and even cars and homes构成并列名词宾语，hotel后缺少复数名词构成常见旅游服务词组。",
        "distractorExclude": "同为复数名词的occupations（职业）语义荒谬，不能说在网上购买“酒店职业”。",
        "wordUsage": "n. 预订，预约（常用复数）；生活高频搭配：hotel reservations（酒店预订）。"
      },
      "3": {
        "sentenceZh": "大学在互联网上发布研究数据，因此学生不出宿舍就能找到有价值的信息。",
        "posRule": "主语Universities后缺少一般过去时及物动词谓语，以research data作宾语，且与介词短语on the Internet搭配。",
        "distractorExclude": "同为过去式的remained（依然，保持）是不及物系动词，后面不能接宾语research data；maintained（维持，保养）通常指维护系统或关系，不与on the Internet搭配表达“上传公布数据”。",
        "wordUsage": "v. 发布，张贴，公布（过去式）；网络高频搭配：post data/information on the Internet（在网上发布数据/信息）。"
      },
      "4": {
        "sentenceZh": "大学在互联网上发布研究数据，因此学生不出宿舍就能找到有价值的信息。",
        "posRule": "find ___ information中，不可数名词information前缺少正面评价的形容词作定语。",
        "distractorExclude": "同为形容词的limited（有限的）带有局限贬义，削弱了互联网便利学生的语义；incoming（进来的）多指外部传入信号，已在首段使用，此处强调信息对学生学习的用处。",
        "wordUsage": "adj. 有价值的，宝贵的；高频搭配：valuable information（有价值的信息）。"
      },
      "5": {
        "sentenceZh": "公司很快发现工作可以在家完成并在线提交，于是全新的远程办公阶层开始在家庭办公室谋生。",
        "posRule": "work could be done at home and ___ online中，and连接两个并列的过去分词与could be共同构成被动语态，意为“工作能被完成并被提交”。",
        "distractorExclude": "同为过去分词的equipped（配备，装备）通常以房间、机构或人作主语（be equipped with），不能说“工作被装备在网上”；maintained（维护）不合员工向公司交差的工作流程。",
        "wordUsage": "v. 提交，呈递（过去分词）；办公高频搭配：submit work/reports online（在线提交工作/报告）。"
      }
    },
    "steps": [
      "第一步借并列结构与后句提示破前两空：第1空呼应下句sell products选commercial（B），第2空与airline tickets并列选hotel reservations（M）。",
      "第二步理顺高校与学生信息流：大学在网上发布（posted -> K）数据，学生检索到有价值的（valuable -> O）信息。",
      "第三步核对第5空被动并列结构：work could be done ... and submitted（N）online，确保语法上同用过去分词。"
    ],
    "pitfall": "第5空容易只顾着看online而忘记前面隐藏的could be done，从而误选动词原形或把过去分词maintained（维护）错当成“提交工作”。",
    "vocabHighlights": [
      {
        "word": "commercial",
        "meaning": "adj. 商业的，盈利的（commercial purposes）"
      },
      {
        "word": "reservation",
        "meaning": "n. 预订，预约（hotel reservations）"
      },
      {
        "word": "post",
        "meaning": "v. 发布，张贴（post ... on the Internet）"
      },
      {
        "word": "valuable",
        "meaning": "adj. 有价值的，宝贵的"
      },
      {
        "word": "submit",
        "meaning": "v. 提交，呈递（过去分词 submitted）"
      }
    ]
  },
  "q_mat_01": {
    "stemZh": "许多人被大屏障岛吸引，是因为岛屿周围有极佳的垂钓地点。",
    "evidenceQuote": "Lots of people come here for the fantastic fishing spots around the island.",
    "evidenceZh": "许多人来到这里，是为了岛屿周围极佳的垂钓地点。",
    "why": "E 段集中介绍大屏障岛的自然风貌与多样的户外水上活动，并在倒数第二句明确指出很多人来这里是为了岛屿周围极佳的垂钓地点（Lots of people come here for the fantastic fishing spots around the island）。题干将“很多人来这里”改写为“许多人被大屏障岛吸引”，将“极佳的垂钓点”同义替换为 incredible fishing sites，前后语义与因果关系完全一致，因此精准匹配 E 段。",
    "paraphraseMap": [
      {
        "from": "Lots of people come here",
        "to": "Many people are attracted to Great Barrier Island",
        "note": "同义转述：“很多人来此”等价于“许多人被大屏障岛吸引”，由主动来访转为被动吸引视角。"
      },
      {
        "from": "fantastic fishing spots",
        "to": "incredible fishing sites",
        "note": "形容词与名词双重替换：fantastic（极好的）对应 incredible（绝佳的），spots（地点）对应 sites（场所）。"
      },
      {
        "from": "around the island",
        "to": "around it",
        "note": "代词指代简化：用 it 回指前文刚出现的 Great Barrier Island。"
      }
    ],
    "steps": [
      "拆解定位词：跳过全篇高频主题词 Great Barrier Island，锁定低频具体名词词组 fishing sites 作为核心扫描锚点。",
      "自上而下快速扫读 A–G 段主题：A–C 段写抵岛经历与夜空，D 段写无路灯等生活设施，E 段转入气候、海滩与户外活动。",
      "在 E 段后半部分迅速找到原词 fishing 及对应表达 fantastic fishing spots around the island。",
      "逐一核对主语（Many people）、原因（because of）与地点范围（around it），确认与 E 段完全吻合后作答。"
    ],
    "pitfall": "切勿因为 A、B 段提到星夜或 D 段提到岛上风光就陷入精读浪费时间；也不要被 E 段前面的观鸟、潜水、冲浪等并列活动干扰视线，直接扫读 fishing 即可在十秒内锁定。",
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
      },
      {
        "word": "wilderness",
        "meaning": "n. 荒野，未开发的自然区域"
      },
      {
        "word": "sheltered",
        "meaning": "adj. 受庇护的，背风的"
      }
    ]
  },
  "q_mat_02": {
    "stemZh": "奇怪的是，大屏障岛上的光污染主要来自北方一座遥远的岛屿。",
    "evidenceQuote": "'It's odd but when the light readings were done,' said Hilde, explaining how the island was awarded its special status, 'they found there was more light pollution on the northern side coming from Fiji, which is about 3,000 km away, than Auckland to the south. It's pretty dark!'",
    "evidenceZh": "“说来奇怪，在进行光照读数测量时，”希尔德在解释该岛如何获得这一特殊称号时说道，“他们发现北侧来自约三千公里外斐济的光污染，居然比南边奥克兰那边的还要多。这里确实非常暗！”",
    "why": "G 段后半部分引用了暗夜大使希尔德对岛屿光照测量的介绍：说来奇怪（It's odd），测量结果显示岛屿北侧来自约三千公里外斐济的光污染，竟然多于南方的奥克兰。题干中的 strange 精准对应原文的 odd，faraway island 概括了“约三千公里外的斐济”，to the north 对应 on the northern side，完整覆盖全部核心信息，因此锁定 G 段。",
    "paraphraseMap": [
      {
        "from": "It's odd",
        "to": "It is strange",
        "note": "同义形容词替换：odd 与 strange 均表示“奇怪的、出人意料的”，作表语引出反常现象。"
      },
      {
        "from": "more light pollution on the northern side",
        "to": "light pollution ... mainly comes from ... to the north",
        "note": "句式重组：将“北侧有更多光污染”整合转述为“光污染主要来自北方”。"
      },
      {
        "from": "Fiji, which is about 3,000 km away",
        "to": "a faraway island",
        "note": "具体地理信息概括：将“距离约三千公里的斐济”抽象概括为“遥远的岛屿”。"
      }
    ],
    "steps": [
      "提取三重定位锚点：态度词 strange（奇怪）、核心短语 light pollution（光污染）以及方位词 to the north（北方）。",
      "快速扫读 A–F 段：D 段只提到没有路灯（no streetlights）与缺乏光线（lack of light），未涉及“来自北方的光污染”，果断跳过。",
      "继续扫读至 G 段末尾，定位到关键词 light readings 与 light pollution，并看到具体距离数字 3,000 km away。",
      "核对态度的 odd 与方位 northern side，确认光污染主要来源为北方遥远的斐济，锁定答案 G。"
    ],
    "pitfall": "本题最大干扰段是 D 段，因为 D 段出现了 no streetlights 和 lack of light 等与“光”相关的表达，但 D 段并未解释光污染的来源与方位，切忌见到“光”字就草率选择 D 段。",
    "vocabHighlights": [
      {
        "word": "odd",
        "meaning": "adj. 奇怪的，反常的（对应题干 strange）"
      },
      {
        "word": "light pollution",
        "meaning": "n. 光污染"
      },
      {
        "word": "ambassador",
        "meaning": "n. 大使，推广代表"
      },
      {
        "word": "reading",
        "meaning": "n. （仪器测得的）读数，数值"
      },
      {
        "word": "award",
        "meaning": "v. 授予，颁发"
      }
    ]
  },
  "q_mat_03": {
    "stemZh": "失智症指的是诸如记忆力和逻辑推理能力在内的多种心理能力的丧失。",
    "evidenceQuote": "Dementia, as defined in medical dictionaries, is a broad term that describes a loss of thinking ability, memory, attention, logical reasoning, and other mental abilities.",
    "evidenceZh": "正如医学词典所界定的那样，失智症是一个宽泛的术语，用来描述思维能力、记忆力、注意力、逻辑推理能力以及其他心理能力的丧失。",
    "why": "题干使用 refers to 对失智症（Dementia）进行概念界定，并列举了记忆力和逻辑推理能力作为多种心理能力的代表。E 段首句开宗明义给出了医学词典对失智症的定义：它是一个宽泛的术语，描述思维能力、记忆力、注意力、逻辑推理及其他心理能力的丧失。题干中的 refers to 对应原文的 is a broad term that describes，其余核心并列名词几乎原词重现，故锁定 E 段。",
    "paraphraseMap": [
      {
        "from": "as defined in medical dictionaries, is a broad term that describes",
        "to": "refers to",
        "note": "定义句式简化：原文用“医学词典中定义为一个宽泛术语来描述”展开解释，题干浓缩为简洁的 refers to（指的是）。"
      },
      {
        "from": "a loss of thinking ability, memory, attention, logical reasoning, and other mental abilities",
        "to": "a loss of multiple mental abilities such as memory and logical reasoning",
        "note": "并列举例归纳：原文列举了四项具体能力加上“其他心理能力”，题干用 multiple mental abilities such as... 进行概括性举例。"
      }
    ],
    "steps": [
      "识别题型特征：题干结构为“术语 + refers to + 解释”，属于典型定义定位题，直接去寻找给概念下定义的段落。",
      "提取低频并列锚点词：logical reasoning（逻辑推理）与 mental abilities（心理能力），跳过通篇高频词 Dementia。",
      "快速略过 A–D 段对瑞典研究与教授访谈的叙述，在 E 段首句一眼命中 logical reasoning 与 mental abilities。",
      "核对 F 段（病情随时间恶化）和 G 段（伴随听力等感官衰退），排除干扰后确定选 E。"
    ],
    "pitfall": "A–D 段聚焦运动与失智症风险的瑞典研究，F 段讲非暂时性糊涂及病情恶化，G 段讲认知与感官功能衰退，均未给失智症下综合定义；切勿在实验数据段停留过久。",
    "vocabHighlights": [
      {
        "word": "logical reasoning",
        "meaning": "n. 逻辑推理"
      },
      {
        "word": "interfere with",
        "meaning": "phr. 妨碍，干扰"
      },
      {
        "word": "symptom",
        "meaning": "n. 症状，征兆"
      },
      {
        "word": "occupational",
        "meaning": "adj. 职业的，工作上的"
      },
      {
        "word": "define",
        "meaning": "v. 下定义，界定"
      }
    ]
  },
  "q_mat_04": {
    "stemZh": "令人抱有希望的是，人们可以通过中年时期的锻炼来推迟或预防失智症。",
    "evidenceQuote": "Though the study mentioned above was fairly small (only 191 women took the initial fitness test, which means it's hard to maintain statistical significance while breaking the group down into sub-categories of more or less fit), it does give us hope that dementia can be prevented or delayed through exercise in one's middle age.",
    "evidenceZh": "尽管上述研究规模相当小（只有 191 名女性参加了最初的体能测试，这意味着在将人群进一步细分为体能较高或较低的子类别时很难维持统计显著性），但它确实给了我们希望，即通过中年时期的锻炼，失智症是可以被预防或延缓的。",
    "why": "H 段先用让步状语从句指出前面瑞典研究的样本量较小，随后在主句中强调“但它确实给了我们希望，即失智症可以通过中年时期的锻炼得到预防或推迟”。题干副词 Hopefully 对应主句核心动作 give us hope，postpone or prevent 对应原文的 prevented or delayed，exercising in their mid-life 对应 exercise in one's middle age，全部要件高度吻合，故匹配 H 段。",
    "paraphraseMap": [
      {
        "from": "it does give us hope",
        "to": "Hopefully",
        "note": "词性转换：将主句动词短语“确实给了我们希望”转化为句首评注副词 Hopefully（有希望地）。"
      },
      {
        "from": "prevented or delayed",
        "to": "postpone or prevent",
        "note": "同义替换与语序微调：delayed（延缓）替换为同义词 postpone（推迟），并与 prevent 调换顺序。"
      },
      {
        "from": "through exercise in one's middle age",
        "to": "by exercising in their mid-life",
        "note": "方式与时间表达改写：through exercise 改为 by exercising，middle age 替换为 mid-life。"
      }
    ],
    "steps": [
      "圈出三重核验锚点：语气词 Hopefully（带来希望）、动作词组 postpone or prevent（推迟或预防）、时间限定 mid-life（中年）。",
      "排除先入为主干扰：虽然 A 段和 I 段均出现 mid-life，但 A 段只报告患病风险降低近九成，I 段强调饮食睡眠等综合生活习惯同时预防心脏病，均未提及“希望”与“推迟”。",
      "带着 hope 与 delayed 向下扫读，在 H 段括号后的主句精准锁定 it does give us hope ... prevented or delayed。",
      "确认 middle age 与 mid-life 的等价对应，选定 H 段。"
    ],
    "pitfall": "A 段第一句就有 mid-life，I 段也有 exercising in mid-life，若只凭单个关键词 mid-life 就盲选，极易错选 A 段或 I 段；长篇匹配必须确保句首评注词（如 Hopefully）和动词并列（postpone or prevent）同时落地。",
    "vocabHighlights": [
      {
        "word": "postpone",
        "meaning": "v. 推迟，延缓（对应原文 delay）"
      },
      {
        "word": "statistical significance",
        "meaning": "n. 统计显著性"
      },
      {
        "word": "mid-life",
        "meaning": "n. 中年（对应原文 middle age）"
      },
      {
        "word": "sub-category",
        "meaning": "n. 子类别，细分项"
      },
      {
        "word": "maintain",
        "meaning": "v. 维持，保持"
      }
    ]
  },
  "q_mat_05": {
    "stemZh": "建议求职者在电话面试期间不要询问有关薪酬的问题。",
    "evidenceQuote": "The question regarding pay is also best avoided. To be frank, it's simply too early in the process for you to be the one who brings up salary expectations.",
    "evidenceZh": "关于薪酬的问题也最好避免提及。坦白说，在这个阶段由你主动提出薪资期望实在为时过早。",
    "why": "D 段首句明确提出“关于薪酬的问题也最好避免提及（The question regarding pay is also best avoided）”，第二句进一步补充理由：在初次电话沟通阶段主动谈论薪资期望（salary expectations）为时过早。题干将 best avoided 改写为 advised not to ask，将 question regarding pay 对应为 ask questions about pay，核心建议完全一致，因此选 D。",
    "paraphraseMap": [
      {
        "from": "The question regarding pay",
        "to": "questions about pay",
        "note": "介词同义替换：regarding（关于）在题干中替换为更常用的 about。"
      },
      {
        "from": "is also best avoided",
        "to": "Interviewees are advised not to ask",
        "note": "被动建议改写：原文“最好避开该问题”在题干中显性化为“建议求职者不要询问”。"
      },
      {
        "from": "participating in a phone interview",
        "to": "during a phone interview",
        "note": "场景呼应：D 段后半句交代此时正处于电话面试这一首轮沟通环节。"
      }
    ],
    "steps": [
      "忽略全文高频主题词 phone interview，提取唯一低频具体名词 pay（及其同义词 salary）作为扫描信号。",
      "利用职场建议类文章“一段一条建议”的规整结构，逐段快速扫读首句主题句。",
      "依次略过首轮准备（A）、个人生活（B）、一心多用（C），在 D 段首句直接命中 The question regarding pay is also best avoided。",
      "核对后文 salary expectations 进一步佐证，确认无误后选 D。"
    ],
    "pitfall": "E 段也出现了 ask questions（务必在面试结束前向面试官提问），但 E 段讲的是向面试官反问工作与公司情况，而不是问薪酬，切勿只看 ask questions 就误选 E 段。",
    "vocabHighlights": [
      {
        "word": "salary expectations",
        "meaning": "n. 薪资期望"
      },
      {
        "word": "to be frank",
        "meaning": "phr. 坦白说，老实讲"
      },
      {
        "word": "regarding",
        "meaning": "prep. 关于，至于"
      },
      {
        "word": "bring up",
        "meaning": "phr. 提出（话题），提及"
      },
      {
        "word": "appropriate",
        "meaning": "adj. 恰当的，合适的"
      }
    ]
  },
  "q_mat_06": {
    "stemZh": "经验丰富的面试官能够察觉求职者是否在通话期间上网搜索信息。",
    "evidenceQuote": "'Seasoned interviewers will know whether an interviewee is researching while on the phone. The interviewer can often even hear the typing as they ask the question,' he adds.",
    "evidenceZh": "“经验丰富的面试官会知道受访者是否在通电话时查阅资料。面试官在提问时甚至常常能听到敲击键盘的声音，”他补充道。",
    "why": "J 段在指出求职者对公司或岗位缺乏了解非常明显之后，引述人力资源顾问的话反驳“边开着笔记本电脑速查资料边面试不会被发现”的侥幸心理，明确说明经验丰富的面试官会察觉求职者是否在电话中搜索资料（Seasoned interviewers will know whether an interviewee is researching while on the phone），甚至能听到键盘敲击声。题干完美改写了该句全部成分，因此选 J。",
    "paraphraseMap": [
      {
        "from": "Seasoned interviewers",
        "to": "Experienced interviewers",
        "note": "高频熟词僻义替换：seasoned 作形容词意为“经验丰富的、老练的”，精准对应 experienced。"
      },
      {
        "from": "researching",
        "to": "searching for information online",
        "note": "语境具体化：结合前文 laptop 和 quick searches，将 researching 展开为“上网搜索信息”。"
      },
      {
        "from": "while on the phone",
        "to": "while talking on the phone",
        "note": "场景微调：补出具体动作 talking，表示“在通电话期间”。"
      }
    ],
    "steps": [
      "锁定复合定位词：Experienced interviewers（资深面试官）与 searching for information online（上网搜资料）。",
      "警惕主题相近段 C 段：C 段虽然也批评面试官讨厌求职者“一边打电话一边干别的事（multitask）”，但举例是洗碗、散步、买菜，并非上网查资料，应果断跳过。",
      "向后扫读至末段 J 段，捕捉 laptop、quick searches、typing 等与电脑搜索强相关的词汇。",
      "重点识破 seasoned 与 experienced 的同义对应，核对整句语义后锁定 J 段。"
    ],
    "pitfall": "很多考生不认识 seasoned（经验丰富的），导致扫描 Experienced interviewers 时错过 J 段；此外 C 段的“分心做家务”极易造成主题误判，必须核对“上网搜索（laptop / searches / typing）”这一具体行为。",
    "vocabHighlights": [
      {
        "word": "seasoned",
        "meaning": "adj. 经验丰富的，老练的（对应 experienced）"
      },
      {
        "word": "consultant",
        "meaning": "n. 顾问，咨询师"
      },
      {
        "word": "multitask",
        "meaning": "v. 同时处理多项任务"
      },
      {
        "word": "interviewee",
        "meaning": "n. 接受面试者，求职者（对应 applicant）"
      },
      {
        "word": "obvious",
        "meaning": "adj. 明显的，显而易见的"
      }
    ]
  },
  "q_mat_07": {
    "stemZh": "美国劳动者的平均每周工作时间近半个世纪以来一直没有变化。",
    "evidenceQuote": "Instead of continuing to decline, the duration of the working week remained stable. It has stayed at just below 40 hours for nearly five decades.",
    "evidenceZh": "每周工作的时长没有继续下降，而是保持稳定。近五十年来，它一直维持在略低于四十小时的水平。",
    "why": "B 段紧承 A 段 1930 年至 1970 年工时下降的背景，转折指出此后情况发生了变化：每周工作时长并未继续减少，而是保持稳定（remained stable），在近五十年的时间里一直维持在略低于四十小时的水平（for nearly five decades）。题干将 nearly five decades 换算为 nearly half a century，将 remained stable 改写为 has not changed，精准匹配 B 段。",
    "paraphraseMap": [
      {
        "from": "the duration of the working week",
        "to": "average weekly working time",
        "note": "同义名词词组替换：duration（持续时间）搭配 working week，与题干 weekly working time 一致。"
      },
      {
        "from": "remained stable",
        "to": "has not changed",
        "note": "正话反说改写：“保持稳定”即“没有发生改变”。"
      },
      {
        "from": "for nearly five decades",
        "to": "for nearly half a century",
        "note": "时间单位等价换算：five decades（五个十年 = 50 年）等价于 half a century（半个世纪）。"
      }
    ],
    "steps": [
      "启动时间数字雷达：在脑中将题干的 nearly half a century（近半个世纪）立刻换算为 nearly five decades 或 50 years。",
      "排除 A 段干扰：A 段讲述的是 1930 年至 1970 年工时从 47 小时“下降”到 39 小时，与题干“没有变化（has not changed）”方向相反。",
      "在 B 段第二、三句快速捕捉 remained stable 与 nearly five decades。",
      "核对 B 段末句（如今人们和 1970 年工作得一样多），确认平均周工时保持不变的事实，锁定 B 段。"
    ],
    "pitfall": "A 段和 H 段均出现了具体年份与工时数字（如 1930、1970、1973），若未抓住“近五十年来保持不变”这一核心时间跨度，容易误停在 A 段；务必养成将“世纪/十年/分数/百分比”即时换算的扫读习惯。",
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
      },
      {
        "word": "decline",
        "meaning": "v. 下降，减少"
      },
      {
        "word": "shrink",
        "meaning": "v. 缩减，变少"
      }
    ]
  },
  "q_mat_08": {
    "stemZh": "弗里德曼认为，美国的不平等在很大程度上解释了为何生产率的提高并未带来工作时间的减少。",
    "evidenceQuote": "A third possibility proves more convincing for Friedman. That is, American inequality means that the gains of increasing productivity are not widely shared by everyone. In other words, most Americans are too poor to work less.",
    "evidenceZh": "第三种可能性对弗里德曼来说更有说服力。也就是说，美国的不平等意味着生产率提高带来的收益并没有被所有人广泛共享。换句话说，大多数美国人太穷了，以至于无法减少工作。",
    "why": "文章 D、E、F 三段依次探讨了弗里德曼审视的三种解释，其中前两种均被他否定，唯有 F 段明确提出“第三种可能性对弗里德曼而言更具说服力”，随即点明原因：美国的不平等使生产率增长红利未能广泛惠及大众，多数美国人因为太穷而无法减少工时。题干完整概括了弗里德曼对“不平等导致工时未减”这一因果链的认可，因此选 F。",
    "paraphraseMap": [
      {
        "from": "proves more convincing for Friedman",
        "to": "Friedman believes ... largely explains",
        "note": "观点态度转述：“对弗里德曼而言证明更有说服力”对应“弗里德曼认为这在很大程度上解释了”。"
      },
      {
        "from": "American inequality",
        "to": "inequality in the U.S.",
        "note": "定语形式转换：形容词 American 转换为后置介词短语 in the U.S.。"
      },
      {
        "from": "the gains of increasing productivity are not widely shared ... too poor to work less",
        "to": "increasing productivity has not resulted in reduced working hours",
        "note": "因果概括：生产率提高但未能让人少工作，即“生产率提升未带来工时减少”。"
      }
    ],
    "steps": [
      "人名 Friedman 在 C 至 G 段高频出现，不能单独作为定位词，应立刻提取核心抽象名词 inequality（不平等）作主锚点。",
      "快速跳过 D 段（物质欲望论，被否定为 far from sufficient）和 E 段（职场社交论，被否定为 far from conclusive）。",
      "在 F 段第一、二句同时命中 proves more convincing for Friedman 与 American inequality。",
      "核对后句因果逻辑：生产率提升的收益未广泛共享导致多数人无法少工作，确认匹配 F 段。"
    ],
    "pitfall": "D 段首句也出现了 increased productivity（提高的生产率），且同样有 Friedman，但 D 段讨论的是“人类永不知足”的假说并已被他驳回，切勿见词就选而忽略否定态度。",
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
        "meaning": "adj. 令人信服的，有说服力的"
      },
      {
        "word": "productivity",
        "meaning": "n. 生产率，生产力"
      },
      {
        "word": "median",
        "meaning": "adj. 中位数的，处于中间水平的"
      }
    ]
  },
  "q_mat_09": {
    "stemZh": "研究人员发现，看到自己变老后图像的人会比没看到的人为晚年多存更多钱。",
    "evidenceQuote": "Participants were then placed in a virtual reality setting where they could look into a mirror and see their aged selves looking back at them. Participants who saw their aged selves said they would save 30% more of their salary for retirement than the control group.",
    "evidenceZh": "随后，受试者被置于虚拟现实环境中，他们可以照镜子并看到变老后的自己回望着自己。看到变老后的自己的受试者表示，他们愿意把比对照组多出百分之三十的薪水存起来用于退休养老。",
    "why": "G 段介绍了赫什菲尔德团队的后续虚拟现实实验：研究人员利用图像处理技术让受试者面部在视觉上变老，并让他们在虚拟镜子中看到变老后的自己；结果显示，看到变老后的自己的受试者表示愿意比对照组（the control group）多存百分之三十的薪水用于退休。题干中的 later years 对应 retirement，those who didn't 对应对照组，完整复现了 G 段实验结论。",
    "paraphraseMap": [
      {
        "from": "used image processing to visually age their faces ... see their aged selves",
        "to": "saw the images of their aged selves",
        "note": "实验流程合并：“用图像处理使面部变老并看到变老后的自己”压缩为“看到自己变老后的图像”。"
      },
      {
        "from": "save 30% more of their salary for retirement",
        "to": "save more for their later years",
        "note": "数据概括与委婉替换：30% more 概括为 more，retirement（退休）同义替换为 later years（晚年）。"
      },
      {
        "from": "than the control group",
        "to": "than those who didn't",
        "note": "实验术语通俗化：对照组（the control group）即未看到变老图像的那一组受试者。"
      }
    ],
    "steps": [
      "圈定视觉辨识度极高的词组：images（图像）与 aged selves（变老后的自己），用于全篇扫读。",
      "跳过 A 段（储蓄率下降背景）、B 段（脑部扫描）与 F 段（三种理论方案），寻找包含实验图像处理的段落。",
      "在 G 段快速扫到 image processing、virtual reality 与连续两次出现的 aged selves。",
      "精读 G 段末句，确认“多存 30%”及“比对照组更多”的对比关系，确定答案 G。"
    ],
    "pitfall": "B 段也写了大脑实验并出现了 study participants，但 B 段实验是做脑部扫描并评估性格特征，没有图像变老处理与养老金储蓄比例对比，切勿混淆两次不同实验。",
    "vocabHighlights": [
      {
        "word": "control group",
        "meaning": "n. （实验中的）对照组"
      },
      {
        "word": "bridge the disconnect",
        "meaning": "phr. 弥合脱节，消除隔阂"
      },
      {
        "word": "follow-up study",
        "meaning": "n. 后续研究"
      },
      {
        "word": "visually",
        "meaning": "adv. 在视觉上，外观上"
      },
      {
        "word": "participant",
        "meaning": "n. 参与者，受试者"
      }
    ]
  },
  "q_mat_10": {
    "stemZh": "我们的大脑天生就注定要去满足即时的欲望。",
    "evidenceQuote": "Our brains are hardwired for instant gratification.",
    "evidenceZh": "我们的大脑天生就是为即时满足而设定的。",
    "why": "I 段阐述克服拖延的第三种方法时指出，前两种策略终究是在与人类天性抗争，并紧接着用一句简洁的核心论断点明原因：Our brains are hardwired for instant gratification（我们的大脑天生就是为即时满足而设定的）。题干将 hardwired 同义改写为 genetically determined（基因决定的/天生的），将 instant gratification 替换为 satisfy immediate desires（满足即时欲望），精准对应 I 段。",
    "paraphraseMap": [
      {
        "from": "are hardwired for",
        "to": "are genetically determined to",
        "note": "核心同义替换：hardwired（固有的、天生设定的）对应 genetically determined（由基因决定的）。"
      },
      {
        "from": "instant gratification",
        "to": "satisfy immediate desires",
        "note": "动宾化改写：名词短语“即时满足”拆解为动词词组“满足即时的欲望”。"
      }
    ],
    "steps": [
      "排除高频词陷阱：brain 在 B 段和 C 段都多次出现，不能只靠 brains 定位，必须绑定“天生注定”与“即时欲望”。",
      "识别四级高频高阶替换概念：genetically determined 常对应原文的 hardwired 或 innate；immediate desires 对应 instant gratification 或 immediate rewards。",
      "自上而下快速扫读至 I 段，立刻捕捉到短句 Our brains are hardwired for instant gratification。",
      "结合下句 immediate rewards（即时回报）进一步印证语境，果断选定 I 段。"
    ],
    "pitfall": "B、C 段反复出现 brain 和 brains，E 段也出现了 immediate benefits（即刻好处），考生很容易停留在前几段反复比对而浪费时间；只有 I 段同时具备“大脑天生设定”与“即时满足”两个完整维度。",
    "vocabHighlights": [
      {
        "word": "hardwired",
        "meaning": "adj. 天生的，固有的，与生俱来的"
      },
      {
        "word": "instant gratification",
        "meaning": "n. 即时满足"
      },
      {
        "word": "immediate",
        "meaning": "adj. 即刻的，眼前的"
      },
      {
        "word": "human nature",
        "meaning": "n. 人性，人类天性"
      },
      {
        "word": "tactic",
        "meaning": "n. 策略，手段"
      }
    ]
  },
  "q_mat_11": {
    "stemZh": "麦格劳-希尔出版公司占据了大学教材市场五分之一以上的份额。",
    "evidenceQuote": "McGraw Hill, which controls 21% of the higher education market, reported in March that its digital content sales exceeded print sales for the first time in 2015.",
    "evidenceZh": "掌控着高等教育市场百分之二十一份额的麦格劳-希尔公司三月份报告称，二零一五年其数字内容销售额首次超过了纸质书销售额。",
    "why": "G 段第二句在介绍教科书出版商的数字业务转型时，明确通过非限制性定语从句给出麦格劳-希尔公司的市场占比：which controls 21% of the higher education market（控制着高等教育市场百分之二十一的份额）。由于五分之一等于百分之二十，百分之二十一正好高于五分之一，且 controls 对应 accounts for，higher education market 呼应大学教材市场，故精准匹配 G 段。",
    "paraphraseMap": [
      {
        "from": "controls",
        "to": "accounts for",
        "note": "同义动词词组替换：在市场份额语境下，control（掌控/占有）与 account for（占比）等价。"
      },
      {
        "from": "21%",
        "to": "over one-fifth",
        "note": "比例换算：五分之一为 20%，原文 21% 恰好对应题干“超过五分之一”。"
      },
      {
        "from": "the higher education market",
        "to": "the market share of college textbooks",
        "note": "语境具体化：全文主题围绕教材出版商，故“高等教育市场”对应“大学教材市场份额”。"
      }
    ],
    "steps": [
      "提取绝对强锚点：专有名词 McGraw Hill（麦格劳-希尔）以及分数表达 over one-fifth。",
      "提前在脑中完成数字换算：将 over one-fifth 转化为“大于 20%”（如 21%、22%）。",
      "快速扫描全文含 McGraw Hill 或数字百分比的段落：B 段只首次提及该出版社名，不含具体市场占比；G 段立即出现 21% of the higher education market。",
      "排除同样有高百分比（60%）的 H 段（主语是竞争对手 Pearson），锁定答案 G。"
    ],
    "pitfall": "G 段紧接着还出现了 45%（来自数字产品的营收占比），H 段则有 60%（培生集团声称替学生省钱的比例），扫读数字时一定要看清百分比前面对应的是“市场份额”还是“营收”或“省钱比例”。",
    "vocabHighlights": [
      {
        "word": "account for",
        "meaning": "phr. （在数量/比例上）占……"
      },
      {
        "word": "exceed",
        "meaning": "v. 超过，超出"
      },
      {
        "word": "revenue",
        "meaning": "n. 营收，财政收入"
      },
      {
        "word": "be derived from",
        "meaning": "phr. 源自，来自"
      },
      {
        "word": "market share",
        "meaning": "n. 市场份额"
      }
    ]
  },
  "q_mat_12": {
    "stemZh": "在线系统可能会剥夺教师为学生充分发挥其专业知识的机会。",
    "evidenceQuote": "'The online systems may make my life a lot easier but I feel like I'm giving up control. The discussions are the things where my expertise can benefit the students most.'",
    "evidenceZh": "“在线系统或许会让我的工作轻松很多，但我觉得自己正在放弃掌控权。课堂讨论才是我的专业知识最能够让同学们受益的环节。”",
    "why": "J 段引入奥古斯塔大学社会学副教授大卫·亨特对在线教学系统的反思。他表示，虽然在线系统让自己轻松不少，但他觉得自己失去了主导权（giving up control），而恰恰是课堂讨论才是他的专业知识最能造福学生的环节（where my expertise can benefit the students most）。这说明系统取代线下互动后，削弱了教师施展专长服务学生的机会，精准对应题干，选 J。",
    "paraphraseMap": [
      {
        "from": "I feel like I'm giving up control",
        "to": "may deprive teachers of opportunities",
        "note": "逻辑归纳：教师感到在线系统让自己放弃课堂控制权，引申为系统可能剥夺了教师发挥作用的机会。"
      },
      {
        "from": "where my expertise can benefit the students most",
        "to": "to make the best use of their expertise for their students",
        "note": "同义转述：“专业知识最能惠及学生”对应“为学生最充分地运用专业知识”。"
      }
    ],
    "steps": [
      "锁定人物身份与低频实词：teachers（教师）与 expertise（专业知识）。",
      "快速略过 A–I 段：A、E、F 段站在学生经济困境视角，B、C、D、G、H、I 段聚焦出版商、批评者与价格功能，均未以一线教师为主体。",
      "扫读至末段 J 段，看到 associate professor（副教授）及原词 expertise。",
      "细读引语中的转折关系（make my life easier but giving up control），核对专业知识惠及学生的语义，确定选 J。"
    ],
    "pitfall": "本题在原文中并没有直接出现 deprive 一词，而是把引语中的“觉得放弃掌控权”与“讨论才是专长最能惠及学生的地方”合二为一做语义归纳，需要读懂引语前后的隐含因果与担忧。",
    "vocabHighlights": [
      {
        "word": "deprive ... of",
        "meaning": "phr. 剥夺……的（机会/权利）"
      },
      {
        "word": "expertise",
        "meaning": "n. 专业知识，专长"
      },
      {
        "word": "curriculum",
        "meaning": "n. 全部课程，课程体系"
      },
      {
        "word": "associate professor",
        "meaning": "n. 副教授"
      },
      {
        "word": "benefit",
        "meaning": "v. 使受益，对……有用"
      }
    ]
  },
  "q_rd_01": {
    "stemZh": "经典的超市两难困境是什么？",
    "evidenceZh": "一方面，你家的餐桌只配得上最好的食物。另一方面，你的钱包只能撑到这个地步。",
    "why": "按照四级阅读题文同序原则，本题直接定位至第一段第二至四句。作者首先抛出“经典的超市两难困境（the classic grocery store dilemma）”，随后立即使用 On the one hand ... On the other hand 结构具体拆解矛盾双方：既想给家人餐桌提供最好的食物（deserves only the best），又受制于钱包预算有限（wallet can only stretch so far）。D 项“一个人想要最好的食物，但预算有限”完整涵盖了这一双向冲突，故为正确答案。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "是否应该吃有机食品。",
        "verdict": "wrong",
        "reason": "片面且偷换对象：第一段末句提到“买不买有机食品是个人决定”，但这只是两难困境引发的具体消费抉择本身，并未解释“两难”双方到底是什么冲突。"
      },
      {
        "key": "B",
        "zh": "能否把钱包尽量撑大（是否有足够多的钱）。",
        "verdict": "wrong",
        "reason": "以偏概全且误解习语：该项仅截取了 On the other hand（预算有限）这一单边因素，遗漏了“想买最好食物”的对立面，无法构成“两难”。"
      },
      {
        "key": "C",
        "zh": "有机食品价格更高，但味道肯定更好。",
        "verdict": "wrong",
        "reason": "无中生有：第一段及全文均未比较有机食品与普通食品的口感或味道，“味道肯定更好”属于脱离原文的主观臆断。"
      },
      {
        "key": "D",
        "zh": "一个人想要最好的食物，但自己的预算有限。",
        "verdict": "correct",
        "reason": "精准同义转述：One wants the best food 对应 deserves only the best，but their budget is limited 准确翻译了习语 your wallet can only stretch so far，完整呈现两难矛盾。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "deserves only the best",
        "to": "wants the best food",
        "note": "需求概括：家人餐桌配得上最好的食物，即消费者想买最好的食物。"
      },
      {
        "from": "your wallet can only stretch so far",
        "to": "their budget is limited",
        "note": "习语直译转化：“钱包只能伸展到有限程度”地道转述为“预算有限”。"
      }
    ],
    "steps": [
      "利用题文同序原则与核心词 classic grocery store dilemma，直接锁定第一段。",
      "寻找对 dilemma 进行展开说明的句子，圈出并列对照信号词 On the one hand ... On the other hand。",
      "准确理解习语 your wallet can only stretch so far 的含义为“财力/预算有限”，提炼两难的矛盾双方。",
      "对比四个选项，排除单边片面的 A、B 和无中生有的 C，锁定同时包含“想要最好”与“预算有限”的 D 项。"
    ],
    "pitfall": "看到 dilemma（进退两难的困境）考查定义时，正确选项几乎必然包含 but、yet 或 while 等体现“双向拉扯”的转折词；只描述单边情况的选项（如 A、B）必然片面。",
    "vocabHighlights": [
      {
        "word": "dilemma",
        "meaning": "n. 进退两难的困境"
      },
      {
        "word": "stretch so far",
        "meaning": "phr. 延展到有限程度（喻指资金/预算有限）"
      },
      {
        "word": "trade-off",
        "meaning": "n. 权衡，取舍"
      },
      {
        "word": "budget",
        "meaning": "n. 预算，开支计划"
      },
      {
        "word": "conventionally",
        "meaning": "adv. 常规地，传统地"
      }
    ]
  },
  "q_rd_02": {
    "stemZh": "就食品安全而言，文章对有机产品与非有机产品作了怎样的说明？",
    "evidenceZh": "从食品安全的角度来看，有机产品与非有机产品之间也没有太大的区别。",
    "why": "利用题干中的 food safety 回文定位，可直接锁定第三段第二句：There is also no big difference between organic and non-organic products from a food-safety perspective。作者在此明确指出两者在食品安全上并无显著差异，且紧接着用细节解释有机种植同样使用甚至使用更多天然农药，常规食品也几乎检测不到残留。D 项的 no substantial difference 精准同义替换了原文的 no big difference，因此选 D。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "两者的差异在于检测它们时所采用的常规方法。",
        "verdict": "wrong",
        "reason": "无中生有：原文第三段仅提到检测（Testing）显示常规农产品几乎没有农药残留，从未讨论或比较过检测有机与非有机食品的“惯例或方法”有何不同。"
      },
      {
        "key": "B",
        "zh": "它们在表面残留的农药量上存在差异。",
        "verdict": "wrong",
        "reason": "偷换重点与过度推断：第三段说检测显示常规食品几乎没有（little if any）农药残留，而有机农场主因只能用天然杀虫剂往往用量更大，但并未得出两者在“残留量上存在明显差异”的结论，且与主旨句“食品安全无大差异”相悖。"
      },
      {
        "key": "C",
        "zh": "一种依赖农药，而另一种则不使用农药。",
        "verdict": "wrong",
        "reason": "与原文相反：第三段明确强调 Even organic growers use pesticides（连有机种植者也使用农药），彻底推翻了“其中一种不用农药”的说法。"
      },
      {
        "key": "D",
        "zh": "两者之间没有实质性的差异。",
        "verdict": "correct",
        "reason": "精准同义替换：no substantial difference 对应原文核心句中的 no big difference，the two 回指有机与非有机产品，完全忠于第三段第二句原意。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "no big difference",
        "to": "no substantial difference",
        "note": "同义形容词升级：将日常口语化的 big（大的）替换为书面正式词 substantial（实质性的、重大的）。"
      },
      {
        "from": "organic and non-organic products",
        "to": "the two",
        "note": "代词指代简化：利用前文题干已出现的双方对象，在选项中简称为 the two。"
      }
    ],
    "steps": [
      "以题干限定词 food safety（食品安全）作为扫读靶标，回文定位到第三段第二句。",
      "读懂核心判断句：There is also no big difference between organic and non-organic products from a food-safety perspective。",
      "继续读完第三段后半部分以防细节反驳：确认有机农业也用农药，排除与原文直接矛盾的 C 项以及无中生有的 A、B 项。",
      "将原文 no big difference 对应为 D 项 no substantial difference，确认作答。"
    ],
    "pitfall": "很多考生容易受生活中“有机食品完全无农药、更安全”的常识影响而误选 B 或 C，做仔细阅读题必须彻底放下主观刻板印象，严格依据第三段原句判断。",
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
        "meaning": "n. 视角，观点"
      },
      {
        "word": "convention",
        "meaning": "n. 惯例，常规方法"
      },
      {
        "word": "recall",
        "meaning": "n. （问题产品的）召回"
      }
    ]
  },
  "q_rd_03": {
    "stemZh": "近期一项关于自私的研究有什么发现？",
    "evidenceZh": "研究发现，自私比合作更有优势。然而，这种好处可能是短暂的。",
    "why": "通过题干关键短语 one recent study 定位至第二段第二至四句。该段共介绍了两项研究，其中第一项（One recent study）先报告“自私比合作更具优势（more advantageous than cooperating）”，但紧接着用转折词 however 补充说明“然而这种好处可能是短暂的（The benefit may be short-lived）”。将两句完整信息合并起来，正好对应 A 项“它可能在短期内带来某种好处”，因此选 A。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "它可能在短期内带来某种好处。",
        "verdict": "correct",
        "reason": "完整整合原句：将“自私更有优势（more advantageous）”与紧随其后的转折限定“好处可能很短暂（may be short-lived）”结合，精准对应 bring certain benefits in the short term。"
      },
      {
        "key": "B",
        "zh": "它带来的坏处通常多于好处。",
        "verdict": "wrong",
        "reason": "与原文相反：该项研究明确发现短期内自私比合作更具优势（more advantageous），只是好处维持时间短，并未说坏处多于好处。"
      },
      {
        "key": "C",
        "zh": "它服务于个人利益而非集体利益。",
        "verdict": "wrong",
        "reason": "偷换概念：原文第二句“测试人们是否愿意放下私利以实现更大利益（greater good）”是该研究的实验目的或测试内容，而非研究得出的发现（finding）。"
      },
      {
        "key": "D",
        "zh": "从长远来看它可能会让位于合作。",
        "verdict": "wrong",
        "reason": "张冠李戴且过度推断：第二段末句讲的是“另一项研究（Another study）表明合作的参与者从长远来看表现更好”，并非这项研究发现“自私会让位给合作”。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "was more advantageous ... The benefit",
        "to": "bring certain benefits",
        "note": "同根词与词性转换：由形容词 advantageous（有利的）与名词 benefit 对应“带来一定好处”。"
      },
      {
        "from": "may be short-lived",
        "to": "may ... in the short term",
        "note": "时间跨度同义替换：short-lived（短暂的）等价于 in the short term（在短期内），并保留情态动词 may 的谨慎语气。"
      }
    ],
    "steps": [
      "利用定位词 one recent study 与 being selfish 回文定位至第二段第二至四句。",
      "切忌只读一句就下结论，必须连读第三句和第四句的转折句：more advantageous + short-lived, however。",
      "警惕同一段末尾出现的 Another study（另一项研究），将两项研究的结论严格区分开。",
      "对照选项排除反向的 B、偷换研究目的的 C 和张冠李戴的 D，选定概括最完整的 A 项。"
    ],
    "pitfall": "第二段紧挨着出现了 One recent study 和 Another study 两项独立研究，考生极易把第二项研究中的 in the long run（长远来看）张冠李戴到第一项研究上而误选 D 项。",
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
        "meaning": "phr. 从长远来看"
      },
      {
        "word": "set aside",
        "meaning": "phr. 把……放一边，舍弃"
      },
      {
        "word": "give way to",
        "meaning": "phr. 给……让步，被……取代"
      }
    ]
  },
  "q_rd_04": {
    "stemZh": "从最后一段中我们可以推断出什么？",
    "evidenceZh": "文化、学校教育和家庭养育是合作行为的重要决定因素。",
    "why": "题干明确把答题范围限定在最后一段（the last paragraph）。该段首句首先否定纯基因决定论，指出“几乎没有任何行为是完全由基因决定的，即便在同卵双胞胎中也是如此（almost no behavior is entirely genetic）”；第二句随即指出“文化、学校教育和家庭养育是合作的重要决定因素”；末句总结个体合作或自私的程度取决于基因与环境的多重影响。既然教育和养育等后天环境因素起到重要作用，便可顺理成章推断出合作行为是可以通过后天培养的（may be cultivated），因此选 D。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "合作行为在同卵双胞胎中尤为明显。",
        "verdict": "wrong",
        "reason": "曲解原意：末段提及 even among identical twins 是为了论证“哪怕基因几乎完全相同的同卵双胞胎，其行为也不完全由基因决定”，而非说双胞胎身上合作行为最明显。"
      },
      {
        "key": "B",
        "zh": "一个人天生要么合作，要么不合作。",
        "verdict": "wrong",
        "reason": "绝对化且与原文相反：末段明确否定行为完全先天决定，且指出合作与自私的程度（degree）受基因和后天环境共同塑造，并非天生非黑即白。"
      },
      {
        "key": "C",
        "zh": "基因决定一个人的合作倾向。",
        "verdict": "wrong",
        "reason": "片面且绝对化：末段首句恰恰反驳了“完全基因决定论”，并强调行为取决于“多种基因与环境影响（a variety of genetic and environmental influences）”。"
      },
      {
        "key": "D",
        "zh": "合作行为是可以培养的。",
        "verdict": "correct",
        "reason": "合理推断：原文明确指出“文化、学校教育与家庭养育”是合作的重要决定因素，且用了缓和语气的 may，由此自然推出合作行为可以通过后天培养而养成。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "almost no behavior is entirely genetic",
        "to": "may be cultivated",
        "note": "前提铺垫：末段首句否定“行为完全由基因先天决定”，为合作行为的后天培养提供了前提依据。"
      },
      {
        "from": "Culture, schooling and parenting are important determinants of cooperation",
        "to": "Cooperative behavior may be cultivated",
        "note": "逻辑推演：学校教育（schooling）与家庭养育（parenting）均属后天培育手段，可合理推导出“合作行为可以被培养（cultivated）”。"
      }
    ],
    "steps": [
      "锁定题干限定区间：仅精读最后一段的三句话，不被前文双胞胎实验或进化论干扰。",
      "抓住第一句核心转折 Yet almost no behavior is entirely genetic，直接排除只强调先天的绝对化干扰项 B 和 C。",
      "提取第二句后天决定因素（文化、学校教育、家庭养育），思考其教育学隐含推论。",
      "核对 A 项对让步短语的曲解，最终选定带有谨慎情态词 may 的 D 项。"
    ],
    "pitfall": "推理题千万不要脱离末段自行发挥，也不要把前文第三段“同卵双胞胎研究证明基因效应显著”的结论代入末段而误选 C；末段的重心在于用 Yet 引出后天环境与培养的关键作用。",
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
      },
      {
        "word": "entirely",
        "meaning": "adv. 完全地，彻底地"
      },
      {
        "word": "parenting",
        "meaning": "n. 养育，家庭教养"
      }
    ]
  },
  "q_rd_05": {
    "stemZh": "关于受所谓“冒充者现象”困扰的人，我们从文中了解到什么？",
    "evidenceZh": "他们认为任何成功都是外部环境或纯粹靠运气与巧合的结果。",
    "why": "按题文同序定位到文章第一段。第一段共三句话，集中刻画冒充者现象受困扰者的典型心理特征：一是系统性低估自己和自己的表现；二是认为任何成功都归因于外部环境或单纯的运气与巧合（is due to external circumstances or just luck and chance）；三是整天提心吊胆，生怕自己的“伪装”被拆穿。第二段与第四段也再次强化了“把成功归因于好运而非自身能力”这一核心表现，B 项精准对应，其余三项均巧妙套用原文词汇偷换概念。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "他们系统性地低估自己成功的机会。",
        "verdict": "wrong",
        "reason": "偷换宾语概念：第一段首句说的是他们系统性地低估“自己和自己的表现（themselves and their own performance）”，而不是低估“成功的机会（chance of success）”。"
      },
      {
        "key": "B",
        "zh": "他们倾向于把自己的成就归功于好运。",
        "verdict": "correct",
        "reason": "精准同义转述：attribute their achievements to good fortune 准确对应原文 think that any success is due to ... just luck and chance。"
      },
      {
        "key": "C",
        "zh": "他们似乎一直生活在害怕被人欺骗的恐惧中。",
        "verdict": "wrong",
        "reason": "偷换语态与施事者：原文指他们害怕“自己（所谓不配位）的伪装/欺骗行为被揭穿（their 'deception' will be exposed）”，而不是害怕“被别人欺骗（being deceived）”。"
      },
      {
        "key": "D",
        "zh": "他们通常依赖运气和巧合来获得成功。",
        "verdict": "wrong",
        "reason": "偷换主观归因与客观事实：原文强调他们“主观以为（think / attribute）”成功靠运气，而实际上他们本身表现优秀（delivering a good performance），并非客观上靠运气成功。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "think that any success is due to",
        "to": "tend to attribute their achievements to",
        "note": "归因句式转换：将“认为任何成功是因为……”转换为“倾向于将成就归因于……”。"
      },
      {
        "from": "just luck and chance",
        "to": "good fortune",
        "note": "同义名词词组替换：luck and chance（运气与巧合）概括为 good fortune（好运）。"
      }
    ],
    "steps": [
      "根据题干出现 so-called Impostor Phenomenon，直接定位第一段（及第二、四段印证处）。",
      "由于四个选项全部包含第一段的高频原词（underestimate、luck and chance、constant fear），切忌快速扫一眼原词就下笔，必须逐词核对主宾关系。",
      "逐个拆穿陷阱：A 项改换了低估的对象；C 项把主动怕暴露偷换为被动怕受骗；D 项把主观归因篡改为客观事实。",
      "核对 B 项 attribute ... to good fortune，确认与第二句完全吻合后选 B。"
    ],
    "pitfall": "本题是“原词重现却偷换概念”的典型高危题：A、C、D 三项几乎照搬了第一段原词，但每一项都在关键宾语或主被动语态上动了手脚，阅读时务必圈清“谁对谁做什么”。",
    "vocabHighlights": [
      {
        "word": "attribute ... to",
        "meaning": "phr. 把……归因于"
      },
      {
        "word": "underestimate",
        "meaning": "v. 低估，小看"
      },
      {
        "word": "deception",
        "meaning": "n. 欺骗，伪装"
      },
      {
        "word": "be plagued by",
        "meaning": "phr. 饱受……的折磨与困扰"
      },
      {
        "word": "good fortune",
        "meaning": "n. 好运，幸运"
      }
    ]
  },
  "q_rd_06": {
    "stemZh": "美国心理学家波琳·克兰斯和苏珊娜·艾姆斯对受冒充者现象困扰的人说了什么？",
    "evidenceZh": "然而，受其困扰的人表现出更高的抑郁易感性。",
    "why": "利用两位心理学家的人名 Pauline Clance and Suzanne Imes 快速定位至文章最后一段后半部分。该段最后三句先说明两位学者观察到许多成功女性不认为自己聪明，随后点出该现象的定义归属：“冒充者现象并未被定义为精神疾病（is not defined as a mental illness）。然而，受其困扰的人表现出更高的抑郁易感性（show a higher vulnerability to depression）。”A 项中的 more liable to 正是 higher vulnerability to 的地道同义替换，故锁定 A。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "他们更容易患上抑郁症。",
        "verdict": "correct",
        "reason": "精准同义替换：more liable to have depression 准确对应末句的 show a higher vulnerability to depression（对抑郁表现出更高的易感性）。"
      },
      {
        "key": "B",
        "zh": "他们很少充分实现自己的潜能。",
        "verdict": "wrong",
        "reason": "无中生有：末段提到很多成功女性（successful women）不觉得自己很聪明，说明她们其实取得了成功，原文从未说受困扰者无法发挥潜能。"
      },
      {
        "key": "C",
        "zh": "他们将会患上精神疾病。",
        "verdict": "wrong",
        "reason": "绝对化且与原文矛盾：末段倒数第二句明确指出 The Impostor Phenomenon is not defined as a mental illness，C 项将抑郁风险绝对化地上升为“必将患精神疾病”，违背原文。"
      },
      {
        "key": "D",
        "zh": "总有一天他们会付出更高的代价。",
        "verdict": "wrong",
        "reason": "断章取义与夸张：末段首句说患者“内心害怕”自己的骗局迟早败露并为此付出代价（fear that ... they will pay the price），这是患者自己的恐惧心理，而不是心理学家断言的客观未来。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "show a higher vulnerability to",
        "to": "are more liable to have",
        "note": "高频考纲替换：vulnerability to（对……的易感性/脆弱性）等价于 be liable to（易于遭受……）。"
      },
      {
        "from": "people who suffer from it",
        "to": "They",
        "note": "代词指代：指代题干中的 Impostor Phenomenon sufferers。"
      }
    ],
    "steps": [
      "依据人名 Pauline Clance and Suzanne Imes 迅速定位至最后一段。",
      "紧盯段尾转折信号词 However 引导的最后两句：not defined as a mental illness 与 higher vulnerability to depression。",
      "直接淘汰与原句否定表述相反的 C 项，以及把主观恐惧当成客观预言的 D 项、无中生有的 B 项。",
      "确认 higher vulnerability to 与 more liable to 的同义对接，稳选 A 项。"
    ],
    "pitfall": "末段首句出现了 pay the price，极易诱惑考生误选 D 项，但必须看清那是“患者的担忧（the fear that ...）”，而非心理学家的研究结论；此外牢记 vulnerable / liable / prone 三词互换。",
    "vocabHighlights": [
      {
        "word": "vulnerability",
        "meaning": "n. 易感性，脆弱性（对应选项 liable）"
      },
      {
        "word": "depression",
        "meaning": "n. 抑郁症，沮丧"
      },
      {
        "word": "liable",
        "meaning": "adj. 易于……的，有……倾向的"
      },
      {
        "word": "expose",
        "meaning": "v. 揭露，使曝光"
      },
      {
        "word": "mental illness",
        "meaning": "n. 精神疾病"
      }
    ]
  },
  "q_rd_07": {
    "stemZh": "音乐在哪些方面具有重要意义？",
    "evidenceZh": "它在全球范围内都至关重要，并有潜力让人们在和平与和谐中凝聚在一起。",
    "why": "由题干中的 important 定位至第一段第三句：It is vitally important across the globe and has the potential to bring people together in peace and harmony（它在全球都至关重要，并有潜力使人们在和平与和谐中走到一起）。此外，文章最后一句再次首尾呼应，点出“它拥有团结我们的力量（it has the power to unite us）”。B 项中的 unite people throughout the world 精准涵盖了 bring people together 与 across the globe 两层含义，故为正确答案。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "它能够创造出新奇而非凡的情感。",
        "verdict": "wrong",
        "reason": "偷换概念：第一段说不同文化音乐家合作能创造出“全新的声音（an entirely new sound）”和“非凡的成果（extraordinary results）”，并非创造“新奇的情感”。"
      },
      {
        "key": "B",
        "zh": "它拥有团结世界各地人民的力量。",
        "verdict": "correct",
        "reason": "精准呼应主旨：unite people 对应首段 bring people together 及末段 unite us，throughout the world 对应首段 across the globe，完整回答了音乐的重要性所在。"
      },
      {
        "key": "C",
        "zh": "它让不同文化群体能够和谐地一起唱歌。",
        "verdict": "wrong",
        "reason": "窄化与曲解：原文的 bring people together in peace and harmony 指人类在和平融洽中共处，而非字面意义上的“和谐合唱（sing in harmony）”。"
      },
      {
        "key": "D",
        "zh": "它是世界各族人民所喜爱的唯一语言。",
        "verdict": "wrong",
        "reason": "绝对化且无中生有：第一段仅说音乐是一种“通用语言（a universal language）”，D 项擅自加上极端绝对词 the only（唯一），明显违背原文。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "has the potential to bring people together ... it has the power to unite us",
        "to": "has the power to unite people",
        "note": "同义表达整合：直接融合首段“让人们凝聚”与末段“拥有团结我们的力量”。"
      },
      {
        "from": "across the globe",
        "to": "throughout the world",
        "note": "空间范围同义替换：across the globe（全球范围内）等价于 throughout the world（遍及全世界）。"
      }
    ],
    "steps": [
      "利用题干关键词 important 扫描第一段，迅速锁定第三句 vitally important across the globe。",
      "提取该句核心功能：bring people together in peace and harmony，同时扫视末段结尾验证首尾呼应句 it has the power to unite us。",
      "逐个排雷：D 项含极端词 the only 直接排除；A 项将 new sound 偷换为 emotions；C 项将和平共处曲解为合唱。",
      "核对 B 项词汇对应，确定选择 B。"
    ],
    "pitfall": "C 项利用了原文中的 harmony 和不同文化（different cultures）造句，把社会层面的“和平共处（in peace and harmony）”窄化为音乐层面的“一起唱歌”，阅读时切忌望文生义。",
    "vocabHighlights": [
      {
        "word": "vitally",
        "meaning": "adv. 极其，至关重要地"
      },
      {
        "word": "in harmony",
        "meaning": "phr. 和谐地，融洽地"
      },
      {
        "word": "unite",
        "meaning": "v. 团结，使联合"
      },
      {
        "word": "universal",
        "meaning": "adj. 普遍的，通用的"
      },
      {
        "word": "novel",
        "meaning": "adj. 新奇的，新颖的"
      }
    ]
  },
  "q_rd_08": {
    "stemZh": "音乐在人们生活中的根本作用是什么？",
    "evidenceZh": "音乐从本质上讲是为了表达或改变情感。",
    "why": "题干询问音乐在人们生活中的“根本作用（fundamental role）”，应着重在文中寻找与“本质上、根本上”对应的副词信号。第四段先总结各文化使用音乐的目的非常相似，随后第三句用副词 essentially 明确界定：Music essentially serves to express or change emotions（音乐从本质上讲是为了表达或改变情感）。后文紧接着补充它也常用于仪式或单纯用来娱乐消遣，进一步反衬“表达情绪”才是根本作用，故锁定 C 项。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "把人们凝聚在一起。",
        "verdict": "wrong",
        "reason": "答非所问与混淆层次：凝聚人类是音乐在宏观跨文化交流中的重要性与力量，并非第四段在“人们日常生活目的”中界定的本质核心功能（essentially serves to）。"
      },
      {
        "key": "B",
        "zh": "展现他们的身份认同。",
        "verdict": "wrong",
        "reason": "无中生有：全文围绕音乐的共通性、五声音阶、情绪与娱乐礼仪展开，从未提及用音乐展现个人或群体“身份认同（identity）”。"
      },
      {
        "key": "C",
        "zh": "表达他们的情感。",
        "verdict": "correct",
        "reason": "精准对应定位句：essentially serves to 对应题干的 fundamental role，to express their emotions 直接提取自 express or change emotions。"
      },
      {
        "key": "D",
        "zh": "让他们保持娱乐消遣。",
        "verdict": "wrong",
        "reason": "局部以偏概全：第四段后面提到音乐“也可以仅仅是娱乐消遣性的（can simply be recreational）”，这只是与礼仪用途并列的衍生用途，并非根本作用。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "essentially serves to",
        "to": "the fundamental role ... is to",
        "note": "同义核心限定：副词 essentially（本质上、根本上）与形容词 fundamental（根本的）精准对应。"
      },
      {
        "from": "express or change emotions",
        "to": "express their emotions",
        "note": "并列精简：保留核心动宾搭配 express emotions。"
      }
    ],
    "steps": [
      "抓住题干限定词 fundamental role（根本作用），思考其在原文中的对应词（如 essentially、fundamentally、primarily）。",
      "按题文同序定位至第四段，在第三句一眼锁定信号词 essentially serves to。",
      "区分第四段列举的三类作用：本质功能（表达情绪）、礼仪功能（ceremonial）、娱乐功能（recreational），果断排除只占局部功能的 D 项和无中生有的 B 项。",
      "排除宏观社会效果 A 项，确认选择 C 项。"
    ],
    "pitfall": "本题 A 项（团结人类）是第一题的正确概念、D 项（娱乐）是第四段原词，两者都极具迷惑性；只有精准抓住 essentially 与 fundamental 的同义对应，才能在并列功能中锁定真正的核心。",
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
      },
      {
        "word": "fundamental",
        "meaning": "adj. 根本的，基本的"
      },
      {
        "word": "bond",
        "meaning": "v. 使结合，增强凝聚力"
      }
    ]
  },
  "q_rd_09": {
    "stemZh": "为什么道德厌恶在儿童成长发育中出现得很晚？",
    "evidenceZh": "如果道德厌恶在发育中出现得相当晚，那么认为它实际上包含社会成分是合乎情理的。",
    "why": "利用题干中的核心短语 appears quite late in children's development 定位至第四段首句。作者明确提出因果推论：如果道德厌恶在发育中出现得很晚，那么它实际上包含一个“社会成分（a social component）”。紧接着第二、三句解释儿童通过各种途径学习情绪，其中尤为相关的是“亲子之间关于情绪的对话（parents-children conversations about emotions）”。这说明道德厌恶之所以出现较晚，是因为它需要通过社交互动来学习，故匹配 A 项。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "它需要通过社交互动来学习。",
        "verdict": "correct",
        "reason": "精准概括段意：fourth 段先指出道德厌恶包含“社会成分（social component）”，紧接着用儿童学习情绪及亲子对话说明它需要依托社交互动习得。"
      },
      {
        "key": "B",
        "zh": "他们对其学习过程几乎没有控制权。",
        "verdict": "wrong",
        "reason": "无中生有：第四段及全文均未谈及儿童在情绪学习过程中“缺乏控制权（little control）”。"
      },
      {
        "key": "C",
        "zh": "它过于复杂，以至于他们无法习得。",
        "verdict": "wrong",
        "reason": "无中生有且违背原文：原文只是说道德厌恶出现得比较晚，甚至到八岁时多用作隐喻，并未归因于“过于复杂以至于学不会”。"
      },
      {
        "key": "D",
        "zh": "他们的父母很少谈论情绪。",
        "verdict": "wrong",
        "reason": "过度推断：第四段第四句对比了“常谈论情绪的父母”与“不常谈论情绪的父母”所带出孩子的理解差异，并未断言大多数父母都很少谈论情绪。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "there is actually a social component to it",
        "to": "social interactions",
        "note": "概念具体化：将抽象名词词组“包含社会成分（social component）”在选项中具体化为“社交互动（social interactions）”。"
      },
      {
        "from": "Children learn about emotions ... parents-children conversations",
        "to": "needs to be learnt through social interactions",
        "note": "段落语义整合：儿童通过亲子情绪对话学习情绪，精准对应“需要通过社交互动来学习”。"
      }
    ],
    "steps": [
      "依靠题干高辨识度原词 appears quite late in ... development 一步定位至第四段首句。",
      "顺读首句之后的二、三句，将抽象词 social component（社会成分）与具体例证 learn about emotions 和 parents-children conversations 联系起来。",
      "排雷：警惕 D 项将“两类父母的假设对比”歪曲为普遍事实，同时排除原文未提的 B 项和 C 项。",
      "确认 A 项准确传达“社会成分 + 后天学习”的核心逻辑，锁定答案 A。"
    ],
    "pitfall": "第四段中出现了 parents who do not discuss emotions often，极易诱使粗心的考生误选 D 项；必须看清这是一个对照句（常谈情绪的父母 vs 不常谈情绪的父母），绝不是对父母普遍行为的否定评价。",
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
      },
      {
        "word": "interaction",
        "meaning": "n. 互动，交流"
      },
      {
        "word": "acquire",
        "meaning": "v. 获得，习得"
      }
    ]
  },
  "q_rd_10": {
    "stemZh": "从作者及其同事的研究发现中，关于道德厌恶我们可以推断出什么？",
    "evidenceZh": "我们的研究结果表明，即使在八岁大的儿童中，道德厌恶要么到更大年龄才被理解，要么仅仅被当作隐喻使用（如果真有用到的话）。",
    "why": "题干询问作者及其同事研究发现的推论，直接定位到文章末段最后一句（Our findings suggest that ...）。该句指出，即便在八岁大的儿童中，道德厌恶也“要么到更大年龄才被理解，要么如果有用到也仅仅是隐喻性的（either understood at a later age or is only used metaphorically, if at all, in children as old as eight years）”。无论哪种情况，都说明儿童尚无法真正理解这一概念。A 项“对儿童而言，它是一个几乎难以理解的概念”精准概括了这一结论，故为正确答案。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "对于儿童而言，这是一个几乎难以理解的概念。",
        "verdict": "correct",
        "reason": "精准推论：末句表明八岁以下儿童要么要等到更大年纪才懂，要么只是隐喻使用甚至压根不用，由此充分说明道德厌恶对儿童来说是难以理解的概念（hardly comprehensible）。"
      },
      {
        "key": "B",
        "zh": "它在八岁以下的儿童中很少存在。",
        "verdict": "wrong",
        "reason": "过度推断与表述偏差：原文研究发现孩子确实能用“厌恶”这个词，但主要是隐喻性使用或者实际上表达的是愤怒（第五段链接到 anger），结论谨慎地聚焦于儿童对其概念的“理解与使用方式”，而非断定它很少存在。"
      },
      {
        "key": "C",
        "zh": "这是大多数父母在和孩子交谈时会使用的词。",
        "verdict": "wrong",
        "reason": "与原文相反：第五段明确报告，母亲与孩子讨论厌恶时主要是生理厌恶，而不太谈论道德厌恶（not so much about moral disgust）。"
      },
      {
        "key": "D",
        "zh": "它存在于具有强烈正义感的成年人身上。",
        "verdict": "wrong",
        "reason": "无中生有：末段第二句仅简单提到有研究者认为道德厌恶存在于成年人中，完全没有添加“具有强烈正义感（a strong sense of justice）”这一限定条件。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "moral disgust",
        "to": "a notion",
        "note": "上位概念指代：将题干中的核心心理学概念“道德厌恶”在选项中泛指为“一个概念（a notion）”。"
      },
      {
        "from": "either understood at a later age or is only used metaphorically, if at all, in children as old as eight years",
        "to": "hardly comprehensible to children",
        "note": "高度凝练概括：“更大年龄才被理解或仅作隐喻使用”直接提炼为“对儿童而言几乎难以理解”。"
      }
    ],
    "steps": [
      "依托题干关键词 author and his colleagues' findings 直接锁定末段最后一句 Our findings suggest that ...。",
      "拆解句末的谨慎并列结构 either ... or ... 以及让步插入语 if at all，明确“连八岁儿童都尚未真正理解该概念”。",
      "结合第五段实验（儿童将偷零食与愤怒而非厌恶联系起来）排除与实验结果相悖的 C 项和凭空加戏的 D 项。",
      "比较 A 项与 B 项，确认 A 项围绕 understood（理解）展开的推论最忠实于作者原意，选定 A。"
    ],
    "pitfall": "D 项中的“强烈正义感”看似非常符合“道德厌恶”的生活联想，但原文只字未提；而 B 项利用了原文中的 eight years 制造近原词干扰，解题时需紧扣作者围绕“儿童是否理解（understood）”所下的结论。",
    "vocabHighlights": [
      {
        "word": "preliminary",
        "meaning": "adj. 初步的，预备的"
      },
      {
        "word": "metaphorically",
        "meaning": "adv. 比喻地，隐喻地"
      },
      {
        "word": "comprehensible",
        "meaning": "adj. 可理解的，能懂的"
      },
      {
        "word": "notion",
        "meaning": "n. 概念，观念"
      },
      {
        "word": "wrongdoing",
        "meaning": "n. 坏事，不道德行为"
      }
    ]
  },
  "q_rd_11": {
    "stemZh": "发表在《自然》杂志上的一项近期研究有什么发现？",
    "evidenceZh": "在得知一个陌生人的细节后，我们会错误地认为对方也了解我们。",
    "why": "凭借专有名词 Nature 快速定位至文章首段第一句：After finding out details about a stranger, we mistakenly think that they also know about us（在得知陌生人的一些细节后，我们会错误地以为对方也了解我们）。第三段首句在介绍实验室研究时再次重申这一核心发现：When we know about strangers, we erroneously think they also know about us。C 项中的 get to know about 对应 finding out details about，wrongly assume 精准替换 mistakenly think，故为正确答案。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "比起完全陌生的人，人们对认识自己的人更加诚实。",
        "verdict": "wrong",
        "reason": "偷换核心逻辑：原文讲的是面对其实并不认识自己的陌生人时，因为“单向错觉”而表现得更诚实，而非把“熟识自己的人”和“完全陌生人”作诚实度比较。"
      },
      {
        "key": "B",
        "zh": "我们想要获取其详细信息的人也渴望了解我们。",
        "verdict": "wrong",
        "reason": "偷换概念与主客体：原文是“我们错误以为对方了解我们”，实际上这种社交关系是单向的，陌生人根本不了解我们，更未提及对方“渴望（keen to）”了解我们。"
      },
      {
        "key": "C",
        "zh": "了解到某人情况的人会错误地以为对方也了解自己。",
        "verdict": "correct",
        "reason": "精准同义改写：get to know about a person 对应 finding out details about a stranger，wrongly assume 精准对应 mistakenly think / erroneously think。"
      },
      {
        "key": "D",
        "zh": "彼此熟悉的人在日常交往中往往表现得诚实。",
        "verdict": "wrong",
        "reason": "偷换对象：原文研究的是“单向了解的陌生人（a stranger）”之间产生的认知错觉，而不是“彼此熟悉的人（familiar with each other）”。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "finding out details about a stranger",
        "to": "get to know about a person",
        "note": "同义短语转换：了解某个陌生人的细节概括为了解某个人。"
      },
      {
        "from": "mistakenly think",
        "to": "wrongly assume",
        "note": "高频副词与动词双重替换：mistakenly（错误地）对应 wrongly，think（认为）对应 assume（以为）。"
      }
    ],
    "steps": [
      "利用题干中的期刊名 Nature 直接锁定文章开篇第一、二句。",
      "提取研究核心发现的关键词：mistakenly（错误地）与 also know about us（也了解我们），明确这是一种“单向误判的错觉”。",
      "迅速淘汰遗漏“错误以为”这层核心含义的 A、D 两项（两者均在谈论真正的相互认识或熟人），并排除偷换主体愿望的 B 项。",
      "核对 C 项的 wrongly assume 与原文完全一致，锁定答案 C。"
    ],
    "pitfall": "本题 A、D 两项都沾了“诚实（honest）”和“互相认识”的边，但全部丢掉了文章标题“互惠错觉（Illusion）”以及首句核心副词 mistakenly 的核心信息；抓准“误以为（wrongly assume）”即可秒杀干扰项。",
    "vocabHighlights": [
      {
        "word": "reciprocal",
        "meaning": "adj. 相互的，互惠的"
      },
      {
        "word": "erroneously",
        "meaning": "adv. 错误地（对应原文 mistakenly）"
      },
      {
        "word": "assume",
        "meaning": "v. 假定，以为"
      },
      {
        "word": "one-sided",
        "meaning": "adj. 单方面的，单向的"
      },
      {
        "word": "illusion",
        "meaning": "n. 错觉，幻觉"
      }
    ]
  },
  "q_rd_12": {
    "stemZh": "作为研究对象的住宅区周边发生了什么变化？",
    "evidenceZh": "更令人惊讶的是，研究团队发现，在派发传单之后，收到传单的住宅区周边比对照组住宅区周边的刑事投诉和逮捕案件立即减少了。",
    "why": "按题文同序及关键词 housing developments 定位至最后一段最后一句。该句用 Even more strikingly 引出田野实验的客观统计结果：在发放介绍社区警察个人信息的传单之后，收到传单的住宅区周边区域比起未收到的对照组（the control developments），刑事投诉和逮捕数量明显更少（fewer criminal complaints and arrests）。A 项“那里的犯罪案件比对照组住宅区少”如实概括了这一比较事实，因此选 A。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "那里的犯罪事件比对照组住宅区更少。",
        "verdict": "correct",
        "reason": "精准概括事实：saw fewer crimes than the control developments 如实对应原文的 there were fewer criminal complaints and arrests ... than around the control developments。"
      },
      {
        "key": "B",
        "zh": "他们见证了非法活动更迅速的彻底消除。",
        "verdict": "wrong",
        "reason": "程度夸大：原文只说刑事投诉和逮捕案件“减少（fewer）”，并未实现非法活动的“彻底消除（elimination）”，属典型程度偷换。"
      },
      {
        "key": "C",
        "zh": "当地警方对刑事投诉的反应比以前更快了。",
        "verdict": "wrong",
        "reason": "无中生有：原文对比的是刑事投诉数量的多少，完全未提及警方“出警或反应速度（responded more quickly）”。"
      },
      {
        "key": "D",
        "zh": "当地警方与那里居民的相处比与其他地区更好。",
        "verdict": "wrong",
        "reason": "过度推断：原文居民因看了警察资料传单而觉得警察可能更了解自己、犯罪风险感知更高，从而减少了违法行为，并未讨论“警民关系相处融洽（related better）”。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "there were fewer criminal complaints and arrests",
        "to": "saw fewer crimes",
        "note": "事实归纳：将“刑事投诉与逮捕更少”精炼概括为“犯罪案件更少”。"
      },
      {
        "from": "around the developments that had received the leaflets than around the control developments",
        "to": "than the control developments",
        "note": "比较对象保留：明确将实验组周边与对照组进行对比。"
      }
    ],
    "steps": [
      "顺着第三、四段田野实验的流程，直接定位到总结实际效果的最后一段末句。",
      "紧抓核心比较级：fewer criminal complaints and arrests ... than around the control developments。",
      "排除程度严重夸大的 B 项（把“减少”夸大成“消除”），以及脱离文本臆测警方效率或警民关系的 C、D 两项。",
      "确认 A 项忠实保留了比较级 fewer 与比较对象 control developments，选定 A。"
    ],
    "pitfall": "B 项将原文的 illegal activity（非法活动）与一个强程度词 elimination（消除、根除）绑定在一起极具诱惑性；四级阅读中“减少（fewer / decrease）”绝不能等同于“根除（eliminate）”。",
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
      },
      {
        "word": "complaint",
        "meaning": "n. 投诉，报案"
      },
      {
        "word": "control",
        "meaning": "n. （实验中的）对照组"
      }
    ]
  },
  "q_rd_13": {
    "stemZh": "从老子的名言中我们可以得出什么结论？",
    "evidenceZh": "老子曾说过：“在意别人怎么想，你就会永远成为他们的囚徒。”",
    "why": "题干明确考查开篇第一句老子引语的深层寓意：“在意别人怎么想，你就会永远成为他们的囚徒（Care about what other people think and you will always be their prisoner）”。这里的“囚徒（prisoner）”显然是比喻用法，指精神与自我价值受制于人、无法获得自由。“成为囚徒”正话反说就是“永远无法真正自由（never be truly free）”，而“在意别人怎么想”对应“把别人对我们的评价放在心上（taking to heart others' opinion of us）”，因此锁定 C 项。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "我们应该看穿别人企图让我们成为其囚徒的意图。",
        "verdict": "wrong",
        "reason": "曲解隐喻且无中生有：老子说的是“自己过分在意他人看法”会令自己沦为精神囚徒，而不是“别人企图（attempt）囚禁我们”。"
      },
      {
        "key": "B",
        "zh": "即使我们再怎么努力，也永远无法真正讨好别人。",
        "verdict": "wrong",
        "reason": "张冠李戴：“无法一直让所有人满意”出自第一段最后一句（you can't please all people all of the time），属于作者的后续议论，而非老子名言本身的寓意。"
      },
      {
        "key": "C",
        "zh": "如果把别人对我们的看法放在心上，我们就永远无法真正自由。",
        "verdict": "correct",
        "reason": "精准转化隐喻：taking to heart others' opinion of us 对应 Care about what other people think，never be truly free 准确转化了 always be their prisoner 的比喻义。"
      },
      {
        "key": "D",
        "zh": "我们应该像别人在意我们的观点一样在意别人的看法。",
        "verdict": "wrong",
        "reason": "与原意完全相反：老子的名言和全文主旨都在警示人们不要过度在意他人看法，D 项却倡导互相在意，完全颠倒是非。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "Care about what other people think",
        "to": "taking to heart others' opinion of us",
        "note": "同义短语转换：“在意别人的想法”替换为地道习语“把他人对我们的评价放在心上（take ... to heart）”。"
      },
      {
        "from": "you will always be their prisoner",
        "to": "We can never be truly free",
        "note": "比喻正话反说：“永远做他人的囚徒”即“永远不可能真正自由”。"
      }
    ],
    "steps": [
      "严格限定审题范围：只针对首段第一句的 Lao Zi's quotation 作答，不被同一段后面三句话分散注意力。",
      "完成名言的隐喻转译：将具象比喻 be their prisoner（做囚徒）转化为抽象结果 never be truly free（失去真正自由）。",
      "拆穿干扰项：B 项偷用了首段末句的句子张冠李戴；A 项错将“自我束缚”当成“他人算计”；D 项态度完全反向。",
      "核对 C 项的逻辑条件关系与词汇替换，确定选 C。"
    ],
    "pitfall": "B 项高度复现了第一段第四句的意思，但题目问的是“从老子的引语中能得出什么结论”，引语考查题目必须精准对应引号内那句话本身的隐喻含义，切勿张冠李戴同一段的其他句子。",
    "vocabHighlights": [
      {
        "word": "take ... to heart",
        "meaning": "phr. 把……放在心上，认真对待"
      },
      {
        "word": "approval",
        "meaning": "n. 认可，赞许"
      },
      {
        "word": "unproductive",
        "meaning": "adj. 徒劳的，低效的"
      },
      {
        "word": "see through",
        "meaning": "phr. 看穿，识破"
      },
      {
        "word": "prisoner",
        "meaning": "n. 囚徒，俘虏（喻指受束缚的人）"
      }
    ]
  },
  "q_rd_14": {
    "stemZh": "什么可能解释了我们渴望被喜爱或被认可的需求？",
    "evidenceZh": "我们需要明白，当我们拼命渴望别人认可我们时，其背后是被内心深处那个依然害怕被抛弃的小孩所驱使。",
    "why": "利用题干中的 need to be liked 定位至第三段首句：This need to be liked can be traced back to when we were children ...（这种被喜爱的需要可以追溯到我们还是孩子的时候）。随后的段尾总结句给出最终答案：当我们极度渴望得到他人认可时，背后驱使我们的是内心那个依然害怕被抛弃的小孩（driven by that little kid part of us that is still terrified of abandonment）。D 项中的 early childhood fear 对应 little kid ... terrified，being deserted 对应 abandonment，精准解释了根源，故为正确答案。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "我们对与他人互动的强烈渴望。",
        "verdict": "wrong",
        "reason": "张冠李戴：第三段提到小孩通过“与他人的互动（interactions with others）”来认识自己与世界期望，互动只是儿童学习的渠道，并非导致讨好心理的深层根源。"
      },
      {
        "key": "B",
        "zh": "我们对世界运作方式的理解。",
        "verdict": "wrong",
        "reason": "张冠李戴：第三段第二句说小孩也在学着了解“世界如何运作（how the world works）”，这是儿童成长的任务之一，不是渴望被认可的原因。"
      },
      {
        "key": "C",
        "zh": "我们对被抛弃之痛的认知。",
        "verdict": "wrong",
        "reason": "偷换情感态度：C 项虽抄了原词 abandonment，却把关键心理情绪 terrified of（极度恐惧）偷换成了冷静理性的 knowledge（知识/认知），歪曲了原意。"
      },
      {
        "key": "D",
        "zh": "我们童年时期害怕被遗弃的恐惧。",
        "verdict": "correct",
        "reason": "精准同义转述：early childhood 对应 little kid，fear 对应 terrified of，being deserted 对应原文名词 abandonment（被抛弃）。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "that little kid part of us",
        "to": "Our early childhood",
        "note": "阶段概括：“我们内心那个小孩的部分”对应“童年早期”。"
      },
      {
        "from": "terrified of abandonment",
        "to": "fear of being deserted",
        "note": "高频动词同义替换：terrified（极度害怕的）替换为 fear，abandon（抛弃）替换为同义动词 desert。"
      }
    ],
    "steps": [
      "依据题干关键词 need to be liked 快速定位第三段首句（can be traced back to 明确提示追溯根源）。",
      "略读中间儿童学走路与认识世界的铺垫，紧抓第三段最后一句的因果点睛句：being driven by ... still terrified of abandonment。",
      "排雷：警惕第三段原词重现陷阱——A 项截取 interactions，B 项截取 how the world works，C 项截取 abandonment 却把“恐惧”偷换为“认知”。",
      "确认 desert 与 abandon 为同义替换，最终锁定完整传达“童年 + 恐惧被抛弃”的 D 项。"
    ],
    "pitfall": "C 项是最危险的诱饵，因为它直接原词复现了段尾关键词 abandonment，很多考生容易忽略前面的动词 terrified 被偷偷改成了静态名词 knowledge（了解/认知），从而掉入偷换概念的陷阱。",
    "vocabHighlights": [
      {
        "word": "desert",
        "meaning": "v. 抛弃，遗弃（对应原文 abandon）"
      },
      {
        "word": "account for",
        "meaning": "phr. 解释，说明……的原因"
      },
      {
        "word": "validation",
        "meaning": "n. 认可，确认"
      },
      {
        "word": "terrified",
        "meaning": "adj. 极度恐惧的，吓坏了的"
      },
      {
        "word": "trace back to",
        "meaning": "phr. 追溯到……"
      }
    ]
  },
  "q_rd_15": {
    "stemZh": "即便大脑在萎缩，有什么方法有助于保持大脑健康？",
    "evidenceZh": "哪怕是简单到换条不同的路线去杂货店，或者去一个新地方度假这样的事情，也能让大脑保持健康。",
    "why": "依据题干关键词 even as it shrinks（即便它正在萎缩）定位至第四段末句，该句提出积累新奇体验与技能能强健心理结构，哪怕大脑在萎缩。紧接着第五段具体给出保持大脑健康的方法：先提填字游戏等常规训练工具，第二句随后补充“哪怕简单到换条不同路线去杂货店，或者去新地方度假，都能保持大脑健康（keep the brain healthy）”。D 项“用新奇的方式对待日常事务”高度概括了换路线买菜、去新地度假这一生活实例，故为正确答案。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "通过常规方式完成日常惯例活动。",
        "verdict": "wrong",
        "reason": "偷换概念且意思相反：第五段首句说的是像填字游戏和健脑软件这类“常规健脑方法（Conventional fixes）”，而非建议人们“墨守成规地做日常琐事”，这恰恰与第二句“走不同路线”的新奇做法相反。"
      },
      {
        "key": "B",
        "zh": "避免担忧我们的心理持久力。",
        "verdict": "wrong",
        "reason": "无中生有：第五段只提到填字游戏等有助于提升 mental durability（脑力持久性），原文从未建议“不要去担心”它。"
      },
      {
        "key": "C",
        "zh": "模仿老狗学习新把戏的方式。",
        "verdict": "wrong",
        "reason": "望文生义：文章最后一句引用“不是老狗学不会新把戏（It's not that old dogs can't learn new tricks）”是一句英语俗语，借指老年人并非学不会新东西，而非让人真的去模仿狗。"
      },
      {
        "key": "D",
        "zh": "以新奇的方式处理日常事务。",
        "verdict": "correct",
        "reason": "精准归纳例证：taking a different route to the grocery store 等日常小事的改变，正是“用新奇方式对待日常事务（Approaching everyday tasks in novel ways）”。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "taking a different route to the grocery store or going somewhere new on vacation",
        "to": "Approaching everyday tasks in novel ways",
        "note": "抽象概括例证：将去杂货店换条路等具体生活事例提炼为“以新方式应对日常任务”。"
      },
      {
        "from": "keep the brain healthy",
        "to": "maintain the health of our brain",
        "note": "动词搭配等价转换：keep ... healthy 改写为 maintain the health of。"
      }
    ],
    "steps": [
      "利用题干短语 even as it shrinks 回文定位至第四段最后两词，顺读第五段寻找具体保脑措施。",
      "读懂第五段第二句的两个日常实例：换条路去杂货店、去新地方度假，提炼出“改变常规、尝试新方法”的核心共性。",
      "拆穿 A 项视觉干扰：A 项借用了第五段开头的 Conventional 和日常（daily routines）拼凑出与主旨截然相反的“按常规办事”，务必果断排除。",
      "排除无中生有的 B 项和荒诞字面理解的 C 项，锁定 D 项。"
    ],
    "pitfall": "第五段首词就是 Conventional（常规的），而 D 项使用的是段末隐含的 novel（新奇的），只扫段首词不读第二句的考生极易被 A 项中的 by conventional means 误导。",
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
      },
      {
        "word": "conventional",
        "meaning": "adj. 常规的，传统的"
      },
      {
        "word": "grocery store",
        "meaning": "n. 杂货店，食品超市"
      }
    ]
  },
  "q_rd_16": {
    "stemZh": "发表在《心理学与老龄化》期刊上的那项 2012 年研究有什么发现？",
    "evidenceZh": "虽然基因能够激发做新事情的兴趣，但 2012 年发表在《心理学与老龄化》期刊上的一项研究发现，完成诸如解谜和数字游戏之类的推理任务可以增强这种对新体验的渴望，进而反过来让大脑焕发活力。",
    "why": "利用年份与期刊名 2012 study 和 Psychology and Aging 直接锁定末段倒数第二句的长难句。句中清晰呈现了三步因果传递链：完成推理任务（completing reasoning tasks）— 增强对新体验的渴望（enhance that desire for novel experiences）— 进而令大脑焕然一新（which can, in turn, refresh the brain）。由于非限制性定语从句中的 which 指代前文的“对新体验的渴望”，因此得出“渴望新体验有助于使大脑焕发活力”，C 项中的 renovate 精准替换 refresh，故锁定 C。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "想要解决谜题的愿望会增强一个人的推理能力。",
        "verdict": "wrong",
        "reason": "因果倒置且张冠李戴：原文是“完成解谜等推理任务”增强了“对新体验的渴望”，而非“想要解谜的愿望”增强“推理能力”。"
      },
      {
        "key": "B",
        "zh": "玩数字游戏出人意料地刺激了一个人的记忆力。",
        "verdict": "wrong",
        "reason": "张冠李戴：提升记忆力（improved function and memory）是末段第二句“老年人承担新事业”研究中的结果，而不是 2012 年数字游戏研究提到的直接发现。"
      },
      {
        "key": "C",
        "zh": "渴望新体验有助于使大脑焕发活力。",
        "verdict": "correct",
        "reason": "精准梳理定语从句指代：Desiring new experiences 对应原文 desire for novel experiences，renovate the brain 对应定语从句中的 refresh the brain。"
      },
      {
        "key": "D",
        "zh": "学习新把戏不应仅限于“老狗”（老年人）。",
        "verdict": "wrong",
        "reason": "曲解俗语且答非所问：末句老狗学新把戏是科学家用来总结全段的比喻（老年人只是没意识到为什么该学，而非学不会），并非 2012 年研究的具体发现。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "desire for novel experiences",
        "to": "Desiring new experiences",
        "note": "词性与用词转换：名词短语改为动名词短语，novel 替换为常用词 new。"
      },
      {
        "from": "refresh the brain",
        "to": "renovate the brain",
        "note": "跨段同义词照应：末段使用 refresh the brain（使大脑焕新），选项调用本文第二段出现过的高频词 renovate（翻新、使恢复活力）。"
      }
    ],
    "steps": [
      "凭借高辨识度专有名词 2012 study 与 Psychology and Aging 一步定位至末段倒数第二句。",
      "用箭头法理清复杂长难句的因果链：完成推理任务（解谜、数字游戏）-> 增强对新体验的渴望 -> 进而（which）焕新大脑。",
      "明确非限制性定语从句中 which 指代的是“渴望（desire）”而非“推理任务”本身。",
      "排雷：拆穿 A 项的因果颠倒与 B 项将前文 memory 错配过来的张冠李戴，选定 C 项。"
    ],
    "pitfall": "本题难点在于末段信息密集且长难句带有 which 引导的定语从句，同时前两句刚刚提过 improved function and memory，如果不把两项研究和句内因果箭头画清楚，极易错选 A 或 B。",
    "vocabHighlights": [
      {
        "word": "renovate",
        "meaning": "v. 翻新，使焕发活力（对应原文 refresh）"
      },
      {
        "word": "in turn",
        "meaning": "phr. 转而，反过来，进而"
      },
      {
        "word": "openness",
        "meaning": "n. 开放性，乐于接受新事物"
      },
      {
        "word": "reasoning",
        "meaning": "n. 推理，思考"
      },
      {
        "word": "enterprise",
        "meaning": "n. 事业，进取性的新尝试"
      }
    ]
  },
  "q_rd_17": {
    "stemZh": "根据文章，随着年龄增长会发生什么变化？",
    "evidenceZh": "脑细胞的变化会影响大脑不同区域之间的沟通。",
    "why": "依据题干关键词 as we become aged（随着年龄增长）回文定位至第三段。该段系统描述大脑随年龄老化的生理变化：第一二句指出“某些部位会萎缩（Certain parts shrink）”；第三句接着说明“脑细胞的变化会影响大脑不同区域之间的沟通（affect communication between different regions of the brain）”；第四句指出血管变窄导致血流量减少。C 项“我们大脑内部的沟通减弱了”准确对应第三句语义，其余三项均在范围或程度上进行了错误篡改。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "我们的人际互动能力会退化。",
        "verdict": "wrong",
        "reason": "偷换概念：原文说的是“大脑内部不同区域之间的信号沟通（communication between different regions of the brain）”，并非对外社交层面的“人际互动技能（interaction skills）”。"
      },
      {
        "key": "B",
        "zh": "我们大脑的一些部分停止运转。",
        "verdict": "wrong",
        "reason": "程度夸大：原文仅指出某些对学习、记忆和规划很重要的脑区会“萎缩（shrink）”，并未严重到完全“停止运转（stop functioning）”。"
      },
      {
        "key": "C",
        "zh": "我们大脑内部的沟通减弱了。",
        "verdict": "correct",
        "reason": "精准同义转述：Communication within our brain 对应 communication between different regions of the brain，weakens（减弱）对应此语境下的 affect（受不利影响）。"
      },
      {
        "key": "D",
        "zh": "我们的整个大脑开始萎缩。",
        "verdict": "wrong",
        "reason": "以偏概全（范围扩大）：原文明确限定是“某些部分萎缩（Certain parts shrink）”，D 项擅自将其扩大为“整个大脑（whole brain）”。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "communication between different regions of the brain",
        "to": "Communication within our brain",
        "note": "空间概括：“大脑不同区域之间的沟通”精简为“我们大脑内部的沟通”。"
      },
      {
        "from": "affect",
        "to": "weakens",
        "note": "语境具体化：在衰老背景下，脑细胞变化对脑区沟通的“影响”即为使之“减弱”。"
      }
    ],
    "steps": [
      "利用题文同序及年龄主题，定位第三段 The brain ages just like the rest of the body。",
      "逐句精读第三段的生理变化，尤其关注范围限定词（Certain parts）和动词（shrink、affect、reduced）。",
      "逐一识破范围与程度陷阱：D 项把 Certain parts 夸大为 whole brain；B 项把 shrink 夸大为 stop functioning；A 项将脑内信号联系偷换为人际交往技能。",
      "核对第三句与 C 项的精准匹配，确定选择 C。"
    ],
    "pitfall": "第三段第二句出现 Certain parts shrink，几乎专门诱使粗心考生误选 D 项的 whole brain shrinks；在四级阅读中，部分（certain parts / some）与全部（whole / all）的偷换属于最高频失分点之一。",
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
        "meaning": "v. 变窄，收缩"
      },
      {
        "word": "blood vessel",
        "meaning": "n. 血管"
      },
      {
        "word": "weaken",
        "meaning": "v. 减弱，削弱"
      }
    ]
  },
  "q_rd_18": {
    "stemZh": "达夫纳医生针对抗击记忆力衰退提出了什么建议？",
    "evidenceZh": "换句话说，让你的大脑保持忙碌和运转。同时也要让身体积极动起来，因为锻炼是众所周知的大脑助推器。",
    "why": "按照题文同序及最后一道建议题的规律，直接定位文章最后一段。第七段末尾医生先提出防止记忆衰退的最好办法是建立大脑认知储备，最后一段紧接着给出具体行动指引：多读书、看电影、培养新爱好或参加迫使人以新方式思考的活动；随后用总结词 In other words（换句话说）和并列词 And also 提炼出核心双建议——既要让大脑保持忙碌和运转（keep your brain busy and working），也要积极参加体育锻炼（get physically active）。D 项“在身体和心理上都保持活跃”完美概括了这两点，选 D。",
    "optionBreakdown": [
      {
        "key": "A",
        "zh": "定期进行身体和心理体检。",
        "verdict": "wrong",
        "reason": "偷换概念：第七段建议“去看医生检查正在服用的药物和健康问题”，是为了排查引起记忆问题的诱因，并非倡导“定期身心体检（regular ... checkups）”。"
      },
      {
        "key": "B",
        "zh": "服用有助于增强大脑功能的药物。",
        "verdict": "wrong",
        "reason": "偷换主语且无中生有：末句说的是“体育锻炼（exercise）是众所周知的大脑助推器（brain booster）”，B 项却把“锻炼”偷换成了“吃药（Taking medicine）”，完全违背原文。"
      },
      {
        "key": "C",
        "zh": "参加已知的记忆修复活动。",
        "verdict": "wrong",
        "reason": "无中生有：原文建议参加迫使自己用新方式思考的新爱好和活动来建立认知储备，并未提及所谓的“已知的记忆修复活动（known memory repair activities）”。"
      },
      {
        "key": "D",
        "zh": "在身体和精神（大脑）上都保持活跃。",
        "verdict": "correct",
        "reason": "精准合并总结句：physically active 直接照应原词 get physically active，mentally active 准确概括了 keep your brain busy and working。"
      }
    ],
    "paraphraseMap": [
      {
        "from": "keep your brain busy and working",
        "to": "Staying active ... mentally",
        "note": "同义提炼：“让大脑保持忙碌和运转”浓缩为“在精神/脑力上保持活跃”。"
      },
      {
        "from": "get physically active",
        "to": "Staying active both physically and mentally",
        "note": "原词复现与并列整合：直接保留 physically active 并与脑力活跃合并为 both ... and ... 结构。"
      }
    ],
    "steps": [
      "顺读至文章最后一段，锁定达夫纳医生给普通人的直接行动建议。",
      "利用总结信号词 In other words（换言之）和并列信号词 And also（而且也），瞬间抓取“大脑运转 + 身体运动”两大核心动作。",
      "排除视觉诱饵 B 项（虽有 boost one's brain，但主语被偷换为吃药），并剔除偷换体检概念的 A 项及无中生有的 C 项。",
      "核对 D 项 both physically and mentally 的双维度概括，选定 D。"
    ],
    "pitfall": "末句出现的 brain booster 很容易让考生一眼看中 B 项里的 boost one's brain，但务必仔细核对主语：文章说的是“运动”能增强大脑功能，而不是“吃药”。",
    "vocabHighlights": [
      {
        "word": "cognitive reserve",
        "meaning": "n. 认知储备"
      },
      {
        "word": "booster",
        "meaning": "n. 助推器，增强剂"
      },
      {
        "word": "combat",
        "meaning": "v. 对抗，防止"
      },
      {
        "word": "checkup",
        "meaning": "n. 体检，健康检查"
      },
      {
        "word": "mentally",
        "meaning": "adv. 在精神上，在智力上"
      }
    ]
  },
  "q_tr_01": {
    "stemZh": "本题围绕“尊师重道与教师节”展开，考查中文谚语意译（“一日为师，终身为父”）、古代与现代多时态切换（古代仪式用一般过去时、1985年起至今用现在完成时、普遍文化观念用一般现在时）以及教育文化核心词块的准确表达。",
    "evidenceZh": "参考译文高分亮点句中文对应：1. 中国有句老话，将哪怕一日之师比作终身之父（compares a teacher, even for a single day, to a father for life）。2. 古代学生初见老师时举行隆重仪式，反映出教师受到的高度敬重（reflecting the high regard in which teachers were held）。3. 为弘扬尊师传统，中国自1985年起每年9月10日庆祝教师节（has observed Teachers' Day on September 10 each year since 1985）。4. 尊师是中华民族的传统美德，在当今继续得到弘扬与践行（continues to be promoted and practiced today）。",
    "why": "2026年6月“尊师重道与教师节”属于中国传统文化与教育类高频翻译真题。高分突破的关键有三层：首先，将中文对称谚语转化为英文比较结构（compare A to B），避免逐字硬译的生涩感；其次，严格锚定时间状语切换三种时态（In ancient times用过去时held，since 1985用现在完成时has observed，当今文化事实用一般现在时）；最后，用现在分词reflecting作结果状语及定语从句加被动语态continues to be promoted and practiced整合末句，使行文兼具准确度与紧凑感。",
    "posNote": "词性与语法槽位避坑指南：1. 主谓与时态一致：“自1985年开始”出现since 1985，主句动词不能写成一般过去时observed，必须用现在完成时has observed/designated。2. 介词与固定搭配：“表达敬意”中respect作名词搭配for（respect for teachers），作动词直接接宾语（respect teachers），切忌混写成respect to teachers或missing介词。3. 不定式与形容词词性区分：“做人的道理”用how to conduct themselves（动词conduct + 反身代词），不要误用名词conduct或拼错principle；“隆重的”修饰名词ceremony须用形容词formal/grand/solemn。4. 被动语态不能漏be动词：“得到了发扬光大”是传统美德“被弘扬”，必须写成continues to be promoted，不能直接写continues to promote。",
    "steps": [
      "第一步处理首句谚语：主干用An old Chinese saying compares a teacher to a father，再用插入语even for a single day和介词短语for life形成时间对比。",
      "第二步定位全段三条时态时间线：In Chinese culture用一般现在时（pass on / teach），In ancient times切一般过去时（held / met），since 1985切现在完成时（has observed），结尾回一般现在时。",
      "第三步升级长句衔接：用reflecting the high regard in which teachers were held处理“足见老师地位之高”，用to preserve the tradition不定式表目的，末尾用continues to be promoted and practiced被动语态收官。"
    ],
    "pitfall": "切忌把“做人的道理”中式直译为the principle of being a human，地道写法是how to conduct themselves或how to be a person of integrity；另外Teachers' Day的复数所有格撇号必须放在s后面（Teachers' Day），写成Teacher's Day会扣分。",
    "vocabHighlights": [
      {
        "word": "pass on / impart knowledge",
        "meaning": "v.+n. 传授知识"
      },
      {
        "word": "conduct oneself",
        "meaning": "v.+pron. 为人处世，立身做人"
      },
      {
        "word": "formal / solemn ceremony",
        "meaning": "adj.+n. 隆重的仪式"
      },
      {
        "word": "observe Teachers' Day",
        "meaning": "v.+n. 庆祝/过教师节"
      },
      {
        "word": "traditional Chinese virtue",
        "meaning": "adj.+n. 中华传统美德"
      }
    ]
  },
  "q_tr_02": {
    "stemZh": "本题围绕“中国传统餐桌礼仪”展开，重点考查中文无主句向英文被动语态的转化（“就餐座位的安排非常讲究”）、方位空间介词/分词表达（“正对大门”），以及餐饮待客场景中动词与名词的准确搭配。",
    "evidenceZh": "参考译文高分亮点句中文对应：1. 餐桌礼仪是中华传统文化的重要组成部分，体现了向宾客展示的热情与礼貌（reflects the warmth and courtesy shown to guests）。2. 座位安排极为讲究：主人正对大门而坐，主宾坐在主人身旁（Seating is arranged with particular care: the host sits facing the door, and the guest of honor sits beside the host）。3. 这种习俗已延续数千年，在促进和谐人际关系方面发挥了重要作用（have survived for thousands of years and have played an important role in fostering harmonious relationships）。",
    "why": "“中国传统餐桌礼仪”是生活民俗类翻译典范，得分核心在于拆解中文多逗号流水句并精准落地生活动词。首句利用并列谓语is ... and reflects ... 避免两句各自独立零碎；第三句把中文无主句“座位安排非常讲究”转化为被动句Seating is arranged with particular care作总领，随后用冒号自然引出主人与主宾座次，并用现在分词facing the door简化方向状语；尾句由一般现在时过渡到现在完成时have survived ... and have played，紧扣“已延续了数千年”。",
    "posNote": "词性与语法槽位避坑指南：1. 名词与形容词并列词性统一：“热情有礼”若放在reflects后作宾语，必须转为名词warmth and courtesy（或hospitality and politeness），不能直接用形容词warm and polite作reflects的宾语。2. 无主句必补主语或用被动：“就餐座位的安排非常讲究”中文没有动作发出者，英文不能空着主语写Arrange seats carefully，而要将Seating作主语并用被动语态is arranged。3. 动词与介词区分：“正对大门”中facing是现在分词作伴随状语（sits facing the door），不要直接把动词face原形跟在sits后（sits face错误），也可用介词opposite the door。4. 介词in后接动名词：“在促进……起到重要作用”中in后必须用fostering/promoting，不能用动词原形foster。",
    "steps": [
      "第一步利用题干给出的dining etiquette，合并首句为Dining etiquette is an important part of ... and reflects ...。",
      "第二步处理第三句空间布局：先用被动总起Seating is arranged with particular care:，再用冒号衔接the host sits facing the door和the guest of honor sits beside the host。",
      "第三步切换尾句时态并检查搭配：针对“已延续数千年”改用现在完成时have survived ... and have played an important role in fostering harmonious relationships。"
    ],
    "pitfall": "“添酒加菜”切勿字面直译为add wine and add vegetables（vegetable只指蔬菜而不指菜肴），地道动作表达是refills the guests' wine glasses and serves them more food；“最重要的客人”优先用固定词组guest of honor。",
    "vocabHighlights": [
      {
        "word": "dining etiquette",
        "meaning": "n. 餐桌礼仪"
      },
      {
        "word": "warmth and courtesy",
        "meaning": "n. 热情与礼貌（名词搭配）"
      },
      {
        "word": "guest of honor",
        "meaning": "n. 主宾，最重要的客人"
      },
      {
        "word": "refill",
        "meaning": "v. 再斟满，添满（refill wine glasses）"
      },
      {
        "word": "foster harmonious relationships",
        "meaning": "v.+adj.+n. 促进和谐人际关系"
      }
    ]
  },
  "q_tr_03": {
    "stemZh": "本题围绕中国传统“礼尚往来与赠礼习俗”展开，重点考查动名词作主语避免头重脚轻、“短定语前置+长定语后置”拆解复杂修饰语，以及伴随状语与礼俗词汇的规范表达。",
    "evidenceZh": "参考译文高分亮点句中文对应：1. 在亲朋好友之间互赠礼物是中国传统文化中的重要社交习俗（Exchanging gifts among relatives and friends is an important social custom）。2. 一份用心挑选且契合收礼人喜好的礼物能够加固送礼者与收礼者之间的纽带（A thoughtfully chosen gift that suits the recipient can strengthen the bond）。3. 遵循回礼的传统，中国人在收到礼物时会致谢并在适当时候回赠一份（Following the tradition of returning courtesies, people in China thank the giver ... and offer one in return）。",
    "why": "2026年6月“礼尚往来”主题看似平易，却暗藏多处中文长定语与多动词流水句陷阱。高分写法首先用动名词短语Exchanging gifts among relatives and friends作首句主语，规避动词原形直接起句的语法失误；其次用“短定语前置（thoughtfully chosen）+ 长定语后置（that suits the recipient）”优雅拆解第三句双定语；最后利用题干提示词结合分词短语Following the tradition of ... 串联“道谢”与“回赠”，全篇统一使用一般现在时陈述文化惯例，简洁而流畅。",
    "posNote": "词性与语法槽位避坑指南：1. 动词不能直接作主语：“亲朋好友之间互赠礼物是……”中，“互赠礼物”是主语，英语必须将动词exchange变为动名词Exchanging gifts（或名词短语gift exchange），绝不能写Exchange gifts ... is ...。2. 副词修饰过去分词：“精心挑选的礼物”中“精心地”修饰“挑选”，必须用副词thoughtfully/carefully修饰过去分词chosen，不能写成thoughtful chosen。3. 主谓一致与三单：A gift conveys ... as well as offering ... 中主语是单数A gift，动词conveys要加-s，而as well as作为介词短语，后面要接动名词offering。4. 伴随分词逻辑一致：“遵循……传统，中国人……”主句主语是people，主动“遵循”，故句首用现在分词Following，不要误用过去分词Followed。",
    "steps": [
      "第一步搭建动名词主语句：Exchanging gifts among relatives and friends is an important social custom in traditional Chinese culture。",
      "第二步处理递进情感句：用A gift conveys affection as well as offering something of material value体现“不仅是物质，更是情感”，避免死板直译。",
      "第三步拆解双定语并收束回礼句：将“精心挑选、符合喜好”拆为A thoughtfully chosen gift that suits the recipient，末句用Following the tradition of ... 引出thank the giver和offer one in return。"
    ],
    "pitfall": "“回赠礼物”千万不要译为give back a gift或return a gift（在英语里容易被理解为把原礼物退回或拒收），标准地道表达是offer/give a gift in return。",
    "vocabHighlights": [
      {
        "word": "exchange gifts",
        "meaning": "v.+n. 互赠礼物（作主语用动名词 Exchanging）"
      },
      {
        "word": "convey affection",
        "meaning": "v.+n. 表达情感"
      },
      {
        "word": "thoughtfully chosen",
        "meaning": "adv.+v.(过去分词) 精心挑选的"
      },
      {
        "word": "strengthen the bond",
        "meaning": "v.+n. 加深感情纽带"
      },
      {
        "word": "in return",
        "meaning": "prep.+n. 作为回礼/回报"
      }
    ]
  },
  "q_tr_04": {
    "stemZh": "本题围绕“北京四合院与传统民居”展开，重点考查建筑格局描述（be characterized by + 过去分词/现在分词定语状语）、“介词+关系代词”定语从句（of which the most typical one is），以及“数量减少”主语转换与高分表语结构（be of great significance to）。",
    "evidenceZh": "参考译文高分亮点句中文对应：1. 四合院是一种传统中式住宅建筑，其特点是房屋建在院子四周并将院子合围在中央（which is characterized by houses built around a courtyard, enclosing the courtyard in the middle）。2. 中国各地有多种类型的四合院，其中最典型的是北京的四合院（of which the most typical one is in Beijing）。3. 如今随着现代城市发展，传统四合院的数量已逐渐减少，但因其独特建筑风格，它对中国文化传承与历史研究具有重要意义（the number of traditional Siheyuan has gradually decreased ... is of great significance to）。",
    "why": "“北京四合院”集中考察了四级翻译中最具区分度的四个语法高分点：第一，用非限制性定语从句which is characterized by ... 替换平庸的Its feature is ...，并用built around与enclosing分别展现被动建造与主动合围；第二，用of which the most typical one is精准连接总分关系；第三，敏锐将“四合院已逐渐减少”转为the number of traditional Siheyuan has gradually decreased，符合英语数量主语习惯；第四，尾句用be of great significance to代替very important，显著拔高语言质感。",
    "posNote": "词性与语法槽位避坑指南：1. 分词主动与被动区分：“建在院子四周的房屋”中houses是被建，用过去分词built作后置定语；“将院子合围在中间”是房屋/布局主动环绕，用现在分词enclosing作伴随状语。2. 介词短语与连词区分：“因其独特的建筑风格”中“因”后接的是名词短语its unique architectural style，必须用介词短语because of（或due to），绝不能用连词because直接接名词短语。3. “数量”主谓一致：“the number of + 复数/集合名词”表示“……的数量”，中心词是单数number，因此现在完成时助动词用has gradually decreased。4. 名词与形容词转化：“重要意义”既可用形容词very important，也可用“of + 抽象名词”结构of great significance，注意significance为名词而不能写of great significant。",
    "steps": [
      "第一步利用被动结构与定语从句完成首句：Siheyuan is a kind of traditional Chinese residential building, which is characterized by houses built around a courtyard, enclosing the courtyard in the middle。",
      "第二步处理居住特点与分布：第二句用is usually warm in winter and cool in summer接分词短语offering a comfortable environment；第三句用There are many types ..., of which the most typical one is in Beijing。",
      "第三步准确处理结尾转折：用the number of traditional Siheyuan has gradually decreased（现在完成时），but后接because of its unique architectural style和is of great significance to ...。"
    ],
    "pitfall": "很多同学会把“传统四合院逐渐减少”直译为Traditional Siheyuan has decreased，英语中建筑物本身不能“减少”，必须补出the number of；此外，“冬暖夏凉”固定说warm in winter and cool in summer，季节名词winter、summer前不要加定冠词the。",
    "vocabHighlights": [
      {
        "word": "residential building",
        "meaning": "adj.+n. 住宅建筑"
      },
      {
        "word": "be characterized by",
        "meaning": "v.+prep. 以……为特点"
      },
      {
        "word": "enclose",
        "meaning": "v. 合围，环绕，围住"
      },
      {
        "word": "of great significance to",
        "meaning": "prep.+n. 对……具有重要意义"
      },
      {
        "word": "inheritance",
        "meaning": "n. 传承，继承"
      }
    ]
  },
  "q_tr_05": {
    "stemZh": "本题围绕“中国农历与传统节气农事”展开，重点考查跨千年时间跨度下的三重时态精准切换（起源与古人活动用一般过去时、“长期以来”用现在完成时、现行节俗与使用现状用一般现在时及被动语态），以及农耕历法高频词汇的准确使用。",
    "evidenceZh": "参考译文高分亮点句中文对应：1. 起源于数千年前中国的农历，是根据太阳和月亮的运行规律制定的（which originated in China thousands of years ago, was formulated based on the movements of the sun and the moon）。2. 长期以来，农历在农业生产和民众日常生活中发挥着重要作用（For a long time, the lunar calendar has played an important role）。3. 它是中国传统文化的重要组成部分，如今依然被广泛使用（It is an important component of traditional Chinese culture and is still widely used today）。",
    "why": "“中国农历”是一道横跨古代起源、历史延续与当代应用的经典文化科技翻译题。其核心得分策略是先画好“时间轴”：第一句“数千年前起源、制定”以及第三句“古人记录、安排农活”必须锁定一般过去时；第二句出现明确延续信号“长期以来（For a long time）”，须立即切换为现在完成时has played；末两句讲当今节日依托和当代仍在使用，切回一般现在时且尾句使用被动语态is still widely used。句式上通过首句非限制性定语从句与第三句in order to目的链让段落紧凑流畅。",
    "posNote": "词性与语法槽位避坑指南：1. 及物与不及物动词主动被动区分：“起源于”originated（或dates back to）是不及物动词，千万不能写成was originated in；而“根据……制定”中的formulate是及物动词，农历是“被制定”，必须写成was formulated。2. 副词与形容词词性区分：“最有效地利用”修饰动词make use of（或修饰use中的形容词efficient），应译为make the most efficient use of（形容词最高级修饰名词use）或use ... most efficiently（副词最高级修饰动词）。3. 形容词修饰名词：“农业生产”用agricultural production，“气候条件”用climatic conditions，不要误用名词agriculture/climate直接堆砌。4. 语态不能漏be：“当今依然广为使用”是农历被使用，必须保留系动词is构成is still widely used today。",
    "steps": [
      "第一步合并首句两个动作：用which originated in China thousands of years ago作插入定语从句，主句使用被动语态was formulated based on the movements of the sun and the moon。",
      "第二步锚定第二、三句时态：第二句见For a long time用现在完成时has played an important role；第三句写Ancient people回切一般过去时recorded dates and arranged farm work，接in order to引出高效利用资源与提升产量质量。",
      "第三步规范处理末两句：注意Spring Festival、Mid-Autumn Festival首字母大写且前可带定冠词或直接用The Chinese Spring Festival ... are based on the lunar calendar，末句用is still widely used today收尾。"
    ],
    "pitfall": "专有名词Spring Festival和Mid-Autumn Festival首字母漏大写是常见无谓失分点；另外“提高农作物的产量和质量”优先用the yield and quality of crops，不要把“农作物产量”写成错词或误用production与quality并列不搭。",
    "vocabHighlights": [
      {
        "word": "originate in",
        "meaning": "v.+prep. 起源于（不及物，无被动）"
      },
      {
        "word": "formulate",
        "meaning": "v. 制定，规划（被动 be formulated）"
      },
      {
        "word": "agricultural production",
        "meaning": "adj.+n. 农业生产"
      },
      {
        "word": "efficient use of",
        "meaning": "adj.+n.+prep. 对……的高效利用"
      },
      {
        "word": "yield and quality of crops",
        "meaning": "n. 农作物的产量和质量"
      }
    ]
  },
  "q_tr_06": {
    "stemZh": "本题围绕“春节贴‘福’字习俗”展开，重点考查如何善用题干括号提示词（the character fu、auspicious）、用现在分词与排比短语整合中国节庆寓意表达，以及用地道习语upside down和现在完成时have arrived准确传达民俗谐音梗。",
    "evidenceZh": "参考译文高分亮点句中文对应：1. 汉语中的“福”字象征着幸福和好运，是中国传统文化中最常用的吉祥符号之一（signifying happiness and good luck, is one of the most commonly used auspicious symbols）。2. 人们通常在红纸上写一个大大的福字，寓意期盼家庭幸福、社会安定、国家昌盛（family happiness, social stability and national prosperity）。3. 人们有时会把福字倒过来贴，表示幸福和好运已经到来（put the character of fu upside down, indicating that happiness and good luck have arrived）。",
    "why": "“贴‘福’字”语言亲切、逻辑清晰，是考场最容易稳拿高分的节庆民俗题。提分策略在于两点：一是词汇升级与排比对称——把“家庭幸福、社会安定、国家昌盛”浓缩为三组工整的“形容词+名词”结构（family happiness, social stability and national prosperity），并用yearning for代替简单的hope for表达“向往”；二是句法凝练——首句用现在分词signifying ... 作插入定语、第三句用动名词Posting ... 作主语、尾句用indicating that ... have arrived伴随收束，既避开中式短句堆砌又精准传递“福倒（到）了”的完成时态。",
    "posNote": "词性与语法槽位避坑指南：1. 名词短语排比词性统一：“家庭幸福、社会安定、国家昌盛”三者应保持词性结构一致，均使用“形容词/名词定语 + 抽象名词”（family happiness, social stability and national prosperity），切忌前两个写名词而第三个写成a prosperous country破坏对称。2. 副词修饰过去分词：“最常用的吉祥符号”中“常用”是“被使用”，用副词commonly修饰过去分词used，构成the most commonly used auspicious symbols，不要写成common used。3. 动名词作主语：“春节贴福字是……习俗”中动作作主语须加-ing写成Posting/Pasting the character fu ... is ...。4. 现在完成时体现“已到”：尾句“幸福已到”不能用一般现在时arrive或一般过去时arrived，应使用have arrived（happiness and good luck并列作主语，助动词用复数have）。",
    "steps": [
      "第一步借用题干现成词汇（the character fu / auspicious），首句用signifying happiness and good luck作插入分词定语引出is one of the most commonly used auspicious symbols。",
      "第二步组织第二句长从句：用write a big character of fu on red paper作主干，which means that ... 引出三组对称名词排比。",
      "第三步依次翻译贴福字习俗与倒贴寓意：第三句用Posting ... is a long-standing folk custom；第四句用every family will put ... to express the yearning for ...；第五句用upside down, indicating that ... have arrived。"
    ],
    "pitfall": "“倒过来贴”千万不要生硬直译成paste inversely或upside to down，固定副词短语就是upside down；同时注意题干已拼写好auspicious，抄写时务必核对拼写不要漏掉字母。",
    "vocabHighlights": [
      {
        "word": "auspicious symbol",
        "meaning": "adj.+n. 吉祥符号"
      },
      {
        "word": "social stability",
        "meaning": "adj.+n. 社会安定"
      },
      {
        "word": "national prosperity",
        "meaning": "adj.+n. 国家昌盛"
      },
      {
        "word": "long-standing folk custom",
        "meaning": "adj.+n. 由来已久的民间习俗"
      },
      {
        "word": "upside down",
        "meaning": "adv. 颠倒地，倒过来"
      }
    ]
  },
  "q_tr_07": {
    "stemZh": "本题围绕当代年轻人新潮流“城市漫步（City Walk）”展开，重点考查“近年来”对应的现在完成时、对比连接结构（Unlike ... / not ...; instead, ...）、多动词平行排比以及城市旅游主题高频表达。",
    "evidenceZh": "参考译文高分亮点句中文对应：1. 近年来，“城市漫步”在中国年轻人中悄然兴起，并成为一种旅游新潮流（In recent years, \"city walk\" has quietly emerged among young people in China and has become a new trend in tourism）。2. 与传统旅游不同，城市漫步不以短时间内游览尽可能多景点为目标，而是随意行走或沿着主题路线漫步街头巷尾（Unlike traditional tourism, city walk does not aim to visit as many attractions as possible ... instead, participants wander freely or stroll along themed routes）。3. 这种出行方式能让城市漫步者更深入地了解一座城市的历史与文化（enables city walkers to gain a deeper understanding of a city's history and culture）。",
    "why": "2025年12月“城市漫步”紧贴社会新风尚，得分秘诀在于精准把控对比逻辑与动词画面感。首句见“近年来”即启用现在完成时has quietly emerged ... and has become；第二句用介词Unlike开篇，紧接着用does not aim to ...; instead, ... 清晰剥离“不是快餐式打卡，而是慢节奏探索”的双重对照；中段连续使用taste、admire、learn about和capture等具象动词取代千篇一律的eat、see、take photos，尾句用enables ... to gain a deeper understanding替换平淡的lets ... know，瞬间跃升为一类文水准。",
    "posNote": "词性与语法槽位避坑指南：1. 介词unlike与动词dislike混淆：“与传统旅游不同”开头必须用介词Unlike traditional tourism（或Different from），绝对不能写成动词Dislike traditional tourism。2. 可数名词同级比较：“尽可能多的景点”中attractions/scenic spots是可数复数名词，必须用as many attractions as possible，不能漏掉第二个as，也不能错用修饰不可数名词的much。3. 副词修饰动词：“悄然兴起”与“随意行走”中的“悄然、随意”必须用副词quietly和freely，分别修饰emerged与wander。4. 平行动词时态形态统一：“品尝……，欣赏……，了解……”三个动作并列作Walkers的谓语，必须统一采用一般现在时复数原形taste ..., admire ..., and learn about ...。",
    "steps": [
      "第一步锚定首句时间状语In recent years，搭配现在完成时has quietly emerged ... and has become a new trend in tourism。",
      "第二步架起第二句对比骨架：Unlike traditional tourism, city walk does not aim to visit as many attractions as possible ...; instead, participants wander freely or stroll along themed routes ...。",
      "第三步优化中间行动描写与结尾升华：用taste authentic local snacks、admire distinctive architecture、capture urban scenery等精确搭配，并以enables city walkers to gain a deeper understanding收尾。"
    ],
    "pitfall": "“城市的大街小巷”切勿逐字直译成big streets and small alleys，英语习惯表达是urban streets and alleys；同时注意“与……不同”若用Different from开头，后面主句主语必须紧跟“传统旅游”或“城市漫步”自身，避免悬垂修饰。",
    "vocabHighlights": [
      {
        "word": "quietly emerge",
        "meaning": "adv.+v. 悄然兴起"
      },
      {
        "word": "as many ... as possible",
        "meaning": "固定比较结构 尽可能多的……"
      },
      {
        "word": "stroll along",
        "meaning": "v.+prep. 沿着……漫步"
      },
      {
        "word": "authentic local snacks",
        "meaning": "adj.+n. 地道当地小吃"
      },
      {
        "word": "gain a deeper understanding of",
        "meaning": "v.+n.+prep. 更深入地了解……"
      }
    ]
  },
  "q_tr_08": {
    "stemZh": "本题围绕“袁隆平与超级杂交水稻”展开，重点考查英文长定语后置转化技巧（用过去分词插入语处理“被誉为杂交水稻之父的袁隆平”）、农业科技参数与增幅介词（increase by 20 to 30 percent）以及现在完成时被动语态收束。",
    "evidenceZh": "参考译文高分亮点句中文对应：1. 被誉为“杂交水稻之父”的袁隆平和他的科研团队克服重重困难，研发出了一种超级杂交水稻（Yuan Longping, hailed as the \"Father of Hybrid Rice,\" and his research team overcame numerous difficulties to develop a variety of super hybrid rice）。2. 通过其应用，水稻变得更抗旱抗病，能适应不同气候土壤条件，并能增产20%至30%（becomes more resistant to drought and diseases, can adapt to ..., and can increase yields by 20 to 30 percent）。3. 目前该技术已在多国得到广泛应用，为全球粮食安全做出重大贡献（has been widely applied in many countries, making a major contribution to global food security）。",
    "why": "2025年6月“袁隆平与超级杂交水稻”是人物成就与农业科技结合的重磅真题。中文习惯把长定语堆在人名前，若直接照译会导致主语极度臃肿；高分策略是果断先立主语Yuan Longping，紧随其后用逗号隔出过去分词短语hailed as the \"Father of Hybrid Rice\"作后置插入定语，再连接and his research team。中段将“抗旱抗病、适应条件、提高产量”收拢在同一主语rice之下用三连谓语平铺展开；尾句采用“At present + 现在完成时被动has been widely applied + 现在分词结果状语making a major contribution”黄金收束模板，逻辑与气势俱佳。",
    "posNote": "词性与语法槽位避坑指南：1. 主语与过去分词插位：Yuan Longping是被誉为，而非主动“称赞”，因此插在逗号间的定语必须用过去分词hailed/known as，不能用现在分词hailing。2. 介词增幅之差：“产量提高20-30%”表示净增加幅度，必须用介词by（increase yields by 20 to 30 percent），误用to会变成“增加到20-30%”。3. 形容词与动词词性切换：“抗旱抗病能力更强”可用系表结构becomes more resistant to drought and diseases（resistant为形容词，搭介词to），也可用动词has stronger resistance to（名词resistance），切忌写成more resist。4. 时态主被动分辨：首句科研研发是历史完成事件，用一般过去时overcame；第二句“获得了举世公认的成功”及末句“已经在许多国家得到广泛应用”均强调持续至今的影响，用现在完成时has achieved与现在完成时被动has been widely applied。",
    "steps": [
      "第一步化解首句超长定语：将人名提至最前，写成Yuan Longping, hailed as the \"Father of Hybrid Rice,\" and his research team overcame numerous difficulties to develop ...。",
      "第二步保持主语统一串联第三句：以Through its application作方式状语，主语rice依次接三个并列谓语（becomes more resistant to ... / can adapt to ... / can increase yields by ...）。",
      "第三步精准落地尾句现在完成时被动：At present, this technology has been widely applied in many countries, making a major contribution to global food security。"
    ],
    "pitfall": "本题最致命的扣分陷阱有两个：一是把“提高20-30%”错写为increase to 20-30%导致意思南辕北辙；二是把“被誉为……的袁隆平”生硬放在人名之前写成Be known as ... Yuan Longping，造成双谓语语法崩溃。",
    "vocabHighlights": [
      {
        "word": "be hailed as",
        "meaning": "v.+prep. 被誉为，被公认为"
      },
      {
        "word": "overcome numerous difficulties",
        "meaning": "v.+adj.+n. 克服重重困难"
      },
      {
        "word": "be resistant to",
        "meaning": "adj.+prep. 抗……的，耐……的"
      },
      {
        "word": "increase yields by",
        "meaning": "v.+n.+prep. 使产量提高（某幅度）"
      },
      {
        "word": "global food security",
        "meaning": "adj.+n. 全球粮食安全"
      }
    ]
  },
  "q_tr_09": {
    "stemZh": "本题围绕“中国生态环保举措与国际合作”展开，重点考查政经社会发展高频词块（attach great importance to、take a series of effective measures）、介词including后多项举措的动名词平行结构，以及表现动态渐变的现在进行时比较级。",
    "evidenceZh": "参考译文高分亮点句中文对应：1. 中国政府高度重视环境保护（The Chinese government attaches great importance to environmental protection）。2. 为持续改善民众生活环境，中国采取了一系列有效措施，包括大力发展清洁能源、改善公共交通、推广共享单车和实施垃圾分类（has taken a series of effective measures, including vigorously developing clean energy, improving public transportation, promoting bike-sharing, and implementing waste sorting）。3. 通过这些措施，中国的城市和乡村正在变得越来越绿、越来越美（China's urban and rural areas are becoming greener and more beautiful）。",
    "why": "2024年12月“中国环境保护”几乎囊括了四级社会发展类翻译的所有常考王牌句式。开篇用attaches great importance to奠定正式公文基调；第二句借In recent years激活现在完成时has achieved remarkable results in reducing ...；第三句最显功力——用To continuously improve作目的状语，主句落脚has taken a series of effective measures，随后用介词including引出四个严丝合缝的动名词短语（developing / improving / promoting / implementing）形成工整排比；第四句巧妙用are becoming greener and more beautiful还原“正在绿起来、美起来”的动态演进感。",
    "posNote": "词性与语法槽位避坑指南：1. 介词including后必须统一动名词：including是介词，后面的“发展清洁能源、改善交通、推广单车、实施分类”必须全部转为动名词-ing形式（developing ..., improving ..., promoting ..., and implementing ...），绝不能混用动词原形或不定式。2. 副词修饰动名词：“大力发展”修饰developing须用副词vigorously；“不断改善”修饰improve用副词continuously；“积极参与”修饰participates用副词actively，注意-ly后缀不可漏。3. 动词不定式与动词原形区分：To continuously improve ... 不定式作目的状语，不能漏掉to直接写Improve；而in reducing ... pollution中in为介词，后面reducing须加-ing。4. 比较级规则变化并列：“绿起来、美起来”中单音节green比较级直接加-er（greener），多音节beautiful比较级加more（more beautiful），不可写成beautifuler。",
    "steps": [
      "第一步套用高频政经起手式：The Chinese government attaches great importance to environmental protection，并用In recent years, China has achieved remarkable results in reducing ... 衔接成果。",
      "第二步构造第三句多举措平行结构：To continuously improve ..., China has taken a series of effective measures, including vigorously developing ..., improving ..., promoting ..., and implementing ...。",
      "第三步切换进行时与分词收尾：第四句用are becoming greener and more beautiful展现动态趋势；末句用actively participates in international cooperation, making important contributions收尾。"
    ],
    "pitfall": "第三句四项举措并列最容易在考试紧张时写着写着丢掉-ing，变成including develop clean energy, improve ...；另外“垃圾分类”固定表达是waste sorting或garbage classification，不要自造rubbish dividing等中式搭配。",
    "vocabHighlights": [
      {
        "word": "attach great importance to",
        "meaning": "v.+n.+prep. 高度重视……"
      },
      {
        "word": "achieve remarkable results",
        "meaning": "v.+adj.+n. 取得显著成效"
      },
      {
        "word": "take a series of effective measures",
        "meaning": "v.+n. 采取一系列有效措施"
      },
      {
        "word": "waste sorting",
        "meaning": "n. 垃圾分类"
      },
      {
        "word": "participate in",
        "meaning": "v.+prep. 参与，参加"
      }
    ]
  },
  "q_wr_01": {
    "stemZh": "题干全译：假设校报正在面向学生征集下一期关于“校园机器人的未来应用”的稿件，请你撰写一篇短文投稿。作答时间30分钟，字数要求不少于120词且不超过180词。评分核心：紧扣“校报投稿”身份与“校园内部未来应用场景”，给出具体落地方案及试行监管建议，避免泛谈宏大AI口号。",
    "evidenceZh": "范文高分关键句中文对应：1. 机器人可以通过接管日常事务让大学生活更轻松（Robots could make university life easier by taking over routine tasks）。2. 在大型校园里，配送机器人可以在楼宇间运送实验物资，让工作人员有更多时间处理需要专业判断的工作（leaving staff more time for work that requires their judgment）。3. 学校应从需求明确的区域开展小范围试点（start with a small trial in places where the need is clear），并保留人工服务台供需要个性化帮助的师生使用。4. 校园机器人只有解决具体问题时才会发挥最大效用（Campus robots would be most useful if they solved specific problems）。",
    "why": "2026年6月“校园机器人的未来应用”属于科技应用与校园生活结合的校报投稿题。普通考生容易把文章写成“AI将改变世界”的空洞套话而偏离on campus限定；高分范文采用“具体场景举例（图书馆导引归架 + 跨楼实验物资配送）+ 稳妥落地机制（小范围试点、师生路线反馈、数据隐私透明、保留人工服务台）+ 理性条件收束”的三段架构，既有画面感又展现务实思辨深度。",
    "posNote": "词性与语法槽位避坑指南：1. 介词by后接动名词：表达“通过接管日常任务”，by后必须接taking over，不可接动词原形take over。2. 形容词与动词词性分辨：make university life easier（形容词比较级作宾补，不可用副词more easily）；requires their judgment中requires后接名词judgment，不可错用动词judge。3. 现在分词作结果状语：leaving staff more time ... 中逗号后不能直接放动词原形leave或谓语left，必须用现在分词leaving构成非谓语结果状语。4. 情态动词与虚拟条件句时态呼应：提设想应用could guide / could carry；结尾假定条件句Campus robots would be most useful if they solved specific problems中，主句would be与if从句过去式solved保持第二类条件句一致。",
    "steps": [
      "第一步（第一段场景落地）：首句用take over routine tasks点明机器人价值，紧接着用For example具体展开图书馆导引归架和跨教学楼物资配送两个鲜活场景，末尾用leaving staff more time ...收束。",
      "第二步（第二段试点与保障）：用The university should start with a small trial ... 提出可控推进策略，补充路线反馈、信息收集透明及human service desk人工兜底三大关键细节。",
      "第三步（第三段价值收束）：以Campus robots would be most useful if they solved specific problems凝练主题，说明先通过试点验证真实使用率再扩大投入。"
    ],
    "pitfall": "低分作文常见失误是通篇高呼“科技进步、机器人取代人类”，完全脱离campus场景；投稿作文必须锚定library、laboratory、buildings、students and staff等校园实体角色，且将字数控制在140–170词的黄金区间。",
    "vocabHighlights": [
      {
        "word": "routine tasks",
        "meaning": "adj.+n. 日常重复性事务"
      },
      {
        "word": "delivery robots",
        "meaning": "n.+n. 配送机器人"
      },
      {
        "word": "start with a small trial",
        "meaning": "v.+prep.+n. 从小范围试点起步"
      },
      {
        "word": "accessibility",
        "meaning": "n. 无障碍通行，使用便利度"
      },
      {
        "word": "human service desk",
        "meaning": "n. 人工服务台"
      }
    ]
  },
  "q_wr_02": {
    "stemZh": "题干全译：假设你受邀向学校提交一份关于“如何让学生的校园生活更便利”的提案，请你撰写一篇短文来提出你的建议。作答时间30分钟，字数要求不少于120词且不超过180词。评分核心：以真实提案口吻切入，针对校园具体不便给出2至3项低成本、可操作、有反馈评估机制的改进措施。",
    "evidenceZh": "范文高分关键句中文对应：1. 我建议学校让现有的校园服务使用起来更加便捷（I propose that the university make its existing campus services easier to use）。2. 在将改动永久化之前，学校应询问学生何时真正需要安静的自习场所，并记录不同时段的使用人数（Before making the change permanent, it should ask students ... and record how many people use the room）。3. 如果每份报修单都能显示经办人及预计修复时间，学生就能减少跟进沟通的时间。4. 这些改进无需新建大楼便能让日常生活更加便利（These changes would make daily life more convenient without requiring new buildings）。",
    "why": "2026年6月“让校园生活更便利的提案”是典型的校务建议题。要想拿到高分档，必须避开“建更好的宿舍、建更多的食堂”这类脱离预算现实的空话，转而聚焦“痛点精准、低成本即可落地”的校园微改造：第一段整合信息分散痛点（一页发布图书馆、校医院与食堂开放时间）；第二段优化考试周自习室供给并加入先调研、后常态化的评估思维；第三段推出进度透明的报修单，最后用without requiring new buildings一句点睛，尽显成熟方案意识。",
    "posNote": "词性与语法槽位避坑指南：1. propose虚拟语气绝对不能错：I propose that the university make ... 中，that从句谓语必须用动词原形make（省去should），或者写should make；切勿写成propose the university to make（动词不定式错误搭配），也不要在单数主语university后误加三单makes。2. make + 宾语 + 形容词宾补：make its existing campus services easier / make daily life more convenient中，easier和convenient均为形容词作宾补，不可错用副词easily/conveniently。3. 介词without后接动名词：without checking several websites和without requiring new buildings中，without是介词，后面动词必须加-ing。4. 复合宾语形容词后置：“坏掉的灯”用broken lights（过去分词作前置定语，不写breaking lights）。",
    "steps": [
      "第一步（开篇提案 + 举措一）：用I propose that the university make ... 亮明提案主旨，以To begin with提出将各类校园场所开放时间汇总至单一页面，省去学生多头查询与白跑一趟的麻烦。",
      "第二步（举措二 + 数据评估）：用also引出考试周延长自习室开放时间，并在Before making the change permanent中融入问卷调研与人流量记录意识。",
      "第三步（举措三 + 成本收束）：用Finally引入带处理人与预计工期显示的简约报修表单，末句以without requiring new buildings点明高性价比价值。"
    ],
    "pitfall": "在写提案句型时，最常见的语法硬伤是套用advise的句式写成I propose the university to improve...，请牢记propose后不接“人+to do”，必须用propose that sb. (should) do sth. 或propose doing sth.。",
    "vocabHighlights": [
      {
        "word": "put forward a proposal",
        "meaning": "v.+n. 提出提案/建议"
      },
      {
        "word": "existing campus services",
        "meaning": "adj.+n. 现有的校园服务"
      },
      {
        "word": "extend the opening hours",
        "meaning": "v.+n. 延长开放时间"
      },
      {
        "word": "make ... permanent",
        "meaning": "v.+adj. 使……永久化/常态化"
      },
      {
        "word": "follow up",
        "meaning": "v.+adv. 跟进，追踪处理进度"
      }
    ]
  },
  "q_wr_03": {
    "stemZh": "题干全译：假设有人提议要求大学生必须至少参与一个科研项目，请你从该提议的“必要性（necessity）”与“可行性（practicality）”两个方面阐述你的看法并写出回应。作答时间30分钟，字数要求不少于120词且不超过180词。评分核心：必须同时、均衡地回应“必要性”和“可行性”双维度，立场有理有据且兼顾不同学生的现实课业差异。",
    "evidenceZh": "范文高分关键句中文对应：1. 我支持让每位大学生获得至少参与一个科研项目的经历，前提是这一要求可以通过不同方式达成（I support giving every university student experience in at least one research project, provided that the requirement can be met in different ways）。2. 科研教会学生将宽泛问题转化为可探究的课题、评估证据，并解释为什么自己的结论可能存在局限。3. 如果项目规模足够小、能够融入常规课程，这项要求就是可行的（The requirement would be practical if projects were small enough to fit into ordinary courses）。4. 凭借合理的工作量与清晰指导，这项要求能为学生带来有价值的科研入门。",
    "why": "2026年6月这道提案回应题审题门槛较高，明确要求从necessity和practicality两方面立论。高分范文避开极端“绝对赞成”或“全盘反对”，首句即用provided that亮出有条件支持的高阶立场；第一段紧扣necessity论证科研训练跨职业的通用素养（问题拆解、证据评估、局限反思）；第二段紧扣practicality提出“将小型课题嵌入日常课程 + 分组采用统一开题与汇报节点”的可落地解法；第三段体贴顾及兼职或非实验学科学生提供替代选项，逻辑滴水不漏。",
    "posNote": "词性与语法槽位避坑指南：1. support后接动名词：I support giving every university student ... 中support为及物动词，后须接动名词giving，不能写成support to give。2. 区分necessity（名词）与necessary（形容词）、practicality（名词）与practical（形容词）：题干in terms of its后接名词necessity and practicality，而文章中作表语时写would be practical / is necessary，注意词尾后缀切勿混用。3. 动词不定式与并列平行：Research teaches students to turn ..., evaluate ..., and explain ... 中，三个动词共用前面的to，因此evaluate和explain均保持原形。4. 关系代词whose修饰所属：students whose courses or work schedules make ... 中，用whose引导定语从句连接“学生的课程或工作安排”，不可误用who或which。",
    "steps": [
      "第一步（明确立场 + 回应必要性）：用I support ..., provided that ... 表态，列举即使未来不当科研工作者也终身受用的问题转化、证据评估与局限反思三项能力。",
      "第二步（回应可行性）：提出把项目做小并融入普通课程（analyze a public dataset / survey campus transport / compare sources），教师通过统一milestone节点高效指导多组学生。",
      "第三步（弹性机制 + 总结）：为难以进入实验室的学生提供替代方案，并用With reasonable workloads and clear guidance收尾强调实施条件。"
    ],
    "pitfall": "本题最大丢分点是审题漏维——只大谈“科研对大学生多么重要（necessity）”，通篇只字不提“全校这么多人、师资和经费够不够、怎么操作才可行（practicality）”，这在阅卷中会被判定为未完成全部指令而扣掉内容分。",
    "vocabHighlights": [
      {
        "word": "provided that",
        "meaning": "conj. 前提是，只要"
      },
      {
        "word": "evaluate evidence",
        "meaning": "v.+n. 评估证据"
      },
      {
        "word": "fit into ordinary courses",
        "meaning": "v.+prep.+n. 融入常规课程"
      },
      {
        "word": "common milestones",
        "meaning": "adj.+n. 统一的阶段性节点"
      },
      {
        "word": "reasonable workloads",
        "meaning": "adj.+n. 合理的工作量"
      }
    ]
  },
  "q_wr_04": {
    "stemZh": "题干全译：假设你校学生会正在收集关于改善来年工作的意见，请你撰写一篇回应短文，就学生会如何更好地丰富学生校园生活提出建议。作答时间30分钟，字数要求不少于120词且不超过180词。评分核心：立意高于泛泛罗列文体活动，从“多元精细化社群 + 实用成长工坊 + 事前需求调研”提出具有可操作性的改进方向。",
    "evidenceZh": "范文高分关键句中文对应：1. 随着学生会筹备来年工作议程，我建议其采取更加多元、以学生为中心的方式来丰富校园生活（adopt a more diverse and student-centered approach to enriching campus life）。2. 通过将部分重心从泛化活动转向定制化兴趣社群，学生会能帮助同学们更轻松地找到志同道合的伙伴。3. 此外，它可以邀请经验丰富的校友和行业导师举办实操工作坊，在简历撰写、公众演讲和压力管理方面提供针对性指导。4. 唯有如此，学生会才能为所有本科生打造充满活力、互助且真正充实的校园社区（Only in this way can the Student Union build a vibrant, supportive, and genuinely enriching campus community）。",
    "why": "2025年12月“学生会如何丰富校园生活”是建议类回应题。普通作文容易沦为“多办篮球赛、歌唱比赛、迎新晚会”的流水账；高分范文先确立“从少数大型晚会转向日常多元化、以学生为中心”的指导原则，随后在主体段提出两条互补路径——既照顾情感归属感（精细兴趣微社群），又照顾实用能力成长（校友行业导师工作坊），最后加上学期前问卷调研闭环并以Only in this way倒装句提振全篇气势。",
    "posNote": "词性与语法槽位避坑指南：1. approach后固定接介词to + 动名词：approach to enriching campus life中，to是介词而不是不定式符号，因此enrich必须加-ing写成enriching，绝不能写approach to enrich。2. 介词by + 动名词：By shifting some focus from A to B中shifting用动名词；注意focus作不可数名词修饰用some focus，不要误加复数。3. 现在分词与-ed修饰词区分：“丰富的/充实生活的”用enriching（enriching campus community），“志同道合的”用复合形容词like-minded，“经验丰富的”用experienced，“定制化的”用tailored。4. Only状语置首必须部分倒装：Only in this way can the Student Union build ... 中，情态动词can必须提到主语the Student Union之前，写成Only in this way the Student Union can build会丧失倒装加分并构成语法错误。",
    "steps": [
      "第一步（总原则切入）：承接学生会筹备来年计划的背景，用I propose that it should adopt a more diverse and student-centered approach确立高站位改革方向。",
      "第二步（双举措推进）：用First and foremost + By shifting some focus from ... to ... 提出细分兴趣社群（读书会、编程社、徒步团）；用Furthermore提出校友导师实操工作坊，覆盖求职与心理减压。",
      "第三步（调研闭环 + 倒装收尾）：建议每学期前开展快速线上问卷匹配真实兴趣，最后用Only in this way can ... 倒装句有力收尾。"
    ],
    "pitfall": "写建议信或工作改进文时，最忌光报活动名称清单而不讲作用机制——每提一项活动（如interest communities或hands-on workshops），后面务必跟上它给学生带来的具体价值（build genuine belonging / offer targeted guidance）。",
    "vocabHighlights": [
      {
        "word": "student-centered approach",
        "meaning": "adj.+n. 以学生为中心的方法"
      },
      {
        "word": "tailored interest communities",
        "meaning": "adj.+n. 定制化的兴趣社群"
      },
      {
        "word": "like-minded peers",
        "meaning": "adj.+n. 志同道合的同伴"
      },
      {
        "word": "targeted guidance",
        "meaning": "adj.+n. 针对性的指导"
      },
      {
        "word": "vibrant and supportive",
        "meaning": "adj. 充满活力且互助友爱的"
      }
    ]
  },
  "q_wr_05": {
    "stemZh": "题干全译：假设有人提议要求所有大学生都必须学习学术写作，请你撰写一篇回应短文来表达你对这一提议的看法。作答时间30分钟，字数要求不少于120词且不超过180词。评分核心：鲜明亮出支持或反对立场，围绕跨学科通用学术能力进行多维论证，并用让步句式主动化解反方顾虑。",
    "evidenceZh": "范文高分关键句中文对应：1. 不可否认，清晰而严谨的写作居于高等教育的核心地位（clear and rigorous writing lies at the heart of higher education）。2. 系统化的学术写作训练使学生具备构建合乎逻辑的论证、并以可靠证据支撑观点的能力。3. 学习规范引用标准与批判性文献评估有助于培养学术诚信，帮助本科生避免无意剽窃。4. 尽管有人认为必修课会削减选修课弹性，高校却可以为不同专业定制模块（While some may argue that mandatory courses reduce flexibility for electives, universities can tailor modules to different majors）。",
    "why": "2025年12月“是否应将学术写作设为全体大学生必修课”是一道典型的高校课程改革辩论题。由于题干要求覆盖all university students，写作时最忌把学术写作狭隘理解成“写英语作文”或“文科生论文”。高分范文开篇即用regardless of their intended career path破除学科局限，主体段从“逻辑论证+证据支撑（覆盖实验报告与文献综述）”及“规范引用+学术诚信（避免无意抄袭）”两层硬核展开，末段再用While some may argue that ... 主动接招并给出“分专业定制模块”的务实解药，思辨极为老练。",
    "posNote": "词性与语法槽位避坑指南：1. 不可数名词主谓一致：clear and rigorous writing作主语为抽象概念，谓语动词必须用单数lies（lies at the heart of）；同理，第2段动名词短语learning proper citation standards and critical source evaluation作主语时，谓语fosters也要用三单。2. 动名词作主语与形容词表语：requiring all university students to learn academic writing is both timely and beneficial中，主语是动名词短语requiring ...，后接单数系动词is和两个并列形容词timely and beneficial（注意timely以-ly结尾却是形容词“及时的”）。3. 区分academic（形容词）与academy（名词）：学术写作academic writing、学术诚信academic integrity均须使用形容词academic。4. 让步状语从句禁用but：While some may argue that ..., universities can ... 中用了While引导让步，主句前绝不能再加but。",
    "steps": [
      "第一步（高立意开篇 + 明确站队）：用There is no denying that ... 引入学术写作的核心地位，随后用From my perspective明确支持将其设为全体大学生必修课。",
      "第二步（跨学科双层论证）：First and foremost聚焦逻辑论证与证据支撑（举lab report和literature review为例兼顾理工与人文）；Moreover聚焦引用规范、文献评估与学术诚信（academic integrity）。",
      "第三步（让步化解 + 总结升华）：用While some may argue that ... 引出“挤占选修课弹性”的顾虑，以分专业定制模块化解，最终总结其为受用终身的技能。"
    ],
    "pitfall": "审题要注意all university students（全体大学生）这一全称限定，切忌只站在英语专业或人文社科角度空谈写论文，必须举例说明理工科写实验报告（laboratory report）同样离不开严谨的学术写作训练。",
    "vocabHighlights": [
      {
        "word": "clear and rigorous",
        "meaning": "adj. 清晰且严谨的"
      },
      {
        "word": "logical arguments",
        "meaning": "adj.+n. 符合逻辑的论证"
      },
      {
        "word": "academic integrity",
        "meaning": "adj.+n. 学术诚信"
      },
      {
        "word": "unintentional plagiarism",
        "meaning": "adj.+n. 无意剽窃/抄袭"
      },
      {
        "word": "mandatory / compulsory",
        "meaning": "adj. 必修的，强制性的"
      }
    ]
  },
  "q_wr_06": {
    "stemZh": "题干全译：假设你所在大学正在开展一项调查，以收集学生关于“合理使用人工智能技术辅助学习”的看法，请你写一篇短文表达自己的观点。作答时间30分钟，字数要求不少于120词且不超过180词。评分核心：紧扣“appropriate use（合理使用）”这一关键词，辩证阐述AI辅助学习的效率优势与过度依赖风险，界定“辅助而非替代”的使用边界。",
    "evidenceZh": "范文高分关键句中文对应：1. 在我看来，人工智能应作为自主学习的补充，而非替代品（AI should be used as a supplement, not a substitute, for independent learning）。2. 一方面，AI技术通过提供个性化讲解、针对性语言练习和即时反馈，在提升学习效率方面发挥着重要作用。3. 然而另一方面，过度依赖AI会削弱学生的批判性思维和独立解决问题的能力（over-reliance on AI can weaken students' critical thinking and independent problem-solving abilities）。4. 大学生应当把AI当作检验思路、打磨草稿的得力导师，而非完成作业的捷径，同时高校应出台清晰的学术规范。",
    "why": "2025年6月“合理使用AI辅助学习”是贴合大学生日常的科技伦理题。题目中的题眼是appropriate use（合理使用），因此既不能一边倒神化AI，也不能因噎废食全面封杀。高分范文首段即用头韵对照金句a supplement, not a substitute定下理性基调；第二段采用On the one hand / However, on the other hand对称展开“个性化效率提升”与“过度依赖削弱思辨”的双刃剑分析；第三段分别向学生与高校提出务实自律与规范倡议，结构工整且极易迁移。",
    "posNote": "词性与语法槽位避坑指南：1. 名词复数与不可数辨析：AI technology为不可数整体概念，AI tools为可数复数；feedback（反馈）与information（信息）均为不可数名词，绝对不能加-s写成feedbacks或informations。2. 介词搭配准确性：“对……过度依赖”中reliance后固定接介词on（over-reliance on AI），不可错用to或in；“……的补充/替代品”中supplement/substitute均搭配介词for或to，句中共享for independent learning。3. 动名词作介词宾语：by offering personalized explanations中by后接offering；without understanding the reasoning中without后接understanding。4. 形容词与动词词性分辨：“妥协/损害”在genuine academic growth will inevitably be compromised中是动词被动语态，注意拼写与过去分词-ed；“批判性思维”须用形容词critical修饰thinking。",
    "steps": [
      "第一步（点出背景 + 界定原则）：由AI深入校园学习切入，抛出核心观点句AI should be used as a supplement, not a substitute, for independent learning。",
      "第二步（双面辩证分析）：用On the one hand写AI在个性化讲解、语言训练与即时反馈上的高效率；用However, on the other hand转折写过度依赖及盲目抄袭答案对批判性思维与独立解题能力的侵蚀。",
      "第三步（双主体规范收尾）：从个人层面呼吁将AI视为导师而非捷径（tutor rather than shortcut），从校方层面呼吁建立明确学术准则（academic guidelines）。"
    ],
    "pitfall": "很多同学写AI话题时一味赞美“AI能帮我们写完所有作业、节省大量时间”，这恰恰撞上了“学术不端与过度依赖”的雷区；务必紧扣appropriate use，写清楚“哪些事能让AI帮（讲解、反馈、润色），哪些底线不能越（独立思考、不可盲抄代写）”。",
    "vocabHighlights": [
      {
        "word": "supplement vs. substitute",
        "meaning": "n. 补充品 vs. 替代品"
      },
      {
        "word": "personalized explanations",
        "meaning": "adj.+n. 个性化讲解"
      },
      {
        "word": "instant feedback",
        "meaning": "adj.+n. 即时反馈（feedback不可数）"
      },
      {
        "word": "over-reliance on",
        "meaning": "n.+prep. 对……过度依赖"
      },
      {
        "word": "critical thinking",
        "meaning": "adj.+n. 批判性思维"
      }
    ]
  },
  "q_wr_07": {
    "stemZh": "题干全译：假设你校正在组织一场关于“培养大学生跨文化交际能力”的论坛，请你写一篇短文表达自己的观点。作答时间30分钟，字数要求不少于120词且不超过180词。评分核心：紧扣“发展跨文化交际能力（development of ... abilities）”，深入阐明培养该能力的个人与职场价值，并给出高校具体的培养路径。",
    "evidenceZh": "范文高分关键句中文对应：1. 人们普遍认为，在一个日益互联的世界里，培养大学生的跨文化交际能力在高等教育中扮演着至关重要的角色（developing students' cross-cultural communication abilities plays a crucial role in higher education）。2. 接触不同视角能够拓宽学生视野，培养相互尊重与同理心（exposure to different perspectives broadens students' horizons and cultivates mutual respect and empathy）。3. 此外，出色的跨文化技能赋予毕业生在全球求职市场上鲜明的竞争优势（give graduates a clear competitive edge in the global job market）。4. 为培养这一必备能力，高校应当拓展学生交换项目、举办多元文化校园节，并将真实文化语境融入语言课程。",
    "why": "2025年6月“培养大学生的跨文化交际能力”是一道标准“重要性论证 + 培养途径”论坛议论文。若只举例中美饮食或节日差异，极易写成跑题的文化科普文；高分范文牢牢锁定“why to develop + how to develop”双核心：首段以全球互联背景点明跨文化能力已从选修变成刚需；第二段从“拓宽视野与同理心（学术合作）”和“职场竞争优势（competitive edge）”双轨论证其价值；第三段落实到交换项目、校园多元文化节与语境化语言课三条具体高校举措，环环相扣。",
    "posNote": "词性与语法槽位避坑指南：1. 动名词作主语单数谓语：developing students' cross-cultural communication abilities plays a crucial role中，主语是动名词短语developing ...（尽管里面有复数abilities），中心动作是单数概念，因此谓语动词必须用三单plays，不可受abilities影响误写成play。2. 抽象名词作主语搭配动词：exposure to different perspectives broadens ... and cultivates ... 中，不可数抽象名词exposure作主语，后接两个并列三单动词broadens和cultivates，比用If we meet...更显书面语档次。3. 副词修饰形容词：in an increasingly interconnected world中，副词increasingly修饰形容词interconnected（日益互联的），注意顺序与词尾。4. 可数名词与固定搭配：“拓宽视野”中horizons习惯用复数（broaden students' horizons）；“竞争优势”用单数可数短语a clear competitive edge。",
    "steps": [
      "第一步（时代背景定调）：用It is widely acknowledged that ... 点明全球互联时代背景，并指出跨文化理解已不再是可选项而是核心素养（core competency）。",
      "第二步（双轨价值论证）：First and foremost用Exposure to different perspectives ... 写个人格局、同理心与国际项目协作；Furthermore用competitive edge写全球求职市场中的竞争力。",
      "第三步（高校培养抓手）：To cultivate this essential ability领起三连动词举措（expand exchange programs / host multicultural festivals / integrate authentic cultural contexts），最后鼓励学生自信立足全球舞台。"
    ],
    "pitfall": "审题务必警惕不要陷入“中西文化差异举例”的陷阱（比如大篇幅写中国人用筷子、西方人用刀叉），因为论坛主题是development of students' cross-cultural communication abilities（为什么重要以及大学如何去培养这种能力）。",
    "vocabHighlights": [
      {
        "word": "core competency",
        "meaning": "adj.+n. 核心素养/核心能力"
      },
      {
        "word": "exposure to",
        "meaning": "n.+prep. 接触……，置身于……"
      },
      {
        "word": "broaden one's horizons",
        "meaning": "v.+n. 拓宽视野"
      },
      {
        "word": "competitive edge",
        "meaning": "adj.+n. 竞争优势"
      },
      {
        "word": "bridge cultural gaps",
        "meaning": "v.+adj.+n. 弥合文化鸿沟"
      }
    ]
  },
  "q_wr_08": {
    "stemZh": "题干全译：假设校报正在面向学生征集下一期关于“如何丰富学生中国传统文化知识”的稿件，请你写一篇短文投稿。作答时间30分钟，字数要求不少于120词且不超过180词。评分核心：紧扣“how to enrich（如何丰富方法）”，从课堂课程创新与课外沉浸体验两方面提出具体可操作做法，切忌整篇空喊传统文化伟大。",
    "evidenceZh": "范文高分关键句中文对应：1. 为了丰富大学生对中国传统文化的认知，高校校园应走出枯燥的课本，采用更有吸引力且富于互动性的方式（move beyond dry textbooks and adopt more engaging, interactive approaches）。2. 一种行之有效的方法是将选修课程与实操文化工作坊结合起来（connect elective courses with practical cultural workshops）。3. 例如，书法、传统茶文化或古典建筑课程不仅能提供宝贵的学术洞见，还能带来令人印象深刻的亲身体验（not only provide valuable academic insights but also offer hands-on experience）。4. 当学生在校园里真切体验传统艺术时，他们自然会建立起更深厚的文化自信。",
    "why": "2024年12月“丰富大学生中国传统文化知识的方法”是四级最常考的“文化传播+方法论”投稿题。考生最普遍的失误是用前两段背诵“中华文化有五千年历史、博大精深”，直到最后才匆匆提两句“学校要多宣传”，严重偏离how to enrich指令。高分范文首段末尾即快速转入方法总原则（走出枯燥课本、加强互动），主体段将具体方法清晰拆成“第一层：选修课+实操工作坊（not only ... but also ...）”与“第二层：社团节庆市集、民乐展演与博物馆研学”，末段回归知行合一与文化自信。",
    "posNote": "词性与语法槽位避坑指南：1. 不定式作表语：One effective method is to connect ... 中，主语是method，is后用不定式to connect作表语；注意connect A with B（把A与B连接）的介词搭配。2. not only ... but also ... 词性对称：can not only provide valuable academic insights but also offer hands-on experience中，not only和but also后必须紧跟对称的“动词原形+名词宾语”（provide ... 与 offer ...），不可一边接动词一边接名词。3. 修饰语区分：“动手的/实操的”复合形容词是hands-on（hands-on experience，连字符与-s不可漏）；“令人着迷的/有参与感的”用engaging（engaging approaches）。4. 主谓一致与there be：there has been growing awareness of ... 中，awareness为不可数单数名词，故用has been。",
    "steps": [
      "第一步（简要引出 + 切入方法总纲）：用一句点出传承文化遗产意识提升，随即切入主旨——校园应超越枯燥教材，采取更具互动性的方式。",
      "第二步（课内与课外双路径）：用One effective method is to ... 讲述书法、茶文化、古建选修课与实操工作坊结合（学术洞见+动手体验）；用In addition引出社团传统节日、民乐演出与博物馆实地参访。",
      "第三步（总结升华）：指出系统学习与主动参与结合能培养深厚的文化自信（cultural confidence）并推动传统薪火相传。"
    ],
    "pitfall": "千万不要把题目当成纯翻译式的“介绍中国传统文化”，牢记审题焦点是how to enrich（具体怎么做去丰富知识），首段就应把重心落到方法上，主体段全部写可执行的校园做法。",
    "vocabHighlights": [
      {
        "word": "cultural heritage",
        "meaning": "adj.+n. 文化遗产"
      },
      {
        "word": "elective courses",
        "meaning": "adj.+n. 选修课程"
      },
      {
        "word": "hands-on experience",
        "meaning": "adj.+n. 亲身实践体验"
      },
      {
        "word": "academic insights",
        "meaning": "adj.+n. 学术洞见/见解"
      },
      {
        "word": "cultural confidence",
        "meaning": "adj.+n. 文化自信"
      }
    ]
  },
  "q_wr_09": {
    "stemZh": "题干全译：假设校报正在面向学生征集下一期关于“学生如何为建设绿色校园作贡献”的稿件，请你写一篇短文投稿。作答时间30分钟，字数要求不少于120词且不超过180词。评分核心：严格锚定行为主体是“students（学生自身）”，从个人日常低碳习惯与校园集体环保行动两层给出具体可行的学生举措。",
    "evidenceZh": "范文高分关键句中文对应：1. 建设绿色校园并非仅仅是学校管理层的责任；每一位学生都能发挥不可或缺的作用（every single student has an essential part to play）。2. 通过在日常校园生活中养成简单却有影响力的习惯，我们能让共享的学习环境变得更洁净、更可持续（By adopting simple yet impactful habits in daily campus life）。3. 例如，携带可重复使用水杯、规范宿舍垃圾分类、随手关掉未使用的灯以及步行或骑车上课，都有助于减少我们的日常碳足迹（help reduce our daily carbon footprint）。4. 只要全体学生今天共同努力，我们必将为后代学子建起一个更绿色、更健康的校园（make joint efforts today）。",
    "why": "2024年12月“学生如何为建设绿色校园作贡献”聚焦学生主体的实践行动。考生写这类倡议文最常犯的错误是角色错位——大谈“政府应当立法、学校应当投资光伏发电”，从而偏离how the students can contribute。高分范文开篇即明确“学校管理层之外，每位学生都有责”，主体段完美践行“由己及人”两层结构：先写学生个人随手可做的四件环保小事（自带水杯、宿舍分类、随手关灯、低碳出行），再写参与环保社团开展植树、旧书交换和社交媒体倡导带动同龄人，生活气息浓厚且词块地道。",
    "posNote": "词性与语法槽位避坑指南：1. 动名词并列作主语：Carrying reusable bottles, sorting dormitory trash properly, turning off unused lights, and walking or cycling to class all help ... 中，四项并列行为全部用动名词-ing作主语，且因指代四项共同行为，后面动词用复数help（接不带to的原形reduce）。2. 副词修饰动词或过去分词：solely（仅仅，副词）、properly（恰当地，副词，修饰sorting）；“未使用的灯”用过去分词作前置定语unused lights，不要写成unusing。3. 连词yet与形容词搭配：simple yet impactful habits（简单却有影响力的习惯），yet在此作并列连词连接两个转折形容词。4. 比较级并列修饰campus：cleaner and more sustainable以及a greener, healthier campus，注意单音节cleaner/greener/healthier加-er，多音节sustainable加more。",
    "steps": [
      "第一步（责任归位）：指出绿色校园不只是校方管理员的事，提出学生通过simple yet impactful habits就能显著改善共享环境。",
      "第二步（个人习惯 + 集体倡议）：用First and foremost列举带水杯、宿舍垃圾分类、关灯、骑行/步行四项接地气的日常低碳动作；用Moreover拓展到加入环保社团组织植树、旧书流转与线上环保宣传。",
      "第三步（汇聚号召）：总结点滴日常选择会聚沙成塔，用If all students make joint efforts today ... 发出有力行动号召。"
    ],
    "pitfall": "切记行为主体是students而非university或government！如果通篇都在给校长提采购新能源校车、翻新教学楼节能系统的建议，会因主体错位严重失分；所有动词主语必须紧扣学生能直接参与的行动。",
    "vocabHighlights": [
      {
        "word": "simple yet impactful",
        "meaning": "adj.+conj.+adj. 简单却有影响力的"
      },
      {
        "word": "reusable bottles",
        "meaning": "adj.+n. 可重复使用的水杯"
      },
      {
        "word": "carbon footprint",
        "meaning": "n. 碳足迹"
      },
      {
        "word": "sustainable",
        "meaning": "adj. 可持续的，环保的"
      },
      {
        "word": "make joint efforts",
        "meaning": "v.+adj.+n. 共同努力"
      }
    ]
  }
};

  if (typeof root !== 'undefined' && root) {
    root.EXPLAIN_DETAILS = EXPLAIN_DETAILS;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EXPLAIN_DETAILS };
  }
})(typeof window !== 'undefined' ? window : globalThis);
