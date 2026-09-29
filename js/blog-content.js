/**
 * MR. NEXORA PORTFOLIO | BLOG CONTENT RENDERER
 * Safely renders rich structured JSON content blocks into DOM elements
 * Fully backward-compatible with legacy plain-text articles
 */

import { escapeHTML } from './utils.js';

/**
 * Sanitizes URLs to prevent javascript: or malformed protocol injections
 * @param {string} url 
 * @returns {string} Safe URL or '#'
 */
function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '#';
  const trimmed = url.trim();
  // Allow relative URLs or http/https/mailto
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#')
  ) {
    return trimmed;
  }
  return '#';
}

/**
 * Renders an array of inline text segments or handles string with inline formatting
 * @param {string|Array} inlineData 
 * @param {HTMLElement} parentElement 
 */
function renderInlineContent(inlineData, parentElement) {
  if (!inlineData) return;

  // Case 1: Array of structured inline segments
  // e.g. [{ type: "text", text: "..." }, { type: "link", text: "...", url: "..." }, { type: "bold", text: "..." }]
  if (Array.isArray(inlineData)) {
    inlineData.forEach(segment => {
      if (!segment) return;

      if (typeof segment === 'string') {
        parentElement.appendChild(document.createTextNode(segment));
        return;
      }

      const segType = segment.type || 'text';

      if (segType === 'link') {
        const a = document.createElement('a');
        a.className = 'article-inline-link';
        a.href = sanitizeUrl(segment.url);
        a.textContent = segment.text || segment.url || '';
        if (segment.target === '_blank' || (segment.url && segment.url.startsWith('http'))) {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }
        parentElement.appendChild(a);
      } else if (segType === 'bold') {
        const strong = document.createElement('strong');
        strong.textContent = segment.text || '';
        parentElement.appendChild(strong);
      } else if (segType === 'italic') {
        const em = document.createElement('em');
        em.textContent = segment.text || '';
        parentElement.appendChild(em);
      } else if (segType === 'code') {
        const code = document.createElement('code');
        code.className = 'article-inline-code';
        code.textContent = segment.text || '';
        parentElement.appendChild(code);
      } else {
        // Plain text segment
        parentElement.appendChild(document.createTextNode(segment.text || ''));
      }
    });
    return;
  }

  // Case 2: String with basic inline markdown-like syntax (**bold**, *italic*, `code`, and [text](url))
  if (typeof inlineData === 'string') {
    // Parse regex tokens safely without dangerous innerHTML
    const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(inlineData)) !== null) {
      // Append text before match
      if (match.index > lastIndex) {
        parentElement.appendChild(document.createTextNode(inlineData.substring(lastIndex, match.index)));
      }

      if (match[2] && match[3]) {
        // Link [text](url)
        const a = document.createElement('a');
        a.className = 'article-inline-link';
        a.href = sanitizeUrl(match[3]);
        a.textContent = match[2];
        if (match[3].startsWith('http')) {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }
        parentElement.appendChild(a);
      } else if (match[4]) {
        // Bold **text**
        const strong = document.createElement('strong');
        strong.textContent = match[4];
        parentElement.appendChild(strong);
      } else if (match[5]) {
        // Italic *text*
        const em = document.createElement('em');
        em.textContent = match[5];
        parentElement.appendChild(em);
      } else if (match[6]) {
        // Code `code`
        const code = document.createElement('code');
        code.className = 'article-inline-code';
        code.textContent = match[6];
        parentElement.appendChild(code);
      }

      lastIndex = tokenRegex.lastIndex;
    }

    // Append remaining text
    if (lastIndex < inlineData.length) {
      parentElement.appendChild(document.createTextNode(inlineData.substring(lastIndex)));
    }
  }
}

/**
 * Main Content Block Renderer
 * Converts string or structured JSON array into safe DOM nodes
 * @param {string|Array} content 
 * @returns {HTMLElement} Container containing rendered article body
 */
export function renderArticleContent(content) {
  const container = document.createElement('div');
  container.className = 'article-body-content';

  // BACKWARD COMPATIBILITY: Legacy string content
  if (typeof content === 'string') {
    const paragraphs = content.split(/\n\s*\n/);
    paragraphs.forEach(pText => {
      const trimmed = pText.trim();
      if (!trimmed) return;
      const p = document.createElement('p');
      p.className = 'article-paragraph';
      renderInlineContent(trimmed, p);
      container.appendChild(p);
    });
    return container;
  }

  // NEW STRUCTURED CONTENT: Array of blocks
  if (Array.isArray(content)) {
    content.forEach(block => {
      if (!block || typeof block !== 'object') return;

      const type = block.type || 'paragraph';

      switch (type) {
        // 1. Paragraph / Rich Text
        case 'paragraph':
        case 'richText': {
          const p = document.createElement('p');
          p.className = 'article-paragraph';
          renderInlineContent(block.content || block.text, p);
          container.appendChild(p);
          break;
        }

        // 2. Headings (h2, h3, h4)
        case 'heading': {
          const level = Math.min(Math.max(parseInt(block.level, 10) || 2, 2), 4);
          const heading = document.createElement(`h${level}`);
          heading.className = `article-heading article-heading-${level}`;
          if (block.id) heading.id = block.id;
          renderInlineContent(block.content || block.text, heading);
          container.appendChild(heading);
          break;
        }

        // 3. Lists (unordered / ordered)
        case 'list': {
          const isOrdered = block.style === 'ordered' || block.ordered === true;
          const list = document.createElement(isOrdered ? 'ol' : 'ul');
          list.className = isOrdered ? 'article-list article-ordered-list' : 'article-list article-unordered-list';

          if (Array.isArray(block.items)) {
            block.items.forEach(item => {
              const li = document.createElement('li');
              renderInlineContent(item.content || item.text || item, li);
              list.appendChild(li);
            });
          }
          container.appendChild(list);
          break;
        }

        // 4. Code Block
        case 'code':
        case 'codeBlock': {
          const codeWrapper = document.createElement('div');
          codeWrapper.className = 'article-code-wrapper';

          const codeHeader = document.createElement('div');
          codeHeader.className = 'article-code-header';

          const langLabel = document.createElement('span');
          langLabel.className = 'article-code-lang';
          langLabel.textContent = block.language || block.filename || 'Code';
          codeHeader.appendChild(langLabel);

          const copyBtn = document.createElement('button');
          copyBtn.className = 'article-code-copy-btn';
          copyBtn.innerHTML = '<i class="uil uil-copy"></i> <span>Copy</span>';
          copyBtn.type = 'button';
          
          const rawCode = block.code || block.text || '';
          copyBtn.addEventListener('click', async () => {
            try {
              await navigator.clipboard.writeText(rawCode);
              copyBtn.innerHTML = '<i class="uil uil-check"></i> <span>Copied!</span>';
              setTimeout(() => {
                copyBtn.innerHTML = '<i class="uil uil-copy"></i> <span>Copy</span>';
              }, 2000);
            } catch {
              copyBtn.textContent = 'Copied!';
              setTimeout(() => {
                copyBtn.innerHTML = '<i class="uil uil-copy"></i> <span>Copy</span>';
              }, 2000);
            }
          });
          codeHeader.appendChild(copyBtn);
          codeWrapper.appendChild(codeHeader);

          const pre = document.createElement('pre');
          pre.className = 'article-code-pre';
          const codeEl = document.createElement('code');
          codeEl.className = block.language ? `language-${block.language}` : '';
          codeEl.textContent = rawCode;
          pre.appendChild(codeEl);
          codeWrapper.appendChild(pre);

          container.appendChild(codeWrapper);
          break;
        }

        // 5. Blockquote / Quote
        case 'quote':
        case 'blockquote': {
          const quote = document.createElement('blockquote');
          quote.className = 'article-quote';

          const quoteText = document.createElement('p');
          renderInlineContent(block.content || block.text, quoteText);
          quote.appendChild(quoteText);

          if (block.author || block.cite) {
            const footer = document.createElement('footer');
            footer.className = 'article-quote-footer';
            footer.textContent = `— ${block.author || block.cite}`;
            quote.appendChild(footer);
          }
          container.appendChild(quote);
          break;
        }

        // 6. Image with optional caption
        case 'image': {
          const figure = document.createElement('figure');
          figure.className = 'article-figure';

          const img = document.createElement('img');
          img.src = sanitizeUrl(block.src);
          img.alt = block.alt || block.caption || 'Article image';
          img.loading = 'lazy';
          img.onerror = () => { img.src = 'assets/img/work-1.webp'; };
          figure.appendChild(img);

          if (block.caption) {
            const figcaption = document.createElement('figcaption');
            figcaption.className = 'article-figcaption';
            figcaption.textContent = block.caption;
            figure.appendChild(figcaption);
          }
          container.appendChild(figure);
          break;
        }

        // 7. Callout / Alert Box
        case 'callout': {
          const callout = document.createElement('div');
          const variant = block.variant || 'info'; // info, tip, warning, note
          callout.className = `article-callout article-callout-${variant}`;

          let iconClass = 'uil uil-info-circle';
          if (variant === 'warning') iconClass = 'uil uil-exclamation-triangle';
          if (variant === 'tip' || variant === 'success') iconClass = 'uil uil-check-circle';
          if (variant === 'note') iconClass = 'uil uil-bookmark';

          const calloutHeader = document.createElement('div');
          calloutHeader.className = 'article-callout-header';
          calloutHeader.innerHTML = `<i class="${iconClass}"></i> <strong>${escapeHTML(block.title || variant.toUpperCase())}</strong>`;
          callout.appendChild(calloutHeader);

          const calloutBody = document.createElement('div');
          calloutBody.className = 'article-callout-body';
          renderInlineContent(block.content || block.text, calloutBody);
          callout.appendChild(calloutBody);

          container.appendChild(callout);
          break;
        }

        // 8. Horizontal Divider
        case 'divider':
        case 'separator':
        case 'hr': {
          const hr = document.createElement('hr');
          hr.className = 'article-divider';
          container.appendChild(hr);
          break;
        }

        // 9. Block Link / CTA Button
        case 'link': {
          const linkBox = document.createElement('div');
          linkBox.className = 'article-block-link-wrapper';
          const a = document.createElement('a');
          a.className = 'btn btn-sm btn-primary article-block-link';
          a.href = sanitizeUrl(block.url);
          a.textContent = block.text || 'Explore Link';
          if (block.target === '_blank' || (block.url && block.url.startsWith('http'))) {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
          }
          linkBox.appendChild(a);
          container.appendChild(linkBox);
          break;
        }

        // 10. Responsive Video Embed
        case 'video':
        case 'youtube': {
          let embedSrc = block.url || block.src || '';
          if (block.videoId) {
            embedSrc = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(block.videoId)}`;
          } else if (embedSrc.includes('youtube.com/watch?v=')) {
            const vId = embedSrc.split('v=')[1]?.split('&')[0];
            if (vId) embedSrc = `https://www.youtube-nocookie.com/embed/${vId}`;
          }

          if (embedSrc) {
            const videoWrap = document.createElement('div');
            videoWrap.className = 'article-video-wrapper';
            const iframe = document.createElement('iframe');
            iframe.src = sanitizeUrl(embedSrc);
            iframe.title = block.title || 'Video player';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';
            videoWrap.appendChild(iframe);
            container.appendChild(videoWrap);
          }
          break;
        }

        // Default fallback for unrecognized blocks
        default: {
          if (block.text) {
            const p = document.createElement('p');
            p.className = 'article-paragraph';
            renderInlineContent(block.text, p);
            container.appendChild(p);
          }
          break;
        }
      }
    });
    return container;
  }

  return container;
}
