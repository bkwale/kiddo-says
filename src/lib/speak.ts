// PLACEHOLDER audio using browser SpeechSynthesis so we can prototype the flow
// before we generate real ElevenLabs audio. Same interface will be swapped later.

export type Lang = 'en' | 'de';

let voicesLoaded = false;
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => { voicesLoaded = true; };
  // Trigger initial voice list load
  window.speechSynthesis.getVoices();
}

function pickVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const target = lang === 'en' ? 'en' : 'de';
  // Prefer a warm female voice if we can find one
  const candidates = voices.filter((v) => v.lang.startsWith(target));
  return (
    candidates.find((v) => /female|samantha|karen|kate|hazel|petra|anna/i.test(v.name)) ??
    candidates[0]
  );
}

export function speak(text: string, lang: Lang, opts: { rate?: number; pitch?: number } = {}): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      // Fallback timing — pace so the flow still advances at a natural speed.
      setTimeout(resolve, estimateSpeechMs(text));
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-GB' : 'de-DE';
    utterance.rate = opts.rate ?? 0.9;
    utterance.pitch = opts.pitch ?? 1.15;
    const voice = pickVoice(lang);
    if (voice) utterance.voice = voice;

    let done = false;
    const finish = () => { if (!done) { done = true; resolve(); } };
    utterance.onend = finish;
    utterance.onerror = finish;

    // Hard timeout so we always advance even if TTS silently fails
    // (headless browsers, muted device, autoplay restrictions).
    const cap = Math.max(1400, estimateSpeechMs(text));
    setTimeout(finish, cap);

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      finish();
    }
  });
}

// Rough estimate: ~150ms per character, capped between 900ms and 4000ms.
function estimateSpeechMs(text: string): number {
  const n = text.trim().length;
  return Math.max(900, Math.min(4000, n * 90));
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

// Convenience helper — say English then German with a small pause between.
export async function saySequence(en: string, de: string, gapMs = 400): Promise<void> {
  await speak(en, 'en');
  await new Promise((r) => setTimeout(r, gapMs));
  await speak(de, 'de');
}

export { voicesLoaded };
