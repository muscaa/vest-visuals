import {
    BaseLayout,
    LayoutProps,
    createMetadata,
} from "@/components/layout";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@server/auth";

export const metadata = createMetadata({
    route: "/a",
    routeName: "User",
});

export default async function Layout(props: LayoutProps) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    
    if (!session) {
        redirect("/login");
    }

    return (
        <BaseLayout {...props} />
    );
}
