'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface DateRange {
    from: Date | undefined;
    to?: Date | undefined;
}

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    dueDate: DateRange;
    setDueDate: React.Dispatch<React.SetStateAction<DateRange>>;
}

export default function DateRangePicker({
    className,
    dueDate,
    setDueDate,
}: DateRangePickerProps) {
    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'px-4 py-3 rounded-lg border bg-transparent border-[#cccccc] justify-center items-center gap-2 inline-flex',
                            !dueDate?.from && 'text-muted-foreground',
                        )}
                    >
                        <CalendarIcon />
                        {dueDate?.from ? (
                            dueDate.to ? (
                                <>
                                    {format(dueDate.from, 'LLL dd, y')} -{' '}
                                    {format(dueDate.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(dueDate.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dueDate?.from}
                        selected={dueDate}
                        onSelect={(range) =>
                            setDueDate(
                                range || { from: undefined, to: undefined },
                            )
                        }
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
