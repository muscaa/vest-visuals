import {
    BaseLayout,
    LayoutProps,
    createMetadata,
} from "@/components/layout";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { isAdmin } from "@server/auth/permissions";
import { DndContextProvider } from "@/contexts/dnd";

export const metadata = createMetadata({
    route: "/a",
    routeName: "Admin",
});

export default async function Layout(props: LayoutProps) {
    const admin = await isAdmin({
        headers: await headers(),
    });
    
    if (!admin) {
        redirect("/login");
    }

    return (
        <DndContextProvider>
            <BaseLayout {...props} />
        </DndContextProvider>
    );
}
