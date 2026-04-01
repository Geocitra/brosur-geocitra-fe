'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircleQuestion } from 'lucide-react';
import { cn } from '@/app/lib/utils';

// 1. Definisi Kontrak Data (Strict Interface)
interface FaqItem {
    q: string;
    a: string;
}

interface FaqData {
    title?: string;
    items?: FaqItem[];
}

interface FaqBlockProps {
    data: FaqData;
}

export default function FaqBlock({ data }: FaqBlockProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Defensive rendering jika tidak ada item FAQ
    if (!data?.items || data.items.length === 0) return null;

    return (
        // Menggunakan bg-slate-50 agar area FAQ terasa sebagai fondasi/penutup yang solid
        <section className="py-20 lg:py-32 bg-slate-50 relative z-10 border-t border-slate-200">
            <div className="enterprise-container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* LENGAN KIRI: Area Konteks & Bantuan */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            {/* Eyebrow / Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                                <MessageCircleQuestion size={16} style={{ color: 'var(--primary-color)' }} />
                                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                                    Pusat Bantuan
                                </span>
                            </div>

                            {/* Main Headline */}
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-[1.1]">
                                {data.title || 'Pertanyaan Umum'}
                            </h2>

                            {/* Copywriting Pendukung */}
                            <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8 max-w-md">
                                Temukan jawaban cepat untuk pertanyaan yang paling sering diajukan mengenai sistem, implementasi, dan layanan kami.
                            </p>

                            {/* Dekorasi Visual: Kotak aksen warna primer untuk menegaskan identitas */}
                            <div className="hidden lg:flex items-center gap-4">
                                <div
                                    className="w-16 h-1.5 rounded-full"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                />
                                <div
                                    className="w-4 h-1.5 rounded-full opacity-50"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* LENGAN KANAN: Akordion FAQ (Solid Cards) */}
                    <div className="lg:col-span-7 space-y-4">
                        {data.items.map((item, idx) => {
                            const isActive = activeIndex === idx;

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className={cn(
                                        // Menghapus glass-panel, beralih ke desain kartu (Card Design) murni
                                        "overflow-hidden rounded-2xl transition-all duration-300 bg-white",
                                        isActive
                                            ? "shadow-[0_15px_30px_rgba(0,0,0,0.08)] ring-1"
                                            : "border border-slate-200 hover:border-slate-300 shadow-sm"
                                    )}
                                    // Inject dynamic ring color menggunakan primary-color jika aktif
                                    style={isActive ? { boxShadow: '0 0 0 2px var(--primary-color), 0 15px 30px -5px rgba(0,0,0,0.1)' } : {}}
                                >
                                    <button
                                        onClick={() => setActiveIndex(isActive ? null : idx)}
                                        className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group cursor-pointer"
                                    >
                                        {/* Pertanyaan */}
                                        <span
                                            className={cn(
                                                "text-lg md:text-xl font-bold transition-colors duration-300 pr-6",
                                                isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                                            )}
                                        >
                                            {item.q}
                                        </span>

                                        {/* Icon Plus/Minus: Tegas & Responsif */}
                                        <div
                                            className={cn(
                                                "w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 border",
                                                isActive
                                                    ? "text-white border-transparent rotate-180"
                                                    : "bg-slate-50 border-slate-200 text-slate-500 group-hover:bg-slate-100"
                                            )}
                                            style={isActive ? { backgroundColor: 'var(--primary-color)' } : {}}
                                        >
                                            {isActive ? <Minus size={20} /> : <Plus size={20} />}
                                        </div>
                                    </button>

                                    {/* Jawaban dengan Animasi Ketinggian */}
                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
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
            </div>
        </section>
    );
}