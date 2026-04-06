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

    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center bg-white rounded-4xl:rounded-[2.5rem] border border-slate-200 shadow-sm mx-4 md:mx-0">
                <LayoutGrid className="w-12 h-12 md:w-16 md:h-16 text-slate-200 mb-6" />
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{t.emptyTitle}</h3>
                <p className="text-sm md:text-base text-slate-500 max-w-md px-4">
                    {t.emptyDesc}
                </p>
            </div>
        );
    }

    return (
        /* LOGICAL FIX 1: Grid Auto-Rows Responsif */
        /* minmax(320px, auto) di mobile agar kartu bisa membesar jika kontennya banyak, tapi statis 320px di desktop */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 auto-rows-[minmax(320px,auto)] md:auto-rows-[320px]">
            {items.map((item, i) => {
                const isFeatured = i === 0;

                return (
                    <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className={cn(
                            "group relative flex flex-col overflow-hidden transition-all duration-500 bg-white border border-slate-200 hover:border-slate-300",
                            // LOGICAL FIX 2: Proporsi Padding & Span Responsif
                            isFeatured
                                ? "col-span-1 row-span-2 md:col-span-2 md:row-span-2 shadow-xl rounded-4xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12"
                                : "col-span-1 row-span-1 shadow-sm rounded-3xl p-6 sm:p-8"
                        )}
                        style={{
                            boxShadow: isFeatured
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
                            "relative z-10 flex h-full",
                            // Pada mobile, Featured Card menjadi kolom bersusun dengan jarak (gap) yang rapi
                            isFeatured ? "flex-col lg:flex-row gap-8 md:gap-10" : "flex-col justify-between"
                        )}>

                            {/* LEFT/TOP SIDE: Content Area */}
                            <div className={cn("flex flex-col justify-between h-full", isFeatured ? "flex-1 lg:max-w-[45%]" : "grow")}>
                                <div className="mb-auto">
                                    {/* ICON */}
                                    <div
                                        className={cn(
                                            "rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-500 group-hover:scale-105 md:group-hover:scale-110",
                                            isFeatured ? "w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-10" : "w-10 h-10 md:w-12 md:h-12 mb-5 md:mb-6"
                                        )}
                                        style={{ backgroundColor: item.primaryColor }}
                                    >
                                        {isFeatured ? <Sparkles className="w-6 h-6 md:w-8 md:h-8" /> : <FolderKanban className="w-5 h-5 md:w-6 md:h-6" />}
                                    </div>

                                    {/* TYPOGRAPHY */}
                                    <h3 className={cn(
                                        "font-black tracking-tighter text-slate-900 leading-none",
                                        isFeatured ? "text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6" : "text-lg md:text-xl mb-2 md:mb-3"
                                    )}>
                                        {item.name}
                                    </h3>

                                    <p className={cn(
                                        "text-slate-500 font-medium leading-relaxed",
                                        isFeatured ? "text-base md:text-lg line-clamp-3 md:line-clamp-4" : "text-xs md:text-sm line-clamp-2"
                                    )}>
                                        {item.tagline}
                                    </p>
                                </div>

                                {/* ACTION BUTTON */}
                                <div className={cn("mt-6 flex items-center justify-between", isFeatured ? "md:mt-auto md:pt-12" : "mt-auto pt-6")}>
                                    <Link
                                        href={`/${item.slug}`}
                                        className={cn(
                                            "inline-flex items-center font-black uppercase tracking-wider transition-all duration-300 group/btn bg-slate-50 border border-slate-200 hover:bg-white active:scale-95",
                                            // LOGICAL FIX 3: Target Sentuh Mobile yang Aman (min px-4 py-2.5)
                                            isFeatured
                                                ? "gap-2 md:gap-3 text-[10px] md:text-xs px-5 py-3 md:px-6 md:py-3.5 rounded-xl shadow-md md:shadow-lg"
                                                : "gap-1.5 text-[9px] md:text-[10px] px-3.5 py-2.5 md:px-4 rounded-lg shadow-sm"
                                        )}
                                        style={{ color: item.primaryColor }}
                                    >
                                        <ArrowRight className={cn(
                                            "transition-transform duration-300 group-hover/btn:translate-x-1",
                                            isFeatured ? "w-4 h-4 md:w-5 md:h-5" : "w-3 h-3 md:w-3.5 md:h-3.5"
                                        )} />
                                        <span>{t.openProduct}</span>
                                    </Link>

                                    {!isFeatured && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 md:w-1 md:h-1 rounded-full opacity-50" style={{ backgroundColor: item.primaryColor }} />
                                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">
                                                {t.available}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT/BOTTOM SIDE: Irregular Visual Stack (Only for Featured) */}
                            {isFeatured && (
                                // LOGICAL FIX 4: Kontainer min-h agar ruang render stack aman di mobile
                                <div className="flex-1 relative w-full mt-8 lg:mt-0 min-h-55 sm:min-h-70 lg:min-h-full items-center justify-center pointer-events-none">
                                    <div className="absolute inset-0 flex items-center justify-center lg:block lg:-right-20 lg:-top-10 lg:-bottom-10 lg:w-[120%] perspective-1000">

                                        {visualStack.map((path, index) => {
                                            // Vektor Transform di-scaling secara responsif
                                            const transforms = [
                                                "rotate-[-10deg] md:rotate-[-12deg] -translate-x-4 md:-translate-x-8 translate-y-4 md:translate-y-6", // Kiri bawah
                                                "rotate-[6deg] md:rotate-[8deg] translate-x-8 md:translate-x-12 -translate-y-6 md:-translate-y-10 z-20", // Kanan atas (depan)
                                                "rotate-[-2deg] -translate-y-1 md:-translate-y-2 z-10", // Tengah (belakang)
                                            ];

                                            return (
                                                <motion.div
                                                    key={`${path}-${index}`}
                                                    initial={{ opacity: 0, y: 40 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.8 }}
                                                    className={cn(
                                                        // LOGICAL FIX 5: Lebar gambar dibuat dinamis (w-[160px] di HP kecil, sm:w-[200px], dsb)
                                                        "absolute w-40 sm:w-50 lg:w-65 xl:w-70 aspect-4/3 bg-white rounded-xl md:rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] md:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.5)] border md:border-2 border-slate-100 overflow-hidden transform transition-transform duration-700 lg:group-hover:scale-105 lg:group-hover:-translate-y-2.5",
                                                        transforms[index]
                                                    )}
                                                >
                                                    <Image
                                                        src={path}
                                                        alt="App Preview"
                                                        fill
                                                        sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 280px" // Sinkronisasi Core Web Vitals
                                                        className="object-cover"
                                                        priority={index === 1} // Prioritaskan gambar paling depan
                                                    />
                                                </motion.div>
                                            );
                                        })}

                                        {/* Background Glow */}
                                        <div
                                            className="absolute inset-10 md:inset-20 rounded-full opacity-20 blur-2xl md:blur-3xl scale-110 md:scale-125 -z-10"
                                            style={{ backgroundColor: items[0]?.primaryColor || '#0ea5e9' }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}