import { escape } from './utils.js';
import { LANGUAGES, t } from './i18n.js';

const GEMINI_API_KEY = 'AIzaSyBN6J3eir0hoC3VHNTzb3NRkeDJ-uaRphIkMctmCnUX0ldNw';
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are "Sahayak AI" (सहायक AI), a friendly and helpful assistant for Indian farmers who use the PM-KISAN Yojana (Pradhan Mantri Kisan Samman Nidhi). You help farmers understand their payment status, diagnose why payments failed, and guide them step-by-step to fix issues.

RULES:
1. Always respond in the user's preferred Indian language (Hinglish/Hindi/Punjabi/Marathi/Bengali/Telugu/Tamil/Kannada/Gujarati or English).
2. Be warm, respectful. Address farmers as "ji" (e.g., "Ramesh ji").
3. Give short, clear answers. Use numbered steps when explaining processes. Keep responses under 150 words.
4. Never ask for real Aadhaar numbers, bank details, passwords, or OTPs.
5. You are a PROTOTYPE assistant — remind users this is a demo if they ask about real transactions.
6. You are NOT a government official and NOT affiliated with any government body.

KNOWLEDGE — PM-KISAN SCHEME:
- ₹6,000/year paid in 3 installments of ₹2,000 each
- Schedule: Apr-Jul (1st), Aug-Nov (2nd), Dec-Mar (3rd)
- Installments go directly to Aadhaar-linked bank accounts via DBT
- As of August 2026, 23 installments have been released since Feb 2019
- 11+ crore farmers are enrolled

COMMON PAYMENT FAILURE REASONS & FIXES:
1. eKYC Expired:
   - Annual Aadhaar-based eKYC is mandatory
   - Fix Online: Go to pmkisan.gov.in → Farmer Corner → eKYC → Enter Aadhaar → Enter OTP → Done (5 min)
   - Fix Offline: Visit nearest CSC with Aadhaar card → Biometric scan → Free of cost (30 min)

2. Aadhaar-Bank Name Mismatch:
   - Name on Aadhaar must exactly match bank account name
   - Fix: Visit bank branch → Request name correction → Carry Aadhaar + Passbook
   - OR: Update Aadhaar name at Aadhaar Seva Kendra (₹50 fee)

3. Land Records Not Linked (Land Seeding Pending):
   - Farm land records must be verified and linked
   - Fix: Visit Patwari/Lekhpal/Tehsildar office → Carry Khatauni/Jamabandi + Aadhaar + PM-KISAN registration receipt
   - Timeline: 7-15 days after submission

4. Bank Account Not Aadhaar-Seeded (NPCI Mapping):
   - Bank account must be linked to Aadhaar for DBT
   - Fix: Visit bank → Tell them "Aadhaar seeding for DBT/NPCI mapping karwana hai" → Carry Aadhaar + Passbook

HELPLINES:
- Toll-Free: 155261 (Mon-Sat, 9am-6pm)
- Direct: 011-24300606
- Toll-Free Alt: 1800-115-526
- Grievance Portal: pmkisan.gov.in/grievance.aspx
`;

let conversationHistory = [];

export function initialMessages(farmer, language = 'hi') {
  conversationHistory = [];
  const content = language === 'hi'
    ? `नमस्ते ${farmer.name} जी! 🙏 मैं आपका पीएम-किसान सहायक हूँ। ${farmer.issue ? `मुझे दिख रहा है कि आपकी "${farmer.issueDetails.title}" के कारण 23वीं किस्त रुकी है। मैं इसे हल करने में आपकी मदद करूँगा।` : 'आपके सभी भुगतान सही हैं। आप मुझसे योजना संबंधी कोई भी प्रश्न पूछ सकते हैं।'}`
    : language === 'pa'
    ? `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ${farmer.name} ਜੀ! 🙏 ਮੈਂ ਤੁਹਾਡਾ ਪੀਐਮ-ਕਿਸਾਨ ਸਹਾਇਕ ਹਾਂ। ${farmer.issue ? `ਤੁਹਾਡੀ ਕਿਸ਼ਤ "${farmer.issueDetails.title}" ਕਾਰਨ ਰੁਕੀ ਹੈ।` : 'ਸਾਰੇ ਭੁਗਤਾਨ ਠੀਕ ਹਨ।'}`
    : `Namaste ${farmer.name}! 🙏 I'm your PM-KISAN Sahayak. ${farmer.issue ? `I can see your payment needs attention because of ${farmer.issueDetails.title}. I'll help you resolve it step by step.` : 'Your payments look good. Ask me anything about PM-KISAN.'}`;

  conversationHistory.push({ role: 'model', parts: [{ text: content }] });
  return [{ from: 'bot', text: content }];
}

export function chatView(farmer, messages, language = 'hi', typing = false, isListening = false) {
  return `
    <section class="screen chat-screen">
      <header class="chat-header">
        <button class="icon-btn light" data-route="dashboard" aria-label="Back">←</button>
        <div class="bot-avatar">🤖</div>
        <div>
          <h1>Sahayak AI</h1>
          <p>🟢 Online · Powered by AI</p>
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
  const farmerContext = `[Context: Farmer name is ${farmer.name}, from ${farmer.village}, ${farmer.district}, ${farmer.state}. Registration: ${farmer.regNumber}. ${farmer.issue ? `Current issue: ${farmer.issueDetails.title} - ${farmer.issueDetails.explain}` : 'No current issues.'} Preferred language: ${LANGUAGES[lang]?.name || 'Hindi'}]`;

  const contents = [
    ...conversationHistory,
    { role: 'user', parts: [{ text: conversationHistory.length <= 1 ? `${farmerContext}\n\nFarmer asks: ${userMessage}` : userMessage }] }
  ];

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 400
        }
      })
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) throw new Error('Empty response');

    conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });
    conversationHistory.push({ role: 'model', parts: [{ text: reply }] });

    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }

    return reply;
  } catch (error) {
    console.error('Gemini API error, falling back to local reasoning:', error);
    return replyFallback(userMessage, farmer, lang);
  }
}

export async function replyFor(question, farmer, language) {
  try {
    const reply = await callGemini(question, farmer, language);
    return reply;
  } catch (e) {
    return replyFallback(question, farmer, language);
  }
}

function replyFallback(question, farmer, language) {
  const q = question.toLowerCase();
  if (q.includes('kyun') || q.includes('why') || q.includes('payment') || q.includes('paisa') || q.includes('paise')) {
    return farmer.issue
      ? `${farmer.name} जी, आपकी 23वीं किस्त "${farmer.issueDetails.title}" के कारण रुकी है। पोर्टल पर यह विवरण अपडेट होते ही आपका भुगतान आगामी चक्र में जारी कर दिया जाएगा।`
      : 'आपके खाते में कोई भुगतान समस्या नहीं है, सभी 23 किस्तें सफलतापूर्वक प्राप्त हो चुकी हैं।';
  }
  if (q.includes('ekyc') || q.includes('e-kyc')) {
    return 'ई-केवाईसी पूरा करने के 2 तरीके हैं:\n1. ऑनलाइन: pmkisan.gov.in पर Farmer Corner में जाएं और आधार ओटीपी से सत्यापित करें (5 मिनट)।\n2. ऑफलाइन: पास के सीएससी (CSC) पर मूल आधार कार्ड लेकर बायोमेट्रिक अंगूठा लगाएं।';
  }
  if (q.includes('bank')) {
    return 'बैंक लिंकिंग के लिए आधार कार्ड और बैंक पासबुक लेकर अपनी शाखा जाएं और कहें कि "डीबीटी (DBT/NPCI) मैपिंग हेतु आधार सीडिंग" करवानी है।';
  }
  if (q.includes('csc') || q.includes('nearest') || q.includes('kahan')) {
    return `आपके निकटतम सीएससी केंद्र: ${farmer.district} डिजिटल सेवा केंद्र, ${farmer.village} ब्लॉक कार्यालय के पास। समय: सुबह 10 से शाम 5 बजे तक।`;
  }
  if (q.includes('helpline') || q.includes('number') || q.includes('phone')) {
    return 'आधिकारिक पीएम-किसान हेल्पलाइन:\n• टोल-फ्री: 155261 (सोम-शनि, 9am-6pm)\n• सीधा नंबर: 011-24300606\n• किसी भी व्यक्ति को ओटीपी या पिन न बताएं।';
  }
  return `${farmer.name} जी, मैं आपकी सहायता के लिए यहाँ हूँ। आप किस्त की स्थिति, ई-केवाईसी, बैंक सीडिंग या सीएससी प्रक्रिया के बारे में पूछ सकते हैं।`;
}
