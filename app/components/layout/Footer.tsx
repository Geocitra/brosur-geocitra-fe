'use client';

import React from 'react';

export default function Footer() {
    return (
        // Menggunakan warna Solid Slate-950 (Hampir Hitam) sebagai pemutus visual yang tegas
        <footer className="w-full bg-slate-950 pt-20 pb-10 mt-20 relative z-20">

            {/* Top Border Aksen - Sadar Warna Produk
                Garis tipis di paling atas footer untuk menjaga koneksi dengan tema produk
            */}
            <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: 'var(--primary-color)' }}
            />

            <div className="enterprise-container flex flex-col md:flex-row justify-between items-start gap-12">

                {/* Kolom Info & Brand */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="font-extrabold text-3xl tracking-tighter text-white mb-4 flex items-center gap-2">
                        GEOCITRA
                        <span
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                        />
                    </span>
                    <p className="text-slate-400 text-sm font-medium max-w-sm leading-relaxed">
                        Solusi digital inovatif dan terintegrasi. Kami membangun sistem yang mengubah data menjadi akuntabilitas untuk instansi masa depan.
                    </p>
                </div>

                {/* Kolom Tautan - Navigasi Bersih */}
                <div className="grid grid-cols-2 sm:flex sm:gap-12 gap-8 text-sm">
                    <div className="flex flex-col gap-4">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Legal</span>
                        <a href="#" className="text-slate-300 hover:text-white transition-colors font-medium">Privacy Policy</a>
                        <a href="#" className="text-slate-300 hover:text-white transition-colors font-medium">Terms of Service</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Bantuan</span>
                        <a
                            href="#"
                            className="transition-colors font-medium"
                            style={{ color: 'var(--primary-color)' }}
                        >
                            Hubungi Support
                        </a>
                        <a href="#" className="text-slate-300 hover:text-white transition-colors font-medium">Dokumentasi</a>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Area */}
            <div className="enterprise-container mt-16 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                    © {new Date().getFullYear()} CV Geocitra. Seluruh Hak Cipta Dilindungi.
                </p>

                {/* Status Indicator (Mockup) */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">System Operational</span>
                </div>
            </div>
        </footer>
    );
}