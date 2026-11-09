# AGENTS.md

## 1. Role

`starfield` is the personal portfolio of Harry Zhu (GitHub: StarsHarryZhu), served
at https://starsharryzhu.github.io/. It is one page, built with Vue 3 and Vite,
that introduces Harry and his work as a Computer Science student at Stony Brook
University: who he is, his experience, his projects, his skills, his education, and
how to reach him. Every visible string exists in English and Chinese.

On a wide screen the page is two columns: a fixed sidebar with Harry's name, a
one-line introduction, a section nav that follows the reader, his contact links,
and the language switch; and a scrolling column with six sections (About,
Experience, Projects, Toolkit, Education, Contact) and a footer. On a narrow screen
the sidebar becomes the head of a single column and the nav is dropped. Projects
come in two groups, Selected and More; each project is one row that opens its
details in place.

The visual language is minimal and dark: a near-black ground, three greys for
text, and one cool accent for links and the current nav item. Depth comes from
space, hairlines, weight, and brightness alone.

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

**Minimal by rule.** No shadows, gradients, blur, glass, `backdrop-filter`, or
canvas. One accent colour, used only for links, the current nav item, and live
status. Every text colour keeps a contrast of at least 4.5:1 on the background.

**Quiet motion.** Motion is limited to a one-time load-in, hover colour, the
nav line, and a project row opening and closing; it animates `transform` and
`opacity`, except the row's height (`grid-template-rows`). Under
`prefers-reduced-motion` everything ends at once and scrolling is not smoothed.
Scrolling holds about 60 fps at 1440 px 1x and 2560 px 2x.

**Interaction budget.** Four functional interactions and no more: the section
nav, opening a project row, the language switch, and outbound links.

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

- One-page bilingual portfolio with six sections and ten projects in two groups,
  each opening its details in place with full keyboard support.
- v6 (2026-11-09): minimal dark redesign. A sticky sidebar with a scroll-following
  section nav replaces the top bar and hero; project rows replace cards and the
  case dialog; the WebGL gas layer, the liquid glass, and the pointer light are
  gone.
- v5 (2026-10-19, superseded): liquid glass and an event-driven WebGL2 gas layer.
- Workspace format in place: every folder documents itself; `npm run check:agents`.
- Automatic deployment to GitHub Pages from `main`.

**Not done.**

- `npm run check:agents` does not run in the deployment workflow.
- Dark only; no light theme.

**Known defects.**

- None known.
