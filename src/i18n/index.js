import { ref, computed } from 'vue'
import en from './locales/en.js'
import ko from './locales/ko.js'

const STORAGE_KEY = 'aiux.locale'
const DEFAULT_LOCALE = 'en'

export const messages = { en, ko }
export const availableLocales = [
  { code: 'ko', label: '한글' },
  { code: 'en', label: 'EN' },
]

function readStoredLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && messages[stored]) return stored
  } catch {}
  return DEFAULT_LOCALE
}

export const locale = ref(readStoredLocale())

export function setLocale(code) {
  if (!messages[code]) return
  locale.value = code
  try {
    localStorage.setItem(STORAGE_KEY, code)
    document.documentElement.setAttribute('lang', code)
  } catch {}
}

function resolve(obj, path) {
  return path.split('.').reduce((acc, key) => (acc != null ? acc[key] : undefined), obj)
}

function format(str, params) {
  if (!params) return str
  return str.replace(/\{(\w+)\}/g, (_, k) => (params[k] != null ? params[k] : `{${k}}`))
}

export function t(key, params) {
  const dict = messages[locale.value] || messages[DEFAULT_LOCALE]
  const fallback = messages[DEFAULT_LOCALE]
  const value = resolve(dict, key)
  if (typeof value === 'string') return format(value, params)
  const fb = resolve(fallback, key)
  if (typeof fb === 'string') return format(fb, params)
  return key
}

export function useI18n() {
  const t$ = (key, params) => {
    // touch reactive ref so consumers re-render on change
    locale.value
    return t(key, params)
  }
  return {
    locale,
    setLocale,
    t: t$,
    availableLocales,
    current: computed(() => locale.value),
  }
}

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', locale.value)
}
