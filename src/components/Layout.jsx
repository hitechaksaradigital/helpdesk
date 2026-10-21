/**
 * Header + Footer bersama untuk halaman publik dan admin.
 */
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { kontakSekretariat, nomorDarurat } from '../data'
import { BrandLogo, Icon } from './ui'

/* ------------------------------------------------------------------ *
 * Navigasi utama
 * ------------------------------------------------------------------ */
const navItems = [
  { key: 'beranda', label: 'Beranda', href: '/#beranda' },
  { key: 'buat-laporan', label: 'Buat Laporan', href: '/#formulir-aduan' },
  { key: 'lacak-tiket', label: 'Lacak Tiket', href: '/#quick-tracker' },
  { key: 'pengaduan-publik', label: 'Pengaduan Publik', href: '/#pengaduan-publik' },
  { key: 'alur-dan-faq', label: 'Alur & FAQ', href: '/#alur-dan-faq' },
  { key: 'statistik', label: 'Statistik', href: '/#statistik' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  const isAdmin = location.pathname.startsWith('/manajemen-pengaduan')

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        <Link className="flex-shrink-0" to="/">
          <BrandLogo />
        </Link>

        <nav className="hidden xl:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.key}
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="hidden sm:inline-flex items-center justify-center bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-4 py-2.5 rounded-lg transition-colors"
            href="/#quick-tracker"
          >
            Cek Status Tiket
          </a>
          <Link
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-4 py-2.5 rounded-lg transition-colors"
            to={isAdmin ? '/' : '/manajemen-pengaduan'}
          >
            {isAdmin ? 'Kembali ke Portal' : 'Masuk Petugas / Admin'}
          </Link>
          <button
            aria-expanded={menuOpen}
            aria-label="Buka menu navigasi"
            className="xl:hidden p-2 rounded-lg hover:bg-surface-container text-on-surface"
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="text-2xl" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="xl:hidden bg-surface-container-lowest border-t border-surface-container px-6 py-4 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.key}
              className="block py-2.5 font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

/* ------------------------------------------------------------------ *
 * Footer
 * ------------------------------------------------------------------ */
export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="Logo LAPOR-DAERAH"
                className="h-8 w-auto object-contain"
                src="/images/logo.png"
              />
              <span className="font-title-md text-title-md text-on-surface">LAPOR-DAERAH</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Portal resmi koordinasi penanganan aduan, aspirasi, dan keluhan warga terintegrasi
              dengan Organisasi Perangkat Daerah (OPD) dan instansi pelayanan publik daerah.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Kanal PPID Transparan &amp; Terpercaya
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-label-md text-label-md uppercase text-on-surface tracking-wider">
              Layanan Warga
            </h4>
            <ul className="space-y-2 font-body-sm text-body-sm">
              <li>
                <a className="hover:text-primary transition-colors" href="/#formulir-aduan">
                  Formulir Pengaduan Cepat
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="/#quick-tracker">
                  Pelacakan Status Surat &amp; Tiket
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="/#pengaduan-publik">
                  Katalog Laporan Terbuka
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="/#alur-dan-faq">
                  Standar Operasional Pelayanan (SOP)
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="/#statistik">
                  Laporan Akuntabilitas Kinerja
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-label-md text-label-md uppercase text-on-surface tracking-wider">
              Kontak &amp; Sekretariat
            </h4>
            <div className="space-y-2 font-body-sm text-body-sm">
              {kontakSekretariat.map((item) => (
                <p className="flex items-start gap-2" key={item.text}>
                  <Icon name={item.icon} className="text-[18px] mt-0.5 text-primary" />
                  <span className={item.icon === 'location_on' ? 'text-on-surface' : ''}>
                    {item.text}
                  </span>
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-label-md text-label-md uppercase text-on-surface tracking-wider">
              Panggilan Darurat 24 Jam
            </h4>
            <div className="p-4 rounded-xl bg-surface-container space-y-3">
              {nomorDarurat.map((item) => (
                <div className="flex items-center justify-between" key={item.nomor}>
                  <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                    {item.label}
                  </span>
                  <span className="font-label-md text-label-md text-tertiary">{item.nomor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-caption text-caption text-on-surface-variant">
          <p>&copy; 2025 Pemerintah Daerah. Dikelola oleh Tim Koordinasi SP4N LAPOR-DAERAH.</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-on-surface transition-colors" href="/#">
              Kebijakan Privasi
            </a>
            <a className="hover:text-on-surface transition-colors" href="/#">
              Ketentuan Layanan
            </a>
            <a className="hover:text-on-surface transition-colors" href="/#">
              Keterbukaan Informasi Publik
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

