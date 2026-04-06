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
        // REVISI 1: Alignment adaptif. Rata tengah di HP/Tablet agar seimbang, kembali rata kiri di Desktop.
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Logo Geocitra - Panel Solid & Bold */}
            {/* REVISI 2: Spasi, Margin, dan Gap dibuat bertingkat (sm, md, lg) */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 mb-10 md:mb-12 lg:mb-16 ml-0 lg:-ml-1">

                {/* Kotak Logo lebih ringkas di HP */}
                <div className="p-2.5 sm:p-3 md:p-4 bg-white rounded-xl sm:rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.2)] md:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <Image
                        src="/logogeocitra.png"
                        alt="Geocitra Logo"
                        width={240}
                        height={60}
                        style={{ height: 'auto', width: 'auto' }}
                        // REVISI 3: Skalabilitas gambar Logo yang tidak merobek kontainer di layar 320px
                        className="object-contain max-h-6 sm:max-h-8 md:max-h-12"
                        priority
                    />
                </div>

                {/* Divider responsif */}
                <div className="h-6 sm:h-8 md:h-10 w-1 rounded-full bg-(--primary-color) opacity-50" />

                {/* Badge typography responsif */}
                <span className="text-slate-400 font-black text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                    {t.badge}
                </span>
            </div>

            {/* REVISI 4: Max-width dan padding aman untuk teks */}
            <div className="max-w-2xl px-4 sm:px-6 lg:px-0">
                {/* REVISI 5: Mencabut --fluid-h1 dan --fluid-p, menggantinya dengan utilitas Tailwind absolut agar konsisten di semua Browser Engine */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 text-white">
                    {t.titleLine1} <br className="hidden sm:block lg:hidden" />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white to-(--primary-color)">
                        {' '}{t.titleLine2}
                    </span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mx-auto lg:mx-0 max-w-xl lg:max-w-2xl font-medium text-slate-400">
                    {t.description}
                </p>
            </div>
        </div>
    );
}