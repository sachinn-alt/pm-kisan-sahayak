// Tabler Icons SVG Generator (https://tabler.io/icons)
// 24x24 crisp SVG stroke icons

export function tablerIcon(name, size = 20, className = '', extraAttrs = '') {
  const iconPaths = {
    // Navigation & Actions
    arrowLeft: '<path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" />',
    arrowRight: '<path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" />',
    chevronRight: '<path d="M9 6l6 6l-6 6" />',
    chevronDown: '<path d="M6 9l6 6l6 -6" />',
    send: '<path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />',
    logout: '<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" />',
    close: '<path d="M18 6l-12 12" /><path d="M6 6l12 12" />',
    check: '<path d="M5 12l5 5l10 -10" />',

    // Voice & Audio
    mic: '<path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -6 0z" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M8 21l8 0" /><path d="M12 17l0 4" />',
    micOff: '<path d="M3 3l18 18" /><path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.874v-1" /><path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.154 -3.85" /><path d="M8 21l8 0" /><path d="M12 17l0 4" />',
    volume: '<path d="M15 8a5 5 0 0 1 0 8" /><path d="M17.7 5a9 9 0 0 1 0 14" /><path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />',
    volumeStop: '<path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" /><path d="M16 10l4 4m0 -4l-4 4" />',

    // Bot & AI
    robot: '<path d="M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /><path d="M12 2v2" /><path d="M9 12v9" /><path d="M15 12v9" /><path d="M5 16l4 -2" /><path d="M15 14l4 2" /><path d="M9 18h6" /><path d="M10 8v.01" /><path d="M14 8v.01" />',
    sparkles: '<path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />',

    // PM-KISAN / Agri / Finance
    sprout: '<path d="M12 21v-8" /><path d="M12 13a4 4 0 0 0 4 -4a4 4 0 0 0 -4 -4a4 4 0 0 0 -4 4a4 4 0 0 0 4 4z" /><path d="M12 13a4 4 0 0 1 4 4a4 4 0 0 1 -4 4a4 4 0 0 1 -4 -4a4 4 0 0 1 4 -4z" />',
    plant: '<path d="M7 15h10v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-4z" /><path d="M12 9a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" /><path d="M12 11a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" /><path d="M12 15v-10" />',
    tractor: '<path d="M7 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M19 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M10.5 17h6.5" /><path d="M7 11v-4h4l3 4h5v4" /><path d="M7 7l4 4" />',
    cash: '<path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />',
    coinRupee: '<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M15 8h-6h1a3 3 0 0 1 0 6h-1l3 3" /><path d="M9 11h6" />',
    bank: '<path d="M3 21l18 0" /><path d="M3 10l18 0" /><path d="M5 6l7 -3l7 3" /><path d="M4 10l0 11" /><path d="M20 10l0 11" /><path d="M8 14l0 3" /><path d="M12 14l0 3" /><path d="M16 14l0 3" />',

    // Status & Indicators
    clock: '<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 7l0 5l3 3" />',
    alertTriangle: '<path d="M12 9v4" /><path d="M12 17h.01" /><path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />',
    alertCircle: '<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 8l0 4" /><path d="M12 16l.01 0" />',
    circleCheck: '<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" />',
    circleX: '<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" />',

    // Features & Services
    search: '<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />',
    idBadge: '<path d="M5 3m0 3a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3 -3z" /><path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M10 6h4" /><path d="M9 18h6" />',
    phone: '<path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />',
    mapPin: '<path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />',
    map: '<path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" /><path d="M9 4v13" /><path d="M15 7v13" />',
    fileDescription: '<path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 17h6" /><path d="M9 13h6" />',
    printer: '<path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /><path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" />',
    deviceMobile: '<path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" /><path d="M11 4h2" /><path d="M12 17v.01" />',
    userCheck: '<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /><path d="M15 19l2 2l4 -4" />',
    faceId: '<path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /><path d="M9 10h.01" /><path d="M15 10h.01" /><path d="M9.5 15a3.5 3.5 0 0 0 5 0" />',
    shieldCheck: '<path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /><path d="M9 12l2 2l4 -4" />',
    userPlus: '<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" />',
    buildingBank: '<path d="M3 21l18 0" /><path d="M3 10l18 0" /><path d="M5 6l7 -3l7 3" /><path d="M4 10l0 11" /><path d="M20 10l0 11" /><path d="M8 14l0 3" /><path d="M12 14l0 3" /><path d="M16 14l0 3" />',
    usersGroup: '<path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a3 3 0 0 1 3 -3h2a3 3 0 0 1 3 3v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" />',
    chartBar: '<path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 20l14 0" />',
    brandWhatsapp: '<path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />',
    navigation: '<path d="M12 18.5l7.265 2.463l-4.765 -15.463l-2.5 0l-4.765 15.463z" /><path d="M12 4v11" />',
    buildingStore: '<path d="M3 21l18 0" /><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" /><path d="M5 21v-10.15" /><path d="M19 21v-10.15" /><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />',
    scale: '<path d="M7 20l10 0" /><path d="M6 6l6 -1l6 1" /><path d="M12 3l0 17" /><path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" /><path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" />',
    share: '<path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" />',
    award: '<path d="M12 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M10 7h4" /><path d="M10 18l-4 4v-7l3 -3" /><path d="M14 18l4 4v-7l-3 -3" />',
    help: '<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 17l.01 0" /><path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />',
    signal: '<path d="M6 18v.01" /><path d="M10 18v-4" /><path d="M14 18v-8" /><path d="M18 18v-12" />',
    battery: '<path d="M6 7h11a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2l0 0" /><path d="M21 11v2" /><path d="M8 10v4" /><path d="M11 10v4" /><path d="M14 10v4" />',
    // Camera & Upload
    camera: '<path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />',
    qrcode: '<path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M7 17l0 .01" /><path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M17 17l0 .01" /><path d="M14 14l3 0" /><path d="M20 14l0 .01" /><path d="M14 17l0 3" /><path d="M14 20l3 0" /><path d="M17 20l3 0" /><path d="M20 17l0 3" />',
    download: '<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" />',
    fileText: '<path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 9h1" /><path d="M9 13h6" /><path d="M9 17h6" />',
    scan: '<path d="M4 7v-1a2 2 0 0 1 2 -2h2" /><path d="M4 17v1a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v1" /><path d="M16 20h2a2 2 0 0 0 2 -2v-1" /><path d="M5 12l14 0" />',
    compass: '<path d="M8 16l2 -6l6 -2l-2 6l-6 2" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />'
  };

  const path = iconPaths[name] || iconPaths['alertCircle'];
  return `<svg xmlns="http://www.w3.org/2000/svg" class="tabler-icon tabler-icon-${name} ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extraAttrs}>${path}</svg>`;
}

// Official Government of India Lion Capital Emblem (Ashoka Sarnath Capital with Satyameva Jayate)
export function emblemOfIndia(height = 38, className = '') {
  return `<svg class="govt-emblem-svg ${className}" height="${height}" viewBox="0 0 320 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="State Emblem of India" role="img">
    <defs>
      <linearGradient id="emblemGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="25%" stop-color="#f59e0b"/>
        <stop offset="70%" stop-color="#d97706"/>
        <stop offset="100%" stop-color="#b45309"/>
      </linearGradient>
      <filter id="emblemGlow">
        <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="#000000" flood-opacity="0.35"/>
      </filter>
    </defs>
    <g fill="url(#emblemGoldGrad)" stroke="url(#emblemGoldGrad)" stroke-linecap="round" stroke-linejoin="round" filter="url(#emblemGlow)">
      <!-- Ears -->
      <path d="M135 48 C130 35 140 25 148 30 C152 34 150 44 145 48 Z"/>
      <path d="M185 48 C190 35 180 25 172 30 C168 34 170 44 175 48 Z"/>
      <!-- Head crown -->
      <path d="M145 32 C152 24 168 24 175 32 C182 40 182 52 178 60 C172 68 148 68 142 60 C138 52 138 40 145 32 Z"/>
      <!-- Center Face details -->
      <ellipse cx="160" cy="55" rx="14" ry="18" fill="#ffffff" stroke="url(#emblemGoldGrad)" stroke-width="1.5"/>
      <path d="M153 48 C153 46 156 44 158 46 C160 48 158 50 155 50 Z"/>
      <path d="M167 48 C167 46 164 44 162 46 C160 48 162 50 165 50 Z"/>
      <path d="M157 54 L163 54 L160 60 Z"/>
      <path d="M152 64 Q160 68 168 64" stroke="url(#emblemGoldGrad)" stroke-width="2.5" fill="none"/>
      
      <!-- Left Lion Head -->
      <path d="M102 78 C94 65 102 50 114 55 C122 59 122 72 116 80 Z"/>
      <ellipse cx="112" cy="90" rx="12" ry="15" fill="#ffffff" stroke="url(#emblemGoldGrad)" stroke-width="1.5" transform="rotate(-20 112 90)"/>
      <circle cx="108" cy="85" r="2.5"/>
      <path d="M105 92 Q112 96 116 90" stroke="url(#emblemGoldGrad)" stroke-width="2" fill="none"/>

      <!-- Right Lion Head -->
      <path d="M218 78 C226 65 218 50 206 55 C198 59 198 72 204 80 Z"/>
      <ellipse cx="208" cy="90" rx="12" ry="15" fill="#ffffff" stroke="url(#emblemGoldGrad)" stroke-width="1.5" transform="rotate(20 208 90)"/>
      <circle cx="212" cy="85" r="2.5"/>
      <path d="M215 92 Q208 96 204 90" stroke="url(#emblemGoldGrad)" stroke-width="2" fill="none"/>

      <!-- Center & Side Mane -->
      <path d="M136 70 C128 85 130 105 138 120 C144 110 148 95 142 80 Z"/>
      <path d="M184 70 C192 85 190 105 182 120 C176 110 172 95 178 80 Z"/>
      <path d="M148 76 C142 95 145 125 160 145 C175 125 178 95 172 76 Z"/>
      <path d="M152 90 Q160 110 168 90" stroke="#ffffff" stroke-width="2" fill="none"/>
      <path d="M146 110 Q160 135 174 110" stroke="#ffffff" stroke-width="2" fill="none"/>
      <path d="M142 130 Q160 160 178 130" stroke="#ffffff" stroke-width="2" fill="none"/>
      
      <!-- Left lion mane curls -->
      <path d="M82 105 C75 125 80 155 95 185 C108 165 110 135 98 112 Z"/>
      <path d="M96 125 C90 150 96 180 115 210 C124 185 122 155 110 130 Z"/>

      <!-- Right lion mane curls -->
      <path d="M238 105 C245 125 240 155 225 185 C212 165 210 135 222 112 Z"/>
      <path d="M224 125 C230 150 224 180 205 210 C196 185 198 155 210 130 Z"/>

      <!-- Center & Side Legs/Paws -->
      <path d="M138 180 L134 275 L148 285 L156 285 L152 180 Z"/>
      <path d="M182 180 L186 275 L172 285 L164 285 L168 180 Z"/>
      <path d="M98 215 L88 280 L106 288 L116 280 L112 215 Z"/>
      <path d="M222 215 L232 280 L214 288 L204 280 L208 215 Z"/>

      <!-- Beaded Rim Base -->
      <path d="M68 288 L252 288 L256 300 L64 300 Z"/>

      <!-- Drum Base Wall with Ashoka Chakra, Horse & Bull -->
      <rect x="58" y="300" width="204" height="68" fill="#ffffff" stroke="url(#emblemGoldGrad)" stroke-width="3"/>

      <!-- Ashoka Dharma Chakra (24 spokes) -->
      <circle cx="160" cy="334" r="28" fill="#ffffff" stroke="url(#emblemGoldGrad)" stroke-width="3.5"/>
      <circle cx="160" cy="334" r="5"/>
      <path d="M160 306 L160 362 M132 334 L188 334 M140 314 L180 354 M140 354 L180 314 M149 308 L171 360 M149 360 L171 308 M134 323 L186 345 M134 345 L186 323" stroke="url(#emblemGoldGrad)" stroke-width="1.8"/>

      <!-- Galloping Horse (Left) & Bull (Right) -->
      <path d="M85 320 C92 312 102 312 108 318 C115 325 125 330 130 338 C122 342 115 338 108 344 C100 350 94 360 86 358 C80 354 84 344 88 338 Z"/>
      <path d="M235 320 C228 312 218 312 212 318 C205 325 195 330 190 338 C198 342 205 338 212 344 C220 350 226 360 234 358 C240 354 236 344 232 338 Z"/>

      <!-- Lotus Pedestal Base -->
      <path d="M60 368 L260 368 L266 386 L54 386 Z"/>
      <rect x="74" y="386" width="172" height="12" rx="3"/>
      <rect x="88" y="398" width="144" height="8" rx="2"/>

      <!-- Motto: सत्यमेव जयते -->
      <text x="160" y="448" text-anchor="middle" font-family="'Noto Sans Devanagari', 'Mukta', serif" font-weight="900" font-size="34" fill="url(#emblemGoldGrad)" stroke="none" letter-spacing="3">सत्यमेव जयते</text>
    </g>
  </svg>`;
}

