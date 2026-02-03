import { Head, useForm } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import MainLayout from '@/layouts/main-layout';

export default function Contact() {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contacts', {
            onSuccess: () => reset(),
        });
    };

    return (
        <MainLayout>
            <Head title="Contact Us" />

            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-16 text-center">
                        <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
                        <p className="text-muted-foreground">
                            Tertarik bekerja sama atau punya pertanyaan? Jangan
                            ragu untuk menghubungi Faith Industries.
                        </p>
                    </div>

                    <div className="grid gap-12 md:grid-cols-2">
                        {/* INFO */}
                        <div className="space-y-6">
                            {/* LOGO + NAME */}
                            <div className="space-y-1">
                                <img
                                    src="/images/logo.png"
                                    alt="Faith Industries"
                                    className="h-50 w-auto"
                                />
                                <h3 className="text-xl font-semibold">
                                    Faith Industries
                                </h3>
                            </div>

                            <p className="leading-relaxed text-muted-foreground">
                                Brand fashion & lifestyle yang berfokus pada
                                desain grafis, merchandise eksklusif, dan
                                kolaborasi kreatif.
                            </p>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Mail className="text-muted-foreground" />
                                    <span>hello@faithindustries.co</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Phone className="text-muted-foreground" />
                                    <span>+62 812 3456 7890</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MapPin className="text-muted-foreground" />
                                    <span>Jakarta, Indonesia</span>
                                </div>
                            </div>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={submit}
                            className="space-y-6 rounded-2xl border bg-card p-8"
                        >
                            <input
                                placeholder="Name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full rounded-lg border px-4 py-3"
                            />

                            <input
                                placeholder="Email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="w-full rounded-lg border px-4 py-3"
                            />

                            <textarea
                                rows={4}
                                placeholder="Message"
                                value={data.message}
                                onChange={(e) =>
                                    setData('message', e.target.value)
                                }
                                className="w-full rounded-lg border px-4 py-3"
                            />

                            <button
                                disabled={processing}
                                className="w-full rounded-lg bg-black py-3 text-white"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
