import { rupees, statusMeta } from './utils.js';
import { LANGUAGES, t } from './i18n.js';
import { tablerIcon, emblemOfIndia } from './icons.js';
import { renderWeatherBadge } from './weather.js';
import { renderMandiTicker } from './mandi-data.js';

export function dashboardView(farmer, all = false, lang = 'hi', weatherData = null) {
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
        <!-- Official Government Masthead Row with State Emblem -->
        <div class="gov-topbar">
          <div class="gov-brand">
            ${emblemOfIndia(42, 'gov-masthead-emblem')}
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

        <!-- Citizen Profile Card with Live Weather Widget on Right -->
        <div class="citizen-profile-banner">
          <div class="citizen-profile-left">
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

          <!-- Live District Weather Widget -->
          <div class="citizen-profile-right">
            ${renderWeatherBadge(weatherData, lang)}
          </div>
        </div>

        <!-- Live APMC Mandi Bhav Moving Marquee Ticker -->
        ${renderMandiTicker(farmer.state, lang)}
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
            <div class="failure-banner-text">
              <b>${t('paymentFailed', lang)}</b>
              <p>${t('paymentFailedDesc', lang)}</p>
            </div>
            <button data-route="diagnosis">${t('fixNow', lang)} ${tablerIcon('arrowRight', 14)}</button>
          </div>
        ` : `
          <div class="success-banner">${tablerIcon('circleCheck', 20)} ${lang === 'hi' ? 'आपकी सभी किस्तें अपडेट हैं। कोई समस्या नहीं है।' : 'All your installments are up to date.'}</div>
        `}

        <!-- Core Citizen Action Grid (4 Primary Tools) -->
        <div class="action-grid">
          <button class="action-card ${failed.length ? 'highlight-alert' : ''}" data-route="diagnosis">
            <span class="action-card-icon">${tablerIcon('search', 22)}</span>
            <div class="action-card-info">
              <strong>${t('whyPaymentFailed', lang)}</strong>
              <small>${lang === 'hi' ? 'समस्या का कारण व निवारण' : 'Instant AI Diagnosis'}</small>
            </div>
          </button>
          <button class="action-card" data-route="chat">
            <span class="action-card-icon chat-icon">${tablerIcon('robot', 22)}</span>
            <div class="action-card-info">
              <strong>${t('talkToSahayak', lang)}</strong>
              <small>${lang === 'hi' ? 'आवाज़ में सवाल पूछें' : 'Voice AI Assistant'}</small>
            </div>
          </button>
          <button class="action-card" id="btn-open-ocr-scanner">
            <span class="action-card-icon ocr-icon">${tablerIcon('camera', 22)}</span>
            <div class="action-card-info">
              <strong>${lang === 'hi' ? 'दस्तावेज OCR स्कैनर' : 'Document OCR'}</strong>
              <small>${lang === 'hi' ? 'आधार व पासबुक जांच' : 'Aadhaar & Passbook'}</small>
            </div>
          </button>
          <button class="action-card" data-route="scam-radar">
            <span class="action-card-icon scam-icon">${tablerIcon('shieldCheck', 22)}</span>
            <div class="action-card-info">
              <strong>${lang === 'hi' ? 'सुरक्षा व फ्रॉड रडार' : 'Scam Radar'}</strong>
              <small>${lang === 'hi' ? '1930 साइबर हेल्पलाइन' : '1930 Cyber Hotline'}</small>
            </div>
          </button>
        </div>

        <!-- 24th Installment Eligibility & Release Tracker (Framer-grade Card) -->
        <article class="tracker-card ${isAllEligible ? 'all-verified' : 'needs-action'}">
          <div class="tracker-card-glow"></div>
          
          <div class="tracker-header">
            <div class="tracker-title-group">
              <div class="tracker-status-chip ${isAllEligible ? 'chip-success' : 'chip-alert'}">
                <span class="chip-pulse-dot"></span>
                <span>${isAllEligible ? '100% READY · पूर्ण पात्र' : `${3 - ((isEkycOk?1:0)+(isDbtOk?1:0)+(isLandOk?1:0))} ACTION NEEDED · समाधान आवश्यक`}</span>
              </div>
              <h3>24वीं किस्त पात्रता जांच (24th Installment Tracker)</h3>
            </div>
            <div class="tracker-date-badge">
              ${tablerIcon('clock', 13)}
              <span>Expected: Oct–Nov 2026</span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="tracker-progress-wrap">
            <div class="progress-info-row">
              <span>पात्रता प्रगति (Readiness)</span>
              <strong>${(isEkycOk?1:0)+(isDbtOk?1:0)+(isLandOk?1:0)}/3 Pillars Verified (${Math.round((((isEkycOk?1:0)+(isDbtOk?1:0)+(isLandOk?1:0))/3)*100)}%)</strong>
            </div>
            <div class="tracker-progress-bar">
              <div class="tracker-progress-fill ${isAllEligible ? 'fill-green' : 'fill-amber'}" style="width: ${Math.round((((isEkycOk?1:0)+(isDbtOk?1:0)+(isLandOk?1:0))/3)*100)}%"></div>
            </div>
          </div>

          <div class="tracker-pillars-grid">
            <div class="pillar-item ${isEkycOk ? 'pillar-ok' : 'pillar-warn'}" ${!isEkycOk ? 'data-route="diagnosis"' : ''}>
              <div class="pillar-icon-box">
                ${isEkycOk ? tablerIcon('circleCheck', 18) : tablerIcon('alertTriangle', 18)}
              </div>
              <div class="pillar-details">
                <strong>e-KYC सत्यापन</strong>
                <small>${isEkycOk ? 'सक्रिय (Active Identity)' : 'नवीनीकरण लंबित (Renewal Expired)'}</small>
              </div>
              <div class="pillar-status-pill ${isEkycOk ? 'pill-ok' : 'pill-warn'}">
                ${isEkycOk ? 'सत्यापित' : 'नवीनीकरण ➔'}
              </div>
            </div>

            <div class="pillar-item ${isDbtOk ? 'pillar-ok' : 'pillar-warn'}" ${!isDbtOk ? 'data-route="diagnosis"' : ''}>
              <div class="pillar-icon-box">
                ${isDbtOk ? tablerIcon('circleCheck', 18) : tablerIcon('alertTriangle', 18)}
              </div>
              <div class="pillar-details">
                <strong>आधार-बैंक DBT सीडिंग</strong>
                <small>${isDbtOk ? 'सक्रिय (NPCI Linked)' : 'नाम सुधार आवश्यक (Mismatch)'}</small>
              </div>
              <div class="pillar-status-pill ${isDbtOk ? 'pill-ok' : 'pill-warn'}">
                ${isDbtOk ? 'लिंक्ड' : 'सुधारें ➔'}
              </div>
            </div>

            <div class="pillar-item ${isLandOk ? 'pillar-ok' : 'pillar-warn'}" ${!isLandOk ? 'data-route="diagnosis"' : ''}>
              <div class="pillar-icon-box">
                ${isLandOk ? tablerIcon('circleCheck', 18) : tablerIcon('alertTriangle', 18)}
              </div>
              <div class="pillar-details">
                <strong>भूलेख अंकन (Land Seeding)</strong>
                <small>${isLandOk ? 'सत्यापित (Verified Khatauni)' : 'लेखपाल सत्यापन बाकी (Pending)'}</small>
              </div>
              <div class="pillar-status-pill ${isLandOk ? 'pill-ok' : 'pill-warn'}">
                ${isLandOk ? 'सत्यापित' : 'जांचें ➔'}
              </div>
            </div>
          </div>

          ${!isAllEligible ? `
            <button class="tracker-fix-cta" data-route="diagnosis">
              <span>${tablerIcon('sparkles', 16)} 23वीं किस्त का तुरंत AI समाधान देखें (Fix Issue)</span>
              ${tablerIcon('arrowRight', 14)}
            </button>
          ` : ''}
        </article>

        <!-- WhatsApp Guidance Banner (Zero-Install Rural Access) -->
        <div class="whatsapp-prompt-banner">
          <div class="wa-banner-icon">${tablerIcon('brandWhatsapp', 28)}</div>
          <div class="wa-banner-content">
            <span class="wa-badge">ZERO-INSTALL COMPANION</span>
            <h3>${lang === 'hi' ? 'व्हाट्सएप सहायक बॉट (WhatsApp Bot)' : 'WhatsApp Sahayak Bot'}</h3>
            <p>${lang === 'hi' ? 'बिना ऐप डाउनलोड किए सीधे व्हाट्सएप पर स्थिति व पर्ची प्राप्त करें' : 'Instant guidance & Seva Parchi on WhatsApp without downloading any app'}</p>
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
              <small>GPS Location</small>
            </div>
            <i>${tablerIcon('chevronRight', 16)}</i>
          </button>
          <button class="hub-btn impact-hub" data-route="impact">
            <span class="hub-icon">${tablerIcon('award', 22)}</span>
            <div>
              <strong>प्रभाव व ROI</strong>
              <small>₹1,420/yr Saved</small>
            </div>
            <i>${tablerIcon('chevronRight', 16)}</i>
          </button>
        </div>

        <div class="payment-history-section">
          <div class="section-heading">
            <div class="heading-with-badge">
              <h2>${t('paymentHistory', lang)}</h2>
              <span class="installment-count-tag">${farmer.installments.length} Total</span>
            </div>
            <span class="scroll-hint-label">
              ${tablerIcon('arrowsSort', 12)} ${lang === 'hi' ? 'टाइमलाइन स्क्रॉल करें' : 'Scroll Timeline'}
            </span>
          </div>

          <div class="payment-list-wrapper">
            <div class="payment-list" id="payment-history-scroll" tabindex="0" role="region" aria-label="Payment History Timeline">
              ${farmer.installments.map(paymentCard).join('')}
            </div>
          </div>
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
  const statusClass = item.status;

  return `
    <article class="payment-card ${statusClass}">
      <div class="payment-card-left">
        <div class="installment-number-badge ${statusClass}">
          <span>#${item.number}</span>
        </div>
        <div class="installment-info">
          <h3>${item.number}${suffix(item.number)} Installment</h3>
          <p>${item.date} • <strong class="payment-amount">${rupees(item.amount)}</strong></p>
        </div>
      </div>
      <span class="payment-status ${statusClass}">
        ${icon}
        <span>${label}</span>
      </span>
    </article>
  `;
}

function suffix(n) {
  const m = n % 100;
  return m >= 11 && m <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th');
}
