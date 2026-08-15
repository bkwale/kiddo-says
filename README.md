# Kiddo Says

A bilingual (English + German) musical learning PWA for toddlers.

**Live:** https://kiddo-says.vercel.app

## For a 2-year-old

- **Otto** the friendly octopus mascot introduces every concept
- **Auto-flow** — tap a world, sit back. Intro → real animal video → find-the-animal → praise → next.
- **Bilingual audio** on every word and phrase (EN + DE)
- **Songs** — classic nursery rhymes he'll hear at nursery/Grandma's too
- **No fail sounds** — gentle reprompts, never a red X
- **Big touch targets**, no reading required

## Local dev

```bash
npm install
npm run dev
# Open http://localhost:5173
```

## Generate the character voice audio (ElevenLabs)

MP3s are shipped as static files in `public/audio/{en,de}/`. To (re)generate:

1. Copy `.env.local.example` → `.env.local` and paste your ElevenLabs API key
2. Run:

   ```bash
   npm run generate-audio
   ```

   Idempotent — skips MP3s that already exist. Set `FORCE=true` to re-generate everything.

3. Commit the `public/audio/` folder and push. Vercel auto-redeploys.

The app auto-detects when MP3s exist; if not, it falls back to browser SpeechSynthesis so the app still works during development.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion (used sparingly — `whileHover`/`whileTap` only)
- Zustand for state
- vite-plugin-pwa for install-to-home-screen
- ElevenLabs for character voice
- Free Pexels / Pixabay videos for real animal footage
