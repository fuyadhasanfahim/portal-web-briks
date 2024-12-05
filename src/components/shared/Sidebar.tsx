'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: '/icons/dashboard.svg',
            path: '/',
        },
        {
            title: 'Service List',
            icon: '/icons/serviceList.svg',
            path: '/service-list',
        },
        {
            title: 'Order Management',
            icon: '/icons/orderManagement.svg',
            path: '/order-management',
        },
        { title: 'Expenses', icon: '/icons/expenses.svg', path: '/expenses' },
        { title: 'Profile', icon: '/icons/profile.svg', path: '/profile' },
        { title: 'Settings', icon: '/icons/settings.svg', path: '/settings' },
    ];

    return (
        <div className="w-[293px] h-full min-h-screen bg-white flex flex-col static top-0">
            <div className="p-6">
                <Image
                    src={'/logo/web-birks-logo.svg'}
                    alt="web briks logo"
                    width={213}
                    height={28.71}
                />
            </div>

            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${
                          isActive
                              ? 'bg-primary/10 text-primary'
                              : 'text-gray-600 hover:bg-gray-100'
                      }`}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={20}
                                        height={20}
                                    />
                                    <span className="text-[#424242] text-base font-normal">
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
