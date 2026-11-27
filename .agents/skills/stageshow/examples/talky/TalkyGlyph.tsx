export default function TalkyGlyph({ className, idle }: { className?: string; idle?: boolean }) {
  return (
    <span
      className={`tk-glyph${idle ? ' tk-glyph--idle' : ''}${className ? ` ${className}` : ''}`.trim()}
      aria-hidden="true"
    />
  )
}