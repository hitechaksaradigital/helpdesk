/**
 * Data contoh terpusat untuk Portal Pengaduan Masyarakat LAPOR-DAERAH.
 * Dipakai bersama oleh halaman publik (`/`) dan halaman admin (`/manajemen-pengaduan`).
 */

/* ------------------------------------------------------------------ *
 * Kategori layanan (dipakai pada form publik & filter admin)
 * ------------------------------------------------------------------ */
export const kategoriLayanan = [
  { value: 'Infrastruktur & Jalan', label: 'Infrastruktur & Jalan', icon: 'add_road', filterKey: 'Infrastruktur' },
  { value: 'Kebersihan Lingkungan', label: 'Kebersihan Lingkungan', icon: 'delete_outline', filterKey: 'Lingkungan' },
  { value: 'Kependudukan & Dukcapil', label: 'Pelayanan Dukcapil', icon: 'badge', filterKey: 'Pelayanan' },
  { value: 'Ketertiban Umum', label: 'Ketertiban Umum', icon: 'local_police', filterKey: 'Ketertiban' },
  { value: 'Pelayanan Air PDAM', label: 'Pelayanan Air PDAM', icon: 'water_drop', filterKey: 'Pelayanan' },
  { value: 'Kesehatan & Bansos', label: 'Kesehatan & Bansos', icon: 'health_and_safety', filterKey: 'Pelayanan' },
  { value: 'Lainnya', label: 'Aspirasi Lainnya', icon: 'more_horiz', filterKey: 'Lainnya' },
]

/* Instansi / OPD tujuan */
export const opdList = [
  { value: 'Dinas PUPR Daerah', label: 'Dinas Pekerjaan Umum & Perumahan Rakyat', short: 'Dinas Pekerjaan Umum' },
  { value: 'DLH Kota', label: 'Dinas Lingkungan Hidup (DLH)', short: 'Dinas Lingkungan Hidup' },
  { value: 'Disdukcapil', label: 'Dinas Kependudukan & Pencatatan Sipil', short: 'Disdukcapil' },
  { value: 'Satpol PP', label: 'Satuan Polisi Pamong Praja (Satpol PP)', short: 'Satpol PP Daerah' },
  { value: 'Dinas Kesehatan', label: 'Dinas Kesehatan (Dinkes)', short: 'Dinas Kesehatan' },
  { value: 'Dishub Kota', label: 'Dinas Perhubungan (Dishub)', short: 'Dishub' },
  { value: 'Perumda Air Minum', label: 'Perumda Air Minum (PDAM Kota)', short: 'PDAM Kota' },
  { value: 'Inspektorat Daerah', label: 'Inspektorat Daerah', short: 'Inspektorat' },
]

export const opdLabel = (value) =>
  opdList.find((opd) => opd.value === value)?.label ?? value

/* Meta status pengaduan */
export const statusMeta = {
  baru: { value: 'baru', label: 'Baru', badge: 'bg-error-container text-on-error-container', dot: 'bg-error', accent: 'text-error' },
  diverifikasi: { value: 'diverifikasi', label: 'Diverifikasi', badge: 'bg-primary-fixed text-primary', dot: 'bg-primary', accent: 'text-primary' },
  diproses: { value: 'diproses', label: 'Diproses', badge: 'bg-secondary-fixed text-secondary', dot: 'bg-secondary', accent: 'text-secondary' },
  selesai: { value: 'selesai', label: 'Selesai', badge: 'bg-secondary-container text-on-secondary-container', dot: 'bg-primary', accent: 'text-secondary' },
  ditolak: { value: 'ditolak', label: 'Ditolak', badge: 'bg-surface-container-highest text-on-surface-variant', dot: 'bg-outline', accent: 'text-on-surface-variant' },
}

export const statusOptions = [
  { value: 'baru', label: 'Baru (Menunggu Konfirmasi)' },
  { value: 'diverifikasi', label: 'Diverifikasi (Data & Berkas Sah)' },
  { value: 'diproses', label: 'Diproses (Sedang Dikerjakan OPD)' },
  { value: 'selesai', label: 'Selesai (Aduan Telah Tuntas)' },
  { value: 'ditolak', label: 'Ditolak (Tidak Sesuai / Fiktif)' },
]

/* Daftar pengaduan (tabel admin) */
export const daftarPengaduan = [
  {
    id: 'TKT-2025-1104',
    nama: 'Bambang Sutrisno',
    tanggal: '15 Nov 2025 • 09:12 WIB',
    kategori: 'Pelayanan Air PDAM',
    kategoriIcon: 'water_drop',
    kategoriColor: 'text-primary',
    lokasi: 'Pertigaan Jl. Merdeka RT 02/04',
    deskripsi:
      'Pipa air utama bocor di pertigaan Jl. Merdeka mengakibatkan genangan air bersih setinggi mata kaki dan aspal mulai retak.',
    lampiran: { icon: 'attachment', label: 'Bukti Foto (2 File)' },
    instansi: 'Perumda Air Minum',
    pic: 'Ir. Handoko, MT',
    status: 'baru',
    rating: null,
  },
  {
    id: 'TKT-2025-1103',
    nama: 'Siti Nurhaliza',
    tanggal: '15 Nov 2025 • 08:30 WIB',
    kategori: 'Infrastruktur & Jalan',
    kategoriIcon: 'construction',
    kategoriColor: 'text-secondary',
    lokasi: 'Jl. Veteran No. 45 Kec. Klojen',
    deskripsi:
      'Jalan amblas sedalam 30cm membahayakan pengendara motor saat malam hari minim penerangan PJU.',
    lampiran: { icon: 'attachment', label: 'Bukti Foto (3 File)' },
    instansi: 'Dinas PUPR Daerah',
    pic: 'Sigit Wardhana, ST',
    status: 'diproses',
    rating: null,
  },
  {
    id: 'TKT-2025-1098',
    nama: 'Hendra Wijaya',
    tanggal: '14 Nov 2025 • 15:45 WIB',
    kategori: 'Kebersihan Lingkungan',
    kategoriIcon: 'recycling',
    kategoriColor: 'text-primary',
    lokasi: 'TPS Liar RW 04 Kel. Sukun',
    deskripsi:
      'Tumpukan sampah plastik dan limbah rumah tangga meluber ke bahu jalan selama 4 hari belum diangkut armada sampah.',
    lampiran: { icon: 'attachment', label: 'Bukti Foto (1 File)' },
    instansi: 'DLH Kota',
    pic: 'Joko Susanto',
    status: 'selesai',
    rating: 5,
  },
  {
    id: 'TKT-2025-1095',
    nama: 'Dewi Anggraini',
    tanggal: '14 Nov 2025 • 11:20 WIB',
    kategori: 'Kependudukan & Dukcapil',
    kategoriIcon: 'badge',
    kategoriColor: 'text-secondary',
    lokasi: 'Kantor Kecamatan Kedungkandang',
    deskripsi:
      'Permohonan cetak ulang KTP-el rusak telah diajukan online namun belum ada pembaruan status jadwal pengambilan dokumen.',
    lampiran: { icon: 'attachment', label: 'Bukti Resi (1 File)' },
    instansi: 'Disdukcapil',
    pic: 'Rina Mardiana',
    status: 'diverifikasi',
    rating: null,
  },
  {
    id: 'TKT-2025-1088',
    nama: 'Ahmad Fauzi',
    tanggal: '13 Nov 2025 • 20:10 WIB',
    kategori: 'Ketertiban Umum',
    kategoriIcon: 'shield',
    kategoriColor: 'text-tertiary',
    lokasi: 'Jl. Raya Sawojajar Depan Ruko',
    deskripsi:
      'Penggunaan trotoar pejalan kaki sebagai lapak dagang permanen dan parkir liar kendaraan roda dua.',
    lampiran: { icon: 'image_not_supported', label: 'Tanpa Berkas' },
    instansi: 'Satpol PP',
    pic: 'Regu Pentertiban II',
    status: 'ditolak',
    rating: null,
  },
]


/* Log jejak audit per tiket (panel detail admin) */
export const jejakAudit = {
  'TKT-2025-1104': [
    {
      waktu: '15 Nov 2025 • 09:20 WIB',
      judul: 'Diverifikasi Admin Sri Rahayu',
      detail: 'Validasi foto kebocoran air valid dan memenuhi kriteria urgensi.',
      color: 'bg-primary',
    },
    {
      waktu: '15 Nov 2025 • 09:25 WIB',
      judul: 'Diteruskan ke Perumda Air Minum',
      detail: 'Disposisi Surat Dinas No. 800/URC-PDAM/2025.',
      color: 'bg-secondary',
    },
    {
      waktu: '15 Nov 2025 • 09:12 WIB',
      judul: 'Laporan Dibuat oleh Warga',
      detail: 'Melalui aplikasi LAPOR-DAERAH Web Standard.',
      color: 'bg-outline',
    },
  ],
}

/* Tiket demo untuk pelacak mandiri (halaman publik) */
export const tiketDemo = {
  id: 'TKT-2025-0891',
  subjek: 'Perbaikan Lampu Penerangan Jalan Umum (PJU) Mati di Jl. Veteran Blok C',
  instansi: 'Dinas Perhubungan & Tata Kota',
  labelStatus: 'DIPROSES OPD',
  catatan: {
    judul: 'Catatan Petugas Lapangan (Dishub Unit II):',
    isi: 'Tim teknis telah tiba di lokasi per pukul 09.00 WIB untuk penggantian trafo bohlam LED PJU. Diperkirakan normal malam ini.',
  },
  langkah: [
    { label: 'Diterima', waktu: '10 Mei 08:30', state: 'done', icon: 'done' },
    { label: 'Diverifikasi', waktu: '10 Mei 11:15', state: 'done', icon: 'done' },
    { label: 'Diproses Lapangan', waktu: '11 Mei (Sedang Jalan)', state: 'active', icon: 'engineering' },
    { label: 'Selesai & Evaluasi', waktu: 'Estimasi 12 Mei', state: 'todo', icon: 'check_circle' },
  ],
  progres: 66,
}

/* Statistik transparansi publik */
export const statistikPublik = [
  {
    key: 'masuk',
    label: 'Total Pengaduan Masuk',
    nilai: '14.820',
    deskripsi: 'Akumulasi aspirasi terdaftar dari 12 kecamatan.',
    icon: 'mark_email_read',
    badge: '+128 pekan ini',
    badgeClass: 'bg-surface-container text-on-surface-variant',
    iconClass: 'bg-surface-container text-on-surface',
    nilaiClass: 'text-on-surface',
    barClass: 'bg-surface-container-high',
    barHover: 'group-hover:bg-primary',
  },
  {
    key: 'diproses',
    label: 'Sedang Diproses OPD',
    nilai: '342',
    deskripsi: 'Diverifikasi & instruksi lapangan aktif.',
    icon: 'pending_actions',
    badge: 'Dalam Pengerjaan',
    badgeClass: 'bg-secondary-container text-on-secondary-container font-semibold',
    iconClass: 'bg-secondary-container text-on-secondary-container',
    nilaiClass: 'text-secondary',
    barClass: 'bg-secondary-container',
    barHover: 'group-hover:bg-secondary',
  },
  {
    key: 'selesai',
    label: 'Pengaduan Selesai',
    nilai: '13.985',
    deskripsi: 'Terselesaikan dengan Surat Berita Acara resmi.',
    icon: 'task_alt',
    badge: '94.4% Berhasil',
    badgeClass: 'bg-primary-fixed text-primary font-bold',
    iconClass: 'bg-primary-fixed text-primary',
    nilaiClass: 'text-primary',
    barClass: 'bg-primary',
    barHover: 'bg-primary',
  },
  {
    key: 'rating',
    label: 'Indeks Kepuasan Warga',
    nilai: '4.8',
    suffix: '/ 5.0',
    deskripsi: 'Berdasarkan 8.420 ulasan langsung masyarakat.',
    icon: 'thumb_up',
    badge: '4.8 / 5.0',
    badgeClass: 'bg-secondary-fixed text-secondary',
    iconClass: 'bg-secondary-fixed text-secondary',
    nilaiClass: 'text-on-surface',
    barClass: 'bg-secondary-fixed-dim',
    barHover: 'bg-secondary-fixed-dim',
  },
]

/* Alur 4 langkah */
export const alurLangkah = [
  {
    nomor: '01',
    judul: 'Tulis Laporan Rinci',
    deskripsi:
      'Isi formulir daring dengan deskripsi jelas, sertakan foto/dokumen otentik, dan tentukan tingkat privasi (Publik/Anonim).',
    iconClass: 'bg-primary text-on-primary',
  },
  {
    nomor: '02',
    judul: 'Verifikasi 1x24 Jam',
    deskripsi:
      'Tim sekretariat verifikator memeriksa kelayakan laporan dan mendisposisikan secara digital ke dinas penanggung jawab.',
    iconClass: 'bg-secondary text-on-secondary',
  },
  {
    nomor: '03',
    judul: 'Aksi OPD Terkait',
    deskripsi:
      'Dinas terkait menerjunkan tim teknis ke lapangan untuk investigasi atau perbaikan langsung dengan tenggat waktu terpantau.',
    iconClass: 'bg-primary-container text-on-primary-container',
  },
  {
    nomor: '04',
    judul: 'Tuntas & Beri Rating',
    deskripsi:
      'Pelapor menerima notifikasi hasil perbaikan berserta bukti foto Berita Acara, lalu dapat memberikan ulasan bintang kepuasan.',
    iconClass: 'bg-secondary-container text-on-secondary-container',
  },
]

/* FAQ */
export const faqItems = [
  {
    pertanyaan: 'Berapa lama standar waktu tindak lanjut aduan saya?',
    jawaban:
      'Sesuai dengan SOP Pelayanan Pengaduan Daerah: verifikasi awal diselesaikan dalam maksimal 1x24 jam kerja. Untuk aduan darurat (misal: pohon tumbang, tanggul jebol) penanganan lapangan dilakukan dalam < 6 jam. Sedangkan pekerjaan infrastruktur fisik menengah berlangsung antara 3 sampai 7 hari kerja.',
  },
  {
    pertanyaan: 'Bagaimana sistem menjamin kerahasiaan identitas pelapor?',
    jawaban:
      'Platform LAPOR-DAERAH dilengkapi enkripsi tingkat tinggi sesuai UU Perlindungan Data Pribadi (UU PDP). Jika Anda memilih opsi "Anonim" atau "Rahasia", NIK, nama lengkap, dan kontak Anda dienkripsi sehingga petugas lapangan dan publik tidak dapat melihat data pribadi Anda.',
  },
  {
    pertanyaan: 'Apa syarat lampiran bukti agar aduan tidak ditolak?',
    jawaban:
      'Lampirkan foto jelas lokasi kejadian dengan penanda patokan sekitar (nama jalan/gedung terdekat), atau dokumen resmi seperti scan tanda terima berkas jika berkaitan dengan sengketa perizinan/kependudukan. Format yang diterima: JPG, PNG, atau PDF dengan batas berkas 10MB.',
  },
  {
    pertanyaan: 'Apakah saya bisa mengajukan banding jika hasil tindak lanjut belum memuaskan?',
    jawaban:
      'Bisa. Saat menerima Berita Acara Penyelesaian, Anda memiliki hak memberikan penilaian rating. Jika Anda memberikan rating bintang 1 atau 2, sistem secara otomatis meneruskan tiket ke Inspektorat Daerah sebagai nota keberatan untuk dilakukan audit investigasi ulang.',
  },
]


/* Filter katalog pengaduan publik */
export const filterKatalog = [
  { key: 'semua', label: 'Semua Kategori' },
  { key: 'Infrastruktur', label: 'Infrastruktur' },
  { key: 'Lingkungan', label: 'Lingkungan' },
  { key: 'Pelayanan', label: 'Pelayanan Publik' },
  { key: 'Selesai', label: 'Selesai Ditindaklanjuti' },
]

/* Katalog pengaduan publik */
export const katalogPengaduan = [
  {
    id: 'TKT-2025-1104',
    kategori: 'Infrastruktur & Jalan',
    filterKey: 'Infrastruktur',
    judul: 'Aspal Amblas dan Lubang Berbahaya di Jl. Merdeka Barat',
    kutipan:
      '"Jalan berlubang cukup dalam sekitar 15 cm di depan SDN 02 Merdeka. Sudah menyebabkan 2 pengendara motor jatuh pada malam hari karena minim penerangan."',
    lokasi: 'Kelurahan Kauman, Kec. Klojen',
    instansi: 'Dinas PUPR (Bina Marga)',
    status: 'selesai',
    statusLabel: 'SELESAI DITANGANI',
    rating: 5,
    peninjau: 'Bpk. Hendra S.',
    testimoni:
      '"Jalan berlubang sudah ditambal dalam 2 hari, terima kasih pemda & tim reaksi cepat PUPR!"',
    durasi: 'Selesai dlm 41 Jam',
    tanggapan: 14,
    aksi: [
      { label: 'Tanggapan (14)', icon: 'forum', style: 'ghost' },
      { label: 'Bukti BAP (PDF)', icon: 'download', style: 'primary' },
    ],
  },
  {
    id: 'TKT-2025-1092',
    kategori: 'Kebersihan Lingkungan',
    filterKey: 'Lingkungan',
    judul: 'Penumpukan Sampah Liar di Bantaran Sungai Brantas',
    kutipan:
      '"Sampah plastik dan limbah rumah tangga menggunung di dekat jembatan gantung RT 05. Berpotensi menyumbat aliran air saat hujan lebat dan meneba bau busuk."',
    lokasi: 'Kelurahan Jodipan, Kec. Blimbing',
    instansi: 'Dinas Lingkungan Hidup (DLH)',
    status: 'diproses',
    statusLabel: 'SEDANG DIPROSES',
    rating: null,
    peninjau: 'Warga Anonim',
    catatanInstansi: {
      judul: 'Tanggapan Dinas (Hari ini, 09.20 WIB):',
      isi: '"Armada truk pengangkut kontainer kuning sedang diarahkan ke lokasi untuk pembersihan massal hari ini."',
    },
    durasi: 'Selesai dlm 24 Jam',
    tanggapan: 9,
    aksi: [
      { label: 'Detail Laporan', icon: 'visibility', style: 'ghost' },
      { label: 'Dukung Aduan', icon: 'add_comment', style: 'secondary' },
    ],
  },
  {
    id: 'TKT-2025-1077',
    kategori: 'Pelayanan Publik',
    filterKey: 'Pelayanan',
    judul: 'Keluhan Antrean Server e-KTP Lambat di Kantor Kecamatan',
    kutipan:
      '"Pelayanan perekaman KTP elektronik di loket 3 sempat terhenti lebih dari 3 jam karena kendala jaringan server pusat, ruang tunggu penuh dan warga menumpuk."',
    lokasi: 'Kantor Kecamatan Lowokwaru',
    instansi: 'Dinas Kependudukan & Pencatatan Sipil',
    status: 'diverifikasi',
    statusLabel: 'VERIFIKASI AWAL',
    rating: null,
    peninjau: 'Rina Wardani',
    validasi: {
      judul: 'Validasi Tim Pengawas:',
      isi: 'Dokumen aduan lengkap, koordinasi sinkronisasi server jaringan Diskominfo telah dikirimkan.',
    },
    durasi: 'Selesai dlm 12 Jam',
    tanggapan: 22,
    aksi: [
      { label: 'Ikuti Diskusi', icon: 'forum', style: 'ghost' },
      { label: 'Bagikan', icon: 'share', style: 'neutral' },
    ],
  },
]


/* Testimoni warga */
export const testimoni = [
  {
    rating: 5,
    tiket: '#TKT-2025-0811',
    ulasan:
      '"Pengurusan pembetulan e-KTP dan Kartu Keluarga yang sebelumnya tertunda berbulan-bulan langsung dibereskan staf Dispendukcapil dalam tempo 24 jam setelah melapor di sini."',
    nama: 'Dr. Ahmad Faisal, M.Si',
    wilayah: 'Kecamatan Sukun',
  },
  {
    rating: 5,
    tiket: '#TKT-2025-0943',
    ulasan:
      '"Sangat transparan. Kami dapat memantau kapan truk damkar & DLH datang membersihkan saluran air tersumbat di RW kami. Bukti foto sebelum dan sesudah sangat memuaskan."',
    nama: 'Siti Rahmawati',
    wilayah: 'Kecamatan Lowokwaru',
  },
]

/* Kontak sekretariat */
export const kontakSekretariat = [
  { icon: 'location_on', text: 'Gedung Sekretariat Daerah Lt. 2' },
  { icon: 'location_on', text: 'Jl. Pahlawan Praja No. 1, Pusat Pelayanan Warga' },
  { icon: 'call', text: 'Telepon: (021) 555-0199 / 555-0198' },
  { icon: 'mail', text: 'Surel: pengaduan@lapor-daerah.go.id' },
  { icon: 'schedule', text: 'Jam Kerja: Senin - Jumat (08.00 - 16.00 WIB)' },
]

/* Nomor darurat */
export const nomorDarurat = [
  { label: 'Command Center Daerah', nomor: '112' },
  { label: 'Pemadam Kebakaran & SAR', nomor: '113' },
  { label: 'Ambulans Siaga Gawat', nomor: '119' },
]

/* Opsi privasi laporan */
export const opsiPrivasi = [
  {
    value: 'Publik',
    icon: 'public',
    judul: 'Publik',
    deskripsi:
      'Nama pelapor & isi aduan dapat dilihat publik untuk transparansi daerah.',
  },
  {
    value: 'Rahasia',
    icon: 'lock',
    judul: 'Rahasia',
    deskripsi:
      'Identitas Anda hanya terlihat petugas verifikasi internal, tidak ditampilkan publik.',
  },
  {
    value: 'Anonim',
    icon: 'visibility_off',
    judul: 'Anonim',
    deskripsi: 'Nama Anda disamarkan sepenuhnya di feed umum dan arsip publik.',
  },
]

/* ------------------------------------------------------------------ *
 * Data statistik halaman /statistik
 * ------------------------------------------------------------------ */

export const statistikRingkasan = [
  {
    key: 'total',
    label: 'Total Pengaduan',
    nilai: '14.820',
    icon: 'mark_email_read',
    iconClass: 'bg-primary-fixed/50 text-primary',
    nilaiClass: 'text-on-surface',
    labelClass: 'text-on-surface-variant',
    deskripsi: 'Dari 12 kecamatan',
  },
  {
    key: 'proses',
    label: 'Sedang Diproses',
    nilai: '342',
    icon: 'pending_actions',
    iconClass: 'bg-secondary-fixed/50 text-secondary',
    nilaiClass: 'text-secondary',
    labelClass: 'text-secondary',
    deskripsi: '9 OPD aktif',
  },
  {
    key: 'selesai',
    label: 'Selesai Bulan Ini',
    nilai: '2.847',
    icon: 'task_alt',
    iconClass: 'bg-primary-fixed/50 text-primary',
    nilaiClass: 'text-primary',
    labelClass: 'text-on-surface-variant',
    deskripsi: '96.2% tuntas',
  },
  {
    key: 'sla',
    label: 'Kepatuhan SLA',
    nilai: '94.8%',
    icon: 'campaign',
    iconClass: 'bg-tertiary-fixed/50 text-tertiary',
    nilaiClass: 'text-tertiary',
    labelClass: 'text-on-surface-variant',
    deskripsi: '24 jam standar',
  },
]

export const distribusiStatus = [
  { status: 'baru', label: 'Baru', jumlah: 84, persen: 12, color: 'bg-error text-on-error' },
  { status: 'diverifikasi', label: 'Diverifikasi', jumlah: 42, persen: 6, color: 'bg-amber-500 text-white' },
  { status: 'diproses', label: 'Diproses', jumlah: 342, persen: 48, color: 'bg-secondary text-on-secondary' },
  { status: 'selesai', label: 'Selesai', jumlah: 228, persen: 32, color: 'bg-primary text-on-primary' },
  { status: 'ditolak', label: 'Ditolak', jumlah: 8, persen: 1, color: 'bg-outline text-on-surface-variant' },
]

export const trenMingguan = [
  { hari: '1-3', masuk: 168, selesai: 112, ditolak: 4 },
  { hari: '4-6', masuk: 192, selesai: 143, ditolak: 3 },
  { hari: '7-9', masuk: 142, selesai: 128, ditolak: 5 },
  { hari: '10-12', masuk: 208, selesai: 156, ditolak: 2 },
  { hari: '13-15', masuk: 234, selesai: 176, ditolak: 6 },
  { hari: '16-18', masuk: 187, selesai: 169, ditolak: 1 },
]

export const distribusiKategori = [
  { kategori: 'Infrastruktur & Jalan', jumlah: 3120, color: 'bg-primary' },
  { kategori: 'Kebersihan Lingkungan', jumlah: 1870, color: 'bg-secondary' },
  { kategori: 'Kependudukan & Dukcapil', jumlah: 1560, color: 'bg-primary-container' },
  { kategori: 'Pelayanan Air PDAM', jumlah: 1340, color: 'bg-tertiary' },
  { kategori: 'Kesehatan & Bansos', jumlah: 1280, color: 'bg-amber-500' },
  { kategori: 'Ketertiban Umum', jumlah: 1120, color: 'bg-outline' },
  { kategori: 'Lainnya', jumlah: 650, color: 'bg-surface-container' },
]

export const performaOPD = [
  { opd: 'Dinas PUPR', total: 234, selesai: 210, tertib: 95.2, color: 'bg-primary text-on-primary' },
  { opd: 'DLH Kota', total: 187, selesai: 176, tertib: 94.1, color: 'bg-primary-container text-on-primary-container' },
  { opd: 'Disdukcapil', total: 156, selesai: 148, tertib: 94.8, color: 'bg-secondary text-on-secondary' },
  { opd: 'Satpol PP', total: 98, selesai: 88, tertib: 89.8, color: 'bg-tertiary text-on-tertiary' },
  { opd: 'Dinas Kesehatan', total: 142, selesai: 134, tertib: 94.4, color: 'bg-amber-700 text-white' },
  { opd: 'Dishub Kota', total: 87, selesai: 79, tertib: 90.8, color: 'bg-outline text-on-surface' },
  { opd: 'Perumda Air', total: 112, selesai: 98, tertib: 87.5, color: 'bg-secondary-container text-on-secondary-container' },
  { opd: 'Inspektorat', total: 45, selesai: 42, tertib: 93.3, color: 'bg-tertiary-container text-on-tertiary-container' },
]


