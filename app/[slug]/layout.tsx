import { api } from '@/app/lib/axios';
import { ReactNode } from 'react';
import AuraBackground from '@/app/components/ui/AuraBackground';

// Fungsi fetcher khusus untuk metadata dan layout
async function getShowcaseTheme(slug: string) {
    try {
        const response = await api.get(`/showcase/${slug}`);
        return response.data.primaryColor;
    } catch (error) {
        return '#1e293b'; // Fallback ke warna Slate-800 jika API gagal
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
        // Pindahkan style ke pembungkus paling luar agar semua anak (termasuk Aura) bisa baca
        <div style={themeVariables} className="relative w-full min-h-screen">
            <AuraBackground />
            <main className="relative z-10">
                {children}
            </main>
        </div>
    );
}