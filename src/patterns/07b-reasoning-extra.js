import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('reason-extra', `
.rx { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.rx .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.rx .row  { display:flex; gap:6px; align-items:center; }
.rx .quote{ font-style:italic; color: var(--text-dim); border-left: 3px solid var(--line-2); padding: 2px 10px; font-size:12px; }
.rx table { width:100%; border-collapse:collapse; font-size:12px; }
.rx th, .rx td { padding:3px 6px; text-align:left; border-bottom:1px solid var(--line); }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'reasoning research', tags: extra.tags||['reasoning'], component: comp })

const P341 = defineComponent({ template:`<div class="rx"><div v-for="(t,i) in ['identify problem','recall similar','compute','verify']" :key="t" class="quote"><b>{{ i+1 }}.</b> {{ t }}</div></div>`})
const P342 = defineComponent({ setup(){ const f=ref('forward'); return {f} }, template:`<div class="rx row"><button class="mini" @click="f='forward'" :style="{background:f==='forward'?'var(--accent)':null,color:f==='forward'?'#0b0c14':null}">→ forward</button><button class="mini" @click="f='backward'" :style="{background:f==='backward'?'var(--accent)':null,color:f==='backward'?'#0b0c14':null}">← backward</button></div>`})
const P343 = defineComponent({ template:`<div class="rx"><div class="dim">self-consistency vote</div><div class="row"><span class="chip">A · 4×</span><span class="chip">B · 1×</span><span class="chip good">A wins</span></div></div>`})
const P344 = defineComponent({ setup(){ const o=ref(false); return {o} }, template:`<div class="rx card"><b>step 2 — derive bounds</b> <button class="mini" @click="o=!o" style="margin-left:6px">{{ o?'collapse':'expand' }}</button><div v-if="o" class="quote" style="margin-top:6px">From x≥0 and x≤10, the range is …</div></div>`})
const P345 = defineComponent({ template:`<div class="rx"><div v-for="t in ['Plan','  Sub-plan A','    leaf 1','    leaf 2','  Sub-plan B','    leaf 3']" :key="t" class="mono" style="font-size:11px">{{ t }}</div></div>`})
const P346 = defineComponent({ template:`<div class="rx"><div class="dim mono">sub-task generation</div><svg width="100%" height="40"><rect x="2" y="6" width="40" height="10" fill="var(--accent)"/><rect x="44" y="20" width="60" height="10" fill="var(--accent-2)"/><rect x="106" y="6" width="50" height="10" fill="var(--accent-warn)"/></svg></div>`})
const P347 = defineComponent({ template:`<div class="rx" style="align-items:center"><svg width="240" height="80"><line x1="40" y1="40" x2="200" y2="40" stroke="var(--accent)" stroke-dasharray="4 3"/><circle cx="40" cy="40" r="14" fill="var(--accent)"/><circle cx="200" cy="40" r="14" fill="var(--accent-2)"/><text x="40" y="44" font-size="9" text-anchor="middle" fill="#0b0c14">A</text><text x="200" y="44" font-size="9" text-anchor="middle" fill="#0b0c14">B</text><text x="120" y="34" font-size="10" text-anchor="middle" fill="var(--text-dim)">linked-fact</text></svg></div>`})
const P348 = defineComponent({ template:`<div class="rx" style="align-items:center"><svg width="240" height="80"><g v-for="(n,i) in [{x:40,y:40,t:'rain'},{x:120,y:40,t:'wet'},{x:200,y:40,t:'slip'}]" :key="i"><circle :cx="n.x" :cy="n.y" r="14" fill="var(--accent)"/><text :x="n.x" :y="n.y+3" font-size="9" text-anchor="middle" fill="#0b0c14">{{ n.t }}</text></g><line x1="54" y1="40" x2="106" y2="40" stroke="var(--accent)" marker-end="url(#m)"/><line x1="134" y1="40" x2="186" y2="40" stroke="var(--accent)" marker-end="url(#m)"/><defs><marker id="m" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L 6 3 L 0 6 z" fill="var(--accent)"/></marker></defs></svg></div>`})
const P349 = defineComponent({ template:`<div class="rx card"><span class="chip warn">counterfactual</span><div style="margin-top:4px">If the lock <b>were not</b> applied, you'd see double-charge errors.</div></div>`})
const P350 = defineComponent({ template:`<div class="rx" style="align-items:center"><svg width="240" height="80"><line x1="120" y1="20" x2="60" y2="60" stroke="var(--line-2)"/><line x1="120" y1="20" x2="180" y2="60" stroke="var(--line-2)" stroke-dasharray="3 3"/><g v-for="(n,i) in [{x:120,y:20,t:'now'},{x:60,y:60,t:'A'},{x:180,y:60,t:'B?'}]" :key="i"><circle :cx="n.x" :cy="n.y" r="14" :fill="n.t==='B?'?'var(--bg-3)':'var(--accent)'" stroke="var(--line-2)"/><text :x="n.x" :y="n.y+3" font-size="9" text-anchor="middle" :fill="n.t==='B?'?'var(--text)':'#0b0c14'">{{ n.t }}</text></g></svg></div>`})
const P351 = defineComponent({ template:`<div class="rx"><table><tr><th>step</th><th>est cost</th></tr><tr><td>read repo</td><td>$0.01</td></tr><tr><td>search docs</td><td>$0.02</td></tr><tr><td>refactor</td><td>$0.10</td></tr></table></div>`})
const P352 = defineComponent({ template:`<div class="rx row"><span class="chip good">✓ verified</span><span class="dim" style="font-size:11px">step output passed self-check</span></div>`})
const P353 = defineComponent({ template:`<div class="rx"><div class="quote">looking up auth docs…</div><div class="quote">found rate-limit at 60 r/m</div><div class="quote">applying to handler…</div></div>`})
const P354 = defineComponent({ template:`<div class="rx card" style="border-color:var(--accent-warn)"><span class="chip warn">reflexion</span><div style="margin-top:4px;font-style:italic">"My initial answer assumed Postgres ≥ 13. Need to clarify."</div></div>`})
const P355 = defineComponent({ template:`<div class="rx mono" style="font-size:11px"><div>thought: I should grep auth files</div><div>action: grep("authMiddleware")</div><div>observation: 4 hits</div><div>thought: pick src/auth.ts</div></div>`})
const P356 = defineComponent({ template:`<div class="rx row"><span style="color:var(--accent-good);font-size:18px">✓</span><span>self-verified by re-running on 3 sample inputs</span></div>`})
const P357 = defineComponent({ template:`<div class="rx card" style="background:rgba(245,193,97,0.06);border-color:var(--accent-warn)">💡 <b>key insight:</b> the bug is in the <i>retry</i> path, not the main flow.</div>`})
const P358 = defineComponent({ template:`<div class="rx"><div class="dim">plan revisions</div><div v-for="(p,i) in ['v1: 5 steps','v2: 6 steps (added test)','v3: 4 steps (merged 2,3)']" :key="p" class="card" style="font-size:12px;padding:4px 8px">{{ p }}</div></div>`})
const P359 = defineComponent({ template:`<div class="rx card row"><span class="chip warn">approval needed</span><span style="flex:1">plan ready · 4 steps</span><button class="mini" style="background:var(--accent-good);color:#0b0c14">approve</button><button class="mini">deny</button></div>`})
const P360 = defineComponent({ template:`<div class="rx" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">plan A · 5 steps · $0.30</div><div class="card" style="border-color:var(--accent-good)">plan B · 4 steps · $0.18 ★</div></div>`})
const P361 = defineComponent({ template:`<div class="rx pill">🧮 reasoned for 3.2s · 1,840 tokens</div>`})
const P362 = defineComponent({ template:`<div class="rx"><div v-for="(s,i) in [['identify',92],['compute',78],['verify',88]]" :key="s[0]" class="row"><span style="width:80px">{{ s[0] }}</span><div style="flex:1;height:5px;background:var(--bg-3);border-radius:4px"><div :style="{width:s[1]+'%',height:'100%',background:'var(--accent-good)'}"/></div><span class="mono mute" style="width:34px;text-align:right">{{ s[1] }}</span></div></div>`})
const P363 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="rx" style="position:relative"><div class="quote" @mouseenter="h=true" @mouseleave="h=false">step 4: apply the trapezoidal rule</div><div v-if="h" class="card" style="position:absolute;top:30px;left:0;width:240px;font-size:11px">computes the integral as the sum of trapezoid areas — accurate when f is smooth.</div></div>`})
const P364 = defineComponent({ template:`<div class="rx card"><div class="row"><b>H1: stale cache</b><span class="chip good" style="margin-left:auto">✓ confirmed</span></div></div>`})
const P365 = defineComponent({ template:`<div class="rx card"><b>decision:</b> use Postgres advisory locks<div class="quote" style="margin-top:4px">— safer than in-process mutex; works across replicas.</div></div>`})
const P366 = defineComponent({ template:`<div class="rx card" style="border-left:3px solid var(--accent-warn)"><span class="chip warn">critique</span> step 3 may underestimate retry latency.</div>`})
const P367 = defineComponent({ template:`<div class="rx"><div class="card row" style="padding:4px 8px"><b>group A · setup</b> <span class="mute" style="margin-left:auto">3 steps</span><span style="margin-left:6px">▸</span></div><div class="card row" style="padding:4px 8px"><b>group B · solve</b><span class="mute" style="margin-left:auto">5 steps</span><span style="margin-left:6px">▾</span></div></div>`})
const P368 = defineComponent({ template:`<div class="rx"><table><tr><th>#</th><th>step</th><th>conf</th></tr><tr v-for="(s,i) in [['parse',92],['plan',78],['act',85]]" :key="s[0]"><td>{{ i+1 }}</td><td>{{ s[0] }}</td><td>{{ s[1] }}%</td></tr></table></div>`})
const P369 = defineComponent({ template:`<div class="rx pill">🏆 reasoning score · 87 / 100</div>`})
const P370 = defineComponent({ setup(){ const t=ref(40); return {t} }, template:`<div class="rx"><input type="range" min="0" max="100" v-model.number="t"/><div class="dim">replay reasoning at frame {{ t }}/100</div></div>`})
const P371 = defineComponent({ template:`<div class="rx mono" style="font-size:11px"><div>▶ step 1 — input parsed</div><div>▶ step 2 — plan generated</div><div>⏸ step 3 — paused (breakpoint)</div></div>`})
const P372 = defineComponent({ template:`<div class="rx pill" style="background:rgba(109,212,154,0.1);color:var(--accent-good);border-color:rgba(109,212,154,0.4)">⚡ cached · 0ms</div>`})
const P373 = defineComponent({ setup(){ const d=ref(2); return {d} }, template:`<div class="rx"><div class="row"><span>depth</span><input type="range" min="1" max="6" v-model.number="d" style="flex:1"/><span class="mono">{{ d }}</span></div><div class="dim" style="font-size:11px">deeper trees = more options explored, more cost</div></div>`})
const P374 = defineComponent({ template:`<div class="rx" style="align-items:center"><svg width="220" height="80" viewBox="0 0 220 80"><line x1="110" y1="14" x2="40" y2="60" stroke="var(--line-2)"/><line x1="110" y1="14" x2="110" y2="60" stroke="var(--accent)" stroke-width="2"/><line x1="110" y1="14" x2="180" y2="60" stroke="var(--line-2)"/><circle cx="110" cy="14" r="10" fill="var(--accent)"/><circle cx="40" cy="60" r="10" fill="var(--bg-3)" stroke="var(--line-2)"/><circle cx="110" cy="60" r="10" fill="var(--accent)"/><circle cx="180" cy="60" r="10" fill="var(--bg-3)" stroke="var(--line-2)"/></svg></div>`})
const P375 = defineComponent({ template:`<div class="rx"><div class="dim">beam search · width 3</div><div class="row"><span class="chip">A · 0.71</span><span class="chip">B · 0.62</span><span class="chip">C · 0.41</span></div></div>`})
const P376 = defineComponent({ template:`<div class="rx mono" style="font-size:11px"><span class="chip">ReAct</span> tool=web_search · obs=4hits · next=fetch</div>`})
const P377 = defineComponent({ template:`<div class="rx card">💡 <b>plan optimisation:</b> steps 2 and 3 can run in parallel — saves 1.2s.</div>`})
const P378 = defineComponent({ template:`<div class="rx"><div class="dim">confidence funnel</div><div style="margin:0 auto;width:120px;height:60px;background:linear-gradient(180deg, var(--accent), var(--accent-warn), var(--accent-bad));clip-path:polygon(0 0,100% 0,75% 100%,25% 100%)"></div></div>`})
const P379 = defineComponent({ template:`<div class="rx" style="align-items:center"><svg width="220" height="80"><line x1="40" y1="40" x2="100" y2="40" stroke="var(--line-2)"/><line x1="100" y1="40" x2="160" y2="20" stroke="var(--line-2)"/><line x1="100" y1="40" x2="160" y2="60" stroke="var(--line-2)"/><g v-for="(n,i) in [{x:40,y:40,t:'1'},{x:100,y:40,t:'2'},{x:160,y:20,t:'3a'},{x:160,y:60,t:'3b'}]" :key="i"><circle :cx="n.x" :cy="n.y" r="14" fill="var(--bg-3)" stroke="var(--line-2)"/><text :x="n.x" :y="n.y+3" font-size="9" text-anchor="middle" fill="#e6e8f0">{{ n.t }}</text></g></svg></div>`})
const P380 = defineComponent({ template:`<div class="rx" style="align-items:center"><svg width="240" height="80"><rect x="2" y="20" width="60" height="40" fill="var(--accent)" rx="4"/><rect x="90" y="20" width="60" height="40" fill="var(--accent-2)" rx="4"/><rect x="178" y="20" width="60" height="40" fill="var(--accent-warn)" rx="4"/><line x1="62" y1="40" x2="90" y2="40" stroke="var(--line-2)" stroke-width="2"/><line x1="150" y1="40" x2="178" y2="40" stroke="var(--line-2)" stroke-width="2"/><text x="32" y="44" font-size="11" text-anchor="middle" fill="#0b0c14">parse</text><text x="120" y="44" font-size="11" text-anchor="middle" fill="#0b0c14">reason</text><text x="208" y="44" font-size="11" text-anchor="middle" fill="#0b0c14">act</text></svg></div>`})

const meta = [
  C(341,'Linear CoT trace',     'Numbered chain-of-thought as quoted lines.',P341),
  C(342,'Forward/backward toggle','Switch reasoning direction.',P342),
  C(343,'Self-consistency vote','Tally of N samples voting on best answer.',P343,{inspiration:'self-consistency papers'}),
  C(344,'Step expansion',       'Click a reasoning step to expand details.',P344),
  C(345,'Plan tree (sub-plans)','Nested plan tree as indented mono lines.',P345),
  C(346,'Sub-task gen timeline','Gantt of when each sub-task was generated.',P346),
  C(347,'Knowledge bridge',     'Two facts joined by an inferred connection.',P347),
  C(348,'Causal chain graph',   '"rain → wet → slip" causal arrows.',P348),
  C(349,'Counterfactual card',  '"If X had not happened…" callout.',P349),
  C(350,'What-if branches',     'Branching diagram of hypothetical paths.',P350),
  C(351,'Plan cost table',      'Estimated cost per planned step.',P351),
  C(352,'Verified-step badge',  'Self-verification chip on a step.',P352),
  C(353,'Tool reasoning trace', 'Italic quotes describing tool selection.',P353),
  C(354,'Reflexion log',        'Reflective callout the model writes about itself.',P354,{inspiration:'reflexion paper'}),
  C(355,'ReAct trace block',    'Thought / Action / Observation triplets.',P355,{inspiration:'ReAct paper'}),
  C(356,'Self-verify check',    'Big check confirming output validity.',P356),
  C(357,'Key insight callout',  'Highlighted "aha" insight from reasoning.',P357),
  C(358,'Plan revision history','Stack of plan revisions over time.',P358),
  C(359,'Plan approval gate',   'Approval pill before execution.',P359),
  C(360,'Plan A/B compare',     'Two candidate plans side-by-side with badge.',P360),
  C(361,'Reasoning meta info',  'Time + tokens spent reasoning.',P361),
  C(362,'Per-step confidence',  'Confidence bar per reasoning step.',P362),
  C(363,'Step explainer popover','Hover any step for a plain-language explainer.',P363),
  C(364,'Hypothesis test result','Confirm/refute hypothesis card.',P364),
  C(365,'Decision rationale',   'Big decision plus quoted rationale.',P365),
  C(366,'Critique annotation',  'Critic margin note on a reasoning step.',P366),
  C(367,'Step grouping',        'Collapsible groups of related steps.',P367),
  C(368,'Reasoning table view', 'Tabular view of the reasoning chain.',P368),
  C(369,'Reasoning scoreboard', 'Aggregate score for the reasoning quality.',P369),
  C(370,'Reasoning replay slider','Scrub through reasoning frames.',P370),
  C(371,'Stepwise debugging',   'Console-style stepwise debug listing.',P371),
  C(372,'Cached step badge',    'Badge when a reasoning step is served from cache.',P372),
  C(373,'Reasoning depth dial', 'Slider for how deep to explore alternatives.',P373),
  C(374,'Tree-of-thought leaves','Branching tree with chosen leaf highlighted.',P374,{inspiration:'Tree-of-Thoughts'}),
  C(375,'Beam search candidates','Top-N beam candidates with scores.',P375),
  C(376,'ReAct trace tag',      'One-line ReAct trace summary.',P376),
  C(377,'Optimisation hint',    'Inline suggestion to parallelize plan steps.',P377),
  C(378,'Confidence funnel',    'Funnel illustration of dwindling confidence.',P378),
  C(379,'Step dependency graph','DAG of which steps depend on which.',P379),
  C(380,'Reasoning flow diagram','Parse → Reason → Act block diagram.',P380),
]

export default meta.map(m => ({ ...m, category:'Reasoning' }))
