import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/shadcn/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface ListProps<V> {
    data: V[];
    entry: (value: V, index: number) => React.ReactNode;
    isSelected?: (value: V) => boolean;
    onSelect?: (value: V) => void;
    children?: React.ReactNode;
}

export function List<V>(props: ListProps<V>) {
    const [selected0, setSelected0] = useState<V>();
    const [selected, setSelected] = props.onSelect ? [undefined, props.onSelect] : [selected0, setSelected0];

    const isSelected = props.isSelected ?? ((value: V) => selected == value);

    return (
        <div className="flex justify-center items-center size-full p-2">
            <div className="flex flex-col size-full max-w-4xl max-h-144 gap-2">
                {
                    props.children && (
                        <>
                            <div className="flex flex-wrap gap-2">
                                {props.children}
                            </div>
                            <Separator />
                        </>
                    )
                }
                <div className="flex flex-col max-h-full h-full overflow-y-auto">
                    <div className="flex flex-col grow gap-2">
                        {
                            props.data.map((value, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelected(value)}
                                    className={cn(buttonVariants({
                                        variant: "card",
                                        size: "none",
                                        className: `${isSelected(value) ? "border-accent-foreground dark:border-accent-foreground" : ""}`
                                    }))}
                                >
                                    {props.entry(value, index)}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
