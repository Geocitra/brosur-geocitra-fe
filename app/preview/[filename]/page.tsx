'use client';

import dynamic from 'next/dynamic';
import { use } from 'react';

// Isolasi mutlak SSR dari library pdf.js
const DynamicPDFViewer = dynamic(() => import('@/app/components/PDFViewer'), {
    ssr: false,
    loading: () => (
        <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border-t-4 border-[#0ea5e9] animate-spin shadow-[0_0_30px_#0ea5e9]" />
            <span className="font-bold tracking-[0.3em] text-xs uppercase text-slate-400 animate-pulse">
                Menyiapkan Lingkungan...
            </span>
        </main>
    ),
});

// Sesuaikan interface untuk mendefinisikan params sebagai Promise
interface PageProps {
    params: Promise<{
        filename: string;
    }>;
}

export default function PreviewPage({ params }: PageProps) {
    // Lakukan unwrap pada promise params menggunakan React.use()
    const resolvedParams = use(params);

    return <DynamicPDFViewer filename={resolvedParams.filename} />;
}