/**
 * Generate character-voice MP3s for every phrase in src/data/phrases.ts using ElevenLabs.
 *
 * Usage:
 *   1) Put your key in .env.local:  ELEVENLABS_API_KEY=sk_...
 *      (optional) ELEVENLABS_VOICE_ID=<voice id>       — defaults to "Aria" (warm, multilingual)
 *      (optional) ELEVENLABS_MODEL_ID=eleven_multilingual_v2
 *   2) npm run generate-audio
 *
 * Idempotent: any MP3 that already exists is skipped, so re-running only fills in missing files.
 * Set FORCE=true to re-generate everything.
 *
 * Output tree:
 *   public/audio/en/<phrase-key>.mp3
 *   public/audio/de/<phrase-key>.mp3
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_PHRASES, type Phrase } from '../src/data/phrases.ts';

// ---------- ENV LOADING ----------
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, '..');
const envPath = join(projectRoot, '.env.local');

if (existsSync(envPath)) {
  const raw = readFileSync(envPath, 'utf-8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
}

const API_KEY = process.env.ELEVENLABS_API_KEY;
// Aria — warm multilingual female voice. Works well in EN + DE.
// Alternatives to try by setting ELEVENLABS_VOICE_ID:
//   9BWtsMINqrJLrRacOk9x = Aria (default)
//   EXAVITQu4vr4xnSDxMaL = Sarah
//   21m00Tcm4TlvDq8ikWAM = Rachel
//   pFZP5JQG7iQjIQuC4Bku = Lily (British, gentle)
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '9BWtsMINqrJLrRacOk9x';
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
const FORCE = process.env.FORCE === 'true';

if (!API_KEY) {
  console.error('❌  Missing ELEVENLABS_API_KEY in .env.local');
  console.error('   Add: ELEVENLABS_API_KEY=sk_your_key_here');
  process.exit(1);
}

// ---------- API CALL ----------
async function generateOne(text: string, filePath: string): Promise<{ skipped: boolean; bytes: number }> {
  if (!FORCE && existsSync(filePath)) {
    return { skipped: true, bytes: 0 };
  }

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY!,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.55,        // Higher = more consistent (less variation), lower = more expressive
        similarity_boost: 0.75, // How closely to match the reference voice
        style: 0.35,            // Adds slight warmth/expression — good for toddler content
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`ElevenLabs ${response.status}: ${errText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, buffer);
  return { skipped: false, bytes: buffer.length };
}

// ---------- MAIN ----------
async function main() {
  const total = ALL_PHRASES.length * 2;
  console.log(`\n🎙️  Kiddo Says — audio generation`);
  console.log(`   Voice:  ${VOICE_ID}`);
  console.log(`   Model:  ${MODEL_ID}`);
  console.log(`   Force:  ${FORCE}`);
  console.log(`   Files:  ${total} (${ALL_PHRASES.length} phrases × 2 languages)\n`);

  let generated = 0;
  let skipped = 0;
  let totalChars = 0;
  let totalBytes = 0;
  const errors: { key: string; lang: string; error: string }[] = [];

  const langs: Array<{ code: 'en' | 'de'; label: string }> = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
  ];

  for (let i = 0; i < ALL_PHRASES.length; i++) {
    const phrase: Phrase = ALL_PHRASES[i];
    const progress = `[${i + 1}/${ALL_PHRASES.length}]`;

    for (const lang of langs) {
      const text = phrase[lang.code];
      const filePath = join(projectRoot, 'public', 'audio', lang.code, `${phrase.key}.mp3`);

      try {
        const result = await generateOne(text, filePath);
        if (result.skipped) {
          skipped += 1;
          console.log(`⏭  ${progress} ${lang.label}  ${phrase.key.padEnd(20)}  (already exists)`);
        } else {
          generated += 1;
          totalChars += text.length;
          totalBytes += result.bytes;
          console.log(`✅ ${progress} ${lang.label}  ${phrase.key.padEnd(20)}  ${text}`);
        }
        // Gentle pace — avoid burst rate limits
        await new Promise((r) => setTimeout(r, 150));
      } catch (err: any) {
        errors.push({ key: phrase.key, lang: lang.label, error: err.message });
        console.error(`❌ ${progress} ${lang.label}  ${phrase.key}: ${err.message}`);
        // If we hit auth/quota errors, stop early rather than burning through
        if (err.message.includes('401') || err.message.includes('quota')) {
          console.error('\n⚠️   Stopping early — auth or quota issue. Fix and re-run.');
          break;
        }
      }
    }
  }

  console.log(`\n📊 Summary`);
  console.log(`   Generated:  ${generated} files`);
  console.log(`   Skipped:    ${skipped} files (already existed)`);
  console.log(`   Characters: ${totalChars}`);
  console.log(`   Size:       ${(totalBytes / 1024).toFixed(1)} KB`);
  if (errors.length) {
    console.log(`   Errors:     ${errors.length}`);
    for (const e of errors) console.log(`     - ${e.lang} ${e.key}: ${e.error}`);
  }
  console.log(`\n🎉 Done!\n`);
}

main().catch((err) => {
  console.error('\n💥 Fatal error:', err);
  process.exit(1);
});
