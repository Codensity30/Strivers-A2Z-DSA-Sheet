#!/usr/bin/env python3
"""
scripts/build_data.py
Scans all 16 DSA topic directories, extracts metadata, question statements,
Brute/Better/Optimal approaches, C++ solutions, complexities, and visualizer types,
and outputs data/problems.json and data/problems.js.
"""

import os
import glob
import re
import json

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT_DIR, "data")

TOPIC_DIRS = [
    "01.Arrays",
    "02.Binary Search",
    "03.Strings",
    "04.Linked List",
    "05.Recursion",
    "06.Bit Manipulation",
    "07.Stack and Queues",
    "08. Sliding Window",
    "09. Heaps",
    "10. Greedy Approach",
    "11. Binary Trees",
    "12. Binary Search Trees",
    "13. Graphs",
    "14. Dynamic Programming",
    "15. Tries",
    "16. Strings (Hard)"
]

def clean_title(filename):
    base = os.path.basename(filename)
    clean = re.sub(r'\.cpp$', '', base, flags=re.I)
    clean = re.sub(r'^\d+[\._\s-]*', '', clean)
    clean = re.sub(r'[_-]+', ' ', clean)
    clean = clean.replace('&', ' & ')
    words = clean.split()
    capitalized = []
    acronyms = {'BST', 'DFS', 'BFS', 'LCS', 'LIS', 'DAG', 'MST', 'KMP', 'DLL', 'SLL', 'DP'}
    for w in words:
        if w.upper() in acronyms:
            capitalized.append(w.upper())
        elif re.match(r'^\d+[A-Za-z]+$', w):
            capitalized.append(w)
        else:
            capitalized.append(w.capitalize())
    return " ".join(capitalized).strip()

def infer_difficulty(subtopic, filename):
    combined = f"{subtopic} {filename}".lower()
    if any(k in combined for k in ["easy", "basic", "learning"]):
        return "Easy"
    if any(k in combined for k in ["hard", "advanced"]):
        return "Hard"
    return "Medium"

def detect_visualizer_type(filename, topic):
    lower = f"{filename} {topic}".lower()
    if "kadane" in lower:
        return "kadane"
    if any(k in lower for k in ["2_sum", "two_sum", "2 sum", "two sum"]):
        return "two-sum"
    if any(k in lower for k in ["sort_0_1_2", "sort 0 1 2", "dutch"]):
        return "dutch-flag"
    if "binary_search" in lower or ("binary search" in lower and "tree" not in lower):
        return "binary-search"
    if "majority_element" in lower or "majority element" in lower:
        return "majority-element"
    if any(k in lower for k in ["rotate_array", "move_0", "largest_element", "second_largest", "linear_search"]):
        return "array-stepper"
    if "sliding window" in lower or "sliding_window" in lower or any(k in lower for k in ["substring", "consecutive", "fruit"]):
        return "sliding-window"
    if "linked list" in lower:
        return "linked-list"
    if "stack" in lower or "queue" in lower:
        return "stack-queue"
    if "binary search tree" in lower or "bst" in lower:
        return "binary-search-tree"
    if "binary tree" in lower or "tree" in lower:
        return "binary-tree"
    if "graph" in lower or any(k in lower for k in ["bfs", "dfs", "dijkstra", "topo", "provinces", "islands", "cycle"]):
        return "graph-traversal"
    if any(k in lower for k in ["unique path", "minimum path", "knapsack", "lcs", "common subsequence", "matrix", "grid"]) or "dynamic programming" in lower:
        return "dp-grid"
    if "heap" in lower or "priority" in lower:
        return "heap-priority-queue"
    if "greedy" in lower or any(k in lower for k in ["meeting", "interval", "platform", "job", "cookie", "lemonade", "candy", "jump"]):
        return "greedy-intervals"
    if "trie" in lower:
        return "trie-prefix-tree"
    if any(k in lower for k in ["kmp", "z_algorithm", "rabin", "lps", "prefix"]) or "strings (hard)" in lower:
        return "string-matching-kmp"
    if "recursion" in lower or any(k in lower for k in ["subset", "combination", "queens", "maze", "partitioning", "sudoku"]):
        return "recursion-tree"
    if "bit" in lower or any(k in lower for k in ["xor", "sieve", "power"]):
        return "bit-manipulation"
    if "strings" in lower or "string" in lower:
        return "string-algo"
    if "arrays" in lower:
        return "array-stepper"
    return "array-stepper"

def extract_complexities(text):
    tc = "O(N)"
    sc = "O(1)"
    
    tc_match = re.search(r'(?:TIME\s*COMPLEXITY|Time\s*Complexity)[\s=:*-]+([^\n\r]+)', text, re.I)
    if tc_match:
        tc = re.sub(r'^\s*[:=]\s*', '', tc_match.group(1)).split('*/')[0].strip()
        tc = re.sub(r'\s*\/\/.*$', '', tc).strip()
        
    sc_match = re.search(r'(?:SPACE\s*COMPLEXITY|Space\s*Complexity)[\s=:*-]+([^\n\r]+)', text, re.I)
    if sc_match:
        sc = re.sub(r'^\s*[:=]\s*', '', sc_match.group(1)).split('*/')[0].strip()
        sc = re.sub(r'\s*\/\/.*$', '', sc).strip()
        
    return tc, sc

def clean_markdown(text):
    if not text:
        return ""
    text = re.sub(r'/\*+', '', text)
    text = re.sub(r'\*+/', '', text)
    return text.strip()

def parse_cpp_file(file_path):
    rel_path = os.path.relpath(file_path, ROOT_DIR)
    parts = rel_path.split(os.sep)
    topic = parts[0] if len(parts) > 0 else "Miscellaneous"
    subtopic = parts[1] if len(parts) > 2 else "General"
    filename = parts[-1]
    title = clean_title(filename)
    difficulty = infer_difficulty(subtopic, filename)
    slug_id = re.sub(r'[^a-z0-9]+', '-', rel_path.lower()).strip('-')
    visualizer_type = detect_visualizer_type(filename, topic)

    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Question extraction
    question = ""
    q_match = re.search(r'/\*\s*(?:QUESTION|Question)[\s:-]*([\s\S]*?)(?=(?:/\*\s*(?:APPROACH|BRUTE|BETTER|OPTIMAL)|APPROACH|BRUTE FORCE|// CODE|\*/))', content, re.I)
    if q_match:
        question = clean_markdown(q_match.group(1))
    else:
        # Check first block comment
        first_comment = re.search(r'/\*([\s\S]*?)\*/', content)
        if first_comment:
            question = clean_markdown(first_comment.group(1))
        else:
            question = f"Problem: {title}. Refer to the approach and code below."

    # Approaches
    has_brute = bool(re.search(r'brute\s*force', content, re.I))
    has_better = bool(re.search(r'better\s*(?:approach|solution)', content, re.I))
    has_optimal = bool(re.search(r'optimal\s*(?:approach|solution)', content, re.I)) or (not has_brute and not has_better)

    approaches = []

    if has_brute or (has_better and has_optimal):
        approach_pattern = re.compile(r'(?:BRUTE\s*FORCE|BETTER\s*APPROACH|OPTIMAL\s*APPROACH)[^\n]*[\s\S]*?(?=(?:BRUTE\s*FORCE|BETTER\s*APPROACH|OPTIMAL\s*APPROACH|\*/|$))', re.I)
        sections = approach_pattern.findall(content)
        for sec in sections:
            type_label = "Optimal"
            if re.search(r'brute', sec, re.I):
                type_label = "Brute Force"
            elif re.search(r'better', sec, re.I):
                type_label = "Better"
            elif re.search(r'optimal', sec, re.I):
                type_label = "Optimal"

            tc, sc = extract_complexities(sec)
            code_parts = re.split(r'(?:CODE|Code)[\s:-]*', sec, flags=re.I)
            if len(code_parts) > 1:
                algo = clean_markdown(code_parts[0])
                code = clean_markdown(code_parts[1])
            else:
                algo = clean_markdown(sec)
                code = "// Solution implementation"

            algo = re.sub(r'(?:TIME|SPACE)\s*COMPLEXITY[^\n]*\n?', '', algo, flags=re.I)
            algo = re.sub(r'^(?:BRUTE\s*FORCE|BETTER\s*APPROACH|OPTIMAL\s*APPROACH)[^\n]*\n?', '', algo, flags=re.I).strip()

            approaches.append({
                "type": type_label,
                "algorithm": algo or "Follow standard algorithm approach.",
                "code": code,
                "timeComplexity": tc,
                "spaceComplexity": sc
            })

    if not approaches:
        algo = ""
        app_match = re.search(r'(?:APPROACH|Approach|APROACH)[\s:-]*([\s\S]*?)(?=(?:\*/|// CODE|\bCODE\b))', content, re.I)
        if app_match:
            algo = clean_markdown(app_match.group(1))
        else:
            algo = "Direct algorithm implementation. See code below."

        tc, sc = extract_complexities(content)

        # Code extraction
        code_match = re.search(r'(?://\s*CODE[\s:-]*|\bCODE\s*:\s*\*\/)([\s\S]*?)(?=(?://\s*TIME|/\*\s*Time|$))', content, re.I)
        if code_match:
            code = code_match.group(1).strip()
        else:
            stripped = re.sub(r'/\*[\s\S]*?\*/', '', content)
            stripped = re.sub(r'//[^\n]*', '', stripped).strip()
            code = stripped or "// Refer to solution code"

        code = re.sub(r'//\s*(?:TIME|SPACE)\s*COMPLEXITY[\s\S]*$', '', code, flags=re.I).strip()

        approaches.append({
            "type": "Optimal",
            "algorithm": algo,
            "code": code,
            "timeComplexity": tc,
            "spaceComplexity": sc
        })

    return {
        "id": slug_id,
        "title": title,
        "topic": topic,
        "subtopic": subtopic,
        "difficulty": difficulty,
        "filePath": rel_path,
        "question": question,
        "approaches": approaches,
        "hasBrute": has_brute,
        "hasBetter": has_better,
        "hasOptimal": any(a["type"] == "Optimal" for a in approaches),
        "visualizationType": visualizer_type
    }

def main():
    os.makedirs(DATA_DIR, exist_ok=True)
    all_problems = []

    print("🚀 Starting compilation of takeuforward-for-free DSA dataset...")

    cpp_files = []
    for topic_dir in TOPIC_DIRS:
        full_dir = os.path.join(ROOT_DIR, topic_dir)
        if os.path.exists(full_dir):
            files = sorted(glob.glob(os.path.join(full_dir, "**/*.cpp"), recursive=True))
            cpp_files.extend(files)

    print(f"Found {len(cpp_files)} problem files across {len(TOPIC_DIRS)} topics.")

    for fpath in cpp_files:
        try:
            problem = parse_cpp_file(fpath)
            all_problems.append(problem)
        except Exception as e:
            print(f"Error parsing {fpath}: {e}")

    # Output JSON file
    json_path = os.path.join(DATA_DIR, "problems.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(all_problems, f, indent=2)

    # Output to src/data/problems.json for React/Vite application
    src_data_dir = os.path.join(ROOT_DIR, "src", "data")
    os.makedirs(src_data_dir, exist_ok=True)
    src_json_path = os.path.join(src_data_dir, "problems.json")
    with open(src_json_path, "w", encoding="utf-8") as f:
        json.dump(all_problems, f, indent=2)

    # Output JS file (for zero-CORS file:/// compatibility)
    js_path = os.path.join(DATA_DIR, "problems.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("/** Auto-generated by scripts/build_data.py */\n")
        f.write("window.PROBLEMS_DATA = ")
        json.dump(all_problems, f, indent=2)
        f.write(";\n")

    print(f"✅ Successfully compiled {len(all_problems)} problems:")
    print(f"   -> JSON: {json_path}")
    print(f"   -> JS (zero-CORS): {js_path}")

    # Summary by topic
    topics = {}
    for p in all_problems:
        topics[p['topic']] = topics.get(p['topic'], 0) + 1

    print("\n📊 Problem Count by Topic:")
    for t, c in sorted(topics.items()):
        print(f"   • {t}: {c} problems")

if __name__ == "__main__":
    main()
