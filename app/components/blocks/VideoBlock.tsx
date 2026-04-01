'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoData {
    title?: string;
    videoUrl?: string;
}

interface VideoBlockProps {
    data: VideoData;
}

export default function VideoBlock({ data }: VideoBlockProps) {
    if (!data.videoUrl) return null;

    return (
        // Wrapper Section: bg-white murni di bagian atas untuk ruang napas tipografi
        <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 w-full z-10 bg-white overflow-hidden">

            {/* THE SOLID PEDESTAL: Blok warna primer raksasa di setengah bagian bawah layar */}
            <div
                className="absolute bottom-0 left-0 w-full h-[60%] lg:h-[65%] -z-10"
                style={{ backgroundColor: 'var(--primary-color)' }}
            >
                {/* Overlay tipis agar warna solid tidak terlihat 'murah' (menambah kedalaman) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply" />
            </div>

            <div className="enterprise-container relative z-10">

                {/* HEADLINE AREA: Bebas dari efek blur, teks hitam pekat untuk keterbacaan */}
                <div className="text-center mb-10 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
                            {data.title || "Alur Kerja Digital"}
                        </h2>
                    </motion.div>

                    {/* Aksen garis (Divider) untuk memberikan jeda visual yang manis */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-24 h-1.5 mx-auto mt-6 rounded-full"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                    />
                </div>

                {/* VIDEO CONTAINER: Tegas, Tajam, Premium */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="relative w-full max-w-5xl mx-auto"
                >
                    {/* Bingkai Putih Opsional (Seperti Polaroid/Galeri) untuk memisahkan video dari background */}
                    <div className="bg-white p-2 md:p-3 rounded-3xl md:rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
                        <div className="relative aspect-video rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-slate-900 border border-slate-100">

                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`${data.videoUrl}${data.videoUrl.includes('?') ? '&' : '?'}rel=0&modestbranding=1&showinfo=0`}
                                title={data.title || "Video Presentation"}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    {/* LABEL IDENTITAS (Floating di atas warna primer) */}
                    <div className="mt-8 flex justify-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/25 backdrop-blur-md border border-white/10 shadow-lg">
                            <div className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center">
                                <Play size={12} fill="currentColor" className="ml-0.5" />
                            </div>
                            <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">
                                Geocitra Showcase
                            </span>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}