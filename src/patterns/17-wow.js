import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('wow', `
.wow { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; align-items:center; justify-content:center; position:relative; overflow:hidden; }
.wow .stage { position:relative; width:200px; height:140px; border-radius:12px; overflow:hidden; }

@keyframes shimmer-w { from { background-position: 200% 0 } to { background-position: -200% 0 } }
@keyframes spin-w    { to { transform: rotate(360deg) } }
@keyframes float-w   { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
@keyframes blink-w   { 50% { opacity: 0 } }
@keyframes draw-w    { to { stroke-dashoffset: 0 } }
@keyframes blob-w    { 0%,100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50% } 33% { border-radius: 30% 70% 50% 50% / 60% 40% 60% 40% } 66% { border-radius: 50% 50% 30% 70% / 40% 60% 50% 50% } }
@keyframes glitch-w  { 0%,100% { clip-path: inset(0 0 0 0) } 20%{ clip-path: inset(20% 0 60% 0) } 40%{ clip-path: inset(60% 0 10% 0) } 60%{ clip-path: inset(0 0 80% 0) } 80%{ clip-path: inset(40% 0 30% 0) } }
@keyframes squish-w  { 0%,100%{transform:scale(1,1)} 50%{transform:scale(1.18,0.82)} }
@keyframes rain-w    { from{ transform: translateY(-20px)} to{ transform: translateY(160px)} }
@keyframes snow-w    { from{ transform: translateY(-20px) translateX(0) rotate(0)} to{ transform: translateY(160px) translateX(20px) rotate(360deg)} }
@keyframes wave-w    { from{ transform: translateX(0)} to{ transform: translateX(-50%)} }
@keyframes pulse-ring{ 0%{ transform: scale(0.8); opacity:1} 100%{transform: scale(2.4); opacity:0 } }
@keyframes shake-w   { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }
@keyframes tilt-w    { 0%,100%{transform: perspective(400px) rotateY(-12deg) rotateX(8deg)} 50%{transform: perspective(400px) rotateY(12deg) rotateX(-8deg)} }
@keyframes hue-w     { from{ filter: hue-rotate(0deg)} to{ filter: hue-rotate(360deg)} }
@keyframes flame-w   { 0%,100%{ transform: scale(1,1) translateY(0)} 50%{transform: scale(1.05,1.15) translateY(-2px)} }
@keyframes ripple-w  { from { transform: scale(0); opacity:.6 } to { transform: scale(3); opacity:0 } }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'visual flourishes', tags: extra.tags||['wow','animation'], component: comp })

// 851 Particle confetti burst
const P851 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0e1320"><div v-for="i in 24" :key="i" :style="{position:'absolute',left:'50%',top:'50%',width:'6px',height:'6px',background:'hsl('+(i*30)+',80%,60%)',borderRadius:'2px',transform:'translate(-50%,-50%) rotate('+(i*15)+'deg) translateY(-60px)',animation:'pulse-ring 1.6s ease-out infinite',animationDelay:(i*0.05)+'s'}"/></div></div>`})
// 852 Aurora gradient bg
const P852 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:linear-gradient(135deg,#7d6df1,#6df1c4,#f5c161,#f17d6d);background-size:300% 300%;animation: shimmer-w 6s ease-in-out infinite"></div></div>`})
// 853 Glitch text
const P853 = defineComponent({ template:`<div class="wow"><div class="stage" style="display:grid;place-items:center;background:#0b0c14;color:#fff;font-weight:800;font-size:24px;position:relative">AI UX<div style="position:absolute;color:#f97b7b;animation: glitch-w 1.4s steps(2) infinite">AI UX</div><div style="position:absolute;color:#6ad9c4;animation: glitch-w 1.6s steps(2) infinite reverse">AI UX</div></div></div>`})
// 854 Neon glow border
const P854 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#000;display:grid;place-items:center"><div style="padding:18px 30px;border:2px solid #ff8af0;border-radius:8px;color:#fff;text-shadow:0 0 8px #ff8af0;box-shadow:0 0 12px #ff8af0, inset 0 0 8px #ff8af0">NEON</div></div></div>`})
// 855 3D card tilt
const P855 = defineComponent({ template:`<div class="wow"><div class="stage" style="display:grid;place-items:center;background:#0e1320"><div style="width:120px;height:80px;border-radius:10px;background:linear-gradient(135deg,#7d6df1,#3a64f1);animation: tilt-w 4s ease-in-out infinite"></div></div></div>`})
// 856 Holographic shimmer card
const P856 = defineComponent({ template:`<div class="wow"><div class="stage" style="display:grid;place-items:center;background:#000"><div style="width:120px;height:80px;border-radius:10px;background:linear-gradient(120deg,#ff8af0,#8b8cf7,#6ad9c4,#f5c161,#ff8af0);background-size:300% 300%;animation: shimmer-w 3s linear infinite"></div></div></div>`})
// 857 Liquid blob morph
const P857 = defineComponent({ template:`<div class="wow"><div class="stage" style="display:grid;place-items:center;background:#0e1320"><div style="width:90px;height:90px;background:linear-gradient(135deg,#7d6df1,#6ad9c4);animation: blob-w 8s ease-in-out infinite"></div></div></div>`})
// 858 Plasma background
const P858 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:radial-gradient(circle at 30% 30%, #ff8af0, transparent 40%), radial-gradient(circle at 70% 70%, #6ad9c4, transparent 40%), radial-gradient(circle at 50% 50%, #8b8cf7, transparent 50%), #0b0c14;animation: hue-w 8s linear infinite"></div></div>`})
// 859 Galaxy starfield
const P859 = defineComponent({ setup(){ const stars=Array.from({length:60},()=>({x:Math.random()*200,y:Math.random()*140,s:Math.random()*2+0.5,d:Math.random()*2+'s'})); return {stars} }, template:`<div class="wow"><div class="stage" style="background:radial-gradient(ellipse at center, #1a1f3a, #0b0c14);position:relative"><div v-for="(s,i) in stars" :key="i" :style="{position:'absolute',left:s.x+'px',top:s.y+'px',width:s.s+'px',height:s.s+'px',background:'#fff',borderRadius:'50%',animation:'blink-w 2s steps(2) infinite',animationDelay:s.d}"/></div></div>`})
// 860 Lightning bolt
const P860 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0a0b14;display:grid;place-items:center"><svg width="100" height="120" viewBox="0 0 100 120"><path d="M50 5 L 30 60 L 55 60 L 35 115 L 75 50 L 50 50 Z" fill="#fff" stroke="#8b8cf7" stroke-width="2" style="filter: drop-shadow(0 0 10px #8b8cf7); animation: blink-w 1.6s steps(2) infinite"/></svg></div></div>`})
// 861 Snowfall
const P861 = defineComponent({ setup(){ const flakes=Array.from({length:24},(_,i)=>({x:Math.random()*200,d:(Math.random()*4+2)+'s', delay:(Math.random()*4)+'s', size:Math.random()*4+4})); return {flakes} }, template:`<div class="wow"><div class="stage" style="background:linear-gradient(180deg,#1f2740,#0e1320)"><div v-for="(f,i) in flakes" :key="i" :style="{position:'absolute',left:f.x+'px',top:'-10px',width:f.size+'px',height:f.size+'px',background:'#fff',borderRadius:'50%',opacity:0.8,animation:'snow-w '+f.d+' linear infinite',animationDelay:f.delay}"/></div></div>`})
// 862 Rainfall
const P862 = defineComponent({ setup(){ const drops=Array.from({length:40},(_,i)=>({x:Math.random()*200,d:(0.4+Math.random()*0.6)+'s',delay:(Math.random()*1.5)+'s'})); return {drops} }, template:`<div class="wow"><div class="stage" style="background:#1a1f3a"><div v-for="(d,i) in drops" :key="i" :style="{position:'absolute',left:d.x+'px',top:'-20px',width:'1px',height:'14px',background:'rgba(173,216,230,0.6)',animation:'rain-w '+d.d+' linear infinite',animationDelay:d.delay}"/></div></div>`})
// 863 Disco ball spin
const P863 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0b0c14;display:grid;place-items:center"><div style="width:80px;height:80px;border-radius:50%;background:radial-gradient(circle at 35% 35%, #fff, #aaa 30%, #444);animation: spin-w 4s linear infinite;box-shadow: 0 0 30px rgba(255,255,255,0.5)"></div></div></div>`})
// 864 Lava lamp
const P864 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:linear-gradient(180deg,#3a0e1f,#0b0c14);position:relative"><div v-for="(b,i) in [{c:'#f97b7b',l:30,d:'4s'},{c:'#f5c161',l:90,d:'5s'},{c:'#7d6df1',l:150,d:'6s'}]" :key="i" :style="{position:'absolute',left:b.l+'px',bottom:'10px',width:'40px',height:'40px',background:b.c,borderRadius:'50%',animation:'float-w '+b.d+' ease-in-out infinite',filter:'blur(2px)'}"></div></div></div>`})
// 865 Vortex spinner
const P865 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0b0c14;display:grid;place-items:center"><svg width="100" height="100" viewBox="0 0 100 100" style="animation: spin-w 2s linear infinite"><circle v-for="i in 12" :key="i" :cx="50" :cy="50" :r="6+i*3" fill="none" :stroke="'hsl('+(i*30)+',80%,60%)'" stroke-width="1" :stroke-dasharray="5+i*2"/></svg></div></div>`})
// 866 Morphing SVG icon
const P866 = defineComponent({ template:`<div class="wow"><div class="stage" style="display:grid;place-items:center;background:#0e1320"><svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="20" fill="var(--accent)" style="animation: blob-w 5s ease-in-out infinite"/></svg></div></div>`})
// 867 Iridescent gradient
const P867 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:conic-gradient(from 0deg,#ff8af0,#8b8cf7,#6ad9c4,#f5c161,#f17d6d,#ff8af0);animation: spin-w 8s linear infinite"></div></div>`})
// 868 Glassmorphism card
const P868 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:linear-gradient(135deg,#7d6df1,#6df1c4);display:grid;place-items:center"><div style="width:140px;height:80px;border-radius:14px;background:rgba(255,255,255,0.18);backdrop-filter: blur(8px);border:1px solid rgba(255,255,255,0.3);color:#fff;display:grid;place-items:center;font-weight:600">glass card</div></div></div>`})
// 869 Neumorphism button
const P869 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#222840;display:grid;place-items:center"><div style="padding:14px 26px;border-radius:14px;background:#222840;box-shadow: inset 6px 6px 12px #1a1f33, inset -6px -6px 12px #2a3155;color:#bcc;font-weight:600">soft</div></div></div>`})
// 870 Frosted glass overlay
const P870 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:linear-gradient(135deg,#f17d6d,#7d6df1);position:relative"><div style="position:absolute;left:30%;top:30%;right:10%;bottom:10%;background:rgba(255,255,255,0.12);backdrop-filter: blur(12px);border-radius:8px;border:1px solid rgba(255,255,255,0.2);color:#fff;display:grid;place-items:center">frost</div></div></div>`})
// 871 Bouncy spring
const P871 = defineComponent({ setup(){ const k=ref(0); function bump(){k.value++} return {k,bump} }, template:`<div class="wow"><div class="stage" style="background:#0e1320;display:grid;place-items:center"><button :key="k" @click="bump" style="padding:14px 26px;border-radius:10px;background:var(--accent);color:#0b0c14;border:none;font-weight:700;animation: squish-w .35s cubic-bezier(.5,1.6,.6,1)">click me</button></div></div>`})
// 872 Magnetic cursor (simulated drift)
const P872 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0e1320;position:relative"><div style="position:absolute;left:50%;top:50%;width:14px;height:14px;border-radius:50%;background:var(--accent);transform:translate(-50%,-50%);animation: float-w 2s ease-in-out infinite"></div><div style="position:absolute;left:50%;top:50%;width:80px;height:80px;border-radius:50%;border:1px solid rgba(139,140,247,0.4);transform:translate(-50%,-50%)"></div></div></div>`})
// 873 Cursor sparkle trail
const P873 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0b0c14;position:relative"><div v-for="(s,i) in 6" :key="i" :style="{position:'absolute',left:(40+i*20)+'px',top:(60+(i%2)*20)+'px',width:'4px',height:'4px',background:'#fff',borderRadius:'50%',opacity: 1-i*0.15,boxShadow:'0 0 8px var(--accent)'}"/></div></div>`})
// 874 Page peel
const P874 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#fff;color:#0b0c14;padding:10px;display:grid;place-items:center;position:relative"><div>page peel</div><div style="position:absolute;right:0;bottom:0;width:60px;height:60px;background:linear-gradient(225deg,#ddd 50%,transparent 50%);border-radius:0 0 12px 0"></div></div></div>`})
// 875 Card stack 3D
const P875 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0e1320;display:grid;place-items:center;perspective:600px"><div style="position:relative;width:100px;height:60px;transform-style:preserve-3d"><div v-for="i in 3" :key="i" :style="{position:'absolute',inset:0,background:'linear-gradient(135deg,#7d6df1,#3a64f1)',borderRadius:'8px',transform:'translateZ('+(-i*8)+'px) translateY('+(i*4)+'px)'}"></div></div></div></div>`})
// 876 Conic-gradient spinner
const P876 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0e1320;display:grid;place-items:center"><div style="width:60px;height:60px;border-radius:50%;background:conic-gradient(var(--accent),transparent);animation: spin-w 1s linear infinite;mask:radial-gradient(circle, transparent 50%, #000 51%);-webkit-mask:radial-gradient(circle, transparent 50%, #000 51%)"></div></div></div>`})
// 877 Animated wave bg
const P877 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0e1320;overflow:hidden;position:relative"><svg viewBox="0 0 400 140" preserveAspectRatio="none" style="position:absolute;left:0;top:0;width:200%;height:100%;animation: wave-w 6s linear infinite"><path d="M0 70 Q 100 40 200 70 T 400 70 V 140 H 0 Z" fill="rgba(139,140,247,0.4)"/><path d="M0 70 Q 100 100 200 70 T 400 70 V 140 H 0 Z" fill="rgba(106,217,196,0.4)"/></svg></div></div>`})
// 878 Water ripple click
const P878 = defineComponent({ setup(){ const r=ref([]); function go(e){const id=Date.now(); r.value.push({id,x:e.offsetX,y:e.offsetY}); setTimeout(()=>r.value=r.value.filter(x=>x.id!==id),700)} return {r,go} }, template:`<div class="wow"><div class="stage" style="background:#0e1320;cursor:pointer;position:relative" @click="go"><div class="dim mono" style="position:absolute;left:8px;top:6px;font-size:11px;color:#fff">click anywhere</div><div v-for="x in r" :key="x.id" :style="{position:'absolute',left:x.x+'px',top:x.y+'px',width:'10px',height:'10px',borderRadius:'50%',border:'2px solid #fff',transform:'translate(-50%,-50%)',animation:'ripple-w .7s ease-out forwards'}"/></div></div>`})
// 879 Ink splash
const P879 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#fff;display:grid;place-items:center"><svg width="100" height="100" viewBox="0 0 100 100"><g fill="#0b0c14"><circle cx="50" cy="50" r="20"/><circle cx="20" cy="30" r="6"/><circle cx="80" cy="40" r="8"/><circle cx="35" cy="80" r="5"/><circle cx="75" cy="80" r="9"/><circle cx="15" cy="70" r="4"/></g></svg></div></div>`})
// 880 Smoke trail
const P880 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0b0c14;position:relative"><div v-for="i in 8" :key="i" :style="{position:'absolute',left:(20+i*20)+'px',top:'50%',width:'24px',height:'24px',borderRadius:'50%',background:'rgba(200,200,200,'+(0.4-i*0.04)+')',transform:'translateY(-50%)',filter:'blur('+(i*1)+'px)'}"/></div></div>`})
// 881 Wobble jelly
const P881 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0e1320;display:grid;place-items:center"><div style="width:80px;height:80px;background:linear-gradient(135deg,#6df1c4,#3af19a);border-radius:20px;animation: squish-w 1.4s ease-in-out infinite"></div></div></div>`})
// 882 Squish on click
const P882 = defineComponent({ setup(){ const k=ref(0); return {k} }, template:`<div class="wow"><div class="stage" style="background:#0e1320;display:grid;place-items:center"><div :key="k" @click="k++" style="width:60px;height:60px;background:var(--accent-warn);border-radius:14px;cursor:pointer;animation: squish-w .35s cubic-bezier(.5,1.6,.6,1)"></div></div></div>`})
// 883 Holographic avatar
const P883 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#000;display:grid;place-items:center"><div style="width:80px;height:80px;border-radius:50%;background:conic-gradient(from 0deg, #ff8af0, #8b8cf7, #6ad9c4, #f5c161, #ff8af0);animation: spin-w 4s linear infinite;box-shadow: 0 0 24px rgba(139,140,247,0.5)"></div></div></div>`})
// 884 Spectrum equalizer
const P884 = defineComponent({ setup(){ const bars=ref(Array.from({length:16},()=>10)); useInterval(()=>bars.value=bars.value.map(()=>10+Math.random()*40),120); return {bars} }, template:`<div class="wow"><div class="stage" style="background:#0e1320;display:flex;align-items:flex-end;gap:3px;padding:10px"><div v-for="(h,i) in bars" :key="i" :style="{flex:1,height:h+'px',background:'linear-gradient(180deg, #ff8af0, #6ad9c4)',borderRadius:'2px',transition:'height .12s'}"/></div></div>`})
// 885 Audio-reactive blob
const P885 = defineComponent({ setup(){ const s=ref(1); useInterval(()=>s.value=0.8+Math.random()*0.6,150); return {s} }, template:`<div class="wow"><div class="stage" style="background:#0e1320;display:grid;place-items:center"><div :style="{width:'80px',height:'80px',borderRadius:'50%',background:'radial-gradient(circle at 30% 30%, #ff8af0, #6ad9c4)',transform:'scale('+s+')',transition:'transform .12s',filter:'blur(2px)'}"></div></div></div>`})
// 886 Pulsing aurora ring
const P886 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0b0c14;display:grid;place-items:center"><div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#7d6df1,#6df1c4);position:relative"><div style="position:absolute;inset:-8px;border-radius:50%;border:2px solid #7d6df1;animation: pulse-ring 2s ease-out infinite"></div></div></div></div>`})
// 887 Halo glow on focus
const P887 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0e1320;display:grid;place-items:center"><input style="background:transparent;border:1px solid var(--line);color:#fff;padding:8px;border-radius:6px;outline:none;box-shadow: 0 0 0 4px rgba(139,140,247,0.5)"/></div></div>`})
// 888 Gradient text shimmer
const P888 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0b0c14;display:grid;place-items:center"><span style="font-size:32px;font-weight:900;background:linear-gradient(90deg,#ff8af0,#8b8cf7,#6ad9c4,#ff8af0);background-size:300% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation: shimmer-w 3s linear infinite">SHINE</span></div></div>`})
// 889 Kaleidoscope
const P889 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#000;display:grid;place-items:center"><div style="width:100px;height:100px;background:conic-gradient(from 0deg, #ff8af0 0 60deg, #6ad9c4 60deg 120deg, #f5c161 120deg 180deg, #8b8cf7 180deg 240deg, #f17d6d 240deg 300deg, #ff8af0 300deg 360deg);clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);animation: spin-w 6s linear infinite"></div></div></div>`})
// 890 3D parallax depth
const P890 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0e1320;perspective:600px;display:grid;place-items:center"><div style="position:relative;width:160px;height:90px;transform-style:preserve-3d;transform:rotateY(20deg) rotateX(10deg)"><div style="position:absolute;inset:0;background:#7d6df1;border-radius:8px"></div><div style="position:absolute;inset:6px;background:#6ad9c4;border-radius:8px;transform:translateZ(20px)"></div><div style="position:absolute;inset:14px;background:#f5c161;border-radius:8px;transform:translateZ(40px)"></div></div></div></div>`})
// 891 Animated checkmark draw
const P891 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0e1320;display:grid;place-items:center"><svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="none" stroke="var(--accent-good)" stroke-width="3"/><polyline points="22,42 36,56 60,30" fill="none" stroke="var(--accent-good)" stroke-width="4" stroke-linecap="round" stroke-dasharray="60" stroke-dashoffset="60" style="animation: draw-w 1.2s ease-out forwards"/></svg></div></div>`})
// 892 Heart beat
const P892 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0b0c14;display:grid;place-items:center"><div style="font-size:48px;color:#f97b7b;animation: squish-w 0.9s ease-in-out infinite">♥</div></div></div>`})
// 893 Star sparkle
const P893 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0b0c14;display:grid;place-items:center"><div style="font-size:36px;color:#f5c161;text-shadow:0 0 12px #f5c161;animation: blink-w 1.4s steps(2) infinite">✦</div></div></div>`})
// 894 Particle text scatter
const P894 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0b0c14;display:grid;place-items:center;position:relative"><span v-for="(c,i) in 'PARTICLES'" :key="i" :style="{display:'inline-block',color:'hsl('+(i*40)+',80%,60%)',fontSize:'18px',fontWeight:'800',animation:'float-w 2s ease-in-out infinite',animationDelay:(i*0.1)+'s'}">{{ c }}</span></div></div>`})
// 895 Glow pulse halo
const P895 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0b0c14;display:grid;place-items:center"><div style="width:50px;height:50px;border-radius:50%;background:#fff;position:relative"><div style="position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(circle, rgba(139,140,247,0.6), transparent 70%);animation: pulse-ring 2s ease-out infinite"></div></div></div></div>`})
// 896 Neon underline sweep
const P896 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#000;display:grid;place-items:center"><span style="color:#fff;font-size:24px;font-weight:700;position:relative">SWEEP<span style="position:absolute;left:0;right:0;bottom:-4px;height:3px;background:linear-gradient(90deg,#ff8af0,#6ad9c4);animation: shimmer-w 2s linear infinite;background-size:200% 100%"></span></span></div></div>`})
// 897 Neon button hover
const P897 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0b0c14;display:grid;place-items:center"><button style="padding:12px 24px;background:transparent;color:#6ad9c4;border:2px solid #6ad9c4;border-radius:8px;font-weight:700;text-shadow:0 0 8px #6ad9c4;box-shadow:0 0 12px rgba(106,217,196,0.4)">NEON</button></div></div>`})
// 898 3D card flip
const P898 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#0e1320;display:grid;place-items:center;perspective:600px"><div style="width:120px;height:80px;transform-style:preserve-3d;animation: spin-w 5s linear infinite"><div style="position:absolute;inset:0;background:linear-gradient(135deg,#7d6df1,#3a64f1);border-radius:8px;backface-visibility:hidden;display:grid;place-items:center;color:#fff;font-weight:800">A</div><div style="position:absolute;inset:0;background:linear-gradient(135deg,#6df1c4,#3af19a);border-radius:8px;backface-visibility:hidden;transform:rotateY(180deg);display:grid;place-items:center;color:#0b0c14;font-weight:800">B</div></div></div></div>`})
// 899 Crystal lens distort
const P899 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:linear-gradient(135deg,#7d6df1,#6df1c4);display:grid;place-items:center;position:relative"><div style="width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.18);backdrop-filter: blur(6px) hue-rotate(60deg);border:1px solid rgba(255,255,255,0.4);box-shadow: inset -4px -4px 12px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.4)"></div></div></div>`})
// 900 Cinematic letterbox reveal
const P900 = defineComponent({ template:`<div class="wow"><div class="stage" style="background:#fff;display:grid;place-items:center;position:relative;overflow:hidden"><div style="font-size:32px;font-weight:800;color:#0b0c14">CINEMA</div><div style="position:absolute;left:0;right:0;top:0;height:30%;background:#000"></div><div style="position:absolute;left:0;right:0;bottom:0;height:30%;background:#000"></div></div></div>`})

const meta = [
  C(851,'Confetti burst',         'Radial particle burst from the centre.',P851),
  C(852,'Aurora gradient bg',     'Slow shimmering aurora background.',P852),
  C(853,'Glitch text',            'RGB-split glitch over a title.',P853),
  C(854,'Neon glow border',       'Pink neon outlined badge.',P854),
  C(855,'3D card tilt',           'Card tilting back and forth in 3D.',P855),
  C(856,'Holographic shimmer',    'Holo gradient sweeping across a card.',P856),
  C(857,'Liquid blob morph',      'Organic blob shape morphing forever.',P857),
  C(858,'Plasma background',      'Multi-radial gradient with hue rotation.',P858),
  C(859,'Galaxy starfield',       'Twinkling star background.',P859),
  C(860,'Lightning bolt',         'Glowing flickering lightning.',P860),
  C(861,'Snowfall',               'Falling snow particles.',P861),
  C(862,'Rainfall',               'Falling rain streaks.',P862),
  C(863,'Disco ball spin',        'Spinning chrome disco ball.',P863),
  C(864,'Lava lamp blobs',        'Floating colourful blurry blobs.',P864),
  C(865,'Vortex spinner',         'Concentric dashed circles spinning.',P865),
  C(866,'Morphing icon',          'SVG circle morphs into a blob.',P866),
  C(867,'Iridescent gradient',    'Spinning conic-gradient rainbow.',P867),
  C(868,'Glassmorphism card',     'Frosted-glass card on a colorful bg.',P868),
  C(869,'Neumorphism button',     'Soft inset shadow button.',P869),
  C(870,'Frosted glass overlay',  'Frosted overlay over a vivid bg.',P870),
  C(871,'Bouncy spring',          'Click-to-bounce squishy button.',P871),
  C(872,'Magnetic cursor',        'Cursor "pulled" toward a target.',P872),
  C(873,'Cursor sparkle trail',   'Glowing trail of dots.',P873),
  C(874,'Page peel',              'Bottom-right page-corner peel.',P874),
  C(875,'Card stack 3D',          'Layered cards with depth offset.',P875),
  C(876,'Conic spinner',          'Conic-gradient ring loader.',P876),
  C(877,'Animated wave bg',       'Two waves scrolling endlessly.',P877),
  C(878,'Water ripple click',     'Click anywhere → expanding ring.',P878),
  C(879,'Ink splash',             'Static ink-splash SVG art.',P879),
  C(880,'Smoke trail',            'Diminishing fade-blurred orbs.',P880),
  C(881,'Wobble jelly',           'Jelly-like square wobbling.',P881),
  C(882,'Squish on click',        'Click squishes the box.',P882),
  C(883,'Holographic avatar',     'Conic-gradient circular avatar.',P883),
  C(884,'Spectrum equalizer',     'Audio-reactive bar equalizer.',P884),
  C(885,'Audio-reactive blob',    'Blob that scales with "audio".',P885),
  C(886,'Pulsing aurora ring',    'Pulsing halo around a sphere.',P886),
  C(887,'Halo glow on focus',     'Input gains a colored halo on focus.',P887),
  C(888,'Gradient text shimmer',  'Animated gradient over text.',P888),
  C(889,'Kaleidoscope',           'Spinning conic clipped shape.',P889),
  C(890,'3D parallax depth',      'Layered tiles popping forward.',P890),
  C(891,'Checkmark draw',         'Checkmark stroke-draws into a circle.',P891),
  C(892,'Heart beat',             'Pulsing heart emoji.',P892),
  C(893,'Star sparkle',           'Glowing blinking star.',P893),
  C(894,'Particle text scatter',  'Letters bobbing independently.',P894),
  C(895,'Glow pulse halo',        'Soft outward glow pulse.',P895),
  C(896,'Neon underline sweep',   'Animated underline gradient sweep.',P896),
  C(897,'Neon button hover',      'Cyan neon outlined button.',P897),
  C(898,'3D card flip',           'Card rotating to reveal its back.',P898),
  C(899,'Crystal lens',           'Frosted glass lens with hue distortion.',P899),
  C(900,'Cinematic letterbox',    'Black bars top/bottom over content.',P900),
]

export default meta.map(m => ({ ...m, category:'Visual Wow' }))
