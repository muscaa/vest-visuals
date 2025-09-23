"use client";

import CodeMirror from "@uiw/react-codemirror";
import { Extension } from "@uiw/react-codemirror";
import {
    vscodeLight,
    vscodeDark,
} from "@uiw/codemirror-themes-all";
import { useTheme } from "next-themes";
import { cn } from "@shared/shadcn/lib/utils";

interface CodeEditorProps {
    extensions?: Extension[];
    value?: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    className?: string;
}

export function CodeEditor(props: CodeEditorProps) {
    const { theme } = useTheme();

    return (
        <CodeMirror
            theme={theme === "dark" ? vscodeDark : vscodeLight}
            extensions={props.extensions}
            readOnly={props.readOnly}
            editable={!props.readOnly}
            value={props.value}
            onChange={(value) => props.onChange?.(value)}
            className={cn("flex size-full overflow-auto", props.className)}
            width="100%"
            minWidth="100%"
            maxWidth="100%"
            height="100%"
            minHeight="100%"
            maxHeight="100%"
        />
    );
}
