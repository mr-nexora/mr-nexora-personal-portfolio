/**
 * MR. NEXORA PORTFOLIO | ABOUT PAGE CONTROLLER
 * Populates biography, education, experience, full skills matrix, certifications, and resources
 */

import { loadData } from './data-loader.js';
import { 
  createTimelineEntry, 
  createSkillCategory, 
  createCertificationCard, 
  createResourceCard 
} from './components.js';
import { escapeHTML } from './utils.js';

export async function initAboutPage() {
  await Promise.all([
    initPersonalDetails(),
    initEducationTimeline(),
    initExperienceTimeline(),
    initFullSkillsMatrix(),
    initCertificationsSection(),
    initResourcesSection()
  ]);
}

async function initPersonalDetails() {
  const personal = await loadData('personal.json');
  if (!personal) return;

  const aboutImg = document.querySelector('.about-profile-img');
  if (aboutImg && personal.aboutImage) {
    aboutImg.src = personal.aboutImage;
    aboutImg.alt = `${personal.name} - About`;
  }

  const bioEl = document.querySelector('.about-full-bio');
  if (bioEl) {
    bioEl.textContent = personal.fullBio || personal.shortBio;
  }

  const infoGrid = document.querySelector('.personal-info-grid');
  if (infoGrid) {
    infoGrid.innerHTML = `
      <div class="info-row">
        <span class="info-label"><i class="uil uil-user"></i> Name:</span>
        <span class="info-val">${escapeHTML(personal.fullName || personal.name)}</span>
      </div>
      <div class="info-row">
        <span class="info-label"><i class="uil uil-tag-alt"></i> Brand:</span>
        <span class="info-val">${escapeHTML(personal.brandName || 'Mr. Nexora')}</span>
      </div>
      <div class="info-row">
        <span class="info-label"><i class="uil uil-globe"></i> Nationality:</span>
        <span class="info-val">${escapeHTML(personal.nationality || 'Sri Lankan')}</span>
      </div>
      <div class="info-row">
        <span class="info-label"><i class="uil uil-map-marker"></i> Location:</span>
        <span class="info-val">${escapeHTML(personal.location || 'Sri Lanka')}</span>
      </div>
      <div class="info-row">
        <span class="info-label"><i class="uil uil-graduation-cap"></i> Status:</span>
        <span class="info-val">${escapeHTML(personal.workStatus || 'Undergraduate')}</span>
      </div>
      <div class="info-row">
        <span class="info-label"><i class="uil uil-briefcase"></i> Freelance:</span>
        <span class="info-val" style="color: var(--success); font-weight: 600;">${escapeHTML(personal.freelanceStatus || 'Available')}</span>
      </div>
    `;
  }
}

async function initEducationTimeline() {
  const education = await loadData('education.json');
  const container = document.querySelector('.education-timeline');
  if (!container || !Array.isArray(education)) return;

  container.innerHTML = '';
  education.forEach(item => {
    container.appendChild(createTimelineEntry(item, 'education'));
  });
}

async function initExperienceTimeline() {
  const experience = await loadData('experience.json');
  const container = document.querySelector('.experience-timeline');
  if (!container || !Array.isArray(experience)) return;

  container.innerHTML = '';
  experience.forEach(item => {
    container.appendChild(createTimelineEntry(item, 'experience'));
  });
}

async function initFullSkillsMatrix() {
  const skillsData = await loadData('skills.json');
  const container = document.querySelector('.full-skills-matrix');
  if (!container || !skillsData || !skillsData.categories) return;

  container.innerHTML = '';
  skillsData.categories.forEach(cat => {
    container.appendChild(createSkillCategory(cat));
  });
}

async function initCertificationsSection() {
  const certs = await loadData('certifications.json');
  const container = document.querySelector('.certifications-catalog-grid');
  const filterRow = document.querySelector('#cert-filter-pills');
  if (!container || !Array.isArray(certs)) return;

  const renderCerts = (cat = 'all') => {
    container.innerHTML = '';
    const filtered = cat === 'all'
      ? certs
      : certs.filter(c => (c.category || '').toLowerCase() === cat.toLowerCase());

    filtered.forEach(c => {
      container.appendChild(createCertificationCard(c));
    });
  };

  renderCerts('all');

  if (filterRow) {
    filterRow.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;

      filterRow.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter') || 'all';
      renderCerts(filterVal);
    });
  }
}

async function initResourcesSection() {
  const resources = await loadData('resources.json');
  const container = document.querySelector('.resources-catalog-grid');
  if (!container || !Array.isArray(resources)) return;

  container.innerHTML = '';
  resources.forEach(res => {
    container.appendChild(createResourceCard(res));
  });
}
