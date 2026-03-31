import { api } from '@/app/lib/axios';
import BentoGrid from './components/BentoGrid';
import AuraBackground from './components/ui/AuraBackground';
import HeroContent from './components/layout/HeroContent';
import ProductCarousel from './components/ui/ProductCarousel';
import Image from 'next/image';

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
      <section className="relative w-full bg-slate-950 pt-16 pb-24 md:pt-24 md:pb-32 border-b-4 border-[var(--primary-color)]">
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
      <footer className="w-full bg-slate-950 pt-24 pb-12 relative z-20 border-t border-slate-900">
        <div className="enterprise-container flex flex-col md:flex-row justify-between items-start gap-16">

          <div className="flex flex-col items-center md:items-start gap-8">
            {/* [FIX LOGO FOOTER] Tanpa BG Putih, Monokrom via CSS Filter */}
            <div className="relative group">
              <Image
                src="/logogeocitra.png"
                alt="Geocitra Logo Footer"
                width={220}
                height={55}
                style={{
                  height: 'auto',
                  width: 'auto',
                  filter: 'grayscale(1) brightness(0) invert(1)' // TRIK MAGIC: Ubah logo warna jadi putih bersih
                }}
                className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div className="flex flex-col gap-4">
              <span className="text-[var(--primary-color)] font-black text-[10px] uppercase tracking-widest">Resources</span>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Documentation</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Architecture</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[var(--primary-color)] font-black text-[10px] uppercase tracking-widest">Legal</span>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="enterprise-container mt-24 pt-8 border-t border-slate-900/50 flex justify-between items-center">
          <p className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} CV Geocitra. All Rights Reserved.
          </p>
          <div className="w-2 h-2 rounded-full bg-[var(--primary-color)] animate-pulse" />
        </div>
      </footer>
    </main>
  );
}
