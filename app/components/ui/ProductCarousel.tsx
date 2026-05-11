'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
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

            <div className="relative w-full h-full flex items-center justify-center px-4 md:px-0">
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
                        {/* DECORATION CARDS BEHIND */}
                        <div
                            className="absolute w-[82%] h-[82%] rounded-[2.5rem] md:rounded-[3rem] bg-slate-200 shadow-2xl border border-white/50 overflow-hidden -rotate-3 -translate-x-10 translate-y-4 opacity-40 transition-all duration-700"
                        >
                            <Image
                                src={getProductImage(items[(imageIndex + 1) % items.length].slug)}
                                alt="next" fill className="object-cover grayscale"
                            />
                        </div>

                        <div
                            className="absolute w-[82%] h-[82%] rounded-[2.5rem] md:rounded-[3rem] bg-slate-100 shadow-2xl border border-white/50 overflow-hidden rotate-6 translate-x-8 -translate-y-6 opacity-30 transition-all duration-700"
                        >
                            <Image
                                src={getProductImage(items[(imageIndex + 2) % items.length].slug)}
                                alt="prev" fill className="object-cover grayscale"
                            />
                        </div>

                        {/* MAIN ACTIVE CARD */}
                        <div className="relative w-[92%] h-[90%] bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-4 border-white">
                            <Image
                                src={getProductImage(items[imageIndex].slug)}
                                alt={items[imageIndex].name}
                                fill
                                className="object-cover select-none"
                                priority
                                unoptimized
                            />

                            {/* LOGICAL FIX: REDUCED GRADIENT OVERLAY */}
                            {/* Gradien diperpendek (hanya 40% dari bawah) agar gambar lebih terlihat jelas */}
                            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent p-8 md:p-14 flex flex-col justify-end pointer-events-none">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                                    className="max-w-md pointer-events-auto"
                                >
                                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                                        <div className="w-8 md:w-10 h-1 rounded-full bg-(--primary-color) shadow-[0_0_10px_var(--primary-color)]" />
                                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/80">
                                            Premium Showcase
                                        </span>
                                    </div>

                                    <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-3 md:mb-4 leading-none">
                                        {items[imageIndex].name}
                                    </h3>

                                    {/* LOGICAL FIX: CLAMPED TAGLINE */}
                                    <p className="text-slate-300 font-bold text-base md:text-lg mb-8 line-clamp-1 md:line-clamp-2 leading-relaxed">
                                        {items[imageIndex].tagline}
                                    </p>

                                    {/* LOGICAL FIX: FLOATING ACTION BUTTON */}
                                    <Link
                                        href={`/${items[imageIndex].slug}`}
                                        className="inline-flex items-center gap-2 bg-(--primary-color) hover:bg-sky-400 text-white px-7 py-4 rounded-xl font-bold uppercase tracking-wider text-[10px] md:text-xs shadow-[0_15px_30px_-5px_color-mix(in_srgb,var(--primary-color)_50%,transparent)] transition-all active:scale-95 w-fit border border-white/10"
                                    >
                                        Buka Brosur
                                        <ArrowRight size={16} strokeWidth={3} />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* UNIFIED COMMAND CENTER */}
            <div className="flex items-center gap-6 mt-12 md:mt-16 z-20">
                <button
                    onClick={() => paginate(-1)}
                    className="p-2.5 rounded-xl border border-slate-200 md:border-slate-800 bg-white md:bg-slate-900/50 text-slate-400 hover:bg-(--primary-color) hover:text-white transition-all active:scale-95 shadow-sm"
                    aria-label="Previous"
                >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                </button>

                <div className="flex items-center gap-3">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-700",
                                imageIndex === i
                                    ? "w-10 bg-(--primary-color) shadow-[0_0_10px_var(--primary-color)]"
                                    : "w-2 bg-slate-300 md:bg-slate-800"
                            )}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => paginate(1)}
                    className="p-2.5 rounded-xl border border-slate-200 md:border-slate-800 bg-white md:bg-slate-900/50 text-slate-400 hover:bg-(--primary-color) hover:text-white transition-all active:scale-95 shadow-sm"
                    aria-label="Next"
                >
                    <ChevronRight size={20} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}