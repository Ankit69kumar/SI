import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { MapPin, Calendar, Clock, FileText, Image as ImageIcon, Sparkles, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { SERVICE_CATEGORIES, matchProviders, getProvider, getCategory } from '../../data/mockData'
import Avatar from '../../components/ui/Avatar'
import Rating from '../../components/ui/Rating'
import ProgressBar from '../../components/ui/ProgressBar'
import * as Icons from 'lucide-react'
import { useNotifications as useNotifCtx } from '../../context/NotificationContext'

export default function CreateRequest() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { addNotification } = useNotifCtx()
  const presetProvider = params.get('provider')
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    category: '', serviceName: '', description: '', date: '', time: '', location: '', providerId: presetProvider || '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const recommendations = form.category ? matchProviders({ category: form.category, location: form.location }) : []
  const selectedProvider = form.providerId ? getProvider(form.providerId) : null

  const handleNext = () => {
    setError('')
    if (step === 1 && !form.category) { setError('Please select a service category'); return }
    if (step === 2 && (!form.serviceName || !form.date || !form.time || !form.location)) { setError('Please fill all required fields'); return }
    setStep(s => s + 1)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    addNotification({ type: 'new_request', title: 'Request Submitted', message: `Your ${form.serviceName} request has been created. Nearby providers will be notified.` })
  }

  if (submitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="card p-10 text-center animate-slide-up">
          <div className="w-16 h-16 rounded-2xl bg-success-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-ink-900 mb-2">Request Created!</h2>
          <p className="text-ink-400 mb-6">Your service request for "{form.serviceName}" has been submitted. {selectedProvider ? `${selectedProvider.name} will be notified.` : 'Nearby providers will be notified.'}</p>
          <div className="flex gap-3 justify-center">
            <Link to="/customer/bookings" className="btn-primary">View My Bookings</Link>
            <Link to="/customer/dashboard" className="btn-secondary">Go to Dashboard</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="btn-ghost -ml-2">
        <ArrowLeft size={18} /> {step > 1 ? 'Back' : 'Back'}
      </button>

      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">Create Service Request</h2>
        <p className="text-ink-400">Step {step} of 3 — {step === 1 ? 'Select service' : step === 2 ? 'Details & schedule' : 'Choose provider'}</p>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-primary-600' : 'bg-ink-100'}`} />
        ))}
      </div>

      {error && <div className="p-3 rounded-lg bg-error-50 text-error-600 text-sm">{error}</div>}

      {step === 1 && (
        <div className="card p-6">
          <h3 className="font-bold text-ink-900 mb-4">What service do you need?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {SERVICE_CATEGORIES.map(c => {
              const Icon = Icons[c.icon]
              const sel = form.category === c.id
              return (
                <button key={c.id} onClick={() => set('category', c.id)}
                  className={`p-4 rounded-xl border-2 text-center transition ${sel ? 'border-primary-500 bg-primary-50' : 'border-ink-100 hover:border-ink-200'}`}>
                  {Icon && <Icon size={26} className={sel ? 'text-primary-600 mx-auto mb-2' : 'text-ink-500 mx-auto mb-2'} />}
                  <p className="text-sm font-medium text-ink-800">{c.name}</p>
                </button>
              )
            })}
          </div>
          <div className="flex justify-end mt-6"><button className="btn-primary" onClick={handleNext}>Continue <ArrowRight size={16} /></button></div>
        </div>
      )}

      {step === 2 && (
        <div className="card p-6 space-y-5">
          <h3 className="font-bold text-ink-900">Service Details</h3>
          <div>
            <label className="label">Service Name <span className="text-error-500">*</span></label>
            <input value={form.serviceName} onChange={e => set('serviceName', e.target.value)} placeholder="e.g. Deep Home Cleaning" className="input" />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Describe what needs to be done..." className="input resize-none" />
          </div>
          <div>
            <label className="label">Reference Image (optional)</label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-ink-200 rounded-xl py-8 cursor-pointer hover:bg-ink-50">
              <ImageIcon size={24} className="text-ink-400" />
              <span className="text-sm text-ink-400">Click to upload an image</span>
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Date <span className="text-error-500">*</span></label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className="input pl-10" />
              </div>
            </div>
            <div>
              <label className="label">Time <span className="text-error-500">*</span></label>
              <div className="relative">
                <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="time" value={form.time} onChange={e => set('time', e.target.value)} className="input pl-10" />
              </div>
            </div>
          </div>
          <div>
            <label className="label">Location <span className="text-error-500">*</span></label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Enter your address" className="input pl-10" />
            </div>
            <button className="text-sm text-primary-600 font-medium mt-2 hover:underline">Use my current location</button>
          </div>
          <div className="flex justify-end mt-2"><button className="btn-primary" onClick={handleNext}>Continue <ArrowRight size={16} /></button></div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-primary-600" />
              <h3 className="font-bold text-ink-900">Recommended Providers</h3>
            </div>
            <p className="text-sm text-ink-400 mb-4">Smart matching based on distance, skill, rating, availability, experience & workload.</p>
            {recommendations.length === 0 ? (
              <p className="text-ink-400 text-center py-6">No providers available for this category nearby.</p>
            ) : (
              <div className="space-y-3">
                {recommendations.slice(0, 4).map(p => (
                  <button key={p.id} onClick={() => set('providerId', p.id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 text-left transition ${form.providerId === p.id ? 'border-primary-500 bg-primary-50' : 'border-ink-100 hover:border-ink-200'}`}>
                    <Avatar src={p.avatar} name={p.name} size={48} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-ink-900 truncate">{p.name}</p>
                        {p.verified && <CheckCircle2 size={14} className="text-primary-500" />}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-ink-400">
                        <Rating value={p.rating} size={12} showValue /> · {p.distance} km · ₹{p.serviceRate}
                      </div>
                      <ProgressBar value={p.match} color="success" label="Match" />
                    </div>
                    {form.providerId === p.id && <CheckCircle2 size={20} className="text-primary-600 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-ink-100">
              <label className="flex items-center gap-2 text-sm text-ink-500">
                <input type="checkbox" checked={!form.providerId} onChange={e => e.target.checked && set('providerId', '')} className="rounded text-primary-600" />
                Let the platform auto-assign the best provider
              </label>
            </div>
          </div>
          <div className="card p-5 bg-ink-50">
            <div className="flex justify-between text-sm mb-2"><span className="text-ink-400">Service</span><span className="font-medium text-ink-800">{form.serviceName}</span></div>
            <div className="flex justify-between text-sm mb-2"><span className="text-ink-400">Date & Time</span><span className="font-medium text-ink-800">{form.date} at {form.time}</span></div>
            <div className="flex justify-between text-sm mb-2"><span className="text-ink-400">Location</span><span className="font-medium text-ink-800">{form.location}</span></div>
            <div className="flex justify-between text-sm"><span className="text-ink-400">Provider</span><span className="font-medium text-ink-800">{selectedProvider?.name || 'Auto-assign'}</span></div>
          </div>
          <div className="flex justify-end"><button className="btn-primary" onClick={handleSubmit}>Submit Request <ArrowRight size={16} /></button></div>
        </div>
      )}
    </div>
  )
}
