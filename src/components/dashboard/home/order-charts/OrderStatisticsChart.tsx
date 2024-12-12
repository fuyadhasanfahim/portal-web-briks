'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { IOrder } from '@/types/Order';

const chartData = [
    { month: 'Jan', expense: 2500 },
    { month: 'Feb', expense: 3800 },
    { month: 'Mar', expense: 2900 },
    { month: 'Apr', expense: 4200 },
    { month: 'May', expense: 3100 },
    { month: 'Jun', expense: 4800 },
    { month: 'Jul', expense: 5300 },
    { month: 'Aug', expense: 5800 },
    { month: 'Sep', expense: 4800 },
    { month: 'Oct', expense: 6300 },
    { month: 'Nov', expense: 6500 },
    { month: 'Dec', expense: 8000 },
];

const chartConfig = {
    expense: {
        color: '#ffa726',
    },
} satisfies ChartConfig;

export default function OrderStatisticsChart({ orders }: { orders: IOrder[] }) {
    return (
        <ChartContainer config={chartConfig} className="w-full h-[266px]">
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
                            fill={index % 2 === 0 ? '#ececec' : '#ffa726'}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ChartContainer>
    );
}
