'use client';

import { useEffect, Dispatch, SetStateAction } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Search, FileText, X, Wallet, BookOpen, Smartphone, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandMenu({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
    const router = useRouter();

    // Keyboard Shortcut Logic
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [setIsOpen]);

    const runCommand = (command: () => void) => {
        setIsOpen(false);
        command();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 pointer-events-none">

                    {/* Backdrop Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm pointer-events-auto"
                    />

                    {/* Modal Command Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative z-50 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 pointer-events-auto"
                    >
                        <Command className="flex w-full flex-col bg-transparent">
                            {/* Input Area */}
                            <div className="flex items-center border-b border-slate-100 px-4">
                                {/* [FIX] Search Icon - Sadar Warna */}
                                <Search className="mr-3 h-5 w-5" style={{ color: 'var(--primary-color)' }} />
                                <Command.Input
                                    autoFocus
                                    placeholder="Cari brosur aplikasi (Contoh: Vely, Litera...)"
                                    className="flex h-16 w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-900 font-medium text-lg"
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="ml-2 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* List Area */}
                            <Command.List className="max-h-87.5 overflow-y-auto overflow-x-hidden p-3 custom-scrollbar">
                                <Command.Empty className="py-12 text-center text-slate-500">
                                    <p className="font-medium text-lg">Brosur tidak ditemukan.</p>
                                    <p className="text-sm mt-1">Coba gunakan kata kunci lain.</p>
                                </Command.Empty>

                                {/* Histori / Prioritas */}
                                <Command.Group heading="Terakhir Dilihat" className="px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <CommandItem
                                        onSelect={() => runCommand(() => router.push('/edaily'))}
                                        icon={<FileText size={20} />}
                                        label="E-Daily Report"
                                    />
                                </Command.Group>

                                {/* Ekosistem Aplikasi Lainnya */}
                                <Command.Group heading="Katalog Geocitra" className="px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <CommandItem
                                        onSelect={() => runCommand(() => router.push('/keuanganku'))}
                                        icon={<Wallet size={20} />}
                                        label="KeuanganKu (SaaS Agen)"
                                    />
                                    <CommandItem
                                        onSelect={() => runCommand(() => router.push('/litera'))}
                                        icon={<BookOpen size={20} />}
                                        label="Litera Dashboard"
                                    />
                                    <CommandItem
                                        onSelect={() => runCommand(() => router.push('/vely'))}
                                        icon={<Smartphone size={20} />}
                                        label="Vely App"
                                    />
                                </Command.Group>

                                {/* GRUP BARU: Navigasi Global */}
                                <Command.Group heading="Navigasi" className="px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <CommandItem
                                        onSelect={() => window.location.href = 'https://brosur.geocitra.com'}
                                        icon={<LayoutDashboard size={20} />}
                                        label="Kembali ke Dashboard Utama"
                                    />
                                </Command.Group>
                            </Command.List>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

/**
 * Sub-komponen untuk menangani Logika Warna saat Seleksi (Hover/Keyboard)
 */
function CommandItem({ onSelect, icon, label }: { onSelect: () => void, icon: React.ReactNode, label: string }) {
    return (
        <Command.Item
            onSelect={onSelect}
            // Menggunakan CSS Variables untuk menangani warna dinamis saat data-selected="true"
            className="flex cursor-pointer items-center rounded-xl px-4 py-3 mt-1 text-slate-700 font-bold transition-colors
                       aria-selected:bg-(--primary-color)/8 aria-selected:text-(--primary-color) group"
        >
            <div className="mr-3 transition-colors group-aria-selected:text-(--primary-color) text-slate-400">
                {icon}
            </div>
            {label}
        </Command.Item>
    );
}