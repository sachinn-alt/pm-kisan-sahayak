// Comprehensive Mock CSC & Jan Seva Kendra Centers Database

export const CSC_CENTERS = [
  {
    id: 'csc-up-01',
    name: 'Jan Seva Kendra - Mohanlalganj',
    vleName: 'Satish Chandra Verma',
    phone: '9839123456',
    whatsapp: '919839123456',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    block: 'Mohanlalganj',
    village: 'Mohanlalganj',
    pincode: '226301',
    distanceKm: 0.8,
    address: 'Near Block Development Office, Main Road, Mohanlalganj, Lucknow',
    timing: '8:30 AM – 6:30 PM (Mon–Sat)',
    rating: 4.8,
    isGovtRecognized: true,
    services: ['biometric_ekyc', 'dbt_seeding', 'land_mutation', 'face_auth', 'parchi_print']
  },
  {
    id: 'csc-up-02',
    name: 'Apna CSC Gramin Seva Kendra - Gosainganj',
    vleName: 'Pooja Tiwari',
    phone: '9450234567',
    whatsapp: '919450234567',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    block: 'Gosainganj',
    village: 'Sultanpur Road',
    pincode: '226501',
    distanceKm: 3.4,
    address: 'Opposite Panchayat Bhawan, Gosainganj Bazar, Lucknow',
    timing: '9:00 AM – 7:00 PM (All Days)',
    rating: 4.9,
    isGovtRecognized: true,
    services: ['biometric_ekyc', 'dbt_seeding', 'face_auth', 'parchi_print']
  },
  {
    id: 'csc-br-01',
    name: 'Digital Seva Kendra - Danapur Cantt',
    vleName: 'Manoj Kumar Yadav',
    phone: '9934112233',
    whatsapp: '919934112233',
    state: 'Bihar',
    district: 'Patna',
    block: 'Danapur',
    village: 'Danapur',
    pincode: '801503',
    distanceKm: 1.2,
    address: 'Station Road, Near Danapur Post Office, Patna',
    timing: '8:00 AM – 7:00 PM (Mon–Sat)',
    rating: 4.7,
    isGovtRecognized: true,
    services: ['biometric_ekyc', 'dbt_seeding', 'land_mutation', 'parchi_print']
  },
  {
    id: 'csc-br-02',
    name: 'Kisan Suvidha CSC Kendra - Phulwari Sharif',
    vleName: 'Razi Ahmad',
    phone: '9835223344',
    whatsapp: '919835223344',
    state: 'Bihar',
    district: 'Patna',
    block: 'Phulwari Sharif',
    village: 'Walmi Chowk',
    pincode: '801505',
    distanceKm: 4.1,
    address: 'Near Krishi Vigyan Kendra, Walmi, Phulwari Sharif, Patna',
    timing: '9:00 AM – 6:00 PM (Mon–Sat)',
    rating: 4.6,
    isGovtRecognized: true,
    services: ['biometric_ekyc', 'dbt_seeding', 'land_mutation', 'face_auth', 'parchi_print']
  },
  {
    id: 'csc-rj-01',
    name: 'E-Mitra & CSC Center - Sanganer',
    vleName: 'Rajendra Sharma',
    phone: '9414334455',
    whatsapp: '919414334455',
    state: 'Rajasthan',
    district: 'Jaipur',
    block: 'Sanganer',
    village: 'Sanganer Town',
    pincode: '302029',
    distanceKm: 0.6,
    address: 'Near Tehsil Office & Gram Panchayat, Sanganer, Jaipur',
    timing: '9:00 AM – 8:00 PM (Mon–Sun)',
    rating: 4.9,
    isGovtRecognized: true,
    services: ['biometric_ekyc', 'dbt_seeding', 'land_mutation', 'face_auth', 'parchi_print']
  },
  {
    id: 'csc-mp-01',
    name: 'MPOnline & CSC Lok Seva Kendra - Berasia',
    vleName: 'Deepak Patidar',
    phone: '9893445566',
    whatsapp: '919893445566',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    block: 'Berasia',
    village: 'Berasia',
    pincode: '463106',
    distanceKm: 1.5,
    address: 'Bus Stand Road, Near Krishi Upaj Mandi, Berasia, Bhopal',
    timing: '8:30 AM – 7:00 PM (Mon–Sat)',
    rating: 4.8,
    isGovtRecognized: true,
    services: ['biometric_ekyc', 'dbt_seeding', 'land_mutation', 'face_auth', 'parchi_print']
  },
  {
    id: 'csc-mh-01',
    name: 'Aaple Sarkar Seva Kendra - Baramati',
    vleName: 'Nitin Jagtap',
    phone: '9822556677',
    whatsapp: '919822556677',
    state: 'Maharashtra',
    district: 'Pune',
    block: 'Baramati',
    village: 'Baramati Rural',
    pincode: '413102',
    distanceKm: 2.1,
    address: 'Opp. APMC Market Yard, Baramati, Dist. Pune',
    timing: '9:00 AM – 7:30 PM (Mon–Sat)',
    rating: 4.9,
    isGovtRecognized: true,
    services: ['biometric_ekyc', 'dbt_seeding', 'land_mutation', 'parchi_print']
  }
];

export const CSC_SERVICES_META = {
  biometric_ekyc: { label: 'Biometric eKYC (फिंगरप्रिंट)', badge: 'eKYC', fee: 'Free (₹0)' },
  dbt_seeding: { label: 'Bank NPCI / Aadhaar Seeding', badge: 'DBT Bank', fee: 'Free (₹0)' },
  land_mutation: { label: 'Land Record Seeding (भूलेख अंकन)', badge: 'Land (भूलेख)', fee: 'Free (₹0)' },
  face_auth: { label: 'Face Authentication (फेस ऑथ)', badge: 'Face Auth', fee: 'Free (₹0)' },
  parchi_print: { label: 'Seva Parchi Printing', badge: 'Parchi Print', fee: 'Max ₹5 for print' }
};

export function findCscCenters({ query = '', district = '', service = '' } = {}) {
  let list = [...CSC_CENTERS];
  
  if (district) {
    list = list.filter(c => c.district.toLowerCase() === district.toLowerCase() || c.state.toLowerCase() === district.toLowerCase());
  }

  if (service) {
    list = list.filter(c => c.services.includes(service));
  }

  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    list = list.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.vleName.toLowerCase().includes(q) ||
      c.village.toLowerCase().includes(q) ||
      c.district.toLowerCase().includes(q) ||
      c.pincode.includes(q) ||
      c.block.toLowerCase().includes(q)
    );
  }

  return list;
}
