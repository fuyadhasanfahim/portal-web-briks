import Image from 'next/image';
import OrderStatisticsChart from './order-charts/OrderStatisticsChart';

export default function OrderStatistics() {
    return (
        <div className="w-[640px] h-[330px] bg-white rounded-lg border border-neutral-100">
            <div className="p-6 inline-flex flex-wrap items-center w-full justify-between gap-10">
                <div className="text-black text-xl font-medium">
                    Order statistics
                </div>
                <div className="h-[34px] px-4 py-2 rounded-lg border border-[#424242] justify-center items-center gap-2 inline-flex">
                    <div className="text-[#424242] text-xs font-normal">
                        Monthly
                    </div>
                    <Image
                        src={'/icons/arrow.svg'}
                        alt="arrow"
                        width={12}
                        height={12}
                        className="relative"
                    />
                </div>
            </div>

            <div className="w-full h-[220px]">
                <OrderStatisticsChart />
            </div>
        </div>
    );
}
