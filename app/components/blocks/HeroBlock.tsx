'use client';

import { motion } from 'framer-motion';

export default function HeroBlock({ data }: { data: any }) {
    return (
        <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
            <div className="enterprise-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col text-center lg:text-left items-center lg:items-start"
                    >
                        <h1 className="text-[--fluid-h1] font-extrabold tracking-tight leading-[1.1] mb-8">
                            {data.title}
                        </h1>
                        <p className="text-[--fluid-p] leading-relaxed max-w-xl mb-10">
                            {data.description}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95 min-h-12"
                            >
                                Lihat Detail Produk
                            </button>
                        </div>
                    </motion.div>

                    {/* Image Content with Floating Animation */}
                    {data.imageUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10 rounded-2xl md:rounded-4xl overflow-hidden shadow-2xl border-4 border-white"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={data.imageUrl}
                                    alt={data.title}
                                    className="w-full h-auto object-cover"
                                />
                            </motion.div>
                            {/* Decorative Element - Accent Blur */}
                            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full z-0" />
                        </motion.div>
                    )}

                </div>
            </div>
        </section>
    );
}