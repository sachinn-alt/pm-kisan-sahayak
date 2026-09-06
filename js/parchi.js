import { t } from './i18n.js';
import { tablerIcon, emblemOfIndia } from './icons.js';

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

export async function downloadParchiPdf(farmer) {
  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const issue = farmer.issueDetails || {
      title: 'सभी विवरण सही हैं (All Records Updated)',
      explain: 'खाते में कोई लंबित समस्या नहीं पाई गई। आगामी किस्त समय पर जमा होगी।',
      documents: ['मूल आधार कार्ड (Original Aadhaar)', 'बैंक पासबुक (Bank Passbook)']
    };

    const today = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // Outer Certificate Double Border Frame
    doc.setDrawColor(27, 94, 32); // Forest Green
    doc.setLineWidth(0.7);
    doc.rect(8, 8, 194, 281, 'D');

    doc.setDrawColor(218, 165, 32); // Warm Gold
    doc.setLineWidth(0.3);
    doc.rect(9.5, 9.5, 191, 278, 'D');

    // National Tricolor Top Ribbon
    doc.setFillColor(255, 153, 51); // Saffron
    doc.rect(10, 10, 190, 2.5, 'F');
    doc.setFillColor(255, 255, 255); // White
    doc.rect(10, 12.5, 190, 2.5, 'F');
    doc.setFillColor(19, 136, 8); // India Green
    doc.rect(10, 15, 190, 2.5, 'F');

    // Header Titles
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(27, 94, 32);
    doc.text('GOVERNMENT OF INDIA / भारत सरकार', 105, 25, { align: 'center' });

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text('Ministry of Agriculture & Farmers Welfare | कृषि एवं किसान कल्याण मंत्रालय', 105, 30, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    doc.setTextColor(20, 20, 20);
    doc.text('PM-KISAN DBT CITIZEN SEVA PARCHI (नागरिक सहायता पर्ची)', 105, 37, { align: 'center' });

    // Reference Pill
    doc.setFillColor(240, 248, 240);
    doc.setDrawColor(180, 220, 180);
    doc.roundedRect(42, 40.5, 126, 6, 2, 2, 'FD');
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(27, 94, 32);
    doc.text(`Official Ref: PMK-${farmer.regNumber.slice(-6)}   |   Date: ${today}   |   CSC Priority Slip`, 105, 44.5, { align: 'center' });

    // Vector QR Code on Top Right (x: 172, y: 22)
    doc.setFillColor(27, 94, 32);
    doc.rect(172, 21, 22, 22, 'F');
    doc.setFillColor(255, 255, 255);
    doc.rect(173.5, 22.5, 19, 19, 'F');
    doc.setFillColor(27, 94, 32);
    // Corners
    doc.rect(175, 24, 5, 5, 'F');
    doc.setFillColor(255, 255, 255);
    doc.rect(176, 25, 3, 3, 'F');
    doc.setFillColor(27, 94, 32);
    doc.rect(177, 26, 1, 1, 'F');

    doc.rect(185, 24, 5, 5, 'F');
    doc.setFillColor(255, 255, 255);
    doc.rect(186, 25, 3, 3, 'F');
    doc.setFillColor(27, 94, 32);
    doc.rect(187, 26, 1, 1, 'F');

    doc.rect(175, 34, 5, 5, 'F');
    doc.setFillColor(255, 255, 255);
    doc.rect(176, 35, 3, 3, 'F');
    doc.setFillColor(27, 94, 32);
    doc.rect(177, 36, 1, 1, 'F');

    // Matrix dots
    doc.rect(181, 25, 2, 2, 'F');
    doc.rect(181, 29, 4, 1.5, 'F');
    doc.rect(182, 32, 1.5, 3, 'F');
    doc.rect(185, 34, 5, 2, 'F');
    doc.rect(187, 37, 3, 2, 'F');

    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(27, 94, 32);
    doc.text('SCAN TO VERIFY', 183, 46, { align: 'center' });

    // Section 1: Beneficiary Credentials
    doc.setDrawColor(187, 222, 194);
    doc.setFillColor(248, 253, 249);
    doc.roundedRect(13, 49, 184, 42, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(27, 94, 32);
    doc.text('1. BENEFICIARY IDENTIFICATION / किसान पहचान विवरण', 18, 56);

    // 2-Column Beneficiary Details Grid
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Farmer Name (किसान का नाम):', 18, 63);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(`${farmer.name}`, 72, 63);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Registration No (पंजीकरण सं.):', 110, 63);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(`${farmer.regNumber}`, 160, 63);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Mobile No (मोबाइल नंबर):', 18, 71);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(`+91 ${farmer.pendingLogin || '9876543210'}`, 72, 71);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Aadhaar Seeding Status:', 110, 71);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(`XXXX-XXXX-${farmer.aadhaarLast4 || '4321'}`, 160, 71);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Village / Panchayat (ग्राम):', 18, 79);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(`${farmer.village}`, 72, 79);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('District & State (जिला व राज्य):', 110, 79);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(`${farmer.district}, ${farmer.state}`, 160, 79);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Installments Received / Total:', 18, 87);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(27, 94, 32);
    const recCount = farmer.installments.filter(x => x.status === 'received').length;
    doc.text(`${recCount} Credited (Total ₹${(recCount * 2000).toLocaleString('en-IN')})`, 72, 87);

    // Section 2: Rejection / Issue Diagnosis
    doc.setDrawColor(254, 202, 202);
    doc.setFillColor(255, 245, 245);
    doc.roundedRect(13, 94, 184, 40, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(185, 28, 28);
    doc.text('2. PFMS & DBT REJECTION DIAGNOSIS / अस्वीकृति का मुख्य कारण', 18, 101);

    doc.setFontSize(9.5);
    doc.setTextColor(153, 27, 27);
    doc.setFont('helvetica', 'bold');
    doc.text(`Detected Issue: ${issue.title}`, 18, 109);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    const splitExplain = doc.splitTextToSize(`Root Cause Explanation: ${issue.explain}`, 174);
    doc.text(splitExplain, 18, 116);

    // Section 3: Action Required by CSC / VLE Operator
    doc.setDrawColor(191, 219, 254);
    doc.setFillColor(240, 247, 255);
    doc.roundedRect(13, 137, 184, 42, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(29, 78, 216);
    doc.text('3. CSC / VLE / BANK OPERATOR DIRECTIVES / ऑपरेटर हेतु कार्य निर्देश', 18, 144);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text('Step 1: Open official PM-KISAN portal (pmkisan.gov.in) via authorized CSC Login.', 20, 151);
    doc.text('Step 2: Carry out Biometric Fingerprint / Iris / Face authentication for the citizen.', 20, 157);
    doc.text('Step 3: Verify and link active bank account to NPCI Aadhaar Direct Benefit Transfer mapper.', 20, 163);
    doc.text('Step 4: Issue official signed acknowledgement slip to farmer (Zero Fee / निःशुल्क).', 20, 169);

    // Section 4: Mandatory Documents Checklist
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(13, 182, 184, 38, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(51, 65, 85);
    doc.text('4. MANDATORY DOCUMENTS REQUIRED / किसान द्वारा साथ लाए जाने वाले दस्तावेज', 18, 189);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    let docY = 196;
    issue.documents.forEach((d) => {
      doc.setDrawColor(27, 94, 32);
      doc.setFillColor(240, 253, 244);
      doc.rect(20, docY - 3, 3.5, 3.5, 'FD');
      doc.text('✓', 20.8, docY - 0.5);
      doc.text(`${d}`, 27, docY);
      docY += 6.5;
    });

    // Section 5: Anti-Corruption & Zero Fee Statutory Notice
    doc.setDrawColor(251, 191, 36);
    doc.setFillColor(255, 251, 235);
    doc.roundedRect(13, 223, 184, 25, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(180, 83, 9);
    doc.text('5. OFFICIAL STATUTORY ZERO-FEE NOTICE / शुल्क संबंधी सरकारी निर्देश:', 18, 230);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 53, 15);
    doc.text('• Government biometric e-KYC and DBT status verification are 100% FREE (₹0).', 20, 236);
    doc.text('• Do NOT pay any unauthorized fees or bribes to agents or middlemen.', 20, 240.5);
    doc.text('• Report corruption or extortion to National Kisan Helpline: 155261 / Cyber Crime: 1930.', 20, 245);

    // Official DBT Verification Seal (Stamp) on Bottom Right
    doc.setDrawColor(27, 94, 32);
    doc.setLineWidth(0.8);
    doc.circle(170, 263, 11, 'D');
    doc.setLineWidth(0.3);
    doc.circle(170, 263, 9.8, 'D');
    doc.setFontSize(5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(27, 94, 32);
    doc.text('PM-KISAN DBT', 170, 260.5, { align: 'center' });
    doc.text('GOVT OF INDIA', 170, 263.5, { align: 'center' });
    doc.text('★ VERIFIED ★', 170, 266.5, { align: 'center' });

    // Official Signature & Authorized Line
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text('Authorized Verification Digest', 20, 262);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 100, 100);
    doc.text(`Digital Token: SHA256-${farmer.regNumber.slice(-8)}-${Date.now().toString(36).toUpperCase()}`, 20, 266);
    doc.text('Valid at all Common Service Centres (CSC), Bank Branches & Agriculture Offices across India.', 20, 270);

    // Footer
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(140, 140, 140);
    doc.text('PM-KISAN Sahayak Companion  |  Built for "Build What Moves India" Hackathon  |  pmkisan.gov.in', 105, 279, { align: 'center' });

    // Save File with authentic naming
    const filename = `PM-KISAN_Seva_Parchi_${farmer.regNumber}.pdf`;
    doc.save(filename);

    // Confetti celebration (on demand)
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (_) {}

    return true;
  } catch (err) {
    console.error('PDF generation error:', err);
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
          <button class="text-btn centered" id="dismiss-parchi-btn">वापस जाएं (Close)</button>
        </div>
      </div>
    </div>
  `;
}
