import { ref } from 'vue'
import { messages } from './messages.js'

/**
 * Minimal in-house i18n (no dependency).
 *
 * - `t(key)`  → interface chrome strings from messages.js
 * - `pick(node)` → content prose objects shaped `{ en, zh }`
 *
 * The locale is a module-level singleton so every component shares one
 * source of truth. Persisted to localStorage when available (private
 * mode / disabled storage falls back to in-memory).
 */

const STORAGE_KEY = 'site-lang'
const SUPPORTED = ['en', 'zh']

function detectInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && SUPPORTED.includes(saved)) return saved
  } catch {
    // Storage unavailable — fall through to browser language.
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language || '' : ''
  return nav.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export const locale = ref(detectInitial())

/** Interface string lookup. Falls back to English, then to the key. */
export function t(key) {
  const table = messages[locale.value] || messages.en
  const hit = table[key]
  if (hit !== undefined) return hit
  if (import.meta.env.DEV) {
    console.warn(`[i18n] missing key "${key}" for locale "${locale.value}"`)
  }
  return messages.en[key] ?? key
}

/** Content prose lookup: accepts `{ en, zh }` objects or plain strings. */
export function pick(node) {
  if (node == null) return ''
  if (typeof node === 'string') return node
  return node[locale.value] ?? node.en ?? ''
}

function syncDocument(next) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en'
  const title = messages[next]?.['meta.title']
  if (title) document.title = title
}

export function setLocale(next) {
  if (!SUPPORTED.includes(next)) return
  locale.value = next
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Non-fatal: keep the in-memory locale for this session.
  }
  syncDocument(next)
}

export function toggleLocale() {
  setLocale(locale.value === 'en' ? 'zh' : 'en')
}

/** Called once from main.js so <html lang> matches the initial locale. */
export function initI18n() {
  syncDocument(locale.value)
}

export function useI18n() {
  return { locale, t, pick, setLocale, toggleLocale }
}
