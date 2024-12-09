import { IOrder } from '@/types/Order';
import { TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function PendingOrderStats({ orders }: { orders: IOrder[] }) {
    const pending = orders.filter(
        (order) => order.status.toLowerCase() === 'pending',
    );

    return (
        <div className="w-full min-w-[264px] h-[139px] bg-white rounded-lg border border-neutral-100 shadow-sm">
            <div className="flex flex-col items-start justify-center gap-2 h-full px-6">
                <div className="inline-flex items-center justify-start w-full gap-3">
                    <div className="size-12 bg-black rounded-lg justify-center items-center inline-flex">
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
                            {pending?.length}
                        </h3>
                        <p className="text-[#424242] text-base font-normal">
                            Pending Order
                        </p>
                    </div>
                </div>
                <div className="w-full h-[0px] border border-[#ececec]" />
                <div className="flex items-center justify-between w-full">
                    <p className="text-[#424242] text-xs font-normal">
                        This months pending order
                    </p>
                    <div className="h-5 p-1 bg-[#e8dff8] rounded-2xl border justify-start items-center gap-2 inline-flex">
                        <div className="justify-start items-center gap-1 flex">
                            <TrendingUp className="w-[10px] h-2 text-[#6c3ccc]" />
                            <div className="text-[#6c3ccc] text-[8px] font-normal">
                                14%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
