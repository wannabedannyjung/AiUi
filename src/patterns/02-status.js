import { defineComponent } from 'vue'
import { ref, onMounted, onUnmounted, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('status', `
.s-shell { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.s-pill { display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:999px; background:var(--bg-3); border:1px solid var(--line); font-size:12px; }
.s-dot { width:8px; height:8px; border-radius:50%; background: var(--accent); }
.s-feed { font-family: var(--mono); font-size:12px; line-height:1.55; }
.s-task { display:flex; gap:8px; align-items:center; padding:4px 8px; border-radius:6px; }
.s-bar { height:6px; border-radius:6px; background: var(--bg-3); overflow:hidden; }
.s-bar > div { height:100%; background: var(--grad); transition: width .3s ease; }
.s-avatar { width:48px; height:48px; border-radius:50%; background: var(--grad); display:grid; place-items:center; font-size:20px; }
`)

// 11 — Live thinking indicator with rotating verb
const P11 = defineComponent({
  setup() {
    const verbs = ['Thinking', 'Reading docs', 'Searching', 'Reasoning', 'Drafting', 'Reviewing']
    const i = ref(0)
    useInterval(() => i.value = (i.value+1)%verbs.length, 1500)
    return { verbs, i }
  },
  template: `
    <div class="s-shell">
      <div class="s-pill"><span class="s-dot pulse"/> <span>{{ verbs[i] }}…</span></div>
      <div class="dim" style="font-size:11px">verb cycles every 1.5s while the agent is busy</div>
    </div>`,
})

// 12 — Sub-task collapsible plan
const P12 = defineComponent({
  setup() {
    const tasks = reactive([
      { t:'Read repo structure', done:true, open:false, sub:['fs.readdir(/src)'] },
      { t:'Locate auth middleware', done:true, open:false, sub:['grep "authMiddleware"'] },
      { t:'Refactor token validation', done:false, open:true, sub:['edit auth.ts:42','add tests'] },
      { t:'Run unit tests', done:false, open:false, sub:[] },
    ])
    return { tasks }
  },
  template: `
    <div class="s-shell">
      <div v-for="(x, idx) in tasks" :key="idx">
        <div class="s-task" @click="x.open=!x.open" style="cursor:pointer">
          <span :style="{color: x.done?'var(--accent-good)':'var(--text-mute)'}">{{ x.done?'✓':'○' }}</span>
          <span :style="{textDecoration: x.done?'line-through':null, color: x.done?'var(--text-mute)':null}">{{ x.t }}</span>
          <span class="mute" style="margin-left:auto;font-size:11px">{{ x.open?'▾':'▸' }}</span>
        </div>
        <div v-if="x.open" style="padding-left:24px">
          <div v-for="s in x.sub" :key="s" class="mono mute" style="font-size:11px">↳ {{ s }}</div>
          <div v-if="!x.sub.length" class="mute" style="font-size:11px">…queued…</div>
        </div>
      </div>
    </div>`,
})

// 13 — Activity feed timeline
const P13 = defineComponent({
  setup() {
    const events = reactive([
      { t:'15:02:01', kind:'tool', msg:'web_search("vue 3 reactive ref")' },
      { t:'15:02:03', kind:'msg', msg:'Found 4 promising results' },
      { t:'15:02:04', kind:'tool', msg:'fetch_url(vuejs.org/api/reactivity)' },
      { t:'15:02:08', kind:'msg', msg:'Drafting reply…' },
    ])
    let n = 4
    useInterval(() => {
      if (events.length > 8) events.shift()
      events.push({ t:'15:02:' + String(8+n).padStart(2,'0'), kind: n%2?'tool':'msg', msg: n%2?'edit_file(auth.ts:'+n+')':'Step '+n+' complete' })
      n++
    }, 1800)
    return { events }
  },
  template: `
    <div class="s-shell s-feed">
      <div v-for="e in events" :key="e.t" style="display:flex;gap:8px">
        <span class="mute">{{ e.t }}</span>
        <span class="chip" :class="e.kind==='tool'?'accent':'good'">{{ e.kind }}</span>
        <span style="flex:1">{{ e.msg }}</span>
      </div>
    </div>`,
})

// 14 — ETA bar with confidence
const P14 = defineComponent({
  setup() {
    const pct = ref(0)
    useInterval(() => { pct.value = (pct.value+3)%100 }, 200)
    return { pct }
  },
  template: `
    <div class="s-shell">
      <div class="row-c"><b>Generating answer</b><span class="mute mono" style="margin-left:auto">~{{ Math.max(1, Math.round((100-pct)/8)) }}s left</span></div>
      <div class="s-bar"><div :style="{width: pct+'%'}"/></div>
      <div class="dim" style="font-size:11px">confidence: <span style="color:var(--accent-good)">85%</span> — based on tool latency history</div>
    </div>`,
})

// 15 — Status pill (idle/busy/blocked)
const P15 = defineComponent({
  setup() {
    const states = [
      { k:'idle',    color:'var(--text-mute)',    label:'Idle — waiting for input' },
      { k:'busy',    color:'var(--accent)',       label:'Busy — generating…' },
      { k:'blocked', color:'var(--accent-warn)',  label:'Blocked — needs your approval' },
      { k:'error',   color:'var(--accent-bad)',   label:'Error — sandbox denied write' },
    ]
    const i = ref(1)
    return { states, i }
  },
  template: `
    <div class="s-shell">
      <div class="s-pill" :style="{borderColor: states[i].color}">
        <span class="s-dot" :style="{background: states[i].color}"/>
        <span>{{ states[i].label }}</span>
      </div>
      <div class="row-c"><button v-for="(s,k) in states" :key="s.k" class="btn-mini" @click="i=k">{{ s.k }}</button></div>
    </div>`,
})

// 16 — Heartbeat dot
const P16 = defineComponent({
  setup() {
    const beat = ref(0)
    useInterval(() => beat.value++, 1000)
    return { beat }
  },
  template: `
    <div class="s-shell">
      <div class="row-c">
        <span class="s-dot" :style="{background:'var(--accent-good)', transform:'scale('+(1+(beat%2)*.4)+')', transition:'transform 200ms'}"/>
        <span>Agent alive — last heartbeat #{{ beat }}</span>
      </div>
      <div class="dim" style="font-size:11px">A pulse every second proves the connection is live; absence triggers reconnect.</div>
    </div>`,
})

// 17 — Breathing avatar
const P17 = defineComponent({
  template: `
    <div class="s-shell" style="align-items:center;justify-content:center;flex:1">
      <div class="s-avatar pulse">●</div>
      <div class="mute">your AI is here</div>
    </div>`,
})

// 18 — Last-action breadcrumb
const P18 = defineComponent({
  setup() {
    const trail = ['Plan', 'Search docs', 'Edit auth.ts', 'Run tests']
    const cursor = ref(3)
    return { trail, cursor }
  },
  template: `
    <div class="s-shell">
      <div class="row-c" style="flex-wrap:wrap;gap:4px">
        <template v-for="(t,i) in trail" :key="t">
          <span :style="{color: i===cursor?'var(--accent)':'var(--text-mute)', fontWeight: i===cursor?'600':'400'}">{{ t }}</span>
          <span v-if="i<trail.length-1" class="mute">›</span>
        </template>
      </div>
      <div class="dim" style="font-size:12px">currently: <b>{{ trail[cursor] }}</b></div>
    </div>`,
})

// 19 — Live draft "considering"
const P19 = defineComponent({
  setup() {
    const drafts = [
      'Hmm, a hash map could work…',
      'Actually a B-tree would be faster for this access pattern…',
      'Wait — the data fits in memory, so just sort it.',
    ]
    const i = ref(0)
    useInterval(() => i.value = (i.value+1)%drafts.length, 2200)
    return { drafts, i }
  },
  template: `
    <div class="s-shell">
      <div class="dim" style="font-size:11px">currently considering…</div>
      <div class="surface-2" style="padding:8px;font-style:italic;color:var(--text-dim)">{{ drafts[i] }}<span class="caret"/></div>
      <div class="dim" style="font-size:11px">drafts shown live let users course-correct early</div>
    </div>`,
})

// 20 — Token cost meter
const P20 = defineComponent({
  setup() {
    const used = ref(1240)
    useInterval(() => { used.value += Math.floor(Math.random()*30) }, 600)
    return { used }
  },
  template: `
    <div class="s-shell">
      <div class="row-c"><b>Tokens this turn</b><span class="mono mute" style="margin-left:auto">{{ used.toLocaleString() }} / 8000</span></div>
      <div class="s-bar"><div :style="{width: Math.min(100, used/80)+'%', background: used>4000?'var(--accent-warn)':'var(--grad)'}"/></div>
      <div class="dim" style="font-size:11px">est. cost: <b>\${{ (used*0.000003).toFixed(4) }}</b></div>
    </div>`,
})

const meta = [
  { id:11, name:'Live thinking verb', shortDesc:'Rotating verbs ("Thinking…", "Searching…") show what the agent is doing right now.', inspiration:'Cursor, Devin', tags:['status','realtime'], component:P11 },
  { id:12, name:'Sub-task plan list', shortDesc:'Collapsible to-do tree the agent ticks off as it works.', inspiration:'Devin, Linear AI', tags:['status','plan'], component:P12 },
  { id:13, name:'Activity feed timeline', shortDesc:'Live, monospaced log of every tool call and message.', inspiration:'Devin, AutoGen Studio', tags:['status','log'], component:P13 },
  { id:14, name:'ETA + confidence bar', shortDesc:'Progress bar with a confidence-based time-remaining estimate.', inspiration:'GitHub Copilot Workspace', tags:['status','progress'], component:P14 },
  { id:15, name:'Idle / Busy / Blocked pill', shortDesc:'A single pill that color-codes the agent state.', inspiration:'Linear AI', tags:['status'], component:P15 },
  { id:16, name:'Heartbeat dot', shortDesc:'A 1Hz pulse proves the long-running session is still alive.', inspiration:'AWS console, Replit Agent', tags:['status'], component:P16 },
  { id:17, name:'Breathing avatar', shortDesc:'Soft pulsing avatar that signals "I\'m present, not stuck".', inspiration:'ChatGPT voice mode', tags:['status','presence'], component:P17 },
  { id:18, name:'Action breadcrumb', shortDesc:'Where am I in the high-level plan, right now.', inspiration:'Replit Agent', tags:['status','nav'], component:P18 },
  { id:19, name:'Live "considering" draft', shortDesc:'Show the model\'s in-progress private thought, italicised.', inspiration:'frontier reasoning UIs', tags:['status','reasoning'], component:P19 },
  { id:20, name:'Token cost meter', shortDesc:'Running tally of tokens and dollars consumed this turn.', inspiration:'OpenAI Playground', tags:['status','cost'], component:P20 },
]

export default meta.map(m => ({ ...m, category:'Status' }))
