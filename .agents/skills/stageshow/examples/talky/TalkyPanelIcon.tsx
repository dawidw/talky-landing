export type PanelIconKind = 'mic' | 'wave' | 'people' | 'doc'

const stroke = '#F5F5F7'

type Props = { kind: PanelIconKind }

/** Ikony wierszy panelu — stroke 1.25–1.4, dopasowane do panel-expanded.png. */
export default function TalkyPanelIcon({ kind }: Props) {
  const common = {
    className: 'tk-panel-icon-svg',
    viewBox: '0 0 18 18',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true as const,
  }

  switch (kind) {
    case 'mic':
      return (
        <svg {...common}>
          <rect x="7.25" y="3.5" width="3.5" height="7" rx="1.75" fill={stroke} />
          <path d="M5.75 9.25a3.25 3.25 0 0 0 6.5 0" stroke={stroke} strokeWidth="1.35" strokeLinecap="round" />
          <path d="M9 12.25v2.25" stroke={stroke} strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      )
    case 'wave':
      return (
        <svg {...common}>
          <rect x="2" y="7.5" width="2.25" height="7.75" rx="1.125" fill={stroke} />
          <rect x="5.75" y="4.25" width="2.25" height="11" rx="1.125" fill={stroke} />
          <rect x="9.5" y="6" width="2.25" height="9.25" rx="1.125" fill={stroke} />
          <rect x="13.25" y="7.75" width="2.25" height="7.5" rx="1.125" fill={stroke} />
        </svg>
      )
    case 'people':
      return (
        <svg {...common}>
          <circle cx="6.25" cy="6.75" r="2.35" stroke={stroke} strokeWidth="1.3" />
          <path
            d="M2.75 14.25c0-2.35 1.55-3.75 3.5-3.75s3.5 1.4 3.5 3.75"
            stroke={stroke}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <circle cx="12.35" cy="7.35" r="2" stroke={stroke} strokeWidth="1.3" />
          <path
            d="M9.75 14.25c0-1.85 1.15-2.95 2.6-2.95s2.6 1.1 2.6 2.95"
            stroke={stroke}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'doc':
      return (
        <svg {...common}>
          <path
            d="M5.25 3.25h5.35L14.25 6.9V14.75H5.25V3.25z"
            stroke={stroke}
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M10.6 3.25v3.65h3.65" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M7.25 9.25h5.25M7.25 11.5h3.5" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )
  }
}