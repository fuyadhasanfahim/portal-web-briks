import { IOrder } from '@/models/order/order.interface';
import { TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function OrderCompletedStats({ orders }: { orders: IOrder[] }) {
    const completedOrders = orders?.filter(
        (order) => order.status.toLowerCase() === 'completed',
    );

    console.log(orders?.length);

    return (
        <div className="w-full min-w-[264px] h-[139px] bg-white rounded-lg border border-neutral-100 shadow-sm">
            <div className="flex flex-col items-start justify-center gap-2 h-full px-6">
                <div className="inline-flex items-center justify-start w-full gap-3">
                    <div className="size-12 bg-gray-900 rounded-lg justify-center items-center inline-flex">
                        <Image
                            src={'/icons/order-completed.svg'}
                            alt="order completed icon"
                            width={32}
                            height={32}
                            className="relative"
                        />
                    </div>
                    <div>
                        <h3 className="h-[22px] text-black text-xl font-semibold']">
                            {completedOrders?.length}
                        </h3>
                        <p className="text-[#424242] text-base font-normal">
                            Completed Order
                        </p>
                    </div>
                </div>
                <div className="w-full h-[0px] border border-[#ececec]" />
                <div className="flex items-center justify-between w-full">
                    <p className="text-[#424242] text-xs font-normal">
                        Total Completed Order order
                    </p>
                    <div className="h-5 p-1 bg-[#f9f0e3] rounded-2xl border justify-start items-center gap-2 inline-flex">
                        <div className="justify-start items-center gap-1 flex">
                            <TrendingUp className="w-[10px] h-2 text-[#ffa726]" />
                            <div className="text-[#ffa726] text-[8px] font-normal">
                                14%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
