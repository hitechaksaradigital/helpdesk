/**
 * Sistem otentikasi berbasis Supabase Auth (email + kata sandi).
 *
 * Mengekspor:
 *   - AuthProvider  : penyelubung konteks (bungkus <App/> di main.jsx)
 *   - useAuth       : hook React -> { user, loading }
 *   - signIn(email, password)
 *   - signUp(email, password, nama?)
 *   - signOut()
 *
 * Semua error dari Supabase diterjemahkan ke bahasa Indonesia.
 */
import { createContext, createElement, useContext, useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
      setLoading(false)
    }
    init()

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  return createElement(AuthContext.Provider, { value: { user, loading } }, children)
}

/* Hook akses singkat — melempar jika dipanggil di luar provider */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth() harus dipanggil di dalam <AuthProvider>.')
  }
  return ctx
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(terjemahkanError(error.message))
  return data
}

export async function signUp(email, password, nama) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: nama ? { full_name: nama } : undefined },
  })
  if (error) throw new Error(terjemahkanError(error.message))
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(terjemahkanError(error.message))
}

/* ------------------------------------------------------------------ *
 * Pemetaan pesan error Supabase (bahasa Inggris) -> Indonesia.
 * Pencocokan bersifat sebagian agar tahan terhadap perubahan teks
 * versi @supabase/supabase-js yang dipakai.
 * ------------------------------------------------------------------ */
const PETA_ERROR = [
  { cari: 'invalid login credentials', hasil: 'Email atau kata sandi yang anda masukkan tidak valid.' },
  { cari: 'email not confirmed', hasil: 'Email anda belum dikonfirmasi. Buka tautan konfirmasi di kotak masuk (atau folder spam) email anda.' },
  { cari: 'already registered', hasil: 'Email ini sudah terdaftar. Silakan masuk.' },
  { cari: 'email already taken', hasil: 'Email ini sudah terdaftar. Silakan masuk.' },
  { cari: 'user not found', hasil: 'Akun dengan email ini tidak ditemukan. Daftar dulu jika belum memiliki akun.' },
  { cari: 'signup requires a valid email address', hasil: 'Masukkan alamat email yang valid.' },
  { cari: 'password should be at least', hasil: 'Kata sandi harus terdiri dari minimal 6 karakter.' },
  { cari: 'rate limited', hasil: 'Permintaan terlalu sering. Silakan coba lagi beberapa saat lagi.' },
  { cari: 'weak password', hasil: 'Kata sandi terlalu lemah. Gunakan minimal 6 karakter dengan kombinasi yang lebih kuat.' },
]

export function terjemahkanError(pesan) {
  const teks = String(pesan || '').toLowerCase()
  for (const { cari, hasil } of PETA_ERROR) {
    if (teks.includes(cari)) return hasil
  }
  return pesan || 'Terjadi kesalahan yang tidak diketahui.'
}
