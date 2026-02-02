import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';

type GalleryItem = {
    id: number;
    title: string;
    image: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Gallery', href: '/admin/gallery' },
];

export default function Gallery({ gallery }: { gallery: GalleryItem[] }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<GalleryItem | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        title: '',
        image: null as File | null,
    });

    const openCreate = () => {
        reset();
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (item: GalleryItem) => {
        setEditing(item);
        setData({
            title: item.title,
            image: null,
        });
        setOpen(true);
    };

    const submit = () => {
        if (editing) {
            // Laravel expects _method=PUT for update
            const formData = new FormData();
            formData.append('title', data.title);
            if (data.image) formData.append('image', data.image);
            formData.append('_method', 'PUT');

            put(`/admin/gallery/${editing.id}`, formData, {
                onSuccess: () => setOpen(false),
            });
        } else {
            const formData = new FormData();
            formData.append('title', data.title);
            if (data.image) formData.append('image', data.image);

            post('/admin/gallery', formData, {
                onSuccess: () => setOpen(false),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />

            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Gallery</h1>
                    <Button onClick={openCreate}>Add Image</Button>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {gallery.length === 0 && <p>Belum ada gambar</p>}
                    {gallery.map((item) => (
                        <div
                            key={item.id}
                            className="overflow-hidden rounded-xl border shadow-sm"
                        >
                            <img
                                src={`/storage/${item.image}`}
                                alt={item.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="flex justify-between p-4">
                                <span className="font-semibold">
                                    {item.title}
                                </span>
                                <div className="flex gap-2">
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
                                            destroy(`/admin/gallery/${item.id}`)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* MODAL */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editing ? 'Edit Image' : 'Add Image'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Title"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
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
                        </div>

                        <DialogFooter>
                            <Button
                                variant="secondary"
                                onClick={() => setOpen(false)}
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
