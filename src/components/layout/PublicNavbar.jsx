import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Sparkles, Globe } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const { t, language, setLanguage, languages } = useLanguage()
  const navigate = useNavigate()

  const links = [
    { to: '/services', label: t('landing.nav.browse') },
    { to: '/how-it-works', label: t('landing.nav.howItWorks') },
    { to: '/providers', label: t('landing.nav.providers') },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-ink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-ink-900">{t('app.name')}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.to} to={l.to} className="text-sm font-medium text-ink-600 hover:text-primary-600 transition">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <Globe size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
              <select value={language} onChange={e => setLanguage(e.target.value)}
                className="text-sm rounded-lg border border-ink-200 bg-white pl-8 pr-3 py-2 text-ink-700 outline-none focus:border-primary-500">
                {Object.values(languages).map(l => <option key={l.code} value={l.code}>{l.nativeName}</option>)}
              </select>
            </div>
            {user ? (
              <button className="btn-primary" onClick={() => navigate(`/${user.role}/dashboard`)}>
                {t('landing.nav.dashboard')}
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-ghost">{t('landing.nav.login')}</Link>
                <Link to="/register" className="btn-primary">{t('landing.nav.getStarted')}</Link>
              </>
            )}
          </div>

          <button className="md:hidden btn-ghost p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink-100 bg-white animate-slide-in">
          <div className="px-4 py-4 space-y-1">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-ink-700 hover:bg-ink-50 font-medium">
                {l.label}
              </Link>
            ))}
            <div className="relative px-3 py-2">
              <Globe size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
              <select value={language} onChange={e => setLanguage(e.target.value)}
                className="w-full text-sm rounded-lg border border-ink-200 bg-white pl-9 pr-3 py-2 text-ink-700 outline-none">
                {Object.values(languages).map(l => <option key={l.code} value={l.code}>{l.nativeName}</option>)}
              </select>
            </div>
            <div className="pt-3 flex gap-3">
              <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary flex-1">{t('landing.nav.login')}</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="btn-primary flex-1">{t('landing.nav.getStarted')}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
