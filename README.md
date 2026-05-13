# ✨ AiUi — AI Agent UX Gallery

> **A living catalogue of UX patterns for AI-native products.**
> 1,010 interactive pattern previews across 19 categories — built to answer one question every AI team eventually asks:
> *"How should this actually look and behave?"*

*[🇰🇷 한국어로 보기 →](./README.ko.md)*

![Gallery overview](./demo01.png)

---

## Why this exists

Building agentic apps means re-inventing UI conventions every week. There is no Bootstrap, no Material spec, no "Human Interface Guidelines" for *streaming tokens, tool-call traces, reasoning surfaces, multi-agent hand-offs, memory panels, trust controls, voice + multimodal input.* Every team is rediscovering the same primitives — and shipping inconsistent versions of them.

**AiUi** is a *testbed* for that gap. Instead of arguing about a single design in a Figma file, we render hundreds of live variations side by side, each one a self-contained Vue component you can open, inspect, and copy.

The goals:

- **Reference, not framework.** No npm package, no opinions enforced. Every pattern is a vanilla `.js` Vue render-function module — read it, fork it, throw it out.
- **Breadth over depth.** 1,010 patterns is intentional. Most won't be right for your product. The point is to *show what the design space looks like* so the right one becomes obvious.
- **Inspired by the field.** Patterns draw from ChatGPT, Cursor, v0, Perplexity, Devin, Copilot, Replit Agent, Linear, Arc, Raycast, NotebookLM, and more — the products actually defining this category in real time.
- **Fast to scan.** Grid view for visual browsing, list view for power-users, search by name / description / category / pattern ID. Open any tile for the full live surface plus inspiration notes and tags.

If you are designing or reviewing AI product UI, this is meant to be the wall you stand in front of before you commit to a direction.

---

## What's inside

**1,010 patterns** organised into **19 categories**:

| # | Category | Focus |
|---|---|---|
| 01 | **Conversation** | Bubbles, threads, citations, message-level affordances |
| 02 | **Status** | Spinners, progress, queue visibility, agent state |
| 03 | **Tools** | Tool-call traces, function previews, inspectors |
| 04 | **Multi-Agent** | Coordination, hand-offs, role panels, debates |
| 05 | **Streaming** | Token rendering, partial UI, optimistic states |
| 06 | **Voice & Multimodal** | Mic affordances, vision input, file drop |
| 07 | **Reasoning** | Chain-of-thought surfaces, plans, scratchpads |
| 08 | **Memory** | Long-term memory panels, recall, forget controls |
| 09 | **Trust & Control** | Permissions, confirmations, undo, audit |
| 10 | **Output** | Markdown, tables, charts, code, artifacts |
| 11 | **Coding** | Diffs, file trees, terminal, lint surfaces |
| 12 | **Onboarding** | First-run, empty states, demos |
| 13 | **Reliability** | Errors, retries, fallbacks, offline |
| 14 | **Mobile** | Touch-first, gesture, compact density |
| 15 | **Collab & Safety** | Multi-user, content review, guardrails |
| 16 | **Composites & Guides** | Combined surfaces, walkthroughs |
| 17 | **Visual Wow** | Motion, depth, generative aesthetics |
| 18 | **Ai Ui** | Imagined / next-dimension agent UX |
| 19 | **Flow** | Node-based AI flow editor (ReactFlow-style) |

Every pattern has: a category, a short description, a long description, a list of inspirations, tags, and a fully interactive component preview.

---

## Components

The codebase splits cleanly into **four layers**: the shell (layout + navigation), the inspector (modal + tile), the pattern engine (registry + helpers + 31 module files), and the support layer (i18n + styles). Below is what each piece does and why it's shaped the way it is.

### Shell layer

#### `src/App.vue` — layout & navigation

The single top-level component. Owns the entire page chrome: a 280-px sidebar (brand, search, category nav, footer credit), a scrollable main pane (header + grid/list view), and a fixed top-right language switcher. Holds the four pieces of UI state that every screen depends on: `search`, `activeCategory`, `view` (`'grid' | 'list'`), and `openId` (the currently inspected pattern). The `filtered` computed runs the search across name / description / category / numeric ID; `counts` precomputes per-category totals so the sidebar never iterates the full 1,010 list during render. Keyboard navigation (← / → / Esc) is wired here at the window level so it works regardless of which pattern is open.

#### `src/components/PatternCard.vue` — grid tile

A self-contained button that renders one pattern's preview inside a 200-px-tall frame. Each tile mounts the pattern's actual component with `:preview="true"` — patterns are expected to render a compact variant when that prop is set. `pointer-events: none` on the preview container ensures the whole tile remains clickable (no nested-click conflicts with the embedded interactive components). Hover lifts the card 2 px and brightens the border; the category chip and `#NNN` ID stay anchored to the top edge.

#### `src/components/PatternModal.vue` — full-surface inspector

The detail view. Opens from any tile click. Two-column layout (`1fr 280px`) — the live surface on the left (full interactive component, no preview throttling), the meta sidebar on the right (`About`, `Inspiration`, `Tags`). Header carries prev / next / close buttons; close also fires on backdrop click and Esc. On screens narrower than 800 px it collapses to a single column so the meta sidebar drops below the live surface.

### Pattern engine

#### `src/patterns/registry.js` — the aggregator

The single source of truth for `patterns` and `categories`. Imports every pattern module statically (intentional — Vite tree-shakes the unused parts and a single import graph keeps HMR fast), then flattens them into one ordered array. Logs the load count to the console at boot (`[AiUx] patterns loaded: 1010 across 19 categories`) which doubles as a sanity check that no module silently failed to import.

#### `src/patterns/helpers.js` — shared render utilities

A 48-line file that does outsized work. Re-exports the Vue composition primitives so pattern modules can `import { ref, computed, ... } from './helpers'` instead of pulling from `'vue'` 50 times. Provides `injectCss(key, css)` — a deduped runtime CSS injector that lets each pattern ship its own scoped styles without needing 1,010 `<style>` blocks. Plus a handful of tiny composables (`useTypewriter`, `useInterval`, …) for the streaming / animation effects most patterns rely on.

#### `src/patterns/0N-*.js` — base pattern modules (10 each)

Files numbered `01` through `10` define the original 10 patterns per category — the canonical, most-considered variants. Each file exports an array of pattern objects: `{ id, name, category, shortDesc, longDesc, inspiration, tags, component }`. The `component` is usually a `defineComponent` with a `setup()` returning a render function — render functions scale to hundreds of patterns better than `.vue` SFCs because there's no separate template/style compilation per file.

#### `src/patterns/0Nb-*-extra.js` — extension modules (40 each)

The `b` suffix files extend the same 10 categories with 40 more variations each, bringing the original 10 categories to 50 patterns each. Kept in separate files so the base set stays reviewable on its own and the extras can be experimented with without disturbing the canonical examples.

#### `src/patterns/11-19-*.js` — newer category modules

Categories 11–19 (`Coding`, `Onboarding`, `Reliability`, `Mobile`, `Collab & Safety`, `Composites & Guides`, `Visual Wow`, `Ai Ui`, `Flow`) added incrementally as the gallery's scope grew. `16-composites.js` is the largest single file at 327 lines — it stitches existing primitives together into multi-pane "what does a real product surface look like" mocks. `18-ai-imagined.js` is the speculative tier — patterns that don't exist in shipping products yet but feel like where this is heading.

### Support layer

#### `src/i18n/index.js` — lightweight i18n composable

About 50 lines, no dependencies. Exports `useI18n()` returning a reactive `locale` ref, a `t(key, params)` function with dot-path resolution and `{placeholder}` interpolation, a `setLocale(code)` mutator that persists to `localStorage` and updates `<html lang>`, and an `availableLocales` array consumed by the top-right switcher. Falls back to the default locale when a key is missing from the active one.

#### `src/i18n/locales/{en,ko}.js`

Flat JS objects organised by surface (`brand`, `search`, `nav`, `footer`, `header`, `empty`, `modal`, `category`). Categories are keyed by their canonical English name so the filter logic in `App.vue` can keep comparing raw strings while the display renders the translated value.

#### `src/styles/global.css` — design tokens

Hand-rolled, no Tailwind or other framework. Defines the dark theme via CSS variables (`--bg`, `--bg-1..3`, `--line`, `--line-2`, `--text`, `--text-dim`, `--text-mute`, accent palette, gradient, shadow, radii, monospace stack). Base resets for `html`/`body`/`button`/`input` plus a few utility classes (`.row`, `.chip`, `.dim`, `.mono`, `.mute`, `.surface`) that pattern modules can use without re-declaring shared styles.

### Entry & build

#### `src/main.js`

Three lines. Creates the Vue app, mounts it on `#app`, imports the global stylesheet. No router (single-page gallery), no Pinia (`ref`/`computed` are enough), no plugin registrations.

#### `index.html`

Standard Vite entry. Inlines an SVG favicon (✨ emoji) so there's no extra asset request.

#### `vite.config.js`

Configures `base: '/aiux/'` plus a small middleware that re-attaches the `/aiux/` prefix to incoming requests. This lets a single Vite instance serve correctly both when accessed directly (`localhost:27777`) and when reverse-proxied behind nginx at `/aiux/` — without Vite's built-in redirect changing the address bar on direct access.

---

## Stack

- **Vue 3** (`<script setup>`, Composition API) — single-file components for the shell, render functions for the 1,010 pattern modules (faster authoring at scale)
- **Vite 6** — dev + build
- **Custom lightweight i18n** — no `vue-i18n` dependency; ~50-line composable with reactive locale ref + localStorage persistence
- **Zero CSS framework** — hand-rolled tokens in `src/styles/global.css`
- **No state library** — `ref` / `computed` only

The dev server runs on **port 27777** and can be reverse-proxied at `/aiux/`.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:27777
npm run build    # production build → dist/
npm run preview  # preview the built bundle
```

On Windows, `run.bat` is a one-line shortcut for `npm run dev`.

---

## Project layout

```
src/
├── App.vue                       # Layout shell, sidebar, header, lang switcher
├── main.js                       # createApp + mount
├── components/
│   ├── PatternCard.vue           # Grid tile (preview + meta)
│   └── PatternModal.vue          # Full-surface inspector
├── i18n/
│   ├── index.js                  # useI18n composable
│   └── locales/
│       ├── en.js
│       └── ko.js
├── patterns/
│   ├── registry.js               # Aggregates all categories
│   ├── helpers.js                # Shared render helpers
│   ├── 01-conversation.js        # 10 base patterns
│   ├── 01b-conversation-extra.js # +40 extras
│   ├── …                         # 31 pattern modules
│   └── 19-flow.js
└── styles/
    └── global.css                # Tokens + base styles
```

---

## Status & roadmap

This is a **testbed**, not a product. Expect:

- Some patterns are sketches, not production-ready components
- Visual polish is uneven on purpose — exploring the space matters more than finishing each tile
- Categories will keep growing as the agent-UX field evolves

Open to contributions, especially:

- New pattern modules (follow the shape in any `0N-*.js`)
- More locales (Japanese, Chinese, German, …)
- A "fork to CodeSandbox" button on each tile
- Tag-based filtering in addition to category filtering

---

## License

Personal exploration / reference project. Use any pattern as starting code in your own work — attribution welcome but not required.

---

*Built with Vue 3 + Vite. Inspired by ChatGPT, Cursor, v0, Perplexity, Devin, Copilot, Replit Agent, Linear, Arc, Raycast, NotebookLM…*
