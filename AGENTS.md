# AGENTS.md

## 1. Role

`starfield` is the personal portfolio of Harry Zhu (GitHub: StarsHarryZhu), served
at https://starsharryzhu.github.io/. It is one page, built with Vue 3 and Vite,
that introduces Harry and his work as a Computer Science student at Stony Brook
University: who he is, his experience, his projects, his skills, his education, and
how to reach him. Every visible string exists in English and Chinese.

The page is read top to bottom: a hero, then six numbered sections (01 About,
02 Experience, 03 Projects, 04 Toolkit next to 05 Education, 06 Contact), then a
footer. Projects come in two tiers: featured work as wide cards and the rest in a
two-column grid. Each card opens its case study in a floating dialog.

The visual language is a deep-space nebula with liquid-glass panels and gaseous
motion, after the "immersive light" design of HarmonyOS: light and vapour answer
the reader's actions and the page is quiet when nobody acts.

## 2. Constraints

These apply to every file in this repository.

**Content is true.** Every claim has a source: a project's own repository, the
intro files in `projects/`, the LaTeX resume kept outside git in `doc/`, or Harry
himself. Do not invent dates, metrics, or links. A `period` is filled only when a
source records it; `links` list only URLs that exist. Never publish a phone number.

**Two languages, one structure.** Interface strings live in `src/i18n/messages.js`;
prose lives in `src/data/` as `{ en, zh }` objects. Every new string is added in
both languages. Proper nouns (institutions, project names, technologies, link
labels) stay language-neutral.

**Performance is a hard requirement.** The page must hold about 60 fps while
scrolling on a 1440 px display at 1x and a 2560 px display at 2x. Animate only
`transform` and `opacity`. Never animate `scale` on a large layer, never animate a
full-screen layer, and never put `will-change` on a large static layer. The panels
that scroll with the page never use `backdrop-filter`. No continuous `filter: blur`.
At most one canvas: the event-driven gas layer, which must sleep when idle. Each of
these rules was measured; see the Progress section of `src/AGENTS.md` before
relaxing one.

**Interaction budget.** The page has four functional interactions and no more:
scroll-in reveals, the case-study dialog, the language switch in the top bar, and
outbound links. The top bar carries information, not navigation: no anchor links,
no hero buttons. Pointer-driven light and vapour are visual feedback, not new
functions.

**No dead code.** No unused design token, i18n key, or CSS class survives a change.

**Deployment.** A push to `main` runs `.github/workflows/deploy.yml`, which builds
and publishes `dist/` to the `gh-pages` branch. `dist/` is never committed.
`vite.config.js` keeps `base: './'`. GitHub Pages gzips on its own and never
serves precompressed files, so do not add a compression plugin.

**Workspace format.** Every folder except dot-folders and ignored folders holds an
English `AGENTS.md` with exactly four sections: Role, Constraints, Contents,
Progress. Contents names every entry of its folder in one line each; details live
in the files or in the subfolder's own `AGENTS.md`. `npm run check:agents`
enforces this. Update the folder's file in the same change that alters the folder.

**Local-only folders.** `doc/` (the LaTeX resume) and `.claude/` (private notes)
are git-ignored and stay on disk. Never delete `doc/`.

**Adding a project.** Write `projects/<name>_intro.md` and add the matching
bilingual entry to `src/data/projects.js` in the same change; keep both in sync.

## 3. Contents

- `AGENTS.md` — this file: what the site is and the rules every change follows.
- `README.md` — the public one-paragraph description of the repository.
- `index.html` — the HTML shell: metadata, structured data, the mount point.
- `package.json` — scripts (`dev`, `build`, `preview`, `check:agents`) and dependencies.
- `package-lock.json` — the locked dependency tree used by `npm ci` in deployment.
- `vite.config.js` — the build: relative base, the `@` alias, chunking.
- `jsconfig.json` — editor path mapping for the `@` alias.
- `.gitignore` — what stays out of git, including `dist/`, `doc/`, and `.claude/`.
- `.github/` — the GitHub Actions workflow that deploys to GitHub Pages.
- `projects/` — one Chinese intro file per project, the source for case studies.
- `public/` — files copied to the site root untouched: icon, manifest, robots, sitemap.
- `scripts/` — repository tooling, currently the AGENTS.md checker.
- `src/` — the application source.

## 4. Progress

**Done.**

- One-page bilingual portfolio with six sections, two project tiers (eight
  projects), and a case-study dialog with full keyboard and focus handling.
- v5 visual system (2026-10-19): liquid glass (refractive rims, chromatic edges,
  pointer light, halo pull; real lens glass with Chromium edge refraction on the
  top bar and the dialog) and gaseous motion (vapour that condenses around panels
  and evaporates with light particles when the dialog closes, a pointer trail,
  press puffs). Layout and content unchanged.
- Measured at 60 fps steady while scrolling, with and without pointer movement, at
  1440 px 1x and 2560 px 2x; zero GPU work when idle.
- Workspace format in place: every folder documents itself; `npm run check:agents`.
- Automatic deployment to GitHub Pages from `main`.

**Not done.**

- `npm run check:agents` does not run in the deployment workflow.
- No light theme.

**Known defects.**

- None known.
