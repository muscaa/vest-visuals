"use server";

import stringArgv from "string-argv";
import { Command } from "commander";
import { libsql } from "@server/db";
import { sendMail } from "@server/mail";

export async function actionRunCommand(input: string) {
    const program = new Command();
    const output: string[] = [];

    const out = (format: any, ...args: any[]) => {
        const line = args.map((arg) => JSON.stringify(arg, null, 2)).join("");
        output.push(String(format));
        output.push(line);
    };

    program
        .exitOverride((err) => {
            throw err;
        })
        .configureOutput({
            writeOut: (str) => out(str),
            writeErr: (str) => out(str),
        });

    program
        .command("sql")
        .argument("<string...>")
        .action(async (...args: string[]) => {
            try {
                const result = await libsql.execute(args.join(" "));
                out(result.toJSON());
            } catch (error) {
                out((error as Error).message);
            }
        });

    program
        .command("mail")
        .action(async () => {
            const info = await sendMail(["example@gmail.com"], "something", "something");
            out(info);
        });

    try {
        const args = stringArgv(input);
        await program.parseAsync(args, { from: "user" });
    } catch (error) {
        out((error as Error).message);
    }

    return output.join("\n");
}
