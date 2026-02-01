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
        title: 'Articles',
        href: '/admin/articles',
    },
];

type Article = {
    id: number;
    title: string;
    content: string;
    image: string;
    date: string;
};

export default function Articles() {
    const [items, setItems] = useState<Article[]>([]);

    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        title: '',
        content: '',
        image: '',
    });

    const resetForm = () => {
        setForm({
            title: '',
            content: '',
            image: '',
        });
        setEditingId(null);
    };

    const handleOpenCreate = () => {
        resetForm();
        setOpen(true);
    };

    const handleOpenEdit = (item: Article) => {
        setForm({
            title: item.title,
            content: item.content,
            image: item.image,
        });
        setEditingId(item.id);
        setOpen(true);
    };

    const handleImageUpload = (file: File | null) => {
        if (!file) return;
        setForm({
            ...form,
            image: URL.createObjectURL(file),
        });
    };

    const handleSubmit = () => {
        if (!form.title || !form.content) return;

        const newItem: Article = {
            id: editingId ?? Date.now(),
            title: form.title,
            content: form.content,
            image: form.image,
            date: new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            }),
        };

        if (editingId) {
            setItems((prev) =>
                prev.map((item) => (item.id === editingId ? newItem : item)),
            );
        } else {
            setItems((prev) => [...prev, newItem]);
        }

        setOpen(false);
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus artikel ini?')) return;
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Articles" />

            <div className="flex flex-col gap-6 p-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Articles</h1>
                    <Button onClick={handleOpenCreate}>Add Article</Button>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Date</th>
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
                                        No articles
                                    </td>
                                </tr>
                            )}

                            {items.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-3">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                className="h-12 w-20 rounded object-cover"
                                            />
                                        ) : (
                                            <span className="text-muted-foreground">
                                                No Image
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium">
                                        {item.title}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {item.date}
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
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>
                                {editingId ? 'Edit Article' : 'Add Article'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Article title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        title: e.target.value,
                                    })
                                }
                            />

                            <Textarea
                                rows={6}
                                placeholder="Article content"
                                value={form.content}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        content: e.target.value,
                                    })
                                }
                            />

                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleImageUpload(
                                        e.target.files?.[0] || null,
                                    )
                                }
                            />

                            {form.image && (
                                <img
                                    src={form.image}
                                    className="h-40 w-full rounded object-cover"
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
