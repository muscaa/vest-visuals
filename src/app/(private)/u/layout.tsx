import {
    BaseLayout,
    LayoutProps,
    createMetadata,
} from "@/components/layout";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@server/auth";
import {
    A,
    LOGIN,
} from "@shared/paths";

export const metadata = createMetadata({
    route: A,
    routeName: "User",
});

export default async function Layout(props: LayoutProps) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    
    if (!session) {
        redirect(LOGIN);
    }

    return (
        <BaseLayout {...props} />
    );
}
