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
    rating?: number;
    message?: string;
};

export default function Clients({ clients }: { clients: ClientItem[] }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<ClientItem | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        name: '',
        company: '',
        avatar: null as File | null,
        rating: 5,
        message: '',
    });

    const openCreate = () => {
        reset();
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (client: ClientItem) => {
        setEditing(client);
        setData({
            name: client.name,
            company: client.company || '',
            avatar: null,
            rating: client.rating || 5,
            message: client.message || '',
        });
        setOpen(true);
    };

    const submit = () => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('company', data.company);
        formData.append('rating', data.rating.toString());
        formData.append('message', data.message);
        if (data.avatar) formData.append('avatar', data.avatar);

        if (editing) {
            formData.append('_method', 'PUT');
            put(`/admin/clients/${editing.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onSuccess: () => {
                    setOpen(false);
                    reset();
                    setEditing(null);
                },
            });
        } else {
            post('/admin/clients', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onSuccess: () => {
                    setOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus client ini?')) return;

        destroy(`/admin/clients/${id}`, {
            onSuccess: () => {},
        });
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
                            {clients.map((client) => (
                                <tr key={client.id} className="border-t">
                                    <td className="px-4 py-3">
                                        {client.avatar ? (
                                            <img
                                                src={`/storage/${client.avatar}`}
                                                alt={client.name}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-muted-foreground">
                                                No Avatar
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{client.name}</td>
                                    <td className="px-4 py-3">{client.company}</td>
                                    <td className="flex gap-1 px-4 py-3">
                                        {Array.from({
                                            length: client.rating || 0,
                                        }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </td>
                                    <td className="px-4 py-3">
                                        {client.message}
                                    </td>
                                    <td className="flex gap-2 px-4 py-3">
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
                                            onClick={() =>
                                                handleDelete(client.id)
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
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <Input
                                placeholder="Company"
                                value={data.company}
                                onChange={(e) =>
                                    setData('company', e.target.value)
                                }
                            />
                            <Input
                                type="number"
                                placeholder="Rating"
                                value={data.rating}
                                min={1}
                                max={5}
                                onChange={(e) =>
                                    setData('rating', Number(e.target.value))
                                }
                            />
                            <Textarea
                                placeholder="Message"
                                value={data.message}
                                onChange={(e) =>
                                    setData('message', e.target.value)
                                }
                            />
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        'avatar',
                                        e.target.files?.[0] || null,
                                    )
                                }
                            />

                            {data.avatar && (
                                <img
                                    src={
                                        typeof data.avatar === 'string'
                                            ? data.avatar
                                            : URL.createObjectURL(data.avatar)
                                    }
                                    alt="Preview"
                                    className="h-32 w-full rounded object-cover"
                                />
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setOpen(false);
                                    reset();
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
