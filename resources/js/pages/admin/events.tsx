import { Head } from '@inertiajs/react';
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
        title: 'Event',
        href: '/admin/events',
    },
];

type EventStatus = 'upcoming' | 'ongoing' | 'past';

type EventItem = {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    status: EventStatus;
    image?: string;
};

export default function Event() {
    const [items, setItems] = useState<EventItem[]>([
        {
            id: 1,
            title: 'Faith Industries Pop-Up Store',
            description:
                'Pop-up store eksklusif menghadirkan koleksi terbaru dan limited edition.',
            date: '2026-02-15',
            location: 'Jakarta Selatan',
            status: 'upcoming',
            image: '',
        },
    ]);

    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState<EventItem>({
        id: 0,
        title: '',
        description: '',
        date: '',
        location: '',
        status: 'upcoming',
        image: '',
    });

    const resetForm = () => {
        setForm({
            id: 0,
            title: '',
            description: '',
            date: '',
            location: '',
            status: 'upcoming',
            image: '',
        });
        setEditingId(null);
    };

    const handleOpenCreate = () => {
        resetForm();
        setOpen(true);
    };

    const handleOpenEdit = (item: EventItem) => {
        setForm(item);
        setEditingId(item.id);
        setOpen(true);
    };

    const handleImageChange = (file: File | null) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setForm({ ...form, image: reader.result as string });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        if (!form.title || !form.date || !form.location) return;

        if (editingId) {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editingId ? { ...item, ...form } : item,
                ),
            );
        } else {
            setItems((prev) => [...prev, { ...form, id: Date.now() }]);
        }

        setOpen(false);
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus event ini?')) return;
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Event" />

            <div className="flex flex-col gap-6 p-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Event</h1>
                    <Button onClick={handleOpenCreate}>Add Event</Button>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">
                                    Location
                                </th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No events
                                    </td>
                                </tr>
                            )}

                            {items.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-3">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-12 w-16 rounded object-cover"
                                            />
                                        ) : (
                                            <span className="text-muted-foreground">
                                                No Image
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{item.title}</td>
                                    <td className="px-4 py-3">{item.date}</td>
                                    <td className="px-4 py-3">
                                        {item.location}
                                    </td>
                                    <td className="px-4 py-3 capitalize">
                                        {item.status}
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
                                {editingId ? 'Edit Event' : 'Add Event'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Event title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        title: e.target.value,
                                    })
                                }
                            />

                            <Textarea
                                placeholder="Event description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                            />

                            <Input
                                type="date"
                                value={form.date}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        date: e.target.value,
                                    })
                                }
                            />

                            <Input
                                placeholder="Location"
                                value={form.location}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        location: e.target.value,
                                    })
                                }
                            />

                            {/* STATUS */}
                            <select
                                value={form.status}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        status: e.target.value as EventStatus,
                                    })
                                }
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="past">Past</option>
                            </select>

                            {/* IMAGE UPLOAD */}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleImageChange(
                                        e.target.files?.[0] || null,
                                    )
                                }
                            />

                            {form.image && (
                                <img
                                    src={form.image}
                                    alt="Preview"
                                    className="h-32 w-full rounded object-cover"
                                />
                            )}
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
