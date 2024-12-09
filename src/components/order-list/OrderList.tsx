import Image from 'next/image';

export default function OrderList({
    image,
    title,
    price,
}: {
    image: string;
    title: string;
    price: string;
}) {
    return (
        <div className="w-[265px] h-[299px] bg-white rounded-2xl border border-[#ececec] space-y-5 shadow-sm">
            <Image
                src={image}
                alt={title}
                width={265}
                height={211}
                className="rounded-t-2xl"
            />
            <div className="px-4 space-y-2">
                <div className="text-black text-lg font-medium">{title}</div>
                <div className="text-[#ffa726] text-sm font-medium">
                    ${price}
                </div>
            </div>
        </div>
    );
}
