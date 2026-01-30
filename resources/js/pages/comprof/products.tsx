import MainLayout from '@/layouts/main-layout';

const products = [
    {
        id: 1,
        name: 'Faith Industries "Berserker Rage" White Tshirt',
        price: 'Rp 199.000',
        image: '/images/t-shirt1.jpg',
    },
    {
        id: 2,
        name: 'Faith Industries "Fenix The Hollow" Red Jersey',
        price: 'Rp 349.000',
        image: '/images/t-shirt2.jpg',
    },
    {
        id: 3,
        name: 'Faith Industries "Judgment Chain" Tracktop Tang Jacket',
        price: 'Rp 149.000',
        image: '/images/t-shirt3.jpg',
    },
    {
        id: 4,
        name: 'Faith Industries "Malenia Blade of Miquella" Black Tshirt',
        price: 'Rp 149.000',
        image: '/images/t-shirt4.jpg',
    },
    {
        id: 5,
        name: 'Faith Industries "Berserker Rage" Black Tshirt',
        price: 'Rp 149.000',
        image: '/images/t-shirt5.jpg',
    },
    {
        id: 6,
        name: 'Faith Industries "The Fifth Angle" Black Tshirt',
        price: 'Rp 149.000',
        image: '/images/t-shirt6.jpg',
    },
];

export default function Products() {
    return (
        <MainLayout>
            <section className="space-y-8">
                {/* Header */}
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-wide">
                        Our Products
                    </h1>
                    <p className="mx-auto max-w-xl text-muted-foreground">
                        Koleksi produk Faith Industries yang mengutamakan
                        karakter, desain grafis, dan eksklusivitas.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group overflow-hidden rounded-xl border bg-background transition hover:shadow-lg"
                        >
                            <div className="aspect-square overflow-hidden bg-muted">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="space-y-1 p-4">
                                <h3 className="font-semibold">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
