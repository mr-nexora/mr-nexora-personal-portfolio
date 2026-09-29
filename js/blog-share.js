/**
 * MR. NEXORA PORTFOLIO | BLOG SHARE & SEO CONTROLLER
 * Handles dynamic social sharing, copy-to-clipboard, URL generation, and dynamic meta/SEO
 */

import { copyToClipboard, showToast, escapeHTML } from './utils.js';

// Cache original page metadata to restore upon modal close
let originalPageSEO = null;

/**
 * Builds the canonical shareable URL for a given blog article
 * @param {Object} article 
 * @returns {string} Absolute URL pointing to article
 */
export function getArticleShareUrl(article) {
  const origin = window.location.origin;
  let pathname = window.location.pathname;

  // If on index.html or root, redirect to blog.html for the article
  if (!pathname.includes('blog.html')) {
    const dir = pathname.substring(0, pathname.lastIndexOf('/') + 1);
    pathname = `${dir}blog.html`;
  }

  const slug = article.slug || article.id;
  return `${origin}${pathname}?post=${encodeURIComponent(slug)}`;
}

/**
 * Generates official sharing URLs for supported platforms
 * @param {Object} article 
 * @param {string} shareUrl 
 * @returns {Object} map of platform URLs
 */
export function generateShareLinks(article, shareUrl) {
  const title = article.title || 'Mr. Nexora Article';
  const summary = article.excerpt || '';

  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} — ${shareUrl}`)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${summary}\n\nRead the full article: ${shareUrl}`)}`
  };
}

/**
 * Copies the current article link to clipboard and triggers a toast notification
 * @param {Object} article 
 */
export async function copyArticleLink(article) {
  const url = getArticleShareUrl(article);
  await copyToClipboard(url, 'Article link copied to clipboard!');
}

/**
 * Creates the "Share this article" UI DOM node
 * @param {Object} article 
 * @returns {HTMLElement}
 */
export function createShareSection(article) {
  const shareUrl = getArticleShareUrl(article);
  const links = generateShareLinks(article, shareUrl);

  const section = document.createElement('div');
  section.className = 'article-share-section';

  section.innerHTML = `
    <div class="article-share-header">
      <div class="article-share-title">
        <i class="uil uil-share-alt"></i>
        <span>Share this article</span>
      </div>
      <span class="article-share-hint">Enjoyed reading? Share it with your network:</span>
    </div>

    <div class="article-share-buttons">
      <!-- LinkedIn -->
      <a href="${escapeHTML(links.linkedin)}" target="_blank" rel="noopener noreferrer" class="article-share-btn share-linkedin" aria-label="Share on LinkedIn" title="Share on LinkedIn">
        <i class="uil uil-linkedin"></i>
        <span>LinkedIn</span>
      </a>

      <!-- X / Twitter -->
      <a href="${escapeHTML(links.twitter)}" target="_blank" rel="noopener noreferrer" class="article-share-btn share-twitter" aria-label="Share on X (Twitter)" title="Share on X (Twitter)">
        <i class="uil uil-twitter-alt"></i>
        <span>X / Twitter</span>
      </a>

      <!-- Facebook -->
      <a href="${escapeHTML(links.facebook)}" target="_blank" rel="noopener noreferrer" class="article-share-btn share-facebook" aria-label="Share on Facebook" title="Share on Facebook">
        <i class="uil uil-facebook-f"></i>
        <span>Facebook</span>
      </a>

      <!-- WhatsApp -->
      <a href="${escapeHTML(links.whatsapp)}" target="_blank" rel="noopener noreferrer" class="article-share-btn share-whatsapp" aria-label="Share on WhatsApp" title="Share on WhatsApp">
        <i class="uil uil-whatsapp"></i>
        <span>WhatsApp</span>
      </a>

      <!-- Email -->
      <a href="${escapeHTML(links.email)}" class="article-share-btn share-email" aria-label="Share via Email" title="Share via Email">
        <i class="uil uil-envelope-alt"></i>
        <span>Email</span>
      </a>

      <!-- Copy Link Button -->
      <button type="button" class="article-share-btn share-copy-btn" aria-label="Copy Article Link" title="Copy Article Link">
        <i class="uil uil-copy"></i>
        <span>Copy Link</span>
      </button>
    </div>
  `;

  // Attach copy link event
  const copyBtn = section.querySelector('.share-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      await copyArticleLink(article);
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="uil uil-check"></i> <span>Copied!</span>';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
        copyBtn.classList.remove('copied');
      }, 2000);
    });
  }

  return section;
}

/**
 * Dynamically updates document title and OpenGraph / Twitter meta tags
 * Also updates URL query parameter without reloading page
 * @param {Object} article 
 */
export function applyArticleSEO(article) {
  if (!originalPageSEO) {
    originalPageSEO = {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
      ogDesc: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content') || '',
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
      twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '',
      twitterDesc: document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || '',
      url: window.location.href
    };
  }

  const shareUrl = getArticleShareUrl(article);
  const title = `${article.title} | Sahan Udara (Mr. Nexora)`;
  const description = article.excerpt || '';

  document.title = title;

  const setMeta = (selector, attr, val) => {
    let el = document.querySelector(selector);
    if (!el && val) {
      el = document.createElement('meta');
      const [nameKey, nameVal] = selector.replace(/[meta\[\]']/g, '').split('=');
      el.setAttribute(nameKey, nameVal);
      document.head.appendChild(el);
    }
    if (el && val) el.setAttribute(attr, val);
  };

  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', article.title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', shareUrl);
  if (article.image) {
    const fullImgUrl = article.image.startsWith('http') ? article.image : `${window.location.origin}/${article.image.replace(/^\.\//, '')}`;
    setMeta('meta[property="og:image"]', 'content', fullImgUrl);
    setMeta('meta[name="twitter:image"]', 'content', fullImgUrl);
  }
  setMeta('meta[name="twitter:title"]', 'content', article.title);
  setMeta('meta[name="twitter:description"]', 'content', description);

  // Update URL bar query param silently
  try {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('post', article.slug || article.id);
    window.history.replaceState({ postId: article.id }, title, currentUrl.toString());
  } catch (err) {
    // Non-critical if history API fails in restricted environments
  }
}

/**
 * Restores original page title, meta tags, and URL query parameter
 */
export function restoreArticleSEO() {
  if (!originalPageSEO) return;

  document.title = originalPageSEO.title;

  const setMeta = (selector, attr, val) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, val);
  };

  setMeta('meta[name="description"]', 'content', originalPageSEO.description);
  setMeta('meta[property="og:title"]', 'content', originalPageSEO.ogTitle);
  setMeta('meta[property="og:description"]', 'content', originalPageSEO.ogDesc);
  setMeta('meta[property="og:url"]', 'content', originalPageSEO.ogUrl);
  setMeta('meta[property="og:image"]', 'content', originalPageSEO.ogImage);
  setMeta('meta[name="twitter:title"]', 'content', originalPageSEO.twitterTitle);
  setMeta('meta[name="twitter:description"]', 'content', originalPageSEO.twitterDesc);

  // Clear query param from URL bar
  try {
    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.has('post')) {
      currentUrl.searchParams.delete('post');
      window.history.replaceState({}, originalPageSEO.title, currentUrl.pathname + (currentUrl.search ? currentUrl.search : ''));
    }
  } catch (err) {
    // Non-critical
  }
}
