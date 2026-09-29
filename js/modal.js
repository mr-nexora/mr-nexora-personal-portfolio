/**
 * MR. NEXORA PORTFOLIO | MODAL MANAGER
 * Accessible, keyboard-friendly modals for Projects and Blog articles
 */

import { loadData } from './data-loader.js';
import { formatDate, escapeHTML } from './utils.js';
import { renderArticleContent } from './blog-content.js';
import { createShareSection, applyArticleSEO, restoreArticleSEO } from './blog-share.js';

let modalBackdrop = null;
let modalDialog = null;

export function initModalSystem() {
  modalBackdrop = document.querySelector('.modal-backdrop');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.setAttribute('role', 'dialog');
    modalBackdrop.setAttribute('aria-modal', 'true');
    modalBackdrop.setAttribute('aria-hidden', 'true');

    modalBackdrop.innerHTML = `
      <div class="modal-dialog">
        <button class="modal-close-btn" aria-label="Close modal">&times;</button>
        <div class="modal-body"></div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);
  }

  modalDialog = modalBackdrop.querySelector('.modal-dialog');
  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    restoreArticleSEO();
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Delegate clicks for project details and blog reads
  document.addEventListener('click', async (e) => {
    const projectBtn = e.target.closest('.view-project-btn');
    if (projectBtn) {
      e.preventDefault();
      const projId = projectBtn.getAttribute('data-id');
      await openProjectModal(projId);
      return;
    }

    const blogBtn = e.target.closest('.read-blog-btn');
    if (blogBtn) {
      e.preventDefault();
      const blogId = blogBtn.getAttribute('data-id');
      await openBlogModal(blogId);
      return;
    }
  });
}

/**
 * Opens project details in the modal
 */
export async function openProjectModal(projectId) {
  const projects = await loadData('projects.json');
  if (!projects) return;

  const project = projects.find(p => p.id === projectId || p.slug === projectId);
  if (!project) return;

  const modalBody = modalBackdrop.querySelector('.modal-body');
  
  const techBadges = (project.technologies || []).map(tech => 
    `<span class="badge badge-primary">${escapeHTML(tech)}</span>`
  ).join('');

  const featuresList = (project.features || []).map(feat => 
    `<li>${escapeHTML(feat)}</li>`
  ).join('');

  const galleryThumbs = (project.gallery && project.gallery.length > 1) 
    ? `<div class="modal-gallery-strip">
        ${project.gallery.map((img, idx) => `
          <img src="${escapeHTML(img)}" alt="Screenshot ${idx + 1}" class="modal-gallery-thumb ${idx === 0 ? 'active' : ''}" data-full="${escapeHTML(img)}">
        `).join('')}
       </div>`
    : '';

  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
      <span class="badge badge-accent">${escapeHTML(project.category || 'Project')}</span>
      <span class="badge badge-success">${escapeHTML(project.status || 'Active')}</span>
    </div>

    <h2 class="section-title" style="font-size: var(--text-2xl); margin-bottom: 12px;">${escapeHTML(project.title)}</h2>
    
    <div style="margin-bottom: 20px;">
      <img id="modal-main-img" src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}" class="modal-project-img" onerror="this.src='assets/img/work-1.webp'">
      ${galleryThumbs}
    </div>

    <div style="margin-bottom: 24px;">
      <h3 class="modal-section-title">Overview</h3>
      <p style="font-size: var(--text-base); color: var(--text-secondary); line-height: 1.65;">
        ${escapeHTML(project.fullDescription || project.shortDescription)}
      </p>
    </div>

    ${project.features && project.features.length > 0 ? `
      <div style="margin-bottom: 24px;">
        <h3 class="modal-section-title">Key Capabilities & Features</h3>
        <ul class="modal-features-list">
          ${featuresList}
        </ul>
      </div>
    ` : ''}

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; padding: 16px; background-color: var(--bg-surface-elevated); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      <div>
        <div class="modal-section-title">Role</div>
        <div style="font-size: var(--text-sm); font-weight: 600;">${escapeHTML(project.role || 'Lead Developer')}</div>
      </div>
      <div>
        <div class="modal-section-title">Timeline</div>
        <div style="font-size: var(--text-sm); font-weight: 600;">${formatDate(project.startDate)} — ${formatDate(project.completionDate)}</div>
      </div>
      <div>
        <div class="modal-section-title">Team</div>
        <div style="font-size: var(--text-sm); font-weight: 600;">${escapeHTML(project.team || 'Solo Project')}</div>
      </div>
    </div>

    <div style="margin-bottom: 28px;">
      <h3 class="modal-section-title">Technologies Used</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
        ${techBadges}
      </div>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 12px; padding-top: 16px; border-top: 1px solid var(--border-color);">
      ${project.liveDemo ? `
        <a href="${escapeHTML(project.liveDemo)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <i class="uil uil-external-link-alt"></i> Live Application
        </a>
      ` : ''}
      ${project.github ? `
        <a href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <i class="uil uil-github"></i> View Source Code
        </a>
      ` : ''}
    </div>
  `;

  // Gallery thumb clicker
  const thumbs = modalBody.querySelectorAll('.modal-gallery-thumb');
  const mainImg = modalBody.querySelector('#modal-main-img');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImg) mainImg.src = thumb.getAttribute('data-full');
    });
  });

  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/**
 * Opens full blog article in the modal
 */
export async function openBlogModal(blogId) {
  const posts = await loadData('blog.json');
  if (!posts) return;

  const post = posts.find(p => p.id === blogId || p.slug === blogId);
  if (!post) return;

  // Apply dynamic SEO tags and update URL parameter
  applyArticleSEO(post);

  const modalBody = modalBackdrop.querySelector('.modal-body');

  const tagsHtml = (post.tags || []).map(t => 
    `<span class="badge badge-primary">#${escapeHTML(t)}</span>`
  ).join('');

  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
      <span class="badge badge-accent">${escapeHTML(post.category)}</span>
      <span style="font-size: var(--text-xs); color: var(--text-muted);"><i class="uil uil-clock"></i> ${escapeHTML(post.readingTime || '5 min read')}</span>
    </div>

    <h2 class="section-title" style="font-size: var(--text-2xl); margin-bottom: 12px; line-height: 1.3;">${escapeHTML(post.title)}</h2>

    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; font-size: var(--text-xs); color: var(--text-muted);">
      <span><i class="uil uil-user"></i> ${escapeHTML(post.author)}</span>
      <span>•</span>
      <span><i class="uil uil-calender"></i> ${formatDate(post.date)}</span>
    </div>

    <img src="${escapeHTML(post.image)}" alt="${escapeHTML(post.title)}" class="modal-project-img" style="max-height: 280px; width:100%; object-fit:cover;" onerror="this.src='assets/img/work-1.webp'">

    <div class="article-lead-excerpt" style="font-size: var(--text-lg); font-weight: 500; color: var(--text-primary); margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color); line-height: 1.6;">
      ${escapeHTML(post.excerpt)}
    </div>

    <!-- Structured Content Container (appended programmatically) -->
    <div class="article-rendered-body" style="margin-bottom: 32px;"></div>

    <div style="margin-bottom: 24px;">
      <h3 class="modal-section-title">Topics &amp; Tags</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
        ${tagsHtml}
      </div>
    </div>

    <!-- Social Share Section Container (appended programmatically) -->
    <div class="article-share-placeholder" style="margin-bottom: 24px;"></div>

    <div style="display: flex; justify-content: flex-end; padding-top: 16px; border-top: 1px solid var(--border-color);">
      <button class="btn btn-secondary modal-close-btn-bottom">Close Article</button>
    </div>
  `;

  // Safely insert structured content
  const renderedContentContainer = modalBody.querySelector('.article-rendered-body');
  if (renderedContentContainer) {
    const contentNode = renderArticleContent(post.content);
    renderedContentContainer.appendChild(contentNode);
  }

  // Insert social share section
  const sharePlaceholder = modalBody.querySelector('.article-share-placeholder');
  if (sharePlaceholder) {
    const shareNode = createShareSection(post);
    sharePlaceholder.appendChild(shareNode);
  }

  const bottomClose = modalBody.querySelector('.modal-close-btn-bottom');
  if (bottomClose) {
    bottomClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      restoreArticleSEO();
    });
  }

  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
