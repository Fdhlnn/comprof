import { Head } from '@inertiajs/react';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import MainLayout from '@/layouts/main-layout';

type EventStatus = 'upcoming' | 'ongoing' | 'past';

type EventItem = {
    id: number;
    title: string;
    description: string;
    date: string;
    location?: string;
    image?: string;
    status?: EventStatus | null;
};

const statusStyle: Record<EventStatus, string> = {
    upcoming: 'bg-blue-500/10 text-blue-500',
    ongoing: 'bg-green-500/10 text-green-500',
    past: 'bg-neutral-500/10 text-neutral-400',
};

export default function EventDetail({ event }: { event: EventItem }) {
    const status = event.status ?? 'upcoming';

    return (
        <MainLayout>
            <Head title={event.title} />

            <section className="bg-background py-24">
                <div className="mx-auto max-w-5xl px-6">
                    {/* Back Button */}
                    <button
                        onClick={() => window.history.back()}
                        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                        <ArrowLeft size={16} />
                        Back to Events
                    </button>

                    {/* Image */}
                    {event.image && (
                        <div className="mb-10 overflow-hidden rounded-2xl">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="h-[420px] w-full object-cover"
                            />
                        </div>
                    )}

                    {/* Header */}
                    <div className="mb-8">
                        <span
                            className={`mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium ${statusStyle[status]}`}
                        >
                            {status.toUpperCase()}
                        </span>

                        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                            {event.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <Calendar size={16} />
                                {event.date || '-'}
                            </span>

                            {event.location && (
                                <span className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    {event.location}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <p>{event.description}</p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
