import {
    MiddlewareContext,
    MiddlewareOptions,
    AuthContext,
    APIError,
} from "better-auth";

type Hook = Omit<MiddlewareContext<MiddlewareOptions>, "context">;
type BeforeContext = AuthContext;
type AfterContext = AuthContext & {
    returned: unknown;
    responseHeaders: Headers;
};

export async function beforeHook(hook: Hook, ctx: BeforeContext) {
    if (hook.path == "/sign-up/email") {
        if (!hook.body?.email.endsWith("@vestvisuals.ro")) {
            throw new APIError("FORBIDDEN", {
                message: "Email and password sign up is not enabled",
            });
        }
    }
}

export async function afterHook(hook: Hook, ctx: AfterContext) {
    if (hook.path == "/verify-email") {
        console.log(`
            -------------------
            ${JSON.stringify(ctx.returned, null, 2)}
            ${JSON.stringify(ctx.responseHeaders, null, 2)}
            -------------------
            `);
    }
}
