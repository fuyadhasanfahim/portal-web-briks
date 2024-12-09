import { Bell, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import OnSearchButton from './OnSearchButton';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function Header() {
    const session = await getSession();
    const user = session?.user;

    if (!user) redirect('/signin');

    return (
        <div className="w-full h-20 bg-white px-6">
            <div className="h-full flex items-center justify-end">
                <div className="flex items-center gap-6">
                    <div className="flex items-center">
                        <OnSearchButton />

                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Image
                            src={user?.profileImage || '/icons/Ellipse.png'}
                            alt="User Avatar"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
