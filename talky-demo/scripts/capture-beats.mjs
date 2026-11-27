#!/usr/bin/env node
/** Internal beat screenshots (desktop + compact). Not for Dawid. */
import { mkdirSync } from 'node:fs'
import { chromium } from '../../.agents/skills/stageshow/node_modules/playwright-core/index.mjs'

const url = process.argv[2] ?? 'http://127.0.0.1:8765/'
const out = '/opt/cursor/artifacts/talky-qa'
mkdirSync(out, { recursive: true })

const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'compact', width: 390, height: 844 },
]

const browser = await chromium.launch({
  headless: true,
  executablePath: '/home/ubuntu/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome',
})

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForSelector('.talky-stage-host .ss-stage', { timeout: 15000 })
  const host = page.locator('.talky-stage-host')
  await page.waitForTimeout(600)
  await host.screenshot({ path: `${out}/beat-idle-${vp.name}.png` })
  const beats = [
    ['panel', 1200],
    ['listen', 2200],
    ['meeting', 4500],
    ['transcript', 7500],
    ['summary', 14000],
  ]
  let elapsed = 600
  for (const [label, t] of beats) {
    await page.waitForTimeout(t - elapsed)
    elapsed = t
    await host.screenshot({ path: `${out}/beat-${label}-${vp.name}.png` })
  }
  await page.close()
}

await browser.close()
console.log('wrote', out)