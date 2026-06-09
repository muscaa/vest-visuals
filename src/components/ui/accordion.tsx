"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@shared/shadcn/lib/utils"
import { ChevronDownIcon } from "lucide-react"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
    return (
        <AccordionPrimitive.Root
            data-slot="accordion"
            className={cn("overflow-hidden flex w-full flex-col", className)}
            {...props}
        />
    )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn("group/accordion-item first:border-t border-b", className)}
            {...props}
        />
    )
}

function AccordionTrigger({
    className,
    children,
    ...props
}: AccordionPrimitive.Trigger.Props) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    "text-h3 group-data-open/accordion-item:text-primary gap-6 px-4 py-6 text-left group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
                    className
                )}
                {...props}
            >
                {children}
                <ChevronDownIcon data-slot="accordion-trigger-icon" className="text-muted-foreground group-data-open/accordion-item:text-primary ml-auto size-4 pointer-events-none shrink-0 transition-all group-aria-expanded/accordion-trigger:rotate-180" />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
}

function AccordionContent({
    className,
    children,
    ...props
}: AccordionPrimitive.Panel.Props) {
    return (
        <AccordionPrimitive.Panel
            data-slot="accordion-content"
            className="text-body text-muted-foreground data-open:animate-accordion-down data-closed:animate-accordion-up px-4 overflow-hidden"
            {...props}
        >
            <div
                className={cn(
                    "pt-0 pb-4 [&_a]:hover:text-foreground h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
                    className
                )}
            >
                {children}
            </div>
        </AccordionPrimitive.Panel>
    )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
