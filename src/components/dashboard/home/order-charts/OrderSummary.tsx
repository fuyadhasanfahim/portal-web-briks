'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Define order status types and colors
const ORDER_STATUS = {
    completed: { name: 'Completed', color: '#ffa726' },
    active: { name: 'Active', color: '#2dc23e' },
    revision: { name: 'Revision', color: '#6c3ccc' },
    cancelled: { name: 'Cancelled', color: '#e24143' },
};

// Sample data - replace with your actual data
const data = [
    { name: 'Completed', value: 400 },
    { name: 'Active', value: 300 },
    { name: 'Revision', value: 200 },
    { name: 'Cancelled', value: 100 },
];

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

export default function OrderSummary() {
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
