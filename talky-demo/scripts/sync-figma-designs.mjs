#!/usr/bin/env node
/**
 * Kopiuje PNG/SVG z /cursor/stores/bot/talky-designs/ do stageshow assets.
 * Kończy kodem 1, jeśli brak README z tokenami (po linii "Tokeny") lub brak kluczowych PNG.
 */
import { copyFile, mkdir, readdir, readFile, access } from 'node:fs/promises'
import { join } from 'node:path'

const SRC = '/cursor/stores/bot/talky-designs'
const DST = new URL('../../.agents/skills/stageshow/examples/talky/assets/figma/', import.meta.url).pathname

const REQUIRED = [
  'white-orb@2x.png',
  'pill-idle@2x.png',
  'panel@2x.png',
  'panel-listen@2x.png',
]

async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

const readmePath = join(SRC, 'README.md')
if (!(await exists(readmePath))) {
  console.error(`Brak ${readmePath} — czekam na eksport z Figmy.`)
  process.exit(1)
}

const readme = await readFile(readmePath, 'utf8')
if (!readme.includes('<!-- Dawid: wklej tu zmienne z Figmy -->') && !/--[\w-]+:\s*#/.test(readme)) {
  const afterTokens = readme.split('## Tokeny')[1] ?? ''
  if (afterTokens.trim().length < 40) {
    console.warn('README bez uzupełnionych tokenów — sync PNG tylko.')
  }
}

await mkdir(DST, { recursive: true })
const names = await readdir(SRC)
const copied = []
for (const name of names) {
  if (!/\.(png|webp|svg)$/i.test(name)) continue
  await copyFile(join(SRC, name), join(DST, name))
  copied.push(name)
}

const missing = REQUIRED.filter((f) => !copied.includes(f))
if (missing.length) {
  console.error('Brakujące kluczowe pliki w store:', missing.join(', '))
  console.error('Skopiowano:', copied.length ? copied.join(', ') : '(nic)')
  process.exit(1)
}

console.log('OK →', DST)
console.log(copied.join('\n'))