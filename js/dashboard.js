import { rupees, statusMeta } from './utils.js';

export function dashboardView(farmer, all = false) {
  const received = farmer.installments.filter(x => x.status === 'received');
  const failed = farmer.installments.filter(x => x.status === 'failed');
  const pending = farmer.installments.filter(x => x.status === 'pending');
  const shown = all ? farmer.installments : farmer.installments.slice(0, 5);
  return `
    <section class="screen dashboard-screen">
      <header class="dashboard-hero">
        <div class="prototype">PROTOTYPE</div>
        <button class="icon-btn light" data-route="login" aria-label="Log out">⇥</button>
        <p>Namaste 🙏</p><h1>${farmer.name}</h1>
        <span>Reg. No. ${farmer.regNumber}</span><span class="location">${farmer.district}, ${farmer.state}</span>
      </header>
      <div class="dashboard-body">
        <div class="summary-grid" aria-label="Payment summary">
          <article class="summary success"><span>💰</span><strong>${rupees(received.length * 2000)}</strong><small>Total received</small></article>
          <article class="summary warning"><span>◷</span><strong>${pending.length}</strong><small>Pending</small></article>
          <article class="summary danger"><span>!</span><strong>${failed.length}</strong><small>Failed</small></article>
        </div>
        ${failed.length ? `<div class="failure-banner"><span>⚠️</span><p><b>Payment failed</b><br>Your ${farmer.issueDetails.failedInstallment}rd installment was not credited</p><button data-route="diagnosis">Fix now</button></div>` : `<div class="success-banner">✓ All your installments are up to date.</div>`}
        <div class="action-grid">
          <button class="action-card" data-route="diagnosis"><i>🔍</i><span>Why did my<br>payment fail?</span></button>
          <button class="action-card" data-route="chat"><i>🤖</i><span>Talk to<br>Sahayak AI</span></button>
          <button class="action-card" data-route="diagnosis"><i>🪪</i><span>Complete<br>eKYC</span></button>
          <button class="action-card" data-route="helpline"><i>📞</i><span>Helpline &<br>Support</span></button>
        </div>
        <div class="section-heading"><h2>Payment history</h2><button class="text-btn" data-action="history">${all ? 'Show less' : 'View all'}</button></div>
        <div class="payment-list">${shown.map(paymentCard).join('')}</div>
        <article class="about-card"><span>🌱</span><div><h2>About PM-KISAN</h2><p>A support prototype for tracking PM-KISAN payments and resolving common verification issues.</p><div class="schedule"><b>Apr–Jul</b><b>Aug–Nov</b><b>Dec–Mar</b></div></div></article>
        <p class="disclaimer">This is a prototype. Not affiliated with any government body.</p>
      </div>
    </section>`;
}

function paymentCard(item) {
  const [icon, label] = statusMeta(item.status);
  return `<article class="payment-card"><div><h3>${item.number}${suffix(item.number)} installment</h3><p>${item.date} · ${rupees(item.amount)}</p></div><span class="payment-status ${item.status}">${icon} ${label}</span></article>`;
}
function suffix(n) { const m = n % 100; return m >= 11 && m <= 13 ? 'th' : ({ 1:'st', 2:'nd', 3:'rd' }[n % 10] || 'th'); }
