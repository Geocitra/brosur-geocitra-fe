'use client';

import Image from 'next/image';

// 1. Deklarasi Antarmuka (Interface) Properti
interface HeroContentProps {
    isEnglish?: boolean; // Opsional: Jika tidak diisi (seperti di app/page.tsx), akan dianggap false
}

export default function HeroContent({ isEnglish = false }: HeroContentProps) {
    const scrollToGrid = () => {
        const gridElement = document.getElementById('catalog-grid');
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 2. Kamus Translasi Dinamis
    const t = {
        badge: "Showcase", // Kata 'Showcase' sudah universal, tidak perlu diterjemahkan
        titleLine1: isEnglish ? "Software Ecosystem" : "Ekosistem Perangkat Lunak",
        titleLine2: isEnglish ? "Integrated." : "Terintegrasi.",
        description: isEnglish
            ? "Complete technical documentation of the Geocitra software ecosystem. Discover system specifications, smart workflows, and key features of each of our solutions through this interactive brochure platform."
            : "Dokumentasi teknis lengkap ekosistem perangkat lunak Geocitra. Temukan spesifikasi sistem, alur kerja cerdas, dan fitur unggulan setiap solusi kami melalui platform brosur interaktif."
    };

    return (
        <div className="flex flex-col">
            {/* Logo Geocitra - Panel Solid & Bold */}
            <div className="flex items-center gap-6 mb-16 -ml-1">
                <div className="p-4 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <Image
                        src="/logogeocitra.png"
                        alt="Geocitra Logo"
                        width={240}
                        height={60}
                        style={{ height: 'auto', width: 'auto' }}
                        className="object-contain max-h-12"
                        priority
                    />
                </div>
                <div className="h-10 w-1 rounded-full bg-(--primary-color) opacity-50" />
                <span className="text-slate-400 font-black text-xl tracking-[0.2em] uppercase">
                    {t.badge}
                </span>
            </div>

            <div className="max-w-xl">
                <h1 className="text-(length:--fluid-h1) font-extrabold tracking-tighter leading-[1.05] mb-8 text-white">
                    {t.titleLine1} <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white to-(--primary-color)">
                        {t.titleLine2}
                    </span>
                </h1>
                <p className="text-(length:--fluid-p) leading-relaxed max-w-2xl font-medium text-slate-400">
                    {t.description}
                </p>
            </div>
        </div>
    );
}