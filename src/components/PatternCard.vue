<script setup>
defineProps({
  pattern: { type: Object, required: true },
  categoryLabel: { type: String, default: '' },
})
defineEmits(['open'])
</script>

<template>
  <button class="card" @click="$emit('open')">
    <div class="card-head">
      <span class="chip" :class="pattern.tone || 'accent'">{{ categoryLabel || pattern.category }}</span>
      <span class="mono mute">#{{ String(pattern.id).padStart(3,'0') }}</span>
    </div>
    <div class="preview">
      <component :is="pattern.component" :preview="true" />
    </div>
    <div class="meta">
      <div class="name">{{ pattern.name }}</div>
      <div class="desc dim">{{ pattern.shortDesc }}</div>
    </div>
  </button>
</template>

<style scoped>
.card {
  display: flex; flex-direction: column;
  padding: 0; text-align: left;
  background: var(--bg-1); border: 1px solid var(--line); border-radius: var(--radius);
  overflow: hidden;
  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}
.card:hover { transform: translateY(-2px); border-color: var(--line-2); box-shadow: var(--shadow); }
.card-head {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 12px;
}
.preview {
  background: var(--bg-2);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  height: 200px;
  overflow: hidden;
  position: relative;
  pointer-events: none; /* clickable card */
}
.preview > :deep(*) { pointer-events: none; }
.meta { padding: 12px 14px; }
.name { font-weight: 600; margin-bottom: 4px; }
.desc { font-size: 12.5px; line-height: 1.4; }
</style>
