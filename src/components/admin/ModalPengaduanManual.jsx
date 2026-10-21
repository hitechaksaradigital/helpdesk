/**
 * Modal input pengaduan manual oleh petugas.
 */
import { useState } from 'react'
import { kategoriLayanan, opdList } from '../../data'
import { Icon, Modal } from '../ui'

const AWAL = {
  nama: '',
  kontak: '',
  kategori: 'Infrastruktur & Jalan',
  instansi: 'Dinas PUPR Daerah',
  lokasi: '',
  deskripsi: '',
}

export default function ModalPengaduanManual({ open, onClose, onSimpan }) {
  const [form, setForm] = useState(AWAL)
  const [berkas, setBerkas] = useState('')

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSimpan(form)
    setForm(AWAL)
    setBerkas('')
  }

  return (
    <Modal
      footer={
        <>
          <button
            className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest"
            onClick={onClose}
            type="button"
          >
            Batal
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold"
            onClick={handleSubmit}
            type="button"
          >
            Daftarkan &amp; Terbitkan Nomor Tiket
          </button>
        </>
      }
      icon="post_add"
      onClose={onClose}
      open={open}
      title="Input Pengaduan Warga Manual"
    >
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Gunakan form ini bila warga melapor langsung via Loket Pelayanan Terpadu, Sambungan
        Telepon Darurat 112, atau Surat Fisik.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1"
            htmlFor="manual-nama"
          >
            Nama Lengkap Pelapor *
          </label>
          <input
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            id="manual-nama"
            onChange={set('nama')}
            placeholder="Contoh: Raden Hartono"
            type="text"
            value={form.nama}
          />
        </div>
        <div>
          <label
            className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1"
            htmlFor="manual-kontak"
          >
            Nomor Kontak / WhatsApp *
          </label>
          <input
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            id="manual-kontak"
            onChange={set('kontak')}
            placeholder="0812-xxxx-xxxx"
            type="tel"
            value={form.kontak}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1"
            htmlFor="manual-kategori"
          >
            Kategori Masalah *
          </label>
          <select
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            id="manual-kategori"
            onChange={set('kategori')}
            value={form.kategori}
          >
            {kategoriLayanan.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1"
            htmlFor="manual-instansi"
          >
            Tujuan Instansi Awal *
          </label>
          <select
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            id="manual-instansi"
            onChange={set('instansi')}
            value={form.instansi}
          >
            {opdList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>


      <div>
        <label
          className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1"
          htmlFor="manual-lokasi"
        >
          Lokasi Kejadian Spesifik *
        </label>
        <input
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          id="manual-lokasi"
          onChange={set('lokasi')}
          placeholder="Nama Jalan, Nomor Patokan, RT/RW, Kelurahan, Kecamatan"
          type="text"
          value={form.lokasi}
        />
      </div>

      <div>
        <label
          className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1"
          htmlFor="manual-deskripsi"
        >
          Deskripsi Lengkap Aspirasi / Aduan *
        </label>
        <textarea
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          id="manual-deskripsi"
          onChange={set('deskripsi')}
          placeholder="Tuliskan keluhan secara terperinci dengan kronologi jelas..."
          rows={3}
          value={form.deskripsi}
        />
      </div>

      <div>
        <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">
          Unggah Dokumen / Foto Bukti Fisik
        </label>
        <label className="p-4 rounded-xl bg-surface-container-low border-2 border-dashed border-outline-variant text-center cursor-pointer hover:bg-surface-container">
          <Icon name="upload_file" className="text-[32px] text-on-surface-variant" />
          <p className="font-body-sm text-body-sm text-on-surface mt-1">
            Klik atau seret foto/dokumen pengaduan ke area ini
          </p>
          <span className="font-caption text-caption text-on-surface-variant">
            Format didukung: JPG, PNG, PDF (Maks. 10MB)
          </span>
          <input
            accept="image/png,image/jpeg,application/pdf"
            className="sr-only"
            onChange={(e) => setBerkas(e.target.files?.[0]?.name ?? '')}
            type="file"
          />
        </label>
        {berkas && (
          <p className="mt-2 font-caption text-caption text-on-surface-variant flex items-center gap-1.5">
            <Icon name="attachment" className="text-base text-primary" />
            {berkas}
          </p>
        )}
      </div>
    </Modal>
  )
}
