'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Command } from 'cmdk';
import { useParams, useRouter } from 'next/navigation';
import { Search, X, LayoutDashboard, Box, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/app/lib/axios';

export default function CommandMenu({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
    const router = useRouter();
    const params = useParams();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Ekstraksi Parameter & Deteksi Bahasa
    const slug = typeof params?.slug === 'string' ? params.slug : '';
    const isEnglish = slug.endsWith('-en');

    // [INTELLIGENCE INJECTION] Tentukan URL Dashboard berdasarkan bahasa
    const dashboardUrl = isEnglish ? '/en' : '/';

    // 2. Kamus Translasi (Dictionary)
    const t = {
        placeholder: isEnglish ? "Search application brochures (e.g., Pam Jaya, Litera...)" : "Cari brosur aplikasi (Contoh: Pam Jaya, Litera...)",
        emptyTitle: isEnglish ? "No brochures found." : "Brosur tidak ditemukan.",
        emptyDesc: isEnglish ? "Try using different keywords." : "Coba gunakan kata kunci lain.",
        catalogHeading: isEnglish ? "Geocitra Catalog" : "Katalog Geocitra",
        noData: isEnglish ? "No catalog data available." : "Tidak ada data katalog tersedia.",
        navHeading: isEnglish ? "Navigation" : "Navigasi",
        backToDash: isEnglish ? "Back to Main Dashboard" : "Kembali ke Dashboard Utama"
    };

    // [INTELLIGENCE INJECTION] Fetch data, Filtering Bahasa, & Manipulasi Sorting
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await api.get('/showcase');
                const rawData = response.data?.data || response.data;

                // FILTERING LOGIC: Cegah data ID dan EN bercampur di hasil pencarian
                const localizedData = rawData.filter((item: any) => {
                    const itemIsEn = item.slug.endsWith('-en');
                    return isEnglish ? itemIsEn : !itemIsEn;
                });

                // Eksekusi Sorting Ascending (A-Z) berdasarkan nama produk
                const sortedData = localizedData.sort((a: any, b: any) =>
                    a.name.localeCompare(b.name)
                );

                setProducts(sortedData);
            } catch (error) {
                console.error('[CommandMenu] Gagal mengambil data katalog:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isOpen) {
            fetchProducts();
        }
    }, [isEnglish, isOpen]); // Optimasi: Fetch hanya ketika modal dibuka untuk menghemat resource

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
                // LOGICAL FIX 1: Responsive Padding Top (Aman untuk On-Screen Keyboard HP)
                <div className="fixed inset-0 z-100 flex items-start justify-center pt-4 sm:pt-[10vh] md:pt-[20vh] px-4 pointer-events-none">

                    {/* Backdrop Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto"
                    />

                    {/* Modal Command Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        // LOGICAL FIX 2: Radius lebih membulat di HP, menyesuaikan estetika mobile OS
                        className="relative z-50 w-full max-w-2xl overflow-hidden rounded-xl md:rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 pointer-events-auto"
                    >
                        <Command className="flex w-full flex-col bg-transparent">
                            {/* Input Area */}
                            <div className="flex items-center border-b border-slate-100 px-3 md:px-4">
                                <Search className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 text-slate-400 shrink-0" />
                                <Command.Input
                                    autoFocus
                                    placeholder={t.placeholder}
                                    // LOGICAL FIX 3: Tinggi dan ukuran font input yang responsif (Teks min 16px di iOS agar tidak auto-zoom)
                                    className="flex h-14 md:h-16 w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-900 font-medium text-base md:text-lg"
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    // LOGICAL FIX 4: Target sentuh lebih besar (p-2) di HP untuk X button
                                    className="ml-2 p-2 md:p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                    aria-label="Close menu"
                                >
                                    <X size={18} className="md:w-4 md:h-4" />
                                </button>
                            </div>

                            {/* List Area */}
                            {/* LOGICAL FIX 5: Viewport height adaptif agar hasil tidak meluap keluar layar HP */}
                            <Command.List className="max-h-[50vh] md:max-h-[60vh] lg:max-h-100 overflow-y-auto overflow-x-hidden p-2 md:p-3 custom-scrollbar">
                                <Command.Empty className="py-10 md:py-12 text-center text-slate-500">
                                    <p className="font-medium text-base md:text-lg">{t.emptyTitle}</p>
                                    <p className="text-xs md:text-sm mt-1">{t.emptyDesc}</p>
                                </Command.Empty>

                                {/* Ekosistem Aplikasi Dinamis (Sorted ASC & Localized) */}
                                <Command.Group heading={t.catalogHeading} className="px-1 md:px-2 py-2 md:py-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    {isLoading ? (
                                        <div className="flex justify-center items-center py-6">
                                            <Loader2 className="animate-spin text-slate-300" size={24} />
                                        </div>
                                    ) : products.length > 0 ? (
                                        products.map((product) => (
                                            <CommandItem
                                                key={product.slug}
                                                onSelect={() => runCommand(() => router.push(`/${product.slug}`))}
                                                icon={<Box className="w-4 h-4 md:w-5 md:h-5" />}
                                                label={product.name}
                                                tagline={product.tagline}
                                            />
                                        ))
                                    ) : (
                                        <Command.Item disabled className="px-3 py-2 text-xs md:text-sm text-slate-500">
                                            {t.noData}
                                        </Command.Item>
                                    )}
                                </Command.Group>

                                {/* Navigasi Global */}
                                <Command.Group heading={t.navHeading} className="px-1 md:px-2 py-2 md:py-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <CommandItem
                                        onSelect={() => runCommand(() => router.push(dashboardUrl))}
                                        icon={<LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />}
                                        label={t.backToDash}
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
function CommandItem({
    onSelect,
    icon,
    label,
    tagline
}: {
    onSelect: () => void,
    icon: React.ReactNode,
    label: string,
    tagline?: string
}) {
    return (
        <Command.Item
            onSelect={onSelect}
            value={`${label} ${tagline || ''}`}
            // LOGICAL FIX 6: Padding dan border-radius yang responsif untuk item
            className="flex cursor-pointer items-center rounded-lg md:rounded-xl px-3 py-2.5 md:px-4 md:py-3 mt-1 transition-colors
                       aria-selected:bg-(--primary-color)/10 group"
        >
            <div className="mr-3 transition-colors group-aria-selected:text-(--primary-color) text-slate-400">
                {icon}
            </div>
            <div className="flex flex-col">
                {/* Skalabilitas Teks List */}
                <span className="font-bold text-sm md:text-base text-slate-700 group-aria-selected:text-(--primary-color)">
                    {label}
                </span>
                {tagline && (
                    <span className="text-[10px] md:text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
                        {tagline}
                    </span>
                )}
            </div>
        </Command.Item>
    );
}