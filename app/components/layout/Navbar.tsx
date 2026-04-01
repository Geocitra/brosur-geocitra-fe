'use client';

import { Search, ArrowLeft, Globe } from 'lucide-react';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CommandMenu from '../ui/CommandMenu';

export default function Navbar({ appName }: { appName: string }) {
    const [isCommandOpen, setIsCommandOpen] = useState(false);
    const router = useRouter();
    const params = useParams();

    // 1. Ekstraksi Parameter & Deteksi Bahasa
    // Fallback ke string kosong jika params belum ter-mount dengan sempurna
    const slug = typeof params?.slug === 'string' ? params.slug : '';

    // Deteksi apakah slug saat ini memiliki suffix '-en'
    const isEnglish = slug.endsWith('-en');

    // Dapatkan root slug (misal: 'rekas-en' menjadi 'rekas')
    const baseSlug = isEnglish ? slug.replace('-en', '') : slug;

    // [INTELLIGENCE INJECTION] Tentukan URL Dashboard berdasarkan bahasa
    const dashboardUrl = isEnglish ? '/en' : '/';

    // 2. Handler Perpindahan Bahasa
    const handleLanguageSwitch = (targetLang: 'id' | 'en') => {
        if (targetLang === 'en' && !isEnglish) {
            router.push(`/${baseSlug}-en`);
        } else if (targetLang === 'id' && isEnglish) {
            router.push(`/${baseSlug}`);
        }
    };

    return (
        <>
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
                <nav className="bg-white w-full max-w-3xl rounded-full px-4 py-2.5 flex items-center justify-between shadow-lg shadow-slate-200/50 pointer-events-auto border border-slate-200">

                    {/* LENGAN KIRI: Back Button & Brand */}
                    <div className="flex items-center gap-2 pl-1">
                        <a
                            href={dashboardUrl}
                            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors group"
                            title={isEnglish ? "Back to Dashboard" : "Kembali ke Dashboard"}
                        >
                            <ArrowLeft size={19} className="group-hover:-translate-x-0.5 transition-transform" />
                        </a>

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

                    {/* LENGAN KANAN: Tools Area (Language & Search) */}
                    <div className="flex items-center gap-3">

                        {/* THE LANGUAGE SWITCHER (Pill UI Design) */}
                        <div className="flex items-center bg-slate-100/70 border border-slate-200/80 rounded-full p-0.5">
                            <button
                                onClick={() => handleLanguageSwitch('id')}
                                disabled={!isEnglish} // Disable klik jika sudah di posisi ID
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-extrabold rounded-full transition-all duration-300 ${!isEnglish
                                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50 cursor-default'
                                    : 'text-slate-400 hover:text-slate-600 cursor-pointer'
                                    }`}
                            >
                                ID
                            </button>
                            <button
                                onClick={() => handleLanguageSwitch('en')}
                                disabled={isEnglish} // Disable klik jika sudah di posisi EN
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-extrabold rounded-full transition-all duration-300 ${isEnglish
                                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50 cursor-default'
                                    : 'text-slate-400 hover:text-slate-600 cursor-pointer'
                                    }`}
                            >
                                EN
                            </button>
                        </div>

                        {/* Spotlight Search */}
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

                    </div>
                </nav>
            </div>

            <CommandMenu isOpen={isCommandOpen} setIsOpen={setIsCommandOpen} />
        </>
    );
}