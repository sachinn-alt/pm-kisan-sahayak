import { tablerIcon, emblemOfIndia } from './icons.js';
import { LANGUAGES, t } from './i18n.js';

export const SCAM_ALERTS = [
  {
    id: 'apk_scam',
    threatLevel: 'HIGH',
    badgeColor: 'danger',
    icon: 'bug',
    titleHi: 'फर्जी APK ऐप डाउनलोड लिंक (Fake WhatsApp APK)',
    titleEn: 'Malicious Android APKs via WhatsApp',
    descHi: 'व्हाट्सएप पर "24वीं किस्त पाने हेतु यह ऐप इंस्टॉल करें" नाम से APK फाइल भेजी जा रही है।',
    descEn: 'Fraudulent APK files like "pmkisan24_bonus.apk" sent via WhatsApp drain bank accounts.',
    dangerTextHi: '⚠️ यह ऐप आपके मोबाइल से बैंक ओटीपी (SMS OTP) चुराकर पैसे निकाल लेता है।',
    dangerTextEn: '⚠️ Grants attackers SMS access to silently steal bank OTPs.',
    safeActionHi: 'पीएम-किसान का आधिकारिक ऐप केवल Google Play Store पर उपलब्ध है या सीधे pmkisan.gov.in पर जाएं।',
    safeActionEn: 'Never install .apk files received on WhatsApp. Only use official pmkisan.gov.in portal.'
  },
  {
    id: 'otp_call_scam',
    threatLevel: 'HIGH',
    badgeColor: 'danger',
    icon: 'phone',
    titleHi: 'फर्जी कृषि अधिकारी फोन कॉल व OTP मांगना',
    titleEn: 'Fake Krishi Bhawan OTP Impersonation Calls',
    descHi: 'फोन कर कहा जाता है: "मैं कृषि भवन दिल्ली से बोल रहा हूँ, आपका ₹2,000 रुका है, ओटीपी बताएं।"',
    descEn: 'Callers pretending to be Agriculture Ministry officers asking for OTP to release pending funds.',
    dangerTextHi: '⚠️ ओटीपी बताते ही आपके आधार-सीडेड बैंक खाते से तत्काल निकासी हो सकती है।',
    dangerTextEn: '⚠️ Sharing OTP allows attackers to siphon DBT funds immediately.',
    safeActionHi: 'सरकारी अधिकारी कभी फोन पर OTP या बैंक पासवर्ड नहीं मांगते। किसी को भी OTP न दें।',
    safeActionEn: 'PM-KISAN or Bank officials NEVER ask for OTP over phone. Cut the call immediately.'
  },
  {
    id: 'middlemen_scam',
    threatLevel: 'MEDIUM',
    badgeColor: 'warning',
    icon: 'coinRupee',
    titleHi: 'भूलेख अंकन / e-KYC के नाम पर अवैध वसूली',
    titleEn: 'Middlemen / Bribe Demands for Land Seeding',
    descHi: 'दलाल या अनाधिकृत व्यक्ति भूलेख सत्यापन के नाम पर ₹500–₹1,500 की मांग करते हैं।',
    descEn: 'Unauthorized agents charging illegal fees promising instant land-record verification.',
    dangerTextHi: '⚠️ यह पूर्णतः अवैध है। किसान की पात्रता में कोई अतिरिक्त लाभ नहीं मिलता।',
    dangerTextEn: '⚠️ All Government land verification processes are strictly 100% FREE.',
    safeActionHi: 'सरकारी सत्यापन पूर्णतः निःशुल्क (FREE) है। अवैध वसूली की शिकायत 1930 या 1800-180-1551 पर करें।',
    safeActionEn: 'Government verification is 100% free. Report bribe demands to National Helpline.'
  },
  {
    id: 'phishing_url_scam',
    threatLevel: 'HIGH',
    badgeColor: 'danger',
    icon: 'alertOctagon',
    titleHi: 'फर्जी वेबसाइटें (.xyz / .online / .vip)',
    titleEn: 'Fake Phishing Websites mimicking PM-KISAN',
    descHi: 'pmkisan-gov-dbt.site जैसे फर्जी लिंक भेजकर आधार नंबर व बैंक विवरण भरवाया जाता है।',
    descEn: 'Counterfeit portals designed to steal citizen Aadhaar numbers and bank credentials.',
    dangerTextHi: '⚠️ निजी जानकारी का उपयोग साइबर फ्रॉड के लिए किया जाता है।',
    dangerTextEn: '⚠️ Stolen Aadhaar data is exploited for identity theft & financial fraud.',
    safeActionHi: 'हमेशा ध्यान दें कि असली वेबसाइट का अंत केवल ".gov.in" पर होता है (pmkisan.gov.in)।',
    safeActionEn: 'Only trust URLs ending in .gov.in (Official: https://pmkisan.gov.in).'
  }
];

export const SCAM_QUIZ = [
  {
    id: 'q1',
    message: '🔴 "बधाई हो! PM-KISAN की 24वीं किस्त में आपको ₹4,000 मिलेंगे। तुरंत नीचे दी गई लिंक पर क्लिक करके अपना बैंक खाता और OTP दर्ज करें: http://pmkisan-bonus.xyz"',
    isScam: true,
    reasonHi: 'यह एक खतरनाक फ्रॉड (Scam) है! सरकारी डोमेन .gov.in होता है (.xyz नहीं) और सरकार कभी भी लिंक पर OTP नहीं मांगती।',
    reasonEn: 'This is a phishing SCAM! Official domains end in .gov.in, and the government never asks for OTP via links.'
  },
  {
    id: 'q2',
    message: '🟢 "प्रिय किसान, आपकी PM-KISAN e-KYC नवीनीकरण की तारीख नजदीक है। कृपया pmkisan.gov.in पर जाकर या नजदीकी CSC केंद्र पर बायोमेट्रिक से नवीनीकरण करें।"',
    isScam: false,
    reasonHi: 'यह सुरक्षित व आधिकारिक सूचना है! इसमें आधिकारिक वेबसाइट pmkisan.gov.in और नजदीकी CSC केंद्र का उल्लेख है।',
    reasonEn: 'This is genuine! It references the official pmkisan.gov.in portal and authorized CSC centers without asking for secret data.'
  }
];

export function scamRadarView(lang = 'hi', currentQuizIndex = 0, quizAnswered = null) {
  const quiz = SCAM_QUIZ[currentQuizIndex % SCAM_QUIZ.length];

  return `
    <section class="screen standard-screen scam-radar-screen">
      <div class="scam-nav-bar">
        <button class="back" data-route="dashboard">
          ${tablerIcon('arrowLeft', 16)} <span>${lang === 'hi' ? 'डैशबोर्ड पर लौटें' : 'Back to Dashboard'}</span>
        </button>
        <span class="threat-indicator-pill live">
          <span class="radar-ping"></span>
          ${lang === 'hi' ? 'लाइव सुरक्षा रडार सक्रिय' : 'Live Fraud Radar Active'}
        </span>
      </div>

      <header class="scam-hero">
        <div class="scam-shield-halo">
          <div class="scam-icon-circle">
            ${tablerIcon('shieldAlert', 38)}
          </div>
        </div>
        <span class="govt-badge dark">CYBER SECURITY · गृह मंत्रालय व कृषि मंत्रालय</span>
        <h1>${lang === 'hi' ? 'ग्रामीण साइबर-फ्रॉड सुरक्षा रडार' : 'Rural Cyber-Fraud Radar'}</h1>
        <p class="scam-subtitle">
          ${lang === 'hi' ? 'पीएम-किसान लाभार्थियों को डिजिटल ठगी, फर्जी ऐप और दलालों से बचाने हेतु सतर्कता केंद्र' : 'Real-time threat intelligence & helpline protecting farmers against digital frauds'}
        </p>
      </header>

      <!-- Emergency Hotline Direct Call Action Grid -->
      <div class="emergency-call-box">
        <div class="call-box-header">
          <div class="call-header-icon">${tablerIcon('phone', 20)}</div>
          <div>
            <h3>${lang === 'hi' ? 'आपातकालीन सहायता एवं शिकायत' : 'Emergency Cyber Crime Helplines'}</h3>
            <small>${lang === 'hi' ? 'ठगी की आशंका होने पर तुरंत 1-टैप कॉल करें' : 'Tap to dial immediately if targeted by scammers'}</small>
          </div>
        </div>

        <div class="helpline-grid">
          <a href="tel:1930" class="helpline-card primary-helpline" id="btn-call-1930">
            <div class="hl-badge">24x7 TOLL FREE</div>
            <div class="hl-number">1930</div>
            <div class="hl-name">${lang === 'hi' ? 'राष्ट्रीय साइबर अपराध हेल्पलाइन' : 'National Cyber Crime Portal'}</div>
            <small>${lang === 'hi' ? 'खाते से पैसे कटने पर तत्काल कॉल करें' : 'Emergency financial fraud response'}</small>
          </a>

          <a href="tel:18001801551" class="helpline-card agri-helpline" id="btn-call-kcc">
            <div class="hl-badge">6 AM - 10 PM</div>
            <div class="hl-number">1800-180-1551</div>
            <div class="hl-name">${lang === 'hi' ? 'किसान कॉल सेंटर (KCC)' : 'Kisan Call Center'}</div>
            <small>${lang === 'hi' ? 'योजना संबंधी आधिकारिक जानकारी' : 'Official PM-KISAN advisory'}</small>
          </a>
        </div>
      </div>

      <!-- Live Scam Alerts Feed -->
      <div class="section-heading">
        <h2>${tablerIcon('alertOctagon', 18)} ${lang === 'hi' ? 'सक्रिय फ्रॉड अलर्ट (4 मुख्य खतरे)' : 'Active Fraud Alerts'}</h2>
        <span class="alert-count-tag">4 Alerts</span>
      </div>

      <div class="scam-alerts-list">
        ${SCAM_ALERTS.map((alert, index) => `
          <article class="scam-card ${alert.badgeColor} stagger-card" style="animation-delay: ${0.05 * (index + 1)}s">
            <div class="scam-card-header">
              <span class="scam-type-icon">${tablerIcon(alert.icon, 20)}</span>
              <div class="scam-card-title-group">
                <h3>${lang === 'hi' ? alert.titleHi : alert.titleEn}</h3>
                <span class="threat-tag ${alert.badgeColor}">${alert.threatLevel} THREAT</span>
              </div>
            </div>
            <p class="scam-desc">${lang === 'hi' ? alert.descHi : alert.descEn}</p>
            <div class="scam-danger-box">
              ${lang === 'hi' ? alert.dangerTextHi : alert.dangerTextEn}
            </div>
            <div class="scam-safe-action">
              <strong>${tablerIcon('shieldCheck', 14)} ${lang === 'hi' ? 'सुरक्षा नियम:' : 'Safety Rule:'}</strong>
              <span>${lang === 'hi' ? alert.safeActionHi : alert.safeActionEn}</span>
            </div>
          </article>
        `).join('')}
      </div>

      <!-- Interactive Spot the Scam Tool -->
      <div class="spot-scam-section">
        <div class="spot-header">
          <span class="spot-icon">${tablerIcon('search', 20)}</span>
          <div>
            <h3>${lang === 'hi' ? 'फ्रॉड पहचानें टेस्ट (Spot the Scam)' : 'Interactive Scam Spotter'}</h3>
            <p>${lang === 'hi' ? 'क्या आप पहचान सकते हैं कि यह मैसेज असली है या नकली?' : 'Test your awareness: Can you spot fake vs genuine messages?'}</p>
          </div>
        </div>

        <div class="quiz-card" id="scam-quiz-box">
          <div class="quiz-message-bubble">
            <span class="wa-sim-label">WhatsApp / SMS Preview:</span>
            <p class="quiz-text">${quiz.message}</p>
          </div>

          <div class="quiz-actions" id="quiz-action-buttons">
            <button class="quiz-btn safe-btn" data-quiz-choice="safe" data-quiz-id="${quiz.id}">
              ${tablerIcon('circleCheck', 18)} ${lang === 'hi' ? 'सुरक्षित (Genuine)' : 'Safe / Real'}
            </button>
            <button class="quiz-btn scam-btn" data-quiz-choice="scam" data-quiz-id="${quiz.id}">
              ${tablerIcon('alertTriangle', 18)} ${lang === 'hi' ? 'धोखाधड़ी (Scam)' : 'Dangerous Scam'}
            </button>
          </div>

          <div id="quiz-result-area" class="quiz-result-area" style="display: none;"></div>
        </div>
      </div>

      <!-- Golden Rules of Protection -->
      <article class="safety-commandments">
        <h3>${tablerIcon('shieldCheck', 22)} ${lang === 'hi' ? 'किसान सुरक्षा के 4 सुनहरे नियम' : '4 Golden Rules of Security'}</h3>
        <ul class="safety-rules-list">
          <li>
            <span class="rule-num">1</span>
            <div>
              <strong>कभी भी किसी को अपना OTP या बैंक पासवर्ड न बताएं।</strong>
              <small>सरकार कभी भी फोन पर OTP नहीं मांगती।</small>
            </div>
          </li>
          <li>
            <span class="rule-num">2</span>
            <div>
              <strong>WhatsApp पर आई किसी भी APK फाइल को इंस्टॉल न करें।</strong>
              <small>केवल गूगल प्ले स्टोर या pmkisan.gov.in से ही ऐप लें।</small>
            </div>
          </li>
          <li>
            <span class="rule-num">3</span>
            <div>
              <strong>वेबसाइट के अंत में '.gov.in' अवश्य जांचें।</strong>
              <small>.xyz, .site, .online वाली वेबसाइटों पर अपनी जानकारी न भरें।</small>
            </div>
          </li>
          <li>
            <span class="rule-num">4</span>
            <div>
              <strong>धोखाधड़ी होते ही तुरंत 1930 पर कॉल करें।</strong>
              <small>शुरुआती 2 घंटे (गोल्डन ऑवर) में कॉल करने पर पैसे रिकवर हो सकते हैं।</small>
            </div>
          </li>
        </ul>
      </article>

      <p class="disclaimer">${t('disclaimer', lang)}</p>
    </section>
  `;
}
