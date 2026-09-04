import { FARMERS, farmerFor } from './mock-data.js';
import { dashboardView } from './dashboard.js';
import { diagnosisView } from './diagnosis.js';
import { chatView, initialMessages, replyFor } from './chat.js';
import { toast, initials, animateCounters } from './utils.js';
import { LANGUAGES, t } from './i18n.js';
import { speakText, stopSpeaking, isAudioSpeaking, startSpeechRecognition, stopSpeechRecognition } from './voice.js';
import { renderSevaParchiModal } from './parchi.js';
import { mapView } from './map-view.js';
import { farmerCornerView } from './farmer-corner-view.js';
import { whatsappBotView } from './whatsapp-bot-view.js';
import { cscLocatorView } from './csc-locator-view.js';
import { impactView } from './impact-view.js';

const app = document.querySelector('#app');
const state = {
  farmer: null,
  historyAll: false,
  language: 'hi',
  messages: [],
  pendingLogin: '9876543210',
  isListening: false,
  showParchi: false,
  selectedMapState: 'UP',
  activeWaFarmer: '9876543210',
  activeWaFlow: 'status',
  isWaVoicePlaying: false,
  cscSearchQuery: '',
  cscServiceFilter: '',
  impactBeneficiariesCount: 50000,
  impactActiveTab: 'impact'
};

const routes = ['splash', 'login', 'otp', 'dashboard', 'diagnosis', 'chat', 'helpline', 'farmer-corner', 'map', 'whatsapp', 'csc-locator', 'impact'];

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
      ${logo()}
      <span class="govt-badge dark">GOVERNMENT OF INDIA</span>
      <h1>PM-KISAN<br>Sahayak</h1>
      <p>पीएम-किसान सहायक</p>
      <div class="loader"><i></i></div>
    </div>
  </section>`;
}

import { tablerIcon } from './icons.js';

function loginView() {
  const lang = state.language;
  return `<section class="screen login-screen">
    <div class="login-hero">
      ${logo()}
      <span class="govt-badge">CITIZEN DBT SERVICES</span>
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

function render() {
  let current = route();
  if (!routes.includes(current)) current = 'splash';
  if (['dashboard', 'diagnosis', 'chat', 'helpline', 'farmer-corner', 'map', 'whatsapp', 'csc-locator', 'impact'].includes(current) && !state.farmer) {
    state.farmer = FARMERS['9876543210'];
    state.farmer.pendingLogin = '9876543210';
  }

  let html = current === 'splash'
    ? splashView()
    : current === 'login'
    ? loginView()
    : current === 'otp'
    ? otpView()
    : current === 'dashboard'
    ? dashboardView(state.farmer, state.historyAll, state.language)
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
    ? cscLocatorView(state.farmer, state.cscSearchQuery, state.cscServiceFilter, state.language)
    : current === 'impact'
    ? impactView(state.impactBeneficiariesCount, state.impactActiveTab, state.language)
    : helplineView();

  if (state.showParchi && state.farmer) {
    const parchiFarmer = current === 'whatsapp' ? (FARMERS[state.activeWaFarmer] || state.farmer) : state.farmer;
    html += renderSevaParchiModal(parchiFarmer, state.language);
  }

  // Floating Farmer Voice Assistant button (shown on core screens)
  if (['dashboard', 'diagnosis', 'csc-locator', 'farmer-corner', 'map', 'impact', 'helpline'].includes(current)) {
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
    t += `बिना ऐप डाउनलोड किए सहायता के लिए आप व्हाट्सएप बॉट भी खोल सकते हैं।`;
    return t;
  }

  if (current === 'diagnosis') {
    if (!f.issueDetails) return `नमस्ते ${f.name} जी, आपके खाते में कोई लंबित समस्या नहीं है।`;
    return `नमस्ते ${f.name} जी। आपकी समस्या है: ${f.issueDetails.title}। ${f.issueDetails.explain}। समाधान के लिए अपने नजदीकी सीएससी केंद्र जाएं और अपना आधार कार्ड साथ ले जाएं। यह सेवा पूर्णतः निःशुल्क है।`;
  }

  if (current === 'csc-locator') {
    return `नमस्ते ${f.name} जी। यह आपके नजदीकी सीएससी जन सेवा केंद्रों की सूची है। आप किसी भी ऑपरेटर को कॉल कर सकते हैं या व्हाट्सएप पर बात कर सकते हैं। सीएससी पर ई-केवाईसी और डीबीटी सीडिंग सरकारी नियमानुसार बिल्कुल मुफ्त सेवा है।`;
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
  const printParchiBtn = document.querySelector('#print-parchi-btn');
  if (printParchiBtn) {
    printParchiBtn.addEventListener('click', () => { window.print(); });
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

    const gpsBtn = document.querySelector('#gps-location-btn');
    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => {
        state.cscSearchQuery = state.farmer ? state.farmer.village : 'Lucknow';
        toast('📍 Location updated: Showing centers near you', 'success');
        render();
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
      toast(`Welcome, ${state.farmer.name}!`, 'success');
      navigate('dashboard');
    };

    document.querySelector('#verify-otp').addEventListener('click', verify);
    document.querySelector('[data-action="resend"]').addEventListener('click', () => toast('A new demo OTP was sent: 1234', 'success'));
  }

  if (current === 'dashboard') {
    const histBtn = document.querySelector('[data-action="history"]');
    if (histBtn) {
      histBtn.addEventListener('click', () => {
        state.historyAll = !state.historyAll;
        render();
      });
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
}

window.addEventListener('hashchange', render);
render();
