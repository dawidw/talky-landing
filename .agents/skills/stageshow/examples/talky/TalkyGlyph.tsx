/** Figma menubar / idle pill squiggle (not the green app icon). */
export default function TalkyGlyph({ className, wide }: { className?: string; wide?: boolean }) {
  return (
    <span
      className={`tk-glyph${wide ? ' tk-glyph--wide' : ''}${className ? ` ${className}` : ''}`.trim()}
      aria-hidden="true"
    />
  )
}