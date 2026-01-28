import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

/* shadcn/ui */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: "/admin/dashboard",
    },
];

export default function Dashboard() {
    const stats = [
        {
            title: 'Articles',
            value: 12,
            description: 'Total articles',
        },
        {
            title: 'Gallery',
            value: 24,
            description: 'Images uploaded',
        },
        {
            title: 'Events',
            value: 5,
            description: 'Upcoming events',
        },
        {
            title: 'Clients',
            value: 8,
            description: 'Active clients',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4">
                {/* ===== TITLE ===== */}
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Overview of your company profile
                    </p>
                </div>

                {/* ===== STATS ===== */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {item.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {item.value}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
