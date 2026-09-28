/**
 * MR. NEXORA PORTFOLIO | HOME PAGE CONTROLLER
 * Connects index.html to dynamic JSON content (Personal, Stats, Projects, Skills, Services, Testimonials, Blog)
 */

import { loadData } from './data-loader.js';
import { 
  createProjectCard, 
  createSkillCategory, 
  createServiceCard, 
  createBlogCard, 
  createTestimonialCard,
  createEmptyState 
} from './components.js';
import { escapeHTML } from './utils.js';

export async function initHomePage() {
  await Promise.all([
    initHeroSection(),
    initStatsBar(),
    initRecentWorks(),
    initSkillsPreview(),
    initServicesSection(),
    initTestimonialsSection(),
    initRecentBlogPreview()
  ]);
}

/**
 * Injects hero information from personal.json
 */
async function initHeroSection() {
  const personal = await loadData('personal.json');
  if (!personal) return;

  const heroName = document.querySelector('.hero-name');
  if (heroName) heroName.textContent = personal.name || 'Sahan Udara';

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = personal.title || 'Full-Stack Developer & Cybersecurity Enthusiast';

  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) heroDesc.textContent = personal.shortBio || personal.tagline;

  const heroAvatar = document.querySelector('.hero-avatar-img');
  if (heroAvatar && personal.avatar) {
    heroAvatar.src = personal.avatar;
    heroAvatar.alt = `${personal.name} - Profile Image`;
  }
}

/**
 * Calculates and animates stats dynamically from projects and certifications JSON
 */
async function initStatsBar() {
  const [statsData, projectsData, certsData] = await Promise.all([
    loadData('stats.json'),
    loadData('projects.json'),
    loadData('certifications.json')
  ]);

  const container = document.querySelector('.stats-grid');
  if (!container || !statsData) return;

  const totalProjectsCount = Array.isArray(projectsData) ? projectsData.length : 6;
  const totalCertsCount = Array.isArray(certsData) ? certsData.length : 6;

  container.innerHTML = statsData.map(stat => {
    let displayVal = stat.number;
    if (stat.dynamicKey === 'totalProjects') {
      displayVal = `${String(totalProjectsCount).padStart(2, '0')}+`;
    } else if (stat.dynamicKey === 'totalCertifications') {
      displayVal = `${String(totalCertsCount).padStart(2, '0')}+`;
    }

    return `
      <div class="stat-card">
        <i class="${escapeHTML(stat.icon || 'uil uil-chart-line')} stat-card-icon"></i>
        <div class="stat-card-number" data-target="${parseInt(displayVal, 10) || 0}">${displayVal}</div>
        <div class="stat-card-label">${escapeHTML(stat.label)}</div>
      </div>
    `;
  }).join('');
}

/**
 * Renders Recent Works (latest 6 projects) with category filtering
 */
async function initRecentWorks() {
  const projects = await loadData('projects.json');
  const container = document.querySelector('.recent-projects-grid');
  const filterContainer = document.querySelector('.home-project-filters');
  if (!container || !Array.isArray(projects)) return;

  const sortedProjects = [...projects]
    .sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99))
    .slice(0, 6);

  const renderList = (category = 'all') => {
    container.innerHTML = '';
    const filtered = category === 'all'
      ? sortedProjects
      : sortedProjects.filter(p => (p.category || '').toLowerCase().includes(category.toLowerCase()));

    if (filtered.length === 0) {
      container.appendChild(createEmptyState('No projects match this category.'));
      return;
    }

    filtered.forEach(proj => {
      container.appendChild(createProjectCard(proj));
    });
  };

  renderList('all');

  // Filter pills
  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;

      filterContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const cat = pill.getAttribute('data-filter') || 'all';
      renderList(cat);
    });
  }
}

/**
 * Renders top skills categories
 */
async function initSkillsPreview() {
  const skillsData = await loadData('skills.json');
  const container = document.querySelector('.home-skills-grid');
  if (!container || !skillsData || !skillsData.categories) return;

  container.innerHTML = '';
  // Show top 2-3 categories on homepage
  skillsData.categories.slice(0, 2).forEach(cat => {
    container.appendChild(createSkillCategory(cat));
  });
}

/**
 * Renders Services
 */
async function initServicesSection() {
  const services = await loadData('services.json');
  const container = document.querySelector('.home-services-grid');
  if (!container || !Array.isArray(services)) return;

  container.innerHTML = '';
  services.slice(0, 6).forEach(service => {
    container.appendChild(createServiceCard(service));
  });
}

/**
 * Renders Testimonials
 */
async function initTestimonialsSection() {
  const testimonials = await loadData('testimonials.json');
  const container = document.querySelector('.home-testimonials-grid');
  if (!container || !Array.isArray(testimonials)) return;

  container.innerHTML = '';
  testimonials.forEach(item => {
    container.appendChild(createTestimonialCard(item));
  });
}

/**
 * Renders recent blog posts preview
 */
async function initRecentBlogPreview() {
  const blogPosts = await loadData('blog.json');
  const container = document.querySelector('.home-blog-grid');
  if (!container || !Array.isArray(blogPosts)) return;

  container.innerHTML = '';
  blogPosts.slice(0, 3).forEach(post => {
    container.appendChild(createBlogCard(post));
  });
}
