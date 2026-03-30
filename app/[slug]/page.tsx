import React from 'react';
import { notFound } from 'next/navigation';
import { api } from '@/app/lib/axios';
import BlockRenderer from '@/app/components/BlockRenderer';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
// import { motion } from 'framer-motion'; // Buka komentar jika menggunakan Framer Motion di root

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Data Access Layer: Mengambil data dari Backend
async function getShowcaseData(slug: string) {
    try {
        const response = await api.get(`/showcase/${slug}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export default async function ShowcasePage({ params }: PageProps) {
    const resolvedParams = await params;
    const data = await getShowcaseData(resolvedParams.slug);

    // Validasi eksistensi data
    if (!data) {
        notFound();
    }

    // Ekstraksi warna primer dari DB dengan fallback logic untuk safety
    const primaryColor = data.primaryColor || '#10B981';

    return (
        // INJEKSI DNA: Root container mengatur variabel CSS secara dinamis dari database
        <div
            style={{
                '--color-primary': primaryColor,
                '--primary-color': primaryColor
            } as React.CSSProperties}
            className="relative min-h-screen bg-slate-50/50 text-slate-800 overflow-hidden font-sans selection:bg-(--primary-color) selection:text-white transition-colors duration-500 flex flex-col"
        >
            {/* Header Dinamis */}
            <Navbar appName={data.name} />

            {/* AMBIENT LIGHT LAYER: Memecah kebosanan warna solid */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[10%] -left-[10%] w-125 h-125 rounded-full bg-(--primary-color)/20 blur-[120px] mix-blend-multiply opacity-70" />
                <div className="absolute top-[40%] -right-[10%] w-150 h-150 rounded-full bg-(--primary-color)/15 blur-[150px] mix-blend-multiply opacity-50" />
            </div>

            {/* KONTEN UTAMA */}
            <main className="relative z-10 flex-grow container mx-auto px-6 pt-28 pb-12 max-w-7xl">

                {/* Mesin Render Blok Dinamis dari Database */}
                <div className="w-full">
                    <BlockRenderer blocks={data.blocks} />
                </div>

            </main>

            {/* Footer Elegan */}
            <Footer />

        </div>
    );
}