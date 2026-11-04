/** The contact forms of every site: the message goes to the team's Discord channel. */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { verifyCaptcha } from "@server/captcha";
import { postContactMessage } from "@server/discord";

/** Sends a contact message; `captcha: false` when the captcha check failed, so the form can say so. */
export const sendContactMessage = createServerFn({ method: "POST" })
    .validator(z.object({
        name: z.string().trim().min(1).max(100),
        email: z.email(),
        message: z.string().trim().min(1).max(1000),
        /** the site's name, for the team to know which one it came from */
        site: z.enum(["vestvisuals.ro", "media.vestvisuals.ro", "software.vestvisuals.ro"]),
        token: z.string().optional(),
    }))
    .handler(async ({ data: { token, ...contact } }) => {
        if (!await verifyCaptcha(token)) {
            return { sent: false, captcha: false };
        }
        await postContactMessage(contact);
        return { sent: true, captcha: true };
    });
