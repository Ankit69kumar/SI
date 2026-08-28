import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const links = [
    { to: '/services', label: 'Browse Services' },
    { to: '/how-it-works', label: 'How it Works' },
    { to: '/providers', label: 'Providers' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-ink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-ink-900">Co-Serve</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.to} to={l.to} className="text-sm font-medium text-ink-600 hover:text-primary-600 transition">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button className="btn-primary" onClick={() => navigate(`/${user.role}/dashboard`)}>
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-ghost">Login</Link>
                <Link to="/register" className="btn-primary">Get Started</Link>
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
            <div className="pt-3 flex gap-3">
              <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary flex-1">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="btn-primary flex-1">Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
