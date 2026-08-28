import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search, MapPin, Star, Shield, Clock, Users, Briefcase, CheckCircle2,
  Sparkles, ArrowRight, Quote, TrendingUp, Award, HandshakeIcon, Star as StarIcon,
} from 'lucide-react'
import PublicNavbar from '../components/layout/PublicNavbar'
import Footer from '../components/layout/Footer'
import Avatar from '../components/ui/Avatar'
import Rating from '../components/ui/Rating'
import { SERVICE_CATEGORIES, PROVIDERS, TESTIMONIALS, PLATFORM_STATS } from '../data/mockData'
import * as Icons from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')

  const featured = PROVIDERS.filter(p => p.verified).slice(0, 4)

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/services')
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <Sparkles size={14} /> Smart India Hackathon · SIH26089
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 leading-[1.05] mb-5">
                Find trusted help <br />around you
              </h1>
              <p className="text-lg text-ink-500 mb-8 max-w-lg">
                Co-Serve connects you with verified local service providers for household and community needs — cleaning, plumbing, repairs, cooking, elderly care and more.
              </p>

              <form onSubmit={handleSearch} className="card p-2 flex flex-col sm:flex-row gap-2 max-w-xl">
                <div className="flex items-center gap-2 flex-1 px-3">
                  <MapPin size={18} className="text-ink-400 shrink-0" />
                  <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Your location" className="w-full py-2.5 outline-none text-ink-800 placeholder-ink-400" />
                </div>
                <div className="flex items-center gap-2 flex-1 px-3 border-t sm:border-t-0 sm:border-l border-ink-100">
                  <Search size={18} className="text-ink-400 shrink-0" />
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="What service do you need?" className="w-full py-2.5 outline-none text-ink-800 placeholder-ink-400" />
                </div>
                <button type="submit" className="btn-primary px-6">Search</button>
              </form>

              <div className="flex items-center gap-6 mt-8 text-sm text-ink-500">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success-500" /> Verified Providers</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success-500" /> Secure Payments</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success-500" /> 24/7 Support</div>
              </div>
            </div>

            <div className="relative hidden md:block animate-fade-in">
              <div className="relative">
                <div className="card p-6 rotate-2 transition hover:rotate-0 duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar src={PROVIDERS[1].avatar} name={PROVIDERS[1].name} size={48} />
                    <div>
                      <p className="font-semibold text-ink-900">{PROVIDERS[1].name}</p>
                      <p className="text-sm text-ink-400">Cleaning Expert</p>
                    </div>
                    <span className="ml-auto badge bg-success-100 text-success-700">Available</span>
                  </div>
                  <Rating value={PROVIDERS[1].rating} showValue count={PROVIDERS[1].reviewsCount} />
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-100">
                    <div><p className="text-xs text-ink-400">Experience</p><p className="font-bold text-ink-900">{PROVIDERS[1].experience} yrs</p></div>
                    <div><p className="text-xs text-ink-400">Jobs Done</p><p className="font-bold text-ink-900">{PROVIDERS[1].jobsDone}+</p></div>
                    <div><p className="text-xs text-ink-400">From</p><p className="font-bold text-primary-600">₹{PROVIDERS[1].serviceRate}</p></div>
                  </div>
                </div>
                <div className="card p-4 absolute -bottom-6 -left-6 w-48 -rotate-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-success-100 flex items-center justify-center"><TrendingUp size={16} className="text-success-600" /></div>
                    <p className="text-sm font-semibold text-ink-900">Match 96%</p>
                  </div>
                  <p className="text-xs text-ink-400">Based on distance, skill & rating</p>
                </div>
                <div className="card p-4 absolute -top-4 -right-4 w-44 rotate-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center"><Shield size={16} className="text-primary-600" /></div>
                    <p className="text-sm font-semibold text-ink-900">Verified</p>
                  </div>
                  <p className="text-xs text-ink-400 mt-1">Background-checked & rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="mb-2">Popular Service Categories</h2>
          <p className="text-ink-400">Browse from a wide range of household and community services</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {SERVICE_CATEGORIES.map(cat => {
            const Icon = Icons[cat.icon]
            const colorMap = {
              primary: 'bg-primary-100 text-primary-600', warning: 'bg-warning-100 text-warning-600',
              accent: 'bg-accent-100 text-accent-600', success: 'bg-success-100 text-success-600',
              error: 'bg-error-100 text-error-600', ink: 'bg-ink-100 text-ink-600',
            }
            return (
              <Link key={cat.id} to="/services"
                className="card p-5 text-center hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group">
                <div className={`w-12 h-12 rounded-xl ${colorMap[cat.color]} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  {Icon && <Icon size={24} />}
                </div>
                <p className="text-sm font-semibold text-ink-800">{cat.name}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="mb-2">How Co-Serve Works</h2>
            <p className="text-ink-400">Get your service done in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Search', title: 'Search & Discover', desc: 'Find trusted service providers near you based on your needs and location.', step: '01' },
              { icon: 'CalendarCheck', title: 'Book & Schedule', desc: 'Choose a provider, pick a time slot, and confirm your service request in seconds.', step: '02' },
              { icon: 'CheckCircle2', title: 'Relax & Done', desc: 'Track your request in real-time. Rate your experience after the job is completed.', step: '03' },
            ].map((s) => {
              const Icon = Icons[s.icon]
              return (
                <div key={s.step} className="relative card p-8 text-center">
                  <span className="absolute top-4 right-5 text-5xl font-bold text-ink-100">{s.step}</span>
                  <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-5">
                    {Icon && <Icon size={28} className="text-primary-600" />}
                  </div>
                  <h3 className="text-xl font-bold text-ink-900 mb-2">{s.title}</h3>
                  <p className="text-ink-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured providers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="mb-2">Featured Service Providers</h2>
            <p className="text-ink-400">Top-rated, verified professionals near you</p>
          </div>
          <Link to="/services" className="btn-secondary">View all <ArrowRight size={16} /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map(p => (
            <div key={p.id} className="card p-5 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Avatar src={p.avatar} name={p.name} size={48} />
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900 truncate">{p.name}</p>
                  <p className="text-sm text-ink-400 capitalize">{p.category}</p>
                </div>
              </div>
              <Rating value={p.rating} showValue count={p.reviewsCount} />
              <div className="flex items-center gap-1.5 text-sm text-ink-500 mt-3">
                <MapPin size={14} /> {p.area}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-100">
                <span className="text-sm text-ink-400">{p.experience} yrs exp</span>
                <span className="font-bold text-primary-600">₹{p.serviceRate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: `${PLATFORM_STATS.totalUsers.toLocaleString()}+`, label: 'Happy Customers', icon: Users },
              { value: `${PLATFORM_STATS.totalProviders.toLocaleString()}+`, label: 'Service Providers', icon: Briefcase },
              { value: `${PLATFORM_STATS.completedServices.toLocaleString()}+`, label: 'Services Completed', icon: CheckCircle2 },
              { value: PLATFORM_STATS.avgRating, label: 'Average Rating', icon: Star },
            ].map((s, i) => (
              <div key={i}>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <s.icon size={24} />
                </div>
                <p className="text-3xl md:text-4xl font-bold mb-1">{s.value}</p>
                <p className="text-primary-100 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety / Trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="card p-8 md:p-12 bg-gradient-to-br from-ink-50 to-primary-50 border-ink-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-success-100 text-success-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                <Shield size={14} /> Trust & Safety
              </div>
              <h2 className="mb-4">Your safety is our priority</h2>
              <p className="text-ink-500 mb-6">
                Every provider on Co-Serve is background-verified, rated by real customers, and continuously monitored for quality. We ensure a safe and reliable experience for every booking.
              </p>
              <div className="space-y-3">
                {[
                  { icon: 'ShieldCheck', title: 'Verified Providers', desc: 'ID and background checks for every worker' },
                  { icon: 'Star', title: 'Real Reviews', desc: 'Genuine ratings from completed jobs only' },
                  { icon: 'ShieldAlert', title: '24/7 Support', desc: 'Report issues anytime, we act fast' },
                ].map(f => {
                  const Icon = Icons[f.icon]
                  return (
                    <div key={f.title} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                        {Icon && <Icon size={18} className="text-primary-600" />}
                      </div>
                      <div>
                        <p className="font-semibold text-ink-900">{f.title}</p>
                        <p className="text-sm text-ink-400">{f.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="relative">
              <div className="card p-6 max-w-sm mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-success-100 flex items-center justify-center"><Shield size={24} className="text-success-600" /></div>
                  <div><p className="font-bold text-ink-900">Verified Badge</p><p className="text-sm text-ink-400">Trust at a glance</p></div>
                </div>
                <div className="space-y-2.5">
                  {['Identity Verified', 'Background Check', 'Address Confirmed', 'Skill Assessed'].map(v => (
                    <div key={v} className="flex items-center gap-2 text-sm text-ink-600">
                      <CheckCircle2 size={16} className="text-success-500" /> {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="mb-2">What People Say</h2>
            <p className="text-ink-400">Real stories from our customers and gig workers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="card p-6">
                <Quote size={28} className="text-primary-200 mb-4" />
                <p className="text-ink-600 leading-relaxed mb-5">{t.text}</p>
                <Rating value={t.rating} />
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-ink-100">
                  <Avatar src={t.avatar} name={t.name} size={44} />
                  <div>
                    <p className="font-semibold text-ink-900">{t.name}</p>
                    <p className="text-sm text-ink-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-primary-600 px-6 py-16 md:py-20 text-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="relative">
            <h2 className="text-white mb-4">Ready to find trusted help?</h2>
            <p className="text-primary-100 mb-8 max-w-lg mx-auto">
              Join thousands of households and gig workers building a stronger local economy with Co-Serve.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="btn bg-white text-primary-700 px-6 py-3 hover:bg-primary-50 font-semibold">
                Get Started as Customer <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="btn bg-primary-500 text-white px-6 py-3 hover:bg-primary-400 font-semibold border border-primary-400">
                Become a Provider
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
