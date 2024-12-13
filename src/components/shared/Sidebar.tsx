'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
            submenu: [
                {
                    title: 'Completed Orders',
                    path: '/order-management/completed-orders',
                },
                {
                    title: 'Active Orders',
                    path: '/order-management/active-orders',
                },
                {
                    title: 'Pending Orders',
                    path: '/order-management/pending-orders',
                },
                {
                    title: 'Canceled Orders',
                    path: '/order-management/canceled-orders',
                },
            ],
        },
        { title: 'Expenses', icon: '/icons/expenses.svg', path: '/expenses' },
        { title: 'Profile', icon: '/icons/profile.svg', path: '/profile' },
        { title: 'Settings', icon: '/icons/settings.svg', path: '/settings' },
    ];

    const toggleDropdown = (title: string) => {
        setOpenDropdown((prev) => (prev === title ? null : title));
    };

    return (
        <div className="w-[293px] h-full min-h-screen bg-white flex flex-col sticky top-0 shadow-md">
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
                        const isOpen = openDropdown === item.title;

                        return (
                            <li key={item.path} className="group w-full">
                                <div className="flex items-center justify-between w-full">
                                    <Link
                                        href={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-all duration-300 ${
                                            isActive
                                                ? 'bg-primary/10 text-primary shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'
                                        }`}
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            width={20}
                                            height={20}
                                        />
                                        <span className="flex items-center gap-2 text-[#424242] text-base font-medium">
                                            {item.title}
                                            {item.submenu && (
                                                <span
                                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleDropdown(
                                                            item.title,
                                                        );
                                                    }}
                                                >
                                                    {isOpen ? (
                                                        <ChevronUp />
                                                    ) : (
                                                        <ChevronDown />
                                                    )}
                                                </span>
                                            )}
                                        </span>
                                    </Link>
                                </div>

                                {isOpen && item.submenu && (
                                    <ul className="pl-8 mt-2 space-y-1 border-l-2 border-gray-200 w-full">
                                        {item.submenu.map((subItem) => (
                                            <li
                                                key={subItem.path}
                                                className="w-full"
                                            >
                                                <Link
                                                    href={subItem.path}
                                                    className={`block px-4 py-2 rounded-lg transition-all duration-300 w-full ${
                                                        pathname ===
                                                        subItem.path
                                                            ? 'bg-primary/10 text-primary shadow-inner'
                                                            : 'text-gray-600 hover:bg-gray-100 hover:shadow-inner'
                                                    }`}
                                                >
                                                    {subItem.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
