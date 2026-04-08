import { api } from '@/app/lib/axios';
import BentoGrid from './components/BentoGrid';
import AuraBackground from './components/ui/AuraBackground';
import HeroContent from './components/layout/HeroContent';
import ProductCarousel from './components/ui/ProductCarousel';
import TechStack from './components/ui/TechStack';
import Footer from '@/app/components/layout/Footer';
import LanguageSwitcher from './components/ui/LanguageSwitcher';

// --- IMPORT KOMPONEN BARU ---
import IntegratedSystemBlock from './components/blocks/IntegratedSystemBlock';
import AcademyBlock from './components/blocks/AcademyBlock';

export const dynamic = 'force-dynamic';

async function getShowcases() {
  try {
    const response = await api.get('/showcase');
    const allItems = response.data?.data || response.data || [];

    // LOGICAL FIX: Menerapkan filter ketat untuk membuang data versi English
    // Asumsi: Semua aplikasi versi bahasa Inggris memiliki slug dengan akhiran '-en'
    const indonesianItems = allItems.filter((item: any) => {
      // Validasi defensive programming memastikan property slug eksis
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
              {/* Data items di sini sekarang sudah terjamin 100% versi Indonesia */}
              <ProductCarousel items={items} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATALOG AREA (Katalog Aplikasi) */}
      <div id="catalog-grid" className="relative grow scroll-mt-20">
        <div className="opacity-20"><AuraBackground /></div>
        <div className="enterprise-container relative z-10 pt-20 pb-32 px-2">
          {/* Data items di sini juga terjamin bebas dari bocoran data -en */}
          <BentoGrid items={items} />
        </div>
      </div>

      {/* 3. INTEGRATED SYSTEM SUPPORT */}
      {/* Berfungsi sebagai transisi infrastruktur sebelum masuk ke pilar SDM */}
      <IntegratedSystemBlock />

      {/* 4. XGREEN DEV ACADEMY */}
      {/* Berfungsi sebagai funnel konversi berbasis edukasi/mentorship */}
      <AcademyBlock />

      {/* 5. TECH STACK */}
      {/* Menjadi fondasi validasi teknis bagi seluruh pilar di atas */}
      <TechStack />

      {/* 6. SOLID TERMINAL FOOTER (Clean & Monochrome) */}
      <Footer />
    </main>
  );
}