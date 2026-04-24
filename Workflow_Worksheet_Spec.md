# Worksheet HTML — Full Build Specification

Use this document to build a new worksheet in Claude Chat. Paste the relevant sections as context, then provide your content. Claude will produce a complete, self-contained `index.html` file matching the design system below.

---

## 1. What this produces

A single `index.html` file with:
- A gated landing hero (optional email capture, always skippable)
- A guided step-by-step mode (one chapter at a time, progress saved in localStorage)
- A "Read full page" mode (all chapters visible, scrollable, printable)
- A floating bottom dock with mode toggle + chapter navigation
- A fixed `?` help button that opens a booking modal
- A footer linking to `nathanielbaldock.com`
- Fully mobile-responsive, no build step, no dependencies

Deploy by dragging `index.html` onto a Vercel project. No server, no framework.

---

## 2. Design tokens — copy these exactly

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --bg:             #ffffff;
  --bg-warm:        hsl(42, 40%, 98%);
  --bg-mist:        hsl(210, 24%, 96%);
  --bg-muted:       hsl(210, 16%, 94%);
  --fg:             #0a0a0a;
  --fg-med:         hsl(220, 8%, 30%);
  --fg-muted:       hsl(220, 7%, 44%);
  --border:         hsl(220, 12%, 88%);
  --accent:         hsl(205, 58%, 38%);
  --accent-mid:     hsl(200, 45%, 42%);
  --accent-soft:    hsl(200, 40%, 94%);
  --accent-bright:  hsl(198, 70%, 48%);
  --sky-tint:       hsl(200, 45%, 88%);
  --lime:           hsl(78, 86%, 52%);
  --lime-deep:      hsl(78, 70%, 38%);
  --lime-muted:     hsl(78, 40%, 92%);
  --green:          hsl(152, 45%, 36%);
  --green-bg:       hsl(152, 40%, 94%);
  --gold:           hsl(38, 90%, 44%);
  --gold-bg:        hsl(40, 60%, 95%);
  --dark:           hsl(220, 18%, 8%);
  --card-shadow:    0 1px 2px rgba(15,23,42,.04), 0 12px 32px -8px rgba(15,23,42,.08);
  --p1:             hsl(205, 52%, 38%);
  --p2:             hsl(195, 48%, 40%);
  --p3:             hsl(175, 42%, 36%);
  --p4:             hsl(230, 38%, 44%);
  --p5:             hsl(265, 32%, 44%);
  --font-sans:      'Inter', system-ui, sans-serif;
  --font-serif:     'Fraunces', 'Georgia', serif;
  --font-mono:      'JetBrains Mono', ui-monospace, monospace;
  --r:              16px;
  --r-sm:           10px;
  --page-px:        clamp(1.25rem, 4.5vw, 4.25rem);
  --prose-max:      min(70ch, 100%);
}
```

**Fonts:**
- `Fraunces` — serif, used for all headings, titles, phase numbers, step titles
- `Inter` — sans-serif, used for all body text, labels, UI
- `JetBrains Mono` — monospace, used for code, prompts, terminal commands

**Phase colours** (numbered discs 1–5): `--p1` through `--p5` in CSS. Use `class="ph-1"` through `class="ph-5"` on `.phase-num` elements.

---

## 3. Page structure

```
<body class="guided gated">
  <div class="page">
    [? help button — fixed]
    [site header]
    [hero / welcome chapter  — id="ch-welcome"]
    <div class="body">
      [chapter 2: orientation/context]
      <hr class="div">
      [phase chapters: ch-p1, ch-p2, ch-p3 …]
      <hr class="div"> (between each phase)
      [reference chapter]
      [checklist/journey chapter]
    </div>
    [footer]
  </div>
  [guide dock nav — outside .page]
  [modals: help, email gate, mode choice]
  [scripts]
</body>
```

**Key rules:**
- `body` starts with classes `guided gated` — JS removes them as needed
- Every chapter is `<div class="guide-chapter" id="ch-NAME" data-g-label="Tab label">`
- The welcome/hero chapter sits outside `.body`, directly inside `.page`
- All content chapters sit inside `.body`
- The guide dock `<nav>` sits outside `.page`, after the closing `</div>`

---

## 4. Content you must supply when building a new worksheet

Tell Claude these things before generating:

| Field | Example |
|---|---|
| **Worksheet title** (hero heading) | "From scattered research to an interactive presentation." |
| **Hero subtitle** | "How to turn a pile of PDFs and articles into a polished, source-verified, shareable HTML presentation." |
| **Category line** (top of hero) | "Research · Build · Present" and "Beginner · 2-4 hours first run" |
| **Hero stats** (4 numbers with labels) | 50+, 4, 1, ∞ |
| **Hero description paragraph** | 2-3 sentences on the outcome |
| **Hero meta tags** (tools list) | NotebookLM · Claude Chat · Vercel · No coding required |
| **Chapter/phase count and titles** | Phase 1: Research, Phase 2: Build, etc. |
| **Steps per phase** | Step 1.1, 1.2, 1.3… |
| **Step content** | Text, prompts, notes, warnings, tips |
| **Reference section content** | Scripts, cheat sheets, glossary |
| **Checklist items** | One per step, auto-generated from step IDs |
| **Your name** | Nathaniel Baldock |
| **Your website** | https://www.nathanielbaldock.com |
| **Version string** | v1.0 · Research edition · 2026 |
| **Booking/help URL** | Google Calendar appointments link |
| **Apps Script URL** | Your deployed Google Web App URL (for email capture) |
| **localStorage key** | Unique string e.g. `nathanielb-worksheet-name-v1` |
| **Gate localStorage key** | Unique string e.g. `nathanielb-worksheet-name-gate-v1` |

---

## 5. Component reference

### 5.1 Site header

```html
<div class="site-hdr">
  <a class="logo-row" href="YOUR_WEBSITE" target="_blank" rel="noopener">
    <div class="logo-mark">N</div>
    <div>
      <div class="logo-name">Nathaniel Baldock</div>
      <div class="logo-sub">PRACTICAL AI WORKFLOWS · 2026</div>
    </div>
  </a>
  <div class="hdr-badge">Workflow · [Worksheet Name]</div>
</div>
```

### 5.2 Hero (welcome chapter)

```html
<div class="guide-chapter is-active" id="ch-welcome" data-g-label="Welcome">
<div class="hero">
  <div class="hero-category">
    <span>[Category] · [Sub-category]</span><div class="cat-rule"></div><span>[Skill level] · [Time estimate]</span>
  </div>
  <div class="hero-title">[Main title]<br><em>[Italic subtitle]</em></div>
  <div class="hero-sub">[One-line description]</div>

  <div class="hero-stats">
    <div class="hs"><div class="hs-num">[Stat]</div><div class="hs-text">[Label line 1]<br>[Label line 2]</div></div>
    <!-- repeat × 4 -->
  </div>

  <div class="hero-desc" style="max-width:100%;text-align:center;">
    [2-3 sentence outcome description]
  </div>

  <div class="hero-meta">
    <div class="mi">[Tool 1]</div><div class="msep"></div>
    <div class="mi">[Tool 2]</div><div class="msep"></div>
    <div class="mi">[Tool 3]</div>
  </div>

  <div id="startBtnWrap" style="text-align:center;margin-top:28px;">
    <button type="button" class="hero-start-btn" id="heroStartBtn">
      Get the full walkthrough &rarr;
    </button>
    <p style="margin-top:10px;font-size:11px;color:rgba(10,10,10,0.4);font-family:var(--font-sans);">Free access. We'll send you updates when new workflows are added.</p>
  </div>
</div>
</div>
```

### 5.3 Phase header

```html
<div class="phase-hdr">
  <div class="phase-num ph-1">1</div>   <!-- ph-1 through ph-5 -->
  <div class="phase-text">
    <div class="phase-kicker">Phase 1 · [Phase name]</div>
    <div class="phase-title">[Phase heading]</div>
    <div class="phase-sub">[One sentence description and time estimate]</div>
  </div>
</div>
```

### 5.4 Step block

```html
<div class="step" id="step-1-1" data-step-label="[Step title short]">
  <div class="step-head">
    <div class="step-num">Step 1.1</div>
    <div class="step-title">[Step heading]</div>
  </div>
  <div class="step-body">
    <p>[Body text. Use <strong> for emphasis.]</p>
    <!-- Nest any components from 5.5–5.13 here -->
  </div>
</div>
```

Each step needs a unique `id` (e.g. `step-1-1`, `step-2-3`) and `data-step-label` for the checklist. The JS auto-collects them for the progress tracker.

### 5.5 Prompt box (Claude prompt to type)

```html
<div class="prompt-box">
  <div class="pb-prefix">[Short label e.g. "Extract the strongest evidence"]</div>
  <div class="pb-text">Paste the exact prompt here.

Multi-line is fine. Use <strong>highlighted text</strong> in lime for key placeholders.</div>
</div>
```

The `::before` pseudo-element auto-adds "TYPE THIS INTO CLAUDE" in the top right.

### 5.6 Terminal command box

```html
<div class="cmd-box">
  <div class="cmd-line"><span class="prompt">$</span> [command here]</div>
  <div class="cmd-line"><span class="comment"># comment explaining the command</span></div>
</div>
```

The `::before` pseudo-element auto-adds "TERMINAL" label.

### 5.7 Note callouts (four variants)

```html
<!-- Blue info note -->
<div class="note">
  <div class="note-lbl">Note</div>
  [Content. Use <strong> for bold.]
</div>

<!-- Red warning -->
<div class="warn">
  <div class="warn-lbl">Warning</div>
  [Content]
</div>

<!-- Gold tip -->
<div class="tip">
  <div class="tip-lbl">Tip</div>
  [Content]
</div>

<!-- Lime "aha" insight -->
<div class="aha">
  <div class="aha-lbl">Key insight</div>
  [Content. Use <strong> for bold.]
</div>
```

### 5.8 Tools bar (horizontal tool grid)

```html
<div class="tools-bar">
  <div class="tb-cell">
    <div class="tb-name">[Tool name]</div>
    <div class="tb-role">[One sentence description of what this tool does in this workflow]</div>
  </div>
  <!-- repeat for each tool, max 4 columns -->
</div>
```

### 5.9 Diagram (flow / pipeline)

```html
<div class="diagram">
  <div class="dia-box">
    <div class="dia-tag">Phase 1 output</div>
    <div class="dia-name">[Output name]</div>
    <div class="dia-sub">[One line description]</div>
  </div>
  <div class="dia-arrow">→</div>
  <div class="dia-box">...</div>
  <div class="dia-arrow">→</div>
  <div class="dia-box">...</div>
</div>
```

Max 3 boxes with 2 arrows. For more steps, use a `.sub-list` inside a step body instead.

### 5.10 Numbered sub-list

```html
<ul class="sub-list">
  <li><strong>[Label]</strong> [Explanation text]</li>
  <li>...</li>
</ul>
```

Auto-numbers with circular accent-coloured counters.

### 5.11 Bullet list

```html
<ul class="bull">
  <li>[Item]</li>
</ul>
```

### 5.12 Cheat sheet table

```html
<div class="cheat">
  <div class="cheat-row">
    <div class="cheat-key">[Key / command]</div>
    <div class="cheat-val">[Description]</div>
  </div>
  <!-- repeat rows -->
</div>
```

### 5.13 Glossary

```html
<div class="gloss">
  <div class="gloss-item">
    <div class="gloss-term">[Term]</div>
    <div class="gloss-def">[Definition]</div>
  </div>
</div>
```

### 5.14 Section header (inside body, above a group of steps)

```html
<div class="sec-lbl">[Uppercase label e.g. "Before you start"]</div>
<div class="sec-title">[Section heading]</div>
<p class="sec-sub">[One sentence framing]</p>
```

### 5.15 Path block (branching options)

```html
<div class="path-block">
  <div class="path-block-tag">Path A</div>
  <div class="path-block-head">[Option heading]</div>
  <div class="path-block-body">
    <p>[Description]</p>
  </div>
</div>
```

---

## 6. Chapter structure

Each chapter is wrapped in:
```html
<div class="guide-chapter" id="ch-[name]" data-g-label="[Short tab label]">
  [content]
</div>
```

The JS reads all `.guide-chapter` elements in DOM order and builds the dot navigation automatically. The `data-g-label` value appears as the chapter tooltip.

**Recommended chapter order:**
1. `ch-welcome` — Hero (outside `.body`, starts as `is-active`)
2. `ch-context` — "Get oriented" / tools overview
3. `ch-p1` through `ch-pN` — One per phase
4. `ch-ref` — Reference / scripts / cheat sheets
5. `ch-checklist` — Journey / progress tracker (always last)

Separate phases with `<hr class="div">` between chapter divs inside `.body`.

---

## 7. Guide dock (bottom navigation)

This is fixed at the bottom, outside `.page`. Copy exactly — the JS targets these IDs:

```html
<nav class="guide-dock" id="guideDock" aria-label="Guide navigation" role="navigation">
  <div class="guide-dock-inner">
    <div class="guide-mode" role="group" aria-label="View mode">
      <button type="button" class="gmode-btn" id="modeGuided" aria-pressed="true">Guided</button>
      <button type="button" class="gmode-btn" id="modeFull" aria-pressed="false">Read full page</button>
    </div>
    <div class="guide-chapter-nav">
      <span class="guide-progress-label" id="chLabel" aria-live="polite">1 / 8</span>
      <div class="ch-dots" id="chDots" role="tablist" aria-label="Chapters"></div>
    </div>
    <div class="guide-nav-btns">
      <button type="button" class="nav-ghost" id="chPrev" aria-label="Previous section">Back</button>
      <button type="button" class="nav-primary" id="chNext" aria-label="Next section">Next</button>
    </div>
  </div>
</nav>
```

---

## 8. Email gate system

### How it works
1. `<body>` starts with class `gated` — hides `.body` and guide dock via CSS
2. Clicking the hero CTA button opens the email gate modal
3. User submits email → sent to Google Apps Script → `gated` class removed → mode choice modal opens
4. User clicks "No thanks, just browse" → `gated` class removed → mode choice modal opens (no email sent)
5. On return visits, `localStorage` bypasses the gate entirely

### Gate modal HTML

```html
<!-- EMAIL GATE MODAL -->
<div class="gate-overlay" id="gateModal" role="dialog" aria-modal="true" aria-labelledby="gateHeading">
  <div class="gate-box">
    <div class="gate-kicker">Free access</div>
    <h2 class="gate-heading" id="gateHeading">Want updates when new workflows drop?</h2>
    <p class="gate-sub">Add your email and I'll let you know when I release new tools like this one. No spam, unsubscribe any time.</p>
    <input type="email" class="gate-input" id="gateEmail" placeholder="your@email.com" autocomplete="email" aria-label="Email address">
    <div class="gate-error" id="gateError" role="alert"></div>
    <button type="button" class="gate-submit" id="gateSubmit">Yes, keep me posted &rarr;</button>
    <p class="gate-privacy">Your email is stored in a private spreadsheet. It's never shared or sold.</p>
    <p style="text-align:center;margin-top:14px;">
      <button type="button" id="gateSkip" style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--fg-muted);text-decoration:underline;font-family:var(--font-sans);padding:0;">No thanks, just browse</button>
    </p>
  </div>
</div>
```

### Mode choice modal HTML (shown after gate clears)

```html
<div class="gate-overlay" id="gateModeModal" role="dialog" aria-modal="true" aria-labelledby="gateModeHeading">
  <div class="gate-mode-box">
    <div class="gate-kicker">You're in. How do you want to start?</div>
    <h2 class="gate-heading" id="gateModeHeading">Pick your reading mode</h2>
    <p class="gate-sub" style="text-align:center;">Guided walks you through one step at a time. Full page shows everything at once.</p>
    <div class="gate-mode-btns">
      <button type="button" class="gate-mode-primary" id="startGuided">Start guided walkthrough &rarr;</button>
      <button type="button" class="gate-mode-secondary" id="startFull">Read the full page</button>
    </div>
  </div>
</div>
```

### Apps Script URL
Replace this value in the gate script block:
```js
var APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```

The Google Apps Script expects a POST with JSON body `{ email, timestamp, source }` and appends to a Sheet with columns `Email | Timestamp | Source`.

---

## 9. Help / booking modal

```html
<div class="gate-overlay" id="helpModal" role="dialog" aria-modal="true" aria-labelledby="helpModalHeading">
  <div class="help-modal-box">
    <button type="button" class="gate-close-btn" id="helpModalClose" aria-label="Close">✕</button>
    <div class="gate-kicker" style="color:var(--lime-deep);">Free support</div>
    <h2 class="gate-heading" id="helpModalHeading">Getting stuck?</h2>
    <p class="gate-sub">[Your support offer text]</p>
    <a href="YOUR_BOOKING_URL" target="_blank" rel="noopener" class="help-link">
      Book a free 30-min call &rarr;
    </a>
    <p class="gate-privacy">Opens in Google Calendar. No payment required.</p>
  </div>
</div>
```

The `?` button that opens this is a fixed element at the top right:
```html
<button type="button" class="help-btn" id="helpBtn" aria-label="Book a follow-up call">?</button>
```

---

## 10. Checklist / journey chapter

Always the last chapter. The JS auto-populates the list from all `data-step-label` attributes — you only need the shell:

```html
<div class="guide-chapter" id="ch-checklist" data-g-label="Checklist">
  <div class="sec-lbl">Your progress</div>
  <div class="sec-title">Workflow checklist</div>
  <p class="sec-sub">Check off steps as you complete them. Progress saves in this browser.</p>
  <section class="journey-card" id="journeySection">
    <p class="journey-pct" id="journeyPct">Check off steps above as you go. <strong>0%</strong> of checklist items done.</p>
    <ul class="journey-list" id="journeyList" role="list"></ul>
    <p class="journey-hint">Progress is saved in <strong>this browser only</strong> (local storage). Use "Read full page" anytime for search or print.</p>
    <div class="journey-tools">
      <button type="button" id="journeyReset">Reset checklist</button>
      <button type="button" id="journeyPrint" onclick="window.print()">Print the full guide</button>
    </div>
  </section>
</div>
```

---

## 11. Footer

```html
<div class="foot">
  <div class="foot-strip">Practical AI workflows</div>
  <a class="foot-body" href="YOUR_WEBSITE" target="_blank" rel="noopener">
    <div class="foot-brand">Nathaniel Baldock</div>
    <div class="foot-cols">
      <div class="foot-left">nathanielbaldock.com</div>
      <div class="foot-right">v1.0 · [Worksheet edition] · 2026</div>
    </div>
  </a>
</div>
```

---

## 12. JavaScript — two script blocks

The HTML requires exactly two `<script>` blocks at the end of `<body>`:

### Script 1 — Guide engine (chapter nav, mode toggle, checklist, progress)

Required IDs it targets:
- `guideDock`, `modeGuided`, `modeFull`, `chLabel`, `chDots`, `chPrev`, `chNext`
- `heroStartBtn`, `startBtnWrap`
- `journeyList`, `journeyPct`, `journeyReset`
- All `.guide-chapter` elements (auto-collected)
- All `.step` elements with `data-step-label` (auto-collected for checklist)

Key localStorage key: set to a unique value per worksheet:
```js
var LS_KEY = 'nathanielb-[worksheet-slug]-v1';
```

### Script 2 — Gate + help modal engine

Required IDs it targets:
- `gateModal`, `gateModeModal`, `helpModal`, `helpModalClose`
- `gateEmail`, `gateSubmit`, `gateError`, `gateSkip`
- `startGuided`, `startFull`, `heroStartBtn`, `helpBtn`

Key localStorage key (gate unlock):
```js
var GATE_KEY = 'nathanielb-[worksheet-slug]-gate-v1';
```

---

## 13. Critical CSS for gate behaviour

These rules must be present — they control what's hidden before email is submitted:

```css
/* Hide content when gated */
body.gated .body { display: none; }
body.gated .guide-dock { display: none; }
body.gated.guided { padding-bottom: 0; }
body.gated .page { max-height: none; overflow: visible; }

/* Fix mobile scroll lock when gated */
html.guide-locked:has(body.gated) {
  height: auto !important;
  overflow: visible !important;
  overflow-x: hidden !important;
}
```

---

## 14. Prompt to give Claude

Use this prompt in Claude Chat:

```
Build a complete self-contained worksheet HTML file using the design system and component library from the Worksheet Spec doc I'm pasting below.

Here are the specifics for this worksheet:

TITLE: [Your worksheet title]
SUBTITLE: [One line description]
CATEGORY LINE: [e.g. "Build · Share · Grow" and "Intermediate · 1-2 hours"]
HERO STATS: [Stat 1 + label], [Stat 2 + label], [Stat 3 + label], [Stat 4 + label]
HERO DESCRIPTION: [2-3 sentence outcome paragraph]
HERO META TAGS: [Tool 1] · [Tool 2] · [Tool 3] · [etc.]
TOOLS USED: [list the tools and their role in the workflow]

PHASES AND STEPS:
Phase 1 — [Name]: [Steps and content]
Phase 2 — [Name]: [Steps and content]
[etc.]

REFERENCE SECTION: [Prompts, cheat sheets, glossary items to include]

YOUR NAME: Nathaniel Baldock
YOUR WEBSITE: https://www.nathanielbaldock.com
BOOKING URL: [Your Google Calendar link]
APPS SCRIPT URL: [Your deployed Google Apps Script URL]
VERSION: v1.0 · [Edition name] · 2026
LS_KEY: nathanielb-[slug]-v1
GATE_KEY: nathanielb-[slug]-gate-v1

---
[Paste the full spec doc here]
```

---

## 15. Deployment checklist

- [ ] Replace `APPS_SCRIPT_URL` with live Google Apps Script URL
- [ ] Replace `YOUR_WEBSITE` with `https://www.nathanielbaldock.com`
- [ ] Replace `YOUR_BOOKING_URL` with Google Calendar appointments link
- [ ] Set unique `LS_KEY` and `GATE_KEY` values (prevents collisions with other worksheets)
- [ ] Set `version` string in footer
- [ ] Set `<title>` tag in `<head>`
- [ ] Rename file to `index.html`
- [ ] Place in a folder named after the worksheet (e.g. `My_New_Worksheet/index.html`)
- [ ] Add `vercel.json` with `{}` inside that folder
- [ ] Commit and push to `main`
- [ ] Vercel auto-deploys — set root directory to the worksheet folder
