import { Link } from 'react-router-dom'
import { Briefcase, IndianRupee, Star, TrendingUp, CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react'
import StatCard from '../../components/ui/StatCard'
import Avatar from '../../components/ui/Avatar'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import { PROVIDER_JOBS, EARNINGS_DATA, CURRENT_PROVIDER } from '../../data/mockData'

export default function ProviderDashboard() {
  const activeJobs = PROVIDER_JOBS.filter(j => ['accepted', 'in_progress'].includes(j.status))
  const completed = PROVIDER_JOBS.filter(j => j.status === 'completed')
  const monthlyEarning = EARNINGS_DATA[EARNINGS_DATA.length - 1].amount
  const totalEarning = EARNINGS_DATA.reduce((s, e) => s + e.amount, 0)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">Welcome back, {CURRENT_PROVIDER.name.split(' ')[0]}!</h2>
        <p className="text-ink-400">Manage your jobs and earnings.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Briefcase} label="Active Jobs" value={activeJobs.length} color="primary" />
        <StatCard icon={CheckCircle2} label="Completed" value={completed.length} color="success" />
        <StatCard icon={IndianRupee} label="This Month" value={`₹${monthlyEarning.toLocaleString()}`} trend="+12% from last month" color="accent" />
        <StatCard icon={Star} label="Rating" value={CURRENT_PROVIDER.rating} color="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-ink-900">Active Jobs</h3>
              <Link to="/provider/jobs" className="text-sm text-primary-600 font-medium hover:underline">View all</Link>
            </div>
            {activeJobs.length === 0 ? (
              <EmptyState icon={Briefcase} title="No active jobs" description="New requests will appear here." />
            ) : (
              <div className="space-y-3">
                {activeJobs.map(j => (
                  <div key={j.id} className="flex items-center gap-4 p-3 rounded-xl border border-ink-100">
                    <Avatar src={j.customerAvatar} name={j.customerName} size={44} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-ink-900 truncate">{j.serviceName}</p>
                      <p className="text-sm text-ink-400">{j.customerName} · {j.date} at {j.time}</p>
                    </div>
                    <StatusBadge status={j.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-ink-900 mb-4">Earnings Overview</h3>
            <div className="flex items-end gap-2 h-40">
              {EARNINGS_DATA.map((e, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary-100 rounded-t-lg relative group flex items-end" style={{ height: '100%' }}>
                    <div className="w-full bg-primary-500 rounded-t-lg transition-all duration-500 group-hover:bg-primary-600" style={{ height: `${(e.amount / 52300) * 100}%` }} />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-ink-700 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">₹{(e.amount / 1000).toFixed(1)}k</span>
                  </div>
                  <span className="text-xs text-ink-400">{e.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="font-bold text-ink-900 mb-4">Quick Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-ink-400">Total Earnings</span><span className="font-bold text-ink-900">₹{totalEarning.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Jobs This Month</span><span className="font-bold text-ink-900">{CURRENT_PROVIDER.completedThisMonth}</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Response Time</span><span className="font-bold text-ink-900">10 mins</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Service Area</span><span className="font-bold text-ink-900">{CURRENT_PROVIDER.area}</span></div>
            </div>
            <Link to="/provider/earnings" className="btn-secondary w-full mt-4">View Earnings <ArrowRight size={14} /></Link>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-ink-900 mb-2">Set Availability</h3>
            <p className="text-sm text-ink-400 mb-4">Toggle your availability to receive requests.</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink-700">{CURRENT_PROVIDER.available ? 'Available' : 'Busy'}</span>
              <button className={`relative w-12 h-6 rounded-full transition ${CURRENT_PROVIDER.available ? 'bg-success-500' : 'bg-ink-200'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${CURRENT_PROVIDER.available ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
