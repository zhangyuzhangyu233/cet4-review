/* ==========================================================================
   CET-4 Genuine Past-Paper Question Bank (questions_data.js)
   Total: 80 real CET-4 questions across all 6 official skills:
     - listening   (22 items: 8 news, 8 conversation, 6 passage; 2017.12-2019.12)
     - cloze       (10 distinct real Banked Cloze passages; 2017.12-2026.06)
     - matching    (12 real Long Reading statements across 6 articles; 2018.06-2026.06)
     - reading     (18 real Careful Reading questions across 9 passages; 2018.06-2026.06)
     - translation (9 real Chinese-to-English passages; 2024.06-2026.06)
     - writing     (9 real CET-4 writing tasks from 2024.12-2026.06)
   Cloze placeholder token format: {{1}} .. {{N}} matching blanks[i].num.
   Zero emojis. Zero mock-exam content. Clean UTF-8 Chinese/English.
   ========================================================================== */
(function (root) {
  'use strict';

  const QUESTION_BANK = [
  {
    "id": "q_lis_01",
    "skill": "listening",
    "type": "listening",
    "subtype": "news",
    "sectionId": "t_listen_preread",
    "difficulty": 1,
    "source": "2018.06 第1套 News Report 1 Q1",
    "title": "跨越半个世纪的漂流瓶归还",
    "preReadCue": "四项均为概括性名词短语（return / bottled message / joke / history），大概率考查新闻主旨，聚焦导语首句。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "A message in a bottle sent out to sea by a New Hampshire man more than five decades ago was found 1,500 miles away and has been returned to his daughter.",
        "isEvidence": true,
        "signalWords": [
          "more than five decades ago",
          "returned to his daughter"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "The long-lost message was discovered by Clint Buffington of Utah while he was vacationing. Buffington says he found a soda bottle half buried in the sand that looked like it had been there since the beginning of time.",
        "signalWords": [
          "discovered"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "The note inside the bottle said, 'Return to 419 Ocean Street and receive a reward of 150 dollars from Richard and Tina Pierce, owners of the Beachcomber Motel.'",
        "signalWords": [
          "reward of 150 dollars"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "The motel was owned by the parents of Paula Pierce in 1960. Her father had written the note as a joke and had thrown it into the Atlantic Ocean. Buffington flew to New Hampshire to deliver that message to Paula Pierce.",
        "signalWords": [
          "as a joke",
          "deliver"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "She held up to her father's promise, giving Buffington that reward. But the biggest reward is the message in a bottle finding its way back home.",
        "signalWords": [
          "But",
          "biggest reward"
        ]
      }
    ],
    "questionText": "What is the news report mainly about?",
    "options": [
      "A. The return of a bottled message to its owner's daughter.",
      "B. A New Hampshire man's joke with friends on his wife.",
      "C. A father's message for his daughter.",
      "D. The history of a century-old motel."
    ],
    "answer": "A",
    "evidenceQuote": "A message in a bottle sent out to sea by a New Hampshire man more than five decades ago was found 1,500 miles away and has been returned to his daughter.",
    "paraphraseBridge": "A message in a bottle ... has been returned to his daughter -> The return of a bottled message to its owner's daughter",
    "hintSteps": [
      "新闻主旨题遵循“导语即主旨”原则，重点听第一句交代的“谁做了什么核心事件”。",
      "注意区分核心事件与次要背景：motel 与 joke 只在中后段交代来历，并非整篇新闻的核心报道对象。",
      "首句明确指出漂流瓶里的便条在五十多年后被找到并 returned to his daughter，锁定与 return 和 daughter 对应的选项。"
    ]
  },
  {
    "id": "q_lis_02",
    "skill": "listening",
    "type": "listening",
    "subtype": "news",
    "sectionId": "t_listen_preread",
    "difficulty": 2,
    "source": "2018.06 第1套 News Report 2 Q3",
    "title": "南卡罗来纳州灭蚊行动误杀蜜蜂",
    "preReadCue": "四项均含 bees / Zika / disease，且为完整陈述句，预判考查“为何开展喷洒行动”或事故原因。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "Millions of bees have died in South Carolina during aerial insect spraying operations that were carried out to combat the Zika virus.",
        "isEvidence": true,
        "signalWords": [
          "to combat the Zika virus"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "The insect spraying over the weekend left more than 2 million bees dead on the spot in Dorchester County, South Carolina, where four travel-related cases of Zika disease have been confirmed in the area.",
        "isEvidence": true,
        "signalWords": [
          "four travel-related cases",
          "confirmed"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Most of the deaths came from Flowertown Bee Farm, a company in Summerville that sells bees and honey products. Juanita Stanley, who owns the company, said the farm looks like it has been destroyed. The farm lost about 2.5 million bees.",
        "signalWords": [
          "Most of the deaths",
          "2.5 million"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Dorchester County officials apologized for the accidental mass killing of bees. County manager Jason Ward said in a statement, 'I am not pleased that so many bees were killed.'",
        "signalWords": [
          "apologized",
          "accidental"
        ]
      }
    ],
    "questionText": "Why were spraying operations carried out in Dorchester County?",
    "options": [
      "A. People were concerned about the number of bees.",
      "B. Several cases of Zika disease had been identified.",
      "C. Two million bees were infected with disease.",
      "D. Zika virus had destroyed some bee farms."
    ],
    "answer": "B",
    "evidenceQuote": "four travel-related cases of Zika disease have been confirmed in the area.",
    "paraphraseBridge": "four ... cases of Zika disease have been confirmed -> Several cases of Zika disease had been identified",
    "hintSteps": [
      "原因题在新闻中常紧跟首句目的状语（to combat...）或第二句的地点背景从句（where...）。",
      "警惕数字原词陷阱：2 million bees 是喷洒导致死亡的蜜蜂数，而不是“被感染病毒的蜜蜂数”。",
      "原文提到当地确诊了四例与旅行相关的寨卡病例（four ... cases ... confirmed），对应选项中对 confirmed 的同义替换。"
    ]
  },
  {
    "id": "q_lis_03",
    "skill": "listening",
    "type": "listening",
    "subtype": "news",
    "sectionId": "t_listen_signal",
    "difficulty": 2,
    "source": "2018.06 第1套 News Report 3 Q6",
    "title": "全球最大飞行器首飞与军方弃用原因",
    "preReadCue": "四项为简短名词原因短语（Engineering / pollution / Inadequate funding / military），听音时锁定转折词 but 后的弃用原因。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "The world's largest aircraft has taken to the skies for the first time. The Airlander 10 spent nearly two hours in the air, having taken off from Cardington Airfield in Bedfordshire.",
        "signalWords": [
          "for the first time",
          "nearly two hours"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "During its flight, it reached 3,000 feet and performed a series of gentle turns all over a safe area. The aircraft is massive, as long as a football field and as tall as six double-decker buses, and capable of flying for up to five days.",
        "signalWords": [
          "3,000 feet",
          "up to five days"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "It was first developed for the US government as a long-range spy aircraft, but was abandoned following budget cutbacks.",
        "isEvidence": true,
        "signalWords": [
          "first developed",
          "but",
          "abandoned",
          "budget cutbacks"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "The aircraft cost 25 million pounds and can carry heavier loads than huge jet planes while also producing less noise and emitting less pollution.",
        "signalWords": [
          "while also",
          "less noise",
          "less pollution"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "But there is still a long way to go. The Airlander will need to have 200 hours of flying time before being allowed to fly by the aviation administration.",
        "signalWords": [
          "But",
          "200 hours"
        ]
      }
    ],
    "questionText": "What caused the US government to abandon the Airlander 10 as a spy aircraft?",
    "options": [
      "A. Engineering problems.",
      "B. The air pollution it produced.",
      "C. Inadequate funding.",
      "D. The opposition from the military."
    ],
    "answer": "C",
    "evidenceQuote": "It was first developed for the US government as a long-range spy aircraft, but was abandoned following budget cutbacks.",
    "paraphraseBridge": "following budget cutbacks -> Inadequate funding",
    "hintSteps": [
      "预读四个原因短语，留意“放弃该项目”的动因：是技术故障、污染、缺钱还是军方反对？",
      "抓新闻中段转折词 but：前文讲为美国政府研制侦察机，but 后紧接被放弃的原因。",
      "原文用 budget cutbacks（预算削减），它在四级听力中常被同义替换为 funding（资金）不足。"
    ]
  },
  {
    "id": "q_lis_04",
    "skill": "listening",
    "type": "listening",
    "subtype": "news",
    "sectionId": "t_listen_signal",
    "difficulty": 2,
    "source": "2018.06 第1套 News Report 3 Q7",
    "title": "全球最大飞行器相较巨型喷气机的优势",
    "preReadCue": "四项主语均为 It 且多含比较级（faster / safer / more environmentally friendly），预判考查该飞行器对比普通客机的优势。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "The world's largest aircraft has taken to the skies for the first time. The Airlander 10 spent nearly two hours in the air, having taken off from Cardington Airfield in Bedfordshire.",
        "signalWords": [
          "first time"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "It was first developed for the US government as a long-range spy aircraft, but was abandoned following budget cutbacks.",
        "signalWords": [
          "but",
          "abandoned"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "The aircraft cost 25 million pounds and can carry heavier loads than huge jet planes while also producing less noise and emitting less pollution.",
        "isEvidence": true,
        "signalWords": [
          "than huge jet planes",
          "while also",
          "less noise",
          "less pollution"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "The makers believe it is the future of aircraft and one day we will be using them to go places. But there is still a long way to go before commercial approval.",
        "signalWords": [
          "believe",
          "But"
        ]
      }
    ],
    "questionText": "What is the advantage of the Airlander 10 over huge jet planes?",
    "options": [
      "A. It uses the latest aviation technology.",
      "B. It flies faster than a commercial jet.",
      "C. It is a safer means of transportation.",
      "D. It is more environmentally friendly."
    ],
    "answer": "D",
    "evidenceQuote": "can carry heavier loads than huge jet planes while also producing less noise and emitting less pollution.",
    "paraphraseBridge": "producing less noise and emitting less pollution -> more environmentally friendly",
    "hintSteps": [
      "比较级考点在听力中往往直接由 than ... 或 while also + 比较级引出。",
      "听音时核对原文是否提到了速度更快（faster）或更安全（safer），排除未提及的比较维度。",
      "原文提到噪音更小、污染排放更少（less noise ... less pollution），整体概括就是更环保。"
    ]
  },
  {
    "id": "q_lis_05",
    "skill": "listening",
    "type": "listening",
    "subtype": "news",
    "sectionId": "t_listen_preread",
    "difficulty": 1,
    "source": "2018.06 第2套 News Report 2 Q4",
    "title": "麦当劳免下车点餐变慢的原因",
    "preReadCue": "四项均是导致效率下降的名词性原因（demands / inefficiency / variety of products / rising number），聚焦 Among the reasons 信号句。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "Fast food, it turns out, is not quite as fast as it used to be. A new study finds that McDonald's posted its slowest drive-through times since this survey was first conducted fifteen years ago.",
        "signalWords": [
          "turns out",
          "slowest"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "At McDonald's, customers spend on average three minutes and nine seconds from the time they place their orders until they receive their food. That is about ten seconds more than the industry average and a lot slower than a decade ago.",
        "signalWords": [
          "three minutes and nine seconds",
          "industry average"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "And McDonald's was not alone in slowing down: other chains also saw their drive-through performance slow down.",
        "signalWords": [
          "not alone"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Among the reasons for the slower service, today there are more choices on the menu, and the products themselves are more complex and take longer to prepare.",
        "isEvidence": true,
        "signalWords": [
          "Among the reasons",
          "more choices on the menu",
          "more complex"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Usually the drive-through accounts for sixty to seventy percent of all business at a fast-food restaurant. Of course, consumers also want their orders prepared correctly, and on that score, accuracy is still really high.",
        "signalWords": [
          "sixty to seventy percent",
          "accuracy"
        ]
      }
    ],
    "questionText": "What has slowed down McDonald's drive-through service?",
    "options": [
      "A. Customers' higher demands.",
      "B. The inefficiency of employees.",
      "C. Increased variety of products.",
      "D. The rising number of customers."
    ],
    "answer": "C",
    "evidenceQuote": "Among the reasons for the slower service, today there are more choices on the menu, and the products themselves are more complex and take longer to prepare.",
    "paraphraseBridge": "more choices on the menu -> Increased variety of products",
    "hintSteps": [
      "预读四个可能原因，听音时重点捕捉 reasons / because / due to 等显性因果信号词。",
      "原文完全没有指责员工低效（inefficiency）或顾客人数暴增，先用排除法筛掉主观臆测项。",
      "信号词 Among the reasons 后直接提到菜单选择增多（more choices on the menu），对应选项中的同义改写。"
    ]
  },
  {
    "id": "q_lis_06",
    "skill": "listening",
    "type": "listening",
    "subtype": "news",
    "sectionId": "t_listen_preread",
    "difficulty": 2,
    "source": "2017.12 第1套 News Report 2 Q3",
    "title": "法国铺设太阳能公路的核心目标",
    "preReadCue": "四项均为动名词目的短语（Testing / Providing clean energy / Generating / Finding cheaper ways），锁定首句 with the goal of 目的信号。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "Last week, France announced that the country will pave 621 miles of road with solar panels over the next five years, with the goal of providing cheap, renewable energy to five million people.",
        "isEvidence": true,
        "signalWords": [
          "621 miles",
          "with the goal of",
          "renewable energy",
          "five million people"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Called the Wattway, the roads will be built through joint efforts with the French road-building company Colas and the National Institute of Solar Energy.",
        "signalWords": [
          "Wattway",
          "joint efforts"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "The company spent the last five years developing solar panels that are only about a quarter of an inch thick and are strong enough to stand up to heavy highway traffic without breaking or making the roads more slippery.",
        "signalWords": [
          "quarter of an inch",
          "heavy highway traffic"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "The panels are also designed so that they can be installed directly on top of existing roadways, making them relatively cheap and easy to install. However, this is the first project to install such panels on public highways.",
        "signalWords": [
          "directly on top of",
          "However",
          "first project"
        ]
      }
    ],
    "questionText": "What was France's purpose of constructing the Wattway?",
    "options": [
      "A. Testing the efficiency of the new solar panel.",
      "B. Providing clean energy to five million people.",
      "C. Generating electric power for passing vehicles.",
      "D. Finding cheaper ways of highway construction."
    ],
    "answer": "B",
    "evidenceQuote": "with the goal of providing cheap, renewable energy to five million people.",
    "paraphraseBridge": "providing cheap, renewable energy to five million people -> Providing clean energy to five million people",
    "hintSteps": [
      "新闻首句高度浓缩 5W1H 信息，出现 with the goal of / aiming to 时往往直接出题。",
      "留意数字信息 five million people 在选项中的精准对应，同时警惕选项 D 把 cheap 偷换成了修路方式更便宜。",
      "原文 renewable energy（可再生能源）在选项中自然替换为 clean energy（清洁能源）。"
    ]
  },
  {
    "id": "q_lis_07",
    "skill": "listening",
    "type": "listening",
    "subtype": "news",
    "sectionId": "t_listen_preread",
    "difficulty": 2,
    "source": "2017.12 第1套 News Report 3 Q5",
    "title": "苏丹与埃塞俄比亚边境搜寻“失落的狮子”",
    "preReadCue": "四项均为负面阻碍因素（lack of clues / Inadequate funding / Endless fighting / hazards from the desert），听音时抓是什么让调查变得困难。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "Lions have disappeared from much of Africa, but for the past few years scientists have wondered if the big cats were hanging on in remote parts of Sudan and Ethiopia.",
        "signalWords": [
          "disappeared",
          "but",
          "remote parts"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Continuous fighting in the region has made surveys difficult. But scientists released a report Monday documenting with hard evidence the discovery of lost lions.",
        "isEvidence": true,
        "signalWords": [
          "Continuous fighting",
          "made surveys difficult",
          "But"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "A team with Oxford University's Wildlife Conservation Research Unit, supported by a charity organization, spent two nights in November camping in a national park in northwest Ethiopia on the Ethiopia-Sudan border.",
        "signalWords": [
          "Oxford University",
          "charity organization"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "The researchers set out six camera traps, capturing images of lions, and they identified lion tracks. The scientists concluded that lions are also likely to live in a neighboring national park across the border in Sudan.",
        "signalWords": [
          "camera traps",
          "lion tracks"
        ]
      }
    ],
    "questionText": "What has made it difficult to survey lions in remote parts of Sudan and Ethiopia?",
    "options": [
      "A. The lack of clues about the species.",
      "B. Inadequate funding for research.",
      "C. Endless fighting in the region.",
      "D. The hazards from the desert."
    ],
    "answer": "C",
    "evidenceQuote": "Continuous fighting in the region has made surveys difficult.",
    "paraphraseBridge": "Continuous fighting in the region -> Endless fighting in the region",
    "hintSteps": [
      "四项都在说明“调研受阻的原因”，听音时把注意力锁定在 made surveys difficult 的主语上。",
      "注意排除常识干扰：虽然涉及非洲苏丹和埃塞俄比亚，但原文未提沙漠危险（desert）或经费不足（funding）。",
      "原文形容战乱的词 Continuous（持续不断的）在选项中同义替换为了 Endless。"
    ]
  },
  {
    "id": "q_lis_08",
    "skill": "listening",
    "type": "listening",
    "subtype": "news",
    "sectionId": "t_listen_signal",
    "difficulty": 2,
    "source": "2019.12 第1套 News Report 3 Q7",
    "title": "法国主题公园训练白嘴鸦捡垃圾引发的担忧",
    "preReadCue": "四项主语均为 Children may ...，清一色是负面后果（harmed / tempted to drop litter / contract diseases / overfeed），紧盯转折词 However 后的家长担忧。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "Six birds have just been trained to pick up rubbish at a French historical theme park. According to the park's manager, Mr. Villiers, the goal is not just to clear up the park. Instead, he wants to show that nature itself can teach us to take care of the environment.",
        "signalWords": [
          "pick up rubbish",
          "Instead"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "He says that rooks, the chosen birds, are considered to be particularly intelligent. In the right circumstances, they even like to communicate with humans and establish a relationship through play.",
        "signalWords": [
          "particularly intelligent"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "The birds will be encouraged to clean the park through the use of a small box that delivers a small amount of bird food each time the rook deposits a cigarette end or a small piece of rubbish.",
        "signalWords": [
          "bird food",
          "deposits"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "So far, visitors to the theme park have been excited to see the birds in action. However, some parents are concerned that it encourages their children to drop litter so they can watch the birds pick it up.",
        "isEvidence": true,
        "signalWords": [
          "However",
          "concerned",
          "encourages",
          "drop litter"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Villiers is not concerned about this criticism. He maintains most of the feedback he has received has been overwhelmingly positive, and he hopes now to train more birds.",
        "signalWords": [
          "criticism",
          "positive"
        ]
      }
    ],
    "questionText": "What is the concern of some parents?",
    "options": [
      "A. Children may be harmed by the rooks.",
      "B. Children may be tempted to drop litter.",
      "C. Children may contract bird diseases.",
      "D. Children may overfeed the rooks."
    ],
    "answer": "B",
    "evidenceQuote": "However, some parents are concerned that it encourages their children to drop litter so they can watch the birds pick it up.",
    "paraphraseBridge": "encourages their children to drop litter -> Children may be tempted to drop litter",
    "hintSteps": [
      "新闻末段常出现正面反馈后的态度转折（However, some parents are concerned...），这正是出题高发点。",
      "原文提到用食物盒子奖励鸟类，但并没有说孩子会过度喂食（overfeed）或被啄伤（harmed）。",
      "抓动词同义替换：原文 encourages children to drop litter 对应选项中的 tempted to drop litter。"
    ]
  },
  {
    "id": "q_lis_09",
    "skill": "listening",
    "type": "listening",
    "subtype": "conversation",
    "sectionId": "t_listen_signal",
    "difficulty": 1,
    "source": "2018.06 第1套 Conversation 1 Q8",
    "title": "晚间出游商议：对气候变化电影的看法",
    "preReadCue": "四项主语均为 It 且均为评价句（depressing / alarming / little impact / more serious），重点听对话开头女士的转折态度词 but。",
    "scriptTurns": [
      {
        "speaker": "M",
        "text": "Do you feel like going out tonight?",
        "signalWords": [
          "going out tonight"
        ]
      },
      {
        "speaker": "W",
        "text": "Yeah, why not? We haven't been out for ages. What's on?",
        "signalWords": [
          "What's on"
        ]
      },
      {
        "speaker": "M",
        "text": "Well, there's a film about climate change. Does it sound good to you?",
        "signalWords": [
          "climate change"
        ]
      },
      {
        "speaker": "W",
        "text": "Oh, not really. It doesn't really appeal to me. What's it about? Just climate change?",
        "signalWords": [
          "not really",
          "doesn't really appeal"
        ]
      },
      {
        "speaker": "M",
        "text": "I think it's about how climate change affects everyday life. I wonder how they make it entertaining.",
        "signalWords": [
          "everyday life"
        ]
      },
      {
        "speaker": "W",
        "text": "Well, it sounds really awful. It's an important subject, I agree, but I'm not in the mood for anything depressing. What else is on?",
        "isEvidence": true,
        "signalWords": [
          "awful",
          "I agree, but",
          "depressing"
        ]
      }
    ],
    "questionText": "What does the woman think of climate change?",
    "options": [
      "A. It seems a depressing topic.",
      "B. It sounds quite alarming.",
      "C. It has little impact on our daily life.",
      "D. It is getting more serious these days."
    ],
    "answer": "A",
    "evidenceQuote": "It's an important subject, I agree, but I'm not in the mood for anything depressing.",
    "paraphraseBridge": "an important subject ... not in the mood for anything depressing -> It seems a depressing topic",
    "hintSteps": [
      "长对话中考查一方态度时，先让步（I agree）再转折（but）后的形容词才是说话人的核心立场。",
      "警惕选项 C 借用男士原词 everyday life 进行反向改写（原话是“影响日常生活”，而非 little impact）。",
      "女士明确说出 depressing，直接锁定与 depressing topic 对应的选项。"
    ]
  },
  {
    "id": "q_lis_10",
    "skill": "listening",
    "type": "listening",
    "subtype": "conversation",
    "sectionId": "t_listen_preread",
    "difficulty": 1,
    "source": "2018.06 第1套 Conversation 1 Q9",
    "title": "晚间出游商议：为何放弃今晚的西班牙舞蹈节",
    "preReadCue": "四项为不同拒绝理由（doesn't understand Spanish / doesn't like dancing / too noisy / can't make it in time），注意听时间点与否定回应。",
    "scriptTurns": [
      {
        "speaker": "M",
        "text": "There's a Spanish Dance Festival.",
        "signalWords": [
          "Spanish Dance Festival"
        ]
      },
      {
        "speaker": "W",
        "text": "Oh, I love dance. That sounds really interesting.",
        "signalWords": [
          "love dance"
        ]
      },
      {
        "speaker": "M",
        "text": "Apparently, it's absolutely brilliant. Let's see what it says in the paper. 'Anna Gomez leads in an exciting production of the great Spanish love story, Carmen.'",
        "signalWords": [
          "absolutely brilliant"
        ]
      },
      {
        "speaker": "W",
        "text": "Okay, then. What time is it on?",
        "signalWords": [
          "What time"
        ]
      },
      {
        "speaker": "M",
        "text": "At 7:30.",
        "signalWords": [
          "7:30"
        ]
      },
      {
        "speaker": "W",
        "text": "Well, that's no good. We haven't got enough time to get there. Is there anything else?",
        "isEvidence": true,
        "signalWords": [
          "that's no good",
          "haven't got enough time"
        ]
      }
    ],
    "questionText": "Why do the speakers give up going to the Spanish Dance Festival tonight?",
    "options": [
      "A. The man doesn't understand Spanish.",
      "B. The woman doesn't really like dancing.",
      "C. They don't want something too noisy.",
      "D. They can't make it to the theatre in time."
    ],
    "answer": "D",
    "evidenceQuote": "Well, that's no good. We haven't got enough time to get there.",
    "paraphraseBridge": "haven't got enough time to get there -> can't make it to the theatre in time",
    "hintSteps": [
      "先排除与对话事实完全相反的选项：女士开头立刻说 Oh, I love dance，直接毙掉 B。",
      "听清关键问答回合：女士问演出时间（What time），男士回答 7:30 后女士立刻否决。",
      "haven't got enough time to get there 在地道英文中正好同义改写为 can't make it ... in time。"
    ]
  },
  {
    "id": "q_lis_11",
    "skill": "listening",
    "type": "listening",
    "subtype": "conversation",
    "sectionId": "t_listen_preread",
    "difficulty": 1,
    "source": "2018.06 第1套 Conversation 2 Q12",
    "title": "转校生校园咨询：焦虑的真正原因",
    "preReadCue": "四项出现 younger / transfer / too many activities / won't fit in，特别警惕 A 项对年龄大小关系的主客颠倒陷阱。",
    "scriptTurns": [
      {
        "speaker": "W",
        "text": "Good morning, Mr. Lee. May I have a minute of your time?",
        "signalWords": [
          "Mr. Lee"
        ]
      },
      {
        "speaker": "M",
        "text": "Sure, Catherine. What can I do for you?",
        "signalWords": [
          "What can I do"
        ]
      },
      {
        "speaker": "W",
        "text": "I'm quite anxious about transferring over to our college. I'm afraid I won't fit in.",
        "isEvidence": true,
        "signalWords": [
          "quite anxious",
          "transferring",
          "won't fit in"
        ]
      },
      {
        "speaker": "M",
        "text": "Don't worry, Catherine. It's completely normal for you to be nervous about transferring schools. This happens to many transfer students.",
        "signalWords": [
          "completely normal",
          "transfer students"
        ]
      },
      {
        "speaker": "W",
        "text": "Yes, I know, but I'm younger than most students in my year. And that worries me a lot.",
        "signalWords": [
          "but",
          "younger than most students"
        ]
      }
    ],
    "questionText": "Why does Catherine feel anxious?",
    "options": [
      "A. Most of her schoolmates are younger than she is.",
      "B. She simply has no idea what school to transfer to.",
      "C. There are too many activities for her to cope with.",
      "D. She worries she won't fit in as a transfer student."
    ],
    "answer": "D",
    "evidenceQuote": "I'm quite anxious about transferring over to our college. I'm afraid I won't fit in.",
    "paraphraseBridge": "anxious about transferring ... afraid I won't fit in -> worries she won't fit in as a transfer student",
    "hintSteps": [
      "长对话第一题往往出在开头前两轮问答（What can I do for you? 之后的直接回答）。",
      "高度警惕 A 项逻辑倒置：原文女士说的是 I'm younger than most students（她比同学小），而 A 项说成“多数同学比她小”。",
      "直接匹配女士开场核心句 I'm afraid I won't fit in。"
    ]
  },
  {
    "id": "q_lis_12",
    "skill": "listening",
    "type": "listening",
    "subtype": "conversation",
    "sectionId": "t_listen_signal",
    "difficulty": 2,
    "source": "2018.06 第1套 Conversation 2 Q13",
    "title": "转校生校园咨询：老师给出的融入建议",
    "preReadCue": "四项均为动词原形短语（Seek advice / Pick up hobbies / Participate in after-school activities / Look into），聚焦男士用 but 引出的建设性方案。",
    "scriptTurns": [
      {
        "speaker": "W",
        "text": "Yes, I know, but I'm younger than most students in my year. And that worries me a lot.",
        "signalWords": [
          "worries me a lot"
        ]
      },
      {
        "speaker": "M",
        "text": "Well, you may be the only younger one in your year, but, you know, we have a lot of after-school activities you can join in. And so, this way, you will be able to meet new friends of different age groups.",
        "isEvidence": true,
        "signalWords": [
          "may be ... but",
          "after-school activities",
          "join in"
        ]
      },
      {
        "speaker": "W",
        "text": "That's nice. I love games and hobby groups.",
        "signalWords": [
          "hobby groups"
        ]
      },
      {
        "speaker": "M",
        "text": "I'm sure you do. So you'll be just fine. Don't worry so much and try to make the most of what we have on offer here. Also, remember that you can come to me any time of the day if you need help.",
        "signalWords": [
          "make the most of",
          "any time"
        ]
      }
    ],
    "questionText": "What does Mr. Lee encourage Catherine to do?",
    "options": [
      "A. Seek advice from senior students.",
      "B. Pick up some meaningful hobbies.",
      "C. Participate in after-school activities.",
      "D. Look into what the school offers."
    ],
    "answer": "C",
    "evidenceQuote": "we have a lot of after-school activities you can join in. And so, this way, you will be able to meet new friends of different age groups.",
    "paraphraseBridge": "after-school activities you can join in -> Participate in after-school activities",
    "hintSteps": [
      "长对话建议题紧跟在求助方抛出难题之后，留意男士用 Well, ... but 提出的解决路径。",
      "区分两位说话人的话语归属：hobby groups 是女士自己说本来就喜欢的，不是男士劝她“新培养爱好（Pick up）”。",
      "抓动词短语替换：join in 对应选项中的 Participate in。"
    ]
  },
  {
    "id": "q_lis_13",
    "skill": "listening",
    "type": "listening",
    "subtype": "conversation",
    "sectionId": "t_listen_preread",
    "difficulty": 2,
    "source": "2018.06 第2套 Conversation 2 Q13",
    "title": "新健身房开业优惠细节辨析",
    "preReadCue": "四项为不同开业优惠（personal training / first week free / half-year discount / couples），听音时死盯时间词 day vs week 和 six-month。",
    "scriptTurns": [
      {
        "speaker": "W",
        "text": "Hi, David. There's a new gym opening in town today. Would you like to go with me this afternoon?",
        "signalWords": [
          "new gym opening"
        ]
      },
      {
        "speaker": "M",
        "text": "Yes, more than glad to. I haven't been to a gym for ages. I need to do some exercise to tone up.",
        "signalWords": [
          "tone up"
        ]
      },
      {
        "speaker": "W",
        "text": "Then this is a good chance. They sent me an invitation with a note saying I could take a friend for free on the first day. Also, if we both sign up before Friday, we can get a discount on a six-month membership.",
        "isEvidence": true,
        "signalWords": [
          "first day",
          "Also",
          "discount",
          "six-month membership"
        ]
      },
      {
        "speaker": "M",
        "text": "Great. Count me in. I really want to lose some of this belly fat and turn it into muscle. But I'm not sure which of the gym equipment will best help.",
        "signalWords": [
          "Count me in",
          "But"
        ]
      }
    ],
    "questionText": "What does the gym offer at its opening?",
    "options": [
      "A. Professional personal training.",
      "B. Free exercise for the first week.",
      "C. A discount for a half-year membership.",
      "D. Additional benefits for young couples."
    ],
    "answer": "C",
    "evidenceQuote": "Also, if we both sign up before Friday, we can get a discount on a six-month membership.",
    "paraphraseBridge": "a discount on a six-month membership -> A discount for a half-year membership",
    "hintSteps": [
      "四级听力极爱考“时间单位偷换”：听到 free 时千万别直接选 B，要核对原文是 first day 还是 first week。",
      "留意递进信号词 Also 后面紧跟的第二项优惠条件。",
      "将原文中的 six-month（六个月）心算转换为同义表达 half-year（半年）。"
    ]
  },
  {
    "id": "q_lis_14",
    "skill": "listening",
    "type": "listening",
    "subtype": "conversation",
    "sectionId": "t_listen_signal",
    "difficulty": 2,
    "source": "2017.12 第1套 Conversation 2 Q13",
    "title": "职场访谈：优秀谈判者最关键的特质",
    "preReadCue": "四项均为 They know when/how to ... 并列结构，听音时务必抓最高级信号词 most importantly。",
    "scriptTurns": [
      {
        "speaker": "W",
        "text": "Mr. Green, what do you think makes a successful negotiator?",
        "signalWords": [
          "successful negotiator"
        ]
      },
      {
        "speaker": "M",
        "text": "Well, it is hard to define, but I think successful negotiators have several things in common. They are always polite and rational people. They are firm, but flexible. They can recognize power and know how to use it.",
        "signalWords": [
          "in common",
          "firm, but flexible"
        ]
      },
      {
        "speaker": "M",
        "text": "They are sensitive to the dynamics in the negotiation, the way it rises and falls, and how it may change direction. They project an image of confidence. And perhaps most importantly, they know when to stop.",
        "isEvidence": true,
        "signalWords": [
          "And perhaps most importantly",
          "know when to stop"
        ]
      },
      {
        "speaker": "W",
        "text": "And what about an unsuccessful negotiator?",
        "signalWords": [
          "unsuccessful negotiator"
        ]
      },
      {
        "speaker": "M",
        "text": "Well, that's probably all of us when we start out. We are probably immature and over-trusting, too emotional or aggressive. Good negotiators learn fast; poor negotiators remain like that and go on losing negotiations.",
        "signalWords": [
          "Good negotiators",
          "poor negotiators"
        ]
      }
    ],
    "questionText": "What does the man say may be the most important thing for a successful negotiator?",
    "options": [
      "A. They know when to stop.",
      "B. They know how to adapt.",
      "C. They know when to make compromises.",
      "D. They know how to control their emotion."
    ],
    "answer": "A",
    "evidenceQuote": "And perhaps most importantly, they know when to stop.",
    "paraphraseBridge": "most importantly, they know when to stop -> 最高级信号词原词精准定位",
    "hintSteps": [
      "题干问的是“最重要的（most important）”，在排比列举多个优点时，务必等到最高级信号词出现。",
      "前文虽提到 flexible、emotion、compromises 等相关词汇，但它们属于一般特征或后文谈判步骤，不是“最重要的一点”。",
      "听到 And perhaps most importantly 立即锁定紧随其后的短句 they know when to stop。"
    ]
  },
  {
    "id": "q_lis_15",
    "skill": "listening",
    "type": "listening",
    "subtype": "conversation",
    "sectionId": "t_listen_signal",
    "difficulty": 2,
    "source": "2019.12 第1套 Conversation 1 Q9",
    "title": "科普电视节目提案：与传统纪录片的区别",
    "preReadCue": "四项均为 It will be more/easier ... 比较级（futuristic / systematic / entertaining / easier），听音锁定 However 后的差异点。",
    "scriptTurns": [
      {
        "speaker": "W",
        "text": "The name of the TV show we wish to produce is Science Nation.",
        "signalWords": [
          "Science Nation"
        ]
      },
      {
        "speaker": "M",
        "text": "Please tell us more. What would Science Nation be about?",
        "signalWords": [
          "What would"
        ]
      },
      {
        "speaker": "W",
        "text": "It will be about science, all sorts of science. Each episode will focus on a different area of science, and tell us what we know, how we know it, and what we still don't know. The show will have one host only, Professor Susan Paul from Harvard University.",
        "signalWords": [
          "different area of science"
        ]
      },
      {
        "speaker": "M",
        "text": "So, just to be clear. Will the show's format be like that of a documentary?",
        "signalWords": [
          "format",
          "documentary"
        ]
      },
      {
        "speaker": "W",
        "text": "Kind of. It will be like a documentary in the sense that it will be non-fiction and fact-based. However, our idea is for it to be also fun and entertaining, something which traditional documentaries aren't so much.",
        "isEvidence": true,
        "signalWords": [
          "Kind of",
          "However",
          "fun and entertaining",
          "traditional documentaries"
        ]
      },
      {
        "speaker": "M",
        "text": "Okay, so it will be both educational and entertaining, and your audience will be anyone interested in science, right?",
        "signalWords": [
          "both educational and entertaining"
        ]
      }
    ],
    "questionText": "In what way will the TV show Science Nation differ from traditional documentaries?",
    "options": [
      "A. It will be more futuristic.",
      "B. It will be more systematic.",
      "C. It will be more entertaining.",
      "D. It will be easier to understand."
    ],
    "answer": "C",
    "evidenceQuote": "However, our idea is for it to be also fun and entertaining, something which traditional documentaries aren't so much.",
    "paraphraseBridge": "fun and entertaining, something which traditional documentaries aren't -> It will be more entertaining",
    "hintSteps": [
      "当男士发问“Will the show's format be like that of a documentary?”时，立刻预判女士会先说相同点、再用 However 引出不同点。",
      "注意核对原文有无出现 futuristic、systematic、easy to understand 等臆测词。",
      "女士在 However 后明确强调 fun and entertaining，且男士下一句再次复述 both educational and entertaining 予以强化。"
    ]
  },
  {
    "id": "q_lis_16",
    "skill": "listening",
    "type": "listening",
    "subtype": "conversation",
    "sectionId": "t_listen_signal",
    "difficulty": 3,
    "source": "2019.12 第1套 Conversation 2 Q15",
    "title": "走出完美主义内耗：女士的最终建议",
    "preReadCue": "四项均为祈使建议句（optimistic / Compare present with past / learn from others / Treat others），紧盯对话结尾 Listen 后的核心劝导。",
    "scriptTurns": [
      {
        "speaker": "W",
        "text": "What's up with you? You don't look very happy.",
        "signalWords": [
          "What's up"
        ]
      },
      {
        "speaker": "M",
        "text": "I feel like I'm a failure. I can't seem to do anything very well. I have this urge to strive for perfection.",
        "signalWords": [
          "failure",
          "strive for perfection"
        ]
      },
      {
        "speaker": "W",
        "text": "Well, that's very admirable. But be careful. Over-concern with being perfect can damage our confidence if we never achieve it. You can't make progress without making mistakes and learning from them.",
        "signalWords": [
          "But be careful",
          "Over-concern"
        ]
      },
      {
        "speaker": "M",
        "text": "I always feel down when I see others accomplishing things, and I feel miserable about my own achievements. I'm always trying to be as good as others, but I never seem to get there.",
        "signalWords": [
          "see others accomplishing",
          "miserable"
        ]
      },
      {
        "speaker": "W",
        "text": "Listen, if you always compare yourself with others, you'll never feel good enough. You're the only person you should be comparing yourself with. When you compare your current status with the starting point, you'll find you've made progress, right? That's good enough.",
        "isEvidence": true,
        "signalWords": [
          "Listen",
          "only person",
          "current status",
          "starting point"
        ]
      },
      {
        "speaker": "M",
        "text": "That's great advice. Thank you. I'm feeling better already.",
        "signalWords": [
          "great advice"
        ]
      }
    ],
    "questionText": "What does the woman suggest the man do?",
    "options": [
      "A. Try to be optimistic whatever happens.",
      "B. Compare his present with his past only.",
      "C. Always learn from others' achievements.",
      "D. Treat others the way he would be treated."
    ],
    "answer": "B",
    "evidenceQuote": "You're the only person you should be comparing yourself with. When you compare your current status with the starting point, you'll find you've made progress, right?",
    "paraphraseBridge": "only person ... compare your current status with the starting point -> Compare his present with his past only",
    "hintSteps": [
      "对话最后一题往往对应末尾的总结性建议，且常以 Listen / You should / That's great advice 作为收尾标记。",
      "警惕选项 C 借用原词 others' achievements 反着说——女士恰恰劝男士不要总和别人比。",
      "将原文中的 current status（当前状态）和 starting point（起点）对应转换为 present 和 past，并配合 only 锁定答案。"
    ]
  },
  {
    "id": "q_lis_17",
    "skill": "listening",
    "type": "listening",
    "subtype": "passage",
    "sectionId": "t_listen_preread",
    "difficulty": 2,
    "source": "2018.06 第1套 Passage 1 Q16",
    "title": "小鼠实验揭示饥饿是最强生理驱动力",
    "preReadCue": "四项均为 To do 不定式目的结构，聚焦短文开头前两句的 To determine ... 实验目的。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "Have you ever felt like you would do just about anything to satisfy your hunger? A new study in mice may help to explain why hunger can feel like such a powerful motivating force.",
        "signalWords": [
          "new study in mice",
          "powerful motivating force"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "In the study, researchers found that hunger outweighed other physical drives, including fear, thirst and social needs. To determine which feeling won out, the researchers did a series of experiments.",
        "isEvidence": true,
        "signalWords": [
          "outweighed other physical drives",
          "To determine",
          "won out"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "In one experiment, the mice were both hungry and thirsty. When given the choice of either eating food or drinking water, the mice went for the food. However, when the mice were well-fed but thirsty, they opted to drink.",
        "signalWords": [
          "In one experiment",
          "However"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "In the second experiment meant to pit the mice's hunger against their fear, it turned out that when the mice were hungry, they ventured into fox-scented unsafe areas for food. Hunger also outweighed their social needs.",
        "signalWords": [
          "second experiment",
          "It turned out"
        ]
      }
    ],
    "questionText": "What is the researchers' purpose in carrying out the series of experiments with mice?",
    "options": [
      "A. To investigate how being overweight impacts on health.",
      "B. To find out which physical drive is the most powerful.",
      "C. To discover what most mice like to eat.",
      "D. To determine what feelings mice have."
    ],
    "answer": "B",
    "evidenceQuote": "In the study, researchers found that hunger outweighed other physical drives, including fear, thirst and social needs. To determine which feeling won out, the researchers did a series of experiments.",
    "paraphraseBridge": "outweighed other physical drives ... determine which feeling won out -> find out which physical drive is the most powerful",
    "hintSteps": [
      "短文首题基本落在前 2–3 句，不定式选项直接对应听力中的 To determine / To find out 结构。",
      "D 项“确定老鼠有什么情绪”偷换了实验核心：研究者不是探查老鼠有哪些感觉，而是比较哪种驱动力胜出（won out）。",
      "把前一句的 physical drives 与后一句的 determine which feeling won out 合并理解，精准锁定答案。"
    ]
  },
  {
    "id": "q_lis_18",
    "skill": "listening",
    "type": "listening",
    "subtype": "passage",
    "sectionId": "t_listen_preread",
    "difficulty": 2,
    "source": "2018.06 第1套 Passage 2 Q20",
    "title": "美国州际公路网最初兴建的国防初衷",
    "preReadCue": "四项为 To do 目的结构（countryside / move troops / higher speed / goods），定位回溯至 1920s 一战后的原始动机。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "The United States has one of the best highway systems in the world. Interstate highways connect just about every large and mid-sized city in the country. Did you ever wonder why such a complete system of excellent roads exists?",
        "signalWords": [
          "Did you ever wonder why"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "For an answer, you would have to go back to the early 1920s. In those years, just after World War I, the military wanted to build an American highway system for national defense. Such a system could, if necessary, move troops quickly from one area to another.",
        "isEvidence": true,
        "signalWords": [
          "For an answer",
          "military",
          "national defense",
          "move troops quickly"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "In 1944, Congress passed a bill to upgrade the system, and in the 1950s over 25 billion dollars was appropriated to construct about 40,000 miles of new roads.",
        "signalWords": [
          "1944",
          "1950s",
          "25 billion"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Though the system was built mostly to make car travel easier, defense was not forgotten. For instance, highway overpasses had to be high enough to allow trailers carrying military missiles to pass under them. By 1974, this system was mostly completed.",
        "signalWords": [
          "Though",
          "defense",
          "By 1974"
        ]
      }
    ],
    "questionText": "What was the original purpose of building a highway system?",
    "options": [
      "A. To improve transportation in the countryside.",
      "B. To move troops quickly from place to place.",
      "C. To enable people to travel at a higher speed.",
      "D. To speed up the transportation of goods."
    ],
    "answer": "B",
    "evidenceQuote": "the military wanted to build an American highway system for national defense. Such a system could, if necessary, move troops quickly from one area to another.",
    "paraphraseBridge": "move troops quickly from one area to another -> move troops quickly from place to place",
    "hintSteps": [
      "短文中的自问自答句型（Did you ever wonder why...? For an answer...）几乎百分百直接引出考点。",
      "区分“最初目的（1920s 军方国防）”与“1950s 之后的民用便利（make car travel easier）”。",
      "抓原文短语 from one area to another 到选项 from place to place 的精准同义转换。"
    ]
  },
  {
    "id": "q_lis_19",
    "skill": "listening",
    "type": "listening",
    "subtype": "passage",
    "sectionId": "t_listen_preread",
    "difficulty": 2,
    "source": "2018.06 第1套 Passage 3 Q23",
    "title": "防开车发短信的智能方向盘装置",
    "preReadCue": "四项为 A gadget/device to ... 定义句（hold a phone / charge / control speed / drive with both hands），锁定 It's called Smart Wheel 后的功能定义。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "Texting while driving was listed as a major cause of road deaths among young Americans back in 2013. A recent study said that 40 percent of American teens claim to have been in a car when the driver used a cell phone dangerously.",
        "signalWords": [
          "Texting while driving",
          "major cause"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "T.J. Evarts, a 20-year-old inventor, has come up with a novel solution that could easily put texting drivers on notice.",
        "signalWords": [
          "novel solution"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "It's called Smart Wheel, and it's designed to fit over the steering wheel of most standard vehicles to track whether or not the driver has two hands on the wheel at all times.",
        "isEvidence": true,
        "signalWords": [
          "It's called",
          "designed to",
          "two hands on the wheel"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Evarts' invention warns drivers with a light and a sound when they hold the wheel with one hand only. All the data Smart Wheel collects is also sent to a connected app so parents can keep track of their teen's driving habits.",
        "signalWords": [
          "warns",
          "one hand only",
          "connected app"
        ]
      }
    ],
    "questionText": "What is Smart Wheel?",
    "options": [
      "A. A gadget to hold a phone on the steering wheel.",
      "B. A gadget to charge the phone in a car.",
      "C. A device to control the speed of a vehicle.",
      "D. A device to ensure people drive with both hands."
    ],
    "answer": "D",
    "evidenceQuote": "It's called Smart Wheel, and it's designed to fit over the steering wheel of most standard vehicles to track whether or not the driver has two hands on the wheel at all times.",
    "paraphraseBridge": "track whether or not the driver has two hands on the wheel -> ensure people drive with both hands",
    "hintSteps": [
      "遇到四项全是“某物是什么”的定义型选项，听到专有名词 It's called ... / designed to ... 立即集中注意力。",
      "A 项拼凑了原文中的 phone 和 steering wheel，但装置并非用来架手机，而是防止开车玩手机。",
      "原文 two hands on the wheel 在选项中清晰替换为 drive with both hands。"
    ]
  },
  {
    "id": "q_lis_20",
    "skill": "listening",
    "type": "listening",
    "subtype": "passage",
    "sectionId": "t_listen_signal",
    "difficulty": 3,
    "source": "2018.06 第2套 Passage 1 Q18",
    "title": "求职申请管理：重质不重量的建议",
    "preReadCue": "四项为动词建议短语（Provide data / Personalize each application / better search engines / more promising positions），死盯篇末转折词 Nevertheless。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "In today's job market, it is now common for job seekers to send applications for many positions. Managing your job search properly is just as important as identifying job opportunities and submitting your applications.",
        "signalWords": [
          "common",
          "Managing your job search"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "If you are familiar with Microsoft Excel or a similar program, creating a table is a simple and effective way to keep track of your job applications. Google is another tool to help you get organized effectively.",
        "signalWords": [
          "Excel",
          "Google",
          "get organized"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Clearly, there are plenty of ways to keep track of your job search, and making the effort to simplify your job search will pay off.",
        "signalWords": [
          "Clearly",
          "pay off"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Nevertheless, you should always focus on quality, not quantity. Only apply for positions you are qualified for, and make each application count, personalizing each cover letter, and updating and editing your resume.",
        "isEvidence": true,
        "signalWords": [
          "Nevertheless",
          "should always",
          "quality, not quantity",
          "personalizing"
        ]
      }
    ],
    "questionText": "What does the speaker suggest job seekers do?",
    "options": [
      "A. Provide their data in detail.",
      "B. Personalize each application.",
      "C. Make use of better search engines.",
      "D. Apply for more promising positions."
    ],
    "answer": "B",
    "evidenceQuote": "Nevertheless, you should always focus on quality, not quantity. Only apply for positions you are qualified for, and make each application count, personalizing each cover letter, and updating and editing your resume.",
    "paraphraseBridge": "make each application count, personalizing each cover letter -> Personalize each application",
    "hintSteps": [
      "短文末题常考作者的最终忠告，转折词 Nevertheless 叠加情态动词 you should always 是极强的双信号提示。",
      "警惕 D 项偷换概念：原文说只申请“你胜任的职位（qualified for）”，而非“更有前途的职位（more promising）”。",
      "精准抓住关键词 personalizing 与 make each application count 的合并表达。"
    ]
  },
  {
    "id": "q_lis_21",
    "skill": "listening",
    "type": "listening",
    "subtype": "passage",
    "sectionId": "t_listen_signal",
    "difficulty": 2,
    "source": "2017.12 第1套 Passage 3 Q23",
    "title": "森林迷路求生指南：切勿盲目沿陌生溪流前行",
    "preReadCue": "四项均为 You may ... 可能后果（wonderland / sudden flood / unexpected dangers / find a way out），聚焦让步转折句 Though ... there may also be。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "When you think you are lost in the woods, sit down on a log or rock, or lean against a tree, and recite something you have memorized to bring your mind under control. Don't run blindly.",
        "signalWords": [
          "sit down",
          "Don't run blindly"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "If you must move, don't follow a stream unless you know it, and in that case you are not lost.",
        "signalWords": [
          "don't follow a stream"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Streams normally flow through wetland before they reach a lake or a river. Though there are more edible plants, there may also be wild animals, poisonous snakes, and other hazards.",
        "isEvidence": true,
        "signalWords": [
          "Though",
          "wild animals",
          "poisonous snakes",
          "other hazards"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Many experts feel it is wisest to walk uphill. At the top of most hills and mountains are trails leading back to civilization, and you are much easier to be seen from the air.",
        "signalWords": [
          "wisest",
          "walk uphill"
        ]
      }
    ],
    "questionText": "What will happen if you follow an unknown stream in the woods?",
    "options": [
      "A. You may end up entering a wonderland.",
      "B. You may get drowned in a sudden flood.",
      "C. You may expose yourself to unexpected dangers.",
      "D. You may find a way out without your knowing it."
    ],
    "answer": "C",
    "evidenceQuote": "Though there are more edible plants, there may also be wild animals, poisonous snakes, and other hazards.",
    "paraphraseBridge": "wild animals, poisonous snakes, and other hazards -> unexpected dangers",
    "hintSteps": [
      "先用常识与情感色彩排除明显反调的积极选项 A（仙境）和 D（不知不觉走出森林），因为前句明确警告 don't follow a stream。",
      "对比 B 和 C：原文提到湿地（wetland）、野兽、毒蛇及其他危险，从未提及洪水（sudden flood）。",
      "抓高频四级同义词对：hazards = dangers。"
    ]
  },
  {
    "id": "q_lis_22",
    "skill": "listening",
    "type": "listening",
    "subtype": "passage",
    "sectionId": "t_listen_signal",
    "difficulty": 3,
    "source": "2019.12 第1套 Passage 2 Q19",
    "title": "打破刻板印象：西雅图真的那么多雨吗？",
    "preReadCue": "四项均关于降雨特征（rains cats and dogs / seldom in summer / not as much as people think / most rainy），警惕首句反常识否定句 doesn't really。",
    "scriptTurns": [
      {
        "speaker": "Narrator",
        "text": "Today I found out that Seattle doesn't really get that much rain compared with most US cities. In fact, Seattle ranks 44th among major US cities in average annual rainfall.",
        "isEvidence": true,
        "signalWords": [
          "found out",
          "doesn't really",
          "In fact",
          "ranks 44th"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "Cities that get more rainfall than Seattle include Houston, Memphis, Nashville, and pretty much every major city on the eastern coast, such as New York, Boston and Miami.",
        "signalWords": [
          "more rainfall than Seattle"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "So why does everyone think of Seattle as a rainy city? The primary root of this misconception lies in that Seattle has a relatively large number of days per year with rainfall.",
        "isEvidence": true,
        "signalWords": [
          "misconception",
          "large number of days"
        ]
      },
      {
        "speaker": "Narrator",
        "text": "So it rains a lot less in Seattle, and the rain is spread out over more days. When it does rain, it tends to be a very light rain. On top of that, it never really storms in Seattle either.",
        "signalWords": [
          "a lot less",
          "very light rain",
          "On top of that"
        ]
      }
    ],
    "questionText": "What does the speaker find out about Seattle?",
    "options": [
      "A. It often rains cats and dogs.",
      "B. It seldom rains in summer time.",
      "C. It does not rain as much as people think.",
      "D. It is one of the most rainy cities in the US."
    ],
    "answer": "C",
    "evidenceQuote": "Today I found out that Seattle doesn't really get that much rain compared with most US cities. In fact, Seattle ranks 44th among major US cities in average annual rainfall.",
    "paraphraseBridge": "doesn't really get that much rain ... misconception -> does not rain as much as people think",
    "hintSteps": [
      "科普短文常以“打破大众误区”开篇，首句 found out that + 否定词 doesn't really 直接点破主旨。",
      "排除刻板印象干扰项 A（倾盆大雨）和 D（最多雨的城市之一）——这恰好是原文要批驳的 misconception。",
      "将首句 doesn't really get that much rain 与后文 everyone think of Seattle as a rainy city 合并，锁定答案。"
    ]
  },
  {
    "id": "q_clz_01",
    "skill": "cloze",
    "type": "cloze",
    "sectionId": "t_cloze_pos",
    "difficulty": 2,
    "source": "2026.06 第1套 Section A（完整10空）",
    "title": "工业革命与工人生活水平之争",
    "passageHtml": "One of the biggest controversies over the Industrial Revolution is how it affected the working class. The oldest debates were over whether the standards of living rose or fell. Those that believed they fell claimed that the capitalists {{1}} every ounce of surplus they could from the working class. Those that believed the standards of living rose claimed that the environment was consumer-friendly, with more and more goods {{2}} to the working class every year. Today's historians agree that overall, the standards of living {{3}}. They do not agree, however, on when this improvement {{4}}.\n\nIn an effort to solve this controversy, historians have attempted to define {{5}} what \"standard of living\" means. They all seem to agree that it should mean happiness, but happiness is impossible to measure. Instead, historians {{6}} use \"real income\" as the measure for the standards of living. Real income is money {{7}} and then adjusted according to the cost of living. However, it does not take into account unemployment, pollution, health, life expectancy, or free time.\n\nAfter {{8}} debate and analysis of the average income, historians have agreed to disagree on whether there was rapid or slow economic growth during the Industrial Revolution. Instead, they have decided to {{9}} how the Industrial Revolution was affected by other events. They have determined that the Industrial Revolution had an overall positive {{10}}, but it quite possibly was neutralized by negative events such as wars, high taxes, and rapid population growth.",
    "wordBank": [
      {
        "code": "A",
        "word": "available",
        "pos": "adj.",
        "meaning": "可获得的，可用的"
      },
      {
        "code": "B",
        "word": "deteriorating",
        "pos": "adj./v.",
        "meaning": "恶化的，退化的"
      },
      {
        "code": "C",
        "word": "earned",
        "pos": "v.",
        "meaning": "挣得，赚取（过去分词）"
      },
      {
        "code": "D",
        "word": "effect",
        "pos": "n.",
        "meaning": "影响，效果"
      },
      {
        "code": "E",
        "word": "enhance",
        "pos": "v.",
        "meaning": "提高，增强"
      },
      {
        "code": "F",
        "word": "exactly",
        "pos": "adv.",
        "meaning": "确切地，精确地"
      },
      {
        "code": "G",
        "word": "exhausting",
        "pos": "adj.",
        "meaning": "耗尽精力的，冗长乏味的"
      },
      {
        "code": "H",
        "word": "experience",
        "pos": "n./v.",
        "meaning": "经历，体验"
      },
      {
        "code": "I",
        "word": "increased",
        "pos": "v.",
        "meaning": "增加，提高（过去式）"
      },
      {
        "code": "J",
        "word": "interpret",
        "pos": "v.",
        "meaning": "解释，解读"
      },
      {
        "code": "K",
        "word": "occurred",
        "pos": "v.",
        "meaning": "发生（过去式）"
      },
      {
        "code": "L",
        "word": "peculiar",
        "pos": "adj.",
        "meaning": "奇特的，特有的"
      },
      {
        "code": "M",
        "word": "probably",
        "pos": "adv.",
        "meaning": "大概，可能"
      },
      {
        "code": "N",
        "word": "squeezed",
        "pos": "v.",
        "meaning": "榨取，挤压（过去式）"
      },
      {
        "code": "O",
        "word": "typically",
        "pos": "adv.",
        "meaning": "通常，典型地"
      }
    ],
    "blanks": [
      {
        "num": 1,
        "answer": "N",
        "posHint": "v.(过去式)",
        "explain": "that 从句缺谓语动词，且与 believed/claimed 保持过去时；squeeze ... from 表示“从……中榨取”。"
      },
      {
        "num": 2,
        "answer": "A",
        "posHint": "adj.",
        "explain": "with + 名词 + 形容词作宾补；available to sb. 为固定搭配，意为“可供某人获得的”。"
      },
      {
        "num": 3,
        "answer": "I",
        "posHint": "v.(过去式)",
        "explain": "宾语从句缺不及物动词谓语，后文用 this improvement 回指，说明生活水平“提高了（increased）”。"
      },
      {
        "num": 4,
        "answer": "K",
        "posHint": "v.(过去式)",
        "explain": "when 引导的宾语从句缺不及物动词过去式，表示这一改善何时“发生（occurred）”。"
      },
      {
        "num": 5,
        "answer": "F",
        "posHint": "adv.",
        "explain": "修饰动词 define 需要副词；define exactly 表示“准确界定”。"
      },
      {
        "num": 6,
        "answer": "O",
        "posHint": "adv.",
        "explain": "位于主语 historians 与谓语动词 use 之间填副词；typically 表示历史学家“通常”采用实际收入衡量。"
      },
      {
        "num": 7,
        "answer": "C",
        "posHint": "v.(过去分词)",
        "explain": "与 and then adjusted 并列作后置定语修饰 money；money earned 指“赚取的收入”。"
      },
      {
        "num": 8,
        "answer": "G",
        "posHint": "adj.",
        "explain": "修饰名词 debate and analysis 需形容词；exhausting debate 指“漫长而耗尽精力的争论”。"
      },
      {
        "num": 9,
        "answer": "J",
        "posHint": "v.(原形)",
        "explain": "decided to 后接动词原形，接 how 从句作宾语，interpret how ... 表示“解读……是如何受影响的”。"
      },
      {
        "num": 10,
        "answer": "D",
        "posHint": "n.",
        "explain": "冠词 an 与形容词 overall positive 后缺单数名词；have a positive effect 为高频固定搭配。"
      }
    ],
    "hintSteps": [
      "先把 15 个词按词性分四栏：过去式/分词（C/I/K/N）、动词原形（E/H/J）、形容词（A/B/G/L）、副词（F/M/O）、名词（D/H）。",
      "抓最明显的固定搭配秒杀：{{2}} available to、{{7}} earned and adjusted、{{10}} positive effect。",
      "区分三个副词槽位：{{5}} 修饰 define（精确界定 -> F），{{6}} 修饰史学界惯常做法（通常 -> O），排除 M。"
    ]
  },
  {
    "id": "q_clz_02",
    "skill": "cloze",
    "type": "cloze",
    "sectionId": "t_cloze_context",
    "difficulty": 3,
    "source": "2026.06 第2套 Section A（完整10空）",
    "title": "对苦味更敏感的人反而更爱喝咖啡？",
    "passageHtml": "It may sound surprising, but people who are supersensitive to coffee's bitter taste actually drink more of it, a new study finds.\n\nThis sensitivity isn't {{1}} a matter of taste, either, but rather is influenced by a person's genetic makeup, the researchers said in the study.\n\n\"You'd expect that people who are particularly sensitive to the bitter taste of caffeine would drink less coffee,\" said study senior researcher Marilyn Cornelis. \"The {{2}} results of our study suggest coffee consumers acquire a taste for or an ability to detect the bitterness of caffeine due to the learned positive {{3}} brought out by caffeine.\"\n\nPut another way, people who have a {{4}} ability to taste the bitterness of coffee learn to associate \"good things with it,\" Cornelis said. This finding is surprising, given that bitterness often serves as a warning mechanism to {{5}} people to spit out harmful substances, scientists said.\n\nResearchers conducted the study to understand how genetics influences people's {{6}} of tea, coffee and alcohol which tend to taste bitter, said lead study researcher Jue Sheng Ong.\n\n\"While all bitter flavors may seem the same, we {{7}} the bitterness of Brussels sprouts, quinine and caffeine {{8}},\" Ong told Live Science. \"The degree to which we find these flavors bitter is, in part, determined by your genes.\"\n\nPeople with the genes to taste the bitterness of green vegetables are more likely to prefer tea to coffee. In {{9}}, people who were more sensitive to quinine's bitter flavors and those found in green vegetables tended to {{10}} coffee.",
    "wordBank": [
      {
        "code": "A",
        "word": "addition",
        "pos": "n.",
        "meaning": "增加，此外（in addition）"
      },
      {
        "code": "B",
        "word": "approximately",
        "pos": "adv.",
        "meaning": "大约，近似地"
      },
      {
        "code": "C",
        "word": "avoid",
        "pos": "v.",
        "meaning": "避开，避免"
      },
      {
        "code": "D",
        "word": "consumption",
        "pos": "n.",
        "meaning": "消费，摄入量"
      },
      {
        "code": "E",
        "word": "converted",
        "pos": "v.",
        "meaning": "转换，改变（过去分词）"
      },
      {
        "code": "F",
        "word": "convince",
        "pos": "v.",
        "meaning": "说服，促使"
      },
      {
        "code": "G",
        "word": "heightened",
        "pos": "adj.",
        "meaning": "增强的，更敏锐的"
      },
      {
        "code": "H",
        "word": "omission",
        "pos": "n.",
        "meaning": "遗漏，省略"
      },
      {
        "code": "I",
        "word": "opposite",
        "pos": "adj.",
        "meaning": "相反的"
      },
      {
        "code": "J",
        "word": "perceive",
        "pos": "v.",
        "meaning": "感知，察觉"
      },
      {
        "code": "K",
        "word": "prospect",
        "pos": "n.",
        "meaning": "前景，可能性"
      },
      {
        "code": "L",
        "word": "reinforcement",
        "pos": "n.",
        "meaning": "强化，正反馈"
      },
      {
        "code": "M",
        "word": "separately",
        "pos": "adv.",
        "meaning": "分别地，独立地"
      },
      {
        "code": "N",
        "word": "simply",
        "pos": "adv.",
        "meaning": "仅仅，只是"
      },
      {
        "code": "O",
        "word": "targeted",
        "pos": "adj./v.",
        "meaning": "有针对性的，瞄准"
      }
    ],
    "blanks": [
      {
        "num": 1,
        "answer": "N",
        "posHint": "adv.",
        "explain": "not simply ... but rather ... 为固定对照句式，意为“不只是……而是……”。"
      },
      {
        "num": 2,
        "answer": "I",
        "posHint": "adj.",
        "explain": "前句说人们本以为敏感者会少喝，本句转折指出“相反的（opposite）”研究结果。"
      },
      {
        "num": 3,
        "answer": "L",
        "posHint": "n.",
        "explain": "learned positive 修饰名词，咖啡因带来的“习得性正向强化（positive reinforcement）”是心理学高频术语。"
      },
      {
        "num": 4,
        "answer": "G",
        "posHint": "adj.",
        "explain": "修饰名词 ability，呼应前文 supersensitive，意为“更敏锐的（heightened）品苦能力”。"
      },
      {
        "num": 5,
        "answer": "F",
        "posHint": "v.(原形)",
        "explain": "to 后接动词原形，convince sb. to do sth. 表示“促使/说服人们吐出有害物质”。"
      },
      {
        "num": 6,
        "answer": "D",
        "posHint": "n.",
        "explain": "people's 后接名词，consumption of tea, coffee and alcohol 意为“茶、咖啡与酒精的摄入/消费”。"
      },
      {
        "num": 7,
        "answer": "J",
        "posHint": "v.(原形)",
        "explain": "主语 we 后缺及物动词谓语，perceive the bitterness 意为“感知苦味”。"
      },
      {
        "num": 8,
        "answer": "M",
        "posHint": "adv.",
        "explain": "句尾缺副词修饰动词 perceive；While 从句说看似相同，主句转折说明我们是“分别（separately）”感知它们的。"
      },
      {
        "num": 9,
        "answer": "A",
        "posHint": "n.",
        "explain": "句首 In ___ 构成固定衔接短语 In addition（此外）。"
      },
      {
        "num": 10,
        "answer": "C",
        "posHint": "v.(原形)",
        "explain": "tended to 后接动词原形；前句说更偏好茶而非咖啡，本句递进说明这类人倾向于“避开（avoid）”咖啡。"
      }
    ],
    "hintSteps": [
      "利用固定搭配快速拿下 4 个送分空：{{1}} isn't simply ... but rather、{{5}} convince sb. to do、{{9}} In addition、{{10}} tend to avoid。",
      "抓上下句反义对照：{{2}} 对照前句 would drink less（结果相反 -> I）；{{8}} 对照 While ... seem the same（分别感知 -> M）。",
      "结合科普语义判断抽象名词：{{3}} 咖啡因带来的正向“强化（L）”，{{6}} 饮品的“摄入量（D）”。"
    ]
  },
  {
    "id": "q_clz_03",
    "skill": "cloze",
    "type": "cloze",
    "sectionId": "t_cloze_context",
    "difficulty": 2,
    "source": "2026.06 第3套 Section A（完整10空）",
    "title": "戒掉垃圾食品也会出现戒断反应？",
    "passageHtml": "Junk-food lovers who try to cut back on fries or chocolate may experience symptoms similar to drug withdrawal, a new study suggests.\n\nResearchers found that people attempting to cut down on eating highly processed foods experience some of the same {{1}} and psychological symptoms—such as mood swings, anxiety, headaches and poor sleep—as those {{2}} smoking cigarettes or using drugs, according to the study.\n\nThe new study {{3}} the first evidence that these withdrawal-like symptoms can occur when people cut down on highly processed foods, said lead study author Erica Schulte.\n\nBased on the participants' self-reported symptoms, withdrawal symptoms were {{4}} more intense between the second and fifth days after attempting to reduce junk-food consumption, which {{5}} the time span people live through during drug withdrawal.\n\nThe idea that food may be addictive after \"heavy\" use by some individuals is a {{6}} subject, Schulte said. Although prior studies in animals and humans have shown some biological and behavioral similarities between substance-use disorders and addictive-like consumption of highly processed foods, no studies have looked at whether reducing junk food can {{7}} withdrawal symptoms in people, she noted.\n\nRaising {{8}} that people may experience irritability or headaches when cutting down on junk food can help individuals {{9}} coping strategies in advance, Schulte noted. The findings may also {{10}} light on the barriers people face when changing eating habits—barriers that may play a role in people dropping out of treatments, she said.",
    "wordBank": [
      {
        "code": "A",
        "word": "awareness",
        "pos": "n.",
        "meaning": "意识，认知"
      },
      {
        "code": "B",
        "word": "canceling",
        "pos": "v.",
        "meaning": "取消（现在分词）"
      },
      {
        "code": "C",
        "word": "controversial",
        "pos": "adj.",
        "meaning": "有争议的"
      },
      {
        "code": "D",
        "word": "emptiness",
        "pos": "n.",
        "meaning": "空虚，空白"
      },
      {
        "code": "E",
        "word": "monstrous",
        "pos": "adj.",
        "meaning": "巨大的，畸形的"
      },
      {
        "code": "F",
        "word": "offers",
        "pos": "v.",
        "meaning": "提供（第三人称单数）"
      },
      {
        "code": "G",
        "word": "parallels",
        "pos": "v.",
        "meaning": "与……相似/平行（第三人称单数）"
      },
      {
        "code": "H",
        "word": "permanently",
        "pos": "adv.",
        "meaning": "永久地"
      },
      {
        "code": "I",
        "word": "physical",
        "pos": "adj.",
        "meaning": "身体上的，生理的"
      },
      {
        "code": "J",
        "word": "prepare",
        "pos": "v.",
        "meaning": "准备"
      },
      {
        "code": "K",
        "word": "prospects",
        "pos": "n.",
        "meaning": "前景，预期"
      },
      {
        "code": "L",
        "word": "quitting",
        "pos": "v.",
        "meaning": "戒掉，停止（现在分词）"
      },
      {
        "code": "M",
        "word": "shed",
        "pos": "v.",
        "meaning": "散发，照亮（shed light on）"
      },
      {
        "code": "N",
        "word": "significantly",
        "pos": "adv.",
        "meaning": "显著地，明显地"
      },
      {
        "code": "O",
        "word": "trigger",
        "pos": "v.",
        "meaning": "引发，触发"
      }
    ],
    "blanks": [
      {
        "num": 1,
        "answer": "I",
        "posHint": "adj.",
        "explain": "与 and psychological 并列修饰 symptoms，且后文列举头痛、睡眠差等生理症状，选 physical。"
      },
      {
        "num": 2,
        "answer": "L",
        "posHint": "v.(-ing)",
        "explain": "作后置定语修饰 those，与 smoking cigarettes 搭配表示“戒烟”，选 quitting。"
      },
      {
        "num": 3,
        "answer": "F",
        "posHint": "v.(三单)",
        "explain": "单数主语 The new study 后缺谓语，offers the first evidence 表示“提供首个证据”。"
      },
      {
        "num": 4,
        "answer": "N",
        "posHint": "adv.",
        "explain": "修饰比较级 more intense 填副词，significantly more intense 意为“明显更为强烈”。"
      },
      {
        "num": 5,
        "answer": "G",
        "posHint": "v.(三单)",
        "explain": "which 指代前句现象，作主语接三单动词，parallels the time span 意为“与药物戒断时间跨度相似”。"
      },
      {
        "num": 6,
        "answer": "C",
        "posHint": "adj.",
        "explain": "a ___ subject 缺形容词；食物是否会成瘾是一个“有争议的（controversial）”话题。"
      },
      {
        "num": 7,
        "answer": "O",
        "posHint": "v.(原形)",
        "explain": "情态动词 can 后接动词原形，trigger withdrawal symptoms 意为“诱发/触发戒断症状”。"
      },
      {
        "num": 8,
        "answer": "A",
        "posHint": "n.",
        "explain": "Raising awareness 为四级超高频动宾搭配，意为“提高意识/认知”。"
      },
      {
        "num": 9,
        "answer": "J",
        "posHint": "v.(原形)",
        "explain": "help sb. do sth. 结构填动词原形，prepare coping strategies in advance 意为“提前准备应对策略”。"
      },
      {
        "num": 10,
        "answer": "M",
        "posHint": "v.(原形)",
        "explain": "may also 后接动词原形，shed light on 为固定短语，意为“阐明，使……更清楚”。"
      }
    ],
    "hintSteps": [
      "一眼秒杀四大高频固定搭配：{{1}} physical and psychological、{{2}} quitting smoking、{{8}} Raising awareness、{{10}} shed light on。",
      "抓动词三单槽位（仅有 F/G 两个三单动词）：{{3}} 提供证据（offers），{{5}} 与时间跨度相似（parallels）。",
      "抓情态动词后动词原形槽位（J/M/O）：{{7}} 诱发症状（trigger），{{9}} 提前准备策略（prepare）。"
    ]
  },
  {
    "id": "q_clz_04",
    "skill": "cloze",
    "type": "cloze",
    "sectionId": "t_cloze_pos",
    "difficulty": 2,
    "source": "2024.06 第1套 Section A（完整10空）",
    "title": "运动强度如何影响情绪收益？",
    "passageHtml": "It's well known that physical exercise is beneficial not just to physical health but also to mental health. Yet whereas most countries have {{1}} evidence-backed guidelines on the type and intensity of exercise {{2}} for various physical health benefits, such guidelines do not yet exist for exercise and mood. This is {{3}} due to a lack of necessary evidence. However, a new systematic review brings us usefully up-to-date on the current findings in this area.\n\nBefore {{4}} into some of the key take-aways, an important {{5}} made in the review is between aerobic exercise and anaerobic. The former {{6}} such things as walking, jogging and cycling and means exercising in such a way that your body is able to use oxygen to burn fat for energy. In contrast, anaerobic exercise—such as lifting heavy weights—is of such {{7}} intensity that your body does not have time to use oxygen to create energy and so instead it breaks down glucose in your blood or muscles.\n\nBeginning first with the influence of exercise intensity on the mood benefits of aerobic exercise, the researchers, led by John Chan at Shenzhen University, found {{8}} results from 19 relevant studies. Some favoured higher intensity, others low, while seven studies found that intensity made no {{9}} to mood benefits.\n\nIn relation to the intensity of anaerobic exercise, however, the results were far clearer—the optimum for improving mood is {{10}} intensity, perhaps because low intensity is too dull while high intensity is too unpleasant.",
    "wordBank": [
      {
        "code": "A",
        "word": "constitutes",
        "pos": "v.",
        "meaning": "构成，组成（三单）"
      },
      {
        "code": "B",
        "word": "contradictory",
        "pos": "adj.",
        "meaning": "相互矛盾的"
      },
      {
        "code": "C",
        "word": "decision",
        "pos": "n.",
        "meaning": "决定"
      },
      {
        "code": "D",
        "word": "detailed",
        "pos": "adj.",
        "meaning": "详细的，详尽的"
      },
      {
        "code": "E",
        "word": "difference",
        "pos": "n.",
        "meaning": "影响，差别（make no difference）"
      },
      {
        "code": "F",
        "word": "dipping",
        "pos": "v.",
        "meaning": "浏览，深入涉猎（dip into）"
      },
      {
        "code": "G",
        "word": "distinction",
        "pos": "n.",
        "meaning": "区分，差别"
      },
      {
        "code": "H",
        "word": "falling",
        "pos": "v.",
        "meaning": "下降，落入"
      },
      {
        "code": "I",
        "word": "involves",
        "pos": "v.",
        "meaning": "包含，涉及（三单）"
      },
      {
        "code": "J",
        "word": "moderate",
        "pos": "adj.",
        "meaning": "适度的，中等的"
      },
      {
        "code": "K",
        "word": "notified",
        "pos": "v.",
        "meaning": "通知（过去分词）"
      },
      {
        "code": "L",
        "word": "partly",
        "pos": "adv.",
        "meaning": "部分地"
      },
      {
        "code": "M",
        "word": "required",
        "pos": "v.",
        "meaning": "需要，要求（过去分词）"
      },
      {
        "code": "N",
        "word": "traditionally",
        "pos": "adv.",
        "meaning": "传统上"
      },
      {
        "code": "O",
        "word": "vigorous",
        "pos": "adj.",
        "meaning": "剧烈的，高强度的"
      }
    ],
    "blanks": [
      {
        "num": 1,
        "answer": "D",
        "posHint": "adj.",
        "explain": "have ___ evidence-backed guidelines 中 guidelines 为宾语，此处填形容词 detailed 表示“详尽的指南”。"
      },
      {
        "num": 2,
        "answer": "M",
        "posHint": "v.(过去分词)",
        "explain": "作后置定语修饰 type and intensity of exercise，required for 表示“实现身体健康益处所需的”。"
      },
      {
        "num": 3,
        "answer": "L",
        "posHint": "adv.",
        "explain": "修饰表语 due to ... 填副词；partly due to 为经典因果句式，意为“部分归因于”。"
      },
      {
        "num": 4,
        "answer": "F",
        "posHint": "v.(-ing)",
        "explain": "介词 Before 后接动名词；dip into 表示“涉猎、简要探讨（核心要点）”。"
      },
      {
        "num": 5,
        "answer": "G",
        "posHint": "n.",
        "explain": "an important ___ between A and B 结构，make a distinction between 意为“区分……与……”。"
      },
      {
        "num": 6,
        "answer": "I",
        "posHint": "v.(三单)",
        "explain": "主语 The former（有氧运动）为单数，involves such things as 表示“包括走路、慢跑等”。"
      },
      {
        "num": 7,
        "answer": "O",
        "posHint": "adj.",
        "explain": "修饰 intensity，呼应举重（lifting heavy weights），vigorous intensity 表示“高强度/剧烈强度”。"
      },
      {
        "num": 8,
        "answer": "B",
        "posHint": "adj.",
        "explain": "后句说一些支持高强度、另一些支持低强度、还有七项称无影响，可见研究结果是“相互矛盾的（contradictory）”。"
      },
      {
        "num": 9,
        "answer": "E",
        "posHint": "n.",
        "explain": "make no difference to 为四级必背固定短语，意为“对……没有影响”。"
      },
      {
        "num": 10,
        "answer": "J",
        "posHint": "adj.",
        "explain": "后文解释低强度太枯燥、高强度太难受，因此最佳选择是“适度的（moderate）”强度。"
      }
    ],
    "hintSteps": [
      "优先锁定唯一形态和黄金搭配：副词仅有 L/N（{{3}} partly due to），动名词仅有 F/H（{{4}} dipping into），固定短语 {{9}} make no difference。",
      "区分两个三单动词 A(constitutes) 与 I(involves)：主语是总类（有氧运动），宾语是下属举例（walking, jogging），应选“包含（involves）”。",
      "利用后文解释反推形容词：{{8}} 后文列举三种相反结论 -> contradictory；{{10}} 排除 low 和 high -> moderate。"
    ]
  },
  {
    "id": "q_clz_05",
    "skill": "cloze",
    "type": "cloze",
    "sectionId": "t_cloze_pos",
    "difficulty": 2,
    "source": "2024.06 第2套 Section A（核心5空精练）",
    "title": "性别、权力与“抽象表达倾向”",
    "passageHtml": "A team of researchers led by Priyanka Joshi examined the degree to which men and women relied on \"communicative abstraction\" to verbally convey their ideas and emotions. Communicative abstraction, according to the researchers, reflects the tendency of people to use \"abstract speech that focuses on the broader picture and {{1}} purpose of action rather than concrete speech focusing on details and the means of {{2}} action.\" Interestingly, they found that men were far more likely to speak in the abstract than were women.\n\nTo arrive at this {{3}}, the researchers examined the linguistic patterns of men and women in over 600,000 blog posts written on websites. To do this, the researchers computed abstractness ratings for {{4}} 40,000 commonly used words in the English language. Words considered to be concrete could be easily visualized such as \"table\" or \"chair\". Words that were more {{5}} to visualize, for example, \"justice\" or \"morality\" were considered to be more abstract. They found that men used significantly more abstract language in their blog posts.",
    "wordBank": [
      {
        "code": "A",
        "word": "approximately",
        "pos": "adv.",
        "meaning": "大约，将近"
      },
      {
        "code": "B",
        "word": "attaining",
        "pos": "v.",
        "meaning": "实现，达到（动名词）"
      },
      {
        "code": "C",
        "word": "conclusion",
        "pos": "n.",
        "meaning": "结论"
      },
      {
        "code": "D",
        "word": "difficult",
        "pos": "adj.",
        "meaning": "困难的"
      },
      {
        "code": "E",
        "word": "emerges",
        "pos": "v.",
        "meaning": "出现，浮现（三单）"
      },
      {
        "code": "F",
        "word": "fixed",
        "pos": "adj.",
        "meaning": "固定的"
      },
      {
        "code": "G",
        "word": "ignored",
        "pos": "v.",
        "meaning": "忽视（过去式/分词）"
      },
      {
        "code": "H",
        "word": "legally",
        "pos": "adv.",
        "meaning": "合法地，法律上"
      },
      {
        "code": "I",
        "word": "manipulated",
        "pos": "v.",
        "meaning": "操纵，控制（过去式）"
      },
      {
        "code": "J",
        "word": "recommended",
        "pos": "v.",
        "meaning": "推荐（过去式/分词）"
      },
      {
        "code": "K",
        "word": "refraining",
        "pos": "v.",
        "meaning": "克制，戒除（动名词）"
      },
      {
        "code": "L",
        "word": "signals",
        "pos": "n./v.",
        "meaning": "信号；发信号"
      },
      {
        "code": "M",
        "word": "significantly",
        "pos": "adv.",
        "meaning": "显著地"
      },
      {
        "code": "N",
        "word": "source",
        "pos": "n.",
        "meaning": "来源，根源"
      },
      {
        "code": "O",
        "word": "ultimate",
        "pos": "adj.",
        "meaning": "最终的，终极的"
      }
    ],
    "blanks": [
      {
        "num": 1,
        "answer": "O",
        "posHint": "adj.",
        "explain": "与 broader picture 并列修饰 purpose，ultimate purpose 意为“最终目的”，与后文具体细节形成对比。"
      },
      {
        "num": 2,
        "answer": "B",
        "posHint": "v.(-ing)",
        "explain": "介词 of 后接动名词；the means of attaining action 意为“实现行动的方式/手段”，排除不及物词 refraining。"
      },
      {
        "num": 3,
        "answer": "C",
        "posHint": "n.",
        "explain": "arrive at a conclusion 为四级经典动宾搭配，指“得出这一结论”，回指上段末尾的研究发现。"
      },
      {
        "num": 4,
        "answer": "A",
        "posHint": "adv.",
        "explain": "位于数字 40,000 前修饰数量，approximately 意为“大约 4 万个常用词”。"
      },
      {
        "num": 5,
        "answer": "D",
        "posHint": "adj.",
        "explain": "与前句 easily visualized 形成反义对照，more difficult to visualize 表示“更难在脑中具象化的词”。"
      }
    ],
    "hintSteps": [
      "五个空分别对应“形、动名、名、副、形”，先用语法槽位把每空候选词压缩到 2 个以内。",
      "抓两处硬搭配：{{3}} arrive at this ___（得出结论 -> C），{{4}} ___ 40,000（修饰约数 -> A）。",
      "抓反义照应：前句说具体词 easily visualized，本句抽象词就是 more ___ to visualize（difficult -> D）。"
    ]
  },
  {
    "id": "q_clz_06",
    "skill": "cloze",
    "type": "cloze",
    "sectionId": "t_cloze_context",
    "difficulty": 2,
    "source": "2024.06 第3套 Section A（核心5空精练）",
    "title": "被机器人取代与被同事取代：心理冲击为何不同？",
    "passageHtml": "Over the coming decades, millions of jobs will be threatened by robotics and artificial intelligence. Despite intensive academic {{1}} on these developments, there has been little study on how workers {{2}} to being replaced through technology.\n\nTo find out, business researchers at TUM and Erasmus University Rotterdam conducted 11 studies and surveys with over 2,000 persons from several countries.\n\nThe findings show: in principle, most people view it more {{3}} when workers are replaced by other people than by robots or intelligent software. This preference {{4}}, however, when it refers to people's own jobs. When that is the case, the majority of workers find it less upsetting to see their own jobs go to robots than to other employees. In the long term, however, the same people see machines as more threatening to their future role in the workforce.\n\nThe researchers were able to identify the causes behind these {{5}} paradoxical results, too: People tend to compare themselves less with machines than with other people. Consequently, being replaced by a robot or software poses less of a threat to their feeling of self-worth.",
    "wordBank": [
      {
        "code": "A",
        "word": "compare",
        "pos": "v.",
        "meaning": "比较"
      },
      {
        "code": "B",
        "word": "contradicts",
        "pos": "v.",
        "meaning": "反驳，与……矛盾（三单）"
      },
      {
        "code": "C",
        "word": "conventional",
        "pos": "adj.",
        "meaning": "传统的，常规的"
      },
      {
        "code": "D",
        "word": "debate",
        "pos": "n./v.",
        "meaning": "争论，讨论"
      },
      {
        "code": "E",
        "word": "disruptions",
        "pos": "n.",
        "meaning": "混乱，中断（复数）"
      },
      {
        "code": "F",
        "word": "drastically",
        "pos": "adv.",
        "meaning": "急剧地，彻底地"
      },
      {
        "code": "G",
        "word": "favorably",
        "pos": "adv.",
        "meaning": "赞许地，有利地"
      },
      {
        "code": "H",
        "word": "guarantee",
        "pos": "v./n.",
        "meaning": "保证"
      },
      {
        "code": "I",
        "word": "introduction",
        "pos": "n.",
        "meaning": "引入，采用"
      },
      {
        "code": "J",
        "word": "modifications",
        "pos": "n.",
        "meaning": "修改，改进"
      },
      {
        "code": "K",
        "word": "poses",
        "pos": "v.",
        "meaning": "构成，造成（三单）"
      },
      {
        "code": "L",
        "word": "psychological",
        "pos": "adj.",
        "meaning": "心理的"
      },
      {
        "code": "M",
        "word": "react",
        "pos": "v.",
        "meaning": "作出反应（react to）"
      },
      {
        "code": "N",
        "word": "reverses",
        "pos": "v.",
        "meaning": "逆转，颠倒（三单）"
      },
      {
        "code": "O",
        "word": "seemingly",
        "pos": "adv.",
        "meaning": "表面上，看似"
      }
    ],
    "blanks": [
      {
        "num": 1,
        "answer": "D",
        "posHint": "n.",
        "explain": "Despite intensive academic ___ on ... 缺单数或不可数名词，debate on 表示“关于……的学术讨论”。"
      },
      {
        "num": 2,
        "answer": "M",
        "posHint": "v.(原形)",
        "explain": "how workers ___ to ... 中与介词 to 构成固定搭配 react to（对……作出反应）。"
      },
      {
        "num": 3,
        "answer": "G",
        "posHint": "adv.",
        "explain": "修饰动词 view 填副词；view it more favorably 表示“更认可/更赞同（由人替代而非机器替代）”，与下句 This preference 呼应。"
      },
      {
        "num": 4,
        "answer": "N",
        "posHint": "v.(三单)",
        "explain": "单数主语 This preference 后缺不及物三单动词；后文说轮到自己时更愿被机器取代，说明偏好“逆转了（reverses）”。"
      },
      {
        "num": 5,
        "answer": "O",
        "posHint": "adv.",
        "explain": "修饰形容词 paradoxical 填副词；seemingly paradoxical results 意为“看似自相矛盾的结果”。"
      }
    ],
    "hintSteps": [
      "先抓介词搭配：{{1}} academic ___ on（debate on -> D），{{2}} workers ___ to（react to -> M）。",
      "抓上下文语义翻转：{{3}} 被后句称为 This preference（偏好），说明前面是正向看待（favorably -> G）；{{4}} 遇转折词 however 且前后态度完全颠倒，选不及物动词 reverses（排除需接宾语的 contradicts）。",
      "{{5}} 修饰 paradoxical（矛盾的），后文马上解释其实背后有合理解因，所以只是“表面上看似（seemingly -> O）”矛盾。"
    ]
  },
  {
    "id": "q_clz_07",
    "skill": "cloze",
    "type": "cloze",
    "sectionId": "t_cloze_pos",
    "difficulty": 1,
    "source": "2018.06 第1套 Section A（核心5空精练）",
    "title": "曼彻斯特太阳能摩天大楼翻新工程",
    "passageHtml": "An office tower on Miller Street in Manchester is completely covered in solar panels. They are used to create some of the energy used by the insurance company inside. When the tower was first {{1}} in 1962, it was covered with thin square stones. These small square stones became a problem for the building and continued to fall off the face for 40 years until a major renovation was {{2}}. During this renovation the building's owners, CIS, {{3}} the solar panel company, Solarcentury. They agreed to cover the entire building in solar panels. In 2004, the completed CIS tower became Europe's largest {{4}} of vertical solar panels. A vertical solar project on such a large {{5}} has never been repeated since.\n\nCovering a skyscraper with solar panels had never been done before, and the CIS tower was chosen as one of the \"10 best green energy projects\".",
    "wordBank": [
      {
        "code": "A",
        "word": "cheaper",
        "pos": "adj.",
        "meaning": "更便宜的"
      },
      {
        "code": "B",
        "word": "cleaner",
        "pos": "adj.",
        "meaning": "更清洁的"
      },
      {
        "code": "C",
        "word": "collection",
        "pos": "n.",
        "meaning": "集合，组群"
      },
      {
        "code": "D",
        "word": "competed",
        "pos": "v.",
        "meaning": "竞争（过去式）"
      },
      {
        "code": "E",
        "word": "constructed",
        "pos": "v.",
        "meaning": "建造（过去分词）"
      },
      {
        "code": "F",
        "word": "consulted",
        "pos": "v.",
        "meaning": "咨询，商议（过去式）"
      },
      {
        "code": "G",
        "word": "dimension",
        "pos": "n.",
        "meaning": "维度，方面"
      },
      {
        "code": "H",
        "word": "discovered",
        "pos": "v.",
        "meaning": "发现（过去式/分词）"
      },
      {
        "code": "I",
        "word": "eventually",
        "pos": "adv.",
        "meaning": "最终"
      },
      {
        "code": "J",
        "word": "height",
        "pos": "n.",
        "meaning": "高度"
      },
      {
        "code": "K",
        "word": "necessarily",
        "pos": "adv.",
        "meaning": "必然地"
      },
      {
        "code": "L",
        "word": "production",
        "pos": "n.",
        "meaning": "生产，制造"
      },
      {
        "code": "M",
        "word": "range",
        "pos": "n./v.",
        "meaning": "范围；涉及"
      },
      {
        "code": "N",
        "word": "scale",
        "pos": "n./v.",
        "meaning": "规模；攀登"
      },
      {
        "code": "O",
        "word": "undertaken",
        "pos": "v.",
        "meaning": "着手进行，开展（过去分词）"
      }
    ],
    "blanks": [
      {
        "num": 1,
        "answer": "E",
        "posHint": "v.(过去分词)",
        "explain": "was first ___ in 1962 构成一般过去时被动语态，大楼在 1962 年首次“建成（constructed）”。"
      },
      {
        "num": 2,
        "answer": "O",
        "posHint": "v.(过去分词)",
        "explain": "a major renovation was ___ 构成被动语态，undertake a renovation 为常见工程搭配，意为“开展翻新”。"
      },
      {
        "num": 3,
        "answer": "F",
        "posHint": "v.(过去式)",
        "explain": "主语 CIS 与宾语 the solar panel company 之间缺及物动词过去式，下句达成一致说明此前“咨询/商议（consulted）”了对方。"
      },
      {
        "num": 4,
        "answer": "C",
        "posHint": "n.",
        "explain": "Europe's largest ___ of vertical solar panels 填名词，collection 指整栋大楼垂直太阳能板的“集合群”。"
      },
      {
        "num": 5,
        "answer": "N",
        "posHint": "n.",
        "explain": "on such a large scale 为固定介词短语，意为“如此大规模的”。"
      }
    ],
    "hintSteps": [
      "前三个空全在动词过去式/过去分词池（D/E/F/H/O）中筛选：{{1}} 建楼（constructed），{{2}} 开展翻新（undertaken），{{3}} 与公司商议（consulted）。",
      "秒杀第 5 空固定搭配：on a large scale（大规模地）-> N。",
      "第 4 空辨析名词：大楼外墙贴满太阳能板，既非“生产（production）”也非“高度（height）”，选表集合体的 collection（C）。"
    ]
  },
  {
    "id": "q_clz_08",
    "skill": "cloze",
    "type": "cloze",
    "sectionId": "t_cloze_context",
    "difficulty": 2,
    "source": "2018.06 第2套 Section A（核心5空精练）",
    "title": "加州空气污染实时地图与谷歌街景合作",
    "passageHtml": "Since the 1940s, southern California has had a reputation for smog. Los Angeles is still the worst city in the United States for levels of pollutants, nor is the state's bad air restricted to its south. Residents' hearts and lungs are affected as a consequence. All of which, combined with California's reputation as the home of technological innovation, makes the place ideal for developing systems designed to monitor pollution in detail.\n\nAnd that is just what Aclima, a new firm in San Francisco, has been doing over the past few months. It has been trying out monitoring stations that are {{1}} to yield minute-to-minute maps of {{2}} air pollution. Such stations will also be able to keep an eye on what is happening inside buildings, including offices.\n\nTo this end, Aclima has been {{3}} with Google's Street View system. Davida Herzl, Aclima's boss, says they have revealed pollution highs on days when San Francisco's transit workers went on strike and the city's {{4}} were forced to use their cars. Conversely, \"cycle to work\" days have done their job by {{5}} pollution lows.",
    "wordBank": [
      {
        "code": "A",
        "word": "assisted",
        "pos": "v.",
        "meaning": "协助（过去式/分词）"
      },
      {
        "code": "B",
        "word": "collaborating",
        "pos": "v.",
        "meaning": "合作（现在分词）"
      },
      {
        "code": "C",
        "word": "consequence",
        "pos": "n.",
        "meaning": "后果，结果"
      },
      {
        "code": "D",
        "word": "consumers",
        "pos": "n.",
        "meaning": "消费者（复数）"
      },
      {
        "code": "E",
        "word": "creating",
        "pos": "v.",
        "meaning": "创造，带来（动名词）"
      },
      {
        "code": "F",
        "word": "detail",
        "pos": "n.",
        "meaning": "细节"
      },
      {
        "code": "G",
        "word": "domestic",
        "pos": "adj.",
        "meaning": "国内的，家庭的"
      },
      {
        "code": "H",
        "word": "frequently",
        "pos": "adv.",
        "meaning": "频繁地"
      },
      {
        "code": "I",
        "word": "inhabitants",
        "pos": "n.",
        "meaning": "居民（复数）"
      },
      {
        "code": "J",
        "word": "innovation",
        "pos": "n.",
        "meaning": "创新"
      },
      {
        "code": "K",
        "word": "intended",
        "pos": "v.",
        "meaning": "打算，旨在（过去分词）"
      },
      {
        "code": "L",
        "word": "outdoor",
        "pos": "adj.",
        "meaning": "室外的，户外的"
      },
      {
        "code": "M",
        "word": "pollutants",
        "pos": "n.",
        "meaning": "污染物（复数）"
      },
      {
        "code": "N",
        "word": "restricted",
        "pos": "v./adj.",
        "meaning": "受限的，局限于"
      },
      {
        "code": "O",
        "word": "sum",
        "pos": "n.",
        "meaning": "总和，金额"
      }
    ],
    "blanks": [
      {
        "num": 1,
        "answer": "K",
        "posHint": "v.(过去分词)",
        "explain": "are ___ to yield 构成 be intended to do 固定结构，表示监测站“旨在/用来”生成实时空气污染地图。"
      },
      {
        "num": 2,
        "answer": "L",
        "posHint": "adj.",
        "explain": "修饰 air pollution；紧接下句说 also ... inside buildings（室内），反推本空为“室外的（outdoor）”。"
      },
      {
        "num": 3,
        "answer": "B",
        "posHint": "v.(-ing)",
        "explain": "has been ___ with ... 为现在完成进行时，collaborate with 为固定搭配，意为“与……合作”。"
      },
      {
        "num": 4,
        "answer": "I",
        "posHint": "n.(复数)",
        "explain": "the city's ___ were forced 缺复数人称名词；公交罢工迫使全市“居民（inhabitants）”开车，而非仅限 consumers。"
      },
      {
        "num": 5,
        "answer": "E",
        "posHint": "v.(-ing)",
        "explain": "介词 by 后接及物动名词；by creating pollution lows 意为“通过带来/创造污染低值”。"
      }
    ],
    "hintSteps": [
      "利用后句线索秒解 {{2}}：下句出现 also ... inside buildings（还能监测室内），可见前句讲的是室外（outdoor -> L）。",
      "抓介词固定搭配：{{1}} are intended to（旨在 -> K），{{3}} collaborating with（与……合作 -> B）。",
      "最后两空按词性+语境定夺：{{4}} the city's 后接复数指人名词，公交罢工影响全体居民（inhabitants -> I）；{{5}} by 后接及物动名词 creating（E）。"
    ]
  },
  {
    "id": "q_clz_09",
    "skill": "cloze",
    "type": "cloze",
    "sectionId": "t_cloze_pos",
    "difficulty": 2,
    "source": "2017.12 第1套 Section A（核心5空精练）",
    "title": "鸽子与老鼠如何协助人类筛查疾病",
    "passageHtml": "A rat or pigeon might not be the obvious choice to tend to someone who is sick, but these creatures have some {{1}} skills that could help the treatment of human diseases.\n\nPigeons are often seen as dirty birds and an urban {{2}}, but they are just the latest in a long line of animals that have been found to have abilities to help humans. Despite having a brain no bigger than the {{3}} of your index finger, pigeons have a very impressive {{4}} memory. Recently it was shown that they could be trained to be as accurate as humans at detecting breast cancer in images.\n\nRats are often {{5}} with spreading disease rather than preventing it, but this long-tailed animal is highly sensitive. Inside a rat's nose are up to 1,000 different types of olfactory receptors, giving rats the ability to detect slight smells and screen for TB samples far faster than lab technicians.",
    "wordBank": [
      {
        "code": "A",
        "word": "associated",
        "pos": "v.",
        "meaning": "联系，关联（be associated with）"
      },
      {
        "code": "B",
        "word": "examine",
        "pos": "v.",
        "meaning": "检查，检测"
      },
      {
        "code": "C",
        "word": "indicate",
        "pos": "v.",
        "meaning": "表明，指示"
      },
      {
        "code": "D",
        "word": "nuisance",
        "pos": "n.",
        "meaning": "讨厌的事物，公害"
      },
      {
        "code": "E",
        "word": "peak",
        "pos": "n.",
        "meaning": "顶峰，山峰"
      },
      {
        "code": "F",
        "word": "preventing",
        "pos": "v.",
        "meaning": "预防，阻止（动名词）"
      },
      {
        "code": "G",
        "word": "prohibiting",
        "pos": "v.",
        "meaning": "禁止（动名词）"
      },
      {
        "code": "H",
        "word": "sensitive",
        "pos": "adj.",
        "meaning": "敏感的，灵敏的"
      },
      {
        "code": "I",
        "word": "slight",
        "pos": "adj.",
        "meaning": "轻微的，细微的"
      },
      {
        "code": "J",
        "word": "specify",
        "pos": "v.",
        "meaning": "具体说明"
      },
      {
        "code": "K",
        "word": "superior",
        "pos": "adj.",
        "meaning": "卓越的，出众的"
      },
      {
        "code": "L",
        "word": "suspicious",
        "pos": "adj.",
        "meaning": "怀疑的，可疑的"
      },
      {
        "code": "M",
        "word": "tip",
        "pos": "n.",
        "meaning": "尖端，末梢"
      },
      {
        "code": "N",
        "word": "treated",
        "pos": "v.",
        "meaning": "对待，治疗（过去分词）"
      },
      {
        "code": "O",
        "word": "visual",
        "pos": "adj.",
        "meaning": "视觉的"
      }
    ],
    "blanks": [
      {
        "num": 1,
        "answer": "K",
        "posHint": "adj.",
        "explain": "转折词 but 后需要褒义形容词修饰 skills，表示这些生物具备“出众的（superior）”技能。"
      },
      {
        "num": 2,
        "answer": "D",
        "posHint": "n.",
        "explain": "与 dirty birds 由 and 并列且受冠词 an 与形容词 urban 修饰，需贬义单数名词 nuisance（城市公害）。"
      },
      {
        "num": 3,
        "answer": "M",
        "posHint": "n.",
        "explain": "the ___ of your index finger 构成常见人体部位搭配，the tip of your index finger 指“食指尖”。"
      },
      {
        "num": 4,
        "answer": "O",
        "posHint": "adj.",
        "explain": "下句紧接 detecting breast cancer in images（从医学影像中识别乳腺癌），对应“视觉（visual）”记忆。"
      },
      {
        "num": 5,
        "answer": "A",
        "posHint": "v.(过去分词)",
        "explain": "are often ___ with 构成高频固定搭配 be associated with（与……联系在一起）。"
      }
    ],
    "hintSteps": [
      "利用高频固定搭配先锁定两空：{{3}} the tip of your index finger（M），{{5}} be associated with（A）。",
      "抓感情色彩判断褒贬：{{1}} 在 but 后应为褒义形容词（superior -> K）；{{2}} 与 dirty birds 并列应为贬义名词（nuisance -> D）。",
      "{{4}} 结合下句关键词 images（图像）直接呼应视觉记忆（visual -> O）。"
    ]
  },
  {
    "id": "q_clz_10",
    "skill": "cloze",
    "type": "cloze",
    "sectionId": "t_cloze_context",
    "difficulty": 1,
    "source": "2017.12 第2套 Section A（核心5空精练）",
    "title": "20世纪90年代互联网的商业化浪潮",
    "passageHtml": "Technological changes brought dramatic new options to Americans living in the 1990s. The driving force behind much of this change was an innovation popularly known as the Internet, which was developed during the 1970s by the Department of Defense and remained under government control until 1984. Later, fiber-optic cables and faster microprocessors allowed personal computers to process incoming signals at a far more rapid rate.\n\nIn the early 1990s, the World Wide Web was developed, in large part, for {{1}} purposes. Corporations created home pages where they could place text and graphics to sell products. Soon airline tickets, hotel {{2}}, and even cars and homes could be purchased online. Universities {{3}} research data on the Internet, so students could find {{4}} information without leaving their dormitories. Companies soon discovered that work could be done at home and {{5}} online, so a whole new class of telecommuters began to earn a living from home offices.",
    "wordBank": [
      {
        "code": "A",
        "word": "advantage",
        "pos": "n.",
        "meaning": "优势，好处"
      },
      {
        "code": "B",
        "word": "commercial",
        "pos": "adj.",
        "meaning": "商业的"
      },
      {
        "code": "C",
        "word": "conservation",
        "pos": "n.",
        "meaning": "保护，节约"
      },
      {
        "code": "D",
        "word": "equipped",
        "pos": "v.",
        "meaning": "配备，装备（过去分词）"
      },
      {
        "code": "E",
        "word": "incoming",
        "pos": "adj.",
        "meaning": "进来的，传入的"
      },
      {
        "code": "F",
        "word": "innovation",
        "pos": "n.",
        "meaning": "创新，新事物"
      },
      {
        "code": "G",
        "word": "limited",
        "pos": "adj.",
        "meaning": "有限的"
      },
      {
        "code": "H",
        "word": "local",
        "pos": "adj.",
        "meaning": "当地的"
      },
      {
        "code": "I",
        "word": "maintained",
        "pos": "v.",
        "meaning": "维持，保养（过去式/分词）"
      },
      {
        "code": "J",
        "word": "occupations",
        "pos": "n.",
        "meaning": "职业（复数）"
      },
      {
        "code": "K",
        "word": "posted",
        "pos": "v.",
        "meaning": "发布，张贴（过去式）"
      },
      {
        "code": "L",
        "word": "remained",
        "pos": "v.",
        "meaning": "依然，保持（过去式）"
      },
      {
        "code": "M",
        "word": "reservations",
        "pos": "n.",
        "meaning": "预订（复数）"
      },
      {
        "code": "N",
        "word": "submitted",
        "pos": "v.",
        "meaning": "提交，呈递（过去分词）"
      },
      {
        "code": "O",
        "word": "valuable",
        "pos": "adj.",
        "meaning": "有价值的"
      }
    ],
    "blanks": [
      {
        "num": 1,
        "answer": "B",
        "posHint": "adj.",
        "explain": "下句紧接企业建主页卖商品（Corporations ... sell products），说明万维网开发很大程度上出于“商业（commercial）”目的。"
      },
      {
        "num": 2,
        "answer": "M",
        "posHint": "n.(复数)",
        "explain": "与 airline tickets、cars and homes 并列，hotel reservations 为地道生活搭配，意为“酒店预订”。"
      },
      {
        "num": 3,
        "answer": "K",
        "posHint": "v.(过去式)",
        "explain": "主语 Universities 后缺及物动词过去式，post research data on the Internet 意为“在网上发布研究数据”。"
      },
      {
        "num": 4,
        "answer": "O",
        "posHint": "adj.",
        "explain": "修饰不可数名词 information，表示学生足不出户就能查到“有价值的（valuable）”信息。"
      },
      {
        "num": 5,
        "answer": "N",
        "posHint": "v.(过去分词)",
        "explain": "与 done at home 由 and 并列构成被动语态 could be done ... and submitted online，意为“在线提交”。"
      }
    ],
    "hintSteps": [
      "利用并列结构和日常搭配瞬间突破前两空：{{1}} 呼应后句 sell products -> commercial（B）；{{2}} hotel ___ 与 airline tickets 并列 -> reservations（M）。",
      "抓网络高频动词搭配：{{3}} 把数据“发布（posted -> K）”到网上，{{5}} 在家完成并在线“提交（submitted -> N）”工作。",
      "{{4}} 修饰 information 的正向形容词在词库中唯一契合语境的是 valuable（O）。"
    ]
  },
  {
    "id": "q_mat_01",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_scan",
    "difficulty": 1,
    "source": "2026.06 第1套 Section B Q38",
    "title": "新西兰大屏障岛：垂钓胜地扫读定位",
    "passageTitle": "The Star Quality of New Zealand's Great Barrier Island",
    "paragraphs": [
      {
        "label": "A",
        "text": "I was glad I had such terrible jetlag. Wide awake at 3:30 am with our nine-year-old daughter on our lodge balcony, I stared for hours at the most incredible night sky I've ever seen before the dawn slowly started to rub out the stars on the horizon and the multiple shooting stars faded away.",
        "highlightTerms": [
          "jetlag",
          "incredible night sky"
        ]
      },
      {
        "label": "B",
        "text": "We were going to my wife's big family reunion in Auckland, New Zealand, but when we found out that Great Barrier Island, just off the coast, had been recently awarded Dark Sky Sanctuary status—a typically remote area that has an 'exceptional or distinguished quality of starry nights'—we thought it would be the perfect place to relax before our busy schedule. It's the first island and only the fourth location in the world to achieve this status.",
        "highlightTerms": [
          "Dark Sky Sanctuary status",
          "starry nights"
        ]
      },
      {
        "label": "C",
        "text": "After a 28-hour flight with two travel-sick children, our hearts sank when we saw the tiny twin-engine 10-seater that was to take us the 90 km across the Hauraki Gulf to Great Barrier Island. But we needn't have worried. Whether it was the gravity force of the plane climbing or the noise of the engine, it put our three-year-old daughter instantly to sleep until we bumped down on the grass at Claris Airport.",
        "highlightTerms": [
          "instantly to sleep",
          "Claris Airport"
        ]
      },
      {
        "label": "D",
        "text": "Great Barrier Island has no public facilities and the 950 people living there (though only about half permanently) rely on solar and wind energy, and bottled gas for cooking. There are no streetlights. There are no cash machines or banks. The police force comprises a husband and wife, and there's one postman. It's not just the lack of light but the lack of noise that's so delightful on this unique and gorgeous scene.",
        "highlightTerms": [
          "solar and wind energy",
          "no streetlights"
        ]
      },
      {
        "label": "E",
        "text": "The climate here is subtropical like Auckland's. The island boasts a beautiful wilderness with dense forests, glorious, unspoilt sandy beaches and plenty of bays and a few mountainous areas where there are good walking tracks among the wetlands and valleys. You can birdwatch, dive, surf and boat. The best beaches are on the eastern side of the island where the surf is better, too. The sheltered western side is where you'll find the best diving and boating. Lots of people come here for the fantastic fishing spots around the island. Like a lot of spots in New Zealand, there are whale-watching trips and you might just catch sight of sharks.",
        "highlightTerms": [
          "Lots of people come here",
          "fantastic fishing spots around the island"
        ]
      },
      {
        "label": "F",
        "text": "It's rare to find an island that really does feel undiscovered—but this is it. When one of my wife's relations, who comes here regularly, found out that we'd been there, he whispered to us, only half-joking: 'Shh—don't tell anyone!' The locals are a relaxed and friendly bunch—a lot of them told us that it's like what Waiheke Island (now in effect a suburb of Auckland) was in the 1970s when it was a commune of artists and people wanting to escape the city.",
        "highlightTerms": [
          "Waiheke Island",
          "escape the city"
        ]
      },
      {
        "label": "G",
        "text": "Our guide for some of our stay was the inestimable Hilde Hoven, a Dark Sky ambassador who runs Good Heavens with Deborah Kilgallon and Orla Cumisky. They bring their Dobsonian telescope and beanbags and, our elder daughter was glad to hear, hot chocolate to wherever you are on the island. 'It's odd but when the light readings were done,' said Hilde, explaining how the island was awarded its special status, 'they found there was more light pollution on the northern side coming from Fiji, which is about 3,000 km away, than Auckland to the south. It's pretty dark!'",
        "highlightTerms": [
          "It's odd",
          "more light pollution on the northern side",
          "Fiji, which is about 3,000 km away"
        ]
      }
    ],
    "statement": "Many people are attracted to Great Barrier Island because of the incredible fishing sites around it.",
    "answer": "E",
    "anchorKeywords": [
      "fishing sites",
      "around it",
      "Many people"
    ],
    "hintSteps": [
      "长篇阅读先圈独特名词定位词：Great Barrier Island 全篇高频不能当定位词，核心低频锚点是 fishing sites。",
      "自上而下快速扫读 A–G 段，寻找 fishing 或与户外水上活动（surf / dive / boat）相关的自然段落。",
      "在 E 段后半句锁定 Lots of people come here for the fantastic fishing spots around the island，核对同义替换即可作答。"
    ]
  },
  {
    "id": "q_mat_02",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_para",
    "difficulty": 2,
    "source": "2026.06 第1套 Section B Q45",
    "title": "新西兰大屏障岛：北方光污染来源同义匹配",
    "passageTitle": "The Star Quality of New Zealand's Great Barrier Island",
    "paragraphs": [
      {
        "label": "A",
        "text": "I was glad I had such terrible jetlag. Wide awake at 3:30 am with our nine-year-old daughter on our lodge balcony, I stared for hours at the most incredible night sky I've ever seen before the dawn slowly started to rub out the stars on the horizon and the multiple shooting stars faded away.",
        "highlightTerms": [
          "jetlag",
          "incredible night sky"
        ]
      },
      {
        "label": "B",
        "text": "We were going to my wife's big family reunion in Auckland, New Zealand, but when we found out that Great Barrier Island, just off the coast, had been recently awarded Dark Sky Sanctuary status—a typically remote area that has an 'exceptional or distinguished quality of starry nights'—we thought it would be the perfect place to relax before our busy schedule. It's the first island and only the fourth location in the world to achieve this status.",
        "highlightTerms": [
          "Dark Sky Sanctuary status",
          "starry nights"
        ]
      },
      {
        "label": "C",
        "text": "After a 28-hour flight with two travel-sick children, our hearts sank when we saw the tiny twin-engine 10-seater that was to take us the 90 km across the Hauraki Gulf to Great Barrier Island. But we needn't have worried. Whether it was the gravity force of the plane climbing or the noise of the engine, it put our three-year-old daughter instantly to sleep until we bumped down on the grass at Claris Airport.",
        "highlightTerms": [
          "instantly to sleep",
          "Claris Airport"
        ]
      },
      {
        "label": "D",
        "text": "Great Barrier Island has no public facilities and the 950 people living there (though only about half permanently) rely on solar and wind energy, and bottled gas for cooking. There are no streetlights. There are no cash machines or banks. The police force comprises a husband and wife, and there's one postman. It's not just the lack of light but the lack of noise that's so delightful on this unique and gorgeous scene.",
        "highlightTerms": [
          "solar and wind energy",
          "no streetlights"
        ]
      },
      {
        "label": "E",
        "text": "The climate here is subtropical like Auckland's. The island boasts a beautiful wilderness with dense forests, glorious, unspoilt sandy beaches and plenty of bays and a few mountainous areas where there are good walking tracks among the wetlands and valleys. You can birdwatch, dive, surf and boat. The best beaches are on the eastern side of the island where the surf is better, too. The sheltered western side is where you'll find the best diving and boating. Lots of people come here for the fantastic fishing spots around the island. Like a lot of spots in New Zealand, there are whale-watching trips and you might just catch sight of sharks.",
        "highlightTerms": [
          "Lots of people come here",
          "fantastic fishing spots around the island"
        ]
      },
      {
        "label": "F",
        "text": "It's rare to find an island that really does feel undiscovered—but this is it. When one of my wife's relations, who comes here regularly, found out that we'd been there, he whispered to us, only half-joking: 'Shh—don't tell anyone!' The locals are a relaxed and friendly bunch—a lot of them told us that it's like what Waiheke Island (now in effect a suburb of Auckland) was in the 1970s when it was a commune of artists and people wanting to escape the city.",
        "highlightTerms": [
          "Waiheke Island",
          "escape the city"
        ]
      },
      {
        "label": "G",
        "text": "Our guide for some of our stay was the inestimable Hilde Hoven, a Dark Sky ambassador who runs Good Heavens with Deborah Kilgallon and Orla Cumisky. They bring their Dobsonian telescope and beanbags and, our elder daughter was glad to hear, hot chocolate to wherever you are on the island. 'It's odd but when the light readings were done,' said Hilde, explaining how the island was awarded its special status, 'they found there was more light pollution on the northern side coming from Fiji, which is about 3,000 km away, than Auckland to the south. It's pretty dark!'",
        "highlightTerms": [
          "It's odd",
          "more light pollution on the northern side",
          "Fiji, which is about 3,000 km away"
        ]
      }
    ],
    "statement": "It is strange that light pollution on Great Barrier Island mainly comes from a faraway island to the north.",
    "answer": "G",
    "anchorKeywords": [
      "strange",
      "light pollution",
      "faraway island to the north"
    ],
    "hintSteps": [
      "提取三个高辨识度定位词：strange（奇怪的）、light pollution（光污染）、to the north（北方）。",
      "不要被 D 段的 lack of light 误导，继续往后扫读寻找专门讨论光污染测量（light readings）的段落。",
      "在 G 段末尾锁定 It's odd ... more light pollution on the northern side coming from Fiji, which is about 3,000 km away。"
    ]
  },
  {
    "id": "q_mat_03",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_scan",
    "difficulty": 1,
    "source": "2026.06 第2套 Section B Q41",
    "title": "运动与失智症：失智症的医学定义定位",
    "passageTitle": "Exercise and Dementia",
    "paragraphs": [
      {
        "label": "A",
        "text": "If this doesn't encourage you to squeeze in a workout today, nothing will: a new study from Sweden shows that women who were highly fit in mid-life were nearly 90% less likely to get dementia decades later.",
        "highlightTerms": [
          "squeeze in a workout",
          "women who were highly fit in mid-life"
        ]
      },
      {
        "label": "B",
        "text": "After initial exercise tests in middle age, researchers followed the women for 44 years. Both groups lived just as long, but those who could ride an exercise bike at a fast rate for 6 minutes in the initial test had a much lower risk of dementia later on than those who couldn't complete the workout.",
        "highlightTerms": [
          "44 years",
          "exercise bike"
        ]
      },
      {
        "label": "C",
        "text": "The study, published Wednesday in the journal Neurology, couldn't prove that exercise prevented dementia, and the findings aren't a surprise—it's long been known there's a correlation between exercise and decreased dementia risk—but the results were particularly dramatic. Overall, women who were highly fit compared to those who were moderately fit decreased their risk of dementia by 88%.",
        "highlightTerms": [
          "correlation between exercise and decreased dementia risk",
          "88%"
        ]
      },
      {
        "label": "D",
        "text": "'I'm very surprised that the finding was so strong,' said Ingmar Skoog, the paper's senior author and a psychiatry professor at The University of Gothenburg in Sweden. 'It really shows the importance of exercise.'",
        "highlightTerms": [
          "Ingmar Skoog",
          "importance of exercise"
        ]
      },
      {
        "label": "E",
        "text": "Dementia, as defined in medical dictionaries, is a broad term that describes a loss of thinking ability, memory, attention, logical reasoning, and other mental abilities. These changes are severe enough to interfere with social or occupational functioning. Dementia isn't a disease. Instead, it's a group of symptoms caused by other conditions. It happens when the parts of your brain used for learning, memory, decision making, and language are damaged or diseased. About 5%-8% of adults over age 65 have some form of dementia.",
        "highlightTerms": [
          "loss of thinking ability, memory, attention, logical reasoning, and other mental abilities"
        ]
      },
      {
        "label": "F",
        "text": "Dementia is not temporary confusion or forgetfulness that might result from an infection that heals without treatment. It can also come from an underlying illness or side effects of medications. Dementia typically gets worse over time. People with dementia have problems with thinking and remembering that affect their ability to manage their daily life.",
        "highlightTerms": [
          "typically gets worse over time"
        ]
      },
      {
        "label": "G",
        "text": "Dementia is typically associated with declines in cognitive function. Yet researchers have found an association between dementia and declines in hearing and other basic sensory functions.",
        "highlightTerms": [
          "cognitive function",
          "hearing"
        ]
      },
      {
        "label": "H",
        "text": "Though the study mentioned above was fairly small (only 191 women took the initial fitness test, which means it's hard to maintain statistical significance while breaking the group down into sub-categories of more or less fit), it does give us hope that dementia can be prevented or delayed through exercise in one's middle age.",
        "highlightTerms": [
          "give us hope",
          "prevented or delayed",
          "exercise in one's middle age"
        ]
      },
      {
        "label": "I",
        "text": "Alzheimer's and other dementias are believed to begin 15-20 years before symptoms even appear, so it makes sense that exercising in mid-life would affect the risk, Skoog said. And the same activities that help prevent Alzheimer's—including avoiding smoking, getting adequate exercise and sleep and eating a healthy diet—also prevent heart disease, he said, making them even more worthwhile.",
        "highlightTerms": [
          "15-20 years",
          "also prevent heart disease"
        ]
      }
    ],
    "statement": "Dementia refers to a loss of multiple mental abilities such as memory and logical reasoning.",
    "answer": "E",
    "anchorKeywords": [
      "loss of",
      "mental abilities",
      "memory",
      "logical reasoning"
    ],
    "hintSteps": [
      "题干以 Dementia refers to 开头，明显考查医学定义，重点锁定具体并列名词 logical reasoning 与 mental abilities。",
      "快速略过前四段瑞典实验数据，直接定位首次给 Dementia 下词典定义的段落。",
      "在 E 段首句一眼看到 as defined in medical dictionaries ... a loss of thinking ability, memory, attention, logical reasoning, and other mental abilities。"
    ]
  },
  {
    "id": "q_mat_04",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_para",
    "difficulty": 2,
    "source": "2026.06 第2套 Section B Q39",
    "title": "运动与失智症：中年锻炼延缓失智的希望",
    "passageTitle": "Exercise and Dementia",
    "paragraphs": [
      {
        "label": "A",
        "text": "If this doesn't encourage you to squeeze in a workout today, nothing will: a new study from Sweden shows that women who were highly fit in mid-life were nearly 90% less likely to get dementia decades later.",
        "highlightTerms": [
          "squeeze in a workout",
          "women who were highly fit in mid-life"
        ]
      },
      {
        "label": "B",
        "text": "After initial exercise tests in middle age, researchers followed the women for 44 years. Both groups lived just as long, but those who could ride an exercise bike at a fast rate for 6 minutes in the initial test had a much lower risk of dementia later on than those who couldn't complete the workout.",
        "highlightTerms": [
          "44 years",
          "exercise bike"
        ]
      },
      {
        "label": "C",
        "text": "The study, published Wednesday in the journal Neurology, couldn't prove that exercise prevented dementia, and the findings aren't a surprise—it's long been known there's a correlation between exercise and decreased dementia risk—but the results were particularly dramatic. Overall, women who were highly fit compared to those who were moderately fit decreased their risk of dementia by 88%.",
        "highlightTerms": [
          "correlation between exercise and decreased dementia risk",
          "88%"
        ]
      },
      {
        "label": "D",
        "text": "'I'm very surprised that the finding was so strong,' said Ingmar Skoog, the paper's senior author and a psychiatry professor at The University of Gothenburg in Sweden. 'It really shows the importance of exercise.'",
        "highlightTerms": [
          "Ingmar Skoog",
          "importance of exercise"
        ]
      },
      {
        "label": "E",
        "text": "Dementia, as defined in medical dictionaries, is a broad term that describes a loss of thinking ability, memory, attention, logical reasoning, and other mental abilities. These changes are severe enough to interfere with social or occupational functioning. Dementia isn't a disease. Instead, it's a group of symptoms caused by other conditions. It happens when the parts of your brain used for learning, memory, decision making, and language are damaged or diseased. About 5%-8% of adults over age 65 have some form of dementia.",
        "highlightTerms": [
          "loss of thinking ability, memory, attention, logical reasoning, and other mental abilities"
        ]
      },
      {
        "label": "F",
        "text": "Dementia is not temporary confusion or forgetfulness that might result from an infection that heals without treatment. It can also come from an underlying illness or side effects of medications. Dementia typically gets worse over time. People with dementia have problems with thinking and remembering that affect their ability to manage their daily life.",
        "highlightTerms": [
          "typically gets worse over time"
        ]
      },
      {
        "label": "G",
        "text": "Dementia is typically associated with declines in cognitive function. Yet researchers have found an association between dementia and declines in hearing and other basic sensory functions.",
        "highlightTerms": [
          "cognitive function",
          "hearing"
        ]
      },
      {
        "label": "H",
        "text": "Though the study mentioned above was fairly small (only 191 women took the initial fitness test, which means it's hard to maintain statistical significance while breaking the group down into sub-categories of more or less fit), it does give us hope that dementia can be prevented or delayed through exercise in one's middle age.",
        "highlightTerms": [
          "give us hope",
          "prevented or delayed",
          "exercise in one's middle age"
        ]
      },
      {
        "label": "I",
        "text": "Alzheimer's and other dementias are believed to begin 15-20 years before symptoms even appear, so it makes sense that exercising in mid-life would affect the risk, Skoog said. And the same activities that help prevent Alzheimer's—including avoiding smoking, getting adequate exercise and sleep and eating a healthy diet—also prevent heart disease, he said, making them even more worthwhile.",
        "highlightTerms": [
          "15-20 years",
          "also prevent heart disease"
        ]
      }
    ],
    "statement": "Hopefully, one can postpone or prevent dementia by exercising in their mid-life.",
    "answer": "H",
    "anchorKeywords": [
      "Hopefully",
      "postpone or prevent",
      "exercising in their mid-life"
    ],
    "hintSteps": [
      "切忌只看 mid-life 就盲选 A 段！必须同时验证“充满希望（Hopefully）”与“推迟或预防（postpone or prevent）”双重语义。",
      "扫读 A–I 段中含有 hope 以及 delayed / prevented 同义改写的句子。",
      "在 H 段后半句锁定 it does give us hope that dementia can be prevented or delayed through exercise in one's middle age。"
    ]
  },
  {
    "id": "q_mat_05",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_scan",
    "difficulty": 1,
    "source": "2026.06 第3套 Section B Q36",
    "title": "电话面试避坑：避免首轮谈论薪酬",
    "passageTitle": "Giving a Better Phone Interview",
    "paragraphs": [
      {
        "label": "A",
        "text": "These days, phone interviews are an unavoidable part of the job interview process, and for good reason: They save time and effort. But that doesn't mean that phone calls require zero energy on the part of the candidate. Many companies treat phone screening as the official first round of the hiring process. That means candidates are expected to go into them prepared with as much information as possible about the company, position, and their own skills and strengths.",
        "highlightTerms": [
          "official first round of the hiring process"
        ]
      },
      {
        "label": "B",
        "text": "A big mistake people often make is talking about their personal lives. Don't talk about your personal life unless you're directly asked a question about what you like to do in your off-hours. 'The point of a phone interview is to focus on getting to know a candidate's professional experience and goals,' says Mckenzie Roark, campus talent specialist at Lithko Contracting.",
        "highlightTerms": [
          "personal lives",
          "professional experience and goals"
        ]
      },
      {
        "label": "C",
        "text": "It might be tempting to cross something off your to-do list while on a phone interview, but recruiters and hiring managers can easily tell if your attention is elsewhere. Many interviewers are annoyed to see people who decide to multitask while on the phone interview. There are candidates who wash dishes, go for walks, or do grocery shopping during the interview.",
        "highlightTerms": [
          "annoyed",
          "multitask"
        ]
      },
      {
        "label": "D",
        "text": "The question regarding pay is also best avoided. To be frank, it's simply too early in the process for you to be the one who brings up salary expectations. 'Chances are if a candidate is participating in a phone interview, this is the first time they have talked with the company, and the first call isn't the appropriate time to talk about what's in it for you,' says Justina Strnad, the Talent Acquisition Manager for Shiftgig.",
        "highlightTerms": [
          "question regarding pay is also best avoided",
          "salary expectations"
        ]
      },
      {
        "label": "E",
        "text": "'After wrapping up a phone interview, it is typical that the interviewer will ask the candidate if they have any questions. I can't stress this enough: ALWAYS ask questions,' says Roark. 'If we have had a great phone interview and then we wrap up and they don't have any questions for me, it pretty much ruins the whole interview.'",
        "highlightTerms": [
          "ALWAYS ask questions",
          "ruins the whole interview"
        ]
      },
      {
        "label": "F",
        "text": "It seems basic, but surprisingly, a lot of people are late to phone interviews. 'About a quarter of the people with whom I schedule phone interviews aren't on time,' says Sophie Cikovsky, who handles U.S. recruiting for Infinite Global. 'If I hear from them at 1:13 p.m. or 12:49 p.m. instead of our planned 1:00 p.m. interview time, I have an early indicator that they might not be a great fit.'",
        "highlightTerms": [
          "aren't on time",
          "not be a great fit"
        ]
      },
      {
        "label": "G",
        "text": "'Make sure you test your headset and connection before dialing in,' recommends Roark. 'There is nothing more frustrating for a recruiter who has a structured interview guide in place having to repeatedly ask the same question over and over because they could not understand your answer due to dropped signals.'",
        "highlightTerms": [
          "test your headset and connection before dialing in"
        ]
      },
      {
        "label": "H",
        "text": "You might be eager to get your point across or talk about your experience, but interrupting the interviewer is awkward and rude. 'Interviewing can be stressful, and sometimes that stress manifests itself in speaking too fast, speaking too loud, talking over the interviewer, or attempting to answer the interviewer's question before they have actually finished asking the question,' says Chris Dardis.",
        "highlightTerms": [
          "interrupting the interviewer is awkward and rude"
        ]
      },
      {
        "label": "I",
        "text": "It's tough not to say things like 'um,' 'uh,' and 'like' in everyday speech, but these verbal habits become much more pronounced when speaking on the phone, says Dardis. In face-to-face interviews, they're not as noticeable, because there are other things like your hair, suit, or body language to distract people.",
        "highlightTerms": [
          "verbal habits",
          "eliminate these words"
        ]
      },
      {
        "label": "J",
        "text": "Not knowing anything about the company or job you're interviewing for is way more obvious than you'd think. 'Many people think that they don't have to put as much effort into researching the role or the company,' says Steve Pritchard, an HR consultant. And if you have your laptop in front of you during the interview to do a few quick searches, they won't know the difference, right? Not exactly. 'Seasoned interviewers will know whether an interviewee is researching while on the phone. The interviewer can often even hear the typing as they ask the question,' he adds.",
        "highlightTerms": [
          "Seasoned interviewers will know",
          "researching while on the phone",
          "hear the typing"
        ]
      }
    ],
    "statement": "Interviewees are advised not to ask questions about pay during a phone interview.",
    "answer": "D",
    "anchorKeywords": [
      "pay",
      "advised not to ask",
      "salary"
    ],
    "hintSteps": [
      "全篇都在讲电话面试，phone interview 不能用来定位；唯一强锚点词是 pay（薪酬，同义词 salary）。",
      "快速扫描各段首句主题句（本文为典型“一段一条建议”结构），寻找 pay / salary。",
      "在 D 段首句直接命中 The question regarding pay is also best avoided，核对语义后稳选。"
    ]
  },
  {
    "id": "q_mat_06",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_para",
    "difficulty": 2,
    "source": "2026.06 第3套 Section B Q37",
    "title": "电话面试避坑：边通话边上网查资料会被识破",
    "passageTitle": "Giving a Better Phone Interview",
    "paragraphs": [
      {
        "label": "A",
        "text": "These days, phone interviews are an unavoidable part of the job interview process, and for good reason: They save time and effort. But that doesn't mean that phone calls require zero energy on the part of the candidate. Many companies treat phone screening as the official first round of the hiring process. That means candidates are expected to go into them prepared with as much information as possible about the company, position, and their own skills and strengths.",
        "highlightTerms": [
          "official first round of the hiring process"
        ]
      },
      {
        "label": "B",
        "text": "A big mistake people often make is talking about their personal lives. Don't talk about your personal life unless you're directly asked a question about what you like to do in your off-hours. 'The point of a phone interview is to focus on getting to know a candidate's professional experience and goals,' says Mckenzie Roark, campus talent specialist at Lithko Contracting.",
        "highlightTerms": [
          "personal lives",
          "professional experience and goals"
        ]
      },
      {
        "label": "C",
        "text": "It might be tempting to cross something off your to-do list while on a phone interview, but recruiters and hiring managers can easily tell if your attention is elsewhere. Many interviewers are annoyed to see people who decide to multitask while on the phone interview. There are candidates who wash dishes, go for walks, or do grocery shopping during the interview.",
        "highlightTerms": [
          "annoyed",
          "multitask"
        ]
      },
      {
        "label": "D",
        "text": "The question regarding pay is also best avoided. To be frank, it's simply too early in the process for you to be the one who brings up salary expectations. 'Chances are if a candidate is participating in a phone interview, this is the first time they have talked with the company, and the first call isn't the appropriate time to talk about what's in it for you,' says Justina Strnad, the Talent Acquisition Manager for Shiftgig.",
        "highlightTerms": [
          "question regarding pay is also best avoided",
          "salary expectations"
        ]
      },
      {
        "label": "E",
        "text": "'After wrapping up a phone interview, it is typical that the interviewer will ask the candidate if they have any questions. I can't stress this enough: ALWAYS ask questions,' says Roark. 'If we have had a great phone interview and then we wrap up and they don't have any questions for me, it pretty much ruins the whole interview.'",
        "highlightTerms": [
          "ALWAYS ask questions",
          "ruins the whole interview"
        ]
      },
      {
        "label": "F",
        "text": "It seems basic, but surprisingly, a lot of people are late to phone interviews. 'About a quarter of the people with whom I schedule phone interviews aren't on time,' says Sophie Cikovsky, who handles U.S. recruiting for Infinite Global. 'If I hear from them at 1:13 p.m. or 12:49 p.m. instead of our planned 1:00 p.m. interview time, I have an early indicator that they might not be a great fit.'",
        "highlightTerms": [
          "aren't on time",
          "not be a great fit"
        ]
      },
      {
        "label": "G",
        "text": "'Make sure you test your headset and connection before dialing in,' recommends Roark. 'There is nothing more frustrating for a recruiter who has a structured interview guide in place having to repeatedly ask the same question over and over because they could not understand your answer due to dropped signals.'",
        "highlightTerms": [
          "test your headset and connection before dialing in"
        ]
      },
      {
        "label": "H",
        "text": "You might be eager to get your point across or talk about your experience, but interrupting the interviewer is awkward and rude. 'Interviewing can be stressful, and sometimes that stress manifests itself in speaking too fast, speaking too loud, talking over the interviewer, or attempting to answer the interviewer's question before they have actually finished asking the question,' says Chris Dardis.",
        "highlightTerms": [
          "interrupting the interviewer is awkward and rude"
        ]
      },
      {
        "label": "I",
        "text": "It's tough not to say things like 'um,' 'uh,' and 'like' in everyday speech, but these verbal habits become much more pronounced when speaking on the phone, says Dardis. In face-to-face interviews, they're not as noticeable, because there are other things like your hair, suit, or body language to distract people.",
        "highlightTerms": [
          "verbal habits",
          "eliminate these words"
        ]
      },
      {
        "label": "J",
        "text": "Not knowing anything about the company or job you're interviewing for is way more obvious than you'd think. 'Many people think that they don't have to put as much effort into researching the role or the company,' says Steve Pritchard, an HR consultant. And if you have your laptop in front of you during the interview to do a few quick searches, they won't know the difference, right? Not exactly. 'Seasoned interviewers will know whether an interviewee is researching while on the phone. The interviewer can often even hear the typing as they ask the question,' he adds.",
        "highlightTerms": [
          "Seasoned interviewers will know",
          "researching while on the phone",
          "hear the typing"
        ]
      }
    ],
    "statement": "Experienced interviewers will know if an applicant is searching for information online while talking on the phone.",
    "answer": "J",
    "anchorKeywords": [
      "Experienced interviewers",
      "searching for information online",
      "talking on the phone"
    ],
    "hintSteps": [
      "提取复合定位词：Experienced interviewers（资深面试官）与 searching ... online（上网搜资料）。",
      "不要误选同样提到“面试时分心干别的事”的 C 段（C 段讲的是洗碗、散步、买菜等 multitask）。",
      "扫读至 J 段锁定核心改写：Seasoned interviewers（资深面试官）对应 Experienced interviewers，laptop / searches / researching while on the phone 精准匹配。"
    ]
  },
  {
    "id": "q_mat_07",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_scan",
    "difficulty": 2,
    "source": "2024.06 第1套 Section B Q38",
    "title": "美国人为何工作这么久：半个世纪工时不变",
    "passageTitle": "Why Do Americans Work So Much?",
    "paragraphs": [
      {
        "label": "A",
        "text": "How will we all keep busy when we only have to work 15 hours a week? That was the question that worried the British economist John Maynard Keynes when he wrote his short essay 'Economic Possibilities for Our Grandchildren' in 1930. For a while, it looked like Keynes was right. In 1930 the average working week was 47 hours in the United States. But by 1970, the number of hours Americans worked on average had fallen to slightly less than 39.",
        "highlightTerms": [
          "Keynes",
          "1930",
          "fallen to slightly less than 39"
        ]
      },
      {
        "label": "B",
        "text": "But then something changed. Instead of continuing to decline, the duration of the working week remained stable. It has stayed at just below 40 hours for nearly five decades. So what happened? Why are people working just as much today as in 1970?",
        "highlightTerms": [
          "remained stable",
          "nearly five decades",
          "just below 40 hours"
        ]
      },
      {
        "label": "C",
        "text": "There would be no mystery in this if Keynes had been wrong about the power of technology to increase the economy's productivity, which he thought would lead to a standard of living 'between four and eight times as high as it is today.' But Keynes got that right: Technology has made the economy massively more productive. According to Benjamin M. Friedman, an economist at Harvard, the U.S. economy is right on track to reach Keynes's eightfold multiple by 2029.",
        "highlightTerms": [
          "Keynes got that right",
          "massively more productive"
        ]
      },
      {
        "label": "D",
        "text": "In a new paper, Friedman tries to figure out why that increased productivity has not translated into increased leisure time. Perhaps people just never feel materially satisfied, always wanting more money to buy the next new thing. This is a theory that appeals to many economists. 'This argument is, at best, far from sufficient,' he writes. If that were the case, why did the duration of the working week decline in the first place?",
        "highlightTerms": [
          "never feel materially satisfied",
          "appeals to many economists"
        ]
      },
      {
        "label": "E",
        "text": "Another theory Friedman considers is that, in an era of ever fewer settings that provide effective opportunities for personal connections and relationships, people may place more value on the socializing that happens at work. There is support for this theory. Many people today consider colleagues as friends. But Friedman argues that the evidence for this theory is far from conclusive.",
        "highlightTerms": [
          "personal connections and relationships",
          "socializing that happens at work"
        ]
      },
      {
        "label": "F",
        "text": "A third possibility proves more convincing for Friedman. That is, American inequality means that the gains of increasing productivity are not widely shared by everyone. In other words, most Americans are too poor to work less. Unlike the other two explanations Friedman considers, this one fits chronologically. Inequality declined in America during the period following World War II, along with the duration of the working week. But since the early 1970s it has risen dramatically.",
        "highlightTerms": [
          "more convincing for Friedman",
          "American inequality",
          "gains of increasing productivity are not widely shared"
        ]
      },
      {
        "label": "G",
        "text": "Keynes's prediction of a shorter working week rests on the idea that the standard of living would continue rising for everyone. But Friedman says that this is not what has happened. Although Keynes's eight-fold figure holds up for the economy as a whole, it is not at all the case for the median American worker.",
        "highlightTerms": [
          "standard of living would continue rising for everyone",
          "median American worker"
        ]
      },
      {
        "label": "H",
        "text": "This can be seen in the median worker's income over this time period, complete with a shift in 1973 that fits in precisely with when the working week stopped shrinking. By 2013 the average hourly wage for ordinary workers had fallen 5 percent from the 1973 level in terms of actual purchasing power. Thus, they had to keep working just as much in order to maintain their standard of living.",
        "highlightTerms": [
          "average hourly wage",
          "fallen 5 percent",
          "maintain their standard of living"
        ]
      }
    ],
    "statement": "American workers' average weekly working time has not changed for nearly half a century.",
    "answer": "B",
    "anchorKeywords": [
      "weekly working time",
      "not changed",
      "nearly half a century"
    ],
    "hintSteps": [
      "数字与时间词是最强扫描雷达：将题干中的 nearly half a century（近半个世纪）提前转换为 50 years / five decades。",
      "扫读 A–C 段开头寻找与 five decades 以及“保持不变（remained stable）”对应的表述。",
      "在 B 段第二、三句精准锁定 duration of the working week remained stable ... stayed at just below 40 hours for nearly five decades。"
    ]
  },
  {
    "id": "q_mat_08",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_para",
    "difficulty": 3,
    "source": "2024.06 第1套 Section B Q39",
    "title": "美国人为何工作这么久：不平等解释工时未缩减",
    "passageTitle": "Why Do Americans Work So Much?",
    "paragraphs": [
      {
        "label": "A",
        "text": "How will we all keep busy when we only have to work 15 hours a week? That was the question that worried the British economist John Maynard Keynes when he wrote his short essay 'Economic Possibilities for Our Grandchildren' in 1930. For a while, it looked like Keynes was right. In 1930 the average working week was 47 hours in the United States. But by 1970, the number of hours Americans worked on average had fallen to slightly less than 39.",
        "highlightTerms": [
          "Keynes",
          "1930",
          "fallen to slightly less than 39"
        ]
      },
      {
        "label": "B",
        "text": "But then something changed. Instead of continuing to decline, the duration of the working week remained stable. It has stayed at just below 40 hours for nearly five decades. So what happened? Why are people working just as much today as in 1970?",
        "highlightTerms": [
          "remained stable",
          "nearly five decades",
          "just below 40 hours"
        ]
      },
      {
        "label": "C",
        "text": "There would be no mystery in this if Keynes had been wrong about the power of technology to increase the economy's productivity, which he thought would lead to a standard of living 'between four and eight times as high as it is today.' But Keynes got that right: Technology has made the economy massively more productive. According to Benjamin M. Friedman, an economist at Harvard, the U.S. economy is right on track to reach Keynes's eightfold multiple by 2029.",
        "highlightTerms": [
          "Keynes got that right",
          "massively more productive"
        ]
      },
      {
        "label": "D",
        "text": "In a new paper, Friedman tries to figure out why that increased productivity has not translated into increased leisure time. Perhaps people just never feel materially satisfied, always wanting more money to buy the next new thing. This is a theory that appeals to many economists. 'This argument is, at best, far from sufficient,' he writes. If that were the case, why did the duration of the working week decline in the first place?",
        "highlightTerms": [
          "never feel materially satisfied",
          "appeals to many economists"
        ]
      },
      {
        "label": "E",
        "text": "Another theory Friedman considers is that, in an era of ever fewer settings that provide effective opportunities for personal connections and relationships, people may place more value on the socializing that happens at work. There is support for this theory. Many people today consider colleagues as friends. But Friedman argues that the evidence for this theory is far from conclusive.",
        "highlightTerms": [
          "personal connections and relationships",
          "socializing that happens at work"
        ]
      },
      {
        "label": "F",
        "text": "A third possibility proves more convincing for Friedman. That is, American inequality means that the gains of increasing productivity are not widely shared by everyone. In other words, most Americans are too poor to work less. Unlike the other two explanations Friedman considers, this one fits chronologically. Inequality declined in America during the period following World War II, along with the duration of the working week. But since the early 1970s it has risen dramatically.",
        "highlightTerms": [
          "more convincing for Friedman",
          "American inequality",
          "gains of increasing productivity are not widely shared"
        ]
      },
      {
        "label": "G",
        "text": "Keynes's prediction of a shorter working week rests on the idea that the standard of living would continue rising for everyone. But Friedman says that this is not what has happened. Although Keynes's eight-fold figure holds up for the economy as a whole, it is not at all the case for the median American worker.",
        "highlightTerms": [
          "standard of living would continue rising for everyone",
          "median American worker"
        ]
      },
      {
        "label": "H",
        "text": "This can be seen in the median worker's income over this time period, complete with a shift in 1973 that fits in precisely with when the working week stopped shrinking. By 2013 the average hourly wage for ordinary workers had fallen 5 percent from the 1973 level in terms of actual purchasing power. Thus, they had to keep working just as much in order to maintain their standard of living.",
        "highlightTerms": [
          "average hourly wage",
          "fallen 5 percent",
          "maintain their standard of living"
        ]
      }
    ],
    "statement": "Friedman believes inequality in the U.S. largely explains why increasing productivity has not resulted in reduced working hours.",
    "answer": "F",
    "anchorKeywords": [
      "Friedman",
      "inequality",
      "increasing productivity",
      "reduced working hours"
    ],
    "hintSteps": [
      "人名 Friedman 在多段出现，因此必须用高频核心概念 inequality（不平等）做二次精准筛选。",
      "D、E、F 三段依次列出 Friedman 审视的三种解释，其中 D、E 都被他否定，重点看哪一段是他“认为更有说服力”的。",
      "定位 F 段：A third possibility proves more convincing for Friedman. That is, American inequality means that the gains of increasing productivity are not widely shared..."
    ]
  },
  {
    "id": "q_mat_09",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_scan",
    "difficulty": 2,
    "source": "2024.06 第2套 Section B Q45",
    "title": "如何实现长期目标：看到变老后的自己会多存养老钱",
    "passageTitle": "How to Better Work Towards Long-Term Goals",
    "paragraphs": [
      {
        "label": "A",
        "text": "Hal Hershfield, a psychologist at the UCLA Anderson School of Management, wanted to know why people weren't saving for retirement. Across the board, people are living longer. Logically, they'll need more money to live comfortably in their post-work years. And yet, savings rates in the U.S. have gone down in recent decades, not up.",
        "highlightTerms": [
          "living longer",
          "savings rates in the U.S. have gone down"
        ]
      },
      {
        "label": "B",
        "text": "To help explain this seemingly irrational behavior, Hershfield and his team scanned the brains of study participants while asking them to what degree various traits applied to their current self, their future self, a current other, or a future other. Unsurprisingly, people's brains were most active when thinking about their current selves and least active when thinking about a current other.",
        "highlightTerms": [
          "scanned the brains",
          "most active when thinking about their current selves"
        ]
      },
      {
        "label": "C",
        "text": "Put in practical terms, when thinking of yourself in a month or a year or a decade, your brain registers that person in ways similar to how it would register Taylor Swift or the mailman. Understood in that way, saving for retirement is the equivalent of giving money away to someone else entirely.",
        "highlightTerms": [
          "Put in practical terms",
          "saving for retirement is the equivalent of giving money away"
        ]
      },
      {
        "label": "D",
        "text": "In light of Hershfield's study, one simple question arises: Is it possible to make our present selves give a damn about our future selves? The answers are anything but simple.",
        "highlightTerms": [
          "present selves",
          "future selves"
        ]
      },
      {
        "label": "E",
        "text": "Seen through the lens of the present self versus the future self, our self-defeating actions suddenly make perfect sense. We get to enjoy the very concrete, immediate benefits of our actions while someone else (namely: our future selves) suffers the hypothetical far-off consequences. We believe that we will be different tomorrow, but in doing so, we prioritize our current mood over the consequences of our inaction for the future self.",
        "highlightTerms": [
          "prioritize our current mood",
          "consequences"
        ]
      },
      {
        "label": "F",
        "text": "Understanding our procrastination through the lens of the present and future selves, we're left with three possible solutions: The first is to force your future self to do whatever your present self doesn't want to do. The second is to convince your present self that your future self is, in fact, still you. Trying to identify more closely with our future selves will encourage us to make better long-term decisions.",
        "highlightTerms": [
          "future self is, in fact, still you",
          "better long-term decisions"
        ]
      },
      {
        "label": "G",
        "text": "In a follow-up study, Hershfield wanted to explore ways to bridge the disconnect between the present and future selves and encourage people to save more for retirement. He and his team took photos of study participants, and then used image processing to visually age their faces. Participants were then placed in a virtual reality setting where they could look into a mirror and see their aged selves looking back at them. Participants who saw their aged selves said they would save 30% more of their salary for retirement than the control group.",
        "highlightTerms": [
          "see their aged selves",
          "save 30% more of their salary for retirement"
        ]
      },
      {
        "label": "H",
        "text": "Whatever your long-term goals may be—getting in better shape, launching your own business, writing a book—thinking about your deadline in terms of days rather than months or years can help you wrap your mind around how close the future really is.",
        "highlightTerms": [
          "deadline in terms of days"
        ]
      },
      {
        "label": "I",
        "text": "The third solution is to forget about your future self and use your present self's love of instant gratification to your advantage. While the two tactics above can be effective in making better long-term choices, in the end, you're still struggling against human nature. Our brains are hardwired for instant gratification. Instead of fighting your present self's need for immediate rewards, why not use it to your advantage?",
        "highlightTerms": [
          "Our brains are hardwired for instant gratification",
          "immediate rewards"
        ]
      }
    ],
    "statement": "Researchers found that participants who saw the images of their aged selves would save more for their later years than those who didn't.",
    "answer": "G",
    "anchorKeywords": [
      "images",
      "aged selves",
      "save more",
      "later years"
    ],
    "hintSteps": [
      "抓高辨识度具体名词：images（图像）与 aged selves（年老的自己），在全篇中极易肉眼定位。",
      "扫读 A–I 段，跳过只讲脑部扫描的 B 段，直奔含 image processing / virtual reality / mirror 的段落。",
      "在 G 段末句锁定 Participants who saw their aged selves said they would save 30% more of their salary for retirement than the control group。"
    ]
  },
  {
    "id": "q_mat_10",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_para",
    "difficulty": 3,
    "source": "2024.06 第2套 Section B Q36",
    "title": "如何实现长期目标：大脑天生渴望即时满足",
    "passageTitle": "How to Better Work Towards Long-Term Goals",
    "paragraphs": [
      {
        "label": "A",
        "text": "Hal Hershfield, a psychologist at the UCLA Anderson School of Management, wanted to know why people weren't saving for retirement. Across the board, people are living longer. Logically, they'll need more money to live comfortably in their post-work years. And yet, savings rates in the U.S. have gone down in recent decades, not up.",
        "highlightTerms": [
          "living longer",
          "savings rates in the U.S. have gone down"
        ]
      },
      {
        "label": "B",
        "text": "To help explain this seemingly irrational behavior, Hershfield and his team scanned the brains of study participants while asking them to what degree various traits applied to their current self, their future self, a current other, or a future other. Unsurprisingly, people's brains were most active when thinking about their current selves and least active when thinking about a current other.",
        "highlightTerms": [
          "scanned the brains",
          "most active when thinking about their current selves"
        ]
      },
      {
        "label": "C",
        "text": "Put in practical terms, when thinking of yourself in a month or a year or a decade, your brain registers that person in ways similar to how it would register Taylor Swift or the mailman. Understood in that way, saving for retirement is the equivalent of giving money away to someone else entirely.",
        "highlightTerms": [
          "Put in practical terms",
          "saving for retirement is the equivalent of giving money away"
        ]
      },
      {
        "label": "D",
        "text": "In light of Hershfield's study, one simple question arises: Is it possible to make our present selves give a damn about our future selves? The answers are anything but simple.",
        "highlightTerms": [
          "present selves",
          "future selves"
        ]
      },
      {
        "label": "E",
        "text": "Seen through the lens of the present self versus the future self, our self-defeating actions suddenly make perfect sense. We get to enjoy the very concrete, immediate benefits of our actions while someone else (namely: our future selves) suffers the hypothetical far-off consequences. We believe that we will be different tomorrow, but in doing so, we prioritize our current mood over the consequences of our inaction for the future self.",
        "highlightTerms": [
          "prioritize our current mood",
          "consequences"
        ]
      },
      {
        "label": "F",
        "text": "Understanding our procrastination through the lens of the present and future selves, we're left with three possible solutions: The first is to force your future self to do whatever your present self doesn't want to do. The second is to convince your present self that your future self is, in fact, still you. Trying to identify more closely with our future selves will encourage us to make better long-term decisions.",
        "highlightTerms": [
          "future self is, in fact, still you",
          "better long-term decisions"
        ]
      },
      {
        "label": "G",
        "text": "In a follow-up study, Hershfield wanted to explore ways to bridge the disconnect between the present and future selves and encourage people to save more for retirement. He and his team took photos of study participants, and then used image processing to visually age their faces. Participants were then placed in a virtual reality setting where they could look into a mirror and see their aged selves looking back at them. Participants who saw their aged selves said they would save 30% more of their salary for retirement than the control group.",
        "highlightTerms": [
          "see their aged selves",
          "save 30% more of their salary for retirement"
        ]
      },
      {
        "label": "H",
        "text": "Whatever your long-term goals may be—getting in better shape, launching your own business, writing a book—thinking about your deadline in terms of days rather than months or years can help you wrap your mind around how close the future really is.",
        "highlightTerms": [
          "deadline in terms of days"
        ]
      },
      {
        "label": "I",
        "text": "The third solution is to forget about your future self and use your present self's love of instant gratification to your advantage. While the two tactics above can be effective in making better long-term choices, in the end, you're still struggling against human nature. Our brains are hardwired for instant gratification. Instead of fighting your present self's need for immediate rewards, why not use it to your advantage?",
        "highlightTerms": [
          "Our brains are hardwired for instant gratification",
          "immediate rewards"
        ]
      }
    ],
    "statement": "Our brains are genetically determined to satisfy immediate desires.",
    "answer": "I",
    "anchorKeywords": [
      "brains",
      "genetically determined",
      "immediate desires"
    ],
    "hintSteps": [
      "警惕 B 段和 C 段都出现过 brain，本题核心不只是“大脑”，而是“天生注定追求即时满足”。",
      "记住四级高阶同义改写：genetically determined（基因决定/天生的）常对应 hardwired（天生的、固有的），immediate desires 对应 instant gratification。",
      "扫读至 I 段锁定原句 Our brains are hardwired for instant gratification。"
    ]
  },
  {
    "id": "q_mat_11",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_scan",
    "difficulty": 2,
    "source": "2018.06 第1套 Section B Q39",
    "title": "付费做作业争议：麦格劳-希尔占教材市场超五分之一",
    "passageTitle": "Some College Students Are Angry That They Have to Pay to Do Their Homework",
    "paragraphs": [
      {
        "label": "A",
        "text": "Digital learning systems now charge students for access codes needed to complete coursework, take quizzes, and turn in homework. As universities go digital, students are complaining of a new hit to their finances that's replacing—and sometimes joining—expensive textbooks: pricey online access codes that are required to complete coursework and submit assignments.",
        "highlightTerms": [
          "access codes",
          "submit assignments"
        ]
      },
      {
        "label": "B",
        "text": "The codes—which typically range in price from $80 to $155 per course—give students online access to systems developed by education companies like McGraw Hill and Pearson. These companies, which long reaped big profits as textbook publishers, have boasted that their new online offerings, when pushed to students through universities they partner with, represent the future of the industry.",
        "highlightTerms": [
          "textbook publishers",
          "new online offerings",
          "future of the industry"
        ]
      },
      {
        "label": "C",
        "text": "But critics say the digital access codes represent the same profit-seeking ethos of the textbook business, and are even harder for students to opt out of. While they could once buy second-hand textbooks, or share copies with friends, the digital systems are essentially impossible to avoid.",
        "highlightTerms": [
          "critics",
          "profit-seeking ethos"
        ]
      },
      {
        "label": "D",
        "text": "'When we talk about the access code we see it as the new face of the textbook monopoly, a new way to lock students around this system,' said Ethan Senack, the higher education advocate for the U.S. Public Interest Research Group, to BuzzFeed News.",
        "highlightTerms": [
          "lock students around this system"
        ]
      },
      {
        "label": "E",
        "text": "Sarina Harper, a 19-year-old student at Virginia Tech, was faced with a tough dilemma when she first started college in 2015—pay rent or pay to turn in her chemistry homework. The code to access the program cost $120—a big sum for Harper, who had already put down $450 for textbooks, and had rent day approaching.",
        "highlightTerms": [
          "pay rent",
          "$120"
        ]
      },
      {
        "label": "F",
        "text": "She decided to wait for her next work-study paycheck, which was typically $150-$200, to pay for the code. She knew that her chemistry grade may take a dive as a result. She didn't hand in her first two assignments for chemistry, which started her out in the class with a failing grade.",
        "highlightTerms": [
          "work-study paycheck",
          "wait"
        ]
      },
      {
        "label": "G",
        "text": "The access codes may be another financial headache for students, but for textbook businesses, they're the future. McGraw Hill, which controls 21% of the higher education market, reported in March that its digital content sales exceeded print sales for the first time in 2015. The company said that 45% of its $140 million revenue in 2015 'was derived from digital products.'",
        "highlightTerms": [
          "McGraw Hill",
          "controls 21% of the higher education market"
        ]
      },
      {
        "label": "H",
        "text": "A Pearson spokesperson told BuzzFeed News that 'digital materials are less expensive and a good investment' that offer new features, like audio texts, personalized knowledge checks and expert videos. Its digital course materials save students up to 60% compared to traditional printed textbooks, the company added.",
        "highlightTerms": [
          "save students up to 60%",
          "traditional printed textbooks"
        ]
      },
      {
        "label": "I",
        "text": "The textbook industry insists the online systems represent a better deal for students. 'These digital products aren't just mechanisms for students to submit homework, they offer all kinds of features,' David Anderson, the executive director of higher education with the Association of American Publishers, told BuzzFeed News.",
        "highlightTerms": [
          "better deal",
          "all kinds of features"
        ]
      },
      {
        "label": "J",
        "text": "David Hunt, an associate professor in sociology at Augusta University, uses free digital textbooks for his classes but designs his own curriculum. 'The online systems may make my life a lot easier but I feel like I'm giving up control. The discussions are the things where my expertise can benefit the students most.'",
        "highlightTerms": [
          "giving up control",
          "expertise can benefit the students most"
        ]
      }
    ],
    "statement": "McGraw Hill accounts for over one-fifth of the market share of college textbooks.",
    "answer": "G",
    "anchorKeywords": [
      "McGraw Hill",
      "over one-fifth",
      "market share"
    ],
    "hintSteps": [
      "专有名词 McGraw Hill + 比例数字换算（over one-fifth = 大于 20%）是绝杀级双重锚点。",
      "快速检索文中所有出现 McGraw Hill 的段落（B、E、G），过滤掉只提产品和价格的 B、E 段。",
      "在 G 段第二句精准找到 McGraw Hill, which controls 21% of the higher education market，21% 正好大于五分之一。"
    ]
  },
  {
    "id": "q_mat_12",
    "skill": "matching",
    "type": "matching",
    "sectionId": "t_long_para",
    "difficulty": 3,
    "source": "2018.06 第1套 Section B Q44",
    "title": "付费做作业争议：在线系统削弱教师发挥专长的空间",
    "passageTitle": "Some College Students Are Angry That They Have to Pay to Do Their Homework",
    "paragraphs": [
      {
        "label": "A",
        "text": "Digital learning systems now charge students for access codes needed to complete coursework, take quizzes, and turn in homework. As universities go digital, students are complaining of a new hit to their finances that's replacing—and sometimes joining—expensive textbooks: pricey online access codes that are required to complete coursework and submit assignments.",
        "highlightTerms": [
          "access codes",
          "submit assignments"
        ]
      },
      {
        "label": "B",
        "text": "The codes—which typically range in price from $80 to $155 per course—give students online access to systems developed by education companies like McGraw Hill and Pearson. These companies, which long reaped big profits as textbook publishers, have boasted that their new online offerings, when pushed to students through universities they partner with, represent the future of the industry.",
        "highlightTerms": [
          "textbook publishers",
          "new online offerings",
          "future of the industry"
        ]
      },
      {
        "label": "C",
        "text": "But critics say the digital access codes represent the same profit-seeking ethos of the textbook business, and are even harder for students to opt out of. While they could once buy second-hand textbooks, or share copies with friends, the digital systems are essentially impossible to avoid.",
        "highlightTerms": [
          "critics",
          "profit-seeking ethos"
        ]
      },
      {
        "label": "D",
        "text": "'When we talk about the access code we see it as the new face of the textbook monopoly, a new way to lock students around this system,' said Ethan Senack, the higher education advocate for the U.S. Public Interest Research Group, to BuzzFeed News.",
        "highlightTerms": [
          "lock students around this system"
        ]
      },
      {
        "label": "E",
        "text": "Sarina Harper, a 19-year-old student at Virginia Tech, was faced with a tough dilemma when she first started college in 2015—pay rent or pay to turn in her chemistry homework. The code to access the program cost $120—a big sum for Harper, who had already put down $450 for textbooks, and had rent day approaching.",
        "highlightTerms": [
          "pay rent",
          "$120"
        ]
      },
      {
        "label": "F",
        "text": "She decided to wait for her next work-study paycheck, which was typically $150-$200, to pay for the code. She knew that her chemistry grade may take a dive as a result. She didn't hand in her first two assignments for chemistry, which started her out in the class with a failing grade.",
        "highlightTerms": [
          "work-study paycheck",
          "wait"
        ]
      },
      {
        "label": "G",
        "text": "The access codes may be another financial headache for students, but for textbook businesses, they're the future. McGraw Hill, which controls 21% of the higher education market, reported in March that its digital content sales exceeded print sales for the first time in 2015. The company said that 45% of its $140 million revenue in 2015 'was derived from digital products.'",
        "highlightTerms": [
          "McGraw Hill",
          "controls 21% of the higher education market"
        ]
      },
      {
        "label": "H",
        "text": "A Pearson spokesperson told BuzzFeed News that 'digital materials are less expensive and a good investment' that offer new features, like audio texts, personalized knowledge checks and expert videos. Its digital course materials save students up to 60% compared to traditional printed textbooks, the company added.",
        "highlightTerms": [
          "save students up to 60%",
          "traditional printed textbooks"
        ]
      },
      {
        "label": "I",
        "text": "The textbook industry insists the online systems represent a better deal for students. 'These digital products aren't just mechanisms for students to submit homework, they offer all kinds of features,' David Anderson, the executive director of higher education with the Association of American Publishers, told BuzzFeed News.",
        "highlightTerms": [
          "better deal",
          "all kinds of features"
        ]
      },
      {
        "label": "J",
        "text": "David Hunt, an associate professor in sociology at Augusta University, uses free digital textbooks for his classes but designs his own curriculum. 'The online systems may make my life a lot easier but I feel like I'm giving up control. The discussions are the things where my expertise can benefit the students most.'",
        "highlightTerms": [
          "giving up control",
          "expertise can benefit the students most"
        ]
      }
    ],
    "statement": "Online systems may deprive teachers of opportunities to make the best use of their expertise for their students.",
    "answer": "J",
    "anchorKeywords": [
      "deprive teachers",
      "expertise",
      "for their students"
    ],
    "hintSteps": [
      "提取人物与低频名词锚点：teachers（教授/教师）与 expertise（专业知识），迅速排除只写学生和出版商的段落。",
      "扫读至唯一以大学副教授视角展开的 J 段（David Hunt, an associate professor）。",
      "核对末两句同义转述：giving up control + where my expertise can benefit the students most 完整对应题干。"
    ]
  },
  {
    "id": "q_rd_01",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_detail",
    "difficulty": 1,
    "source": "2026.06 第1套 Passage 1 Q46",
    "title": "有机食品：经典超市两难困境是什么？",
    "passageTitle": "Is Organic Food Worth the Higher Price?",
    "passageParagraphs": [
      "Is organic food worth the higher price? It's the classic grocery store dilemma. On the one hand, your family dinner table deserves only the best. On the other hand, your wallet can only stretch so far. Whether or not to buy organic is a personal decision, said Mike von Massow, professor of Food Agriculture.",
      "Science won't give a clear-cut answer to the question of whether organic food is \"better.\" There are often trade-offs and answers become less definitive depending on the product under consideration. One thing is definitive: Organic and conventionally grown food are equally nutritious. From a nutrition point of view, there is no difference between organic and traditionally grown products.",
      "Organic products don't necessarily have fewer pesticides—in fact, they may have more. There is also no big difference between organic and non-organic products from a food-safety perspective. Even organic growers use pesticides. Testing shows little if any pesticide remains on conventionally grown products. In fact, organic farmers often use larger quantities of pesticide because they can only use the natural variety of insect-killers. Chemical pesticides generally kill a much wider range of pests than any single natural pesticide.",
      "The use of animal waste in organic agriculture can also be a factor in the spread of bacteria like E. coli and salmonella. Over the past 10 years, Canada has seen more food-safety recalls for organic products, proportionally, than for conventional products.",
      "On the whole, organic agriculture may have a smaller environmental footprint. That's mostly because the risk of groundwater contamination from organic farming is lower. Organic farmers never used neonics, the controversial pesticides that have been linked to shrinking bee populations worldwide. Traditional agriculture has been making \"dramatic improvements\" to reduce its impact on the environment. It isn't a black-and-white picture, though.",
      "Organic farming is much less efficient when it comes to land use, although yields vary considerably depending on the crop. On the other hand, advocates of organic farming argue yields and efficiency could be significantly improved if the food industry devoted as much research and money to organic farming as it does conventional agriculture."
    ],
    "questionText": "What is the classic grocery store dilemma?",
    "options": [
      "A. Whether or not one should eat organic food.",
      "B. Whether or not one can stretch their wallet far.",
      "C. Organic food costs more but it certainly tastes better.",
      "D. One wants the best food but their budget is limited."
    ],
    "answer": "D",
    "evidenceSentence": "On the one hand, your family dinner table deserves only the best. On the other hand, your wallet can only stretch so far.",
    "trapType": "偷换概念",
    "hintSteps": [
      "利用“题文同序”原则，第 46 题直接定位在第一段出现 classic grocery store dilemma 的位置。",
      "精读紧随其后的 On the one hand ... On the other hand 两组对照句，拆解两难矛盾的双方。",
      "理解地道习语 your wallet can only stretch so far（钱包伸展有限 = 预算有限），即可排除只说一面的 A、B 和无中生有的 C。"
    ]
  },
  {
    "id": "q_rd_02",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_traps",
    "difficulty": 2,
    "source": "2026.06 第1套 Passage 1 Q48",
    "title": "有机与非有机食品的食品安全差异",
    "passageTitle": "Is Organic Food Worth the Higher Price?",
    "passageParagraphs": [
      "Is organic food worth the higher price? It's the classic grocery store dilemma. On the one hand, your family dinner table deserves only the best. On the other hand, your wallet can only stretch so far. Whether or not to buy organic is a personal decision, said Mike von Massow, professor of Food Agriculture.",
      "Science won't give a clear-cut answer to the question of whether organic food is \"better.\" There are often trade-offs and answers become less definitive depending on the product under consideration. One thing is definitive: Organic and conventionally grown food are equally nutritious. From a nutrition point of view, there is no difference between organic and traditionally grown products.",
      "Organic products don't necessarily have fewer pesticides—in fact, they may have more. There is also no big difference between organic and non-organic products from a food-safety perspective. Even organic growers use pesticides. Testing shows little if any pesticide remains on conventionally grown products. In fact, organic farmers often use larger quantities of pesticide because they can only use the natural variety of insect-killers. Chemical pesticides generally kill a much wider range of pests than any single natural pesticide.",
      "The use of animal waste in organic agriculture can also be a factor in the spread of bacteria like E. coli and salmonella. Over the past 10 years, Canada has seen more food-safety recalls for organic products, proportionally, than for conventional products.",
      "On the whole, organic agriculture may have a smaller environmental footprint. That's mostly because the risk of groundwater contamination from organic farming is lower. Organic farmers never used neonics, the controversial pesticides that have been linked to shrinking bee populations worldwide. Traditional agriculture has been making \"dramatic improvements\" to reduce its impact on the environment. It isn't a black-and-white picture, though.",
      "Organic farming is much less efficient when it comes to land use, although yields vary considerably depending on the crop. On the other hand, advocates of organic farming argue yields and efficiency could be significantly improved if the food industry devoted as much research and money to organic farming as it does conventional agriculture."
    ],
    "questionText": "What does the passage say about organic and non-organic products as far as food safety is concerned?",
    "options": [
      "A. Their difference is the conventions used to test them.",
      "B. They differ in how much pesticide remains on them.",
      "C. One relies on pesticides whereas the other does not.",
      "D. There is no substantial difference between the two."
    ],
    "answer": "D",
    "evidenceSentence": "There is also no big difference between organic and non-organic products from a food-safety perspective.",
    "trapType": "无中生有",
    "hintSteps": [
      "用题干定位词 food safety 回文定位至第三段第二句。",
      "逐个排雷：第三段紧接着说 Even organic growers use pesticides（直接推翻 C）；Testing shows little if any pesticide remains（并未说两者残留差很大，排除 B）；A 项检测惯例无中生有。",
      "把定位句 no big difference 同义对应为 no substantial difference。"
    ]
  },
  {
    "id": "q_rd_03",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_detail",
    "difficulty": 2,
    "source": "2026.06 第1套 Passage 2 Q51",
    "title": "慷慨还是自私：近期研究关于自私的发现",
    "passageTitle": "Are Humans Fundamentally Generous or Selfish?",
    "passageParagraphs": [
      "It is still controversial whether we are fundamentally generous or selfish and whether these tendencies are shaped by our genes or environment. Some evidence points to humans being born cooperative. At later stages in life we routinely work together to reach goals and help out in times of need.",
      "Yet instances of selfish behavior are also plenty. One recent study tested people's willingness to set aside selfish interests to reach a greater good. It found that being selfish was more advantageous than cooperating. The benefit may be short-lived, however. Another study showed that players who cooperated did better in the long run.",
      "It seems that human nature supports both pro-social and selfish traits. Genetic studies have made some progress toward identifying their biological roots. By comparing identical twins, who share nearly 100 percent of their genes, and non-identical twins, who share about half, researchers have found overwhelming evidence for genetic effects on behaviors. In these twin studies, identical and non-identical twins are asked, for example, to split a sum of money with a peer. Such studies often also rely on careful psychological assessments and DNA analysis.",
      "Other work highlights specific genes as key players. My colleagues and I recently identified a gene linked to altruistic behavior and found that a particular variant of it was associated with more selfish behavior in preschoolers.",
      "According to evolutionary scientists, cooperative behavior may have evolved first among relatives to promote the continuation of their genetic line. As communities diversified, mutual support could have broadened to include individuals not linked by blood. Another possibility is that humans cooperate to gain some advantage, such as boosting reputation. Finally, evolutionary processes take place at the group level. Groups of highly cooperative individuals have higher chances of survival because they can work together to reach goals that are unattainable to less cooperative groups.",
      "Yet almost no behavior is entirely genetic, even among identical twins. Culture, schooling and parenting are important determinants of cooperation. Thus, the degree to which we act cooperatively or selfishly is unique to each individual and depends on a variety of genetic and environmental influences."
    ],
    "questionText": "What is the finding of one recent study about being selfish?",
    "options": [
      "A. It may bring certain benefits in the short term.",
      "B. It usually yields more disadvantages than advantages.",
      "C. It serves individual interest rather than a collective's.",
      "D. It may give way to cooperating in the long run."
    ],
    "answer": "A",
    "evidenceSentence": "It found that being selfish was more advantageous than cooperating. The benefit may be short-lived, however.",
    "trapType": "偷换概念",
    "hintSteps": [
      "用题干关键词 one recent study 精准定位至第二段第二至四句。",
      "把两句合在一起看：研究发现自私比合作更有优势，但紧接着说“这种好处可能是短暂的（The benefit may be short-lived）”。",
      "排雷：B 项与原文 more advantageous 相反；D 项把“另一项研究中合作者长期表现更好”偷换成了“自私会给合作让步”。"
    ]
  },
  {
    "id": "q_rd_04",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_main",
    "difficulty": 3,
    "source": "2026.06 第1套 Passage 2 Q55",
    "title": "慷慨还是自私：末段隐含推论题",
    "passageTitle": "Are Humans Fundamentally Generous or Selfish?",
    "passageParagraphs": [
      "It is still controversial whether we are fundamentally generous or selfish and whether these tendencies are shaped by our genes or environment. Some evidence points to humans being born cooperative. At later stages in life we routinely work together to reach goals and help out in times of need.",
      "Yet instances of selfish behavior are also plenty. One recent study tested people's willingness to set aside selfish interests to reach a greater good. It found that being selfish was more advantageous than cooperating. The benefit may be short-lived, however. Another study showed that players who cooperated did better in the long run.",
      "It seems that human nature supports both pro-social and selfish traits. Genetic studies have made some progress toward identifying their biological roots. By comparing identical twins, who share nearly 100 percent of their genes, and non-identical twins, who share about half, researchers have found overwhelming evidence for genetic effects on behaviors. In these twin studies, identical and non-identical twins are asked, for example, to split a sum of money with a peer. Such studies often also rely on careful psychological assessments and DNA analysis.",
      "Other work highlights specific genes as key players. My colleagues and I recently identified a gene linked to altruistic behavior and found that a particular variant of it was associated with more selfish behavior in preschoolers.",
      "According to evolutionary scientists, cooperative behavior may have evolved first among relatives to promote the continuation of their genetic line. As communities diversified, mutual support could have broadened to include individuals not linked by blood. Another possibility is that humans cooperate to gain some advantage, such as boosting reputation. Finally, evolutionary processes take place at the group level. Groups of highly cooperative individuals have higher chances of survival because they can work together to reach goals that are unattainable to less cooperative groups.",
      "Yet almost no behavior is entirely genetic, even among identical twins. Culture, schooling and parenting are important determinants of cooperation. Thus, the degree to which we act cooperatively or selfishly is unique to each individual and depends on a variety of genetic and environmental influences."
    ],
    "questionText": "What can we infer from the last paragraph?",
    "options": [
      "A. Cooperative behavior is evident among identical twins.",
      "B. One is born either cooperative or non-cooperative.",
      "C. Genes determine one's tendency to cooperate.",
      "D. Cooperative behavior may be cultivated."
    ],
    "answer": "D",
    "evidenceSentence": "Culture, schooling and parenting are important determinants of cooperation.",
    "trapType": "绝对化",
    "hintSteps": [
      "明确题干限定区域：the last paragraph（最后一段）。",
      "抓末段核心转折 Yet almost no behavior is entirely genetic —— 立刻排除过分绝对、只讲先天的 B 和 C。",
      "根据 Culture, schooling and parenting are important determinants of cooperation（文化、学校教育与家庭养育是合作的重要决定因素），自然推出合作行为是可以通过后天培养的。"
    ]
  },
  {
    "id": "q_rd_05",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_traps",
    "difficulty": 2,
    "source": "2026.06 第2套 Passage 1 Q46",
    "title": "冒充者现象：受困扰者的核心归因特征",
    "passageTitle": "Understanding the Impostor Phenomenon",
    "passageParagraphs": [
      "People who systematically underestimate themselves and their own performance suffer from the so-called Impostor Phenomenon. They think that any success is due to external circumstances or just luck and chance. Those people live in constant fear that their \"deception\" will be exposed.",
      "It is common for people to question their abilities now and again. A healthy amount of reflection and self-doubt can protect a person from acting impulsively. However, there are people who are permanently plagued by a massive amount of self-doubt despite delivering a good performance. They think that all of their successes are not a product of their skill or hard work, instead they attribute their own successes to external circumstances, for example, to luck and chance, or believe that their performance is massively overestimated by others. Failures, on the other hand, are always internalised as the result of their own shortcomings.",
      "Psychologists from Martin Luther University Halle-Wittenberg examined the topic for the first time under real-life conditions. Seventy-six participants completed a range of intelligence tests and received positive feedback on them, regardless of their actual performance. They were then asked why they think they did so well.",
      "The study showed two things: First, the self-reported degree of Impostor Phenomenon is not related to actual measured intelligence or performance. Secondly, the test supported the assumption that people with a tendency to exhibit the Impostor Phenomenon devalue their objectively measured performance and attribute positive results to external causes such as luck and chance, but not to their own abilities. These results are also completely unrelated to age and gender.",
      "A permanent underestimation of one's own abilities is often accompanied by the fear that this supposed intellectual deception will be exposed sooner or later and that they will pay the price for this. The Impostor Phenomenon was first described in 1978 by US psychologists Pauline Clance and Suzanne Imes. They observed that there is a particularly high number of successful women who do not think they are very intelligent. The Impostor Phenomenon is not defined as a mental illness. However, people who suffer from it show a higher vulnerability to depression."
    ],
    "questionText": "What do we learn from the passage about people who suffer from the so-called Impostor Phenomenon?",
    "options": [
      "A. They systematically underestimate their chance of success.",
      "B. They tend to attribute their achievements to good fortune.",
      "C. They seem to live in constant fear of being deceived.",
      "D. They generally rely on luck and chance for success."
    ],
    "answer": "B",
    "evidenceSentence": "They think that any success is due to external circumstances or just luck and chance.",
    "trapType": "偷换概念",
    "hintSteps": [
      "回文定位第一段三句话，警惕三个“近原词偷换”的强干扰项 A、C、D！",
      "逐个拆穿陷阱：A 项把 underestimate themselves and their own performance 偷换成了 underestimate their chance；C 项把“怕自己的欺骗被揭穿”偷换成了“怕被别人欺骗（being deceived）”；D 项把“主观归因于运气”偷换成了“客观上靠运气成功”。",
      "定位第二句 They think that any success is due to ... luck and chance，精准对应 attribute their achievements to good fortune。"
    ]
  },
  {
    "id": "q_rd_06",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_traps",
    "difficulty": 2,
    "source": "2026.06 第2套 Passage 1 Q50",
    "title": "冒充者现象：并非精神疾病但更易抑郁",
    "passageTitle": "Understanding the Impostor Phenomenon",
    "passageParagraphs": [
      "People who systematically underestimate themselves and their own performance suffer from the so-called Impostor Phenomenon. They think that any success is due to external circumstances or just luck and chance. Those people live in constant fear that their \"deception\" will be exposed.",
      "It is common for people to question their abilities now and again. A healthy amount of reflection and self-doubt can protect a person from acting impulsively. However, there are people who are permanently plagued by a massive amount of self-doubt despite delivering a good performance. They think that all of their successes are not a product of their skill or hard work, instead they attribute their own successes to external circumstances, for example, to luck and chance, or believe that their performance is massively overestimated by others. Failures, on the other hand, are always internalised as the result of their own shortcomings.",
      "Psychologists from Martin Luther University Halle-Wittenberg examined the topic for the first time under real-life conditions. Seventy-six participants completed a range of intelligence tests and received positive feedback on them, regardless of their actual performance. They were then asked why they think they did so well.",
      "The study showed two things: First, the self-reported degree of Impostor Phenomenon is not related to actual measured intelligence or performance. Secondly, the test supported the assumption that people with a tendency to exhibit the Impostor Phenomenon devalue their objectively measured performance and attribute positive results to external causes such as luck and chance, but not to their own abilities. These results are also completely unrelated to age and gender.",
      "A permanent underestimation of one's own abilities is often accompanied by the fear that this supposed intellectual deception will be exposed sooner or later and that they will pay the price for this. The Impostor Phenomenon was first described in 1978 by US psychologists Pauline Clance and Suzanne Imes. They observed that there is a particularly high number of successful women who do not think they are very intelligent. The Impostor Phenomenon is not defined as a mental illness. However, people who suffer from it show a higher vulnerability to depression."
    ],
    "questionText": "What did US psychologists Pauline Clance and Suzanne Imes say about Impostor Phenomenon sufferers?",
    "options": [
      "A. They are more liable to have depression.",
      "B. They seldom realise their potential fully.",
      "C. They will develop mental illnesses.",
      "D. They will pay higher prices one day."
    ],
    "answer": "A",
    "evidenceSentence": "However, people who suffer from it show a higher vulnerability to depression.",
    "trapType": "绝对化",
    "hintSteps": [
      "凭人名 Pauline Clance and Suzanne Imes 直接定位至最后一段。",
      "抓段尾强转折句：The Impostor Phenomenon is not defined as a mental illness. However, people who suffer from it show a higher vulnerability to depression。",
      "识别绝对化陷阱 C（原文明确说并非精神疾病）与夸张项 D，掌握高频同义替换 higher vulnerability to = more liable to。"
    ]
  },
  {
    "id": "q_rd_07",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_main",
    "difficulty": 1,
    "source": "2026.06 第2套 Passage 2 Q51",
    "title": "全球通用语言：音乐为何至关重要？",
    "passageTitle": "Music Is a Universal Language",
    "passageParagraphs": [
      "Music is a universal language. In every culture and country, you will find music. It is vitally important across the globe and has the potential to bring people together in peace and harmony. One of my favorite experiences in music is seeing musicians from different cultures come together and perform as a group. When each culture brings its own unique qualities to the group, an entirely new sound is achieved. This can create extraordinary results. People can communicate with each other using music as the common language.",
      "One common musical thread between cultures is known as the pentatonic scale. It is astonishing how many cultures share this tool in approaching music. The pentatonic scale consists of five notes; \"penta-\" meaning 5, and \"tonic\" meaning tone or note. This scale can be found in music everywhere including that of Native Americans, Africans, and Asians. It is also found in popular music, blues, jazz, and rock. Using this five-note scale, musicians from around the globe have a medium through which they can relate, communicate, perform, and ultimately understand each other.",
      "Music is tied to specific perceptual, mental, and emotional faculties, including language (all societies put words to their songs), motor control (people in all societies dance), sound analysis (all musical systems have a distinct pitch and quality), and aesthetics (their tunes and rhythms are balanced between repetitiveness and chaos).",
      "There is no known society that existed without music. Although each culture has their own specific style and approach to music, you will find that the purposes behind music are very similar across the board. Music essentially serves to express or change emotions. It can cheer you up, sadden you, anger you or excite you. Music is often ceremonial: used in religion, ceremony, and celebration. Music can simply be recreational: entertaining, joyful and fun. Any way you have used music, it is almost certain that every other culture has used music in the very same way. And that is something that bonds all of us. We all share a deep love for music and it has the power to unite us."
    ],
    "questionText": "In what way is music important?",
    "options": [
      "A. It is able to create novel and extraordinary emotions.",
      "B. It has the power to unite people throughout the world.",
      "C. It allows different cultural groups to sing in harmony.",
      "D. It is the only language favored by all peoples of the world."
    ],
    "answer": "B",
    "evidenceSentence": "It is vitally important across the globe and has the potential to bring people together in peace and harmony.",
    "trapType": "绝对化",
    "hintSteps": [
      "定位第一段第三句（出现 vitally important），同时可对照全文最后一句 it has the power to unite us。",
      "迅速排雷：D 项出现极端绝对词 the only language，直接排除；A 项将“创造新声音（new sound）”偷换为“非凡情绪”；C 项把“和平共处（in peace and harmony）”窄化为“一起合唱”。",
      "抓核心同义替换：across the globe -> throughout the world；bring people together -> unite people。"
    ]
  },
  {
    "id": "q_rd_08",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_main",
    "difficulty": 2,
    "source": "2026.06 第2套 Passage 2 Q54",
    "title": "全球通用语言：音乐在人类生活中的根本功能",
    "passageTitle": "Music Is a Universal Language",
    "passageParagraphs": [
      "Music is a universal language. In every culture and country, you will find music. It is vitally important across the globe and has the potential to bring people together in peace and harmony. One of my favorite experiences in music is seeing musicians from different cultures come together and perform as a group. When each culture brings its own unique qualities to the group, an entirely new sound is achieved. This can create extraordinary results. People can communicate with each other using music as the common language.",
      "One common musical thread between cultures is known as the pentatonic scale. It is astonishing how many cultures share this tool in approaching music. The pentatonic scale consists of five notes; \"penta-\" meaning 5, and \"tonic\" meaning tone or note. This scale can be found in music everywhere including that of Native Americans, Africans, and Asians. It is also found in popular music, blues, jazz, and rock. Using this five-note scale, musicians from around the globe have a medium through which they can relate, communicate, perform, and ultimately understand each other.",
      "Music is tied to specific perceptual, mental, and emotional faculties, including language (all societies put words to their songs), motor control (people in all societies dance), sound analysis (all musical systems have a distinct pitch and quality), and aesthetics (their tunes and rhythms are balanced between repetitiveness and chaos).",
      "There is no known society that existed without music. Although each culture has their own specific style and approach to music, you will find that the purposes behind music are very similar across the board. Music essentially serves to express or change emotions. It can cheer you up, sadden you, anger you or excite you. Music is often ceremonial: used in religion, ceremony, and celebration. Music can simply be recreational: entertaining, joyful and fun. Any way you have used music, it is almost certain that every other culture has used music in the very same way. And that is something that bonds all of us. We all share a deep love for music and it has the power to unite us."
    ],
    "questionText": "What is the fundamental role of music in people's life?",
    "options": [
      "A. To bring them together.",
      "B. To show their identity.",
      "C. To express their emotions.",
      "D. To keep them entertained."
    ],
    "answer": "C",
    "evidenceSentence": "Music essentially serves to express or change emotions.",
    "trapType": "局部以偏概全",
    "hintSteps": [
      "抓题干核心修饰词 fundamental（根本的、本质的），迅速回文寻找副词 essentially（本质上）。",
      "在第四段第三句精准定位 Music essentially serves to express or change emotions。",
      "排雷：D 项 entertained 对应后文的“也可仅仅作为娱乐（can simply be recreational）”，属于次要功能而非 fundamental role；A 项是宏观社会效应而非第四段所指的根本功能。"
    ]
  },
  {
    "id": "q_rd_09",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_detail",
    "difficulty": 2,
    "source": "2026.06 第3套 Passage 1 Q48",
    "title": "道德厌恶之谜：为何在儿童成长中出现很晚？",
    "passageTitle": "Physical Disgust vs. Moral Disgust",
    "passageParagraphs": [
      "Disgust is a universal human emotion. One type of disgust is called physical disgust, which protects us from eating or touching things that could be dangerous for us, such as raw meat or insects. Children experience physical disgust from a very early age, but do not achieve an understanding of the concept until they are around four years old.",
      "Some researchers maintain that there is another type of disgust, called moral disgust, that protects us from engaging in activities that can be perceived as morally wrong. Examples of moral disgust are stealing, lying or cheating.",
      "However, not all academics think that moral disgust really exists. Some say that when we refer to disgust in relation to moral issues, we are using disgust as a metaphor, and what we are feeling is in reality anger.",
      "If moral disgust appears quite late in development, it makes sense to think that there is actually a social component to it. Children learn about emotions in many different ways. Of special relevance are parents-children conversations about emotions. Indeed, children whose parents talk about emotions often have a better emotional understanding than children whose parents do not discuss emotions often. However, there are no studies that have examined how parents and children talk about disgust. This is what we set up to examine in our study.",
      "We asked 68 English-speaking mothers and their four-, six- or eight-year-old children to discuss some stories about moral and physical disgust. Our preliminary findings show mothers and children do talk about disgust, but mainly about physical disgust and not so much about moral disgust. When we asked mothers and children to discuss moral issues, such as whether it is OK to play with a child who has stolen someone else's snack, they linked this type of moral wrongdoing with the emotion of anger and not disgust.",
      "Does this mean that moral disgust does not exist? Some researchers suggest moral disgust exists in adults. Our findings suggest that moral disgust is either understood at a later age or is only used metaphorically, if at all, in children as old as eight years."
    ],
    "questionText": "Why does moral disgust appear quite late in children's development?",
    "options": [
      "A. It needs to be learnt through social interactions.",
      "B. They have little control over its learning process.",
      "C. It is too complex for them to acquire.",
      "D. Their parents seldom talk about emotions."
    ],
    "answer": "A",
    "evidenceSentence": "If moral disgust appears quite late in development, it makes sense to think that there is actually a social component to it.",
    "trapType": "过度推断",
    "hintSteps": [
      "用题干原词 appears quite late in development 一步定位至第四段首句。",
      "顺着首句向下读两句：it makes sense to think that there is actually a social component to it. Children learn about emotions in many different ways. Of special relevance are parents-children conversations...",
      "排除无中生有与过度推断项 B、C、D（原文并未说多数父母很少谈论情绪，只是对比了常谈与不常谈的差异），锁定与 social component + conversations 对应的选项。"
    ]
  },
  {
    "id": "q_rd_10",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_main",
    "difficulty": 3,
    "source": "2026.06 第3套 Passage 1 Q50",
    "title": "道德厌恶之谜：研究发现的最终推论",
    "passageTitle": "Physical Disgust vs. Moral Disgust",
    "passageParagraphs": [
      "Disgust is a universal human emotion. One type of disgust is called physical disgust, which protects us from eating or touching things that could be dangerous for us, such as raw meat or insects. Children experience physical disgust from a very early age, but do not achieve an understanding of the concept until they are around four years old.",
      "Some researchers maintain that there is another type of disgust, called moral disgust, that protects us from engaging in activities that can be perceived as morally wrong. Examples of moral disgust are stealing, lying or cheating.",
      "However, not all academics think that moral disgust really exists. Some say that when we refer to disgust in relation to moral issues, we are using disgust as a metaphor, and what we are feeling is in reality anger.",
      "If moral disgust appears quite late in development, it makes sense to think that there is actually a social component to it. Children learn about emotions in many different ways. Of special relevance are parents-children conversations about emotions. Indeed, children whose parents talk about emotions often have a better emotional understanding than children whose parents do not discuss emotions often. However, there are no studies that have examined how parents and children talk about disgust. This is what we set up to examine in our study.",
      "We asked 68 English-speaking mothers and their four-, six- or eight-year-old children to discuss some stories about moral and physical disgust. Our preliminary findings show mothers and children do talk about disgust, but mainly about physical disgust and not so much about moral disgust. When we asked mothers and children to discuss moral issues, such as whether it is OK to play with a child who has stolen someone else's snack, they linked this type of moral wrongdoing with the emotion of anger and not disgust.",
      "Does this mean that moral disgust does not exist? Some researchers suggest moral disgust exists in adults. Our findings suggest that moral disgust is either understood at a later age or is only used metaphorically, if at all, in children as old as eight years."
    ],
    "questionText": "What can we infer about moral disgust from the author and his colleagues' findings?",
    "options": [
      "A. It is a notion hardly comprehensible to children.",
      "B. It rarely exists in children younger than eight.",
      "C. It is a term most parents use when talking to children.",
      "D. It exists in adults with a strong sense of justice."
    ],
    "answer": "A",
    "evidenceSentence": "Our findings suggest that moral disgust is either understood at a later age or is only used metaphorically, if at all, in children as old as eight years.",
    "trapType": "过度推断",
    "hintSteps": [
      "定位至末段最后一句 Our findings suggest that ...，注意仔细读懂“either ... or ...”并列结构。",
      "原文说明：道德厌恶要么要到更大年龄才被理解（understood at a later age），要么即使在八岁儿童中也仅仅是隐喻用法，甚至根本不用（if at all）。",
      "对比 A 和 B：注意本卷面第 50 题官方核对答案为 A（对于儿童而言，道德厌恶是一个难以理解的概念），而 C 项与原文相反，D 项“强烈正义感”属无中生有。"
    ]
  },
  {
    "id": "q_rd_11",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_main",
    "difficulty": 2,
    "source": "2026.06 第3套 Passage 2 Q51",
    "title": "互惠错觉：了解陌生人为何会让我们更诚实？",
    "passageTitle": "The Illusion of Reciprocal Knowledge",
    "passageParagraphs": [
      "After finding out details about a stranger, we mistakenly think that they also know about us. As a result, we act more honestly around them, according to a recent study in Nature.",
      "Past research has found that we tend to assume social relationships are reciprocal. Most of the time, this assumption is accurate: someone you think of as a friend will usually consider you a friend too. But sometimes our social ties are more one-sided: for example, you might learn something about a stranger who doesn't know you at all. Researchers Anuj Shah and Michael LaForest wondered whether our tendency to believe that social ties are reciprocal could lead us to mistakenly feel that a stranger does actually know us.",
      "In a series of lab-based studies, this is exactly what the researchers found. When we know about strangers, we erroneously think they also know about us. But the really interesting finding came when the researchers stepped out of the lab, to conduct a field experiment. The team developed leaflets containing fairly ordinary information about local community police officers, such as their favourite food, hobbies, or reasons for joining the police force. They then sent out these leaflets to every apartment in a number of housing developments in disadvantaged areas. The officers themselves also dropped off cards to local residents containing similar information.",
      "Two months later, the researchers surveyed residents at these housing developments as well as control areas that did not receive leaflets or outreach cards. Residents were asked to imagine that they had committed a crime and how likely it would be that local officers would find out about it. They also rated how well the officers in the area knew them.",
      "The team found that residents of the developments that had received the leaflets believed it more likely that local officers would find out about illegal activity than residents of the control areas. Even more strikingly, the team found that immediately after the leaflet distribution, there were fewer criminal complaints and arrests in the areas around the developments that had received the leaflets than around the control developments."
    ],
    "questionText": "What is the finding of a recent study in Nature?",
    "options": [
      "A. People are more honest with those who know them than with total strangers.",
      "B. People we want to have detailed information about are keen to know about us.",
      "C. People who get to know about a person wrongly assume the person knows them too.",
      "D. People who are familiar with each other tend to behave honestly in their everyday dealings."
    ],
    "answer": "C",
    "evidenceSentence": "After finding out details about a stranger, we mistakenly think that they also know about us.",
    "trapType": "偷换概念",
    "hintSteps": [
      "首题直接锁定第一段出现 Nature 的开头两句。",
      "核对精准同义替换：finding out details about -> get to know about；mistakenly think -> wrongly assume；they also know about us -> the person knows them too。",
      "排雷：A、D 项都在讲“彼此熟识或对方认识自己”，完全遗漏了原文最核心的“单向误以为（mistakenly think）”；B 项偷换为“对方渴望了解我们”。"
    ]
  },
  {
    "id": "q_rd_12",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_traps",
    "difficulty": 2,
    "source": "2026.06 第3套 Passage 2 Q55",
    "title": "互惠错觉：派发社区警察传单后的实际效果",
    "passageTitle": "The Illusion of Reciprocal Knowledge",
    "passageParagraphs": [
      "After finding out details about a stranger, we mistakenly think that they also know about us. As a result, we act more honestly around them, according to a recent study in Nature.",
      "Past research has found that we tend to assume social relationships are reciprocal. Most of the time, this assumption is accurate: someone you think of as a friend will usually consider you a friend too. But sometimes our social ties are more one-sided: for example, you might learn something about a stranger who doesn't know you at all. Researchers Anuj Shah and Michael LaForest wondered whether our tendency to believe that social ties are reciprocal could lead us to mistakenly feel that a stranger does actually know us.",
      "In a series of lab-based studies, this is exactly what the researchers found. When we know about strangers, we erroneously think they also know about us. But the really interesting finding came when the researchers stepped out of the lab, to conduct a field experiment. The team developed leaflets containing fairly ordinary information about local community police officers, such as their favourite food, hobbies, or reasons for joining the police force. They then sent out these leaflets to every apartment in a number of housing developments in disadvantaged areas. The officers themselves also dropped off cards to local residents containing similar information.",
      "Two months later, the researchers surveyed residents at these housing developments as well as control areas that did not receive leaflets or outreach cards. Residents were asked to imagine that they had committed a crime and how likely it would be that local officers would find out about it. They also rated how well the officers in the area knew them.",
      "The team found that residents of the developments that had received the leaflets believed it more likely that local officers would find out about illegal activity than residents of the control areas. Even more strikingly, the team found that immediately after the leaflet distribution, there were fewer criminal complaints and arrests in the areas around the developments that had received the leaflets than around the control developments."
    ],
    "questionText": "What happened in the areas around the housing developments subjected to the studies?",
    "options": [
      "A. They saw fewer crimes than the control developments.",
      "B. They witnessed a swifter elimination of illegal activities.",
      "C. Local police responded more quickly to criminal complaints than before.",
      "D. Local police related better to residents there than to those in other areas."
    ],
    "answer": "A",
    "evidenceSentence": "Even more strikingly, the team found that immediately after the leaflet distribution, there were fewer criminal complaints and arrests in the areas around the developments that had received the leaflets than around the control developments.",
    "trapType": "过度推断",
    "hintSteps": [
      "最后一道细节题定位在末段末句（Even more strikingly...）。",
      "抓比较级事实：收到传单的住宅区周边比对照组（control developments）出现了更少的刑事投诉和逮捕（fewer criminal complaints and arrests）。",
      "排雷：B 项“更快彻底消除（elimination）违法活动”程度过重，C 项“出警更快”、D 项“警民关系更好”均属原文未提及的过度推断。"
    ]
  },
  {
    "id": "q_rd_13",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_main",
    "difficulty": 2,
    "source": "2024.06 第1套 Passage 1 Q46",
    "title": "停止讨好型人格：老子名言的核心寓意",
    "passageTitle": "Stop Seeking Self-Worth Through Others' Approval",
    "passageParagraphs": [
      "Lao Zi once said, \"Care about what other people think and you will always be their prisoner.\" People-pleasing, or seeking self-worth through others' approval, is unproductive and an exhausting way to go through life. Why do we allow what others think of us to have so much power over how we feel about ourselves? If it's true that you can't please all people all of the time, wouldn't it make sense to stop trying?",
      "Unfortunately, sense often isn't driving our behavior. For social beings who desire love and belonging, wanting to be liked, and caring about the effect we have on others, is healthy and allows us to make connections. However, where we get into trouble is when our self-worth is dependent upon whether we win someone's approval or not.",
      "This need to be liked can be traced back to when we were children and were completely dependent on others to take care of us. Small children are not just learning how to walk and communicate, they are also trying to learn how the world works. We learn about who we are and what is expected of us based on interactions with others so, to a four-year-old, if Mommy or Daddy doesn't like him or her, there is the danger that they will abandon them. We need to understand that when we desperately want someone to approve of us, it's being driven by that little kid part of us that is still terrified of abandonment.",
      "As you become more capable of providing yourself with the approval you seek, your need for external validation will start to vanish, leaving you stronger, more confident, and yes, happier in your life. Imagine how much time we lose each moment we restrain our authentic selves in an effort to be liked.",
      "If we base our worth on the opinions of others, we cheat ourselves of the power to shape our experiences and embrace life not only for others but also for ourselves, because ultimately, there is no difference. So embrace the cliché and love yourself as it's highly doubtful that you'll regret it."
    ],
    "questionText": "What can we conclude from Lao Zi's quotation?",
    "options": [
      "A. We should see through other people's attempt to make a prisoner of us.",
      "B. We can never really please other people even if we try as hard as we can.",
      "C. We can never be truly free if taking to heart others' opinion of us.",
      "D. We should care about other people's view as much as they care about our own."
    ],
    "answer": "C",
    "evidenceSentence": "Lao Zi once said, \"Care about what other people think and you will always be their prisoner.\"",
    "trapType": "偷换概念",
    "hintSteps": [
      "定位首段第一句老子引语：Care about what other people think and you will always be their prisoner。",
      "理解隐喻转换：always be their prisoner（永远做他人的囚徒）正话反说就是“永远无法获得真正自由（never be truly free）”。",
      "排雷：A 项曲解为“别人企图囚禁我们”；B 项对应的是后文“无法一直讨好所有人”，而非老子名言的含义；D 项与原意完全相反。"
    ]
  },
  {
    "id": "q_rd_14",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_detail",
    "difficulty": 2,
    "source": "2024.06 第1套 Passage 1 Q48",
    "title": "停止讨好型人格：渴望被认可的童年根源",
    "passageTitle": "Stop Seeking Self-Worth Through Others' Approval",
    "passageParagraphs": [
      "Lao Zi once said, \"Care about what other people think and you will always be their prisoner.\" People-pleasing, or seeking self-worth through others' approval, is unproductive and an exhausting way to go through life. Why do we allow what others think of us to have so much power over how we feel about ourselves? If it's true that you can't please all people all of the time, wouldn't it make sense to stop trying?",
      "Unfortunately, sense often isn't driving our behavior. For social beings who desire love and belonging, wanting to be liked, and caring about the effect we have on others, is healthy and allows us to make connections. However, where we get into trouble is when our self-worth is dependent upon whether we win someone's approval or not.",
      "This need to be liked can be traced back to when we were children and were completely dependent on others to take care of us. Small children are not just learning how to walk and communicate, they are also trying to learn how the world works. We learn about who we are and what is expected of us based on interactions with others so, to a four-year-old, if Mommy or Daddy doesn't like him or her, there is the danger that they will abandon them. We need to understand that when we desperately want someone to approve of us, it's being driven by that little kid part of us that is still terrified of abandonment.",
      "As you become more capable of providing yourself with the approval you seek, your need for external validation will start to vanish, leaving you stronger, more confident, and yes, happier in your life. Imagine how much time we lose each moment we restrain our authentic selves in an effort to be liked.",
      "If we base our worth on the opinions of others, we cheat ourselves of the power to shape our experiences and embrace life not only for others but also for ourselves, because ultimately, there is no difference. So embrace the cliché and love yourself as it's highly doubtful that you'll regret it."
    ],
    "questionText": "What may account for our need to be liked or approved of?",
    "options": [
      "A. Our desperate longing for interactions with others.",
      "B. Our understanding of the workings of the world.",
      "C. Our knowledge about the pain of abandonment.",
      "D. Our early childhood fear of being deserted."
    ],
    "answer": "D",
    "evidenceSentence": "We need to understand that when we desperately want someone to approve of us, it's being driven by that little kid part of us that is still terrified of abandonment.",
    "trapType": "张冠李戴",
    "hintSteps": [
      "利用题干关键词 need to be liked 定位至第三段首句（can be traced back to when we were children）及段尾总结句。",
      "识别核心情感词与同义词：little kid part -> early childhood；terrified of -> fear of；abandonment -> being deserted。",
      "警惕 C 项偷换词性/概念：不是“对被抛弃之痛的认知（knowledge）”，而是内心深处依然“害怕被抛弃（terrified of abandonment）”。"
    ]
  },
  {
    "id": "q_rd_15",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_detail",
    "difficulty": 2,
    "source": "2024.06 第1套 Passage 2 Q53",
    "title": "活到老学到老：大脑萎缩时如何保持健康？",
    "passageTitle": "Education Does an Aging Brain Good",
    "passageParagraphs": [
      "Some people have said aging is more a slide into forgetfulness than a journey towards wisdom. However, a growing body of research suggests that late-in-life learning is possible. In reality, education does an aging brain good.",
      "Throughout life, people's brains constantly renovate themselves. In the late 1960s, British brain scientist Geoffrey Raisman spied growth in damaged brain regions of rats through an electron microscope; their brains were forging new connections. This meant brains may change every time a person learns something new.",
      "Of course, that doesn't mean the brain isn't affected by the effects of time. Just as height usually declines over the years, so does brain volume: Humans lose about 4 percent every decade starting in their 40s. But that reduction doesn't necessarily make people think slower; as long as we are alive and functioning, we can alter our brains with new information and experiences.",
      "In fact, scientists now suspect accumulating novel experiences, facts, and skills can keep people's minds more flexible. New pathways can strengthen our ever-changing mental structure, even as the brain shrinks.",
      "Conventional fixes like word puzzles and brain-training apps can contribute to mental durability. Even something as simple as taking a different route to the grocery store or going somewhere new on vacation can keep the brain healthy.",
      "A desire for new life challenges can further boost brainpower. Research about aging adults who take on new enterprises shows improved function and memory as well as a reduced risk of mental disease. Openness—a characteristic defined by curiosity and a desire for knowledge—may also help folks pass brain tests. Some folks are born with this take-in-the-world attitude, but those who aren't as genetically gifted aren't necessarily out of luck. While genes can encourage an interest in doing new things, a 2012 study in the journal Psychology and Aging found completing reasoning tasks like puzzles and number games can enhance that desire for novel experiences, which can, in turn, refresh the brain. That's why brain scientist Richard Kennedy says \"It's not that old dogs can't learn new tricks. It's that maybe old dogs don't realize why they should.\""
    ],
    "questionText": "What is one thing that helps maintain the health of our brain even as it shrinks?",
    "options": [
      "A. Doing daily routines by conventional means.",
      "B. Avoiding worrying about our mental durability.",
      "C. Imitating old dogs' way of learning new tricks.",
      "D. Approaching everyday tasks in novel ways."
    ],
    "answer": "D",
    "evidenceSentence": "Even something as simple as taking a different route to the grocery store or going somewhere new on vacation can keep the brain healthy.",
    "trapType": "偷换概念",
    "hintSteps": [
      "顺着第四段末尾 even as the brain shrinks 紧接着往下读第五段，寻找具体保脑方法。",
      "读懂第五段例子：换条路去杂货店、换个新地方度假——本质就是用新奇方式做日常小事。",
      "排除强干扰 A 项：原文 conventional fixes 指的是填字游戏和健脑 App 等常规工具，而不是“墨守成规做日常事务（by conventional means）”，A 项与后文 taking a different route 恰恰相反。"
    ]
  },
  {
    "id": "q_rd_16",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_traps",
    "difficulty": 3,
    "source": "2024.06 第1套 Passage 2 Q55",
    "title": "活到老学到老：2012年心理学研究的因果链",
    "passageTitle": "Education Does an Aging Brain Good",
    "passageParagraphs": [
      "Some people have said aging is more a slide into forgetfulness than a journey towards wisdom. However, a growing body of research suggests that late-in-life learning is possible. In reality, education does an aging brain good.",
      "Throughout life, people's brains constantly renovate themselves. In the late 1960s, British brain scientist Geoffrey Raisman spied growth in damaged brain regions of rats through an electron microscope; their brains were forging new connections. This meant brains may change every time a person learns something new.",
      "Of course, that doesn't mean the brain isn't affected by the effects of time. Just as height usually declines over the years, so does brain volume: Humans lose about 4 percent every decade starting in their 40s. But that reduction doesn't necessarily make people think slower; as long as we are alive and functioning, we can alter our brains with new information and experiences.",
      "In fact, scientists now suspect accumulating novel experiences, facts, and skills can keep people's minds more flexible. New pathways can strengthen our ever-changing mental structure, even as the brain shrinks.",
      "Conventional fixes like word puzzles and brain-training apps can contribute to mental durability. Even something as simple as taking a different route to the grocery store or going somewhere new on vacation can keep the brain healthy.",
      "A desire for new life challenges can further boost brainpower. Research about aging adults who take on new enterprises shows improved function and memory as well as a reduced risk of mental disease. Openness—a characteristic defined by curiosity and a desire for knowledge—may also help folks pass brain tests. Some folks are born with this take-in-the-world attitude, but those who aren't as genetically gifted aren't necessarily out of luck. While genes can encourage an interest in doing new things, a 2012 study in the journal Psychology and Aging found completing reasoning tasks like puzzles and number games can enhance that desire for novel experiences, which can, in turn, refresh the brain. That's why brain scientist Richard Kennedy says \"It's not that old dogs can't learn new tricks. It's that maybe old dogs don't realize why they should.\""
    ],
    "questionText": "What is the finding of the 2012 study in the journal Psychology and Aging?",
    "options": [
      "A. Wishing to solve puzzles enhances one's reasoning power.",
      "B. Playing number games unexpectedly stimulates one's memory.",
      "C. Desiring new experiences can help to renovate the brain.",
      "D. Learning new tricks should not be confined to old dogs only."
    ],
    "answer": "C",
    "evidenceSentence": "While genes can encourage an interest in doing new things, a 2012 study in the journal Psychology and Aging found completing reasoning tasks like puzzles and number games can enhance that desire for novel experiences, which can, in turn, refresh the brain.",
    "trapType": "张冠李戴",
    "hintSteps": [
      "用年份与期刊名 2012 study / Psychology and Aging 一步锁定末段倒数第三句。",
      "理清句内三步因果链：完成推理任务（解谜、数字游戏）-> 增强对新体验的渴望（desire for novel experiences）-> 进而焕新大脑（refresh the brain）。",
      "拆穿张冠李戴干扰项：A 项把因果搞反（原文是解谜增强对新体验的渴望，不是“渴望解谜增强推理”）；B 项偷换结果（原文未提刺激 memory）；D 项曲解末句谚语。"
    ]
  },
  {
    "id": "q_rd_17",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_traps",
    "difficulty": 2,
    "source": "2018.06 第1套 Passage 1 Q47",
    "title": "健忘还是失智：大脑衰老时会发生什么？",
    "passageTitle": "Memory Slips vs. Signs of Dementia",
    "passageParagraphs": [
      "Losing your ability to think and remember is pretty scary. We know the risk of dementia increases with age. But if you have memory slips, you probably needn't worry. There are pretty clear differences between signs of dementia and age-related memory loss.",
      "After age 50, it's quite common to have trouble remembering the names of people, places and things quickly, says Dr. Kirk Daffner of Brigham and Women's Hospital in Boston.",
      "The brain ages just like the rest of the body. Certain parts shrink, especially areas in the brain that are important to learning, memory and planning. Changes in brain cells can affect communication between different regions of the brain. And blood flow can be reduced as blood vessels narrow.",
      "Forgetting the name of an actor in a favorite movie, for example, is nothing to worry about. But if you forget the plot of the movie or don't remember even seeing it, that's far more concerning, Daffner says.",
      "When you forget entire experiences, he says, that's \"a red flag that something more serious may be involved.\" Forgetting how to operate a familiar object like a microwave oven, or forgetting how to drive to the house of a friend you've visited many times before can also be signs of something going wrong.",
      "But even then, Daffner says, people shouldn't panic. There are many things that can cause confusion and memory loss, including health problems like temporary stoppage of breathing during sleep, high blood pressure, or depression, as well as medications like antidepressants.",
      "You don't have to figure this out on your own. Daffner suggests going to your doctor to check on medications, health problems and other issues that could be affecting memory. And the best defense against memory loss is to try to prevent it by building up your brain's cognitive reserve, Daffner says.",
      "\"Read books, go to movies, take on new hobbies or activities that force one to think in novel ways,\" he says. In other words, keep your brain busy and working. And also get physically active, because exercise is a known brain booster."
    ],
    "questionText": "What happens as we become aged according to the passage?",
    "options": [
      "A. Our interaction skills deteriorate.",
      "B. Some parts of our brain stop functioning.",
      "C. Communication within our brain weakens.",
      "D. Our whole brain starts shrinking."
    ],
    "answer": "C",
    "evidenceSentence": "Changes in brain cells can affect communication between different regions of the brain.",
    "trapType": "局部以偏概全",
    "hintSteps": [
      "定位至第三段关于大脑衰老的生理变化描述。",
      "逐个排雷：D 项将“大脑的某些部位萎缩（Certain parts shrink）”夸大为“整个大脑萎缩（whole brain）”，属于典型局部以偏概全；B 项将“萎缩”夸大为“停止运转（stop functioning）”；A 项将“脑区之间的信号交流”偷换为“人际社交能力（interaction skills）”。",
      "核对第三句：affect communication between different regions of the brain -> Communication within our brain weakens。"
    ]
  },
  {
    "id": "q_rd_18",
    "skill": "reading",
    "type": "reading",
    "sectionId": "t_read_detail",
    "difficulty": 1,
    "source": "2018.06 第1套 Passage 1 Q50",
    "title": "健忘还是失智：达夫纳医生的健脑建议",
    "passageTitle": "Memory Slips vs. Signs of Dementia",
    "passageParagraphs": [
      "Losing your ability to think and remember is pretty scary. We know the risk of dementia increases with age. But if you have memory slips, you probably needn't worry. There are pretty clear differences between signs of dementia and age-related memory loss.",
      "After age 50, it's quite common to have trouble remembering the names of people, places and things quickly, says Dr. Kirk Daffner of Brigham and Women's Hospital in Boston.",
      "The brain ages just like the rest of the body. Certain parts shrink, especially areas in the brain that are important to learning, memory and planning. Changes in brain cells can affect communication between different regions of the brain. And blood flow can be reduced as blood vessels narrow.",
      "Forgetting the name of an actor in a favorite movie, for example, is nothing to worry about. But if you forget the plot of the movie or don't remember even seeing it, that's far more concerning, Daffner says.",
      "When you forget entire experiences, he says, that's \"a red flag that something more serious may be involved.\" Forgetting how to operate a familiar object like a microwave oven, or forgetting how to drive to the house of a friend you've visited many times before can also be signs of something going wrong.",
      "But even then, Daffner says, people shouldn't panic. There are many things that can cause confusion and memory loss, including health problems like temporary stoppage of breathing during sleep, high blood pressure, or depression, as well as medications like antidepressants.",
      "You don't have to figure this out on your own. Daffner suggests going to your doctor to check on medications, health problems and other issues that could be affecting memory. And the best defense against memory loss is to try to prevent it by building up your brain's cognitive reserve, Daffner says.",
      "\"Read books, go to movies, take on new hobbies or activities that force one to think in novel ways,\" he says. In other words, keep your brain busy and working. And also get physically active, because exercise is a known brain booster."
    ],
    "questionText": "What is Dr. Daffner's advice for combating memory loss?",
    "options": [
      "A. Having regular physical and mental checkups.",
      "B. Taking medicine that helps boost one's brain.",
      "C. Engaging in known memory repair activities.",
      "D. Staying active both physically and mentally."
    ],
    "answer": "D",
    "evidenceSentence": "In other words, keep your brain busy and working. And also get physically active, because exercise is a known brain booster.",
    "trapType": "无中生有",
    "hintSteps": [
      "最后一道建议题直接定位到文章最后一段。",
      "抓解释总结信号词 In other words（换言之）以及并列连接词 And also：一边让大脑保持运转（keep your brain busy and working），一边让身体动起来（get physically active）。",
      "排除 A 项（体检 checkups 属偷换概念）、B 项（吃健脑药无中生有）、C 项（记忆修复活动无中生有），直接锁定身心双活跃的 D 项。"
    ]
  },
  {
    "id": "q_tr_01",
    "skill": "translation",
    "type": "translation",
    "sectionId": "t_trans_themes",
    "difficulty": 2,
    "source": "2026.06 第1套 Part IV Translation",
    "title": "尊师重道与教师节",
    "chineseText": "中国有句老话：“一日为师，终身为父”。在中国人的观念里，老师不仅传授知识，更教给学生做人的道理。在古代，学生初次见老师时要举行隆重的仪式，足见老师地位之高。为弘扬尊师的优良传统，中国从1985年开始将每年的9月10日定为教师节。在这一天，学生以各种方式表达对老师的敬意。尊师是中华民族的传统美德，在当今社会得到了发扬光大。",
    "keyExpressions": [
      {
        "zh": "中国有句老话",
        "en": [
          "an old Chinese saying",
          "as an old Chinese saying goes",
          "there is an old Chinese saying"
        ],
        "weight": 1
      },
      {
        "zh": "传授知识",
        "en": [
          "pass on knowledge",
          "impart knowledge",
          "teach knowledge"
        ],
        "weight": 1.5
      },
      {
        "zh": "做人的道理",
        "en": [
          "how to conduct themselves",
          "how to be a good person",
          "moral principles"
        ],
        "weight": 1.5
      },
      {
        "zh": "隆重的仪式",
        "en": [
          "formal ceremony",
          "grand ceremony",
          "solemn ceremony"
        ],
        "weight": 1
      },
      {
        "zh": "弘扬尊师的优良传统",
        "en": [
          "preserve the tradition of honoring teachers",
          "promote the fine tradition of respecting teachers",
          "carry forward the tradition of respecting teachers"
        ],
        "weight": 1.5
      },
      {
        "zh": "将9月10日定为教师节",
        "en": [
          "observed Teachers' Day on September 10",
          "designated September 10 as Teachers' Day",
          "set September 10 as Teachers' Day"
        ],
        "weight": 1.5
      },
      {
        "zh": "表达对老师的敬意",
        "en": [
          "show their respect",
          "express gratitude and respect to teachers",
          "pay tribute to teachers"
        ],
        "weight": 1
      },
      {
        "zh": "传统美德",
        "en": [
          "traditional Chinese virtue",
          "traditional virtue",
          "time-honored virtue"
        ],
        "weight": 1
      }
    ],
    "structureChecklist": [
      "谚语意译：将“一日为师，终身为父”转为自然英文比较或谚语句，避免生硬字面直译。",
      "现在分词作结果状语：用 reflecting ... 衔接“足见老师地位之高”。",
      "时态准确切换：古代仪式用一般过去时（held），自 1985 年起延续至今用现在完成时（has observed）。",
      "被动语态收尾：“得到了发扬光大”用 continues to be promoted and practiced。"
    ],
    "referenceTranslation": "An old Chinese saying compares a teacher, even for a single day, to a father for life. In Chinese culture, teachers pass on knowledge and teach students how to conduct themselves. In ancient times, students held a formal ceremony when they first met their teacher, reflecting the high regard in which teachers were held. To preserve the tradition of honoring teachers, China has observed Teachers' Day on September 10 each year since 1985. On that day, students show their respect in different ways. Respect for teachers is a traditional Chinese virtue that continues to be promoted and practiced today.",
    "sentenceBreakdown": [
      {
        "zh": "中国有句老话：“一日为师，终身为父”。",
        "core": "An old Chinese saying compares a teacher to a father",
        "modifier": "even for a single day / for life（插入语与介词短语体现时间反差）",
        "en": "An old Chinese saying compares a teacher, even for a single day, to a father for life."
      },
      {
        "zh": "在中国人的观念里，老师不仅传授知识，更教给学生做人的道理。",
        "core": "teachers pass on knowledge and teach students",
        "modifier": "In Chinese culture（状语）+ how to conduct themselves（疑问词+不定式作宾语）",
        "en": "In Chinese culture, teachers pass on knowledge and teach students how to conduct themselves."
      },
      {
        "zh": "在古代，学生初次见老师时要举行隆重的仪式，足见老师地位之高。",
        "core": "students held a formal ceremony",
        "modifier": "when they first met their teacher（时间状语）+ reflecting the high regard in which teachers were held（现在分词作结果状语）",
        "en": "In ancient times, students held a formal ceremony when they first met their teacher, reflecting the high regard in which teachers were held."
      },
      {
        "zh": "为弘扬尊师的优良传统，中国从1985年开始将每年的9月10日定为教师节。",
        "core": "China has observed Teachers' Day on September 10",
        "modifier": "To preserve the tradition of honoring teachers（不定式目的状语）+ each year since 1985（现在完成时标志）",
        "en": "To preserve the tradition of honoring teachers, China has observed Teachers' Day on September 10 each year since 1985."
      },
      {
        "zh": "在这一天，学生以各种方式表达对老师的敬意。",
        "core": "students show their respect",
        "modifier": "On that day + in different ways（方式状语）",
        "en": "On that day, students show their respect in different ways."
      },
      {
        "zh": "尊师是中华民族的传统美德，在当今社会得到了发扬光大。",
        "core": "Respect for teachers is a traditional Chinese virtue",
        "modifier": "that continues to be promoted and practiced today（定语从句+被动语态）",
        "en": "Respect for teachers is a traditional Chinese virtue that continues to be promoted and practiced today."
      }
    ],
    "hintSteps": [
      "遇到中文谚语“一日为师，终身为父”，不要逐字硬译，用 compare A to B 或 A teacher for a day is a father for a lifetime 更地道。",
      "抓准三处时态节点：古代（In ancient times -> 一般过去时）、1985 年至今（since 1985 -> 现在完成时）、当今普遍事实（一般现在时）。",
      "高频文化词组提前落位：传授知识 pass on / impart knowledge，传统美德 traditional Chinese virtue，发扬光大 be promoted / carried forward。"
    ]
  },
  {
    "id": "q_tr_02",
    "skill": "translation",
    "type": "translation",
    "sectionId": "t_trans_struct",
    "difficulty": 2,
    "source": "2026.06 第2套 Part IV Translation",
    "title": "中国传统餐桌礼仪",
    "chineseText": "餐桌礼仪(dining etiquette)是中华传统文化的重要组成部分，蕴含着热情有礼的待客之道。为了招待客人，主人会根据客人的口味和喜好准备丰富精致的菜肴。就餐座位的安排非常讲究，主人坐在正对大门的位置，在主人身边就座的是最重要的客人。进餐时，主人会不时地为客人添酒加菜。这种独特的餐桌礼仪已延续了数千年，对促进和谐的人际交往起到了重要作用。",
    "keyExpressions": [
      {
        "zh": "重要组成部分",
        "en": [
          "an important part of",
          "an essential part of",
          "an integral component of"
        ],
        "weight": 1
      },
      {
        "zh": "热情有礼",
        "en": [
          "warmth and courtesy",
          "hospitality and politeness",
          "warm and polite"
        ],
        "weight": 1.5
      },
      {
        "zh": "丰富精致的菜肴",
        "en": [
          "generous selection of carefully made dishes",
          "abundant and delicate dishes",
          "rich and exquisite dishes"
        ],
        "weight": 1.5
      },
      {
        "zh": "根据客人的口味",
        "en": [
          "suit the guests' tastes",
          "according to guests' tastes and preferences",
          "cater to guests' tastes"
        ],
        "weight": 1.5
      },
      {
        "zh": "正对大门",
        "en": [
          "facing the door",
          "opposite the door",
          "facing the entrance"
        ],
        "weight": 1
      },
      {
        "zh": "最重要的客人",
        "en": [
          "guest of honor",
          "most important guest",
          "honored guest"
        ],
        "weight": 1.5
      },
      {
        "zh": "添酒加菜",
        "en": [
          "refills the guests' wine glasses and serves them more food",
          "refill wine and serve dishes",
          "add wine and food"
        ],
        "weight": 1.5
      },
      {
        "zh": "促进和谐的人际交往",
        "en": [
          "fostering harmonious relationships",
          "promoting harmonious interpersonal communication",
          "building harmonious social relations"
        ],
        "weight": 1.5
      }
    ],
    "structureChecklist": [
      "并列谓语提炼：第一句合并为 Dining etiquette is ... and reflects ...，避免流水句。",
      "被动语态转化无主句：“就餐座位的安排非常讲究”译为 Seating is arranged with particular care。",
      "现在分词作状语：facing the door 精准简洁地表达“正对大门”。",
      "高频收尾句型：have survived for thousands of years and have played an important role in doing..."
    ],
    "referenceTranslation": "Dining etiquette is an important part of traditional Chinese culture and reflects the warmth and courtesy shown to guests. A host prepares a generous selection of carefully made dishes to suit the guests' tastes. Seating is arranged with particular care: the host sits facing the door, and the guest of honor sits beside the host. During the meal, the host occasionally refills the guests' wine glasses and serves them more food. These customs have survived for thousands of years and have played an important role in fostering harmonious relationships.",
    "sentenceBreakdown": [
      {
        "zh": "餐桌礼仪是中华传统文化的重要组成部分，蕴含着热情有礼的待客之道。",
        "core": "Dining etiquette is an important part ... and reflects the warmth and courtesy",
        "modifier": "of traditional Chinese culture + shown to guests（过去分词后置定语）",
        "en": "Dining etiquette is an important part of traditional Chinese culture and reflects the warmth and courtesy shown to guests."
      },
      {
        "zh": "为了招待客人，主人会根据客人的口味和喜好准备丰富精致的菜肴。",
        "core": "A host prepares a generous selection of carefully made dishes",
        "modifier": "to suit the guests' tastes（目的不定式）",
        "en": "A host prepares a generous selection of carefully made dishes to suit the guests' tastes."
      },
      {
        "zh": "就餐座位的安排非常讲究，主人坐在正对大门的位置，在主人身边就座的是最重要的客人。",
        "core": "Seating is arranged with particular care",
        "modifier": "冒号引出具体座次：the host sits facing the door, and the guest of honor sits beside the host",
        "en": "Seating is arranged with particular care: the host sits facing the door, and the guest of honor sits beside the host."
      },
      {
        "zh": "进餐时，主人会不时地为客人添酒加菜。",
        "core": "the host occasionally refills the guests' wine glasses and serves them more food",
        "modifier": "During the meal（介词时间状语）",
        "en": "During the meal, the host occasionally refills the guests' wine glasses and serves them more food."
      },
      {
        "zh": "这种独特的餐桌礼仪已延续了数千年，对促进和谐的人际交往起到了重要作用。",
        "core": "These customs have survived ... and have played an important role",
        "modifier": "for thousands of years + in fostering harmonious relationships（动名词短语）",
        "en": "These customs have survived for thousands of years and have played an important role in fostering harmonious relationships."
      }
    ],
    "hintSteps": [
      "题干已给核心术语 dining etiquette，全篇围绕客套礼仪用一般现在时，仅尾句“已延续数千年”用现在完成时。",
      "中文第三句三个逗号分句，用英文冒号解构为“总述（Seating is arranged with particular care:）+ 两项座次并列”。",
      "地道短语加分点：“最重要的客人”用 guest of honor，“添酒”用 refill wine glasses，“起重要作用”用 play an important role in。"
    ]
  },
  {
    "id": "q_tr_03",
    "skill": "translation",
    "type": "translation",
    "sectionId": "t_trans_themes",
    "difficulty": 2,
    "source": "2026.06 第3套 Part IV Translation",
    "title": "礼尚往来与赠礼习俗",
    "chineseText": "在中国传统文化中，亲朋好友之间互赠礼物是人际交往的一种重要礼节(etiquette)。赠送礼物不仅是物质的馈赠，更是情感的表达，是维系人际关系的重要纽带。一份精心挑选、符合接受者喜好的礼物，往往能加深彼此的感情。中国人遵循“礼尚往来”(mutually exchanging courtesies)的传统，接受礼物时会表达谢意，并适时回赠礼物，以增进彼此的融洽关系。",
    "keyExpressions": [
      {
        "zh": "亲朋好友之间互赠礼物",
        "en": [
          "exchanging gifts among relatives and friends",
          "giving gifts to relatives and friends",
          "gift exchange among family and friends"
        ],
        "weight": 1.5
      },
      {
        "zh": "重要礼节",
        "en": [
          "important social custom",
          "important etiquette",
          "key etiquette in interpersonal communication"
        ],
        "weight": 1
      },
      {
        "zh": "物质的馈赠",
        "en": [
          "material value",
          "material gift",
          "material offering"
        ],
        "weight": 1
      },
      {
        "zh": "情感的表达",
        "en": [
          "conveys affection",
          "expression of affection",
          "expresses emotion and care"
        ],
        "weight": 1.5
      },
      {
        "zh": "精心挑选的礼物",
        "en": [
          "thoughtfully chosen gift",
          "carefully selected gift",
          "well-chosen gift"
        ],
        "weight": 1.5
      },
      {
        "zh": "加深彼此感情",
        "en": [
          "strengthen the bond",
          "deepen mutual affection",
          "enhance emotional bonds"
        ],
        "weight": 1.5
      },
      {
        "zh": "遵循礼尚往来的传统",
        "en": [
          "following the tradition of returning courtesies",
          "follow the tradition of mutually exchanging courtesies",
          "adhering to the tradition of reciprocity"
        ],
        "weight": 1.5
      },
      {
        "zh": "适时回赠礼物",
        "en": [
          "offer one in return at an appropriate time",
          "give a gift in return at a proper time",
          "return a gift when appropriate"
        ],
        "weight": 1.5
      }
    ],
    "structureChecklist": [
      "动名词作主语：Exchanging gifts among relatives and friends is ... 避免笨重主语从句。",
      "递进并列结构：conveys affection as well as offering ... 或 not only ... but also ...。",
      "长定语前后拆分：A thoughtfully chosen gift（前置）that suits the recipient（后置定语从句）。",
      "现在分词作伴随/背景状语：Following the tradition of ... 领起第四句。"
    ],
    "referenceTranslation": "Exchanging gifts among relatives and friends is an important social custom in traditional Chinese culture. A gift conveys affection as well as offering something of material value, and it helps sustain relationships. A thoughtfully chosen gift that suits the recipient can strengthen the bond between the giver and the recipient. Following the tradition of returning courtesies, people in China thank the giver when receiving a gift and offer one in return at an appropriate time. This exchange helps maintain good relations.",
    "sentenceBreakdown": [
      {
        "zh": "在中国传统文化中，亲朋好友之间互赠礼物是人际交往的一种重要礼节。",
        "core": "Exchanging gifts among relatives and friends is an important social custom",
        "modifier": "in traditional Chinese culture（地点/文化背景状语）",
        "en": "Exchanging gifts among relatives and friends is an important social custom in traditional Chinese culture."
      },
      {
        "zh": "赠送礼物不仅是物质的馈赠，更是情感的表达，是维系人际关系的重要纽带。",
        "core": "A gift conveys affection as well as offering something of material value",
        "modifier": "and it helps sustain relationships（并列分句补全“维系纽带”）",
        "en": "A gift conveys affection as well as offering something of material value, and it helps sustain relationships."
      },
      {
        "zh": "一份精心挑选、符合接受者喜好的礼物，往往能加深彼此的感情。",
        "core": "A thoughtfully chosen gift can strengthen the bond",
        "modifier": "that suits the recipient（定语从句后置）+ between the giver and the recipient",
        "en": "A thoughtfully chosen gift that suits the recipient can strengthen the bond between the giver and the recipient."
      },
      {
        "zh": "中国人遵循“礼尚往来”的传统，接受礼物时会表达谢意，并适时回赠礼物，以增进彼此的融洽关系。",
        "core": "people in China thank the giver ... and offer one in return",
        "modifier": "Following the tradition of returning courtesies（伴随状语）+ when receiving a gift + at an appropriate time",
        "en": "Following the tradition of returning courtesies, people in China thank the giver when receiving a gift and offer one in return at an appropriate time. This exchange helps maintain good relations."
      }
    ],
    "hintSteps": [
      "中文第三句有并列长定语“精心挑选、符合接受者喜好的”，拆分法最优雅：短定语 thoughtfully chosen 前置，长定语 that suits the recipient 后置。",
      "“回赠礼物”切忌写成 give back a gift（那是退还礼物），务必用 offer a gift in return。",
      "全篇陈述文化习俗，统一采用一般现在时，把最后一句拆为两句可避免逗号堆叠。"
    ]
  },
  {
    "id": "q_tr_04",
    "skill": "translation",
    "type": "translation",
    "sectionId": "t_trans_struct",
    "difficulty": 2,
    "source": "2024.06 第1套 Part IV Translation",
    "title": "北京四合院与传统民居",
    "chineseText": "四合院(Siheyuan)是中国一种传统的住宅建筑，其特点是房屋建造在一个院子的四周，将院子合围在中间。四合院通常冬暖夏凉，环境舒适，尤其适合大家庭居住。四合院在中国各地有多种类型，其中以北京的四合院最为典型。如今，随着现代城市的发展，传统的四合院已逐渐减少，但因其独特的建筑风格，四合院对中国文化的传承和中国历史的研究具有重要意义。",
    "keyExpressions": [
      {
        "zh": "传统住宅建筑",
        "en": [
          "traditional Chinese residential building",
          "traditional residential architecture",
          "traditional Chinese dwelling"
        ],
        "weight": 1.5
      },
      {
        "zh": "其特点是",
        "en": [
          "characterized by",
          "featured by",
          "known for its layout"
        ],
        "weight": 1.5
      },
      {
        "zh": "冬暖夏凉",
        "en": [
          "warm in winter and cool in summer",
          "warm during winter and cool during summer"
        ],
        "weight": 1.5
      },
      {
        "zh": "适合大家庭居住",
        "en": [
          "suitable for large families to live in",
          "ideal for big families",
          "well suited for extended families"
        ],
        "weight": 1
      },
      {
        "zh": "其中最为典型",
        "en": [
          "of which the most typical one is",
          "among which the Beijing ones are most typical",
          "most typical in Beijing"
        ],
        "weight": 1.5
      },
      {
        "zh": "随着现代城市的发展",
        "en": [
          "with the development of modern cities",
          "with modern urban development",
          "as modern cities develop"
        ],
        "weight": 1
      },
      {
        "zh": "逐渐减少",
        "en": [
          "has gradually decreased",
          "have gradually declined in number",
          "gradually decreased"
        ],
        "weight": 1
      },
      {
        "zh": "具有重要意义",
        "en": [
          "of great significance to",
          "holds great significance for",
          "plays an important role in"
        ],
        "weight": 1.5
      }
    ],
    "structureChecklist": [
      "非限制性定语从句：which is characterized by ... 优雅翻译“其特点是”。",
      "现在分词伴随/结果状语：enclosing the courtyard in the middle / offering a comfortable environment。",
      "介词+关系代词结构：of which the most typical one is in Beijing 精准表达“其中以北京的最为典型”。",
      "高分表语结构：be of great significance to 替代简单的 very important。"
    ],
    "referenceTranslation": "Siheyuan is a kind of traditional Chinese residential building, which is characterized by houses built around a courtyard, enclosing the courtyard in the middle. Siheyuan is usually warm in winter and cool in summer, offering a comfortable environment, especially suitable for large families to live in. There are many types of Siheyuan in different parts of China, of which the most typical one is in Beijing. Nowadays, with the development of modern cities, the number of traditional Siheyuan has gradually decreased, but because of its unique architectural style, Siheyuan is of great significance to the inheritance of Chinese culture and the study of Chinese history.",
    "sentenceBreakdown": [
      {
        "zh": "四合院是中国一种传统的住宅建筑，其特点是房屋建造在一个院子的四周，将院子合围在中间。",
        "core": "Siheyuan is a kind of traditional Chinese residential building",
        "modifier": "which is characterized by houses built around a courtyard, enclosing the courtyard in the middle（定语从句+分词短语）",
        "en": "Siheyuan is a kind of traditional Chinese residential building, which is characterized by houses built around a courtyard, enclosing the courtyard in the middle."
      },
      {
        "zh": "四合院通常冬暖夏凉，环境舒适，尤其适合大家庭居住。",
        "core": "Siheyuan is usually warm in winter and cool in summer",
        "modifier": "offering a comfortable environment, especially suitable for large families to live in（分词与形容词短语作伴随补充）",
        "en": "Siheyuan is usually warm in winter and cool in summer, offering a comfortable environment, especially suitable for large families to live in."
      },
      {
        "zh": "四合院在中国各地有多种类型，其中以北京的四合院最为典型。",
        "core": "There are many types of Siheyuan in different parts of China",
        "modifier": "of which the most typical one is in Beijing（介词+关系代词定语从句）",
        "en": "There are many types of Siheyuan in different parts of China, of which the most typical one is in Beijing."
      },
      {
        "zh": "如今，随着现代城市的发展，传统的四合院已逐渐减少，但因其独特的建筑风格，四合院对中国文化的传承和中国历史的研究具有重要意义。",
        "core": "the number of traditional Siheyuan has gradually decreased, but Siheyuan is of great significance",
        "modifier": "with the development of modern cities + because of its unique architectural style + to the inheritance of Chinese culture and the study of Chinese history",
        "en": "Nowadays, with the development of modern cities, the number of traditional Siheyuan has gradually decreased, but because of its unique architectural style, Siheyuan is of great significance to the inheritance of Chinese culture and the study of Chinese history."
      }
    ],
    "hintSteps": [
      "第一句“其特点是……”套用四级万能句型 be characterized by，再用 enclosing ... 表达“合围在中间”。",
      "“传统的四合院已逐渐减少”注意主语转换：用 the number of traditional Siheyuan has gradually decreased 比 Siheyuan has decreased 更符合英文逻辑。",
      "“对中国文化的传承和中国历史的研究具有重要意义”用 be of great significance to the inheritance of ... and the study of ... 结构工整。"
    ]
  },
  {
    "id": "q_tr_05",
    "skill": "translation",
    "type": "translation",
    "sectionId": "t_trans_themes",
    "difficulty": 2,
    "source": "2024.06 第2套 Part IV Translation",
    "title": "中国农历与传统节气农事",
    "chineseText": "农历(the lunar calendar)起源于数千年前的中国，根据太阳和月亮的运行规律制定。长期以来，农历在农业生产和人们日常生活中发挥着重要作用。古人依据农历记录日期、安排农活，以便最有效地利用自然资源和气候条件，提高农作物的产量和质量。中国的春节、中秋节等传统节日的日期都基于农历。农历是中国传统文化的重要组成部分，当今依然广为使用。",
    "keyExpressions": [
      {
        "zh": "起源于数千年前",
        "en": [
          "originated in China thousands of years ago",
          "dates back thousands of years",
          "originated thousands of years ago"
        ],
        "weight": 1.5
      },
      {
        "zh": "根据太阳和月亮的运行规律制定",
        "en": [
          "formulated based on the movements of the sun and the moon",
          "created according to the movements of the sun and moon",
          "based on the cycles of the sun and the moon"
        ],
        "weight": 1.5
      },
      {
        "zh": "发挥重要作用",
        "en": [
          "played an important role in",
          "plays a vital role in",
          "played a significant part in"
        ],
        "weight": 1
      },
      {
        "zh": "农业生产",
        "en": [
          "agricultural production",
          "farming production",
          "agriculture"
        ],
        "weight": 1
      },
      {
        "zh": "记录日期、安排农活",
        "en": [
          "recorded dates and arranged farm work",
          "kept track of dates and planned farming activities",
          "record dates and arrange agricultural work"
        ],
        "weight": 1.5
      },
      {
        "zh": "提高农作物的产量和质量",
        "en": [
          "improve the yield and quality of crops",
          "increase crop yields and quality",
          "enhance the output and quality of crops"
        ],
        "weight": 1.5
      },
      {
        "zh": "传统节日基于农历",
        "en": [
          "traditional festivals are based on the lunar calendar",
          "Spring Festival and Mid-Autumn Festival follow the lunar calendar"
        ],
        "weight": 1
      },
      {
        "zh": "当今依然广为使用",
        "en": [
          "is still widely used today",
          "remains widely used today",
          "continues to be widely used"
        ],
        "weight": 1
      }
    ],
    "structureChecklist": [
      "定语从句合并短句：The lunar calendar, which originated ..., was formulated ... 避免主语重复。",
      "时态分层精准：起源/古人用过去时（originated / recorded），长期以来用现在完成时（has played），如今仍广为使用用一般现在时被动（is still widely used）。",
      "目的状语从句：in order to make the most efficient use of ... to improve ... 层次分明。",
      "专有名词规范大写：Spring Festival, Mid-Autumn Festival。"
    ],
    "referenceTranslation": "The lunar calendar, which originated in China thousands of years ago, was formulated based on the movements of the sun and the moon. For a long time, the lunar calendar has played an important role in agricultural production and people's daily lives. Ancient people recorded dates and arranged farm work according to the lunar calendar in order to make the most efficient use of natural resources and climatic conditions to improve the yield and quality of crops. The Chinese Spring Festival, Mid-Autumn Festival and other traditional festivals are based on the lunar calendar. It is an important component of traditional Chinese culture and is still widely used today.",
    "sentenceBreakdown": [
      {
        "zh": "农历起源于数千年前的中国，根据太阳和月亮的运行规律制定。",
        "core": "The lunar calendar was formulated based on the movements of the sun and the moon",
        "modifier": "which originated in China thousands of years ago（非限制性定语从句）",
        "en": "The lunar calendar, which originated in China thousands of years ago, was formulated based on the movements of the sun and the moon."
      },
      {
        "zh": "长期以来，农历在农业生产和人们日常生活中发挥着重要作用。",
        "core": "the lunar calendar has played an important role",
        "modifier": "For a long time（现在完成时标志）+ in agricultural production and people's daily lives",
        "en": "For a long time, the lunar calendar has played an important role in agricultural production and people's daily lives."
      },
      {
        "zh": "古人依据农历记录日期、安排农活，以便最有效地利用自然资源和气候条件，提高农作物的产量和质量。",
        "core": "Ancient people recorded dates and arranged farm work",
        "modifier": "according to the lunar calendar + in order to make the most efficient use of ... to improve the yield and quality of crops",
        "en": "Ancient people recorded dates and arranged farm work according to the lunar calendar in order to make the most efficient use of natural resources and climatic conditions to improve the yield and quality of crops."
      },
      {
        "zh": "中国的春节、中秋节等传统节日的日期都基于农历。",
        "core": "The Chinese Spring Festival, Mid-Autumn Festival and other traditional festivals are based on the lunar calendar",
        "modifier": "简洁直译主干，避免冗赘 the dates of ...",
        "en": "The Chinese Spring Festival, Mid-Autumn Festival and other traditional festivals are based on the lunar calendar."
      },
      {
        "zh": "农历是中国传统文化的重要组成部分，当今依然广为使用。",
        "core": "It is an important component ... and is still widely used today",
        "modifier": "of traditional Chinese culture（后置定语）",
        "en": "It is an important component of traditional Chinese culture and is still widely used today."
      }
    ],
    "hintSteps": [
      "注意三个时态切换：“数千年前起源/古人”用一般过去时，“长期以来”用现在完成时（has played），“如今依然使用”用一般现在时被动。",
      "高频农业与历法词汇积累：运行规律 movements/cycles，农业生产 agricultural production，产量和质量 yield and quality of crops。",
      "把“以便最有效地利用……”处理成 in order to make the most efficient use of ... 结构清晰不拖沓。"
    ]
  },
  {
    "id": "q_tr_06",
    "skill": "translation",
    "type": "translation",
    "sectionId": "t_trans_themes",
    "difficulty": 1,
    "source": "2024.06 第3套 Part IV Translation",
    "title": "春节贴“福”字习俗",
    "chineseText": "汉语中的“福”字(the character fu)表示幸福和好运，是中国传统文化中最常用的吉祥(auspicious)符号之一。人们通常将一个大大的福字写在红纸上，寓意期盼家庭幸福、社会安定、国家昌盛。春节贴福字是民间由来已久的习俗。为了欢庆春节，家家户户都会将福字贴在门上或墙上，表达对幸福生活的向往、对美好未来的期待。人们有时还将福字倒过来贴，表示幸福已到、好运已到。",
    "keyExpressions": [
      {
        "zh": "表示幸福和好运",
        "en": [
          "signifying happiness and good luck",
          "representing happiness and good fortune",
          "means happiness and good luck"
        ],
        "weight": 1.5
      },
      {
        "zh": "最常用的吉祥符号之一",
        "en": [
          "one of the most commonly used auspicious symbols",
          "one of the most popular auspicious symbols"
        ],
        "weight": 1.5
      },
      {
        "zh": "写在红纸上",
        "en": [
          "write a big character of fu on red paper",
          "write the character fu on red paper"
        ],
        "weight": 1
      },
      {
        "zh": "家庭幸福、社会安定、国家昌盛",
        "en": [
          "family happiness, social stability and national prosperity",
          "happy families, stable society and prosperous nation"
        ],
        "weight": 1.5
      },
      {
        "zh": "由来已久的习俗",
        "en": [
          "long-standing folk custom",
          "time-honored custom",
          "long-established folk tradition"
        ],
        "weight": 1.5
      },
      {
        "zh": "贴在门上或墙上",
        "en": [
          "put the character of fu on the doors or walls",
          "paste the character fu on doors or walls",
          "post the character fu on doors and walls"
        ],
        "weight": 1
      },
      {
        "zh": "表达对幸福生活的向往",
        "en": [
          "express the yearning for a happy life",
          "express their longing for a happy life",
          "express wishes for a happy life"
        ],
        "weight": 1
      },
      {
        "zh": "倒过来贴",
        "en": [
          "put the character of fu upside down",
          "paste the character fu upside down",
          "hang it upside down"
        ],
        "weight": 1.5
      }
    ],
    "structureChecklist": [
      "现在分词作后置定语：The Chinese character 'fu', signifying happiness and good luck, is ...。",
      "名词三连排比：family happiness, social stability and national prosperity 简洁大气。",
      "动名词作主语：Posting the character of fu during the Spring Festival is ...。",
      "现在分词作伴随说明：upside down, indicating that happiness and good luck have arrived。"
    ],
    "referenceTranslation": "The Chinese character \"fu\", signifying happiness and good luck, is one of the most commonly used auspicious symbols in traditional Chinese culture. People usually write a big character of fu on red paper, which means that they look forward to family happiness, social stability and national prosperity. Posting the character of fu during the Spring Festival is a long-standing folk custom. In order to celebrate the Spring Festival, every family will put the character of fu on the doors or walls to express the yearning for a happy life and the expectation for a better future. People sometimes put the character of fu upside down, indicating that happiness and good luck have arrived.",
    "sentenceBreakdown": [
      {
        "zh": "汉语中的“福”字表示幸福和好运，是中国传统文化中最常用的吉祥符号之一。",
        "core": "The Chinese character 'fu' is one of the most commonly used auspicious symbols",
        "modifier": "signifying happiness and good luck（分词插入定语）+ in traditional Chinese culture",
        "en": "The Chinese character \"fu\", signifying happiness and good luck, is one of the most commonly used auspicious symbols in traditional Chinese culture."
      },
      {
        "zh": "人们通常将一个大大的福字写在红纸上，寓意期盼家庭幸福、社会安定、国家昌盛。",
        "core": "People usually write a big character of fu on red paper",
        "modifier": "which means that they look forward to family happiness, social stability and national prosperity（非限制性定语从句）",
        "en": "People usually write a big character of fu on red paper, which means that they look forward to family happiness, social stability and national prosperity."
      },
      {
        "zh": "春节贴福字是民间由来已久的习俗。",
        "core": "Posting the character of fu is a long-standing folk custom",
        "modifier": "during the Spring Festival（时间状语）",
        "en": "Posting the character of fu during the Spring Festival is a long-standing folk custom."
      },
      {
        "zh": "为了欢庆春节，家家户户都会将福字贴在门上或墙上，表达对幸福生活的向往、对美好未来的期待。",
        "core": "every family will put the character of fu on the doors or walls",
        "modifier": "In order to celebrate the Spring Festival + to express the yearning for a happy life and the expectation for a better future",
        "en": "In order to celebrate the Spring Festival, every family will put the character of fu on the doors or walls to express the yearning for a happy life and the expectation for a better future."
      },
      {
        "zh": "人们有时还将福字倒过来贴，表示幸福已到、好运已到。",
        "core": "People sometimes put the character of fu upside down",
        "modifier": "indicating that happiness and good luck have arrived（现在分词表伴随含义）",
        "en": "People sometimes put the character of fu upside down, indicating that happiness and good luck have arrived."
      }
    ],
    "hintSteps": [
      "巧妙借用题干括号给出的 the character fu 和 auspicious，减少拼写风险。",
      "核心亮点短语：“倒过来”固定表达为 upside down，“由来已久的习俗”用 long-standing folk custom。",
      "尾句“幸福已到、好运已到”暗含“已经到来”的完成意义，用 have arrived 精准传神。"
    ]
  },
  {
    "id": "q_tr_07",
    "skill": "translation",
    "type": "translation",
    "sectionId": "t_trans_struct",
    "difficulty": 2,
    "source": "2025.12 第2套 Part IV Translation",
    "title": "年轻人的旅游新潮流：城市漫步 (City Walk)",
    "chineseText": "近年来，“城市漫步(city walk)”在中国的年轻人中悄然兴起，已成为一种旅游新潮流。与传统旅游不同，城市漫步不追求在短时间内游览尽可能多的景点，而是随意行走或按照主题路线漫步在城市的大街小巷。漫步者品尝地道小吃，欣赏特色建筑，了解当地生活方式。他们还用相机或手机记录城市的风景和人物。这种旅游方式能让城市漫步者更深入了解城市的历史与文化。",
    "keyExpressions": [
      {
        "zh": "近年来悄然兴起",
        "en": [
          "in recent years ... has quietly emerged",
          "has quietly risen in popularity",
          "has emerged among young people"
        ],
        "weight": 1.5
      },
      {
        "zh": "一种旅游新潮流",
        "en": [
          "a new trend in tourism",
          "a new travel trend",
          "a popular new form of travel"
        ],
        "weight": 1
      },
      {
        "zh": "与传统旅游不同",
        "en": [
          "unlike traditional tourism",
          "different from traditional travel",
          "in contrast to traditional tourism"
        ],
        "weight": 1.5
      },
      {
        "zh": "尽可能多的景点",
        "en": [
          "as many attractions as possible",
          "as many scenic spots as possible",
          "as many tourist sites as possible"
        ],
        "weight": 1.5
      },
      {
        "zh": "按照主题路线漫步",
        "en": [
          "stroll along themed routes",
          "walk along themed routes",
          "wander freely or follow themed routes"
        ],
        "weight": 1.5
      },
      {
        "zh": "品尝地道小吃",
        "en": [
          "taste authentic local snacks",
          "sample authentic snacks",
          "try local delicacies"
        ],
        "weight": 1
      },
      {
        "zh": "欣赏特色建筑",
        "en": [
          "admire distinctive architecture",
          "appreciate unique buildings",
          "enjoy characteristic architecture"
        ],
        "weight": 1
      },
      {
        "zh": "深入了解城市的历史与文化",
        "en": [
          "gain a deeper understanding of a city's history and culture",
          "better understand the city's history and culture",
          "deepen their understanding of urban history and culture"
        ],
        "weight": 1.5
      }
    ],
    "structureChecklist": [
      "开篇高频时态：In recent years 引导现在完成时（has quietly emerged and become）。",
      "精准对比结构：Unlike traditional tourism, city walk does not aim to ..., instead ... / rather than ...。",
      "三连动词平行结构：taste authentic local snacks, admire distinctive architecture, and experience local lifestyles。",
      "使役动词收尾：enables city walkers to gain a deeper understanding of ... 避免反复用 let。"
    ],
    "referenceTranslation": "In recent years, \"city walk\" has quietly emerged among young people in China and has become a new trend in tourism. Unlike traditional tourism, city walk does not aim to visit as many attractions as possible within a short period of time; instead, participants wander freely or stroll along themed routes through urban streets and alleys. Walkers taste authentic local snacks, admire distinctive architecture, and learn about local lifestyles. They also capture urban scenery and people with cameras or smartphones. This way of traveling enables city walkers to gain a deeper understanding of a city's history and culture.",
    "sentenceBreakdown": [
      {
        "zh": "近年来，“城市漫步”在中国的年轻人中悄然兴起，已成为一种旅游新潮流。",
        "core": "\"city walk\" has quietly emerged ... and has become a new trend in tourism",
        "modifier": "In recent years + among young people in China（状语）",
        "en": "In recent years, \"city walk\" has quietly emerged among young people in China and has become a new trend in tourism."
      },
      {
        "zh": "与传统旅游不同，城市漫步不追求在短时间内游览尽可能多的景点，而是随意行走或按照主题路线漫步在城市的大街小巷。",
        "core": "city walk does not aim to visit as many attractions as possible; instead, participants wander freely or stroll",
        "modifier": "Unlike traditional tourism + within a short period of time + along themed routes through urban streets and alleys",
        "en": "Unlike traditional tourism, city walk does not aim to visit as many attractions as possible within a short period of time; instead, participants wander freely or stroll along themed routes through urban streets and alleys."
      },
      {
        "zh": "漫步者品尝地道小吃，欣赏特色建筑，了解当地生活方式。",
        "core": "Walkers taste ..., admire ..., and learn about ...",
        "modifier": "authentic local snacks / distinctive architecture / local lifestyles（三项动宾平行）",
        "en": "Walkers taste authentic local snacks, admire distinctive architecture, and learn about local lifestyles."
      },
      {
        "zh": "他们还用相机或手机记录城市的风景和人物。",
        "core": "They also capture urban scenery and people",
        "modifier": "with cameras or smartphones（工具介词短语）",
        "en": "They also capture urban scenery and people with cameras or smartphones."
      },
      {
        "zh": "这种旅游方式能让城市漫步者更深入了解城市的历史与文化。",
        "core": "This way of traveling enables city walkers to gain a deeper understanding",
        "modifier": "of a city's history and culture（后置定语）",
        "en": "This way of traveling enables city walkers to gain a deeper understanding of a city's history and culture."
      }
    ],
    "hintSteps": [
      "看到“近年来”立即反应现在完成时：In recent years, ... has emerged and become ...。",
      "“不是 A 而是 B”用 not ...; instead, ... 或 not ... but rather ... 处理最不易出错。",
      "用地道动词提升档次：大街小巷 streets and alleys，地道小吃 authentic local snacks，记录风景 capture scenery。"
    ]
  },
  {
    "id": "q_tr_08",
    "skill": "translation",
    "type": "translation",
    "sectionId": "t_trans_struct",
    "difficulty": 3,
    "source": "2025.06 第1套 Part IV Translation",
    "title": "袁隆平与超级杂交水稻",
    "chineseText": "被誉为“杂交水稻(hybrid rice)之父”的袁隆平和他的科研团队克服重重困难，研发出了一种超级杂交水稻。这项技术获得了举世公认的巨大成功。通过这项技术的应用，水稻抗旱抗病能力更强，能适应不同的气候和土壤条件，产量可提高20-30%。超级杂交水稻营养丰富，口感更佳。目前，这项技术已经在许多国家得到广泛应用，为全球粮食安全做出了重大贡献。",
    "keyExpressions": [
      {
        "zh": "被誉为杂交水稻之父",
        "en": [
          "known as the Father of Hybrid Rice",
          "hailed as the Father of Hybrid Rice",
          "honored as the Father of Hybrid Rice"
        ],
        "weight": 1.5
      },
      {
        "zh": "克服重重困难",
        "en": [
          "overcame numerous difficulties",
          "overcame great challenges",
          "overcoming countless difficulties"
        ],
        "weight": 1.5
      },
      {
        "zh": "研发出超级杂交水稻",
        "en": [
          "developed a kind of super hybrid rice",
          "developed super hybrid rice",
          "created a variety of super hybrid rice"
        ],
        "weight": 1.5
      },
      {
        "zh": "举世公认的巨大成功",
        "en": [
          "world-renowned success",
          "great success recognized worldwide",
          "widely recognized huge success"
        ],
        "weight": 1
      },
      {
        "zh": "抗旱抗病能力更强",
        "en": [
          "more resistant to drought and diseases",
          "stronger resistance to drought and disease",
          "better resist drought and diseases"
        ],
        "weight": 1.5
      },
      {
        "zh": "适应不同的气候和土壤条件",
        "en": [
          "adapt to different climate and soil conditions",
          "adapt to diverse climates and soils",
          "adjust to various climate and soil conditions"
        ],
        "weight": 1
      },
      {
        "zh": "产量可提高20-30%",
        "en": [
          "increase yields by 20 to 30 percent",
          "boost output by 20-30%",
          "yields can rise by 20-30%"
        ],
        "weight": 1
      },
      {
        "zh": "为全球粮食安全做出重大贡献",
        "en": [
          "making a major contribution to global food security",
          "made significant contributions to world food security",
          "contributed greatly to global food security"
        ],
        "weight": 1.5
      }
    ],
    "structureChecklist": [
      "过去分词短语处理长前置定语：Yuan Longping, hailed as the \"Father of Hybrid Rice\", and his research team ...",
      "复合形容词凝练科技表达：more resistant to drought and diseases 精准译出“抗旱抗病能力更强”。",
      "精准介词表达增幅：“提高 20-30%”务必用 increase by 20% to 30%（切忌误用 to）。",
      "现在完成时被动+分词结果状语：has been widely applied ..., making a major contribution to global food security。"
    ],
    "referenceTranslation": "Yuan Longping, hailed as the \"Father of Hybrid Rice,\" and his research team overcame numerous difficulties to develop a variety of super hybrid rice. This technology has achieved great success recognized worldwide. Through its application, rice becomes more resistant to drought and diseases, can adapt to different climate and soil conditions, and can increase yields by 20 to 30 percent. Super hybrid rice is rich in nutrition and tastes better. At present, this technology has been widely applied in many countries, making a major contribution to global food security.",
    "sentenceBreakdown": [
      {
        "zh": "被誉为“杂交水稻之父”的袁隆平和他的科研团队克服重重困难，研发出了一种超级杂交水稻。",
        "core": "Yuan Longping and his research team overcame numerous difficulties to develop a variety of super hybrid rice",
        "modifier": "hailed as the \"Father of Hybrid Rice\"（过去分词插入语后置，化解超长中文前置定语）",
        "en": "Yuan Longping, hailed as the \"Father of Hybrid Rice,\" and his research team overcame numerous difficulties to develop a variety of super hybrid rice."
      },
      {
        "zh": "这项技术获得了举世公认的巨大成功。",
        "core": "This technology has achieved great success",
        "modifier": "recognized worldwide（过去分词作后置定语）",
        "en": "This technology has achieved great success recognized worldwide."
      },
      {
        "zh": "通过这项技术的应用，水稻抗旱抗病能力更强，能适应不同的气候和土壤条件，产量可提高20-30%。",
        "core": "rice becomes more resistant ..., can adapt to ..., and can increase yields by 20 to 30 percent",
        "modifier": "Through its application（方式状语）+ to drought and diseases / different climate and soil conditions",
        "en": "Through its application, rice becomes more resistant to drought and diseases, can adapt to different climate and soil conditions, and can increase yields by 20 to 30 percent."
      },
      {
        "zh": "超级杂交水稻营养丰富，口感更佳。",
        "core": "Super hybrid rice is rich in nutrition and tastes better",
        "modifier": "简洁并列系表结构",
        "en": "Super hybrid rice is rich in nutrition and tastes better."
      },
      {
        "zh": "目前，这项技术已经在许多国家得到广泛应用，为全球粮食安全做出了重大贡献。",
        "core": "this technology has been widely applied in many countries",
        "modifier": "At present + making a major contribution to global food security（现在分词结果状语）",
        "en": "At present, this technology has been widely applied in many countries, making a major contribution to global food security."
      }
    ],
    "hintSteps": [
      "首句超长定语“被誉为……的袁隆平”切勿照搬放主语前面，一定要把 hailed/known as ... 放到 Yuan Longping 之后作插入后置定语。",
      "“提高 20-30%”是增幅而非目标值，介词必须用 by（increase by 20% to 30%）。",
      "核心科技与社会词组：抗旱抗病 resistant to drought and diseases，粮食安全 global food security。"
    ]
  },
  {
    "id": "q_tr_09",
    "skill": "translation",
    "type": "translation",
    "sectionId": "t_trans_themes",
    "difficulty": 2,
    "source": "2024.12 第1套 Part IV Translation",
    "title": "中国生态环保举措与国际合作",
    "chineseText": "中国政府十分重视环境保护。近年来，中国在减少空气、水和土壤污染上取得了显著成效。为了不断改善人们的生活环境，中国采取了一系列有效措施，包括大力发展清洁能源，改善公共交通，推广共享单车，实施垃圾分类。通过这些措施，中国的城市和农村正在绿起来、美起来。中国还积极参与国际合作，为全球环境保护做出了重要贡献。",
    "keyExpressions": [
      {
        "zh": "十分重视环境保护",
        "en": [
          "attaches great importance to environmental protection",
          "places great emphasis on environmental protection",
          "values environmental protection highly"
        ],
        "weight": 1.5
      },
      {
        "zh": "减少空气、水和土壤污染",
        "en": [
          "reducing air, water, and soil pollution",
          "curbing air, water and soil pollution",
          "cutting pollution of air, water and soil"
        ],
        "weight": 1.5
      },
      {
        "zh": "取得了显著成效",
        "en": [
          "achieved remarkable results",
          "made notable achievements",
          "made significant progress"
        ],
        "weight": 1.5
      },
      {
        "zh": "采取了一系列有效措施",
        "en": [
          "taken a series of effective measures",
          "adopted a range of effective measures",
          "implemented effective measures"
        ],
        "weight": 1.5
      },
      {
        "zh": "大力发展清洁能源",
        "en": [
          "vigorously developing clean energy",
          "promoting clean energy",
          "developing clean energy"
        ],
        "weight": 1
      },
      {
        "zh": "推广共享单车",
        "en": [
          "promoting bike-sharing",
          "promoting shared bicycles",
          "encouraging shared bikes"
        ],
        "weight": 1
      },
      {
        "zh": "实施垃圾分类",
        "en": [
          "implementing waste sorting",
          "carrying out garbage classification",
          "enforcing waste classification"
        ],
        "weight": 1.5
      },
      {
        "zh": "积极参与国际合作",
        "en": [
          "actively participates in international cooperation",
          "actively engages in global cooperation",
          "takes an active part in international cooperation"
        ],
        "weight": 1.5
      }
    ],
    "structureChecklist": [
      "政府立场王牌搭配：attaches great importance to environmental protection。",
      "四项举措平行动名词：including vigorously developing ..., improving ..., promoting ..., and implementing ...。",
      "动态变化精准时态：“正在绿起来、美起来”使用现在进行时+比较级 are becoming greener and more beautiful。",
      "分词衔接成果：actively participates in ..., making important contributions to global environmental protection。"
    ],
    "referenceTranslation": "The Chinese government attaches great importance to environmental protection. In recent years, China has achieved remarkable results in reducing air, water, and soil pollution. To continuously improve people's living environment, China has taken a series of effective measures, including vigorously developing clean energy, improving public transportation, promoting bike-sharing, and implementing waste sorting. Through these measures, China's urban and rural areas are becoming greener and more beautiful. China also actively participates in international cooperation, making important contributions to global environmental protection.",
    "sentenceBreakdown": [
      {
        "zh": "中国政府十分重视环境保护。",
        "core": "The Chinese government attaches great importance to environmental protection",
        "modifier": "四级翻译高频高分固定句型 attach great importance to",
        "en": "The Chinese government attaches great importance to environmental protection."
      },
      {
        "zh": "近年来，中国在减少空气、水和土壤污染上取得了显著成效。",
        "core": "China has achieved remarkable results",
        "modifier": "In recent years + in reducing air, water, and soil pollution（介词+动名词短语）",
        "en": "In recent years, China has achieved remarkable results in reducing air, water, and soil pollution."
      },
      {
        "zh": "为了不断改善人们的生活环境，中国采取了一系列有效措施，包括大力发展清洁能源，改善公共交通，推广共享单车，实施垃圾分类。",
        "core": "China has taken a series of effective measures",
        "modifier": "To continuously improve people's living environment + including developing ..., improving ..., promoting ..., and implementing ...（四连动名词平行）",
        "en": "To continuously improve people's living environment, China has taken a series of effective measures, including vigorously developing clean energy, improving public transportation, promoting bike-sharing, and implementing waste sorting."
      },
      {
        "zh": "通过这些措施，中国的城市和农村正在绿起来、美起来。",
        "core": "China's urban and rural areas are becoming greener and more beautiful",
        "modifier": "Through these measures（方式状语）",
        "en": "Through these measures, China's urban and rural areas are becoming greener and more beautiful."
      },
      {
        "zh": "中国还积极参与国际合作，为全球环境保护做出了重要贡献。",
        "core": "China also actively participates in international cooperation",
        "modifier": "making important contributions to global environmental protection（现在分词结果状语）",
        "en": "China also actively participates in international cooperation, making important contributions to global environmental protection."
      }
    ],
    "hintSteps": [
      "开篇“十分重视”直接套用四级王牌短语 attach great importance to；“采取一系列有效措施”套用 take a series of effective measures。",
      "第三句“包括……”后面的四个动宾短语全部对齐为动名词形式（developing ..., improving ..., promoting ..., implementing ...），阅卷人一眼给高分。",
      "“绿起来、美起来”对应动态渐变，用 are becoming greener and more beautiful 比简单的 are green and beautiful 更传神。"
    ]
  },
  {
    "id": "q_wr_01",
    "skill": "writing",
    "type": "writing",
    "sectionId": "t_write_struct",
    "difficulty": 2,
    "source": "2026.06 第1套（C4-001）",
    "title": "校园机器人的未来应用",
    "essayType": "校报投稿",
    "directions": "Suppose the university newspaper is inviting submissions from the students for its coming edition on future applications of robots on campus. You are now to write an essay for submission. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.",
    "wordTarget": [
      120,
      180
    ],
    "logicBlueprint": [
      "第一段（能做什么）：切入机器人替代日常事务的价值，举例图书馆导引归架与校园实验室物资配送。",
      "第二段（如何稳妥落地）：建议从小范围试点起步，建立师生反馈渠道，公开数据隐私说明并保留人工服务台。",
      "第三段（总结收束）：指出机器人只有解决具体痛点才最有价值，先试点验证再决定是否扩大投入。"
    ],
    "transferablePatterns": [
      {
        "en": "A would be most useful if it solved specific problems.",
        "zh": "如果能解决具体问题，A 才最有用。",
        "usage": "用于结尾点明技术或措施落地的核心前提，后接可验证问题。"
      },
      {
        "en": "The university should start with a small trial in places where the need is clear.",
        "zh": "学校应从需求明确的地方开展小范围试点。",
        "usage": "建议类与提案类作文高频过渡句，体现方案可行性与务实度。"
      },
      {
        "en": "leaving staff more time for work that requires their judgment",
        "zh": "让工作人员有更多时间处理需要判断力的工作",
        "usage": "现在分词作结果状语，突出工具解放人力的积极效果。"
      }
    ],
    "topicKeywords": [
      "robots",
      "campus",
      "university",
      "library",
      "delivery",
      "trial",
      "students",
      "staff",
      "privacy",
      "services"
    ],
    "modelEssay": "Robots could make university life easier by taking over routine tasks. For example, a robot in the library could guide visitors to the right shelves or help staff return books to their places. On a large campus, delivery robots could carry laboratory supplies between buildings, leaving staff more time for work that requires their judgment.\n\nThe university should start with a small trial in places where the need is clear. Students and staff could report problems with routes, waiting times, or accessibility. The university should also explain what information the robots collect and keep a human service desk available for anyone who needs personal help.\n\nCampus robots would be most useful if they solved specific problems. A trial would let the university see which services students actually use before investing in more machines.",
    "sentenceDissection": [
      {
        "en": "On a large campus, delivery robots could carry laboratory supplies between buildings, leaving staff more time for work that requires their judgment.",
        "zh": "在大型校园里，配送机器人可以在楼宇间运送实验物资，让工作人员有更多时间投入需要专业判断的工作。",
        "highlight": "现在分词 leaving ... 作结果状语 + that 定语从句，一举两得拉升句式层次。"
      },
      {
        "en": "The university should start with a small trial in places where the need is clear.",
        "zh": "学校应从需求明确的区域开展小范围试点。",
        "highlight": "where 引导定语从句限定试点范围，使建议显得具体可行。"
      },
      {
        "en": "Campus robots would be most useful if they solved specific problems.",
        "zh": "校园机器人只有解决具体问题时才会发挥最大效用。",
        "highlight": "虚拟/条件句式精准点题，为全文提供有力收束。"
      }
    ],
    "hintSteps": [
      "审清文体与话题：给校报投稿，核心写“机器人未来在校园的应用（future applications）”，切忌泛泛大谈全球人工智能威胁。",
      "主体段用两个具体校园场景撑起血肉（如图书馆引导、教学楼物资配送），再补一段“试点 + 反馈 + 隐私保护”展示思辨深度。",
      "把字数稳控在 140–170 词之间，确保三段逻辑清晰、衔接自然。"
    ]
  },
  {
    "id": "q_wr_02",
    "skill": "writing",
    "type": "writing",
    "sectionId": "t_write_struct",
    "difficulty": 1,
    "source": "2026.06 第2套（C4-002）",
    "title": "让校园生活更便利的提案",
    "essayType": "校园提案",
    "directions": "Suppose you are invited to put forward a proposal to the university on how to make students' campus life easier. You are now to write an essay to make your proposal. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.",
    "wordTarget": [
      120,
      180
    ],
    "logicBlueprint": [
      "第一段（点明提案 + 痛点一）：开门见山提出优化现有校园服务，首推将图书馆、校医院与食堂开放时间汇总到统一页面。",
      "第二段（痛点二 + 调研验证）：建议考试周延长一间自习室开放时间，并在永久推行前先收集学生真实需求与使用数据。",
      "第三段（痛点三 + 成本收束）：提议上线可追踪进度的简约报修表单，总结指出这些措施无需大兴土木即可显著提升便利度。"
    ],
    "transferablePatterns": [
      {
        "en": "I propose that the university make its existing campus services easier to use.",
        "zh": "我建议学校让现有校园服务更便于使用。",
        "usage": "提案类作文标准开头，propose that 后用虚拟语气动词原形。"
      },
      {
        "en": "Before making the change permanent, it should ask students...",
        "zh": "在使这项改动永久化之前，学校应先征询学生意见……",
        "usage": "展示提案可行性与科学评估意识的加分句式。"
      },
      {
        "en": "These changes would make daily life more convenient without requiring new buildings.",
        "zh": "这些改动无需新建大楼就能让日常生活更便利。",
        "usage": "without requiring + 名词/动名词，收尾突出低成本高收益优势。"
      }
    ],
    "topicKeywords": [
      "proposal",
      "university",
      "campus",
      "services",
      "convenient",
      "libraries",
      "study",
      "hours",
      "report",
      "students"
    ],
    "modelEssay": "I propose that the university make its existing campus services easier to use. To begin with, it could publish the opening hours of libraries, clinics, and dining halls on a single page. Students would then know where to go without checking several websites or making unnecessary trips.\n\nThe university could also extend the opening hours of one study room during exam weeks. Before making the change permanent, it should ask students when they actually need a quiet place to study and record how many people use the room at different times.\n\nFinally, a simple reporting form would help students notify staff about broken lights or other problems. If each report showed who was handling it and when a repair was expected, students would spend less time following up. These changes would make daily life more convenient without requiring new buildings.",
    "sentenceDissection": [
      {
        "en": "I propose that the university make its existing campus services easier to use.",
        "zh": "我建议学校让现有的校园服务使用起来更加便捷。",
        "highlight": "propose that 后省略 should 直接接动词原形 make，地道正式。"
      },
      {
        "en": "Before making the change permanent, it should ask students when they actually need a quiet place to study and record how many people use the room at different times.",
        "zh": "在将改动永久化前，学校应调研学生何时真正需要安静自习场所，并记录不同时段的使用人数。",
        "highlight": "“调研+数据记录”双重论证让建议极具说服力。"
      },
      {
        "en": "These changes would make daily life more convenient without requiring new buildings.",
        "zh": "这些改进无需兴建新建筑便能让校园生活更加便利。",
        "highlight": "without requiring ... 一句话收束成本可控的提案亮点。"
      }
    ],
    "hintSteps": [
      "提案类作文最忌空喊口号（如 build better facilities），落脚到 2–3 个具体校园痛点（信息整合、考试周自习室、线上报修）立刻脱颖而出。",
      "用清晰的序数逻辑词串联全文：To begin with -> also -> Finally。",
      "每条建议配上一句“预期效果（Students would ...）”或“验证方式”，轻松写满 145–165 词。"
    ]
  },
  {
    "id": "q_wr_03",
    "skill": "writing",
    "type": "writing",
    "sectionId": "t_write_patterns",
    "difficulty": 3,
    "source": "2026.06 第3套（C4-003）",
    "title": "大学生参与科研项目的必要性与可行性",
    "essayType": "提案回应",
    "directions": "Suppose it is proposed that university students should be required to participate in at least one research project. You are now to write a response by stating what you think of the proposal in terms of its necessity and practicality. You will have 30 minutes to write the response. You should write at least 120 words but no more than 180 words.",
    "wordTarget": [
      120,
      180
    ],
    "logicBlueprint": [
      "第一段（立场 + 必要性）：有条件支持该提案，阐明科研训练培养拆解问题、评估证据和反思局限等通用能力。",
      "第二段（可行性路径）：说明把小型课题嵌入常规课程并设置统一阶段节点（开题+简短汇报），即可让教师高效指导多组学生。",
      "第三段（弹性替代 + 总结）：为课业或兼职繁忙者提供实验室以外的替代形式，强调合理工作量与清晰指导是成功关键。"
    ],
    "transferablePatterns": [
      {
        "en": "I support giving every university student experience in..., provided that...",
        "zh": "我支持让每位大学生获得……经验，前提是……",
        "usage": "有条件赞同的经典回应句型，provided that 后接具体前提条件。"
      },
      {
        "en": "The requirement would be practical if projects were small enough to fit into ordinary courses.",
        "zh": "如果项目规模足够小、能够融入常规课程，这项要求就是可行的。",
        "usage": "用条件从句把抽象“可行性”转化为可落地执行标准。"
      },
      {
        "en": "With reasonable workloads and clear guidance, the requirement could...",
        "zh": "凭借合理的工作量和清晰指导，这项要求能够……",
        "usage": "With + 名词短语作条件状语收尾，简洁有力。"
      }
    ],
    "topicKeywords": [
      "research",
      "project",
      "university",
      "students",
      "necessity",
      "practical",
      "courses",
      "evidence",
      "guidance",
      "workloads"
    ],
    "modelEssay": "I support giving every university student experience in at least one research project, provided that the requirement can be met in different ways. Research teaches students to turn a broad question into something they can investigate, evaluate evidence, and explain why their conclusions might be limited. These skills are useful even for students who do not plan to become researchers.\n\nThe requirement would be practical if projects were small enough to fit into ordinary courses. A group could analyze a public dataset, survey campus transport, or compare sources on a local historical question. Teachers could guide several groups using common milestones, such as a proposal and a short presentation.\n\nUniversities should offer alternatives for students whose courses or work schedules make a laboratory placement difficult. With reasonable workloads and clear guidance, the requirement could give students a worthwhile introduction to research.",
    "sentenceDissection": [
      {
        "en": "I support giving every university student experience in at least one research project, provided that the requirement can be met in different ways.",
        "zh": "我支持让每位大学生至少参与一个科研项目，前提是该要求可以通过多样方式达成。",
        "highlight": "provided that 引出理性前提，瞬间摆脱非黑即白的低分模板。"
      },
      {
        "en": "Research teaches students to turn a broad question into something they can investigate, evaluate evidence, and explain why their conclusions might be limited.",
        "zh": "科研教会学生把宽泛问题转化为可研究课题、评估证据，并阐明结论的局限性。",
        "highlight": "三连动词平行（turn ..., evaluate ..., and explain ...）精准回应 necessity。"
      },
      {
        "en": "With reasonable workloads and clear guidance, the requirement could give students a worthwhile introduction to research.",
        "zh": "配合合理工作量与清晰指导，这一要求能为学生提供有价值的科研入门体验。",
        "highlight": "With 短语浓缩可行性保障，收尾干脆利落。"
      }
    ],
    "hintSteps": [
      "审题铁律：题干明确点名 in terms of its necessity and practicality，必须双维度全覆盖，缺一不可！",
      "第一段回应 necessity（即使不当科学家也受用的证据评估与批判思维），第二段回应 practicality（嵌入常规课的小型团队项目）。",
      "结尾考虑不同专业和课表差异（offer alternatives），展现全面成熟的思考深度。"
    ]
  },
  {
    "id": "q_wr_04",
    "skill": "writing",
    "type": "writing",
    "sectionId": "t_write_struct",
    "difficulty": 2,
    "source": "2025.12 第1套（C4-004）",
    "title": "学生会如何丰富校园生活",
    "essayType": "建议性回应",
    "directions": "Suppose the student union of your university is collecting opinions on improving its work for the coming year. You are now to write a response by suggesting how it can better enrich student life. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.",
    "wordTarget": [
      120,
      180
    ],
    "logicBlueprint": [
      "第一段（总原则）：响应意见征集，建议学生会从单一大型晚会转向“多元化、学生主导”的日常活动体系。",
      "第二段（具体措施）：提出两项落地举措——搭建兴趣微社群满足细分爱好，以及邀请校友与行业导师举办实用技能工作坊。",
      "第三段（机制保障与展望）：建议每学期前开展线上问卷调研，唯有贴合真实需求才能真正丰富校园生活。"
    ],
    "transferablePatterns": [
      {
        "en": "I propose that the Student Union should adopt a more diverse, student-centered approach.",
        "zh": "我建议学生会采用更加多元、以学生为中心的做法。",
        "usage": "正式建议句型，适合校园治理与服务改进话题。"
      },
      {
        "en": "By shifting some focus from general activities to tailored communities, ...",
        "zh": "通过将部分重心从泛化活动转向定制化兴趣社群，……",
        "usage": "By doing 概括行动路径，自然引出积极成效。"
      },
      {
        "en": "offer targeted guidance on career planning and practical skills",
        "zh": "在职业规划与实用技能方面提供针对性指导",
        "usage": "targeted guidance 为四级高频亮点词组，替换普通 help。"
      }
    ],
    "topicKeywords": [
      "student",
      "union",
      "campus",
      "life",
      "enrich",
      "activities",
      "communities",
      "workshops",
      "guidance",
      "diverse"
    ],
    "modelEssay": "As the Student Union prepares its agenda for the coming year, I propose that it should adopt a more diverse and student-centered approach to enriching campus life. Rather than focusing only on a few large concerts, student organizations should respond thoughtfully to students' varied everyday needs.\n\nFirst and foremost, by shifting some focus from general events to tailored interest communities—such as reading circles, coding clubs, and outdoor hiking groups—the union can help students find like-minded peers and build genuine belonging more easily. Furthermore, it could invite experienced alumni and industry mentors to host hands-on workshops, offering targeted guidance on resume writing, public speaking, and stress management.\n\nIn conclusion, collecting quick online surveys before each semester would ensure that every campus program matches real student interests. Only in this way can the Student Union build a vibrant, supportive, and genuinely enriching campus community for all undergraduates.",
    "sentenceDissection": [
      {
        "en": "I propose that it should adopt a more diverse and student-centered approach to enriching campus life.",
        "zh": "我建议学生会采取更加多元且以学生为中心的方式来丰富校园生活。",
        "highlight": "approach to doing 固定搭配 + diverse and student-centered 精准立意。"
      },
      {
        "en": "By shifting some focus from general events to tailored interest communities, the union can help students find like-minded peers more easily.",
        "zh": "通过把部分精力从常规大型活动转向精细化兴趣社群，学生会能帮同学们更轻松结识志同道合的伙伴。",
        "highlight": "By shifting ... from A to B 逻辑对比感极强。"
      },
      {
        "en": "Only in this way can the Student Union build a vibrant, supportive, and genuinely enriching campus community.",
        "zh": "唯有如此，学生会才能打造充满活力、互助且真正充实的校园社区。",
        "highlight": "Only in this way 倒装句收尾，是四级阅卷一眼加分的高频亮句。"
      }
    ],
    "hintSteps": [
      "切忌只罗列“办运动会、办唱歌比赛”，务必说明每类建议解决什么痛点（社交归属感 + 实用能力成长）。",
      "主体段用 First and foremost 和 Furthermore 清楚划分两条具体举措。",
      "结尾套用 Only in this way can ... 倒装句点题升华，确保字数落在 145–165 词。"
    ]
  },
  {
    "id": "q_wr_05",
    "skill": "writing",
    "type": "writing",
    "sectionId": "t_write_patterns",
    "difficulty": 3,
    "source": "2025.12 第2套（C4-005）",
    "title": "是否应将学术写作设为全体大学生必修课",
    "essayType": "观点回应",
    "directions": "Suppose it is proposed that all university students should be required to learn academic writing. You are now to write a response by stating what you think of the proposal. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.",
    "wordTarget": [
      120,
      180
    ],
    "logicBlueprint": [
      "第一段（明确立场）：亮明支持将学术写作设为全体本科生必修课的观点，指出它是跨学科的底层核心能力。",
      "第二段（双维论证）：从逻辑表达与证据组织、以及规范引用与学术诚信（academic integrity）两方面展开论证。",
      "第三段（让步回应 + 结论）：用 While some may argue that ... 回应“削减选课灵活性”的顾虑，建议按学科分组教学实现双赢。"
    ],
    "transferablePatterns": [
      {
        "en": "While some may argue that mandatory courses reduce flexibility, ...",
        "zh": "尽管有人可能认为必修课会降低选课灵活性，但……",
        "usage": "议论文经典让步转折句型，先回应反方再提升立意。"
      },
      {
        "en": "Proper citation and source evaluation foster academic integrity.",
        "zh": "规范引用与资料评估有助于培养学术诚信。",
        "usage": "academic integrity 为高校教育题材必背高分表达。"
      },
      {
        "en": "There is no denying that ... plays an indispensable role across all disciplines.",
        "zh": "不可否认，……在所有学科中都发挥着不可或缺的作用。",
        "usage": "开篇或总结强力强调句型。"
      }
    ],
    "topicKeywords": [
      "academic",
      "writing",
      "mandatory",
      "university",
      "students",
      "logic",
      "evidence",
      "citation",
      "integrity",
      "disciplines"
    ],
    "modelEssay": "There is no denying that clear and rigorous writing lies at the heart of higher education. From my perspective, requiring all university students to learn academic writing is both timely and beneficial across every discipline, regardless of their intended career path.\n\nFirst and foremost, systematic training in academic writing equips students with the ability to structure logical arguments and support claims with reliable evidence, whether they are drafting a laboratory report or a literature review. Moreover, learning proper citation standards and critical source evaluation fosters academic integrity, helping undergraduates avoid unintentional plagiarism and communicate persuasively in future workplaces.\n\nWhile some may argue that mandatory courses reduce flexibility for electives, universities can tailor modules to different majors so that every assignment stays practical and engaging. In conclusion, making academic writing compulsory equips every graduate with an indispensable lifelong skill that pays dividends far beyond graduation.",
    "sentenceDissection": [
      {
        "en": "There is no denying that clear and rigorous writing lies at the heart of higher education.",
        "zh": "不可否认，清晰严谨的写作居于高等教育的核心地位。",
        "highlight": "There is no denying that 开头大气稳健，rigorous 彰显词汇档次。"
      },
      {
        "en": "Moreover, learning proper citation standards and source evaluation fosters academic integrity, helping undergraduates avoid unintentional plagiarism.",
        "zh": "此外，学习规范的引用标准与文献评估有助于培养学术诚信，帮助本科生避免无意剽窃。",
        "highlight": "动名词作主语 + 现在分词作结果状语，信息密度高。"
      },
      {
        "en": "While some may argue that mandatory courses reduce flexibility for electives, universities can tailor modules to different majors so that the workload stays relevant.",
        "zh": "虽有人担忧必修课会压缩选修课弹性，但高校可按专业定制教学模块以保持实用相关性。",
        "highlight": "先让步再给解法，议论文思辨感拉满。"
      }
    ],
    "hintSteps": [
      "观点回应题切忌两边摇摆不定，首段明确站队支持或反对（建议支持，论点最充实）。",
      "主体段把学术写作价值拆成“逻辑与证据”+“引用规范与学术诚信”两条硬核论据。",
      "结尾段用 While some may argue that ... 主动化解“挤占选修课时间”的反方质疑，档次立刻拉高一截。"
    ]
  },
  {
    "id": "q_wr_06",
    "skill": "writing",
    "type": "writing",
    "sectionId": "t_write_patterns",
    "difficulty": 2,
    "source": "2025.06 第2套（C4-008）",
    "title": "合理使用人工智能辅助学习",
    "essayType": "调查回应",
    "directions": "Suppose your university is conducting a survey to collect students' opinions on the appropriate use of AI technology in assisting learning. You are now to write an essay to express your view. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.",
    "wordTarget": [
      120,
      180
    ],
    "logicBlueprint": [
      "第一段（价值与核心原则）：肯定 AI 在学习中的普及与价值，随即点出“作为补充而非替代（a supplement, not a substitute）”的核心原则。",
      "第二段（利弊辩证）：先写 AI 提供个性化解释与即时反馈的优势，再转折提醒过度依赖（over-reliance）会削弱独立思考与判断力。",
      "第三段（落地建议）：呼吁学生用 AI 辅助查漏补缺而非代写，同时呼吁高校制定清晰使用规范。"
    ],
    "transferablePatterns": [
      {
        "en": "AI should be used as a supplement, not a substitute, for independent learning.",
        "zh": "AI 应当作为自主学习的补充，而非替代品。",
        "usage": "科技工具类作文王牌金句，精准界定合理边界。"
      },
      {
        "en": "Over-reliance on AI tools may weaken critical thinking and judgment.",
        "zh": "过度依赖 AI 工具可能削弱批判性思维与判断力。",
        "usage": "科技双刃剑主题高频反面论证句。"
      },
      {
        "en": "On the one hand ... However, on the other hand ...",
        "zh": "一方面……然而另一方面……",
        "usage": "平衡展开技术利弊的标准结构。"
      }
    ],
    "topicKeywords": [
      "ai",
      "technology",
      "learning",
      "students",
      "supplement",
      "substitute",
      "thinking",
      "feedback",
      "reliance",
      "guidelines"
    ],
    "modelEssay": "With the rapid development of artificial intelligence, AI tools have entered almost every aspect of campus study, reshaping how undergraduates gather information and revise coursework. From my perspective, AI should be used as a supplement, not a substitute, for independent learning.\n\nOn the one hand, AI technology plays a vital role in enhancing study efficiency by offering personalized explanations, targeted language practice, and instant feedback whenever students encounter difficult concepts outside class. However, on the other hand, over-reliance on AI can weaken students' critical thinking and independent problem-solving abilities. If undergraduates blindly copy generated answers without understanding the reasoning behind them, genuine academic growth will inevitably be compromised.\n\nTo sum up, students should treat AI as a helpful tutor to test ideas and polish drafts rather than a shortcut to complete assignments. Meanwhile, universities should establish clear academic guidelines so that emerging technology truly empowers education.",
    "sentenceDissection": [
      {
        "en": "From my perspective, AI should be used as a supplement, not a substitute, for independent learning.",
        "zh": "在我看来，人工智能应作为自主学习的补充，而非替代品。",
        "highlight": "supplement 与 substitute 押头韵对照，精准回应题干 appropriate use。"
      },
      {
        "en": "However, on the other hand, over-reliance on AI can weaken students' critical thinking and problem-solving abilities.",
        "zh": "然而另一方面，对 AI 的过度依赖会削弱学生的批判性思维和解决问题的能力。",
        "highlight": "over-reliance on 后接介词 on，搭配准确地道。"
      },
      {
        "en": "Meanwhile, universities should establish clear guidelines so that technology truly empowers education.",
        "zh": "与此同时，高校应制定明确的使用准则，让技术真正赋能教育。",
        "highlight": "从个人自律延伸到学校规范，收尾格局完整。"
      }
    ],
    "hintSteps": [
      "审题紧抓关键词 appropriate use（合理使用），绝不能只吹 AI 有多强或一味禁止，必须写出“边界感”。",
      "直接嵌入核心金句 a supplement, not a substitute 与 over-reliance on，立刻点亮阅卷得分点。",
      "结尾从“学生怎么做 + 学校怎么做”双视角收尾，字数精准落在 145–165 词。"
    ]
  },
  {
    "id": "q_wr_07",
    "skill": "writing",
    "type": "writing",
    "sectionId": "t_write_struct",
    "difficulty": 2,
    "source": "2025.06 第3套（C4-009）",
    "title": "培养大学生的跨文化交际能力",
    "essayType": "论坛议论文",
    "directions": "Suppose your university is organizing a forum on the development of students' cross-cultural communication abilities. You are now to write an essay to express your view. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.",
    "wordTarget": [
      120,
      180
    ],
    "logicBlueprint": [
      "第一段（背景与重要性）：点出全球化互联时代背景，强调培养跨文化交际能力对当代大学生不可或缺。",
      "第二段（为何重要）：从个人视野与同理心成长（Exposure to ...）及就业市场竞争优势（competitive edge）两层展开。",
      "第三段（如何培养）：给出可落地途径——参与交流项目、校内多元文化活动以及注重语境的外语课程。"
    ],
    "transferablePatterns": [
      {
        "en": "Exposure to different perspectives broadens students' horizons and cultivates empathy.",
        "zh": "接触多元视角能够拓宽学生视野并培养同理心。",
        "usage": "“接触—成长”因果链经典高级句型，广泛适用于教育文化题。"
      },
      {
        "en": "gives graduates a clear competitive edge in the global job market",
        "zh": "赋予毕业生在全球就业市场中的明显竞争优势",
        "usage": "competitive edge 是职场与能力成长类作文高频加分短语。"
      },
      {
        "en": "It is widely acknowledged that ... plays a crucial role in ...",
        "zh": "人们普遍认为……在……中扮演着关键角色。",
        "usage": "稳妥大气的议论文开篇句式。"
      }
    ],
    "topicKeywords": [
      "cross-cultural",
      "communication",
      "abilities",
      "global",
      "students",
      "perspectives",
      "culture",
      "exchange",
      "competitive",
      "campus"
    ],
    "modelEssay": "It is widely acknowledged that in an increasingly interconnected world, developing students' cross-cultural communication abilities plays a crucial role in higher education. Understanding cultural diversity is no longer optional; it has become a core competency for every college student preparing for global collaboration.\n\nFirst and foremost, exposure to different perspectives broadens students' horizons and cultivates mutual respect and empathy, enabling them to cooperate smoothly in international academic projects and avoid unnecessary misunderstandings. Furthermore, strong cross-cultural skills give graduates a clear competitive edge in the global job market, as modern employers highly value professionals who can bridge cultural gaps and communicate effectively across borders.\n\nTo cultivate this essential ability, universities should expand student exchange programs, host multicultural campus festivals, and integrate authentic cultural contexts into language courses. In conclusion, proactive cross-cultural learning prepares students to thrive confidently both on campus and on the wider global stage.",
    "sentenceDissection": [
      {
        "en": "Exposure to different perspectives broadens students' horizons and cultivates respect and empathy.",
        "zh": "接触不同视角能拓宽学生视野，并培养尊重与同理心。",
        "highlight": "抽象名词 Exposure 作主语 + 双动词平行，远胜于简单句 If we meet different people。"
      },
      {
        "en": "Furthermore, strong cross-cultural skills give graduates a clear competitive edge in the global job market.",
        "zh": "此外，出色的跨文化能力会为毕业生在全球求职市场带来鲜明的竞争优势。",
        "highlight": "competitive edge 精准高级，承上启下衔接职业发展。"
      },
      {
        "en": "To cultivate this ability, universities should expand student exchange programs, host multicultural campus festivals, and integrate cultural context into language courses.",
        "zh": "为培养这一能力，高校应拓展交换生项目、举办多元文化节，并将文化语境融入语言课程。",
        "highlight": "三连动宾结构给出具体可行路径，不空洞。"
      }
    ],
    "hintSteps": [
      "审题警惕：不要把全文写成空泛的文化差异科普（如中美饮食不同），必须紧扣“为何要培养 + 大学如何培养”。",
      "第二段分别从“视野与学术合作”和“职业竞争优势（competitive edge）”双线论证价值。",
      "第三段给出三条具体培养途径，使文章既有立意高度又有落地抓手。"
    ]
  },
  {
    "id": "q_wr_08",
    "skill": "writing",
    "type": "writing",
    "sectionId": "t_write_patterns",
    "difficulty": 1,
    "source": "2024.12 第2套（C4-011）",
    "title": "丰富大学生中国传统文化知识的方法",
    "essayType": "校报投稿",
    "directions": "Suppose the university newspaper is inviting submissions from the students for its coming edition on how to enrich students' knowledge of traditional Chinese culture. You are now to write an essay for submission. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.",
    "wordTarget": [
      120,
      180
    ],
    "logicBlueprint": [
      "第一段（点题）：引出传承中华优秀传统文化的重要性，明确提出高校应采取务实方法丰富学生的传统文化知识。",
      "第二段（双路径展开）：路径一是把选修课与实践工作坊结合（学术洞见 + 动手体验）；路径二是通过校园节日市集、戏曲展演和博物馆参访营造沉浸式氛围。",
      "第三段（总结呼应）：总结指出把课堂知识与亲身体验相融合，能让学生真正理解并热爱中华传统文化。"
    ],
    "transferablePatterns": [
      {
        "en": "One effective method is to connect elective courses with hands-on workshops.",
        "zh": "一种有效的方法是将选修课程与实践工作坊相结合。",
        "usage": "方法建议类作文精准主题句，后接具体落地举措。"
      },
      {
        "en": "not only provide academic insights but also offer hands-on experience",
        "zh": "不仅提供学术洞见，还带来亲身实践体验",
        "usage": "not only ... but also ... 经典并列句型，强调知行合一。"
      },
      {
        "en": "deepen students' appreciation of cultural heritage",
        "zh": "加深学生对文化遗产的欣赏与认同",
        "usage": "传统文化类高分高频表达。"
      }
    ],
    "topicKeywords": [
      "traditional",
      "chinese",
      "culture",
      "knowledge",
      "enrich",
      "courses",
      "workshops",
      "hands-on",
      "festivals",
      "heritage"
    ],
    "modelEssay": "In recent years, there has been growing awareness of the need to preserve and pass down our rich cultural heritage. To enrich university students' knowledge of traditional Chinese culture, campuses should move beyond dry textbooks and adopt more engaging, interactive approaches.\n\nOne effective method is to connect elective courses with practical cultural workshops. For example, classes on calligraphy, traditional tea culture, or classical architecture can not only provide valuable academic insights but also offer hands-on experience that leaves a lasting impression. In addition, student clubs can organize seasonal cultural festivals, folk music performances, and museum field trips so that students appreciate traditional values in a lively, shared community.\n\nAll in all, enriching cultural knowledge requires combining systematic study with active personal participation. When students authentically experience traditional arts on campus, they will naturally develop deeper cultural confidence and carry these timeless traditions forward.",
    "sentenceDissection": [
      {
        "en": "One effective method is to connect elective courses with practical workshops.",
        "zh": "一种行之有效的方法是将选修课程与实践工作坊连接起来。",
        "highlight": "简洁清晰的主题句，直接回应题干 how to enrich。"
      },
      {
        "en": "Classes on calligraphy, traditional tea culture, or classical architecture can not only provide academic insights but also offer hands-on experience.",
        "zh": "书法、茶文化或古建筑课程不仅能提供学术见解，还能带来亲身实践体验。",
        "highlight": "not only ... but also ... 串联理论与实践双收益。"
      },
      {
        "en": "When students actively experience traditional arts on campus, they will naturally develop deeper cultural confidence.",
        "zh": "当学生在校园中主动体验传统艺术时，他们自然会建立起更深厚的文化自信。",
        "highlight": "cultural confidence（文化自信）紧扣当代四级热词。"
      }
    ],
    "hintSteps": [
      "审题切记：不要把整篇写成空洞赞美传统文化有多伟大，核心必须回答 how to enrich（怎么丰富知识）！",
      "把建议分成“课堂内（选修课+工作坊）”和“课堂外（节日活动+博物馆参访）”两层，条理一目了然。",
      "灵活嵌入 hands-on experience 与 not only ... but also ...，保证字数在 145–165 词。"
    ]
  },
  {
    "id": "q_wr_09",
    "skill": "writing",
    "type": "writing",
    "sectionId": "t_write_struct",
    "difficulty": 1,
    "source": "2024.12 第3套（C4-012）",
    "title": "大学生如何为建设绿色校园作贡献",
    "essayType": "校报投稿",
    "directions": "Suppose the university newspaper is inviting submissions from the students for its coming edition on how the students can contribute to a green campus. You are now to write an essay for submission. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.",
    "wordTarget": [
      120,
      180
    ],
    "logicBlueprint": [
      "第一段（点题）：强调建设环保可持续的绿色校园离不开每位学生的日常行动。",
      "第二段（个人习惯 + 集体倡导）：先写日常微习惯（减少一次性用品、随手关灯、垃圾分类、骑行降低碳足迹），再写通过社团环保倡议和志愿活动带动身边人。",
      "第三段（总结号召）：强调点滴习惯汇聚成巨大改变，呼吁大家共同行动打造绿色校园。"
    ],
    "transferablePatterns": [
      {
        "en": "Students can contribute to a green campus by adopting simple yet impactful habits.",
        "zh": "学生可以通过养成简单却有影响力的习惯为绿色校园作贡献。",
        "usage": "simple yet impactful 突出小行动的大价值，极适合倡议类文章。"
      },
      {
        "en": "reduce our daily carbon footprint",
        "zh": "减少我们的日常碳足迹",
        "usage": "生态环保话题王牌词组。"
      },
      {
        "en": "make joint efforts to create a cleaner and more sustainable campus",
        "zh": "共同努力打造更洁净、更可持续的校园",
        "usage": "倡议类作文经典结尾号召句。"
      }
    ],
    "topicKeywords": [
      "green",
      "campus",
      "students",
      "contribute",
      "habits",
      "recycling",
      "energy",
      "carbon",
      "footprint",
      "sustainable"
    ],
    "modelEssay": "Building a green campus is not solely the responsibility of university administrators; every single student has an essential part to play. By adopting simple yet impactful habits in daily campus life, we can make our shared learning environment much cleaner and more sustainable.\n\nFirst and foremost, students can contribute to a green campus by actively cutting down on waste and saving energy. For instance, carrying reusable bottles, sorting dormitory trash properly, turning off unused lights, and walking or cycling to class all help reduce our daily carbon footprint. Moreover, students can join environmental clubs to organize tree-planting drives, secondhand book exchanges, and green awareness campaigns on social media, inspiring more peers to take practical action.\n\nIn conclusion, small daily choices steadily add up to meaningful environmental change. If all students make joint efforts today, we will surely build a greener, healthier campus for generations to come.",
    "sentenceDissection": [
      {
        "en": "By adopting simple yet impactful habits in daily life, we can make our learning environment cleaner and more sustainable.",
        "zh": "通过在日常生活中养成简单却富有成效的习惯，我们能让学习环境更洁净、更可持续。",
        "highlight": "simple yet impactful 凝练传神，点明学生行动的切入点。"
      },
      {
        "en": "Carrying reusable bottles, sorting dormitory trash properly, turning off unused lights, and walking or cycling to class all help reduce our daily carbon footprint.",
        "zh": "携带可重复使用水杯、规范宿舍垃圾分类、随手关灯以及步行或骑车上课，都有助于减少日常碳足迹。",
        "highlight": "四项具体校园生活动作平行列举，极接地气。"
      },
      {
        "en": "If all students make joint efforts, we will surely build a greener, healthier campus for generations to come.",
        "zh": "如果全体学生共同努力，我们必将为后辈学子建起更绿色健康的校园。",
        "highlight": "make joint efforts + 条件句有力号召收尾。"
      }
    ],
    "hintSteps": [
      "审清行为主体：题干问的是 how the students can contribute，切忌大篇幅提议“学校应该花钱装太阳能板”，所有动作要落回“学生自己能做什么”。",
      "把学生行动按“个人日常微习惯”和“集体社团宣传/二手循环”分层展开，逻辑立马清晰。",
      "务必写进环保高频亮点词：reusable, carbon footprint, sustainable, make joint efforts。"
    ]
  }
];

  if (typeof window !== 'undefined') {
    window.QUESTION_BANK = QUESTION_BANK;
  } else if (root && typeof root === 'object') {
    root.QUESTION_BANK = QUESTION_BANK;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      QUESTION_BANK: QUESTION_BANK
    };
  }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
