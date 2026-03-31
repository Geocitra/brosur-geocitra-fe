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

                // Me-render komponen secara dinamis dan mengirimkan data JSON ke dalamnya
                return <Component key={`${block.type}-${index}`} data={block.data} />;
            })}
        </div>
    );
}