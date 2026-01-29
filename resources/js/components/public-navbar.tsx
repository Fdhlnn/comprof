import { Link } from '@inertiajs/react';
import { useSidebar } from '@/components/ui/sidebar';

export function AppNavbar() {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="border-b bg-black">
            <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">
                {/* Logo + Brand (CLICKABLE) */}
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="flex items-center gap-3 focus:outline-none"
                >
                    <img
                        src="/images/logo.png"
                        alt="Faith Industries Logo"
                        className="h-15 w-20 object-contain"
                    />
                    <span className="text-lg font-semibold tracking-wide text-white">
                        Faith Industries
                    </span>
                </button>

                {/* Navigation */}
                <nav className="flex items-center gap-8 text-sm text-white">
                    <Link href="/" className="hover:text-neutral-300">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-neutral-300">
                        About
                    </Link>
                    <Link href="/events" className="hover:text-neutral-300">
                        Events
                    </Link>
                    <Link href="/articles" className="hover:text-neutral-300">
                        Articles
                    </Link>
                    <Link href="/gallery" className="hover:text-neutral-300">
                        Gallery
                    </Link>
                    <Link href="/contact" className="hover:text-neutral-300">
                        Contact
                    </Link>
                </nav>

                {/* Login */}
                <Link
                    href="/login"
                    className="text-sm font-medium text-white hover:text-neutral-300"
                >
                    Login
                </Link>
            </div>
        </header>
    );
}
