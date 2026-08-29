import { rupees, statusMeta } from './utils.js';
import { LANGUAGES, t } from './i18n.js';

export function dashboardView(farmer, all = false, lang = 'hi') {
  const received = farmer.installments.filter(x => x.status === 'received');
  const failed = farmer.installments.filter(x => x.status === 'failed');
  const pending = farmer.installments.filter(x => x.status === 'pending');
  const shown = all ? farmer.installments : farmer.installments.slice(0, 5);

  return `
    <section class="screen dashboard-screen">
      <header class="dashboard-hero">
        <div class="govt-badge dark">PM-KISAN · DBT CITIZEN PORTAL</div>
        <div class="header-actions">
          <select id="dash-lang-select" class="lang-select-dropdown" aria-label="Select Language">
            ${Object.entries(LANGUAGES).map(([code, l]) => `<option value="${code}" ${code === lang ? 'selected' : ''}>${l.flag} ${l.name}</option>`).join('')}
          </select>
          <button class="icon-btn light" data-route="login" aria-label="Log out" title="Log out">🚪</button>
        </div>
        <p>${t('namaste', lang)} 🙏</p>
        <h1>${farmer.name}</h1>
        <span class="reg-badge">${t('regNumber', lang)}: ${farmer.regNumber}</span>
        <span class="location">📍 ${farmer.village}, ${farmer.district}, ${farmer.state}</span>
      </header>

      <div class="dashboard-body">
        <div class="summary-grid" aria-label="Payment summary">
          <article class="summary success">
            <span>💰</span>
            <strong>${rupees(received.length * 2000)}</strong>
            <small>${t('totalReceived', lang)}</small>
          </article>
          <article class="summary warning">
            <span>⏳</span>
            <strong>${pending.length}</strong>
            <small>${t('pending', lang)}</small>
          </article>
          <article class="summary danger">
            <span>❌</span>
            <strong>${failed.length}</strong>
            <small>${t('failed', lang)}</small>
          </article>
        </div>

        ${failed.length ? `
          <div class="failure-banner">
            <span>⚠️</span>
            <p><b>${t('paymentFailed', lang)}</b><br>${t('paymentFailedDesc', lang)}</p>
            <button data-route="diagnosis">${t('fixNow', lang)}</button>
          </div>
        ` : `
          <div class="success-banner">✅ All your installments are up to date.</div>
        `}

        <!-- Hub Highlights (Farmer Corner & Map) -->
        <div class="hub-action-row">
          <button class="hub-btn primary-hub" data-route="farmer-corner">
            <span class="hub-icon">🌾</span>
            <div>
              <strong>किसान कॉर्नर (Farmer Corner)</strong>
              <small>All 8 Beneficial Government Services</small>
            </div>
            <i>›</i>
          </button>
          <button class="hub-btn map-hub" data-route="map">
            <span class="hub-icon">🗺️</span>
            <div>
              <strong>वितरण नक्शा (Disbursement Map)</strong>
              <small>State & District City Analytics</small>
            </div>
            <i>›</i>
          </button>
        </div>

        <div class="action-grid">
          <button class="action-card" data-route="diagnosis">
            <i>🔍</i>
            <span>${t('whyPaymentFailed', lang)}</span>
          </button>
          <button class="action-card" data-route="chat">
            <i>🤖</i>
            <span>${t('talkToSahayak', lang)}</span>
          </button>
          <button class="action-card" data-route="diagnosis">
            <i>🪪</i>
            <span>${t('completeEkyc', lang)}</span>
          </button>
          <button class="action-card" data-route="helpline">
            <i>📞</i>
            <span>${t('helplineSupport', lang)}</span>
          </button>
        </div>

        <div class="section-heading">
          <h2>${t('paymentHistory', lang)}</h2>
          <button class="text-btn" data-action="history">${all ? t('showLess', lang) : t('viewAll', lang)}</button>
        </div>

        <div class="payment-list">
          ${shown.map(paymentCard).join('')}
        </div>

        <article class="about-card">
          <span>🌾</span>
          <div>
            <h2>${t('aboutScheme', lang)}</h2>
            <p>${t('aboutDesc', lang)}</p>
            <div class="schedule">
              <b>Apr–Jul (1st)</b>
              <b>Aug–Nov (2nd)</b>
              <b>Dec–Mar (3rd)</b>
            </div>
          </div>
        </article>

        <p class="disclaimer">${t('disclaimer', lang)}</p>
      </div>
    </section>`;
}

function paymentCard(item) {
  const [icon, label] = statusMeta(item.status);
  return `
    <article class="payment-card">
      <div>
        <h3>${item.number}${suffix(item.number)} Installment</h3>
        <p>${item.date} • ${rupees(item.amount)}</p>
      </div>
      <span class="payment-status ${item.status}">${icon} ${label}</span>
    </article>
  `;
}

function suffix(n) {
  const m = n % 100;
  return m >= 11 && m <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th');
}
