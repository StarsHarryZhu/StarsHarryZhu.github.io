#!/usr/bin/env node
/**
 * check-agents — every documented folder carries a four-section English AGENTS.md.
 *
 * Rules (mirrors the workspace convention):
 *   · the file starts with `# AGENTS.md` and has exactly the four `## ` headings, in order;
 *   · every section has real content;
 *   · each Contents entry (`- \`name\` — …`) names something that exists in that folder,
 *     and every file or folder in that folder is mentioned somewhere in the file;
 *   · no `../` (a folder describes only itself) and no CJK text.
 *
 * Zero dependencies: Node built-ins only. Exits 1 and lists every failure.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

/** Generated, vendored, or git-ignored folders; dot-folders are skipped too. */
const SKIPPED = new Set(['node_modules', 'dist', 'dist-ssr', 'coverage', 'doc', 'skills'])

const SECTIONS = ['## 1. Role', '## 2. Constraints', '## 3. Contents', '## 4. Progress']

function folders(dir) {
  const found = [dir]
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || SKIPPED.has(entry.name)) continue
    found.push(...folders(join(dir, entry.name)))
  }
  return found
}

function section(text, index) {
  const start = text.indexOf(SECTIONS[index])
  const next = SECTIONS[index + 1]
  const end = next === undefined ? text.length : text.indexOf(next)
  return text.slice(start + SECTIONS[index].length, end)
}

const failures = []

for (const dir of folders(ROOT)) {
  const name = relative(ROOT, dir) || '.'
  const path = join(dir, 'AGENTS.md')
  const fail = (msg) => failures.push(`${name}/AGENTS.md: ${msg}`)

  if (!existsSync(path)) {
    fail('missing')
    continue
  }

  const text = readFileSync(path, 'utf8')
  if (!text.startsWith('# AGENTS.md\n')) fail('must start with "# AGENTS.md"')

  const headings = text.split('\n').filter((line) => line.startsWith('## '))
  if (headings.join('|') !== SECTIONS.join('|')) {
    fail(`headings must be exactly ${SECTIONS.join(' / ')} (found: ${headings.join(' / ') || 'none'})`)
    continue
  }

  SECTIONS.forEach((heading, i) => {
    if (section(text, i).trim().length < 40) fail(`"${heading}" is empty`)
  })

  if (text.includes('../')) fail('mentions "../" — describe only this folder')
  if (/[㐀-鿿豈-﫿]/u.test(text)) fail('contains CJK text — AGENTS.md is English only')

  // Contents entries must exist.
  const entries = [...section(text, 2).matchAll(/^- `([^`]+)`/gmu)].map((m) => m[1])
  if (entries.length < 2) fail('Contents lists fewer than two entries')
  for (const entry of entries) {
    const target = entry.replace(/\/$/, '')
    if (!existsSync(join(dir, target))) fail(`Contents lists "${entry}", which does not exist`)
  }

  // Every file and folder in this folder must be mentioned.
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'AGENTS.md' || entry.name === '.DS_Store') continue
    if (entry.isDirectory() && (entry.name.startsWith('.') || SKIPPED.has(entry.name))) continue
    if (!text.includes(entry.name)) fail(`does not mention ${entry.name}${entry.isDirectory() ? '/' : ''}`)
  }
}

if (failures.length) {
  console.error(`check-agents: ${failures.length} problem(s)\n  ${failures.join('\n  ')}`)
  process.exit(1)
}
console.log('check-agents: ok')
