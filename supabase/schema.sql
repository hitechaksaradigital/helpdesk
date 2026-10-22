-- ============================================================================
-- Skema LAPOR-DAERAH: Tabel utama `pengaduan`
-- Skema ini dirancang agar dapat dijalankan berulang kali (idempoten)
-- di Supabase SQL Editor tanpa menyebabkan error.
-- ============================================================================

-- 1. Buat tabel utama (hanya jika belum ada)
create table if not exists public.pengaduan (
  id                 uuid            primary key default gen_random_uuid(),
  nomor_tiket        varchar(50)     unique not null,
  nama_pelapor       varchar(255)    not null,
  kategori_layanan   varchar(100)    not null,
  isi_laporan        text            not null,
  lokasi_kejadian    varchar(255),
  instansi_tujuan    varchar(255),
  lampiran_bukti     varchar(500),
  rating_kepuasan   integer check (rating_kepuasan >= 1 and rating_kepuasan <= 5),
  status             varchar(20)     not null default 'baru'
                     check (status in ('baru', 'diverifikasi', 'diproses', 'selesai', 'ditolak')),
  created_at         timestamp with time zone default now(),
  updated_at         timestamp with time zone default now()
);

-- 2. Auto-generate nomor_tiket (format TKT-YYYY-NNNN) bila belum diisi.
--    Pola ini menghindari duplikat kunci saat banyak klien menyimpan serentak
--    sekaligus tetap dapat dijalankan berulang kali tanpa error.
create sequence if not exists public.seq_nomor_tiket start 1106 increment 1;

create or replace function public._generate_nomor_tiket()
returns trigger as $$
begin
  if coalesce(new.nomor_tiket, '') = '' then
    new.nomor_tiket := 'TKT-' || extract(year from now())::text || '-' ||
      lpad(nextval('public.seq_nomor_tiket')::text, 4, '0');
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_pengaduan_nomor_tiket on public.pengaduan;
create trigger trg_pengaduan_nomor_tiket
  before insert on public.pengaduan
  for each row execute function public._generate_nomor_tiket();

-- 3. Sinkronkan updated_at otomatis pada tiap perubahan baris
create or replace function public._set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_pengaduan_updated_at on public.pengaduan;
create trigger trg_pengaduan_updated_at
  before update on public.pengaduan
  for each row execute function public._set_updated_at();

-- 3. Aktifkan Row Level Security (RLS)
alter table public.pengaduan enable row level security;

-- 4. Kebijakan akses demo: mengizinkan select, insert, update, dan delete agar
--    antarmuka dapat berfungsi penuh pada tahap demonstrasi.
--    Pada tahap produksi ganti `using (true)` / `with check (true)` dengan
--    kondisi berbasis auth.uid() yang sesuai.
--    (CREATE POLICY tidak mendukung IF NOT EXISTS, jadi pakai pola
--    DROP IF EXISTS + CREATE agar skrip tetap idempotent.)
drop policy if exists "pengaduan: select terbuka (demo)" on public.pengaduan;
create policy "pengaduan: select terbuka (demo)"
  on public.pengaduan for select using (true);

drop policy if exists "pengaduan: insert terbuka (demo)" on public.pengaduan;
create policy "pengaduan: insert terbuka (demo)"
  on public.pengaduan for insert with check (true);

drop policy if exists "pengaduan: update terbuka (demo)" on public.pengaduan;
create policy "pengaduan: update terbuka (demo)"
  on public.pengaduan for update using (true);

drop policy if exists "pengaduan: delete terbuka (demo)" on public.pengaduan;
create policy "pengaduan: delete terbuka (demo)"
  on public.pengaduan for delete using (true);

-- 5. Data contoh (5 baris) — memakai ON CONFLICT agar aman dijalankan berulang kali
insert into public.pengaduan
  (nomor_tiket, nama_pelapor, kategori_layanan, isi_laporan, lokasi_kejadian, instansi_tujuan, lampiran_bukti, rating_kepuasan, status)
values
  ('TKT-2025-1104', 'Bambang Sutrisno', 'Pelayanan Air PDAM',
   'Pipa air utama bocor di pertigaan Jl. Merdeka mengakibatkan genangan air bersih setinggi mata kaki dan aspal mulai retak.',
   'Pertigaan Jl. Merdeka RT 02/04', 'Perumda Air Minum',
   'https://example.com/bukti/TKT-2025-1104-1.jpg', null, 'baru'),
  ('TKT-2025-1103', 'Siti Nurhaliza', 'Infrastruktur & Jalan',
   'Jalan amblas sedalam 30cm membahayakan pengendara motor saat malam hari minim penerangan PJU.',
   'Jl. Veteran No. 45 Kec. Klojen', 'Dinas PUPR Daerah',
   'https://example.com/bukti/TKT-2025-1103-1.jpg', null, 'diproses'),
  ('TKT-2025-1098', 'Hendra Wijaya', 'Kebersihan Lingkungan',
   'Tumpukan sampah plastik dan limbah rumah tangga meluber ke bahu jalan selama 4 hari belum diangkut armada sampah.',
   'TPS Liar RW 04 Kel. Sukun', 'DLH Kota',
   'https://example.com/bukti/TKT-2025-1098-1.jpg', 5, 'selesai'),
  ('TKT-2025-1095', 'Dewi Anggraini', 'Kependudukan & Dukcapil',
   'Permohonan cetak ulang KTP-el rusak telah diajukan online namun belum ada pembaruan status jadwal pengambilan dokumen.',
   'Kantor Kecamatan Kedungkandang', 'Disdukcapil',
   'https://example.com/bukti/TKT-2025-1095-resi.pdf', null, 'diverifikasi'),
  ('TKT-2025-1088', 'Ahmad Fauzi', 'Ketertiban Umum',
   'Penggunaan trotoar pejalan kaki sebagai lapak dagang permanen dan parkir liar kendaraan roda dua.',
   'Jl. Raya Sawojajar Depan Ruko', 'Satpol PP',
   null, null, 'ditolak')
on conflict (nomor_tiket) do nothing;
