import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('mm-extra', `
.mmx { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.mmx .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.mmx .row  { display:flex; gap:6px; align-items:center; }
.mmx .ph   { background: linear-gradient(135deg,#1f2740,#0e1320); border-radius:8px; }
@keyframes vu { 0%,100%{height:6px} 50%{height:24px} }
.mmx .vu > div { width:4px; background:var(--accent); border-radius:2px; animation: vu 1.2s ease-in-out infinite; }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'multimodal AI products', tags: extra.tags||['multimodal'], component: comp })

const P301 = defineComponent({ template:`<div class="mmx" style="align-items:center;justify-content:center"><div class="ph" style="width:160px;height:120px;display:grid;place-items:center">📷</div><button class="mini" style="background:var(--accent);color:#0b0c14">capture</button></div>`})
const P302 = defineComponent({ template:`<div class="mmx" style="align-items:center;justify-content:center"><div class="card" style="position:relative;width:160px;height:120px;background:linear-gradient(135deg,#7d6df1,#3a64f1)"><div style="position:absolute;left:8px;bottom:8px;color:#fff" class="mono">Aiden · agent</div><div class="chip bad" style="position:absolute;right:8px;top:8px">● live</div></div></div>`})
const P303 = defineComponent({ template:`<div class="mmx"><div class="dim">VAD</div><div class="row vu" style="align-items:flex-end"><div v-for="i in 8" :key="i" :style="{animationDelay:(i*0.1)+'s'}"/></div></div>`})
const P304 = defineComponent({ template:`<div class="mmx row"><span class="chip">🌐 EN</span><span class="chip">🌐 KO (auto)</span><span class="mute" style="font-size:11px">language auto-detected</span></div>`})
const P305 = defineComponent({ template:`<div class="mmx"><div class="row"><b>tone</b><span class="chip good" style="margin-left:auto">excited</span></div><div class="dim" style="font-size:11px">pitch ↑ · pace ↑</div></div>`})
const P306 = defineComponent({ setup(){ const v=ref(1); return {v} }, template:`<div class="mmx"><div class="row"><span>speed</span><input type="range" min="0.5" max="2" step="0.1" v-model.number="v" style="flex:1"/><span class="mono">{{ v.toFixed(1) }}×</span></div></div>`})
const P307 = defineComponent({ setup(){ const v=ref('Aria'); return {v} }, template:`<div class="mmx row"><span>voice</span><select v-model="v"><option>Aria</option><option>Kai</option><option>Lyra</option><option>Nova</option></select><button class="mini">▶ preview</button></div>`})
const P308 = defineComponent({ template:`<div class="mmx"><div class="dim" style="font-size:11px">level</div><div style="height:8px;background:var(--bg-3);border-radius:4px;overflow:hidden"><div style="width:60%;height:100%;background:linear-gradient(90deg,var(--accent-good),var(--accent-warn),var(--accent-bad))"/></div></div>`})
const P309 = defineComponent({ setup(){ const m=ref(false); return {m} }, template:`<div class="mmx"><button class="mini" @click="m=!m" :style="{background:m?'var(--accent-bad)':'var(--accent)',color:'#0b0c14',width:'fit-content'}">{{ m?'🔇 muted':'🔈 unmuted' }}</button></div>`})
const P310 = defineComponent({ setup(){ const p=ref(35); return {p} }, template:`<div class="mmx card row"><button class="mini">▶</button><input type="range" min="0" max="100" v-model.number="p" style="flex:1"/><span class="mono mute" style="font-size:11px">{{ Math.floor(p*0.42) }}s</span></div>`})
const P311 = defineComponent({ template:`<div class="mmx" style="align-items:center"><div class="ph" style="width:160px;height:120px;position:relative"><div style="position:absolute;left:20%;top:20%;width:60%;height:60%;border:2px dashed var(--accent-warn)"></div></div><div class="dim" style="font-size:11px">crop area</div></div>`})
const P312 = defineComponent({ template:`<div class="mmx" style="align-items:center"><div class="ph" style="width:160px;height:120px;position:relative"><div style="position:absolute;left:10%;top:30%;width:40%;height:40%;background:rgba(139,140,247,0.4);border:1px solid var(--accent)"/><div style="position:absolute;left:60%;top:20%;width:30%;height:30%;background:rgba(245,193,97,0.4);border:1px solid var(--accent-warn)"/></div></div>`})
const P313 = defineComponent({ template:`<div class="mmx" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="ph" style="aspect-ratio:1"></div><div class="ph" style="aspect-ratio:1;background:linear-gradient(135deg,#f17d3a,#7d6df1)"></div></div>`})
const P314 = defineComponent({ template:`<div class="mmx"><svg width="100%" height="40" viewBox="0 0 240 40"><polyline points="0,20 20,12 40,28 60,18 80,30 100,15 120,22 140,10 160,32 180,18 200,24 220,16 240,20" stroke="var(--accent)" fill="none" stroke-width="2"/><line x1="120" y1="0" x2="120" y2="40" stroke="var(--accent-bad)" stroke-width="2"/></svg></div>`})
const P315 = defineComponent({ template:`<div class="mmx card"><div class="dim mono" style="font-size:11px">OCR · invoice.pdf · 96%</div><div style="margin-top:4px">"Total: <b>$129.40</b>"</div></div>`})
const P316 = defineComponent({ template:`<div class="mmx" style="align-items:center"><div class="row"><button class="mini">‹</button><span class="card mono" style="padding:4px 10px">page 3 / 24</span><button class="mini">›</button></div></div>`})
const P317 = defineComponent({ template:`<div class="mmx row"><span class="chip">😊 confident</span><span class="chip">🙂 calm</span><span class="dim" style="font-size:11px">webcam-detected</span></div>`})
const P318 = defineComponent({ template:`<div class="mmx" style="align-items:center"><div class="ph" style="width:160px;height:90px;display:grid;place-items:center;color:#fff;font-weight:800;font-size:18px">"Quote on image"</div></div>`})
const P319 = defineComponent({ template:`<div class="mmx" style="align-items:center"><div class="card" style="font-size:36px;width:80px;height:80px;display:grid;place-items:center">🎉</div></div>`})
const P320 = defineComponent({ template:`<div class="mmx"><div class="ph" style="height:100px;position:relative"><svg viewBox="0 0 200 100" width="100%" height="100"><path d="M20 80 L 80 20 L 140 60 L 180 30" fill="none" stroke="var(--accent-warn)" stroke-width="3"/></svg></div></div>`})
const P321 = defineComponent({ template:`<div class="mmx ph" style="position:relative;height:100px"><div style="position:absolute;left:30%;top:30%;width:50%;height:50%;border:2px solid var(--accent);border-radius:4px"></div><div class="chip accent" style="position:absolute;left:30%;top:18%">cat 0.92</div></div>`})
const P322 = defineComponent({ template:`<div class="mmx"><div style="display:flex;gap:6px;overflow:auto"><div v-for="i in 6" :key="i" class="ph" :style="{minWidth:'80px',aspectRatio:'1',background:'linear-gradient(135deg, hsl('+(i*60)+',60%,40%), hsl('+(i*60+30)+',60%,30%))'}"></div></div></div>`})
const P323 = defineComponent({ template:`<div class="mmx" style="align-items:center;justify-content:center"><div style="font-size:40px">🤖</div><div class="dim mono" style="font-size:11px">animated mouth syncs to TTS</div></div>`})
const P324 = defineComponent({ template:`<div class="mmx card mono" style="font-size:11px"><div>00:01 · A: hi</div><div>00:03 · B: hello</div><div>00:05 · A: what's up?</div></div>`})
const P325 = defineComponent({ template:`<div class="mmx card"><span class="chip accent">A</span> Hello team — let's start.</div>`})
const P326 = defineComponent({ setup(){ const f=ref('front'); return {f} }, template:`<div class="mmx row"><button class="mini" @click="f='front'" :style="{background:f==='front'?'var(--accent)':null,color:f==='front'?'#0b0c14':null}">front</button><button class="mini" @click="f='back'" :style="{background:f==='back'?'var(--accent)':null,color:f==='back'?'#0b0c14':null}">back</button><span class="dim mono" style="font-size:11px">{{ f }} camera</span></div>`})
const P327 = defineComponent({ template:`<div class="mmx ph" style="height:120px;position:relative;display:grid;place-items:center"><div style="font-size:48px;opacity:.7">📐</div><div class="dim mono" style="font-size:11px;position:absolute;bottom:6px">AR overlay</div></div>`})
const P328 = defineComponent({ setup(){ const c=ref(60),s=ref(50); return {c,s} }, template:`<div class="mmx"><div class="row"><span style="width:60px">color</span><input type="range" min="0" max="360" v-model.number="c" style="flex:1"/></div><div class="row"><span style="width:60px">sat</span><input type="range" min="0" max="100" v-model.number="s" style="flex:1"/></div><div class="ph" :style="{height:'40px',background:'hsl('+c+','+s+'%,40%)'}"></div></div>`})
const P329 = defineComponent({ setup(){ const on=ref(true); return {on} }, template:`<div class="mmx row"><label><input type="checkbox" v-model="on"/> noise reduction</label><span class="dim" style="font-size:11px">{{ on?'background hush enabled':'raw audio' }}</span></div>`})
const P330 = defineComponent({ template:`<div class="mmx card mono" style="font-size:12px"><span style="background:rgba(109,212,154,0.2)">hello</span> <span style="background:rgba(245,193,97,0.2)">world</span> <span style="background:rgba(249,123,123,0.2)">how</span> <span style="background:rgba(109,212,154,0.2)">are</span> you</div>`})
const P331 = defineComponent({ template:`<div class="mmx card"><div class="dim mono" style="font-size:11px">live caption · ko → en</div><div>"안녕 → <b>hello</b>"</div></div>`})
const P332 = defineComponent({ template:`<div class="mmx" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px"><div v-for="(s,i) in ['photo','sketch','vangogh']" :key="s" class="ph" style="aspect-ratio:1"><div class="dim" style="font-size:10px;text-align:center">{{ s }}</div></div></div>`})
const P333 = defineComponent({ template:`<div class="mmx ph" style="height:120px;position:relative"><div style="position:absolute;left:30%;top:30%;width:40%;height:40%;background:rgba(255,255,255,0.2);border:2px dashed var(--accent-warn)"/><div class="dim" style="font-size:11px;position:absolute;bottom:6px;left:8px">inpaint area</div></div>`})
const P334 = defineComponent({ template:`<div class="mmx" style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px"><div v-for="i in 9" :key="i" class="ph" :style="{aspectRatio:'1',background:'hsl('+(i*40)+',60%,40%)'}"></div></div>`})
const P335 = defineComponent({ template:`<div class="mmx card row"><div class="ph" style="width:48px;height:48px"></div><div><div class="mono">photo.jpg · 1024×768</div><div class="mute" style="font-size:11px">EXIF · ISO 400 · f/2.8 · Tokyo</div></div></div>`})
const P336 = defineComponent({ setup(){ const s=ref(1); return {s} }, template:`<div class="mmx row"><span>speed</span><button class="mini" v-for="x in [0.25,0.5,1,2]" :key="x" @click="s=x" :style="{background:s===x?'var(--accent)':null,color:s===x?'#0b0c14':null}">{{ x }}×</button></div>`})
const P337 = defineComponent({ template:`<div class="mmx pill"><span class="dot pulse" style="background:var(--accent)"/>🎙 listening for "hey agent"</div>`})
const P338 = defineComponent({ setup(){ const arr=[2,1,-1,3,4,2,-2,1,3,5]; return {arr} }, template:`<div class="mmx"><div class="dim">audio sentiment</div><svg width="100%" height="40" viewBox="0 0 100 40"><polyline :points="arr.map((v,i)=>i*10+','+(20-v*3)).join(' ')" fill="none" stroke="var(--accent)" stroke-width="2"/><line x1="0" y1="20" x2="100" y2="20" stroke="var(--line-2)"/></svg></div>`})
const P339 = defineComponent({ template:`<div class="mmx ph" style="height:120px;position:relative;display:grid;place-items:center"><svg viewBox="0 0 60 100" width="40" height="80"><circle cx="30" cy="15" r="6" fill="none" stroke="var(--accent)"/><line x1="30" y1="21" x2="30" y2="55" stroke="var(--accent)"/><line x1="30" y1="30" x2="15" y2="50" stroke="var(--accent)"/><line x1="30" y1="30" x2="45" y2="50" stroke="var(--accent)"/><line x1="30" y1="55" x2="20" y2="85" stroke="var(--accent)"/><line x1="30" y1="55" x2="40" y2="85" stroke="var(--accent)"/></svg></div>`})
const P340 = defineComponent({ template:`<div class="mmx ph" style="height:120px;display:grid;place-items:center;font-size:36px">🧊</div>`})

const meta = [
  C(301,'Photo capture',         'Live preview with a capture button.',P301),
  C(302,'Agent video tile',      'Live video card representing the agent.',P302),
  C(303,'Voice activity bars',   'VAD display for mic input.',P303),
  C(304,'Auto-language badge',   'Detected language pill on a chat row.',P304),
  C(305,'Voice tone chip',       'Tone label inferred from speech.',P305),
  C(306,'TTS speed slider',      'Adjust playback speed of the assistant\'s voice.',P306),
  C(307,'TTS voice picker',      'Choose between named TTS voices.',P307),
  C(308,'Volume meter gradient', 'Color-graded loudness indicator.',P308),
  C(309,'Mute toggle',           'One-click microphone mute.',P309),
  C(310,'Audio scrubber',        'Play head + slider for an audio result.',P310),
  C(311,'Inline image crop',     'Drag a crop area over an image.',P311),
  C(312,'Segmentation overlay',  'Colored regions over an image (segmentation).',P312),
  C(313,'Image diff visual',     'Side-by-side before/after image comparison.',P313),
  C(314,'Audio waveform marker', 'Waveform with a current-position cursor.',P314),
  C(315,'OCR result preview',    'Extracted text from an OCR\'d document.',P315),
  C(316,'PDF page navigator',    'Page x/y navigator for a PDF reader.',P316),
  C(317,'Webcam emotion chips',  'Inferred emotion labels from the webcam.',P317),
  C(318,'Text on image render',  'Quote rendered on top of an image.',P318),
  C(319,'GIF reaction',          'Inline animated reaction.',P319),
  C(320,'Drawing pad annotation','Freehand strokes on an image.',P320),
  C(321,'Detection bbox + label','Object detection box with class + score.',P321),
  C(322,'Image gallery scroll',  'Horizontal-scrolling image strip.',P322),
  C(323,'Animated mouth bot',    'Avatar with a mouth that lipsyncs to TTS.',P323),
  C(324,'Video transcript',      'Synchronised transcript timestamps.',P324),
  C(325,'Speaker-labeled caption','Captions tagged by speaker.',P325),
  C(326,'Camera switcher',       'Toggle front / back camera.',P326),
  C(327,'AR overlay placeholder','Static AR-style overlay region.',P327),
  C(328,'Image attribute sliders','Color/saturation sliders adjust a swatch.',P328),
  C(329,'Noise reduction toggle','One-click background-noise removal.',P329),
  C(330,'Per-word STT confidence','Per-word colored confidence highlighting.',P330),
  C(331,'Live translate caption','Live caption translated into target language.',P331),
  C(332,'Style transfer preview','Multiple stylised renderings to choose from.',P332),
  C(333,'Inpaint area selector', 'Mask-style inpainting region selector.',P333),
  C(334,'Mood-board grid',       '3×3 grid of mood images.',P334),
  C(335,'Image with metadata',   'Thumb + EXIF / metadata side-text.',P335),
  C(336,'Slow-mo speed buttons', 'Discrete speed buttons (0.25× → 2×).',P336),
  C(337,'Wake-word listener',    '"Hey agent" wake-word listening pill.',P337),
  C(338,'Audio sentiment graph', 'Sparkline of sentiment over an audio clip.',P338),
  C(339,'Pose stick figure',     'SVG pose estimation overlay.',P339),
  C(340,'3D model viewer',       'Placeholder for an embedded 3D viewer.',P340),
]

export default meta.map(m => ({ ...m, category:'Voice & Multimodal' }))
