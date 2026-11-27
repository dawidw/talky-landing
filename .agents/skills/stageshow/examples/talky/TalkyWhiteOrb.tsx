import { useId } from 'react'
import { TALKY_ORB_SQUIRCLE, TALKY_ORB_WAVE } from './talkyOrbPaths'

type Props = {
  size?: number
  variant?: 'glow' | 'flat'
  className?: string
}

/** App icon White orb — squircle + biała kula + fala #04210F (Figma 110:674). */
export default function TalkyWhiteOrb({ size = 16, variant = 'flat', className }: Props) {
  const uid = useId().replace(/:/g, '')

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 224 224"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {variant === 'glow' ? (
        <>
          <defs>
            <linearGradient id={`${uid}-sq`} x1="28" y1="18" x2="196" y2="206" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1B1B1D" />
              <stop offset="1" stopColor="#000000" />
            </linearGradient>
            <radialGradient
              id={`${uid}-hi`}
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(78 62) rotate(48) scale(170)"
            >
              <stop stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${uid}-ball`} x1="112" y1="40" x2="112" y2="184" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#D9DCDA" />
            </linearGradient>
          </defs>
          <path d={TALKY_ORB_SQUIRCLE} fill={`url(#${uid}-sq)`} />
          <path d={TALKY_ORB_SQUIRCLE} fill={`url(#${uid}-hi)`} />
          <circle cx="112" cy="112" r="72.1875" fill={`url(#${uid}-ball)`} />
        </>
      ) : (
        <>
          <path d={TALKY_ORB_SQUIRCLE} fill="#0C0C0D" />
          <circle cx="112" cy="112" r="72.1875" fill="#FFFFFF" />
        </>
      )}
      <path d={TALKY_ORB_WAVE} stroke="#04210F" strokeWidth="8.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d={TALKY_ORB_SQUIRCLE} stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="0.875" />
    </svg>
  )
}