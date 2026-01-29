import { SidebarTrigger } from '@/components/ui/sidebar';
import login from '@/routes/login';
import { Link } from '@inertiajs/react';

export function AppNavbar() {
    return (
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-14">
            <div className='flex items-center gap-15'>
                <div className="flex h-14 items-center gap-4">
                    <SidebarTrigger />
                    <h1 className="text-sm font-medium text-muted-foreground">
                        PT WHOOSH
                    </h1>
                </div>
                <nav>
                    <Link href={'home'}>Home</Link>
                    <Link href={'about'} className="ml-4">About</Link>
                    <Link href={'events'} className="ml-4">Events</Link>
                    <Link href={'articles'} className="ml-4">Articles</Link>
                    <Link href={'gallery'} className="ml-4">Gallery</Link>
                    <Link href={'contact'} className="ml-4">Contact</Link>
                </nav>
            </div>
            <nav className="flex gap-5">
                <Link href={'login'}>Login</Link>
            </nav>
        </header>
    );
}
