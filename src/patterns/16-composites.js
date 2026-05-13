import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('compose', `
.cp { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; position:relative; }
.cp .card { background: var(--bg-3); border:1px solid var(--line); border-radius:8px; padding:8px 10px; }
.cp .row  { display:flex; gap:6px; align-items:center; }
.cp .av   { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,#7d6df1,#6df1c4); display:grid; place-items:center; color:#0b0c14; font-weight:800; }
.cp .speech { background:#fff; color:#0b0c14; padding:6px 10px; border-radius:10px; position:relative; max-width:80%; font-size:12px; }
.cp .speech::after { content:''; position:absolute; left:-6px; top:8px; border:6px solid transparent; border-right-color:#fff; }
.cp .tip { position:absolute; background:#000; color:#fff; padding:6px 10px; border-radius:8px; font-size:11px; max-width:200px; box-shadow: 0 6px 16px rgba(0,0,0,0.4); z-index:5; }
.cp .tip::after { content:''; position:absolute; left:50%; bottom:-6px; transform:translateX(-50%); border:6px solid transparent; border-top-color:#000; }
.cp .term { color:var(--accent); border-bottom:1px dashed var(--accent); cursor:help; }
@keyframes wave { 0%,100% { transform: rotate(0)} 25%{transform:rotate(20deg)} 75%{transform:rotate(-15deg)} }
.cp .wave { display:inline-block; transform-origin:70% 70%; animation: wave 2s ease-in-out infinite; }
@keyframes pulse3 { 0%,100% { box-shadow:0 0 0 0 rgba(139,140,247,0.6)} 50%{box-shadow:0 0 0 14px rgba(139,140,247,0)} }
.cp .pulse3 { animation: pulse3 1.6s infinite; border-radius:8px; }
@keyframes ghost { 0%,100% { transform: translate(20px, 14px)} 50%{transform: translate(60px, 40px)} }
.cp .ghostc { width:14px; height:14px; border-radius:50%; background:rgba(139,140,247,0.6); position:absolute; pointer-events:none; animation: ghost 2.5s ease-in-out infinite; }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'composite UX', tags: extra.tags||['composite'], component: comp })

// 751 Avatar tour guide
const P751 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">A</div><div class="speech">Hi! I'm <b>Aiden</b>. Let me walk you through.</div></div><div class="card pulse3" style="margin-left:50px;border-color:var(--accent)">click here ↑</div></div>`})
// 752 Hover word → balloon tooltip
const P752 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><div class="card">Use a <span class="term" @mouseenter="h=true" @mouseleave="h=false">CRDT</span> to merge edits.</div><div v-if="h" class="tip" style="left:60px;top:46px"><b>CRDT</b> · Conflict-free Replicated Data Type — automatic distributed merge.</div></div>`})
// 753 Hover word → mini AI explainer
const P753 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><div class="card">Concept: <span class="term" @mouseenter="h=true" @mouseleave="h=false">attention</span></div><div v-if="h" class="card" style="border-color:var(--accent);margin-top:4px"><div class="row"><div class="av" style="width:24px;height:24px;font-size:11px">A</div><div class="dim mono" style="font-size:11px">Aiden explains</div></div><div style="margin-top:4px;font-size:12px">Attention lets each token "look" at other tokens proportionally to relevance.</div></div></div>`})
// 754 Click word → side panel
const P754 = defineComponent({ setup(){ const o=ref(false); return {o} }, template:`<div class="cp" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">Click <span class="term" @click="o=!o">attention</span> to learn more.</div><div v-if="o" class="card"><b>Attention</b><div class="dim" style="font-size:12px">A weighted average over inputs, weights derived from query·key dot-products.</div></div></div>`})
// 755 Selection → AI quick-action
const P755 = defineComponent({ setup(){ const sel=ref(false); return {sel} }, template:`<div class="cp"><div class="card" @mouseup="sel=true" style="user-select:text">Highlight <mark style="background:var(--accent-warn);color:#0b0c14">this phrase</mark> to see actions.</div><div v-if="sel" class="row" style="background:#000;padding:4px 6px;border-radius:8px;align-self:flex-start"><button class="mini">✨ improve</button><button class="mini">🌐 translate</button><button class="mini">💡 explain</button></div></div>`})
// 756 Spotlight + arrow + speech
const P756 = defineComponent({ template:`<div class="cp" style="position:relative;height:140px"><div class="card" style="position:absolute;left:60px;top:50px;padding:6px 12px">Save</div><svg style="position:absolute;left:0;top:60px" width="60" height="20"><path d="M0 10 L 50 10" stroke="var(--accent)" stroke-width="2"/><polygon points="50,10 42,5 42,15" fill="var(--accent)"/></svg><div class="speech" style="position:absolute;right:10px;top:8px">click <b>Save</b> first.</div></div>`})
// 757 Coach avatar with next button
const P757 = defineComponent({ template:`<div class="cp"><div class="card row"><div class="av">A</div><div style="flex:1"><b>tip 2 of 5</b><div class="dim" style="font-size:12px">try @-mentioning a file.</div></div><button class="mini" style="background:var(--accent);color:#0b0c14">next →</button></div></div>`})
// 758 Voice + lipsync avatar
const P758 = defineComponent({ template:`<div class="cp" style="align-items:center;justify-content:center"><div style="font-size:48px;animation: wave 0.4s steps(2) infinite">🗣️</div><div class="dim mono" style="font-size:11px">narrating · 0:08</div></div>`})
// 759 Animated ghost cursor demo
const P759 = defineComponent({ template:`<div class="cp" style="position:relative;height:140px"><div class="card">a target panel</div><div class="ghostc"></div></div>`})
// 760 Inline AI commentary on chart
const P760 = defineComponent({ template:`<div class="cp"><div class="card"><svg viewBox="0 0 200 60" width="100%" height="60"><polyline points="0,40 30,30 60,35 90,18 120,22 150,8 180,12" fill="none" stroke="var(--accent)" stroke-width="2"/></svg></div><div class="row"><div class="av" style="width:24px;height:24px;font-size:11px">A</div><div class="dim" style="font-size:12px">"Sales spiked sharply at week 4 — likely the promo."</div></div></div>`})
// 761 Hover button -> tooltip + demo
const P761 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><button class="mini" style="background:var(--accent);color:#0b0c14;align-self:flex-start" @mouseenter="h=true" @mouseleave="h=false">Generate</button><div v-if="h" class="tip" style="left:0;top:38px;width:200px;max-width:none"><div>creates a 4-up image grid<br><span class="dim">(demo plays on hover)</span></div></div></div>`})
// 762 Inline ghost help in field
const P762 = defineComponent({ template:`<div class="cp"><div class="card" style="position:relative"><input style="width:100%" placeholder=""/><span style="position:absolute;left:18px;top:14px;color:var(--text-mute);pointer-events:none">try: "what's the weather in Seoul?"</span></div></div>`})
// 763 Hover icon → mini video popover
const P763 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><span class="card" style="display:inline-grid;place-items:center;width:36px;height:36px;cursor:help" @mouseenter="h=true" @mouseleave="h=false">⚙</span><div v-if="h" class="tip" style="left:46px;top:0;width:160px;max-width:none"><div style="aspect-ratio:16/9;background:#000;border-radius:6px;display:grid;place-items:center;color:#fff">▶ 0:08 demo</div></div></div>`})
// 764 Hover image → AI alt text
const P764 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp" style="position:relative"><div class="card" @mouseenter="h=true" @mouseleave="h=false" style="width:160px;height:90px;background:linear-gradient(135deg,#7d6df1,#3a64f1)"></div><div v-if="h" class="tip" style="left:0;top:96px;width:200px;max-width:none">"a purple-to-blue gradient panel" · alt-text inferred</div></div>`})
// 765 Hover code → AI overlay
const P765 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><pre class="mono" style="background:#000;color:#a4f06d;padding:6px 10px;border-radius:6px" @mouseenter="h=true" @mouseleave="h=false">arr.reduce((a,b)=>a+b, 0)</pre><div v-if="h" class="tip" style="left:0;top:50px;width:240px;max-width:none">sums all numbers in the array, starting from 0.</div></div>`})
// 766 Hover sentence → source preview
const P766 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><div class="card"><span class="term" @mouseenter="h=true" @mouseleave="h=false">Transformers outperform RNNs.</span></div><div v-if="h" class="tip" style="left:30px;top:60px;width:240px;max-width:none"><div class="dim mono" style="font-size:10px">arXiv 2024</div>"Attention Is All You Need v2"</div></div>`})
// 767 Hover term → wikipedia card
const P767 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><div class="card">A <span class="term" @mouseenter="h=true" @mouseleave="h=false">monad</span> wraps a computation.</div><div v-if="h" class="tip" style="left:30px;top:60px;width:220px;max-width:none"><b>Monad</b><div class="dim">Algebraic structure consisting of a type constructor and two operations…</div></div></div>`})
// 768 Hover graph → numbers panel
const P768 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><div class="card" @mouseenter="h=true" @mouseleave="h=false"><svg viewBox="0 0 100 40" width="100%" height="40"><polyline points="0,30 25,20 50,25 75,10 100,15" fill="none" stroke="var(--accent)" stroke-width="2"/></svg></div><div v-if="h" class="card" style="border-color:var(--accent)"><span class="mono">[30, 20, 25, 10, 15]</span> · max 30 · avg 20</div></div>`})
// 769 Hover row → quick action menu
const P769 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><div class="card row" @mouseenter="h=true" @mouseleave="h=false"><span style="flex:1">row #42 · alice@acme.io</span><div v-if="h" class="row" style="margin-left:auto"><button class="mini">edit</button><button class="mini">archive</button><button class="mini">⋯</button></div></div></div>`})
// 770 Hover Gantt → dependencies
const P770 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><svg width="100%" height="40" viewBox="0 0 200 40" @mouseenter="h=true" @mouseleave="h=false"><rect x="2" y="6" width="40" height="10" fill="var(--accent)"/><rect x="44" y="22" width="80" height="10" fill="var(--accent-2)"/></svg><div v-if="h" class="tip" style="left:30px;top:56px;width:200px;max-width:none">"writer" depends on "researcher" finishing first.</div></div>`})
// 771 Avatar appears on first error
const P771 = defineComponent({ template:`<div class="cp"><div class="card" style="border-color:var(--accent-bad)">Error 429 — too many requests</div><div class="row" style="margin-top:6px"><div class="av" style="background:var(--accent-bad);color:#fff">!</div><div class="speech">Looks like a rate limit. Want me to retry in 30s?</div></div></div>`})
// 772 Avatar celebrates
const P772 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av wave">🎉</div><div class="speech">Nice — first artifact saved!</div></div></div>`})
// 773 Avatar reads chart
const P773 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">A</div><div class="speech">"Sales rose 12% week-over-week, peaking on Wednesday."</div></div></div>`})
// 774 Avatar walks through dashboard
const P774 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">A</div><div class="speech">First, look at <b>Active users</b> top-left — that's your headline metric.</div></div><div class="row" style="margin-top:auto"><button class="mini">‹ back</button><button class="mini" style="margin-left:auto;background:var(--accent);color:#0b0c14">next →</button></div></div>`})
// 775 Avatar gestures to FAB
const P775 = defineComponent({ template:`<div class="cp" style="position:relative;height:140px"><div class="row"><div class="av">A</div><div class="speech">tap <b>＋</b> to add</div></div><div style="position:absolute;right:10px;bottom:10px;width:48px;height:48px;border-radius:50%;background:var(--accent);color:#0b0c14;display:grid;place-items:center;font-size:22px" class="pulse3">+</div></div>`})
// 776 Multi-avatar conversation
const P776 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">A</div><div class="speech" style="background:#fff">I'll research.</div></div><div class="row" style="justify-content:flex-end"><div class="speech" style="background:var(--accent);color:#0b0c14">I'll write.</div><div class="av" style="background:var(--accent-2)">B</div></div></div>`})
// 777 AR overlay with arrow
const P777 = defineComponent({ template:`<div class="cp" style="height:140px;position:relative;background:linear-gradient(135deg,#1f2740,#0e1320);border-radius:8px"><svg style="position:absolute;left:30%;top:30%" width="100" height="40"><path d="M0 20 L 80 20" stroke="var(--accent)" stroke-width="3" stroke-dasharray="6 4"/><polygon points="80,20 70,12 70,28" fill="var(--accent)"/></svg><div class="tip" style="left:30%;top:60%;background:var(--accent);color:#0b0c14">that's your camera</div></div>`})
// 778 Spotlight + dimmed
const P778 = defineComponent({ template:`<div class="cp" style="position:relative;height:140px;background:rgba(0,0,0,0.7);border-radius:8px"><div style="position:absolute;left:30%;top:30%;width:100px;height:50px;background:var(--bg-3);border:2px solid var(--accent);border-radius:6px;display:grid;place-items:center" class="pulse3">target</div></div>`})
// 779 Empty state + illustration + CTA
const P779 = defineComponent({ template:`<div class="cp empty" style="display:grid;place-items:center;border:2px dashed var(--line-2);border-radius:10px;padding:18px"><div style="font-size:36px">📭</div><b>nothing yet</b><div class="dim">try asking the agent something.</div><button class="mini" style="background:var(--accent);color:#0b0c14;margin-top:6px">start</button></div>`})
// 780 Empty + agent suggestions
const P780 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">A</div><div class="speech">need ideas? try one of these:</div></div><div class="row" style="flex-wrap:wrap"><button class="mini">summarize my week</button><button class="mini">explain CRDTs</button><button class="mini">refactor auth.ts</button></div></div>`})
// 781 Onboarding avatar in corner
const P781 = defineComponent({ template:`<div class="cp" style="position:relative;height:140px"><div class="card" style="height:100%"></div><div class="row" style="position:absolute;right:8px;bottom:8px;align-items:flex-end"><div class="av">A</div><div class="speech">tap me anytime!</div></div></div>`})
// 782 Persistent helper bar
const P782 = defineComponent({ template:`<div class="cp"><div class="card row" style="background:rgba(139,140,247,0.06);border-color:var(--accent)"><span class="av" style="width:22px;height:22px;font-size:10px">A</span><span style="flex:1">help bar · always here if you need a hand</span><button class="mini">ask</button></div></div>`})
// 783 Side AI panel updates with focus
const P783 = defineComponent({ template:`<div class="cp" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">focus moves around the page; AI panel updates →</div><div class="card" style="border-color:var(--accent)"><b>about this section</b><div class="dim" style="font-size:12px">explainer for the focused element.</div></div></div>`})
// 784 Inline context-sensitive help
const P784 = defineComponent({ template:`<div class="cp"><label>API key <span class="term">?</span></label><input value="sk-..." style="width:100%"/><div class="dim" style="font-size:11px">found in your account → settings → API keys.</div></div>`})
// 785 Inline summarize button on long article
const P785 = defineComponent({ template:`<div class="cp card"><div class="row"><b>Long article (4 min read)</b><button class="mini" style="margin-left:auto">✨ summarize</button></div><div class="dim" style="font-size:12px">…lorem ipsum dolor sit amet…</div></div>`})
// 786 Inline rewrite-with-AI on selection
const P786 = defineComponent({ template:`<div class="cp card">"This is the original text." <button class="mini" style="margin-left:6px">✨ rewrite</button></div>`})
// 787 Inline AI explainer in calendar
const P787 = defineComponent({ template:`<div class="cp" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">📅 Wed · 3pm meeting (12 attendees)</div><div class="card" style="border-color:var(--accent)"><div class="dim mono" style="font-size:11px">AI</div>busy day — consider blocking 2h focus time after this.</div></div>`})
// 788 Inline AI suggestion in form field
const P788 = defineComponent({ template:`<div class="cp"><input value="Thanks for reaching " style="width:100%"/><div class="row"><span class="dim" style="font-size:11px">AI suggests:</span><button class="mini">"out — I'll get back to you tomorrow."</button></div></div>`})
// 789 Inline AI form-fill from one field
const P789 = defineComponent({ template:`<div class="cp"><input value="Acme Co · alex@acme.io" placeholder="paste a contact" style="width:100%"/><div class="card" style="margin-top:4px"><div class="row"><span style="width:60px">name</span><b>Alex</b></div><div class="row"><span style="width:60px">company</span><b>Acme Co</b></div><div class="row"><span style="width:60px">email</span><b>alex@acme.io</b></div></div></div>`})
// 790 Inline AI translate button
const P790 = defineComponent({ template:`<div class="cp card row"><span style="flex:1">"안녕하세요"</span><button class="mini">🌐 → EN</button></div>`})
// 791 AI summary above article
const P791 = defineComponent({ template:`<div class="cp"><div class="card" style="background:rgba(139,140,247,0.06);border-color:var(--accent)"><span class="chip accent">TL;DR</span><div style="margin-top:4px">"the article argues that small models can outperform big ones with the right data."</div></div><div class="card" style="margin-top:6px">…full article text…</div></div>`})
// 792 Inline AI argument map
const P792 = defineComponent({ template:`<div class="cp" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">debate text</div><div class="card"><b>argument map</b><div>claim → evidence → counter</div></div></div>`})
// 793 Inline AI fact-check chip
const P793 = defineComponent({ template:`<div class="cp card">"The Eiffel Tower is in Berlin." <span class="chip bad" style="margin-left:6px">✗ fact-check</span></div>`})
// 794 Inline AI sentiment overlay
const P794 = defineComponent({ template:`<div class="cp card"><span style="background:rgba(109,212,154,0.15)">"absolutely loved this"</span> · <span class="chip good">positive</span></div>`})
// 795 Inline AI definition reveal
const P795 = defineComponent({ template:`<div class="cp card">In a CRDT, <span class="term">eventual consistency</span> means all replicas converge.</div>`})
// 796 Chat + canvas with explainer
const P796 = defineComponent({ template:`<div class="cp" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">chat</div><div class="card"><span class="chip accent">canvas</span><div class="dim" style="font-size:11px">artifact lives here</div></div></div>`})
// 797 Ghost cursor + voice narration
const P797 = defineComponent({ template:`<div class="cp" style="position:relative"><div class="card row"><div class="av" style="width:24px;height:24px;font-size:11px">A</div><div class="dim mono" style="font-size:11px">"…now click here"</div></div><div class="ghostc"></div></div>`})
// 798 Hover chart + AI narration
const P798 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><div class="card" @mouseenter="h=true" @mouseleave="h=false"><svg width="100%" height="40" viewBox="0 0 100 40"><polyline points="0,30 25,15 50,25 75,5 100,12" fill="none" stroke="var(--accent)" stroke-width="2"/></svg></div><div v-if="h" class="row"><div class="av" style="width:22px;height:22px;font-size:10px">A</div><div class="dim" style="font-size:12px">"week 4 jumped 60%."</div></div></div>`})
// 799 Onboard tour with avatar + spotlight + voice
const P799 = defineComponent({ template:`<div class="cp" style="position:relative;height:140px"><div class="card pulse3" style="position:absolute;left:60px;top:50px">target</div><div class="row" style="position:absolute;right:8px;bottom:8px"><div class="av">A</div><div class="speech">"first, click here."</div></div></div>`})
// 800 Form field with avatar coach
const P800 = defineComponent({ template:`<div class="cp"><label>password</label><input type="password" value="abc" style="width:100%"/><div class="row"><div class="av" style="width:22px;height:22px;font-size:10px">A</div><div class="dim" style="font-size:12px">"add 8+ chars and a symbol for extra safety"</div></div></div>`})
// 801 Doc reading with margin annotations
const P801 = defineComponent({ template:`<div class="cp" style="position:relative"><div class="card">A long paragraph about caching.</div><div class="card" style="position:absolute;right:-10px;top:0;width:100px;font-size:11px;background:#f5e89c;color:#3d3a16;padding:6px;border-radius:6px;transform:rotate(2deg)">"add a note about TTL"</div></div>`})
// 802 Search + AI autocomplete + preview
const P802 = defineComponent({ template:`<div class="cp"><input value="how to use vue ref" style="width:100%"/><div class="card mono" style="font-size:11px">✨ "in Vue 3, ref() makes a value reactive…"</div></div>`})
// 803 Card 3D flip to AI explanation
const P803 = defineComponent({ setup(){ const f=ref(false); return {f} }, template:`<div class="cp" style="perspective:600px;align-items:center"><div :style="{transition:'transform .6s',transform: f?'rotateY(180deg)':'none',width:'160px',height:'90px',position:'relative',transformStyle:'preserve-3d'}" @click="f=!f"><div class="card" style="position:absolute;inset:0;backface-visibility:hidden;display:grid;place-items:center">click me</div><div class="card" style="position:absolute;inset:0;backface-visibility:hidden;transform:rotateY(180deg);background:var(--accent);color:#0b0c14;display:grid;place-items:center">AI explainer!</div></div></div>`})
// 804 Avatar + sticky note coachmarks
const P804 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">A</div><div style="background:#f5e89c;color:#3d3a16;padding:6px 10px;border-radius:6px;transform:rotate(-2deg);font-size:12px">"open the menu →"</div></div></div>`})
// 805 Hover diff line → rationale
const P805 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp card mono" style="font-size:12px"><div style="background:rgba(109,212,154,0.1);color:var(--accent-good)" @mouseenter="h=true" @mouseleave="h=false">+ if (x == null) return</div><div v-if="h" class="dim" style="font-size:11px;color:var(--text-dim);margin-top:4px">— covers undefined too (TS-2347).</div></div>`})
// 806 Hover error → AI fix suggestion
const P806 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><div class="card" style="border-color:var(--accent-bad)" @mouseenter="h=true" @mouseleave="h=false">TypeError: x is undefined</div><div v-if="h" class="card" style="border-color:var(--accent)"><b>⚡ fix:</b> add a null check before access.</div></div>`})
// 807 Hover any term → mini demo gif
const P807 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><span class="term" @mouseenter="h=true" @mouseleave="h=false">drag-drop</span><div v-if="h" class="tip" style="left:0;top:30px;width:160px;max-width:none"><div style="aspect-ratio:16/9;background:linear-gradient(135deg,#7d6df1,#3a64f1);border-radius:6px;animation:pulse3 2s infinite"></div></div></div>`})
// 808 Hover number → calculation reveal
const P808 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp card">total <b class="term" @mouseenter="h=true" @mouseleave="h=false">$48.50</b><div v-if="h" class="dim" style="font-size:11px">= $42.50 × 1.18 (tip 18%)</div></div>`})
// 809 Hover map pin → explainer
const P809 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp" style="position:relative;height:120px;background:linear-gradient(180deg,#1f2740,#0e1320);border-radius:8px"><div style="position:absolute;left:50%;top:50%;color:var(--accent-bad);transform:translate(-50%,-50%);cursor:help" @mouseenter="h=true" @mouseleave="h=false">📍</div><div v-if="h" class="tip" style="left:50%;top:30%;transform:translateX(-50%)">Tokyo · 14:02 · 18°C</div></div>`})
// 810 Hover schedule → conflict detector
const P810 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><div class="card row" @mouseenter="h=true" @mouseleave="h=false"><span class="chip warn">⚠</span><span>3pm meeting</span></div><div v-if="h" class="tip" style="left:0;top:38px;width:200px;max-width:none">conflicts with <b>2:30 — 3:30 focus block</b></div></div>`})
// 811 Spotlight + avatar + audio
const P811 = defineComponent({ template:`<div class="cp" style="position:relative;height:140px"><div class="card pulse3" style="position:absolute;left:50%;top:30%;transform:translateX(-50%)">save</div><div class="row" style="position:absolute;left:8px;bottom:8px"><div class="av">A</div><div class="speech">"click to save 🎙"</div></div></div>`})
// 812 Welcome + walkthrough avatar
const P812 = defineComponent({ template:`<div class="cp" style="text-align:center;align-items:center"><div class="av wave" style="width:60px;height:60px;font-size:24px">👋</div><b>Welcome!</b><div class="dim">I'll show you 3 tricks in 30 seconds.</div></div>`})
// 813 AI tutor reactive to scroll
const P813 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av" style="width:24px;height:24px;font-size:11px">A</div><div class="dim" style="font-size:12px">"as you scroll, I'll explain each section"</div></div></div>`})
// 814 AI overlay highlights focus
const P814 = defineComponent({ template:`<div class="cp" style="position:relative"><div class="card" style="border:2px solid var(--accent)" class="pulse3">focused element</div><div class="dim" style="font-size:11px">AI watches what you focus</div></div>`})
// 815 Live AI subtitles on video
const P815 = defineComponent({ template:`<div class="cp card" style="aspect-ratio:16/9;background:#000;color:#fff;display:flex;flex-direction:column;justify-content:flex-end;padding:8px"><div style="background:rgba(0,0,0,0.7);padding:4px 8px;border-radius:4px;align-self:center;font-size:11px">"…and that's how attention works."</div></div>`})
// 816 Live AI commentary on actions
const P816 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av" style="width:22px;height:22px;font-size:10px">A</div><div class="dim" style="font-size:12px">"good — you just connected your repo."</div></div></div>`})
// 817 AI chat in artifact
const P817 = defineComponent({ template:`<div class="cp card"><div class="dim mono">— artifact —</div><div class="row"><div class="av" style="width:22px;height:22px;font-size:10px">A</div><div class="dim" style="font-size:12px">"ask me about this artifact ↓"</div></div><input style="margin-top:4px"/></div>`})
// 818 AI chat in calendar
const P818 = defineComponent({ template:`<div class="cp" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">📅 calendar</div><div class="card"><div class="row"><div class="av" style="width:22px;height:22px;font-size:10px">A</div><div class="dim mono" style="font-size:11px">ai assistant</div></div><input style="width:100%;margin-top:4px"/></div></div>`})
// 819 AI chat docked next to email
const P819 = defineComponent({ template:`<div class="cp" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">📧 email</div><div class="card"><b>quick reply</b><button class="mini" style="margin-top:4px">"thanks, will do!"</button><button class="mini">"need more time"</button></div></div>`})
// 820 Sticky AI suggestions while drafting
const P820 = defineComponent({ template:`<div class="cp"><textarea style="width:100%;height:60px">Hi team, quick update —</textarea><div class="card" style="border-color:var(--accent)"><div class="dim mono" style="font-size:11px">while you write, AI suggests:</div>"…the deploy is on track for Friday."</div></div>`})
// 821 Avatar emotional reaction
const P821 = defineComponent({ template:`<div class="cp row"><div class="av">😟</div><div class="speech">"I noticed you've retried 3×. anything I can help with?"</div></div>`})
// 822 Avatar applauds
const P822 = defineComponent({ template:`<div class="cp row"><div class="av wave">👏</div><div class="speech">"100 patterns done — bravo!"</div></div>`})
// 823 Animated diagram with avatar narrator
const P823 = defineComponent({ template:`<div class="cp"><svg width="220" height="60" viewBox="0 0 220 60"><circle cx="40" cy="30" r="14" fill="var(--accent)" class="pulse3"/><line x1="54" y1="30" x2="160" y2="30" stroke="var(--line-2)" stroke-dasharray="3 3"/><circle cx="180" cy="30" r="14" fill="var(--bg-3)" stroke="var(--line-2)"/></svg><div class="row"><div class="av" style="width:22px;height:22px;font-size:10px">A</div><div class="dim" style="font-size:12px">"data flows from left to right"</div></div></div>`})
// 824 AI slide presenter
const P824 = defineComponent({ template:`<div class="cp"><div class="card" style="aspect-ratio:16/9;background:linear-gradient(135deg,#7d6df1,#3a64f1)"></div><div class="row"><div class="av" style="width:22px;height:22px;font-size:10px">A</div><div class="dim" style="font-size:12px">"slide 3 / 12 — let's talk about deployment."</div></div></div>`})
// 825 Hover rich link preview
const P825 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><a href="#" @mouseenter="h=true" @mouseleave="h=false" style="color:var(--accent)">https://vuejs.org</a><div v-if="h" class="card" style="margin-top:4px"><div class="row"><div style="width:24px;height:24px;background:var(--accent-good);border-radius:6px"></div><b>Vue.js</b></div><div class="dim" style="font-size:11px">The Progressive JavaScript Framework</div></div></div>`})
// 826 Hover deep-link expand
const P826 = defineComponent({ setup(){ const h=ref(false); return {h} }, template:`<div class="cp"><a href="#" @mouseenter="h=true" @mouseleave="h=false" style="color:var(--accent)">PR #128</a><div v-if="h" class="card"><b>auth: rate-limit</b><div class="dim" style="font-size:11px">+42 −18 · 3 reviewers · CI ✓</div></div></div>`})
// 827 Multi-tooltip cascade
const P827 = defineComponent({ template:`<div class="cp"><div class="card">step 1</div><div class="tip" style="left:30px;top:50px">tooltip A</div><div class="tip" style="left:70px;top:80px;background:var(--accent);color:#0b0c14">tooltip B → C</div></div>`})
// 828 Tooltip → expand to side panel
const P828 = defineComponent({ setup(){ const e=ref(false); return {e} }, template:`<div class="cp" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">hover term <span class="term" @mouseenter="e=true">term</span></div><div v-if="e" class="card"><b>full term</b><div class="dim" style="font-size:12px">long explanation that lives in the side panel.</div></div></div>`})
// 829 Tooltip → drag-out to canvas
const P829 = defineComponent({ template:`<div class="cp"><div class="tip" style="position:relative">drag me out → keep open</div></div>`})
// 830 Tooltip with interactive widget
const P830 = defineComponent({ template:`<div class="cp"><div class="tip" style="position:relative;background:#000;padding:8px"><b>color picker</b><div class="row"><span style="width:14px;height:14px;background:#7d6df1;border-radius:3px"></span><span style="width:14px;height:14px;background:#6df1c4;border-radius:3px"></span><span style="width:14px;height:14px;background:#f5c161;border-radius:3px"></span></div></div></div>`})
// 831 Tooltip with embedded video
const P831 = defineComponent({ template:`<div class="cp"><div class="tip" style="position:relative;width:200px;max-width:none;background:#000;padding:8px"><div style="aspect-ratio:16/9;background:#000;display:grid;place-items:center;color:#fff">▶ 0:08 demo</div></div></div>`})
// 832 Tooltip with embedded chart
const P832 = defineComponent({ template:`<div class="cp"><div class="tip" style="position:relative;width:200px;max-width:none"><svg viewBox="0 0 100 30" width="100%" height="30"><polyline points="0,20 30,5 60,15 90,2" fill="none" stroke="var(--accent)" stroke-width="2"/></svg></div></div>`})
// 833 Tooltip with embedded terminal
const P833 = defineComponent({ template:`<div class="cp"><div class="tip" style="position:relative;width:200px;max-width:none;background:#000"><div class="mono" style="color:#a4f06d;font-size:11px">$ npm install<br>added 124 pkgs</div></div></div>`})
// 834 Tooltip with runnable code snippet
const P834 = defineComponent({ template:`<div class="cp"><div class="tip" style="position:relative;width:200px;max-width:none;background:#000"><div class="mono" style="color:#fff;font-size:11px">add(2,3) → 5</div><button class="mini" style="margin-top:4px">▷ run</button></div></div>`})
// 835 Conversational form (Typeform + AI)
const P835 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">A</div><div class="speech">what's your name?</div></div><input style="margin-left:50px;width:60%" placeholder="type and press ⏎"/></div>`})
// 836 Step-by-step recipe with avatar
const P836 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">A</div><div class="speech"><b>step 2/5</b> — preheat oven to 180°C</div></div><div class="row"><button class="mini">‹</button><button class="mini" style="margin-left:auto">next →</button></div></div>`})
// 837 Avatar quiz host
const P837 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">A</div><div class="speech">Q: capital of France?</div></div><div class="row" style="margin-left:50px"><button class="mini">London</button><button class="mini">Paris</button><button class="mini">Rome</button></div></div>`})
// 838 Avatar storyteller
const P838 = defineComponent({ template:`<div class="cp row"><div class="av">A</div><div class="speech">"once upon a time, in a server room far far away…"</div></div>`})
// 839 AI dancing when idle
const P839 = defineComponent({ template:`<div class="cp" style="align-items:center;justify-content:center"><div style="font-size:48px;animation: wave 1s ease-in-out infinite">🕺</div><div class="dim mono" style="font-size:11px">idle dance · waiting for you</div></div>`})
// 840 Pop-up coach when stuck
const P840 = defineComponent({ template:`<div class="cp"><div class="card" style="border-color:var(--accent)"><div class="row"><div class="av" style="width:24px;height:24px;font-size:11px">A</div><div>"stuck? try clicking <b>Generate</b>."</div></div></div></div>`})
// 841 a11y coach
const P841 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">♿</div><div class="speech">"add alt-text to this image to be screen-reader friendly."</div></div></div>`})
// 842 Performance coach
const P842 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">⚡</div><div class="speech">"this loop runs n² — consider a Set lookup (O(1))."</div></div></div>`})
// 843 Avatar mood ties to your day
const P843 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av wave">😊</div><div class="speech">"you finished early — proud of you."</div></div></div>`})
// 844 AI weather agent narrating
const P844 = defineComponent({ template:`<div class="cp"><div class="row"><div class="av">⛅</div><div class="speech">"18°C and clear — perfect for that focus walk."</div></div></div>`})
// 845 Voice command + visual cue
const P845 = defineComponent({ template:`<div class="cp"><div class="card pulse3" style="border-color:var(--accent)">listening for <b>"open notes"</b></div></div>`})
// 846 Joint chart + caption + voice + gesture
const P846 = defineComponent({ template:`<div class="cp"><div class="card"><svg viewBox="0 0 100 30" width="100%" height="30"><polyline points="0,20 30,12 60,22 90,5" fill="none" stroke="var(--accent)" stroke-width="2"/></svg></div><div class="row"><div class="av">A</div><div class="speech">"and there's the spike — week 4 ↑"</div></div></div>`})
// 847 Multimodal demo loop
const P847 = defineComponent({ template:`<div class="cp"><div class="card row"><div style="width:36px;height:36px;background:linear-gradient(135deg,#7d6df1,#6df1c4);border-radius:8px"></div><div style="flex:1"><b>image</b><div class="dim" style="font-size:11px">"a sunny garden"</div></div><div class="av" style="width:24px;height:24px;font-size:11px">A</div></div></div>`})
// 848 Composite onboarding: video + chat + checklist + avatar
const P848 = defineComponent({ template:`<div class="cp" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;flex:1"><div class="card" style="aspect-ratio:16/9;background:#000;display:grid;place-items:center;color:#fff">▶</div><div class="card"><div class="row"><div class="av" style="width:22px;height:22px;font-size:10px">A</div><div class="dim" style="font-size:11px">guide chat</div></div><div class="dim mono" style="font-size:11px">✓ connect ✓ choose model ○ first chat</div></div></div>`})
// 849 Composite analytics: dashboard + AI commentary + Q&A
const P849 = defineComponent({ template:`<div class="cp" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card"><svg width="100%" height="40" viewBox="0 0 100 40"><polyline points="0,30 25,15 50,25 75,5 100,12" fill="none" stroke="var(--accent)" stroke-width="2"/></svg></div><div class="card"><div class="row"><div class="av" style="width:22px;height:22px;font-size:10px">A</div><div class="dim" style="font-size:11px">commentary + ask</div></div><div style="font-size:12px">"week 4 spike — promo? click to ask."</div></div></div>`})
// 850 Composite editor: doc + AI margin + suggestion + voice
const P850 = defineComponent({ template:`<div class="cp" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div class="card">doc body<br><span style="background:rgba(245,193,97,0.2)">tightened?</span></div><div class="card"><div class="row"><div class="av" style="width:22px;height:22px;font-size:10px">A</div><div class="dim" style="font-size:11px">margin AI</div></div><div style="font-size:12px;font-style:italic">"shorten para 3 by 30%?"</div><div class="row"><button class="mini">accept</button><button class="mini">🎙</button></div></div></div>`})

const meta = [
  C(751,'Avatar tour guide',          'Avatar character with a speech bubble pointing to a target.',P751,{tags:['composite','avatar','tour']}),
  C(752,'Hover term → balloon',       'Hover a underlined term to reveal a black tooltip.',P752,{tags:['composite','tooltip']}),
  C(753,'Hover term → AI explainer',  'Hover surfaces a mini AI explanation card.',P753,{tags:['composite','tooltip','ai']}),
  C(754,'Click term → side panel',    'Click a term, full explainer opens at the side.',P754),
  C(755,'Selection → quick AI menu',  'Highlight text → floating AI action toolbar.',P755),
  C(756,'Spotlight + arrow + speech', 'Three-way coachmark composite.',P756),
  C(757,'Coach avatar w/ next',       'Step counter + speech + next button.',P757),
  C(758,'Voice + lipsync avatar',     'Avatar talks with a moving mouth.',P758),
  C(759,'Ghost cursor demo',          'Animated cursor walks the user through.',P759),
  C(760,'Chart + AI commentary',      'Sparkline plus an avatar one-liner reading it.',P760),
  C(761,'Hover button → tooltip+demo','Hover a CTA to see what it does.',P761),
  C(762,'Inline ghost help',          'Field placeholder with a real example.',P762),
  C(763,'Hover icon → mini video',    'Hover a gear icon for a 8-sec demo clip.',P763),
  C(764,'Hover image → AI alt-text',  'Hover an image to read AI-generated alt.',P764),
  C(765,'Hover code → AI overlay',    'Hover a snippet for a plain-language explanation.',P765),
  C(766,'Hover sentence → source',    'Hover a claim → preview of its citation.',P766),
  C(767,'Hover term → wiki card',     'Hover a domain term → Wikipedia-style card.',P767),
  C(768,'Hover graph → numbers',      'Hover a chart → underlying numbers panel.',P768),
  C(769,'Hover row → quick actions',  'Hover a list row → contextual buttons appear.',P769),
  C(770,'Hover Gantt → deps',         'Hover a Gantt bar → dependency tooltip.',P770),
  C(771,'Avatar appears on error',    'Friendly avatar pops up next to the first error.',P771),
  C(772,'Avatar celebrates',          'Avatar applauds when you hit a milestone.',P772),
  C(773,'Avatar reads chart',         'Avatar verbalises chart insights.',P773),
  C(774,'Avatar walks dashboard',     'Avatar guides you across the dashboard.',P774),
  C(775,'Avatar gestures to FAB',     'Avatar speaks while pointing at the FAB.',P775),
  C(776,'Multi-avatar conversation',  'Two or more agents talk in alternating bubbles.',P776),
  C(777,'AR overlay with arrow',      'AR-style dashed arrow pointing into a scene.',P777),
  C(778,'Spotlight + dimmed bg',      'Dim everything; only the target is bright.',P778),
  C(779,'Empty + illustration + CTA', 'Triple-combo empty state.',P779),
  C(780,'Empty + agent suggests',     'Empty state + AI suggesting starter prompts.',P780),
  C(781,'Onboarding avatar in corner','Persistent helper avatar parked in a corner.',P781),
  C(782,'Persistent helper bar',      'Inline help bar with avatar + ask button.',P782),
  C(783,'Side AI panel updates with focus','AI panel auto-changes content with focus.',P783),
  C(784,'Inline context-sensitive help','? next to a label that explains the field.',P784),
  C(785,'Long article + summarize',   'Long article with a one-tap "summarize" CTA.',P785),
  C(786,'Inline rewrite-with-AI',     'Rewrite a sentence in place via AI.',P786),
  C(787,'Calendar + AI explainer',    'Calendar event annotated by AI.',P787),
  C(788,'Form + AI suggestion',       'AI suggests how to finish a form field.',P788),
  C(789,'AI form-fill from one input','Paste one line; AI fills the rest of the form.',P789),
  C(790,'Inline translate button',    'Per-message translate-with-AI button.',P790),
  C(791,'AI summary above article',   'TL;DR AI summary docked above the article.',P791),
  C(792,'AI argument map',            'Side-by-side text and argument-map view.',P792),
  C(793,'AI fact-check chip',         '✗ chip indicating a claim failed AI check.',P793),
  C(794,'Sentiment overlay',          'Highlights a phrase by detected sentiment.',P794),
  C(795,'Inline definition reveal',   'Underlined term with an inline AI definition.',P795),
  C(796,'Chat + canvas + explainer',  'Three-pane composite: chat, artifact, AI hint.',P796),
  C(797,'Ghost cursor + voice narr',  'Animated cursor synced to voice narration.',P797),
  C(798,'Hover chart + AI narration', 'Hover the chart → AI explains in 1 line.',P798),
  C(799,'Spotlight + avatar + voice', 'Composite onboarding moment.',P799),
  C(800,'Form field + avatar coach',  'Avatar advises near a focused field.',P800),
  C(801,'Margin AI annotations',      'Sticky-note style AI notes in the margin.',P801),
  C(802,'Search + AI autocomplete',   'AI completes the query and shows a preview.',P802),
  C(803,'3D-flip card to AI explain', 'Card flips to reveal an AI explainer.',P803),
  C(804,'Avatar + sticky-note hints', 'Casual sticky-note style coachmarks.',P804),
  C(805,'Hover diff line → rationale','Hover a diff line for the AI rationale.',P805),
  C(806,'Hover error → AI fix',       'Hover an error → AI fix suggestion appears.',P806),
  C(807,'Hover term → demo gif',      'Hover a feature term for a tiny animated demo.',P807),
  C(808,'Hover number → calculation', 'Hover a derived number to see how it was calculated.',P808),
  C(809,'Hover map pin → AI panel',   'Hover a map pin → AI surfaces context.',P809),
  C(810,'Hover schedule → conflict',  'Hover an event → AI flags conflicts.',P810),
  C(811,'Spotlight + avatar + audio', 'Spotlight, avatar, and audio narration combined.',P811),
  C(812,'Welcome + walkthrough avatar','Big welcome card hosted by an avatar.',P812),
  C(813,'AI tutor reactive to scroll','AI explains as you scroll through a doc.',P813),
  C(814,'AI overlay highlights focus','Whatever you focus, AI puts a halo on it.',P814),
  C(815,'Live AI subtitles',          'Auto-generated subtitles over a video.',P815),
  C(816,'Live AI commentary',         'AI narrates as you take actions.',P816),
  C(817,'AI chat in artifact',        'Chat with the AI from inside the artifact.',P817),
  C(818,'AI chat in calendar',        'Calendar with a docked AI assistant.',P818),
  C(819,'AI chat docked next to email','Email with an AI quick-reply panel.',P819),
  C(820,'Sticky AI suggestions',      'AI suggests next sentence as you draft.',P820),
  C(821,'Avatar emotional reaction',  'Avatar reacts to your frustration empathetically.',P821),
  C(822,'Avatar applauds milestone',  'Avatar claps when you finish.',P822),
  C(823,'Animated diagram + narrator','Animated graph with avatar narrating.',P823),
  C(824,'AI slide presenter',         'Avatar presents slides one by one.',P824),
  C(825,'Hover rich link preview',    'Hover a URL → favicon + title + description.',P825),
  C(826,'Hover deep-link expand',     'Hover a PR link to see meta inline.',P826),
  C(827,'Multi-tooltip cascade',      'Several tooltips chain in sequence.',P827),
  C(828,'Tooltip → side panel',       'Tooltip can expand into a full side panel.',P828),
  C(829,'Tooltip → drag to canvas',   'Drag a tooltip out to keep it open.',P829),
  C(830,'Tooltip with widget',        'Color picker tooltip with interactive swatches.',P830),
  C(831,'Tooltip with video',         'Tooltip embeds a tiny video clip.',P831),
  C(832,'Tooltip with chart',         'Tooltip with a sparkline chart.',P832),
  C(833,'Tooltip with terminal',      'Tooltip embedding a fake terminal demo.',P833),
  C(834,'Tooltip with runnable code', 'Tooltip with a code snippet you can run.',P834),
  C(835,'Conversational form',        'Typeform-style form hosted by an AI avatar.',P835),
  C(836,'Recipe steps with avatar',   'Step-by-step instructions narrated by an avatar.',P836),
  C(837,'Avatar quiz host',           'Avatar asks quiz questions; you tap answers.',P837),
  C(838,'Avatar storyteller',         'Avatar tells a story to set context.',P838),
  C(839,'AI dances when idle',        'Idle animation — agent visibly waiting.',P839),
  C(840,'Coach pop-up when stuck',    'Avatar gently pops up if you stall.',P840),
  C(841,'a11y coach avatar',          'Avatar gives accessibility advice.',P841),
  C(842,'Performance coach avatar',   'Avatar warns about an O(n²) pattern.',P842),
  C(843,'Avatar mood matches you',    'Avatar mood mirrors your day.',P843),
  C(844,'Weather agent narrator',     'Weather agent narrates the daily context.',P844),
  C(845,'Voice command + visual cue', 'Visual feedback for voice listening.',P845),
  C(846,'Chart + caption + voice + gesture','Quad-modal composite explanation.',P846),
  C(847,'Multimodal demo loop',       'Image + caption + voice + AI agent in one card.',P847),
  C(848,'Composite onboarding',       'Video + checklist + AI guide chat together.',P848),
  C(849,'Composite analytics',        'Dashboard + AI commentary + Q&A box.',P849),
  C(850,'Composite editor',           'Doc + margin AI + suggestion + voice in one editor.',P850),
]

export default meta.map(m => ({ ...m, category:'Composites & Guides'  }))
