"use client";

import { useState } from "react";
import {
    BaseList,
    BaseListEntry,
} from "./base";

interface SimpleListProps<V> {
    data: V[];
    entry: (value: V, index: number) => React.ReactNode;
    isSelected?: (value: V) => boolean;
    onSelect?: (value: V) => void;
    children?: React.ReactNode;
}

export function SimpleList<V>(props: SimpleListProps<V>) {
    const [selected, setSelected] = useState<V>();
    const isSelected = props.isSelected ?? ((value: V) => selected == value);
    const select = props.onSelect ?? ((value: V) => setSelected(value));

    return (
        <BaseList
            header={props.children}
            entries={
                props.data.map((value, index) => (
                    <BaseListEntry
                        key={index}
                        isSelected={() => isSelected(value)}
                        select={() => select(value)}
                    >
                        {props.entry(value, index)}
                    </BaseListEntry>
                ))
            }
        />
    );
}
