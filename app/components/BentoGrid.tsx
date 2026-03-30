'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import { cn } from '@/app/lib/utils'; // Pastikan path ini sesuai dengan file cn yang kita buat di Fase 1

export default function BentoGrid({ items }: { items: any[] }) {
    // Empty State Elegance
    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-white shadow-sm">
                <LayoutGrid className="w-16 h-16 text-slate-300 mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Etalase Kosong</h3>
                <p className="text-slate-500 max-w-md">
                    Belum ada brosur aplikasi yang diterbitkan. Silakan jalankan Sync Engine di server untuk memuat brosur.
                </p>
            </div>
        );
    }

    return (
        // CSS Grid: 1 Kolom (Mobile) -> 2 Kolom (Tablet) -> 4 Kolom (Desktop)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[250px] md:auto-rows-[300px]">
            {items.map((item, i) => {
                // Logika Bento: Item pertama (index 0) adalah produk unggulan
                const isFeatured = i === 0;

                return (
                    <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                        className={cn(
                            "group relative flex flex-col justify-between overflow-hidden rounded-4xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-2",
                            // Aturan Bentang (Span):
                            isFeatured
                                ? "md:col-span-2 md:row-span-2 bg-white"
                                : "col-span-1 row-span-1 glass-panel"
                        )}
                        style={{
                            // Dynamic Colored Shadow untuk efek mewah saat di-hover
                            boxShadow: `0 12px 40px -12px color-mix(in srgb, ${item.primaryColor} 30%, transparent)`,
                            border: isFeatured ? 'none' : undefined,
                        }}
                    >
                        {/* Ambient Blob di dalam Kartu */}
                        <div
                            className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[80px] opacity-20 transition-all duration-700 group-hover:scale-150 group-hover:opacity-40"
                            style={{ backgroundColor: item.primaryColor }}
                        />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="mb-auto">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundColor: item.primaryColor }}
                                >
                                    <LayoutGrid size={28} />
                                </div>

                                <h3 className={cn(
                                    "font-extrabold tracking-tight text-slate-900 mb-4",
                                    isFeatured ? "text-4xl md:text-5xl" : "text-2xl"
                                )}>
                                    {item.name}
                                </h3>

                                <p className={cn(
                                    "text-slate-600 leading-relaxed",
                                    isFeatured ? "text-lg md:text-xl line-clamp-3" : "text-base line-clamp-2"
                                )}>
                                    {item.tagline}
                                </p>
                            </div>

                            {/* Action Area */}
                            <div className="mt-8 flex items-center justify-between">
                                <Link
                                    href={`/${item.slug}`}
                                    className="inline-flex items-center gap-2 font-bold transition-all duration-300 group-hover:gap-4 bg-white/50 px-6 py-3 rounded-full hover:bg-white"
                                    style={{ color: item.primaryColor }}
                                >
                                    Buka Brosur <ArrowRight size={20} />
                                </Link>

                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                                    Pratinjau Interaktif
                                </span>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}