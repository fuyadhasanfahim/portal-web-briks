import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { AddOn } from '@/types/AddOn';

const MannequinRemoveData = [
    {
        label: 'Drop Shadow',
        value: 'drop-shadow',
        price: 0.25,
        image: 'https://images.pexels.com/photos/29502969/pexels-photo-29502969/free-photo-of-elegant-gold-jewelry-on-white-background.jpeg',
        description: 'Classic shadow effect for a professional look',
    },
    {
        label: 'Natural Shadow',
        value: 'natural-shadow',
        price: 0.5,
        image: 'https://images.pexels.com/photos/29503018/pexels-photo-29503018/free-photo-of-elegant-gold-jewelry-set-with-ginkgo-leaf-design.jpeg',
        description: 'Realistic shadow that mimics natural lighting',
    },
    {
        label: 'Reflection Shadow',
        value: 'reflection-shadow',
        price: 0.5,
        image: 'https://images.pexels.com/photos/29502924/pexels-photo-29502924/free-photo-of-elegant-gold-jewelry-set-with-necklace-and-earrings.jpeg',
        description: 'Mirror-like reflection for stunning presentation',
    },
    {
        label: 'Mirror Effect',
        value: 'mirror-effect',
        price: 0.75,
        image: 'https://images.pexels.com/photos/29502968/pexels-photo-29502968/free-photo-of-elegant-minimalist-gold-jewelry-on-white-background.jpeg',
        description: 'Full mirror effect for luxury appearance',
    },
    {
        label: 'None',
        value: 'none',
        price: 0,
        image: 'https://images.pexels.com/photos/29502435/pexels-photo-29502435/free-photo-of-elegant-gold-leaf-jewelry-collection.jpeg',
        description: 'No shadow effect applied',
    },
];

interface MannequinRemoveProps {
    setAddOns: (updater: (prev: AddOn[]) => AddOn[]) => void;
}

export default function MannequinRemove({ setAddOns }: MannequinRemoveProps) {
    const [selected, setSelected] = useState<string>('drop-shadow');
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        if (isActive) {
            const addOn = {
                service: 'fix-imperfection',
                sub: selected,
                price:
                    MannequinRemoveData.find((item) => item.value === selected)
                        ?.price || 0,
            };
            setAddOns((prev) => [
                ...prev.filter((item) => item.service !== 'fix-imperfection'),
                addOn,
            ]);
        } else {
            setAddOns((prev) =>
                prev.filter((item) => item.service !== 'fix-imperfection'),
            );
        }
    }, [isActive, selected, setAddOns]);

    return (
        <div className="rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-black">
                <Label htmlFor="fix-imperfection" className="cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Image
                                src="/icons/create-order/cube.svg"
                                alt="cube"
                                width={24}
                                height={24}
                                className="opacity-90"
                            />
                        </div>
                        <span className="text-lg font-medium text-white">
                            3D/Mannequin Remove
                        </span>
                    </div>
                </Label>
                <Switch
                    id="fix-imperfection"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                />
            </div>

            {isActive && (
                <div className="p-6 space-y-6">
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-medium text-gray-900">
                            Select Your Preferred Shadow Option
                        </h3>
                        <p className="text-sm text-gray-500">
                            Choose from our professional shadow effects to
                            enhance your images
                        </p>
                    </div>

                    <RadioGroup
                        value={selected}
                        onValueChange={setSelected}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        <div className="space-y-4">
                            {MannequinRemoveData.map((option) => (
                                <div
                                    key={option.value}
                                    className={`relative flex items-center p-4 rounded-lg border transition-all duration-200 ${
                                        selected === option.value
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <RadioGroupItem
                                        value={option.value}
                                        id={option.value}
                                        className="absolute left-4"
                                    />
                                    <Label
                                        htmlFor={option.value}
                                        className="cursor-pointer ml-8 flex-1"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900">
                                                    {option.label}
                                                </span>
                                                <span className="text-orange-500 font-medium">
                                                    ${option.price.toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {option.description}
                                            </p>
                                        </div>
                                    </Label>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center">
                            {MannequinRemoveData.map((data) =>
                                data.value === selected ? (
                                    <div
                                        key={data.value}
                                        className="relative group"
                                    >
                                        <Image
                                            src={data.image}
                                            alt={data.label}
                                            width={300}
                                            height={220}
                                            className="rounded-lg shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                ) : null,
                            )}
                        </div>
                    </RadioGroup>
                </div>
            )}
        </div>
    );
}
