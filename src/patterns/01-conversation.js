import { defineComponent } from 'vue'
import { ref, onMounted, onUnmounted, computed, reactive, useInterval, useTypewriter, injectCss } from './helpers.js'

injectCss('conversation', `
.chat { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.bubble { background: var(--bg-3); padding:8px 10px; border-radius:10px; max-width: 80%; }
.bubble.me { background: var(--accent); color:#0b0c14; align-self:flex-end; }
.bubble.ai { align-self:flex-start; }
.row-c { display:flex; gap:6px; align-items:center; }
.btn-mini { background: var(--bg-3); color: var(--text-dim); border: 1px solid var(--line); border-radius: 999px; padding:2px 8px; font-size:11px; cursor:pointer; }
.btn-mini:hover { color: var(--text); }
`)
function withCss(c) { return c }

// 1 — Token-by-token streaming
const P1 = defineComponent({
  setup() {
    const text = `Sure — let me look into that. I'll search the docs and put together a plan.`
    const { out, restart } = useTypewriter(text, { speed: 28 })
    return { out, restart }
  },
  template: `
    <div class="chat">
      <div class="bubble me">Explain how attention works.</div>
      <div class="bubble ai">{{ out }}<span class="caret"/></div>
      <div class="row-c"><button class="btn-mini" @click="restart">↻ replay</button></div>
    </div>`,
})

// 2 — Message branching tree
const P2 = defineComponent({
  setup() {
    const branches = reactive([
      { id: 'A', text: 'Use a mutex per user.' },
      { id: 'B', text: 'Use Redis with single-key locks.' },
      { id: 'C', text: 'Use postgres advisory locks.' },
    ])
    const sel = ref('B')
    return { branches, sel }
  },
  template: `
    <div class="chat">
      <div class="bubble me">Best way to lock a critical section?</div>
      <div class="row-c" style="margin:4px 0">
        <button v-for="b in branches" :key="b.id" class="btn-mini"
          :style="{background: sel===b.id?'var(--accent)':null, color: sel===b.id?'#0b0c14':null}"
          @click="sel=b.id">{{ b.id }}</button>
        <span class="mute" style="font-size:11px">3 alternatives</span>
      </div>
      <div class="bubble ai">{{ branches.find(b => b.id===sel).text }}</div>
    </div>`,
})

// 3 — Suggested follow-up chips
const P3 = defineComponent({
  setup() {
    const followups = ['Show me an example', 'What about Postgres?', 'Edge cases?', 'Compare with mutex']
    const picked = ref(null)
    return { followups, picked }
  },
  template: `
    <div class="chat">
      <div class="bubble ai">Done. Here are some directions you might want to take next.</div>
      <div class="row-c" style="flex-wrap:wrap;gap:6px">
        <button v-for="f in followups" :key="f" class="btn-mini" @click="picked=f">{{ f }}</button>
      </div>
      <div v-if="picked" class="bubble me" style="margin-top:4px">{{ picked }}</div>
    </div>`,
})

// 4 — Slash command palette
const P4 = defineComponent({
  setup() {
    const items = ['/explain', '/test', '/refactor', '/review', '/docstring', '/write-spec', '/summarise', '/sql']
    const q = ref('/')
    const filtered = computed(() => items.filter(i => i.startsWith(q.value)))
    const sel = ref(0)
    function key(e) {
      if (e.key === 'ArrowDown') sel.value = Math.min(sel.value+1, filtered.value.length-1)
      if (e.key === 'ArrowUp') sel.value = Math.max(sel.value-1, 0)
      if (e.key === 'Enter' && filtered.value[sel.value]) q.value = filtered.value[sel.value] + ' '
    }
    return { items, q, filtered, sel, key }
  },
  template: `
    <div class="chat">
      <input :value="q" @input="q=$event.target.value" @keydown="key" placeholder="Type / for commands"/>
      <div class="surface-2" style="padding:6px">
        <div v-for="(c,i) in filtered" :key="c"
          @click="q=c+' '"
          :style="{padding:'4px 8px', borderRadius:'6px', cursor:'pointer',
                   background: i===sel ? 'var(--accent)':'transparent',
                   color: i===sel ? '#0b0c14':'var(--text)'}">{{ c }}</div>
        <div v-if="!filtered.length" class="mute" style="padding:6px">No matches</div>
      </div>
    </div>`,
})

// 5 — @mention picker
const P5 = defineComponent({
  setup() {
    const all = [
      { kind:'file', name:'auth.ts' }, { kind:'file', name:'README.md' },
      { kind:'agent', name:'researcher' }, { kind:'agent', name:'critic' },
      { kind:'person', name:'Danny' }, { kind:'person', name:'Sun-mi' },
    ]
    const q = ref('')
    const open = ref(true)
    const filtered = computed(() => all.filter(a => a.name.toLowerCase().includes(q.value.toLowerCase())))
    return { q, open, filtered }
  },
  template: `
    <div class="chat">
      <div class="row-c" style="gap:4px">
        <span>@</span>
        <input v-model="q" placeholder="search files / people / agents" style="flex:1"/>
      </div>
      <div v-if="open" class="surface-2" style="padding:6px">
        <div v-for="i in filtered" :key="i.name"
             style="display:flex; gap:8px; padding:4px 6px; align-items:center">
          <span class="chip" :class="{accent:i.kind==='agent', good:i.kind==='person'}">{{ i.kind }}</span>
          <span>{{ i.name }}</span>
        </div>
      </div>
    </div>`,
})

// 6 — Inline edit-a-message and resend
const P6 = defineComponent({
  setup() {
    const original = ref('What is the best DB for analytics?')
    const editing = ref(false)
    const draft = ref('')
    function startEdit() { draft.value = original.value; editing.value = true }
    function save() { original.value = draft.value; editing.value = false }
    return { original, editing, draft, startEdit, save }
  },
  template: `
    <div class="chat">
      <div v-if="!editing" class="bubble me" @click="startEdit" style="cursor:text">
        {{ original }}
        <span class="mute" style="font-size:10px;margin-left:6px">click to edit</span>
      </div>
      <div v-else class="bubble me" style="background: var(--bg-3); color: var(--text); width:100%; max-width:100%">
        <textarea v-model="draft" style="width:100%;height:48px;background:transparent;border:none;color:inherit;resize:none;outline:none"/>
        <div class="row-c" style="justify-content:flex-end;gap:6px">
          <button class="btn-mini" @click="editing=false">Cancel</button>
          <button class="btn-mini" style="background:var(--accent);color:#0b0c14" @click="save">↻ Resend</button>
        </div>
      </div>
      <div class="bubble ai">Snowflake is great for warehousing; ClickHouse for low-latency queries…</div>
    </div>`,
})

// 7 — Regenerate variations carousel
const P7 = defineComponent({
  setup() {
    const variants = [
      'Snowflake is best for OLAP at scale.',
      'For low-latency analytics, ClickHouse is hard to beat.',
      'BigQuery if you live on GCP and want serverless.',
    ]
    const i = ref(0)
    return { variants, i }
  },
  template: `
    <div class="chat">
      <div class="bubble ai">{{ variants[i] }}</div>
      <div class="row-c" style="justify-content:space-between">
        <div class="row-c">
          <button class="btn-mini" @click="i=(i-1+variants.length)%variants.length">‹</button>
          <span class="mono mute" style="font-size:11px">{{ i+1 }} / {{ variants.length }}</span>
          <button class="btn-mini" @click="i=(i+1)%variants.length">›</button>
        </div>
        <button class="btn-mini">↻ Regenerate</button>
      </div>
    </div>`,
})

// 8 — Citation hover cards
const P8 = defineComponent({
  setup() {
    const refs = [
      { id:1, src:'arXiv 2024', title:'Attention Is All You Need v2', snippet:'…the transformer outperforms…' },
      { id:2, src:'NeurIPS 2025', title:'Scaling Mixture of Experts', snippet:'…sparsity yields better…' },
    ]
    const hover = ref(null)
    return { refs, hover }
  },
  template: `
    <div class="chat">
      <div class="bubble ai">
        Transformers outperform RNNs on long-context tasks
        <sup @mouseenter="hover=1" @mouseleave="hover=null" style="color:var(--accent);cursor:pointer">[1]</sup>
        and MoE scales further
        <sup @mouseenter="hover=2" @mouseleave="hover=null" style="color:var(--accent);cursor:pointer">[2]</sup>.
      </div>
      <div v-if="hover" class="surface-2" style="padding:8px;margin-top:4px;max-width:80%">
        <div class="mono mute" style="font-size:11px">{{ refs.find(r=>r.id===hover).src }}</div>
        <div style="font-weight:600">{{ refs.find(r=>r.id===hover).title }}</div>
        <div class="dim" style="font-size:12px">{{ refs.find(r=>r.id===hover).snippet }}</div>
      </div>
    </div>`,
})

// 9 — Markdown raw vs rendered toggle
const P9 = defineComponent({
  setup() {
    const md = `# Plan\n- Step **A**\n- Step **B**\n\n\`code\` here`
    const html = `<h3 style="margin:0 0 4px">Plan</h3>
<ul style="margin:0;padding-left:18px"><li>Step <strong>A</strong></li><li>Step <strong>B</strong></li></ul>
<code style="background:var(--bg-3);padding:1px 5px;border-radius:4px">code</code> here`
    const mode = ref('rendered')
    return { md, html, mode }
  },
  template: `
    <div class="chat">
      <div class="row-c"><button class="btn-mini" @click="mode='rendered'" :style="{background: mode==='rendered'?'var(--accent)':null, color: mode==='rendered'?'#0b0c14':null}">Rendered</button>
        <button class="btn-mini" @click="mode='raw'" :style="{background: mode==='raw'?'var(--accent)':null, color: mode==='raw'?'#0b0c14':null}">Raw</button>
      </div>
      <div class="bubble ai" style="white-space:pre-wrap">
        <div v-if="mode==='rendered'" v-html="html"/>
        <code v-else class="mono" style="font-size:12px">{{ md }}</code>
      </div>
    </div>`,
})

// 10 — Barge-in interrupt
const P10 = defineComponent({
  setup() {
    const speaking = ref(false)
    const text = ref('I am about to explain a long thing — feel free to interrupt me at any time…')
    const out = ref('')
    let t = null
    function start() {
      out.value = ''
      speaking.value = true
      let i = 0
      t = setInterval(() => {
        if (i >= text.value.length || !speaking.value) { clearInterval(t); return }
        out.value += text.value[i++]
      }, 40)
    }
    function interrupt() { speaking.value = false; out.value += ' …[interrupted]' }
    onMounted(start)
    onUnmounted(() => { if (t) clearInterval(t) })
    return { speaking, out, interrupt, start }
  },
  template: `
    <div class="chat">
      <div class="bubble ai">{{ out }}<span v-if="speaking" class="caret"/></div>
      <div class="row-c" style="justify-content:flex-end;gap:6px">
        <button class="btn-mini" @click="interrupt" v-if="speaking" style="background:var(--accent-bad);color:#0b0c14">⏸ Interrupt</button>
        <button class="btn-mini" v-else @click="start">▶ Replay</button>
      </div>
    </div>`,
})

const meta = [
  { id:1, name:'Token-by-token streaming', shortDesc:'Words appear as the model emits them, with a blinking caret.', inspiration:'ChatGPT, Perplexity', tags:['chat','streaming'], component:withCss(P1) },
  { id:2, name:'Message branching tree', shortDesc:'Multiple alternative replies you can switch between.', inspiration:'ChatGPT branches', tags:['chat','versions'], component:withCss(P2) },
  { id:3, name:'Suggested follow-up chips', shortDesc:'Auto-suggested next questions you can tap to send.', inspiration:'Gemini, Perplexity', tags:['chat','suggestions'], component:withCss(P3) },
  { id:4, name:'Slash command palette', shortDesc:'Type / to invoke an action with a fuzzy palette.', inspiration:'Cursor, Linear', tags:['chat','palette'], component:withCss(P4) },
  { id:5, name:'@mention picker', shortDesc:'Mention files, people, or other agents in chat.', inspiration:'Cursor, Slack', tags:['chat','context'], component:withCss(P5) },
  { id:6, name:'Edit-and-resend message', shortDesc:'Click your prior message to edit it and re-ask.', inspiration:'ChatGPT', tags:['chat','retry'], component:withCss(P6) },
  { id:7, name:'Regenerate variations carousel', shortDesc:'Step through several model regenerations.', inspiration:'Midjourney, ChatGPT', tags:['chat','retry'], component:withCss(P7) },
  { id:8, name:'Citation hover cards', shortDesc:'Hover an inline footnote to preview the source.', inspiration:'Perplexity, NotebookLM', tags:['chat','citations'], component:withCss(P8) },
  { id:9, name:'Markdown raw/rendered toggle', shortDesc:'Switch between rendered and raw markdown view.', inspiration:'Notion AI', tags:['chat','format'], component:withCss(P9) },
  { id:10, name:'Voice barge-in / interrupt', shortDesc:'Stop the model mid-stream, like talking over a person.', inspiration:'ChatGPT voice mode', tags:['chat','voice'], component:withCss(P10) },
]

export default meta.map(m => ({ ...m, category:'Conversation' }))
