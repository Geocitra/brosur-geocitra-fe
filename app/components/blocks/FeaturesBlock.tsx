'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Asumsi struktur data block Anda
interface FeaturesBlockProps {
    data: {
        title: string;
        features: Array<{ title: string; description: string; icon?: string }>;
    };
}

export default function FeaturesBlock({ data }: FeaturesBlockProps) {
    return (
        // Memastikan wrapper relative untuk referensi scroll animasi
        <section className="relative py-24 w-full z-10">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-4xl md:text-5xl font-bold tracking-tight"
                >
                    {data.title || "Keunggulan Fitur"}
                </motion.h2>
                <div className="w-24 h-1.5 bg-(--primary-color) mx-auto mt-6 rounded-full opacity-80" />
            </div>

            {/* Arsitektur Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 max-w-6xl mx-auto">
                {data.features.map((feature, index) => {
                    // Logika asimetris: Item pertama dibuat besar (span 2 kolom atau baris tergantung desain)
                    const isLarge = index === 0;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`
                glass-panel p-8 rounded-3xl border border-white/50 backdrop-blur-xl
                hover:shadow-[0_20px_40px_rgba(var(--color-primary),0.15)] 
                transition-all duration-500 group relative overflow-hidden
                ${isLarge ? 'md:col-span-2 md:row-span-2' : 'col-span-1'}
              `}
                        >
                            {/* Elemen Dekoratif Hover (Glow muncul saat di-hover) */}
                            <div className="absolute -right-20 -top-20 w-40 h-40 bg-(--primary-color) rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700" />

                            <div className="relative z-10 h-full flex flex-col justify-end">
                                <div className="w-14 h-14 rounded-2xl bg-(--primary-color)/10 text-(--primary-color) flex items-center justify-center mb-6 border border-(--primary-color)/20">
                                    {/* Render icon jika ada, atau gunakan inisial/svg default */}
                                    <span className="text-2xl font-bold">{feature.title.charAt(0)}</span>
                                </div>
                                <h3 className={`font-bold text-slate-800 mb-3 ${isLarge ? 'text-3xl' : 'text-xl'}`}>
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}