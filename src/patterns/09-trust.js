import { defineComponent } from 'vue'
import { ref, onMounted, onUnmounted, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('trust', `
.tr-shell { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.tr-card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:10px; }
.tr-modal { background: var(--bg-1); border:1px solid var(--line-2); border-radius:10px; padding:12px; box-shadow: var(--shadow); }
.tr-stop { width:80px;height:80px; border-radius:50%; background: var(--accent-bad); color:#fff; font-weight:800; display:grid; place-items:center; cursor:pointer; border: 4px solid #b04545; box-shadow: 0 6px 0 #5c1f1f; transition: all .12s; user-select:none; }
.tr-stop:active { box-shadow: 0 0 0 #5c1f1f; transform: translateY(6px); }
.tr-cmd { background:#000; color:#a8f0a8; font-family:var(--mono); font-size:11px; padding:6px 8px; border-radius:6px; }
@keyframes shake { 0%,100% { transform: translateX(0)} 20%{transform:translateX(-4px)} 40%{transform:translateX(4px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)}}
.shake { animation: shake .35s; }
`)

// 81 — Allowlist permission prompt
const P81 = defineComponent({
  setup() {
    const open = ref(true)
    const choice = ref(null)
    function pick(c) { choice.value = c; setTimeout(() => { open.value = false; choice.value = null; setTimeout(() => open.value=true, 1200) }, 600) }
    return { open, choice, pick }
  },
  template: `
    <div class="tr-shell">
      <div v-if="open" class="tr-modal">
        <div style="font-weight:600">Run shell command?</div>
        <div class="tr-cmd" style="margin:8px 0">$ rm -rf node_modules</div>
        <div class="row-c" style="gap:6px;justify-content:flex-end">
          <button class="btn-mini" @click="pick('once')" :style="{background: choice==='once'?'var(--accent-good)':null, color: choice==='once'?'#0b0c14':null}">Allow once</button>
          <button class="btn-mini" @click="pick('always')" :style="{background: choice==='always'?'var(--accent-good)':null, color: choice==='always'?'#0b0c14':null}">Always</button>
          <button class="btn-mini" @click="pick('deny')" :style="{background: choice==='deny'?'var(--accent-bad)':null, color: choice==='deny'?'#0b0c14':null}">Deny</button>
        </div>
      </div>
      <div v-else class="dim">Choice recorded… reopening</div>
    </div>`,
})

// 82 — Undo last AI action
const P82 = defineComponent({
  setup() {
    const show = ref(false)
    let t = null
    function fire() { show.value = true; clearTimeout(t); t = setTimeout(() => show.value=false, 5000) }
    onMounted(fire)
    return { show, fire }
  },
  template: `
    <div class="tr-shell" style="position:relative">
      <button class="btn-mini" @click="fire" style="align-self:flex-start">Trigger AI action</button>
      <div v-if="show" style="position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:center">
        <div class="tr-modal" style="background:#000;display:flex;gap:10px;align-items:center;padding:8px 14px">
          <span>↩ Edited <b>auth.ts</b></span>
          <button class="btn-mini" style="background:var(--accent);color:#0b0c14">Undo</button>
        </div>
      </div>
    </div>`,
})

// 83 — Dry-run preview
const P83 = defineComponent({
  template: `
    <div class="tr-shell">
      <div class="tr-card" style="border-color: var(--accent-warn); background: rgba(245,193,97,0.06)">
        <div class="chip warn">DRY RUN — no changes will be made</div>
        <div style="margin-top:6px">The agent <em>will</em>:</div>
        <ul style="margin:4px 0 0 16px;padding:0;line-height:1.6">
          <li class="mono" style="font-size:11px">POST /v1/users {name:"Alex"}</li>
          <li class="mono" style="font-size:11px">DELETE /v1/sess/abc</li>
          <li class="mono" style="font-size:11px">PATCH /v1/projects/42</li>
        </ul>
      </div>
      <div class="row-c"><button class="btn-mini" style="background:var(--accent-good);color:#0b0c14">Approve &amp; run</button><button class="btn-mini">Cancel</button></div>
    </div>`,
})

// 84 — Diff approval per hunk
const P84 = defineComponent({
  template: `
    <div class="tr-shell">
      <div class="tr-card mono" style="font-size:12px">
        <div style="color:var(--accent-bad);background:rgba(249,123,123,0.1);padding:0 6px">- old code line</div>
        <div style="color:var(--accent-good);background:rgba(109,212,154,0.1);padding:0 6px">+ new safer code line</div>
      </div>
      <div class="row-c"><button class="btn-mini" style="background:var(--accent-good);color:#0b0c14">✓ Accept (⌘↵)</button><button class="btn-mini" style="background:var(--accent-bad);color:#0b0c14">✕ Reject (⌘⌫)</button></div>
    </div>`,
})

// 85 — Watch-me mode
const P85 = defineComponent({
  setup() {
    const recording = ref(true)
    const sec = ref(0)
    useInterval(() => { if (recording.value) sec.value++ }, 1000)
    const steps = computed(() => Math.floor(sec.value/2))
    return { recording, sec, steps }
  },
  template: `
    <div class="tr-shell">
      <div class="tr-card" style="display:flex;gap:8px;align-items:center">
        <div :class="{pulse: recording}" style="width:10px;height:10px;border-radius:50%;background:var(--accent-bad)"></div>
        <span>Recording • {{ Math.floor(sec/60) }}:{{ String(sec%60).padStart(2,'0') }}</span>
        <button class="btn-mini" style="margin-left:auto" @click="recording=!recording">{{ recording?'■ Stop':'▶ Resume' }}</button>
      </div>
      <div class="dim" style="font-size:11px">Captured <b>{{ steps }}</b> step{{ steps===1?'':'s' }}: clicks, key strokes, scrolls</div>
    </div>`,
})

// 86 — Autopilot toggle
const P86 = defineComponent({
  setup() {
    const auto = ref(false)
    return { auto }
  },
  template: `
    <div class="tr-shell">
      <div class="row-c">
        <span :style="{color: !auto?'var(--accent)':'var(--text-mute)', fontWeight: !auto?'600':'400'}">Supervised</span>
        <div @click="auto=!auto" :style="{width:'40px',height:'22px',borderRadius:'11px',background: auto?'var(--accent-warn)':'var(--bg-3)',border:'1px solid var(--line-2)', position:'relative', cursor:'pointer', transition:'all .2s'}">
          <div :style="{position:'absolute',top:'1px', left: auto?'19px':'1px', width:'18px',height:'18px',borderRadius:'50%', background:'#fff', transition:'left .2s'}"></div>
        </div>
        <span :style="{color: auto?'var(--accent-warn)':'var(--text-mute)', fontWeight: auto?'600':'400'}">Autopilot</span>
      </div>
      <div v-if="auto" class="tr-card" style="border-color: var(--accent-warn); background: rgba(245,193,97,0.08); display:flex; gap:6px; align-items:center">
        ⚠ <span class="dim">Autopilot is on — agent will write to disk and call APIs without asking.</span>
      </div>
    </div>`,
})

// 87 — Kill switch
const P87 = defineComponent({
  setup() {
    const halted = ref(false)
    const sh = ref(false)
    function smash() { halted.value = true; sh.value = true; setTimeout(() => sh.value=false, 400) }
    function reset() { halted.value = false }
    return { halted, sh, smash, reset }
  },
  template: `
    <div class="tr-shell" :class="{shake: sh}" style="align-items:center;justify-content:center">
      <div class="tr-stop" @click="smash" v-if="!halted">STOP</div>
      <div v-else class="tr-card" style="border-color:var(--accent-bad);background:rgba(249,123,123,0.1)">
        <b style="color:var(--accent-bad)">All agents halted.</b>
        <div class="dim" style="font-size:11px;margin-top:4px">No further tool calls will execute.</div>
        <button class="btn-mini" style="margin-top:6px" @click="reset">Reset</button>
      </div>
    </div>`,
})

// 88 — Risk badge per tool call
const P88 = defineComponent({
  template: `
    <div class="tr-shell">
      <div v-for="r in [{l:'low',c:'good',t:'read_file(README.md)'},{l:'medium',c:'warn',t:'edit_file(auth.ts)'},{l:'high',c:'bad',t:'shell(rm -rf node_modules)'}]" :key="r.t"
        class="tr-card mono" style="display:flex;gap:8px;align-items:center;font-size:12px">
        <span class="chip" :class="r.c">risk: {{ r.l }}</span>
        <span style="flex:1">{{ r.t }}</span>
      </div>
    </div>`,
})

// 89 — Spend cap meter
const P89 = defineComponent({
  setup() {
    const used = ref(2.4)
    const cap = 5
    useInterval(() => { used.value = +((used.value + 0.05) % cap).toFixed(2) }, 200)
    const pct = computed(() => Math.min(100, (used.value/cap)*100))
    return { used, cap, pct }
  },
  template: `
    <div class="tr-shell">
      <div class="row-c"><b>Today's spend</b><span class="mono mute" style="margin-left:auto">\${{ used.toFixed(2) }} / \${{ cap.toFixed(2) }}</span></div>
      <div style="height:8px;background:var(--bg-3);border-radius:8px;overflow:hidden">
        <div :style="{width: pct+'%', height:'100%', background: pct>80?'var(--accent-bad)':pct>50?'var(--accent-warn)':'var(--accent-good)', transition:'all .2s'}"/>
      </div>
      <div v-if="pct>80" class="dim" style="font-size:11px;color:var(--accent-bad)">Approaching daily cap — agent will pause at 100%.</div>
    </div>`,
})

// 90 — Receipt log
const P90 = defineComponent({
  template: `
    <div class="tr-shell">
      <div class="tr-card">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="chip good">action complete</span>
          <span class="mute mono" style="font-size:11px;margin-left:auto">15:02:48 KST</span>
        </div>
        <div style="margin-top:8px;display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;gap:8px;align-items:center"><span style="color:var(--accent-good)">✓</span> Sent email to alex@acme.io <button class="btn-mini" style="margin-left:auto">Rollback</button></div>
          <div style="display:flex;gap:8px;align-items:center"><span style="color:var(--accent-good)">✓</span> Updated CRM record #4421 <button class="btn-mini" style="margin-left:auto">Rollback</button></div>
          <div style="display:flex;gap:8px;align-items:center"><span style="color:var(--accent-good)">✓</span> Closed ticket LIN-128 <button class="btn-mini" style="margin-left:auto">Rollback</button></div>
        </div>
      </div>
    </div>`,
})

const meta = [
  { id:81, name:'Permission prompt', shortDesc:'Modal asks Allow-once / Always / Deny before a risky tool runs.', inspiration:'Cursor, browser agents', tags:['trust','permission'], component:P81 },
  { id:82, name:'Undo AI action', shortDesc:'Floating Undo pill appears for a few seconds after every change.', inspiration:'Gmail undo send', tags:['trust','undo'], component:P82 },
  { id:83, name:'Dry-run preview', shortDesc:'Yellow banner lists exactly what an action will do, awaiting approval.', inspiration:'Terraform plan', tags:['trust','preview'], component:P83 },
  { id:84, name:'Diff approval', shortDesc:'Inline diff with green Accept / red Reject buttons.', inspiration:'Cursor, Copilot', tags:['trust','diff'], component:P84 },
  { id:85, name:'Watch-me record mode', shortDesc:'User performs a task; agent records steps to replay later.', inspiration:'Adept ACT, browser agents', tags:['trust','record'], component:P85 },
  { id:86, name:'Supervised ↔ Autopilot', shortDesc:'Big toggle switches the agent between supervised and autonomous.', inspiration:'GitHub Copilot CLI, VS Code', tags:['trust','control'], component:P86 },
  { id:87, name:'Big red kill switch', shortDesc:'A 3D e-stop button halts all agents instantly with screen shake.', inspiration:'Industrial safety', tags:['trust','safety'], component:P87 },
  { id:88, name:'Risk badge per call', shortDesc:'Each tool call is tagged Low / Medium / High risk.', inspiration:'Smashing agentic UX', tags:['trust','risk'], component:P88 },
  { id:89, name:'Spend cap meter', shortDesc:'Live budget bar with color thresholds; agent pauses at 100%.', inspiration:'OpenAI usage limits', tags:['trust','cost'], component:P89 },
  { id:90, name:'Action receipt + rollback', shortDesc:'After-action receipt of all changes with per-row rollback.', inspiration:'Smashing agentic UX, Stripe', tags:['trust','receipt'], component:P90 },
]

export default meta.map(m => ({ ...m, category:'Trust & Control' }))
