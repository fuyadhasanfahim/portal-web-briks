'use client';

import Uploader from '@/components/dashboard/create-order/Uploader';
import { useState } from 'react';
import TimeAndPayment from './TimeAndPayment';

export default function CreateOrderMain({ username }: { username: string }) {
    const [files, setFiles] = useState<File[]>([]);

    const [deliveryTime, setDeliveryTime] = useState<string>('12');

    console.log({ files, deliveryTime });

    return (
        <div className="w-full flex gap-5">
            <div className="w-full max-w-xs">
                <Uploader
                    files={files}
                    setValue={setFiles}
                    username={username}
                />
            </div>

            <div className="w-full max-w-xs">
                <TimeAndPayment
                    files={files}
                    deliveryTime={deliveryTime}
                    setDeliveryTime={setDeliveryTime}
                />
            </div>
        </div>
    );
}
