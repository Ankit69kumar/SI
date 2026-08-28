const VARIANTS = {
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  error: 'bg-error-100 text-error-700',
  accent: 'bg-accent-100 text-accent-700',
  ink: 'bg-ink-100 text-ink-600',
  green: 'bg-success-100 text-success-700',
}

const STATUS_MAP = {
  pending: 'warning', accepted: 'primary', in_progress: 'primary',
  completed: 'success', cancelled: 'error', active: 'success',
  suspended: 'error', open: 'warning', resolved: 'success',
}

export default function Badge({ children, variant = 'ink', status, className = '' }) {
  const v = status ? STATUS_MAP[status] || 'ink' : variant
  return <span className={`badge ${VARIANTS[v] || VARIANTS.ink} ${className}`}>{children}</span>
}

export function StatusBadge({ status }) {
  const label = status?.replace('_', ' ')
  return (
    <Badge status={status} className="capitalize">
      {label}
    </Badge>
  )
}
