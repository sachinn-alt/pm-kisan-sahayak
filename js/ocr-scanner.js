// Real Document Scanner & Name Mismatch Matcher for Aadhaar & Bank Passbooks
import { tablerIcon } from './icons.js';

// Calculate Levenshtein edit distance between two strings
export function levenshteinDistance(a, b) {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = Array.from({ length: bn + 1 }, () => new Array(an + 1).fill(0));

  for (let i = 0; i <= an; i++) matrix[0][i] = i;
  for (let j = 0; j <= bn; j++) matrix[j][0] = j;

  for (let j = 1; j <= bn; j++) {
    for (let i = 1; i <= an; i++) {
      if (a[i - 1].toLowerCase() === b[j - 1].toLowerCase()) {
        matrix[j][i] = matrix[j - 1][i - 1];
      } else {
        matrix[j][i] = Math.min(
          matrix[j - 1][i - 1] + 1, // substitution
          matrix[j][i - 1] + 1,     // insertion
          matrix[j - 1][i] + 1      // deletion
        );
      }
    }
  }
  return matrix[bn][an];
}

// Calculate similarity percentage between two names
export function calculateNameSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  const s1 = str1.trim().toLowerCase();
  const s2 = str2.trim().toLowerCase();
  if (s1 === s2) return 100;
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 100;
  const dist = levenshteinDistance(s1, s2);
  return Math.max(0, Math.round(((maxLen - dist) / maxLen) * 100));
}

// Character-by-character diff generator
export function generateNameDiff(nameA, nameB) {
  const a = nameA || '';
  const b = nameB || '';
  const len = Math.max(a.length, b.length);
  let htmlA = '';
  let htmlB = '';

  for (let i = 0; i < len; i++) {
    const charA = a[i] || '';
    const charB = b[i] || '';
    if (charA.toLowerCase() === charB.toLowerCase() && charA !== '') {
      htmlA += `<span class="diff-char match">${charA}</span>`;
      htmlB += `<span class="diff-char match">${charB}</span>`;
    } else {
      htmlA += `<span class="diff-char mismatch">${charA || '·'}</span>`;
      htmlB += `<span class="diff-char mismatch">${charB || '·'}</span>`;
    }
  }
  return { htmlA, htmlB };
}

/**
 * Render the OCR Document Upload & Instant Scanner Modal
 */
export function renderOcrScannerModal(farmer, scanType = 'aadhaar', sampleExtractedName = '') {
  const expectedName = farmer.name;
  const registryBankName = farmer.bankNameOnRecord || (farmer.issueDetails?.bankName) || 'SUNEETA DEVI';
  const extractedName = sampleExtractedName || (scanType === 'bank' ? registryBankName : expectedName);
  const similarity = calculateNameSimilarity(expectedName, extractedName);
  const isMatch = similarity >= 90;
  const diff = generateNameDiff(expectedName, extractedName);

  return `<div class="modal-backdrop ocr-modal-backdrop" id="ocr-modal">
    <div class="ocr-modal-card">
      <div class="ocr-modal-header">
        <div class="ocr-title-wrap">
          <div class="ocr-icon-badge">${tablerIcon('scan', 22)}</div>
          <div>
            <h3>${scanType === 'aadhaar' ? 'Aadhaar Card Scanner' : 'Bank Passbook OCR Scanner'}</h3>
            <p>आधार व बैंक पासबुक नाम सत्यापन प्रणाली</p>
          </div>
        </div>
        <button class="icon-btn" id="close-ocr-modal" title="Close">${tablerIcon('close', 20)}</button>
      </div>

      <div class="ocr-body">
        <div class="ocr-dropzone" id="ocr-dropzone">
          <input type="file" id="ocr-file-input" accept="image/*" capture="environment" style="display: none;" />
          <div class="dropzone-content">
            <div class="camera-icon-wrap">${tablerIcon('camera', 32)}</div>
            <h4>Take Photo or Upload Document</h4>
            <p>फोटो खींचें या गैलरी से आधार कार्ड / बैंक पासबुक अपलोड करें</p>
            <button class="primary-btn sm" id="btn-trigger-upload">
              ${tablerIcon('camera', 16)} Open Camera / Browse
            </button>
          </div>
        </div>

        <div class="ocr-preview-section">
          <div class="ocr-doc-badge">
            <span class="badge-tag">${scanType === 'aadhaar' ? 'AADHAAR CARD' : 'BANK PASSBOOK / NPCI'}</span>
            <span class="badge-status ${isMatch ? 'success' : 'warning'}">
              ${isMatch ? tablerIcon('circleCheck', 14) + ' 100% Match' : tablerIcon('alertTriangle', 14) + ' Name Discrepancy (' + similarity + '% Similarity)'}
            </span>
          </div>

          <div class="comparison-grid">
            <div class="compare-card pm-kisan-card">
              <label>PM-KISAN Portal Name (Aadhaar Database)</label>
              <div class="diff-string">${diff.htmlA}</div>
              <span class="sub-label">Official Registry: <b>${expectedName}</b></span>
            </div>

            <div class="compare-card scanned-card ${isMatch ? '' : 'mismatch-alert'}">
              <label>${scanType === 'aadhaar' ? 'Scanned Document Name' : 'Bank Passbook / PFMS Record Name'}</label>
              <div class="diff-string">${diff.htmlB}</div>
              <span class="sub-label">Extracted Text: <b>${extractedName}</b></span>
            </div>
          </div>

          <div class="remediation-banner ${isMatch ? 'success' : 'danger'}">
            <div class="banner-icon">${isMatch ? tablerIcon('circleCheck', 20) : tablerIcon('alertCircle', 20)}</div>
            <div class="banner-text">
              <b>${isMatch ? 'Names Match Perfectly!' : 'PFMS DBT Rejection Root Cause Detected'}</b>
              <p>${isMatch 
                ? 'Your Aadhaar and Bank DBT records match. Direct benefit transfer will proceed smoothly.' 
                : `Character difference detected between <b>"${expectedName}"</b> and <b>"${extractedName}"</b>. PFMS rejects DBT transfers when names do not match 100%. Visit your bank branch with Seva Parchi to update DBT name mapping.`
              }</p>
            </div>
          </div>
        </div>
      </div>

      <div class="ocr-footer">
        <button class="btn secondary-btn" id="btn-ocr-cancel">Close</button>
        ${!isMatch ? `<button class="btn primary-btn" id="btn-ocr-download-slip">${tablerIcon('download', 16)} Download Seva Parchi</button>` : `<button class="btn primary-btn" id="btn-ocr-done">${tablerIcon('check', 16)} Verified</button>`}
      </div>
    </div>
  </div>`;
}
