import { useState } from 'react'
import { Search, ClipboardList, IndianRupee } from 'lucide-react'
import { StatusBadge } from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import { ADMIN_REQUESTS } from '../../data/mockData'

export default function AdminRequests() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [requests, setRequests] = useState(ADMIN_REQUESTS)

  const filtered = requests.filter(r => {
    if (status !== 'all' && r.status !== status) return false
    if (query && !r.id.toLowerCase().includes(query.toLowerCase()) && !r.customer.toLowerCase().includes(query.toLowerCase()) && !r.service.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const totalRevenue = requests.filter(r => r.status === 'completed').reduce((s, r) => s + r.amount, 0)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink-900 mb-1">Service Requests</h2>
          <p className="text-ink-400">{requests.length} total requests · ₹{totalRevenue} revenue from completed</p>
        </div>
      </div>

      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by ID, customer, or service..." className="input pl-10" />
        </div>
        <select value={status} onChange={e => setStatus(e.target.value)} className="input sm:w-48">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="card"><EmptyState icon={ClipboardList} title="No requests found" /></div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-50">
                <tr className="text-ink-400 text-left">
                  <th className="px-4 py-3 font-medium">Request ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Provider</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-t border-ink-100 hover:bg-ink-50/50">
                    <td className="px-4 py-3 font-medium text-ink-700">{r.id}</td>
                    <td className="px-4 py-3 text-ink-600">{r.customer}</td>
                    <td className="px-4 py-3 text-ink-600">{r.provider}</td>
                    <td className="px-4 py-3 text-ink-600">{r.service}</td>
                    <td className="px-4 py-3 text-ink-500">{r.date}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3 text-right font-semibold text-ink-800">₹{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
