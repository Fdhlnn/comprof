import { Head, useForm } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
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
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Clients', href: '/admin/clients' },
];

type ClientItem = {
    id: number;
    name: string;
    company?: string;
    avatar?: string;
    rating: number;
    message: string;
};

export default function Clients({ clients }: { clients: ClientItem[] }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<ClientItem | null>(null);

    const form = useForm<{
        name: string;
        company: string;
        avatar: File | null;
        rating: number;
        message: string;
    }>({
        name: '',
        company: '',
        avatar: null,
        rating: 5,
        message: '',
    });

    const openCreate = () => {
        form.reset();
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (client: ClientItem) => {
        setEditing(client);
        form.setData({
            name: client.name,
            company: client.company || '',
            avatar: null,
            rating: client.rating,
            message: client.message,
        });
        setOpen(true);
    };

    const submit = () => {
        if (editing) {
            form.put(`/admin/clients/${editing.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                    setEditing(null);
                },
            });
        } else {
            form.post('/admin/clients', {
                forceFormData: true,
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus client ini?')) return;

        form.delete(`/admin/clients/${id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Clients</h1>
                    <Button onClick={openCreate}>Add Client</Button>
                </div>

                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left">Avatar</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Company</th>
                                <th className="px-4 py-3 text-left">Rating</th>
                                <th className="px-4 py-3 text-left">Message</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No clients
                                    </td>
                                </tr>
                            )}

                            {clients.map((clients) => (
                                <tr key={clients.id} className="border-t">
                                    <td className="px-4 py-3">
                                        {clients.avatar ? (
                                            <img
                                                src={`/storage/${clients.avatar}`}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-muted-foreground">
                                                No Avatar
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {clients.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        {clients.company}
                                    </td>
                                    <td className="flex gap-1 px-4 py-3">
                                        {Array.from({
                                            length: clients.rating,
                                        }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </td>
                                    <td className="px-4 py-3">
                                        {clients.message}
                                    </td>
                                    <td className="flex gap-2 px-4 py-3">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => openEdit(clients)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(clients.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editing ? 'Edit Client' : 'Add Client'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Name"
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData('name', e.target.value)
                                }
                            />

                            <Input
                                placeholder="Company"
                                value={form.data.company}
                                onChange={(e) =>
                                    form.setData('company', e.target.value)
                                }
                            />
                            <Input
                                type="number"
                                min={1}
                                max={5}
                                value={form.data.rating || ''}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value >= 1 && value <= 5) {
                                        form.setData('rating', value);
                                    }
                                }}
                            />

                            <Textarea
                                placeholder="Message"
                                value={form.data.message}
                                onChange={(e) =>
                                    form.setData('message', e.target.value)
                                }
                            />

                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    form.setData(
                                        'avatar',
                                        e.target.files?.[0] || null,
                                    )
                                }
                            />

                            {form.data.avatar && (
                                <img
                                    src={URL.createObjectURL(form.data.avatar)}
                                    className="h-32 w-full rounded object-cover"
                                />
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setOpen(false);
                                    form.reset();
                                    setEditing(null);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={submit}>
                                {editing ? 'Update' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
