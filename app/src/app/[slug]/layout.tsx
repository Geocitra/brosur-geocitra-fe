import { api } from '@/app/src/lib/axios';
import { ReactNode } from 'react';

// Fungsi fetcher khusus untuk metadata dan layout
async function getShowcaseTheme(slug: string) {
    try {
        const response = await api.get(`/showcase/${slug}`);
        return response.data.primaryColor;
    } catch (error) {
        return '#1e293b'; // Fallback ke warna Slate-800 jika API gagal/data tidak ada
    }
}

export default async function ShowcaseLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;

    // Ambil data warna primer dari Backend
    const primaryColor = await getShowcaseTheme(resolvedParams.slug);

    // Suntikkan variabel CSS murni ke DOM agar Tailwind bisa membacanya
    const themeVariables = {
        '--primary-color': primaryColor,
    } as React.CSSProperties;

    return (
        <div style={themeVariables} className="w-full min-h-screen font-sans selection:bg-primary selection:text-white">
            {children}
        </div>
    );
}