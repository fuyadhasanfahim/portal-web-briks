'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import DateRangePicker from '@/components/shared/DateRangePicker';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import ShadowAdding from './ShadowAdding';
import { useState } from 'react';
import FixImperfection from './FixImperfection';
import MannequinRemove from './MannequinRemove';
import PhotoRetouching from './PhotoRetouching';
import CroppingRetouching from './CroppingRetouching';
import ColorCorrections from './ColorCorrections';
import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import Uploader from './Uploader';
import IUser from '@/types/user-interface';
import PaymentCard from './PaymentCard';
import toast from 'react-hot-toast';

interface AddOn {
    service: string;
    sub: string;
    price: number;
}

export default function CreateOrderForm({ user }: { user: IUser }) {
    const [title, setTitle] = useState<string>('');
    const [downloadLink, setDownloadLink] = useState<string>('');
    const [imageLength, setImageLength] = useState<string>('');
    const [dueDate, setDueDate] = useState<DateRange>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });
    const [pricePerImage, setPricePerImage] = useState<string>('');
    const [metadata, setMetadata] = useState<string>(
        'Keep My Metadata intact- What’s This?',
    );
    const [flatness, setFlatness] = useState<string>('');
    const [outputFormat, setOutputFormat] = useState<string>('png');
    const [backgroundOption, setBackgroundOption] = useState<string>('white');
    const [description, setDescription] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [addOns, setAddOns] = useState<AddOn[]>([]);
    const [deliveryTime, setDeliveryTime] = useState<string>('');
    const [paymentTerms, setPaymentTerms] = useState<string>('pay-now');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || files.length === 0) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            const orderData = {
                userId: user?.userId,
                name: user?.name,
                username: user?.username,
                email: user?.email,
                title,
                dueDate,
                pricePerImage,
                metadata,
                flatness,
                outputFormat,
                backgroundOption,
                description,
                files,
                addOns,
                deliveryTime,
                paymentTerms,
            };

            console.log(orderData);
        } catch (error) {
            console.error('Error submitting order:', error);
            toast.error('Failed to submit order');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-5">
            <div className="h-full w-full min-h-screen">
                <div className="w-full h-16 bg-black rounded-t-lg flex items-center">
                    <h3 className="text-white text-xl font-medium px-6">
                        Service Order Form
                    </h3>
                </div>
                <div className="bg-white rounded-b-lg border py-10 px-6 space-y-6">
                    <div className="flex items-center justify-between gap-10">
                        <div className="grid w-full max-w-lg items-center gap-1.5">
                            <Label
                                htmlFor="title"
                                className="text-[#424242] text-base font-normal"
                            >
                                Project Title
                            </Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="eg: Photo Retouching & add shadow"
                                className="bg-white rounded-lg border border-[#cccccc]"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid w-full max-w-xs items-center gap-1.5">
                            <h3 className="text-[#424242] text-base font-normal">
                                Due Date
                            </h3>
                            <DateRangePicker
                                dueDate={dueDate}
                                setDueDate={setDueDate}
                            />
                        </div>
                        <div className="grid w-full max-w-52 items-center gap-1.5">
                            <Label
                                htmlFor="pricePerImage"
                                className="text-[#424242] text-base font-normal"
                            >
                                Price Per Image
                            </Label>
                            <Input
                                type="text"
                                id="pricePerImage"
                                name="pricePerImage"
                                placeholder="eg: $2.00"
                                className="bg-white rounded-lg border border-[#cccccc]"
                                value={pricePerImage}
                                min={0}
                                onChange={(e) =>
                                    setPricePerImage(e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="grid w-full max-w-lg items-center gap-1.5">
                            <Label
                                htmlFor="downloadLink"
                                className="text-[#424242] text-base font-normal"
                            >
                                Download Link
                            </Label>
                            <Input
                                type="url"
                                id="downloadLink"
                                name="downloadLink"
                                placeholder="eg: https://drive.google.com/"
                                className="bg-white rounded-lg border border-[#cccccc]"
                                value={downloadLink}
                                onChange={(e) =>
                                    setDownloadLink(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="grid w-full max-w-lg items-center gap-1.5">
                            <Label
                                htmlFor="imageLength"
                                className="text-[#424242] text-base font-normal"
                            >
                                Image Length
                            </Label>
                            <Input
                                type="text"
                                id="imageLength"
                                name="imageLength"
                                placeholder="eg: 1000"
                                className="bg-white rounded-lg border border-[#cccccc]"
                                value={imageLength}
                                onChange={(e) => setImageLength(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-20">
                        <div>
                            <Label
                                htmlFor="metadataAndFlatness"
                                className="text-[#424242] text-lg font-normal"
                            >
                                Metadata info & Flatness
                            </Label>
                            <RadioGroup
                                id="metadataAndFlatness"
                                value={metadata}
                                onValueChange={(value) => setMetadata(value)}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="Keep My Metadata intact- What’s This?"
                                        id="keepMetadata"
                                    />
                                    <Label
                                        htmlFor="keepMetadata"
                                        className="text-[#424242] text-sm font-normal"
                                    >
                                        Keep My Metadata intact- What’s This?
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="Clipping Path with Flatness"
                                        id="clippingPathWithFlatness"
                                    />
                                    <Label
                                        htmlFor="clippingPathWithFlatness"
                                        className="text-[#424242] text-sm font-normal"
                                    >
                                        Clipping Path with Flatness
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="w-52">
                            <Label
                                htmlFor="flatness"
                                className="text-[#424242] text-lg font-normal"
                            >
                                Flatness
                            </Label>
                            <div className="flex items-center">
                                <Input
                                    type="text"
                                    id="flatness"
                                    name="flatness"
                                    placeholder="eg: 0.5"
                                    className="bg-white rounded-lg border border-[#cccccc] rounded-r-none"
                                    min={0}
                                    value={flatness}
                                    onChange={(e) =>
                                        setFlatness(e.target.value)
                                    }
                                    required
                                />
                                <h3 className="py-[5.5px] px-3 rounded-lg flex-col justify-center items-center inline-flex bg-gray-200 rounded-l-none border border-[#cccccc]">
                                    px
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-20">
                        <div>
                            <Label
                                htmlFor="returnedFileFormat"
                                className="text-[#424242] text-lg font-normal"
                            >
                                Returned File Format
                            </Label>
                            <RadioGroup
                                id="returnedFileFormat"
                                className="flex items-start gap-5"
                                value={outputFormat}
                                onValueChange={(value) =>
                                    setOutputFormat(value)
                                }
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="png" id="png" />
                                    <Label
                                        htmlFor="png"
                                        className="flex items-center gap-2"
                                    >
                                        <Image
                                            src={'/icons/create-order/png.svg'}
                                            alt="png image"
                                            width={16}
                                            height={16}
                                        />
                                        PNG
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="jpg" id="jpg" />
                                    <Label
                                        htmlFor="jpg"
                                        className="flex items-center gap-2"
                                    >
                                        <Image
                                            src={'/icons/create-order/jpg.svg'}
                                            alt="jpg image"
                                            width={16}
                                            height={16}
                                        />
                                        JPG
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="psd" id="psd" />
                                    <Label
                                        htmlFor="psd"
                                        className="flex items-center gap-2"
                                    >
                                        <Image
                                            src={'/icons/create-order/psd.svg'}
                                            alt="psd image"
                                            width={16}
                                            height={16}
                                        />
                                        PSD
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="tiff" id="tiff" />
                                    <Label
                                        htmlFor="tiff"
                                        className="flex items-center gap-2"
                                    >
                                        <Image
                                            src={'/icons/create-order/tiff.svg'}
                                            alt="tiff image"
                                            width={16}
                                            height={16}
                                        />
                                        TIFF
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div>
                            <Label
                                htmlFor="backgroundFormat"
                                className="text-[#424242] text-lg font-normal"
                            >
                                Returned Background Format
                            </Label>
                            <RadioGroup
                                id="backgroundFormat"
                                className="flex items-start gap-5"
                                value={backgroundOption}
                                onValueChange={(value) =>
                                    setBackgroundOption(value)
                                }
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="white" id="white" />
                                    <Label
                                        htmlFor="white"
                                        className="flex items-center gap-2"
                                    >
                                        White
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="keepOriginal"
                                        id="keepOriginal"
                                    />
                                    <Label
                                        htmlFor="keepOriginal"
                                        className="flex items-center gap-2"
                                    >
                                        Keep Original
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="transparent"
                                        id="transparent"
                                    />
                                    <Label
                                        htmlFor="transparent"
                                        className="flex items-center gap-2"
                                    >
                                        Transparent
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="color" id="color" />
                                    <Label
                                        htmlFor="color"
                                        className="flex items-center gap-2"
                                    >
                                        Color
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="description" className="text-lg">
                            Project Description*
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Type your Text..."
                            className="h-32"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <Uploader
                        username={user?.username || ''}
                        value={files}
                        setValue={setFiles}
                    />

                    <div>
                        <ShadowAdding key="shadow" setAddOns={setAddOns} />
                        <FixImperfection key="fix" setAddOns={setAddOns} />
                        <MannequinRemove
                            key="mannequin"
                            setAddOns={setAddOns}
                        />
                        <PhotoRetouching key="photo" setAddOns={setAddOns} />
                        <CroppingRetouching key="crop" setAddOns={setAddOns} />
                        <ColorCorrections key="color" setAddOns={setAddOns} />
                    </div>
                </div>
            </div>

            <PaymentCard
                files={files}
                imageLength={imageLength}
                pricePerImage={pricePerImage}
                deliveryTime={deliveryTime}
                setDeliveryTime={setDeliveryTime}
                paymentTerms={paymentTerms}
                setPaymentTerms={setPaymentTerms}
            />
        </form>
    );
}
