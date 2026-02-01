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
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Products', href: '/admin/products' },
];

const formatRupiah = (value: number) => 'Rp ' + value.toLocaleString('id-ID');

export default function Products({ products }: { products: Product[] }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        name: '',
        price: 0,
        image: null as File | null,
    });

    const openCreate = () => {
        reset();
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (product: Product) => {
        setEditing(product);
        setData({
            name: product.name,
            price: product.price,
            image: null,
        });
        setOpen(true);
    };

    const submit = () => {
        if (editing) {
            put(`/admin/products/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            post('/admin/products', {
                onSuccess: () => setOpen(false),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Button onClick={openCreate}>Add Product</Button>
                </div>

                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Price</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} className="border-t">
                                    <td className="px-4 py-3">
                                        <img
                                            src={`/storage/${p.image}`}
                                            className="h-14 w-14 rounded object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-3">{p.name}</td>
                                    <td className="px-4 py-3">
                                        {formatRupiah(p.price)}
                                    </td>
                                    <td className="flex justify-center gap-2 px-4 py-3">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => openEdit(p)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                destroy(
                                                    `/admin/products/${p.id}`,
                                                )
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
                                {editing ? 'Edit Product' : 'Add Product'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Product name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <Input
                                type="number"
                                placeholder="Price"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', Number(e.target.value))
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
