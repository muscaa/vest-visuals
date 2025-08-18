import {
    BaseLayout,
    LayoutProps,
    createMetadata,
} from "@/components/layout";
import { usersDB } from "@/utils/server/db";
import { redirect } from "next/navigation";

export const metadata = createMetadata({
    route: "/login",
    routeName: "Login",
});

export default async function Layout(props: LayoutProps) {
    const user = await usersDB.get();
    
    if (user) {
        redirect("/a");
    }

    return (
        <BaseLayout {...props} />
    );
}
