/**
 * Widget rating kepuasan & testimoni masyarakat.
 */
import { testimoni } from '../../data'
import { Icon, StarRating } from '../ui'

export default function TestimoniWarga() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
      <div className="bg-surface-container-lowest rounded-3xl p-8 lg:p-12 shadow-sm space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 p-8 rounded-2xl bg-surface-container-low text-center space-y-4">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
              Indeks Kepuasan Pelayanan Publik
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-display text-display font-bold text-primary">4.8</span>
              <span className="font-headline-sm text-headline-sm text-on-surface-variant">/ 5.0</span>
            </div>
            <div className="flex justify-center text-primary gap-1">
              <Icon name="star" filled />
              <Icon name="star" filled />
              <Icon name="star" filled />
              <Icon name="star" filled />
              <Icon name="star_half" />
            </div>
            <p className="font-caption text-caption text-on-surface-variant">
              Dihitung dari 8.420 verifikasi formulir kepuasan warga pasca-tindak lanjut lapangan.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                <Icon name="verified" className="text-base" /> Predikat: Sangat Memuaskan (A)
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Ulasan Langsung Pengguna Layanan
              </h3>
              <span className="font-caption text-caption text-on-surface-variant">
                Menampilkan {testimoni.length} ulasan terbaru
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimoni.map((item) => (
                <div className="p-5 rounded-2xl bg-surface-container-low space-y-3" key={item.tiket}>
                  <div className="flex items-center justify-between">
                    <StarRating value={item.rating} />
                    <span className="font-caption text-caption text-on-surface-variant">
                      Tiket {item.tiket}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                    {item.ulasan}
                  </p>
                  <div className="pt-2 flex items-center justify-between font-caption text-caption text-on-surface-variant">
                    <span className="font-bold text-on-surface">{item.nama}</span>
                    <span>{item.wilayah}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
