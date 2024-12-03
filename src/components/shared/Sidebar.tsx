'use client';

import { CircleHelp, Home, Inbox, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';

const items = [
    {
        title: 'Home',
        url: '/',
        icon: Home,
    },
    {
        title: 'My Orders',
        url: '/my-orders',
        icon: Inbox,
    },
];

export default function AppSidebar() {
    return (
        <Sidebar variant="inset">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem className="space-y-2">
                                <div>
                                    <Link href={'/create-order'}>
                                        <Button className="w-full bg-red-500 hover:bg-red-600">
                                            <PlusCircle className="h-5 w-5" />
                                            <span>Create Order</span>
                                        </Button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href={'/request-quote'}>
                                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                                            <CircleHelp className="h-5 w-5" />
                                            <span>Request Quote</span>
                                        </Button>
                                    </Link>
                                </div>
                            </SidebarMenuItem>

                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
