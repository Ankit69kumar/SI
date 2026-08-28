import { Loader2 } from 'lucide-react'

export default function Spinner({ size = 24, className = '' }) {
  return <Loader2 size={size} className={`animate-spin text-primary-600 ${className}`} />
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <Spinner size={32} />
    </div>
  )
}

export function FullLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner size={40} />
    </div>
  )
}
