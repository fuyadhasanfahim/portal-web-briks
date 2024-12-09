import ActiveOrderStats from '@/components/dashboard/home/stats/ActiveOrderStats';
import CancelOrderStats from '@/components/dashboard/home/stats/CancelOrderStats';
import OrderCompletedStats from '@/components/dashboard/home/stats/OrderCompletedStats';
import PendingOrderStats from '@/components/dashboard/home/stats/PendingOrderStats';
import OrderManagementHeroSection from '@/components/order-management/OrderManagementHeroSection';
import SortOrderList from '@/components/order-management/SortOrderList';
import toast from 'react-hot-toast';

export default async function page() {
    const response = await fetch(
        'http://localhost:3000/api/orders/get-all-orders',
        {
            method: 'GET',
            credentials: 'include',
        },
    );

    if (!response.ok) {
        toast.error('Failed to fetch orders');
        return;
    }

    const { success, data, message } = await response.json();

    if (!success) {
        toast.error(message);
        return;
    }

    const orders = data;

    return (
        <div>
            <OrderManagementHeroSection />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center mx-auto w-full gap-10 py-10">
                <OrderCompletedStats orders={orders} />
                <ActiveOrderStats orders={orders} />
                <PendingOrderStats orders={orders} />
                <CancelOrderStats orders={orders} />
            </div>

            <div className="py-10">
                <SortOrderList />
            </div>
        </div>
    );
}
