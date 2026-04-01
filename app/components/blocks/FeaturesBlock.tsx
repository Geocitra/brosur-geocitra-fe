'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Utility function untuk menggabungkan class (pengganti cn jika tidak ada)
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

export default function FeaturesBlock({ data }: FeaturesBlockProps) {
    const sectionTitle = data.title || "Keunggulan Fitur";
    const [activeTab, setActiveTab] = useState(0);

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
        <section className="py-20 relative z-10 overflow-hidden bg-slate-50" id="features">
            <div className="enterprise-container max-w-7xl mx-auto relative z-10">

                {/* THE SECRET SAUCE: Siluet warna di belakang agar efek Frosted Glass merespon */}
                <div
                    className="absolute top-[20%] left-[5%] w-[40vw] h-[40vw] rounded-full blur-[100px] pointer-events-none -z-10 transition-colors duration-1000 opacity-20"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                />
                <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-slate-300/40 rounded-full blur-[100px] pointer-events-none -z-10" />

                {/* HEADER */}
                <div className="text-center mb-16 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-3xl border border-slate-200 mb-6 shadow-sm">
                        <Icons.Sparkles className="w-4 h-4" style={{ color: 'var(--primary-color)' }} />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">Core Features</span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight"
                    >
                        {sectionTitle}
                    </motion.h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative z-20">

                    {/* NAVIGATION TABS (Mobile: Horizontal Snap, Desktop: Vertical List) */}
                    <div className="w-full lg:w-4/12 flex flex-row lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 no-scrollbar snap-x snap-mandatory">
                        {data.features.map((f, index) => {
                            const IconComponent = f.icon ? (Icons as any)[f.icon] : Icons.CheckCircle;
                            const isActive = activeTab === index;

                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={cn(
                                        "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 text-left border-2 snap-center group overflow-hidden relative",
                                        // KUNCI LOGIKA LAYOUT: 
                                        // Mobile: tidak boleh menyusut (shrink-0), lebar statis (w-[280px])
                                        // Desktop (lg): mengambil lebar parent penuh (lg:w-full), boleh menyesuaikan (lg:shrink)
                                        "shrink-0 w-[280px] md:w-[320px] lg:w-full lg:shrink",
                                        isActive
                                            ? "bg-white/60 backdrop-blur-3xl border-slate-300 shadow-lg lg:translate-x-3 scale-100"
                                            : "bg-white/20 backdrop-blur-md border-transparent hover:bg-white/40 hover:border-slate-200"
                                    )}
                                >
                                    {/* Grainy Noise untuk tab aktif */}
                                    {isActive && (
                                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                                    )}

                                    <div
                                        className={cn(
                                            "p-2.5 rounded-xl transition-all duration-500 shadow-sm relative z-10 flex items-center justify-center shrink-0",
                                            isActive ? "scale-110 shadow-md border border-white/60" : "bg-slate-100 group-hover:bg-slate-200 text-slate-400"
                                        )}
                                        style={isActive ? { backgroundColor: 'var(--primary-color)', color: '#ffffff' } : {}}
                                    >
                                        <IconComponent size={22} strokeWidth={isActive ? 2.5 : 2} />
                                    </div>
                                    <span
                                        className={cn(
                                            "font-bold tracking-tight transition-colors duration-300 relative z-10 line-clamp-2",
                                            isActive ? "text-slate-900 text-lg drop-shadow-sm" : "text-slate-500 group-hover:text-slate-700"
                                        )}
                                    >
                                        {f.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* DISPLAY CONTENT: KARTU UTAMA */}
                    <div className="flex-1 w-full min-h-[500px] relative perspective-1000">

                        {/* Blob cahaya spesifik di belakang kartu konten */}
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[80px] pointer-events-none -z-10 transition-colors duration-1000 opacity-20"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                        />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-8 lg:p-12 border border-slate-200/60 shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col gap-8 h-full relative overflow-hidden group"
                            >
                                {/* Pendar Cahaya Internal Kaca */}
                                <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-white/60 blur-[70px] rounded-full pointer-events-none" />

                                {/* Tekstur Kaca Film */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div
                                            className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border shadow-sm border-white/80 backdrop-blur-md flex items-center gap-2"
                                            style={{ backgroundColor: 'var(--primary-color)', color: '#ffffff' }}
                                        >
                                            <ActiveIconComponent size={14} />
                                            Fitur 0{activeTab + 1}
                                        </div>
                                    </div>

                                    <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight leading-[1.2] drop-shadow-sm">
                                        {activeFeature.title}
                                    </h2>
                                    <p className="text-lg text-slate-700 leading-relaxed font-medium max-w-2xl">
                                        {activeFeature.desc}
                                    </p>
                                </div>

                                <div className="relative mt-auto pt-4 z-10">
                                    {/* Frame gambar tebal */}
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group/img aspect-video flex items-center justify-center">
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
                                                <Icons.Image size={48} className="mb-4" />
                                                <p className="font-medium">Visualisasi belum tersedia</p>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none rounded-3xl" />
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