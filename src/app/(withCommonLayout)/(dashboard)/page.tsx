import HeroSection from '@/components/dashboard/home/HeroSection';
import OrderSummary from '@/components/dashboard/home/order-charts/OrderSummary';
import OrderList from '@/components/dashboard/home/OrderList';
import OrderStatistics from '@/components/dashboard/home/OrderStatistics';
import OrderCompletedStats from '@/components/dashboard/home/stats/OrderCompletedStats';
import OrderInProgressStats from '@/components/dashboard/home/stats/OrderInProgressStats';
import TotalOrdersStats from '@/components/dashboard/home/stats/TotalOrdersStats';
import TotalSpentStats from '@/components/dashboard/home/stats/TotalSpentStats';
import { getSession } from '@/lib/getSession';
import { getOrders } from '@/utils/orders';
import getLoggedInUserInfo from '@/utils/users';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await getSession();
    const userId = session?.user?.userId;

    if (!userId) redirect('/signin');

    const user = await getLoggedInUserInfo(userId);

    const data = {
        userId,
        role: user?.role,
    };

    const orders = await getOrders(data);

    return (
        <div className="">
            <HeroSection name={user?.name} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center mx-auto w-full gap-10 py-10">
                <TotalOrdersStats orders={orders} />
                <OrderInProgressStats orders={orders} />
                <OrderCompletedStats orders={orders} />
                <TotalSpentStats />
            </div>

            <div className="py-10">
                <div className="flex items-center gap-5">
                    <OrderStatistics />
                    <OrderSummary />

                    <div className="w-full max-w-[267px] h-[330px] bg-white rounded-lg border border-neutral-100">
                        <p className="text-black text-xl font-medium px-4 py-6">
                            Need helps?
                        </p>

                        <div className="flex items-center justify-center">
                            <Image
                                src={'/images/need-help.png'}
                                alt="need help"
                                width={172}
                                height={164}
                            />
                        </div>

                        <div className="h-[37px] px-4 py-2 bg-gray-900 rounded-lg justify-center items-center gap-2 inline-flex mx-4 my-6">
                            <div className="text-white text-sm font-normal">
                                <span>Contact us</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <OrderList />
        </div>
    );
}
