// NEXORA DR TEST — Speech Narration Engine
// Provides browser-generated SpeechSynthesis audio assistance for questions

export class SpeechEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isSupported = this.synth !== null && typeof SpeechSynthesisUtterance !== 'undefined';
  }

  speak(text, lang = 'en') {
    if (!this.isSupported || !text) return false;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-CA';
    utterance.rate = 0.95; // Slightly slower, measured cadence for clear understanding
    utterance.pitch = 1.0;

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    return true;
  }

  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  isSpeaking() {
    return this.synth ? this.synth.speaking : false;
  }
}
