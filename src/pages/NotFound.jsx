import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '../components/Button'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-navy-600">404</span>
        </div>
        <h1 className="text-xl font-bold text-neutral-800 mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-sm text-neutral-500 mb-6">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} className="mr-2" /> Kembali
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <Home size={16} className="mr-2" /> Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}