import { tablerIcon } from './icons.js';
import { FARMERS } from './mock-data.js';
import { rupees } from './utils.js';
import { CSC_CENTERS } from './csc-locator-data.js';

export function whatsappBotView(currentFarmerKey, activeChatFlow = 'status', isPlayingVoice = false) {
  const farmer = FARMERS[currentFarmerKey] || FARMERS['9876543210'];
  const failed = farmer.installments.filter(x => x.status === 'failed');
  const received = farmer.installments.filter(x => x.status === 'received');
  const isAllClear = !farmer.issue;

  // Find nearest CSC for this farmer
  const nearestCsc = CSC_CENTERS.find(c => c.district.toLowerCase() === farmer.district.toLowerCase()) || CSC_CENTERS[0];

  return `
    <section class="screen whatsapp-simulator-screen">
      <!-- Persona Switcher Bar for Evaluators / Hackathon Judges -->
      <div class="wa-persona-bar">
        <span class="persona-label">${tablerIcon('help', 13)} Select Farmer Persona:</span>
        <div class="persona-chips">
          ${Object.entries(FARMERS).map(([key, f]) => {
            const isSelected = key === currentFarmerKey;
            const badge = f.issue === 'ekyc_expired' ? 'eKYC Issue' : f.issue === 'aadhaar_bank_mismatch' ? 'Name Mismatch' : f.issue === 'land_seeding_pending' ? 'Land Pending' : 'All Clear';
            return `
              <button class="persona-chip ${isSelected ? 'active' : ''}" data-wa-farmer="${key}">
                <b>${f.name.split(' ')[0]}</b>
                <small>${badge}</small>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- WhatsApp App Container Mockup -->
      <div class="wa-phone-frame">
        <!-- WhatsApp Header -->
        <header class="wa-header">
          <div class="wa-header-left">
            <button class="wa-back-btn" data-route="dashboard" title="Back to App">
              ${tablerIcon('arrowLeft', 20)}
            </button>
            <div class="wa-avatar">
              ${tablerIcon('sprout', 20)}
            </div>
            <div class="wa-contact-info">
              <div class="wa-contact-name">
                <span>PM-KISAN Sahayak Bot</span>
                <span class="wa-verified-badge">${tablerIcon('circleCheck', 14)}</span>
              </div>
              <span class="wa-status-text">Official Automated DBT Assistant • online</span>
            </div>
          </div>

          <div class="wa-header-actions">
            <button class="wa-icon-btn" data-route="csc-locator" title="Locate CSC">
              ${tablerIcon('mapPin', 20)}
            </button>
            <button class="wa-icon-btn" data-route="dashboard" title="Dashboard">
              ${tablerIcon('tractor', 20)}
            </button>
          </div>
        </header>

        <!-- WhatsApp Chat Body -->
        <div class="wa-chat-body" id="wa-chat-container">
          <!-- Encryption Security Notice -->
          <div class="wa-security-notice">
            <i>${tablerIcon('shieldCheck', 14)}</i>
            <span>Messages are end-to-end encrypted. Zero real PII or PINs are collected. Privacy-safe DBT guidance.</span>
          </div>

          <!-- Date Separator -->
          <div class="wa-date-pill">TODAY</div>

          <!-- Message 1: Automated Proactive Notification -->
          <div class="wa-message-row incoming">
            <div class="wa-bubble">
              <span class="wa-sender-tag">${tablerIcon('alertCircle', 12)} PM-KISAN DBT Notification</span>
              <p>नमस्ते <b>${farmer.name}</b> जी!</p>
              ${isAllClear ? `
                <p>आपकी <b>23वीं किस्त का ₹2,000</b> सफलतापूर्वक आपके बैंक खाते में जमा हो चुका है। कुल प्राप्त राशि: <b>${rupees(received.length * 2000)}</b> ${tablerIcon('circleCheck', 14)}</p>
              ` : `
                <p>आपकी <b>${farmer.issueDetails.failedInstallment}वीं किस्त</b> पर भुगतान रोका गया है।</p>
                <div class="wa-highlight-box danger">
                  <b>${tablerIcon('alertTriangle', 14)} कारण: ${farmer.issueDetails.title}</b>
                  <p>${farmer.issueDetails.explain}</p>
                </div>
              `}
              <span class="wa-time">10:42 AM · Read</span>
            </div>
          </div>

          <!-- Message 2: Audio Voice Note Message -->
          <div class="wa-message-row incoming">
            <div class="wa-bubble wa-voice-bubble">
              <div class="wa-voice-player">
                <button class="wa-play-btn ${isPlayingVoice ? 'playing' : ''}" id="wa-voice-play-trigger">
                  ${isPlayingVoice ? tablerIcon('volumeStop', 20) : tablerIcon('volume', 20)}
                </button>
                <div class="wa-waveform">
                  <span class="bar ${isPlayingVoice ? 'anim' : ''}"></span>
                  <span class="bar ${isPlayingVoice ? 'anim' : ''}"></span>
                  <span class="bar ${isPlayingVoice ? 'anim' : ''}"></span>
                  <span class="bar ${isPlayingVoice ? 'anim' : ''}"></span>
                  <span class="bar ${isPlayingVoice ? 'anim' : ''}"></span>
                  <span class="bar ${isPlayingVoice ? 'anim' : ''}"></span>
                  <span class="bar ${isPlayingVoice ? 'anim' : ''}"></span>
                </div>
                <span class="wa-voice-duration">${isPlayingVoice ? 'Playing...' : '0:14'}</span>
              </div>
              <small class="wa-voice-hint">${tablerIcon('mic', 12)} हिंदी ऑडियो में समस्या और समाधान सुनें</small>
              <span class="wa-time">10:43 AM</span>
            </div>
          </div>

          ${activeChatFlow === 'fix' && !isAllClear ? `
            <!-- Message 3: Resolution Action Plan -->
            <div class="wa-message-row incoming animate-in">
              <div class="wa-bubble">
                <span class="wa-sender-tag">${tablerIcon('fileDescription', 12)} समाधान के आसान कदम (Resolution Checklist)</span>
                <p>आपको केवल 2 काम करने हैं:</p>
                <ol class="wa-steps-list">
                  ${farmer.issueDetails.resolutionOptions[0].steps.slice(0, 3).map(s => `<li>${s}</li>`).join('')}
                </ol>
                <div class="wa-highlight-box info">
                  <b>आवश्यक दस्तावेज़ (Required Docs):</b>
                  <p>${farmer.issueDetails.documents.join(', ')}</p>
                </div>
                <div class="wa-free-badge">
                  ${tablerIcon('shieldCheck', 14)} यह सेवा पूर्णतः निःशुल्क (₹0) है। कोई अवैध शुल्क न दें।
                </div>
                <span class="wa-time">10:44 AM</span>
              </div>
            </div>
          ` : ''}

          <!-- Message 4: Printable Seva Parchi PDF in WhatsApp -->
          <div class="wa-message-row incoming">
            <div class="wa-bubble wa-pdf-bubble">
              <div class="wa-pdf-card">
                <span class="pdf-icon">${tablerIcon('fileDescription', 28)}</span>
                <div class="pdf-info">
                  <strong>Seva_Parchi_${farmer.name.replace(' ', '_')}.pdf</strong>
                  <small>1-Page Official CSC Action Slip • 142 KB</small>
                </div>
              </div>
              <div class="wa-pdf-actions">
                <button class="wa-pdf-btn" id="wa-open-parchi-btn">
                  ${tablerIcon('printer', 14)} <span>डाउनलोड / प्रिंट करें</span>
                </button>
              </div>
              <span class="wa-time">10:44 AM</span>
            </div>
          </div>

          <!-- Message 5: Nearest CSC Center Location -->
          <div class="wa-message-row incoming">
            <div class="wa-bubble wa-csc-bubble">
              <span class="wa-sender-tag">${tablerIcon('mapPin', 12)} नजदीकी सीएससी केंद्र (Nearest CSC Center)</span>
              <strong>${nearestCsc.name}</strong>
              <p>${tablerIcon('mapPin', 12)} ${nearestCsc.address}</p>
              <div class="wa-csc-meta">
                <span>VLE: <b>${nearestCsc.vleName}</b></span>
                <span class="dist-tag">${nearestCsc.distanceKm} km दूर</span>
              </div>
              <div class="wa-csc-btns">
                <a href="tel:${nearestCsc.phone}" class="wa-card-btn">
                  ${tablerIcon('phone', 14)} <span>कॉल करें</span>
                </a>
                <a href="https://maps.google.com/?q=${encodeURIComponent(nearestCsc.name + ' ' + nearestCsc.address)}" target="_blank" rel="noopener" class="wa-card-btn primary">
                  ${tablerIcon('navigation', 14)} <span>रास्ता देखें</span>
                </a>
              </div>
              <span class="wa-time">10:45 AM</span>
            </div>
          </div>
        </div>

        <!-- WhatsApp Quick-Reply Chips -->
        <div class="wa-quick-replies">
          <button class="wa-chip ${activeChatFlow === 'status' ? 'active' : ''}" data-wa-flow="status">
            ${tablerIcon('chartBar', 14)} <span>${isAllClear ? 'किस्त स्टेटस' : 'रुकी किस्त स्टेटस'}</span>
          </button>
          <button class="wa-chip ${activeChatFlow === 'fix' ? 'active' : ''}" data-wa-flow="fix">
            ${tablerIcon('shieldCheck', 14)} <span>समाधान कैसे करें?</span>
          </button>
          <button class="wa-chip" id="wa-quick-parchi">
            ${tablerIcon('fileDescription', 14)} <span>सेवा पर्ची देखें</span>
          </button>
          <button class="wa-chip" data-route="csc-locator">
            ${tablerIcon('mapPin', 14)} <span>नजदीकी CSC खोजें</span>
          </button>
        </div>

        <!-- WhatsApp Input Footer -->
        <footer class="wa-footer">
          <div class="wa-input-pill">
            <span class="wa-emoji-icon">${tablerIcon('sparkles', 16)}</span>
            <input type="text" id="wa-sim-input" placeholder="Type a message or tap voice note..." readonly value="Automated Guidance Mode Active" />
            <span class="wa-attach-icon">${tablerIcon('fileDescription', 18)}</span>
          </div>
          <button class="wa-mic-btn" id="wa-mic-speak-btn" title="Listen Audio Explanation">
            ${tablerIcon('mic', 20)}
          </button>
        </footer>
      </div>
    </section>
  `;
}
