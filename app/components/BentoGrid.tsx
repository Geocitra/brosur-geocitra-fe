'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, LayoutGrid, Sparkles, FolderKanban } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';

export default function BentoGrid({ items }: { items: any[] }) {
    const pathname = usePathname() || '';
    const isEnglish = pathname === '/en' || pathname.endsWith('-en');

    const t = {
        emptyTitle: isEnglish ? "Empty Showcase" : "Etalase Kosong",
        emptyDesc: isEnglish
            ? "No application brochures have been published yet."
            : "Belum ada brosur aplikasi yang diterbitkan.",
        openProduct: isEnglish ? "Open Product" : "Buka Produk",
        available: isEnglish ? "Available" : "Tersedia"
    };

    const existingAssets = [
        '/assets/digiarch-mockup.png',
        '/assets/edaily-mockup.png',
        '/assets/litera-mockup.png',
        '/assets/rekas-mockup.png'
    ];

    const [visualStack, setVisualStack] = useState<string[]>(existingAssets.slice(0, 3));

    useEffect(() => {
        const shuffled = [...existingAssets].sort(() => 0.5 - Math.random()).slice(0, 3);
        setVisualStack(shuffled);
    }, []);

    // Perfect Mirrored Bento Matrix (Siklus 8 Pola)
    const getBentoShape = (index: number) => {
        const pattern = index % 8;
        if (pattern === 0) return 'hero'; // Kiri (2x2)
        if (pattern === 1) return 'wide'; // Kanan Atas (2x1)
        if (pattern === 2) return 'base'; // Kanan Bawah (1x1)
        if (pattern === 3) return 'base'; // Kanan Bawah (1x1)
        if (pattern === 4) return 'wide'; // Kiri Atas (2x1)
        if (pattern === 5) return 'hero'; // Kanan (2x2)
        if (pattern === 6) return 'base'; // Kiri Bawah (1x1)
        if (pattern === 7) return 'base'; // Kiri Bawah (1x1)
        return 'base';
    };

    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center bg-white rounded-4xl md:rounded-[2.5rem] border border-slate-200 shadow-sm mx-4 md:mx-0">
                <LayoutGrid className="w-12 h-12 md:w-16 md:h-16 text-slate-200 mb-6" />
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{t.emptyTitle}</h3>
                <p className="text-sm md:text-base text-slate-500 max-w-md px-4">
                    {t.emptyDesc}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 auto-rows-[minmax(320px,auto)] md:auto-rows-[320px] grid-flow-row-dense">
            {items.map((item, i) => {
                const shape = getBentoShape(i);

                const isHero = shape === 'hero';
                const isWide = shape === 'wide';
                const isBase = shape === 'base';

                // LOGIC FIX: Mendeteksi Orphan Card (Kartu yang sendirian di baris terakhir)
                const isLastItem = i === items.length - 1;
                // Jika dia adalah pembuka blok baru (index 0 atau 4 dari siklus) DAN dia adalah item terakhir
                const isOrphanCentered = isLastItem && (i % 8 === 0 || i % 8 === 4);

                return (
                    <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i % 8) * 0.1, duration: 0.5 }}
                        className={cn(
                            "group relative flex overflow-hidden transition-all duration-500 bg-white border border-slate-200 hover:border-slate-300",

                            // MAPPING BENTUK GRID: 
                            isHero && "flex-col lg:flex-row col-span-1 row-span-2 md:col-span-2 md:row-span-2 shadow-xl rounded-4xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12",
                            isWide && "flex-col md:flex-row col-span-1 row-span-1 md:col-span-2 md:row-span-1 shadow-md rounded-3xl p-6 sm:p-8",
                            isBase && "flex-col col-span-1 row-span-1 shadow-sm rounded-3xl p-6 sm:p-8",

                            // PUSATKAN ORPHAN CARD: Mulai dari kolom 2 di layar besar (lg)
                            isOrphanCentered && "lg:col-start-2"
                        )}
                        style={{
                            boxShadow: isHero
                                ? `0 20px 40px -15px color-mix(in srgb, ${item.primaryColor} 12%, transparent), 0 0 0 1px rgba(0,0,0,0.05)`
                                : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                        }}
                    >
                        {/* AMBIENT ACCENT */}
                        <div
                            className="absolute -right-10 -top-10 h-48 w-48 md:h-64 md:w-64 rounded-full blur-[80px] md:blur-[100px] opacity-[0.05] transition-all duration-700 group-hover:opacity-10 pointer-events-none"
                            style={{ backgroundColor: item.primaryColor }}
                        />

                        {/* CONTENT WRAPPER */}
                        <div className={cn(
                            "relative z-10 flex w-full",
                            isHero && "flex-col lg:flex-row gap-8 md:gap-10",
                            isWide && "flex-col md:flex-row justify-between gap-6 md:items-center",
                            isBase && "flex-col justify-between h-full"
                        )}>

                            {/* TEXT & ICON AREA */}
                            <div className={cn(
                                "flex flex-col h-full",
                                isHero ? "flex-1 lg:max-w-[45%] justify-between" : "grow justify-between",
                                isWide && "md:w-[55%] lg:w-[60%]"
                            )}>
                                <div className="mb-auto">
                                    {/* ICON */}
                                    <div
                                        className={cn(
                                            "rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-500 group-hover:scale-105",
                                            isHero ? "w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-10" : "w-10 h-10 md:w-12 md:h-12 mb-5 md:mb-6"
                                        )}
                                        style={{ backgroundColor: item.primaryColor }}
                                    >
                                        {isHero ? <Sparkles className="w-6 h-6 md:w-8 md:h-8" /> : <FolderKanban className="w-5 h-5 md:w-6 md:h-6" />}
                                    </div>

                                    {/* TYPOGRAPHY */}
                                    <h3 className={cn(
                                        "font-black tracking-tighter text-slate-900 leading-none",
                                        isHero ? "text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6" : "text-xl md:text-2xl mb-2 md:mb-3"
                                    )}>
                                        {item.name}
                                    </h3>

                                    <p className={cn(
                                        "text-slate-500 font-medium leading-relaxed",
                                        isHero ? "text-base md:text-lg line-clamp-3 md:line-clamp-4" :
                                            isWide ? "text-sm md:text-base line-clamp-2 md:line-clamp-3" : "text-xs md:text-sm line-clamp-2"
                                    )}>
                                        {item.tagline}
                                    </p>
                                </div>

                                {/* ACTION BUTTON */}
                                <div className={cn(
                                    "mt-6 flex items-center justify-between",
                                    isHero ? "md:mt-auto md:pt-12" : "mt-auto pt-6",
                                    isWide && "md:mt-6"
                                )}>
                                    <Link
                                        href={`/${item.slug}`}
                                        className={cn(
                                            "inline-flex items-center font-black uppercase tracking-wider transition-all duration-300 group/btn bg-slate-50 border border-slate-200 hover:bg-white active:scale-95",
                                            isHero
                                                ? "gap-2 md:gap-3 text-[10px] md:text-xs px-5 py-3 md:px-6 md:py-3.5 rounded-xl shadow-md"
                                                : "gap-1.5 text-[9px] md:text-[10px] px-3.5 py-2.5 md:px-4 rounded-lg shadow-sm"
                                        )}
                                        style={{ color: item.primaryColor }}
                                    >
                                        <ArrowRight className={cn(
                                            "transition-transform duration-300 group-hover/btn:translate-x-1",
                                            isHero ? "w-4 h-4 md:w-5 md:h-5" : "w-3 h-3 md:w-3.5 md:h-3.5"
                                        )} />
                                        <span>{t.openProduct}</span>
                                    </Link>

                                    {!isHero && !isWide && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 md:w-1 md:h-1 rounded-full opacity-50" style={{ backgroundColor: item.primaryColor }} />
                                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">
                                                {t.available}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT/BOTTOM SIDE: Visual Logic (Khusus Hero) */}
                            {isHero && (
                                <div className="flex-1 relative w-full mt-8 lg:mt-0 min-h-55 sm:min-h-70 lg:min-h-full items-center justify-center pointer-events-none">
                                    <div className="absolute inset-0 flex items-center justify-center lg:block lg:-right-20 lg:-top-10 lg:-bottom-10 lg:w-[120%] perspective-1000">
                                        {visualStack.map((path, index) => {
                                            const transforms = [
                                                "rotate-[-10deg] md:rotate-[-12deg] -translate-x-4 md:-translate-x-8 translate-y-4 md:translate-y-6",
                                                "rotate-[6deg] md:rotate-[8deg] translate-x-8 md:translate-x-12 -translate-y-6 md:-translate-y-10 z-20",
                                                "rotate-[-2deg] -translate-y-1 md:-translate-y-2 z-10",
                                            ];

                                            return (
                                                <motion.div
                                                    key={`${path}-${index}`}
                                                    initial={{ opacity: 0, y: 40 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.8 }}
                                                    className={cn(
                                                        "absolute w-40 sm:w-50 lg:w-65 xl:w-70 aspect-4/3 bg-white rounded-xl md:rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden transform transition-transform duration-700 lg:group-hover:scale-105 lg:group-hover:-translate-y-2.5",
                                                        transforms[index]
                                                    )}
                                                >
                                                    <Image
                                                        src={path}
                                                        alt="App Preview"
                                                        fill
                                                        sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 280px"
                                                        className="object-cover"
                                                        priority={index === 1}
                                                    />
                                                </motion.div>
                                            );
                                        })}
                                        <div
                                            className="absolute inset-10 md:inset-20 rounded-full opacity-20 blur-2xl scale-110 -z-10"
                                            style={{ backgroundColor: item.primaryColor }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Ornamen visual opsional untuk kartu Wide */}
                            {isWide && (
                                <div className="hidden md:flex flex-1 justify-end items-center pointer-events-none opacity-[0.04] group-hover:opacity-10 transition-opacity duration-500 overflow-hidden">
                                    <LayoutGrid className="w-40 h-40 md:w-56 md:h-56 translate-x-4" style={{ color: item.primaryColor }} />
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}