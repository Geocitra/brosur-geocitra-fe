'use client';
// Navbar.tsx
import { Search, ArrowLeft, LayoutDashboard } from 'lucide-react'; // Tambah icon
import { useState } from 'react';
import CommandMenu from '../ui/CommandMenu';

export default function Navbar({ appName }: { appName: string }) {
    const [isCommandOpen, setIsCommandOpen] = useState(false);

    return (
        <>
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
                {/* 
                   UBAH: Dari glass-panel (transparan) ke bg-white (solid) 
                   Hapus: border-white/50, ganti ke border-slate-200
                */}
                <nav className="bg-white w-full max-w-3xl rounded-full px-4 py-2.5 flex items-center justify-between shadow-lg shadow-slate-200/50 pointer-events-auto border border-slate-200">

                    {/* Area Kiri: Back Button & Brand */}
                    <div className="flex items-center gap-2 pl-1">
                        {/* Tombol Back ke Dashboard Utama */}
                        <a
                            href="https://brosur.geocitra.com" // Sesuaikan URL Dashboard Anda
                            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors group"
                            title="Kembali ke Dashboard"
                        >
                            <ArrowLeft size={19} className="group-hover:-translate-x-0.5 transition-transform" />
                        </a>

                        {/* Divider Kecil */}
                        <div className="w-px h-6 bg-slate-200 mx-1" />

                        <span className="font-extrabold text-xl tracking-tighter text-slate-900 ml-1">
                            GEOCITRA
                        </span>

                        <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                        />

                        <span
                            className="hidden sm:inline-block text-sm font-bold text-slate-500"
                            style={{ color: 'var(--primary-color)' }}
                        >
                            {appName}
                        </span>
                    </div>

                    {/* Spotlight Search (Dibuat lebih solid) */}
                    <button
                        onClick={() => setIsCommandOpen(true)}
                        className="flex items-center gap-3 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition-all group"
                    >
                        <Search
                            size={16}
                            className="text-slate-400 group-hover:text-slate-900"
                        />
                        <span className="text-sm font-medium text-slate-500 hidden sm:inline-block">
                            Cari...
                        </span>
                        <div className="hidden lg:flex items-center gap-1 ml-2">
                            <kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-slate-400">⌘K</kbd>
                        </div>
                    </button>
                </nav>
            </div>

            <CommandMenu isOpen={isCommandOpen} setIsOpen={setIsCommandOpen} />
        </>
    );
}