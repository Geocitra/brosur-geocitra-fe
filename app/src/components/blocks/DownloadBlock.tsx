import { Download } from 'lucide-react';

export default function DownloadBlock({ data }: { data: any }) {
    const baseUrl = process.env.NEXT_PUBLIC_ASSET_URL || 'http://localhost:4005';
    const fileUrl = data.fileUrl.startsWith('http') ? data.fileUrl : `${baseUrl}${data.fileUrl}`;

    return (
        <section className="py-20 px-6 text-center">
            {/* Langsung pakai bg-primary */}
            <div className="max-w-3xl mx-auto rounded-3xl p-12 text-white shadow-xl bg-primary">
                <h2 className="text-3xl font-bold mb-6">Siap Menggunakan Aplikasi Ini?</h2>
                <p className="text-white/80 mb-8 text-lg">
                    Pelajari lebih lanjut mengenai spesifikasi, keunggulan, dan panduan lengkapnya melalui brosur resmi kami.
                </p>
                <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    /* Langsung pakai text-primary */
                    className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 text-primary"
                >
                    <Download size={20} />
                    {data.buttonText || 'Download Brosur (PDF)'}
                </a>
            </div>
        </section>
    );
}