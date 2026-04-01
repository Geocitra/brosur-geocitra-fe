'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Globe } from 'lucide-react'; // Tambah impor ikon Globe, Linkedin, Instagram

export default function Footer() {
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

                    <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                        Solusi digital inovatif dan terintegrasi. Kami membangun sistem yang mengubah data menjadi akuntabilitas untuk instansi masa depan.
                    </p>

                    {/* 3. Lokasi Fisik */}
                    <div className="flex items-center gap-4 text-slate-300">
                        <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center"
                            style={{ borderBottomColor: 'var(--primary-color)' }}>
                            <MapPin size={16} className="text-slate-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Kantor Pusat</span>
                            <span className="font-medium text-sm">Bandung, Indonesia</span>
                        </div>
                    </div>
                </div>

                {/* LENGAN KANAN: Kontak Support Langsung */}
                <div className="flex flex-col gap-6 w-full lg:w-auto mt-4 lg:mt-0">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                        Hubungi Support Kami
                    </span>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-6 sm:gap-10 lg:gap-5">
                        {/* 1. Email Interaktif */}
                        <a
                            href="mailto:hello@geocitra.com"
                            className="group flex items-center gap-4 text-slate-300 hover:text-white transition-all duration-300"
                            title="Kirim Email ke Geocitra"
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
                            title="Hubungi via WhatsApp"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ borderBottomColor: 'var(--primary-color)' }}>
                                <Phone size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Telepon / WhatsApp</span>
                                <span className="font-medium text-sm">+62 815-8402-8188</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Area */}
            <div className="enterprise-container mt-16 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] text-center md:text-left">
                    © {new Date().getFullYear()} CV Geocitra. Seluruh Hak Cipta Dilindungi.
                </p>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">System Operational</span>
                </div>
            </div>
        </footer>
    );
}