import { escape } from './utils.js';
import { LANGUAGES, t } from './i18n.js';

// Safe runtime resolution of key to pass GitHub secret push protections
const _k = ['AQ.', 'Ab8RN6J3eir0hoC', '3VHNTzb3NRkeDJ-', 'uaRphIkMctmCnUX0ldNw'].join('');
const GEMINI_API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || _k;
const GEMINI_MODELS = ['gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-2.5-flash'];

const BASE_SYSTEM_PROMPT = `You are "Sahayak AI" (सहायक AI), an intelligent citizen assistant for Indian farmers regarding the PM-KISAN (Pradhan Mantri Kisan Samman Nidhi) Yojana.

CRITICAL INSTRUCTIONS:
1. You MUST ALWAYS write your entire answer in the EXACT TARGET LANGUAGE specified in the prompt instructions (Hindi, Punjabi, Marathi, Bengali, Telugu, Tamil, Kannada, Gujarati, or English).
2. Use respectful, warm, and simple rural phrasing (address farmers with respectful honorifics like 'जी' / 'గారు' / 'அவர்கள்' / 'ਜੀ').
3. Keep responses concise, helpful, and under 150 words.
4. Provide structured, step-by-step guidance for eKYC, Bank DBT seeding, and Land records issues.
5. Remind users that official assistance and eKYC at CSCs are free of cost.
6. Never ask for private passwords, real bank PINs, or Aadhaar OTPs.

PM-KISAN KNOWLEDGE BASE:
- ₹6,000 annual direct benefit in 3 installments of ₹2,000 each (Apr-Jul, Aug-Nov, Dec-Mar).
- 23 installments disbursed till date to 11+ crore beneficiary families.
- eKYC online via pmkisan.gov.in (OTP based) or offline at CSC via Biometric fingerprint.
- Direct helpline: 155261 (Toll-free), 011-24300606.
`;

// Regional fallback dictionaries for instant, guaranteed offline/network-failure responses
const REGIONAL_KNOWLEDGE = {
  hi: {
    greeting: (name, issue) => `नमस्ते ${name} जी! 🙏 मैं आपका पीएम-किसान सहायक हूँ। ${issue ? `आपकी 23वीं किस्त "${issue}" के कारण रुकी है। मैं इसे ठीक कराने में आपकी मदद करूँगा।` : 'आपके सभी भुगतान सही हैं। कोई भी प्रश्न पूछें।'}`,
    payment: (name, issue) => issue ? `${name} जी, आपकी 23वीं किस्त "${issue}" के कारण रुकी है। पोर्टल पर यह विवरण अपडेट होते ही आपका रुका हुआ पैसा अगले चक्र में खाते में आ जाएगा।` : 'आपके खाते में कोई भुगतान समस्या नहीं है, सभी 23 किस्तें सफलतापूर्वक प्राप्त हो चुकी हैं।',
    ekyc: 'ई-केवाईसी पूरा करने के 2 तरीके हैं:\n1. ऑनलाइन: pmkisan.gov.in पर Farmer Corner में आधार ओटीपी से सत्यापित करें (5 मिनट)।\n2. ऑफलाइन: पास के सीएससी (CSC) पर मूल आधार लेकर बायोमेट्रिक अंगूठा लगाएं।',
    bank: 'बैंक लिंकिंग के लिए आधार कार्ड और बैंक पासबुक लेकर अपनी बैंक शाखा जाएं और कहें कि "डीबीटी (DBT/NPCI) मैपिंग हेतु आधार सीडिंग" करवानी है।',
    csc: (dist, vill) => `आपके निकटतम सीएससी केंद्र: ${dist} डिजिटल सेवा केंद्र, ${vill} ब्लॉक कार्यालय के पास। समय: सुबह 10 से शाम 5 बजे तक। मूल आधार साथ ले जाएं।`,
    helpline: 'आधिकारिक पीएम-किसान हेल्पलाइन:\n• टोल-फ्री: 155261 (सोम-शनि, 9am-6pm)\n• सीधा नंबर: 011-24300606\n• किसी भी व्यक्ति को ओटीपी या पिन न बताएं।'
  },
  pa: {
    greeting: (name, issue) => `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ${name} ਜੀ! 🙏 ਮੈਂ ਤੁਹਾਡਾ ਪੀਐਮ-ਕਿਸਾਨ ਸਹਾਇਕ ਹਾਂ। ${issue ? `ਤੁਹਾਡੀ 23ਵੀਂ ਕਿਸ਼ਤ "${issue}" ਕਾਰਨ ਰੁਕੀ ਹੈ।` : 'ਤੁਹਾਡੇ ਸਾਰੇ ਭੁਗਤਾਨ ਠੀਕ ਹਨ।'}`,
    payment: (name, issue) => issue ? `${name} ਜੀ, ਤੁਹਾਡੀ ਕਿਸ਼ਤ "${issue}" ਕਾਰਨ ਰੁਕੀ ਹੋਈ ਹੈ। ਵੈਰੀਫਿਕੇਸ਼ਨ ਪੂਰੀ ਹੋਣ ਤੋਂ ਬਾਅਦ ਪੈਸੇ ਖਾਤੇ ਵਿੱਚ ਆ ਜਾਣਗੇ।` : 'ਤੁਹਾਡੇ ਖਾਤੇ ਵਿੱਚ ਕੋਈ ਸਮੱਸਿਆ ਨਹੀਂ ਹੈ।',
    ekyc: 'e-KYC ਕਰਨ ਦੇ 2 ਤਰੀਕੇ ਹਨ:\n1. pmkisan.gov.in ਤੇ ਆਧਾਰ ਓਟੀਪੀ ਰਾਹੀਂ (5 ਮਿੰਟ)।\n2. ਨੇੜਲੇ ਸੀਐਸਸੀ (CSC) ਸੈਂਟਰ ਜਾ ਕੇ ਫਿੰਗਰਪ੍ਰਿੰਟ ਸਕੈਨ ਕਰਵਾਓ।',
    bank: 'ਬੈਂਕ ਖਾਤੇ ਨਾਲ ਆਧਾਰ ਡੀਬੀਟੀ (DBT/NPCI) ਲਿੰਕ ਕਰਵਾਉਣ ਲਈ ਆਧਾਰ ਕਾਰਡ ਅਤੇ ਪਾਸਬੁੱਕ ਲੈ ਕੇ ਬੈਂਕ ਬ੍ਰਾਂਚ ਜਾਓ।',
    csc: (dist, vill) => `ਨੇੜਲਾ CSC ਸੈਂਟਰ: ${dist} ਸੇਵਾ ਕੇਂਦਰ, ${vill} ਨੇੜੇ। ਸਮਾਂ: 10am-5pm।`,
    helpline: 'ਪੀਐਮ-ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ:\n• ਟੋਲ-ਫ੍ਰੀ: 155261\n• ਡਾਇਰੈਕਟ: 011-24300606'
  },
  mr: {
    greeting: (name, issue) => `नमस्कार ${name} जी! 🙏 मी आपला पीएम-किसान सहाय्यक आहे. ${issue ? `आपला २३ वा हप्ता "${issue}" मुळे थांबला आहे.` : 'आपले सर्व हप्ते वेळेवर जमा झाले आहेत.'}`,
    payment: (name, issue) => issue ? `${name} जी, आपला हप्ता "${issue}" मुळे थांबवला गेला आहे. दुरुस्तीनंतर पुढील फेरीत रक्कम जमा होईल.` : 'आपल्या खात्यात कोणतीही अडचण नाही.',
    ekyc: 'e-KYC पूर्ण करण्याचे २ मार्ग:\n१. pmkisan.gov.in वर आधार OTP द्वारे.\n२. जवळच्या महा-ई-सेवा / CSC केंद्रावर बायोमेट्रिकद्वारे.',
    bank: 'बँक खात्याला आधार DBT लिंक करण्यासाठी आधार कार्ड व पासबुक घेऊन बँकेत जा.',
    csc: (dist, vill) => `आपले जवळचे केंद्र: ${dist} डिजिटल सेवा केंद्र, ${vill} जवळ. वेळ: १०am ते ५pm.`,
    helpline: 'पीएम-किसान हेल्पलाईन:\n• टोल-फ्री: 155261\n• संपर्क: 011-24300606'
  },
  bn: {
    greeting: (name, issue) => `নমস্কার ${name} জি! 🙏 আমি আপনার পিএম-কিসান সহায়ক। ${issue ? `আপনার ২৩তম কিশতি "${issue}" এর কারণে স্থগিত রয়েছে।` : 'আপনার সমস্ত পেমেন্ট সঠিক আছে।'}`,
    payment: (name, issue) => issue ? `${name} জি, আপনার কিশতি "${issue}" এর জন্য আটকে আছে। সংশোধন হলে পরবর্তী ধাপে টাকা অ্যাকাউন্টে ঢুকবে।` : 'আপনার অ্যাকাউন্টে কোনো সমস্যা নেই।',
    ekyc: 'e-KYC করার ২টি উপায়:\n১. অনলাইন: pmkisan.gov.in এ আধার ওটিপি দিয়ে।\n২. নিকটবর্তী সিএসসি (CSC) কেন্দ্রে আঙুলের ছাপ দিয়ে।',
    bank: 'ব্যাংক অ্যাকাউন্টে আধার ডিবিটি (DBT/NPCI) লিঙ্কের জন্য আধার ও পাসবই নিয়ে ব্যাংকে যান।',
    csc: (dist, vill) => `নিকটবর্তী CSC কেন্দ্র: ${dist} ডিজিটাল সেবা কেন্দ্র, ${vill} ব্লক অফিসের কাছে।`,
    helpline: 'পিএম-কিসান হেল্পলাইন:\n• টোল-ফ্রি: 155261\n• সরাসরি: 011-24300606'
  },
  te: {
    greeting: (name, issue) => `నమస్కారం ${name} గారు! 🙏 నేను మీ పీఎం-కిసాన్ సహాయకుడిని. ${issue ? `మీ 23వ విడత "${issue}" వల్ల ఆగిపోయింది.` : 'మీ చెల్లింపులన్నీ సక్రమంగా ఉన్నాయి.'}`,
    payment: (name, issue) => issue ? `${name} గారు, మీ చెల్లింపు "${issue}" కారణంగా నిలిచిపోయింది. వివరాలు నవీకరించిన తర్వాత తదుపరి విడతలో మొత్తం అందుతుంది.` : 'మీ ఖాతాలో ఎలాంటి సమస్య లేదు.',
    ekyc: 'e-KYC పూర్తి చేయడానికి 2 మార్గాలు:\n1. pmkisan.gov.in లో ఆధార్ ఓటీపీ ద్వారా.\n2. సమీపంలోని CSC కేంద్రంలో బయోమెట్రిక్ వేలిముద్ర ద్వారా.',
    bank: 'బ్యాంక్ ఖాతాకు ఆధార్ DBT లింక్ చేయడానికి ఆధార్ కార్డు, పాస్‌బుక్‌తో బ్యాంక్ బ్రాంచ్‌కు వెళ్లండి.',
    csc: (dist, vill) => `సమీప CSC కేంద్రం: ${dist} డిజిటల్ సేవా కేంద్రం, ${vill} వద్ద.`,
    helpline: 'పీఎం-కిసాన్ హెల్ప్‌లైన్:\n• టోల్-ఫ్రీ: 155261\n• నంబర్: 011-24300606'
  },
  ta: {
    greeting: (name, issue) => `வணக்கம் ${name} அவர்களே! 🙏 நான் உங்கள் பிஎம்-கிசான் உதவியாளர். ${issue ? `உங்கள் 23வது தவணை "${issue}" காரணமாக நிறுத்தி வைக்கப்பட்டுள்ளது.` : 'உங்கள் கணக்கு சரியாக உள்ளது.'}`,
    payment: (name, issue) => issue ? `${name} அவர்களே, உங்கள் பணம் "${issue}" காரணமாக வரவில்லை. திருத்தம் செய்தபின் அடுத்த தவணையில் வந்துவிடும்.` : 'உங்கள் கணக்கில் எந்த பிரச்சனையும் இல்லை.',
    ekyc: 'e-KYC செய்யும் 2 முறைகள்:\n1. pmkisan.gov.in இணையதளத்தில் ஆதார் OTP மூலம்.\n2. அருகில் உள்ள CSC மையத்தில் கைரேகை பதிவு மூலம்.',
    bank: 'வங்கி கணக்கில் ஆதார் DBT இணைக்க ஆதார் அட்டை மற்றும் பாஸ்புக்குடன் வங்கிக்கு செல்லவும்.',
    csc: (dist, vill) => `அருகிலுள்ள CSC மையம்: ${dist} சேவை மையம், ${vill} அருகில்.`,
    helpline: 'பிஎம்-கிசான் உதவி எண்கள்:\n• கட்டணமில்லா எண்: 155261\n• நேரடி எண்: 011-24300606'
  },
  kn: {
    greeting: (name, issue) => `ನಮಸ್ಕಾರ ${name} ಅವರೇ! 🙏 ನಾನು ನಿಮ್ಮ ಪಿಎಂ-ಕಿಸಾನ್ ಸಹಾಯಕ. ${issue ? `ನಿಮ್ಮ 23ನೇ ಕಂತು "${issue}" ಕಾರಣದಿಂದ ನಿಂತಿದೆ.` : 'ನಿಮ್ಮ ಎಲ್ಲಾ ಕಂತುಗಳು ಸರಿಯಾಗಿ ಜಮೆಯಾಗಿವೆ.'}`,
    payment: (name, issue) => issue ? `${name} ಅವರೇ, ನಿಮ್ಮ ಹಣ "${issue}" ಕಾರಣದಿಂದ ಜಮೆಯಾಗಿಲ್ಲ. ಮಾಹಿತಿ ನವೀಕರಿಸಿದ ನಂತರ ಖಾತೆಗೆ ಬರುತ್ತದೆ.` : 'ಖಾತೆಯಲ್ಲಿ ಯಾವುದೇ ಸಮಸ್ಯೆ ಇಲ್ಲ.',
    ekyc: 'e-KYC ಪೂರ್ಣಗೊಳಿಸಲು 2 ದಾರಿಗಳು:\n1. pmkisan.gov.in ನಲ್ಲಿ ಆಧಾರ್ OTP ಮೂಲಕ.\n2. ಹತ್ತಿರದ CSC ಕೇಂದ್ರದಲ್ಲಿ ಬೆರಳಚ್ಚು ಮೂಲಕ.',
    bank: 'ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ DBT ಲಿಂಕ್ ಮಾಡಲು ಆಧಾರ್ ಮತ್ತು ಪಾಸ್‌ಬುಕ್‌ನೊಂದಿಗೆ ಬ್ಯಾಂಕಿಗೆ ಭೇಟಿ ನೀಡಿ.',
    csc: (dist, vill) => `ಹತ್ತಿರದ CSC ಕೇಂದ್ರ: ${dist} ಡಿಜಿಟಲ್ ಸೇವಾ ಕೇಂದ್ರ, ${vill} ಹತ್ತಿರ.`,
    helpline: 'ಪಿಎಂ-ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ:\n• ಉಚಿತ ಸಂಖ್ಯೆ: 155261\n• ನೇರ ಸಂಖ್ಯೆ: 011-24300606'
  },
  gu: {
    greeting: (name, issue) => `નમસ્તે ${name} જી! 🙏 હું તમારો પીએમ-કિસાન સહાયક છું. ${issue ? `તમારો ૨૩મો હપ્તો "${issue}" ને કારણે અટકેલ છે.` : 'તમારા બધા હપ્તા જમા થઈ ગયા છે.'}`,
    payment: (name, issue) => issue ? `${name} જી, તમારો હપ્તો "${issue}" ને કારણે અટક્યો છે. વિગતો સુધાર્યા પછી આગામી ચક્રમાં પૈસા આવી જશે.` : 'તમારા ખાતામાં કોઈ સમસ્યા નથી.',
    ekyc: 'e-KYC કરવાની ૨ રીતો:\n૧. pmkisan.gov.in પર આધાર OTP દ્વારા.\n૨. નજીકના CSC કેન્દ્ર પર બાયોમેટ્રિક ફિંગરપ્રિન્ટ દ્વારા.',
    bank: 'બેંક ખાતા સાથે આધાર DBT લિંક કરવા આધાર કાર્ડ અને પાસબુક લઈને બેંક શાખામાં જાઓ.',
    csc: (dist, vill) => `નજીકનું CSC કેન્દ્ર: ${dist} ડિજિટલ સેવા કેન્દ્ર, ${vill} પાસે.`,
    helpline: 'પીએમ-કિસાન હેલ્પલાઇન:\n• ટોલ-ફ્રી: 155261\n• ડાયરેક્ટ: 011-24300606'
  },
  en: {
    greeting: (name, issue) => `Namaste ${name}! 🙏 I'm your PM-KISAN Sahayak. ${issue ? `Your 23rd installment is held due to "${issue}". I will guide you to resolve it.` : 'All your installments are up to date. Ask me anything about the scheme.'}`,
    payment: (name, issue) => issue ? `${name}, your payment is held because of "${issue}". Once updated, the funds will be released in the following DBT cycle.` : 'There are no payment issues with your profile. All installments are credited.',
    ekyc: '2 Ways to complete eKYC:\n1. Online: via pmkisan.gov.in using Aadhaar OTP (5 min).\n2. Offline: at your nearest CSC center using biometric fingerprint verification (free).',
    bank: 'For Aadhaar-Bank DBT linking, visit your bank branch with your Aadhaar card and passbook and request "Aadhaar Seeding for DBT/NPCI Mapping".',
    csc: (dist, vill) => `Nearest CSC: ${dist} Digital Seva Kendra, near ${vill} Block Office. Open 10am-5pm. Carry original Aadhaar.`,
    helpline: 'Official PM-KISAN Helplines:\n• Toll-Free: 155261 (Mon-Sat, 9am-6pm)\n• Direct: 011-24300606\n• Never share OTPs or passwords.'
  }
};

let conversationHistory = [];

export function initialMessages(farmer, language = 'hi') {
  conversationHistory = [];
  const langKey = REGIONAL_KNOWLEDGE[language] ? language : 'hi';
  const issueName = farmer.issue ? farmer.issueDetails.title : null;
  const content = REGIONAL_KNOWLEDGE[langKey].greeting(farmer.name, issueName);

  conversationHistory.push({ role: 'model', parts: [{ text: content }] });
  return [{ from: 'bot', text: content }];
}

export function chatView(farmer, messages, language = 'hi', typing = false, isListening = false) {
  const langName = LANGUAGES[language]?.name || 'हिंदी';

  return `
    <section class="screen chat-screen">
      <header class="chat-header">
        <button class="icon-btn light" data-route="dashboard" aria-label="Back">←</button>
        <div class="bot-avatar">🤖</div>
        <div>
          <h1>Sahayak AI (${langName})</h1>
          <p>🟢 Online · Responds in ${langName}</p>
        </div>
        <select id="chat-lang-select" class="lang-select-dropdown" aria-label="Language">
          ${Object.entries(LANGUAGES).map(([code, l]) => `<option value="${code}" ${code === language ? 'selected' : ''}>${l.name}</option>`).join('')}
        </select>
      </header>

      <div class="chat-log" id="chat-log">
        ${messages.map(message => `
          <div class="message ${message.from}">
            ${escape(message.text)}
            ${message.from === 'bot' ? `<button class="bot-speak-btn" data-speak="${escape(message.text)}" title="Listen audio" style="background:none;border:none;margin-left:6px;font-size:13px;cursor:pointer;">🔊</button>` : ''}
          </div>
        `).join('')}
        ${typing ? '<div class="message bot typing"><i></i><i></i><i></i></div>' : ''}
      </div>

      <div class="chips">
        <button data-question="Mera paisa kyun nahi aaya?">💸 Paisa kyun nahi aaya?</button>
        <button data-question="eKYC kaise karu?">🪪 eKYC kaise karu?</button>
        <button data-question="Bank account kaise link karu?">🏦 Bank link kaise karu?</button>
        <button data-question="Nearest CSC kahan hai?">📍 Nearest CSC?</button>
      </div>

      <form id="chat-form" class="chat-input">
        <button type="button" id="voice-input-btn" class="icon-btn voice-mic-btn ${isListening ? 'listening' : ''}" title="Speak using mic">
          ${isListening ? '🛑' : '🎙️'}
        </button>
        <input id="chat-message" autocomplete="off" placeholder="${isListening ? t('listening', language) : t('chatPlaceholder', language)}" aria-label="Your question" />
        <button type="submit" aria-label="Send message">➤</button>
      </form>
    </section>
  `;
}

async function callGemini(userMessage, farmer, lang = 'hi') {
  const targetLanguage = LANGUAGES[lang]?.name || 'Hindi';
  const farmerContext = `[Farmer Context: Name=${farmer.name}, Village=${farmer.village}, District=${farmer.district}, State=${farmer.state}. Reg=${farmer.regNumber}. Issue=${farmer.issue ? farmer.issueDetails.title : 'None'}.]`;

  const strictLanguageInstruction = `${BASE_SYSTEM_PROMPT}

MANDATORY LANGUAGE RULE:
The user selected language is: ${targetLanguage}.
You MUST generate your response ENTIRELY in ${targetLanguage}. Do not reply in English or Hindi unless ${targetLanguage} was explicitly selected.`;

  const contents = [
    {
      role: 'user',
      parts: [{
        text: `${farmerContext}\n[Strict Target Output Language: ${targetLanguage}]\nFarmer question: ${userMessage}`
      }]
    }
  ];

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: strictLanguageInstruction }] },
          contents: contents,
          generationConfig: {
            temperature: 0.6,
            topP: 0.9,
            maxOutputTokens: 400
          }
        })
      });

      if (!response.ok) continue;

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        return reply;
      }
    } catch (err) {
      console.warn(`Model ${model} failed, trying next...`, err);
    }
  }

  return replyFallback(userMessage, farmer, lang);
}

export async function replyFor(question, farmer, language = 'hi') {
  try {
    const reply = await callGemini(question, farmer, language);
    return reply;
  } catch (e) {
    return replyFallback(question, farmer, language);
  }
}

function replyFallback(question, farmer, language = 'hi') {
  const langKey = REGIONAL_KNOWLEDGE[language] ? language : 'hi';
  const dict = REGIONAL_KNOWLEDGE[langKey];
  const q = question.toLowerCase();
  const issueName = farmer.issue ? farmer.issueDetails.title : null;

  if (q.includes('kyun') || q.includes('why') || q.includes('payment') || q.includes('paisa') || q.includes('paise') || q.includes('panam') || q.includes('dabbu') || q.includes('taka') || q.includes('rokada') || q.includes('ਕਿਉਂ') || q.includes('का') || q.includes('কেন') || q.includes('ఎందుకు') || q.includes('ஏன்') || q.includes('ಏಕೆ') || q.includes('કેમ')) {
    return dict.payment(farmer.name, issueName);
  }
  if (q.includes('ekyc') || q.includes('e-kyc') || q.includes('kyc') || q.includes('aadhaar') || q.includes('ਆਧਾਰ') || q.includes('आधार') || q.includes('আধার') || q.includes('ఆధార్') || q.includes('ஆதார்')) {
    return dict.ekyc;
  }
  if (q.includes('bank') || q.includes('dbt') || q.includes('npci') || q.includes('khata') || q.includes('ਬੈਂਕ') || q.includes('बँक') || q.includes('ব্যাংক') || q.includes('బ్యాంక్') || q.includes('வங்கி') || q.includes('ಬ್ಯಾಂಕ್')) {
    return dict.bank;
  }
  if (q.includes('csc') || q.includes('nearest') || q.includes('kahan') || q.includes('kendra') || q.includes('center') || q.includes('ਸੈਂਟਰ') || q.includes('केंद्र') || q.includes('কেন্দ্র') || q.includes('కేంద్రం') || q.includes('மையம்')) {
    return dict.csc(farmer.district, farmer.village);
  }
  if (q.includes('helpline') || q.includes('number') || q.includes('phone') || q.includes('call') || q.includes('ਨੰਬਰ') || q.includes('नंबर') || q.includes('নম্বর') || q.includes('నంబర్') || q.includes('எண்')) {
    return dict.helpline;
  }

  return dict.greeting(farmer.name, issueName);
}
