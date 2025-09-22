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
import { toast } from "sonner";

export default function Page() {
    const { update, usePortfolioRegistry } = useRegistries();
    const { data } = usePortfolioRegistry();
    const [value, setValue] = useState("");

    useEffect(() => {
        if (!data || value) return;

        setValue(JSON.stringify(data, null, 2));
    }, [data]);

    const handleSave = async () => {
        try {
            await update.mutateAsync({
                name: "portfolio",
                value: JSON.parse(value),
            });

            toast.success("Portfolio registry updated");
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Portfolio Registry",
            }}
            extraClassName="overflow-hidden"
        >
            {
                <div className="flex flex-col size-full gap-2">
                    <div className="flex gap-2">
                        <Button onClick={handleSave}>
                            Save
                        </Button>
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
