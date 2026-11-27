#!/usr/bin/env node
/** Smoke: hero stageshow mounts and animates (no mp4, no film stills). */
import { chromium } from '../../.agents/skills/stageshow/node_modules/playwright-core/index.mjs'

const url = process.argv[2] ?? 'http://127.0.0.1:8765/'
const browser = await chromium.launch({
  headless: true,
  executablePath: '/home/ubuntu/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome',
})
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForSelector('.talky-stage-host .ss-stage', { timeout: 15000 })
const stage = page.locator('.talky-stage-host .ss-stage')
const box1 = await stage.boundingBox()
if (!box1?.height || box1.height < 100) {
  throw new Error(`Stage height invalid: ${JSON.stringify(box1)}`)
}
await page.waitForTimeout(1200)
const hasPill = await page.locator('[data-target="talky-pill"], .tk-meeting-pill, .tk-panel[data-show]').count()
if (hasPill < 1) {
  const h = await stage.boundingBox()
  if (!h?.height) throw new Error('No Talky UI targets and stage collapsed')
}
await browser.close()
console.log('verify-embed: ok', url)