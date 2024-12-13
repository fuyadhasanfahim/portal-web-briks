import { IOrder } from '@/types/Order';
import { getPaginatedOrdersByStatus } from '@/utils/orders';
import ActiveOrdersMain from '@/components/order-management/active-orders/ActiveOrdersMain';
import { getLoggedInUserInfo, getUserId } from '@/utils/users';

export default async function page() {
    const filteredOrders = await getPaginatedOrdersByStatus({
        limit: 10,
        page: 1,
        status: 'inprogress',
    });

    const userId = await getUserId();
    const user = await getLoggedInUserInfo(userId);

    const totalPrice = filteredOrders?.orders?.reduce(
        (sum: number, order: IOrder) =>
            sum + parseFloat(order.estimatedTotal || '0'),
        0,
    );

    return (
        <div>
            <ActiveOrdersMain
                filteredOrders={filteredOrders}
                totalPrice={totalPrice}
                user={user}
            />
        </div>
    );
}
