"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import AppContext from "../../contenxt/AppContext";

export function DatePicker({ data }) {
  const cfx = React.useContext(AppContext);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-max justify-start text-left font-normal",
            !cfx.date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {data.date ? format(data.date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 dark" align="start">
        <Calendar
          mode="single"
          selected={data.date}
          onSelect={(e) => {
            cfx.setDate(e);
            cfx.handleDateTaskId(data.id);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
