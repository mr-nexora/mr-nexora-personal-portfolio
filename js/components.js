/**
 * MR. NEXORA PORTFOLIO | COMPONENT TEMPLATES
 * Reusable HTML component generators from JSON models
 */

import { formatDate, escapeHTML } from './utils.js';

/**
 * Creates a Project Card DOM element
 */
export function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';
  card.setAttribute('data-id', project.id);
  card.setAttribute('data-slug', project.slug);
  card.setAttribute('data-category', (project.category || '').toLowerCase());
  card.setAttribute('data-tech', (project.technologies || []).join(' ').toLowerCase());

  const tagsHtml = (project.technologies || []).slice(0, 4).map(tech => 
    `<span class="badge badge-primary">${escapeHTML(tech)}</span>`
  ).join('');

  const statusBadge = project.status 
    ? `<span class="project-card-badge">${escapeHTML(project.status)}</span>` 
    : '';

  card.innerHTML = `
    <div class="project-card-image-wrap">
      <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}" loading="lazy" onerror="this.src='assets/img/work-1.webp'">
      ${statusBadge}
    </div>
    <div class="project-card-body">
      <div class="project-card-category">${escapeHTML(project.category || 'Development')}</div>
      <h3 class="project-card-title">${escapeHTML(project.title)}</h3>
      <p class="project-card-desc">${escapeHTML(project.shortDescription)}</p>
      
      <div class="project-card-tags">
        ${tagsHtml}
      </div>

      <div class="project-card-footer">
        <button class="btn btn-sm btn-primary view-project-btn" data-id="${project.id}">
          <span>Details</span> <i class="uil uil-arrow-right"></i>
        </button>
        <div class="project-card-links">
          ${project.github ? `<a href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer" class="btn-icon" aria-label="GitHub Repository" title="GitHub Source"><i class="uil uil-github"></i></a>` : ''}
          ${project.liveDemo ? `<a href="${escapeHTML(project.liveDemo)}" target="_blank" rel="noopener noreferrer" class="btn-icon" aria-label="Live Demo" title="Live Preview"><i class="uil uil-external-link-alt"></i></a>` : ''}
        </div>
      </div>
    </div>
  `;

  return card;
}

/**
 * Creates a Skill Category Block with animated progress meters
 */
export function createSkillCategory(category) {
  const card = document.createElement('div');
  card.className = 'skill-category-card';

  const skillItemsHtml = (category.skills || []).map(skill => `
    <div class="skill-item">
      <div class="skill-item-header">
        <span class="skill-item-name">
          <i class="${escapeHTML(skill.icon || 'uil uil-check')}"></i>
          ${escapeHTML(skill.name)}
        </span>
        <span class="skill-item-percent">${skill.percentage}%</span>
      </div>
      <div class="skill-progress-track">
        <div class="skill-progress-fill" style="width: ${skill.percentage}%;" data-width="${skill.percentage}"></div>
      </div>
    </div>
  `).join('');

  card.innerHTML = `
    <div class="skill-category-header">
      <div class="skill-category-icon">
        <i class="${escapeHTML(category.icon || 'uil uil-brackets-curly')}"></i>
      </div>
      <div>
        <h3 class="skill-category-title">${escapeHTML(category.name)}</h3>
        <p class="modal-section-title" style="margin-bottom:0;">${escapeHTML(category.description || '')}</p>
      </div>
    </div>
    <div class="skill-items-list">
      ${skillItemsHtml}
    </div>
  `;

  return card;
}

/**
 * Creates a Service Card
 */
export function createServiceCard(service) {
  const card = document.createElement('div');
  card.className = 'service-card';

  const featuresHtml = (service.features || []).map(feat => `
    <div class="service-feature-item">
      <i class="uil uil-check-circle"></i>
      <span>${escapeHTML(feat)}</span>
    </div>
  `).join('');

  card.innerHTML = `
    <div class="service-icon-box">
      <i class="${escapeHTML(service.icon || 'uil uil-laptop')}"></i>
    </div>
    <h3 class="service-card-title">${escapeHTML(service.title)}</h3>
    <p class="service-card-desc">${escapeHTML(service.description)}</p>
    <div class="service-features-list">
      ${featuresHtml}
    </div>
  `;

  return card;
}

/**
 * Creates an Education or Experience Timeline Entry
 */
export function createTimelineEntry(item, type = 'experience') {
  const entry = document.createElement('div');
  entry.className = 'timeline-entry';

  const dateText = item.startDate 
    ? `${item.startDate} — ${item.endDate || 'Present'}` 
    : item.date || '';

  const subtitle = type === 'education'
    ? `${item.program} • ${item.field || ''}`
    : `${item.position} • ${item.company}`;

  const organization = type === 'education'
    ? item.institution
    : item.company;

  const responsibilitiesHtml = item.responsibilities && item.responsibilities.length > 0
    ? `<ul class="timeline-responsibilities">
        ${item.responsibilities.map(r => `<li>${escapeHTML(r)}</li>`).join('')}
       </ul>`
    : '';

  entry.innerHTML = `
    <div class="timeline-entry-header">
      <div class="timeline-role">${escapeHTML(type === 'education' ? item.program : item.position)}</div>
      <span class="timeline-date-badge"><i class="uil uil-calender"></i> ${escapeHTML(dateText)}</span>
    </div>
    <div class="timeline-company"><i class="uil ${type === 'education' ? 'uil-graduation-cap' : 'uil-building'}"></i> ${escapeHTML(organization)} ${item.location ? `(${escapeHTML(item.location)})` : ''}</div>
    <p class="timeline-desc">${escapeHTML(item.description || '')}</p>
    ${responsibilitiesHtml}
  `;

  return entry;
}

/**
 * Creates a Certification Card
 */
export function createCertificationCard(cert) {
  const card = document.createElement('div');
  card.className = 'cert-card';

  const skillsBadges = (cert.skills || []).map(s => 
    `<span class="badge badge-accent">${escapeHTML(s)}</span>`
  ).join('');

  card.innerHTML = `
    <div class="cert-card-header">
      <div class="cert-icon">
        <i class="uil uil-award"></i>
      </div>
      <div>
        <h4 class="cert-title">${escapeHTML(cert.title)}</h4>
        <span class="cert-org">${escapeHTML(cert.organization)} • ${escapeHTML(cert.date)}</span>
      </div>
    </div>
    <p class="cert-desc">${escapeHTML(cert.description)}</p>
    <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:auto; margin-bottom:12px;">
      ${skillsBadges}
    </div>
    ${cert.certificateUrl && cert.certificateUrl !== '#' ? `
      <a href="${escapeHTML(cert.certificateUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" style="align-self: flex-start;">
        <i class="uil uil-check-shield"></i> Verify Certificate
      </a>
    ` : ''}
  `;

  return card;
}

/**
 * Creates a Blog Article Card
 */
export function createBlogCard(post) {
  const card = document.createElement('article');
  card.className = 'blog-card';
  card.setAttribute('data-id', post.id);
  card.setAttribute('data-slug', post.slug);
  card.setAttribute('data-category', (post.category || '').toLowerCase());

  const tagsHtml = (post.tags || []).slice(0, 3).map(tag => 
    `<span class="badge badge-primary">#${escapeHTML(tag)}</span>`
  ).join('');

  card.innerHTML = `
    <div class="blog-image-wrap">
      <img src="${escapeHTML(post.image)}" alt="${escapeHTML(post.title)}" loading="lazy" onerror="this.src='assets/img/work-1.webp'">
    </div>
    <div class="blog-card-body">
      <div class="blog-meta-row">
        <span><i class="uil uil-folder"></i> ${escapeHTML(post.category)}</span>
        <span><i class="uil uil-clock"></i> ${escapeHTML(post.readingTime || '5 min read')}</span>
      </div>
      <h3 class="blog-card-title">${escapeHTML(post.title)}</h3>
      <p class="blog-card-excerpt">${escapeHTML(post.excerpt)}</p>
      
      <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom: 16px;">
        ${tagsHtml}
      </div>

      <div class="blog-card-footer">
        <span style="font-size: var(--text-xs); color: var(--text-muted);"><i class="uil uil-calender"></i> ${formatDate(post.date)}</span>
        <button class="btn btn-sm btn-primary read-blog-btn" data-id="${post.id}">
          <span>Read Article</span> <i class="uil uil-arrow-right"></i>
        </button>
      </div>
    </div>
  `;

  return card;
}

/**
 * Creates a Testimonial Card
 */
export function createTestimonialCard(testimonial) {
  const card = document.createElement('div');
  card.className = 'testimonial-card';

  card.innerHTML = `
    <div class="testimonial-quote-icon">
      <i class="uil uil-feedback"></i>
    </div>
    <p class="testimonial-message">"${escapeHTML(testimonial.message)}"</p>
    <div class="testimonial-author">
      <img src="${escapeHTML(testimonial.image)}" alt="${escapeHTML(testimonial.name)}" class="testimonial-avatar" onerror="this.src='assets/img/client1.jpg'">
      <div>
        <div class="testimonial-name">${escapeHTML(testimonial.name)}</div>
        <div class="testimonial-role">${escapeHTML(testimonial.role)} • ${escapeHTML(testimonial.company)}</div>
      </div>
    </div>
  `;

  return card;
}

/**
 * Creates a Resource Card
 */
export function createResourceCard(resource) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.setAttribute('data-category', (resource.category || '').toLowerCase());

  card.innerHTML = `
    <div class="project-card-image-wrap">
      <img src="${escapeHTML(resource.image)}" alt="${escapeHTML(resource.title)}" loading="lazy" onerror="this.src='assets/img/work-3.webp'">
      <span class="project-card-badge">${escapeHTML(resource.price || 'Free')}</span>
    </div>
    <div class="project-card-body">
      <div class="project-card-category">${escapeHTML(resource.category)}</div>
      <h3 class="project-card-title">${escapeHTML(resource.title)}</h3>
      <p class="project-card-desc">${escapeHTML(resource.description)}</p>
      <div class="project-card-footer">
        <span class="badge badge-accent">${escapeHTML(resource.type || 'Resource')}</span>
        <a href="${escapeHTML(resource.link || '#')}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
          <i class="uil uil-download-alt"></i> Access
        </a>
      </div>
    </div>
  `;

  return card;
}

/**
 * Empty / Fallback State
 */
export function createEmptyState(message = 'No matching items found.') {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.style.gridColumn = '1 / -1';
  div.style.textAlign = 'center';
  div.style.padding = '48px 24px';
  div.style.color = 'var(--text-muted)';
  div.innerHTML = `
    <i class="uil uil-search-alt" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 12px; display:inline-block;"></i>
    <p style="font-size: var(--text-base);">${escapeHTML(message)}</p>
  `;
  return div;
}
