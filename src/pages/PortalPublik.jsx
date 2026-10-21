/**
 * Halaman publik Portal Pengaduan Masyarakat LAPOR-DAERAH.
 */
import AlurDanFaq from '../components/public/AlurDanFaq'
import FormPengaduan from '../components/public/FormPengaduan'
import Hero from '../components/public/Hero'
import KatalogPengaduan from '../components/public/KatalogPengaduan'
import QuickTracker from '../components/public/QuickTracker'
import StatistikPublik from '../components/public/StatistikPublik'
import TestimoniWarga from '../components/public/TestimoniWarga'

export default function PortalPublik() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <QuickTracker />
      <StatistikPublik />
      <FormPengaduan />
      <KatalogPengaduan />
      <AlurDanFaq />
      <TestimoniWarga />
    </div>
  )
}
