"use server";

import { Main } from "@/components/main";
import { getUser } from "@/utils/server/auth";
import { LogoutButton } from "./logout-button";

export default async function Page() {
    const user = await getUser();

    return (
        <Main>
            <div className="flex flex-col justify-center items-center whitespace-pre-wrap">
                <p>Logged in as: {JSON.stringify(user, null, 4)}</p>
                <LogoutButton />
            </div>
        </Main>
    );
}
