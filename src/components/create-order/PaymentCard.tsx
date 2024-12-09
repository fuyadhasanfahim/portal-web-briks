import {
    CircleDollarSign,
    Clock,
    CreditCard,
    DollarSign,
    FileCheck2,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function PaymentCard({
    files,
    imageLength,
    pricePerImage,
    deliveryTime,
    setDeliveryTime,
    paymentTerms,
    setPaymentTerms,
}: {
    files: File[];
    imageLength: string;
    pricePerImage: string;
    deliveryTime: string;
    setDeliveryTime: (value: string) => void;
    paymentTerms: string;
    setPaymentTerms: (value: string) => void;
}) {
    const estimatedPrice = (
        parseFloat(pricePerImage) * files?.length || Number(imageLength)
    ).toFixed(2);

    return (
        <div className="w-full max-w-xs h-full">
            <div className="h-16 bg-black rounded-t-lg flex items-center justify-center">
                <h3 className="text-white text-xl font-medium">
                    Service & Payment
                </h3>
            </div>

            <div className="bg-white rounded-b-lg border p-6 space-y-6">
                <div className="flex flex-col gap-3">
                    <div className="h-[21px] justify-center items-center w-full gap-2 inline-flex">
                        <Clock className="size-4 relative" />
                        <div className="text-black text-lg font-normal">
                            Turnaround Times
                        </div>
                    </div>
                    <div className="border border-[#ececec]" />
                    <RadioGroup
                        className="grid grid-cols-2 items-center justify-between gap-5"
                        value={deliveryTime}
                        onValueChange={(value: string) =>
                            setDeliveryTime(value)
                        }
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="12-hours" id="12-hours" />
                            <Label htmlFor="12-hours">12 Hours</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="24-hours" id="24-hours" />
                            <Label htmlFor="24-hours">24 Hours</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="36-hours" id="36-hours" />
                            <Label htmlFor="36-hours">36 Hours</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="48-hours" id="48-hours" />
                            <Label htmlFor="48-hours">48 Hours</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="72-hours" id="72-hours" />
                            <Label htmlFor="72-hours">72 Hours</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="flexible" id="flexible" />
                            <Label htmlFor="flexible">Flexible</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="h-[21px] justify-center items-center w-full gap-2 inline-flex">
                        <FileCheck2 className="size-4 relative" />
                        <div className="text-black text-lg font-normal">
                            Cost Calculation
                        </div>
                    </div>
                    <div className="border border-[#ececec]" />
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="text-[#424242] text-sm font-normal">
                                Image Quantity:
                            </div>
                            <div className="text-black text-sm font-medium">
                                ${files?.length || parseFloat(imageLength) || 0}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-[#424242] text-sm font-normal">
                                Price/Image:
                            </div>
                            <div className="text-black text-sm font-medium">
                                ${Number(pricePerImage) || 0}
                            </div>
                        </div>
                        <div className="border border-[#ececec] my-2" />
                        <div className="flex items-center justify-between">
                            <div className="text-[#424242] text-sm font-normal">
                                Total Price:
                            </div>
                            <div className="text-black text-sm font-medium">
                                ${estimatedPrice}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="h-[21px] justify-center items-center w-full gap-2 inline-flex">
                        <DollarSign className="size-4 relative" />
                        <div className="text-black text-lg font-normal">
                            Payment Terms
                        </div>
                    </div>
                    <div className="border border-[#ececec]" />
                    <RadioGroup
                        defaultValue={'pay-now'}
                        value={paymentTerms}
                        onValueChange={(value: string) =>
                            setPaymentTerms(value)
                        }
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pay-now" id="pay-now" />
                            <Label htmlFor="pay-now">Pay Now</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pay-later" id="pay-later" />
                            <Label htmlFor="pay-later">Pay Later</Label>
                        </div>
                    </RadioGroup>
                </div>

                {paymentTerms === 'pay-now' && (
                    <div className="flex flex-col gap-3">
                        <div className="h-[21px] justify-center items-center w-full gap-2 inline-flex">
                            <CreditCard className="size-4 relative" />
                            <div className="text-black text-lg font-normal">
                                Payment Method
                            </div>
                        </div>
                        <div className="border border-[#ececec]" />
                        <RadioGroup defaultValue={'visa'}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="visa" id="visa" />
                                <Label htmlFor="visa">
                                    <Image
                                        src={'/icons/create-order/visa.svg'}
                                        alt="visa card"
                                        width={72}
                                        height={26}
                                    />
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="caster-card"
                                    id="caster-card"
                                />
                                <Label htmlFor="caster-card">
                                    <Image
                                        src={
                                            '/icons/create-order/master-card.svg'
                                        }
                                        alt="master card"
                                        width={72}
                                        height={26}
                                    />
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="paypal-card"
                                    id="paypal-card"
                                />
                                <Label htmlFor="paypal-card">
                                    <Image
                                        src={'/icons/create-order/paypal.svg'}
                                        alt="paypal card"
                                        width={72}
                                        height={26}
                                    />
                                </Label>
                            </div>
                        </RadioGroup>

                        <div>
                            <Image
                                src={'/icons/create-order/card-visa.svg'}
                                alt="visa payment card"
                                width={400}
                                height={260}
                            />
                        </div>
                    </div>
                )}

                <Button className="w-full" type="submit">
                    <CircleDollarSign className="size-[13px] relative" />
                    <span>
                        {paymentTerms === 'pay-now' ? 'Pay Now' : 'Proceed'}
                    </span>
                </Button>
            </div>
        </div>
    );
}
