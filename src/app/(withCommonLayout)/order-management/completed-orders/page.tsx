import { IOrder } from '@/types/Order';
import { getPaginatedOrdersByStatus } from '@/utils/orders';
import CompletedOrdersMain from '@/components/order-management/completed-orders/CompletedOrdersMain';
import { getLoggedInUserInfo, getUserId } from '@/utils/users';

export default async function page() {
    const filteredOrders = await getPaginatedOrdersByStatus({
        limit: 10,
        page: 1,
        status: 'completed',
    });

    const totalPrice = filteredOrders?.orders?.reduce(
        (sum: number, order: IOrder) =>
            sum + parseFloat(order.estimatedTotal || '0'),
        0,
    );

    const userId = await getUserId();
    const user = await getLoggedInUserInfo(userId);

    return (
        <div>
            <CompletedOrdersMain
                filteredOrders={filteredOrders}
                totalPrice={totalPrice}
                user={user}
            />
        </div>
    );
}