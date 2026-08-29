import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (session) => {
    if (!session?.user) { setUser(null); return null }
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, name, email, phone, location, avatar, role, status, joined')
      .eq('id', session.user.id)
      .maybeSingle()

    if (error || !profile) {
      setUser(null)
      return null
    }
    const userData = {
      id: profile.id,
      name: profile.name || session.user.email,
      email: profile.email || session.user.email,
      phone: profile.phone || '',
      location: profile.location || '',
      avatar: profile.avatar || '',
      role: profile.role || 'customer',
      status: profile.status || 'active',
      joined: profile.joined,
    }
    setUser(userData)
    return userData
  }, [])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return
      if (session) {
        fetchProfile(session).finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null)
        setLoading(false)
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
        fetchProfile(session).finally(() => setLoading(false))
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  const signUp = useCallback(async ({ name, email, password, phone, location, role }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role: role || 'customer' } },
    })
    if (error) throw error

    if (data.user) {
      const updates = { phone: phone || '', location: location || '', name }
      await supabase.from('profiles').update(updates).eq('id', data.user.id)
      if (role && role !== 'customer') {
        await supabase.from('profiles').update({ role }).eq('id', data.user.id)
      }
    }
    return data
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    if (data.session) await fetchProfile(data.session)
    return data
  }, [fetchProfile])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
  }, [])

  const updateUserRole = useCallback(async (userId, newRole) => {
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId)
    if (error) throw error
    if (user?.id === userId) setUser(prev => prev ? { ...prev, role: newRole } : prev)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logout, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
