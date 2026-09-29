/**
 * MR. NEXORA PORTFOLIO | BLOG CONTROLLER
 * Dynamic article search, category filtering, featured banner, and article reader
 */

import { loadData } from './data-loader.js';
import { createBlogCard, createEmptyState } from './components.js';
import { openBlogModal } from './modal.js';
import { debounce, formatDate, escapeHTML, showToast } from './utils.js';

export async function initBlogPage() {
  const posts = await loadData('blog.json');
  const container = document.querySelector('.all-blog-grid');
  const featuredBanner = document.querySelector('#featured-blog-banner');
  const searchInput = document.querySelector('#blog-search-input');
  const categoryFilters = document.querySelector('#blog-category-filters');
  const counterEl = document.querySelector('#blog-counter-text');
  const newsletterForm = document.querySelector('#newsletter-form');

  if (!container || !Array.isArray(posts)) return;

  // Render featured post banner
  const featuredPost = posts.find(p => p.featured) || posts[0];
  if (featuredBanner && featuredPost) {
    featuredBanner.innerHTML = `
      <div class="featured-blog-content">
        <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 12px;">
          <span class="badge badge-accent">Featured Story</span>
          <span style="font-size: var(--text-xs); color: var(--text-muted);"><i class="uil uil-clock"></i> ${escapeHTML(featuredPost.readingTime || '5 min read')}</span>
        </div>
        <h2 style="font-size: var(--text-2xl); margin-bottom: 12px; line-height: 1.35;">${escapeHTML(featuredPost.title)}</h2>
        <p style="font-size: var(--text-base); color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">
          ${escapeHTML(featuredPost.excerpt)}
        </p>
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="font-size: var(--text-xs); color: var(--text-muted);">
            By <strong>${escapeHTML(featuredPost.author)}</strong> • ${formatDate(featuredPost.date)}
          </div>
          <button class="btn btn-primary read-blog-btn" data-id="${featuredPost.id}">
            Read Featured Article <i class="uil uil-arrow-right"></i>
          </button>
        </div>
      </div>
      <div class="featured-blog-image">
        <img src="${escapeHTML(featuredPost.image)}" alt="${escapeHTML(featuredPost.title)}" onerror="this.src='assets/img/work-1.webp'">
      </div>
    `;
  }

  let activeCategory = 'all';
  let searchQuery = '';

  function updateBlogView() {
    container.innerHTML = '';
    let list = [...posts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        const titleMatch = (p.title || '').toLowerCase().includes(q);
        const excerptMatch = (p.excerpt || '').toLowerCase().includes(q);
        const tagMatch = (p.tags || []).some(t => t.toLowerCase().includes(q));
        return titleMatch || excerptMatch || tagMatch;
      });
    }

    if (activeCategory !== 'all') {
      list = list.filter(p => (p.category || '').toLowerCase() === activeCategory.toLowerCase());
    }

    if (counterEl) {
      counterEl.textContent = `Showing ${list.length} of ${posts.length} articles`;
    }

    if (list.length === 0) {
      container.appendChild(createEmptyState('No articles found matching your criteria.'));
      return;
    }

    list.forEach(post => {
      container.appendChild(createBlogCard(post));
    });
  }

  updateBlogView();

  // Handle URL deep-linking (?post=slug-or-id) for shared articles
  const urlParams = new URLSearchParams(window.location.search);
  const postParam = urlParams.get('post');
  if (postParam) {
    const targetPost = posts.find(p => p.id === postParam || p.slug === postParam);
    if (targetPost) {
      setTimeout(() => {
        openBlogModal(targetPost.id);
      }, 150);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      searchQuery = e.target.value;
      updateBlogView();
    }, 200));
  }

  if (categoryFilters) {
    categoryFilters.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;

      categoryFilters.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      activeCategory = pill.getAttribute('data-filter') || 'all';
      updateBlogView();
    });
  }

  // Newsletter simulation
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`Thank you! Subscribed with ${input.value}`, 'success');
        input.value = '';
      }
    });
  }
}
