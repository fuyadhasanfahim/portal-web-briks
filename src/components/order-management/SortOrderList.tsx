import { ChevronDown } from 'lucide-react';
import DateRangePicker from '../shared/DateRangePicker';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import PaginatedOrders from './PaginatedOrders';

export default async function SortOrderList() {
    const session = await getSession();
    const userId = session?.user?.userId;

    if (!userId) redirect('/signin');

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between gap-10">
                <h3 className="text-black text-2xl font-medium">Order List</h3>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="text-black text-sm font-normal">
                            Filter by:
                        </div>
                        <div className="h-[45px] px-4 py-3 rounded-lg border border-[#cccccc] justify-center items-center gap-2 inline-flex">
                            <div className="justify-start items-center gap-2 flex">
                                <div className="text-[#424242] text-sm font-normal">
                                    Monthly
                                </div>
                                <ChevronDown className="size-3" />
                            </div>
                        </div>
                    </div>

                    <DateRangePicker className="" />
                </div>
            </div>

            <PaginatedOrders />
        </div>
    );
}
