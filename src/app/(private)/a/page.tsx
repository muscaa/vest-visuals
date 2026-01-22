"use server";

import { redirect } from "next/navigation";
import { U_ACCOUNT } from "@shared/paths";

export default async function Page() {
    redirect(U_ACCOUNT);
}
