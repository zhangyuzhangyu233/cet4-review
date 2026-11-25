"""
Authentic CET-4 Real Past-Paper Extractor (2023.06 - 2026.06, Newest First)
Extracts 6 genuine CET-4 full 57-item past papers (342 authentic exam items)
strictly from `2023.06` through `2026.06` in `_cet46_source` (ZERO 2017/2018 sets,
ZERO fabricated listening scripts, ZERO CET-6):

  1. cet4_2026_06_set1 — 2026年6月四级真题（第1套） (57 items, official MD keys + models, self-audio listening)
  2. cet4_2026_06_set2 — 2026年6月四级真题（第2套） (57 items, official MD keys + models, self-audio listening)
  3. cet4_2025_12_set1 — 2025年12月四级真题（第1套）(57 items, embedded KEYS + C4-004 writing logic, self-audio listening)
  4. cet4_2024_06_set1 — 2024年6月四级真题（第1套） (57 items, official quick-key PDF + models, self-audio listening)
  5. cet4_2023_06_set1 — 2023年6月四级真题（第1套） (57 items, FULL VERBATIM LISTENING SCRIPTS + Web Speech audio!)
  6. cet4_2023_06_set2 — 2023年6月四级真题（第2套） (57 items, FULL VERBATIM LISTENING SCRIPTS + Web Speech audio!)

Outputs: cet4-review/src/real_papers_data.js (window.REAL_CET4_PAPERS + module.exports)
"""
import json
import os
import re
import sys

try:
    import pymupdf as pdf_mod
except ImportError:
    import fitz as pdf_mod

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_ROOT = os.path.join(os.path.dirname(REPO_ROOT), "_cet46_source")
OUT_JS = os.path.join(REPO_ROOT, "src", "real_papers_data.js")

SIGNAL_PATTERNS = [
    r"\bhowever\b", r"\bbut\b", r"\bactually\b", r"\bin fact\b", r"\binstead\b",
    r"\bnevertheless\b", r"\balthough\b", r"\bthough\b", r"\bwhereas\b", r"\byet\b",
    r"\bbecause\b", r"\btherefore\b", r"\bso\b", r"\bas a result\b", r"\bfollowing\b",
    r"\bfor example\b", r"\bfor instance\b", r"\bsuch as\b", r"\bfirst\b", r"\bfinally\b",
    r"\bmost importantly\b", r"\bturned out\b", r"\bby contrast\b", r"\bon the other hand\b",
    r"\bconversely\b", r"\bunfortunately\b", r"\baccordingly\b", r"\bin other words\b",
    r"\bmeanwhile\b", r"\binstead of\b", r"\bpreviously\b", r"\beventually\b",
]

LISTENING_GROUPS_SPEC = [
    (0, "nr1", "News Report 1", [1, 2]),
    (0, "nr2", "News Report 2", [3, 4]),
    (0, "nr3", "News Report 3", [5, 6, 7]),
    (1, "lc1", "Conversation 1", [8, 9, 10, 11]),
    (1, "lc2", "Conversation 2", [12, 13, 14, 15]),
    (2, "p1", "Passage 1", [16, 17, 18]),
    (2, "p2", "Passage 2", [19, 20, 21]),
    (2, "p3", "Passage 3", [22, 23, 24, 25]),
]


def read_pdf_pages(rel_path: str) -> list:
    full = os.path.join(SOURCE_ROOT, rel_path)
    if not os.path.isfile(full):
        raise FileNotFoundError(f"Missing source PDF: {full}")
    doc = pdf_mod.open(full)
    pages = [p.get_text("text") for p in doc]
    doc.close()
    return pages


def read_text_file(rel_path: str) -> str:
    full = os.path.join(SOURCE_ROOT, rel_path)
    if not os.path.isfile(full):
        raise FileNotFoundError(f"Missing source file: {full}")
    with open(full, encoding="utf-8") as f:
        return f.read()


def sanitize_typos(text: str, replacements: list) -> str:
    for old, new in replacements:
        text = text.replace(old, new)
    return text


def join_wrapped_english(text: str) -> str:
    lines = [ln.strip() for ln in text.replace("\r", "").replace("\u2007", " ").split("\n")]
    out = []
    for ln in lines:
        if not ln or ln == "---PAGE---":
            continue
        m_pg = re.fullmatch(r"-?\s*(\d{1,2})\s*-?", ln)
        if m_pg and int(m_pg.group(1)) <= 20:
            continue
        if re.match(r"^第\d+页[,，]共\d+页$", ln):
            continue
        if re.match(r"^(?:20\d{2}\s*年|大学英语四级考试20\d{2})", ln):
            continue
        out.append(ln)
    joined = " ".join(out)
    joined = joined.replace("&amp;", "&").replace("\u00a0", " ").replace("\u3000", " ")
    joined = re.sub(r"([A-Za-z])-\s+([a-z])", r"\1-\2", joined)
    joined = re.sub(r"\s+([,.;:!?])", r"\1", joined)
    joined = re.sub(r"\(\s+", "(", joined)
    joined = re.sub(r"\s+\)", ")", joined)
    joined = re.sub(r"\$\s+(\d)", r"$\1", joined)
    joined = re.sub(r"\s{2,}", " ", joined)
    return joined.strip()


def join_chinese_prose(text: str) -> str:
    lines = [ln.strip() for ln in text.replace("\r", "").replace("\u2007", " ").split("\n")]
    out = []
    for ln in lines:
        if not ln or ln == "---PAGE---":
            continue
        m_pg = re.fullmatch(r"-?\s*(\d{1,2})\s*-?", ln)
        if m_pg and int(m_pg.group(1)) <= 20:
            continue
        if re.match(r"^第\d+页[,，]共\d+页$", ln):
            continue
        if re.match(r"^(?:20\d{2}\s*年|大学英语四级考试20\d{2})", ln):
            continue
        out.append(ln)
    s = ""
    for piece in out:
        if not s:
            s = piece
            continue
        if re.search(r"[A-Za-z0-9]$", s) and re.match(r"^[A-Za-z0-9]", piece):
            s += " " + piece
        else:
            s += piece
    s = s.replace("&amp;", "&")
    s = re.sub(r"\s{2,}", " ", s)
    return s.strip()


def find_signal_words(text: str) -> list:
    found = []
    seen = set()
    for pat in SIGNAL_PATTERNS:
        m = re.search(pat, text, flags=re.IGNORECASE)
        if m:
            w = m.group(0)
            k = w.lower()
            if k not in seen:
                seen.add(k)
                found.append(w)
    return found[:4]


def split_sentences_for_speech(text: str) -> list:
    """Split English monologue into sentences using fixed-width regexes (Python 3.15 safe)."""
    protected = text
    abbrs = ["Mr.", "Mrs.", "Ms.", "Dr.", "St.", "U.S.", "U.K.", "D.C.", "p.m.", "a.m.", "E."]
    for i, ab in enumerate(abbrs):
        protected = protected.replace(ab, f"__ABBR{i}__")
    protected = re.sub(r"(\d)\.(\d)", r"\1__DOT__\2", protected)
    # Use split marker injection (no variable-width lookbehind!)
    marked = re.sub(r'([.!?]["”\']?)\s+(?=[A-Z"“\'(（])', r"\1\n", protected)
    sents = []
    for p in marked.split("\n"):
        restored = p.replace("__DOT__", ".")
        for i, ab in enumerate(abbrs):
            restored = restored.replace(f"__ABBR{i}__", ab)
        restored = restored.strip()
        if restored:
            sents.append(restored)
    return sents


def strip_evidence_markers(text: str) -> tuple:
    qnums = []
    for m in re.finditer(r"[（(]\s*(\d{1,2})(?:-\d)?\s*[)）]", text):
        n = int(m.group(1))
        if 1 <= n <= 25 and n not in qnums:
            qnums.append(n)
    clean = re.sub(r"[（(]\s*\d{1,2}(?:-\d)?\s*[)）]\s*", "", text)
    clean = re.sub(r"\s{2,}", " ", clean).strip()
    clean = re.sub(r"\s+([,.;:!?])", r"\1", clean)
    return clean, sorted(qnums)


def build_monologue_turns(raw_script: str, q_range: list) -> list:
    text = join_wrapped_english(raw_script)
    text = text.replace("“", '"').replace("”", '"').replace("‘", "'").replace("’", "'")
    text = text.replace("，", ", ").replace("。", ". ").replace("？", "? ").replace("！", "! ")
    text = re.sub(r"\s{2,}", " ", text).strip()
    sents = split_sentences_for_speech(text)
    turns = []
    for s in sents:
        clean_s, ev = strip_evidence_markers(s)
        ev = [q for q in ev if q in q_range]
        if not clean_s:
            continue
        if turns and len(clean_s.split()) < 3 and not ev:
            turns[-1]["text"] = (turns[-1]["text"] + " " + clean_s).strip()
            continue
        t = {"speaker": "Narrator", "text": clean_s, "signalWords": find_signal_words(clean_s)}
        if ev:
            t["evidenceFor"] = ev
        turns.append(t)
    return turns


def build_conversation_turns(raw_script: str, q_range: list) -> list:
    text = raw_script.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"\n?---PAGE---\n?", "\n", text)
    raw_turns = []
    for ln in text.split("\n"):
        s = ln.strip()
        if not s or re.match(r"^第\d+页[,，]共\d+页$", s):
            continue
        m = re.match(r"^(M|W)\s*[:：;]\s*(.*)$", s)
        if m:
            raw_turns.append([m.group(1), m.group(2).strip()])
        elif raw_turns:
            raw_turns[-1][1] += " " + s
    turns = []
    for spk, body in raw_turns:
        body = body.replace("“", '"').replace("”", '"').replace("‘", "'").replace("’", "'")
        body = body.replace("，", ", ").replace("？", "? ").replace("！", "! ")
        clean_b, ev = strip_evidence_markers(body)
        ev = [q for q in ev if q in q_range]
        clean_b = re.sub(r"\s{2,}", " ", clean_b).strip()
        clean_b = re.sub(r"\s+([,.;:!?])", r"\1", clean_b)
        if not clean_b:
            continue
        t = {"speaker": spk, "text": clean_b, "signalWords": find_signal_words(clean_b)}
        if ev:
            t["evidenceFor"] = ev
        turns.append(t)
    return turns


def split_parts(full_text: str) -> dict:
    # Strip trailing KEYS page first if present
    keys_text = ""
    km = re.search(r"(?m)^\s*KEYS\s*$", full_text)
    main_text = full_text[:km.start()] if km else full_text
    if km:
        keys_text = full_text[km.start():]

    p1 = re.search(r"Part\s*I\b[\s\S]{0,60}?Writing", main_text, flags=re.IGNORECASE)
    p2 = re.search(r"Part\s*(?:II|Ⅱ)\b[\s\S]{0,60}?Listening", main_text, flags=re.IGNORECASE)
    p3 = re.search(r"Part\s*(?:III|Ⅲ)\b[\s\S]{0,80}?Reading", main_text, flags=re.IGNORECASE)
    p4 = re.search(r"Part\s*(?:IV|Ⅳ|IN|N)\b[\s\S]{0,60}?Translation", main_text, flags=re.IGNORECASE)
    if not (p1 and p2 and p3 and p4):
        raise ValueError(f"Failed to split Parts I-IV: {[bool(x) for x in (p1, p2, p3, p4)]}")

    part1 = main_text[p1.start():p2.start()]
    part2 = main_text[p2.start():p3.start()]
    part3 = main_text[p3.start():p4.start()]
    part4 = main_text[p4.start():]

    sA = re.search(r"Section\s*A\b", part3)
    sB = re.search(r"Section\s*B\b", part3)
    sC = re.search(r"Section\s*C\b", part3)
    if not (sA and sB and sC):
        raise ValueError("Failed to split Part III Sections A/B/C")

    return {
        "part1": part1,
        "part2": part2,
        "secA": part3[sA.start():sB.start()],
        "secB": part3[sB.start():sC.start()],
        "secC": part3[sC.start():],
        "part4": part4,
        "keys": keys_text,
    }


def parse_embedded_keys(keys_text: str) -> dict:
    """Parse KEYS page from 2024.06 / 2025.12 question PDFs -> {1: 'B', ..., 55: 'C'}."""
    out = {}
    p2_m = re.search(r"Listening\s+Comprehension([\s\S]*?)Part\s*(?:III|Ⅲ)", keys_text, flags=re.IGNORECASE)
    p3_m = re.search(r"Reading\s+Comprehension([\s\S]*)$", keys_text, flags=re.IGNORECASE)
    if p2_m:
        letters = re.findall(r"\b([A-D])\b", p2_m.group(1))
        assert len(letters) == 25, f"Expected 25 listening keys, got {len(letters)}"
        for i, lt in enumerate(letters, 1):
            out[i] = lt
    if p3_m:
        letters = re.findall(r"\b([A-O])\b", p3_m.group(1))
        assert len(letters) == 30, f"Expected 30 reading keys, got {len(letters)}"
        for i, lt in enumerate(letters, 26):
            out[i] = lt
    return out


def parse_listening_options_from_q(part2_text: str) -> dict:
    cleaned = []
    for ln in part2_text.replace("\r", "").replace("\u2007", " ").split("\n"):
        s = ln.strip()
        if not s:
            continue
        if re.fullmatch(r"-?\s*\d{1,2}\s*-?", s) or re.match(r"^第\d+页[,，]共\d+页$", s):
            continue
        if re.match(r"^(?:20\d{2}\s*年|大学英语四级考试20\d{2})", s):
            continue
        if s.startswith("four questions. Both the passage") or s.startswith("question, you must choose"):
            continue
        cleaned.append(s)
    text = "\n".join(cleaned)
    text = re.sub(r"Questions\s+\d+\s+(?:to|and)\s+\d+\s+are\s+based[^\n]*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"Section\s+[ABC]\s*\nDirections\s*[:：;][\s\S]*?through\s+the\s+centre\.", "", text, flags=re.IGNORECASE)

    q_blocks = {}
    matches = list(re.finditer(r"(?m)^\s*(\d{1,2})\.\s*(?=[A-D]\))", text))
    for i, m in enumerate(matches):
        qnum = int(m.group(1))
        if not (1 <= qnum <= 25):
            continue
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        chunk = text[start:end].strip()
        opt_matches = list(re.finditer(r"(?:^|\s)([A-D])\)\s*", chunk))
        opts = {}
        for j, om in enumerate(opt_matches):
            letter = om.group(1)
            o_s = om.end()
            o_e = opt_matches[j + 1].start() if j + 1 < len(opt_matches) else len(chunk)
            val = join_wrapped_english(chunk[o_s:o_e])
            opts[letter] = val
        if all(k in opts for k in ("A", "B", "C", "D")):
            q_blocks[qnum] = [f"{k}. {opts[k]}" for k in ("A", "B", "C", "D")]
    return q_blocks


def build_preread_cue_from_options(q_nums: list, q_opts_map: dict, title: str) -> str:
    """Generate a genuine, non-spoiler pre-read cue purely from the real A/B/C/D options."""
    stop = {
        "they", "their", "them", "that", "this", "with", "from", "have", "been", "were",
        "will", "would", "could", "about", "into", "more", "most", "some", "many", "very",
        "people", "other", "than", "make", "made", "what", "when", "where", "which", "your",
        "should", "there", "these", "those", "being", "after", "before", "because", "through",
    }
    freq = {}
    for qn in q_nums:
        for opt in q_opts_map[qn]:
            for w in re.findall(r"[A-Za-z]{4,}", opt[3:]):
                lw = w.lower()
                if lw in stop:
                    continue
                freq[w] = freq.get(w, 0) + 1
    top_words = [w for w, _ in sorted(freq.items(), key=lambda kv: (-kv[1], kv[0]))[:5]]
    kw_str = " / ".join(top_words) if top_words else "核心实词"
    return (
        f"未听先知（{title}）：放音前 15 秒速扫 Q{q_nums[0]}-Q{q_nums[-1]} 选项高频实词"
        f"【{kw_str}】，按主语/动词差异预判设问方向，听音时重点锁定首尾句与转折信号词后的同义替换。"
    )


def build_self_audio_listening(q_opts_map: dict, keys_map: dict, group_titles: list) -> dict:
    """Build authentic 25-item Listening section for 2024.06-2026.06 sets (NO fabricated scripts)."""
    sections_out = [
        {"section": "Section A", "label": "新闻报道 News Reports (Q1-7)", "groups": []},
        {"section": "Section B", "label": "长对话 Long Conversations (Q8-15)", "groups": []},
        {"section": "Section C", "label": "听力篇章 Passages (Q16-25)", "groups": []},
    ]
    for (sec_idx, gid, label, q_nums), gtitle in zip(LISTENING_GROUPS_SPEC, group_titles):
        cue = build_preread_cue_from_options(q_nums, q_opts_map, gtitle)
        q_items = []
        for qn in q_nums:
            ans = keys_map[qn]
            ans_opt = q_opts_map[qn][ord(ans) - 65]
            q_items.append({
                "num": qn,
                "questionText": f"Listening Question {qn}（请配合官方原声录音或选项预读作答）",
                "options": q_opts_map[qn],
                "answer": ans,
                "evidenceQuote": ans_opt,
                "explain": (
                    f"官方校对答案为 {ans}（{ans_opt[3:]}）。"
                    f"本套 2024–2026 最新真题源库未收录完整录音逐字稿，平台严格拒绝编造假文本；"
                    f"建议配合上方本地音频导入播放原声，或使用“选项朗读磨耳”强化预读辨音。"
                ),
            })
        sections_out[sec_idx]["groups"].append({
            "groupId": gid,
            "label": label,
            "title": gtitle,
            "qNums": q_nums,
            "preReadCue": cue,
            "scriptTurns": [],
            "questions": q_items,
        })
    return {
        "totalQuestions": 25,
        "hasScript": False,
        "sections": sections_out,
    }


def extract_writing_directions(part1_q: str) -> str:
    m = re.search(r"Directions\s*[:：]([\s\S]*)$", part1_q, flags=re.IGNORECASE)
    raw = m.group(1) if m else part1_q
    return join_wrapped_english(raw)


def extract_translation_chinese(part4_q: str) -> str:
    m = re.search(r"Answer\s+Sheet\s*2\.?\s*([\s\S]*)$", part4_q, flags=re.IGNORECASE)
    raw = m.group(1) if m else part4_q
    txt = join_chinese_prose(raw)
    txt = re.sub(r"20\d{2}\s*年\s*\d+\s*月\s*大学英语四级.*$", "", txt).strip()
    return txt


def parse_cloze_passage(raw_sec_a_q: str, blanks_meta: list, word_bank: list, title: str) -> dict:
    m_dir = re.search(r"more\s+than\s*once\.\s*", raw_sec_a_q, flags=re.IGNORECASE)
    body = raw_sec_a_q[m_dir.end():] if m_dir else raw_sec_a_q
    m_wb = re.search(r"(?m)^\s*A\)\s*[a-z]+", body)
    if m_wb:
        body = body[:m_wb.start()]
    # Pre-clean blank tokens that are stuck to adjacent letters in 2023.06 PDFs (e.g., `26it`, `3340`)
    body = re.sub(r"26it\b", " {{26}} it", body)
    body = re.sub(r"27clothing\b", " {{27}} clothing", body)
    body = re.sub(r"28\.", " {{28}}.", body)
    body = re.sub(r"29about\b", " {{29}} about", body)
    body = re.sub(r"30becoming\b", " {{30}} becoming", body)
    body = re.sub(r"32of\b", " {{32}} of", body)
    body = re.sub(r"3340\b", " {{33}} 40", body)
    body = re.sub(r"26in\b", " {{26}} in", body)
    body = re.sub(r"_27\b", " {{27}} ", body)
    body = re.sub(r"28from\b", " {{28}} from", body)
    body = re.sub(r"29at\b", " {{29}} at", body)
    body = re.sub(r"30part\b", " {{30}} part", body)
    body = re.sub(r"31in\b", " {{31}} in", body)
    body = re.sub(r"32on\b", " {{32}} on", body)
    body = re.sub(r"33for\b", " {{33}} for", body)

    text = join_wrapped_english(body)
    for num in range(26, 36):
        if f"{{{{{num}}}}}" in text:
            continue
        text = re.sub(rf"_{{1,5}}\s*{num}\s*_{{1,5}}", f"{{{{{num}}}}}", text)
        if f"{{{{{num}}}}}" not in text:
            text = re.sub(rf"(?<![\d$£€])(?<!\b19)(?<!\b20)\b{num}\b(?=\s*[,.;:!?a-zA-Z])", f"{{{{{num}}}}}", text, count=1)
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    text = re.sub(r"\s{2,}", " ", text).strip()
    return {
        "title": title,
        "qNums": list(range(26, 36)),
        "passageHtml": text,
        "wordBank": word_bank,
        "blanks": blanks_meta,
    }


def parse_matching_from_q(raw_sec_b_q: str, typo_fixes: list) -> tuple:
    text = sanitize_typos(raw_sec_b_q, typo_fixes)
    m_dir = re.search(r"Answer\s+Sheet\s*2\.", text, flags=re.IGNORECASE)
    body = text[m_dir.end():].strip() if m_dir else text.strip()

    m_pA = re.search(r"(?m)^\s*A\)\s*", body)
    if not m_pA:
        raise ValueError("Could not find Paragraph A in Section B")
    title = join_wrapped_english(body[:m_pA.start()])

    m_q36 = re.search(r"(?m)^\s*36\.\s*", body)
    if not m_q36:
        raise ValueError("Could not find Statement 36 in Section B")

    paras_raw = body[m_pA.start():m_q36.start()].strip()
    stmts_raw = body[m_q36.start():].strip()

    p_matches = list(re.finditer(r"(?m)^\s*([A-P])\)\s*", paras_raw))
    paragraphs = []
    for i, pm in enumerate(p_matches):
        lbl = pm.group(1)
        ps = pm.end()
        pe = p_matches[i + 1].start() if i + 1 < len(p_matches) else len(paras_raw)
        paragraphs.append({"label": lbl, "text": join_wrapped_english(paras_raw[ps:pe])})

    s_matches = list(re.finditer(r"(?m)^\s*(3[6-9]|4[0-5])\.\s*", stmts_raw))
    statements = []
    for i, sm in enumerate(s_matches):
        num = int(sm.group(1))
        ss = sm.end()
        se = s_matches[i + 1].start() if i + 1 < len(s_matches) else len(stmts_raw)
        statements.append({"num": num, "text": join_wrapped_english(stmts_raw[ss:se])})

    return title, paragraphs, statements


def parse_careful_passage_from_q(raw_passage_block: str, q_nums: list, typo_fixes: list) -> tuple:
    text = sanitize_typos(raw_passage_block, typo_fixes)
    m_hdr = re.search(r"Questions\s+\d+\s+(?:to|and)\s+\d+\s+are\s+based\s+on\s+the\s+following\s+passage\.", text, flags=re.IGNORECASE)
    body = text[m_hdr.end():].strip() if m_hdr else text.strip()

    first_q = q_nums[0]
    m_q1 = re.search(rf"(?m)^\s*{first_q}[\.\s]\s*(?=[A-Z])", body)
    if not m_q1:
        raise ValueError(f"Could not find Q{first_q} in Careful Reading")

    paras_raw = body[:m_q1.start()].strip()
    qs_raw = body[m_q1.start():].strip()

    # Clean page headers/numbers from paras_raw before splitting paragraphs
    p_lines = []
    for ln in paras_raw.replace("\r", "").replace("\u2007", " ").split("\n"):
        s = ln.strip()
        if not s or s == "---PAGE---" or re.fullmatch(r"-?\s*\d{1,2}\s*-?", s) or re.match(r"^第\d+页[,，]共\d+页$", s):
            continue
        if re.match(r"^(?:20\d{2}\s*年|大学英语四级考试20\d{2})", s):
            continue
        p_lines.append(s)

    paragraphs = []
    cur = []
    for s in p_lines:
        cur.append(s)
        if re.search(r'[.!?]["”\']?$', s) and len(s) < 92:
            paragraphs.append(join_wrapped_english("\n".join(cur)))
            cur = []
    if cur:
        paragraphs.append(join_wrapped_english("\n".join(cur)))

    q_pat = "|".join(str(n) for n in q_nums)
    q_matches = list(re.finditer(rf"(?m)^\s*({q_pat})(?:\.|\s+(?=[A-Z]))\s*", qs_raw))
    questions = []
    for i, m in enumerate(q_matches):
        num = int(m.group(1))
        qs = m.end()
        qe = q_matches[i + 1].start() if i + 1 < len(q_matches) else len(qs_raw)
        chunk = qs_raw[qs:qe].strip()
        opt_matches = list(re.finditer(r"(?:^|\s)([A-D])\)\s*", chunk))
        stem = join_wrapped_english(chunk[:opt_matches[0].start()])
        opts = {}
        for j, om in enumerate(opt_matches):
            letter = om.group(1)
            o_s = om.end()
            o_e = opt_matches[j + 1].start() if j + 1 < len(opt_matches) else len(chunk)
            opts[letter] = join_wrapped_english(chunk[o_s:o_e])
        questions.append({
            "num": num,
            "stem": stem,
            "options": [f"{k}. {opts[k]}" for k in ("A", "B", "C", "D")],
        })
    return paragraphs, questions


def parse_2023_06_listening_scripts(a_part2: str, q_opts_map: dict, group_titles: list, q_meta: dict) -> dict:
    """
    Parse verbatim listening transcripts directly from `2023年6月第{1,2}套英语四级真题解析.pdf`,
    combining verbatim PDF scripts with verified per-question answers, stems, and concise explanations.
    """
    headers = [
        r"Questions\s+1\s+and\s+2\s+are\s+based",
        r"Questions\s+3\s+and\s+4\s+are\s+based",
        r"Questions\s+5\s+to\s+7\s+are\s+based",
        r"Questions\s+8\s+to\s+11\s+are\s+based",
        r"Questions\s+12\s+to\s+15\s+are\s+based",
        r"Questions\s+16\s+to\s+18\s+are\s+based",
        r"Questions\s+19\s+to\s+21\s+are\s+based",
        r"Questions\s+22\s+to\s+25\s+are\s+based",
    ]
    positions = []
    cur = 0
    for pat in headers:
        m = re.search(pat, a_part2[cur:], flags=re.IGNORECASE)
        if not m:
            raise ValueError(f"Missing 2023.06 listening header: {pat}")
        # End of the header line
        nl = a_part2.find("\n", cur + m.end())
        positions.append((cur + m.start(), nl + 1 if nl != -1 else cur + m.end()))
        cur = positions[-1][1]

    sections_out = [
        {"section": "Section A", "label": "新闻报道 News Reports (Q1-7)", "groups": []},
        {"section": "Section B", "label": "长对话 Long Conversations (Q8-15)", "groups": []},
        {"section": "Section C", "label": "听力篇章 Passages (Q16-25)", "groups": []},
    ]
    for idx, ((sec_idx, gid, label, q_nums), gtitle) in enumerate(zip(LISTENING_GROUPS_SPEC, group_titles)):
        body_start = positions[idx][1]
        body_end = positions[idx + 1][0] if idx + 1 < len(positions) else len(a_part2)
        chunk = a_part2[body_start:body_end]
        ans_pos = chunk.find("答案详解")
        if ans_pos == -1:
            raise ValueError(f"Missing 答案详解 in 2023.06 {gid}")
        raw_script = chunk[:ans_pos].strip()
        if sec_idx == 1:
            turns = build_conversation_turns(raw_script, q_nums)
        else:
            turns = build_monologue_turns(raw_script, q_nums)

        cue = build_preread_cue_from_options(q_nums, q_opts_map, gtitle)
        q_items = []
        for qn in q_nums:
            qm = q_meta[qn]
            ev_turns = [t["text"] for t in turns if qn in (t.get("evidenceFor") or [])]
            ev_quote = " ".join(ev_turns).strip() or (turns[0]["text"] if turns else "")
            q_items.append({
                "num": qn,
                "questionText": qm["stem"],
                "options": q_opts_map[qn],
                "answer": qm["answer"],
                "evidenceQuote": ev_quote,
                "explain": qm["explain"],
            })

        sections_out[sec_idx]["groups"].append({
            "groupId": gid,
            "label": label,
            "title": gtitle,
            "qNums": q_nums,
            "preReadCue": cue,
            "scriptTurns": turns,
            "questions": q_items,
        })
    return {
        "totalQuestions": 25,
        "hasScript": True,
        "sections": sections_out,
    }


def extract_evidence_from_paragraphs(paragraphs: list, needle: str) -> str:
    """Locate the verbatim sentence containing `needle` inside the extracted passage paragraphs."""
    low_n = needle.lower()
    for p in paragraphs:
        if low_n in p.lower():
            for s in split_sentences_for_speech(p):
                if low_n in s.lower():
                    return s
            return p[:240]
    return paragraphs[0][:200] if paragraphs else ""


# ============================================================================
# CURATED STRUCTURED METADATA FOR ALL 6 PAPERS (2026.06 -> 2023.06)
# Every single answer key is cross-checked against the official source PDF/MD!
# ============================================================================

WORD_BANKS = {
    "cet4_2026_06_set1": [
        {"code": "A", "word": "available", "pos": "adj.", "meaning": "可获得的"},
        {"code": "B", "word": "deteriorating", "pos": "v./adj.", "meaning": "恶化的"},
        {"code": "C", "word": "earned", "pos": "v.", "meaning": "赚取；获得"},
        {"code": "D", "word": "effect", "pos": "n.", "meaning": "影响；效果"},
        {"code": "E", "word": "enhance", "pos": "v.", "meaning": "提高；增强"},
        {"code": "F", "word": "exactly", "pos": "adv.", "meaning": "确切地"},
        {"code": "G", "word": "exhausting", "pos": "adj.", "meaning": "耗尽心力的；漫长的"},
        {"code": "H", "word": "experience", "pos": "n./v.", "meaning": "经历；体验"},
        {"code": "I", "word": "increased", "pos": "v.", "meaning": "上升；提高"},
        {"code": "J", "word": "interpret", "pos": "v.", "meaning": "阐释；解读"},
        {"code": "K", "word": "occurred", "pos": "v.", "meaning": "发生"},
        {"code": "L", "word": "peculiar", "pos": "adj.", "meaning": "奇特的"},
        {"code": "M", "word": "probably", "pos": "adv.", "meaning": "大概；或许"},
        {"code": "N", "word": "squeezed", "pos": "v.", "meaning": "榨取；压榨"},
        {"code": "O", "word": "typically", "pos": "adv.", "meaning": "通常；典型地"},
    ],
    "cet4_2026_06_set2": [
        {"code": "A", "word": "addition", "pos": "n.", "meaning": "增加；此外"},
        {"code": "B", "word": "approximately", "pos": "adv.", "meaning": "大约"},
        {"code": "C", "word": "avoid", "pos": "v.", "meaning": "避开；避免"},
        {"code": "D", "word": "consumption", "pos": "n.", "meaning": "消费；摄入量"},
        {"code": "E", "word": "converted", "pos": "v.", "meaning": "转化"},
        {"code": "F", "word": "convince", "pos": "v.", "meaning": "说服；促使"},
        {"code": "G", "word": "heightened", "pos": "adj.", "meaning": "增强的；更高的"},
        {"code": "H", "word": "omission", "pos": "n.", "meaning": "遗漏"},
        {"code": "I", "word": "opposite", "pos": "adj.", "meaning": "相反的"},
        {"code": "J", "word": "perceive", "pos": "v.", "meaning": "感知；察觉"},
        {"code": "K", "word": "prospect", "pos": "n.", "meaning": "前景"},
        {"code": "L", "word": "reinforcement", "pos": "n.", "meaning": "强化；正反馈"},
        {"code": "M", "word": "separately", "pos": "adv.", "meaning": "分别地"},
        {"code": "N", "word": "simply", "pos": "adv.", "meaning": "仅仅；只是"},
        {"code": "O", "word": "targeted", "pos": "v./adj.", "meaning": "定向的；瞄准"},
    ],
    "cet4_2025_12_set1": [
        {"code": "A", "word": "approximately", "pos": "adv.", "meaning": "大约"},
        {"code": "B", "word": "case", "pos": "n.", "meaning": "情形；案例"},
        {"code": "C", "word": "chance", "pos": "n.", "meaning": "机会；可能性"},
        {"code": "D", "word": "confused", "pos": "adj.", "meaning": "困惑的；不知所措的"},
        {"code": "E", "word": "crucial", "pos": "adj.", "meaning": "至关重要的"},
        {"code": "F", "word": "deposited", "pos": "v.", "meaning": "存放；沉淀"},
        {"code": "G", "word": "enter", "pos": "v.", "meaning": "进入；面对"},
        {"code": "H", "word": "invest", "pos": "v.", "meaning": "投入"},
        {"code": "I", "word": "matter", "pos": "v.", "meaning": "要紧；有重大影响"},
        {"code": "J", "word": "presented", "pos": "v.", "meaning": "呈现；面对"},
        {"code": "K", "word": "range", "pos": "n.", "meaning": "范围；一系列"},
        {"code": "L", "word": "regular", "pos": "adj.", "meaning": "常规的"},
        {"code": "M", "word": "seize", "pos": "v.", "meaning": "抓住"},
        {"code": "N", "word": "selection", "pos": "n.", "meaning": "挑选；选择"},
        {"code": "O", "word": "ultimately", "pos": "adv.", "meaning": "最终；归根结底"},
    ],
    "cet4_2024_06_set1": [
        {"code": "A", "word": "constitutes", "pos": "v.", "meaning": "构成"},
        {"code": "B", "word": "contradictory", "pos": "adj.", "meaning": "相互矛盾的"},
        {"code": "C", "word": "decision", "pos": "n.", "meaning": "决定"},
        {"code": "D", "word": "detailed", "pos": "adj.", "meaning": "详细的"},
        {"code": "E", "word": "difference", "pos": "n.", "meaning": "差异；影响"},
        {"code": "F", "word": "dipping", "pos": "v.", "meaning": "浏览；浅尝"},
        {"code": "G", "word": "distinction", "pos": "n.", "meaning": "区分；差别"},
        {"code": "H", "word": "falling", "pos": "v.", "meaning": "落下"},
        {"code": "I", "word": "involves", "pos": "v.", "meaning": "包含；涉及"},
        {"code": "J", "word": "moderate", "pos": "adj.", "meaning": "适度的"},
        {"code": "K", "word": "notified", "pos": "v.", "meaning": "通知"},
        {"code": "L", "word": "partly", "pos": "adv.", "meaning": "部分地"},
        {"code": "M", "word": "required", "pos": "v./adj.", "meaning": "所需的"},
        {"code": "N", "word": "traditionally", "pos": "adv.", "meaning": "传统上"},
        {"code": "O", "word": "vigorous", "pos": "adj.", "meaning": "剧烈的；高强度的"},
    ],
    "cet4_2023_06_set1": [
        {"code": "A", "word": "abstracts", "pos": "n./v.", "meaning": "摘要；提取"},
        {"code": "B", "word": "abundant", "pos": "adj.", "meaning": "充裕的；丰富的"},
        {"code": "C", "word": "awareness", "pos": "n.", "meaning": "意识；认知"},
        {"code": "D", "word": "conscience", "pos": "n.", "meaning": "良心；愧疚"},
        {"code": "E", "word": "exact", "pos": "adj.", "meaning": "确切的；精确的"},
        {"code": "F", "word": "increasingly", "pos": "adv.", "meaning": "日益；越来越多地"},
        {"code": "G", "word": "intense", "pos": "adj.", "meaning": "强烈的"},
        {"code": "H", "word": "mend", "pos": "v.", "meaning": "修补"},
        {"code": "I", "word": "nearly", "pos": "adv.", "meaning": "几乎；将近"},
        {"code": "J", "word": "reckoning", "pos": "n./v.", "meaning": "估算；认为"},
        {"code": "K", "word": "reducing", "pos": "v.", "meaning": "减少；降低"},
        {"code": "L", "word": "sew", "pos": "v.", "meaning": "缝制"},
        {"code": "M", "word": "shrink", "pos": "v.", "meaning": "缩减；萎缩"},
        {"code": "N", "word": "statistics", "pos": "n.", "meaning": "统计数据"},
        {"code": "O", "word": "textile", "pos": "n.", "meaning": "纺织品；纺织业"},
    ],
    "cet4_2023_06_set2": [
        {"code": "A", "word": "affordable", "pos": "adj.", "meaning": "负担得起的；价格合理的"},
        {"code": "B", "word": "ancestor", "pos": "n.", "meaning": "祖先"},
        {"code": "C", "word": "crucial", "pos": "adj.", "meaning": "至关重要的"},
        {"code": "D", "word": "depend", "pos": "v.", "meaning": "依赖；依靠"},
        {"code": "E", "word": "initial", "pos": "adj.", "meaning": "最初的"},
        {"code": "F", "word": "insist", "pos": "v.", "meaning": "坚持"},
        {"code": "G", "word": "just", "pos": "adv.", "meaning": "恰好；究竟"},
        {"code": "H", "word": "located", "pos": "v./adj.", "meaning": "位于；坐落于"},
        {"code": "I", "word": "mostly", "pos": "adv.", "meaning": "主要地"},
        {"code": "J", "word": "operating", "pos": "v.", "meaning": "运转；操作"},
        {"code": "K", "word": "perhaps", "pos": "adv.", "meaning": "或许"},
        {"code": "L", "word": "pioneer", "pos": "n.", "meaning": "先驱；先锋"},
        {"code": "M", "word": "potential", "pos": "n./adj.", "meaning": "潜力；潜在的"},
        {"code": "N", "word": "rising", "pos": "v.", "meaning": "上升；增长"},
        {"code": "O", "word": "scheduled", "pos": "v.", "meaning": "预定；计划"},
    ],
}

WRITING_META = {
    "cet4_2026_06_set1": {
        "title": "校园机器人的未来应用（校报投稿）",
        "logicBlueprint": [
            "第一段（场景落地：能做什么）：用图书馆找书引导与跨楼宇实验物资配送两个校园场景，说明机器人接管重复性工作的实际价值。",
            "第二段（治理与试点：如何落地）：提出先在需求明确处开展小范围试点（small trial），收集路线与无障碍反馈、透明披露数据采集并保留人工窗口。",
            "第三段（条件收束）：指出校园机器人只有在解决具体问题时才最有用，先通过试点验证使用率再决定扩大投入。",
        ],
        "transferablePatterns": [
            "... could make university life easier by taking over routine tasks.",
            "The university should start with a small trial in places where the need is clear.",
            "Students and staff could report problems with ...",
            "The university should also explain what information ... collect and keep a human service desk available.",
            "Campus robots would be most useful if they solved specific problems.",
        ],
        "topicKeywords": ["robots", "campus", "university", "future", "applications", "library", "delivery", "trial", "students", "staff", "service", "routine"],
        "modelTitle": "Future Applications of Robots on Campus",
        "modelEssay": (
            "Robots could make university life easier by taking over routine tasks. For example, a robot in the library "
            "could guide visitors to the right shelves or help staff return books to their places. On a large campus, "
            "delivery robots could carry laboratory supplies between buildings, leaving staff more time for work that "
            "requires their judgment.\n\n"
            "The university should start with a small trial in places where the need is clear. Students and staff could "
            "report problems with routes, waiting times, or accessibility. The university should also explain what "
            "information the robots collect and keep a human service desk available for anyone who needs personal help.\n\n"
            "Campus robots would be most useful if they solved specific problems. A trial would let the university see "
            "which services students actually use before investing in more machines."
        ),
    },
    "cet4_2026_06_set2": {
        "title": "如何让校园生活更便利（学校提案）",
        "logicBlueprint": [
            "第一段（信息整合痛点）：建议在统一页面公布图书馆、校医院与食堂开放时间，减少学生多网站查询与空跑。",
            "第二段（空间与调研验证）：建议考试周延长自习室开放时间，并在永久实行前调研真实需求与各时段使用人数。",
            "第三段（报修闭环与成本意识）：引入可视化报修表单追踪处理人与预计修复时间，无需新建楼宇即可显著提升便利度。",
        ],
        "transferablePatterns": [
            "I propose that the university make its existing campus services easier to use.",
            "To begin with, it could publish ... on a single page so that students would know ...",
            "Before making the change permanent, it should ask students when they actually need ...",
            "Finally, a simple ... would help students ... without requiring ...",
            "These changes would make daily life more convenient without requiring new buildings.",
        ],
        "topicKeywords": ["proposal", "campus", "life", "easier", "convenient", "university", "services", "library", "study", "schedule", "students", "improve"],
        "modelTitle": "Making Campus Life More Convenient",
        "modelEssay": (
            "I propose that the university make its existing campus services easier to use. To begin with, it could "
            "publish the opening hours of libraries, clinics, and dining halls on a single page. Students would then "
            "know where to go without checking several websites or making unnecessary trips.\n\n"
            "The university could also extend the opening hours of one study room during exam weeks. Before making the "
            "change permanent, it should ask students when they actually need a quiet place to study and record how "
            "many people use the room at different times.\n\n"
            "Finally, a simple reporting form would help students notify staff about broken lights or other problems. "
            "If each report showed who was handling it and when a repair was expected, students would spend less time "
            "following up. These changes would make daily life more convenient without requiring new buildings."
        ),
    },
    "cet4_2025_12_set1": {
        "title": "学生会如何更好丰富校园生活（建议回应）",
        "logicBlueprint": [
            "第一段（总原则破题）：回应学生会征集意见，提出“多元化、学生主导”的改进方向，聚焦解决真实需求而非堆砌活动。",
            "第二段（三类具体举措）：提出跨专业兴趣微社群（tailored communities）、校友/行业导师针对性指导（targeted guidance）与实用技能工作坊，并说明对应收益。",
            "第三段（反馈机制收尾）：建议建立公开投票与活动复盘机制，让校园文化更具活力与包容性。",
        ],
        "transferablePatterns": [
            "I propose that the Student Union should adopt a more diverse and student-centered approach.",
            "By shifting some focus from general activities to tailored communities, ...",
            "Inviting alumni and professionals to offer targeted guidance would help students ...",
            "In addition, organizing hands-on workshops on ... can directly meet students' practical needs.",
            "With regular feedback and active participation, campus life will become far more vibrant.",
        ],
        "topicKeywords": ["student", "union", "enrich", "campus", "life", "activities", "communities", "workshops", "guidance", "suggestions", "improve", "diverse"],
        "modelTitle": "Enriching Student Life: A Proposal for the Coming Year",
        "modelEssay": (
            "I welcome the Student Union's effort to collect opinions for the coming year. To better enrich student "
            "life, I propose that the union adopt a more diverse and student-centered approach that responds directly "
            "to students' practical needs.\n\n"
            "First, by shifting some focus from large general events to tailored interest communities—such as reading "
            "circles, outdoor hiking clubs, and coding study groups—students from different majors can easily find "
            "like-minded peers. Second, the union could invite alumni and industry mentors to offer targeted guidance "
            "on career planning and academic growth. In addition, hosting hands-on workshops on public speaking, time "
            "management, or mental well-being would equip students with useful skills beyond the classroom.\n\n"
            "Finally, gathering quick feedback through an online poll after each event would help the union refine "
            "future programs. With these practical improvements, campus life will become both more engaging and more "
            "meaningful for everyone."
        ),
    },
    "cet4_2024_06_set1": {
        "title": "大学图书馆是否应向公众开放（观点议论文）",
        "logicBlueprint": [
            "第一段（立场鲜明 + 双重理由）：表明大学图书馆应优先保障校内师生使用，阐述公共开放会挤压安静自习空间并带来盗窃、秩序与安全隐患。",
            "第二段（让步转折 + 替代方案）：用 While promoting literacy is admirable... 肯定全民阅读价值，随即用 Instead 提出与地方图书馆合作或举办公开阅读活动等更优替代路径。",
            "第三段（重申结论）：重申守护校园学习环境与安全，同时通过替代方式服务社区阅读需求。",
        ],
        "transferablePatterns": [
            "... are dedicated learning spaces, tailored to meet the academic needs of ...",
            "Opening them to the public risks compromising this exclusive environment.",
            "While promoting ... is admirable, it should not come at the cost of ...",
            "Instead, universities can explore alternative ways to engage with the community, such as ...",
            "In conclusion, ... should remain ... while alternative methods are explored to ...",
        ],
        "topicKeywords": ["university", "libraries", "open", "public", "students", "learning", "environment", "safety", "resources", "community", "reading", "access"],
        "modelTitle": "Should University Libraries Be Open to the Public?",
        "modelEssay": (
            "University libraries are dedicated learning spaces, tailored to meet the academic needs of students. "
            "Opening them to the public risks compromising this exclusive environment, potentially limiting students' "
            "access to resources and quiet study areas. Moreover, public access introduces security concerns, such as "
            "the potential for theft, vandalism, or disturbance, which could create an unsafe atmosphere for students.\n\n"
            "While promoting literacy is admirable, it should not come at the cost of students' learning opportunities "
            "or safety. Instead, universities can explore alternative ways to engage with the community, such as "
            "collaborating with local libraries to improve their services or organizing reading events that are open "
            "to the public. These initiatives can foster a culture of reading without compromising the integrity and "
            "safety of university libraries.\n\n"
            "In conclusion, university libraries should remain exclusive to students to protect their learning "
            "environment and safety, while alternative methods are explored to meet the reading needs of the wider "
            "community."
        ),
    },
    "cet4_2023_06_set1": {
        "title": "高校在线课程的利弊与改进建议（调查回应）",
        "logicBlueprint": [
            "第一段（回应调查）：由学校开展在线课程意见调查自然切入，表明网课利弊并存。",
            "第二段（正反分述）：先用 Among all the plus sides... / Second / Furthermore 列举灵活性、名师资源与回放复习三大优势；再用 Despite 转折，用 On the one hand... On the other hand... 剖析师生互动不足与自律难维持两大短板。",
            "第三段（双向建议）：分别从教师（增加互动协作）与学生（提升自主学习能力）两方给出具体改进建议。",
        ],
        "transferablePatterns": [
            "Recently, our university is conducting a survey about ... As far as I am concerned, ... have both advantages and disadvantages.",
            "Among all the plus sides of ..., ... comes first.",
            "Despite these advantages, the shortcomings of ... should not be ignored.",
            "On the one hand, ... is hard to achieve. On the other hand, ... demand qualities such as ...",
            "To improve the effectiveness of ..., teachers ought to ... Besides, students should ...",
        ],
        "topicKeywords": ["online", "classes", "courses", "advantages", "disadvantages", "improvements", "flexibility", "interaction", "self-discipline", "teachers", "students", "learning"],
        "modelTitle": "On Online Courses",
        "modelEssay": (
            "Recently, our university is conducting a survey about students' opinions on online courses. As far as I am "
            "concerned, online courses have both advantages and disadvantages.\n\n"
            "Among all the plus sides of online courses, flexibility comes first: students can learn anytime and "
            "anywhere. Second, through online courses, students have access to high-quality courses offered by renowned "
            "teachers at home and abroad. Furthermore, students can watch replays and review difficult points "
            "repeatedly. Despite these advantages, the shortcomings of online courses should not be ignored. On the one "
            "hand, a high level of interaction between students and teachers is hard to achieve. On the other hand, "
            "online classes demand qualities such as self-discipline and motivation, while many students have "
            "difficulty staying focused without teachers' supervision.\n\n"
            "To improve the effectiveness of online courses, teachers ought to offer more opportunities for interaction "
            "and collaboration. Besides, students should improve their self-learning abilities and make good use of "
            "online resources."
        ),
    },
    "cet4_2023_06_set2": {
        "title": "维系友善同学关系的方法与益处（在线讨论）",
        "logicBlueprint": [
            "第一段（点明意义 + 设问过渡）：指出建立并维系良好人际关系对终身发展至关重要，并用问句引出校园维系友善关系的原则。",
            "第二段（三条核心方法）：用 First of all / Besides / Last but not least 分别阐述换位思考（show empathy）、诚实守信（be honest and trustworthy）和耐心倾听与恰当表达。",
            "第三段（总结益处 + 呼应呼吁）：指出和谐关系有助于缓解压力、拓宽人脉并增强团队精神，值得投入时间与精力用心经营。",
        ],
        "transferablePatterns": [
            "Establishing and maintaining good interpersonal relationships is crucial for our lifelong success.",
            "First of all, show empathy and put ourselves in others' shoes when facing conflicts.",
            "Besides, be honest and trustworthy, since it is not only a valuable quality, but also ...",
            "Last but not least, listen patiently and express properly to achieve effective communication.",
            "Nurturing harmonious relationships is conducive to reducing stress, expanding networks, and enhancing team spirit.",
        ],
        "topicKeywords": ["interpersonal", "relationships", "classmates", "warm", "friendly", "maintain", "benefits", "empathy", "honest", "communication", "harmonious", "campus"],
        "modelTitle": "On Interpersonal Relationships",
        "modelEssay": (
            "Establishing and maintaining good interpersonal relationships is crucial for our lifelong success. Then, "
            "how can we build warm and friendly relationships with our classmates on campus?\n\n"
            "The following principles might be of great significance. First of all, show empathy. In the face of "
            "challenges or conflicts in interpersonal interaction, we need to put ourselves in others' shoes and get "
            "along with classmates with an inclusive and considerate mind. Besides, be honest and trustworthy, since it "
            "is not only a valuable quality, but also a key factor that unites people. Last but not least, listen "
            "patiently and express ourselves properly. Without either, it is quite difficult to achieve effective "
            "communication with each other.\n\n"
            "Nurturing harmonious interpersonal relationships is conducive to reducing stress, expanding our social "
            "network, and enhancing team spirit. Therefore, it is well worth investing time and effort in cultivating "
            "and maintaining friendly relationships on campus."
        ),
    },
}

TRANSLATION_META = {
    "cet4_2026_06_set1": {
        "title": "尊师重教与教师节",
        "keyExpressions": [
            {"zh": "中国有句老话", "en": ["an old Chinese saying", "as an old Chinese saying goes", "old saying in China"], "weight": 1.1},
            {"zh": "一日为师，终身为父", "en": ["teacher, even for a single day, to a father for life", "teacher for a day is a father for a lifetime", "teacher for a day"], "weight": 1.2},
            {"zh": "传授知识", "en": ["pass on knowledge", "impart knowledge", "teach knowledge"], "weight": 1.2},
            {"zh": "做人的道理", "en": ["how to conduct themselves", "how to be a good person", "principles of life"], "weight": 1.1},
            {"zh": "举行隆重的仪式", "en": ["held a formal ceremony", "hold a grand ceremony"], "weight": 1.1},
            {"zh": "弘扬尊师的优良传统", "en": ["preserve the tradition of honoring teachers", "promote the fine tradition of respecting teachers"], "weight": 1.2},
            {"zh": "教师节", "en": ["Teachers' Day"], "weight": 1.0},
            {"zh": "中华民族的传统美德", "en": ["traditional Chinese virtue", "traditional virtue of the Chinese nation"], "weight": 1.1},
        ],
        "referenceTranslation": (
            "An old Chinese saying compares a teacher, even for a single day, to a father for life. In Chinese culture, "
            "teachers pass on knowledge and teach students how to conduct themselves. In ancient times, students held a "
            "formal ceremony when they first met their teacher, reflecting the high regard in which teachers were held. "
            "To preserve the tradition of honoring teachers, China has observed Teachers' Day on September 10 each year "
            "since 1985. On that day, students show their respect in different ways. Respect for teachers is a traditional "
            "Chinese virtue that continues to be promoted and practiced today."
        ),
        "sentenceBreakdown": [
            {"zh": "中国有句老话：“一日为师，终身为父”。", "core": "An old Chinese saying compares a teacher for a day to a father for life", "modifier": "用 compares ... to ... 意译俗语", "en": "An old Chinese saying compares a teacher, even for a single day, to a father for life."},
            {"zh": "在中国人的观念里，老师不仅传授知识，更教给学生做人的道理。", "core": "teachers pass on knowledge and teach students how to conduct themselves", "modifier": "In Chinese culture 作状语", "en": "In Chinese culture, teachers pass on knowledge and teach students how to conduct themselves."},
            {"zh": "在古代，学生初次见老师时要举行隆重的仪式，足见老师地位之高。", "core": "students held a formal ceremony when they first met their teacher", "modifier": "现在分词结果状语 reflecting the high regard...", "en": "In ancient times, students held a formal ceremony when they first met their teacher, reflecting the high regard in which teachers were held."},
            {"zh": "为弘扬尊师的优良传统，中国从1985年开始将每年的9月10日定为教师节。", "core": "China has observed Teachers' Day on September 10 each year since 1985", "modifier": "目的状语 To preserve the tradition of honoring teachers", "en": "To preserve the tradition of honoring teachers, China has observed Teachers' Day on September 10 each year since 1985."},
            {"zh": "在这一天，学生以各种方式表达对老师的敬意。尊师是中华民族的传统美德，在当今社会得到了发扬光大。", "core": "students show their respect; respect for teachers is a traditional Chinese virtue", "modifier": "定语从句 that continues to be promoted and practiced today", "en": "On that day, students show their respect in different ways. Respect for teachers is a traditional Chinese virtue that continues to be promoted and practiced today."},
        ],
    },
    "cet4_2026_06_set2": {
        "title": "中华传统餐桌礼仪",
        "keyExpressions": [
            {"zh": "餐桌礼仪", "en": ["dining etiquette", "table manners"], "weight": 1.1},
            {"zh": "中华传统文化的重要组成部分", "en": ["important part of traditional Chinese culture", "vital part of Chinese traditional culture"], "weight": 1.2},
            {"zh": "热情有礼的待客之道", "en": ["warmth and courtesy shown to guests", "hospitality and courtesy"], "weight": 1.1},
            {"zh": "根据客人的口味和喜好", "en": ["to suit the guests' tastes", "according to guests' tastes and preferences"], "weight": 1.1},
            {"zh": "座位的安排非常讲究", "en": ["seating is arranged with particular care", "seating arrangement is very particular"], "weight": 1.2},
            {"zh": "正对大门 / 最重要的客人", "en": ["facing the door", "guest of honor", "most important guest"], "weight": 1.1},
            {"zh": "添酒加菜", "en": ["refills the guests' wine glasses and serves them more food", "serves more food and wine"], "weight": 1.1},
            {"zh": "促进和谐的人际交往", "en": ["fostering harmonious relationships", "promoting harmonious interpersonal relationships"], "weight": 1.1},
        ],
        "referenceTranslation": (
            "Dining etiquette is an important part of traditional Chinese culture and reflects the warmth and courtesy "
            "shown to guests. A host prepares a generous selection of carefully made dishes to suit the guests' tastes. "
            "Seating is arranged with particular care: the host sits facing the door, and the guest of honor sits beside "
            "the host. During the meal, the host occasionally refills the guests' wine glasses and serves them more food. "
            "These customs have survived for thousands of years and have played an important role in fostering harmonious "
            "relationships."
        ),
        "sentenceBreakdown": [
            {"zh": "餐桌礼仪是中华传统文化的重要组成部分，蕴含着热情有礼的待客之道。", "core": "Dining etiquette is an important part of traditional Chinese culture and reflects warmth and courtesy", "modifier": "过去分词后置定语 shown to guests", "en": "Dining etiquette is an important part of traditional Chinese culture and reflects the warmth and courtesy shown to guests."},
            {"zh": "为了招待客人，主人会根据客人的口味和喜好准备丰富精致的菜肴。", "core": "A host prepares a generous selection of carefully made dishes", "modifier": "不定式目的状语 to suit the guests' tastes", "en": "A host prepares a generous selection of carefully made dishes to suit the guests' tastes."},
            {"zh": "就餐座位的安排非常讲究，主人坐在正对大门的位置，在主人身边就座的是最重要的客人。", "core": "Seating is arranged with particular care", "modifier": "冒号引出具体座位规则（the guest of honor）", "en": "Seating is arranged with particular care: the host sits facing the door, and the guest of honor sits beside the host."},
            {"zh": "进餐时，主人会不时地为客人添酒加菜。", "core": "the host occasionally refills wine glasses and serves more food", "modifier": "时间状语 During the meal", "en": "During the meal, the host occasionally refills the guests' wine glasses and serves them more food."},
            {"zh": "这种独特的餐桌礼仪已延续了数千年，对促进和谐的人际交往起到了重要作用。", "core": "These customs have survived for thousands of years and have played an important role", "modifier": "现在完成时 + in fostering harmonious relationships", "en": "These customs have survived for thousands of years and have played an important role in fostering harmonious relationships."},
        ],
    },
    "cet4_2025_12_set1": {
        "title": "中国民营经济高质量发展",
        "keyExpressions": [
            {"zh": "高度重视民营经济的发展", "en": ["attached great importance to the development of the private economy", "attaches great importance to private economy"], "weight": 1.2},
            {"zh": "出台了一系列政策", "en": ["introduced a series of policies", "issued a series of policies", "rolled out policies"], "weight": 1.1},
            {"zh": "占企业总量的92.3%", "en": ["accounting for 92.3% of all enterprises", "making up 92.3% of the total"], "weight": 1.2},
            {"zh": "稳步增长", "en": ["grown steadily", "steady growth"], "weight": 1.0},
            {"zh": "质量和结构不断提升", "en": ["quality and structure have continuously improved", "improving in quality and structure"], "weight": 1.1},
            {"zh": "研发投入不断增加", "en": ["investment in research and development has kept increasing", "R&D investment has been growing"], "weight": 1.2},
            {"zh": "新一代信息技术、人工智能", "en": ["next-generation information technology and artificial intelligence", "new-generation IT and AI"], "weight": 1.1},
            {"zh": "为中国经济高质量发展提供有力支撑", "en": ["strong support for the high-quality development of China's economy", "high-quality economic development"], "weight": 1.1},
        ],
        "referenceTranslation": (
            "In recent years, the Chinese government has attached great importance to the development of the private "
            "economy and introduced a series of policies to support private enterprises. By the end of March 2025, "
            "the number of private enterprises nationwide had exceeded 57 million, accounting for 92.3% of all "
            "enterprises. Private enterprises have not only grown steadily in number, but also continuously improved "
            "in quality and structure. Their investment in research and development has kept increasing, leading to "
            "rapid progress in fields such as next-generation information technology and artificial intelligence. "
            "The enhanced core competitiveness of private enterprises has provided strong support for the high-quality "
            "development of China's economy."
        ),
        "sentenceBreakdown": [
            {"zh": "近年来，中国政府高度重视民营经济的发展，出台了一系列政策支持民营企业。", "core": "the Chinese government has attached great importance to... and introduced a series of policies", "modifier": "In recent years（现在完成时）+ to support private enterprises", "en": "In recent years, the Chinese government has attached great importance to the development of the private economy and introduced a series of policies to support private enterprises."},
            {"zh": "截至2025年3月底，全国民营企业数量超过5700万家，占企业总量的92.3%。", "core": "the number of private enterprises had exceeded 57 million", "modifier": "By the end of March 2025 + 现在分词 accounting for 92.3%", "en": "By the end of March 2025, the number of private enterprises nationwide had exceeded 57 million, accounting for 92.3% of all enterprises."},
            {"zh": "民营企业不仅数量稳步增长，质量和结构也在不断提升。", "core": "Private enterprises have not only grown steadily in number, but also improved in quality and structure", "modifier": "not only ... but also ... 并列结构", "en": "Private enterprises have not only grown steadily in number, but also continuously improved in quality and structure."},
            {"zh": "民营企业的研发投入不断增加，在新一代信息技术、人工智能等领域发展迅速。", "core": "Their investment in R&D has kept increasing", "modifier": "结果状语 leading to rapid progress in fields such as...", "en": "Their investment in research and development has kept increasing, leading to rapid progress in fields such as next-generation information technology and artificial intelligence."},
            {"zh": "民营企业核心竞争力的增强为中国经济的高质量发展提供了有力支撑。", "core": "The enhanced core competitiveness has provided strong support", "modifier": "for the high-quality development of China's economy", "en": "The enhanced core competitiveness of private enterprises has provided strong support for the high-quality development of China's economy."},
        ],
    },
    "cet4_2024_06_set1": {
        "title": "中国传统住宅——四合院",
        "keyExpressions": [
            {"zh": "传统的住宅建筑", "en": ["traditional Chinese residential building", "traditional residential architecture"], "weight": 1.2},
            {"zh": "其特点是", "en": ["characterized by", "featured by"], "weight": 1.1},
            {"zh": "将院子合围在中间", "en": ["enclosing the courtyard in the middle", "surrounding a central courtyard"], "weight": 1.2},
            {"zh": "冬暖夏凉", "en": ["warm in winter and cool in summer"], "weight": 1.2},
            {"zh": "适合大家庭居住", "en": ["suitable for large families to live in", "ideal for big families"], "weight": 1.0},
            {"zh": "以北京的四合院最为典型", "en": ["most typical one is in Beijing", "Beijing's Siheyuan is the most typical"], "weight": 1.1},
            {"zh": "随着现代城市的发展", "en": ["with the development of modern cities", "with modern urban development"], "weight": 1.0},
            {"zh": "对中国文化传承和历史研究具有重要意义", "en": ["great significance to the inheritance of Chinese culture and the study of Chinese history", "significance to Chinese cultural heritage"], "weight": 1.2},
        ],
        "referenceTranslation": (
            "Siheyuan is a kind of traditional Chinese residential building, which is characterized by houses built "
            "around a courtyard, enclosing the courtyard in the middle. Siheyuan is usually warm in winter and cool "
            "in summer, offering a comfortable environment, especially suitable for large families to live in. There "
            "are many types of Siheyuan in different parts of China, of which the most typical one is in Beijing. "
            "Nowadays, with the development of modern cities, the number of traditional Siheyuan has gradually "
            "decreased, but because of its unique architectural style, Siheyuan is of great significance to the "
            "inheritance of Chinese culture and the study of Chinese history."
        ),
        "sentenceBreakdown": [
            {"zh": "四合院是中国一种传统的住宅建筑，其特点是房屋建造在一个院子的四周，将院子合围在中间。", "core": "Siheyuan is a traditional Chinese residential building", "modifier": "非限制性定语从句 which is characterized by... + enclosing...", "en": "Siheyuan is a kind of traditional Chinese residential building, which is characterized by houses built around a courtyard, enclosing the courtyard in the middle."},
            {"zh": "四合院通常冬暖夏凉，环境舒适，尤其适合大家庭居住。", "core": "Siheyuan is usually warm in winter and cool in summer", "modifier": "现在分词伴随状语 offering a comfortable environment", "en": "Siheyuan is usually warm in winter and cool in summer, offering a comfortable environment, especially suitable for large families to live in."},
            {"zh": "四合院在中国各地有多种类型，其中以北京的四合院最为典型。", "core": "There are many types of Siheyuan in different parts of China", "modifier": "介词+关系代词定语从句 of which the most typical one is in Beijing", "en": "There are many types of Siheyuan in different parts of China, of which the most typical one is in Beijing."},
            {"zh": "如今，随着现代城市的发展，传统的四合院已逐渐减少，但因其独特的建筑风格，四合院对中国文化的传承和中国历史的研究具有重要意义。", "core": "the number of traditional Siheyuan has gradually decreased, but Siheyuan is of great significance", "modifier": "be of great significance to + 文化传承与历史研究", "en": "Nowadays, with the development of modern cities, the number of traditional Siheyuan has gradually decreased, but because of its unique architectural style, Siheyuan is of great significance to the inheritance of Chinese culture and the study of Chinese history."},
        ],
    },
    "cet4_2023_06_set1": {
        "title": "中国终身教育与继续教育发展",
        "keyExpressions": [
            {"zh": "越来越重视终身教育", "en": ["attaches more and more importance to lifelong education", "increasing importance to lifelong education"], "weight": 1.2},
            {"zh": "构建终身教育体系的有效途径", "en": ["effective way to build a lifelong education system", "lifelong education system"], "weight": 1.2},
            {"zh": "人才培养的基地", "en": ["base for talent cultivation", "cradle for cultivating talents"], "weight": 1.1},
            {"zh": "先进的教学理念和优越的教学资源", "en": ["advanced teaching concepts and superior teaching resources", "teaching concepts and resources"], "weight": 1.1},
            {"zh": "继续教育的办学主体", "en": ["main providers of continuing education", "major providers of continuing education"], "weight": 1.1},
            {"zh": "适应社会需求 / 加强与用人单位沟通", "en": ["catering to social needs", "strengthening communication with employers", "meeting social needs"], "weight": 1.1},
            {"zh": "符合中国国情的发展新路", "en": ["new path for developing continuing education that suits China's specific conditions", "suits China's national conditions"], "weight": 1.1},
            {"zh": "在国家发展战略中发挥更大作用", "en": ["play a greater role in the national development strategy", "national development strategy"], "weight": 1.1},
        ],
        "referenceTranslation": (
            "China attaches more and more importance to lifelong education, and the development of continuing "
            "education is an effective way to build a lifelong education system. As the base for talent cultivation, "
            "universities have advanced teaching concepts and superior teaching resources, so they should become "
            "the main providers of continuing education. Therefore, in recent years, a number of universities have "
            "been trying to explore a new path for developing continuing education that suits China's specific "
            "conditions by catering to social needs and strengthening communication with employers, so that "
            "continuing education can play a greater role in the national development strategy."
        ),
        "sentenceBreakdown": [
            {"zh": "中国越来越重视终身教育，发展继续教育是构建终身教育体系的有效途径。", "core": "China attaches increasing importance to lifelong education, and developing continuing education is an effective way", "modifier": "并列句 and 连接 + to build a lifelong education system", "en": "China attaches more and more importance to lifelong education, and the development of continuing education is an effective way to build a lifelong education system."},
            {"zh": "高校作为人才培养的基地，拥有先进的教学理念和优越的教学资源，理应成为继续教育的办学主体。", "core": "universities have advanced teaching concepts and superior resources, so they should become the main providers", "modifier": "As the base for talent cultivation 置于句首", "en": "As the base for talent cultivation, universities have advanced teaching concepts and superior teaching resources, so they should become the main providers of continuing education."},
            {"zh": "因此，近年来许多高校适应社会需求，加强与用人单位沟通，努力探索一条符合中国国情的继续教育发展新路，以使继续教育在国家发展战略中发挥更大的作用。", "core": "many universities have been trying to explore a new path for developing continuing education", "modifier": "by 方式状语 + that 定语从句 + so that 目的状语从句", "en": "Therefore, in recent years, a number of universities have been trying to explore a new path for developing continuing education that suits China's specific conditions by catering to social needs and strengthening communication with employers, so that continuing education can play a greater role in the national development strategy."},
        ],
    },
    "cet4_2023_06_set2": {
        "title": "改革开放以来中国高等教育发展",
        "keyExpressions": [
            {"zh": "改革开放40多年以来", "en": ["more than 40 years since the reform and opening up", "over 40 years since reform and opening-up"], "weight": 1.2},
            {"zh": "进入稳步发展阶段", "en": ["entered a stage of steady development", "stage of steady development"], "weight": 1.1},
            {"zh": "高校学生总数接近4700万人", "en": ["total number of university students has reached nearly 47 million", "nearly 47 million"], "weight": 1.2},
            {"zh": "位居世界第一", "en": ["ranking first in the world", "top in the world", "first in the world"], "weight": 1.1},
            {"zh": "随着我国经济的快速发展", "en": ["with the rapid development of China's economy", "with rapid economic development"], "weight": 1.1},
            {"zh": "渴望接受高等教育", "en": ["eager to receive higher education", "desire to receive higher education"], "weight": 1.1},
            {"zh": "高校数量和学科专业持续增加", "en": ["number of universities and disciplines", "continually increasing", "on the increase"], "weight": 1.1},
            {"zh": "招生人数逐年上升 / 教学质量不断改进", "en": ["enrollments is rising year by year", "teaching quality is improving", "opportunities for more young people"], "weight": 1.1},
        ],
        "referenceTranslation": (
            "For more than 40 years since the reform and opening-up policy was adopted, the Chinese government has "
            "attached more and more importance to higher education, which has entered a stage of steady development. "
            "The total number of university students has reached nearly 47 million, ranking first in the world. With "
            "the rapid development of China's economy and the continuous improvement of Chinese people's living "
            "standards, an increasing number of people are eager to receive higher education. The number of "
            "universities and disciplines in China has been on the increase, annual enrollment is rising year by "
            "year, and teaching quality is continuously improving, creating opportunities for more young people to "
            "receive higher education."
        ),
        "sentenceBreakdown": [
            {"zh": "改革开放40多年以来，中国政府对高等教育越来越重视，高等教育已经进入稳步发展阶段。", "core": "the Chinese government has attached more and more importance to higher education", "modifier": "现在完成时 + which 非限制性定语从句", "en": "For more than 40 years since the reform and opening-up policy was adopted, the Chinese government has attached more and more importance to higher education, which has entered a stage of steady development."},
            {"zh": "高校学生总数已接近4,700万人，位居世界第一。", "core": "The total number of university students has reached nearly 47 million", "modifier": "现在分词伴随状语 ranking first in the world", "en": "The total number of university students has reached nearly 47 million, ranking first in the world."},
            {"zh": "随着我国经济的快速发展，人民生活水平不断提高，越来越多的人渴望接受高等教育。", "core": "an increasing number of people are eager to receive higher education", "modifier": "With 复合名词短语作背景状语", "en": "With the rapid development of China's economy and the continuous improvement of Chinese people's living standards, an increasing number of people are eager to receive higher education."},
            {"zh": "我国高校的数量和学科专业持续增加，招生人数逐年上升，教学质量也在不断改进，为更多年轻人创造了接受高等教育的机会。", "core": "The number of universities has increased, enrollment is rising, and teaching quality is improving", "modifier": "现在分词结果状语 creating opportunities for more young people...", "en": "The number of universities and disciplines in China has been on the increase, annual enrollment is rising year by year, and teaching quality is continuously improving, creating opportunities for more young people to receive higher education."},
        ],
    },
}

# Verified structured explanations for every Reading item (Cloze 26-35, Matching 36-45, Careful 46-55)
# and for 2023.06 Set 1 & Set 2 Listening Q1-25 (cross-checked directly against official PDFs/MD)
READING_DATA = {
    "cet4_2026_06_set1": {
        "clozeTitle": "工业革命与工人阶级生活水平争议",
        "carefulTitles": ["有机食品真的值得更高价格吗", "人类利他与自私行为的基因与环境成因"],
        "cloze": [
            {"num": 26, "answer": "N", "posHint": "v.(过去式)", "explain": "主语 the capitalists 后缺少过去式及物动词，与 from 搭配构成 squeeze ... from（从……榨取），选 N) squeezed。"},
            {"num": 27, "answer": "A", "posHint": "adj.", "explain": "with + 名词 + 形容词短语作伴随状语，与介词 to 搭配构成 available to（可供……获取的），选 A) available。"},
            {"num": 28, "answer": "I", "posHint": "v.(过去式)", "explain": "宾语从句缺谓语动词，结合后句 this improvement（这一改善）可知生活水平整体提高了，选 I) increased。"},
            {"num": 29, "answer": "K", "posHint": "v.(过去式)", "explain": "when 引导的从句缺少不及物动词过去式，表示“这种改善何时发生”，选 K) occurred。"},
            {"num": 30, "answer": "F", "posHint": "adv.", "explain": "动词 define 后需副词修饰，表示“确切界定生活水平的含义”，选 F) exactly。"},
            {"num": 31, "answer": "O", "posHint": "adv.", "explain": "主语 historians 与谓语 use 之间缺频率副词，表示历史学家“通常”采用实际收入衡量，选 O) typically。"},
            {"num": 32, "answer": "C", "posHint": "v.(过去分词)", "explain": "与 and then adjusted 并列作后置定语修饰 money，指“赚取并根据生活成本调整后的货币”，选 C) earned。"},
            {"num": 33, "answer": "G", "posHint": "adj.", "explain": "介词 After 后修饰名词 debate and analysis，表示经过“漫长而耗尽心力的”争论分析，选 G) exhausting。"},
            {"num": 34, "answer": "J", "posHint": "v.(原形)", "explain": "decide to 后接动词原形，意为“阐释工业革命如何受其他事件影响”，选 J) interpret。"},
            {"num": 35, "answer": "D", "posHint": "n.(单数)", "explain": "an overall positive 后接单数名词，have a positive effect 表示“产生积极影响”，选 D) effect。"},
        ],
        "matching": {
            36: ("C", ["daughter", "flight", "Claris Airport"], "定位 C 段：put our three-year-old daughter instantly to sleep until we bumped down on the grass at Claris Airport，与题干“最后一段航程中一路熟睡”一致。"),
            37: ("I", ["lodge", "delicious food", "Mount St Paul's Estate"], "定位 I 段：a luxurious lodge... dinner... was every bit as mouth-watering，mouth-watering 对应 very delicious food。"),
            38: ("E", ["fishing sites", "fantastic fishing spots"], "定位 E 段：Lots of people come here for the fantastic fishing spots around the island，同义转述 incredible fishing sites。"),
            39: ("L", ["well-known artist", "purchase a house", "Paul McCartney"], "定位 L 段：turned down famous musician Paul McCartney's application to buy a property，turned down 对应 failed to purchase。"),
            40: ("A", ["unable to fall asleep", "night sky", "jetlag"], "定位 A 段：Wide awake at 3:30 am... stared for hours at the most incredible night sky I've ever seen。"),
            41: ("F", ["compared to another island", "artists", "1970s"], "定位 F 段：like what Waiheke Island was in the 1970s when it was a commune of artists and people wanting to escape the city。"),
            42: ("J", ["one-hour walk", "centre", "hot springs"], "定位 J 段：Another highlight was an hour-long walk to Kaitoke hot pools in the centre of the island。"),
            43: ("B", ["officially recognized", "starry nights", "Dark Sky Sanctuary"], "定位 B 段：recently awarded Dark Sky Sanctuary status... exceptional or distinguished quality of starry nights。"),
            44: ("D", ["public power supply", "solar and wind energy"], "定位 D 段：no public facilities and the 950 people living there rely on solar and wind energy, and bottled gas。"),
            45: ("G", ["strange", "light pollution", "northern side", "Fiji"], "定位 G 段：It's odd... found there was more light pollution on the northern side coming from Fiji, about 3,000 km away。"),
        },
        "careful": {
            46: ("D", "wallet can only stretch", "片面概括 / 偷换概念", "定位首段第2-4句：一方面想给家人最好的食物，另一方面钱包预算有限，这就是经典超市两难困境，故选 D。"),
            47: ("A", "clear-cut answer", "细节篡改 / 过度推断", "定位第3段首句：科学不会就有机食品是否“更好”给出明确答案（remains uncertain），故选 A。C 项错在原文明确说二者同等营养。"),
            48: ("D", "food-safety perspective", "偷换概念 / 无中生有", "定位第5段第2句：从食品安全角度看有机与非有机产品无重大差异（no substantial difference），故选 D。"),
            49: ("C", "smaller environmental footprint", "与原文相反 / 张冠李戴", "定位第7段首句：总体而言有机农业环境足迹可能更小（impact the environment less），故选 C。"),
            50: ("B", "significantly improved", "偷换条件 / 无中生有", "定位末段：支持者认为若投入同等科研与资金，有机农业产量与效率可显著提升（improve remarkably），故选 B。"),
            51: ("A", "short-lived", "曲解原意 / 忽略转折", "定位第3段：研究发现自私更具优势，但这种好处可能是短暂的（in the short term），故选 A。"),
            52: ("B", "overwhelming evidence for genetic", "偷换对象 / 望文生义", "定位第4段第3句：对比同卵与异卵双胞胎发现了基因对行为影响的压倒性证据，故选 B。"),
            53: ("C", "identified a gene linked to altruistic", "偷换主宾 / 范围偏移", "定位第5段第2句：团队识别出一个与利他行为相关的特定基因，故选 C。"),
            54: ("A", "evolved first among relatives", "因果倒置 / 绝对化", "定位第6段首句：合作行为最早可能演化于有血缘关系的亲属之间（individuals linked by blood），故选 A。"),
            55: ("D", "Culture, schooling and parenting", "与原文相反 / 绝对化", "定位末段：文化、学校教育与家庭养育都是合作行为的重要决定因素，推知合作行为可后天培养（may be cultivated），故选 D。"),
        },
    },
    "cet4_2026_06_set2": {
        "clozeTitle": "对咖啡苦味更敏感的人反而喝得更多",
        "carefulTitles": ["心理学“冒充者综合征”的实证研究", "音乐：跨越文化的全球共通语言"],
        "cloze": [
            {"num": 26, "answer": "N", "posHint": "adv.", "explain": "isn't 后修饰表语短语 a matter of taste，与后文 but rather 呼应构成“不仅仅是……而是……”，选 N) simply。"},
            {"num": 27, "answer": "I", "posHint": "adj.", "explain": "修饰 results，前句说人们原本预期敏感者喝得少，而研究却得出“相反的”结果，选 I) opposite。"},
            {"num": 28, "answer": "L", "posHint": "n.", "explain": "learned positive 后接名词，指咖啡因带来的习得性正向“强化/正反馈”，选 L) reinforcement。"},
            {"num": 29, "answer": "G", "posHint": "adj.", "explain": "修饰名词 ability，指对咖啡苦味具有“增强的/更高的”品尝能力，选 G) heightened。"},
            {"num": 30, "answer": "F", "posHint": "v.(原形)", "explain": "不定式 to 后接动词原形，固定搭配 convince sb. to do sth.（促使/说服人们吐出有害物质），选 F) convince。"},
            {"num": 31, "answer": "D", "posHint": "n.", "explain": "所有格 people's 与介词 of 之间需名词，指人们对茶、咖啡和酒的“摄入/消费”，选 D) consumption。"},
            {"num": 32, "answer": "J", "posHint": "v.(原形)", "explain": "主语 we 后缺及物动词原形，意为“我们感知抱子甘蓝、奎宁与咖啡因的苦味”，选 J) perceive。"},
            {"num": 33, "answer": "M", "posHint": "adv.", "explain": "句尾缺方式副词修饰 perceive，表示“分别地”感知不同苦味，选 M) separately。"},
            {"num": 34, "answer": "A", "posHint": "n.", "explain": "介词 In 后构成固定过渡短语 In addition（此外），选 A) addition。"},
            {"num": 35, "answer": "C", "posHint": "v.(原形)", "explain": "tended to 后接动词原形，对奎宁和绿叶菜苦味更敏感者倾向于“避开”咖啡，选 C) avoid。"},
        ],
        "matching": {
            36: ("F", ["worsen", "passage of time"], "定位 F 段：Dementia typically gets worse over time，与题干“随时间推移而恶化”直接同义。"),
            37: ("L", ["Knopman", "healthy lifestyle", "heavy exercise"], "定位 L 段：The message isn't that everyone needs to run marathons in middle age, Knopman said, but a healthy lifestyle pays off。"),
            38: ("A", ["encourage", "middle-aged women", "exercising"], "定位 A 段：If this doesn't encourage you to squeeze in a workout today... women who were highly fit in mid-life were nearly 90% less likely to get dementia。"),
            39: ("H", ["postpone or prevent", "mid-life"], "定位 H 段：gives us hope that dementia can be prevented or delayed through exercise in one's middle age，delayed 对应 postpone。"),
            40: ("O", ["clearer advice", "lifestyle changes", "few years"], "定位 O 段：In the next three to five years, these studies should allow researchers to provide clearer recommendations for exercise and other lifestyle modifications。"),
            41: ("E", ["loss of multiple mental abilities", "logical reasoning"], "定位 E 段：Dementia... describes a loss of thinking ability, memory, attention, logical reasoning, and other mental abilities。"),
            42: ("K", ["supplied with blood", "vascular"], "定位 K 段：Knopman said it's likely that exercise maintains good blood flow to the brain。"),
            43: ("M", ["Medical literature", "aerobic exercise"], "定位 M 段：The literature has not yet settled on an amount or type of exercise... although the bulk of literature has suggested that aerobic exercise is what you need。"),
            44: ("C", ["common knowledge", "correlates with reduced risk"], "定位 C 段：it's long been known there's a correlation between exercise and decreased dementia risk。"),
            45: ("I", ["prevention of Alzheimer's", "heart disease"], "定位 I 段：the same activities that help prevent Alzheimer's... also prevent heart disease。"),
        },
        "careful": {
            46: ("B", "due to external circumstances or just luck", "偷换宾语 / 曲解原意", "定位首段第2句：患冒充者综合征的人把成功归因于外部环境或运气（good fortune），故选 B。"),
            47: ("C", "protect a person from acting impulsively", "无中生有 / 偷换概念", "定位第2段第2句：适度反思与自我怀疑能防止人冲动行事（refrain from acting on impulse），故选 C。"),
            48: ("D", "devalue their objectively measured performance", "偷换对象 / 与原文相反", "定位第4段第2句：研究证实有此倾向者会贬低自己客观测得的表现（mark down 对应 devalue），故选 D。"),
            49: ("B", "accompanied by the fear", "片面概括 / 无中生有", "定位末段首句：长期低估自身能力常伴随对“骗局”曝光并付出代价的恐惧（fearful of potential consequences），故选 B。"),
            50: ("A", "higher vulnerability to depression", "偷换程度 / 与原文相反", "定位末段末句：虽然冒充者综合征不是精神疾病，但患者更容易陷入抑郁（more liable to have depression），故选 A。"),
            51: ("B", "bring people together in peace", "绝对化 / 偷换概念", "定位首段第3句：音乐在全球至关重要，有潜力将世界各地人们团结起来（unite people），故选 B。"),
            52: ("D", "create extraordinary results", "偷换概念 / 无中生有", "定位首段第4-6句：不同文化音乐家合作能创造非凡效果（fantastic results 对应 extraordinary results），故选 D。"),
            53: ("A", "found in music everywhere", "偷换范围 / 无中生有", "定位第2段：五声音阶遍布全球各地音乐（美洲原住民、非洲、亚洲及蓝调爵士摇滚），故选 A。"),
            54: ("C", "essentially serves to express", "以偏概全 / 偷换概念", "定位末段第3句：音乐最根本的作用是表达或改变情感（essentially serves to express or change emotions），故选 C。"),
            55: ("D", "used music in the very same way", "偷换概念 / 偏离定位", "定位末段倒数第3句：无论你以何种方式使用音乐，其他文化几乎都以完全相同的方式使用它（the way it is made use of），故选 D。"),
        },
    },
    "cet4_2025_12_set1": {
        "clozeTitle": "“选择悖论”：选项越多为何越难决定",
        "carefulTitles": ["服药时机与人体 24 小时昼夜节律", "美国 70 岁以上群体推迟退休的动因"],
        "cloze": [
            {"num": 26, "answer": "C", "posHint": "n.", "explain": "maximize their ___ of making the best decision 意为“最大化做出最佳决定的可能性/机会”，选 C) chance。"},
            {"num": 27, "answer": "N", "posHint": "n.", "explain": "不定冠词 a 后接名词，make a selection from all of these choices 意为“从诸多选项中做出挑选”，选 N) selection。"},
            {"num": 28, "answer": "D", "posHint": "adj.", "explain": "系动词 become 后接形容词作表语，选项过多时人们会变得“困惑/不知所措”从而逃避决定，选 D) confused。"},
            {"num": 29, "answer": "H", "posHint": "v.(原形)", "explain": "固定搭配 invest more in the decision（在决策上投入更多精力），选 H) invest。"},
            {"num": 30, "answer": "J", "posHint": "v.(过去分词)", "explain": "固定被动搭配 be presented with more choices（面对更多选择），选 J) presented。"},
            {"num": 31, "answer": "E", "posHint": "adj.", "explain": "feel more 后接形容词作表语，选项越多，做出正确决定显得越发“至关重要”也越困难，选 E) crucial。"},
            {"num": 32, "answer": "I", "posHint": "v.(原形)", "explain": "助动词 will not 后接不及物动词原形，意为“很多日常决定（如午餐吃什么）未来并不会有多大影响”，选 I) matter。"},
            {"num": 33, "answer": "O", "posHint": "adv.", "explain": "情态动词 can 与 be changed 之间填副词，意为“即便重要选择最终也是可以改变的”，选 O) ultimately。"},
            {"num": 34, "answer": "G", "posHint": "v.(原形)", "explain": "help to 后接动词原形，enter these situations with clear guidelines 意为“带着清晰准则进入这些决策情境”，选 G) enter。"},
            {"num": 35, "answer": "K", "posHint": "n.", "explain": "固定搭配 the range of options（一系列选项），选 K) range。"},
        ],
        "matching": {
            36: ("E", ["increasing amount of data", "business revenues"], "定位 E 段：There's a rising amount of data showing that installing bike lanes... boosts the economic fortunes of a place。"),
            37: ("K", ["magazine writer", "cultural factors"], "定位 K 段：For others, the pushback is cultural, says Henry Grabar, a writer for the Slate Magazine。"),
            38: ("C", ["Skillman Ave", "sales", "new businesses"], "定位 C 段：businesses on Skillman saw sales rise by 12 percent... that section of road saw new businesses open。"),
            39: ("O", ["crises", "embrace changes"], "定位 O 段：Crises, after all, have a way of opening people's eyes to possibilities... shop owners didn't see any way around it。"),
            40: ("G", ["survey", "23 cities", "negatively impact"], "定位 G 段：a survey of research from 23 cities found that bike lanes and pedestrian-friendly design didn't hurt local retail and food stores。"),
            41: ("D", ["store owners insisted", "destroying"], "定位 D 段：Many still insisted the lanes were killing their part of the city，killing 对应 destroying。"),
            42: ("L", ["war of culture", "data", "changing minds"], "定位 L 段：If we've learned anything about culture wars, it's that data isn't much good at changing minds。"),
            43: ("J", ["businesswoman", "business dropped", "by car"], "定位 J 段：hairdresser Cindy Hughes said business fell by at least 40 percent... 90 percent of my customers drive。"),
            44: ("A", ["Skillman Ave", "ruined", "parking spots"], "定位 A 段：Taking out those parking spots, as they argued... would ruin stores and restaurants along Skillman。"),
            45: ("H", ["pleasant to wander", "cycling and walking"], "定位 H 段：streets redesigned for bikes and pedestrians tend to become more pleasant places to hang around。"),
        },
        "careful": {
            46: ("A", "timing of behaviors", "过度推断 / 偷换概念", "定位首段第3句：运动或进食等行为的时机可显著影响健康（considerable impact 对应 significantly influence），故选 A。"),
            47: ("C", "react differently to the medicine", "因果倒置 / 偷换主语", "定位第2段第2句：药物靶点蛋白在 24 小时周期内对药物的反应会发生变化，故选 C。"),
            48: ("A", "rarely consider the best time", "无中生有 / 细节偷换", "定位第3段首句：医生开处方时很少考虑达到最佳疗效的服药时间（rarely consider 对应 give little thought），故选 A。"),
            49: ("B", "primarily to ensure compliance", "形近词干扰 / 曲解原意", "定位第3段末句：嘱咐早晚服药主要为了确保遵医嘱服药（ensure compliance，注意避开 A 项 complaints 形近干扰！），故选 B。"),
            50: ("C", "More research is needed to determine", "片面概括 / 偷换细节", "定位末段首句：作者呼吁开展更多研究以确定不同疾病的最佳给药时机，故选 C。"),
            51: ("A", "for a different reason", "张冠李戴 / 无中生有", "定位首段：经济学教授继续工作是出于喜爱，理发师则是出于经济需要，二人动机不同，故选 A。"),
            52: ("C", "slow rise in real wages", "偷换概念 / 曲解原文", "定位第3段首句：实际工资（即购买力维度）多年增长缓慢是延迟退休原因之一，故选 C。"),
            53: ("D", "bachelor's degrees", "偷换指标 / 无中生有", "定位第5段：本科学历 70 岁仍在岗近 20%，高中及以下仅约 10%，说明受教育程度越高越可能延迟退休，故选 D。"),
            54: ("B", "more for social benefits", "与原文相反 / 无中生有", "定位第6段第2句：经济学家指出大学学历者继续工作更多出于社交联结（staying connected socially）而非金钱，故选 B。"),
            55: ("D", "more likely to look forward to retiring", "过度推断 / 偷换感情色彩", "定位末段：体力劳动者更可能期待退休（anticipate retirement 对应 look forward to retiring），故选 D。"),
        },
    },
    "cet4_2024_06_set1": {
        "clozeTitle": "有氧与无氧运动强度如何影响情绪健康",
        "carefulTitles": ["摆脱“讨好型人格”与自我认同", "终生学习如何让衰老的大脑保持活力"],
        "cloze": [
            {"num": 26, "answer": "D", "posHint": "adj.", "explain": "修饰 evidence-backed guidelines，指各国已有“详细的”循证运动指南，选 D) detailed。"},
            {"num": 27, "answer": "M", "posHint": "v.(过去分词)", "explain": "过去分词短语作后置定语修饰 exercise，表示“获得健康益处所需的运动类型与强度”，选 M) required。"},
            {"num": 28, "answer": "L", "posHint": "adv.", "explain": "系动词 is 与 due to 之间缺副词，意为“这部分归因于缺乏必要证据”，选 L) partly。"},
            {"num": 29, "answer": "F", "posHint": "v.(动名词)", "explain": "Before 后接动名词，dip into 为固定短语，意为“在浏览/深入几条核心结论之前”，选 F) dipping。"},
            {"num": 30, "answer": "G", "posHint": "n.", "explain": "固定搭配 make a distinction between A and B（在有氧与无氧运动间做出重要区分），选 G) distinction。"},
            {"num": 31, "answer": "I", "posHint": "v.(三单)", "explain": "主语 The former（有氧运动）为单数，谓语动词表示“包含步行、慢跑和骑行等”，选 I) involves。"},
            {"num": 32, "answer": "O", "posHint": "adj.", "explain": "修饰 intensity，由后文身体来不及动用氧气供能可知无氧运动具有如此“剧烈的/高强度的”特点，选 O) vigorous。"},
            {"num": 33, "answer": "B", "posHint": "adj.", "explain": "后句说有的研究支持高强度、有的支持低强度、有的认为无差异，说明研究结果“相互矛盾”，选 B) contradictory。"},
            {"num": 34, "answer": "E", "posHint": "n.", "explain": "固定搭配 make no difference to（对情绪益处没有影响），选 E) difference。"},
            {"num": 35, "answer": "J", "posHint": "adj.", "explain": "后文解释低强度太枯燥、高强度太难受，故改善情绪的最佳无氧运动强度是“适度”强度，选 J) moderate。"},
        ],
        "matching": {
            36: ("E", ["socializing at the workplace", "personal relationships"], "定位 E 段：people may place more value on the socializing that happens at work... consider colleagues as friends。"),
            37: ("H", ["average hourly pay", "decreased", "keep their living standards"], "定位 H 段：average hourly wage for ordinary workers had fallen 5 percent... had to keep working just as much in order to maintain their standard of living。"),
            38: ("B", ["average weekly working time", "half a century"], "定位 B 段：stayed at just below 40 hours for nearly five decades，five decades 对应 half a century。"),
            39: ("F", ["Friedman", "inequality", "reduced working hours"], "定位 F 段：American inequality means that the gains of increasing productivity are not widely shared... most Americans are too poor to work less。"),
            40: ("D", ["thirst for material things", "leisure time"], "定位 D 段：Perhaps people just never feel materially satisfied... This is a theory that appeals to many economists。"),
            41: ("A", ["economist's prediction", "20th century", "correct for a time"], "定位 A 段：For a while, it looked like Keynes was right. In 1930... 47 hours... by 1970... fallen to slightly less than 39。"),
            42: ("I", ["less schooling and fewer skills", "low-paid"], "定位 I 段：millions of people—those with fewer skills and less education—are seeking whatever poorly paid work they can get。"),
            43: ("C", ["Keynes was right", "technology", "more productive"], "定位 C 段：But Keynes got that right: Technology has made the economy massively more productive。"),
            44: ("J", ["highest earners", "love for what they are doing"], "定位 J 段：for many top earners, work is a labor of love. They are doing work they care about and are interested in。"),
            45: ("G", ["Keynes", "standard of living continuing to rise"], "定位 G 段：Keynes's prediction of a shorter working week rests on the idea that the standard of living would continue rising for everyone。"),
        },
        "careful": {
            46: ("C", "always be their prisoner", "字面误解 / 曲解原意", "定位首段老子名言：太在意他人看法就会沦为他人囚徒，即永远无法获得真正的自由，故选 C。"),
            47: ("B", "unproductive and an exhausting", "与原文相反 / 偷换概念", "定位第2段首句：通过他人认可寻求自我价值既无成效又令人精疲力竭（unfruitful 对应 unproductive），故选 B。"),
            48: ("D", "terrified of abandonment", "片面细节 / 偏离因果", "定位第4段末句：渴望他人认可源于内心深处那个仍害怕被抛弃的孩童心理（early childhood fear of being deserted），故选 D。"),
            49: ("A", "happier in your life", "与原文相反 / 偷换细节", "定位第5段首句：当你越能给自己提供认可时，你会更强大、更自信、生活更快乐，故选 A。"),
            50: ("D", "love yourself", "曲解句意 / 张冠李戴", "定位末段末句：作者劝诫读者接纳那句老话——爱真实的自己（love ourselves as we are），故选 D。"),
            51: ("B", "slide into forgetfulness", "与原文相反 / 偷换主体", "定位首段首句：有人认为变老更多是滑向健忘（memory gradually deteriorates），故选 B。"),
            52: ("C", "brains may change every time a person learns", "过度推断 / 偷换概念", "定位第2段：脑科学家发现每当学习新事物大脑都会建立新联结并自我更新，故选 C。"),
            53: ("D", "taking a different route", "与原文相反 / 曲解例证", "定位第4-5段：积累新体验，甚至换条路去超市等以新方式处理日常事务都能保持大脑健康，故选 D。"),
            54: ("A", "Openness", "偷换条件 / 无中生有", "定位第6段：以好奇心与求知欲为特征的开放性（curiosity and a desire for knowledge）有助于提升脑功能，故选 A。"),
            55: ("C", "enhance that desire for novel experiences", "张冠李戴 / 偷换结果", "定位末段倒数第2句：2012 年研究发现推理任务可增强对新体验的渴望，从而反过来令大脑焕然一新，故选 C。"),
        },
    },
    "cet4_2023_06_set1": {
        "clozeTitle": "一件棉质 T 恤背后的 2700 升水消耗",
        "carefulTitles": ["美国豪宅风潮背后的公共空间危机与伦理困境", "适度野心与过度野心的双刃剑效应"],
        "cloze": [
            {"num": 26, "answer": "L", "posHint": "v.(原形)", "explain": "与 and 前的 create 并列需动词原形，意为“制作布料并将其缝制成衬衫形状”，选 L) sew。"},
            {"num": 27, "answer": "B", "posHint": "adj.", "explain": "最高级 the most 后修饰 clothing material，指棉花是最“充裕/常见的”服装原料，选 B) abundant。"},
            {"num": 28, "answer": "E", "posHint": "adj.", "explain": "固定插入语 to be exact（确切地说，每件衬衫耗水 2,700 升），选 E) exact。"},
            {"num": 29, "answer": "N", "posHint": "n.", "explain": "形容词 mind-blowing 后接名词，承接前文数字 2,700，指更多令人震惊的“统计数据”，选 N) statistics。"},
            {"num": 30, "answer": "F", "posHint": "adv.", "explain": "位于 is 与 becoming 之间需副词，意为净水正“日益”成为紧缺资源，选 F) increasingly。"},
            {"num": 31, "answer": "O", "posHint": "n.", "explain": "与 and cotton 并列修饰 industries，指“纺织”与棉花工业，选 O) textile。"},
            {"num": 32, "answer": "C", "posHint": "n.", "explain": "动词 spread 后接名词宾语，spread awareness of 意为“传播对……的环保意识”，选 C) awareness。"},
            {"num": 33, "answer": "I", "posHint": "adv.", "explain": "介词 by 与数字 40 percent 之间填副词，表示用水量可减少“将近”40%，选 I) nearly。"},
            {"num": 34, "answer": "K", "posHint": "v.(动名词)", "explain": "介词 from 后接及物动词动名词，意为仅通过“减少”棉花生产需求就能省水数百万升，选 K) reducing。"},
            {"num": 35, "answer": "M", "posHint": "v.(原形)", "explain": "as 引导的从句主语 water supplies（复数）缺谓语动词，意为随着水资源供应“缩减”，选 M) shrink。"},
        ],
        "matching": {
            36: ("F", ["inexpensive and easy to use", "Francis Dittoh"], "定位 F 段倒数第2句：The service was designed to be cheap and easy to run, says Mr Dittoh。"),
            37: ("K", ["doctors", "taking care of patients"], "定位 K 段末两句：Doctors completing online forms... by speech... spend less time on administration and more time with patients。"),
            38: ("H", ["convert voice into text", "different pronunciations"], "定位 H 段末句：turning your voice into text is one of the hardest problems... as many ways to pronounce things as there are people。"),
            39: ("D", ["African farmers", "unable to read", "crucial information"], "定位 D 段第2-3句：illiterate African farmers. They are often denied crucial information the web offers。"),
            40: ("J", ["voice assistants", "send ads directly"], "定位 J 段末句：They worry assistants will one day be used to deliver advertising directly to us。"),
            41: ("M", ["hands are occupied", "doing other things"], "定位 M 段首句：Using voice also makes sense when you're doing other things with your hands。"),
            42: ("C", ["online interaction", "depend mainly on voice"], "定位 C 段首句：Some think voice could soon take over from typing and clicking as the main way to interact online。"),
            43: ("G", ["Setting up a spoken web", "not easy"], "定位 G 段第2句：building the spoken web isn't straightforward，isn't straightforward 对应 by no means an easy task。"),
            44: ("E", ["Weather information", "vital for farmers"], "定位 E 段末句：knowing when it's going to rain is vital for farmers wanting to sow seeds, irrigate crops...。"),
            45: ("J", ["concerned about privacy", "collecting data"], "定位 J 段第4-5句：collecting data about us all the time. This has already raised privacy concerns。"),
        },
        "careful": {
            46: ("B", "reward for hard work and diligence", "偷换概念 / 曲解原意", "定位首段第3句：大房子被宣传为辛勤工作与勤奋的奖赏（industriousness 对应 hard work and diligence），故选 B。"),
            47: ("A", "reduced quality of life for many", "以偏概全 / 范围扩大", "定位第3段第4句：公共空间私有化导致公共设施减少，许多美国人的生活质量随之下降，故选 A。"),
            48: ("A", "poses ethical questions", "无中生有 / 偷换概念", "定位第4段首句：大房子趋势引发道德伦理问题（moral principles 对应 ethical），故选 A。"),
            49: ("D", "increase in amenities purchased by the affluent", "无中生有 / 细节篡改", "定位第4段末句与第5段首句：作者反对“富人便利设施增加以穷人设施减少为代价”的社会制度，故选 D。"),
            50: ("C", "create more publicly accessible spaces", "偷换目标 / 无中生有", "定位末段末句：作者主张为所有人创造更多公共空间与便利设施，故选 C。"),
            51: ("B", "higher-than-average ambition", "过度推断 / 无中生有", "定位首段首句：多数创业者都比普通人更有野心，故选 B。"),
            52: ("A", "this isn't always the case", "上下文衔接 / 偷换方向", "定位第2段末句与第3段首句：上句说有抱负更易成功，紧接着反驳“并非总是如此”，即有野心未必成功率更高，故选 A。"),
            53: ("B", "adapt to new circumstances", "与原文相反 / 细节混淆", "定位第4段第2句：适应新环境的能力对成为成功企业家至关重要，故选 B。"),
            54: ("C", "impossible to recover from", "张冠李戴 / 偷换主体", "定位第5段末句：对最有野心的创业者而言，失败被视为灾难性且无法恢复（即职业生涯终结），故选 C。"),
            55: ("D", "what else could possibly matter", "无中生有 / 偏离主旨", "定位第7段末句：作者反问“若失去健康与幸福，其他又有什么意义”，意在提醒健康与幸福高于物质成功，故选 D。"),
        },
    },
    "cet4_2023_06_set2": {
        "clozeTitle": "摩洛哥努奥大型太阳能电站与新能源转型",
        "carefulTitles": ["美国超市的诞生革命与消费心理学", "美国为何应考虑推行全年制学校教育"],
        "cloze": [
            {"num": 26, "answer": "H", "posHint": "v.(过去分词)", "explain": "固定短语 be located in（位于瓦尔扎扎特市），选 H) located。"},
            {"num": 27, "answer": "O", "posHint": "v.(过去分词)", "explain": "固定搭配 be scheduled to do sth.（预计/计划不久后完工），选 O) scheduled。"},
            {"num": 28, "answer": "I", "posHint": "adv.", "explain": "修饰动词短语 comes from imports，意为摩洛哥当前能源“主要”来自进口，选 I) mostly。"},
            {"num": 29, "answer": "N", "posHint": "v.(现在分词)", "explain": "with + 宾语 + 现在分词作伴随状语，指能源需求以每年 7% 的速度“增长”，选 N) rising。"},
            {"num": 30, "answer": "C", "posHint": "adj.", "explain": "修饰 part，指新太阳能电站将是实现能源目标的“关键”部分，选 C) crucial。"},
            {"num": 31, "answer": "L", "posHint": "n.", "explain": "a big 后接名词，与下句 forerunner 同义呼应，意为阿拉伯与非洲太阳能领域的“先驱”，选 L) pioneer。"},
            {"num": 32, "answer": "D", "posHint": "v.(原形)", "explain": "that 引导定语从句修饰复数 countries，固定搭配 depend on（依赖国外能源进口），选 D) depend。"},
            {"num": 33, "answer": "M", "posHint": "n.", "explain": "形容词 huge 后接名词，指中东和北非开发太阳能项目具备巨大“潜力”，选 M) potential。"},
            {"num": 34, "answer": "A", "posHint": "adj.", "explain": "系动词 become more 后接形容词，指太阳能技术变得更加“价格合理/负担得起”，选 A) affordable。"},
            {"num": 35, "answer": "G", "posHint": "adv.", "explain": "修饰 how competitive 起强调作用，意为意识到太阳能技术“究竟/确实”多具竞争力，选 G) just。"},
        ],
        "matching": {
            36: ("G", ["digital technology", "accessible to its fans"], "定位 G 段：Increased digital access for fans... make the fans connect to the live experience as much as possible。"),
            37: ("L", ["ceremony", "Monaco race", "impressed"], "定位 L 段：attending Formula One's Monaco race last year and being overwhelmed by the ceremony leading up to the event。"),
            38: ("D", ["goals", "appealing to Americans"], "定位 D 段：Among the goals... increasing interest in the United States。"),
            39: ("A", ["motorbike parts dealer", "forty years"], "定位 A 段：For the past four decades... Bernie Ecclestone, a former motorcycle parts dealer。"),
            40: ("M", ["audience", "share his feeling"], "定位 M 段：You can't help but be awed... I think that feeling can be translated to the viewer。"),
            41: ("J", ["top advisor", "broadcasting company"], "定位 J 段：At Fox Broadcasting Company, he was a top advisor for years。"),
            42: ("F", ["connections easier", "audience", "racers"], "定位 F 段：so that connections between the audience and people within the series are easier to make。"),
            43: ("C", ["new leader", "not super interested"], "定位 C 段：Chase Carey... by his own admission is not a fierce racing fan—was named to replace Ecclestone。"),
            44: ("H", ["opinions differ", "promoted in the U.S."], "定位 H 段：Is there room for Formula One in the ever-crowded sports landscape of the United States? Opinions vary。"),
            45: ("K", ["speed", "danger", "more than any other"], "定位 K 段：It's about speed, danger and risk. And Formula One has that more than any other racing series。"),
        },
        "careful": {
            46: ("B", "thinnest-margined businesses", "过度推断 / 偷换概念", "定位首段：超市利润微薄、不受待见且遭受电商冲击，即一直在流失顾客与利润，故选 B。"),
            47: ("B", "first came about in America", "张冠李戴 / 偷换概念", "定位第2段第2句：自助式杂货店的革命性理念最早起源于美国（originated in the United States），故选 B。"),
            48: ("D", "revolution in distribution", "范围扩大 / 无中生有", "定位第3段第3-4句：超市效仿福特工厂效率与标准化，掀起了一场商品分销革命（revolutionized the distribution），故选 D。"),
            49: ("C", "tempted along the way", "曲解意图 / 偷换细节", "定位第4段：把牛奶鸡蛋等日需品放在最里侧，让顾客走过尽量多货架并在途中受诱惑产生非计划消费，故选 C。"),
            50: ("A", "corporate black magic on our appetite", "字面误解 / 偷换对象", "定位末段：人们长期担心超市利用精明营销套路操控购物欲望，故选 A。"),
            51: ("A", "needed for farm work", "无中生有 / 偷换因果", "定位首段首句：美国农业社会时期夏季需要学生回家帮忙干农活，故选 A。"),
            52: ("D", "experience a closer relationship", "张冠李戴 / 偏离题干", "定位第3段第2句：除学术外，全年制学校能拉近师生关系（strengthen their relationship with teachers），故选 D。"),
            53: ("D", "vital to healthy development", "偷换目的 / 无中生有", "定位第4段第2句：部分儿童发展专家认为放假对孩子健康成长至关重要，故选 D。"),
            54: ("A", "hardly benefits them", "过度推断 / 细节篡改", "定位第4段第3-4句：反驳观点指出大多数孩子暑假宅家看电视玩游戏，几乎没有益处（does little good），故选 A。"),
            55: ("C", "changed from a farming economy", "观点态度 / 无中生有", "定位末段：美国已从农业经济转型为知识创新型经济，理应改革旧校历，可见作者认为传统学年制已过时（outdated），故选 C。"),
        },
    },
}

# Verified 2023.06 Set 1 & Set 2 Listening Questions (stems + answers + concise Chinese explanations)
LISTENING_QA_2023_06 = {
    "cet4_2023_06_set1": {
        "titles": [
            "喂野鸟惹来鼠患触犯城市法规",
            "NASA 招募火星模拟栖息地志愿者",
            "日本市长咬奥运金牌引发争议",
            "电子屏幕蓝光与年轻人睡眠健康",
            "别再用“长大想干嘛”框住孩子梦想",
            "面向非洲农村市场的 20 美元功能机",
            "再生塑料成本反超原生化石塑料",
            "曼哈顿付费午睡驿站与专注力",
        ],
        "qs": {
            1: {"stem": "What do we learn from the report about the 55-year-old woman?", "answer": "D", "explain": "新闻导语首句指出一名 55 岁女士被指控违反罗德岛市禁止喂养野生动物的法规，故选 D。"},
            2: {"stem": "What did the director of the city administration say at the end of the news report?", "answer": "A", "explain": "新闻结尾市政局长称在女士家附近看到 20 多只老鼠，控制鼠患需要数月时间（take time），故选 A。"},
            3: {"stem": "What does NASA require the paid volunteers to do?", "answer": "B", "explain": "新闻指出有偿志愿者将在休斯敦的模拟舱中于类似火星的环境下工作生活一年，故选 B。"},
            4: {"stem": "What will the participants in the project eat?", "answer": "A", "explain": "新闻明确说明食物全部是即食太空食品（ready-to-eat space food 对应 ready-made food），故选 A。"},
            5: {"stem": "What does the news report say about the Japanese mayor Takashi Kawamura?", "answer": "C", "explain": "新闻开头指出日本名古屋市长河村隆之在公开活动上咬了一名垒球运动员的奥运金牌并为此道歉，故选 C。"},
            6: {"stem": "What did mayor Takashi Kawamura offer to do?", "answer": "D", "explain": "新闻提到市长表示愿意支付新金牌的费用（pay for the cost of a new one），故选 D。"},
            7: {"stem": "What did some Olympians say they would do with their medals?", "answer": "C", "explain": "新闻末尾多位奥运选手表示他们将奖牌视为珍宝（treat their medals as treasures），故选 C。"},
            8: {"stem": "What did the woman do to her computer?", "answer": "A", "explain": "对话开头女士说明自己在电脑和手机屏幕上贴了一层防蓝光橙色塑料膜，故选 A。"},
            9: {"stem": "What does the woman say about blue light?", "answer": "B", "explain": "女士解释蓝光既包含自然光，也包含来自电脑、手机和电视等电子设备的非自然光（unnatural light），故选 B。"},
            10: {"stem": "Why does the man say he hasn't slept enough for months?", "answer": "D", "explain": "男士提到自己好几个月睡眠不足是因为工作太多（too much work 对应 excessive work），故选 D。"},
            11: {"stem": "What has the woman learned from the research she has read?", "answer": "B", "explain": "女士指出研究显示睡眠比人们想象的更重要，睡眠不足会诱发肥胖与心脏病，故选 B。"},
            12: {"stem": "What question were both speakers fed up with when they were kids?", "answer": "A", "explain": "男女双方都厌烦小时候大人反复追问“长大后想做什么职业”，故选 A。"},
            13: {"stem": "What occupation do adults see as both sensible and ambitious according to the woman?", "answer": "C", "explain": "女士提到女儿常答的三个答案中，大人最喜欢“机械工程师”，认为它既务实又有抱负，故选 C。"},
            14: {"stem": "What kind of goal-setting does the woman like to see in children?", "answer": "C", "explain": "女士欣赏女儿小时候想当“云之女王”这种源于无边想象力（boundless imaginations）的目标，故选 C。"},
            15: {"stem": "What does the woman suggest adults should do?", "answer": "B", "explain": "对话末尾女士建议大人应帮助孩子认识真实的自己（understand who they are），故选 B。"},
            16: {"stem": "What are a number of phone companies trying to do in Africa?", "answer": "D", "explain": "短文指出部分手机厂商正尝试向非洲市场推广支持上网的入门智能手机，故选 D。"},
            17: {"stem": "How do KaiOS smartphones differ from smartphones of most other companies?", "answer": "A", "explain": "短文对比指出 KaiOS 削减成本并延长续航，精准契合非洲用户缺电和预算有限的实际需求，故选 A。"},
            18: {"stem": "What are KaiOS smartphones equipped with?", "answer": "B", "explain": "短文末尾指出 KaiOS 手机摒弃触摸屏，配备传统实体按键键盘（old-school keypad），故选 B。"},
            19: {"stem": "What is said about using recycled plastic to make plastic products in the past?", "answer": "C", "explain": "短文首句对比指出过去使用再生塑料比化石燃料原生塑料更便宜，故选 C。"},
            20: {"stem": "What has led to more competitive price for new plastic?", "answer": "D", "explain": "短文中段解释原生塑料降价得益于美国石油化工生产的蓬勃增长，故选 D。"},
            21: {"stem": "What does the UK government plan to do about plastic?", "answer": "D", "explain": "短文末尾说明英国政府拟对再生塑料比例不足 30% 的企业征税并扩大再生塑料供应，以推动循环利用，故选 D。"},
            22: {"stem": "What do we learn about the Dreamery, a business in Manhattan?", "answer": "B", "explain": "短文开头介绍曼哈顿的 Dreamery 并非酒店，而是按 45 分钟 25 美元出租安静午睡舱的休憩驿站，故选 B。"},
            23: {"stem": "Why does the speaker ask us to look at the world around us at 2:30 in the afternoon?", "answer": "C", "explain": "讲话者指出下午两点半看看周围疲惫的上班族就足以说明午睡显而易见的重要性，故选 C。"},
            24: {"stem": "What do we learn about the quantity and quality of the speaker's work?", "answer": "B", "explain": "讲话者提到自己工作的质与量直接取决于专注力（ability to concentrate），故选 B。"},
            25: {"stem": "What does the speaker say he finds odd?", "answer": "A", "explain": "短文最后讲话者表示，有些老板把午睡等同于懒惰，他觉得非常奇怪，故选 A。"},
        },
    },
    "cet4_2023_06_set2": {
        "titles": [
            "马桶惊现四英尺无毒蛇咬伤男子",
            "穿礼服倒垃圾走红社交媒体的主妇",
            "弗兰克餐厅的“爱心免费餐告示板”",
            "依恋风格如何解释朋友突然断联",
            "日本传统织布工艺打造的高级牛仔裤",
            "超级英雄电影为何让人百看不厌",
            "领导者用讲故事建立联结与信任",
            "美国移民创业率与低负债优势",
        ],
        "qs": {
            1: {"stem": "What do we learn from the police report?", "answer": "A", "explain": "新闻开头指出警方报告一名男子周日早晨掀开马桶座圈时被一条 4 英尺无毒蛇咬伤，故选 A。"},
            2: {"stem": "What does the report say was still unclear?", "answer": "D", "explain": "新闻明确指出尚不清楚这条蛇的主人是谁（unclear who the owner was），故选 D。"},
            3: {"stem": "What has Andrea Belcher been doing since last April?", "answer": "A", "explain": "新闻报道安德里亚受影星启发，自去年 4 月起每周穿着华丽礼服倒垃圾并分享到社交媒体，故选 A。"},
            4: {"stem": "Why has Andrea Belcher kept up her videos?", "answer": "B", "explain": "新闻末尾安德里亚解释坚持拍视频是因为这点幽默与疯狂能逗人们微笑（amuse people），故选 B。"},
            5: {"stem": "What can people do at Frank's restaurant?", "answer": "C", "explain": "新闻开头介绍没钱但饥饿的顾客可从爱心告示板取一张预付小票直接换取免费餐食，故选 C。"},
            6: {"stem": "What does the owner of the restaurant say about the idea for the board of free meals?", "answer": "C", "explain": "老板说明该创意源于一位捐赠者给每位员工捐了 100 美元，员工退回结余 700 美元用于发起免费餐板，故选 C。"},
            7: {"stem": "What has happened at Frank's restaurant since the board of free meals was created?", "answer": "B", "explain": "新闻最后提到事实上有更多人捐出餐券而非领取餐券（more people giving than taking），故选 B。"},
            8: {"stem": "What do we learn about the man?", "answer": "A", "explain": "对话开头主持人介绍今日嘉宾是麦吉尔大学的心理学家史蒂夫·平克，故选 A。"},
            9: {"stem": "What are the speakers mainly talking about?", "answer": "D", "explain": "对话开篇即点明主题：探讨为什么朋友会突然拉黑断联、毫无踪迹地消失，故选 D。"},
            10: {"stem": "How do children with an anxious attachment style react to a breakdown in their relationship with parents?", "answer": "C", "explain": "心理学家指出焦虑型依恋的儿童在亲子关系受挫时会大喊大哭以唤回父母，故选 C。"},
            11: {"stem": "What does the man say about insecurely attached people?", "answer": "A", "explain": "男士指出不安全依恋者在面对分歧时，无论差异多小都会视其为关系终结的信号，故选 A。"},
            12: {"stem": "What makes the man choose to buy jeans made in Japan?", "answer": "C", "explain": "男士解释自己热爱优质牛仔裤，而日本制造品质世界一流，朋友五年前带回的至今如新，故选 C。"},
            13: {"stem": "Why is the woman puzzled by the man's request?", "answer": "A", "explain": "女士以为美国才造最好的牛仔裤，因为牛仔裤是典型的美式服装（typical American garment），故选 A。"},
            14: {"stem": "What does the man say about the dyes of Japanese jeans?", "answer": "B", "explain": "男士说明日本牛仔裤面料更佳且采用天然染料（dyes are natural），故选 B。"},
            15: {"stem": "What does the man say about Japanese jeans at the end of the conversation?", "answer": "D", "explain": "对话末尾男士承认 500 美元偏贵，但考虑到耐穿多年又时尚，完全物有所值（totally worth it），故选 D。"},
            16: {"stem": "How does the speaker feel every time he walks out of a superhero movie?", "answer": "A", "explain": "短文开头讲话者说每次走出影院都有一种渴望，觉得生活中应有更多精彩（desires more in life），故选 A。"},
            17: {"stem": "What does the passage say about the plot of all superhero movies?", "answer": "D", "explain": "短文第2段首句明确指出超级英雄电影的情节已变得相对可预测（relatively predictable），故选 D。"},
            18: {"stem": "What do the elites of American society think of superhero movies?", "answer": "D", "explain": "短文中段提到社会精英认为超级英雄电影缺乏艺术性、过于简单（too simple），故选 D。"},
            19: {"stem": "What does the passage say about storytelling?", "answer": "B", "explain": "短文开头强调讲故事能在人与人之间建立纽带与联结（forges connections），故选 B。"},
            20: {"stem": "What can good stories do to listeners according to the passage?", "answer": "B", "explain": "短文中段指出好故事让听众沉浸其中，从而更乐于学习（more open to learning），故选 B。"},
            21: {"stem": "What can leaders do with a simple personal story?", "answer": "C", "explain": "短文末尾说明领导者通过一个简单的个人故事即可传递核心价值观（convey fundamental values），故选 C。"},
            22: {"stem": "What does the passage say statistics prove?", "answer": "B", "explain": "短文开篇指出统计数据证明移民至今仍在为美国做出贡献，故选 B。"},
            23: {"stem": "What do we learn about immigrants in the U.S., compared with native-born Americans?", "answer": "D", "explain": "短文中段提到移民创业频率是本土美国人的两倍，且往往成为成功企业家，故选 D。"},
            24: {"stem": "What does the passage say about immigrants in the U.S. in terms of financial strength?", "answer": "C", "explain": "短文指出移民较少使用消费信贷，因此整体负债水平显著低于本土美国人，故选 C。"},
            25: {"stem": "What do immigrants do to achieve their goals in the U.S.?", "answer": "A", "explain": "短文末尾解释移民成功很大程度上归功于保留了从故土带来的传统价值观与储蓄习惯，故选 A。"},
        },
    },
}


def assemble_reading(q_parts: dict, paper_id: str, keys_map: dict, typo_fixes: list) -> dict:
    rd = READING_DATA[paper_id]
    wb = WORD_BANKS[paper_id]
    # Verify cloze keys match official keys_map if provided
    for b in rd["cloze"]:
        if keys_map and b["num"] in keys_map:
            assert b["answer"] == keys_map[b["num"]], f"{paper_id} Q{b['num']} cloze key mismatch: {b['answer']} vs {keys_map[b['num']]}"
    cloze = parse_cloze_passage(q_parts["secA"], rd["cloze"], wb, rd["clozeTitle"])

    # Section B Matching
    m_title, m_paras, m_stmts = parse_matching_from_q(q_parts["secB"], typo_fixes)
    m_stmts_full = []
    for st in m_stmts:
        ans, anchors, exp = rd["matching"][st["num"]]
        if keys_map and st["num"] in keys_map:
            assert ans == keys_map[st["num"]], f"{paper_id} Q{st['num']} matching key mismatch: {ans} vs {keys_map[st['num']]}"
        m_stmts_full.append({
            "num": st["num"],
            "text": st["text"],
            "answer": ans,
            "anchorKeywords": anchors,
            "explain": exp,
        })

    # Section C Careful Reading
    p2_idx = q_parts["secC"].find("Passage Two")
    p1_paras, p1_qs = parse_careful_passage_from_q(q_parts["secC"][:p2_idx], [46, 47, 48, 49, 50], typo_fixes)
    p2_paras, p2_qs = parse_careful_passage_from_q(q_parts["secC"][p2_idx:], [51, 52, 53, 54, 55], typo_fixes)
    for pas_paras, pas_qs in ((p1_paras, p1_qs), (p2_paras, p2_qs)):
        for q in pas_qs:
            ans, needle, trap, exp = rd["careful"][q["num"]]
            if keys_map and q["num"] in keys_map:
                assert ans == keys_map[q["num"]], f"{paper_id} Q{q['num']} careful key mismatch: {ans} vs {keys_map[q['num']]}"
            q.update({
                "answer": ans,
                "evidenceQuote": extract_evidence_from_paragraphs(pas_paras, needle),
                "trapType": trap,
                "explain": exp,
            })

    return {
        "cloze": cloze,
        "matching": {
            "passageTitle": m_title,
            "qNums": list(range(36, 46)),
            "paragraphs": m_paras,
            "statements": m_stmts_full,
        },
        "careful": [
            {"passageId": "p1", "label": "Passage One (Q46-50)", "title": rd["carefulTitles"][0], "paragraphs": p1_paras, "questions": p1_qs},
            {"passageId": "p2", "label": "Passage Two (Q51-55)", "title": rd["carefulTitles"][1], "paragraphs": p2_paras, "questions": p2_qs},
        ],
    }


def parse_2026_md_keys(md_text: str, set_no: int) -> dict:
    """Parse official 2026.06 Listening (1-25) and Reading (26-55) keys from the proofread MD."""
    out = {}
    m_lis = re.search(rf"\|\s*第\s*{set_no}\s*套\s*\|\s*([A-D ]+)\|\s*([A-D ]+)\|\s*([A-D ]+)\|\s*([A-D ]+)\|\s*([A-D ]+)\|", md_text)
    if not m_lis:
        raise ValueError(f"Missing 2026.06 Set {set_no} listening keys in MD")
    l_keys = " ".join(m_lis.groups()).split()
    assert len(l_keys) == 25
    for i, k in enumerate(l_keys, 1):
        out[i] = k

    m_rd = re.search(rf"\|\s*第\s*{set_no}\s*套\s*\|\s*([A-O ]+)\|\s*([A-O ]+)\|\s*([A-O ]+)\|\s*([A-O ]+)\|\s*([A-D ]+)\|\s*([A-D ]+)\|", md_text)
    if not m_rd:
        raise ValueError(f"Missing 2026.06 Set {set_no} reading keys in MD")
    r_keys = " ".join(m_rd.groups()).split()
    assert len(r_keys) == 30
    for i, k in enumerate(r_keys, 26):
        out[i] = k
    return out


def build_paper_2026_06_set1() -> dict:
    pid = "cet4_2026_06_set1"
    q_text = "\n---PAGE---\n".join(read_pdf_pages(r"四级真题\2026.06\真题PDF\cet4_2026_06_1.pdf"))
    md_text = read_text_file(r"四级真题\2026.06\答案解析\2026年6月四级参考答案（卷面对照校对版）.md")
    keys_map = parse_2026_md_keys(md_text, 1)
    fixes = [("whale-\nwatching", "whale-watching"), ("half-\njoking", "half-joking"), ("&amp;", "&")]
    q_parts = split_parts(sanitize_typos(q_text, fixes))
    q_opts = parse_listening_options_from_q(q_parts["part2"])
    lis_titles = [
        "男童误用手机狂点外卖趣闻", "游客对动物园动物行为的影响", "城市电动自行车购车补贴计划",
        "游览罗马历史遗迹与特雷维喷泉", "职场新人如何快速适应新岗位", "消费者购物决策的情感驱动力",
        "微塑料悄然进入人类饮食与空气", "饲养宠物对老年心理健康的益处",
    ]
    w_meta, t_meta = WRITING_META[pid], TRANSLATION_META[pid]
    return {
        "id": pid, "year": "2026.06", "setNo": 1, "stamp": "2026.06 · SET 01",
        "title": "2026年6月四级真题（第1套）",
        "subtitle": "2026最新57题全卷 · 含官方校对答案、读写译精讲与听力预读自测",
        "badge": "2026最新 · 57题全卷", "sourceTag": "CET-4 2026.06 第1套",
        "fullPaper": True, "hasListening": True, "hasListeningScript": False, "totalItems": 57,
        "topics": ["校园机器人应用", "工业革命生活水平", "新西兰暗夜星空岛", "有机食品/利他基因", "尊师与教师节"],
        "writing": {
            "num": "Part I", "title": w_meta["title"], "source": "2026年6月第1套 Part I Writing",
            "directions": extract_writing_directions(q_parts["part1"]), "wordRange": [120, 180],
            "logicBlueprint": w_meta["logicBlueprint"], "transferablePatterns": w_meta["transferablePatterns"],
            "topicKeywords": w_meta["topicKeywords"], "modelTitle": w_meta["modelTitle"], "modelEssay": w_meta["modelEssay"],
        },
        "listening": build_self_audio_listening(q_opts, keys_map, lis_titles),
        "reading": assemble_reading(q_parts, pid, keys_map, fixes),
        "translation": {
            "num": "Part IV", "title": t_meta["title"], "source": "2026年6月第1套 Part IV Translation",
            "chineseText": extract_translation_chinese(q_parts["part4"]),
            "keyExpressions": t_meta["keyExpressions"], "referenceTranslation": t_meta["referenceTranslation"],
            "sentenceBreakdown": t_meta["sentenceBreakdown"],
        },
    }


def build_paper_2026_06_set2() -> dict:
    pid = "cet4_2026_06_set2"
    q_text = "\n---PAGE---\n".join(read_pdf_pages(r"四级真题\2026.06\真题PDF\cet4_2026_06_2.pdf"))
    md_text = read_text_file(r"四级真题\2026.06\答案解析\2026年6月四级参考答案（卷面对照校对版）.md")
    keys_map = parse_2026_md_keys(md_text, 2)
    fixes = [("sub-\ncategories", "sub-categories"), ("so-\ncalled", "so-called"), ("&amp;", "&")]
    q_parts = split_parts(sanitize_typos(q_text, fixes))
    q_opts = parse_listening_options_from_q(q_parts["part2"])
    lis_titles = [
        "百岁老妇迁离居住一生的老宅", "海上遇险者巧用镜子反光获救", "丹佛学区因生源下降裁并学校",
        "伦敦音乐剧购票与座位选择", "手机过度使用与日常社交便利", "就业市场薪资增速与通胀趋势",
        "超加工食品为何诱发过量进食", "家务分工与性别差异研究争议",
    ]
    w_meta, t_meta = WRITING_META[pid], TRANSLATION_META[pid]
    return {
        "id": pid, "year": "2026.06", "setNo": 2, "stamp": "2026.06 · SET 02",
        "title": "2026年6月四级真题（第2套）",
        "subtitle": "2026最新57题全卷 · 含官方校对答案、读写译精讲与听力预读自测",
        "badge": "2026最新 · 57题全卷", "sourceTag": "CET-4 2026.06 第2套",
        "fullPaper": True, "hasListening": True, "hasListeningScript": False, "totalItems": 57,
        "topics": ["便利校园提案", "咖啡苦味基因", "运动与失智预防", "冒充者综合征/全球音乐", "中华餐桌礼仪"],
        "writing": {
            "num": "Part I", "title": w_meta["title"], "source": "2026年6月第2套 Part I Writing",
            "directions": extract_writing_directions(q_parts["part1"]), "wordRange": [120, 180],
            "logicBlueprint": w_meta["logicBlueprint"], "transferablePatterns": w_meta["transferablePatterns"],
            "topicKeywords": w_meta["topicKeywords"], "modelTitle": w_meta["modelTitle"], "modelEssay": w_meta["modelEssay"],
        },
        "listening": build_self_audio_listening(q_opts, keys_map, lis_titles),
        "reading": assemble_reading(q_parts, pid, keys_map, fixes),
        "translation": {
            "num": "Part IV", "title": t_meta["title"], "source": "2026年6月第2套 Part IV Translation",
            "chineseText": extract_translation_chinese(q_parts["part4"]),
            "keyExpressions": t_meta["keyExpressions"], "referenceTranslation": t_meta["referenceTranslation"],
            "sentenceBreakdown": t_meta["sentenceBreakdown"],
        },
    }


def build_paper_2025_12_set1() -> dict:
    pid = "cet4_2025_12_set1"
    q_text = "\n---PAGE---\n".join(read_pdf_pages(r"四级真题\2025.12\真题PDF\cet4_2025_12_1.pdf"))
    fixes = [("&amp;", "&")]
    q_parts = split_parts(sanitize_typos(q_text, fixes))
    keys_map = parse_embedded_keys(q_parts["keys"])
    q_opts = parse_listening_options_from_q(q_parts["part2"])
    lis_titles = [
        "汽车引擎盖下救出走失小猫", "特奥春季运动会盛大开幕", "瑞士法院裁定销毁仿冒巧克力兔",
        "讨论素食饮食与动物权益保护", "缓解长途飞行时差的饮食建议", "设计师入行与职场适应力培养",
        "教室灵动座椅改革提升专注度", "英国校规禁穿违规鞋引发争议",
    ]
    w_meta, t_meta = WRITING_META[pid], TRANSLATION_META[pid]
    return {
        "id": pid, "year": "2025.12", "setNo": 1, "stamp": "2025.12 · SET 01",
        "title": "2025年12月四级真题（第1套）",
        "subtitle": "2025年12月57题全卷 · 含原卷官方答案、读写译精讲与听力预读自测",
        "badge": "2025真题 · 57题全卷", "sourceTag": "CET-4 2025.12 第1套",
        "fullPaper": True, "hasListening": True, "hasListeningScript": False, "totalItems": 57,
        "topics": ["学生会丰富校园", "选择悖论心理学", "纽约自行车道之争", "服药节律/延迟退休", "民营经济高质量发展"],
        "writing": {
            "num": "Part I", "title": w_meta["title"], "source": "2025年12月第1套 Part I Writing",
            "directions": extract_writing_directions(q_parts["part1"]), "wordRange": [120, 180],
            "logicBlueprint": w_meta["logicBlueprint"], "transferablePatterns": w_meta["transferablePatterns"],
            "topicKeywords": w_meta["topicKeywords"], "modelTitle": w_meta["modelTitle"], "modelEssay": w_meta["modelEssay"],
        },
        "listening": build_self_audio_listening(q_opts, keys_map, lis_titles),
        "reading": assemble_reading(q_parts, pid, keys_map, fixes),
        "translation": {
            "num": "Part IV", "title": t_meta["title"], "source": "2025年12月第1套 Part IV Translation",
            "chineseText": extract_translation_chinese(q_parts["part4"]),
            "keyExpressions": t_meta["keyExpressions"], "referenceTranslation": t_meta["referenceTranslation"],
            "sentenceBreakdown": t_meta["sentenceBreakdown"],
        },
    }


def build_paper_2024_06_set1() -> dict:
    pid = "cet4_2024_06_set1"
    q_text = "\n---PAGE---\n".join(read_pdf_pages(r"四级真题\2024.06\真题PDF\cet4_2024_06_1.pdf"))
    fixes = [
        ("Rescuing he businessmen", "Rescuing the businessmen"),
        ("48 What may account", "48. What may account"),
        ("shrinks2", "shrinks?"),
        ("&amp;", "&"),
    ]
    q_parts = split_parts(sanitize_typos(q_text, fixes))
    keys_map = parse_embedded_keys(q_parts["keys"])
    q_opts = parse_listening_options_from_q(q_parts["part2"])
    lis_titles = [
        "公寓火灾疏散与起火原因调查", "维生素与老年人抑郁情绪关联", "克隆警犬缩短训练周期的探索",
        "讨论畅销书改编剧集与作者趣事", "咨询纽卡斯尔素食美食节参展", "户外野营热潮与无痕露营倡导",
        "亚马孙粉红河豚的独特肤色与保护", "父母经济资助与年轻人独立生活",
    ]
    w_meta, t_meta = WRITING_META[pid], TRANSLATION_META[pid]
    return {
        "id": pid, "year": "2024.06", "setNo": 1, "stamp": "2024.06 · SET 01",
        "title": "2024年6月四级真题（第1套）",
        "subtitle": "2024年6月57题全卷 · 含官方速查答案与范文译文、读写译精讲",
        "badge": "2024真题 · 57题全卷", "sourceTag": "CET-4 2024.06 第1套",
        "fullPaper": True, "hasListening": True, "hasListeningScript": False, "totalItems": 57,
        "topics": ["图书馆对外开放", "运动强度与情绪", "美国人为何工作不止", "拒绝讨好/终生护脑", "北京四合院"],
        "writing": {
            "num": "Part I", "title": w_meta["title"], "source": "2024年6月第1套 Part I Writing",
            "directions": extract_writing_directions(q_parts["part1"]), "wordRange": [120, 180],
            "logicBlueprint": w_meta["logicBlueprint"], "transferablePatterns": w_meta["transferablePatterns"],
            "topicKeywords": w_meta["topicKeywords"], "modelTitle": w_meta["modelTitle"], "modelEssay": w_meta["modelEssay"],
        },
        "listening": build_self_audio_listening(q_opts, keys_map, lis_titles),
        "reading": assemble_reading(q_parts, pid, keys_map, fixes),
        "translation": {
            "num": "Part IV", "title": t_meta["title"], "source": "2024年6月第1套 Part IV Translation",
            "chineseText": extract_translation_chinese(q_parts["part4"]),
            "keyExpressions": t_meta["keyExpressions"], "referenceTranslation": t_meta["referenceTranslation"],
            "sentenceBreakdown": t_meta["sentenceBreakdown"],
        },
    }


def build_paper_2023_06_set1() -> dict:
    pid = "cet4_2023_06_set1"
    q_text = "\n---PAGE---\n".join(read_pdf_pages(r"四级真题\2023.06\真题PDF\2023年6月第1套英语四级真题.pdf"))
    a_text = "\n---PAGE---\n".join(read_pdf_pages(r"四级真题\2023.06\答案解析\2023年6月第1套英语四级真题解析.pdf"))
    fixes = [
        ("22.6armers", "22.6%, farmers"),
        ("29of drivers", "29% of drivers"),
        ("13in 2009", "13% in 2009"),
        ("30of new plastic", "30% of new plastic"),
        ("30recycled plastic", "30% recycled plastic"),
        ("\nI Siri has often", "\nI) Siri has often"),
        ("&amp;", "&"),
    ]
    q_parts = split_parts(sanitize_typos(q_text, fixes))
    a_parts = split_parts(sanitize_typos(a_text, fixes))
    q_opts = parse_listening_options_from_q(q_parts["part2"])
    l_meta = LISTENING_QA_2023_06[pid]
    listening = parse_2023_06_listening_scripts(a_parts["part2"], q_opts, l_meta["titles"], l_meta["qs"])
    w_meta, t_meta = WRITING_META[pid], TRANSLATION_META[pid]
    return {
        "id": pid, "year": "2023.06", "setNo": 1, "stamp": "2023.06 · SET 01",
        "title": "2023年6月四级真题（第1套 · 含完整听力原稿）",
        "subtitle": "完整 57 题精刷全卷 · 含 25 题原版听力逐字稿 + 多角色语音精听",
        "badge": "57题全卷 · 含完整语音精听", "sourceTag": "CET-4 2023.06 第1套",
        "fullPaper": True, "hasListening": True, "hasListeningScript": True, "totalItems": 57,
        "topics": ["在线课程利弊", "火星模拟/蓝光睡眠/午睡驿站", "棉T恤耗水", "语音网络挑战", "豪宅危机/过度野心", "终身与继续教育"],
        "writing": {
            "num": "Part I", "title": w_meta["title"], "source": "2023年6月第1套 Part I Writing",
            "directions": extract_writing_directions(q_parts["part1"]), "wordRange": [120, 180],
            "logicBlueprint": w_meta["logicBlueprint"], "transferablePatterns": w_meta["transferablePatterns"],
            "topicKeywords": w_meta["topicKeywords"], "modelTitle": w_meta["modelTitle"], "modelEssay": w_meta["modelEssay"],
        },
        "listening": listening,
        "reading": assemble_reading(q_parts, pid, {}, fixes),
        "translation": {
            "num": "Part IV", "title": t_meta["title"], "source": "2023年6月第1套 Part IV Translation",
            "chineseText": extract_translation_chinese(q_parts["part4"]),
            "keyExpressions": t_meta["keyExpressions"], "referenceTranslation": t_meta["referenceTranslation"],
            "sentenceBreakdown": t_meta["sentenceBreakdown"],
        },
    }


def build_paper_2023_06_set2() -> dict:
    pid = "cet4_2023_06_set2"
    q_text = "\n---PAGE---\n".join(read_pdf_pages(r"四级真题\2023.06\真题PDF\2023年6月第2套英语四级真题.pdf"))
    a_text = "\n---PAGE---\n".join(read_pdf_pages(r"四级真题\2023.06\答案解析\2023年6月第2套英语四级真题解析.pdf"))
    fixes = [
        ("40of Fortune", "40% of Fortune"),
        ("34of Americans", "34% of Americans"),
        ("19of the general", "19% of the general"),
        ("ireplaceable", "irreplaceable"),
        ("Eeclestone", "Ecclestone"),
        ("W;Really?", "W: Really?"),
        ("\nI mostly", "\nI) mostly"),
        ("&amp;", "&"),
    ]
    q_parts = split_parts(sanitize_typos(q_text, fixes))
    a_parts = split_parts(sanitize_typos(a_text, fixes))
    q_opts = parse_listening_options_from_q(q_parts["part2"])
    l_meta = LISTENING_QA_2023_06[pid]
    listening = parse_2023_06_listening_scripts(a_parts["part2"], q_opts, l_meta["titles"], l_meta["qs"])
    w_meta, t_meta = WRITING_META[pid], TRANSLATION_META[pid]
    return {
        "id": pid, "year": "2023.06", "setNo": 2, "stamp": "2023.06 · SET 02",
        "title": "2023年6月四级真题（第2套 · 含完整听力原稿）",
        "subtitle": "完整 57 题精刷全卷 · 含 25 题原版听力逐字稿 + 多角色语音精听",
        "badge": "57题全卷 · 含完整语音精听", "sourceTag": "CET-4 2023.06 第2套",
        "fullPaper": True, "hasListening": True, "hasListeningScript": True, "totalItems": 57,
        "topics": ["同学人际关系", "免费餐板/依恋风格/讲故事", "摩洛哥太阳能电站", "F1赛车进军美国", "超市营销/全年制学校", "中国高等教育"],
        "writing": {
            "num": "Part I", "title": w_meta["title"], "source": "2023年6月第2套 Part I Writing",
            "directions": extract_writing_directions(q_parts["part1"]), "wordRange": [120, 180],
            "logicBlueprint": w_meta["logicBlueprint"], "transferablePatterns": w_meta["transferablePatterns"],
            "topicKeywords": w_meta["topicKeywords"], "modelTitle": w_meta["modelTitle"], "modelEssay": w_meta["modelEssay"],
        },
        "listening": listening,
        "reading": assemble_reading(q_parts, pid, {}, fixes),
        "translation": {
            "num": "Part IV", "title": t_meta["title"], "source": "2023年6月第2套 Part IV Translation",
            "chineseText": extract_translation_chinese(q_parts["part4"]),
            "keyExpressions": t_meta["keyExpressions"], "referenceTranslation": t_meta["referenceTranslation"],
            "sentenceBreakdown": t_meta["sentenceBreakdown"],
        },
    }


def validate_papers(papers: list) -> None:
    assert len(papers) == 6
    total_all = 0
    for p in papers:
        assert int(p["year"][:4]) >= 2021, f"Year {p['year']} older than 2021!"
        cnt = 0
        # Writing
        w = p["writing"]
        assert w["directions"] and len(w["directions"]) > 50, f"{p['id']} writing directions too short"
        wc = len(re.findall(r"[A-Za-z]+(?:'[A-Za-z]+)?", w["modelEssay"]))
        assert 120 <= wc <= 190, f"{p['id']} modelEssay word count {wc}"
        assert len(w["logicBlueprint"]) >= 3 and len(w["transferablePatterns"]) >= 4 and len(w["topicKeywords"]) >= 8
        cnt += 1

        # Listening
        lis = p["listening"]
        assert lis and lis["totalQuestions"] == 25
        all_qnums = []
        for sec in lis["sections"]:
            for g in sec["groups"]:
                assert g["preReadCue"], f"{p['id']} {g['groupId']} missing preReadCue"
                if p["hasListeningScript"]:
                    assert len(g["scriptTurns"]) >= 3, f"{p['id']} {g['groupId']} scriptTurns too few"
                    for t in g["scriptTurns"]:
                        assert t["speaker"] in ("Narrator", "W", "M")
                        assert t["text"] and not re.search(r"[（(]\d{1,2}(?:-\d)?[)）]", t["text"]), f"Marker leaked in {p['id']} {g['groupId']}: {t['text'][:60]}"
                else:
                    assert g["scriptTurns"] == [], f"{p['id']} should NOT fabricate scripts!"
                for q in g["questions"]:
                    all_qnums.append(q["num"])
                    assert len(q["options"]) == 4, f"{p['id']} Q{q['num']} options != 4"
                    for li, opt in enumerate(q["options"]):
                        assert opt.startswith(f"{chr(65 + li)}. ") and len(opt) > 4, f"Bad opt {p['id']} Q{q['num']}: {opt}"
                    assert q["answer"] in ("A", "B", "C", "D")
                    assert q["questionText"] and q["evidenceQuote"] and q["explain"]
        assert sorted(all_qnums) == list(range(1, 26)), f"{p['id']} listening qnums incomplete"
        cnt += 25

        # Cloze
        cl = p["reading"]["cloze"]
        assert len(cl["wordBank"]) == 15 and [x["code"] for x in cl["wordBank"]] == [chr(65 + i) for i in range(15)]
        assert len(cl["blanks"]) == 10
        used = set()
        for b in cl["blanks"]:
            assert f"{{{{{b['num']}}}}}" in cl["passageHtml"], f"{p['id']} missing {{{{{b['num']}}}}}"
            assert b["answer"] in [chr(65 + i) for i in range(15)] and b["answer"] not in used
            used.add(b["answer"])
            assert b["posHint"] and b["explain"]
        cnt += 10

        # Matching
        mt = p["reading"]["matching"]
        labels = [x["label"] for x in mt["paragraphs"]]
        assert mt["passageTitle"] and len(labels) >= 10 and len(mt["statements"]) == 10
        assert [s["num"] for s in mt["statements"]] == list(range(36, 46))
        for st in mt["statements"]:
            assert st["answer"] in labels, f"{p['id']} Q{st['num']} {st['answer']} not in {labels}"
            assert st["text"] and st["anchorKeywords"] and st["explain"]
        cnt += 10

        # Careful Reading
        cf = p["reading"]["careful"]
        assert len(cf) == 2
        cf_nums = []
        for pas in cf:
            assert len(pas["paragraphs"]) >= 3 and len(pas["questions"]) == 5
            for q in pas["questions"]:
                cf_nums.append(q["num"])
                assert q["stem"] and len(q["options"]) == 4
                for li, opt in enumerate(q["options"]):
                    assert opt.startswith(f"{chr(65 + li)}. ") and len(opt) > 4
                assert q["answer"] in ("A", "B", "C", "D")
                assert q["evidenceQuote"] and q["trapType"] and q["explain"]
        assert cf_nums == list(range(46, 56))
        cnt += 10

        # Translation
        tr = p["translation"]
        assert tr["chineseText"] and len(tr["chineseText"]) > 60
        assert len(tr["keyExpressions"]) == 8 and len(tr["referenceTranslation"]) > 150 and len(tr["sentenceBreakdown"]) >= 3
        cnt += 1

        assert cnt == 57 and p["totalItems"] == 57
        total_all += cnt
    assert total_all == 342, f"Expected 342 items, got {total_all}"


def write_js(papers: list) -> None:
    payload = json.dumps(papers, ensure_ascii=False, separators=(",", ":"))
    assert ("</scr" + "ipt>") not in payload.lower(), "Forbidden closing script tag inside JSON!"
    assert "---PAGE---" not in payload, "Stray ---PAGE--- marker inside JSON!"
    assert not re.search(r"[\U0001F300-\U0001FAFF\u2600-\u27BF]", payload), "Emoji detected!"
    assert not re.search(r"(?<!-)\b" + "mono" + r"space\b", payload), "Forbidden font token detected!"
    assert not re.search("Sim" + r"Sun|\u5b8b\u4f53", payload, flags=re.IGNORECASE), "Forbidden serif font detected!"
    assert not re.search(r"\u6a21\u62df\u8003|\u6a21\u62df\u5377|" + "mock" + "Exam", payload, flags=re.IGNORECASE), "Forbidden term!"
    assert "&amp;" not in payload, "Raw HTML entity &amp; detected!"

    header = (
        "/* ==========================================================================\n"
        "   CET-4 Authentic Real Past Papers Corpus (window.REAL_CET4_PAPERS)\n"
        "   6 Genuine 2023.06-2026.06 Full 57-Item CET-4 Papers (342 Real Items):\n"
        "     1. cet4_2026_06_set1 — 2026年6月四级真题（第1套） (57 items, latest)\n"
        "     2. cet4_2026_06_set2 — 2026年6月四级真题（第2套） (57 items, latest)\n"
        "     3. cet4_2025_12_set1 — 2025年12月四级真题（第1套）(57 items)\n"
        "     4. cet4_2024_06_set1 — 2024年6月四级真题（第1套） (57 items)\n"
        "     5. cet4_2023_06_set1 — 2023年6月四级真题（第1套） (57 items, FULL verbatim listening script)\n"
        "     6. cet4_2023_06_set2 — 2023年6月四级真题（第2套） (57 items, FULL verbatim listening script)\n"
        "   ZERO synthetic papers. ZERO fabricated listening scripts. ZERO 2017/2018 sets.\n"
        "   Clean UTF-8 release-gate verified.\n"
        "   ========================================================================== */\n"
        "(function (root) {\n"
        "  'use strict';\n\n"
        "  const REAL_CET4_PAPERS = "
    )
    footer = (
        ";\n\n"
        "  if (typeof root !== 'undefined' && root) {\n"
        "    root.REAL_CET4_PAPERS = REAL_CET4_PAPERS;\n"
        "  }\n"
        "  if (typeof module !== 'undefined' && module.exports) {\n"
        "    module.exports = REAL_CET4_PAPERS;\n"
        "  }\n"
        "})(typeof window !== 'undefined' ? window : globalThis);\n"
    )
    with open(OUT_JS, "w", encoding="utf-8", newline="\n") as f:
        f.write(header + payload + footer)


def main() -> int:
    papers = [
        build_paper_2026_06_set1(),
        build_paper_2026_06_set2(),
        build_paper_2025_12_set1(),
        build_paper_2024_06_set1(),
        build_paper_2023_06_set1(),
        build_paper_2023_06_set2(),
    ]
    validate_papers(papers)
    write_js(papers)
    size_kb = os.path.getsize(OUT_JS) / 1024.0
    print(f"[OK] Extracted 6 authentic 2023.06-2026.06 CET-4 full papers (342 real items) -> {OUT_JS} ({size_kb:.1f} KB)")
    for p in papers:
        turns_cnt = sum(len(g["scriptTurns"]) for s in p["listening"]["sections"] for g in s["groups"])
        lis_desc = f"25Q + {turns_cnt} verbatim script turns" if p["hasListeningScript"] else "25Q (official keys + preReadCues, self-audio)"
        print(f"  - {p['id']} ({p['year']} Set {p['setNo']}): {p['totalItems']} items | {lis_desc} | match={len(p['reading']['matching']['paragraphs'])} paras")
    return 0


if __name__ == "__main__":
    sys.exit(main())
