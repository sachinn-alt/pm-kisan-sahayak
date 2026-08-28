import { FARMERS, farmerFor } from './mock-data.js';
import { dashboardView } from './dashboard.js';
import { diagnosisView } from './diagnosis.js';
import { chatView, initialMessages, replyFor } from './chat.js';
import { toast, initials } from './utils.js';

const app = document.querySelector('#app');
const state = { farmer: null, historyAll: false, language: 'en', messages: [], pendingLogin: '9876543210' };
const routes = ['splash','login','otp','dashboard','diagnosis','chat','helpline'];

function route() { return location.hash.slice(1) || 'splash'; }
function navigate(to) { location.hash = `#${to}`; }

function logo() { return `<svg class="sprout-logo" viewBox="0 0 96 96" aria-hidden="true"><defs><linearGradient id="leaf" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#9acb3b"/><stop offset="1" stop-color="#1c6b32"/></linearGradient><linearGradient id="seed" x1="0" x2="1"><stop stop-color="#ffb634"/><stop offset="1" stop-color="#eb6922"/></linearGradient></defs><path d="M47 77C46 53 38 40 20 31c2 23 15 37 27 46Z" fill="url(#leaf)"/><path d="M49 74c4-24 14-39 29-49 0 24-12 41-29 49Z" fill="url(#leaf)"/><path d="M48 76c-2-23-7-34-20-46 20 1 31 15 20 46Z" fill="#397f31"/><path d="M48 48c-10-10-8-22-2-31 12 10 12 21 2 31Z" fill="url(#seed)"/><path d="M48 77V52" stroke="#f7f3df" stroke-width="4" stroke-linecap="round"/></svg>`; }

function splashView() { return `<section class="screen splash-screen"><div class="splash-content">${logo()}<span class="prototype dark">PROTOTYPE</span><h1>PM-KISAN<br>Sahayak</h1><p>पीएम-किसान सहायक</p><div class="loader"><i></i></div></div></section>`; }
function loginView() { return `<section class="screen login-screen"><div class="login-hero">${logo()}<span class="prototype">PROTOTYPE</span><h1>PM-KISAN Sahayak</h1><p class="hindi">अपने किसान सम्मान निधि की स्थिति जानें</p><p>Check payment status, understand issues, and get help to fix them.</p></div><div class="login-card"><div class="tabs"><button class="active" data-login-tab="mobile">Mobile No.</button><button data-login-tab="reg">Reg. No.</button></div><label id="login-label" for="identifier">Mobile number</label><div class="field-wrap"><span id="prefix">+91</span><input id="identifier" value="${state.pendingLogin}" inputmode="numeric" maxlength="12" placeholder="Enter your 10-digit mobile" /></div><button class="primary-btn" id="send-otp">Send OTP <span>→</span></button><div class="demo-box"><b>DEMO</b><span>Use mobile: 9876543210<br>OTP: 1234</span></div><p class="test-title">Try a test account</p><div class="account-chips">${['9876543211','9876543212','9876543213'].map(key => `<button data-account="${key}">${FARMERS[key].name}</button>`).join('')}</div></div><p class="disclaimer">This is a prototype. Not affiliated with any government body.</p></section>`; }
function otpView() { const phone = state.pendingLogin; return `<section class="screen otp-screen standard-screen"><button class="back" data-route="login">← Back</button><div class="otp-illustration">📲</div><div class="page-heading"><h1>Enter OTP</h1><p>OTP sent to +91 ${phone.slice(0,5)} ${phone.slice(5)}</p></div><div id="otp-boxes" class="otp-boxes">${[0,1,2,3].map((x) => `<input aria-label="OTP digit ${x+1}" inputmode="numeric" maxlength="1" data-otp="${x}" />`).join('')}</div><button class="primary-btn" id="verify-otp">Verify & Continue</button><div class="demo-box compact"><b>DEMO</b><span>Use OTP: 1234</span></div><button class="text-btn centered" data-action="resend">Resend OTP</button></section>`; }
function helplineView() { return `<section class="screen standard-screen"><button class="back" data-route="dashboard">← Back to dashboard</button><div class="page-heading"><div>📞</div><h1>Helpline & support</h1><p>Speak to a trained support representative.</p></div><div class="support-list"><a href="tel:155261"><b>155261</b><span>Toll-free · Mon–Sat, 9am–6pm</span><i>›</i></a><a href="tel:01124300606"><b>011-24300606</b><span>Direct helpline</span><i>›</i></a><a href="tel:1800115526"><b>1800-115-526</b><span>Toll-free alternate</span><i>›</i></a><div><b>🏛️ District Agriculture Office</b><span>Visit with Aadhaar and land papers</span></div></div><article class="scam-box"><h2>⚠️ Stay safe from scams</h2><p>PM-KISAN has no WhatsApp support. Never share your OTP, Aadhaar number, bank PIN, or card details.</p></article></section>`; }

function render() {
  let current = route(); if (!routes.includes(current)) current = 'splash';
  if (['dashboard','diagnosis','chat','helpline'].includes(current) && !state.farmer) return navigate('login');
  app.innerHTML = current === 'splash' ? splashView() : current === 'login' ? loginView() : current === 'otp' ? otpView() : current === 'dashboard' ? dashboardView(state.farmer, state.historyAll) : current === 'diagnosis' ? diagnosisView(state.farmer) : current === 'chat' ? chatView(state.farmer, state.messages, state.language) : helplineView();
  bind(current);
}

function bind(current) {
  document.querySelectorAll('[data-route]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.route)));
  if (current === 'splash') setTimeout(() => { if (route() === 'splash') navigate('login'); }, 2000);
  if (current === 'login') {
    let mode = 'mobile'; const input = document.querySelector('#identifier');
    document.querySelectorAll('[data-login-tab]').forEach(tab => tab.addEventListener('click', () => { mode = tab.dataset.loginTab; document.querySelectorAll('[data-login-tab]').forEach(x => x.classList.toggle('active', x === tab)); document.querySelector('#login-label').textContent = mode === 'mobile' ? 'Mobile number' : 'Registration number'; document.querySelector('#prefix').style.display = mode === 'mobile' ? '' : 'none'; input.maxLength = mode === 'mobile' ? 10 : 12; input.placeholder = mode === 'mobile' ? 'Enter your 10-digit mobile' : 'Enter your 12-digit registration number'; input.value = ''; input.focus(); }));
    document.querySelectorAll('[data-account]').forEach(button => button.addEventListener('click', () => { state.pendingLogin = button.dataset.account; input.value = state.pendingLogin; toast(`${FARMERS[state.pendingLogin].name}'s demo account selected`, 'success'); }));
    document.querySelector('#send-otp').addEventListener('click', () => { const value = input.value.replace(/\D/g,''); const farmer = farmerFor(value); if (!farmer) return toast('Please use one of the listed demo accounts.', 'error'); state.pendingLogin = value; navigate('otp'); });
  }
  if (current === 'otp') {
    const boxes = [...document.querySelectorAll('[data-otp]')]; boxes[0].focus(); boxes.forEach((box, idx) => box.addEventListener('input', () => { box.value = box.value.replace(/\D/g,'').slice(-1); if (box.value && boxes[idx + 1]) boxes[idx + 1].focus(); if (boxes.every(x => x.value)) verify(); })); boxes.forEach((box, idx) => box.addEventListener('keydown', event => { if (event.key === 'Backspace' && !box.value && boxes[idx - 1]) boxes[idx - 1].focus(); }));
    const verify = () => { const code = boxes.map(x => x.value).join(''); if (code !== '1234') return toast('That OTP is incorrect. Demo OTP is 1234.', 'error'); state.farmer = farmerFor(state.pendingLogin); state.messages = initialMessages(state.farmer, state.language); toast(`Welcome, ${state.farmer.name}!`, 'success'); navigate('dashboard'); };
    document.querySelector('#verify-otp').addEventListener('click', verify); document.querySelector('[data-action="resend"]').addEventListener('click', () => toast('A new demo OTP was sent: 1234', 'success'));
  }
  if (current === 'dashboard') document.querySelector('[data-action="history"]').addEventListener('click', () => { state.historyAll = !state.historyAll; render(); });
  if (current === 'chat') {
    const log = document.querySelector('#chat-log'); log.scrollTop = log.scrollHeight;
    document.querySelector('[data-action="language"]').addEventListener('click', () => { state.language = state.language === 'en' ? 'hi' : 'en'; render(); });
    const send = async (question) => {
      const text = question.trim();
      if (!text) return;
      state.messages.push({ from: 'user', text });
      app.innerHTML = chatView(state.farmer, state.messages, state.language, true);
      bind('chat');
      try {
        const botReply = await replyFor(text, state.farmer, state.language);
        state.messages.push({ from: 'bot', text: botReply });
      } catch (err) {
        state.messages.push({ from: 'bot', text: 'Kripya thodi der baad koshish karein ya helpline 155261 par call karein.' });
      }
      render();
    };
    document.querySelector('#chat-form').addEventListener('submit', event => { event.preventDefault(); send(document.querySelector('#chat-message').value); });
    document.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => send(button.dataset.question)));
  }
}

window.addEventListener('hashchange', render); render();
