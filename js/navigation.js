/**
 * MR. NEXORA PORTFOLIO | NAVIGATION CONTROLLER
 * Handles header dynamics, mobile drawer, active states, and footer links
 */

import { loadData } from './data-loader.js';
import { escapeHTML } from './utils.js';

export async function initNavigation() {
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileDrawerClose = document.querySelector('.mobile-drawer-close');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');

  // Sticky header blur & shadow on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  // Back to top scroll
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile drawer controls
  const openDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Highlight active link based on current filename
  highlightActiveLink();

  // Populate dynamic social and navigation footer links if placeholders exist
  populateHeaderAndFooterLinks();
}

function highlightActiveLink() {
  const currentPath = window.location.pathname;
  let page = currentPath.split('/').pop() || 'index.html';
  if (!page.endsWith('.html')) page = `${page}.html`;
  if (page === '.html') page = 'index.html';

  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === 'index.html' && href.startsWith('index.html')) || (href.startsWith(page) && !href.includes('#'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

async function populateHeaderAndFooterLinks() {
  try {
    const socialData = await loadData('social.json');
    if (socialData && Array.isArray(socialData)) {
      const socialContainers = document.querySelectorAll('.dynamic-social-links');
      socialContainers.forEach(container => {
        container.innerHTML = socialData.map(item => `
          <a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="${escapeHTML(item.name)}" title="${escapeHTML(item.name)}">
            <i class="${escapeHTML(item.icon || 'uil uil-globe')}"></i>
          </a>
        `).join('');
      });
    }

    const siteData = await loadData('site.json');
    if (siteData) {
      const yearElements = document.querySelectorAll('.dynamic-year');
      yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
      });
      const authorElements = document.querySelectorAll('.dynamic-author');
      authorElements.forEach(el => {
        el.textContent = siteData.author || 'Sahan Udara';
      });
    }
  } catch (err) {
    console.warn('Non-blocking error populating footer links:', err);
  }
}
