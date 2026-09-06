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

// Official Government of India Lion Capital Emblem (Ashoka Sarnath Capital)
export function emblemOfIndia(height = 36, className = '') {
  return `<svg class="govt-emblem-svg ${className}" height="${height}" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="State Emblem of India" role="img">
    <defs>
      <linearGradient id="emblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#8a6714"/>
        <stop offset="50%" stop-color="#b8860b"/>
        <stop offset="100%" stop-color="#6e500b"/>
      </linearGradient>
    </defs>
    <!-- Central Main Lion Head -->
    <path d="M60 14 C52 14 46 20 46 28 C46 36 50 42 54 45 C50 48 48 54 50 62 C52 69 57 73 60 74 C63 73 68 69 70 62 C72 54 70 48 66 45 C70 42 74 36 74 28 C74 20 68 14 60 14 Z" fill="url(#emblemGold)"/>
    <!-- Left Lion Head -->
    <path d="M38 24 C32 24 26 28 26 35 C26 42 30 46 34 49 C30 52 28 57 30 64 C32 70 38 73 44 74 C42 66 42 58 44 50 C40 46 38 41 38 35 C38 30 40 26 42 24 Z" fill="url(#emblemGold)"/>
    <!-- Right Lion Head -->
    <path d="M82 24 C88 24 94 28 94 35 C94 42 90 46 86 49 C90 52 92 57 90 64 C88 70 82 73 76 74 C78 66 78 58 76 50 C80 46 82 41 82 35 C82 30 80 26 78 24 Z" fill="url(#emblemGold)"/>
    <!-- Mane details & facial features -->
    <circle cx="56" cy="30" r="2" fill="#fff"/>
    <circle cx="64" cy="30" r="2" fill="#fff"/>
    <path d="M57 36 L63 36 L60 40 Z" fill="#fff"/>
    <path d="M55 42 Q60 45 65 42" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Lion Paws & Torso Support -->
    <path d="M42 74 L78 74 L80 90 L40 90 Z" fill="url(#emblemGold)"/>
    <!-- Abacus Platform Base -->
    <rect x="20" y="92" width="80" height="8" rx="2" fill="url(#emblemGold)"/>
    <!-- Ashoka Chakra (Wheel of Dharma) with 24 spokes -->
    <circle cx="60" cy="112" r="14" stroke="url(#emblemGold)" stroke-width="2.5" fill="#fdfbf7"/>
    <circle cx="60" cy="112" r="3" fill="url(#emblemGold)"/>
    <!-- Chakra Spokes -->
    <path d="M60 98 L60 126 M46 112 L74 112 M50 102 L70 122 M50 122 L70 102 M54 99 L66 125 M54 125 L66 99 M47 106 L73 118 M47 118 L73 106" stroke="url(#emblemGold)" stroke-width="1.2"/>
    <!-- Flanking Figures: Bull on right, Horse on left -->
    <path d="M28 106 C25 106 23 110 25 115 C27 119 32 119 35 116 C37 113 36 109 33 107 Z" fill="url(#emblemGold)"/>
    <path d="M87 106 C84 106 83 110 85 115 C87 119 92 119 95 116 C97 113 96 109 93 107 Z" fill="url(#emblemGold)"/>
    <!-- Lower Base Foundation -->
    <rect x="15" y="128" width="90" height="6" rx="2" fill="url(#emblemGold)"/>
    <rect x="22" y="136" width="76" height="4" rx="1" fill="url(#emblemGold)"/>
    <!-- Motto: Satyameva Jayate (सत्यमेव जयते) in Devanagari -->
    <text x="60" y="152" text-anchor="middle" font-family="'Noto Sans Devanagari', serif" font-weight="700" font-size="9" fill="#1b5e20" letter-spacing="1">सत्यमेव जयते</text>
  </svg>`;
}
