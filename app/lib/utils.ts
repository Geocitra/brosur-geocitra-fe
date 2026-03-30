import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fungsi cerdas untuk menggabungkan class Tailwind secara dinamis.
 * Mencegah konflik (misal: "bg-red-500 bg-blue-500" akan otomatis diambil yang terakhir).
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}