'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

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
    if (!data?.items || data.items.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-amber-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block"
                    >
                        {data.subtitle || "Keunggulan Sistem"}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
                    >
                        {data.title || "Mengapa Instansi Memilih DigiArch?"}
                    </motion.h2>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    {data.items.map((item, index) => {
                        // Dinamis memanggil icon dari Lucide
                        const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.CheckCircle;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-600 transition-all duration-300">
                                    <IconComponent className="w-7 h-7 text-amber-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                                    {item.title}
                                </h4>
                                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                    {item.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}