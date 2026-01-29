import { NavMain } from '@/components/nav-main';
import {Sidebar,SidebarContent, SidebarHeader,} from '@/components/ui/sidebar';
import { NavItem } from '@/types';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '#',
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: '#',
        icon: Folder,
    },
    {
        title: 'Clients',
        href: '#',
        icon: Folder,
    },
    {
        title: 'Articles',
        href: '#',
        icon: BookOpen,
    },
    {
        title: 'Gallery',
        href: '#',
        icon: Folder,
    },
    {
        title: 'Events',
        href: '#',
        icon: Folder,
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
