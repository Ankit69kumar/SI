import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState('customer')
  const [showPwd, setShowPwd] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please enter email and password'); return }
    setLoading(true)
    setTimeout(() => {
      login(role)
      navigate(`/${role}/dashboard`)
    }, 600)
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
              <Sparkles size={20} className="text-primary-600" />
            </div>
            <span className="text-xl font-bold">Co-Serve</span>
          </Link>
          <div>
            <h1 className="text-white text-4xl font-bold leading-tight mb-4">Welcome back to Co-Serve</h1>
            <p className="text-primary-100 text-lg max-w-md">Trusted household and community services, just a tap away. Sign in to manage your services and bookings.</p>
          </div>
          <div className="flex gap-8">
            <div><p className="text-3xl font-bold">4,800+</p><p className="text-primary-200 text-sm">Customers</p></div>
            <div><p className="text-3xl font-bold">1,200+</p><p className="text-primary-200 text-sm">Providers</p></div>
            <div><p className="text-3xl font-bold">18K+</p><p className="text-primary-200 text-sm">Jobs Done</p></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-ink-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-ink-900">Co-Serve</span>
          </div>

          <h2 className="text-2xl font-bold text-ink-900 mb-2">Sign in to your account</h2>
          <p className="text-ink-400 mb-6">Welcome back! Please enter your details.</p>

          <div className="flex bg-ink-100 rounded-lg p-1 mb-6">
            {[
              { v: 'customer', label: 'Customer' },
              { v: 'provider', label: 'Provider' },
              { v: 'admin', label: 'Admin' },
            ].map(r => (
              <button key={r.v} onClick={() => setRole(r.v)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${role === r.v ? 'bg-white text-primary-700 shadow-sm' : 'text-ink-500'}`}>
                {r.label}
              </button>
            ))}
          </div>

          {error && <div className="mb-4 p-3 rounded-lg bg-error-50 text-error-600 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input pl-10" />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="input pl-10 pr-10" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-600">
                <input type="checkbox" className="rounded border-ink-300 text-primary-600 focus:ring-primary-500" /> Remember me
              </label>
              <a href="#" className="text-primary-600 font-medium hover:underline">Forgot password?</a>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Signing in...' : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="text-center text-ink-400 text-sm mt-6">
            Don't have an account? <Link to="/register" className="text-primary-600 font-medium hover:underline">Sign up</Link>
          </p>
          <p className="text-center text-ink-300 text-xs mt-4">Demo mode — any email and password will sign you in.</p>
        </div>
      </div>
    </div>
  )
}
