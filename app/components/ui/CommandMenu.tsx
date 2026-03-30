'use client';

import { useEffect, Dispatch, SetStateAction } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Search, FileText, AppWindow, X, Wallet, BookOpen, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandMenu({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean;
    // [FIX] Menggunakan tipe bawaan React untuk state setter agar mendukung callback state
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
    const router = useRouter();

    // Memantau kombinasi tombol Cmd+K (Mac) atau Ctrl+K (Windows)
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

    // Fungsi routing Client-side yang super cepat
    const runCommand = (command: () => void) => {
        setIsOpen(false);
        command();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                // [FIX] Mengubah z-[100] menjadi z-100 sesuai rekomendasi Tailwind v4
                <div className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">

                    {/* Backdrop Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />

                    {/* Modal Command Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative z-50 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10"
                    >
                        <Command className="flex w-full flex-col bg-transparent">
                            {/* Input Area */}
                            <div className="flex items-center border-b border-slate-100 px-4">
                                <Search className="mr-3 h-5 w-5 text-primary" />
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
                            {/* [FIX] Mengubah max-h-[350px] menjadi max-h-87.5 sesuai rekomendasi Tailwind v4 */}
                            <Command.List className="max-h-87.5 overflow-y-auto overflow-x-hidden p-3">
                                <Command.Empty className="py-12 text-center text-slate-500">
                                    <p className="font-medium text-lg">Brosur tidak ditemukan.</p>
                                    <p className="text-sm mt-1">Coba gunakan kata kunci lain.</p>
                                </Command.Empty>

                                {/* Histori / Prioritas */}
                                <Command.Group heading="Terakhir Dilihat" className="px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/edaily'))}
                                        className="flex cursor-pointer items-center rounded-xl px-4 py-3 mt-1 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary transition-colors text-slate-700 font-bold"
                                    >
                                        <FileText className="mr-3 h-5 w-5 text-slate-400 data-[selected=true]:text-primary" />
                                        E-Daily Report
                                    </Command.Item>
                                </Command.Group>

                                {/* Ekosistem Aplikasi Lainnya */}
                                <Command.Group heading="Katalog Geocitra" className="px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/keuanganku'))}
                                        className="flex cursor-pointer items-center rounded-xl px-4 py-3 mt-1 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary transition-colors text-slate-700 font-bold"
                                    >
                                        <Wallet className="mr-3 h-5 w-5 text-slate-400 data-[selected=true]:text-primary" />
                                        KeuanganKu (SaaS Agen)
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/litera'))}
                                        className="flex cursor-pointer items-center rounded-xl px-4 py-3 mt-1 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary transition-colors text-slate-700 font-bold"
                                    >
                                        <BookOpen className="mr-3 h-5 w-5 text-slate-400 data-[selected=true]:text-primary" />
                                        Litera Dashboard
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/vely'))}
                                        className="flex cursor-pointer items-center rounded-xl px-4 py-3 mt-1 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary transition-colors text-slate-700 font-bold"
                                    >
                                        <Smartphone className="mr-3 h-5 w-5 text-slate-400 data-[selected=true]:text-primary" />
                                        Vely App
                                    </Command.Item>
                                </Command.Group>
                            </Command.List>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}