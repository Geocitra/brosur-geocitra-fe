'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Mail, ArrowRight } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    // Kunci scroll background saat modal terbuka
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // KONFIGURASI KONTAK (Silakan ubah sesuai gambar yang Anda lampirkan)
    const CONTACT = {
        // Gunakan format 62 tanpa angka 0 di depan (Contoh: 628123456789)
        whatsapp: "6281584028188",
        email: "hello@geocitra.com",
        waMessage: "Halo Tim XGreen, saya tertarik untuk mendaftar XGreen Dev Academy. Boleh minta informasi lebih lanjut mengenai ketersediaan kuota dan jadwal?",
        emailSubject: "Pendaftaran XGreen Dev Academy - Batch Terbaru"
    };

    const handleWhatsApp = () => {
        const text = encodeURIComponent(CONTACT.waMessage);
        window.open(`https://wa.me/${CONTACT.whatsapp}?text=${text}`, '_blank');
    };

    const handleEmail = () => {
        window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.emailSubject)}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
                    >
                        {/* Header Area */}
                        <div className="relative bg-emerald-50 px-8 py-8 border-b border-emerald-100 text-center">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 bg-white rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-emerald-100">
                                <MessageCircle className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Pilih Jalur Pendaftaran</h3>
                            <p className="text-slate-600 text-sm font-medium">Tim kami siap membantu proses registrasi Anda ke XGreen Dev Academy.</p>
                        </div>

                        {/* Action Area */}
                        <div className="p-8 space-y-4">
                            {/* WhatsApp Button */}
                            <button
                                onClick={handleWhatsApp}
                                className="w-full group flex items-center justify-between p-5 bg-white border-2 border-emerald-100 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                        <MessageCircle className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-lg font-bold text-slate-900">WhatsApp</h4>
                                        <p className="text-sm text-slate-500 font-medium">Respon lebih cepat</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-emerald-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                            </button>

                            {/* Email Button */}
                            <button
                                onClick={handleEmail}
                                className="w-full group flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-lg font-bold text-slate-900">Email Resmi</h4>
                                        <p className="text-sm text-slate-500 font-medium">Untuk komunikasi formal</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>

                        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Secure & Fast Response</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}