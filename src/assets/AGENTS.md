# AGENTS.md

## 1. Role

Binary files the page imports and Vite fingerprints: the self-hosted fonts, the
avatar images, and the contact icons. Stylesheets live in `src/styles`, not here.

## 2. Constraints

**Imported, not linked.** Every file here is reached through an `import` (or a
`url()` in a stylesheet), so its built name carries a content hash.

**Small and final.** Images are already compressed; the avatar ships as WebP at 1x
and 2x with a JPEG fallback.

**No orphans.** A file nothing imports is deleted.

## 3. Contents

- `AGENTS.md` — this file: what the asset folder holds.
- `fonts/` — the self-hosted HarmonyOS Sans files and their licence.
- `pig.webp` — the avatar at 1x.
- `pig@2x.webp` — the avatar at 2x.
- `pig-fallback.jpg` — the avatar for browsers without WebP.
- `Gmail.png` — the e-mail contact icon.
- `LinkedIn.svg` — the LinkedIn contact icon.
- `GitHub_Invertocat_White.svg` — the GitHub contact icon.

## 4. Progress

**Done.**

- v5 moved the stylesheets out to `src/styles`; only fonts and images remain.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
