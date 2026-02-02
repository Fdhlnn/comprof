import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';

type GalleryItem = {
    id: number;
    image: string | null;
    title: string;
};

export default function Gallery({ gallery }: { gallery: GalleryItem[] }) {
    return (
        <MainLayout>
            <Head title="Gallery" />

            <section className="bg-background py-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                            Gallery
                        </h1>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            Dokumentasi visual dari perjalanan, karya, dan
                            identitas Faith Industries.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {gallery.map((item) => (
                            <div
                                key={item.id}
                                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-neutral-900"
                            >
                                {/* Image */}
                                <img
                                    src={
                                        item.image ??
                                        '/images/gallery-placeholder.jpg'
                                    }
                                    alt={item.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 flex items-end bg-black/60 opacity-0 transition group-hover:opacity-100">
                                    <div className="p-4">
                                        <p className="text-sm font-semibold text-white">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
