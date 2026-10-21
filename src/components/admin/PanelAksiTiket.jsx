/**
 * Panel aksi petugas: ubah status, penugasan OPD, tanggapan resmi, dan log jejak audit.
 */
import { useEffect, useState } from 'react'
import { jejakAudit, opdList, statusMeta, statusOptions } from '../../data'
import { Icon } from '../ui'

const TEMPLAT_TANGGAPAN =
  'Laporan telah diverifikasi oleh tim sekretariat. Berkas pengaduan telah diteruskan ke Unit Reaksi Cepat PDAM Kota untuk pengecekan tekanan dan perbaikan pipa.'

export default function PanelAksiTiket({ tiket, onSimpan, onTutup }) {
  const [status, setStatus] = useState(tiket?.status ?? 'baru')
  const [opd, setOpd] = useState(tiket?.instansi ?? 'Perumda Air Minum')
  const [pic, setPic] = useState('')
  const [tanggapan, setTanggapan] = useState(TEMPLAT_TANGGAPAN)

  useEffect(() => {
    if (!tiket) return
    setStatus(tiket.status)
    setOpd(tiket.instansi)
    setPic('')
    setTanggapan(TEMPLAT_TANGGAPAN)
  }, [tiket])

  if (!tiket) {
    return (
      <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container text-center space-y-3">
        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant mx-auto">
          <Icon name="touch_app" className="text-[26px]" />
        </div>
        <div>
          <h3 className="font-title-md text-title-md text-on-surface font-bold">
            Panel Aksi Petugas
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Pilih salah satu baris pada tabel pengaduan untuk membuka tinjauan aksi, mengubah
            status, dan meneruskan penugasan ke OPD.
          </p>
        </div>
      </div>
    )
  }

  const meta = statusMeta[tiket.status]
  const log = jejakAudit[tiket.id] ?? [
    {
      waktu: tiket.tanggal,
      judul: 'Laporan Dibuat oleh Warga',
      detail: 'Melalui aplikasi LAPOR-DAERAH Web Standard.',
      color: 'bg-outline',
    },
  ]


  return (
    <div
      className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-6 transition-all border border-surface-container"
      id="panel-action-ticket"
    >
      <div className="flex items-start justify-between pb-4 border-b border-surface-container">
        <div>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Tinjauan Aksi Petugas
          </span>
          <div className="flex items-center gap-2 mt-1">
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              #{tiket.id}
            </h3>
            <span
              className={
                'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ' +
                meta.badge
              }
            >
              <span className={'w-1.5 h-1.5 rounded-full ' + meta.dot} />
              {meta.label}
            </span>
          </div>
        </div>
        <button
          className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant"
          onClick={onTutup}
          title="Tutup Panel"
          type="button"
        >
          <Icon name="close" className="text-[20px]" />
        </button>
      </div>

      <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-caption text-caption text-on-surface-variant">Warga Pelapor:</span>
          <span className="font-label-md text-label-md font-semibold text-on-surface">
            {tiket.nama}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-caption text-caption text-on-surface-variant">Kategori:</span>
          <span className="font-label-sm text-label-sm font-medium text-on-surface">
            {tiket.kategori}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-caption text-caption text-on-surface-variant">Lokasi:</span>
          <span
            className="font-label-sm text-label-sm font-medium text-on-surface truncate max-w-[200px]"
            title={tiket.lokasi}
          >
            {tiket.lokasi}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
          <span>Ubah Status Tiket</span>
          <span className="font-caption text-caption text-on-surface-variant">SOP 2.1</span>
        </label>
        <select
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          {statusOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="font-label-md text-label-md text-on-surface font-semibold">
          Tugaskan Instansi / OPD Teknis
        </label>
        <select
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setOpd(e.target.value)}
          value={opd}
        >
          {opdList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <input
          className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setPic(e.target.value)}
          placeholder="Nama PIC Penanggung Jawab Lapangan..."
          type="text"
          value={pic}
        />
      </div>


      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-label-md text-label-md text-on-surface font-semibold">
            Tanggapan Resmi Instansi
          </label>
          <button
            className="font-label-sm text-label-sm text-primary hover:underline"
            onClick={() => setTanggapan(TEMPLAT_TANGGAPAN)}
            type="button"
          >
            Gunakan Templat
          </button>
        </div>
        <textarea
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
          onChange={(e) => setTanggapan(e.target.value)}
          placeholder="Tuliskan jawaban klarifikasi, estimasi waktu penanganan, atau tindak lanjut teknis kepada pelapor..."
          rows={3}
          value={tanggapan}
        />
      </div>

      <div className="pt-2">
        <button
          className="w-full py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
          onClick={() => onSimpan({ status, opd, pic, tanggapan, tiketId: tiket.id })}
          type="button"
        >
          <Icon name="send" className="text-[20px]" />
          Simpan &amp; Perbarui Status Tiket
        </button>
      </div>

      <div className="pt-4 border-t border-surface-container space-y-3">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
          Log Jejak Audit &amp; Penanganan
        </span>
        <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-highest">
          {log.map((item, i) => (
            <div className="relative" key={i}>
              <span
                className={
                  'absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ring-4 ring-surface-container-lowest ' +
                  item.color
                }
              />
              <div className="flex flex-col">
                <span className="font-caption text-caption text-on-surface-variant font-medium">
                  {item.waktu}
                </span>
                <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                  {item.judul}
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  {item.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
