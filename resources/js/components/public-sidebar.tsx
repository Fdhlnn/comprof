import { BookOpen, Box, Calendar, Home, ImageIcon, Info, Users } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import {Sidebar,SidebarContent, SidebarHeader,} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: "/home",
        icon: Home,
    },
    {
        title: 'Products',
        href: "/products",
        icon: Box,
    },
    {
        title: 'About',
        href: "/about",
        icon: Info,
    },
    {
        title: 'Clients',
        href: '/clients',
        icon: Users,
    },
    {
        title: 'Articles',
        href: '/articles',
        icon: BookOpen,
    },
    {
        title: 'Gallery',
        href: 'gallery',
        icon: ImageIcon,
    },
    {
        title: 'Events',
        href: '/events',
        icon: Calendar,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="px-4 py-3">
                <span className="text-lg font-bold tracking-wide"></span>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
        </Sidebar>
    );
}
