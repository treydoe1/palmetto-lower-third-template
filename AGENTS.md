# Palmetto Boys State Lower Third Agent Guide

This repository contains an editable HyperFrames recreation of the Palmetto Boys State lower third from the supplied `J.D. Larson.mov` reference. Keep the composition as a transparent-background broadcast overlay.

## Editing Contract

- Edit the lower-third text in `index.html`, inside the `LOWER_THIRD` object:
  ```js
  const LOWER_THIRD = {
    name: "J.D. LARSON",
    title: "AMERICAN LEGION NATIONAL VICE COMMANDER",
  };
  ```
- All visible text must stay uppercase and left-justified.
- The badge remains anchored on the left. The text block starts at the same left x-position for every name/title.
- Do not add a background plate, card, shadow, glow, gradient, or decorative canvas. The canvas must remain transparent.
- Keep text alphabet-safe: A-Z, punctuation, and longer names/titles must fit without clipping. The existing `fitToWidth` helper handles long strings; keep it unless replacing it with an equivalent.
- Preserve the `data-duration="11.011"` timing unless intentionally changing the animation length.
- Preserve the transparent render target. For production alpha delivery, use the interactive render script so the user is asked where to save the file first:
  ```bash
  npm run render
  ```
- Render exports live on the local computer only. Do not commit `renders/`, `outputs/`, `.mov`, `.webm`, or preview still exports unless explicitly requested.

## Visual Reference

- Reference video: `reference/J.D. Larson.mov`
- Local exports: `../outputs/`
- The measured held-frame bbox should stay close to reference `(67,803)-(1064,1010)` on a 1920x1080 canvas.

## Verification Checklist

Run this before handing off changes:

```bash
npm run check
npm run render
ffprobe -hide_banner -show_streams -select_streams v:0 path/to/lower-third-transparent.mov
```

Expected:

- `npm run check` has no errors.
- `ffprobe` shows an alpha-capable MOV, typically ProRes 4444 with `pix_fmt=yuva444p12le` at 60fps.
- HyperFrames may warn that GSAP-controlled elements cannot be drag-edited in Studio. That is expected because the animated entrance/exit intentionally owns those positions.
- Contrast warnings are expected on a transparent canvas because the validator has no real video background behind the white text.

## HyperFrames Project Notes

## Skills

This project uses AI agent skills for framework-specific patterns. Install them if not already present:

```bash
npx skills add heygen-com/hyperframes
```

Skills encode patterns like `window.__timelines` registration, `data-*` attribute semantics, Tailwind v4 browser-runtime styling for `--tailwind` projects, and shader-compatible CSS rules that are not in generic web docs. Using them produces correct compositions from the start.

## Commands

```bash
npm run dev          # start the preview server (long-running — keep it alive in background)
npm run check        # lint + validate + inspect
npm run render       # ask where to save, then render transparent ProRes 4444 MOV at 60fps
npm run render:raw   # raw HyperFrames render command for advanced/manual output flags
npm run publish      # publish and get a shareable link
npx hyperframes docs <topic> # reference docs in terminal
```

> **`npm run dev` is a long-running server, not a one-shot command.** It blocks until stopped.
> Always run it as a background process so it stays alive while you edit compositions.
> Running it in the foreground will time out and kill the server, breaking the browser preview.

## Project Structure

- `index.html` — main composition (root timeline)
- `compositions/` — sub-compositions referenced via `data-composition-src`
- `assets/` — media files (video, audio, images)
- `meta.json` — project metadata (id, name)
- `transcript.json` — whisper word-level transcript (if generated)

## Linting — Always Run After Changes

After creating or editing any `.html` composition, run the full check before considering the task complete:

```bash
npm run check
```

Fix all errors before presenting the result.

## Key Rules

1. Every timed element needs `data-start`, `data-duration`, and `data-track-index`
2. Visible timed elements **must** have `class="clip"` — the framework uses this for visibility control
3. GSAP timelines must be paused and registered on `window.__timelines`:
   ```js
   window.__timelines = window.__timelines || {};
   window.__timelines["composition-id"] = gsap.timeline({ paused: true });
   ```
4. Videos use `muted` with a separate `<audio>` element for the audio track
5. Sub-compositions use `data-composition-src="compositions/file.html"`
6. Only deterministic logic — no `Date.now()`, no `Math.random()`, no network fetches

## Documentation

Full docs: https://hyperframes.heygen.com/introduction

Machine-readable index for AI tools: https://hyperframes.heygen.com/llms.txt
