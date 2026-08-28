import { FARMER_CORNER_SERVICES } from './farmer-corner-data.js';

export function farmerCornerView(lang = 'hi') {
  return `
    <section class="screen standard-screen farmer-corner-screen">
      <button class="back" data-route="dashboard">← Back to dashboard</button>

      <div class="page-heading">
        <div>🌾</div>
        <h1>किसान कॉर्नर (Farmers Corner)</h1>
        <p>PM-KISAN Complete Beneficial Citizen Services Hub</p>
      </div>

      <div class="services-list">
        ${FARMER_CORNER_SERVICES.map(s => `
          <div class="service-card" data-service-route="${s.route}">
            <div class="service-icon-wrap">${s.icon}</div>
            <div class="service-content">
              <div class="service-top">
                <h3>${s.title}</h3>
                <span class="service-badge">${s.badge}</span>
              </div>
              <p>${s.desc}</p>
            </div>
            <span class="arrow-icon">›</span>
          </div>
        `).join('')}
      </div>

      <div class="scam-box" style="margin-top: 24px;">
        <h2>ℹ️ सभी सेवाएं पूर्णतः सुरक्षित हैं</h2>
        <p>किसान भाई इन सभी सेवाओं का लाभ अपने मोबाइल फोन या नजदीकी सीएससी (CSC) केंद्र से निःशुल्क ले सकते हैं।</p>
      </div>
    </section>
  `;
}
