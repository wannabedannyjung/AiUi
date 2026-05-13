import { defineComponent } from 'vue'
import { ref, onMounted, onUnmounted, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('tools', `
.t-shell { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.t-card { background: var(--bg-3); border: 1px solid var(--line); border-radius: 8px; padding: 8px 10px; }
.t-head { display:flex; gap:8px; align-items:center; font-family: var(--mono); font-size:12px; }
.t-term { background:#000; color:#a8f0a8; font-family: var(--mono); font-size:11.5px; padding:8px 10px; border-radius:8px; min-height:120px; white-space:pre-wrap; }
.t-diff { font-family: var(--mono); font-size:12px; }
.t-diff .add { background: rgba(109,212,154,0.12); color: var(--accent-good); }
.t-diff .del { background: rgba(249,123,123,0.12); color: var(--accent-bad); }
.t-diff .ctx { color: var(--text-mute); }
.t-diff > div { padding: 0 8px; }
.t-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.t-spark { display:flex; align-items:flex-end; gap:2px; height:32px; }
.t-spark > div { width:6px; background: var(--accent); border-radius: 2px; }
`)

// 21 — Tool call card with expandable JSON
const P21 = defineComponent({
  setup() {
    const open = ref(false)
    return { open }
  },
  template: `
    <div class="t-shell">
      <div class="t-card">
        <div class="t-head">
          <span class="chip accent">tool</span>
          <span>web_search({"q":"vue 3 reactivity"})</span>
          <span style="margin-left:auto;cursor:pointer" @click="open=!open">{{ open?'▾':'▸' }}</span>
        </div>
        <pre v-if="open" class="mono" style="font-size:11px;margin:8px 0 0;color:var(--text-dim)">[
  { "title": "Reactivity API", "url": "vuejs.org/api/reactivity-core" },
  { "title": "ref vs reactive",  "url": "vuejs.org/guide/essentials/reactivity" }
]</pre>
      </div>
    </div>`,
})

// 22 — Live terminal output streaming
const P22 = defineComponent({
  setup() {
    const lines = ref([])
    const all = [
      '$ npm install',
      'added 124 packages, audited 125 packages in 4s',
      '$ npm run build',
      'vite v6.0.7 building for production...',
      '✓ 23 modules transformed',
      'dist/index.html      0.46 kB',
      'dist/assets/index.js 78.3 kB',
      'built in 1.2s',
    ]
    let i = 0
    useInterval(() => {
      if (i < all.length) lines.value.push(all[i++])
      else { lines.value = []; i = 0 }
    }, 700)
    return { lines }
  },
  template: `<div class="t-shell"><div class="t-term">{{ lines.join('\\n') }}<span style="color:#fff">█</span></div></div>`,
})

// 23 — File diff card
const P23 = defineComponent({
  template: `
    <div class="t-shell">
      <div class="t-card">
        <div class="t-head"><span class="chip">edit</span><span>src/auth.ts</span><span class="mute" style="margin-left:auto">+2 −1</span></div>
        <div class="t-diff" style="margin-top:6px">
          <div class="ctx">  function validate(token: string) {</div>
          <div class="del">-   if (!token) return false</div>
          <div class="add">+   if (!token || token.length < 32) return false</div>
          <div class="add">+   logger.debug('validating', token.slice(0,4))</div>
          <div class="ctx">    return verify(token)</div>
          <div class="ctx">  }</div>
        </div>
      </div>
    </div>`,
})

// 24 — Browser action screenshot replay
const P24 = defineComponent({
  setup() {
    const step = ref(0)
    const steps = [
      { url:'example.com',   label:'Click "Sign in"', x: 60, y: 30 },
      { url:'example.com/login', label:'Type email',   x: 50, y: 55 },
      { url:'example.com/login', label:'Click submit', x: 70, y: 75 },
    ]
    useInterval(() => step.value = (step.value+1)%steps.length, 1500)
    return { steps, step }
  },
  template: `
    <div class="t-shell">
      <div class="t-card" style="position:relative;height:160px;background:#1a2030;overflow:hidden">
        <div class="mono mute" style="font-size:11px">{{ steps[step].url }}</div>
        <div style="position:absolute; left:0;right:0;bottom:0;top:24px;background:linear-gradient(180deg,#1f2740,#0e1320)"></div>
        <div :style="{position:'absolute', left: steps[step].x+'%', top: steps[step].y+'%', width:'24px',height:'24px', border:'2px dashed var(--accent-bad)', borderRadius:'4px', transition:'all .4s'}"></div>
      </div>
      <div class="dim" style="font-size:12px">Step {{ step+1 }}/3 — {{ steps[step].label }}</div>
    </div>`,
})

// 25 — MCP tool registry
const P25 = defineComponent({
  setup() {
    const tools = reactive([
      { n:'GitHub',     on:true,  d:'PRs, issues' },
      { n:'Linear',     on:true,  d:'Tickets' },
      { n:'Slack',      on:false, d:'Messages' },
      { n:'Postgres',   on:true,  d:'Queries' },
      { n:'Filesystem', on:true,  d:'Read/write' },
      { n:'Brave',      on:false, d:'Web search' },
    ])
    return { tools }
  },
  template: `
    <div class="t-shell">
      <div class="t-grid">
        <div v-for="t in tools" :key="t.n" class="t-card" style="display:flex;flex-direction:column;gap:4px">
          <div style="font-weight:600">{{ t.n }}</div>
          <div class="mute" style="font-size:11px">{{ t.d }}</div>
          <div style="margin-top:4px">
            <button class="btn-mini" @click="t.on=!t.on" :style="{background: t.on?'var(--accent-good)':'var(--bg-2)', color: t.on?'#0b0c14':null}">{{ t.on?'on':'off' }}</button>
          </div>
        </div>
      </div>
    </div>`,
})

// 26 — Inline web search results carousel
const P26 = defineComponent({
  setup() {
    const results = [
      { fav:'V', title:'Vue 3 docs', host:'vuejs.org' },
      { fav:'M', title:'Why Composition API', host:'medium.com' },
      { fav:'S', title:'StackOverflow Q', host:'stackoverflow.com' },
      { fav:'G', title:'GitHub vue/core', host:'github.com' },
    ]
    return { results }
  },
  template: `
    <div class="t-shell">
      <div style="display:flex;gap:6px;overflow:auto">
        <div v-for="r in results" :key="r.title" class="t-card" style="min-width:140px;display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:18px;height:18px;border-radius:4px;background:var(--accent);color:#0b0c14;display:grid;place-items:center;font-weight:700;font-size:11px">{{ r.fav }}</div>
            <span class="mute" style="font-size:11px">{{ r.host }}</span>
          </div>
          <div style="font-size:12px">{{ r.title }}</div>
        </div>
      </div>
    </div>`,
})

// 27 — SQL query → result table
const P27 = defineComponent({
  setup() {
    const ran = ref(false)
    const rows = [
      { id:1, name:'Alice', score: 94 },
      { id:2, name:'Bo',    score: 88 },
      { id:3, name:'Cas',   score: 76 },
    ]
    return { ran, rows }
  },
  template: `
    <div class="t-shell">
      <div class="t-card" style="font-family:var(--mono);font-size:12px">
        <span style="color:#9aa9ff">SELECT</span> id, name, score
        <span style="color:#9aa9ff">FROM</span> users
        <span style="color:#9aa9ff">ORDER BY</span> score <span style="color:#9aa9ff">DESC</span>;
      </div>
      <button class="btn-mini" style="align-self:flex-start" @click="ran=true">▷ Run</button>
      <table v-if="ran" class="mono" style="font-size:12px;width:100%;border-collapse:collapse">
        <thead><tr><th align="left">id</th><th align="left">name</th><th align="left">score</th></tr></thead>
        <tbody><tr v-for="r in rows" :key="r.id" style="border-top:1px solid var(--line)"><td>{{ r.id }}</td><td>{{ r.name }}</td><td>{{ r.score }}</td></tr></tbody>
      </table>
    </div>`,
})

// 28 — API request/response card
const P28 = defineComponent({
  template: `
    <div class="t-shell">
      <div class="t-card">
        <div class="t-head"><span class="chip accent">POST</span><span>/v1/messages</span><span class="mute" style="margin-left:auto">200 · 412ms</span></div>
        <pre class="mono" style="font-size:11px;margin:6px 0 0;color:var(--text-dim)">{ "model": "frontier-llm-v1", "input": "Hello" }</pre>
      </div>
      <div class="t-card" style="border-color: rgba(109,212,154,0.4)">
        <div class="t-head"><span class="chip good">200</span><span>response</span></div>
        <pre class="mono" style="font-size:11px;margin:6px 0 0;color:var(--accent-good)">{ "id":"msg_abc", "content":[{"text":"Hi! How can I help?"}] }</pre>
      </div>
    </div>`,
})

// 29 — Image generation 4-up
const P29 = defineComponent({
  setup() {
    const colors = [
      ['#7d6df1','#3a64f1'],
      ['#f17d6d','#d96d3a'],
      ['#6df1c4','#3af19a'],
      ['#f1d96d','#f17d3a'],
    ]
    return { colors }
  },
  template: `
    <div class="t-shell">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        <div v-for="(c,i) in colors" :key="i" :style="{aspectRatio:'1',borderRadius:'8px',background:'linear-gradient(135deg,'+c[0]+','+c[1]+')',position:'relative',cursor:'pointer'}">
          <div style="position:absolute;bottom:6px;right:6px;display:flex;gap:4px">
            <button class="btn-mini">U{{ i+1 }}</button>
            <button class="btn-mini">V{{ i+1 }}</button>
          </div>
        </div>
      </div>
    </div>`,
})

// 30 — Tool latency sparkline
const P30 = defineComponent({
  setup() {
    const data = ref(Array.from({length:18}, () => 6 + Math.random()*22))
    useInterval(() => { data.value = [...data.value.slice(1), 6+Math.random()*22] }, 600)
    return { data }
  },
  template: `
    <div class="t-shell">
      <div class="row-c"><b>web_search latency</b><span class="mono mute" style="margin-left:auto">last 18 calls · p95 24ms</span></div>
      <div class="t-spark"><div v-for="(d,i) in data" :key="i" :style="{height: d+'px', background: d>22?'var(--accent-bad)':d>16?'var(--accent-warn)':'var(--accent-good)'}"></div></div>
    </div>`,
})

const meta = [
  { id:21, name:'Tool call card', shortDesc:'Tool name, args, and result in an expandable bordered card.', inspiration:'Vercel AI SDK', tags:['tool','json'], component:P21 },
  { id:22, name:'Live terminal stream', shortDesc:'Black terminal panel streams stdout line by line.', inspiration:'Warp, Replit Agent', tags:['tool','terminal'], component:P22 },
  { id:23, name:'File diff card', shortDesc:'Unified diff hunks with red/green highlighting.', inspiration:'Cursor, GitHub PR review', tags:['tool','diff'], component:P23 },
  { id:24, name:'Browser action replay', shortDesc:'Replays a sequence of browser screenshots with click targets.', inspiration:'Browser Use, Manus', tags:['tool','browser'], component:P24 },
  { id:25, name:'MCP tool registry', shortDesc:'A grid of MCP servers with on/off toggles.', inspiration:'MCP standard', tags:['tool','mcp'], component:P25 },
  { id:26, name:'Inline search cards', shortDesc:'Compact horizontal cards showing search-result sources.', inspiration:'Perplexity, ChatGPT search', tags:['tool','search'], component:P26 },
  { id:27, name:'SQL query → table', shortDesc:'Syntax-highlighted SQL plus a Run button revealing rows.', inspiration:'Hex, Vellum', tags:['tool','sql'], component:P27 },
  { id:28, name:'API request/response pair', shortDesc:'Stacked cards showing the request and response of an API tool.', inspiration:'Postman, Langfuse', tags:['tool','api'], component:P28 },
  { id:29, name:'Image generation 4-up', shortDesc:'Four candidate images with Upscale/Variation buttons.', inspiration:'Midjourney', tags:['tool','image'], component:P29 },
  { id:30, name:'Tool latency sparkline', shortDesc:'Mini bar chart of recent tool latencies, color-coded.', inspiration:'AI observability tools', tags:['tool','perf'], component:P30 },
]

export default meta.map(m => ({ ...m, category:'Tools' }))
