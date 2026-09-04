import { tablerIcon } from './icons.js';
import { CSC_SERVICES_META, findCscCenters } from './csc-locator-data.js';

export function cscLocatorView(farmer, searchQuery = '', activeServiceFilter = '', lang = 'hi') {
  const district = farmer ? farmer.district : '';
  const centers = findCscCenters({ query: searchQuery, district, service: activeServiceFilter });

  return `
    <section class="screen standard-screen csc-locator-screen">
      <div class="top-nav-bar">
        <button class="back" data-route="dashboard">
          ${tablerIcon('arrowLeft', 16)} <span>${lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}</span>
        </button>
        <div class="nav-badges">
          <span class="govt-mini-pill">${tablerIcon('buildingStore', 14)} CSC Locator</span>
        </div>
      </div>

      <div class="page-heading">
        <div class="heading-icon agri-icon">${tablerIcon('mapPin', 40)}</div>
        <h1>${lang === 'hi' ? 'नजदीकी सीएससी केंद्र खोजें' : 'Locate Nearby CSC Centers'}</h1>
        <p>${farmer ? `${farmer.village}, ${farmer.district} के आसपास अधिकृत जन सेवा केंद्र` : 'Find authorized Common Service Centers (CSC & Jan Seva Kendra)'}</p>
      </div>

      <!-- Anti-Corruption Zero Fee Alert -->
      <div class="zero-fee-banner">
        <span class="shield-badge">${tablerIcon('shieldCheck', 20)}</span>
        <div>
          <strong>${lang === 'hi' ? '⚠️ आधिकारिक सरकारी सूचना: यह सेवा निःशुल्क है' : 'Official Notice: Free Public Service'}</strong>
          <p>${lang === 'hi' ? 'PM-KISAN बायोमेट्रिक e-KYC और आधार सीडिंग पूर्णतः निःशुल्क (₹0) है। कोई भी ऑपरेटर अवैध शुल्क नहीं ले सकता।' : 'Biometric e-KYC and Aadhaar seeding are 100% free government services.'}</p>
        </div>
      </div>

      <!-- Search & Filter Controls -->
      <div class="csc-search-bar">
        <div class="search-input-wrap">
          <i>${tablerIcon('search', 18)}</i>
          <input id="csc-search-input" type="text" placeholder="${lang === 'hi' ? 'पिनकोड, गांव या केंद्र का नाम खोजें...' : 'Search by Pincode, Village or Center...'}" value="${searchQuery}" />
          ${searchQuery ? `<button id="clear-csc-search" class="clear-btn">${tablerIcon('close', 14)}</button>` : ''}
        </div>
        <button id="gps-location-btn" class="gps-btn" title="Use My Current Location">
          ${tablerIcon('navigation', 16)} <span>${lang === 'hi' ? 'निकटतम' : 'Near Me'}</span>
        </button>
      </div>

      <!-- Service Filter Chips -->
      <div class="csc-filter-chips">
        <button class="filter-chip ${activeServiceFilter === '' ? 'active' : ''}" data-service-filter="">
          ${lang === 'hi' ? 'सभी केंद्र' : 'All Centers'}
        </button>
        <button class="filter-chip ${activeServiceFilter === 'biometric_ekyc' ? 'active' : ''}" data-service-filter="biometric_ekyc">
          ${tablerIcon('faceId', 14)} eKYC
        </button>
        <button class="filter-chip ${activeServiceFilter === 'dbt_seeding' ? 'active' : ''}" data-service-filter="dbt_seeding">
          ${tablerIcon('buildingBank', 14)} DBT Seeding
        </button>
        <button class="filter-chip ${activeServiceFilter === 'land_mutation' ? 'active' : ''}" data-service-filter="land_mutation">
          ${tablerIcon('plant', 14)} Land Seeding
        </button>
      </div>

      <!-- Center Listing -->
      <div class="csc-results-header">
        <span>${centers.length} ${lang === 'hi' ? 'अधिकृत केंद्र उपलब्ध' : 'Authorized Centers Found'}</span>
        <small>${farmer ? `Dist: ${farmer.district}` : 'All Districts'}</small>
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
          <span>${lang === 'hi' ? 'व्हाट्सएप पर सहायता लें' : 'WhatsApp Sahayak Bot'}</span>
        </button>
        <button class="action-btn-primary" data-route="diagnosis">
          <i>${tablerIcon('search', 18)}</i>
          <span>${lang === 'hi' ? 'समस्या निदान देखें' : 'View Problem Diagnosis'}</span>
        </button>
      </div>
    </section>
  `;
}

function renderCscCard(center, lang = 'hi') {
  return `
    <article class="csc-card">
      <div class="csc-card-header">
        <div>
          <div class="csc-title-row">
            <h3>${center.name}</h3>
            <span class="distance-pill">${center.distanceKm} km</span>
          </div>
          <span class="vle-name">VLE: <b>${center.vleName}</b> • ⭐ ${center.rating}</span>
        </div>
      </div>

      <p class="csc-address">${tablerIcon('mapPin', 14)} ${center.address}</p>
      
      <div class="csc-meta-info">
        <span class="csc-timing">${tablerIcon('clock', 12)} ${center.timing}</span>
        <span class="csc-pincode">PIN: ${center.pincode}</span>
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
        <a href="https://maps.google.com/?q=${encodeURIComponent(center.name + ' ' + center.address)}" target="_blank" rel="noopener" class="csc-btn dir-btn">
          ${tablerIcon('navigation', 15)} <span>${lang === 'hi' ? 'रास्ता देखें' : 'Map'}</span>
        </a>
      </div>
    </article>
  `;
}
