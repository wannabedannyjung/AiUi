import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('status-extra', `
.sx { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.sx .pill { display:inline-flex; align-items:center; gap:6px; padding:3px 10px; border-radius:999px; background:var(--bg-3); border:1px solid var(--line); font-size:12px; }
.sx .dot  { width:8px; height:8px; border-radius:50%; background: var(--accent); }
.sx .row  { display:flex; gap:6px; align-items:center; }
.sx .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
@keyframes spin { to { transform: rotate(360deg) } }
.sx .ring { width:24px;height:24px; border:3px solid var(--line); border-top-color: var(--accent); border-radius:50%; animation: spin 1s linear infinite; }
@keyframes bounce { 0%,80%,100% { transform: scale(0.6); opacity:.5} 40%{transform: scale(1); opacity:1}}
.sx .bd > span { display:inline-block; width:8px;height:8px;border-radius:50%; background: var(--accent); animation: bounce 1.2s infinite; }
.sx .bd > span:nth-child(2){ animation-delay: .15s }
.sx .bd > span:nth-child(3){ animation-delay: .3s }
@keyframes scan { 0%{left:-30%} 100%{left:130%} }
.sx .scan { position:relative; height:6px; background: var(--bg-3); border-radius:6px; overflow:hidden; }
.sx .scan > div { position:absolute; top:0; height:100%; width:30%; background:linear-gradient(90deg,transparent, var(--accent),transparent); animation: scan 1.6s infinite; }
@keyframes glow { 0%,100%{box-shadow: 0 0 0 0 rgba(139,140,247,0.4)} 50%{box-shadow: 0 0 0 8px rgba(139,140,247,0)} }
.sx .glow { animation: glow 1.4s infinite; }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'modern AI dashboards', tags: extra.tags||['status'], component: comp })

const P141 = defineComponent({ template:`<div class="sx"><div class="row pill">Working <span class="bd"><span/><span/><span/></span></div></div>`})
const P142 = defineComponent({ template:`<div class="sx row"><div class="ring"/><span>Generating answer…</span></div>`})
const P143 = defineComponent({ template:`<div class="sx" style="align-items:center;justify-content:center"><div class="bd" style="display:flex;gap:8px"><span style="background:var(--accent)"/><span style="background:var(--accent-2)"/><span style="background:var(--accent-warn)"/></div></div>`})
const P144 = defineComponent({ template:`<div class="sx"><div>Crawling docs…</div><div class="scan"><div/></div></div>`})
const P145 = defineComponent({ setup(){ const i=ref(3); useInterval(()=>i.value=(i.value%7)+1,1500); return {i} }, template:`<div class="sx"><div class="pill"><b>{{ i }} / 7 steps</b> · Reading file</div></div>`})
const P146 = defineComponent({ template:`<div class="sx"><div class="row"><span class="pill">TTFT 412 ms</span><span class="mute" style="font-size:11px">time to first token</span></div></div>`})
const P147 = defineComponent({ template:`<div class="sx"><div style="height:3px;background:var(--bg-3);overflow:hidden"><div style="height:100%;width:30%;background:var(--grad);animation: scan 2s infinite"></div></div><div class="dim" style="font-size:11px">3px ribbon at top of page while agent is active</div></div>`})
const P148 = defineComponent({ setup(){ const d=ref([12,18,9,22,14,28,11,16]); useInterval(()=>{d.value=[...d.value.slice(1),5+Math.random()*30]},700); return {d} }, template:`<div class="sx"><div class="row"><b>API latency</b><span class="mute mono" style="margin-left:auto;font-size:11px">p95 28ms</span></div><svg width="100%" height="40" viewBox="0 0 240 40" preserveAspectRatio="none"><polyline :points="d.map((y,i)=>i*30+','+(40-y)).join(' ')" fill="none" stroke="var(--accent)" stroke-width="2"/></svg></div>`})
const P149 = defineComponent({ setup(){ const m=ref(64); useInterval(()=>m.value=(m.value+1)%100,200); return {m} }, template:`<div class="sx"><div class="row"><b>Memory</b><span class="mute mono" style="margin-left:auto">{{ m }}% / 8 GB</span></div><div style="height:6px;background:var(--bg-3);border-radius:6px;overflow:hidden"><div :style="{width:m+'%',height:'100%',background:'var(--grad)'}"/></div></div>`})
const P150 = defineComponent({ template:`<div class="sx row"><span class="pill">CPU 38%</span><span class="pill">GPU 71%</span><span class="pill">VRAM 12 / 24 GB</span></div>`})
const P151 = defineComponent({ template:`<div class="sx card" style="text-align:center"><div style="font-size:32px;font-weight:800;color:var(--accent)">#3</div><div class="dim">your position in queue</div><div class="mute" style="font-size:11px">~ 25s</div></div>`})
const P152 = defineComponent({ setup(){ const s=ref(60); useInterval(()=>{s.value=s.value>0?s.value-1:60},1000); return {s} }, template:`<div class="sx pill">⏳ rate limit resets in {{ s }}s</div>`})
const P153 = defineComponent({ setup(){ const cells=Array.from({length:30},()=>Math.random()>0.05); return {cells} }, template:`<div class="sx"><div style="display:grid;grid-template-columns:repeat(15,1fr);gap:3px"><div v-for="(o,i) in cells" :key="i" :style="{aspectRatio:'1',borderRadius:'2px',background:o?'var(--accent-good)':'var(--accent-bad)'}"/></div><div class="dim" style="font-size:11px">uptime last 30 days · 99.7%</div></div>`})
const P154 = defineComponent({ setup(){ const arr=[1,1,2,3,5,8,5,4,3,2,1,3]; return {arr} }, template:`<div class="sx"><div class="row"><b>recent runs</b><span class="mute" style="margin-left:auto;font-size:11px">12</span></div><svg width="100%" height="36" viewBox="0 0 120 36" preserveAspectRatio="none"><rect v-for="(v,i) in arr" :key="i" :x="i*10+1" :y="36-v*4" :width="8" :height="v*4" fill="var(--accent)"/></svg></div>`})
const P155 = defineComponent({ template:`<div class="sx card" style="border-color:var(--accent-bad);background:rgba(249,123,123,0.08)"><span class="chip bad">last error</span><div style="margin-top:4px">429 rate-limited at 14:02 — backing off</div></div>`})
const P156 = defineComponent({ template:`<div class="sx card" style="border-color:var(--accent-good);background:rgba(109,212,154,0.08)"><span class="chip good">last success</span><div style="margin-top:4px">CI green at 14:08 · 23 tests</div></div>`})
const P157 = defineComponent({ template:`<div class="sx row"><span class="pill" style="background:rgba(245,193,97,0.1);border-color:rgba(245,193,97,0.4);color:var(--accent-warn)">⚠ data is 3h old</span></div>`})
const P158 = defineComponent({ setup(){ const r=ref(false); function go(){r.value=true;setTimeout(()=>r.value=false,1200)} return {r,go} }, template:`<div class="sx row"><button class="mini" @click="go" style="display:inline-flex;align-items:center;gap:6px"><span :style="{display:'inline-block',width:'10px',height:'10px',border:'2px solid var(--accent)',borderTopColor:'transparent',borderRadius:'50%',animation:r?'spin 0.6s linear infinite':null}"/>{{ r?'refreshing':'↻ refresh' }}</button></div>`})
const P159 = defineComponent({ setup(){ const s=ref('connected'); return {s} }, template:`<div class="sx"><div class="row"><span class="pill"><span class="dot" :style="{background: s==='connected'?'var(--accent-good)':s==='reconnecting'?'var(--accent-warn)':'var(--accent-bad)'}"/>WebSocket: {{ s }}</span></div><div class="row"><button class="mini" @click="s='connected'">connected</button><button class="mini" @click="s='reconnecting'">reconnecting</button><button class="mini" @click="s='offline'">offline</button></div></div>`})
const P160 = defineComponent({ setup(){ const s=ref(5); useInterval(()=>{s.value=s.value>0?s.value-1:5},1000); return {s} }, template:`<div class="sx pill" style="background:rgba(245,193,97,0.1);border-color:rgba(245,193,97,0.4);color:var(--accent-warn)">⟳ reconnecting in {{ s }}s…</div>`})
const P161 = defineComponent({ template:`<div class="sx card" style="text-align:center"><div style="font-size:36px;font-weight:800;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent">142</div><div class="dim">tasks completed today</div></div>`})
const P162 = defineComponent({ template:`<div class="sx row"><span class="pill"><span class="dot pulse" style="background:var(--accent)"/>3 tools active</span><span class="pill">2 idle</span></div>`})
const P163 = defineComponent({ template:`<div class="sx row"><span class="pill">🤖 5 sub-agents</span><span class="mute" style="font-size:11px">avg load 0.4</span></div>`})
const P164 = defineComponent({ setup(){ const r=ref(120); useInterval(()=>r.value=80+Math.floor(Math.random()*120),300); return {r} }, template:`<div class="sx"><div class="row"><b>Token rate</b><span class="mono mute" style="margin-left:auto">{{ r }} tok/s</span></div><div class="scan"><div/></div></div>`})
const P165 = defineComponent({ setup(){ const v=ref(60); useInterval(()=>v.value=20+Math.floor(Math.random()*70),700); return {v} }, template:`<div class="sx" style="align-items:center"><svg width="120" height="70" viewBox="0 0 120 70"><path d="M10 60 A 50 50 0 0 1 110 60" fill="none" stroke="var(--bg-3)" stroke-width="8"/><path d="M10 60 A 50 50 0 0 1 110 60" fill="none" :stroke="v>70?'var(--accent-bad)':v>40?'var(--accent-warn)':'var(--accent-good)'" stroke-width="8" :stroke-dasharray="157" :stroke-dashoffset="157-(v*1.57)"/><text x="60" y="55" text-anchor="middle" font-size="16" fill="var(--text)">{{ v }}</text></svg><div class="dim" style="font-size:11px">throughput</div></div>`})
const P166 = defineComponent({ template:`<div class="sx pill" style="background:rgba(109,212,154,0.1);border-color:rgba(109,212,154,0.4);color:var(--accent-good)">💚 health 96 / 100</div>`})
const P167 = defineComponent({ template:`<div class="sx pill">🔥 12-day streak</div>`})
const P168 = defineComponent({ template:`<div class="sx row"><span style="position:relative;display:inline-grid;place-items:center;width:32px;height:32px;border-radius:8px;background:var(--bg-3)">🔔<span style="position:absolute;top:-2px;right:-2px;width:8px;height:8px;border-radius:50%;background:var(--accent-bad)"/></span><span class="dim">3 unread events</span></div>`})
const P169 = defineComponent({ template:`<div class="sx"><div class="row"><b>Yesterday's runs</b></div><div style="display:flex;gap:2px"><div v-for="i in 24" :key="i" :style="{width:'10px',height:(6+(i*7)%18)+'px',background:'var(--accent)',borderRadius:'2px',alignSelf:'flex-end'}"/></div><div class="dim" style="font-size:11px">hourly histogram</div></div>`})
const P170 = defineComponent({ template:`<div class="sx"><div class="card" style="display:inline-flex;align-items:center;gap:6px;align-self:flex-start"><span class="bd"><span/><span/><span/></span><span class="dim">typing</span></div></div>`})
const P171 = defineComponent({ setup(){ const s=ref(0); useInterval(()=>s.value++,1000); return {s} }, template:`<div class="sx pill">💤 idle for {{ Math.floor(s/60) }}:{{ String(s%60).padStart(2,'0') }}</div>`})
const P172 = defineComponent({ template:`<div class="sx"><div class="card glow" style="border-color: var(--accent)">active card pulses with a soft accent halo</div></div>`})
const P173 = defineComponent({ setup(){ const i=ref(2); useInterval(()=>i.value=(i.value+1)%5,800); return {i} }, template:`<div class="sx" style="align-items:center"><div style="display:flex;gap:6px">●<span v-for="k in 5" :key="k" :style="{width:'10px',height:'10px',borderRadius:'50%',background: k<=i?'var(--accent)':'var(--bg-3)',transition:'all .3s'}"/></div><div class="dim" style="font-size:11px">step {{ i }}/5</div></div>`})
const P174 = defineComponent({ template:`<div class="sx"><div v-for="(t,i) in ['Started','Loaded models','Indexed repo','Ready']" :key="t" style="display:flex;gap:8px;align-items:center"><div :style="{width:'10px',height:'10px',borderRadius:'50%',background:i<3?'var(--accent-good)':'var(--accent)'}"/><div :style="{flex:1,paddingBottom:i<3?'10px':0,borderLeft: i<3?'2px solid var(--line)':'none',marginLeft:'4px',paddingLeft:'10px'}"><b>{{ t }}</b></div></div></div>`})
const P175 = defineComponent({ setup(){ const e=['😴','🤔','🛠️','🚀']; const i=ref(0); useInterval(()=>i.value=(i.value+1)%4,1200); return {e,i} }, template:`<div class="sx" style="align-items:center;justify-content:center;font-size:32px">{{ e[i] }}<div class="dim" style="font-size:11px">{{ ['idle','thinking','building','shipping'][i] }}</div></div>`})
const P176 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="sx" style="position:relative"><span class="pill" @mouseenter="h=true" @mouseleave="h=false">● operational</span><div v-if="h" class="card" style="position:absolute;top:30px;left:0;width:200px;font-size:11px"><b>operational</b> — all 7 services responding within SLO. Last incident: 3d ago.</div></div>`})
const P177 = defineComponent({ template:`<div class="sx pill" style="background:rgba(139,140,247,0.1);border-color:rgba(139,140,247,0.4);color:var(--accent)">⏳ still running · 4m elapsed</div>`})
const P178 = defineComponent({ setup(){ const grid=Array.from({length:7*12},()=>Math.random()); return {grid} }, template:`<div class="sx"><div class="dim" style="font-size:11px">activity (this week)</div><div style="display:grid;grid-template-columns:repeat(12,1fr);gap:2px"><div v-for="(v,i) in grid" :key="i" :style="{aspectRatio:'1',background:'rgba(139,140,247,'+v+')',borderRadius:'2px'}"/></div></div>`})
const P179 = defineComponent({ template:`<div class="sx row"><span class="pill"><span style="color:var(--accent-good)">▲</span> confidence trending up · 78%→84%</span></div>`})
const P180 = defineComponent({ setup(){ const v=ref(0); useInterval(()=>v.value=Math.random(),120); return {v} }, template:`<div class="sx" style="align-items:center;justify-content:center"><div style="display:flex;gap:3px;align-items:flex-end;height:40px"><div v-for="i in 8" :key="i" :style="{width:'4px',height:(6+v*30+i)+'px',background:'var(--accent)',borderRadius:'2px',transition:'height .12s'}"/></div></div>`})

const meta = [
  C(141,'Bouncing dots loader','Three dots bounce in sequence to indicate "working".',P141),
  C(142,'Spinner ring',         'Classic spinning ring next to a status label.',P142),
  C(143,'Tri-color bouncer',    'Three colored dots bounce to show multi-stage work.',P143),
  C(144,'Scanning beam',        'Indeterminate progress bar with a sweeping beam.',P144),
  C(145,'Step counter pill',    '"3/7 steps" pill that updates as work proceeds.',P145,{inspiration:'Devin, Bolt'}),
  C(146,'TTFT badge',           'Time to first token shown as a pill.',P146),
  C(147,'Top status ribbon',    '3px gradient ribbon at the top of the page.',P147,{inspiration:'Cursor, Bolt'}),
  C(148,'Latency line chart',   'Live polyline chart of recent API latency.',P148),
  C(149,'Memory usage gauge',   'Bar gauge of process memory used.',P149),
  C(150,'CPU/GPU pills',        'Resource pills for CPU, GPU, VRAM.',P150),
  C(151,'Queue position card',  '"#3 in queue" with ETA.',P151),
  C(152,'Rate limit countdown', 'Countdown until your quota resets.',P152),
  C(153,'Uptime grid',          '30-day uptime grid of green/red cells.',P153,{inspiration:'status pages'}),
  C(154,'Recent runs sparkline','Bar sparkline of the last N agent runs.',P154),
  C(155,'Last error banner',    'Red callout summarising the most recent failure.',P155),
  C(156,'Last success banner',  'Green callout summarising the most recent green run.',P156),
  C(157,'Stale data badge',     '"3h old" warning chip on data sourced from cache.',P157),
  C(158,'Refresh-to-update',    'Spinning refresh icon while re-fetching.',P158),
  C(159,'WebSocket state pill', 'Connected / reconnecting / offline indicator.',P159),
  C(160,'Reconnecting countdown','Live countdown to next reconnect attempt.',P160),
  C(161,'Tasks-done counter',   'Big gradient number for daily completed tasks.',P161),
  C(162,'Active-tools pill',    'Count of tools currently in use.',P162),
  C(163,'Sub-agent count',      'Number of running sub-agents at a glance.',P163),
  C(164,'Token rate per second','Live token throughput readout.',P164),
  C(165,'Throughput speedometer','Half-circle dial showing requests/sec.',P165),
  C(166,'Health score chip',    'Aggregate green-yellow-red health percentage.',P166),
  C(167,'Streak chip',          'Days-in-a-row engagement streak.',P167,{inspiration:'Duolingo, GitHub'}),
  C(168,'Notification dot',     'Bell icon with red unread indicator.',P168),
  C(169,'Yesterday\'s histogram','Hourly bar histogram of the previous day.',P169),
  C(170,'"typing…" indicator',  'Inline three-dot typing indicator (chat).',P170,{inspiration:'iMessage, ChatGPT voice'}),
  C(171,'Idle timer',           'Time since the last user action.',P171),
  C(172,'Glow halo on active',  'Soft pulsing halo on the focused/active card.',P172),
  C(173,'Step progress dots',   'Filled / unfilled circles ●○○ for step N of M.',P173),
  C(174,'Vertical timeline ticks','Stacked dots-on-line for milestone progress.',P174),
  C(175,'Emoji status icon',    'Rotating emoji that summarises the agent\'s mood.',P175),
  C(176,'Status hover tooltip', 'Hover the status pill for an SLO breakdown.',P176),
  C(177,'Still-running badge',  '"4m elapsed" chip for long jobs that are still alive.',P177),
  C(178,'Activity heatmap',     'Calendar-style heatmap of weekly activity.',P178,{inspiration:'GitHub contributions'}),
  C(179,'Confidence trend arrow','▲/▼ arrow showing answer-quality trend.',P179),
  C(180,'Mic level meter',      'Vertical bars react to live mic input.',P180),
]

export default meta.map(m => ({ ...m, category:'Status' }))
