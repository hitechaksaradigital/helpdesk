import { useEffect, useMemo, useState } from 'react'
import { kategoriLayanan, statusMeta } from '../data'
import { Icon, Toast } from '../components/ui'
import {
  getPengaduan,
  tambahPengaduan,
  ubahPengaduan,
  hapusPengaduan,
} from '../supabaseClient'
import FilterBar from '../components/admin/FilterBar'
import KartuMetrik from '../components/admin/KartuMetrik'
import MasterData from '../components/admin/MasterData'
import ModalPengaduanManual from '../components/admin/ModalPengaduanManual'
import ModalVerifikasi from '../components/admin/ModalVerifikasi'
import PanelAksiTiket from '../components/admin/PanelAksiTiket'
import TabelPengaduan from '../components/admin/TabelPengaduan'

const STATUS_LIST = [
  { value: 'baru', label: 'Baru', chipAktif: 'bg-tertiary-fixed text-tertiary font-semibold' },
  { value: 'diverifikasi', label: 'Diverifikasi', chipAktif: 'bg-primary-fixed text-primary font-semibold' },
  { value: 'diproses', label: 'Diproses', chipAktif: 'bg-secondary-fixed text-secondary font-semibold' },
  { value: 'selesai', label: 'Selesai', chipAktif: 'bg-secondary-container text-primary font-semibold' },
  { value: 'ditolak', label: 'Ditolak', chipAktif: 'bg-surface-container-highest text-on-surface font-semibold' },
]

/* ------------------------------------------------------------------ *
 * Pemetaan: baris database (Supabase) -> bentuk data yang dipakai UI
 * ------------------------------------------------------------------ */
const WARNA_KATEGORI = {
  'Infrastruktur & Jalan': 'text-secondary',
  'Kebersihan Lingkungan': 'text-primary',
  'Kependudukan & Dukcapil': 'text-secondary',
  'Ketertiban Umum': 'text-tertiary',
  'Pelayanan Air PDAM': 'text-primary',
  'Kesehatan & Bansos': 'text-tertiary',
  'Lainnya': 'text-on-surface-variant',
}

const BULAN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const formatTanggal = (iso) => {
  if (!iso) return '-'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '-'
  const dd = String(d.getDate()).padStart(2, '0')
  const mon = BULAN[d.getMonth()] ?? ''
  const yy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${dd} ${mon} ${yy} • ${hh}:${mm} WIB`
}

const dbKeUi = (row) => {
  const kategori = row.kategori_layanan ?? '-'
  return {
    id: row.nomor_tiket,
    nama: row.nama_pelapor,
    tanggal: formatTanggal(row.created_at),
    kategori,
    kategoriIcon: kategoriLayanan.find((k) => k.value === kategori)?.icon ?? 'category',
    kategoriColor: WARNA_KATEGORI[kategori] ?? 'text-primary',
    lokasi: row.lokasi_kejadian ?? '-',
    deskripsi: row.isi_laporan,
    lampiran: row.lampiran_bukti
      ? { icon: 'link', label: 'Lihat Bukti' }
      : { icon: 'image_not_supported', label: 'Tanpa Berkas' },
    instansi: row.instansi_tujuan ?? '-',
    pic: 'Menunggu Penugasan',
    status: row.status ?? 'baru',
    rating: row.rating_kepuasan,
  }
}

export default function ManajemenPengaduan() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorDb, setErrorDb] = useState(null)
  const [cari, setCari] = useState('')
  const [kategori, setKategori] = useState('')
  const [status, setStatus] = useState('')
  const [instansi, setInstansi] = useState('')
  const [terpilih, setTerpilih] = useState([])
  const [tiketAktif, setTiketAktif] = useState(null)
  const [modalManual, setModalManual] = useState(false)
  const [modalVerifikasi, setModalVerifikasi] = useState(null)
  const [toast, setToast] = useState(null)
  const [perHalaman, setPerHalaman] = useState(5)
  const [halaman, setHalaman] = useState(1)

  useEffect(() => {
    let aktif = true
    setLoading(true)
    setErrorDb(null)
    getPengaduan()
      .then((rows) => {
        if (!aktif) return
        const mapped = rows.map(dbKeUi)
        setData(mapped)
        setTiketAktif(mapped[0] || null)
      })
      .catch((err) => {
        if (!aktif) return
        setErrorDb(err)
      })
      .finally(() => {
        if (aktif) setLoading(false)
      })
    return () => {
      aktif = false
    }
  }, [])

  const kategoriList = useMemo(() => [...new Set(data.map((row) => row.kategori))], [data])
  const instansiList = useMemo(() => [...new Set(data.map((row) => row.instansi))], [data])

  const hasilFilter = useMemo(() => {
    const q = cari.trim().toLowerCase()
    return data.filter((row) => {
      const cocokCari =
        q === '' ||
        [row.id, row.nama, row.lokasi, row.kategori, row.instansi].join(' ').toLowerCase().includes(q)
      const cocokKategori = kategori === '' || row.kategori === kategori
      const cocokStatus = status === '' || row.status === status
      const cocokInstansi = instansi === '' || row.instansi === instansi
      return cocokCari && cocokKategori && cocokStatus && cocokInstansi
    })
  }, [data, cari, kategori, status, instansi])

  const dataHalaman = useMemo(
    () => hasilFilter.slice((halaman - 1) * perHalaman, halaman * perHalaman),
    [hasilFilter, halaman, perHalaman],
  )

  const hitunganStatus = useMemo(() => {
    const hasil = {}
    Object.keys(statusMeta).forEach((key) => {
      hasil[key] = data.filter((row) => row.status === key).length
    })
    return hasil
  }, [data])

  const totalHalaman = Math.max(1, Math.ceil(hasilFilter.length / perHalaman))

  const tampilkanToast = (message, statusToast = 'selesai', icon = 'check_circle') => {
    setToast({ message, status: statusToast, icon })
    window.setTimeout(() => setToast(null), 3200)
  }

  const togglePilih = (id) => {
    setTerpilih((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const togglePilihSemua = () => {
    const ids = dataHalaman.map((row) => row.id)
    const semuaTerpilih = ids.length > 0 && ids.every((id) => terpilih.includes(id))
    setTerpilih((prev) =>
      semuaTerpilih ? prev.filter((id) => !ids.includes(id)) : [...new Set([...prev, ...ids])],
    )
  }

  const simpanPerubahan = async ({ tiketId, status: statusBaru, opd, pic }) => {
    try {
      await ubahPengaduan(tiketId, { status: statusBaru, instansi_tujuan: opd })
      setData((prev) =>
        prev.map((row) =>
          row.id === tiketId
            ? { ...row, status: statusBaru, instansi: opd || row.instansi, pic: pic || row.pic }
            : row,
        ),
      )
      setTiketAktif((prev) =>
        prev && prev.id === tiketId
          ? { ...prev, status: statusBaru, instansi: opd || prev.instansi, pic: pic || prev.pic }
          : prev,
      )
      tampilkanToast(
        `Status tiket ${tiketId} diperbarui menjadi ${statusMeta[statusBaru].label}.`,
        statusBaru,
      )
    } catch (err) {
      tampilkanToast(`Gagal memperbarui tiket ${tiketId}: ${(err && err.message) || err}`, 'baru', 'error')
    }
  }

  const bulkAksi = async (aksi) => {
    if (terpilih.length === 0) {
      tampilkanToast('Pilih minimal satu tiket untuk menjalankan aksi massal.', 'baru', 'error')
      return
    }
    if (aksi === 'verifikasi') {
      const target = data.filter((row) => terpilih.includes(row.id) && row.status === 'baru')
      try {
        await Promise.all(target.map((row) => ubahPengaduan(row.id, { status: 'diverifikasi' })))
        setData((prev) =>
          prev.map((row) =>
            terpilih.includes(row.id) && row.status === 'baru'
              ? { ...row, status: 'diverifikasi' }
              : row,
          ),
        )
        tampilkanToast(`${terpilih.length} tiket berhasil diverifikasi secara massal.`)
      } catch (err) {
        tampilkanToast(
          `Gagal memverifikasi massal: ${(err && err.message) || err}`,
          'baru',
          'error',
        )
      }
    } else {
      const target = data.filter((row) => terpilih.includes(row.id) && row.status !== 'selesai' && row.status !== 'ditolak')
      try {
        await Promise.all(target.map((row) => ubahPengaduan(row.id, { status: 'diproses' })))
        setData((prev) =>
          prev.map((row) =>
            terpilih.includes(row.id) && row.status !== 'selesai' && row.status !== 'ditolak'
              ? { ...row, status: 'diproses' }
              : row,
          ),
        )
        tampilkanToast(`${terpilih.length} tiket didelegasikan ke dinas tujuan.`, 'diproses', 'forward')
      } catch (err) {
        tampilkanToast(
          `Gagal mendelegasikan: ${(err && err.message) || err}`,
          'baru',
          'error',
        )
      }
    }
    setTerpilih([])
  }

  const simpanPengaduanManual = async (form) => {
    const barisDb = {
      nama_pelapor: form.nama || 'Warga Anonim',
      kategori_layanan: form.kategori,
      isi_laporan: form.deskripsi || '-',
      lokasi_kejadian: form.lokasi || '-',
      instansi_tujuan: form.instansi,
      lampiran_bukti: '',
      rating_kepuasan: null,
      status: 'baru',
    }
    try {
      const dibuat = await tambahPengaduan(barisDb)
      const nomorBaru = dibuat.nomor_tiket
      setData((prev) => [dbKeUi(dibuat), ...prev])
      setHalaman(1)
      setModalManual(false)
      tampilkanToast(`Pengaduan manual terdaftar dengan nomor tiket ${nomorBaru}.`)
    } catch (err) {
      tampilkanToast(
        `Gagal mendaftarkan pengaduan: ${(err && err.message) || err}`,
        'baru',
        'error',
      )
    }
  }

  const konfirmasiVerifikasi = async () => {
    const id = modalVerifikasi?.id
    try {
      await ubahPengaduan(id, { status: 'diverifikasi' })
      setData((prev) =>
        prev.map((row) => (row.id === id ? { ...row, status: 'diverifikasi' } : row)),
      )
      tampilkanToast(`Verifikasi tiket ${id} berhasil diproses.`)
    } catch (err) {
      tampilkanToast(
        `Gagal memverifikasi tiket ${id}: ${(err && err.message) || err}`,
        'baru',
        'error',
      )
    }
    setModalVerifikasi(null)
  }

  const tolakVerifikasi = async () => {
    const id = modalVerifikasi?.id
    try {
      await ubahPengaduan(id, { status: 'ditolak' })
      setData((prev) =>
        prev.map((row) => (row.id === id ? { ...row, status: 'ditolak' } : row)),
      )
      tampilkanToast(`Pengaduan ${id} ditandai tidak valid.`, 'ditolak', 'cancel')
    } catch (err) {
      tampilkanToast(
        `Gagal menolak tiket ${id}: ${(err && err.message) || err}`,
        'baru',
        'error',
      )
    }
    setModalVerifikasi(null)
  }

  const hapusTiket = async (row) => {
    if (!window.confirm(`Hapus tiket ${row.id}?\nTindakan ini tidak dapat dibatalkan.`)) return
    try {
      await hapusPengaduan(row.id)
      setData((prev) => prev.filter((r) => r.id !== row.id))
      if (tiketAktif && tiketAktif.id === row.id) setTiketAktif(null)
      setTerpilih((prev) => prev.filter((x) => x !== row.id))
      tampilkanToast(`Tiket ${row.id} telah dihapus.`)
    } catch (err) {
      tampilkanToast(
        `Gagal menghapus tiket ${row.id}: ${(err && err.message) || err}`,
        'baru',
        'error',
      )
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Dashboard */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-2">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Portal Administrator Daerah • SP4N Terpadu
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Manajemen Pengaduan & Tindak Lanjut
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
            Sistem Pengelolaan, Verifikasi Validitas, dan Distribusi Aspirasi Warga Terpadu ke
            Organisasi Perangkat Daerah (OPD) se-Wilayah Administratif.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm"
            onClick={() =>
              tampilkanToast(
                'Rekapitulasi berkas laporan sedang diproses dalam format Excel dan PDF terenkripsi.',
                'diverifikasi',
                'download',
              )
            }
            type="button"
          >
            <Icon name="download" className="text-[20px] text-primary" />
            <span>Ekspor Rekapitulasi</span>
          </button>
          <button
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all shadow-sm"
            onClick={() => setModalManual(true)}
            type="button"
          >
            <Icon name="add" className="text-[20px]" />
            <span>+ Tambah Pengaduan Manual</span>
          </button>
        </div>
      </div>

      {/* 4 Kartu Metrik Ringkasan */}
      <KartuMetrik />

      {/* Filter Bar & Pencarian */}
      <FilterBar
        cari={cari}
        hitunganStatus={hitunganStatus}
        instansi={instansi}
        instansiList={instansiList}
        kategori={kategori}
        kategoriList={kategoriList}
        onReset={() => {
          setCari('')
          setKategori('')
          setStatus('')
          setInstansi('')
          setHalaman(1)
        }}
        setCari={(v) => {
          setCari(v)
          setHalaman(1)
        }}
        setInstansi={(v) => {
          setInstansi(v)
          setHalaman(1)
        }}
        setKategori={(v) => {
          setKategori(v)
          setHalaman(1)
        }}
        setStatus={(v) => {
          setStatus(v)
          setHalaman(1)
        }}
        status={status}
        statusList={STATUS_LIST}
      />

      {/* Layout Grid: Tabel Utama (Kiri 8-Kolom) & Panel Aksi + Master Data (Kanan 4-Kolom) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start" id="tabel-pengaduan">
        {/* Kolom Kiri: Tabel Data Pengaduan */}
        <div className="xl:col-span-8 flex flex-col space-y-4">
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <input
                checked={
                  dataHalaman.length > 0 &&
                  dataHalaman.every((row) => terpilih.includes(row.id))
                }
                className="w-4 h-4 rounded text-primary focus:ring-primary"
                onChange={togglePilihSemua}
                type="checkbox"
              />
              <span className="font-label-md text-label-md text-on-surface">
                Pilih Semua (<span id="selected-count">{terpilih.length}</span> terpilih)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm transition-colors"
                onClick={() => bulkAksi('verifikasi')}
                type="button"
              >
                <Icon name="verified" className="text-[18px]" />
                Verifikasi Massal
              </button>
              <button
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary font-label-sm text-label-sm transition-colors"
                onClick={() => bulkAksi('delegasi')}
                type="button"
              >
                <Icon name="forward_to_inbox" className="text-[18px]" />
                Delegasikan ke Dinas
              </button>
            </div>
          </div>

          {/* Tabel Kontainer Pengaduan */}
          {loading && (
            <div className="p-12 text-center rounded-2xl bg-surface-container-lowest shadow-sm">
              <Icon name="hourglass_empty" className="text-[40px] text-on-surface-variant animate-spin" />
              <p className="mt-3 font-label-md text-label-md text-on-surface font-semibold">
                Memuat data pengaduan dari Supabase…
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Mohon tunggu sejenak.
              </p>
            </div>
          )}
          {errorDb && !loading && (
            <div className="p-12 text-center rounded-2xl bg-surface-container-lowest shadow-sm">
              <Icon name="error_outline" className="text-[40px] text-error" />
              <p className="mt-3 font-label-md text-label-md text-on-surface font-semibold">
                Gagal memuat data dari Supabase
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {(errorDb && errorDb.message) || 'Terjadi kesalahan koneksi.'}
              </p>
            </div>
          )}
          {!loading && !errorDb && (
            <TabelPengaduan
              data={dataHalaman}
              onDetail={(row) => setTiketAktif(row)}
              onSalin={(id) => {
                navigator.clipboard?.writeText(id)
                tampilkanToast(`Nomor tiket ${id} disalin ke papan klip.`)
              }}
              onVerifikasi={(row) => setModalVerifikasi(row)}
              onHapus={(row) => hapusTiket(row)}
              terpilih={terpilih}
              togglePilih={togglePilih}
            />
          )}

          {/* Pagination Controls */}
          <div className="p-4 bg-surface-container-low rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant font-caption text-caption">
            <div className="flex items-center gap-2">
              <span>
                Menampilkan{' '}
                <strong>{hasilFilter.length === 0 ? 0 : (halaman - 1) * perHalaman + 1}</strong>
                {' - '}
                <strong>{Math.min(halaman * perHalaman, hasilFilter.length)}</strong> dari{' '}
                <strong>{hasilFilter.length}</strong> pengaduan
              </span>
              <span className="text-outline">|</span>
              <label className="text-on-surface" htmlFor="page-size">
                Baris per halaman:
              </label>
              <select
                className="bg-surface-container-lowest px-2 py-1 rounded text-on-surface focus:outline-none"
                id="page-size"
                onChange={(e) => {
                  setPerHalaman(Number(e.target.value))
                  setHalaman(1)
                }}
                value={perHalaman}
              >
                {[5, 10, 25, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                className="p-1.5 rounded-md hover:bg-surface-container disabled:opacity-40"
                disabled={halaman === 1}
                onClick={() => setHalaman(1)}
                type="button"
              >
                <Icon name="first_page" className="text-[18px]" />
              </button>
              <button
                className="p-1.5 rounded-md hover:bg-surface-container disabled:opacity-40"
                disabled={halaman === 1}
                onClick={() => setHalaman((h) => Math.max(1, h - 1))}
                type="button"
              >
                <Icon name="chevron_left" className="text-[18px]" />
              </button>
              {Array.from({ length: Math.min(totalHalaman, 5) }).map((_, i) => (
                <button
                  className={
                    'px-3 py-1 rounded-md font-semibold ' +
                    (halaman === i + 1
                      ? 'bg-primary text-on-primary'
                      : 'hover:bg-surface-container text-on-surface')
                  }
                  key={i}
                  onClick={() => setHalaman(i + 1)}
                  type="button"
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="p-1.5 rounded-md hover:bg-surface-container disabled:opacity-40"
                disabled={halaman === totalHalaman}
                onClick={() => setHalaman((h) => Math.min(totalHalaman, h + 1))}
                type="button"
              >
                <Icon name="chevron_right" className="text-[18px]" />
              </button>
              <button
                className="p-1.5 rounded-md hover:bg-surface-container disabled:opacity-40"
                disabled={halaman === totalHalaman}
                onClick={() => setHalaman(totalHalaman)}
                type="button"
              >
                <Icon name="last_page" className="text-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Kolom Samping: Detail Aksi Petugas & Widget Master Data */}
        <div className="xl:col-span-4 flex flex-col space-y-6">
          <PanelAksiTiket
            onSimpan={simpanPerubahan}
            onTutup={() => setTiketAktif(null)}
            tiket={tiketAktif}
          />
          <MasterData
            onAksi={(key) =>
              tampilkanToast(
                key === 'direktori'
                  ? 'Menuju modul lengkap pengaturan Master Data & Hak Akses OPD.'
                  : key === 'kategori'
                    ? 'Membuka dialog konfigurasi Data Master 12 Kategori Layanan Warga.'
                    : 'Membuka konfigurasi 34 Instansi Daerah & Pejabat Penghubung PPID.',
                'diverifikasi',
                'tune',
              )
            }
          />
        </div>
      </div>

      {/* Modal Verifikasi */}
      {modalVerifikasi && (
        <ModalVerifikasi
          onClose={() => setModalVerifikasi(null)}
          onTerima={konfirmasiVerifikasi}
          onTolak={tolakVerifikasi}
          tiket={modalVerifikasi}
        />
      )}

      {/* Modal Pengaduan Manual */}
      <ModalPengaduanManual
        onClose={() => setModalManual(false)}
        onSimpan={simpanPengaduanManual}
        open={modalManual}
      />

      {/* Toast Notifikasi */}
      {toast && (
        <Toast
          icon={toast.icon}
          message={toast.message}
          onClose={() => setToast(null)}
          status={toast.status}
        />
      )}
    </div>
  )
}