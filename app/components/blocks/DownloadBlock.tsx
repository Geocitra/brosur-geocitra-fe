'use client';

import { useState } from 'react';
import { Download, Eye, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PdfDrawer from '../ui/PdfDrawer';

export default function DownloadBlock({ data }: { data: any }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const baseUrl = process.env.NEXT_PUBLIC_ASSET_URL || 'http://localhost:4005';
    const fileUrl = data.fileUrl?.startsWith('http') ? data.fileUrl : `${baseUrl}${data.fileUrl}`;

    return (
        <>
            <section className="py-24 px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    // [FIX] Menggunakan bg-[var(--primary-color)] agar warna background container dinamis
                    className="max-w-5xl mx-auto rounded-[2.5rem] p-8 md:p-20 text-white shadow-aura relative overflow-hidden bg-(--primary-color)"
                >
                    {/* Background Decorative */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/15 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <h2 className="text-(length:--fluid-h1) font-extrabold mb-6 leading-tight tracking-tighter">
                            Kuasai Kendali Sistem Anda
                        </h2>
                        <p className="text-white/90 mb-12 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
                            Pelajari arsitektur, spesifikasi teknis, dan keunggulan fitur kami secara mendalam melalui dokumen resmi ini.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">

                            {/* PRIMARY CTA: Baca Sekarang
                                [FIX] Menggunakan text-[var(--primary-color)] agar teks tombol putih ini warnanya sesuai tema
                             */}
                            <motion.button
                                onClick={() => setIsDrawerOpen(true)}
                                animate={{
                                    boxShadow: [
                                        "0px 0px 0px 0px rgba(255, 255, 255, 0.5)",
                                        "0px 0px 0px 20px rgba(255, 255, 255, 0)",
                                    ]
                                }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white px-10 py-4 rounded-full font-extrabold text-lg text-(--primary-color) hover:-translate-y-1 transition-transform active:scale-95 min-h-14"
                            >
                                <Eye size={22} />
                                Baca Sekarang
                            </motion.button>

                            <div className="flex w-full sm:w-auto gap-4">
                                <a
                                    href={fileUrl}
                                    download
                                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-black/20 hover:bg-black/30 backdrop-blur-md px-8 py-4 rounded-full font-semibold text-white transition-all active:scale-95 min-h-14"
                                >
                                    <Download size={20} />
                                    Simpan PDF
                                </a>

                                <button
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({ title: 'Brosur Geocitra', url: window.location.href });
                                        }
                                    }}
                                    className="w-14 h-14 shrink-0 flex items-center justify-center bg-transparent border border-white/30 hover:bg-white/10 rounded-full text-white transition-all active:scale-95"
                                >
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            <PdfDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                fileUrl={fileUrl}
                appName={data.buttonText ? data.buttonText.replace('Download Brosur ', '').replace(' (PDF)', '') : 'Geocitra'}
            />
        </>
    );
}