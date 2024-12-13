'use client';

import { useState, useEffect } from 'react';
import { IOrder } from '@/types/Order';
import { getPaginatedOrders } from '@/utils/orders';
import {
    format,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
} from 'date-fns';
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
import OrderManagementDateRangePicker from './OrderManagementDateRangePicker';
import { DateRange } from 'react-day-picker';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

export default function SortOrderList({
    initialOrders,
}: {
    initialOrders: IOrder[];
}) {
    const [orders, setOrders] = useState<IOrder[]>(initialOrders);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ totalPages: 1 });
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [date, setDate] = useState<DateRange>({
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    });
    const [filter, setFilter] = useState('monthly');

    const fetchOrders = async (page: number) => {
        const data = await getPaginatedOrders({ page, limit: 10 });
        if (data) {
            let filteredOrders = data.orders as IOrder[];

            const now = new Date();
            if (filter === 'daily') {
                filteredOrders = filteredOrders.filter((order) => {
                    const orderDate = new Date(order.dueDate.from);
                    return orderDate.toDateString() === now.toDateString();
                });
            } else if (filter === 'weekly') {
                const start = startOfWeek(now);
                const end = endOfWeek(now);
                filteredOrders = filteredOrders.filter((order) => {
                    const orderDate = new Date(order.dueDate.from);
                    return orderDate >= start && orderDate <= end;
                });
            } else if (filter === 'monthly') {
                const start = startOfMonth(now);
                const end = endOfMonth(now);
                filteredOrders = filteredOrders.filter((order) => {
                    const orderDate = new Date(order.dueDate.from);
                    return orderDate >= start && orderDate <= end;
                });
            }

            setOrders(filteredOrders);
            setPagination(data.pagination);
        }
    };

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage, filter]);

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const sortedOrders = [...orders].sort((a, b) => {
        if (!sortField) return 0;

        const aValue = a[sortField as keyof IOrder];
        const bValue = b[sortField as keyof IOrder];

        if (sortField.includes('dueDate')) {
            const aDate = new Date(aValue as string);
            const bDate = new Date(bValue as string);
            return sortOrder === 'asc'
                ? aDate.getTime() - bDate.getTime()
                : bDate.getTime() - aDate.getTime();
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
    });

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between gap-10">
                <h3 className="text-black text-2xl font-medium">Order List</h3>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="text-black text-sm font-normal">
                            Filter by:
                        </div>
                        <Select value={filter} onValueChange={setFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="monthly" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">daily</SelectItem>
                                <SelectItem value="weekly">weekly</SelectItem>
                                <SelectItem value="monthly">monthly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <OrderManagementDateRangePicker
                        date={date}
                        setDate={setDate}
                    />
                </div>
            </div>

            <div className="w-full rounded-2xl">
                <div className="w-full h-16 bg-gray-900 rounded-tl-2xl rounded-tr-2xl px-6">
                    <div className="h-full grid grid-cols-5 items-center">
                        {[
                            'title',
                            'estimatedTotal',
                            'dueDate.from',
                            'dueDate.to',
                            'status',
                        ].map((field, index) => (
                            <button
                                key={field}
                                onClick={() => handleSort(field)}
                                className={`flex items-center gap-2 text-white font-medium ${
                                    sortField === field ? 'text-[#ffa726]' : ''
                                }`}
                            >
                                {
                                    [
                                        'Project Name',
                                        'Price',
                                        'Due Date',
                                        'Complete Date',
                                        'Order Progress',
                                    ][index]
                                }
                                <ArrowUpDown className="h-4 w-4" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full bg-white rounded-b-2xl border border-[#cccccc]">
                    {sortedOrders.map((order: IOrder, index: number) => (
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
                                            : order.status === 'inprogress'
                                            ? 'bg-blue-100 text-blue-800'
                                            : order.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : order.status === 'canceled'
                                            ? 'bg-red-100 text-red-800'
                                            : order.status === 'delivered'
                                            ? 'bg-purple-100 text-purple-800'
                                            : order.status === 'review'
                                            ? 'bg-orange-100 text-orange-800'
                                            : order.status === 'finished'
                                            ? 'bg-teal-100 text-teal-800'
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
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
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
        </div>
    );
}
