'use client';

import { useState, useEffect } from 'react';
import { IOrder } from '@/types/Order';
import { getPaginatedOrders } from '@/utils/orders';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
    PaginationEllipsis,
} from '@/components/ui/pagination';

export default function PaginatedOrders() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ totalPages: 1 });

    const fetchOrders = async (page: number) => {
        const data = await getPaginatedOrders({ page, limit: 10 });
        console.log(data);

        if (data) {
            setOrders(data.orders);
            setPagination(data.pagination);
        } else {
            return (
                <div className="w-full h-full flex items-center justify-center">
                    No orders found
                </div>
            );
        }
    };

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);

    if (orders.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                No orders found
            </div>
        );
    }

    return (
        <div className="w-full rounded-2xl">
            <div className="w-full h-16 bg-gray-900 rounded-tl-2xl rounded-tr-2xl px-6">
                <div className="h-full grid grid-cols-5 items-center">
                    <button className="flex items-center gap-2 text-white font-medium">
                        Project Name
                        <ArrowUpDown className="h-4 w-4" />
                    </button>
                    <button className="flex items-center gap-2 text-white font-medium">
                        Price
                        <ArrowUpDown className="h-4 w-4" />
                    </button>
                    <button className="flex items-center gap-2 text-white font-medium">
                        Due Date
                        <ArrowUpDown className="h-4 w-4" />
                    </button>
                    <button className="flex items-center gap-2 text-white font-medium">
                        Complete Date
                        <ArrowUpDown className="h-4 w-4" />
                    </button>
                    <button className="flex items-center justify-center gap-2 text-white font-medium">
                        Order Progress
                        <ArrowUpDown className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="w-full bg-white rounded-b-2xl border border-[#cccccc]">
                {orders.map((order: IOrder, index: number) => (
                    <div
                        key={order.orderId || index}
                        className={`grid grid-cols-5 px-6 py-4 items-center ${
                            index !== orders.length - 1
                                ? 'border-b border-[#cccccc]'
                                : ''
                        }`}
                    >
                        <div className="text-black font-medium">
                            {order.title}
                        </div>
                        <div className="text-black">
                            ${order.estimatedTotal.toLocaleString()}
                        </div>
                        <div className="text-black">
                            {order.dueDate?.from
                                ? format(
                                      new Date(order.dueDate.from),
                                      'dd-MM-yyyy',
                                  )
                                : 'No date available'}
                        </div>
                        <div className="text-black">
                            {order.dueDate?.to
                                ? format(
                                      new Date(order.dueDate.to),
                                      'dd-MM-yyyy',
                                  )
                                : 'No date available'}
                        </div>
                        <div className="text-center">
                            <span
                                className={`px-3 py-1 rounded-full text-sm capitalize ${
                                    order.status === 'completed'
                                        ? 'bg-green-100 text-green-800'
                                        : order.status === 'in-progress'
                                        ? 'bg-blue-100 text-blue-800'
                                        : order.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : order.status === 'cancel'
                                        ? 'bg-red-100 text-red-800'
                                        : ''
                                }`}
                            >
                                {order.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() =>
                                currentPage > 1 &&
                                setCurrentPage(currentPage - 1)
                            }
                        />
                    </PaginationItem>
                    {Array.from(
                        { length: pagination.totalPages },
                        (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={
                                        currentPage === index + 1
                                            ? 'font-bold text-[#ffa726]'
                                            : ''
                                    }
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ),
                    )}
                    {pagination.totalPages > 5 && <PaginationEllipsis />}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() =>
                                currentPage < pagination.totalPages &&
                                setCurrentPage(currentPage + 1)
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
