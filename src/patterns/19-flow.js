import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

// AI x reactflow.dev — node-based flow editor controls reimagined for agents.
// Inspired by https://reactflow.dev (handles, edges, minimap, controls, etc.)
injectCss('flow', `
.fl { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.fl .stage { position:relative; width:100%; height:100%; min-height:200px; border-radius:10px; overflow:hidden;
             background-color:#0e1320;
             background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px);
             background-size: 14px 14px; }
.fl .node  { position:absolute; background:#1a1f33; color:#e6e8f0; border:1px solid var(--line-2); border-radius:8px; padding:8px 10px; min-width:90px; box-shadow: 0 4px 12px rgba(0,0,0,.4); font-size:11px; line-height:1.3; }
.fl .node.in   { border-left: 3px solid #6ad9c4; }
.fl .node.ai   { border-left: 3px solid #8b8cf7; background:linear-gradient(135deg,#1a1f33,#251a40); }
.fl .node.tool { border-left: 3px solid #f5c161; }
.fl .node.out  { border-left: 3px solid #a4f06d; }
.fl .node.err  { border-left: 3px solid #f97b7b; }
.fl .node.run  { box-shadow: 0 0 0 2px rgba(139,140,247,.6), 0 0 18px rgba(139,140,247,.5); animation: fl-run-pulse 1.4s ease-in-out infinite; }
.fl .handle { position:absolute; width:8px; height:8px; border-radius:50%; background:#6ad9c4; border:2px solid #0e1320; box-shadow:0 0 0 1px var(--line-2); }
.fl .label { position:absolute; bottom:6px; left:8px; font-size:10px; color:rgba(255,255,255,0.5); font-family: var(--mono); pointer-events:none; }
.fl .ctrls { position:absolute; left:8px; bottom:8px; display:flex; flex-direction:column; gap:2px; background:rgba(0,0,0,.5); padding:3px; border-radius:6px; backdrop-filter:blur(4px); }
.fl .ctrls button { background:transparent; border:none; color:#fff; padding:2px 6px; cursor:pointer; font-size:11px; line-height:1 }
.fl .ctrls button:hover { background:rgba(255,255,255,.1) }
.fl .minimap { position:absolute; right:8px; bottom:8px; width:80px; height:50px; background:rgba(0,0,0,.4); border:1px solid rgba(255,255,255,.15); border-radius:4px; backdrop-filter:blur(4px); }

@keyframes fl-dash    { to { stroke-dashoffset: -16 } }
@keyframes fl-run-pulse { 0%,100%{ box-shadow: 0 0 0 2px rgba(139,140,247,.6), 0 0 18px rgba(139,140,247,.5) } 50%{ box-shadow: 0 0 0 4px rgba(139,140,247,.7), 0 0 28px rgba(139,140,247,.7) } }
@keyframes fl-flow-on { from { stroke-dashoffset: 80 } to { stroke-dashoffset: 0 } }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'reactflow.dev × AI agents', tags: extra.tags||['flow','agents'], component: comp })

const edge = (x1,y1,x2,y2,opts={}) => {
  const cx = (x1+x2)/2
  const d = `M${x1} ${y1} C ${cx} ${y1} ${cx} ${y2} ${x2} ${y2}`
  return { d, ...opts }
}

// 981 — AI Agent node
const P981 = defineComponent({ template:`<div class="fl"><div class="stage"><div class="node ai" style="left:50%;top:50%;transform:translate(-50%,-50%);min-width:140px"><div style="display:flex;align-items:center;gap:6px"><span style="font-size:14px">🤖</span><b>AI Agent</b></div><div style="opacity:.6;margin-top:4px;font-family:var(--mono);font-size:10px">model: opus-4-7<br>temp: 0.7</div><div class="handle" style="left:-5px;top:50%;transform:translateY(-50%)"></div><div class="handle" style="right:-5px;top:50%;transform:translateY(-50%);background:#a4f06d"></div></div><div class="label">Agent node</div></div></div>`})

// 982 — Connection edge with bezier (animated dataflow)
const P982 = defineComponent({ template:`<div class="fl"><div class="stage"><svg style="position:absolute;inset:0" viewBox="0 0 240 200" preserveAspectRatio="none"><defs><marker id="fl-a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L 6 3 L 0 6 z" fill="#6ad9c4"/></marker></defs><path d="M30 60 C 100 60 100 140 210 140" stroke="#6ad9c4" stroke-width="2" fill="none" stroke-dasharray="6 4" style="animation: fl-dash 1.6s linear infinite" marker-end="url(#fl-a)"/></svg><div class="node in" style="left:6px;top:50px"><b>Input</b></div><div class="node ai" style="right:6px;bottom:24px"><b>🤖 AI</b></div><div class="label">edge · animated dataflow</div></div></div>`})

// 983 — Multi-handle node (branch on output)
const P983 = defineComponent({ template:`<div class="fl"><div class="stage"><svg style="position:absolute;inset:0" viewBox="0 0 240 200" preserveAspectRatio="none"><path d="M120 100 C 170 100 170 40 220 40" stroke="#a4f06d" stroke-width="2" fill="none"/><path d="M120 110 C 170 110 170 120 220 120" stroke="#f5c161" stroke-width="2" fill="none" stroke-dasharray="4 4" style="animation: fl-dash 1.6s linear infinite"/><path d="M120 110 C 170 110 170 180 220 180" stroke="#f97b7b" stroke-width="2" fill="none"/></svg><div class="node ai" style="left:30px;top:74px;min-width:90px"><b>🤖 Router</b><div style="opacity:.7;font-size:10px">classify intent</div><div class="handle" style="right:-5px;top:14px;background:#a4f06d"></div><div class="handle" style="right:-5px;top:30px;background:#f5c161"></div><div class="handle" style="right:-5px;top:46px;background:#f97b7b"></div></div><div class="node out" style="right:6px;top:24px;font-size:10px">→ search</div><div class="node tool" style="right:6px;top:104px;font-size:10px">→ tool</div><div class="node err" style="right:6px;bottom:10px;font-size:10px">→ deny</div><div class="label">router · 3-way conditional</div></div></div>`})

// 984 — Minimap navigator
const P984 = defineComponent({ template:`<div class="fl"><div class="stage"><div class="node in" style="left:20px;top:30px">a</div><div class="node ai" style="left:90px;top:70px">b</div><div class="node tool" style="right:30px;top:50px">c</div><div class="node out" style="right:60px;bottom:30px">d</div><svg style="position:absolute;inset:0" viewBox="0 0 240 200" preserveAspectRatio="none"><path d="M55 45 C 80 45 80 80 100 80" stroke="rgba(106,217,196,.6)" fill="none" stroke-width="2"/><path d="M130 80 C 160 80 160 60 195 60" stroke="rgba(106,217,196,.6)" fill="none" stroke-width="2"/><path d="M210 70 C 220 100 200 140 170 160" stroke="rgba(106,217,196,.6)" fill="none" stroke-width="2"/></svg><div class="minimap"><div style="position:absolute;left:8%;top:14%;width:8px;height:6px;background:#6ad9c4;border-radius:1px"></div><div style="position:absolute;left:32%;top:32%;width:8px;height:6px;background:#8b8cf7;border-radius:1px"></div><div style="position:absolute;right:14%;top:24%;width:8px;height:6px;background:#f5c161;border-radius:1px"></div><div style="position:absolute;right:24%;bottom:14%;width:8px;height:6px;background:#a4f06d;border-radius:1px"></div><div style="position:absolute;left:20%;top:20%;width:55%;height:55%;border:1px solid #fff;border-radius:2px"></div></div><div class="label">minimap · viewport rectangle</div></div></div>`})

// 985 — Node palette + drag spawn
const P985 = defineComponent({ template:`<div class="fl"><div class="stage" style="display:grid;grid-template-columns:90px 1fr;gap:0"><div style="background:rgba(0,0,0,.4);border-right:1px solid var(--line);padding:6px;display:flex;flex-direction:column;gap:6px"><div class="node in"   style="position:relative;left:0;top:0;font-size:10px;cursor:grab">📥 Input</div><div class="node ai"   style="position:relative;left:0;top:0;font-size:10px;cursor:grab">🤖 Agent</div><div class="node tool" style="position:relative;left:0;top:0;font-size:10px;cursor:grab">🔧 Tool</div><div class="node out"  style="position:relative;left:0;top:0;font-size:10px;cursor:grab">📤 Out</div></div><div style="position:relative"><div class="node ai" style="left:30%;top:40%">drop here</div></div></div><div class="label">node palette · drag to canvas</div></div>`})

// 986 — Live execution highlight (running node + flowing edges)
const P986 = defineComponent({ setup(){ const k=ref(1); useInterval(()=>k.value=(k.value%4)+1,1100); return {k} }, template:`<div class="fl"><div class="stage"><svg style="position:absolute;inset:0" viewBox="0 0 240 200" preserveAspectRatio="none"><path v-for="(p,i) in [{d:'M55 50 C 90 50 90 100 130 100', a:k>=2},{d:'M170 100 C 210 100 210 50 220 50', a:k>=3},{d:'M170 100 C 210 100 210 150 220 150', a:k===4}]" :key="i" :d="p.d" :stroke="p.a?'#a4f06d':'rgba(255,255,255,.15)'" stroke-width="2" fill="none" :stroke-dasharray="p.a?'6 4':'0'" :style="p.a?'animation: fl-dash 1s linear infinite':''"/></svg><div class="node in" :class="{run:k===1}" style="left:6px;top:36px">📥 input</div><div class="node ai" :class="{run:k===2}" style="left:130px;top:84px;transform:translate(-30px,0)">🤖 agent</div><div class="node tool" :class="{run:k===3}" style="right:6px;top:36px">🔧 search</div><div class="node out"  :class="{run:k===4}" style="right:6px;bottom:24px">📤 reply</div><div class="label">live execution · node {{ k }} of 4</div></div></div>`})

// 987 — Edge label + pass condition
const P987 = defineComponent({ template:`<div class="fl"><div class="stage"><svg style="position:absolute;inset:0" viewBox="0 0 240 200" preserveAspectRatio="none"><path d="M55 60 C 100 60 100 140 200 140" stroke="#6ad9c4" stroke-width="2" fill="none"/></svg><div style="position:absolute;left:120px;top:90px;background:rgba(0,0,0,.7);color:#6ad9c4;padding:2px 8px;border-radius:10px;font-size:10px;font-family:var(--mono);border:1px solid rgba(106,217,196,.5)">if conf > 0.8</div><div class="node in" style="left:6px;top:46px">📥 input</div><div class="node ai" style="right:6px;bottom:24px">🤖 ship</div><div class="label">edge condition label</div></div></div>`})

// 988 — Group container (sub-flow / agent crew)
const P988 = defineComponent({ template:`<div class="fl"><div class="stage"><div style="position:absolute;left:30px;top:30px;right:30px;bottom:30px;border:1px dashed rgba(139,140,247,.5);border-radius:8px;background:rgba(139,140,247,.06)"><div style="position:absolute;left:8px;top:6px;font-size:10px;font-family:var(--mono);color:#8b8cf7">📁 DocSynth crew · 3 agents</div></div><div class="node ai" style="left:50px;top:60px">🤖 R</div><div class="node ai" style="left:50%;top:80px;transform:translateX(-50%)">🤖 W</div><div class="node ai" style="right:50px;top:60px">🤖 C</div><div class="node out" style="left:50%;bottom:40px;transform:translateX(-50%)">📤 doc</div><div class="label">group node · sub-flow / crew</div></div></div>`})

// 989 — Flow controls (zoom/fit/lock)
const P989 = defineComponent({ template:`<div class="fl"><div class="stage"><div class="node ai" style="left:50%;top:50%;transform:translate(-50%,-50%)">🤖 agent</div><div class="ctrls"><button>＋</button><button>－</button><button>⊡</button><button>🔒</button></div><div class="label">canvas controls · zoom · fit · lock</div></div></div>`})

// 990 — Inline AI inspector (selected node panel)
const P990 = defineComponent({ template:`<div class="fl"><div class="stage" style="display:grid;grid-template-columns:1fr 130px;gap:0"><div style="position:relative"><div class="node ai run" style="left:30%;top:40%">🤖 agent</div></div><div style="background:rgba(0,0,0,.5);border-left:1px solid var(--line);padding:8px;display:flex;flex-direction:column;gap:4px;font-size:11px"><div class="dim mono" style="font-size:10px;color:#888">SELECTED</div><div><b>🤖 agent</b></div><label class="dim mono" style="font-size:10px">model</label><select style="font-size:10px"><option>opus 4.7</option><option>sonnet 4.6</option></select><label class="dim mono" style="font-size:10px">prompt</label><textarea style="font-size:10px;height:30px">summarise…</textarea></div></div><div class="label">node inspector · live edit</div></div>`})

const meta = [
  C(981,'AI Agent node',         'Bordered card representing an AI agent with input/output handles.',P981),
  C(982,'Animated dataflow edge','Bezier edge between two nodes with marching dashes.',P982),
  C(983,'Conditional router',    'AI router node fan-outs to 3 typed outputs.',P983),
  C(984,'Minimap navigator',     'Bottom-right minimap with viewport rectangle.',P984),
  C(985,'Node palette',          'Sidebar of draggable node types.',P985),
  C(986,'Live execution flow',   'Highlighted current node + flowing edges in sequence.',P986),
  C(987,'Edge condition label',  'Pill label on an edge showing the gating condition.',P987),
  C(988,'Group container',       'Dashed group around a multi-agent sub-flow.',P988),
  C(989,'Canvas controls',       'Zoom in/out / fit-to-view / lock buttons.',P989),
  C(990,'Node inspector panel',  'Side panel showing the selected node\'s settings.',P990),
]

export default meta.map(m => ({ ...m, category:'Flow' }))
