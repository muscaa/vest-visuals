"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCli } from "@/hooks/useCli";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function Page() {
    const { execute } = useCli();
    const [command, setCommand] = useState<string>("");
    const [output, setOutput] = useState<string[]>([]);

    useBreadcrumbs([
        "CLI",
    ]);

    const handleSend = async () => {
        const result = await execute.mutateAsync(command);
        setOutput((prev) => [...prev, `$ ${command}`, result.join("\n")]);
    };

    return (
        <div className="flex flex-col size-full gap-2">
            <div className="flex flex-col max-h-full h-full overflow-y-auto p-2 bg-background2 rounded-2xl shadow-sm whitespace-pre-wrap">
                <div className="flex flex-col grow font-mono">
                    {
                        output.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))
                    }
                </div>
            </div>
            <div className="flex gap-2">
                <Input
                    placeholder="command"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <Button onClick={handleSend}>
                    Send
                </Button>
            </div>
        </div>
    );
}
