import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';

type ArticleDetailProps = {
    article: {
        title: string;
        content: string;
        image?: string | null;
        date: string;
    };
};

export default function ArticleDetail({ article }: ArticleDetailProps) {
    return (
        <MainLayout>
            <Head title={article.title} />

            <section className="bg-background py-24">
                <div className="mx-auto max-w-3xl px-6">
                    {/* Back */}
                    <Link
                        href="/articles"
                        className="mb-8 inline-block text-sm text-muted-foreground hover:underline"
                    >
                        ← Kembali ke Articles
                    </Link>

                    {/* Date */}
                    <p className="mb-3 text-sm text-muted-foreground">
                        {article.date}
                    </p>

                    {/* Title */}
                    <h1 className="mb-8 text-3xl font-bold md:text-4xl">
                        {article.title}
                    </h1>

                    {/* Image */}
                    {article.image && (
                        <img
                            src={article.image}
                            alt={article.title}
                            className="mb-10 w-full rounded-2xl object-cover"
                        />
                    )}

                    {/* Content */}
                    <article className="prose prose-neutral max-w-none leading-relaxed whitespace-pre-line">
                        {article.content}
                    </article>
                </div>
            </section>
        </MainLayout>
    );
}
