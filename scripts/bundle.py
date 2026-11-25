import os
import shutil
import subprocess

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(REPO_ROOT, "src")
XIAOKE_DIR = os.path.join(REPO_ROOT, "assets", "xiaoke")
OUT_HTML = os.path.join(REPO_ROOT, "index.html")
PARENT_OFFLINE = os.path.join(
    os.path.dirname(REPO_ROOT),
    "四级冲刺_小克伴学复习与高频带背.html",
)

JS_FILES = [
    "vocab_data.js",
    "knowledge_data.js",
    "questions_data.js",
    "explanations_data.js",
    "cet4_animations.js",
    "cet4_speech.js",
    "cet4_grader.js",
    "techo_pageturn.js",
    "real_papers_data.js",
    "real_paper_studio.js",
    "xiaoke_assistant.js",
    "app.js",
]

TRANSPARENT_GIF = (
    "data:image/gif;base64,"
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
)


def safe_inline_script(text: str) -> str:
    return text.replace("</script>", "<\\/script>")


def main() -> None:
    missing = [jf for jf in JS_FILES if not os.path.isfile(os.path.join(SRC, jf))]
    if missing:
        raise FileNotFoundError(f"Missing JS modules in {SRC}: {', '.join(missing)}")

    for jf in JS_FILES:
        path = os.path.join(SRC, jf)
        res = subprocess.run(["node", "--check", path], capture_output=True, text=True)
        if res.returncode != 0:
            raise RuntimeError(f"JS syntax check failed in {jf}:\n{res.stderr}")
        print(f"[OK] JS syntax check passed: {jf}")

    with open(os.path.join(SRC, "style.css"), encoding="utf-8") as f:
        css = f.read()
    with open(os.path.join(XIAOKE_DIR, "xiaoke_b64.json"), encoding="utf-8") as f:
        sprites_json = f.read()
    with open(os.path.join(XIAOKE_DIR, "manifest.json"), encoding="utf-8") as f:
        manifest_json = f.read()

    scripts_html = []
    for jf in JS_FILES:
        with open(os.path.join(SRC, jf), encoding="utf-8") as f:
            body = safe_inline_script(f.read())
        scripts_html.append(f"  <script>\n{body}\n  </script>")

    inline_scripts_block = "\n".join(scripts_html)

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#ebe2d2">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <title>四级冲刺手账 · 小克伴学复习与高频带背</title>
  <script>
  (function(){{
    if (location.protocol === 'file:') return;
    var q = location.search || '';
    if (q.indexOf('view=pc') !== -1) {{ try {{ sessionStorage.setItem('cet4_prefer_pc', '1'); }} catch (e) {{}} return; }}
    if (q.indexOf('view=mobile') !== -1) {{ location.replace('mobile.html'); return; }}
    try {{ if (sessionStorage.getItem('cet4_prefer_pc') === '1') return; }} catch (e) {{}}
    var isMob = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent || '')
      || (window.innerWidth <= 760 && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
    if (isMob) location.replace('mobile.html');
  }})();
  </script>
  <style>
{css}
  </style>
</head>
<body>
  <div class="techo-binder-stage">
    <!-- Protruding Top Washi/Kraft Folder Index Tabs Resting Along Notebook Binding Edge -->
    <header class="techo-top-edge" aria-label="手账顶部索引签">
      <div class="techo-crest" id="brand-home" role="button" tabindex="0">
        <div class="crest-photo-frame">
          <img id="brand-xiaoke-img" src="{TRANSPARENT_GIF}" alt="小克手账主理人头像">
        </div>
        <div class="crest-copy">
          <span class="crest-title">四级冲刺手账</span>
          <span class="crest-sub">Techo No.04</span>
        </div>
      </div>

      <nav class="techo-folder-tabs" aria-label="手账分栏视图">
        <button type="button" class="nav-tab active" data-view="knowledge">
          <span class="tab-dot" aria-hidden="true"></span>
          <span>破题手账</span>
          <span class="nav-badge" id="nav-knowledge-badge">0/14</span>
        </button>
        <button type="button" class="nav-tab" data-view="vocab">
          <span class="tab-dot" aria-hidden="true"></span>
          <span>高频带背</span>
          <span class="nav-badge" id="nav-vocab-badge">0/312</span>
        </button>
        <button type="button" class="nav-tab" data-view="practice">
          <span class="tab-dot" aria-hidden="true"></span>
          <span>真题实战</span>
          <span class="nav-badge" id="nav-practice-badge">0/80</span>
        </button>
        <button type="button" class="nav-tab" data-view="mastery">
          <span class="tab-dot" aria-hidden="true"></span>
          <span>冲刺雷达</span>
          <span class="nav-badge" id="nav-mastery-badge">0%</span>
        </button>
        <button type="button" class="nav-tab" data-view="notebook">
          <span class="tab-dot" aria-hidden="true"></span>
          <span>错词夹</span>
          <span class="nav-badge" id="nav-notebook-badge">0</span>
        </button>
      </nav>

      <div class="techo-top-utils">
        <div class="bookmark-ribbon-badge" aria-label="手账丝带进度签">
          <button type="button" class="ribbon-jump-btn" id="top-sprint-badge" title="定位至 12 天手账日历">
            <span id="rail-day-val">Day 0/12</span>
          </button>
          <span class="ribbon-sep" aria-hidden="true">·</span>
          <button type="button" class="ribbon-jump-btn" id="rail-vocab-meter" title="前往高频语音带背">
            <span id="rail-vocab-val">词 0/312</span>
          </button>
        </div>
        <button type="button" class="brass-btn" id="theme-toggle">台灯夜读</button>
        <button type="button" class="brass-btn" id="go-mobile-ver" onclick="try{{sessionStorage.removeItem('cet4_prefer_pc');}}catch(e){{}}location.href=location.protocol==='file:'?'./四级冲刺_手机专属版.html':'mobile.html';">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          <span>手机版</span>
        </button>
      </div>
    </header>

    <!-- Centered Open Physical Cotton-Paper Ring-Binder Notebook -->
    <div class="techo-notebook-sheet">
      <!-- 36px Decorative Left Ring-Binder Punch-Hole Margin Gutter -->
      <div class="binder-margin-gutter" aria-hidden="true"></div>

      <div class="techo-page-body">
        <div class="page-running-head">
          <div class="running-head-left">
            <span class="running-code">TECHO NO.04</span>
            <span>14天大学英语四级实体活页手账 · 听力 35% · 阅读 35% · 翻译 15% · 写作 15%</span>
          </div>
          <span class="running-stamp">710 分值冲刺记录本</span>
        </div>

        <main class="app-shell">
          <!-- ==================== VIEW 1: OPEN TWO-PAGE COVER + DAILY PLANNER + BOOK TOC ==================== -->
          <section class="view-section active" id="view-knowledge">
            <div class="techo-cover-spread">
              <!-- Left Page: Editorial Title, Actions, Stitched 710 Scale Ruler & Live Progress Ledger -->
              <div class="cover-left-page">
                <div class="cover-eyebrow-row">
                  <span class="cover-edition-tag">HOBONICHI SPRINT LOG · 2014–2026 真题语料</span>
                  <span class="cover-quiet-chip">离线即开 · 专注高分提效</span>
                </div>

                <h1 class="cover-headline">
                  <span class="hl-marker">14天四级冲刺手账</span><br>高频带背与六大题型精研
                </h1>

                <p class="cover-subcopy">
                  把近十年四级真题词频与考法折进一本温润耐读的活页手账：串联「12天艾宾浩斯四拍语音带背」「听力未听先知与信号词雷达」「15选10词性四车道」「长篇与仔细阅读定位排雷」以及「6套历年完整真题离线批改」。
                </p>

                <div class="cover-spec-row">
                  <span class="spec-chip"><strong>312</strong> 真题高频词</span>
                  <span class="spec-chip"><strong>6套</strong> 历年完整真题</span>
                  <span class="spec-chip"><strong>80</strong> 分型精练题</span>
                  <span class="spec-chip"><strong>7套</strong> 60fps 实验台</span>
                  <span class="spec-chip"><strong>10款</strong> 小克伴学贴纸</span>
                </div>

                <div class="cover-cta-row">
                  <button type="button" class="btn-primary" id="cta-start-vocab">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                    <span>开启今日语音带背</span>
                  </button>
                  <button type="button" class="btn-honey" id="cta-start-realpaper">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>
                    <span>刷完整历年真题</span>
                  </button>
                  <button type="button" class="btn-sage" id="cta-start-listen">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                    <span>听力未听先知特训</span>
                  </button>
                  <button type="button" class="btn-paper" id="cta-start-practice">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    <span>分型精练</span>
                  </button>
                </div>

                <!-- Stitched 710-Score Scale Ruler -->
                <div class="score-ruler-box">
                  <div class="score-ruler-head">
                    <span>710 分值刻度尺（听力 + 阅读共占 70% 核心大头）</span>
                    <span id="hero-sprint-pct">打卡 0 / 12 天 · 词汇留存 0%</span>
                  </div>
                  <div class="score-ruler-bar">
                    <div class="ruler-seg seg-listen">听力 <strong>248.5</strong></div>
                    <div class="ruler-seg seg-read">阅读 <strong>248.5</strong></div>
                    <div class="ruler-seg seg-trans">翻译 <strong>106.5</strong></div>
                    <div class="ruler-seg seg-write">写作 <strong>106.5</strong></div>
                  </div>
                  <div class="cover-progress-line">
                    <span>12日手账进度</span>
                    <div class="techo-bar-track"><div class="techo-bar-fill" id="hero-sprint-fill"></div></div>
                  </div>
                </div>

                <!-- Live Progress Ledger -->
                <div class="techo-ledger-strip">
                  <div class="ledger-cell">
                    <span class="ledger-lbl">已背高频词</span>
                    <span class="ledger-val accent" id="stat-vocab-done">0 / 312</span>
                  </div>
                  <div class="ledger-cell">
                    <span class="ledger-lbl">手账打卡</span>
                    <span class="ledger-val" id="stat-sprint-days">0 / 12 天</span>
                  </div>
                  <div class="ledger-cell">
                    <span class="ledger-lbl">分型真题</span>
                    <span class="ledger-val" id="stat-prac-done">0 / 80</span>
                  </div>
                  <div class="ledger-cell">
                    <span class="ledger-lbl">历年全卷</span>
                    <span class="ledger-val sage" id="stat-real-papers">6 套</span>
                  </div>
                  <div class="ledger-cell">
                    <span class="ledger-lbl">综合就绪</span>
                    <span class="ledger-val accent" id="stat-readiness">0%</span>
                  </div>
                </div>
              </div>

              <!-- Right Page: Xiao Ke Washi-Taped Polaroid & Desk Standee Card + 10-Sticker Stamp Strip -->
              <div class="cover-right-page">
                <div class="techo-polaroid-frame">
                  <span class="washi-tape" aria-hidden="true"></span>
                  <div class="polaroid-photo-mat">
                    <span class="polaroid-caption-tag">DESK STANDEE · XIAOKE</span>
                    <span class="polaroid-date-mark">No.04</span>
                    <img class="hero-mascot-img" id="hero-mascot-img" src="{TRANSPARENT_GIF}" alt="小克伴学立绘">
                  </div>
                  <div class="hero-speech" id="hero-speech">午安呀，我是小克！点我或下方 01–10 手账贴纸，切换四级破题黄金口诀～</div>
                </div>

                <div class="polaroid-strip-head">
                  <span>小克 10 款手账邮票贴纸</span>
                  <span>No.01 – No.10</span>
                </div>
                <div class="polaroid-sticker-bar" id="xiaoke-ribbon-strip"></div>
              </div>
            </div>

            <!-- 12-Day Hobonichi Daily Planner Grid -->
            <div class="techo-section-band" id="sprint-roadmap-anchor">
              <div class="band-header">
                <div class="band-title-wrap">
                  <span class="band-code">DAILY PLANNER · 12D</span>
                  <h2 class="band-title">12 天 Hobonichi 冲刺日程手账</h2>
                  <span class="techo-stamp terracotta">点选右上圆框盖「済」红泥印章</span>
                </div>
                <span class="band-sub">第 13–14 天留白专攻错词夹清零与高分范文复述</span>
              </div>
              <div class="sprint-planner-grid" id="sprint-roadmap-grid"></div>
            </div>

            <!-- 6-Chapter Book Table of Contents -->
            <div class="techo-section-band" id="zine-directory-anchor">
              <div class="band-header">
                <div class="band-title-wrap">
                  <span class="band-code">CONTENTS · CH.01–06</span>
                  <h2 class="band-title">六大题型手账总目录（14 节破题精讲）</h2>
                </div>
                <button type="button" class="secondary-btn" id="btn-toggle-directory">收起总目录</button>
              </div>
              <div class="book-toc-grid" id="zine-directory-grid"></div>
            </div>

            <!-- Sticky Paper Ribbon Section Switcher + Graph-Paper Reading Page -->
            <div id="knowledge-anchor">
              <div class="techo-lesson-switcher" id="zine-lesson-switcher"></div>
              <div class="lesson-spread-wrap" id="section-reader-host"></div>
            </div>
          </section>

          <!-- ==================== VIEW 2: RULED INDEX FLASHCARDS & COZY AUDIO DESK ==================== -->
          <section class="view-section" id="view-vocab">
            <div id="vocab-host"></div>
          </section>

          <!-- ==================== VIEW 3: 6-SKILL PRACTICE & 6 AUTHENTIC REAL PAPERS ==================== -->
          <section class="view-section" id="view-practice">
            <div id="practice-host"></div>
          </section>

          <!-- ==================== VIEW 4: HOBONICHI MONTHLY TRACKER ==================== -->
          <section class="view-section" id="view-mastery">
            <div id="mastery-host"></div>
          </section>

          <!-- ==================== VIEW 5: TABBED PAPER CLIPPINGS BINDER ==================== -->
          <section class="view-section" id="view-notebook">
            <div id="notebook-host"></div>
          </section>
        </main>
      </div>
    </div>
  </div>

  <!-- Fullscreen Lightbox for 60fps Interactive Animations -->
  <div class="lightbox-overlay" id="anim-lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
    <div class="lightbox-dialog">
      <div class="lightbox-header">
        <div>
          <div class="anim-lab-title"><span class="live-dot"></span><span id="lightbox-title">交互动画全屏实验台</span></div>
          <div id="lightbox-caption" style="font-size:12px;color:var(--text-sec);margin-top:2px"></div>
        </div>
        <button type="button" class="lightbox-close-btn" id="lightbox-close" title="退出全屏 (ESC)">×</button>
      </div>
      <div class="lightbox-body" id="lightbox-body"></div>
    </div>
  </div>

  <!-- Gentle Autumn-Petal & Warm-Paper Confetti Canvas -->
  <canvas id="fx-fireworks-canvas" aria-hidden="true"></canvas>

  <!-- Floating Draggable 10-Sprite Xiao Ke Companion Dock -->
  <div class="xiaoke-dock" id="xiaoke-dock" aria-live="polite"></div>

  <script>
window.XIAOKE_SPRITES = {safe_inline_script(sprites_json)};
window.XIAOKE_MANIFEST = {safe_inline_script(manifest_json)};
  </script>
{inline_scripts_block}
</body>
</html>
"""

    with open(OUT_HTML, "w", encoding="utf-8") as f:
        f.write(html)

    size_kb = os.path.getsize(OUT_HTML) / 1024
    print(f"[SUCCESS] Built PC HTML: {OUT_HTML} ({size_kb:.1f} KB)")

    if os.path.isdir(os.path.dirname(PARENT_OFFLINE)):
        shutil.copy2(OUT_HTML, PARENT_OFFLINE)
        print(f"[SYNC] Synced standalone PC HTML: {PARENT_OFFLINE}")


if __name__ == "__main__":
    main()
