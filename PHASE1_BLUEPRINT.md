# CET-4 Sprint Study Platform — Phase 1 Reconnaissance & Architecture Blueprint

> Prepared by `repo-scout` for Phase 2 builders (`data-builder`, `engine-builder`, `ui-builder-pc`, `ui-builder-mobile`, `qa-verifier`).
> Local CET-4 source mirror: `c:\Users\zy134\Desktop\RealtimeAI\_cet46_source` (93 high-value CET-4 files, 82.97 MB + full 685-entry `_tree_inventory.json`).
> Reference codebase audited (read-only): `c:\Users\zy134\Desktop\RealtimeAI\realtime-ai-review`.
> Environment note: use `py` (Python 3.15 launcher — `pymupdf`/`fitz`, `pypdf`, `python-docx`/`docx`, `PIL` are all installed; bare `python` is not on PATH) and `node` (`C:\Program Files\nodejs\node.exe`).

---

## 1. `CET46-Resources` Complete CET-4 Inventory & Parseability Guide

Upstream repository `https://github.com/0609x/CET46-Resources.git` totals **1.98 GB (685 git tree entries)**:
- `四级真题/` (CET-4): **236 files / 834.69 MB** across **28 exam sessions (`2014.06`–`2026.06`)** — `.pdf` (183 files, 623.56 MB), `.mp3` (10 files, 204.12 MB), `.doc` (21 files, 6.24 MB), `.docx` (21 files, 0.76 MB), `.md` (1 file, 7.5 KB).
- `翻译与写作（每日更新）/`: **4 Markdown files / 0.55 MB** (UTF-8):
  - **`四级写作积累.md`** (22,399 B, 432 lines) — **CET-4 ONLY**, 12 curated essays (`C4-001`..`C4-012`, covering `2024.12`, `2025.06`, `2025.12`, `2026.06`) with prompt metadata, writing logic, source sentence breakdowns, transferable expressions/vocab tables, and migration practice drills!
  - `README.md` (15,836 B) — index & methodology.
  - *EXCLUDE as CET-6*: `写作积累.md` (396 KB, 5,036 lines) and `翻译积累.md` (125 KB, 1,114 lines) are explicitly **CET-6 (六级)** — do NOT ingest CET-6 prompts/translations as CET-4 items.
- `六级真题/` (219 files, 1,322.42 MB) — **EXCLUDED** completely.

### 1.1 Local Ready-to-Parse CET-4 Corpus (`_cet46_source`, 93 files, 82.97 MB)

All files below are already downloaded locally in `c:\Users\zy134\Desktop\RealtimeAI\_cet46_source` and **verified for clean Unicode text extraction**:

| Category | Exact Local Paths in `_cet46_source` | Count & Size | Extractability & Contents |
| --- | --- | --- | --- |
| **CET-4 Writing Curated MD** | `翻译与写作（每日更新）\四级写作积累.md` | 1 MD, 22.4 KB | UTF-8; 12 structured CET-4 writing units (`C4-001`–`C4-012`, 2024.12–2026.06) with logic, short-sentence dissection, transferable patterns & drills. |
| **2026.06 Full Papers + MD Key** | `四级真题\2026.06\真题PDF\cet4_2026_06_{1,2,3}.pdf` + `答案解析\2026年6月四级参考答案（卷面对照校对版）.md` | 3 PDFs (0.64 MB) + 1 MD (7.5 KB) | **100% clean text** (18.6k–25.0k chars/paper); MD gives Listening 1–25 keys (Sets 1–2), Reading 26–55 keys (Sets 1–3), Writing & Translation learning models (校园机器人/校园便利/大学生科研; 尊师与教师节/餐桌礼仪/礼尚往来). |
| **2024.06 Full Papers + Clean Quick Keys** | `四级真题\2024.06\真题PDF\cet4_2024_06_{1,2,3}.pdf` + `答案解析\2024年06月四级考试真题答案速查（第1,2,3套）.pdf` | 6 PDFs (1.9 MB) | **100% clean text**; papers 19k–25k chars; quick-answer PDFs ~2.3k chars each with Writing model + Listening 1–25 keys + Reading 26–55 keys + Translation model (e.g., 四合院/Siheyuan). |
| **2018.06 Full Papers + Detailed Answers + Listening Transcripts** | `四级真题\2018.06\真题PDF\2018.06四级真题第{1,2,3}套.pdf` + `答案解析\2018年6月英语四级真题答案解析（卷一,二,三）.pdf` | 6 PDFs (3.3 MB) | **98–99% clean text** (25.8k–39.5k chars/ans)! Includes **full Listening scripts with `(1)/(2)` evidence markers**, **`未听先知` pre-reading option prediction**, Banked Cloze, Long Reading & Careful Reading paragraph translations with `(37)/(46)` location anchors, Translation & Writing breakdowns! |
| **2017.12 Full Papers + Detailed Answers + Listening Transcripts** | `四级真题\2017.12\真题PDF\2017.12四级真题（卷1,2,3）.pdf` + `答案解析\2017年12月英语四级真题答案及解析（第一,二,三套）.pdf` | 6 PDFs (2.1 MB) | **99–100% clean text** (20.8k–37.5k chars/ans)! Full Listening transcripts, explanations, Banked Cloze, Reading, Translation, Writing. |
| **2019.12 DOCX Papers + Detailed Answers + Listening Transcripts** | `四级真题\2019.12\真题Word\*.docx` + `答案解析\2019.12英语四级解析第{1,2,3}套.pdf` | 3 DOCX + 3 PDFs (13.9 MB) | **95–96% clean text** (18.7k–34.5k chars/ans), includes Listening scripts & full explanations. |
| **2016.06 Detailed Answers + Listening Transcripts** | `四级真题\2016.06\答案解析\2016年6月大学英语四级第{1,2,3}套答案解析.pdf` | 3 PDFs (1.95 MB) | **98–99% clean text** (9.1k–30.2k chars/ans), includes Listening transcripts & explanations. |
| **2024.12 / 2025.06 / 2025.12 Clean Papers** | `四级真题\{2024.12,2025.06,2025.12}\真题PDF\cet4_*.pdf` | 9 PDFs (2.85 MB) | **100% clean text** (18.8k–26.2k chars/paper) — prime source for latest writing prompts, Chinese translation passages, reading texts, and high-frequency vocabulary mining. |
| **2014–2019 Clean DOCX Papers + 2014.12 Answer DOCX** | `四级真题\{2014.06,2014.12,2015.12,2016.12,2017.06,2017.12,2018.12,2019.06,2019.12}\**\*.docx` | 21 DOCX (0.76 MB) | 100% clean via `python-docx` (24k–30k chars each). |

### 1.2 Corpus Vocabulary Mining Findings (For Flagship <14-Day "高频单词带背")
- **No standalone vocabulary list exists in `CET46-Resources`**, so Phase 2 MUST mine high-frequency vocabulary directly from the 35+ clean local CET-4 papers!
- Prototype extraction across 35 clean local papers (`2015–2019 DOCX` + `2024–2026 PDF`) yielded:
  - **58,758** non-stopword English tokens (`>= 4` chars), **8,800** unique types.
  - **767 words** appearing in **>= 10 real CET-4 papers**; **1,876 words** in **>= 5 real papers**; **3,155 words** in **>= 3 real papers**.
- Filter out exam boilerplate (`passage`, `directions`, `answer`, `sheet`, `corresponding`, `following`, `choices`, `section`, `minutes`, `marked`, `single`, `letter`) and combine corpus frequency rank with CET-4 exam high-value lexical items (especially listening/reading paraphrase words, banked cloze high-frequency verbs/adj/adv, writing & translation core terms) to produce a **12-Day High-Frequency Guided Recitation Deck (300–360 words, 25–30/day)** with real corpus frequency badges (`近10年真题复现 N 次`) and real exam sentences!

### 1.3 Parsing Hazards (DO NOT WASTE TIME ON THESE!)
1. **Image-only scanned PDFs (0 text chars)**: `cet4_2020..2025_*_ans.pdf` (2–12 MB each) and `cet4_2023_*.pdf` (1.1–1.5 MB) contain only 5–18 whitespace chars — do NOT regex-parse them.
2. **Garbled CID font encoding**: `四级真题/2017.06/答案解析/*.pdf` extracts as `!"#$%&... LCmŸ...` — skip!
3. **Audio MP3s (204 MB)**: Do NOT embed MP3s in single-file HTML; use **Web Speech API (`window.speechSynthesis`)** on our clean extracted real CET-4 listening transcripts (`2016.06`, `2017.12`, `2018.06`, `2019.12`) + vocabulary read-aloud!

---

## 2. `realtime-ai-review` Audit Summary

### 2.1 Visual Style of `realtime-ai-review` (Baseline to Clearly Differentiate From)
- **Palette**: Cold Ocean-Tech Blue — Light bg `#f2f7fe` + cyan/blue radial glows, Dark bg `#071122` deep abyssal navy, Primary `#1d5cff`, Accent `#0891b2`, Hero gradient `#102a63 → #1a479e → #0e7490`, floating `.ocean-bubble` particles, dark `#0f172a` SVG preview windows with neon `.aero-led` status dots.
- **Typography**: System sans (`PingFang SC / Microsoft YaHei UI`) + `Cascadia Mono / Consolas` mono. `scripts/audit_release.py` strictly forbids emojis (`[\U0001F300-\U0001FAFF\u2600-\u27BF]`), bare `monospace`, and `SimSun`/`宋体`.
- **Layout & Signature Micro-Interactions to PRESERVE (in a fresh aesthetic)**:
  - Dual-file offline architecture: `index.html` (auto-redirects mobile UAs to `mobile.html` unless `?view=pc` or `file:`) + `mobile.html`, sharing ONE `localStorage` store.
  - 2-level collapsible sticky TOC -> dedicated sub-section pages with 3-step loop (`精讲 -> 实操 -> 60fps 交互动画`) + check-in (+15% mastery) + Prev/Next + Practice CTA.
  - Fullscreen blurred photo-lightbox (`#anim-lightbox`) for click-to-zoom 60fps Canvas animations with Play/Pause/Step/Reset/Speed controls.
  - Unlimited adaptive random practice (`curveLevel 1.0..4.0`, cooldown anti-repeat window, lock-after-answer), 3D-flip knowledge summary sidebar -> post-answer 3D-flip review sidebar (`本题详细解析` / `相关知识点`), 3-part `EXPLAIN_DETAILS` (`为什么这么做 / 逐步推导 / 考场避坑`), offline `SmartGrader`, cursor-anchored 60fps Canvas `FireworksFX`.
  - 3D tilt parallax mastery cards (`.parallax-card`) with dynamic mouse-spotlight glow & overall SVG mastery ring.
  - Frameless draggable bottom-right pet companion (`pet_assistant.js`): progressive non-spoiler hints, proactive `onWrongAnswer` coaching, inactivity auto-hint (`22s`/`28s`), Q-bounce squash, hover-to-pause bubble, minimize/restore pill.

### 2.2 Exact Mock Exam Locations to OMIT Completely ("不做模拟考")
Do **NOT** carry over any of the following into `cet4-review`:
- `scripts/bundle.py`: L170, L176 (`data-psub="mock"`), L186–188 (`#practice-pane-mock`, `#mock-exam-host`).
- `scripts/bundle_mobile.py`: L113 (`模拟卷答题卡`).
- `src/app.js`: `state.practiceSub`, `state.mockPageIdx`, `state.mockExam` (L43/50/52/60), `buildPetContext()` mock fields (L164, 188–208, 227–233), `mockMode` branches in `renderQuestionCard`/`bindQuestionCardEvents`, `renderPracticeView` mock switch (L3473–3486), entire mock subsystem (L3675–3891), init `[data-psub]` (L3971).
- `src/mobile_app.js`: L41/49–50/67, L272/296–315, L1388–1397, L1520–1681, L1897–1903, L2039–2194.
- `src/pet_assistant.js`: L128–130, 234, 274–323, 732–742, 832–833, 1182.
- `src/style.css`: L701–716, L828, L2158; `src/mobile.css`: L1177.

---

## 3. Recommended Fresh Visual Theme for `cet4-review` ("Autumn Salon · 暖橘牛津手账")

Designed to feel **100% distinct** from `realtime-ai-review`'s cold ocean blue and harmonize directly with **Xiao Ke (小克)** (warm ginger-orange hair, orange daisy hairpiece, Victorian cream/ivory ruffled dress, black velvet ribbon & gold tassels):

| Token | Light Mode ("暖杏手账 / Warm Ivory") | Dark Mode ("烛光书房 / Candlelit Library") |
| --- | --- | --- |
| `--bg-page` | `#fbf6ee` (warm cream parchment + subtle dot-grid linen) | `#17120e` (warm espresso-ebony, NOT blue!) |
| `--bg-surface` | `#fffdf9` (ivory stationery) | `#221b15` (walnut desk card) |
| `--bg-elevated` | `#ffffff` | `#2c231b` |
| `--bg-subtle` | `#f4eadb` (warm biscuit tint) | `#33281f` |
| `--border` / `--border-strong` | `#e7d9c6` / `#d2bca0` | `#3f3226` / `#594636` |
| `--primary` (Xiao Ke Autumn Orange) | `#d95d1e` (hover `#b84711`, deep `#7c2d12`) | `#f58634` (hover `#ff9e54`, deep `#ffd4a8`) |
| `--accent` (Oxford Library Emerald) | `#2b5b4e` (soft `rgba(43,91,78,0.11)`) | `#4eb89a` (soft `rgba(78,184,154,0.15)`) |
| `--gold` (Antique Tassel Gold) | `#c88a24` (soft `#fef3d6`) | `#eab34a` (soft `rgba(234,179,74,0.16)`) |
| `--ink-ribbon` (Black Velvet Ribbon) | `#1f1a17` | `#f5ece0` |
| `--success` / `--danger` | `#237a57` / `#c23b3b` | `#34c78e` / `#f06a6a` |
| `--text` / `--text-sec` / `--text-muted` | `#241c15` / `#524336` / `#857260` | `#f7efe4` / `#d4c3b0` / `#9c8976` |
| `--canvas-bg` | `#1c1612` (warm mahogany chalkboard) | `#120e0b` |
| **Hero Gradient** | `linear-gradient(128deg, #2c1e16 0%, #5c2c18 52%, #24483e 100%)` with antique gold border trim | Same warm lantern glow with softer elevation |
| **Typography** | **Editorial Serif** (`Georgia, Cambria, "Times New Roman", "Source Han Serif SC", serif`) for English passages, word flashcards & display titles + clean UI sans (`"PingFang SC", "Microsoft YaHei UI", "HarmonyOS Sans SC", system-ui, sans-serif`) for Chinese UI; zero emojis, zero bare `monospace`, zero `SimSun`! | Same |
| **Ambient & Geometry** | Crisp stationery corners (`12–16px`), editorial double-hairline borders, bookmark-ribbon tabs, wax-seal mastery badges, gentle optional floating autumn daisy petals (NO blue ocean bubbles!). | Same |

---

## 4. `<14-Day` CET-4 Sprint Architecture & Feature Blueprint (5 Views, Zero Mock Exam)

Shared `localStorage` key across PC (`index.html`) and Mobile (`mobile.html`): **`cet4_xiaoke_sprint_v1`**.
Persisted fields: `answers`, `favorites`, `studiedSections`, `sprintDaysDone` (`1..12`), `vocabProgress` (`{ [wordId]: { status: 'new'|'fuzzy'|'known', reps, nextDay, wrongCnt } }`), `vocabDay` (`1..12`), `streak`, `theme`.

### View 1: `knowledge` — 12天冲刺路线 & 四级全题型破题精讲
- **Hero + Interactive 12-Day Sprint Roadmap Strip ("14天内速通四级计划")**:
  - Days 1–3: 高频核心词 Day 1–3 + 听力"未听先知"选项预读与新闻首尾句突破
  - Days 4–6: 高频核心词 Day 4–6 + 听力长对话/篇章转折信号词 & 选词填空词性秒杀
  - Days 7–9: 高频核心词 Day 7–9 + 长篇阅读关键词定位扫读 & 仔细阅读五大干扰项排雷
  - Days 10–12: 高频核心词 Day 10–12 + 汉译英拆句重组 + 作文三段式迁移 + 错题生词清零
  - Each day chip is checkable and jumps directly to that day's Vocab Pack + Technique Section + Skill Drill!
- **Xiao Ke 10-Variant Companion Strip**: All 10 sprites clickable to swap hero sprite + CET-4 golden exam mantras.
- **6 Chapters · 14 Dedicated Sub-Section Pages** (2-level collapsible TOC -> 3-step loop: `1. 破题精讲与真题剖析` -> `2. 即学即练互动微实操` -> `3. 60fps 交互动画实验室` + fullscreen lightbox):
  - **Ch1 四级冲刺蓝图与听力速通 (3节)**: `t_sprint_plan` (分值权重 710分制 + 12天艾宾浩斯节奏), `t_listen_preread` (听力"未听先知"选项预读 + 新闻首尾句/数字时间雷达), `t_listen_signal` (长对话与篇章：转折/因果信号词、视听一致与同义替换 + Web Speech 真题脚本微精听).
  - **Ch2 选词填空词性秒杀 (2节)**: `t_cloze_pos` (15选10 四大词性后缀速判 + 语法槽位排除法), `t_cloze_context` (固定搭配、感情色彩与上下文复现).
  - **Ch3 长篇阅读极速定位 (2节)**: `t_long_scan` (定位词优先级：专有名词/数字/特殊词 + 扫读匹配), `t_long_para` (同义改写识别与多段干扰排除).
  - **Ch4 仔细阅读高分排雷 (3节)**: `t_read_detail` (题文同序、精准回文定位与细节同义替换), `t_read_main` (主旨大意、作者态度与词义猜测), `t_read_traps` (五大干扰项排雷：偷换概念/过度推断/绝对词/张冠李戴/无中生有).
  - **Ch5 汉译英拆句重组 (2节)**: `t_trans_struct` (主干提取 -> 长定语后置 -> 无主句/被动/分词转换), `t_trans_themes` (2014–2026 真题高频中国文化/社会/科技核心译词).
  - **Ch6 作文三段式结构与迁移 (2节)**: `t_write_struct` (议论文/提案/校报投稿/回应类 120–180词三段积木法), `t_write_patterns` (源自 `四级写作积累.md` 的 2024–2026 12篇真题高分可迁移句型库).

### View 2: `vocab` — Flagship 高频单词带背 (<14天速记核心引擎)
- **12-Day Corpus-Backed Wordbook (`vocab_data.js`)**: **300–360 ultra-high-frequency CET-4 core words** (`12 days × 25–30 words/day`), mined & frequency-ranked from `_cet46_source` real CET-4 papers, each entry containing:
  `id, day (1..12), word, phonetic, pos, meaning, examFreq (实测真题出现次数), roots (词根词缀/巧记), collocations[], realSentence { en, zh, source }, confusable? { pair, diff }, tag`.
- **4 Interactive Sub-Modes inside Vocab View**:
  1. **带背模式 (Hands-Free Audio Guided Recitation)**: Web Speech API auto-play loop with configurable speed (`0.8x / 1.0x / 1.15x`) & repeat count; visually highlights each beat (`1. 读词跟读 -> 2. 词根助记 -> 3. 核心释义与搭配 -> 4. 真题例句朗读 -> 自动切下一词`), paired with Xiao Ke `07_listening_audio`!
  2. **三态刷词卡片 (3-State Active Recall + In-Session Spaced Re-queue)**: 3D flip flashcard with `认识 (掌握)` / `模糊 (+7词复现)` / `不认识 (+3词马上重背)` buttons + Ebbinghaus review scheduling (`Day +1, +2, +4, +7`).
  3. **听音选义速测 (Listening-Recognition Quick Check)**: Plays audio only (with optional hide-spelling "盲听模式" for listening ears!) -> 4-choice Chinese meaning quiz with instant feedback & streak fireworks.
  4. **高频易混词对决 (Confusable Word Pairs)**: Dedicated ~24–30 high-frequency CET-4 confusable pairs (`adopt/adapt`, `affect/effect`, `ensure/insure/assure`, `preserve/reserve/conserve`, `economic/economical`, etc.) with contrastive micro-drills!

### View 3: `practice` — 分题型真题精练 & 无限自适应刷题 (**STRICTLY NO MOCK EXAM**)
- **Skill Scope Filter Bar** (replaces RealtimeAI's bank/mock switcher):
  - `全题型智能混刷 (无限自适应)` | `听力微精听` | `选词填空` | `长篇匹配` | `仔细阅读` | `汉译英实战` | `写作迁移实战`
- **Interactive Question Types**:
  - **Listening (`listening`)**: Real CET-4 `2016–2019` scripts + options! Features optional 15s **"未听先知" 预读倒计时** (skippable), **Web Speech API multi-speaker audio player** (News Report / `W:`&`M:` Long Conversation / Passage, speed `0.85x–1.15x`, replay), lock-after-answer, and post-answer **evidence-highlighted transcript** showing signal words & paraphrase bridges!
  - **Banked Cloze (`cloze`)**: Real CET-4 10-blank or focused 5-blank passages with clickable A–O word bank tiles (auto-dims used tiles; shows POS tags on review).
  - **Long Reading Matching (`matching`)**: Paragraph A–J collapsible reader + statement-to-paragraph selector with post-answer keyword highlight!
  - **Careful Reading (`reading`)**: Passage + single-choice questions with post-answer evidence sentence highlight & trap-type tag!
  - **Translation (`translation`)**: Real `2024–2026` CET-4 Chinese sentences/paragraphs -> English textarea -> offline **`Cet4Grader`** rubric scoring (key expressions, synonyms, grammar structure, completeness) + model translation + sentence-restructuring breakdown!
  - **Writing (`writing`)**: Real `2024–2026` CET-4 prompts (from `四级写作积累.md` & papers) -> live word counter (`120–180` target band meter) + transferable pattern chips -> offline **`Cet4Grader`** scoring (word count, 3-paragraph structure, topic relevance, connectors, advanced collocations) + logic blueprint!
- Preserves RealtimeAI's **3D-Flip Summary Sidebar -> Post-Answer 3D-Flip Review Sidebar** (`本题深度分步解析 [为什么/逐步破题/考场避坑]` <-> `关联考点与高频词`), adaptive difficulty `curveLevel 1.0..4.0`, and warm autumn-gold `FireworksFX`.

### View 4: `mastery` — 熟练度 & 12天备考仪表盘
- Overall CET-4 Sprint Readiness Ring + Vocab Retention Progress + 12-Day Sprint Check-in Progress + 6 Chapter & 14 Sub-Skill 3D Parallax Cards (custom botanical/editorial SVGs) + quick launch CTAs (`攻克最薄弱题型`, `去背今日高频词`, `听力专项提分`).

### View 5: `notebook` — 错题本、生词本 & 重点收藏
- 3 filter tabs + real-time keyword search on BOTH desktop & mobile: `错题攻坚营` (auto-removed when redone correctly), `生词/模糊词库` (direct launch into 带背/速测), `重点收藏夹`.

---

## 5. Seven Bespoke 60fps Interactive Visual Animations (`cet4_animations.js`)

All 7 Canvas engines share unified controls (`播放/暂停`, `单步`, `重播`, `倍速 0.4–2.5x`, click-to-fullscreen `#anim-lightbox`) and warm library-desk vector styling:
1. **`ebbinghaus`**: Interactive 14-day forgetting curve vs. spaced-repetition review spikes (Day 1/2/4/7/11) with toggleable review nodes.
2. **`listening_radar`**: Mode A (`preread`): scans A/B/C/D options to cluster repeated nouns & predict question focus; Mode B (`signal`): advancing audio waveform lighting up transition beacons (`but / however / actually`) & drawing paraphrase arcs to the right choice while stamping `原词干扰` on traps.
3. **`cloze_pipeline`**: Animated 15-word bank sorting into 4 POS color lanes (`n./v./adj./adv.`) -> syntax slot analyzer narrowing 15 -> 3 -> 1 by collocation & tense.
4. **`long_read_scan`**: Split-screen scanner highlighting statement anchors (`Year / Proper Noun / Rare Word`), firing match rays to Paragraphs A–J, and illuminating synonym paraphrases.
5. **`careful_trap`**: Passage-to-option evidence microscope locking onto the exact locating sentence and stamping the 5 CET-4 distractor traps (`偷换概念/过度推断/绝对化/张冠李戴/无中生有`).
6. **`trans_restructure`**: Animated Chinese-to-English syntactic tree: splits a real CET-4 Chinese sentence into `[主干]` + `[长定语]` + `[状语]`, then smoothly slides blocks into English SVO + post-modifier/passive order!
7. **`essay_builder`**: Interactive 3-paragraph structural block builder (`Para 1 观点 -> Para 2 双论据/例证 -> Para 3 建议/升华`) with live 120–180 word gauge and animated connector/phrase insertion.

---

## 6. Xiao Ke 10-Variant Mascot Hook Map (`xiaoke_b64.json`)

Matches `mascot-artist`'s exact 10 IDs (`window.XIAOKE_SPRITES` + `window.XIAOKE_MANIFEST`):
- `01_idle_smile` — default topbar/hero/floating companion baseline (light mode)
- `02_study_reading` — reading & knowledge notes, vocab flip study
- `03_thinking_hint` — progressive non-spoiler hints, inactivity auto-hint (`22s`/`28s`)
- `04_cheer_correct` — correct answers, fireworks, mastered vocab
- `05_encourage_wrong` — proactive `onWrongAnswer` coaching, mistake notebook
- `06_writing_quill` — writing & translation sections/drills, smart grader reports
- `07_listening_audio` — listening drills, active Web Speech audio & "高频单词带背" auto-play
- `08_sleepy_rest` — dark candlelit eye-care mode baseline & study break reminder
- `09_proud_streak` — high mastery rank, 3+ combo streak, daily sprint/vocab pack completion
- `10_eureka_tip` — exam trap callouts (`考场避坑`), confusable words, mantra strip

---

## 7. Recommended Phase 2 Module Ownership (Conflict-Free Parallel Split)

1. **`data-builder`**:
   - `cet4-review/scripts/extract_cet4_corpus.py` (parses `_cet46_source` -> verifies corpus word freq & real CET-4 items)
   - `cet4-review/src/vocab_data.js` (`window.VOCAB_DAYS`, `window.VOCAB_WORDS`, `window.CONFUSABLE_PAIRS`)
   - `cet4-review/src/knowledge_data.js` (`window.SPRINT_PLAN`, `window.MASTERY_TOPICS`, `window.KNOWLEDGE_MODULES`, `window.KNOWLEDGE_SECTIONS`, `window.TOPIC_SUMMARIES`, `window.XIAOKE_MANTRAS`)
   - `cet4-review/src/questions_data.js` (`window.QUESTION_BANK` covering `listening`, `cloze`, `matching`, `reading`, `translation`, `writing`)
   - `cet4-review/src/explanations_data.js` (`window.EXPLAIN_DETAILS` 100% ID coverage with `why`/`steps`/`pitfall`)
2. **`engine-builder`**:
   - `cet4-review/src/cet4_animations.js` (`window.Cet4AnimEngine` — 7 bespoke 60fps Canvas simulators)
   - `cet4-review/src/cet4_speech.js` (`window.Cet4Speech` — Web Speech API audio & guided vocab auto-play engine)
   - `cet4-review/src/cet4_grader.js` (`window.Cet4Grader` — offline smart grader for Translation, Writing, Cloze, Objective)
   - `cet4-review/src/xiaoke_assistant.js` (`window.XiaoKeAssistant` — frameless draggable 10-sprite companion)
3. **`ui-builder-pc`**:
   - `cet4-review/src/style.css` (Autumn Salon light/dark theme + responsive desktop layout)
   - `cet4-review/src/app.js` (5-view PC controller, NO mock exam, `cet4_xiaoke_sprint_v1`)
   - `cet4-review/scripts/bundle.py` -> `cet4-review/index.html` + synced `四级冲刺_小克伴学复习与高频带背.html`
4. **`ui-builder-mobile`**:
   - `cet4-review/src/mobile.css` (Autumn Salon mobile-first stylesheet, 5-tab bottom nav, drawers/sheets)
   - `cet4-review/src/mobile_app.js` (5-view mobile controller sharing `cet4_xiaoke_sprint_v1`, NO mock exam)
   - `cet4-review/scripts/bundle_mobile.py` -> `cet4-review/mobile.html` + synced `四级冲刺_手机专属版.html`
   - `cet4-review/scripts/audit_release.py` (checks 0 emojis, 0 bare `monospace`, 0 `SimSun`, 0 mock-exam relics, JS syntax check, bundle size check)
5. **`qa-verifier`**:
   - `cet4-review/tests/test_data_integrity.js`, `test_cet4_grader.js`, `test_xiaoke_assistant.js` + visual/browser QA on `index.html` & `mobile.html`.
