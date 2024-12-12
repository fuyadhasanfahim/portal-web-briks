import ActiveOrderStats from '@/components/dashboard/home/stats/ActiveOrderStats';
import CancelOrderStats from '@/components/dashboard/home/stats/CancelOrderStats';
import OrderCompletedStats from '@/components/dashboard/home/stats/OrderCompletedStats';
import PendingOrderStats from '@/components/dashboard/home/stats/PendingOrderStats';
import OrderManagementHeroSection from '@/components/order-management/OrderManagementHeroSection';
import SortOrderList from '@/components/order-management/SortOrderList';
import { getOrders } from '@/utils/orders';
import Link from 'next/link';

export default async function page() {
    const orders = await getOrders();

    return (
        <div>
            <OrderManagementHeroSection />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center mx-auto w-full gap-10 py-10">
                <Link
                    href={'/order-management/completed-orders'}
                    className="scale-100 hover:scale-105 duration-200 ease-linear transition-transform"
                >
                    <OrderCompletedStats orders={orders} />
                </Link>
                <Link
                    href={'/order-management/active-orders'}
                    className="scale-100 hover:scale-105 duration-200 ease-linear transition-transform"
                >
                    <ActiveOrderStats orders={orders} />
                </Link>
                <Link
                    href={'/order-management/pending-orders'}
                    className="scale-100 hover:scale-105 duration-200 ease-linear transition-transform"
                >
                    <PendingOrderStats orders={orders} />
                </Link>
                <Link
                    href={'/order-management/canceled-orders'}
                    className="scale-100 hover:scale-105 duration-200 ease-linear transition-transform"
                >
                    <CancelOrderStats orders={orders} />
                </Link>
            </div>

            <div className="py-10">
                <SortOrderList />
            </div>
        </div>
    );
}
