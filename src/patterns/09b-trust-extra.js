import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('trust-extra', `
.trx { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.trx .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.trx .row  { display:flex; gap:6px; align-items:center; }
.trx .stamp{ display:inline-grid; place-items:center; padding:6px 12px; border:2px solid var(--accent-good); color: var(--accent-good); border-radius:6px; font-weight:800; transform: rotate(-6deg); letter-spacing:.1em; }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'safety/governance UX', tags: extra.tags||['trust'], component: comp })

const P421 = defineComponent({ template:`<div class="trx card mono" style="font-size:12px">name=Alex&nbsp;email=<span style="background:#000;color:#000;padding:0 6px">●●●●●●</span> <span class="chip warn">redacted</span></div>`})
const P422 = defineComponent({ template:`<div class="trx card">My SSN is <span style="background:rgba(249,123,123,0.2);color:var(--accent-bad)">123-45-6789 (PII)</span> please remove.</div>`})
const P423 = defineComponent({ template:`<div class="trx"><div class="dim mono" style="font-size:11px">permission timeline</div><div v-for="t in ['14:02 fs.read · allow','14:05 shell.run · ASK','14:10 web.fetch · allow']" :key="t" class="card mono" style="font-size:11px;padding:4px 8px">{{ t }}</div></div>`})
const P424 = defineComponent({ template:`<div class="trx"><div class="dim">approval queue · 2 waiting</div><div v-for="(t,i) in ['delete branch feat-x','send email to legal']" :key="t" class="card row" style="font-size:12px"><span style="flex:1">{{ t }}</span><button class="mini">approve</button><button class="mini">deny</button></div></div>`})
const P425 = defineComponent({ template:`<div class="trx"><div v-for="(s,a) in {Alice:0.92,Bo:0.78,Cas:0.55}" :key="a" class="row"><span style="width:60px">{{ a }}</span><div style="flex:1;height:5px;background:var(--bg-3);border-radius:5px"><div :style="{width:(s*100)+'%',height:'100%',background:s>0.8?'var(--accent-good)':s>0.6?'var(--accent-warn)':'var(--accent-bad)'}"/></div><span class="mono mute" style="font-size:11px">{{ Math.round(s*100) }}</span></div></div>`})
const P426 = defineComponent({ template:`<div class="trx row"><span class="chip good">SOC2 · type II</span><span class="chip good">GDPR</span><span class="chip good">HIPAA</span></div>`})
const P427 = defineComponent({ template:`<div class="trx card mono" style="font-size:11px">2026-05-12 14:02:38Z · agent=research · action=fs.read · target=auth.ts · ok</div>`})
const P428 = defineComponent({ template:`<div class="trx"><input placeholder="search audit log…" style="width:100%"/><div class="card mono" style="font-size:11px">3 hits in 14 days</div></div>`})
const P429 = defineComponent({ template:`<div class="trx row"><button class="mini" style="background:var(--accent);color:#0b0c14">⤓ export audit log</button><span class="dim" style="font-size:11px">CSV · JSON · syslog</span></div>`})
const P430 = defineComponent({ template:`<div class="trx pill" style="background:rgba(245,193,97,0.1);color:var(--accent-warn);border-color:rgba(245,193,97,0.4)">🛡 sandboxed · network blocked</div>`})
const P431 = defineComponent({ template:`<div class="trx card"><b>why this action?</b><div class="quote" style="margin-top:4px">user asked to "clean up old branches"; <i>git branch -D feat-x</i> matches that intent.</div></div>`})
const P432 = defineComponent({ template:`<div class="trx row"><span class="chip good">↩ reversible</span><span class="chip bad">⚠ irreversible</span></div>`})
const P433 = defineComponent({ template:`<div class="trx card"><b>simulator preview</b><div class="dim mono" style="font-size:11px">would change 3 files, send 0 emails, cost $0.04</div></div>`})
const P434 = defineComponent({ template:`<div class="trx card"><b>2FA required</b><div class="row"><input placeholder="6-digit code"/><button class="mini" style="background:var(--accent);color:#0b0c14">verify</button></div></div>`})
const P435 = defineComponent({ template:`<div class="trx card" style="border-color:var(--accent-bad)">⚠ <b>quarantined output</b> — possibly poisoned source. <button class="mini" style="margin-left:6px">review</button></div>`})
const P436 = defineComponent({ template:`<div class="trx card"><b>allowlisted domains</b><div class="row" style="flex-wrap:wrap;gap:4px"><span class="chip good">github.com</span><span class="chip good">vuejs.org</span><button class="mini">+ add</button></div></div>`})
const P437 = defineComponent({ template:`<div class="trx card"><b>blocked domains</b><div class="row" style="flex-wrap:wrap;gap:4px"><span class="chip bad">untrusted-cdn.io</span><span class="chip bad">staging-only.dev</span></div></div>`})
const P438 = defineComponent({ template:`<div class="trx card row">🌍 region: <b>EU only</b><span class="chip warn" style="margin-left:auto">data stays in EU</span></div>`})
const P439 = defineComponent({ template:`<div class="trx card"><b>working hours</b><div class="dim" style="font-size:11px">agent only acts 09:00–18:00 KST</div></div>`})
const P440 = defineComponent({ template:`<div class="trx card" style="border-color:var(--accent-bad)">🚨 <b>tamper detected</b> in audit chunk #112 — investigating.</div>`})
const P441 = defineComponent({ template:`<div class="trx pill"><span class="chip good">data residency · ap-northeast-2</span></div>`})
const P442 = defineComponent({ template:`<div class="trx card mono" style="font-size:12px">"call John at <s style="color:var(--accent-bad)">+1-555-0100</s>"<div class="dim" style="font-size:11px">phone scrubbed</div></div>`})
const P443 = defineComponent({ setup(){ const arr=[2,3,2,4,5,4,7,5,9]; return {arr} }, template:`<div class="trx"><div class="dim">risk trend</div><svg width="100%" height="40" viewBox="0 0 200 40"><polyline :points="arr.map((v,i)=>i*22+','+(40-v*3)).join(' ')" fill="none" stroke="var(--accent-warn)" stroke-width="2"/></svg></div>`})
const P444 = defineComponent({ template:`<div class="trx card"><div class="row"><span class="chip">slack</span><b>#approvals</b></div><div class="dim" style="font-size:12px;margin-top:4px">"@danny — agent wants to merge PR #42. ✅ ❌"</div></div>`})
const P445 = defineComponent({ template:`<div class="trx" style="align-items:center;justify-content:center"><div class="stamp">✓ APPROVED</div></div>`})
const P446 = defineComponent({ template:`<div class="trx pill">⌛ cool-down · next action in 23s</div>`})
const P447 = defineComponent({ template:`<div class="trx"><div class="row"><span class="chip good">✓ Lead</span> → <span class="chip warn">⏳ Manager</span> → <span class="chip">CEO</span></div></div>`})
const P448 = defineComponent({ template:`<div class="trx"><div v-for="(p,t) in {fs_write:'always ask',shell:'allowlist',web_fetch:'auto'}" :key="t" class="row"><span class="mono" style="width:90px">{{ t }}</span><span class="chip">{{ p }}</span></div></div>`})
const P449 = defineComponent({ template:`<div class="trx card mono" style="font-size:11px">signed: 0xa1b2…f93c<div class="dim" style="font-size:10px">ed25519 · verified ✓</div></div>`})
const P450 = defineComponent({ template:`<div class="trx" style="align-items:center;justify-content:center"><div style="font-size:36px">🤝</div><div class="dim mono" style="font-size:11px">trust handshake established</div></div>`})
const P451 = defineComponent({ template:`<div class="trx card" style="background:rgba(109,212,154,0.06);border-color:var(--accent-good)">📜 <b>honesty pledge</b> — agent will reveal limitations and uncertainty.</div>`})
const P452 = defineComponent({ template:`<div class="trx pill">🤖 generated by AI · disclosed</div>`})
const P453 = defineComponent({ template:`<div class="trx pill" style="background:rgba(109,212,154,0.1);color:var(--accent-good);border-color:rgba(109,212,154,0.4)">👤 human-authored</div>`})
const P454 = defineComponent({ template:`<div class="trx card mono" style="font-size:11px">watermark: GZ4xK… (invisible, model+date encoded)</div>`})
const P455 = defineComponent({ template:`<div class="trx card"><b>requires conf ≥ 80%</b><div class="dim" style="font-size:11px">otherwise route to human review</div></div>`})
const P456 = defineComponent({ template:`<div class="trx"><div class="row"><b>context budget</b><span class="mono mute" style="margin-left:auto">90k / 200k requested</span></div><button class="mini" style="background:var(--accent);color:#0b0c14;align-self:flex-start">approve</button></div>`})
const P457 = defineComponent({ template:`<div class="trx card row"><span>cost cap / hour</span><input type="number" value="2.00" style="width:80px;margin-left:auto"/></div>`})
const P458 = defineComponent({ template:`<div class="trx card row"><span>latency budget</span><input type="number" value="3000" style="width:80px;margin-left:auto"/><span class="mute" style="font-size:11px">ms</span></div>`})
const P459 = defineComponent({ template:`<div class="trx card" style="border-color:var(--accent-warn)">⚠ anomaly: <b>10×</b> normal token rate · agent paused</div>`})
const P460 = defineComponent({ template:`<div class="trx card"><b>compliance review</b><div class="row"><span class="chip good">data: ✓</span><span class="chip good">scope: ✓</span><span class="chip warn">retention: ⚠</span></div></div>`})

const meta = [
  C(421,'PII redaction inline', 'Sensitive fields blacked out.',P421),
  C(422,'PII detection chip',   'Inline highlight when PII appears in chat.',P422),
  C(423,'Permission timeline',  'Log of allow/ask/deny decisions.',P423),
  C(424,'Approval queue',       'Pending agent actions awaiting approval.',P424),
  C(425,'Trust score per agent','0-1 trust score with color thresholds.',P425),
  C(426,'Compliance badges',    'SOC2 / GDPR / HIPAA chips.',P426),
  C(427,'Audit log entry',      'Mono one-liner audit log entry.',P427),
  C(428,'Audit log search',     'Free-text search across audit history.',P428),
  C(429,'Audit log export',     'Export audit log in standard formats.',P429),
  C(430,'Sandbox label',        'Pill showing the action ran in a sandbox.',P430),
  C(431,'"Why did the agent" log','Plain-language rationale for an action.',P431),
  C(432,'Reversibility icons',  'Reversible vs irreversible action chips.',P432),
  C(433,'Effect simulator',     'Dry-run summary of effects before execution.',P433),
  C(434,'2FA prompt',           'Two-factor confirmation for risky actions.',P434),
  C(435,'Quarantine output',    'Suspicious output isolated for review.',P435),
  C(436,'Allowlisted domains',  'Editor for allowed domains.',P436),
  C(437,'Blocked domains',      'Editor for blocked domains.',P437),
  C(438,'Geo-restriction',      'Region pinning notice.',P438),
  C(439,'Working hours window', 'Agent only acts inside business hours.',P439),
  C(440,'Tamper detected alert','Audit chain integrity broken alert.',P440),
  C(441,'Data residency badge', 'Where data physically lives.',P441),
  C(442,'PII scrubber preview', 'Sensitive fragments crossed out.',P442),
  C(443,'Risk trend chart',     'Risk score sparkline over time.',P443),
  C(444,'Slack approval mock',  'Approval requested in #approvals.',P444),
  C(445,'CEO-approval stamp',   'Stylised "APPROVED" stamp graphic.',P445),
  C(446,'Cool-down timer',      'Mandatory pause between sensitive actions.',P446),
  C(447,'Multi-step approvals', 'Lead → Manager → CEO chain visualised.',P447),
  C(448,'Per-tool policy',      'Different approval policies per tool.',P448),
  C(449,'Cryptographic signature','Signed action with verifier.',P449),
  C(450,'Trust handshake',      'Visual handshake on initial connection.',P450),
  C(451,'Honesty pledge banner','Promise to reveal uncertainty.',P451),
  C(452,'AI disclosure badge',  '"Generated by AI" disclosure pill.',P452),
  C(453,'Human-authored badge', 'Differentiates human-written content.',P453),
  C(454,'Output watermarking',  'Hidden watermark info shown on hover.',P454),
  C(455,'Confidence-required gate','Threshold below which human review fires.',P455),
  C(456,'Context budget approval','Confirm large context window usage.',P456),
  C(457,'Cost-cap input',       'Per-hour cost cap setting.',P457),
  C(458,'Latency budget input', 'Hard latency budget per request.',P458),
  C(459,'Anomaly detection',    'Auto-pause on outlier behaviour.',P459),
  C(460,'Compliance review',    'Composite per-area compliance pass/fail.',P460),
]

export default meta.map(m => ({ ...m, category:'Trust & Control' }))
