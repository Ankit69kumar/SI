import { Link } from 'react-router-dom'
import { Users, HardHat, ClipboardList, IndianRupee, TrendingUp, ArrowRight, Activity, CheckCircle2 } from 'lucide-react'
import StatCard from '../../components/ui/StatCard'
import { StatusBadge } from '../../components/ui/Badge'
import { PLATFORM_STATS, ADMIN_REQUESTS, ADMIN_USERS, PROVIDERS, ANALYTICS_DATA } from '../../data/mockData'

export default function AdminDashboard() {
  const recentRequests = ADMIN_REQUESTS.slice(0, 5)
  const pendingProviders = ADMIN_USERS.filter(u => u.role === 'provider' && !u.verified)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900 mb-1">Admin Dashboard</h2>
        <p className="text-ink-400">Platform overview and management</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value={PLATFORM_STATS.totalUsers.toLocaleString()} trend="+124 this week" color="primary" />
        <StatCard icon={HardHat} label="Service Providers" value={PLATFORM_STATS.totalProviders.toLocaleString()} color="warning" />
        <StatCard icon={ClipboardList} label="Active Requests" value={PLATFORM_STATS.activeRequests} color="accent" />
        <StatCard icon={IndianRupee} label="Revenue" value={`₹${(PLATFORM_STATS.revenue / 100000).toFixed(1)}L`} trend="+18% this month" color="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-ink-900">Recent Service Requests</h3>
              <Link to="/admin/requests" className="text-sm text-primary-600 font-medium hover:underline">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-100 text-ink-400 text-left">
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Service</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map(r => (
                    <tr key={r.id} className="border-b border-ink-50 last:border-0">
                      <td className="py-3 font-medium text-ink-700">{r.id}</td>
                      <td className="py-3 text-ink-600">{r.customer}</td>
                      <td className="py-3 text-ink-600">{r.service}</td>
                      <td className="py-3"><StatusBadge status={r.status} /></td>
                      <td className="py-3 text-right font-semibold text-ink-800">₹{r.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-ink-900 mb-4">Revenue Trend</h3>
            <div className="flex items-end gap-3 h-40">
              {ANALYTICS_DATA.monthlyRevenue.map((e, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary-100 rounded-t-lg flex items-end" style={{ height: '100%' }}>
                    <div className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-500" style={{ height: `${(e.amount / 421000) * 100}%` }} />
                  </div>
                  <span className="text-xs text-ink-400">{e.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-ink-900">Pending Verifications</h3>
              <Link to="/admin/providers" className="text-sm text-primary-600 font-medium hover:underline">View</Link>
            </div>
            {pendingProviders.length === 0 ? (
              <p className="text-ink-400 text-sm text-center py-4">No pending verifications.</p>
            ) : (
              <div className="space-y-3">
                {pendingProviders.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border border-ink-100">
                    <div>
                      <p className="font-semibold text-ink-900 text-sm">{p.name}</p>
                      <p className="text-xs text-ink-400">{p.email}</p>
                    </div>
                    <Link to="/admin/providers" className="btn-secondary text-xs px-3 py-1.5">Review</Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-ink-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/admin/users" className="flex items-center justify-between p-3 rounded-lg hover:bg-ink-50 transition"><span className="text-sm font-medium text-ink-700">Manage Users</span><ArrowRight size={16} className="text-ink-400" /></Link>
              <Link to="/admin/providers" className="flex items-center justify-between p-3 rounded-lg hover:bg-ink-50 transition"><span className="text-sm font-medium text-ink-700">Manage Providers</span><ArrowRight size={16} className="text-ink-400" /></Link>
              <Link to="/admin/analytics" className="flex items-center justify-between p-3 rounded-lg hover:bg-ink-50 transition"><span className="text-sm font-medium text-ink-700">View Analytics</span><ArrowRight size={16} className="text-ink-400" /></Link>
              <Link to="/admin/complaints" className="flex items-center justify-between p-3 rounded-lg hover:bg-ink-50 transition"><span className="text-sm font-medium text-ink-700">Complaints</span><ArrowRight size={16} className="text-ink-400" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
