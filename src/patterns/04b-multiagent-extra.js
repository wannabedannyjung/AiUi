import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('multi-extra', `
.mx { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.mx .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.mx .row  { display:flex; gap:6px; align-items:center; }
.mx .ag   { width:28px; height:28px; border-radius:50%; display:grid; place-items:center; color:#0b0c14; font-weight:700; font-size:11px; }
.mx .lane { display:flex; gap:6px; align-items:center; }
.mx table { width:100%; border-collapse:collapse; font-size:12px; }
.mx th, .mx td { padding:3px 6px; text-align:left; border-bottom:1px solid var(--line); }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'multi-agent frameworks', tags: extra.tags||['multi'], component: comp })

const P221 = defineComponent({ template:`<div class="mx"><div class="dim" style="font-size:11px">role timeline</div><svg width="100%" height="60" viewBox="0 0 240 60"><rect x="2" y="6" width="60" height="14" fill="var(--accent)"/><rect x="64" y="22" width="100" height="14" fill="var(--accent-2)"/><rect x="166" y="38" width="70" height="14" fill="var(--accent-warn)"/><text x="6" y="16" font-size="9" fill="#0b0c14">Researcher</text><text x="68" y="32" font-size="9" fill="#0b0c14">Writer</text><text x="170" y="48" font-size="9" fill="#0b0c14">Critic</text></svg></div>`})
const P222 = defineComponent({ template:`<div class="mx card row"><div class="ag" style="background:var(--accent)">R</div><div style="flex:1"><b>Researcher v3</b><div class="mute" style="font-size:11px">strengths: web · papers · synthesis</div></div><span class="chip good">★ 4.8</span></div>`})
const P223 = defineComponent({ template:`<div class="mx"><table><tr><th></th><th>code</th><th>web</th><th>img</th></tr><tr><td>Alice</td><td>✓</td><td>✓</td><td>·</td></tr><tr><td>Bo</td><td>·</td><td>✓</td><td>✓</td></tr><tr><td>Cas</td><td>✓</td><td>·</td><td>✓</td></tr></table></div>`})
const P224 = defineComponent({ setup(){ const f=ref('all'); return {f} }, template:`<div class="mx"><div class="row"><span>filter:</span><select v-model="f"><option>all</option><option>code</option><option>web</option><option>image</option></select></div><div class="dim" style="font-size:11px">{{ {all:6,code:3,web:4,image:2}[f] }} agent(s) match</div></div>`})
const P225 = defineComponent({ template:`<div class="mx card row"><span>Assign to:</span><select><option>auto</option><option>Researcher</option><option>Writer</option><option>Critic</option></select></div>`})
const P226 = defineComponent({ setup(){ const i=ref(0); useInterval(()=>i.value=(i.value+1)%4,1500); return {i} }, template:`<div class="mx" style="align-items:center"><div class="row" style="gap:14px"><div v-for="k in 4" :key="k" class="ag" :style="{background:k-1===i?'var(--accent)':'var(--bg-3)',color:k-1===i?'#0b0c14':'var(--text-mute)',transform:k-1===i?'scale(1.3)':null,transition:'all .25s'}">A{{ k }}</div></div><div class="mute" style="font-size:11px">A{{ i+1 }} speaking</div></div>`})
const P227 = defineComponent({ template:`<div class="mx"><div class="lane mono" style="font-size:11px"><span class="chip">14:02</span> R → W: <i>docs ready</i></div><div class="lane mono" style="font-size:11px"><span class="chip">14:03</span> W → C: <i>draft v1</i></div><div class="lane mono" style="font-size:11px"><span class="chip">14:05</span> C → W: <i>fix § intro</i></div></div>`})
const P228 = defineComponent({ template:`<div class="mx row" style="flex-wrap:wrap"><span class="chip"><span class="dot pulse" style="background:var(--accent-good)"/>Alice</span><span class="chip"><span class="dot" style="background:var(--accent-good)"/>Bo</span><span class="chip"><span class="dot" style="background:var(--text-mute)"/>Cas (offline)</span></div>`})
const P229 = defineComponent({ template:`<div class="mx"><div v-for="(s,k) in {python:90,sql:75,react:50,go:30}" :key="k" class="row"><span style="width:60px">{{ k }}</span><div style="flex:1;height:6px;background:var(--bg-3);border-radius:6px"><div :style="{width:s+'%',height:'100%',background:'var(--accent)'}"/></div><span class="mono mute" style="width:36px;text-align:right">{{ s }}</span></div></div>`})
const P230 = defineComponent({ template:`<div class="mx card row"><div class="ag" style="background:var(--accent)">R</div><div style="flex:1"><b>Researcher</b><div class="mute" style="font-size:11px">★★★★☆ · 124 reviews</div></div><div style="font-size:24px;font-weight:800;color:var(--accent-good)">87</div></div>`})
const P231 = defineComponent({ template:`<div class="mx"><div class="b ai">A reply.</div><div class="row"><button class="mini" style="background:rgba(109,212,154,0.15)">👍</button><button class="mini">👎</button><textarea placeholder="why?" style="flex:1;min-height:30px;font-size:11px"></textarea></div></div>`})
const P232 = defineComponent({ template:`<div class="mx card"><div class="row"><b>Retire agent?</b></div><div class="dim" style="font-size:11px">replace "Researcher v2" with v3 across all workflows</div><div class="row"><button class="mini">cancel</button><button class="mini" style="background:var(--accent-bad);color:#0b0c14">retire</button></div></div>`})
const P233 = defineComponent({ template:`<div class="mx"><div v-for="(b,n) in {Alice:0.3,Bo:0.6,Cas:0.1}" :key="n" class="row"><span style="width:60px">{{ n }}</span><div style="flex:1;height:6px;background:var(--bg-3);border-radius:6px"><div :style="{width:(b*100)+'%',height:'100%',background:'var(--accent-2)'}"/></div><span class="mono mute" style="width:50px;text-align:right">\${{ (b*5).toFixed(2) }}</span></div></div>`})
const P234 = defineComponent({ template:`<div class="mx"><table><tr><th>request type</th><th>agent</th></tr><tr><td>code</td><td>Cas</td></tr><tr><td>web search</td><td>Alice</td></tr><tr><td>image</td><td>Bo</td></tr></table></div>`})
const P235 = defineComponent({ template:`<div class="mx card" style="background:rgba(245,193,97,0.08);border-color:var(--accent-warn)">📣 <b>Manager:</b> all agents pause until 14:30 deploy is done.</div>`})
const P236 = defineComponent({ template:`<div class="mx"><div class="dim" style="font-size:11px">waiting room (3)</div><div class="row" style="flex-wrap:wrap;gap:6px"><span class="chip">⏳ Researcher</span><span class="chip">⏳ Critic</span><span class="chip">⏳ Imager</span></div></div>`})
const P237 = defineComponent({ template:`<div class="mx"><div v-for="(t,i) in ['Crawl docs','Summarize','Draft','Critique']" :key="t" class="card row" style="font-size:12px;padding:6px 10px"><span style="width:18px">{{ i+1 }}</span><span style="flex:1">{{ t }}</span><span class="chip accent">queued</span></div></div>`})
const P238 = defineComponent({ template:`<div class="mx"><div class="dim" style="font-size:11px">drag a task onto an agent</div><div class="row" style="gap:14px"><div class="card" style="flex:1">📝 Task: write blog</div><div class="ag" style="background:var(--accent)">W</div></div></div>`})
const P239 = defineComponent({ template:`<div class="mx pill" style="display:inline-flex;align-items:center;gap:6px">🤝 1,248 inter-agent messages today</div>`})
const P240 = defineComponent({ template:`<div class="mx"><div class="dim" style="font-size:11px">escalation chain</div><div class="row">Worker → <b>Lead</b> → <b>Manager</b> → <b>Human</b></div></div>`})
const P241 = defineComponent({ template:`<div class="mx card">📋 New team: <b>"DocSynth"</b><div class="row" style="margin-top:4px"><span class="chip">+R</span><span class="chip">+W</span><span class="chip">+C</span><button class="mini" style="margin-left:auto;background:var(--accent);color:#0b0c14">Create</button></div></div>`})
const P242 = defineComponent({ template:`<div class="mx" style="align-items:center"><svg width="240" height="80" viewBox="0 0 240 80"><line x1="20" y1="40" x2="80" y2="40" stroke="var(--line-2)"/><line x1="80" y1="40" x2="140" y2="20" stroke="var(--line-2)"/><line x1="80" y1="40" x2="140" y2="60" stroke="var(--line-2)"/><line x1="140" y1="20" x2="200" y2="40" stroke="var(--line-2)"/><line x1="140" y1="60" x2="200" y2="40" stroke="var(--line-2)"/><g v-for="(n,i) in [{x:20,y:40,t:'plan'},{x:80,y:40,t:'fork'},{x:140,y:20,t:'A'},{x:140,y:60,t:'B'},{x:200,y:40,t:'join'}]" :key="i"><circle :cx="n.x" :cy="n.y" r="14" :fill="i===4?'var(--accent)':'var(--bg-3)'" stroke="var(--line-2)"/><text :x="n.x" :y="n.y+3" font-size="9" text-anchor="middle" :fill="i===4?'#0b0c14':'#e6e8f0'">{{ n.t }}</text></g></svg></div>`})
const P243 = defineComponent({ template:`<div class="mx card" style="border-color:var(--accent-warn)">⏪ <b>Critic</b> proposes rolling back step 3<div class="row" style="margin-top:4px"><button class="mini">approve</button><button class="mini">reject</button></div></div>`})
const P244 = defineComponent({ template:`<div class="mx"><div class="card"><b>peer review</b> by Critic</div><div class="card" style="border-color:var(--accent-good)">✓ approved with 2 nits</div></div>`})
const P245 = defineComponent({ template:`<div class="mx"><div class="dim" style="font-size:11px">vote weights</div><div v-for="(w,n) in {Alice:1,Bo:2,Cas:1}" :key="n" class="row"><span style="width:60px">{{ n }}</span><div v-for="i in w" :key="i" style="width:14px;height:14px;background:var(--accent);border-radius:3px;margin-right:2px"></div></div></div>`})
const P246 = defineComponent({ template:`<div class="mx card"><b>meeting notes</b><div class="dim" style="font-size:11px">Critic: doc has 3 gaps · Writer: will add §4 · Manager: ship by Fri</div></div>`})
const P247 = defineComponent({ template:`<div class="mx card" style="background:#fff;color:#0b0c14;height:100px;position:relative"><div style="position:absolute;left:10%;top:20%;color:#e74">A → B</div><div style="position:absolute;left:60%;top:60%;color:#36a">C(x)</div><div class="dim" style="position:absolute;left:8px;bottom:6px;font-size:11px;color:#999">shared whiteboard</div></div>`})
const P248 = defineComponent({ template:`<div class="mx pill" style="display:inline-flex;align-items:center;gap:6px;background:rgba(109,212,154,0.1);color:var(--accent-good);border-color:rgba(109,212,154,0.4)">↻ knowledge synced across 5 agents</div>`})
const P249 = defineComponent({ template:`<div class="mx card"><b>minutes (2 min)</b><ul style="margin:4px 0 0 16px;padding:0;font-size:12px"><li>Researcher: 3 sources gathered</li><li>Writer: drafting outline</li><li>Critic: will review at 15:00</li></ul></div>`})
const P250 = defineComponent({ template:`<div class="mx"><div class="dim" style="font-size:11px">agreement heatmap</div><div style="display:grid;grid-template-columns:repeat(3,30px);gap:3px"><div v-for="(v,i) in [1,.7,.3,.7,1,.5,.3,.5,1]" :key="i" :style="{aspectRatio:'1',background:'rgba(139,140,247,'+v+')',borderRadius:'2px'}"/></div></div>`})
const P251 = defineComponent({ template:`<div class="mx card"><div class="row"><span class="chip accent">Reviewer</span><b>Critic</b><span class="mute" style="margin-left:auto;font-size:11px">2 comments</span></div><div class="dim" style="font-size:12px;margin-top:4px">"missing edge case for empty input"</div></div>`})
const P252 = defineComponent({ template:`<div class="mx"><div class="dim" style="font-size:11px">shared bookmarks</div><div v-for="b in ['arXiv:2401.x','vuejs.org','company-wiki/auth']" :key="b" class="card" style="font-size:11px;padding:4px 8px">🔖 {{ b }}</div></div>`})
const P253 = defineComponent({ template:`<div class="mx card row"><div>Task #42 — currently with <b>Bo</b></div><button class="mini" style="margin-left:auto">↪ reassign</button></div>`})
const P254 = defineComponent({ template:`<div class="mx"><div class="dim" style="font-size:11px">team budget</div><div style="height:8px;background:var(--bg-3);border-radius:6px;overflow:hidden"><div style="width:55%;height:100%;background:var(--accent)"/></div><div class="mute" style="font-size:11px">$2.75 / $5.00 (DocSynth)</div></div>`})
const P255 = defineComponent({ template:`<div class="mx" style="align-items:center"><svg width="240" height="120" viewBox="0 0 240 120"><line x1="120" y1="20" x2="60" y2="60" stroke="var(--line-2)"/><line x1="120" y1="20" x2="180" y2="60" stroke="var(--line-2)"/><line x1="60" y1="60" x2="20" y2="100" stroke="var(--line-2)"/><line x1="60" y1="60" x2="100" y2="100" stroke="var(--line-2)"/><line x1="180" y1="60" x2="160" y2="100" stroke="var(--line-2)"/><line x1="180" y1="60" x2="220" y2="100" stroke="var(--line-2)"/><g v-for="(n,i) in [[120,20,'CEO'],[60,60,'L1'],[180,60,'L2'],[20,100,'a'],[100,100,'b'],[160,100,'c'],[220,100,'d']]" :key="i"><circle :cx="n[0]" :cy="n[1]" r="13" fill="var(--bg-3)" stroke="var(--line-2)"/><text :x="n[0]" :y="n[1]+3" font-size="9" text-anchor="middle" fill="#e6e8f0">{{ n[2] }}</text></g></svg></div>`})
const P256 = defineComponent({ template:`<div class="mx card"><b>Critic</b><div class="dim" style="font-size:12px">Reviews drafts for accuracy, missing edge cases, and tone. Calls out risks.</div></div>`})
const P257 = defineComponent({ template:`<div class="mx"><table><tr><th>agent</th><th>tasks</th><th>cost</th><th>★</th></tr><tr><td>Alice</td><td>42</td><td>$0.18</td><td>4.8</td></tr><tr><td>Bo</td><td>17</td><td>$0.06</td><td>4.4</td></tr></table></div>`})
const P258 = defineComponent({ setup(){ const arr=[3,5,4,6,8,7,9]; return {arr} }, template:`<div class="mx"><div class="dim" style="font-size:11px">Alice · activity</div><svg width="100%" height="40" viewBox="0 0 140 40"><polyline :points="arr.map((y,i)=>i*20+','+(40-y*4)).join(' ')" fill="none" stroke="var(--accent)" stroke-width="2"/></svg></div>`})
const P259 = defineComponent({ template:`<div class="mx"><div v-for="(a,i) in [['Alice',124],['Bo',98],['Cas',54]]" :key="a[0]" class="row"><span style="width:18px;font-weight:700">#{{ i+1 }}</span><span style="flex:1">{{ a[0] }}</span><span class="mono">{{ a[1] }}</span></div></div>`})
const P260 = defineComponent({ template:`<div class="mx card" style="border-color:var(--accent-bad)">🌅 <b>Sunset Researcher v2?</b><div class="dim" style="font-size:11px">12 active workflows still reference it.</div></div>`})

const meta = [
  C(221,'Role timeline',         'Gantt-style swimlanes per agent role.',P221),
  C(222,'Agent CV card',         'Profile card with strengths and rating.',P222),
  C(223,'Capability matrix',     'Table of which agents can do which tasks.',P223),
  C(224,'Specialty filter',      'Filter agent roster by specialty.',P224),
  C(225,'Assignment dropdown',   'Pick which agent handles a request.',P225),
  C(226,'Active speaker spotlight','Multi-agent voice — current speaker pulses.',P226),
  C(227,'Inter-agent messages',  'Compact log of inter-agent message traffic.',P227),
  C(228,'Presence dots',         'Online/offline indicators per agent.',P228),
  C(229,'Skill bars',            'Per-skill horizontal bars for an agent.',P229),
  C(230,'Reputation score',      'Big numeric reputation score on the agent card.',P230),
  C(231,'Feedback rating',       'Thumbs + freeform feedback on an agent reply.',P231),
  C(232,'Retire agent dialog',   'Confirm sunset of an outdated agent version.',P232),
  C(233,'Per-agent budget',      'Spend gauge per agent.',P233),
  C(234,'Agent route table',     'Mapping table of request type → handling agent.',P234),
  C(235,'Manager broadcast',     'A pinned manager-level announcement to all agents.',P235),
  C(236,'Waiting room',          'Roster of agents queued / awaiting work.',P236),
  C(237,'Task queue',            'Ordered list of upcoming agent tasks.',P237),
  C(238,'Drag-task to agent',    'Drag a card onto an agent avatar to assign.',P238),
  C(239,'Collab traffic count',  'Counter of inter-agent messages today.',P239),
  C(240,'Escalation chain',      'Worker → Lead → Manager → Human breadcrumb.',P240),
  C(241,'Team formation card',   'Spin up a new sub-team in one click.',P241),
  C(242,'Fork-join visual',      'Graph of an agent fork-and-join workflow.',P242),
  C(243,'Rollback proposal',     'Critic proposes rolling back a prior step.',P243),
  C(244,'Peer review badge',     'Approved-with-nits style review verdict.',P244),
  C(245,'Vote weights',          'Each agent\'s vote weight visualised as squares.',P245),
  C(246,'Meeting notes',         'Auto-summary card of an agent meeting.',P246),
  C(247,'Shared whiteboard',     'A blank canvas multiple agents draw on together.',P247),
  C(248,'Knowledge sync chip',   'Confirms shared memory is up to date.',P248),
  C(249,'Meeting minutes',       'Bulleted minutes from the latest standup.',P249),
  C(250,'Agreement heatmap',     '3×3 grid colored by pairwise agreement.',P250),
  C(251,'Code-review thread',    'Reviewer-style comment from one agent on another.',P251),
  C(252,'Shared bookmarks',      'Bookmarks visible to every member of the team.',P252),
  C(253,'Reassign task',         'Single-click handoff of a task to a different agent.',P253),
  C(254,'Sub-team budget',       'Spend gauge for a named sub-team.',P254),
  C(255,'Multi-level org tree',  'Deeper org chart with sub-leaders and ICs.',P255),
  C(256,'Role description card', 'Plain-language explainer of an agent\'s role.',P256),
  C(257,'Agent comparison table','Side-by-side stats for several agents.',P257),
  C(258,'Per-agent activity',    'Sparkline of one agent\'s task volume over time.',P258),
  C(259,'Mini leaderboard',      'Compact ranked list of top agents.',P259),
  C(260,'Sunset confirmation',   'Confirm dialog before retiring a deployed agent.',P260),
]

export default meta.map(m => ({ ...m, category:'Multi-Agent' }))
