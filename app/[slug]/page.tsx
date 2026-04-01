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
            {/* [FIX ANALISA]: Menghapus kelas 'pt-20'. 
                Biarkan komponen anak (HeroBlock) yang mengatur jarak amannya sendiri terhadap Navbar
                agar blok warna background bisa langsung merapat ke batas atas layar.
            */}
            <main className="relative z-10 grow w-full">
                <BlockRenderer blocks={data.blocks} />
            </main>

            {/* Footer Elegan */}
            <Footer />
        </>
    );
}