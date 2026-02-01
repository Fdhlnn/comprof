import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import MainLayout from '@/layouts/main-layout';

export default function Contact() {
    return (
        <MainLayout>
            <Head title="Contact" />

            <section className="bg-background py-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                            Contact Us
                        </h1>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            Tertarik bekerja sama atau punya pertanyaan? Jangan
                            ragu untuk menghubungi Faith Industries.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="grid gap-12 md:grid-cols-2">
                        {/* Info */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="mb-4 text-xl font-semibold">
                                    Faith Industries
                                </h3>
                                <p className="leading-relaxed text-muted-foreground">
                                    Brand fashion & lifestyle yang berfokus pada
                                    desain grafis, merchandise eksklusif, dan
                                    kolaborasi kreatif.
                                </p>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div className="flex items-center gap-3">
                                    <Mail className="text-muted-foreground" />
                                    <span>hello@faithindustries.co</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="text-muted-foreground" />
                                    <span>+62 812 3456 7890</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="text-muted-foreground" />
                                    <span>Jakarta, Indonesia</span>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="rounded-2xl border bg-card p-8">
                            <form className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="mt-2 w-full rounded-lg border bg-background px-4 py-3 focus:ring-2 focus:ring-ring focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="you@email.com"
                                        className="mt-2 w-full rounded-lg border bg-background px-4 py-3 focus:ring-2 focus:ring-ring focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about your project..."
                                        className="mt-2 w-full resize-none rounded-lg border bg-background px-4 py-3 focus:ring-2 focus:ring-ring focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-neutral-800"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
