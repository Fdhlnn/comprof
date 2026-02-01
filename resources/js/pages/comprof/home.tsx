import { Head, Link } from '@inertiajs/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainLayout from '@/layouts/main-layout';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
    {
        id: 1,
        image: '/images/slide-1.jpg',
    },
    {
        id: 2,
        image: '/images/slide-2.jpg',
    },
    {
        id: 3,
        image: '/images/slide-3.jpg',
    },
];

export default function Home() {
    return (
        <MainLayout>
            <Head title="Home" />

            {/* HERO */}
            <section className="relative h-[calc(100vh-6rem)] bg-black">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop
                    className="h-full"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <img
                                src={slide.image}
                                className="h-full w-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* CTA */}
                <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-6">
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
            </section>
        </MainLayout>
    );
}
