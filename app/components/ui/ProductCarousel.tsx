'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, LayoutGrid, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 600 : -600,
        opacity: 0,
        scale: 0.8,
        rotate: direction > 0 ? 15 : -15,
    }),
    center: {
        zIndex: 10,
        x: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 600 : -600,
        opacity: 0,
        scale: 0.8,
        rotate: direction < 0 ? 15 : -15,
    }),
};

export default function ProductCarousel({ items }: { items: any[] }) {
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = Math.abs(page % items.length);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const getProductImage = (slug: string) => `/assets/${slug}-mockup.png`;

    const scrollToGrid = () => {
        const gridElement = document.getElementById('catalog-grid');
        if (gridElement) gridElement.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative w-full h-[550px] md:h-[650px] flex flex-col items-center group perspective-1000">

            <div className="relative w-full h-full flex items-center justify-center">

                {/* Navigasi Manual Kiri */}
                <button
                    className="absolute -left-8 md:-left-20 z-50 p-5 rounded-full bg-white shadow-2xl border border-slate-100 text-slate-900 hover:bg-[var(--primary-color)] hover:text-white transition-all active:scale-90 opacity-0 group-hover:opacity-100 hidden md:block"
                    onClick={() => paginate(-1)}
                >
                    <ChevronLeft size={32} />
                </button>

                <div className="relative w-full h-full flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 200, damping: 25 },
                                opacity: { duration: 0.3 },
                                rotate: { duration: 0.5 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = Math.abs(offset.x) * velocity.x;
                                if (swipe < -10000) paginate(1);
                                else if (swipe > 10000) paginate(-1);
                            }}
                            className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                        >
                            {/* THE SHUFFLE STACK DECORATION (Cards Behind) */}
                            {/* Kartu Belakang 1 */}
                            <div
                                className="absolute w-[85%] h-[85%] rounded-[3rem] bg-slate-200 shadow-2xl border border-white/50 overflow-hidden -rotate-6 -translate-x-12 translate-y-4 opacity-40"
                            >
                                <Image
                                    src={getProductImage(items[(imageIndex + 1) % items.length].slug)}
                                    alt="next" fill className="object-cover grayscale"
                                />
                            </div>

                            {/* Kartu Belakang 2 */}
                            <div
                                className="absolute w-[85%] h-[85%] rounded-[3rem] bg-slate-100 shadow-2xl border border-white/50 overflow-hidden rotate-12 translate-x-10 -translate-y-6 opacity-30"
                            >
                                <Image
                                    src={getProductImage(items[(imageIndex + 2) % items.length].slug)}
                                    alt="prev" fill className="object-cover grayscale"
                                />
                            </div>

                            {/* MAIN ACTIVE CARD (Front) */}
                            <div className="relative w-[90%] h-[90%] bg-white rounded-[3rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.6)] border-4 border-white">
                                <Image
                                    src={getProductImage(items[imageIndex].slug)}
                                    alt={items[imageIndex].name}
                                    fill
                                    className="object-cover select-none"
                                    priority
                                    unoptimized
                                />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent p-10 md:p-14 flex flex-col justify-end">
                                    <motion.div
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="max-w-md"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-1.5 rounded-full bg-[var(--primary-color)] shadow-[0_0_15px_var(--primary-color)]" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">
                                                Premium Showcase
                                            </span>
                                        </div>

                                        <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-none">
                                            {items[imageIndex].name}
                                        </h3>
                                        <p className="text-slate-300 font-bold text-lg mb-10 line-clamp-2 leading-relaxed">
                                            {items[imageIndex].tagline}
                                        </p>

                                        <div className="flex gap-5">
                                            <button
                                                onClick={scrollToGrid}
                                                className="bg-[var(--primary-color)] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.5)] active:scale-95"
                                            >
                                                Katalog Utama
                                            </button>
                                            
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigasi Manual Kanan */}
                <button
                    className="absolute -right-8 md:-right-20 z-50 p-5 rounded-full bg-white shadow-2xl border border-slate-100 text-slate-900 hover:bg-[var(--primary-color)] hover:text-white transition-all active:scale-90 opacity-0 group-hover:opacity-100 hidden md:block"
                    onClick={() => paginate(1)}
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Pagination Style Baru: Progress Line */}
            <div className="flex gap-4 mt-16">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
                        className={cn(
                            "h-2 rounded-full transition-all duration-700",
                            imageIndex === i ? "w-20 bg-[var(--primary-color)] shadow-[0_0_15px_var(--primary-color)]" : "w-4 bg-slate-800 hover:bg-slate-700"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}