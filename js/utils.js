export const rupees = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
export const initials = name => name.split(' ').map(x => x[0]).join('').slice(0, 2);
export const escape = value => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[char]));
export function toast(message, type = 'info') {
  const host = document.querySelector('#toast-region');
  host.innerHTML = `<div class="toast ${type}">${message}</div>`;
  setTimeout(() => host.innerHTML = '', 3000);
}
export function statusMeta(status) {
  return status === 'received' ? ['✓', 'Received'] : status === 'failed' ? ['×', 'Failed'] : ['◷', 'Pending'];
}
