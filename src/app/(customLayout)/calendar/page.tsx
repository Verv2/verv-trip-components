import React from "react";
import RangeCalendar from "../Components/RangeCalendar/RangeCalendar";

const CalendarPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Range Calendar For VervTrip</h1>
        <p className="text-muted-foreground">
          Select a date range using the calendar.
        </p>
        <RangeCalendar />
      </div>
    </section>
  );
};

export default CalendarPage;
