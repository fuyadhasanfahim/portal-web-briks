import AppSidebar from '@/components/shared/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <div className="bg-gray-200 w-full p-4">{children}</div>
        </SidebarProvider>
    );
}
