"use server";

import { Main } from "@/components/main";
import { getUser } from "@/utils/server/auth";
import * as config from "@/config/server";
import { ButtonLink } from "@/components/snippets";

export default async function Page() {
    const user = await getUser();

    const loginResponse = await fetch(`${config.env.S3_CONSOLE_URL}/api/v1/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            accessKey: config.env.S3_ACCESS_KEY,
            secretKey: config.env.S3_SECRET_KEY,
        }),
    });
    
    const cookies = encodeURIComponent(JSON.stringify(loginResponse.headers.getSetCookie()));

    return (
        <Main>
            <div className="flex flex-col justify-center items-center gap-2 whitespace-pre-wrap">
                <p>Logged in as: {JSON.stringify(user, null, 4)}</p>
                <p>{cookies}</p>
                <ButtonLink href="/api/auth/logout" prefetch={false}>
                    logout
                </ButtonLink>
                <ButtonLink href={`${config.env.S3_CONSOLE_URL}/internal/login?cookies=${cookies}`} target="_blank" prefetch={false}>
                    minio
                </ButtonLink>
            </div>
        </Main>
    );
}
