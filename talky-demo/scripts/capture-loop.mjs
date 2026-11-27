import { spawnSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { chromium } from '../../.agents/skills/stageshow/node_modules/playwright-core/index.mjs'

const url = process.argv[2] ?? 'http://127.0.0.1:8765/'
const outDir = '/opt/cursor/artifacts/talky-loop-frames'
const mp4 = '/opt/cursor/artifacts/talky-demo-loop.mp4'
const everyMs = 90
const count = 150

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch({
  headless: true,
  executablePath: '/home/ubuntu/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome',
})
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForSelector('.talky-stage-host .ss-stage', { timeout: 15000 })
const box = await page.locator('.talky-stage-host').boundingBox()
if (!box) throw new Error('talky-stage-host not found')

for (let i = 0; i < count; i++) {
  const path = `${outDir}/frame-${String(i).padStart(3, '0')}.png`
  await page.screenshot({
    path,
    clip: { x: box.x, y: box.y, width: box.width, height: box.height },
  })
  await page.waitForTimeout(everyMs)
}

await browser.close()

const ffmpeg = spawnSync(
  'ffmpeg',
  [
    '-y',
    '-framerate',
    String(1000 / everyMs),
    '-i',
    `${outDir}/frame-%03d.png`,
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    mp4,
  ],
  { encoding: 'utf8' },
)

if (ffmpeg.status !== 0) {
  console.error(ffmpeg.stderr)
  process.exit(ffmpeg.status ?? 1)
}

console.log(`mp4 -> ${mp4}`)