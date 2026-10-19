# AGENTS.md

## 1. Role

Static files that Vite copies, unchanged and unhashed, to the root of the built
site. They are what browsers, crawlers, and the home screen read before or beside
the page itself: the icon, the web-app manifest, the crawler rules, and the
sitemap.

Anything the page imports belongs in `src/assets/` instead, where Vite fingerprints
it.

## 2. Constraints

**Root-relative names are public URLs.** Renaming a file here breaks the links in
`index.html` and in the files that point at each other (`robots.txt` points at the
sitemap).

**This file is not deployed.** Vite copies the whole folder, so the build removes
`dist/AGENTS.md` afterwards (see `vite.config.js`). Do not put anything here that
must stay private.

**Colours match the page.** The manifest's `theme_color` and `background_color`
follow the deep-space background of the site and `theme-color` in `index.html`.

**Keep the sitemap honest.** Update `lastmod` when the page content changes.

## 3. Contents

- `AGENTS.md` — this file: what lives at the site root and how it is kept.
- `icon-192.png` — the site icon, the Apple touch icon, and the manifest icon.
- `manifest.json` — the web-app manifest: names, start URL, colours, icon.
- `robots.txt` — allows all crawlers and names the sitemap.
- `sitemap.xml` — the one-URL sitemap of the site.

## 4. Progress

**Done.**

- Icon, manifest, robots, and sitemap are in place and linked from `index.html`.

**Not done.**

- No larger icon sizes (512 px or maskable) in the manifest.

**Known defects.**

- None known.
