import { defineComponent } from 'vue'
import { ref, onMounted, onUnmounted, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('conv-extra', `
.cx { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.cx .b   { background: var(--bg-3); padding:8px 10px; border-radius:10px; max-width: 80%; }
.cx .me  { background: var(--accent); color:#0b0c14; align-self:flex-end; }
.cx .ai  { align-self:flex-start; }
.cx .row { display:flex; gap:6px; align-items:center; }
.cx .mini{ background: var(--bg-3); color:var(--text-dim); border:1px solid var(--line); border-radius:999px; padding:2px 8px; font-size:11px; cursor:pointer; }
.cx .mini:hover{ color: var(--text); }
.cx .ghost { color: var(--text-mute); font-style: italic; }
.cx .cardish { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.cx .pre { background:#000; color:#e6e8f0; padding:8px 10px; border-radius:8px; font-family: var(--mono); font-size:11.5px; line-height:1.55; }
`)

const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'modern AI apps', tags: extra.tags||['chat'], component: comp })

// 101 Voice input mic
const P101 = defineComponent({ setup(){ const on=ref(false); return {on} }, template:`<div class="cx"><div class="row"><input style="flex:1" placeholder="Type or speak…"/><button class="mini" :style="{background:on?'var(--accent-bad)':'var(--accent)',color:'#0b0c14'}" @click="on=!on">{{ on?'■':'🎤' }}</button></div><div class="dim" style="font-size:11px">{{ on?'recording…':'tap mic to dictate' }}</div></div>`})

// 102 Stop generating button
const P102 = defineComponent({ setup(){ const live=ref(true); return {live} }, template:`<div class="cx"><div class="b ai">Generating an answer<span v-if="live" class="caret"/></div><button class="mini" @click="live=!live" style="align-self:flex-start;background:#000;color:#fff">{{ live?'■ Stop generating':'▶ Resume' }}</button></div>`})

// 103 Reaction emoji
const P103 = defineComponent({ setup(){ const r=reactive({'👍':3,'❤':1,'🤔':0}); function bump(k){r[k]++} return {r,bump} }, template:`<div class="cx"><div class="b ai">Here's the answer.</div><div class="row"><button v-for="(v,k) in r" :key="k" class="mini" @click="bump(k)">{{ k }} {{ v||'' }}</button></div></div>`})

// 104 Translate inline
const P104 = defineComponent({ setup(){ const ko=ref(false); return {ko} }, template:`<div class="cx"><div class="b ai">{{ ko?'트랜스포머 아키텍처는 시퀀스 학습을 변화시켰다.':'Transformers changed sequence learning.' }}</div><button class="mini" @click="ko=!ko" style="align-self:flex-start">🌐 {{ ko?'EN':'한국어' }}</button></div>`})

// 105 Rewrite/improve
const P105 = defineComponent({ setup(){ const v=ref(0); const arr=['the deploy went bad','The deploy failed.','Unfortunately, the deploy failed in production.']; return {v,arr} }, template:`<div class="cx"><div class="b me">{{ arr[v] }}</div><div class="row"><button class="mini" @click="v=Math.max(0,v-1)">← original</button><button class="mini" @click="v=Math.min(2,v+1)">✨ rewrite →</button><span class="mute" style="font-size:11px">tone: {{ ['raw','professional','formal'][v] }}</span></div></div>`})

// 106 Ghost text autocomplete (Tab-accept)
const P106 = defineComponent({ setup(){ const t=ref('How do I '); const ghost='set up a Vue 3 reactive ref?'; function tab(e){if(e.key==='Tab'){e.preventDefault(); t.value+=ghost}} return {t,ghost,tab} }, template:`<div class="cx"><div class="cardish" style="font-family:var(--mono);font-size:12px;position:relative"><input :value="t" @input="t=$event.target.value" @keydown="tab" style="background:transparent;border:none;color:inherit;width:100%;outline:none"/><div style="position:absolute;left:10px;top:8px;pointer-events:none;color:var(--text-mute)"><span style="visibility:hidden">{{ t }}</span>{{ ghost }}</div></div><div class="dim" style="font-size:11px">press <b>Tab</b> to accept ghost completion</div></div>`})

// 107 Code block with copy
const P107 = defineComponent({ setup(){ const ok=ref(false); function go(){ok.value=true;setTimeout(()=>ok.value=false,1200)} return {ok,go} }, template:`<div class="cx"><div class="pre" style="position:relative">const greet = name => \`Hello, \${name}!\`<button class="mini" style="position:absolute;right:6px;top:6px" @click="go">{{ ok?'✓ copied':'⧉ copy' }}</button></div></div>`})

// 108 Inline code execution result
const P108 = defineComponent({ setup(){ const out=ref(null); function run(){out.value='42'} return {out,run} }, template:`<div class="cx"><div class="pre">› 21 * 2</div><button class="mini" @click="run" style="align-self:flex-start;background:var(--accent-good);color:#0b0c14">▷ Run</button><div v-if="out" class="cardish" style="background:#0b1120;color:#a4f06d;font-family:var(--mono)">→ {{ out }}</div></div>`})

// 109 Quoted reply threading
const P109 = defineComponent({ template:`<div class="cx"><div class="b ai">Use Postgres advisory locks per user id.</div><div class="b me" style="display:flex;flex-direction:column;gap:4px"><div style="border-left:3px solid #0b0c14; padding-left:8px;font-size:11px;opacity:0.75">↳ Postgres advisory locks per user id.</div>What about cross-shard?</div></div>`})

// 110 Pin a message
const P110 = defineComponent({ setup(){ const p=ref(true); return {p} }, template:`<div class="cx"><div class="cardish" style="border-color: var(--accent-warn);background:rgba(245,193,97,0.08)" v-if="p"><span class="chip warn">📌 pinned</span><div style="margin-top:4px">"Always rate-limit auth endpoints."</div></div><button class="mini" style="align-self:flex-start" @click="p=!p">{{ p?'unpin':'pin again' }}</button></div>`})

// 111 Star message
const P111 = defineComponent({ setup(){ const s=ref(false); return {s} }, template:`<div class="cx"><div class="b ai">{{ s?'⭐ ':'' }}This is a great answer worth saving.</div><button class="mini" @click="s=!s" style="align-self:flex-start">{{ s?'★ starred':'☆ star' }}</button></div>`})

// 112 Search within conversation
const P112 = defineComponent({ setup(){ const q=ref('lock'); const all=['About auth: rate limit','Use mutex for in-process','Postgres advisory locks per user','Lock-free option: CAS','Done — locks added']; const hits=computed(()=>all.filter(s=>s.toLowerCase().includes(q.value.toLowerCase()))); return {q,all,hits} }, template:`<div class="cx"><input v-model="q" placeholder="search this chat…"/><div v-for="m in hits" :key="m" class="cardish" style="font-size:12px"><span v-html="m.replace(new RegExp(q,'i'), m=>'<mark style=\\'background:var(--accent-warn);color:#0b0c14\\'>'+m+'</mark>')"/></div><div v-if="!hits.length" class="mute">no matches</div></div>`})

// 113 Filter messages by role
const P113 = defineComponent({ setup(){ const roles=reactive({me:true,ai:true,sys:false}); const msgs=[{r:'sys',t:'system rebooted'},{r:'me',t:'hi'},{r:'ai',t:'hello'},{r:'sys',t:'tool call'},{r:'me',t:'thanks'}]; const show=computed(()=>msgs.filter(m=>roles[m.r])); return {roles,show} }, template:`<div class="cx"><div class="row"><label v-for="(_,k) in roles" :key="k"><input type="checkbox" v-model="roles[k]"/> {{ k }}</label></div><div v-for="m in show" :key="m.t" class="cardish" style="font-size:12px"><span class="chip">{{ m.r }}</span> {{ m.t }}</div></div>`})

// 114 Export conversation menu
const P114 = defineComponent({ setup(){ const o=ref(false); return {o} }, template:`<div class="cx" style="position:relative"><button class="mini" @click="o=!o" style="align-self:flex-start">⤓ Export ▾</button><div v-if="o" class="cardish" style="position:absolute;top:34px;left:0;display:flex;flex-direction:column;gap:2px;width:160px"><div v-for="x in ['Markdown','PDF','JSON','HTML']" :key="x" style="padding:4px 8px;cursor:pointer">↓ {{ x }}</div></div></div>`})

// 115 Share link
const P115 = defineComponent({ setup(){ const c=ref(false); function go(){c.value=true;setTimeout(()=>c.value=false,1500)} return {c,go} }, template:`<div class="cx"><div class="cardish mono" style="font-size:11px">https://aiux.local/c/abc123</div><button class="mini" @click="go" style="align-self:flex-start">{{ c?'✓ copied':'🔗 copy share link' }}</button></div>`})

// 116 Auto-summarize old messages
const P116 = defineComponent({ template:`<div class="cx"><div class="cardish" style="background:rgba(139,140,247,0.06);border-color:rgba(139,140,247,0.4)"><span class="chip accent">summary</span><div class="dim" style="margin-top:4px;font-style:italic">Earlier: discussed auth refactor, agreed on Postgres locks.</div></div><div class="b me">So what about migration order?</div><div class="b ai">First add the lock, then the column.</div></div>`})

// 117 Smart compose autocomplete
const P117 = defineComponent({ setup(){ const t=ref('Thanks for the '); return {t} }, template:`<div class="cx"><div class="cardish" style="position:relative"><input v-model="t" style="background:transparent;border:none;color:inherit;width:100%;outline:none"/><span style="position:absolute;right:8px;top:8px" class="chip">⏎ accept</span></div><div class="dim" style="font-size:11px">smart-compose suggests next phrase</div></div>`})

// 118 Inline definition popover
const P118 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cx"><div class="b ai">We use a <span @mouseenter="h=true" @mouseleave="h=false" style="color:var(--accent);text-decoration:underline dotted;cursor:help">CRDT</span> for state sync.</div><div v-if="h" class="cardish" style="max-width:80%"><b>CRDT</b> — Conflict-free Replicated Data Type. Allows distributed edits to merge deterministically.</div></div>`})

// 119 Ask AI on selection
const P119 = defineComponent({ setup(){ const sel=ref(false); return {sel} }, template:`<div class="cx"><div class="cardish" @mouseup="sel=true" style="user-select:text">Highlight any portion of <span style="background:var(--accent-warn);color:#0b0c14">this paragraph</span> and a quick action menu pops up.</div><div v-if="sel" class="row" style="background:#000;color:#fff;padding:4px;border-radius:6px;align-self:flex-start"><button class="mini">✨ Improve</button><button class="mini">💡 Explain</button><button class="mini">🌐 Translate</button></div></div>`})

// 120 Right-click context menu
const P120 = defineComponent({ setup(){ const p=ref(null); function open(e){e.preventDefault(); p.value={x:e.offsetX,y:e.offsetY}} return {p,open} }, template:`<div class="cx" style="position:relative"><div class="cardish" @contextmenu="open" style="height:100px;display:grid;place-items:center">right-click anywhere here</div><div v-if="p" class="cardish" :style="{position:'absolute',left:p.x+'px',top:(p.y+30)+'px',padding:'4px 0',width:'160px',zIndex:2}"><div v-for="x in ['Ask AI','Improve','Translate','Cite']" :key="x" style="padding:4px 10px;cursor:pointer" @click="p=null">↳ {{ x }}</div></div></div>`})

// 121 Drag-rearrange messages
const P121 = defineComponent({ setup(){ const m=reactive(['Hello','Plan?','Step 1','Step 2','Done']); function up(i){if(i>0)[m[i-1],m[i]]=[m[i],m[i-1]]} function dn(i){if(i<m.length-1)[m[i+1],m[i]]=[m[i],m[i+1]]} return {m,up,dn} }, template:`<div class="cx"><div v-for="(t,i) in m" :key="t" class="cardish row" style="font-size:12px"><span style="flex:1">{{ t }}</span><button class="mini" @click="up(i)">▲</button><button class="mini" @click="dn(i)">▼</button></div></div>`})

// 122 Multi-select bulk
const P122 = defineComponent({ setup(){ const sel=reactive(new Set()); function tog(i){sel.has(i)?sel.delete(i):sel.add(i)} return {sel,tog} }, template:`<div class="cx"><div v-for="i in 4" :key="i" class="cardish row" @click="tog(i)" :style="{cursor:'pointer',background:sel.has(i)?'rgba(139,140,247,0.12)':null}"><input type="checkbox" :checked="sel.has(i)"/> message #{{ i }}</div><div v-if="sel.size" class="row"><span class="chip accent">{{ sel.size }} selected</span><button class="mini">Delete</button><button class="mini">Export</button></div></div>`})

// 123 Hover timestamp
const P123 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cx"><div class="b ai" @mouseenter="h=true" @mouseleave="h=false" style="position:relative">Hover me to see when this was sent.<span v-if="h" class="chip" style="position:absolute;right:-90px;top:6px">3m ago</span></div></div>`})

// 124 Reaction count summary
const P124 = defineComponent({ template:`<div class="cx"><div class="b ai">A particularly liked answer.</div><div class="row"><span class="chip">👍 12</span><span class="chip">🎉 4</span><span class="chip">💡 2</span><span class="mute" style="font-size:11px">18 reactions from your team</span></div></div>`})

// 125 Persona selector
const P125 = defineComponent({ setup(){ const p=ref('Friendly'); return {p} }, template:`<div class="cx"><div class="row"><span>Persona</span><select v-model="p"><option>Friendly</option><option>Concise</option><option>Pirate</option><option>Senior staff eng</option></select></div><div class="b ai">{{ {Friendly:'Hey! Sure thing—',Concise:'Yes.',Pirate:'Arrr, aye matey!','Senior staff eng':'Indeed; one consideration:'}[p] }} I can help.</div></div>`})

// 126 Sidebar chat history with search
const P126 = defineComponent({ setup(){ const q=ref(''); const list=['Auth refactor','Vue3 router bug','Tax king ideas','Snowball roadmap']; const f=computed(()=>list.filter(x=>x.toLowerCase().includes(q.value.toLowerCase()))); return {q,f} }, template:`<div class="cx" style="display:grid;grid-template-columns:140px 1fr;gap:8px"><div style="display:flex;flex-direction:column;gap:4px"><input v-model="q" placeholder="search…" style="font-size:11px"/><div v-for="x in f" :key="x" class="cardish" style="font-size:11px;padding:4px 8px">{{ x }}</div></div><div class="cardish" style="padding:8px"><div class="dim mono" style="font-size:11px">— select a chat —</div></div></div>`})

// 127 Fork from this point
const P127 = defineComponent({ template:`<div class="cx"><div class="b ai">Here is the answer A.</div><div class="row" style="align-self:flex-start"><button class="mini">⑂ Fork from here</button><span class="mute" style="font-size:11px">creates a new branch from this turn</span></div></div>`})

// 128 Snippet library
const P128 = defineComponent({ setup(){ const o=ref(false); const sn=['/explain','/test','/refactor','/docstring']; return {o,sn} }, template:`<div class="cx"><button class="mini" @click="o=!o" style="align-self:flex-start">📚 Saved prompts</button><div v-if="o" class="cardish" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><button v-for="s in sn" :key="s" class="mini">{{ s }}</button></div></div>`})

// 129 Quick-action toolbar
const P129 = defineComponent({ template:`<div class="cx"><div class="b ai">Long answer to act on.</div><div class="row" style="background:var(--bg-3);padding:4px 6px;border-radius:8px;align-self:flex-start"><button class="mini">📝 Summarize</button><button class="mini">✨ Rewrite</button><button class="mini">🔼 Expand</button><button class="mini">🌐 Translate</button></div></div>`})

// 130 MD preview side-by-side
const P130 = defineComponent({ template:`<div class="cx" style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><textarea class="mono" style="font-size:11px;min-height:120px"># Title
- a
- **b**</textarea><div class="cardish"><h4 style="margin:0 0 4px">Title</h4><ul style="margin:0;padding-left:18px"><li>a</li><li><b>b</b></li></ul></div></div>`})

// 131 Inline LaTeX
const P131 = defineComponent({ template:`<div class="cx"><div class="b ai">The Pythagorean theorem: <span style="font-style:italic;font-family:Georgia">a² + b² = c²</span></div><div class="dim" style="font-size:11px">$a^2+b^2=c^2$ rendered inline</div></div>`})

// 132 Mermaid-style inline diagram
const P132 = defineComponent({ template:`<div class="cx"><div class="cardish" style="display:grid;place-items:center"><svg width="220" height="80" viewBox="0 0 220 80"><rect x="6" y="28" width="60" height="24" rx="6" fill="var(--bg-3)" stroke="var(--line-2)"/><text x="36" y="44" text-anchor="middle" font-size="11" fill="#e6e8f0">User</text><line x1="66" y1="40" x2="106" y2="40" stroke="var(--line-2)"/><rect x="106" y="28" width="60" height="24" rx="6" fill="var(--accent)" stroke="none"/><text x="136" y="44" text-anchor="middle" font-size="11" fill="#0b0c14">AI</text><line x1="166" y1="40" x2="206" y2="40" stroke="var(--line-2)"/><rect x="156" y="28" width="60" height="24" rx="6" fill="var(--bg-3)" stroke="var(--line-2)" transform="translate(50,0)"/></svg></div></div>`})

// 133 Code theme selector
const P133 = defineComponent({ setup(){ const t=ref('dark'); const themes={dark:'#0b1120',light:'#fff',solar:'#fdf6e3'}; return {t,themes} }, template:`<div class="cx"><div class="row"><span>Theme</span><select v-model="t"><option>dark</option><option>light</option><option>solar</option></select></div><pre class="mono" :style="{background: themes[t], color: t==='dark'?'#a4f06d':'#0b0c14',padding:'10px',borderRadius:'8px',fontSize:'12px',margin:0}">function hi() { return 'hi' }</pre></div>`})

// 134 Sentiment indicator
const P134 = defineComponent({ template:`<div class="cx"><div class="b me">This is exhausting and not working.</div><div class="row"><span class="chip bad">😟 frustrated</span><span class="dim" style="font-size:11px">tone detected — agent will respond with extra empathy</span></div></div>`})

// 135 Smart paste URL → preview card
const P135 = defineComponent({ setup(){ const u=ref(''); const card=computed(()=>u.value.startsWith('http')); return {u,card} }, template:`<div class="cx"><input v-model="u" placeholder="paste a URL…"/><div v-if="card" class="cardish" style="display:flex;gap:8px;padding:8px"><div style="width:48px;height:48px;border-radius:8px;background:var(--accent)"></div><div><b>Article title</b><div class="dim" style="font-size:11px">{{ u }}</div></div></div></div>`})

// 136 Drag-resize input box
const P136 = defineComponent({ setup(){ const h=ref(48); function down(e){const sy=e.clientY,sh=h.value;function mv(ev){h.value=Math.max(36,Math.min(160,sh+(ev.clientY-sy)))}function up(){window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up)}window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up)} return {h,down} }, template:`<div class="cx"><div @mousedown="down" style="height:6px;background:var(--line);cursor:ns-resize;border-radius:3px;align-self:stretch"></div><textarea :style="{height:h+'px'}" placeholder="drag the bar above to resize"/></div>`})

// 137 Emoji picker AI suggestions
const P137 = defineComponent({ template:`<div class="cx"><input value="Just shipped the release"/><div class="row"><span class="dim" style="font-size:11px">AI suggests:</span><button class="mini">🚀</button><button class="mini">🎉</button><button class="mini">🔥</button><button class="mini">✨</button></div></div>`})

// 138 Reading time estimate
const P138 = defineComponent({ template:`<div class="cx"><div class="row"><span class="chip">📖 4 min read</span><span class="mute" style="font-size:11px">≈ 820 words</span></div><div class="b ai">A long-form answer follows…</div></div>`})

// 139 Read aloud TTS button
const P139 = defineComponent({ setup(){ const on=ref(false); return {on} }, template:`<div class="cx"><div class="b ai">This answer can be played aloud.</div><div class="row" style="align-self:flex-start"><button class="mini" @click="on=!on" :style="{background:on?'var(--accent):':'var(--bg-3)',color:on?'#0b0c14':null}">{{ on?'⏸ pause':'▶ read aloud' }}</button><div v-if="on" class="row" style="gap:2px"><div v-for="i in 12" :key="i" :style="{width:'2px',height:(4+Math.random()*14)+'px',background:'var(--accent)'}"></div></div></div></div>`})

// 140 Auto topic tags
const P140 = defineComponent({ template:`<div class="cx"><div class="b ai">A debate on auth strategies, Postgres locks, and rate limiting.</div><div class="row"><span class="chip accent">#auth</span><span class="chip accent">#postgres</span><span class="chip accent">#concurrency</span><span class="mute" style="font-size:11px">auto-detected</span></div></div>`})

const meta = [
  C(101,'Voice input mic','Mic button records dictation into the chat input.',P101,{tags:['chat','voice']}),
  C(102,'Stop generating','Button to interrupt a streaming reply.',P102),
  C(103,'Reaction emojis','Click emoji to react with running counts.',P103),
  C(104,'Inline translate','Toggle a message between source and target language.',P104,{tags:['chat','i18n']}),
  C(105,'Rewrite tone',  'Cycle a draft through tone variations (raw → professional → formal).',P105),
  C(106,'Ghost-text autocomplete','Tab-accept a greyed completion suggestion.',P106,{inspiration:'Gmail Smart Compose, Cursor'}),
  C(107,'Code block + copy','Code with a copy button that flashes ✓.',P107),
  C(108,'Inline run result','Run a small expression inline and see the result.',P108),
  C(109,'Quoted reply','Reply with the parent message quoted as a stripe.',P109,{inspiration:'Slack threads'}),
  C(110,'Pin message','Yellow highlight + chip for a pinned answer.',P110),
  C(111,'Star message','Toggle a star on great answers.',P111),
  C(112,'Search in chat','Text search through messages with highlighted hits.',P112),
  C(113,'Filter by role','Toggle visibility of system / me / ai messages.',P113),
  C(114,'Export menu','MD / PDF / JSON / HTML export dropdown.',P114),
  C(115,'Share link','One-click copyable share URL of the conversation.',P115),
  C(116,'Auto-summary fold','Older context collapses into an auto-summary card.',P116),
  C(117,'Smart compose',  'Suggested next phrase appears with ⏎ to accept.',P117),
  C(118,'Inline definition','Hover a domain term for a tooltip definition.',P118),
  C(119,'Ask-AI on selection','Highlight text → mini quick-action toolbar.',P119,{inspiration:'Notion AI, Arc'}),
  C(120,'Right-click context menu','RMB anywhere in chat for AI actions.',P120),
  C(121,'Drag rearrange',  'Reorder messages with up/down handles.',P121),
  C(122,'Multi-select bulk','Checkbox-select multiple messages for bulk actions.',P122),
  C(123,'Hover timestamp','Time appears only on hover — keeps UI clean.',P123),
  C(124,'Reaction summary','Aggregated reaction counts shown as chips.',P124),
  C(125,'Persona selector','Pick the assistant\'s voice style on the fly.',P125),
  C(126,'History sidebar search','Filter prior chats by keyword.',P126),
  C(127,'Fork from here',  'Branch a new conversation off any prior turn.',P127),
  C(128,'Saved prompts library','Quick-insert from a personal snippet collection.',P128),
  C(129,'Quick-action toolbar','Floating toolbar with summarize/rewrite/expand.',P129),
  C(130,'MD preview split','Side-by-side raw markdown and rendered preview.',P130),
  C(131,'Inline LaTeX',     'Math equations rendered inline in answers.',P131),
  C(132,'Inline diagram',   'Mini SVG flow-chart embedded in an answer.',P132),
  C(133,'Code theme select','Switch syntax-highlight theme per code block.',P133),
  C(134,'Sentiment indicator','Detected user tone influences agent response.',P134),
  C(135,'Smart-paste URL',  'Paste a URL to auto-render a link preview card.',P135),
  C(136,'Drag-resize input','Manually resize the chat input height.',P136),
  C(137,'Emoji AI suggest', 'AI proposes emojis appropriate to your text.',P137),
  C(138,'Reading time',     'Estimated reading time chip on long answers.',P138),
  C(139,'Read aloud TTS',   'Have any answer read out via text-to-speech.',P139),
  C(140,'Auto topic tags',  'Auto-detected #topic chips on conversations.',P140),
]

export default meta.map(m => ({ ...m, category:'Conversation' }))
