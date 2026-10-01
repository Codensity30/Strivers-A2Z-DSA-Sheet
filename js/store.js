/**
 * Store & State Management Module
 * Handles progress tracking, search & filter queries, grouping, and localStorage persistence.
 */

const STORAGE_KEYS = {
  SOLVED: 'takeuforward_solved_ids',
  BOOKMARKS: 'takeuforward_bookmark_ids',
  NOTES: 'takeuforward_notes_map',
  THEME: 'takeuforward_theme'
};

export function calculateProgress(problems, solvedSet) {
  if (!problems || problems.length === 0) {
    return { total: 0, solved: 0, percentage: 0 };
  }
  const total = problems.length;
  let solved = 0;
  for (const p of problems) {
    if (solvedSet.has(p.id)) solved++;
  }
  const percentage = Math.round((solved / total) * 100);
  return { total, solved, percentage };
}

export function filterProblems(problems, options = {}) {
  const {
    search = '',
    difficulty = 'all',
    topic = 'all',
    status = 'all',
    solvedSet = new Set(),
    bookmarkSet = new Set()
  } = options;

  const query = search.trim().toLowerCase();

  return problems.filter(p => {
    // Search match
    if (query) {
      const matchTitle = p.title.toLowerCase().includes(query);
      const matchQuestion = p.question ? p.question.toLowerCase().includes(query) : false;
      const matchTopic = p.topic.toLowerCase().includes(query);
      const matchSubtopic = p.subtopic ? p.subtopic.toLowerCase().includes(query) : false;
      if (!matchTitle && !matchQuestion && !matchTopic && !matchSubtopic) {
        return false;
      }
    }

    // Difficulty filter
    if (difficulty !== 'all' && p.difficulty.toLowerCase() !== difficulty.toLowerCase()) {
      return false;
    }

    // Topic filter
    if (topic !== 'all' && p.topic !== topic) {
      return false;
    }

    // Status filter
    if (status === 'solved' && !solvedSet.has(p.id)) return false;
    if (status === 'unsolved' && solvedSet.has(p.id)) return false;
    if (status === 'bookmarked' && !bookmarkSet.has(p.id)) return false;

    return true;
  });
}

export function groupProblemsByTopic(problems) {
  const grouped = {};
  for (const p of problems) {
    if (!grouped[p.topic]) {
      grouped[p.topic] = {};
    }
    const sub = p.subtopic || 'General';
    if (!grouped[p.topic][sub]) {
      grouped[p.topic][sub] = [];
    }
    grouped[p.topic][sub].push(p);
  }
  return grouped;
}

// LocalStorage helpers (Safe for SSR or Node test environments)
function getStorageItem(key, defaultVal) {
  if (typeof localStorage === 'undefined') return defaultVal;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStorageItem(key, val) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

export class AppStore {
  constructor() {
    this.solvedSet = new Set(getStorageItem(STORAGE_KEYS.SOLVED, []));
    this.bookmarkSet = new Set(getStorageItem(STORAGE_KEYS.BOOKMARKS, []));
    this.notesMap = getStorageItem(STORAGE_KEYS.NOTES, {});
    this.theme = (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEYS.THEME)) || 'dark';
  }

  isSolved(problemId) {
    return this.solvedSet.has(problemId);
  }

  toggleSolved(problemId) {
    if (this.solvedSet.has(problemId)) {
      this.solvedSet.delete(problemId);
    } else {
      this.solvedSet.add(problemId);
    }
    const arr = Array.from(this.solvedSet);
    setStorageItem(STORAGE_KEYS.SOLVED, arr);
    setStorageItem('takeuforward_solved', arr);
    return this.solvedSet.has(problemId);
  }

  isBookmarked(problemId) {
    return this.bookmarkSet.has(problemId);
  }

  toggleBookmark(problemId) {
    if (this.bookmarkSet.has(problemId)) {
      this.bookmarkSet.delete(problemId);
    } else {
      this.bookmarkSet.add(problemId);
    }
    const arr = Array.from(this.bookmarkSet);
    setStorageItem(STORAGE_KEYS.BOOKMARKS, arr);
    setStorageItem('takeuforward_bookmarked_ids', arr);
    return this.bookmarkSet.has(problemId);
  }

  getNote(problemId) {
    return this.notesMap[problemId] || '';
  }

  saveNote(problemId, noteText) {
    if (!noteText || !noteText.trim()) {
      delete this.notesMap[problemId];
    } else {
      this.notesMap[problemId] = noteText.trim();
    }
    setStorageItem(STORAGE_KEYS.NOTES, this.notesMap);
  }

  getTheme() {
    return this.theme;
  }

  setTheme(theme) {
    this.theme = theme;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
  }

  resetAllProgress() {
    this.solvedSet.clear();
    this.bookmarkSet.clear();
    this.notesMap = {};
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.SOLVED);
      localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
      localStorage.removeItem(STORAGE_KEYS.NOTES);
    }
  }
}
