import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Sparkles, Bell, LogOut, Menu, X, ChevronRight, User, Search } from 'lucide-react'
import * as Icons from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../context/NotificationContext'
import Avatar from '../ui/Avatar'

const NAV = {
  customer: [
    { to: '/customer/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { to: '/customer/services', label: 'Browse Services', icon: 'Search' },
    { to: '/customer/create-request', label: 'New Request', icon: 'PlusCircle' },
    { to: '/customer/bookings', label: 'My Bookings', icon: 'CalendarDays' },
    { to: '/customer/notifications', label: 'Notifications', icon: 'Bell', badge: true },
    { to: '/customer/profile', label: 'Profile', icon: 'UserRound' },
  ],
  provider: [
    { to: '/provider/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { to: '/provider/jobs', label: 'My Jobs', icon: 'Briefcase' },
    { to: '/provider/earnings', label: 'Earnings', icon: 'Wallet' },
    { to: '/provider/reviews', label: 'Reviews', icon: 'Star' },
    { to: '/provider/notifications', label: 'Notifications', icon: 'Bell', badge: true },
    { to: '/provider/profile', label: 'Profile', icon: 'UserRound' },
  ],
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { to: '/admin/users', label: 'Users', icon: 'Users' },
    { to: '/admin/providers', label: 'Providers', icon: 'HardHat' },
    { to: '/admin/requests', label: 'Service Requests', icon: 'ClipboardList' },
    { to: '/admin/analytics', label: 'Analytics', icon: 'BarChart3' },
    { to: '/admin/complaints', label: 'Complaints', icon: 'ShieldAlert' },
  ],
}

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  const nav = NAV[user.role] || []
  const roleLabel = user.role.charAt(0).toUpperCase() + user.role.slice(1)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const pageTitle = nav.find(n => location.pathname.startsWith(n.to))?.label || 'Dashboard'

  const Sidebar = (
    <aside className="w-64 bg-white border-r border-ink-100 flex flex-col h-full">
      <div className="px-6 py-5 border-b border-ink-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-ink-900">Co-Serve</span>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-ink-100">
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} name={user.name} size={40} />
          <div className="min-w-0">
            <p className="font-semibold text-ink-900 text-sm truncate">{user.name}</p>
            <p className="text-xs text-ink-400 capitalize">{roleLabel} Account</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map(item => {
          const Icon = Icons[item.icon]
          return (
            <NavLink key={item.to} to={item.to} onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-50'
                }`
              }>
              {Icon && <Icon size={18} />}
              <span className="flex-1">{item.label}</span>
              {item.badge && unreadCount > 0 && (
                <span className="bg-error-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-ink-100">
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-error-600 hover:bg-error-50 w-full transition">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-ink-50">
      <div className="hidden lg:flex">{Sidebar}</div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 h-full">{Sidebar}</div>
          <div className="flex-1 bg-ink-900/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-ink-100 flex items-center justify-between px-4 sm:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden btn-ghost p-2" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-bold text-ink-900">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(`/${user.role}/notifications`)} className="btn-ghost p-2.5 relative">
              <Bell size={20} />
              {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full" />}
            </button>
            <button onClick={() => navigate(`/${user.role}/profile`)} className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-ink-50 transition">
              <Avatar src={user.avatar} name={user.name} size={32} />
              <span className="hidden sm:block text-sm font-medium text-ink-700">{user.name.split(' ')[0]}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
