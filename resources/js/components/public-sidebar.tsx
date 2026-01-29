import { NavMain } from '@/components/nav-main';
import {Sidebar,SidebarContent, SidebarHeader,} from '@/components/ui/sidebar';
import { NavItem } from '@/types';
import { BookOpen, Box, Calendar, Folder, Image, ImageIcon, LayoutGrid, Users } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '#',
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: '#',
        icon: Box,
    },
    {
        title: 'Clients',
        href: '#',
        icon: Users,
    },
    {
        title: 'Articles',
        href: '#',
        icon: BookOpen,
    },
    {
        title: 'Gallery',
        href: '#',
        icon: ImageIcon,
    },
    {
        title: 'Events',
        href: '#',
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
