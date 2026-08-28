import { createContext, useContext, useState, useCallback } from 'react'
import { NOTIFICATIONS } from '../data/mockData'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  const unreadCount = notifications.filter(n => !n.read).length

  const markRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const addNotification = useCallback((n) => {
    setNotifications(prev => [{ ...n, id: `n${Date.now()}`, time: 'Just now', read: false }, ...prev])
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markRead, markAllRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)
