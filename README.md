# takeuforward-for-free

A focused, distraction-free learning companion for Striver's A2Z DSA Sheet.
The repository contains the original C++ solutions and a static website for
studying problems, approaches, complexity, and progress in one place.

## Features

- Coverage of the A2Z sheet across 16 DSA topics and their subtopics.
- Problem statements, approaches, C++ solutions, and time and space complexity.
- Brute, better, and optimal solution explanations where available.
- Search by problem name or concept.
- Filters by topic, difficulty, and completion status.
- Interactive visualizers for selected algorithms, including Kadane's
  Algorithm, Binary Search, Two Sum, Dutch National Flag, Majority Element,
  and array pointer movement.
- Local progress tracking, bookmarks, and personal notes using browser storage.
- Dark and light display modes.

## Local Usage

The website is a static application and can be used locally without a backend.

### Open directly

Open `index.html` in a browser.

### Use a local server

From the repository root, run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser.

## Update the Dataset

When C++ solution files are added or changed, rebuild the generated problem
data:

```bash
npm run build
```

The data builder scans the topic directories and updates the generated problem
data used by the website.

## Run Tests

Run the automated test suite with:

```bash
npm test
```

## Repository Structure

- `01.Arrays/` through `16. Strings (Hard)/`: DSA problems and C++ solutions.
- `index.html`: Main learning interface.
- `css/`: Website styles and design tokens.
- `js/`: Parsing, application state, visualizers, and UI logic.
- `data/`: Generated problem datasets.
- `scripts/build_data.py`: Dataset generation script.
- `test/`: Automated tests.

## Learning Note

Try to solve each problem before reading the approach or code. The solutions
are intended as a reference and learning aid, not as a replacement for
understanding the underlying technique.
