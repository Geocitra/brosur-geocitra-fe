'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // UBAH: Tambahkan usePathname
import { ArrowRight, LayoutGrid, Sparkles, FolderKanban } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';

export default function BentoGrid({ items }: { items: any[] }) {
    // 1. Ekstraksi Path & Deteksi Bahasa Dinamis
    const pathname = usePathname() || '';

    // Logika Pintar: Menangkap root '/en' ATAU slug berakhiran '-en'
    const isEnglish = pathname === '/en' || pathname.endsWith('-en');

    // 2. Kamus Translasi (Dictionary)
    const t = {
        emptyTitle: isEnglish ? "Empty Showcase" : "Etalase Kosong",
        emptyDesc: isEnglish
            ? "No application brochures have been published yet."
            : "Belum ada brosur aplikasi yang diterbitkan.",
        openProduct: isEnglish ? "Open Product" : "Buka Produk",
        available: isEnglish ? "Available" : "Tersedia"
    };

    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[2.5rem] border border-slate-200 shadow-sm">
                <LayoutGrid className="w-16 h-16 text-slate-200 mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.emptyTitle}</h3>
                <p className="text-slate-500 max-w-md">
                    {t.emptyDesc}
                </p>
            </div>
        );
    }

    // List gambar aset yang ada untuk tumpukan acak di kartu featured
    const existingAssets = [
        '/assets/digiarch-mockup.png',
        '/assets/edaily-mockup.png',
        '/assets/litera-mockup.png',
        '/assets/rekas-mockup.png'
    ];

    // Mengambil 3 gambar acak yang unik dari list aset
    const getVisualStack = () => {
        // Shuffle sederhana dan ambil 3 teratas
        return [...existingAssets].sort(() => 0.5 - Math.random()).slice(0, 3);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[280px] md:auto-rows-[320px]">
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
                            "group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 bg-white border border-slate-200 hover:border-slate-300",
                            isFeatured
                                ? "md:col-span-2 md:row-span-2 shadow-xl p-10 md:p-12"
                                : "col-span-1 row-span-1 shadow-sm p-8"
                        )}
                        style={{
                            boxShadow: isFeatured
                                ? `0 30px 60px -15px color-mix(in srgb, ${item.primaryColor} 12%, transparent), 0 0 0 1px rgba(0,0,0,0.05)`
                                : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                        }}
                    >
                        {/* AMBIENT ACCENT */}
                        <div
                            className="absolute -right-10 -top-10 h-64 w-64 rounded-full blur-[100px] opacity-[0.05] transition-all duration-700 group-hover:opacity-10 pointer-events-none"
                            style={{ backgroundColor: item.primaryColor }}
                        />

                        {/* CONTENT WRAPPER */}
                        <div className={cn("relative z-10 flex h-full", isFeatured ? "flex-col md:flex-row gap-10" : "flex-col justify-between")}>

                            {/* LEFT/TOP SIDE: Content Area */}
                            <div className={cn("flex flex-col justify-between h-full", isFeatured ? "flex-1 max-w-xs" : "flex-grow")}>
                                <div className="mb-auto">
                                    {/* ICON */}
                                    <div
                                        className={cn(
                                            "rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-500 group-hover:scale-110",
                                            isFeatured ? "w-16 h-16 mb-10" : "w-12 h-12 mb-6"
                                        )}
                                        style={{ backgroundColor: item.primaryColor }}
                                    >
                                        {isFeatured ? <Sparkles size={32} /> : <FolderKanban size={22} />}
                                    </div>

                                    {/* TYPOGRAPHY */}
                                    <h3 className={cn(
                                        "font-black tracking-tighter text-slate-900 leading-none",
                                        isFeatured ? "text-4xl md:text-5xl mb-6" : "text-xl mb-3"
                                    )}>
                                        {item.name}
                                    </h3>

                                    <p className={cn(
                                        "text-slate-500 font-semibold leading-relaxed",
                                        isFeatured ? "text-lg line-clamp-4" : "text-sm line-clamp-2"
                                    )}>
                                        {item.tagline}
                                    </p>
                                </div>

                                {/* ACTION BUTTON: Menyesuaikan ukuran card */}
                                <div className={cn("mt-auto flex items-center justify-between", isFeatured ? "pt-12" : "pt-6")}>
                                    <Link
                                        href={`/${item.slug}`}
                                        className={cn(
                                            "inline-flex items-center font-black uppercase tracking-wider transition-all duration-300 group/btn bg-slate-50 border border-slate-200 hover:bg-white active:scale-95",
                                            // [FIX BUTTON] Conditional Padding & Text Size
                                            isFeatured
                                                ? "gap-3 text-xs px-6 py-3.5 rounded-xl shadow-lg"
                                                : "gap-1.5 text-[9px] px-4 py-2.5 rounded-lg shadow-sm"
                                        )}
                                        style={{ color: item.primaryColor }}
                                    >
                                        <ArrowRight size={isFeatured ? 18 : 14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        <span>{t.openProduct}</span>
                                    </Link>

                                    {!isFeatured && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full opacity-50" style={{ backgroundColor: item.primaryColor }} />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                                {t.available}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT/BOTTOM SIDE: Irregular Visual Stack (Only for Featured) */}
                            {isFeatured && (
                                <div className="flex-1 relative h-full min-h-[300px] md:min-h-full items-center justify-center">
                                    <div className="absolute inset-0 md:-right-20 md:-top-10 md:-bottom-10 h-full w-[120%] flex items-center justify-center perspective-1000">

                                        {/* Mengambil 3 gambar acak */}
                                        {getVisualStack().map((path, index) => {
                                            // Definisi rotasi dan translate acak biar berantakan tapi estetik
                                            const transforms = [
                                                "rotate-[-12deg] -translate-x-8 translate-y-6", // Kiri bawah
                                                "rotate-[8deg] translate-x-12 -translate-y-10 z-20", // Kanan atas (paling depan)
                                                "rotate-[-2deg] -translate-y-2 z-10", // Tengah (agak belakang)
                                            ];

                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 40 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.8 }}
                                                    className={cn(
                                                        "absolute w-[240px] md:w-[280px] aspect-[4/3] bg-white rounded-2xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.5)] border-2 border-slate-100 overflow-hidden transform transition-transform duration-700 group-hover:scale-105 group-hover:translate-y-[-10px]",
                                                        transforms[index]
                                                    )}
                                                >
                                                    <Image
                                                        src={path}
                                                        alt="App Preview"
                                                        fill
                                                        className="object-cover"
                                                        priority
                                                    />
                                                </motion.div>
                                            );
                                        })}

                                        {/* Background Glow di belakang tumpukan */}
                                        <div
                                            className="absolute inset-10 rounded-full opacity-20 blur-3xl scale-125 -z-10"
                                            style={{ backgroundColor: item.primaryColor }}
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