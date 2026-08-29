import { FARMERS, farmerFor } from './mock-data.js';
import { dashboardView } from './dashboard.js';
import { diagnosisView } from './diagnosis.js';
import { chatView, initialMessages, replyFor } from './chat.js';
import { toast, initials } from './utils.js';
import { LANGUAGES, t } from './i18n.js';
import { speakText, stopSpeaking, isAudioSpeaking, startSpeechRecognition, stopSpeechRecognition } from './voice.js';
import { renderSevaParchiModal } from './parchi.js';
import { mapView } from './map-view.js';
import { farmerCornerView } from './farmer-corner-view.js';

const app = document.querySelector('#app');
const state = {
  farmer: null,
  historyAll: false,
  language: 'hi',
  messages: [],
  pendingLogin: '9876543210',
  isListening: false,
  showParchi: false,
  selectedMapState: 'UP'
};

const routes = ['splash', 'login', 'otp', 'dashboard', 'diagnosis', 'chat', 'helpline', 'farmer-corner', 'map'];

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
  if (['dashboard', 'diagnosis', 'chat', 'helpline', 'farmer-corner', 'map'].includes(current) && !state.farmer) {
    return navigate('login');
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
    : helplineView();

  if (state.showParchi && state.farmer) {
    html += renderSevaParchiModal(state.farmer, state.language);
  }

  app.innerHTML = html;
  bind(current);
}

function bind(current) {
  document.querySelectorAll('[data-route]').forEach(button => {
    button.addEventListener('click', () => navigate(button.dataset.route));
  });

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
