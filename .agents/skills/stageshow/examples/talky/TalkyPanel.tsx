import { Bar, Kbd, Text } from '../../kit'
import TalkyOrb from './TalkyOrb'

export type PanelRow = {
  id: string
  title: string
  sub: string
  icon: 'mic' | 'wave' | 'people' | 'doc'
  target?: string
  keys?: readonly [string, string]
  sep?: boolean
}

export const PANEL_ROWS: PanelRow[] = [
  { id: 'listen', title: 'Listen', sub: 'Dictate into the active field', icon: 'mic', target: 'listen-row', keys: ['⌃', '⇧'] },
  { id: 'memo', title: 'Voice memo', sub: 'Record a note to Scratchpad', icon: 'wave' },
  { id: 'meeting', title: 'Meeting', sub: 'Record with speaker labels', icon: 'people' },
  { id: 'scratch', title: 'Scratchpad', sub: 'Notes and meetings, searchable', icon: 'doc', sep: true },
]

type Props = {
  open: boolean
  listenPick: boolean
  layout: 'wide' | 'compact'
}

/** PROVISIONAL styling — dopasowanie 1:1 po PNG z talky-designs. */
export default function TalkyPanel({ open, listenPick, layout }: Props) {
  return (
    <div className="tk-panel" data-show={open || undefined} data-target="talky-panel">
      <header className="tk-panel-head">
        <span className="tk-panel-brand">
          <TalkyOrb sm />
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
                data-pick={listenPick || undefined}
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
  )
}