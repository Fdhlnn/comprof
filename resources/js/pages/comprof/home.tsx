import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import MainLayout from '@/layouts/main-layout';

const slides = [
    { id: 1, image: '/images/slide-1.jpg' },
    { id: 2, image: '/images/slide-2.jpg' },
    { id: 3, image: '/images/slide-3.jpg' },
];

export default function Home() {
    const [current, setCurrent] = useState(0);

    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <MainLayout>
            <Head title="Home" />

            {/* HERO */}
            <section className="relative py-12">
                <div className="relative mx-auto h-[500px] w-[90%] max-w-6xl overflow-hidden rounded-2xl shadow-lg md:h-[600px]">
                    {slides.map((slide, index) => (
                        <img
                            key={slide.id}
                            src={slide.image}
                            alt={`Slide ${slide.id}`}
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                                index === current ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ))}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* CTA */}
                    <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4">
                        <div className="flex gap-4">
                            <Link
                                href="/products"
                                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
                            >
                                See Products
                            </Link>

                            <Link
                                href="/about"
                                className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                            >
                                About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
