"use server";

import { usersDB } from "@/utils/server/db";
import { redirect } from "next/navigation";
import LoginPage from "./login-page";

export default async function Page() {
    const user = await usersDB.get({ redirect: false });
    
    if (user) {
        redirect("/a");
    }

    return (
        <LoginPage />
    );
}
