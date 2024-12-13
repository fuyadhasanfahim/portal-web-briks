'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { IOrder } from '@/types/Order';

const chartConfig = {
    expense: {
        color: '#ffa726',
    },
} satisfies ChartConfig;

const allMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

function transformOrdersToChartData(orders: IOrder[], filter: string) {
    const monthlyExpenses: Record<string, number> = {};

    orders.forEach((order) => {
        const date = new Date(order.dueDate.from);
        let key = '';

        switch (filter) {
            case 'daily':
                key = date.toLocaleDateString('default', {
                    day: 'numeric',
                    month: 'short',
                });
                break;
            case 'weekly':
                const week = Math.ceil(date.getDate() / 7);
                key = `${date.toLocaleString('default', {
                    month: 'short',
                })} W${week}`;
                break;
            case 'monthly':
            default:
                key = date.toLocaleString('default', { month: 'short' });
                break;
        }

        monthlyExpenses[key] =
            (monthlyExpenses[key] || 0) + parseFloat(order.estimatedTotal);
    });

    return allMonths.map((month) => ({
        month,
        expense: monthlyExpenses[month] || 0,
    }));
}

export default function OrderStatistics({ orders }: { orders: IOrder[] }) {
    const [filter, setFilter] = useState('monthly');
    const chartData = transformOrdersToChartData(orders, filter);

    return (
        <div className="w-full min-w-[640px] h-[330px] bg-white rounded-lg border border-neutral-100">
            <div className="p-6 inline-flex flex-wrap items-center w-full justify-between gap-10">
                <div className="text-black text-xl font-medium">
                    Order statistics
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

            <div className="w-full h-[220px]">
                <ChartContainer
                    config={chartConfig}
                    className="w-full h-[266px]"
                >
                    <BarChart data={chartData} width={500} height={600}>
                        <CartesianGrid horizontal={true} vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    formatter={(value) => `$${value}`}
                                />
                            }
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="expense" radius={[10, 10, 0, 0]}>
                            {chartData.map((_entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        index % 2 === 0 ? '#ececec' : '#ffa726'
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    );
}
