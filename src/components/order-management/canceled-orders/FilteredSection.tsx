import FilteredByDate from '@/components/order-management/pending-orders/FilteredByDate';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DateRange } from 'react-day-picker';

export default function FilteredSection({
    filterBy,
    setFilterBy,
    date,
    setDate,
}: {
    filterBy: string;
    setFilterBy: (value: string) => void;
    date: DateRange | undefined;
    setDate: (value: DateRange | undefined) => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <Select
                value={filterBy}
                onValueChange={(value) => setFilterBy(value)}
            >
                <SelectTrigger className="h-[45px] px-4 py-3 bg-white">
                    <SelectValue placeholder="Filter By" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <FilteredByDate date={date} setDate={setDate} />
        </div>
    );
}
