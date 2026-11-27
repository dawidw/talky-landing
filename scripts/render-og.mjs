#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '../.agents/skills/stageshow/node_modules/playwright-core/index.mjs'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outName = process.argv[2] || 'og-v2.png'
const icon = readFileSync(path.join(rootDir, 'assets/talky-icon.svg'), 'utf8')
const iconData = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(icon)}`

const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{
    width:1200px;height:630px;
    font-family:Inter,system-ui,sans-serif;color:#f5f5f7;
    display:flex;align-items:center;padding:0 88px 0 80px;gap:64px;
    background:
      radial-gradient(95% 75% at 12% 18%, rgba(29,43,83,0.62) 0%, transparent 58%),
      radial-gradient(85% 65% at 88% 78%, rgba(75,42,122,0.45) 0%, transparent 52%),
      radial-gradient(70% 55% at 72% 22%, rgba(15,122,120,0.28) 0%, transparent 48%),
      #0a0a0b;
  }
  .icon{flex:none;width:232px;height:232px;filter:drop-shadow(0 14px 36px rgba(0,0,0,0.45))}
  .copy{min-width:0;flex:1}
  .name{font-size:34px;font-weight:700;letter-spacing:-.02em;color:#f5f5f7}
  .headline{margin-top:10px;font-size:52px;font-weight:700;letter-spacing:-.035em;line-height:1.08;max-width:14ch}
  .sub{margin-top:18px;font-size:26px;font-weight:400;line-height:1.35;color:#8e8e93;max-width:26ch}
</style></head><body>
  <img class="icon" src="${iconData}" width="232" height="232" alt="">
  <div class="copy">
    <p class="name">Talky</p>
    <p class="headline">Talk. It types and summarizes.</p>
    <p class="sub">Dictation, voice memos, and meetings. Everything's local.</p>
  </div>
</body></html>`

const chrome =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  '/home/ubuntu/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome'

const browser = await chromium.launch({ executablePath: chrome, headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
const outPath = path.join(rootDir, outName)
await page.screenshot({ path: outPath, type: 'png' })
await browser.close()
console.log('wrote', outPath)