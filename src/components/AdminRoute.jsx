import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authStore'
import { useEffect } from 'react'

export function AdminRoute({ children }) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (isAuthenticated && user && user.role !== 'admin') {
      window.dispatchEvent(
        new CustomEvent('inklusara-toast', {
          detail: { message: 'Halaman ini khusus Admin', type: 'warning' },
        })
      )
    }
  }, [isAuthenticated, user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-navy-300 border-t-navy-600 animate-spin" />
          <p className="text-sm text-neutral-500">Memuat...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}