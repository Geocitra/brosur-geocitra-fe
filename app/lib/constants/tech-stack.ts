import { ElementType } from 'react';
import { MonitorSmartphone, Server, Database, Cpu, Workflow } from 'lucide-react';

export interface TechItem {
    name: string;
    iconPath: string;
}

export interface TechCategory {
    title: string;
    icon: ElementType;
    description: string;
    items: TechItem[];
}

export const TECH_STACK_DATA: TechCategory[] = [
    {
        title: 'Frontend & Mobile',
        icon: MonitorSmartphone,
        description: 'Antarmuka responsif dan aplikasi lintas platform dengan performa tingkat tinggi.',
        items: [
            { name: 'Next.js', iconPath: '/assets/tech stack/nextjs.png' },
            { name: 'React', iconPath: '/assets/tech stack/react.png' },
            { name: 'Flutter', iconPath: '/assets/tech stack/flutter.png' },
            { name: 'TypeScript', iconPath: '/assets/tech stack/typescript.png' },
            { name: 'JavaScript', iconPath: '/assets/tech stack/js.png' },
            { name: 'HTML5', iconPath: '/assets/tech stack/html.png' },
            { name: 'CSS3', iconPath: '/assets/tech stack/css.png' },
        ],
    },
    {
        title: 'Backend Services',
        icon: Server,
        description: 'Layanan mikro dan arsitektur server yang scalable, aman, serta modular.',
        items: [
            { name: 'NestJS', iconPath: '/assets/tech stack/NestJS.png' },
            { name: 'Node.js', iconPath: '/assets/tech stack/nodejs.png' },
            { name: 'Golang', iconPath: '/assets/tech stack/golang.png' },
            { name: 'Python', iconPath: '/assets/tech stack/python.png' },
            { name: 'Spring Boot', iconPath: '/assets/tech stack/springboot.png' },
        ],
    },
    {
        title: 'Database & ORM',
        icon: Database,
        description: 'Penyimpanan data relasional, NoSQL, dan pemrosesan geospasial presisi.',
        items: [
            { name: 'PostgreSQL', iconPath: '/assets/tech stack/postgresql.png' },
            { name: 'PostGIS', iconPath: '/assets/tech stack/postgis.png' },
            { name: 'MongoDB', iconPath: '/assets/tech stack/mongodb.png' },
            { name: 'Prisma', iconPath: '/assets/tech stack/prisma.png' },
        ],
    },
    {
        title: 'Infrastructure',
        icon: Cpu,
        description: 'Lingkungan server yang tangguh dengan manajemen routing tingkat lanjut.',
        items: [
            { name: 'Ubuntu', iconPath: '/assets/tech stack/ubuntu.png' },
            { name: 'NGINX', iconPath: '/assets/tech stack/nginx.png' },
            { name: 'Docker', iconPath: '/assets/tech stack/docker.png' },
        ],
    },
    // LOGICAL UPDATE: Kategori "Hero" untuk Integrated Systems (9 Items)
    {
        title: 'AI, RTC & Integrations',
        icon: Workflow,
        description: 'Pemrosesan kecerdasan buatan, telekomunikasi real-time, dan gateway pembayaran presisi tinggi.',
        items: [
            // Blok AI / ML
            { name: 'OpenAI API', iconPath: '/assets/tech stack/openai.png' },
            { name: 'Anthropic Claude', iconPath: '/assets/tech stack/anthropic.png' },
            { name: 'Google Vertex AI', iconPath: '/assets/tech stack/vertex.png' },
            { name: 'TensorFlow', iconPath: '/assets/tech stack/tensorflow.png' },
            // Blok RTC (Real-Time Comm)
            { name: 'WebRTC', iconPath: '/assets/tech stack/webrtc.png' },
            { name: 'Socket.io', iconPath: '/assets/tech stack/socketio.png' },
            // Blok Payment Gateway
            { name: 'Midtrans', iconPath: '/assets/tech stack/midtrans.png' },
            { name: 'Xendit', iconPath: '/assets/tech stack/xendit.png' },
            { name: 'iPaymu', iconPath: '/assets/tech stack/ipaymu.png' },
        ],
    },
];