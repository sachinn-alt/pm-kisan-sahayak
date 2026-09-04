import { t } from './i18n.js';
import { tablerIcon } from './icons.js';

export function renderSevaParchiModal(farmer, lang = 'hi') {
  if (!farmer) return '';
  const issue = farmer.issueDetails || {
    title: 'सभी विवरण सही हैं (All Records Updated)',
    explain: 'कोई लंबित समस्या नहीं पाई गई।',
    failedInstallment: null,
    documents: ['मूल आधार कार्ड', 'बैंक पासबुक']
  };

  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return `
    <div id="parchi-modal-overlay" class="modal-overlay">
      <div class="parchi-modal-card">
        <div class="parchi-modal-header">
          <div>
            <span class="parchi-badge">CSC & SEVA KENDRA SLIP</span>
            <h2>नागरिक सहायता पर्ची (Action Slip)</h2>
          </div>
          <button class="icon-btn" id="close-parchi-btn" aria-label="Close">
            ${tablerIcon('close', 18)}
          </button>
        </div>

        <div class="parchi-slip-content" id="parchi-print-area">
          <div class="slip-header-banner">
            <h3>${tablerIcon('sprout', 20)} पीएम-किसान सम्मान निधि सेवा पर्ची</h3>
            <p>PM-KISAN CITIZEN FACILITATION RECEIPT • ${today}</p>
          </div>

          <div class="slip-grid">
            <div class="slip-row">
              <span class="label">किसान का नाम (Farmer):</span>
              <strong class="val">${farmer.name}</strong>
            </div>
            <div class="slip-row">
              <span class="label">पंजीकरण संख्या (Reg No):</span>
              <strong class="val">${farmer.regNumber}</strong>
            </div>
            <div class="slip-row">
              <span class="label">मोबाइल नंबर (Mobile):</span>
              <span class="val">+91 ${farmer.pendingLogin || '9876543210'}</span>
            </div>
            <div class="slip-row">
              <span class="label">स्थान (Location):</span>
              <span class="val">${farmer.village}, ${farmer.district}, ${farmer.state}</span>
            </div>
          </div>

          <div class="slip-issue-box">
            <div class="issue-tag">समस्या (Detected Issue)</div>
            <h4>${issue.title}</h4>
            <p>${issue.explain}</p>
          </div>

          <div class="slip-operator-box">
            <h4>${tablerIcon('idBadge', 16)} सीएससी / बैंक ऑपरेटर हेतु निर्देश:</h4>
            <p>कृपया इस किसान के <strong>${issue.title}</strong> का समाधान करें। बायोमेट्रिक प्रमाणीकरण / आधार सीडिंग विवरण पोर्टल पर अपडेट करें।</p>
          </div>

          <div class="slip-docs-box">
            <h4>${tablerIcon('fileDescription', 16)} साथ लाए जाने वाले जरूरी दस्तावेज:</h4>
            <ul>
              ${issue.documents.map(doc => `<li>${tablerIcon('check', 14)} ${doc}</li>`).join('')}
            </ul>
          </div>

          <div class="slip-warning-footer">
            <p><strong>${tablerIcon('shieldCheck', 14)} सरकारी निर्देश:</strong> आधार ई-केवाईसी और पोर्टल स्थिति जांच सीएससी पर पूर्णतः निःशुल्क या निर्धारित सरकारी शुल्क पर उपलब्ध है। अवैध राशि न दें। हेल्पलाइन: 155261</p>
          </div>
        </div>

        <div class="parchi-actions">
          <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(`*पीएम-किसान सम्मान निधि सेवा पर्ची*\n\nकिसान का नाम: ${farmer.name}\nपंजीकरण: ${farmer.regNumber}\nस्थान: ${farmer.village}, ${farmer.district}\n\nसमस्या: ${issue.title}\nआवश्यक दस्तावेज:\n${issue.documents.map(d => `• ${d}`).join('\n')}\n\nयह पर्ची PM-KISAN Sahayak पोर्टल से बनाई गई है।`)}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
            ${tablerIcon('brandWhatsapp', 18)} <span>WhatsApp पर पर्ची भेजें (Share Slip)</span>
          </a>
          <button class="primary-btn" id="print-parchi-btn">
            ${tablerIcon('printer', 18)} <span>पर्ची प्रिंट / PDF सेव करें</span>
          </button>
          <button class="text-btn centered" id="dismiss-parchi-btn">वापस जाएं (Back)</button>
        </div>
      </div>
    </div>
  `;
}
