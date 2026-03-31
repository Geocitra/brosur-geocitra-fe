'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, FileText, Loader2 } from 'lucide-react';

interface PdfDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl: string;
    appName: string;
}

export default function PdfDrawer({ isOpen, onClose, fileUrl, appName }: PdfDrawerProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Kunci scroll body saat drawer terbuka agar UX tetap stabil
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsLoading(true); // Reset loading state setiap dibuka
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Brosur ${appName} - CV Geocitra`,
                    text: `Pelajari lebih lanjut tentang spesifikasi dan fitur ${appName}.`,
                    url: fileUrl,
                });
            } catch (error) {
                console.log('User membatalkan share');
            }
        } else {
            navigator.clipboard.writeText(fileUrl);
            alert('Tautan brosur berhasil disalin ke clipboard!');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop dengan Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-60 bg-slate-900/40 backdrop-blur-sm"
                    />

                    {/* Drawer: Kanan (Desktop), Bawah (Mobile) */}
                    <motion.div
                        initial={{ x: '100%', y: 0 }}
                        animate={{ x: 0, y: 0 }}
                        exit={{ x: '100%', y: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-70 w-full md:w-150 lg:w-200 bg-white shadow-2xl flex flex-col sm:max-md:top-20 sm:max-md:rounded-t-3xl sm:max-md:inset-x-0 sm:max-md:h-auto sm:max-md:bottom-0"
                    >
                        {/* Header dengan Glassmorphism */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 leading-tight">Brosur Resmi</h3>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{appName}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={handleShare} className="p-2 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-full transition-colors hidden md:flex">
                                    <Share2 size={20} />
                                </button>
                                <a href={fileUrl} download className="p-2 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-full transition-colors hidden md:flex">
                                    <Download size={20} />
                                </a>
                                <div className="w-px h-6 bg-slate-200 mx-1 hidden md:block" />
                                <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewport */}
                        <div className="relative grow bg-slate-100 overflow-hidden">
                            {isLoading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10">
                                    <Loader2 size={40} className="text-primary animate-spin mb-4" />
                                    <p className="text-slate-500 font-medium animate-pulse tracking-wide">MENYIAPKAN DOKUMEN...</p>
                                </div>
                            )}

                            <iframe
                                src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                className="w-full h-full border-none bg-white"
                                title={`Brosur ${appName}`}
                                onLoad={() => setIsLoading(false)}
                            />
                        </div>

                        {/* Mobile Actions (Sticky Bottom) */}
                        <div className="md:hidden flex items-center justify-evenly p-4 border-t border-slate-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                            <button onClick={handleShare} className="flex flex-col items-center gap-1 text-slate-600">
                                <Share2 size={20} />
                                <span className="text-[10px] font-bold uppercase">Bagikan</span>
                            </button>
                            <a href={fileUrl} target="_blank" download className="flex flex-col items-center gap-1 text-primary">
                                <Download size={20} />
                                <span className="text-[10px] font-bold uppercase">Simpan Offline</span>
                            </a>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}