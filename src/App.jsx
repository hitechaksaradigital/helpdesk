/**
 * Routing aplikasi LAPOR-DAERAH.
 *  - `/`                     -> Portal Pengaduan Masyarakat (publik)
 *  - `/manajemen-pengaduan`  -> Dashboard petugas/admin
 *  - `/statistik`            -> Halaman statistik & akuntabilitas
 */
import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer, Header } from './components/Layout'
import PortalPublik from './pages/PortalPublik'
import ManajemenPengaduan from './pages/ManajemenPengaduan'
import Statistik from './pages/Statistik'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'

/* Scroll ke atas setiap kali rute berubah */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollToTop />
      <Header />
      <main className="w-full pt-20 bg-background min-h-screen flex-1">
        <Routes>
          <Route path="/" element={<PortalPublik />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route
            path="/manajemen-pengaduan"
            element={
              <ProtectedRoute>
                <ManajemenPengaduan />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
