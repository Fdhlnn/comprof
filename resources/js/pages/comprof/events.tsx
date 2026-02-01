import { Head } from '@inertiajs/react';
import { Calendar, MapPin } from 'lucide-react';
import MainLayout from '@/layouts/main-layout';

type EventStatus = 'upcoming' | 'ongoing' | 'past';

const events = [
    {
        id: 1,
        title: 'Faith Industries Pop-Up Store',
        date: '15 – 20 Februari 2026',
        location: 'Jakarta Selatan',
        image: '/images/events-1.png',
        status: 'upcoming' as EventStatus,
        description:
            'Pop-up store eksklusif menghadirkan koleksi terbaru dan limited edition Faith Industries.',
    },
    {
        id: 2,
        title: 'Streetwear Launching Night',
        date: '5 Januari 2026',
        location: 'Bandung',
        image: '/images/events-2.jpg',
        status: 'past' as EventStatus,
        description:
            'Malam peluncuran koleksi terbaru dengan showcase desain dan komunitas kreatif.',
    },
    {
        id: 3,
        title: 'Creative Collaboration Session',
        date: '25 Maret 2026',
        location: 'Online Event',
        image: '/images/events-3.png',
        status: 'upcoming' as EventStatus,
        description:
            'Sesi diskusi dan kolaborasi antara Faith Industries dengan kreator lokal.',
    },
];

const statusStyle: Record<EventStatus, string> = {
    upcoming: 'bg-blue-500/10 text-blue-500',
    ongoing: 'bg-green-500/10 text-green-500',
    past: 'bg-neutral-500/10 text-neutral-400',
};

export default function Events() {
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
                    <div className="grid gap-10 md:grid-cols-2">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="group overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg"
                            >
                                {/* Image */}
                                <div className="overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="h-60 w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[event.status]}`}
                                        >
                                            {event.status.toUpperCase()}
                                        </span>
                                    </div>

                                    <h3 className="mb-3 text-xl font-semibold">
                                        {event.title}
                                    </h3>

                                    <p className="mb-6 text-muted-foreground">
                                        {event.description}
                                    </p>

                                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            {event.date}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <MapPin size={16} />
                                            {event.location}
                                        </span>
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
