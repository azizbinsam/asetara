import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { useAuth } from '../context/authStore'
import { toast } from '../components/toastStore'
import Button from '../components/Button'
import Logo from '../components/Logo'

function isValidEmail(email) {
  const trimmed = email.trim()
  if (!trimmed) return false
  const parts = trimmed.split('@')
  if (parts.length !== 2) return false
  const [local, domain] = parts
  if (!local || !domain) return false
  if (!domain.includes('.')) return false
  const domainParts = domain.split('.')
  if (domainParts.some(p => !p)) return false
  return true
}

export default function Register() {
  const navigate = useNavigate()
  const { register, isAuthenticated, user } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTnc, setAgreeTnc] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated && user) {
    const redirectTo = user.role === 'admin' ? '/admin/dashboard' : '/dashboard'
    return <Navigate to={redirectTo} replace />
  }

  function validate() {
    const errs = {}
    if (!name.trim()) errs.name = 'Nama lengkap wajib diisi'

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      errs.email = 'Email wajib diisi'
    } else if (!isValidEmail(trimmedEmail)) {
      errs.email = 'Format email tidak valid'
    }

    if (!password) {
      errs.password = 'Kata sandi wajib diisi'
    } else if (password.length < 6) {
      errs.password = 'Kata sandi minimal 6 karakter'
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Kata sandi tidak cocok'
    }

    if (!agreeTnc) {
      errs.agreeTnc = 'Anda harus menyetujui Syarat & Ketentuan'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    try {
      await register(name.trim(), email.trim())
      toast('Pendaftaran berhasil! Selamat datang di ASETARA.', 'success')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      toast(err.message || 'Gagal mendaftar', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-xl mx-auto lg:mx-0 lg:w-3/5 lg:px-16">
        <div className='mb-8 flex justify-center'>
                <a href="/"><Logo size={180} /></a>
                </div>

        <div className="bg-neutral-0 rounded-2xl border border-neutral-200 shadow-sm p-6 lg:p-8">
          <h2 className="text-xl font-bold text-neutral-800 mb-1">Daftar</h2>
          <p className="text-sm text-neutral-500 mb-6">Buat akun baru Anda</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })) }}
                  placeholder="Nama lengkap Anda"
                  className={`w-full h-11 pl-10 pr-3 rounded-xl border text-sm transition-colors outline-none
                    ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-neutral-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100'}`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
                  placeholder="nama@email.com"
                  className={`w-full h-11 pl-10 pr-3 rounded-xl border text-sm transition-colors outline-none
                    ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-neutral-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100'}`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Kata Sandi</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })) }}
                  placeholder="Minimal 6 karakter"
                  className={`w-full h-11 pl-10 pr-10 rounded-xl border text-sm transition-colors outline-none
                    ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-neutral-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: '' })) }}
                  placeholder="Ulangi kata sandi"
                  className={`w-full h-11 pl-10 pr-3 rounded-xl border text-sm transition-colors outline-none
                    ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-neutral-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100'}`}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="tnc"
                checked={agreeTnc}
                onChange={(e) => { setAgreeTnc(e.target.checked); setErrors((p) => ({ ...p, agreeTnc: '' })) }}
                className="mt-0.5 w-[18px] h-[18px] rounded border-neutral-300 text-navy-600 focus:ring-navy-500 accent-navy-600 cursor-pointer"
              />
              <label htmlFor="tnc" className="text-xs text-neutral-600 leading-relaxed cursor-pointer">
                Saya menyetujui{' '}
                <span className="text-navy-700 font-medium">Syarat & Ketentuan</span>{' '}
                dan{' '}
                <span className="text-navy-700 font-medium">Kebijakan Privasi</span>{' '}
                ASETARA
              </label>
            </div>
            {errors.agreeTnc && <p className="text-xs text-red-600 -mt-2">{errors.agreeTnc}</p>}

            <Button
              type="submit"
              variant="primary"
              className="w-full h-11 mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : (
                'Daftar'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-navy-700 font-medium hover:underline">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}