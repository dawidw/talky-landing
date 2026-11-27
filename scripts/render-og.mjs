#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { readFileSync, unlinkSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '../.agents/skills/stageshow/node_modules/playwright-core/index.mjs'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outName = process.argv[2] || 'og-v4.png'
const wallpaper = '/cursor/stores/bot/talky-designs/wallpaper-dawid.png'
const tmpBg = path.join('/tmp', `talky-og-wallpaper-${process.pid}.jpg`)

const icon = readFileSync(path.join(rootDir, 'assets/talky-icon.svg'), 'utf8')
const iconData = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(icon)}`

execSync(
  `ffmpeg -y -hide_banner -loglevel error -i "${wallpaper}" -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" -q:v 2 "${tmpBg}"`,
)
const bgData = readFileSync(tmpBg).toString('base64')
const bgUrl = `data:image/jpeg;base64,${bgData}`

const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{
    width:1200px;height:630px;
    font-family:Inter,system-ui,sans-serif;color:#f5f5f7;
    display:flex;align-items:center;justify-content:center;
    background:#000 url("${bgUrl}") center/cover no-repeat;
  }
  .panel{
    display:flex;align-items:center;gap:40px;
    width:min(1060px, calc(100% - 72px));
    padding:34px 44px 36px;
    border-radius:22px;
    background:rgba(28,28,30,0.9);
    border:1px solid rgba(255,255,255,0.16);
    box-shadow:0 14px 36px rgba(0,0,0,0.45);
  }
  .icon{flex:none;width:136px;height:136px}
  .copy{min-width:0;flex:1}
  .name{font-size:32px;font-weight:700;letter-spacing:-.02em;color:#f5f5f7}
  .headline{margin-top:8px;font-size:46px;font-weight:700;letter-spacing:-.035em;line-height:1.08}
  .sub{margin-top:14px;font-size:24px;font-weight:400;line-height:1.35;color:#8e8e93;max-width:30ch}
</style></head><body>
  <div class="panel">
    <img class="icon" src="${iconData}" width="136" height="136" alt="">
    <div class="copy">
      <p class="name">Talky</p>
      <p class="headline">Talk. It types and summarizes.</p>
      <p class="sub">Dictation, voice memos, and meetings. Everything's local.</p>
    </div>
  </div>
</body></html>`

const chrome =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  '/home/ubuntu/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome'

const browser = await chromium.launch({ executablePath: chrome, headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'load' })
const outPath = path.join(rootDir, outName)
await page.screenshot({ path: outPath, type: 'png' })
await browser.close()
try {
  unlinkSync(tmpBg)
} catch {
  /* ignore */
}
console.log('wrote', outPath)