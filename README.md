# PM-KISAN Sahayak (पीएम-किसान सहायक) 🌾

> **An AI-powered public-service companion that helps 11+ crore Indian farmers understand payment statuses, diagnose failure reasons, and resolve DBT/eKYC/land-seeding issues with step-by-step guidance.**

Built as a submission prototype for the **OpenAI Builder Hackathon (August 2026)**.

---

## 🌟 The Problem
Over 11 crore small and marginal farmers across India rely on the **Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)** scheme for ₹6,000/year (3 installments of ₹2,000). However, millions encounter payment rejections due to:
- Expired annual **eKYC** authentication
- Discrepancies between **Aadhaar and bank account names**
- Incomplete **land record seeding** with revenue records
- Opaque PFMS rejection codes on the standard portal with zero actionable guidance

Farmers with limited digital literacy often travel long distances to CSCs, banks, or revenue offices without knowing what documents to carry or what specific problem they face.

---

## 💡 What PM-KISAN Sahayak Changes
1. **Simplified Citizen Journey**: Enter registered mobile or reg. number → instant transparent timeline of all 23 installment cycles.
2. **Automated Root-Cause Diagnosis**: Clearly explains in plain language *why* an installment stopped (e.g. eKYC expired, bank name mismatch, land seeding).
3. **Multilingual Regional Support**: Supports **9 Indian languages** (Hindi हिंदी, Punjabi ਪੰਜਾਬੀ, Marathi मराठी, Bengali বাংলা, Telugu తెలుగు, Tamil தமிழ், Kannada ಕನ್ನಡ, Gujarati ગુજરાતી, and English).
4. **🎙️ Voice Speech-to-Text & 🔊 Audio Readout ("बोलकर सुनाएं")**: Farmers can tap the microphone to speak questions and listen to audio explanations in their regional language.
5. **📄 Printable CSC "Seva Parchi" (Action Slip)**: Generates a clear receipt listing the exact issue, action required by the CSC/Patwari operator, required documents, and anti-corruption notice (free service).
6. **Interactive Sahayak AI**: Conversational assistant powered by modern LLMs to answer citizen queries in natural Hinglish or regional languages.
7. **Mobile-First & Low-Bandwidth Friendly**: Clean, lightweight UI optimized for budget smartphones and slow rural connections.

---

## 👥 Demo Test Accounts
Reviewers can test the complete citizen journey with these synthetic accounts:

| Mobile | Farmer Name | Scenario |
| :--- | :--- | :--- |
| `9876543210` | **Ramesh Kumar** | **eKYC Expired** (23rd installment failed) |
| `9876543211` | **Sunita Devi** | **Aadhaar-Bank Name Mismatch** (PFMS rejection) |
| `9876543212` | **Mohan Singh** | **All Clear** (All 23 installments received) |
| `9876543213` | **Lakshmi Bai** | **Land Seeding Pending** (Revenue records unlinked) |

> **Mock OTP for all accounts**: `1234`

---

## 🛠️ Tech Stack & Architecture
- **Frontend**: Vanilla HTML5, CSS3, ES Modules with Vite
- **AI Core**: Multi-turn conversational agent with domain system prompt & PM-KISAN guidelines
- **Design System**: Mobile-first responsive layout (Inter + Noto Sans Devanagari)
- **Compliance**: Synthetic test data only; no private/government APIs scraped or reverse-engineered

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/<your-username>/pm-kisan-sahayak.git
cd pm-kisan-sahayak

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🛡️ Disclaimer
*This project is an independent educational prototype developed for the hackathon. It is not affiliated with or endorsed by the Ministry of Agriculture & Farmers Welfare, Government of India, or any official entity. All citizen data presented in the demo is purely synthetic.*
