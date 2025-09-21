"use client";

import { MainAdmin } from "@/components/admin/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCli } from "@/hooks/useCli";

export default function Page() {
    const { execute } = useCli();
    const [command, setCommand] = useState<string>("");
    const [output, setOutput] = useState<string[]>([]);

    const handleSend = async () => {
        const result = await execute.mutateAsync(command);
        setOutput((prev) => [...prev, `$ ${command}`, result.join("\n")]);
    };

    return (
        <MainAdmin extraClassName="overflow-hidden">
            <div className="flex flex-col size-full p-2 gap-2">
                <div className="flex flex-col max-h-full h-full overflow-y-auto p-2 bg-background0 rounded-md shadow-sm whitespace-pre-wrap">
                    <div className="flex flex-col grow">
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
                    />
                    <Button onClick={handleSend}>
                        Send
                    </Button>
                </div>
            </div>
        </MainAdmin>
    );
}
