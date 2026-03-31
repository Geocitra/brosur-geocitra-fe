import React from 'react';
import { notFound } from 'next/navigation';
import { api } from '@/app/lib/axios';
import BlockRenderer from '@/app/components/BlockRenderer';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

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

    return (
        // Menggunakan Fragment (<>) karena parent container flex-col 
        // dan warna tema sudah di-handle oleh app/[slug]/layout.tsx
        <>
            {/* Header Dinamis */}
            <Navbar appName={data.name} />

            {/* KONTEN UTAMA */}
            {/* Lebar penuh agar desain blok background bisa meluas ke ujung layar */}
            <main className="relative z-10 grow w-full pt-20">
                <BlockRenderer blocks={data.blocks} />
            </main>

            {/* Footer Elegan */}
            <Footer />
        </>
    );
}