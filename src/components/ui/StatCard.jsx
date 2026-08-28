export default function StatCard({ icon: Icon, label, value, trend, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary-100 text-primary-600', success: 'bg-success-100 text-success-600',
    warning: 'bg-warning-100 text-warning-600', error: 'bg-error-100 text-error-600',
    accent: 'bg-accent-100 text-accent-600', ink: 'bg-ink-100 text-ink-600',
  }
  return (
    <div className="card p-5 animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-400 mb-1">{label}</p>
          <p className="text-2xl font-bold text-ink-900">{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[color]}`}>
          {Icon && <Icon size={22} />}
        </div>
      </div>
      {trend && <p className="text-xs text-success-600 mt-2 font-medium">{trend}</p>}
    </div>
  )
}
