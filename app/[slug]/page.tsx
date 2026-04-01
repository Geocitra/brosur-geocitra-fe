import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/app/lib/axios';
import BlockRenderer from '@/app/components/BlockRenderer';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

interface PageProps {
    params: Promise<{ slug: string }>;
}

/**
 * Data Access Layer: Mengambil data showcase dari Backend
 * Menggunakan caching internal Next.js untuk performa fetch yang optimal
 */
async function getShowcaseData(slug: string) {
    try {
        const response = await api.get(`/showcase/${slug}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

/**
 * Dynamic Metadata: Mengatur SEO (Title & Description) secara dinamis
 * Penting untuk membedakan index Bahasa Indonesia dan Inggris di Google
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const data = await getShowcaseData(resolvedParams.slug);

    if (!data) return { title: 'Not Found | Geocitra Showcase' };

    return {
        title: `${data.name} | Geocitra Showcase`,
        description: data.tagline,
        openGraph: {
            title: `${data.name} | Geocitra Showcase`,
            description: data.tagline,
        },
    };
}

export default async function ShowcasePage({ params }: PageProps) {
    const resolvedParams = await params;
    const data = await getShowcaseData(resolvedParams.slug);

    // Validasi eksistensi data: Jika slug tidak ada di DB, lempar ke 404 page
    if (!data) {
        notFound();
    }

    return (
        // Menggunakan Fragment agar layout utama di app/[slug]/layout.tsx 
        // tetap memegang kontrol atas pembungkus body/aura.
        <>
            {/* Header: Mengirim nama aplikasi untuk ditampilkan di Navbar */}
            <Navbar appName={data.name} />

            {/* KONTEN UTAMA 
                Analisa Struktur:
                - z-10: Agar berada di atas AuraBackground yang ada di layout.
                - pt-0: Memastikan HeroBlock menempel ke langit-langit browser 
                  untuk mendukung desain "Bleeding Edge".
            */}
            <main className="relative z-10 grow w-full">
                <BlockRenderer blocks={data.blocks} />
            </main>

            {/* Footer dengan informasi kontak support */}
            <Footer />
        </>
    );
}