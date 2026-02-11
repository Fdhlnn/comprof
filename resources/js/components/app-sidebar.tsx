import { Link } from '@inertiajs/react';
import { BookOpen, Box, Calendar,  Image, LayoutGrid, MessageCircle, Users } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: "/admin/dashboard",
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: "/admin/products",
        icon: Box,
    },
    {
        title: 'Clients',
        href: "/admin/clients",
        icon: Users,
    },
    {
        title: 'Articles',
        href: "/admin/articles",
        icon: BookOpen,
    },
    {
        title: 'Gallery',
        href: "/admin/gallery",
        icon: Image,
    },
    {
        title: 'Events',
        href: "/admin/events",
        icon: Calendar,
    },
    {
        title: 'Contacts',
        href: "/admin/contacts",
        icon: MessageCircle,
    },
];


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href='/dashboard' prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
