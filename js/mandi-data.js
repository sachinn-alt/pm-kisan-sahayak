import { tablerIcon } from './icons.js';

export const MANDI_MARKETS = {
  'Uttar Pradesh': {
    mandiName: 'नवीन गल्ला मंडी, सीतापुर रोड (Lucknow APMC)',
    distance: '6.4 km',
    updatedAt: 'Today, 08:30 AM',
    crops: [
      { nameHi: 'गेहूं (Wheat)', nameEn: 'Wheat', price: 2340, unit: '₹/क्विंटल', change: +45, trend: 'up', msp: 2275, isMspPlus: true },
      { nameHi: 'धान (Paddy Basmati)', nameEn: 'Paddy', price: 2850, unit: '₹/क्विंटल', change: +60, trend: 'up', msp: 2300, isMspPlus: true },
      { nameHi: 'सरसों (Mustard)', nameEn: 'Mustard', price: 5720, unit: '₹/क्विंटल', change: -30, trend: 'down', msp: 5650, isMspPlus: true },
      { nameHi: 'आलू (Potato Jyoti)', nameEn: 'Potato', price: 1420, unit: '₹/क्विंटल', change: 0, trend: 'steady', msp: null },
      { nameHi: 'चना (Gram/Chana)', nameEn: 'Gram', price: 5680, unit: '₹/क्विंटल', change: +90, trend: 'up', msp: 5440, isMspPlus: true },
      { nameHi: 'टमाटर (Tomato)', nameEn: 'Tomato', price: 2100, unit: '₹/क्विंटल', change: -120, trend: 'down', msp: null }
    ]
  },
  'Bihar': {
    mandiName: 'कृषि उत्पादन बाजार समिति, मीठापुर (Patna APMC)',
    distance: '4.8 km',
    updatedAt: 'Today, 08:15 AM',
    crops: [
      { nameHi: 'मक्का (Maize)', nameEn: 'Maize', price: 2240, unit: '₹/क्विंटल', change: +50, trend: 'up', msp: 2090, isMspPlus: true },
      { nameHi: 'धान (Paddy Common)', nameEn: 'Paddy', price: 2380, unit: '₹/क्विंटल', change: +35, trend: 'up', msp: 2300, isMspPlus: true },
      { nameHi: 'गेहूं (Wheat Lokwan)', nameEn: 'Wheat', price: 2310, unit: '₹/क्विंटल', change: +15, trend: 'up', msp: 2275, isMspPlus: true },
      { nameHi: 'मसूर (Lentil/Masoor)', nameEn: 'Masoor', price: 6450, unit: '₹/क्विंटल', change: +80, trend: 'up', msp: 6425, isMspPlus: true },
      { nameHi: 'प्याज (Onion Red)', nameEn: 'Onion', price: 2600, unit: '₹/क्विंटल', change: -80, trend: 'down', msp: null }
    ]
  },
  'Rajasthan': {
    mandiName: 'मुहाना कृषि उपज मंडी समिति (Jaipur APMC)',
    distance: '8.2 km',
    updatedAt: 'Today, 09:00 AM',
    crops: [
      { nameHi: 'सरसों (Mustard Black)', nameEn: 'Mustard', price: 5840, unit: '₹/क्विंटल', change: +110, trend: 'up', msp: 5650, isMspPlus: true },
      { nameHi: 'बाजरा (Pearl Millet)', nameEn: 'Bajra', price: 2420, unit: '₹/क्विंटल', change: +20, trend: 'up', msp: 2500, isMspPlus: false },
      { nameHi: 'चना (Desi Chana)', nameEn: 'Gram', price: 5790, unit: '₹/क्विंटल', change: +40, trend: 'up', msp: 5440, isMspPlus: true },
      { nameHi: 'ग्वार (Guar Seed)', nameEn: 'Guar', price: 5280, unit: '₹/क्विंटल', change: -45, trend: 'down', msp: null },
      { nameHi: 'गेहूं (Wheat Sharbati)', nameEn: 'Wheat', price: 2650, unit: '₹/क्विंटल', change: +30, trend: 'up', msp: 2275, isMspPlus: true }
    ]
  },
  'Madhya Pradesh': {
    mandiName: 'करोंद कृषि उपज मंडी, विदिशा रोड (Bhopal APMC)',
    distance: '5.5 km',
    updatedAt: 'Today, 08:45 AM',
    crops: [
      { nameHi: 'सोयाबीन (Soybean Yellow)', nameEn: 'Soybean', price: 4980, unit: '₹/क्विंटल', change: +75, trend: 'up', msp: 4892, isMspPlus: true },
      { nameHi: 'गेहूं (Sharbati Gold)', nameEn: 'Wheat', price: 2890, unit: '₹/क्विंटल', change: +40, trend: 'up', msp: 2275, isMspPlus: true },
      { nameHi: 'चना (Kabuli/Dollar Chana)', nameEn: 'Chana', price: 9200, unit: '₹/क्विंटल', change: +150, trend: 'up', msp: null },
      { nameHi: 'लहसुन (Garlic)', nameEn: 'Garlic', price: 14500, unit: '₹/क्विंटल', change: -300, trend: 'down', msp: null },
      { nameHi: 'उड़द (Black Matpe)', nameEn: 'Urad', price: 7350, unit: '₹/क्विंटल', change: +60, trend: 'up', msp: 6950, isMspPlus: true }
    ]
  },
  'Maharashtra': {
    mandiName: 'गुलटेकडी मार्केट यार्ड (Pune APMC)',
    distance: '7.1 km',
    updatedAt: 'Today, 08:30 AM',
    crops: [
      { nameHi: 'कपास (Cotton Long Staple)', nameEn: 'Cotton', price: 7420, unit: '₹/क्विंटल', change: +130, trend: 'up', msp: 7121, isMspPlus: true },
      { nameHi: 'सोयाबीन (Soybean)', nameEn: 'Soybean', price: 4950, unit: '₹/क्विंटल', change: +30, trend: 'up', msp: 4892, isMspPlus: true },
      { nameHi: 'प्याज (Lasalgaon Onion)', nameEn: 'Onion', price: 2450, unit: '₹/क्विंटल', change: -70, trend: 'down', msp: null },
      { nameHi: 'गन्ना (Sugarcane FRP)', nameEn: 'Sugarcane', price: 340, unit: '₹/क्विंटल', change: 0, trend: 'steady', msp: 340, isMspPlus: true }
    ]
  },
  'Punjab': {
    mandiName: 'मुख्य दाना मंडी (Ludhiana Grain APMC)',
    distance: '5.0 km',
    updatedAt: 'Today, 08:00 AM',
    crops: [
      { nameHi: 'गेहूं (Wheat HD-2967)', nameEn: 'Wheat', price: 2360, unit: '₹/क्विंटल', change: +25, trend: 'up', msp: 2275, isMspPlus: true },
      { nameHi: 'धान (Paddy PR-126)', nameEn: 'Paddy', price: 2320, unit: '₹/क्विंटल', change: +20, trend: 'up', msp: 2300, isMspPlus: true },
      { nameHi: 'सरसों (Mustard)', nameEn: 'Mustard', price: 5690, unit: '₹/क्विंटल', change: -20, trend: 'down', msp: 5650, isMspPlus: true },
      { nameHi: 'सूरजमुखी (Sunflower)', nameEn: 'Sunflower', price: 6850, unit: '₹/क्विंटल', change: +95, trend: 'up', msp: 6760, isMspPlus: true }
    ]
  }
};

export function getMandiData(stateName = 'Uttar Pradesh') {
  return MANDI_MARKETS[stateName] || MANDI_MARKETS['Uttar Pradesh'];
}

export function renderMandiTickerHtml(farmer, lang = 'hi') {
  const stateName = farmer?.state || 'Uttar Pradesh';
  const data = getMandiData(stateName);
  const crops = data.crops || [];

  const itemsHtml = crops.map(c => {
    const isUp = c.trend === 'up';
    const isDown = c.trend === 'down';
    const trendIcon = isUp ? tablerIcon('trendingUp', 13) : isDown ? tablerIcon('trendingDown', 13) : '⚖️';
    const trendClass = isUp ? 'trend-up' : isDown ? 'trend-down' : 'trend-steady';
    const changeSign = c.change > 0 ? `+₹${c.change}` : c.change < 0 ? `-₹${Math.abs(c.change)}` : 'स्थिर';

    return `
      <div class="mandi-item">
        <span class="crop-name">${lang === 'hi' ? c.nameHi : c.nameEn}</span>
        <strong class="crop-price">₹${c.price.toLocaleString('en-IN')}</strong>
        <span class="crop-trend ${trendClass}">
          ${trendIcon} ${changeSign}
        </span>
        ${c.isMspPlus ? `<span class="msp-badge">MSP+</span>` : ''}
      </div>
    `;
  }).join('');

  // Duplicate items for continuous seamless infinite loop
  return `
    <div class="mandi-ticker-bar" aria-label="Live Mandi Bhav">
      <div class="mandi-lead">
        <span class="live-dot"></span>
        <span class="mandi-label">${lang === 'hi' ? 'मंडी भाव' : 'Mandi Rates'}</span>
        <small class="mandi-location" title="${data.mandiName}">${farmer?.district || 'Lucknow'}</small>
      </div>
      <div class="mandi-marquee-track">
        <div class="mandi-marquee-content">
          ${itemsHtml}
        </div>
        <div class="mandi-marquee-content" aria-hidden="true">
          ${itemsHtml}
        </div>
      </div>
    </div>
  `;
}

export function renderMandiTicker(stateOrFarmer = 'Uttar Pradesh', lang = 'hi') {
  const farmer = typeof stateOrFarmer === 'object' ? stateOrFarmer : { state: stateOrFarmer, district: stateOrFarmer };
  return renderMandiTickerHtml(farmer, lang);
}

// Interactive Agmarknet / data.gov.in Mandi & MSP Profit Maximizer Modal
export function renderMandiCalculatorModal(farmer, lang = 'hi', selectedCropIndex = 0, quantity = 50) {
  const stateName = farmer?.state || 'Uttar Pradesh';
  const data = getMandiData(stateName);
  const crops = data.crops || [];
  const activeCrop = crops[selectedCropIndex % crops.length] || crops[0];

  const mandiTotal = activeCrop.price * quantity;
  const mspRate = activeCrop.msp || activeCrop.price;
  const mspTotal = mspRate * quantity;
  const profitDiff = mandiTotal - mspTotal;
  const isAboveMsp = profitDiff >= 0;

  return `
    <div id="mandi-modal-overlay" class="modal-overlay">
      <div class="mandi-modal-card">
        <div class="mandi-modal-header">
          <div class="header-title-flex">
            <span class="mandi-header-icon">${tablerIcon('buildingWarehouse', 22)}</span>
            <div>
              <span class="govt-badge dark">AGMARKNET · DATA.GOV.IN LIVE</span>
              <h2>${lang === 'hi' ? 'कृषि मंडी भाव व MSP लाभ कैलकुलेटर' : 'Live Mandi & MSP Profit Maximizer'}</h2>
            </div>
          </div>
          <button class="icon-btn" id="close-mandi-modal-btn" aria-label="Close">
            ${tablerIcon('close', 20)}
          </button>
        </div>

        <div class="mandi-modal-body">
          <div class="mandi-yard-banner">
            <div class="yard-info">
              <strong>${data.mandiName}</strong>
              <small>${tablerIcon('mapPin', 12)} ${data.distance} दूर • ${data.updatedAt}</small>
            </div>
            <span class="live-pill"><span class="radar-ping"></span> Live APMC</span>
          </div>

          <!-- Crop Selection Grid -->
          <label class="mandi-field-label">${lang === 'hi' ? 'फसल चुनें (Select Crop):' : 'Select Crop:'}</label>
          <div class="mandi-crops-chips">
            ${crops.map((c, i) => `
              <button class="crop-select-chip ${i === selectedCropIndex ? 'active' : ''}" data-crop-index="${i}">
                <span>${lang === 'hi' ? c.nameHi.split(' ')[0] : c.nameEn}</span>
                <small>₹${c.price}/q</small>
              </button>
            `).join('')}
          </div>

          <!-- Quantity Input -->
          <div class="mandi-qty-row">
            <div>
              <label class="mandi-field-label">${lang === 'hi' ? 'उपज मात्रा (Harvest Quantity in Quintals):' : 'Harvest Quantity (Quintals):'}</label>
              <div class="qty-stepper-box">
                <button class="qty-btn" id="btn-qty-minus">-5</button>
                <input type="number" id="mandi-qty-input" value="${quantity}" min="1" max="1000" />
                <span class="unit-tag">क्विंटल (Qtl)</span>
                <button class="qty-btn" id="btn-qty-plus">+5</button>
              </div>
            </div>
          </div>

          <!-- Comparison Result Card -->
          <div class="mandi-calc-card">
            <div class="calc-row">
              <span class="calc-label">वर्तमान मंडी भाव (Local APMC Rate):</span>
              <strong class="calc-val apmc">₹${activeCrop.price.toLocaleString('en-IN')} / क्विंटल</strong>
            </div>

            <div class="calc-row">
              <span class="calc-label">सरकारी न्यूनतम समर्थन मूल्य (Govt MSP):</span>
              <strong class="calc-val msp">${activeCrop.msp ? `₹${activeCrop.msp.toLocaleString('en-IN')} / क्विंटल` : 'बाजार मूल्य'}</strong>
            </div>

            <div class="calc-divider"></div>

            <div class="calc-total-box">
              <div class="total-col">
                <small>${quantity} क्विंटल कुल अनुमानित मूल्य</small>
                <h3>₹${mandiTotal.toLocaleString('en-IN')}</h3>
              </div>
              <div class="profit-col ${isAboveMsp ? 'positive' : 'negative'}">
                <span class="profit-badge">
                  ${isAboveMsp ? tablerIcon('trendingUp', 14) : tablerIcon('alertTriangle', 14)}
                  ${isAboveMsp ? `MSP से +₹${Math.abs(profitDiff).toLocaleString('en-IN')} अधिक` : `MSP से -₹${Math.abs(profitDiff).toLocaleString('en-IN')} कम`}
                </span>
              </div>
            </div>
          </div>

          <!-- Official Government Recommendation Notice -->
          <div class="mandi-advisory-box">
            <span class="advisory-icon">${tablerIcon('shieldCheck', 18)}</span>
            <p>
              ${isAboveMsp
                ? `<strong>सरकारी सलाह:</strong> वर्तमान में <strong>${data.mandiName}</strong> में भाव सरकारी MSP (₹${activeCrop.msp || activeCrop.price}) से अधिक मिल रहा है। आप निकटतम APMC में सीधे बिक्री कर सकते हैं।`
                : `<strong>सरकारी सलाह:</strong> इस समय स्थानीय मंडी भाव MSP से कम है। कृपया कृषि विभाग के <strong>सरकारी क्रय केंद्र (Govt Procurement Centre)</strong> पर ₹${activeCrop.msp}/क्विंटल पर ही बेचें।`}
            </p>
          </div>
        </div>

        <div class="mandi-modal-footer">
          <button class="primary-btn" id="btn-close-mandi-done">
            ${tablerIcon('check', 16)} <span>${lang === 'hi' ? 'पूर्ण (Done)' : 'Done'}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}
