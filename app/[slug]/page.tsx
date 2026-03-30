import { api } from '@/app/lib/axios';
import BlockRenderer from '@/app/components/BlockRenderer';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

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

    if (!data) {
        notFound();
    }

    return (
        // pt-20 ditambahkan agar konten tidak menabrak fixed Navbar
        <main className="min-h-screen bg-white pt-20 flex flex-col">

            {/* Header Dinamis dengan Glassmorphism */}
            <Navbar appName={data.name} />

            {/* Mesin Pabrik Render Komponen Dinamis (Mengisi sisa ruang kosong) */}
            <div className="grow">
                <BlockRenderer blocks={data.blocks} />
            </div>

            {/* Footer Elegan Geocitra */}
            <Footer />

        </main>
    );
}