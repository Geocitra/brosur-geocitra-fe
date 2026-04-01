import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* konfigurasi lain yang sudah ada sebelumnya tetap dibiarkan */

  images: {
    // Mendaftarkan array kualitas kompresi yang diizinkan oleh sistem
    // 75 adalah default bawaan, 90 adalah yang kita butuhkan untuk logo, 
    // 100 opsional jika nanti ada gambar hero/banner yang butuh ketajaman absolut
    qualities: [75, 90, 100],
  },
};

export default nextConfig;