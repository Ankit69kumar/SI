export default function Avatar({ src, name, size = 40, className = '' }) {
  const initials = name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  return src ? (
    <img src={src} alt={name} width={size} height={size}
      className={`rounded-full object-cover ring-2 ring-white ${className}`}
      style={{ width: size, height: size }} />
  ) : (
    <div className={`rounded-full bg-primary-100 text-primary-700 font-semibold flex items-center justify-center ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}>
      {initials}
    </div>
  )
}
