import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';

const articles = [
    {
        id: 1,
        title: 'Behind the Design: Filosofi Faith Industries',
        excerpt:
            'Setiap desain yang kami rilis membawa cerita, nilai, dan identitas yang ingin kami sampaikan.',
        image: '/images/article.png',
        date: '12 Jan 2026',
    },
    {
        id: 2,
        title: 'Kenapa Limited Edition Itu Penting?',
        excerpt:
            'Produk terbatas bukan sekadar eksklusivitas, tapi juga bentuk apresiasi terhadap kualitas.',
        image: '/images/article.png',
        date: '20 Jan 2026',
    },
    {
        id: 3,
        title: 'Streetwear & Lifestyle: Lebih dari Sekadar Fashion',
        excerpt:
            'Streetwear adalah medium ekspresi diri dan budaya urban yang terus berkembang.',
        image: '/images/article.png',
        date: '28 Jan 2026',
    },
    {
        id: 4,
        title: 'Proses Produksi Merchandise Faith Industries',
        excerpt:
            'Dari pemilihan bahan hingga quality control, semua kami lakukan dengan standar tinggi.',
        image: '/images/article.png',
        date: '2 Feb 2026',
    },
];

export default function Articles() {
    return (
        <MainLayout>
            <Head title="Articles" />

            <section className="bg-background py-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                            Articles & Insights
                        </h1>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            Cerita, insight, dan proses kreatif di balik Faith
                            Industries.
                        </p>
                    </div>

                    {/* Article Grid */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/articles/${article.id}`}
                                className="group overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg"
                            >
                                {/* Image */}
                                <div className="overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="mb-2 text-xs text-muted-foreground">
                                        {article.date}
                                    </p>
                                    <h3 className="mb-3 text-lg font-semibold group-hover:underline">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {article.excerpt}
                                    </p>

                                    <span className="mt-6 inline-block text-sm font-medium">
                                        Read more →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
