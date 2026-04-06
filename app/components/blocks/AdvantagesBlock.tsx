'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/lib/utils';

// 1. Definisi Kontrak Data
interface AdvantageItem {
    icon: string;
    title: string;
    desc: string;
}

interface AdvantagesBlockProps {
    data: {
        title?: string;
        subtitle?: string;
        items: AdvantageItem[];
    };
}

export default function AdvantagesBlock({ data }: AdvantagesBlockProps) {
    // Deteksi Bahasa Dinamis
    const pathname = usePathname() || '';
    const isEnglish = pathname === '/en' || pathname.endsWith('-en');

    // Kamus Translasi Fallback
    const t = {
        defaultSubtitle: isEnglish ? "System Advantages" : "Keunggulan Sistem",
        defaultTitle: isEnglish ? "Why Choose Our Architecture?" : "Mengapa Memilih Ekosistem Kami?"
    };

    if (!data?.items || data.items.length === 0) return null;

    // Kalkulasi adaptif untuk grid berdasarkan jumlah data
    // Jika data 4, lebih simetris menggunakan grid-cols-2 di desktop agar menjadi 2x2.
    // Jika data kelipatan 3, gunakan grid-cols-3.
    const gridColsClass = data.items.length === 4
        ? "lg:grid-cols-2 max-w-4xl mx-auto"
        : "lg:grid-cols-3 max-w-6xl mx-auto";

    return (
        <section className="relative py-16 sm:py-20 md:py-28 bg-white overflow-hidden border-t border-slate-100">
            {/* Dekorasi Visual Background (Subtle Pattern) */}
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <div
                className="absolute top-0 right-0 w-150 h-150 rounded-full blur-[120px] opacity-[0.03] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4"
                style={{ backgroundColor: 'var(--primary-color)' }}
            />

            <div className="enterprise-container relative z-10 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-14 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-4 md:mb-6"
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                        />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-700">
                            {data.subtitle || t.defaultSubtitle}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter max-w-3xl mx-auto leading-[1.15]"
                    >
                        {data.title || t.defaultTitle}
                    </motion.h2>
                </div>

                {/* Grid Layout Cerdas */}
                <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8", gridColsClass)}>
                    {data.items.map((item, index) => {
                        const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.CheckCircle;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative flex flex-col p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-4xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:border-transparent transition-all duration-500 overflow-hidden"
                            >
                                {/* Efek Hover: Drop Shadow Dinamis dengan Warna Primer */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-4xl"
                                    style={{ boxShadow: '0 20px 40px -15px color-mix(in srgb, var(--primary-color) 15%, transparent)' }}
                                />

                                {/* Ikon Kontainer Dinamis */}
                                <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 bg-slate-50 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 group-hover:shadow-md transition-all duration-500 overflow-hidden">
                                    {/* Pendar belakang saat hover */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                        style={{ backgroundColor: 'var(--primary-color)' }}
                                    />

                                    <IconComponent
                                        className="w-6 h-6 md:w-8 md:h-8 transition-colors duration-500 text-slate-600 group-hover:text-(--primary-color) relative z-10"
                                    />
                                </div>

                                <div className="relative z-10 grow flex flex-col">
                                    <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight group-hover:text-(--primary-color) transition-colors duration-300">
                                        {item.title}
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">
                                        {item.desc}
                                    </p>
                                </div>

                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}