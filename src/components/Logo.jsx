import { useState } from 'react'

/**
 * Logo ASETARA (gambar). File ada di folder `public/`:
 *   - logo.png             : logo penuh (ikon + wordmark + tagline)  -> variant="full"
 *   - logo-horizontal.png  : ikon di kiri + wordmark di kanan        -> variant="horizontal"
 *   - logo-icon.png        : ikon saja                               -> variant="icon"
 *
 * Contoh:
 *   <Logo />                              // logo penuh, lebar 120px
 *   <Logo size={160} variant="horizontal" />
 *   <Logo size={28} variant="icon" />
 */
const FILES = {
  full: '/logo.png',
  horizontal: '/logo-horizontal.png',
  icon: '/logo-icon.png',
}

export default function Logo({ size = 120, variant = 'full', className = '' }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className={className}>
      {!imgError ? (
        <img
          src={FILES[variant] || FILES.full}
          alt="ASETARA"
          width={size}
          className="object-contain"
          style={{ width: size, height: 'auto' }}
          onError={() => setImgError(true)}
        />
      ) : (
        // Cadangan bila file logo belum ada di folder public/
        <div
          className="bg-navy-gradient rounded-lg flex items-center justify-center font-sans font-bold text-white"
          style={{ width: size, height: size }}
        >
          <span style={{ fontSize: size * 0.45 }}>A</span>
        </div>
      )}
    </div>
  )
}
