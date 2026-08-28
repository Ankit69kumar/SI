import { useState } from 'react'
import { Search, Users, Ban, CheckCircle2, X } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { ADMIN_USERS } from '../../data/mockData'

export default function AdminUsers() {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('all')
  const [users, setUsers] = useState(ADMIN_USERS)
  const [actionTarget, setActionTarget] = useState(null)
  const [actionType, setActionType] = useState('')

  const filtered = users.filter(u => {
    if (role !== 'all' && u.role !== role) return false
    if (query && !u.name.toLowerCase().includes(query.toLowerCase()) && !u.email.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const confirmAction = () => {
    setUsers(prev => prev.map(u => u.id === actionTarget ? { ...u, status: actionType === 'suspend' ? 'suspended' : 'active' } : u))
    setActionTarget(null)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">Manage Users</h2>
        <p className="text-ink-400">{users.length} total users on the platform</p>
      </div>

      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or email..." className="input pl-10" />
        </div>
        <select value={role} onChange={e => setRole(e.target.value)} className="input sm:w-48">
          <option value="all">All Roles</option>
          <option value="customer">Customers</option>
          <option value="provider">Providers</option>
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
                  <th className="px-4 py-3 font-medium">Activity</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-t border-ink-100 hover:bg-ink-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} size={36} />
                        <div>
                          <p className="font-semibold text-ink-900">{u.name}</p>
                          <p className="text-xs text-ink-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="badge bg-ink-100 text-ink-600 capitalize">{u.role}</span></td>
                    <td className="px-4 py-3 text-ink-500">{u.joined}</td>
                    <td className="px-4 py-3 text-ink-500">{u.bookings || u.jobs || 0} {u.role === 'provider' ? 'jobs' : 'bookings'}</td>
                    <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                    <td className="px-4 py-3 text-right">
                      {u.status === 'suspended' ? (
                        <button onClick={() => { setActionTarget(u.id); setActionType('activate') }} className="btn-ghost text-success-600 text-sm p-2"><CheckCircle2 size={16} /></button>
                      ) : (
                        <button onClick={() => { setActionTarget(u.id); setActionType('suspend') }} className="btn-ghost text-error-600 text-sm p-2"><Ban size={16} /></button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!actionTarget} onClose={() => setActionTarget(null)} onConfirm={confirmAction}
        title={actionType === 'suspend' ? 'Suspend this user?' : 'Activate this user?'}
        message={actionType === 'suspend' ? 'This user will lose access to the platform. They can be reactivated later.' : 'This user will regain full access to the platform.'}
        confirmText={actionType === 'suspend' ? 'Suspend' : 'Activate'} danger={actionType === 'suspend'} />
    </div>
  )
}
