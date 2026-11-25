# 《四级冲刺手账 · 小克伴学》14天极速备考与历年真题复习平台

纯静态双端离线学习平台（**日系实体活页书桌手账风 · Hobonichi Cozy Study Desk**），紧扣 **2014–2026 年大学英语四级真实语料与 2023.06–2026.06 完整历年真题**，集成 **312 个 12 天高频带背核心词（含 Web Speech 四拍语音带背）**、**28 组高频易混词对决**、**6 大章节 14 节四级破题精讲**、**7 套 60fps 交互动画实验台**、**80 道分型真题与 100% 深度分步解析**、**6 套完整历年真题全卷（342 道实考真题，零模拟卷）**、**翻译与写作离线智能阅卷引擎** 及 **小克 10 款手账差分伴学助手**。

## 在线访问（GitHub Pages）

- 桌面端 / 自动分流入口：https://zhangyuzhangyu233.github.io/cet4-review/
- 手机专属口袋手账版：https://zhangyuzhangyu233.github.io/cet4-review/mobile.html

> 访问根路径时会自动识别移动设备并跳转 `mobile.html`（加 `?view=pc` 或本地 `file://` 可强制电脑端）；电脑端与手机端共用同一份 `localStorage`（`cet4_xiaoke_sprint_v1`）刷词进度、打卡日历、真题作答与错词夹，随时无缝切换。

## 核心模块结构

- `src/`：纯原生模块化前端源码（零外部 CDN 依赖）
  - `vocab_data.js`：312 个真题实测高频词（12 天 × 26 词）+ 28 组易混词对决
  - `knowledge_data.js`：12 天冲刺日程 + 6 章 14 节破题精讲与微实操
  - `questions_data.js` & `explanations_data.js`：80 道分型精练真题（听力 22 / 选词 10 / 长篇匹配 12 / 仔细阅读 18 / 汉译英 9 / 写作 9）及 100% 深度解析
  - `real_papers_data.js` & `real_paper_studio.js`：6 套 2023.06–2026.06 真实四级全卷（342 题，支持即时精刷 / 整套连刷与 710 分制智能诊断）
  - `cet4_animations.js`：7 套 60fps Canvas 交互实验台（艾宾浩斯记忆曲线、听力未听先知与信号雷达、选词四车道、长篇扫描、仔细阅读五大干扰项、汉译英句型重组、作文三段式）
  - `cet4_speech.js` & `cet4_grader.js`：Web Speech 语音带背/多角色听力播报引擎与四级翻译/写作离线阅卷引擎
  - `xiaoke_assistant.js`：小克 10 款手账立绘差分伴学助手（渐进式不剧透提示 + 10 款贴纸图鉴）
  - `style.css` / `app.js`：桌面端实体活页书桌手账界面（午后书桌 / 台灯夜读双主题）
  - `mobile.css` / `mobile_app.js`：手机专属口袋手账界面
- `assets/xiaoke/`：小克 10 款高清透明差分素材与离线内嵌包（`xiaoke_b64.json`、`manifest.json`）
- `scripts/`：真题提取、素材处理、单文件离线打包与发布审计脚本
  - `bundle.py` -> 生成 `index.html`
  - `bundle_mobile.py` -> 生成 `mobile.html`
  - `audit_release.py` -> 7 项发布门禁检查
- `tests/`：Node.js 自动化测试套件（5 个测试文件，14,247 项断言）

## 本地构建与测试

在仓库根目录执行（需安装 Python 3 与 Node.js）：

```bash
py scripts/bundle.py
py scripts/bundle_mobile.py
py scripts/audit_release.py
node tests/test_data_integrity.js
node tests/test_cet4_grader.js
node tests/test_xiaoke_and_engines.js
node tests/test_real_papers.js
node tests/test_dom_contracts.js
```
