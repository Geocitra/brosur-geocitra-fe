'use client';

import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const pathname = usePathname() || '';
    const router = useRouter();

    // Deteksi cerdas: Apakah kita sedang di rute /en
    const isEnglish = pathname === '/en' || pathname.startsWith('/en/');

    const toggleLanguage = () => {
        if (isEnglish) {
            // Jika di bahasa Inggris, pindah ke Indonesia (Root)
            // Kita replace '/en' dengan string kosong untuk kembali ke root
            const newPath = pathname.replace('/en', '') || '/';
            router.push(newPath);
        } else {
            // Jika di Indonesia, pindah ke bahasa Inggris
            // Kita sisipkan '/en' di awal URL
            const newPath = `/en${pathname === '/' ? '' : pathname}`;
            router.push(newPath);
        }
    };

    return (
        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
            <button
                onClick={toggleLanguage}
                className="group flex items-center gap-2 p-1.5 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-full shadow-2xl hover:bg-slate-800/60 hover:border-white/20 transition-all duration-300"
                aria-label="Toggle Language"
            >
                <div className="pl-2 pr-1 text-sky-400">
                    <Globe size={18} className="transition-transform duration-500 group-hover:rotate-180" />
                </div>

                <div className="relative flex items-center bg-slate-950/50 rounded-full p-1 border border-slate-800">
                    {/* Indikator Slider Aktif (Animasi Spring Framer Motion) */}
                    <motion.div
                        className="absolute w-[36px] h-[28px] bg-sky-500 rounded-full shadow-sm"
                        layout
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        initial={false}
                        animate={{
                            x: isEnglish ? 36 : 0
                        }}
                    />

                    {/* Teks ID */}
                    <span className={`relative z-10 w-[36px] text-center text-[10px] tracking-wider font-black transition-colors duration-300 ${!isEnglish ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                        ID
                    </span>

                    {/* Teks EN */}
                    <span className={`relative z-10 w-[36px] text-center text-[10px] tracking-wider font-black transition-colors duration-300 ${isEnglish ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                        EN
                    </span>
                </div>
            </button>
        </div>
    );
}