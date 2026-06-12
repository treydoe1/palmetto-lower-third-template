# Lower Third Roster Spreadsheet Format

Use this format when collecting names and subtitles for batch lower-third work.

## Required Columns

| Column | Required | Purpose |
| --- | --- | --- |
| `Render?` | No | Use `YES` for rows that should be exported. Use `NO` or blank for drafts. |
| `Order` | No | Sort/render order. |
| `Name` | Yes | Person name for the top line. Text is uppercased by the template. |
| `Subtitle` | Yes | Title, role, or subtitle for the second line. |
| `Output File Name` | Recommended | Unique `.mov` filename for that row. |
| `Save Folder` | Recommended | Folder where the rendered file should be saved. Relative paths are allowed. |
| `Notes` | No | Internal notes, pronunciation, revisions, or review comments. |
| `Status` | No | Suggested values: `Draft`, `Ready`, `Rendered`, `Needs Review`. |

## Template Files

- Editable workbook: generated locally at `../outputs/palmetto-lower-third-roster-template.xlsx`
- CSV version in repo: `templates/lower-third-roster-template.csv`

## Dependencies

Users rendering this repo need:

- Node.js 22 or newer
- `npm` / `npx`
- FFmpeg
- Internet access the first time `npx --yes hyperframes@0.6.95` resolves HyperFrames

No permanent HyperFrames install is required. The repo scripts call the pinned CLI version.

## Render Workflow

1. Fill out the `Roster` sheet or CSV.
2. For each row marked `YES`, update `LOWER_THIRD` in `index.html`.
3. Run:
   ```bash
   npm run render
   ```
4. Enter the desired save path when prompted.
5. Confirm the final MOV is ProRes 4444 with alpha.
