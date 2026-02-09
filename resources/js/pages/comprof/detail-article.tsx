import { Head, Link } from '@inertiajs/react';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

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

            {/* Back To Top */}
            {showTop && (
                <button
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    className="fixed right-6 bottom-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl"
                >
                    <ArrowUp className="h-5 w-5" />
                </button>
            )}
        </MainLayout>
    );
}
