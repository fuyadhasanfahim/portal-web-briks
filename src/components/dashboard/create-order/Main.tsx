'use client';

import Uploader from '@/components/dashboard/create-order/Uploader';
import { ChangeEvent, FormEvent, useState } from 'react';
import TimeAndPayment from './TimeAndPayment';
import OrderForm from './OrderForm';
import toast from 'react-hot-toast';

export default function CreateOrderMain({
    user,
}: {
    user: {
        userId: string;
        name: string;
        username: string;
        email: string;
    };
}) {
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [pricePerImage, setPricePerImage] = useState<string>('');
    const [metadata, setMetadata] = useState<string[]>([]);
    const [flatness, setFlatness] = useState<string>('0.5');
    const [outputFormats, setOutputFormats] = useState<string[]>([]);
    const [backgroundOption, setBackgroundOption] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [addOns, setAddOns] = useState<
        { service: string; sub: string; price: number }[]
    >([]);
    const [deliveryTime, setDeliveryTime] = useState<string>('12');
    const [paymentStatus, setPaymentStatus] = useState<string>('card-payment');
    const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
    const [estimatedTotalPrice, setEstimatedTotalPrice] = useState<number>(0);
    const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;

        setMetadata((prev) => {
            if (checked) {
                return [...prev, id];
            } else {
                return prev.filter((item: string) => item !== id);
            }
        });
    };

    const handleOutputFormatChange = (
        e: ChangeEvent<HTMLInputElement>,
        value: string,
    ) => {
        if (e.target.checked) {
            setOutputFormats((prev) => [...prev, value]);
        } else {
            setOutputFormats((prev) => prev.filter((item) => item !== value));
        }
    };

    const handleAddOnChange = (addOn: {
        service: string;
        sub: string;
        price: number;
    }) => {
        setAddOns((prevAddOns) => [...prevAddOns, addOn]);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = {
            userId: user?.userId,
            name: user?.name,
            username: user?.username,
            email: user?.email,
            files,
            title,
            metadata,
            flatness,
            outputFormats,
            backgroundOption,
            instructions,
            addOns,
            deliveryTime,
            paymentStatus,
            paymentMethod,
            estimatedTotalPrice,
        };

        try {
            const response = await fetch('/api/orders/create-order', {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            await response.json();

            if (response.ok) {
                toast.success('Order created successfully.');

                setFiles([]);
                setTitle('');
                setPricePerImage('');
                setMetadata([]);
                setFlatness('');
                setOutputFormats([]);
                setBackgroundOption('');
                setInstructions('');
                setAddOns([]);
                setDeliveryTime('');
                setPaymentStatus('');
                setPaymentMethod('');
                setEstimatedTotalPrice(0);
            } else {
                toast.error('Something went wrong!');
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full flex gap-5">
                <div className="w-full max-w-xs">
                    <Uploader
                        files={files}
                        setValue={setFiles}
                        username={user?.username}
                        isUploading={isUploading}
                        setIsUploading={setIsUploading}
                        isOrderPlaced={isOrderPlaced}
                    />
                </div>

                <div className="w-full">
                    <OrderForm
                        title={title}
                        setTitle={setTitle}
                        pricePerImage={pricePerImage}
                        setPricePerImage={setPricePerImage}
                        metadata={metadata}
                        handleCheckboxChange={handleCheckboxChange}
                        flatness={flatness}
                        setFlatness={setFlatness}
                        outputFormats={outputFormats}
                        handleOutputFormatChange={handleOutputFormatChange}
                        backgroundOption={backgroundOption}
                        setBackgroundOption={setBackgroundOption}
                        instructions={instructions}
                        setInstructions={setInstructions}
                        addOns={addOns}
                        setAddOns={setAddOns}
                        handleAddOnChange={handleAddOnChange}
                    />
                </div>

                <div className="w-full max-w-xs">
                    <TimeAndPayment
                        files={files}
                        isUploading={isUploading}
                        pricePerImage={pricePerImage}
                        outputFormats={outputFormats}
                        deliveryTime={deliveryTime}
                        setDeliveryTime={setDeliveryTime}
                        paymentStatus={paymentStatus}
                        setPaymentStatus={setPaymentStatus}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        setEstimatedTotalPrice={setEstimatedTotalPrice}
                    />
                </div>
            </div>
        </form>
    );
}
