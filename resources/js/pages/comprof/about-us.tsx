import MainLayout from '@/layouts/main-layout';

export default function About() {
    return (
        <MainLayout>
            {/* Content */}
            <section className="mx-auto max-w-7xl px-6 pb-20">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    {/* Image 1 */}
                    <div className="flex items-center justify-center">
                        <img
                            src="/images/logo.png"
                            alt="About Faith Industries"
                            className="w-full max-w-md rounded-lg object-cover"
                        />
                    </div>

                    {/* Perkenalan Industri */}
                    <div className="flex flex-col justify-center">
                        <h2 className="mb-4 text-2xl font-semibold">
                            Tentang Kami
                        </h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            Faith Industries adalah brand fashion yang mengusung
                            kreativitas dan ekspresi diri sebagai identitas
                            utama. Kami menghadirkan produk fashion dengan
                            desain yang bermakna, nyaman digunakan, dan relevan
                            dengan gaya hidup generasi modern. Melalui setiap
                            koleksi, Faith Industries ingin menjadi bagian dari
                            cerita dan kepercayaan diri para penggunanya.
                        </p>
                    </div>

                    {/* Visi & Misi */}
                    <div className="flex flex-col justify-center">
                        <h2 className="mb-4 text-2xl font-semibold">
                            Visi & Misi
                        </h2>
                        <ul className="space-y-3 text-lg text-muted-foreground">
                            <li>
                                <strong>Visi:</strong> Menjadi brand fashion
                                yang menginspirasi generasi muda untuk
                                mengekspresikan identitas dan kepercayaan diri
                                melalui desain yang bermakna, kreatif, dan
                                berkualitas.
                            </li>
                            <li>
                                <strong>Misi:</strong> Faith Industries
                                berkomitmen untuk menghadirkan produk fashion
                                dengan desain orisinal dan kualitas terbaik,
                                membangun hubungan yang kuat dengan komunitas
                                dan pelanggan, serta terus berinovasi mengikuti
                                perkembangan tren tanpa meninggalkan nilai dan
                                karakter brand. Kami juga berupaya menciptakan
                                pengalaman berbelanja yang mudah, aman, dan
                                menyenangkan melalui platform digital yang
                                terpercaya.
                            </li>
                        </ul>
                    </div>

                    {/* Image 2 */}
                    <div className="flex items-center justify-center">
                        <img
                            src="/images/logo.png"
                            alt="Visi dan Misi"
                            className="w-full max-w-md rounded-lg object-cover"
                        />
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
