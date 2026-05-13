import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('reliab', `
.rl { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.rl .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.rl .row  { display:flex; gap:6px; align-items:center; }
.rl .pre  { background:#1a0808; color:#ff8b8b; font-family:var(--mono); font-size:11px; padding:8px; border-radius:6px; }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'observability tools', tags: extra.tags||['reliability'], component: comp })

const P601 = defineComponent({ template:`<div class="rl card" style="border-color:var(--accent-bad)"><b style="color:var(--accent-bad)">network error</b><div class="dim" style="font-size:11px">couldn't reach the agent at 14:02</div><button class="mini" style="background:var(--accent);color:#0b0c14;margin-top:4px">↻ retry</button></div>`})
const P602 = defineComponent({ template:`<div class="rl pre">TypeError: Cannot read 'name' of undefined
  at User.greet (auth.ts:42:12)
  at handler (router.ts:18:4)
  at runStep (loop.ts:118:8)</div>`})
const P603 = defineComponent({ template:`<div class="rl card" style="background:rgba(245,193,97,0.08);border-color:var(--accent-warn)">⏳ <b>reconnecting</b> · attempt 3 of 5</div>`})
const P604 = defineComponent({ template:`<div class="rl pill" style="background:rgba(249,123,123,0.1);color:var(--accent-bad);border-color:rgba(249,123,123,0.4)">📴 offline · queued 4 actions</div>`})
const P605 = defineComponent({ template:`<div class="rl card" style="text-align:center"><div style="font-size:36px;font-weight:800">#3</div><div class="dim">in queue · ETA 30s</div></div>`})
const P606 = defineComponent({ template:`<div class="rl row"><span class="chip">retry · exponential</span><span class="chip">max 5</span></div>`})
const P607 = defineComponent({ template:`<div class="rl"><div class="dim">backoff schedule</div><div class="row"><span v-for="(d,i) in [200,400,800,1600,3200]" :key="i" class="chip">{{ d }}ms</span></div></div>`})
const P608 = defineComponent({ template:`<div class="rl card mono" style="font-size:11px"><b>E429</b> · rate limit exceeded · retry-after 30s</div>`})
const P609 = defineComponent({ template:`<div class="rl card" style="background:rgba(109,212,154,0.06);border-color:var(--accent-good)">✓ <b>auto-fix:</b> bumped client to v3 — error gone.</div>`})
const P610 = defineComponent({ template:`<div class="rl card"><b>recovery wizard</b><div class="dim mono" style="font-size:11px">step 1 of 3 · check connection<button class="mini" style="margin-left:6px">test</button></div></div>`})
const P611 = defineComponent({ template:`<div class="rl row"><span class="chip good">api ✓</span><span class="chip good">db ✓</span><span class="chip warn">cache ⚠</span><span class="chip good">queue ✓</span></div>`})
const P612 = defineComponent({ template:`<div class="rl card"><b>SLO · 99.9% uptime</b><div class="dim" style="font-size:11px">budget remaining: <b>92%</b> for May</div></div>`})
const P613 = defineComponent({ template:`<div class="rl"><div class="dim">trace · 4 spans</div><svg width="100%" height="40" viewBox="0 0 240 40"><rect x="2" y="6" width="40" height="8" fill="var(--accent)"/><rect x="44" y="18" width="80" height="8" fill="var(--accent-2)"/><rect x="126" y="6" width="60" height="8" fill="var(--accent-warn)"/><rect x="188" y="18" width="50" height="8" fill="var(--accent)"/></svg></div>`})
const P614 = defineComponent({ template:`<div class="rl card mono" style="font-size:11px">span: web_search · 412ms · ok<div class="dim">attrs: q=vue3, n_results=4</div></div>`})
const P615 = defineComponent({ template:`<div class="rl pre" style="background:#0b1120;color:#a8f0a8">14:02:01 INFO  agent started
14:02:03 DEBUG fetched docs (3)
14:02:08 ERROR retry #2 · 429
14:02:11 INFO  recovered</div>`})
const P616 = defineComponent({ template:`<div class="rl row"><input style="flex:1" placeholder="filter logs…"/><span class="chip">level: ERROR</span></div>`})
const P617 = defineComponent({ setup(){ const arr=[1,1,2,3,5,8,13,8,5,3]; return {arr} }, template:`<div class="rl"><div class="dim">error rate (per min)</div><svg width="100%" height="40"><polyline :points="arr.map((y,i)=>i*20+','+(40-y*2)).join(' ')" fill="none" stroke="var(--accent-bad)" stroke-width="2"/></svg></div>`})
const P618 = defineComponent({ template:`<div class="rl card"><b>eval scorecard</b><div class="row"><span>accuracy</span><span class="mono">87%</span></div><div class="row"><span>latency</span><span class="mono">412ms</span></div><div class="row"><span>cost</span><span class="mono">$0.014</span></div></div>`})
const P619 = defineComponent({ template:`<div class="rl row"><span class="chip good">12 pass</span><span class="chip bad">2 fail</span><span class="chip warn">1 flaky</span></div>`})
const P620 = defineComponent({ template:`<div class="rl pill" style="background:rgba(249,123,123,0.1);color:var(--accent-bad);border-color:rgba(249,123,123,0.4)">⬇ regressed 3.2% vs last release</div>`})
const P621 = defineComponent({ template:`<div class="rl"><div v-for="(s,n) in {'2026-05-12 14:02':'ok','2026-05-12 13:55':'fail','2026-05-12 13:48':'ok'}" :key="n" class="card row mono" style="font-size:11px"><span style="flex:1">{{ n }}</span><span :class="['chip',s==='ok'?'good':'bad']">{{ s }}</span></div></div>`})
const P622 = defineComponent({ template:`<div class="rl card row">🔁 reproduce this run<button class="mini" style="margin-left:auto;background:var(--accent);color:#0b0c14">copy link</button></div>`})
const P623 = defineComponent({ template:`<div class="rl card mono" style="font-size:11px">snapshot · t=4.2s · captured before failure</div>`})
const P624 = defineComponent({ template:`<div class="rl pre">- score: 84
+ score: 91 ✓ improved
- latency: 612ms
+ latency: 388ms ✓ improved</div>`})
const P625 = defineComponent({ template:`<div class="rl card"><b>2 active alerts</b><div class="row"><span class="chip bad">P1 · auth-down</span><span class="chip warn">P3 · slow queries</span></div></div>`})
const P626 = defineComponent({ template:`<div class="rl row"><button class="mini" style="background:var(--accent-bad);color:#0b0c14">📞 page on-call</button><span class="dim" style="font-size:11px">→ Danny (primary)</span></div>`})
const P627 = defineComponent({ template:`<div class="rl"><div class="dim">incident timeline</div><div v-for="t in ['14:02 detected','14:04 paged','14:09 mitigated','14:30 resolved']" :key="t" class="card mono" style="font-size:11px;padding:4px 8px">▸ {{ t }}</div></div>`})
const P628 = defineComponent({ template:`<div class="rl card row">📓 <span style="flex:1">postmortem · INC-128</span><button class="mini">open</button></div>`})
const P629 = defineComponent({ template:`<div class="rl card"><b>status · all systems normal</b><div class="dim" style="font-size:11px">last incident: 4d ago</div></div>`})
const P630 = defineComponent({ template:`<div class="rl card" style="background:rgba(245,193,97,0.08);border-color:var(--accent-warn)">🛠 <b>maintenance window</b> Sun 03:00-05:00 KST</div>`})
const P631 = defineComponent({ template:`<div class="rl pill" style="background:rgba(245,193,97,0.1);color:var(--accent-warn);border-color:rgba(245,193,97,0.4)">⚠ workflow stale (3h since last run)</div>`})
const P632 = defineComponent({ template:`<div class="rl card" style="border-color:var(--accent-warn)">📈 memory growing 12 MB / hr · likely leak in <code>cache.set</code></div>`})
const P633 = defineComponent({ template:`<div class="rl pill" style="background:rgba(245,193,97,0.1);color:var(--accent-warn);border-color:rgba(245,193,97,0.4)">⚙ throttling · 60% capacity</div>`})
const P634 = defineComponent({ template:`<div class="rl row"><span class="chip warn">auto-throttle on</span><span class="dim" style="font-size:11px">protects upstream from spikes</span></div>`})
const P635 = defineComponent({ template:`<div class="rl card mono" style="font-size:11px">limit: 100 req/min · used: 38</div>`})
const P636 = defineComponent({ template:`<div class="rl"><div class="dim">api quota</div><div style="height:6px;background:var(--bg-3);border-radius:6px"><div style="width:42%;height:100%;background:var(--accent)"/></div><div class="mute" style="font-size:11px">418 / 1000</div></div>`})
const P637 = defineComponent({ template:`<div class="rl card row">↻ replay request<button class="mini" style="margin-left:auto">go</button></div>`})
const P638 = defineComponent({ setup(){ const m=ref(false); return {m} }, template:`<div class="rl row"><label><input type="checkbox" v-model="m"/> mock failures (chaos)</label><span class="dim" style="font-size:11px">{{ m?'10% fail rate active':'normal' }}</span></div>`})
const P639 = defineComponent({ template:`<div class="rl card" style="background:rgba(249,123,123,0.06);border-color:var(--accent-bad)">🌪 <b>chaos mode</b> on · expect random failures.</div>`})
const P640 = defineComponent({ template:`<div class="rl card"><b>capacity planner</b><div class="dim mono" style="font-size:11px">predicted to hit limit on 2026-06-08</div></div>`})
const P641 = defineComponent({ template:`<div class="rl pill" style="background:rgba(245,193,97,0.1);color:var(--accent-warn);border-color:rgba(245,193,97,0.4)">⚠ capacity 92% · upgrade soon</div>`})
const P642 = defineComponent({ template:`<div class="rl card" style="border-color:var(--accent-bad)">⏱ latency budget exceeded · 612ms / 500ms</div>`})
const P643 = defineComponent({ template:`<div class="rl card" style="background:rgba(245,193,97,0.06)">🔁 failover · primary→secondary at 14:02</div>`})
const P644 = defineComponent({ template:`<div class="rl card" style="height:80px;background:linear-gradient(180deg,#1f2740,#0e1320);position:relative"><div class="chip good" style="position:absolute;left:30%;top:30%">us-east</div><div class="chip warn" style="position:absolute;left:65%;top:55%">eu-west (failover)</div></div>`})
const P645 = defineComponent({ template:`<div class="rl row"><span class="chip good">✓ backup · 2h ago</span><span class="dim" style="font-size:11px">next: 04:00</span></div>`})
const P646 = defineComponent({ template:`<div class="rl card"><b>restore preview</b><div class="dim" style="font-size:11px">42 records affected · 0 destructive</div><div class="row"><button class="mini" style="background:var(--accent);color:#0b0c14">restore</button><button class="mini">cancel</button></div></div>`})
const P647 = defineComponent({ setup(){ const p=ref(0); useInterval(()=>p.value=(p.value+2)%100,200); return {p} }, template:`<div class="rl"><div class="dim">stress test</div><div style="height:6px;background:var(--bg-3);border-radius:6px"><div :style="{width:p+'%',height:'100%',background:'var(--accent-bad)',transition:'width .2s'}"/></div></div>`})
const P648 = defineComponent({ template:`<div class="rl card mono" style="font-size:11px">snapshot diff: 3 keys changed · 1 added · 0 removed</div>`})
const P649 = defineComponent({ template:`<div class="rl row"><span class="chip">budget</span><span class="chip good">latency &lt; 500ms ✓</span><span class="chip bad">cost &gt; $0.05 ✗</span></div>`})
const P650 = defineComponent({ template:`<div class="rl"><div class="dim">tracing flame</div><div style="display:flex;align-items:flex-end;gap:1px;height:40px"><div v-for="(h,i) in [10,30,18,42,12,38,16,8]" :key="i" :style="{width:'18px',height:h+'px',background:'var(--accent-bad)',borderRadius:'2px'}"/></div></div>`})

const meta = [
  C(601,'Error card with retry', 'Friendly error card and a retry button.',P601),
  C(602,'Stack trace block',     'Mono stack trace for failure debugging.',P602),
  C(603,'Reconnect banner',      'Auto-retry connection with attempt count.',P603),
  C(604,'Offline pill',          'Indicator that the app is offline + queued.',P604),
  C(605,'Queue position card',   'Big-number queue position with ETA.',P605),
  C(606,'Retry policy chips',    'Pills describing retry strategy.',P606),
  C(607,'Backoff visualisation', 'Schedule of retry intervals.',P607),
  C(608,'Error code reference',  'Mono error code with retry hint.',P608),
  C(609,'Auto-fix banner',       'Self-healing fix-applied banner.',P609),
  C(610,'Recovery wizard',       'Stepwise guided recovery.',P610),
  C(611,'Health check chips',    'Per-service health pills.',P611),
  C(612,'SLO indicator',         'Service-level objective status.',P612),
  C(613,'Trace timeline',        'Gantt-style spans for an agent run.',P613),
  C(614,'Span detail card',      'Drilldown attributes of one span.',P614),
  C(615,'Log viewer',            'Console-style log output.',P615),
  C(616,'Filter logs',           'Search + level filter for logs.',P616),
  C(617,'Error rate chart',      'Live error rate sparkline.',P617),
  C(618,'Eval scorecard',        'Aggregate eval metrics card.',P618),
  C(619,'Eval pass/fail chips',  'At-a-glance eval bucket counts.',P619),
  C(620,'Regression badge',      'Drop vs prior release.',P620),
  C(621,'Run history list',      'Per-run pass/fail entries.',P621),
  C(622,'Reproduce link',        'Copy-link to reproduce a run.',P622),
  C(623,'Snapshot before fail',  'Snapshot captured at failure point.',P623),
  C(624,'Diff to last good',     'Numeric diff between current and last green run.',P624),
  C(625,'Active alerts',         'Compact summary of open alerts.',P625),
  C(626,'Page on-call',          'One-click page-on-call action.',P626),
  C(627,'Incident timeline',     'Detection → mitigation timeline.',P627),
  C(628,'Postmortem link',       'Link to the postmortem doc.',P628),
  C(629,'Status page card',      'Public-style status indicator.',P629),
  C(630,'Maintenance window',    'Banner of upcoming maintenance.',P630),
  C(631,'Stale workflow',        'Warning when a workflow hasn\'t run.',P631),
  C(632,'Memory leak alert',     'Heap-growth alert with suspect.',P632),
  C(633,'Throttling pill',       'Currently-throttled indicator.',P633),
  C(634,'Auto-throttle pill',    'Self-throttling badge.',P634),
  C(635,'Rate limit info',       'Mono rate-limit usage line.',P635),
  C(636,'API quota chart',       'Quota progress bar with numbers.',P636),
  C(637,'Replay request',        'Re-run a previous request.',P637),
  C(638,'Mock failure toggle',   'Inject failures for resilience testing.',P638),
  C(639,'Chaos mode banner',     'Visible chaos-engineering switch.',P639),
  C(640,'Capacity planner',      'Forecast when capacity will be hit.',P640),
  C(641,'Capacity warning',      'Approaching-cap alert pill.',P641),
  C(642,'Latency budget exceed','Latency over budget alert.',P642),
  C(643,'Failover notice',       'Banner for primary-to-secondary failover.',P643),
  C(644,'Region failover map',   'Map showing active region.',P644),
  C(645,'Backup status',         'Last-backup chip + next time.',P645),
  C(646,'Restore preview',       'Pre-restore impact preview.',P646),
  C(647,'Stress test progress',  'Stress-test progress bar.',P647),
  C(648,'Snapshot diff',         'Mono diff summary between snapshots.',P648),
  C(649,'Performance budget',    'Pass/fail chips for budgets.',P649),
  C(650,'Flame graph',           'Top-N hot spots flame graph mini.',P650),
]

export default meta.map(m => ({ ...m, category:'Reliability' }))
