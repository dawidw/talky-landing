import { Bar, Collapse, Stage, Text, type Act } from '../../kit'
import TalkyGlyph from './TalkyGlyph'
import TalkyPanel from './TalkyPanel'
import TalkyPill, { type PillMode } from './TalkyPill'
import './talky.css'

// Figma flow: desktop-idle → panel → Listen → listening → processing → copied → (optional) meeting Scratchpad.

type Tab = 'transcript' | 'summary'
type Pill = PillMode

type S = {
  panel: boolean
  listenPick: boolean
  showWin: boolean
  lines: number
  tab: Tab
  pill: Pill
  timer: string
}

const initial: S = {
  panel: false,
  listenPick: false,
  showWin: false,
  lines: 0,
  tab: 'transcript',
  pill: 'idle',
  timer: '0:00',
}

const REST = { wide: { x: 392, y: 200 }, compact: { x: 196, y: 188 } }

const POSTER: S = {
  panel: false,
  listenPick: false,
  showWin: true,
  lines: 3,
  tab: 'summary',
  pill: 'idle',
  timer: '0:00',
}

const TRANSCRIPT = [
  { who: 'Me', color: 'me', at: '0:12', text: "Let's start with the launch checklist. Where are we on onboarding?" },
  { who: 'Speaker 1', color: 's1', at: '0:21', text: 'The permissions flow is done. We still need to test Accessibility on a fresh install.' },
  { who: 'Speaker 2', color: 's2', at: '0:35', text: 'I can take the fresh-install pass this afternoon.' },
]

async function script(a: Act<S>) {
  await a.wait(800)
  await a.move('talky-pill')
  await a.wait(260)
  await a.click('talky-pill')
  await a.set({ panel: true, listenPick: true })
  a.mark('panel')
  await a.wait(420)
  await a.move('listen-row')
  await a.wait(280)
  await a.click('listen-row')
  await a.set({ panel: false, listenPick: false, pill: 'listening-speaking', timer: '0:03' })
  a.mark('listening')
  const listenTicks = ['0:04', '0:05', '0:06', '0:07']
  for (let i = 0; i < listenTicks.length; i++) {
    await a.wait(340)
    await a.set({
      pill: i % 2 === 0 ? 'listening-silent' : 'listening-speaking',
      timer: listenTicks[i],
    })
  }
  await a.wait(380)
  await a.set({ pill: 'processing' })
  a.mark('processing')
  await a.wait(1100)
  await a.set({ pill: 'copied' })
  a.mark('copied')
  await a.wait(1400)

  await a.set({
    showWin: true,
    pill: 'meeting-speaking',
    timer: '0:03',
    tab: 'transcript',
    lines: 0,
  })
  a.mark('meeting')
  const meetTicks = ['0:08', '0:12', '0:16']
  for (let i = 0; i < meetTicks.length; i++) {
    await a.wait(360)
    await a.set({
      pill: i % 2 === 0 ? 'meeting-silent' : 'meeting-speaking',
      timer: meetTicks[i],
    })
  }
  for (let i = 1; i <= 3; i++) {
    await a.wait(i === 1 ? 520 : 480)
    a.put({ lines: i })
  }
  await a.wait(400)
  await a.move('stop-meeting')
  await a.click()
  await a.set({ pill: 'processing' })
  await a.wait(900)
  await a.set({ pill: 'idle', tab: 'summary' })
  a.mark('summary')
  await a.wait(2200)
  await a.set({ ...initial })
  await a.move('rest')
  await a.wait(450)
}

export default function TalkyHero() {
  return (
    <Stage<S>
      width={720}
      height={400}
      compact={{ below: 560, width: 358, height: 360 }}
      theme="dark"
      greys="cool"
      accent="#0a84ff"
      fidelity="standard"
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: REST, ripple: true }}
      className="tk"
    >
      {(s, _rect, layout) => (
        <>
          <div className="tk-wallpaper" />

          <Collapse open={s.showWin}>
            <div className="tk-win" data-layout={layout}>
              <header className="tk-win-chrome">
                <span className="tk-lights" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <Text className="tk-win-title">Scratchpad</Text>
                <span className="tk-win-search">
                  <Bar w={layout === 'compact' ? 72 : 88} h={6} tone={3} />
                </span>
              </header>
              <div className="tk-win-body">
                {layout === 'wide' && (
                  <aside className="tk-side" data-crop>
                    <div className="tk-side-item tk-side-item--on">
                      <div className="tk-side-row">
                        <Text className="tk-side-title">Product sync with design</Text>
                        <Text className="tk-side-time">9:41 AM</Text>
                      </div>
                      <Text className="tk-side-snippet">Me: Let's start with the launch checklist. Where a…</Text>
                      <Text className="tk-side-meta">9:41 AM | Meeting | 42 min</Text>
                    </div>
                    {[['Customer call, onboarding', 'Yesterday']].map(([t, when]) => (
                      <div key={t} className="tk-side-item tk-side-item--faint">
                        <div className="tk-side-row">
                          <Text className="tk-side-title">{t}</Text>
                          <Text className="tk-side-time">{when}</Text>
                        </div>
                        <Bar w={108} h={6} tone={2} />
                      </div>
                    ))}
                  </aside>
                )}

                <main className="tk-main">
                  <div className="tk-main-head">
                    <div className="tk-main-titles">
                      <Text className="tk-meet-title">Product sync with design</Text>
                      <Text className="tk-meet-meta">
                        {layout === 'compact'
                          ? 'Nov 27, 2026 at 9:41 AM | Meeting | 42 min'
                          : 'Nov 27, 2026 at 9:41 AM | Meeting | 42 min | Me, Speaker 1, Speaker 2'}
                      </Text>
                    </div>
                    <div className="tk-main-actions">
                      <div className="tk-seg">
                        <span data-on={s.tab === 'summary' || undefined}>Summary</span>
                        <span data-on={s.tab === 'transcript' || undefined}>Transcript</span>
                      </div>
                      <Bar w={layout === 'compact' ? 72 : 92} h={22} r={11} tone={4} />
                    </div>
                  </div>

                  <Collapse open={s.tab === 'transcript'}>
                    <div className="tk-transcript">
                      {TRANSCRIPT.map((row, i) => (
                        <Collapse key={row.at} open={s.lines > i}>
                          <div className="tk-tline">
                            <span className="tk-tline-cue">
                              <Text className={`tk-speaker tk-speaker--${row.color}`}>{row.who}</Text>
                              <Text className="tk-ts">{row.at}</Text>
                            </span>
                            <Text className="tk-line">{row.text}</Text>
                          </div>
                        </Collapse>
                      ))}
                    </div>
                  </Collapse>

                  <Collapse open={s.tab === 'summary'}>
                    <div className="tk-summary">
                      <Text className="tk-sum-h2">Summary</Text>
                      <ul className="tk-sum-list">
                        <li>The launch checklist was reviewed and the permissions flow is done.</li>
                        <li>Accessibility still needs a fresh-install test.</li>
                      </ul>
                      <Text className="tk-sum-h2">Decisions</Text>
                      <ul className="tk-sum-list">
                        <li>Ship the beta on Friday.</li>
                      </ul>
                    </div>
                  </Collapse>
                </main>
              </div>
            </div>
          </Collapse>

          <div className="tk-menubar">
            <span className="tk-menubar-left">
              <Text className="tk-menubar-app">Finder</Text>
              <Text className="tk-menubar-app tk-menubar-item">File</Text>
              <Text className="tk-menubar-app tk-menubar-item">Edit</Text>
              <Text className="tk-menubar-app tk-menubar-item">View</Text>
            </span>
            <span className="tk-menubar-right">
              <Text className="tk-menubar-clock">Thu 9:41</Text>
              <span className="tk-menubar-talky" aria-hidden="true">
                <TalkyGlyph idle />
              </span>
            </span>
          </div>

          <Collapse open={s.panel}>
            <div className="tk-panel-scrim" aria-hidden="true" />
          </Collapse>

          <TalkyPill panelOpen={s.panel} pill={s.pill} timer={s.timer} />
          <TalkyPanel open={s.panel} listenPick={s.listenPick} layout={layout} />

          <span data-target="rest" style={{ position: 'absolute', ...REST[layout] }} />
        </>
      )}
    </Stage>
  )
}