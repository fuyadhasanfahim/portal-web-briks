import PendingOrdersMain from '@/components/order-management/pending-orders/PendingOrdersMain';
import { IOrder } from '@/types/Order';
import { getPaginatedOrdersByStatus } from '@/utils/orders';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export default async function page() {
    const filteredOrders = await getPaginatedOrdersByStatus({
        limit: 10,
        page: 1,
        status: 'pending',
    });

    const totalPrice = filteredOrders?.orders?.reduce(
        (sum: number, order: IOrder) =>
            sum + parseFloat(order.estimatedTotal || '0'),
        0,
    );

    return (
        <div>
            <PendingOrdersMain
                filteredOrders={filteredOrders}
                totalPrice={totalPrice}
            />

            <Pagination className="mt-6">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
