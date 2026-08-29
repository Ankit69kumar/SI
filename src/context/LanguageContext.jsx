import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { translations, LANGUAGES } from '../lib/translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'coserve-language'

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved && translations[saved] ? saved : null
  })

  const t = useCallback((key) => {
    const dict = translations[language] || translations.en
    return dict[key] || translations.en[key] || key
  }, [language])

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }, [])

  const value = { language, setLanguage: changeLanguage, t, languages: LANGUAGES }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
