'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface FeatureItem {
    title: string;
    desc: string;
    icon?: string;
}

interface FeaturesBlockProps {
    data: {
        title?: string;
        features: FeatureItem[];
    };
}

export default function FeaturesBlock({ data }: FeaturesBlockProps) {
    const sectionTitle = data.title || "Keunggulan Fitur";

    return (
        <section className="relative py-24 w-full z-10 enterprise-container">
            {/* Header Section */}
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-(length:--fluid-h2) font-extrabold tracking-tight text-slate-900"
                >
                    {sectionTitle}
                </motion.h2>
                <div
                    className="w-24 h-1.5 mx-auto mt-6 rounded-full opacity-80"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                />
            </div>

            {/* Arsitektur Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 max-w-6xl mx-auto">
                {data.features?.map((feature, index) => {
                    const isLarge = index === 0;

                    // Mapping Ikon Dinamis
                    const IconComponent = feature.icon ? (Icons as any)[feature.icon] : Icons.CheckCircle;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                            className={`
                                glass-panel p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-white/50 backdrop-blur-xl
                                shadow-aura transition-all duration-500 group relative overflow-hidden
                                ${isLarge ? 'md:col-span-2 md:row-span-2 flex flex-col justify-end' : 'col-span-1 flex flex-col justify-between'}
                            `}
                        >
                            {/* Dekoratif Glow - Mengikuti --primary-color */}
                            <div
                                className="absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                                style={{ backgroundColor: 'var(--primary-color)' }}
                            />

                            <div className="relative z-10 h-full flex flex-col justify-end">
                                {/* Icon Wrapper Dinamis */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-transform duration-300 group-hover:scale-110"
                                    style={{
                                        backgroundColor: 'var(--primary-color)',
                                        color: '#ffffff'
                                    }}
                                >
                                    <IconComponent size={28} />
                                </div>

                                <h3 className={`font-extrabold text-slate-900 mb-4 tracking-tight ${isLarge ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                                    {feature.title}
                                </h3>

                                <p className={`text-slate-600 font-medium leading-relaxed ${isLarge ? 'text-lg md:text-xl' : 'text-base'}`}>
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}