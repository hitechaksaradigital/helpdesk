/**
 * Alur 4 langkah + FAQ accordion.
 */
import { useState } from 'react'
import { alurLangkah, faqItems } from '../../data'
import { Icon } from '../ui'

export default function AlurDanFaq() {
  const [terbuka, setTerbuka] = useState(null)

  return (
    <section className="bg-surface-container-low px-6 lg:px-12 py-16" id="alur-dan-faq">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
              Standar Operasional Prosedur
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              4 Langkah Mudah Pengawalan Aspirasi Daerah
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Alur kerja sistematis menjamin setiap laporan masyarakat tidak berhenti di arsip,
              melainkan berujung pada aksi konkret di lapangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {alurLangkah.map((step) => (
              <div
                className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm relative group hover:-translate-y-1 transition-transform"
                key={step.nomor}
              >
                <div
                  className={
                    'w-12 h-12 rounded-xl flex items-center justify-center font-title-md text-title-md font-bold mb-4 shadow-sm ' +
                    step.iconClass
                  }
                >
                  {step.nomor}
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold mb-2">
                  {step.judul}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {step.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 pt-8">
          <div className="text-center space-y-1">
            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
              Pusat Bantuan &amp; Edukasi
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((faq, index) => {
              const aktif = terbuka === index
              return (
                <div
                  className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm"
                  key={faq.pertanyaan}
                >
                  <button
                    aria-expanded={aktif}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-label-md text-label-md text-on-surface font-bold focus:outline-none"
                    onClick={() => setTerbuka(aktif ? null : index)}
                    type="button"
                  >
                    <span>{faq.pertanyaan}</span>
                    <Icon
                      name="expand_more"
                      className={
                        'text-primary transition-transform duration-200 shrink-0' +
                        (aktif ? ' rotate-180' : '')
                      }
                    />
                  </button>
                  {aktif && (
                    <div className="px-5 pb-5 pt-0 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {faq.jawaban}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
