"use server";

import { getUser } from "@/utils/server/auth";
import { redirect } from "next/navigation";
import LoginPage from "./login-page";

export default async function Page() {
    const user = await getUser(false);
    
    if (user) {
        redirect("/a");
    }

    return (
        <LoginPage />
    );
}
