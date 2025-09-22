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
    const { update, useTeamRegistry } = useRegistries();
    const { data } = useTeamRegistry();
    const [value, setValue] = useState("");

    useEffect(() => {
        if (!data || value) return;

        setValue(JSON.stringify(data, null, 2));
    }, [data]);

    const handleSave = async () => {
        try {
            await update.mutateAsync({
                name: "team",
                value: JSON.parse(value),
            });

            toast.success("Team registry updated");
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Team Registry",
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
