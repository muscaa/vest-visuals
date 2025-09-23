"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useRegistries } from "@/hooks/useRegistries";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/code-editor";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Registries,
    registrySchemas,
} from "@type/registries";
import { zodToString } from "@shared/snippets";

export default function Page() {
    const { getRegistry, update } = useRegistries();
    const [registry, setRegistry] = useState<string>();
    const [value, setValue] = useState<string>();

    const handleSave = async () => {
        if (!registry) {
            toast.warning("No registry selected");
            return;
        }
        if (!value) {
            toast.warning("No value provided");
            return;
        }

        try {
            await update.mutateAsync({
                name: registry,
                value: JSON.parse(value),
            });
            toast.success("Registry updated");
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const handleLoad = async (reg: keyof Registries) => {
        try {
            const data = await getRegistry(reg);
            setValue(JSON.stringify(data, null, 2));
            setRegistry(reg);
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
                        <Button
                            disabled={!registry}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="secondary"
                                    disabled={!registry}
                                >
                                    View Schema
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Schema</DialogTitle>
                                </DialogHeader>
                                <CodeEditor
                                    extensions={[javascript()]}
                                    value={registry && zodToString(registrySchemas[registry])}
                                    readOnly
                                    className="max-h-[70vh]"
                                />
                            </DialogContent>
                        </Dialog>
                        <Select
                            value={registry}
                            onValueChange={handleLoad}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Registry" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    Object.entries(registrySchemas).map(([key, _], index) => (
                                        <SelectItem key={index} value={key}>{key.toUpperCase()}</SelectItem>
                                    ))
                                }
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
