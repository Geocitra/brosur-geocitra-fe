'use client';

import React from 'react';
import HeroBlock from './blocks/HeroBlock';
import FeaturesBlock from './blocks/FeaturesBlock';
import DownloadBlock from './blocks/DownloadBlock';
import FaqBlock from './blocks/FaqBlock';
import VideoBlock from './blocks/VideoBlock';

// Peta Komponen: Menghubungkan string 'type' dari JSON ke Komponen React
const blockComponents: { [key: string]: React.ElementType } = {
    HeroBlock: HeroBlock,
    FeaturesBlock: FeaturesBlock,
    DownloadBlock: DownloadBlock,
    FaqBlock: FaqBlock,
    VideoBlock: VideoBlock,
};

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
    if (!blocks || blocks.length === 0) {
        return null;
    }

    // [INTELLIGENCE INJECTION]
    // Kita memindai array blocks untuk mencari DownloadBlock terlebih dahulu.
    // Tujuannya untuk mengekstrak URL PDF dan menjadikannya variabel global
    // di tingkat halaman ini, sehingga HeroBlock bisa menggunakannya untuk tombol "Lihat Presentasi".
    const downloadBlock = blocks.find((b: any) => b.type === 'DownloadBlock');
    const globalFileUrl = downloadBlock?.data?.fileUrl || '';

    return (
        // flex-col tanpa batasan lebar, karena setiap blok mengatur lebarnya sendiri 
        // menggunakan utilitas .enterprise-container
        <div className="flex flex-col w-full overflow-hidden">
            {blocks.map((block, index) => {
                const Component = blockComponents[block.type];

                if (!Component) {
                    console.warn(`[Block Factory] Block type [${block.type}] tidak dipetakan.`);
                    return null;
                }

                // Kita menduplikasi data asli dari JSON
                let injectedData = { ...block.data };

                // Jika komponen yang akan di-render adalah HeroBlock,
                // kita suntikkan URL PDF yang sudah kita temukan sebelumnya.
                if (block.type === 'HeroBlock') {
                    injectedData.extractedFileUrl = globalFileUrl;
                }

                // Me-render komponen secara dinamis dengan data yang sudah disempurnakan
                return <Component key={`${block.type}-${index}`} data={injectedData} />;
            })}
        </div>
    );
}