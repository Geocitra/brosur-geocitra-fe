'use client';

import { motion } from 'framer-motion';

export default function AuraBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-transparent">

            {/* 1. NOISE TEXTURE LAYER (The Secret Sauce)
        Memberikan tekstur "Film Grain" agar background tidak terlihat seperti website murah.
        Ini memecah 'color banding' pada gradasi dan memberi kesan premium matte.
      */}
            <div className="absolute inset-0 z-20 opacity-[0.035] mix-blend-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <filter id="noiseFilter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.75"
                            numOctaves="3"
                            stitchTiles="stitch"
                        />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* 2. MESH GRADIENT BLOBS
        Alih-alih melayang di tengah, blob ini memancar dari sudut layar.
        Tingkat blur dinaikkan ekstrim (hingga 180px) agar menyatu seperti cat air.
      */}

            {/* Blob 1: Kiri Atas (Masif dan Lambat) */}
            <motion.div
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, 40, -50, 0],
                    scale: [1, 1.15, 0.95, 1],
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply opacity-[0.18] blur-[120px] md:blur-[160px]"
                style={{ backgroundColor: 'var(--primary-color)' }}
            />

            {/* Blob 2: Kanan Bawah (Lebih gelap, menciptakan kedalaman silang) */}
            <motion.div
                animate={{
                    x: [0, -40, 20, 0],
                    y: [0, -60, 40, 0],
                    scale: [1, 1.2, 0.85, 1],
                }}
                transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply opacity-[0.14] blur-[130px] md:blur-[180px]"
                style={{ backgroundColor: 'var(--primary-color)' }}
            />

            {/* Blob 3: Aksen Kanan Atas (Memberikan kontras asimetris) */}
            <motion.div
                animate={{
                    x: [0, -30, 40, 0],
                    y: [0, 50, -30, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                className="absolute top-[10%] right-[15%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply opacity-[0.09] blur-[100px] md:blur-[140px]"
                style={{ backgroundColor: 'var(--primary-color)' }}
            />

        </div>
    );
}