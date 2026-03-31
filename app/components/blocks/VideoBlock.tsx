'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function VideoBlock({ data }: { data: any }) {
    if (!data.videoUrl) return null;

    return (
        <section className="relative py-24 w-full z-10 enterprise-container overflow-visible">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-5xl mx-auto"
            >
                {/* AMBIENT GLOW BEHIND VIDEO
                    [FIX] Menggunakan pendaran warna dinamis agar video tidak terlihat 'flat'
                */}
                <div
                    className="absolute -inset-4 md:-inset-10 rounded-[2.5rem] blur-[80px] opacity-20 -z-10"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                />

                {/* VIDEO CONTAINER 
                    Menggunakan Glassmorphism border dan Shadow Aura
                */}
                <div className="relative aspect-video glass-panel rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-aura border border-white/40">

                    {/* Overlay dekoratif tipis untuk kesan glossy */}
                    <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-transparent to-white/10 pointer-events-none z-10" />

                    <iframe
                        className="relative z-0 w-full h-full"
                        src={`${data.videoUrl}${data.videoUrl.includes('?') ? '&' : '?'}rel=0&modestbranding=1&showinfo=0`}
                        title={data.title || "Video Presentation"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* DEKORASI LABEL BAWAH 
                    Menambahkan identitas warna produk di bawah video
                */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 px-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                        >
                            <Play size={18} fill="currentColor" />
                        </div>
                        <p className="font-extrabold text-slate-800 tracking-tight text-lg">
                            {data.title || "Video Demonstrasi Produk"}
                        </p>
                    </div>

                    <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                        Geocitra Interactive Showcase
                    </span>
                </div>
            </motion.div>
        </section>
    );
}