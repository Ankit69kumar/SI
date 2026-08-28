import { useState } from 'react'
import { Mail, Phone, MapPin, Calendar, Save, User, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../../components/ui/Avatar'

export default function CustomerProfile() {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', location: user?.location || '' })
  const [saved, setSaved] = useState(false)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">My Profile</h2>
        <p className="text-ink-400">Manage your personal information</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar src={user?.avatar} name={user?.name} size={80} />
          <div>
            <h3 className="font-bold text-ink-900 text-lg">{user?.name}</h3>
            <p className="text-sm text-ink-400">Member since {user?.joined || '2026'}</p>
            <span className="badge bg-success-100 text-success-700 mt-1"><CheckCircle2 size={12} /> Active</span>
          </div>
        </div>

        {saved && <div className="mb-4 p-3 rounded-lg bg-success-50 text-success-700 text-sm flex items-center gap-2"><CheckCircle2 size={16} /> Profile updated successfully.</div>}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input value={form.name} onChange={e => set('name', e.target.value)} className="input pl-10" />
            </div>
          </div>
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="input pl-10" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Phone</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input value={form.phone} onChange={e => set('phone', e.target.value)} className="input pl-10" />
              </div>
            </div>
            <div>
              <label className="label">Location</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input value={form.location} onChange={e => set('location', e.target.value)} className="input pl-10" />
              </div>
            </div>
          </div>
          <button type="submit" className="btn-primary"><Save size={18} /> Save Changes</button>
        </form>
      </div>
    </div>
  )
}
