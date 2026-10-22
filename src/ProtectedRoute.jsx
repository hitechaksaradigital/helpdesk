/**
 * Perutean yang dilindungi: hanya pengguna terotentikasi yang boleh
 * mengakses halaman admin. Jika belum login, arahkan ke /login sambil
 * menyimpan halaman tujuan agar dikembalikan setelah masuk.
 */
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './auth'
import { Icon } from './components/ui'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] gap-3">
        <Icon name="progress_activity" className="text-2xl text-primary animate-spin" />
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Memuat otentikasi&hellip;
        </span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}
