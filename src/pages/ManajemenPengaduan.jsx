import { useMemo, useState } from 'react'
import { daftarPengaduan as dataAwal, statusMeta } from '../data'
import { Icon, Toast } from '../components/ui'
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

export default function ManajemenPengaduan() {
  const [data, setData] = useState(dataAwal)
  const [cari, setCari] = useState('')
  const [kategori, setKategori] = useState('')
  const [status, setStatus] = useState('')
  const [instansi, setInstansi] = useState('')
  const [terpilih, setTerpilih] = useState([])
  const [tiketAktif, setTiketAktif] = useState(dataAwal[0] || null)
  const [modalManual, setModalManual] = useState(false)
  const [modalVerifikasi, setModalVerifikasi] = useState(null)
  const [toast, setToast] = useState(null)
  const [perHalaman, setPerHalaman] = useState(5)
  const [halaman, setHalaman] = useState(1)

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

  const simpanPerubahan = ({ tiketId, status: statusBaru, opd, pic }) => {
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
  }

  const bulkAksi = (aksi) => {
    if (terpilih.length === 0) {
      tampilkanToast('Pilih minimal satu tiket untuk menjalankan aksi massal.', 'baru', 'error')
      return
    }
    if (aksi === 'verifikasi') {
      setData((prev) =>
        prev.map((row) =>
          terpilih.includes(row.id) && row.status === 'baru'
            ? { ...row, status: 'diverifikasi' }
            : row,
        ),
      )
      tampilkanToast(`${terpilih.length} tiket berhasil diverifikasi secara massal.`)
    } else {
      tampilkanToast(`${terpilih.length} tiket didelegasikan ke dinas tujuan.`, 'diproses', 'forward')
    }
    setTerpilih([])
  }

  const simpanPengaduanManual = (form) => {
    const nomorBaru = `TKT-2025-${1105 + data.length}`
    const rowBaru = {
      id: nomorBaru,
      nama: form.nama || 'Warga Anonim',
      tanggal: '15 Nov 2025 • 10:00 WIB',
      kategori: form.kategori,
      kategoriIcon: 'campaign',
      kategoriColor: 'text-primary',
      lokasi: form.lokasi || '-',
      deskripsi: form.deskripsi || '-',
      lampiran: { icon: 'attachment', label: 'Bukti Foto (1 File)' },
      instansi: form.instansi,
      pic: 'Menunggu Penugasan',
      status: 'baru',
      rating: null,
    }
    setData((prev) => [rowBaru, ...prev])
    setModalManual(false)
    tampilkanToast(`Pengaduan manual terdaftar dengan nomor tiket ${nomorBaru}.`)
  }

  const konfirmasiVerifikasi = () => {
    const id = modalVerifikasi?.id
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: 'diverifikasi' } : row)),
    )
    setModalVerifikasi(null)
    tampilkanToast(`Verifikasi tiket ${id} berhasil diproses.`)
  }

  const tolakVerifikasi = () => {
    const id = modalVerifikasi?.id
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: 'ditolak' } : row)),
    )
    setModalVerifikasi(null)
    tampilkanToast(`Pengaduan ${id} ditandai tidak valid.`, 'ditolak', 'cancel')
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
          <TabelPengaduan
            data={dataHalaman}
            onDetail={(row) => setTiketAktif(row)}
            onSalin={(id) => {
              navigator.clipboard?.writeText(id)
              tampilkanToast(`Nomor tiket ${id} disalin ke papan klip.`)
            }}
            onVerifikasi={(row) => setModalVerifikasi(row)}
            terpilih={terpilih}
            togglePilih={togglePilih}
          />

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