import { STATE_DISBURSEMENT_DATA } from './farmer-corner-data.js';
import { t } from './i18n.js';

export function mapView(selectedStateCode = 'UP', lang = 'hi') {
  const selectedState = STATE_DISBURSEMENT_DATA[selectedStateCode] || STATE_DISBURSEMENT_DATA.UP;

  return `
    <section class="screen standard-screen map-screen">
      <button class="back" data-route="dashboard">← Back to dashboard</button>

      <div class="page-heading">
        <div>🗺️</div>
        <h1>राज्य व जिला वितरण नक्शा</h1>
        <p>PM-KISAN National Disbursement & District Analytics Map</p>
      </div>

      <!-- State Selector Pills -->
      <div class="state-pills" id="state-selector-pills">
        ${Object.entries(STATE_DISBURSEMENT_DATA).map(([code, s]) => `
          <button class="state-pill ${code === selectedStateCode ? 'active' : ''}" data-state-code="${code}">
            ${s.hindi} (${s.name})
          </button>
        `).join('')}
      </div>

      <!-- Macro Stats Card -->
      <div class="map-stats-card">
        <div class="map-stats-header">
          <h3>📍 ${selectedState.hindi} (${selectedState.name})</h3>
          <span class="ekyc-badge">eKYC: ${selectedState.ekycPercentage}</span>
        </div>

        <div class="map-metrics-grid">
          <div class="map-metric">
            <span class="label">कुल लाभार्थी किसान</span>
            <strong class="val">${selectedState.beneficiaries}</strong>
          </div>
          <div class="map-metric">
            <span class="label">कुल हस्तांतरित राशि</span>
            <strong class="val amount">${selectedState.amountDisbursed}</strong>
          </div>
        </div>

        <div class="progress-bar-wrap">
          <div class="progress-label">
            <span>eKYC संतृप्ति (Saturation)</span>
            <span>${selectedState.ekycPercentage}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${selectedState.ekycPercentage}"></div>
          </div>
        </div>
      </div>

      <!-- District Breakdown -->
      <div class="section-heading">
        <h2>जिलेवार वितरण (District Breakdown)</h2>
      </div>

      <div class="district-table-card">
        <table class="district-table">
          <thead>
            <tr>
              <th>जिला (District)</th>
              <th>लाभार्थी</th>
              <th>कुल भुगतान</th>
              <th>eKYC</th>
            </tr>
          </thead>
          <tbody>
            ${selectedState.districts.map(d => `
              <tr>
                <td><strong>${d.name}</strong></td>
                <td>${d.farmers}</td>
                <td class="amount">${d.amount}</td>
                <td><span class="district-ekyc-tag">${d.ekyc}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="mock-notice" style="margin-top: 18px;">
        <span class="mock-badge">PUBLIC TRANSPARENCY</span>
        <span>Data updated as per 23rd Installment Direct Benefit Transfer cycle.</span>
      </div>
    </section>
  `;
}
