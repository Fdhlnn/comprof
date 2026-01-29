import { AppNavbar } from '@/components/public-navbar';
import { AppSidebar } from '@/components/public-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />

                <div className="flex flex-1 flex-col">
                    <AppNavbar />

                    <main className="flex-1 bg-muted/30 p-6">{children}</main>

                    <footer className="flex h-10 items-center justify-center border-t text-xs text-muted-foreground">
                        © {new Date().getFullYear()} WHOOSH
                    </footer>
                </div>
            </div>
        </SidebarProvider>
    );
}
