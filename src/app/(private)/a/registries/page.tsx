"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useRegistries } from "@/hooks/useRegistries";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/code-editor";
import { json } from "@codemirror/lang-json";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Page() {
    const { get, update } = useRegistries();
    const [value, setValue] = useState("");

    const handleSave = async () => {
        try {
            await update.mutateAsync({
                name: "team",
                value: JSON.parse(value),
            });
            toast.success("Registry updated");
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const handleLoad = async (reg: string) => {
        try {
            const data = await get.mutateAsync(reg);
            setValue(JSON.stringify(data, null, 2));
            toast.success("Registry loaded");
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Registries",
            }}
            extraClassName="overflow-hidden"
        >
            {
                <div className="flex flex-col size-full gap-2">
                    <div className="flex gap-2">
                        <Button onClick={handleSave}>
                            Save
                        </Button>
                        <Select onValueChange={handleLoad}>
                            <SelectTrigger>
                                <SelectValue placeholder="Registry" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="team">Team</SelectItem>
                                <SelectItem value="portfolio">Portfolio</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <CodeEditor
                        extensions={[json()]}
                        value={value}
                        onChange={(value) => setValue(value)}
                    />
                </div>
            }
        </MainSidebarProvider>
    );
}
