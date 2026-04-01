// app/types/block.ts

// Enum untuk mode tema (menentukan kontras teks)
export type ThemeMode = 'light' | 'dark';

// Enum untuk tipe background yang valid dari JSON Backend
export type BackgroundType = 'transparent' | 'solid' | 'gradient' | 'image';

// Kontrak objek tema
export interface ThemeConfig {
    type: BackgroundType;
    color?: string;    // Digunakan jika type 'solid' atau 'gradient' (Hex code)
    imageUrl?: string; // Digunakan jika type 'image'
    mode?: ThemeMode;  // Menentukan warna teks di dalam wrapper (putih/gelap)
}

// Kontrak dasar untuk setiap struktur Block dari JSON
export interface BaseBlock {
    type: string;        // Penentu komponen: 'hero', 'features', 'faq', dll
    theme?: ThemeConfig; // Injeksi validator visual kita
    content: any;        // Tipe any digunakan karena struktur konten tiap blok berbeda-beda
}