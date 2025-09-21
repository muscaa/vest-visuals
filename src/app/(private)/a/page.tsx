"use server";

import { redirect } from "next/navigation";

export default async function Page() {
    redirect("/u/account");

    // const loginResponse = await fetch(`${server_config.env.S3_CONSOLE_URL}/api/v1/login`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         accessKey: server_config.env.S3_ACCESS_KEY,
    //         secretKey: server_config.env.S3_SECRET_KEY,
    //     }),
    // });

    // const cookies = encodeURIComponent(JSON.stringify(loginResponse.headers.getSetCookie()));

    //         <ButtonLink href={`${server_config.env.S3_CONSOLE_URL}/internal/login?cookies=${cookies}`} target="_blank" prefetch={false}>
    //             minio
    //         </ButtonLink>
}
