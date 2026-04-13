'use client';

import { motion, Variants } from 'framer-motion';
import { CreditCard, Video, Sparkles, Server } from 'lucide-react';
import { useParams } from 'next/navigation'; // Tambah impor params

export default function IntegratedSystemBlock() {
    // 1. Logika Deteksi Bahasa
    const params = useParams();
    const slug = typeof params?.slug === 'string' ? params.slug : '';
    const isEnglish = slug.endsWith('-en');

    // 2. Kamus Translasi Konten Statis
    const t = {
        badge: isEnglish ? "Ecosystem Infrastructure" : "Infrastruktur Ekosistem",
        titlePrefix: isEnglish ? "Powered by" : "Ditenagai oleh",
        titleHighlight: isEnglish ? "Integrated Systems" : "Sistem Terintegrasi",
        subtitle: isEnglish
            ? "We don't just build apps. We build scalable, secure digital ecosystems ready to support your business maneuvers."
            : "Kami tidak sekadar membuat aplikasi. Kami membangun ekosistem digital yang scalable, aman, dan siap menopang manuver bisnis Anda."
    };

    // 3. Data Sistem Dinamis (Ditaruh di dalam fungsi agar bisa baca isEnglish)
    const systems = [
        {
            title: isEnglish ? "Online Payment" : "Online Payment",
            description: isEnglish
                ? "Secure payment gateway integration for real-time transactions with auto-reconciliation."
                : "Integrasi gateway pembayaran aman untuk transaksi real-time dengan auto-rekonsiliasi.",
            icon: <CreditCard className="w-7 h-7" />,
            theme: "from-blue-500 to-cyan-400",
            shadow: "shadow-blue-500/20",
            borderHover: "hover:border-blue-300",
            bgLight: "bg-blue-50",
            textColor: "text-blue-600",
            status: isEnglish ? "Secured" : "Secured"
        },
        {
            title: isEnglish ? "Video Chat API" : "Video Chat API",
            description: isEnglish
                ? "Embedded visual communication within the ecosystem without third-party latency."
                : "Komunikasi visual tertanam langsung dalam ekosistem tanpa latensi pihak ketiga.",
            icon: <Video className="w-7 h-7" />,
            theme: "from-emerald-500 to-teal-400",
            shadow: "shadow-emerald-500/20",
            borderHover: "hover:border-emerald-300",
            bgLight: "bg-emerald-50",
            textColor: "text-emerald-600",
            status: isEnglish ? "Real-time" : "Real-time"
        },
        {
            title: isEnglish ? "AI Middleware" : "AI Middleware",
            description: isEnglish
                ? "Intelligent data processing serving as a bridge for predictive analytics and advanced automation."
                : "Pemrosesan data cerdas sebagai jembatan analitik prediksi dan otomasi tingkat lanjut.",
            icon: <Sparkles className="w-7 h-7" />,
            theme: "from-purple-500 to-fuchsia-400",
            shadow: "shadow-purple-500/20",
            borderHover: "hover:border-purple-300",
            bgLight: "bg-purple-50",
            textColor: "text-purple-600",
            status: isEnglish ? "Active" : "Active"
        }
    ];

    // Variants (Tetap sama)
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 80, damping: 15 }
        }
    };

    return (
        <section className="relative py-28 bg-[#f8fafc] overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="2" fill="currentColor" className="text-slate-900" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dotGrid)" />
                </svg>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-tr from-blue-100/40 via-emerald-100/20 to-purple-100/40 rounded-full blur-[100px]" />
            </div>

            <div className="enterprise-container relative z-10 px-4 md:px-8 max-w-7xl mx-auto">

                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm"
                    >
                        <Server className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-black text-slate-600 uppercase tracking-[0.2em]">{t.badge}</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
                    >
                        {t.titlePrefix} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-emerald-500">{t.titleHighlight}</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start"
                >
                    {systems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className={`relative group ${index === 1 ? 'md:-mt-12' : 'mt-0'}`}
                        >
                            {index < 2 && (
                                <div className="hidden md:block absolute top-1/2 -right-8 lg:-right-12 w-8 lg:w-12 h-0.5 bg-linear-to-r from-slate-200 to-transparent translate-y-[-50%] z-0" />
                            )}

                            <div className={`relative z-10 h-full bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] shadow-xl ${item.shadow} border border-slate-100 ${item.borderHover} transition-all duration-500 hover:-translate-y-2 group-hover:bg-white`}>

                                <div className="flex items-start justify-between mb-8">
                                    <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${item.theme} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                        <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />
                                        <div className="relative z-10">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${item.bgLight} border border-white/50`}>
                                        <div className={`w-2 h-2 rounded-full bg-linear-to-r ${item.theme} animate-ping`} style={{ animationDuration: '3s' }} />
                                        <span className={`text-[11px] font-bold ${item.textColor} uppercase tracking-wider`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed font-medium">
                                    {item.description}
                                </p>

                                <div className="absolute bottom-0 left-8 right-8 h-0.75 rounded-t-full bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}