import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, SlidersHorizontal, Star, CheckCircle2 } from 'lucide-react'
import { SERVICE_CATEGORIES, PROVIDERS, getCategory } from '../../data/mockData'
import Avatar from '../../components/ui/Avatar'
import Rating from '../../components/ui/Rating'
import * as Icons from 'lucide-react'

export default function Services() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('rating')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    let list = PROVIDERS.filter(p => {
      if (category !== 'all' && p.category !== category) return false
      if (availableOnly && !p.available) return false
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.skills.join(' ').toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
    if (sort === 'rating') list = list.sort((a, b) => b.rating - a.rating)
    if (sort === 'distance') list = list.sort((a, b) => a.distance - b.distance)
    if (sort === 'price') list = list.sort((a, b) => a.serviceRate - b.serviceRate)
    return list
  }, [category, query, sort, availableOnly])

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">Browse Services</h2>
        <p className="text-ink-400">Find trusted service providers near you</p>
      </div>

      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or skill..." className="input pl-10" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="input md:w-56">
            <option value="all">All Categories</option>
            {SERVICE_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} className="input md:w-44">
            <option value="rating">Top Rated</option>
            <option value="distance">Nearest</option>
            <option value="price">Lowest Price</option>
          </select>
          <label className="flex items-center gap-2 px-3 rounded-lg border border-ink-200 cursor-pointer text-sm text-ink-600">
            <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="rounded text-primary-600 focus:ring-primary-500" />
            Available now
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setCategory('all')} className={`badge px-3 py-1.5 text-sm ${category === 'all' ? 'bg-primary-600 text-white' : 'bg-white border border-ink-200 text-ink-600 hover:bg-ink-50'}`}>All</button>
        {SERVICE_CATEGORIES.map(c => {
          const Icon = Icons[c.icon]
          return (
            <button key={c.id} onClick={() => setCategory(c.id)} className={`badge px-3 py-1.5 text-sm ${category === c.id ? 'bg-primary-600 text-white' : 'bg-white border border-ink-200 text-ink-600 hover:bg-ink-50'}`}>
              {Icon && <Icon size={14} />} {c.name}
            </button>
          )
        })}
      </div>

      <div>
        <p className="text-sm text-ink-400 mb-4">{filtered.length} providers found</p>
        {loading ? (
          <div className="py-16 text-center text-ink-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="card py-16 text-center">
            <p className="text-ink-400 mb-2">No providers match your filters.</p>
            <button onClick={() => { setCategory('all'); setQuery(''); setAvailableOnly(false) }} className="btn-secondary">Clear filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(p => {
              const cat = getCategory(p.category)
              const Icon = cat && Icons[cat.icon]
              return (
                <Link key={p.id} to={`/customer/providers/${p.id}`} className="card p-5 hover:shadow-card-hover transition-all group">
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar src={p.avatar} name={p.name} size={56} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-ink-900 truncate">{p.name}</p>
                        {p.verified && <CheckCircle2 size={16} className="text-primary-500 shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-ink-400">
                        {Icon && <Icon size={14} />} {cat?.name}
                      </div>
                      <Rating value={p.rating} size={14} showValue count={p.reviewsCount} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink-500 mb-4">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {p.distance} km</span>
                    <span>·</span>
                    <span>{p.experience} yrs exp</span>
                    <span>·</span>
                    <span>{p.jobsDone}+ jobs</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-ink-100">
                    <span className={`badge ${p.available ? 'bg-success-100 text-success-700' : 'bg-ink-100 text-ink-500'}`}>{p.available ? 'Available' : 'Busy'}</span>
                    <span className="font-bold text-primary-600">₹{p.serviceRate}<span className="text-xs font-normal text-ink-400">/visit</span></span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
