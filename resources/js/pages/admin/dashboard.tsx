import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

/* shadcn/ui */

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: "/admin/dashboard",
    },
];

export default function Dashboard({ stats }: { stats: any }) {
    const items = [
        {
            title: 'Products',
            value: stats.products,
            description: 'Stocks',
        },
        {
            title: 'Gallery',
            value: stats.gallery,
            description: 'Images uploaded',
        },
        {
            title: 'Events',
            value: stats.events,
            description: 'Upcoming events',
        },
        {
            title: 'Clients',
            value: stats.clients,
            description: 'Active clients',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Overview of your company profile
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, index) => (
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

