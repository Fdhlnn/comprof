import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';


/* shadcn */
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
    { title: 'Articles', href: '/admin/articles' },
];

type Article = {
    id: number;
    title: string;
    content: string;
    image: string | null;
    created_at: string;
};

export default function Articles({ articles }: { articles: Article[] }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Article | null>(null);

    const { data, setData, post, processing, reset } = useForm<{
        title: string;
        content: string;
        image: File | null;
    }>({
        title: '',
        content: '',
        image: null,
    });

    const openCreate = () => {
        reset();
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (item: Article) => {
        setEditing(item);
        setData({
            title: item.title,
            content: item.content,
            image: null,
        });
        setOpen(true);
    };

    const submit = () => {
        if (editing) {
            post(`/admin/articles/${editing.id}`, {
                forceFormData: true,
                onSuccess: () => setOpen(false),
            });
        } else {
            post('/admin/articles', {
                forceFormData: true,
                onSuccess: () => setOpen(false),
            });
        }
    };

    const remove = (id: number) => {
        if (!confirm('Hapus artikel ini?')) return;
        router.delete(`/admin/articles/${id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Articles" />

            <div className="flex flex-col gap-6 p-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Articles</h1>
                    <Button onClick={openCreate}>Add Article</Button>
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
                            {articles.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No articles
                                    </td>
                                </tr>
                            )}

                            {articles.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-3">
                                        {item.image ? (
                                            <img
                                                src={`/storage/${item.image}`}
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
                                        {new Date(
                                            item.created_at,
                                        ).toLocaleDateString('id-ID')}
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
                                            onClick={() => remove(item.id)}
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
                                {editing ? 'Edit Article' : 'Add Article'}
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

                            <Textarea
                                rows={6}
                                placeholder="Content"
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
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
                            <Button onClick={submit} disabled={processing}>
                                {editing ? 'Update' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
