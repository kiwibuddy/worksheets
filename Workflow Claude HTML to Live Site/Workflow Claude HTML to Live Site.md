# From Claude chat to a live site (Claude Code)

Plain-text version of the same workflow as [`index.html`](index.html). Use this if you want instructions in a note, email, or repo without opening the worksheet. For full prompts, screenshots-style detail, and a printable checklist, use the HTML file.

**Idea:** You start with an `index.html` from **Claude chat**, then use **Claude Desktop** (Code tab = Claude Code), **GitHub** for backup/history, and **Vercel** to host a public URL.

**Flow:** your idea → Claude Code edits files → commits go to GitHub → Vercel deploys from GitHub.

---

## Phase 1: Install and accounts (one-time per machine)

New projects skip straight to Phase 2 after this.

1. **Paid Claude plan** that includes **Claude Code** (e.g. Pro), managed from your Claude account in the browser.  
2. **GitHub** and **Vercel:** same email; use **Continue with GitHub** on Vercel so they connect.  
3. **Claude Desktop** from [claude.com/download](https://claude.com/download); sign in; **Code** tab = Claude Code.  
4. **GitHub Desktop** (optional) if you like clicking instead of only asking Claude Code for Git.  
5. In Claude Desktop, **sign Claude Code in to GitHub** (settings) so it can create repos, commit, and push.

---

## Phase 2: From chat to a project folder

1. **Export the file** from Claude chat (artifact download or copy into a new `index.html`).
2. **Project folder:** create a dedicated folder; name the file `index.html` (that name = default page).
3. **Open the folder in Claude Code** (Code tab) so the app reads the project from disk, not as a one-off upload.
4. **Run `/init`** in the project chat. That creates `CLAUDE.md` (a briefing Claude reads on new sessions). Tweak that file with anything the project should always remember.
5. **Add `.gitignore`:** ask Claude Code to add a standard one for a static site (OS junk, editors, secrets, etc.).

---

## Phase 3: GitHub (backup and history)

- **Concept:** Your folder is local; GitHub is the cloud mirror. Changes are **not** auto-synced until you **commit** and **push**. That is intentional: you can experiment and only send what you want.
- **Two ways:** (a) **GitHub Desktop:** add local repo, publish private; or (b) ask **Claude Code** to walk you through `git` + first push. Keep the repo **private** until you mean to be public.
- **Check:** on github.com you should see `index.html`, `CLAUDE.md`, `.gitignore`, etc.

---

## Phase 4: Go live (Vercel)

1. **Import** the GitHub repo at [vercel.com/new](https://vercel.com/new). If the repo is missing, fix **GitHub app permissions** for Vercel.
2. **Config:** for a single root `index.html`, use static / **Other**; **no** build command; **Output directory** = `.` (a single dot).
3. **Deploy:** you get a `*.vercel.app` URL. After this, new pushes to `main` typically redeploy in under a minute.
4. **Optional:** add the **Vercel MCP** in Claude Code so you can ask about deploy status and errors in chat.

---

## Phase 5: Day-to-day loop

1. **Say what you want in plain English** before you ask for code. Vague request → vague result.
2. **Plan first:** ask for a plan, confirm it, then say *go* so you do not get surprise multi-file edits.
3. **Review** diffs; accept or reject. **Esc Esc** rolls back to Claude Code’s last checkpoint if things go wrong mid-task.
4. **Commit and push:** ask Claude Code to do it with a clear message, or use GitHub Desktop.

---

## Extras (same as the full guide)

- **Data files:** drop JSON/CSV in the project folder, commit/push, ask Claude to use them. Mind GitHub’s file size limits.
- **Custom domain:** point DNS at Vercel (or buy through Vercel) when you are ready; SSL is automatic.
- **Reference:** the worksheet highlights `/init`, `/clear`, `/mcp`, `/help`, and **Esc · Esc** for checkpoint rollback. Type `/` in chat for the full list.
- **When something breaks:** check commit, push, GitHub, Vercel deploy, and chat length (use `/clear` and re-ground on `CLAUDE.md`).

---

## One-screen recipe

1. Get `index.html` from Claude chat into a folder.  
2. Open folder in Claude Code → `/init` → refine `CLAUDE.md` → add `.gitignore`.  
3. Create private GitHub repo and push.  
4. Import repo in Vercel, output **.** → deploy → bookmark the URL.  
5. After that: describe change → plan → go → review → commit and push → wait for the site to update.

*First run is slow; later runs are fast. Full prompts, callouts, and the interactive checklist: [`index.html`](index.html). Deeper template documentation: `WORKSHEET_TEMPLATE.md`.*
