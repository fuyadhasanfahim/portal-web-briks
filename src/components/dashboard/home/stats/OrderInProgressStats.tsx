import { IOrder } from '@/models/order/order.interface';
import { TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function OrderInProgressStats({ orders }: { orders: IOrder[] }) {
    const inprogressOrders = orders.filter(
        (order) => order.status.toLowerCase() === 'in-progress',
    );

    return (
        <div className="w-[264px] h-[139px] bg-white rounded-lg border border-neutral-100 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-2 h-full">
                <div className="inline-flex items-center justify-start gap-3 w-full ml-10">
                    <div className="size-12 bg-black rounded-lg justify-center items-center inline-flex">
                        <Image
                            src={'/icons/inprogress-icon.svg'}
                            alt="inprogress icon"
                            width={32}
                            height={32}
                            className="relative"
                        />
                    </div>
                    <div>
                        <h3 className="h-[22px] text-black text-xl font-semibold']">
                            {inprogressOrders?.length}
                        </h3>
                        <p className="text-[#424242] text-base font-normal">
                            Order in process
                        </p>
                    </div>
                </div>
                <div className="w-[230px] h-[0px] border border-[#ececec]" />
                <div className="flex items-center justify-between w-full px-5">
                    <p className="text-[#424242] text-xs font-normal">
                        This months Running order
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