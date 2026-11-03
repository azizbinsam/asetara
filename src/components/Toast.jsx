import { useEffect, useState, useCallback } from 'react'
import { X, CheckCircle2, AlertTriangle, Info } from 'lucide-react'
import { subscribeToast } from './toastStore'

export function ToastContainer() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((t) => {
    setToasts((prev) => [...prev, t])
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== t.id))
    }, 3500)
  }, [])

  useEffect(() => {
    const unsubscribe = subscribeToast(addToast)
    
    // Listen for custom events from AdminRoute
    const handler = (e) => {
      addToast({ id: Date.now() + Math.random(), message: e.detail.message, type: e.detail.type || 'warning' })
    }
    window.addEventListener('inklusara-toast', handler)
    
    return () => {
      unsubscribe()
      window.removeEventListener('inklusara-toast', handler)
    }
  }, [addToast])

  const icons = {
    success: <CheckCircle2 size={18} className="text-teal-600" />,
    warning: <AlertTriangle size={18} className="text-navy-700" />,
    error: <AlertTriangle size={18} className="text-red-600" />,
    info: <Info size={18} className="text-navy-600" />,
  }

  const bgStyles = {
    success: 'bg-teal-50 border-teal-200 text-teal-800',
    warning: 'bg-navy-50 border-navy-200 text-navy-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-navy-50 border-navy-200 text-navy-800',
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg animate-in slide-in-from-top-2 fade-in duration-200 ${bgStyles[t.type] || bgStyles.info}`}
        >
          {icons[t.type] || icons.info}
          <p className="text-sm font-medium flex-1">{t.message}</p>
          <button
            onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
            className="opacity-60 hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}