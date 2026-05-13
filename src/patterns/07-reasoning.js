import { defineComponent } from 'vue'
import { ref, onMounted, onUnmounted, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('reasoning', `
.r-shell { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.r-cot { font-size:12px; color: var(--text-dim); border-left: 3px solid var(--line-2); padding: 4px 10px; }
.r-card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.r-conf { display:flex; gap:2px; }
.r-conf > div { width:16px; height:8px; border-radius:2px; }
`)

// 61 — Plan-then-act split
const P61 = defineComponent({
  setup() {
    const plan = ['Read repo','Find auth','Refactor token check','Add tests','Run CI']
    const cur = ref(2)
    useInterval(() => cur.value = (cur.value+1)%plan.length, 1500)
    return { plan, cur }
  },
  template: `
    <div class="r-shell">
      <div style="display:grid;grid-template-columns: 140px 1fr; gap:10px; flex:1;">
        <div class="r-card">
          <div class="mute" style="font-size:11px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px">Plan</div>
          <div v-for="(p,i) in plan" :key="p" :style="{padding:'2px 0', color: i===cur?'var(--accent)':null, fontWeight: i===cur?'600':'400'}">{{ i+1 }}. {{ p }}</div>
        </div>
        <div class="r-card mono" style="font-size:11px;color:var(--text-dim)">
          <div class="mute" style="font-size:11px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;color:var(--text-mute)">Acting</div>
          ▶ {{ plan[cur] }}…<span class="caret"/>
        </div>
      </div>
    </div>`,
})

// 62 — Collapsible chain-of-thought
const P62 = defineComponent({
  setup() {
    const open = ref(false)
    return { open }
  },
  template: `
    <div class="r-shell">
      <div class="row-c"><button class="btn-mini" @click="open=!open">Thought for 8s {{ open?'▾':'▸' }}</button></div>
      <div v-if="open" class="r-cot" style="font-style:italic">
        First, identify the function. It's in src/auth.ts. The current check only validates non-empty strings; we should also check minimum length and trim whitespace. Then add tests for the boundary cases.
      </div>
      <div class="r-card"><b>Answer:</b> Update the check to require ≥32 chars and trim input.</div>
    </div>`,
})

// 63 — Decision tree
const P63 = defineComponent({
  template: `
    <div class="r-shell" style="align-items:center;justify-content:center">
      <svg width="280" height="160" viewBox="0 0 280 160">
        <line x1="140" y1="20" x2="60"  y2="80" stroke="var(--accent)"      stroke-width="2"/>
        <line x1="140" y1="20" x2="220" y2="80" stroke="var(--line-2)"     stroke-dasharray="4 3"/>
        <line x1="60"  y1="80" x2="20"  y2="140" stroke="var(--accent)"     stroke-width="2"/>
        <line x1="60"  y1="80" x2="100" y2="140" stroke="var(--line-2)"   stroke-dasharray="4 3"/>
        <line x1="220" y1="80" x2="180" y2="140" stroke="var(--line-2)"   stroke-dasharray="4 3"/>
        <line x1="220" y1="80" x2="260" y2="140" stroke="var(--line-2)"   stroke-dasharray="4 3"/>
        <g v-for="(n,i) in [{x:140,y:20,t:'Q'},{x:60,y:80,t:'A'},{x:220,y:80,t:'B'},{x:20,y:140,t:'A1'},{x:100,y:140,t:'A2'},{x:180,y:140,t:'B1'},{x:260,y:140,t:'B2'}]" :key="i">
          <circle :cx="n.x" :cy="n.y" r="14" :fill="['Q','A','A1'].includes(n.t)?'var(--accent)':'var(--bg-3)'" stroke="var(--line-2)"/>
          <text :x="n.x" :y="n.y+4" font-size="10" text-anchor="middle" :fill="['Q','A','A1'].includes(n.t)?'#0b0c14':'#e6e8f0'">{{ n.t }}</text>
        </g>
      </svg>
      <div class="dim" style="font-size:11px">solid path = chosen, dashed = considered alternative</div>
    </div>`,
})

// 64 — Reasoning effort dial
const P64 = defineComponent({
  setup() {
    const lvl = ref(2)
    const labels = ['Off','Low','Medium','High','Extreme']
    const colors = ['var(--text-mute)','var(--accent-2)','var(--accent)','var(--accent-warn)','var(--accent-bad)']
    return { lvl, labels, colors }
  },
  template: `
    <div class="r-shell" style="align-items:center;justify-content:center">
      <div :style="{fontSize:'32px',fontWeight:700,color:colors[lvl]}">{{ labels[lvl] }}</div>
      <input type="range" min="0" max="4" v-model.number="lvl" style="width:80%"/>
      <div class="dim" style="font-size:11px">trades latency &amp; cost for answer quality</div>
    </div>`,
})

// 65 — Hypothesis cards with confidence
const P65 = defineComponent({
  setup() {
    const hyps = [
      { t:'A: race condition in router push',   c:72 },
      { t:'B: stale cache in store',            c:50 },
      { t:'C: server returns wrong cookie',     c:18 },
    ]
    return { hyps }
  },
  template: `
    <div class="r-shell">
      <div v-for="h in hyps" :key="h.t" class="r-card">
        <div class="row-c"><b>{{ h.t }}</b><span class="mono mute" style="margin-left:auto">{{ h.c }}%</span></div>
        <div style="height:5px;background:var(--bg-2);border-radius:5px;margin-top:6px;overflow:hidden">
          <div :style="{width: h.c+'%', height:'100%', background: h.c>60?'var(--accent-good)':h.c>30?'var(--accent-warn)':'var(--accent-bad)'}"/>
        </div>
      </div>
    </div>`,
})

// 66 — Live todo checklist with check animation
const P66 = defineComponent({
  setup() {
    const items = reactive([
      { t:'Find auth middleware', done:true },
      { t:'Refactor validation',  done:true },
      { t:'Add boundary tests',   done:false },
      { t:'Run CI',               done:false },
    ])
    let i = 2
    useInterval(() => {
      if (i < items.length) { items[i].done = true; i++ }
      else { for (const x of items) x.done = false; items[0].done = true; items[1].done = true; i = 2 }
    }, 1400)
    return { items }
  },
  template: `
    <div class="r-shell">
      <div v-for="x in items" :key="x.t" style="display:flex;gap:8px;align-items:center;padding:4px 0">
        <span :style="{display:'inline-grid', placeItems:'center', width:'18px',height:'18px',borderRadius:'50%', background: x.done?'var(--accent-good)':'var(--bg-3)', color:'#0b0c14', fontSize:'12px', transition:'all .25s'}">{{ x.done?'✓':'' }}</span>
        <span :style="{textDecoration: x.done?'line-through':null, color: x.done?'var(--text-mute)':null}">{{ x.t }}</span>
      </div>
    </div>`,
})

// 67 — Self-reflection note
const P67 = defineComponent({
  template: `
    <div class="r-shell">
      <div class="r-card">My first answer recommended a simple mutex.</div>
      <div class="r-card" style="border-color: var(--accent-warn); background: rgba(245,193,97,0.06)">
        <div class="chip warn">on reflection</div>
        <div style="margin-top:4px;font-style:italic">…that misses the multi-process case. A redis lock is safer.</div>
        <button class="btn-mini" style="margin-top:6px;background:var(--accent);color:#0b0c14">Use revised answer</button>
      </div>
    </div>`,
})

// 68 — Tool selection rationale
const P68 = defineComponent({
  setup() {
    const show = ref(false)
    return { show }
  },
  template: `
    <div class="r-shell">
      <div class="r-card" @mouseenter="show=true" @mouseleave="show=false" style="position:relative;cursor:help">
        <div class="row-c"><span class="chip accent">tool</span><span>web_search</span></div>
        <div v-if="show" class="surface-2" style="position:absolute;top:100%;left:0;right:0;margin-top:6px;padding:8px;font-size:11px;color:var(--text-dim);z-index:2">
          chose <b>web_search</b> because the question references events after the model's training cutoff (Jan 2026).
        </div>
      </div>
      <div class="dim" style="font-size:11px">hover the card to see "why this tool"</div>
    </div>`,
})

// 69 — Backtrack indicator
const P69 = defineComponent({
  template: `
    <div class="r-shell">
      <div v-for="(s,i) in ['Read schema','Try migration A','Run tests','Roll back','Try migration B','Tests pass']" :key="s" style="display:flex;gap:10px;align-items:center;padding:3px 0">
        <span class="mono mute" style="width:16px">{{ i+1 }}</span>
        <span :style="{textDecoration: i===1?'line-through':null, color: i===1?'var(--accent-bad)':null}">{{ s }}</span>
        <span v-if="i===3" class="chip bad" style="margin-left:8px">↻ backtracked</span>
      </div>
    </div>`,
})

// 70 — Confidence meter
const P70 = defineComponent({
  setup() {
    const filled = 4
    return { filled }
  },
  template: `
    <div class="r-shell">
      <div class="r-card">
        <b>Answer:</b> "Use Postgres advisory locks per user id."
      </div>
      <div class="row-c">
        <span class="dim" style="font-size:11px">Confidence</span>
        <div class="r-conf">
          <div v-for="k in 5" :key="k" :style="{background: k<=filled ? 'var(--accent-good)' : 'var(--bg-3)'}"/>
        </div>
        <span class="mono mute" style="font-size:11px">82%</span>
      </div>
    </div>`,
})

const meta = [
  { id:61, name:'Plan-then-act split',  shortDesc:'Left-pane plan, right-pane live execution against it.', inspiration:'Devin, Manus', tags:['reasoning','plan'], component:P61 },
  { id:62, name:'Collapsed chain-of-thought', shortDesc:'"Show reasoning" expander hides verbose internal monologue.', inspiration:'ChatGPT o1', tags:['reasoning'], component:P62 },
  { id:63, name:'Decision tree visualizer', shortDesc:'SVG tree highlights the chosen path through alternatives.', inspiration:'Tree-of-Thoughts', tags:['reasoning'], component:P63 },
  { id:64, name:'Reasoning effort dial',shortDesc:'Slider trades cost/latency for answer quality.', inspiration:'OpenAI o-series', tags:['reasoning','control'], component:P64 },
  { id:65, name:'Hypothesis cards',     shortDesc:'Each candidate hypothesis shows a confidence bar.', inspiration:'Research agents', tags:['reasoning'], component:P65 },
  { id:66, name:'Live todo checklist',  shortDesc:'Checklist items tick off with smooth animation as work proceeds.', inspiration:'Devin, Linear AI', tags:['reasoning','plan'], component:P66 },
  { id:67, name:'Self-reflection note', shortDesc:'Yellow callout where the model corrects a previous answer.', inspiration:'Reflexion, ReAct', tags:['reasoning'], component:P67 },
  { id:68, name:'Tool-rationale tooltip', shortDesc:'Hover a tool call to see "why this tool".', inspiration:'agent observability research', tags:['reasoning','tool'], component:P68 },
  { id:69, name:'Backtrack indicator',  shortDesc:'Strikethrough + red badge marks abandoned reasoning paths.', inspiration:'Tree-of-Thoughts', tags:['reasoning'], component:P69 },
  { id:70, name:'Confidence meter',     shortDesc:'Segmented bar shows the model\'s self-rated confidence.', inspiration:'Carbon for AI explainability', tags:['reasoning'], component:P70 },
]

export default meta.map(m => ({ ...m, category:'Reasoning' }))
