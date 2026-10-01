import { useState, useEffect, useMemo, useCallback } from 'react';
import rawProblems from '../data/problems.json' with { type: 'json' };

const STORAGE_KEYS = {
  SOLVED_PRIMARY: 'takeuforward_solved_ids',
  SOLVED_ALIASES: [
    'takeuforward_solved_ids',
    'takeuforward_solved',
    'solved_problems',
    'strivers_solved_ids',
    'strivers_sheet_progress'
  ],
  BOOKMARKS_PRIMARY: 'takeuforward_bookmarked_ids',
  BOOKMARKS_ALIASES: [
    'takeuforward_bookmarked_ids',
    'takeuforward_bookmark_ids',
    'takeuforward_bookmarks',
    'bookmarked_problems'
  ],
  NOTES: 'takeuforward_notes_map'
};

// Build normalization index from rawProblems
const PROBLEM_ID_LOOKUP = new Map();
rawProblems.forEach(p => {
  PROBLEM_ID_LOOKUP.set(p.id, p.id);
  if (p.filePath) {
    PROBLEM_ID_LOOKUP.set(p.filePath, p.id);
    PROBLEM_ID_LOOKUP.set(p.filePath.toLowerCase(), p.id);
    const base = p.filePath.split('/').pop().replace(/\.cpp$/i, '');
    PROBLEM_ID_LOOKUP.set(base, p.id);
    PROBLEM_ID_LOOKUP.set(base.toLowerCase(), p.id);
  }
  if (p.title) {
    PROBLEM_ID_LOOKUP.set(p.title, p.id);
    PROBLEM_ID_LOOKUP.set(p.title.toLowerCase(), p.id);
  }
});

function resolveProblemId(savedIdentifier) {
  if (!savedIdentifier) return null;
  const str = String(savedIdentifier).trim();
  if (PROBLEM_ID_LOOKUP.has(str)) return PROBLEM_ID_LOOKUP.get(str);
  if (PROBLEM_ID_LOOKUP.has(str.toLowerCase())) return PROBLEM_ID_LOOKUP.get(str.toLowerCase());
  return str;
}

function loadStoredSet(aliases) {
  if (typeof localStorage === 'undefined') return new Set();
  const resultSet = new Set();
  for (const key of aliases) {
    try {
      const val = localStorage.getItem(key);
      if (val) {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) {
          parsed.forEach(item => {
            const resolved = resolveProblemId(item);
            if (resolved) resultSet.add(resolved);
          });
        }
      }
    } catch {
      // Ignore legacy parsing errors
    }
  }
  return resultSet;
}

function loadStoredNotes() {
  if (typeof localStorage === 'undefined') return {};
  try {
    const val = localStorage.getItem(STORAGE_KEYS.NOTES);
    return val ? JSON.parse(val) : {};
  } catch {
    return {};
  }
}

export function useStore() {
  const [problems] = useState(rawProblems);

  // Solved IDs from LocalStorage with multi-key alias support and normalization
  const [solvedIds, setSolvedIds] = useState(() => loadStoredSet(STORAGE_KEYS.SOLVED_ALIASES));

  // Bookmarked IDs from LocalStorage
  const [bookmarkedIds, setBookmarkedIds] = useState(() => loadStoredSet(STORAGE_KEYS.BOOKMARKS_ALIASES));

  // Personal problem notes map
  const [notes, setNotes] = useState(() => loadStoredNotes());

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [visualizerOnly, setVisualizerOnly] = useState(false);

  // Active Problem for Detail Modal
  const [activeProblem, setActiveProblem] = useState(null);

  // Sync Solved IDs to LocalStorage (multi-key sync for maximum compatibility)
  useEffect(() => {
    try {
      const list = Array.from(solvedIds);
      const json = JSON.stringify(list);
      localStorage.setItem(STORAGE_KEYS.SOLVED_PRIMARY, json);
      localStorage.setItem('takeuforward_solved', json);
    } catch (e) {
      console.error('Failed to save solved IDs', e);
    }
  }, [solvedIds]);

  // Sync Bookmarks to LocalStorage (writes to both bookmarked and bookmark keys)
  useEffect(() => {
    try {
      const list = Array.from(bookmarkedIds);
      const json = JSON.stringify(list);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS_PRIMARY, json);
      localStorage.setItem('takeuforward_bookmark_ids', json);
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarkedIds]);

  // Sync Notes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  }, [notes]);

  // Actions
  const toggleSolved = useCallback((rawId) => {
    const id = resolveProblemId(rawId) || rawId;
    setSolvedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((rawId) => {
    const id = resolveProblemId(rawId) || rawId;
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const saveNote = useCallback((rawId, text) => {
    const id = resolveProblemId(rawId) || rawId;
    setNotes(prev => {
      const next = { ...prev };
      if (!text || !text.trim()) {
        delete next[id];
      } else {
        next[id] = text;
      }
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all solved status, bookmarks, and notes?')) {
      setSolvedIds(new Set());
      setBookmarkedIds(new Set());
      setNotes({});
      try {
        STORAGE_KEYS.SOLVED_ALIASES.forEach(k => localStorage.removeItem(k));
        STORAGE_KEYS.BOOKMARKS_ALIASES.forEach(k => localStorage.removeItem(k));
        localStorage.removeItem(STORAGE_KEYS.NOTES);
      } catch (e) {
        console.error('Failed to clear storage', e);
      }
    }
  }, []);

  const exportProgress = useCallback(() => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      solvedCount: solvedIds.size,
      bookmarkCount: bookmarkedIds.size,
      solvedIds: Array.from(solvedIds),
      bookmarkedIds: Array.from(bookmarkedIds),
      notes
    };
    return JSON.stringify(data, null, 2);
  }, [solvedIds, bookmarkedIds, notes]);

  const importProgress = useCallback((jsonStr) => {
    try {
      const data = JSON.parse(jsonStr);
      if (Array.isArray(data.solvedIds)) {
        setSolvedIds(prev => {
          const merged = new Set(prev);
          data.solvedIds.forEach(id => {
            const res = resolveProblemId(id);
            if (res) merged.add(res);
          });
          return merged;
        });
      }
      if (Array.isArray(data.bookmarkedIds)) {
        setBookmarkedIds(prev => {
          const merged = new Set(prev);
          data.bookmarkedIds.forEach(id => {
            const res = resolveProblemId(id);
            if (res) merged.add(res);
          });
          return merged;
        });
      }
      if (data.notes && typeof data.notes === 'object') {
        setNotes(prev => ({ ...prev, ...data.notes }));
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const pickRandomProblem = useCallback(() => {
    if (problems.length === 0) return;
    const randomIndex = Math.floor(Math.random() * problems.length);
    setActiveProblem(problems[randomIndex]);
  }, [problems]);

  // Filtered problems computation
  const filteredProblems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return problems.filter(p => {
      // Query filter
      if (q) {
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesTopic = p.topic.toLowerCase().includes(q);
        const matchesSubtopic = p.subtopic?.toLowerCase().includes(q);
        const matchesQuestion = p.question?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTopic && !matchesSubtopic && !matchesQuestion) {
          return false;
        }
      }

      // Topic filter
      if (selectedTopic !== 'all' && p.topic !== selectedTopic) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && p.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // Status filter
      const isSolved = solvedIds.has(p.id);
      const isBookmarked = bookmarkedIds.has(p.id);

      if (selectedStatus === 'solved' && !isSolved) return false;
      if (selectedStatus === 'unsolved' && isSolved) return false;
      if (selectedStatus === 'bookmarked' && !isBookmarked) return false;

      // Visualizer only
      if (visualizerOnly && !p.visualizationType) {
        return false;
      }

      return true;
    });
  }, [problems, searchQuery, selectedTopic, selectedDifficulty, selectedStatus, visualizerOnly, solvedIds, bookmarkedIds]);

  // Grouped by Topic and Subtopic for Accordions
  const groupedData = useMemo(() => {
    const topicMap = new Map();

    filteredProblems.forEach(p => {
      if (!topicMap.has(p.topic)) {
        topicMap.set(p.topic, new Map());
      }
      const subtopicMap = topicMap.get(p.topic);
      if (!subtopicMap.has(p.subtopic)) {
        subtopicMap.set(p.subtopic, []);
      }
      subtopicMap.get(p.subtopic).push(p);
    });

    return topicMap;
  }, [filteredProblems]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = problems.length;
    const solved = solvedIds.size;
    const bookmarked = bookmarkedIds.size;
    const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;
    const visualizableCount = problems.filter(p => !!p.visualizationType).length;

    return {
      total,
      solved,
      bookmarked,
      percentage,
      visualizableCount
    };
  }, [problems, solvedIds, bookmarkedIds]);

  // All distinct topics
  const allTopics = useMemo(() => {
    const set = new Set();
    problems.forEach(p => set.add(p.topic));
    return Array.from(set).sort();
  }, [problems]);

  return {
    problems,
    filteredProblems,
    groupedData,
    stats,
    allTopics,
    solvedIds,
    bookmarkedIds,
    notes,
    saveNote,
    searchQuery,
    setSearchQuery,
    selectedTopic,
    setSelectedTopic,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedStatus,
    setSelectedStatus,
    visualizerOnly,
    setVisualizerOnly,
    activeProblem,
    setActiveProblem,
    toggleSolved,
    toggleBookmark,
    resetProgress,
    exportProgress,
    importProgress,
    pickRandomProblem
  };
}
