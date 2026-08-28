import { useState } from 'react'
import { Briefcase, MapPin, Calendar, IndianRupee, CheckCircle2, Clock, X, ArrowRight } from 'lucide-react'
import { PROVIDER_JOBS } from '../../data/mockData'
import Avatar from '../../components/ui/Avatar'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Modal from '../../components/ui/Modal'

const TABS = [
  { v: 'all', label: 'All Jobs' },
  { v: 'accepted', label: 'Accepted' },
  { v: 'in_progress', label: 'In Progress' },
  { v: 'completed', label: 'Completed' },
]

export default function MyJobs() {
  const [tab, setTab] = useState('all')
  const [jobs, setJobs] = useState(PROVIDER_JOBS)
  const [actionTarget, setActionTarget] = useState(null)
  const [actionType, setActionType] = useState('')

  const filtered = jobs.filter(j => tab === 'all' || j.status === tab)

  const updateStatus = (id, status) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status } : j))
  }

  const confirmAction = () => {
    if (actionType === 'complete') updateStatus(actionTarget, 'completed')
    if (actionType === 'progress') updateStatus(actionTarget, 'in_progress')
    setActionTarget(null)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">My Jobs</h2>
        <p className="text-ink-400">Manage your active and completed jobs</p>
      </div>

      <div className="flex gap-1 bg-ink-100 rounded-lg p-1 w-fit">
        {TABS.map(t => (
          <button key={t.v} onClick={() => setTab(t.v)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${tab === t.v ? 'bg-white text-primary-700 shadow-sm' : 'text-ink-500'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card"><EmptyState icon={Briefcase} title="No jobs found" /></div>
      ) : (
        <div className="space-y-4">
          {filtered.map(j => (
            <div key={j.id} className="card p-5">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Avatar src={j.customerAvatar} name={j.customerName} size={56} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-ink-900">{j.serviceName}</p>
                    <StatusBadge status={j.status} />
                  </div>
                  <p className="text-sm text-ink-400 mb-2">{j.customerName}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-ink-500">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {j.date} · {j.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {j.location}</span>
                    <span className="flex items-center gap-1 font-semibold text-ink-800"><IndianRupee size={14} /> {j.price}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {j.status === 'accepted' && <button onClick={() => { setActionTarget(j.id); setActionType('progress') }} className="btn-primary text-sm">Start Job</button>}
                  {j.status === 'in_progress' && <button onClick={() => { setActionTarget(j.id); setActionType('complete') }} className="btn-primary text-sm">Mark Complete</button>}
                  {j.status === 'completed' && j.rating && <span className="text-sm text-ink-500">Rated {j.rating}★</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog open={!!actionTarget} onClose={() => setActionTarget(null)} onConfirm={confirmAction}
        title={actionType === 'complete' ? 'Mark this job as complete?' : 'Start this job?'}
        message={actionType === 'complete' ? 'The customer will be notified that the job is completed.' : 'The job status will be updated to In Progress.'}
        confirmText={actionType === 'complete' ? 'Mark Complete' : 'Start Job'} />
    </div>
  )
}
