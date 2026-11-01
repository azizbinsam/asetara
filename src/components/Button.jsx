const VARIANT_STYLES = {
  primary:
    'bg-navy-600 text-white hover:bg-navy-700 shadow-navyGlow disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none',
  secondary:
    'bg-teal-600 text-white hover:bg-teal-700 disabled:bg-neutral-200 disabled:text-neutral-400',
  outline:
    'bg-transparent border-[1.5px] border-navy-600 text-navy-700 hover:bg-navy-50 disabled:border-neutral-200 disabled:text-neutral-400',
  ghost:
    'bg-transparent text-neutral-600 hover:text-navy-600 disabled:text-neutral-400',
}

const SIZE_STYLES = {
  sm: 'text-sm px-3 py-2',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-6 py-3',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-btn font-semibold transition-all duration-200
        ${VARIANT_STYLES[variant]}
        ${SIZE_STYLES[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  )
}