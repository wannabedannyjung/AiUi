import { defineComponent } from 'vue'
import { ref, computed, reactive, useInterval, injectCss } from './helpers.js'

injectCss('mobile', `
.mb { font-size:13px; display:flex; flex-direction:column; gap:8px; height:100%; align-items:center; justify-content:center; }
.mb .phone { width:160px; height:240px; border-radius:24px; background:#0e1320; border:6px solid #2a3148; padding:10px; display:flex; flex-direction:column; gap:6px; position:relative; overflow:hidden; }
.mb .pill { display:inline-flex; align-items:center; gap:6px; padding:3px 10px; border-radius:999px; background:var(--bg-3); border:1px solid var(--line); font-size:11px; }
.mb .fab  { width:48px; height:48px; border-radius:50%; background:var(--accent); color:#0b0c14; display:grid; place-items:center; font-size:22px; box-shadow: 0 6px 16px rgba(139,140,247,0.4); }
.mb .sheet{ position:absolute; left:0; right:0; bottom:0; background:var(--bg-2); border-top:1px solid var(--line); padding:10px; border-radius: 16px 16px 0 0; }
`)
const C = (id, name, desc, comp, extra={}) => ({ id, name, shortDesc: desc, inspiration: extra.inspiration||'iOS / Android / Wear', tags: extra.tags||['mobile'], component: comp })

const P651 = defineComponent({ template:`<div class="mb"><div class="phone"><div style="flex:1"></div><div class="sheet">🤖 ask the AI…<input style="width:100%;margin-top:6px"/></div></div></div>`})
const P652 = defineComponent({ template:`<div class="mb"><div class="phone"><div style="background:var(--bg-3);padding:6px;border-radius:8px;font-size:11px;transform:translateX(-12px);opacity:0.7">swipe ← to dismiss</div></div></div>`})
const P653 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div style="background:var(--bg-3);padding:6px;border-radius:8px;font-size:11px">long-press a message</div><div style="position:absolute;left:30%;top:36%;background:#000;padding:6px 10px;border-radius:8px;font-size:11px"><div>Reply</div><div>Pin</div><div>Forward</div></div></div></div>`})
const P654 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div class="fab" style="position:absolute;right:14px;bottom:14px">🎤</div></div></div>`})
const P655 = defineComponent({ template:`<div class="mb"><div class="phone"><div style="text-align:center;margin-top:30px;font-size:30px">🔒</div><div class="dim mono" style="text-align:center;font-size:11px">14:02</div><div class="pill" style="margin:auto">📨 quick reply</div></div></div>`})
const P656 = defineComponent({ template:`<div class="mb"><div style="width:100px;height:100px;border-radius:24px;background:#0e1320;border:6px solid #2a3148;display:grid;place-items:center;font-size:11px;text-align:center;color:#fff">⌚<br>tap mic</div></div>`})
const P657 = defineComponent({ template:`<div class="mb"><div class="phone"><div class="pill"><b>📩 New message</b></div><input placeholder="reply…" style="margin-top:auto"/></div></div>`})
const P658 = defineComponent({ template:`<div class="mb"><div class="phone" style="align-items:center;justify-content:center;display:flex"><div style="font-size:32px">🎙</div></div></div>`})
const P659 = defineComponent({ template:`<div class="mb"><div class="phone"><button class="mini" style="height:48px;font-size:14px;background:var(--accent);color:#0b0c14">Send</button></div></div>`})
const P660 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div style="height:6px;background:var(--accent);width:50%;border-radius:6px;margin:auto"></div><div class="dim" style="font-size:11px">↻ pull to refresh</div></div></div>`})
const P661 = defineComponent({ template:`<div class="mb"><div class="phone"><div style="background:linear-gradient(135deg,#7d6df1,#3a64f1);height:80px;border-radius:12px"></div><div class="dim" style="font-size:10px">swipe to dismiss</div></div></div>`})
const P662 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative;display:grid;place-items:center;background:linear-gradient(135deg,#7d6df1,#3a64f1)"><div class="dim" style="position:absolute;bottom:6px;font-size:11px;color:#fff">pinch to zoom</div></div></div>`})
const P663 = defineComponent({ template:`<div class="mb"><div class="phone" style="display:grid;place-items:center"><div class="pill">📳 haptic feedback</div></div></div>`})
const P664 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div style="position:absolute;left:10px;right:10px;bottom:10px;background:#000;color:#fff;padding:8px;border-radius:8px;font-size:11px">↩ undo · 4s</div></div></div>`})
const P665 = defineComponent({ template:`<div class="mb"><div class="pill">📲 add app shortcut to home</div></div>`})
const P666 = defineComponent({ template:`<div class="mb"><div style="width:140px;height:80px;border-radius:14px;background:linear-gradient(135deg,#7d6df1,#3a64f1);padding:8px;color:#fff"><b>AI agent</b><div style="font-size:11px;opacity:.85">3 unread · tap to open</div></div></div>`})
const P667 = defineComponent({ template:`<div class="mb"><div class="phone"><div class="pill">"OK"</div><div class="pill">"On my way"</div><div class="pill">"Tomorrow?"</div></div></div>`})
const P668 = defineComponent({ template:`<div class="mb"><div class="phone" style="background:#fff;color:#0b0c14;border:6px solid #2a3148"><div class="dim mono" style="font-size:11px">auto-light</div></div></div>`})
const P669 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div style="position:absolute;left:0;right:0;bottom:80px;background:var(--bg-3);padding:6px;display:flex;justify-content:space-around"><span>↩</span><span>📷</span><span>🔗</span><span>@</span></div></div></div>`})
const P670 = defineComponent({ template:`<div class="mb"><div class="phone"><div class="fab" style="margin:auto">🔍</div><div class="dim" style="font-size:11px">"hey, find…"</div></div></div>`})
const P671 = defineComponent({ template:`<div class="mb"><div class="phone" style="background:#000"><div style="flex:1"></div><div class="fab" style="margin:auto">📷</div></div></div>`})
const P672 = defineComponent({ template:`<div class="mb"><div class="phone"><div style="aspect-ratio:1;background:linear-gradient(135deg,#f17d3a,#7d6df1);border-radius:8px;position:relative"><svg viewBox="0 0 100 100" width="100%" height="100%" style="position:absolute;inset:0"><path d="M20 80 L 70 20" stroke="#fff" stroke-width="3"/></svg></div></div></div>`})
const P673 = defineComponent({ template:`<div class="mb"><div class="phone"><div v-for="i in 3" :key="i" class="pill" style="display:flex;justify-content:space-between;width:100%">item {{ i }}<span>≡</span></div></div></div>`})
const P674 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div class="sheet" style="height:50%"><div style="width:36px;height:4px;background:var(--line-2);border-radius:2px;margin:auto"></div></div></div></div>`})
const P675 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div style="position:absolute;left:0;right:0;bottom:0;background:var(--bg-3);padding:8px;display:flex;justify-content:space-around;font-size:18px">💬 🗂 ⚙</div></div></div>`})
const P676 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div class="fab" style="position:absolute;right:14px;bottom:14px">+</div></div></div>`})
const P677 = defineComponent({ template:`<div class="mb"><div class="phone"><div style="display:flex;gap:2px;height:4px"><div v-for="i in 5" :key="i" :style="{flex:1,background:i<=2?'var(--accent)':'var(--bg-3)',borderRadius:'2px'}"/></div><div class="dim" style="font-size:11px">step 2 / 5</div></div></div>`})
const P678 = defineComponent({ template:`<div class="mb"><div class="phone" style="background:#000;align-items:center;justify-content:center;display:flex;color:#fff"><div>🎙 fullscreen voice</div></div></div>`})
const P679 = defineComponent({ template:`<div class="mb"><div class="pill" style="background:#000;color:#fff;border-color:#000">🎯 live activity · 3m left</div></div>`})
const P680 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div style="position:absolute;right:10px;top:10px;width:60px;height:80px;background:var(--bg-3);border-radius:8px;border:1px solid var(--line)"></div></div></div>`})
const P681 = defineComponent({ template:`<div class="mb"><div class="pill">⚡ quick action · "summarize last email"</div></div>`})
const P682 = defineComponent({ template:`<div class="mb"><div style="width:100px;height:100px;border-radius:14px;background:linear-gradient(135deg,#6df1c4,#3af19a);padding:8px;color:#0b0c14"><b>glance</b><div style="font-size:11px">3 tasks left</div></div></div>`})
const P683 = defineComponent({ template:`<div class="mb"><div class="phone"><div style="position:relative;background:var(--bg-3);padding:6px;border-radius:8px"><span>swipe →</span><div style="position:absolute;right:0;top:0;bottom:0;background:var(--accent-bad);color:#0b0c14;display:grid;place-items:center;width:40%">🗑</div></div></div></div>`})
const P684 = defineComponent({ template:`<div class="mb"><div style="width:80px;height:80px;border-radius:50%;background:var(--bg-3);border:4px solid var(--accent);display:grid;place-items:center;font-size:18px;font-weight:800">7,234</div></div>`})
const P685 = defineComponent({ template:`<div class="mb"><div class="pill" style="background:rgba(245,193,97,0.1);color:var(--accent-warn);border-color:rgba(245,193,97,0.4)">🔋 battery saver — fewer agent runs</div></div>`})
const P686 = defineComponent({ template:`<div class="mb"><div class="pill">📶 low-data mode</div></div>`})
const P687 = defineComponent({ template:`<div class="mb"><div class="phone"><div class="dim" style="font-size:11px">read · 14:02</div><span style="color:var(--accent)">✓✓</span></div></div>`})
const P688 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div style="position:absolute;left:10%;top:30%;background:#000;color:#fff;padding:6px;border-radius:8px;font-size:11px">Reply · React · Pin</div></div></div>`})
const P689 = defineComponent({ template:`<div class="mb"><div class="phone" style="display:grid;place-items:center"><div class="pill">🔓 rotation lock off</div></div></div>`})
const P690 = defineComponent({ template:`<div class="mb"><div class="phone"><div class="pill">📦 cached for offline</div></div></div>`})
const P691 = defineComponent({ template:`<div class="mb"><div class="phone"><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px"><div v-for="i in 4" :key="i" style="aspect-ratio:1;background:linear-gradient(135deg,hsl('+(i*60)+',60%,40%),#0b0c14);border-radius:6px"></div></div></div></div>`})
const P692 = defineComponent({ template:`<div class="mb"><div class="phone" style="background:#000;align-items:center;justify-content:center;display:flex"><div style="font-size:36px">🎤</div></div></div>`})
const P693 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div class="fab" style="position:absolute;right:14px;bottom:14px">+</div><div style="position:absolute;right:30px;bottom:74px;display:flex;flex-direction:column;gap:6px"><span class="pill">📷</span><span class="pill">🎤</span><span class="pill">📁</span></div></div></div>`})
const P694 = defineComponent({ template:`<div class="mb"><div class="phone" style="position:relative"><div style="position:absolute;left:0;right:0;bottom:0;height:50px;background:var(--bg-3);display:flex;justify-content:space-around;align-items:center">💬<span style="color:var(--accent);box-shadow:0 -2px 0 var(--accent);padding:2px 6px">🤖</span>⚙</div></div></div>`})
const P695 = defineComponent({ template:`<div class="mb"><div class="phone" style="background:linear-gradient(135deg,#f5e89c,#f17d3a)"><div class="dim mono" style="color:#3d3a16;font-size:11px">Material You · dynamic theme</div></div></div>`})
const P696 = defineComponent({ template:`<div class="mb"><div class="fab" style="background:var(--accent-bad)">🎤</div><div class="dim" style="font-size:11px">tap-and-hold to talk</div></div>`})
const P697 = defineComponent({ template:`<div class="mb"><div class="pill">📳 short vibration on send</div></div>`})
const P698 = defineComponent({ template:`<div class="mb"><div class="pill">⏱ auto-lock in 30s</div></div>`})
const P699 = defineComponent({ template:`<div class="mb"><div style="width:130px;height:80px;border-radius:14px;background:var(--bg-3);padding:8px"><div class="dim mono" style="font-size:11px">today</div><div><b>3 done</b> · 2 pending</div></div></div>`})
const P700 = defineComponent({ template:`<div class="mb"><div style="width:100px;height:100px;border-radius:24px;background:#0e1320;border:6px solid #2a3148;padding:6px;display:flex;flex-direction:column"><div class="dim" style="font-size:10px">⌚ reply</div><button class="mini" style="margin:auto;background:var(--accent);color:#0b0c14">OK</button></div></div>`})

const meta = [
  C(651,'Bottom sheet input',     'Sheet rises from the bottom for chat input.',P651),
  C(652,'Swipe to dismiss',       'Swipe a card off-screen to dismiss.',P652),
  C(653,'Long-press menu',        'Long-press reveals contextual actions.',P653),
  C(654,'Floating mic FAB',       'Bottom-right floating mic button.',P654),
  C(655,'Lock-screen reply',      'Reply pill on the lock screen.',P655),
  C(656,'Watch face widget',      'Round watch widget with mic CTA.',P656),
  C(657,'Notification reply',     'Reply directly from a notification.',P657),
  C(658,'Voice-only mode',        'Fullscreen voice-only interaction.',P658),
  C(659,'Big touch target',       'Comfortably large send button.',P659),
  C(660,'Pull-to-refresh',        'Standard pull-down refresh.',P660),
  C(661,'Card stack swipe',       'Tinder-style stacked cards.',P661),
  C(662,'Pinch to zoom',          'Pinch on a generated image.',P662),
  C(663,'Haptic hint',            'Tactile vibration on event.',P663),
  C(664,'Bottom toast',           'Undo toast at the bottom edge.',P664),
  C(665,'App shortcut hint',      'Suggest pinning to home screen.',P665),
  C(666,'Home-screen widget',     'Standalone agent widget on the homescreen.',P666),
  C(667,'Quick replies pills',    'Inline reply suggestion pills.',P667),
  C(668,'Auto dark/light',        'Adapts to system theme.',P668),
  C(669,'Keyboard accessory bar', 'Above-keyboard utility row.',P669),
  C(670,'Speak-to-search',        'Mic-first search affordance.',P670),
  C(671,'Camera-first input',     'Camera occupies the screen as input.',P671),
  C(672,'Photo annotation touch', 'Draw on a photo with touch.',P672),
  C(673,'Drag handle reorder',    'Reorder list items via grip.',P673),
  C(674,'Bottom-sheet drag bar',  'Sheet with drag-handle.',P674),
  C(675,'Bottom tab bar',         'Standard mobile tab bar.',P675),
  C(676,'FAB add button',         'Floating + action button.',P676),
  C(677,'Story stepper',          '5-segment story-style progress.',P677),
  C(678,'Fullscreen voice',       'Edge-to-edge voice mode.',P678),
  C(679,'Live activity pill',     'iOS-style live activity strip.',P679),
  C(680,'PiP chat tile',          'Picture-in-picture chat tile.',P680),
  C(681,'Quick action shortcut',  'Per-app quick action.',P681),
  C(682,'Glance widget',          'Tiny dashboard tile for glanceability.',P682),
  C(683,'Side-swipe action',      'Swipe a row to reveal actions.',P683),
  C(684,'Step counter widget',    'Round progress dial.',P684),
  C(685,'Battery saver pill',     'Reduced-AI mode while saving battery.',P685),
  C(686,'Low-data mode',          'Indicate low-bandwidth limited features.',P686),
  C(687,'Read receipts',          '✓✓ read indicator.',P687),
  C(688,'Inline action menu',     'Floating mini menu near a long-pressed item.',P688),
  C(689,'Rotation lock UX',       'Indicator for rotation lock state.',P689),
  C(690,'Offline cache pill',     'Marks content as available offline.',P690),
  C(691,'Photo library picker',   '2×2 image picker.',P691),
  C(692,'Voice recorder fullscreen','Fullscreen recording mode.',P692),
  C(693,'Fan-out FAB menu',       'FAB expands into options.',P693),
  C(694,'Bottom nav glow',        'Active bottom-nav item glows.',P694),
  C(695,'Material You theme',     'OS-driven dynamic colour theme.',P695),
  C(696,'Tap-and-hold mic',       'Press-and-hold to record.',P696),
  C(697,'Vibration cue',          'Haptic feedback on send.',P697),
  C(698,'Auto-lock countdown',    'Visible auto-lock countdown.',P698),
  C(699,'Today summary widget',   '"Today" summary tile.',P699),
  C(700,'Watch quick reply',      'Tiny watch-style reply UI.',P700),
]

export default meta.map(m => ({ ...m, category:'Mobile' }))
