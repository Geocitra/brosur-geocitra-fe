import axios from 'axios';

export const api = axios.create({
    // Otomatis menembak http://localhost:4005/api (dari .env.local lo)
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005/api',
    headers: {
        'Content-Type': 'application/json',
    },
});