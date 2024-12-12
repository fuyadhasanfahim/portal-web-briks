'use client';

import { IOrder } from '@/types/Order';
import FilteredSection from './FilteredSection';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export default function PendingOrdersMain({
    filteredOrders,
    totalPrice,
}: {
    filteredOrders: { orders: IOrder[]; pagination: { total: number } };
    totalPrice: number;
}) {
    const [filterBy, setFilterBy] = useState<string>('monthly');
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });

    const filterOrders = (orders: IOrder[]) => {
        const now = new Date();
        let filteredOrders = orders;

        if (filterBy === 'daily') {
            filteredOrders = orders?.filter((order) => {
                const orderDate = new Date(order.dueDate.from);
                return orderDate.toDateString() === now.toDateString();
            });
        } else if (filterBy === 'weekly') {
            const startOfWeek = new Date(
                now.setDate(now.getDate() - now.getDay()),
            );
            const endOfWeek = new Date(
                now.setDate(now.getDate() + (6 - now.getDay())),
            );
            filteredOrders = orders?.filter((order) => {
                const orderDate = new Date(order.dueDate.from);
                return orderDate >= startOfWeek && orderDate <= endOfWeek;
            });
        } else if (filterBy === 'monthly') {
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0,
            );
            filteredOrders = orders?.filter((order) => {
                const orderDate = new Date(order.dueDate.from);
                return orderDate >= startOfMonth && orderDate <= endOfMonth;
            });
        }

        if (date?.from && date?.to) {
            filteredOrders = filteredOrders?.filter((order) => {
                const orderDate = new Date(order.dueDate.from);

                if (isNaN(orderDate.getTime())) {
                    return false;
                }

                if (!date.from || !date.to) {
                    return false;
                }

                return orderDate >= date.from && orderDate <= date.to;
            });
        }

        return filteredOrders;
    };

    const filteredOrdersList = filterOrders(filteredOrders.orders);

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-10 pt-6 pb-10">
                <div className="flex items-center gap-2">
                    <h3 className="text-black text-xl font-medium">
                        Pending Order
                    </h3>
                    <p className="text-black text-base font-medium">
                        {filteredOrders?.pagination?.total}-(${totalPrice})
                    </p>
                </div>

                <FilteredSection
                    filterBy={filterBy}
                    setFilterBy={setFilterBy}
                    date={date}
                    setDate={setDate}
                />
            </div>

            <div className="flex flex-col items-center gap-5">
                {filteredOrdersList?.map((order, index) => {
                    const {
                        name,
                        estimatedTotal,
                        dueDate,
                        status,
                        profileImage,
                    } = order;

                    console.log(profileImage);

                    return (
                        <div
                            className="h-[190px] bg-white rounded-2xl border border-[#ececec] flex items-start justify-center flex-col shadow"
                            key={index}
                        >
                            <div className="flex items-center justify-between w-full gap-10 px-6">
                                <Image
                                    className="rounded-lg"
                                    src="https://images.pexels.com/photos/26690662/pexels-photo-26690662/free-photo-of-interior-of-an-ice-cave.jpeg"
                                    alt="order image"
                                    width={186}
                                    height={142}
                                />

                                <div className="flex items-center gap-2">
                                    <Image
                                        src={profileImage}
                                        alt={`${name} profile image url`}
                                        width={61}
                                        height={61}
                                        className="rounded-full"
                                    />
                                    <h3 className="text-black text-base font-medium">
                                        {name}
                                    </h3>
                                </div>

                                <div className="flex items-center justify-between gap-10">
                                    <div className="flex items-center flex-col gap-3">
                                        <div className="text-black text-base font-normal">
                                            Price
                                        </div>
                                        <div className="text-[#424242] text-base">
                                            ${estimatedTotal}
                                        </div>
                                    </div>
                                    <div className="flex items-center flex-col gap-3">
                                        <div className="text-black text-base font-normal">
                                            Due Time
                                        </div>
                                        <div className="text-[#424242] text-base font-medium">
                                            {dueDate?.from
                                                ? format(
                                                      new Date(dueDate.from),
                                                      'dd-MM-yyyy',
                                                  )
                                                : 'No Date'}
                                        </div>
                                    </div>
                                    <div className="flex items-center flex-col gap-3">
                                        <div className="text-black text-base font-normal">
                                            Delivery Time
                                        </div>
                                        <div className="text-[#424242] text-base font-medium">
                                            {dueDate?.from
                                                ? format(
                                                      new Date(dueDate.to),
                                                      'dd-MM-yyyy',
                                                  )
                                                : 'No Date'}
                                        </div>
                                    </div>
                                    <div className="flex items-center flex-col gap-3">
                                        <div className="text-black text-base font-normal">
                                            Status
                                        </div>
                                        <div className="text-[#424242] text-base font-medium">
                                            {status}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-end gap-5">
                                    <Button className="bg-black">
                                        Revisions Request
                                    </Button>

                                    <div className="flex items-center gap-5 flex-col">
                                        <Button className="bg-[#ffa726]">
                                            <FileText />
                                            <span>Invoice</span>
                                        </Button>

                                        <Button className="bg-black w-full">
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
