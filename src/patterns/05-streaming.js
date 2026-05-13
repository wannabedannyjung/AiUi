import { defineComponent } from 'vue'
import { ref, onMounted, onUnmounted, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('streaming', `
.st-shell { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.st-skel { height: 12px; border-radius:4px; background: linear-gradient(90deg, var(--bg-3) 0%, var(--line-2) 50%, var(--bg-3) 100%); background-size: 200% 100%; animation: shimmer 1.6s linear infinite; }
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
.st-bar { height:6px; border-radius:6px; background: var(--bg-3); overflow:hidden; }
.st-bar > div { height:100%; transition: width .25s; }
.st-ring { width:64px;height:64px; }
.st-card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px; }
`)

// 41 — Stop / Pause / Resume bar
const P41 = defineComponent({
  setup() {
    const state = ref('streaming')
    return { state }
  },
  template: `
    <div class="st-shell">
      <div class="st-card">
        <span>Generating reply</span>
        <span v-if="state==='streaming'" class="caret"/>
        <span v-else class="mute" style="margin-left:6px">[paused]</span>
      </div>
      <div class="row-c">
        <button class="btn-mini" @click="state='paused'" v-if="state==='streaming'">⏸ Pause</button>
        <button class="btn-mini" @click="state='streaming'" v-else>▶ Resume</button>
        <button class="btn-mini" style="background:var(--accent-bad);color:#0b0c14" @click="state='stopped'">■ Stop</button>
        <span v-if="state==='stopped'" class="mute">stopped</span>
      </div>
    </div>`,
})

// 42 — Skeleton placeholder
const P42 = defineComponent({
  setup() {
    const ready = ref(false)
    onMounted(() => setTimeout(() => ready.value = true, 2200))
    return { ready }
  },
  template: `
    <div class="st-shell">
      <template v-if="!ready">
        <div class="st-skel" style="width:80%"/>
        <div class="st-skel" style="width:62%"/>
        <div class="st-skel" style="width:90%"/>
        <div class="st-skel" style="width:40%"/>
      </template>
      <template v-else>
        <div>The transformer architecture changed everything.</div>
        <div>It scales, parallelises, and learns long-range patterns.</div>
        <div>Today it powers nearly every state-of-the-art model.</div>
      </template>
    </div>`,
})

// 43 — Progressive disclosure
const P43 = defineComponent({
  setup() {
    const open = ref(false)
    return { open }
  },
  template: `
    <div class="st-shell">
      <div>Token-by-token streaming reduces perceived latency.</div>
      <div v-if="!open" style="position:relative;height:40px;overflow:hidden">
        <div class="dim">It works by sending each generated token as soon as the model emits it. The browser appends to the DOM, giving an immediate sense of progress…</div>
        <div style="position:absolute;inset:0;background:linear-gradient(180deg, transparent, var(--bg-2))"></div>
      </div>
      <div v-else class="dim" style="line-height:1.5">It works by sending each generated token as soon as the model emits it. The browser appends to the DOM, giving an immediate sense of progress, even when the full answer takes seconds. Pair with a skeleton placeholder for the empty state, and a stop button for control.</div>
      <button class="btn-mini" style="align-self:flex-start" @click="open=!open">{{ open?'Show less':'Show full answer ▾' }}</button>
    </div>`,
})

// 44 — Partial JSON streaming → form
const P44 = defineComponent({
  setup() {
    const fields = reactive({ name: null, email: null, role: null, bio: null })
    const order = ['name','email','role','bio']
    const vals = { name:'Alex Park', email:'alex@acme.io', role:'Founder', bio:'Building AI tools.' }
    let i = 0
    useInterval(() => {
      if (i < order.length) { fields[order[i]] = vals[order[i]]; i++ }
      else { for (const k of order) fields[k] = null; i = 0 }
    }, 700)
    return { fields, order }
  },
  template: `
    <div class="st-shell">
      <div v-for="k in order" :key="k" class="row-c">
        <span class="mono mute" style="width:60px">{{ k }}</span>
        <span v-if="fields[k]">{{ fields[k] }}</span>
        <span v-else class="st-skel" style="flex:1"/>
      </div>
      <div class="dim" style="font-size:11px">JSON streamed key-by-key; UI fills incrementally.</div>
    </div>`,
})

// 45 — Auto-scroll lock with jump-to-live
const P45 = defineComponent({
  setup() {
    const lines = ref([])
    const live = ref(true)
    const box = ref(null)
    let i = 0
    useInterval(() => {
      lines.value.push('Generated line #' + (++i))
      if (lines.value.length > 60) lines.value.shift()
      if (live.value && box.value) box.value.scrollTop = box.value.scrollHeight
    }, 400)
    function onScroll() {
      const el = box.value
      if (!el) return
      live.value = (el.scrollHeight - el.scrollTop - el.clientHeight) < 30
    }
    function jump() { live.value = true; if (box.value) box.value.scrollTop = box.value.scrollHeight }
    return { lines, live, box, onScroll, jump }
  },
  template: `
    <div class="st-shell" style="position:relative">
      <div ref="box" class="surface-2 mono" style="height:140px;overflow:auto;padding:8px;font-size:11px" @scroll="onScroll">
        <div v-for="l in lines" :key="l">{{ l }}</div>
      </div>
      <button v-if="!live" class="btn-mini" style="position:absolute;right:8px;bottom:8px;background:var(--accent);color:#0b0c14" @click="jump">↓ Jump to live</button>
    </div>`,
})

// 46 — Context window gauge
const P46 = defineComponent({
  setup() {
    const pct = ref(40)
    useInterval(() => { pct.value = (pct.value + 1) % 100 }, 100)
    return { pct }
  },
  template: `
    <div class="st-shell">
      <div class="row-c"><b>Context window</b><span class="mono mute" style="margin-left:auto">{{ pct }}% of 200k</span></div>
      <div class="st-bar"><div :style="{width: pct+'%', background: pct>80?'var(--accent-bad)':pct>50?'var(--accent-warn)':'var(--accent-good)'}"/></div>
      <div class="dim" style="font-size:11px">color shifts as you consume more context.</div>
    </div>`,
})

// 47 — Confidence shimmer (low conf = blurry)
const P47 = defineComponent({
  setup() {
    const conf = ref(80)
    return { conf }
  },
  template: `
    <div class="st-shell">
      <div class="row-c"><span>Confidence</span><input type="range" min="10" max="100" v-model.number="conf" style="flex:1"/><span class="mono">{{ conf }}%</span></div>
      <div class="surface-2" style="padding:10px">
        <span :style="{filter:'blur('+((100-conf)/30)+'px)', transition:'filter .2s', opacity: 0.5 + conf/200}">The transformer is the dominant architecture for sequence modelling.</span>
      </div>
      <div class="dim" style="font-size:11px">low-confidence answers visually fuzzy → user knows to double-check.</div>
    </div>`,
})

// 48 — Streaming chart bars
const P48 = defineComponent({
  setup() {
    const target = [10, 25, 40, 30, 60, 45, 80, 50]
    const cur = ref(target.map(() => 0))
    let i = 0
    useInterval(() => {
      if (i < target.length) { cur.value[i] = target[i]; i++ }
      else { i = 0; cur.value = target.map(() => 0) }
    }, 200)
    return { cur }
  },
  template: `
    <div class="st-shell">
      <div style="display:flex;align-items:flex-end;gap:4px;height:120px">
        <div v-for="(h,k) in cur" :key="k" :style="{height: h+'px', width:'18px', background:'var(--grad)', borderRadius:'4px', transition:'height .25s ease-out'}"></div>
      </div>
      <div class="dim" style="font-size:11px">bars stream in one-by-one as the model emits structured rows.</div>
    </div>`,
})

// 49 — Reasoning donut budget
const P49 = defineComponent({
  setup() {
    const used = ref(0)
    useInterval(() => used.value = (used.value + 2) % 100, 80)
    const stroke = computed(() => 2*Math.PI*28)
    const off = computed(() => stroke.value * (1 - used.value/100))
    return { used, stroke, off }
  },
  template: `
    <div class="st-shell" style="align-items:center;justify-content:center">
      <svg class="st-ring" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="none" stroke="var(--bg-3)" stroke-width="6"/>
        <circle cx="32" cy="32" r="28" fill="none" stroke="var(--accent)" stroke-width="6"
                stroke-linecap="round" :stroke-dasharray="stroke" :stroke-dashoffset="off"
                transform="rotate(-90 32 32)"/>
        <text x="32" y="36" text-anchor="middle" font-size="13" fill="var(--text)">{{ used }}%</text>
      </svg>
      <div class="dim" style="font-size:11px">Thinking budget used (of 5k tokens)</div>
    </div>`,
})

// 50 — Streaming code typewriter with syntax
const P50 = defineComponent({
  setup() {
    const code = `function greet(name) {\n  return "Hello, " + name + "!"\n}`
    const typed = ref('')
    let i = 0
    useInterval(() => {
      if (i < code.length) { typed.value += code[i++] }
      else { typed.value = ''; i = 0 }
    }, 30)
    const html = computed(() => typed.value
      .replace(/\b(function|return)\b/g, '<span style="color:#9aa9ff">$1</span>')
      .replace(/("[^"]*")/g, '<span style="color:#a4f06d">$1</span>')
    )
    return { html }
  },
  template: `
    <div class="st-shell">
      <pre class="mono" style="background:#000;color:#e6e8f0;padding:10px;border-radius:8px;font-size:12px;line-height:1.5;min-height:90px;margin:0" v-html="html + '<span class=&quot;caret&quot;></span>'"></pre>
    </div>`,
})

const meta = [
  { id:41, name:'Stop / Pause / Resume bar', shortDesc:'Three-state control over a live generation.', inspiration:'ChatGPT, Perplexity', tags:['stream','control'], component:P41 },
  { id:42, name:'Skeleton placeholder', shortDesc:'Pulsing bars approximate the shape of incoming text.', inspiration:'YouTube, LinkedIn', tags:['stream','loading'], component:P42 },
  { id:43, name:'Progressive disclosure', shortDesc:'Long answer collapses to TL;DR; expand to read more.', inspiration:'Smashing UX guides', tags:['stream','disclosure'], component:P43 },
  { id:44, name:'Partial JSON → form', shortDesc:'Form fields fill in as JSON keys arrive from the model.', inspiration:'Vercel AI SDK', tags:['stream','json'], component:P44 },
  { id:45, name:'Auto-scroll lock', shortDesc:'Stops auto-scrolling when user reads up; "Jump to live" floats in.', inspiration:'Slack, terminals', tags:['stream','scroll'], component:P45 },
  { id:46, name:'Context window gauge', shortDesc:'Bar coloured by how much of the context window is used.', inspiration:'Warp, Cursor', tags:['stream','context'], component:P46 },
  { id:47, name:'Confidence shimmer', shortDesc:'Low-confidence answers render slightly blurry.', inspiration:'Carbon for AI', tags:['stream','confidence'], component:P47 },
  { id:48, name:'Streaming chart', shortDesc:'Bars appear one at a time as data points arrive.', inspiration:'live artifact panels', tags:['stream','chart'], component:P48 },
  { id:49, name:'Thinking-budget donut', shortDesc:'Donut chart of how much of the reasoning budget is spent.', inspiration:'OpenAI o-series', tags:['stream','budget'], component:P49 },
  { id:50, name:'Code typewriter', shortDesc:'Code streams character-by-character with live syntax highlight.', inspiration:'Cursor, v0', tags:['stream','code'], component:P50 },
]

export default meta.map(m => ({ ...m, category:'Streaming' }))
