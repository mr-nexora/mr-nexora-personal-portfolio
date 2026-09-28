/**
 * MR. NEXORA PORTFOLIO | PROJECTS PAGE CONTROLLER
 * Full interactive portfolio with live search, category & tech filters, and sorting
 */

import { loadData } from './data-loader.js';
import { createProjectCard, createEmptyState } from './components.js';
import { debounce } from './utils.js';

export async function initProjectsPage() {
  const projects = await loadData('projects.json');
  const container = document.querySelector('.all-projects-grid');
  const searchInput = document.querySelector('#project-search-input');
  const categoryFilters = document.querySelector('#project-category-filters');
  const sortSelect = document.querySelector('#project-sort-select');
  const counterEl = document.querySelector('#projects-counter-text');

  if (!container || !Array.isArray(projects)) return;

  let activeCategory = 'all';
  let searchQuery = '';
  let activeSort = 'featured';

  function updateView() {
    container.innerHTML = '';

    let list = [...projects];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        const titleMatch = (p.title || '').toLowerCase().includes(q);
        const descMatch = (p.shortDescription || '').toLowerCase().includes(q);
        const techMatch = (p.technologies || []).some(t => t.toLowerCase().includes(q));
        const catMatch = (p.category || '').toLowerCase().includes(q);
        return titleMatch || descMatch || techMatch || catMatch;
      });
    }

    // Filter by category
    if (activeCategory !== 'all') {
      list = list.filter(p => (p.category || '').toLowerCase().includes(activeCategory.toLowerCase()));
    }

    // Sort
    if (activeSort === 'newest') {
      list.sort((a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0));
    } else if (activeSort === 'alphabetical') {
      list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else {
      // featured
      list.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
    }

    // Update counter
    if (counterEl) {
      counterEl.textContent = `Showing ${list.length} of ${projects.length} projects`;
    }

    if (list.length === 0) {
      container.appendChild(createEmptyState('No projects match your current search and filter criteria.'));
      return;
    }

    list.forEach(project => {
      container.appendChild(createProjectCard(project));
    });
  }

  // Initial render
  updateView();

  // Search event
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      searchQuery = e.target.value;
      updateView();
    }, 200));
  }

  // Category filter clicks
  if (categoryFilters) {
    categoryFilters.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;

      categoryFilters.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      activeCategory = pill.getAttribute('data-filter') || 'all';
      updateView();
    });
  }

  // Sort change
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      updateView();
    });
  }
}
