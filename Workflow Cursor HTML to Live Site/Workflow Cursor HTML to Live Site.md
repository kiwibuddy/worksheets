# Practical AI Workflows — Worksheet Template Reference

A self-contained reference for building new single-file HTML worksheets that match the **look, motion, and functionality** of `index.html` and `Workflow Cursor HTML to Live Site.html`. This document is about the *template* — fonts, tokens, components, scripts, behaviours — not the specific content of either worksheet. Treat it as the spec for "another worksheet that feels like these two".

---

## 1. What this template is

A **single-file** HTML worksheet (no build step, no dependencies, no bundler). Everything ships in one `.html` file: markup, CSS in a `<style>` block, JS in a `<script>` block. That means:

- It opens correctly by double-clicking locally, emailing, hosting on Vercel/GitHub Pages, or serving from any static host.
- Clients can save, print, or share it without tooling.
- Progress for each worksheet is remembered in the viewer's browser via `localStorage` (keyed per worksheet).

The template combines:

- An editorial **Aetherfield / Figma**-style aesthetic (Fraunces + Inter, sky-blue accent, lime highlight, cream/mist surfaces).
- A **two-mode reading experience**: *Guided* (focus on one chapter at a time, accordion steps, auto-advance) or *Read full page* (linear long-form document).
- **Trackable steps** with animated custom checkboxes, `localStorage` persistence, and a final "Your progress" summary chapter.
- **Subtle motion**: scroll-reveal, check-pop + ripple, chapter enter, step flash, collapsing top header.
- **Full-bleed responsive layout** that scales from phones up to ultra-wide displays while keeping prose readable.
- **Print support** that always prints the full document regardless of active mode.

---

## 2. File anatomy at a glance

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset> + <meta viewport>
  <title>…</title>
  <style> … (~1,200 lines of design system) … </style>
</head>
<body class="guided">
  <div class="page">
    <div class="site-hdr"> … logo + workflow badge … </div>

    <div class="guide-chapter is-active" id="ch-welcome" data-g-label="Welcome">
      <div class="hero"> … </div>
    </div>

    <div class="body">
      <div class="guide-chapter" id="ch-context"       data-g-label="Get oriented"> … </div>
      <hr class="div">
      <div class="guide-chapter" id="ch-p1"            data-g-label="Phase 1"> … </div>
      <hr class="div">
      … more phase chapters …
      <hr class="div">
      <div class="guide-chapter" id="ch-wrapup"        data-g-label="Wrap-up & reference"> … </div>
      <div class="guide-chapter" id="ch-celebrate"     data-g-label="Your progress">
        <section class="journey-summary"> … </section>
      </div>
    </div>

    <div class="foot"> … linked brand + version … </div>
  </div>

  <nav class="guide-dock" id="guideDock"> … mode toggle + chapter dots + back/next … </nav>

  <script> … (~300 lines of guided-mode + checklist logic) … </script>
</body>
</html>
```

**Rules:**

1. `#ch-welcome` lives *outside* `.body` so the hero acts as its own scrollport when it's the active chapter in guided mode.
2. Every other chapter lives *inside* `.body`, separated by top-level `<hr class="div">` dividers.
3. `#ch-celebrate` is always the last chapter; it auto-fills with the step checklist.
4. Exactly one `<body class="guided">` element wraps everything. The `.guided` class drives the guided-vs-full layout.

---

## 3. Design tokens (CSS variables)

All colors, fonts, radii, and layout measurements are centralised in `:root`. Change these once and the whole worksheet shifts.

```css
:root{
  /* Surfaces */
  --bg:             #ffffff;
  --bg-warm:        hsl(42, 40%, 98%);     /* cream */
  --bg-mist:        hsl(210, 24%, 96%);    /* cool mist */
  --bg-muted:       hsl(210, 16%, 94%);

  /* Foreground */
  --fg:             #0a0a0a;
  --fg-med:         hsl(220, 8%, 30%);
  --fg-muted:       hsl(220, 7%, 44%);
  --border:         hsl(220, 12%, 88%);

  /* Sky-blue accent (primary brand color) */
  --accent:         hsl(205, 58%, 38%);
  --accent-mid:     hsl(200, 45%, 42%);
  --accent-soft:    hsl(200, 40%, 94%);
  --accent-bright:  hsl(198, 70%, 48%);
  --sky-tint:       hsl(200, 45%, 88%);

  /* Chartreuse / lime — highlights + completion */
  --lime:           hsl(78, 86%, 52%);
  --lime-deep:      hsl(78, 70%, 38%);
  --lime-muted:     hsl(78, 40%, 92%);

  /* Semantic callout colors */
  --green:          hsl(152, 45%, 36%);   /* success */
  --green-bg:       hsl(152, 40%, 94%);
  --gold:           hsl(38, 90%, 44%);    /* tip */
  --gold-bg:        hsl(40, 60%, 95%);
  --dark:           hsl(220, 18%, 8%);

  --card-shadow:    0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px -8px rgba(15, 23, 42, 0.08);

  /* Phase discs — one per phase */
  --p1:             hsl(205, 52%, 38%);
  --p2:             hsl(195, 48%, 40%);
  --p3:             hsl(175, 42%, 36%);
  --p4:             hsl(230, 38%, 44%);
  --p5:             hsl(265, 32%, 44%);

  /* Fonts */
  --font-sans:      'Inter', system-ui, sans-serif;
  --font-serif:     'Fraunces', 'Georgia', serif;
  --font-mono:      'JetBrains Mono', ui-monospace, monospace;

  /* Geometry */
  --r:              16px;                           /* corner radius — cards */
  --r-sm:           10px;                           /* corner radius — small */

  /* Responsive layout */
  --page-px:        clamp(1.25rem, 4.5vw, 4.25rem); /* horizontal shell padding */
  --prose-max:      min(70ch, 100%);                /* max line length for prose */
}
```

**Fonts come from Google Fonts** via a single `@import` at the top of `<style>`:

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&family=JetBrains+Mono:wght@400;500;600&display=swap');
```

**Guiding principles:**

- Body copy: Inter 13–14px, weight 300, `line-height: 1.6–1.75`.
- Headings: Fraunces (serif), weight 600, `letter-spacing: -0.02em`.
- Monospace: JetBrains Mono, used for `code.inline`, prompt/cmd boxes, keyboard shortcuts.
- Color contrast: `--fg` (near-black) for important, `--fg-med` for body, `--fg-muted` for tertiary labels.

---

## 4. Layout architecture

The `.page` is **full-bleed** (no max-width) so the worksheet fills the viewport. Horizontal breathing room is enforced by `--page-px` (scales `1.25rem → 4.25rem`). Prose inside gets a **measure cap** of `--prose-max` (≈70ch) so long paragraphs stay readable on wide screens while cards and strips remain full-bleed.

```css
.page{
  max-width: none; width: 100%; margin: 0;
  background: var(--bg);
  border-radius: 0; box-shadow: none; border: none;
  overflow: hidden;
}
.site-hdr, .hero, .body, .foot-body, .guide-dock-inner{
  padding-left: var(--page-px);
  padding-right: var(--page-px);
}
.hero-sub, .hero-desc, .intro-para, .sec-sub, .phase-sub{
  max-width: var(--prose-max);
}
```

Horizontal dividers between chapters are top-level `.body > hr.div` elements. These are hidden in guided mode (only one chapter is visible anyway) but shown in full-page mode and when printing.

---

## 5. The two reading modes

The template has **one DOM**, reshaped by a single `body.guided` class. The user toggles between them with the **Guided / Read full page** buttons in the fixed bottom dock.

### Guided mode (`body.guided`, default)

- Only the active chapter is visible.
- The active chapter is a **single scrollport** (`overflow-y: auto`) that fills the viewport minus the header and dock.
- Within an active phase chapter, steps behave as an **accordion**: one step expanded at a time.
- When the user ticks a step's **Done** box, the step collapses, the next incomplete step expands, and the viewport smooth-scrolls to it.
- On scroll, the top `.site-hdr` collapses to `max-height: 0` so more content is visible.
- The phase header is `position: sticky` at the top of the scrollport.

### Read full page mode (`body:not(.guided)`)

- All chapters render inline, top-to-bottom, separated by `hr.div` rules.
- Steps are all fully expanded (no accordion).
- The dock collapses to just the mode toggle (no chapter dots / prev / next).
- Normal document scroll.

### Print

Always full page. The guided scrollport caps are removed, the collapsing header is forced open, all steps open, chapter dividers (`hr.div`) appear. The dock is hidden.

---

## 6. Chapter system

Every scrollable unit is a `.guide-chapter` with three attributes:

```html
<div class="guide-chapter" id="ch-<slug>" data-g-label="<Dock label>">
  …
</div>
```

- `id` is used by script and anchor links. Use `ch-welcome`, `ch-context`, `ch-p1..p5`, `ch-wrapup`, `ch-celebrate`, or similar slugs.
- `data-g-label` is the short label that will appear under the dock (e.g. `Phase 1`, `Get oriented`).
- Add `is-active` to exactly one chapter on page load — conventionally `ch-welcome`. Script rehydrates the correct active chapter from `localStorage` on subsequent loads.

Chapter dots in the bottom dock are **generated automatically** from these elements on page load, in document order. You don't hand-write dot markup.

### Where chapters live

```
.page
├── .guide-chapter#ch-welcome.is-active      ← outside .body (hero)
├── .body
│   ├── .guide-chapter#ch-context
│   ├── <hr class="div">
│   ├── .guide-chapter#ch-p1
│   ├── <hr class="div">
│   ├── .guide-chapter#ch-p2                 ← repeat per phase
│   …
│   ├── <hr class="div">
│   ├── .guide-chapter#ch-wrapup             ← reference material
│   └── .guide-chapter#ch-celebrate          ← "Your progress" (journey summary)
└── .foot
```

---

## 7. Component library

Every reusable piece has a fixed class name and fixed nesting pattern. Compose chapters by picking from this library. Classes not listed here either aren't public API or aren't meant to be reused.

### 7.1 Site header

```html
<div class="site-hdr">
  <a class="logo-row" href="https://www.nathanielbaldock.com" target="_blank" rel="noopener"
     aria-label="Nathaniel Baldock — nathanielbaldock.com">
    <div class="logo-mark">N</div>
    <div>
      <div class="logo-name">Nathaniel Baldock</div>
      <div class="logo-sub">PRACTICAL AI WORKFLOWS · 2026</div>
    </div>
  </a>
  <div class="hdr-badge">Workflow · <Label></div>
</div>
```

The `.logo-row` is an anchor that links to the consulting site. The `.hdr-badge` is the short workflow name shown top-right (e.g. *"Workflow · Cursor"*, *"Workflow · Claude Code"*).

### 7.2 Hero (inside `#ch-welcome`)

```html
<div class="guide-chapter is-active" id="ch-welcome" data-g-label="Welcome">
  <div class="hero">
    <div class="hero-category">
      <span>Verb · Verb · Verb</span>
      <div class="cat-rule"></div>
      <span>Audience · Time estimate</span>
    </div>

    <div class="hero-title">Top line<br><em>italic second line.</em></div>
    <div class="hero-sub">One-sentence promise of the worksheet.</div>

    <div class="hero-stats">
      <div class="hs"><div class="hs-num">N</div><div class="hs-text">label 1</div></div>
      <div class="hs"><div class="hs-num">N</div><div class="hs-text">label 2</div></div>
      <div class="hs"><div class="hs-num">N</div><div class="hs-text">label 3</div></div>
      <div class="hs"><div class="hs-num">∞</div><div class="hs-text">label 4</div></div>
    </div>

    <div class="hero-desc">
      A paragraph explaining the premise. Use <strong>strong</strong> for emphasis.
    </div>

    <div class="hero-meta">
      <div class="mi">Tool A</div><div class="msep"></div>
      <div class="mi">Tool B</div><div class="msep"></div>
      <div class="mi">Tool C</div><div class="msep"></div>
      <div class="mi">No prior X required</div>
    </div>
  </div>
</div>
```

The hero has a soft sky-to-cream gradient background with a halftone grain overlay. The italic second line of the title is rendered lighter and italic through `.hero-title em`. `.hero-stats` breaks into a 2×2 grid on narrow screens automatically.

### 7.3 Intro paragraphs and section headers

```html
<p class="intro-para">Narrative paragraph. <strong>Emphasise</strong> important bits.</p>
<p class="intro-para">
  <span class="placeholder">[Insert personal note or story]</span>
</p>

<div class="sec-lbl">Before you start</div>
<div class="sec-title">The four tools and what each one does</div>
<p class="sec-sub">Optional sub-description explaining the section.</p>
```

- `sec-lbl` → tiny uppercase tracking-heavy label, accent-colored.
- `sec-title` → Fraunces serif section title.
- `sec-sub` → muted paragraph, capped to `--prose-max`.

### 7.4 Tools bar (2 to 4 cells)

Use for introducing the named tools/roles at the start of a worksheet.

```html
<div class="tools-bar">
  <div class="tb-cell">
    <div class="tb-name">Tool Name</div>
    <div class="tb-role">One-sentence role.</div>
  </div>
  …
</div>
```

Responsive: becomes 2×2 under 640px. Works best with 4 cells (most visual). For 3, change the CSS `grid-template-columns` to `repeat(3, 1fr)`.

### 7.5 Phase header (one per phase chapter)

```html
<div class="guide-chapter" id="ch-p1" data-g-label="Phase 1">
  <div class="phase-hdr">
    <div class="phase-num ph-1">1</div>
    <div class="phase-text">
      <div class="phase-kicker">Phase 1 · One-time setup</div>
      <div class="phase-title">Do X</div>
      <div class="phase-sub">When and how long it takes.</div>
    </div>
  </div>

  <!-- steps here -->
</div>
```

The colored disc is class `ph-1` … `ph-5`, each mapped to `--p1 … --p5`. Phase headers are sticky in guided mode.

### 7.6 Step block

This is the core unit. Each `.step` is auto-wired for a "Done" checkbox by script (see §8).

```html
<div class="step">
  <div class="step-head">
    <div class="step-num">Step 1.2</div>
    <div class="step-title">Install Cursor on your computer</div>
  </div>
  <div class="step-body">
    <p>Plain-English instruction with <code class="inline">inline code</code> and <a href="#">links</a>.</p>
    <ul class="bull">
      <li>Bullet point.</li>
      <li>Another bullet.</li>
    </ul>
    <!-- any of: prompt-box, cmd-box, note, warn, tip, aha, slash-box -->
  </div>
</div>
```

Rules:

- The first child of `.step` must be `.step-head` (for sticky behaviour).
- `.step-body` wraps everything that should collapse in the accordion.
- The `.step-num` can say "Step 1.2", "Problem 1", "Domain step 1", "If you chose Path A", etc. The string is purely display; the checkbox label is derived from `.step-title`.
- In guided mode the body is `max-height: 0` unless the step has `.is-step-open`. In full page it's always open.
- When completed, `.step.is-done` gets a lime tint, lime left border, line-through title, and a one-shot `stepFlash` animation.

### 7.7 Prompt box and command box (dark blocks)

```html
<div class="prompt-box">
  <div class="pb-prefix">Prompt 1 · Set the ground rules</div>
  <div class="pb-text">Plain-English instructions to paste into the AI.
Line breaks preserved. Highlight <strong>keywords</strong> in lime.</div>
</div>

<div class="cmd-box">
  <div class="cmd-line"><span class="comment"># comment</span></div>
  <div class="cmd-line"><span class="prompt">$</span>terminal command</div>
</div>
```

- `.prompt-box` has a `TYPE THIS INTO <TOOL>` watermark top-right. You can override per worksheet by editing the CSS `content:` value.
- `.cmd-box` has a `TERMINAL` watermark, dimmer palette.
- Both preserve whitespace (`white-space: pre-wrap`).

### 7.8 Slash command box (for built-in commands)

```html
<div class="slash-box">
  <div class="slash-cmd">/command</div>
  <div class="slash-desc">What it does.</div>
</div>
```

### 7.9 Callouts

Four flavours, all with a colored left border and an uppercase label:

```html
<div class="note"><div class="note-lbl">Why this matters</div> Explanation.</div>
<div class="warn"><div class="warn-lbl">Heads up</div> Risk or gotcha.</div>
<div class="tip"><div class="tip-lbl">Tip</div> Extra pointer.</div>
<div class="aha"><div class="aha-lbl">The point</div> Key insight (lime-tinted).</div>
```

Palette:

| Class  | Accent           | Use                            |
| ------ | ---------------- | ------------------------------ |
| `note` | Sky blue         | Context, sidebar explanation   |
| `warn` | Red              | Risks, rollback advice         |
| `tip`  | Gold             | Nice-to-know optimisation      |
| `aha`  | Lime (highlight) | Moments of insight / takeaway  |

### 7.10 Path block (decision cards)

Used for "which route should you take?" decisions. Stack them vertically; each `.path-block` is its own card.

```html
<div class="path-block">
  <div class="path-block-tag">Path A · Short label</div>
  <div class="path-block-head">Heading for this path</div>
  <div class="path-block-body">
    <p>Description paragraph.</p>
    <p><strong>Best for:</strong> audience.</p>
  </div>
</div>
```

### 7.11 Cheat sheet (two-column keyboard table)

```html
<div class="cheat">
  <div class="cheat-row">
    <div class="cheat-key">⌘ + L</div>
    <div class="cheat-val">Description</div>
  </div>
  <!-- repeat -->
</div>
```

Alternating row striping, monospaced keys, breaks to stacked columns under 640px.

### 7.12 Glossary

```html
<div class="gloss">
  <div class="gloss-item">
    <div class="gloss-term">Term</div>
    <div class="gloss-def">Plain-English definition.</div>
  </div>
  <!-- repeat -->
</div>
```

Serif terms in accent color, muted definitions in sans-serif.

### 7.13 Lists

```html
<ul class="bull">    <!-- bullet list with accent-colored markers -->
  <li>item</li>
</ul>

<ul class="sub-list"><!-- numbered sub-list, circular accent badges -->
  <li>first</li>
  <li>second</li>
</ul>
```

### 7.14 Inline placeholder

```html
<span class="placeholder">[Insert short personal story about …]</span>
```

Dashed-border pill used throughout the templates as a visible signal: "fill this in before sending". Keep every worksheet's placeholders explicit and bracketed.

### 7.15 Translate strip, diagram (optional)

- `.translate-strip` — a two-column "you say → AI hears" table, useful for showing prompt patterns.
- `.diagram` — a three-box "A → B → C" horizontal flow diagram with `.dia-box`, `.dia-arrow`, `.dia-tag`, `.dia-name`, `.dia-sub`.

Both auto-stack vertically on narrow screens.

### 7.16 Journey summary (final chapter, always `#ch-celebrate`)

```html
<div class="guide-chapter" id="ch-celebrate" data-g-label="Your progress">
  <section class="journey-summary" id="journeySummary" aria-labelledby="journeyHeading">
    <h2 id="journeyHeading">What you've set up</h2>
    <p class="journey-pct" id="journeyPct">
      Check off steps above as you go — <strong>0%</strong> of checklist items done.
    </p>
    <ul class="journey-list" id="journeyList" role="list"></ul>
    <p class="journey-hint">
      Progress is saved in <strong>this browser only</strong> (local storage).
      Use "Read full page" anytime for search or print.
    </p>
    <div class="journey-tools">
      <button type="button" id="journeyReset">Reset checklist</button>
      <button type="button" id="journeyPrint" onclick="window.print()">Print the full guide</button>
    </div>
  </section>
</div>
```

The list is **auto-populated** by the script from every `.step` in the document, using the `.step-title` text. Don't add `<li>` elements by hand.

### 7.17 Footer

```html
<div class="foot">
  <div class="foot-strip">Practical AI workflows</div>   <!-- hidden in CSS; kept for semantics -->
  <a class="foot-body" href="https://www.nathanielbaldock.com" target="_blank" rel="noopener"
     aria-label="Nathaniel Baldock — nathanielbaldock.com">
    <div class="foot-brand">Nathaniel Baldock</div>
    <div class="foot-cols">
      <div class="foot-left">nathanielbaldock.com</div>  <!-- hidden in CSS; kept for semantics -->
      <div class="foot-right">v1.0 · <Edition> edition · 2026</div>
    </div>
  </a>
</div>
```

Both header logo-row and footer foot-body are anchor tags pointing to the consulting site. Keep that in every worksheet.

---

## 8. Step checkboxes and progress tracking

You **do not** hand-write any `<input type="checkbox">`, `label`, or `data-step-id` attribute. On page load, the script walks every `.step` in the document and injects:

```html
<label class="step-check">
  <input type="checkbox" class="step-check-input">
  <span class="step-check-box" aria-hidden="true">
    <svg viewBox="0 0 20 20">…checkmark path…</svg>
  </span>
  <span class="step-check-txt">Done</span>
</label>
```

Each `.step` is assigned an automatic `data-step-id="step-N"` (zero-based, by document order). The state map `{ 'step-0': true, 'step-3': true, … }` is written to:

```js
localStorage[LS_KEY] = {
  currentChapter: <id>,
  doneSteps:      { 'step-0': true, … },
  mode:           'guided' | 'full'
}
```

**`LS_KEY` must be unique per worksheet.** Reusing the same key across worksheets would mean Worksheet A's ticks would appear in Worksheet B. The convention is:

```js
var LS_KEY = 'nathanielb-<short-slug>-worksheet-v1';
```

Examples:

- `nathanielb-claude-worksheet-v1`
- `nathanielb-cursor-worksheet-v1`

### Behaviour when a step is marked done

1. The input's checked state updates and `saveState()` writes to `localStorage`.
2. The `.step` gets `.is-done` (lime tint, line-through title) and a one-shot `.just-marked` → `stepFlash` animation.
3. The custom box pops and emits a lime ripple via `checkPop` + `checkRipple` keyframes.
4. If guided mode is on and this is the open step, the script calls `advanceStepAccordion()`:
   - Collapses the current step (`.is-step-open` removed).
   - After ~260 ms, finds the next `.step:not(.is-done)`.
   - Opens it, focuses its input for keyboard flow, and smooth-scrolls the active chapter's scrollport so the newly opened step is visible near the top.
5. The dock chapter dot turns lime if every step in that chapter is done.
6. The journey summary updates its `<strong>N%</strong>` and re-renders the list.

### Resetting

The **Reset checklist** button in the journey summary clears `doneSteps` in `localStorage` and reloads the checkboxes to their default unchecked state.

---

## 9. Guide dock (bottom nav)

Fixed to the bottom of the viewport with a soft top fade so long chapters don't feel cut off.

```html
<nav class="guide-dock" id="guideDock" aria-label="Guide navigation" role="navigation">
  <div class="guide-dock-inner">
    <div class="guide-mode" role="group" aria-label="View mode">
      <button class="gmode-btn" id="modeGuided" aria-pressed="true">Guided</button>
      <button class="gmode-btn" id="modeFull"   aria-pressed="false">Read full page</button>
    </div>
    <div class="guide-chapter-nav">
      <span class="guide-progress-label" id="chLabel" aria-live="polite">1 / N</span>
      <div class="ch-dots" id="chDots" role="tablist" aria-label="Chapters"></div>
    </div>
    <div class="guide-nav-btns">
      <button class="nav-ghost"  id="chPrev" aria-label="Previous section">Back</button>
      <button class="nav-primary" id="chNext" aria-label="Next section">Next</button>
    </div>
  </div>
</nav>
```

- `#chDots` is populated by script on load.
- In full-page mode the dots, label, prev, and next collapse (hidden via CSS `body:not(.guided) ...`), so only the mode toggle remains visible.
- Dots highlight the current chapter (accent) and turn lime when all of that chapter's steps are complete.

---

## 10. JavaScript behaviour

The `<script>` block at the bottom is one IIFE. Its public surface is **only** the `LS_KEY` constant at the top — everything else is self-managing. The important functions:

| Function                  | Purpose                                                                 |
| ------------------------- | ----------------------------------------------------------------------- |
| `loadState()`             | Reads `localStorage[LS_KEY]` and rehydrates chapter, mode, and ticks.   |
| `saveState()`             | Serialises current chapter + mode + `.step-check-input` checked states. |
| `buildDock()`             | Generates one `.ch-dot` per `.guide-chapter` using `data-g-label`.      |
| `setMode(isGuided)`       | Toggles `body.guided` + button `aria-pressed`. Saves state.             |
| `showChapter(i)`          | Applies `.is-active` to one chapter, updates dots, scrolls, focuses.    |
| `installStepChecks()`     | Injects the custom checkbox markup into every `.step`.                  |
| `openStepAccordion(step)` | In guided mode, sets `.is-step-open` on one step and removes from rest. |
| `advanceStepAccordion()`  | Collapses current, opens next incomplete step, smooth-scrolls to it.   |
| `buildJourneyList()`      | Re-renders the journey summary from current `.step` states.             |
| `initReveal()`            | Sets up `IntersectionObserver` to toggle `.is-visible` on `.reveal`.    |

### Keyboard shortcuts

- **← / →** move between chapters (in guided mode only).
- **Escape** closes any open modal overlay (defensive — no modal ships with the template by default).
- Step checkboxes are regular inputs, so they respect **Tab** + **Space** to toggle.

---

## 11. Animation inventory

All animations respect `@media (prefers-reduced-motion: reduce)`.

| Animation      | Trigger                              | Duration       |
| -------------- | ------------------------------------ | -------------- |
| `ch-enter`     | A chapter becomes `.is-active`       | 400 ms         |
| `checkPop`     | A step's checkbox is ticked          | 500 ms         |
| `checkRipple`  | Same (chained, ease-out expansion)   | 650 ms         |
| `stepFlash`    | Step becomes `.is-done`              | 550 ms         |
| `modal-in`     | Optional modal overlay opens         | 260 ms         |
| Accordion      | Step body collapse/expand            | 420–480 ms     |
| Sticky header  | `.site-hdr` collapses on scroll      | 380 ms         |
| Reveal         | Element with `.reveal` enters view   | 550 ms         |

---

## 12. Responsive behaviour

| Breakpoint | What changes                                                   |
| ---------- | -------------------------------------------------------------- |
| Default    | Flex/grid layouts at desktop widths, `--page-px` up to 68 px. |
| ≤ 640 px   | Tools-bar, hero-stats, cheat, glossary, diagram stack.         |
| ≤ 640 px   | Guided `.page` max-height uses `calc(100dvh - 88px)`.          |
| ≤ 640 px   | Footer cols keep row layout but shrink gap.                    |

`clamp()` and `min()` make the default stylesheet fluid all the way up; you rarely need extra media queries.

---

## 13. Print support

Everything needed for a clean print is in the existing `@media print` block:

- `.guide-dock` hidden.
- Guided mode constraints removed (header, body, chapters all `display: block; overflow: visible`).
- Every `.step` body open regardless of accordion state.
- `.step .step-check` hidden (ticks not useful on paper).
- Lime tint + line-through removed from `.is-done` so colour cartridges survive.

The **Print the full guide** button in the journey summary calls `window.print()`.

---

## 14. Accessibility notes

- `aria-pressed` on the mode toggle.
- `aria-label` on dock nav and chapter dots.
- `aria-live="polite"` on the chapter label so screen readers announce chapter changes.
- Every `.step-check-input` is a real `<input type="checkbox">`, so Tab-focusable and Space-toggleable.
- `aria-current="true"` is set on the active chapter's dot.
- `aria-label` on the header and footer anchors spells out the destination.
- Focus styles: `.step-check-input:focus-visible + .step-check-box` shows a double-ring (bg + accent).
- `prefers-reduced-motion` is honoured across all keyframes.

---

## 15. Customisation checklist for a new worksheet

Copy one of the existing files (`index.html` or `Workflow Cursor HTML to Live Site.html`) into a new file, then change **only these**:

1. **Title tag** — `<title>From X to Y — A <Tool> Workflow — Nathaniel Baldock</title>`
2. **Header badge** — `<div class="hdr-badge">Workflow · <Tool></div>`
3. **`LS_KEY`** in the script — `'nathanielb-<slug>-worksheet-v1'` (must be unique).
4. **Footer edition label** — `<div class="foot-right">v1.0 · <Tool> edition · 2026</div>`
5. **Hero** (category, title, sub, stats, desc, meta) in `#ch-welcome`.
6. **Chapters** — replace the body of each `.guide-chapter` with your new sections and steps. Keep the `id`s and `data-g-label`s sensible.
7. **Phase colors** (optional) — adjust `--p1 … --p5` in `:root` if the worksheet has more/fewer phases, or rebrand.
8. **Accent palette** (optional) — swap `--accent*` and `--lime*` families if the worksheet is for a different brand. Everything downstream recomputes.
9. **Header + footer links** — leave pointed at `https://www.nathanielbaldock.com` unless you're spinning off for a different consultancy.

Leave **all other CSS and all JavaScript untouched.** The template is meant to be a shared chassis.

---

## 16. Content conventions (house style)

These aren't enforced by code, but every worksheet that matches the template uses them:

- **Second-person voice** ("You'll want to…", "Before you open…").
- **British spelling** (colour, organise, emphasise) in prose, US only in technical names (color as CSS property, etc.).
- **Paragraphs, not dense bullets.** Use `<p>` for narrative. `<ul class="bull">` only when the items are genuinely parallel.
- **Plain-English callout labels.** `"Why this matters"`, `"Heads up"`, `"The point"` beats generic `"Note"` or `"Important"`.
- **Keyboard shortcuts** shown with both Mac and Windows in-line: `<code class="inline">⌘ + L  /  Ctrl + L</code>`.
- **Placeholders are visible and bracketed** (`[Insert short personal story about …]`) so the author can grep for them before sending to clients.
- **No emoji** in headings, step titles, or body text. Reserved for explicit "celebrate" moments, if ever.
- **Time estimates** in phase subs ("About 10 minutes", "30 seconds first run"). Clients want to know the cost of each step.
- **One decision per step.** If a step needs two choices, split it or use a `.path-block` pair.

---

## 17. Building a new worksheet — step-by-step

1. Decide the name, the single-sentence promise, and the four stats (hero).
2. List the phases on paper (3–7 is the healthy range; examples have 5).
3. For each phase, list the steps (2–5 per phase). Each step needs: a number label, a title, a body with at most one callout and at most one prompt/cmd box.
4. Collect the reference material for the wrap-up chapter: decision cards, custom-domain or follow-up steps, cheat sheet, glossary, common problems, one-screen summary.
5. Duplicate `index.html` → `NewWorksheet.html`.
6. Apply the **Customisation checklist** (§15).
7. Empty every chapter body except `#ch-welcome` and `#ch-celebrate`. Rebuild them by composing from the **Component library** (§7).
8. Open the file directly in a browser (no server needed). Tick a step to confirm `localStorage` is reading/writing under the new `LS_KEY` and you get the completion animation.
9. Toggle to Read full page, then print-preview. Confirm the layout is healthy and no chapter is orphaned.
10. Test on a narrow viewport (≤ 400 px). The hero stats should go 2×2, the tools bar should stack, the cheat sheet should collapse. If anything overflows, the content is the problem — the template handles the layout.
11. Send to clients. They'll see a fluid full-width Figma-style worksheet with progress saved in their browser and a printable reference on demand.

---

## 18. Known extensibility hooks

If you need to push the template further without breaking its guarantees:

- **More phase colors**: add `--p6`, `--p7` in `:root`, and `.ph-6`, `.ph-7` selectors next to the existing ones.
- **New callout flavour**: clone `.tip` / `.warn` block, rename, assign a semantic color.
- **Modal overlay**: the CSS for `.modal-overlay`, `.modal-box`, `.modal-head`, `.modal-body`, `.modal-verdict` is already in place (used by `index.html`'s "capabilities" popup). Add a trigger button with the `.capabilities-trigger` class if you want a similar reader.
- **Custom font or brand color**: change the `@import` URL and `:root` variables. Do not hard-code colors elsewhere in the stylesheet.

Anything beyond that (framework migration, multi-page, dynamic data) means you're no longer building "another worksheet like these two" — you're building a different product. Don't fight the template; fork it.

---

*Version 1.0 · 2026 · Companion reference for single-file editorial worksheets by Nathaniel Baldock.*
