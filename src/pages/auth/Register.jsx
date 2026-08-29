import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, User as UserIcon, Phone, MapPin, Eye, EyeOff, ArrowRight, Globe, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { supabase } from '../../lib/supabaseClient'

export default function Register() {
  const { signUp } = useAuth()
  const { t, language, setLanguage, languages } = useLanguage()
  const navigate = useNavigate()
  const [role, setRole] = useState('customer')
  const [showPwd, setShowPwd] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) { setError(t('auth.error.fillAll')); return }
    if (form.password.length < 6) { setError(t('auth.error.weakPassword')); return }
    setLoading(true)
    try {
      const data = await signUp({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        location: form.location,
        role,
      })
      if (data?.user) {
        const { data: profile } = await supabase
          .from('profiles').select('role').eq('id', data.user.id).maybeSingle()
        const finalRole = profile?.role || role || 'customer'
        navigate(`/${finalRole}/dashboard`)
      }
    } catch (err) {
      if (err.message?.includes('already registered') || err.message?.includes('already')) {
        setError(t('auth.error.exists'))
      } else if (err.message?.includes('password')) {
        setError(t('auth.error.weakPassword'))
      } else {
        setError(t('auth.error.generic'))
      }
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
            <h1 className="text-white text-4xl font-bold leading-tight mb-4">{t('auth.joinTitle')}</h1>
            <p className="text-primary-100 text-lg max-w-md">{t('auth.joinDesc')}</p>
          </div>
          <div className="space-y-3">
            {[
              { en: 'Verified & rated providers', hi: 'सत्यापित और रेटेड प्रदाता', te: 'ధృవీకరించబడిన ప్రదాతలు', ja: '認証済み・評価済みプロバイダー' },
              { en: 'Smart matching system', hi: 'स्मार्ट मैचिंग सिस्टम', te: 'స్మార్ట్ మ్యాచింగ్ సిస్టమ్', ja: 'スマートマッチングシステム' },
              { en: 'Secure and transparent', hi: 'सुरक्षित और पारदर्शी', te: 'సురక్షిత మరియు పారదర్శక', ja: '安全で透明性あり' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-primary-100">
                <div className="w-1.5 h-1.5 rounded-full bg-white" /> {f[language] || f.en}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-ink-50 overflow-y-auto">
        <div className="w-full max-w-md py-8">
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

          <h2 className="text-2xl font-bold text-ink-900 mb-2">{t('auth.createAccount')}</h2>
          <p className="text-ink-400 mb-6">{t('auth.createDesc')}</p>

          <div className="flex bg-ink-100 rounded-lg p-1 mb-6">
            {[
              { v: 'customer', label: t('auth.role.customer') },
              { v: 'provider', label: t('auth.role.provider') },
            ].map(r => (
              <button key={r.v} onClick={() => setRole(r.v)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${role === r.v ? 'bg-white text-primary-700 shadow-sm' : 'text-ink-500'}`}>
                {r.label}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-error-50 text-error-600 text-sm flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">{t('auth.fullName')} <span className="text-error-500">*</span></label>
              <div className="relative">
                <UserIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Your full name" className="input pl-10" />
              </div>
            </div>
            <div>
              <label className="label">{t('auth.email')} <span className="text-error-500">*</span></label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="you@example.com" className="input pl-10" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">{t('auth.phone')}</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+91 98765 43210" className="input pl-10" />
                </div>
              </div>
              <div>
                <label className="label">{t('auth.location')}</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input value={form.location} onChange={e => handleChange('location', e.target.value)} placeholder="Mumbai" className="input pl-10" />
                </div>
              </div>
            </div>
            <div>
              <label className="label">{t('auth.password')} <span className="text-error-500">*</span></label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={e => handleChange('password', e.target.value)} placeholder="••••••••" className="input pl-10 pr-10" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <label className="flex items-start gap-2 text-sm text-ink-600">
              <input type="checkbox" required className="mt-0.5 rounded border-ink-300 text-primary-600 focus:ring-primary-500" />
              <span>{t('auth.terms')} <a href="#" className="text-primary-600 hover:underline">{t('auth.termsLink')}</a> {t('auth.and')} <a href="#" className="text-primary-600 hover:underline">{t('auth.privacy')}</a></span>
            </label>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? t('auth.creating') : <>{t('auth.createBtn')} <ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="text-center text-ink-400 text-sm mt-6">
            {t('auth.haveAccount')} <Link to="/login" className="text-primary-600 font-medium hover:underline">{t('auth.signInBtn')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
