import { tablerIcon, emblemOfIndia } from './icons.js';
import { CSC_SERVICES_META, findCscCenters } from './csc-locator-data.js';

export function cscLocatorView(farmer, searchQuery = '', activeServiceFilter = '', lang = 'hi', userLocation = null) {
  const district = farmer ? farmer.district : '';
  const userLat = userLocation ? userLocation.lat : null;
  const userLng = userLocation ? userLocation.lng : null;
  const centers = findCscCenters({ query: searchQuery, district: userLocation ? '' : district, service: activeServiceFilter, userLat, userLng });

  return `
    <section class="screen standard-screen csc-locator-screen">
      <div class="top-nav-bar">
        <button class="back" data-route="dashboard">
          ${tablerIcon('arrowLeft', 16)} <span>${lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}</span>
        </button>
        <div class="nav-badges">
          <span class="govt-mini-pill">${emblemOfIndia(16)} CSC Locator</span>
        </div>
      </div>

      <div class="page-heading">
        <div class="heading-icon agri-icon">${tablerIcon('mapPin', 40)}</div>
        <h1>${lang === 'hi' ? 'नजदीकी अधिकृत सीएससी केंद्र खोजें' : 'Locate Authorized CSC Centers'}</h1>
        <p>${userLocation ? `📍 आपके वर्तमान जीपीएस स्थान के अनुसार निकटतम केंद्र` : (farmer ? `${farmer.village}, ${farmer.district} के आसपास अधिकृत जन सेवा केंद्र` : 'Find authorized Common Service Centers (CSC & Jan Seva Kendra)')}</p>
      </div>

      <!-- Anti-Corruption Zero Fee Alert -->
      <div class="zero-fee-banner">
        <span class="shield-badge">${tablerIcon('shieldCheck', 22)}</span>
        <div>
          <strong>${lang === 'hi' ? 'आधिकारिक सरकारी सूचना: ई-केवाईसी पूर्णतः निःशुल्क है' : 'Official Notice: 100% Free Public Service'}</strong>
          <p>${lang === 'hi' ? 'PM-KISAN बायोमेट्रिक e-KYC और आधार सीडिंग पूर्णतः निःशुल्क (₹0) है। किसी ऑपरेटर को अवैध शुल्क न दें।' : 'Biometric e-KYC and Aadhaar seeding are 100% free government services (₹0 fee).'}</p>
        </div>
      </div>

      <!-- Search & Live GPS Controls -->
      <div class="csc-search-bar">
        <div class="search-input-wrap">
          <i>${tablerIcon('search', 18)}</i>
          <input id="csc-search-input" type="text" placeholder="${lang === 'hi' ? 'पिनकोड, गांव या केंद्र का नाम खोजें...' : 'Search by Pincode, Village or Center...'}" value="${searchQuery}" />
          ${searchQuery ? `<button id="clear-csc-search" class="clear-btn">${tablerIcon('close', 14)}</button>` : ''}
        </div>
        <button id="gps-location-btn" class="gps-btn ${userLocation ? 'gps-active' : ''}" title="Use My Current GPS Location">
          ${tablerIcon('navigation', 16)} <span>${userLocation ? (lang === 'hi' ? '📍 GPS सक्रिय' : '📍 GPS Active') : (lang === 'hi' ? 'लाइव GPS' : 'Live GPS')}</span>
        </button>
      </div>

      <!-- Service Filter Chips -->
      <div class="csc-filter-chips">
        <button class="filter-chip ${activeServiceFilter === '' ? 'active' : ''}" data-service-filter="">
          ${lang === 'hi' ? 'सभी केंद्र' : 'All Centers'}
        </button>
        <button class="filter-chip ${activeServiceFilter === 'biometric_ekyc' ? 'active' : ''}" data-service-filter="biometric_ekyc">
          ${tablerIcon('faceId', 14)} eKYC (बायोमेट्रिक)
        </button>
        <button class="filter-chip ${activeServiceFilter === 'dbt_seeding' ? 'active' : ''}" data-service-filter="dbt_seeding">
          ${tablerIcon('buildingBank', 14)} DBT Seeding
        </button>
        <button class="filter-chip ${activeServiceFilter === 'land_mutation' ? 'active' : ''}" data-service-filter="land_mutation">
          ${tablerIcon('plant', 14)} Land Seeding (भूलेख)
        </button>
      </div>

      <!-- Center Listing -->
      <div class="csc-results-header">
        <span>${centers.length} ${lang === 'hi' ? 'अधिकृत केंद्र उपलब्ध' : 'Authorized Centers Found'}</span>
        <small>${userLocation ? 'Sorted by nearest GPS distance' : (farmer ? `Dist: ${farmer.district}` : 'Pan-India')}</small>
      </div>

      <div class="csc-center-list">
        ${centers.length > 0 ? centers.map(center => renderCscCard(center, lang)).join('') : `
          <div class="empty-csc-state">
            <i>${tablerIcon('buildingStore', 36)}</i>
            <h3>${lang === 'hi' ? 'कोई केंद्र नहीं मिला' : 'No CSC Centers Found'}</h3>
            <p>${lang === 'hi' ? 'कृपया पिनकोड या गांव का नाम बदलकर पुनः प्रयास करें।' : 'Please check your search keyword or try searching by district name.'}</p>
          </div>
        `}
      </div>

      <!-- Bottom Quick Actions -->
      <div class="csc-bottom-actions">
        <button class="action-btn-secondary" data-route="whatsapp">
          <i>${tablerIcon('brandWhatsapp', 18)}</i>
          <span>${lang === 'hi' ? 'व्हाट्सएप पर पर्ची मंगवाएं' : 'WhatsApp Sahayak Bot'}</span>
        </button>
        <button class="action-btn-primary" data-route="diagnosis">
          <i>${tablerIcon('fileText', 18)}</i>
          <span>${lang === 'hi' ? 'समस्या निदान व पर्ची' : 'Diagnosis & Action Slip'}</span>
        </button>
      </div>
    </section>
  `;
}

function renderCscCard(center, lang = 'hi') {
  const gmapsUrl = center.lat && center.lng 
    ? `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`
    : `https://maps.google.com/?q=${encodeURIComponent(center.name + ' ' + center.address)}`;

  return `
    <article class="csc-card">
      <div class="csc-card-header">
        <div>
          <div class="csc-title-row">
            <h3>${center.name}</h3>
            <span class="distance-pill">${tablerIcon('navigation', 12)} ${center.distanceKm} km</span>
          </div>
          <span class="vle-name">VLE: <b>${center.vleName}</b> • ${tablerIcon('award', 12)} ${center.rating}</span>
        </div>
      </div>

      <p class="csc-address">${tablerIcon('mapPin', 14)} ${center.address}</p>
      
      <div class="csc-meta-info">
        <span class="csc-timing">${tablerIcon('clock', 12)} ${center.timing}</span>
        <span class="csc-pincode">PIN: <b>${center.pincode}</b></span>
      </div>

      <div class="csc-services-tags">
        ${center.services.map(s => {
          const meta = CSC_SERVICES_META[s] || { badge: s };
          return `<span class="service-tag">${meta.badge}</span>`;
        }).join('')}
      </div>

      <div class="csc-action-buttons">
        <a href="tel:${center.phone}" class="csc-btn call-btn">
          ${tablerIcon('phone', 15)} <span>${lang === 'hi' ? 'कॉल करें' : 'Call'}</span>
        </a>
        <a href="https://wa.me/${center.whatsapp}?text=${encodeURIComponent('नमस्ते VLE जी, मुझे पीएम-किसान समाधान के लिए सहायता चाहिए।')}" target="_blank" rel="noopener" class="csc-btn wa-btn">
          ${tablerIcon('brandWhatsapp', 15)} <span>WhatsApp</span>
        </a>
        <a href="${gmapsUrl}" target="_blank" rel="noopener" class="csc-btn dir-btn">
          ${tablerIcon('navigation', 15)} <span>${lang === 'hi' ? 'रास्ता (Google Maps)' : 'Navigate'}</span>
        </a>
      </div>
    </article>
  `;
}
