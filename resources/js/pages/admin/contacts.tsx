import { Head, router, usePage } from '@inertiajs/react';
import { CheckCircle, Mail, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    message: string;
    read: boolean;
    created_at: string;
}

export default function AdminContacts({ messages, filters }: any) {
    const { unreadCount } = usePage().props as any;

    const markAsRead = (id: number) => {
        router.post(`/admin/contacts/${id}/read`);
    };

    const deleteMessage = (id: number) => {
        if (confirm('Hapus pesan ini?')) {
            router.delete(`/admin/contacts/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Contact Messages" />

            <section className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Contact Messages</h1>
                        <p className="text-muted-foreground">
                            Pesan dari halaman Contact user
                        </p>
                    </div>

                    {unreadCount > 0 && (
                        <span className="rounded-full bg-primary px-3 py-1 text-sm text-white">
                            {unreadCount} Unread
                        </span>
                    )}
                </div>

                {/* Search */}
                <Input
                    placeholder="Cari nama, email, pesan..."
                    defaultValue={filters.search}
                    onChange={(e) =>
                        router.get(
                            '/admin/contacts',
                            { search: e.target.value },
                            { preserveState: true },
                        )
                    }
                    className="max-w-sm"
                />

                {/* List */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {messages.data.length === 0 && (
                        <p className="text-muted-foreground">
                            Tidak ada pesan.
                        </p>
                    )}

                    {messages.data.map((item: ContactMessage) => (
                        <Card
                            key={item.id}
                            className={`relative ${
                                item.read ? 'opacity-70' : 'border-primary'
                            }`}
                        >
                            {!item.read && (
                                <span className="absolute top-4 right-4 rounded-full bg-primary px-2 py-1 text-xs text-white">
                                    NEW
                                </span>
                            )}

                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User size={18} />
                                    {item.name}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail size={16} />
                                    {item.email}
                                </div>

                                <p className="text-sm">{item.message}</p>

                                <div className="flex items-center justify-between border-t pt-4">
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(
                                            item.created_at,
                                        ).toLocaleDateString('id-ID')}
                                    </span>

                                    <div className="flex gap-2">
                                        {!item.read && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    markAsRead(item.id)
                                                }
                                            >
                                                <CheckCircle className="mr-1 h-4 w-4" />
                                                Baca
                                            </Button>
                                        )}

                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                deleteMessage(item.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2">
                    {messages.links.map((link: any, i: number) => (
                        <Button
                            key={i}
                            variant={link.active ? 'default' : 'outline'}
                            disabled={!link.url}
                            onClick={() => router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </section>
        </AppLayout>
    );
}
