# Research to Presentation — email capture

The worksheet HTML posts signups to Google Apps Script, which appends rows to your Google Sheet.

## One-time Google setup (do this in the browser)

1. **Sheet** — [sheets.google.com](https://sheets.google.com): new spreadsheet, row 1 headers: `Email`, `Timestamp`, `Source`.
2. **Apps Script** — With the sheet open: **Extensions → Apps Script**. Paste the script from the workflow’s Reference section (“Connecting the email capture to your Google Sheet”, Setup 2). Save.
3. **Deploy** — **Deploy → New deployment** → Type: **Web app** → Execute as: **Me** → Who has access: **Anyone** → Deploy. Copy the **Web App URL**.
4. **Smoke test** — Open the Web App URL in a new tab. You should see plain text: `Active.`

## Wire the URL (Vercel — recommended)

Do **not** commit the Web App URL to git (anyone with the repo could spam your sheet).

1. In Vercel: your project → **Settings → Environment Variables**.
2. Add **`APPS_SCRIPT_URL`** = your Web App URL (Production; add Preview too if you use preview deploys).
3. Redeploy. The build injects the URL into the deployed HTML only.

## Local build

```bash
export APPS_SCRIPT_URL='https://script.google.com/macros/s/…/exec'
npm run build
```

Output is in `Research_to_Presentation-dist/` (gitignored).

## After deploy — end-to-end test

1. Open your live site, submit an email through the gate.
2. Confirm a new row in the sheet (email, ISO timestamp, source `Research to Presentation Workflow`).

## Optional: paste URL in source HTML instead

If you are not using the Vercel build step, edit `Research_to_Presentation_Workflow.html` and set:

`var APPS_SCRIPT_URL = 'YOUR_ACTUAL_WEB_APP_URL';`

(Only that line — leave the instruction text in the Reference section as-is.)
