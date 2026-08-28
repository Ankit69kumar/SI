import { useState } from 'react'
import { Search, HardHat, CheckCircle2, X, ShieldCheck, Ban } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import Rating from '../../components/ui/Rating'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { ADMIN_USERS, SERVICE_CATEGORIES } from '../../data/mockData'
import * as Icons from 'lucide-react'

export default function AdminProviders() {
  const [query, setQuery] = useState('')
  const [providers, setProviders] = useState(ADMIN_USERS.filter(u => u.role === 'provider'))
  const [actionTarget, setActionTarget] = useState(null)
  const [actionType, setActionType] = useState('')

  const filtered = providers.filter(p =>
    !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.email.toLowerCase().includes(query.toLowerCase())
  )

  const confirmAction = () => {
    setProviders(prev => prev.map(p => p.id === actionTarget ? {
      ...p,
      verified: actionType === 'verify',
      status: actionType === 'verify' ? 'active' : (actionType === 'suspend' ? 'suspended' : p.status),
    } : p))
    setActionTarget(null)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">Manage Providers</h2>
        <p className="text-ink-400">Verify and manage service providers</p>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search providers..." className="input pl-10" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card"><EmptyState icon={HardHat} title="No providers found" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => (
            <div key={p.id} className="card p-5">
              <div className="flex items-start gap-3 mb-4">
                <Avatar name={p.name} size={48} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-ink-900 truncate">{p.name}</p>
                    {p.verified && <ShieldCheck size={16} className="text-primary-500 shrink-0" />}
                  </div>
                  <p className="text-sm text-ink-400 truncate">{p.email}</p>
                  <StatusBadge status={p.status} />
                </div>
              </div>
              <div className="space-y-2 text-sm text-ink-500 mb-4">
                <div className="flex justify-between"><span>Joined</span><span className="font-medium text-ink-700">{p.joined}</span></div>
                <div className="flex justify-between"><span>Jobs Done</span><span className="font-medium text-ink-700">{p.jobs || 0}</span></div>
                <div className="flex justify-between"><span>Verified</span><span className="font-medium text-ink-700">{p.verified ? 'Yes' : 'Pending'}</span></div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-ink-100">
                {!p.verified && <button onClick={() => { setActionTarget(p.id); setActionType('verify') }} className="btn-primary text-sm flex-1"><CheckCircle2 size={14} /> Verify</button>}
                {p.verified && p.status !== 'suspended' && <button onClick={() => { setActionTarget(p.id); setActionType('suspend') }} className="btn-danger text-sm flex-1"><Ban size={14} /> Suspend</button>}
                {p.status === 'suspended' && <button onClick={() => { setActionTarget(p.id); setActionType('activate') }} className="btn-secondary text-sm flex-1"><CheckCircle2 size={14} /> Activate</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog open={!!actionTarget} onClose={() => setActionTarget(null)} onConfirm={confirmAction}
        title={actionType === 'verify' ? 'Verify this provider?' : actionType === 'suspend' ? 'Suspend this provider?' : 'Activate this provider?'}
        message={actionType === 'verify' ? 'This provider will be marked as verified and visible to customers.' : actionType === 'suspend' ? 'This provider will be suspended and hidden from customers.' : 'This provider will regain access to the platform.'}
        confirmText={actionType === 'verify' ? 'Verify' : actionType === 'suspend' ? 'Suspend' : 'Activate'} danger={actionType === 'suspend'} />
    </div>
  )
}
