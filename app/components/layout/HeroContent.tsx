'use client';

import Image from 'next/image';

export default function HeroContent() {
    const scrollToGrid = () => {
        const gridElement = document.getElementById('catalog-grid');
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth' });
        }
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
                <div className="h-10 w-1 rounded-full bg-[var(--primary-color)] opacity-50" />
                <span className="text-slate-400 font-black text-xl tracking-[0.2em] uppercase">
                    Showcase
                </span>
            </div>

            <div className="max-w-xl">
                <h1 className="text-[length:var(--fluid-h1)] font-extrabold tracking-tighter leading-[1.05] mb-8 text-white">
                    Ekosistem Perangkat Lunak <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white to-[var(--primary-color)]">
                        Terintegrasi.
                    </span>
                </h1>
                <p className="text-[length:var(--fluid-p)] leading-relaxed max-w-2xl font-medium text-slate-400">
                    Dokumentasi teknis lengkap ekosistem perangkat lunak Geocitra. Temukan spesifikasi sistem, alur kerja cerdas, dan fitur unggulan setiap solusi kami melalui platform brosur interaktif.
                </p>
            </div>
        </div>
    );
}