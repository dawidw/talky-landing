import { createRoot } from 'react-dom/client'
import TalkyHero from '../../.agents/skills/stageshow/examples/talky'
import '@kit/stageshow.css'
import '../../.agents/skills/stageshow/examples/talky/talky.css'

function mountTalkyHero() {
  const host = document.querySelector('[data-talky-stageshow]')
  if (!host || host.childElementCount) return
  createRoot(host).render(<TalkyHero />)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountTalkyHero, { once: true })
} else {
  mountTalkyHero()
}