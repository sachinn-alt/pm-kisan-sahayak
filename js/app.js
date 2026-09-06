import { FARMERS, farmerFor } from './mock-data.js';
import { dashboardView } from './dashboard.js';
import { diagnosisView } from './diagnosis.js';
import { chatView, initialMessages, replyFor } from './chat.js';
import { toast, initials, animateCounters } from './utils.js';
import { LANGUAGES, t } from './i18n.js';
import { speakText, stopSpeaking, isAudioSpeaking, startSpeechRecognition, stopSpeechRecognition } from './voice.js';
import { renderSevaParchiModal, downloadParchiPdf } from './parchi.js';
import { mapView } from './map-view.js';
import { farmerCornerView } from './farmer-corner-view.js';
import { whatsappBotView } from './whatsapp-bot-view.js';
import { cscLocatorView } from './csc-locator-view.js';
import { impactView } from './impact-view.js';
import { ivrSimulatorView } from './ivr-simulator-view.js';
import { tablerIcon, emblemOfIndia } from './icons.js';
import { playDtmfTone, startRingTone, stopRingTone, playDisconnectTone } from './dtmf-audio.js';
import { renderOcrScannerModal } from './ocr-scanner.js';
import { fetchDistrictWeather } from './weather.js';
import { scamRadarView } from './scam-radar-view.js';

const app = document.querySelector('#app');
const state = {
  farmer: null,
  historyAll: false,
  language: 'hi',
  messages: [],
  pendingLogin: '9876543210',
  isListening: false,
  showParchi: false,
  showOcrModal: false,
  ocrScanType: 'aadhaar',
  ocrSampleName: '',
  userLocation: null,
  weatherData: null,
  scamQuizIndex: 0,
  selectedMapState: 'UP',
  activeWaFarmer: '9876543210',
  activeWaFlow: 'status',
  isWaVoicePlaying: false,
  cscSearchQuery: '',
  cscServiceFilter: '',
  impactBeneficiariesCount: 50000,
  impactActiveTab: 'impact',
  activeIvrFarmer: '9876543210',
  ivrCallState: 'idle',
  ivrCallStep: 1,
  ivrCallDuration: '00:00'
};

const routes = ['splash', 'login', 'otp', 'dashboard', 'diagnosis', 'chat', 'helpline', 'farmer-corner', 'map', 'whatsapp', 'csc-locator', 'impact', 'scam-radar'];

function route() { return location.hash.slice(1) || 'splash'; }
function navigate(to) { location.hash = `#${to}`; }

function logo() {
  return `<svg class="sprout-logo" viewBox="0 0 96 96" aria-hidden="true">
    <defs>
      <linearGradient id="leaf" x1="0" x2="1" y1="0" y2="1">
        <stop stop-color="#9acb3b"/>
        <stop offset="1" stop-color="#1c6b32"/>
      </linearGradient>
      <linearGradient id="seed" x1="0" x2="1" y1="0" y2="1">
        <stop stop-color="#ffb634"/>
        <stop offset="1" stop-color="#eb6922"/>
      </linearGradient>
    </defs>
    <path d="M47 77C46 53 38 40 20 31c2 23 15 37 27 46Z" fill="url(#leaf)"/><path d="M49 74c4-24 14-39 29-49 0 24-12 41-29 49Z" fill="url(#leaf)"/><path d="M48 76c-2-23-7-34-20-46 20 1 31 15 20 46Z" fill="#397f31"/><path d="M48 48c-10-10-8-22-2-31 12 10 12 21 2 31Z" fill="url(#seed)"/><path d="M48 77V52" stroke="#f7f3df" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}

function splashView() {
  return `<section class="screen splash-screen">
    <div class="splash-content">
      <div class="splash-emblem-wrap">
        ${emblemOfIndia(76, 'splash-emblem')}
      </div>
      ${logo()}
      <span class="govt-badge dark">GOVERNMENT OF INDIA · भारत सरकार</span>
      <h1>PM-KISAN<br>Sahayak</h1>
      <p>पीएम-किसान सहायक</p>
      <div class="loader"><i></i></div>
    </div>
  </section>`;
}

function loginView() {
  const lang = state.language;
  return `<section class="screen login-screen">
    <div class="login-hero">
      <div class="login-emblem-box">
        ${emblemOfIndia(68, 'login-emblem')}
      </div>
      ${logo()}
      <span class="govt-badge">CITIZEN DBT SERVICES · भारत सरकार</span>
      <h1>${t('appTitle', lang)}</h1>
      <p class="hindi">${t('loginTagline', lang)}</p>
    </div>
    <div class="login-card">
      <div class="tabs">
        <button class="active" data-login-tab="mobile">${t('mobileNumber', lang)}</button>
        <button data-login-tab="reg">${t('regNumber', lang)}</button>
      </div>
      <label id="login-label" for="identifier">${t('mobileNumber', lang)}</label>
      <div class="field-wrap">
        <span id="prefix">+91</span>
        <input id="identifier" value="${state.pendingLogin}" inputmode="numeric" maxlength="12" placeholder="Enter your 10-digit mobile" />
      </div>
      <button class="primary-btn" id="send-otp">${t('sendOtp', lang)} ${tablerIcon('arrowRight', 18)}</button>
      <div class="demo-box">
        <b>${t('demoNotice', lang)}</b>
        <span>${t('demoAccount', lang)}</span>
      </div>
      <p class="test-title">${t('tryTestAccount', lang)}</p>
      <div class="account-chips">
        ${['9876543211', '9876543212', '9876543213'].map(key => `<button data-account="${key}">${FARMERS[key].name}</button>`).join('')}
      </div>
    </div>
    <p class="disclaimer">${t('disclaimer', lang)}</p>
  </section>`;
}

function otpView() {
  const lang = state.language;
  const phone = state.pendingLogin;
  return `<section class="screen otp-screen standard-screen">
    <button class="back" data-route="login">
      ${tablerIcon('arrowLeft', 16)} <span>Back</span>
    </button>
    <div class="otp-illustration">
      <div class="heading-icon phone-icon">${tablerIcon('deviceMobile', 48)}</div>
    </div>
    <div class="page-heading">
      <h1>${t('enterOtp', lang)}</h1>
      <p>${t('otpSentTo', lang)} +91 ${phone.slice(0, 5)} ${phone.slice(5)}</p>
    </div>
    <div id="otp-boxes" class="otp-boxes">
      ${[0, 1, 2, 3].map((x) => `<input aria-label="OTP digit ${x + 1}" inputmode="numeric" maxlength="1" data-otp="${x}" />`).join('')}
    </div>
    <button class="primary-btn" id="verify-otp">${t('verifyAndContinue', lang)}</button>
    <div class="demo-box compact">
      <b>${t('demoNotice', lang)}</b>
      <span>Use OTP: 1234</span>
    </div>
    <button class="text-btn centered" data-action="resend">${t('resendOtp', lang)}</button>
  </section>`;
}

function helplineView() {
  const lang = state.language;
  return `<section class="screen standard-screen">
    <button class="back" data-route="dashboard">
      ${tablerIcon('arrowLeft', 16)} <span>Back to dashboard</span>
    </button>
    <div class="page-heading">
      <div class="heading-icon phone-icon">${tablerIcon('phone', 40)}</div>
      <h1>${t('helplineSupport', lang)}</h1>
      <p>Speak to official support assistance representatives.</p>
    </div>
    <div class="support-list">
      <a href="tel:155261">
        <b>155261</b>
        <span>Toll-free · Mon–Sat, 9am–6pm</span>
        <i>${tablerIcon('chevronRight', 18)}</i>
      </a>
      <a href="tel:01124300606">
        <b>011-24300606</b>
        <span>Direct helpline</span>
        <i>${tablerIcon('chevronRight', 18)}</i>
      </a>
      <a href="tel:1800115526">
        <b>1800-115-526</b>
        <span>Toll-free alternate</span>
        <i>${tablerIcon('chevronRight', 18)}</i>
      </a>
      <div class="support-card-ivr">
        <button class="primary-btn sm" data-route="helpline">
          ${tablerIcon('deviceMobile', 16)} 155261 Feature Phone Simulator
        </button>
      </div>
      <div>
        <b>🏛️ District Agriculture Office</b>
        <span>Visit with Aadhaar and land records</span>
      </div>
    </div>
    <article class="scam-box">
      <h2>${tablerIcon('shieldCheck', 20)} Stay safe from scams</h2>
      <p>PM-KISAN has no WhatsApp support. Never share your OTP, Aadhaar number, bank PIN, or card details.</p>
    </article>
  </section>`;
}

// Load weather for current farmer
function loadWeather() {
  const district = state.farmer ? state.farmer.district : 'Lucknow';
  fetchDistrictWeather(district).then(data => {
    state.weatherData = data;
    const badgeWrap = document.querySelector('#weather-badge-wrap');
    if (badgeWrap && route() === 'dashboard') {
      render();
    }
  }).catch(() => {});
}

function render() {
  let current = route();
  if (!routes.includes(current)) current = 'splash';
  if (['dashboard', 'diagnosis', 'chat', 'helpline', 'farmer-corner', 'map', 'whatsapp', 'csc-locator', 'impact', 'scam-radar'].includes(current) && !state.farmer) {
    state.farmer = FARMERS['9876543210'];
    state.farmer.pendingLogin = '9876543210';
  }

  // Auto-fetch weather if not yet loaded
  if (!state.weatherData && state.farmer) {
    loadWeather();
  }

  let html = current === 'splash'
    ? splashView()
    : current === 'login'
    ? loginView()
    : current === 'otp'
    ? otpView()
    : current === 'dashboard'
    ? dashboardView(state.farmer, state.historyAll, state.language, state.weatherData)
    : current === 'diagnosis'
    ? diagnosisView(state.farmer, state.language)
    : current === 'chat'
    ? chatView(state.farmer, state.messages, state.language, false, state.isListening)
    : current === 'farmer-corner'
    ? farmerCornerView(state.language)
    : current === 'map'
    ? mapView(state.selectedMapState, state.language)
    : current === 'whatsapp'
    ? whatsappBotView(state.activeWaFarmer, state.activeWaFlow, state.isWaVoicePlaying)
    : current === 'csc-locator'
    ? cscLocatorView(state.farmer, state.cscSearchQuery, state.cscServiceFilter, state.language, state.userLocation)
    : current === 'impact'
    ? impactView(state.impactBeneficiariesCount, state.impactActiveTab, state.language)
    : current === 'scam-radar'
    ? scamRadarView(state.language, state.scamQuizIndex)
    : ivrSimulatorView(state.activeIvrFarmer, state.ivrCallState, state.ivrCallStep, state.ivrCallDuration, state.language);

  if (state.showParchi && state.farmer) {
    const parchiFarmer = current === 'whatsapp' ? (FARMERS[state.activeWaFarmer] || state.farmer) : state.farmer;
    html += renderSevaParchiModal(parchiFarmer, state.language);
  }

  if (state.showOcrModal && state.farmer) {
    html += renderOcrScannerModal(state.farmer, state.ocrScanType, state.ocrSampleName);
  }

  // Floating Farmer Voice Assistant button (shown on core screens)
  if (['dashboard', 'diagnosis', 'csc-locator', 'farmer-corner', 'map', 'impact', 'helpline', 'scam-radar'].includes(current)) {
    const speaking = isAudioSpeaking();
    html += `
      <aside class="floating-voice-bar" id="global-floating-voice" aria-label="Audio Guide">
        <button class="floating-voice-btn ${speaking ? 'active-speaking' : ''}" id="floating-audio-guide-btn" title="${speaking ? 'आवाज़ बंद करें (Stop Audio)' : 'बोलकर समझें (Audio Guide)'}">
          <span class="floating-voice-pulse"></span>
          <span class="floating-icon-wrap">
            ${speaking ? '<span class="mini-eq"><i></i><i></i><i></i></span>' : tablerIcon('volume', 22)}
          </span>
        </button>
      </aside>
    `;
  }

  // Persistent Mobile-First Bottom Navigation Dock
  if (['dashboard', 'diagnosis', 'chat', 'farmer-corner', 'scam-radar', 'csc-locator', 'map', 'impact', 'helpline'].includes(current)) {
    const lang = state.language;
    html += `
      <nav class="bottom-nav-bar" aria-label="Main Navigation">
        <button class="nav-item ${current === 'dashboard' ? 'active' : ''}" data-route="dashboard">
          <span class="nav-icon">${tablerIcon('sprout', 20)}</span>
          <span class="nav-text">${lang === 'hi' ? 'डैशबोर्ड' : 'Home'}</span>
        </button>
        <button class="nav-item ${current === 'diagnosis' ? 'active' : ''}" data-route="diagnosis">
          <span class="nav-icon">${tablerIcon('search', 20)}</span>
          <span class="nav-text">${lang === 'hi' ? 'समाधान' : 'Diagnosis'}</span>
        </button>
        <button class="nav-item ${current === 'chat' ? 'active' : ''}" data-route="chat">
          <span class="nav-icon">${tablerIcon('robot', 20)}</span>
          <span class="nav-text">${lang === 'hi' ? 'AI सहायक' : 'AI Chat'}</span>
        </button>
        <button class="nav-item ${current === 'farmer-corner' ? 'active' : ''}" data-route="farmer-corner">
          <span class="nav-icon">${tablerIcon('tractor', 20)}</span>
          <span class="nav-text">${lang === 'hi' ? 'सेवाएं' : 'Services'}</span>
        </button>
        <button class="nav-item ${current === 'scam-radar' ? 'active' : ''}" data-route="scam-radar">
          <span class="nav-icon">${tablerIcon('shieldCheck', 20)}</span>
          <span class="nav-text">${lang === 'hi' ? 'सुरक्षा' : 'Security'}</span>
        </button>
      </nav>
    `;
  }

  app.innerHTML = html;
  bind(current);
  animateCounters();
}

function getContextualVoiceText(current) {
  const f = state.farmer || FARMERS['9876543210'];
  const received = f.installments ? f.installments.filter(x => x.status === 'received').length : 22;
  const failed = f.installments ? f.installments.filter(x => x.status === 'failed').length : 0;

  if (current === 'dashboard') {
    let t = `नमस्ते ${f.name} जी! पीएम-किसान सहायक में आपका स्वागत है। आपके बैंक खाते में अब तक कुल ${received} किस्तें, यानी ${received * 2000} रुपये प्राप्त हो चुके हैं। `;
    if (failed > 0 && f.issueDetails) {
      t += `ध्यान दें, आपकी ${f.issueDetails.failedInstallment}वीं किस्त रुकी हुई है। कारण है: ${f.issueDetails.title}। समाधान के लिए 'समस्या का समाधान' बटन दबाएं। `;
    } else {
      t += `आपकी सभी किस्तें पूरी तरह से सही हैं और आप 24वीं किस्त के लिए पात्र हैं। `;
    }
    t += `आपके क्षेत्र का आज का तापमान व मंडी भाव भी स्क्रीन पर उपलब्ध है।`;
    return t;
  }

  if (current === 'diagnosis') {
    if (!f.issueDetails) return `नमस्ते ${f.name} जी, आपके खाते में कोई लंबित समस्या नहीं है।`;
    return `नमस्ते ${f.name} जी। आपकी समस्या है: ${f.issueDetails.title}। ${f.issueDetails.explain}। समाधान के लिए अपने नजदीकी सीएससी केंद्र जाएं और अपना आधार कार्ड साथ ले जाएं। यह सेवा पूर्णतः निःशुल्क है।`;
  }

  if (current === 'csc-locator') {
    return `नमस्ते ${f.name} जी। यह आपके नजदीकी सीएससी जन सेवा केंद्रों की सूची है। आप किसी भी ऑपरेटर को कॉल कर सकते हैं या व्हाट्सएप पर बात कर सकते हैं। सीएससी पर ई-केवाईसी और डीबीटी सीडिंग सरकारी नियमानुसार बिल्कुल मुफ्त सेवा है।`;
  }

  if (current === 'scam-radar') {
    return `किसान भाइयों, साइबर ठगी से सावधान रहें। पीएम-किसान के नाम पर व्हाट्सएप पर आने वाले किसी भी अनजान लिंक या ऐप फाइल को डाउनलोड न करें। हेल्पलाइन नंबर 1930 है।`;
  }

  if (current === 'farmer-corner') {
    return `किसान कॉर्नर में आप अपनी सभी 8 सरकारी योजनाओं की सेवाओं का उपयोग कर सकते हैं, जैसे ई-केवाईसी नवीनीकरण, बैंक आधार सीडिंग, नया पंजीकरण और फेस ऑथेंटिकेशन।`;
  }

  if (current === 'map') {
    return `यह पूरे भारत का पीएम-किसान वितरण नक्शा है। यहाँ आप अपने राज्य और जिले में कुल वितरित धनराशि और ई-केवाईसी पूर्णता दर देख सकते हैं।`;
  }

  if (current === 'impact') {
    return `इस पेज पर पीएम-किसान सहायक के सामाजिक और आर्थिक लाभ के आंकड़े दिए गए हैं। इससे किसानों को हर साल औसतन 1420 रुपये की बचत और समस्या निवारण 45 दिन से घटकर 48 घंटे में होता है।`;
  }

  return `नमस्ते किसान भाई, पीएम-किसान सहायक में आपका स्वागत है। टोल फ्री हेल्पलाइन 155261 पर भी संपर्क कर सकते हैं।`;
}

function bind(current) {
  document.querySelectorAll('[data-route]').forEach(button => {
    button.addEventListener('click', () => navigate(button.dataset.route));
  });

  // Global Floating Audio Guide Button Handler
  const floatingVoiceBtn = document.querySelector('#floating-audio-guide-btn');
  if (floatingVoiceBtn) {
    floatingVoiceBtn.addEventListener('click', () => {
      if (isAudioSpeaking()) {
        stopSpeaking(() => render());
      } else {
        const text = getContextualVoiceText(current);
        speakText(text, state.language, () => render(), () => render());
      }
    });
  }

  // Dashboard Banner Voice Read-Aloud
  const dashAudioBtn = document.querySelector('#dash-audio-guide-btn');
  if (dashAudioBtn) {
    dashAudioBtn.addEventListener('click', () => {
      if (isAudioSpeaking()) {
        stopSpeaking(() => render());
      } else {
        const text = getContextualVoiceText('dashboard');
        speakText(text, state.language, () => render(), () => render());
      }
    });
  }

  // Language selectors
  const dashLang = document.querySelector('#dash-lang-select');
  if (dashLang) {
    dashLang.addEventListener('change', (e) => {
      state.language = e.target.value;
      render();
    });
  }

  const chatLang = document.querySelector('#chat-lang-select');
  if (chatLang) {
    chatLang.addEventListener('change', (e) => {
      state.language = e.target.value;
      state.messages = initialMessages(state.farmer, state.language);
      render();
    });
  }

  // Parchi modal handlers
  const openParchiBtn = document.querySelector('#open-parchi-btn');
  if (openParchiBtn) {
    openParchiBtn.addEventListener('click', () => {
      state.showParchi = true;
      render();
    });
  }

  const closeParchiBtn = document.querySelector('#close-parchi-btn');
  if (closeParchiBtn) closeParchiBtn.addEventListener('click', () => { state.showParchi = false; render(); });
  const dismissParchiBtn = document.querySelector('#dismiss-parchi-btn');
  if (dismissParchiBtn) dismissParchiBtn.addEventListener('click', () => { state.showParchi = false; render(); });

  // Real PDF Download Button
  const downloadPdfBtn = document.querySelector('#download-parchi-pdf-btn');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      const parchiFarmer = current === 'whatsapp' ? (FARMERS[state.activeWaFarmer] || state.farmer) : state.farmer;
      downloadParchiPdf(parchiFarmer);
      toast('📄 Seva Parchi PDF downloaded successfully!', 'success');
    });
  }

  // OCR Modal handlers
  const openOcrBtn = document.querySelector('#btn-open-ocr-scanner');
  if (openOcrBtn) {
    openOcrBtn.addEventListener('click', () => {
      state.showOcrModal = true;
      state.ocrScanType = state.farmer.issue === 'aadhaar_bank_mismatch' ? 'bank' : 'aadhaar';
      state.ocrSampleName = '';
      render();
    });
  }

  const closeOcrBtn = document.querySelector('#close-ocr-modal');
  if (closeOcrBtn) closeOcrBtn.addEventListener('click', () => { state.showOcrModal = false; render(); });
  const cancelOcrBtn = document.querySelector('#btn-ocr-cancel');
  if (cancelOcrBtn) cancelOcrBtn.addEventListener('click', () => { state.showOcrModal = false; render(); });
  const doneOcrBtn = document.querySelector('#btn-ocr-done');
  if (doneOcrBtn) doneOcrBtn.addEventListener('click', () => { state.showOcrModal = false; toast('Record verified successfully', 'success'); render(); });

  const ocrDownloadSlip = document.querySelector('#btn-ocr-download-slip');
  if (ocrDownloadSlip) {
    ocrDownloadSlip.addEventListener('click', () => {
      state.showOcrModal = false;
      state.showParchi = true;
      render();
    });
  }

  const btnTriggerUpload = document.querySelector('#btn-trigger-upload');
  const ocrFileInput = document.querySelector('#ocr-file-input');
  if (btnTriggerUpload && ocrFileInput) {
    btnTriggerUpload.addEventListener('click', () => ocrFileInput.click());
    ocrFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        toast(`Processing ${file.name}...`, 'info');
        setTimeout(() => {
          state.ocrSampleName = state.farmer.name;
          toast('OCR Completed: Scanned document matches registration', 'success');
          render();
        }, 1200);
      }
    });
  }

  // Audio Speech Read-Aloud on Diagnosis screen
  const diagSpeechBtn = document.querySelector('#toggle-diag-speech-btn');
  if (diagSpeechBtn) {
    diagSpeechBtn.addEventListener('click', () => {
      if (isAudioSpeaking()) {
        stopSpeaking(() => render());
      } else {
        const textToRead = `${state.farmer.name} जी, आपकी समस्या: ${state.farmer.issueDetails.title}। ${state.farmer.issueDetails.explain}`;
        speakText(textToRead, state.language, () => render(), () => render());
      }
    });
  }

  // WhatsApp Simulator Bindings
  if (current === 'whatsapp') {
    document.querySelectorAll('[data-wa-farmer]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeWaFarmer = btn.dataset.waFarmer;
        state.isWaVoicePlaying = false;
        stopSpeaking();
        render();
      });
    });

    document.querySelectorAll('[data-wa-flow]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeWaFlow = btn.dataset.waFlow;
        render();
      });
    });

    const triggerVoice = () => {
      if (state.isWaVoicePlaying) {
        stopSpeaking(() => {
          state.isWaVoicePlaying = false;
          render();
        });
      } else {
        const f = FARMERS[state.activeWaFarmer] || FARMERS['9876543210'];
        const text = f.issue 
          ? `नमस्ते ${f.name} जी। आपकी समस्या: ${f.issueDetails.title}। समाधान के लिए अपने नजदीकी सीएससी केंद्र जाएं और आधार कार्ड साथ ले जाएं।`
          : `नमस्ते ${f.name} जी। आपकी 23वीं किस्त का ₹2000 आपके खाते में आ चुका है। आपका सभी रिकॉर्ड सही है।`;
        state.isWaVoicePlaying = true;
        render();
        speakText(text, 'hi', () => {}, () => {
          state.isWaVoicePlaying = false;
          render();
        });
      }
    };

    const waVoiceBtn = document.querySelector('#wa-voice-play-trigger');
    if (waVoiceBtn) waVoiceBtn.addEventListener('click', triggerVoice);
    const waMicBtn = document.querySelector('#wa-mic-speak-btn');
    if (waMicBtn) waMicBtn.addEventListener('click', triggerVoice);

    const waOpenParchi = document.querySelector('#wa-open-parchi-btn');
    if (waOpenParchi) {
      waOpenParchi.addEventListener('click', () => {
        state.farmer = FARMERS[state.activeWaFarmer];
        state.showParchi = true;
        render();
      });
    }

    const waQuickParchi = document.querySelector('#wa-quick-parchi');
    if (waQuickParchi) {
      waQuickParchi.addEventListener('click', () => {
        state.farmer = FARMERS[state.activeWaFarmer];
        state.showParchi = true;
        render();
      });
    }
  }

  // CSC Locator Bindings
  if (current === 'csc-locator') {
    const searchInput = document.querySelector('#csc-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.cscSearchQuery = e.target.value;
        render();
        const freshInput = document.querySelector('#csc-search-input');
        if (freshInput) {
          freshInput.focus();
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        }
      });
    }

    const clearBtn = document.querySelector('#clear-csc-search');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.cscSearchQuery = '';
        render();
      });
    }

    document.querySelectorAll('[data-service-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        state.cscServiceFilter = chip.dataset.serviceFilter;
        render();
      });
    });

    // Real Geolocation Detection
    const gpsBtn = document.querySelector('#gps-location-btn');
    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => {
        toast('📍 Detecting live GPS location...', 'info');
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              state.userLocation = { lat: latitude, lng: longitude };
              toast(`📍 Live GPS detected: Sorting centers by nearest distance`, 'success');
              render();
            },
            (err) => {
              state.userLocation = { lat: 26.8467, lng: 80.9462 };
              toast(`📍 GPS location active (Nearest centers sorted)`, 'success');
              render();
            },
            { timeout: 8000, enableHighAccuracy: true }
          );
        } else {
          state.userLocation = { lat: 26.8467, lng: 80.9462 };
          toast(`📍 GPS enabled: Showing nearest centers`, 'success');
          render();
        }
      });
    }
  }

  // Impact & Competition Bindings
  if (current === 'impact') {
    document.querySelectorAll('[data-impact-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        state.impactActiveTab = tab.dataset.impactTab;
        render();
      });
    });

    const slider = document.querySelector('#impact-slider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        state.impactBeneficiariesCount = parseInt(e.target.value, 10);
        render();
      });
    }
  }

  // Map state selector pills
  if (current === 'map') {
    document.querySelectorAll('[data-state-code]').forEach(pill => {
      pill.addEventListener('click', () => {
        state.selectedMapState = pill.dataset.stateCode;
        render();
      });
    });
  }

  // Farmer Corner service click items
  if (current === 'farmer-corner') {
    document.querySelectorAll('[data-service-route]').forEach(card => {
      card.addEventListener('click', () => {
        const targetRoute = card.dataset.serviceRoute;
        navigate(targetRoute);
      });
    });
  }

  // IVR 155261 Simulator Bindings
  if (current === 'helpline') {
    document.querySelectorAll('[data-ivr-farmer]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeIvrFarmer = btn.dataset.ivrFarmer;
        state.ivrCallState = 'idle';
        state.ivrCallStep = 1;
        stopRingTone();
        stopSpeaking();
        render();
      });
    });

    const startCallBtn = document.querySelector('#ivr-start-call');
    if (startCallBtn) {
      startCallBtn.addEventListener('click', () => {
        state.ivrCallState = 'calling';
        render();
        startRingTone();
        setTimeout(() => {
          stopRingTone();
          state.ivrCallState = 'connected';
          state.ivrCallStep = 1;
          state.ivrCallDuration = '00:06';
          render();
          const promptText = "नमस्ते! पीएम-किसान सम्मान निधि स्वचालित हेल्पलाइन 155261 में आपका स्वागत है। हिंदी के लिए कीपैड पर 1 दबाएं, For English press 2.";
          speakText(promptText, 'hi');
        }, 2200);
      });
    }

    const endCallBtn = document.querySelector('#ivr-end-call');
    if (endCallBtn) {
      endCallBtn.addEventListener('click', () => {
        state.ivrCallState = 'idle';
        state.ivrCallStep = 1;
        state.ivrCallDuration = '00:00';
        stopRingTone();
        playDisconnectTone();
        stopSpeaking();
        render();
      });
    }

    document.querySelectorAll('.key-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        playDtmfTone(key);

        if (state.ivrCallState !== 'connected') {
          toast('कृपया पहले नीचे हरे बटन से कॉल लगाएं', 'info');
          return;
        }

        const f = FARMERS[state.activeIvrFarmer] || FARMERS['9876543210'];
        const received = f.installments ? f.installments.filter(x => x.status === 'received').length : 22;

        if (state.ivrCallStep === 1 && key === '1') {
          state.ivrCallStep = 2;
          state.ivrCallDuration = '00:15';
          render();
          const step2Text = "किस्त भुगतान स्थिति जानने के लिए 1 दबाएं। ई-केवाईसी जानकारी के लिए 2 दबाएं।";
          speakText(step2Text, 'hi');
        } else if (state.ivrCallStep === 2 && key === '1') {
          state.ivrCallStep = 3;
          state.ivrCallDuration = '00:28';
          render();
          let step3Text = '';
          if (f.issue) {
            step3Text = `${f.name} जी, आपके खाते में कुल ${received} किस्तें प्राप्त हो चुकी हैं। आपकी 23वीं किस्त ${f.issueDetails.title} के कारण रुकी है। समाधान के लिए अपने नजदीकी सीएससी केंद्र पर जाएं और आधार कार्ड साथ ले जाएं।`;
          } else {
            step3Text = `${f.name} जी, आपकी सभी 23 किस्तें सफलतापूर्वक प्राप्त हो चुकी हैं। आपका खाता अगली किस्त के लिए पूरी तरह सक्रिय है।`;
          }
          speakText(step3Text, 'hi');
        } else if (key === '*') {
          const repeatText = state.ivrCallStep === 1 
            ? "हिंदी के लिए 1 दबाएं, For English press 2." 
            : state.ivrCallStep === 2 
            ? "किस्त स्थिति के लिए 1 दबाएं। ई-केवाईसी जानकारी के लिए 2 दबाएं।" 
            : "आपकी स्थिति बताई जा चुकी है। कॉल समाप्त करने के लिए लाल बटन दबाएं।";
          speakText(repeatText, 'hi');
        }
      });
    });
  }

  if (current === 'splash') {
    setTimeout(() => { if (route() === 'splash') navigate('login'); }, 2000);
  }

  if (current === 'login') {
    let mode = 'mobile';
    const input = document.querySelector('#identifier');
    document.querySelectorAll('[data-login-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        mode = tab.dataset.loginTab;
        document.querySelectorAll('[data-login-tab]').forEach(x => x.classList.toggle('active', x === tab));
        document.querySelector('#login-label').textContent = mode === 'mobile' ? t('mobileNumber', state.language) : t('regNumber', state.language);
        document.querySelector('#prefix').style.display = mode === 'mobile' ? '' : 'none';
        input.maxLength = mode === 'mobile' ? 10 : 12;
        input.placeholder = mode === 'mobile' ? 'Enter your 10-digit mobile' : 'Enter your 12-digit registration number';
        input.value = '';
        input.focus();
      });
    });

    document.querySelectorAll('[data-account]').forEach(button => {
      button.addEventListener('click', () => {
        state.pendingLogin = button.dataset.account;
        input.value = state.pendingLogin;
        state.weatherData = null;
        toast(`${FARMERS[state.pendingLogin].name}'s demo account selected`, 'success');
      });
    });

    document.querySelector('#send-otp').addEventListener('click', () => {
      const value = input.value.replace(/\D/g, '');
      const farmer = farmerFor(value);
      if (!farmer) return toast('Please use one of the listed demo accounts.', 'error');
      state.pendingLogin = value;
      navigate('otp');
    });
  }

  if (current === 'otp') {
    const boxes = [...document.querySelectorAll('[data-otp]')];
    if (boxes[0]) boxes[0].focus();
    boxes.forEach((box, idx) => {
      box.addEventListener('input', () => {
        box.value = box.value.replace(/\D/g, '').slice(-1);
        if (box.value && boxes[idx + 1]) boxes[idx + 1].focus();
        if (boxes.every(x => x.value)) verify();
      });
      box.addEventListener('keydown', event => {
        if (event.key === 'Backspace' && !box.value && boxes[idx - 1]) boxes[idx - 1].focus();
      });
    });

    const verify = () => {
      const code = boxes.map(x => x.value).join('');
      if (code !== '1234') return toast('That OTP is incorrect. Demo OTP is 1234.', 'error');
      state.farmer = farmerFor(state.pendingLogin);
      state.farmer.pendingLogin = state.pendingLogin;
      state.messages = initialMessages(state.farmer, state.language);
      state.weatherData = null;
      loadWeather();
      toast(`Welcome, ${state.farmer.name}!`, 'success');
      navigate('dashboard');
    };

    document.querySelector('#verify-otp').addEventListener('click', verify);
    document.querySelector('[data-action="resend"]').addEventListener('click', () => toast('A new demo OTP was sent: 1234', 'success'));
  }

  if (current === 'dashboard') {
    const scrollContainer = document.querySelector('#payment-history-scroll');
    if (scrollContainer) {
      const cards = scrollContainer.querySelectorAll('.skiper16-card');
      const updateCardStack = () => {
        const containerRect = scrollContainer.getBoundingClientRect();
        const containerTop = containerRect.top;

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const distanceFromTop = rect.top - containerTop;

          // When card is docked/stacked at the top
          if (distanceFromTop <= 16) {
            const overlap = Math.max(0, 16 - distanceFromTop);
            const scale = Math.max(0.92, 1 - (overlap * 0.0025));
            const translateY = Math.min(index * 2, 6);
            card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            card.style.boxShadow = '0 8px 24px rgba(16, 32, 21, 0.12)';
          } else {
            card.style.transform = '';
            card.style.boxShadow = '';
          }
        });
      };

      scrollContainer.addEventListener('scroll', () => {
        requestAnimationFrame(updateCardStack);
      }, { passive: true });
    }
  }

  if (current === 'chat') {
    const log = document.querySelector('#chat-log');
    if (log) log.scrollTop = log.scrollHeight;

    document.querySelectorAll('.bot-speak-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.dataset.speak;
        speakText(text, state.language);
      });
    });

    const micBtn = document.querySelector('#voice-input-btn');
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (state.isListening) {
          stopSpeechRecognition();
          state.isListening = false;
          render();
        } else {
          state.isListening = true;
          app.innerHTML = chatView(state.farmer, state.messages, state.language, false, true);
          bind('chat');
          startSpeechRecognition(
            state.language,
            (transcript) => {
              state.isListening = false;
              send(transcript);
            },
            (err) => {
              state.isListening = false;
              toast(`Mic: ${err}`, 'error');
              render();
            },
            () => {
              state.isListening = false;
              render();
            }
          );
        }
      });
    }

    const send = async (question) => {
      const text = question.trim();
      if (!text) return;
      state.messages.push({ from: 'user', text });
      app.innerHTML = chatView(state.farmer, state.messages, state.language, true, false);
      bind('chat');
      try {
        const botReply = await replyFor(text, state.farmer, state.language);
        state.messages.push({ from: 'bot', text: botReply });
      } catch (err) {
        state.messages.push({ from: 'bot', text: 'Kripya thodi der baad koshish karein ya helpline 155261 par call karein.' });
      }
      render();
    };

    const chatForm = document.querySelector('#chat-form');
    if (chatForm) {
      chatForm.addEventListener('submit', event => {
        event.preventDefault();
        send(document.querySelector('#chat-message').value);
      });
    }

    document.querySelectorAll('[data-question]').forEach(button => {
      button.addEventListener('click', () => send(button.dataset.question));
    });
  }

  // Cyber-Fraud & Scam Protection Radar Bindings
  if (current === 'scam-radar') {
    document.querySelectorAll('[data-quiz-choice]').forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.dataset.quizChoice; // 'safe' or 'scam'
        const quizId = btn.dataset.quizId;
        const resultArea = document.querySelector('#quiz-result-area');
        const isUserScam = choice === 'scam';
        const isActuallyScam = quizId === 'q1';
        const isCorrect = (isUserScam && isActuallyScam) || (!isUserScam && !isActuallyScam);

        if (resultArea) {
          resultArea.style.display = 'block';
          resultArea.className = `quiz-result-area ${isCorrect ? 'result-correct' : 'result-wrong'}`;
          resultArea.innerHTML = `
            <div class="result-header">
              <span class="result-icon">${isCorrect ? '🎉' : '⚠️'}</span>
              <strong>${isCorrect ? (state.language === 'hi' ? 'बिल्कुल सही पहचान!' : 'Spot on! Correct Answer') : (state.language === 'hi' ? 'सावधान! गलत उत्तर' : 'Caution! Incorrect Answer')}</strong>
            </div>
            <p class="result-explanation">
              ${isActuallyScam 
                ? (state.language === 'hi' ? 'यह एक खतरनाक साइबर फ्रॉड (Scam) है! सरकार कभी भी SMS या WhatsApp लिंक पर OTP दर्ज करने को नहीं कहती। .xyz डोमेन फर्जी होते हैं।' : 'This is a phishing scam! The government never asks for OTP via web links. .xyz domains are fraudulent.') 
                : (state.language === 'hi' ? 'यह आधिकारिक व सुरक्षित संदेश है! इसमें केवल pmkisan.gov.in और अधिकृत CSC केंद्र का उल्लेख है।' : 'This is safe and genuine! It directs citizens to the official pmkisan.gov.in portal or CSC centers.')}
            </p>
            <button class="primary-btn sm next-quiz-btn" id="btn-next-quiz">
              ${state.language === 'hi' ? 'अगला संदेश जांचें ➔' : 'Try Next Message ➔'}
            </button>
          `;

          const nextBtn = document.querySelector('#btn-next-quiz');
          if (nextBtn) {
            nextBtn.addEventListener('click', () => {
              state.scamQuizIndex = (state.scamQuizIndex + 1) % 2;
              render();
            });
          }
        }
      });
    });

    const call1930 = document.querySelector('#btn-call-1930');
    if (call1930) {
      call1930.addEventListener('click', () => {
        toast('राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर कॉल की जा रही है...', 'info');
      });
    }

    const callKcc = document.querySelector('#btn-call-kcc');
    if (callKcc) {
      callKcc.addEventListener('click', () => {
        toast('किसान कॉल सेंटर 1800-180-1551 पर कॉल की जा रही है...', 'info');
      });
    }
  }
}

window.addEventListener('hashchange', render);
render();
