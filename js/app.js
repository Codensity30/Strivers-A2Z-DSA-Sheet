/**
 * takeuforward-for-free - Main Application Logic
 * Coordinates Store, Visualizers, Search/Filter, Accordions, and Modal View.
 */

import { AppStore, calculateProgress, filterProblems, groupProblemsByTopic } from './store.js';
import { VisualizerController } from './visualizer.js';

class App {
  constructor() {
    this.store = new AppStore();
    this.problems = [];
    this.currentFiltered = [];
    this.currentProblem = null;
    this.visualizerInstance = null;
    this.filterState = {
      search: '',
      difficulty: 'all',
      topic: 'all',
      status: 'all'
    };
  }

  async init() {
    this.applyTheme(this.store.getTheme());
    await this.loadData();
    this.setupEventListeners();
    this.applyFiltersAndRender();
    this.updateGlobalProgress();
  }

  async loadData() {
    // Attempt fetch first, fallback to window.PROBLEMS_DATA (zero-CORS file:///)
    try {
      const response = await fetch('data/problems.json');
      if (response.ok) {
        this.problems = await response.json();
      } else {
        throw new Error('Failed to fetch JSON');
      }
    } catch (e) {
      if (window.PROBLEMS_DATA && Array.isArray(window.PROBLEMS_DATA)) {
        this.problems = window.PROBLEMS_DATA;
      } else {
        console.error('Could not load problems data from JSON or JS fallback.', e);
      }
    }

    this.populateTopicFilterOptions();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.store.setTheme(theme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
  }

  populateTopicFilterOptions() {
    const topicSelect = document.getElementById('filter-topic');
    if (!topicSelect) return;

    const topics = Array.from(new Set(this.problems.map(p => p.topic)));
    topicSelect.innerHTML = `<option value="all">All Topics (${topics.length})</option>`;
    topics.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      topicSelect.appendChild(opt);
    });
  }

  updateGlobalProgress() {
    const progress = calculateProgress(this.problems, this.store.solvedSet);
    const label = document.getElementById('stat-solved-count');
    const fill = document.getElementById('stat-progress-fill');
    const bookmarkCount = document.getElementById('stat-bookmark-count');

    if (label) label.textContent = `${progress.solved} / ${progress.total} (${progress.percentage}%)`;
    if (fill) fill.style.width = `${progress.percentage}%`;
    if (bookmarkCount) bookmarkCount.textContent = this.store.bookmarkSet.size;
  }

  applyFiltersAndRender() {
    this.currentFiltered = filterProblems(this.problems, {
      search: this.filterState.search,
      difficulty: this.filterState.difficulty,
      topic: this.filterState.topic,
      status: this.filterState.status,
      solvedSet: this.store.solvedSet,
      bookmarkSet: this.store.bookmarkSet
    });

    this.renderProblemList();
  }

  renderProblemList() {
    const container = document.getElementById('topic-list-container');
    if (!container) return;

    if (this.currentFiltered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 48px 20px; color: var(--text-muted); background: var(--bg-secondary); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 36px; margin-bottom: 8px;">🔍</div>
          <h3 style="color: var(--text-primary); margin-bottom: 4px;">No matching problems found</h3>
          <p>Try clearing your search query or adjusting the filters.</p>
        </div>
      `;
      return;
    }

    const grouped = groupProblemsByTopic(this.currentFiltered);
    const topics = Object.keys(grouped);

    container.innerHTML = '';

    topics.forEach(topic => {
      const topicCard = document.createElement('div');
      topicCard.className = 'topic-card open';

      // Count solved in this topic
      const allTopicProblems = this.problems.filter(p => p.topic === topic);
      const solvedInTopic = allTopicProblems.filter(p => this.store.isSolved(p.id)).length;
      const pct = allTopicProblems.length ? Math.round((solvedInTopic / allTopicProblems.length) * 100) : 0;

      topicCard.innerHTML = `
        <div class="topic-header">
          <div class="topic-title-group">
            <span class="topic-toggle-arrow">▶</span>
            <span class="topic-title">${this.escapeHtml(topic)}</span>
            <span class="topic-badge">${allTopicProblems.length} Problems</span>
          </div>
          <div class="topic-progress-badge">
            <span class="topic-progress-count" style="font-size: 12px; color: var(--text-secondary);">${solvedInTopic}/${allTopicProblems.length}</span>
            <div class="topic-mini-track">
              <div class="topic-mini-fill" style="width: ${pct}%"></div>
            </div>
          </div>
        </div>
        <div class="topic-content"></div>
      `;

      const header = topicCard.querySelector('.topic-header');
      header.addEventListener('click', () => {
        topicCard.classList.toggle('open');
      });

      const content = topicCard.querySelector('.topic-content');
      const subtopics = grouped[topic];

      Object.keys(subtopics).forEach(subtopic => {
        const subGroup = document.createElement('div');
        subGroup.className = 'subtopic-group';

        subGroup.innerHTML = `
          <div class="subtopic-title">
            <span>📌 ${this.escapeHtml(subtopic)}</span>
            <span style="font-size: 11px; font-weight: normal; color: var(--text-muted);">(${subtopics[subtopic].length})</span>
          </div>
          <table class="problem-table">
            <tbody></tbody>
          </table>
        `;

        const tbody = subGroup.querySelector('tbody');

        subtopics[subtopic].forEach(prob => {
          const row = document.createElement('tr');
          row.className = `problem-row ${this.store.isSolved(prob.id) ? 'solved' : ''}`;
          row.setAttribute('data-id', prob.id);

          const isSolved = this.store.isSolved(prob.id);
          const isBookmarked = this.store.isBookmarked(prob.id);

          // Approaches badges
          const approachBadges = prob.approaches
            .map(a => `<span class="badge badge-approach">${this.escapeHtml(a.type)}</span>`)
            .join('');

          const vizBadge = prob.visualizationType
            ? `<span class="badge badge-viz" title="Interactive Visualizer Available">⚡ Viz</span>`
            : '';

          row.innerHTML = `
            <td class="problem-cell cell-checkbox">
              <input type="checkbox" class="custom-checkbox" ${isSolved ? 'checked' : ''} title="Mark as Solved" />
            </td>
            <td class="problem-cell cell-bookmark">
              <button class="btn-star ${isBookmarked ? 'bookmarked' : ''}" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark for Revision'}">★</button>
            </td>
            <td class="problem-cell cell-title">
              <a class="problem-link">${this.escapeHtml(prob.title)}</a>
            </td>
            <td class="problem-cell cell-badges">
              <span class="badge badge-${this.escapeHtml(prob.difficulty.toLowerCase())}">${this.escapeHtml(prob.difficulty)}</span>
              ${approachBadges}
              ${vizBadge}
            </td>
            <td class="problem-cell cell-actions">
              <button class="btn-view">View</button>
            </td>
          `;

          // Checkbox toggle
          const checkbox = row.querySelector('.custom-checkbox');
          checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            this.store.toggleSolved(prob.id);
            row.classList.toggle('solved', this.store.isSolved(prob.id));
            this.updateTopicHeader(topicCard, topic);
            this.updateGlobalProgress();
          });

          // Bookmark toggle
          const starBtn = row.querySelector('.btn-star');
          starBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const bookmarked = this.store.toggleBookmark(prob.id);
            starBtn.classList.toggle('bookmarked', bookmarked);
            this.updateGlobalProgress();
          });

          // Open modal
          const openHandler = () => this.openProblemModal(prob);
          row.querySelector('.problem-link').addEventListener('click', openHandler);
          row.querySelector('.btn-view').addEventListener('click', openHandler);
          if (row.querySelector('.badge-viz')) {
            row.querySelector('.badge-viz').addEventListener('click', openHandler);
          }

          tbody.appendChild(row);
        });

        content.appendChild(subGroup);
      });

      container.appendChild(topicCard);
    });
  }

  updateTopicHeader(topicCard, topic) {
    const allTopicProblems = this.problems.filter(p => p.topic === topic);
    const solvedInTopic = allTopicProblems.filter(p => this.store.isSolved(p.id)).length;
    const pct = allTopicProblems.length ? Math.round((solvedInTopic / allTopicProblems.length) * 100) : 0;

    const countEl = topicCard.querySelector('.topic-progress-count');
    const fillEl = topicCard.querySelector('.topic-mini-fill');
    if (countEl) countEl.textContent = `${solvedInTopic}/${allTopicProblems.length}`;
    if (fillEl) fillEl.style.width = `${pct}%`;
  }

  openProblemModal(problem) {
    this.currentProblem = problem;
    const modal = document.getElementById('problem-modal');
    if (!modal) return;

    if (this.visualizerInstance) {
      this.visualizerInstance.destroy();
      this.visualizerInstance = null;
    }

    // Modal Breadcrumbs & Header
    document.getElementById('modal-breadcrumbs').innerHTML = `
      <span>${this.escapeHtml(problem.topic)}</span> &gt; <span>${this.escapeHtml(problem.subtopic)}</span>
    `;

    document.getElementById('modal-title').textContent = problem.title;
    const diffBadge = document.getElementById('modal-difficulty-badge');
    if (diffBadge) {
      diffBadge.className = `badge badge-${problem.difficulty.toLowerCase()}`;
      diffBadge.textContent = problem.difficulty;
    }

    // Solved & Bookmark status in modal
    const modalSolvedCheck = document.getElementById('modal-check-solved');
    if (modalSolvedCheck) {
      modalSolvedCheck.checked = this.store.isSolved(problem.id);
      modalSolvedCheck.onchange = () => {
        this.store.toggleSolved(problem.id);
        this.applyFiltersAndRender();
        this.updateGlobalProgress();
      };
    }

    const modalStar = document.getElementById('modal-btn-star');
    if (modalStar) {
      modalStar.className = `btn-star ${this.store.isBookmarked(problem.id) ? 'bookmarked' : ''}`;
      modalStar.onclick = () => {
        const bookmarked = this.store.toggleBookmark(problem.id);
        modalStar.className = `btn-star ${bookmarked ? 'bookmarked' : ''}`;
        this.applyFiltersAndRender();
        this.updateGlobalProgress();
      };
    }

    // Render Question
    document.getElementById('modal-question-text').textContent = problem.question;

    // Render Visualizer Box (if applicable or requested)
    const vizContainer = document.getElementById('modal-visualizer-container');
    if (vizContainer) {
      if (problem.visualizationType) {
        vizContainer.style.display = 'block';
        this.visualizerInstance = new VisualizerController(vizContainer, problem);
      } else {
        vizContainer.style.display = 'none';
        vizContainer.innerHTML = '';
      }
    }

    // Render Approaches (Brute -> Better -> Optimal)
    this.renderApproaches(problem.approaches);

    // Notes
    const notesArea = document.getElementById('modal-notes-textarea');
    if (notesArea) {
      notesArea.value = this.store.getNote(problem.id);
      notesArea.oninput = (e) => {
        this.store.saveNote(problem.id, e.target.value);
      };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  renderApproaches(approaches) {
    const container = document.getElementById('modal-approaches-container');
    if (!container) return;

    if (!approaches || approaches.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted);">No approaches specified.</p>';
      return;
    }

    // Order: Brute Force -> Better -> Optimal
    const orderWeight = { 'Brute Force': 1, 'Better': 2, 'Optimal': 3 };
    const sorted = [...approaches].sort((a, b) => {
      const wa = orderWeight[a.type] || 4;
      const wb = orderWeight[b.type] || 4;
      return wa - wb;
    });

    let html = '';

    // If multiple approaches, add tab buttons
    if (sorted.length > 1) {
      html += `
        <div class="approach-tabs-nav">
          <button class="tab-btn active" data-tab="all">All Solutions (${sorted.length})</button>
          ${sorted
            .map(
              (a, idx) =>
                `<button class="tab-btn" data-tab="tab-${idx}">${a.type}</button>`
            )
            .join('')}
        </div>
      `;
    }

    html += `<div class="approach-cards-list">`;
    sorted.forEach((app, idx) => {
      html += `
        <div class="approach-card" id="approach-card-${idx}">
          <div class="approach-header">
            <span class="approach-type">⚡ ${app.type} Approach</span>
            <div class="approach-complexities">
              <span class="complexity-pill">TC: <strong>${this.escapeHtml(app.timeComplexity)}</strong></span>
              <span class="complexity-pill">SC: <strong>${this.escapeHtml(app.spaceComplexity)}</strong></span>
            </div>
          </div>
          <div class="approach-body">
            <div class="section-title">💡 Algorithm &amp; Intuition</div>
            <div class="approach-algo-text">${this.escapeHtml(app.algorithm)}</div>

            <div class="code-wrapper">
              <div class="code-header">
                <span>C++ Solution</span>
                <button class="btn-copy" data-code-idx="${idx}">📋 Copy Code</button>
              </div>
              <pre class="code-block"><code>${this.escapeHtml(app.code)}</code></pre>
            </div>
          </div>
        </div>
      `;
    });
    html += `</div>`;

    container.innerHTML = html;

    // Attach copy button handlers
    container.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-code-idx'), 10);
        const codeText = sorted[idx]?.code || '';
        navigator.clipboard.writeText(codeText).then(() => {
          const original = btn.textContent;
          btn.textContent = '✅ Copied!';
          setTimeout(() => (btn.textContent = original), 1800);
        });
      });
    });

    // Attach tab navigation if multiple approaches
    if (sorted.length > 1) {
      const tabBtns = container.querySelectorAll('.tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const targetTab = btn.getAttribute('data-tab');

          sorted.forEach((_, idx) => {
            const card = container.querySelector(`#approach-card-${idx}`);
            if (!card) return;
            if (targetTab === 'all' || targetTab === `tab-${idx}`) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  }

  closeProblemModal() {
    const modal = document.getElementById('problem-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (this.visualizerInstance) {
      this.visualizerInstance.destroy();
      this.visualizerInstance = null;
    }
  }

  navigateToAdjacentProblem(direction) {
    if (!this.currentProblem || this.currentFiltered.length <= 1) return;
    const currentIndex = this.currentFiltered.findIndex(p => p.id === this.currentProblem.id);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = this.currentFiltered.length - 1;
    if (nextIndex >= this.currentFiltered.length) nextIndex = 0;

    this.openProblemModal(this.currentFiltered[nextIndex]);
  }

  pickRandomProblem() {
    if (this.currentFiltered.length === 0) return;
    const randomIndex = Math.floor(Math.random() * this.currentFiltered.length);
    this.openProblemModal(this.currentFiltered[randomIndex]);
  }

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterState.search = e.target.value;
        this.applyFiltersAndRender();
      });
    }

    // Filter Topic
    const topicSelect = document.getElementById('filter-topic');
    if (topicSelect) {
      topicSelect.addEventListener('change', (e) => {
        this.filterState.topic = e.target.value;
        this.applyFiltersAndRender();
      });
    }

    // Filter Difficulty
    const diffSelect = document.getElementById('filter-difficulty');
    if (diffSelect) {
      diffSelect.addEventListener('change', (e) => {
        this.filterState.difficulty = e.target.value;
        this.applyFiltersAndRender();
      });
    }

    // Filter Status buttons
    const statusBtns = document.querySelectorAll('.filter-status-btn');
    statusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        statusBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filterState.status = btn.getAttribute('data-status');
        this.applyFiltersAndRender();
      });
    });

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const nextTheme = this.store.getTheme() === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
      });
    }

    // Pick random problem
    const randomBtn = document.getElementById('btn-random-problem');
    if (randomBtn) {
      randomBtn.addEventListener('click', () => this.pickRandomProblem());
    }

    // Reset progress
    const resetBtn = document.getElementById('btn-reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all your solved questions, bookmarks, and notes?')) {
          this.store.resetAllProgress();
          this.applyFiltersAndRender();
          this.updateGlobalProgress();
        }
      });
    }

    // Expand/Collapse All topics
    const expandBtn = document.getElementById('btn-toggle-accordions');
    if (expandBtn) {
      let allOpen = true;
      expandBtn.addEventListener('click', () => {
        allOpen = !allOpen;
        document.querySelectorAll('.topic-card').forEach(c => {
          c.classList.toggle('open', allOpen);
        });
        expandBtn.textContent = allOpen ? 'Collapse All' : 'Expand All';
      });
    }

    // Modal navigation & close
    document.getElementById('modal-close-btn')?.addEventListener('click', () => this.closeProblemModal());
    document.getElementById('modal-btn-prev')?.addEventListener('click', () => this.navigateToAdjacentProblem(-1));
    document.getElementById('modal-btn-next')?.addEventListener('click', () => this.navigateToAdjacentProblem(1));

    // Close on overlay click
    document.getElementById('problem-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'problem-modal') {
        this.closeProblemModal();
      }
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      const modal = document.getElementById('problem-modal');
      const isModalOpen = modal && modal.classList.contains('active');

      if (e.key === 'Escape' && isModalOpen) {
        this.closeProblemModal();
      } else if (e.key === 'ArrowLeft' && isModalOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        this.navigateToAdjacentProblem(-1);
      } else if (e.key === 'ArrowRight' && isModalOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        this.navigateToAdjacentProblem(1);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    });
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
