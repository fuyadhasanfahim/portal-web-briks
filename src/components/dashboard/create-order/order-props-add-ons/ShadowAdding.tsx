import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import CubeImage from '@/assets/cube.png';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { AddOn } from '@/types/AddOn';

const shadowAddingData = [
    {
        label: 'Drop Shadow',
        value: 'drop-shadow',
        price: 0.25,
        image: 'https://images.pexels.com/photos/29502969/pexels-photo-29502969/free-photo-of-elegant-gold-jewelry-on-white-background.jpeg',
    },
    {
        label: 'Natural Shadow',
        value: 'natural-shadow',
        price: 0.5,
        image: 'https://images.pexels.com/photos/29503018/pexels-photo-29503018/free-photo-of-elegant-gold-jewelry-set-with-ginkgo-leaf-design.jpeg',
    },
    {
        label: 'Reflection Shadow',
        value: 'reflection-shadow',
        price: 0.5,
        image: 'https://images.pexels.com/photos/29502924/pexels-photo-29502924/free-photo-of-elegant-gold-jewelry-set-with-necklace-and-earrings.jpeg',
    },
    {
        label: 'Mirror Effect',
        value: 'mirror-effect',
        price: 0.75,
        image: 'https://images.pexels.com/photos/29502968/pexels-photo-29502968/free-photo-of-elegant-minimalist-gold-jewelry-on-white-background.jpeg',
    },
    {
        label: 'None',
        value: 'none',
        price: 0,
        image: 'https://images.pexels.com/photos/29502435/pexels-photo-29502435/free-photo-of-elegant-gold-leaf-jewelry-collection.jpeg',
    },
];

interface ShadowAddingProps {
    addOns: AddOn[];
    setAddOns: (updater: (prev: AddOn[]) => AddOn[]) => void;
    onAddOnChange: (addOn: AddOn) => void;
}

export default function ShadowAdding({
    // onAddOnChange,
    // addOns,
    setAddOns,
}: ShadowAddingProps) {
    const [selected, setSelected] = useState<string>('drop-shadow');
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        if (isActive) {
            const addOn = {
                service: 'shadow-adding',
                sub: selected,
                price:
                    shadowAddingData.find((item) => item.value === selected)
                        ?.price || 0,
            };

            setAddOns((prev) => [
                ...prev.filter((item) => item.service !== 'shadow-adding'),
                addOn,
            ]);
        } else {
            setAddOns((prev) =>
                prev.filter((item) => item.service !== 'shadow-adding'),
            );
        }
    }, [isActive, selected, setAddOns]);

    const handleSwitchChange = (checked: boolean) => {
        setIsActive(checked);
    };

    const handleRadioChange = (value: string) => {
        setSelected(value);
    };

    return (
        <div className="rounded-md border flex-1">
            <div>
                <div className="rounded-md border flex-1">
                    <div className="flex items-center space-x-2 justify-between px-4 py-2 bg-gray-100 border-b">
                        <Label htmlFor="shadow-adding">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={CubeImage}
                                    alt="cube"
                                    width={30}
                                    height={30}
                                />
                                <span className="text-lg">Shadow Adding</span>
                            </div>
                        </Label>
                        <Switch
                            id="shadow-adding"
                            checked={isActive}
                            onCheckedChange={handleSwitchChange}
                        />
                    </div>

                    {isActive && (
                        <div className="p-4 transition-all duration-300 ease-in-out">
                            <div className="space-y-6">
                                <h3>
                                    Please see the examples and select your
                                    preferred <strong>Shadow Option</strong>.
                                </h3>
                                <RadioGroup
                                    value={selected}
                                    onValueChange={handleRadioChange}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="space-y-4">
                                            {shadowAddingData.map(
                                                (data, index) => {
                                                    const {
                                                        label,
                                                        price,
                                                        value,
                                                    } = data;

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex items-center justify-between gap-5"
                                                        >
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem
                                                                    value={
                                                                        value
                                                                    }
                                                                    id={value}
                                                                />
                                                                <Label
                                                                    htmlFor={
                                                                        value
                                                                    }
                                                                >
                                                                    {label} -{' '}
                                                                    <span className="text-cyan-500">
                                                                        ${price}
                                                                    </span>
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                        {shadowAddingData.map((data) => {
                                            if (data.value === selected) {
                                                return (
                                                    <Image
                                                        key={data.value}
                                                        src={data.image}
                                                        alt={data.value}
                                                        width={400}
                                                        height={300}
                                                        className="rounded-xl w-64 h-44 border shadow-md"
                                                    />
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
