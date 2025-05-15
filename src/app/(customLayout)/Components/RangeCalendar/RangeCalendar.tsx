"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format, isBefore } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { HTMLAttributes, useEffect, useState } from "react";

import { DateRange, DayClickEventHandler } from "react-day-picker";

const RangeCalendar = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const [hasCompleteRange, setHasCompleteRange] = useState<boolean>(true);

  useEffect(() => {
    if (range) {
      console.log("Selected Date Range:", range);
    }
  }, [range]);

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    if (modifiers.disabled) return;

    if (hasCompleteRange) {
      setRange({ from: day, to: undefined });
      setHasCompleteRange(false);
      return;
    }

    if (range?.from && !range.to) {
      if (isBefore(day, range.from)) {
        const newRange = { from: day, to: range.from };
        setRange(newRange);
      } else {
        const newRange = { from: range.from, to: day };
        setRange(newRange);
      }
      setHasCompleteRange(true);
      return;
    }

    setRange({ from: day, to: undefined });
    setHasCompleteRange(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !range && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from ? (
              range.to ? (
                <>
                  {format(range.from, "LLL dd, y")} -{" "}
                  {format(range.to, "LLL dd, y")}
                </>
              ) : (
                format(range.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col sm:flex-row">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={range?.from}
              selected={range}
              onDayClick={handleDayClick}
              numberOfMonths={2}
              className="rounded-md border"
              classNames={{
                day_selected:
                  "bg-blue-300 text-white hover:bg-blue-300 hover:text-white focus:bg-blue-300 focus:text-white",
                day_range_middle:
                  "bg-blue-100 text-blue-900 hover:bg-blue-200 hover:text-blue-900 focus:bg-blue-200 focus:text-blue-900 rounded-none",
                day_range_end:
                  "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
                day_range_start:
                  "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
              }}
              disabled={{ before: new Date() }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RangeCalendar;
