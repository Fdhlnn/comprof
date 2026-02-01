import type { PropsWithChildren } from 'react';
import { AppNavbar } from '@/components/public-navbar';
import { AppSidebar } from '@/components/public-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <SidebarProvider defaultOpen={false}>
            <div className="flex min-h-screen w-full">
                <AppSidebar />

                <div className="flex flex-1 flex-col">
                    <AppNavbar />

                    <main className="flex-1 overflow-hidden bg-muted/30">
                        {children}
                    </main>

                    <footer className="flex h-10 items-center justify-center border-t text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Faith Industries
                    </footer>
                </div>
            </div>
        </SidebarProvider>
    );
}
