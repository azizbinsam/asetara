export default function Card({
  children,
  variant = 'default',
  className = '',
  padding = 'default',
}) {
  const paddingStyles = {
    default: 'p-4 md:p-6',
    sm: 'p-3',
    none: '',
  }

  const variantStyles = {
    default: 'bg-neutral-0 border border-neutral-200 shadow-card',
    brand: 'bg-navy-gradient text-white shadow-navyGlow border-0',
    teal: 'bg-teal-gradient text-white border-0',
    flat: 'bg-neutral-50 border border-neutral-200',
  }

  return (
    <div
      className={`
        rounded-card
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}