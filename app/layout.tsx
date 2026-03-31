import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

// Konfigurasi Font Enterprise - Menggunakan Plus Jakarta Sans agar terlihat modern
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Geocitra Showcase',
  description: 'Katalog Aplikasi Resmi CV Geocitra',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /** * [FIX LOG] Menambahkan 'data-scroll-behavior="smooth"' 
     * Ini untuk membungkam warning Next.js dan memastikan transisi antar rute tetap stabil
     */
    <html lang="id" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased text-slate-900 bg-slate-50`}
      >
        {/* Container Utama: 
            Gue kasih min-h-screen dan flex-col supaya footer selalu nempel di bawah
            walaupun kontennya sedikit.
        */}
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}