import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('onboard', `
.ob { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.ob .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.ob .row  { display:flex; gap:6px; align-items:center; }
.ob .empty{ display:grid; place-items:center; padding:18px; color: var(--text-mute); border:2px dashed var(--line-2); border-radius:10px; }
.ob .step { display:flex; gap:8px; align-items:center; }
.ob .dotg { width:10px; height:10px; border-radius:50%; }
@keyframes pulse2 { 0%,100%{ box-shadow: 0 0 0 0 rgba(139,140,247,0.5)} 50%{box-shadow: 0 0 0 12px rgba(139,140,247,0)} }
.ob .pulse { animation: pulse2 1.5s infinite; }
.ob .conf { position:absolute; pointer-events:none; }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'first-run UX', tags: extra.tags||['onboarding'], component: comp })

const P551 = defineComponent({ template:`<div class="ob card" style="text-align:center"><div style="font-size:36px">👋</div><b>Welcome to AiUx</b><div class="dim">Let's get you set up in under a minute.</div><button class="mini" style="background:var(--accent);color:#0b0c14;margin-top:6px">start</button></div>`})
const P552 = defineComponent({ template:`<div class="ob" style="position:relative"><div class="card pulse" style="border-color:var(--accent);position:absolute;left:30%;top:30%;padding:6px 10px">tour spotlight</div><div class="card" style="height:120px"></div></div>`})
const P553 = defineComponent({ template:`<div class="ob"><div class="card row pulse"><b>Step 1 / 4</b><span style="flex:1">Try typing a question below.</span><button class="mini">next →</button></div></div>`})
const P554 = defineComponent({ template:`<div class="ob row" style="justify-content:center"><div v-for="i in 4" :key="i" class="dotg" :style="{background: i===1?'var(--accent)':'var(--bg-3)'}"></div></div>`})
const P555 = defineComponent({ template:`<div class="ob empty"><div>📭</div><div>No conversations yet</div><div class="dim" style="font-size:11px">try a sample: "summarize my project"</div></div>`})
const P556 = defineComponent({ template:`<div class="ob card row"><div style="font-size:24px">🌱</div><div style="flex:1"><b>First time?</b><div class="dim" style="font-size:11px">walk through the basics in 60 seconds</div></div><button class="mini" style="background:var(--accent);color:#0b0c14">begin</button></div>`})
const P557 = defineComponent({ template:`<div class="ob card"><b>Quick quiz</b><div class="row" style="margin-top:6px"><button class="mini">developer</button><button class="mini">designer</button><button class="mini">researcher</button></div></div>`})
const P558 = defineComponent({ template:`<div class="ob"><div class="dim">what brings you here?</div><div class="row" style="flex-wrap:wrap"><button class="mini">build a chatbot</button><button class="mini">write content</button><button class="mini">analyze data</button></div></div>`})
const P559 = defineComponent({ template:`<div class="ob card"><b>setup checklist</b><div v-for="(d,t) in {'connect github':true,'choose model':true,'create first chat':false,'invite team':false}" :key="t" class="row"><span :style="{color:d?'var(--accent-good)':'var(--text-mute)'}">{{ d?'✓':'○' }}</span><span :style="{textDecoration:d?'line-through':null,color:d?'var(--text-mute)':null}">{{ t }}</span></div></div>`})
const P560 = defineComponent({ template:`<div class="ob" style="align-items:center;justify-content:center"><div style="font-size:48px;animation: pulse2 2s infinite">👋</div><div class="dim">Hi, I'm your AI agent.</div></div>`})
const P561 = defineComponent({ template:`<div class="ob"><div class="dim">try one of these</div><div class="row" style="flex-wrap:wrap"><button class="mini">"summarize my docs"</button><button class="mini">"refactor this fn"</button><button class="mini">"draft an email"</button></div></div>`})
const P562 = defineComponent({ template:`<div class="ob card"><b>your goal</b><select style="margin-top:4px;width:100%"><option>Ship faster</option><option>Reduce cost</option><option>Learn</option></select></div>`})
const P563 = defineComponent({ template:`<div class="ob card"><b>self-assessment</b><div class="row"><span style="width:50px">JS</span><input type="range" style="flex:1"/></div><div class="row"><span style="width:50px">SQL</span><input type="range" style="flex:1"/></div></div>`})
const P564 = defineComponent({ template:`<div class="ob row"><div v-for="t in ['Free','Pro','Team']" :key="t" class="card" style="flex:1;text-align:center"><b>{{ t }}</b><div class="dim" style="font-size:11px">{{ t==='Free'?'$0':t==='Pro'?'$20':'$80' }}/mo</div></div></div>`})
const P565 = defineComponent({ template:`<div class="ob card"><b>permissions</b><div v-for="(d,p) in {'read your files':true,'send emails':false,'spend budget':false}" :key="p" class="row"><label style="flex:1">{{ p }}</label><input type="checkbox" :checked="d"/></div></div>`})
const P566 = defineComponent({ template:`<div class="ob card"><b>privacy</b><label class="row"><input type="checkbox" checked/> don't train on my data</label></div>`})
const P567 = defineComponent({ template:`<div class="ob card"><b>notify me about</b><label class="row"><input type="checkbox" checked/> agent results</label><label class="row"><input type="checkbox"/> weekly digest</label></div>`})
const P568 = defineComponent({ template:`<div class="ob card"><b>connect</b><div class="row"><button class="mini">GitHub</button><button class="mini">Slack</button><button class="mini">Linear</button></div></div>`})
const P569 = defineComponent({ template:`<div class="ob card"><b>choose your model</b><div class="row"><button class="mini" style="background:var(--accent);color:#0b0c14">gpt-4o</button><button class="mini">gpt-4o-mini</button></div></div>`})
const P570 = defineComponent({ template:`<div class="ob row"><span>theme</span><button class="mini">🌙 dark</button><button class="mini">☀ light</button><button class="mini">⚙ system</button></div>`})
const P571 = defineComponent({ template:`<div class="ob card"><b>try a sample</b><div class="dim" style="font-size:12px">"explain the transformer in 3 sentences"</div><button class="mini" style="background:var(--accent);color:#0b0c14;margin-top:4px">run sample</button></div>`})
const P572 = defineComponent({ template:`<div class="ob card"><b>import from</b><div class="row"><button class="mini">ChatGPT export</button><button class="mini">Cursor .json</button></div></div>`})
const P573 = defineComponent({ template:`<div class="ob card"><b>tutorial chat</b><div class="dim" style="font-size:12px">"Start here — I'll walk you through the basics."</div></div>`})
const P574 = defineComponent({ template:`<div class="ob card" style="aspect-ratio:16/9;background:#000;display:grid;place-items:center;color:#fff">▶ 90-sec showcase video</div>`})
const P575 = defineComponent({ template:`<div class="ob row"><button class="mini">‹</button><div class="card" style="flex:1;aspect-ratio:16/9;background:linear-gradient(135deg,#7d6df1,#3a64f1)"></div><button class="mini">›</button></div>`})
const P576 = defineComponent({ template:`<div class="ob"><div class="row"><b>onboarding</b><span class="mute mono" style="margin-left:auto">3 / 5</span></div><div style="height:6px;background:var(--bg-3);border-radius:6px"><div style="width:60%;height:100%;background:var(--accent)"/></div></div>`})
const P577 = defineComponent({ template:`<div class="ob row"><button class="mini">skip tour</button><span class="dim" style="font-size:11px">you can replay it later</span></div>`})
const P578 = defineComponent({ template:`<div class="ob" style="align-items:center;justify-content:center"><div style="font-size:36px">🎉</div><b>You're all set!</b><div class="dim">have fun.</div></div>`})
const P579 = defineComponent({ template:`<div class="ob row" style="align-items:center;justify-content:center"><span style="font-size:24px">🔥</span><b>day 1 streak started</b></div>`})
const P580 = defineComponent({ template:`<div class="ob card"><div class="dim mono">welcome.eml</div><div style="font-size:12px;margin-top:4px">"Hi Alex, welcome to AiUx — here's what to try first…"</div></div>`})
const P581 = defineComponent({ template:`<div class="ob card" style="background:rgba(139,140,247,0.06);border-color:var(--accent)">🎁 <b>$5 free credits</b> · use them on your first chats.</div>`})
const P582 = defineComponent({ template:`<div class="ob card"><span class="chip accent">new</span><b style="margin-left:6px">memory v2</b><div class="dim" style="font-size:11px">your AI now remembers facts across chats.</div></div>`})
const P583 = defineComponent({ template:`<div class="ob"><div class="row"><div v-for="p in [['Free','$0','100 msgs'],['Pro','$20','unlimited'],['Team','$80','seat-based']]" :key="p[0]" class="card" style="flex:1;text-align:center"><b>{{ p[0] }}</b><div>{{ p[1] }}</div><div class="dim" style="font-size:11px">{{ p[2] }}</div></div></div></div>`})
const P584 = defineComponent({ template:`<div class="ob card row">🧪 <span style="flex:1"><b>sandbox</b> — try the agent on dummy data</span><button class="mini" style="background:var(--accent);color:#0b0c14">enter</button></div>`})
const P585 = defineComponent({ setup(){ const d=ref(true); return {d} }, template:`<div class="ob row"><label><input type="checkbox" v-model="d"/> use dummy data</label><span class="dim" style="font-size:11px">{{ d?'safe to play':'live data' }}</span></div>`})
const P586 = defineComponent({ template:`<div class="ob empty"><div style="font-size:36px">📭</div><b>No messages</b><div class="dim">your inbox is quiet for now.</div></div>`})
const P587 = defineComponent({ template:`<div class="ob row"><div style="font-size:30px">🤖</div><div><b>Hi! I'm Aiden.</b><div class="dim" style="font-size:12px">your AI agent — ask me anything.</div></div></div>`})
const P588 = defineComponent({ template:`<div class="ob card" style="background:rgba(109,212,154,0.06);border-color:var(--accent-good)">🚀 <b>quick win</b> · summarize a long doc in 1 click<button class="mini" style="margin-left:6px;background:var(--accent);color:#0b0c14">try</button></div>`})
const P589 = defineComponent({ template:`<div class="ob row"><div v-for="p in ['outline a blog','plan my week','review my code']" :key="p" class="card" style="flex:1;font-size:12px;text-align:center;cursor:pointer">"{{ p }}"</div></div>`})
const P590 = defineComponent({ template:`<div class="ob card empty"><div style="font-size:24px">📥</div>drag a file here to start</div>`})
const P591 = defineComponent({ template:`<div class="ob card row">💾 <span style="flex:1">save your first artifact</span><button class="mini" style="background:var(--accent);color:#0b0c14">save</button></div>`})
const P592 = defineComponent({ template:`<div class="ob card"><b>sample data ready</b><div class="dim" style="font-size:11px">200 customers · 1k transactions</div></div>`})
const P593 = defineComponent({ template:`<div class="ob row"><button class="mini">⏸ pause tour</button><button class="mini">▶ resume</button></div>`})
const P594 = defineComponent({ template:`<div class="ob card"><b>How was that?</b><div class="row"><button class="mini">😍</button><button class="mini">🙂</button><button class="mini">😐</button><button class="mini">😞</button></div></div>`})
const P595 = defineComponent({ template:`<div class="ob card"><b>Would you recommend AiUx?</b><div class="row" style="flex-wrap:wrap"><button v-for="i in 11" :key="i" class="mini">{{ i-1 }}</button></div></div>`})
const P596 = defineComponent({ template:`<div class="ob card" style="background:rgba(245,193,97,0.08);border-color:var(--accent-warn)">✨ <b>new feature</b> — let me show you in 30s<button class="mini" style="margin-left:6px">go</button></div>`})
const P597 = defineComponent({ template:`<div class="ob card row">💡 <span style="flex:1">tip of the day · use <b>/explain</b> to get plain-language summaries</span></div>`})
const P598 = defineComponent({ template:`<div class="ob row"><input style="flex:1" placeholder="search help…"/><button class="mini">?</button></div>`})
const P599 = defineComponent({ template:`<div class="ob card row" style="background:var(--accent);color:#0b0c14">💬 <span style="flex:1">need help?</span><button class="mini">chat</button></div>`})
const P600 = defineComponent({ template:`<div class="ob card"><b>report a bug</b><textarea style="width:100%;height:50px"></textarea><button class="mini" style="background:var(--accent);color:#0b0c14;margin-top:4px">submit</button></div>`})

const meta = [
  C(551,'Welcome modal',         'A friendly first-run welcome card.',P551),
  C(552,'Tour spotlight',        'Pulsing highlight over a target element.',P552),
  C(553,'Coachmark sequence',    'Step-by-step guided coachmarks.',P553),
  C(554,'Step dots',             'Tiny dots showing tour progress.',P554),
  C(555,'Empty state w/ example','Empty inbox plus a try-this hint.',P555),
  C(556,'First-time card',       'Floating "first time?" CTA.',P556),
  C(557,'Persona quiz',          'Quick quiz to pick a persona.',P557),
  C(558,'Use-case picker',       'Buttons to declare why you came.',P558),
  C(559,'Setup checklist',       'Tickable setup checklist.',P559),
  C(560,'Animated greeting',     'Big waving emoji as a hello.',P560),
  C(561,'Prompt suggestions',    'Tap one of three sample prompts.',P561),
  C(562,'Goal selector',         'Pick a primary goal at sign-up.',P562),
  C(563,'Skill self-assess',     'Sliders to declare skill levels.',P563),
  C(564,'Plan tier picker',      'Free / Pro / Team plan cards.',P564),
  C(565,'Permissions wizard',    'Per-permission consent toggles.',P565),
  C(566,'Privacy preferences',   'Opt out of training on your data.',P566),
  C(567,'Notification prefs',    'Toggle which events ping you.',P567),
  C(568,'Connect accounts',      'OAuth-style connector buttons.',P568),
  C(569,'Choose model',          'Pick the model to default to.',P569),
  C(570,'Choose theme',          'Dark / light / system options.',P570),
  C(571,'Try a sample',          '"Run sample" button + canned prompt.',P571),
  C(572,'Import from rival',     'Import history from another product.',P572),
  C(573,'Tutorial chat',         'A scripted "how to use me" chat.',P573),
  C(574,'Showcase video',        'Embedded explainer video.',P574),
  C(575,'Pitch slide carousel',  'Swipeable hero pitch slides.',P575),
  C(576,'Onboarding progress',   'Progress bar across the onboarding.',P576),
  C(577,'Skip tour',             'A clear escape hatch.',P577),
  C(578,'Confetti complete',     '🎉 you\'re-done celebration.',P578),
  C(579,'Streak start',          'Day-one streak indicator.',P579),
  C(580,'Welcome email preview', 'Preview of the welcome email.',P580),
  C(581,'Free credits banner',   'Banner of starter credits.',P581),
  C(582,'What\'s new tab',       'Highlight a new feature.',P582),
  C(583,'Compare plans',         'Side-by-side plan comparison.',P583),
  C(584,'Sandbox launcher',      'Enter a no-risk sandbox.',P584),
  C(585,'Dummy-data toggle',     'Use fake data while learning.',P585),
  C(586,'Empty inbox illust',    'Friendly empty state for inbox.',P586),
  C(587,'Avatar greeting',       'Avatar greets you by name.',P587),
  C(588,'Quick win card',        '5-min quick-win suggestion.',P588),
  C(589,'Try-this prompt cards', 'Three ready-to-go prompt cards.',P589),
  C(590,'Drag-drop demo',        'Encourages first file drop.',P590),
  C(591,'Save first artifact',   'Prompt to save the first output.',P591),
  C(592,'Sample data ready',     'Notice that sample data was loaded.',P592),
  C(593,'Tour pause/resume',     'Resume an unfinished tour.',P593),
  C(594,'Post-use feedback',     'Emoji feedback after first usage.',P594),
  C(595,'NPS prompt',            'Net-promoter score 0-10 picker.',P595),
  C(596,'Re-onboard new feature','Mini tour for a newly added feature.',P596),
  C(597,'Daily tip card',        'Tip-of-the-day card.',P597),
  C(598,'Help center search',    'Search across help docs.',P598),
  C(599,'Contact support widget','Persistent help launcher.',P599),
  C(600,'Bug report form',       'Inline bug report form.',P600),
]

export default meta.map(m => ({ ...m, category:'Onboarding' }))
