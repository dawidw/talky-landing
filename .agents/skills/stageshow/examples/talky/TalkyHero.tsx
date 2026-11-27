import { Bar, Collapse, Kbd, Stage, Text, type Act } from '../../kit'
import './talky.css'

// Floating Talky pill opens the panel; Listen starts meeting transcript; summary saved locally.
// Not via the menu bar extra — the cursor clicks the idle pill, then Listen in the panel.

type Tab = 'transcript' | 'summary'
type Pill = 'idle' | 'meeting' | 'transcribing'

type S = {
  panel: boolean
  listenPick: boolean
  meeting: boolean
  lines: number
  tab: Tab
  saved: boolean
  pill: Pill
  timer: string
}

const initial: S = {
  panel: false,
  listenPick: false,
  meeting: false,
  lines: 0,
  tab: 'transcript',
  saved: false,
  pill: 'idle',
  timer: '0:00',
}

const REST = { wide: { x: 392, y: 248 }, compact: { x: 196, y: 230 } }

const POSTER: S = {
  panel: false,
  listenPick: false,
  meeting: false,
  lines: 3,
  tab: 'summary',
  saved: true,
  pill: 'idle',
  timer: '12:41',
}

const TRANSCRIPT = [
  { who: 'Me', color: 'me', at: '00:12', text: "Let's start with the launch checklist. Where are we on onboarding?" },
  { who: 'Speaker 1', color: 's1', at: '00:21', text: 'The permissions flow is done. We still need to test Accessibility on a fresh install.' },
  { who: 'Me', color: 'me', at: '00:48', text: 'Great. Then we ship the beta on Friday.' },
]

type PanelRow = {
  id: string
  title: string
  sub: string
  icon: 'mic' | 'wave' | 'people' | 'doc'
  target?: string
  keys?: readonly [string, string]
  sep?: boolean
}

const PANEL_ROWS: PanelRow[] = [
  { id: 'listen', title: 'Listen', sub: 'Dictate into the active field', icon: 'mic', target: 'listen-row', keys: ['⌃', '⇧'] },
  { id: 'memo', title: 'Voice memo', sub: 'Record a note to Scratchpad', icon: 'wave' },
  { id: 'meeting', title: 'Meeting', sub: 'Record with speaker labels', icon: 'people' },
  { id: 'scratch', title: 'Scratchpad', sub: 'Notes and meetings, searchable', icon: 'doc', sep: true },
]

async function script(a: Act<S>) {
  await a.wait(800)
  await a.move('talky-pill')
  await a.wait(260)
  await a.click('talky-pill')
  await a.set({ panel: true, listenPick: true })
  await a.wait(420)
  await a.move('listen-row')
  await a.wait(280)
  await a.click('listen-row')
  await a.set({ panel: false, listenPick: false, meeting: true, pill: 'meeting', timer: '0:03' })
  await a.wait(500)
  const ticks = ['0:08', '0:14', '0:21', '0:28']
  for (const t of ticks) {
    a.put({ timer: t })
    await a.wait(380)
  }
  for (let i = 1; i <= 3; i++) {
    a.put({ lines: i })
    await a.wait(i === 1 ? 780 : 680)
  }
  await a.wait(450)
  await a.move('stop-meeting')
  await a.click()
  await a.set({ meeting: false, pill: 'transcribing' })
  await a.wait(850)
  await a.set({ pill: 'idle', tab: 'summary' })
  a.mark('summary')
  await a.wait(550)
  await a.set({ saved: true })
  a.mark('payoff')
  await a.wait(2200)
  await a.set({ ...initial })
  await a.move('rest')
  await a.wait(450)
}

function Orb({ className, sm }: { className?: string; sm?: boolean }) {
  return (
    <span className={`tk-orb${sm ? ' tk-orb--sm' : ''}${className ? ` ${className}` : ''}`.trim()} aria-hidden="true">
      <span className="tk-orb-core" />
    </span>
  )
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
          <div className="tk-menubar">
            <span className="tk-menubar-left">
              <Text className="tk-menubar-app">Finder</Text>
              <Text className="tk-menubar-app">File</Text>
              <Text className="tk-menubar-app">Edit</Text>
              <Text className="tk-menubar-app">View</Text>
            </span>
            <span className="tk-menubar-right">
              <Bar w={14} h={10} r={3} tone={3} />
              <Bar w={14} h={10} r={3} tone={3} />
              <Text className="tk-menubar-clock">Thu 9:41</Text>
              <span className="tk-menubar-talky" aria-hidden="true">
                <Orb sm />
              </span>
            </span>
          </div>

          <Collapse open={!s.panel && s.pill === 'idle'}>
            <button
              type="button"
              className="tk-talky-pill"
              data-target="talky-pill"
              data-cursor="hand"
              aria-label="Talky"
            >
              <Orb sm />
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

          <Collapse open={s.pill !== 'idle'}>
            <div className="tk-meeting-pill" data-pill={s.pill}>
              <span className="tk-pill-face" data-on={s.pill === 'meeting' || undefined}>
                <span className="tk-rec-dot" aria-hidden="true" />
                <Text className="tk-pill-label">Meeting</Text>
                <Text className="tk-pill-time">{s.timer}</Text>
                <span className="tk-pill-wave" aria-hidden="true">
                  {[5, 9, 12, 8, 11, 7].map((h, i) => (
                    <span key={i} style={{ ['--h' as string]: `${h}px` }} />
                  ))}
                </span>
                <button type="button" className="tk-pill-stop" data-target="stop-meeting" data-cursor="hand" aria-label="Stop">
                  <span />
                </button>
              </span>
              <span className="tk-pill-face" data-on={s.pill === 'transcribing' || undefined}>
                <Text className="tk-pill-label tk-pill-label--dim">Transcribing</Text>
                <span className="tk-pill-dots" aria-hidden="true">
                  <span /><span /><span />
                </span>
              </span>
            </div>
          </Collapse>

          <div className="tk-panel" data-show={s.panel || undefined} data-target="talky-panel">
            <header className="tk-panel-head">
              <span className="tk-panel-brand">
                <Orb sm />
                <Text className="tk-panel-name">Talky</Text>
              </span>
              <Text className="tk-panel-ready">Ready</Text>
            </header>
            <div className="tk-panel-rows">
              {PANEL_ROWS.map((row) => {
                const inner = (
                  <>
                    <span className={`tk-panel-icon tk-panel-icon--${row.icon}`} aria-hidden="true" />
                    <span className="tk-panel-copy">
                      <Text className="tk-panel-title">{row.title}</Text>
                      <Text className="tk-panel-sub">{row.sub}</Text>
                    </span>
                    {row.keys && (
                      <span className="tk-panel-keys">
                        <Kbd keys={[...row.keys]} plain />
                      </span>
                    )}
                  </>
                )
                if (row.target) {
                  return (
                    <button
                      key={row.id}
                      type="button"
                      className="tk-panel-row"
                      data-target={row.target}
                      data-cursor="hand"
                      data-pick={s.listenPick || undefined}
                    >
                      {inner}
                    </button>
                  )
                }
                return (
                  <div key={row.id} className={`tk-panel-row tk-panel-row--static${row.sep ? ' tk-panel-row--sep' : ''}`}>
                    {inner}
                  </div>
                )
              })}
            </div>
            <footer className="tk-panel-foot" data-crop>
              <Bar w={layout === 'compact' ? 200 : 240} h={6} tone={2} />
            </footer>
          </div>

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
                    <Text className="tk-side-title">Product sync with design</Text>
                    <Text className="tk-side-time">9:41</Text>
                    <Text className="tk-side-snippet">Me: Let's start with the launch checklist.</Text>
                    <Text className="tk-side-meta">Meeting, 3 speakers, 42 min</Text>
                  </div>
                  {[['Roadmap thoughts', '9:12'], ['Reply to Anna', 'Yesterday']].map(([t, when]) => (
                    <div key={t} className="tk-side-item tk-side-item--faint">
                      <Text className="tk-side-title">{t}</Text>
                      <Text className="tk-side-time">{when}</Text>
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
                        ? 'Today, 9:41 | Meeting | 42 min'
                        : 'Today, 9:41 | Meeting | 42 min | Me, Speaker 1, Speaker 2'}
                    </Text>
                  </div>
                  <div className="tk-seg">
                    <span data-on={s.tab === 'transcript' || undefined}>Transcript</span>
                    <span data-on={s.tab === 'summary' || undefined}>Summary</span>
                  </div>
                  <Bar w={layout === 'compact' ? 72 : 92} h={22} r={11} tone={4} />
                </div>

                <Collapse open={s.tab === 'transcript'}>
                  <div className="tk-transcript">
                    {TRANSCRIPT.map((row, i) => (
                      <Collapse key={row.at} open={s.lines > i}>
                        <div className="tk-tline">
                          <span className="tk-tline-head">
                            <Text className={`tk-speaker tk-speaker--${row.color}`}>{row.who}</Text>
                            <Text className="tk-ts">{row.at}</Text>
                          </span>
                          <Text className="tk-line">{row.text}</Text>
                        </div>
                      </Collapse>
                    ))}
                    {s.lines < 3 && (
                      <div className="tk-tline tk-tline--sk">
                        <Bar w={48} h={6} tone={3} />
                        <Bar w={layout === 'compact' ? 180 : 280} h={7} tone={2} />
                      </div>
                    )}
                  </div>
                </Collapse>

                <Collapse open={s.tab === 'summary'}>
                  <div className="tk-summary">
                    <Text className="tk-sum-kicker">Summary</Text>
                    <ul className="tk-sum-list">
                      <li>The launch checklist was reviewed and the permissions flow is done.</li>
                      <li>Still to test: Accessibility on a fresh install and the menu bar states.</li>
                      <li>Decision: ship the beta on Friday.</li>
                    </ul>
                    <Text className="tk-sum-note">Generated on this Mac with Apple Intelligence. Nothing leaves your computer.</Text>
                  </div>
                </Collapse>

                <Collapse open={s.saved}>
                  <p className="tk-save-banner" data-target="save-banner">
                    Saved to ~/Documents/Talky/Meetings
                  </p>
                </Collapse>
              </main>
            </div>
          </div>

          <span data-target="rest" style={{ position: 'absolute', ...REST[layout] }} />
        </>
      )}
    </Stage>
  )
}