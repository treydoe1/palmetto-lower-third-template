# Palmetto Boys State Lower Third Template

Editable HyperFrames lower-third recreation for Palmetto Boys State, based on the supplied `J.D. Larson.mov` reference. The output is a transparent 1920x1080 broadcast overlay with an animated badge/text entrance and exit.

## Quick Edit

Open `index.html` and change:

```js
const LOWER_THIRD = {
  name: "J.D. LARSON",
  title: "AMERICAN LEGION NATIONAL VICE COMMANDER",
};
```

Text is automatically uppercased, left-justified, and fit-checked for longer names/titles.

## Files

- `index.html` - main editable HyperFrames composition
- `DESIGN.md` - visual rules and typography/color contract
- `AGENTS.md` - instructions for future coding agents
- `assets/` - embedded badge and local font files
- `reference/J.D. Larson.mov` - original reference video
- `renders/palmetto-lower-third-template.webm` - transparent alpha render
- `renders/palmetto-lower-third-template-preview.png` - preview still on black for inspection

## Commands

```bash
npm run dev
npm run check
npx --yes hyperframes@0.6.95 render --format webm --quality high --fps 30 --output renders/palmetto-lower-third-template.webm
```

## Verification

The final WebM should report alpha:

```bash
ffprobe -hide_banner -show_entries stream_tags=ALPHA_MODE -of default=nw=1 renders/palmetto-lower-third-template.webm
```

Expected:

```text
TAG:ALPHA_MODE=1
```
