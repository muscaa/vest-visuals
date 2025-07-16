"use server";

import { MainAdmin } from "@/components/admin/main";
import { usersDB } from "@/utils/server/db";
import { server_config } from "@/utils/server/config";
import { ButtonLink } from "@/components/snippets";

export default async function Page() {
    const user = await usersDB.get();
    
    const loginResponse = await fetch(`${server_config.env.S3_CONSOLE_URL}/api/v1/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            accessKey: server_config.env.S3_ACCESS_KEY,
            secretKey: server_config.env.S3_SECRET_KEY,
        }),
    });
    
    const cookies = encodeURIComponent(JSON.stringify(loginResponse.headers.getSetCookie()));

    return (
        <MainAdmin>
            <div className="flex flex-col justify-center items-center gap-2 whitespace-pre-wrap">
                <p>Logged in as: {JSON.stringify(user, null, 4)}</p>
                <p>{cookies}</p>
                <ButtonLink href="/api/auth/logout" prefetch={false}>
                    logout
                </ButtonLink>
                <ButtonLink href={`${server_config.env.S3_CONSOLE_URL}/internal/login?cookies=${cookies}`} target="_blank" prefetch={false}>
                    minio
                </ButtonLink>
                <ButtonLink href="/a/upload" prefetch={false}>
                    upload
                </ButtonLink>
                <ButtonLink href="/a/images">
                    images
                </ButtonLink>
            </div>
        </MainAdmin>
    );
}
