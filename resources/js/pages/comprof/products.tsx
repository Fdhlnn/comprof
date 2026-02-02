import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';

type ProductItem = {
    id: number;
    name: string;
    price: number;
    image?: string;
};

export default function Products({ products }: { products: ProductItem[] }) {
    return (
        <MainLayout>
            <section className="space-y-8 py-24">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Our Products</h1>
                    <p className="mx-auto max-w-xl text-muted-foreground">
                        Koleksi produk Faith Industries yang mengutamakan
                        karakter dan desain.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/payment/${product.id}`}
                            className="group overflow-hidden rounded-xl border bg-background transition hover:shadow-lg"
                        >
                            <div className="aspect-square overflow-hidden bg-muted">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-gray-200" />
                                )}
                            </div>

                            <div className="space-y-1 p-4">
                                <h3 className="font-semibold">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Rp {product.price.toLocaleString('id-ID')}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
