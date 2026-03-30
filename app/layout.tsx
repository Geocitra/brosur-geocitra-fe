import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

// Konfigurasi Font Enterprise
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta', // Daftarkan sebagai CSS Variable
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
    // 'scroll-smooth' adalah trik CSS native agar ketika user klik link jangkar, 
    // halamannya meluncur mulus, nggak patah-patah.
    <html lang="id" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased text-slate-900 bg-white`}
      >
        {children}
      </body>
    </html>
  );
}