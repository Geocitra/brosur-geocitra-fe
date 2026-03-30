'use client';

import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturesBlock({ data }: { data: any }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="py-24 bg-slate-50/50 border-y border-slate-100">
            <div className="enterprise-container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {data.features?.map((feat: any, idx: number) => {
                        const IconComponent = (Icons as any)[feat.icon] || Icons.CheckCircle;

                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"
                                    style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }}
                                >
                                    <IconComponent size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                                    {feat.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                                    {feat.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}