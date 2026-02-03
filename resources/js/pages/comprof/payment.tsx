import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';

type ProductItem = {
    id: number;
    name: string;
    image?: string;
    sizes: { label: string; price: number }[];
};

export default function Payment() {
    const { product }: { product: ProductItem } = usePage().props;
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    const handleBayarSekarang = () => {
        if (selectedSize === null) return;

        const size = product.sizes[selectedSize];

        const phoneNumber = '6285697779977';
        const message = `
Halo, saya mau pesan:

Produk: ${product.name}
Ukuran: ${size.label}
Harga: Rp ${size.price.toLocaleString('id-ID')}
        `;

        const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            message,
        )}`;

        window.open(waUrl, '_blank');
    };

    return (
        <MainLayout>
            <Head title={product.name} />

            <div className="mx-auto grid max-w-5xl gap-8 py-24 md:grid-cols-2">
                {/* IMAGE */}
                <div className="overflow-hidden rounded-xl border">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="h-96 w-full bg-gray-200" />
                    )}
                </div>

                {/* DETAIL */}
                <div className="space-y-6">
                    <h1 className="text-2xl font-bold">{product.name}</h1>

                    {/* SIZE PICKER */}
                    <div className="space-y-3">
                        <p className="font-medium">Pilih Ukuran</p>
                        <div className="grid grid-cols-4 gap-3">
                            {product.sizes.map((size, i) => (
                                <Card
                                    key={i}
                                    onClick={() => setSelectedSize(i)}
                                    className={`cursor-pointer text-center transition ${
                                        selectedSize === i
                                            ? 'border-primary ring-2 ring-primary'
                                            : 'hover:border-muted'
                                    }`}
                                >
                                    <CardContent className="py-4">
                                        <p className="font-semibold">
                                            {size.label}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Rp{' '}
                                            {size.price.toLocaleString('id-ID')}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* TOTAL */}
                    {selectedSize !== null && (
                        <div className="flex items-center justify-between border-t pt-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total
                                </p>
                                <p className="text-xl font-bold">
                                    Rp{' '}
                                    {product.sizes[
                                        selectedSize
                                    ].price.toLocaleString('id-ID')}
                                </p>
                            </div>

                            <Button size="lg" onClick={handleBayarSekarang}>
                                Bayar Sekarang
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
