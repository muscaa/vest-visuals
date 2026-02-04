import {
    SidebarLayout,
    LayoutProps,
    createInfo,
} from "@/components/layout";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@server/auth";
import {
    U,
    LOGIN,
} from "@shared/paths";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: U,
        routeName: "User",
    }),
});

export default async function Layout(props: LayoutProps) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(LOGIN);
    }

    return (
        <SidebarLayout {...props} />
    );
}
