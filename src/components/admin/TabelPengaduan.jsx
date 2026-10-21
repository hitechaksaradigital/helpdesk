/**
 * Tabel data pengaduan untuk petugas/admin.
 */
import { statusMeta } from '../../data'
import { Icon } from '../ui'

export default function TabelPengaduan({
  data,
  terpilih,
  togglePilih,
  onDetail,
  onVerifikasi,
  onSalin,
}) {
  return (
    <div className="rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-3.5 px-4 w-10 text-center">#</th>
              <th className="py-3.5 px-4 font-semibold">Tiket &amp; Pelapor</th>
              <th className="py-3.5 px-4 font-semibold">Kategori &amp; Lokasi</th>
              <th className="py-3.5 px-4 font-semibold max-w-xs">Isi Laporan</th>
              <th className="py-3.5 px-4 font-semibold">Instansi Tujuan</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold text-center">Rating</th>
              <th className="py-3.5 px-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
            {data.map((row) => {
              const meta = statusMeta[row.status]
              return (
                <tr
                  className="hover:bg-surface-container-low/50 transition-colors group cursor-pointer"
                  key={row.id}
                  onClick={() => onDetail(row)}
                >
                  <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      checked={terpilih.includes(row.id)}
                      className="w-4 h-4 rounded text-primary focus:ring-primary"
                      onChange={() => togglePilih(row.id)}
                      type="checkbox"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 font-label-md text-label-md font-bold text-primary group-hover:underline">
                        <span>{row.id}</span>
                        <Icon
                          name="content_copy"
                          className="text-[14px] text-on-surface-variant opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSalin(row.id)
                          }}
                        />
                      </div>
                      <span className="font-semibold text-on-surface">{row.nama}</span>
                      <span className="font-caption text-caption text-on-surface-variant">
                        {row.tanggal}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-1 font-semibold text-on-surface">
                        <Icon
                          name={row.kategoriIcon}
                          className={'text-[16px] ' + row.kategoriColor}
                        />
                        {row.kategori}
                      </span>
                      <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <Icon name="location_on" className="text-[14px]" />
                        {row.lokasi}
                      </span>
                    </div>
                  </td>


                  <td className="py-4 px-4">
                    <p className="line-clamp-2 text-on-surface-variant leading-relaxed">
                      {row.deskripsi}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 font-caption text-caption text-primary hover:underline">
                        <Icon name={row.lampiran.icon} className="text-[14px]" />
                        {row.lampiran.label}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-on-surface">{row.instansi}</span>
                      <span className="font-caption text-caption text-on-surface-variant">
                        PIC: {row.pic}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold ' +
                        meta.badge
                      }
                    >
                      <span className={'w-1.5 h-1.5 rounded-full ' + meta.dot} />
                      {meta.label}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {row.rating ? (
                      <span className="inline-flex items-center gap-0.5 text-amber-500 font-label-sm text-label-sm font-bold">
                        <span>{row.rating}</span>
                        <Icon name="star" className="text-[14px]" filled />
                      </span>
                    ) : (
                      <span className="font-caption text-caption text-on-surface-variant font-mono">
                        -
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      {row.status === 'baru' && (
                        <button
                          className="p-1.5 rounded-md hover:bg-surface-container text-primary"
                          onClick={() => onVerifikasi(row)}
                          title="Verifikasi Laporan"
                          type="button"
                        >
                          <Icon name="verified" className="text-[20px]" />
                        </button>
                      )}
                      <button
                        className="p-1.5 rounded-md hover:bg-surface-container text-secondary"
                        onClick={() => onDetail(row)}
                        title="Detail &amp; Penugasan"
                        type="button"
                      >
                        <Icon name="edit_note" className="text-[20px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {data.length === 0 && (
              <tr>
                <td className="py-12 px-4 text-center" colSpan={8}>
                  <Icon name="search_off" className="text-4xl text-on-surface-variant" />
                  <p className="mt-2 font-label-md text-label-md text-on-surface font-semibold">
                    Tidak ada pengaduan yang cocok
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Ubah kata kunci atau reset filter untuk melihat data lainnya.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
