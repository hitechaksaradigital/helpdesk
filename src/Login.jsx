/**
 * Halaman Login (rute /login).
 * Memakai Supabase Auth (email + kata sandi) melalui useAuth/signIn.
 * Pesan error ditampilkan dalam bahasa Indonesia.
 */
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth, signIn } from './auth'
import { Icon } from './components/ui'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Halaman tujuan sebelum harus login; default ke dashboard admin.
  const from = location.state?.from || '/manajemen-pengaduan'

  // Jika saja sudah terautentikasi, loncatkan login.
  useEffect(() => {
    if (!authLoading && user) navigate(from, { replace: true })
  }, [authLoading, user, navigate, from])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Gagal masuk. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-container mb-4">
            <Icon name="lock" className="text-[28px] text-primary" />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            Masuk ke Akun
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
            Masukkan email dan kata sandi untuk mengakses halaman manajemen
            pengaduan.
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

            <div className="space-y-2">
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
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
                  autoComplete="current-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field-input pr-12"
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between pt-1">
              <span className="font-caption text-caption text-on-surface-variant">
                Minimal 6 karakter.
              </span>
              <Link
                to="/register"
                className="font-body-sm text-body-sm text-primary hover:underline font-semibold"
              >
                Belum punya akun? Daftar
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || authLoading}
              className="btn-primary w-full py-3"
            >
              {loading ? (
                <>
                  <Icon name="sync" className="text-[18px] animate-spin" />
                  <span>Masuk…</span>
                </>
              ) : (
                <>
                  <Icon name="login" className="text-[18px]" />
                  <span>Masuk</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
