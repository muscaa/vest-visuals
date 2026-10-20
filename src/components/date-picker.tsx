import { m } from "@shared/paraglide/messages";
import { getLocale } from "@shared/paraglide/runtime";
import { useState } from "react";
import { IconCalendar } from "@tabler/icons-react";
import { enGB, ro } from "react-day-picker/locale";
import { cn } from "@shared/shadcn/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { formatDate } from "@/i18n";

const calendarLocales = { ro, en: enGB };

export interface DatePickerProps {
    id?: string;
    /** submitted with the form as an ISO date, e.g. "2026-10-20" */
    name: string;
    required?: boolean;
    className?: string;
}

/** shadcn's date picker: a button opening a calendar, in the visitor's language. */
export function DatePicker(props: DatePickerProps) {
    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState(false);
    // local date, so the submitted day is the one picked whatever the time zone
    const value = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "";

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                render={
                    <Button
                        id={props.id}
                        type="button"
                        variant="outline"
                        className={cn("justify-start w-full font-normal", !date && "text-muted-foreground", props.className)}
                    />
                }
            >
                <IconCalendar data-icon="inline-start" />
                {date ? formatDate(value) : m.date_picker_placeholder()}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selected) => {
                        setDate(selected);
                        setOpen(false);
                    }}
                    locale={calendarLocales[getLocale()]}
                />
            </PopoverContent>
            <input type="hidden" name={props.name} value={value} required={props.required} />
        </Popover>
    );
}
