'use client';

import { IOrder } from '@/types/Order';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ORDER_STATUS = {
    pending: { name: 'pending', color: '#ffa726' },
    completed: { name: 'completed', color: '#2dc23e' },
    inprogress: { name: 'inprogress', color: '#6c3ccc' },
    canceled: { name: 'canceled', color: '#e24143' },
};

const RADIAN = Math.PI / 180;

interface CustomizedLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}: CustomizedLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            className="text-xs font-medium"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function OrderSummary({ orders }: { orders: IOrder[] }) {
    const validOrders = Array.isArray(orders) ? orders : [];

    // Calculate status counts with normalization
    const statusCounts = validOrders.reduce((acc, order) => {
        const normalizedStatus = order.status.toLowerCase();
        acc[normalizedStatus] = (acc[normalizedStatus] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Prepare data for PieChart
    const data = Object.entries(ORDER_STATUS).map(([key, { name }]) => ({
        name,
        value: statusCounts[key] || 0,
    }));

    console.log('Orders:', orders);
    console.log('Chart Data:', data);

    // Fallback for no data
    if (data.every((entry) => entry.value === 0)) {
        return (
            <div className="w-full max-w-[264px] h-[330px] bg-white rounded-lg border border-neutral-100 flex items-center justify-center">
                <p className="text-gray-500">No orders to display.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[264px] h-[330px] bg-white rounded-lg border border-neutral-100">
            <h3 className="text-black text-xl font-medium px-4 py-6">
                Order Summary
            </h3>

            <div className="w-full h-[190px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        Object.values(ORDER_STATUS)[index].color
                                    }
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="px-4 grid grid-cols-2 gap-2 text-sm">
                {Object.entries(ORDER_STATUS).map(([key, { name, color }]) => (
                    <div key={key} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                        <span>{name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
