import { auth } from "@server/auth";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

export const getSession = createServerFn({ method: "GET" }).handler(
    async () => {
        const headers = getRequestHeaders();
        const session = await auth.api.getSession({ headers });

        return session;
    },
);

export const ensureSession = createServerFn({ method: "GET" }).handler(
    async () => {
        const headers = getRequestHeaders();
        const session = await auth.api.getSession({ headers });

        if (!session) {
            throw new Error("Unauthorized");
        }

        return session;
    },
);

export const login = createServerFn({ method: "POST" })
    .validator((data: FormData) => {
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        return { email, password };
    })
    .handler(async ({ data }) => {
        await auth.api.signInEmail({
            body: {
                email: data.email,
                password: data.password,
                rememberMe: true,
            },
        });

        throw redirect({ to: "/account/private" });
    });

export const signup = createServerFn({ method: "POST" })
    .validator((data: FormData) => {
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const name = email.split("@")[0];

        return { name, email, password };
    })
    .handler(async ({ data }) => {
        await auth.api.signUpEmail({
            body: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });

        throw redirect({ to: "/account/private" });
    });

export const signout = createServerFn({ method: "GET" }).handler(async () => {
    const headers = getRequestHeaders();

    await auth.api.signOut({ headers });
});
