/**
 * Statistik transparansi publik (4 metrik).
 */
import { statistikPublik } from '../../data'
import { Icon } from '../ui'

export default function StatistikPublik() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full" id="statistik">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
            Statistik Transparansi Publik
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Akuntabilitas Kinerja Penanganan Aduan Daerah
          </h2>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
          Data konsolidasi resmi dari seluruh unit dinas teknis wilayah kabupaten/kota tahun
          berjalan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistikPublik.map((stat) => (
          <div
            className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            key={stat.key}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={
                  'w-12 h-12 rounded-xl flex items-center justify-center ' + stat.iconClass
                }
              >
                <Icon name={stat.icon} className="text-2xl" />
              </div>
              <span
                className={
                  'font-label-sm text-label-sm px-2.5 py-1 rounded-full ' + stat.badgeClass
                }
              >
                {stat.badge}
              </span>
            </div>
            <div className="font-caption text-caption text-on-surface-variant">{stat.label}</div>
            <div className={'font-headline-lg text-headline-lg mt-1 font-bold ' + stat.nilaiClass}>
              {stat.nilai}
              {stat.suffix ? (
                <span className="font-title-md text-title-md font-normal text-on-surface-variant">
                  {stat.suffix}
                </span>
              ) : null}
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              {stat.deskripsi}
            </p>
            <div
              className={
                'absolute bottom-0 left-0 right-0 h-1 transition-colors ' +
                stat.barClass +
                ' ' +
                stat.barHover
              }
            />
          </div>
        ))}
      </div>
    </section>
  )
}
