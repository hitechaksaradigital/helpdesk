/**
 * Pelacak mandiri status tiket pengaduan.
 */
import { useState } from 'react'
import { tiketDemo } from '../../data'
import { Icon } from '../ui'

export default function QuickTracker() {
  const [nomor, setNomor] = useState(tiketDemo.id)
  const [sinkron, setSinkron] = useState(false)
  const [pesan, setPesan] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = nomor.trim()
    if (!value) {
      setPesan('Nomor tiket wajib diisi untuk melacak progres.')
      return
    }
    setPesan('')
    setSinkron(true)
    window.setTimeout(() => setSinkron(false), 700)
  }

  return (
    <section className="px-6 lg:px-12 -mt-8 relative z-20" id="quick-tracker">
      <div className="max-w-5xl mx-auto bg-surface-container-lowest rounded-2xl p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-wider mb-1">
              <Icon name="radar" className="text-base" />
              Lacak Aduan Terkini
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Pelacak Mandiri Status Tiket Pengaduan
            </h2>
          </div>
          <div className="font-caption text-caption text-on-surface-variant">
            Gunakan Nomor Registrasi Surat / NIK Pemohon
          </div>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-12 gap-3"
          onSubmit={handleSubmit}
        >
          <div className="md:col-span-9 relative">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest transition-all shadow-inner font-body-md text-body-md"
              onChange={(e) => setNomor(e.target.value)}
              placeholder="Masukkan Nomor Tiket Aduan (contoh: TKT-2025-0891) atau NIK..."
              type="text"
              value={nomor}
            />
          </div>
          <div className="md:col-span-3">
            <button
              className="w-full h-full py-3.5 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              type="submit"
            >
              <Icon name="track_changes" />
              Lacak Progres
            </button>
          </div>
        </form>

        {pesan && (
          <p className="mt-3 font-caption text-caption text-error flex items-center gap-1.5">
            <Icon name="error" className="text-base" />
            {pesan}
          </p>
        )}


        <div
          className={
            'mt-8 pt-6 bg-surface-container-low rounded-xl p-5 transition-all ' +
            (sinkron ? 'opacity-50' : 'opacity-100')
          }
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md text-on-surface font-bold tracking-wide">
                  Tiket #{tiketDemo.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {tiketDemo.labelStatus}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Subjek: {tiketDemo.subjek}
              </p>
            </div>
            <div className="text-right">
              <span className="font-caption text-caption text-on-surface-variant block">
                Instansi Dituju:
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                {tiketDemo.instansi}
              </span>
            </div>
          </div>

          <div className="py-4">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-dim z-0" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary z-0 transition-all duration-700"
                style={{ width: `${tiketDemo.progres}%` }}
              />
              {tiketDemo.langkah.map((step) => (
                <div className="relative z-10 flex flex-col items-center" key={step.label}>
                  {step.state === 'done' && (
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
                      <Icon name={step.icon} className="text-sm" />
                    </div>
                  )}
                  {step.state === 'active' && (
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center ring-4 ring-primary-fixed shadow-md">
                      <Icon name={step.icon} className="text-sm text-primary" />
                    </div>
                  )}
                  {step.state === 'todo' && (
                    <div className="w-8 h-8 rounded-full bg-surface-dim text-on-surface-variant flex items-center justify-center">
                      <Icon name={step.icon} className="text-sm" />
                    </div>
                  )}
                  <span
                    className={
                      'font-label-sm text-label-sm font-bold mt-2 text-center ' +
                      (step.state === 'todo' ? 'text-on-surface-variant' : 'text-primary')
                    }
                  >
                    {step.label}
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant text-[10px] text-center">
                    {step.waktu}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-surface-container-lowest rounded-lg flex items-start gap-3">
            <Icon name="info" className="text-primary text-xl flex-shrink-0" />
            <div className="space-y-0.5">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                {tiketDemo.catatan.judul}
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {tiketDemo.catatan.isi}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
