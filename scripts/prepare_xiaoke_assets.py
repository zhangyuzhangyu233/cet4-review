#!/usr/bin/env python3
"""
Xiao Ke (小克) Studio Mascot Asset Pipeline
-------------------------------------------
Crafts 10 distinct, 4x-supersampled cel-shaded transparent chibi sprites
(`01_idle_smile` .. `10_eureka_tip`) directly from `reference_turnaround.png`,
paired with matching-palette Victorian autumn props & micro-expressions.

Also preserves dual-input support for raw Nano Banana individual images
(`raw/<id>.png`) or 2x2 / 2x1 sprite sheets (`raw/sheet_*.png`) via `--from-raw`.

Outputs:
  - assets/xiaoke/sprites/<id>.png         (10x 480x480 crisp transparent RGBA PNGs)
  - assets/xiaoke/manifest.json            (`is_dev_stub: false`, `source: turnaround_studio_edition`)
  - assets/xiaoke/xiaoke_b64.json          (compact 320x320 WebP data URI map <= 600 KB)
  - assets/xiaoke/qa/qa_contact_sheet.png  (split #17120e Dark / #fbf6ee Parchment QA sheet)
  - assets/xiaoke/qa/qa_cream_preview.png  (warm parchment card preview sheet)
"""

from __future__ import annotations

import argparse
import base64
import io
import json
import math
from pathlib import Path
from typing import Any

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import patches
from matplotlib.path import Path as MplPath
from matplotlib.transforms import Affine2D
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets" / "xiaoke"
RAW_DIR = ASSET_DIR / "raw"
SPRITE_DIR = ASSET_DIR / "sprites"
QA_DIR = ASSET_DIR / "qa"
REF_PATH = ASSET_DIR / "reference_turnaround.png"
OVERRIDES_PATH = ASSET_DIR / "processing_overrides.json"

SPRITE_SIZE = 480
SUPERSAMPLE = 4
EMBED_SIZE = 320
EMBED_WEBP_QUALITY = 84
MAX_B64_BYTES = 600_000  # <= 600 KB budget for all 10 sprites combined

# Xiao Ke's exact sampled palette from reference_turnaround.png + site theme
PAL = {
    "ink": "#2F1D14",          # Crisp dark espresso lineart matching reference sheet
    "mouth": "#5A3022",        # Warm dark-brown anime mouth ink
    "skin": "#FEEEE1",         # Exact porcelain skin around mouth/brows
    "blush": "#F48E7E",        # Warm coral-peach cheek blush
    "mouth_fill": "#E87A72",   # Cute open-smile interior pink
    "mouth_hi": "#F9B0A6",     # Soft tongue highlight
    "orange": "#F28C38",       # Xiao Ke ginger-orange
    "orange_hi": "#FFB973",    # Glossy warm apricot highlight
    "orange_dk": "#C95E1B",    # Cel-shade shadow orange
    "terracotta": "#A94A1E",   # Book leather / vintage wood
    "terracotta_dk": "#732E11",
    "cream": "#FAF1DF",        # Victorian ivory dress cream
    "cream_hi": "#FFFDF7",     # Bright ivory specular
    "cream_sh": "#E3CEAE",     # Soft parchment shadow
    "gold": "#F4C24D",         # Antique radiant gold
    "gold_hi": "#FFF3B8",      # Specular gold highlight
    "gold_dk": "#C88A24",      # Antique brass shadow
    "velvet": "#2B2421",       # Dress velvet black ribbon
    "velvet_hi": "#4E433E",
    "emerald": "#2B5B4E",      # Oxford library emerald accent (bookmark)
    "emerald_hi": "#448271",
    "tea": "#D67A28",          # Warm amber tea
    "steam": "#FFF6E6",
}

SHEET_MAPPINGS: list[tuple[str, tuple[int, int], list[str]]] = [
    (
        "sheet_01_04.png",
        (2, 2),
        ["01_idle_smile", "02_study_reading", "03_thinking_hint", "04_cheer_correct"],
    ),
    (
        "sheet_05_08.png",
        (2, 2),
        ["05_encourage_wrong", "06_writing_quill", "07_listening_audio", "08_sleepy_rest"],
    ),
    (
        "sheet_09_10.png",
        (1, 2),
        ["09_proud_streak", "10_eureka_tip"],
    ),
]

SPRITE_SPECS: list[dict[str, Any]] = [
    {
        "id": "01_idle_smile",
        "zh_label": "微笑待机",
        "en_label": "Idle Smile",
        "mood": "idle",
        "triggers": ["default", "welcome", "home", "idle", "sprint_plan"],
        "speech_lines": [
            "你好呀，我是小克！14天四级冲刺计划已就位，我们一起稳稳上岸～",
            "高频词带背、听力抓信号词、阅读排陷阱，一步步来我陪着你！",
            "点开今日冲刺任务吧，每天半小时，每一小步都算数！"
        ],
    },
    {
        "id": "02_study_reading",
        "zh_label": "专注阅读",
        "en_label": "Study Reading",
        "mood": "study",
        "triggers": ["reading", "vocab", "vocab_sprint", "guided_recite", "cloze", "card_study", "detail_view"],
        "speech_lines": [
            "高频单词带背开始！先听读音再看词根词缀，10天滚雪球牢牢记住！",
            "选词填空先标词性再填词，仔细阅读先抓首尾句和同义替换～",
            "沉浸冲刺模式开启，小克和你一起认真啃完今天这组高频词！"
        ],
    },
    {
        "id": "03_thinking_hint",
        "zh_label": "思考提示",
        "en_label": "Thinking Hint",
        "mood": "hint",
        "triggers": ["hint", "question_hover", "hesitate", "grammar_check", "vocab_fuzzy"],
        "speech_lines": [
            "唔……这个词有点模糊？看看词根和真题例句，马上就能串起来！",
            "注意空格前后的固定搭配和词性提示，先把明显不对的词性排除掉～",
            "需要小克给一点破题线索吗？点开解析前再自己推导三秒试试！"
        ],
    },
    {
        "id": "04_cheer_correct",
        "zh_label": "答对欢呼",
        "en_label": "Cheer Correct",
        "mood": "cheer",
        "triggers": ["answer_correct", "mastered", "vocab_known", "drill_pass"],
        "speech_lines": [
            "太棒啦！这一题答得干净利落，四级高分稳稳的！",
            "漂亮！高频核心词和考点已经被你牢牢拿捏住啦～",
            "耶！又攻克一关，按这个节奏不到14天就能刷透核心考点！"
        ],
    },
    {
        "id": "05_encourage_wrong",
        "zh_label": "温柔鼓励",
        "en_label": "Encourage",
        "mood": "encourage",
        "triggers": ["answer_wrong", "vocab_unknown", "wrong_book", "retry"],
        "speech_lines": [
            "没关系没关系，不认识的词小克已经排进本轮复现队列啦！",
            "现在踩过的坑，考场上就绝不会再掉进去，看懂解析再刷一遍～",
            "别气馁，艾宾浩斯曲线最喜欢这种及时纠错，离 550+ 又近一步！"
        ],
    },
    {
        "id": "06_writing_quill",
        "zh_label": "提笔写作",
        "en_label": "Writing Quill",
        "mood": "writing",
        "triggers": ["writing", "translation", "essay", "smart_grader"],
        "speech_lines": [
            "作文三段式稳拿高分：点题背景 + 两条论据 + 总结建议！",
            "翻译先找中文主谓宾搭骨架，再补定状语，中式长句立刻变地道～",
            "试试用一两个高级连接词和非谓语结构，阅卷老师一眼加分！"
        ],
    },
    {
        "id": "07_listening_audio",
        "zh_label": "听力练耳",
        "en_label": "Listening Audio",
        "mood": "listening",
        "triggers": ["listening", "listening_radar", "pronunciation", "audio_play", "tts", "audio_quiz"],
        "speech_lines": [
            "听力黄金法：放音前扫选项划关键词，听到 but / however 立刻盯紧！",
            "戴上耳机开启带背跟读，听音选义练顺耳，考场秒抓同义改写～",
            "新闻抓首句主旨，对话听结尾建议，小克和你一起把听力变拿分项！"
        ],
    },
    {
        "id": "08_sleepy_rest",
        "zh_label": "小憩护眼",
        "en_label": "Sleepy Rest",
        "mood": "rest",
        "triggers": ["break", "idle_long", "late_night", "eye_rest"],
        "speech_lines": [
            "呼啊……已经连续学习好一会儿啦，喝口温水歇三分钟吧～",
            "让眼睛远眺二十秒，大脑整理记忆也需要小小的留白哦。",
            "劳逸结合效率才高，休息完小克再陪你冲下一关！"
        ],
    },
    {
        "id": "09_proud_streak",
        "zh_label": "连击得意",
        "en_label": "Proud Streak",
        "mood": "proud",
        "triggers": ["streak", "milestone", "badge", "high_accuracy"],
        "speech_lines": [
            "哼哼～连击达成！我就知道你绝对是四级学霸潜力股！",
            "今日目标进度条拉满啦，小克宣布颁发满分小红花！",
            "这个正确率简直闪闪发光，照这样下去轻松过线没压力！"
        ],
    },
    {
        "id": "10_eureka_tip",
        "zh_label": "灵光考点",
        "en_label": "Eureka Tip",
        "mood": "eureka",
        "triggers": ["exam_tip", "trap_alert", "key_rule", "bookmark"],
        "speech_lines": [
            "叮！发现高频四级陷阱！这个干扰项最喜欢偷换主语或时态！",
            "灵光一闪～记住这组黄金同义替换，阅读选词都能直接秒杀！",
            "小克划重点啦：这个常考短语记得点个收藏随时回看哦！"
        ],
    },
]


# ============================================================================
# 1. Core Matting, Premultiplied Transforms & Sheet Slicing
# ============================================================================

def load_overrides() -> dict[str, Any]:
    if OVERRIDES_PATH.exists():
        return json.loads(OVERRIDES_PATH.read_text(encoding="utf-8"))
    return {}


def estimate_background_rgb(arr: np.ndarray) -> np.ndarray:
    top = arr[:4, :, :].reshape(-1, 3)
    bottom = arr[-4:, :, :].reshape(-1, 3)
    left = arr[:, :4, :].reshape(-1, 3)
    right = arr[:, -4:, :].reshape(-1, 3)
    border = np.concatenate([top, bottom, left, right], axis=0).astype(np.float32)
    lum = border.mean(axis=1)
    bright = border[lum > 220]
    if len(bright) < 20:
        return np.array([255.0, 255.0, 255.0], dtype=np.float32)
    return np.median(bright, axis=0).astype(np.float32)


def _find_best_gutter(density: np.ndarray, lo_frac: float = 0.35, hi_frac: float = 0.65) -> int:
    n = len(density)
    lo = int(n * lo_frac)
    hi = int(n * hi_frac)
    sub = density[lo:hi]
    if len(sub) == 0:
        return n // 2
    min_val = sub.min()
    is_gutter = sub <= (min_val + max(1.0, 0.004 * n))
    labeled, cnt = ndimage.label(is_gutter)
    if cnt > 0:
        sizes = np.bincount(labeled)
        sizes[0] = 0
        best_lbl = int(np.argmax(sizes))
        idxs = np.where(labeled == best_lbl)[0]
        return lo + int(round(idxs.mean()))
    return lo + int(np.argmin(sub))


def slice_sheet_image(
    sheet_img: Image.Image,
    expected_count: int,
    grid_hint: tuple[int, int] | None = None,
    pad_px: int = 36,
) -> list[Image.Image]:
    """Slice a clean white-background multi-pose sheet into individual poses."""
    rgb = sheet_img.convert("RGB")
    arr = np.array(rgb, dtype=np.float32)
    h, w, _ = arr.shape
    bg_rgb = estimate_background_rgb(arr)

    diff = arr - bg_rgb[None, None, :]
    dist = np.sqrt(np.sum(diff * diff, axis=2))
    chroma = arr.max(axis=2) - arr.min(axis=2)
    min_ch = arr.min(axis=2)
    bg_cand = (dist <= 22.0) & (chroma <= 12.0) & (min_ch >= 225.0)

    struct4 = np.array([[0, 1, 0], [1, 1, 1], [0, 1, 0]], dtype=bool)
    bg_labels, _ = ndimage.label(bg_cand, structure=struct4)
    border_labels = (
        set(np.unique(bg_labels[0, :]).tolist())
        | set(np.unique(bg_labels[-1, :]).tolist())
        | set(np.unique(bg_labels[:, 0]).tolist())
        | set(np.unique(bg_labels[:, -1]).tolist())
    )
    border_labels.discard(0)
    fg_mask = ~np.isin(bg_labels, list(border_labels))

    fg_labels, num_fg = ndimage.label(fg_mask, structure=np.ones((3, 3), dtype=bool))
    counts = np.bincount(fg_labels.ravel())
    counts[0] = 0

    sorted_ids = np.argsort(counts)[::-1]
    top_ids = [int(i) for i in sorted_ids[:expected_count] if counts[i] > 0]

    use_cc = False
    if len(top_ids) == expected_count:
        largest = counts[top_ids[0]]
        smallest_top = counts[top_ids[-1]]
        next_area = counts[sorted_ids[expected_count]] if len(sorted_ids) > expected_count else 0
        if smallest_top >= 0.22 * largest and next_area < 0.35 * smallest_top:
            use_cc = True

    bg_fill = tuple(int(round(c)) for c in bg_rgb)

    if use_cc:
        slices = ndimage.find_objects(fg_labels)
        bodies: list[dict[str, Any]] = []
        for cid in top_ids:
            slc = slices[cid - 1]
            y0, y1 = slc[0].start, slc[0].stop
            x0, x1 = slc[1].start, slc[1].stop
            bodies.append({
                "cid": cid,
                "cids": [cid],
                "bbox": [x0, y0, x1, y1],
                "cx": 0.5 * (x0 + x1),
                "cy": 0.5 * (y0 + y1),
            })

        top_set = set(top_ids)
        for cid in range(1, num_fg + 1):
            if cid in top_set or counts[cid] < 14:
                continue
            slc = slices[cid - 1]
            if slc is None:
                continue
            y0, y1 = slc[0].start, slc[0].stop
            x0, x1 = slc[1].start, slc[1].stop
            mx, my = 0.5 * (x0 + x1), 0.5 * (y0 + y1)

            best_b = None
            best_d = 1e18
            for b in bodies:
                bx0, by0, bx1, by1 = b["bbox"]
                dx = max(bx0 - mx, 0.0, mx - bx1)
                dy = max(by0 - my, 0.0, my - by1)
                d = (dx * dx + dy * dy) ** 0.5
                if d < best_d:
                    best_d = d
                    best_b = b
            if best_b is not None and best_d <= 0.30 * max(w, h):
                best_b["cids"].append(cid)

        if expected_count == 4:
            bodies.sort(key=lambda b: b["cy"])
            ordered = sorted(bodies[:2], key=lambda b: b["cx"]) + sorted(bodies[2:], key=lambda b: b["cx"])
        elif expected_count == 2:
            dx = abs(bodies[0]["cx"] - bodies[1]["cx"])
            dy = abs(bodies[0]["cy"] - bodies[1]["cy"])
            ordered = sorted(bodies, key=lambda b: b["cx"] if dx >= dy else b["cy"])
        else:
            ordered = sorted(bodies, key=lambda b: (round(b["cy"] / max(1, h * 0.25)), b["cx"]))

        out_imgs: list[Image.Image] = []
        raw_u8 = np.array(rgb, dtype=np.uint8)
        for b in ordered:
            pose_mask = np.isin(fg_labels, b["cids"])
            ys, xs = np.where(pose_mask)
            y0 = max(0, int(ys.min()) - 6)
            y1 = min(h, int(ys.max()) + 7)
            x0 = max(0, int(xs.min()) - 6)
            x1 = min(w, int(xs.max()) + 7)

            sub_mask = ndimage.binary_dilation(pose_mask[y0:y1, x0:x1], iterations=4)
            sub_crop = raw_u8[y0:y1, x0:x1].copy()
            sub_crop[~sub_mask] = bg_fill

            ch, cw, _ = sub_crop.shape
            canvas = Image.new("RGB", (cw + 2 * pad_px, ch + 2 * pad_px), bg_fill)
            canvas.paste(Image.fromarray(sub_crop, mode="RGB"), (pad_px, pad_px))
            out_imgs.append(canvas)
        return out_imgs

    col_density = fg_mask.sum(axis=0).astype(np.float32)
    row_density = fg_mask.sum(axis=1).astype(np.float32)
    if expected_count == 4:
        gx = _find_best_gutter(col_density)
        gy = _find_best_gutter(row_density)
        boxes = [(0, 0, gx, gy), (gx, 0, w, gy), (0, gy, gx, h), (gx, gy, w, h)]
    elif expected_count == 2:
        if grid_hint == (2, 1) or (grid_hint is None and h > w * 1.15):
            gy = _find_best_gutter(row_density)
            boxes = [(0, 0, w, gy), (0, gy, w, h)]
        else:
            gx = _find_best_gutter(col_density)
            boxes = [(0, 0, gx, h), (gx, 0, w, h)]
    elif expected_count == 3:
        g1 = _find_best_gutter(col_density, 0.25, 0.43)
        g2 = _find_best_gutter(col_density, 0.57, 0.75)
        boxes = [(0, 0, g1, h), (g1, 0, g2, h), (g2, 0, w, h)]
    else:
        raise ValueError(f"Unsupported expected_count={expected_count}")

    out_imgs = []
    for x0, y0, x1, y1 in boxes:
        crop = rgb.crop((x0, y0, x1, y1))
        cw, ch = crop.size
        canvas = Image.new("RGB", (cw + 2 * pad_px, ch + 2 * pad_px), bg_fill)
        canvas.paste(crop, (pad_px, pad_px))
        out_imgs.append(canvas)
    return out_imgs


def auto_slice_sheets(force: bool = False) -> list[str]:
    sliced_ids: list[str] = []
    for sheet_name, grid_hint, target_ids in SHEET_MAPPINGS:
        sheet_path = RAW_DIR / sheet_name
        if not sheet_path.exists():
            continue
        sheet_mtime = sheet_path.stat().st_mtime
        needs_slice = force or any(
            (not (RAW_DIR / f"{tid}.png").exists())
            or ((RAW_DIR / f"{tid}.png").stat().st_mtime < sheet_mtime)
            for tid in target_ids
        )
        if not needs_slice:
            continue
        sheet_img = Image.open(sheet_path).convert("RGB")
        if len(target_ids) == 2:
            sw, sh = sheet_img.size
            eff_hint = (2, 1) if sh > sw * 1.15 else (1, 2)
        else:
            eff_hint = grid_hint
        cells = slice_sheet_image(sheet_img, expected_count=len(target_ids), grid_hint=eff_hint)
        for tid, cell_img in zip(target_ids, cells):
            out_raw = RAW_DIR / f"{tid}.png"
            if force or (not out_raw.exists()) or (out_raw.stat().st_mtime < sheet_mtime):
                cell_img.save(out_raw, format="PNG")
                sliced_ids.append(tid)
        print(f"[SLICE] {sheet_name} -> {', '.join(target_ids)}")
    return sliced_ids


def remove_white_bg_and_matte(
    img_rgb: Image.Image,
    *,
    bg_dist_thresh: float = 22.0,
    bg_chroma_thresh: float = 12.0,
    interior_dist_thresh: float = 22.0,
    interior_chroma_thresh: float = 12.0,
    interior_med_chroma_max: float = 8.5,
    interior_med_dist_max: float = 12.0,
    interior_min_area: int = 30,
    interior_outline_ratio: float = 0.44,
    min_fg_component_px: int = 40,
    detect_interior_holes: bool = True,
    keep_boxes: list[list[float]] | None = None,
    force_bg_points: list[list[float]] | None = None,
) -> tuple[Image.Image, dict[str, Any]]:
    arr = np.array(img_rgb.convert("RGB"), dtype=np.float32)
    h, w, _ = arr.shape
    bg_rgb = estimate_background_rgb(arr)

    diff = arr - bg_rgb[None, None, :]
    dist = np.sqrt(np.sum(diff * diff, axis=2))
    chroma = arr.max(axis=2) - arr.min(axis=2)
    min_ch = arr.min(axis=2)
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]

    bg_cand = (dist <= bg_dist_thresh) & (chroma <= bg_chroma_thresh) & (min_ch >= 228.0)
    struct4 = np.array([[0, 1, 0], [1, 1, 1], [0, 1, 0]], dtype=bool)
    labels, _ = ndimage.label(bg_cand, structure=struct4)

    border_labels = (
        set(np.unique(labels[0, :]).tolist())
        | set(np.unique(labels[-1, :]).tolist())
        | set(np.unique(labels[:, 0]).tolist())
        | set(np.unique(labels[:, -1]).tolist())
    )
    border_labels.discard(0)

    if force_bg_points:
        for nx, ny in force_bg_points:
            px = int(np.clip(round(nx * (w - 1)), 0, w - 1))
            py = int(np.clip(round(ny * (h - 1)), 0, h - 1))
            lbl = int(labels[py, px])
            if lbl > 0:
                border_labels.add(lbl)

    bg_mask = np.isin(labels, list(border_labels))

    interior_holes_removed = 0
    interior_pixels_removed = 0

    if detect_interior_holes:
        ext_fg = ~bg_mask
        ys, xs = np.where(ext_fg)
        if len(ys) > 0:
            fy0, fy1 = int(ys.min()), int(ys.max())
            fx0, fx1 = int(xs.min()), int(xs.max())
            fh = max(1, fy1 - fy0)
            fw = max(1, fx1 - fx0)
        else:
            fy0, fy1, fx0, fx1, fh, fw = 0, h - 1, 0, w - 1, h, w

        protect_mask = np.zeros((h, w), dtype=bool)
        ey0 = fy0 + int(0.18 * fh)
        ey1 = fy0 + int(0.47 * fh)
        ex0 = fx0 + int(0.24 * fw)
        ex1 = fx0 + int(0.76 * fw)
        protect_mask[ey0:ey1, ex0:ex1] = True

        if keep_boxes:
            for bx0, by0, bx1, by1 in keep_boxes:
                protect_mask[int(by0 * h) : int(by1 * h), int(bx0 * w) : int(bx1 * w)] = True

        int_cand = (
            (~bg_mask)
            & (dist <= interior_dist_thresh)
            & (chroma <= interior_chroma_thresh)
            & (min_ch >= 225.0)
        )
        int_labels, num_int = ndimage.label(int_cand, structure=struct4)
        dark_outline = lum < 145.0

        if num_int > 0:
            slices = ndimage.find_objects(int_labels)
            for lbl_idx, slc in enumerate(slices, start=1):
                if slc is None:
                    continue
                sub_mask = int_labels[slc] == lbl_idx
                area = int(sub_mask.sum())
                if area < interior_min_area:
                    continue
                if (sub_mask & protect_mask[slc]).any():
                    continue
                sub_med_chroma = float(np.median(chroma[slc][sub_mask]))
                sub_med_dist = float(np.median(dist[slc][sub_mask]))
                if sub_med_chroma > interior_med_chroma_max or sub_med_dist > interior_med_dist_max:
                    continue
                y0 = max(0, slc[0].start - 2)
                y1 = min(h, slc[0].stop + 2)
                x0 = max(0, slc[1].start - 2)
                x1 = min(w, slc[1].stop + 2)
                local_hole = int_labels[y0:y1, x0:x1] == lbl_idx
                ring = ndimage.binary_dilation(local_hole, iterations=2) & (~local_hole)
                ring_count = int(ring.sum())
                if ring_count == 0:
                    continue
                dark_frac = float((ring & dark_outline[y0:y1, x0:x1]).sum()) / ring_count
                if dark_frac >= interior_outline_ratio:
                    bg_mask[y0:y1, x0:x1] |= local_hole
                    interior_holes_removed += 1
                    interior_pixels_removed += area

    fg_mask = ~bg_mask

    # Clean tiny disconnected dust specks
    fg_labels, num_fg = ndimage.label(fg_mask, structure=np.ones((3, 3), dtype=bool))
    if num_fg > 1:
        counts = np.bincount(fg_labels.ravel())
        tiny = counts < min_fg_component_px
        tiny[0] = False
        fg_mask = fg_mask & (~tiny[fg_labels])
        bg_mask = ~fg_mask

    # Analytical 2.6px fringe alpha matting & white-halo decontamination
    dist_to_bg = ndimage.distance_transform_edt(fg_mask)
    core_fg = fg_mask & (dist_to_bg > 2.6)
    fringe = fg_mask & (~core_fg)

    alpha = np.where(fg_mask, 1.0, 0.0).astype(np.float32)
    out_rgb = arr.copy()

    if core_fg.any() and fringe.any():
        _, nearest_idx = ndimage.distance_transform_edt(~core_fg, return_indices=True)
        fy, fx = np.where(fringe)
        ny = nearest_idx[0, fy, fx]
        nx = nearest_idx[1, fy, fx]

        c_obs = arr[fy, fx]
        c_in = arr[ny, nx]
        v = c_in - bg_rgb[None, :]
        u = c_obs - bg_rgb[None, :]

        v_norm2 = np.sum(v * v, axis=1)
        v_norm = np.sqrt(v_norm2)
        dot_uv = np.sum(u * v, axis=1)
        t = dot_uv / np.maximum(v_norm2, 1e-5)

        t_clip = np.clip(t, 0.0, 1.0)
        proj = bg_rgb[None, :] + t_clip[:, None] * v
        perp_err = np.sqrt(np.sum((c_obs - proj) ** 2, axis=1))

        is_aa = (v_norm >= 28.0) & (t < 0.96) & (perp_err <= 32.0)
        f_dist = dist[fy, fx]
        f_chroma = chroma[fy, fx]
        is_white_halo = (dist_to_bg[fy, fx] <= 1.5) & (f_dist <= 45.0) & (f_chroma <= 16.0)
        update_mask = is_aa | is_white_halo

        if update_mask.any():
            a_est = np.where(
                is_aa,
                np.clip(t, 0.0, 1.0),
                np.clip((f_dist - 14.0) / 35.0, 0.0, 1.0),
            )
            a_est = np.where(a_est < 0.05, 0.0, a_est)
            safe_a = np.maximum(a_est, 0.15)[:, None]
            c_unpremult = np.clip(
                (c_obs - (1.0 - a_est[:, None]) * bg_rgb[None, :]) / safe_a,
                0.0,
                255.0,
            )
            w_un = np.clip((a_est - 0.35) / 0.50, 0.0, 1.0)[:, None]
            c_clean = w_un * c_unpremult + (1.0 - w_un) * c_in

            uy = fy[update_mask]
            ux = fx[update_mask]
            alpha[uy, ux] = a_est[update_mask]
            out_rgb[uy, ux] = c_clean[update_mask]

    zero_a = alpha <= 0.004
    out_rgb[zero_a] = 0.0
    alpha[zero_a] = 0.0

    rgba = np.dstack([
        np.clip(np.round(out_rgb), 0, 255).astype(np.uint8),
        np.clip(np.round(alpha * 255.0), 0, 255).astype(np.uint8),
    ])
    stats = {
        "bg_rgb": [round(float(x), 1) for x in bg_rgb],
        "interior_holes_removed": interior_holes_removed,
        "interior_pixels_removed": interior_pixels_removed,
        "fg_coverage_pct": round(float((alpha > 0.1).mean() * 100.0), 2),
    }
    return Image.fromarray(rgba, mode="RGBA"), stats


def _premult_resize(img_rgba: Image.Image, size: tuple[int, int]) -> Image.Image:
    arr = np.array(img_rgba, dtype=np.float32)
    af = arr[:, :, 3:4] / 255.0
    pm = np.concatenate([arr[:, :, :3] * af, arr[:, :, 3:4]], axis=2)
    pm_img = Image.fromarray(np.clip(np.round(pm), 0, 255).astype(np.uint8), mode="RGBA")
    r_pm = pm_img.resize(size, Image.Resampling.LANCZOS)
    r_arr = np.array(r_pm, dtype=np.float32)
    ra = r_arr[:, :, 3:4] / 255.0
    un_rgb = np.where(ra > 1e-3, r_arr[:, :, :3] / np.maximum(ra, 1e-3), 0.0)
    out = np.concatenate([
        np.clip(np.round(un_rgb), 0, 255),
        np.clip(np.round(r_arr[:, :, 3:4]), 0, 255),
    ], axis=2).astype(np.uint8)
    return Image.fromarray(out, mode="RGBA")


def _premult_rotate(img_rgba: Image.Image, angle_deg: float) -> Image.Image:
    if abs(angle_deg) < 1e-3:
        return img_rgba
    arr = np.array(img_rgba, dtype=np.float32)
    af = arr[:, :, 3:4] / 255.0
    pm = np.concatenate([arr[:, :, :3] * af, arr[:, :, 3:4]], axis=2)
    pm_img = Image.fromarray(np.clip(np.round(pm), 0, 255).astype(np.uint8), mode="RGBA")
    r_pm = pm_img.rotate(angle_deg, resample=Image.Resampling.BICUBIC, expand=True)
    r_arr = np.array(r_pm, dtype=np.float32)
    ra = r_arr[:, :, 3:4] / 255.0
    un_rgb = np.where(ra > 1e-3, r_arr[:, :, :3] / np.maximum(ra, 1e-3), 0.0)
    out = np.concatenate([
        np.clip(np.round(un_rgb), 0, 255),
        np.clip(np.round(r_arr[:, :, 3:4]), 0, 255),
    ], axis=2).astype(np.uint8)
    return Image.fromarray(out, mode="RGBA")


def trim_and_standardize(
    sprite: Image.Image,
    canvas_size: int = SPRITE_SIZE,
    pad_top: int = 58,
    pad_bottom: int = 16,
    pad_side: int = 36,
    scale_adjust: float = 1.0,
    x_offset_px: int = 0,
    y_lift_px: int = 0,
) -> tuple[Image.Image, dict[str, Any]]:
    arr = np.array(sprite)
    a = arr[:, :, 3]
    ys, xs = np.where(a >= 20)
    if len(ys) == 0:
        raise ValueError("Sprite became completely transparent after matting!")

    y0, y1 = int(ys.min()), int(ys.max()) + 1
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    cropped = sprite.crop((x0, y0, x1, y1))
    cw, ch = cropped.size

    max_w = canvas_size - 2 * pad_side
    max_h = canvas_size - pad_top - pad_bottom
    base_scale = min(max_w / cw, max_h / ch)
    final_scale = base_scale * scale_adjust

    new_w = max(1, int(round(cw * final_scale)))
    new_h = max(1, int(round(ch * final_scale)))
    if new_w > canvas_size - 8 or new_h > canvas_size - 8:
        clamp = min((canvas_size - 8) / new_w, (canvas_size - 8) / new_h)
        new_w = max(1, int(round(new_w * clamp)))
        new_h = max(1, int(round(new_h * clamp)))

    resized = _premult_resize(cropped, (new_w, new_h))

    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    paste_x = (canvas_size - new_w) // 2 + x_offset_px
    paste_x = max(2, min(canvas_size - new_w - 2, paste_x))
    paste_y = canvas_size - pad_bottom - new_h - y_lift_px
    paste_y = max(4, min(canvas_size - new_h - 2, paste_y))
    canvas.paste(resized, (paste_x, paste_y), resized)

    return canvas, {
        "raw_crop_w": cw,
        "raw_crop_h": ch,
        "placed_w": new_w,
        "placed_h": new_h,
        "paste_xy": [paste_x, paste_y],
    }


# ============================================================================
# 2. 4x-Supersampled Vector Cel-Shaded Art Engine (Matplotlib Agg -> 480 RGBA)
# ============================================================================

class VectorCanvas4x:
    """
    Renders razor-crisp 4x-supersampled (1920x1920 -> 480x480) cel-shaded anime
    props, micro-expressions, and emotive accents in logical 0..480 coordinates
    (origin at top-left, y downward) matching Xiao Ke's #2F1D14 lineart.
    """

    def __init__(self, size: int = SPRITE_SIZE, ss: int = SUPERSAMPLE) -> None:
        self.size = size
        self.ss = ss
        dpi = 100
        fig_in = (size * ss) / dpi
        self.fig = plt.figure(figsize=(fig_in, fig_in), dpi=dpi)
        self.fig.patch.set_alpha(0.0)
        self.ax = self.fig.add_axes([0.0, 0.0, 1.0, 1.0])
        self.ax.set_xlim(0.0, float(size))
        self.ax.set_ylim(float(size), 0.0)  # Top-left origin matching PIL
        self.ax.axis("off")
        self.ax.patch.set_alpha(0.0)
        self._lw_scale = ss * 0.72  # Maps logical px width accurately at dpi=100

    def lw(self, px: float) -> float:
        return px * self._lw_scale

    def add_glow(self, cx: float, cy: float, radius: float, color: str, max_alpha: float = 0.28, steps: int = 8) -> None:
        """Soft radial warm aura using concentric translucent circles."""
        for i in range(steps, 0, -1):
            frac = i / steps
            r = radius * frac
            a = max_alpha * ((1.0 - frac * 0.85) ** 1.4) / (steps * 0.42)
            self.ax.add_patch(
                patches.Circle((cx, cy), r, facecolor=color, edgecolor="none", alpha=min(0.45, a))
            )

    def add_star4(
        self,
        cx: float,
        cy: float,
        r_outer: float,
        r_inner: float | None = None,
        fill: str = PAL["gold"],
        hi: str = PAL["gold_hi"],
        angle_deg: float = 0.0,
        outline_px: float = 2.4,
    ) -> None:
        """Crisp cel-shaded anime 4-point sparkle with quadratic curved cusps."""
        if r_inner is None:
            r_inner = r_outer * 0.30
        verts = [
            (0, -r_outer),
            (r_inner * 0.65, -r_inner * 0.65), (r_outer, 0),
            (r_inner * 0.65, r_inner * 0.65), (0, r_outer),
            (-r_inner * 0.65, r_inner * 0.65), (-r_outer, 0),
            (-r_inner * 0.65, -r_inner * 0.65), (0, -r_outer),
        ]
        codes = [
            MplPath.MOVETO,
            MplPath.CURVE3, MplPath.CURVE3,
            MplPath.CURVE3, MplPath.CURVE3,
            MplPath.CURVE3, MplPath.CURVE3,
            MplPath.CURVE3, MplPath.CURVE3,
        ]
        tf = Affine2D().rotate_deg(angle_deg).translate(cx, cy) + self.ax.transData
        self.ax.add_patch(
            patches.PathPatch(
                MplPath(verts, codes),
                facecolor=fill,
                edgecolor=PAL["ink"] if outline_px > 0 else "none",
                linewidth=self.lw(outline_px),
                joinstyle="round",
                capstyle="round",
                transform=tf,
            )
        )
        if r_outer >= 9.0:
            # Tiny inner glossy highlight
            verts_hi = [(x * 0.45, y * 0.45) for x, y in verts]
            self.ax.add_patch(
                patches.PathPatch(
                    MplPath(verts_hi, codes),
                    facecolor=hi,
                    edgecolor="none",
                    transform=tf,
                )
            )

    def add_star5(
        self,
        cx: float,
        cy: float,
        r_outer: float,
        r_inner: float | None = None,
        fill: str = PAL["gold"],
        hi: str = PAL["gold_hi"],
        angle_deg: float = 0.0,
        outline_px: float = 2.6,
    ) -> None:
        if r_inner is None:
            r_inner = r_outer * 0.46
        pts = []
        for i in range(10):
            a = math.radians(-90 + i * 36)
            r = r_outer if i % 2 == 0 else r_inner
            pts.append((r * math.cos(a), r * math.sin(a)))
        tf = Affine2D().rotate_deg(angle_deg).translate(cx, cy) + self.ax.transData
        self.ax.add_patch(
            patches.Polygon(
                pts,
                closed=True,
                facecolor=fill,
                edgecolor=PAL["ink"],
                linewidth=self.lw(outline_px),
                joinstyle="round",
                transform=tf,
            )
        )
        # Upper-left cel highlight facet
        hi_pts = [(x * 0.56 - r_outer * 0.06, y * 0.56 - r_outer * 0.08) for x, y in pts]
        self.ax.add_patch(
            patches.Polygon(hi_pts, closed=True, facecolor=hi, edgecolor="none", alpha=0.82, transform=tf)
        )

    def add_dot(self, cx: float, cy: float, r: float, fill: str = PAL["cream_hi"], outline_px: float = 1.8) -> None:
        self.ax.add_patch(
            patches.Circle(
                (cx, cy),
                r,
                facecolor=fill,
                edgecolor=PAL["ink"] if outline_px > 0 else "none",
                linewidth=self.lw(outline_px),
            )
        )

    def add_heart(
        self,
        cx: float,
        cy: float,
        scale: float = 1.0,
        angle_deg: float = -10.0,
        fill: str = PAL["orange"],
        shadow: str = PAL["orange_dk"],
        hi: str = PAL["cream_hi"],
        outline_px: float = 2.9,
    ) -> None:
        """Plush cel-shaded anime heart with highlight & warm lower cel shadow."""
        s = 32.0 * scale
        verts = [
            (0.0, 0.92 * s),
            (-1.12 * s, 0.28 * s), (-1.28 * s, -0.56 * s), (-0.58 * s, -0.88 * s),
            (-0.18 * s, -1.04 * s), (0.0, -0.62 * s), (0.0, -0.44 * s),
            (0.0, -0.62 * s), (0.18 * s, -1.04 * s), (0.58 * s, -0.88 * s),
            (1.28 * s, -0.56 * s), (1.12 * s, 0.28 * s), (0.0, 0.92 * s),
        ]
        codes = [
            MplPath.MOVETO,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
        ]
        tf = Affine2D().rotate_deg(angle_deg).translate(cx, cy) + self.ax.transData
        path = MplPath(verts, codes)
        # Base fill
        patch_base = patches.PathPatch(
            path,
            facecolor=fill,
            edgecolor=PAL["ink"],
            linewidth=self.lw(outline_px),
            joinstyle="round",
            capstyle="round",
            transform=tf,
        )
        self.ax.add_patch(patch_base)
        # Subtle cel-shade crescent at bottom-right clipped inside heart
        sh_circle = patches.Ellipse(
            (0.32 * s, 0.36 * s),
            width=1.7 * s,
            height=1.3 * s,
            angle=-25,
            facecolor=shadow,
            edgecolor="none",
            alpha=0.42,
            transform=tf,
        )
        self.ax.add_patch(sh_circle)
        sh_circle.set_clip_path(patch_base)
        # Glossy upper-left highlight pill + dot
        self.ax.add_patch(
            patches.Ellipse(
                (-0.46 * s, -0.44 * s),
                width=0.46 * s,
                height=0.22 * s,
                angle=-34,
                facecolor=hi,
                edgecolor="none",
                alpha=0.88,
                transform=tf,
            )
        )
        self.ax.add_patch(
            patches.Circle((-0.72 * s, -0.14 * s), 0.08 * s, facecolor=hi, edgecolor="none", alpha=0.82, transform=tf)
        )
        # Re-stroke crisp outer ink on top of clipped shadow
        self.ax.add_patch(
            patches.PathPatch(
                path,
                facecolor="none",
                edgecolor=PAL["ink"],
                linewidth=self.lw(outline_px),
                joinstyle="round",
                capstyle="round",
                transform=tf,
            )
        )

    def add_open_book(self, cx: float, cy: float, scale: float = 1.0, angle_deg: float = -8.0) -> None:
        """Rich cel-shaded vintage hardcover open English study book with emerald bookmark."""
        s = scale
        tf = Affine2D().rotate_deg(angle_deg).translate(cx, cy) + self.ax.transData

        # 1. Outer leather hardcover boards
        cover_verts = [
            (-60 * s, -28 * s), (0, -20 * s), (60 * s, -28 * s),
            (66 * s, 28 * s), (0, 38 * s), (-66 * s, 28 * s), (-60 * s, -28 * s),
        ]
        self.ax.add_patch(
            patches.Polygon(
                cover_verts[:-1],
                closed=True,
                facecolor=PAL["terracotta"],
                edgecolor=PAL["ink"],
                linewidth=self.lw(3.0),
                joinstyle="round",
                transform=tf,
            )
        )
        # Spine gold trim bar
        self.ax.add_patch(
            patches.FancyBboxPatch(
                (-6 * s, 26 * s), 12 * s, 12 * s,
                boxstyle=f"round,pad=0,rounding_size={3*s}",
                facecolor=PAL["gold"], edgecolor=PAL["ink"], linewidth=self.lw(2.2),
                transform=tf,
            )
        )

        # 2. Stacked page thickness under edges
        stack_left = [(-56 * s, 22 * s), (-2 * s, 30 * s), (-2 * s, 34 * s), (-58 * s, 26 * s)]
        stack_right = [(56 * s, 22 * s), (2 * s, 30 * s), (2 * s, 34 * s), (58 * s, 26 * s)]
        for pts in (stack_left, stack_right):
            self.ax.add_patch(
                patches.Polygon(pts, closed=True, facecolor=PAL["cream_sh"], edgecolor=PAL["ink"], linewidth=self.lw(2.0), joinstyle="round", transform=tf)
            )

        # 3. Curved open ivory left & right pages
        l_page_v = [
            (0, -24 * s),
            (-18 * s, -38 * s), (-42 * s, -36 * s), (-56 * s, -28 * s),
            (-58 * s, 20 * s),
            (-40 * s, 14 * s), (-18 * s, 16 * s), (0, 27 * s),
            (0, -24 * s),
        ]
        l_codes = [
            MplPath.MOVETO,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.LINETO,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CLOSEPOLY,
        ]
        r_page_v = [(-x, y) for x, y in l_page_v]

        self.ax.add_patch(
            patches.PathPatch(MplPath(l_page_v, l_codes), facecolor=PAL["cream_hi"], edgecolor=PAL["ink"], linewidth=self.lw(2.6), joinstyle="round", transform=tf)
        )
        self.ax.add_patch(
            patches.PathPatch(MplPath(r_page_v, l_codes), facecolor=PAL["cream"], edgecolor=PAL["ink"], linewidth=self.lw(2.6), joinstyle="round", transform=tf)
        )

        # Center crease shadow
        self.ax.plot([0, 0], [-24 * s, 27 * s], color=PAL["ink"], linewidth=self.lw(2.2), solid_capstyle="round", transform=tf)

        # Neat abstract study lines + autumn-orange highlight bar (zero messy text!)
        for idx, yy in enumerate([-18, -9, 0, 9]):
            x_end = -10 if idx != 2 else -18
            col = PAL["orange"] if idx == 1 else "#B99E7E"
            lw_line = 3.2 if idx == 1 else 2.0
            self.ax.plot([-46 * s, x_end * s], [(yy - 3) * s, (yy + 1) * s], color=col, linewidth=self.lw(lw_line), solid_capstyle="round", transform=tf)
        for idx, yy in enumerate([-18, -9, 0, 9]):
            x_end = 46 if idx != 3 else 34
            col = PAL["gold_dk"] if idx == 2 else "#B99E7E"
            lw_line = 3.0 if idx == 2 else 2.0
            self.ax.plot([10 * s, x_end * s], [(yy + 1) * s, (yy - 3) * s], color=col, linewidth=self.lw(lw_line), solid_capstyle="round", transform=tf)

        # 4. Oxford Emerald ribbon bookmark hanging from center spine
        rib = [
            (2 * s, 24 * s), (13 * s, 26 * s), (17 * s, 52 * s),
            (10 * s, 45 * s), (5 * s, 53 * s),
        ]
        self.ax.add_patch(
            patches.Polygon(rib, closed=True, facecolor=PAL["emerald"], edgecolor=PAL["ink"], linewidth=self.lw(2.2), joinstyle="round", transform=tf)
        )
        self.ax.plot([8.5 * s, 11 * s], [28 * s, 44 * s], color=PAL["gold"], linewidth=self.lw(1.4), solid_capstyle="round", transform=tf)

    def add_thinking_badge(self, cx: float, cy: float, scale: float = 1.0) -> None:
        """Plush scalloped cream thinking cloud with cel-shaded amber-gold '?' + ascending dots."""
        s = scale
        # Ascending thought dots from temple toward cloud
        for dx, dy, rad in [(54, 70, 5.5), (40, 52, 8.2), (24, 34, 10.5)]:
            self.ax.add_patch(
                patches.Circle(
                    (cx + dx * s, cy + dy * s),
                    rad * s,
                    facecolor=PAL["cream_hi"],
                    edgecolor=PAL["ink"],
                    linewidth=self.lw(2.5),
                )
            )
            self.ax.add_patch(
                patches.Circle(
                    (cx + (dx - 1.5) * s, cy + (dy - 1.5) * s),
                    rad * 0.42 * s,
                    facecolor=PAL["gold_hi"],
                    edgecolor="none",
                    alpha=0.75,
                )
            )

        # Scalloped cloud silhouette (union of 6 overlapping circles: draw ink outline first, then cream fill)
        puffs = [
            (0, -14, 24),
            (-22, -4, 19),
            (22, -4, 19),
            (-16, 14, 18),
            (16, 14, 18),
            (0, 16, 20),
        ]
        for px, py, pr in puffs:
            self.ax.add_patch(
                patches.Circle((cx + px * s, cy + py * s), (pr + 3.0) * s, facecolor=PAL["ink"], edgecolor="none")
            )
        for px, py, pr in puffs:
            self.ax.add_patch(
                patches.Circle((cx + px * s, cy + py * s), pr * s, facecolor=PAL["cream_hi"], edgecolor="none")
            )
        # Warm soft lower interior shading
        self.ax.add_patch(
            patches.Ellipse((cx, cy + 16 * s), 48 * s, 16 * s, facecolor=PAL["cream_sh"], edgecolor="none", alpha=0.55)
        )

        # Bold cel-shaded '?' drawn with smooth cubic Beziers (outline pass + golden-orange fill pass + highlight)
        q_verts = [
            (cx - 11 * s, cy - 12 * s),
            (cx - 12 * s, cy - 26 * s), (cx + 14 * s, cy - 26 * s), (cx + 13 * s, cy - 11 * s),
            (cx + 12 * s, cy - 1 * s), (cx + 0 * s, cy + 0 * s), (cx + 0 * s, cy + 8 * s),
        ]
        q_codes = [
            MplPath.MOVETO,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
        ]
        q_path = MplPath(q_verts, q_codes)
        self.ax.add_patch(patches.PathPatch(q_path, facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(11.5 * s), capstyle="round", joinstyle="round"))
        self.ax.add_patch(patches.PathPatch(q_path, facecolor="none", edgecolor=PAL["orange"], linewidth=self.lw(6.2 * s), capstyle="round", joinstyle="round"))
        self.ax.add_patch(patches.PathPatch(q_path, facecolor="none", edgecolor=PAL["gold_hi"], linewidth=self.lw(1.8 * s), capstyle="round", joinstyle="round", alpha=0.75))
        # Dot of '?'
        self.ax.add_patch(patches.Circle((cx, cy + 20 * s), 4.6 * s, facecolor=PAL["orange"], edgecolor=PAL["ink"], linewidth=self.lw(2.4)))

    def add_quill_and_scroll(self, cx: float, cy: float, scale: float = 1.0) -> None:
        """Vintage parchment notebook/scroll + autumn-orange & cream feather quill pen."""
        s = scale
        tf_pad = Affine2D().rotate_deg(-9.0).translate(cx - 4 * s, cy + 22 * s) + self.ax.transData

        # 1. Vintage leather-backed cream parchment pad
        self.ax.add_patch(
            patches.FancyBboxPatch(
                (-40 * s, -48 * s), 80 * s, 96 * s,
                boxstyle=f"round,pad=0,rounding_size={8*s}",
                facecolor=PAL["terracotta"], edgecolor=PAL["ink"], linewidth=self.lw(3.0),
                transform=tf_pad,
            )
        )
        self.ax.add_patch(
            patches.FancyBboxPatch(
                (-33 * s, -42 * s), 67 * s, 84 * s,
                boxstyle=f"round,pad=0,rounding_size={5*s}",
                facecolor=PAL["cream_hi"], edgecolor=PAL["ink"], linewidth=self.lw(2.2),
                transform=tf_pad,
            )
        )
        # Antique-gold top binding clip + subtle lines
        self.ax.add_patch(
            patches.FancyBboxPatch(
                (-16 * s, -52 * s), 32 * s, 14 * s,
                boxstyle=f"round,pad=0,rounding_size={4*s}",
                facecolor=PAL["gold"], edgecolor=PAL["ink"], linewidth=self.lw(2.2),
                transform=tf_pad,
            )
        )
        for yy in [-22, -10, 2, 14, 26]:
            self.ax.plot([-24 * s, 24 * s], [yy * s, yy * s], color="#D2BE9E", linewidth=self.lw(1.8), solid_capstyle="round", transform=tf_pad)
        # Written autumn-orange flourish curve
        fl_v = [(-22 * s, -12 * s), (-10 * s, -22 * s), (2 * s, -2 * s), (14 * s, -12 * s)]
        fl_c = [MplPath.MOVETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4]
        self.ax.add_patch(patches.PathPatch(MplPath(fl_v, fl_c), facecolor="none", edgecolor=PAL["orange"], linewidth=self.lw(2.8), capstyle="round", transform=tf_pad))

        # 2. Graceful vintage Feather Quill angled into the notebook
        tf_q = Affine2D().rotate_deg(24.0).translate(cx + 12 * s, cy - 20 * s) + self.ax.transData
        # Plume body (smooth curved feather silhouette with notch)
        plume_v = [
            (0, 38 * s),
            (-16 * s, 16 * s), (-26 * s, -18 * s), (-14 * s, -52 * s),
            (-6 * s, -72 * s), (6 * s, -78 * s), (12 * s, -62 * s),
            (22 * s, -36 * s), (22 * s, -4 * s), (0, 38 * s),
        ]
        plume_c = [
            MplPath.MOVETO,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
        ]
        plume_path = MplPath(plume_v, plume_c)
        plume_patch = patches.PathPatch(plume_path, facecolor=PAL["orange"], edgecolor=PAL["ink"], linewidth=self.lw(2.8), joinstyle="round", transform=tf_q)
        self.ax.add_patch(plume_patch)

        # Cream-gold upper tip gradient band clipped to plume
        tip_poly = patches.Polygon(
            [(-30 * s, -28 * s), (30 * s, -38 * s), (30 * s, -90 * s), (-30 * s, -90 * s)],
            closed=True, facecolor=PAL["cream_hi"], edgecolor="none", alpha=0.92, transform=tf_q,
        )
        self.ax.add_patch(tip_poly)
        tip_poly.set_clip_path(plume_patch)

        # Mid golden highlight strip clipped to plume
        mid_poly = patches.Polygon(
            [(-30 * s, -12 * s), (30 * s, -22 * s), (30 * s, -34 * s), (-30 * s, -24 * s)],
            closed=True, facecolor=PAL["gold"], edgecolor="none", alpha=0.85, transform=tf_q,
        )
        self.ax.add_patch(mid_poly)
        mid_poly.set_clip_path(plume_patch)

        # Re-stroke crisp plume outline
        self.ax.add_patch(patches.PathPatch(plume_path, facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(2.8), joinstyle="round", transform=tf_q))

        # Central feather quill spine (rachis)
        spine_v = [(0, 44 * s), (-2 * s, 6 * s), (-2 * s, -28 * s), (2 * s, -64 * s)]
        spine_c = [MplPath.MOVETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4]
        self.ax.add_patch(patches.PathPatch(MplPath(spine_v, spine_c), facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(3.4), capstyle="round", transform=tf_q))
        self.ax.add_patch(patches.PathPatch(MplPath(spine_v, spine_c), facecolor="none", edgecolor=PAL["gold_hi"], linewidth=self.lw(1.4), capstyle="round", transform=tf_q))

        # Gold ferrule + sharp espresso-gold fountain nib
        nib_pts = [(-5 * s, 38 * s), (5 * s, 38 * s), (6 * s, 50 * s), (0, 66 * s), (-6 * s, 50 * s)]
        self.ax.add_patch(patches.Polygon(nib_pts, closed=True, facecolor=PAL["gold"], edgecolor=PAL["ink"], linewidth=self.lw(2.4), joinstyle="round", transform=tf_q))
        self.ax.plot([0, 0], [50 * s, 64 * s], color=PAL["ink"], linewidth=self.lw(1.6), transform=tf_q)

    def add_music_note_single(self, cx: float, cy: float, scale: float = 1.0, angle_deg: float = -10.0, fill: str = PAL["gold"]) -> None:
        s = scale
        tf = Affine2D().rotate_deg(angle_deg).translate(cx, cy) + self.ax.transData
        # Stem + waving flag
        stem_v = [
            (7 * s, 10 * s), (7 * s, -24 * s),
            (18 * s, -18 * s), (24 * s, -8 * s), (17 * s, 1 * s),
        ]
        stem_c = [MplPath.MOVETO, MplPath.LINETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4]
        sp = MplPath(stem_v, stem_c)
        self.ax.add_patch(patches.PathPatch(sp, facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(9.0 * s), capstyle="round", joinstyle="round", transform=tf))
        self.ax.add_patch(patches.PathPatch(sp, facecolor="none", edgecolor=fill, linewidth=self.lw(4.4 * s), capstyle="round", joinstyle="round", transform=tf))
        # Oval note head
        self.ax.add_patch(
            patches.Ellipse((0, 12 * s), 18 * s, 13 * s, angle=-22, facecolor=fill, edgecolor=PAL["ink"], linewidth=self.lw(2.5), transform=tf)
        )
        self.ax.add_patch(
            patches.Ellipse((-3 * s, 9.5 * s), 6 * s, 3.2 * s, angle=-22, facecolor=PAL["cream_hi"], edgecolor="none", alpha=0.85, transform=tf)
        )

    def add_music_note_beamed(self, cx: float, cy: float, scale: float = 1.0, angle_deg: float = -8.0, fill: str = PAL["orange"]) -> None:
        s = scale
        tf = Affine2D().rotate_deg(angle_deg).translate(cx, cy) + self.ax.transData
        # Two stems + thick angled top beam
        frame_v = [(-12 * s, 12 * s), (-12 * s, -20 * s), (18 * s, -26 * s), (18 * s, 6 * s)]
        frame_c = [MplPath.MOVETO, MplPath.LINETO, MplPath.LINETO, MplPath.LINETO]
        fp = MplPath(frame_v, frame_c)
        self.ax.add_patch(patches.PathPatch(fp, facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(9.4 * s), capstyle="round", joinstyle="round", transform=tf))
        self.ax.add_patch(patches.PathPatch(fp, facecolor="none", edgecolor=fill, linewidth=self.lw(4.6 * s), capstyle="round", joinstyle="round", transform=tf))
        # Extra glossy highlight on top beam
        self.ax.plot([-10 * s, 16 * s], [-21 * s, -27 * s], color=PAL["gold_hi"], linewidth=self.lw(1.6 * s), solid_capstyle="round", transform=tf)
        for nx, ny in [(-18 * s, 14 * s), (12 * s, 8 * s)]:
            self.ax.add_patch(patches.Ellipse((nx, ny), 18 * s, 13 * s, angle=-20, facecolor=fill, edgecolor=PAL["ink"], linewidth=self.lw(2.5), transform=tf))
            self.ax.add_patch(patches.Ellipse((nx - 3 * s, ny - 2.5 * s), 5.8 * s, 3.0 * s, angle=-20, facecolor=PAL["cream_hi"], edgecolor="none", alpha=0.85, transform=tf))

    def add_headphones(self, layer: str = "front") -> None:
        """
        Custom-fitted vintage cream-and-amber-gold Victorian headphones fitted to
        Xiao Ke's exact head coordinates (crown y=58, ears at x=134/334, y=198).
        `layer='back'` renders the subtle inner cushions behind Xiao Ke;
        `layer='front'` renders the curved band + plush earcups (caller masks
        Xiao Ke's daisy hairpiece on top so the daisy stays 100% unobstructed!).
        """
        if layer == "back":
            # Soft dark-brown inner ear-pad cushions behind hair edges
            for ex, ang in [(142, 8), (328, -8)]:
                self.ax.add_patch(
                    patches.Ellipse((ex, 198), 24, 52, angle=ang, facecolor=PAL["velvet"], edgecolor=PAL["ink"], linewidth=self.lw(2.8))
                )
            return

        # Arched headband hugging her crown snugly (x=138..332, apex y=45)
        band_v = [
            (138, 186),
            (134, 92), (178, 46), (235, 45),
            (292, 46), (336, 92), (332, 186),
        ]
        band_c = [
            MplPath.MOVETO,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
        ]
        bp = MplPath(band_v, band_c)
        # Outer dark ink -> warm cream leather -> antique-gold inner trim
        self.ax.add_patch(patches.PathPatch(bp, facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(17.5), capstyle="round"))
        self.ax.add_patch(patches.PathPatch(bp, facecolor="none", edgecolor=PAL["cream"], linewidth=self.lw(11.6), capstyle="round"))
        self.ax.add_patch(patches.PathPatch(bp, facecolor="none", edgecolor=PAL["cream_hi"], linewidth=self.lw(4.0), capstyle="round", alpha=0.75))

        # Top plush leather cushion pad on crown
        pad_v = [(186, 56), (212, 42), (258, 42), (284, 56)]
        pad_c = [MplPath.MOVETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4]
        pp = MplPath(pad_v, pad_c)
        self.ax.add_patch(patches.PathPatch(pp, facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(21.0), capstyle="round"))
        self.ax.add_patch(patches.PathPatch(pp, facecolor="none", edgecolor=PAL["orange"], linewidth=self.lw(14.8), capstyle="round"))
        self.ax.add_patch(patches.PathPatch(pp, facecolor="none", edgecolor=PAL["orange_hi"], linewidth=self.lw(4.2), capstyle="round", alpha=0.72))

        # Gold adjustment clasps & plush vintage over-ear cups
        for side, ex, ang in [(-1, 134, 7), (1, 336, -7)]:
            # Gold slider clasp above earcup
            self.ax.add_patch(
                patches.FancyBboxPatch(
                    (ex - 6 + side * 2, 160), 12, 16,
                    boxstyle="round,pad=0,rounding_size=3",
                    facecolor=PAL["gold"], edgecolor=PAL["ink"], linewidth=self.lw(2.3),
                )
            )
            # Plush dark-velvet cushion ring facing head
            self.ax.add_patch(
                patches.Ellipse((ex - side * 7, 198), 22, 54, angle=ang, facecolor=PAL["velvet"], edgecolor=PAL["ink"], linewidth=self.lw(2.6))
            )
            # Outer vintage cream shell
            self.ax.add_patch(
                patches.Ellipse((ex + side * 3, 198), 28, 56, angle=ang, facecolor=PAL["cream"], edgecolor=PAL["ink"], linewidth=self.lw(2.8))
            )
            # Warm amber-gold center medallion + glossy dot
            self.ax.add_patch(
                patches.Ellipse((ex + side * 6, 198), 16, 36, angle=ang, facecolor=PAL["orange"], edgecolor=PAL["ink"], linewidth=self.lw(2.2))
            )
            self.ax.add_patch(
                patches.Ellipse((ex + side * 7, 189), 6, 12, angle=ang, facecolor=PAL["gold_hi"], edgecolor="none", alpha=0.85)
            )

    def add_crescent_and_zzz(self, cx: float, cy: float, scale: float = 1.0) -> None:
        """Warm antique-gold crescent moon + 3 well-spaced ascending Zzz glyphs (zero overlap)."""
        s = scale
        # Crescent moon placed cleanly to upper-left of the Z arc with crisp breathing room
        mcx, mcy = cx - 26 * s, cy + 32 * s
        t_out = np.linspace(math.radians(-62), math.radians(156), 60)
        r_out = 23 * s
        pts_out = [(mcx + r_out * math.cos(t), mcy + r_out * math.sin(t)) for t in t_out]
        t_in = np.linspace(math.radians(146), math.radians(-50), 50)
        r_in = 19 * s
        ox, oy = mcx + 9.8 * s, mcy - 5.0 * s
        pts_in = [(ox + r_in * math.cos(t), oy + r_in * math.sin(t)) for t in t_in]
        moon_pts = pts_out + pts_in
        self.ax.add_patch(
            patches.Polygon(moon_pts, closed=True, facecolor=PAL["gold"], edgecolor=PAL["ink"], linewidth=self.lw(2.8), joinstyle="round")
        )
        hi_t = np.linspace(math.radians(15), math.radians(125), 25)
        hi_x = [mcx + (r_out - 4.8 * s) * math.cos(t) for t in hi_t]
        hi_y = [mcy + (r_out - 4.8 * s) * math.sin(t) for t in hi_t]
        self.ax.plot(hi_x, hi_y, color=PAL["gold_hi"], linewidth=self.lw(2.3 * s), solid_capstyle="round", alpha=0.85)

        # Three cleanly separated ascending vector 'Z' marks arching upward-left away from hair
        z_specs = [
            (cx + 42 * s, cy + 50 * s, 9.0 * s, -8, PAL["cream_hi"]),
            (cx + 28 * s, cy + 16 * s, 12.0 * s, 6, PAL["gold_hi"]),
            (cx + 10 * s, cy - 22 * s, 15.0 * s, -7, PAL["gold"]),
        ]
        for zx, zy, zs, zang, zcol in z_specs:
            tf = Affine2D().rotate_deg(zang).translate(zx, zy) + self.ax.transData
            zv = [(-0.68 * zs, -0.72 * zs), (0.72 * zs, -0.72 * zs), (-0.72 * zs, 0.72 * zs), (0.72 * zs, 0.72 * zs)]
            zc = [MplPath.MOVETO, MplPath.LINETO, MplPath.LINETO, MplPath.LINETO]
            zp = MplPath(zv, zc)
            self.ax.add_patch(patches.PathPatch(zp, facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(6.6 * (zs / 13.0)), capstyle="round", joinstyle="round", transform=tf))
            self.ax.add_patch(patches.PathPatch(zp, facecolor="none", edgecolor=zcol, linewidth=self.lw(3.1 * (zs / 13.0)), capstyle="round", joinstyle="round", transform=tf))

    def add_teacup(self, cx: float, cy: float, scale: float = 1.0) -> None:
        """Cute Victorian cream-and-gold teacup on saucer with curling warm steam."""
        s = scale
        # Graceful curling warm steam wisps rising above cup
        for sx, h_st in [(-11, 34), (4, 42), (16, 28)]:
            st_v = [
                (cx + sx * s, cy - 22 * s),
                (cx + (sx - 10) * s, cy - (22 + h_st * 0.4) * s),
                (cx + (sx + 10) * s, cy - (22 + h_st * 0.75) * s),
                (cx + (sx - 2) * s, cy - (22 + h_st) * s),
            ]
            st_c = [MplPath.MOVETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4]
            sp = MplPath(st_v, st_c)
            self.ax.add_patch(patches.PathPatch(sp, facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(5.0 * s), capstyle="round", alpha=0.55))
            self.ax.add_patch(patches.PathPatch(sp, facecolor="none", edgecolor=PAL["steam"], linewidth=self.lw(2.6 * s), capstyle="round", alpha=0.92))

        # Saucer
        self.ax.add_patch(patches.Ellipse((cx, cy + 28 * s), 76 * s, 20 * s, facecolor=PAL["cream"], edgecolor=PAL["ink"], linewidth=self.lw(2.8)))
        self.ax.add_patch(patches.Ellipse((cx, cy + 26 * s), 52 * s, 11 * s, facecolor=PAL["cream_sh"], edgecolor=PAL["gold_dk"], linewidth=self.lw(1.5)))

        # Curved golden handle on right
        h_v = [
            (cx + 25 * s, cy - 6 * s),
            (cx + 46 * s, cy - 10 * s), (cx + 46 * s, cy + 16 * s), (cx + 21 * s, cy + 14 * s),
        ]
        h_c = [MplPath.MOVETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4]
        hp = MplPath(h_v, h_c)
        self.ax.add_patch(patches.PathPatch(hp, facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(9.0 * s), capstyle="round"))
        self.ax.add_patch(patches.PathPatch(hp, facecolor="none", edgecolor=PAL["gold"], linewidth=self.lw(4.4 * s), capstyle="round"))

        # Teacup rounded bowl
        cup_v = [
            (cx - 28 * s, cy - 12 * s),
            (cx - 29 * s, cy + 16 * s), (cx - 18 * s, cy + 27 * s), (cx, cy + 27 * s),
            (cx + 18 * s, cy + 27 * s), (cx + 29 * s, cy + 16 * s), (cx + 28 * s, cy - 12 * s),
            (cx - 28 * s, cy - 12 * s),
        ]
        cup_c = [
            MplPath.MOVETO,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CLOSEPOLY,
        ]
        self.ax.add_patch(patches.PathPatch(MplPath(cup_v, cup_c), facecolor=PAL["cream_hi"], edgecolor=PAL["ink"], linewidth=self.lw(2.8), joinstyle="round"))
        # Gold trim band + tiny daisy motif on cup front
        self.ax.plot([cx - 24 * s, cx + 24 * s], [cy + 2 * s, cy + 2 * s], color=PAL["gold"], linewidth=self.lw(2.2 * s))
        self.add_star4(cx, cy + 12 * s, 7.5 * s, r_inner=3.0 * s, fill=PAL["orange"], hi=PAL["gold_hi"], outline_px=1.6)
        # Rim & warm amber tea surface inside
        self.ax.add_patch(patches.Ellipse((cx, cy - 12 * s), 56 * s, 16 * s, facecolor=PAL["cream"], edgecolor=PAL["ink"], linewidth=self.lw(2.6)))
        self.ax.add_patch(patches.Ellipse((cx, cy - 11 * s), 44 * s, 10.5 * s, facecolor=PAL["tea"], edgecolor=PAL["ink"], linewidth=self.lw(1.6)))
        self.ax.add_patch(patches.Ellipse((cx - 8 * s, cy - 12.5 * s), 12 * s, 3.2 * s, facecolor=PAL["gold_hi"], edgecolor="none", alpha=0.85))

    def add_proud_laurel_badge(self, cx: float, cy: float, scale: float = 1.0) -> None:
        """Antique-gold laurel wreath framing a gleaming faceted star + Xiao Ke mini velvet bow."""
        s = scale
        self.add_glow(cx, cy, 52 * s, PAL["gold"], max_alpha=0.26)

        # Symmetrical golden laurel branches (left & right curved leaf arcs)
        for sign in (-1, 1):
            # Curved stem
            st_v = [
                (cx + sign * 8 * s, cy + 32 * s),
                (cx + sign * 38 * s, cy + 24 * s),
                (cx + sign * 42 * s, cy - 12 * s),
                (cx + sign * 20 * s, cy - 34 * s),
            ]
            st_c = [MplPath.MOVETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4]
            self.ax.add_patch(patches.PathPatch(MplPath(st_v, st_c), facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(5.2 * s), capstyle="round"))
            self.ax.add_patch(patches.PathPatch(MplPath(st_v, st_c), facecolor="none", edgecolor=PAL["gold_dk"], linewidth=self.lw(2.4 * s), capstyle="round"))

            # 5 pairs of cel-shaded golden leaves along each curve
            leaf_pos = [
                (26, 22, -28),
                (35, 8, -12),
                (37, -8, 12),
                (31, -22, 34),
                (19, -32, 54),
            ]
            for lx, ly, lang in leaf_pos:
                for side_off, d_ang in [(5, -24), (-4, 24)]:
                    px = cx + sign * (lx + side_off * 0.5) * s
                    py = cy + ly * s
                    ang = sign * (lang + d_ang)
                    self.ax.add_patch(
                        patches.Ellipse(
                            (px, py), 15 * s, 7.5 * s, angle=ang,
                            facecolor=PAL["gold"] if side_off > 0 else PAL["gold_hi"],
                            edgecolor=PAL["ink"], linewidth=self.lw(2.0),
                        )
                    )

        # Center gleaming 5-point autumn-gold star emblem
        self.add_star5(cx, cy - 2 * s, 26 * s, r_inner=12 * s, fill=PAL["gold"], hi=PAL["gold_hi"], outline_px=2.8)
        self.add_star5(cx, cy - 2 * s, 12 * s, r_inner=5.5 * s, fill=PAL["orange"], hi=PAL["gold_hi"], outline_px=1.6)

        # Signature Xiao Ke mini black-velvet & orange ribbon bow at bottom of wreath
        for sign in (-1, 1):
            bow = [
                (cx, cy + 31 * s),
                (cx + sign * 17 * s, cy + 24 * s),
                (cx + sign * 19 * s, cy + 39 * s),
            ]
            self.ax.add_patch(patches.Polygon(bow, closed=True, facecolor=PAL["velvet"], edgecolor=PAL["ink"], linewidth=self.lw(2.2), joinstyle="round"))
        self.ax.add_patch(patches.Circle((cx, cy + 32 * s), 5.2 * s, facecolor=PAL["orange"], edgecolor=PAL["ink"], linewidth=self.lw(2.0)))

    def add_lightbulb(self, cx: float, cy: float, scale: float = 1.0, angle_deg: float = -14.0) -> None:
        """Crisp cel-shaded glowing vintage golden lightbulb with radiance rays."""
        s = scale
        self.add_glow(cx, cy - 4 * s, 58 * s, PAL["gold"], max_alpha=0.36, steps=9)
        tf = Affine2D().rotate_deg(angle_deg).translate(cx, cy) + self.ax.transData

        # 7 crisp cel-outlined radiance rays around upper bulb
        for deg in [-150, -125, -100, -75, -50, -25, 0]:
            rad = math.radians(deg - 15)
            r0 = 33 * s
            r1 = 48 * s if deg % 50 == 0 else 43 * s
            x0, y0 = r0 * math.cos(rad), -8 * s + r0 * math.sin(rad)
            x1, y1 = r1 * math.cos(rad), -8 * s + r1 * math.sin(rad)
            self.ax.plot([x0, x1], [y0, y1], color=PAL["ink"], linewidth=self.lw(6.8 * s), solid_capstyle="round", transform=tf)
            self.ax.plot([x0, x1], [y0, y1], color=PAL["gold"], linewidth=self.lw(3.4 * s), solid_capstyle="round", transform=tf)

        # Vintage brass screw base + bottom tip
        self.ax.add_patch(patches.Ellipse((0, 34 * s), 12 * s, 8 * s, facecolor=PAL["velvet"], edgecolor=PAL["ink"], linewidth=self.lw(2.2), transform=tf))
        self.ax.add_patch(
            patches.FancyBboxPatch(
                (-11 * s, 18 * s), 22 * s, 16 * s,
                boxstyle=f"round,pad=0,rounding_size={4*s}",
                facecolor=PAL["gold_dk"], edgecolor=PAL["ink"], linewidth=self.lw(2.6),
                transform=tf,
            )
        )
        for yy in [23 * s, 28 * s]:
            self.ax.plot([-9 * s, 9 * s], [yy, yy], color=PAL["ink"], linewidth=self.lw(1.8), solid_capstyle="round", transform=tf)

        # Smooth teardrop glass bulb silhouette
        bulb_v = [
            (-11 * s, 19 * s),
            (-14 * s, 8 * s), (-26 * s, 2 * s), (-26 * s, -12 * s),
            (-26 * s, -29 * s), (-14 * s, -38 * s), (0, -38 * s),
            (14 * s, -38 * s), (26 * s, -29 * s), (26 * s, -12 * s),
            (26 * s, 2 * s), (14 * s, 8 * s), (11 * s, 19 * s),
            (-11 * s, 19 * s),
        ]
        bulb_c = [
            MplPath.MOVETO,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            MplPath.CLOSEPOLY,
        ]
        bulb_path = MplPath(bulb_v, bulb_c)
        bulb_patch = patches.PathPatch(bulb_path, facecolor=PAL["gold"], edgecolor=PAL["ink"], linewidth=self.lw(2.9), joinstyle="round", transform=tf)
        self.ax.add_patch(bulb_patch)

        # Warm glowing cream-yellow inner core
        self.ax.add_patch(patches.Circle((0, -12 * s), 16 * s, facecolor=PAL["gold_hi"], edgecolor="none", alpha=0.88, transform=tf))
        # Cute glowing filament loop inside
        fil_v = [(-4 * s, 16 * s), (-4 * s, -6 * s), (-10 * s, -14 * s), (-3 * s, -18 * s), (0, -11 * s), (3 * s, -18 * s), (10 * s, -14 * s), (4 * s, -6 * s), (4 * s, 16 * s)]
        fil_c = [MplPath.MOVETO, MplPath.LINETO, MplPath.CURVE3, MplPath.CURVE3, MplPath.LINETO, MplPath.CURVE3, MplPath.CURVE3, MplPath.LINETO, MplPath.LINETO]
        self.ax.add_patch(patches.PathPatch(MplPath(fil_v, fil_c), facecolor="none", edgecolor=PAL["orange"], linewidth=self.lw(2.4 * s), capstyle="round", joinstyle="round", transform=tf))

        # Glossy white-ivory highlight arc on upper-left glass
        hi_v = [(-17 * s, -14 * s), (-17 * s, -24 * s), (-11 * s, -29 * s), (-5 * s, -30 * s)]
        hi_c = [MplPath.MOVETO, MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4]
        self.ax.add_patch(patches.PathPatch(MplPath(hi_v, hi_c), facecolor="none", edgecolor=PAL["cream_hi"], linewidth=self.lw(4.0 * s), capstyle="round", alpha=0.92, transform=tf))

        # Re-stroke crisp bulb outline
        self.ax.add_patch(patches.PathPatch(bulb_path, facecolor="none", edgecolor=PAL["ink"], linewidth=self.lw(2.9), joinstyle="round", transform=tf))

    def render_rgba(self) -> Image.Image:
        """Render 4x-supersampled canvas to RGBA and premult-Lanczos downsample to 480x480."""
        self.fig.canvas.draw()
        buf = np.asarray(self.fig.canvas.buffer_rgba(), dtype=np.uint8)
        img_hi = Image.fromarray(buf, mode="RGBA")
        plt.close(self.fig)
        return _premult_resize(img_hi, (self.size, self.size))


# ============================================================================
# 3. Seamless Micro-Expression Enhancer (Applied to Front Base BEFORE Tilt)
# ============================================================================

def apply_front_micro_expression(
    front_std: Image.Image,
    *,
    mouth: str = "gentle_smile",
    blush_strength: float = 0.28,
    eye_sparkles: bool = False,
    sleepy_lids: bool = False,
) -> Image.Image:
    """
    Applies ultra-clean 4x-supersampled anime facial micro-expressions calibrated
    to Xiao Ke's exact measured landmarks on `front_std` (480x480, pad_top=58):
      - Mouth center: (233, 229), skin RGB [254, 238, 225]
      - Left eye:  cx=195, cy=198, bbox x=[175..219], y=[180..221]
      - Right eye: cx=273, cy=197, bbox x=[248..292], y=[180..221]
      - Cheeks:    (184, 223) and (282, 223)
    """
    out = front_std.copy()
    vc = VectorCanvas4x(SPRITE_SIZE, SUPERSAMPLE)

    # 1. Soft rosy peach cheek blush (blended smoothly on cheeks)
    if blush_strength > 0.01:
        for cx, cy in [(184, 222), (282, 222)]:
            vc.add_glow(cx, cy, 16.5, PAL["blush"], max_alpha=blush_strength, steps=7)

    # 2. Gentle sleepy half-closed eyelids — rendered on a separate layer and
    # masked strictly BELOW Xiao Ke's ginger-orange bangs so her hair strands
    # remain 100% crisply in front of her sleepy lids (zero overlap on hair!).
    if sleepy_lids:
        lid_vc = VectorCanvas4x(SPRITE_SIZE, SUPERSAMPLE)
        for ex, ey in [(196, 195), (272, 195)]:
            # Smooth domed eyelid cover matching porcelain skin [254, 238, 225]
            lid_v = [
                (ex - 23, ey + 2),
                (ex - 22, ey - 17), (ex + 22, ey - 17), (ex + 23, ey + 2),
                (ex + 9, ey + 4.8), (ex - 9, ey + 4.8), (ex - 23, ey + 2),
            ]
            lid_c = [
                MplPath.MOVETO,
                MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
                MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4,
            ]
            lid_vc.ax.add_patch(patches.PathPatch(MplPath(lid_v, lid_c), facecolor=PAL["skin"], edgecolor="none"))
            # Soft eyelid crease
            cr_v = [(ex - 15, ey - 5.5), (ex, ey - 8.2), (ex + 15, ey - 5.5)]
            cr_c = [MplPath.MOVETO, MplPath.CURVE3, MplPath.CURVE3]
            lid_vc.ax.add_patch(patches.PathPatch(MplPath(cr_v, cr_c), facecolor="none", edgecolor="#D2A993", linewidth=lid_vc.lw(1.3), capstyle="round"))
            # Crisp dark espresso drowsy upper lash arc
            lash_v = [(ex - 22, ey + 1.2), (ex, ey + 5.6), (ex + 22, ey + 1.2)]
            lash_c = [MplPath.MOVETO, MplPath.CURVE3, MplPath.CURVE3]
            lid_vc.ax.add_patch(patches.PathPatch(MplPath(lash_v, lash_c), facecolor="none", edgecolor=PAL["ink"], linewidth=lid_vc.lw(3.4), capstyle="round"))

        lid_rgba = lid_vc.render_rgba()
        # Preserve Xiao Ke's ginger-orange bangs & their dark hair-tip outlines on top of lids!
        base_arr = np.array(out, dtype=np.float32)
        r, g, b, a = base_arr[:, :, 0], base_arr[:, :, 1], base_arr[:, :, 2], base_arr[:, :, 3]
        # Orange hair pixels: warm saturated ginger-orange (R > 130, R - B > 48, G < 195)
        is_orange_hair = (a > 80) & (r > 130.0) & ((r - b) > 48.0) & (g < 195.0)
        # Include 2px dark hair-strand outline immediately adjacent to orange hair
        bang_protect = ndimage.binary_dilation(is_orange_hair, iterations=2)
        # Soft anti-aliased edge on bang protection mask
        bang_alpha = ndimage.gaussian_filter(bang_protect.astype(np.float32), sigma=0.7)
        lid_arr = np.array(lid_rgba, dtype=np.float32)
        lid_arr[:, :, 3] *= np.clip(1.0 - bang_alpha, 0.0, 1.0)
        lid_masked = Image.fromarray(np.clip(np.round(lid_arr), 0, 255).astype(np.uint8), mode="RGBA")
        out = Image.alpha_composite(out, lid_masked)

    # 3. Crisp tiny 4-point starlight glints in both warm amber eyes
    if eye_sparkles:
        for ex, ey in [(201, 206), (277, 206)]:
            vc.add_star4(ex, ey, 6.2, r_inner=2.1, fill=PAL["gold_hi"], hi="#FFFFFF", outline_px=0.0)
        for ex, ey in [(190, 195), (267, 195)]:
            vc.add_dot(ex, ey, 2.2, fill="#FFFFFF", outline_px=0.0)

    # 4. Seamless mouth replacement (paint tiny matching porcelain ellipse over neutral dot)
    if mouth != "original":
        vc.ax.add_patch(patches.Ellipse((233.5, 229.5), 14.0, 9.0, facecolor=PAL["skin"], edgecolor="none"))

        if mouth == "gentle_smile":
            mv = [(228.0, 227.8), (233.5, 232.6), (239.0, 227.8)]
            mc = [MplPath.MOVETO, MplPath.CURVE3, MplPath.CURVE3]
            vc.ax.add_patch(patches.PathPatch(MplPath(mv, mc), facecolor="none", edgecolor=PAL["mouth"], linewidth=vc.lw(2.1), capstyle="round"))

        elif mouth == "open_happy":
            mv = [
                (226.2, 226.5), (233.5, 227.4), (240.8, 226.5),
                (240.5, 234.6), (233.5, 237.2), (226.5, 234.6), (226.2, 226.5),
            ]
            mc = [
                MplPath.MOVETO, MplPath.CURVE3, MplPath.CURVE3,
                MplPath.CURVE4, MplPath.CURVE4, MplPath.CURVE4, MplPath.CLOSEPOLY,
            ]
            mp = MplPath(mv, mc)
            m_patch = patches.PathPatch(mp, facecolor=PAL["mouth_fill"], edgecolor=PAL["mouth"], linewidth=vc.lw(1.9), joinstyle="round")
            vc.ax.add_patch(m_patch)
            tongue = patches.Ellipse((233.5, 234.8), 10.5, 5.5, facecolor=PAL["mouth_hi"], edgecolor="none")
            vc.ax.add_patch(tongue)
            tongue.set_clip_path(m_patch)
            vc.ax.add_patch(patches.PathPatch(mp, facecolor="none", edgecolor=PAL["mouth"], linewidth=vc.lw(1.9), joinstyle="round"))

        elif mouth == "cat_smile":
            mv = [
                (226.5, 228.0), (229.8, 232.2), (233.5, 228.8),
                (237.2, 232.2), (240.5, 228.0),
            ]
            mc = [MplPath.MOVETO, MplPath.CURVE3, MplPath.CURVE3, MplPath.CURVE3, MplPath.CURVE3]
            vc.ax.add_patch(patches.PathPatch(MplPath(mv, mc), facecolor="none", edgecolor=PAL["mouth"], linewidth=vc.lw(2.1), capstyle="round", joinstyle="round"))

        elif mouth == "proud_smirk":
            mv = [(227.5, 229.6), (234.2, 232.0), (240.2, 226.8)]
            mc = [MplPath.MOVETO, MplPath.CURVE3, MplPath.CURVE3]
            vc.ax.add_patch(patches.PathPatch(MplPath(mv, mc), facecolor="none", edgecolor=PAL["mouth"], linewidth=vc.lw(2.2), capstyle="round"))

        elif mouth == "thinking_o":
            vc.ax.add_patch(patches.Ellipse((234.5, 229.8), 5.6, 5.2, facecolor=PAL["mouth_fill"], edgecolor=PAL["mouth"], linewidth=vc.lw(1.8)))

        elif mouth == "yawn_o":
            vc.ax.add_patch(patches.Ellipse((233.5, 230.6), 7.5, 8.8, facecolor=PAL["mouth_fill"], edgecolor=PAL["mouth"], linewidth=vc.lw(1.9)))
            vc.ax.add_patch(patches.Ellipse((233.5, 233.2), 4.8, 2.8, facecolor=PAL["mouth_hi"], edgecolor="none"))

        elif mouth == "eureka_open":
            vc.ax.add_patch(patches.Ellipse((233.5, 230.2), 10.4, 9.2, facecolor=PAL["mouth_fill"], edgecolor=PAL["mouth"], linewidth=vc.lw(1.9)))
            vc.ax.add_patch(patches.Ellipse((233.5, 233.0), 6.8, 3.4, facecolor=PAL["mouth_hi"], edgecolor="none"))

    overlay = vc.render_rgba()
    return Image.alpha_composite(out, overlay)


def pose_character_on_canvas(
    base_rgba: Image.Image,
    *,
    tilt_deg: float = 0.0,
    x_offset_px: int = 0,
    y_lift_px: int = 0,
    scale_adjust: float = 1.0,
    pad_top: int = 58,
    pad_bottom: int = 16,
) -> Image.Image:
    """Apply subtle expressive pose tilt/shift while keeping consistent character scale."""
    posed = _premult_rotate(base_rgba, tilt_deg) if abs(tilt_deg) > 0.05 else base_rgba
    canvas, _ = trim_and_standardize(
        posed,
        canvas_size=SPRITE_SIZE,
        pad_top=pad_top,
        pad_bottom=pad_bottom,
        pad_side=28,
        scale_adjust=scale_adjust,
        x_offset_px=x_offset_px,
        y_lift_px=y_lift_px,
    )
    return canvas


def build_daisy_preserve_mask(front_posed: Image.Image) -> np.ndarray:
    """
    Create a clean alpha mask covering Xiao Ke's signature orange daisy flower +
    black ribbons + hanging tassels on viewer's right so the headphones headband
    tucks cleanly BEHIND her daisy without obscuring a single petal!
    """
    arr = np.array(front_posed)
    h, w, _ = arr.shape
    mask = np.zeros((h, w), dtype=np.float32)
    # Tight polygon around daisy flower & ribbons on viewer's right (x=284..364, y=90..248)
    pil_m = Image.new("L", (w, h), 0)
    dr = ImageDraw.Draw(pil_m)
    # Daisy petals & center (circle-ish around (318, 125) r=36) + ribbon tail down to (356, 245)
    dr.ellipse([282, 90, 354, 162], fill=255)
    dr.polygon([(304, 134), (356, 140), (362, 246), (314, 246)], fill=255)
    pil_m = pil_m.filter(ImageFilter.GaussianBlur(radius=1.2))
    region = np.array(pil_m, dtype=np.float32) / 255.0
    char_alpha = arr[:, :, 3].astype(np.float32) / 255.0
    mask = np.clip(region * char_alpha, 0.0, 1.0)
    return mask


# ============================================================================
# 4. All 10 Studio Variation Compositors
# ============================================================================

def build_studio_variations() -> list[tuple[dict[str, Any], Image.Image, dict[str, Any]]]:
    """Generate all 10 studio-polished transparent chibi sprites from reference_turnaround.png."""
    SPRITE_DIR.mkdir(parents=True, exist_ok=True)
    QA_DIR.mkdir(parents=True, exist_ok=True)

    ref_img = Image.open(REF_PATH).convert("RGB")
    raw_views = slice_sheet_image(ref_img, expected_count=3, pad_px=24)
    front_matted, f_stats = remove_white_bg_and_matte(raw_views[0], min_fg_component_px=40)
    side_matted, s_stats = remove_white_bg_and_matte(raw_views[1], min_fg_component_px=40)

    # Canonical upright 480x480 front base used for pixel-exact micro-expressions
    front_canonical, _ = trim_and_standardize(
        front_matted, canvas_size=SPRITE_SIZE, pad_top=58, pad_bottom=16, pad_side=36
    )

    print(f"[BASE VIEW] front: holes={f_stats['interior_holes_removed']} | side: holes={s_stats['interior_holes_removed']}")

    results: list[tuple[dict[str, Any], Image.Image, dict[str, Any]]] = []

    for spec in SPRITE_SPECS:
        sid = spec["id"]
        back_vc = VectorCanvas4x()
        front_vc = VectorCanvas4x()

        if sid == "01_idle_smile":
            char_expr = apply_front_micro_expression(front_canonical, mouth="gentle_smile", blush_strength=0.28)
            char_layer = pose_character_on_canvas(char_expr, tilt_deg=0.0, x_offset_px=0)
            # Soft warm welcoming glow aura + 5 crisp 4-point sparkles framing silhouette
            back_vc.add_glow(238, 255, 160, PAL["gold"], max_alpha=0.14, steps=7)
            front_vc.add_star4(92, 134, 17, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=-8)
            front_vc.add_star4(114, 178, 10, fill=PAL["cream_hi"], hi="#FFFFFF", angle_deg=14)
            front_vc.add_star4(388, 172, 14, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=10)
            front_vc.add_star4(84, 304, 11, fill=PAL["orange_hi"], hi=PAL["gold_hi"], angle_deg=6)
            front_vc.add_star4(384, 326, 12, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=-12)
            front_vc.add_dot(126, 112, 3.8, fill=PAL["gold_hi"])
            front_vc.add_dot(374, 212, 3.4, fill=PAL["cream_hi"])

        elif sid == "02_study_reading":
            # Side profile leaning slightly forward toward an open vintage hardcover study book
            char_layer = pose_character_on_canvas(side_matted, tilt_deg=-2.8, x_offset_px=52, scale_adjust=1.00)
            back_vc.add_glow(104, 254, 82, PAL["gold"], max_alpha=0.18, steps=6)
            front_vc.add_open_book(104, 254, scale=1.06, angle_deg=-8.0)
            front_vc.add_star4(74, 178, 14, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=-10)
            front_vc.add_star4(118, 154, 10, fill=PAL["cream_hi"], hi="#FFFFFF", angle_deg=12)
            front_vc.add_star4(146, 188, 8, fill=PAL["orange_hi"], hi=PAL["gold_hi"], angle_deg=4)
            front_vc.add_dot(56, 206, 3.6, fill=PAL["gold_hi"])
            front_vc.add_star4(408, 168, 11, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=-6)

        elif sid == "03_thinking_hint":
            char_expr = apply_front_micro_expression(front_canonical, mouth="thinking_o", blush_strength=0.22)
            char_layer = pose_character_on_canvas(char_expr, tilt_deg=-5.2, x_offset_px=26)
            back_vc.add_glow(88, 106, 62, PAL["gold"], max_alpha=0.18, steps=6)
            front_vc.add_thinking_badge(86, 108, scale=1.02)
            front_vc.add_star4(404, 174, 12, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=8)
            front_vc.add_dot(46, 164, 3.8, fill=PAL["gold_hi"])

        elif sid == "04_cheer_correct":
            char_expr = apply_front_micro_expression(
                front_canonical, mouth="open_happy", blush_strength=0.40, eye_sparkles=True
            )
            char_layer = pose_character_on_canvas(
                char_expr, tilt_deg=4.2, x_offset_px=0, y_lift_px=12, scale_adjust=1.01
            )
            # Radiant warm celebration burst behind & around Xiao Ke
            back_vc.add_glow(240, 215, 175, PAL["gold"], max_alpha=0.22, steps=8)
            # Crisp celebratory star burst (4-point & 5-point stars + festive ribbons)
            front_vc.add_star5(84, 118, 22, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=-16)
            front_vc.add_star4(122, 74, 13, fill=PAL["orange"], hi=PAL["gold_hi"], angle_deg=12)
            front_vc.add_star4(70, 198, 14, fill=PAL["cream_hi"], hi="#FFFFFF", angle_deg=-8)
            front_vc.add_star5(396, 136, 19, fill=PAL["orange"], hi=PAL["orange_hi"], angle_deg=18)
            front_vc.add_star4(368, 78, 14, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=-14)
            front_vc.add_star4(406, 224, 13, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=8)
            front_vc.add_star4(82, 314, 12, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=15)
            front_vc.add_star4(398, 324, 11, fill=PAL["orange_hi"], hi=PAL["gold_hi"], angle_deg=-10)
            # Lively confetti dots & curved joy arcs
            for dx, dy, col in [(106, 160, PAL["orange"]), (386, 184, PAL["gold"]), (62, 256, PAL["gold"]), (414, 276, PAL["orange"])]:
                front_vc.add_dot(dx, dy, 4.4, fill=col)
            # Subtle cute bounce motion lines under boots
            for bx, ang in [(198, 15), (274, -15)]:
                tf = Affine2D().rotate_deg(ang).translate(bx, 462) + front_vc.ax.transData
                front_vc.ax.plot([-10, 10], [0, 0], color=PAL["ink"], linewidth=front_vc.lw(4.0), solid_capstyle="round", transform=tf)
                front_vc.ax.plot([-9, 9], [0, 0], color=PAL["gold"], linewidth=front_vc.lw(1.8), solid_capstyle="round", transform=tf)

        elif sid == "05_encourage_wrong":
            char_expr = apply_front_micro_expression(front_canonical, mouth="gentle_smile", blush_strength=0.42)
            char_layer = pose_character_on_canvas(char_expr, tilt_deg=-2.4, x_offset_px=20)
            # Warm comforting glow + plush orange-gold heart & companion mini hearts
            back_vc.add_glow(88, 140, 72, PAL["orange"], max_alpha=0.22, steps=7)
            back_vc.add_glow(255, 240, 145, PAL["orange_hi"], max_alpha=0.12, steps=6)
            front_vc.add_heart(88, 144, scale=1.08, angle_deg=-12.0, fill=PAL["orange"], shadow=PAL["orange_dk"])
            front_vc.add_heart(132, 92, scale=0.46, angle_deg=14.0, fill=PAL["gold"], shadow=PAL["gold_dk"], outline_px=2.3)
            front_vc.add_heart(414, 186, scale=0.52, angle_deg=12.0, fill=PAL["orange_hi"], shadow=PAL["orange"], outline_px=2.3)
            front_vc.add_star4(54, 212, 11, fill=PAL["gold_hi"], hi="#FFFFFF", angle_deg=-8)
            front_vc.add_star4(410, 132, 11, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=10)
            front_vc.add_dot(120, 198, 3.8, fill=PAL["cream_hi"])

        elif sid == "06_writing_quill":
            char_expr = apply_front_micro_expression(front_canonical, mouth="gentle_smile", blush_strength=0.24)
            char_layer = pose_character_on_canvas(char_expr, tilt_deg=-2.6, x_offset_px=42)
            back_vc.add_glow(92, 266, 86, PAL["gold"], max_alpha=0.16, steps=6)
            front_vc.add_quill_and_scroll(92, 258, scale=1.02)
            front_vc.add_star4(62, 140, 13, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=-10)
            front_vc.add_star4(122, 152, 9, fill=PAL["cream_hi"], hi="#FFFFFF", angle_deg=12)
            front_vc.add_star4(414, 178, 11, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=8)

        elif sid == "07_listening_audio":
            char_expr = apply_front_micro_expression(front_canonical, mouth="cat_smile", blush_strength=0.34)
            # Keep exact canonical upright alignment so headphone coordinates lock to crown & ears!
            char_layer = char_expr.copy()
            back_vc.add_headphones(layer="back")
            # Render headphones front layer, then mask daisy region back on top so daisy is 100% visible!
            hp_vc = VectorCanvas4x()
            hp_vc.add_headphones(layer="front")
            hp_layer = hp_vc.render_rgba()

            # Floating crisp golden musical notes with generous clearance from earcups!
            front_vc.add_music_note_beamed(72, 118, scale=1.06, angle_deg=-10.0, fill=PAL["orange"])
            front_vc.add_music_note_single(72, 240, scale=0.88, angle_deg=12.0, fill=PAL["gold"])
            front_vc.add_music_note_single(404, 146, scale=0.98, angle_deg=-12.0, fill=PAL["gold"])
            front_vc.add_star4(52, 178, 10, fill=PAL["gold_hi"], hi="#FFFFFF", angle_deg=8)
            front_vc.add_star4(402, 212, 11, fill=PAL["orange_hi"], hi=PAL["gold_hi"], angle_deg=-10)

            # Compose carefully: back cushions -> Xiao Ke -> headphones -> daisy re-layered cleanly on top -> music notes!
            back_img = back_vc.render_rgba()
            comp = Image.alpha_composite(back_img, char_layer)
            comp = Image.alpha_composite(comp, hp_layer)

            # Restore Xiao Ke's signature daisy hairpiece & black ribbons crisply IN FRONT of the right headphone band
            daisy_mask = build_daisy_preserve_mask(char_layer)
            comp_arr = np.array(comp, dtype=np.float32)
            char_arr = np.array(char_layer, dtype=np.float32)
            dm = daisy_mask[:, :, None]
            # Standard over-blend of masked daisy onto comp
            out_rgb = char_arr[:, :, :3] * dm + comp_arr[:, :, :3] * (1.0 - dm)
            out_a = np.maximum(comp_arr[:, :, 3], char_arr[:, :, 3] * daisy_mask)
            comp = Image.fromarray(
                np.concatenate([np.clip(np.round(out_rgb), 0, 255), np.clip(np.round(out_a[:, :, None]), 0, 255)], axis=2).astype(np.uint8),
                mode="RGBA",
            )
            final_sprite = Image.alpha_composite(comp, front_vc.render_rgba())
            out_png = SPRITE_DIR / f"{sid}.png"
            final_sprite.save(out_png, format="PNG", optimize=True)
            results.append((
                spec,
                final_sprite,
                {
                    "placed_w": 360,
                    "placed_h": 424,
                    "interior_holes_removed": f_stats["interior_holes_removed"],
                    "png_bytes": out_png.stat().st_size,
                },
            ))
            print(f"[STUDIO OK] {sid}: PNG {out_png.stat().st_size/1024:.1f} KB (daisy-layered headphones + music notes)")
            continue

        elif sid == "08_sleepy_rest":
            char_expr = apply_front_micro_expression(
                front_canonical, mouth="yawn_o", blush_strength=0.34, sleepy_lids=True
            )
            char_layer = pose_character_on_canvas(char_expr, tilt_deg=2.2, x_offset_px=-10)
            back_vc.add_glow(74, 116, 66, PAL["gold"], max_alpha=0.18, steps=6)
            back_vc.add_glow(396, 326, 60, PAL["orange_hi"], max_alpha=0.16, steps=6)
            front_vc.add_crescent_and_zzz(76, 98, scale=1.02)
            front_vc.add_teacup(396, 336, scale=1.04)
            front_vc.add_star4(44, 184, 9, fill=PAL["gold_hi"], hi="#FFFFFF", angle_deg=10)
            front_vc.add_dot(114, 62, 3.5, fill=PAL["cream_hi"])

        elif sid == "09_proud_streak":
            char_expr = apply_front_micro_expression(
                front_canonical, mouth="proud_smirk", blush_strength=0.32, eye_sparkles=True
            )
            char_layer = pose_character_on_canvas(char_expr, tilt_deg=4.4, x_offset_px=20, scale_adjust=1.01)
            front_vc.add_proud_laurel_badge(86, 124, scale=1.04)
            front_vc.add_star4(398, 128, 16, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=12)
            front_vc.add_star4(416, 178, 11, fill=PAL["orange_hi"], hi=PAL["gold_hi"], angle_deg=-10)
            front_vc.add_star4(66, 224, 13, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=-8)
            front_vc.add_star4(396, 304, 12, fill=PAL["cream_hi"], hi="#FFFFFF", angle_deg=14)
            front_vc.add_dot(128, 184, 4.0, fill=PAL["gold_hi"])

        elif sid == "10_eureka_tip":
            char_expr = apply_front_micro_expression(
                front_canonical, mouth="eureka_open", blush_strength=0.30, eye_sparkles=True
            )
            char_layer = pose_character_on_canvas(
                char_expr, tilt_deg=-2.6, x_offset_px=20, y_lift_px=4, scale_adjust=1.00
            )
            front_vc.add_lightbulb(86, 118, scale=1.05, angle_deg=-15.0)
            front_vc.add_star4(402, 138, 15, fill=PAL["gold"], hi=PAL["gold_hi"], angle_deg=10)
            front_vc.add_star4(388, 192, 10, fill=PAL["cream_hi"], hi="#FFFFFF", angle_deg=-12)
            front_vc.add_star4(60, 212, 12, fill=PAL["orange_hi"], hi=PAL["gold_hi"], angle_deg=8)
            front_vc.add_dot(142, 74, 4.0, fill=PAL["gold_hi"])

        else:
            char_layer = front_canonical.copy()

        comp = Image.alpha_composite(back_vc.render_rgba(), char_layer)
        final_sprite = Image.alpha_composite(comp, front_vc.render_rgba())

        out_png = SPRITE_DIR / f"{sid}.png"
        final_sprite.save(out_png, format="PNG", optimize=True)

        arr = np.array(final_sprite)
        ys, xs = np.where(arr[:, :, 3] >= 20)
        pw = int(xs.max() - xs.min() + 1) if len(xs) else 0
        ph = int(ys.max() - ys.min() + 1) if len(ys) else 0
        results.append((
            spec,
            final_sprite,
            {
                "placed_w": pw,
                "placed_h": ph,
                "interior_holes_removed": s_stats["interior_holes_removed"] if sid == "02_study_reading" else f_stats["interior_holes_removed"],
                "png_bytes": out_png.stat().st_size,
            },
        ))
        print(f"[STUDIO OK] {sid}: PNG {out_png.stat().st_size/1024:.1f} KB | bbox {pw}x{ph}")

    return results


# ============================================================================
# 5. WebP Encoding, QA Contact Sheets (Candlelit Dark #17120e + Parchment #fbf6ee)
# ============================================================================

def encode_embed_data_uri(
    sprite_480: Image.Image,
    embed_size: int = EMBED_SIZE,
    webp_quality: int = EMBED_WEBP_QUALITY,
) -> tuple[str, str, int]:
    out = _premult_resize(sprite_480, (embed_size, embed_size))
    buf = io.BytesIO()
    out.save(buf, format="WEBP", quality=webp_quality, method=6, exact=False)
    raw_bytes = buf.getvalue()
    b64 = base64.b64encode(raw_bytes).decode("ascii")
    mime = "image/webp"
    uri = f"data:{mime};base64,{b64}"
    return uri, mime, len(uri)


def make_theme_split_qa_tile(sprite: Image.Image, tile_size: int = 320) -> Image.Image:
    """
    Composite sprite onto the CET-4 site's exact two live themes:
      - Left half:  Candlelit Library Dark (#17120e) — immediately reveals any halo!
      - Right half: Ivory Parchment Light (#fbf6ee) with faint subtle transparency
                    checker tint (#f4ece0) — verifies dress opacity & prop contrast!
      - Baseline guide at y_bottom
    """
    bg = Image.new("RGBA", (tile_size, tile_size), (23, 18, 14, 255))
    draw = ImageDraw.Draw(bg)
    half = tile_size // 2
    sq = 16
    for y in range(0, tile_size, sq):
        for x in range(half, tile_size, sq):
            c = (251, 246, 238, 255) if ((x // sq) + (y // sq)) % 2 == 0 else (240, 231, 217, 255)
            draw.rectangle([x, y, x + sq - 1, y + sq - 1], fill=c)

    draw.line([(half, 0), (half, tile_size)], fill=(217, 93, 30, 120), width=1)
    baseline_y = int(round(tile_size * (1.0 - 16.0 / SPRITE_SIZE)))
    draw.line([(0, baseline_y), (tile_size, baseline_y)], fill=(217, 93, 30, 140), width=1)

    sp_small = _premult_resize(sprite, (tile_size, tile_size))
    return Image.alpha_composite(bg, sp_small)


def build_qa_contact_sheet(
    sprites: list[tuple[str, str, Image.Image, dict[str, Any]]],
    out_path: Path,
    title_suffix: str = " [Studio Edition]",
    cols: int = 5,
    tile_size: int = 320,
) -> None:
    rows = (len(sprites) + cols - 1) // cols
    header_h = 44
    footer_h = 34
    gap = 12
    pad = 16

    sheet_w = pad * 2 + cols * tile_size + (cols - 1) * gap
    sheet_h = pad * 2 + header_h + rows * (tile_size + footer_h) + (rows - 1) * gap
    sheet = Image.new("RGB", (sheet_w, sheet_h), (23, 18, 14))
    draw = ImageDraw.Draw(sheet)

    try:
        font_title = ImageFont.truetype("arial.ttf", 19)
        font_label = ImageFont.truetype("arial.ttf", 14)
    except Exception:
        font_title = ImageFont.load_default()
        font_label = ImageFont.load_default()

    draw.text(
        (pad, 14),
        f"Xiao Ke Visual QA{title_suffix} — Left: Candlelit Dark (#17120e) | Right: Ivory Parchment (#fbf6ee) | Orange: ground baseline",
        fill=(251, 241, 224),
        font=font_title,
    )

    for idx, (sid, en_label, sp, info) in enumerate(sprites):
        r = idx // cols
        c = idx % cols
        x = pad + c * (tile_size + gap)
        y = pad + header_h + r * (tile_size + footer_h + gap)
        tile = make_theme_split_qa_tile(sp, tile_size=tile_size).convert("RGB")
        sheet.paste(tile, (x, y))
        draw.rectangle([x, y, x + tile_size - 1, y + tile_size - 1], outline=(86, 68, 54), width=1)
        caption = f"{sid} ({en_label}) | {info.get('placed_w', 0)}x{info.get('placed_h', 0)}"
        draw.text((x + 6, y + tile_size + 8), caption, fill=(242, 226, 204), font=font_label)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out_path, format="PNG", optimize=True)


def build_cream_preview_sheet(
    sprites: list[tuple[str, str, Image.Image, dict[str, Any]]],
    out_path: Path,
    cols: int = 5,
    tile_size: int = 280,
) -> None:
    rows = (len(sprites) + cols - 1) // cols
    gap = 12
    pad = 16
    sheet_w = pad * 2 + cols * tile_size + (cols - 1) * gap
    sheet_h = pad * 2 + rows * (tile_size + 28) + (rows - 1) * gap
    sheet = Image.new("RGB", (sheet_w, sheet_h), (251, 246, 238))
    draw = ImageDraw.Draw(sheet)
    try:
        font_label = ImageFont.truetype("arial.ttf", 14)
    except Exception:
        font_label = ImageFont.load_default()

    for idx, (sid, label, sp, _info) in enumerate(sprites):
        r = idx // cols
        c = idx % cols
        x = pad + c * (tile_size + gap)
        y = pad + r * (tile_size + 28 + gap)
        card = Image.new("RGBA", (tile_size, tile_size), (255, 253, 249, 255))
        sp_small = _premult_resize(sp, (tile_size, tile_size))
        comp = Image.alpha_composite(card, sp_small).convert("RGB")
        sheet.paste(comp, (x, y))
        draw.rectangle([x, y, x + tile_size - 1, y + tile_size - 1], outline=(224, 206, 182), width=2)
        draw.text((x + 6, y + tile_size + 6), f"{sid} ({label})", fill=(47, 29, 20), font=font_label)

    sheet.save(out_path, format="PNG", optimize=True)


def write_outputs(
    processed_sprites: list[tuple[dict[str, Any], Image.Image, dict[str, Any]]],
    *,
    is_dev_stub: bool,
    source_tag: str,
    write_manifests: bool = True,
) -> None:
    quality = EMBED_WEBP_QUALITY
    manifest_items: list[dict[str, Any]] = []
    b64_map: dict[str, str] = {}

    while True:
        b64_map.clear()
        manifest_items.clear()
        total_uri_bytes = 0
        for spec, std, stats in processed_sprites:
            sid = spec["id"]
            uri, mime, uri_len = encode_embed_data_uri(std, embed_size=EMBED_SIZE, webp_quality=quality)
            b64_map[sid] = uri
            total_uri_bytes += uri_len
            manifest_items.append({
                "id": sid,
                "zh_label": spec["zh_label"],
                "en_label": spec["en_label"],
                "mood": spec["mood"],
                "triggers": spec["triggers"],
                "speech_lines": spec["speech_lines"],
                "file": f"assets/xiaoke/sprites/{sid}.png",
                "width": SPRITE_SIZE,
                "height": SPRITE_SIZE,
                "embed_width": EMBED_SIZE,
                "embed_height": EMBED_SIZE,
                "embed_mime": mime,
                "embed_b64_bytes": uri_len,
                "png_bytes": stats["png_bytes"],
            })
        if total_uri_bytes <= MAX_B64_BYTES or quality <= 64:
            break
        quality -= 4

    qa_entries = [(spec["id"], spec["en_label"], std, stats) for spec, std, stats in processed_sprites]
    if qa_entries:
        build_qa_contact_sheet(qa_entries, QA_DIR / "qa_contact_sheet.png", title_suffix=f" [{source_tag}]")
        build_cream_preview_sheet(qa_entries, QA_DIR / "qa_cream_preview.png")

    if write_manifests and manifest_items:
        b64_payload = json.dumps(b64_map, ensure_ascii=False, separators=(",", ":"))
        manifest = {
            "is_dev_stub": is_dev_stub,
            "source": source_tag,
            "character": {
                "name_zh": "小克",
                "name_en": "Xiao Ke",
                "theme": "Autumn Daisy Victorian Chibi Study Companion",
                "reference_turnaround": "assets/xiaoke/reference_turnaround.png",
                "sprite_count": len(manifest_items),
                "sprite_dimensions": [SPRITE_SIZE, SPRITE_SIZE],
                "embed_dimensions": [EMBED_SIZE, EMBED_SIZE],
                "embed_webp_quality": quality,
                "total_b64_bytes": len(b64_payload),
            },
            "sprites": manifest_items,
        }
        (ASSET_DIR / "manifest.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        (ASSET_DIR / "xiaoke_b64.json").write_text(b64_payload, encoding="utf-8")
        print(
            f"\n[SUMMARY] {len(manifest_items)}/10 sprites written ({source_tag}) | "
            f"xiaoke_b64.json = {len(b64_payload)/1024:.1f} KB (WebP q={quality}, budget <= {MAX_B64_BYTES/1024:.0f} KB)"
        )
        print(f"  Manifest:         {ASSET_DIR / 'manifest.json'} (is_dev_stub={is_dev_stub}, source={source_tag})")
        print(f"  Base64 Bundle:    {ASSET_DIR / 'xiaoke_b64.json'}")
        print(f"  QA Contact Sheet: {QA_DIR / 'qa_contact_sheet.png'}")
        print(f"  QA Cream Preview: {QA_DIR / 'qa_cream_preview.png'}")


def process_from_raw(only_ids: set[str] | None = None, force_slice: bool = False) -> None:
    SPRITE_DIR.mkdir(parents=True, exist_ok=True)
    QA_DIR.mkdir(parents=True, exist_ok=True)
    overrides = load_overrides()
    auto_slice_sheets(force=force_slice)

    processed_sprites: list[tuple[dict[str, Any], Image.Image, dict[str, Any]]] = []
    missing: list[str] = []
    for spec in SPRITE_SPECS:
        sid = spec["id"]
        if only_ids and sid not in only_ids:
            continue
        raw_path = RAW_DIR / f"{sid}.png"
        if not raw_path.exists():
            missing.append(sid)
            continue
        ov = overrides.get(sid, {})
        raw_img = Image.open(raw_path).convert("RGB")
        matted, m_stats = remove_white_bg_and_matte(
            raw_img,
            bg_dist_thresh=ov.get("bg_dist_thresh", 22.0),
            bg_chroma_thresh=ov.get("bg_chroma_thresh", 12.0),
            interior_dist_thresh=ov.get("interior_dist_thresh", 22.0),
            interior_chroma_thresh=ov.get("interior_chroma_thresh", 12.0),
            interior_med_chroma_max=ov.get("interior_med_chroma_max", 8.5),
            interior_med_dist_max=ov.get("interior_med_dist_max", 12.0),
            interior_min_area=ov.get("interior_min_area", 30),
            interior_outline_ratio=ov.get("interior_outline_ratio", 0.44),
            detect_interior_holes=ov.get("detect_interior_holes", True),
            keep_boxes=ov.get("keep_boxes"),
            force_bg_points=ov.get("force_bg_points"),
        )
        std, s_stats = trim_and_standardize(
            matted,
            canvas_size=SPRITE_SIZE,
            pad_top=ov.get("pad_top", 18),
            pad_bottom=ov.get("pad_bottom", 16),
            pad_side=ov.get("pad_side", 18),
            scale_adjust=ov.get("scale_adjust", 1.0),
            x_offset_px=ov.get("x_offset_px", 0),
        )
        out_png = SPRITE_DIR / f"{sid}.png"
        std.save(out_png, format="PNG", optimize=True)
        merged = {**m_stats, **s_stats, "png_bytes": out_png.stat().st_size}
        processed_sprites.append((spec, std, merged))

    if missing:
        print(f"[WARN] Missing raw images ({len(missing)}): {', '.join(missing)}")
    write_outputs(
        processed_sprites,
        is_dev_stub=False,
        source_tag="raw_generated",
        write_manifests=(not only_ids and len(processed_sprites) > 0),
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Build 10 studio-polished Xiao Ke transparent chibi sprites.")
    parser.add_argument("--studio", action="store_true", help="Build turnaround_studio_edition 10 sprites (default)")
    parser.add_argument("--from-raw", action="store_true", help="Process individual raw/<id>.png or raw/sheet_*.png files")
    parser.add_argument("--force-slice", action="store_true", help="Force re-slice of sheet_*.png files in --from-raw mode")
    parser.add_argument("--only", nargs="*", help="Process only specific sprite IDs in --from-raw mode")
    args = parser.parse_args()

    if args.from_raw:
        process_from_raw(set(args.only) if args.only else None, force_slice=args.force_slice)
    else:
        results = build_studio_variations()
        write_outputs(results, is_dev_stub=False, source_tag="turnaround_studio_edition", write_manifests=True)


if __name__ == "__main__":
    main()
