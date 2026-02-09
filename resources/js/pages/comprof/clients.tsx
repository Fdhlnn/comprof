import { Head } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useEffect, useRef } from 'react';
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
    const speed = 0.5;

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let animationId: number;

        const startScroll = () => {
            slider.scrollLeft += speed;

            
            if (slider.scrollLeft >= slider.scrollWidth / 2) {
                slider.scrollLeft = 0;
            }

            animationId = requestAnimationFrame(startScroll);
        };

        animationId = requestAnimationFrame(startScroll);

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <MainLayout>
            <Head title="Client Reviews" />

            <section className="overflow-hidden bg-black py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
                        Client Reviews
                    </h2>
                    <p className="mx-auto mb-16 max-w-2xl text-center text-gray-400">
                        Apa kata mereka yang telah berkolaborasi dengan Faith
                        Industries.
                    </p>

                    {/* Slider */}
                    <div
                        ref={sliderRef}
                        className="scrollbar-hide flex gap-8 overflow-x-hidden"
                    >
                        {[...reviews, ...reviews].map((review, i) => (
                            <div
                                key={`${review.id}-${i}`}
                                className="min-w-[360px] rounded-2xl border border-neutral-800 bg-neutral-900 p-8"
                            >
                                <div className="mb-4 flex">
                                    {Array.from({
                                        length: review.rating,
                                    }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>

                                <p className="mb-8 leading-relaxed text-gray-300 italic">
                                    “{review.message}”
                                </p>

                                <div className="flex items-center gap-4 border-t border-neutral-800 pt-4">
                                    <img
                                        src={
                                            review.avatar ??
                                            '/images/client.jpg'
                                        }
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
