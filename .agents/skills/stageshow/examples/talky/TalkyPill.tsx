import { Collapse, Text } from '../../kit'
import TalkyOrb from './TalkyOrb'

export type PillMode = 'idle' | 'meeting' | 'transcribing'

type Props = {
  panelOpen: boolean
  pill: PillMode
  timer: string
}

/** PROVISIONAL styling — dopasowanie 1:1 po PNG z talky-designs. */
export default function TalkyPill({ panelOpen, pill, timer }: Props) {
  return (
    <>
      <Collapse open={!panelOpen && pill === 'idle'}>
        <button
          type="button"
          className="tk-talky-pill"
          data-target="talky-pill"
          data-cursor="hand"
          aria-label="Talky"
        >
          <TalkyOrb sm />
          <span className="tk-talky-pill-dots" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </span>
        </button>
      </Collapse>

      <Collapse open={pill !== 'idle'}>
        <div className="tk-meeting-pill" data-pill={pill}>
          <span className="tk-pill-face" data-on={pill === 'meeting' || undefined}>
            <span className="tk-rec-dot" aria-hidden="true" />
            <Text className="tk-pill-label">Meeting</Text>
            <Text className="tk-pill-time">{timer}</Text>
            <span className="tk-pill-wave" aria-hidden="true">
              {[5, 9, 12, 8, 11, 7].map((h, i) => (
                <span key={i} style={{ ['--h' as string]: `${h}px` }} />
              ))}
            </span>
            <button type="button" className="tk-pill-stop" data-target="stop-meeting" data-cursor="hand" aria-label="Stop">
              <span />
            </button>
          </span>
          <span className="tk-pill-face" data-on={pill === 'transcribing' || undefined}>
            <Text className="tk-pill-label tk-pill-label--dim">Transcribing</Text>
            <span className="tk-pill-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </span>
        </div>
      </Collapse>
    </>
  )
}