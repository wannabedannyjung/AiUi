<script setup>
import { ref, computed, onMounted } from 'vue'
import { patterns as patternList, categories as categoryList } from './patterns/registry.js'
const patterns = patternList
const categories = categoryList
import PatternCard from './components/PatternCard.vue'
import PatternModal from './components/PatternModal.vue'
import { useI18n } from './i18n/index.js'

const { t, locale, setLocale, availableLocales } = useI18n()

const search = ref('')
const activeCategory = ref('All')
const openId = ref(null)
const view = ref('grid') // grid | list

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return patterns.filter(p => {
    if (activeCategory.value !== 'All' && p.category !== activeCategory.value) return false
    if (!q) return true
    return (
      p.name.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      String(p.id) === q
    )
  })
})

const opened = computed(() => patterns.find(p => p.id === openId.value) || null)

function openPattern(p) { openId.value = p.id }
function closePattern() { openId.value = null }
function next() {
  if (!opened.value) return
  const idx = filtered.value.findIndex(p => p.id === opened.value.id)
  const n = filtered.value[(idx + 1) % filtered.value.length]
  if (n) openId.value = n.id
}
function prev() {
  if (!opened.value) return
  const idx = filtered.value.findIndex(p => p.id === opened.value.id)
  const n = filtered.value[(idx - 1 + filtered.value.length) % filtered.value.length]
  if (n) openId.value = n.id
}

const counts = computed(() => {
  const map = { All: patterns.length }
  for (const c of categories) map[c] = patterns.filter(p => p.category === c).length
  return map
})

function categoryLabel(c) {
  return t(`category.${c}`)
}

onMounted(() => {
  window.addEventListener('keydown', e => {
    if (!opened.value) return
    if (e.key === 'Escape') closePattern()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  })
})
</script>

<template>
  <div class="layout">
    <div class="lang-switch" role="group" aria-label="Language">
      <template v-for="(opt, i) in availableLocales" :key="opt.code">
        <button
          class="lang-btn"
          :class="{ active: locale === opt.code }"
          @click="setLocale(opt.code)"
        >
          {{ opt.label }}
        </button>
        <span v-if="i < availableLocales.length - 1" class="lang-sep">|</span>
      </template>
    </div>

    <aside class="sidebar">
      <div class="brand">
        <div class="logo">✨</div>
        <div>
          <div class="brand-name">{{ t('brand.name') }}</div>
          <div class="brand-sub">
            {{ t('brand.sub', { patterns: patterns.length, categories: categories.length }) }}
          </div>
        </div>
      </div>

      <div class="search">
        <input v-model="search" :placeholder="t('search.placeholder')" />
      </div>

      <nav class="cats">
        <button
          class="cat"
          :class="{ active: activeCategory === 'All' }"
          @click="activeCategory = 'All'">
          <span>{{ t('nav.all') }}</span><span class="count">{{ counts.All }}</span>
        </button>
        <button
          v-for="c in categories"
          :key="c"
          class="cat"
          :class="{ active: activeCategory === c }"
          @click="activeCategory = c">
          <span>{{ categoryLabel(c) }}</span><span class="count">{{ counts[c] || 0 }}</span>
        </button>
      </nav>

      <div class="footer-note dim">
        <div>{{ t('footer.builtWith') }}</div>
        <div class="mute" style="font-size:11px;margin-top:4px">
          {{ t('footer.inspired') }}
        </div>
      </div>
    </aside>

    <main class="main">
      <header class="header">
        <div>
          <h1>{{ activeCategory === 'All' ? t('header.allPatterns') : categoryLabel(activeCategory) }}</h1>
          <div class="dim mono">
            {{ t('header.countLabel', { filtered: filtered.length, total: patterns.length }) }}
          </div>
        </div>
        <div class="row">
          <button :class="{ primary: view === 'grid' }" @click="view = 'grid'">{{ t('header.grid') }}</button>
          <button :class="{ primary: view === 'list' }" @click="view = 'list'">{{ t('header.list') }}</button>
        </div>
      </header>

      <section v-if="view === 'grid'" class="grid">
        <PatternCard
          v-for="p in filtered"
          :key="p.id"
          :pattern="p"
          :category-label="categoryLabel(p.category)"
          @open="openPattern(p)"
        />
      </section>

      <section v-else class="list">
        <button v-for="p in filtered" :key="p.id" class="list-row" @click="openPattern(p)">
          <span class="mono mute" style="width:36px">#{{ p.id }}</span>
          <span class="chip">{{ categoryLabel(p.category) }}</span>
          <span style="font-weight:600">{{ p.name }}</span>
          <span class="dim">{{ p.shortDesc }}</span>
        </button>
      </section>

      <div v-if="filtered.length === 0" class="empty dim">
        {{ t('empty.noMatch', { query: search }) }}
      </div>
    </main>

    <PatternModal
      v-if="opened"
      :pattern="opened"
      :category-label="categoryLabel(opened.category)"
      @close="closePattern"
      @next="next"
      @prev="prev"
    />
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100vh;
  overflow: hidden;
}
.sidebar {
  border-right: 1px solid var(--line);
  background: var(--bg-1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}
.brand { display: flex; gap: 10px; align-items: center; }
.logo {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--grad);
  display: grid; place-items: center; font-size: 18px;
}
.brand-name { font-weight: 700; }
.brand-sub { font-size: 11px; color: var(--text-mute); }
.search input { width: 100%; }
.cats { display: flex; flex-direction: column; gap: 2px; }
.cat {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 10px; border-radius: var(--radius-sm);
  background: transparent; border: 1px solid transparent;
  color: var(--text-dim); font-size: 13px; text-align: left;
}
.cat:hover { background: var(--bg-2); color: var(--text); border-color: var(--line); }
.cat.active { background: rgba(139,140,247,0.12); color: var(--text); border-color: rgba(139,140,247,0.4); }
.count { font-size: 11px; color: var(--text-mute); font-family: var(--mono); }
.footer-note { margin-top: auto; font-size: 12px; }

.main { overflow-y: auto; padding: 24px 28px 60px; }
.header {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-bottom: 20px; gap: 16px;
  padding-right: 120px; /* keep room for the fixed lang switcher */
}
.header h1 { margin: 0 0 4px; font-size: 22px; letter-spacing: -0.01em; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}
.list { display: flex; flex-direction: column; gap: 6px; }
.list-row {
  display: flex; gap: 12px; align-items: center;
  padding: 10px 14px; text-align: left;
  background: var(--bg-1); border: 1px solid var(--line); border-radius: 8px;
}
.list-row:hover { background: var(--bg-2); }

.empty { padding: 60px; text-align: center; }

.lang-switch {
  position: fixed;
  top: 12px;
  right: 16px;
  z-index: 60;
  display: inline-flex;
  align-items: center;
  background: var(--bg-1);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 2px 4px;
  box-shadow: var(--shadow);
}
.lang-btn {
  background: transparent;
  border: none;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-mute);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0;
}
.lang-btn:hover { color: var(--text); background: transparent; border-color: transparent; }
.lang-btn.active { color: var(--text); background: rgba(139,140,247,0.18); }
.lang-sep {
  color: var(--text-mute);
  font-size: 12px;
  padding: 0 2px;
  user-select: none;
}
</style>
