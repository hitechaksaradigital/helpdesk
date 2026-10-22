/**
 * Formulir pengaduan warga (form publik).
 */
import { useState } from 'react'
import { kategoriLayanan, opsiPrivasi, opdList } from '../../data'
import { Icon } from '../ui'
import { tambahPengaduan } from '../../supabaseClient'

const AWAL = {
  kategori: 'Infrastruktur & Jalan',
  instansi: '',
  judul: '',
  isi: '',
  lokasi: '',
  privasi: 'Publik',
  setuju: false,
}

export default function FormPengaduan() {
  const [form, setForm] = useState(AWAL)
  const [berkas, setBerkas] = useState([])
  const [sukses, setSukses] = useState(false)
  const [nomorTiket, setNomorTiket] = useState('')
  const [mengirim, setMengirim] = useState(false)
  const [errorKirim, setErrorKirim] = useState(null)

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleBerkas = (e) => {
    const files = Array.from(e.target.files ?? [])
    setBerkas((prev) => [...prev, ...files.map((f) => f.name)])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMengirim(true)
    setErrorKirim(null)
    const barisDb = {
      nama_pelapor: 'Warga Anonim',
      kategori_layanan: form.kategori,
      isi_laporan: `${form.judul}\n\n${form.isi}`,
      lokasi_kejadian: form.lokasi,
      instansi_tujuan: form.instansi,
      lampiran_bukti: '',
      rating_kepuasan: null,
      status: 'baru',
    }
    try {
      const dibuat = await tambahPengaduan(barisDb)
      setNomorTiket(dibuat.nomor_tiket)
      setSukses(true)
      setForm(AWAL)
      setBerkas([])
      window.setTimeout(() => {
        document.getElementById('form-success-alert')?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }, 60)
    } catch (err) {
      setErrorKirim((err && err.message) || 'Gagal menyimpan pengaduan ke database.')
      setSukses(false)
    } finally {
      setMengirim(false)
    }
  }

  return (
    <section className="px-6 lg:px-12 py-12 bg-surface-container-low" id="formulir-aduan">
      <div className="max-w-4xl mx-auto">
        <div className="bg-surface-container-lowest rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">
              <Icon name="edit_document" className="text-base" />
              Saluran Layanan Terpadu
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Formulir Pengaduan Warga
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Isi laporan secara rinci dan sertakan bukti otentik agar tim OPD penanggung jawab
              dapat segera melakukan investigasi dan eksekusi solusi.
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* 1. Kategori */}
            <div className="space-y-3">
              <label className="block font-label-md text-label-md text-on-surface font-semibold">
                1. Pilih Kategori Masalah / Layanan <span className="text-error">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {kategoriLayanan.map((item) => (
                  <label className="cursor-pointer" key={item.value}>
                    <input
                      checked={form.kategori === item.value}
                      className="peer sr-only"
                      name="category"
                      onChange={set('kategori')}
                      type="radio"
                      value={item.value}
                    />
                    <div className="p-3.5 rounded-xl bg-surface-container-low peer-checked:bg-secondary-container peer-checked:text-on-secondary-container peer-checked:ring-2 peer-checked:ring-primary flex items-center gap-2.5 transition-all">
                      <Icon name={item.icon} className="text-xl text-primary" />
                      <span className="font-label-sm text-label-sm font-medium">{item.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Instansi & Judul */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="instansi-tujuan">
                  Instansi Tujuan Terkait <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                    id="instansi-tujuan"
                    onChange={set('instansi')}
                    required
                    value={form.instansi}
                  >
                    <option disabled value="">
                      Pilih Dinas Penanggung Jawab...
                    </option>
                    {opdList.map((opd) => (
                      <option key={opd.value} value={opd.value}>
                        {opd.label}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="expand_more"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="judul-laporan">
                  Judul Pengaduan <span className="text-error">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                  id="judul-laporan"
                  onChange={set('judul')}
                  placeholder="Tuliskan pokok keluhan secara singkat dan jelas..."
                  required
                  type="text"
                  value={form.judul}
                />
              </div>
            </div>


            {/* 3. Isi Kronologi */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="isi-laporan">
                Isi Detail Kronologi Kejadian / Masalah <span className="text-error">*</span>
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                id="isi-laporan"
                minLength={30}
                onChange={set('isi')}
                placeholder="Uraikan detail kejadian: waktu mulai terjadi, dampak terhadap warga sekitar, upaya yang sudah dilakukan, dan ekspektasi perbaikan..."
                required
                rows={4}
                value={form.isi}
              />
              <span className="font-caption text-caption text-on-surface-variant block text-right">
                Minimal 30 karakter agar dapat diproses OPD ({form.isi.trim().length}/30)
              </span>
            </div>

            {/* 4. Lokasi */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="lokasi-kejadian">
                Lokasi Kejadian Spesifik <span className="text-error">*</span>
              </label>
              <div className="relative">
                <Icon
                  name="location_on"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant"
                />
                <input
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                  id="lokasi-kejadian"
                  onChange={set('lokasi')}
                  placeholder="Contoh: Jl. Pahlawan No. 42 RT 03/RW 04, Kel. Sukamaju, Kec. Klojen"
                  required
                  type="text"
                  value={form.lokasi}
                />
              </div>
            </div>

            {/* 5. Lampiran */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface font-semibold">
                Lampiran Bukti Foto / Dokumen Pendukung <span className="text-error">*</span>
              </label>
              <label className="p-6 rounded-2xl bg-surface-container-low border-dashed border-2 border-outline-variant flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors group">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                  <Icon name="cloud_upload" className="text-2xl" />
                </div>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Tarik &amp; lepas berkas foto/dokumen ke sini
                </span>
                <p className="font-caption text-caption text-on-surface-variant mt-1">
                  Mendukung format JPG, PNG, atau PDF (Ukuran maksimal 10 MB)
                </p>
                <span className="mt-3 px-4 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                  Pilih Berkas Dari Perangkat
                </span>
                <input
                  accept="image/png,image/jpeg,application/pdf"
                  className="sr-only"
                  multiple
                  onChange={handleBerkas}
                  type="file"
                />
              </label>
              {berkas.length > 0 && (
                <ul className="space-y-1.5 pt-1">
                  {berkas.map((nama) => (
                    <li
                      className="flex items-center gap-2 font-caption text-caption text-on-surface-variant bg-surface-container-low rounded-lg px-3 py-2"
                      key={nama}
                    >
                      <Icon name="attachment" className="text-base text-primary" />
                      {nama}
                    </li>
                  ))}
                </ul>
              )}
            </div>


            {/* 6. Privasi */}
            <div className="space-y-3 pt-2">
              <label className="block font-label-md text-label-md text-on-surface font-semibold">
                Pilihan Privasi Laporan Anda
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {opsiPrivasi.map((opsi) => (
                  <label className="cursor-pointer" key={opsi.value}>
                    <input
                      checked={form.privasi === opsi.value}
                      className="peer sr-only"
                      name="privacy_mode"
                      onChange={set('privasi')}
                      type="radio"
                      value={opsi.value}
                    />
                    <div className="p-4 rounded-xl bg-surface-container-low peer-checked:bg-secondary-container peer-checked:ring-2 peer-checked:ring-primary transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name={opsi.icon} className="text-primary text-xl" />
                        <span className="font-label-md text-label-md font-bold text-on-surface">
                          {opsi.judul}
                        </span>
                      </div>
                      <p className="font-caption text-caption text-on-surface-variant leading-tight">
                        {opsi.deskripsi}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Persetujuan */}
            <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3">
              <input
                checked={form.setuju}
                className="mt-1 h-4 w-4 rounded text-primary focus:ring-primary"
                id="agreement"
                onChange={set('setuju')}
                required
                type="checkbox"
              />
              <label className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed" htmlFor="agreement">
                Saya menyatakan bahwa laporan yang saya sampaikan adalah informasi yang benar, dapat
                dipertanggungjawabkan, serta bukan merupakan fitnah atau berita bohong (Hoaks)
                sesuai peraturan perundangan yang berlaku.
              </label>
            </div>

            <div className="pt-2">
              <button
                className="w-full py-4 px-8 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                disabled={mengirim}
                type="submit"
              >
                {mengirim ? (
                  <>
                    <Icon name="hourglass_empty" className="text-2xl animate-spin" />
                    <span>Mengirim Pengaduan…</span>
                  </>
                ) : (
                  <>
                    <Icon name="send" className="text-2xl" />
                    <span>Kirim Pengaduan Resmi ke Pemerintah Daerah</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {errorKirim && (
            <div
              className="mt-6 p-6 rounded-2xl bg-error-container text-on-error-container space-y-2"
              id="form-error-alert"
            >
              <div className="flex items-center gap-3">
                <Icon name="error_outline" className="text-3xl" />
                <div>
                  <h4 className="font-headline-sm text-headline-sm font-bold">
                    Gagal Mengirim Pengaduan
                  </h4>
                  <p className="font-body-sm text-body-sm">{errorKirim}</p>
                  <p className="font-caption text-caption">
                    Pastikan koneksi Supabase sudah benar (cek .env) dan skema
                    sudah dijalankan di project Anda.
                  </p>
                </div>
              </div>
            </div>
          )}

          {sukses && (
            <div
              className="mt-6 p-6 rounded-2xl bg-secondary-container text-on-secondary-container space-y-3"
              id="form-success-alert"
            >
              <div className="flex items-center gap-3">
                <Icon name="check_circle" className="text-3xl text-primary" filled />
                <div>
                  <h4 className="font-headline-sm text-headline-sm font-bold">
                    Laporan Berhasil Diterima Sistem!
                  </h4>
                  <p className="font-body-sm text-body-sm">
                    Tiket Pelacakan Anda: <span className="font-bold underline">#{nomorTiket}</span>.
                    Konfirmasi SMS/Email telah dikirimkan ke kontak Anda.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
