import { t } from './i18n.js';
import { isAudioSpeaking } from './voice.js';
import { tablerIcon } from './icons.js';

export function diagnosisView(farmer, lang = 'hi') {
  if (!farmer.issue) {
    return `
      <section class="screen standard-screen">
        <button class="back" data-route="dashboard">
          ${tablerIcon('arrowLeft', 16)} <span>Back</span>
        </button>
        <div class="page-heading">
          <div class="heading-icon success-icon">${tablerIcon('circleCheck', 48)}</div>
          <h1>Everything looks good</h1>
          <p>There are no payment issues in your PM-KISAN profile right now.</p>
        </div>
        <button class="primary-btn" data-route="chat">
          ${tablerIcon('robot', 18)} <span>Ask Sahayak AI</span>
        </button>
      </section>
    `;
  }

  const issue = farmer.issueDetails;
  const speaking = isAudioSpeaking();

  return `
    <section class="screen standard-screen diagnosis-screen">
      <button class="back" data-route="dashboard">
        ${tablerIcon('arrowLeft', 16)} <span>Back to dashboard</span>
      </button>
      
      <div class="page-heading">
        <div class="heading-icon alert-icon">${tablerIcon('search', 40)}</div>
        <h1>${t('diagnosisTitle', lang)}</h1>
        <p>We diagnosed the exact issue holding your 23rd installment.</p>
      </div>

      <div class="audio-action-row">
        <button id="toggle-diag-speech-btn" class="audio-btn ${speaking ? 'speaking' : ''}">
          ${speaking ? '<span class="eq-bars"><i></i><i></i><i></i><i></i></span>' : tablerIcon('volume', 18)}
          <span>${speaking ? t('stopAudio', lang) : t('listenAudio', lang)}</span>
        </button>
      </div>

      <article class="issue-card" id="diag-summary-text">
        <span class="issue-badge">${t('issueFound', lang)} • ${issue.failedInstallment}rd INSTALLMENT</span>
        <h2>${issue.title}</h2>
        <p>${issue.explain}</p>

        ${farmer.nameDiff ? `
          <div class="name-diff-box">
            <div class="diff-title">
              <span>${tablerIcon('alertTriangle', 14)} रिकॉर्ड में नाम का अंतर (Character Discrepancy):</span>
              <b>Match: ${farmer.nameDiff.matchPct}</b>
            </div>
            <div class="diff-grid">
              <div class="diff-side aadhaar-side">
                <span class="diff-label">आधार कार्ड पर नाम (Aadhaar):</span>
                <strong class="diff-value">${farmer.nameDiff.aadhaar}</strong>
              </div>
              <div class="diff-side bank-side">
                <span class="diff-label">बैंक पासबुक पर नाम (Bank):</span>
                <strong class="diff-value">${farmer.nameDiff.bank} <span class="diff-highlight">[MISMATCH]</span></strong>
              </div>
            </div>
            <p class="diff-hint">💡 सुधार का उपाय: बैंक शाखा में आधार कार्ड प्रस्तुत कर पासबुक में पूरा नाम 'SUNITA DEVI' दर्ज कराएं।</p>
          </div>
        ` : ''}
      </article>

      <div class="diag-action-buttons">
        <button id="open-parchi-btn" class="parchi-btn primary-parchi">
          <span>${tablerIcon('fileDescription', 20)}</span>
          <span>${t('generateSlip', lang)}</span>
        </button>
        <a href="https://wa.me/?text=${encodeURIComponent(`*PM-KISAN Sahayak Report*\nकिसान: ${farmer.name}\nसमस्या: ${issue.title}\nसमाधान: नजदीकी CSC केंद्र पर जाएं।\nदस्तावेज़: ${issue.documents.join(', ')}`)}" target="_blank" rel="noopener" class="parchi-btn wa-share-btn">
          <span>${tablerIcon('brandWhatsapp', 20)}</span>
          <span>व्हाट्सएप पर शेयर करें</span>
        </a>
        <button class="parchi-btn csc-locator-trigger" data-route="csc-locator">
          <span>${tablerIcon('mapPin', 20)}</span>
          <span>नजदीकी CSC केंद्र खोजें</span>
        </button>
      </div>

      <h2 class="section-title">${tablerIcon('circleCheck', 20)} ${t('howToFix', lang)}</h2>
      <div class="resolution-list">
        ${issue.resolutionOptions.map((option, index) => `
          <details class="resolution-card" ${index === 0 ? 'open' : ''}>
            <summary>
              <span class="option-icon">${tablerIcon('shieldCheck', 22)}</span>
              <div>
                <h3>${option.title}</h3>
                <small>${option.time} • ${option.difficulty}</small>
              </div>
              <b class="chevron">${tablerIcon('chevronDown', 18)}</b>
            </summary>
            <ol>
              ${option.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </details>
        `).join('')}
      </div>

      <article class="documents-card">
        <h2>${tablerIcon('idBadge', 20)} ${t('documentsNeeded', lang)}</h2>
        ${issue.documents.map(item => `<p>${tablerIcon('check', 16)} ${item}</p>`).join('')}
      </article>

      <button class="primary-btn" data-route="chat">
        ${tablerIcon('robot', 20)} <span>Still confused? Talk to Sahayak AI</span>
      </button>
    </section>
  `;
}
