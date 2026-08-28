import { TrendingUp, Users, IndianRupee, Briefcase, PieChart, BarChart3 } from 'lucide-react'
import StatCard from '../../components/ui/StatCard'
import { ANALYTICS_DATA, PLATFORM_STATS } from '../../data/mockData'

function DonutChart({ data, size = 180 }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const radius = size / 2 - 20
  const cx = size / 2, cy = size / 2
  let angle = 0
  const segments = data.map(d => {
    const pct = d.value / total
    const startAngle = angle
    angle += pct * 360
    const endAngle = angle
    const largeArc = pct > 0.5 ? 1 : 0
    const x1 = cx + radius * Math.cos((startAngle - 90) * Math.PI / 180)
    const y1 = cy + radius * Math.sin((startAngle - 90) * Math.PI / 180)
    const x2 = cx + radius * Math.cos((endAngle - 90) * Math.PI / 180)
    const y2 = cy + radius * Math.sin((endAngle - 90) * Math.PI / 180)
    return { d: `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`, color: d.color, name: d.name, pct: (pct * 100).toFixed(0) }
  })
  return (
    <div className="flex items-center gap-6 flex-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((s, i) => <path key={i} d={s.d} fill={s.color} stroke="white" strokeWidth={2} />)}
        <circle cx={cx} cy={cy} r={radius * 0.6} fill="white" />
        <text x={cx} y={cy} textAnchor="middle" dy="-2" className="fill-ink-900 text-lg font-bold">{total}%</text>
        <text x={cx} y={cy} textAnchor="middle" dy="16" className="fill-ink-400 text-xs">Total</text>
      </svg>
      <div className="space-y-2">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-sm" style={{ background: s.color }} />
            <span className="text-ink-600">{s.name}</span>
            <span className="font-semibold text-ink-900">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminAnalytics() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">Analytics</h2>
        <p className="text-ink-400">Platform performance and insights</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value={PLATFORM_STATS.totalUsers.toLocaleString()} trend="+12% MoM" color="primary" />
        <StatCard icon={Briefcase} label="Completed Jobs" value={PLATFORM_STATS.completedServices.toLocaleString()} trend="+8% MoM" color="success" />
        <StatCard icon={IndianRupee} label="Revenue" value={`₹${(PLATFORM_STATS.revenue / 100000).toFixed(1)}L`} trend="+18% MoM" color="accent" />
        <StatCard icon={TrendingUp} label="Avg Rating" value={PLATFORM_STATS.avgRating} color="warning" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={20} className="text-primary-600" />
            <h3 className="font-bold text-ink-900">Monthly Revenue</h3>
          </div>
          <div className="flex items-end gap-3 h-48">
            {ANALYTICS_DATA.monthlyRevenue.map((e, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-ink-600">₹{(e.amount / 1000).toFixed(0)}k</span>
                <div className="w-full bg-primary-100 rounded-t-lg flex items-end" style={{ height: '100%' }}>
                  <div className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-500" style={{ height: `${(e.amount / 421000) * 100}%` }} />
                </div>
                <span className="text-xs text-ink-400">{e.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart size={20} className="text-primary-600" />
            <h3 className="font-bold text-ink-900">Service Categories</h3>
          </div>
          <DonutChart data={ANALYTICS_DATA.categoryDistribution} />
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={20} className="text-primary-600" />
          <h3 className="font-bold text-ink-900">User Growth</h3>
        </div>
        <div className="flex items-end gap-3 h-48">
          {ANALYTICS_DATA.userGrowth.map((e, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-ink-600">{(e.users / 1000).toFixed(1)}k</span>
              <div className="w-full bg-success-100 rounded-t-lg flex items-end" style={{ height: '100%' }}>
                <div className="w-full bg-gradient-to-t from-success-600 to-success-400 rounded-t-lg transition-all duration-500" style={{ height: `${(e.users / 4827) * 100}%` }} />
              </div>
              <span className="text-xs text-ink-400">{e.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
