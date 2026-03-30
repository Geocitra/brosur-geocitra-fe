'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PdfPreviewProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    productName: string;
}

export default function PdfPreviewOverlay({ isOpen, onClose, pdfUrl, productName }: PdfPreviewProps) {
    // Mengunci scroll pada body saat overlay terbuka
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                // Wrapper FIXED ini yang menyelesaikan isu perhitungan offset dan mengunci layar
                <div className="fixed inset-0 z-50 flex justify-end">

                    {/* Backdrop Blur - Klik untuk menutup */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Panel Slide-over Premium */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0.5 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        // Relative di sini memastikan iframe dan elemen absolut di dalamnya terukur dengan benar
                        className="relative w-full max-w-4xl h-full bg-white/80 backdrop-blur-2xl shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l border-white/50 flex flex-col"
                    >
                        {/* Header Panel */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Preview: {productName}</h3>
                                <p className="text-sm text-slate-500">Brosur Digital Eksekutif</p>
                            </div>
                            <div className="flex gap-3">
                                <a
                                    href={pdfUrl}
                                    download
                                    className="px-4 py-2 rounded-lg bg-(--primary-color)/10 text-(--primary-color) font-semibold hover:bg-(--primary-color)/20 transition-colors"
                                >
                                    Download PDF
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                >
                                    {/* Icon Close (SVG sederhana) */}
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Area Iframe PDF - Container harus flex-1 agar tingginya dinamis mengisi sisa ruang */}
                        <div className="flex-1 w-full bg-slate-100/50 p-4 relative">
                            {/* Fallback jika browser memblokir iframe PDF */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 text-slate-400">
                                <span className="animate-pulse">Memuat Dokumen...</span>
                            </div>
                            <iframe
                                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                className="w-full h-full rounded-xl border border-slate-200 shadow-inner bg-white"
                                title={`Brosur ${productName}`}
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}