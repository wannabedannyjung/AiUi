<script setup>
import { useI18n } from '../i18n/index.js'
const { t } = useI18n()
defineProps({
  pattern: { type: Object, required: true },
  categoryLabel: { type: String, default: '' },
})
defineEmits(['close', 'next', 'prev'])
</script>

<template>
  <div class="backdrop" @click.self="$emit('close')">
    <div class="modal">
      <header>
        <div class="row">
          <span class="chip accent">{{ categoryLabel || pattern.category }}</span>
          <span class="mono mute">#{{ String(pattern.id).padStart(3,'0') }}</span>
          <strong>{{ pattern.name }}</strong>
        </div>
        <div class="row">
          <button @click="$emit('prev')" :title="t('modal.prev')">←</button>
          <button @click="$emit('next')" :title="t('modal.next')">→</button>
          <button class="primary" @click="$emit('close')" :title="t('modal.closeTitle')">{{ t('modal.close') }}</button>
        </div>
      </header>

      <div class="body">
        <div class="left">
          <div class="surface live">
            <component :is="pattern.component" />
          </div>
        </div>
        <aside class="right">
          <h3>{{ t('modal.about') }}</h3>
          <p class="dim">{{ pattern.longDesc || pattern.shortDesc }}</p>
          <h4>{{ t('modal.inspiration') }}</h4>
          <p class="mono mute">{{ pattern.inspiration }}</p>
          <h4>{{ t('modal.tags') }}</h4>
          <div class="row" style="flex-wrap:wrap;gap:6px">
            <span v-for="tag in (pattern.tags || [])" :key="tag" class="chip">{{ tag }}</span>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed; inset: 0; background: rgba(5, 6, 12, 0.7);
  backdrop-filter: blur(6px);
  display: grid; place-items: center; z-index: 50;
  padding: 24px;
}
.modal {
  width: min(1100px, 100%); max-height: 92vh;
  background: var(--bg-1);
  border: 1px solid var(--line-2); border-radius: 16px;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: var(--shadow);
}
header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; border-bottom: 1px solid var(--line);
}
.body {
  display: grid; grid-template-columns: 1fr 280px;
  gap: 16px; padding: 16px; overflow: hidden;
}
.left { overflow: auto; }
.right { overflow: auto; padding-left: 8px; border-left: 1px solid var(--line); }
.right h3, .right h4 { margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-mute); }
.right h4 { margin-top: 14px; }
.right p { margin: 0; font-size: 13.5px; line-height: 1.5; }
.live { min-height: 360px; padding: 18px; }
@media (max-width: 800px) {
  .body { grid-template-columns: 1fr; }
  .right { border-left: none; padding-left: 0; }
}
</style>
