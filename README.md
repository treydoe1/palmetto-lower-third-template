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
- Local exports are written outside the repo, usually to `../outputs/`
- `renders/` is ignored so finished video exports stay on this computer

## Commands

```bash
npm run dev
npm run check
npx --yes hyperframes@0.6.95 render --format mov --quality high --fps 30 --output ../outputs/lower-third-transparent.mov
```

## Verification

The final MOV should report an alpha-capable codec/pixel format:

```bash
ffprobe -hide_banner -show_streams -select_streams v:0 ../outputs/lower-third-transparent.mov
```

Expected:

```text
codec_name=prores
codec_tag_string=ap4h
pix_fmt=yuva444p12le
```
