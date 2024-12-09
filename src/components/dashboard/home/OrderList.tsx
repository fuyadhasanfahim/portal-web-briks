import { ArrowUpDown } from 'lucide-react';
import DateRangePicker from '../../shared/DateRangePicker';
import toast from 'react-hot-toast';
import { IOrder } from '@/types/Order';

export default async function OrderList() {
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
        <div className="space-y-10">
            <div className="flex items-center justify-between gap-10">
                <h3 className="text-black text-2xl font-medium">Order List</h3>

                <DateRangePicker className="" />
            </div>

            <div className="w-full shadow-sm rounded-2xl">
                {/* Table Header */}
                <div className="w-full h-16 bg-black rounded-tl-2xl rounded-tr-2xl px-6">
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
                <div className="w-full bg-white rounded-bl-2xl rounded-br-2xl border border-[#cccccc]">
                    {orders.map((order: IOrder, index: number) => (
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
                                ${order.estimatedTotalPrice.toLocaleString()}
                            </div>
                            <div className="text-black">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-black">
                                {order.completedDate
                                    ? new Date(
                                          order.completedDate,
                                      ).toLocaleDateString()
                                    : '-'}
                            </div>
                            <div className="text-center">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm
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
