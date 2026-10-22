/**
 * Halaman Statistik Transparansi Daerah.
 * Menyajikan visualisasi metrik kinerja penanganan pengaduan warga.
 */
import { statistikRingkasan, distribusiStatus, trenMingguan, distribusiKategori, performaOPD } from '../data'
import { Icon } from '../components/ui'
import PieChart from '../components/admin/PieChart'
import BarChart from '../components/admin/BarChart'
import LineChart from '../components/admin/LineChart'

export default function Statistik() {
  const rataMasuk = Math.round(trenMingguan.reduce((s, d) => s + d.masuk, 0) / trenMingguan.length)
  const rataSelesai = Math.round(trenMingguan.reduce((s, d) => s + d.selesai, 0) / trenMingguan.length)
  const rataTolak = Math.round(trenMingguan.reduce((s, d) => s + d.ditolak, 0) / trenMingguan.length)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Halaman */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container">
            <Icon name="analytics" className="text-[18px]" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Statistik & Akuntabilitas
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Dasbor Kinerja Penanganan Aduan
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
            Data performa operasional dan kepatuhan SLA dari seluruh Organisasi Perangkat Daerah
            (OPD) terkait, berbasis sistem LAPOR-DAERAH periode 1–18 November 2025.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant font-body-sm text-body-sm">
            <Icon name="date_range" className="text-[18px] text-primary" />
            <span>1 Nov – 18 Nov 2025</span>
          </div>
          <button
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm"
            type="button"
          >
            <Icon name="filter_list" className="text-[20px] text-primary" />
            <span>Filter Lain</span>
          </button>
          <button
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all shadow-sm"
            type="button"
          >
            <Icon name="download" className="text-[20px]" />
            <span>Unduh Laporan</span>
          </button>
        </div>
      </div>

      {/* Ringkasan 4 Kartu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statistikRingkasan.map((item) => (
          <div
            className="p-6 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all"
            key={item.key}
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={
                    'font-label-sm text-label-sm uppercase tracking-wider font-semibold ' +
                    item.labelClass
                  }
                >
                  {item.label}
                </span>
                <div className={'font-display text-display mt-1 font-bold ' + item.nilaiClass}>
                  {item.nilai}
                </div>
              </div>
              <div
                className={'w-12 h-12 rounded-xl flex items-center justify-center ' + item.iconClass}
              >
                <Icon name={item.icon} className="text-[26px]" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-surface-container">
              <span className="font-caption text-caption text-on-surface-variant">{item.deskripsi}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Chart: Donut Status (Kiri) + Bar Kategori (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donut Chart Distribusi Status */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-surface-container">
            <Icon name="pie_chart" className="text-[22px] text-primary" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Distribusi Status Tiket
            </h3>
          </div>
          <PieChart data={distribusiStatus} />
        </div>

        {/* Bar Chart Distribusi Kategori */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-surface-container">
            <Icon name="bar_chart_4_bars" className="text-[22px] text-primary" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Pengaduan per Kategori
            </h3>
          </div>
          <BarChart data={distribusiKategori} labelKey="kategori" valueKey="jumlah" />
        </div>
      </div>

      {/* Grid Chart: Tren Mingguan (Kiri) + Ringkasan (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Line Chart Tren Mingguan */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-surface-container">
            <Icon name="trending_up" className="text-[22px] text-primary" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Tren Perminggu (Masuk vs Selesai)
            </h3>
          </div>
          <LineChart data={trenMingguan} />
        </div>

        {/* Statistik Tambahan */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-surface-container">
              <Icon name="speed" className="text-[22px] text-primary" />
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Rata-rata Mingguan
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Pengaduan Masuk</span>
                <strong className="font-headline-sm text-headline-sm text-primary">
                  {rataMasuk}/hari
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Penyelesaian</span>
                <strong className="font-headline-sm text-headline-sm text-secondary">
                  {rataSelesai}/hari
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Ditolak Rata-rata</span>
                <strong className="font-headline-sm text-headline-sm text-tertiary">
                  {rataTolak}/hari
                </strong>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-surface-container">
              <Icon name="star" className="text-[22px] text-primary" />
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Kepuasan Warga
              </h3>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                     key={i}
                     name={i < 4 ? 'star' : 'star_half'}
                     className="text-[20px]"
                     filled={i < 4}
                   />
                ))}
              </div>
              <span className="font-headline-md text-headline-md font-bold text-on-surface">4.8</span>
            </div>
            <p className="font-caption text-caption text-on-surface-variant text-center">
              Berdasarkan 3.214 ulasan warga selama Oktober 2025
            </p>
          </div>
        </div>
      </div>

      {/* Performa OPD */}
      <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-surface-container">
          <Icon name="badge" className="text-[22px] text-primary" />
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Performa Penyelesaian per OPD
          </h3>
        </div>

        <BarChart
          data={performaOPD.map((d) => ({
            opd: d.opd,
            total: d.total,
            selesai: d.selesai,
            color: d.color,
          }))}
          labelKey="opd"
          valueKey="selesai"
        />

        <div className="pt-4 border-t border-surface-container space-y-3">
          {performaOPD.map((d) => {
            const { bg, txt } = (() => {
              const parts = d.color.split(/\s+/)
              return {
                bg: parts.find((c) => c.startsWith('bg-')) || 'bg-primary',
                txt: parts.find((c) => c.startsWith('text-')) || 'text-on-primary',
              }
            })()
            return (
              <div className="flex items-center justify-between" key={d.opd}>
                <span className="font-body-sm text-body-sm text-on-surface">{d.opd}</span>
                <div className="flex items-center gap-3">
                  <span className="font-caption text-caption text-on-surface-variant w-24 text-right">
                    {d.selesai}/{d.total} selesai
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface w-12">
                    {d.tertib}%
                  </span>
                  <span className={'px-2 py-1 rounded-full font-label-sm ' + bg + ' ' + txt}>
                    {d.tertib >= 94 ? 'Tercapai' : 'Pengejaran'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
