import { Head, useForm } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

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

    const form = useForm({
        name: '',
        company: '',
        avatar: null as File | null,
        rating: 5,
        message: '',
    });

    const openCreate = () => {
        form.reset();
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (client: ClientItem) => {
        form.clearErrors();
        setEditing(client);
        form.setData({
            name: client.name,
            company: client.company ?? '',
            avatar: null,
            rating: client.rating,
            message: client.message,
        });
        setOpen(true);
    };

    // 🔥 FIX DI SINI
    const submit = () => {
        if (editing) {
            form.post(`/admin/clients/${editing.id}`, {
                forceFormData: true,
                data: {
                    _method: 'put',
                },
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
        <AppLayout>
            <Head title="Clients" />

            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Clients</h1>
                    <Button onClick={openCreate}>Add Client</Button>
                </div>

                <table className="w-full rounded border">
                    <thead>
                        <tr className="bg-muted">
                            <th className="p-3">Avatar</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Company</th>
                            <th className="p-3">Rating</th>
                            <th className="p-3">Message</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id} className="border-t">
                                <td className="p-3">
                                    {client.avatar ? (
                                        <img
                                            src={`/storage/${client.avatar}`}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        '—'
                                    )}
                                </td>
                                <td className="p-3">{client.name}</td>
                                <td className="p-3">{client.company}</td>
                                <td className="flex gap-1 p-3">
                                    {Array.from({ length: client.rating }).map(
                                        (_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                        ),
                                    )}
                                </td>
                                <td className="p-3">{client.message}</td>
                                <td className="flex gap-2 p-3">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => openEdit(client)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(client.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editing ? 'Edit Client' : 'Add Client'}
                            </DialogTitle>
                            <DialogDescription>
                                Kelola data client
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-3">
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
                                value={form.data.rating}
                                onChange={(e) =>
                                    form.setData(
                                        'rating',
                                        Number(e.target.value),
                                    )
                                }
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
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                variant="secondary"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={submit} disabled={form.processing}>
                                {editing ? 'Update' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
