'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Rocket, FileText, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import ContactModal from '../ui/ContactModal';

// LOGICAL UPDATE: Teks disesuaikan persis dengan Halaman 4 Dokumen PDF
const academyFeatures = [
    {
        icon: <Target className="w-6 h-6 text-emerald-600" />,
        title: "Project-Based Learning",
        description: "Belajar dengan membangun aplikasi nyata yang dapat langsung digunakan."
    },
    {
        icon: <Users className="w-6 h-6 text-emerald-600" />,
        title: "Industry Mentorship",
        description: "Dibimbing langsung oleh developer aktif yang berpengalaman di industri."
    },
    {
        icon: <Rocket className="w-6 h-6 text-emerald-600" />,
        title: "Outcome-Oriented",
        description: "Hasil berupa aplikasi & portfolio digital siap pakai."
    }
];

export default function AcademyBlock() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <section className="relative py-28 bg-white overflow-hidden">
            {/* LAYER BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-linear-to-bl from-emerald-50/80 via-green-50/40 to-transparent rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-linear-to-tr from-slate-50 to-transparent rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
            </div>

            <div className="enterprise-container relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    {/* KOLOM KIRI - Value Proposition & Copywriting */}
                    <div className="lg:col-span-7 space-y-10">

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full border border-emerald-100 shadow-[0_4px_20px_-4px_rgba(16,185,129,0.15)]"
                        >
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                                <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
                            </div>
                            <span className="text-sm font-bold text-emerald-800 uppercase tracking-widest">XGreen Dev Academy</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-slate-950 leading-[1.1] tracking-tight"
                        >
                            Learning by <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-400">
                                Building Real Apps.
                            </span>
                        </motion.h2>

                        {/* LOGICAL UPDATE: Disesuaikan dengan Halaman 2 & 3 PDF (Latar Belakang & Tujuan) */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed font-medium"
                        >
                            Menjembatani kesenjangan kompetensi lulusan dengan standar industri. Kami mencetak talenta IT siap kerja melalui pelatihan berbasis praktik langsung, bukan sekadar teori.
                        </motion.p>

                        {/* Features Grid */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100"
                        >
                            {academyFeatures.map((feature, index) => (
                                <div key={index} className="group flex flex-col gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <div className="text-emerald-600 group-hover:text-white transition-colors">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-5 pt-6"
                        >
                            <a
                                href="/preview/xgreen-dev-academy.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-full text-base font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto group"
                            >
                                <FileText className="w-5 h-5 text-emerald-400 group-hover:animate-bounce" />
                                Lihat Pdf
                            </a>

                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-emerald-700 rounded-full text-base font-bold border-2 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto group cursor-pointer"
                            >
                                Daftar Batch Sekarang
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </div>

                    {/* KOLOM KANAN - Dynamic Photo Gallery & Proof */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
                        className="lg:col-span-5 relative hidden lg:block"
                    >
                        <div className="relative w-full aspect-[4/5] mx-auto max-w-md group">

                            {/* Accent Background Card */}
                            <div className="absolute inset-0 bg-linear-to-tr from-emerald-500 to-teal-400 rounded-[2.5rem] rotate-3 scale-105 group-hover:rotate-6 transition-transform duration-500 opacity-90 shadow-2xl shadow-emerald-500/20" />

                            {/* Main Image Frame (Memanfaatkan WhatsApp Image yang diupload) */}
                            <div className="relative h-full w-full rounded-[2rem] overflow-hidden border-8 border-white bg-slate-100 z-10 shadow-lg flex items-center justify-center">
                                {/* Ganti /assets/academy-photo.jpeg dengan path foto WhatsApp yang Anda simpan */}
                                <Image
                                    src="/assets/dev1.jpeg"
                                    alt="Suasana Mentoring XGreen Dev Academy"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Trust Badge 1 (Hasil/Outcome) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="absolute -left-12 top-16 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 z-20 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Lulusan</p>
                                    <p className="text-base font-extrabold text-slate-900">Talenta Siap Kerja</p>
                                </div>
                            </motion.div>

                            {/* Floating Trust Badge 2 (Kuota Eksklusif dari Hal 12 PDF) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                                className="absolute -right-8 bottom-24 bg-slate-950 p-4 rounded-2xl shadow-2xl border border-slate-800 z-20 flex items-center gap-4"
                            >
                                <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-slate-950 bg-emerald-500 text-white font-black text-lg">
                                    15
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Kuota Terbatas</p>
                                    <p className="text-xs text-emerald-400">Maksimal per Batch</p>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>

                </div>
            </div>
            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </section>
    );
}