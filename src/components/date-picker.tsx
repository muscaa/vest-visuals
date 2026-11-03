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

/** A day as the picker takes and submits it, an ISO date: "2026-10-20", in the visitor's own time zone. */
export function dateValue(date: Date | null | undefined) {
    if (!date) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** The day of an ISO date, at its start where the visitor is. */
function dayOf(value: string | undefined) {
    if (!value) return undefined;
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

export interface DatePickerProps {
    id?: string;
    /** submitted with the form as an ISO date, e.g. "2026-10-20" */
    name: string;
    required?: boolean;
    /** the day it starts with; or `value` and `onChange`, to set it from outside */
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    /** the earliest day that can be picked */
    min?: string;
    className?: string;
}

/** shadcn's date picker: a button opening a calendar, in the visitor's language. */
export function DatePicker(props: DatePickerProps) {
    const [own, setOwn] = useState(props.defaultValue ?? "");
    const [open, setOpen] = useState(false);
    const value = props.value ?? own;
    const date = dayOf(value);
    const min = dayOf(props.min);

    const select = (selected: Date | undefined) => {
        const next = dateValue(selected);
        setOwn(next);
        props.onChange?.(next);
        setOpen(false);
    };

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
                    defaultMonth={date}
                    onSelect={select}
                    disabled={min ? { before: min } : undefined}
                    locale={calendarLocales[getLocale()]}
                />
            </PopoverContent>
            <input type="hidden" name={props.name} value={value} required={props.required} />
        </Popover>
    );
}
