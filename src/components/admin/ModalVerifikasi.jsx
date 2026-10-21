/**
 * Modal verifikasi validitas aduan.
 */
import { useState } from 'react'
import { Modal } from '../ui'

const SYARAT = [
  'Identitas pelapor terkonfirmasi valid dan dapat dihubungi',
  'Lokasi geografis berada di wilayah kewenangan daerah',
  'Substansi laporan tidak mengandung unsur fitnah atau SARA',
  'Foto bukti visual memadai untuk penanganan tim lapangan',
]

export default function ModalVerifikasi({ tiket, onClose, onTerima, onTolak }) {
  const [centang, setCentang] = useState(SYARAT.map(() => true))
  const [catatan, setCatatan] = useState(
    'Semua persyaratan kelengkapan verifikasi SP4N terpenuhi.',
  )

  const toggle = (index) =>
    setCentang((prev) => prev.map((v, i) => (i === index ? !v : v)))

  const semuaTercentang = centang.every(Boolean)

  return (
    <Modal
      footer={
        <>
          <button
            className="px-4 py-2 rounded-lg bg-error-container hover:bg-tertiary-fixed text-on-error-container font-label-md text-label-md font-semibold"
            onClick={onTolak}
            type="button"
          >
            Tolak (Tidak Valid)
          </button>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md"
              onClick={onClose}
              type="button"
            >
              Tutup
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold disabled:opacity-50"
              disabled={!semuaTercentang}
              onClick={() => onTerima(catatan)}
              type="button"
            >
              Verifikasi &amp; Lanjutkan
            </button>
          </div>
        </>
      }
      icon="verified"
      maxWidth="max-w-xl"
      onClose={onClose}
      open={Boolean(tiket)}
      title="Verifikasi Validitas Aduan"
    >
      <div className="p-3.5 rounded-lg bg-surface-container-low flex items-center justify-between">
        <span className="font-label-md text-label-md font-bold text-primary">
          {tiket?.id ?? '-'}
        </span>
        <span className="font-caption text-caption text-on-surface-variant">
          Standar Verifikasi MenPAN-RB
        </span>
      </div>

      <div className="space-y-3 font-body-sm text-body-sm">
        {SYARAT.map((syarat, index) => (
          <label className="flex items-center gap-3 cursor-pointer" key={syarat}>
            <input
              checked={centang[index]}
              className="w-4 h-4 rounded text-primary focus:ring-primary"
              onChange={() => toggle(index)}
              type="checkbox"
            />
            <span>{syarat}</span>
          </label>
        ))}
      </div>

      <div>
        <label
          className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1"
          htmlFor="verif-notes"
        >
          Catatan Verifikator
        </label>
        <input
          className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          id="verif-notes"
          onChange={(e) => setCatatan(e.target.value)}
          type="text"
          value={catatan}
        />
      </div>
    </Modal>
  )
}
