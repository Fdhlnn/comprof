import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';

const PRODUCTS: any = {
    1: {
        name: 'Berserker Rage White Tshirt',
        image: '/images/t-shirt1.jpg',
    },
    2: {
        name: 'Fenix The Hollow Red Jersey',
        image: '/images/t-shirt2.jpg',
    },
    3: {
        name: 'Judgment Chain Tracktop Jacket',
        image: '/images/t-shirt3.jpg',
    },
};

const sizes = [
    { label: 'S', price: 199000 },
    { label: 'M', price: 209000 },
    { label: 'L', price: 219000 },
    { label: 'XL', price: 229000 },
];

export default function Payment({ id }: { id: number }) {
    const product = PRODUCTS[id];
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    return (
        <MainLayout>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                {/* IMAGE */}
                <img
                    src={product.image}
                    className="rounded-xl border object-cover"
                />

                {/* DETAIL */}
                <div className="space-y-6">
                    <h1 className="text-2xl font-bold">{product.name}</h1>

                    {/* SIZE PICKER */}
                    <div className="space-y-3">
                        <p className="font-medium">Pilih Ukuran</p>
                        <div className="grid grid-cols-4 gap-3">
                            {sizes.map((size, i) => (
                                <Card
                                    key={i}
                                    onClick={() => setSelectedSize(i)}
                                    className={`cursor-pointer text-center ${
                                        selectedSize === i
                                            ? 'border-primary ring-2 ring-primary'
                                            : ''
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
                                    {sizes[selectedSize].price.toLocaleString(
                                        'id-ID',
                                    )}
                                </p>
                            </div>

                            <Button size="lg">Bayar Sekarang</Button>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
