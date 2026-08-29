import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Globe, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { supabase } from '../../lib/supabaseClient'

export default function Login() {
  const { signIn } = useAuth()
  const { t, language, setLanguage, languages } = useLanguage()
  const navigate = useNavigate()
  const [showPwd, setShowPwd] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError(t('auth.error.empty')); return }
    setLoading(true)
    try {
      const data = await signIn({ email, password })
      if (data?.user) {
        const { data: profile } = await supabase
          .from('profiles').select('role').eq('id', data.user.id).maybeSingle()
        const role = profile?.role || 'customer'
        navigate(`/${role}/dashboard`)
      }
    } catch (err) {
      setError(t('auth.error.invalid'))
    } finally {
      setLoading(false)
    }
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
            <span className="text-xl font-bold">{t('app.name')}</span>
          </Link>
          <div>
            <h1 className="text-white text-4xl font-bold leading-tight mb-4">{t('auth.welcomeBack')}</h1>
            <p className="text-primary-100 text-lg max-w-md">{t('auth.welcomeDesc')}</p>
          </div>
          <div className="flex gap-8">
            <div><p className="text-3xl font-bold">4,800+</p><p className="text-primary-200 text-sm">{t('landing.stats.customers')}</p></div>
            <div><p className="text-3xl font-bold">1,200+</p><p className="text-primary-200 text-sm">{t('landing.stats.providers')}</p></div>
            <div><p className="text-3xl font-bold">18K+</p><p className="text-primary-200 text-sm">{t('landing.stats.completed')}</p></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-ink-50">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-ink-900">{t('app.name')}</span>
            </div>
            <div className="relative ml-auto">
              <Globe size={18} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
              <select value={language} onChange={e => setLanguage(e.target.value)}
                className="text-sm rounded-lg border border-ink-200 bg-white pl-8 pr-3 py-2 text-ink-700 outline-none focus:border-primary-500">
                {Object.values(languages).map(l => <option key={l.code} value={l.code}>{l.nativeName}</option>)}
              </select>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-ink-900 mb-2">{t('auth.signIn')}</h2>
          <p className="text-ink-400 mb-6">{t('auth.signInDesc')}</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-error-50 text-error-600 text-sm flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">{t('auth.email')}</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input pl-10" />
              </div>
            </div>
            <div>
              <label className="label">{t('auth.password')}</label>
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
                <input type="checkbox" className="rounded border-ink-300 text-primary-600 focus:ring-primary-500" /> {t('auth.rememberMe')}
              </label>
              <a href="#" className="text-primary-600 font-medium hover:underline">{t('auth.forgotPassword')}</a>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? t('auth.signingIn') : <>{t('auth.signInBtn')} <ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="text-center text-ink-400 text-sm mt-6">
            {t('auth.noAccount')} <Link to="/register" className="text-primary-600 font-medium hover:underline">{t('auth.signUp')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
