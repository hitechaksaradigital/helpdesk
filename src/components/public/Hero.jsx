/**
 * Hero landing + panel "Pusat Resolusi Warga".
 */
import { Icon } from '../ui'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-surface-container-low px-6 lg:px-12 py-16 lg:py-24"
      id="beranda"
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm shadow-sm">
                <Icon name="verified" className="text-base leading-none text-primary" filled />
                Resmi Terhubung dengan 34 Dinas &amp; OPD Daerah
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Rata-rata Respon Awal &lt; 24 Jam
              </span>
            </div>

            <h1 className="font-display text-display text-on-surface tracking-tight leading-tight">
              Suarakan Aspirasi, Bangun Daerah{' '}
              <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-8">
                Lebih Baik
              </span>
              , Transparan &amp; Terpercaya
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Portal resmi satu pintu yang menghubungkan aspirasi, keluhan, dan pelaporan masyarakat
              secara langsung ke meja kerja pimpinan Organisasi Perangkat Daerah (OPD) dengan
              kepastian tindak lanjut akuntabel dan transparan.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all shadow-md hover:shadow-lg active:scale-95"
                href="#formulir-aduan"
              >
                <Icon name="campaign" className="text-xl" />
                Buat Laporan Sekarang
              </a>
              <a
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md shadow-sm transition-all"
                href="#quick-tracker"
              >
                <Icon name="search_insights" className="text-xl text-primary" />
                Lacak Status Tiket Anda
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-on-surface-variant">
              <div className="flex items-center gap-2 font-caption text-caption">
                <Icon name="lock" className="text-primary text-base" />
                Perlindungan Identitas Pelapor (UU PPID)
              </div>
              <div className="flex items-center gap-2 font-caption text-caption">
                <Icon name="notifications_active" className="text-primary text-base" />
                Notifikasi Progres SMS &amp; Email Real-time
              </div>
            </div>
          </div>


          <div className="lg:col-span-5 relative">
            <div className="relative bg-surface-container-lowest rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                    <Icon name="analytics" />
                  </div>
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface">
                      Pusat Resolusi Warga
                    </h3>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Pemutakhiran Data 5 Menit Terakhir
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                  Sistem Aktif
                </span>
              </div>

              <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-inner">
                <img
                  alt="Petugas teknisi lapangan bekerja menambal jalan raya rusak di kawasan perkotaan"
                  className="w-full h-full object-cover"
                  src="/images/hero-teknisi.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-4">
                  <p className="text-inverse-on-surface font-caption text-caption">
                    Penanganan riil aduan #TKT-2025-1092 oleh Dinas PUPR Bidang Bina Marga
                    dalam 48 jam.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-on-surface">
                  <span className="font-label-sm text-label-sm text-primary">
                    Tingkat Penyelesaian Selesai
                  </span>
                  <span className="font-title-md text-title-md font-bold">94.4%</span>
                </div>
                <div className="w-full bg-surface-dim h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-2 rounded-full w-[94.4%] transition-all duration-1000" />
                </div>
                <div className="flex justify-between font-caption text-caption text-on-surface-variant pt-1">
                  <span>13.985 Terverifikasi Tuntas</span>
                  <span>Target: 95.0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
