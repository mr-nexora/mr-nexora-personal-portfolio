/**
 * MR. NEXORA PORTFOLIO | INTERACTIVE EXPERIMENTS & TOOLS
 * Hands-on client-side utilities showcasing developer capabilities
 */

import { copyToClipboard } from './utils.js';

export function initToolsSection() {
  const container = document.querySelector('.home-tools-grid');
  if (!container) return;

  container.innerHTML = `
    <!-- Tool 1: CSS Gradient Studio -->
    <div class="tool-interactive-card">
      <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 8px;">
        <div class="channel-icon" style="width:38px; height:38px; font-size:1.1rem;"><i class="uil uil-palette"></i></div>
        <h3 style="font-size: var(--text-base);">CSS Gradient Studio</h3>
      </div>
      <p style="font-size: var(--text-xs); color: var(--text-secondary);">Interactive linear gradient generator with instant CSS copy.</p>
      
      <div id="gradient-preview" style="height: 60px; border-radius: var(--radius-md); margin-top: 12px; background: linear-gradient(135deg, #3b82f6, #06b6d4); border: 1px solid var(--border-color);"></div>
      
      <div style="display: flex; gap: 8px; margin-top: 12px;">
        <button class="btn btn-sm btn-outline randomize-gradient-btn" style="flex:1;">
          <i class="uil uil-sync"></i> Randomize
        </button>
        <button class="btn btn-sm btn-primary copy-gradient-btn">
          <i class="uil uil-copy"></i> Copy CSS
        </button>
      </div>
    </div>

    <!-- Tool 2: Markdown Previewer -->
    <div class="tool-interactive-card">
      <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 8px;">
        <div class="channel-icon" style="width:38px; height:38px; font-size:1.1rem; background: var(--accent-subtle); color: var(--accent);"><i class="uil uil-document-layout-left"></i></div>
        <h3 style="font-size: var(--text-base);">Markdown to HTML</h3>
      </div>
      <p style="font-size: var(--text-xs); color: var(--text-secondary);">Convert basic markdown syntax into clean semantic HTML.</p>
      
      <input type="text" id="markdown-input" class="form-control" style="font-size:var(--text-xs); padding: 8px 12px; margin-top: 12px;" value="**Mr. Nexora** creates *secure* web apps." placeholder="Type markdown...">
      <div id="markdown-output" style="font-size:var(--text-xs); margin-top: 8px; padding: 8px 12px; background: var(--bg-surface-elevated); border-radius: var(--radius-sm); border: 1px solid var(--border-color); min-height: 32px;"></div>
    </div>

    <!-- Tool 3: Security Base64 / Hash Inspector -->
    <div class="tool-interactive-card">
      <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 8px;">
        <div class="channel-icon" style="width:38px; height:38px; font-size:1.1rem; background: rgba(16, 185, 129, 0.12); color: var(--success);"><i class="uil uil-shield-check"></i></div>
        <h3 style="font-size: var(--text-base);">Security Token Encoder</h3>
      </div>
      <p style="font-size: var(--text-xs); color: var(--text-secondary);">Instant Base64 encoding & string telemetry for security tokens.</p>
      
      <input type="text" id="token-input" class="form-control" style="font-size:var(--text-xs); padding: 8px 12px; margin-top: 12px;" value="auth_token_sahan_2026" placeholder="Enter string...">
      <div id="token-output" style="font-size:var(--text-xs); font-family:var(--font-mono); margin-top: 8px; padding: 8px 12px; background: var(--bg-surface-elevated); border-radius: var(--radius-sm); border: 1px solid var(--border-color); word-break: break-all;"></div>
    </div>
  `;

  // Bind Gradient Studio
  const preview = container.querySelector('#gradient-preview');
  const randomBtn = container.querySelector('.randomize-gradient-btn');
  const copyGradBtn = container.querySelector('.copy-gradient-btn');

  let currentGradient = 'linear-gradient(135deg, #3b82f6, #06b6d4)';

  const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#6366f1', '#14b8a6'];
  const randomize = () => {
    const c1 = colors[Math.floor(Math.random() * colors.length)];
    let c2 = colors[Math.floor(Math.random() * colors.length)];
    while (c1 === c2) c2 = colors[Math.floor(Math.random() * colors.length)];
    const deg = Math.floor(Math.random() * 360);
    currentGradient = `linear-gradient(${deg}deg, ${c1}, ${c2})`;
    if (preview) preview.style.background = currentGradient;
  };

  if (randomBtn) randomBtn.addEventListener('click', randomize);
  if (copyGradBtn) copyGradBtn.addEventListener('click', () => {
    copyToClipboard(`background: ${currentGradient};`, 'Gradient CSS copied!');
  });

  // Bind Markdown previewer
  const mdInput = container.querySelector('#markdown-input');
  const mdOutput = container.querySelector('#markdown-output');
  const renderMd = () => {
    if (!mdInput || !mdOutput) return;
    let txt = mdInput.value;
    txt = txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    txt = txt.replace(/\*(.*?)\*/g, '<em>$1</em>');
    txt = txt.replace(/`(.*?)`/g, '<code style="background:var(--primary-subtle); padding:2px 4px; border-radius:4px;">$1</code>');
    mdOutput.innerHTML = txt;
  };
  if (mdInput) {
    mdInput.addEventListener('input', renderMd);
    renderMd();
  }

  // Bind Security Token Encoder
  const tokenInput = container.querySelector('#token-input');
  const tokenOutput = container.querySelector('#token-output');
  const renderToken = () => {
    if (!tokenInput || !tokenOutput) return;
    try {
      const b64 = btoa(tokenInput.value);
      tokenOutput.textContent = `Base64: ${b64} (${tokenInput.value.length} chars)`;
    } catch {
      tokenOutput.textContent = 'Invalid characters for Base64';
    }
  };
  if (tokenInput) {
    tokenInput.addEventListener('input', renderToken);
    renderToken();
  }
}
