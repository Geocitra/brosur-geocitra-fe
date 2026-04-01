'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation'; // UBAH: Gunakan usePathname
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    // 1. Ekstraksi Path & Deteksi Bahasa Dinamis
    const pathname = usePathname() || '';

    // Logika Pintar:
    // - pathname === '/en' -> Menangkap halaman utama dashboard bahasa Inggris
    // - pathname.endsWith('-en') -> Menangkap halaman brosur bahasa Inggris (misal: /rekas-en)
    const isEnglish = pathname === '/en' || pathname.endsWith('-en');

    // 2. Kamus Translasi (Dictionary)
    const t = {
        description: isEnglish
            ? "Innovative and integrated digital solutions. We build systems that transform data into accountability for the agencies of the future."
            : "Solusi digital inovatif dan terintegrasi. Kami membangun sistem yang mengubah data menjadi akuntabilitas untuk instansi masa depan.",
        headquartersTitle: isEnglish ? "Headquarters" : "Kantor Pusat",
        supportTitle: isEnglish ? "Contact Our Support" : "Hubungi Support Kami",
        phoneTitle: isEnglish ? "Phone / WhatsApp" : "Telepon / WhatsApp",
        copyright: isEnglish
            ? `© ${new Date().getFullYear()} CV Geocitra. All Rights Reserved.`
            : `© ${new Date().getFullYear()} CV Geocitra. Seluruh Hak Cipta Dilindungi.`
    };

    return (
        <footer className="w-full bg-slate-950 pt-20 pb-10 mt-20 relative z-20">

            {/* Top Border Aksen */}
            <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: 'var(--primary-color)' }}
            />

            <div className="enterprise-container flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">

                {/* LENGAN KIRI: Info & Brand */}
                <div className="flex flex-col items-start text-left lg:max-w-md w-full">

                    {/* Header Brand Area */}
                    <span className="font-extrabold text-3xl tracking-tighter text-white mb-4 flex items-center gap-2.5">
                        <Image
                            src="/logo-geocitra.png?v=2"
                            alt="Logo Geocitra CV"
                            width={32}
                            height={32}
                            quality={100}
                            unoptimized={true}
                            className="w-auto h-8 object-contain"
                        />
                        GEOCITRA
                        <span
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                        />
                    </span>

                    {/* Deskripsi Dinamis */}
                    <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                        {t.description}
                    </p>

                    {/* 3. Lokasi Fisik */}
                    <div className="flex items-center gap-4 text-slate-300">
                        <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center"
                            style={{ borderBottomColor: 'var(--primary-color)' }}>
                            <MapPin size={16} className="text-slate-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                                {t.headquartersTitle}
                            </span>
                            <span className="font-medium text-sm">Bandung, Indonesia</span>
                        </div>
                    </div>
                </div>

                {/* LENGAN KANAN: Kontak Support Langsung */}
                <div className="flex flex-col gap-6 w-full lg:w-auto mt-4 lg:mt-0">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                        {t.supportTitle}
                    </span>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-6 sm:gap-10 lg:gap-5">
                        {/* 1. Email Interaktif */}
                        <a
                            href="mailto:hello@geocitra.com"
                            className="group flex items-center gap-4 text-slate-300 hover:text-white transition-all duration-300"
                            title={isEnglish ? "Send Email to Geocitra" : "Kirim Email ke Geocitra"}
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ borderBottomColor: 'var(--primary-color)' }}>
                                <Mail size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Email</span>
                                <span className="font-medium text-sm">hello@geocitra.com</span>
                            </div>
                        </a>

                        {/* 2. Phone / WhatsApp Interaktif */}
                        <a
                            href="https://wa.me/6281584028188"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 text-slate-300 hover:text-white transition-all duration-300"
                            title={isEnglish ? "Contact via WhatsApp" : "Hubungi via WhatsApp"}
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ borderBottomColor: 'var(--primary-color)' }}>
                                <Phone size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                                    {t.phoneTitle}
                                </span>
                                <span className="font-medium text-sm">+62 815-8402-8188</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Area */}
            <div className="enterprise-container mt-16 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] text-center md:text-left">
                    {t.copyright}
                </p>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">System Operational</span>
                </div>
            </div>
        </footer>
    );
}