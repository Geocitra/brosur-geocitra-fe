export default function VideoBlock({ data }: { data: any }) {
    if (!data.videoUrl) return null;

    return (
        <section className="py-16 px-6 flex justify-center bg-white">
            <div className="w-full max-w-4xl aspect-video bg-slate-200 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
                <iframe
                    className="w-full h-full"
                    src={data.videoUrl}
                    title="Video Presentation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </section>
    );
}