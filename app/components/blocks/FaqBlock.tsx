'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { cn } from '@/app/lib/utils';

export default function FaqBlock({ data }: { data: any }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-transparent relative z-10">
            <div className="enterprise-container max-w-4xl">
                <div className="text-center mb-16">
                    {/* [FIX] Icon Header - Sadar Warna */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 shadow-aura"
                        style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }}
                    >
                        <HelpCircle size={32} />
                    </motion.div>
                    <h2 className="text-(length:--fluid-h2) font-extrabold tracking-tight text-slate-900">
                        {data.title || 'Pertanyaan Umum'}
                    </h2>
                </div>

                <div className="space-y-4">
                    {data.items?.map((item: any, idx: number) => {
                        const isActive = activeIndex === idx;

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className={cn(
                                    "overflow-hidden rounded-2xl transition-all duration-500 glass-panel",
                                    isActive
                                        ? "border-transparent"
                                        : "border border-white/60 hover:border-white"
                                )}
                                style={{
                                    // [FIX] Glow dinamis menggunakan inline style agar akurat
                                    boxShadow: isActive
                                        ? '0 0 0 2px var(--primary-color), 0 12px 40px -12px color-mix(in srgb, var(--primary-color) 40%, transparent)'
                                        : undefined
                                }}
                            >
                                <button
                                    onClick={() => setActiveIndex(isActive ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
                                >
                                    {/* [FIX] Judul FAQ - Sadar Warna saat Aktif */}
                                    <span
                                        className={cn(
                                            "text-lg md:text-xl font-extrabold transition-colors duration-300",
                                            isActive ? "" : "text-slate-700 group-hover:text-slate-900"
                                        )}
                                        style={isActive ? { color: 'var(--primary-color)' } : {}}
                                    >
                                        {item.q}
                                    </span>

                                    {/* [FIX] Icon Bulat Plus/Minus - Sadar Warna */}
                                    <div
                                        className={cn(
                                            "w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-500",
                                            isActive ? "text-white rotate-180" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                                        )}
                                        style={isActive ? { backgroundColor: 'var(--primary-color)' } : {}}
                                    >
                                        {isActive ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                                        >
                                            <div className="px-6 md:px-8 pb-8 text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                                                {item.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}