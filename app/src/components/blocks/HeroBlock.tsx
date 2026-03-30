export default function HeroBlock({ data }: { data: any }) {
    return (
        <section className="flex flex-col items-center text-center py-20 px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
                {data.title}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mb-10">
                {data.description}
            </p>
            {data.imageUrl && (
                <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={data.imageUrl}
                        alt={data.title}
                        className="w-full h-auto object-cover"
                    />
                </div>
            )}
        </section>
    );
}