import {
    NavbarLayout,
    LayoutProps,
    createMetadata,
} from "@/components/layout";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@server/auth";
import {
    LOGIN,
    U_ACCOUNT,
} from "@shared/paths";

export const metadata = createMetadata({
    route: LOGIN,
    routeName: "Login",
});

export default async function Layout(props: LayoutProps) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    
    if (session) {
        redirect(U_ACCOUNT);
    }

    return (
        <NavbarLayout {...props} />
    );
}
