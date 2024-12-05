import Header from '@/components/shared/Header';
import AppSidebar from '@/components/shared/Sidebar';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <AppSidebar />

            <div className="flex flex-col flex-1">
                <Header />

                <main className="flex-1 bg-[#fff9f2] p-4">{children}</main>
            </div>
        </div>
    );
}
