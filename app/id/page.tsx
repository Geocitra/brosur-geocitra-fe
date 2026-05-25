import { api } from '@/app/lib/axios';
import BentoGrid from '../components/BentoGrid';
import AuraBackground from '../components/ui/AuraBackground';
import HeroContent from '../components/layout/HeroContent';
import ProductCarousel from '../components/ui/ProductCarousel';
import TechStack from '../components/ui/TechStack';
import Footer from '@/app/components/layout/Footer';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';

import IntegratedSystemBlock from '../components/blocks/IntegratedSystemBlock';
import AcademyBlock from '../components/blocks/AcademyBlock';

export const dynamic = 'force-dynamic';

async function getShowcases() {
  try {
    const response = await api.get('/showcase');
    const allItems = response.data?.data || response.data || [];

    const indonesianItems = allItems.filter((item: any) => {
      if (!item || !item.slug) return false;
      return !item.slug.endsWith('-en');
    });

    return indonesianItems;
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

      <LanguageSwitcher />

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

      {/* 2. CATALOG AREA (Katalog Aplikasi) */}
      <div id="catalog-grid" className="relative grow scroll-mt-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <AuraBackground />
        </div>

        {/* LOGICAL FIX: Mengurangi padding-bottom (pb) dari pb-32 menjadi pb-12 pada mobile, 
            namun tetap pb-32 pada desktop (lg:pb-32).
        */}
        <div className="enterprise-container relative z-10 pt-12 md:pt-20 pb-6 lg:pb-32 px-2 md:px-0">

          {/* MOBILE & TABLET VIEWPORT (< lg) */}
          <div className="block lg:hidden mt-4">
            <div className="text-center mb-10 px-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Katalog Produk</h2>
              <p className="text-slate-500 mt-2 font-medium">Geser untuk menjelajahi solusi kami</p>
            </div>
            <ProductCarousel items={items} />
          </div>

          {/* DESKTOP VIEWPORT (>= lg) */}
          <div className="hidden lg:block">
            <BentoGrid items={items} />
          </div>

        </div>
      </div>

      {/* 3. INTEGRATED SYSTEM SUPPORT */}
      {/* Jika jarak masih terasa jauh, kita bisa membungkus komponen ini 
          dengan div yang memiliki margin-top negatif khusus mobile. 
      */}
      <div className="-mt-8 lg:mt-0">
        <IntegratedSystemBlock />
      </div>

      {/* 4. XGREEN DEV ACADEMY */}
      <AcademyBlock />

      {/* 5. TECH STACK */}
      <TechStack />

      {/* 6. SOLID TERMINAL FOOTER */}
      <Footer />
    </main>
  );
}
