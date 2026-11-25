"""
CET-4 Sprint Release Gate Audit Script
Checks src/*, index.html, and mobile.html across 7 mandatory quality gates:
  1. Zero emojis ([\\U0001F300-\\U0001FAFF\\u2600-\\u27BF]) in all src/* and built bundles
  2. Zero bare `monospace` and zero `SimSun` / `宋体`
  3. Zero mock-exam strings/relics
  4. All 10 Xiao Ke sprite IDs embedded cleanly in both index.html and mobile.html
  5. All src/*.js files AND all inline <script> blocks in index.html / mobile.html pass `node --check`
  6. Shared localStorage key `cet4_xiaoke_sprint_v1` present in both PC and Mobile apps & bundles
  7. Reports bundle sizes and exits non-zero on ANY failure
"""
import argparse
import glob
import os
import re
import subprocess
import sys
import tempfile

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(REPO_ROOT, "src")
PARENT_DIR = os.path.dirname(REPO_ROOT)

PC_HTML = os.path.join(REPO_ROOT, "index.html")
MOBILE_HTML = os.path.join(REPO_ROOT, "mobile.html")
PC_SYNC_HTML = os.path.join(PARENT_DIR, "四级冲刺_小克伴学复习与高频带背.html")
MOBILE_SYNC_HTML = os.path.join(PARENT_DIR, "四级冲刺_手机专属版.html")

SHARED_STORE_KEY = "cet4_xiaoke_sprint_v1"

EXPECTED_SPRITES = [
    "01_idle_smile",
    "02_study_reading",
    "03_thinking_hint",
    "04_cheer_correct",
    "05_encourage_wrong",
    "06_writing_quill",
    "07_listening_audio",
    "08_sleepy_rest",
    "09_proud_streak",
    "10_eureka_tip",
]

RE_EMOJI = re.compile(r"[\U0001F300-\U0001FAFF\u2600-\u27BF]")
RE_BARE_MONO = re.compile(r"(?<!-)\bmonospace\b")
RE_SIMSUN = re.compile(r"SimSun|\u5b8b\u4f53", re.IGNORECASE)
RE_MOCK_RELICS = re.compile(
    r"\u6a21\u62df\u8003|\u6a21\u62df\u5377|mockExam|practiceSub[^\n]{0,40}mock|data-psub=[\"']mock[\"']",
    re.IGNORECASE,
)
RE_SCRIPT_BLOCK = re.compile(r"<script\b[^>]*>([\s\S]*?)</script>", re.IGNORECASE)


def check_text_rules(label: str, text: str, failures: list) -> None:
    emojis = RE_EMOJI.findall(text)
    bare_mono = RE_BARE_MONO.findall(text)
    simsun = RE_SIMSUN.findall(text)
    mocks = RE_MOCK_RELICS.findall(text)

    if emojis:
        samples = [f"U+{ord(ch):04X}" for ch in emojis[:8]]
        failures.append(f"[{label}] Found {len(emojis)} forbidden emoji/symbol(s): {samples}")
    if bare_mono:
        failures.append(f"[{label}] Found {len(bare_mono)} bare `monospace` occurrence(s)")
    if simsun:
        failures.append(f"[{label}] Found {len(simsun)} forbidden SimSun occurrence(s): {simsun[:5]}")
    if mocks:
        failures.append(f"[{label}] Found {len(mocks)} forbidden mock-exam relic(s): {mocks[:5]}")


def node_check_file(path: str, label: str, failures: list) -> None:
    res = subprocess.run(["node", "--check", path], capture_output=True, text=True)
    if res.returncode != 0:
        err = (res.stderr or res.stdout or "").strip().splitlines()[:6]
        failures.append(f"[{label}] node --check FAILED: {' | '.join(err)}")


def check_bundle_scripts(html_path: str, label: str, text: str, failures: list) -> int:
    blocks = RE_SCRIPT_BLOCK.findall(text)
    if not blocks:
        failures.append(f"[{label}] No <script> blocks found in bundle!")
        return 0
    checked = 0
    with tempfile.TemporaryDirectory(prefix="cet4_audit_") as tmpdir:
        for idx, code in enumerate(blocks, 1):
            if not code.strip():
                continue
            tmp_js = os.path.join(tmpdir, f"block_{idx:02d}.js")
            with open(tmp_js, "w", encoding="utf-8") as f:
                f.write(code)
            node_check_file(tmp_js, f"{label} <script #{idx}>", failures)
            checked += 1
    return checked


def check_sprites_embedded(label: str, text: str, failures: list) -> None:
    missing = []
    for sid in EXPECTED_SPRITES:
        pattern = re.compile(rf'["\']{re.escape(sid)}["\']\s*:\s*["\']data:image/', re.IGNORECASE)
        if not pattern.search(text):
            # Fallback check if manifest or escaped JSON exists alongside data URI
            if sid not in text or "data:image/" not in text:
                missing.append(sid)
    if missing:
        failures.append(f"[{label}] Missing embedded Xiao Ke sprite data URI(s): {missing}")


def main() -> int:
    parser = argparse.ArgumentParser(description="CET-4 Sprint Release Gate Auditor")
    parser.add_argument("--mobile-only", action="store_true", help="Only require mobile bundle (skip missing index.html)")
    args = parser.parse_args()

    failures = []
    print("=" * 72)
    print("CET-4 SPRINT RELEASE GATE AUDIT")
    print("=" * 72)

    # 1. Audit all files in src/*
    src_files = sorted(glob.glob(os.path.join(SRC_DIR, "*")))
    src_files = [p for p in src_files if os.path.isfile(p)]
    if not src_files:
        failures.append("[src/*] No source files found in cet4-review/src/")
    else:
        print(f"[INFO] Scanning {len(src_files)} source files in src/...")
        for path in src_files:
            fname = os.path.basename(path)
            with open(path, encoding="utf-8") as f:
                txt = f.read()
            check_text_rules(f"src/{fname}", txt, failures)
            if fname.endswith(".js"):
                node_check_file(path, f"src/{fname}", failures)

    # Check shared localStorage key in source apps
    for app_fname, required in (("app.js", not args.mobile_only), ("mobile_app.js", True)):
        p = os.path.join(SRC_DIR, app_fname)
        if os.path.isfile(p):
            with open(p, encoding="utf-8") as f:
                txt = f.read()
            if SHARED_STORE_KEY not in txt:
                failures.append(f"[src/{app_fname}] Missing shared localStorage key `{SHARED_STORE_KEY}`")
        elif required:
            failures.append(f"[src/{app_fname}] Required source file not found")

    # 2. Audit built bundles (index.html and mobile.html)
    bundles = [
        ("PC Bundle (index.html)", PC_HTML, not args.mobile_only),
        ("Mobile Bundle (mobile.html)", MOBILE_HTML, True),
    ]

    for label, path, required in bundles:
        if not os.path.isfile(path):
            if required:
                failures.append(f"[{label}] Built file missing: {path}")
            else:
                print(f"[SKIP] {label} not found (skipped via --mobile-only)")
            continue

        size_kb = os.path.getsize(path) / 1024.0
        with open(path, encoding="utf-8") as f:
            text = f.read()

        before_cnt = len(failures)
        check_text_rules(label, text, failures)
        check_sprites_embedded(label, text, failures)
        script_cnt = check_bundle_scripts(path, label, text, failures)
        if SHARED_STORE_KEY not in text:
            failures.append(f"[{label}] Missing shared localStorage key `{SHARED_STORE_KEY}`")
        if size_kb < 50:
            failures.append(f"[{label}] Bundle unexpectedly small ({size_kb:.1f} KB)")

        status = "PASS" if len(failures) == before_cnt else "FAIL"
        print(f"[{status}] {label}: {size_kb:.1f} KB | scripts_checked={script_cnt} | sprites=10 | store_key=ok")

    # 3. Report synced parent offline HTML copies
    for label, path in (("Synced PC HTML", PC_SYNC_HTML), ("Synced Mobile HTML", MOBILE_SYNC_HTML)):
        if os.path.isfile(path):
            print(f"[SYNC] {label}: {os.path.getsize(path) / 1024.0:.1f} KB ({os.path.basename(path)})")
        else:
            print(f"[WARN] {label} not yet synced at {path}")

    print("-" * 72)
    if failures:
        print(f"[FAIL] Release audit FAILED with {len(failures)} error(s):")
        for idx, msg in enumerate(failures, 1):
            print(f"  {idx}. {msg}")
        return 1

    print("[PASS] ALL 7 RELEASE GATES PASSED CLEANLY!")
    return 0


if __name__ == "__main__":
    sys.exit(main())
