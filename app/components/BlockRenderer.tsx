'use client';

import React from 'react';
import HeroBlock from './blocks/HeroBlock';
import FeaturesBlock from './blocks/FeaturesBlock';
import SocialProofBlock from './blocks/SocialProofBlock'; // Import Komponen Baru
import FaqBlock from './blocks/FaqBlock';
import VideoBlock from './blocks/VideoBlock';

// Peta Komponen: Menghubungkan string 'type' dari JSON ke Komponen React
const blockComponents: { [key: string]: React.ElementType } = {
    HeroBlock: HeroBlock,
    FeaturesBlock: FeaturesBlock,
    SocialProofBlock: SocialProofBlock, // Mendaftarkan SocialProofBlock ke dalam mesin
    FaqBlock: FaqBlock,
    VideoBlock: VideoBlock,
};

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
    if (!blocks || blocks.length === 0) {
        return null;
    }

    // [ANALISA ARSITEKTUR]: 
    // Logika Intelligence Injection (Global File URL) TELAH DIHAPUS.
    // Berdasarkan prinsip Low Coupling, setiap komponen (seperti HeroBlock) 
    // kini memegang tanggung jawab atas datanya sendiri dari JSON Payload.

    return (
        // flex-col tanpa batasan lebar, karena setiap blok mengatur lebarnya sendiri 
        // menggunakan utilitas .enterprise-container
        <div className="flex flex-col w-full overflow-hidden">
            {blocks.map((block, index) => {
                const Component = blockComponents[block.type];

                if (!Component) {
                    console.warn(`[Block Factory] Block type [${block.type}] tidak dipetakan di BlockRenderer.`);
                    return null;
                }

                // Me-render komponen secara dinamis. 
                // block.data langsung dilempar (pass down) tanpa perlu modifikasi/injeksi tambahan.
                return <Component key={`${block.type}-${index}`} data={block.data} />;
            })}
        </div>
    );
}