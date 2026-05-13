// Tiny helpers shared across the 100 mini-pattern components.
import { ref, onMounted, onUnmounted, computed, reactive, watch, nextTick } from 'vue'
export { ref, onMounted, onUnmounted, computed, reactive, watch, nextTick }

const injected = new Set()
export function injectCss(key, css) {
  if (typeof document === 'undefined') return
  if (injected.has(key)) return
  injected.add(key)
  const s = document.createElement('style')
  s.dataset.aiux = key
  s.textContent = css
  document.head.appendChild(s)
}

export function useTypewriter(text, opts = {}) {
  const speed = opts.speed ?? 22
  const out = ref('')
  let i = 0
  let t = null
  function start() {
    stop()
    out.value = ''
    i = 0
    t = setInterval(() => {
      if (i >= text.length) { stop(); return }
      out.value += text[i++]
    }, speed)
  }
  function stop() { if (t) { clearInterval(t); t = null } }
  onMounted(start)
  onUnmounted(stop)
  return { out, restart: start, stop }
}

export function useInterval(fn, ms) {
  let t = null
  onMounted(() => { t = setInterval(fn, ms) })
  onUnmounted(() => { if (t) clearInterval(t) })
}

export function rand(seed) {
  let s = seed | 0
  return () => {
    s = (s * 1664525 + 1013904223) | 0
    return ((s >>> 0) % 10000) / 10000
  }
}
