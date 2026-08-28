import { IndianRupee, TrendingUp, Wallet, Download, Briefcase } from 'lucide-react'
import StatCard from '../../components/ui/StatCard'
import { EARNINGS_DATA, PROVIDER_JOBS } from '../../data/mockData'

export default function Earnings() {
  const total = EARNINGS_DATA.reduce((s, e) => s + e.amount, 0)
  const thisMonth = EARNINGS_DATA[EARNINGS_DATA.length - 1].amount
  const lastMonth = EARNINGS_DATA[EARNINGS_DATA.length - 2].amount
  const growth = ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1)
  const completedJobs = PROVIDER_JOBS.filter(j => j.status === 'completed')

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink-900 mb-1">Earnings</h2>
          <p className="text-ink-400">Track your income and transactions</p>
        </div>
        <button className="btn-secondary"><Download size={16} /> Download Statement</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wallet} label="Total Earnings" value={`₹${total.toLocaleString()}`} color="primary" />
        <StatCard icon={IndianRupee} label="This Month" value={`₹${thisMonth.toLocaleString()}`} trend={`+${growth}% vs last month`} color="success" />
        <StatCard icon={TrendingUp} label="Avg / Month" value={`₹${Math.round(total / EARNINGS_DATA.length).toLocaleString()}`} color="accent" />
        <StatCard icon={Briefcase} label="Jobs Done" value={completedJobs.length} color="warning" />
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-ink-900 mb-6">Monthly Earnings</h3>
        <div className="flex items-end gap-3 h-56">
          {EARNINGS_DATA.map((e, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-ink-700">₹{(e.amount / 1000).toFixed(1)}k</span>
              <div className="w-full bg-primary-100 rounded-t-lg flex items-end" style={{ height: '100%' }}>
                <div className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-500 hover:from-primary-700" style={{ height: `${(e.amount / 52300) * 100}%` }} />
              </div>
              <span className="text-sm text-ink-400 font-medium">{e.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-ink-900 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-ink-400 text-left">
                <th className="pb-3 font-medium">Job</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium text-right">Amount</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {completedJobs.map(j => (
                <tr key={j.id} className="border-b border-ink-50 last:border-0">
                  <td className="py-3 font-medium text-ink-900">{j.serviceName}</td>
                  <td className="py-3 text-ink-600">{j.customerName}</td>
                  <td className="py-3 text-ink-500">{j.date}</td>
                  <td className="py-3 text-right font-semibold text-success-600">+₹{j.earnings}</td>
                  <td className="py-3 text-right"><span className="badge bg-success-100 text-success-700">Paid</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
