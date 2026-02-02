import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';

export default function CompanyProfile() {
    const advantages = [
        {
            title: 'Desain Kreatif dan Unik',
            description:
                'Setiap produk Faith Industries dirancang untuk menonjolkan karakter dan identitas, sehingga berbeda dari brand lain.',
        },
        {
            title: 'Kualitas dan Kenyamanan',
            description:
                'Bahan yang digunakan dipilih dengan standar tinggi untuk memastikan kenyamanan penggunaan sehari-hari.',
        },
        {
            title: 'Kolaborasi Strategis',
            description:
                'Aktif melakukan kolaborasi dengan komunitas, anime, dan organisasi populer untuk meningkatkan nilai brand.',
        },
        {
            title: 'Pengalaman Belanja Online Mudah',
            description:
                'Platform digital yang user-friendly memudahkan pelanggan untuk membeli produk secara aman dan cepat.',
        },
        {
            title: 'Relevansi Tren Anak Muda',
            description:
                'Produk selalu disesuaikan dengan tren streetwear dan gaya hidup generasi muda, membuat brand selalu up-to-date.',
        },
    ];

    return (
        <MainLayout>
            <Head title="Company Profile" />

            <section className="bg-background py-24">
                <div className="mx-auto max-w-6xl space-y-16 px-6">
                    {/* ===== Profile Perusahaan ===== */}
                    <div className="rounded-2xl bg-white/10 p-8 shadow-md">
                        <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                            Profile Perusahaan
                        </h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            Faith Industries adalah brand fashion lokal
                            Indonesia yang berdiri pada tahun 2019. Brand ini
                            fokus pada streetwear dan apparel kasual dengan
                            desain kreatif yang terinspirasi dari budaya pop,
                            anime, dan tren anak muda. Faith Industries
                            menghadirkan produk seperti kaos, hoodie, jaket, dan
                            merchandise lainnya yang menekankan kualitas bahan,
                            kenyamanan, dan estetika desain, sehingga setiap
                            koleksi mencerminkan identitas dan ekspresi diri
                            para penggunanya.
                        </p>
                    </div>

                    {/* ===== Pengalaman Perusahaan ===== */}
                    <div className="rounded-2xl bg-white/10 p-8 shadow-md">
                        <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                            Pengalaman Perusahaan
                        </h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            Sejak berdiri, Faith Industries telah menjadi salah
                            satu brand streetwear yang dikenal di kalangan anak
                            muda Indonesia. Brand ini aktif merilis koleksi
                            terbatas (limited edition) dan melakukan kolaborasi
                            dengan berbagai komunitas, termasuk seri anime
                            populer dan organisasi e-sports, sehingga
                            meningkatkan eksposur dan kepercayaan konsumen.
                            Pengalaman ini menjadikan Faith Industries tidak
                            hanya sekadar brand fashion, tetapi juga bagian dari
                            komunitas kreatif yang dinamis dan trendi.
                        </p>
                    </div>

                    {/* ===== Kelebihan Perusahaan ===== */}
                    <div>
                        <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
                            Kelebihan Perusahaan
                        </h2>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {advantages.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-neutral-800 bg-white/5 p-6 shadow-md transition hover:bg-white/10"
                                >
                                    <h3 className="mb-2 text-lg font-semibold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
