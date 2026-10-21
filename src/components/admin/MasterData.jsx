/**
 * Panel master data + tombol aksi umum di sidebar admin.
 */
import { Icon } from '../ui'

export default function MasterData({ onAksi }) {
  const item = [
    {
      key: 'kategori',
      icon: 'category',
      iconClass: 'bg-primary-fixed/50 text-primary',
      judul: 'Kategori Layanan',
      sub: '12 Kategori Aktif • 3 Sub-klasifikasi',
      tone: 'primary',
    },
    {
      key: 'opd',
      icon: 'domain',
      iconClass: 'bg-secondary-fixed/50 text-secondary',
      judul: 'Instansi & OPD Teknis',
      sub: '34 Dinas / Badan Terdaftar',
      tone: 'secondary',
    },
  ]

  return (
    <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-surface-container">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
            Master Konfigurasi
          </span>
          <h4 className="font-title-md text-title-md text-on-surface font-bold">Data Master Sistem</h4>
        </div>
        <Icon name="database" className="text-primary text-[24px]" />
      </div>

      <div className="space-y-3">
        {item.map((row) => (
          <div
            className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors"
            key={row.key}
          >
            <div className="flex items-center gap-3">
              <div
                className={
                  'w-9 h-9 rounded-lg flex items-center justify-center ' + row.iconClass
                }
              >
                <Icon name={row.icon} className="text-[20px]" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  {row.judul}
                </span>
                <span className="font-caption text-caption text-on-surface-variant">{row.sub}</span>
              </div>
            </div>
            <button
              className={
                'p-2 rounded-lg hover:bg-surface-container-lowest text-' + row.tone
              }
              onClick={() => onAksi(row.key)}
              type="button"
            >
              <Icon name="tune" className="text-[18px]" />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-2 text-center">
        <button
          className="font-label-sm text-label-sm text-primary hover:underline font-semibold inline-flex items-center gap-1"
          onClick={() => onAksi('direktori')}
          type="button"
        >
          <span>Buka Seluruh Direktori Master Data</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </button>
      </div>
    </div>
  )
}
