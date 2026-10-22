-- ============================================================================
-- Kebijakan Row Level Security (RLS) untuk tabel utama `pengaduan`
-- Berkas : supabase/policies-auth.sql
-- Tujuan : mengganti policy demo supaya
--            * SELECT  : terbuka untuk semua orang (anon + authenticated)
--            * INSERT  : hanya pengguna yang sudah login (authenticated)
--            * UPDATE  : hanya pengguna yang sudah login (authenticated)
--            * DELETE  : hanya pengguna yang sudah login (authenticated)
--
-- PENGGUNAAN
--   Jalankan berkas ini sekali di Supabase SQL Editor (project Anda).
--   Berkas bersifat idempotent: kebijakan lama (demo) dihapus dulu, lalu
--   dibuat kembali sehingga aman dijalankan berulang kali.
-- ============================================================================

-- 1. Pastikan RLS aktif pada tabel `pengaduan`
alter table public.pengaduan enable row level security;

-- 2. Lepas kebijakan lama (demo) bila mas masih ada
drop policy if exists "pengaduan: select terbuka (demo)" on public.pengaduan;
drop policy if exists "pengaduan: insert terbuka (demo)" on public.pengaduan;
drop policy if exists "pengaduan: update terbuka (demo)" on public.pengaduan;
drop policy if exists "pengaduan: delete terbuka (demo)" on public.pengaduan;

-- 3. SELECT — semua orang (anon maupun authenticated)
--    Data pengaduan ditampilkan di katalog publik portal (rute "/"),
--    sehingga pembacaan harus terbuka. Karena tabel belum memiliki kolom
--    penanda privasi baris, tidak ada cara untuk memfilter tiap baris
--    secara per-role; SELECT-terbuka justru membuat authenticated otomatis
--    termasuk (anon adalah supersetnya).
create policy "pengaduan: baca publik"
  on public.pengaduan
  for select
  using (true);

-- 4. INSERT — hanya authenticated
create policy "pengaduan: insert hanya authenticated"
  on public.pengaduan
  for insert
  with check (auth.uid() is not null);

-- 5. UPDATE — hanya authenticated
create policy "pengaduan: update hanya authenticated"
  on public.pengaduan
  for update
  using (auth.uid() is not null);

-- 6. DELETE — hanya authenticated
create policy "pengaduan: delete hanya authenticated"
  on public.pengaduan
  for delete
  using (auth.uid() is not null);

-- ============================================================================
-- PENJELASAN PILIHAN
-- ----------------------------------------------------------------------------
-- 1. SELECT "mengizinkan semua orang" (using (true))
--    Halaman publik (Portal Pengaduan Masyarakat, rute "/") menampilkan
--    katalog laporan warga secara anonim, sehingga data harus dapat dibaca
--    oleh role `anon`. Karena `pengaduan` belum memiliki kolom penanda
--    privasi (mis. `is_privat` / `privasi`) untuk membedakan baris
--    "ditampilkan publik" vs "hanya admin", tiap baris tidak bisa difilter
--    per-role. Oleh karena itu SELECT diberi ke semua orang sekaligus;
--    pengguna terotentikasi otomatis termasuk karena anon adalah superset.
--    Jika suatu hari ada kolom privasi baris, gunakan policy select kedua:
--        create policy "pengaduan: baca publik saja (tertentu)"
--          on public.pengaduan for select
--          using ((privasi = 'Publik') or (auth.uid() is not null));
--    (anonymous hanya melihat yang bersifat 'Publik', authenticated dapat
--     melihat semua.)
--
-- 2. SELECT "hanya authenticated bila tidak ditampilkan di publik"
--    Konsep "data yang tidak ditampilkan di halaman publik" tidak dapat
--    diuji pada level SQL secara andal, karena RLS tidak tahu rute/halaman
--    mana yang meminta data. Solusinya ada di dua tempat:
--      a. Layer aplikasi: halaman manajemen (/manajemen-pengaduan) sudah
--         dilindungi ProtectedRoute.jsx sehingga anon tidak pernah sampai
--         mengeksekusi query di sisi klien.
--      b. Layer DB: pastikan tidak ada endpoint/RPC publik yang melakukan
--         SELECT sensitif; semua SELECT manajerial hanya dapat dipanggil
--         ketika terautentikasi.
--    Karena semua SELECT yang ada memang ditujukan publik, policy select
--    di atas tetap bersifat terbuka.
--
-- 3. INSERT / UPDATE / DELETE hanya untuk authenticated
--    `auth.uid()` mengembalikan NULL untuk role `anon` (yang memakai
--    VITE_SUPABASE_ANON_KEY) dan mengembalikan id pengguna yang terotentikasi
--    untuk role `authenticated`. Syarat `auth.uid() is not null` dengan demikian
--    memblokir penulisan dari klien anon, sementara petugas/admin yang masuk
--    lewat /login (SUPABASE_ANON_KEY, tapi sudah terautentikasi) diperbolehkan.
--
-- 4. Dampak terhadap Formulir Pengaduan publik
--    Komponen FormPengaduan.jsx (halaman publik "/") saat ini memasukkan
--    baris ke `pengaduan` secara ANONIM melalui supabase.from('pengaduan').
--    Dengan policy di atas, pengajuan anonim akan GAGAL (403). Untuk
--    tetap menerima aduan publik tanpa melemahkan kebijakan, gunakan satu
--    dari:
--      (a) Buat RPC `public.buat_pengaduan(...)` dengan SECURITY DEFINER —
--          role anon boleh MENGAKSEKUSI fungsi, namun tidak boleh INSERT
--          langsung. Ubah FormPengaduan.jsx agar memanggil RPC tersebut.
--      (b) Beri anonymous permintaan insert melalui kolom yang diketahui
--          aman (deviasi dari kebijakan yang diminta — tidak disarankan).
--    Opsi (a) diusulkan agar portal publik tetap berfungsi penuh.
--
-- 5. Konfirmasi email
--    Jika di dashboard Supabase -> Authentication -> Settings, opsi
--    "Confirm email" AKTIF, maka setelah signUp pengguna belum bisa masuk
--    sampai mengklik tautan konfirmasi di email. Hal ini berlaku pula pada
--    signIn sebelum konfirmasi. Pastikan ini dimatikan untuk akun petugas
--    yang dibuat cepat, atau kirimkan tautan konfirmasi ke admin.
-- ============================================================================
