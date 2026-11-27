import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TalkyHero from '../../.agents/skills/stageshow/examples/talky'
import '@kit/stageshow.css'
import '../../.agents/skills/stageshow/examples/talky/talky.css'

const host = document.querySelector('[data-talky-stageshow]')
if (host) {
  createRoot(host).render(
    <StrictMode>
      <TalkyHero />
    </StrictMode>,
  )
}