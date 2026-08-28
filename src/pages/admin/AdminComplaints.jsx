import { useState } from 'react'
import { ShieldAlert, Search, MessageCircle } from 'lucide-react'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { COMPLAINTS } from '../../data/mockData'

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState(COMPLAINTS)
  const [query, setQuery] = useState('')
  const [resolveTarget, setResolveTarget] = useState(null)

  const filtered = complaints.filter(c =>
    !query || c.user.toLowerCase().includes(query.toLowerCase()) || c.against.toLowerCase().includes(query.toLowerCase()) || c.reason.toLowerCase().includes(query.toLowerCase())
  )

  const handleResolve = () => {
    setComplaints(prev => prev.map(c => c.id === resolveTarget ? { ...c, status: 'resolved' } : c))
    setResolveTarget(null)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">Complaints & Reports</h2>
        <p className="text-ink-400">{complaints.filter(c => c.status === 'open').length} open complaints</p>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search complaints..." className="input pl-10" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card"><EmptyState icon={ShieldAlert} title="No complaints found" /></div>
      ) : (
        <div className="space-y-4">
          {filtered.map(c => (
            <div key={c.id} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-error-100 flex items-center justify-center shrink-0">
                    <ShieldAlert size={22} className="text-error-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-ink-900">{c.id}</p>
                      <StatusBadge status={c.status} />
                    </div>
                    <p className="text-sm text-ink-500 mb-1"><span className="font-medium text-ink-700">{c.user}</span> reported <span className="font-medium text-ink-700">{c.against}</span></p>
                    <p className="text-sm text-ink-600">{c.reason}</p>
                    <p className="text-xs text-ink-400 mt-1">Filed on {c.date}</p>
                  </div>
                </div>
                {c.status === 'open' && <button onClick={() => setResolveTarget(c.id)} className="btn-secondary text-sm shrink-0"><MessageCircle size={14} /> Resolve</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog open={!!resolveTarget} onClose={() => setResolveTarget(null)} onConfirm={handleResolve}
        title="Mark this complaint as resolved?" message="The complaint will be closed and marked as resolved." confirmText="Resolve" />
    </div>
  )
}
