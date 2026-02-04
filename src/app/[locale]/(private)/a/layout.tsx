import {
    LayoutProps,
    SidebarLayout,
    createInfo,
} from "@/components/layout";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { isAdmin } from "@server/auth/permissions";
import { DndContextProvider } from "@/contexts/dnd";
import {
    A,
    LOGIN,
} from "@shared/paths";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: A,
        routeName: "Admin",
    }),
});

export default async function Layout(props: LayoutProps) {
    const admin = await isAdmin({
        headers: await headers(),
    });

    if (!admin) {
        redirect(LOGIN);
    }

    return (
        <DndContextProvider>
            <SidebarLayout {...props} />
        </DndContextProvider>
    );
}
