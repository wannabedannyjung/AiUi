import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('mem-extra', `
.mex { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.mex .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.mex .row  { display:flex; gap:6px; align-items:center; }
.mex .tag  { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:999px; background: rgba(139,140,247,0.15); color:var(--accent); border:1px solid rgba(139,140,247,0.4); font-size:11px; }
.mex .stick{ background:#f5e89c; color:#3d3a16; padding:6px 8px; border-radius:6px; font-size:11px; }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'memory UX', tags: extra.tags||['memory'], component: comp })

const P381 = defineComponent({ template:`<div class="mex row"><span class="tag">#preference</span><span class="tag">#location</span><span class="tag">#project</span></div>`})
const P382 = defineComponent({ template:`<div class="mex card"><b>edit memory</b><textarea style="margin-top:6px;width:100%;height:50px">Lives in Berlin since 2024</textarea><div class="row" style="justify-content:flex-end"><button class="mini">cancel</button><button class="mini" style="background:var(--accent);color:#0b0c14">save</button></div></div>`})
const P383 = defineComponent({ template:`<div class="mex"><div class="dim mono" style="font-size:11px">auto-extracted from your last 5 chats</div><div class="card">• you ship dark UIs</div><div class="card">• you prefer Vue 3</div></div>`})
const P384 = defineComponent({ setup(){ const f=ref('all'); return {f} }, template:`<div class="mex"><div class="row"><button v-for="x in ['all','people','prefs','projects']" :key="x" class="mini" @click="f=x" :style="{background:f===x?'var(--accent)':null,color:f===x?'#0b0c14':null}">{{ x }}</button></div></div>`})
const P385 = defineComponent({ template:`<div class="mex"><div class="row"><span class="dim">Jan</span><div style="flex:1;height:5px;background:var(--bg-3);border-radius:5px;position:relative"><div style="position:absolute;left:20%;width:5px;height:5px;background:var(--accent);border-radius:50%"/><div style="position:absolute;left:50%;width:5px;height:5px;background:var(--accent);border-radius:50%"/><div style="position:absolute;left:80%;width:5px;height:5px;background:var(--accent);border-radius:50%"/></div><span class="dim">today</span></div><div class="dim" style="font-size:11px">memory items added over time</div></div>`})
const P386 = defineComponent({ setup(){ const v=ref(70); return {v} }, template:`<div class="mex card"><div class="row"><span>importance</span><input type="range" min="0" max="100" v-model.number="v" style="flex:1"/><span class="mono">{{ v }}</span></div><div class="dim" style="font-size:11px">higher = referenced more often</div></div>`})
const P387 = defineComponent({ template:`<div class="mex"><div class="dim">archive</div><div class="card row"><span class="mute">📦 47 archived memories</span><button class="mini" style="margin-left:auto">view</button></div></div>`})
const P388 = defineComponent({ template:`<div class="mex card"><b>export memories</b><div class="row" style="margin-top:6px"><button class="mini">JSON</button><button class="mini">CSV</button><button class="mini">YAML</button></div></div>`})
const P389 = defineComponent({ template:`<div class="mex card"><div class="dim mono">drop your memory.json here</div><div style="border:2px dashed var(--line-2);border-radius:8px;padding:18px;text-align:center;margin-top:6px">📥 import</div></div>`})
const P390 = defineComponent({ template:`<div class="mex card"><div class="dim mono" style="font-size:11px">since last session</div><div style="color:var(--accent-good)">+ Likes coffee</div><div style="color:var(--accent-bad);text-decoration:line-through">- Likes tea</div></div>`})
const P391 = defineComponent({ setup(){ const p=ref(false); return {p} }, template:`<div class="mex"><label><input type="checkbox" v-model="p"/> 🔒 private mode (no memory writes)</label><div v-if="p" class="dim" style="font-size:11px">nothing in this session will be saved.</div></div>`})
const P392 = defineComponent({ template:`<div class="mex"><div v-for="(p,c) in {profile:true,projects:true,health:false,finance:false}" :key="c" class="row"><label style="flex:1">{{ c }}</label><input type="checkbox" :checked="p"/></div></div>`})
const P393 = defineComponent({ template:`<div class="mex card row">📸 <span style="flex:1">snapshot saved · 14:02</span><button class="mini" style="background:var(--accent);color:#0b0c14">save now</button></div>`})
const P394 = defineComponent({ template:`<div class="mex"><div v-for="s in ['v3 · today','v2 · 2d ago','v1 · 1w ago']" :key="s" class="card row" style="font-size:12px"><span style="flex:1">{{ s }}</span><button class="mini">restore</button></div></div>`})
const P395 = defineComponent({ template:`<div class="mex card"><span class="chip accent">episode</span><div style="margin-top:4px">2026-04-12 — debugged a Vue Router redirect loop together.</div></div>`})
const P396 = defineComponent({ template:`<div class="mex" style="align-items:center"><svg width="220" height="100"><circle cx="110" cy="50" r="22" fill="var(--accent)"/><circle cx="40" cy="20" r="14" fill="var(--bg-3)" stroke="var(--line-2)"/><circle cx="180" cy="20" r="14" fill="var(--bg-3)" stroke="var(--line-2)"/><circle cx="40" cy="80" r="14" fill="var(--bg-3)" stroke="var(--line-2)"/><circle cx="180" cy="80" r="14" fill="var(--bg-3)" stroke="var(--line-2)"/><line v-for="(p,i) in [[40,20],[180,20],[40,80],[180,80]]" :key="i" x1="110" y1="50" :x2="p[0]" :y2="p[1]" stroke="var(--line-2)"/></svg></div>`})
const P397 = defineComponent({ template:`<div class="mex"><div class="dim mono">working memory · this turn</div><div class="card row" style="flex-wrap:wrap;gap:4px"><span class="tag">last_file=auth.ts</span><span class="tag">last_action=edit</span><span class="tag">user_intent=fix</span></div></div>`})
const P398 = defineComponent({ template:`<div class="mex"><div class="row"><span class="tag" style="background:rgba(109,212,154,0.15);color:var(--accent-good);border-color:rgba(109,212,154,0.4)">long-term · 124</span><span class="tag" style="background:rgba(245,193,97,0.15);color:var(--accent-warn);border-color:rgba(245,193,97,0.4)">short-term · 8</span></div></div>`})
const P399 = defineComponent({ template:`<div class="mex"><div class="dim">forgetting curve</div><svg width="100%" height="60" viewBox="0 0 240 60"><path d="M2 6 Q 60 30 120 50 T 238 58" fill="none" stroke="var(--accent)" stroke-width="2"/></svg></div>`})
const P400 = defineComponent({ template:`<div class="mex card row" style="background:rgba(139,140,247,0.06);border-color:var(--accent)">🔐 <b>vault</b><span style="margin-left:auto" class="chip good">encrypted</span></div>`})
const P401 = defineComponent({ template:`<div class="mex card row">🤝 share "Lives in Berlin" with <b>Critic</b><button class="mini" style="margin-left:auto">share</button></div>`})
const P402 = defineComponent({ template:`<div class="mex card" style="border-color:var(--accent-warn)">duplicate detected: <b>"Lives in Berlin"</b><div class="row" style="margin-top:4px"><button class="mini">keep both</button><button class="mini">merge</button></div></div>`})
const P403 = defineComponent({ template:`<div class="mex card"><div class="dim mono">conflict</div><div style="color:var(--accent-bad)">stored: Lives in NYC</div><div style="color:var(--accent-good)">new:    Lives in Berlin</div><div class="row"><button class="mini">prefer new</button><button class="mini">keep stored</button></div></div>`})
const P404 = defineComponent({ template:`<div class="mex row"><span class="tag">📍 from chat #42</span><span class="dim" style="font-size:11px">memory provenance</span></div>`})
const P405 = defineComponent({ template:`<div class="mex pill" style="background:rgba(245,193,97,0.1);color:var(--accent-warn);border-color:rgba(245,193,97,0.4)">⏳ "active project" expires in 7 days</div>`})
const P406 = defineComponent({ template:`<div class="mex card"><span class="chip good">recalled</span><span style="margin-left:6px">"You prefer Postgres" surfaced for this turn.</span></div>`})
const P407 = defineComponent({ template:`<div class="mex" style="align-items:center"><svg width="240" height="80"><line x1="40" y1="40" x2="120" y2="40" stroke="var(--line-2)" stroke-dasharray="3 3"/><line x1="120" y1="40" x2="200" y2="40" stroke="var(--line-2)" stroke-dasharray="3 3"/><circle cx="40" cy="40" r="14" fill="var(--accent)"/><circle cx="120" cy="40" r="14" fill="var(--accent-2)"/><circle cx="200" cy="40" r="14" fill="var(--accent-warn)"/></svg><div class="dim" style="font-size:11px">cross-linked memories</div></div>`})
const P408 = defineComponent({ template:`<div class="mex card"><div class="row"><span>roll back to</span><input type="date" value="2026-04-12"/><button class="mini">go</button></div></div>`})
const P409 = defineComponent({ template:`<div class="mex card row"><span style="flex:1">"You wake at 6am"</span><button class="mini">+ note</button></div>`})
const P410 = defineComponent({ template:`<div class="mex row" style="flex-wrap:wrap"><span v-for="c in ['#prefs','#health','#work','#travel']" :key="c" class="tag" :style="{borderColor:'hsl('+(c.length*40)+',60%,50%)',color:'hsl('+(c.length*40)+',60%,70%)',background:'transparent'}">{{ c }}</span></div>`})
const P411 = defineComponent({ template:`<div class="mex card row">🎙 voice note · 0:08<button class="mini" style="margin-left:auto">▶</button></div>`})
const P412 = defineComponent({ template:`<div class="mex stick" style="position:relative">📌 pinned memory · "always rate-limit auth"</div>`})
const P413 = defineComponent({ template:`<div class="mex card"><div class="row"><input style="flex:1" placeholder="quick-add memory…"/><button class="mini" style="background:var(--accent);color:#0b0c14">+</button></div></div>`})
const P414 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="mex card row" @mouseenter="h=true" @mouseleave="h=false">"Lives in Berlin"<button v-if="h" class="mini" style="margin-left:auto">✎ edit</button></div>`})
const P415 = defineComponent({ template:`<div class="mex"><div class="dim mono">virtualized list · 3,142 items</div><div v-for="i in 5" :key="i" class="card mono" style="font-size:11px;padding:4px 8px">item #{{ 100+i }}</div></div>`})
const P416 = defineComponent({ template:`<div class="mex"><div class="card" style="opacity:1">recent</div><div class="card" style="opacity:0.7">last week</div><div class="card" style="opacity:0.4">last month</div></div>`})
const P417 = defineComponent({ template:`<div class="mex"><input placeholder="ask about your memories…" style="width:100%"/><div class="card" style="margin-top:6px">→ "I remember 4 mentions of Postgres locks across 2 chats."</div></div>`})
const P418 = defineComponent({ template:`<div class="mex card row"><span>3 selected</span><button class="mini" style="margin-left:auto;background:var(--accent-bad);color:#0b0c14">🗑 delete</button></div>`})
const P419 = defineComponent({ template:`<div class="mex card" style="background:rgba(139,140,247,0.06)">💡 you mentioned a deadline thrice — save as memory?<div class="row" style="margin-top:4px"><button class="mini" style="background:var(--accent);color:#0b0c14">save</button><button class="mini">dismiss</button></div></div>`})
const P420 = defineComponent({ template:`<div class="mex"><div class="row"><b>privacy</b><span class="mono mute" style="margin-left:auto">82 / 100</span></div><div style="height:6px;background:var(--bg-3);border-radius:6px;overflow:hidden"><div style="width:82%;height:100%;background:var(--accent-good)"/></div><div class="dim" style="font-size:11px">no PII detected · 0 secrets exposed</div></div>`})

const meta = [
  C(381,'Memory tag pills',     'Color tags categorising memory entries.',P381),
  C(382,'Edit memory modal',    'Inline edit form for an individual memory.',P382),
  C(383,'Auto-extracted facts', 'List of facts the agent inferred from chats.',P383),
  C(384,'Memory category filter','Buttons to filter memory by category.',P384),
  C(385,'Memory timeline',      'When each memory was first learned.',P385),
  C(386,'Importance weight',    'Slider to up- or down-weight a memory.',P386),
  C(387,'Memory archive',       'Out-of-the-way bin for less-used memories.',P387),
  C(388,'Memory export',        'JSON / CSV / YAML export options.',P388),
  C(389,'Memory import',        'Drag-and-drop import of saved memories.',P389),
  C(390,'Inter-session diff',   'What changed since the last session.',P390),
  C(391,'Private mode',         'Don\'t persist anything from this session.',P391),
  C(392,'Per-category permissions','Toggle which categories can be remembered.',P392),
  C(393,'Snapshot save',        'Save a labelled snapshot of memory state.',P393),
  C(394,'Snapshot restore',     'Restore a prior memory snapshot.',P394),
  C(395,'Episodic memory event','Time-stamped event-style memory.',P395),
  C(396,'Semantic memory map',  'Hub-and-spoke graph of related concepts.',P396),
  C(397,'Working memory chips', 'Per-turn working-memory key/value pairs.',P397),
  C(398,'LT/ST tier counts',    'Long-term vs short-term memory counts.',P398),
  C(399,'Forgetting curve',     'Curve of recall probability over time.',P399),
  C(400,'Encrypted vault',      'Locked memories with an "encrypted" badge.',P400),
  C(401,'Share to other agent', 'Hand a memory to another agent.',P401),
  C(402,'Dedupe prompt',        'Detect duplicate facts and offer to merge.',P402),
  C(403,'Conflict resolver',    'Pick which value wins when stored/new differ.',P403),
  C(404,'Provenance chip',      'Where the memory originated.',P404),
  C(405,'Expiration countdown', 'Memories that auto-expire on a date.',P405),
  C(406,'Recall trigger badge', 'Showing which memory was just recalled.',P406),
  C(407,'Cross-link visual',    'Memories visually linked into a chain.',P407),
  C(408,'Date roll-back',       'Revert memory state to a chosen date.',P408),
  C(409,'Memory annotation',    'Attach a note to a memory entry.',P409),
  C(410,'Color-tagged categories','Memories color-coded by category.',P410),
  C(411,'Voice note memory',    'Voice clip stored as a memory.',P411),
  C(412,'Pinned-at-top',        'A pinned memory always shown first.',P412),
  C(413,'Quick-add input',      'One-line input to add a memory fast.',P413),
  C(414,'Hover-to-edit',        'Edit pencil reveals only on hover.',P414),
  C(415,'Virtualized memory list','Performance-friendly long list.',P415),
  C(416,'Aging fade',           'Older memories fade in opacity.',P416),
  C(417,'Natural-language query','Ask the agent about its own memory.',P417),
  C(418,'Bulk delete bar',      'Action bar for selected memories.',P418),
  C(419,'Memory hint',          'Suggest saving a repeated fact as memory.',P419),
  C(420,'Privacy meter',        'Composite score for memory privacy hygiene.',P420),
]

export default meta.map(m => ({ ...m, category:'Memory' }))
