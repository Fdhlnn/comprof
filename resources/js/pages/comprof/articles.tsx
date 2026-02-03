import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';

type ArticleItem = {
    id: number;
    title: string;
    excerpt: string;
    image?: string | null;
    date: string;
};

export default function Articles({ articles }: { articles: ArticleItem[] }) {
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
                                href={`/detail-article/${article.id}`}
                                className="group overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg"
                            >
                                {/* Image */}
                                <div className="overflow-hidden">
                                    {article.image ? (
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="h-56 w-full bg-gray-200" />
                                    )}
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
