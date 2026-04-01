// app/lib/constants/tech-stack.ts
import { ElementType } from 'react';
import { MonitorSmartphone, Server, Database, Cpu } from 'lucide-react';

export interface TechItem {
    name: string;
    iconPath: string;
}

export interface TechCategory {
    title: string;
    icon: ElementType;
    items: TechItem[];
}

export const TECH_STACK_DATA: TechCategory[] = [
    {
        title: 'Frontend & Mobile',
        icon: MonitorSmartphone,
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
        items: [
            { name: 'NestJS', iconPath: '/assets/tech stack/NestJS.png' },
            { name: 'Node.js', iconPath: '/assets/tech stack/nodejs.png' },
        ],
    },
    {
        title: 'Database & ORM',
        icon: Database,
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
        items: [
            { name: 'Ubuntu', iconPath: '/assets/tech stack/ubuntu.png' },
            { name: 'NGINX', iconPath: '/assets/tech stack/nginx.png' },
        ],
    },
];