import { api } from '@/app/lib/axios';
import BentoGrid from '../components/BentoGrid';
import AuraBackground from '../components/ui/AuraBackground';
import HeroContent from '../components/layout/HeroContent';
import ProductCarousel from '../components/ui/ProductCarousel';
import Image from 'next/image';
import { Metadata } from 'next';
import Footer from '../components/layout/Footer';
import TechStack from '../components/ui/TechStack';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';
import AcademyBlock from '../components/blocks/AcademyBlock';
import IntegratedSystemBlock from '../components/blocks/IntegratedSystemBlock';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Geocitra Ecosystem | Digital Solutions',
    description: 'Explore Geocitra\'s innovative digital solutions. We build systems that transform data into accountability for the agencies of the future.',
};

async function getShowcases() {
    try {
        const response = await api.get('/showcase');
        return response.data?.data || response.data || [];
    } catch (error) {
        console.error('[EN Route] Failed to fetch brochure catalog data:', error);
        return [];
    }
}

export default async function EnglishCatalogPage() {
    const allItems = await getShowcases();
    const englishItems = allItems.filter((item: any) => item.slug.endsWith('-en'));
    const corporateBlue = '#0ea5e9';

    return (
        <main
            className="relative min-h-screen bg-[#f8fafc] overflow-hidden flex flex-col"
            style={{ '--primary-color': corporateBlue } as React.CSSProperties}
        >

            <LanguageSwitcher />

            {/* 1. SOLID DARK HERO */}
            {/* FIX TAILWIND: border-(--primary-color) */}
            <section className="relative w-full bg-slate-950 pt-16 pb-24 md:pt-24 md:pb-32 border-b-4 border-(--primary-color)">
                <div className="enterprise-container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <HeroContent isEnglish={true} />
                        <div className="hidden lg:block">
                            <ProductCarousel items={englishItems} />
                        </div>
                    </div>
                </div>
            </section>

            <div id="catalog-grid" className="relative grow scroll-mt-20">
                <div className="opacity-20"><AuraBackground /></div>
                <div className="enterprise-container relative z-10 pt-20 pb-32 px-2">
                    <BentoGrid items={englishItems} />
                </div>
            </div>

            <IntegratedSystemBlock />

            {/* 4. XGREEN DEV ACADEMY */}
            {/* Berfungsi sebagai funnel konversi berbasis edukasi/mentorship */}
            <AcademyBlock />

            <TechStack />

            <Footer />
        </main>
    );
}