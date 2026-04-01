import { api } from '@/app/lib/axios';
import BentoGrid from './components/BentoGrid';
import AuraBackground from './components/ui/AuraBackground';
import HeroContent from './components/layout/HeroContent';
import ProductCarousel from './components/ui/ProductCarousel';
import Image from 'next/image';
import Footer from '@/app/components/layout/Footer';

export const dynamic = 'force-dynamic';

async function getShowcases() {
  try {
    const response = await api.get('/showcase');
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data katalog brosur:', error);
    return [];
  }
}

export default async function CatalogPage() {
  const items = await getShowcases();
  const corporateBlue = '#0ea5e9';

  return (
    <main
      className="relative min-h-screen bg-[#f8fafc] overflow-hidden flex flex-col"
      style={{ '--primary-color': corporateBlue } as React.CSSProperties}
    >
      {/* 1. SOLID DARK HERO */}
      <section className="relative w-full bg-slate-950 pt-16 pb-24 md:pt-24 md:pb-32 border-b-4 border-(--primary-color)">
        <div className="enterprise-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <HeroContent />
            <div className="hidden lg:block">
              <ProductCarousel items={items} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATALOG AREA */}
      <div id="catalog-grid" className="relative grow scroll-mt-20">
        <div className="opacity-20"><AuraBackground /></div>
        <div className="enterprise-container relative z-10 pt-20 pb-32 px-2">
          <BentoGrid items={items} />
        </div>
      </div>

      {/* 3. SOLID TERMINAL FOOTER (Clean & Monochrome) */}
      <Footer />
    </main>
  );
}
