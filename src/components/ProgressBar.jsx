export default function ProgressBar({
  value = 0,
  max = 100,
  variant = 'teal',
  showLabel = false,
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const fillStyles = {
    teal: 'bg-teal-600',
    brand: 'bg-navy-600',
  }

  return (
    <div className={className}>
      <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${fillStyles[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-neutral-600 font-medium">
          {percentage.toFixed(0)}%
        </p>
      )}
    </div>
  )
}