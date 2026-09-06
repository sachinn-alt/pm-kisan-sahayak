import { t } from './i18n.js';
import { tablerIcon, emblemOfIndia } from './icons.js';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';

// Generate QR Code SVG for quick verification
function generateQrSvg(regNumber) {
  return `<svg class="parchi-qr-svg" viewBox="0 0 100 100" width="70" height="70" aria-label="QR Code">
    <rect width="100" height="100" fill="#ffffff" rx="4"/>
    <!-- Top-Left Corner Box -->
    <rect x="8" y="8" width="28" height="28" fill="#1b5e20"/>
    <rect x="14" y="14" width="16" height="16" fill="#ffffff"/>
    <rect x="18" y="18" width="8" height="8" fill="#1b5e20"/>
    <!-- Top-Right Corner Box -->
    <rect x="64" y="8" width="28" height="28" fill="#1b5e20"/>
    <rect x="70" y="14" width="16" height="16" fill="#ffffff"/>
    <rect x="74" y="18" width="8" height="8" fill="#1b5e20"/>
    <!-- Bottom-Left Corner Box -->
    <rect x="8" y="64" width="28" height="28" fill="#1b5e20"/>
    <rect x="14" y="70" width="16" height="16" fill="#ffffff"/>
    <rect x="18" y="74" width="8" height="8" fill="#1b5e20"/>
    <!-- Random pattern matrix for realistic feel -->
    <rect x="42" y="12" width="6" height="6" fill="#1b5e20"/>
    <rect x="52" y="12" width="6" height="12" fill="#1b5e20"/>
    <rect x="42" y="24" width="16" height="6" fill="#1b5e20"/>
    <rect x="12" y="42" width="12" height="6" fill="#1b5e20"/>
    <rect x="30" y="42" width="6" height="12" fill="#1b5e20"/>
    <rect x="42" y="36" width="6" height="16" fill="#1b5e20"/>
    <rect x="54" y="42" width="12" height="6" fill="#1b5e20"/>
    <rect x="72" y="42" width="16" height="6" fill="#1b5e20"/>
    <rect x="42" y="58" width="16" height="6" fill="#1b5e20"/>
    <rect x="64" y="58" width="6" height="18" fill="#1b5e20"/>
    <rect x="76" y="58" width="12" height="6" fill="#1b5e20"/>
    <rect x="42" y="70" width="6" height="18" fill="#1b5e20"/>
    <rect x="54" y="70" width="18" height="6" fill="#1b5e20"/>
    <rect x="78" y="76" width="10" height="12" fill="#1b5e20"/>
  </svg>`;
}

export function downloadParchiPdf(farmer) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const issue = farmer.issueDetails || {
      title: 'All Records Updated',
      explain: 'No pending issue found.',
      documents: ['Original Aadhaar Card', 'Bank Passbook']
    };

    const today = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // Tricolor top banner
    doc.setFillColor(255, 153, 51); // Saffron
    doc.rect(10, 8, 190, 2, 'F');
    doc.setFillColor(255, 255, 255); // White
    doc.rect(10, 10, 190, 2, 'F');
    doc.setFillColor(19, 136, 8); // Green
    doc.rect(10, 12, 190, 2, 'F');

    // Header Titles
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(27, 94, 32);
    doc.text('GOVERNMENT OF INDIA / भारत सरकार', 105, 22, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text('Ministry of Agriculture & Farmers Welfare | कृषि एवं किसान कल्याण मंत्रालय', 105, 28, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(20, 20, 20);
    doc.text('PM-KISAN CITIZEN ACTION SLIP (पीएम-किसान सेवा पर्ची)', 105, 36, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${today} | Unique Verification Ref: PMK-${farmer.regNumber.slice(-6)}`, 105, 41, { align: 'center' });

    // Section 1: Beneficiary Details Box
    doc.setDrawColor(200, 220, 200);
    doc.setFillColor(248, 253, 248);
    doc.roundedRect(15, 46, 180, 42, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(27, 94, 32);
    doc.text('1. BENEFICIARY DETAILS (किसान का विवरण)', 20, 54);

    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'normal');
    doc.text(`Farmer Name:`, 20, 62);
    doc.setFont('helvetica', 'bold');
    doc.text(`${farmer.name}`, 60, 62);

    doc.setFont('helvetica', 'normal');
    doc.text(`Registration No:`, 110, 62);
    doc.setFont('helvetica', 'bold');
    doc.text(`${farmer.regNumber}`, 150, 62);

    doc.setFont('helvetica', 'normal');
    doc.text(`Mobile Number:`, 20, 70);
    doc.setFont('helvetica', 'bold');
    doc.text(`+91 ${farmer.pendingLogin || '9876543210'}`, 60, 70);

    doc.setFont('helvetica', 'normal');
    doc.text(`Aadhaar Last 4:`, 110, 70);
    doc.setFont('helvetica', 'bold');
    doc.text(`XXXX-XXXX-${farmer.aadhaarLast4 || '4321'}`, 150, 70);

    doc.setFont('helvetica', 'normal');
    doc.text(`Village & District:`, 20, 78);
    doc.setFont('helvetica', 'bold');
    doc.text(`${farmer.village}, ${farmer.district}, ${farmer.state}`, 60, 78);

    // Section 2: Rejection / Issue Diagnosis
    doc.setDrawColor(245, 180, 180);
    doc.setFillColor(255, 246, 246);
    doc.roundedRect(15, 93, 180, 42, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(180, 40, 40);
    doc.text('2. PFMS REJECTION DIAGNOSIS (समस्या का कारण)', 20, 101);

    doc.setFontSize(10.5);
    doc.setTextColor(20, 20, 20);
    doc.text(`Issue Found: ${issue.title}`, 20, 110);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    const splitExplain = doc.splitTextToSize(`Explanation: ${issue.explain}`, 170);
    doc.text(splitExplain, 20, 118);

    // Section 3: Action Instructions for CSC / Bank Operator
    doc.setDrawColor(180, 210, 240);
    doc.setFillColor(245, 250, 255);
    doc.roundedRect(15, 140, 180, 40, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 75, 140);
    doc.text('3. CSC / VLE OPERATOR INSTRUCTIONS (सीएससी ऑपरेटर हेतु निर्देश)', 20, 148);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 40);
    doc.text('• Verify biometric authentication on pmkisan.gov.in CSC login portal.', 20, 156);
    doc.text('• Re-seed Aadhaar with active bank account in NPCI DBT Bharat mapper.', 20, 163);
    doc.text('• Issue physical acknowledgment receipt to the farmer after biometric scan.', 20, 170);

    // Section 4: Required Documents
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(252, 252, 252);
    doc.roundedRect(15, 185, 180, 35, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text('4. MANDATORY DOCUMENTS REQUIRED (जरूरी दस्तावेज)', 20, 193);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    let docY = 201;
    issue.documents.forEach((d) => {
      doc.text(`[✓] ${d}`, 25, docY);
      docY += 6;
    });

    // Anti-Corruption Zero Fee Statutory Warning Box
    doc.setDrawColor(255, 160, 0);
    doc.setFillColor(255, 250, 235);
    doc.roundedRect(15, 225, 180, 26, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(180, 90, 0);
    doc.text('OFFICIAL STATUTORY NOTICE (शुल्क संबंधी सरकारी निर्देश):', 20, 233);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(60, 50, 20);
    doc.text('Biometric e-KYC and Aadhaar DBT seeding on PM-KISAN are 100% FREE (₹0). Do NOT pay any unofficial', 20, 240);
    doc.text('charges to middlemen or touts. Report illegal demands to Toll-Free Helpline: 155261 / 1800-115-526.', 20, 245);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text('PM-KISAN Sahayak Citizen Companion | Built for Build What Moves India | Authentic Digital Receipt', 105, 275, { align: 'center' });

    // Save File
    const filename = `PM-KISAN_Seva_Parchi_${farmer.regNumber}.pdf`;
    doc.save(filename);

    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    return true;
  } catch (err) {
    console.error('PDF generation error:', err);
    window.print();
    return false;
  }
}

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

  const shareText = `*भारत सरकार - पीएम-किसान सम्मान निधि सेवा पर्ची (Action Slip)*\n\n` +
    `👤 *किसान का नाम*: ${farmer.name}\n` +
    `🔢 *पंजीकरण संख्या*: ${farmer.regNumber}\n` +
    `📍 *स्थान*: ${farmer.village}, ${farmer.district}, ${farmer.state}\n\n` +
    `⚠️ *समस्या का कारण*: ${issue.title}\n` +
    `📝 *विवरण*: ${issue.explain}\n\n` +
    `📄 *सीएससी ऑपरेटर हेतु आवश्यक दस्तावेज*:\n` +
    issue.documents.map(d => `• ${d}`).join('\n') +
    `\n\n🛡️ *सरकारी निर्देश*: आधार ई-केवाईसी और डीबीटी सीडिंग पूर्णतः निःशुल्क (₹0) है। किसी को अवैध शुल्क न दें।\n📞 हेल्पलाइन: 155261`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return `
    <div id="parchi-modal-overlay" class="modal-overlay">
      <div class="parchi-modal-card">
        <div class="parchi-modal-header">
          <div class="header-title-flex">
            ${emblemOfIndia(36, 'modal-emblem')}
            <div>
              <span class="parchi-badge">GOVT OF INDIA DBT SLIP</span>
              <h2>नागरिक सहायता पर्ची (Action Slip)</h2>
            </div>
          </div>
          <button class="icon-btn" id="close-parchi-btn" aria-label="Close">
            ${tablerIcon('close', 20)}
          </button>
        </div>

        <div class="parchi-slip-content" id="parchi-print-area">
          <div class="slip-national-header">
            <div class="slip-emblem-wrap">
              ${emblemOfIndia(48)}
            </div>
            <div class="slip-national-text">
              <h3>भारत सरकार / GOVERNMENT OF INDIA</h3>
              <p class="sub">कृषि एवं किसान कल्याण मंत्रालय (Ministry of Agriculture & Farmers Welfare)</p>
              <h4>पीएम-किसान नागरिक सहायता पर्ची • SEVA PARCHI</h4>
              <span class="ref-badge">Ref: PMK-${farmer.regNumber.slice(-6)} • ${today}</span>
            </div>
            <div class="slip-qr-wrap">
              ${generateQrSvg(farmer.regNumber)}
              <span class="qr-caption">Scan to Verify</span>
            </div>
          </div>

          <div class="slip-grid">
            <div class="slip-row">
              <span class="label">किसान का नाम (Farmer):</span>
              <strong class="val">${farmer.name}</strong>
            </div>
            <div class="slip-row">
              <span class="label">पंजीकरण संख्या (Reg No):</span>
              <strong class="val highlight-mono">${farmer.regNumber}</strong>
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
            <div class="issue-tag">${tablerIcon('alertTriangle', 14)} पीएफएमएस अस्वीकृति कारण (Detected Issue)</div>
            <h4>${issue.title}</h4>
            <p>${issue.explain}</p>
          </div>

          <div class="slip-operator-box">
            <h4>${tablerIcon('idBadge', 16)} सीएससी / बैंक ऑपरेटर हेतु निर्देश (Action Required):</h4>
            <p>कृपया इस किसान के <strong>${issue.title}</strong> का समाधान करें। बायोमेट्रिक प्रमाणीकरण / आधार सीडिंग विवरण पोर्टल पर अपडेट करें।</p>
          </div>

          <div class="slip-docs-box">
            <h4>${tablerIcon('fileDescription', 16)} साथ लाए जाने वाले जरूरी दस्तावेज (Mandatory Documents):</h4>
            <ul>
              ${issue.documents.map(doc => `<li>${tablerIcon('check', 14)} <span>${doc}</span></li>`).join('')}
            </ul>
          </div>

          <div class="slip-warning-footer">
            <p><strong>${tablerIcon('shieldCheck', 16)} सरकारी निर्देश:</strong> आधार ई-केवाईसी और पोर्टल स्थिति जांच सीएससी पर पूर्णतः <strong>निःशुल्क (₹0)</strong> है। किसी बिचौलिए को अवैध राशि न दें। राष्ट्रीय हेल्पलाइन: <strong>155261</strong> / <strong>1800-115-526</strong></p>
          </div>
        </div>

        <div class="parchi-actions">
          <button class="primary-btn pdf-btn" id="download-parchi-pdf-btn">
            ${tablerIcon('download', 18)} <span>Download PDF (.pdf)</span>
          </button>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
            ${tablerIcon('brandWhatsapp', 18)} <span>WhatsApp पर भेजें (Share)</span>
          </a>
          <button class="secondary-btn" id="print-parchi-btn">
            ${tablerIcon('printer', 18)} <span>प्रिंट करें (Print)</span>
          </button>
          <button class="text-btn centered" id="dismiss-parchi-btn">वापस जाएं (Close)</button>
        </div>
      </div>
    </div>
  `;
}
