import { Star, MessageSquare } from 'lucide-react'
import { REVIEWS, CURRENT_PROVIDER } from '../../data/mockData'
import Avatar from '../../components/ui/Avatar'
import Rating from '../../components/ui/Rating'
import EmptyState from '../../components/ui/EmptyState'

export default function Reviews() {
  const reviews = REVIEWS.filter(r => r.providerId === CURRENT_PROVIDER.id)

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">Reviews & Ratings</h2>
        <p className="text-ink-400">What customers say about your work</p>
      </div>

      <div className="card p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-center">
            <p className="text-5xl font-bold text-ink-900">{CURRENT_PROVIDER.rating}</p>
            <Rating value={CURRENT_PROVIDER.rating} size={18} />
            <p className="text-sm text-ink-400 mt-1">{CURRENT_PROVIDER.reviewsCount} reviews</p>
          </div>
          <div className="flex-1 w-full space-y-2">
            {[5, 4, 3, 2, 1].map(star => {
              const pct = star === 5 ? 68 : star === 4 ? 22 : star === 3 ? 7 : star === 2 ? 2 : 1
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-ink-500 w-8">{star}★</span>
                  <div className="flex-1 h-2 bg-ink-100 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm text-ink-400 w-12 text-right">{pct}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="card"><EmptyState icon={MessageSquare} title="No reviews yet" /></div>
      ) : (
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="card p-5">
              <div className="flex items-start gap-4">
                <Avatar name={r.customerName} size={44} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-ink-900">{r.customerName}</p>
                    <span className="text-sm text-ink-400">{r.date}</span>
                  </div>
                  <Rating value={r.rating} size={14} />
                  <p className="text-ink-600 mt-2">{r.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
