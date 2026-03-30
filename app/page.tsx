import { api } from '@/app/lib/axios';
import BentoGrid from './components/BentoGrid';
import AuraBackground from './components/ui/AuraBackground';

// Menarik daftar semua brosur dari BE
async function getShowcases() {
  try {
    const response = await api.get('/showcase');
    // Asumsi BE mengembalikan array di response.data atau response.data.data
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data katalog brosur:', error);
    return [];
  }
}

export default async function CatalogPage() {
  const items = await getShowcases();

  return (
    <main className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">

      {/* Aura Global Katalog:
        Karena halaman utama bukan milik spesifik satu aplikasi,
        kita set warna Aura ke Biru Korporat Geocitra (#0ea5e9) 
      */}
      <div style={{ '--primary-color': '#0ea5e9' } as React.CSSProperties}>
        <AuraBackground />
      </div>

      <div className="enterprise-container relative z-10 pt-24 md:pt-32 pb-24">

        {/* The Grand Header */}
        <div className="max-w-4xl mb-16 md:mb-24">
          <span className="inline-block py-2 px-5 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-slate-600 font-extrabold text-sm tracking-widest mb-8 border border-white uppercase">
            Geocitra Showcase Portal
          </span>
          <h1 className="text-[--fluid-h1] font-extrabold tracking-tight leading-[1.05] mb-8">
            Solusi Digital <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-400">
              Terintegrasi.
            </span>
          </h1>
          <p className="text-[--fluid-p] leading-relaxed max-w-2xl font-medium">
            Jelajahi ekosistem perangkat lunak kami. Pilih aplikasi yang sesuai dengan kebutuhan instansi Anda, dan pelajari spesifikasi serta arsitektur teknisnya melalui brosur interaktif.
          </p>
        </div>

        {/* The Asymmetric Grid Engine */}
        <BentoGrid items={items} />

      </div>

      {/* Simple Footer khusus halaman utama */}
      <footer className="relative z-10 w-full py-12 text-center border-t border-slate-200/50 bg-white/50 backdrop-blur-sm mt-12">
        <p className="text-slate-400 font-bold text-sm tracking-wide">© {new Date().getFullYear()} CV Geocitra. All Rights Reserved.</p>
      </footer>
    </main>
  );
}