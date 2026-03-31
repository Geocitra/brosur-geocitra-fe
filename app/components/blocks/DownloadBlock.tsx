'use client';

import { useState } from 'react';
import { Download, BookOpen, Share2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DownloadBlock({ data, primaryColor }: { data: any, primaryColor?: string }) {
    const [isHovered, setIsHovered] = useState(false);

    // Resolusi URL dan Ekstraksi Nama File
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const fileUrl = data.fileUrl?.startsWith('http') ? data.fileUrl : `${baseUrl}${data.fileUrl}`;

    // Mengambil nama file saja (misal: 'brosur-edaily.pdf' dari '/uploads/brosur-edaily.pdf')
    const filename = data.fileUrl?.split('/').pop() || '';

    return (
        <section className="py-24 px-4 md:px-6 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                // Menggunakan backgroundColor dinamis dari props atau CSS Variable
                className="max-w-5xl mx-auto rounded-[2.5rem] p-8 md:p-20 text-white shadow-aura relative overflow-hidden group"
                style={{ backgroundColor: primaryColor || 'var(--primary-color, #0ea5e9)' }}
            >
                {/* Background Decorative (Mesh Gradients Halus) */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full -mr-40 -mt-40 blur-[80px] pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/20 rounded-full -ml-32 -mb-32 blur-[60px] pointer-events-none transition-transform duration-1000 group-hover:scale-110" />

                <div className="relative z-10 flex flex-col items-center text-center">

                    {/* Badge Kecil Elegan */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                            Dokumen Resmi Geocitra
                        </span>
                    </div>

                    <h2 className="text-[length:var(--fluid-h1)] font-extrabold mb-6 leading-[1.1] tracking-tighter">
                        Kuasai Kendali <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
                            Sistem Anda
                        </span>
                    </h2>

                    <p className="text-white/90 mb-12 text-base md:text-xl max-w-2xl leading-relaxed font-medium">
                        Pelajari arsitektur, spesifikasi teknis, dan keunggulan fitur kami secara mendalam melalui dokumen presentasi interaktif ini.
                    </p>

                    {/* ACTION BUTTONS (Sultan Layout) */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">

                        {/* PRIMARY CTA: Buka SmartViewer */}
                        <Link href={`/preview/${filename}`} className="w-full sm:w-auto">
                            <motion.button
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                                // Animasi Pulse Halus ala Apple
                                animate={{
                                    boxShadow: isHovered
                                        ? "0px 0px 0px 8px rgba(255, 255, 255, 0.2)"
                                        : "0px 0px 0px 0px rgba(255, 255, 255, 0.5)"
                                }}
                                transition={{ duration: 0.3 }}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-lg md:text-xl hover:-translate-y-1 transition-transform active:scale-95 min-h-[60px] shadow-2xl group/btn"
                                style={{ color: primaryColor || 'var(--primary-color, #0ea5e9)' }}
                            >
                                <BookOpen size={24} className="group-hover/btn:scale-110 transition-transform" />
                                <span>Baca Dokumen</span>
                                <ArrowRight size={20} className="ml-1 opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300 absolute right-6" />
                            </motion.button>
                        </Link>

                        {/* SECONDARY ACTIONS: Simpan & Bagikan */}
                        <div className="flex w-full sm:w-auto gap-3">
                            {/* Tombol Simpan (Download Langsung) */}
                            <a
                                href={fileUrl}
                                download
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-black/20 hover:bg-black/30 backdrop-blur-md px-6 py-4 rounded-full font-bold text-sm md:text-base text-white transition-all hover:shadow-lg active:scale-95 min-h-[60px] border border-white/10 hover:border-white/30"
                            >
                                <Download size={20} />
                                <span className="hidden sm:inline">Simpan PDF</span>
                                <span className="sm:hidden">Simpan</span>
                            </a>

                            {/* Tombol Bagikan (Web Share API) */}
                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: `Brosur ${data.buttonText || 'Geocitra'}`,
                                            text: 'Pelajari spesifikasi teknis sistem ini:',
                                            url: window.location.href
                                        });
                                    }
                                }}
                                className="w-[60px] shrink-0 flex items-center justify-center bg-transparent border border-white/30 hover:bg-white/10 rounded-full text-white transition-all active:scale-95"
                                aria-label="Bagikan Halaman"
                            >
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Footer Info Tipis */}
                    <p className="mt-8 text-[11px] font-bold tracking-[0.15em] text-white/50 uppercase">
                        Format: PDF Interaktif • Ukuran Dioptimalkan
                    </p>

                </div>
            </motion.div>
        </section>
    );
}