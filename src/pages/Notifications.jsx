import { Bell, CheckCheck, CheckCircle2, Star, Briefcase, Calendar, X } from 'lucide-react'
import { useNotifications } from '../context/NotificationContext'

const ICON_MAP = {
  new_request: { icon: Briefcase, color: 'primary' },
  request_accepted: { icon: CheckCircle2, color: 'success' },
  completed: { icon: CheckCircle2, color: 'success' },
  review: { icon: Star, color: 'accent' },
  upcoming: { icon: Calendar, color: 'primary' },
  rejected: { icon: X, color: 'error' },
}

const colorMap = {
  primary: 'bg-primary-100 text-primary-600', success: 'bg-success-100 text-success-600',
  accent: 'bg-accent-100 text-accent-600', error: 'bg-error-100 text-error-600',
}

export default function Notifications() {
  const { notifications, markRead, markAllRead, unreadCount } = useNotifications()

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink-900 mb-1">Notifications</h2>
          <p className="text-ink-400">{unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}</p>
        </div>
        {unreadCount > 0 && <button onClick={markAllRead} className="btn-secondary text-sm"><CheckCheck size={16} /> Mark all read</button>}
      </div>

      {notifications.length === 0 ? (
        <div className="card py-16 text-center">
          <Bell size={28} className="text-ink-300 mx-auto mb-3" />
          <p className="text-ink-400">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map(n => {
            const cfg = ICON_MAP[n.type] || { icon: Bell, color: 'primary' }
            const Icon = cfg.icon
            return (
              <button key={n.id} onClick={() => markRead(n.id)}
                className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition ${n.read ? 'bg-white border-ink-100' : 'bg-primary-50/50 border-primary-100'}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorMap[cfg.color]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-ink-900">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                  </div>
                  <p className="text-sm text-ink-500">{n.message}</p>
                  <p className="text-xs text-ink-400 mt-1">{n.time}</p>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
