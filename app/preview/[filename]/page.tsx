'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { useInView } from 'react-intersection-observer';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function SmartViewer() {
    const params = useParams();
    const router = useRouter();

    const [numPages, setNumPages] = useState<number>(0);
    const [showCTA, setShowCTA] = useState(false);
    const [containerWidth, setContainerWidth] = useState(800);
    const containerRef = useRef<HTMLDivElement>(null);

    // SENSOR HALAMAN TERAKHIR
    const { ref: lastPageRef, inView: isLastPageVisible } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const baseUrl = 'https://brosur.geocitra.com/api';
    const pdfUrl = `${baseUrl}/uploads/${params.filename}`;
    const themeColor = '#0ea5e9';

    useEffect(() => {
        if (isLastPageVisible) {
            const timer = setTimeout(() => setShowCTA(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [isLastPageVisible]);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(Math.min(containerRef.current.clientWidth - 32, 1000));
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        setTimeout(updateWidth, 100);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <main
            // FIX: Tailwind v4 syntax untuk CSS Variable
            className="relative min-h-screen bg-slate-950 flex flex-col font-sans overflow-x-hidden selection:bg-(--primary-color) selection:text-white"
            style={{ '--primary-color': themeColor } as React.CSSProperties}
        >
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-20" style={{ background: 'var(--primary-color)' }} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-10 bg-slate-500" />
            </div>

            <header className="sticky top-0 z-50 w-full bg-slate-950/60 backdrop-blur-2xl border-b border-white/5 transition-all">
                <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors shadow-sm group"
                        >
                            <ArrowLeft size={18} className="text-slate-300 group-hover:text-white transition-colors" />
                        </button>

                        <Image
                            src="/logogeocitra.png"
                            alt="Geocitra"
                            width={130}
                            height={32}
                            className="object-contain filter grayscale brightness-200 hidden md:block"
                            style={{ width: 'auto', height: 'auto' }}
                            priority
                        />
                    </div>

                    <a
                        href={pdfUrl}
                        download
                        // FIX: bg-(--primary-color)
                        className="flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full bg-(--primary-color) text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_-5px_var(--primary-color)]"
                    >
                        <Download size={16} /> <span className="hidden md:inline">Unduh Arsip</span><span className="md:hidden">Unduh</span>
                    </a>
                </div>
            </header>

            {/* FIX: flex-grow diubah jadi grow */}
            <div className="relative z-10 grow flex flex-col items-center py-8 md:py-12 px-2 md:px-4" ref={containerRef}>
                <div className="w-full max-w-5xl flex justify-center">
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            // FIX: text-(--primary-color)
                            <div className="h-[60vh] w-full flex flex-col items-center justify-center text-(--primary-color) animate-pulse gap-4">
                                {/* FIX: border-(--primary-color) */}
                                <div className="w-10 h-10 rounded-full border-t-4 border-(--primary-color) animate-spin shadow-[0_0_30px_var(--primary-color)]" />
                                <span className="font-bold tracking-[0.3em] text-xs uppercase text-slate-400">Memuat Dokumen...</span>
                            </div>
                        }
                    >
                        <div className="flex flex-col gap-6 md:gap-10 items-center pb-32">
                            {Array.from(new Array(numPages), (el, index) => {
                                const isLastPage = index + 1 === numPages;

                                return (
                                    <motion.div
                                        key={`page_${index + 1}`}
                                        ref={isLastPage ? lastPageRef : null}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "100px" }}
                                        // FIX: rounded-2xl dan md:rounded-4xl
                                        className="relative bg-white/5 backdrop-blur-xl p-2 md:p-4 rounded-2xl md:rounded-4xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
                                    >
                                        <Page
                                            pageNumber={index + 1}
                                            width={containerWidth}
                                            className="rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-white"
                                            renderTextLayer={true}
                                            renderAnnotationLayer={true}
                                        />

                                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold shadow-lg">
                                            {index + 1}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </Document>
                </div>
            </div>

            <AnimatePresence>
                {showCTA && (
                    <motion.div
                        initial={{ y: 150, opacity: 0, scale: 0.8, rotate: 2 }}
                        animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ y: 150, opacity: 0, scale: 0.8, rotate: -2 }}
                        transition={{ type: "spring", stiffness: 250, damping: 25 }}
                        className="fixed bottom-6 md:bottom-12 right-0 md:right-12 z-50 w-full md:max-w-sm px-4 md:px-0"
                    >
                        {/* FIX: rounded-4xl */}
                        <div className="relative overflow-hidden bg-slate-900/95 backdrop-blur-3xl border border-white/10 p-6 md:p-8 rounded-4xl shadow-[0_30px_80px_-15px_rgba(0,0,0,1)]">
                            {/* FIX: bg-(--primary-color) */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-(--primary-color) rounded-full blur-[70px] opacity-20 pointer-events-none" />

                            <div className="relative z-10">
                                {/* FIX: bg-(--primary-color) */}
                                <div className="w-12 h-12 rounded-2xl bg-(--primary-color) flex items-center justify-center mb-5 shadow-[0_10px_20px_-5px_var(--primary-color)]">
                                    <Sparkles size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter mb-2 leading-tight">
                                    Eksplorasi Ekosistem Digital Kami.
                                </h3>
                                <p className="text-slate-400 text-xs md:text-sm mb-6 font-medium leading-relaxed">
                                    Brosur telah selesai diulas. Ingin melihat detail teknis lebih lanjut?
                                </p>

                                <div className="flex gap-3">
                                    <button onClick={() => setShowCTA(false)} className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-[10px] uppercase tracking-[0.2em] transition-colors">
                                        Tutup
                                    </button>
                                    <button onClick={() => router.back()} className="flex-1 bg-white text-slate-950 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-slate-200 active:scale-95 transition-all shadow-lg">
                                        Kembali ke Web <ArrowLeft size={16} className="rotate-135" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}