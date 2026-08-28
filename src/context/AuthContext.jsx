import { createContext, useContext, useState, useCallback } from 'react'
import { CURRENT_USER, CURRENT_PROVIDER, CURRENT_ADMIN } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = useCallback((role) => {
    if (role === 'provider') setUser({ ...CURRENT_PROVIDER, role: 'provider' })
    else if (role === 'admin') setUser(CURRENT_ADMIN)
    else setUser(CURRENT_USER)
  }, [])

  const logout = useCallback(() => setUser(null), [])
  const switchRole = useCallback((role) => login(role), [login])

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
