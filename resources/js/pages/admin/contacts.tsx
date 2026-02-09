import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle, Mail, Send, Trash2, User } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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


    const [replyOpen, setReplyOpen] = useState(false);
    const [replyTarget, setReplyTarget] = useState<ContactMessage | null>(null);

    const replyForm = useForm({
        subject: 'Re: Contact from Faith Industries',
        message: '',
    });


    const openReply = (item: ContactMessage) => {
        setReplyTarget(item);

        replyForm.setData({
            subject: 'Re: Contact from Faith Industries',
            message:
                `Halo ${item.name},\n\n` +
                `Terima kasih telah menghubungi Faith Industries.\n\n`,
        });

        if (!item.read) {
            markAsRead(item.id);
        }

        setReplyOpen(true);
    };


    const sendReply = () => {
        if (!replyTarget) return;

        replyForm.post(`/admin/contacts/${replyTarget.id}/reply`, {
            onSuccess: () => {
                setReplyOpen(false);
                replyForm.reset();
                setReplyTarget(null);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Contact Messages" />

            <section className="space-y-6">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Contact Messages</h1>
                        <p className="text-muted-foreground">
                            Pesan dari halaman Contact user
                        </p>
                    </div>

                    {unreadCount > 0 && (
                        <span className="rounded-full bg-primary px-3 py-1 text-sm text-black">
                            {unreadCount} Unread
                        </span>
                    )}
                </div>

                {/* SEARCH */}
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

                {/* LIST */}
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
                                <span className="absolute top-4 right-4 rounded-full bg-primary px-2 py-1 text-xs text-black">
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
                                            onClick={() => openReply(item)}
                                        >
                                            <Send className="mr-1 h-4 w-4" />
                                            Reply
                                        </Button>

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

                {/* PAGINATION */}
                <div className="flex justify-center gap-2">
                    {messages.links.map((link: any, i: number) => (
                        <Button
                            key={i}
                            variant={link.active ? 'default' : 'outline'}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    ))}
                </div>
            </section>

            
            <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reply to {replyTarget?.email}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <Input
                            placeholder="Subject"
                            value={replyForm.data.subject}
                            onChange={(e) =>
                                replyForm.setData('subject', e.target.value)
                            }
                        />

                        <Textarea
                            rows={8}
                            placeholder="Message"
                            value={replyForm.data.message}
                            onChange={(e) =>
                                replyForm.setData('message', e.target.value)
                            }
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setReplyOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={sendReply}
                            disabled={replyForm.processing}
                        >
                            Send Email
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
