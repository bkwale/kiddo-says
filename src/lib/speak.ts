// Audio playback layer.
// Prefers pre-generated ElevenLabs MP3 files at /audio/{lang}/{key}.mp3.
// Falls back to browser SpeechSynthesis if the MP3 isn't there yet
// (so the app works before we've generated audio, and during dev).

import { ALL_PHRASES, type Phrase } from '../data/phrases';

export type Lang = 'en' | 'de';

// Build a fast lookup by key
const PHRASE_MAP = new Map<string, Phrase>();
for (const p of ALL_PHRASES) PHRASE_MAP.set(p.key, p);

// Track which keys we've confirmed exist / don't exist so we don't hit 404
// repeatedly. Persists for the session.
const mp3Cache = new Map<string, boolean>();

async function mp3Exists(key: string, lang: Lang): Promise<boolean> {
  const cacheKey = `${lang}/${key}`;
  const cached = mp3Cache.get(cacheKey);
  if (cached !== undefined) return cached;
  try {
    const res = await fetch(`/audio/${lang}/${key}.mp3`, { method: 'HEAD' });
    const ok = res.ok;
    mp3Cache.set(cacheKey, ok);
    return ok;
  } catch {
    mp3Cache.set(cacheKey, false);
    return false;
  }
}

// ---------- SpeechSynthesis helpers (fallback) ----------
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {};
  window.speechSynthesis.getVoices();
}

function pickVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const target = lang === 'en' ? 'en' : 'de';
  const candidates = voices.filter((v) => v.lang.startsWith(target));
  return (
    candidates.find((v) => /female|samantha|karen|kate|hazel|petra|anna/i.test(v.name)) ??
    candidates[0]
  );
}

function estimateSpeechMs(text: string): number {
  return Math.max(900, Math.min(4000, text.trim().length * 90));
}

let currentAudio: HTMLAudioElement | null = null;

// ---------- CORE PLAYBACK ----------

function playMp3(url: string): Promise<void> {
  return new Promise((resolve) => {
    stopAll();
    const audio = new Audio(url);
    currentAudio = audio;
    let done = false;
    const finish = () => { if (!done) { done = true; resolve(); } };
    audio.onended = finish;
    audio.onerror = finish;
    // Hard timeout in case metadata is broken
    setTimeout(finish, 8000);
    audio.play().catch(finish);
  });
}

function speakViaTTS(text: string, lang: Lang, opts: { rate?: number; pitch?: number } = {}): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
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
    setTimeout(finish, Math.max(1400, estimateSpeechMs(text)));

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      finish();
    }
  });
}

// ---------- PUBLIC API ----------

/** Play a phrase by KEY (preferred). Uses MP3 if it exists, otherwise falls back to TTS. */
export async function playPhrase(key: string, lang: Lang): Promise<void> {
  if (await mp3Exists(key, lang)) {
    return playMp3(`/audio/${lang}/${key}.mp3`);
  }
  const phrase = PHRASE_MAP.get(key);
  if (phrase) return speakViaTTS(phrase[lang], lang);
  console.warn(`playPhrase: unknown key "${key}"`);
}

/** Play arbitrary text via TTS (no pre-generated audio). Use for edge cases. */
export function speak(text: string, lang: Lang, opts: { rate?: number; pitch?: number } = {}): Promise<void> {
  return speakViaTTS(text, lang, opts);
}

/** Say English then German with a small gap. Uses phrase key if provided, otherwise raw text. */
export async function saySequenceByKey(key: string, gapMs = 400): Promise<void> {
  await playPhrase(key, 'en');
  await new Promise((r) => setTimeout(r, gapMs));
  await playPhrase(key, 'de');
}

/** Same but with raw text (legacy). */
export async function saySequence(en: string, de: string, gapMs = 400): Promise<void> {
  await speak(en, 'en');
  await new Promise((r) => setTimeout(r, gapMs));
  await speak(de, 'de');
}

export function stopAll() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}

// Aliases kept for existing callers.
export const stopSpeaking = stopAll;
