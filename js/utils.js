/**
 * MR. NEXORA PORTFOLIO | UTILITIES
 * Helper functions for toasts, clipboard, formatting, and DOM
 */

export function showToast(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconHtml = '<i class="uil uil-info-circle"></i>';
  if (type === 'success') iconHtml = '<i class="uil uil-check-circle" style="color: var(--success);"></i>';
  if (type === 'error') iconHtml = '<i class="uil uil-exclamation-triangle" style="color: var(--danger);"></i>';

  toast.innerHTML = `${iconHtml} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export async function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const tempInput = document.createElement('textarea');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      tempInput.remove();
    }
    showToast(successMsg, 'success');
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    showToast('Could not copy to clipboard', 'error');
    return false;
  }
}

export function formatDate(dateString) {
  if (!dateString) return 'Present';
  const parts = dateString.split('-');
  if (parts.length === 1) return dateString; // Just year
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[parseInt(parts[1], 10) - 1] || '';
  const year = parts[0];
  
  return month ? `${month} ${year}` : year;
}

export function debounce(func, wait = 250) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
