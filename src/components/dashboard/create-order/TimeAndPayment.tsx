import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import getCalculateAdditionalCost from '@/utils/getCalculateAdditionalCost';

const deliveryTimes = [
    { label: '12H', value: '12' },
    { label: '24H', value: '24' },
    { label: '36H', value: '36' },
    { label: '48H', value: '48' },
    { label: '72H', value: '72' },
    { label: 'Flexible', value: 'flexible' },
];

export default function TimeAndPayment({
    files,
    deliveryTime,
    setDeliveryTime,
}: {
    files: File[];
    deliveryTime: string;
    setDeliveryTime: (value: string) => void;
}) {
    const outputFormats = ['PDF', 'TIFF'];
    const pricePerImage = '0.9';

    const additionalCosts = outputFormats.map((format) =>
        getCalculateAdditionalCost(format),
    );

    const totalAdditionalCost = additionalCosts.reduce(
        (sum, cost) => sum + cost,
        0,
    );

    const estimatedTotal =
        files?.length * Number(pricePerImage) +
        Number(totalAdditionalCost.toFixed(2)) * files?.length;

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full bg-white shadow-md rounded-md ring-1 ring-black/5 p-2">
                <h3 className="text-lg text-center font-medium text-gray-600">
                    $ Summery & Payment
                </h3>
            </div>

            <div className="w-full bg-white shadow-md rounded-md ring-1 ring-black/5 p-2 space-y-4">
                <div>
                    <h4 className="text-base text-cyan-500">
                        Turnaround Times
                    </h4>
                    <hr className="border-2 mb-2" />

                    <RadioGroup
                        value={deliveryTime}
                        onValueChange={(value) => setDeliveryTime(value)}
                        className="grid grid-cols-2 items-center justify-between gap-2 px-2"
                    >
                        {deliveryTimes.map((time, index) => {
                            const { value, label } = time;

                            return (
                                <div
                                    className="flex items-center space-x-2"
                                    key={index}
                                >
                                    <RadioGroupItem value={value} id={value} />
                                    <Label htmlFor={value}>{label}</Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>

                <div>
                    <h4 className="text-base text-cyan-500">
                        Cost Calculation
                    </h4>
                    <hr className="border-2 mb-2" />

                    <div className="mx-2 divide-y-2">
                        <div className="flex items-center justify-between gap-5">
                            <p>Image Quantity:</p>
                            <p>{files?.length || 0}</p>
                        </div>

                        {outputFormats?.length > 0 && (
                            <div className="flex items-center justify-between gap-5">
                                <p>
                                    {outputFormats.map(
                                        (outputFormat, index) => (
                                            <span
                                                key={index}
                                                className={`${
                                                    outputFormat === 'PDF' ||
                                                    outputFormat === 'TIFF'
                                                        ? 'text-red-500'
                                                        : 'text-black'
                                                }`}
                                            >
                                                {outputFormat}
                                                {index <
                                                outputFormats.length - 1
                                                    ? ', '
                                                    : ''}
                                            </span>
                                        ),
                                    )}
                                    :
                                </p>
                                <p>{totalAdditionalCost.toFixed(2)}</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-5">
                            <p>Price/Image:</p>
                            <p>{pricePerImage || 0}</p>
                        </div>

                        <div className="flex items-center justify-between gap-5">
                            <p>Estimated Total:</p>
                            <p>{estimatedTotal.toFixed(2).toString() || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
