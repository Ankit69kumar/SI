export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      {Icon && <div className="w-16 h-16 rounded-2xl bg-ink-100 flex items-center justify-center mb-4">
        <Icon size={28} className="text-ink-400" />
      </div>}
      <h3 className="text-lg font-semibold text-ink-800 mb-1">{title}</h3>
      {description && <p className="text-ink-400 max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  )
}
