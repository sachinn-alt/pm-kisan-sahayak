import { rupees, statusMeta } from './utils.js';
import { LANGUAGES, t } from './i18n.js';
import { tablerIcon } from './icons.js';

export function dashboardView(farmer, all = false, lang = 'hi') {
  const received = farmer.installments.filter(x => x.status === 'received');
  const failed = farmer.installments.filter(x => x.status === 'failed');
  const pending = farmer.installments.filter(x => x.status === 'pending');
  const shown = all ? farmer.installments : farmer.installments.slice(0, 5);

  const isEkycOk = farmer.ekycStatus === 'valid';
  const isDbtOk = farmer.dbtStatus === 'linked';
  const isLandOk = farmer.landStatus === 'verified';
  const isAllEligible = isEkycOk && isDbtOk && isLandOk;

  return `
    <section class="screen dashboard-screen">
      <header class="dashboard-hero">
        <!-- Official Government Masthead Row -->
        <div class="gov-topbar">
          <div class="gov-brand">
            <span class="gov-tricolor"></span>
            <div class="gov-title-group">
              <span class="gov-dept-name">PM-KISAN · भारत सरकार</span>
              <span class="gov-status-pill">
                <i class="pulse-dot"></i> 2G/Offline Ready
              </span>
            </div>
          </div>

          <div class="gov-actions">
            <select id="dash-lang-select" class="lang-select-dropdown" aria-label="Select Language">
              ${Object.entries(LANGUAGES).map(([code, l]) => `<option value="${code}" ${code === lang ? 'selected' : ''}>${l.name}</option>`).join('')}
            </select>
            <button class="icon-btn light" data-route="login" aria-label="Log out" title="Log out">
              ${tablerIcon('logout', 17)}
            </button>
          </div>
        </div>

        <!-- Citizen Profile Card -->
        <div class="citizen-profile-banner">
          <div class="citizen-avatar">
            ${farmer.name.split(' ').map(x => x[0]).join('').slice(0, 2)}
          </div>
          <div class="citizen-details">
            <p class="greeting-text">${t('namaste', lang)}</p>
            <h1>${farmer.name}</h1>
            <div class="citizen-meta-pills">
              <span class="dbt-verified-pill">${tablerIcon('circleCheck', 12)} DBT Verified</span>
              <span class="reg-pill">Reg: ${farmer.regNumber}</span>
            </div>
            <span class="citizen-loc">${tablerIcon('mapPin', 12)} ${farmer.village}, ${farmer.district}, ${farmer.state}</span>
          </div>
        </div>
      </header>

      <div class="dashboard-body">
        <div class="summary-grid" aria-label="Payment summary">
          <article class="summary success stagger-card" style="animation-delay: 0.05s">
            <span class="summary-icon">${tablerIcon('coinRupee', 22)}</span>
            <strong data-count-target="${received.length * 2000}" data-is-currency="true">${rupees(received.length * 2000)}</strong>
            <small>${t('totalReceived', lang)}</small>
          </article>
          <article class="summary warning stagger-card" style="animation-delay: 0.12s">
            <span class="summary-icon">${tablerIcon('clock', 22)}</span>
            <strong data-count-target="${pending.length}">${pending.length}</strong>
            <small>${t('pending', lang)}</small>
          </article>
          <article class="summary danger stagger-card" style="animation-delay: 0.18s">
            <span class="summary-icon">${tablerIcon('alertTriangle', 22)}</span>
            <strong data-count-target="${failed.length}">${failed.length}</strong>
            <small>${t('failed', lang)}</small>
          </article>
        </div>

        ${failed.length ? `
          <div class="failure-banner">
            <span>${tablerIcon('alertCircle', 24)}</span>
            <p><b>${t('paymentFailed', lang)}</b><br>${t('paymentFailedDesc', lang)}</p>
            <button data-route="diagnosis">${t('fixNow', lang)} ${tablerIcon('arrowRight', 14)}</button>
          </div>
        ` : `
          <div class="success-banner">${tablerIcon('circleCheck', 20)} All your installments are up to date.</div>
        `}

        <!-- WhatsApp Guidance Banner (Zero-Install Rural Access) -->
        <div class="whatsapp-prompt-banner">
          <div class="wa-banner-icon">${tablerIcon('brandWhatsapp', 28)}</div>
          <div class="wa-banner-content">
            <span class="wa-badge">ZERO-INSTALL COMPANION</span>
            <h3>${lang === 'hi' ? 'व्हाट्सएप सहायक बॉट (WhatsApp Bot)' : 'WhatsApp Sahayak Bot'}</h3>
            <p>${lang === 'hi' ? 'बिना ऐप डाउनलोड किए सीधे व्हाट्सएप पर स्थिति व समाधान देखें' : 'Instant guidance & Seva Parchi on WhatsApp without downloading any app'}</p>
          </div>
          <button class="wa-launch-btn" data-route="whatsapp">
            <span>${lang === 'hi' ? 'शुरू करें' : 'Open'}</span> ${tablerIcon('arrowRight', 14)}
          </button>
        </div>

        <!-- Hub Highlights (Farmer Corner, Map, CSC Locator & Impact) -->
        <div class="hub-action-row">
          <button class="hub-btn primary-hub" data-route="farmer-corner">
            <span class="hub-icon">${tablerIcon('tractor', 22)}</span>
            <div>
              <strong>किसान कॉर्नर</strong>
              <small>8 Core Services</small>
            </div>
            <i>${tablerIcon('chevronRight', 16)}</i>
          </button>
          <button class="hub-btn map-hub" data-route="map">
            <span class="hub-icon">${tablerIcon('map', 22)}</span>
            <div>
              <strong>वितरण नक्शा</strong>
              <small>State Analytics</small>
            </div>
            <i>${tablerIcon('chevronRight', 16)}</i>
          </button>
        </div>

        <div class="hub-action-row secondary-hubs">
          <button class="hub-btn csc-hub" data-route="csc-locator">
            <span class="hub-icon">${tablerIcon('mapPin', 22)}</span>
            <div>
              <strong>नजदीकी CSC केंद्र</strong>
              <small>Locate Jan Seva Kendra</small>
            </div>
            <i>${tablerIcon('chevronRight', 16)}</i>
          </button>
          <button class="hub-btn impact-hub" data-route="impact">
            <span class="hub-icon">${tablerIcon('award', 22)}</span>
            <div>
              <strong>प्रभाव व प्रतिस्पर्धा</strong>
              <small>Impact & Benchmark</small>
            </div>
            <i>${tablerIcon('chevronRight', 16)}</i>
          </button>
        </div>

        <div class="action-grid">
          <button class="action-card" data-route="diagnosis">
            <i>${tablerIcon('search', 20)}</i>
            <span>${t('whyPaymentFailed', lang)}</span>
          </button>
          <button class="action-card" data-route="chat">
            <i>${tablerIcon('robot', 20)}</i>
            <span>${t('talkToSahayak', lang)}</span>
          </button>
          <button class="action-card" data-route="csc-locator">
            <i>${tablerIcon('buildingStore', 20)}</i>
            <span>${lang === 'hi' ? 'CSC केंद्र खोजें' : 'Locate CSC'}</span>
          </button>
          <button class="action-card" data-route="helpline">
            <i>${tablerIcon('phone', 20)}</i>
            <span>${t('helplineSupport', lang)}</span>
          </button>
        </div>

        <!-- 24th Installment Eligibility & Release Tracker -->
        <article class="eligibility-card ${isAllEligible ? 'eligible' : 'action-needed'}">
          <div class="eligibility-header">
            <div>
              <span class="eligibility-tag">${isAllEligible ? `${tablerIcon('circleCheck', 14)} 100% Eligible` : `${tablerIcon('alertTriangle', 14)} Action Required`}</span>
              <h3>24वीं किस्त पात्रता जांच (24th Installment Tracker)</h3>
            </div>
            <span class="expected-date">Expected: Oct–Nov 2026</span>
          </div>

          <div class="eligibility-checklist">
            <div class="check-item ${isEkycOk ? 'ok' : 'warn'}">
              <span class="check-icon">${isEkycOk ? tablerIcon('circleCheck', 16) : tablerIcon('alertTriangle', 16)}</span>
              <div>
                <strong>e-KYC सत्यापन</strong>
                <small>${isEkycOk ? 'सक्रिय (Active)' : 'नवीनीकरण लंबित (Expired)'}</small>
              </div>
            </div>

            <div class="check-item ${isDbtOk ? 'ok' : 'warn'}">
              <span class="check-icon">${isDbtOk ? tablerIcon('circleCheck', 16) : tablerIcon('alertTriangle', 16)}</span>
              <div>
                <strong>आधार-बैंक DBT सीडिंग</strong>
                <small>${isDbtOk ? 'सक्रिय (NPCI Linked)' : 'नाम सुधार आवश्यक (Mismatch)'}</small>
              </div>
            </div>

            <div class="check-item ${isLandOk ? 'ok' : 'warn'}">
              <span class="check-icon">${isLandOk ? tablerIcon('circleCheck', 16) : tablerIcon('alertTriangle', 16)}</span>
              <div>
                <strong>भूलेख अंकन (Land Seeding)</strong>
                <small>${isLandOk ? 'सत्यापित (Verified)' : 'लेखपाल सत्यापन बाकी (Pending)'}</small>
              </div>
            </div>
          </div>
        </article>

        <div class="section-heading">
          <h2>${t('paymentHistory', lang)}</h2>
          <button class="text-btn" data-action="history">${all ? t('showLess', lang) : t('viewAll', lang)}</button>
        </div>

        <div class="payment-list">
          ${shown.map(paymentCard).join('')}
        </div>

        <article class="about-card">
          <span class="about-icon">${tablerIcon('sprout', 28)}</span>
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
  const isReceived = item.status === 'received';
  const isFailed = item.status === 'failed';
  const icon = isReceived ? tablerIcon('circleCheck', 14) : (isFailed ? tablerIcon('circleX', 14) : tablerIcon('clock', 14));
  const label = isReceived ? 'Received' : (isFailed ? 'Failed' : 'Pending');

  return `
    <article class="payment-card">
      <div>
        <h3>${item.number}${suffix(item.number)} Installment</h3>
        <p>${item.date} • ${rupees(item.amount)}</p>
      </div>
      <span class="payment-status ${item.status}">${icon} <span>${label}</span></span>
    </article>
  `;
}

function suffix(n) {
  const m = n % 100;
  return m >= 11 && m <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th');
}
