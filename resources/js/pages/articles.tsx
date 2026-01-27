import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Article',
        href: '/article',
    },
];

type ArticleItem = {
    id: number;
    title: string;
    author: string;
    content: string;
    image?: string;
};

export default function Article() {
    const [items, setItems] = useState<ArticleItem[]>([
        {
            id: 1,
            title: 'Technology Trends 2026',
            author: 'Admin',
            content: 'Latest technology trends you should know in 2026.',
            image: '',
        },
    ]);

    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState<ArticleItem>({
        id: 0,
        title: '',
        author: '',
        content: '',
        image: '',
    });

    const resetForm = () => {
        setForm({
            id: 0,
            title: '',
            author: '',
            content: '',
            image: '',
        });
        setEditingId(null);
    };

    const handleOpenCreate = () => {
        resetForm();
        setOpen(true);
    };

    const handleOpenEdit = (item: ArticleItem) => {
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
        if (!form.title || !form.author) return;

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
        if (!confirm('Hapus artikel ini?')) return;
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Article" />

            <div className="flex flex-col gap-6 p-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Article</h1>
                    <Button onClick={handleOpenCreate}>Add Article</Button>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Author</th>
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
                                    <td className="px-4 py-3">{item.author}</td>
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
                                {editingId ? 'Edit Article' : 'Add Article'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Article title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                            />

                            <Input
                                placeholder="Author"
                                value={form.author}
                                onChange={(e) =>
                                    setForm({ ...form, author: e.target.value })
                                }
                            />

                            <Textarea
                                placeholder="Content"
                                value={form.content}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        content: e.target.value,
                                    })
                                }
                            />

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
