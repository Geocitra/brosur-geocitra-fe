'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 450 : -450,
        opacity: 0,
        scale: 0.85,
        rotate: direction > 0 ? 8 : -8,
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
        x: direction < 0 ? 450 : -450,
        opacity: 0,
        scale: 0.85,
        rotate: direction < 0 ? 8 : -8,
    }),
};

export default function ProductCarousel({ items }: { items: any[] }) {
    if (!items || items.length === 0) return null;

    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = Math.abs(page % items.length);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const getProductImage = (slug: string) => `/assets/${slug}-mockup.png`;

    return (
        <div className="relative w-full h-137.5 md:h-162.5 flex flex-col items-center group perspective-1000">

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
                            x: { type: "spring", stiffness: 120, damping: 22, mass: 0.8 },
                            opacity: { duration: 0.4 },
                            rotate: { type: "spring", stiffness: 100, damping: 25 },
                            scale: { duration: 0.4 }
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
                            className="absolute w-[85%] h-[85%] rounded-[3rem] bg-slate-200 shadow-2xl border border-white/50 overflow-hidden -rotate-3 -translate-x-12 translate-y-4 opacity-40 transition-all duration-700"
                        >
                            <Image
                                src={getProductImage(items[(imageIndex + 1) % items.length].slug)}
                                alt="next" fill className="object-cover grayscale"
                            />
                        </div>

                        {/* Kartu Belakang 2 */}
                        <div
                            className="absolute w-[85%] h-[85%] rounded-[3rem] bg-slate-100 shadow-2xl border border-white/50 overflow-hidden rotate-6 translate-x-10 -translate-y-6 opacity-30 transition-all duration-700"
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
                            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent p-10 md:p-14 flex flex-col justify-end pointer-events-none">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                                    className="max-w-md pointer-events-auto"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-1.5 rounded-full bg-(--primary-color) shadow-[0_0_15px_var(--primary-color)]" />
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
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* UNIFIED COMMAND CENTER (Navigasi Menyatu di Bawah) */}
            <div className="flex items-center gap-6 mt-16 z-20">
                {/* Tombol Prev Minimalis */}
                <button
                    onClick={() => paginate(-1)}
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-(--primary-color) hover:text-white hover:border-(--primary-color) transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-(--primary-color)/50"
                    aria-label="Previous Showcase"
                >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                </button>

                {/* Garis Pagination */}
                <div className="flex items-center gap-3">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
                            className={cn(
                                "h-2 rounded-full transition-all duration-700 focus:outline-none",
                                imageIndex === i
                                    ? "w-16 bg-(--primary-color) shadow-[0_0_15px_var(--primary-color)]"
                                    : "w-3 bg-slate-800 hover:bg-slate-600"
                            )}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Tombol Next Minimalis */}
                <button
                    onClick={() => paginate(1)}
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-(--primary-color) hover:text-white hover:border-(--primary-color) transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-(--primary-color)/50"
                    aria-label="Next Showcase"
                >
                    <ChevronRight size={20} strokeWidth={2.5} />
                </button>
            </div>

        </div>
    );
}
