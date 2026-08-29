import { escape } from './utils.js';
import { LANGUAGES, t } from './i18n.js';

// Localized question chips for each language
const LOCALIZED_CHIPS = {
  hi: [
    { label: '💸 पैसा क्यों नहीं आया?', query: 'मेरा 23वीं किस्त का पैसा क्यों नहीं आया?' },
    { label: '🪪 eKYC कैसे करें?', query: 'eKYC पूरा करने का तरीका बताएं' },
    { label: '🏦 बैंक लिंक कैसे करें?', query: 'बैंक खाते को आधार DBT से कैसे जोड़ें?' },
    { label: '📍 नजदीकी CSC केंद्र?', query: 'नजदीकी CSC सेवा केंद्र कहां है?' },
    { label: '📄 सेवा पर्ची क्या है?', query: 'CSC सेवा पर्ची का क्या उपयोग है?' },
    { label: '📞 हेल्पलाइन नंबर?', query: 'पीएम किसान हेल्पलाइन नंबर क्या है?' }
  ],
  en: [
    { label: '💸 Why payment failed?', query: 'Why did my 23rd installment fail?' },
    { label: '🪪 How to do eKYC?', query: 'How do I complete my eKYC online or offline?' },
    { label: '🏦 Link Bank to DBT', query: 'How to seed Aadhaar with bank for DBT?' },
    { label: '📍 Nearest CSC center?', query: 'Where is my nearest CSC digital seva kendra?' },
    { label: '📄 What is Seva Parchi?', query: 'How does the CSC Seva Parchi help me?' },
    { label: '📞 Helpline numbers', query: 'What are the official PM-KISAN helpline numbers?' }
  ],
  pa: [
    { label: '💸 ਕਿਸ਼ਤ ਕਿਉਂ ਨਹੀਂ ਆਈ?', query: 'ਮੇਰੀ 23ਵੀਂ ਕਿਸ਼ਤ ਕਿਉਂ ਨਹੀਂ ਆਈ?' },
    { label: '🪪 eKYC ਕਿਵੇਂ ਕਰੀਏ?', query: 'eKYC ਕਿਵੇਂ ਪੂਰੀ ਕਰੀਏ?' },
    { label: '🏦 ਬੈਂਕ ਖਾਤਾ ਲਿੰਕ', query: 'ਬੈਂਕ ਖਾਤੇ ਨਾਲ ਆਧਾਰ ਡੀਬੀਟੀ ਕਿਵੇਂ ਜੋੜੀਏ?' },
    { label: '📍 ਨੇੜਲਾ CSC ਸੈਂਟਰ', query: 'ਨੇੜੇ CSC ਸੇਵਾ ਕੇਂਦਰ ਕਿੱਥੇ ਹੈ?' }
  ],
  mr: [
    { label: '💸 पैसे का आले नाहीत?', query: 'माझा २३ वा हप्ता का जमा झाला नाही?' },
    { label: '🪪 eKYC कसे करावे?', query: 'eKYC पूर्ण करण्याची पद्धत सांगा' },
    { label: '🏦 बँक आधार लिंक', query: 'बँक खात्याला आधार DBT कसे जोडावे?' },
    { label: '📍 जवळचे CSC केंद्र', query: 'माझे जवळचे CSC केंद्र कुठे आहे?' }
  ],
  bn: [
    { label: '💸 টাকা কেন আসেনি?', query: 'আমার ২৩তম কিশতির টাকা কেন আসেনি?' },
    { label: '🪪 eKYC কীভাবে করব?', query: 'eKYC করার সঠিক নিয়ম কী?' },
    { label: '🏦 ব্যাংক আধার লিঙ্ক', query: 'ব্যাংক অ্যাকাউন্টে আধার DBT কীভাবে যুক্ত করব?' },
    { label: '📍 নিকটবর্তী CSC কেন্দ্র', query: 'নিকটবর্তী CSC সেবা কেন্দ্র কোথায়?' }
  ],
  te: [
    { label: '💸 డబ్బు ఎందుకు రాలేదు?', query: 'నా 23వ విడత డబ్బు ఎందుకు రాలేదు?' },
    { label: '🪪 eKYC ఎలా చేయాలి?', query: 'eKYC ఎలా పూర్తి చేయాలి?' },
    { label: '🏦 బ్యాంక్ ఆధార్ లింక్', query: 'బ్యాంక్ ఖాతాకు ఆధార్ DBT ఎలా లింక్ చేయాలి?' },
    { label: '📍 సమీప CSC కేంద్రం', query: 'సమీపంలోని CSC కేంద్రం ఎక్కడ ఉంది?' }
  ],
  ta: [
    { label: '💸 பணம் ஏன் வரவில்லை?', query: 'எனது 23வது தவணை பணம் ஏன் வரவில்லை?' },
    { label: '🪪 eKYC எப்படி செய்வது?', query: 'eKYC முடிப்பது எப்படி?' },
    { label: '🏦 வங்கி ஆதார் இணைப்பு', query: 'வங்கி கணக்கில் ஆதார் DBT இணைப்பது எப்படி?' },
    { label: '📍 அருகிலுள்ள CSC மையம்', query: 'அருகிலுள்ள CSC மையம் எங்குள்ளது?' }
  ],
  kn: [
    { label: '💸 ಹಣ ಏಕೆ ಬಂದಿಲ್ಲ?', query: 'ನನ್ನ 23ನೇ ಕಂತಿನ ಹಣ ಏಕೆ ಜಮಾ ಆಗಿಲ್ಲ?' },
    { label: '🪪 eKYC ಹೇಗೆ ಮಾಡುವುದು?', query: 'eKYC ಪೂರ್ಣಗೊಳಿಸುವುದು ಹೇಗೆ?' },
    { label: '🏦 ಬ್ಯಾಂಕ್ ಆಧಾರ್ ಲಿಂಕ್', query: 'ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ DBT ಲಿಂಕ್ ಮಾಡುವುದು ಹೇಗೆ?' },
    { label: '📍 ಹತ್ತಿರದ CSC ಕೇಂದ್ರ', query: 'ಹತ್ತಿರದ CSC ಸೇವಾ ಕೇಂದ್ರ ಎಲ್ಲಿದೆ?' }
  ],
  gu: [
    { label: '💸 પૈસા કેમ ન આવ્યા?', query: 'મારો ૨૩મો હપ્તો કેમ જમા નથી થયો?' },
    { label: '🪪 eKYC કેવી રીતે કરવું?', query: 'eKYC કરવાની સાચી રીત જણાવો' },
    { label: '🏦 બેંક આધાર લિંક', query: 'બેંક ખાતા સાથે આધાર DBT કેવી રીતે જોડવું?' },
    { label: '📍 નજીકનું CSC કેન્દ્ર', query: 'નજીકનું CSC ડિજિટલ સેવા કેન્દ્ર ક્યાં છે?' }
  ]
};

// Comprehensive, contextual multilingual knowledge generator
const KNOWLEDGE_RESPONSES = {
  hi: {
    greeting: (farmer) => `नमस्ते ${farmer.name} जी! 🙏 मैं आपका पीएम-किसान सहायक हूँ। ${farmer.issue ? `आपकी 23वीं किस्त "${farmer.issueDetails?.title || 'तकनीकी कारण'}" की वजह से रुकी है। मैं इसे तुरंत ठीक कराने में आपकी पूरी मदद करूँगा।` : 'आपके खाते में सभी 23 किस्तें सफलतापूर्वक प्राप्त हो चुकी हैं। आप मुझसे योजना से संबंधित कोई भी सवाल पूछ सकते हैं।'}`,
    payment: (farmer) => {
      if (farmer.issue && farmer.issueDetails) {
        return `${farmer.name} जी, आपकी 23वीं किस्त (${farmer.issueDetails.title}) के कारण रुकी है:\n\n📌 मुख्य कारण: ${farmer.issueDetails.explain}\n\n💡 समाधान:\n1. 'भुगतान जांच' स्क्रीन पर जाएं।\n2. 'सेवा पर्ची' डाउनलोड करें।\n3. जरूरी दस्तावेज लेकर CSC या बैंक जाएं। विवरण अपडेट होते ही रुका हुआ पैसा सीधे आपके खाते में आ जाएगा।`;
      }
      return `${farmer.name} जी, आपके खाते में कोई भुगतान समस्या नहीं है। आपके सभी ₹46,000 (23 किस्तें) सफलतापूर्वक बैंक खाते में जमा हो चुके हैं। अगली किस्त सरकार के तय समय पर जारी होगी।`;
    },
    ekyc: (farmer) => `ई-केवाईसी (eKYC) पूरा करने के 3 आसान तरीके हैं:\n\n1. 📱 ऑनलाइन OTP विधि (निःशुल्क):\n   pmkisan.gov.in पर जाएं → eKYC पर क्लिक करें → आधार नंबर दर्ज कर OTP सत्यापित करें (5 मिनट)।\n\n2. 🤳 Face Auth मोबाइल ऐप:\n   PM-KISAN App डाउनलोड करें और चेहरे की पहचान (Face Authentication) से घर बैठे eKYC करें।\n\n3. 🏢 CSC केंद्र (बायोमेट्रिक):\n   पास के CSC केंद्र पर मूल आधार कार्ड ले जाएं और फिंगरप्रिंट लगाकर eKYC कराएं। (यह पूर्णतः निःशुल्क सेवा है)।`,
    bank: (farmer) => `बैंक खाते को DBT/NPCI से लिंक करने का तरीका:\n\n1. अपना मूल आधार कार्ड और बैंक पासबुक लेकर अपनी बैंक शाखा जाएं।\n2. बैंक अधिकारी से कहें: "मुझे अपने खाते में PM-KISAN के लिए Aadhaar DBT / NPCI Mapping करवानी है।"\n3. बैंक द्वारा दिया गया DBT सहमति फॉर्म भरें और फिंगरप्रिंट या हस्ताक्षर से सत्यापित करें।\n4. 24 से 48 घंटे में NPCI मैपिंग सक्रिय हो जाती है।`,
    land: (farmer) => `भूमि रिकॉर्ड (Land Seeding) सत्यापन:\n\n1. अपनी खतौनी / जमाबंदी (Land Ownership Record) की नकल निकालें।\n2. अपने हल्का लेखपाल (Patwari) या खंड कृषि कार्यालय (Block Agriculture Office) में जाएं।\n3. अपना आधार कार्ड और खतौनी जमा कर पोर्टल पर लैंड सीडिंग वेरीफाई करवाएं।\n4. सत्यापन के बाद आगामी चक्र में आपकी रुकी हुई किस्त जारी हो जाएगी।`,
    csc: (farmer) => `📍 आपके नजदीकी CSC केंद्र की जानकारी:\n\n• केंद्र: ${farmer.district} डिजिटल सेवा केंद्र\n• स्थान: ${farmer.village} पंचायत भवन / ब्लॉक कार्यालय के निकट\n• समय: सुबह 10:00 बजे से शाम 5:00 बजे तक (सोमवार - शनिवार)\n• सुविधा: eKYC, आधार सुधार, नया पंजीकरण\n\n💡 नोट: हमेशा अपना मूल आधार कार्ड और मोबाइल साथ ले जाएं।`,
    parchi: (farmer) => `📄 CSC सेवा पर्ची (Action Slip) की जानकारी:\n\nयह पर्ची विशेष रूप से आपके लिए तैयार की गई है जिसमें:\n• आपकी समस्या का सटीक तकनीकी कारण\n• CSC ऑपरेटर या बैंक के लिए आवश्यक निर्देश\n• जरूरी दस्तावेजों की सूची\n• निःशुल्क सेवा एडवाइजरी\n\nआप डैशबोर्ड में "सेवा पर्ची डाउनलोड करें" बटन दबाकर इसे तुरंत प्राप्त कर सकते हैं।`,
    helpline: () => `📞 आधिकारिक पीएम-किसान सहायता नंबर:\n\n• राष्ट्रीय टोल-फ्री हेल्पलाइन: 155261 (सोम-शनि, 9 AM - 6 PM)\n• सीधा हेल्पलाइन नंबर: 011-24300606\n• किसान कॉल सेंटर: 1800-180-1551\n• आधिकारिक ईमेल: pmkisan-ict@gov.in\n\n⚠️ सतर्कता: किसी भी व्यक्ति को अपना बैंक ओटीपी, पासवर्ड या यूपीआई पिन कभी न बताएं।`,
    registration: () => `🌾 नए किसान पंजीकरण (New Registration) के नियम:\n\n1. आवश्यक पात्रता: स्वयं के नाम पर कृषि भूमि होनी चाहिए।\n2. जरूरी दस्तावेज: आधार कार्ड, बैंक पासबुक, खतौनी/जमाबंदी नकल, मोबाइल नंबर।\n3. आवेदन प्रक्रिया: pmkisan.gov.in पर Farmer Corner में जाकर 'New Farmer Registration' पर क्लिक करें या CSC केंद्र से आवेदन कराएं।`,
    default: (farmer) => `जी ${farmer.name} जी, मैं पीएम-किसान योजना से संबंधित सभी सवालों में आपकी मदद कर सकता हूँ। आप eKYC, DBT बैंक लिंकिंग, भूमि सत्यापन, भुगतान स्थिति या नजदीकी CSC केंद्र के बारे में पूछ सकते हैं।`
  },
  en: {
    greeting: (farmer) => `Namaste ${farmer.name}! 🙏 I'm your PM-KISAN Sahayak. ${farmer.issue ? `Your 23rd installment is on hold due to "${farmer.issueDetails?.title || 'a technical issue'}". I will guide you step-by-step to resolve it.` : 'All 23 installments in your account are up to date. Feel free to ask any question about the scheme.'}`,
    payment: (farmer) => {
      if (farmer.issue && farmer.issueDetails) {
        return `${farmer.name}, your 23rd installment failed due to: ${farmer.issueDetails.title}.\n\n📌 Root Cause: ${farmer.issueDetails.explain}\n\n💡 Recommended Action:\n1. View the Payment Diagnosis screen.\n2. Download your CSC Seva Parchi.\n3. Visit your local CSC or bank branch. As soon as records update, the pending ₹2,000 will be credited directly.`;
      }
      return `${farmer.name}, all 23 installments (total ₹46,000) have been successfully deposited into your bank account without any issues.`;
    },
    ekyc: (farmer) => `3 Easy ways to complete eKYC:\n\n1. 📱 Online via Aadhaar OTP (Free):\n   Visit pmkisan.gov.in → Farmer Corner → eKYC → Enter Aadhaar & verify OTP (takes 2 minutes).\n\n2. 🤳 PM-KISAN Face Auth Mobile App:\n   Download the official app from Google Play and complete eKYC from home via facial scanning.\n\n3. 🏢 Nearest CSC Center (Biometric):\n   Carry your original Aadhaar to any CSC kiosk for biometric fingerprint verification.`,
    bank: (farmer) => `Steps to link Bank Account for Aadhaar DBT:\n\n1. Visit your bank branch with your original Aadhaar Card and Bank Passbook.\n2. Request the manager/clerk for "Aadhaar Seeding and DBT / NPCI Mapping for PM-KISAN".\n3. Fill the standard NPCI consent form.\n4. Verification activates within 24–48 hours automatically.`,
    land: (farmer) => `Land Record Seeding Verification:\n\n1. Obtain an updated copy of your Land Ownership Document (Khatauni / Jamabandi).\n2. Visit your local Patwari / Lekhpal or Block Agriculture Officer.\n3. Submit your Aadhaar and land copy for online land seeding verification on the portal.`,
    csc: (farmer) => `📍 Your Nearest CSC Center Details:\n\n• Center: ${farmer.district} Digital Seva Kendra\n• Location: Near ${farmer.village} Panchayat Bhawan / Block Office\n• Timings: 10:00 AM – 5:00 PM (Monday to Saturday)\n• Bring: Original Aadhaar card & registered mobile phone.`,
    parchi: (farmer) => `📄 About the CSC Seva Parchi (Action Slip):\n\nThis generated slip contains:\n• The exact PFMS/eKYC failure reason\n• Technical instructions for the CSC operator/Patwari\n• Checklist of documents to carry\n• Official anti-corruption free-service notice.\n\nClick "Download CSC Seva Parchi" on your dashboard to save or print it.`,
    helpline: () => `📞 Official PM-KISAN Helplines:\n\n• Toll-Free Helpline: 155261 (Mon-Sat, 9 AM - 6 PM)\n• Direct Phone: 011-24300606\n• Kisan Call Center: 1800-180-1551\n• Official Email: pmkisan-ict@gov.in\n\n⚠️ Safety: Never share bank passwords, OTPs, or UPI PINs with anyone.`,
    registration: () => `🌾 New Farmer Registration Guide:\n\n1. Eligibility: Agricultural landholding registered under the farmer's name.\n2. Required Documents: Aadhaar card, Bank passbook, Land records (Khatauni), Mobile number.\n3. How to Apply: Visit pmkisan.gov.in → 'New Farmer Registration' or apply through any CSC center.`,
    default: (farmer) => `Hello ${farmer.name}, I am here to help you with anything regarding PM-KISAN: eKYC verification, DBT bank mapping, land records, payment status, or CSC seva parchi.`
  },
  pa: {
    greeting: (farmer) => `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ${farmer.name} ਜੀ! 🙏 ਮੈਂ ਤੁਹਾਡਾ ਪੀਐਮ-ਕਿਸਾਨ ਸਹਾਇਕ ਹਾਂ। ${farmer.issue ? `ਤੁਹਾਡੀ 23ਵੀਂ ਕਿਸ਼ਤ "${farmer.issueDetails?.title || 'ਤਕਨੀਕੀ ਕਾਰਨ'}" ਕਰਕੇ ਰੁਕੀ ਹੈ।` : 'ਤੁਹਾਡੇ ਸਾਰੇ ਭੁਗਤਾਨ ਸਹੀ ਹਨ।'}`,
    payment: (farmer) => farmer.issue ? `${farmer.name} ਜੀ, ਤੁਹਾਡੀ ਕਿਸ਼ਤ "${farmer.issueDetails.title}" ਕਾਰਨ ਰੁਕੀ ਹੋਈ ਹੈ।\n\nਕਾਰਨ: ${farmer.issueDetails.explain}\n\nਹੱਲ: CSC ਸੇਵਾ ਪਰਚੀ ਡਾਊਨਲੋਡ ਕਰਕੇ ਨੇੜਲੇ CSC ਕੇਂਦਰ ਜਾਓ। ਵੈਰੀਫਿਕੇਸ਼ਨ ਤੋਂ ਬਾਅਦ ਪੈਸੇ ਖਾਤੇ ਵਿੱਚ ਆ ਜਾਣਗੇ।` : 'ਤੁਹਾਡੇ ਖਾਤੇ ਵਿੱਚ ਕੋਈ ਸਮੱਸਿਆ ਨਹੀਂ ਹੈ, ਸਾਰੀਆਂ 23 ਕਿਸ਼ਤਾਂ ਜਮਾ ਹੋ ਚੁੱਕੀਆਂ ਹਨ।',
    ekyc: () => `e-KYC ਕਰਨ ਦੇ ਤਰੀਕੇ:\n1. pmkisan.gov.in ਤੇ ਆਧਾਰ OTP ਰਾਹੀਂ।\n2. ਪੀਐਮ-ਕਿਸਾਨ ਫੇਸ ਐਪ ਰਾਹੀਂ।\n3. ਨੇੜਲੇ CSC ਸੈਂਟਰ ਜਾ ਕੇ ਫਿੰਗਰਪ੍ਰਿੰਟ ਸਕੈਨ ਕਰਵਾਓ।`,
    bank: () => `ਬੈਂਕ ਖਾਤੇ ਨਾਲ ਆਧਾਰ ਡੀਬੀਟੀ (DBT/NPCI) ਲਿੰਕ ਕਰਵਾਉਣ ਲਈ ਆਧਾਰ ਕਾਰਡ ਅਤੇ ਪਾਸਬੁੱਕ ਲੈ ਕੇ ਬੈਂਕ ਬ੍ਰਾਂਚ ਜਾਓ।`,
    csc: (farmer) => `ਨੇੜਲਾ CSC ਸੈਂਟਰ: ${farmer.district} ਸੇਵਾ ਕੇਂਦਰ, ${farmer.village} ਨੇੜੇ। ਸਮਾਂ: ਸਵੇਰੇ 10 ਤੋਂ ਸ਼ਾਮ 5 ਵਜੇ ਤੱਕ।`,
    helpline: () => `ਪੀਐਮ-ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ:\n• ਟੋਲ-ਫ੍ਰੀ: 155261\n• ਡਾਇਰੈਕਟ: 011-24300606`,
    default: (farmer) => `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ${farmer.name} ਜੀ, ਤੁਸੀਂ eKYC, ਬੈਂਕ ਲਿੰਕਿੰਗ ਜਾਂ ਕਿਸ਼ਤ ਸਬੰਧੀ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛ ਸਕਦੇ ਹੋ।`
  },
  mr: {
    greeting: (farmer) => `नमस्कार ${farmer.name} जी! 🙏 मी आपला पीएम-किसान सहाय्यक आहे. ${farmer.issue ? `आपला २३ वा हप्ता "${farmer.issueDetails?.title || 'तांत्रिक अडचण'}" मुळे थांबला आहे.` : 'आपले सर्व हप्ते वेळेवर जमा झाले आहेत.'}`,
    payment: (farmer) => farmer.issue ? `${farmer.name} जी, आपला हप्ता "${farmer.issueDetails.title}" मुळे अडकला आहे.\n\nकारण: ${farmer.issueDetails.explain}\n\nउपाय: CSC सेवा पावती डाऊनलोड करा आणि जवळच्या केंद्रात जाऊन दुरुस्ती करून घ्या.` : 'आपल्या खात्यात कोणतीही अडचण नाही. सर्व २३ हप्ते जमा झाले आहेत.',
    ekyc: () => `e-KYC पूर्ण करण्याचे ३ मार्ग:\n१. pmkisan.gov.in वर आधार OTP द्वारे.\n२. PM-KISAN Face Auth ॲपद्वारे.\n३. जवळच्या महा-ई-सेवा / CSC केंद्रावर बायोमेट्रिकद्वारे.`,
    bank: () => `बँक खात्याला आधार DBT लिंक करण्यासाठी आधार कार्ड व पासबुक घेऊन आपल्या बँक शाखेत जा आणि NPCI मॅपिंग फॉर्म भरा.`,
    csc: (farmer) => `आपले जवळचे केंद्र: ${farmer.district} डिजिटल सेवा केंद्र, ${farmer.village} जवळ. वेळ: सकाळी १० ते संध्याकाळी ५.`,
    helpline: () => `पीएम-किसान हेल्पलाईन:\n• टोल-फ्री: 155261\n• थेट संपर्क: 011-24300606`,
    default: (farmer) => `नमस्कार ${farmer.name} जी, मी आपल्याला eKYC, बँक DBT, हप्त्याची स्थिती याविषयी पूर्ण मदत करू शकतो.`
  },
  bn: {
    greeting: (farmer) => `নমস্কার ${farmer.name} জি! 🙏 আমি আপনার পিএম-কিসান সহায়ক। ${farmer.issue ? `আপনার ২৩তম কিশতি "${farmer.issueDetails?.title || 'সমস্যার'}" কারণে আটকে রয়েছে।` : 'আপনার সমস্ত কিশতির টাকা সঠিকভাবে জমা হয়েছে।'}`,
    payment: (farmer) => farmer.issue ? `${farmer.name} জি, আপনার কিশতি "${farmer.issueDetails.title}" এর জন্য আটকে আছে।\n\nকারণ: ${farmer.issueDetails.explain}\n\nসমাধান: সেবারশিদ ডাউনলোড করে সিএসসি কেন্দ্রে গিয়ে সংশোধন করুন।` : 'আপনার অ্যাকাউন্টে কোনো সমস্যা নেই। মোট ২৩টি কিশতি সফলভাবে জমা হয়েছে।',
    ekyc: () => `e-KYC করার উপায়:\n১. pmkisan.gov.in এ আধার ওটিপি দিয়ে।\n২. ফেস অথেনটিকেশন অ্যাপের মাধ্যমে।\n৩. নিকটবর্তী সিএসসি (CSC) কেন্দ্রে বায়োমেট্রিক আঙুলের ছাপ দিয়ে।`,
    bank: () => `ব্যাংক অ্যাকাউন্টে আধার ডিবিটি (DBT/NPCI) লিঙ্কের জন্য আধার ও পাসবই নিয়ে আপনার ব্যাংকে যোগাযোগ করুন।`,
    csc: (farmer) => `নিকটবর্তী CSC কেন্দ্র: ${farmer.district} ডিজিটাল সেবা কেন্দ্র, ${farmer.village} ব্লক অফিসের কাছে।`,
    helpline: () => `পিএম-কিসান হেল্পলাইন:\n• টোল-ফ্রি: 155261\n• ফোন: 011-24300606`,
    default: (farmer) => `নমস্কার ${farmer.name} জি, আপনি eKYC, ব্যাংক ডিবিটি বা কিশতি সম্পর্কিত যেকোনো প্রশ্ন করতে পারেন।`
  },
  te: {
    greeting: (farmer) => `నమస్కారం ${farmer.name} గారు! 🙏 నేను మీ పీఎం-కిసాన్ సహాయకుడిని. ${farmer.issue ? `మీ 23వ విడత "${farmer.issueDetails?.title || 'సమస్య'}" వల్ల ఆగిపోయింది.` : 'మీ చెల్లింపులన్నీ సక్రమంగా పూర్తయ్యాయి.'}`,
    payment: (farmer) => farmer.issue ? `${farmer.name} గారు, మీ విడత "${farmer.issueDetails.title}" కారణంగా నిలిచిపోయింది.\n\nకారణం: ${farmer.issueDetails.explain}\n\nపరిష్కారం: సేవా పత్రాన్ని డౌన్‌లోడ్ చేసుకుని సమీప CSC కేంద్రానికి వెళ్లండి.` : 'మీ ఖాతాలో ఎలాంటి సమస్య లేదు, అన్ని 23 విడతల మొత్తం అందింది.',
    ekyc: () => `e-KYC పూర్తి చేయడానికి మార్గాలు:\n1. pmkisan.gov.in లో ఆధార్ OTP ద్వారా.\n2. ఫేస్ అథెంటికేషన్ యాప్ ద్వారా.\n3. సమీపంలోని CSC కేంద్రంలో బయోమెట్రిక్ వేలిముద్ర ద్వారా.`,
    bank: () => `బ్యాంక్ ఖాతాకు ఆధార్ DBT లింక్ చేయడానికి ఆధార్ కార్డు, పాస్‌బుక్‌తో మీ బ్యాంక్ బ్రాంచ్‌కు వెళ్లి NPCI మ్యాపింగ్ చేయించండి.`,
    csc: (farmer) => `సమీప CSC కేంద్రం: ${farmer.district} డిజిటల్ సేవా కేంద్రం, ${farmer.village} వద్ద. సమయం: ఉదయం 10 నుండి సాయంత్రం 5 వరకు.`,
    helpline: () => `పీఎం-కిసాన్ హెల్ప్‌లైన్:\n• టోల్-ఫ్రీ: 155261\n• నంబర్: 011-24300606`,
    default: (farmer) => `నమస్కారం ${farmer.name} గారు, eKYC, బ్యాంక్ లింకింగ్ లేదా చెల్లింపుల గురించి ఏదైనా అడగవచ్చు.`
  },
  ta: {
    greeting: (farmer) => `வணக்கம் ${farmer.name} அவர்களே! 🙏 நான் உங்கள் பிஎம்-கிசான் உதவியாளர். ${farmer.issue ? `உங்கள் 23வது தவணை "${farmer.issueDetails?.title || 'காரணத்தால்'}" நிறுத்தி வைக்கப்பட்டுள்ளது.` : 'உங்கள் கணக்கு சரியாக உள்ளது.'}`,
    payment: (farmer) => farmer.issue ? `${farmer.name} அவர்களே, உங்கள் பணம் "${farmer.issueDetails.title}" காரணமாக வரவில்லை.\n\nகாரணம்: ${farmer.issueDetails.explain}\n\nதீர்வு: சேவை சீட்டை பதிவிறக்கி CSC மையத்திற்கு சென்று சரிசெய்யவும்.` : 'உங்கள் கணக்கில் எந்த பிரச்சனையும் இல்லை. அனைத்து தவணைகளும் வரவு வைக்கப்பட்டுள்ளன.',
    ekyc: () => `e-KYC செய்யும் முறைகள்:\n1. pmkisan.gov.in இணையதளத்தில் ஆதார் OTP மூலம்.\n2. முக அங்கீகார செயலி மூலம்.\n3. அருகில் உள்ள CSC மையத்தில் கைரேகை பதிவு மூலம்.`,
    bank: () => `வங்கி கணக்கில் ஆதார் DBT இணைக்க ஆதார் அட்டை மற்றும் பாஸ்புக்குடன் வங்கிக்கு சென்று NPCI படிவம் சமர்ப்பிக்கவும்.`,
    csc: (farmer) => `அருகிலுள்ள CSC மையம்: ${farmer.district} சேவை மையம், ${farmer.village} அருகில். நேரம்: காலை 10 - மாலை 5.`,
    helpline: () => `பிஎம்-கிசான் உதவி எண்கள்:\n• கட்டணமில்லா எண்: 155261\n• நேரடி எண்: 011-24300606`,
    default: (farmer) => `வணக்கம் ${farmer.name} அவர்களே, eKYC அல்லது வங்கி இணைப்பு பற்றி நீங்கள் கேட்கலாம்.`
  },
  kn: {
    greeting: (farmer) => `ನಮಸ್ಕಾರ ${farmer.name} ಅವರೇ! 🙏 ನಾನು ನಿಮ್ಮ ಪಿಎಂ-ಕಿಸಾನ್ ಸಹಾಯಕ. ${farmer.issue ? `ನಿಮ್ಮ 23ನೇ ಕಂತು "${farmer.issueDetails?.title || 'ಸಮಸ್ಯೆಯಿಂದ'}" ನಿಂತಿದೆ.` : 'ನಿಮ್ಮ ಎಲ್ಲಾ ಕಂತುಗಳು ಜಮೆಯಾಗಿವೆ.'}`,
    payment: (farmer) => farmer.issue ? `${farmer.name} ಅವರೇ, ನಿಮ್ಮ ಹಣ "${farmer.issueDetails.title}" ಕಾರಣದಿಂದ ನಿಂತಿದೆ.\n\nಕಾರಣ: ${farmer.issueDetails.explain}\n\nಪರಿಹಾರ: ಸೇವಾ ರಶೀದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ CSC ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.` : 'ಖಾತೆಯಲ್ಲಿ ಯಾವುದೇ ಸಮಸ್ಯೆ ಇಲ್ಲ, ಎಲ್ಲಾ 23 ಕಂತುಗಳು ಯಶಸ್ವಿಯಾಗಿ ಜಮೆಯಾಗಿವೆ.',
    ekyc: () => `e-KYC ಪೂರ್ಣಗೊಳಿಸಲು ಮಾರ್ಗಗಳು:\n1. pmkisan.gov.in ನಲ್ಲಿ ಆಧಾರ್ OTP ಮೂಲಕ.\n2. ಫೇಸ್ ಆಥ್ ಮೊಬೈಲ್ ಆಪ್ ಮೂಲಕ.\n3. ಹತ್ತಿರದ CSC ಕೇಂದ್ರದಲ್ಲಿ ಬಯೋಮೆಟ್ರಿಕ್ ಮೂಲಕ.`,
    bank: () => `ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ DBT ಲಿಂಕ್ ಮಾಡಲು ಆಧಾರ್ ಮತ್ತು ಪಾಸ್‌ಬುಕ್‌ನೊಂದಿಗೆ ಬ್ಯಾಂಕಿಗೆ ಭೇಟಿ ನೀಡಿ NPCI ಮ್ಯಾಪಿಂಗ್ ಮಾಡಿಸಿ.`,
    csc: (farmer) => `ಹತ್ತಿರದ CSC ಕೇಂದ್ರ: ${farmer.district} ಡಿಜಿಟಲ್ ಸೇವಾ ಕೇಂದ್ರ, ${farmer.village} ಹತ್ತಿರ.`,
    helpline: () => `ಪಿಎಂ-ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ:\n• ಉಚಿತ ಸಂಖ್ಯೆ: 155261\n• ನೇರ ಸಂಖ್ಯೆ: 011-24300606`,
    default: (farmer) => `ನಮಸ್ಕಾರ ${farmer.name} ಅವರೇ, eKYC ಅಥವಾ ಪಾವತಿ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಬಹುದು.`
  },
  gu: {
    greeting: (farmer) => `નમસ્તે ${farmer.name} જી! 🙏 હું તમારો પીએમ-કિસાન સહાયક છું. ${farmer.issue ? `તમારો ૨૩મો હપ્તો "${farmer.issueDetails?.title || 'કારણસર'}" અટકેલ છે.` : 'તમારા બધા હપ્તા જમા થઈ ગયા છે.'}`,
    payment: (farmer) => farmer.issue ? `${farmer.name} જી, તમારો હપ્તો "${farmer.issueDetails.title}" ને કારણે અટક્યો છે.\n\nકારણ: ${farmer.issueDetails.explain}\n\nઉકેલ: સેવા રસીદ ડાઉનલોડ કરી નજીકના CSC કેન્દ્ર પર જઈ સુધારો કરાવો.` : 'તમારા ખાતામાં કોઈ સમસ્યા નથી. બધા ૨૩ હપ્તા જમા થયા છે.',
    ekyc: () => `e-KYC કરવાની રીતો:\n૧. pmkisan.gov.in પર આધાર OTP દ્વારા.\n૨. ફેસ ઓથેન્ટિકેશન એપ દ્વારા.\n੩. નજીકના CSC કેન્દ્ર પર બાયોમેટ્રિક ફિંગરપ્રિન્ટ દ્વારા.`,
    bank: () => `બેંક ખાતા સાથે આધાર DBT લિંક કરવા આધાર કાર્ડ અને પાસબુક લઈને બેંક શાખામાં જઈ NPCI મેપિંગ કરાવો.`,
    csc: (farmer) => `નજીકનું CSC કેન્દ્ર: ${farmer.district} ડિજિટલ સેવા કેન્દ્ર, ${farmer.village} પાસે.`,
    helpline: () => `પીએમ-કિસાન હેલ્પલાઇન:\n• ટોલ-ફ્રી: 155261\n• ડાયરેક્ટ: 011-24300606`,
    default: (farmer) => `નમસ્તે ${farmer.name} જી, તમે eKYC અથવા હપ્તા અંગે કોઈ પણ પ્રશ્ન પૂછી શકો છો.`
  }
};

export function initialMessages(farmer, language = 'hi') {
  const langKey = KNOWLEDGE_RESPONSES[language] ? language : 'hi';
  const content = KNOWLEDGE_RESPONSES[langKey].greeting(farmer);
  return [{ from: 'bot', text: content }];
}

import { tablerIcon } from './icons.js';

export function chatView(farmer, messages, language = 'hi', typing = false, isListening = false) {
  const langName = LANGUAGES[language]?.name || 'हिंदी';
  const chips = LOCALIZED_CHIPS[language] || LOCALIZED_CHIPS['hi'];

  return `
    <section class="screen chat-screen">
      <header class="chat-header">
        <button class="icon-btn light" data-route="dashboard" aria-label="Back">
          ${tablerIcon('arrowLeft', 18)}
        </button>
        <div class="bot-avatar">${tablerIcon('robot', 22)}</div>
        <div class="chat-header-info">
          <h1>Sahayak AI (${langName})</h1>
          <p><span class="online-dot"></span> Online · ${farmer.name} (${farmer.village})</p>
        </div>
        <select id="chat-lang-select" class="lang-select-dropdown" aria-label="Language">
          ${Object.entries(LANGUAGES).map(([code, l]) => `<option value="${code}" ${code === language ? 'selected' : ''}>${l.flag} ${l.name}</option>`).join('')}
        </select>
      </header>

      <div class="chat-log" id="chat-log">
        ${messages.map(message => `
          <div class="message ${message.from}">
            <div class="msg-content">${escape(message.text)}</div>
            ${message.from === 'bot' ? `<button class="bot-speak-btn" data-speak="${escape(message.text)}" title="Listen audio" aria-label="Listen audio">${tablerIcon('volume', 14)} <span>Listen</span></button>` : ''}
          </div>
        `).join('')}
        ${typing ? '<div class="message bot typing"><i></i><i></i><i></i></div>' : ''}
      </div>

      <div class="chips">
        ${chips.map(c => `<button data-question="${escape(c.query)}">${c.label}</button>`).join('')}
      </div>

      <form id="chat-form" class="chat-input">
        <button type="button" id="voice-input-btn" class="icon-btn voice-mic-btn ${isListening ? 'listening' : ''}" title="Speak using mic" aria-label="Voice input">
          ${isListening ? tablerIcon('micOff', 20) : tablerIcon('mic', 20)}
        </button>
        <input id="chat-message" autocomplete="off" placeholder="${isListening ? t('listening', language) : t('chatPlaceholder', language)}" aria-label="Your question" />
        <button type="submit" aria-label="Send message" class="send-btn">${tablerIcon('send', 18)}</button>
      </form>
    </section>
  `;
}

export async function replyFor(question, farmer, language = 'hi') {
  // Add a natural responsive typing delay (~350ms)
  await new Promise(resolve => setTimeout(resolve, 350));

  const langKey = KNOWLEDGE_RESPONSES[language] ? language : 'hi';
  const dict = KNOWLEDGE_RESPONSES[langKey];
  const q = question.toLowerCase();

  // Multi-intent intelligent matching
  if (
    q.includes('kyun') || q.includes('why') || q.includes('paisa') || q.includes('paise') ||
    q.includes('payment') || q.includes('kist') || q.includes('install') || q.includes('fail') ||
    q.includes('ruki') || q.includes('ruk') || q.includes('panam') || q.includes('dabbu') ||
    q.includes('taka') || q.includes('rokada') || q.includes('ਕਿਉਂ') || q.includes('का') ||
    q.includes('কেন') || q.includes('ఎందుకు') || q.includes('ஏன்') || q.includes('ಏಕೆ') || q.includes('કેમ')
  ) {
    return dict.payment(farmer);
  }

  if (
    q.includes('ekyc') || q.includes('e-kyc') || q.includes('kyc') || q.includes('aadhaar') ||
    q.includes('biometric') || q.includes('face') || q.includes('otp') || q.includes('ਆਧਾਰ') ||
    q.includes('आधार') || q.includes('আধার') || q.includes('ఆధార్') || q.includes('ஆதಾರ್')
  ) {
    return dict.ekyc(farmer);
  }

  if (
    q.includes('bank') || q.includes('dbt') || q.includes('npci') || q.includes('khata') ||
    q.includes('account') || q.includes('branch') || q.includes('passbook') || q.includes('ਬੈਂਕ') ||
    q.includes('बँक') || q.includes('ব্যাংক') || q.includes('బ్యాంక్') || q.includes('வங்கி') || q.includes('ಬ್ಯಾಂಕ್')
  ) {
    return dict.bank(farmer);
  }

  if (
    q.includes('land') || q.includes('seeding') || q.includes('khatauni') || q.includes('jamabandi') ||
    q.includes('patwari') || q.includes('lekhpal') || q.includes('zameen') || q.includes('jameen') ||
    q.includes('revenue') || q.includes('जमीन') || q.includes('खतौनी') || q.includes('ಭೂಮಿ')
  ) {
    return dict.land ? dict.land(farmer) : dict.payment(farmer);
  }

  if (
    q.includes('csc') || q.includes('kendra') || q.includes('center') || q.includes('seva') ||
    q.includes('kahan') || q.includes('where') || q.includes('near') || q.includes('ਸੈਂਟਰ') ||
    q.includes('केंद्र') || q.includes('কেন্দ্র') || q.includes('కేంద్రం') || q.includes('மையம்')
  ) {
    return dict.csc(farmer);
  }

  if (
    q.includes('parchi') || q.includes('slip') || q.includes('slip') || q.includes('download') ||
    q.includes('print') || q.includes('रसीद') || q.includes('पर्ची') || q.includes('ರಶೀದಿ')
  ) {
    return dict.parchi ? dict.parchi(farmer) : dict.csc(farmer);
  }

  if (
    q.includes('helpline') || q.includes('number') || q.includes('phone') || q.includes('call') ||
    q.includes('contact') || q.includes('toll') || q.includes('नंबर') || q.includes('ਨੰਬਰ') ||
    q.includes('নম্বর') || q.includes('నంబర్') || q.includes('எண்')
  ) {
    return dict.helpline();
  }

  if (
    q.includes('new') || q.includes('regist') || q.includes('apply') || q.includes('aavedan') ||
    q.includes('naya') || q.includes('form') || q.includes('नया') || q.includes('पंजीकरण')
  ) {
    return dict.registration ? dict.registration() : dict.default(farmer);
  }

  if (
    q.includes('namaste') || q.includes('hello') || q.includes('hi') || q.includes('hey') ||
    q.includes('pranam') || q.includes('ram ram') || q.includes('sat sri') || q.includes('vanakkam')
  ) {
    return dict.greeting(farmer);
  }

  return dict.default(farmer);
}
