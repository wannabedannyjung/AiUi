import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('ai-imagined', `
.ai { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; align-items:center; justify-content:center; position:relative; overflow:hidden; }
.ai .stage { position:relative; width:240px; height:160px; border-radius:14px; overflow:hidden; background:#0a0b14; }
.ai .label { position:absolute; bottom:6px; left:8px; font-size:10px; color:rgba(255,255,255,0.5); font-family: var(--mono); pointer-events:none; }

@keyframes ai-orbit { to { transform: rotate(360deg) } }
@keyframes ai-orbit-rev { to { transform: rotate(-360deg) } }
@keyframes ai-blink { 50% { opacity:.2 } }
@keyframes ai-pulse { 0%,100% { transform: scale(1); opacity:.9 } 50% { transform: scale(1.4); opacity:.4 } }
@keyframes ai-twinkle { 0%,100% { opacity:.2 } 50% { opacity:1 } }
@keyframes ai-flow-x { from { transform: translateX(-30%) } to { transform: translateX(30%) } }
@keyframes ai-flow-y { from { transform: translateY(-100%) } to { transform: translateY(100%) } }
@keyframes ai-spin-y { to { transform: rotateY(360deg) } }
@keyframes ai-morph { 0%,100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50% } 33% { border-radius: 30% 70% 60% 40% / 70% 30% 60% 40% } 66% { border-radius: 50% 50% 30% 70% / 40% 70% 50% 50% } }
@keyframes ai-grow { 0%,100% { transform: scale(0.6) } 50% { transform: scale(1.2) } }
@keyframes ai-shimmer { from{ background-position:200% 0 } to { background-position:-200% 0 } }
@keyframes ai-dash-w { to { stroke-dashoffset: -20 } }
@keyframes ai-aura  { 0%,100% { box-shadow: 0 0 0 0 rgba(139,140,247,.6), 0 0 0 0 rgba(106,217,196,.4) } 50% { box-shadow: 0 0 24px 8px rgba(139,140,247,.6), 0 0 40px 12px rgba(106,217,196,.4) } }
@keyframes ai-sweep { from { stroke-dashoffset: 360 } to { stroke-dashoffset: 0 } }
@keyframes ai-merge { 0%,100% { transform: translateX(-30%) } 50% { transform: translateX(0) } }
@keyframes ai-rise { from { transform: translateY(20px); opacity:0 } to { transform: translateY(0); opacity:1 } }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'imagined / next-gen', tags: extra.tags||['ai-imagined','wow'], component: comp })

// 901 — Agent constellation (3D star map)
const P901 = defineComponent({ setup(){ const stars=Array.from({length:9},(_,i)=>({a:(i*40),r:40+(i%3)*22,c:i%3===0?'#8b8cf7':i%3===1?'#6ad9c4':'#f5c161'})); return {stars} }, template:`<div class="ai"><div class="stage" style="display:grid;place-items:center"><svg width="220" height="160" viewBox="0 0 220 160"><circle cx="110" cy="80" r="14" fill="#fff" style="filter:drop-shadow(0 0 8px #fff)"/><g style="transform-origin:110px 80px;animation: ai-orbit 18s linear infinite"><circle v-for="(s,i) in stars" :key="i" :cx="110 + Math.cos(s.a*Math.PI/180)*s.r" :cy="80 + Math.sin(s.a*Math.PI/180)*s.r" :r="3+i%3" :fill="s.c" style="filter:drop-shadow(0 0 4px currentColor);color:inherit"/></g></svg><div class="label">10 agents · constellation</div></div></div>`})

// 902 — Conversation river of orbs
const P902 = defineComponent({ setup(){ const orbs=Array.from({length:14},(_,i)=>({d:(i*0.4)+'s', y:30+(i%5)*22, c:['#8b8cf7','#6ad9c4','#f5c161','#f17d6d'][i%4]})); return {orbs} }, template:`<div class="ai"><div class="stage" style="background:linear-gradient(180deg,#0a0b14,#1a1f3a)"><div v-for="(o,i) in orbs" :key="i" :style="{position:'absolute',left:'-10%',top:o.y+'px',width:'12px',height:'12px',borderRadius:'50%',background:o.c,boxShadow:'0 0 12px '+o.c,animation:'ai-flow-x 4s linear infinite',animationDelay:o.d,opacity:0.85}"/><div class="label">message stream</div></div></div>`})

// 903 — Thought-cloud merge
const P903 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center"><svg width="240" height="160" viewBox="0 0 240 160"><g style="filter:drop-shadow(0 0 12px #8b8cf7)"><ellipse cx="80" cy="80" rx="50" ry="36" fill="rgba(139,140,247,.5)" style="animation: ai-merge 4s ease-in-out infinite"/><ellipse cx="160" cy="80" rx="50" ry="36" fill="rgba(106,217,196,.5)" style="animation: ai-merge 4s ease-in-out infinite reverse"/></g></svg><div class="label">two minds → one</div></div></div>`})

// 904 — Spatial workspace floating windows
const P904 = defineComponent({ template:`<div class="ai"><div class="stage" style="background:radial-gradient(circle at 50% 60%, #1a1f3a, #0a0b14);perspective:600px"><div v-for="(w,i) in [{x:30,y:30,r:-8,c:'#8b8cf7'},{x:120,y:50,r:6,c:'#6ad9c4'},{x:60,y:90,r:-4,c:'#f5c161'},{x:140,y:100,r:8,c:'#f17d6d'}]" :key="i" :style="{position:'absolute',left:w.x+'px',top:w.y+'px',width:'70px',height:'45px',borderRadius:'8px',background:w.c,opacity:0.85,transform:'rotateY('+w.r*4+'deg) rotateX('+w.r*2+'deg)',boxShadow:'0 6px 20px rgba(0,0,0,0.4)'}"/><div class="label">spatial OS</div></div></div>`})

// 905 — Cursor-following swarm
const P905 = defineComponent({ setup(){ const m=ref({x:120,y:80}); const trail=ref(Array.from({length:12},()=>({x:120,y:80}))); function move(e){ const r=e.currentTarget.getBoundingClientRect(); m.value={x:e.clientX-r.left,y:e.clientY-r.top} } useInterval(()=>{const t=trail.value; for(let i=t.length-1;i>0;i--){t[i]={x:t[i-1].x,y:t[i-1].y}} t[0]={x:m.value.x+(Math.random()-0.5)*4,y:m.value.y+(Math.random()-0.5)*4}},50); return {m,trail,move} }, template:`<div class="ai"><div class="stage" style="cursor:none" @mousemove="move"><div v-for="(p,i) in trail" :key="i" :style="{position:'absolute',left:p.x+'px',top:p.y+'px',width:(12-i)+'px',height:(12-i)+'px',borderRadius:'50%',background:'hsl('+(i*30)+',80%,60%)',transform:'translate(-50%,-50%)',transition:'all .1s',opacity:1-i*0.07,filter:'drop-shadow(0 0 4px currentColor)'}"/><div class="label">agents follow your gaze</div></div></div>`})

// 906 — Eye-track overlay
const P906 = defineComponent({ setup(){ const pos=ref({x:60,y:50}); useInterval(()=>{pos.value={x:30+Math.random()*60,y:25+Math.random()*50}},1400); return {pos} }, template:`<div class="ai"><div class="stage"><div :style="{position:'absolute',left:pos.x+'%',top:pos.y+'%',width:'48px',height:'48px',borderRadius:'50%',border:'2px solid #6ad9c4',transform:'translate(-50%,-50%)',transition:'all 1s ease-in-out',boxShadow:'0 0 24px #6ad9c4'}"></div><div :style="{position:'absolute',left:pos.x+'%',top:pos.y+'%',width:'8px',height:'8px',background:'#6ad9c4',borderRadius:'50%',transform:'translate(-50%,-50%)',transition:'all 1s'}"></div><div class="label">tracking your gaze · 0.92 conf</div></div></div>`})

// 907 — Neural mesh firing
const P907 = defineComponent({ setup(){ const nodes=Array.from({length:14},(_,i)=>({x:30+(i%5)*46,y:30+Math.floor(i/5)*40,d:(i*0.2)+'s'})); return {nodes} }, template:`<div class="ai"><div class="stage"><svg width="220" height="160" viewBox="0 0 240 160"><line v-for="(n,i) in nodes.slice(0,9)" :key="i" :x1="n.x" :y1="n.y" :x2="nodes[i+1].x" :y2="nodes[i+1].y" stroke="rgba(139,140,247,.4)" stroke-width="1" stroke-dasharray="4 3" style="animation: ai-dash-w 2s linear infinite"/><circle v-for="(n,i) in nodes" :key="'n'+i" :cx="n.x" :cy="n.y" r="6" fill="#8b8cf7" :style="{animation:'ai-pulse 1.6s ease-in-out infinite',animationDelay:n.d,filter:'drop-shadow(0 0 6px #8b8cf7)'}"/></svg><div class="label">neural mesh · firing</div></div></div>`})

// 908 — Time-rewind reasoning scrubber
const P908 = defineComponent({ setup(){ const t=ref(0.5); const stages=['parse','plan','search','reason','answer']; const idx=computed(()=>Math.min(stages.length-1,Math.floor(t.value*stages.length))); return {t,stages,idx} }, template:`<div class="ai"><div class="stage" style="background:radial-gradient(circle at center,#1a1f3a,#0a0b14);display:grid;place-items:center;gap:8px"><div style="font-size:11px;color:rgba(255,255,255,.5);font-family:var(--mono)">↻ reasoning replay</div><div style="font-size:18px;color:#6ad9c4;font-weight:700">{{ stages[idx] }}…</div><div v-for="i in idx+1" :key="i" :style="{position:'absolute',top:(20+i*6)+'%',left:'10%',right:'10%',height:'1px',background:'rgba(106,217,196,.3)'}"></div></div><input type="range" min="0" max="1" step="0.01" v-model.number="t" style="width:200px"/></div>`})

// 909 — Personality crystal
const P909 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center;perspective:600px"><div style="width:90px;height:90px;transform-style:preserve-3d;animation: ai-spin-y 6s linear infinite"><div v-for="i in 6" :key="i" :style="{position:'absolute',inset:0,background:'linear-gradient(135deg, hsl('+(i*60)+',70%,55%), hsl('+(i*60+30)+',70%,40%))',clipPath:'polygon(50% 0,100% 50%,50% 100%,0 50%)',transform:'rotateY('+(i*60)+'deg)',opacity:0.7}"></div></div><div class="label">persona · "Curious Sage"</div></div></div>`})

// 910 — Quorum sun (agents orbiting + voting)
const P910 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center"><svg width="220" height="160" viewBox="0 0 220 160"><circle cx="110" cy="80" r="20" fill="url(#sun-grad)" style="filter:drop-shadow(0 0 16px #f5c161)"/><defs><radialGradient id="sun-grad"><stop offset="0%" stop-color="#fff"/><stop offset="60%" stop-color="#f5c161"/><stop offset="100%" stop-color="#f17d6d"/></radialGradient></defs><g style="transform-origin:110px 80px;animation:ai-orbit 8s linear infinite"><circle v-for="(o,i) in 6" :key="i" :cx="110 + Math.cos(i*60*Math.PI/180)*55" :cy="80 + Math.sin(i*60*Math.PI/180)*55" r="8" :fill="i<4?'#6ad9c4':'#8b8cf7'" style="filter:drop-shadow(0 0 4px currentColor)"/></g></svg><div class="label">quorum · 4 of 6 voted ✓</div></div></div>`})

// 911 — Liquid AI flowing between zones
const P911 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:14px"><div style="position:relative;border:1px dashed rgba(255,255,255,.2);border-radius:10px"><div style="position:absolute;left:30%;top:30%;width:50px;height:50px;background:linear-gradient(135deg,#7d6df1,#6ad9c4);animation: ai-morph 6s ease-in-out infinite, ai-flow-x 3s ease-in-out infinite alternate"></div></div><div style="position:relative;border:1px dashed rgba(255,255,255,.2);border-radius:10px;display:grid;place-items:center;color:rgba(255,255,255,.4);font-size:11px">target</div><div class="label">liquid AI flows to where it's needed</div></div></div>`})

// 912 — Morphing holographic face
const P912 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center;background:radial-gradient(circle at center,#1a0a3a,#0a0b14)"><svg width="120" height="120" viewBox="0 0 120 120" style="filter:drop-shadow(0 0 16px #8b8cf7)"><ellipse cx="60" cy="60" rx="40" ry="48" fill="none" stroke="url(#face-grad)" stroke-width="2" style="animation: ai-morph 5s ease-in-out infinite"/><defs><linearGradient id="face-grad" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#8b8cf7"/><stop offset="50%" stop-color="#6ad9c4"/><stop offset="100%" stop-color="#f5c161"/></linearGradient></defs><circle cx="48" cy="50" r="3" fill="#fff"/><circle cx="72" cy="50" r="3" fill="#fff"/><path d="M48 78 Q 60 85 72 78" stroke="#fff" stroke-width="2" fill="none"/></svg><div class="label">holo · empathy mode</div></div></div>`})

// 913 — Memory palace pseudo-3D corridor
const P913 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center;perspective:300px;background:linear-gradient(180deg,#0a0b14 30%,#1a1f3a)"><div style="position:relative;width:160px;height:80px;transform-style:preserve-3d;transform:rotateX(20deg)"><div v-for="i in 5" :key="i" :style="{position:'absolute',left:'50%',top:'50%',width:(120-i*20)+'px',height:(60-i*10)+'px',border:'1px solid rgba(139,140,247,'+(0.7-i*0.12)+')',borderRadius:'4px',transform:'translate(-50%,-50%) translateZ('+(-i*30)+'px)'}"></div></div><div class="label">memory palace · room 3 / 9</div></div></div>`})

// 914 — Brain hemisphere split
const P914 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center"><svg width="200" height="120" viewBox="0 0 200 120"><g style="filter:drop-shadow(0 0 8px #8b8cf7)"><path d="M50 60 Q 50 20 100 20 Q 100 100 50 100 Q 30 80 50 60" fill="rgba(139,140,247,.6)" stroke="#8b8cf7"/><path d="M150 60 Q 150 20 100 20 Q 100 100 150 100 Q 170 80 150 60" fill="rgba(106,217,196,.6)" stroke="#6ad9c4"/></g><text x="65" y="64" font-size="10" text-anchor="middle" fill="#fff">logic</text><text x="135" y="64" font-size="10" text-anchor="middle" fill="#fff">create</text></svg><div class="label">two cognitive hemispheres in parallel</div></div></div>`})

// 915 — AR gaze coach following eye
const P915 = defineComponent({ setup(){ const i=ref(0); const targets=[{x:25,y:30,t:'click here'},{x:70,y:50,t:'now read this'},{x:40,y:70,t:'try this'}]; useInterval(()=>i.value=(i.value+1)%targets.length,2200); return {i,targets} }, template:`<div class="ai"><div class="stage" style="background:linear-gradient(135deg,#1f2740,#0e1320)"><div :style="{position:'absolute',left:targets[i].x+'%',top:targets[i].y+'%',transition:'all 1.4s ease-in-out',transform:'translate(-50%,-50%)'}"><div style="width:30px;height:30px;border:2px solid #6ad9c4;border-radius:50%;animation: ai-pulse 1.4s ease-in-out infinite"></div><div style="background:#6ad9c4;color:#0b0c14;padding:2px 6px;border-radius:4px;font-size:10px;margin-top:4px;white-space:nowrap;font-weight:600">{{ targets[i].t }}</div></div><div class="label">AR coach · gaze-aware</div></div></div>`})

// 916 — Agent symphony tones
const P916 = defineComponent({ setup(){ const bars=ref(Array.from({length:6},()=>20)); useInterval(()=>bars.value=bars.value.map((_,i)=>20+Math.abs(Math.sin(Date.now()/300+i))*60),100); const colors=['#8b8cf7','#6ad9c4','#f5c161','#f17d6d','#a4f06d','#ff8af0']; return {bars,colors} }, template:`<div class="ai"><div class="stage" style="display:flex;align-items:flex-end;gap:8px;padding:20px"><div v-for="(h,i) in bars" :key="i" :style="{flex:1,height:h+'px',background:'linear-gradient(180deg,'+colors[i]+',transparent)',borderRadius:'6px 6px 0 0',transition:'height .1s',boxShadow:'0 0 12px '+colors[i]}"/><div class="label">6 agents · each its own voice</div></div></div>`})

// 917 — Living thought-graph
const P917 = defineComponent({ setup(){ const nodes=ref([{x:120,y:80,r:18},{x:60,y:40,r:10},{x:180,y:40,r:10},{x:60,y:120,r:10},{x:180,y:120,r:10}]); useInterval(()=>{nodes.value=nodes.value.map(n=>({...n,r:n.r+(Math.random()-0.5)*2}))},300); return {nodes} }, template:`<div class="ai"><div class="stage"><svg width="240" height="160" viewBox="0 0 240 160"><line v-for="(n,i) in nodes.slice(1)" :key="i" x1="120" y1="80" :x2="n.x" :y2="n.y" stroke="rgba(106,217,196,.4)" stroke-width="2"/><circle v-for="(n,i) in nodes" :key="'c'+i" :cx="n.x" :cy="n.y" :r="n.r" :fill="i===0?'#6ad9c4':'#8b8cf7'" style="transition:r .3s;filter:drop-shadow(0 0 6px currentColor)"/></svg><div class="label">thought-graph · grows with usage</div></div></div>`})

// 918 — Confidence aura
const P918 = defineComponent({ setup(){ const c=ref(82); return {c} }, template:`<div class="ai"><div class="stage" style="display:grid;place-items:center"><div style="padding:18px 28px;border-radius:14px;background:#1a1f3a;color:#fff;font-weight:700;animation: ai-aura 2s ease-in-out infinite">"Postgres locks."</div><input type="range" min="0" max="100" v-model.number="c" style="width:160px;margin-top:14px"/><div class="label">confidence aura · {{ c }}%</div></div></div>`})

// 919 — Multi-dimensional dial (radar)
const P919 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center"><svg width="160" height="160" viewBox="0 0 160 160"><polygon v-for="r in 4" :key="r" :points="[...Array(6)].map((_,i)=>{const a=(i*60-90)*Math.PI/180,d=20+r*15;return (80+Math.cos(a)*d)+','+(80+Math.sin(a)*d)}).join(' ')" fill="none" stroke="rgba(255,255,255,.1)"/><polygon points="80,30 130,55 130,105 80,120 35,100 35,55" fill="rgba(139,140,247,.4)" stroke="#8b8cf7" stroke-width="2" style="filter:drop-shadow(0 0 6px #8b8cf7)"/><line x1="80" y1="80" x2="80" y2="20" stroke="#6ad9c4" stroke-width="2" style="transform-origin:80px 80px;animation: ai-orbit 4s linear infinite"/></svg><div class="label">creativity · speed · accuracy · cost · safety · depth</div></div></div>`})

// 920 — Agent fingerprint signature
const P920 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center"><svg width="120" height="120" viewBox="0 0 120 120"><circle v-for="i in 8" :key="i" cx="60" cy="60" :r="10+i*5" fill="none" :stroke="'hsl('+(i*30+200)+',70%,60%)'" stroke-width="1.5" :stroke-dasharray="(20+i*3)+' '+(8+i)" :style="{animation:'ai-orbit '+(2+i*0.5)+'s linear '+(i%2?'infinite reverse':'infinite'),transformOrigin:'60px 60px'}"/></svg><div class="label">"Aiden-7B-v3" · unique signature</div></div></div>`})

// ── AR-specific shared styles ───────────────────────────────────────────────
injectCss('ai-ar', `
.ai .ar-cam   { background: radial-gradient(ellipse at center, #1a3050 0%, #0a1530 60%, #050811 100%); }
.ai .ar-cam::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%); pointer-events:none; }
.ai .ar-rect  { position:absolute; border:1.5px solid #6ad9c4; border-radius:4px; box-shadow: inset 0 0 8px rgba(106,217,196,.3), 0 0 8px rgba(106,217,196,.4); }
.ai .ar-rect::before, .ai .ar-rect::after { content:''; position:absolute; width:8px; height:8px; border:2px solid #6ad9c4; }
.ai .ar-rect::before { left:-2px; top:-2px; border-right:none; border-bottom:none; }
.ai .ar-rect::after  { right:-2px; bottom:-2px; border-left:none; border-top:none; }
.ai .ar-tag   { position:absolute; background: rgba(0,0,0,0.7); color:#6ad9c4; font-family: var(--mono); font-size:9px; padding:2px 6px; border-radius:4px; backdrop-filter: blur(4px); border:1px solid rgba(106,217,196,.4); white-space:nowrap; }
@keyframes ar-scan-y { from { top:-2px } to { top:100% } }
@keyframes ar-grid-pan { to { background-position: 30px 30px } }
@keyframes ar-portal { 0%,100% { transform:scale(1); filter:hue-rotate(0deg)} 50%{transform:scale(1.04); filter:hue-rotate(40deg) } }
@keyframes ar-arrow-pulse { 0%,100% { transform:translateZ(0); opacity:.7} 50%{transform:translateZ(20px); opacity:1 } }
`)

// 921 — AR object detection labels
const P921 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><div class="ar-rect" style="left:18%;top:30%;width:28%;height:36%"></div><div class="ar-tag" style="left:18%;top:22%">☕ mug · 0.94</div><div class="ar-rect" style="left:60%;top:40%;width:24%;height:28%"></div><div class="ar-tag" style="left:60%;top:32%">📱 phone · 0.88</div><div class="ar-rect" style="left:30%;top:72%;width:50%;height:14%"></div><div class="ar-tag" style="left:30%;top:64%">📒 notebook · 0.81</div><div class="label">AR · object detection</div></div></div>`})

// 922 — AR holographic companion
const P922 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center"><div style="position:relative;width:80px;height:130px"><div style="position:absolute;left:25%;top:0;width:50%;height:36%;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(255,255,255,.6),rgba(139,140,247,.4) 60%,transparent);box-shadow:0 0 24px #8b8cf7;animation: ai-pulse 3s ease-in-out infinite"></div><div style="position:absolute;left:15%;top:32%;width:70%;height:50%;background:linear-gradient(180deg,rgba(139,140,247,.5),transparent 80%);border-radius:50% 50% 30% 30%;filter:blur(.6px)"></div><div style="position:absolute;left:30%;bottom:0;width:40%;height:8px;background:radial-gradient(ellipse,rgba(106,217,196,.6),transparent 70%);border-radius:50%"></div></div><div class="label">holo companion · standing in your room</div></div></div>`})

// 923 — AR live translation overlay
const P923 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><div style="position:absolute;left:14%;top:30%;color:rgba(255,255,255,.4);font-size:14px;font-weight:700;text-decoration:line-through;letter-spacing:1px">CAFÉ OUVERT</div><div style="position:absolute;left:14%;top:46%;color:#6ad9c4;font-size:18px;font-weight:800;letter-spacing:1px;text-shadow:0 0 12px #6ad9c4">CAFÉ OPEN</div><div style="position:absolute;left:14%;top:62%" class="ar-tag">FR → EN · 0.97</div><div class="label">AR · in-place translation</div></div></div>`})

// 924 — AR depth-scan mesh sweep
const P924 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="overflow:hidden"><div style="position:absolute;inset:0;background-image: linear-gradient(rgba(106,217,196,.25) 1px,transparent 1px), linear-gradient(90deg, rgba(106,217,196,.25) 1px,transparent 1px); background-size:18px 18px; transform:perspective(300px) rotateX(45deg); transform-origin: 50% 80%; animation: ar-grid-pan 1.6s linear infinite"></div><div style="position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#6ad9c4,transparent);box-shadow:0 0 12px #6ad9c4;animation: ar-scan-y 2s linear infinite"></div><div class="ar-tag" style="left:10px;top:10px">scanning · 67%</div><div class="label">AR · room mesh acquisition</div></div></div>`})

// 925 — AR plane detection (floor highlight)
const P925 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="overflow:hidden"><div style="position:absolute;left:-20%;right:-20%;bottom:0;height:50%;background-image: linear-gradient(rgba(245,193,97,.5) 1px,transparent 1px), linear-gradient(90deg, rgba(245,193,97,.5) 1px,transparent 1px); background-size:24px 24px; transform:perspective(280px) rotateX(60deg); transform-origin: 50% 100%; opacity:.85"></div><div class="ar-tag" style="left:50%;top:48%;transform:translateX(-50%);background:rgba(245,193,97,0.18);color:#f5c161;border-color:rgba(245,193,97,.5)">FLOOR PLANE · 4.2㎡</div><div class="label">AR · plane detected</div></div></div>`})

// 926 — AR ghost furniture preview
const P926 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><div style="position:absolute;left:30%;top:35%;width:40%;height:45%;background:linear-gradient(180deg, rgba(139,140,247,.45),rgba(139,140,247,.15));border:1px dashed rgba(139,140,247,.7);border-radius:6px;box-shadow:0 0 20px rgba(139,140,247,.4); display:grid; place-items:center; color:rgba(255,255,255,.7); font-size:10px; font-family: var(--mono)">SOFA · placing…</div><div class="ar-tag" style="left:32%;top:30%">tap floor to place</div><div class="label">AR · ghost preview before commit</div></div></div>`})

// 927 — AR mini-map HUD radar
const P927 = defineComponent({ setup(){ const a=ref(0); useInterval(()=>a.value=(a.value+8)%360,80); return {a} }, template:`<div class="ai"><div class="stage ar-cam"><div class="ar-tag" style="left:50%;top:46%;transform:translate(-50%,-50%);font-size:11px;color:#fff;border-color:rgba(255,255,255,.3)">looking at: meeting room</div><div style="position:absolute;right:10px;top:10px;width:80px;height:80px;border-radius:50%;background:rgba(0,20,40,.7);border:1px solid rgba(106,217,196,.5);overflow:hidden;backdrop-filter:blur(4px)"><div style="position:absolute;left:50%;top:50%;width:50%;height:1px;background:linear-gradient(90deg,#6ad9c4,transparent);transform-origin:0 0" :style="{transform:'translate(0,0) rotate('+a+'deg)'}"></div><div style="position:absolute;left:50%;top:50%;width:6px;height:6px;background:#6ad9c4;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 6px #6ad9c4"></div><div v-for="(p,i) in [{x:30,y:20,c:'#f5c161'},{x:65,y:55,c:'#f17d6d'},{x:25,y:62,c:'#6ad9c4'}]" :key="i" :style="{position:'absolute',left:p.x+'%',top:p.y+'%',width:'5px',height:'5px',borderRadius:'50%',background:p.c,boxShadow:'0 0 4px '+p.c}"></div></div><div class="ar-tag" style="right:10px;top:96px">3 agents nearby</div><div class="label">AR · mini-map HUD</div></div></div>`})

// 928 — AR floor navigation arrow
const P928 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="overflow:hidden"><div style="position:absolute;left:-20%;right:-20%;bottom:0;height:60%;background-image: linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px); background-size:auto 30px; transform:perspective(260px) rotateX(60deg); transform-origin: 50% 100%"></div><svg width="100%" height="100%" viewBox="0 0 240 160" style="position:absolute;inset:0"><g transform="translate(120 130) rotate(-12)"><polygon points="0,-50 -28,15 -10,15 -10,40 10,40 10,15 28,15" fill="#6ad9c4" style="filter: drop-shadow(0 0 12px #6ad9c4); animation: ai-pulse 1.4s ease-in-out infinite"/></g></svg><div class="ar-tag" style="left:50%;top:14%;transform:translateX(-50%)">↑ Conf room · 12 m</div><div class="label">AR · floor wayfinding</div></div></div>`})

// 929 — AR portal door
const P929 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center"><div style="position:relative;width:100px;height:140px;border-radius:50% 50% 0 0 / 30% 30% 0 0;background: radial-gradient(ellipse at 50% 30%, #ff8af0, #8b8cf7 50%, #1a0a3a 100%); box-shadow: 0 0 32px rgba(139,140,247,.6); animation: ar-portal 3s ease-in-out infinite; overflow:hidden"><div style="position:absolute;inset:6px;border-radius:50% 50% 0 0 / 30% 30% 0 0;background: radial-gradient(ellipse at 50% 30%, #fff 0%, transparent 30%), radial-gradient(ellipse at 50% 60%, transparent 60%, rgba(0,0,0,.4));"></div></div><div class="ar-tag" style="bottom:14px">step through · enter agent\\'s memory palace</div><div class="label">AR · portal to virtual space</div></div></div>`})

// 930 — AR gesture trail (hand draw in air)
const P930 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="overflow:hidden"><svg width="100%" height="100%" viewBox="0 0 240 160" style="position:absolute;inset:0"><path d="M30 130 Q 60 40 120 80 T 210 50" fill="none" stroke="url(#trail-grad)" stroke-width="6" stroke-linecap="round" stroke-dasharray="400" stroke-dashoffset="0" style="filter: drop-shadow(0 0 8px #ff8af0)"><animate attributeName="stroke-dashoffset" from="400" to="0" dur="2.2s" repeatCount="indefinite"/></path><defs><linearGradient id="trail-grad" x1="0" x2="1"><stop offset="0%" stop-color="#ff8af0"/><stop offset="50%" stop-color="#8b8cf7"/><stop offset="100%" stop-color="#6ad9c4"/></linearGradient></defs><circle cx="210" cy="50" r="6" fill="#6ad9c4" style="filter:drop-shadow(0 0 8px #6ad9c4)"/></svg><div class="ar-tag" style="left:10px;bottom:10px">✋ drawing in mid-air</div><div class="label">AR · gesture trail</div></div></div>`})

// ── 20 more imagined / dimensional patterns ─────────────────────────────────
injectCss('ai-more', `
@keyframes ai-helix-l { 0%,100% { transform: translateX(-12px) } 50% { transform: translateX(12px) } }
@keyframes ai-helix-r { 0%,100% { transform: translateX(12px) }  50% { transform: translateX(-12px) } }
@keyframes ai-grow-tree { 0%{transform:scaleY(0)} 100%{transform:scaleY(1)} }
@keyframes ai-ripple-out { 0%{ transform:scale(0); opacity:0.9 } 100%{ transform:scale(4); opacity:0 } }
@keyframes ai-aurora-band { 0%,100% { transform:translateX(-20%) } 50% { transform:translateX(20%) } }
@keyframes ai-breath { 0%,100% { transform:scale(1) } 50% { transform:scale(1.06) } }
@keyframes ai-flicker { 50% { opacity:.4 } }
@keyframes ai-walk-z   { 0%,100%{ transform: perspective(280px) rotateX(28deg) translateZ(0)} 50%{transform: perspective(280px) rotateX(28deg) translateZ(40px) } }
@keyframes ai-cocoon   { 0%{ filter: blur(0); transform:rotate(0)} 50%{filter:blur(6px); transform:rotate(180deg)} 100%{filter:blur(0); transform:rotate(360deg) } }
`)

// 931 — Synesthetic mood orb
const P931 = defineComponent({ setup(){ const t=ref(0); useInterval(()=>t.value=(t.value+5)%360,80); return {t} }, template:`<div class="ai"><div class="stage" style="display:grid;place-items:center"><div :style="{width:'90px',height:'90px',borderRadius:'50%',background:'conic-gradient(from '+t+'deg, #ff8af0,#8b8cf7,#6ad9c4,#f5c161,#ff8af0)',filter:'blur(2px) hue-rotate('+t+'deg)',animation:'ai-breath 3s ease-in-out infinite',boxShadow:'0 0 30px rgba(255,255,255,.3)'}"></div><div class="label">synesthesia · tone → color</div></div></div>`})

// 932 — Conversation DNA helix
const P932 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center"><svg width="100" height="160" viewBox="0 0 100 160"><g v-for="i in 14" :key="i"><circle :cx="50+Math.sin(i*0.6)*28" :cy="i*11" r="4" fill="#8b8cf7" style="filter:drop-shadow(0 0 4px #8b8cf7)"/><circle :cx="50-Math.sin(i*0.6)*28" :cy="i*11" r="4" fill="#6ad9c4" style="filter:drop-shadow(0 0 4px #6ad9c4)"/><line :x1="50+Math.sin(i*0.6)*28" :y1="i*11" :x2="50-Math.sin(i*0.6)*28" :y2="i*11" stroke="rgba(255,255,255,.15)"/></g></svg><div class="label">conversation DNA · you ↔ AI</div></div></div>`})

// 933 — Quantum superposition answer
const P933 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center;background:#0a0b14"><div style="position:relative;width:200px;height:60px"><div v-for="(t,i) in [['Postgres locks','#8b8cf7',0],['Mutex per user','#6ad9c4',1],['CAS lock-free','#f5c161',2]]" :key="i" :style="{position:'absolute',inset:0,display:'grid',placeItems:'center',color:t[1],fontWeight:700,opacity:0.55,animation:'ai-flicker 2.4s ease-in-out infinite',animationDelay:(t[2]*0.4)+'s',textShadow:'0 0 6px '+t[1]}">"{{ t[0] }}"</div></div><div class="label">superposition · 3 answers, observed once</div></div></div>`})

// 934 — Cognitive depth meter
const P934 = defineComponent({ setup(){ const d=ref(8); useInterval(()=>d.value=2+Math.floor(Math.random()*8),900); return {d} }, template:`<div class="ai"><div class="stage" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px"><div style="font-family:var(--mono);color:#6ad9c4;font-size:11px">depth = {{ d }}</div><div style="display:flex;flex-direction:column;gap:2px"><div v-for="i in 10" :key="i" :style="{width:(140-i*8)+'px',height:'5px',borderRadius:'3px',background:i<=d?'linear-gradient(90deg,#6ad9c4,#8b8cf7)':'rgba(255,255,255,.06)',transition:'all .3s',boxShadow:i===d?'0 0 8px #6ad9c4':'none'}"/></div><div class="label">cognitive depth · sub-symbol layers</div></div></div>`})

// 935 — Idea seed → tree growth
const P935 = defineComponent({ setup(){ const g=ref(0); useInterval(()=>g.value=(g.value+1)%4,1500); return {g} }, template:`<div class="ai"><div class="stage" style="display:grid;place-items:end;background:linear-gradient(180deg,#0a0b14,#1a3050)"><svg width="160" height="140" viewBox="0 0 160 140"><line x1="80" y1="140" x2="80" y2="80" stroke="#7d6d3a" stroke-width="3"/><circle v-if="g>=1" cx="80" cy="80" r="14" fill="#6ad9c4" style="animation: ai-pulse 2s ease-in-out infinite"/><circle v-if="g>=2" cx="60" cy="60" r="10" fill="#a4f06d"/><circle v-if="g>=2" cx="100" cy="60" r="10" fill="#a4f06d"/><circle v-if="g>=3" cx="50" cy="40" r="8" fill="#f5c161"/><circle v-if="g>=3" cx="80" cy="30" r="9" fill="#f5c161"/><circle v-if="g>=3" cx="110" cy="40" r="8" fill="#f5c161"/></svg><div class="label">idea seed → branch → bloom</div></div></div>`})

// 936 — Persona cocoon morph
const P936 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center"><div style="width:80px;height:80px;background:radial-gradient(circle at 35% 35%,#fff,#ff8af0 30%,#8b8cf7 70%,transparent);border-radius:50%;animation: ai-cocoon 4s ease-in-out infinite;box-shadow:0 0 24px #ff8af0"></div><div class="label">persona morph · cocoon → form</div></div></div>`})

// 937 — Knowledge constellation map
const P937 = defineComponent({ setup(){ const stars=Array.from({length:24},()=>({x:Math.random()*220+10,y:Math.random()*140+10,r:1+Math.random()*2.5,b:Math.random()*1+0.4})); const major=[{x:60,y:50,t:'AI'},{x:160,y:40,t:'Vue'},{x:120,y:110,t:'UX'}]; return {stars,major} }, template:`<div class="ai"><div class="stage" style="background:radial-gradient(ellipse at center,#1a1f3a,#040611)"><svg width="240" height="160" viewBox="0 0 240 160"><line x1="60" y1="50" x2="160" y2="40" stroke="rgba(106,217,196,.3)"/><line x1="60" y1="50" x2="120" y2="110" stroke="rgba(106,217,196,.3)"/><line x1="160" y1="40" x2="120" y2="110" stroke="rgba(106,217,196,.3)"/><circle v-for="(s,i) in stars" :key="i" :cx="s.x" :cy="s.y" :r="s.r" fill="#fff" :opacity="s.b" style="animation: ai-twinkle 3s ease-in-out infinite"/><g v-for="(m,i) in major" :key="'m'+i"><circle :cx="m.x" :cy="m.y" r="6" fill="#6ad9c4" style="filter:drop-shadow(0 0 8px #6ad9c4)"/><text :x="m.x+10" :y="m.y+4" font-size="10" fill="#6ad9c4">{{ m.t }}</text></g></svg><div class="label">knowledge constellation</div></div></div>`})

// 938 — Thought ripple pond
const P938 = defineComponent({ template:`<div class="ai"><div class="stage" style="background:radial-gradient(ellipse at center,#0e3050,#040611);display:grid;place-items:center"><div v-for="i in 4" :key="i" :style="{position:'absolute',left:'50%',top:'50%',width:'30px',height:'30px',borderRadius:'50%',border:'2px solid #6ad9c4',transform:'translate(-50%,-50%)',animation:'ai-ripple-out 3s ease-out infinite',animationDelay:(i*0.7)+'s'}"></div><div style="position:relative;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 12px #6ad9c4"></div><div class="label">thought drops, ideas ripple out</div></div></div>`})

// 939 — Mind palace 3D walk (first-person corridor)
const P939 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center;perspective:200px;background:linear-gradient(180deg,#040611 0%,#1a0a3a 100%)"><div style="position:relative;width:200px;height:140px;transform-style:preserve-3d;animation: ai-walk-z 5s ease-in-out infinite"><div v-for="i in 6" :key="i" :style="{position:'absolute',left:'50%',top:'50%',width:(160-i*20)+'px',height:(110-i*14)+'px',border:'1px solid hsl('+(280+i*10)+',60%,'+(70-i*8)+'%)',borderRadius:'4px',transform:'translate(-50%,-50%) translateZ('+(-i*30)+'px)',boxShadow:'0 0 12px hsl('+(280+i*10)+',60%,50%,.5)'}"></div></div><div class="label">memory palace · first-person walk</div></div></div>`})

// 940 — Soul gem facets
const P940 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center;background:radial-gradient(circle at center,#1a0a3a,#040611)"><svg width="120" height="120" viewBox="0 0 120 120" style="filter: drop-shadow(0 0 16px #ff8af0); animation: ai-orbit 8s linear infinite;transform-origin:60px 60px"><polygon points="60,10 100,40 100,80 60,110 20,80 20,40" fill="url(#gem-grad)" stroke="#fff" stroke-width="0.5" opacity="0.85"/><polygon points="60,10 60,110 20,40" fill="rgba(255,255,255,.2)"/><polygon points="60,10 100,40 60,60" fill="rgba(255,255,255,.35)"/><defs><linearGradient id="gem-grad" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#ff8af0"/><stop offset="50%" stop-color="#8b8cf7"/><stop offset="100%" stop-color="#6ad9c4"/></linearGradient></defs></svg><div class="label">soul gem · core intent crystallised</div></div></div>`})

// 941 — Whisper / loud mode toggle
const P941 = defineComponent({ setup(){ const w=ref(true); return {w} }, template:`<div class="ai"><div class="stage" style="display:grid;place-items:center;background:#0a0b14"><div :style="{transition:'all .6s', filter: w?'brightness(0.5)':'brightness(1)', fontSize: w?'12px':'24px',color:'#fff',fontWeight: w?'400':'700',letterSpacing: w?'2px':'0'}">{{ w?'…intimate whisper…':'BOLD STATEMENT' }}</div><div class="label">whisper ↔ amplify mode</div><button class="mini" @click="w=!w" style="position:absolute;bottom:24px;right:8px">{{ w?'🔇':'🔊' }}</button></div></div>`})

// 942 — Echo chamber mirror
const P942 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;grid-template-columns:1fr 1fr"><div style="background:linear-gradient(135deg,#0a0b14,#1a3050);display:grid;place-items:center;color:#6ad9c4;font-weight:700">YES</div><div style="background:linear-gradient(135deg,#1a3050,#0a0b14);display:grid;place-items:center;color:#f17d6d;font-weight:700;transform:scaleX(-1)">YES</div><div class="label">echo chamber detected · 2 sources, 1 view</div></div></div>`})

// 943 — Crystal ball next-action preview
const P943 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center;background:radial-gradient(circle at center,#1a0a3a,#040611)"><div style="position:relative;width:100px;height:100px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#a4d9f6 30%,#3a64f1 70%,#1a0a3a);box-shadow:0 0 32px rgba(106,217,196,.5),inset -8px -10px 20px rgba(0,0,0,.4)"><div style="position:absolute;left:50%;top:55%;transform:translate(-50%,-50%);font-size:10px;color:#fff;text-align:center;text-shadow:0 0 4px #6ad9c4">next ↓<br><b>open file</b></div></div><div class="label">crystal ball · predicted next-action</div></div></div>`})

// 944 — Ghost typing partner
const P944 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center"><div style="position:relative;font-family:var(--mono);font-size:14px"><div style="color:#fff">I want to refactor the<span class="caret"/></div><div style="position:absolute;top:0;left:0;color:rgba(106,217,196,.5);font-style:italic">I want to refactor the auth flow first</div></div><div class="label">ghost partner · types alongside you</div></div></div>`})

// 945 — Cognitive aurora ribbon
const P945 = defineComponent({ template:`<div class="ai"><div class="stage" style="background:#040611;overflow:hidden"><div style="position:absolute;left:-30%;right:-30%;top:30%;height:60%;background:linear-gradient(180deg, transparent, rgba(106,217,196,.4) 30%, rgba(139,140,247,.4) 50%, rgba(255,138,240,.4) 70%, transparent);filter: blur(8px); animation: ai-aurora-band 6s ease-in-out infinite"></div><div style="position:absolute;left:-30%;right:-30%;top:36%;height:48%;background:linear-gradient(180deg, transparent, rgba(165,240,109,.3), transparent);filter: blur(10px); animation: ai-aurora-band 8s ease-in-out infinite reverse"></div><div class="label">cognitive aurora · model state weather</div></div></div>`})

// 946 — AI shadow / silhouette projection
const P946 = defineComponent({ template:`<div class="ai"><div class="stage" style="background:radial-gradient(ellipse at 30% 30%,#f5c161,#7d3a1f 60%,#1a0a14);display:grid;place-items:end"><svg width="160" height="140" viewBox="0 0 160 140" style="margin:auto"><ellipse cx="80" cy="135" rx="60" ry="6" fill="rgba(0,0,0,.3)"/><path d="M70 50 Q 60 30 80 30 Q 100 30 90 50 L 90 80 L 110 130 L 50 130 L 70 80 Z" fill="rgba(0,0,0,.7)" style="animation: ai-breath 3s ease-in-out infinite;transform-origin:80px 130px"/></svg><div class="label">your AI shadow · always with you</div></div></div>`})

// 947 — Wisdom tree-rings
const P947 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center;background:radial-gradient(circle at center,#3a2010,#1a0a04)"><svg width="120" height="120" viewBox="0 0 120 120"><circle v-for="i in 8" :key="i" cx="60" cy="60" :r="8+i*7" fill="none" :stroke="'hsl('+(30+i*5)+',60%,'+(50-i*3)+'%)'" :stroke-width="i%2?1.5:2.5" :opacity="0.9-i*0.05"/></svg><div class="label">wisdom rings · era 8 · 2024–today</div></div></div>`})

// 948 — Living wallpaper persona
const P948 = defineComponent({ setup(){ const t=ref(0); useInterval(()=>t.value=(t.value+1)%360,80); return {t} }, template:`<div class="ai"><div class="stage" :style="{background:'conic-gradient(from '+t+'deg,#1a0a3a,#0e3050,#1a3050,#0a0b14,#1a0a3a)',transition:'background 1s'}"></div><div class="label">wallpaper · breathes with persona</div></div>`})

// 949 — Inner voice ghost text behind reply
const P949 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center;padding:20px"><div style="position:relative"><div style="position:absolute;inset:0;color:rgba(139,140,247,.3);font-size:11px;font-style:italic;line-height:1.4;transform:translateY(-8px);font-family:var(--mono)">…actually I'm not 100% sure on this, the spec is ambiguous…</div><div style="position:relative;color:#fff;font-weight:600;background:rgba(0,0,0,.4);padding:8px 12px;border-radius:8px">"Use Postgres advisory locks."</div></div><div class="label">inner monologue · peeks behind the answer</div></div></div>`})

// 950 — Time-dilated chat (importance sizing)
const P950 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:14px"><div style="font-size:9px;color:rgba(255,255,255,.4)">"morning"</div><div style="font-size:11px;color:rgba(255,255,255,.6)">"got it"</div><div style="font-size:22px;color:#6ad9c4;font-weight:800;text-shadow:0 0 12px #6ad9c4">"⚠ DEPLOY FAILED"</div><div style="font-size:11px;color:rgba(255,255,255,.6)">"on it"</div><div style="font-size:9px;color:rgba(255,255,255,.4)">"thx"</div><div class="label">importance · physical scale</div></div></div>`})

// ── 30 AR/VR controls (imagined) ────────────────────────────────────────────
injectCss('ai-arvr', `
.ai .vr-room { background: radial-gradient(ellipse at center, #0e3050 0%, #060a18 100%); }
.ai .vr-room::after { content:''; position:absolute; inset:0; background-image: linear-gradient(rgba(106,217,196,.08) 1px,transparent 1px), linear-gradient(90deg, rgba(106,217,196,.08) 1px,transparent 1px); background-size:14px 14px; pointer-events:none; }
.ai .vr-vignette { position:absolute; inset:0; background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%); pointer-events:none; }
.ai .vr-tag    { position:absolute; background: rgba(0,0,0,0.65); color:#a4f06d; font-family: var(--mono); font-size:9px; padding:2px 6px; border-radius:4px; border:1px solid rgba(164,240,109,.4); white-space:nowrap; }
.ai .vr-curved { background: linear-gradient(180deg, rgba(139,140,247,.3), rgba(139,140,247,.05)); border:1px solid rgba(139,140,247,.5); border-radius:50% / 30%; }
@keyframes ai-laser-flick { 0%,100% { opacity:1 } 50% { opacity:.7 } }
@keyframes ai-tele-bob   { 0%,100% { transform: translateY(-4px) } 50% { transform: translateY(4px) } }
@keyframes ai-portal-swirl { to { transform: rotate(360deg) } }
@keyframes ai-rain-fall { from { transform: translateY(-30px) } to { transform: translateY(180px) } }
@keyframes ai-ar-snap { 0%,100% { transform: translate(0,0) } 50% { transform: translate(2px,-2px) } }
`)

// 951 — VR laser ray pointer
const P951 = defineComponent({ template:`<div class="ai"><div class="stage vr-room"><svg width="100%" height="100%" viewBox="0 0 240 160" style="position:absolute;inset:0"><line x1="40" y1="130" x2="180" y2="50" stroke="#ff8af0" stroke-width="2" style="filter: drop-shadow(0 0 6px #ff8af0); animation: ai-laser-flick 1.4s ease-in-out infinite"/><circle cx="180" cy="50" r="8" fill="none" stroke="#ff8af0" stroke-width="2" style="filter: drop-shadow(0 0 6px #ff8af0)"/><circle cx="180" cy="50" r="3" fill="#ff8af0"/><rect x="30" y="125" width="20" height="10" rx="3" fill="rgba(139,140,247,.7)" stroke="#8b8cf7"/></svg><div class="vr-tag" style="left:140px;top:30px">target locked</div><div class="label">VR · laser ray pointer</div></div></div>`})

// 952 — VR teleport target ring
const P952 = defineComponent({ template:`<div class="ai"><div class="stage vr-room"><svg width="100%" height="100%" viewBox="0 0 240 160" style="position:absolute;inset:0"><path d="M50 130 Q 90 30 150 90" fill="none" stroke="#6ad9c4" stroke-width="2" stroke-dasharray="4 4" style="filter: drop-shadow(0 0 4px #6ad9c4)"/><ellipse cx="150" cy="92" rx="32" ry="10" fill="rgba(106,217,196,.25)" stroke="#6ad9c4" stroke-width="2" style="filter: drop-shadow(0 0 8px #6ad9c4); animation: ai-tele-bob 1.6s ease-in-out infinite"/><circle cx="150" cy="92" r="3" fill="#fff"/></svg><div class="vr-tag" style="left:120px;top:65px">▼ teleport here</div><div class="label">VR · teleport target ring</div></div></div>`})

// 953 — VR controller ghost hands
const P953 = defineComponent({ template:`<div class="ai"><div class="stage vr-room" style="display:grid;place-items:center"><svg width="200" height="120" viewBox="0 0 200 120"><g transform="translate(40 30)" fill="rgba(139,140,247,.5)" stroke="#8b8cf7" style="filter: drop-shadow(0 0 6px #8b8cf7)"><rect x="0" y="20" width="14" height="40" rx="3"/><rect x="-4" y="0" width="6" height="22" rx="2"/><rect x="3" y="-3" width="6" height="25" rx="2"/><rect x="10" y="0" width="6" height="22" rx="2"/><rect x="17" y="6" width="6" height="18" rx="2"/></g><g transform="translate(120 30)" fill="rgba(106,217,196,.5)" stroke="#6ad9c4" style="filter: drop-shadow(0 0 6px #6ad9c4)"><rect x="0" y="20" width="14" height="40" rx="3"/><rect x="17" y="0" width="6" height="22" rx="2"/><rect x="10" y="-3" width="6" height="25" rx="2"/><rect x="3" y="0" width="6" height="22" rx="2"/><rect x="-4" y="6" width="6" height="18" rx="2"/></g></svg><div class="label">VR · ghost hands · pose tracking</div></div></div>`})

// 954 — VR floor-anchored menu palette
const P954 = defineComponent({ template:`<div class="ai"><div class="stage vr-room"><div style="position:absolute;left:50%;bottom:14px;transform:translateX(-50%) perspective(200px) rotateX(60deg);transform-origin:50% 100%;width:160px;display:flex;gap:6px;background:rgba(0,0,0,.6);padding:6px;border-radius:8px;border:1px solid rgba(139,140,247,.5);box-shadow:0 0 24px rgba(139,140,247,.4)"><button class="mini" style="background:#8b8cf7;color:#0b0c14">＋</button><button class="mini">📷</button><button class="mini">🎙</button><button class="mini">⚙</button></div><div class="label">VR · floor-anchored radial palette</div></div></div>`})

// 955 — VR curved bezel menu
const P955 = defineComponent({ template:`<div class="ai"><div class="stage vr-room" style="display:grid;place-items:center"><svg width="200" height="120" viewBox="0 0 200 120"><path d="M30 90 Q 100 30 170 90" fill="rgba(139,140,247,.18)" stroke="#8b8cf7" stroke-width="1.5" style="filter: drop-shadow(0 0 6px #8b8cf7)"/><g v-for="(t,i) in ['Chat','Tools','Memory','Tasks','⚙']" :key="i"><circle :cx="30+i*35" :cy="90-Math.sin((i*35+30)/40)*30" r="14" fill="rgba(0,0,0,.5)" stroke="#8b8cf7"/><text :x="30+i*35" :y="94-Math.sin((i*35+30)/40)*30" font-size="9" text-anchor="middle" fill="#fff">{{ t }}</text></g></svg><div class="label">VR · curved bezel menu</div></div></div>`})

// 956 — VR thumbstick scroll wheel
const P956 = defineComponent({ setup(){ const a=ref(0); useInterval(()=>a.value=(a.value+12)%360,80); return {a} }, template:`<div class="ai"><div class="stage vr-room" style="display:grid;place-items:center"><div style="position:relative;width:90px;height:90px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#a4d9f6,#3a64f1 60%,#1a0a3a);box-shadow:0 0 20px rgba(58,100,241,.6)"><div :style="{position:'absolute',left:'50%',top:'10%',width:'4px',height:'14px',background:'#fff',transform:'translateX(-50%) rotate('+a+'deg)',transformOrigin:'2px 35px'}"></div></div><div class="vr-tag" style="bottom:14px">scroll wheel · ↻ pages</div><div class="label">VR · thumbstick scroll</div></div></div>`})

// 957 — VR finger pinch detect
const P957 = defineComponent({ template:`<div class="ai"><div class="stage vr-room" style="display:grid;place-items:center"><svg width="180" height="120" viewBox="0 0 180 120"><g style="filter: drop-shadow(0 0 6px #6ad9c4)"><circle cx="80" cy="60" r="14" fill="rgba(106,217,196,.4)" stroke="#6ad9c4" stroke-width="2"/><circle cx="100" cy="60" r="14" fill="rgba(106,217,196,.4)" stroke="#6ad9c4" stroke-width="2"/><line x1="90" y1="60" x2="90" y2="60" stroke="#fff" stroke-width="3"/></g><circle cx="90" cy="60" r="4" fill="#fff" style="animation: ai-pulse 1s ease-in-out infinite"/></svg><div class="vr-tag" style="bottom:14px">pinch detected · select</div><div class="label">VR · finger pinch gesture</div></div></div>`})

// 958 — VR comfort vignette tunnel
const P958 = defineComponent({ template:`<div class="ai"><div class="stage vr-room"><div style="position:absolute;inset:0;background:repeating-linear-gradient(45deg,#1f2740 0 10px,#0a0b14 10px 20px);transform:perspective(200px) rotateX(40deg);transform-origin:50% 100%"></div><div class="vr-vignette"></div><div class="vr-tag" style="left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,.6);color:#fff">comfort · narrow FOV during motion</div><div class="label">VR · vignette while moving</div></div></div>`})

// 959 — VR chaperone room boundary
const P959 = defineComponent({ template:`<div class="ai"><div class="stage vr-room"><div style="position:absolute;inset:14px;border:2px solid rgba(106,217,196,.6);border-radius:8px;background:repeating-linear-gradient(45deg,transparent 0 8px,rgba(106,217,196,.15) 8px 10px);box-shadow:inset 0 0 20px rgba(106,217,196,.3)"></div><div class="vr-tag" style="left:50%;top:14px;transform:translateX(-50%)">⚠ approaching boundary</div><div class="label">VR · chaperone safety grid</div></div></div>`})

// 960 — VR object grab outline
const P960 = defineComponent({ template:`<div class="ai"><div class="stage vr-room" style="display:grid;place-items:center"><div style="position:relative;width:80px;height:80px;background:linear-gradient(135deg,#7d6df1,#3a64f1);border-radius:8px;box-shadow:0 0 0 3px #6ad9c4, 0 0 20px #6ad9c4;animation: ai-pulse 1.4s ease-in-out infinite"></div><div class="vr-tag" style="bottom:14px">grab · trigger held</div><div class="label">VR · grab highlight</div></div></div>`})

// 961 — VR throw arc trajectory
const P961 = defineComponent({ template:`<div class="ai"><div class="stage vr-room"><svg width="100%" height="100%" viewBox="0 0 240 160" style="position:absolute;inset:0"><path d="M40 130 Q 120 -10 200 130" fill="none" stroke="#f5c161" stroke-width="2" stroke-dasharray="4 4" style="filter: drop-shadow(0 0 4px #f5c161)"/><circle v-for="(t,i) in [0.1,0.3,0.5,0.7,0.9]" :key="i" :cx="40+t*160" :cy="130-Math.sin(t*Math.PI)*140" r="3" fill="#f5c161"/><rect x="30" y="125" width="20" height="10" rx="3" fill="rgba(139,140,247,.6)" stroke="#8b8cf7"/></svg><div class="label">VR · physics throw arc</div></div></div>`})

// 962 — VR hand pose recognition
const P962 = defineComponent({ template:`<div class="ai"><div class="stage vr-room" style="display:grid;place-items:center"><div style="font-size:48px;filter:drop-shadow(0 0 8px #6ad9c4)">✊</div><div class="vr-tag" style="bottom:14px">pose: ROCK · grab</div><div class="label">VR · hand pose recogniser</div></div></div>`})

// 963 — VR swap-hand menu
const P963 = defineComponent({ template:`<div class="ai"><div class="stage vr-room" style="display:grid;place-items:center"><svg width="200" height="120" viewBox="0 0 200 120"><g transform="translate(60 30)"><rect x="0" y="0" width="80" height="60" rx="6" fill="rgba(0,0,0,.6)" stroke="#8b8cf7"/><text x="40" y="36" font-size="11" text-anchor="middle" fill="#fff">📋 menu</text></g><g transform="translate(40 80)" fill="rgba(139,140,247,.5)" stroke="#8b8cf7"><rect x="0" y="0" width="14" height="20" rx="3"/></g></svg><div class="vr-tag" style="bottom:14px">menu attached to ✋ left wrist</div><div class="label">VR · wrist-anchored menu</div></div></div>`})

// 964 — VR floating keyboard
const P964 = defineComponent({ template:`<div class="ai"><div class="stage vr-room"><div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) perspective(220px) rotateX(20deg);width:180px;background:rgba(0,0,0,.6);padding:6px;border-radius:6px;border:1px solid rgba(139,140,247,.5);box-shadow:0 0 16px rgba(139,140,247,.3)"><div style="display:grid;grid-template-columns:repeat(10,1fr);gap:2px"><div v-for="k in 'qwertyuiopasdfghjklzxcvbnm'.split('')" :key="k" style="aspect-ratio:1;background:rgba(255,255,255,.08);color:#fff;text-align:center;font-size:9px;line-height:14px;border-radius:2px">{{ k }}</div></div></div><div class="label">VR · floating keyboard</div></div></div>`})

// 965 — VR peripheral notification bubble
const P965 = defineComponent({ template:`<div class="ai"><div class="stage vr-room"><div class="vr-vignette"></div><div style="position:absolute;left:14px;top:20px;background:rgba(106,217,196,.85);color:#0b0c14;padding:6px 10px;border-radius:14px;font-size:11px;font-weight:700;box-shadow:0 0 16px rgba(106,217,196,.5);animation: ai-pulse 1.5s ease-in-out infinite">📩 Sun-mi pinged you</div><div class="label">VR · peripheral notification (low-attention)</div></div></div>`})

// 966 — AR picture-in-air phone frame
const P966 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) perspective(280px) rotateY(-12deg);width:90px;height:140px;background:#0a0b14;border:6px solid #2a3148;border-radius:18px;box-shadow:0 0 24px rgba(106,217,196,.4),0 6px 20px rgba(0,0,0,.4)"><div style="position:absolute;inset:6px;background:linear-gradient(180deg,#3a64f1,#7d6df1);border-radius:8px;display:grid;place-items:center;color:#fff;font-size:11px">📞 Aiden</div></div><div class="ar-tag" style="bottom:14px;left:8px">phone projected mid-air</div><div class="label">AR · phone in air</div></div></div>`})

// 967 — AR person identification face tag
const P967 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><div style="position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);width:60px;height:60px;border-radius:50%;background:radial-gradient(circle,#6ad9c4,#3a8bb1);border:2px solid #fff;box-shadow:0 0 16px rgba(255,255,255,.4)"></div><div class="ar-rect" style="left:38%;top:24%;width:24%;height:34%"></div><div class="ar-tag" style="left:38%;top:18%">👤 Sun-mi · 0.96 · last met 3d ago</div><div class="label">AR · face ID + memory recall</div></div></div>`})

// 968 — AR voice cloud emoji bubble
const P968 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center"><div style="background:#fff;color:#0b0c14;padding:10px 16px;border-radius:18px;font-size:14px;font-weight:600;box-shadow:0 0 20px rgba(255,255,255,.4);position:relative;animation: ai-breath 3s ease-in-out infinite">🎉 great work!</div><div class="ar-tag" style="bottom:14px">voice → spatial bubble</div><div class="label">AR · floating speech bubble</div></div></div>`})

// 969 — AR scale-the-world slider (shrink/grow)
const P969 = defineComponent({ setup(){ const s=ref(1); return {s} }, template:`<div class="ai"><div class="stage ar-cam"><div :style="{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%) scale('+s+')',width:'60px',height:'60px',background:'linear-gradient(135deg,#7d6df1,#6ad9c4)',borderRadius:'8px',transition:'transform .2s'}"></div><input type="range" min="0.3" max="2.5" step="0.1" v-model.number="s" style="position:absolute;left:50%;bottom:18px;transform:translateX(-50%);width:140px"/><div class="ar-tag" style="left:8px;top:8px">scale · {{ s.toFixed(1) }}×</div><div class="label">AR · scale-the-world slider</div></div></div>`})

// 970 — AR weather rain in your room
const P970 = defineComponent({ setup(){ const drops=Array.from({length:24},(_,i)=>({x:Math.random()*240,d:(0.5+Math.random()*0.6)+'s',delay:(Math.random()*1.5)+'s'})); return {drops} }, template:`<div class="ai"><div class="stage ar-cam" style="overflow:hidden"><div v-for="(d,i) in drops" :key="i" :style="{position:'absolute',left:d.x+'px',top:'-30px',width:'1.5px',height:'14px',background:'rgba(173,216,230,.7)',animation:'ai-rain-fall '+d.d+' linear infinite',animationDelay:d.delay,boxShadow:'0 0 4px #a4d9f6'}"/><div class="ar-tag" style="left:8px;top:8px">⛈ weather · brought indoors</div><div class="label">AR · ambient weather sim</div></div></div>`})

// 971 — AR time-of-day re-lighting
const P971 = defineComponent({ setup(){ const h=ref(12); return {h} }, template:`<div class="ai"><div class="stage" :style="{background: h<6 ? 'linear-gradient(135deg,#1a0a3a,#040611)' : h<12 ? 'linear-gradient(135deg,#f5c161,#ff8af0)' : h<18 ? 'linear-gradient(135deg,#a4d9f6,#7d6df1)' : 'linear-gradient(135deg,#7d3a1f,#1a0a3a)',transition:'background .4s'}"><div class="ar-tag" style="left:8px;top:8px">⏰ {{ String(h).padStart(2,'0') }}:00 · re-lighting</div></div><input type="range" min="0" max="23" v-model.number="h" style="width:200px"/><div class="label">AR · time-warp room lighting</div></div>`})

// 972 — AR x-ray vision through walls
const P972 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><div style="position:absolute;inset:0;background:repeating-linear-gradient(45deg,rgba(106,217,196,.05) 0 6px,transparent 6px 12px)"></div><div style="position:absolute;left:30%;top:30%;width:40%;height:40%;border:2px dashed rgba(106,217,196,.6);background:rgba(106,217,196,.08);box-shadow:inset 0 0 20px rgba(106,217,196,.3)"></div><div class="ar-tag" style="left:30%;top:24%">📦 BOX · 3.2m behind wall</div><div class="label">AR · x-ray vision overlay</div></div></div>`})

// 973 — AR speech subtitle in space
const P973 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center"><div style="background:rgba(0,0,0,.7);color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:500;backdrop-filter:blur(4px);box-shadow:0 4px 16px rgba(0,0,0,.5)">"the meeting starts at 3pm"</div><div class="ar-tag" style="bottom:14px">speaker @ 2.4m · captioned</div><div class="label">AR · spatial subtitle</div></div></div>`})

// 974 — AR magnetic snap to surface
const P974 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><div style="position:absolute;left:30%;top:50%;width:50px;height:50px;background:linear-gradient(135deg,#f5c161,#f17d6d);border-radius:6px;box-shadow:0 0 16px rgba(245,193,97,.6);animation: ai-ar-snap 0.6s ease-in-out infinite"></div><div style="position:absolute;left:32%;top:53%;width:46px;height:6px;background:rgba(245,193,97,.4);border-radius:3px;filter:blur(2px)"></div><div class="ar-tag" style="left:30%;top:42%">snapped to wall · 90°</div><div class="label">AR · magnetic surface snap</div></div></div>`})

// 975 — AR gravity field visualization
const P975 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center"><svg width="200" height="120" viewBox="0 0 200 120"><g style="opacity:0.6"><path v-for="i in 5" :key="i" :d="'M0 '+(60+(i-3)*15)+' Q 100 '+(60+(i-3)*30)+' 200 '+(60+(i-3)*15)" fill="none" stroke="#6ad9c4" stroke-width="0.6"/></g><circle cx="100" cy="60" r="8" fill="#fff" style="filter:drop-shadow(0 0 6px #fff)"/></svg><div class="label">AR · gravity field around object</div></div></div>`})

// 976 — AR mood environment
const P976 = defineComponent({ setup(){ const m=ref('calm'); const moods={calm:'#6ad9c4',excited:'#ff8af0',focus:'#3a64f1',sad:'#7d6df1'}; return {m,moods} }, template:`<div class="ai"><div class="stage" :style="{background:'radial-gradient(ellipse at 50% 30%,'+moods[m]+',#040611 80%)',transition:'background .8s'}"><div class="ar-tag" style="left:8px;top:8px">mood · {{ m }} → room glow</div></div><div class="row" style="gap:6px"><button v-for="(c,k) in moods" :key="k" class="mini" @click="m=k" :style="{background:m===k?c:'var(--bg-3)',color:m===k?'#0b0c14':null}">{{ k }}</button></div><div class="label">AR · room reflects emotional state</div></div>`})

// 977 — AR shared collab annotation
const P977 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><div style="position:absolute;left:18%;top:30%;color:#6ad9c4;font-weight:700;font-family:'Comic Sans MS',cursive;font-size:14px;text-shadow:0 0 6px #6ad9c4;transform:rotate(-4deg)">↓ broken</div><svg style="position:absolute;left:22%;top:48%" width="80" height="50"><path d="M10 5 Q 30 30 60 30" fill="none" stroke="#6ad9c4" stroke-width="2"/><polygon points="60,30 52,26 52,34" fill="#6ad9c4"/></svg><div style="position:absolute;left:50%;top:65%;color:#f5c161;font-weight:700;font-family:'Comic Sans MS',cursive;font-size:13px;text-shadow:0 0 6px #f5c161;transform:rotate(3deg)">fix me!</div><div class="ar-tag" style="bottom:14px">2 collaborators annotating</div><div class="label">AR · shared spatial sticky-notes</div></div></div>`})

// 978 — AR replay timeline through space
const P978 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><svg width="100%" height="100%" viewBox="0 0 240 160" style="position:absolute;inset:0"><line x1="20" y1="80" x2="220" y2="80" stroke="rgba(106,217,196,.5)" stroke-width="2" stroke-dasharray="4 3"/><circle v-for="(t,i) in [{x:40,c:'#3a8b3a'},{x:90,c:'#6ad9c4'},{x:140,c:'#f5c161'},{x:190,c:'#f17d6d'}]" :key="i" :cx="t.x" cy="80" r="8" :fill="t.c" style="filter:drop-shadow(0 0 4px currentColor)"/><circle cx="140" cy="80" r="14" fill="none" stroke="#fff" stroke-width="2"/></svg><div class="ar-tag" style="left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,.6);color:#fff">replay · 14:02 · 3rd event</div><div class="label">AR · time-scrub through space</div></div></div>`})

// 979 — AR holo-table 3D map (war room)
const P979 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center"><div style="position:relative;width:200px;height:80px;perspective:200px"><div style="position:absolute;inset:0;background-image: linear-gradient(rgba(106,217,196,.4) 1px,transparent 1px), linear-gradient(90deg, rgba(106,217,196,.4) 1px,transparent 1px); background-size:18px 18px; transform:rotateX(60deg); transform-origin:50% 100%; box-shadow:0 0 24px rgba(106,217,196,.4)"></div><div style="position:absolute;left:30%;top:20%;width:14px;height:14px;background:#f17d6d;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 8px #f17d6d"></div><div style="position:absolute;left:60%;top:40%;width:14px;height:14px;background:#6ad9c4;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 8px #6ad9c4"></div><div style="position:absolute;left:80%;top:55%;width:14px;height:14px;background:#f5c161;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 8px #f5c161"></div></div><div class="label">AR · holo-table command map</div></div></div>`})

// 980 — AR distance laser ruler
const P980 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><svg width="100%" height="100%" viewBox="0 0 240 160" style="position:absolute;inset:0"><line x1="40" y1="120" x2="200" y2="40" stroke="#f5c161" stroke-width="2" stroke-dasharray="3 3" style="filter: drop-shadow(0 0 4px #f5c161)"/><circle cx="40" cy="120" r="5" fill="#f5c161"/><circle cx="200" cy="40" r="5" fill="#f5c161"/></svg><div class="ar-tag" style="left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,.7);color:#f5c161;border-color:rgba(245,193,97,.5)">📏 2.42 m</div><div class="label">AR · laser distance ruler</div></div></div>`})

// ── 20 scenario-driven AR/VR + AI patterns ──────────────────────────────────
injectCss('ai-scenario', `
@keyframes ai-fan-in { from { opacity:0; transform: translate(-50%, 0) scale(0.7) } to { opacity:1; transform: translate(-50%, var(--y)) scale(1) } }
@keyframes ai-cone-sweep { 0%,100% { transform: rotate(-20deg) } 50% { transform: rotate(20deg) } }
@keyframes ai-ghost-fade { 0% { opacity:0 } 30% { opacity:1 } 100% { opacity:0 } }
@keyframes ai-step-walk { 0%,100% { opacity:0.2 } 50% { opacity:1 } }
@keyframes ai-orbit-vote { to { transform: rotate(360deg) } }
@keyframes ai-portal-step { from { transform: scale(0.7) translateZ(-100px); opacity:0.3 } to { transform: scale(1) translateZ(0); opacity:1 } }
.ai .scn-tag   { position:absolute; background:rgba(0,0,0,0.7); color:#fff; font-size:10px; padding:2px 8px; border-radius:4px; font-family: var(--mono); border:1px solid rgba(255,255,255,.2); }
.ai .weight-bar { display:inline-block; height:4px; border-radius:2px; background:linear-gradient(90deg,#6ad9c4,#8b8cf7); vertical-align:middle; margin-left:6px; }
`)

// 991 — Suggestion fan-out from input field
const P991 = defineComponent({ setup(){ const items=[{t:'open file',w:92,c:'#6ad9c4'},{t:'close tab',w:74,c:'#8b8cf7'},{t:'search docs',w:55,c:'#f5c161'},{t:'rename',w:38,c:'#f17d6d'},{t:'delete',w:14,c:'#f97b7b'}]; return {items} }, template:`<div class="ai"><div class="stage ar-cam" style="display:flex;flex-direction:column;justify-content:center;align-items:center"><div style="position:relative;width:200px"><input value="op" style="width:100%;padding:8px;background:rgba(0,0,0,.7);border:1px solid rgba(106,217,196,.5);color:#6ad9c4;font-family:var(--mono);border-radius:6px"/><div v-for="(it,i) in items" :key="i" :style="{position:'absolute',left:'50%',top:'45px',transform:'translate(-50%,'+(i*28)+'px)',background:'rgba(0,0,0,.85)',border:'1px solid '+it.c,borderRadius:'4px',padding:'3px 8px',color:'#fff',fontSize:'11px',whiteSpace:'nowrap',boxShadow:'0 0 8px '+it.c+'40',animation:'ai-fan-in .4s ease-out backwards','--y':(i*28)+'px',animationDelay:(i*0.08)+'s'}">{{ it.t }}<span class="weight-bar" :style="{width:(it.w*0.4)+'px',background:it.c}"></span><span style="margin-left:4px;font-size:9px;opacity:.7">{{ it.w }}</span></div></div><div class="label">input → AI suggestions, weight-ordered fan</div></div></div>`})

// 992 — Weighted decision branches in space
const P992 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><svg width="100%" height="100%" viewBox="0 0 240 200" style="position:absolute;inset:0"><path d="M40 100 C 100 100 100 30 200 30" :stroke="'#6ad9c4'" stroke-width="6" fill="none" opacity="0.85" style="filter: drop-shadow(0 0 6px #6ad9c4)"/><path d="M40 100 C 100 100 100 100 200 100" stroke="#8b8cf7" stroke-width="3" fill="none" opacity="0.6"/><path d="M40 100 C 100 100 100 170 200 170" stroke="#f17d6d" stroke-width="1.5" fill="none" opacity="0.4"/></svg><div class="scn-tag" style="left:6px;top:88px">decision</div><div class="scn-tag" style="right:6px;top:18px;border-color:#6ad9c4;color:#6ad9c4">▸ ship · 60%</div><div class="scn-tag" style="right:6px;top:88px;border-color:#8b8cf7;color:#8b8cf7">▸ test · 30%</div><div class="scn-tag" style="right:6px;top:158px;border-color:#f17d6d;color:#f17d6d">▸ rollback · 10%</div><div class="label">weighted branches · thicker = higher prob.</div></div></div>`})

// 993 — Timeline action replay scrubber
const P993 = defineComponent({ setup(){ const t=ref(0.4); const evs=[{t:0.0,c:'#6ad9c4',l:'open'},{t:0.25,c:'#8b8cf7',l:'edit'},{t:0.5,c:'#f5c161',l:'save'},{t:0.75,c:'#a4f06d',l:'run'},{t:1.0,c:'#f17d6d',l:'fail'}]; const cur=computed(()=>evs.reduce((a,b)=>Math.abs(b.t-t.value)<Math.abs(a.t-t.value)?b:a)); return {t,evs,cur} }, template:`<div class="ai"><div class="stage ar-cam"><div :style="{position:'absolute',left:'50%',top:'40%',transform:'translate(-50%,-50%)',padding:'18px 28px',background:'rgba(0,0,0,.7)',border:'2px solid '+cur.c,borderRadius:'10px',color:cur.c,fontWeight:700,fontSize:'18px',transition:'all .3s',boxShadow:'0 0 18px '+cur.c}">{{ cur.l.toUpperCase() }}</div><div style="position:absolute;left:14px;right:14px;bottom:30px;height:24px"><div style="position:absolute;left:0;right:0;top:50%;height:2px;background:rgba(255,255,255,.2)"></div><div v-for="(e,i) in evs" :key="i" :style="{position:'absolute',left:(e.t*100)+'%',top:'50%',width:'10px',height:'10px',borderRadius:'50%',background:e.c,transform:'translate(-50%,-50%)',boxShadow:'0 0 6px '+e.c}"></div><input type="range" min="0" max="1" step="0.01" v-model.number="t" style="position:absolute;inset:0;width:100%;background:transparent;opacity:0.5"/></div><div class="label">scrub timeline → replay spatial actions</div></div></div>`})

// 994 — Ghost gesture replay (fading hand trails)
const P994 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><svg width="100%" height="100%" viewBox="0 0 240 160" style="position:absolute;inset:0"><path v-for="(o,i) in [0.15,0.3,0.5,0.7,1]" :key="i" :d="'M30 130 Q 80 ' + (40-i*5) + ' 130 80 T 220 50'" fill="none" :stroke="'#8b8cf7'" :stroke-width="3" stroke-linecap="round" :opacity="o*0.6" :style="{filter: 'drop-shadow(0 0 4px #8b8cf7)',animation: 'ai-ghost-fade 4s ease-in-out infinite',animationDelay: (i*0.4)+'s'}"/></svg><div class="scn-tag" style="left:8px;top:8px">replaying gesture · 5 frames behind</div><div class="label">ghost gesture replay · last 5 strokes</div></div></div>`})

// 995 — Predictive action cone from cursor
const P995 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center"><svg width="200" height="160" viewBox="0 0 200 160"><g style="transform-origin:100px 130px;animation: ai-cone-sweep 4s ease-in-out infinite"><polygon points="100,130 30,30 170,30" fill="rgba(106,217,196,.18)" stroke="#6ad9c4" stroke-dasharray="3 3"/></g><circle cx="100" cy="130" r="6" fill="#fff" style="filter:drop-shadow(0 0 6px #fff)"/><text x="60" y="50" font-size="10" fill="#6ad9c4">"open"</text><text x="100" y="38" font-size="10" fill="#6ad9c4">"search"</text><text x="140" y="50" font-size="10" fill="#6ad9c4">"close"</text></svg><div class="label">predictive action cone · 3 likely intents</div></div></div>`})

// 996 — AR auto-fill cascade
const P996 = defineComponent({ setup(){ const fields=reactive({name:'',email:'',company:'',role:''}); const order=['name','email','company','role']; const v={name:'Alex Park',email:'alex@acme.io',company:'Acme Co',role:'Founder'}; let i=0; useInterval(()=>{ if(i<order.length){fields[order[i]]=v[order[i]]; i++} else { for(const k of order) fields[k]=''; i=0 } },700); return {fields,order} }, template:`<div class="ai"><div class="stage ar-cam" style="display:flex;flex-direction:column;gap:6px;padding:18px;justify-content:center"><div v-for="k in order" :key="k" style="display:flex;align-items:center;gap:6px"><span style="width:60px;color:rgba(106,217,196,.7);font-family:var(--mono);font-size:10px">{{ k }}</span><div style="flex:1;background:rgba(0,0,0,.5);border:1px solid rgba(106,217,196,.4);padding:4px 8px;border-radius:4px;color:#fff;font-size:11px;min-height:14px">{{ fields[k] }}<span v-if="!fields[k]" style="color:rgba(255,255,255,.2)">…</span></div><span v-if="fields[k]" style="color:#a4f06d;font-size:11px">✓</span></div><div class="label">AI cascade-fill · one field at a time</div></div></div>`})

// 997 — Spatial breadcrumb trail (footprints in AR floor)
const P997 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="overflow:hidden"><div style="position:absolute;left:-20%;right:-20%;bottom:0;height:60%;background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px); background-size:auto 24px; transform:perspective(260px) rotateX(60deg); transform-origin:50% 100%"></div><svg width="100%" height="100%" viewBox="0 0 240 160" style="position:absolute;inset:0"><g v-for="(p,i) in [{x:30,y:138,r:-15},{x:70,y:128,r:-10},{x:110,y:115,r:-4},{x:150,y:100,r:6},{x:190,y:82,r:14}]" :key="i"><ellipse :cx="p.x" :cy="p.y" rx="10" ry="6" :fill="'rgba(106,217,196,'+(0.2+i*0.15)+')'" :transform="'rotate('+p.r+' '+p.x+' '+p.y+')'" :style="{animation:'ai-step-walk 2.5s ease-in-out infinite',animationDelay:(i*0.3)+'s'}"/></g></svg><div class="scn-tag" style="left:8px;top:8px">→ task journey · 5 steps</div><div class="label">AR breadcrumb · footprints behind you</div></div></div>`})

// 998 — Confidence heatmap on UI elements
const P998 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><div v-for="(b,i) in [{x:18,y:30,c:0.95},{x:65,y:30,c:0.42},{x:18,y:68,c:0.78},{x:65,y:68,c:0.18}]" :key="i" :style="{position:'absolute',left:b.x+'%',top:b.y+'%',width:'80px',height:'40px',background:'rgba(106,217,196,'+b.c*0.4+')',border:'2px solid rgba(106,217,196,'+b.c+')',borderRadius:'6px',boxShadow:'0 0 '+(b.c*20)+'px rgba(106,217,196,'+b.c+')',display:'grid',placeItems:'center',color:'#fff',fontFamily:'var(--mono)',fontSize:'11px'}">{{ Math.round(b.c*100) }}%</div><div class="scn-tag" style="left:8px;top:8px">confidence heatmap · brighter = AI sure</div><div class="label">heatmap of AI certainty per element</div></div></div>`})

// 999 — Multi-AI Venn merge of proposals
const P999 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center"><svg width="200" height="140" viewBox="0 0 200 140"><circle cx="80" cy="70" r="46" fill="rgba(139,140,247,.4)" stroke="#8b8cf7"/><circle cx="120" cy="70" r="46" fill="rgba(106,217,196,.4)" stroke="#6ad9c4"/><circle cx="100" cy="100" r="40" fill="rgba(245,193,97,.35)" stroke="#f5c161"/><text x="100" y="74" font-size="10" text-anchor="middle" fill="#fff" font-weight="700">consensus</text></svg><div class="scn-tag" style="left:8px;top:8px">3 agents · overlap = consensus</div><div class="label">multi-AI Venn · merged proposal</div></div></div>`})

// 1000 — Future-self coach (translucent ghost)
const P1000 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center"><svg width="200" height="140" viewBox="0 0 200 140"><g opacity="0.3" style="filter: drop-shadow(0 0 4px #6ad9c4)"><circle cx="80" cy="50" r="14" fill="none" stroke="#6ad9c4" stroke-width="2"/><line x1="80" y1="64" x2="80" y2="100" stroke="#6ad9c4" stroke-width="2"/><line x1="80" y1="76" x2="60" y2="92" stroke="#6ad9c4" stroke-width="2"/><line x1="80" y1="76" x2="105" y2="80" stroke="#6ad9c4" stroke-width="2" stroke-dasharray="3 2"/><line x1="80" y1="100" x2="68" y2="130" stroke="#6ad9c4" stroke-width="2"/><line x1="80" y1="100" x2="92" y2="130" stroke="#6ad9c4" stroke-width="2"/></g><g style="filter: drop-shadow(0 0 4px #f5c161)"><circle cx="130" cy="50" r="14" fill="none" stroke="#f5c161" stroke-width="2"/><line x1="130" y1="64" x2="130" y2="100" stroke="#f5c161" stroke-width="2"/><line x1="130" y1="76" x2="115" y2="90" stroke="#f5c161" stroke-width="2"/><line x1="130" y1="100" x2="118" y2="130" stroke="#f5c161" stroke-width="2"/><line x1="130" y1="100" x2="142" y2="130" stroke="#f5c161" stroke-width="2"/></g></svg><div class="scn-tag" style="left:8px;top:8px;color:#6ad9c4;border-color:#6ad9c4">future-self · ghost preview</div><div class="label">"watch yourself do it" coach</div></div></div>`})

// 1001 — Predictive ghost UI
const P1001 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><div style="position:absolute;left:14px;top:14px;padding:6px 12px;background:rgba(0,0,0,.7);border:1px solid rgba(255,255,255,.2);border-radius:6px;color:#fff;font-size:11px">Save</div><div style="position:absolute;left:80px;top:14px;padding:6px 12px;background:rgba(0,0,0,.7);border:1px solid rgba(255,255,255,.2);border-radius:6px;color:#fff;font-size:11px">Edit</div><div style="position:absolute;left:14px;top:60px;padding:6px 12px;background:rgba(106,217,196,.15);border:1px dashed rgba(106,217,196,.6);border-radius:6px;color:rgba(106,217,196,.8);font-size:11px;animation: ai-pulse 1.4s ease-in-out infinite">Publish ✨</div><div class="scn-tag" style="right:8px;top:8px">AI predicts ↑ next click</div><div class="label">ghost UI · pre-rendered next intent</div></div></div>`})

// 1002 — AI memory pin trail
const P1002 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><svg width="100%" height="100%" viewBox="0 0 240 160" style="position:absolute;inset:0"><path d="M30 130 Q 90 60 130 90 T 210 30" stroke="rgba(106,217,196,.4)" stroke-width="1.5" fill="none" stroke-dasharray="3 3"/></svg><div v-for="(p,i) in [{x:30,y:130,t:'#start'},{x:90,y:80,t:'#read'},{x:130,y:90,t:'#edit'},{x:170,y:60,t:'#test'},{x:210,y:30,t:'#ship'}]" :key="i" :style="{position:'absolute',left:p.x+'px',top:(p.y-12)+'px',transform:'translate(-50%,-50%)'}"><div style="font-size:14px">📍</div><div style="background:rgba(106,217,196,.85);color:#0b0c14;font-size:9px;padding:1px 5px;border-radius:3px;font-family:var(--mono);font-weight:700;margin-top:2px">{{ p.t }}</div></div><div class="label">AI auto-tag · spatial memory pins</div></div></div>`})

// 1003 — Weighted vote orbit (multi-agent decision)
const P1003 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center"><svg width="200" height="160" viewBox="0 0 200 160"><circle cx="100" cy="80" r="22" fill="url(#vote-grad)" style="filter:drop-shadow(0 0 16px #6ad9c4)"/><defs><radialGradient id="vote-grad"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#6ad9c4"/></radialGradient></defs><g style="transform-origin:100px 80px;animation:ai-orbit-vote 12s linear infinite"><g v-for="(a,i) in [{x:60,r:14,c:'#6ad9c4',v:0.92},{x:140,r:10,c:'#8b8cf7',v:0.78},{x:80,r:6,c:'#f5c161',v:0.42},{x:120,r:5,c:'#f17d6d',v:0.31}]" :key="i" :transform="'translate('+a.x+' '+(40+i*15)+')'"><circle r="8" :fill="a.c" style="filter:drop-shadow(0 0 4px currentColor);color:inherit"/><text x="0" y="3" font-size="8" text-anchor="middle" fill="#0b0c14" font-weight="700">{{ Math.round(a.v*100) }}</text></g></g></svg><div class="scn-tag" style="left:8px;top:8px">4 agents voted · bigger = more weight</div><div class="label">vote orbit · weighted multi-agent decision</div></div></div>`})

// 1004 — Time-tunnel portals to past chats
const P1004 = defineComponent({ template:`<div class="ai"><div class="stage" style="display:grid;place-items:center;perspective:240px;background:linear-gradient(180deg,#040611 30%,#1a0a3a)"><div style="position:relative;width:200px;height:130px;transform-style:preserve-3d;transform:rotateX(15deg)"><div v-for="i in 4" :key="i" :style="{position:'absolute',left:'50%',top:'50%',width:(140-i*18)+'px',height:(90-i*12)+'px',borderRadius:'50% 50% 0 0 / 30% 30% 0 0',background:'radial-gradient(ellipse at 50% 30%, hsl('+(280+i*15)+',70%,'+(50-i*5)+'%) 0%, transparent 70%)',border:'1px solid hsl('+(280+i*15)+',70%,60%)',transform:'translate(-50%,-50%) translateZ('+(-i*40)+'px)',boxShadow:'0 0 16px hsl('+(280+i*15)+',70%,50%,.6)'}"></div></div><div class="scn-tag" style="left:8px;top:8px">past chats as portals · step through time</div><div class="label">time tunnel · past conversation portals</div></div></div>`})

// 1005 — Spatial undo stack
const P1005 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center;perspective:300px"><div style="position:relative;width:140px;height:90px;transform-style:preserve-3d"><div v-for="i in 5" :key="i" :style="{position:'absolute',inset:0,background:'linear-gradient(135deg,#7d6df1,#3a64f1)',borderRadius:'8px',transform:'translateZ('+(-i*16)+'px) translateY('+(i*4)+'px)',opacity:1-i*0.15,boxShadow:'0 4px 14px rgba(0,0,0,.4)',border:'1px solid rgba(255,255,255,.2)',display:'grid',placeItems:'center',color:'#fff',fontSize:'11px',fontFamily:'var(--mono)'}">action #{{ 5-i+1 }}</div></div><div class="scn-tag" style="left:8px;top:8px">↶ pull-back to undo</div><div class="label">spatial undo stack · in 3D</div></div></div>`})

// 1006 — Triple suggestion spotlights (decreasing)
const P1006 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:flex;justify-content:space-around;align-items:center;padding:20px"><div v-for="(s,i) in [{t:'open()',op:1.0,siz:'18px'},{t:'close()',op:0.55,siz:'14px'},{t:'save()',op:0.25,siz:'11px'}]" :key="i" :style="{padding:'14px 18px',background:'rgba(106,217,196,'+(s.op*0.3)+')',border:'2px solid rgba(106,217,196,'+s.op+')',borderRadius:'10px',color:'#fff',fontFamily:'var(--mono)',fontSize:s.siz,fontWeight:'700',boxShadow:'0 0 '+(s.op*24)+'px rgba(106,217,196,'+s.op+')'}">{{ s.t }}</div><div class="label">top-3 suggestions · brightness = rank</div></div></div>`})

// 1007 — Thought bubble swarm around object
const P1007 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam" style="display:grid;place-items:center"><div style="position:relative;width:80px;height:80px;background:linear-gradient(135deg,#7d6df1,#6ad9c4);border-radius:8px;box-shadow:0 0 16px rgba(139,140,247,.5)"></div><div v-for="(b,i) in [{x:-70,y:-30,t:'rename?',d:'0s'},{x:80,y:-50,t:'split?',d:'.4s'},{x:90,y:30,t:'archive?',d:'.8s'},{x:-80,y:40,t:'duplicate?',d:'1.2s'}]" :key="i" :style="{position:'absolute',left:'50%',top:'50%',transform:'translate(calc(-50% + '+b.x+'px), calc(-50% + '+b.y+'px))',background:'#fff',color:'#0b0c14',padding:'4px 8px',borderRadius:'10px',fontSize:'10px',fontWeight:600,boxShadow:'0 4px 10px rgba(0,0,0,.3)',animation:'ai-breath 3s ease-in-out infinite',animationDelay:b.d}">{{ b.t }}</div><div class="label">thought-bubble swarm · AI ideas around object</div></div></div>`})

// 1008 — Branching timeline alternatives
const P1008 = defineComponent({ template:`<div class="ai"><div class="stage ar-cam"><svg width="100%" height="100%" viewBox="0 0 240 160" style="position:absolute;inset:0"><line x1="20" y1="80" x2="220" y2="80" stroke="#6ad9c4" stroke-width="2"/><path d="M120 80 Q 160 50 200 50" stroke="rgba(245,193,97,.6)" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/><path d="M120 80 Q 160 110 200 110" stroke="rgba(241,125,109,.6)" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/><circle v-for="(t,i) in [{x:40,c:'#6ad9c4'},{x:80,c:'#6ad9c4'},{x:120,c:'#fff'},{x:200,y:50,c:'#f5c161'},{x:200,y:110,c:'#f17d6d'}]" :key="i" :cx="t.x" :cy="t.y||80" r="6" :fill="t.c" :style="{filter:'drop-shadow(0 0 4px '+t.c+')'}"/></svg><div class="scn-tag" style="right:6px;top:36px;color:#f5c161;border-color:#f5c161">alt A · ship</div><div class="scn-tag" style="right:6px;bottom:36px;color:#f17d6d;border-color:#f17d6d">alt B · roll back</div><div class="scn-tag" style="left:8px;top:8px">timeline · 2 alternative futures</div><div class="label">timeline · branching alternative paths</div></div></div>`})

// 1009 — AI suggestion ribbon flow
const P1009 = defineComponent({ setup(){ const items=['/explain','/test','/refactor','/docstring','/summarise','/translate','/review']; const offset=ref(0); useInterval(()=>offset.value=(offset.value+1)%240,80); return {items,offset} }, template:`<div class="ai"><div class="stage ar-cam"><div style="position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);height:32px;overflow:hidden"><div :style="{position:'absolute',top:0,left:0,display:'flex',gap:'10px',padding:'4px',transform:'translateX(-'+offset+'px)',transition:'transform .08s linear'}"><div v-for="i in 30" :key="i" :style="{padding:'4px 10px',background:'rgba(0,0,0,.7)',border:'1px solid rgba(106,217,196,.5)',borderRadius:'14px',color:'#6ad9c4',fontFamily:'var(--mono)',fontSize:'10px',whiteSpace:'nowrap'}">{{ items[i%items.length] }}</div></div></div><div class="scn-tag" style="left:8px;top:8px">streaming AI suggestions · grab any</div><div class="label">suggestion ribbon · always-on stream</div></div></div>`})

// 1010 — Action replay mini-map (path with playable points)
const P1010 = defineComponent({ setup(){ const cur=ref(2); const pts=[{x:18,y:75},{x:35,y:55},{x:50,y:38},{x:65,y:55},{x:80,y:30}]; return {cur,pts} }, template:`<div class="ai"><div class="stage ar-cam"><svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0"><polyline :points="pts.map(p=>p.x+','+p.y).join(' ')" fill="none" stroke="rgba(106,217,196,.5)" stroke-width="0.6" stroke-dasharray="2 1"/><circle v-for="(p,i) in pts" :key="i" :cx="p.x" :cy="p.y" :r="i===cur?2.5:1.4" :fill="i<=cur?'#6ad9c4':'rgba(255,255,255,.3)'" :style="{filter:i===cur?'drop-shadow(0 0 2px #6ad9c4)':'none',cursor:'pointer'}" @click="cur=i"/></svg><div :style="{position:'absolute',left:pts[cur].x+'%',top:(pts[cur].y-12)+'%',transform:'translate(-50%,-50%)',background:'rgba(0,0,0,.8)',color:'#6ad9c4',padding:'4px 10px',borderRadius:'4px',fontSize:'11px',fontFamily:'var(--mono)',border:'1px solid #6ad9c4',whiteSpace:'nowrap',transition:'all .3s'}">step {{ cur+1 }} / {{ pts.length }}</div><div class="scn-tag" style="left:8px;bottom:8px">tap any point · replay from there</div><div class="label">replay mini-map · click to scrub</div></div></div>`})

const meta = [
  C(901,'Agent constellation',     'A central sun with planet-agents orbiting in a starfield.',P901),
  C(902,'Conversation river',      'Messages flow as a stream of glowing orbs across the canvas.',P902),
  C(903,'Thought-cloud merge',     'Two cloud silhouettes overlap and exchange ideas in real time.',P903),
  C(904,'Spatial workspace',       'Floating windows arranged in a pseudo-3D plane like an OS.',P904),
  C(905,'Cursor swarm',            'Particle agents follow your cursor with rainbow trails.',P905),
  C(906,'Eye-track overlay',       'A reticle drifts to where you\'re reading; AI follows attention.',P906),
  C(907,'Neural mesh',             'A pulsing mesh of neuron-nodes firing in waves.',P907),
  C(908,'Reasoning time-rewind',   'Scrub a slider to replay each reasoning stage.',P908),
  C(909,'Personality crystal',     'A rotating multi-faceted crystal expressing the agent\'s persona.',P909),
  C(910,'Quorum sun',              'Worker agents orbit a sun and cast votes.',P910),
  C(911,'Liquid AI flow',          'A morphing blob of AI flowing into the active task panel.',P911),
  C(912,'Holographic face',        'A face that morphs its outline based on emotional context.',P912),
  C(913,'Memory palace corridor',  'A perspective tunnel of past conversations.',P913),
  C(914,'Two-brain split',         'Logic / creativity hemispheres collaborating in parallel.',P914),
  C(915,'AR gaze coach',           'A coach reticle moves to wherever it wants you to look next.',P915),
  C(916,'Agent symphony',          'Each agent contributes a "tone" — visualised as glowing bars.',P916),
  C(917,'Living thought-graph',    'Hub-and-spoke graph of ideas that breathe with activity.',P917),
  C(918,'Confidence aura',         'Answer card glows with a halo proportional to confidence.',P918),
  C(919,'Multi-dim hexagon dial',  '6-axis radar plus a sweeping needle for live tuning.',P919),
  C(920,'Agent fingerprint',       'Concentric arcs forming a unique signature per model instance.',P920),

  // — AR-themed —
  C(921,'AR object labels',        'Bracketed boxes + labels float over real-world objects via the camera.',P921,{tags:['ai-imagined','ar']}),
  C(922,'AR holo companion',       'A translucent agent figure standing beside you in your room.',P922,{tags:['ai-imagined','ar']}),
  C(923,'AR live translate',       'Foreign-language text replaced in-place with its translation.',P923,{tags:['ai-imagined','ar']}),
  C(924,'AR depth-scan mesh',      'Wireframe grid sweeps across the scene as the room is mapped.',P924,{tags:['ai-imagined','ar']}),
  C(925,'AR plane detect',         'Detected floor plane glows with a perspective grid.',P925,{tags:['ai-imagined','ar']}),
  C(926,'AR ghost preview',        'Furniture / object placed as a translucent ghost before commit.',P926,{tags:['ai-imagined','ar']}),
  C(927,'AR mini-map HUD',         'Corner radar with sweeping beam and nearby agents/dots.',P927,{tags:['ai-imagined','ar']}),
  C(928,'AR floor arrow',          '3-D arrow on the floor pointing the way to your destination.',P928,{tags:['ai-imagined','ar']}),
  C(929,'AR portal door',          'A glowing portal opening into the agent\'s virtual space.',P929,{tags:['ai-imagined','ar']}),
  C(930,'AR gesture trail',        'A glowing ribbon traces a hand-drawn shape in mid-air.',P930,{tags:['ai-imagined','ar']}),

  // — Imagined / dimensional —
  C(931,'Synesthetic mood orb',    'Conic-gradient orb that shifts hue with conversation tone.',P931),
  C(932,'Conversation DNA',        'Twin-strand helix of human/AI messages.',P932),
  C(933,'Quantum superposition',   '3 candidate answers ghost-overlaid until you observe one.',P933),
  C(934,'Cognitive depth meter',   'Stacked bars showing how deep the reasoning went.',P934),
  C(935,'Idea seed → tree',        'Seedling sprouts branches and bloom as the thought grows.',P935),
  C(936,'Persona cocoon morph',    'Persona transforms inside a glowing cocoon.',P936),
  C(937,'Knowledge constellation', 'Star map of acquired topics; major topics labelled.',P937),
  C(938,'Thought ripple pond',     'Drop a question — concentric ripples expand into context.',P938),
  C(939,'Mind palace 3D walk',     'First-person tunnel through your conversation history.',P939),
  C(940,'Soul gem facets',         'Multi-faceted gem expressing the agent\'s core intent.',P940),
  C(941,'Whisper / amplify mode',  'UI dims & shrinks for intimate chat, blooms for important.',P941),
  C(942,'Echo chamber mirror',     'Mirrored panes detect a one-sided source bias.',P942),
  C(943,'Crystal ball next-action','A translucent sphere previews the predicted next step.',P943),
  C(944,'Ghost typing partner',    'AI\'s draft text shadows your typing in real time.',P944),
  C(945,'Cognitive aurora',        'Aurora ribbon overhead reflects the model\'s state.',P945),
  C(946,'AI shadow companion',     'Your shadow on the wall is the agent — always there.',P946),
  C(947,'Wisdom tree-rings',       'Concentric rings showing knowledge eras / years.',P947),
  C(948,'Living wallpaper',        'Page background breathes with the active persona.',P948),
  C(949,'Inner voice ghost text',  'AI\'s private monologue peeks behind the public answer.',P949),
  C(950,'Time-dilated chat',       'Important messages physically larger; mundane shrunk.',P950),

  // — VR controls —
  C(951,'VR laser ray pointer',    'Pink laser from controller to selectable target.',P951,{tags:['ai-imagined','vr']}),
  C(952,'VR teleport target ring', 'Bezier arc + bobbing ring marks teleport destination.',P952,{tags:['ai-imagined','vr']}),
  C(953,'VR ghost hand pose',      'Translucent skeletal hands with finger tracking.',P953,{tags:['ai-imagined','vr']}),
  C(954,'VR floor-anchored menu',  'Floating radial menu pinned to the floor in front of you.',P954,{tags:['ai-imagined','vr']}),
  C(955,'VR curved bezel menu',    'Arc-shaped menu with tabs along a curved bezel.',P955,{tags:['ai-imagined','vr']}),
  C(956,'VR thumbstick scroll',    'Spinning round dial driven by the controller stick.',P956,{tags:['ai-imagined','vr']}),
  C(957,'VR finger pinch',         'Pinch gesture between thumb and index = select.',P957,{tags:['ai-imagined','vr']}),
  C(958,'VR comfort vignette',     'Periphery dims to a tunnel during locomotion.',P958,{tags:['ai-imagined','vr']}),
  C(959,'VR chaperone boundary',   'Hatched grid wall when you near room edge.',P959,{tags:['ai-imagined','vr']}),
  C(960,'VR grab outline',         'Outlined glowing object means "you can grab me".',P960,{tags:['ai-imagined','vr']}),
  C(961,'VR throw arc',            'Predicted physics arc when throwing an object.',P961,{tags:['ai-imagined','vr']}),
  C(962,'VR hand pose recogniser', 'Fist / palm / pinch shown with intent label.',P962,{tags:['ai-imagined','vr']}),
  C(963,'VR wrist-anchored menu',  'Mini menu attached to your left wrist.',P963,{tags:['ai-imagined','vr']}),
  C(964,'VR floating keyboard',    'In-air QWERTY keyboard for dictation/edit.',P964,{tags:['ai-imagined','vr']}),
  C(965,'VR peripheral notif',     'Soft glowing notification in your periphery.',P965,{tags:['ai-imagined','vr']}),

  // — More AR controls —
  C(966,'AR phone in air',         'Phone-shaped UI projected mid-air.',P966,{tags:['ai-imagined','ar']}),
  C(967,'AR face ID + recall',     'Detected face plus a memory recall card.',P967,{tags:['ai-imagined','ar']}),
  C(968,'AR voice bubble',         'Speech rendered as a floating bubble in space.',P968,{tags:['ai-imagined','ar']}),
  C(969,'AR scale-the-world',      'Slider scales whole virtual objects in the room.',P969,{tags:['ai-imagined','ar']}),
  C(970,'AR room weather',         'Rain falling inside the captured camera scene.',P970,{tags:['ai-imagined','ar']}),
  C(971,'AR time-of-day relight',  'Slider re-lights the scene at any hour.',P971,{tags:['ai-imagined','ar']}),
  C(972,'AR x-ray vision',         'See through walls — boxed annotation of hidden object.',P972,{tags:['ai-imagined','ar']}),
  C(973,'AR spatial subtitle',     'Subtitle anchored in 3D space at speaker location.',P973,{tags:['ai-imagined','ar']}),
  C(974,'AR magnetic snap',        'Object snaps to nearest plane / surface.',P974,{tags:['ai-imagined','ar']}),
  C(975,'AR gravity field',        'Warped field lines visualise mass / pull.',P975,{tags:['ai-imagined','ar']}),
  C(976,'AR mood room',            'Whole room glow shifts with detected emotion.',P976,{tags:['ai-imagined','ar']}),
  C(977,'AR shared annotation',    'Multi-user spatial sticky-notes with colored handwriting.',P977,{tags:['ai-imagined','ar']}),
  C(978,'AR replay timeline',      'Spatial timeline you can step along.',P978,{tags:['ai-imagined','ar']}),
  C(979,'AR holo war-table',       'Tabletop 3D map with mission pins.',P979,{tags:['ai-imagined','ar']}),
  C(980,'AR laser ruler',          'Tap-to-tap distance with floating measurement.',P980,{tags:['ai-imagined','ar']}),

  // — Scenario-driven AR/VR + AI —
  C(991,'Suggestion fan-out',      'Type into a field; AI suggestions fan out as weighted floating cards.',P991,{tags:['ai-imagined','ar','suggest']}),
  C(992,'Weighted decision branches','Three branching paths in space, thicker = higher probability.',P992,{tags:['ai-imagined','ar','flow']}),
  C(993,'Timeline action replay',  'Scrub a slider to replay every spatial action you took.',P993,{tags:['ai-imagined','ar','replay']}),
  C(994,'Ghost gesture replay',    'Past hand strokes shown as fading ghost trails (last N frames).',P994,{tags:['ai-imagined','ar','replay']}),
  C(995,'Predictive action cone',  'Cone from cursor sweeps over 3 most-likely next actions.',P995,{tags:['ai-imagined','ar','predict']}),
  C(996,'AR auto-fill cascade',    'Form fields fill themselves in sequential AI-driven waves.',P996,{tags:['ai-imagined','ar','suggest']}),
  C(997,'Spatial breadcrumb trail','Footprints in AR floor showing your task journey.',P997,{tags:['ai-imagined','ar']}),
  C(998,'Confidence heatmap',      'UI elements glow brighter where AI is more confident.',P998,{tags:['ai-imagined','ar','suggest']}),
  C(999,'Multi-AI Venn merge',     'Three agents propose; overlap = consensus.',P999,{tags:['ai-imagined','multi-agent']}),
  C(1000,'Future-self coach',      'Translucent ghost of "future you" demonstrates the next move.',P1000,{tags:['ai-imagined','ar']}),
  C(1001,'Predictive ghost UI',    'Ghost button pre-renders where AI thinks you\'ll click next.',P1001,{tags:['ai-imagined','ar','predict']}),
  C(1002,'AI memory pin trail',    'Auto-tagged spatial pins drop along your task path.',P1002,{tags:['ai-imagined','ar','memory']}),
  C(1003,'Weighted vote orbit',    'Multiple agents\' votes orbit a central decision sphere.',P1003,{tags:['ai-imagined','multi-agent']}),
  C(1004,'Time-tunnel portals',    'Past chats become portals you can step through in 3D.',P1004,{tags:['ai-imagined','ar','memory']}),
  C(1005,'Spatial undo stack',     '3D stack of recent actions; pull-back to undo.',P1005,{tags:['ai-imagined','ar','undo']}),
  C(1006,'Triple suggestion spotlight','Top-3 suggestions with brightness proportional to rank.',P1006,{tags:['ai-imagined','ar','suggest']}),
  C(1007,'Thought-bubble swarm',   'AI floats multiple "what about…" bubbles around an object.',P1007,{tags:['ai-imagined','ar','suggest']}),
  C(1008,'Branching timeline alts','Timeline shows 2 alternative futures from the present moment.',P1008,{tags:['ai-imagined','ar','flow']}),
  C(1009,'Suggestion ribbon flow', 'AI-curated commands streaming as an always-on side ribbon.',P1009,{tags:['ai-imagined','ar','suggest']}),
  C(1010,'Replay mini-map',        'Click any point on the journey path to replay from there.',P1010,{tags:['ai-imagined','ar','replay']}),
]

export default meta.map(m => ({ ...m, category:'Ai Ui' }))
