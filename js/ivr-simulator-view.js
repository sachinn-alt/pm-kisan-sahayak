import { tablerIcon } from './icons.js';
import { FARMERS } from './mock-data.js';
import { rupees } from './utils.js';

export function ivrSimulatorView(currentFarmerKey, callState = 'idle', callStep = 1, callDuration = '00:00', lang = 'hi') {
  const farmer = FARMERS[currentFarmerKey] || FARMERS['9876543210'];
  const isAllClear = !farmer.issue;
  const received = farmer.installments.filter(x => x.status === 'received');

  let lcdMessage = '';
  if (callState === 'idle') {
    lcdMessage = 'Toll-Free Helpline: 155261\nPress CALL to start audio demo';
  } else if (callState === 'calling') {
    lcdMessage = 'Dialing 155261 (Toll-Free)...\nConnecting to PM-KISAN IVR';
  } else if (callState === 'connected') {
    if (callStep === 1) {
      lcdMessage = '1: हिंदी | 2: English\nPress 1 on keypad';
    } else if (callStep === 2) {
      lcdMessage = '1: Kist Status | 2: eKYC Info\nPress 1 to hear installment';
    } else if (callStep === 3) {
      if (isAllClear) {
        lcdMessage = `Farmer: ${farmer.name}\nStatus: All ${received.length} installments clear!`;
      } else {
        lcdMessage = `Farmer: ${farmer.name}\nIssue: ${farmer.issueDetails.title}\nVisit nearest CSC with Aadhaar`;
      }
    }
  }

  return `
    <section class="screen standard-screen ivr-screen">
      <div class="top-nav-bar">
        <button class="back" data-route="dashboard">
          ${tablerIcon('arrowLeft', 16)} <span>${lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}</span>
        </button>
        <div class="nav-badges">
          <span class="govt-mini-pill">${tablerIcon('phone', 14)} 155261 IVR Simulator</span>
        </div>
      </div>

      <div class="page-heading">
        <div class="heading-icon phone-icon">${tablerIcon('phone', 40)}</div>
        <h1>${lang === 'hi' ? '155261 टोल-फ्री IVR हेल्पलाइन' : '155261 Toll-Free IVR Simulator'}</h1>
        <p>${lang === 'hi' ? 'साधारण कीपैड फोन (Feature Phone) वाले किसानों के लिए वॉइस कॉल सिमुलेटर' : 'Interactive voice response demo for non-smartphone / feature phone users'}</p>
      </div>

      <!-- Persona Switcher -->
      <div class="ivr-persona-bar">
        <span class="persona-label">${tablerIcon('help', 13)} Farmer Profile:</span>
        <div class="persona-chips">
          ${Object.entries(FARMERS).map(([key, f]) => {
            const isSelected = key === currentFarmerKey;
            const badge = f.issue === 'ekyc_expired' ? 'eKYC Issue' : f.issue === 'aadhaar_bank_mismatch' ? 'Name Mismatch' : f.issue === 'land_seeding_pending' ? 'Land Pending' : 'All Clear';
            return `
              <button class="persona-chip ${isSelected ? 'active' : ''}" data-ivr-farmer="${key}">
                <b>${f.name.split(' ')[0]}</b>
                <small>${badge}</small>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Feature Phone Frame Mockup -->
      <div class="feature-phone-body">
        <!-- Speaker Grill -->
        <div class="phone-speaker-grill">
          <span></span><span></span><span></span><span></span><span></span>
        </div>

        <!-- LCD Screen -->
        <div class="phone-lcd-screen ${callState === 'connected' ? 'in-call' : ''}">
          <div class="lcd-top-bar">
            <span class="lcd-signal">${tablerIcon('signal', 12)} 4G</span>
            <span class="lcd-timer">${callState === 'connected' ? callDuration : '155261'}</span>
            <span class="lcd-battery">${tablerIcon('battery', 12)} 92%</span>
          </div>
          <div class="lcd-main-display">
            <pre id="lcd-text-display">${lcdMessage}</pre>
          </div>
          ${callState === 'connected' ? `
            <div class="lcd-sound-wave">
              <span class="bar anim"></span>
              <span class="bar anim"></span>
              <span class="bar anim"></span>
              <span class="bar anim"></span>
              <span class="bar anim"></span>
            </div>
          ` : ''}
        </div>

        <!-- Keypad Grid (12 Buttons) -->
        <div class="phone-keypad-grid">
          <button class="key-btn" data-key="1"><b>1</b><small>हिंदी</small></button>
          <button class="key-btn" data-key="2"><b>2</b><small>ABC</small></button>
          <button class="key-btn" data-key="3"><b>3</b><small>DEF</small></button>
          <button class="key-btn" data-key="4"><b>4</b><small>GHI</small></button>
          <button class="key-btn" data-key="5"><b>5</b><small>JKL</small></button>
          <button class="key-btn" data-key="6"><b>6</b><small>MNO</small></button>
          <button class="key-btn" data-key="7"><b>7</b><small>PQRS</small></button>
          <button class="key-btn" data-key="8"><b>8</b><small>TUV</small></button>
          <button class="key-btn" data-key="9"><b>9</b><small>WXYZ</small></button>
          <button class="key-btn" data-key="*"><b>*</b><small>Repeat</small></button>
          <button class="key-btn" data-key="0"><b>0</b><small>+</small></button>
          <button class="key-btn" data-key="#"><b>#</b><small>Menu</small></button>
        </div>

        <!-- Call Action Controls -->
        <div class="phone-call-actions">
          ${callState === 'idle' ? `
            <button class="call-btn-green" id="ivr-start-call">
              ${tablerIcon('phone', 20)} <span>कॉल लगाएं (155261)</span>
            </button>
          ` : `
            <button class="call-btn-red" id="ivr-end-call">
              ${tablerIcon('phone', 20)} <span>कॉल काटें (End Call)</span>
            </button>
          `}
        </div>
      </div>

      <!-- Government Helplines Directory -->
      <div class="helpline-directory-card">
        <h3>${tablerIcon('shieldCheck', 18)} आधिकारिक सरकारी दूरभाष संपर्क</h3>
        <div class="support-list">
          <a href="tel:155261">
            <div>
              <b>155261</b>
              <span>टोल-फ्री किसान हेल्पलाइन (सोम–शनि, 9 AM – 6 PM)</span>
            </div>
            <i>${tablerIcon('chevronRight', 16)}</i>
          </a>
          <a href="tel:1800115526">
            <div>
              <b>1800-115-526</b>
              <span>वैकल्पिक राष्ट्रीय टोल-फ्री नंबर</span>
            </div>
            <i>${tablerIcon('chevronRight', 16)}</i>
          </a>
          <a href="tel:01124300606">
            <div>
              <b>011-24300606</b>
              <span>कृषि भवन, नई दिल्ली केंद्रीय हेल्पलाइन</span>
            </div>
            <i>${tablerIcon('chevronRight', 16)}</i>
          </a>
        </div>
      </div>
    </section>
  `;
}
