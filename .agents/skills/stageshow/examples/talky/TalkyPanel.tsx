import { Kbd, Text } from '../../kit'
import TalkyGlyph from './TalkyGlyph'
import TalkyPanelIcon, { type PanelIconKind } from './TalkyPanelIcon'

export type PanelRow = {
  id: string
  title: string
  sub: string
  icon: PanelIconKind
  target?: string
  keys?: readonly [string, string]
  afterDivider?: boolean
}

export const PANEL_ROWS: PanelRow[] = [
  {
    id: 'listen',
    title: 'Listen',
    sub: 'Dictate into the active field',
    icon: 'mic',
    target: 'listen-row',
    keys: ['⌃', '⇧'],
  },
  { id: 'memo', title: 'Voice memo', sub: 'Record a note to Scratchpad', icon: 'wave' },
  { id: 'meeting', title: 'Meeting', sub: 'Record with speaker labels', icon: 'people' },
  {
    id: 'scratch',
    title: 'Scratchpad',
    sub: 'Notes and meetings, searchable',
    icon: 'doc',
    afterDivider: true,
  },
]

type Props = {
  open: boolean
  listenPick: boolean
  layout: 'wide' | 'compact'
}

export default function TalkyPanel({ open, listenPick, layout }: Props) {
  const footTight = layout === 'compact'

  const renderRow = (row: PanelRow) => {
    const inner = (
      <>
        <span className="tk-panel-icon" aria-hidden="true">
          <TalkyPanelIcon kind={row.icon} />
        </span>
        <span className="tk-panel-copy">
          <Text className="tk-panel-title">{row.title}</Text>
          <Text className="tk-panel-sub">{row.sub}</Text>
        </span>
        {row.keys && (
          <span className="tk-panel-keys">
            <Kbd keys={[...row.keys]} className="tk-panel-keys-kbd" />
          </span>
        )}
      </>
    )

    const rowEl = row.target ? (
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
    ) : (
      <div key={row.id} className="tk-panel-row tk-panel-row--static">
        {inner}
      </div>
    )

    if (!row.afterDivider) return rowEl

    return (
      <div key={row.id} className="tk-panel-divider-block">
        <div className="tk-panel-divider" aria-hidden="true" />
        {rowEl}
      </div>
    )
  }

  return (
    <div className="tk-panel" data-show={open || undefined} data-target="talky-panel">
      <header className="tk-panel-head">
        <span className="tk-panel-brand">
          <TalkyGlyph />
          <Text className="tk-panel-name">Talky</Text>
        </span>
        <Text className="tk-panel-ready">Ready</Text>
      </header>
      <div className="tk-panel-rows">{PANEL_ROWS.map(renderRow)}</div>
      <footer className={`tk-panel-foot${footTight ? ' tk-panel-foot--tight' : ''}`} data-crop>
        <div className="tk-panel-shortcuts">
          <span className="tk-panel-shortcut">
            <Kbd keys={['⌃', '⌥', 'P']} className="tk-panel-hint-kbd" />{' '}
            <Text className="tk-panel-shortcut-label">panel</Text>
          </span>
          <span className="tk-panel-shortcut">
            <Kbd keys={['⌃', '⇧']} className="tk-panel-hint-kbd" />{' '}
            <Text className="tk-panel-shortcut-label">talk</Text>
          </span>
          <span className="tk-panel-shortcut">
            <Kbd keys={['↑', '↓']} className="tk-panel-hint-kbd" />{' '}
            <Text className="tk-panel-shortcut-label">move</Text>
          </span>
          <span className="tk-panel-shortcut">
            <Kbd keys={['↵']} className="tk-panel-hint-kbd" />{' '}
            <Text className="tk-panel-shortcut-label">select</Text>
          </span>
          <span className="tk-panel-shortcut">
            <Kbd keys={['esc']} className="tk-panel-hint-kbd" />{' '}
            <Text className="tk-panel-shortcut-label">close</Text>
          </span>
        </div>
      </footer>
    </div>
  )
}