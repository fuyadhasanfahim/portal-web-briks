import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import ShadowAdding from './order-props-add-ons/ShadowAdding';
import { ChangeEvent } from 'react';
import { AddOn } from '@/types/AddOn';

const outputFormatsProps = [
    { label: 'JPG', value: 'JPG' },
    { label: 'PNG', value: 'PNG' },
    { label: 'PSD!', value: 'PSD' },
    { label: 'TIFF!', value: 'TIFF' },
];

const backgroundOptions = [
    { label: 'White', value: 'white' },
    { label: 'Keep Original', value: 'original' },
    { label: 'Transparent', value: 'transparent' },
    { label: 'Color', value: 'color' },
];

export default function OrderForm({
    title,
    setTitle,
    pricePerImage,
    setPricePerImage,
    metadata,
    handleCheckboxChange,
    flatness,
    setFlatness,
    outputFormats,
    handleOutputFormatChange,
    backgroundOption,
    setBackgroundOption,
    instructions,
    setInstructions,
    addOns,
    setAddOns,
    handleAddOnChange,
}: {
    title: string;
    setTitle: (value: string) => void;
    pricePerImage: string;
    setPricePerImage: (value: string) => void;
    metadata: string[];
    handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
    flatness: string;
    setFlatness: (value: string) => void;
    outputFormats: string[];
    handleOutputFormatChange: (
        e: ChangeEvent<HTMLInputElement>,
        value: string,
    ) => void;
    backgroundOption: string;
    setBackgroundOption: (value: string) => void;
    instructions: string;
    setInstructions: (value: string) => void;
    addOns: AddOn[];
    setAddOns: (updater: (prev: AddOn[]) => AddOn[]) => void;
    handleAddOnChange: (addOn: {
        service: string;
        sub: string;
        price: number;
    }) => void;
}) {
    return (
        <div className="w-full bg-white shadow-md rounded-md ring-1 ring-black/5 p-2 h-full min-h-screen py-6 space-y-4">
            <div className="space-y-4">
                <Input
                    type="text"
                    name="title"
                    placeholder="Your job title*"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="pricePerImage">Price Per Image:</Label>
                    <Input
                        type="number"
                        id="pricePerImage"
                        value={pricePerImage}
                        onChange={(e) => setPricePerImage(e.target.value)}
                        placeholder="Enter the price per image"
                    />
                </div>
            </div>

            <div>
                <h4 className="text-base">Metadata Info & Flatness</h4>
                <hr className="border mb-2 border-orange-300" />

                <div className="flex items-center justify-between gap-5 my-3 divide-x-2 divide-solid">
                    <div className="flex flex-col gap-2 px-2">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="keep-metadata"
                                checked={metadata.includes('keep-metadata')}
                                onChange={handleCheckboxChange}
                                className="checkbox"
                            />
                            <label
                                htmlFor="keep-metadata"
                                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Keep My Metadata Intact
                                <span className="text-red-500">{` - What's This?`}</span>
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="with-flatness"
                                checked={metadata.includes('with-flatness')}
                                onChange={handleCheckboxChange}
                                className="checkbox"
                            />
                            <label
                                htmlFor="with-flatness"
                                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Clipping Path with Flatness
                            </label>
                        </div>
                    </div>

                    <div className="pl-3 w-[150px]">
                        <div className="grid items-center gap-1.5">
                            <Label htmlFor="flatness">Flatness:</Label>
                            <div className="flex items-center">
                                <Input
                                    type="text"
                                    id="flatness"
                                    name="flatness"
                                    placeholder="Flatness min(0.5 px)"
                                    className="rounded-r-none peer"
                                    value={flatness}
                                    onChange={(e) => {
                                        if (
                                            metadata.includes('with-flatness')
                                        ) {
                                            setFlatness(e.target.value);
                                        } else {
                                            setFlatness('');
                                        }
                                    }}
                                    disabled={
                                        !metadata.includes('with-flatness')
                                    }
                                />
                                <span className="bg-gray-200 p-[6px] px-3 rounded-r-md ring-1 ring-transparent peer-focus:ring-black">
                                    px
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <h4 className="text-base">Returned File Format</h4>
                    <hr className="border-2  border-orange-300mb-2" />

                    <div className="flex items-center gap-5">
                        {outputFormatsProps.map((format, index) => {
                            const { label, value } = format;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        id={value}
                                        checked={outputFormats.includes(value)}
                                        onChange={(e) =>
                                            handleOutputFormatChange(e, value)
                                        }
                                        className="checkbox"
                                    />
                                    <label
                                        htmlFor={value}
                                        className={`font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                                            value === 'PSD' || value === 'TIFF'
                                                ? 'text-red-500'
                                                : ''
                                        }`}
                                    >
                                        {label}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="text-base">Returned File Format</h4>
                    <hr className="border-2  border-orange-300mb-2" />

                    <div>
                        <RadioGroup
                            value={backgroundOption}
                            onValueChange={(value) =>
                                setBackgroundOption(value)
                            }
                            className="px-2 flex items-center gap-5"
                        >
                            {backgroundOptions.map((option, index) => {
                                const { value, label } = option;

                                return (
                                    <div
                                        className="flex items-center space-x-2"
                                        key={index}
                                    >
                                        <RadioGroupItem
                                            value={value}
                                            id={value}
                                        />
                                        <Label htmlFor={value}>{label}</Label>
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    </div>
                </div>

                <div className="mt-8">
                    <Textarea
                        placeholder="Additional instructions or image download links)"
                        className="h-20"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                </div>

                <div className="mt-8 space-y-8">
                    <div className="flex items-center w-full">
                        <div className="border-2 flex-1" />
                        <div className="px-4 py-2 rounded-md bg-gray-200">
                            Add-Ons
                        </div>
                        <div className="border-2 flex-1" />
                    </div>

                    <div>
                        <ShadowAdding
                            addOns={addOns}
                            setAddOns={setAddOns}
                            onAddOnChange={handleAddOnChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
