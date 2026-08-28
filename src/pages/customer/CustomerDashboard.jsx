import { Link } from 'react-router-dom'
import { CalendarDays, CheckCircle2, Clock, MapPin, PlusCircle, Wrench, TrendingUp, Bell } from 'lucide-react'
import StatCard from '../../components/ui/StatCard'
import Avatar from '../../components/ui/Avatar'
import Rating from '../../components/ui/Rating'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import { BOOKINGS, getProvider } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../context/NotificationContext'

export default function CustomerDashboard() {
  const { user } = useAuth()
  const { notifications } = useNotifications()
  const myBookings = BOOKINGS
  const upcoming = myBookings.filter(b => ['pending', 'accepted', 'in_progress'].includes(b.status))
  const completed = myBookings.filter(b => b.status === 'completed')
  const recentNotifs = notifications.slice(0, 4)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink-900">Hello, {user?.name?.split(' ')[0]}! 👋</h2>
          <p className="text-ink-400">Here's what's happening with your services.</p>
        </div>
        <Link to="/customer/create-request" className="btn-primary"><PlusCircle size={18} /> New Service Request</Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CalendarDays} label="Upcoming" value={upcoming.length} color="primary" />
        <StatCard icon={CheckCircle2} label="Completed" value={completed.length} color="success" />
        <StatCard icon={Clock} label="Pending" value={myBookings.filter(b => b.status === 'pending').length} color="warning" />
        <StatCard icon={TrendingUp} label="Total Spent" value={`₹${myBookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.price, 0)}`} color="accent" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-ink-900">Upcoming Services</h3>
              <Link to="/customer/bookings" className="text-sm text-primary-600 font-medium hover:underline">View all</Link>
            </div>
            {upcoming.length === 0 ? (
              <EmptyState icon={CalendarDays} title="No upcoming services" description="Create a new service request to get started." action={<Link to="/customer/create-request" className="btn-primary">New Request</Link>} />
            ) : (
              <div className="space-y-3">
                {upcoming.map(b => {
                  const p = getProvider(b.providerId)
                  return (
                    <Link key={b.id} to="/customer/bookings" className="flex items-center gap-4 p-3 rounded-xl hover:bg-ink-50 transition border border-ink-100">
                      <Avatar src={p?.avatar} name={p?.name} size={44} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-ink-900 truncate">{b.serviceName}</p>
                        <p className="text-sm text-ink-400">{p?.name} · {b.date} at {b.time}</p>
                      </div>
                      <StatusBadge status={b.status} />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-ink-900 mb-4">Recently Completed</h3>
            {completed.length === 0 ? (
              <EmptyState icon={CheckCircle2} title="No completed services yet" />
            ) : (
              <div className="space-y-3">
                {completed.map(b => {
                  const p = getProvider(b.providerId)
                  return (
                    <div key={b.id} className="flex items-center gap-4 p-3 rounded-xl border border-ink-100">
                      <Avatar src={p?.avatar} name={p?.name} size={44} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-ink-900 truncate">{b.serviceName}</p>
                        <p className="text-sm text-ink-400">{p?.name} · {b.date}</p>
                      </div>
                      {b.rating ? <Rating value={b.rating} size={14} /> : <StatusBadge status="completed" />}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-ink-900">Recent Notifications</h3>
              <Link to="/customer/notifications" className="text-sm text-primary-600 font-medium hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {recentNotifs.map(n => (
                <div key={n.id} className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${n.read ? 'bg-ink-100' : 'bg-primary-100'}`}>
                    <Bell size={16} className={n.read ? 'text-ink-400' : 'text-primary-600'} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink-800">{n.title}</p>
                    <p className="text-xs text-ink-400 line-clamp-2">{n.message}</p>
                    <p className="text-xs text-ink-300 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-ink-900 mb-2">Need help quickly?</h3>
            <p className="text-sm text-ink-400 mb-4">Browse popular categories and book instantly.</p>
            <Link to="/customer/services" className="btn-secondary w-full">Browse Services</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
