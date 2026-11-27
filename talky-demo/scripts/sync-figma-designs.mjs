#!/usr/bin/env node
import { copyFile, mkdir, readdir, access } from 'node:fs/promises'
import { join } from 'node:path'

const SRC = '/cursor/stores/bot/talky-designs'
const DST = new URL('../../.agents/skills/stageshow/examples/talky/assets/figma/', import.meta.url).pathname

async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

if (!(await exists(SRC))) {
  console.error('Brak store:', SRC)
  process.exit(1)
}

await mkdir(DST, { recursive: true })
const names = await readdir(SRC)
const copied = []
for (const name of names) {
  if (!/\.(png|webp|svg)$/i.test(name)) continue
  await copyFile(join(SRC, name), join(DST, name))
  copied.push(name)
}

const key = ['panel-expanded.png', 'pill-idle.png', 'pill-meeting-speaking.png']
const missing = key.filter((f) => !copied.includes(f))
if (missing.length) {
  console.warn('Brakuje (opcjonalne):', missing.join(', '))
}

console.log(`Skopiowano ${copied.length} plików → ${DST}`)