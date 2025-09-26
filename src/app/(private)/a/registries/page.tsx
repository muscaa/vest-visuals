"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useRegistries } from "@/hooks/useRegistries";
import {
    useState,
    useEffect,
} from "react";
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
    RegistryKey,
    registries,
} from "@type/registries";
import { zodToString } from "@shared/snippets";

export default function Page() {
    const { useRegistry, update } = useRegistries();
    const [key, setKey] = useState<RegistryKey>();
    const [value, setValue] = useState<string>();
    const { data } = useRegistry(key);

    useEffect(() => {
        if (!data) return;

        try {
            setValue(JSON.stringify(data, null, 2));
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [data]);

    const handleSave = async () => {
        if (!key) {
            toast.warning("No registry selected");
            return;
        }
        if (!value) {
            toast.warning("No value provided");
            return;
        }

        try {
            await update.mutateAsync({
                key,
                value: JSON.parse(value),
            });
            toast.success("Registry updated");
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const handleLoad = (key: RegistryKey) => {
        setKey(key);
        toast.success("Registry loaded");
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
                            disabled={!key}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="secondary"
                                    disabled={!key}
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
                                    value={key && zodToString(registries[key])}
                                    readOnly
                                    className="max-h-[70vh]"
                                />
                            </DialogContent>
                        </Dialog>
                        <Select
                            value={key}
                            onValueChange={handleLoad}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Registry" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    Object.entries(registries).map(([key, _], index) => (
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
