/**
 * MR. NEXORA PORTFOLIO | CONTACT CONTROLLER
 * Form validation, dynamic channel population, and copy helpers
 */

import { loadData } from './data-loader.js';
import { copyToClipboard, showToast, escapeHTML } from './utils.js';

export async function initContactPage() {
  const [personal, social] = await Promise.all([
    loadData('personal.json'),
    loadData('social.json')
  ]);

  initContactChannels(personal, social);
  initContactForm();
}

function initContactChannels(personal, social) {
  const channelsContainer = document.querySelector('.contact-channels-list');
  if (!channelsContainer || !personal) return;

  channelsContainer.innerHTML = `
    <div class="contact-channel-card">
      <div class="channel-icon">
        <i class="uil uil-envelope-alt"></i>
      </div>
      <div style="flex-grow:1;">
        <div class="channel-label">Email Address</div>
        <div class="channel-value">${escapeHTML(personal.email)}</div>
      </div>
      <button class="btn btn-sm btn-outline copy-btn" data-copy="${escapeHTML(personal.email)}" title="Copy email">
        <i class="uil uil-copy"></i>
      </button>
    </div>

    <div class="contact-channel-card">
      <div class="channel-icon" style="background: rgba(16, 185, 129, 0.12); color: var(--success);">
        <i class="uil uil-whatsapp"></i>
      </div>
      <div style="flex-grow:1;">
        <div class="channel-label">WhatsApp</div>
        <div class="channel-value">${escapeHTML(personal.phone)}</div>
      </div>
      <a href="https://wa.me/94765840479" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" title="Chat on WhatsApp">
        <i class="uil uil-external-link-alt"></i>
      </a>
    </div>

    <div class="contact-channel-card">
      <div class="channel-icon" style="background: var(--accent-subtle); color: var(--accent);">
        <i class="uil uil-map-marker"></i>
      </div>
      <div style="flex-grow:1;">
        <div class="channel-label">Location</div>
        <div class="channel-value">${escapeHTML(personal.location)}</div>
      </div>
    </div>

    <div class="contact-channel-card">
      <div class="channel-icon" style="background: rgba(59, 130, 246, 0.12); color: var(--primary);">
        <i class="uil uil-briefcase"></i>
      </div>
      <div style="flex-grow:1;">
        <div class="channel-label">Freelance Availability</div>
        <div class="channel-value" style="color: var(--success);">${escapeHTML(personal.freelanceStatus || 'Available')}</div>
      </div>
    </div>
  `;

  // Bind copy buttons
  const copyBtns = channelsContainer.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      copyToClipboard(textToCopy, `Copied ${textToCopy} to clipboard!`);
    });
  });
}

function initContactForm() {
  const form = document.querySelector('#contact-form');
  const alertBox = document.querySelector('#contact-form-alert');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#contact-name');
    const emailInput = form.querySelector('#contact-email');
    const subjectInput = form.querySelector('#contact-subject');
    const messageInput = form.querySelector('#contact-message');
    const submitBtn = form.querySelector('#contact-submit-btn');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    // Validation
    if (!name || name.length < 2) {
      showAlert('Please enter your name (at least 2 characters).', 'error');
      if (nameInput) nameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showAlert('Please enter a valid email address.', 'error');
      if (emailInput) emailInput.focus();
      return;
    }

    if (!message || message.length < 10) {
      showAlert('Please enter a descriptive message (at least 10 characters).', 'error');
      if (messageInput) messageInput.focus();
      return;
    }

    // Submission animation & state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="uil uil-spinner-alt"></i> Sending message...';

    // Simulate reliable delivery / EmailJS hook
    setTimeout(() => {
      showAlert(`Thank you, ${escapeHTML(name)}! Your message has been received. Sahan will reply to ${escapeHTML(email)} shortly.`, 'success');
      showToast('Message sent successfully!', 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 1000);
  });

  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = `form-alert ${type}`;
    alertBox.style.display = 'block';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
