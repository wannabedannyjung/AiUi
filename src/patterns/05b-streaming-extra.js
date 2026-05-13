import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('stream-extra', `
.stx { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.stx .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.stx .row  { display:flex; gap:6px; align-items:center; }
.stx .pre  { background:#000; color:#a8f0a8; font-family:var(--mono); font-size:11px; padding:6px 8px; border-radius:6px; min-height:60px; white-space:pre-wrap; }
@keyframes shim { from{background-position:200% 0} to {background-position:-200% 0} }
.stx .sh   { background:linear-gradient(90deg, var(--bg-3) 0%, var(--line-2) 50%, var(--bg-3) 100%); background-size:200% 100%; animation: shim 1.6s linear infinite; height:10px; border-radius:4px; }
@keyframes wig { 0%,100%{ transform: translateY(0)} 50%{transform: translateY(-3px)} }
.stx .word { display:inline-block; animation: wig .8s ease-in-out infinite; }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'streaming UX', tags: extra.tags||['stream'], component: comp })

const P261 = defineComponent({ setup(){ const e=ref([]); let n=0; useInterval(()=>{e.value.push('event:'+(++n)); if(e.value.length>6) e.value.shift()},700); return {e} }, template:`<div class="stx pre">{{ e.join('\\n') }}</div>`})
const P262 = defineComponent({ setup(){ const p=ref(0); useInterval(()=>{p.value=(p.value+3)%100},200); return {p} }, template:`<div class="stx"><div class="row"><b>streaming</b><span class="mono mute" style="margin-left:auto">{{ p }}%</span></div><div style="height:6px;background:var(--bg-3);border-radius:6px;overflow:hidden"><div :style="{width:p+'%',height:'100%',background:'var(--grad)',transition:'width .2s'}"/></div></div>`})
const P263 = defineComponent({ setup(){ const n=ref(0); useInterval(()=>n.value++,300); return {n} }, template:`<div class="stx pill">📥 {{ n }} lines received</div>`})
const P264 = defineComponent({ setup(){ const ms=ref(120); useInterval(()=>ms.value=80+Math.floor(Math.random()*120),700); return {ms} }, template:`<div class="stx pill">latency {{ ms }}ms / chunk</div>`})
const P265 = defineComponent({ setup(){ const c=ref(0); useInterval(()=>c.value+=Math.floor(Math.random()*8)+2,150); return {c} }, template:`<div class="stx"><div class="row"><b>chars</b><span class="mono mute" style="margin-left:auto">{{ c.toLocaleString() }} / 8000</span></div><div style="height:6px;background:var(--bg-3);border-radius:6px;overflow:hidden"><div :style="{width:Math.min(100,c/80)+'%',height:'100%',background:'var(--accent)'}"/></div></div>`})
const P266 = defineComponent({ template:`<div class="stx row"><span>streaming</span><button class="mini" style="margin-left:auto">⏸</button></div>`})
const P267 = defineComponent({ template:`<div class="stx card">⏯ <b>auto-resumed</b> after 200ms backoff (chunk #4)</div>`})
const P268 = defineComponent({ template:`<div class="stx card mono" style="font-size:11px;color:var(--accent-warn)">chunk #7 failed · retrying (attempt 2/5)</div>`})
const P269 = defineComponent({ setup(){ const xy=ref([]); let i=0; useInterval(()=>{ if(i>40){ xy.value=[];i=0;return } xy.value.push([i*5, 30+Math.sin(i/2)*20]); i++ },120); return {xy} }, template:`<div class="stx"><svg width="100%" height="60" viewBox="0 0 240 60"><polyline :points="xy.map(p=>p.join(',')).join(' ')" fill="none" stroke="var(--accent)" stroke-width="2"/></svg></div>`})
const P270 = defineComponent({ setup(){ const cells=ref(Array(40).fill(0)); let i=0; useInterval(()=>{cells.value[i%40]=Math.random();i++},150); return {cells} }, template:`<div class="stx"><div style="display:grid;grid-template-columns:repeat(20,1fr);gap:2px"><div v-for="(v,i) in cells" :key="i" :style="{aspectRatio:'1',background:'rgba(139,140,247,'+v+')',borderRadius:'2px',transition:'all .2s'}"/></div></div>`})
const P271 = defineComponent({ setup(){ const pts=ref([]); useInterval(()=>{pts.value=[...pts.value,{x:Math.random()*200+10,y:Math.random()*100+10}].slice(-12)},700); return {pts} }, template:`<div class="stx"><svg width="100%" height="120" viewBox="0 0 220 120" style="background:#0e1320;border-radius:8px"><circle v-for="(p,i) in pts" :key="i" :cx="p.x" :cy="p.y" r="4" fill="var(--accent-bad)"/></svg></div>`})
const P272 = defineComponent({ setup(){ const s=ref(0); useInterval(()=>s.value=(s.value+2)%100,140); return {s} }, template:`<div class="stx"><div class="dim">progress per output token</div><div style="display:flex;gap:1px"><div v-for="i in 50" :key="i" :style="{flex:1,height:'10px',background:i<=s/2?'var(--accent)':'var(--bg-3)',borderRadius:'1px'}"/></div></div>`})
const P273 = defineComponent({ template:`<div class="stx pill" style="background:rgba(109,212,154,0.1);color:var(--accent-good);border-color:rgba(109,212,154,0.4)"><span class="dot pulse" style="background:var(--accent-good)"/> network healthy · 920 KB/s</div>`})
const P274 = defineComponent({ setup(){ const txt='Streaming is the magic trick.'.split(' '); const i=ref(0); useInterval(()=>{i.value=(i.value+1)%txt.length},250); return {txt,i} }, template:`<div class="stx"><div><span v-for="(w,k) in txt" :key="k" :style="{background: k===i?'var(--accent-warn)':null,color:k===i?'#0b0c14':null,padding:'0 2px',borderRadius:'2px'}">{{ w }}</span></div></div>`})
const P275 = defineComponent({ setup(){ const cells=reactive([null,null,null,null,null,null]); let i=0; useInterval(()=>{ if(i<6){cells[i]=['Alice','94','Bo','88','Cas','76'][i];i++} else { for(let k=0;k<6;k++) cells[k]=null; i=0 } },500); return {cells} }, template:`<div class="stx card"><table style="width:100%;font-size:12px"><tr v-for="r in 3" :key="r"><td style="padding:3px 6px"><span v-if="cells[(r-1)*2]">{{ cells[(r-1)*2] }}</span><span v-else class="sh" style="display:inline-block;width:60px"/></td><td style="padding:3px 6px"><span v-if="cells[(r-1)*2+1]">{{ cells[(r-1)*2+1] }}</span><span v-else class="sh" style="display:inline-block;width:30px"/></td></tr></table></div>`})
const P276 = defineComponent({ setup(){ const f=reactive({a:'',b:'',c:''}); const order=['a','b','c']; const v={a:'Alice',b:'Berlin',c:'Vue dev'}; let i=0; useInterval(()=>{ if(i<3){ f[order[i]]=v[order[i]]; i++ } else { for(const k of order) f[k]=''; i=0 } },700); return {f} }, template:`<div class="stx card"><div v-for="k in ['a','b','c']" :key="k" class="row"><span class="mono mute" style="width:36px">{{ k }}</span><span v-if="f[k]">{{ f[k] }}</span><span v-else class="sh" style="flex:1"/></div></div>`})
const P277 = defineComponent({ setup(){ const items=ref([]); const all=['Read repo','Find auth','Refactor','Run tests']; let i=0; useInterval(()=>{ if(i<all.length){items.value.push(all[i++])} else {items.value=[];i=0} },500); return {items} }, template:`<div class="stx"><div v-for="x in items" :key="x" class="card" style="font-size:12px;animation: fadeUp .3s">{{ x }}</div><style>@keyframes fadeUp { from {opacity:0; transform: translateY(6px)} to {opacity:1;transform:none} }</style></div>`})
const P278 = defineComponent({ setup(){ const lines=ref([]); const all=['function tip(b,p) {','  return (b*p/100).toFixed(2)','}','// done']; let i=0; useInterval(()=>{ if(i<all.length){lines.value.push(all[i++])} else { lines.value=[];i=0 } },500); return {lines} }, template:`<div class="stx pre">{{ lines.join('\\n') }}<span class="caret"/></div>`})
const P279 = defineComponent({ setup(){ const n=ref(0); useInterval(()=>{ n.value=(n.value+1)%5 },800); return {n} }, template:`<div class="stx card"><h4 v-if="n>=1" style="margin:0 0 4px">Title</h4><p v-if="n>=2" style="margin:0">A short paragraph.</p><ul v-if="n>=3" style="margin:0;padding-left:18px"><li>list item</li></ul><pre v-if="n>=4" class="mono" style="font-size:11px;background:var(--bg-2);padding:4px;border-radius:4px;margin:4px 0 0">code block</pre></div>`})
const P280 = defineComponent({ setup(){ const n=ref(0); useInterval(()=>n.value=(n.value+1)%5,700); return {n} }, template:`<div class="stx"><div v-for="k in n" :key="k" class="card" style="border-left:3px solid var(--accent);font-style:italic;color:var(--text-dim);font-size:12px;animation: fadeUp .3s">step {{ k }}: …</div></div>`})
const P281 = defineComponent({ template:`<div class="stx card">The answer streams in <span style="background:var(--accent-warn);color:#0b0c14">with annotations</span> appearing live as it generates.</div>`})
const P282 = defineComponent({ template:`<div class="stx" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">stream A: <span class="caret"/></div><div class="card">stream B: <span class="caret"/></div></div>`})
const P283 = defineComponent({ template:`<div class="stx card"><span style="color:var(--accent-good)">+ </span>added an extra constraint to the answer mid-stream<span class="caret"/></div>`})
const P284 = defineComponent({ template:`<div class="stx" style="align-items:center;justify-content:center"><div style="font-size:42px;animation: wig .25s steps(2) infinite">🗣️</div></div>`})
const P285 = defineComponent({ setup(){ const t='Hello world how are you'.split(' '); const i=ref(0); useInterval(()=>i.value=(i.value+1)%t.length,500); return {t,i} }, template:`<div class="stx" style="align-items:center;justify-content:center"><div><span v-for="(w,k) in t" :key="k" :class="{word: k===i}" style="margin-right:4px">{{ w }}</span></div></div>`})
const P286 = defineComponent({ setup(){ const c=ref(85); useInterval(()=>c.value=40+Math.floor(Math.random()*60),700); return {c} }, template:`<div class="stx card" :style="{color: c>70?'var(--accent-good)':c>40?'var(--accent-warn)':'var(--accent-bad)'}"><b>conf {{ c }}%</b><div>{{ c>70?'definitely':c>40?'probably':'maybe' }} the right answer.</div></div>`})
const P287 = defineComponent({ setup(){ const f=ref(0); useInterval(()=>f.value=(f.value+5)%100,200); return {f} }, template:`<div class="stx" style="align-items:center"><svg width="60" height="80"><rect x="10" y="10" width="40" height="60" rx="6" fill="none" stroke="var(--line-2)"/><rect x="11" :y="70-(f*0.6)" width="38" :height="f*0.6" fill="var(--accent)" rx="6"/></svg><div class="dim" style="font-size:11px">buffer · {{ f }}%</div></div>`})
const P288 = defineComponent({ setup(){ const arr=ref([]); useInterval(()=>{arr.value.push(Math.random()); if(arr.value.length>40) arr.value.shift()},120); return {arr} }, template:`<div class="stx"><div style="display:flex;gap:1px;height:60px;align-items:flex-end"><div v-for="(v,i) in arr" :key="i" :style="{width:'4px',height:(v*60)+'px',background:'var(--accent)',borderRadius:'1px'}"/></div></div>`})
const P289 = defineComponent({ template:`<div class="stx pill">⏱ ETA 18s · 4.2 chunks/sec</div>`})
const P290 = defineComponent({ setup(){ const g=ref([]); const all='✦✧✶✴︎✺❅❆'; useInterval(()=>{g.value.push(all[Math.floor(Math.random()*all.length)]); if(g.value.length>30) g.value.shift()},150); return {g} }, template:`<div class="stx" style="font-family:var(--mono);font-size:14px;color:var(--accent)">{{ g.join('') }}</div>`})
const P291 = defineComponent({ setup(){ const o=ref(0); useInterval(()=>o.value=(o.value+5)%100,150); return {o} }, template:`<div class="stx card" style="height:120px;position:relative;overflow:hidden;background:linear-gradient(135deg,#7d6df1,#6df1c4)"><div :style="{position:'absolute',inset:0,background:'#0b0c14',clipPath:'inset('+o+'% 0 0 0)'}"></div></div>`})
const P292 = defineComponent({ setup(){ const b=ref(8); useInterval(()=>b.value=Math.max(0,b.value-1),200); return {b} }, template:`<div class="stx card" style="height:80px;background:linear-gradient(135deg,#f17d3a,#7d6df1)"><div :style="{filter: 'blur('+b+'px)', height:'100%', background:'linear-gradient(135deg,#f17d3a,#7d6df1)'}"></div></div>`})
const P293 = defineComponent({ template:`<div class="stx" style="align-items:center"><svg width="120" height="120" viewBox="0 0 120 120"><path d="M10 60 Q 60 0, 110 60 T 10 60" fill="none" stroke="var(--accent)" stroke-width="3" stroke-dasharray="280" stroke-dashoffset="280" style="animation: draw 2.5s ease-in-out infinite"/><style>@keyframes draw { 50%{stroke-dashoffset:0} 100%{stroke-dashoffset:-280} }</style></svg></div>`})
const P294 = defineComponent({ setup(){ const n=ref(1); useInterval(()=>n.value=Math.min(6,n.value+1),700); return {n} }, template:`<div class="stx" style="align-items:center"><svg width="160" height="100"><circle v-for="k in n" :key="k" :cx="20+k*22" cy="50" r="10" fill="var(--accent)"/><line v-for="k in (n-1)" :key="'l'+k" :x1="30+k*22" y1="50" :x2="42+k*22" y2="50" stroke="var(--accent)" stroke-width="2"/></svg></div>`})
const P295 = defineComponent({ template:`<div class="stx"><div class="dim mono">stream of moves</div><div class="row mono" style="font-size:12px"><span class="card">e2e4</span><span class="card">e7e5</span><span class="card">Nf3</span><span class="caret"/></div></div>`})
const P296 = defineComponent({ template:`<div class="stx"><div class="sh" style="height:20px"/></div>`})
const P297 = defineComponent({ template:`<div class="stx" style="align-items:center;justify-content:center"><div><span v-for="c in 'GENERATING'.split('')" :key="c+Math.random()" :style="{display:'inline-block',animation:'wig 1.2s ease-in-out infinite',animationDelay:Math.random()+'s'}">{{ c }}</span></div></div>`})
const P298 = defineComponent({ setup(){ const i=ref(0); useInterval(()=>i.value=(i.value+1)%4,400); return {i} }, template:`<div class="stx row" style="justify-content:center;font-family:var(--mono);font-size:18px">{{ '.'.repeat(i+1).padEnd(3,' ') }}</div>`})
const P299 = defineComponent({ setup(){ const o=ref(20); useInterval(()=>o.value=Math.max(0,o.value-2),200); return {o} }, template:`<div class="stx card" :style="{aspectRatio:'2/1', background:'linear-gradient(135deg,#7d6df1,#3a64f1)', filter:'blur('+o+'px)', transition:'filter .15s'}"></div>`})
const P300 = defineComponent({ template:`<div class="stx" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">A · model X<div class="dim mono">…streaming…<span class="caret"/></div></div><div class="card">B · model Y<div class="dim mono">…streaming…<span class="caret"/></div></div></div>`})

const meta = [
  C(261,'SSE event log',          'Server-sent events stream into a console.',P261),
  C(262,'% progress label',       'Numeric progress next to the bar.',P262),
  C(263,'Lines received counter', 'Counter of streamed lines so far.',P263),
  C(264,'Per-chunk latency',      'Latency of the latest streamed chunk.',P264),
  C(265,'Char counter + bar',     'Streaming character count vs cap.',P265),
  C(266,'Pause icon',             'Single-icon pause button on a streaming row.',P266),
  C(267,'Auto-resume on backoff', 'Stream auto-resumed after a transient failure.',P267),
  C(268,'Retry-on-chunk-fail',    'Per-chunk retry banner.',P268),
  C(269,'Live 2D chart',          'Sine-wave drawn live as data streams in.',P269),
  C(270,'Live heatmap fill',      '20×2 cell heatmap that lights up as chunks arrive.',P270),
  C(271,'Live geo points',        'Points dropped on a map as data streams.',P271),
  C(272,'Per-token progress',     'Wide bar of segments per output token.',P272),
  C(273,'Network health pill',    'Live throughput pill while streaming.',P273),
  C(274,'Token highlight stream', 'Highlight the currently-being-emitted word.',P274),
  C(275,'Streaming structured table','Table cells fill in one-by-one as JSON arrives.',P275),
  C(276,'Form field-by-field',    'Form fields populate from a streaming JSON object.',P276,{inspiration:'Vercel AI SDK'}),
  C(277,'List item-by-item',      'List items animate in as they\'re streamed.',P277),
  C(278,'Code line-by-line',      'Code reveals one line at a time during streaming.',P278),
  C(279,'Markdown layered render','Title, paragraph, list, code appear in order.',P279),
  C(280,'Reasoning step blocks',  'Italic reasoning steps stream in as quoted blocks.',P280),
  C(281,'Inline annotation',      'Highlights appear over text as the answer streams.',P281),
  C(282,'A/B parallel streams',   'Two model streams compared side-by-side live.',P282),
  C(283,'Mid-stream edits',       'Visible inline edits the agent makes mid-stream.',P283),
  C(284,'TTS lipsync emoji',      'Mouth emoji animates in time with audio.',P284),
  C(285,'Word bounces',           'Currently-spoken word visibly bounces.',P285),
  C(286,'Confidence color shift', 'Whole answer changes color as confidence drifts.',P286),
  C(287,'Buffer fill jar',        'A jar fills with the streamed buffer.',P287),
  C(288,'Token waterfall',        'Live waterfall bars per chunk arrival.',P288),
  C(289,'ETA from chunks/sec',    'Estimated remaining time based on chunk rate.',P289),
  C(290,'Glyph stream',           'Random sparkle glyphs scrolling as activity proxy.',P290),
  C(291,'Thumbnail-as-it-renders','Image reveal effect (top-down) during gen.',P291),
  C(292,'JPEG-style progressive', 'Image starts blurry, sharpens as data arrives.',P292,{inspiration:'progressive JPEG'}),
  C(293,'SVG path drawing',       'Outline path animates as the agent draws it.',P293),
  C(294,'Graph node by node',     'Nodes connect into a graph as they\'re emitted.',P294),
  C(295,'Move-by-move stream',    'Chess-style move list streams one move at a time.',P295),
  C(296,'Shimmer skeleton',       'Just a single shimmering bar as a stream stand-in.',P296),
  C(297,'Bouncing letters',       'Each letter of GENERATING bounces independently.',P297),
  C(298,'Cycling dots',           'Classic "..." cycle for indefinite progress.',P298),
  C(299,'Image deblur reveal',    'Generated image becomes sharper over time.',P299),
  C(300,'A/B split panel',        'Two competing answers stream side-by-side for comparison.',P300),
]

export default meta.map(m => ({ ...m, category:'Streaming' }))
