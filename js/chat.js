import { escape } from './utils.js';

const GEMINI_API_KEY = 'AIzaSyBN6J3eir0hoC3VHNTzb3NRkeDJ-uaRphIkMctmCnUX0ldNw';
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are "Sahayak AI" (सहायक AI), a friendly and helpful assistant for Indian farmers who use the PM-KISAN Yojana (Pradhan Mantri Kisan Samman Nidhi). You help farmers understand their payment status, diagnose why payments failed, and guide them step-by-step to fix issues.

RULES:
1. Always respond in simple Hinglish (Hindi written in English + some Hindi words). If the user writes in English, reply in simple English. Match their language.
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

5. Ineligible Category:
   - Income tax payers, government employees, pensioners (>₹10,000/month) are NOT eligible
   - If wrongly flagged, file grievance at pmkisan.gov.in/grievance.aspx

HELPLINES:
- Toll-Free: 155261 (Mon-Sat, 9am-6pm)
- Direct: 011-24300606
- Toll-Free Alt: 1800-115-526
- Grievance Portal: pmkisan.gov.in/grievance.aspx

SCAM WARNING:
- PM-KISAN has NO WhatsApp helpline
- Government will NEVER ask for money to release payments
- Never share OTP, Aadhaar, or bank details with anyone

If you don't know the answer, say so honestly and suggest calling the helpline 155261.`;

// Conversation history for Gemini context
let conversationHistory = [];

export function initialMessages(farmer, language = 'en') {
  // Reset conversation history for new session
  conversationHistory = [];
  
  const content = language === 'hi'
    ? `Namaste ${farmer.name} ji! 🙏 Main aapka PM-KISAN Sahayak hoon. ${farmer.issue ? `Mujhe dikha raha hai ki aapki ${farmer.issueDetails.title} ki wajah se payment ruki hai. Main aapko solve karne mein help karunga.` : 'Aapke payments theek hain. Aap mujhse PM-KISAN ke baare mein kuch bhi pooch sakte hain.'}`
    : `Namaste ${farmer.name}! 🙏 I'm your PM-KISAN Sahayak. ${farmer.issue ? `I can see your payment needs attention because of ${farmer.issueDetails.title}. I'll help you resolve it step by step.` : 'Your payments look good. Ask me anything about PM-KISAN.'}`;
  
  // Add the initial bot message to conversation history
  conversationHistory.push({ role: 'model', parts: [{ text: content }] });
  
  return [{ from: 'bot', text: content }];
}

export function chatView(farmer, messages, language = 'en', typing = false) {
  return `<section class="screen chat-screen">
    <header class="chat-header"><button class="icon-btn light" data-route="dashboard" aria-label="Back">←</button><div class="bot-avatar">🤖</div><div><h1>Sahayak AI</h1><p>🟢 Online · Powered by Gemini AI</p></div><button class="language-toggle" data-action="language">${language === 'en' ? 'हिंदी' : 'English'}</button></header>
    <div class="chat-log" id="chat-log">${messages.map(message => `<div class="message ${message.from}">${escape(message.text)}</div>`).join('')}${typing ? '<div class="message bot typing"><i></i><i></i><i></i></div>' : ''}</div>
    <div class="chips"><button data-question="Mera paisa kyun nahi aaya?">💸 Paisa kyun nahi aaya?</button><button data-question="eKYC kaise karu?">🪪 eKYC kaise karu?</button><button data-question="Bank account kaise link karu?">🏦 Bank link kaise karu?</button><button data-question="Nearest CSC kahan hai?">📍 Nearest CSC?</button></div>
    <form id="chat-form" class="chat-input"><input id="chat-message" autocomplete="off" placeholder="Type your question / अपना सवाल लिखें..." aria-label="Your question" /><button aria-label="Send message">➤</button></form>
  </section>`;
}

// Call Gemini API
async function callGemini(userMessage, farmer) {
  // Add farmer context to the first user message
  const farmerContext = `[Context: Farmer name is ${farmer.name}, from ${farmer.district}, ${farmer.state}. Registration: ${farmer.regNumber}. ${farmer.issue ? `Current issue: ${farmer.issueDetails.title} - ${farmer.issueDetails.explain}` : 'No current issues.'}]`;
  
  // Build the request with conversation history
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

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) throw new Error('Empty response');

    // Update conversation history
    conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });
    conversationHistory.push({ role: 'model', parts: [{ text: reply }] });

    // Keep conversation history manageable (last 10 exchanges)
    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }

    return reply;
  } catch (error) {
    console.error('Gemini API error:', error);
    // Fallback to pre-scripted responses
    return replyFallback(userMessage, farmer, 'hi');
  }
}

// Main reply function — tries Gemini first, falls back to pre-scripted
export async function replyFor(question, farmer, language) {
  try {
    const reply = await callGemini(question, farmer);
    return reply;
  } catch (e) {
    return replyFallback(question, farmer, language);
  }
}

// Pre-scripted fallback responses
function replyFallback(question, farmer, language) {
  const q = question.toLowerCase(); const hi = language === 'hi';
  if (q.includes('kyun') || q.includes('why') || q.includes('payment') || q.includes('paisa')) return farmer.issue ? (hi ? `${farmer.name} ji, aapka payment ${farmer.issueDetails.title} ke kaaran roka gaya hai. Pehle verification complete karein; uske baad agle payment cycle mein release ho sakta hai.` : `${farmer.name}, your payment is held because of ${farmer.issueDetails.title}. Complete the required update and it can be released in a following payment cycle.`) : (hi ? 'Aapke profile mein koi payment issue nahi dikhta.' : 'There is no payment issue visible on your profile.');
  if (q.includes('ekyc') || q.includes('e-kyc')) return hi ? 'pmkisan.gov.in par Farmer Corner mein eKYC kholen, Aadhaar number daalein aur Aadhaar-linked mobile par aaya OTP submit karein. CSC par biometric eKYC bhi kara sakte hain.' : 'Open eKYC under Farmer Corner at pmkisan.gov.in, enter Aadhaar details and submit the OTP sent to your Aadhaar-linked mobile. A CSC can also complete biometric eKYC.';
  if (q.includes('bank')) return hi ? 'Bank linking ke liye Aadhaar, passbook aur PM-KISAN registration details lekar branch jaayein. Unse Aadhaar seeding aur naam match hone ki pushti karein.' : 'Visit your bank with Aadhaar, passbook and registration details. Ask them to confirm Aadhaar seeding and that the account name matches your records.';
  if (q.includes('csc') || q.includes('nearest')) return hi ? `Aapke liye demo CSC: ${farmer.district} Digital Seva Kendra, ${farmer.village} Block Office ke paas. 10am–5pm. Aadhaar original lekar jaayein.` : `Demo CSC: ${farmer.district} Digital Seva Kendra, near ${farmer.village} Block Office, 10am–5pm. Carry your original Aadhaar card.`;
  if (q.includes('when') || q.includes('kab')) return hi ? 'Issue solve hone ke baad record update mein aam taur par kuch working days lagte hain. Installment schedule ke hisaab se payment process hoga.' : 'After the issue is resolved, records may take a few working days to update. Payment will then be processed in the next eligible cycle.';
  if (q.includes('helpline') || q.includes('phone') || q.includes('call')) return 'You can call 155261 (toll-free), 011-24300606, or 1800-115-526. Never share an OTP or bank PIN with anyone.';
  if (q.includes('land') || q.includes('seeding') || q.includes('zameen')) return hi ? 'Land seeding ka matlab hai aapke zameen ke record ko PM-KISAN registration se digitally jodna. Patwari ya Tehsildar office mein jaake ye kaam hoga.' : 'Land seeding means digitally linking your farm ownership record to your PM-KISAN registration. Visit your Patwari or Tehsildar office to get this done.';
  return hi ? `${farmer.name} ji, main aapki madad ke liye yahan hoon. Aap payment, eKYC, bank link, CSC ya helpline ke baare mein pooch sakte hain.` : `I'm here to help, ${farmer.name}. Ask me about payments, eKYC, bank linking, CSC visits, or helplines.`;
}
