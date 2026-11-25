#!/usr/bin/env python3
"""
CET-4 Corpus Extraction, Vocabulary Frequency Mining & Verification Script.

Reads ONLY genuine CET-4 materials from `_cet46_source` (excluding CET-6 files,
image-only scanned PDFs, and garbled CID PDFs as documented in PHASE1_BLUEPRINT.md).

Capabilities:
  1. Mines corpus-verified high-frequency CET-4 vocabulary across 35+ clean papers
     (2014.06 - 2026.06), deduplicating paper editions so each exam set counts once.
  2. Extracts real exam sentences with exact source paper labels for vocabulary curation.
  3. Extracts clean structured text from target papers/answer keys (Listening scripts,
     Banked Cloze, Long Reading, Careful Reading, Translation, Writing) to an optional
     scratch directory for data curation.
  4. Can verify generated JS data modules (`vocab_data.js`, `knowledge_data.js`,
     `questions_data.js`, `explanations_data.js`) for editorial compliance (zero emojis,
     zero mock-exam relics, 100% explanation ID coverage).

Usage:
  py scripts/extract_cet4_corpus.py --out-dir <scratch_dir>
  py scripts/extract_cet4_corpus.py --verify
"""

from __future__ import annotations

import argparse
import collections
import json
import os
import re
import sys
from pathlib import Path

import pymupdf as fitz
from docx import Document

WORKSPACE_ROOT = Path(__file__).resolve().parents[2]
SOURCE_ROOT = WORKSPACE_ROOT / "_cet46_source"
CET4_DIR = SOURCE_ROOT / "四级真题"
WRITING_MD = SOURCE_ROOT / "翻译与写作（每日更新）" / "四级写作积累.md"
CET4_REVIEW_DIR = Path(__file__).resolve().parents[1]

# Strictly excluded paths/patterns (CET-6, scanned image-only PDFs, garbled CID PDFs)
EXCLUDED_SUBSTRINGS = (
    "六级真题",
    "写作积累.md",  # NOTE: 四级写作积累.md is handled explicitly via WRITING_MD
    "翻译积累.md",
    "2017.06\\答案解析",
    "2017.06/答案解析",
    "2023.06",
    "2023.12",
    "_ans.pdf",
)

# Clean canonical exam paper set list (deduplicated: 1 file per exam session/set)
CANONICAL_PAPERS = [
    ("2014.06 第1套", CET4_DIR / "2014.06/真题Word/2014年6月四级真题第1套.docx"),
    ("2015.12 第1套", CET4_DIR / "2015.12/真题Word/2015年12月英语四级考试真题（第1套）.docx"),
    ("2015.12 第2套", CET4_DIR / "2015.12/真题Word/2015年12月英语四级考试真题（第2套）.docx"),
    ("2015.12 第3套", CET4_DIR / "2015.12/真题Word/2015年12月英语四级考试真题（第3套）.docx"),
    ("2016.12 第2套", CET4_DIR / "2016.12/真题Word/2016年12月四级真题（第二套）.docx"),
    ("2016.12 第3套", CET4_DIR / "2016.12/真题Word/2016年12月四级真题（第三套).docx"),
    ("2017.06 第1套", CET4_DIR / "2017.06/真题Word/2017年6月大学英语四级真题1.docx"),
    ("2017.06 第2套", CET4_DIR / "2017.06/真题Word/2017年6月大学英语四级真题2.docx"),
    ("2017.06 第3套", CET4_DIR / "2017.06/真题Word/2017年6月大学英语四级真题3.docx"),
    ("2017.12 第1套", CET4_DIR / "2017.12/真题PDF/2017.12四级真题（卷1）.pdf"),
    ("2017.12 第2套", CET4_DIR / "2017.12/真题PDF/2017.12四级真题（卷2）.pdf"),
    ("2017.12 第3套", CET4_DIR / "2017.12/真题PDF/2017.12四级真题（卷3）.pdf"),
    ("2018.06 第1套", CET4_DIR / "2018.06/真题PDF/2018.06四级真题第1套.pdf"),
    ("2018.06 第2套", CET4_DIR / "2018.06/真题PDF/2018.06四级真题第2套.pdf"),
    ("2018.06 第3套", CET4_DIR / "2018.06/真题PDF/2018.06四级真题第3套.pdf"),
    ("2018.12 第1套", CET4_DIR / "2018.12/真题Word/2018年12月四级真题第一套.docx"),
    ("2018.12 第2套", CET4_DIR / "2018.12/真题Word/2018年12月四级真题第二套.docx"),
    ("2018.12 第3套", CET4_DIR / "2018.12/真题Word/2018年12月四级真题第三套.docx"),
    ("2019.06 第1套", CET4_DIR / "2019.06/真题Word/2019年6月四级真题第一套.docx"),
    ("2019.06 第2套", CET4_DIR / "2019.06/真题Word/2019年6月四级真题第二套.docx"),
    ("2019.06 第3套", CET4_DIR / "2019.06/真题Word/2019年6月四级真题第三套.docx"),
    ("2019.12 第1套", CET4_DIR / "2019.12/真题Word/2019年12月四级真题第1套.docx"),
    ("2019.12 第2套", CET4_DIR / "2019.12/真题Word/2019年12月四级真题第2套.docx"),
    ("2019.12 第3套", CET4_DIR / "2019.12/真题Word/2019年12月四级真题第3套.docx"),
    ("2024.06 第1套", CET4_DIR / "2024.06/真题PDF/cet4_2024_06_1.pdf"),
    ("2024.06 第2套", CET4_DIR / "2024.06/真题PDF/cet4_2024_06_2.pdf"),
    ("2024.06 第3套", CET4_DIR / "2024.06/真题PDF/cet4_2024_06_3.pdf"),
    ("2024.12 第1套", CET4_DIR / "2024.12/真题PDF/cet4_2024_12_1.pdf"),
    ("2024.12 第2套", CET4_DIR / "2024.12/真题PDF/cet4_2024_12_2.pdf"),
    ("2024.12 第3套", CET4_DIR / "2024.12/真题PDF/cet4_2024_12_3.pdf"),
    ("2025.06 第1套", CET4_DIR / "2025.06/真题PDF/cet4_2025_06_1.pdf"),
    ("2025.06 第2套", CET4_DIR / "2025.06/真题PDF/cet4_2025_06_2.pdf"),
    ("2025.06 第3套", CET4_DIR / "2025.06/真题PDF/cet4_2025_06_3.pdf"),
    ("2025.12 第1套", CET4_DIR / "2025.12/真题PDF/cet4_2025_12_1.pdf"),
    ("2025.12 第2套", CET4_DIR / "2025.12/真题PDF/cet4_2025_12_2.pdf"),
    ("2025.12 第3套", CET4_DIR / "2025.12/真题PDF/cet4_2025_12_3.pdf"),
    ("2026.06 第1套", CET4_DIR / "2026.06/真题PDF/cet4_2026_06_1.pdf"),
    ("2026.06 第2套", CET4_DIR / "2026.06/真题PDF/cet4_2026_06_2.pdf"),
    ("2026.06 第3套", CET4_DIR / "2026.06/真题PDF/cet4_2026_06_3.pdf"),
]

# Clean answer keys with full listening scripts & reading/translation keys
CLEAN_ANSWER_KEYS = [
    ("2016.06_ans_1", CET4_DIR / "2016.06/答案解析/2016年6月大学英语四级第1套答案解析.pdf"),
    ("2016.06_ans_2", CET4_DIR / "2016.06/答案解析/2016年6月大学英语四级第2套答案解析.pdf"),
    ("2016.06_ans_3", CET4_DIR / "2016.06/答案解析/2016年6月大学英语四级第3套答案解析.pdf"),
    ("2017.12_ans_1", CET4_DIR / "2017.12/答案解析/2017年12月英语四级真题答案及解析（第一套）.pdf"),
    ("2017.12_ans_2", CET4_DIR / "2017.12/答案解析/2017年12月英语四级真题答案及解析（第二套）.pdf"),
    ("2017.12_ans_3", CET4_DIR / "2017.12/答案解析/2017年12月英语四级真题答案及解析（第三套）.pdf"),
    ("2018.06_ans_1", CET4_DIR / "2018.06/答案解析/2018年6月英语四级真题答案解析（卷一）.pdf"),
    ("2018.06_ans_2", CET4_DIR / "2018.06/答案解析/2018年6月英语四级真题答案解析（卷二）.pdf"),
    ("2018.06_ans_3", CET4_DIR / "2018.06/答案解析/2018年6月英语四级真题答案解析（卷三）.pdf"),
    ("2019.12_ans_1", CET4_DIR / "2019.12/答案解析/2019.12英语四级解析第1套.pdf"),
    ("2019.12_ans_2", CET4_DIR / "2019.12/答案解析/2019.12英语四级解析第2套.pdf"),
    ("2019.12_ans_3", CET4_DIR / "2019.12/答案解析/2019.12英语四级解析第3套.pdf"),
    ("2024.06_ans_1", CET4_DIR / "2024.06/答案解析/2024年06月四级考试真题答案速查（第1套）.pdf"),
    ("2024.06_ans_2", CET4_DIR / "2024.06/答案解析/2024年06月四级考试真题答案速查（第2套）.pdf"),
    ("2024.06_ans_3", CET4_DIR / "2024.06/答案解析/2024年06月四级考试真题答案速查（第3套）.pdf"),
    ("2026.06_ans_md", CET4_DIR / "2026.06/答案解析/2026年6月四级参考答案（卷面对照校对版）.md"),
]

# Boilerplate & elementary function words excluded from CET-4 vocabulary mining
STOP_AND_BOILERPLATE = {
    # Exam instructions / layout boilerplate
    "directions", "direction", "passage", "passages", "section", "sections", "part", "parts",
    "answer", "answers", "sheet", "sheets", "corresponding", "corresponds", "following",
    "choice", "choices", "question", "questions", "statement", "statements", "attached",
    "minutes", "minute", "marked", "mark", "single", "letter", "letters", "blank", "blanks",
    "paragraph", "paragraphs", "sentence", "sentences", "column", "columns", "identified",
    "identify", "recording", "recordings", "listening", "comprehension", "reading", "writing",
    "translation", "translate", "chinese", "english", "words", "word", "essay", "write",
    "blacken", "pencil", "paper", "exam", "test", "band", "cet", "cet4", "college",
    "carefully", "decide", "best", "choose", "chosen", "given", "below", "above", "listed",
    "list", "items", "item", "news", "report", "reports", "conversation", "conversations",
    "speaker", "speakers", "narrator", "once", "twice", "read", "hear", "heard", "end",
    "begin", "beginning", "pause", "spoken", "line", "lines", "centre", "center", "space",
    "provided", "select", "selected", "used", "using", "more", "than", "once", "bank",
    "based", "according", "author", "text", "information", "contains", "contain",
    "least", "most", "about", "write", "your", "should", "must", "will", "would", "could",
    # High-frequency basic function / middle-school words (not CET-4 sprint targets)
    "that", "this", "with", "from", "have", "were", "been", "they", "their", "them",
    "there", "these", "those", "what", "when", "where", "which", "while", "whom", "whose",
    "into", "onto", "over", "under", "after", "before", "between", "through", "during",
    "without", "within", "about", "around", "against", "among", "along", "across", "behind",
    "because", "since", "although", "though", "until", "unless", "whether", "however",
    "also", "just", "only", "very", "much", "many", "some", "such", "other", "another",
    "each", "every", "both", "either", "neither", "same", "different", "even", "still",
    "already", "always", "never", "often", "sometimes", "usually", "really", "actually",
    "here", "then", "than", "well", "better", "best", "good", "great", "little", "small",
    "large", "long", "high", "short", "full", "hard", "easy", "early", "late", "next",
    "last", "first", "second", "third", "four", "five", "seven", "eight", "nine", "zero",
    "hundred", "thousand", "million", "billion", "year", "years", "month", "months",
    "week", "weeks", "days", "time", "times", "hour", "hours", "today", "tomorrow",
    "yesterday", "night", "morning", "evening", "people", "person", "persons", "human",
    "humans", "world", "life", "work", "working", "worked", "works", "make", "makes",
    "made", "making", "take", "takes", "took", "taken", "taking", "give", "gives", "gave",
    "giving", "find", "finds", "found", "finding", "know", "knows", "knew", "known",
    "think", "thinks", "thought", "thinking", "come", "comes", "came", "coming", "look",
    "looks", "looked", "looking", "want", "wants", "wanted", "need", "needs", "needed",
    "feel", "feels", "felt", "become", "becomes", "became", "leave", "leaves", "left",
    "call", "calls", "called", "keep", "keeps", "kept", "help", "helps", "helped",
    "show", "shows", "showed", "shown", "tell", "tells", "told", "said", "says", "saying",
    "talk", "talks", "talked", "turn", "turns", "turned", "start", "starts", "started",
    "play", "plays", "played", "move", "moves", "moved", "live", "lives", "lived",
    "living", "like", "likes", "liked", "love", "loved", "home", "house", "room", "door",
    "hand", "hands", "head", "face", "eyes", "body", "mind", "heart", "food", "water",
    "book", "books", "school", "schools", "class", "student", "students", "teacher",
    "teachers", "university", "universities", "child", "children", "kids", "family",
    "families", "parent", "parents", "mother", "father", "friend", "friends", "woman",
    "women", "girls", "boys", "place", "places", "city", "cities", "town", "country",
    "countries", "state", "states", "china", "american", "america", "united", "london",
    "york", "thing", "things", "something", "anything", "everything", "nothing", "someone",
    "anyone", "everyone", "myself", "yourself", "himself", "herself", "itself", "ourselves",
    "themselves", "does", "done", "doing", "didn", "doesn", "don", "isn", "aren", "wasn",
    "weren", "won", "can", "cant", "cannot", "might", "shall", "being", "having", "going",
    "went", "gone", "gets", "getting", "gotten", "seem", "seems", "seemed", "back", "down",
    "away", "almost", "enough", "quite", "rather", "nearly", "maybe", "perhaps", "almost",
    "kind", "kinds", "sort", "part", "case", "cases", "fact", "facts", "idea", "ideas",
    "name", "names", "number", "numbers", "group", "groups", "side", "sides", "point",
    "points", "area", "areas", "money", "price", "cost", "costs", "jobs", "company",
    "companies", "business", "market", "system", "systems", "program", "programs",
    "study", "studies", "studied", "research", "problem", "problems", "change", "changes",
    "changed", "changing", "level", "levels", "story", "stories", "month", "week", "open",
    "close", "closed", "free", "sure", "true", "real", "right", "wrong", "able", "less",
    "least", "most", "much", "many", "several", "various", "certain", "clear", "simple",
    "young", "older", "oldest", "newer", "newest", "important", "possible", "likely",
    "happy", "sorry", "nice", "fine", "fast", "slow", "cold", "warm", "dark", "light",
    "white", "black", "green", "blue", "yellow", "brown", "short", "wide", "deep", "near",
    "soon", "later", "once", "ever", "else", "only", "both", "half", "full", "upon",
    "per", "cent", "percent", "million", "billion", "first", "last", "next", "previous",
    "january", "february", "march", "april", "june", "july", "august", "september",
    "october", "november", "december", "monday", "tuesday", "wednesday", "thursday",
    "friday", "saturday", "sunday", "www", "http", "https", "com", "org", "edu",
}


def read_docx_text(path: Path) -> str:
    doc = Document(str(path))
    parts = [p.text for p in doc.paragraphs if p.text.strip()]
    for table in doc.tables:
        for row in table.rows:
            row_txt = " | ".join(cell.text.strip() for cell in row.cells if cell.text.strip())
            if row_txt:
                parts.append(row_txt)
    return "\n".join(parts)


def read_pdf_text(path: Path) -> str:
    doc = fitz.open(str(path))
    pages = []
    for page in doc:
        pages.append(page.get_text("text"))
    doc.close()
    return "\n".join(pages)


def read_any_text(path: Path) -> str:
    suf = path.suffix.lower()
    if suf == ".docx":
        return read_docx_text(path)
    if suf == ".pdf":
        return read_pdf_text(path)
    return path.read_text(encoding="utf-8")


def normalize_whitespace(text: str) -> str:
    text = text.replace("\u00a0", " ").replace("\u200b", "").replace("\ufeff", "")
    # Join hyphenated line breaks common in PDF extraction
    text = re.sub(r"([A-Za-z])-\s*\n\s*([a-z])", r"\1\2", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def extract_clean_sentences(text: str, paper_label: str) -> list[tuple[str, str]]:
    """Extract clean English exam sentences suitable as realSentence examples."""
    # Remove instruction blocks
    lines = []
    skip_markers = (
        "Directions:", "DIRECTIONS:", "Part I", "Part II", "Part III", "Part IV",
        "Section A", "Section B", "Section C", "Answer Sheet", "Questions ",
        "News Report", "Conversation ", "Passage ", "注意事项", "大学英语四级",
    )
    for line in text.splitlines():
        s = line.strip()
        if not s:
            continue
        if any(s.startswith(m) for m in skip_markers):
            continue
        if re.match(r"^[A-D]\)\s*", s) or re.match(r"^[A-O]\)\s*", s):
            continue
        if re.match(r"^\d{1,2}\.\s*[A-D]\)", s):
            continue
        # Skip Chinese-heavy lines
        zh_chars = len(re.findall(r"[\u4e00-\u9fff]", s))
        if zh_chars > 3:
            continue
        lines.append(s)

    joined = " ".join(lines)
    joined = re.sub(r"\s+", " ", joined)
    # Split on sentence boundaries
    raw_sents = re.split(r"(?<=[.!?])\s+(?=[A-Z\"“])", joined)
    clean = []
    for sent in raw_sents:
        sent = sent.strip().strip('"').strip()
        if not (45 <= len(sent) <= 215):
            continue
        if "_" in sent or "___" in sent or "[A]" in sent or "A)" in sent or "B)" in sent:
            continue
        if re.search(r"\b\d{2}\s*_", sent) or re.search(r"\(\d+\)", sent):
            continue
        # Must look like normal English prose
        if not re.match(r"^[A-Z][A-Za-z0-9 ,;:'\"()%\-\u2014\u2013\u2018\u2019\u201c\u201d]+[.!?]$", sent):
            continue
        # Avoid exam boilerplate sentences
        low = sent.lower()
        if any(bad in low for bad in (
            "answer sheet", "corresponding letter", "blacken", "following passage",
            "mark the", "word bank", "more than once", "attached to it",
            "write an essay", "at least 120", "30 minutes", "cet-4",
            "end of the recording", "you will hear", "directions", "question ",
            "questions ", "section a", "section b", "section c"
        )):
            continue
        clean.append((sent, paper_label))
    return clean


def simple_lemma(word: str) -> str:
    """Conservative lemmatizer to group inflected CET-4 forms cleanly."""
    w = word.lower()
    irregular = {
        "children": "child", "better": "good", "worse": "bad", "brought": "bring",
        "bought": "buy", "caught": "catch", "taught": "teach", "sought": "seek",
        "fought": "fight", "built": "build", "spent": "spend", "sent": "send",
        "lent": "lend", "meant": "mean", "dealt": "deal", "felt": "feel",
        "kept": "keep", "slept": "sleep", "swept": "sweep", "driven": "drive",
        "drove": "drive", "written": "write", "wrote": "write", "spoken": "speak",
        "spoke": "speak", "broken": "break", "broke": "break", "chosen": "choose",
        "chose": "choose", "frozen": "freeze", "froze": "freeze", "grown": "grow",
        "grew": "grow", "thrown": "throw", "threw": "throw", "drawn": "draw",
        "drew": "draw", "fallen": "fall", "fell": "fall", "risen": "rise",
        "rose": "rise", "arisen": "arise", "arose": "arise", "shaken": "shake",
        "shook": "shake", "proven": "prove", "led": "lead", "fed": "feed",
        "held": "hold", "sold": "sell", "paid": "pay", "laid": "lay",
        "struck": "strike", "stuck": "stick", "won": "win", "begun": "begin",
        "began": "begin", "drunk": "drink", "drank": "drink", "shrunk": "shrink",
        "shrank": "shrink", "sunk": "sink", "sank": "sink", "sworn": "swear",
        "worn": "wear", "torn": "tear", "borne": "bear", "forbade": "forbid",
        "forbidden": "forbid", "understood": "understand", "withstood": "withstand",
        "undertook": "undertake", "undertaken": "undertake", "overcame": "overcome",
    }
    if w in irregular:
        return irregular[w]
    return w


def mine_corpus(out_dir: Path | None = None) -> dict:
    paper_texts: dict[str, str] = {}
    doc_freq: collections.Counter[str] = collections.Counter()
    total_freq: collections.Counter[str] = collections.Counter()
    word_sentences: dict[str, list[tuple[str, str]]] = collections.defaultdict(list)
    all_sentences: list[tuple[str, str]] = []

    missing = []
    for label, path in CANONICAL_PAPERS:
        if not path.exists():
            missing.append(str(path))
            continue
        raw = normalize_whitespace(read_any_text(path))
        paper_texts[label] = raw
        tokens = re.findall(r"[A-Za-z]{4,}", raw.lower())
        seen_in_paper = set()
        for tok in tokens:
            if tok in STOP_AND_BOILERPLATE:
                continue
            total_freq[tok] += 1
            seen_in_paper.add(tok)
        for tok in seen_in_paper:
            doc_freq[tok] += 1

        sents = extract_clean_sentences(raw, label)
        all_sentences.extend(sents)
        for sent, src in sents:
            sent_tokens = set(re.findall(r"[A-Za-z]{4,}", sent.lower()))
            for tok in sent_tokens:
                if tok not in STOP_AND_BOILERPLATE and len(word_sentences[tok]) < 6:
                    word_sentences[tok].append((sent, src))

    summary = {
        "papers_parsed": len(paper_texts),
        "missing_papers": missing,
        "unique_tokens": len(total_freq),
        "total_clean_sentences": len(all_sentences),
        "top_600_by_doc_freq": [
            {
                "word": w,
                "docFreq": df,
                "totalFreq": total_freq[w],
                "sampleSentence": word_sentences[w][0] if word_sentences[w] else None,
            }
            for w, df in doc_freq.most_common(600)
        ],
    }

    if out_dir is not None:
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / "corpus_vocab_stats.json").write_text(
            json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        # Save full frequency & sentence lookup table
        full_lookup = {
            w: {
                "docFreq": doc_freq[w],
                "totalFreq": total_freq[w],
                "sentences": word_sentences[w][:4],
            }
            for w, cnt in total_freq.items()
            if cnt >= 2
        }
        (out_dir / "corpus_full_lookup.json").write_text(
            json.dumps(full_lookup, ensure_ascii=False), encoding="utf-8"
        )
        (out_dir / "corpus_all_sentences.json").write_text(
            json.dumps(all_sentences, ensure_ascii=False), encoding="utf-8"
        )

        # Also dump clean text of key target papers & answer keys for exact question extraction
        dump_dir = out_dir / "texts"
        dump_dir.mkdir(exist_ok=True)
        for label in (
            "2017.12 第1套", "2017.12 第2套", "2017.12 第3套",
            "2018.06 第1套", "2018.06 第2套", "2018.06 第3套",
            "2019.12 第1套", "2019.12 第2套", "2019.12 第3套",
            "2024.06 第1套", "2024.06 第2套", "2024.06 第3套",
            "2024.12 第1套", "2024.12 第2套", "2024.12 第3套",
            "2025.06 第1套", "2025.06 第2套", "2025.06 第3套",
            "2025.12 第1套", "2025.12 第2套", "2025.12 第3套",
            "2026.06 第1套", "2026.06 第2套", "2026.06 第3套",
        ):
            if label in paper_texts:
                safe = label.replace(" ", "_").replace(".", "_")
                (dump_dir / f"paper_{safe}.txt").write_text(paper_texts[label], encoding="utf-8")

        for key_name, key_path in CLEAN_ANSWER_KEYS:
            if key_path.exists():
                txt = normalize_whitespace(read_any_text(key_path))
                (dump_dir / f"key_{key_name}.txt").write_text(txt, encoding="utf-8")

    return summary


EMOJI_RE = re.compile(r"[\U0001F300-\U0001FAFF\u2600-\u27BF]")
MOCK_RE = re.compile(r"模拟考|模拟卷|mockExam|data-psub=[\"']mock[\"']|practiceSub.*mock", re.IGNORECASE)


def verify_data_modules() -> int:
    """Verify all 4 generated JS data modules for syntax, editorial rules & integrity."""
    import subprocess

    files = [
        CET4_REVIEW_DIR / "src/vocab_data.js",
        CET4_REVIEW_DIR / "src/knowledge_data.js",
        CET4_REVIEW_DIR / "src/questions_data.js",
        CET4_REVIEW_DIR / "src/explanations_data.js",
    ]
    errors = []
    for f in files:
        if not f.exists():
            errors.append(f"Missing file: {f}")
            continue
        text = f.read_text(encoding="utf-8")
        if EMOJI_RE.search(text):
            errors.append(f"Emoji detected in {f.name}")
        if MOCK_RE.search(text):
            errors.append(f"Mock-exam relic detected in {f.name}")
        res = subprocess.run(["node", "--check", str(f)], capture_output=True, text=True)
        if res.returncode != 0:
            errors.append(f"Syntax error in {f.name}: {res.stderr.strip()}")

    if not errors:
        check_js = r"""
const path = require('path');
const src = process.argv[1];
const v = require(path.join(src, 'vocab_data.js'));
const k = require(path.join(src, 'knowledge_data.js'));
const q = require(path.join(src, 'questions_data.js'));
const e = require(path.join(src, 'explanations_data.js'));

const errs = [];
const assert = (cond, msg) => { if (!cond) errs.push(msg); };

// 1. Vocab checks
assert(Array.isArray(v.VOCAB_DAYS) && v.VOCAB_DAYS.length === 12, 'VOCAB_DAYS must have 12 days');
assert(Array.isArray(v.VOCAB_WORDS) && v.VOCAB_WORDS.length >= 300 && v.VOCAB_WORDS.length <= 360,
  `VOCAB_WORDS length out of 300-360: ${v.VOCAB_WORDS && v.VOCAB_WORDS.length}`);
assert(Array.isArray(v.CONFUSABLE_PAIRS) && v.CONFUSABLE_PAIRS.length >= 24 && v.CONFUSABLE_PAIRS.length <= 30,
  `CONFUSABLE_PAIRS length out of 24-30: ${v.CONFUSABLE_PAIRS && v.CONFUSABLE_PAIRS.length}`);

const dayCounts = {};
const seenWords = new Set();
const seenVIds = new Set();
for (const w of v.VOCAB_WORDS) {
  assert(w.id && !seenVIds.has(w.id), `Duplicate/missing vocab id: ${w.id}`);
  seenVIds.add(w.id);
  const low = (w.word || '').toLowerCase();
  assert(low && !seenWords.has(low), `Duplicate/missing word: ${w.word}`);
  seenWords.add(low);
  assert(w.day >= 1 && w.day <= 12, `Invalid day on ${w.id}`);
  dayCounts[w.day] = (dayCounts[w.day] || 0) + 1;
  assert(w.phonetic && w.pos && w.meaning && w.roots && w.mnemonic && w.tag, `Missing core field on ${w.id}`);
  assert(typeof w.examFreq === 'number' && w.examFreq > 0, `Invalid examFreq on ${w.id}: ${w.examFreq}`);
  assert(Array.isArray(w.collocations) && w.collocations.length >= 2 && w.collocations.every(c => c.en && c.zh),
    `Invalid collocations on ${w.id}`);
  assert(w.realSentence && w.realSentence.en && w.realSentence.zh && w.realSentence.source,
    `Invalid realSentence on ${w.id}`);
  if (w.confusable !== null) {
    assert(w.confusable && w.confusable.word && w.confusable.diff, `Invalid confusable on ${w.id}`);
  }
}
for (const d of v.VOCAB_DAYS) {
  assert(dayCounts[d.day] === d.targetCount, `Day ${d.day} targetCount ${d.targetCount} != actual ${dayCounts[d.day]}`);
  assert(dayCounts[d.day] >= 25 && dayCounts[d.day] <= 30, `Day ${d.day} count ${dayCounts[d.day]} outside 25-30`);
}
for (const cf of v.CONFUSABLE_PAIRS) {
  assert(cf.id && Array.isArray(cf.group) && cf.group.length >= 2, `Invalid confusable group ${cf.id}`);
  assert(Array.isArray(cf.items) && cf.items.length >= 2 && cf.items.every(i => i.word && i.phonetic && i.pos && i.meaning && i.tip && i.example),
    `Invalid confusable items ${cf.id}`);
  assert(cf.quiz && cf.quiz.stem && Array.isArray(cf.quiz.options) && cf.quiz.options.length === 4 &&
    cf.quiz.answerIdx >= 0 && cf.quiz.answerIdx <= 3 && cf.quiz.explain, `Invalid confusable quiz ${cf.id}`);
}

// 2. Knowledge checks
assert(k.SPRINT_PLAN.length === 12, 'SPRINT_PLAN must have 12 days');
assert(k.MASTERY_TOPICS.length === 6, 'MASTERY_TOPICS must have 6 items');
assert(k.KNOWLEDGE_MODULES.length === 6, 'KNOWLEDGE_MODULES must have 6 chapters');
assert(Object.keys(k.KNOWLEDGE_SECTIONS).length === 14, 'KNOWLEDGE_SECTIONS must have 14 sections');
assert(Object.keys(k.TOPIC_SUMMARIES).length === 6, 'TOPIC_SUMMARIES must have 6 skills');
assert(k.XIAOKE_MANTRAS.length === 10, 'XIAOKE_MANTRAS must have 10 items');
for (const [sid, sec] of Object.entries(k.KNOWLEDGE_SECTIONS)) {
  assert(sec.id === sid && sec.coreHtml && sec.mantra && Array.isArray(sec.strategySteps) && sec.strategySteps.length >= 3,
    `Invalid section ${sid}`);
  assert(sec.drill && sec.drill.prompt && sec.drill.options.length === 4 && sec.drill.answerIdx >= 0 && sec.drill.answerIdx <= 3,
    `Invalid drill in ${sid}`);
}

// 3. Questions & Explanations checks
const bySkill = {};
const seenQIds = new Set();
for (const item of q.QUESTION_BANK) {
  assert(item.id && !seenQIds.has(item.id), `Duplicate/missing question id: ${item.id}`);
  seenQIds.add(item.id);
  bySkill[item.skill] = (bySkill[item.skill] || 0) + 1;
  assert(item.type === item.skill, `type != skill on ${item.id}`);
  assert(k.KNOWLEDGE_SECTIONS[item.sectionId], `Unknown sectionId ${item.sectionId} on ${item.id}`);
  assert([1, 2, 3].includes(item.difficulty), `Invalid difficulty on ${item.id}`);
  assert(item.source && item.title, `Missing source/title on ${item.id}`);
  assert(Array.isArray(item.hintSteps) && item.hintSteps.length === 3 && item.hintSteps.every(Boolean),
    `Invalid hintSteps on ${item.id}`);

  if (item.skill === 'listening') {
    assert(['news', 'conversation', 'passage'].includes(item.subtype), `Invalid subtype on ${item.id}`);
    assert(Array.isArray(item.scriptTurns) && item.scriptTurns.length >= 2, `Missing scriptTurns on ${item.id}`);
    assert(Array.isArray(item.options) && item.options.length === 4, `Options must be 4 on ${item.id}`);
    assert(['A', 'B', 'C', 'D'].includes(item.answer), `Invalid answer on ${item.id}`);
    assert(item.preReadCue && item.questionText && item.evidenceQuote && item.paraphraseBridge, `Missing listening fields on ${item.id}`);
  } else if (item.skill === 'cloze') {
    assert(item.passageHtml && Array.isArray(item.wordBank) && item.wordBank.length >= 10, `Invalid cloze bank on ${item.id}`);
    assert(Array.isArray(item.blanks) && item.blanks.length >= 5 && item.blanks.length <= 10, `Invalid cloze blanks count on ${item.id}`);
    const bankCodes = new Set(item.wordBank.map(b => b.code));
    for (const bl of item.blanks) {
      assert(bankCodes.has(bl.answer), `Cloze blank answer ${bl.answer} missing from wordBank on ${item.id}`);
      assert(item.passageHtml.includes(`{{${bl.num}}}`), `Missing {{${bl.num}}} marker in passageHtml on ${item.id}`);
    }
  } else if (item.skill === 'matching') {
    assert(Array.isArray(item.paragraphs) && item.paragraphs.length >= 4, `Too few paragraphs on ${item.id}`);
    const pLabels = new Set(item.paragraphs.map(p => p.label));
    assert(pLabels.has(item.answer), `Matching answer ${item.answer} not in paragraphs on ${item.id}`);
    assert(item.statement && Array.isArray(item.anchorKeywords) && item.anchorKeywords.length >= 2, `Missing matching fields on ${item.id}`);
  } else if (item.skill === 'reading') {
    assert(Array.isArray(item.passageParagraphs) && item.passageParagraphs.length >= 2, `Too few reading paras on ${item.id}`);
    assert(Array.isArray(item.options) && item.options.length === 4 && ['A', 'B', 'C', 'D'].includes(item.answer), `Invalid reading opts/ans on ${item.id}`);
    const joined = item.passageParagraphs.join(' ');
    assert(item.evidenceSentence && joined.includes(item.evidenceSentence), `evidenceSentence not verbatim in passage on ${item.id}`);
    assert(item.trapType && item.questionText, `Missing trapType/questionText on ${item.id}`);
  } else if (item.skill === 'translation') {
    assert(item.chineseText && item.referenceTranslation, `Missing translation texts on ${item.id}`);
    assert(Array.isArray(item.keyExpressions) && item.keyExpressions.length >= 4 &&
      item.keyExpressions.every(ke => ke.zh && Array.isArray(ke.en) && ke.en.length >= 1 && ke.weight > 0),
      `Invalid keyExpressions on ${item.id}`);
    assert(Array.isArray(item.sentenceBreakdown) && item.sentenceBreakdown.length >= 2, `Invalid sentenceBreakdown on ${item.id}`);
  } else if (item.skill === 'writing') {
    assert(item.essayType && item.directions && item.modelEssay, `Missing writing texts on ${item.id}`);
    assert(Array.isArray(item.wordTarget) && item.wordTarget.length === 2, `Invalid wordTarget on ${item.id}`);
    assert(Array.isArray(item.logicBlueprint) && item.logicBlueprint.length === 3, `Invalid logicBlueprint on ${item.id}`);
    assert(Array.isArray(item.transferablePatterns) && item.transferablePatterns.length >= 2, `Invalid transferablePatterns on ${item.id}`);
    assert(Array.isArray(item.topicKeywords) && item.topicKeywords.length >= 5, `Invalid topicKeywords on ${item.id}`);
    assert(Array.isArray(item.sentenceDissection) && item.sentenceDissection.length >= 2, `Invalid sentenceDissection on ${item.id}`);
  }

  const exp = e.EXPLAIN_DETAILS[item.id];
  assert(exp && exp.why && Array.isArray(exp.steps) && exp.steps.length === 3 && exp.pitfall &&
    Array.isArray(exp.vocabHighlights) && exp.vocabHighlights.length >= 2,
    `Missing/incomplete EXPLAIN_DETAILS for ${item.id}`);
}

assert(q.QUESTION_BANK.length >= 72, `Total questions ${q.QUESTION_BANK.length} < 72`);
assert((bySkill.listening || 0) >= 20, `listening ${bySkill.listening} < 20`);
assert((bySkill.cloze || 0) >= 10, `cloze ${bySkill.cloze} < 10`);
assert((bySkill.matching || 0) >= 10, `matching ${bySkill.matching} < 10`);
assert((bySkill.reading || 0) >= 16, `reading ${bySkill.reading} < 16`);
assert((bySkill.translation || 0) >= 8, `translation ${bySkill.translation} < 8`);
assert((bySkill.writing || 0) >= 8, `writing ${bySkill.writing} < 8`);

const extraExp = Object.keys(e.EXPLAIN_DETAILS).filter(id => !seenQIds.has(id));
assert(extraExp.length === 0, `Orphan EXPLAIN_DETAILS keys: ${extraExp.join(', ')}`);

const counts = {
  vocabDays: v.VOCAB_DAYS.length,
  vocabWords: v.VOCAB_WORDS.length,
  confusablePairs: v.CONFUSABLE_PAIRS.length,
  sprintPlan: k.SPRINT_PLAN.length,
  masteryTopics: k.MASTERY_TOPICS.length,
  knowledgeModules: k.KNOWLEDGE_MODULES.length,
  knowledgeSections: Object.keys(k.KNOWLEDGE_SECTIONS).length,
  topicSummaries: Object.keys(k.TOPIC_SUMMARIES).length,
  xiaokeMantras: k.XIAOKE_MANTRAS.length,
  questionsTotal: q.QUESTION_BANK.length,
  questionsBySkill: bySkill,
  explanationsTotal: Object.keys(e.EXPLAIN_DETAILS).length,
};
console.log(JSON.stringify({ counts, errorCount: errs.length, sampleErrors: errs.slice(0, 20) }, null, 2));
if (errs.length) process.exit(2);
"""
        res = subprocess.run(
            ["node", "-e", check_js, str(CET4_REVIEW_DIR / "src")],
            capture_output=True, text=True,
        )
        print(res.stdout)
        if res.returncode != 0:
            errors.append(f"Node integrity check failed: {res.stderr.strip()}")

    if errors:
        for err in errors:
            print("ERROR:", err, file=sys.stderr)
        return 1
    print("ALL DATA MODULES VERIFIED CLEANLY.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="CET-4 corpus extractor & data verifier")
    parser.add_argument("--out-dir", type=Path, default=None, help="Output scratch directory for corpus dump")
    parser.add_argument("--verify", action="store_true", help="Verify generated JS data modules")
    args = parser.parse_args()

    if args.verify:
        return verify_data_modules()

    summary = mine_corpus(args.out_dir)
    print(
        f"Parsed {summary['papers_parsed']} clean CET-4 papers "
        f"({len(summary['missing_papers'])} missing), "
        f"{summary['unique_tokens']} unique tokens, "
        f"{summary['total_clean_sentences']} clean exam sentences."
    )
    if summary["missing_papers"]:
        print("Missing:", summary["missing_papers"])
    if args.out_dir:
        print(f"Wrote corpus stats & clean texts to: {args.out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
