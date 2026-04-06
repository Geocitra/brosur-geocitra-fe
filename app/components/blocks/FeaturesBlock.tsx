'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import * as Icons from 'lucide-react';

interface FeatureItem {
    title: string;
    desc: string;
    icon?: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
}

interface FeaturesBlockProps {
    data: {
        title?: string;
        features: FeatureItem[];
    };
}

// Utility function untuk menggabungkan class
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

export default function FeaturesBlock({ data }: FeaturesBlockProps) {
    const [activeTab, setActiveTab] = useState(0);

    // 1. Ekstraksi Parameter & Deteksi Bahasa
    const params = useParams();
    const slug = typeof params?.slug === 'string' ? params.slug : '';
    const isEnglish = slug.endsWith('-en');

    // 2. Kamus Translasi Dinamis
    const t = {
        defaultTitle: isEnglish ? "Core Features" : "Keunggulan Fitur",
        badge: isEnglish ? "Core Features" : "Fitur Utama",
        featureLabel: isEnglish ? "Feature" : "Fitur",
        emptyVisual: isEnglish ? "Visualization not available" : "Visualisasi belum tersedia"
    };

    const sectionTitle = data.title || t.defaultTitle;

    // Auto-rotate logic: Berpindah tab setiap 15 detik
    useEffect(() => {
        if (!data.features || data.features.length === 0) return;
        const timer = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % data.features.length);
        }, 15000);
        return () => clearInterval(timer);
    }, [data.features]);

    if (!data.features || data.features.length === 0) return null;

    const activeFeature = data.features[activeTab];
    const ActiveIconComponent = activeFeature.icon ? (Icons as any)[activeFeature.icon] : Icons.CheckCircle;

    return (
        // REVISI 1: Padding dinamis (py-16 untuk HP, py-24 untuk Desktop)
        <section className="py-16 md:py-20 lg:py-24 relative z-10 overflow-hidden bg-slate-50" id="features">
            {/* REVISI 2: Batas Container dengan padding aman di sisi kiri-kanan */}
            <div className="enterprise-container max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">

                {/* THE SECRET SAUCE: Blob Cahaya disesuaikan ukurannya agar tidak merusak UI di Mobile */}
                <div
                    className="absolute top-[10%] lg:top-[20%] left-[-10%] lg:left-[5%] w-[80vw] lg:w-[40vw] h-[80vw] lg:h-[40vw] rounded-full blur-[80px] lg:blur-[100px] pointer-events-none -z-10 transition-colors duration-1000 opacity-20 lg:opacity-20"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                />
                <div className="absolute bottom-[5%] right-[-10%] lg:right-[10%] w-[70vw] lg:w-[35vw] h-[70vw] lg:h-[35vw] bg-slate-300/40 rounded-full blur-[80px] lg:blur-[100px] pointer-events-none -z-10" />

                {/* HEADER */}
                <div className="text-center mb-10 md:mb-12 lg:mb-16 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/60 backdrop-blur-xl border border-slate-200 mb-4 md:mb-6 shadow-sm">
                        <Icons.Sparkles className="w-3 h-3 md:w-4 md:h-4" style={{ color: 'var(--primary-color)' }} />
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-700">
                            {t.badge}
                        </span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        // REVISI 3: Tipografi yang mengecil secara elegan di HP
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
                    >
                        {sectionTitle}
                    </motion.h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 items-start relative z-20">

                    {/* NAVIGATION TABS */}
                    {/* REVISI 4: Teknik Full-Bleed Scroll di HP menggunakan margin negatif (-mx-4) */}
                    <div className="w-full lg:w-4/12 flex flex-row lg:flex-col gap-3 md:gap-4 overflow-x-auto lg:overflow-visible pb-4 md:pb-6 lg:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {data.features.map((f, index) => {
                            const IconComponent = f.icon ? (Icons as any)[f.icon] : Icons.CheckCircle;
                            const isActive = activeTab === index;

                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={cn(
                                        "flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-2xl transition-all duration-500 text-left border-2 snap-center group overflow-hidden relative",
                                        // Lebar di HP (260px), Tablet (300px), Desktop (Full)
                                        "shrink-0 w-65 sm:w-75 lg:w-full lg:shrink",
                                        isActive
                                            ? "bg-white/70 backdrop-blur-xl border-slate-300 shadow-md lg:translate-x-2 scale-100"
                                            : "bg-white/30 backdrop-blur-md border-transparent hover:bg-white/50 hover:border-slate-200"
                                    )}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                                    )}

                                    <div
                                        className={cn(
                                            "p-2 md:p-2.5 rounded-xl transition-all duration-500 shadow-sm relative z-10 flex items-center justify-center shrink-0",
                                            isActive ? "scale-110 shadow-md border border-white/60" : "bg-slate-100 group-hover:bg-slate-200 text-slate-400"
                                        )}
                                        style={isActive ? { backgroundColor: 'var(--primary-color)', color: '#ffffff' } : {}}
                                    >
                                        <IconComponent className="w-5 h-5 md:w-5.5 md:h-5.5" strokeWidth={isActive ? 2.5 : 2} />
                                    </div>
                                    <span
                                        className={cn(
                                            "font-bold tracking-tight transition-colors duration-300 relative z-10 line-clamp-2",
                                            // Teks lebih proporsional di HP
                                            isActive ? "text-slate-900 text-base md:text-lg drop-shadow-sm" : "text-slate-500 text-sm md:text-base group-hover:text-slate-700"
                                        )}
                                    >
                                        {f.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* DISPLAY CONTENT: KARTU UTAMA */}
                    {/* REVISI 5: Mengamankan minimum height agar konten tidak tergencet di HP */}
                    <div className="flex-1 w-full min-h-100 md:min-h-112.5 lg:min-h-125 relative perspective-1000">

                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] h-[90%] md:h-[80%] rounded-full blur-[60px] md:blur-[80px] pointer-events-none -z-10 transition-colors duration-1000 opacity-20"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                        />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                // REVISI 6: Proporsi radius dan padding dieksekusi berdasarkan ukuran layar
                                className="bg-white/50 backdrop-blur-2xl rounded-3xl md:rounded-4xl lg:rounded-[2.5rem] p-6 md:p-8 lg:p-12 border border-slate-200/60 shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex flex-col gap-6 md:gap-8 h-full relative overflow-hidden group"
                            >
                                <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-white/60 blur-[50px] md:blur-[70px] rounded-full pointer-events-none" />
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                                        <div
                                            className="px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border shadow-sm border-white/80 backdrop-blur-md flex items-center gap-1.5 md:gap-2"
                                            style={{ backgroundColor: 'var(--primary-color)', color: '#ffffff' }}
                                        >
                                            <ActiveIconComponent className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                            {t.featureLabel} 0{activeTab + 1}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4 tracking-tight leading-[1.2] drop-shadow-sm">
                                        {activeFeature.title}
                                    </h2>
                                    <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl">
                                        {activeFeature.desc}
                                    </p>
                                </div>

                                <div className="relative mt-auto pt-2 md:pt-4 z-10">
                                    <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-2 md:border-4 border-white bg-slate-100 group/img aspect-video flex items-center justify-center">
                                        {activeFeature.mediaUrl ? (
                                            activeFeature.mediaType === 'video' ? (
                                                <video
                                                    src={activeFeature.mediaUrl}
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover/img:scale-105"
                                                />
                                            ) : (
                                                <img
                                                    src={activeFeature.mediaUrl}
                                                    alt={activeFeature.title}
                                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover/img:scale-105"
                                                    loading="lazy"
                                                />
                                            )
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-slate-400 opacity-60">
                                                <Icons.Image className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4" />
                                                <p className="font-medium text-xs md:text-sm">{t.emptyVisual}</p>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none rounded-2xl md:rounded-3xl" />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}