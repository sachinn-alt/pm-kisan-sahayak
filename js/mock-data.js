const dates = ['24 Jun 2026','05 Apr 2026','11 Feb 2026','09 Dec 2025','18 Oct 2025','04 Aug 2025','11 Jun 2025','08 Apr 2025','03 Feb 2025','10 Dec 2024','09 Oct 2024','06 Aug 2024','14 Jun 2024','12 Apr 2024','08 Feb 2024','13 Dec 2023','10 Oct 2023','05 Aug 2023','13 Jun 2023','08 Apr 2023','03 Feb 2023','11 Dec 2022','08 Feb 2019'];

export function generateInstallments(received = 22, pending = 0, failed = []) {
  return Array.from({ length: 23 }, (_, index) => {
    const number = index + 1;
    const status = failed.includes(number) ? 'failed' : number > received + failed.length ? 'pending' : 'received';
    return { number, amount: 2000, status, date: dates[23 - number] || '15 Jun 2026', remark: status === 'received' ? 'Credited successfully' : status === 'failed' ? 'Action required' : 'Awaiting verification' };
  }).reverse();
}

const onlineEkyc = [
  'Open pmkisan.gov.in and select “eKYC” in Farmer Corner.',
  'Enter your Aadhaar number: XXXX-XXXX-7890.',
  'Enter the OTP sent to your Aadhaar-linked mobile.',
  'Check the consent box and submit the verification.',
  'Your eKYC status should update instantly.'
];

export const FARMERS = {
  '9876543210': {
    name: 'Ramesh Kumar', regNumber: '123456789012', state: 'Uttar Pradesh', district: 'Lucknow', village: 'Mohanlalganj', aadhaarLast4: '7890', issue: 'ekyc_expired',
    ekycStatus: 'expired', dbtStatus: 'linked', landStatus: 'verified',
    issueDetails: { title: 'eKYC Verification Expired', explain: 'Your annual eKYC identity verification expired on March 15, 2026. Until it is renewed, future installments are held for your protection.', failedInstallment: 23, resolutionOptions: [{ title: 'Online OTP-Based eKYC', icon: 'deviceMobile', time: '5 minutes', difficulty: 'Easy', steps: onlineEkyc }, { title: 'Visit Common Service Centre (CSC)', icon: 'buildingStore', time: '30 minutes', difficulty: 'Need to travel', steps: ['Find the nearest CSC through your village panchayat.', 'Carry your original Aadhaar card.', 'Ask for PM-KISAN biometric eKYC.', 'The operator will complete a fingerprint or iris scan.', 'Collect the acknowledgement. No fee should be charged.'] }], documents: ['Aadhaar card (original)', 'Mobile linked to Aadhaar for OTP'] },
    installments: generateInstallments(22, 0, [23])
  },
  '9876543211': {
    name: 'Sunita Devi', regNumber: '234567890123', state: 'Bihar', district: 'Patna', village: 'Danapur', aadhaarLast4: '2314', issue: 'aadhaar_bank_mismatch',
    ekycStatus: 'valid', dbtStatus: 'mismatch', landStatus: 'verified',
    nameDiff: { aadhaar: 'SUNITA DEVI', bank: 'SUNITA D', matchPct: '78%' },
    issueDetails: { title: 'Aadhaar-Bank Account Name Mismatch', explain: 'Your Aadhaar name (SUNITA DEVI) and bank passbook name (SUNITA D) do not match exactly. PFMS has paused DBT transfers.', failedInstallment: 23, resolutionOptions: [{ title: 'Update name at your bank', icon: 'buildingBank', time: '1–3 days', difficulty: 'Easy', steps: ['Take Aadhaar and passbook to your bank branch.', 'Ask for an account-name correction form.', 'Submit the form with your documents.', 'Confirm the updated name with the branch.', 'Check PM-KISAN status after a few days.'] }, { title: 'Update Aadhaar details', icon: 'idBadge', time: '30 minutes', difficulty: 'Need appointment', steps: ['Book an Aadhaar update appointment.', 'Carry proof of your correct name.', 'Request a demographic-name update.', 'Keep the acknowledgement slip.', 'Allow the update to reflect before retrying.'] }], documents: ['Aadhaar card', 'Bank passbook', 'Name-change proof, if applicable'] },
    installments: generateInstallments(20, 0, [21,22,23])
  },
  '9876543212': {
    name: 'Mohan Singh', regNumber: '345678901234', state: 'Rajasthan', district: 'Jaipur', village: 'Sanganer', aadhaarLast4: '6541', issue: null,
    ekycStatus: 'valid', dbtStatus: 'linked', landStatus: 'verified',
    installments: generateInstallments(23, 0, [])
  },
  '9876543213': {
    name: 'Lakshmi Bai', regNumber: '456789012345', state: 'Madhya Pradesh', district: 'Bhopal', village: 'Berasia', aadhaarLast4: '4432', issue: 'land_seeding_pending',
    ekycStatus: 'valid', dbtStatus: 'linked', landStatus: 'pending',
    issueDetails: { title: 'Land Records Not Linked (भूलेख अंकन)', explain: 'Your agricultural land records have not yet been seeded to your PM-KISAN account. State Revenue Department Patwari verification is pending.', failedInstallment: 22, resolutionOptions: [{ title: 'Visit Patwari or Tehsildar office', icon: 'fileDescription', time: '1–2 visits', difficulty: 'Need to travel', steps: ['Bring your land record and PM-KISAN registration receipt.', 'Ask to seed your land record to PM-KISAN.', 'Verify your name and khasra details.', 'Keep the acknowledgement number.', 'Check your status after the office update.'] }], documents: ['Khatauni/Jamabandi land record', 'Aadhaar card', 'PM-KISAN registration receipt'] },
    installments: generateInstallments(21, 0, [22,23])
  }
};

export function farmerFor(value) {
  return FARMERS[value] || Object.values(FARMERS).find(f => f.regNumber === value) || null;
}
