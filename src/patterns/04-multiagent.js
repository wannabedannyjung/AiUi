import { defineComponent } from 'vue'
import { ref, onMounted, onUnmounted, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('multi', `
.m-shell { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.m-node { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:6px 10px; font-size:12px; }
.m-bubble { width:32px; height:32px; border-radius:50%; display:grid; place-items:center; color:#0b0c14; font-weight:700; font-size:11px; }
.m-lane { display:flex; gap:6px; align-items:center; }
.m-lane > div:first-child { width:80px; font-size:11px; color: var(--text-mute); }
.m-bar { height: 14px; border-radius:4px; }
`)

// 31 — Org chart
const P31 = defineComponent({
  template: `
    <div class="m-shell" style="align-items:center;justify-content:center">
      <div class="m-node">Manager</div>
      <svg width="220" height="22"><line x1="110" y1="0" x2="110" y2="10" stroke="var(--line-2)"/><line x1="30" y1="10" x2="190" y2="10" stroke="var(--line-2)"/><line x1="30" y1="10" x2="30" y2="22" stroke="var(--line-2)"/><line x1="110" y1="10" x2="110" y2="22" stroke="var(--line-2)"/><line x1="190" y1="10" x2="190" y2="22" stroke="var(--line-2)"/></svg>
      <div style="display:flex;gap:14px"><div class="m-node">Researcher</div><div class="m-node">Writer</div><div class="m-node">Critic</div></div>
    </div>`,
})

// 32 — Swarm bubble view
const P32 = defineComponent({
  setup() {
    const colors = ['#8b8cf7', '#6ad9c4', '#f5c161', '#f97b7b', '#a4f06d']
    const blobs = reactive(colors.map((c,i) => ({ c, x: 20+i*40, y: 40+(i%2)*40, dx: (Math.random()-.5)*0.6, dy: (Math.random()-.5)*0.6 })))
    useInterval(() => {
      for (const b of blobs) {
        b.x += b.dx; b.y += b.dy
        if (b.x < 10 || b.x > 240) b.dx *= -1
        if (b.y < 10 || b.y > 130) b.dy *= -1
      }
    }, 60)
    return { blobs }
  },
  template: `
    <div class="m-shell">
      <div style="position:relative;height:160px;background:var(--bg-3);border-radius:8px;overflow:hidden">
        <div v-for="(b,i) in blobs" :key="i" class="m-bubble" :style="{position:'absolute', left:b.x+'px', top:b.y+'px', background:b.c, transition:'left .06s, top .06s'}">A{{ i+1 }}</div>
      </div>
      <div class="dim" style="font-size:11px">5 swarm agents drifting; lines drawn when they communicate.</div>
    </div>`,
})

// 33 — Handoff arrow
const P33 = defineComponent({
  setup() {
    const dash = ref(120)
    useInterval(() => dash.value = dash.value > 0 ? dash.value - 8 : 120, 80)
    return { dash }
  },
  template: `
    <div class="m-shell" style="align-items:center;justify-content:center">
      <div style="display:flex;gap:80px;align-items:center;position:relative">
        <div class="m-bubble" style="background:var(--accent)">R</div>
        <div class="m-bubble" style="background:var(--accent-2)">W</div>
        <svg width="80" height="20" style="position:absolute; left:32px;top:6px">
          <line x1="0" y1="10" x2="80" y2="10" stroke="var(--accent)" stroke-width="2" stroke-dasharray="6 4" :stroke-dashoffset="dash"/>
          <polygon points="80,10 72,5 72,15" fill="var(--accent)"/>
        </svg>
      </div>
      <div class="dim" style="font-size:12px">Handoff: <code>research_done</code> → Writer</div>
    </div>`,
})

// 34 — Debate panel
const P34 = defineComponent({
  template: `
    <div class="m-shell">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="m-node" style="background:rgba(109,212,154,0.08);border-color:rgba(109,212,154,0.4)"><b style="color:var(--accent-good)">Pro</b><div style="margin-top:6px">Microservices give us deploy independence.</div></div>
        <div class="m-node" style="background:rgba(249,123,123,0.08);border-color:rgba(249,123,123,0.4)"><b style="color:var(--accent-bad)">Con</b><div style="margin-top:6px">…but operational overhead doubles per service.</div></div>
        <div class="m-node" style="background:rgba(109,212,154,0.08);border-color:rgba(109,212,154,0.4)">Each team owns a clean boundary.</div>
        <div class="m-node" style="background:rgba(249,123,123,0.08);border-color:rgba(249,123,123,0.4)">Distributed tracing becomes mandatory.</div>
      </div>
    </div>`,
})

// 35 — Critic margin notes
const P35 = defineComponent({
  template: `
    <div class="m-shell" style="position:relative">
      <div class="surface-2" style="padding:10px;line-height:1.5">
        Today we'll <span style="background:rgba(245,193,97,0.2);border-bottom:1px dashed var(--accent-warn)">deploy on Friday</span> and add a feature flag so we can roll back if needed. <span style="background:rgba(245,193,97,0.2);border-bottom:1px dashed var(--accent-warn)">Skip review</span> to move faster.
      </div>
      <div style="position:absolute; right:4px; top:6px; width:130px; padding:6px; background: var(--accent-warn); color:#0b0c14; border-radius:8px;font-size:11px">⚠ Friday deploy + skipping review = high risk</div>
    </div>`,
})

// 36 — Voting tally
const P36 = defineComponent({
  template: `
    <div class="m-shell">
      <div v-for="r in [['A',60,'var(--accent-warn)'],['B',20,'var(--accent)'],['C',15,'var(--accent-2)'],['D',5,'var(--text-mute)']]" :key="r[0]" class="m-lane">
        <div>Option {{ r[0] }}</div>
        <div class="m-bar" :style="{width: r[1]+'%', background: r[2]}"></div>
        <span class="mono mute" style="font-size:11px">{{ r[1] }}%</span>
      </div>
      <div class="dim" style="font-size:11px">A wins by majority ▾</div>
    </div>`,
})

// 37 — Boardroom metaphor (top-down table)
const P37 = defineComponent({
  setup() {
    const speaker = ref(0)
    useInterval(() => speaker.value = (speaker.value+1)%4, 2000)
    return { speaker }
  },
  template: `
    <div class="m-shell" style="align-items:center;justify-content:center">
      <div style="position:relative;width:220px;height:160px">
        <div style="position:absolute;left:30px;top:50px;right:30px;bottom:50px;border-radius:60px;background:var(--bg-3);border:1px solid var(--line)"></div>
        <div v-for="(p,i) in [{x:90,y:0},{x:170,y:60},{x:90,y:120},{x:10,y:60}]" :key="i"
             class="m-bubble"
             :style="{position:'absolute', left:p.x+'px', top:p.y+'px', background: i===speaker?'var(--accent)':'var(--bg-3)', color: i===speaker?'#0b0c14':'var(--text-dim)', transition:'all .3s', transform: i===speaker?'scale(1.15)':'scale(1)'}">A{{ i+1 }}</div>
      </div>
      <div class="dim" style="font-size:12px">Speaking: <b>Agent {{ speaker+1 }}</b></div>
    </div>`,
})

// 38 — Role badge legend
const P38 = defineComponent({
  setup() {
    const msgs = [
      { role:'Researcher', c:'#6ad9c4', t:'I found 3 relevant docs.' },
      { role:'Writer',     c:'#8b8cf7', t:'Drafting the summary now.' },
      { role:'Critic',     c:'#f5c161', t:'You missed the security note in §4.' },
    ]
    return { msgs }
  },
  template: `
    <div class="m-shell">
      <div v-for="m in msgs" :key="m.role" class="m-node" :style="{borderLeft:'4px solid '+m.c}">
        <div class="row-c"><span class="chip" :style="{color:m.c, borderColor:m.c}">{{ m.role }}</span></div>
        <div style="margin-top:4px">{{ m.t }}</div>
      </div>
    </div>`,
})

// 39 — Inter-agent message bus
const P39 = defineComponent({
  setup() {
    const msgs = ref([
      { from:'R', to:'W', t:'docs ready' },
      { from:'W', to:'C', t:'draft v1 sent' },
    ])
    let n = 0
    useInterval(() => {
      const samples = [{from:'C',to:'W',t:'fix § intro'},{from:'W',to:'M',t:'final review'},{from:'M',to:'R',t:'one more source'}]
      msgs.value.push(samples[n%samples.length]); n++
      if (msgs.value.length > 6) msgs.value.shift()
    }, 1400)
    return { msgs }
  },
  template: `
    <div class="m-shell mono" style="font-size:12px">
      <div v-for="(m,i) in msgs" :key="i" style="display:flex;gap:8px">
        <span class="chip">{{ m.from }} → {{ m.to }}</span>
        <span>{{ m.t }}</span>
      </div>
    </div>`,
})

// 40 — Workflow graph editor
const P40 = defineComponent({
  setup() {
    const active = ref(2)
    useInterval(() => active.value = (active.value+1)%4, 1200)
    return { active }
  },
  template: `
    <div class="m-shell" style="align-items:center">
      <svg width="260" height="160" viewBox="0 0 260 160">
        <path d="M40,30 C90,30 90,80 130,80" stroke="var(--line-2)" fill="none" stroke-width="1.5"/>
        <path d="M130,80 C170,80 170,30 220,30" stroke="var(--line-2)" fill="none" stroke-width="1.5"/>
        <path d="M130,80 C170,80 170,130 220,130" stroke="var(--line-2)" fill="none" stroke-width="1.5"/>
        <g v-for="(n,i) in [{x:40,y:30,t:'Input'},{x:130,y:80,t:'Plan'},{x:220,y:30,t:'Tool A'},{x:220,y:130,t:'Tool B'}]" :key="i">
          <rect :x="n.x-30" :y="n.y-12" width="60" height="24" rx="6" :fill="i===active?'var(--accent)':'var(--bg-3)'" :stroke="i===active?'var(--accent)':'var(--line-2)'"/>
          <text :x="n.x" :y="n.y+4" text-anchor="middle" font-size="10" :fill="i===active?'#0b0c14':'#e6e8f0'">{{ n.t }}</text>
        </g>
      </svg>
      <div class="dim" style="font-size:11px">Currently executing the highlighted node.</div>
    </div>`,
})

const meta = [
  { id:31, name:'Agent org chart',    shortDesc:'Manager-to-worker tree of agents with reporting lines.', inspiration:'CrewAI, MetaGPT', tags:['multi','tree'], component:P31 },
  { id:32, name:'Swarm bubble view',  shortDesc:'Floating bubble agents drift in shared space.', inspiration:'OpenAI Swarm', tags:['multi','swarm'], component:P32 },
  { id:33, name:'Handoff arrow',      shortDesc:'Animated arrow visualises one agent handing off to another.', inspiration:'OpenAI Swarm, LangGraph', tags:['multi','handoff'], component:P33 },
  { id:34, name:'Debate panel',       shortDesc:'Two opposing agents trade arguments in side-by-side columns.', inspiration:'Multi-agent debate research', tags:['multi','debate'], component:P34 },
  { id:35, name:'Critic margin notes',shortDesc:'A reviewer agent leaves margin sticky-notes on a draft.', inspiration:'Evaluator-Optimiser pattern', tags:['multi','review'], component:P35 },
  { id:36, name:'Voting tally',       shortDesc:'Bar chart of votes across agents picking the best answer.', inspiration:'Multi-agent voting', tags:['multi','vote'], component:P36 },
  { id:37, name:'Boardroom metaphor', shortDesc:'Top-down view of agents seated around a table; speaker pulses.', inspiration:'AutoGen Studio', tags:['multi','metaphor'], component:P37 },
  { id:38, name:'Role badge legend',  shortDesc:'Each message tagged by role with a colored left border.', inspiration:'CrewAI, MetaGPT', tags:['multi','roles'], component:P38 },
  { id:39, name:'Message bus stream', shortDesc:'Live monospaced stream of every inter-agent message.', inspiration:'AutoGen, Langfuse', tags:['multi','log'], component:P39 },
  { id:40, name:'Workflow graph',     shortDesc:'Node-graph showing the agent pipeline; current node pulses.', inspiration:'LangGraph Studio, n8n', tags:['multi','graph'], component:P40 },
]

export default meta.map(m => ({ ...m, category:'Multi-Agent' }))
