# Worksheet HTML — Full Build Specification

Use this document to build a new worksheet in Claude Chat. Fill in **Section 1 (your brand details)** first, then paste the whole document into Claude Chat with your content brief. Claude will produce a complete, self-contained `index.html` ready to deploy.

---

## SECTION A — YOUR BRAND DETAILS
### Fill these in before sending to Claude

These values replace every placeholder throughout the generated file. Define them once here so Claude uses them consistently.

| Field | Your value |
|---|---|
| **Creator name** | e.g. Jane Smith |
| **Creator initials** (1–2 chars for logo mark) | e.g. JS |
| **Creator tagline** (appears below name in header) | e.g. PRACTICAL BUSINESS TOOLS · 2026 |
| **Creator website URL** | e.g. https://www.janesmith.com |
| **Creator website display text** | e.g. janesmith.com |
| **Support/booking URL** | e.g. Google Calendar link, Calendly, or mailto: |
| **Support button label** | e.g. "Book a free 30-min call →" or "Email me →" |
| **Support modal body text** | e.g. "Got stuck? Book a free 15-minute call and I'll walk you through it." |
| **Footer tagline** | e.g. "Practical Business Tools" (appears in the lime strip) |
| **Email capture: source label** | e.g. "Jane Smith Worksheet" (logged to your Sheet alongside each email) |
| **Apps Script URL** | Your deployed Google Web App URL (see Section B) |
| **Gate modal heading** | e.g. "Want updates when new guides drop?" |
| **Gate modal sub-text** | e.g. "Add your email and I'll send you new tools as I release them. No spam, unsubscribe any time." |
| **Gate submit button label** | e.g. "Yes, keep me posted →" |
| **Gate privacy line** | e.g. "Your email is stored in a private spreadsheet. It's never shared or sold." |

---

## SECTION B — EMAIL CAPTURE SETUP
### One-time Google setup before deploying

The email capture sends signups to a Google Sheet via a Google Apps Script. You only set this up once and reuse the same URL for all your worksheets.

**Step 1 — Create your Google Sheet**
1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it something like "Worksheet Email Signups"
3. Set row 1 headers: `Email` | `Timestamp` | `Source`

**Step 2 — Create the Apps Script**
1. Inside the sheet: **Extensions → Apps Script**
2. Delete all existing code and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([data.email, data.timestamp, data.source]);
    return ContentService
      .createTextOutput(JSON.stringify({status:'ok'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({status:'error'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Active.');
}
```

3. Save the script (name it anything, e.g. "Email capture")

**Step 3 — Deploy as a Web App**
1. Click **Deploy → New deployment**
2. Click the gear icon next to "Type" → select **Web app**
3. Set **Execute as**: Me
4. Set **Who has access**: Anyone
5. Click **Deploy** → copy the Web App URL (ends in `/exec`)
6. Confirm it's live: paste the URL in a new browser tab — you should see `Active.`

**Step 4 — Paste the URL into your worksheet**
In the generated `index.html`, find:
```js
var APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```
Replace the placeholder with your copied URL. Or tell Claude your URL in the build prompt and it will be inserted automatically.

> **Can I skip email capture entirely?** Yes. Set `APPS_SCRIPT_URL` to an empty string `''`. The gate and skip button still work — it just won't send anything to a sheet.

---

## SECTION C — CONTENT BRIEF
### What to tell Claude about this specific worksheet

| Field | Your value |
|---|---|
| **Worksheet title** (hero heading) | e.g. "From scattered notes to a published blog post." |
| **Hero subtitle** | e.g. "How to turn rough ideas into polished, SEO-ready articles in under two hours." |
| **Category line** (top-left of hero) | e.g. "Write · Edit · Publish" |
| **Skill / time line** (top-right of hero) | e.g. "Beginner · 1-2 hours" |
| **Hero stats** (4 numbers with short labels) | e.g. 6 steps, 2 hrs, 1 file, ∞ reuse |
| **Hero description paragraph** | 2-3 sentences on what the reader will achieve |
| **Hero meta tags** (tools / keywords strip) | e.g. ChatGPT · Notion · WordPress · No coding required |
| **Phases and steps** | List each phase, its name, and the steps inside it |
| **Step content** | Text, prompts, notes, warnings, tips for each step |
| **Reference section** | Prompts, cheat sheets, glossary, scripts to include |
| **Worksheet edition label** | e.g. "Blog edition · 2026" (shown in footer) |
| **localStorage key** | Unique slug e.g. `janesmith-blog-workflow-v1` |
| **Gate localStorage key** | Unique slug e.g. `janesmith-blog-gate-v1` |

---

## SECTION D — DESIGN SYSTEM
### Copy these exactly into the generated file

### Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&family=JetBrains+Mono:wght@400;500;600&display=swap');
```

- **Fraunces** — serif, all headings, titles, phase numbers, step titles
- **Inter** — sans-serif, all body text, labels, UI elements
- **JetBrains Mono** — monospace, code, prompts, terminal commands

### CSS variables
```css
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

**Phase colours** (numbered discs): `--p1` through `--p5`. Apply via `class="ph-1"` through `class="ph-5"` on `.phase-num` elements.

---

## SECTION E — PAGE STRUCTURE

```
<body class="guided gated">
  <div class="page">
    [? help button — fixed, top right]
    [site header]
    [hero / welcome chapter — id="ch-welcome", class="is-active"]
    <div class="body">
      [chapter: orientation/context — id="ch-context"]
      <hr class="div">
      [phase chapters: ch-p1, ch-p2, ch-p3 … one per phase]
      <hr class="div"> (between each phase)
      [reference chapter — id="ch-ref"]
      [checklist chapter — id="ch-checklist", always last]
    </div>
    [footer]
  </div>
  [guide dock nav — OUTSIDE .page]
  [modals: help, email gate, mode choice — OUTSIDE .page]
  [script 1: guide engine]
  [script 2: gate + help engine]
</body>
```

**Rules:**
- `body` starts with `guided gated` — JS removes `gated` when the user passes the gate
- Hero chapter sits directly inside `.page`, before `.body`
- All content chapters sit inside `.body`
- Guide dock `<nav>` sits after the closing `</div>` of `.page`

---

## SECTION F — COMPONENT LIBRARY

### F1 — Site header
```html
<div class="site-hdr">
  <a class="logo-row" href="[CREATOR_WEBSITE]" target="_blank" rel="noopener" aria-label="[CREATOR_NAME]">
    <div class="logo-mark">[CREATOR_INITIALS]</div>
    <div>
      <div class="logo-name">[CREATOR_NAME]</div>
      <div class="logo-sub">[CREATOR_TAGLINE]</div>
    </div>
  </a>
  <div class="hdr-badge">Workflow · [WORKSHEET_NAME]</div>
</div>
```

### F2 — Hero (welcome chapter)
```html
<div class="guide-chapter is-active" id="ch-welcome" data-g-label="Welcome">
<div class="hero">
  <div class="hero-category">
    <span>[CATEGORY_LINE]</span><div class="cat-rule"></div><span>[SKILL_TIME_LINE]</span>
  </div>
  <div class="hero-title">[HERO_TITLE_LINE_1]<br><em>[HERO_TITLE_LINE_2_ITALIC]</em></div>
  <div class="hero-sub">[HERO_SUBTITLE]</div>

  <div class="hero-stats">
    <div class="hs"><div class="hs-num">[STAT_1]</div><div class="hs-text">[STAT_1_LABEL_LINE_1]<br>[STAT_1_LABEL_LINE_2]</div></div>
    <div class="hs"><div class="hs-num">[STAT_2]</div><div class="hs-text">[STAT_2_LABEL_LINE_1]<br>[STAT_2_LABEL_LINE_2]</div></div>
    <div class="hs"><div class="hs-num">[STAT_3]</div><div class="hs-text">[STAT_3_LABEL_LINE_1]<br>[STAT_3_LABEL_LINE_2]</div></div>
    <div class="hs"><div class="hs-num">[STAT_4]</div><div class="hs-text">[STAT_4_LABEL_LINE_1]<br>[STAT_4_LABEL_LINE_2]</div></div>
  </div>

  <div class="hero-desc" style="max-width:100%;text-align:center;">
    [HERO_DESCRIPTION_PARAGRAPH]
  </div>

  <div class="hero-meta">
    <div class="mi">[META_TAG_1]</div><div class="msep"></div>
    <div class="mi">[META_TAG_2]</div><div class="msep"></div>
    <div class="mi">[META_TAG_3]</div><div class="msep"></div>
    <div class="mi">[META_TAG_4]</div>
  </div>

  <div id="startBtnWrap" style="text-align:center;margin-top:28px;">
    <button type="button" class="hero-start-btn" id="heroStartBtn">
      Get the full walkthrough &rarr;
    </button>
    <p style="margin-top:10px;font-size:11px;color:rgba(10,10,10,0.4);font-family:var(--font-sans);">Free access. [GATE_INCENTIVE_LINE]</p>
  </div>
</div>
</div>
```

> `[GATE_INCENTIVE_LINE]` — e.g. "We'll notify you when new worksheets are added." or leave blank.

### F3 — Phase header
```html
<div class="phase-hdr">
  <div class="phase-num ph-[N]">[N]</div>
  <div class="phase-text">
    <div class="phase-kicker">Phase [N] · [PHASE_NAME]</div>
    <div class="phase-title">[PHASE_HEADING]</div>
    <div class="phase-sub">[One sentence description. Optional time estimate.]</div>
  </div>
</div>
```
Replace `[N]` with `1`–`5`. Use `ph-1` through `ph-5` on `.phase-num`.

### F4 — Step block
```html
<div class="step" id="step-[N]-[M]" data-step-label="[SHORT_STEP_TITLE]">
  <div class="step-head">
    <div class="step-num">Step [N].[M]</div>
    <div class="step-title">[STEP_HEADING]</div>
  </div>
  <div class="step-body">
    <p>[Body text. Use &lt;strong&gt; for emphasis.]</p>
    <!-- nest any component from F5–F15 here -->
  </div>
</div>
```
Every step needs a unique `id` and `data-step-label`. The JS reads these to build the checklist automatically.

### F5 — Prompt box (instruction to type into an AI tool)
```html
<div class="prompt-box">
  <div class="pb-prefix">[SHORT_LABEL e.g. "Extract the key points"]</div>
  <div class="pb-text">Paste the exact prompt here.

Multi-line is fine.
Use <strong>highlighted text</strong> for placeholders the user should customise.</div>
</div>
```
A "TYPE THIS INTO CLAUDE" label appears top-right automatically.

### F6 — Terminal / command box
```html
<div class="cmd-box">
  <div class="cmd-line"><span class="prompt">$</span> [command]</div>
  <div class="cmd-line"><span class="comment"># Explanation of what this does</span></div>
</div>
```
A "TERMINAL" label appears top-right automatically.

### F7 — Callout boxes (four variants)

```html
<!-- Blue — general note or context -->
<div class="note">
  <div class="note-lbl">Note</div>
  [Content. Use <strong> for key terms.]
</div>

<!-- Red — warning or common mistake -->
<div class="warn">
  <div class="warn-lbl">Warning</div>
  [Content]
</div>

<!-- Gold — helpful tip or shortcut -->
<div class="tip">
  <div class="tip-lbl">Tip</div>
  [Content]
</div>

<!-- Lime — key insight or "aha" moment -->
<div class="aha">
  <div class="aha-lbl">Key insight</div>
  [Content. Use <strong> for emphasis.]
</div>
```

### F8 — Tools bar (horizontal grid of tools used)
```html
<div class="tools-bar">
  <div class="tb-cell">
    <div class="tb-name">[TOOL_NAME]</div>
    <div class="tb-role">[One sentence: what this tool does in this workflow.]</div>
  </div>
  <!-- repeat — max 4 columns works well -->
</div>
```

### F9 — Flow diagram (pipeline / stages)
```html
<div class="diagram">
  <div class="dia-box">
    <div class="dia-tag">[Stage label e.g. "Step 1 output"]</div>
    <div class="dia-name">[Output name]</div>
    <div class="dia-sub">[One line description]</div>
  </div>
  <div class="dia-arrow">→</div>
  <div class="dia-box">...</div>
  <div class="dia-arrow">→</div>
  <div class="dia-box">...</div>
</div>
```
Max 3 boxes / 2 arrows. For more stages, use a `.sub-list` in a step body instead.

### F10 — Numbered sub-list
```html
<ul class="sub-list">
  <li><strong>[Label]</strong> [Explanation text.]</li>
  <li>...</li>
</ul>
```
Auto-numbered with circular accent-coloured counters.

### F11 — Bullet list
```html
<ul class="bull">
  <li>[Item]</li>
</ul>
```

### F12 — Cheat sheet table
```html
<div class="cheat">
  <div class="cheat-row">
    <div class="cheat-key">[Key / shortcut / command]</div>
    <div class="cheat-val">[What it does]</div>
  </div>
  <!-- repeat rows -->
</div>
```

### F13 — Glossary
```html
<div class="gloss">
  <div class="gloss-item">
    <div class="gloss-term">[Term]</div>
    <div class="gloss-def">[Definition — 1-2 sentences.]</div>
  </div>
</div>
```

### F14 — Section header (labels a group of steps)
```html
<div class="sec-lbl">[LABEL e.g. "Before you start"]</div>
<div class="sec-title">[SECTION_HEADING]</div>
<p class="sec-sub">[One sentence that frames what follows.]</p>
```

### F15 — Path block (branching options / "choose your path")
```html
<div class="path-block">
  <div class="path-block-tag">Path A</div>
  <div class="path-block-head">[Option heading]</div>
  <div class="path-block-body">
    <p>[Description of this option and who it suits.]</p>
  </div>
</div>
```

---

## SECTION G — CHAPTER SYSTEM

Every chapter uses this wrapper:
```html
<div class="guide-chapter" id="ch-[SLUG]" data-g-label="[SHORT_TAB_LABEL]">
  [content]
</div>
```

The JS collects all `.guide-chapter` elements in DOM order and builds the dot navigation automatically. `data-g-label` shows as the tooltip on each dot.

**Recommended chapter order:**

| Order | ID | Label | Location |
|---|---|---|---|
| 1 | `ch-welcome` | Welcome | Outside `.body` — starts `is-active` |
| 2 | `ch-context` | Get oriented | Inside `.body` |
| 3 | `ch-p1` | Phase 1 | Inside `.body` |
| 4 | `ch-p2` | Phase 2 | Inside `.body` |
| … | … | … | … |
| N-1 | `ch-ref` | Reference | Inside `.body` |
| N | `ch-checklist` | Checklist | Inside `.body` — always last |

Separate phases with `<hr class="div">` between their chapter `<div>`s.

---

## SECTION H — GUIDE DOCK (bottom navigation)

Fixed at the bottom of the viewport. Sits **outside** `.page`. Copy exactly — the JS targets these IDs:

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

## SECTION I — EMAIL GATE MODALS

### How the gate works
1. `<body>` starts with class `gated` → hides `.body` and guide dock
2. Hero CTA button click → opens gate modal
3. User submits email → email sent to Apps Script → `gated` removed → mode choice modal opens
4. User clicks skip → `gated` removed → mode choice modal opens (no email sent)
5. Return visitors: `localStorage` check bypasses the gate automatically

### Gate modal (customise the copy with your brand fields)
```html
<div class="gate-overlay" id="gateModal" role="dialog" aria-modal="true" aria-labelledby="gateHeading">
  <div class="gate-box">
    <div class="gate-kicker">Free access</div>
    <h2 class="gate-heading" id="gateHeading">[GATE_MODAL_HEADING]</h2>
    <p class="gate-sub">[GATE_MODAL_SUBTEXT]</p>
    <input type="email" class="gate-input" id="gateEmail" placeholder="your@email.com" autocomplete="email" aria-label="Email address">
    <div class="gate-error" id="gateError" role="alert"></div>
    <button type="button" class="gate-submit" id="gateSubmit">[GATE_SUBMIT_LABEL]</button>
    <p class="gate-privacy">[GATE_PRIVACY_LINE]</p>
    <p style="text-align:center;margin-top:14px;">
      <button type="button" id="gateSkip" style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--fg-muted);text-decoration:underline;font-family:var(--font-sans);padding:0;">No thanks, just browse</button>
    </p>
  </div>
</div>
```

### Mode choice modal (shown after gate clears — copy exactly)
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

---

## SECTION J — HELP / SUPPORT MODAL

The `?` button is fixed top-right and opens a booking or contact modal. Customise with your own support offer and link.

```html
<!-- Fixed ? button -->
<button type="button" class="help-btn" id="helpBtn" aria-label="Get help">?</button>

<!-- Help modal -->
<div class="gate-overlay" id="helpModal" role="dialog" aria-modal="true" aria-labelledby="helpModalHeading">
  <div class="help-modal-box">
    <button type="button" class="gate-close-btn" id="helpModalClose" aria-label="Close">✕</button>
    <div class="gate-kicker" style="color:var(--lime-deep);">Free support</div>
    <h2 class="gate-heading" id="helpModalHeading">Getting stuck?</h2>
    <p class="gate-sub">[SUPPORT_MODAL_BODY_TEXT]</p>
    <a href="[SUPPORT_BOOKING_URL]" target="_blank" rel="noopener" class="help-link">
      [SUPPORT_BUTTON_LABEL]
    </a>
    <p class="gate-privacy">[e.g. "Opens in Google Calendar. No payment required."]</p>
  </div>
</div>
```

**Support URL options:**
- Google Calendar appointments link (recommended)
- Calendly link
- `mailto:you@example.com?subject=Worksheet help`
- Any booking page URL

---

## SECTION K — CHECKLIST CHAPTER

Always the last chapter. The JS auto-populates the checklist from every `data-step-label` in the document — you only need this shell:

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

## SECTION L — FOOTER

```html
<div class="foot">
  <div class="foot-strip">[FOOTER_TAGLINE]</div>
  <a class="foot-body" href="[CREATOR_WEBSITE]" target="_blank" rel="noopener" aria-label="[CREATOR_NAME] — [CREATOR_WEBSITE_DISPLAY]">
    <div class="foot-brand">[CREATOR_NAME]</div>
    <div class="foot-cols">
      <div class="foot-left">[CREATOR_WEBSITE_DISPLAY]</div>
      <div class="foot-right">[VERSION_STRING e.g. "v1.0 · Blog edition · 2026"]</div>
    </div>
  </a>
</div>
```

---

## SECTION M — JAVASCRIPT KEYS

Two script blocks go at the end of `<body>`. Both use localStorage — set unique keys per worksheet so multiple worksheets on the same domain don't share state.

**Script 1 — Guide engine** (chapter nav, mode toggle, checklist, progress)
```js
var LS_KEY = '[YOUR_LS_KEY e.g. janesmith-blog-workflow-v1]';
```

IDs it targets (do not rename): `guideDock`, `modeGuided`, `modeFull`, `chLabel`, `chDots`, `chPrev`, `chNext`, `heroStartBtn`, `startBtnWrap`, `journeyList`, `journeyPct`, `journeyReset`, all `.guide-chapter` and `.step[data-step-label]` elements.

**Script 2 — Gate + help engine**
```js
var APPS_SCRIPT_URL = '[YOUR_APPS_SCRIPT_URL]';
var GATE_KEY        = '[YOUR_GATE_KEY e.g. janesmith-blog-gate-v1]';
```

IDs it targets (do not rename): `gateModal`, `gateModeModal`, `helpModal`, `helpModalClose`, `gateEmail`, `gateSubmit`, `gateError`, `gateSkip`, `startGuided`, `startFull`, `heroStartBtn`, `helpBtn`.

---

## SECTION N — CRITICAL CSS (gate behaviour + mobile)

These rules must be present in the `<style>` block. They are not optional:

```css
/* Hide worksheet content until gate is cleared */
body.gated .body            { display: none; }
body.gated .guide-dock      { display: none; }
body.gated.guided           { padding-bottom: 0; }
body.gated .page            { max-height: none; overflow: visible; }

/* Fix mobile scroll lock on the gated landing page */
html.guide-locked:has(body.gated) {
  height: auto !important;
  overflow: visible !important;
  overflow-x: hidden !important;
}
```

---

## SECTION O — CLAUDE BUILD PROMPT

Copy this prompt, fill in your values from Sections A and C, and paste the full spec below it.

```
Build a complete self-contained worksheet HTML file using the design system and
component library in the spec document below. Follow every rule in Sections D–N exactly.
Replace all bracketed placeholders with the values I provide here.

── BRAND ──
CREATOR_NAME:           [Your name]
CREATOR_INITIALS:       [1-2 chars]
CREATOR_TAGLINE:        [Header sub-line e.g. "PRACTICAL TOOLS · 2026"]
CREATOR_WEBSITE:        [https://yoursite.com]
CREATOR_WEBSITE_DISPLAY:[yoursite.com]
FOOTER_TAGLINE:         [e.g. "Practical Tools"]
SUPPORT_BOOKING_URL:    [Your booking/contact URL]
SUPPORT_BUTTON_LABEL:   [e.g. "Book a free 30-min call →"]
SUPPORT_MODAL_BODY:     [Your support offer text]

── EMAIL GATE ──
APPS_SCRIPT_URL:        [Your Google Apps Script Web App URL, or '' to disable]
EMAIL_SOURCE_LABEL:     [e.g. "Jane Smith Worksheet" — logged to your Sheet]
GATE_MODAL_HEADING:     [e.g. "Want updates when new guides drop?"]
GATE_MODAL_SUBTEXT:     [e.g. "Add your email and I'll notify you when new tools go live."]
GATE_SUBMIT_LABEL:      [e.g. "Yes, keep me posted →"]
GATE_PRIVACY_LINE:      [e.g. "Your email is stored in a private spreadsheet. Never shared."]
GATE_INCENTIVE_LINE:    [Small text under hero button e.g. "We'll notify you of new worksheets."]

── CONTENT ──
WORKSHEET_NAME:         [Short name for header badge]
PAGE_TITLE:             [Full browser tab title]
HERO_TITLE:             [Main heading — split into two lines if needed]
HERO_SUBTITLE:          [One-line description]
CATEGORY_LINE:          [e.g. "Write · Edit · Publish"]
SKILL_TIME_LINE:        [e.g. "Beginner · 1-2 hours"]
HERO_STATS:             [4 stats with labels]
HERO_DESCRIPTION:       [2-3 sentence outcome paragraph]
HERO_META_TAGS:         [Tool 1 · Tool 2 · Tool 3 · etc.]

PHASES AND STEPS:
[Describe each phase and its steps in as much detail as you have.
Include any specific prompts, examples, callouts, or reference material.]

REFERENCE SECTION:
[List any prompts, cheat sheets, glossary terms, or scripts to include.]

── TECHNICAL ──
LS_KEY:                 [e.g. janesmith-worksheet-slug-v1]
GATE_KEY:               [e.g. janesmith-worksheet-slug-gate-v1]
VERSION_STRING:         [e.g. v1.0 · Blog edition · 2026]

── SPEC DOCUMENT ──
[Paste this full spec here]
```

---

## SECTION P — DEPLOYMENT CHECKLIST

After Claude generates the file, run through this before publishing:

**Brand**
- [ ] Creator name, initials, tagline correct in header
- [ ] Header badge shows the right worksheet name
- [ ] Footer name, website URL, and display text correct
- [ ] Footer version string set (e.g. `v1.0 · Blog edition · 2026`)
- [ ] `<title>` tag set in `<head>`
- [ ] Help modal support text and booking URL set

**Email capture**
- [ ] `APPS_SCRIPT_URL` set (or intentionally `''` to disable)
- [ ] Test the Apps Script URL in a browser — should show `Active.`
- [ ] Gate modal heading, sub-text, button label, and privacy line correct
- [ ] Email source label matches this worksheet (for Sheet tracking)

**Technical**
- [ ] `LS_KEY` is unique (no other worksheet uses the same string)
- [ ] `GATE_KEY` is unique
- [ ] File renamed to `index.html`
- [ ] File placed in its own folder (e.g. `My_Worksheet/index.html`)
- [ ] `vercel.json` with `{}` added inside that folder
- [ ] Folder committed and pushed to `main` on GitHub

**Vercel**
- [ ] Vercel project connected to your GitHub repo
- [ ] Root directory set to the worksheet folder (e.g. `My_Worksheet`)
- [ ] Deployment succeeded (check Vercel dashboard)
- [ ] Live URL opens correctly on desktop
- [ ] Live URL opens and scrolls correctly on mobile
- [ ] Submit a test email → confirm row appears in your Google Sheet
- [ ] "No thanks, just browse" link unlocks the content
- [ ] Guided mode / Read full page toggle works
- [ ] Checklist checkboxes save progress on refresh
