import { CliCommand } from "../core";
import { sendMail } from "@server/mail";

export const mail: CliCommand = (program, core) => {
    program
        .command("mail")
        .action(async () => {
            const info = await sendMail(["example@gmail.com"], "something", "something");
            core.out(info);
        });
};
