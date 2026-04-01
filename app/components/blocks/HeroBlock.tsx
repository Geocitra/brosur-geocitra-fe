'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PdfDrawer from '../ui/PdfDrawer';

// 1. Definisi antarmuka kontrak data yang ketat (Strict Interface)
interface HeroData {
    title: string;
    description: string;
    imageUrl?: string;
    fileUrl?: string;     // URL file brosur/PDF yang didapat dari payload JSON
    buttonText?: string;  // Teks CTA opsional dari backend
}

interface HeroBlockProps {
    data: HeroData;
}

export default function HeroBlock({ data }: HeroBlockProps) {
    // 2. State management untuk mengontrol Drawer
    const [isPdfOpen, setIsPdfOpen] = useState(false);

    // Variabel Animasi
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
                ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
            }
        }
    };

    // 3. Ekstraksi Data Aman
    const targetUrl = data.fileUrl || '';
    const ctaText = data.buttonText || 'Lihat Presentasi';

    return (
        // Wrapper utama diubah menjadi bg-white bersih untuk kontras tinggi.
        // overflow-x-clip sangat penting agar efek "bleeding edge" tidak membuat layar bisa di-scroll ke kanan (horizontal scroll issue).
        <section className="relative w-full overflow-x-clip bg-white pt-24 pb-16 lg:pt-36 lg:pb-32 min-h-[90vh] flex items-center">

            {/* THE MONOLITH: Identitas Warna Ekstrim (Responsive) */}
            {/* Mobile: Muncul dari bawah | Desktop: Memblokade area kanan layar */}
            <div
                className="absolute bottom-0 right-0 w-full h-[45%] md:h-[55%] lg:h-[85%] lg:top-[7.5%] lg:bottom-auto lg:w-[45vw] rounded-t-[3rem] lg:rounded-t-none lg:rounded-l-[5rem] -z-10 overflow-hidden"
                style={{ backgroundColor: 'var(--primary-color)' }}
            >
                {/* Overlay Premium: Memberikan tekstur pada warna solid agar tidak terlihat seperti template murah */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/20 mix-blend-overlay" />
                <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-[80px]" />
            </div>

            <div className="enterprise-container relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* LENGAN KIRI: Copywriting Area */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex flex-col text-center lg:text-left items-center lg:items-start z-20 lg:pr-10"
                    >
                        {/* Eyebrow Label - Tajam & Solid */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <span
                                className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-sm font-extrabold tracking-widest uppercase"
                                style={{ color: 'var(--primary-color)' }}
                            >
                                <span className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: 'var(--primary-color)' }} />
                                Ekosistem Geocitra
                            </span>
                        </motion.div>

                        {/* Headline: Tidak lagi pakai gradient kompleks, pure Black/Slate pekat agar kontras dengan warna primary */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-(length:--fluid-h1) font-black tracking-tighter leading-[1.05] mb-6 text-slate-900"
                        >
                            {data.title}
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-(length:--fluid-p) leading-relaxed max-w-xl mb-10 text-slate-600 font-medium"
                        >
                            {data.description}
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            {targetUrl ? (
                                <button
                                    onClick={() => setIsPdfOpen(true)}
                                    className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95 overflow-hidden min-h-14 cursor-pointer"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                >
                                    <span className="relative z-10">{ctaText}</span>
                                    <ArrowRight size={20} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                                    <div className="absolute inset-0 w-full h-full bg-white/20 scale-0 rounded-full transition-transform duration-500 group-hover:scale-150 origin-center" />
                                </button>
                            ) : (
                                <button
                                    onClick={() => alert("Dokumen brosur belum tersedia untuk produk ini.")}
                                    className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 opacity-50 cursor-not-allowed min-h-14"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                >
                                    <span className="relative z-10">{ctaText}</span>
                                    <ArrowRight size={20} className="relative z-10" />
                                </button>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* LENGAN KANAN: The Bleeding Edge Image */}
                    {data.imageUrl && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                            // INI KUNCI SKALA: Gambar memaksa ukurannya 130% dan tumpah ke margin kanan (-mr-30%)
                            className="relative w-[115%] -ml-[7.5%] md:w-[100%] md:ml-0 lg:w-[130%] lg:-mr-[30%] z-20 mt-10 lg:mt-0"
                        >
                            {/* Efek melayang organik (bukan 3D putar-putar yang pusing) */}
                            <motion.img
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                src={data.imageUrl}
                                alt={data.title}
                                // Menghilangkan glassmorphism, menggantinya dengan bayangan super tajam
                                className="w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)]"
                            />
                        </motion.div>
                    )}

                </div>
            </div>

            {/* 4. Injeksi Komponen PdfDrawer */}
            {targetUrl && (
                <PdfDrawer
                    isOpen={isPdfOpen}
                    onClose={() => setIsPdfOpen(false)}
                    fileUrl={targetUrl}
                    appName={data.title}
                />
            )}
        </section>
    );
}