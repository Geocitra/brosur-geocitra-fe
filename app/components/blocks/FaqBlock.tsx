'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/app/lib/utils';

export default function FaqBlock({ data }: { data: any }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white">
            <div className="enterprise-container max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-[--fluid-h2] font-extrabold tracking-tight">
                        {data.title || 'FAQ'}
                    </h2>
                    <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full" />
                </div>

                <div className="space-y-4">
                    {data.items?.map((item: any, idx: number) => (
                        <div
                            key={idx}
                            className={cn(
                                "border rounded-2xl transition-all duration-300",
                                activeIndex === idx ? "border-primary shadow-lg shadow-primary/5" : "border-slate-100 hover:border-slate-200"
                            )}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                            >
                                <span className={cn(
                                    "text-lg md:text-xl font-bold transition-colors",
                                    activeIndex === idx ? "text-primary" : "text-slate-900"
                                )}>
                                    {item.q}
                                </span>
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                    activeIndex === idx ? "bg-primary text-white rotate-180" : "bg-slate-100 text-slate-500"
                                )}>
                                    {activeIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 md:px-8 pb-8 text-slate-600 text-base md:text-lg leading-relaxed">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}