import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Sparkles, Bell, LogOut, Menu, X, Globe } from 'lucide-react'
import * as Icons from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { useNotifications } from '../../context/NotificationContext'
import Avatar from '../ui/Avatar'

const NAV = {
  customer: [
    { to: '/customer/dashboard', labelKey: 'nav.dashboard', icon: 'LayoutDashboard' },
    { to: '/customer/services', labelKey: 'nav.browseServices', icon: 'Search' },
    { to: '/customer/create-request', labelKey: 'nav.newRequest', icon: 'PlusCircle' },
    { to: '/customer/bookings', labelKey: 'nav.myBookings', icon: 'CalendarDays' },
    { to: '/customer/notifications', labelKey: 'nav.notifications', icon: 'Bell', badge: true },
    { to: '/customer/profile', labelKey: 'nav.profile', icon: 'UserRound' },
  ],
  provider: [
    { to: '/provider/dashboard', labelKey: 'nav.dashboard', icon: 'LayoutDashboard' },
    { to: '/provider/jobs', labelKey: 'nav.myJobs', icon: 'Briefcase' },
    { to: '/provider/earnings', labelKey: 'nav.earnings', icon: 'Wallet' },
    { to: '/provider/reviews', labelKey: 'nav.reviews', icon: 'Star' },
    { to: '/provider/notifications', labelKey: 'nav.notifications', icon: 'Bell', badge: true },
    { to: '/provider/profile', labelKey: 'nav.profile', icon: 'UserRound' },
  ],
  admin: [
    { to: '/admin/dashboard', labelKey: 'nav.dashboard', icon: 'LayoutDashboard' },
    { to: '/admin/users', labelKey: 'nav.users', icon: 'Users' },
    { to: '/admin/providers', labelKey: 'nav.providers', icon: 'HardHat' },
    { to: '/admin/requests', labelKey: 'nav.requests', icon: 'ClipboardList' },
    { to: '/admin/analytics', labelKey: 'nav.analytics', icon: 'BarChart3' },
    { to: '/admin/complaints', labelKey: 'nav.complaints', icon: 'ShieldAlert' },
  ],
}

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const { t, language, setLanguage, languages } = useLanguage()
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

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const pageTitle = nav.find(n => location.pathname.startsWith(n.to))?.labelKey
  const pageTitleText = pageTitle ? t(pageTitle) : t('nav.dashboard')

  const Sidebar = (
    <aside className="w-64 bg-white border-r border-ink-100 flex flex-col h-full">
      <div className="px-6 py-5 border-b border-ink-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-ink-900">{t('app.name')}</span>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-ink-100">
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} name={user.name} size={40} />
          <div className="min-w-0">
            <p className="font-semibold text-ink-900 text-sm truncate">{user.name}</p>
            <p className="text-xs text-ink-400 capitalize">{roleLabel} {t('nav.account')}</p>
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
              <span className="flex-1">{t(item.labelKey)}</span>
              {item.badge && unreadCount > 0 && (
                <span className="bg-error-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-ink-100 space-y-2">
        <div className="relative px-1">
          <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
          <select value={language} onChange={e => setLanguage(e.target.value)}
            className="w-full text-sm rounded-lg border border-ink-200 bg-white pl-8 pr-3 py-2 text-ink-700 outline-none focus:border-primary-500">
            {Object.values(languages).map(l => <option key={l.code} value={l.code}>{l.nativeName}</option>)}
          </select>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-error-600 hover:bg-error-50 w-full transition">
          <LogOut size={18} /> {t('nav.logout')}
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
            <h1 className="text-lg font-bold text-ink-900">{pageTitleText}</h1>
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
