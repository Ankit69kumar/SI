import { useState } from 'react'
import { Sparkles, Check, Globe, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { LANGUAGES } from '../lib/translations'

export default function LanguageSelect() {
  const { setLanguage } = useLanguage()
  const [selected, setSelected] = useState('en')

  const handleContinue = () => {
    setLanguage(selected)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 p-4">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-5">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-ink-900 mb-2">Co-Serve</h1>
          <div className="inline-flex items-center gap-2 text-ink-400 text-sm mb-1">
            <Globe size={16} /> Choose Your Language
          </div>
          <p className="text-ink-400 text-sm">Select your preferred language. You can change it later.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {Object.values(LANGUAGES).map(lang => (
            <button key={lang.code} onClick={() => setSelected(lang.code)}
              className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${selected === lang.code ? 'border-primary-500 bg-primary-50' : 'border-ink-100 hover:border-ink-200 bg-white'}`}>
              <span className="text-3xl">{lang.flag}</span>
              <div className="text-left flex-1">
                <p className="font-semibold text-ink-900">{lang.nativeName}</p>
                <p className="text-xs text-ink-400">{lang.name}</p>
              </div>
              {selected === lang.code && <Check size={20} className="text-primary-600" />}
            </button>
          ))}
        </div>

        <button onClick={handleContinue} className="btn-primary w-full py-3 text-base">
          Continue <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}
