import { defineComponent } from 'vue'
import { ref, onMounted, onUnmounted, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('multimodal', `
.mm-shell { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.mm-mic { width:64px;height:64px; border-radius:50%; border:none; cursor:pointer; display:grid; place-items:center; color:#0b0c14; font-size:22px; transition: transform .12s; }
.mm-wave { display:flex; align-items:center; gap:3px; height:40px; justify-content:center; }
.mm-wave > div { width:4px; background: var(--accent); border-radius:2px; }
.mm-zone { border:2px dashed var(--line-2); border-radius:10px; padding:18px; text-align:center; transition: all .15s; }
.mm-zone.over { border-color: var(--accent); background: rgba(139,140,247,0.08); }
.mm-tray { display:flex; gap:6px; align-items:center; }
.mm-tray > button { padding:6px 8px; }
.mm-cam { width:160px;height:120px;border-radius:10px; background: linear-gradient(135deg,#1f2333,#0e1320); position:relative; }
`)

// 51 — Push-to-talk
const P51 = defineComponent({
  setup() {
    const holding = ref(false)
    const sec = ref(0)
    let t = null
    function down() { holding.value = true; sec.value = 0; t = setInterval(() => sec.value++, 1000) }
    function up()   { holding.value = false; clearInterval(t) }
    return { holding, sec, down, up }
  },
  template: `
    <div class="mm-shell" style="align-items:center;justify-content:center">
      <button class="mm-mic" :style="{background: holding?'var(--accent-bad)':'var(--accent)', transform: holding?'scale(1.12)':'scale(1)'}"
              @mousedown="down" @mouseup="up" @mouseleave="up"
              @touchstart.prevent="down" @touchend.prevent="up">{{ holding?'■':'🎤' }}</button>
      <div class="dim" style="font-size:12px">{{ holding ? 'Listening 0:'+String(sec).padStart(2,'0') : 'Hold to talk' }}</div>
    </div>`,
})

// 52 — Live waveform
const P52 = defineComponent({
  setup() {
    const bars = ref(Array.from({length:24}, () => 6))
    useInterval(() => bars.value = bars.value.map(() => 4 + Math.random()*32), 90)
    return { bars }
  },
  template: `
    <div class="mm-shell">
      <div class="mm-wave"><div v-for="(h,i) in bars" :key="i" :style="{height: h+'px', opacity: 0.4 + h/40, background:'var(--accent)'}"></div></div>
      <div class="dim" style="font-size:11px">live mic input level</div>
    </div>`,
})

// 53 — Live transcript caption
const P53 = defineComponent({
  setup() {
    const words = "you can ask me anything about your codebase right now".split(' ')
    const shown = ref([])
    let i = 0
    useInterval(() => {
      if (i < words.length) shown.value.push(words[i++])
      else { shown.value = []; i = 0 }
    }, 220)
    return { shown }
  },
  template: `
    <div class="mm-shell" style="align-items:center;justify-content:center">
      <div style="background:#000; color:#fff; padding:8px 12px; border-radius:8px; font-size:14px;">
        <span v-for="(w,i) in shown" :key="i" style="display:inline-block;animation:fadeUp .25s ease-out;margin-right:4px">{{ w }}</span>
        <style>@keyframes fadeUp { from { opacity:0; transform: translateY(4px) } to { opacity:1; transform:none } }</style>
      </div>
      <div class="dim" style="font-size:11px">interim transcript appears as you speak</div>
    </div>`,
})

// 54 — Image drop zone
const P54 = defineComponent({
  setup() {
    const over = ref(false)
    const dropped = ref(null)
    function drop(e) {
      e.preventDefault(); over.value = false
      const f = e.dataTransfer?.files?.[0]
      if (f) {
        const r = new FileReader()
        r.onload = () => dropped.value = r.result
        r.readAsDataURL(f)
      } else {
        dropped.value = 'placeholder'
      }
    }
    return { over, dropped, drop }
  },
  template: `
    <div class="mm-shell">
      <div class="mm-zone" :class="{over}"
           @dragover.prevent="over=true" @dragleave="over=false" @drop="drop">
        <div v-if="!dropped">
          <div style="font-size:24px">📥</div>
          <div>Drop an image here, or click</div>
        </div>
        <div v-else>
          <div :style="{width:'80px',height:'80px',borderRadius:'8px',margin:'0 auto',background: dropped==='placeholder'?'var(--accent-2)':'#000', backgroundImage: dropped!=='placeholder'?'url('+dropped+')':null, backgroundSize:'cover'}"></div>
          <div class="dim" style="font-size:11px;margin-top:6px">image attached</div>
        </div>
      </div>
    </div>`,
})

// 55 — Screen-share with annotation
const P55 = defineComponent({
  template: `
    <div class="mm-shell">
      <div style="position:relative; height:140px; background: linear-gradient(135deg,#1f2333,#0e1320); border-radius:10px; overflow:hidden">
        <div style="position:absolute;left:8px;top:8px" class="chip bad">● LIVE share</div>
        <div style="position:absolute; left:30%; top:30%; width:40%; height:40%; border:2px dashed var(--accent-bad); border-radius:6px;"></div>
        <div style="position:absolute; left:30%; top:74%; color:var(--accent-bad); font-size:11px;">agent is watching this region</div>
      </div>
    </div>`,
})

// 56 — Camera context tile
const P56 = defineComponent({
  template: `
    <div class="mm-shell" style="align-items:center;justify-content:center">
      <div class="mm-cam">
        <div class="chip bad" style="position:absolute;left:6px;top:6px">● LIVE</div>
        <div style="position:absolute; inset:0; display:grid; place-items:center; color:var(--text-mute)">[ camera ]</div>
        <button class="btn-mini" style="position:absolute;right:6px;top:6px">×</button>
      </div>
      <div class="dim" style="font-size:11px">corner camera tile shared with the agent</div>
    </div>`,
})

// 57 — Voice barge-in
const P57 = defineComponent({
  setup() {
    const speaking = ref(true)
    const text = ref('I can give you a longer explanation about how reactivity works in Vue 3 — feel free to interrupt me at any time…')
    return { speaking, text }
  },
  template: `
    <div class="mm-shell">
      <div class="surface-2" style="padding:10px">{{ speaking ? text : '[listening to you]' }}<span v-if="speaking" class="caret"/></div>
      <button class="btn-mini" @click="speaking=!speaking" :style="{alignSelf:'flex-start', background:speaking?'var(--accent-bad)':'var(--accent)', color:'#0b0c14'}">{{ speaking?'⏸ Tap to interrupt':'🎤 Speak again' }}</button>
    </div>`,
})

// 58 — Speaker pulse for multi-voice
const P58 = defineComponent({
  setup() {
    const i = ref(0)
    useInterval(() => i.value = (i.value+1)%3, 1500)
    return { i }
  },
  template: `
    <div class="mm-shell" style="align-items:center;justify-content:center">
      <div style="display:flex;gap:18px">
        <div v-for="k in 3" :key="k" :style="{width:'40px',height:'40px',borderRadius:'50%',background:'var(--bg-3)', border:'2px solid '+(i===k-1?'var(--accent)':'var(--line)'), display:'grid', placeItems:'center', boxShadow: i===k-1 ? '0 0 0 6px rgba(139,140,247,0.18)' : 'none', transition:'all .3s'}">{{ ['A','B','C'][k-1] }}</div>
      </div>
      <div class="dim" style="font-size:11px">speaker {{ ['A','B','C'][i] }} is talking</div>
    </div>`,
})

// 59 — Multimodal attachment tray
const P59 = defineComponent({
  setup() {
    const open = ref(false)
    const opts = [{ i:'🖼️', t:'Image' }, { i:'📎', t:'File' }, { i:'🎙️', t:'Audio' }, { i:'🖥️', t:'Screen' }]
    return { open, opts }
  },
  template: `
    <div class="mm-shell">
      <div class="mm-tray">
        <button class="btn-mini" @click="open=!open">＋</button>
        <input style="flex:1" placeholder="Type a message…"/>
        <button class="primary">Send</button>
      </div>
      <div v-if="open" class="surface-2" style="padding:8px;display:flex;gap:6px">
        <button v-for="o in opts" :key="o.t" class="btn-mini">{{ o.i }} {{ o.t }}</button>
      </div>
    </div>`,
})

// 60 — Sketch-to-image input
const P60 = defineComponent({
  setup() {
    const path = ref('')
    let drawing = false
    function down(e) { drawing = true; const r=e.currentTarget.getBoundingClientRect(); path.value += `M ${e.clientX-r.left} ${e.clientY-r.top} ` }
    function move(e) { if (!drawing) return; const r=e.currentTarget.getBoundingClientRect(); path.value += `L ${e.clientX-r.left} ${e.clientY-r.top} ` }
    function up() { drawing = false }
    function clear() { path.value = '' }
    return { path, down, move, up, clear }
  },
  template: `
    <div class="mm-shell">
      <svg width="100%" height="120" style="background:#fff;border-radius:8px;cursor:crosshair"
           @mousedown="down" @mousemove="move" @mouseup="up" @mouseleave="up">
        <path :d="path" fill="none" stroke="#0b0c14" stroke-width="2"/>
      </svg>
      <div class="row-c"><button class="btn-mini" @click="clear">Clear</button><button class="btn-mini" :disabled="!path" style="margin-left:auto">Send sketch →</button></div>
    </div>`,
})

const meta = [
  { id:51, name:'Push-to-talk',         shortDesc:'Hold a big mic button to record; release to send.', inspiration:'Discord, WhisperType', tags:['voice'], component:P51 },
  { id:52, name:'Live waveform',        shortDesc:'Audio waveform reacts to mic input volume in real time.', inspiration:'ChatGPT voice', tags:['voice'], component:P52 },
  { id:53, name:'Live transcript',      shortDesc:'Speech-to-text appears word-by-word as you speak.', inspiration:'ChatGPT voice', tags:['voice','captions'], component:P53 },
  { id:54, name:'Image drop zone',      shortDesc:'Drag-and-drop images with hover state and preview.', inspiration:'ChatGPT, Gemini', tags:['multimodal','image'], component:P54 },
  { id:55, name:'Screen-share to agent',shortDesc:'Share a screen region with annotated focus rectangle.', inspiration:'Gemini Live, Cluely', tags:['multimodal'], component:P55 },
  { id:56, name:'Camera context tile',  shortDesc:'Floating webcam tile the agent can reference.', inspiration:'Gemini Live', tags:['multimodal'], component:P56 },
  { id:57, name:'Voice barge-in',       shortDesc:'Tap to interrupt the agent mid-speech and start talking.', inspiration:'OpenAI Realtime', tags:['voice'], component:P57 },
  { id:58, name:'Speaker pulse',        shortDesc:'Active speaker\'s avatar pulses in a multi-voice conversation.', inspiration:'Zoom AI Companion', tags:['voice'], component:P58 },
  { id:59, name:'Attachment tray',      shortDesc:'+ button reveals image/file/audio/screen options.', inspiration:'ChatGPT, Gemini', tags:['multimodal'], component:P59 },
  { id:60, name:'Sketch input',         shortDesc:'Doodle a quick hint to give the AI layout context.', inspiration:'tldraw makereal', tags:['multimodal'], component:P60 },
]

export default meta.map(m => ({ ...m, category:'Voice & Multimodal' }))
