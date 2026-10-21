/**
 * Filter bar admin: pencarian, filter kategori/status/instansi, dan quick filter status.
 */
import { Icon } from '../ui'

export default function FilterBar({
  cari,
  setCari,
  kategori,
  setKategori,
  status,
  setStatus,
  instansi,
  setInstansi,
  kategoriList,
  instansiList,
  statusList,
  hitunganStatus,
  onReset,
}) {
  const gayaChip =
    'px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-colors cursor-pointer'

  return (
    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-2 relative">
          <Icon
            name="search"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
          />
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all placeholder:text-on-surface-variant/70"
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari nomor tiket, nama pelapor, atau lokasi..."
            type="text"
            value={cari}
          />
        </div>

        <div>
          <select
            aria-label="Filter kategori layanan"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setKategori(e.target.value)}
            value={kategori}
          >
            <option value="">Semua Kategori Layanan</option>
            {kategoriList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            aria-label="Filter status pengaduan"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="">Semua Status Pengaduan</option>
            {statusList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            aria-label="Filter instansi tujuan"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setInstansi(e.target.value)}
            value={instansi}
          >
            <option value="">Semua Instansi / OPD</option>
            {instansiList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-on-surface-variant font-caption text-caption">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-on-surface font-label-sm text-label-sm">
            Filter Cepat Status:
          </span>
          <button
            className={
              gayaChip +
              (status === ''
                ? ' bg-surface-container hover:bg-surface-container-high text-on-surface'
                : ' bg-surface-container text-on-surface-variant')
            }
            onClick={() => setStatus('')}
            type="button"
          >
            Semua
          </button>
          {statusList.map((item) => {
            const aktif = status === item.value
            const gaya = aktif
              ? item.chipAktif
              : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
            return (
              <button
                className={gayaChip + ' ' + gaya}
                key={item.value}
                onClick={() => setStatus(aktif ? '' : item.value)}
                type="button"
              >
                {item.label} ({hitunganStatus[item.value] ?? 0})
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <span>
            Rentang: <strong>1 Nov 2025 - 15 Nov 2025</strong>
          </span>
          <button
            className="text-tertiary hover:underline inline-flex items-center gap-1 font-label-sm text-label-sm"
            onClick={onReset}
            type="button"
          >
            <Icon name="restart_alt" className="text-[16px]" />
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  )
}
