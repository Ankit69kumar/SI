import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, MapPin, IndianRupee, X, Star } from 'lucide-react'
import { BOOKINGS, getProvider } from '../../data/mockData'
import Avatar from '../../components/ui/Avatar'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Modal from '../../components/ui/Modal'
import Rating from '../../components/ui/Rating'

const TABS = [
  { v: 'all', label: 'All' },
  { v: 'active', label: 'Active' },
  { v: 'completed', label: 'Completed' },
  { v: 'cancelled', label: 'Cancelled' },
]

export default function MyBookings() {
  const [tab, setTab] = useState('all')
  const [cancelTarget, setCancelTarget] = useState(null)
  const [reviewTarget, setReviewTarget] = useState(null)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [bookings, setBookings] = useState(BOOKINGS)

  const filtered = bookings.filter(b => {
    if (tab === 'all') return true
    if (tab === 'active') return ['pending', 'accepted', 'in_progress'].includes(b.status)
    return b.status === tab
  })

  const handleCancel = () => {
    setBookings(prev => prev.map(b => b.id === cancelTarget ? { ...b, status: 'cancelled' } : b))
    setCancelTarget(null)
  }

  const handleSubmitReview = () => {
    setBookings(prev => prev.map(b => b.id === reviewTarget ? { ...b, rating: reviewRating } : b))
    setReviewTarget(null)
    setReviewRating(5)
    setReviewText('')
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">My Bookings</h2>
        <p className="text-ink-400">Manage your service requests</p>
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
        <div className="card">
          <EmptyState icon={CalendarDays} title="No bookings found" description="Create a service request to see it here." action={<Link to="/customer/create-request" className="btn-primary">New Request</Link>} />
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(b => {
            const p = getProvider(b.providerId)
            return (
              <div key={b.id} className="card p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <Avatar src={p?.avatar} name={p?.name} size={56} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-ink-900">{b.serviceName}</p>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-sm text-ink-400 mb-2">{p?.name}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-ink-500">
                      <span className="flex items-center gap-1"><CalendarDays size={14} /> {b.date} · {b.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {b.location}</span>
                      <span className="flex items-center gap-1 font-semibold text-ink-800"><IndianRupee size={14} /> {b.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end">
                    {b.status === 'completed' && !b.rating && (
                      <button onClick={() => setReviewTarget(b.id)} className="btn-secondary text-sm">Rate Provider</button>
                    )}
                    {b.status === 'completed' && b.rating && (
                      <div className="flex items-center gap-1.5 text-sm text-ink-500"><Star size={16} className="fill-accent-400 text-accent-400" /> You rated {b.rating} stars</div>
                    )}
                    {['pending', 'accepted'].includes(b.status) && (
                      <button onClick={() => setCancelTarget(b.id)} className="btn-danger text-sm">Cancel Request</button>
                    )}
                    {b.status === 'in_progress' && <span className="badge bg-primary-100 text-primary-700">In Progress</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ConfirmDialog open={!!cancelTarget} onClose={() => setCancelTarget(null)} onConfirm={handleCancel}
        title="Cancel this request?" message="This will cancel your service request. The provider will be notified. This action cannot be undone."
        confirmText="Yes, Cancel" danger />

      <Modal open={!!reviewTarget} onClose={() => setReviewTarget(null)} title="Rate your experience"
        footer={<><button className="btn-secondary" onClick={() => setReviewTarget(null)}>Cancel</button><button className="btn-primary" onClick={handleSubmitReview}>Submit Review</button></>}>
        <p className="text-ink-400 mb-4 text-sm">Help others by rating the provider based on your experience.</p>
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map(i => (
            <button key={i} onClick={() => setReviewRating(i)}>
              <Star size={32} className={i <= reviewRating ? 'fill-accent-400 text-accent-400' : 'fill-ink-100 text-ink-200'} />
            </button>
          ))}
        </div>
        <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} rows={3} placeholder="Write a review..." className="input resize-none" />
      </Modal>
    </div>
  )
}
