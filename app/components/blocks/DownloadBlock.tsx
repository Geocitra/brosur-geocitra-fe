'use client';

import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DownloadBlock({ data }: { data: any }) {
    const baseUrl = process.env.NEXT_PUBLIC_ASSET_URL || 'http://localhost:4005';
    const fileUrl = data.fileUrl.startsWith('http') ? data.fileUrl : `${baseUrl}${data.fileUrl}`;

    return (
        <section className="py-24 px-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto rounded-[2.5rem] p-12 md:p-20 text-white shadow-2xl shadow-primary/20 relative overflow-hidden bg-primary"
            >
                {/* Background Pattern Decals */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />

                <div className="relative z-10 flex flex-col items-center text-center">
                    <h2 className="text-[--fluid-h2] font-extrabold mb-6 leading-tight">
                        Siap Menggunakan <br className="hidden md:block" /> Aplikasi Ini?
                    </h2>
                    <p className="text-white/80 mb-12 text-lg md:text-xl max-w-2xl leading-relaxed">
                        Dapatkan informasi mendalam mengenai teknis, fitur unggulan, dan cara implementasi melalui brosur resmi kami.
                    </p>

                    <motion.a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-flex items-center gap-3 bg-white px-10 py-5 rounded-full font-bold text-lg md:text-xl text-primary hover:shadow-2xl transition-all active:scale-95 min-h-14"
                    >
                        <Download size={24} />
                        {data.buttonText || 'Download Brosur (PDF)'}
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
}