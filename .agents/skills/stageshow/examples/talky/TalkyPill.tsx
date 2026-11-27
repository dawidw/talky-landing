import { Collapse, Text } from '../../kit'
import TalkyGlyph from './TalkyGlyph'

export type PillMode =
  | 'idle'
  | 'listening-speaking'
  | 'listening-silent'
  | 'meeting-speaking'
  | 'meeting-silent'
  | 'processing'
  | 'copied'

const SPEAK_H = [7.9, 9.4, 10.9, 11.5, 10.6, 8.7]
const SILENT_H = [4.9, 5.3, 5.7, 5.8, 5.6, 5.1]

function isListen(p: PillMode) {
  return p === 'listening-speaking' || p === 'listening-silent'
}
function isMeeting(p: PillMode) {
  return p === 'meeting-speaking' || p === 'meeting-silent'
}
function isRecording(p: PillMode) {
  return isListen(p) || isMeeting(p)
}

type Props = {
  panelOpen: boolean
  pill: PillMode
  timer: string
}

export default function TalkyPill({ panelOpen, pill, timer }: Props) {
  const speaking = pill === 'listening-speaking' || pill === 'meeting-speaking'
  const label = isListen(pill) ? 'Listening' : isMeeting(pill) ? 'Meeting' : ''
  const bars = speaking ? SPEAK_H : SILENT_H

  return (
    <>
      <Collapse open={pill === 'idle' && !panelOpen}>
        <button
          type="button"
          className="tk-talky-pill tk-talky-pill--idle"
          data-target="talky-pill"
          data-cursor="hand"
          aria-label="Talky"
        >
          <TalkyGlyph idle />
        </button>
      </Collapse>

      <Collapse open={isRecording(pill)}>
        <div className="tk-rec-pill" data-mode={isListen(pill) ? 'listen' : 'meeting'}>
          <span className="tk-rec-dot" aria-hidden="true" />
          <Text className="tk-pill-label">{label}</Text>
          <Text className="tk-pill-time">{timer}</Text>
          <span className={`tk-pill-wave${speaking ? '' : ' tk-pill-wave--silent'}`} aria-hidden="true">
            {bars.map((h, i) => (
              <span key={i} className="tk-pill-wave-bar" style={{ height: `${h}px` }} />
            ))}
          </span>
          <button type="button" className="tk-pill-stop" data-target="stop-meeting" data-cursor="hand" aria-label="Stop">
            <span />
          </button>
        </div>
      </Collapse>

      <Collapse open={pill === 'processing'}>
        <div className="tk-rec-pill tk-rec-pill--processing">
          <span className="tk-pill-spinner" aria-hidden="true" />
          <Text className="tk-pill-label">Transcribing…</Text>
        </div>
      </Collapse>

      <Collapse open={pill === 'copied'}>
        <div className="tk-rec-pill tk-rec-pill--status">
          <span className="tk-status-dot" aria-hidden="true" />
          <Text className="tk-pill-label tk-pill-label--status">Copied</Text>
        </div>
      </Collapse>
    </>
  )
}