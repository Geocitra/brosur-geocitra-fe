'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TECH_STACK_DATA } from '@/app/lib/constants/tech-stack';

export default function TechStack() {
    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="enterprise-container">
                {/* HEADER SECTION DENGAN NARASI BARU */}
                <div className="text-center mb-16 md:mb-20">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12 bg-slate-300" />
                        <span className="text-sm font-black uppercase tracking-widest text-slate-500">
                            Our Expertise & Ecosystem
                        </span>
                        <div className="h-px w-12 bg-slate-300" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        Arsitektur Teknologi <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#10b981]">
                            Skala Enterprise
                        </span>
                    </h2>
                    <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Sistem kami dikembangkan menggunakan instrumen teknologi modern berkinerja tinggi. Mengintegrasikan keandalan web, fleksibilitas mobile, hingga ketangguhan pemrosesan data spasial untuk menjawab kebutuhan digitalisasi klien.
                    </p>
                </div>

                {/* GRID KATEGORI TEKNOLOGI */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
                    {TECH_STACK_DATA.map((category, idx) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                                className="flex flex-col bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 transition-all duration-300"
                            >
                                {/* Header Kategori */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-slate-50 text-[#0ea5e9] rounded-2xl border border-slate-100 shadow-inner">
                                        <Icon size={26} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-lg font-black tracking-tight text-slate-900">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* List Logo Teknologi - Render Flex Wrap */}
                                <div className="flex flex-wrap gap-3">
                                    {category.items.map((tech) => (
                                        <div
                                            key={tech.name}
                                            className="group relative flex items-center justify-center w-[4.5rem] h-[4.5rem] bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-[#0ea5e9]/30 hover:bg-white transition-all duration-300 cursor-default"
                                        >
                                            {/* Image Wrapper untuk proporsi yang konsisten */}
                                            <div className="relative w-9 h-9 transition-transform duration-300 group-hover:scale-110">
                                                <Image
                                                    src={tech.iconPath}
                                                    alt={`${tech.name} Logo`}
                                                    fill
                                                    sizes="36px"
                                                    className="object-contain drop-shadow-sm"
                                                // Kita tidak menggunakan grayscale karena gambar png yang Anda unduh 
                                                // biasanya sudah memiliki warna identitas brand yang spesifik
                                                />
                                            </div>

                                            {/* Tooltip Hover presisi tinggi */}
                                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none z-20">
                                                <span className="relative flex items-center justify-center text-[10px] font-bold text-white bg-slate-800 px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                                                    {tech.name}
                                                    {/* Segitiga bawah tooltip */}
                                                    <svg className="absolute text-slate-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
                                                        <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}