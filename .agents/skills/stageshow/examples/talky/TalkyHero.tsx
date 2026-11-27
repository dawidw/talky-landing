import { Circle, Square } from 'lucide-react'
import { Bar, Collapse, Stage, Text, Toast, type Act } from '../../kit'
import './talky.css'

// Talky meeting capture: menu bar, live transcript with speakers, summary saved locally.
// Story: open Talky menu, record meeting, transcript grows, summary appears, save toast.

type Pill = 'idle' | 'recording' | 'transcribing'

type S = {
  menu: boolean
  recording: boolean
  lines: number
  summary: boolean
  toast: boolean
  pill: Pill
  timer: number
}

const initial: S = {
  menu: false,
  recording: false,
  lines: 0,
  summary: false,
  toast: false,
  pill: 'idle',
  timer: 0,
}

const REST = { wide: { x: 620, y: 298 }, compact: { x: 296, y: 292 } }

const POSTER: S = {
  menu: false,
  recording: false,
  lines: 3,
  summary: true,
  toast: true,
  pill: 'idle',
  timer: 42,
}

const TRANSCRIPT = [
  { who: 'Me', text: "Let's ship the beta on Friday." },
  { who: 'Speaker 2', text: 'I will sync the roadmap after standup.' },
  { who: 'Me', text: 'Capture decisions in Talky for the team.' },
]

async function script(a: Act<S>) {
  await a.wait(650)
  await a.move('talky-icon')
  await a.wait(220)
  await a.click()
  await a.set({ menu: true })
  await a.wait(380)
  await a.move('record-meeting')
  await a.click()
  await a.set({ menu: false, recording: true, pill: 'recording', timer: 0 })
  await a.wait(450)
  for (let t = 1; t <= 4; t++) {
    a.put({ timer: t * 7 })
    await a.wait(400)
  }
  for (let i = 1; i <= 3; i++) {
    a.put({ lines: i })
    await a.wait(i === 1 ? 850 : 720)
  }
  await a.wait(500)
  await a.move('talky-icon')
  await a.click()
  await a.set({ menu: false, recording: false, pill: 'transcribing' })
  await a.wait(900)
  await a.set({ pill: 'idle', summary: true })
  a.mark('summary')
  await a.wait(650)
  await a.set({ toast: true })
  a.mark('payoff')
  await a.wait(2400)
  await a.set({ ...initial })
  await a.move('rest')
  await a.wait(500)
}

export default function TalkyHero() {
  return (
    <Stage<S>
      width={720}
      height={340}
      compact={{ below: 560, width: 358, height: 320 }}
      theme="dark"
      greys="cool"
      accent="#30d158"
      fidelity="standard"
      fill
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: REST, ripple: true }}
      className="tk"
    >
      {(s, _rect, layout) => (
        <>
          <div className="tk-scene" data-layout={layout}>
            <div className="tk-menubar">
              <span className="tk-menubar-left">
                <span className="tk-apple" aria-hidden="true" />
                <Text className="tk-menu-item">Finder</Text>
                <Text className="tk-menu-item">File</Text>
                <Bar w={36} h={6} tone={3} />
              </span>
              <span className="tk-menubar-right">
                <Bar w={12} h={10} r={3} tone={3} />
                <Bar w={12} h={10} r={3} tone={3} />
                <Bar w={44} h={6} tone={4} />
                <span className="tk-menubar-talky" data-target="talky-icon" data-cursor="hand" data-open={s.menu || undefined}>
                  <img src="/assets/talky-icon.svg" width={15} height={15} alt="" />
                </span>
              </span>
            </div>

            <div className="tk-scratchpad" data-target="scratchpad">
              <header className="tk-scratch-head">
                <Text className="tk-scratch-title">Product sync</Text>
                <span className="tk-scratch-meta">
                  <Collapse open={s.recording}>
                    <Text className="tk-live">Live transcript</Text>
                  </Collapse>
                  <Collapse open={s.summary && !s.recording}>
                    <Text className="tk-live tk-live--done">Summary ready</Text>
                  </Collapse>
                  {!s.recording && !s.summary && <Bar w={72} h={6} tone={3} />}
                </span>
              </header>

              <div className="tk-transcript">
                {TRANSCRIPT.map((row, i) => (
                  <Collapse key={row.who + i} open={s.lines > i}>
                    <div className="tk-trow">
                      <Text className="tk-who">{row.who}</Text>
                      <Text className="tk-say">{row.text}</Text>
                    </div>
                  </Collapse>
                ))}
                {s.lines < 3 && (
                  <div className="tk-trow tk-trow--sk">
                    <Bar w={28} h={6} tone={3} />
                    <Bar w={layout === 'compact' ? 210 : 320} h={7} tone={2} />
                  </div>
                )}
              </div>

              <Collapse open={s.summary}>
                <div className="tk-summary" data-crop>
                  <Text className="tk-sum-label">Summary</Text>
                  <div className="tk-sum-body">
                    <Text className="tk-sum-line">
                      <strong>Decisions:</strong> Beta ships Friday.
                    </Text>
                    <div className="tk-sum-bars">
                      <Bar w={52} h={6} tone={3} />
                      <Bar w={layout === 'compact' ? 140 : 200} h={7} tone={2} />
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>

            <div className="tk-pill" data-pill={s.pill}>
              <span className="tk-pill-face" data-on={s.pill === 'idle' || undefined}>
                <img className="tk-pill-glyph" src="/assets/talky-wave-glyph.svg" width={26} height={11} alt="" />
              </span>
              <span className="tk-pill-face" data-on={s.pill === 'recording' || undefined}>
                <Circle className="tk-pill-rec" size={8} fill="currentColor" strokeWidth={0} />
                <Text className="tk-pill-label">Recording</Text>
                <Text className="tk-pill-time">{s.timer}s</Text>
              </span>
              <span className="tk-pill-face" data-on={s.pill === 'transcribing' || undefined}>
                <Square className="tk-pill-spin" size={10} strokeWidth={2} />
                <Text className="tk-pill-label">Transcribing</Text>
              </span>
            </div>
          </div>

          <div className="tk-menu" data-show={s.menu || undefined}>
            <div className="tk-menu-panel">
              <button type="button" className="tk-menu-row" data-target="record-meeting" data-cursor="hand">
                <Text>Record meeting</Text>
              </button>
              <div className="tk-menu-row tk-menu-row--faint">
                <Bar w={98} h={7} tone={3} />
              </div>
              <div className="tk-menu-row tk-menu-row--faint">
                <Bar w={76} h={7} tone={3} />
              </div>
              <div className="tk-menu-row tk-menu-row--faint">
                <Bar w={88} h={7} tone={3} />
              </div>
            </div>
          </div>

          <Toast show={s.toast} className="tk-toast">
            Saved to Talky/Meetings
          </Toast>

          <span data-target="rest" style={{ position: 'absolute', ...REST[layout] }} />
        </>
      )}
    </Stage>
  )
}