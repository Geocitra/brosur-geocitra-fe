'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 1. Definisi antarmuka kontrak data yang ketat (Strict Interface)
interface HeroData {
    title: string;
    description: string;
    imageUrl?: string;
    fileUrl?: string;
    buttonText?: string;
    demoUrl?: string;
    demoButtonText?: string;
}

interface HeroBlockProps {
    data: HeroData;
}

export default function HeroBlock({ data }: HeroBlockProps) {
    // 2. Inisialisasi Router untuk navigasi Next.js
    const router = useRouter();

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
                ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
            }
        }
    };

    // 3. Ekstraksi Data Aman (Defensive Assignment)
    const targetUrl = data.fileUrl || '';
    const ctaText = data.buttonText || 'Lihat Presentasi';
    const demoUrl = data.demoUrl || '';
    const demoCtaText = data.demoButtonText || 'Live Demo';

    // 4. Logika Ekstraksi Filename
    const fileName = targetUrl ? targetUrl.split('/').pop() : '';

    const handleNavigateToPreview = () => {
        if (fileName) {
            router.push(`/preview/${fileName}`);
        }
    };

    return (
        // REVISI 1: Penggunaan min-h-[100svh] untuk HP agar beradaptasi dengan UI Browser Dinamis, 
        // dan min-h-[90vh] di Desktop untuk rasio widescreen.
        <section className="relative w-full overflow-x-clip bg-white pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32 min-h-svh lg:min-h-[90vh] flex items-center">

            {/* THE MONOLITH: Identitas Warna Ekstrim (Responsive) */}
            {/* REVISI 2: Evolusi tinggi dan radius yang mulus dari Mobile -> Tablet -> Desktop */}
            <div
                className="absolute bottom-0 right-0 w-full h-[50%] md:h-[55%] lg:h-[85%] lg:top-[7.5%] lg:bottom-auto lg:w-[45vw] xl:w-[40vw] rounded-t-[2.5rem] md:rounded-t-[3.5rem] lg:rounded-t-none lg:rounded-l-[5rem] -z-10 overflow-hidden"
                style={{ backgroundColor: 'var(--primary-color)' }}
            >
                {/* Overlay Premium: Memberikan tekstur pada warna solid */}
                <div className="absolute inset-0 bg-linear-to-br from-white/20 to-black/20 mix-blend-overlay" />
                <div className="absolute -top-[20%] -right-[10%] w-[120%] aspect-square rounded-full bg-white/10 blur-[80px]" />
            </div>

            <div className="enterprise-container relative z-10 w-full px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-8 items-center">

                    {/* LENGAN KIRI: Copywriting Area */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        // REVISI 3: Di Tablet (md:), max-w-2xl & mx-auto mencegah baris teks terlalu panjang
                        className="flex flex-col text-center lg:text-left items-center lg:items-start z-20 md:max-w-2xl md:mx-auto lg:max-w-none lg:mx-0 lg:pr-10"
                    >
                        {/* Eyebrow Label - Tajam & Solid */}
                        <motion.div variants={itemVariants} className="mb-5 md:mb-6">
                            <span
                                className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs sm:text-sm font-extrabold tracking-widest uppercase shadow-sm"
                                style={{ color: 'var(--primary-color)' }}
                            >
                                <span className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: 'var(--primary-color)' }} />
                                Ekosistem Geocitra
                            </span>
                        </motion.div>

                        {/* Headline: Resolusi Tipografi Bertahap */}
                        <motion.h1
                            variants={itemVariants}
                            // REVISI 4: Menggunakan standard tailwind classes agar 100% responsif tanpa bergantung pada custom fluid properties yang berisiko patah di browser tertentu
                            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.1] mb-5 md:mb-6 text-slate-900"
                        >
                            {data.title}
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-8 md:mb-10 text-slate-600 font-medium px-4 sm:px-0"
                        >
                            {data.description}
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start w-full sm:w-auto">
                            {targetUrl ? (
                                <button
                                    onClick={handleNavigateToPreview}
                                    // REVISI 5: Target sentuh dioptimalkan untuk jari di Mobile (w-full sm:w-auto)
                                    className="group relative flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95 overflow-hidden cursor-pointer"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                >
                                    <span className="relative z-10 text-sm sm:text-base">{ctaText}</span>
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                                    <div className="absolute inset-0 w-full h-full bg-white/20 scale-0 rounded-full transition-transform duration-500 group-hover:scale-150 origin-center" />
                                </button>
                            ) : (
                                <button
                                    onClick={() => alert("Dokumen brosur belum tersedia untuk produk ini.")}
                                    className="group relative flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-white transition-all duration-300 opacity-50 cursor-not-allowed"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                >
                                    <span className="relative z-10 text-sm sm:text-base">{ctaText}</span>
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                                </button>
                            )}
                            {demoUrl && (
                                <a
                                    href={demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold transition-all duration-300 border-2 overflow-hidden cursor-pointer shadow-sm hover:shadow-md active:scale-95 bg-white"
                                    style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
                                >
                                    <span className="relative z-10 text-sm sm:text-base">{demoCtaText}</span>
                                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    {/* Efek hover subtle menggunakan opacity dari primary color */}
                                    <div
                                        className="absolute inset-0 w-full h-full scale-0 rounded-full transition-transform duration-500 group-hover:scale-150 origin-center opacity-10"
                                        style={{ backgroundColor: 'var(--primary-color)' }}
                                    />
                                </a>
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
                            // REVISI 6: Penanganan Ekstrim untuk Sindrome Layar Tanggung (Tablet)
                            // HP: w-[110%] keluar batas sedikit.
                            // Tablet (md): w-[80%] mx-auto -> Tidak menjadi raksasa, tetap elegan di tengah monolith.
                            // Desktop (lg/xl): ditarik keluar layar kanan secara progresif.
                            className="relative w-[110%] -ml-[5%] sm:w-full sm:ml-0 md:w-[80%] md:mx-auto lg:w-[120%] lg:-mr-[20%] xl:w-[130%] xl:-mr-[30%] z-20 mt-4 md:mt-8 lg:mt-0"
                        >
                            <motion.img
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                src={data.imageUrl}
                                alt={data.title}
                                className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] md:drop-shadow-[0_35px_45px_rgba(0,0,0,0.4)]"
                            />
                        </motion.div>
                    )}

                </div>
            </div>
        </section>
    );
}