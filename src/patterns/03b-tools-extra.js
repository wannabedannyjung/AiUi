import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('tools-extra', `
.tx { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.tx .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.tx .row  { display:flex; gap:6px; align-items:center; }
.tx .pre  { background:#000; color:#a8f0a8; font-family:var(--mono); font-size:11px; padding:8px; border-radius:6px; white-space:pre-wrap; }
.tx table { width:100%; border-collapse:collapse; font-family:var(--mono); font-size:12px; }
.tx th, .tx td { padding:3px 6px; text-align:left; border-bottom:1px solid var(--line); }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'agent toolkits', tags: extra.tags||['tool'], component: comp })

const P181 = defineComponent({ setup(){ const b=Array.from({length:10},()=>5+Math.random()*30); return {b} }, template:`<div class="tx"><b>tool latency histogram</b><div style="display:flex;align-items:flex-end;gap:3px;height:60px"><div v-for="(h,i) in b" :key="i" :style="{width:'14px',height:h+'px',background:'var(--accent)',borderRadius:'3px'}"/></div></div>`})
const P182 = defineComponent({ template:`<div class="tx card row"><span class="chip">retry</span><span>web_search</span><span class="chip warn" style="margin-left:auto">×3</span></div>`})
const P183 = defineComponent({ template:`<div class="tx card"><div class="dim mono" style="font-size:11px">last call · 14:02:34</div><div><span class="chip accent">tool</span> grep("authMiddleware")</div><div class="mute" style="font-size:11px">→ 4 hits in 2 files · 84ms</div></div>`})
const P184 = defineComponent({ template:`<div class="tx card"><div class="row"><b>cost</b><span class="mono mute" style="margin-left:auto">$0.014 this call</span></div><div class="dim" style="font-size:11px">today: <b>$0.42</b></div></div>`})
const P185 = defineComponent({ template:`<div class="tx" style="align-items:center"><svg width="220" height="100" viewBox="0 0 220 100"><line x1="50" y1="50" x2="100" y2="20" stroke="var(--line-2)"/><line x1="50" y1="50" x2="100" y2="50" stroke="var(--line-2)"/><line x1="50" y1="50" x2="100" y2="80" stroke="var(--line-2)"/><line x1="100" y1="20" x2="180" y2="20" stroke="var(--line-2)"/><g v-for="(n,i) in [{x:50,y:50,t:'plan'},{x:100,y:20,t:'web'},{x:100,y:50,t:'fs'},{x:100,y:80,t:'sql'},{x:180,y:20,t:'fetch'}]" :key="i"><circle :cx="n.x" :cy="n.y" r="14" :fill="i===0?'var(--accent)':'var(--bg-3)'" stroke="var(--line-2)"/><text :x="n.x" :y="n.y+3" font-size="9" text-anchor="middle" :fill="i===0?'#0b0c14':'#e6e8f0'">{{ n.t }}</text></g></svg></div>`})
const P186 = defineComponent({ template:`<div class="tx"><div class="card row"><div style="width:36px;height:36px;border-radius:8px;background:var(--accent);display:grid;place-items:center;color:#0b0c14;font-weight:700">G</div><div style="flex:1"><b>github</b><div class="mute" style="font-size:11px">PRs, issues, files · 12k installs</div></div><button class="mini" style="background:var(--accent);color:#0b0c14">Install</button></div></div>`})
const P187 = defineComponent({ template:`<div class="tx card"><div class="dim mono" style="font-size:11px">scopes</div><div class="row" style="flex-wrap:wrap;gap:4px"><span class="chip good">read:repo</span><span class="chip good">read:user</span><span class="chip warn">write:issues</span><span class="chip bad">admin:org</span></div></div>`})
const P188 = defineComponent({ setup(){ const o=ref(false); return {o} }, template:`<div class="tx card"><div class="row" @click="o=!o" style="cursor:pointer"><b>edit_file(auth.ts)</b><span style="margin-left:auto">{{ o?'▾':'▸' }}</span></div><pre v-if="o" class="pre">applied 3 edits · diff 2 lines · 18ms</pre></div>`})
const P189 = defineComponent({ template:`<div class="tx card" style="border-color:var(--accent-bad);background:rgba(249,123,123,0.08)"><b>validation failed</b><ul style="margin:4px 0 0 16px;padding:0"><li>arg <code>path</code> required</li><li>arg <code>limit</code> must be ≥ 1</li></ul></div>`})
const P190 = defineComponent({ template:`<div class="tx row"><div style="width:48px;height:48px;border-radius:8px;background:linear-gradient(135deg,#7d6df1,#3a64f1)"></div><div><b>generate_image</b><div class="mute" style="font-size:11px">1024×1024 · 1.4s</div></div></div>`})
const P191 = defineComponent({ template:`<div class="tx card mono" style="font-size:11px"><div style="background:rgba(249,123,123,0.1);color:var(--accent-bad)">- old line</div><div style="background:rgba(109,212,154,0.1);color:var(--accent-good)">+ new line</div></div>`})
const P192 = defineComponent({ template:`<div class="tx card"><b>register custom tool</b><input placeholder="name" style="margin-top:4px"/><textarea placeholder="JSON schema" style="margin-top:4px;height:50px"></textarea><button class="mini" style="margin-top:4px;background:var(--accent);color:#0b0c14">Save</button></div>`})
const P193 = defineComponent({ template:`<div class="tx card"><div class="row"><b>3 tool calls selected</b></div><div class="row"><button class="mini">▷ run all</button><button class="mini">⏸ pause all</button><button class="mini" style="background:var(--accent-bad);color:#0b0c14">✕ cancel</button></div></div>`})
const P194 = defineComponent({ setup(){ const q=ref('web_'); const all=['web_search','web_fetch','web_screenshot','workspace_grep']; const f=computed(()=>all.filter(x=>x.startsWith(q.value))); return {q,f} }, template:`<div class="tx"><input v-model="q"/><div v-for="x in f" :key="x" class="card mono" style="font-size:11px;padding:4px 8px">{{ x }}</div></div>`})
const P195 = defineComponent({ template:`<div class="tx card" style="border-color:var(--accent-warn);background:rgba(245,193,97,0.08)">⚠ <b>old_search</b> is deprecated · use <b>web_search</b></div>`})
const P196 = defineComponent({ template:`<div class="tx card mono" style="font-size:11px">{<br>&nbsp;&nbsp;"name": "web_search",<br>&nbsp;&nbsp;"input_schema": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"type":"object",<br>&nbsp;&nbsp;&nbsp;&nbsp;"properties":{ "q":{"type":"string"} },<br>&nbsp;&nbsp;&nbsp;&nbsp;"required":["q"]<br>&nbsp;&nbsp;}<br>}</div>`})
const P197 = defineComponent({ template:`<div class="tx"><div class="card mono" style="font-size:11px">web_search({"q":"vue 3 reactivity"})</div><div class="dim" style="font-size:11px">try this canned example</div></div>`})
const P198 = defineComponent({ setup(){ const d=ref(true); return {d} }, template:`<div class="tx row"><label><input type="checkbox" v-model="d"/> dry run</label><span class="dim" style="font-size:11px">{{ d?'tools simulate, no side effects':'live mode' }}</span></div>`})
const P199 = defineComponent({ template:`<div class="tx row"><span class="chip">env: prod</span><span class="chip">region: us-east-1</span><span class="chip">runtime: node22</span></div>`})
const P200 = defineComponent({ setup(){ const o=ref(false); const all=['fs_read','fs_write','grep','sed','run_shell','web_fetch']; return {o,all} }, template:`<div class="tx" style="position:relative"><button class="mini" @click="o=!o" style="align-self:flex-start">⌘K · jump to tool</button><div v-if="o" class="card" style="position:absolute;top:34px;left:0;width:200px"><div v-for="t in all" :key="t" class="mono" style="padding:3px 6px;font-size:11px">{{ t }}</div></div></div>`})
const P201 = defineComponent({ template:`<div class="tx" style="display:grid;grid-template-columns:80px 1fr;gap:8px"><div class="card" style="font-size:11px;padding:6px"><div class="mute">CATS</div><div>fs</div><div>web</div><div>git</div><div>sql</div></div><div class="card" style="font-size:11px"><div class="mono">fs.read · fs.write · fs.grep</div></div></div>`})
const P202 = defineComponent({ template:`<div class="tx card"><b>web_search</b><div class="row" style="margin-top:6px"><label style="width:60px">q</label><input style="flex:1"/></div><div class="row"><label style="width:60px">limit</label><input type="number" value="5" style="width:80px"/></div></div>`})
const P203 = defineComponent({ template:`<div class="tx card"><div class="mono">edit_file({ path: <span class="dim">"…"</span> })</div><div class="card" style="background:var(--bg-2);font-size:11px"><div>📄 src/auth.ts</div><div>📄 src/router.ts</div><div>📄 README.md</div></div></div>`})
const P204 = defineComponent({ template:`<div class="tx pre">{
  "ok": true,
  "data": {
    "users": [
      { "id": 1, "name": "alice" },
      { "id": 2, "name": "bo" }
    ]
  }
}</div>`})
const P205 = defineComponent({ template:`<div class="tx"><table><thead><tr><th>id</th><th>name</th><th>score</th></tr></thead><tbody><tr><td>1</td><td>alice</td><td>94</td></tr><tr><td>2</td><td>bo</td><td>88</td></tr></tbody></table></div>`})
const P206 = defineComponent({ template:`<div class="tx"><div class="card" style="text-align:center"><div style="width:120px;height:80px;border-radius:8px;background:linear-gradient(135deg,#7d6df1,#6df1c4);margin:0 auto"></div><div class="dim" style="font-size:11px;margin-top:4px">image · 1024×1024</div></div></div>`})
const P207 = defineComponent({ template:`<div class="tx card row"><button class="mini">▶</button><div style="flex:1;height:6px;background:var(--bg-2);border-radius:6px"><div style="height:100%;width:35%;background:var(--accent);border-radius:6px"/></div><span class="mono mute" style="font-size:11px">0:35 / 1:42</span></div>`})
const P208 = defineComponent({ template:`<div class="tx card" style="height:100px;background:linear-gradient(180deg,#1f2740,#0e1320);position:relative"><div style="position:absolute;left:60%;top:40%;color:var(--accent-bad)">📍</div><div class="dim" style="font-size:11px;position:absolute;bottom:6px;left:8px">map · result location</div></div>`})
const P209 = defineComponent({ template:`<div class="tx pre">function tip(b, p) { return (b * p / 100).toFixed(2) }</div>`})
const P210 = defineComponent({ template:`<div class="tx card" style="aspect-ratio:16/9;background:#000;display:grid;place-items:center;color:#fff;border-radius:8px"><div>▶ video result · 0:42</div></div>`})
const P211 = defineComponent({ template:`<div class="tx card row"><span style="font-size:24px">📦</span><div style="flex:1"><b>report.pdf</b><div class="mute" style="font-size:11px">2.4 MB · ready</div></div><button class="mini" style="background:var(--accent);color:#0b0c14">↓ download</button></div>`})
const P212 = defineComponent({ template:`<div class="tx pre" style="background:#1a0808;color:#ff8b8b">Error: ENOENT no such file
  at fs.read (auth.ts:42)
  at agent.exec (loop.ts:118)</div>`})
const P213 = defineComponent({ template:`<div class="tx"><div class="dim" style="font-size:11px">retry backoff</div><div style="display:flex;gap:6px"><div v-for="(d,i) in [200,400,800,1600]" :key="i" :style="{padding:'4px 6px',background:i<2?'var(--accent-bad)':i===2?'var(--accent-warn)':'var(--accent-good)',color:'#0b0c14',borderRadius:'4px',fontSize:'11px'}">{{ d }}ms</div></div></div>`})
const P214 = defineComponent({ template:`<div class="tx pill" style="display:inline-flex;gap:6px;background:var(--bg-3);border:1px solid var(--line);padding:3px 10px;border-radius:999px;width:fit-content">⚙ 4 concurrent runs</div>`})
const P215 = defineComponent({ template:`<div class="tx card row"><span class="chip warn">circuit breaker · half-open</span><span class="dim" style="font-size:11px">3/10 requests passing</span></div>`})
const P216 = defineComponent({ template:`<div class="tx"><div class="row"><b>quota</b><span class="mono mute" style="margin-left:auto">418 / 1000</span></div><div style="height:6px;background:var(--bg-3);border-radius:6px;overflow:hidden"><div style="height:100%;width:42%;background:var(--accent)"/></div></div>`})
const P217 = defineComponent({ template:`<div class="tx card mono" style="font-size:12px">API_KEY = <span style="background:var(--bg-2);padding:0 6px;border-radius:4px;letter-spacing:2px">●●●●●●●●</span> <button class="mini">👁 reveal</button></div>`})
const P218 = defineComponent({ template:`<div class="tx"><div class="dim" style="font-size:11px">execution timeline (s)</div><svg width="100%" height="40" viewBox="0 0 240 40"><rect x="2"  y="6"  width="40"  height="10" fill="var(--accent)"/><rect x="44" y="20" width="80"  height="10" fill="var(--accent-2)"/><rect x="126" y="6" width="60" height="10" fill="var(--accent-warn)"/><rect x="188" y="20" width="50" height="10" fill="var(--accent)"/></svg></div>`})
const P219 = defineComponent({ template:`<div class="tx card mono" style="font-size:11px">- "score": 84<br>+ "score": 91<span class="chip good" style="margin-left:8px">↑ improved</span></div>`})
const P220 = defineComponent({ template:`<div class="tx row" style="flex-wrap:wrap;gap:4px"><span class="chip good">read</span><span class="chip good">stream</span><span class="chip warn">write</span><span class="chip bad">delete</span></div>`})

const meta = [
  C(181,'Latency histogram','Vertical bars showing distribution of recent tool call latencies.',P181),
  C(182,'Retry count badge','Pill showing how many times this tool was retried.',P182),
  C(183,'Last call summary','Compact card summarising the most recent tool invocation.',P183),
  C(184,'Per-call cost meter','Cost of this tool call plus today\'s running total.',P184),
  C(185,'Tool dependency graph','Mini graph showing which tools depend on which.',P185),
  C(186,'MCP marketplace card','Install card for an MCP server with logo + count.',P186,{inspiration:'MCP marketplaces'}),
  C(187,'Permission scopes',  'Color-coded list of OAuth-style scopes a tool requires.',P187),
  C(188,'Expandable exec log','Click a tool call to expand its live execution log.',P188),
  C(189,'Validation errors',  'Red panel listing arg validation failures.',P189),
  C(190,'Result thumbnail',   'Small preview thumbnail of an image-tool result.',P190),
  C(191,'Mini diff for edits','Compact red/green diff for file-edit tools.',P191),
  C(192,'Custom tool register','Form to register a JSON-schema-defined tool.',P192),
  C(193,'Bulk action on calls','Run/pause/cancel multiple selected tool calls.',P193),
  C(194,'Tool name autocomplete','Type-ahead matcher for tool names.',P194),
  C(195,'Deprecation warning','Banner when an obsolete tool is being used.',P195),
  C(196,'JSON schema viewer', 'Pretty-printed input_schema for a tool.',P196),
  C(197,'Canned invocation',  'Tap a sample call to fill the args.',P197),
  C(198,'Dry-run toggle',     'Globally simulate all tools without side effects.',P198),
  C(199,'Exec env badge',     'Pills for env, region, and runtime version.',P199),
  C(200,'⌘K tool palette',    'Keyboard-driven jump-to-tool palette.',P200),
  C(201,'Tool category sidebar','Grouped sidebar of tools by capability.',P201),
  C(202,'Tool argument form', 'Generated form from a tool\'s JSON schema.',P202),
  C(203,'Argument autocomplete','File / value picker for tool args.',P203),
  C(204,'JSON tree view',     'Indented JSON view of a tool result.',P204),
  C(205,'Result table render','Tabular auto-render for array-of-object results.',P205),
  C(206,'Result image render','Auto-render an image returned by a tool.',P206),
  C(207,'Result audio player','Audio result with play + scrub.',P207),
  C(208,'Result map render',  'Render geo coords on a flat map.',P208),
  C(209,'Result code block',  'Auto-detect & render code with mono font.',P209),
  C(210,'Result video player','Auto-embed a video result.',P210),
  C(211,'Result file download','Downloadable file artifact card.',P211),
  C(212,'Tool error trace',   'Stack trace for a tool failure.',P212),
  C(213,'Backoff visualisation','Bar chart of retry backoff durations.',P213),
  C(214,'Concurrent runs pill','Number of parallel calls this tool has live.',P214),
  C(215,'Circuit-breaker state','Open / half-open / closed indicator.',P215),
  C(216,'Quota meter',        'Progress bar of API usage vs cap.',P216),
  C(217,'Secret value mask',  'Hidden secret with a reveal button.',P217),
  C(218,'Execution timeline', 'Gantt-style timeline of tool calls.',P218),
  C(219,'Diff to prior run',  'Highlights what changed vs the last execution.',P219),
  C(220,'Capability badges',  'Read/stream/write/delete capability chips.',P220),
]

export default meta.map(m => ({ ...m, category:'Tools' }))
