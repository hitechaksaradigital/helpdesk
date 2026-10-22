/**
 * Halaman Register (rute /register).
 * Membuat akun Supabase Auth (email + kata sandi) dan menyimpan nama
 * pengelola di user_metadata.full_name.
 * Pesan error ditampilkan dalam bahasa Indonesia.
 */
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth, signUp } from './auth'
import { Icon } from './components/ui'

export default function Register() {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/manajemen-pengaduan'

  useEffect(() => {
    if (!authLoading && user) navigate(from, { replace: true })
  }, [authLoading, user, navigate, from])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!nama.trim()) {
      setError('Nama lengkap wajib diisi.')
      return
    }
    if (password !== confirm) {
      setError('Kata sandi dan konfirmasi kata sandi tidak cocok.')
      return
    }

    setLoading(true)
    try {
      const data = await signUp(email.trim(), password, nama.trim())
      // Jika konfirmasi email dimatikan, sesi langsung ada -> masuk otomatis.
      if (data?.session) {
        navigate(from, { replace: true })
      } else {
        setSuccess(
          'Akun berhasil dibuat! Cek email (atau folder spam) untuk konfirmasi, lalu masuk.'
        )
        setNama('')
        setEmail('')
        setPassword('')
        setConfirm('')
      }
    } catch (err) {
      setError(err.message || 'Gagal mendaftar. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-container mb-4">
            <Icon name="person_add" className="text-[28px] text-on-secondary-container" />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            Daftar Akun Baru
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
            Buat akun petugas/admin agar dapat mengelola pengaduan di
            LAPOR-DAERAH.
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm flex items-start gap-2">
                <Icon name="error" className="text-[18px] mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-lg bg-secondary-container text-on-secondary-container font-body-sm text-body-sm flex items-start gap-2">
                <Icon name="check_circle" className="text-[18px] mt-0.5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="nama" className="field-label">
                Nama Lengkap
              </label>
              <input
                id="nama"
                type="text"
                autoComplete="name"
                autoFocus
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="field-input"
                placeholder="Contoh: Budi Santoso"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input"
                placeholder="nama@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="field-label">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field-input pr-12"
                  placeholder="Minimal 6 karakter"
                />
                <button
                  type="button"
                  aria-label={showPw ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-on-surface-variant hover:text-on-surface"
                  onClick={() => setShowPw((v) => !v)}
                >
                  <Icon name={showPw ? 'visibility_off' : 'visibility'} className="text-[20px]" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm" className="field-label">
                Konfirmasi Kata Sandi
              </label>
              <input
                id="confirm"
                type={showPw ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="field-input"
                placeholder="Ketik ulang kata sandi"
              />
            </div>

            <div className="pt-1">
              <span className="font-caption text-caption text-on-surface-variant">
                Dengan mendaftar, anda menyetujui kata sandi minimal 6 karakter.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || authLoading}
              className="btn-primary w-full py-3"
            >
              {loading ? (
                <>
                  <Icon name="sync" className="text-[18px] animate-spin" />
                  <span>Mendaftar…</span>
                </>
              ) : (
                <>
                  <Icon name="person_add" className="text-[18px]" />
                  <span>Daftar Akun</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center font-body-sm text-body-sm text-on-surface-variant">
            Sudah punya akun?{' '}
            <Link
              to="/login"
              className="text-primary hover:underline font-semibold"
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
