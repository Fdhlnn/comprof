import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Gallery', href: '/gallery' }];

type GalleryItem = {
    id: number;
    title: string;
    file: File;
    preview: string;
};

export default function Gallery() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    /* ===== CLEANUP OBJECT URL ===== */
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const resetForm = () => {
        setTitle('');
        setFile(null);
        setPreview(null);
        setEditingId(null);
    };

    /* ===== OPEN MODAL CREATE ===== */
    const handleOpenCreate = () => {
        resetForm();
        setOpen(true);
    };

    /* ===== OPEN MODAL EDIT ===== */
    const handleOpenEdit = (item: GalleryItem) => {
        setTitle(item.title);
        setPreview(item.preview);
        setEditingId(item.id);
        setOpen(true);
    };

    /* ===== FILE CHANGE ===== */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    /* ===== SUBMIT ===== */
    const handleSubmit = () => {
        if (!title || (!file && !editingId)) return;

        if (editingId) {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editingId
                        ? {
                              ...item,
                              title,
                              file: file ?? item.file,
                              preview: file ? preview! : item.preview,
                          }
                        : item,
                ),
            );
        } else {
            setItems((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    title,
                    file: file!,
                    preview: preview!,
                },
            ]);
        }

        setOpen(false);
        resetForm();
    };

    /* ===== DELETE ===== */
    const handleDelete = (id: number) => {
        if (!confirm('Yakin hapus gambar ini?')) return;

        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />

            <div className="flex flex-col gap-6 p-4">
                {/* ===== HEADER ===== */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Gallery</h1>
                    <Button onClick={handleOpenCreate}>Add Image</Button>
                </div>

                {/* ===== GRID ===== */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {items.length === 0 && (
                        <p className="text-muted-foreground">
                            Belum ada gambar
                        </p>
                    )}

                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="overflow-hidden rounded-xl border shadow-sm"
                        >
                            <img
                                src={item.preview}
                                alt={item.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="flex flex-col gap-3 p-4">
                                <h3 className="font-semibold">{item.title}</h3>
                                <div className="flex gap-2">
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
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ===== MODAL ===== */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingId ? 'Edit Image' : 'Add Image'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Image title"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Image File</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="max-h-56 rounded-lg border object-contain"
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
