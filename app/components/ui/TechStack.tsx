'use client';

import React, { useState, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { TECH_STACK_DATA, TechCategory, TechItem } from '@/app/lib/constants/tech-stack';

// --- SUB-COMPONENT 1: TECH ICON (Interactive Node) ---
const TechIcon = ({ tech, index }: { tech: TechItem; index: number }) => {
    const [isActive, setIsActive] = useState(false);

    // Physics-based mouse tracking untuk Tooltip
    const mouseX = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 300 };
    const springX = useSpring(mouseX, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
    };

    // LOGIKA MOSAIC: Offset vertikal dinamis (Rasi Bintang)
    const isEven = index % 2 === 0;

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setIsActive(!isActive)}
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0 }
                }}
                // REVISI 1: Ukuran Ikon & Amplitudo Stagger Responsif (Mengecil di HP, membesar di Desktop)
                className={cn(
                    "group/tech relative flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(14,165,233,0.15)] hover:border-sky-200 hover:bg-white transition-all duration-300 cursor-pointer",
                    "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16",
                    isEven ? '-translate-y-1 sm:-translate-y-2' : 'translate-y-1 sm:translate-y-2'
                )}
            >
                <div className="relative w-[75%] h-[75%] sm:w-[80%] sm:h-[80%] transition-transform duration-300 group-hover/tech:scale-110">
                    <Image
                        src={tech.iconPath}
                        alt={tech.name}
                        fill
                        sizes="(max-width: 640px) 36px, (max-width: 1024px) 48px, 64px"
                        className="object-contain drop-shadow-sm"
                    />
                </div>
            </motion.div>

            {/* Smart Floating Tooltip */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            x: springX,
                            top: -45,
                            left: '50%',
                            translateX: '-50%'
                        }}
                        className="absolute z-50 pointer-events-none"
                    >
                        <div className="bg-slate-800/95 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap border border-slate-700">
                            {tech.name}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800/95 border-r border-b border-slate-700 rotate-45" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- SUB-COMPONENT 2: CATEGORY CARD ---
const TechCategoryCard = ({ category, index, coreTechLabel }: { category: TechCategory, index: number, coreTechLabel: string }) => {
    const Icon = category.icon;
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        const { currentTarget, clientX, clientY } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            // REVISI 2: Padding internal dikurangi secara bertahap agar tidak sesak di iPad (md:p-8, lg:p-10)
            className="group relative flex flex-col bg-white/60 backdrop-blur-2xl rounded-4xl lg:rounded-[2.5rem] border border-slate-200/60 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(14,165,233,0.15)] hover:border-slate-300 hover:-translate-y-1 overflow-hidden h-full min-h-70 lg:min-h-80"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-4xl lg:rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            rgba(14, 165, 233, 0.08),
                            transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative z-10 mb-6 lg:mb-8 flex items-center gap-4 lg:gap-5">
                <div className="inline-flex p-3 lg:p-3.5 bg-slate-100/80 text-slate-700 rounded-xl lg:rounded-2xl border border-slate-200 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-500/20 group-hover:-rotate-3 transition-all duration-500 shrink-0">
                    <Icon className="w-5 h-5 lg:w-6.5 lg:h-6.5" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors duration-300">
                    {category.title}
                </h3>
            </div>

            <div className="relative z-10 mt-auto grow flex flex-col justify-center">
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: index * 0.1 + 0.2 } }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    // REVISI 3: Gap mosaik fleksibel. Lebih rapat di HP/Tablet agar wrapping tetap rapi, merenggang di Desktop.
                    className="flex flex-wrap justify-center content-center gap-x-3 gap-y-5 sm:gap-x-4 sm:gap-y-6 lg:gap-x-5 lg:gap-y-8 py-4 lg:py-6"
                >
                    {category.items.map((tech, i) => (
                        <TechIcon key={tech.name} tech={tech} index={i} />
                    ))}
                </motion.div>
            </div>

            <div className="mt-6 lg:mt-8 pt-5 lg:pt-6 border-t border-slate-100/80 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                <span className="text-[9px] sm:text-[10.5px] font-black uppercase tracking-widest text-slate-400">
                    {category.items.length} {coreTechLabel}
                </span>
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-300 group-hover:bg-sky-400 transition-colors duration-300 shadow-sm" />
            </div>
        </motion.div>
    );
};

// Utility function untuk join classes
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- MAIN COMPONENT ---
export default function TechStack() {
    const pathname = usePathname() || '';
    const isEnglish = pathname === '/en' || pathname.endsWith('-en');

    const t = {
        badge: isEnglish ? "OUR EXPERTISE" : "KEAHLIAN KAMI",
        titleLine1: isEnglish ? "Integrated Technologies for" : "Teknologi untuk",
        titleLine2: isEnglish ? "Digital Solutions" : "Solusi Digital",
        description: isEnglish
            ? "As an IT service provider, we integrate the latest technology into every software development. From microservices architecture to responsive interfaces, we ensure your business runs on a solid technological foundation."
            : "Sebagai penyedia layanan IT, kami mengintegrasikan teknologi terbaru dalam setiap pengembangan perangkat lunak. Mulai dari arsitektur mikroservis hingga antarmuka yang responsif, kami memastikan bisnis Anda berjalan di atas fondasi teknologi yang solid.",
        coreTech: isEnglish ? "Core Technologies" : "Teknologi Inti"
    };

    return (
        // REVISI 4: Skalabilitas ruang vertikal (Padding section beradaptasi)
        <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-[#f8fafc] overflow-hidden" id="tech-stack">
            <div
                className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                }}
            />

            <div className="enterprise-container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 rounded-full bg-sky-50 border border-sky-100 shadow-sm"
                    >
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-sky-600">
                            {t.badge}
                        </span>
                    </motion.div>

                    {/* REVISI 5: Tipografi dinamis yang tidak merobek kontainer di layar HP */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-4 sm:mb-6 lg:mb-8 leading-[1.15]">
                        {t.titleLine1} <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-500 to-indigo-600">
                            {t.titleLine2}
                        </span>
                    </h2>

                    <p className="text-slate-600 max-w-4xl mx-auto text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed px-2 sm:px-0">
                        {t.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 xl:gap-8 auto-rows-fr">
                    {TECH_STACK_DATA.map((category, idx) => (
                        <TechCategoryCard
                            key={category.title}
                            category={category as TechCategory}
                            index={idx}
                            coreTechLabel={t.coreTech}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}