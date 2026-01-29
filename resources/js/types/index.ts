export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';
import type { LucideIcon } from 'lucide-react';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
};

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
}
