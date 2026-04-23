/**
 * Copies Research_to_Presentation → Research_to_Presentation-dist and,
 * if APPS_SCRIPT_URL is set, replaces the Apps Script placeholder in the
 * built HTML only (source file in git stays unchanged).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'Research_to_Presentation');
const outDir = path.join(root, 'Research_to_Presentation-dist');
const htmlName = 'Research_to_Presentation_Workflow.html';

if (!fs.existsSync(srcDir)) {
  console.error('Missing directory:', srcDir);
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.cpSync(srcDir, outDir, { recursive: true });

const htmlPath = path.join(outDir, htmlName);
let html = fs.readFileSync(htmlPath, 'utf8');

const needle = "var APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';";
const url = process.env.APPS_SCRIPT_URL;

if (url) {
  const escaped = String(url).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const replacement = `var APPS_SCRIPT_URL = '${escaped}';`;
  if (!html.includes(needle)) {
    console.error('Expected placeholder not found:', needle);
    process.exit(1);
  }
  html = html.replace(needle, replacement);
  fs.writeFileSync(htmlPath, html);
  console.log('Injected APPS_SCRIPT_URL into', path.relative(root, htmlPath));
} else {
  console.warn(
    '[build] APPS_SCRIPT_URL is not set. Email capture will stay disabled until you add your Web App URL in Vercel → Project → Settings → Environment Variables (then redeploy).'
  );
}
