import { Head } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useState } from 'react';

/* shadcn/ui */
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
    {
        title: 'Client Reviews',
        href: '/admin/clients',
    },
];

type Client = {
    id: number;
    name: string;
    company: string;
    message: string;
    rating: number;
    avatar: string;
};

export default function Clients() {
    const [items, setItems] = useState<Client[]>([]);

    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        name: '',
        company: '',
        message: '',
        rating: 0,
        avatar: '',
    });

    const resetForm = () => {
        setForm({
            name: '',
            company: '',
            message: '',
            rating: 0,
            avatar: '',
        });
        setEditingId(null);
    };

    const handleOpenCreate = () => {
        resetForm();
        setOpen(true);
    };

    const handleOpenEdit = (item: Client) => {
        setForm(item);
        setEditingId(item.id);
        setOpen(true);
    };

    const handleSubmit = () => {
        if (!form.name || !form.message || form.rating === 0) return;

        if (editingId) {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editingId ? { ...item, ...form } : item,
                ),
            );
        } else {
            setItems((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    ...form,
                },
            ]);
        }

        setOpen(false);
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus review ini?')) return;
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client Reviews" />

            <div className="flex flex-col gap-6 p-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Client Reviews</h1>
                    <Button onClick={handleOpenCreate}>Add Review</Button>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left">Client</th>
                                <th className="px-4 py-3 text-left">Rating</th>
                                <th className="px-4 py-3 text-left">Message</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No reviews
                                    </td>
                                </tr>
                            )}

                            {items.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.avatar}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-medium">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.company}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {'⭐'.repeat(item.rating)}
                                    </td>
                                    <td className="max-w-md truncate px-4 py-3">
                                        {item.message}
                                    </td>
                                    <td className="flex gap-2 px-4 py-3">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => handleOpenEdit(item)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(item.id)
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

                {/* MODAL */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingId ? 'Edit Review' : 'Add Review'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            {/* Avatar Upload */}
                            <div className="flex items-center gap-4">
                                {form.avatar && (
                                    <img
                                        src={form.avatar}
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                )}
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setForm({
                                            ...form,
                                            avatar: URL.createObjectURL(file),
                                        });
                                    }}
                                />
                            </div>

                            <Input
                                placeholder="Client name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name: e.target.value,
                                    })
                                }
                            />

                            <Input
                                placeholder="Company"
                                value={form.company}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company: e.target.value,
                                    })
                                }
                            />

                            <Textarea
                                rows={4}
                                placeholder="Client review message"
                                value={form.message}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        message: e.target.value,
                                    })
                                }
                            />

                            {/* Rating */}
                            <div>
                                <p className="mb-2 text-sm font-medium">
                                    Rating
                                </p>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <Star
                                            key={value}
                                            size={22}
                                            onClick={() =>
                                                setForm({
                                                    ...form,
                                                    rating: value,
                                                })
                                            }
                                            className={`cursor-pointer ${
                                                value <= form.rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-muted-foreground'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                variant="secondary"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit}>
                                {editingId ? 'Update' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
