export const rupees = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
export const initials = name => name.split(' ').map(x => x[0]).join('').slice(0, 2);
export const escape = value => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[char]));

export function toast(message, type = 'info') {
  const host = document.querySelector('#toast-region');
  if (!host) return;
  host.innerHTML = `<div class="toast ${type}">${message}</div>`;
  setTimeout(() => { if (host) host.innerHTML = ''; }, 3000);
}

export function statusMeta(status) {
  return status === 'received' ? ['✓', 'Received'] : status === 'failed' ? ['×', 'Failed'] : ['◷', 'Pending'];
}

// Animate numbers smoothly from 0 to target
export function animateCounters() {
  document.querySelectorAll('[data-count-target]').forEach(el => {
    const target = parseFloat(el.dataset.countTarget);
    const prefix = el.dataset.countPrefix || '';
    const suffix = el.dataset.countSuffix || '';
    const isCurrency = el.dataset.isCurrency === 'true';
    const duration = 650; // ms
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(target * ease);

      el.textContent = isCurrency ? rupees(currentVal) : `${prefix}${currentVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = isCurrency ? rupees(target) : `${prefix}${target}${suffix}`;
      }
    }

    requestAnimationFrame(updateCount);
  });
}
