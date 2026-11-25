"""
CET-4 Sprint Mobile-First Pocket Hobonichi Techo Offline Bundler
Inlines Xiao Ke sprites + manifest + mobile.css + all 12 JS modules into:
  1. cet4-review/mobile.html
  2. c:\\Users\\zy134\\Desktop\\RealtimeAI\\四级冲刺_手机专属版.html
"""
import json
import os
import shutil
import subprocess
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(REPO_ROOT, "src")
ASSETS_XIAOKE = os.path.join(REPO_ROOT, "assets", "xiaoke")
OUT_HTML = os.path.join(REPO_ROOT, "mobile.html")
PARENT_OFFLINE = os.path.join(os.path.dirname(REPO_ROOT), "四级冲刺_手机专属版.html")

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
    "mobile_app.js",
]


def safe_inline_js(code: str) -> str:
    """Prevent accidental </script> tag termination inside inline script blocks."""
    return code.replace("</script>", "<\\/script>").replace("</SCRIPT>", "<\\/SCRIPT>")


def main() -> int:
    missing = []
    for jf in JS_FILES:
        p = os.path.join(SRC, jf)
        if not os.path.isfile(p):
            missing.append(p)
    css_path = os.path.join(SRC, "mobile.css")
    b64_path = os.path.join(ASSETS_XIAOKE, "xiaoke_b64.json")
    manifest_path = os.path.join(ASSETS_XIAOKE, "manifest.json")
    for req in (css_path, b64_path, manifest_path):
        if not os.path.isfile(req):
            missing.append(req)

    if missing:
        print("[ERROR] Missing required source/asset files:")
        for m in missing:
            print(f"  - {m}")
        return 1

    # Syntax-check every JS file with Node before bundling
    for jf in JS_FILES:
        p = os.path.join(SRC, jf)
        res = subprocess.run(["node", "--check", p], capture_output=True, text=True)
        if res.returncode != 0:
            print(f"[ERROR] JS syntax check failed for {jf}:\n{res.stderr}")
            return 1
        print(f"[OK] JS syntax check passed: {jf}")

    with open(css_path, encoding="utf-8") as f:
        css = f.read()

    with open(b64_path, encoding="utf-8") as f:
        sprites_obj = json.load(f)
    sprites_json = safe_inline_js(json.dumps(sprites_obj, ensure_ascii=False, separators=(",", ":")))
    brand_sprite_src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

    with open(manifest_path, encoding="utf-8") as f:
        manifest_obj = json.load(f)
    manifest_json = safe_inline_js(json.dumps(manifest_obj, ensure_ascii=False, separators=(",", ":")))

    scripts_content = {}
    for jf in JS_FILES:
        with open(os.path.join(SRC, jf), encoding="utf-8") as f:
            scripts_content[jf] = safe_inline_js(f.read())

    script_tags = "\n".join(
        f"  <script data-module=\"{jf}\">\n{scripts_content[jf]}\n  </script>"
        for jf in JS_FILES
    )

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#ebe2d2">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <title>四级冲刺手账 · Techo No.04 手机专属版</title>
  <style>
{css}
  </style>
</head>
<body>
  <header class="m-topbar">
    <div class="m-topbar-inner">
      <div class="m-brand">
        <div class="m-brand-avatar">
          <span class="m-brand-no" aria-hidden="true">04</span>
          <img id="m-brand-img" src="{brand_sprite_src}" alt="小克伴学">
        </div>
        <div class="m-brand-text">
          <div class="m-brand-title">四级冲刺手账</div>
          <div class="m-brand-sub">Techo No.04 · 带背与真题</div>
        </div>
      </div>
      <div class="m-top-actions">
        <button type="button" class="m-pill-btn brass" id="m-switch-pc" title="切换电脑版">
          <svg class="svg-ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          <span>电脑版</span>
        </button>
        <button type="button" class="m-pill-btn marigold" id="m-theme-toggle" title="切换午后书桌/台灯夜读主题">夜读</button>
      </div>
    </div>
  </header>

  <main class="m-shell">
    <section class="m-view active" id="m-view-knowledge" aria-label="12天冲刺与破题精讲"></section>
    <section class="m-view" id="m-view-vocab" aria-label="高频单词带背"></section>
    <section class="m-view" id="m-view-practice" aria-label="六大题型刷题与历年真题"></section>
    <section class="m-view" id="m-view-mastery" aria-label="冲刺评估雷达"></section>
    <section class="m-view" id="m-view-notebook" aria-label="错词收藏手账"></section>
  </main>

  <nav class="m-tabbar" aria-label="手机端五栏手账书签导航">
    <div class="m-tabbar-inner">
      <button type="button" class="m-tab-btn active" data-view="knowledge">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
        <span class="m-tab-label">精讲</span>
      </button>
      <button type="button" class="m-tab-btn" data-view="vocab">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><rect x="17" y="14" width="4" height="7" rx="1.5"/><rect x="3" y="14" width="4" height="7" rx="1.5"/></svg>
        <span class="m-tab-badge" id="m-tab-vocab">D1</span>
        <span class="m-tab-label">带背</span>
      </button>
      <button type="button" class="m-tab-btn" data-view="practice">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        <span class="m-tab-badge">真题</span>
        <span class="m-tab-label">刷题</span>
      </button>
      <button type="button" class="m-tab-btn" data-view="mastery">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><line x1="12" y1="3" x2="12" y2="12"/><line x1="12" y1="12" x2="18.4" y2="8.4"/></svg>
        <span class="m-tab-badge" id="m-tab-pct">0%</span>
        <span class="m-tab-label">雷达</span>
      </button>
      <button type="button" class="m-tab-btn" data-view="notebook">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
        <span class="m-tab-badge" id="m-tab-nb">0</span>
        <span class="m-tab-label">手账</span>
      </button>
    </div>
  </nav>

  <!-- Warm Cotton Bottom Sheet (Chapter/Section TOC, A-O Cloze Tray, Topic Summary Card) -->
  <div class="m-sheet-mask" id="m-sheet-mask" role="dialog" aria-modal="true" aria-labelledby="m-sheet-title">
    <div class="m-sheet">
      <div class="m-sheet-handle" aria-hidden="true"></div>
      <div class="m-sheet-head">
        <strong id="m-sheet-title" style="font-family:var(--font-serif);font-size:14px;font-weight:800">详情</strong>
        <button type="button" class="m-pill-btn ink" id="m-sheet-close">收起</button>
      </div>
      <div class="m-sheet-body" id="m-sheet-body"></div>
    </div>
  </div>

  <!-- Fullscreen 60fps Animation Lightbox -->
  <div class="lightbox-overlay" id="anim-lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" aria-hidden="true">
    <div class="lightbox-dialog">
      <div class="lightbox-header">
        <div class="anim-lab-title">
          <span class="live-dot"></span>
          <span id="lightbox-title">60FPS 交互动画全屏实验室</span>
        </div>
        <span id="lightbox-caption" style="display:none"></span>
        <button type="button" class="lightbox-close-btn" id="lightbox-close" title="关闭全屏">×</button>
      </div>
      <div class="lightbox-body" id="lightbox-body"></div>
    </div>
  </div>

  <!-- Xiao Ke Mobile-Compact Companion Host -->
  <div class="xk-dock is-mobile" id="xiaoke-dock" aria-live="polite"></div>

  <!-- Warm Paper & Autumn-Petal Confetti Overlay -->
  <canvas id="fx-fireworks-canvas" aria-hidden="true"></canvas>

  <script data-module="xiaoke_assets">
window.XIAOKE_SPRITES = {sprites_json};
window.XIAOKE_MANIFEST = {manifest_json};
  </script>
{script_tags}
</body>
</html>
"""

    with open(OUT_HTML, "w", encoding="utf-8") as f:
        f.write(html)

    size_kb = os.path.getsize(OUT_HTML) / 1024.0
    print(f"[SUCCESS] Built Mobile HTML: {OUT_HTML} ({size_kb:.1f} KB)")

    if os.path.isdir(os.path.dirname(PARENT_OFFLINE)):
        shutil.copy2(OUT_HTML, PARENT_OFFLINE)
        print(f"[SYNC] Synced offline Mobile HTML: {PARENT_OFFLINE}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
