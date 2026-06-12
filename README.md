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
- `SPREADSHEET_FORMAT.md` - roster spreadsheet columns, workflow, and dependency notes
- `templates/lower-third-roster-template.csv` - fillable CSV roster template
- `assets/` - embedded badge and local font files
- `reference/J.D. Larson.mov` - original reference video
- Local exports are written outside the repo, usually to `../outputs/`
- `renders/` is ignored so finished video exports stay on this computer

## Roster Spreadsheet

Use `templates/lower-third-roster-template.csv` or the generated workbook at `../outputs/palmetto-lower-third-roster-template.xlsx` to collect names and subtitles. Required fields are `Name` and `Subtitle`; `Output File Name` and `Save Folder` are recommended for batch export organization.

## Commands

```bash
npm run dev
npm run check
npm run render
```

`npm run render` asks where the transparent MOV should be saved before rendering. Press Enter to use `../outputs/lower-third-transparent.mov`, or paste any absolute/relative path. If the file exists, the script asks before overwriting it.

## Dependencies

- Node.js 22+
- `npm` / `npx`
- FFmpeg
- HyperFrames CLI via `npx --yes hyperframes@0.6.95`

The fonts, badge artwork, and reference video are included in the repo.

## Verification

The final MOV should report an alpha-capable codec/pixel format:

```bash
ffprobe -hide_banner -show_streams -select_streams v:0 path/to/lower-third-transparent.mov
```

Expected:

```text
codec_name=prores
codec_tag_string=ap4h
pix_fmt=yuva444p12le
r_frame_rate=60/1
```
