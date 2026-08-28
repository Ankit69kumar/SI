import { useState } from 'react'
import { Mail, Phone, MapPin, Save, User, CheckCircle2, Briefcase, IndianRupee, Star } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../../components/ui/Avatar'
import Rating from '../../components/ui/Rating'
import { SERVICE_CATEGORIES } from '../../data/mockData'
import * as Icons from 'lucide-react'

export default function ProviderProfile() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', phone: user?.phone || '',
    area: user?.area || '', experience: user?.experience || 0,
    hourlyRate: user?.hourlyRate || 0, serviceRate: user?.serviceRate || 0,
    bio: user?.bio || '',
  })
  const [saved, setSaved] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState(user?.skills || [])
  const [available, setAvailable] = useState(user?.available ?? true)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const toggleSkill = (s) => setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const skillOptions = ['Pipe Repair', 'Leakage Fix', 'Home Cleaning', 'Deep Clean', 'Wiring', 'Furniture Repair', 'AC Repair', 'Tiffin Service', 'Elderly Care', 'Garden Maintenance', 'Interior Painting', 'Parcel Delivery']

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">Provider Profile</h2>
        <p className="text-ink-400">Manage your professional details and availability</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar src={user?.avatar} name={user?.name} size={80} />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-ink-900 text-lg">{user?.name}</h3>
              {user?.verified && <span className="badge bg-primary-100 text-primary-700"><CheckCircle2 size={12} /> Verified</span>}
            </div>
            <Rating value={user?.rating || 5} size={16} showValue count={user?.reviewsCount} />
            <p className="text-sm text-ink-400 mt-1">{user?.jobsDone}+ jobs completed</p>
          </div>
        </div>

        {saved && <div className="mb-4 p-3 rounded-lg bg-success-50 text-success-700 text-sm flex items-center gap-2"><CheckCircle2 size={16} /> Profile updated successfully.</div>}

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="label">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input value={form.name} onChange={e => set('name', e.target.value)} className="input pl-10" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="input pl-10" />
              </div>
            </div>
            <div>
              <label className="label">Phone</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input value={form.phone} onChange={e => set('phone', e.target.value)} className="input pl-10" />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Service Area</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input value={form.area} onChange={e => set('area', e.target.value)} className="input pl-10" />
              </div>
            </div>
            <div>
              <label className="label">Experience (years)</label>
              <div className="relative">
                <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="number" value={form.experience} onChange={e => set('experience', Number(e.target.value))} className="input pl-10" />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Hourly Rate (₹)</label>
              <div className="relative">
                <IndianRupee size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="number" value={form.hourlyRate} onChange={e => set('hourlyRate', Number(e.target.value))} className="input pl-10" />
              </div>
            </div>
            <div>
              <label className="label">Service Rate (₹/visit)</label>
              <div className="relative">
                <IndianRupee size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input type="number" value={form.serviceRate} onChange={e => set('serviceRate', Number(e.target.value))} className="input pl-10" />
              </div>
            </div>
          </div>
          <div>
            <label className="label">Bio</label>
            <textarea value={form.bio} onChange={e => set('bio', e.target.value)} rows={3} className="input resize-none" />
          </div>
          <div>
            <label className="label">Skills</label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map(s => (
                <button type="button" key={s} onClick={() => toggleSkill(s)}
                  className={`badge px-3 py-1.5 text-sm ${selectedSkills.includes(s) ? 'bg-primary-600 text-white' : 'bg-white border border-ink-200 text-ink-600 hover:bg-ink-50'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Availability</label>
            <div className="flex items-center justify-between p-3 rounded-lg border border-ink-200">
              <span className="text-sm font-medium text-ink-700">{available ? 'Available for new jobs' : 'Currently busy'}</span>
              <button type="button" onClick={() => setAvailable(!available)} className={`relative w-12 h-6 rounded-full transition ${available ? 'bg-success-500' : 'bg-ink-200'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${available ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary"><Save size={18} /> Save Changes</button>
        </form>
      </div>
    </div>
  )
}
