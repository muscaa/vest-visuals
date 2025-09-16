import {
    MiddlewareContext,
    MiddlewareOptions,
    AuthContext,
} from "better-auth";
import { APIError } from "better-auth/api";
import { Status } from "@type/http";
import * as templates from "@server/mail/templates";

type Hook = Omit<MiddlewareContext<MiddlewareOptions>, "context">;
type BeforeContext = AuthContext;
type AfterContext = AuthContext & {
    returned: {
        status: Status;
        body: any;
        headers: any;
        statusCode: number;
        name: string;
    };
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
    if (hook.path == "/sign-in/email") {
        if (ctx.returned.statusCode == 200) {
            console.log(templates.newSignIn());
        }
    }
}
