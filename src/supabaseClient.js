/**
 * Klien Supabase untuk LAPOR-DAERAH.
 *
 * Kunci (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY) dibaca dari berkas .env
 * melalui import.meta.env — nilainya tidak pernah ditulis langsung di kode.
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Mengambil seluruh data pengaduan dari tabel `pengaduan`,
 * diurutkan dari yang terbaru dulu.
 */
export async function getPengaduan() {
  const { data, error } = await supabase
    .from('pengaduan')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

/**
 * Menambahkan data pengaduan baru ke tabel `pengaduan`.
 * @param {object} baris — objek kolom yang akan disisipkan.
 */
export async function tambahPengaduan(baris) {
  const { data, error } = await supabase.from('pengaduan').insert(baris).select().single()
  if (error) throw error
  return data
}

/**
 * Memperbarui data pengaduan yang ditentukan oleh `nomorTiket`.
 * @param {string} nomorTiket — nilai nomor_tiket (primary lookup).
 * @param {object} perubahan — kolom yang akan diperbarui.
 */
export async function ubahPengaduan(nomorTiket, perubahan) {
  const { data, error } = await supabase
    .from('pengaduan')
    .update(perubahan)
    .eq('nomor_tiket', nomorTiket)
    .select()
    .single()
  if (error) throw error
  return data
}

/**
 * Menghapus data pengaduan yang ditentukan oleh `nomorTiket`.
 * @param {string} nomorTiket — nilai nomor_tiket yang akan dihapus.
 */
export async function hapusPengaduan(nomorTiket) {
  const { error } = await supabase.from('pengaduan').delete().eq('nomor_tiket', nomorTiket)
  if (error) throw error
  return true
}
