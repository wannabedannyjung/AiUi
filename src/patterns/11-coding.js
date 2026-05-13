import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('coding', `
.cd { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; }
.cd .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.cd .row  { display:flex; gap:6px; align-items:center; }
.cd .ed   { background:#0e1320; color:#e6e8f0; font-family:var(--mono); font-size:12px; line-height:1.55; padding:8px 10px; border-radius:8px; white-space:pre-wrap; }
.cd .gh   { color: var(--text-mute); font-style: italic; }
.cd .add  { background: rgba(109,212,154,0.12); color: var(--accent-good); }
.cd .del  { background: rgba(249,123,123,0.12); color: var(--accent-bad); }
.cd .gut  { color:var(--text-mute); padding-right:8px; user-select:none; }
.cd table { width:100%; border-collapse: collapse; font-size:12px; font-family: var(--mono); }
.cd th, .cd td { padding:3px 6px; text-align:left; border-bottom:1px solid var(--line); }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'Cursor, Copilot', tags: extra.tags||['coding'], component: comp })

const P501 = defineComponent({ template:`<div class="cd ed">function add(a, b) {<br>  return <span class="gh">a + b // ghost</span><span class="caret"/></div>`})
const P502 = defineComponent({ template:`<div class="cd"><div class="ed">return <span class="gh">a + b</span></div><div class="row"><span class="chip">Tab</span><span class="dim" style="font-size:11px">to accept</span><span class="chip">Esc</span><span class="dim" style="font-size:11px">to dismiss</span></div></div>`})
const P503 = defineComponent({ template:`<div class="cd ed"><span class="add">+ const a = 1</span><br><span class="add">+ const b = 2</span><br><span class="add">+ const c = a + b</span></div>`})
const P504 = defineComponent({ template:`<div class="cd ed">// <span class="gh">computes the discount with cap</span><br>function discount(x) { return Math.min(x*0.1, 50) }</div>`})
const P505 = defineComponent({ template:`<div class="cd row"><button class="mini" style="background:var(--accent);color:#0b0c14">🧪 generate tests</button><span class="dim" style="font-size:11px">→ 6 cases</span></div>`})
const P506 = defineComponent({ template:`<div class="cd ed"><span class="del">- if (x === undefined) {}</span><br><span class="add">+ if (x == null) {}</span></div>`})
const P507 = defineComponent({ template:`<div class="cd card" style="border-left:3px solid var(--accent-warn)"><span class="chip warn">comment · line 42</span><div style="font-size:12px;margin-top:4px">"throw if input is null instead of silently returning"</div></div>`})
const P508 = defineComponent({ template:`<div class="cd card"><b>PR #42 description (auto)</b><div class="dim" style="font-size:12px;margin-top:4px">Adds rate-limiting to /auth, includes tests, no schema changes.</div></div>`})
const P509 = defineComponent({ template:`<div class="cd card mono" style="font-size:12px">feat(auth): add rate-limit per user_id<div class="dim" style="font-size:11px">closes LIN-128</div></div>`})
const P510 = defineComponent({ template:`<div class="cd row mono" style="font-size:12px"><span class="chip accent">branch</span> feat/auth-rate-limit-128 <button class="mini">use</button></div>`})
const P511 = defineComponent({ template:`<div class="cd row"><span class="chip good">✓ build</span><span class="chip good">✓ tests</span><span class="chip warn">○ lint</span><span class="chip">– deploy</span></div>`})
const P512 = defineComponent({ template:`<div class="cd ed"><span class="del">- if (!x) y = 0</span><br><span class="add">+ if (x == null) y = 0</span><br><span class="dim" style="font-size:11px">// covers undefined too — see TS-2347</span></div>`})
const P513 = defineComponent({ template:`<div class="cd card">🍒 cherry-pick commit <code>a1b2c3</code> to <b>main</b><button class="mini" style="margin-left:6px">apply</button></div>`})
const P514 = defineComponent({ template:`<div class="cd card mono" style="font-size:11px;background:rgba(245,193,97,0.06);border-color:var(--accent-warn)">⚠ merge conflict in auth.ts<button class="mini" style="margin-left:6px">AI resolve</button></div>`})
const P515 = defineComponent({ template:`<div class="cd row"><span class="chip bad">eslint · semi-required</span><button class="mini" style="background:var(--accent);color:#0b0c14">⚡ fix all</button></div>`})
const P516 = defineComponent({ template:`<div class="cd card">rename <code>fetchUser</code> → <code>loadUser</code><div class="dim" style="font-size:11px">across 14 files</div><div class="row"><button class="mini" style="background:var(--accent);color:#0b0c14">apply</button><button class="mini">preview</button></div></div>`})
const P517 = defineComponent({ template:`<div class="cd card"><b>usages of <code>authMiddleware</code></b><div v-for="f in ['router.ts:42','app.ts:18','test/auth.spec.ts:9']" :key="f" class="mono" style="font-size:11px">↪ {{ f }}</div></div>`})
const P518 = defineComponent({ template:`<div class="cd card mono" style="font-size:12px">x : <span class="chip">number | undefined</span></div>`})
const P519 = defineComponent({ template:`<div class="cd ed"><span class="add">+ import { ref } from 'vue'</span><br>const x = ref(0)</div>`})
const P520 = defineComponent({ template:`<div class="cd card"><b>scaffold</b><div class="row"><button class="mini">vue-component</button><button class="mini">api-route</button><button class="mini">vitest-suite</button></div></div>`})
const P521 = defineComponent({ template:`<div class="cd card row"><input style="flex:1" placeholder="search code…"/><span class="chip mono">⌘P</span></div>`})
const P522 = defineComponent({ template:`<div class="cd mono" style="font-size:12px"><div>📁 src</div><div>&nbsp;&nbsp;📄 auth.ts <span class="chip warn" style="font-size:10px">3 issues</span></div><div>&nbsp;&nbsp;📄 router.ts <span class="chip good" style="font-size:10px">✓</span></div></div>`})
const P523 = defineComponent({ template:`<div class="cd row"><span class="dim mono">src › auth › </span><b>middleware.ts</b><span class="chip accent" style="margin-left:6px">AI editing</span></div>`})
const P524 = defineComponent({ template:`<div class="cd ed"><span class="dim">function add(a, b)</span> <span style="color:var(--accent-good)">: number</span><span class="caret"/></div>`})
const P525 = defineComponent({ template:`<div class="cd ed"><span class="gh">/** Returns the sum of a and b. */</span><br>function add(a, b) {}</div>`})
const P526 = defineComponent({ template:`<div class="cd card" style="border-color:var(--accent-bad)"><b style="color:var(--accent-bad)">3 tests failed</b><div class="dim mono" style="font-size:11px">expected 7, got NaN · auth.spec.ts:42</div></div>`})
const P527 = defineComponent({ template:`<div class="cd card"><b>stack trace explainer</b><div class="quote" style="font-size:12px">TypeError comes from line 42 — <code>x</code> is undefined when called from /api/healthz.</div></div>`})
const P528 = defineComponent({ template:`<div class="cd card"><span class="chip bad">error · TS2345</span><div style="margin-top:4px">"argument 'x' is not assignable to type 'number'"</div><button class="mini" style="background:var(--accent);color:#0b0c14;margin-top:4px">⚡ AI fix</button></div>`})
const P529 = defineComponent({ template:`<div class="cd ed"><span class="dim">42 |</span> if (x) doIt()<br><span class="dim" style="font-size:10px">↑ AI suggested: add null check</span></div>`})
const P530 = defineComponent({ template:`<div class="cd" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="ed">// AI<br>function add(a,b) { return a+b }</div><div class="ed">// you<br>function add(x,y) { return x+y }</div></div>`})
const P531 = defineComponent({ template:`<div class="cd card mono" style="font-size:11px">⌘K <span class="dim">› quick AI command</span></div>`})
const P532 = defineComponent({ template:`<div class="cd" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="ed">&lt;Btn label="Hi"/&gt;</div><div class="card" style="background:#fff;color:#0b0c14;display:grid;place-items:center"><button style="padding:4px 10px;border-radius:6px">Hi</button></div></div>`})
const P533 = defineComponent({ template:`<div class="cd card row">⌨ AI suggests binding <code>⌘⏎</code> to "Run agent" <button class="mini">accept</button></div>`})
const P534 = defineComponent({ template:`<div class="cd card row"><span class="chip">workspace ✨</span><input style="flex:1" placeholder="ask anything about this repo…"/></div>`})
const P535 = defineComponent({ template:`<div class="cd card"><b>.editorconfig wizard</b><div class="row"><label>tab=</label><input value="2" style="width:36px"/><label>quotes=</label><select><option>'</option><option>"</option></select></div></div>`})
const P536 = defineComponent({ template:`<div class="cd card row"><b>vue</b> <span class="dim">3.5 → 3.6 available</span><button class="mini" style="background:var(--accent);color:#0b0c14;margin-left:auto">upgrade</button></div>`})
const P537 = defineComponent({ template:`<div class="cd card" style="border-color:var(--accent-bad)">🛡 CVE-2026-001 in <b>lodash</b><div class="row" style="margin-top:4px"><button class="mini" style="background:var(--accent);color:#0b0c14">⚡ AI patch</button><span class="dim" style="font-size:11px">bumps to 4.17.22</span></div></div>`})
const P538 = defineComponent({ template:`<div class="cd"><div class="dim">flame graph hint</div><div style="display:flex;align-items:flex-end;gap:1px;height:40px"><div v-for="(h,i) in [10,20,8,30,12,40,16,8,22]" :key="i" :style="{width:'14px',height:h+'px',background:'var(--accent-bad)',borderRadius:'2px'}"/></div><div class="dim" style="font-size:11px">→ "renderUser" eats 38%</div></div>`})
const P539 = defineComponent({ template:`<div class="cd card" style="border-color:var(--accent-warn)">💧 memory leak suspected at <code>cache.set</code> (heap +12 MB / hr)</div>`})
const P540 = defineComponent({ template:`<div class="cd row"><span class="chip">complexity</span><span class="chip warn">cyclomatic 18</span><span class="chip bad">cognitive 22</span></div>`})
const P541 = defineComponent({ template:`<div class="cd card"><b>refactor: extract helper</b><div class="dim" style="font-size:11px">"tipPercent" appears 3× → extract to function</div><button class="mini" style="background:var(--accent);color:#0b0c14;margin-top:4px">apply</button></div>`})
const P542 = defineComponent({ template:`<div class="cd card mono" style="font-size:11px">🐞 step paused at line 42<br>x = <span class="chip warn">undefined</span><br><button class="mini">▶ continue</button></div>`})
const P543 = defineComponent({ template:`<div class="cd card mono" style="font-size:11px">👁 watch &nbsp; user → <span class="chip">{ id: 1, name: "Alex" }</span></div>`})
const P544 = defineComponent({ template:`<div class="cd row"><button class="mini">⌘⌥F · format on save</button><span class="chip good">prettier</span></div>`})
const P545 = defineComponent({ template:`<div class="cd card row"><b>generate Storybook</b><span class="dim" style="font-size:11px">for 6 components</span><button class="mini" style="margin-left:auto;background:var(--accent);color:#0b0c14">go</button></div>`})
const P546 = defineComponent({ template:`<div class="cd card"><b>📖 README.md generated</b><div class="dim mono" style="font-size:11px">includes install, usage, examples, license</div></div>`})
const P547 = defineComponent({ template:`<div class="cd card mono" style="font-size:11px">// 200 fake users generated → users.json</div>`})
const P548 = defineComponent({ template:`<div class="cd ed"><span class="dim">snippet:</span> v3comp<span class="caret"/><div class="dim" style="font-size:10px">expands to a Vue 3 SFC scaffold</div></div>`})
const P549 = defineComponent({ template:`<div class="cd card mono" style="font-size:12px">/(\\d{3})-(\\d{4})/<br><span class="dim">matches:</span> <span class="add">123-4567</span></div>`})
const P550 = defineComponent({ template:`<div class="cd" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="ed">// path A<br>arr.map(x=>x*2)</div><div class="ed">// path B<br>for (const x of arr) result.push(x*2)</div></div>`})

const meta = [
  C(501,'Inline ghost completion','Greyed continuation appears as you type.',P501),
  C(502,'Tab/Esc accept badges',  'Hint pills next to a ghost completion.',P502),
  C(503,'Multi-line edits',       'Several green added lines from the agent.',P503),
  C(504,'Comment generator',      'AI infers and inserts an inline comment.',P504),
  C(505,'Test generation button', 'One-click "generate tests" in the gutter.',P505),
  C(506,'Refactor preview hunk',  'Diff hunk previewing a small refactor.',P506),
  C(507,'Side comment',           'Margin comment from the AI reviewer.',P507),
  C(508,'PR description fill',    'Auto-drafted PR description card.',P508),
  C(509,'Commit message proposal','Conventional-commits style suggestion.',P509),
  C(510,'Branch name suggest',    'Branch name derived from ticket + intent.',P510),
  C(511,'CI status chips',        'Build / tests / lint / deploy chips.',P511),
  C(512,'Diff with explanation',  'Diff line + a brief AI rationale.',P512),
  C(513,'Cherry-pick suggest',    'AI-proposed cherry-pick to another branch.',P513),
  C(514,'AI conflict resolver',   'Suggest a resolution for a merge conflict.',P514),
  C(515,'Lint fix-it',            '"Fix all" button for a lint rule.',P515),
  C(516,'Multi-file rename',      'Rename a symbol across the codebase.',P516),
  C(517,'Find usages',            'List of where a symbol is referenced.',P517),
  C(518,'Type inference popover', 'Inferred TS type chip on a variable.',P518),
  C(519,'Auto add import',        'Missing import inserted at top of file.',P519),
  C(520,'Scaffold buttons',       'One-click scaffolds (component, route, test).',P520),
  C(521,'⌘P code search',         'Editor command-palette search.',P521),
  C(522,'File tree with badges',  'Tree view with per-file issue badges.',P522),
  C(523,'AI-aware breadcrumb',    'File-path breadcrumb plus "AI editing" chip.',P523),
  C(524,'Inferred return type',   'Function signature gains a type.',P524),
  C(525,'JSDoc auto-write',       'AI inserts a JSDoc above a function.',P525),
  C(526,'Test failure summary',   'Count + first failure detail.',P526),
  C(527,'Stack-trace explainer',  'Plain-language explanation of a trace.',P527),
  C(528,'Inline error fix',       '"⚡ AI fix" button on a TS error.',P528),
  C(529,'Codelens AI suggested',  'Subtle inline note above a line.',P529),
  C(530,'AI vs you split',        'Side-by-side AI draft and your draft.',P530),
  C(531,'⌘K AI command palette',  'Universal command bar for AI actions.',P531),
  C(532,'Live component preview', 'Code on left, rendered preview on right.',P532),
  C(533,'AI-suggested keybind',   'Suggests a hotkey for a frequent action.',P533),
  C(534,'Workspace AI search',    'Ask questions about the whole repo.',P534),
  C(535,'.editorconfig wizard',   'Inline form to set indent & quotes.',P535),
  C(536,'Dependency upgrade',     'Suggested package version bump.',P536),
  C(537,'CVE patch suggestion',   'AI patch for a known vulnerability.',P537),
  C(538,'Flame-graph hot path',   'Mini flame graph + AI hint on hot fn.',P538),
  C(539,'Memory leak hint',       'Heap-growth callout pointing to a function.',P539),
  C(540,'Complexity badges',      'Cyclomatic + cognitive complexity chips.',P540),
  C(541,'Extract-helper refactor','Suggest extracting a repeated helper.',P541),
  C(542,'Inline AI debugger',     'Step-pause card with live variable values.',P542),
  C(543,'Watch variable AI',      'Live watch panel of selected expressions.',P543),
  C(544,'Format-on-save chip',    'Indicator that prettier ran on save.',P544),
  C(545,'Storybook generation',   'Generate stories for components.',P545),
  C(546,'README auto-generate',   'README.md scaffolded from code structure.',P546),
  C(547,'Mock data generator',    '200 fake records emitted to a file.',P547),
  C(548,'Snippet expand',         'Type a short trigger; expand into scaffold.',P548),
  C(549,'Live regex tester',      'Regex with sample inputs and matches.',P549),
  C(550,'Compare code paths',     'Side-by-side perf comparison of approaches.',P550),
]

export default meta.map(m => ({ ...m, category:'Coding' }))
