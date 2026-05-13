import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('out-extra', `
.ox { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.ox .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.ox .row  { display:flex; gap:6px; align-items:center; }
.ox .tab  { padding:4px 10px; border-radius:6px 6px 0 0; cursor:pointer; }
.ox .tab.active { background: var(--bg-3); border:1px solid var(--line); border-bottom:none; }
.ox .num  { font-size:32px; font-weight:800; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.ox table { width:100%; border-collapse: collapse; font-size:12px; font-family:var(--mono); }
.ox th, .ox td { padding:3px 6px; text-align:left; border-bottom:1px solid var(--line); }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'artifact UX', tags: extra.tags||['artifact'], component: comp })

const P461 = defineComponent({ setup(){ const t=ref('preview'); return {t} }, template:`<div class="ox"><div class="row" style="gap:0"><div v-for="x in ['preview','raw','share']" :key="x" class="tab" :class="{active:t===x}" @click="t=x">{{ x }}</div></div><div class="card">{{ t }} pane</div></div>`})
const P462 = defineComponent({ setup(){ const o=ref(false); return {o} }, template:`<div class="ox card mono" style="font-size:11px"><div>function init() {</div><div class="row" @click="o=!o" style="cursor:pointer"><span>&nbsp;&nbsp;{{ o?'▾':'▸' }} ...{{ o?' (3 lines)':' collapsed' }}</span></div><div v-if="o" style="padding-left:14px;color:var(--text-dim)"><div>setUp()</div><div>load()</div><div>start()</div></div><div>}</div></div>`})
const P463 = defineComponent({ template:`<div class="ox row"><button class="mini">‹</button><span class="card mono">page 2 / 6</span><button class="mini">›</button></div>`})
const P464 = defineComponent({ template:`<div class="ox" style="display:grid;grid-template-columns:120px 5px 1fr;gap:0"><div class="card">left</div><div style="cursor:col-resize;background:var(--line)"/><div class="card">right</div></div>`})
const P465 = defineComponent({ template:`<div class="ox row"><button class="mini">－</button><span class="mono">100%</span><button class="mini">＋</button><button class="mini">fit</button></div>`})
const P466 = defineComponent({ template:`<div class="ox row"><button class="mini">⛶ fullscreen</button><button class="mini">⤬ exit</button></div>`})
const P467 = defineComponent({ template:`<div class="ox row"><button class="mini" style="background:var(--accent);color:#0b0c14">💾 save .md</button></div>`})
const P468 = defineComponent({ template:`<div class="ox row"><button class="mini">🖨 print</button><span class="dim" style="font-size:11px">opens system print dialog</span></div>`})
const P469 = defineComponent({ template:`<div class="ox card mono" style="font-size:11px">https://aiux.local/a/abc · <button class="mini">⧉ copy</button></div>`})
const P470 = defineComponent({ template:`<div class="ox card mono" style="font-size:11px">&lt;iframe src="…" /&gt; <button class="mini">copy embed</button></div>`})
const P471 = defineComponent({ setup(){ const d=ref(true); return {d} }, template:`<div class="ox card" :style="{background: d?'#0b0c14':'#fff', color: d?'#fff':'#0b0c14'}"><b>artifact</b><button class="mini" @click="d=!d" style="margin-left:6px">{{ d?'☀ light':'🌙 dark' }}</button></div>`})
const P472 = defineComponent({ template:`<div class="ox card"><b>comments</b><div class="dim" style="font-size:12px">"§3 needs an example" — Critic</div></div>`})
const P473 = defineComponent({ template:`<div class="ox row"><span>rate</span><span style="color:var(--accent-warn)">★★★★</span><span>☆</span></div>`})
const P474 = defineComponent({ template:`<div class="ox"><div v-for="v in ['v3 · now','v2 · 2m ago','v1 · 8m ago']" :key="v" class="card row" style="font-size:12px"><span style="flex:1">{{ v }}</span><button class="mini">restore</button></div></div>`})
const P475 = defineComponent({ template:`<div class="ox row"><span class="chip">#blog</span><span class="chip">#draft</span><span class="chip">#vue</span></div>`})
const P476 = defineComponent({ template:`<div class="ox row"><button class="mini">📌 pin to top</button></div>`})
const P477 = defineComponent({ template:`<div class="ox" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">v2</div><div class="card" style="border-color:var(--accent-good)">v3 (chosen)</div></div>`})
const P478 = defineComponent({ template:`<div class="ox card mono" style="font-size:11px">{ "title":"hello", "body":"…" }</div>`})
const P479 = defineComponent({ template:`<div class="ox" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px"><div v-for="i in 6" :key="i" class="card" style="height:60px"></div></div>`})
const P480 = defineComponent({ template:`<div class="ox card mono" style="font-size:11px">created · 2026-05-12 · model frontier-llm-v1 · 2,418 tokens</div>`})
const P481 = defineComponent({ template:`<div class="ox card" style="background:#fff;height:100px;position:relative"><svg width="100%" height="100" viewBox="0 0 200 100"><path d="M20 80 Q 50 20, 100 50 T 180 30" fill="none" stroke="#0b0c14" stroke-width="3"/></svg></div>`})
const P482 = defineComponent({ template:`<div class="ox" style="display:grid;grid-template-columns:120px 1fr;gap:6px"><div class="card"><div class="dim" style="font-size:11px">outline</div><div>1. Intro</div><div>2. Solve</div><div>3. End</div></div><div class="card"><b>2. Solve</b><div class="dim" style="font-size:12px">main content here…</div></div></div>`})
const P483 = defineComponent({ template:`<div class="ox card" style="aspect-ratio:16/9;background:linear-gradient(135deg,#7d6df1,#3a64f1);position:relative"><div style="position:absolute;bottom:8px;left:8px;color:#fff">slide 3 / 12</div><div style="position:absolute;bottom:8px;right:8px"><button class="mini">‹</button><button class="mini">›</button></div></div>`})
const P484 = defineComponent({ template:`<div class="ox" style="text-align:center"><span v-for="(w,k) in [['Vue',26],['AI',22],['UX',19],['Pattern',16],['Agent',14],['Composable',11],['Streaming',12]]" :key="w[0]" :style="{fontSize: w[1]+'px',margin:'0 6px',color:'hsl('+(k*60)+',70%,65%)'}">{{ w[0] }}</span></div>`})
const P485 = defineComponent({ template:`<div class="ox row" style="flex-wrap:wrap"><span v-for="t in ['vue','ux','ai','agent','tool','memory','stream','cot','rag','swarm']" :key="t" class="chip" :style="{fontSize:(10+Math.random()*8)+'px'}">{{ t }}</span></div>`})
const P486 = defineComponent({ setup(){ const v=ref(0); useInterval(()=>{if(v.value<142) v.value++},20); return {v} }, template:`<div class="ox" style="text-align:center"><div class="num">{{ v.toLocaleString() }}</div><div class="dim">tasks completed</div></div>`})
const P487 = defineComponent({ template:`<div class="ox" style="text-align:center"><div class="num">$2,418</div><div class="row" style="justify-content:center"><span class="chip good">↑ 12%</span><span class="dim" style="font-size:11px">vs last week</span></div></div>`})
const P488 = defineComponent({ template:`<div class="ox card" style="height:120px;background:linear-gradient(180deg,#1f2740,#0e1320);position:relative"><div style="position:absolute;left:50%;top:50%;color:var(--accent-bad);font-size:20px;transform:translate(-50%,-50%)">📍</div></div>`})
const P489 = defineComponent({ template:`<div class="ox"><table><tr><th>A</th><th>B</th><th>C</th></tr><tr><td>1</td><td>2</td><td>=A+B</td></tr><tr><td>3</td><td>4</td><td>7</td></tr></table></div>`})
const P490 = defineComponent({ template:`<div class="ox card"><b>May 2026</b><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:11px;text-align:center">S M T W T F S<span v-for="i in 31" :key="i" :style="{padding:'4px 0',background:[12,18,24].includes(i)?'var(--accent)':null,color:[12,18,24].includes(i)?'#0b0c14':null,borderRadius:'4px'}">{{ i }}</span></div></div>`})
const P491 = defineComponent({ template:`<div class="ox card"><b>generated form</b><div class="row"><span style="width:60px">name</span><input/></div><div class="row"><span style="width:60px">email</span><input type="email"/></div><button class="mini" style="background:var(--accent);color:#0b0c14;align-self:flex-start;margin-top:4px">submit</button></div>`})
const P492 = defineComponent({ template:`<div class="ox card"><b>Q1.</b> What is the capital of France?<div class="row" style="flex-wrap:wrap;gap:4px;margin-top:4px"><button class="mini">London</button><button class="mini">Paris</button><button class="mini">Rome</button></div></div>`})
const P493 = defineComponent({ template:`<div class="ox card" style="aspect-ratio:1;background:#0e1320;position:relative"><div v-for="i in 9" :key="i" :style="{position:'absolute',left:((i-1)%3)*32+'%',top:Math.floor((i-1)/3)*32+'%',width:'30%',height:'30%',background:i===5?'var(--accent)':'var(--bg-3)',borderRadius:'4px'}"></div><div class="dim" style="position:absolute;bottom:6px;left:6px;color:#fff;font-size:11px">2048 mini</div></div>`})
const P494 = defineComponent({ template:`<div class="ox" style="align-items:center"><svg width="160" height="120"><circle cx="80" cy="60" r="40" fill="var(--accent)"/><circle cx="80" cy="60" r="22" fill="#0b0c14"/><polygon points="80,30 95,55 70,55" fill="var(--accent-warn)"/></svg></div>`})
const P495 = defineComponent({ template:`<div class="ox card" style="background:#0b1120;color:#a4f06d;font-family:var(--mono);font-size:12px">› node tip.js<br>$5.10 total</div>`})
const P496 = defineComponent({ template:`<div class="ox card mono" style="font-size:11px">id,name,score<br>1,Alice,94<br>2,Bo,88<br>3,Cas,76</div>`})
const P497 = defineComponent({ template:`<div class="ox" style="display:grid;grid-template-columns:120px 1fr;gap:8px"><div class="card mono" style="font-size:11px;padding:6px"><div>§ 1 intro</div><div>§ 2 setup</div><div>§ 3 results</div></div><div class="card">main article</div></div>`})
const P498 = defineComponent({ setup(){ const p=ref(40); useInterval(()=>p.value=(p.value+1)%100,200); return {p} }, template:`<div class="ox"><div style="height:3px;background:var(--bg-3);overflow:hidden;border-radius:3px"><div :style="{width:p+'%',height:'100%',background:'var(--grad)',transition:'width .2s'}"/></div><div class="dim" style="font-size:11px">reading progress</div></div>`})
const P499 = defineComponent({ template:`<div class="ox"><div class="dim mono" style="font-size:11px">citation index</div><div class="card mono" style="font-size:11px">[1] used 4× · [2] used 2× · [3] used 1×</div></div>`})
const P500 = defineComponent({ template:`<div class="ox card mono" style="font-size:11px"><b>references</b><div>[1] arXiv:2401.x · Attention Is All You Need v2</div><div>[2] NeurIPS 2025 · Scaling MoE</div></div>`})

const meta = [
  C(461,'Artifact tabs',         'Preview / Raw / Share tabs above an artifact.',P461),
  C(462,'Collapsible code regions','Fold sections of long code.',P462),
  C(463,'Multi-page artifact',   'Paginate across pages of an artifact.',P463),
  C(464,'Resizable pane divider','Drag to resize the artifact pane.',P464),
  C(465,'Zoom controls',         '+/-/Fit zoom for visual artifacts.',P465),
  C(466,'Fullscreen toggle',     'Enter/exit fullscreen for the artifact.',P466),
  C(467,'Save to disk',          'Download artifact as a local file.',P467),
  C(468,'Print artifact',        'Open the system print dialog.',P468),
  C(469,'Share artifact link',   'Copyable canonical URL of the artifact.',P469),
  C(470,'Embed snippet',         'Iframe embed code.',P470),
  C(471,'Artifact theme switch', 'Toggle between dark and light artifact theme.',P471),
  C(472,'Artifact comments',     'Inline-style comments under an artifact.',P472),
  C(473,'Star rating',           '5-star rating widget on the artifact.',P473),
  C(474,'Version history',       'Stack of past versions with restore.',P474),
  C(475,'Artifact tags',         'Free-form tag chips.',P475),
  C(476,'Pin to top',            'Pin an artifact so it stays at the top.',P476),
  C(477,'Compare versions',      'Side-by-side compare of v2 and v3.',P477),
  C(478,'Source JSON view',      'Raw JSON behind a rendered artifact.',P478),
  C(479,'Artifact gallery',      'Grid of multiple artifacts at a glance.',P479),
  C(480,'Artifact metadata',     'Creation time, model, token count.',P480),
  C(481,'Drawn art canvas',      'A canvas artifact with a drawn curve.',P481),
  C(482,'Outline + body split',  'Sidebar outline beside the content body.',P482),
  C(483,'Slide deck artifact',   'Slide-style page with prev/next.',P483),
  C(484,'Word cloud',            'Sized words colored by frequency.',P484),
  C(485,'Tag cloud',             'Inline tag chips with varying weight.',P485),
  C(486,'Count-up number',       'Big number that counts up on mount.',P486),
  C(487,'Big number + delta',    'KPI value with a colored delta chip.',P487),
  C(488,'Map artifact',          'Artifact rendered as a flat map with a pin.',P488),
  C(489,'Spreadsheet artifact',  'Editable cells like a mini sheet.',P489),
  C(490,'Calendar artifact',     'Month grid with highlighted dates.',P490),
  C(491,'Form-as-artifact',      'Generated form rendered as an artifact.',P491),
  C(492,'Quiz-as-artifact',      'Multiple-choice quiz card.',P492),
  C(493,'Game-as-artifact',      'Tiny game grid embedded inline.',P493),
  C(494,'SVG illustration',      'Pure-SVG generative illustration.',P494),
  C(495,'Code sandbox output',   'Output of code run in a sandbox.',P495),
  C(496,'CSV preview',           'First rows of a CSV preview.',P496),
  C(497,'Markdown TOC sidebar',  'Sidebar TOC alongside the article body.',P497),
  C(498,'Reading progress bar',  'Top-of-page reading progress strip.',P498),
  C(499,'Citation usage index',  'How often each citation was referenced.',P499),
  C(500,'Reference list',        'Bibliography-style references.',P500),
]

export default meta.map(m => ({ ...m, category:'Output' }))
