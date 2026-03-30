import { api } from '@/app/src/lib/axios';
import BlockRenderer from '@/app/src/components/BlockRenderer';
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
        <main className="min-h-screen bg-white">
            {/* Header Statis Geocitra */}
            <header className="w-full py-6 px-6 border-b border-slate-100 flex items-center justify-between">
                {/* Menggunakan class text-primary hasil mapping dari globals.css */}
                <span className="font-extrabold text-2xl tracking-tighter text-primary">
                    GEOCITRA
                </span>
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                    {data.name}
                </span>
            </header>

            {/* Mesin Pabrik Render Komponen Dinamis */}
            <BlockRenderer blocks={data.blocks} />

            {/* Footer Statis Geocitra */}
            <footer className="w-full py-8 text-center border-t border-slate-100 mt-12">
                <p className="text-slate-400 font-medium">© {new Date().getFullYear()} CV Geocitra. All Rights Reserved.</p>
            </footer>
        </main>
    );
}