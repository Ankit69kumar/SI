import { Star } from 'lucide-react'

export default function Rating({ value, size = 16, showValue = false, count = null }) {
  return (
    <div className="inline-flex items-center gap-1">
      <div className="inline-flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= Math.round(value)
              ? 'fill-accent-400 text-accent-400'
              : 'fill-ink-100 text-ink-200'}
          />
        ))}
      </div>
      {showValue && <span className="text-sm font-semibold text-ink-800">{value.toFixed(1)}</span>}
      {count !== null && <span className="text-sm text-ink-400">({count})</span>}
    </div>
  )
}
