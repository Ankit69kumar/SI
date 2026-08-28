import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, CheckCircle2, Clock, Briefcase, Star, ArrowLeft, Calendar, IndianRupee, Shield } from 'lucide-react'
import { getProvider, getReviewsFor, getCategory } from '../../data/mockData'
import Avatar from '../../components/ui/Avatar'
import Rating from '../../components/ui/Rating'
import { StatusBadge } from '../../components/ui/Badge'
import * as Icons from 'lucide-react'

export default function ProviderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const provider = getProvider(id)

  if (!provider) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="card p-12 text-center">
          <p className="text-ink-400 mb-4">Provider not found.</p>
          <Link to="/customer/services" className="btn-primary">Back to Services</Link>
        </div>
      </div>
    )
  }

  const reviews = getReviewsFor(provider.id)
  const cat = getCategory(provider.category)
  const Icon = cat && Icons[cat.icon]

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="btn-ghost -ml-2"><ArrowLeft size={18} /> Back</button>

      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar src={provider.avatar} name={provider.name} size={96} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-ink-900">{provider.name}</h2>
              {provider.verified && (
                <span className="badge bg-primary-100 text-primary-700"><CheckCircle2 size={14} /> Verified</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-ink-500 mb-3">
              {Icon && <Icon size={18} />} <span className="font-medium">{cat?.name}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Rating value={provider.rating} showValue count={provider.reviewsCount} />
              <span className="flex items-center gap-1 text-ink-500"><MapPin size={14} /> {provider.area} · {provider.distance} km</span>
              <span className="flex items-center gap-1 text-ink-500"><Briefcase size={14} /> {provider.jobsDone}+ jobs</span>
              <span className="flex items-center gap-1 text-ink-500"><Clock size={14} /> {provider.responseTime}</span>
            </div>
            <p className="text-ink-600 mt-4 max-w-2xl">{provider.bio}</p>
          </div>
          <div className="md:text-right">
            <p className="text-3xl font-bold text-primary-600">₹{provider.serviceRate}</p>
            <p className="text-sm text-ink-400">per visit</p>
            <Link to={`/customer/create-request?provider=${provider.id}`} className="btn-primary mt-3 w-full md:w-auto">Book Now</Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="card p-6">
            <h3 className="font-bold text-ink-900 mb-4">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {provider.skills.map(s => <span key={s} className="badge bg-primary-50 text-primary-700 px-3 py-1.5">{s}</span>)}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-ink-900 mb-4">Reviews ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <p className="text-ink-400 text-center py-8">No reviews yet.</p>
            ) : (
              <div className="space-y-5">
                {reviews.map(r => (
                  <div key={r.id} className="pb-5 border-b border-ink-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-ink-900">{r.customerName}</p>
                      <span className="text-sm text-ink-400">{r.date}</span>
                    </div>
                    <Rating value={r.rating} size={14} />
                    <p className="text-ink-600 mt-2">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-bold text-ink-900 mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-ink-400">Experience</span><span className="font-semibold text-ink-800">{provider.experience} years</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Jobs Completed</span><span className="font-semibold text-ink-800">{provider.jobsDone}+</span></div>
              <div className="flex justify-between"><span className="text-ink-400">This Month</span><span className="font-semibold text-ink-800">{provider.completedThisMonth}</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Active Jobs</span><span className="font-semibold text-ink-800">{provider.activeJobs}</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Hourly Rate</span><span className="font-semibold text-ink-800">₹{provider.hourlyRate}/hr</span></div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={18} className="text-primary-600" />
              <h3 className="font-bold text-ink-900">Safety</h3>
            </div>
            <div className="space-y-2 text-sm text-ink-600">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success-500" /> ID Verified</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success-500" /> Background Checked</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success-500" /> Address Confirmed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
