import { Head } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useRef } from 'react';
import MainLayout from '@/layouts/main-layout';

type Client = {
    id: number;
    name: string;
    company: string;
    avatar: string | null;
    rating: number;
    message: string;
};

export default function Clients({ reviews }: { reviews: Client[] }) {
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
                    {/* Header */}
                    <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
                        Client Reviews
                    </h2>
                    <p className="mx-auto mb-16 max-w-2xl text-center text-gray-400">
                        Apa kata mereka yang telah berkolaborasi dengan Faith
                        Industries.
                    </p>

                    {/* Navigation Buttons */}
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

                                {/* Client Info */}
                                <div className="flex items-center gap-4 border-t border-neutral-800 pt-4">
                                    <img
                                        src={
                                            review.avatar ??
                                            '/images/client.jpg'
                                        }
                                        alt={review.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-white">
                                            {review.name}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {review.company}
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
