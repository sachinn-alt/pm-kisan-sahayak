// State & District-wise PM-KISAN Disbursement & Beneficiary synthetic dataset
export const STATE_DISBURSEMENT_DATA = {
  UP: {
    name: 'Uttar Pradesh',
    hindi: 'उत्तर प्रदेश',
    beneficiaries: '2.62 Crore',
    amountDisbursed: '₹68,450 Cr',
    ekycPercentage: '96.8%',
    districts: [
      { name: 'Lucknow', farmers: '2.14 Lakh', amount: '₹556 Cr', ekyc: '97.2%' },
      { name: 'Varanasi', farmers: '1.85 Lakh', amount: '₹480 Cr', ekyc: '96.5%' },
      { name: 'Gorakhpur', farmers: '3.40 Lakh', amount: '₹884 Cr', ekyc: '98.1%' },
      { name: 'Prayagraj', farmers: '4.10 Lakh', amount: '₹1,066 Cr', ekyc: '95.9%' }
    ]
  },
  MH: {
    name: 'Maharashtra',
    hindi: 'महाराष्ट्र',
    beneficiaries: '1.14 Crore',
    amountDisbursed: '₹31,820 Cr',
    ekycPercentage: '97.4%',
    districts: [
      { name: 'Pune', farmers: '4.80 Lakh', amount: '₹1,248 Cr', ekyc: '98.0%' },
      { name: 'Nashik', farmers: '5.20 Lakh', amount: '₹1,352 Cr', ekyc: '97.6%' },
      { name: 'Nagpur', farmers: '2.90 Lakh', amount: '₹754 Cr', ekyc: '96.9%' },
      { name: 'Solapur', farmers: '3.75 Lakh', amount: '₹975 Cr', ekyc: '97.1%' }
    ]
  },
  MP: {
    name: 'Madhya Pradesh',
    hindi: 'मध्य प्रदेश',
    beneficiaries: '88.5 Lakh',
    amountDisbursed: '₹24,110 Cr',
    ekycPercentage: '95.6%',
    districts: [
      { name: 'Bhopal', farmers: '1.20 Lakh', amount: '₹312 Cr', ekyc: '96.2%' },
      { name: 'Indore', farmers: '1.95 Lakh', amount: '₹507 Cr', ekyc: '97.0%' },
      { name: 'Ujjain', farmers: '2.60 Lakh', amount: '₹676 Cr', ekyc: '95.4%' }
    ]
  },
  BR: {
    name: 'Bihar',
    hindi: 'बिहार',
    beneficiaries: '82.3 Lakh',
    amountDisbursed: '₹21,400 Cr',
    ekycPercentage: '93.8%',
    districts: [
      { name: 'Patna', farmers: '2.10 Lakh', amount: '₹546 Cr', ekyc: '94.5%' },
      { name: 'Muzaffarpur', farmers: '3.15 Lakh', amount: '₹819 Cr', ekyc: '93.2%' },
      { name: 'Gaya', farmers: '2.70 Lakh', amount: '₹702 Cr', ekyc: '94.0%' }
    ]
  },
  PB: {
    name: 'Punjab',
    hindi: 'पंजाब',
    beneficiaries: '17.8 Lakh',
    amountDisbursed: '₹5,120 Cr',
    ekycPercentage: '98.9%',
    districts: [
      { name: 'Ludhiana', farmers: '1.45 Lakh', amount: '₹377 Cr', ekyc: '99.1%' },
      { name: 'Amritsar', farmers: '1.30 Lakh', amount: '₹338 Cr', ekyc: '98.8%' },
      { name: 'Bathinda', farmers: '1.15 Lakh', amount: '₹299 Cr', ekyc: '98.7%' }
    ]
  },
  RJ: {
    name: 'Rajasthan',
    hindi: 'राजस्थान',
    beneficiaries: '74.2 Lakh',
    amountDisbursed: '₹19,850 Cr',
    ekycPercentage: '96.1%',
    districts: [
      { name: 'Jaipur', farmers: '2.80 Lakh', amount: '₹728 Cr', ekyc: '96.8%' },
      { name: 'Jodhpur', farmers: '2.40 Lakh', amount: '₹624 Cr', ekyc: '95.7%' },
      { name: 'Alwar', farmers: '3.10 Lakh', amount: '₹806 Cr', ekyc: '96.3%' }
    ]
  }
};

// All beneficial services in Farmer Corner
export const FARMER_CORNER_SERVICES = [
  {
    id: 'ekyc',
    icon: '🪪',
    title: 'e-KYC (आधार प्रमाणीकरण)',
    desc: 'Mandatory annual Aadhaar-based OTP or Biometric verification',
    badge: 'Mandatory',
    route: 'diagnosis'
  },
  {
    id: 'status',
    icon: '📋',
    title: 'Know Your Status (स्थिति जानें)',
    desc: 'Check installment credit status, UTR numbers & PFMS feedback',
    badge: 'Live',
    route: 'dashboard'
  },
  {
    id: 'new_reg',
    icon: '📝',
    title: 'New Farmer Registration (नया पंजीकरण)',
    desc: 'Apply for PM-KISAN ₹6,000 annual assistance with land papers',
    badge: 'Self-Service',
    route: 'chat'
  },
  {
    id: 'village_list',
    icon: '🏘️',
    title: 'Village Beneficiary List (ग्राम सूची)',
    desc: 'View approved beneficiaries in your Gram Panchayat & Village',
    badge: 'Transparent',
    route: 'map'
  },
  {
    id: 'name_correction',
    icon: '✏️',
    title: 'Name Correction as per Aadhaar (नाम सुधार)',
    desc: 'Fix spelling mismatches between Aadhaar and bank passbook',
    badge: 'Essential',
    route: 'diagnosis'
  },
  {
    id: 'bank_seeding',
    icon: '🏦',
    title: 'Aadhaar-Bank NPCI Seeding (डीबीटी स्थिति)',
    desc: 'Verify if your bank account is linked for Direct Benefit Transfer',
    badge: 'DBT Enabled',
    route: 'diagnosis'
  },
  {
    id: 'surrender',
    icon: '🤝',
    title: 'Voluntary Surrender (स्वेच्छा से छोड़ें)',
    desc: 'Option to voluntarily give up benefits for other needy farmers',
    badge: 'Citizen Choice',
    route: 'chat'
  },
  {
    id: 'face_auth',
    icon: '📱',
    title: 'PM-KISAN Face Auth App (चेहरा प्रमाणीकरण)',
    desc: 'Complete eKYC by scanning your face via mobile camera without OTP',
    badge: 'Smart AI',
    route: 'chat'
  }
];
