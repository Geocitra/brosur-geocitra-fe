import HeroBlock from './blocks/HeroBlock';
import FeaturesBlock from './blocks/FeaturesBlock';
import DownloadBlock from './blocks/DownloadBlock';
import VideoBlock from './blocks/VideoBlock';
import FaqBlock from './blocks/FaqBlock';

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
    // 1. Sortir blocks secara ASC berdasarkan field 'order' dari database
    const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

    // 2. Mesin Switch-Case Render
    return (
        <div className="w-full flex flex-col">
            {sortedBlocks.map((block, index) => {
                switch (block.type) {
                    case 'HERO_BLOCK':
                        return <HeroBlock key={index} data={block.data} />;
                    case 'FEATURE_BLOCK':
                        return <FeaturesBlock key={index} data={block.data} />;
                    case 'DOWNLOAD_BLOCK':
                        return <DownloadBlock key={index} data={block.data} />;
                    case 'VIDEO_BLOCK':
                        return <VideoBlock key={index} data={block.data} />;
                    case 'FAQ_BLOCK': // <-- Tambahkan ini
                        return <FaqBlock key={index} data={block.data} />;
                    default:
                        // Logika fallback analis: Jika admin masukin tipe blok aneh di DB, abaikan secara silent di UI
                        console.warn(`[Block Factory] Block type [${block.type}] tidak dipetakan.`);
                        return null;
                }
            })}
        </div>
    );
}