import { ArrowUpDown } from 'lucide-react';
import DateRangePicker from './DateRangePicker';

const orders = [
    {
        projectName: '1. Website Build S126',
        price: 2500,
        dueDate: '2024-12-12',
        completedDate: '2024-12-10',
        status: 'Completed',
    },
    {
        projectName: '2. Website Build S125',
        price: 3000,
        dueDate: '2024-12-15',
        completedDate: '',
        status: 'In Progress',
    },
    {
        projectName: '3. Website Build S124',
        price: 1800,
        dueDate: '2024-12-20',
        completedDate: '',
        status: 'Revision',
    },
    {
        projectName: '4. Website Build S126',
        price: 2500,
        dueDate: '2024-12-12',
        completedDate: '2024-12-10',
        status: 'Completed',
    },
    {
        projectName: '5. Website Build S125',
        price: 3000,
        dueDate: '2024-12-15',
        completedDate: '',
        status: 'In Progress',
    },
    {
        projectName: '6. Website Build S124',
        price: 1800,
        dueDate: '2024-12-20',
        completedDate: '',
        status: 'Revision',
    },
];

export default function OrderList() {
    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between gap-10">
                <h3 className="text-black text-2xl font-medium">Order List</h3>

                <DateRangePicker className="" />
            </div>

            <div className="w-full">
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
                    {orders.map((order, index) => (
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
                                {order.projectName}
                            </div>
                            <div className="text-black">
                                ${order.price.toLocaleString()}
                            </div>
                            <div className="text-black">
                                {new Date(order.dueDate).toLocaleDateString()}
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
                                        order.status === 'Completed'
                                            ? 'bg-green-100 text-green-800'
                                            : ''
                                    }
                                    ${
                                        order.status === 'In Progress'
                                            ? 'bg-blue-100 text-blue-800'
                                            : ''
                                    }
                                    ${
                                        order.status === 'Revision'
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
