# AGENTS.md

## 1. Role

Repository tooling that runs on the developer's machine, never in the browser and
never in the built site. Today it holds the checker that keeps the workspace format
honest: every documented folder carries a four-section English `AGENTS.md` whose
Contents list matches the folder.

## 2. Constraints

**Zero dependencies.** Scripts use Node built-ins only, so they run right after a
clone without `npm install`, on the Node version `package.json` declares.

**ES modules.** Files use the `.mjs` extension and `import` syntax.

**Exposed through npm.** Each script has an entry in the `scripts` field of
`package.json`, and that entry is how it is run and documented.

**Fail loudly.** A check prints every problem it finds, one per line, and exits
with a non-zero status.

## 3. Contents

- `AGENTS.md` — this file: what belongs in the tooling folder.
- `check-agents.mjs` — walks the repository and verifies every `AGENTS.md`: present,
  four headings in order, non-empty sections, a truthful and complete Contents
  list, no parent-folder paths, no CJK text. Run with `npm run check:agents`.

## 4. Progress

**Done.**

- `check-agents.mjs` covers every rule of the workspace format.

**Not done.**

- The check is not part of the deployment workflow; run it before committing.

**Known defects.**

- None known.
