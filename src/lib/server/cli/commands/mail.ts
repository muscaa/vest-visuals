import { CliCommand } from "../core";
import { sendMail } from "@server/mail";

export const mail: CliCommand = (program, core) => {
    program
        .command("mail")
        .option("--to <string>", "destination email")
        .option("-s, --subject <string>", "email title", "no subject")
        .argument("<string>")
        .action(async (body: string, options) => {
            const to: string = options.to;
            const subject: string = options.subject;

            if (!to) throw new Error("destination email is required");
            if (!subject) throw new Error("email title is required");

            const info = await sendMail([to], { subject, body });
            core.out(info);
        });
};
