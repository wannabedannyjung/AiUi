import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('collab', `
.cb { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.cb .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.cb .row  { display:flex; gap:6px; align-items:center; }
.cb .av   { width:24px; height:24px; border-radius:50%; display:grid; place-items:center; color:#0b0c14; font-weight:700; font-size:11px; }
.cb table { width:100%; border-collapse: collapse; font-size:12px; }
.cb th, .cb td { padding:3px 6px; text-align:left; border-bottom:1px solid var(--line); }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'collab + personalization + safety', tags: extra.tags||['collab'], component: comp })

const P701 = defineComponent({ template:`<div class="cb card" style="position:relative"><div style="height:80px"></div><div style="position:absolute;left:30%;top:30%"><div style="width:2px;height:14px;background:var(--accent)"></div><div style="background:var(--accent);color:#0b0c14;padding:1px 6px;border-radius:4px;font-size:10px;margin-top:-2px">Sun-mi</div></div></div>`})
const P702 = defineComponent({ template:`<div class="cb card row"><div class="av" style="background:var(--accent)">A</div><div style="flex:1"><b>Aiden</b> · co-pilot active in this doc</div></div>`})
const P703 = defineComponent({ template:`<div class="cb card mono" style="font-size:12px">Hey <span class="chip accent">@critic-agent</span> can you review this para?</div>`})
const P704 = defineComponent({ template:`<div class="cb card row"><span class="chip">shared chat</span><div class="row"><div class="av" style="background:var(--accent)">A</div><div class="av" style="background:var(--accent-2)">B</div><div class="av" style="background:var(--accent-warn)">C</div></div></div>`})
const P705 = defineComponent({ template:`<div class="cb card" style="border-left:3px solid var(--accent)"><b>thread · Sun-mi</b><div class="dim" style="font-size:11px">"can we tighten this paragraph?" · 2 replies</div></div>`})
const P706 = defineComponent({ template:`<div class="cb row"><span class="chip good">resolved ✓</span><span class="dim" style="font-size:11px">3 days ago</span></div>`})
const P707 = defineComponent({ template:`<div class="cb card" style="background:rgba(245,193,97,0.06)"><span class="chip warn">suggestion</span><div style="margin-top:4px;text-decoration:line-through;color:var(--text-mute)">old wording</div><div style="color:var(--accent-good)">+ new wording</div></div>`})
const P708 = defineComponent({ template:`<div class="cb card mono" style="font-size:12px">The <span style="background:rgba(109,212,154,0.2);color:var(--accent-good)">new system</span> replaces <span style="background:rgba(249,123,123,0.2);color:var(--accent-bad);text-decoration:line-through">the legacy server</span>.</div>`})
const P709 = defineComponent({ template:`<div class="cb row"><button class="mini" style="background:var(--accent-good);color:#0b0c14">accept</button><button class="mini" style="background:var(--accent-bad);color:#0b0c14">reject</button><button class="mini">comment</button></div>`})
const P710 = defineComponent({ template:`<div class="cb row"><div class="av pulse" style="background:var(--accent)">D</div><div class="dim">Danny is editing line 42…</div></div>`})
const P711 = defineComponent({ template:`<div class="cb card row">🔊 <b>Voice channel · #stand-up</b><span class="chip good" style="margin-left:auto">3 in call</span></div>`})
const P712 = defineComponent({ template:`<div class="cb card" style="background:#fff;color:#0b0c14;height:100px;position:relative"><svg viewBox="0 0 200 100" width="100%" height="100"><path d="M20 80 L 70 20" stroke="#e74" stroke-width="3"/><path d="M120 30 L 180 70" stroke="#36a" stroke-width="3"/></svg><div class="dim" style="position:absolute;left:8px;bottom:6px;font-size:11px;color:#999">whiteboard</div></div>`})
const P713 = defineComponent({ template:`<div class="cb card"><b>Poll · pick a strategy</b><div class="row"><span style="width:60px">A</span><div style="flex:1;height:6px;background:var(--bg-2);border-radius:6px"><div style="width:60%;height:100%;background:var(--accent)"/></div><span class="mono">60%</span></div><div class="row"><span style="width:60px">B</span><div style="flex:1;height:6px;background:var(--bg-2);border-radius:6px"><div style="width:40%;height:100%;background:var(--accent-2)"/></div><span class="mono">40%</span></div></div>`})
const P714 = defineComponent({ template:`<div class="cb row"><span class="chip">👍 12</span><span class="chip">🎉 4</span><span class="chip">💡 2</span></div>`})
const P715 = defineComponent({ template:`<div class="cb card"><b>Welcome back, Alex 👋</b><div class="dim" style="font-size:11px">it's been 4 days</div></div>`})
const P716 = defineComponent({ template:`<div class="cb card"><b>style guide</b><div class="dim mono" style="font-size:11px">Oxford commas: ✓ · sentence case · no exclamation marks</div></div>`})
const P717 = defineComponent({ setup(){ const v=ref(2); const labels=['friendly','neutral','formal','academic']; return {v,labels} }, template:`<div class="cb"><div class="row"><span>tone</span><input type="range" min="0" max="3" v-model.number="v" style="flex:1"/><span class="mono">{{ labels[v] }}</span></div></div>`})
const P718 = defineComponent({ setup(){ const v=ref(2); return {v} }, template:`<div class="cb"><div class="row"><span>length</span><input type="range" min="0" max="3" v-model.number="v" style="flex:1"/><span class="mono">{{ ['terse','short','medium','long'][v] }}</span></div></div>`})
const P719 = defineComponent({ template:`<div class="cb"><div class="dim">personas</div><div class="row" style="flex-wrap:wrap"><span class="chip">friendly</span><span class="chip">senior staff eng</span><span class="chip">pirate</span><button class="mini">+</button></div></div>`})
const P720 = defineComponent({ template:`<div class="cb card row"><div class="av" style="background:linear-gradient(135deg,#7d6df1,#6df1c4)">A</div><div><b>Your AI twin</b><div class="dim" style="font-size:11px">writes in your voice</div></div></div>`})
const P721 = defineComponent({ template:`<div class="cb card"><b>system prompt</b><textarea style="width:100%;height:60px">You are a concise assistant who…</textarea></div>`})
const P722 = defineComponent({ template:`<div class="cb"><div class="dim">presets</div><div class="row" style="flex-wrap:wrap"><span class="chip accent">drafting</span><span class="chip">debugging</span><span class="chip">brainstorm</span></div></div>`})
const P723 = defineComponent({ template:`<div class="cb card mono" style="font-size:12px">"Always cite sources." <span class="chip">saved</span></div>`})
const P724 = defineComponent({ template:`<div class="cb"><div v-for="(p,c) in {'#dev':'concise','#brainstorm':'wild','#legal':'formal'}" :key="c" class="row"><span class="chip">{{ c }}</span><span class="dim">→ {{ p }}</span></div></div>`})
const P725 = defineComponent({ template:`<div class="cb row"><span>persona</span><select><option>friendly</option><option>concise</option><option>pirate</option></select></div>`})
const P726 = defineComponent({ template:`<div class="cb"><div class="row"><span>privacy tier</span><button class="mini" style="background:var(--accent);color:#0b0c14">strict</button><button class="mini">standard</button><button class="mini">open</button></div></div>`})
const P727 = defineComponent({ template:`<div class="cb"><div class="row"><span>safety filter</span><input type="range" min="0" max="3"/><span class="mono">strict</span></div></div>`})
const P728 = defineComponent({ template:`<div class="cb row"><label><input type="checkbox"/> allow NSFW (age-verified)</label></div>`})
const P729 = defineComponent({ template:`<div class="cb row"><span class="chip">audience</span><span class="chip good">general</span><span class="chip warn">internal</span><span class="chip bad">restricted</span></div>`})
const P730 = defineComponent({ template:`<div class="cb card"><b>age gate</b><div class="dim" style="font-size:11px">verify you're 18+</div><button class="mini" style="background:var(--accent);color:#0b0c14;margin-top:4px">verify</button></div>`})
const P731 = defineComponent({ template:`<div class="cb pill" style="background:rgba(109,212,154,0.1);color:var(--accent-good);border-color:rgba(109,212,154,0.4)">👨‍👩‍👧 family-friendly mode</div>`})
const P732 = defineComponent({ template:`<div class="cb card" style="background:rgba(245,193,97,0.06);border-color:var(--accent-warn)">⚖ <b>ethics callout</b> · this output may affect <i>real people</i> — review before sending.</div>`})
const P733 = defineComponent({ template:`<div class="cb card" style="border-color:var(--accent-warn)">⚠ <b>bias warning</b> — gender skew detected in name list.</div>`})
const P734 = defineComponent({ template:`<div class="cb card" style="border-color:var(--accent-bad)">🌫 <b>likely hallucinated</b> — no source supports this claim.</div>`})
const P735 = defineComponent({ template:`<div class="cb"><div class="row"><label><input type="checkbox" checked/> source-only mode (no synthesis)</label></div></div>`})
const P736 = defineComponent({ template:`<div class="cb pill">📚 citations required for every claim</div>`})
const P737 = defineComponent({ template:`<div class="cb row"><label><input type="checkbox"/> strict mode (no speculative answers)</label></div>`})
const P738 = defineComponent({ template:`<div class="cb card"><b>voice consent</b><div class="dim" style="font-size:11px">may we use your voice for personalisation?</div><div class="row"><button class="mini">deny</button><button class="mini" style="background:var(--accent);color:#0b0c14">allow</button></div></div>`})
const P739 = defineComponent({ template:`<div class="cb pill" style="background:rgba(249,123,123,0.1);color:var(--accent-bad);border-color:rgba(249,123,123,0.4)">● recording disclosed</div>`})
const P740 = defineComponent({ template:`<div class="cb card"><b>admin · audit access</b><div class="dim mono" style="font-size:11px">read-only · 4 admins enabled</div></div>`})
const P741 = defineComponent({ template:`<div class="cb card"><b>workspace policy</b><div class="dim" style="font-size:11px">no PII in chats · no external sharing</div></div>`})
const P742 = defineComponent({ template:`<div class="cb pill" style="background:rgba(245,193,97,0.1);color:var(--accent-warn);border-color:rgba(245,193,97,0.4)">🛠 admin override active</div>`})
const P743 = defineComponent({ template:`<div class="cb pill">👁 read-only viewer</div>`})
const P744 = defineComponent({ template:`<div class="cb card"><b>invite a guest</b><div class="row"><input style="flex:1" placeholder="email"/><button class="mini" style="background:var(--accent);color:#0b0c14">send</button></div></div>`})
const P745 = defineComponent({ template:`<div class="cb card mono" style="font-size:11px">restrict to *.acme.com domain</div>`})
const P746 = defineComponent({ template:`<div class="cb card row"><b>SSO</b><span style="margin-left:auto">Okta · Google · Azure AD</span></div>`})
const P747 = defineComponent({ template:`<div class="cb"><table><tr><th>role</th><th>read</th><th>write</th><th>admin</th></tr><tr><td>viewer</td><td>✓</td><td>·</td><td>·</td></tr><tr><td>editor</td><td>✓</td><td>✓</td><td>·</td></tr><tr><td>admin</td><td>✓</td><td>✓</td><td>✓</td></tr></table></div>`})
const P748 = defineComponent({ template:`<div class="cb"><div v-for="(q,u) in {Alice:80,Bo:42,Cas:10}" :key="u" class="row"><span style="width:60px">{{ u }}</span><div style="flex:1;height:5px;background:var(--bg-3);border-radius:5px"><div :style="{width:q+'%',height:'100%',background:'var(--accent)'}"/></div><span class="mono mute">{{ q }}%</span></div></div>`})
const P749 = defineComponent({ template:`<div class="cb pill"><span class="chip">team</span><b>$24.18 / $50.00</b></div>`})
const P750 = defineComponent({ template:`<div class="cb card"><b>terms of use</b><label class="row"><input type="checkbox"/> I agree to the AI usage policy</label><button class="mini" style="background:var(--accent);color:#0b0c14;margin-top:4px">continue</button></div>`})

const meta = [
  C(701,'Live presence cursor',  'Other person\'s cursor + name visible in real time.',P701,{inspiration:'Figma, Notion'}),
  C(702,'Doc co-pilot avatar',   'Agent avatar shown as a co-author.',P702),
  C(703,'@mention agent in doc', '@-mention an agent inside the document.',P703),
  C(704,'Shared chat header',    'Multi-avatar header for a shared chat.',P704),
  C(705,'Comment thread',        'Threaded comment with reply count.',P705),
  C(706,'Resolve thread',        'Comment marked resolved.',P706),
  C(707,'Suggestion (track changes)','Old text struck out + new text in green.',P707),
  C(708,'Track-changes inline',  'Inline insertions and deletions.',P708),
  C(709,'Approve/reject buttons','Per-suggestion approval controls.',P709),
  C(710,'Co-edit indicator',     'Pulsing avatar showing live editing.',P710),
  C(711,'Voice channel card',    'Drop into a team voice channel.',P711),
  C(712,'Whiteboard collab',     'Shared whiteboard with multi-user strokes.',P712),
  C(713,'In-chat poll',          'Poll widget with live result bars.',P713),
  C(714,'Reaction summary',      'Aggregate reaction counts on a message.',P714),
  C(715,'Personalised greeting', 'Greeting card by user name + recency.',P715),
  C(716,'Saved style guide',     'Workspace-wide writing rules.',P716),
  C(717,'Tone preference dial',  'Slider for response tone.',P717),
  C(718,'Length preference dial','Slider for response length.',P718),
  C(719,'Persona library',       'Library of saved personas.',P719),
  C(720,'AI twin avatar',        'Personalised AI in your voice.',P720),
  C(721,'System prompt editor',  'Editable system prompt textarea.',P721),
  C(722,'Saved settings preset', 'Drafting / debugging / brainstorm presets.',P722),
  C(723,'Saved system prompt',   'Pinned system prompt label.',P723),
  C(724,'Per-channel persona',   'Different personas per channel.',P724),
  C(725,'Persona switcher',      'Dropdown to switch persona.',P725),
  C(726,'Privacy tier select',   'Strict / standard / open privacy tiers.',P726),
  C(727,'Safety filter level',   'Slider for safety filtering strength.',P727),
  C(728,'NSFW gate',             'NSFW toggle gated by age verification.',P728),
  C(729,'Audience indicator',    'Whom this output is intended for.',P729),
  C(730,'Age gate',              'Verify the user is over 18.',P730),
  C(731,'Family-friendly mode',  'Pill enabling family-safe content.',P731),
  C(732,'Ethics callout',        'Flag actions affecting real people.',P732),
  C(733,'Bias warning',          'Detect and warn about output bias.',P733),
  C(734,'Hallucination warning', 'Flag claims with no source.',P734),
  C(735,'Source-only mode',      'No synthesis — quote sources only.',P735),
  C(736,'Citation requirement',  'Force citations on every claim.',P736),
  C(737,'Strict mode',           'Refuse speculative answers.',P737),
  C(738,'Voice consent',         'Ask before storing voice for personalisation.',P738),
  C(739,'Recording disclosure',  'Visible "● recording" indicator.',P739),
  C(740,'Audit access for admins','Read-only audit access by admins.',P740),
  C(741,'Workspace-wide policy', 'Posted workspace policy summary.',P741),
  C(742,'Admin override pill',   'Admin override is currently active.',P742),
  C(743,'Read-only viewer chip', 'Marks the user as a viewer.',P743),
  C(744,'Guest invite',          'Send a one-off invite to a guest.',P744),
  C(745,'Domain restriction',    'Restrict access to one email domain.',P745),
  C(746,'SSO integration',       'Single sign-on integration card.',P746),
  C(747,'Role permissions table','Roles × permissions matrix.',P747),
  C(748,'Per-user quota',        'Quota usage per workspace member.',P748),
  C(749,'Cost-share team',       'Team-wide spend pill.',P749),
  C(750,'EULA accept',           'Click-through EULA for AI use.',P750),
]

export default meta.map(m => ({ ...m, category:'Collab & Safety'  }))
