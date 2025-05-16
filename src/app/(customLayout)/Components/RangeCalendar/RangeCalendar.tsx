"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { addDays, addMonths, format, isBefore, startOfMonth } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { DateRange, DayClickEventHandler } from "react-day-picker";

type DurationType = "weekend" | "1week" | "2weeks";

const RangeCalendar = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  // Track if we have a complete range (both from and to dates)
  const [hasCompleteRange, setHasCompleteRange] = useState<boolean>(true);

  // Flexible date options
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [selectedDuration, setSelectedDuration] =
    React.useState<DurationType>("weekend");

  // Generate 6 months from current month
  const months = useMemo(() => {
    const result = [];
    const currentMonth = new Date();

    for (let i = 0; i < 6; i++) {
      const month = addMonths(currentMonth, i);
      result.push(month);
    }

    return result;
  }, []);

  // Log the selected range whenever it changes
  useEffect(() => {
    if (range) {
      console.log("Selected Date Range:", range);
    }
  }, [range]);

  // Custom day click handler to override default behavior
  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    if (modifiers.disabled) return;

    // If we already have a complete range, reset and start a new selection
    if (hasCompleteRange) {
      setRange({ from: day, to: undefined });
      setHasCompleteRange(false);
      return;
    }

    // If we have a from date but no to date yet
    if (range?.from && !range.to) {
      // Ensure dates are in the correct order (from is before to)
      if (isBefore(day, range.from)) {
        // If the second selected date is before the first, swap them
        const newRange = { from: day, to: range.from };
        setRange(newRange);
      } else {
        // Normal case: second date is after the first
        const newRange = { from: range.from, to: day };
        setRange(newRange);
      }
      setHasCompleteRange(true);
      return;
    }

    // If we don't have a from date yet
    setRange({ from: day, to: undefined });
    setHasCompleteRange(false);
  };

  // Handle flexible date selection
  const handleFlexibleDateSelection = () => {
    const startDate = startOfMonth(selectedMonth);
    let endDate;

    switch (selectedDuration) {
      case "weekend":
        // Weekend (1-3 nights)
        endDate = addDays(startDate, 2); // 3 nights = 2 days after start
        break;
      case "1week":
        // 1 week
        endDate = addDays(startDate, 6); // 7 nights = 6 days after start
        break;
      case "2weeks":
        // 2 weeks
        endDate = addDays(startDate, 13); // 14 nights = 13 days after start
        break;
    }

    setRange({ from: startDate, to: endDate });
    setHasCompleteRange(true);
    setOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
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
          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="flexible">Flexible Date</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="p-4">
              <div className="flex flex-col sm:flex-row">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={range?.from}
                  selected={range}
                  onDayClick={handleDayClick}
                  numberOfMonths={2}
                  className="rounded-md border"
                  disabled={{ before: new Date() }}
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
                />
              </div>
              <div className="mt-4 w-full">
                <Button
                  onClick={() => setOpen(false)}
                  className="w-full bg-blue-600"
                >
                  Done
                </Button>
              </div>
            </TabsContent>

            <TabsContent
              value="flexible"
              className="p-4 space-y-4 lg:w-[500px]"
            >
              <div>
                <h3 className="text-sm font-medium mb-3">
                  When would you like to travel?
                </h3>
                <div className="grid grid-cols-3 gap-2 rounded-lg shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-2">
                  {months.map((month, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedMonth.getMonth() === month.getMonth() &&
                        selectedMonth.getFullYear() === month.getFullYear()
                          ? "default"
                          : "outline"
                      }
                      onClick={() => setSelectedMonth(month)}
                      className={cn(
                        "h-auto py-2",
                        selectedMonth.getMonth() === month.getMonth() &&
                          selectedMonth.getFullYear() === month.getFullYear() &&
                          "bg-blue-600 text-white"
                      )}
                    >
                      {format(month, "MMM yyyy")}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">
                  How long would you like to stay?
                </h3>
                <RadioGroup
                  value={selectedDuration}
                  onValueChange={(value) =>
                    setSelectedDuration(value as DurationType)
                  }
                  className="flex flex-col lg:flex-row lg:justify-between rounded-lg shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="weekend"
                      id="weekend"
                      className="border-2 border-gray-500 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="weekend">Weekend (1-3 nights)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="1week"
                      id="1week"
                      className="border-2 border-gray-500 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="1week">1 Week</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="2weeks"
                      id="2weeks"
                      className="border-2 border-gray-500 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="2weeks">2 Weeks</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mt-4 w-full">
                <Button
                  onClick={handleFlexibleDateSelection}
                  className="w-full bg-blue-500"
                >
                  Done
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RangeCalendar;
