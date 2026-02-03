import { Head, router } from '@inertiajs/react';
import { Calendar, MapPin } from 'lucide-react';
import MainLayout from '@/layouts/main-layout';

type EventStatus = 'upcoming' | 'ongoing' | 'past';

type EventItem = {
    id: number;
    title: string;
    description: string;
    date: string;
    location?: string;
    image?: string;
    status: EventStatus;
};

const statusStyle: Record<EventStatus, string> = {
    upcoming: 'bg-blue-500/10 text-blue-500',
    ongoing: 'bg-green-500/10 text-green-500',
    past: 'bg-neutral-500/10 text-neutral-400',
};

export default function Events({ events }: { events: EventItem[] }) {
    return (
        <MainLayout>
            <Head title="Events" />

            <section className="bg-background py-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                            Events
                        </h1>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            Ikuti berbagai event, kolaborasi, dan momen spesial
                            Faith Industries.
                        </p>
                    </div>

                    {/* Event List */}
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                onClick={() =>
                                    router.visit(`/detail-event/${event.id}`)
                                }
                                className="group cursor-pointer overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-xl active:scale-[0.98]"
                            >
                                {/* Image */}
                                <div className="overflow-hidden">
                                    {event.image ? (
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="h-60 w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="h-60 w-full bg-muted" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <span
                                        className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${statusStyle[event.status]}`}
                                    >
                                        {event.status.toUpperCase()}
                                    </span>

                                    <h3 className="mb-3 text-xl font-semibold">
                                        {event.title}
                                    </h3>

                                    <p className="mb-6 line-clamp-3 text-muted-foreground">
                                        {event.description}
                                    </p>

                                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            {event.date}
                                        </span>

                                        {event.location && (
                                            <span className="flex items-center gap-2">
                                                <MapPin size={16} />
                                                {event.location}
                                            </span>
                                        )}
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
