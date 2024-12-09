import Link from 'next/link';
import { Button } from '../ui/button';
import { FileQuestion, PlusCircle } from 'lucide-react';

export default function OrderManagementHeroSection() {
    return (
        <div className="flex flex-wrap items-center justify-between gap-10 pt-6 pb-10">
            <h3 className="text-black text-xl font-medium">
                Check Your all Order activity!
            </h3>
            <div className="flex items-center gap-2">
                <Button
                    variant={'outline'}
                    className="h-[45px] px-4 py-3 rounded-lg justify-center items-center gap-2 inline-flex"
                >
                    <FileQuestion className="size-5 relative" />
                    <div className="text-[#424242] text-sm font-normal">
                        Request a Quote
                    </div>
                </Button>
                <Link
                    href={'/create-order'}
                    className="bg-[#ffa726] h-[45px] px-4 py-3 rounded-lg justify-center items-center gap-2 inline-flex"
                >
                    <PlusCircle className="size-5 text-black" />
                    <div className="text-black text-sm font-normal">
                        Create Order
                    </div>
                </Link>
            </div>
        </div>
    );
}
