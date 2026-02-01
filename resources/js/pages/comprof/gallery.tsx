import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';

const galleries = [
    {
        id: 1,
        image: '/images/gallery-1.jpg',
        title: 'Faith Industries – Street Campaign',
    },
    {
        id: 2,
        image: '/images/gallery-2.jpg',
        title: 'Limited Edition Merchandise',
    },
    {
        id: 3,
        image: '/images/gallery-3.jpg',
        title: 'Behind The Scene Production',
    },
    {
        id: 4,
        image: '/images/gallery-4.jpg',
        title: 'Urban Lifestyle Collection',
    },
    {
        id: 5,
        image: '/images/gallery-5.jpg',
        title: 'Faith Industries Event',
    },
    {
        id: 6,
        image: '/images/gallery-6.jpg',
        title: 'Creative Process',
    },
];

export default function Gallery() {
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
                        {galleries.map((item) => (
                            <div
                                key={item.id}
                                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-neutral-900"
                            >
                                {/* Image */}
                                <img
                                    src={item.image}
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
