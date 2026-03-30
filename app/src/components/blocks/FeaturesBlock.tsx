import * as Icons from 'lucide-react';

export default function FeaturesBlock({ data }: { data: any }) {
    return (
        <section className="py-16 px-6 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.features?.map((feat: any, idx: number) => {
                        // Pencarian Icon dinamis, fallback ke CheckCircle jika nama tidak valid
                        const IconComponent = (Icons as any)[feat.icon] || Icons.CheckCircle;

                        return (
                            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                                    style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }}
                                >
                                    <IconComponent size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}