import { Head, useForm } from '@inertiajs/react';
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
    { title: 'Event', href: '/admin/events' },
];

type EventStatus = 'upcoming' | 'ongoing' | 'past';

type EventItem = {
    id: number;
    name: string;
    description?: string;
    content: string;
    start_date: string;
    end_date: string;
    location?: string;
    status: EventStatus;
    image?: string;
};

export default function Event({ events }: { events: EventItem[] }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<EventItem | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        name: '',
        description: '',
        content: '',
        start_date: '',
        end_date: '',
        location: '',
        status: 'upcoming' as EventStatus,
        image: null as File | null,
    });

    const openCreate = () => {
        reset();
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (event: EventItem) => {
        setEditing(event);
        setData({
            name: event.name,
            description: event.description || '',
            content: event.content,
            start_date: event.start_date,
            end_date: event.end_date,
            location: event.location || '',
            status: event.status,
            image: null,
        });
        setOpen(true);
    };

    const submit = () => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('content', data.content);
        formData.append('start_date', data.start_date);
        formData.append('end_date', data.end_date);
        formData.append('location', data.location);
        formData.append('status', data.status);
        if (data.image) formData.append('image', data.image);

        if (editing) {
            formData.append('_method', 'PUT');

            post(`/admin/events/${editing.id}`, formData, {
                forceFormData: true,
                onSuccess: () => {
                    setOpen(false);
                    reset();
                    setEditing(null);
                },
            });
        } else {
            post('/admin/events', formData, {
                forceFormData: true,
                onSuccess: () => {
                    setOpen(false);
                    reset();
                },
            });
        }
    };


    const handleDelete = (id: number) => {
        if (!confirm('Hapus event ini?')) return;

        destroy(`/admin/events/${id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Event" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Event</h1>
                    <Button onClick={openCreate}>Add Event</Button>
                </div>

                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Start</th>
                                <th className="px-4 py-3 text-left">End</th>
                                <th className="px-4 py-3 text-left">
                                    Location
                                </th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {events.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No events
                                    </td>
                                </tr>
                            )}

                            {events.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-3">
                                        {item.image ? (
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.name}
                                                className="h-12 w-16 rounded object-cover"
                                            />
                                        ) : (
                                            <span className="text-muted-foreground">
                                                No Image
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{item.name}</td>
                                    <td className="px-4 py-3">
                                        {item.start_date}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.end_date}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.location}
                                    </td>
                                    <td
                                        className={`px-4 py-3 capitalize ${
                                            item.status === 'upcoming'
                                                ? 'text-blue-600'
                                                : item.status === 'ongoing'
                                                  ? 'text-green-600'
                                                  : 'text-gray-600'
                                        }`}
                                    >
                                        {item.status}
                                    </td>
                                    <td className="flex gap-2 px-4 py-3">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => openEdit(item)}
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
                                {editing ? 'Edit Event' : 'Add Event'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Event title"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <Textarea
                                placeholder="Description"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                            <Textarea
                                placeholder="Content"
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
                                }
                            />
                            <Input
                                type="date"
                                value={data.start_date}
                                onChange={(e) =>
                                    setData('start_date', e.target.value)
                                }
                            />
                            <Input
                                type="date"
                                value={data.end_date}
                                onChange={(e) =>
                                    setData('end_date', e.target.value)
                                }
                            />
                            <Input
                                placeholder="Location"
                                value={data.location}
                                onChange={(e) =>
                                    setData('location', e.target.value)
                                }
                            />
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        'image',
                                        e.target.files?.[0] || null,
                                    )
                                }
                            />

                            {data.image && (
                                <img
                                    src={
                                        typeof data.image === 'string'
                                            ? data.image
                                            : URL.createObjectURL(data.image)
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
