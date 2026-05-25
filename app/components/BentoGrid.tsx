'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, LayoutGrid, FolderKanban, Activity, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';

export default function BentoGrid({ items }: { items: any[] }) {
    const pathname = usePathname() || '';
    const isEnglish = pathname === '/' || pathname.endsWith('-en') || pathname.includes('-en');

    const t = {
        emptyTitle: isEnglish ? "Empty Showcase" : "Etalase Kosong",
        emptyDesc: isEnglish
            ? "No application brochures have been published yet."
            : "Belum ada brosur aplikasi yang diterbitkan.",
        openProduct: isEnglish ? "Open Product" : "Buka Produk",
        available: isEnglish ? "Available" : "Tersedia"
    };

    // LOGICAL RE-ARCHITECTURE: Menghapus pola 2x2 (Hero) demi simetri baris yang sempurna
    const getBentoShape = (index: number) => {
        // Pola baru yang lebih stabil: Wide - Base - Base - Wide (berulang)
        const pattern = index % 4;
        if (pattern === 0) return 'wide';
        if (pattern === 1) return 'base';
        if (pattern === 2) return 'base';
        if (pattern === 3) return 'wide';
        return 'base';
    };

    const getFeatureTags = (index: number) => {
        const tagPools = [
            ["Cloud Native", "Real-time API", "Secure"],
            ["AI Ready", "Scalable", "Microservices"],
            ["Data Driven", "Automated", "Encrypted"],
            ["Enterprise", "High Performance", "Analytics"]
        ];
        return tagPools[index % tagPools.length];
    };

    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center bg-white rounded-4xl md:rounded-[2.5rem] border border-slate-200 shadow-sm mx-4 md:mx-0">
                <LayoutGrid className="w-12 h-12 md:w-16 md:h-16 text-slate-200 mb-6" />
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{t.emptyTitle}</h3>
                <p className="text-sm md:text-base text-slate-500 max-w-md px-4">{t.emptyDesc}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 auto-rows-[340px] grid-flow-row-dense">
            {items.map((item, i) => {
                const shape = getBentoShape(i);
                const isWide = shape === 'wide';
                const isBase = shape === 'base';
                const tags = getFeatureTags(i);

                return (
                    <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i % 4) * 0.1, duration: 0.5 }}
                        className={cn(
                            "group relative flex overflow-hidden transition-all duration-500 bg-white border border-slate-200 hover:border-slate-300",
                            // Hanya menggunakan wide (span 2) dan base (span 1)
                            isWide ? "col-span-1 md:col-span-2 shadow-md rounded-3xl p-6 sm:p-8" : "col-span-1 shadow-sm rounded-3xl p-6 sm:p-8"
                        )}
                        style={{
                            boxShadow: isWide
                                ? `0 15px 30px -10px color-mix(in srgb, ${item.primaryColor} 8%, transparent), 0 0 0 1px rgba(0,0,0,0.02)`
                                : '0 4px 6px -1px rgb(0 0 0 / 0.05)'
                        }}
                    >
                        {/* AMBIENT ACCENT */}
                        <div
                            className="absolute -right-10 -top-10 h-48 w-48 rounded-full blur-[80px] opacity-[0.05] transition-all duration-700 group-hover:opacity-10 pointer-events-none"
                            style={{ backgroundColor: item.primaryColor }}
                        />

                        <div className={cn(
                            "relative z-10 flex w-full h-full",
                            isWide ? "flex-col md:flex-row justify-between gap-6 md:items-center" : "flex-col justify-between"
                        )}>

                            {/* CONTENT AREA */}
                            <div className={cn(
                                "flex flex-col h-full grow",
                                isWide && "md:w-[55%] lg:w-[60%]"
                            )}>
                                <div className="mb-auto">
                                    <div
                                        className="rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-500 group-hover:scale-105 shrink-0 w-10 h-10 md:w-12 md:h-12 mb-4"
                                        style={{ backgroundColor: item.primaryColor }}
                                    >
                                        <FolderKanban className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>

                                    <h3 className="font-black tracking-tighter text-slate-900 leading-none text-xl md:text-2xl mb-2 md:mb-3">
                                        {item.name}
                                    </h3>

                                    <p className={cn(
                                        "text-slate-500 font-medium leading-relaxed",
                                        isWide ? "text-sm md:text-base line-clamp-2 md:line-clamp-3" : "text-xs md:text-sm line-clamp-2"
                                    )}>
                                        {item.tagline}
                                    </p>

                                    {/* Feature Pills (Hanya muncul di kartu Wide untuk efisiensi ruang) */}
                                    {isWide && (
                                        <div className="hidden md:flex flex-wrap gap-2 mt-5">
                                            {tags.map((tag, idx) => (
                                                <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-500">
                                                    {idx === 0 && <ShieldCheck className="w-3 h-3" style={{ color: item.primaryColor }} />}
                                                    {idx === 1 && <Zap className="w-3 h-3" style={{ color: item.primaryColor }} />}
                                                    <span className="text-[9px] font-bold uppercase tracking-wider">{tag}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto pt-6 flex items-center justify-between">
                                    <Link
                                        href={`/${item.slug}`}
                                        className="inline-flex items-center gap-1.5 font-black uppercase tracking-wider transition-all duration-300 group/btn bg-slate-50 border border-slate-200 hover:bg-white active:scale-95 text-[9px] md:text-[10px] px-4 py-2.5 rounded-lg shadow-sm"
                                        style={{ color: item.primaryColor }}
                                    >
                                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        <span>{t.openProduct}</span>
                                    </Link>

                                    {isBase && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full opacity-50" style={{ backgroundColor: item.primaryColor }} />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{t.available}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* VISUAL SIDE (Hanya untuk kartu Wide) */}
                            {isWide && (
                                <div className="hidden md:flex flex-1 justify-end items-center pointer-events-none overflow-hidden relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-32 flex gap-3 opacity-20 group-hover:opacity-40 transition-opacity duration-500 transform group-hover:translate-x-2">
                                        <div className="flex flex-col gap-2 w-full justify-center">
                                            <div className="h-2 w-full rounded-full bg-slate-300 overflow-hidden">
                                                <div className="h-full w-2/3 rounded-full" style={{ backgroundColor: item.primaryColor }} />
                                            </div>
                                            <div className="h-2 w-4/5 rounded-full bg-slate-200" />
                                            <div className="h-2 w-full rounded-full bg-slate-300 overflow-hidden mt-4">
                                                <div className="h-full w-1/3 rounded-full" style={{ backgroundColor: item.primaryColor }} />
                                            </div>
                                        </div>
                                        <div className="w-16 h-16 rounded-full border-4 border-slate-200 shrink-0 relative mt-2">
                                            <div className="absolute -inset-1 rounded-full border-4 border-transparent border-t-current border-r-current rotate-45" style={{ color: item.primaryColor }} />
                                        </div>
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