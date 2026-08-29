import { useState, useEffect, useCallback } from 'react'
import { Search, Users, Ban, CheckCircle2, ShieldCheck, UserCog } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useLanguage } from '../../context/LanguageContext'
import Avatar from '../../components/ui/Avatar'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Spinner from '../../components/ui/Spinner'

export default function AdminUsers() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionTarget, setActionTarget] = useState(null)
  const [actionType, setActionType] = useState('')
  const [newRole, setNewRole] = useState('')

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, email, role, status, joined, phone, location')
      .order('joined', { ascending: false })
    if (!error && data) setUsers(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const filtered = users.filter(u => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false
    if (query && !u.name?.toLowerCase().includes(query.toLowerCase()) && !u.email?.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const confirmAction = async () => {
    if (!actionTarget) return
    if (actionType === 'role') {
      const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', actionTarget)
      if (!error) {
        setUsers(prev => prev.map(u => u.id === actionTarget ? { ...u, role: newRole } : u))
      }
    } else if (actionType === 'suspend' || actionType === 'activate') {
      const status = actionType === 'suspend' ? 'suspended' : 'active'
      const { error } = await supabase.from('profiles').update({ status }).eq('id', actionTarget)
      if (!error) {
        setUsers(prev => prev.map(u => u.id === actionTarget ? { ...u, status } : u))
      }
    }
    setActionTarget(null)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Spinner /></div>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">{t('nav.users')}</h2>
        <p className="text-ink-400">{users.length} total users on the platform</p>
      </div>

      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or email..." className="input pl-10" />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="input sm:w-48">
          <option value="all">All Roles</option>
          <option value="customer">{t('auth.role.customer')}</option>
          <option value="provider">{t('auth.role.provider')}</option>
          <option value="admin">{t('auth.role.admin')}</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="card"><EmptyState icon={Users} title="No users found" /></div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-50">
                <tr className="text-ink-400 text-left">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-t border-ink-100 hover:bg-ink-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} src={u.avatar} size={36} />
                        <div>
                          <p className="font-semibold text-ink-900">{u.name}</p>
                          <p className="text-xs text-ink-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge bg-ink-100 text-ink-600 capitalize">{t(`auth.role.${u.role}`) || u.role}</span>
                    </td>
                    <td className="px-4 py-3 text-ink-500">{u.joined || '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setActionTarget(u.id); setActionType('role'); setNewRole(u.role === 'customer' ? 'provider' : u.role === 'provider' ? 'admin' : 'customer') }}
                          className="btn-ghost text-primary-600 text-sm p-2"
                          title="Change role"
                        >
                          <UserCog size={16} />
                        </button>
                        {u.status === 'suspended' ? (
                          <button onClick={() => { setActionTarget(u.id); setActionType('activate') }} className="btn-ghost text-success-600 text-sm p-2">
                            <CheckCircle2 size={16} />
                          </button>
                        ) : (
                          <button onClick={() => { setActionTarget(u.id); setActionType('suspend') }} className="btn-ghost text-error-600 text-sm p-2">
                            <Ban size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!actionTarget}
        onClose={() => setActionTarget(null)}
        onConfirm={confirmAction}
        title={actionType === 'suspend' ? 'Suspend this user?' : actionType === 'activate' ? 'Activate this user?' : 'Change user role?'}
        message={
          actionType === 'suspend' ? 'This user will lose access to the platform. They can be reactivated later.' :
          actionType === 'activate' ? 'This user will regain full access to the platform.' :
          `Change role to: ${newRole === 'customer' ? t('auth.role.customer') : newRole === 'provider' ? t('auth.role.provider') : t('auth.role.admin')}`
        }
        confirmText={actionType === 'suspend' ? 'Suspend' : actionType === 'activate' ? 'Activate' : 'Change Role'}
        danger={actionType === 'suspend'}
      />
    </div>
  )
}
