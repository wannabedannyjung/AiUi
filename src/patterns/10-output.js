import { defineComponent } from 'vue'
import { ref, onMounted, onUnmounted, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('output', `
.o-shell { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.o-card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.o-canvas { background:#fff; color:#0b0c14; border-radius:8px; padding:10px; font-family: var(--mono); font-size:12px; }
.o-table { width:100%; border-collapse:collapse; font-family: var(--mono); font-size:12px; }
.o-table th, .o-table td { padding:4px 8px; text-align:left; border-bottom: 1px solid var(--line); }
.o-table tr:nth-child(even) { background: rgba(255,255,255,0.02); }
.o-tabs { display:flex; gap:4px; }
.o-tab { padding:4px 10px; border-radius:6px 6px 0 0; background: transparent; border:1px solid transparent; cursor:pointer; }
.o-tab.active { background: var(--bg-3); border-color: var(--line); border-bottom-color: transparent; }
`)

// 91 — Canvas / Artifact panel
const P91 = defineComponent({
  setup() {
    const tab = ref('preview')
    return { tab }
  },
  template: `
    <div class="o-shell">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;flex:1;min-height:200px">
        <div class="o-card" style="font-size:12px">
          <div class="dim mono" style="font-size:11px">chat</div>
          <div style="margin-top:4px">User: write me a tip calculator…</div>
          <div style="margin-top:4px;color:var(--text-dim)">AI: here it is in the artifact panel →</div>
        </div>
        <div class="o-card" style="padding:0;display:flex;flex-direction:column">
          <div class="o-tabs" style="padding:6px 6px 0">
            <button class="o-tab" :class="{active: tab==='preview'}" @click="tab='preview'">Preview</button>
            <button class="o-tab" :class="{active: tab==='code'}" @click="tab='code'">Code</button>
          </div>
          <div class="o-canvas" style="flex:1;border-radius:0 0 8px 8px;background: #fff">
            <div v-if="tab==='preview'" style="font-family:inherit;font-size:14px">
              <div style="font-weight:600;margin-bottom:6px">Tip calculator</div>
              <input value="42.50" style="border:1px solid #ccc;padding:4px;width:80px;color:#0b0c14;background:#fff"/>
              <div style="margin-top:6px;color:#666">tip 18% → <b>$7.65</b></div>
            </div>
            <pre v-else style="margin:0;font-size:11px;line-height:1.5;color:#0b0c14">function tip(b, p) {
  return (b * p / 100).toFixed(2)
}</pre>
          </div>
        </div>
      </div>
    </div>`,
})

// 92 — Side-by-side diff
const P92 = defineComponent({
  template: `
    <div class="o-shell">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-family:var(--mono);font-size:12px">
        <div class="o-card" style="padding:0">
          <div class="dim" style="padding:4px 8px;border-bottom:1px solid var(--line);font-size:11px">before</div>
          <div style="background:rgba(249,123,123,0.1);color:var(--accent-bad);padding:0 8px">  if (!tok) return false</div>
          <div style="padding:0 8px" class="mute">  return verify(tok)</div>
        </div>
        <div class="o-card" style="padding:0">
          <div class="dim" style="padding:4px 8px;border-bottom:1px solid var(--line);font-size:11px">after</div>
          <div style="background:rgba(109,212,154,0.1);color:var(--accent-good);padding:0 8px">  if (!tok || tok.length<32) return false</div>
          <div style="padding:0 8px" class="mute">  return verify(tok)</div>
        </div>
      </div>
    </div>`,
})

// 93 — Code preview with run
const P93 = defineComponent({
  setup() {
    const ran = ref(false)
    return { ran }
  },
  template: `
    <div class="o-shell">
      <pre class="mono" style="background:#000;padding:10px;border-radius:8px;font-size:12px;color:#e6e8f0;margin:0">console.log('Hello, world!')</pre>
      <button class="btn-mini" style="align-self:flex-start;background:var(--accent-good);color:#0b0c14" @click="ran=true">▷ Run</button>
      <div v-if="ran" class="o-card" style="background:#0b1120;color:#a4f06d;font-family:var(--mono);font-size:12px">› Hello, world!</div>
    </div>`,
})

// 94 — Generative UI (live tip calc)
const P94 = defineComponent({
  setup() {
    const bill = ref(42.5)
    const pct = ref(18)
    const ppl = ref(2)
    const total = computed(() => (bill.value * (1 + pct.value/100)).toFixed(2))
    const each = computed(() => (Number(total.value) / ppl.value).toFixed(2))
    return { bill, pct, ppl, total, each }
  },
  template: `
    <div class="o-shell">
      <div class="o-card">
        <div style="font-weight:600;margin-bottom:6px">Tip calculator (generated for you)</div>
        <div class="row-c"><span style="width:70px">Bill</span><input type="number" v-model.number="bill" style="width:100px"/></div>
        <div class="row-c"><span style="width:70px">Tip %</span><input type="range" min="0" max="40" v-model.number="pct" style="flex:1"/><span class="mono">{{ pct }}%</span></div>
        <div class="row-c"><span style="width:70px">People</span><input type="number" v-model.number="ppl" min="1" style="width:80px"/></div>
        <div class="row-c" style="margin-top:6px"><b style="margin-left:auto">Total \${{ total }}</b></div>
        <div class="dim" style="text-align:right;font-size:11px">\${{ each }} each</div>
      </div>
    </div>`,
})

// 95 — Inline source highlights
const P95 = defineComponent({
  setup() {
    const hover = ref(null)
    return { hover }
  },
  template: `
    <div class="o-shell">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div class="o-card">
          <div @mouseenter="hover='a'" @mouseleave="hover=null" style="padding:4px;border-radius:4px;cursor:help" :style="{background: hover==='a'?'rgba(245,193,97,0.2)':null}">Tokens must be ≥32 chars long.</div>
          <div @mouseenter="hover='b'" @mouseleave="hover=null" style="padding:4px;border-radius:4px;cursor:help" :style="{background: hover==='b'?'rgba(245,193,97,0.2)':null}">Sessions expire after 7 days.</div>
        </div>
        <div class="o-card mono" style="font-size:11px">
          <div :style="{background: hover==='a'?'rgba(245,193,97,0.2)':null,padding:'2px'}">…token validation requires <b>≥32 chars</b> per RFC…</div>
          <div :style="{background: hover==='b'?'rgba(245,193,97,0.2)':null,padding:'2px'}">…inactive <b>sessions</b> expire after <b>7 days</b>…</div>
        </div>
      </div>
    </div>`,
})

// 96 — Copy-as-X menu
const P96 = defineComponent({
  setup() {
    const open = ref(false)
    const copied = ref(null)
    function pick(k) { copied.value = k; setTimeout(() => copied.value = null, 1200); open.value = false }
    return { open, copied, pick }
  },
  template: `
    <div class="o-shell" style="position:relative">
      <div class="o-card">A model-generated answer to copy as different formats.</div>
      <button class="btn-mini" @click="open=!open" style="align-self:flex-start">Copy as ▾</button>
      <div v-if="open" class="o-card" style="position:absolute;left:0;top:80px;width:160px">
        <div v-for="k in ['Markdown','HTML','Plain text','JSON']" :key="k" @click="pick(k)" style="padding:4px 6px;cursor:pointer;border-radius:4px;display:flex;justify-content:space-between" :style="{background: copied===k?'rgba(109,212,154,0.15)':null}">
          {{ k }} <span v-if="copied===k" style="color:var(--accent-good)">✓</span>
        </div>
      </div>
    </div>`,
})

// 97 — Image variation grid (different)
const P97 = defineComponent({
  setup() {
    const tones = ['#7d6df1','#f17d6d','#6df1c4','#f1d96d']
    return { tones }
  },
  template: `
    <div class="o-shell">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        <div v-for="(c,i) in tones" :key="i" :style="{aspectRatio:'1', borderRadius:'8px', background: 'radial-gradient(circle at 30% 20%,'+c+', #0b0c14)', position:'relative'}">
          <div style="position:absolute;bottom:6px;right:6px;display:flex;gap:4px">
            <button class="btn-mini">U{{ i+1 }}</button>
            <button class="btn-mini">V{{ i+1 }}</button>
          </div>
        </div>
      </div>
    </div>`,
})

// 98 — Inline data table (sortable + filter)
const P98 = defineComponent({
  setup() {
    const all = [
      { id:1, name:'Alice', score:94 },
      { id:2, name:'Bo',    score:88 },
      { id:3, name:'Cas',   score:76 },
      { id:4, name:'Dee',   score:60 },
      { id:5, name:'Edda',  score:42 },
    ]
    const q = ref(''); const sortKey = ref('score'); const dir = ref(-1)
    const rows = computed(() => all.filter(r => r.name.toLowerCase().includes(q.value.toLowerCase()))
      .slice().sort((a,b) => (a[sortKey.value] > b[sortKey.value] ? 1 : -1) * dir.value))
    function sort(k) { if (sortKey.value===k) dir.value*=-1; else { sortKey.value=k; dir.value=-1 } }
    return { q, sortKey, dir, rows, sort }
  },
  template: `
    <div class="o-shell">
      <input v-model="q" placeholder="filter…"/>
      <table class="o-table">
        <thead><tr>
          <th @click="sort('id')" style="cursor:pointer">id</th>
          <th @click="sort('name')" style="cursor:pointer">name</th>
          <th @click="sort('score')" style="cursor:pointer">score {{ sortKey==='score' ? (dir<0?'▾':'▴') : '' }}</th>
        </tr></thead>
        <tbody><tr v-for="r in rows" :key="r.id"><td>{{ r.id }}</td><td>{{ r.name }}</td><td>{{ r.score }}</td></tr></tbody>
      </table>
    </div>`,
})

// 99 — Mind map output
const P99 = defineComponent({
  template: `
    <div class="o-shell" style="align-items:center;justify-content:center">
      <svg width="280" height="180" viewBox="0 0 280 180">
        <line v-for="(l,i) in [[140,90,40,30],[140,90,240,30],[140,90,40,150],[140,90,240,150],[140,90,140,20]]" :key="i" :x1="l[0]" :y1="l[1]" :x2="l[2]" :y2="l[3]" stroke="var(--line-2)"/>
        <g v-for="(n,i) in [{x:140,y:90,t:'Vue 3',c:'var(--accent)'},{x:40,y:30,t:'Composition'},{x:240,y:30,t:'Vite'},{x:40,y:150,t:'Pinia'},{x:240,y:150,t:'SFC'},{x:140,y:20,t:'TS'}]" :key="i">
          <ellipse :cx="n.x" :cy="n.y" rx="34" ry="14" :fill="n.c||'var(--bg-3)'" stroke="var(--line-2)"/>
          <text :x="n.x" :y="n.y+4" font-size="10" text-anchor="middle" :fill="n.c?'#0b0c14':'#e6e8f0'">{{ n.t }}</text>
        </g>
      </svg>
    </div>`,
})

// 100 — Export to share card
const P100 = defineComponent({
  setup() {
    const open = ref(false)
    return { open }
  },
  template: `
    <div class="o-shell" style="align-items:center">
      <button class="btn-mini" style="background:var(--accent);color:#0b0c14" @click="open=true">Share as image</button>
      <div v-if="open" class="o-card" style="padding:0;width:280px;aspect-ratio: 16/9; background: linear-gradient(135deg,#0b0c14, #1f2333);position:relative;border:1px solid var(--line-2)">
        <div style="padding:14px;color:#fff">
          <div class="chip accent" style="font-size:10px">Q · Asked an AI</div>
          <div style="margin-top:6px;font-weight:700;font-size:13px">"Best lock for multi-process critical sections?"</div>
          <div style="margin-top:6px;font-size:11px;color:#a8b">→ Postgres advisory locks per user id.</div>
        </div>
        <div style="position:absolute;bottom:8px;right:10px;font-size:10px;color:#9aa0b4">✨ AI Agent UX Gallery</div>
      </div>
      <div v-if="open" class="row-c"><button class="btn-mini">Download PNG</button><button class="btn-mini" @click="open=false">Close</button></div>
    </div>`,
})

const meta = [
  { id:91,  name:'Canvas / Artifact panel', shortDesc:'Generated docs/code dock in a separate side panel from chat.', inspiration:'ChatGPT Canvas', tags:['artifact'], component:P91 },
  { id:92,  name:'Side-by-side diff',       shortDesc:'Two-column before/after comparison of content changes.', inspiration:'GitHub PR diff, Cursor', tags:['artifact','diff'], component:P92 },
  { id:93,  name:'Code preview with run',   shortDesc:'Code block plus a Run button executing in a sandbox.', inspiration:'v0, Bolt, StackBlitz', tags:['artifact','code'], component:P93 },
  { id:94,  name:'Generative UI widget',    shortDesc:'A live, interactive widget the model generates inline.', inspiration:'generative UI research', tags:['artifact','ui'], component:P94 },
  { id:95,  name:'Inline source highlights',shortDesc:'Hover an answer sentence to highlight its source passage.', inspiration:'NotebookLM, Perplexity', tags:['artifact','citations'], component:P95 },
  { id:96,  name:'Copy-as-X menu',          shortDesc:'Copy button opens a menu of formats: MD/HTML/Plain/JSON.', inspiration:'Notion, Raycast', tags:['artifact'], component:P96 },
  { id:97,  name:'Image variation grid',    shortDesc:'Four candidate images with Upscale/Variation buttons.', inspiration:'Midjourney', tags:['artifact','image'], component:P97 },
  { id:98,  name:'Inline data table',       shortDesc:'Filterable, sortable mini-table rendered inside an answer.', inspiration:'Hex, ChatGPT data analysis', tags:['artifact','table'], component:P98 },
  { id:99,  name:'Mind-map output',         shortDesc:'Generated content rendered as a radial mind-map.', inspiration:'NotebookLM', tags:['artifact','graph'], component:P99 },
  { id:100, name:'Export-to-share card',    shortDesc:'One-click branded image card of an answer for sharing.', inspiration:'Perplexity share, Arc Boosts', tags:['artifact','export'], component:P100 },
]

export default meta.map(m => ({ ...m, category:'Output'  }))
