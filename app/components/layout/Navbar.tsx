'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ appName }: { appName: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Sticky Navigation dengan efek Glassmorphism dari globals.css
        z-50 memastikan dia selalu berada di lapisan paling atas 
      */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-panel">
                <div className="enterprise-container flex items-center justify-between h-20">

                    {/* Brand & Identity Area */}
                    <div className="flex items-center gap-2">
                        <span className="font-extrabold text-2xl tracking-tighter text-primary">
                            GEOCITRA
                        </span>
                        <span className="hidden md:inline-block w-px h-6 bg-slate-300 mx-4"></span>
                        <span className="hidden md:inline-block text-sm font-semibold text-slate-500 uppercase tracking-widest">
                            {appName}
                        </span>
                    </div>

                    {/* Desktop Actions (Tersembunyi di Mobile) */}
                    <div className="hidden md:flex items-center gap-8">
                        <span className="text-sm font-semibold text-slate-500">
                            Showcase Portal
                        </span>
                        {/* Tombol dengan hover effect yang elegan */}
                        <button
                            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                            className="text-sm font-bold text-white bg-primary px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                        >
                            Unduh Brosur
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay dengan Framer Motion */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="fixed inset-x-0 top-20 z-40 bg-white border-b border-slate-100 shadow-xl md:hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Aplikasi Saat Ini
                            </span>
                            <span className="font-bold text-xl text-slate-900 mb-4 pb-4 border-b border-slate-100">
                                {appName}
                            </span>

                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                                }}
                                className="text-base text-left font-bold text-primary py-2"
                            >
                                Unduh Brosur PDF
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}