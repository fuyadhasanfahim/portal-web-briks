import { ArrowUpDown } from 'lucide-react';
import DateRangePicker from '../../shared/DateRangePicker';
import { IOrder } from '@/types/Order';
import { getOrders } from '@/utils/orders';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';

export default async function OrderList() {
    const session = await getSession();
    const userId = session?.user?.userId;

    if (!userId) redirect('/signin');

    const orders = await getOrders();

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between gap-10">
                <h3 className="text-black text-2xl font-medium">Order List</h3>

                <DateRangePicker />
            </div>

            <div className="w-full shadow-sm rounded-2xl">
                {/* Table Header */}
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

                {/* Table Body */}
                <div className="w-full bg-white rounded-b-2xl border border-[#cccccc]">
                    {orders
                        ?.slice(0, 10)
                        .map((order: IOrder, index: number) => (
                            <div
                                key={index}
                                className={`grid grid-cols-5 px-6 py-4 items-center
                                ${
                                    index !== orders.length - 1
                                        ? 'border-b border-[#cccccc]'
                                        : ''
                                }`}
                            >
                                <div className="text-black font-medium">
                                    {order.title}
                                </div>
                                <div className="text-black">
                                    ${order.estimatedTotal}
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
                                        className={`px-3 py-1 rounded-full text-sm capitalize
                                    ${
                                        order.status === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : ''
                                    }
                                    ${
                                        order.status === 'in-progress'
                                            ? 'bg-blue-100 text-blue-800'
                                            : ''
                                    }
                                    ${
                                        order.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : ''
                                    }
                                `}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
