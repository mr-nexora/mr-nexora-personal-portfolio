/**
 * MR. NEXORA PORTFOLIO | MASTER APP ENTRY POINT
 * Initializes modules based on current active view
 */

import { preloadCommonData } from './data-loader.js';
import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initModalSystem } from './modal.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Core global systems
  initTheme();
  initModalSystem();
  await initNavigation();
  preloadCommonData();

  // 2. Identify active page and boot controller
  const currentPath = window.location.pathname;
  let page = currentPath.split('/').pop() || 'index.html';
  if (!page.endsWith('.html')) page = `${page}.html`;
  if (page === '.html') page = 'index.html';

  if (page === 'index.html') {
    const { initHomePage } = await import('./home.js');
    const { initToolsSection } = await import('./tools.js');
    await initHomePage();
    initToolsSection();
  } else if (page === 'projects.html') {
    const { initProjectsPage } = await import('./projects.js');
    await initProjectsPage();
  } else if (page === 'about.html') {
    const { initAboutPage } = await import('./about.js');
    await initAboutPage();
  } else if (page === 'blog.html') {
    const { initBlogPage } = await import('./blog.js');
    await initBlogPage();
  } else if (page === 'contact.html') {
    const { initContactPage } = await import('./contact.js');
    await initContactPage();
  }
});
