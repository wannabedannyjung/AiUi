import { defineComponent } from 'vue'
import { ref, onMounted, onUnmounted, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('memory', `
.me-shell { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.me-card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.me-chip { display:inline-flex; align-items:center; gap:6px; padding:3px 10px; border-radius:999px; background: rgba(139,140,247,0.12); color: var(--accent); border:1px solid rgba(139,140,247,0.4); font-size:12px; }
.me-stick { background:#f5e89c; color:#3d3a16; border-radius:6px; padding:6px 8px; font-size:12px; }
.me-toggle { display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:999px; background: var(--bg-3); border:1px solid var(--line); cursor:pointer; }
.me-toggle.on { background: var(--accent); color:#0b0c14; border-color:transparent; }
`)

// 71 — Memory chips
const P71 = defineComponent({
  setup() {
    const chips = reactive(['Lives in Berlin','Vegan','Vue developer','Has a dog Otto'])
    function rm(i) { chips.splice(i,1) }
    return { chips, rm }
  },
  template: `
    <div class="me-shell">
      <div class="dim" style="font-size:11px">things I remember about you:</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <div v-for="(c,i) in chips" :key="c" class="me-chip">{{ c }}<button class="btn-mini" style="padding:0 6px;background:transparent;border:none;color:inherit" @click="rm(i)">×</button></div>
        <button class="me-chip" style="cursor:pointer">+ add</button>
      </div>
    </div>`,
})

// 72 — Pinned facts board (sticky notes)
const P72 = defineComponent({
  setup() {
    const notes = ['Project: AiUx', 'Stack: Vue 3', 'TZ: KST', 'Style: dark', 'Pet: Otto', 'Goal: 100 demos']
    return { notes }
  },
  template: `
    <div class="me-shell">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
        <div v-for="n in notes" :key="n" class="me-stick" :style="{transform: 'rotate(' + ((Math.random()-0.5)*4) + 'deg)'}">📌 {{ n }}</div>
      </div>
    </div>`,
})

// 73 — "What I remember" drawer
const P73 = defineComponent({
  setup() {
    const open = ref(true)
    return { open }
  },
  template: `
    <div class="me-shell" style="position:relative">
      <button class="btn-mini" @click="open=!open" style="align-self:flex-start">{{ open?'Close':'Open' }} memory drawer</button>
      <div v-if="open" class="me-card" style="display:flex;flex-direction:column;gap:6px">
        <div class="dim mono" style="font-size:11px;text-transform:uppercase">About you</div>
        <div>• You prefer Vue over React</div>
        <div>• You ship dark UIs</div>
        <div class="dim mono" style="font-size:11px;text-transform:uppercase;margin-top:6px">Projects</div>
        <div>• AiUx (this dashboard)</div>
        <div>• Cigar, Snowball, Stocker</div>
      </div>
    </div>`,
})

// 74 — Forget button with undo toast
const P74 = defineComponent({
  setup() {
    const chips = reactive(['Likes coffee','Wakes at 6am','Lives in Seoul'])
    const toast = ref(null)
    function rm(i) {
      const removed = chips[i]; chips.splice(i,1)
      toast.value = removed
      setTimeout(() => { if (toast.value === removed) toast.value = null }, 4000)
    }
    function undo() { if (toast.value) { chips.push(toast.value); toast.value = null } }
    return { chips, toast, rm, undo }
  },
  template: `
    <div class="me-shell" style="position:relative">
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <div v-for="(c,i) in chips" :key="c" class="me-chip">{{ c }}<button class="btn-mini" style="padding:0 6px;background:transparent;border:none;color:inherit" @click="rm(i)">🗑</button></div>
      </div>
      <div v-if="toast" class="me-card" style="position:absolute;left:0;right:0;bottom:0;background:#000;border-color:var(--line-2)">
        Forgot "<b>{{ toast }}</b>" · <button class="btn-mini" style="background:var(--accent);color:#0b0c14" @click="undo">Undo</button>
      </div>
    </div>`,
})

// 75 — Retrieval citations (RAG)
const P75 = defineComponent({
  setup() {
    const sel = ref(null)
    const docs = [
      { id:'3.2', title:'auth-spec.md',   text:'Tokens must be ≥32 chars and rotated every 30 days.' },
      { id:'5.1', title:'security-policy.pdf', text:'Sessions expire after 7 days of inactivity.' },
    ]
    return { sel, docs }
  },
  template: `
    <div class="me-shell">
      <div class="me-card">
        Tokens require <sub @mouseenter="sel='3.2'" @mouseleave="sel=null" style="color:var(--accent);cursor:pointer">[doc 3.2]</sub> to be 32 chars long, and sessions expire <sub @mouseenter="sel='5.1'" @mouseleave="sel=null" style="color:var(--accent);cursor:pointer">[doc 5.1]</sub> after 7 days.
      </div>
      <div v-if="sel" class="me-card" style="border-color:var(--accent)">
        <div class="dim mono" style="font-size:11px">{{ docs.find(d=>d.id===sel).title }}</div>
        <div>{{ docs.find(d=>d.id===sel).text }}</div>
      </div>
    </div>`,
})

// 76 — Knowledge graph view
const P76 = defineComponent({
  template: `
    <div class="me-shell" style="align-items:center;justify-content:center">
      <svg width="280" height="160" viewBox="0 0 280 160">
        <line v-for="(l,i) in [[140,80,40,30],[140,80,240,30],[140,80,40,130],[140,80,240,130],[40,30,40,130]]" :key="i" :x1="l[0]" :y1="l[1]" :x2="l[2]" :y2="l[3]" stroke="var(--line-2)"/>
        <g v-for="(n,i) in [{x:140,y:80,t:'You'},{x:40,y:30,t:'Vue'},{x:240,y:30,t:'AI'},{x:40,y:130,t:'Berlin'},{x:240,y:130,t:'Otto'}]" :key="i">
          <circle :cx="n.x" :cy="n.y" r="22" :fill="i===0?'var(--accent)':'var(--bg-3)'" stroke="var(--line-2)"/>
          <text :x="n.x" :y="n.y+4" font-size="10" text-anchor="middle" :fill="i===0?'#0b0c14':'#e6e8f0'">{{ n.t }}</text>
        </g>
      </svg>
    </div>`,
})

// 77 — Conversation summary header
const P77 = defineComponent({
  template: `
    <div class="me-shell">
      <div class="me-card" style="display:flex;gap:8px;align-items:center">
        <span style="font-size:18px">✨</span>
        <i class="dim" style="flex:1">User is debugging a Vue Router redirect loop and wants to compare global vs per-route guards.</i>
        <button class="btn-mini">✎ edit</button>
      </div>
    </div>`,
})

// 78 — Context source toggle (memory/files/web)
const P78 = defineComponent({
  setup() {
    const on = reactive({ memory:true, files:true, web:false })
    return { on }
  },
  template: `
    <div class="me-shell">
      <div class="dim" style="font-size:11px">use as context for next reply:</div>
      <div style="display:flex;gap:6px">
        <button v-for="k in ['memory','files','web']" :key="k" class="me-toggle" :class="{on: on[k]}" @click="on[k]=!on[k]">{{ on[k]?'✓':'○' }} {{ k }}</button>
      </div>
    </div>`,
})

// 79 — Recent files attached
const P79 = defineComponent({
  setup() {
    const files = reactive([
      { n:'auth.ts',   s:'4.2 KB' },
      { n:'README.md', s:'2.1 KB' },
      { n:'router.ts', s:'1.8 KB' },
    ])
    function rm(i) { files.splice(i,1) }
    return { files, rm }
  },
  template: `
    <div class="me-shell">
      <div class="dim" style="font-size:11px">attached as context:</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <div v-for="(f,i) in files" :key="f.n" class="me-card" style="display:flex;gap:6px;align-items:center;padding:4px 8px">
          <span class="mono">📄</span>
          <span class="mono" style="font-size:11px">{{ f.n }}</span>
          <span class="mute mono" style="font-size:10px">{{ f.s }}</span>
          <button class="btn-mini" style="padding:0 6px" @click="rm(i)">×</button>
        </div>
      </div>
    </div>`,
})

// 80 — Memory diff toast
const P80 = defineComponent({
  template: `
    <div class="me-shell">
      <div class="me-card">
        <div class="mute" style="font-size:11px;text-transform:uppercase">Memory updated</div>
        <div style="color:var(--accent-good)">+ Lives in Berlin</div>
        <div style="color:var(--accent-bad);text-decoration:line-through">- Lives in NYC</div>
        <div class="row-c" style="margin-top:8px">
          <button class="btn-mini" style="background:var(--accent);color:#0b0c14">Keep</button>
          <button class="btn-mini">Discard</button>
        </div>
      </div>
    </div>`,
})

const meta = [
  { id:71, name:'Memory chips',           shortDesc:'Pills at top of chat list facts the AI knows about you.', inspiration:'ChatGPT memory', tags:['memory'], component:P71 },
  { id:72, name:'Pinned facts board',     shortDesc:'Sticky-note grid of facts the user can pin and rearrange.', inspiration:'Notion AI, mem.ai', tags:['memory'], component:P72 },
  { id:73, name:'"What I remember" drawer', shortDesc:'Side drawer summarising what the agent knows about you.', inspiration:'ChatGPT, mem.ai', tags:['memory'], component:P73 },
  { id:74, name:'Forget + undo toast',    shortDesc:'Trash a memory; an undo toast lets you bring it back.', inspiration:'Gmail undo, ChatGPT', tags:['memory','undo'], component:P74 },
  { id:75, name:'Retrieval citations',    shortDesc:'Inline footnotes link answers to retrieved doc chunks.', inspiration:'Perplexity, RAG apps', tags:['memory','rag'], component:P75 },
  { id:76, name:'Knowledge graph view',   shortDesc:'Node-graph of entities the agent has connected.', inspiration:'NotebookLM mind map', tags:['memory'], component:P76 },
  { id:77, name:'Conversation summary',   shortDesc:'Auto-generated 1-line summary at the top of long chats.', inspiration:'Slack AI summary', tags:['memory'], component:P77 },
  { id:78, name:'Context source toggle',  shortDesc:'Toggle which sources (memory/files/web) feed the next reply.', inspiration:'Cursor, Vellum', tags:['memory','control'], component:P78 },
  { id:79, name:'Attached files chips',   shortDesc:'Compact chips for files currently in context with size + remove.', inspiration:'Cursor, ChatGPT projects', tags:['memory','context'], component:P79 },
  { id:80, name:'Memory diff toast',      shortDesc:'After-conversation toast of memory adds / removes.', inspiration:'ChatGPT memory', tags:['memory'], component:P80 },
]

export default meta.map(m => ({ ...m, category:'Memory' }))
