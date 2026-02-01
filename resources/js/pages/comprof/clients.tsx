import { Head } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useRef } from 'react';
import MainLayout from '@/layouts/main-layout';

const reviews = [
    {
        id: 1,
        name: 'Rizky Pratama',
        role: 'Founder – Urban Streetwear',
        avatar: '/images/client.jpg',
        rating: 5,
        message:
            'Faith Industries selalu deliver desain yang fresh dan relevan dengan market kami. Kualitas produknya juga konsisten.',
    },
    {
        id: 2,
        name: 'Nadya Putri',
        role: 'Creative Director – Local Studio',
        avatar: '/images/client.jpg',
        rating: 5,
        message:
            'Kolaborasi berjalan sangat smooth. Timnya responsif dan konsep yang ditawarkan selalu matang.',
    },
    {
        id: 3,
        name: 'Bagas Aditya',
        role: 'Event Organizer',
        avatar: '/images/client.jpg',
        rating: 4,
        message:
            'Merchandise dari Faith Industries selalu jadi highlight di setiap event. Packaging rapi dan eksklusif.',
    },
];

export default function Reviews() {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!sliderRef.current) return;
        sliderRef.current.scrollBy({
            left: direction === 'left' ? -350 : 350,
            behavior: 'smooth',
        });
    };

    return (
        <MainLayout>
            <Head title="Client Reviews" />

            <section className="bg-black py-24">
                <div className="relative mx-auto max-w-6xl px-6">
                    <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
                        Client Reviews
                    </h2>
                    <p className="mx-auto mb-16 max-w-2xl text-center text-gray-400">
                        Apa kata mereka yang telah berkolaborasi dengan Faith
                        Industries.
                    </p>

                    {/* Navigation */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute top-1/2 left-0 hidden -translate-y-1/2 rounded-full bg-neutral-900 p-3 transition hover:bg-neutral-800 md:block"
                    >
                        <ChevronLeft className="text-white" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute top-1/2 right-0 hidden -translate-y-1/2 rounded-full bg-neutral-900 p-3 transition hover:bg-neutral-800 md:block"
                    >
                        <ChevronRight className="text-white" />
                    </button>

                    {/* Slider */}
                    <div
                        ref={sliderRef}
                        className="scrollbar-hide flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-4"
                    >
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="min-w-[320px] snap-start rounded-2xl border border-neutral-800 bg-neutral-900 p-8 transition hover:border-white/20 md:min-w-[360px]"
                            >
                                {/* Rating */}
                                <div className="mb-4 flex">
                                    {Array.from({ length: review.rating }).map(
                                        (_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                        ),
                                    )}
                                </div>

                                {/* Message */}
                                <p className="mb-8 leading-relaxed text-gray-300 italic">
                                    “{review.message}”
                                </p>

                                {/* Client */}
                                <div className="flex items-center gap-4 border-t border-neutral-800 pt-4">
                                    <img
                                        src={review.avatar}
                                        alt={review.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-white">
                                            {review.name}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {review.role}
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
