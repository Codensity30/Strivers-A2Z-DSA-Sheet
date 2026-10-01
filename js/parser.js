/**
 * C++ Problem Parser module
 * Extracts Question, Approaches (Brute, Better, Optimal), Code, and Complexity from .cpp problem files.
 */

export function cleanTitle(filename) {
  // Strip path if present
  const base = filename.split(/[/\\]/).pop();
  // Strip .cpp extension
  let clean = base.replace(/\.cpp$/i, '');
  // Remove leading numbering like '01.', '1.', '01_'
  clean = clean.replace(/^\d+[\._\s-]*/, '');
  // Replace underscores and dashes with spaces
  clean = clean.replace(/[_-]+/g, ' ');
  // Handle '&' -> ' & '
  clean = clean.replace(/&/g, ' & ');
  // Capitalize words cleanly
  clean = clean
    .split(' ')
    .filter(Boolean)
    .map(w => {
      // Keep acronyms or known formats
      if (/^(BST|DFS|BFS|LCS|LIS|DAG|MST|KMP|DLL|SLL|DP)$/i.test(w)) return w.toUpperCase();
      if (/^\d+[A-Za-z]+$/.test(w)) return w; // e.g., '1place', '0sum'
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(' ');
  return clean.trim();
}

export function detectVisualizerType(filename, topic) {
  const lower = (filename + ' ' + topic).toLowerCase();

  if (/kadane/i.test(lower)) return 'kadane';
  if (/2_sum|two_sum|2 sum|two sum/i.test(lower)) return 'two-sum';
  if (/sort_0_1_2|sort 0 1 2|dutch/i.test(lower)) return 'dutch-flag';
  if (/binary_search|binary search/i.test(lower) && !/tree/i.test(lower)) return 'binary-search';
  if (/majority_element|majority element/i.test(lower)) return 'majority-element';
  if (/rotate_array|move_0|largest_element|second_largest|linear_search/i.test(lower)) return 'array-stepper';
  if (/sliding_window|sliding window|substring|consecutive|fruit/i.test(lower)) return 'sliding-window';
  if (/linked list/i.test(lower)) return 'linked-list';
  if (/stack|queue/i.test(lower)) return 'stack-queue';
  if (/binary search tree|bst/i.test(lower)) return 'binary-search-tree';
  if (/binary tree|tree/i.test(lower)) return 'binary-tree';
  if (/graph|bfs|dfs|dijkstra|topo|provinces|islands|cycle/i.test(lower)) return 'graph-traversal';
  if (/unique path|minimum path|knapsack|lcs|common subsequence|matrix|grid|dynamic programming|dp/i.test(lower)) return 'dp-grid';
  if (/heap|priority/i.test(lower)) return 'heap-priority-queue';
  if (/greedy|meeting|interval|platform|job|cookie|lemonade|candy|jump/i.test(lower)) return 'greedy-intervals';
  if (/trie/i.test(lower)) return 'trie-prefix-tree';
  if (/kmp|z_algorithm|rabin|lps|prefix|strings \(hard\)/i.test(lower)) return 'string-matching-kmp';
  if (/recursion|subset|combination|queens|maze|partitioning|sudoku/i.test(lower)) return 'recursion-tree';
  if (/bit|xor|sieve|power/i.test(lower)) return 'bit-manipulation';
  if (/strings|string/i.test(lower)) return 'string-algo';

  // Fallback to array-stepper for Array topic or default
  if (/arrays/i.test(lower)) return 'array-stepper';

  return 'array-stepper';
}

export function inferDifficulty(subtopic, filename) {
  const combined = (subtopic + ' ' + filename).toLowerCase();
  if (combined.includes('easy') || combined.includes('basic') || combined.includes('learning')) return 'Easy';
  if (combined.includes('hard') || combined.includes('advanced')) return 'Hard';
  return 'Medium';
}

function cleanMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\/\*+/g, '')
    .replace(/\*+\//g, '')
    .trim();
}

export function parseCppContent(content, relativePath) {
  const parts = relativePath.split(/[/\\]/);
  const topic = parts[0] || 'Miscellaneous';
  const subtopic = parts.length > 2 ? parts[1] : 'General';
  const filename = parts[parts.length - 1];
  const title = cleanTitle(filename);
  const difficulty = inferDifficulty(subtopic, filename);
  const id = relativePath
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const visualizationType = detectVisualizerType(filename, topic);

  // Check for multi-approach (Brute Force, Better, Optimal)
  const hasBrute = /brute\s*force/i.test(content);
  const hasBetter = /better\s*(?:approach|solution)/i.test(content);
  const hasOptimal = /optimal\s*(?:approach|solution)/i.test(content) || (!hasBrute && !hasBetter);

  let question = '';
  let approaches = [];

  // Extract Question
  const questionMatch = content.match(/\/\*\s*(?:QUESTION|Question)[\s:-]*([\s\S]*?)(?=(?:\/\*\s*(?:APPROACH|BRUTE|BETTER|OPTIMAL)|APPROACH|BRUTE FORCE|\/\/ CODE|\*\/))/i);
  if (questionMatch) {
    question = questionMatch[1].trim();
  } else {
    // If no explicit question marker, check first block comment
    const firstComment = content.match(/\/\*([\s\S]*?)\*\//);
    if (firstComment) {
      question = firstComment[1].trim();
    } else {
      question = `Problem: ${title}. Refer to the approach and code below.`;
    }
  }

  // Extract complexities
  function extractComplexities(text) {
    let tc = 'O(N)';
    let sc = 'O(1)';

    const tcMatch = text.match(/(?:TIME\s*COMPLEXITY|Time\s*Complexity)[\s=:*-]+([^\n\r]+)/i);
    if (tcMatch) {
      tc = tcMatch[1].replace(/^\s*[:=]\s*/, '').replace(/\*\/.*$/, '').trim();
    }

    const scMatch = text.match(/(?:SPACE\s*COMPLEXITY|Space\s*Complexity)[\s=:*-]+([^\n\r]+)/i);
    if (scMatch) {
      sc = scMatch[1].replace(/^\s*[:=]\s*/, '').replace(/\*\/.*$/, '').trim();
    }

    return { tc, sc };
  }

  // Multi-approach parsing
  if (hasBrute || (hasBetter && hasOptimal)) {
    // Split into approach sections
    const approachPattern = /(?:BRUTE\s*FORCE|BETTER\s*APPROACH|OPTIMAL\s*APPROACH)[^\n]*[\s\S]*?(?=(?:BRUTE\s*FORCE|BETTER\s*APPROACH|OPTIMAL\s*APPROACH|\*\/|$))/gi;
    const matches = content.match(approachPattern);

    if (matches && matches.length > 0) {
      for (const section of matches) {
        let type = 'Optimal';
        if (/brute/i.test(section)) type = 'Brute Force';
        else if (/better/i.test(section)) type = 'Better';
        else if (/optimal/i.test(section)) type = 'Optimal';

        const { tc, sc } = extractComplexities(section);

        // Separate algorithm and code
        let algo = '';
        let code = '';
        const codeSplit = section.split(/(?:CODE|Code)[\s:-]*/i);
        if (codeSplit.length > 1) {
          algo = cleanMarkdown(codeSplit[0]);
          code = codeSplit.slice(1).join('\n').replace(/\*\/[\s\S]*$/, '').trim();
        } else {
          algo = cleanMarkdown(section);
        }

        // Clean algo of TC/SC lines
        algo = algo
          .replace(/(?:TIME|SPACE)\s*COMPLEXITY[^\n]*\n?/gi, '')
          .replace(/^(?:BRUTE\s*FORCE|BETTER\s*APPROACH|OPTIMAL\s*APPROACH)[^\n]*\n?/i, '')
          .trim();

        approaches.push({
          type,
          algorithm: algo || 'Follow standard approach steps.',
          code: code || '// Code implementation detailed in solution',
          timeComplexity: tc,
          spaceComplexity: sc
        });
      }
    }
  }

  // Single approach parsing or fallback
  if (approaches.length === 0) {
    let algo = '';
    const approachMatch = content.match(/(?:APPROACH|Approach)[\s:-]*([\s\S]*?)(?=(?:\*\/|\/\/ CODE|\bCODE\b))/i);
    if (approachMatch) {
      algo = cleanMarkdown(approachMatch[1]);
    } else {
      algo = 'Direct algorithm implementation. See code and comments below.';
    }

    const { tc, sc } = extractComplexities(content);

    // Extract C++ code
    let code = '';
    // Look for code after CODE marker or code outside comments
    const codeMatch = content.match(/(?:\/\/\s*CODE[\s:-]*|\bCODE\s*:\s*\*\/)([\s\S]*?)(?=(?:\/\/\s*TIME|\/\*\s*Time|$))/i);
    if (codeMatch) {
      code = codeMatch[1].trim();
    } else {
      // Find code outside comments
      const strippedComments = content
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/[^\n]*/g, '')
        .trim();
      code = strippedComments || '// Refer to solution code';
    }

    // Clean up code from trailing complexity comments
    code = code.replace(/\/\/\s*(?:TIME|SPACE)\s*COMPLEXITY[\s\S]*$/i, '').trim();

    approaches.push({
      type: 'Optimal',
      algorithm: algo,
      code: code,
      timeComplexity: tc,
      spaceComplexity: sc
    });
  }

  return {
    id,
    title,
    topic,
    subtopic,
    difficulty,
    filePath: relativePath,
    question: cleanMarkdown(question),
    approaches,
    hasBrute,
    hasBetter,
    hasOptimal: approaches.some(a => a.type === 'Optimal'),
    visualizationType
  };
}
