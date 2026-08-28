export default function ProgressBar({ value, max = 100, color = 'primary', label }) {
  const pct = Math.min(100, (value / max) * 100)
  const colors = {
    primary: 'bg-primary-500', success: 'bg-success-500',
    warning: 'bg-warning-500', error: 'bg-error-500', accent: 'bg-accent-500',
  }
  return (
    <div className="w-full">
      {label && <div className="flex justify-between text-xs mb-1.5">
        <span className="text-ink-600 font-medium">{label}</span>
        <span className="text-ink-400">{Math.round(pct)}%</span>
      </div>}
      <div className="h-2 w-full bg-ink-100 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
