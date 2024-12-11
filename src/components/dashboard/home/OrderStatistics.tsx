import OrderStatisticsChart from './order-charts/OrderStatisticsChart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { IOrder } from '@/types/Order';

export default function OrderStatistics({ orders }: { orders: IOrder[] }) {
    return (
        <div className="w-full min-w-[640px] h-[330px] bg-white rounded-lg border border-neutral-100">
            <div className="p-6 inline-flex flex-wrap items-center w-full justify-between gap-10">
                <div className="text-black text-xl font-medium">
                    Order statistics
                </div>
                <Select>
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
                <OrderStatisticsChart orders={orders} />
            </div>
        </div>
    );
}
