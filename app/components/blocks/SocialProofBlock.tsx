'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// 1. Definisi Kontrak Data (Strict Interface)
interface LogoData {
    name: string;
    imageUrl: string;
}

interface SocialProofData {
    title?: string;
    logos: LogoData[];
}

interface SocialProofBlockProps {
    data: SocialProofData;
}

export default function SocialProofBlock({ data }: SocialProofBlockProps) {
    // 2. Defensive Programming: Cegah rendering jika tidak ada data logo (misal API error/kosong)
    if (!data?.logos || data.logos.length === 0) {
        return null;
    }

    const sectionTitle = data.title || 'Telah Dipercaya Oleh';

    return (
        // Wrapper Section: Diubah menjadi bg-white murni sesuai permintaan
        <section className="py-12 md:py-20 bg-white border-y border-slate-100 overflow-hidden">
            <div className="enterprise-container">
                <div className="flex flex-col items-center justify-center">

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-8 md:mb-12 text-center"
                    >
                        <h3 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
                            {sectionTitle}
                        </h3>
                    </motion.div>

                    {/* Logo Grid / Flex Container (Mobile First) */}
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-20 w-full max-w-6xl">
                        {data.logos.map((logo, index) => (
                            <motion.div
                                key={`${logo.name}-${index}`}
                                initial={{ opacity: 0, filter: 'blur(4px)' }}
                                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                                // Scaling up: Ukuran width & height diperbesar secara signifikan
                                className="relative w-36 h-20 md:w-48 md:h-28 lg:w-64 lg:h-32 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ease-in-out cursor-default"
                                title={logo.name}
                            >
                                {/* Implementasi Next/Image Performance */}
                                <Image
                                    src={logo.imageUrl}
                                    alt={`Logo ${logo.name}`}
                                    fill
                                    // Update resolusi pengunduhan agar gambar tidak pecah di ukuran yang baru
                                    sizes="(max-width: 768px) 144px, (max-width: 1024px) 192px, 256px"
                                    className="object-contain"
                                    quality={90}
                                />
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}