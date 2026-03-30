'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroBlock({ data }: { data: any }) {
    // Variabel Animasi Stagger (Muncul Berurutan)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                // [FIX TS] Mengunci array sebagai tuple 4 angka untuk Cubic Bezier Framer Motion
                ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
            }
        }
    };

    return (
        <section className="relative overflow-visible py-20 md:py-28 lg:py-36">
            <div className="enterprise-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                    {/* Left Side: Copywriting (Z-Pattern Start) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex flex-col text-center lg:text-left items-center lg:items-start z-10"
                    >
                        {/* Eyebrow / Label */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-sm text-sm font-extrabold tracking-widest uppercase"
                                style={{ color: 'var(--primary-color)' }}>
                                <span className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: 'var(--primary-color)' }} />
                                Ekosistem Geocitra
                            </span>
                        </motion.div>

                        {/* The Grand Headline 
                            [FIX TAILWIND] Mempertegas 'length:' agar tidak ambigu dengan warna teks 
                        */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-(length:--fluid-h1) font-extrabold tracking-tighter leading-[1.05] mb-6 text-transparent bg-clip-text"
                            style={{
                                backgroundImage: 'linear-gradient(to right bottom, color-mix(in srgb, var(--primary-color) 40%, #020617), color-mix(in srgb, var(--primary-color) 80%, #1e293b))'
                            }}
                        >
                            {data.title}
                        </motion.h1>

                        {/* Description 
                            [FIX TAILWIND] Mempertegas 'length:' agar tidak bertabrakan dengan text-slate-600
                        */}
                        <motion.p
                            variants={itemVariants}
                            className="text-(length:--fluid-p) leading-relaxed max-w-xl mb-10 text-slate-600 font-medium"
                        >
                            {data.description}
                        </motion.p>

                        {/* The Breathing CTA */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            {/* [FIX TAILWIND] Mengubah min-h-[56px] menjadi min-h-14 */}
                            <button
                                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white shadow-aura transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden min-h-14"
                                style={{ backgroundColor: 'var(--primary-color)' }}
                            >
                                <span className="relative z-10">Jelajahi Arsitektur</span>
                                <ArrowRight size={20} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

                                <div className="absolute inset-0 w-full h-full bg-white/20 scale-0 rounded-full transition-transform duration-500 group-hover:scale-150 origin-center" />
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: The Visual Anchor (Floating 3D Mockup) */}
                    {data.imageUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative w-full max-w-2xl mx-auto perspective-[2000px]"
                        >
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-[80px] opacity-30 -z-10 mix-blend-multiply"
                                style={{ background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)' }}
                            />

                            {/* [FIX TAILWIND] Mengubah rounded-[2.5rem] menjadi rounded-4xl jika memungkinkan, atau tetap mempertahankan presisi 2.5rem jika standar tailwind belum mengcover. Di sini kita gunakan rounded-4xl */}
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    rotateX: [0, 2, 0],
                                    rotateY: [-2, 0, -2]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative z-10 rounded-3xl md:rounded-4xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] glass-panel border border-white/60 group"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={data.imageUrl}
                                    alt={data.title}
                                    className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                                />

                                {/* [FIX TAILWIND] Mengubah bg-gradient-to-tr menjadi bg-linear-to-tr */}
                                <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-white/20 to-transparent pointer-events-none mix-blend-overlay" />
                            </motion.div>
                        </motion.div>
                    )}

                </div>
            </div>
        </section>
    );
}