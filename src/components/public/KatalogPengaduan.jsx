/**
 * Katalog pengaduan publik + filter kategori.
 */
import { useState } from 'react'
import { filterKatalog, katalogPengaduan } from '../../data'
import { Icon, StarRating } from '../ui'

const gayaTombolAktif = 'bg-primary text-on-primary font-label-sm text-label-sm font-medium shadow-sm'
const gayaTombol =
  'bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium'
const gayaTombolSelesai =
  'bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-medium'

const gayaAksi = {
  primary: 'bg-primary hover:bg-primary-container text-on-primary',
  ghost: 'bg-surface-container hover:bg-surface-container-high text-on-surface',
  secondary: 'bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container',
  neutral: 'bg-surface-container-high text-on-surface',
}

export default function KatalogPengaduan() {
  const [filter, setFilter] = useState('semua')

  const terlihat = katalogPengaduan.filter((item) => {
    if (filter === 'semua') return true
    if (filter === 'Selesai') return item.status === 'selesai'
    return item.filterKey === filter
  })

  return (
    <section
      className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full"
      id="pengaduan-publik"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase font-bold tracking-wider mb-1">
            <Icon name="forum" className="text-base" />
            Ruang Keterbukaan Informasi Publik
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Katalog Pengaduan Terverifikasi Warga
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {filterKatalog.map((item) => (
            <button
              className={
                'px-4 py-2 rounded-full font-label-sm text-label-sm font-medium transition-colors ' +
                (filter === item.key
                  ? gayaTombolAktif
                  : item.key === 'Selesai'
                    ? gayaTombolSelesai
                    : gayaTombol)
              }
              key={item.key}
              onClick={() => setFilter(item.key)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {terlihat.length === 0 ? (
        <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-10 text-center space-y-2">
          <Icon name="search_off" className="text-4xl text-on-surface-variant" />
          <p className="font-label-md text-label-md text-on-surface font-semibold">
            Belum ada pengaduan pada kategori ini
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Silakan pilih kategori lain untuk melihat laporan warga yang telah diverifikasi.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {terlihat.map((item) => (
            <article
              className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              key={item.id}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">
                    #{item.id}
                  </span>
                  <span
                    className={
                      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm font-bold ' +
                      (item.status === 'selesai'
                        ? 'bg-secondary-container text-on-secondary-container'
                        : item.status === 'diproses'
                          ? 'bg-secondary-fixed text-secondary'
                          : 'bg-surface-container-high text-on-surface')
                    }
                  >
                    <span
                      className={
                        'w-2 h-2 rounded-full ' +
                        (item.status === 'selesai'
                          ? 'bg-primary'
                          : item.status === 'diproses'
                            ? 'bg-secondary animate-pulse'
                            : 'bg-outline')
                      }
                    />
                    {item.statusLabel}
                  </span>
                </div>

                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-surface-container-low font-label-sm text-label-sm font-semibold mb-1.5 text-on-surface">
                    {item.kategori}
                  </span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">{item.judul}</h3>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                  {item.kutipan}
                </p>

                <div className="p-3 rounded-xl bg-surface-container-low text-on-surface-variant space-y-1">
                  <div className="flex items-center gap-1.5 font-caption text-caption">
                    <Icon name="location_on" className="text-sm text-primary" />
                    <span>{item.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-caption text-caption">
                    <Icon name="account_balance" className="text-sm text-primary" />
                    <span className="font-semibold text-on-surface">{item.instansi}</span>
                  </div>
                </div>


                {item.rating ? (
                  <div className="p-3 rounded-xl bg-secondary-container/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <StarRating value={item.rating} />
                        <span className="font-label-sm text-label-sm font-bold ml-1.5">
                          {item.rating.toFixed(1)} / 5.0
                        </span>
                      </div>
                      <span className="font-caption text-caption text-on-secondary-container">
                        Oleh: {item.peninjau}
                      </span>
                    </div>
                    <p className="font-caption text-caption text-on-secondary-container italic">
                      {item.testimoni}
                    </p>
                  </div>
                ) : null}

                {item.catatanInstansi ? (
                  <div className="p-3 rounded-xl bg-surface-container-low text-on-surface-variant space-y-1">
                    <div className="flex items-center gap-2 text-on-surface font-label-sm text-label-sm font-semibold">
                      <Icon name="support_agent" className="text-secondary text-base" />
                      {item.catatanInstansi.judul}
                    </div>
                    <p className="font-caption text-caption text-on-surface-variant">
                      {item.catatanInstansi.isi}
                    </p>
                  </div>
                ) : null}

                {item.validasi ? (
                  <div className="p-3 rounded-xl bg-surface-container-low text-on-surface-variant space-y-1">
                    <div className="flex items-center gap-2 text-on-surface font-label-sm text-label-sm font-semibold">
                      <Icon name="verified_user" className="text-primary text-base" />
                      {item.validasi.judul}
                    </div>
                    <p className="font-caption text-caption text-on-surface-variant">
                      {item.validasi.isi}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="pt-3 flex flex-col gap-2">
                <div className="flex items-center justify-between font-caption text-caption text-on-surface-variant pb-2">
                  <span className="flex items-center gap-1">
                    <Icon name="schedule" className="text-sm" /> {item.durasi}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="person" className="text-sm" /> Pelapor: {item.peninjau}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="chat" className="text-sm" /> {item.tanggapan} tanggapan
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {item.aksi.map((aksi) => (
                    <button
                      className={
                        'px-3 py-2 rounded-lg font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-colors ' +
                        gayaAksi[aksi.style]
                      }
                      key={aksi.label}
                      type="button"
                    >
                      <Icon name={aksi.icon} className="text-base" />
                      {aksi.label}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
