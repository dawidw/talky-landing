#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '../.agents/skills/stageshow/node_modules/playwright-core/index.mjs'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const icon = readFileSync(path.join(rootDir, 'assets/talky-icon.svg'), 'utf8')
const iconData = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(icon)}`

const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{width:1200px;height:630px;background:#131314;font-family:Inter,system-ui,sans-serif;color:#f5f5f7;display:flex;align-items:center;padding:0 96px;gap:72px}
  .icon{flex:none;width:240px;height:240px}
  h1{font-size:80px;font-weight:700;letter-spacing:-.03em;line-height:1.05}
  .tagline{margin-top:20px;font-size:34px;font-weight:600;color:#30d158}
  .sub{margin-top:16px;font-size:26px;color:#8e8e93;font-weight:400}
</style></head><body>
  <img class="icon" src="${iconData}" width="240" height="240" alt="">
  <div>
    <h1>Talky</h1>
    <p class="tagline">Talk. It types and summarizes.</p>
    <p class="sub">Everything runs locally on your Mac. We don't even have servers.</p>
  </div>
</body></html>`

const chrome =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  '/home/ubuntu/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome'

const browser = await chromium.launch({ executablePath: chrome, headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.screenshot({ path: path.join(rootDir, 'og-image.png'), type: 'png' })
await browser.close()
console.log('wrote', path.join(rootDir, 'og-image.png'))