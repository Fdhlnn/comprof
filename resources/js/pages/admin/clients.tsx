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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: "/admin/clients",
    },
];

type Client = {
    id: number;
    name: string;
    email: string;
    company: string;
    status: 'Active' | 'Inactive';
};

export default function Clients() {
    const [items, setItems] = useState<Client[]>([
        {
            id: 1,
            name: 'PT Maju Jaya',
            email: 'contact@majujaya.com',
            company: 'PT Maju Jaya',
            status: 'Active',
        },
        {
            id: 2,
            name: 'CV Sukses Selalu',
            email: 'admin@suksesselalu.id',
            company: 'CV Sukses Selalu',
            status: 'Inactive',
        },
    ]);

    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        name: '',
        email: '',
        company: '',
        status: 'Active' as 'Active' | 'Inactive',
    });

    const resetForm = () => {
        setForm({
            name: '',
            email: '',
            company: '',
            status: 'Active',
        });
        setEditingId(null);
    };

    const handleOpenCreate = () => {
        resetForm();
        setOpen(true);
    };

    const handleOpenEdit = (client: Client) => {
        setForm({
            name: client.name,
            email: client.email,
            company: client.company,
            status: client.status,
        });
        setEditingId(client.id);
        setOpen(true);
    };

    const handleSubmit = () => {
        if (!form.name || !form.email) return;

        if (editingId) {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editingId ? { ...item, ...form } : item,
                ),
            );
        } else {
            setItems((prev) => [...prev, { id: Date.now(), ...form }]);
        }

        setOpen(false);
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus client ini?')) return;
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />

            <div className="flex flex-col gap-6 p-4">
                {/* ===== HEADER ===== */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Clients</h1>
                    <Button onClick={handleOpenCreate}>Add Client</Button>
                </div>

                {/* ===== TABLE ===== */}
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Company</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No clients
                                    </td>
                                </tr>
                            )}

                            {items.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-3">{item.name}</td>
                                    <td className="px-4 py-3">{item.email}</td>
                                    <td className="px-4 py-3">
                                        {item.company}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`rounded px-2 py-1 text-xs font-medium ${
                                                item.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-200 text-gray-700'
                                            }`}
                                        >
                                            {item.status}
                                        </span>
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

                {/* ===== MODAL ===== */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingId ? 'Edit Client' : 'Add Client'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Client name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />

                            <Input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
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

                            <Select
                                value={form.status}
                                onValueChange={(value: 'Active' | 'Inactive') =>
                                    setForm({ ...form, status: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">
                                        Active
                                    </SelectItem>
                                    <SelectItem value="Inactive">
                                        Inactive
                                    </SelectItem>
                                </SelectContent>
                            </Select>
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
