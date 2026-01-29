import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, FileText, Calendar, Image, Github, Globe } from 'lucide-react';
import type { NavItem as NavItemType } from '@/types';

export type BreadcrumbItem = {
    title: string;
    href: string;
};

export type NavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
};

export const mainNav: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Article',
        href: '/article',
        icon: FileText,
    },
    {
        title: 'Event',
        href: '/event',
        icon: Calendar,
    },
    {
        title: 'Gallery',
        href: '/gallery',
        icon: Image,
    },
];

export const footerNav: NavItem[] = [
    {
        title: 'Website',
        href: 'https://whoosh.id',
        icon: Globe,
    },
    {
        title: 'Github',
        href: 'https://github.com',
        icon: Github,
    },
];
