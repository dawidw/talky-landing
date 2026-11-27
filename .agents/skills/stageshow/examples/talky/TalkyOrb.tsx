/** White orb — wymiary/kolory z Figmy po sync (talky-designs). */
export default function TalkyOrb({ className, sm }: { className?: string; sm?: boolean }) {
  return (
    <span className={`tk-orb${sm ? ' tk-orb--sm' : ''}${className ? ` ${className}` : ''}`.trim()} aria-hidden="true">
      <span className="tk-orb-core" />
    </span>
  )
}