# AGENTS.md

## 1. Role

The self-hosted Latin subset of HarmonyOS Sans, the display and body face of the
page. Bundling the files removes every runtime font request; Chinese text falls back
to the system's own CJK faces through the font stack.

## 2. Constraints

**WOFF2 only**, one file per weight in use: 400, 500, 700. A weight added here is
declared with `@font-face` in the stylesheet that owns the tokens, and a weight no
longer used is removed from both places.

**Keep the licence** next to the font files; it allows redistribution with the site.

**`font-display: swap`** on every face, so text is never invisible while loading.

## 3. Contents

- `AGENTS.md` — this file: which faces are bundled and why.
- `HarmonyOS_Sans_Regular.woff2` — weight 400, body text.
- `HarmonyOS_Sans_Medium.woff2` — weight 500, labels and subtitles.
- `HarmonyOS_Sans_Bold.woff2` — weight 700, titles.
- `HarmonyOS_Sans_LICENSE.txt` — the HarmonyOS Sans font licence.

## 4. Progress

**Done.**

- Three weights bundled and declared.

**Not done.**

- No variable-font build; three static files are smaller for the weights in use.

**Known defects.**

- None known.
