import { LANGUAGES } from './i18n.js';

let isSpeaking = false;
let currentRecognition = null;

export function speakText(text, lang = 'hi', onStart, onEnd) {
  if (!('speechSynthesis' in window)) {
    alert('Audio synthesis is not supported on this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const bcp47 = LANGUAGES[lang]?.bcp47 || 'hi-IN';
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = bcp47;
  utterance.rate = 0.92; // Slightly slower for clarity in rural regional languages
  utterance.pitch = 1.0;

  // Try to find a matching native voice
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(bcp47.slice(0, 2)) || v.lang === bcp47);
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    isSpeaking = true;
    if (onStart) onStart();
  };

  utterance.onend = () => {
    isSpeaking = false;
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    isSpeaking = false;
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(onEnd) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    if (onEnd) onEnd();
  }
}

export function isAudioSpeaking() {
  return isSpeaking;
}

export function startSpeechRecognition(lang = 'hi', onResult, onError, onEnd) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (onError) onError('Speech recognition not supported in this browser. Try Chrome/Edge.');
    return null;
  }

  if (currentRecognition) {
    currentRecognition.abort();
  }

  const bcp47 = LANGUAGES[lang]?.bcp47 || 'hi-IN';
  const recognition = new SpeechRecognition();
  recognition.lang = bcp47;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (onResult) onResult(transcript);
  };

  recognition.onerror = (event) => {
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    currentRecognition = null;
    if (onEnd) onEnd();
  };

  try {
    recognition.start();
    currentRecognition = recognition;
    return recognition;
  } catch (err) {
    if (onError) onError(err.message);
    return null;
  }
}

export function stopSpeechRecognition() {
  if (currentRecognition) {
    currentRecognition.stop();
    currentRecognition = null;
  }
}
