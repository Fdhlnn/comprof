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
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

/* ================= HELPERS ================= */
const formatRupiah = (value: number) => {
    if (!value) return 'Rp 0';
    return 'Rp ' + value.toLocaleString('id-ID');
};

/* ================= TYPES ================= */
type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};

/* ================= BREADCRUMB ================= */
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Products', href: '/admin/products' },
];

export default function Products() {
    const [items, setItems] = useState<Product[]>([]);

    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        name: '',
        price: 0,
        image: null as File | null,
        preview: '',
    });

    /* ================= HANDLERS ================= */
    const resetForm = () => {
        setForm({ name: '', price: 0, image: null, preview: '' });
        setEditingId(null);
    };

    const handleOpenCreate = () => {
        resetForm();
        setOpen(true);
    };

    const handleOpenEdit = (product: Product) => {
        setForm({
            name: product.name,
            price: product.price,
            image: null,
            preview: product.image,
        });
        setEditingId(product.id);
        setOpen(true);
    };

    const handleImageChange = (file?: File) => {
        if (!file) return;
        setForm({
            ...form,
            image: file,
            preview: URL.createObjectURL(file),
        });
    };

    const handleSubmit = () => {
        if (!form.name || !form.price || !form.preview) return;

        const payload: Product = {
            id: editingId ?? Date.now(),
            name: form.name,
            price: form.price,
            image: form.preview,
        };

        if (editingId) {
            setItems((prev) =>
                prev.map((item) => (item.id === editingId ? payload : item)),
            );
        } else {
            setItems((prev) => [...prev, payload]);
        }

        setOpen(false);
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus produk ini?')) return;
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    /* ================= RENDER ================= */
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="flex flex-col gap-6 p-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Button onClick={handleOpenCreate}>Add Product</Button>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Price</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-3">
                                        <img
                                            src={item.image}
                                            className="h-14 w-14 rounded-md object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-3">{item.name}</td>
                                    <td className="px-4 py-3">
                                        {formatRupiah(item.price)}
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

                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No products
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* MODAL */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingId ? 'Edit Product' : 'Add Product'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Product name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name: e.target.value,
                                    })
                                }
                            />

                            <Input
                                type="number"
                                placeholder="Price"
                                value={form.price}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        price: Number(e.target.value),
                                    })
                                }
                            />

                            <p className="text-sm text-muted-foreground">
                                {formatRupiah(form.price)}
                            </p>

                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleImageChange(e.target.files?.[0])
                                }
                            />

                            {form.preview && (
                                <img
                                    src={form.preview}
                                    className="h-40 w-full rounded-lg object-cover"
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
