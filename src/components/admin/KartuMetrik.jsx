/**
 * Kartu metrik ringkasan dashboard admin.
 */
import { Icon } from '../ui'

const kartu = [
  {
    key: 'masuk',
    label: 'Total Masuk Hari Ini',
    nilai: '48',
    icon: 'inbox',
    iconClass: 'bg-primary-fixed/40 text-primary',
    nilaiClass: 'text-on-surface',
    labelClass: 'text-on-surface-variant',
    footer: (
      <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold">
        <Icon name="trending_up" className="text-[18px]" />
        <span>+12% dari kemarin</span>
      </div>
    ),
    aside: <span className="font-caption text-caption text-on-surface-variant">Rata-rata 6 aduan/jam</span>,
  },
  {
    key: 'verifikasi',
    label: 'Butuh Verifikasi Segera',
    nilai: '15',
    icon: 'warning',
    iconClass: 'bg-tertiary-fixed text-tertiary',
    nilaiClass: 'text-tertiary',
    labelClass: 'text-tertiary',
    footer: (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" />
        Status: Baru (SLA &lt; 2 Jam)
      </span>
    ),
    aside: (
      <a className="font-label-sm text-label-sm text-tertiary hover:underline font-semibold" href="#tabel-pengaduan">
        Proses &rarr;
      </a>
    ),
  },
  {
    key: 'diproses',
    label: 'Sedang Ditindaklanjuti OPD',
    nilai: '64',
    icon: 'engineering',
    iconClass: 'bg-secondary-fixed text-secondary',
    nilaiClass: 'text-secondary',
    labelClass: 'text-secondary',
    footer: (
      <span className="font-caption text-caption text-on-surface-variant">
        Tersebar di 9 OPD Teknis
      </span>
    ),
    aside: (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
        Status: Diproses
      </span>
    ),
  },
  {
    key: 'penyelesaian',
    label: 'Tingkat Penyelesaian Bulan Ini',
    nilai: '96.2%',
    icon: 'task_alt',
    iconClass: 'bg-primary-fixed text-primary',
    nilaiClass: 'text-primary',
    labelClass: 'text-on-surface-variant',
    footer: (
      <div className="flex items-center gap-1 text-on-surface font-label-sm text-label-sm font-semibold">
        <Icon name="star" className="text-[16px] text-amber-500" filled />
        <span>4.85 / 5.0</span>
        <span className="font-caption text-caption text-on-surface-variant">(312 ulasan)</span>
      </div>
    ),
    aside: (
      <span className="font-label-sm text-label-sm text-primary font-semibold">SLA Tercapai</span>
    ),
  },
]

export default function KartuMetrik() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {kartu.map((item) => (
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
              <div
                className={
                  'font-display text-display mt-1 font-bold ' + item.nilaiClass
                }
              >
                {item.nilai}
              </div>
            </div>
            <div
              className={
                'w-12 h-12 rounded-xl flex items-center justify-center ' + item.iconClass
              }
            >
              <Icon name={item.icon} className="text-[26px]" />
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between border-t border-surface-container">
            {item.footer}
            {item.aside}
          </div>
        </div>
      ))}
    </div>
  )
}
